/* 《代汉涂高》 — 账号与云存档（正式版）
 * 预览版（GitHub 静态页）无服务端，此模块自探而退为「预览版」，一切照旧；
 * 正式版（自建服务端）则开账号、云存档、版本检查与管理员在线更新。
 * 服务端之约见 server/README.md。
 */
(function (root) {
  'use strict';

  var KEY = 'daihan_tugao.account.v1';
  var state = {
    channel: 'preview',   // preview | release
    probed: false,
    version: null,
    serverVersion: null,
    maintenance: null,
    user: null,
    token: null,
    admin: false,
    lastCheck: null
  };
  var listeners = [];

  function store() {
    try { return root.localStorage ? JSON.parse(root.localStorage.getItem(KEY) || 'null') : null; } catch (e) { return null; }
  }
  function persist() {
    try {
      if (!root.localStorage) { return; }
      if (state.token) {
        root.localStorage.setItem(KEY, JSON.stringify({ token: state.token, user: state.user, admin: state.admin }));
      } else { root.localStorage.removeItem(KEY); }
    } catch (e) { /* 无存储则只存于内存 */ }
  }

  function emit(ev) { listeners.forEach(function (f) { try { f(ev, state); } catch (e) { /* 订阅者之过无碍 */ } }); }
  function onChange(f) { listeners.push(f); }

  function api(path, opts) {
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    if (state.token) { headers['Authorization'] = 'Bearer ' + state.token; }
    if (opts.adminToken) { headers['x-admin-token'] = opts.adminToken; }
    return fetch(path, {
      method: opts.method || 'GET',
      headers: headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (b) { return { code: r.status, body: b }; });
    });
  }

  function timeout(promise, ms) {
    return new Promise(function (res, rej) {
      var done = false;
      var timer = setTimeout(function () { if (!done) { done = true; rej(new Error('逾时')); } }, ms);
      promise.then(function (v) { if (!done) { done = true; clearTimeout(timer); res(v); } },
        function (e) { if (!done) { done = true; clearTimeout(timer); rej(e); } });
    });
  }

  /* 自探：正式版有 /api/health，预览版无（GitHub 静态页返回 404） */
  function probe() {
    var saved = store();
    if (saved) { state.token = saved.token; state.user = saved.user; state.admin = !!saved.admin; }
    return timeout(fetch('/api/health', { cache: 'no-store' }).then(function (r) {
      if (!r.ok) { throw new Error('非正式版'); }
      return r.json();
    }), 4000).then(function (b) {
      if (!b || b.channel !== 'release') { throw new Error('非正式版'); }
      state.channel = 'release';
      state.serverVersion = b.version;
      state.maintenance = b.maintenance && b.maintenance.on ? b.maintenance : null;
      state.probed = true;
      return refreshSession();
    }).catch(function () {
      state.channel = 'preview';
      state.probed = true;
      state.maintenance = null;
      emit('probe');
      return state;
    });
  }

  function refreshSession() {
    if (state.channel !== 'release' || !state.token) { emit('probe'); return Promise.resolve(state); }
    return api('/api/session').then(function (r) {
      if (r.code === 200 && r.body.ok) {
        state.user = r.body.user.name;
        state.admin = !!r.body.user.admin;
        state.serverVersion = r.body.version;
        state.cloud = r.body.save || null;
      } else { state.token = null; state.user = null; state.admin = false; persist(); }
      emit('probe');
      return state;
    });
  }

  function register(user, pass) {
    return api('/api/register', { method: 'POST', body: { user: user, pass: pass } }).then(function (r) {
      if (r.body && r.body.ok) { state.token = r.body.token; state.user = r.body.user.name; state.admin = !!r.body.user.admin; persist(); emit('login'); }
      return r;
    });
  }

  function login(user, pass) {
    return api('/api/login', { method: 'POST', body: { user: user, pass: pass } }).then(function (r) {
      if (r.body && r.body.ok) { state.token = r.body.token; state.user = r.body.user.name; state.admin = !!r.body.user.admin; persist(); emit('login'); }
      return r;
    });
  }

  function logout() {
    return api('/api/logout', { method: 'POST' }).catch(function () { return { code: 0 }; }).then(function (r) {
      state.token = null; state.user = null; state.admin = false; state.cloud = null; persist(); emit('logout');
      return r;
    });
  }

  /* 云存档：内容即浏览器本地之进度（见 src/data/progress.js） */
  function uploadSave() {
    var P = root.PROGRESS;
    if (!P || !P.snapshot) { return Promise.resolve({ code: 0, body: { ok: false, msg: '本局未载进度之制' } }); }
    return api('/api/save', { method: 'POST', body: { data: P.snapshot() } }).then(function (r) {
      if (r.body && r.body.ok) { state.cloud = { rev: r.body.rev, savedAt: r.body.savedAt, version: state.serverVersion }; emit('save'); }
      return r;
    });
  }

  function downloadSave() {
    return api('/api/save').then(function (r) {
      if (!(r.body && r.body.ok && r.body.save)) { return r; }
      var P = root.PROGRESS;
      if (!P || !P.restore) { return { code: r.code, body: { ok: false, msg: '本局未载进度之制' } }; }
      var before = P.tally ? P.tally() : { done: 0 };
      P.restore(r.body.save.data);
      state.cloud = { rev: r.body.save.rev, savedAt: r.body.savedAt, version: r.body.save.version };
      emit('restore');
      return { code: r.code, body: { ok: true, savedAt: r.body.save.savedAt, before: before, after: P.tally ? P.tally() : null } };
    });
  }

  /* 版本之检：正式版自查，并可自预览版（GitHub 静态页）取版本号以相较 */
  function version() {
    return api('/api/version').catch(function () { return { code: 0, body: {} }; });
  }

  function adminStatus(adminToken) {
    return api('/api/admin/status', { adminToken: adminToken });
  }

  function adminCheck(source, adminToken) {
    return api('/api/admin/check', { method: 'POST', adminToken: adminToken, body: { source: source } });
  }

  function adminUpdate(source, adminToken, wait) {
    return api('/api/admin/update' + (wait ? '?wait=1' : ''), { method: 'POST', adminToken: adminToken, body: { source: source } });
  }

  function adminMaintenance(on, text, adminToken) {
    return api('/api/admin/maintenance', { method: 'POST', adminToken: adminToken, body: { on: on, text: text } });
  }

  function adminRollback(adminToken) {
    return api('/api/admin/rollback', { method: 'POST', adminToken: adminToken });
  }

  /* 维护之候：每 15 秒一问，公告既下则告于界面，撤则报「更新已毕」 */
  var pollTimer = null;
  function startPolling() {
    if (state.channel !== 'release' || pollTimer) { return; }
    pollTimer = setInterval(function () {
      fetch('/api/health', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (b) {
        var on = !!(b && b.maintenance && b.maintenance.on);
        var was = !!state.maintenance;
        state.serverVersion = b.version;
        if (on && !was) { state.maintenance = b.maintenance; emit('maintenance'); }
        else if (!on && was) {
          var grew = b.version && b.version !== state.maintenance.version;
          state.maintenance = null;
          emit('maintained', { version: b.version, grew: grew });
        } else if (on) { state.maintenance = b.maintenance; }
      }).catch(function () { /* 断线时静默，下问再试 */ });
    }, 15000);
  }

  root.ACCOUNT = {
    KEY: KEY,
    state: function () { return state; },
    channel: function () { return state.channel; },
    isRelease: function () { return state.channel === 'release'; },
    user: function () { return state.user; },
    token: function () { return state.token; },
    isAdmin: function () { return !!state.admin; },
    probe: probe,
    refresh: refreshSession,
    register: register,
    login: login,
    logout: logout,
    uploadSave: uploadSave,
    downloadSave: downloadSave,
    version: version,
    adminStatus: adminStatus,
    adminCheck: adminCheck,
    adminUpdate: adminUpdate,
    adminMaintenance: adminMaintenance,
    adminRollback: adminRollback,
    onChange: onChange,
    startPolling: startPolling
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.ACCOUNT; }
})(typeof window !== 'undefined' ? window : globalThis);
