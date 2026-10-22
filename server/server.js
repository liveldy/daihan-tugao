/* 《代汉涂高》正式版 — 服务端
 * 一处服务两事：一为静态之站（与预览版同源同码），二为正式版之诸能——
 * 账号（注册、登录、会话）、云存档（与本地进度同构，可上传可下载）、
 * 版本检查与管理员手动在线更新（含更新期玩家下线之安全策略）。
 * 只依赖 Node 内建模块。用法见 server/README.md。
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');

const Store = require('./lib/store');
const upd = require('./lib/update');

/* ————— 命令行与环境 ————— */
function args(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.indexOf('--') === 0) {
      const k = a.slice(2);
      const v = argv[i + 1] && argv[i + 1].indexOf('--') !== 0 ? argv[++i] : 'true';
      out[k] = v;
    } else { out._.push(a); }
  }
  return out;
}

const ARG = args(process.argv.slice(2));
const ROOT = path.resolve(__dirname, '..');            // 仓库根（静态站之源）
const PORT = Number(ARG.port || process.env.PORT || 8080);
const HOST = ARG.host || process.env.DAIHAN_HOST || '127.0.0.1';
const WEB_ROOT = path.resolve(ARG.web || process.env.DAIHAN_WEB_ROOT || ROOT);
const DATA_DIR = path.resolve(ARG.data || process.env.DAIHAN_DATA || path.join(__dirname, 'data'));
const STAGE_SRC = path.join(DATA_DIR, 'stage-source');
const STAGE_WEB = path.join(DATA_DIR, 'stage-web');
const DRAIN_IDLE = Number(ARG['drain-idle'] || process.env.DAIHAN_DRAIN_IDLE || 20000);
const DRAIN_TIMEOUT = Number(ARG['drain-timeout'] || process.env.DAIHAN_DRAIN_TIMEOUT || 180000);
const SESSION_MAX_AGE = Number(ARG['session-max-age'] || 30 * 24 * 3600 * 1000);

const store = new Store(DATA_DIR);

/* 管理员令牌：命令行 > 环境 > 数据目录中的 admin.token（首次自动生成） */
const ADMIN_FILE = path.join(DATA_DIR, 'admin.token');
let adminToken = ARG['admin-token'] || process.env.DAIHAN_ADMIN_TOKEN || '';
if (!adminToken) {
  if (fs.existsSync(ADMIN_FILE)) { adminToken = fs.readFileSync(ADMIN_FILE, 'utf8').trim(); }
  else { adminToken = crypto.randomBytes(24).toString('hex'); fs.writeFileSync(ADMIN_FILE, adminToken, 'utf8'); }
}

const state = {
  startedAt: Date.now(),
  maintenance: { on: false, text: '', since: null },
  update: null,        // 进行中的更新
  lastUpdate: null,    // 上次更新之果
  sse: new Set(),
  fileRoot: WEB_ROOT
};

/* ————— 小工具 ————— */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let n = 0; const chunks = [];
    req.on('data', c => {
      n += c.length;
      if (n > (limit || 2 * 1024 * 1024)) { reject(new Error('体过大')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      const s = Buffer.concat(chunks).toString('utf8');
      if (!s) { resolve({}); return; }
      try { resolve(JSON.parse(s)); } catch (e) { reject(new Error('体非 JSON')); }
    });
    req.on('error', reject);
  });
}

function bearer(req) {
  const h = req.headers['authorization'] || '';
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  return m ? m[1] : null;
}

function isAdmin(req) {
  const t = req.headers['x-admin-token'] || bearer(req);
  if (!t) { return false; }
  if (t === adminToken) { return true; }
  /* 账号之中第一位注册者掌管理之权，可自游戏界面理更新之事 */
  const s = store.verify(t);
  return !!(s && s.admin);
}

function logUpdate(entry) {
  try {
    fs.appendFileSync(path.join(DATA_DIR, 'update.log'), JSON.stringify(Object.assign({ at: Date.now() }, entry)) + '\n', 'utf8');
  } catch (e) { /* 记录失败无碍主流程 */ }
}

function broadcast(obj) {
  const line = 'data: ' + JSON.stringify(obj) + '\n\n';
  state.sse.forEach(res => { try { res.write(line); } catch (e) { state.sse.delete(res); } });
}

