/* 《代汉涂高》 — 军国机枢
 * 状态机：回合、征募、行军、野战、攻城、外交、事件、胜负。
 * 不含任何 DOM 依赖，可在 Node 下推演。
 */
(function (root) {
  'use strict';

  var MAP = root.MAP;
  var Rules = root.Rules;

  /* —— 随机数（可复现） —— */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  var SEASONS = ['春', '夏', '秋', '冬'];

  /* —— 建号 —— */
  var ID = 0;
  function nextId(prefix) { ID += 1; return prefix + '_' + ID; }

  function allGenerals() {
    var g = {};
    ['GENERALS', 'GENERALS_PART1', 'GENERALS_PART2', 'GENERALS_PART3', 'GENERALS_PART4',
      'GENERALS_PART5', 'GENERALS_PART6'].forEach(function (k) {
      if (root[k]) { Object.keys(root[k]).forEach(function (id) { g[id] = root[k][id]; }); }
    });
    return g;
  }

  /* —— 乡里：在野之人的寄居之城 ——
   * 未立之国，其人以「别局之都城」为乡里：晋人归洛阳，蜀人归成都，吴人归建业，皆其本据。
   * 有国者则归其国当世之重镇。此制为「征辟」与「氏族」二事之根：乡里在我，方可得而辟之。
   */
  var SEAT = null;
  function factionSeat(f) {
    if (!SEAT) {
      SEAT = {};
      /* 以「最晚之局」为准：凡一国，取其立国既久之时所都之城（晋取洛阳、蜀取成都、吴取建业） */
      Object.keys(MAP.ERAS).map(function (k) { return k; })
        .sort(function (a, b) { return (MAP.ERAS[a].year || 0) - (MAP.ERAS[b].year || 0); })
        .forEach(function (ek) {
          var own;
          try { own = MAP.ownersOf(ek); } catch (e) { return; }
          var best = {};
          Object.keys(own).forEach(function (cid) {
            var k = own[cid];
            if (k === 'neutral') { return; }
            var lv = (MAP.CITY_INDEX[cid] || {}).level || 1;
            if (!best[k] || lv > best[k].level || (lv === best[k].level && cid < best[k].city)) {
              best[k] = { city: cid, level: lv };
            }
          });
          Object.keys(best).forEach(function (k) { SEAT[k] = best[k]; });
        });
    }
    return SEAT[f] ? SEAT[f].city : null;
  }

  function homeCity(st, def) {
    var f = def.faction;
    if (f && st.factions[f] && st.factions[f].alive) {
      var mine = Object.keys(st.cities).filter(function (c) { return st.cities[c].owner === f; });
      if (mine.length) {
        mine.sort(function (a, b) { return st.cities[b].level - st.cities[a].level || a.localeCompare(b); });
        return mine[0];
      }
    }
    return factionSeat(f);
  }

  function livingGenerals(registry, year) {
    var out = [];
    Object.keys(registry).forEach(function (id) {
      var g = registry[id];
      if (g.death && year > g.death) { return; }
      if (g.birth && year < g.birth + 14) { return; }
      out.push(g);
    });
    return out;
  }

  /* —— 开局 —— */
  function newGame(opts) {
    var lordKey = opts.lord;
    var FD = root.FACTIONS_DATA;
    var lord = FD.LORDS[lordKey];
    if (!lord) { throw new Error('未知君主 ' + lordKey); }
    // 剧本与关卡：一君主多剧本，一剧本多关卡；未指定者取其默认之局、首关
    var C = root.Campaign;
    var scenario = null, stage = null, stageIdx = 0;
    if (C) {
      scenario = C.scenarioOf(lordKey, opts.scenario) || C.defaultScenario(lordKey);
      if (scenario) {
        stageIdx = opts.stage || 0;
        if (stageIdx < 0 || stageIdx >= scenario.stages.length) { stageIdx = 0; }
        stage = scenario.stages[stageIdx];
      }
    }
    var eraKey = scenario ? scenario.era : lord.era;
    if (!MAP.ERAS[eraKey]) { eraKey = lord.era; }
    var era = MAP.ERAS[eraKey];
    var owners = MAP.ownersOf(eraKey);
    var registry = allGenerals();

    var st = {
      seed: opts.seed || 20260101,
      rng: null,
      lordKey: lordKey,
      player: lord.faction,
      era: eraKey,
      eraTitle: era.title,
      year: era.year,
      eraLabel: era.era,
      seasonIdx: 0,
      turn: 1,
      day: 0,
      map: MAP.grid,
      cities: {},
      units: [],
      factions: {},
      generals: {},
      flags: {},
      fired: {},
      chapters: [],
      log: [],
      phase: 'player',
      result: null,
      pending: null,
      stats: { battlesWon: 0, battlesLost: 0, kills: 0, citiesTaken: 0, citiesLost: 0 },
      difficulty: lord.difficulty || 3,
      mech: lord.mech,
      lord: lord,
      scenario: scenario ? {
        id: scenario.id, name: scenario.name, era: scenario.era,
        index: C ? C.scenarioIndex(lordKey, scenario.id) : 0
      } : null,
      stage: stage ? {
        index: stageIdx, id: stage.id, name: stage.name, desc: stage.desc || '',
        count: scenario.stages.length, goal: stage.goal || { open: true },
        open: !stage.goal || !!stage.goal.open
      } : null,
      unlocked: {},
      lore: {}
    };
    st.rng = mulberry32(st.seed);

    /* 君主本人之将佐 id：君主阵亡即社稷倾覆，故须随时可考 */
    var lk = Object.keys(registry).filter(function (id) { return registry[id].name === lord.name; });
    st.lordGeneral = lk.length ? lk[0] : null;
    st.lordDown = false;

    // 朝局：党争、名分与储位（见 src/core/politics.js）
    if (root.Politics) { root.Politics.init(st); }
    // 氏族：姓氏之门第与向背（见 src/core/clans.js）
    if (root.Clans) { root.Clans.init(st); }

    // 势力初始化
    Object.keys(MAP.FACTIONS).forEach(function (k) {
      st.factions[k] = {
        key: k, name: MAP.FACTIONS[k].name, long: MAP.FACTIONS[k].long,
        color: MAP.FACTIONS[k].color, player: (k === st.player),
        gold: 0, food: 0, prestige: 0, alive: false, aggro: 0.5, atWar: {}
      };
    });

    // 城池
    MAP.CITIES.forEach(function (c) {
      var own = owners[c.id] || 'neutral';
      var pop = root.Population ? root.Population.base(c) : 10;
      st.cities[c.id] = {
        id: c.id, name: c.name, zhou: c.zhou, kind: c.kind, level: c.level,
        x: c.x, y: c.y, owner: own, wall: c.level * 40,
        garrison: c.level * 160, maxGarrison: c.level * 160,
        morale: 70, unrest: 0, dev: 0, recruit: 0,
        pop: pop, popBase: pop, lastRest: -99      // 户口（万口）：见 src/core/population.js
      };
      if (own !== 'neutral') { st.factions[own].alive = true; }
    });
    // 记「本局曾有其国」：开局有城者，虽后亡，其士犹可为吾所辟
    Object.keys(st.factions).forEach(function (k) { st.factions[k].everAlive = !!st.factions[k].alive; });

    // 邦交：乱世之初，诸侯相攻
    var alive0 = Object.keys(st.factions).filter(function (k) { return st.factions[k].alive; });
    alive0.forEach(function (a) {
      alive0.forEach(function (b) { if (a !== b) { setWar(st, a, b, true); } });
    });

    // 势力金粮
    Object.keys(st.factions).forEach(function (k) {
      var f = st.factions[k];
      if (!f.alive) { return; }
      var n = countCities(st, k);
      f.gold = 120 + n * 40;
      f.food = 200 + n * 60;
      f.prestige = prestigeBase(k);
    });

    // 武将归属
    var byFaction = {};
    Object.keys(registry).forEach(function (id) {
      var g = registry[id];
      if (g.birth && st.year < g.birth + 14) { return; }
      if (g.death && st.year > g.death) { return; }
      var f = g.faction;
      if (!st.factions[f] || !st.factions[f].alive) { f = 'neutral'; }
      (byFaction[f] = byFaction[f] || []).push(g);
    });
    Object.keys(byFaction).forEach(function (f) {
      byFaction[f].sort(function (a, b) { return (b.impact || 1) - (a.impact || 1); });
    });

    // 布阵：每座城驻一将，其余入在野
    Object.keys(st.cities).forEach(function (cid) {
      var c = st.cities[cid];
      if (c.owner === 'neutral') { return; }
      var pool = byFaction[c.owner] || [];
      var g = pool.shift();
      if (!g) { return; }
      st.generals[g.id] = { id: g.id, owner: c.owner, status: 'city', city: cid, loyalty: 88 };
      byFaction[c.owner] = pool;
    });
    Object.keys(byFaction).forEach(function (f) {
      byFaction[f].forEach(function (g) {
        if (st.generals[g.id]) { return; }
        st.generals[g.id] = { id: g.id, owner: f === 'neutral' ? null : f, status: 'wild', city: null, loyalty: 70 };
      });
    });

    // 在野之人各归其乡：乡里在我，方可得而辟之（见 recruitable）
    Object.keys(st.generals).forEach(function (gid) {
      var g = st.generals[gid];
      if (g.status !== 'wild') { return; }
      g.city = homeCity(st, registry[gid] || {});
    });

    // 起始军队：主场据首都与要镇，余城留将守备
    setupArmy(st, st.player, 10);
    Object.keys(st.factions).forEach(function (k) {
      if (k === st.player || !st.factions[k].alive) { return; }
      setupArmy(st, k, 6);
    });

    // 开局第一季，本部听候调遣
    st.units.forEach(function (u) {
      if (u.faction === st.player) {
        u.acted = false;
        u.moveLeft = Rules.statsOf(u, u.generalRef).move;
      }
    });

    var mine0 = Object.keys(st.cities).filter(function (c) { return st.cities[c].owner === st.player; });
    var seat = null;
    if (st.cities[lord.capital] && st.cities[lord.capital].owner === st.player) { seat = lord.capital; }
    else if (mine0.length) { seat = mine0.sort(function (a, b) { return st.cities[b].level - st.cities[a].level; })[0]; }
    var seatName = (seat && MAP.CITY_INDEX[seat]) ? MAP.CITY_INDEX[seat].name : '四方';
    log(st, '【' + era.year + '年·' + era.era + '】' + lord.name +
      (st.scenario ? '「' + st.scenario.name + '」' : '') + '起于' + seatName + '，志在' + lord.goal);
    if (st.stage) {
      log(st, '第 ' + (st.stage.index + 1) + '／' + st.stage.count + ' 关·' + st.stage.name +
        (st.stage.desc ? '：' + st.stage.desc : '') + '　目标：' + (root.Campaign ? root.Campaign.goalText(st.stage.goal) : ''), 'good');
    }
    return st;
  }

  function prestigeBase(k) {
    if (k === 'han') { return 90; }
    if (k === 'wei' || k === 'jin' || k === 'wu' || k === 'shu') { return 60; }
    if (k === 'yuan' || k === 'dong') { return 55; }
    return 45;
  }

  /* 为某势力布阵：要镇优先，无将亦可成军 */
  function setupArmy(st, k, maxUnits) {
    var mine = Object.keys(st.cities).filter(function (c) { return st.cities[c].owner === k; });
    if (!mine.length) { return; }
    mine.sort(function (a, b) {
      var d = st.cities[b].level - st.cities[a].level;
      return d !== 0 ? d : a.localeCompare(b);
    });
    var n = Math.min(maxUnits, mine.length, Math.max(2, Math.ceil(mine.length * 0.6)));
    var pool = Object.keys(st.generals)
      .filter(function (g) {
        var gg = st.generals[g];
        return gg.owner === k && gg.status === 'city';
      })
      .sort(function (a, b) {
        var A = allGenerals()[a] || {}, B = allGenerals()[b] || {};
        return (B.impact || 0) - (A.impact || 0);
      });
    for (var i = 0; i < n; i++) {
      var cid = mine[i % mine.length];
      spawnUnit(st, k, cid, chooseType(st, cid), pool.shift() || null);
    }
  }

  function countCities(st, k) {
    return Object.keys(st.cities).filter(function (c) { return st.cities[c].owner === k; }).length;
  }

  function chooseType(st, cityId) {
    var c = st.cities[cityId];
    var pool = ['inf', 'spear', 'archer'];
    if (c.level >= 3) { pool.push('cav', 'pike'); }
    if (c.level >= 4) { pool.push('crossbow', 'siege'); }
    // 楼船限于水师征募，开国之初不列
    if (c.zhou === '益州' || c.zhou === '交州') { pool.push('barbcav'); }
    return pool[Math.floor(st.rng() * pool.length)];
  }

  function spawnUnit(st, faction, cityId, type, generalId) {
    var c = st.cities[cityId];
    var def = Rules.UNITS[type];
    var tiles = freeTilesNear(st, c.x, c.y);
    var t = tiles[0] || { x: c.x, y: c.y };
    var hpMod = 1;
    if (generalId && st.generals[generalId]) {
      var gref = allGenerals()[generalId];
      var gm = Rules.skillMods(gref, 'passive');
      hpMod += (gm.hp || 0);
    }
    var u = {
      id: nextId('u'), type: type, faction: faction, x: t.x, y: t.y,
      hp: Math.round(def.hp * hpMod), maxHp: Math.round(def.hp * hpMod), morale: 82, exp: 0, level: 0,
      moveLeft: 0, acted: true, general: null, generalRef: null,
      buffAtk: 0, buffDef: 0, buffMove: 0, buffRange: 0, buffTurns: 0
    };
    if (generalId && st.generals[generalId]) {
      u.general = generalId;
      u.generalRef = allGenerals()[generalId] || null;
      st.generals[generalId].status = 'unit';
      st.generals[generalId].unit = u.id;
      st.generals[generalId].city = null;
    }
    st.units.push(u);
    return u;
  }

  /* 城下择一地布阵：自内而外，逐环寻空旷之地（六边距离） */
  function freeTilesNear(st, x, y) {
    var out = [];
    for (var r = 1; r <= 3; r++) {
      for (var dy = -r; dy <= r; dy++) {
        for (var dx = -r - 1; dx <= r + 1; dx++) {
          var nx = x + dx, ny = y + dy;
          if (MAP.dist(x, y, nx, ny) !== r) { continue; }
          var t = Rules.terrainOf(st, nx, ny);
          if (!t) { continue; }
          if (t.terrain === 'water') { continue; }
          if (st.units.some(function (u) { return u.hp > 0 && u.x === nx && u.y === ny; })) { continue; }
          out.push({ x: nx, y: ny, cost: r });
        }
      }
      if (out.length) { break; }
    }
    return out.sort(function (a, b) { return a.cost - b.cost; });
  }

  function log(st, text, kind) {
    st.log.push({ turn: st.turn, text: text, kind: kind || 'info' });
    if (st.log.length > 400) { st.log.shift(); }
  }

  function factionOf(st, k) { return st.factions[k]; }
  function unitById(st, id) { return st.units.filter(function (u) { return u.id === id; })[0]; }
  function cityAt(st, x, y) {
    var t = Rules.terrainOf(st, x, y);
    return t && t.city ? st.cities[t.city.id] : null;
  }

  /* —— 行军 —— */
  function moveTo(st, unitId, x, y) {
    var u = unitById(st, unitId);
    if (!u || u.hp <= 0) { return fail('无此部曲'); }
    if (u.acted) { return fail('此军本回合已行动'); }
    var ok = Rules.reachable(st, u).some(function (p) { return p.x === x && p.y === y; });
    if (!ok) { return fail('非可至之地'); }
    var occupied = st.units.some(function (o) { return o.hp > 0 && o !== u && o.x === x && o.y === y; });
    if (occupied) { return fail('该地已有部队'); }
    u.x = x; u.y = y;
    u.moveLeft = 0;
    u.acted = true;
    var c = cityAt(st, x, y);
    if (c && c.owner !== u.faction) {
      if (c.garrison > 0) {
        // 守军尚在，只能围城
        c.unrest = Math.min(100, c.unrest + 12);
        log(st, Rules.UNITS[u.type].name + '进抵' + c.name + '城下，守军未降。', 'war');
      } else {
        captureCity(st, c, u.faction);
      }
    }
    refreshFog(st);
    return ok_('行军已毕');
  }

  function captureCity(st, c, faction) {
    var old = c.owner;
    c.owner = faction;
    c.garrison = 0;
    c.wall = Math.max(20, c.wall - 40);
    c.unrest = 40;
    c.morale = 50;
    st.factions[faction].alive = true;
    if (!st.factions[old].alive) { /* noop */ }
    if (old !== faction) {
      if (faction === st.player) { st.stats.citiesTaken++; } else if (old === st.player) { st.stats.citiesLost++; }
      log(st, '【' + MAP.FACTIONS[faction].long + '】拔' + c.name + '。', 'war');
      // 城中文武或降或走
      Object.keys(st.generals).forEach(function (gid) {
        var g = st.generals[gid];
        if (g.status === 'city' && g.city === c.id && g.owner === old) {
          var def = allGenerals()[gid];
          var chance = 0.2 + (def && def.stats ? def.stats.cha / 400 : 0);
          if (st.mech === 'renyi' && faction === st.player) { chance += 0.55; }
          if (st.rng() < chance) {
            g.owner = faction; g.loyalty = 60;
            log(st, '　' + (def ? def.name : gid) + '归降' + MAP.FACTIONS[faction].long + '。', 'good');
          } else {
            g.owner = null; g.status = 'wild'; g.city = null;
            log(st, '　' + (def ? def.name : gid) + '弃城而去。', 'info');
          }
        }
      });
      if (Object.keys(st.cities).every(function (k) { return st.cities[k].owner === faction; })) {
        st.result = { win: true, faction: faction, reason: 'unify' };
        st.phase = 'over';
      }
    }
  }

  /* —— 野战 —— */
  function attackUnit(st, unitId, targetId) {
    var a = unitById(st, unitId), d = unitById(st, targetId);
    if (!a || !d || a.hp <= 0 || d.hp <= 0) { return fail('无此部曲'); }
    if (a.acted) { return fail('此军本回合已行动'); }
    if (a.faction === d.faction) { return fail('不可自相残杀'); }
    if (!Rules.inRange(st, a, d.x, d.y)) { return fail('超出射程'); }
    if (!atWar(st, a.faction, d.faction)) {
      setWar(st, a.faction, d.faction, true);
      setRelation(st, a.faction, d.faction, relationOf(st, a.faction, d.faction) - 50);
      log(st, sideName(a.faction) + '背盟袭' + sideName(d.faction) + '。', 'bad');
    }
    var r = Rules.damage(st, a, d);
    d.hp = Math.max(0, d.hp - r.dmg);
    a.exp += Math.round(6 * (1 + (Rules.skillMods(a.generalRef, 'passive').xp || 0)));
    promote(st, a);
    if (d.hp > 0) { d.exp += 3; promote(st, d); }
    var counterDone = false;
    // 反击：近战且守方存活
    var sA = Rules.statsOf(a, a.generalRef);
    var sD = Rules.statsOf(d, d.generalRef);
    if (d.hp > 0 && sD.range >= MAP.dist(a.x, a.y, d.x, d.y) && sD.range === 1) {
      var c = Rules.damage(st, d, a);
      var cd = Math.round(c.dmg * 0.7);
      a.hp = Math.max(0, a.hp - cd);
      counterDone = true;
      log(st, Rules.UNITS[d.type].name + '反击，' + Rules.UNITS[a.type].name + '损兵 ' + cd + '。', 'war');
    }
    a.moveLeft = 0; a.acted = true;
    a.morale = Math.min(100, a.morale + (d.hp <= 0 ? 6 : 2));
    d.morale = Math.max(20, d.morale - 4);

    log(st, Rules.UNITS[a.type].name + '(' + sideName(a.faction) + ')击' + Rules.UNITS[d.type].name + '(' + sideName(d.faction) + ')，斩获 ' + r.dmg + '。', 'war');

    if (d.hp <= 0) { killUnit(st, d, a); }
    if (a.hp <= 0) { killUnit(st, a, d); }
    checkDefeat(st);
    refreshFog(st);
    return ok_('战毕' + (counterDone ? '（受反击）' : ''));
  }

  function sideName(k) { return MAP.FACTIONS[k] ? MAP.FACTIONS[k].long : k; }

  /* 战功升迁：久战之卒，兵强而气盛 */
  function promote(st, u) {
    var lv = Math.min(5, Math.floor(u.exp / 40));
    while ((u.level || 0) < lv) {
      u.level = (u.level || 0) + 1;
      u.maxHp = Math.round(u.maxHp * 1.06);
      u.hp = Math.min(u.maxHp, Math.round(u.hp * 1.06 + 4));
      u.morale = Math.min(100, u.morale + 4);
      if (u.faction === st.player) {
        log(st, Rules.UNITS[u.type].name + (u.generalRef ? '（' + u.generalRef.name + '）' : '') +
          '累战有功，擢为第 ' + u.level + ' 等。', 'good');
      }
    }
  }

  function killUnit(st, u, killer) {
    u.hp = 0;
    if (killer && killer.faction === st.player) { st.stats.kills++; }
    if (u.general) {
      var g = st.generals[u.general];
      var def = allGenerals()[u.general];
      if (g) {
        var captured = st.rng() < (killer && killer.faction === st.player && st.mech === 'renyi' ? 0.7 : 0.35);
        if (captured && killer) {
          g.owner = killer.faction; g.status = 'wild'; g.unit = null; g.city = null; g.loyalty = 55;
          log(st, '　' + (def ? def.name : u.general) + '被' + sideName(killer.faction) + '所获。', 'good');
        } else {
          g.status = 'dead'; g.owner = null;
          log(st, '　' + (def ? def.name : u.general) + '殁于阵。', 'bad');
        }
        if (u.general === st.lordGeneral) { lordDown(st, captured && killer ? 'captured' : 'slain', killer); }
      }
    }
    st.units = st.units.filter(function (x) { return x !== u; });
    if (killer && killer.faction === st.player) {
      if (killer === u) { st.stats.battlesLost++; } else { st.stats.battlesWon++; }
    }
  }

  /* —— 君主阵亡 ——
   * 汉末之世，君在则国在：君主阵殁或见擒于敌，则社稷倾覆，此局即终，
   * 虽城池部曲俱在，亦不复兴。 */
  function lordDown(st, kind, killer) {
    if (st.lordDown || st.result) { return st.result; }
    st.lordDown = { kind: kind, general: st.lordGeneral, by: killer ? killer.faction : null, turn: st.turn };
    var nm = st.lord ? st.lord.name : '君主';
    var who = killer ? sideName(killer.faction) : '乱军';
    log(st, kind === 'captured'
      ? '【' + nm + '】为' + who + '所擒，社稷倾覆。'
      : '【' + nm + '】殁于阵中，社稷倾覆。', 'bad');
    st.result = { win: false, faction: st.player, reason: 'lord', how: kind, by: killer ? killer.faction : null };
    st.phase = 'over';
    return st.result;
  }

  /* —— 攻城 —— */
  function attackCity(st, unitId, cityId) {
    var u = unitById(st, unitId);
    var c = st.cities[cityId];
    if (!u || !c) { return fail('无此部曲'); }
    if (u.acted) { return fail('此军本回合已行动'); }
    if (c.owner === u.faction) { return fail('此城已属我方'); }
    var dist = MAP.dist(u.x, u.y, c.x, c.y);
    var s = Rules.statsOf(u, u.generalRef);
    if (dist > s.range) { return fail('未及城下'); }
    var power = s.atk * (Rules.UNITS[u.type].tags.indexOf('siege') >= 0 ? 5.0 : 2.2);
    if (u.buffSiege) { power *= (1 + u.buffSiege); }
    var loss = Math.round(power * (0.85 + st.rng() * 0.3));
    c.garrison = Math.max(0, c.garrison - loss);
    c.morale = Math.max(10, c.morale - 8);
    c.unrest = Math.min(100, c.unrest + 15);
    u.acted = true; u.moveLeft = 0; u.exp += 5;
    // 守军反击
    if (c.garrison > 0 && dist <= 1) {
      var back = Math.round(c.garrison / 22 + 6);
      u.hp = Math.max(0, u.hp - back);
      log(st, c.name + '守军拒战，我军损兵 ' + back + '。', 'war');
      if (u.hp <= 0) { killUnit(st, u, null); }
    }
    log(st, '攻' + c.name + '，破其守备 ' + loss + '（余 ' + c.garrison + '）。', 'war');
    if (c.garrison <= 0 && !st.units.some(function (o) { return o.hp > 0 && o.faction !== u.faction && o.x === c.x && o.y === c.y; })) {
      captureCity(st, c, u.faction);
      var tiles = freeTilesNear(st, c.x, c.y);
      if (tiles.length) { u.x = tiles[0].x; u.y = tiles[0].y; }
    }
    checkDefeat(st);
    return ok_('攻城已毕');
  }

  /* —— 征募 —— */
  function recruitCost(st, type, cityId) {
    var def = Rules.UNITS[type];
    var c = st.cities[cityId];
    var f = st.factions[c ? c.owner : st.player];
    var mech = Rules.FACTION_MECH[c ? c.owner : st.player] || {};
    var cost = Math.round(def.gold * (1 + (mech.recruit || 0)) * (1 - (c ? c.dev * 0.01 : 0)));
    return Math.max(20, cost);
  }

  function recruit(st, cityId, type, generalId) {
    var c = st.cities[cityId];
    if (!c) { return fail('无此城'); }
    var f = st.factions[c.owner];
    if (!f) { return fail('此城无主'); }
    var cost = recruitCost(st, type, cityId);
    if (f.gold < cost) { return fail('金帛不足（需 ' + cost + '）'); }
    if (st.units.filter(function (u) { return u.faction === c.owner; }).length >= 24) { return fail('部曲已满'); }
    /* 征兵之根在户口：户口不足则无兵可征（见 src/core/population.js） */
    var P = root.Population;
    if (P) {
      var can = P.canRecruit(st, cityId, type);
      if (!can.ok) { return fail(can.why); }
    }
    f.gold -= cost;
    var u = spawnUnit(st, c.owner, cityId, type, generalId || null);
    u.acted = true; u.moveLeft = 0;
    var levy = P ? P.spend(st, cityId, type) : null;
    log(st, sideName(c.owner) + '于' + c.name + '征' + Rules.UNITS[type].name + '一部' +
      (levy ? '，调发户口 ' + P.num(levy.need) + '（今 ' + P.num(levy.after) + ' 万口）' : '') + '。', 'info');
    if (levy && levy.heavy && c.owner === st.player) {
      log(st, '　' + c.name + '大举征发，户口骤减，田野稍稍荒芜。', 'bad');
    }
    return ok_('已征募' + Rules.UNITS[type].name + (levy ? '（户口 −' + P.num(levy.need) + '）' : ''), u);
  }

  function upgradeCity(st, cityId) {
    var c = st.cities[cityId];
    if (!c) { return fail('无此城'); }
    if (c.level >= 6) { return fail('此城已极'); }
    var f = st.factions[c.owner];
    var cost = 180 * c.level;
    if (f.gold < cost) { return fail('金帛不足（需 ' + cost + '）'); }
    f.gold -= cost;
    c.level += 1;
    c.wall = c.level * 40;
    c.maxGarrison = c.level * 160;
    c.garrison = Math.min(c.maxGarrison, c.garrison + 160);
    log(st, c.name + '兴修城郭，升为' + c.level + '级。', 'good');
    return ok_(c.name + '已增筑');
  }

  function rewardGeneral(st, gid) {
    var g = st.generals[gid];
    if (!g) { return fail('无此人'); }
    var f = st.factions[g.owner];
    if (!f) { return fail('此人无主'); }
    if (f.gold < 150) { return fail('金帛不足（需 150）'); }
    f.gold -= 150;
    g.loyalty = Math.min(100, g.loyalty + 18);
    var def = allGenerals()[gid];
    log(st, '赏' + (def ? def.name : gid) + '，忠诚增至 ' + g.loyalty + '。', 'good');
    return ok_('已赏赐');
  }

  /* —— 征辟之制 ——
   * 汉末征辟，本有门第与乡里之限：非其乡里之人，非其故主故吏，虽怀金帛亦不能致之。
   * 故可辟者须四事皆合：
   *   一、其人无主而在野；
   *   二、其人非一方之主（天子与诸侯不可为臣，故汉献帝不可征辟）；
   *   三、其人所居之城在吾疆（未立之国者，以其别局之本据为乡里——晋人归洛阳、蜀人归成都）；
   *   四、其国已亡者可为吾用，惟名重天下者（影响五）耻为人下，不在其列。
   */
  function recruitRule(st, gid) {
    var g = st.generals[gid];
    if (!g) { return { ok: false, why: '无此人' }; }
    if (g.status === 'dead') { return { ok: false, why: '此人已殁' }; }
    if (st.units.some(function (u) { return u.general === gid; })) { return { ok: false, why: '此人在军，不可径辟' }; }
    if (g.owner === st.player) { return { ok: false, why: '此人已为我之臣' }; }
    if (g.owner) { return { ok: false, why: '此人为' + sideName(g.owner) + '效力' }; }
    var def = allGenerals()[gid] || {};
    var nm = def.name || gid;
    if ((def.roles || []).indexOf('lord') >= 0) {
      return { ok: false, why: nm + '为一方之主，岂可为臣' };
    }
    var f = def.faction;
    var home = (g.city && st.cities[g.city]) ? st.cities[g.city] : null;
    if (f && f === st.player) {
      return { ok: true, why: '本朝旧人', home: home };
    }
    if (f && st.factions[f] && st.factions[f].everAlive && !st.factions[f].alive) {
      if ((def.impact || 0) >= 5) { return { ok: false, why: nm + '名重天下，耻为人下' }; }
      return { ok: true, why: '亡国之士，可为我用', home: home };
    }
    if (home && home.owner === st.player) {
      return { ok: true, why: '其乡里' + home.name + '在吾疆', home: home };
    }
    /* 汉世征辟，多在本州：其乡里虽在他人之城，而与我同州者，亦可得而辟之 */
    if (home && home.zhou && playerZhous(st)[home.zhou]) {
      return { ok: true, why: '本州之士（乡里' + home.name + '·' + home.zhou + '）', home: home };
    }
    if (home) {
      return { ok: false, why: '其人寄居' + home.name + '（' + sideName(home.owner) + '），非我州郡所能辟', home: home };
    }
    return { ok: false, why: '其乡里未有所考，无从征辟' };
  }

  /* 我方所有之州 */
  function playerZhous(st) {
    var out = {};
    Object.keys(st.cities).forEach(function (k) {
      if (st.cities[k].owner === st.player) { out[st.cities[k].zhou] = true; }
    });
    return out;
  }

  function recruitGeneral(st, gid) {
    var g = st.generals[gid];
    if (!g) { return fail('无此人'); }
    var rule = recruitRule(st, gid);
    if (!rule.ok) { return fail(rule.why); }
    var f = st.factions[st.player];
    var def = allGenerals()[gid];
    var cost = 80 + (def && def.impact ? def.impact * 60 : 120);
    if (f.gold < cost) { return fail('金帛不足（需 ' + cost + '）'); }
    f.gold -= cost;
    g.owner = st.player;
    g.status = 'wild';
    g.city = null;
    g.loyalty = 70;
    log(st, '征辟' + (def ? def.name : gid) + '（' + rule.why + '）。', 'good');
    return ok_('已征辟', g);
  }

  /* 在野可辟者之列（含其可辟之由），供界面与「天子诏书·征辟」取用 */
  function recruitable(st) {
    return Object.keys(st.generals).filter(function (gid) {
      var g = st.generals[gid];
      return g.status === 'wild' && !g.owner;
    }).map(function (gid) {
      var r = recruitRule(st, gid);
      var def = allGenerals()[gid] || {};
      return {
        id: gid, name: def.name || gid, zi: def.zi || '', bio: def.bio || '',
        impact: def.impact || 0, stats: def.stats || null, roles: def.roles || [],
        faction: def.faction || null, home: r.home ? { id: r.home.id, name: r.home.name } : null,
        open: !!r.ok, why: r.why,
        cost: 80 + (def.impact ? def.impact * 60 : 120)
      };
    }).sort(function (a, b) { return (b.impact - a.impact) || a.name.localeCompare(b.name); });
  }

  function assignGeneral(st, gid, unitId) {
    var g = st.generals[gid];
    var u = unitById(st, unitId);
    if (!g || !u) { return fail('无此人或此部'); }
    if (g.owner !== u.faction) { return fail('非我之臣'); }
    if (u.general) { return fail('此部已有将'); }
    g.status = 'unit'; g.unit = u.id; g.city = null;
    u.general = gid; u.generalRef = allGenerals()[gid] || null;
    return ok_('已受任');
  }

  /* —— 回合 —— */
  function startTurn(st) {
    st.turn += 1;
    // 一回合为一季，四时成岁
    st.seasonIdx = (st.turn - 1) % 4;
    if (st.seasonIdx === 0 && st.turn > 1) { st.year += 1; }

    Object.keys(st.factions).forEach(function (k) {
      var f = st.factions[k];
      if (!f.alive) { return; }
      var cs = Object.keys(st.cities).filter(function (c) { return st.cities[c].owner === k; });
      if (!cs.length) { f.alive = false; return; }
      var mech = Rules.FACTION_MECH[k] || {};
      var gold = 0, food = 0, unrest = 0;
      var popBefore = 0, popDelta = 0;
      var P = root.Population;
      cs.forEach(function (cid) {
        var c = st.cities[cid];
        var cdef = MAP.CITY_INDEX[cid];
        /* 户口之消长：征兵则减，民安则滋息（见 src/core/population.js） */
        var pf = 1;
        if (P) {
          if (c.pop == null) { c.pop = P.base(c); }
          popBefore += c.pop;
          var g = P.tick(st, c);
          popDelta += g.delta;
          pf = P.popFactor(st, c);
        }
        gold += cdef.gold * (1 + (mech.gold || 0)) * (0.30 + 0.05 * c.level) * (0.5 + c.morale / 200) * pf;
        food += cdef.food * (1 + (mech.food || 0)) * (0.30 + 0.05 * c.level) * (0.5 + c.morale / 200) * pf;
        // 民心
        var drift = (c.unrest > 40 ? -2 : 1) + (mech.loyalty ? 1 : 0);
        c.morale = Math.max(0, Math.min(100, c.morale + drift));
        c.unrest = Math.max(0, c.unrest - 6);
        c.recruit = Math.min(3, Math.floor(c.level / 2) + (c.morale > 70 ? 1 : 0));
        if (c.morale < 25 && st.rng() < 0.12) {
          if (st.rng() < 0.5) {
            c.owner = 'neutral';
            log(st, c.name + '民变，城陷无主。', 'bad');
          } else {
            c.garrison = 0;
            log(st, c.name + '百姓闭门拒守。', 'bad');
          }
        }
      });
      // 谋臣良将之经略：屯田、典粮、市易
      st.units.filter(function (u) { return u.faction === k; }).forEach(function (u) {
        var m = Rules.skillMods(u.generalRef, 'passive');
        gold += (m.gold || 0);
        food += (m.food || 0);
      });
      // 党争内耗：朝中朋党相攻，则岁入折损（每十点党争减岁入百分之四，至多四成）
      var drag = 1;
      if (k === st.player && st.court) {
        drag = 1 - Math.min(0.4, st.court.strife * 0.004);
        gold *= drag; food *= drag;
      }
      // 世族之向背：门第倾心则岁入稍增，世族离心则稍减（见 src/core/clans.js）
      var cb = (k === st.player && root.Clans) ? root.Clans.bonuses(st) : null;
      if (cb) { gold *= cb.gold; food *= cb.food; }
      var goldIn = Math.round(gold), foodIn = Math.round(food);
      var g0 = f.gold, f0 = f.food;
      f.gold += goldIn;
      f.food += foodIn;
      // 军粮
      var upkeep = st.units.filter(function (u) { return u.faction === k; })
        .reduce(function (a, u) { return a + Rules.UNITS[u.type].food * 3; }, 0);
      f.food -= upkeep;
      if (f.food < 0) {
        f.food = 0;
        st.units.filter(function (u) { return u.faction === k; }).forEach(function (u) {
          u.hp = Math.max(10, u.hp - Math.round(u.maxHp * 0.12));
          u.morale = Math.max(20, u.morale - 8);
        });
        if (k === st.player) { log(st, '粮尽，诸军减员。', 'bad'); }
      }
      /* 本回合之出入，记于势力之上，供顶栏示「本回合收益变动」 */
      var popNow = P ? P.total(st, k) : 0;
      f.income = {
        turn: st.turn, gold: goldIn, food: foodIn, upkeep: upkeep,
        goldNet: f.gold - g0, foodNet: f.food - f0,
        pop: Math.round(popNow * 10) / 10,
        popDelta: popDelta ? Math.round(popDelta * 10) / 10 : (popBefore ? Math.round((popNow - popBefore) * 10) / 10 : 0),
        drag: Math.round(drag * 100) / 100,
        clans: cb ? { gold: Math.round((cb.gold - 1) * 100), food: Math.round((cb.food - 1) * 100), said: cb.said } : null
      };
    });

    // 城中守备恢复
    Object.keys(st.cities).forEach(function (cid) {
      var c = st.cities[cid];
      if (c.owner === 'neutral') { return; }
      c.garrison = Math.min(c.maxGarrison, c.garrison + Math.round(c.maxGarrison * 0.04));
      c.wall = Math.min(c.level * 40, c.wall + 6);
    });

    // 我军休整，兼有疗伤之能者
    st.units.forEach(function (u) {
      var m = Rules.skillMods(u.generalRef, 'passive');
      if (m.heal) { u.hp = Math.min(u.maxHp, u.hp + Math.round(u.maxHp * m.heal)); }
    });

    // 我方部队复位
    st.units.forEach(function (u) {
      if (u.faction === st.player) {
        u.acted = false;
        u.moveLeft = Rules.statsOf(u, u.generalRef).move;
        u.morale = Math.min(100, u.morale + 3);
        if (u.buffTurns > 0) { u.buffTurns -= 1; if (u.buffTurns === 0) { u.buffAtk = u.buffDef = u.buffMove = u.buffRange = 0; } }
      }
    });
    // 在野之士游历
    if (root.Politics) { root.Politics.tick(st); }
    if (root.Clans) { root.Clans.tick(st); }
    maybeWanderers(st);
    refreshFog(st);
    checkDefeat(st);
  }

  function maybeWanderers(st) {
    if (st.turn % 4 !== 0) { return; }
    var reg = allGenerals();
    var wild = Object.keys(st.generals).filter(function (g) { return st.generals[g].status === 'wild' && !st.generals[g].owner; });
    if (!wild.length) { return; }
    var pick = wild[Math.floor(st.rng() * wild.length)];
    var def = reg[pick];
    log(st, '在野之士' + (def ? def.name : pick) + '游于' + (def && def.faction ? MAP.FACTIONS[def.faction].long : '四方') + '。', 'info');
  }

  function endTurn(st) {
    st.phase = 'ai';
    var ai = root.AI;
    if (ai) {
      Object.keys(st.factions).forEach(function (k) {
        if (k === st.player) { return; }
        if (!st.factions[k].alive) { return; }
        if (st.phase === 'over') { return; }
        ai.takeTurn(st, k);
      });
    }
    if (st.phase === 'over') { return ok_('战事已终'); }
    startTurn(st);
    if (checkStage(st)) { st.phase = 'over'; return ok_('此关已定'); }
    st.phase = 'player';
    return ok_('第 ' + st.turn + ' 回合');
  }

  /* ————— 关卡目标 ————— */
  /* 一关既定之志既成，则此关告捷；末关开放型无目标，唯待一统（由 captureCity 判定） */
  function checkStage(st) {
    if (st.result || !st.stage || st.stage.open) { return false; }
    if (!root.Campaign || !root.Campaign.goalMet(st, st.stage.goal)) { return false; }
    st.result = { win: true, faction: st.player, reason: 'stage' };
    log(st, '【' + st.stage.name + '】既定之志成矣，此关已定。', 'good');
    return true;
  }

  /* 当前关卡之状，供界面显示：目标之文、进度、是否已成、是否为开放型 */
  function goalStatus(st) {
    var C = root.Campaign;
    if (!st || !st.stage || !C) { return null; }
    var g = st.stage.goal;
    return {
      name: st.stage.name, index: st.stage.index, count: st.stage.count,
      desc: st.stage.desc || '', text: C.goalText(g), progress: C.goalProgress(st, g),
      met: C.goalMet(st, g), open: !!st.stage.open,
      scenario: st.scenario ? st.scenario.name : ''
    };
  }

  function checkDefeat(st) {
    if (st.result) { return; }
    /* 君主阵亡或见擒，则社稷倾覆，虽城郭部曲俱在亦终（见 lordDown） */
    var lg = st.lordGeneral ? st.generals[st.lordGeneral] : null;
    if (lg && (lg.status === 'dead' || (lg.owner && lg.owner !== st.player))) {
      lordDown(st, lg.status === 'dead' ? 'slain' : 'captured', null);
      return;
    }
    if (countCities(st, st.player) === 0 && !st.units.some(function (u) { return u.faction === st.player && u.hp > 0; })) {
      st.result = { win: false, faction: st.player, reason: 'ruin' };
      st.phase = 'over';
    }
  }

  function refreshFog(st) {
    // 简化视野：己方城池 4 格内的敌军可见
    st.units.forEach(function (u) { u.visible = true; });
    return st;
  }

  /* ————— 邦交 ————— */

  function relationOf(st, a, b) {
    var f = st.factions[a];
    if (!f.relations) { f.relations = {}; }
    if (f.relations[b] == null) { f.relations[b] = 0; }
    return f.relations[b];
  }

  function setRelation(st, a, b, v) {
    var f = st.factions[a], g = st.factions[b];
    if (!f.relations) { f.relations = {}; }
    if (!g.relations) { g.relations = {}; }
    f.relations[b] = Math.max(-100, Math.min(100, v));
    g.relations[a] = Math.max(-100, Math.min(100, v));
  }

  function atWar(st, a, b) {
    var f = st.factions[a];
    if (!f.war) { f.war = {}; }
    return !!f.war[b];
  }

  function setWar(st, a, b, on) {
    var f = st.factions[a], g = st.factions[b];
    if (!f.war) { f.war = {}; }
    if (!g.war) { g.war = {}; }
    f.war[b] = !!on;
    g.war[a] = !!on;
  }

  function diplomacy(st, target, action) {
    var me = st.player;
    var f = st.factions[me];
    var g = st.factions[target];
    if (!g || !g.alive) { return fail('此国已亡'); }
    var rel = relationOf(st, me, target);
    if (action === 'gift') {
      if (f.gold < 300) { return fail('金帛不足（需 300）'); }
      f.gold -= 300;
      setRelation(st, me, target, rel + 28);
      log(st, '遣使赂' + g.long + '，两国稍亲。', 'info');
      return ok_('遣使礼赂' + g.name + '，邦交转睦。');
    }
    if (action === 'war') {
      if (atWar(st, me, target)) { return fail('本已交兵'); }
      setWar(st, me, target, true);
      setRelation(st, me, target, rel - 55);
      f.prestige = Math.max(0, f.prestige - 5);
      log(st, '【' + f.long + '】传檄讨' + g.long + '。', 'war');
      return ok_('传檄讨' + g.name + '。');
    }
    if (action === 'peace') {
      if (!atWar(st, me, target)) { return fail('本无战事'); }
      var cost = 400 + Math.round(Math.max(0, 50 - rel) * 10);
      if (f.gold < cost) { return fail('金帛不足（需 ' + cost + '）'); }
      var odds = 0.25 + rel / 200 + (f.prestige + 40) / 260;
      f.gold -= cost;
      if (st.rng() < odds) {
        setWar(st, me, target, false);
        setRelation(st, me, target, rel + 25);
        log(st, '与' + g.long + '约和罢兵。', 'good');
        return ok_('与' + g.name + '约和。');
      }
      setRelation(st, me, target, rel + 6);
      log(st, g.long + '却我使，和议不成。', 'bad');
      return fail(g.name + '不允和议，然礼数已到。');
    }
    if (action === 'edict') {
      if (st.mech !== 'zhaoshu') { return fail('非汉天子，无诏可下'); }
      if (st.turn - (st.flags['last_edict'] || -99) < 6) { return fail('诏书不宜频下'); }
      if (f.prestige < 20) { return fail('威望不足以诏令天下'); }
      st.flags['last_edict'] = st.turn;
      f.prestige -= 20;
      Object.keys(st.factions).forEach(function (k) {
        if (k === me || !st.factions[k].alive) { return; }
        setWar(st, k, target, true);
        setRelation(st, k, target, relationOf(st, k, target) - 40);
      });
      log(st, '天子下诏，令天下共讨' + g.name + '。', 'good');
      return ok_('诏下：天下共讨' + g.name + '。');
    }
    if (action === 'edictStop') {
      if (st.mech !== 'zhaoshu') { return fail('非汉天子，无诏可下'); }
      if (st.turn - (st.flags['last_edict'] || -99) < 6) { return fail('诏书不宜频下'); }
      if (f.prestige < 20) { return fail('威望不足以诏令天下'); }
      st.flags['last_edict'] = st.turn;
      f.prestige -= 20;
      Object.keys(st.factions).forEach(function (k) {
        if (k === me || !st.factions[k].alive) { return; }
        setWar(st, k, target, false);
        setWar(st, me, k, false);
      });
      log(st, '诏令' + g.name + '罢兵，两河稍安。', 'good');
      return ok_('诏令' + g.name + '罢兵。');
    }
    if (action === 'edictCall') {
      if (st.mech !== 'zhaoshu') { return fail('非汉天子，无诏可下'); }
      if (st.turn - (st.flags['last_edict'] || -99) < 6) { return fail('诏书不宜频下'); }
      if (f.prestige < 15) { return fail('威望不足以征辟'); }
      st.flags['last_edict'] = st.turn;
      f.prestige -= 15;
      var wilds = recruitable(st).filter(function (x) { return x.open; });
      if (!wilds.length) { return fail('海内无遗贤可征'); }
      var pick = wilds[0].id;
      st.generals[pick].owner = me;
      st.generals[pick].status = 'wild';
      st.generals[pick].city = null;
      st.generals[pick].loyalty = 78;
      var d = allGenerals()[pick];
      log(st, '天子征辟' + (d ? d.name : pick) + '。', 'good');
      return ok_('征' + (d ? d.name : pick) + '为郎。');
    }
    return fail('未知之举');
  }

  /* ————— 朝局：议政、立储、政争 ————— */
  /* 本处只作通政之口，实法皆在 src/core/politics.js，便于 Node 下推演 */
  function pol() { return root.Politics; }

  function council(st, topicId, optIdx) {
    if (!pol()) { return fail('朝局未立'); }
    return pol().council(st, topicId, optIdx);
  }

  function setHeir(st, candId) {
    if (!pol()) { return fail('朝局未立'); }
    return pol().setHeir(st, candId);
  }

  function politicsStatus(st) { return pol() ? pol().status(st) : null; }
  function courtTopics(st) { return pol() ? pol().topicsFor(st) : []; }
  function heirCandidates(st) { return pol() ? pol().candidates(st) : []; }
  function pendingPolitics(st) { return pol() ? pol().pendingEvent(st) : null; }

  function resolvePolitics(st, optIdx) {
    if (!pol()) { return fail('朝局未立'); }
    return pol().resolveEvent(st, optIdx);
  }

  /* ————— 户口与休养生息 ————— */
  function restCity(st, cityId) {
    if (!root.Population) { return fail('户口之制未立'); }
    if (st.phase === 'over') { return fail('战事已终'); }
    return root.Population.rest(st, cityId);
  }

  function restInfo(st, cityId) {
    return root.Population ? root.Population.restInfo(st, cityId) : { ok: false, why: '' };
  }

  function popOf(st, cityId) {
    return root.Population ? root.Population.of(st, cityId) : 0;
  }

  function popTotal(st, faction) {
    return root.Population ? root.Population.total(st, faction || st.player) : 0;
  }

  /* ————— 氏族：通政之口 ————— */
  function clansOf(st) {
    if (!root.Clans || !st) { return []; }
    var list = root.Clans.relevant(st);
    return list.map(function (c) {
      return {
        id: c.id, name: c.name, junwang: c.junwang, trait: c.trait, desc: c.desc, src: c.src,
        factions: c.factions || [],
        support: Math.round(root.Clans.support(st, c.id)),
        label: root.Clans.label(root.Clans.support(st, c.id)),
        serving: root.Clans.serving(st, c),
        recruitable: root.Clans.recruitable(st, c),
        members: root.Clans.members(st, c)
      };
    });
  }

  function clanDo(st, id, action) {
    if (!root.Clans) { return fail('氏族之制未立'); }
    return root.Clans.act(st, id, action);
  }

  function clanActInfo(st, id, action) {
    return root.Clans ? root.Clans.actInfo(st, id, action) : { ok: false, why: '氏族之制未立' };
  }

  function ok_(msg, data) { return { ok: true, msg: msg, data: data }; }
  function fail(msg) { return { ok: false, msg: msg }; }

  root.Engine = {
    newGame: newGame,
    startTurn: startTurn,
    endTurn: endTurn,
    moveTo: moveTo,
    attackUnit: attackUnit,
    attackCity: attackCity,
    recruit: recruit,
    recruitCost: recruitCost,
    upgradeCity: upgradeCity,
    rewardGeneral: rewardGeneral,
    recruitGeneral: recruitGeneral,
    recruitRule: recruitRule,
    recruitable: recruitable,
    restCity: restCity,
    restInfo: restInfo,
    popOf: popOf,
    popTotal: popTotal,
    clansOf: clansOf,
    clanDo: clanDo,
    clanActInfo: clanActInfo,
    lordDown: lordDown,
    factionSeat: factionSeat,
    assignGeneral: assignGeneral,
    diplomacy: diplomacy,
    relationOf: relationOf,
    setRelation: setRelation,
    atWar: atWar,
    setWar: setWar,
    spawnUnit: spawnUnit,
    captureCity: captureCity,
    unitById: unitById,
    cityAt: cityAt,
    log: log,
    countCities: countCities,
    checkStage: checkStage,
    goalStatus: goalStatus,
    council: council,
    setHeir: setHeir,
    politicsStatus: politicsStatus,
    courtTopics: courtTopics,
    heirCandidates: heirCandidates,
    pendingPolitics: pendingPolitics,
    resolvePolitics: resolvePolitics,
    allGenerals: allGenerals,
    livingGenerals: livingGenerals,
    freeTilesNear: freeTilesNear
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.Engine; }
})(typeof window !== 'undefined' ? window : globalThis);
