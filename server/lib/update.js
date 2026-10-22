/* 《代汉涂高》正式版 — 在线更新
 * 更新之序（须由管理员手动触发）：
 *   一、检查：比对新版之版本号与必需之文件，列其增删（preview）
 *   二、暂存：新版先入暂存目录，校验通过方可用
 *   三、冻结：广播维护公告，拒新登录
 *   四、待客：待在线会话自然结束（逾时则强制）
 *   五、替换：旧站目录更名留档，暂存目录就其位（原子改名，无半新半旧之患）
 * 只依赖 Node 内建模块；git 为可选（自 Git 仓库拉取新版时用之）。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const VERSION_RE = /^\d+\.\d+\.\d+\.\d+$/;
/* 一版网站至少须有者 */
const REQUIRED = ['index.html', 'VERSION', 'src/main.js', 'src/data/version.js'];
/* 不入站目录者 */
const EXCLUDE = ['.git', 'node_modules', 'server', 'shots', '.adelie', 'data'];

function readVersion(dir) {
  const p = path.join(dir, 'VERSION');
  if (!fs.existsSync(p)) { return null; }
  const v = fs.readFileSync(p, 'utf8').trim();
  return VERSION_RE.test(v) ? v : null;
}

function skip(rel) {
  const top = rel.split(/[\\/]/)[0];
  return EXCLUDE.indexOf(top) >= 0;
}