function versionNow() { return upd.readVersion(state.fileRoot); }

/* ————— 静态之站 ————— */
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8', '.map': 'application/json; charset=utf-8'
};

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === '/' || rel === '') { rel = '/index.html'; }
  /* 服务端源码、工具、数据与版本库皆不对外 */
  if (/^\/(server|tools|data|\.git|node_modules)(\/|$)/.test(rel)) {
    json(res, 404, { ok: false, msg: '无此文件' });
    return;
  }
  const full = path.resolve(state.fileRoot, '.' + rel);
  if (full.indexOf(path.resolve(state.fileRoot)) !== 0) { json(res, 403, { ok: false, msg: '越界' }); return; }
  fs.stat(full, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end('无此文件：' + rel);
      return;
    }
    const ext = path.extname(full).toLowerCase();
    const etag = '"' + st.size.toString(16) + '-' + st.mtimeMs.toString(16) + '"';
    if (req.headers['if-none-match'] === etag) { res.writeHead(304, { ETag: etag }); res.end(); return; }
    const immutable = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.woff', '.woff2'].indexOf(ext) >= 0;
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': st.size,
      'ETag': etag,
      'Cache-Control': immutable ? 'public, max-age=86400' : 'no-cache'
    });
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(full).pipe(res);
  });
}

/* ————— 更新：冻结、待客、替换 ————— */
async function drainSessions(onNote) {
  const t0 = Date.now();
  for (;;) {
    const act = store.active(DRAIN_IDLE);
    if (!act.length) { return { waited: Date.now() - t0, forced: false, remaining: 0 }; }
    if (Date.now() - t0 >= DRAIN_TIMEOUT) { return { waited: Date.now() - t0, forced: true, remaining: act.length }; }
    if (onNote) { onNote(act); }
    await sleep(500);
  }
}

/* 一、检查：只比版本与文件，不动线上 */
async function checkUpdate(src) {
  let dir = src && src.dir;
  let cleanup = null;
  if (src && src.git) {
    const got = upd.gitExport(src.git, src.ref, STAGE_SRC);
    dir = got.dir; cleanup = STAGE_SRC;
  }
  const p = upd.plan(dir, state.fileRoot);
  p.current = versionNow();
  return { plan: p, cleanup: cleanup };
}

/* 二至五：暂存、冻结、待客、替换 */
async function runUpdate(src) {
  const t0 = Date.now();
  state.update = { phase: 'check', startedAt: t0, src: src };
  try {
    const chk = await checkUpdate(src);
    const p = chk.plan;
    if (!p.ok) { throw new Error(p.errors.join('；')); }
    state.update.version = p.version;
    if (p.same) {
      const done = { ok: true, same: true, version: p.version, msg: '线上已是此版，无须更新', waited: Date.now() - t0 };
      state.lastUpdate = done; state.update = null;
      return done;
    }

    state.update.phase = 'stage';
    const st = upd.stage(chk.cleanup || (src && src.dir), STAGE_WEB);

    state.update.phase = 'freeze';
    state.maintenance = { on: true, text: '正在更新至 ' + st.version + '，请暂候；此间请勿开始新战局。', since: Date.now() };
    broadcast({ type: 'maintenance', on: true, text: state.maintenance.text, version: st.version });

    state.update.phase = 'drain';
    const drained = await drainSessions(act => { state.update.online = act.length; });

    state.update.phase = 'swap';
    const applied = upd.apply(STAGE_WEB, state.fileRoot);

    state.maintenance = { on: false, text: '', since: null };
    const done = {
      ok: true, from: p.current, to: applied.version, files: st.files,
      drained: drained, waited: Date.now() - t0, backup: applied.backup
    };
    state.lastUpdate = done;
    state.update = null;
    broadcast({ type: 'updated', version: applied.version, from: p.current });
    logUpdate({ act: 'update', from: p.current, to: applied.version, files: st.files, drained: drained, elapsed: done.waited });
    if (chk.cleanup) { try { fs.rmSync(chk.cleanup, { recursive: true, force: true }); } catch (e) { /* 留之无碍 */ } }
    return done;
  } catch (e) {
    state.maintenance = { on: false, text: '', since: null };
    state.update = null;
    broadcast({ type: 'maintenance', on: false, text: '' });
    logUpdate({ act: 'update-failed', error: e.message });
    throw e;
  }
}

