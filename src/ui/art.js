/* 《代汉涂高》 — 图象
 *
 * 美术资源一律自制后放进 assets/img/ 下即可自动生效；
 * 缺图时自动退回原有的文字与矢量绘制，不报错、不留空框、不闪烁。
 *
 *   assets/img/portraits/<武将id>.png    人物头像（君主另可用 <君主key>）
 *   assets/img/units/<兵种id>.png        部队标记
 *   assets/img/terrain/<地形key>.png     地形贴图
 *   assets/img/banners/<势力key>.png     势力旗
 *   assets/img/cities/<城池kind>.png     城池图形
 *
 * 后缀探测顺序：.png → .jpg → .webp，先找到的先生效。
 *
 * 取图之法（旧版之弊在于「先插 <img>、再等 404」：
 * 每行每次重绘都先冒出一个空头像框，三次请求皆败后方换成文字旗，故成片闪烁）：
 *   一、只认**已确证存在**之图。图未就绪，立刻以备用之文字／旗绘出，绝不留空框；
 *   二、探测既得，就地把该框换成图，不劳整屏重绘；
 *   三、探测有节：同类资源同时至多探四名、全局至多十六名，余者排队依次探之，
 *       免得一面之绘同时抛出数百请求。**每一名字仍只试一次**（试过即入缓存），
 *       故纵缺图仍是渐次试、非风暴；有图者亦必被寻得，绝不因省事而漏图。
 */
