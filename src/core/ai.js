/* 《代汉涂高》 — 诸侯庙算
 * 先援危城，再集众攻一，后图远略。行军用广度优先寻路，以免困于山川。
 */
(function (root) {
  'use strict';

  var Rules = root.Rules;
  var MAP = root.MAP;

  function ownCities(st, k) {
    return Object.keys(st.cities)
      .filter(function (c) { return st.cities[c].owner === k; })
      .map(function (c) { return st.cities[c]; });
  }

  function dist(a, b) { return MAP.dist(a.x, a.y, b.x, b.y); }
  function key(x, y) { return x + ',' + y; }

  function hostile(st, a, b) {
    var ENG = root.Engine;
    return !ENG || ENG.atWar(st, a, b);
  }

  /* 广度优先，得自 u 至 goal 之路径（可穿过友军，不可穿越不可通行之地） */
  function pathTo(st, u, goal) {
    var def = Rules.UNITS[u.type];
    var prev = {};
    prev[key(u.x, u.y)] = null;
    var q = [{ x: u.x, y: u.y }];
    var gk = key(goal.x, goal.y);
    var found = false;
    while (q.length) {
      var cur = q.shift();
      if (cur.x === goal.x && cur.y === goal.y) { found = true; break; }
      var dirs = MAP.neighbors(cur.x, cur.y);
      for (var i = 0; i < dirs.length; i++) {
        var nx = dirs[i][0], ny = dirs[i][1];
        var k = key(nx, ny);
        if (prev[k] !== undefined) { continue; }
        var t = Rules.terrainOf(st, nx, ny);
        if (!Rules.canEnter(def, t)) { continue; }
        prev[k] = { x: cur.x, y: cur.y };
        q.push({ x: nx, y: ny });
      }
    }
    if (!found) { return null; }
    var path = [];
    var node = { x: goal.x, y: goal.y };
    while (node) {
      path.unshift(node);
      var p = prev[key(node.x, node.y)];
      node = p;
    }
    return path;
  }

  function takeTurn(st, k) {
    var ENG = root.Engine;
    var mine = ownCities(st, k);
    if (!mine.length) { return; }
    var f = st.factions[k];
    var mech = Rules.FACTION_MECH[k] || {};
    var units = st.units.filter(function (u) { return u.faction === k && u.hp > 0; });

    // —— 征募 ——
    var cap = mine.filter(function (c) { return c.kind === '都城' || c.kind === '州治'; })[0] || mine[0];
    var want = Math.min(8, Math.max(2, Math.ceil(mine.length / 2)));
    var tries = 0;
    while (f.gold > 150 && units.length < 20 && tries < want) {
      var type = pickType(st, cap);
      var cost = ENG.recruitCost(st, type, cap.id);
      if (f.gold < cost * 1.3) { break; }
      var gs = Object.keys(st.generals).filter(function (g) {
        return st.generals[g].owner === k && st.generals[g].status === 'city' && st.generals[g].city === cap.id;
      });
      ENG.recruit(st, cap.id, type, gs[0] || null);
      units = st.units.filter(function (u) { return u.faction === k && u.hp > 0; });
      tries++;
    }

    // —— 在野征辟 ——
    if (f.gold > 600) {
      var wilds = Object.keys(st.generals).filter(function (g) {
        return st.generals[g].status === 'wild' && !st.generals[g].owner;
      });
      if (wilds.length) { ENG.recruitGeneral(st, wilds[0]); }
    }

    // —— 增筑 ——
    mine.forEach(function (c) {
      if (f.gold > 800 && c.level < 5 && st.rng() < 0.5) { ENG.upgradeCity(st, c.id); }
    });

    // —— 本季方略：集众而攻一城 ——
    var target = chooseObjective(st, k, mine);

    units = st.units.filter(function (u) { return u.faction === k && u.hp > 0; });
    units.forEach(function (u) {
      if (st.phase === 'over') { return; }
      u.acted = false;
      u.moveLeft = Rules.statsOf(u, u.generalRef).move;
      act(st, u, mine, target);
    });
  }

  function pickType(st, city) {
    var pool = ['inf', 'spear', 'archer'];
    if (city.level >= 3) { pool.push('cav', 'pike', 'archer'); }
    if (city.level >= 4) { pool.push('crossbow', 'siege', 'siege'); }
    if (city.port) { pool.push('navy'); }
    if (city.zhou === '益州' || city.zhou === '交州') { pool.push('barbcav'); }
    return pool[Math.floor(st.rng() * pool.length)];
  }

  /* 择一城为众矢之的：近、弱、且有路可通者优先 */
  function chooseObjective(st, k, mine) {
    if (!mine.length) { return null; }
    var center = mine.reduce(function (a, c) { return { x: a.x + c.x / mine.length, y: a.y + c.y / mine.length }; }, { x: 0, y: 0 });
    var best = null, bs = 1e9;
    Object.keys(st.cities).forEach(function (cid) {
      var c = st.cities[cid];
      if (c.owner === k) { return; }
      if (c.owner !== 'neutral' && !hostile(st, k, c.owner)) { return; }
      var d = Math.hypot(c.x - center.x, c.y - center.y);
      var score = d + (c.garrison / 90) - c.level * 0.6 + (c.owner === 'neutral' ? 3 : 0);
      if (score < bs) { bs = score; best = c; }
    });
    return best;
  }

  function act(st, u, mine, objective) {
    var ENG = root.Engine;
    var s = Rules.statsOf(u, u.generalRef);

    // 1) 射程之内，优先歼弱
    var allTargets = Rules.targetsFor(st, u);
    var targetList = allTargets.filter(function (t) { return hostile(st, u.faction, t.faction); });
    if (!targetList.length) { targetList = allTargets; }
    var t = targetList.sort(function (a, b) { return a.hp - b.hp; })[0];
    if (t) {
      var r = Rules.damage(st, u, t);
      if (r.dmg >= t.hp * 0.45 || u.hp > t.hp * 1.3 || st.rng() < 0.75) {
        ENG.attackUnit(st, u.id, t.id);
        return;
      }
    }

    // 2) 城下则攻
    var adjCity = nearestEnemyCity(st, u, 1);
    if (adjCity) {
      var hurt = adjCity.c.garrison <= s.atk * 7;
      if (hurt || Rules.UNITS[u.type].tags.indexOf('siege') >= 0 || s.atk >= 55) {
        ENG.attackCity(st, u.id, adjCity.c.id);
        return;
      }
    }

    // 3) 回援危城
    var threat = threatenedCity(st, u, mine);
    var goal = threat || objective;
    if (!goal) { return; }

    var path = pathTo(st, u, goal);
    var reach = Rules.reachable(st, u);
    var step = null;
    if (path && reach.length) {
      var order = {};
      path.forEach(function (p, i) { order[key(p.x, p.y)] = i; });
      var bestIdx = -1;
      reach.forEach(function (p) {
        var o = order[key(p.x, p.y)];
        if (o != null && o > bestIdx) { bestIdx = o; step = p; }
      });
    }
    if (!step) {
      // 无路可通，退而就近
      var bs = 1e9;
      reach.forEach(function (p) {
        var d = MAP.dist(p.x, p.y, goal.x, goal.y) + p.cost * 0.1;
        if (d < bs) { bs = d; step = p; }
      });
    }
    if (step) { ENG.moveTo(st, u.id, step.x, step.y); }

    // 4) 移动之后再看能否出手
    var t2 = Rules.targetsFor(st, u).filter(function (x) { return hostile(st, u.faction, x.faction); })[0];
    if (t2) { ENG.attackUnit(st, u.id, t2.id); return; }
    if (!u.acted) {
      var adj2 = nearestEnemyCity(st, u, 1);
      if (adj2) { ENG.attackCity(st, u.id, adj2.c.id); }
    }
  }

  function nearestEnemyCity(st, u, maxD) {
    var best = null;
    Object.keys(st.cities).forEach(function (cid) {
      var c = st.cities[cid];
      if (c.owner === u.faction || c.owner === 'neutral') { return; }
      if (!hostile(st, u.faction, c.owner)) { return; }
      var d = dist(c, u);
      if (d <= maxD && (!best || d < best.d)) { best = { c: c, d: d }; }
    });
    return best;
  }

  function threatenedCity(st, u, mine) {
    var out = null, bs = 1e9;
    mine.forEach(function (c) {
      var foes = st.units.filter(function (o) {
        return o.hp > 0 && o.faction !== u.faction && hostile(st, u.faction, o.faction) && dist(o, c) <= 3;
      });
      if (!foes.length) { return; }
      var d = dist(c, u);
      if (foes.length * 2 > c.garrison / 200 && d < 8 && d < bs) { bs = d; out = c; }
    });
    if (out && st.rng() < 0.75) { return out; }
    return null;
  }

  root.AI = { takeTurn: takeTurn, pathTo: pathTo };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.AI; }
})(typeof window !== 'undefined' ? window : globalThis);
