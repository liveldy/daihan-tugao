/* 《代汉涂高》 — 界面机杼 */
(function (root) {
  'use strict';

  var MAP = root.MAP, Rules = root.Rules, Eng = root.Engine, Story = root.Story;
  var UI = {};

  var state = null;
  var view = { selected: null, reachable: [], targets: [], cityTargets: [], inspect: null, zoom: 1, pan: { x: 0, y: 0 } };
  var tab = 'army';
  var pick = { group: null, entry: null, lord: null, scenario: null, stage: 0 };
  var busy = false;
  var mode = 'menu';   // 'menu' | 'play' | 'tutor'
  var tutorStep = 0;

  /* 舆图之缩放与推移：见「地图交互」一节 */
  var ZOOM_MIN = 1, ZOOM_MAX = 3;
  var HINT_IDLE = '点本方部曲即可调遣，点敌军可探其虚实。环色辨敌我：我绿、友灰、敌赤；' +
    '我方已行动者半淡，未行动者右上角一点金丸。取消之法：再点该部曲／点舆图空白处；' +
    '电脑亦可右键或按 Esc，手机可长按（或按「取消 ✕」）。滚轮或「＋」「−」可缩放舆图，拖动可推移。';
  /* 窄屏之底栏逼仄，故文从简，全文仍入于悬停（title） */
  var HINT_BRIEF = '点本方部曲即可调遣。取消：再点该军、点空白处、长按舆图，或按「取消 ✕」。';

  function narrow() {
    return !!(root.matchMedia && root.matchMedia('(max-width: 720px)').matches);
  }

  function idleHint() { return narrow() ? HINT_BRIEF : HINT_IDLE; }

  function num(v) {
    if (root.Population) { return root.Population.num(v); }
    return v == null ? '—' : String(Math.round(v * 10) / 10);
  }

  var $ = function (id) { return document.getElementById(id); };  var el = function (tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (txt != null) { n.textContent = txt; }
    return n;
  };
  function clear(n) { while (n.firstChild) { n.removeChild(n.firstChild); } }

  /* 教战之场（教学）模块，未载入时退化为空操作 */
  function T() { return root.Tutor || { note: function () { }, active: function () { return false; } }; }
  function tutorOn() { return T().active(); }

  /* ————— 提示 ————— */
  function toast(msg) {
    var box = $('toasts');
    var t = el('div', 'toast', msg);
    box.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 300); }, 2600);
    while (box.children.length > 4) { box.removeChild(box.firstChild); }
  }

  /* ————— 头像（有图则显示，无图则空占位） ————— */
  var lordGidCache = null;
  function lordGeneralId(lordKey) {
    var l = root.FACTIONS_DATA.LORDS[lordKey];
    if (!l) { return null; }
    if (!lordGidCache) {
      lordGidCache = {};
      var gen = Eng.allGenerals();
      Object.keys(gen).forEach(function (k) { if (!lordGidCache[gen[k].name]) { lordGidCache[gen[k].name] = k; } });
    }
    return lordGidCache[l.name] || null;
  }
  function avatarOf(kind, names, cls, fallback) {
    if (!root.Art) { return null; }
    var fb = (fallback && fallback.nodeType) ? fallback : document.createTextNode(fallback || '');
    return root.Art.avatar(kind, names, cls, fb);
  }
  /* 势力旗：有旗图用旗图，无旗图仍用原来的文字旗 */
  function flagOf(factionKey, textFlag) {
    if (!root.Art || !factionKey) { return textFlag; }
    return root.Art.avatar('banner', [factionKey], 'av-flag', textFlag);
  }

  /* ————— 择主 ————— */
  function buildTitle() {
    var D = root.FACTIONS_DATA;
    var gl = $('groupList');
    clear(gl);
    D.GROUPS.forEach(function (g) {
      var b = el('button');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(g.id === pick.group));
      b.appendChild(el('span', 'gname', g.name));
      b.appendChild(el('span', 'gm', g.seal + ' · ' + g.desc.slice(0, 12) + '…'));
      b.addEventListener('click', function () { pick.group = g.id; pick.entry = null; pick.lord = null; buildTitle(); });
      gl.appendChild(b);
    });
    if (!pick.group) { pick.group = D.GROUPS[0].id; }

    var entryList = $('entryList');
    clear(entryList);
    var g = D.GROUPS.filter(function (x) { return x.id === pick.group; })[0];
    var memo = el('p');
    memo.className = 'entry-blurb';
    memo.style.cssText = 'font-size:12.5px;color:var(--muted);margin:0 0 10px;';
    memo.textContent = g.motto + '　' + g.desc;
    entryList.appendChild(memo);

    D.ENTRIES.filter(function (e) { return e.group === pick.group; }).forEach(function (e) {
      var card = el('div', 'entry');
      card.setAttribute('aria-pressed', String(e.id === pick.entry));
      card.tabIndex = 0;
      card.appendChild(el('h3', null, e.name));
      card.appendChild(el('div', 'sub', e.sub));
      card.appendChild(el('div', 'blurb', e.blurb));
      card.appendChild(el('div', 'trick', e.trick));
      var tags = el('div', 'tags');
      e.tags.forEach(function (t) { tags.appendChild(el('span', 'chip', t)); });
      card.appendChild(tags);

      var lp = el('div', 'lord-pick');
      e.lords.forEach(function (lk) {
        var l = D.LORDS[lk];
        var b = el('button');
        b.type = 'button';
        b.setAttribute('aria-pressed', String(pick.lord === lk));
        var av = avatarOf('portrait', [lk, lordGeneralId(lk)], 'av-btn', '');
        if (av) { b.appendChild(av); }
        b.appendChild(document.createTextNode(l.name + '（' + l.year + '年·' + l.difficultyName + '）'));
        var mk = root.PROGRESS ? root.PROGRESS.lordMark(lk) : '';
        if (mk) { b.appendChild(el('span', 'lm' + (mk === '完全通关' ? ' full' : ''), mk)); }
        b.title = mk ? (l.name + '：' + mk + '（常规通关＝其非无定式之关皆克；完全通关＝连末关无定式亦克）') : '';
        b.addEventListener('click', function (ev) {
          ev.stopPropagation();
          pick.entry = e.id; pick.lord = lk;
          buildTitle();
        });
        lp.appendChild(b);
      });
      card.appendChild(lp);
      card.addEventListener('click', function () {
        pick.entry = e.id;
        if (!pick.lord || e.lords.indexOf(pick.lord) < 0) { pick.lord = e.lords[0]; }
        buildTitle();
      });
      entryList.appendChild(card);
    });

    var lord = pick.lord ? D.LORDS[pick.lord] : null;
    pick.scenario = (lord && root.Campaign) ? ((root.Campaign.defaultScenario(pick.lord) || {}).id || null) : null;
    pick.stage = 0;
    renderCampaign();
    syncStart();
    // 择定君主后，将剧本与关卡一栏带入视野
    if (pick.lord && pick.lord !== shownLord) {
      shownLord = pick.lord;
      var panel = $('campaignPanel');
      if (panel && !panel.hidden && panel.scrollIntoView) { panel.scrollIntoView({ block: 'nearest' }); }
    }
  }

  /* ————— 择局与择关：一君主多剧本，一剧本多关卡 ————— */
  var CN_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  var shownLord = null;

  function chosenScenario() {
    var C = root.Campaign;
    if (!C || !pick.lord) { return null; }
    return C.scenarioOf(pick.lord, pick.scenario) || C.defaultScenario(pick.lord);
  }

  function renderCampaign() {
    var panel = $('campaignPanel');
    if (!panel) { return; }
    clear(panel);
    var C = root.Campaign, P = root.PROGRESS;
    var list = (C && pick.lord) ? C.scenariosOf(pick.lord) : [];
    var pk = $('picker');
    if (pk) { pk.classList.toggle('has-campaign', list.length > 0); }
    if (!list.length) { panel.hidden = true; return; }
    panel.hidden = false;

    var total = list.reduce(function (a, s) { return a + s.stages.length; }, 0);
    var tally = P ? P.tally(pick.lord) : { done: 0, total: total };
    var ls = P ? P.lordStatus(pick.lord) : null;
    var head = el('div', 'camp-head');
    head.appendChild(el('span', 'camp-title', '疆场之记'));
    var sub = el('span', 'camp-sub',
      '此君凡 ' + list.length + ' 局 · ' + total + ' 关（其中有定志者 ' + (ls ? ls.nonOpen : total) +
      ' 关）；已克 ' + tally.done + ' 关。新关随前关之克而启。');
    sub.appendChild(el('b', 'lm-line',
      '　常规通关：有定志之关皆克，' + (ls ? ls.doneNonOpen + '／' + ls.nonOpen : '—') +
      '；完全通关：连末关无定式亦克，' + (ls ? ls.done + '／' + ls.total : '—') + '。'));
    if (ls && ls.normal) { sub.appendChild(el('span', 'lm' + (ls.complete ? ' full' : ''), P.lordMark(pick.lord))); }
    sub.title = '常规通关即启下一局、并计入「兵书志略」之门；完全通关另于君主之名加「完全通关」之识。';
    head.appendChild(sub);
    panel.appendChild(head);

    var tabs = el('div', 'scen-tabs');
    var cur = chosenScenario();
    list.forEach(function (sc, i) {
      var open = P ? P.scenarioOpen(pick.lord, sc.id) : true;
      var b = el('button', 'scen-tab');
      b.type = 'button';
      b.disabled = !open;
      b.setAttribute('aria-pressed', String(!!cur && sc.id === cur.id));
      b.appendChild(el('b', null, (i + 1) + '· ' + sc.name));
      var nOpenSt = P ? P.nonOpenCount(pick.lord, sc.id) : sc.stages.length;
      b.appendChild(el('span', null, sc.year + '年 · ' +
        (MAP.ERAS[sc.era] ? MAP.ERAS[sc.era].title : sc.era) + ' · ' + sc.stages.length + ' 关' +
        '（定志 ' + nOpenSt + '）' +
        (open ? '' : ' · 未启')));
      if (P && P.scenarioComplete(pick.lord, sc.id)) { b.appendChild(el('em', 'lm full', '完全通关')); }
      else if (P && P.scenarioNormalClear(pick.lord, sc.id)) { b.appendChild(el('em', 'lm', '常规通关')); }
      b.addEventListener('click', function () {
        if (!open) { return; }
        pick.scenario = sc.id; pick.stage = 0;
        renderCampaign(); syncStart();
      });
      tabs.appendChild(b);
    });
    panel.appendChild(tabs);

    if (!cur) { return; }
    var info = el('div', 'scen-info');
    info.appendChild(el('p', 'scen-blurb', cur.blurb || ''));
    panel.appendChild(info);

    var wrap = el('div', 'stage-list');
    cur.stages.forEach(function (st, idx) {
      wrap.appendChild(stageRow(C, pick.lord, cur, idx, idx === pick.stage ? idx : -1, function () {
        pick.stage = idx;
        renderCampaign(); syncStart();
      }));
    });
    panel.appendChild(wrap);
  }

  /* 一关一行：可战、已克、未启，皆以此为准（择局界面与关卡列表共用） */
  function stageRow(C, lordKey, sc, idx, curIdx, onPick) {
    var P = root.PROGRESS;
    var st = sc.stages[idx];
    var open = P ? (P.scenarioOpen(lordKey, sc.id) && P.stageOpen(lordKey, sc.id, idx)) : true;
    var doneN = P ? P.done(lordKey, sc.id) : 0;
    var row = el('button', 'stage-row' + (idx === curIdx ? ' sel' : '') +
      (idx < doneN ? ' done' : '') + (open ? '' : ' locked'));
    row.type = 'button';
    row.disabled = !open;
    row.appendChild(el('span', 'no', CN_NUM[idx] || String(idx + 1)));
    var body = el('span', 'body');
    body.appendChild(el('b', null, st.name));
    if (st.desc) { body.appendChild(el('span', 'desc', st.desc)); }
    body.appendChild(el('span', 'goal', '目标：' + C.goalText(st.goal)));
    if (st.goal && st.goal.open) {
      body.appendChild(el('span', 'goal open-note', '（无定式末关：不计入常规通关，唯克之方为完全通关）'));
    }
    row.appendChild(body);
    row.appendChild(el('span', 'st', !open ? '未启' : (idx < doneN ? '已克' : '可战')));
    if (st.goal && st.goal.open) { row.appendChild(el('span', 'st open-tag', '无定式')); }
    if (onPick) { row.addEventListener('click', function () { if (open) { onPick(); } }); }
    return row;
  }

  function syncStart() {
    var D = root.FACTIONS_DATA, C = root.Campaign, P = root.PROGRESS;
    var lord = pick.lord ? D.LORDS[pick.lord] : null;
    var sc = chosenScenario();
    var st = (sc && sc.stages[pick.stage]) || null;
    var locked = !!(C && P && sc && !P.stageOpen(pick.lord, sc.id, pick.stage));
    $('btnStart').disabled = !lord || locked;
    var eraName = sc && MAP.ERAS[sc.era] ? MAP.ERAS[sc.era].title : (lord ? lord.era : '');
    $('titleHint').textContent = lord
      ? (lord.name + ' · ' + (sc ? sc.name + '（' + sc.year + '年·' + eraName + '）' : lord.year + '年') +
        ' · ' + lord.difficultyName +
        (st && C ? '　第 ' + (pick.stage + 1) + ' 关·' + st.name + '　' + (locked ? '未启：前关未克' : '目标：' + C.goalText(st.goal)) : ''))
      : '择一君主，择一局，择一关，而后受命而起。';
  }

  /* ————— 开局 ————— */
  function startGame(lordKey, opts) {
    opts = opts || {};
    var lord = root.FACTIONS_DATA.LORDS[lordKey];
    var sid = opts.scenario || pick.scenario || null;
    var sidx = (opts.stage != null) ? opts.stage : (pick.stage || 0);
    state = Eng.newGame({ lord: lordKey, scenario: sid, stage: sidx, seed: 20260000 + (Date.now() % 9999) });
    if (root.PROGRESS && state.scenario) { root.PROGRESS.touch(lordKey, state.scenario.id); }
    mode = opts.tutorial ? 'tutor' : 'play';
    if (mode === 'tutor') { state.tutorial = true; }
    refreshAuras();
    $('titleScreen').classList.remove('on');
    $('topbar').hidden = false;
    $('main').hidden = false;
    var cv = $('map');
    // 正六边形网格（尖顶、奇数行右移半格）之外框：宽 (W+0.5)·√3·s，高 ((H-1)·1.5+2)·s
    var cols = MAP.W + 0.5;
    var rows = 1.5 * (MAP.H - 1) + 2;
    cv.width = 1200;
    cv.height = Math.round(1200 * rows / (Math.sqrt(3) * cols));
    $('picker').hidden = true;
    $('mainMenu').hidden = true;
    hint(idleHint());
    toast(lord.name + (state.stage ? '·' + state.stage.name : '') + '起');
    draw();
    if (mode === 'tutor') { T().begin(state); }
    else { nextStory(); }
  }

  /* ————— 绘制 ————— */
  function refreshAuras() {
    var gen = Eng.allGenerals();
    state.units.forEach(function (u) { u.auraAtk = 0; u.auraDef = 0; u.auraMove = 0; u.auraRange = 0; });
    state.units.forEach(function (u) {
      var g = gen[u.general];
      if (!g || !g.skills) { return; }
      var hasAura = g.skills.some(function (s) { return s.kind === 'aura'; });
      if (!hasAura) { return; }
      var m = Rules.skillMods({ skills: g.skills.filter(function (s) { return s.kind === 'aura'; }) }, 'aura');
      state.units.forEach(function (v) {
        if (v.faction !== u.faction || v === u) { return; }
        if (MAP.dist(v.x, v.y, u.x, u.y) > 1) { return; }
        v.auraAtk = (v.auraAtk || 0) + (m.atk || 0);
        v.auraDef = (v.auraDef || 0) + (m.def || 0);
        v.auraRange = (v.auraRange || 0) + (m.range || 0);
      });
    });
  }

  function draw() {
    var ctx = $('map').getContext('2d');
    root.Render.draw(ctx, state, {
      selected: view.selected, reachable: view.reachable,
      targets: view.targets, cityTargets: view.cityTargets,
      zoom: view.zoom, pan: view.pan
    });

    var f = state.factions[state.player];
    var inc = f.income || null;
    var res = $('resources');
    clear(res);
    /* 顶栏：本回合之出入（金、粮、户口皆有增损之数），悬停另见其详 */
    var rows = [
      { k: '金', v: Math.round(f.gold), d: inc ? inc.goldNet : null,
        t: inc ? ('本回合岁入 ' + inc.gold + '，净 ' + signed(inc.goldNet) +
          (inc.drag < 1 ? '；党争折损 ×' + inc.drag : '') +
          (inc.clans && inc.clans.gold ? '；世族 ' + signed(inc.clans.gold) + '%' : '')) : '本回合之出入待第一回合之毕' },
      { k: '粮', v: Math.round(f.food), d: inc ? inc.foodNet : null,
        t: inc ? ('本回合岁入 ' + inc.food + '，军粮 ' + inc.upkeep + '，净 ' + signed(inc.foodNet)) : '' },
      { k: '威望', v: Math.round(f.prestige), d: null, t: '威望：名分与诏令之本' },
      { k: '户口', v: num(Eng.popTotal(state, state.player)), d: inc ? inc.popDelta : null,
        t: inc ? ('我之户口共 ' + num(Eng.popTotal(state, state.player)) + ' 万口；本回合 ' + signed(inc.popDelta) +
          ' 万口（征兵则减，民安则滋息）') : '户口：征兵之本，休养生息可复之' },
      { k: '城池', v: Eng.countCities(state, state.player), d: null, t: '我之城池' },
      { k: '敌军', v: Story.hostileCities(state), d: null, t: '与我交兵之城' }
    ];
    rows.forEach(function (p) {
      var d = el('span', 'res');
      d.appendChild(el('i', null, p.k));
      d.appendChild(el('b', null, String(p.v)));
      if (p.d != null && p.d !== 0) {
        var em = el('em', 'delta ' + (p.d > 0 ? 'up' : 'down'), signed(p.d));
        d.appendChild(em);
      } else if (p.d === 0) {
        d.appendChild(el('em', 'delta flat', '±0'));
      }
      if (p.t) { d.title = p.t; }
      res.appendChild(d);
    });
    $('clock').textContent = state.year + '年 · ' + state.eraTitle + ' · 第' + state.turn + '回合 · ' + ['春', '夏', '秋', '冬'][state.seasonIdx];
    drawObjective();
    drawCourt();
    syncTools();
    renderTab();
  }

  function signed(v) {
    if (v == null) { return ''; }
    var n = Math.round(v * 10) / 10;
    return (n > 0 ? '+' : '') + n;
  }

  /* 朝局之栏：常驻顶栏，示党争、名分与储位 */
  function drawCourt() {
    var box = $('courtChip');
    if (!box) { return; }
    var c = root.Politics && state ? root.Politics.status(state) : null;
    if (!c) { box.hidden = true; return; }
    box.hidden = false;
    clear(box);
    box.appendChild(el('i', 'tag', '朝局'));
    box.appendChild(el('span', 'strife' + (c.strife >= 65 ? ' bad' : ''), '党争 ' + c.strife + '·' + c.label));
    box.appendChild(el('span', 'heir' + (c.heir ? '' : ' none'), '储 ' + (c.heir || (c.canSeal ? '未立' : '未议'))));
    box.title = '名分 ' + c.legit + '　已议 ' + c.councils + ' 事';
  }

  /* 目标之栏：常驻顶栏，示本关之志与进度 */
  function drawObjective() {
    var box = $('objective');
    if (!box) { return; }
    var gs = state ? Eng.goalStatus(state) : null;
    if (!gs) { box.textContent = ''; box.hidden = true; return; }
    box.hidden = false;
    clear(box);
    box.appendChild(el('i', 'no', (state.scenario ? '「' + state.scenario.name + '」' : '') + '第 ' + (gs.index + 1) + '/' + gs.count + '关'));
    box.appendChild(el('b', null, gs.name));
    box.appendChild(el('span', 'txt', gs.text));
    if (gs.progress) { box.appendChild(el('span', 'prog', gs.progress)); }
    if (gs.met) { box.appendChild(el('span', 'met', '✓ 此志已成，结束回合以定此关')); }
    box.classList.toggle('open-stage', gs.open);
  }

  /* ————— 侧栏 ————— */
  function renderTab() {
    var p = $('tabpanel');
    clear(p);
    if (!state) { return; }
    if (tab === 'army') { renderArmy(p); }
    else if (tab === 'city') { renderCity(p); }
    else if (tab === 'who') { renderWho(p); }
    else if (tab === 'book') { renderBook(p); }
    else { renderLog(p); }
  }

  function unitTitle(u) {
    var g = u.generalRef;
    return (g ? g.name : Rules.UNITS[u.type].name + '部') + '　' + Rules.UNITS[u.type].name;
  }

  function renderArmy(p) {
    var lord = state.lord;
    var mech = root.FACTIONS_DATA.MECHS[state.mech];
    var intro = el('div', 'card');
    var seal0 = el('span', 'banner', lord.name.charAt(0));
    seal0.style.background = (MAP.FACTIONS[state.player] || {}).color || '#8a6b2f';
    var lordAv = avatarOf('portrait', [state.lordKey, lordGeneralId(state.lordKey)], 'av-card', flagOf(state.player, seal0));
    if (lordAv) { intro.appendChild(lordAv); }
    intro.appendChild(el('div', 'name', lord.name + (lord.zi ? '　字' + lord.zi : '') + '　' + lord.title));
    intro.appendChild(el('div', 'sub', state.year + '年　' + (lord.tag || '') + '　' + lord.difficultyName));
    var bio = el('div', 'sub');
    bio.style.marginTop = '4px';
    bio.textContent = lord.intro;
    intro.appendChild(bio);
    var goal = el('div', 'trick');
    goal.style.cssText = 'border-left:2px solid var(--accent);padding-left:8px;margin-top:6px;font-size:12.5px;';
    goal.textContent = '志在：' + lord.goal;
    intro.appendChild(goal);
    if (mech) {
      var m = el('div', 'sub');
      m.style.marginTop = '4px';
      m.textContent = '国策「' + mech.name + '」：' + mech.desc;
      intro.appendChild(m);
    }
    p.appendChild(intro);

    var mine = state.units.filter(function (u) { return u.faction === state.player && u.hp > 0; });
    p.appendChild(h('本部部曲（' + mine.length + '）'));
    if (!mine.length) { p.appendChild(el('div', 'empty', '四方征讨，竟无一兵一卒。')); }
    mine.forEach(function (u) {
      var row = el('div', 'unit-row' + (view.selected === u ? ' sel' : ''));
      var fac = MAP.FACTIONS[u.faction];
      var ban = el('span', 'banner', (u.generalRef ? u.generalRef.name.charAt(0) : Rules.UNITS[u.type].abbr));
      ban.style.background = fac.color;
      var av = avatarOf('portrait', [u.generalRef && u.generalRef.id], 'av-row', flagOf(u.faction, ban));
      row.appendChild(av || ban);
      var box = el('div');
      box.style.flex = '1';
      box.appendChild(el('div', 'name', unitTitle(u)));
      var s = Rules.statsOf(u, u.generalRef);
      /* 兵数已明书于行内，不再另画一条血条（同龄信息不重出，免得满屏进度条） */
      box.appendChild(el('div', 'sub', '兵 ' + Math.round(u.hp) + '/' + u.maxHp + '　攻' + s.atk + ' 防' + s.def +
        ' 移' + s.move + ' 射' + s.range + (u.level ? '　' + u.level + '等' : '')));
      row.appendChild(box);
      row.addEventListener('click', function () { select(u); });
      p.appendChild(row);
    });

    if (view.selected && view.selected.faction === state.player) {
      var u = view.selected;
      p.appendChild(h('遣此军'));
      var g = u.generalRef;
      var card = el('div', 'card');
      if (g) {
        card.appendChild(el('div', 'name', g.name + '　' + (g.zi ? '字' + g.zi : '')));
        var st = g.stats || {};
        card.appendChild(el('div', 'sub', '统' + (st.lead || 0) + '　武' + (st.war || 0) + '　智' + (st.int || 0) + '　政' + (st.pol || 0) + '　魅' + (st.cha || 0)));
        (g.skills || []).forEach(function (sk, i) {
          var row = el('div', 'kv');
          row.appendChild(el('b', null, sk.name));
          row.appendChild(el('span', null, sk.desc || ''));
          card.appendChild(row);
          if (sk.kind === 'active') {
            var cd = (u.cd && u.cd[i]) || 0;
            var b = el('button', 'btn sm', cd > 0 ? ('冷却 ' + cd) : ('发动·' + sk.name));
            b.disabled = cd > 0 || u.acted;
            b.addEventListener('click', function () { useSkill(u, i); });
            card.appendChild(b);
          }
        });
      } else {
        card.appendChild(el('div', 'name', Rules.UNITS[u.type].name + '（无将统领）'));
        card.appendChild(el('div', 'sub', Rules.UNITS[u.type].note));
      }
      card.appendChild(el('div', 'sub', '士气 ' + Math.round(u.morale) + '　' + (u.acted ? '本回合已行动' : '可行动')));
      p.appendChild(card);

      // 委任
      var avail = Object.keys(state.generals).filter(function (k) {
        var gg = state.generals[k];
        return gg.owner === state.player && (gg.status === 'wild' || gg.status === 'city');
      });
      if (avail.length && !u.general) {
        p.appendChild(h('委任将佐'));
        avail.slice(0, 12).forEach(function (k) {
          var gg = state.generals[k];
          var d = Eng.allGenerals()[k];
          if (!d) { return; }
          var b = el('button', 'btn sm', '拜' + d.name + '为将');
          b.addEventListener('click', function () {
            var r = Eng.assignGeneral(state, k, u.id);
            toast(r.msg); refreshAuras(); draw();
          });
          p.appendChild(b);
        });
      }
      // 战事预判
      if (view.targets && view.targets.length) {
        p.appendChild(h('可击之敌'));
        view.targets.forEach(function (t) {
          var r = Rules.damage(state, u, t);
          var row = el('div', 'card tight');
          row.style.cursor = 'pointer';
          row.appendChild(el('div', 'name', (t.generalRef ? t.generalRef.name + '·' : '') + Rules.UNITS[t.type].name));
          var s = Rules.statsOf(t, t.generalRef);
          row.appendChild(el('div', 'sub', '敌兵 ' + Math.round(t.hp) + '/' + t.maxHp + '　敌攻' + s.atk + ' 敌防' + s.def));
          var note = '预计斩获 ' + r.dmg + (r.counter > 1 ? '（相克 ×' + r.counter.toFixed(2) + '）' : (r.counter < 1 ? '（被克 ×' + r.counter.toFixed(2) + '）' : ''));
          if (r.dmg >= t.hp) { note += '　可殄灭'; }
          if (s.range === 1 && r.dmg < t.hp) {
            var c = Rules.damage(state, t, u);
            note += '　受反击约 ' + Math.round(c.dmg * 0.7);
          }
          row.appendChild(el('div', 'sub', note));
          row.addEventListener('click', function () { onTile(t.x, t.y); });
          p.appendChild(row);
        });
      }
      if (view.cityTargets && view.cityTargets.length) {
        p.appendChild(h('可攻之城'));
        view.cityTargets.forEach(function (c) {
          var s = Rules.statsOf(u, u.generalRef);
          var power = s.atk * (Rules.UNITS[u.type].tags.indexOf('siege') >= 0 ? 5.0 : 2.2);
          var row = el('div', 'card tight');
          row.style.cursor = 'pointer';
          row.appendChild(el('div', 'name', c.name + '　' + MAP.FACTIONS[c.owner].long));
          row.appendChild(el('div', 'sub', '守备 ' + Math.round(c.garrison) + '/' + c.maxGarrison + '　预计破其守备约 ' + Math.round(power * 0.85)));
          row.addEventListener('click', function () { onTile(c.x, c.y); });
          p.appendChild(row);
        });
      }

      var wait = el('button', 'btn sm', '就地待命');
      wait.addEventListener('click', function () { u.acted = true; u.moveLeft = 0; deselect(); draw(); });
      p.appendChild(wait);
    }
  }

  function h(t) { var n = el('h3', null, t); return n; }

  function cityTypes(c) {
    var pool = ['inf', 'spear', 'archer'];
    if (c.level >= 3) { pool.push('cav', 'pike'); }
    if (c.level >= 4) { pool.push('crossbow', 'siege', 'guard'); }
    if (c.port) { pool.push('navy'); }
    if (c.zhou === '益州' || c.zhou === '交州') { pool.push('barbcav'); }
    return pool;
  }

  function renderCity(p) {
    var P = root.Population;
    var mine = Object.keys(state.cities).filter(function (k) { return state.cities[k].owner === state.player; });
    p.appendChild(h('我之郡县（' + mine.length + '）　户口共 ' + num(Eng.popTotal(state, state.player)) + '口'));
    p.appendChild(el('p', null, '守备尽则城可下；民心低则易生民变。增筑可提高守备与岁入。' +
      '户口为征兵之本：每征一部曲，即耗该城户口（一兵约当四十口之家），征之过甚则户口骤减、田野荒芜；' +
      '「休养生息」则户口自复，惟费金 ' + (P ? P.REST_GOLD : 200) + '、且有回合之限。'));
    mine.forEach(function (k) {
      var c = state.cities[k];
      var card = el('div', 'card tight');
      var row = el('div', 'row');
      row.appendChild(el('span', 'name', c.name + '（' + c.zhou + '·' + c.kind + '）'));
      row.appendChild(el('span', 'sub', c.level + '级'));
      card.appendChild(row);
      /* 守备之数已在下一行，不再另画进度条 */
      card.appendChild(el('div', 'sub', '守备 ' + Math.round(c.garrison) + '/' + c.maxGarrison + '　民心 ' + Math.round(c.morale) + '　骚动 ' + Math.round(c.unrest)));
      var pop = Eng.popOf(state, k);
      var base = P ? P.base(k) : null;
      var pct = base ? Math.round(pop / base * 100) : null;
      var popLine = el('div', 'sub pop-line', '户口 ' + num(pop) + '口' +
        (base ? '（基数 ' + num(base) + '，今 ' + pct + '%）' : '') +
        (pct != null && pct < 50 ? '　⚠ 户口凋敝' : ''));
      if (pct != null && pct < 50) { popLine.className += ' warn'; }
      card.appendChild(popLine);
      var types = cityTypes(c);
      var box = el('div');
      box.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;';
      types.forEach(function (t) {
        var cost = Eng.recruitCost(state, t, k);
        var levy = P ? P.levy(t) : 0;
        var can = P ? P.canRecruit(state, k, t) : { ok: true };
        var b = el('button', 'btn sm', Rules.UNITS[t].name + ' ' + cost);
        b.title = '耗金 ' + cost + '，户口 −' + num(levy) + '口' + (can.ok ? '' : '；' + can.why);
        b.disabled = !can.ok;
        b.addEventListener('click', function () {
          var r = Eng.recruit(state, k, t, null);
          toast(r.msg);
          if (r.ok) { T().recruit(); }
          draw();
        });
        box.appendChild(b);
      });
      card.appendChild(box);
      var up = el('button', 'btn sm', '增筑（' + (180 * c.level) + '）');
      up.addEventListener('click', function () {
        var r = Eng.upgradeCity(state, k);
        toast(r.msg);
        if (r.ok) { T().upgrade(); }
        draw();
      });
      card.appendChild(up);
      /* 休养生息：罢兵息民，劝课农桑（见 src/core/population.js） */
      var ri = Eng.restInfo(state, k);
      var gainTxt = P ? num(P.gain(state, k)) : '—';
      var rest = el('button', 'btn sm', '休养生息（金 ' + (P ? P.REST_GOLD : 200) + '，户口 +' + gainTxt + '）');
      rest.disabled = !ri.ok;
      rest.title = ri.ok ? ('户口 +' + gainTxt + ' 万口，民心 +5，骚动 −12') : ri.why;
      rest.addEventListener('click', function () {
        var r = Eng.restCity(state, k);
        toast(r.msg);
        if (r.ok) { renderTab(); }
        draw();
      });
      card.appendChild(rest);
      if (!ri.ok && ri.why) { card.appendChild(el('div', 'why', ri.why)); }
      p.appendChild(card);
    });
  }

  function renderWho(p) {
    var gen = Eng.allGenerals();
    var mine = Object.keys(state.generals).filter(function (k) { return state.generals[k].owner === state.player; });
    p.appendChild(h('我之臣佐（' + mine.length + '）'));
    if (!mine.length) { p.appendChild(el('div', 'empty', '文武无一人可用。')); }
    mine.sort(function (a, b) {
      var A = gen[a] || {}, B = gen[b] || {};
      return (B.impact || 0) - (A.impact || 0);
    }).forEach(function (k) {
      var g = gen[k], gs = state.generals[k];
      if (!g) { return; }
      var card = el('div', 'card tight');
      var row = el('div', 'row');
      var gban = el('span', 'banner', g.name.charAt(0));
      gban.style.background = ((MAP.FACTIONS[state.player] || {}).color) || '#8a6b2f';
      gban.style.marginRight = '6px';
      var gav = avatarOf('portrait', [k], 'av-row', flagOf(gs.owner || state.player, gban));
      row.appendChild(gav || gban);
      row.appendChild(el('span', 'name', g.name + (g.zi ? '　字' + g.zi : '')));
      row.appendChild(el('span', 'sub', gs.status === 'unit' ? '在军' : (gs.status === 'city' ? '在城' : '闲居')));
      card.appendChild(row);
      var st = g.stats || {};
      card.appendChild(el('div', 'sub', '统' + (st.lead || 0) + '　武' + (st.war || 0) + '　智' + (st.int || 0) + '　政' + (st.pol || 0) + '　魅' + (st.cha || 0)));
      if (g.bio) {
        var bio = el('div', 'sub');
        bio.style.marginTop = '4px';
        bio.textContent = g.bio;
        card.appendChild(bio);
      }
      /* 忠诚之数自明，不另画条（列表之中一律用数字） */
      card.appendChild(el('div', 'sub', '忠诚 ' + Math.round(gs.loyalty || 0)));
      var b = el('button', 'btn sm', '赏赐 150');
      b.addEventListener('click', function () { toast(Eng.rewardGeneral(state, k).msg); draw(); });
      card.appendChild(b);
      p.appendChild(card);
    });

    var wild = Eng.recruitable(state);
    var open = wild.filter(function (x) { return x.open; });
    var shut = wild.filter(function (x) { return !x.open; });
    p.appendChild(h('在野之士（' + wild.length + '　可辟 ' + open.length + '）'));
    p.appendChild(el('p', 'sub', '征辟之制：其人须无主，而非一方之主（天子与诸侯不可为臣）；' +
      '且其乡里在我疆、或与我同州（未立之国者，以其本据为乡里——晋人归洛阳、蜀人归成都）。' +
      '其国已亡者可为吾用，惟名重天下者耻为人下。' +
      '「氏族」之荐（见庙堂）可破此限。'));
    if (!wild.length) { p.appendChild(el('div', 'empty', '四方无遗贤。')); return; }

    function bruteCard(x) {
      var card = el('div', 'card tight');
      card.appendChild(el('div', 'name', x.name + (x.zi ? '　字' + x.zi : '')));
      card.appendChild(el('div', 'sub', (x.bio || '').slice(0, 46) + '…'));
      var line = el('div', 'sub', '影响 ' + x.impact +
        (x.home ? '　乡里 ' + x.home.name : '　乡里未考') +
        (x.stats ? '　统' + x.stats.lead + ' 武' + x.stats.war + ' 智' + x.stats.int : ''));
      card.appendChild(line);
      var b = el('button', 'btn sm', '征辟 ' + x.cost);
      b.disabled = !x.open;
      b.title = x.why || '';
      b.addEventListener('click', function () {
        var r = Eng.recruitGeneral(state, x.id);
        toast(r.msg);
        draw();
      });
      card.appendChild(b);
      if (!x.open) { card.appendChild(el('div', 'why', x.why)); }
      return card;
    }

    open.slice(0, 20).forEach(function (x) { p.appendChild(bruteCard(x)); });
    if (!open.length) { p.appendChild(el('div', 'empty', '眼前无可辟之人：在野者虽众，其乡里皆在他人之州郡。')); }
    if (shut.length) {
      var det = document.createElement('details');
      det.className = 'who-shut';
      det.appendChild(el('summary', null, '不可辟者（' + shut.length + '）——何以不可'));
      shut.slice(0, 30).forEach(function (x) { det.appendChild(bruteCard(x)); });
      p.appendChild(det);
    }
  }


  /* 典籍之系属：条目设有 rel 者，惟其与本局（君主／势力／剧本／城池／关卡）相关方列；
   * 不设 rel 者为通论（举孝廉、九品中正之类），任何一局皆可读。故事线所解锁者亦必列。
   * 主页面之「典籍」预览则尽列（见 showLorePreview）。 */
  function loreRelevant(x) {
    if (!x.rel) { return true; }
    var S = state, R = x.rel;
    if (S.lore && S.lore[x.id]) { return true; }
    if (R.lords && R.lords.indexOf(S.lordKey) >= 0) { return true; }
    if (R.factions && R.factions.indexOf(S.player) >= 0) { return true; }
    if (R.eras && R.eras.indexOf(S.era) >= 0) { return true; }
    if (R.stages && S.stage && R.stages.indexOf(S.stage.id) >= 0) { return true; }
    if (R.cities && R.cities.some(function (cid) { return S.cities[cid] && S.cities[cid].owner === S.player; })) { return true; }
    return false;
  }

  function renderBook(p) {
    var lore = root.LORE || [];
    var list = lore.filter(loreRelevant);
    p.appendChild(h('典籍·风物'));
    p.appendChild(el('p', null, '制度、历法、地理、人文、军事、思潮六类，本局所系凡 ' + list.length + ' 条' +
      '（全书凡 ' + lore.length + ' 条）；与本君主、本剧本、本关无涉者不列，欲观全书请于主页面开「典籍」。'));
    var cats = ['制度', '历法', '地理', '人文', '军事', '思潮'];
    cats.forEach(function (c) {
      var items = list.filter(function (x) { return x.cat === c; });
      if (!items.length) { return; }
      p.appendChild(Object.assign(el('h4', null, c + '（' + items.length + '）'), {}));
      items.forEach(function (x) {
        var d = el('div', 'lore-item');
        d.appendChild(el('h4', null, x.title));
        d.appendChild(el('p', null, x.text));
        if (x.era) { d.appendChild(el('div', 'src', '断代 ' + x.era + (state && state.lore && state.lore[x.id] ? '　（本局已录）' : ''))); }
        if (x.src) { d.appendChild(el('div', 'src', x.src)); }
        p.appendChild(d);
      });
    });
    if (!list.length) { p.appendChild(el('div', 'empty', '本局未录典籍。')); }
  }

  function renderLog(p) {
    p.appendChild(h('军书旁午'));
    state.log.slice().reverse().forEach(function (l) {
      var d = el('div', 'log-line ' + (l.kind || ''));
      d.appendChild(el('span', 't', 'T' + l.turn));
      d.appendChild(document.createTextNode(l.text));
      p.appendChild(d);
    });
  }

  /* ————— 地图交互 —————
   * 一、择军：点本方部曲即可调遣（已行动者只可审视）。
   * 二、取消：桌面临机之右键、Esc 皆可；触屏无右键，故另有四法——
   *     再点该部曲（切换开关）、点舆图之空白或不可至处、长按舆图（约半秒）、按「取消」钮。
   * 三、缩放：滚轮（或触屏之双指内捏，若浏览器可递交）＋「＋／−／复位」三钮；图既放大，拖动可推移。
   */
  function hint(t) {
    var h = $('hint');
    if (!h) { return; }
    h.textContent = t;
    h.title = (t === idleHint()) ? HINT_IDLE : t;   // 窄屏文简，悬停可得其全
  }

  function unitAt(x, y) {
    return state.units.filter(function (u) { return u.hp > 0 && u.x === x && u.y === y; })[0];
  }

  function select(u) {
    view.selected = u;
    view.reachable = Rules.reachable(state, u);
    view.targets = Rules.targetsFor(state, u);
    view.cityTargets = Object.keys(state.cities)
      .map(function (k) { return state.cities[k]; })
      .filter(function (c) { return c.owner !== state.player && Rules.inRange(state, u, c.x, c.y); });
    hint(unitTitle(u) + '：' + (view.reachable.length ? '可移动 ' + view.reachable.length + ' 格' : '无处可往') +
      (view.targets.length ? '，可击 ' + view.targets.length + ' 部' : '') +
      (view.cityTargets.length ? '，可攻 ' + view.cityTargets.length + ' 城' : '') +
      (u.acted ? '　（本回合已行动，只可审视）' : '') + '　再点此军或点空白处即取消。');
    syncTools();
    T().note('select', { unit: u });
    if (tab === 'army') { draw(); } else { tab = 'army'; syncTabs(); draw(); }
  }

  function deselect(quiet) {
    view.selected = null;
    view.reachable = []; view.targets = []; view.cityTargets = [];
    if (!quiet) { hint(idleHint()); }
    syncTools();
  }

  /* 取消一切选择与敌情之屏：右键、Esc、长按、空白处、取消钮皆归于此 */
  function cancelAll(msg) {
    var had = !!(view.selected || view.inspect);
    deselect(true);
    clearIntel();
    hint(msg || idleHint());
    syncTools();
    draw();
    return had;
  }

  /* —— 缩放与推移 —— */
  function applyZoom(z, fx, fy) {
    var canvas = $('map');
    if (!canvas || !root.Render) { return; }
    var old = view.zoom || 1;
    var nz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, Math.round(z * 100) / 100));
    if (nz === old) { return; }
    var cx = (fx == null) ? canvas.width / 2 : fx;
    var cy = (fy == null) ? canvas.height / 2 : fy;
    var pan = { x: cx - (cx - (view.pan.x || 0)) * (nz / old), y: cy - (cy - (view.pan.y || 0)) * (nz / old) };
    view.zoom = nz;
    view.pan = (nz === 1) ? { x: 0, y: 0 } : root.Render.clampPan(canvas, nz, pan);
    canvas.classList.toggle('zoomed', nz > 1);
    syncTools();
    draw();
  }

  function zoomBy(delta, e) {
    var canvas = $('map');
    var px = (e && root.Render.pixelAt) ? root.Render.pixelAt(e, canvas) : null;
    applyZoom((view.zoom || 1) + delta, px ? px.x : null, px ? px.y : null);
  }

  function zoomFit() { applyZoom(1); }

  /* 舆图之器：缩放三钮与「取消」 */
  function syncTools() {
    var z = view.zoom || 1;
    var zi = $('btnZoomIn'), zo = $('btnZoomOut'), zf = $('btnZoomFit'), bc = $('btnCancel'), lab = $('zoomLabel');
    if (zi) { zi.disabled = z >= ZOOM_MAX; }
    if (zo) { zo.disabled = z <= ZOOM_MIN; }
    if (zf) { zf.disabled = z === 1; }
    if (lab) { lab.textContent = Math.round(z * 100) + '%'; }
    if (bc) { bc.hidden = !(view.selected || view.inspect); }
  }

  /* ————— 敌情 ————— */
  function intelBox() { return $('intel'); }

  function clearIntel() {
    var b = intelBox();
    if (!b) { return; }
    b.hidden = true;
    clear(b);
    syncTools();
  }

  function statLine(g) {
    var s = g.stats || {};
    return '统 ' + (s.lead || 0) + '　武 ' + (s.war || 0) + '　智 ' + (s.int || 0) +
      '　政 ' + (s.pol || 0) + '　魅 ' + (s.cha || 0);
  }

  function showIntelUnit(u) {
    view.inspect = { kind: 'unit', id: u.id };
    T().inspect();
    var b = intelBox();
    if (!b) { return; }
    clear(b);
    b.hidden = false;
    syncTools();
    var fac = MAP.FACTIONS[u.faction] || MAP.FACTIONS.neutral;
    var g = u.generalRef;
    var s = Rules.statsOf(u, g);
    var head = el('div', 'intel-head');
    var eban = el('span', 'banner', (g ? g.name.charAt(0) : Rules.UNITS[u.type].abbr));
    eban.style.background = fac.color;
    eban.style.marginRight = '6px';
    var eav = avatarOf('portrait', [g && g.id], 'av-row', flagOf(u.faction, eban));
    head.appendChild(eav || eban);
    head.appendChild(el('span', 'intel-tag', u.faction === state.player ? '我军' : '敌情'));
    head.appendChild(el('b', null, (g ? g.name + (g.zi ? '　字' + g.zi : '') : Rules.UNITS[u.type].name + '（无将）')));
    head.appendChild(el('span', 'intel-fac', fac.long));
    b.appendChild(head);
    b.appendChild(el('div', 'intel-sub', (g ? '身份：' + rolesCn(g) : '无将统领') +
      '　所在：（' + u.x + '，' + u.y + '）' + (cityIdOf(u.x, u.y) ? '　' + state.cities[cityIdOf(u.x, u.y)].name : '')));
    var rows = el('div', 'intel-body');
    b.appendChild(rows);   // 先挂上，逐条填，免一处出错整块皆空
    if (g) {
      rows.appendChild(el('div', 'intel-kv', statLine(g)));
      (g.skills || []).forEach(function (sk) {
        var d = el('div', 'intel-skill');
        d.appendChild(el('b', null, sk.name));
        d.appendChild(el('span', null, '（' + (sk.kind === 'passive' ? '常' : sk.kind === 'aura' ? '光环' : '主动') + '）' + (sk.desc || '')));
        rows.appendChild(d);
      });
      if (g.bio) { rows.appendChild(el('div', 'intel-bio', g.bio)); }
      if (g.impact) { rows.appendChild(el('div', 'intel-sub', '史评分量：' + '★'.repeat(g.impact) + '（' + g.impact + '/5）')); }
    }
    rows.appendChild(el('div', 'intel-sub', Rules.UNITS[u.type].name + '：' + Rules.UNITS[u.type].note));
    rows.appendChild(el('div', 'intel-kv', '兵力 ' + Math.round(u.hp) + '/' + u.maxHp +
      '　攻 ' + s.atk + '　防 ' + s.def + '　移 ' + s.move + '　射 ' + s.range +
      '　士气 ' + Math.round(u.morale)));
    rows.appendChild(el('div', 'intel-kv', '地形：' + terrainLabel(u.x, u.y) + '　' + (u.acted ? '本回合已行动' : '尚可行动')));
    // 与我方选中部队的胜负预判
    if (view.selected && view.selected.faction === state.player) {
      var mine = view.selected;
      var inR = Rules.inRange(state, mine, u.x, u.y);
      var pre = el('div', 'intel-kv');
      if (inR) {
        var a = Rules.damage(state, mine, u), c = Rules.damage(state, u, mine);
        pre.textContent = '可及此敌：预计斩获 ' + a.dmg + (a.counter > 1 ? '（相克 ×' + a.counter.toFixed(2) + '）' : a.counter < 1 ? '（被克 ×' + a.counter.toFixed(2) + '）' : '') +
          '　预计受创 约' + Math.round(c.dmg * 0.7);
      } else {
        pre.textContent = '距我选中之军尚有 ' + MAP.dist(mine.x, mine.y, u.x, u.y) + ' 格（六边距离），不能及也。';
      }
      rows.appendChild(pre);
    }
    var foot = el('div', 'intel-foot');
    var close = el('button', 'btn sm', '收起');
    close.addEventListener('click', function () { clearIntel(); });
    foot.appendChild(close);
    b.appendChild(foot);
  }

  function terrainLabel(x, y) {
    var t = Rules.terrainOf(state, x, y);
    if (!t) { return '——'; }
    var cityName = '';
    if (t.city) {
      var cid = t.city.id || t.city;
      var cc = state.cities[cid];
      if (cc) { cityName = '　城：' + cc.name + '（' + (MAP.FACTIONS[cc.owner] || MAP.FACTIONS.neutral).long + '）'; }
    }
    return t.terrainName + '（行' + t.terrainCost + '　守 +' + Math.round(t.terrainDef * 100) + '%）' + cityName;
  }

  var ROLE_CN = { lord: '君主', strategist: '谋士', general: '武将', minister: '文臣', consort: '外戚' };
  function rolesCn(g) {
    if (!g || !g.roles || !g.roles.length) { return '在野'; }
    return g.roles.map(function (r) { return ROLE_CN[r] || r; }).join('／');
  }

  function showIntelCity(c) {
    view.inspect = { kind: 'city', id: c.id };
    var b = intelBox();
    if (!b) { return; }
    clear(b);
    b.hidden = false;
    syncTools();
    var fac = MAP.FACTIONS[c.owner] || MAP.FACTIONS.neutral;
    var head = el('div', 'intel-head');
    head.appendChild(el('span', 'intel-tag', c.owner === state.player ? '我城' : '敌城'));
    head.appendChild(el('b', null, c.name));
    head.appendChild(el('span', 'intel-fac', fac.long));
    b.appendChild(head);
    var rows = el('div', 'intel-body');
    rows.appendChild(el('div', 'intel-kv', c.zhou + '　' + c.kind + '　' + c.level + ' 级'));
    rows.appendChild(el('div', 'intel-kv', '守备 ' + Math.round(c.garrison) + '/' + c.maxGarrison +
      '　民心 ' + Math.round(c.morale) + '　骚动 ' + Math.round(c.unrest)));
    rows.appendChild(el('div', 'intel-sub', (c.note || '')));
    if (c.owner !== state.player && view.selected && view.selected.faction === state.player) {
      var mine = view.selected;
      if (Rules.inRange(state, mine, c.x, c.y)) {
        var s = Rules.statsOf(mine, mine.generalRef);
        var power = s.atk * (Rules.UNITS[mine.type].tags.indexOf('siege') >= 0 ? 5.0 : 2.2);
        rows.appendChild(el('div', 'intel-kv', '我选中之军可攻此城：预计破其守备约 ' + Math.round(power * 0.85) +
          '（' + (c.garrison > power * 0.85 ? '一击不足下城，须再攻' : '或可一鼓而下') + '）'));
      } else {
        rows.appendChild(el('div', 'intel-kv', '我选中之军不能及此城。'));
      }
    }
    b.appendChild(rows);
    var foot = el('div', 'intel-foot');
    var close = el('button', 'btn sm', '收起');
    close.addEventListener('click', function () { clearIntel(); });
    foot.appendChild(close);
    b.appendChild(foot);
  }

  function cityIdOf(x, y) {
    var c = Eng.cityAt(state, x, y);
    return c ? c.id : null;
  }

  function onTile(x, y) {
    if (busy || !state || state.phase === 'over') { return; }
    var u = unitAt(x, y);

    // 一、点本方部队 —— 无论已行动与否，一律选中（已行动者只可审视）；再点一次即取消
    if (u && u.faction === state.player) {
      if (view.selected && view.selected.id === u.id) { cancelAll('已取消选择。'); return; }
      clearIntel(); select(u); return;
    }

    // 二、已有选中部队时，可击之敌 / 可攻之城 / 可往之地
    if (view.selected) {
      if (u && Rules.inRange(state, view.selected, x, y)) {
        var r = Eng.attackUnit(state, view.selected.id, u.id);
        toast(r.msg);
        afterAction('battle', u);
        return;
      }
      var cc = Eng.cityAt(state, x, y);
      if (cc && cc.owner !== state.player && Rules.inRange(state, view.selected, x, y)) {
        var r2 = Eng.attackCity(state, view.selected.id, cc.id);
        toast(r2.msg);
        afterAction('siege', cc);
        return;
      }
      if (view.reachable.some(function (p) { return p.x === x && p.y === y; })) {
        var from = { x: view.selected.x, y: view.selected.y };
        var r3 = Eng.moveTo(state, view.selected.id, x, y);
        toast(r3.msg);
        if (r3.ok) { T().note('march', { from: from, to: { x: x, y: y } }); }
        afterAction('march');
        return;
      }
    }

    // 三、点敌军 —— 探其虚实
    if (u) { showIntelUnit(u); draw(); return; }

    // 四、点城池 —— 我城与敌城皆可看
    var c2 = Eng.cityAt(state, x, y);
    if (c2) {
      showIntelCity(c2);
      $('hint').textContent = c2.name + '　' + c2.zhou + '·' + c2.kind + '　属' + MAP.FACTIONS[c2.owner].long +
        '　守备 ' + Math.round(c2.garrison) + '　民心 ' + Math.round(c2.morale);
      draw();
      return;
    }

    // 五、空地（或不可至之处）—— 击之即取消一切选择，此为触屏最便之「取消」
    var t = Rules.terrainOf(state, x, y);
    var had = !!(view.selected || view.inspect);
    if (had) {
      cancelAll(t ? (terrainLabel(x, y) + '　（已取消选择）') : '已取消选择。');
      return;
    }
    if (t) { hint(terrainLabel(x, y) + '　' + idleHint()); }
    clearIntel();
    draw();
  }

  function afterAction(kind, obj) {
    refreshAuras();
    var u = view.selected ? Eng.unitById(state, view.selected.id) : null;
    if (kind === 'battle') { T().note('battle', { target: obj }); }
    if (kind === 'siege') { T().note('siege', { target: obj }); }
    if (!u || u.acted || u.hp <= 0) { deselect(); }
    else { select(u); }
    if (state.result) { showEnding(); return; }
    draw();
    nextStory();
  }

  function useSkill(u, idx) {
    var g = u.generalRef;
    if (!g || !g.skills || !g.skills[idx]) { return; }
    var s = g.skills[idx];
    if (u.cd && u.cd[idx] > 0) { return; }
    u.cd = u.cd || {};
    u.cd[idx] = s.cd || 3;
    u.buffAtk += s.mod.atk || 0;
    u.buffDef += s.mod.def || 0;
    u.buffMove += s.mod.move || 0;
    u.buffRange += s.mod.range || 0;
    u.buffTurns = Math.max(u.buffTurns || 0, s.dur || 2);
    toast(g.name + '发动「' + s.name + '」');
    Eng.log(state, g.name + '发动「' + s.name + '」。', 'good');
    draw();
  }

  /* ————— 回合 ————— */
  function endTurn() {
    if (busy || !state || state.phase === 'over') { return; }
    busy = true;
    deselect();
    var r = Eng.endTurn(state);
    state.units.forEach(function (u) {
      if (u.cd) { Object.keys(u.cd).forEach(function (k) { u.cd[k] = Math.max(0, u.cd[k] - 1); }); }
    });
    refreshAuras();
    busy = false;
    toast(r.msg);
    draw();
    T().turn();
    if (state.result) { showEnding(); return; }
    if (tutorOn() || !openPolitics()) { nextStory(); }
  }

  /* ————— 剧情 ————— */
  function nextStory() {
    if (!state || state.result) { return; }
    if (state.tutorial) { return; }   // 教战之场进行中，先不打断
    if ($('overlay').classList.contains('on')) { return; }
    var ch = Story.nextChapter(state);
    if (!ch) { return; }
    openChapter(ch);
  }

  function openChapter(ch) {
    var story = Story.storyFor(state.lordKey);
    var ov = $('overlay');
    clear(ov);
    var wrap = el('div', 'story-wrap');
    var head = el('div', 'story-head');
    head.appendChild(el('div', 'idx', (story ? story.title : '') + ' · 第 ' + (ch.no || '') + ' 章'));
    head.appendChild(el('h2', null, ch.title || ''));
    head.appendChild(el('div', 'meta', ch.year + '年　' + (ch.place || '')));
    wrap.appendChild(head);

    var body = el('div', 'story-body');
    (ch.scene || []).forEach(function (s) {
      if (s.t === 'narration') { body.appendChild(el('p', 'narration', s.text)); }
      else if (s.t === 'line') {
        var d = el('div', 'line');
        d.appendChild(el('span', 'who', s.who + '：'));
        d.appendChild(el('span', 'txt', s.text));
        body.appendChild(d);
      } else if (s.t === 'inner') {
        var i = el('div', 'inner');
        i.textContent = (s.who ? '（' + s.who + '心念：' : '（心念：') + (s.text || '') + '）';
        body.appendChild(i);
      } else if (s.t === 'history') {
        var hh = el('div', 'history');
        hh.appendChild(document.createTextNode(s.text || ''));
        if (s.src) { hh.appendChild(el('span', 'src', '　' + s.src)); }
        body.appendChild(hh);
      } else if (s.text) {
        body.appendChild(el('p', 'narration', s.text));
      }
    });
    wrap.appendChild(body);

    var foot = el('div', 'story-foot');
    var note = el('span', 'reward-note', '');
    foot.appendChild(note);
    foot.appendChild(el('span', 'spacer'));

    var picked = { index: 0, done: !(ch.choice && ch.choice.options && ch.choice.options.length) };

    function close() {
      var out = Story.showChapter(state, ch, picked.index);
      if (out && out.effects && out.effects.length) { note.textContent = out.effects.join('　'); }
      ov.classList.remove('on');
      clear(ov);
      refreshAuras();
      draw();
      setTimeout(function () {
        if (state.result) { showEnding(); return; }
        nextStory();
      }, 60);
    }

    var next = el('button', 'btn primary', picked.done ? '阅毕' : '请先抉择');
    next.disabled = !picked.done;
    next.addEventListener('click', close);
    foot.appendChild(next);

    if (!picked.done) {
      var chBox = el('div', 'choice');
      chBox.appendChild(el('div', 'prompt', ch.choice.prompt || ''));
      var opts = el('div', 'opts');
      ch.choice.options.forEach(function (o, i) {
        var b = el('button', 'btn sm', o.text);
        b.addEventListener('click', function () {
          picked.index = i;
          picked.done = true;
          clear(opts);
          if (o.reply) { chBox.appendChild(el('div', 'reply', o.reply)); }
          if (o.inner) {
            var ii = el('div', 'inner');
            ii.textContent = '（心念：' + o.inner + '）';
            chBox.appendChild(ii);
          }
          next.disabled = false;
          next.textContent = '阅毕';
          next.focus();
        });
        opts.appendChild(b);
      });
      chBox.appendChild(opts);
      wrap.appendChild(chBox);
    }

    wrap.appendChild(foot);
    ov.appendChild(wrap);
    ov.classList.add('on');
    var focusTarget = picked.done ? next : wrap.querySelector('.choice button');
    if (focusTarget) { focusTarget.focus(); }
  }

  /* ————— 结局：过关、失关、一统 ————— */
  /* 下一关：本局尚有后关则续之，否则移入次局首关；俱无则 null */
  function nextStage() {
    var C = root.Campaign;
    if (!state || !state.stage || !C || !state.scenario) { return null; }
    var list = C.scenariosOf(state.lordKey);
    var sc = C.scenarioOf(state.lordKey, state.scenario.id);
    if (!sc) { return null; }
    if (state.stage.index + 1 < sc.stages.length) {
      return { lord: state.lordKey, scenario: sc.id, index: state.stage.index + 1,
        name: sc.stages[state.stage.index + 1].name, scenarioName: sc.name };
    }
    var nx = list[C.scenarioIndex(state.lordKey, sc.id) + 1];
    if (nx) {
      return { lord: state.lordKey, scenario: nx.id, index: 0,
        name: nx.stages[0].name, scenarioName: nx.name };
    }
    return null;
  }

  function reshoot() {
    if (!state) { return; }
    var lordKey = state.lordKey;
    var sid = state.scenario ? state.scenario.id : null;
    var idx = state.stage ? state.stage.index : 0;
    startGame(lordKey, { scenario: sid, stage: idx });
  }

  function showEnding() {
    var ov = $('overlay');
    clear(ov);
    var win = !!(state.result && state.result.win);
    var P = root.PROGRESS, C = root.Campaign;
    var isStage = !!state.stage;
    if (win && isStage && P && state.scenario) {
      P.mark(state.lordKey, state.scenario.id, state.stage.index);
      refreshGates();
    }
    var e = Story.endingFor(state);
    var lordDead = !!(state.result && state.result.reason === 'lord');
    var wrap = el('div', 'ending-wrap ' + (win ? 'win' : 'lose'));
    wrap.appendChild(el('div', 'eyebrow',
      win ? (isStage ? '第 ' + (state.stage.index + 1) + ' 关已克' : '一统之业')
          : (lordDead ? '君主殒命' : '败亡之局')));
    wrap.appendChild(el('div', 'verdict',
      win ? (isStage ? state.stage.name : ((e && e.title) || '天下混一'))
          : ((e && e.title) || '社稷倾覆')));
    wrap.appendChild(el('div', 'etext',
      win ? (isStage ? (state.stage.desc || '') + '　目标：' + (C ? C.goalText(state.stage.goal) : '')
        : ((e && e.text) || '海内一统。'))
        : ((lordDead
            ? (state.lord ? state.lord.name : '君主') +
              (state.result.how === 'captured' ? '为敌所擒，' : '殁于阵中，') +
              '社稷倾覆：君在则国在，此局已终，虽城郭部曲犹存亦不复振。　'
            : '') + ((e && e.text) || '宗庙不守。'))));
    if (win && isStage && state.scenario) {
      var nx = nextStage();
      wrap.appendChild(el('div', 'etext next-note',
        nx ? '次关：' + nx.scenarioName + '·' + nx.name : '此君之关，至此而尽。'));
    }
    var tally = el('div', 'tally');
    [['享国', state.year + '年'], ['回合', state.turn + '回合'], ['拔城', state.stats.citiesTaken],
      ['野战', state.stats.battlesWon], ['斩获', state.stats.kills], ['失城', state.stats.citiesLost]]
      .forEach(function (p) { tally.appendChild(el('span', 'chip', p[0] + ' ' + p[1])); });
    wrap.appendChild(tally);

    var foot = el('div', 'story-foot');
    var nx2 = win && isStage ? nextStage() : null;
    if (nx2) {
      var bNext = el('button', 'btn primary', '下一关·' + nx2.name);
      bNext.addEventListener('click', function () {
        ov.classList.remove('on'); clear(ov);
        startGame(nx2.lord, { scenario: nx2.scenario, stage: nx2.index });
      });
      foot.appendChild(bNext);
    }
    var bAgain = el('button', 'btn' + (nx2 ? '' : ' primary'), isStage ? '重挑战此关' : '再举义兵');
    bAgain.addEventListener('click', function () {
      ov.classList.remove('on'); clear(ov);
      if (isStage) { reshoot(); } else { location.reload(); }
    });
    foot.appendChild(bAgain);
    if (isStage) {
      var bList = el('button', 'btn', '关卡列表');
      bList.addEventListener('click', showStages);
      foot.appendChild(bList);
    }
    var bBack = el('button', 'btn', '还于主页面');
    bBack.addEventListener('click', function () { location.reload(); });
    foot.appendChild(bBack);
    wrap.appendChild(foot);
    ov.appendChild(wrap);
    ov.classList.add('on');
    if (foot.firstChild) { foot.firstChild.focus(); }
  }

  /* ————— 关卡列表：逐关列示，可复挑战，新关随前关之克而启 ————— */
  function showStages() {
    if (!state) { return; }
    var C = root.Campaign, P = root.PROGRESS;
    if (!C) { return; }
    var ov = $('overlay');
    clear(ov);
    var wrap = el('div', 'story-wrap');
    var head = el('div', 'story-head');
    head.appendChild(el('div', 'idx', '疆场之记'));
    head.appendChild(el('h2', null, state.lord.name + ' · 关卡'));
    var tl = P ? P.tally(state.lordKey) : { done: 0, total: 0 };
    var lsd = P ? P.lordStatus(state.lordKey) : null;
    head.appendChild(el('div', 'meta', '已克 ' + tl.done + '／' + tl.total + ' 关　今在第 ' +
      (state.stage ? (state.stage.index + 1) + ' 关·' + state.stage.name : '— 关') +
      (lsd ? '　定志之关 ' + lsd.doneNonOpen + '／' + lsd.nonOpen + (lsd.normal ? '（' + P.lordMark(state.lordKey) + '）' : '') : '')));
    wrap.appendChild(head);

    var body = el('div', 'story-body');
    var here = state.scenario ? state.scenario.id : null;
    var hereIdx = state.stage ? state.stage.index : -1;
    C.scenariosOf(state.lordKey).forEach(function (sc, si) {
      var open = P ? P.scenarioOpen(state.lordKey, sc.id) : true;
      var card = el('div', 'card');
      card.appendChild(el('h3', null, (si + 1) + '· ' + sc.name + '　' + sc.year + '年　' +
        (MAP.ERAS[sc.era] ? MAP.ERAS[sc.era].title : sc.era)));
      card.appendChild(el('p', 'sub', sc.blurb || ''));
      if (!open) { card.appendChild(el('p', 'sub', '前局未竟，此局未启。')); }
      var list = el('div', 'stage-list');
      sc.stages.forEach(function (st, idx) {
        list.appendChild(stageRow(C, state.lordKey, sc, idx,
          (sc.id === here && idx === hereIdx) ? idx : -1, function () {
            ov.classList.remove('on'); clear(ov);
            startGame(state.lordKey, { scenario: sc.id, stage: idx });
          }));
      });
      card.appendChild(list);
      body.appendChild(card);
    });
    wrap.appendChild(body);

    var foot = el('div', 'story-foot');
    var b = el('button', 'btn', '退');
    b.addEventListener('click', function () { ov.classList.remove('on'); clear(ov); });
    foot.appendChild(b);
    wrap.appendChild(foot);
    ov.appendChild(wrap);
    ov.classList.add('on');
    b.focus();
  }

  /* ————— 庙堂：朝局（议政、立储）、邦交与诏书 ————— */
  /* 朝局一览：党争、名分、储位，及近日朝议之记 */
  function courtStatusCard() {
    var P = root.Politics;
    var card = el('div', 'card');
    if (!P || !state.court) {
      card.appendChild(el('h3', null, '朝局'));
      card.appendChild(el('p', 'sub', '本局未载朝局。'));
      return card;
    }
    var c = P.status(state);

    function bar(label, value, max, cls) {
      var row = el('div', 'court-bar');
      row.appendChild(el('span', 'lb', label));
      var b = el('div', 'bar');
      var i = el('i');
      i.style.width = Math.round(value / max * 100) + '%';
      if (cls) { i.className = cls; }
      b.appendChild(i);
      row.appendChild(b);
      row.appendChild(el('span', 'num', String(Math.round(value))));
      return row;
    }
    card.appendChild(el('h3', null, '朝局'));
    card.appendChild(bar('党争', c.strife, 100, c.strife >= 65 ? 'hot' : (c.strife >= 45 ? 'warm' : '')));
    card.appendChild(el('p', 'sub', '朋党之势：' + c.label +
      '。党争每十点，减岁入百分之四（至多四成）；逾六十五，则或大臣去国、或郡县离心。' +
      '议政与立储皆可动之。'));
    card.appendChild(bar('名分', c.legit, 100, ''));
    card.appendChild(el('p', 'sub', '名分者，正统之望。威望足以服众则名分自增，名分高则民心自安、臣心自固。'));
    card.appendChild(el('p', null, '储位：' + (c.heir ? ('已立 ' + c.heir) : (c.canSeal ? '未立（国有诸子，众心未定，党争每合自增）' : '本朝无储可议'))));
    if (state.court.history && state.court.history.length) {
      var ul = el('div', 'court-log');
      state.court.history.slice(-5).reverse().forEach(function (h) {
        ul.appendChild(el('div', 'li ' + (h.kind || 'info'), '第' + h.turn + '回合　' + h.text));
      });
      card.appendChild(ul);
    }
    return card;
  }

  /* 议政：朝会集议，取一策而行 */
  function courtTopicsCard() {
    var card = el('div', 'card');
    card.appendChild(el('h3', null, '议政'));
    var list = Eng.courtTopics ? Eng.courtTopics(state) : [];
    if (!list.length) { card.appendChild(el('p', 'sub', '海内未定，诸事未遑。')); return card; }
    var c = state.court;
    card.appendChild(el('p', 'sub', '每回合可集议一事。金帛、威望既足而事在可议者，其策列下。'));
    list.forEach(function (t) {
      var box = el('div', 'topic' + (t.open ? '' : ' off'));
      var hd = el('div', 'row');
      hd.appendChild(el('b', null, t.name));
      var cost = [];
      if (t.cost && t.cost.gold) { cost.push('金 ' + t.cost.gold); }
      if (t.cost && t.cost.prestige) { cost.push('威望 ' + t.cost.prestige); }
      if (cost.length) { hd.appendChild(el('span', 'sub', cost.join('　'))); }
      box.appendChild(hd);
      box.appendChild(el('p', 'sub', t.desc));
      var acts = el('div', 'opts-row');
      t.options.forEach(function (o, i) {
        var b = el('button', 'btn sm', o.text);
        b.disabled = !t.open;
        b.title = t.open ? '' : t.why;
        b.addEventListener('click', function () {
          var r = Eng.council(state, t.id, i);
          toast(r.msg);
          refreshAuras();
          draw();
          showCourt();
        });
        acts.appendChild(b);
      });
      box.appendChild(acts);
      if (!t.open && t.why) { box.appendChild(el('div', 'why', t.why)); }
      if (t.src) { box.appendChild(el('div', 'src', t.src)); }
      card.appendChild(box);
    });
    return card;
  }

  /* 立储：诸子之资与其名分 */
  function courtHeirCard() {
    var card = el('div', 'card');
    card.appendChild(el('h3', null, '立储'));
    var list = Eng.heirCandidates ? Eng.heirCandidates(state) : [];
    if (!list.length) {
      card.appendChild(el('p', 'sub', '本朝无储可议（此君之嗣未见史载）。'));
      return card;
    }
    var c = state.court;
    card.appendChild(el('p', 'sub', '储位未定则朋党自生；立嫡则朝局稍安，废长立幼则众心未服。' +
      (c && c.heir ? '（废立大事，须威望 20）' : '（立储须威望 10）')));
    list.forEach(function (h) {
      var box = el('div', 'heir' + (h.current ? ' cur' : ''));
      var row = el('div', 'row');
      row.appendChild(el('b', null, h.name));
      row.appendChild(el('span', 'sub', '第 ' + h.order + '　' + (h.claim || '') + (h.current ? '　今为储君' : '')));
      box.appendChild(row);
      if (h.stats) {
        box.appendChild(el('div', 'sub', '统 ' + h.stats.lead + '　武 ' + h.stats.war + '　智 ' + h.stats.int +
          '　政 ' + h.stats.pol + '　魅 ' + h.stats.cha + '　影响 ' + h.impact));
      }
      box.appendChild(el('p', 'sub', h.note));
      var b = el('button', 'btn sm', h.current ? '已为储君' : '立为储君');
      b.disabled = !!h.current || !h.alive;
      b.addEventListener('click', function () {
        var r = Eng.setHeir(state, h.id);
        toast(r.msg);
        draw();
        showCourt();
      });
      box.appendChild(b);
      card.appendChild(box);
    });
    return card;
  }

  /* 氏族：门第之向背与往来四事（见 src/core/clans.js 与 src/data/clans_1.js） */
  function courtClansCard() {
    var card = el('div', 'card');
    card.appendChild(el('h3', null, '氏族'));
    var CL = root.Clans;
    var list = Eng.clansOf ? Eng.clansOf(state) : [];
    if (!list.length) {
      card.appendChild(el('p', 'sub', '本局未与著姓相接（氏族之制见 src/data/clans_1.js；其族须附于本势力、' +
        '或在朝有人在吾幕府、或其在野之士居吾疆，方入此列）。'));
      return card;
    }
    card.appendChild(el('p', 'sub', '汉末之天下，门第与君权相为表里：一州之著姓向背，往往系一州之安危。' +
      '向背厚则岁入稍增、名分稍正、其在朝者忠心；向背薄则朋党益盛。往来四事：联姻、征辟其子弟、' +
      '任用其族、裁抑强宗，各有费与限。'));
    list.forEach(function (c) {
      var box = el('div', 'clan' + (c.support >= 70 ? ' warm' : (c.support <= 25 ? ' cold' : '')));
      var row = el('div', 'row');
      row.appendChild(el('b', null, c.name));
      row.appendChild(el('span', 'sub', c.junwang + '　' + c.trait));
      box.appendChild(row);
      box.appendChild(el('div', 'sub', '向背 ' + c.support + '·' + c.label +
        '　在朝：' + (c.serving.length ? c.serving.slice(0, 6).map(function (x) { return x.name; }).join('、') : '无其人')));
      box.appendChild(el('p', 'sub', c.desc));
      var acts = el('div', 'opts-row');
      ['marry', 'recommend', 'appoint', 'suppress'].forEach(function (k) {
        var info = Eng.clanActInfo(state, c.id, k);
        var a = (CL && CL.ACTS[k]) || {};
        var cost = a.gold ? '金 ' + a.gold : (a.prestige ? '威望 ' + a.prestige : '');
        var b = el('button', 'btn sm', (a.name || k) + (cost ? '（' + cost + '）' : ''));
        b.disabled = !info.ok;
        b.title = info.ok
          ? ((a.desc || '') + (k === 'recommend' ? (info.subject ? '　可得：' + info.subject.name : '　其族无人可辟') : ''))
          : (info.why || '');
        b.addEventListener('click', function () {
          var r = Eng.clanDo(state, c.id, k);
          toast(r.msg);
          draw();
          showCourt();
        });
        acts.appendChild(b);
      });
      box.appendChild(acts);
      if (c.recruitable && c.recruitable.length) {
        box.appendChild(el('div', 'sub', '其族在野可辟：' + c.recruitable.slice(0, 5).map(function (x) { return x.name; }).join('、')));
      }
      if (c.src) { box.appendChild(el('div', 'src', '史源：' + c.src)); }
      card.appendChild(box);
    });
    return card;
  }

  /* 政争事件：依年依势而发，呈于朝堂，须抉择 */
  function openPolitics() {
    var e = Eng.pendingPolitics(state);
    if (!e) { return false; }
    var ov = $('overlay');
    clear(ov);
    var wrap = el('div', 'story-wrap politics-wrap');
    var head = el('div', 'story-head');
    head.appendChild(el('div', 'idx', '朝局 · 政争'));
    head.appendChild(el('h2', null, e.name || '朝中生变'));
    head.appendChild(el('div', 'meta', state.year + '年　' + state.eraTitle +
      (e.year ? '　事在本年' : '')));
    wrap.appendChild(head);

    var body = el('div', 'story-body');
    (e.scene || []).forEach(function (s) {
      if (s.t === 'narration') { body.appendChild(el('p', 'narration', s.text)); }
      else if (s.t === 'line') {
        var d = el('div', 'line');
        d.appendChild(el('span', 'who', s.who + '：'));
        d.appendChild(el('span', 'txt', s.text));
        body.appendChild(d);
      } else if (s.t === 'inner') {
        body.appendChild(el('div', 'inner', (s.who ? '（' + s.who + '心念：' : '（心念：') + (s.text || '') + '）'));
      } else if (s.t === 'history') {
        var hh = el('div', 'history');
        hh.appendChild(document.createTextNode(s.text || ''));
        if (s.src) { hh.appendChild(el('span', 'src', '　' + s.src)); }
        body.appendChild(hh);
      } else if (s.text) { body.appendChild(el('p', 'narration', s.text)); }
    });
    if (e.src) { body.appendChild(el('div', 'src', '史源：' + e.src)); }
    wrap.appendChild(body);

    var foot = el('div', 'story-foot');
    var note = el('span', 'reward-note', '');
    foot.appendChild(note);
    foot.appendChild(el('span', 'spacer'));
    var picked = { index: 0, done: !(e.choice && e.choice.options && e.choice.options.length) };
    var next = el('button', 'btn primary', picked.done ? '已知' : '请先抉择');
    next.disabled = !picked.done;
    next.addEventListener('click', close);
    foot.appendChild(next);

    function close() {
      var out = Eng.resolvePolitics(state, picked.index);
      if (out && out.data && out.data.notes && out.data.notes.length) { note.textContent = out.data.notes.join('　'); }
      ov.classList.remove('on');
      clear(ov);
      refreshAuras();
      draw();
      setTimeout(function () {
        if (state.result) { showEnding(); return; }
        if (!openPolitics()) { nextStory(); }
      }, 60);
    }

    wrap.appendChild(foot);

    if (!picked.done) {
      var chBox = el('div', 'choice');
      chBox.appendChild(el('div', 'prompt', e.choice.prompt || ''));
      var opts = el('div', 'opts');
      e.choice.options.forEach(function (o, i) {
        var b = el('button', 'btn sm', o.text);
        b.addEventListener('click', function () {
          picked.index = i;
          picked.done = true;
          clear(opts);
          if (o.reply) { chBox.appendChild(el('div', 'reply', o.reply)); }
          if (o.inner) { chBox.appendChild(el('div', 'inner', '（心念：' + o.inner + '）')); }
          next.disabled = false;
          next.textContent = '阅毕';
          next.focus();
        });
        opts.appendChild(b);
      });
      chBox.appendChild(opts);
      wrap.appendChild(chBox);
    }
    ov.appendChild(wrap);
    ov.classList.add('on');
    var ft = picked.done ? next : wrap.querySelector('.choice button');
    if (ft) { ft.focus(); }
    return true;
  }

  /* ————— 庙堂：邦交与诏书 ————— */
  function showCourt() {
    if (!state) { return; }
    T().court();
    var ov = $('overlay');
    clear(ov);
    var me = state.factions[state.player];
    var wrap = el('div', 'story-wrap');
    var head = el('div', 'story-head');
    head.appendChild(el('div', 'idx', '庙堂'));
    head.appendChild(el('h2', null, '朝局与邦交'));
    var cs = root.Politics && state.court ? root.Politics.status(state) : null;
    head.appendChild(el('div', 'meta', '金 ' + Math.round(me.gold) + '　威望 ' + Math.round(me.prestige) +
      (cs ? ('　党争 ' + cs.strife + '　名分 ' + cs.legit + '　储 ' + (cs.heir || '未立')) : '') +
      '　礼赂 300　罢兵 400 起'));
    wrap.appendChild(head);

    var body = el('div', 'story-body');
    body.appendChild(courtStatusCard());
    body.appendChild(courtTopicsCard());
    body.appendChild(courtHeirCard());
    body.appendChild(courtClansCard());
    var list = Object.keys(state.factions).filter(function (k) {
      return k !== state.player && state.factions[k].alive;
    }).sort(function (a, b) {
      return Eng.countCities(state, b) - Eng.countCities(state, a);
    });
    list.forEach(function (k) {
      var g = state.factions[k];
      var rel = Eng.relationOf(state, state.player, k);
      var war = Eng.atWar(state, state.player, k);
      var card = el('div', 'card tight');
      var row = el('div', 'row');
      var nm = el('span', 'name');
      var ban = el('span', 'banner');
      ban.style.background = MAP.FACTIONS[k].color;
      ban.style.marginRight = '6px';
      ban.textContent = MAP.FACTIONS[k].name.charAt(0);
      nm.appendChild(ban);
      nm.appendChild(document.createTextNode(g.long));
      row.appendChild(nm);
      row.appendChild(el('span', 'sub', Eng.countCities(state, k) + '城'));
      card.appendChild(row);
      /* 邦交之数已在上一行，不另画条；言「交兵／盟好」以别其向 */
      card.appendChild(el('div', 'sub', (war ? '交兵' : '盟好') + '　邦交 ' + Math.round(rel)));

      var acts = el('div');
      acts.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;';
      function addBtn(label, action, disabled) {
        var b = el('button', 'btn sm', label);
        b.disabled = !!disabled;
        b.addEventListener('click', function () {
          var r = Eng.diplomacy(state, k, action);
          toast(r.msg);
          showCourt();
          draw();
        });
        acts.appendChild(b);
      }
      addBtn('礼赂 300', 'gift', me.gold < 300);
      if (war) { addBtn('遣使约和', 'peace', me.gold < 400); }
      else { addBtn('传檄宣战', 'war', false); }
      if (state.mech === 'zhaoshu') {
        addBtn('诏令共讨', 'edict', me.prestige < 20);
        addBtn('诏令罢兵', 'edictStop', me.prestige < 20);
      }
      card.appendChild(acts);
      body.appendChild(card);
    });

    if (state.mech === 'zhaoshu') {
      var ed = el('div', 'card');
      ed.appendChild(el('h3', null, '天子诏书'));
      ed.appendChild(el('p', null, '汉祚虽微，名分犹在。每六回合可下一诏，耗威望 20。'));
      var b = el('button', 'btn sm', '下诏征辟在野之士（威望 15）');
      b.disabled = me.prestige < 15;
      b.addEventListener('click', function () {
        var r = Eng.diplomacy(state, state.player, 'edictCall');
        toast(r.msg);
        showCourt();
        draw();
      });
      ed.appendChild(b);
      body.appendChild(ed);
    } else if (state.mech) {
      var mc = root.FACTIONS_DATA.MECHS[state.mech];
      if (mc) {
        var md = el('div', 'card');
        md.appendChild(el('h3', null, mc.name));
        md.appendChild(el('p', null, mc.desc));
        body.appendChild(md);
      }
    }

    wrap.appendChild(body);
    var foot = el('div', 'story-foot');
    var b2 = el('button', 'btn', '退朝');
    b2.addEventListener('click', function () { ov.classList.remove('on'); clear(ov); });
    foot.appendChild(b2);
    wrap.appendChild(foot);
    ov.appendChild(wrap);
    ov.classList.add('on');
    b2.focus();
  }

  /* ————— 账号与云存档（正式版）————— */
  function accountBadge() {
    var el2 = $('titleChannel');
    if (!el2 || !root.ACCOUNT) { return; }
    var A = root.ACCOUNT.state();
    el2.textContent = A.channel === 'release' ? '正式版' : '预览版';
    el2.title = A.channel === 'release'
      ? '正式版（自建服务端）：有账号、云存档、版本检查与在线更新。服务端版本 ' + (A.serverVersion || '—') +
        (A.user ? '　已登录：' + A.user + (A.admin ? '（掌管理之权）' : '') : '　未登录')
      : '预览版（GitHub 静态页）：无账号与云存档，玩法相同；正式版由自建服务端提供。';
  }

  function field(label, type, value, placeholder) {
    var wrap2 = el('label', 'acct-field');
    wrap2.appendChild(el('span', 'lb', label));
    var i = document.createElement('input');
    i.type = type || 'text';
    i.value = value || '';
    if (placeholder) { i.placeholder = placeholder; }
    i.autocomplete = type === 'password' ? 'current-password' : 'off';
    wrap2.appendChild(i);
    wrap2.input = i;
    return wrap2;
  }

  function showAccount() {
    var A = root.ACCOUNT;
    if (!A) { return; }
    var st = A.state();
    var ov = $('overlay');
    clear(ov);
    var wrap = el('div', 'story-wrap acct-wrap');
    var head = el('div', 'story-head');
    head.appendChild(el('div', 'idx', st.channel === 'release' ? '正式版 · 账号' : '预览版'));
    head.appendChild(el('h2', null, st.channel === 'release' ? '账号、云存档与更新' : '关于版本'));
    head.appendChild(el('div', 'meta', (st.channel === 'release' ? '正式版' : '预览版') +
      '　本作 v' + (root.APP_VERSION ? root.APP_VERSION.version : '—') +
      (st.serverVersion ? '　服务端 v' + st.serverVersion : '') +
      (st.user ? '　' + st.user + (st.admin ? '（掌管理之权）' : '') : '')));
    wrap.appendChild(head);

    var body = el('div', 'story-body');

    if (st.channel !== 'release') {
      var c0 = el('div', 'card');
      c0.appendChild(el('h3', null, '预览版与正式版之别'));
      c0.appendChild(el('p', null, '本页所开为**预览版**：纯静态之站，随仓库而更新，其玩法与正式版一致，' +
        '然无账号、无云存档，亦无在线更新。'));
      c0.appendChild(el('p', null, '正式版由自建服务端提供（`node server/server.js`，见仓库中之 server/README.md）：' +
        '有账号登录、云存档（跨机续战）、版本检查，并由管理员手动检查与施行更新；' +
        '更新之时先生维护公告、拒新登录，待在线诸客自然下场（或逾时）方原子替换，故在局者不至半途而废。'));
      c0.appendChild(el('p', 'sub', '自建服务端者，浏览器所开即为此正式版；本作自探其有无而自定其为预览或正式。'));
      body.appendChild(c0);
    } else if (!st.user) {
      var c1 = el('div', 'card');
      c1.appendChild(el('h3', null, '登录或注册'));
      c1.appendChild(el('p', 'sub', '首位注册者掌管理之权（检查与施行更新、发维护公告）。'));
      var u = field('名号', 'text', '', '2—16 字之中文、字母、数字或下划线');
      var p1 = field('口令', 'password', '', '不得少于六位');
      c1.appendChild(u); c1.appendChild(p1);
      var note = el('div', 'acct-note', '');
      c1.appendChild(note);
      var acts = el('div', 'opts-row');
      function doAuth(kind) {
        note.textContent = '候覆…';
        var fn = kind === 'reg' ? A.register : A.login;
        fn(u.input.value.trim(), p1.input.value).then(function (r) {
          if (r.body && r.body.ok) { toast(kind === 'reg' ? '已注册，君即掌管理之权者' : '已登录'); showAccount(); accountBadge(); return; }
          note.textContent = (r.body && r.body.msg) || ('未成（HTTP ' + r.code + '）');
        }).catch(function (e) { note.textContent = '未成：' + e.message; });
      }
      var bReg = el('button', 'btn sm', '注册');
      bReg.addEventListener('click', function () { doAuth('reg'); });
      var bLog = el('button', 'btn sm primary', '登录');
      bLog.addEventListener('click', function () { doAuth('log'); });
      acts.appendChild(bReg); acts.appendChild(bLog);
      c1.appendChild(acts);
      body.appendChild(c1);
    } else {
      var c2 = el('div', 'card');
      c2.appendChild(el('h3', null, '云存档'));
      c2.appendChild(el('p', 'sub', '云存档即本地之「疆场之记」（已克之关、逐关解锁与续战之记）。' +
        '上线传之，他机取之，则可续前战。'));
      var sv = st.cloud;
      c2.appendChild(el('p', null, sv ? ('云上之档：' + new Date(sv.savedAt).toLocaleString('zh-CN') +
        '（' + (sv.rev || '') + '，作 v' + (sv.version || '—') + '）') : '云上尚无归档。'));
      var acts2 = el('div', 'opts-row');
      var bUp = el('button', 'btn sm', '上传存档');
      bUp.addEventListener('click', function () {
        bUp.disabled = true; bUp.textContent = '上传中…';
        A.uploadSave().then(function (r) {
          toast((r.body && r.body.msg) || (r.body && r.body.ok ? '存档已上传' : '上传未成'));
          showAccount();
        }).catch(function (e) { toast('上传未成：' + e.message); bUp.disabled = false; bUp.textContent = '上传存档'; });
      });
      var bDown = el('button', 'btn sm', '下载存档');
      bDown.disabled = !sv;
      bDown.addEventListener('click', function () {
        if (!root.confirm('以云上之档覆盖本机之进展？此不可复。')) { return; }
        bDown.disabled = true; bDown.textContent = '下载中…';
        A.downloadSave().then(function (r) {
          if (r.body && r.body.ok) {
            toast('存档已取下（' + (r.body.after ? r.body.after.done + '／' + r.body.after.total + ' 关' : '') + '）');
            location.reload();
          } else { toast((r.body && r.body.msg) || '下载未成'); bDown.disabled = false; bDown.textContent = '下载存档'; }
        });
      });
      var bOut = el('button', 'btn sm', '退出登录');
      bOut.addEventListener('click', function () { A.logout().then(function () { toast('已退出'); showAccount(); accountBadge(); }); });
      acts2.appendChild(bUp); acts2.appendChild(bDown); acts2.appendChild(bOut);
      c2.appendChild(acts2);
      body.appendChild(c2);

      if (st.admin) { body.appendChild(adminCard()); }
      else {
        var c3 = el('div', 'card');
        c3.appendChild(el('h3', null, '关于更新'));
        c3.appendChild(el('p', 'sub', '更新之事由管理员行之：检查版本、发维护公告、待在线者下场而后替换。' +
          '本账号非管理员，故不列更新之器。'));
        body.appendChild(c3);
      }
    }

    wrap.appendChild(body);
    var foot = el('div', 'story-foot');
    var b = el('button', 'btn', '合上');
    b.addEventListener('click', function () { ov.classList.remove('on'); clear(ov); });
    foot.appendChild(b);
    wrap.appendChild(foot);
    ov.appendChild(wrap);
    ov.classList.add('on');
    b.focus();
  }

  /* 管理员的更新之器：检查、施行（含待客）、维护公告、回滚 */
  function adminCard() {
    var A = root.ACCOUNT;
    var card = el('div', 'card');
    card.appendChild(el('h3', null, '管理 · 在线更新'));
    var status = el('p', 'sub', '读取中…');
    card.appendChild(status);
    function refresh() {
      A.adminStatus().then(function (r) {
        if (!(r.body && r.body.ok)) { status.textContent = '未得管理之状（HTTP ' + r.code + '）：' + ((r.body && r.body.msg) || ''); return; }
        var b = r.body;
        status.textContent = '线上版本 ' + b.version + '　在线 ' + b.online + ' 客　账号 ' + b.accounts +
          '　待客之限 ' + Math.round(b.drain.idleMs / 1000) + ' 秒（逾 ' + Math.round(b.drain.timeoutMs / 1000) + ' 秒强制）' +
          '　' + (b.maintenance.on ? '维护之中' : '常态') +
          (b.lastUpdate && b.lastUpdate.to ? '　上次更新至 ' + b.lastUpdate.to : '');
      }).catch(function (e) { status.textContent = '未得管理之状：' + e.message; });
    }
    refresh();

    var src = field('新版之源（Git 仓库地址或分支；亦可填本机目录）', 'text', 'https://github.com/liveldy/daihan-tugao', '');
    card.appendChild(src);
    card.appendChild(el('p', 'sub', '填 Git 地址则自远端取新版；填本机目录则直取其文件。检查不动线上，施行方替换。'));

    var plan = el('div', 'acct-note', '');
    card.appendChild(plan);
    var acts = el('div', 'opts-row');
    function sourceOf() {
      var v = src.input.value.trim();
      if (!v) { return null; }
      return /^[a-zA-Z]:[\\/]|^\//.test(v) ? { dir: v } : { git: v, ref: 'main' };
    }
    var bChk = el('button', 'btn sm', '检查更新');
    bChk.addEventListener('click', function () {
      var s = sourceOf();
      if (!s) { plan.textContent = '须指明新版之源'; return; }
      plan.textContent = '检查中…';
      A.adminCheck(s).then(function (r) {
        var p = r.body && (r.body.plan || r.body);
        if (!p || !p.ok) { plan.textContent = '检查未成：' + ((p && (p.errors || []).join('；')) || ('HTTP ' + r.code)); return; }
        plan.textContent = '线上 v' + p.current + ' → 新版 v' + p.version + '　文件 ' + p.files +
          '　新增 ' + p.added.length + '　改动 ' + p.changed.length + '　删除 ' + p.removed.length +
          (p.same ? '（与线上无异）' : '');
      }).catch(function (e) { plan.textContent = '检查未成：' + e.message; });
    });
    var bUpd = el('button', 'btn sm primary', '施行更新');
    bUpd.addEventListener('click', function () {
      var s = sourceOf();
      if (!s) { plan.textContent = '须指明新版之源'; return; }
      if (!root.confirm('施行更新？将先发维护公告、拒新登录，待在线诸客自然下场（逾时限则强制），然后替换站目录。')) { return; }
      bUpd.disabled = true; plan.textContent = '更新中……维护公告既发，请勿关此页。';
      refresh();
      A.adminUpdate(s, null, true).then(function (r) {
        var b = r.body || {};
        plan.textContent = b.ok
          ? ('更新已毕：v' + b.from + ' → v' + b.to + '，文件 ' + b.files + '，待客 ' +
             Math.round((b.drained ? b.drained.waited : 0) / 1000) + ' 秒' + (b.drained && b.drained.forced ? '（强制）' : '') +
             (b.same ? '（无须更新）' : ''))
          : ('更新未成：' + (b.msg || ('HTTP ' + r.code)));
        toast(b.ok ? '已更新至 v' + b.to : '更新未成');
        bUpd.disabled = false;
        refresh();
        root.ACCOUNT.refresh();
      }).catch(function (e) { plan.textContent = '更新未成：' + e.message; bUpd.disabled = false; });
    });
    var bDown2 = el('button', 'btn sm', '回滚旧版');
    bDown2.addEventListener('click', function () {
      if (!root.confirm('以留档之旧版复原？')) { return; }
      A.adminRollback().then(function (r) {
        plan.textContent = (r.body && r.body.ok) ? ('已回滚至 v' + r.body.version) : ('回滚未成：' + ((r.body && r.body.msg) || r.code));
        refresh();
      });
    });
    var bMaint = el('button', 'btn sm', '发维护公告');
    bMaint.addEventListener('click', function () {
      A.adminMaintenance(true, '例行之维护，请暂候；在线者请先上传存档。').then(function (r) {
        toast(r.body && r.body.ok ? '公告已发' : '未成');
        refresh();
      });
    });
    var bMaintOff = el('button', 'btn sm', '撤维护公告');
    bMaintOff.addEventListener('click', function () {
      A.adminMaintenance(false, '').then(function (r) { toast(r.body && r.body.ok ? '公告已撤' : '未成'); refresh(); });
    });
    [bChk, bUpd, bDown2, bMaint, bMaintOff].forEach(function (b) { acts.appendChild(b); });
    card.appendChild(acts);
    return card;
  }

  /* 维护之屏：公告既下，则覆于其上，且许在局者先行存其档 */
  function showMaintenance(info) {
    var A = root.ACCOUNT;
    var ov = $('overlay');
    if (document.querySelector('.maint-wrap')) { return; }
    clear(ov);
    var wrap = el('div', 'ending-wrap maint-wrap');
    wrap.appendChild(el('div', 'eyebrow', '维护之中'));
    wrap.appendChild(el('div', 'verdict', '服务器正在更新'));
    wrap.appendChild(el('div', 'etext',
      (info && info.text ? info.text + '　' : '') +
      '更新之中，新的登录暂不受理；在局者请先传其存档，待此屏自去，即可续战。'));
    var foot = el('div', 'story-foot');
    if (A.user()) {
      var b = el('button', 'btn primary', '上传存档');
      b.addEventListener('click', function () {
        b.disabled = true; b.textContent = '上传中…';
        A.uploadSave().then(function (r) {
          b.textContent = (r.body && r.body.ok) ? '存档已上传' : '上传未成';
        });
      });
      foot.appendChild(b);
    }
    var b2 = el('button', 'btn', '查看账号与更新');
    b2.addEventListener('click', function () { showAccount(); });
    foot.appendChild(b2);
    wrap.appendChild(foot);
    ov.appendChild(wrap);
    ov.classList.add('on');
  }

  function hideMaintenance() {
    var ov = $('overlay');
    if (ov.querySelector('.maint-wrap')) { ov.classList.remove('on'); clear(ov); draw(); }
  }

  /* ————— 典籍预览 ————— */
  function showLorePreview() {
    var ov = $('overlay');
    clear(ov);
    var wrap = el('div', 'story-wrap');
    var head = el('div', 'story-head');
    head.appendChild(el('div', 'idx', '典籍'));
    head.appendChild(el('h2', null, '典章·风物'));
    head.appendChild(el('div', 'meta', '凡 ' + (root.LORE ? root.LORE.length : 0) + ' 条，依史为据'));
    wrap.appendChild(head);
    var body = el('div', 'story-body');
    (root.LORE || []).slice(0, 120).forEach(function (x) {
      var d = el('div', 'lore-item');
      d.appendChild(el('h4', null, '【' + x.cat + '】' + x.title));
      d.appendChild(el('p', null, x.text));
      if (x.src) { d.appendChild(el('div', 'src', x.src)); }
      body.appendChild(d);
    });
    if (!(root.LORE || []).length) { body.appendChild(el('div', 'empty', '典籍未及编次。')); }
    wrap.appendChild(body);
    var foot = el('div', 'story-foot');
    var b = el('button', 'btn', '合卷');
    b.addEventListener('click', function () { ov.classList.remove('on'); clear(ov); });
    foot.appendChild(b);
    wrap.appendChild(foot);
    ov.appendChild(wrap);
    ov.classList.add('on');
  }

  /* ————— 装配 ————— */
  function syncTabs() {
    Array.prototype.forEach.call($('tabs').children, function (b) {
      b.setAttribute('aria-selected', String(b.dataset.tab === tab));
    });
  }

  function wire() {
    var cv = $('map');
    var suppressClick = false, dragging = false, moved = false, down = null, longTimer = null;

    function endLong() { if (longTimer) { clearTimeout(longTimer); longTimer = null; } }

    cv.addEventListener('click', function (e) {
      if (suppressClick) { suppressClick = false; return; }
      var p = root.Render.hit(e, cv, view);
      if (p) { onTile(p.x, p.y); }
    });
    /* 桌面之右键＝取消；触屏无右键，故另备「再点」「点空白」「长按」「取消钮」四法 */
    cv.addEventListener('contextmenu', function (e) { e.preventDefault(); cancelAll('已取消选择。'); });
    cv.addEventListener('mousemove', function (e) {
      if (!state) { return; }
      var p = root.Render.hit(e, cv, view);
      cv.style.cursor = (p && unitAt(p.x, p.y)) ? 'pointer' : 'default';
    });

    /* 滚轮缩放：舆图之放大缩小，不改整页之缩放 */
    cv.addEventListener('wheel', function (e) {
      if (!state) { return; }
      e.preventDefault();
      zoomBy((view.zoom || 1) * (e.deltaY < 0 ? 0.25 : -0.25), e);
    }, { passive: false });

    /* 双击（触屏之双点亦可）：满图与二倍互转 */
    cv.addEventListener('dblclick', function (e) {
      if (!state) { return; }
      e.preventDefault();
      if ((view.zoom || 1) > 1) { zoomFit(); } else { zoomBy(1, e); }
    });

    /* 长按取消（半秒）与拖动推移（图既放大，则以拖动为推移） */
    cv.addEventListener('pointerdown', function (e) {
      if (!state || busy) { return; }
      var px = root.Render.pixelAt(e, cv);
      down = { x: e.clientX, y: e.clientY, pan: { x: view.pan.x || 0, y: view.pan.y || 0 }, k: px ? px.k : 1 };
      moved = false; dragging = false;
      endLong();
      longTimer = setTimeout(function () {
        longTimer = null;
        if (moved || dragging) { return; }
        suppressClick = true;
        if (cancelAll('已取消选择（长按）。')) { toast('已取消选择'); }
      }, 520);
    });
    cv.addEventListener('pointermove', function (e) {
      if (!down) { return; }
      var dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!moved && Math.abs(dx) + Math.abs(dy) > 5) { moved = true; endLong(); }
      if (!moved) { return; }
      if ((view.zoom || 1) <= 1) { return; }        // 满图不动；窄屏由原生滚动推移
      dragging = true;
      if (e.pointerType === 'touch' && e.cancelable) { e.preventDefault(); }
      var canvas = cv;
      view.pan = root.Render.clampPan(canvas, view.zoom || 1,
        { x: down.pan.x + dx * down.k, y: down.pan.y + dy * down.k });
      draw();
    });
    cv.addEventListener('pointerup', function () {
      endLong();
      if (dragging) { suppressClick = true; }
      down = null; dragging = false; moved = false;
    });
    cv.addEventListener('pointercancel', function () { endLong(); down = null; dragging = false; moved = false; });

    /* 舆图之器 */
    if ($('btnZoomIn')) { $('btnZoomIn').addEventListener('click', function () { zoomBy(0.5); }); }
    if ($('btnZoomOut')) { $('btnZoomOut').addEventListener('click', function () { zoomBy(-0.5); }); }
    if ($('btnZoomFit')) { $('btnZoomFit').addEventListener('click', function () { zoomFit(); }); }
    if ($('btnCancel')) { $('btnCancel').addEventListener('click', function () { cancelAll('已取消选择。'); }); }

    $('tabs').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-tab]');
      if (!b) { return; }
      tab = b.dataset.tab;
      syncTabs();
      renderTab();
      T().tab(tab);
    });

    $('btnEndTurn').addEventListener('click', endTurn);
    $('btnStart').addEventListener('click', function () {
      if (pick.lord) { startGame(pick.lord); }
    });
    if ($('btnLorePreview')) { $('btnLorePreview').addEventListener('click', showLorePreview); }
    if ($('btnAccount')) { $('btnAccount').addEventListener('click', showAccount); }
    $('btnCourt').addEventListener('click', showCourt);
    if ($('btnStages')) { $('btnStages').addEventListener('click', showStages); }

    /* —— 主页面三入口 —— */
    $('btnCampaign').addEventListener('click', function () {
      $('mainMenu').hidden = true;
      $('picker').hidden = false;
      $('btnPickBack').hidden = false;
      buildTitle();
    });
    $('btnPickBack').addEventListener('click', function () {
      $('picker').hidden = true;
      $('btnPickBack').hidden = true;
      $('mainMenu').hidden = false;
    });
    $('btnTutorial').addEventListener('click', function () {
      startGame('caocao', { tutorial: true });
    });
    $('btnWiki').addEventListener('click', function () {
      var g = gateState();
      if (!g.open) {
        toast('兵书志略须常规通关 ' + g.need + ' 名君主方启（今 ' + g.have + ' 位）。' +
          '常规通关＝该君所有「有定志」之关皆克，末关无定式者不在其数。');
        return;
      }
      window.location.href = 'wiki.html';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var ov = $('overlay');
        // 结局与过关之屏不因 ESC 而误触（免得误按「重挑战」）
        if (ov.classList.contains('on') && !ov.querySelector('.ending-wrap')) {
          var btn = ov.querySelector('.story-foot .btn.primary, .story-foot .btn');
          if (btn) { btn.click(); }
        } else if (!ov.classList.contains('on')) {
          if (view.zoom > 1 && !view.selected && !view.inspect) { zoomFit(); }
          else { cancelAll('已取消选择。'); }
        }
      }
      if (state && !$('overlay').classList.contains('on')) {
        if (e.key === '+' || e.key === '=') { zoomBy(0.5); }
        if (e.key === '-' || e.key === '_') { zoomBy(-0.5); }
        if (e.key === '0') { zoomFit(); }
      }
      if (e.key === 'Enter' && state && !$('overlay').classList.contains('on') && !e.isComposing) {
        endTurn();
      }
    });

    window.addEventListener('resize', function () {
      if (!state) { return; }
      var canvas = $('map');
      if (view.zoom > 1) { view.pan = root.Render.clampPan(canvas, view.zoom, view.pan); }
      draw();
    });
  }

  /* ————— 通关之识与二志之门 —————
   * 常规通关＝该君主所有「有定志」之关皆克（末关无定式者不在其数）；完全通关＝连末关亦克。
   * 下一局之启，与前局之常规通关为准；兵书志略须常规通关三名君主方启；
   * 匠作志略载实现之事，仅正式版之管理员可见（预览版一概隐藏）。 */
  function gateState() {
    var P = root.PROGRESS;
    if (!P) { return { open: true, have: 0, need: 0, full: 0 }; }
    var have = P.normalLords().length;
    return { open: have >= P.WIKI_GATE, have: have, need: P.WIKI_GATE, full: P.completeLords().length };
  }

  function refreshGates() {
    var P = root.PROGRESS;
    var g = gateState();
    var wg = $('wikiGate');
    if (wg) { wg.textContent = String(g.have); }
    var bw = $('btnWiki');
    if (bw) {
      bw.classList.toggle('locked', !g.open);
      bw.setAttribute('aria-disabled', String(!g.open));
      bw.title = g.open
        ? '兵书志略：兵制、相克、行军、城池、邦交、剧本、朝局、户口、氏族、剧情与胜负，另有「人物志」。'
        : '兵书志略须常规通关 ' + g.need + ' 名君主方启（今 ' + g.have + ' 位）。';
    }
    var tp = $('titleProgress');
    if (tp && P) {
      var tl = P.tally();
      tp.textContent = tl.total
        ? ('疆场之记：已克 ' + tl.done + '／' + tl.total + ' 关　常规通关 ' + g.have + ' 君' +
          (g.full ? '　完全通关 ' + g.full + ' 君' : ''))
        : '';
      tp.title = P.lordTally();
    }
  }

  UI.boot = function () {
    buildTitle();
    wire();
    var vt = $('titleVer');
    if (vt && root.APP_VERSION) {
      vt.textContent = 'v' + root.APP_VERSION.version;
      vt.title = '第 ' + root.APP_VERSION.version + ' 版　' + root.APP_VERSION.name + '（' + root.APP_VERSION.date + '）\n' +
        root.APP_VERSION.summary;
    }
    refreshGates();
    var bc = $('btnContinue');
    if (bc && root.PROGRESS) {
      var lastPlay = root.PROGRESS.last();
      if (lastPlay) {
        var lastLord = root.FACTIONS_DATA.LORDS[lastPlay.lord];
        bc.hidden = false;
        bc.textContent = '续战·' + (lastLord ? lastLord.name : lastPlay.lord) + '·' + lastPlay.stageName;
        bc.addEventListener('click', function () {
          $('mainMenu').hidden = true;
          $('picker').hidden = false;
          $('btnPickBack').hidden = false;
          var ent = root.FACTIONS_DATA.ENTRIES.filter(function (e) {
            return e.lords.indexOf(lastPlay.lord) >= 0;
          })[0];
          if (ent) { pick.group = ent.group; }
          pick.lord = lastPlay.lord;
          pick.scenario = lastPlay.scenario;
          pick.stage = lastPlay.index;
          buildTitle();
          var panel = $('campaignPanel');
          if (panel && panel.scrollIntoView) { panel.scrollIntoView({ block: 'nearest' }); }
          pick.scenario = lastPlay.scenario;
          pick.stage = lastPlay.index;
          renderCampaign(); syncStart();
        });
      }
    }
    if (root.Tutor) {
      root.Tutor.onEvent(function (ev) {
        if (ev.kind === 'closed' || ev.kind === 'finished') { nextStory(); }
      });
    }
    if (root.Art) { root.Art.onChange = function () { if (state) { draw(); } }; }

    /* 版本之辨：正式版（自建服务端）有账号、云存档与更新；预览版（静态页）则无 */
    if (root.ACCOUNT) {
      root.ACCOUNT.onChange(function (ev) {
        accountBadge();
        refreshGates();
        applyDevLink();
        if (ev === 'maintenance') { showMaintenance(root.ACCOUNT.state().maintenance); }
        else if (ev === 'maintained') {
          hideMaintenance();
          var info = root.ACCOUNT.state();
          toast('更新已毕，今为 v' + (info.serverVersion || '—'));
          location.reload();
        }
      });
      root.ACCOUNT.probe().then(function () {
        accountBadge();
        applyDevLink();
        if (root.ACCOUNT.isRelease()) {
          root.ACCOUNT.startPolling();
          if (root.ACCOUNT.state().maintenance) { showMaintenance(root.ACCOUNT.state().maintenance); }
        }
      });
    }
  };

  /* 匠作志略之入口：载实现之事，唯正式版之管理员得见 */
  function applyDevLink() {
    var a = $('devLink');
    if (!a || !root.ACCOUNT) { return; }
    var st = root.ACCOUNT.state() || {};
    var admin = !!(st.admin || (st.account && st.account.admin));
    a.hidden = !admin;
    if (admin) { a.title = '匠作志略：本工程之实现，仅管理员可见。'; }
  }
  UI.startGame = startGame;
  UI.chooseLord = function (key) { startGame(key); };
  UI.state = function () { return state; };
  UI.view = function () { return view; };
  UI.showCourt = function () { showCourt(); };
  UI.showPolitics = function () { return openPolitics(); };
  UI.showStages = function () { showStages(); };
  root.UI = UI;
})(typeof window !== 'undefined' ? window : globalThis);
