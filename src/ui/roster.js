/* 《代汉涂高》 — 人物志：兵书志略之附卷
 * 由武将数据自动编次：一家势力为一条，条内列其全部将佐——姓名（字号）、身份、五维，
 * 以及其全部技能（名、类型、说明、数值加成、标签）。
 * 传统 script，无 ESM；模块级不触 DOM；须能在 file:// 下直接运行。
 */
(function (root) {
  'use strict';

  var SECTION_ID = 'roster';
  var SECTION_NAME = '人物志';
  var CHUNK = 50;                 // 一家逾此数即析为上下数段，便于翻阅

  var PARTS = ['GENERALS', 'GENERALS_PART1', 'GENERALS_PART2', 'GENERALS_PART3',
    'GENERALS_PART4', 'GENERALS_PART5', 'GENERALS_PART6'];

  /* —— 名物之译：数据里用西文之键，此处一律化作中文 —— */
  var ROLE_NAME = { lord: '君主', strategist: '谋士', general: '武将', minister: '文臣', consort: '外戚' };
  var KIND_NAME = { passive: '常', aura: '光环', active: '主动' };
  var STATS = [['lead', '统率'], ['war', '武力'], ['int', '智力'], ['pol', '政治'], ['cha', '魅力']];
  var MOD_ORDER = ['atk', 'def', 'move', 'range', 'hp', 'gold', 'food', 'recruit', 'morale',
    'siege', 'citydef', 'heal', 'xp', 'vision', 'landmove', 'watermove'];
  var MOD_NAME = {
    atk: '攻', def: '防', move: '移', range: '射', hp: '兵',
    gold: '金', food: '粮', recruit: '征募', morale: '士气', siege: '攻城',
    citydef: '守城', heal: '疗伤', xp: '历练', vision: '视野',
    landmove: '陆行', watermove: '水行'
  };
  var TAG_NAME = {
    insight: '洞察', rally: '激励', scholar: '文教', fortify: '守御',
    guard: '护卫', cavalry: '骑战', archer: '弓矢', pike: '枪戟',
    siege: '攻城', ambush: '奇谋', pursue: '追击', logistics: '辎重',
    raiding: '抄掠', dread: '威压', barbarian: '蛮夷', naval: '水军',
    water: '水战', fire: '火攻', cavalryarcher: '骑射', crossbow: '连弩',
    iron: '甲胄', ritual: '礼制'
  };
  var SEG_CN = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

  /* —— 取数：合并诸卷武将（缺卷即跳过） —— */
  function registry() {
    var reg = {};
    PARTS.forEach(function (p) {
      var part = root[p];
      if (!part) { return; }
      Object.keys(part).forEach(function (id) { reg[id] = part[id]; });
    });
    return reg;
  }

  /* —— 势力：其名与其次序皆取游戏内之数据 —— */
  function factionTable() {
    return (root.MAP && root.MAP.FACTIONS) || root.FACTIONS || null;
  }

  function factionName(key) {
    var F = factionTable();
    var f = F && F[key];
    return (f && (f.long || f.name)) || '未名之家';
  }

  /* 次序：先按择主界面之分组与条目（读 FACTIONS_DATA），再把无君主之家依次列于其后 */
  function factionOrder(reg) {
    var order = [], seen = {};
    function push(k) {
      if (k && !seen[k]) { seen[k] = 1; order.push(k); }
    }
    var FD = root.FACTIONS_DATA;
    if (FD && FD.GROUPS && FD.ENTRIES && FD.LORDS) {
      FD.GROUPS.forEach(function (grp) {
        FD.ENTRIES.forEach(function (e) {
          if (!e || e.group !== grp.id) { return; }
          (e.lords || []).forEach(function (k) {
            var l = FD.LORDS[k];
            if (l && l.faction) { push(l.faction); }
          });
        });
      });
    }
    var F = factionTable();
    if (F) { Object.keys(F).forEach(push); }
    Object.keys(reg || {}).forEach(function (id) { push((reg[id] || {}).faction); });
    return order;
  }

  /* —— 文字 —— */
  function signed(v) {
    var a = Math.abs(v);
    var txt;
    if (a < 1) {
      var p = Math.round(a * 1000) / 10;
      txt = (p === Math.round(p) ? String(Math.round(p)) : String(p)) + '%';
    } else {
      txt = String(Math.round(a));
    }
    return (v < 0 ? '－' : '＋') + txt;
  }

  function modText(mod) {
    var parts = [];
    MOD_ORDER.forEach(function (k) {
      if (mod && mod[k] != null && MOD_NAME[k]) { parts.push(MOD_NAME[k] + signed(mod[k])); }
    });
    return parts.join('、');
  }

  function tagText(tags) {
    var parts = [];
    (tags || []).forEach(function (t) { if (TAG_NAME[t]) { parts.push(TAG_NAME[t]); } });
    return parts.join('、');
  }

  function sentence(txt) {
    var s = String(txt == null ? '' : txt);
    if (s && '。！？；'.indexOf(s.charAt(s.length - 1)) < 0) { s += '。'; }
    return s;
  }

  function skillText(s) {
    var t = '「' + s.name + '」（' + (KIND_NAME[s.kind] || '常') + '）：' + sentence(s.desc);
    var m = modText(s.mod), g = tagText(s.tags);
    if (m) { t += '加成 ' + m + '。'; }
    if (g) { t += '标签 ' + g + '。'; }
    return t;
  }

  function nameText(g) {
    return g.zi ? (g.name + '（字' + g.zi + '）') : g.name;
  }

  function roleText(roles) {
    var parts = [];
    (roles || []).forEach(function (r) { if (ROLE_NAME[r]) { parts.push(ROLE_NAME[r]); } });
    return parts.length ? parts.join('·') : '不详';
  }

  function statText(stats) {
    var parts = [];
    STATS.forEach(function (kv) {
      var v = (stats || {})[kv[0]];
      parts.push(kv[1] + ' ' + (v == null ? '不详' : v));
    });
    return parts.join('、');
  }

  function generalRow(g) {
    var skills = (g.skills || []).map(skillText);
    return [nameText(g), roleText(g.roles), statText(g.stats), skills.length ? skills.join('　') : '无'];
  }

  function byImpact(a, b) {
    var d = (b.impact || 0) - (a.impact || 0);
    if (d) { return d; }
    return String(a.name).localeCompare(String(b.name), 'zh-Hans-CN');
  }

  function chunk(list, size) {
    var out = [];
    for (var i = 0; i < list.length; i += size) { out.push(list.slice(i, i + size)); }
    return out;
  }

  function segLabel(idx, segs) {
    if (segs <= 1) { return ''; }
    if (segs === 2) { return idx === 0 ? '上' : '下'; }
    return SEG_CN[idx] || String(idx + 1);
  }

  function countSkills(list) {
    var n = 0;
    list.forEach(function (g) { n += (g.skills || []).length; });
    return n;
  }

  /* —— 条目 —— */
  function overviewEntry(total, facs, skills) {
    return {
      id: 'roster-overview',
      title: '人物志总说',
      body: [
        '此卷凡将佐 ' + total + ' 人，分属 ' + facs + ' 家，共录技能 ' + skills + ' 条。其数非手书，皆由武将数据编次而来：举凡武将文臣，各归其势力，一家为一条；一家逾五十人者，析为数段，以便翻阅。',
        '人家之内，先书其家人数与技能之数，次列诸人之姓名、字号、身份、五维（统率、武力、智力、政治、魅力）与全部技能；次序按影响自高而低，同者以姓名相次。身份取君主、谋士、武将、文臣、外戚五名，一人而兼数职者并书。',
        '技能之类型有三：常（不待发令而常在）、光环（惠及左右）、主动（须发令而后行）。其加成凡十六目——攻、防、移、射、兵、金、粮、征募、士气、攻城、守城、疗伤、历练、视野、陆行、水行，增益书「＋」，减损书「－」；其标签则如洞察、激励、文教、守御、护卫、骑战、弓矢、枪戟、攻城、奇谋、追击、辎重、抄掠、威压、蛮夷、水军、水战、火攻、骑射、连弩、甲胄、礼制，皆本作技能之类别，用兵之时各有效验。'
      ]
    };
  }

  function factionEntry(key, part, facTotal, facSkills, idx, segs) {
    var label = segLabel(idx, segs);
    var lines = ['此家将佐 ' + facTotal + ' 人，共录技能 ' + facSkills + ' 条。'];
    if (segs > 1) {
      var which = label === '上' ? '上一段' : label === '下' ? '下一段' : '第' + label + '段';
      lines.push('凡 ' + facTotal + ' 人分为 ' + segs + ' 段，此为' + which + '：本段 ' + part.length + ' 人、技能 ' + countSkills(part) + ' 条。');
    }
    return {
      id: 'roster-' + key + (segs > 1 ? '-' + (idx + 1) : ''),
      title: factionName(key) + (label ? '（' + label + '）' : ''),
      body: lines,
      table: {
        head: ['姓名（字号）', '身份', '五维', '技能'],
        rows: part.map(generalRow)
      }
    };
  }

  function colophonEntry() {
    return {
      id: 'roster-colophon',
      title: '本卷之生成',
      body: ['以上诸家将佐之人名、字号、身份、五维与其技能之类型、说明、加成、标签，皆自武将数据编次而成，无一字手书。'],
      note: '本表随武将数据自动生成：增删武将、改易其身份、技能或加成之后，重新打开本页即见其新数，无须更动此卷。'
    };
  }

  /* —— 节：纯函数，入参为 registry() 之值 —— */
  function section(reg) {
    var data = reg || registry();
    var order = factionOrder(data);
    var buckets = {}, seq = [];

    order.forEach(function (f) {
      if (!buckets[f]) { buckets[f] = []; seq.push(f); }
    });
    Object.keys(data).forEach(function (id) {
      var g = data[id] || {};
      var f = g.faction || 'neutral';
      if (!buckets[f]) { buckets[f] = []; seq.push(f); }
      buckets[f].push(g);
    });

    var total = 0, skills = 0;
    Object.keys(data).forEach(function (id) {
      total++;
      skills += ((data[id] || {}).skills || []).length;
    });

    var facs = seq.filter(function (f) { return buckets[f].length > 0; });
    var entries = [overviewEntry(total, facs.length, skills)];

    facs.forEach(function (f) {
      var list = buckets[f].slice().sort(byImpact);
      var parts = chunk(list, CHUNK);
      parts.forEach(function (part, i) {
        entries.push(factionEntry(f, part, list.length, countSkills(list), i, parts.length));
      });
    });

    entries.push(colophonEntry());
    return { id: SECTION_ID, name: SECTION_NAME, entries: entries };
  }

  /* —— 挂载：推入兵书志略之末；重复调用不重复推入 —— */
  function attach() {
    var W = root.WIKI;
    if (!W || !W.sections) { return null; }
    for (var i = 0; i < W.sections.length; i++) {
      if (W.sections[i] && W.sections[i].id === SECTION_ID) { return W.sections[i]; }
    }
    var sec = section(registry());
    W.sections.push(sec);
    return sec;
  }

  root.Roster = { registry: registry, section: section, attach: attach };
})(typeof window !== 'undefined' ? window : globalThis);
