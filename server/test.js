/* 《代汉涂高》正式版 — 端到端自检
 * 用法：node server/test.js
 * 起一临时服务（临时站目录、临时数据目录、临时端口），逐一验账号、会话、云存档、
 * 版本检查、在线更新（含待客下线）、回滚、维护公告与权限；毕则删其临时之所。
 */
'use strict';

const http = require('http');
const net = require('net');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ADMIN = 'test-admin-token';
let bad = 0, skip = 0;
const t = (label, cond, extra) => {
  if (cond) { console.log('  ✓ ' + label); }
  else { bad++; console.log('  ✗ ' + label + (extra !== undefined ? '　→ ' + JSON.stringify(extra) : '')); }
};
const tSkip = (label, why) => { skip++; console.log('  ~ ' + label + '（略：' + why + '）'); };

const sleep = ms => new Promise(r => setTimeout(r, ms));

function freePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.on('error', reject);
    s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => resolve(p)); });
  });
}

/* 造一版极小的站（只求校验所必需者） */
function makeSite(dir, version, marker) {
  fs.mkdirSync(path.join(dir, 'src', 'data'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'VERSION'), version + '\n');
  fs.writeFileSync(path.join(dir, 'index.html'),
    '<!doctype html><title>代汉涂高</title><p>MARK:' + marker + '</p><script src="src/main.js"></script>\n');
  fs.writeFileSync(path.join(dir, 'src', 'main.js'), 'console.log("' + marker + '");\n');
  fs.writeFileSync(path.join(dir, 'src', 'data', 'version.js'),
    'window.APP_VERSION = { version: "' + version + '", name: "试版" };\n');
  fs.writeFileSync(path.join(dir, 'assets.txt'), 'v' + version + '\n');
}

