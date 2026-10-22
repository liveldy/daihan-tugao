/* 《代汉涂高》 — 朝局
 * 汉末之乱，非独兵戈：外戚宦官相倾，朋党储位相攻，士大夫与权臣相轧。
 * 本模块司三事：政争事件（依年依势而发，玩家抉择）、议政（朝会集议，取一策而行）、
 * 立储（定储位，动党争与名分）。数据见 src/data/politics_1.js。
 * 不含 DOM 依赖，可在 Node 下推演。
 */
(function (root) {
  'use strict';

  function data() { return root.POLITICS || { events: [], topics: [], heirs: {} }; }
  function events() { return data().events || []; }
  function topics_() { return data().topics || []; }
  function heirsOf(lordKey) {
    var h = (data().heirs || {})[lordKey];
    return h || [];
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* —— 开局 —— */
  function init(st) {
    var lord = st.lord || {};
    st.court = {
      strife: 8,             // 党争：朋党相攻之烈，0—100
      legit: lord.faction === 'han' ? 80 : 55,  // 名分：正统之望，0—100
      heir: null,            // 储位：{id, name, order}
      councils: 0,           // 已议之事
      lastCouncil: -99,      // 上次议政之回合
      topicAt: {},           // 各题冷却
      fired: {},             // 已发之政争
      pending: null,         // 待决之政争（呈于朝堂）
      history: []
    };
    return st.court;
  }

  function court(st) {
    if (!st.court) { init(st); }
    return st.court;
  }

  function findGeneralName(st, id) {
    var E = root.Engine;
    var g = E && E.allGenerals ? E.allGenerals()[id] : null;
    return g ? g.name : id;
  }

  function note(st, text, kind) {
    court(st).history.push({ turn: st.turn, text: text, kind: kind || 'info' });
    if (court(st).history.length > 60) { court(st).history.shift(); }
    var E = root.Engine;
    if (E && E.log) { E.log(st, text, kind); }
  }

  /* 党争、名分之别称，供界面显示 */
  function strifeLabel(v) {
    if (v < 10) { return '朝野无事'; }
    if (v < 25) { return '小有异同'; }
    if (v < 45) { return '朋党渐成'; }
    if (v < 65) { return '朋党相攻'; }
    if (v < 85) { return '朝纲大坏'; }
    return '将生大变';
  }

  function status(st) {
    var c = court(st);
    return {
      strife: Math.round(c.strife), legit: Math.round(c.legit),
      label: strifeLabel(c.strife),
      heir: c.heir ? c.heir.name : null,
      heirId: c.heir ? c.heir.id : null,
      canSeal: heirsOf(st.lordKey).length > 0,
      pending: c.pending ? c.pending.id : null,
      councils: c.councils
    };
  }

  /* —— 效果 —— */
  /* 效果分两半：court 诸项本模块自处，余者一律交志传（Story.applyEffect），免生二法 */
  function applyEffect(st, ef, out) {
    if (!ef) { return out; }
    var notes = (out && out.effects) || [];
    var c = court(st);
    if (ef.court) {
      var cw = ef.court;
      if (typeof cw.strife === 'number' && cw.strife !== 0) {
        c.strife = clamp(c.strife + cw.strife, 0, 100);
        notes.push('党争 ' + (cw.strife > 0 ? '+' : '') + cw.strife + '（今 ' + Math.round(c.strife) + '）');
      }
      if (typeof cw.legit === 'number' && cw.legit !== 0) {
        c.legit = clamp(c.legit + cw.legit, 0, 100);
        notes.push('名分 ' + (cw.legit > 0 ? '+' : '') + cw.legit + '（今 ' + Math.round(c.legit) + '）');
      }
      if (typeof cw.loyalty === 'number' && cw.loyalty !== 0) {
        Object.keys(st.generals).forEach(function (gid) {
          var g = st.generals[gid];
          if (g.owner !== st.player) { return; }
          g.loyalty = clamp((g.loyalty == null ? 80 : g.loyalty) + cw.loyalty, 0, 100);
        });
        notes.push('臣心 ' + (cw.loyalty > 0 ? '+' : '') + cw.loyalty);
      }
      if (cw.unsealHeir) {
        if (c.heir) { note(st, '废储' + c.heir.name + '，朝议沸腾。', 'bad'); }
        c.heir = null;
        notes.push('储位空悬');
      }
      if (cw.sealHeir) {
        var r = seal(st, cw.sealHeir, true);
        if (r.ok) { notes.push(r.msg); }
      }
      if (cw.purge || cw.purgeDeath) {
        var pid = cw.purge || cw.purgeDeath;
        var g2 = st.generals[pid];
        var nm = findGeneralName(st, pid);
        if (g2) {
          if (cw.purgeDeath) { g2.status = 'dead'; g2.owner = null; g2.unit = null; g2.city = null; }
          else { g2.status = 'wild'; g2.owner = null; g2.unit = null; g2.city = null; }
          st.units.forEach(function (u) {
            if (u.general === pid) { u.general = null; u.generalRef = null; }
          });
          notes.push(nm + (cw.purgeDeath ? '伏诛' : '免官'));
        }
      }
    }
    var rest = {};
    var touched = false;
    Object.keys(ef).forEach(function (k) {
      if (k === 'court') { return; }
      rest[k] = ef[k]; touched = true;
    });
    if (touched && root.Story) { root.Story.applyEffect(st, rest, out); }
    return out;
  }

  /* —— 议政：朝会集议，取一策而行 —— */
  function topicsFor(st) {
    var c = court(st);
    return topics_().map(function (t) {
      var cd = t.cooldown == null ? 6 : t.cooldown;
      var last = c.topicAt[t.id];
      var used = c.topics && c.topics[t.id];
      var off = (typeof last === 'number' && st.turn - last < cd);
      var exhausted = !!t.once && !!used;
      var cost = t.cost || {};
      var f = st.factions[st.player];
      var poor = (f.gold < (cost.gold || 0)) || (f.prestige < (cost.prestige || 0));
      return {
        id: t.id, name: t.name, desc: t.desc || '', src: t.src || '',
        options: t.options || [], cost: cost,
        readyTurn: off ? (last + cd) : null,
        open: !off && !exhausted && !poor && (c.lastCouncil !== st.turn),
        why: exhausted ? '此事已议' : (off ? ('尚须 ' + (last + cd - st.turn) + ' 回合') : (poor ? '金帛或威望不足' : (c.lastCouncil === st.turn ? '本回合已议一事' : '')))
      };
    });
  }

  function council(st, topicId, optIdx) {
    if (st.phase === 'over') { return fail('战事已终'); }
    var c = court(st);
    if (c.lastCouncil === st.turn) { return fail('本回合已议一事，不可频议'); }
    var t = topics_().filter(function (x) { return x.id === topicId; })[0];
    if (!t) { return fail('无此议题'); }
    var cd = t.cooldown == null ? 6 : t.cooldown;
    var last = c.topicAt[t.id];
    if (typeof last === 'number' && st.turn - last < cd) { return fail('此议尚须再候 ' + (last + cd - st.turn) + ' 回合'); }
    if (t.once && c.topics && c.topics[t.id]) { return fail('此事已议过'); }
    var f = st.factions[st.player];
    var cost = t.cost || {};
    if (f.gold < (cost.gold || 0)) { return fail('金帛不足（需 ' + cost.gold + '）'); }
    if (f.prestige < (cost.prestige || 0)) { return fail('威望不足（需 ' + cost.prestige + '）'); }
    var opt = (t.options || [])[Math.min(optIdx || 0, (t.options || []).length - 1)];
    if (!opt) { return fail('无此策'); }
    f.gold -= (cost.gold || 0);
    f.prestige = clamp(f.prestige - (cost.prestige || 0), 0, 100);
    c.councils += 1;
    c.lastCouncil = st.turn;
    c.topicAt[t.id] = st.turn;
    c.topics = c.topics || {};
    c.topics[t.id] = (c.topics[t.id] || 0) + 1;
    var out = { effects: [] };
    applyEffect(st, opt.effect, out);
    note(st, '【议政·' + t.name + '】' + opt.text + '。' + (opt.reply || ''), 'good');
    return { ok: true, msg: '朝议已定：' + opt.text + '。' + (out.effects.length ? '（' + out.effects.join('　') + '）' : ''),
      data: { notes: out.effects } };
  }

  /* —— 立储 —— */
  function candidates(st) {
    var c = court(st);
    var E = root.Engine;
    var reg = E && E.allGenerals ? E.allGenerals() : {};
    return heirsOf(st.lordKey).map(function (h) {
      var g = reg[h.id] || {};
      return {
        id: h.id, name: h.name, order: h.order, claim: h.claim || '', note: h.note || '',
        stats: g.stats || null, impact: g.impact || 0,
        current: !!(c.heir && c.heir.id === h.id),
        alive: !st.generals[h.id] || st.generals[h.id].status !== 'dead'
      };
    });
  }

  /* 立储：名分所关。立嫡则朝局粗安（党争降），废长立幼则朋党益盛 */
  function seal(st, candId, quiet) {
    var c = court(st);
    var list = heirsOf(st.lordKey);
    if (!list.length) { return fail('本朝无储可议'); }
    var h = list.filter(function (x) { return x.id === candId; })[0];
    if (!h) { return fail('此人不在诸子之列'); }
    var g = st.generals[candId];
    if (g && g.status === 'dead') { return fail(h.name + '已殁，不可为嗣'); }
    var f = st.factions[st.player];
    if (!quiet) {
      if (f.prestige < 10) { return fail('威望不足（需 10）以定大计'); }
      f.prestige = clamp(f.prestige - 10, 0, 100);
    }
    var delta = -8 + Math.max(0, (h.order || 1) - 1) * 7;   // 立嫡则党争降，废长立幼则党争升
    c.strife = clamp(c.strife + delta, 0, 100);
    c.heir = { id: candId, name: h.name, order: h.order || 1, claim: h.claim || '' };
    if (g) { g.loyalty = clamp((g.loyalty == null ? 80 : g.loyalty) + (h.order === 1 ? 8 : -4), 0, 100); }
    Object.keys(st.generals).forEach(function (gid) {
      var gg = st.generals[gid];
      if (gg.owner !== st.player) { return; }
      gg.loyalty = clamp((gg.loyalty == null ? 80 : gg.loyalty) + (h.order === 1 ? 3 : 0), 0, 100);
    });
    note(st, '立' + h.name + '为储（' + (h.claim || '诸子') + '）。党争 ' + (delta > 0 ? '+' : '') + delta +
      '（今 ' + Math.round(c.strife) + '）。', delta > 0 ? 'bad' : 'good');
    return ok('已立' + h.name + '为嗣。' + (delta > 0 ? '（废长立幼，众心未服）' : '（名分既定，朝局稍安）'));
  }

  function setHeir(st, candId) {
    if (st.phase === 'over') { return fail('战事已终'); }
    var c = court(st);
    if (c.heir && c.heir.id === candId) { return fail(c.heir.name + '已为储君'); }
    if (c.heir) {
      if (st.factions[st.player].prestige < 20) { return fail('废立大事，威望不足（需 20）'); }
      st.factions[st.player].prestige -= 20;
      note(st, '废' + c.heir.name + '，改立' + findGeneralName(st, candId) + '。朝议纷然。', 'bad');
      c.strife = clamp(c.strife + 10, 0, 100);
    }
    // 废立大事，其费已纳于上，不再重收立储之费
    return seal(st, candId, !!c.heir);
  }

  /* —— 政争事件 —— */
  function meetsRequires(st, e) {
    var r = e.requires;
    if (!r) { return true; }
    var c = court(st);
    var mine = Object.keys(st.cities).filter(function (k) { return st.cities[k].owner === st.player; }).length;
    if (r.minCities != null && mine < r.minCities) { return false; }
    if (r.minPrestige != null && st.factions[st.player].prestige < r.minPrestige) { return false; }
    if (r.strifeAtLeast != null && c.strife < r.strifeAtLeast) { return false; }
    if (r.strifeAtMost != null && c.strife > r.strifeAtMost) { return false; }
    if (r.heir === true && !c.heir) { return false; }
    if (r.heir === false && c.heir) { return false; }
    if (r.flag && !st.flags[r.flag]) { return false; }
    return true;
  }

  function eligible(st, e) {
    var c = court(st);
    if (e.once !== false && c.fired[e.id]) { return false; }
    if (st.year < (e.year || 0)) { return false; }
    if (e.year != null && st.year > (e.year || 0) + 20) { return false; }   // 时过境迁，久而不发
    if (e.factions && e.factions.indexOf(st.player) < 0) { return false; }
    if (e.lords && e.lords.indexOf(st.lordKey) < 0) { return false; }
    if (!meetsRequires(st, e)) { return false; }
    return true;
  }

  /* 每回合自可用之政争中取一条呈上（一年之内不发二事） */
  function checkEvent(st) {
    var c = court(st);
    if (c.pending) { return c.pending; }
    if (st.flags['politic_turn'] === st.turn) { return null; }
    var pool = events().filter(function (e) { return eligible(st, e); });
    if (!pool.length) { return null; }
    // 先依年份由近及远（史事自有时序），同者取先列
    pool.sort(function (a, b) { return (a.year || 0) - (b.year || 0); });
    var e = pool[0];
    c.fired[e.id] = st.turn;
    st.flags['politic_turn'] = st.turn;
    c.pending = e;
    note(st, '【' + e.name + '】事发于朝。', 'bad');
    return e;
  }

  function pendingEvent(st) { return court(st).pending; }

  function resolveEvent(st, optIdx) {
    var c = court(st);
    var e = c.pending;
    if (!e) { return fail('朝中无事待决'); }
    var opt = (e.choice && e.choice.options || [])[Math.min(optIdx || 0, ((e.choice && e.choice.options) || []).length - 1)];
    if (!opt) { return fail('无此抉择'); }
    var out = { effects: [] };
    applyEffect(st, opt.effect, out);
    c.pending = null;
    note(st, '【' + e.name + '】' + opt.text + '。' + (opt.reply || ''), 'info');
    return { ok: true, msg: opt.reply || opt.text, data: { notes: out.effects } };
  }

  /* —— 每回合之朝局消长 —— */
  function tick(st) {
    if (!st.court || st.phase === 'over') { return []; }
    var c = court(st);
    var f = st.factions[st.player];
    var said = [];

    // 储位未定而国有诸子，则众心不安，朋党渐起
    if (!c.heir && heirsOf(st.lordKey).length) { c.strife += 1.5; }
    // 威望足以服众，则朝纲稍振
    if (f.prestige >= 60) { c.strife -= 1.5; }
    if (f.prestige <= 20) { c.strife += 1; }
    // 名分随威望与享国自正
    c.legit += (f.prestige >= 50 ? 0.5 : -0.4);
    c.strife = clamp(c.strife, 0, 100);
    c.legit = clamp(c.legit, 0, 100);

    // 臣心：党争则离心，名分正则归心
    Object.keys(st.generals).forEach(function (gid) {
      var g = st.generals[gid];
      if (g.owner !== st.player) { return; }
      var d = (c.strife >= 55 ? -1 : 0) + (c.legit >= 65 ? 0.5 : -0.2);
      g.loyalty = clamp((g.loyalty == null ? 80 : g.loyalty) + d, 0, 100);
    });

    // 党争既烈，则内衅生：或大臣去国，或郡县离心
    if (c.strife >= 65 && st.rng() < (c.strife - 55) / 120) {
      var mine = Object.keys(st.generals).filter(function (gid) {
        var g = st.generals[gid];
        return g.owner === st.player && g.status !== 'dead' && (g.loyalty || 80) < 55;
      });
      if (mine.length) {
        var pick = mine[Math.floor(st.rng() * mine.length)];
        var nm = findGeneralName(st, pick);
        var bad = st.generals[pick];
        bad.owner = null; bad.status = 'wild'; bad.unit = null; bad.city = null;
        st.units.forEach(function (u) { if (u.general === pick) { u.general = null; u.generalRef = null; } });
        note(st, '党争之祸：' + nm + '见疑于朝，弃官而去。', 'bad');
        said.push('党争之祸：' + nm + '去国');
      } else {
        var mine2 = Object.keys(st.cities).filter(function (k) { return st.cities[k].owner === st.player; });
        if (mine2.length) {
          var cid = mine2[Math.floor(st.rng() * mine2.length)];
          st.cities[cid].unrest = clamp(st.cities[cid].unrest + 20, 0, 100);
          st.cities[cid].morale = clamp(st.cities[cid].morale - 12, 0, 100);
          note(st, '党争之祸：' + st.cities[cid].name + '吏民惶惑，民心大损。', 'bad');
          said.push('党争之祸：' + st.cities[cid].name + '离心');
        }
      }
    }

    // 名分正，则民心自安
    if (c.legit >= 70) {
      Object.keys(st.cities).forEach(function (k) {
        if (st.cities[k].owner === st.player) { st.cities[k].morale = clamp(st.cities[k].morale + 1, 0, 100); }
      });
    }

    checkEvent(st);
    return said;
  }

  function ok(msg, data) { return { ok: true, msg: msg, data: data }; }
  function fail(msg) { return { ok: false, msg: msg }; }

  root.Politics = {
    init: init,
    court: court,
    status: status,
    strifeLabel: strifeLabel,
    applyEffect: applyEffect,
    topicsFor: topicsFor,
    council: council,
    candidates: candidates,
    setHeir: setHeir,
    heirsOf: heirsOf,
    eligible: eligible,
    checkEvent: checkEvent,
    pendingEvent: pendingEvent,
    resolveEvent: resolveEvent,
    tick: tick,
    all: data
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.Politics; }
})(typeof window !== 'undefined' ? window : globalThis);