/* ————— 接口 ————— */
async function api(req, res, url) {
  const p = url.pathname;

  /* 公开接口：健康、版本、事件流 */
  if (p === '/api/health' && req.method === 'GET') {
    json(res, 200, {
      ok: true, channel: 'release', app: '代汉涂高', version: versionNow(),
      maintenance: state.maintenance, updating: !!state.update,
      accounts: Object.keys(store.users).length, time: Date.now()
    });
    return;
  }
  if (p === '/api/version' && req.method === 'GET') {
    json(res, 200, {
      ok: true, channel: 'release', version: versionNow(),
      preview: 'https://liveldy.github.io/daihan-tugao/',
      maintenance: state.maintenance, updating: state.update ? { phase: state.update.phase } : null
    });
    return;
  }
  if (p === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store', 'Connection': 'keep-alive'
    });
    res.write('retry: 5000\n\n');
    res.write('data: ' + JSON.stringify({ type: 'hello', version: versionNow(), maintenance: state.maintenance }) + '\n\n');
    state.sse.add(res);
    req.on('close', () => state.sse.delete(res));
    return;
  }

  /* 维护之中：除管理员与上述公开接口外，一律谢绝（拒新登录，不夺在线者之局） */
  if (state.maintenance.on && !isAdmin(req) && !(p === '/api/health' || p === '/api/version' || p === '/api/events')) {
    json(res, 503, { ok: false, maintenance: true, msg: state.maintenance.text || '维护之中，请稍后。' });
    return;
  }

  /* 账号 */
  if (p === '/api/register' && req.method === 'POST') {
    const b = await readBody(req);
    const r = store.register(b.user, b.pass, { admin: !store.hasAdmin() });   // 首位注册者掌管理之权
    if (!r.ok) { json(res, 400, r); return; }
    const token = store.issue(r.user.name);
    json(res, 200, { ok: true, user: r.user, token: token, first: r.user.admin });
    return;
  }
  if (p === '/api/login' && req.method === 'POST') {
    const b = await readBody(req);
    const r = store.login(b.user, b.pass);
    if (!r.ok) { json(res, 401, r); return; }
    json(res, 200, { ok: true, user: r.user, token: r.token });
    return;
  }

  /* 以下须凭账号令牌；管理诸接口自验管理员令牌，不假会话 */
  let sess = null;
  if (p.indexOf('/api/admin/') !== 0) {
    sess = store.verify(bearer(req));
    if (!sess) { json(res, 401, { ok: false, msg: '未登录或令牌已失效' }); return; }
  }

  if (p === '/api/session' && req.method === 'GET') {
    const sv = store.getSave(sess.user);
    json(res, 200, {
      ok: true, user: { name: sess.user, admin: sess.admin },
      version: versionNow(), save: sv ? { rev: sv.rev, savedAt: sv.savedAt, version: sv.version } : null
    });
    return;
  }
  if (p === '/api/logout' && req.method === 'POST') {
    store.revoke(bearer(req));
    json(res, 200, { ok: true });
    return;
  }
  if (p === '/api/save' && req.method === 'GET') {
    const sv = store.getSave(sess.user);
    json(res, 200, sv ? { ok: true, save: sv } : { ok: false, msg: '尚无云存档' });
    return;
  }
  if (p === '/api/save' && req.method === 'POST') {
    const b = await readBody(req, 4 * 1024 * 1024);
    if (!b || !b.data || typeof b.data !== 'object') { json(res, 400, { ok: false, msg: '存档内容不合' }); return; }
    const prev = store.getSave(sess.user);
    const sv = store.putSave(sess.user, b.data, versionNow());
    json(res, 200, { ok: true, rev: sv.rev, savedAt: sv.savedAt, prevAt: prev ? prev.savedAt : null });
    return;
  }

  /* 管理 */
  if (p.indexOf('/api/admin/') === 0) {
    if (!isAdmin(req)) { json(res, 403, { ok: false, msg: '须管理员令牌' }); return; }
    if (p === '/api/admin/status' && req.method === 'GET') {
      json(res, 200, {
        ok: true, version: versionNow(), fileRoot: state.fileRoot, dataDir: DATA_DIR,
        maintenance: state.maintenance, update: state.update, lastUpdate: state.lastUpdate,
        online: store.active(DRAIN_IDLE).length, sessions: Object.keys(store.tokens).length,
        accounts: Object.keys(store.users).length,
        drain: { idleMs: DRAIN_IDLE, timeoutMs: DRAIN_TIMEOUT },
        startedAt: state.startedAt, uptime: Date.now() - state.startedAt
      });
      return;
    }
    if (p === '/api/admin/check' && (req.method === 'GET' || req.method === 'POST')) {
      const b = req.method === 'POST' ? await readBody(req) : {};
      const src = url.searchParams.get('dir') ? { dir: url.searchParams.get('dir') } : (b.source || {});
      const chk = await checkUpdate(src);
      json(res, chk.plan.ok ? 200 : 400, { ok: chk.plan.ok, plan: chk.plan });
      return;
    }
    if (p === '/api/admin/update' && req.method === 'POST') {
      if (state.update) { json(res, 409, { ok: false, msg: '已在更新之中', update: state.update }); return; }
      const b = await readBody(req);
      const src = b.source || (url.searchParams.get('dir') ? { dir: url.searchParams.get('dir') } : null);
      if (!src) { json(res, 400, { ok: false, msg: '须指明新版之源（source.dir 或 source.git）' }); return; }
      const wait = url.searchParams.get('wait') === '1';
      if (!wait) {
        runUpdate(src).catch(() => { /* 已记入 update.log */ });
        json(res, 202, { ok: true, started: true, status: '/api/admin/status' });
        return;
      }
      try {
        const done = await runUpdate(src);
        json(res, 200, done);
      } catch (e) { json(res, 500, { ok: false, msg: e.message }); }
      return;
    }
    if (p === '/api/admin/maintenance' && req.method === 'POST') {
      const b = await readBody(req);
      state.maintenance = { on: !!b.on, text: b.text || '', since: b.on ? Date.now() : null };
      broadcast({ type: 'maintenance', on: state.maintenance.on, text: state.maintenance.text });
      json(res, 200, { ok: true, maintenance: state.maintenance });
      return;
    }
    if (p === '/api/admin/rollback' && req.method === 'POST') {
      try {
        const r = upd.rollback(state.fileRoot);
        state.maintenance = { on: false, text: '', since: null };
        logUpdate({ act: 'rollback', to: r.version });
        json(res, 200, { ok: true, version: r.version });
      } catch (e) { json(res, 500, { ok: false, msg: e.message }); }
      return;
    }
    json(res, 404, { ok: false, msg: '无此管理接口' });
    return;
  }

  json(res, 404, { ok: false, msg: '无此接口' });
}

