/* 《代汉涂高》 — 入口 */
(function () {
  'use strict';
  function boot() {
    try {
      if (window.MAP.grid && window.MAP.grid.length !== window.MAP.H) { throw new Error('舆图尺寸不符'); }
      window.UI.boot();
    } catch (err) {
      var box = document.getElementById('titleHint');
      if (box) { box.textContent = '载入失败：' + err.message; }
      console.error(err);
      throw err;
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
