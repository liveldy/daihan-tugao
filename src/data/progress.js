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

  /* 剧本是否已开：首局恒开，其本传之局（与君主默认之年相符者）亦恒开，
   * 余者前局全克方开 */
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
    return done(lordKey, prev.id) >= prev.stages.length;
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

  root.PROGRESS = {
    KEY: KEY,
    done: done,
    mark: mark,
    touch: touch,
    last: last,
    stageOpen: stageOpen,
    scenarioOpen: scenarioOpen,
    tally: tally,
    lordTally: lordTally,
    reset: reset
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.PROGRESS; }
})(typeof window !== 'undefined' ? window : globalThis);