const server = http.createServer((req, res) => {
  let url;
  try { url = new URL(req.url, 'http://localhost'); } catch (e) { json(res, 400, { ok: false }); return; }
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (url.pathname.indexOf('/api/') === 0) {
    api(req, res, url).catch(e => { try { json(res, 500, { ok: false, msg: e.message }); } catch (e2) { /* 头已发 */ } });
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') { json(res, 405, { ok: false, msg: '只受理 GET' }); return; }
  serveStatic(req, res, url.pathname);
});

setInterval(() => { store.prune(SESSION_MAX_AGE); }, 3600 * 1000).unref();

server.listen(PORT, HOST, () => {
  store.prune(SESSION_MAX_AGE);
  console.log('代汉涂高 · 正式版');
  console.log('  监听　：http://' + HOST + ':' + PORT + '/');
  console.log('  站目录：' + state.fileRoot + '（版本 ' + versionNow() + '）');
  console.log('  数据　：' + DATA_DIR);
  console.log('  管理员：' + (ARG['admin-token'] || process.env.DAIHAN_ADMIN_TOKEN ? '取自命令行或环境' : ADMIN_FILE) +
    '（令牌以 x-admin-token 头发送，切勿外泄）');
  console.log('  预览版：https://liveldy.github.io/daihan-tugao/（无账号，唯静态）');
});

process.on('SIGINT', () => { console.log('\n已停机'); server.close(() => process.exit(0)); });
process.on('SIGTERM', () => { server.close(() => process.exit(0)); });

module.exports = server;
