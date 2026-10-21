/* 《代汉涂高》 — 界面机杼 */
(function (root) {
  'use strict';

  var MAP = root.MAP, Rules = root.Rules, Eng = root.Engine, Story = root.Story;
  var UI = {};

  var state = null;
  var view = { selected: null, reachable: [], targets: [], cityTargets: [], inspect: null };
  var tab = 'army';
  var pick = { group: null, entry: null, lord: null };
  var busy = false;
  var mode = 'menu';   // 'menu' | 'play' | 'tutor'
  var tutorStep = 0;

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
    $('btnStart').disabled = !lord;
    var eraName = lord && MAP.ERAS[lord.era] ? MAP.ERAS[lord.era].title : (lord ? lord.era : '');
    $('titleHint').textContent = lord
      ? (lord.name + ' · ' + lord.year + '年 · ' + eraName + ' · ' + lord.difficultyName + '　' + lord.goal)
      : '择一君主，观其开局之势。';
  }

  /* ————— 开局 ————— */
  function startGame(lordKey, opts) {
    opts = opts || {};
    var lord = root.FACTIONS_DATA.LORDS[lordKey];
    state = Eng.newGame({ lord: lordKey, seed: 20260000 + (Date.now() % 9999) });
    mode = opts.tutorial ? 'tutor' : 'play';
    if (mode === 'tutor') { state.tutorial = true; }
    refreshAuras();
    $('titleScreen').classList.remove('on');
    $('topbar').hidden = false;
    $('main').hidden = false;
    var cv = $('map');
    cv.width = MAP.W * root.Render.TS;
    cv.height = MAP.H * root.Render.TS;
    $('picker').hidden = true;
    $('mainMenu').hidden = true;
    toast(lord.name + '受命而起');
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
        if (Math.abs(v.x - u.x) + Math.abs(v.y - u.y) > 1) { return; }
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
      targets: view.targets, cityTargets: view.cityTargets
    });

    var f = state.factions[state.player];
    var res = $('resources');
    clear(res);
    [['金', Math.round(f.gold)], ['粮', Math.round(f.food)], ['威望', Math.round(f.prestige)],
      ['城池', Eng.countCities(state, state.player)], ['敌军', Story.hostileCities(state)]]
      .forEach(function (p) {
        var d = el('span', 'res');
        d.appendChild(el('i', null, p[0]));
        var b = el('b', null, String(p[1]));
        d.appendChild(b);
        res.appendChild(d);
      });
    $('clock').textContent = state.year + '年 · ' + state.eraTitle + ' · 第' + state.turn + '回合 · ' + ['春', '夏', '秋', '冬'][state.seasonIdx];
    renderTab();
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
      box.appendChild(el('div', 'sub', '兵 ' + Math.round(u.hp) + '/' + u.maxHp + '　攻' + s.atk + ' 防' + s.def +
        ' 移' + s.move + ' 射' + s.range + (u.level ? '　' + u.level + '等' : '')));
      var bar = el('div', 'bar hp'); var i = el('i'); i.style.width = (u.hp / u.maxHp * 100) + '%'; bar.appendChild(i);
      box.appendChild(bar);
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
    var mine = Object.keys(state.cities).filter(function (k) { return state.cities[k].owner === state.player; });
    p.appendChild(h('我之郡县（' + mine.length + '）'));
    p.appendChild(el('p', null, '守备尽则城可下；民心低则易生民变。增筑可提高守备与岁入。'));
    mine.forEach(function (k) {
      var c = state.cities[k];
      var card = el('div', 'card tight');
      var row = el('div', 'row');
      row.appendChild(el('span', 'name', c.name + '（' + c.zhou + '·' + c.kind + '）'));
      row.appendChild(el('span', 'sub', c.level + '级'));
      card.appendChild(row);
      var bar = el('div', 'bar gar'); var i = el('i');
      i.style.width = (c.garrison / Math.max(1, c.maxGarrison) * 100) + '%';
      bar.appendChild(i); card.appendChild(bar);
      card.appendChild(el('div', 'sub', '守备 ' + Math.round(c.garrison) + '/' + c.maxGarrison + '　民心 ' + Math.round(c.morale) + '　骚动 ' + Math.round(c.unrest)));
      var types = cityTypes(c);
      var box = el('div');
      box.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;';
      types.forEach(function (t) {
        var cost = Eng.recruitCost(state, t, k);
        var b = el('button', 'btn sm', Rules.UNITS[t].name + ' ' + cost);
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
      var bar = el('div', 'bar mor'); var i = el('i'); i.style.width = (gs.loyalty || 0) + '%'; bar.appendChild(i);
      card.appendChild(bar);
      card.appendChild(el('div', 'sub', '忠诚 ' + Math.round(gs.loyalty || 0)));
      var b = el('button', 'btn sm', '赏赐 150');
      b.addEventListener('click', function () { toast(Eng.rewardGeneral(state, k).msg); draw(); });
      card.appendChild(b);
      p.appendChild(card);
    });

    var wild = Object.keys(state.generals).filter(function (k) {
      var g = state.generals[k];
      return g.status === 'wild' && !g.owner;
    });
    p.appendChild(h('在野之士（' + wild.length + '）'));
    wild.slice(0, 20).forEach(function (k) {
      var g = gen[k];
      if (!g) { return; }
      var card = el('div', 'card tight');
      card.appendChild(el('div', 'name', g.name + (g.zi ? '　字' + g.zi : '')));
      card.appendChild(el('div', 'sub', (g.bio || '').slice(0, 46) + '…'));
      var cost = 80 + (g.impact || 2) * 60;
      var b = el('button', 'btn sm', '征辟 ' + cost);
      b.addEventListener('click', function () { toast(Eng.recruitGeneral(state, k).msg); draw(); });
      card.appendChild(b);
      p.appendChild(card);
    });
  }

  function renderBook(p) {
    var lore = root.LORE || [];
    p.appendChild(h('典籍·风物'));
    p.appendChild(el('p', null, '制度、历法、地理、人文、军事、思潮六类，凡 ' + lore.length + ' 条。'));
    var cats = ['制度', '历法', '地理', '人文', '军事', '思潮'];
    cats.forEach(function (c) {
      var items = lore.filter(function (x) { return x.cat === c; });
      if (!items.length) { return; }
      p.appendChild(Object.assign(el('h4', null, c + '（' + items.length + '）'), {}));
      items.forEach(function (x) {
        var d = el('div', 'lore-item');
        d.appendChild(el('h4', null, x.title));
        d.appendChild(el('p', null, x.text));
        if (x.src) { d.appendChild(el('div', 'src', x.src)); }
        p.appendChild(d);
      });
    });
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

  /* ————— 地图交互 ————— */
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
    $('hint').textContent = unitTitle(u) + '：' + (view.reachable.length ? '可移动 ' + view.reachable.length + ' 格' : '无处可往') +
      (view.targets.length ? '，可击 ' + view.targets.length + ' 部' : '') +
      (view.cityTargets.length ? '，可攻 ' + view.cityTargets.length + ' 城' : '');
    T().note('select', { unit: u });
    if (tab === 'army') { draw(); } else { tab = 'army'; syncTabs(); draw(); }
  }

  function deselect() {
    view.selected = null;
    view.reachable = []; view.targets = []; view.cityTargets = [];
    $('hint').textContent = '点击舆图上本方部队即可调遣；点击敌军可探其虚实。';
  }

  /* ————— 敌情 ————— */
  function intelBox() { return $('intel'); }

  function clearIntel() {
    var b = intelBox();
    if (!b) { return; }
    b.hidden = true;
    clear(b);
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
        pre.textContent = '距我选中之军尚有 ' + (Math.abs(mine.x - u.x) + Math.abs(mine.y - u.y)) + ' 格（曼哈顿距离），不能及也。';
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

    // 一、点本方部队 —— 无论已行动与否，一律选中（已行动者只可审视）
    if (u && u.faction === state.player) { clearIntel(); select(u); return; }

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

    // 五、空地
    var t = Rules.terrainOf(state, x, y);
    if (t) { $('hint').textContent = terrainLabel(x, y); }
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
    nextStory();
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

  /* ————— 结局 ————— */
  function showEnding() {
    var ov = $('overlay');
    clear(ov);
    var win = state.result && state.result.win;
    var e = Story.endingFor(state);
    var wrap = el('div', 'ending-wrap ' + (win ? 'win' : 'lose'));
    wrap.appendChild(el('div', 'eyebrow', win ? '一统之业' : '败亡之局'));
    wrap.appendChild(el('div', 'verdict', (e && e.title) || (win ? '天下混一' : '社稷倾覆')));
    wrap.appendChild(el('div', 'etext', (e && e.text) || (win ? '海内一统。' : '宗庙不守。')));
    var tally = el('div', 'tally');
    [['享国', state.year + '年'], ['回合', state.turn + '回合'], ['拔城', state.stats.citiesTaken],
      ['野战', state.stats.battlesWon], ['斩获', state.stats.kills], ['失城', state.stats.citiesLost]]
      .forEach(function (p) { tally.appendChild(el('span', 'chip', p[0] + ' ' + p[1])); });
    wrap.appendChild(tally);
    var foot = el('div', 'story-foot');
    var again = el('button', 'btn primary', '再举义兵');
    again.addEventListener('click', function () { location.reload(); });
    foot.appendChild(again);
    wrap.appendChild(foot);
    ov.appendChild(wrap);
    ov.classList.add('on');
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
    head.appendChild(el('h2', null, '邦交与诏令'));
    head.appendChild(el('div', 'meta', '金 ' + Math.round(me.gold) + '　威望 ' + Math.round(me.prestige) +
      '　礼赂 300　罢兵 400 起'));
    wrap.appendChild(head);

    var body = el('div', 'story-body');
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
      card.appendChild(el('div', 'sub', (war ? '交兵' : '盟好') + '　邦交 ' + Math.round(rel)));
      var bar = el('div', 'bar');
      var i = el('i');
      i.style.width = Math.abs(rel) + '%';
      i.style.background = rel >= 0 ? 'var(--live)' : 'var(--accent)';
      bar.appendChild(i);
      card.appendChild(bar);

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
    cv.addEventListener('click', function (e) {
      var p = root.Render.hit(e, cv);
      if (p) { onTile(p.x, p.y); }
    });
    cv.addEventListener('contextmenu', function (e) { e.preventDefault(); deselect(); clearIntel(); draw(); });
    cv.addEventListener('mousemove', function (e) {
      if (!state) { return; }
      var p = root.Render.hit(e, cv);
      cv.style.cursor = (p && unitAt(p.x, p.y)) ? 'pointer' : 'default';
    });

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
    $('btnCourt').addEventListener('click', showCourt);

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
      window.location.href = 'wiki.html';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var ov = $('overlay');
        if (ov.classList.contains('on')) {
          var btn = ov.querySelector('.story-foot .btn.primary, .story-foot .btn');
          if (btn) { btn.click(); }
        } else { deselect(); clearIntel(); draw(); }
      }
      if (e.key === 'Enter' && state && !$('overlay').classList.contains('on') && !e.isComposing) {
        endTurn();
      }
    });

    window.addEventListener('resize', function () { if (state) { draw(); } });
  }

  UI.boot = function () {
    buildTitle();
    wire();
    if (root.Tutor) {
      root.Tutor.onEvent(function (ev) {
        if (ev.kind === 'closed' || ev.kind === 'finished') { nextStory(); }
      });
    }
    if (root.Art) { root.Art.onChange = function () { if (state) { draw(); } }; }
  };
  UI.startGame = startGame;
  UI.chooseLord = function (key) { startGame(key); };
  UI.state = function () { return state; };
  UI.view = function () { return view; };
  root.UI = UI;
})(typeof window !== 'undefined' ? window : globalThis);
