/* 《代汉涂高》 — 志略页之读取器
 * wiki.html（兵书志略）与 dev.html（匠作志略）共用；两者数据形状一致：
 *   { title, intro, sections:[ { id, name, entries:[ { id, title, body[], list[], table{head,rows}, note, src } ] } ] }
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

  function mount(W) {
    var nav = document.getElementById('wikiNav');
    var main = document.getElementById('wikiMain');
    if (!nav || !main) { return; }

    if (!W || !W.sections || !W.sections.length) {
      main.appendChild(el('p', 'lead', '尚未编次。'));
      return;
    }

    var title = W.title || '志略';
    document.title = title;
    document.getElementById('wikiTitle').textContent = title;

    var total = 0;
    W.sections.forEach(function (s) { total += (s.entries || []).length; });
    var count = document.getElementById('wikiCount');
    if (count) { count.textContent = '凡 ' + W.sections.length + ' 门 · ' + total + ' 条'; }

    nav.appendChild(el('h2', null, title));
    W.sections.forEach(function (s) {
      var a = el('a', null, s.name);
      a.href = '#sec-' + s.id;
      nav.appendChild(a);
      (s.entries || []).forEach(function (e) {
        var b = el('a', 'sub', e.title);
        b.href = '#ent-' + e.id;
        nav.appendChild(b);
      });
    });

    main.appendChild(el('p', 'lead', W.intro || ''));

    W.sections.forEach(function (s) {
      var sec = el('section', 'wiki-sec');
      sec.id = 'sec-' + s.id;
      sec.appendChild(el('h3', null, s.name));
      (s.entries || []).forEach(function (e) {
        var box = el('article', 'wiki-ent');
        box.id = 'ent-' + e.id;
        box.appendChild(el('h4', null, e.title));
        (e.body || []).forEach(function (pg) { box.appendChild(el('p', null, pg)); });
        if (e.list && e.list.length) {
          var ul = el('ul');
          e.list.forEach(function (li) { ul.appendChild(el('li', null, li)); });
          box.appendChild(ul);
        }
        if (e.table && e.table.head) {
          var t = el('table', 'wiki-table');
          var thead = el('thead'), tr = el('tr');
          e.table.head.forEach(function (h) { tr.appendChild(el('th', null, h)); });
          thead.appendChild(tr); t.appendChild(thead);
          var tb = el('tbody');
          (e.table.rows || []).forEach(function (row) {
            var r = el('tr');
            row.forEach(function (c) { r.appendChild(el('td', null, c)); });
            tb.appendChild(r);
          });
          t.appendChild(tb);
          box.appendChild(t);
        }
        if (e.note) { box.appendChild(el('div', 'note', e.note)); }
        if (e.src) { box.appendChild(el('div', 'src', e.src)); }
        sec.appendChild(box);
      });
      main.appendChild(sec);
    });
  }

  root.Reader = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);
