/* 《代汉涂高》 — 剧本与关卡
 * 一君主多剧本，一剧本多关卡：关卡层层递进，末关为开放型（无目标，任玩家自为）。
 * 数据分册见 src/data/scenarios_1.js 起，本文件只作编次与判定义。
 */
(function (root) {
  'use strict';

  var MAP = root.MAP;

  /* 数据分册合而为一，仿志传（Story.allStories）之例 */
  function all() {
    var c = {};
    ['CAMPAIGNS', 'CAMPAIGNS_PART1', 'CAMPAIGNS_PART2', 'CAMPAIGNS_PART3',
      'CAMPAIGNS_PART4', 'CAMPAIGNS_PART5'].forEach(function (k) {
      if (root[k]) { Object.keys(root[k]).forEach(function (id) { c[id] = root[k][id]; }); }
    });
    return c;
  }

  function forLord(lordKey) { return all()[lordKey] || null; }

  function scenariosOf(lordKey) {
    var c = forLord(lordKey);
    return (c && c.scenarios) || [];
  }

  /* 取某局：which 为 id 或序号；未指（null/undefined）则不取，由调用者另定默认 */
  function scenarioOf(lordKey, which) {
    var list = scenariosOf(lordKey);
    if (which == null) { return null; }
    if (typeof which === 'number') { return list[which] || null; }
    return list.filter(function (s) { return s.id === which; })[0] || null;
  }

  /* 未指定剧本时，取与该君主默认剧本（lord.era）相符者；无则取首局 */
  function defaultScenario(lordKey) {
    var list = scenariosOf(lordKey);
    var lord = root.FACTIONS_DATA ? root.FACTIONS_DATA.LORDS[lordKey] : null;
    var match = list.filter(function (s) { return lord && s.era === lord.era; })[0];
    return match || list[0] || null;
  }

  function scenarioIndex(lordKey, sid) {
    var list = scenariosOf(lordKey);
    for (var i = 0; i < list.length; i++) { if (list[i].id === sid) { return i; } }
    return -1;
  }

  function stageOf(lordKey, sid, idx) {
    var sc = scenarioOf(lordKey, sid);
    if (!sc) { return null; }
    return sc.stages[idx] || null;
  }

  function stageCount(lordKey, sid) {
    var sc = scenarioOf(lordKey, sid);
    return sc ? sc.stages.length : 0;
  }

  function cityName(id) { return MAP.CITY_INDEX[id] ? MAP.CITY_INDEX[id].name : id; }
  function sideName(f) { return MAP.FACTIONS[f] ? MAP.FACTIONS[f].long : f; }

  function countOwn(st, k) {
    return Object.keys(st.cities).filter(function (c) { return st.cities[c].owner === k; }).length;
  }

  /* 目标之文：由 goal 直书，不假人工文案 */
  function goalText(goal) {
    if (!goal || goal.open) { return '无定式：此后放任自为，混一宇内，唯君所之。'; }
    var parts = [];
    if (goal.cities && goal.cities.length) {
      parts.push('取' + goal.cities.map(cityName).join('、') + '诸城');
    }
    if (goal.factions && goal.factions.length) {
      parts.push('灭' + goal.factions.map(sideName).join('、'));
    }
    if (goal.minCities) { parts.push('据城 ' + goal.minCities + ' 座以上'); }
    if (goal.turns) { parts.push('支撑至第 ' + goal.turns + ' 回合'); }
    if (goal.strife != null) { parts.push('平朋党之争，党争降至 ' + goal.strife + ' 以下'); }
    if (goal.heir) { parts.push('定储位以安众心'); }
    if (goal.legit != null) { parts.push('名分至于 ' + goal.legit + ' 以上'); }
    if (goal.unify) { parts.push('尽有舆图城池'); }
    return parts.length ? parts.join('，') : '无定式';
  }

  /* 目标是否达成（开放型永不「达成」，唯待一统） */
  function goalMet(st, goal) {
    if (!goal || goal.open) { return false; }
    var me = st.player;
    if (goal.cities && !goal.cities.every(function (c) {
      return st.cities[c] && st.cities[c].owner === me;
    })) { return false; }
    if (goal.factions && !goal.factions.every(function (f) {
      return !st.factions[f] || !st.factions[f].alive;
    })) { return false; }
    if (goal.minCities && countOwn(st, me) < goal.minCities) { return false; }
    if (goal.turns && st.turn < goal.turns) { return false; }
    // 朝局之志：党争、储位、名分（见 src/core/politics.js）
    if (goal.strife != null && !(st.court && st.court.strife <= goal.strife)) { return false; }
    if (goal.heir && !(st.court && st.court.heir)) { return false; }
    if (goal.legit != null && !(st.court && st.court.legit >= goal.legit)) { return false; }
    if (goal.unify && countOwn(st, me) < Object.keys(st.cities).length) { return false; }
    return true;
  }

  /* 目标进度之文，示于军情栏 */
  function goalProgress(st, goal) {
    if (!goal || goal.open) { return ''; }
    var me = st.player;
    var out = [];
    if (goal.cities && goal.cities.length) {
      var got = goal.cities.filter(function (c) { return st.cities[c] && st.cities[c].owner === me; }).length;
      out.push('目标城 ' + got + '/' + goal.cities.length);
    }
    if (goal.factions && goal.factions.length) {
      var dead = goal.factions.filter(function (f) { return !st.factions[f] || !st.factions[f].alive; }).length;
      out.push('已灭 ' + dead + '/' + goal.factions.length);
    }
    if (goal.minCities) { out.push('城池 ' + countOwn(st, me) + '/' + goal.minCities); }
    if (goal.turns) { out.push('回合 ' + Math.min(st.turn, goal.turns) + '/' + goal.turns); }
    if (goal.strife != null) { out.push('党争 ' + (st.court ? Math.round(st.court.strife) : '—') + '/' + goal.strife); }
    if (goal.heir) { out.push('储位 ' + (st.court && st.court.heir ? st.court.heir.name : '未立')); }
    if (goal.legit != null) { out.push('名分 ' + (st.court ? Math.round(st.court.legit) : '—') + '/' + goal.legit); }
    return out.join('　');
  }

  root.Campaign = {
    all: all,
    forLord: forLord,
    scenariosOf: scenariosOf,
    scenarioOf: scenarioOf,
    defaultScenario: defaultScenario,
    scenarioIndex: scenarioIndex,
    stageOf: stageOf,
    stageCount: stageCount,
    goalText: goalText,
    goalMet: goalMet,
    goalProgress: goalProgress,
    countOwn: countOwn,
    cityName: cityName,
    sideName: sideName
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.Campaign; }
})(typeof window !== 'undefined' ? window : globalThis);
