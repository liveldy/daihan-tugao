/* 《代汉涂高》 — 氏族
 * 汉末之天下，非独君臣相制，亦门第相高：颍川之荀陈、汝南之袁、吴郡之顾陆朱张，
 * 一族之向背，往往系一州之安危。本模块司四事：
 *   一、编次本局「有涉于吾」之氏族（吾之势力所附、或其在朝有人在吾幕府、或其在野之士居吾疆）；
 *   二、氏族之「向背」（support 0—100）之每季消长；
 *   三、与氏族往来四事：联姻、征辟其子弟、任用其族、裁抑强宗；
 *   四、向背之效：向背厚则岁入稍增、名分稍正、其在朝者忠心；向背薄则朋党益盛、人心离贰。
 * 数据见 src/data/clans_1.js 起。不含 DOM 依赖，可在 Node 下推演。
 */
(function (root) {
  'use strict';

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* —— 数据 —— */
  function all() {
    var out = [];
    ['CLANS', 'CLANS_PART1', 'CLANS_PART2', 'CLANS_PART3'].forEach(function (k) {
      var d = root[k];
      if (d && d.clans && d.clans.length) { out = out.concat(d.clans); }
    });
    return out;
  }

  function byId(id) {
    return all().filter(function (c) { return c.id === id; })[0] || null;
  }

  function generalOf(id) {
    var E = root.Engine;
    var reg = E && E.allGenerals ? E.allGenerals() : {};
    return reg[id] || null;
  }

  /* —— 开局 —— */
  function init(st) {
    st.clans = {};
    all().forEach(function (c) {
      st.clans[c.id] = {
        id: c.id, support: 55, at: {}, recruited: 0, lastTurn: st.turn
      };
    });
    return st.clans;
  }

  function box(st) {
    if (!st.clans) { init(st); }
    return st.clans;
  }

  function state(st, id) { return box(st)[id] || null; }
  function support(st, id) { var s = state(st, id); return s ? s.support : 0; }

  /* 向背之辞，供界面显示 */
  function label(v) {
    if (v >= 80) { return '倾心相附'; }
    if (v >= 65) { return '亲附'; }
    if (v >= 45) { return '观望'; }
    if (v >= 30) { return '貌合神离'; }
    if (v >= 15) { return '离心'; }
    return '仇雠相视';
  }

  /* 某族是否有涉于吾 */
  function touches(st, c) {
    if ((c.factions || []).indexOf(st.player) >= 0) { return true; }
    return (c.members || []).some(function (id) {
      var g = st.generals[id];
      if (!g || g.status === 'dead') { return false; }
      if (g.owner === st.player) { return true; }
      if (!g.owner && g.status === 'wild' && g.city) {
        var ct = st.cities[g.city];
        return !!(ct && ct.owner === st.player);
      }
      return false;
    });
  }

  /* 本局有涉之氏族，向背高者列前 */
  function relevant(st) {
    box(st);
    return all().filter(function (c) { return touches(st, c); }).sort(function (a, b) {
      return support(st, b.id) - support(st, a.id);
    });
  }

  /* 某族在吾幕府者（含在朝、在军） */
  function serving(st, c) {
    return (c.members || []).map(function (id) {
      var g = st.generals[id];
      var d = generalOf(id);
      if (!g || !d || g.status === 'dead') { return null; }
      if (g.owner !== st.player) { return null; }
      return { id: id, name: d.name, status: g.status, loyalty: Math.round(g.loyalty || 0) };
    }).filter(Boolean).sort(function (a, b) { return b.loyalty - a.loyalty; });
  }

  /* 某族在野可辟者（其人在本局活动中、无主） */
  function recruitable(st, c) {
    return (c.members || []).map(function (id) {
      var g = st.generals[id];
      var d = generalOf(id);
      if (!g || !d || g.status === 'dead') { return null; }
      if (g.owner || g.status !== 'wild') { return null; }
      return { id: id, name: d.name, impact: d.impact || 0, stats: d.stats || null };
    }).filter(Boolean).sort(function (a, b) { return b.impact - a.impact; });
  }

  /* 某族之在朝者（供界面与效验） */
  function members(st, c) {
    return (c.members || []).map(function (id) {
      var d = generalOf(id);
      var g = st.generals[id];
      return d ? { id: id, name: d.name, inGame: !!g, owner: g ? g.owner : null, status: g ? g.status : null, loyalty: g ? Math.round(g.loyalty || 0) : null } : null;
    }).filter(Boolean);
  }

  /* —— 每季之消长 —— */
  /* 名分正则士族归心，朋党盛则门第自固；向背既极，则自趋中平 */
  function tick(st) {
    if (!st.clans || st.phase === 'over') { return []; }
    var said = [];
    var c = st.court;
    var legit = c ? c.legit : 55;
    var strife = c ? c.strife : 10;
    var peers = relevant(st);
    var sum = 0;
    peers.forEach(function (cl) {
      var s = state(st, cl.id);
      var d = (legit >= 65 ? 0.5 : -0.2) + (strife >= 55 ? -0.4 : 0.25);
      if (s.support > 70) { d -= 0.35; }
      if (s.support < 30) { d += 0.35; }
      s.support = clamp(s.support + d, 0, 100);
      sum += s.support;
      /* 向背之效：其族在朝者之忠心随之 */
      (cl.members || []).forEach(function (id) {
        var g = st.generals[id];
        if (!g || g.owner !== st.player) { return; }
        if (s.support >= 70) { g.loyalty = clamp((g.loyalty || 80) + 1, 0, 100); }
        else if (s.support <= 25) { g.loyalty = clamp((g.loyalty || 80) - 1, 0, 100); }
      });
    });
    /* 门第皆高，则朋党之势亦盛（世族相轧，自成一局） */
    if (peers.length >= 3 && sum / peers.length >= 70 && st.court) {
      st.court.strife = clamp(st.court.strife + 0.5, 0, 100);
      said.push('门第相高，朋党之势稍盛');
    }
    return said;
  }

  /* 向背之效：岁入之乘数与名分、党争之增减（由 Engine 与 Politics 取用） */
  function bonuses(st) {
    var out = { gold: 1, food: 1, legit: 0, strife: 0, said: [] };
    if (!st.clans) { return out; }
    var peers = relevant(st);
    var n = 0, sum = 0;
    peers.forEach(function (cl) {
      var v = support(st, cl.id);
      sum += v; n += 1;
      if (v >= 70) { out.gold += 0.02; out.food += 0.02; }
      else if (v <= 25) { out.gold -= 0.02; }
    });
    if (n) {
      var avg = sum / n;
      if (avg >= 70) { out.legit += 0.4; out.said.push('世族倾心，名分稍正'); }
      if (avg <= 30) { out.strife += 0.8; out.said.push('世族离心，朋党益盛'); }
    }
    out.gold = clamp(out.gold, 0.8, 1.2);
    out.food = clamp(out.food, 0.8, 1.2);
    return out;
  }

  /* —— 往来四事 —— */
  var ACTS = {
    marry: { name: '联姻', gold: 300, prestige: 8, cd: 4, desc: '与其族结姻，门第相通，向背自厚。' },
    recommend: { name: '征辟其子弟', gold: 180, prestige: 0, cd: 3, desc: '由氏族引进，辟其族在野之贤者入幕（此为氏族之荐，不循「乡邦之限」）。' },
    appoint: { name: '任用其族', gold: 120, prestige: 0, cd: 3, desc: '以一郡或一曹授其族之人，向背转厚，然私家稍稍坐大。' },
    suppress: { name: '裁抑强宗', gold: 0, prestige: 5, cd: 4, desc: '以法裁其宾客、夺其部曲，寒门归心而世族怨望。' }
  };

  function actInfo(st, id, act) {
    var c = byId(id);
    var s = state(st, id);
    var a = ACTS[act];
    if (!c || !s) { return { ok: false, why: '无此氏族' }; }
    if (!a) { return { ok: false, why: '无此之举' }; }
    if (st.phase === 'over') { return { ok: false, why: '战事已终' }; }
    var cd = a.cd == null ? 3 : a.cd;
    var last = s.at[act];
    if (typeof last === 'number' && st.turn - last < cd) {
      return { ok: false, why: '此一举尚须再候 ' + (cd - (st.turn - last)) + ' 回合', act: a, cd: cd };
    }
    var f = st.factions[st.player];
    if (f.gold < (a.gold || 0)) { return { ok: false, why: '金帛不足（需 ' + a.gold + '）', act: a, cd: cd }; }
    if (f.prestige < (a.prestige || 0)) { return { ok: false, why: '威望不足（需 ' + a.prestige + '）', act: a, cd: cd }; }
    if (act === 'recommend') {
      var list = recruitable(st, c);
      if (!list.length) { return { ok: true, act: a, cd: cd, idle: true, why: '其族无人可辟，行此举则向背稍厚' }; }
      return { ok: true, act: a, cd: cd, subject: list[0] };
    }
    return { ok: true, act: a, cd: cd };
  }

  function act(st, id, act) {
    var info = actInfo(st, id, act);
    if (!info.ok) { return { ok: false, msg: info.why }; }
    var c = byId(id);
    var s = state(st, id);
    var a = info.act;
    var f = st.factions[st.player];
    f.gold -= (a.gold || 0);
    f.prestige = clamp(f.prestige - (a.prestige || 0), 0, 100);
    s.at[act] = st.turn;
    var msg = '', notes = [];

    function adjustKinship(dv) {
      (c.members || []).forEach(function (mid) {
        var g = st.generals[mid];
        if (!g || g.owner !== st.player) { return; }
        g.loyalty = clamp((g.loyalty || 80) + dv, 0, 100);
      });
    }

    if (act === 'marry') {
      s.support = clamp(s.support + 18, 0, 100);
      adjustKinship(8);
      msg = '与' + c.name + '联姻，向背增进。';
      notes.push('向背 +18', '其在朝者忠心 +8');
    } else if (act === 'recommend') {
      if (info.subject) {
        var g = st.generals[info.subject.id];
        g.owner = st.player; g.status = 'wild'; g.loyalty = 72;
        s.recruited += 1;
        s.support = clamp(s.support + 10, 0, 100);
        msg = '由' + c.name + '之荐，辟' + info.subject.name + '入幕。';
        notes.push('得' + info.subject.name, '向背 +10');
      } else {
        s.support = clamp(s.support + 8, 0, 100);
        msg = c.name + '荐士于朝，然其族无遗才可辟。';
        notes.push('向背 +8');
      }
    } else if (act === 'appoint') {
      s.support = clamp(s.support + 10, 0, 100);
      adjustKinship(6);
      if (st.court) { st.court.strife = clamp(st.court.strife + 2, 0, 100); }
      msg = '以' + c.name + '之人分任郡曹。';
      notes.push('向背 +10', '其在朝者忠心 +6', '党争 +2');
    } else if (act === 'suppress') {
      s.support = clamp(s.support - 18, 0, 100);
      adjustKinship(-6);
      if (st.court) { st.court.strife = clamp(st.court.strife - 8, 0, 100); }
      Object.keys(st.cities).forEach(function (k) {
        if (st.cities[k].owner !== st.player) { return; }
        st.cities[k].morale = clamp((st.cities[k].morale || 70) + 2, 0, 100);
        st.cities[k].unrest = clamp((st.cities[k].unrest || 0) - 4, 0, 100);
      });
      msg = '裁抑' + c.name + '，夺其宾客、核其田亩。';
      notes.push('向背 −18', '党争 −8', '民心 +2');
    }

    var E = root.Engine;
    if (E && E.log) { E.log(st, msg + (notes.length ? '（' + notes.join('，') + '）' : ''), act === 'suppress' ? 'info' : 'good'); }
    if (st.court && st.court.history) {
      st.court.history.push({ turn: st.turn, text: '【氏族·' + a.name + '】' + msg, kind: act === 'suppress' ? 'info' : 'good' });
      if (st.court.history.length > 60) { st.court.history.shift(); }
    }
    return { ok: true, msg: msg + (notes.length ? '（' + notes.join('，') + '）' : ''), data: { notes: notes, support: s.support } };
  }

  root.Clans = {
    ACTS: ACTS,
    all: all,
    byId: byId,
    init: init,
    state: state,
    support: support,
    label: label,
    touches: touches,
    relevant: relevant,
    serving: serving,
    recruitable: recruitable,
    members: members,
    tick: tick,
    bonuses: bonuses,
    actInfo: actInfo,
    act: act
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.Clans; }
})(typeof window !== 'undefined' ? window : globalThis);