/* 递归列出站目录中的文件（相对路径，/ 分隔），略去不入站者 */
function listFiles(dir, base, out) {
  base = base || dir;
  out = out || [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  entries.forEach(en => {
    const full = path.join(dir, en.name);
    const rel = path.relative(base, full).split(path.sep).join('/');
    if (skip(rel)) { return; }
    if (en.isDirectory()) { listFiles(full, base, out); }
    else if (en.isFile()) { out.push(rel); }
  });
  return out.sort();
}

function sha1(file) {
  return crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
}

/* 检查：新版之版本、必需文件、与旧站之异同（不写盘） */
function plan(srcDir, webRoot) {
  const out = { ok: false, src: srcDir, webRoot: webRoot, errors: [], added: [], changed: [], removed: [], files: 0, bytes: 0 };
  if (!srcDir || !fs.existsSync(srcDir)) { out.errors.push('新版目录不存在：' + srcDir); return out; }
  const version = readVersion(srcDir);
  if (!version) { out.errors.push('新版缺 VERSION 或版本号不合四段之式'); }
  out.version = version;
  out.current = webRoot && fs.existsSync(webRoot) ? readVersion(webRoot) : null;
  REQUIRED.forEach(f => {
    if (!fs.existsSync(path.join(srcDir, f))) { out.errors.push('新版缺必需之文件：' + f); }
  });
  if (out.errors.length) { return out; }

  const news = listFiles(srcDir);
  const olds = webRoot && fs.existsSync(webRoot) ? listFiles(webRoot) : [];
  const oldSet = new Set(olds);
  news.forEach(rel => {
    const s = path.join(srcDir, rel), d = path.join(webRoot, rel);
    out.files++;
    out.bytes += fs.statSync(s).size;
    if (!oldSet.has(rel)) { out.added.push(rel); return; }
    if (sha1(s) !== sha1(d)) { out.changed.push(rel); }
  });
  const newSet = new Set(news);
  olds.forEach(rel => { if (!newSet.has(rel)) { out.removed.push(rel); } });
  out.ok = true;
  out.same = out.added.length === 0 && out.changed.length === 0 && out.removed.length === 0;
  return out;
}

/* 暂存：把新版复制入暂存目录（清空其旧内容） */
function stage(srcDir, stageDir) {
  if (fs.existsSync(stageDir)) { fs.rmSync(stageDir, { recursive: true, force: true }); }
  fs.mkdirSync(stageDir, { recursive: true });
  const files = listFiles(srcDir);
  files.forEach(rel => {
    const dst = path.join(stageDir, rel);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(path.join(srcDir, rel), dst);
  });
  const v = readVersion(stageDir);
  if (!v) { throw new Error('暂存之后版本号不可读'); }
  REQUIRED.forEach(f => { if (!fs.existsSync(path.join(stageDir, f))) { throw new Error('暂存之后缺 ' + f); } });
  return { files: files.length, version: v };
}

/* abs 在 webRoot 之内的相对之径（/ 分隔）；不在其内者返回 null */
function relInside(webRoot, abs) {
  if (!abs) { return null; }
  const root = path.resolve(webRoot);
  const rel = path.relative(root, path.resolve(abs));
  if (!rel || rel === '.') { return null; }
  if (path.isAbsolute(rel) || rel.split(path.sep)[0] === '..') { return null; }
  return rel.split(path.sep).join('/');
}

/* 须保全之目：服务端目录（EXCLUDE 使之恒不入暂存）＋调用者所指定者（如数据目录） */
function keepsOf(webRoot, opts) {
  const keeps = ['server'];
  ((opts && opts.keep) || []).forEach(p => {
    const rel = relInside(webRoot, p);
    if (rel) { keeps.push(rel); }         // 不在站目录之内者无须保全
  });
  return keeps;
}

/* 归位：把 prevDir 之 rel 搬回 newDir 之原位。
 * 先短后长（父先子后），故 server 与 server/data 之类重叠者不致二次改名；
 * 新站已有者以现有者为准，不覆盖。 */
function relocate(prevDir, newDir, rels) {
  const uniq = [];
  rels.forEach(r => { if (r && uniq.indexOf(r) < 0) { uniq.push(r); } });
  uniq.sort((a, b) => (a.split('/').length - b.split('/').length) || (a < b ? -1 : a > b ? 1 : 0));
  const kept = [], skipped = [];
  uniq.forEach(rel => {
    const src = path.join(prevDir, rel), dst = path.join(newDir, rel);
    if (fs.existsSync(dst)) { skipped.push(rel); return; }
    if (!fs.existsSync(src)) { return; }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.renameSync(src, dst);
    kept.push(rel);
  });
  return { kept: kept, skipped: skipped };
}

/* 替换：旧站更名留档，暂存就其位（各为一次改名，故无半新半旧之态）；
 * opts.keep 为须保全之绝对路径（如数据目录），另自动保全站目录中的 server/。
 * 暂存目录若落在站目录之内（数据目录在站目录之内时即是），先移出再改名，
 * 否则随站目录改名而失其旧路径，替换之举必败。 */
function apply(stageDir, webRoot, opts) {
  const backup = webRoot + '.prev';
  if (!fs.existsSync(stageDir)) { throw new Error('暂存目录不存在：' + stageDir); }
  const keeps = keepsOf(webRoot, opts);

  let stage = stageDir, stageMoved = null;
  if (relInside(webRoot, stageDir)) {
    stageMoved = webRoot + '.incoming';
    if (fs.existsSync(stageMoved)) { fs.rmSync(stageMoved, { recursive: true, force: true }); }
    fs.renameSync(stageDir, stageMoved);
    stage = stageMoved;
  }

  if (fs.existsSync(backup)) { fs.rmSync(backup, { recursive: true, force: true }); }
  const had = fs.existsSync(webRoot);
  if (had) { fs.renameSync(webRoot, backup); }
  try {
    fs.renameSync(stage, webRoot);
  } catch (e) {
    if (had) { try { fs.renameSync(backup, webRoot); } catch (e2) { /* 留档犹在，可手动复原 */ } }
    if (stageMoved && !fs.existsSync(stageDir)) { try { fs.renameSync(stageMoved, stageDir); } catch (e2) { /* 暂存犹在，可手动取回 */ } }
    throw e;
  }
  const kept = had ? relocate(backup, webRoot, keeps) : { kept: [], skipped: [] };
  return {
    backup: had ? backup : null, version: readVersion(webRoot),
    kept: kept.kept, skipped: kept.skipped, stageMoved: !!stageMoved
  };
}

/* 回滚：以留档复原旧站；opts 同 apply，故数据目录与服务端目录亦归原位 */
function rollback(webRoot, opts) {
  const backup = webRoot + '.prev';
  if (!fs.existsSync(backup)) { throw new Error('无留档可回滚：' + backup); }
  const keeps = keepsOf(webRoot, opts);
  const bad = webRoot + '.bad';
  if (fs.existsSync(bad)) { fs.rmSync(bad, { recursive: true, force: true }); }
  const had = fs.existsSync(webRoot);
  if (had) { fs.renameSync(webRoot, bad); }
  try {
    fs.renameSync(backup, webRoot);
  } catch (e) {
    if (had) { try { fs.renameSync(bad, webRoot); } catch (e2) { /* 留档犹在，可手动复原 */ } }
    throw e;
  }
  /* 新站中被搬走者（更新时所保全者）从 .bad 归位，免其随回滚而失 */
  const kept = had ? relocate(bad, webRoot, keeps) : { kept: [], skipped: [] };
  return {
    version: readVersion(webRoot), bad: fs.existsSync(bad) ? bad : null,
    kept: kept.kept, skipped: kept.skipped
  };
}

/* 自 Git 仓库取新版入暂存目录（须本机有 git）。repo 可为 URL 或本地路径 */
function gitExport(repo, ref, destDir) {
  if (fs.existsSync(destDir)) { fs.rmSync(destDir, { recursive: true, force: true }); }
  fs.mkdirSync(path.dirname(destDir), { recursive: true });
  const args = ['clone', '--depth', '1', '--branch', ref || 'main', '--single-branch', repo, destDir];
  try {
    execFileSync('git', args, { stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    const msg = (e.stderr ? e.stderr.toString() : '') + (e.stdout ? e.stdout.toString() : '') + (e.message || '');
    throw new Error('自 Git 取新版失败：' + msg.trim().split('\n').slice(-3).join(' | '));
  }
  return { dir: destDir, version: readVersion(destDir) };
}

module.exports = { plan, stage, apply, rollback, gitExport, listFiles, readVersion, relInside, REQUIRED, VERSION_RE };