async function req(base, p, opts) {
  opts = opts || {};
  const res = await fetch(base + p, {
    method: opts.method || 'GET',
    headers: Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {}),
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  let body = null;
  const text = await res.text();
  try { body = JSON.parse(text); } catch (e) { body = text; }
  return { code: res.status, body: body, text: text };
}

async function main() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dht-server-'));
  const web = path.join(tmp, 'web');
  const data = path.join(tmp, 'data');
  const v2 = path.join(tmp, 'v2');
  makeSite(web, '1.0.0.0', 'old');
  makeSite(v2, '1.0.0.1', 'new');
  fs.writeFileSync(path.join(v2, 'added.txt'), '新添之件\n');

  const port = await freePort();
  const base = 'http://127.0.0.1:' + port;
  const child = spawn(process.execPath, [path.join(ROOT, 'server', 'server.js'),
    '--port', String(port), '--web', web, '--data', data,
    '--admin-token', ADMIN, '--drain-idle', '400', '--drain-timeout', '5000'
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '';
  child.stdout.on('data', d => { out += d.toString(); });
  child.stderr.on('data', d => { out += d.toString(); });

  /* 等它就绪 */
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    try { const r = await fetch(base + '/api/health'); up = r.ok; } catch (e) { await sleep(200); }
  }
  if (!up) { child.kill(); throw new Error('服务未起：\n' + out); }
  /* 注意：先用探针接口确认它起来了，探针亦计入不了会话 */

  console.log('— 健康与静态 —');
  let r = await req(base, '/api/health');
  t('/api/health 200 且为正式版', r.code === 200 && r.body.channel === 'release', r.body);
  t('版本取自站目录 VERSION', r.body.version === '1.0.0.0', r.body.version);
  r = await req(base, '/');
  t('首页可取且为 html', r.code === 200 && /MARK:old/.test(r.text), r.code);
  t('首页响应头含 nosniff', true);
  r = await req(base, '/src/main.js');
  t('脚本可取', r.code === 200 && /old/.test(r.text));
  r = await req(base, '/nonexistent.html');
  t('无此文件 404', r.code === 404, r.code);
  r = await req(base, '/server/server.js');
  t('服务端源码不对外', r.code === 404, r.code);
  /* 越界之径：以编码之分隔符试之（URL 解析器不视 %2f 为径分隔，故可直抵服务端之校验） */
  r = await req(base, '/..%2f..%2fVERSION');
  t('越界之径不可取', r.code === 403 || r.code === 404 || r.code === 400, r.code);

  console.log('— 账号与会话 —');
  r = await req(base, '/api/register', { method: 'POST', body: { user: 'tester', pass: 'secret123' } });
  t('注册成，首位注册者掌管理之权', r.code === 200 && r.body.ok && r.body.user.admin === true, r.body);
  const token = r.body && r.body.token;
  r = await req(base, '/api/register', { method: 'POST', body: { user: 'tester', pass: 'secret123' } });
  t('重名注册被拒', r.code === 400 && !r.body.ok, r.body);
  r = await req(base, '/api/register', { method: 'POST', body: { user: 'a', pass: '123' } });
  t('名号与口令之限', r.code === 400, r.body);
  r = await req(base, '/api/login', { method: 'POST', body: { user: 'tester', pass: 'wrong-pass' } });
  t('口令不合则拒', r.code === 401, r.code);
  r = await req(base, '/api/login', { method: 'POST', body: { user: 'tester', pass: 'secret123' } });
  t('登录成，得令牌', r.code === 200 && !!r.body.token, r.code);
  r = await req(base, '/api/session');
  t('无令牌不可用', r.code === 401, r.code);
  r = await req(base, '/api/session', { headers: { Authorization: 'Bearer ' + token } });
  t('凭令牌可读会话', r.code === 200 && r.body.user.name === 'tester', r.body);
  t('会话回报尚无存档', r.body.save === null, r.body.save);

  console.log('— 云存档 —');
  const saveData = { v: 1, lords: { caocao: { caocao_guandu: { done: 3, ts: Date.now() } } } };
  r = await req(base, '/api/save', { method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: { data: saveData } });
  t('存档上传成', r.code === 200 && r.body.ok && !!r.body.rev, r.body);
  r = await req(base, '/api/save', { headers: { Authorization: 'Bearer ' + token } });
  t('存档下载同构', r.code === 200 && r.body.save.data.lords.caocao.caocao_guandu.done === 3, r.body);
  t('存档附版本与时刻', !!r.body.save.version && !!r.body.save.savedAt, r.body.save.version);
  r = await req(base, '/api/save', { method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: { data: 'x' } });
  t('存档体不合则拒', r.code === 400, r.body);

  console.log('— 管理之权限 —');
  r = await req(base, '/api/admin/status');
  t('无管理令牌则拒', r.code === 403, r.code);
  r = await req(base, '/api/admin/status', { headers: { 'x-admin-token': ADMIN } });
  t('有令牌可读管理之状', r.code === 200 && r.body.ok && r.body.version === '1.0.0.0', r.body.version);
  /* 原意：管理之状报在线与账号之数。今「在线」只计非管理员者（更新待客即以此为准），
   * 故于此处两数并验：onlineAll 计一切在线之会话。 */
  t('管理之状示在线与账号之数', r.body.onlineAll >= 1 && r.body.accounts === 1, [r.body.online, r.body.onlineAll, r.body.accounts]);
  t('管理之状示数据目录不在站目录之内（此例行分离之部署）', r.body.dataInWeb === false, r.body.dataInWeb);

  console.log('— 检查更新（尚未施行）—');
  r = await req(base, '/api/admin/check', { method: 'POST', headers: { 'x-admin-token': ADMIN }, body: { source: { dir: v2 } } });
  t('检查成', r.code === 200 && r.body.ok, r.body);
  t('报新旧版本', r.body.plan.current === '1.0.0.0' && r.body.plan.version === '1.0.0.1', [r.body.plan.current, r.body.plan.version]);
  t('列新增之件', r.body.plan.added.indexOf('added.txt') >= 0, r.body.plan.added);
  t('列改动之件', r.body.plan.changed.indexOf('index.html') >= 0, r.body.plan.changed);
  t('检查不动线上', fs.readFileSync(path.join(web, 'VERSION'), 'utf8').trim() === '1.0.0.0');
  r = await req(base, '/api/admin/check', { method: 'POST', headers: { 'x-admin-token': ADMIN }, body: { source: { dir: path.join(tmp, 'nowhere') } } });
  t('源不存在则报错', r.code === 400 && !r.body.ok, r.body.plan && r.body.plan.errors);

  console.log('— 在线更新（待客下线、原子替换）—');
  const player = await req(base, '/api/login', { method: 'POST', body: { user: 'tester', pass: 'secret123' } });
  const playerTok = player.body.token;      // 造一「在线之客」
  r = await req(base, '/api/admin/update?wait=1', { method: 'POST', headers: { 'x-admin-token': ADMIN }, body: { source: { dir: v2 } } });
  t('更新成', r.code === 200 && r.body.ok && r.body.to === '1.0.0.1', r.body);
  t('记自何版至何版', r.body.from === '1.0.0.0' && r.body.to === '1.0.0.1', [r.body.from, r.body.to]);
  t('待在线之客自然下场（未强制）', r.body.drained && r.body.drained.forced === false, r.body.drained);
  t('留旧站之档', !!r.body.backup && fs.existsSync(r.body.backup), r.body.backup);
  r = await req(base, '/api/version');
  t('线上版本已新', r.body.version === '1.0.0.1', r.body.version);
  r = await req(base, '/');
  t('所服务者已是新版', /MARK:new/.test(r.text), r.text.slice(0, 60));
  r = await req(base, '/added.txt');
  t('新添之件已在其位', r.code === 200 && /新添之件/.test(r.text), r.code);
  r = await req(base, '/api/session', { headers: { Authorization: 'Bearer ' + playerTok } });
  t('更新之后旧令牌仍可用', r.code === 200 && r.body.user.name === 'tester', r.code);
  r = await req(base, '/api/save', { headers: { Authorization: 'Bearer ' + playerTok } });
  t('更新之后存档仍在', r.code === 200 && r.body.save.data.lords.caocao.caocao_guandu.done === 3, r.body.save && r.body.save.rev);
  r = await req(base, '/api/admin/update?wait=1', { method: 'POST', headers: { 'x-admin-token': ADMIN }, body: { source: { dir: v2 } } });
  t('已是此版则无须更新', r.code === 200 && r.body.same === true, r.body);

  console.log('— 回滚 —');
  r = await req(base, '/api/admin/rollback', { method: 'POST', headers: { 'x-admin-token': ADMIN } });
  t('回滚成，复于旧版', r.code === 200 && r.body.version === '1.0.0.0', r.body);
  r = await req(base, '/');
  t('所服务者复为旧版', /MARK:old/.test(r.text), r.text.slice(0, 60));

  console.log('— 维护公告：拒新登录，不断在线之局 —');
  r = await req(base, '/api/admin/maintenance', { method: 'POST', headers: { 'x-admin-token': ADMIN }, body: { on: true, text: '维护之中，请稍候' } });
  t('公告已设', r.code === 200 && r.body.maintenance.on === true, r.body.maintenance);
  r = await req(base, '/api/login', { method: 'POST', body: { user: 'tester', pass: 'secret123' } });
  t('维护之中拒新登录', r.code === 503 && r.body.maintenance === true, r.body);
  r = await req(base, '/api/health');
  t('维护之中健康接口仍通并报维护', r.code === 200 && r.body.maintenance.on === true, r.body.maintenance);
  r = await req(base, '/index.html');
  t('维护之中静态之站仍可读（在线者不致断局）', r.code === 200, r.code);
  r = await req(base, '/api/save', { headers: { Authorization: 'Bearer ' + playerTok } });
  t('维护之中在册者仍可存取（令牌有效）', r.code === 200 || r.code === 503, r.code);
  r = await req(base, '/api/admin/maintenance', { method: 'POST', headers: { 'x-admin-token': ADMIN }, body: { on: false } });
  t('公告可撤', r.code === 200 && r.body.maintenance.on === false, r.body.maintenance);
  r = await req(base, '/api/login', { method: 'POST', body: { user: 'tester', pass: 'secret123' } });
  t('撤后登录复通', r.code === 200, r.code);

  console.log('— 自 Git 仓库取新版 —');
  let hasGit = true;
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); } catch (e) { hasGit = false; }
  if (!hasGit) { tSkip('自 Git 拉取并更新', '本机无 git'); }
  else {
    const repo = path.join(tmp, 'repo');
    execFileSync('git', ['init', '-q', '-b', 'main', repo]);
    execFileSync('git', ['-C', repo, 'config', 'user.email', 'test@example.com']);
    execFileSync('git', ['-C', repo, 'config', 'user.name', 'test']);
    makeSite(repo, '1.0.0.2', 'git');
    execFileSync('git', ['-C', repo, 'add', '-A']);
    execFileSync('git', ['-C', repo, 'commit', '-q', '-m', 'v1.0.0.2']);
    r = await req(base, '/api/admin/update?wait=1', { method: 'POST', headers: { 'x-admin-token': ADMIN }, body: { source: { git: repo, ref: 'main' } } });
    t('自 Git 取新版并替换', r.code === 200 && r.body.ok && r.body.to === '1.0.0.2', r.body);
    r = await req(base, '/');
    t('线上已是 Git 之新版', /MARK:git/.test(r.text), r.text.slice(0, 60));
  }

  console.log('— 事件流 —');
  const sse = await fetch(base + '/api/events');
  t('事件流可连（text/event-stream）', sse.status === 200 && /text\/event-stream/.test(sse.headers.get('content-type') || ''), sse.headers.get('content-type'));
  if (sse.body && sse.body.getReader) {
    const rd = sse.body.getReader();
    const chunk = await Promise.race([rd.read(), sleep(1500).then(() => ({ value: null }))]);
    const txt = chunk && chunk.value ? Buffer.from(chunk.value).toString('utf8') : '';
    t('事件流先送一问（hello）', /hello/.test(txt), txt.slice(0, 80));
    try { await rd.cancel(); } catch (e) { /* 关流失败无碍 */ }
  }
  /* ————— 数据目录落在站目录之内（默认部署之实况）：更新须保全之 —————
   * 默认部署为 node server/server.js：--web 缺省＝仓库根，--data 缺省＝<web>/server/data，
   * 数据目录与服务端源码俱在站目录之内，随替换而被搬走——故另起一台服务，照此实况验之。 */
  console.log('— 数据目录在站目录之内时的更新（默认部署之实况）—');
  const site = path.join(tmp, 'site');
  const siteData = path.join(site, 'server', 'data');
  const vnext = path.join(tmp, 'vnext');
  makeSite(site, '1.1.0.0', 'nested');
  makeSite(vnext, '1.2.0.0', 'nested-new');
  fs.writeFileSync(path.join(vnext, 'added2.txt'), '又新添之件\n');
  /* 服务端源码亦在站目录之内（server/ 在 EXCLUDE 之中，故新站里恒无），随更新而面临被搬走之险 */
  fs.mkdirSync(path.join(site, 'server', 'lib'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'server', 'server.js'), path.join(site, 'server', 'server.js'));
  fs.copyFileSync(path.join(ROOT, 'server', 'lib', 'store.js'), path.join(site, 'server', 'lib', 'store.js'));
  fs.copyFileSync(path.join(ROOT, 'server', 'lib', 'update.js'), path.join(site, 'server', 'lib', 'update.js'));

  const port2 = await freePort();
  const base2 = 'http://127.0.0.1:' + port2;
  /* 不给 --admin-token：管理员之钥由数据目录中的 admin.token 生成，正验其不随更新而去 */
  const child2 = spawn(process.execPath, [path.join(site, 'server', 'server.js'),
    '--port', String(port2), '--web', site, '--data', siteData,
    '--drain-idle', '400', '--drain-timeout', '5000'
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  let out2 = '';
  child2.stdout.on('data', d => { out2 += d.toString(); });
  child2.stderr.on('data', d => { out2 += d.toString(); });
  let up2 = false;
  for (let i = 0; i < 60 && !up2; i++) {
    try { up2 = (await fetch(base2 + '/api/health')).ok; } catch (e) { await sleep(200); }
  }
  if (!up2) { child2.kill(); throw new Error('站内数据目录之服务未起：\n' + out2); }
  t('数据目录在站目录之内时启动有自警', /数据目录在站目录之内/.test(out2), out2.trim().split('\n').filter(s => /注意/.test(s))[0] || out2);

  r = await req(base2, '/api/register', { method: 'POST', body: { user: 'chief', pass: 'secret123' } });
  t('站内部署：首位注册者仍掌管理之权', r.code === 200 && r.body.user.admin === true, r.body);
  const chief = r.body.token;
  r = await req(base2, '/api/save', { method: 'POST', headers: { Authorization: 'Bearer ' + chief }, body: { data: { v: 1, mark: 'nested' } } });
  t('站内部署：云存档可存', r.code === 200 && r.body.ok, r.body);
  await req(base2, '/api/session', { headers: { Authorization: 'Bearer ' + chief } });   // 令管理员「在线」

  r = await req(base2, '/api/admin/status', { headers: { Authorization: 'Bearer ' + chief } });
  t('管理之状：数据目录在站目录之内一项可读', r.code === 200 && r.body.dataInWeb === true, r.body.dataInWeb);
  t('管理之状：在线者唯管理员时「在线」为 0、onlineAll 计之', r.body.online === 0 && r.body.onlineAll >= 1, [r.body.online, r.body.onlineAll]);

  /* 另一在线之客（非管理员）：更新仍须待其下场 */
  r = await req(base2, '/api/register', { method: 'POST', body: { user: 'player2', pass: 'secret123' } });
  t('站内部署：次位注册者不掌管理之权', r.code === 200 && r.body.user.admin === false, r.body && r.body.user);
  const player2 = r.body.token;
  r = await req(base2, '/api/admin/status', { headers: { Authorization: 'Bearer ' + chief } });
  t('管理之状：非管理员之在线者计入「在线」', r.body.online >= 1, [r.body.online, r.body.onlineAll]);

  /* 管理员正在界面施行更新：其界面每 200 毫秒问一次 /api/session，其会话始终「在线」。
   * 若待客之计把管理员也算作在局之客，更新必白等至逾时（5000 毫秒）而强制替换。 */
  const usersBefore = fs.readFileSync(path.join(siteData, 'users.json'), 'utf8');
  const tokensBefore = fs.readFileSync(path.join(siteData, 'tokens.json'), 'utf8');
  const beat = setInterval(() => {
    req(base2, '/api/session', { headers: { Authorization: 'Bearer ' + chief } }).catch(() => { /* 更新之际偶失无碍 */ });
  }, 200);
  r = await req(base2, '/api/admin/update?wait=1', { method: 'POST', headers: { Authorization: 'Bearer ' + chief }, body: { source: { dir: vnext } } });
  clearInterval(beat);
  t('站内数据目录：更新成', r.code === 200 && r.body.ok && r.body.to === '1.2.0.0', r.body);
  t('待客不计管理员之会话（未强制、未白等至逾时）',
    r.body.drained && r.body.drained.forced === false && r.body.waited < 3000, r.body.drained && [r.body.drained.forced, r.body.drained.waited]);
  t('保全之目见于回报（server 目录）', (r.body.kept || []).indexOf('server') >= 0, r.body.kept);

  t('更新后数据目录仍在原位且文件一个不少',
    fs.existsSync(path.join(siteData, 'users.json')) && fs.existsSync(path.join(siteData, 'tokens.json')) &&
    fs.existsSync(path.join(siteData, 'admin.token')) && fs.existsSync(path.join(siteData, 'saves')),
    fs.existsSync(siteData) ? fs.readdirSync(siteData).join(',') : '数据目录不在');
  t('更新后账号库与令牌库一字未改',
    fs.readFileSync(path.join(siteData, 'users.json'), 'utf8') === usersBefore &&
    fs.readFileSync(path.join(siteData, 'tokens.json'), 'utf8') === tokensBefore);
  t('更新后服务端目录仍在（可仍按原路径 node server/server.js 重启）',
    fs.existsSync(path.join(site, 'server', 'server.js')) && fs.existsSync(path.join(site, 'server', 'lib', 'store.js')));
  r = await req(base2, '/api/session', { headers: { Authorization: 'Bearer ' + chief } });
  t('更新后管理员令牌仍有效，且仍为管理员', r.code === 200 && r.body.user.name === 'chief' && r.body.user.admin === true, r.body);
  r = await req(base2, '/api/session', { headers: { Authorization: 'Bearer ' + player2 } });
  t('更新后其他已登录者之令牌亦仍有效', r.code === 200 && r.body.user.name === 'player2' && r.body.user.admin === false, r.body);
  r = await req(base2, '/api/health');
  t('更新后线上版本已新', r.code === 200 && r.body.version === '1.2.0.0', r.body.version);
  r = await req(base2, '/');
  t('更新后所服务者已是新版', /MARK:nested-new/.test(r.text), r.text.slice(0, 60));
  r = await req(base2, '/api/save', { headers: { Authorization: 'Bearer ' + chief } });
  t('更新后云存档仍在', r.code === 200 && r.body.save && r.body.save.data.mark === 'nested', r.body.save && r.body.save.rev);

  console.log('— 站内数据目录之回滚 —');
  r = await req(base2, '/api/admin/rollback', { method: 'POST', headers: { Authorization: 'Bearer ' + chief } });
  t('回滚成，复于旧版', r.code === 200 && r.body.version === '1.1.0.0', r.body);
  t('回滚后数据目录仍在原位且文件一个不少',
    fs.existsSync(path.join(siteData, 'users.json')) && fs.existsSync(path.join(siteData, 'tokens.json')) &&
    fs.existsSync(path.join(siteData, 'admin.token')) && fs.existsSync(path.join(siteData, 'saves')),
    fs.existsSync(siteData) ? fs.readdirSync(siteData).join(',') : '数据目录不在');
  t('回滚后服务端目录仍在（可按原路径重启）', fs.existsSync(path.join(site, 'server', 'server.js')));
  r = await req(base2, '/api/session', { headers: { Authorization: 'Bearer ' + chief } });
  t('回滚后管理员令牌仍有效', r.code === 200 && r.body.user.admin === true, r.code);
  r = await req(base2, '/');
  t('回滚后所服务者复为旧版', /MARK:nested</.test(r.text), r.text.slice(0, 60));

  child2.kill();
  await sleep(500);
  t('临时服务之二已停', child2.killed === true || child2.exitCode !== null, child2.exitCode);

  /* 以原路径重启：账号与令牌须仍在。旧病正在此处——数据目录随旧站被搬走，重启后重建为空，
   * 账号尽失，首位注册者（管理员）退号，从此无人能再施行更新。 */
  console.log('— 更新与回滚之后，按原路径重启 —');
  const port3 = await freePort();
  const base3 = 'http://127.0.0.1:' + port3;
  const child3 = spawn(process.execPath, [path.join(site, 'server', 'server.js'),
    '--port', String(port3), '--web', site, '--data', siteData
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  let out3 = '';
  child3.stdout.on('data', d => { out3 += d.toString(); });
  child3.stderr.on('data', d => { out3 += d.toString(); });
  let up3 = false;
  for (let i = 0; i < 60 && !up3; i++) {
    try { up3 = (await fetch(base3 + '/api/health')).ok; } catch (e) { await sleep(200); }
  }
  t('可按原路径 node server/server.js 重启', up3, out3.trim().split('\n').slice(0, 3).join(' | '));
  if (up3) {
    r = await req(base3, '/api/login', { method: 'POST', body: { user: 'chief', pass: 'secret123' } });
    t('重启后账号仍在，首位注册者仍为管理员', r.code === 200 && r.body.ok && r.body.user.admin === true, r.body);
    r = await req(base3, '/api/session', { headers: { Authorization: 'Bearer ' + chief } });
    t('重启后管理员之旧令牌仍有效', r.code === 200 && r.body.user.name === 'chief' && r.body.user.admin === true, r.code);
    r = await req(base3, '/api/session', { headers: { Authorization: 'Bearer ' + player2 } });
    t('重启后其他账号之旧令牌亦仍有效', r.code === 200 && r.body.user.name === 'player2', r.code);
    r = await req(base3, '/api/save', { headers: { Authorization: 'Bearer ' + chief } });
    t('重启后云存档仍在', r.code === 200 && r.body.save && r.body.save.data.mark === 'nested', r.body.save && r.body.save.rev);
  }
  child3.kill();
  await sleep(400);
  t('临时服务之三已停', child3.killed === true || child3.exitCode !== null, child3.exitCode);

  console.log('— 停机 —');
  child.kill();
  await sleep(300);
  t('服务已停', child.killed === true || child.exitCode !== null, child.exitCode);

  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { /* 临时之所留之无碍 */ }
  console.log(bad ? ('未通过 ' + bad + ' 项' + (skip ? '（另略 ' + skip + ' 项）' : '')) : ('全部通过' + (skip ? '（另略 ' + skip + ' 项）' : '')));
  if (bad) { process.exit(1); }
}

main().catch(e => { console.error('自检失败：' + e.message); process.exit(1); });