(function (root) {
  'use strict';

  var EXTS = ['.png', '.jpg', '.webp'];

  var DIR = {
    portrait: 'assets/img/portraits/',
    unit: 'assets/img/units/',
    terrain: 'assets/img/terrain/',
    banner: 'assets/img/banners/',
    city: 'assets/img/cities/'
  };

  /* 探测之节：同类同时至多四名，全局至多十六名；余者排队。每一名字仍只试一次。 */
  var MAX_KIND = 4;
  var MAX_ALL = 16;

  var cache = {};        // "kind:name" -> { state:'queued'|'probing'|'ok'|'miss', img, url, i }
  var waiters = {};      // "kind:name" -> [fn(state)]
  var queue = [];        // [{ e, kind, name, k }]
  var live = 0;          // 正在探者之总数
  var liveKind = {};     // kind -> 正在探者之数
  var onChange = null;   // 确有新图载入时回调（用于重绘舆图）
  var dirty = false;

  function keyOf(kind, name) { return kind + ':' + name; }

  function announce() {
    if (dirty) { return; }
    dirty = true;
    var run = function () {
      dirty = false;
      if (typeof onChange === 'function') { onChange(); }
    };
    if (root.requestAnimationFrame) { root.requestAnimationFrame(run); }
    else { setTimeout(run, 40); }
  }

  function probe(kind, name) {
    if (!name) { return null; }
    var k = keyOf(kind, name);
    var e = cache[k];
    if (e) { return e; }
    e = cache[k] = { state: 'queued', img: null, url: null, i: 0 };
    if ((liveKind[kind] || 0) < MAX_KIND && live < MAX_ALL) { start(e, kind, name, k); }
    else { queue.push({ e: e, kind: kind, name: name, k: k }); }
    return e;
  }

  function start(e, kind, name, k) {
    e.state = 'probing';
    live++; liveKind[kind] = (liveKind[kind] || 0) + 1;
    step(e, kind, name, k);
  }

  function done(e, kind) {
    live--; liveKind[kind]--;
    drain();
  }

  /* 队列之中按序取可探者 */
  function drain() {
    for (var i = 0; i < queue.length && live < MAX_ALL; ) {
      var q = queue[i];
      if ((liveKind[q.kind] || 0) >= MAX_KIND) { i++; continue; }
      queue.splice(i, 1);
      start(q.e, q.kind, q.name, q.k);
    }
  }

  function step(e, kind, name, k) {
    if (e.i >= EXTS.length) {
      e.state = 'miss';
      settle(k, 'miss');
      done(e, kind);
      return;
    }
    var url = DIR[kind] + name + EXTS[e.i];
    var im = new Image();
    im.onload = function () {
      e.state = 'ok'; e.img = im; e.url = url;
      settle(k, 'ok');
      done(e, kind);
      announce();
    };
    im.onerror = function () { e.i++; step(e, kind, name, k); };
    im.src = url;
  }

  /* 一处既决，通知所有候此图者（miss 不必告，因其占位早已画出） */
  function settle(k, state) {
    var list = waiters[k];
    if (!list) { return; }
    delete waiters[k];
    list.forEach(function (fn) { try { fn(state); } catch (err) { /* 单点之失不累全局 */ } });
  }

  function wait(k, fn) {
    (waiters[k] || (waiters[k] = [])).push(fn);
  }

  function mkImg(cls, url) {
    var im = document.createElement('img');
    im.className = cls || 'art-img';
    im.alt = '';
    im.draggable = false;
    im.src = url;
    return im;
  }

  /* 换入真图：清空占位，置图，去「空」样 */
  function fill(box, e) {
    while (box.firstChild) { box.removeChild(box.firstChild); }
    box.appendChild(mkImg(box.getAttribute('data-art-cls') || 'art-img', e.url));
    box.classList.remove('avatar-empty');
  }

  /* 占位若是空文字／无内容，则整框隐去（免得留一个空框） */
  function hideIfBlank(box, fb) {
    var blank = !fb || (fb.nodeType === 3 && !String(fb.nodeValue || '').trim());
    if (blank) { box.classList.add('avatar-empty'); }
  }

  /* 依次试候选名字，得图即换；不得则留占位 */
  function arm(box, fb, kind, list, i, cls) {
    if (i >= list.length) { return; }
    var k = keyOf(kind, list[i]);
    var e = probe(kind, list[i]);
    if (!e) { arm(box, fb, kind, list, i + 1, cls); return; }
    if (e.state === 'ok') { box.setAttribute('data-art-cls', cls); fill(box, e); return; }
    if (e.state === 'miss') { arm(box, fb, kind, list, i + 1, cls); return; }
    wait(k, function (state) {
      if (state === 'ok') { box.setAttribute('data-art-cls', cls); fill(box, cache[k]); }
      else { arm(box, fb, kind, list, i + 1, cls); }
    });
  }

  function fbNode(fallback) {
    if (fallback && fallback.nodeType) { return fallback; }
    return document.createTextNode(fallback == null ? '' : String(fallback));
  }

  /* 同步取图：未就绪（含正在探测）一律返回 null，调用方自动退回文字绘制 */
  function get(kind, name) {
    if (!name) { return null; }
    var e = cache[keyOf(kind, name)] || probe(kind, name);
    return (e && e.state === 'ok') ? e.img : null;
  }

  /* 是否确有此图（不触发探测；就绪后由占位换图或 onChange 体现） */
  function has(kind, name) {
    var e = cache[keyOf(kind, name)];
    return !!(e && e.state === 'ok');
  }

  /* 该名字的第一个候选 URL，用于 <img src> 直接引用 */
  function url(kind, name) { return DIR[kind] + name + EXTS[0]; }

  /* 供 DOM 用：就绪才置 <img>，未就绪就地留位，全部失败则调 onFail */
  function imgEl(kind, name, cls, onFail) {
    var k = keyOf(kind, name);
    var e = probe(kind, name);
    if (e && e.state === 'ok') { return mkImg(cls, e.url); }
    if (e && e.state === 'miss') { return onFail ? onFail() : document.createTextNode(''); }
    var ph = document.createComment('art');
    wait(k, function (state) {
      var out = (state === 'ok') ? mkImg(cls, cache[k].url) : (onFail ? onFail() : null);
      if (out && out.nodeType && ph.parentNode) { ph.parentNode.replaceChild(out, ph); }
    });
    return ph;
  }

  /* 头像：有图填图，无图立即填 fallback（文本或节点），两者互斥，绝不留空框 */
  function avatar(kind, names, cls, fallback) {
    var box = document.createElement('span');
    box.className = 'avatar ' + (cls || '');
    box.setAttribute('data-art-cls', 'art-img');
    var fb = fbNode(fallback);
    box.appendChild(fb);
    hideIfBlank(box, fb);
    var list = (names || []).filter(Boolean);
    if (!list.length) { return box; }
    arm(box, fb, kind, list, 0, 'art-img');
    return box;
  }

  /* 已知全部候选（供 manifest 工具与今后的补图清单使用） */
  function dirOf(kind) { return DIR[kind]; }

  /* 调试／测试用：尽弃缓存与队列，一切重探 */
  function reset() { cache = {}; waiters = {}; queue = []; live = 0; liveKind = {}; }

  /* 调试／测试用：正在探者与待探者之数 */
  function stats() { return { cache: Object.keys(cache).length, live: live, queued: queue.length }; }

  root.Art = {
    get: get, has: has, url: url, imgEl: imgEl, avatar: avatar,
    dirOf: dirOf, exts: EXTS, reset: reset, stats: stats,
    set onChange(fn) { onChange = fn; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
