/* 《代汉涂高》 — 二志之门
 * 兵书志略（wiki.html）：玩法之志，须常规通关三名君主方启。
 * 匠作志略（dev.html）：实现之志，惟正式版之管理员得入；预览版（GitHub 静态页）无账号之制，
 *   故一概不启。
 * 门外之人见其门而不见其文：一则示其所以然，一则指其归路。
 * 传统 script，无 ESM。
 */
(function (root) {
  'use strict';

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (txt != null) { n.textContent = txt; }
    return n;
  }

  function $id(id) { return document.getElementById(id); }

  /* 门屏：题、由、今况（列表）、归路 */
  function screen(opts) {
    var nav = $id('wikiNav'), main = $id('wikiMain');
    if (nav) { nav.hidden = true; }
    if (!main) { return; }
    while (main.firstChild) { main.removeChild(main.firstChild); }
    var head = $id('wikiTitle');
    if (head) { head.textContent = opts.title || '志略'; }
    document.title = (opts.title || '志略') + ' · 代汉涂高';

    var box = el('div', 'gate');
    box.appendChild(el('div', 'eyebrow', opts.eyebrow || '未启'));
    box.appendChild(el('h3', null, opts.heading || '此志未启'));
    box.appendChild(el('p', 'lead', opts.lead || ''));
    (opts.list || []).forEach(function (t) { box.appendChild(el('p', 'gate-line', t)); });
    if (opts.note) { box.appendChild(el('p', 'note', opts.note)); }
    var foot = el('div', 'gate-foot');
    var a = el('a', 'btn', '回主页面');
    a.href = 'index.html';
    foot.appendChild(a);
    if (opts.foot) { opts.foot.forEach(function (x) { foot.appendChild(x); }); }
    box.appendChild(foot);
    main.appendChild(box);
    var cnt = $id('wikiCount');
    if (cnt) { cnt.textContent = opts.count || ''; }
  }

  function markOf(P, k) { return P ? (P.lordMark(k) || '未曾用兵') : ''; }

  /* —— 兵书志略之门 —— */
  function wiki() {
    var P = root.PROGRESS;
    var devLink = $id('devLink');
    var open = !P || P.wikiOpen();
    var have = P ? P.normalLords().length : 0;
    var need = P ? P.WIKI_GATE : 3;
    var cnt = $id('wikiCount');
    if (cnt) { cnt.textContent = '须常规通关 ' + need + ' 名君主方启（今 ' + have + ' 位）'; }
    if (open) {
      if (root.Roster) { root.Roster.attach(); }
      if (root.Reader) { root.Reader.mount(root.WIKI); }
    } else {
      var FD = root.FACTIONS_DATA || { LORDS: {} };
      var list = Object.keys(FD.LORDS).map(function (k) {
        var s = P ? P.lordStatus(k) : null;
        if (!s || (!s.normal && !s.done)) { return null; }
        return FD.LORDS[k].name + '：' + markOf(P, k) +
          (s.normal ? '' : '（有定志者 ' + s.doneNonOpen + '／' + s.nonOpen + '）');
      }).filter(Boolean);
      screen({
        title: '兵书志略',
        eyebrow: '志略未启',
        heading: '兵书志略 · 须常规通关三名君主',
        lead: '此志载兵制、相克、行军、城池、邦交、剧本与关卡、朝局、户口与氏族、剧情与胜负，' +
          '并附「人物志」尽列将佐。然纸上之谈，须先验之沙场：常规通关三名君主，此门自启。',
        list: [
          '常规通关：该君主所有「有定志」之关皆克。末关为无定式（唯以混一为志），不在其数。',
          '完全通关：并末关亦克。完全通关者亦计入门数，且于君主之名另加其识。',
          '今已常规通关 ' + have + ' 位，尚须 ' + Math.max(0, need - have) + ' 位。'
        ],
        note: list.length ? ('近日之战：' + list.join('；')) : '近日未有用兵之记。',
        count: have + '／' + need
      });
    }
    if (devLink) { devLink.hidden = true; }
    if (root.ACCOUNT) {
      root.ACCOUNT.probe().then(function () {
        var st = root.ACCOUNT.state();
        if (devLink) { devLink.hidden = !(st.channel === 'release' && st.admin); }
        if (st.maintenance && st.maintenance.on) {
          screen({
            title: '兵书志略', eyebrow: '维护之中', heading: '服务维护之中',
            lead: st.maintenance.text || '本作正在更新，请稍候再来。', count: '',
            note: '更新既毕，此页自复位。'
          });
        }
      });
    }
  }

  /* —— 匠作志略之门 —— */
  function dev() {
    var A = root.ACCOUNT;
    var pass = function () {
      if (root.Reader) { root.Reader.mount(root.DEV); }
    };
    var deny = function (why) {
      screen({
        title: '匠作志略',
        eyebrow: '仅管理员可见',
        heading: '此志仅管理员可见',
        lead: '匠作志略载本工程之实现：目录架构、脚本载入之序、数据契约与白名单、' +
          '图象资源、校验之具与扩展之方。此皆匠作之事，不列于玩法，故不示于众人。',
        list: [
          '正式版（自建服务端）：以首位注册之管理员账号登录，则此门自启。',
          '预览版（GitHub 静态页）：无账号之制，故无门可入。',
          why
        ],
        count: '管理员'
      });
    };
    if (!A) { deny('今未载账号之制，故不启。'); return; }
    A.probe().then(function () {
      var st = A.state();
      if (st.channel !== 'release') { deny('今为预览版（服务端未应），故不启。'); return; }
      if (!st.admin) {
        deny(st.user ? ('今登录者为「' + st.user + '」，非管理员。') : '今未登录。请由主页面之「账号」登录。');
        return;
      }
      pass();
    }).catch(function () { deny('今为预览版（服务端未应），故不启。'); });
  }

  root.Gate = { wiki: wiki, dev: dev, screen: screen };
})(typeof window !== 'undefined' ? window : globalThis);
