/* 《代汉涂高》 — 图象
 *
 * 美术资源一律自制后放进 assets/img/ 下即可自动生效；
 * 缺图时自动退回原有的文字与矢量绘制，不报错、不占位。
 *
 *   assets/img/portraits/<武将id>.png    人物头像（君主另可用 <君主key>）
 *   assets/img/units/<兵种id>.png        部队标记
 *   assets/img/terrain/<地形key>.png     地形贴图
 *   assets/img/banners/<势力key>.png     势力旗
 *   assets/img/cities/<城池kind>.png     城池图形
 *
 * 后缀探测顺序：.png → .jpg → .webp，先找到的先生效。
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

  var cache = {};          // "kind:name" -> { state:'probing'|'ok'|'miss', img, url, i }
  var onChange = null;     // 有新图就绪时回调（用于重绘舆图）
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
    var k = keyOf(kind, name);
    var e = cache[k];
    if (e) { return e; }
    e = cache[k] = { state: 'probing', img: null, url: null, i: 0 };
    step(e, kind, name);
    return e;
  }

  function step(e, kind, name) {
    if (e.i >= EXTS.length) { e.state = 'miss'; announce(); return; }
    var url = DIR[kind] + name + EXTS[e.i];
    var im = new Image();
    im.onload = function () {
      e.state = 'ok'; e.img = im; e.url = url; announce();
    };
    im.onerror = function () {
      e.i++;
      step(e, kind, name);
    };
    im.src = url;
  }

  /* 同步取图：未就绪（含正在探测）一律返回 null，调用方自动退回文字绘制 */
  function get(kind, name) {
    if (!name) { return null; }
    var e = cache[keyOf(kind, name)];
    if (!e) { e = probe(kind, name); }
    return e.state === 'ok' ? e.img : null;
  }

  /* 是否确有此图（探测未完成时返回 false，完成就绪后由 onChange 触发重绘） */
  function has(kind, name) {
    var e = cache[keyOf(kind, name)];
    return !!(e && e.state === 'ok');
  }

  /* 该名字的第一个候选 URL，用于 <img src> 直接引用 */
  function url(kind, name) { return DIR[kind] + name + EXTS[0]; }

  /* 供 DOM 用：依次尝试各后缀，全部失败则回调 onFail（调用方显文字） */
  function imgEl(kind, name, cls, onFail) {
    var im = document.createElement('img');
    im.className = cls || 'art-img';
    im.alt = '';
    im.draggable = false;
    var i = 0;
    im.onerror = function () {
      i++;
      if (i < EXTS.length) { im.src = DIR[kind] + name + EXTS[i]; }
      else { im.remove(); if (onFail) { onFail(); } }
    };
    im.src = DIR[kind] + name + EXTS[0];
    return im;
  }

  /* 头像：有图填图，无图填 fallback（文本节点），两者互斥 */
  function avatar(kind, names, cls, fallback) {
    var box = document.createElement('span');
    box.className = 'avatar ' + (cls || '');
    var list = (names || []).filter(Boolean);
    if (!list.length) { box.appendChild(fallback); return box; }
    var idx = 0;
    var im = document.createElement('img');
    im.className = 'art-img';
    im.alt = '';
    im.draggable = false;
    im.onerror = function () {
      idx++;
      if (idx < list.length) { im.src = DIR[kind] + list[idx] + EXTS[0]; }
      else { im.remove(); box.appendChild(fallback); }
    };
    im.src = DIR[kind] + list[0] + EXTS[0];
    box.appendChild(im);
    return box;
  }

  /* 已知全部候选（供 manifest 工具与今后的补图清单使用） */
  function dirOf(kind) { return DIR[kind]; }

  root.Art = {
    get: get, has: has, url: url, imgEl: imgEl, avatar: avatar,
    dirOf: dirOf, exts: EXTS,
    set onChange(fn) { onChange = fn; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
