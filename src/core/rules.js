/* 《代汉涂高》 — 兵制与战律
 * 纯函数，不碰 DOM，可在 Node 下直接测试。
 */
(function (root) {
  'use strict';

  /* 兵种。atk/def 为「战力」，hp 为「兵力」，move 为「机动力」，range 为「射程」 */
  var UNITS = {
    inf:       { id: 'inf',       name: '郡国兵',   abbr: '步', atk: 42, def: 44, hp: 110, move: 3, range: 1, gold: 60,  food: 4,  tier: 1, tags: ['pike'],                  note: '州郡所征之卒，械朴而众。' },
    spear:     { id: 'spear',     name: '长矛兵',   abbr: '矛', atk: 46, def: 54, hp: 115, move: 3, range: 1, gold: 85,  food: 5,  tier: 1, tags: ['pike'],                  note: '拒马拒骑，阵战之骨。' },
    archer:    { id: 'archer',    name: '弓手',     abbr: '弓', atk: 50, def: 34, hp: 90,  move: 3, range: 2, gold: 90,  food: 5,  tier: 1, tags: ['archer'],                note: '远射伤敌，近战则弱。' },
    pike:      { id: 'pike',      name: '大戟士',   abbr: '戟', atk: 64, def: 58, hp: 135, move: 3, range: 1, gold: 155, food: 7,  tier: 2, tags: ['pike', 'iron'],          note: '袁绍帐下劲卒，甲坚戟长。' },
    crossbow:  { id: 'crossbow',  name: '连弩士',   abbr: '弩', atk: 62, def: 36, hp: 95,  move: 2, range: 2, gold: 130, food: 6,  tier: 2, tags: ['crossbow', 'archer'],    note: '诸葛亮损益连弩，一弩十矢。' },
    guard:     { id: 'guard',     name: '亲卫',     abbr: '卫', atk: 72, def: 68, hp: 155, move: 4, range: 1, gold: 240, food: 9,  tier: 3, tags: ['guard', 'iron'],         note: '虎豹骑、白毦兵、解烦兵之属。' },
    cav:       { id: 'cav',       name: '轻骑',     abbr: '骑', atk: 58, def: 42, hp: 110, move: 5, range: 1, gold: 135, food: 8,  tier: 2, tags: ['cavalry'],               note: '轻装疾驰，抄掠与追击之长。' },
    heavycav:  { id: 'heavycav',  name: '甲骑',     abbr: '铁', atk: 74, def: 60, hp: 145, move: 4, range: 1, gold: 210, food: 11, tier: 3, tags: ['cavalry', 'iron'],       note: '人马具装，冲锋莫当。' },
    cavarcher: { id: 'cavarcher', name: '骑射',     abbr: '骑弓', atk: 56, def: 40, hp: 100, move: 5, range: 2, gold: 175, food: 9, tier: 3, tags: ['cavalryarcher', 'cavalry'], note: '胡骑之技，且驰且射。' },
    siege:     { id: 'siege',     name: '攻城器械', abbr: '械', atk: 86, def: 30, hp: 125, move: 2, range: 2, gold: 190, food: 8,  tier: 2, tags: ['siege'],                 note: '云梯、冲车、井阑、抛石。' },
    navy:      { id: 'navy',      name: '楼船',     abbr: '舟', atk: 68, def: 62, hp: 145, move: 4, range: 2, gold: 205, food: 10, tier: 3, tags: ['naval', 'water'],        note: '起楼橹其上，可容千人。' },
    transport: { id: 'transport', name: '辎重车',   abbr: '辎', atk: 10, def: 22, hp: 90,  move: 4, range: 1, gold: 75,  food: 2,  tier: 1, tags: ['logistics'],             note: '运粮转饷，军之血脉。' },
    barbcav:   { id: 'barbcav',   name: '蛮骑',     abbr: '蛮', atk: 64, def: 40, hp: 120, move: 5, range: 1, gold: 145, food: 7,  tier: 2, tags: ['cavalry', 'barbarian'],  note: '羌胡、乌桓之骑，轻疾无律。' },
    elephant:  { id: 'elephant',  name: '象兵',     abbr: '象', atk: 80, def: 62, hp: 175, move: 3, range: 1, gold: 260, food: 12, tier: 3, tags: ['barbarian', 'iron'],     note: '南中所产，负重而骇敌。' }
  };

  /* 兵种相克：COUNTER[攻方][守方] = 倍率 */
  var COUNTER = {
    cav:       { archer: 1.45, crossbow: 1.45, siege: 1.35, pike: 0.72, spear: 0.78, guard: 0.85 },
    heavycav:  { archer: 1.5,  crossbow: 1.5,  siege: 1.4,  pike: 0.68, spear: 0.75, guard: 0.85 },
    barbcav:   { archer: 1.45, crossbow: 1.45, siege: 1.35, pike: 0.75, spear: 0.8 },
    cavarcher: { pike: 1.2,   spear: 1.15,     siege: 1.25, cav: 0.9 },
    pike:      { cav: 1.45, heavycav: 1.5, barbcav: 1.45, guard: 1.1 },
    spear:     { cav: 1.35, heavycav: 1.4,  barbcav: 1.35 },
    archer:    { pike: 1.3,  spear: 1.25,  guard: 1.2,  cav: 0.72, heavycav: 0.68, barbcav: 0.75 },
    crossbow:  { pike: 1.35, spear: 1.3,   guard: 1.25, cav: 0.7,  heavycav: 0.65, barbcav: 0.72 },
    siege:     { inf: 1.15,  spear: 1.15,  pike: 1.1,   cav: 0.6,  heavycav: 0.55 },
    guard:     { inf: 1.3,   archer: 1.25, crossbow: 1.25, siege: 1.2 },
    navy:      { transport: 1.6 },
    elephant:  { inf: 1.4,   spear: 1.3,   cav: 1.15,   archer: 0.85 },
    transport: {}
  };

  /* 地形对移动与防守的影响，取自舆图 */
  function terrainOf(state, x, y) {
    var row = state.map[y];
    if (!row) { return null; }
    return row[x] || null;
  }

  function isWater(t) { return t && t.terrain === 'water'; }
  function isNaval(def) { return def.tags.indexOf('naval') >= 0 || def.tags.indexOf('water') >= 0; }
  function canEnter(unitDef, tile) {
    if (!tile) { return false; }
    var naval = isNaval(unitDef);
    if (naval) { return tile.terrain === 'water' || tile.terrain === 'ford' || !!tile.city; }
    if (isWater(tile)) { return false; }
    if (unitDef.tags.indexOf('siege') >= 0 && tile.terrain === 'mount') { return false; }
    return true;
  }

  /* —— 武将技能结算 —— */
  function skillMods(general, kind) {
    var m = {};
    if (!general || !general.skills) { return m; }
    general.skills.forEach(function (s) {
      if (kind && s.kind !== kind) { return; }
      var k = (s.kind === 'aura') ? 0.7 : 1;
      Object.keys(s.mod || {}).forEach(function (key) {
        m[key] = (m[key] || 0) + s.mod[key] * k;
      });
      (s.tags || []).forEach(function (t) { m['tag_' + t] = (m['tag_' + t] || 0) + 1 * k; });
    });
    return m;
  }

  var FACTION_MECH = {
    wei:       { gold: 0.10, food: 0.30 },
    jin:       { gold: 0.20, food: 0.10, loyalty: 0.3 },
    shu:       { gold: -0.15, food: -0.10, recruit: -0.20, surrender: 0.9 },
    yi:        { gold: -0.10, food: 0.60, garrison: 0.20 },
    jing:      { gold: 0.05, food: 0.15, cavalry: -0.15, talent: 0.5 },
    hanzhong:  { food: 0.25, loyalty: 0.9, garrison: 0.25, talent: -0.6 },
    wu:        { naval: 0.35, citydef: 0.15, cavalry: -0.10 },
    liaodong:  { gold: 0.50, recruit: -0.35, garrison: 0.20 },
    liang:     { cavalry: 0.20, food: -0.25 },
    wan:       { citydef: 0.5, atk: 0.1, recruit: -0.4 },
    dong:      { atk: 0.20, cavalry: 0.15, diplomacy: -1.0 },
    yuan:      { gold: 0.10, food: 0.10, talent: 0.8, unrest: 0.15 },
    zhong:     { gold: 0.40, diplomacy: -0.6 },
    han:       { loyalty: 0.5, talent: 0.4, gold: -0.05 },
    huangjin:  { atk: 0.18, def: -0.10, recruit: -0.40, gold: -0.12, food: -0.08 }
  };

  function statsOf(unit, general) {
    var def = UNITS[unit.type];
    var f = FACTION_MECH[unit.faction] || {};
    var m = skillMods(general, 'passive');
    if (general) {
      var gs = general.stats || {};
      m.atk = (m.atk || 0) + (gs.war ? (gs.war - 60) / 300 : 0);
      m.def = (m.def || 0) + (gs.lead ? (gs.lead - 60) / 320 : 0);
      m.move = (m.move || 0) + (gs.lead >= 90 ? 1 : 0);
    }
    var hpRatio = unit.hp / unit.maxHp;
    var fat = 0.45 + 0.55 * hpRatio;          // 兵力愈少，战力愈衰
    var moraleF = 0.75 + 0.5 * ((unit.morale == null ? 80 : unit.morale) / 100);

    var atkBonus = 1 + (m.atk || 0) + (f.atk || 0) + (unit.buffAtk || 0) + (unit.auraAtk || 0);
    var defBonus = 1 + (m.def || 0) + (f.def || 0) + (unit.buffDef || 0) + (unit.auraDef || 0);
    if ((def.tags.indexOf('cavalry') >= 0) && f.cavalry) { atkBonus += f.cavalry; defBonus += f.cavalry; }
    if ((def.tags.indexOf('naval') >= 0) && f.naval) { atkBonus += f.naval; defBonus += f.naval; }

    return {
      atk: Math.round(def.atk * fat * moraleF * atkBonus),
      def: Math.round(def.def * fat * moraleF * defBonus),
      range: def.range + (m.range || 0) + (unit.buffRange || 0) + (unit.auraRange || 0),
      move: Math.max(1, def.move + (m.move || 0) + (unit.buffMove || 0) + (unit.auraMove || 0)),
      tags: def.tags
    };
  }

  /* 出手伤害 */
  function damage(state, attacker, defender) {
    var A = statsOf(attacker, attacker.generalRef);
    var D = statsOf(defender, defender.generalRef);
    var dt = UNITS[defender.type];
    var at = UNITS[attacker.type];

    var tile = terrainOf(state, defender.x, defender.y);
    var terrDef = tile ? tile.terrainDef : 0;
    var tileA = terrainOf(state, attacker.x, attacker.y);
    var terrAtk = tileA ? tileA.terrainAtk : 0;

    var cityDef = 0;
    if (tile && tile.city && state.cities) {
      var st = state.cities[tile.city.id];
      if (st && st.owner === defender.faction) {
        cityDef = 0.30 + 0.04 * Math.max(0, st.level || 0);
        if (at.tags.indexOf('siege') >= 0) { cityDef *= 0.35; }
      }
    }
    var counter = (COUNTER[at.id] && COUNTER[at.id][dt.id]) || 1;

    var base = A.atk * (1 + terrAtk) * counter;
    var guard = D.def * (1 + terrDef + cityDef);
    var dmg = Math.round(Math.max(5, base * 1.35 - guard * 0.85));
    dmg = Math.min(dmg, Math.round(defender.maxHp * 0.9));
    return { dmg: dmg, counter: counter, statsA: A, statsD: D, cityDef: cityDef };
  }

  /* —— 移动 —— */
  function reachable(state, unit) {
    var def = UNITS[unit.type];
    var s = statsOf(unit, unit.generalRef);
    var budget = unit.moveLeft == null ? s.move : unit.moveLeft;
    var best = {};
    var key = function (x, y) { return x + ',' + y; };
    var frontier = [{ x: unit.x, y: unit.y, cost: 0 }];
    best[key(unit.x, unit.y)] = 0;
    var out = [];
    while (frontier.length) {
      var cur = frontier.shift();
      if (cur.cost >= budget) { continue; }
      [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(function (d) {
        var nx = cur.x + d[0], ny = cur.y + d[1];
        var t = terrainOf(state, nx, ny);
        if (!t) { return; }
        if (!canEnter(def, t)) { return; }
        var occupied = state.units.some(function (u) { return u.hp > 0 && u.x === nx && u.y === ny; });
        if (occupied && !(nx === unit.x && ny === unit.y)) { return; }
        var step = t.terrainCost;
        if (def.tags.indexOf('cavalry') >= 0 && t.terrain === 'plain') { step = 1; }
        if (def.tags.indexOf('naval') >= 0 && t.terrain === 'water') { step = 1; }
        var nc = cur.cost + step;
        if (nc > budget) { return; }
        var k = key(nx, ny);
        if (best[k] != null && best[k] <= nc) { return; }
        best[k] = nc;
        frontier.push({ x: nx, y: ny, cost: nc });
      });
    }
    Object.keys(best).forEach(function (k) {
      if (k === key(unit.x, unit.y)) { return; }
      var p = k.split(',');
      out.push({ x: +p[0], y: +p[1], cost: best[k] });
    });
    return out;
  }

  function inRange(state, unit, x, y) {
    var s = statsOf(unit, unit.generalRef);
    var dx = Math.abs(unit.x - x), dy = Math.abs(unit.y - y);
    var dist = dx + dy;
    if (dist > s.range) { return false; }
    if (dist === 0) { return false; }
    // 近战需相邻
    if (s.range === 1 && dist !== 1) { return false; }
    return true;
  }

  function targetsFor(state, unit) {
    return state.units.filter(function (u) {
      return u.hp > 0 && u.faction !== unit.faction && inRange(state, unit, u.x, u.y);
    });
  }

  function unitDef(type) { return UNITS[type]; }

  root.Rules = {
    UNITS: UNITS,
    COUNTER: COUNTER,
    FACTION_MECH: FACTION_MECH,
    terrainOf: terrainOf,
    canEnter: canEnter,
    statsOf: statsOf,
    skillMods: skillMods,
    damage: damage,
    reachable: reachable,
    inRange: inRange,
    targetsFor: targetsFor,
    unitDef: unitDef
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.Rules; }
})(typeof window !== 'undefined' ? window : globalThis);
