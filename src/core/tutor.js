/* 《代汉涂高》 — 教战之场
 *
 * 教学关卡＝一场真正的对局（曹操 · 建安四年官渡前夜）＋一套十步指引。
 * 指引不锁操作：玩家做什么都行，做对了就推进到下一步；
 * 每步都交代「在舆图上点哪里」「在侧栏点哪里」，并附一句史注。
 */
(function (root) {
  'use strict';

  var STEPS = [
    {
      id: 'select',
      title: '点兵',
      task: '在舆图上找到标着「曹」字的圆形徽记，那是你的一支部曲。**用左键点它一下。**',
      detail: '舆图上的圆徽即各部曲，圆心一字为该部主将姓氏。点中后，该军四周会浮出绿色方框——那就是它这一季能走到的范围。'
    },
    {
      id: 'march',
      title: '行军',
      task: '部曲既已选中，**点一处绿色方框**，即可开拔。',
      detail: '绿色格是行军可达之地，格数受机动力与地形限制：山地、林地、沼泽耗力更多，江海非水军不能入。一军一季只行动一次，行动后圆徽转暗。',
      note: '《孙子》曰：「兵之情主速。」——然徒行百里者，未战已疲。'
    },
    {
      id: 'city',
      title: '城池',
      task: '打开右侧「**城池**」页签，看一看自己的郡县。',
      detail: '每座城池有等级、守备、民心与骚动。守备尽则城破；民心低则易生民变。'
    },
    {
      id: 'recruit',
      title: '征募',
      task: '在「城池」页中，任点一座城池下的一个兵种按钮，**征募一支新军**。',
      detail: '兵种十四，各有相克：骑克弓弩，枪戟克骑，弓弩克枪戟，器械专于攻城。征募耗费金帛；军队每季耗粮，粮不足则诸军减员。'
    },
    {
      id: 'upgrade',
      title: '增筑',
      task: '在同一页中，点任一城池的「**增筑**」按钮，高其城，厚其守。',
      detail: '增筑提高城池等级，守备上限与岁入一并上升。深沟高垒，未必能进取，却常能不败。'
    },
    {
      id: 'intel',
      title: '探敌',
      task: '在舆图上**点一支敌军**（非「曹」字徽记者），看它的虚实。',
      detail: '会浮出「敌情」牌：敌将姓名、字号、五维、技能、兵种、兵力、士气、所处地形；若你已选中一军，还可预判交锋的得失。'
    },
    {
      id: 'battle',
      title: '交锋',
      task: '指挥一支本部部曲，**攻击一支敌军或一座敌城**——选中我方部队后，红框者即可击之敌，红色虚线框者即可攻之城。',
      detail: '野战先算相克与地形，再看武将属性与士气；攻城先耗守备，守备尽方得入城。若一时够不着敌人，可先「就地待命」，再结束回合，等敌军自来。'
    },
    {
      id: 'court',
      title: '庙堂',
      task: '点顶栏「**庙堂**」，看诸侯邦交，任择一家礼赂或约和。',
      detail: '礼赂涨邦交，宣战成仇雠，约和息兵戈。若为汉献帝，另可下天子诏书——那是《代汉涂高》里最好用、也最易耗尽的资本。'
    },
    {
      id: 'lore',
      title: '典籍',
      task: '打开右侧「**典籍**」页签，翻两条条目。',
      detail: '制度、历法、地理、人文、军事、思潮六类，皆有出处。读之可知当时之人何以如此行事。'
    },
    {
      id: 'turn',
      title: '成岁',
      task: '一切就绪，点顶栏「**结束回合**」（亦可按 Enter）。四时成岁，一岁之后，天下又是一番光景。',
      detail: '敌军在你回合之间行动：集众攻一城，回援危城，征募与增筑。教战至此毕，往后如何，端看你自己了。'
    }
  ];

  var Mod = { step: 0, on: false, state: null, listeners: [] };

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (txt != null) { n.textContent = txt; }
    return n;
  }

  function panel() { return document.getElementById('tutor'); }
  function current() { return STEPS[Mod.step] || null; }

  function render() {
    var p = panel();
    if (!p) { return; }
    if (!Mod.on) { p.hidden = true; p.innerHTML = ''; return; }
    p.hidden = false;
    p.innerHTML = '';

    var s = current();
    var head = el('div', 'tutor-head');
    head.appendChild(el('span', 'tutor-idx', s ? ('第 ' + (Mod.step + 1) + ' / ' + STEPS.length + ' 步') : '教战毕'));
    head.appendChild(el('b', null, s ? s.title : '毕'));
    p.appendChild(head);

    var body = el('div', 'tutor-body');
    if (s) {
      var t = el('p', 'tutor-task');
      String(s.task).split('**').forEach(function (seg, i) {
        if (i % 2 === 1) { t.appendChild(el('em', 'hl', seg)); }
        else { t.appendChild(document.createTextNode(seg)); }
      });
      body.appendChild(t);
      if (s.detail) { body.appendChild(el('p', 'tutor-detail', s.detail)); }
      if (s.note) { body.appendChild(el('p', 'tutor-note', s.note)); }
    } else {
      body.appendChild(el('p', 'tutor-task', '教战之场已毕。此局仍是你的——去取许都，去并河北，去观一观「代汉者当涂高」究竟应在谁人身上。'));
      body.appendChild(el('p', 'tutor-detail', '教战之中，剧情章回暂不呈上；自此刻起，曹操的故事线照常推进。'));
    }
    p.appendChild(body);

    var foot = el('div', 'tutor-foot');
    if (Mod.step > 0 && Mod.step < STEPS.length) {
      var prev = el('button', 'btn sm', '上一步');
      prev.addEventListener('click', function () { Mod.step--; render(); });
      foot.appendChild(prev);
    }
    var skip = el('button', 'btn sm', Mod.step >= STEPS.length ? '收起' : '跳过教战');
    skip.addEventListener('click', function () {
      Mod.on = false;
      if (Mod.state) { Mod.state.tutorial = false; }
      render();
      emit({ kind: 'closed' });
    });
    foot.appendChild(skip);
    p.appendChild(foot);
  }

  function emit(ev) { Mod.listeners.forEach(function (fn) { try { fn(ev); } catch (e) { /* 静默 */ } }); }

  function matches(step, ev) {
    switch (step.id) {
      case 'select': return ev.kind === 'select';
      case 'march': return ev.kind === 'march';
      case 'city': return ev.kind === 'tab' && ev.tab === 'city';
      case 'recruit': return ev.kind === 'recruit';
      case 'upgrade': return ev.kind === 'upgrade';
      case 'intel': return ev.kind === 'intel';
      case 'battle': return ev.kind === 'battle' || ev.kind === 'siege';
      case 'court': return ev.kind === 'court';
      case 'lore': return ev.kind === 'tab' && ev.tab === 'book';
      case 'turn': return ev.kind === 'turn';
      default: return false;
    }
  }

  function handle(ev) {
    if (!Mod.on) { return; }
    var s = current();
    if (!s) { return; }
    if (matches(s, ev)) {
      Mod.step++;
      if (Mod.step >= STEPS.length) {
        // 教战毕：即刻交还剧情（面板留到最后，点「收起」结束）
        if (Mod.state) { Mod.state.tutorial = false; }
      }
      render();
      emit({ kind: 'advance', step: Mod.step });
      if (Mod.step >= STEPS.length) { setTimeout(function () { emit({ kind: 'finished' }); }, 30); }
    }
  }

  root.Tutor = {
    steps: STEPS,
    begin: function (state) {
      Mod.on = true; Mod.step = 0; Mod.state = state || null;
      if (state) { state.tutorial = true; }
      render();
    },
    end: function () {
      Mod.on = false;
      if (Mod.state) { Mod.state.tutorial = false; }
      render();
    },
    active: function () { return Mod.on; },
    note: function (kind, payload) { handle({ kind: kind, payload: payload }); },
    tab: function (name) { handle({ kind: 'tab', tab: name }); },
    court: function () { handle({ kind: 'court' }); },
    recruit: function () { handle({ kind: 'recruit' }); },
    upgrade: function () { handle({ kind: 'upgrade' }); },
    inspect: function () { handle({ kind: 'intel' }); },
    turn: function () { handle({ kind: 'turn' }); },
    onEvent: function (fn) { Mod.listeners.push(fn); },
    render: render
  };
})(typeof window !== 'undefined' ? window : globalThis);
