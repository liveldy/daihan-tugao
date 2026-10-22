/* 《代汉涂高》 — 关卡进度
 * 记于浏览器本地（localStorage），示已克之关：剧本之内逐关解锁，剧本之间亦依次递进。
 * 正式版之云存档与账号另立（见 src/data/version.js 之 stage 一段）。
 */
(function (root) {
  'use strict';

  var KEY = 'daihan_tugao.progress.v1';
  var mem = null;

  function blank() { return { v: 1, lords: {} }; }

  function raw() {
    if (mem) { return mem; }
    try {
      var s = root.localStorage ? root.localStorage.getItem(KEY) : null;
      mem = s ? JSON.parse(s) : blank();
    } catch (e) { mem = blank(); }
    if (!mem || typeof mem !== 'object') { mem = blank(); }
    if (!mem.lords) { mem.lords = {}; }
    return mem;
  }

  function save() {
    try { if (root.localStorage) { root.localStorage.setItem(KEY, JSON.stringify(raw())); } } catch (e) { /* 无存储则只存于内存 */ }
  }

  /* 某剧本已克之关数（前 done 关已过） */
  function done(lordKey, sid) {
    var l = raw().lords[lordKey];
    if (!l || !l[sid]) { return 0; }
    return l[sid].done || 0;
  }

  /* 记一关之克 */
  function mark(lordKey, sid, idx) {
    var r = raw();
    var l = r.lords[lordKey] = r.lords[lordKey] || {};
    var e = l[sid] = l[sid] || { done: 0 };
    if (idx + 1 > e.done) { e.done = idx + 1; }
    e.ts = Date.now();
    save();
    return e.done;
  }

  /* 记「正在此处」，供续战之用（未必要克） */
  function touch(lordKey, sid) {
    var r = raw();
    var l = r.lords[lordKey] = r.lords[lordKey] || {};
    var e = l[sid] = l[sid] || { done: 0 };
    e.ts = Date.now();
    save();
  }

  /* 最近所战之局与关，供「续战」直入 */
  function last() {
    var r = raw(), best = null;
    Object.keys(r.lords).forEach(function (k) {
      Object.keys(r.lords[k]).forEach(function (sid) {
        var e = r.lords[k][sid] || {};
        if (!best || (e.ts || 0) > (best.ts || 0)) { best = { lord: k, sid: sid, done: e.done || 0, ts: e.ts || 0 }; }
      });
    });
    if (!best) { return null; }
    var C = root.Campaign;
    var sc = C ? C.scenarioOf(best.lord, best.sid) : null;
    if (!sc) { return null; }
    var idx = Math.max(0, Math.min(best.done, sc.stages.length - 1));
    return {
      lord: best.lord, scenario: best.sid, index: idx,
      scenarioName: sc.name, stageName: sc.stages[idx].name
    };
  }

  /* 第 idx 关（自 0 起）是否已开：首关恒开，余者前关已克方开 */
  function stageOpen(lordKey, sid, idx) {
    return idx <= done(lordKey, sid);
  }

  /* 一局之中「非无定式」之关数：末关为开放型（无目标，唯待一统），余关皆有定志 */
  function nonOpenCount(lordKey, sid) {
    var C = root.Campaign;
    var sc = C ? C.scenarioOf(lordKey, sid) : null;
    if (!sc) { return 0; }
    return sc.stages.filter(function (s) { return !(s.goal && s.goal.open); }).length;
  }

  /* 常规通关：该局之「非无定式」诸关皆克（末关开放型不在其列） */
  function scenarioNormalClear(lordKey, sid) {
    var n = nonOpenCount(lordKey, sid);
    return n > 0 && done(lordKey, sid) >= n;
  }

  /* 完全通关：该局之诸关皆克，含末关开放型（须一统方成） */
  function scenarioComplete(lordKey, sid) {
    var C = root.Campaign;
    var sc = C ? C.scenarioOf(lordKey, sid) : null;
    if (!sc) { return false; }
    return done(lordKey, sid) >= sc.stages.length;
  }

  /* 一君主之进展：常规通关（所有非无定式之关皆克）／完全通关（所有关卡皆克） */
  function lordStatus(lordKey) {
    var C = root.Campaign;
    if (!C) { return { normal: false, complete: false, done: 0, total: 0, nonOpen: 0, doneNonOpen: 0, scenarios: 0, cleared: 0 }; }
    var list = C.scenariosOf(lordKey);
    var total = 0, nonOpen = 0, doneNonOpen = 0, doneAll = 0, cleared = 0, full = 0;
    list.forEach(function (sc) {
      var n = nonOpenCount(lordKey, sc.id);
      var d = done(lordKey, sc.id);
      total += sc.stages.length;
      nonOpen += n;
      doneNonOpen += Math.min(d, n);
      doneAll += Math.min(d, sc.stages.length);
      if (n > 0 && d >= n) { cleared++; }
      if (d >= sc.stages.length) { full++; }
    });
    return {
      lord: lordKey, normal: nonOpen > 0 && doneNonOpen >= nonOpen, complete: total > 0 && doneAll >= total,
      done: doneAll, total: total, nonOpen: nonOpen, doneNonOpen: doneNonOpen,
      scenarios: list.length, cleared: cleared, full: full
    };
  }

  /* 通关之标识（一短语），供择主界面与主页面显示 */
  function lordMark(lordKey) {
    var s = lordStatus(lordKey);
    if (s.complete) { return '完全通关'; }
    if (s.normal) { return '常规通关'; }
    if (s.done) { return '已克 ' + s.done + '／' + s.total + ' 关'; }
    return '';
  }

  /* 常规通关之君主（兵书志略之门以此为准） */
  function normalLords() {
    var FD = root.FACTIONS_DATA || { LORDS: {} };
    return Object.keys(FD.LORDS).filter(function (k) { return lordStatus(k).normal; });
  }

  function completeLords() {
    var FD = root.FACTIONS_DATA || { LORDS: {} };
    return Object.keys(FD.LORDS).filter(function (k) { return lordStatus(k).complete; });
  }

  /* 兵书志略之启：至少常规通关三名君主 */
  var WIKI_GATE = 3;
  function wikiOpen() { return normalLords().length >= WIKI_GATE; }

  /* 剧本是否已开：首局恒开，其本传之局（与君主默认之年相符者）亦恒开，
   * 余者前局「常规通关」（其非无定式诸关皆克；末关开放型不必克）方开 */
  function scenarioOpen(lordKey, sid) {
    var C = root.Campaign;
    if (!C) { return true; }
    var list = C.scenariosOf(lordKey);
    var i = C.scenarioIndex(lordKey, sid);
    if (i < 0) { return false; }
    if (i === 0) { return true; }
    var def = C.defaultScenario(lordKey);
    if (def && def.id === sid) { return true; }
    var prev = list[i - 1];
    return scenarioNormalClear(lordKey, prev.id);
  }

  /* 全局或某君主之进展：已克之关 / 关卡总数 */
  function tally(lordKey) {
    var C = root.Campaign;
    if (!C) { return { done: 0, total: 0 }; }
    var keys = lordKey ? [lordKey]
      : Object.keys((root.FACTIONS_DATA || { LORDS: {} }).LORDS);
    var d = 0, t = 0;
    keys.forEach(function (k) {
      C.scenariosOf(k).forEach(function (sc) {
        t += sc.stages.length;
        d += Math.min(done(k, sc.id), sc.stages.length);
      });
    });
    return { done: d, total: t };
  }

  function reset(lordKey) {
    var r = raw();
    if (lordKey) { delete r.lords[lordKey]; } else { r.lords = {}; }
    save();
  }

  /* 已着手诸君之进展，作一行小字 */
  function lordTally() {
    var C = root.Campaign;
    if (!C) { return ''; }
    var FD = root.FACTIONS_DATA || { LORDS: {} };
    return Object.keys(FD.LORDS).filter(function (k) { return raw().lords[k]; })
      .map(function (k) {
        var t = tally(k);
        return FD.LORDS[k].name + ' ' + t.done + '／' + t.total;
      }).join('　');
  }

  /* 导出／载入：云存档即此二事（见 src/data/account.js 与 server/） */
  function snapshot() { return JSON.parse(JSON.stringify(raw())); }

  function restore(obj) {
    if (!obj || typeof obj !== 'object') { return false; }
    var next = blank();
    next.v = obj.v || 1;
    next.lords = {};
    Object.keys(obj.lords || {}).forEach(function (k) {
      var per = obj.lords[k] || {};
      next.lords[k] = {};
      Object.keys(per).forEach(function (sid) {
        var e = per[sid] || {};
        next.lords[k][sid] = { done: Math.max(0, Math.min(99, e.done || 0)), ts: e.ts || 0 };
      });
    });
    mem = next;
    save();
    return true;
  }

  root.PROGRESS = {
    KEY: KEY,
    WIKI_GATE: WIKI_GATE,
    done: done,
    mark: mark,
    touch: touch,
    last: last,
    stageOpen: stageOpen,
    scenarioOpen: scenarioOpen,
    nonOpenCount: nonOpenCount,
    scenarioNormalClear: scenarioNormalClear,
    scenarioComplete: scenarioComplete,
    lordStatus: lordStatus,
    lordMark: lordMark,
    normalLords: normalLords,
    completeLords: completeLords,
    wikiOpen: wikiOpen,
    tally: tally,
    lordTally: lordTally,
    reset: reset,
    snapshot: snapshot,
    restore: restore
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.PROGRESS; }
})(typeof window !== 'undefined' ? window : globalThis);
