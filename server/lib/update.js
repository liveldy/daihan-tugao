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

/* 替换：旧站更名留档，暂存就其位（各为一次改名，故无半新半旧之态） */
function apply(stageDir, webRoot) {
  const backup = webRoot + '.prev';
  if (!fs.existsSync(stageDir)) { throw new Error('暂存目录不存在：' + stageDir); }
  if (fs.existsSync(backup)) { fs.rmSync(backup, { recursive: true, force: true }); }
  const had = fs.existsSync(webRoot);
  if (had) { fs.renameSync(webRoot, backup); }
  try {
    fs.renameSync(stageDir, webRoot);
  } catch (e) {
    if (had) { try { fs.renameSync(backup, webRoot); } catch (e2) { /* 留档犹在，可手动复原 */ } }
    throw e;
  }
  return { backup: had ? backup : null, version: readVersion(webRoot) };
}

/* 回滚：以留档复原旧站 */
function rollback(webRoot) {
  const backup = webRoot + '.prev';
  if (!fs.existsSync(backup)) { throw new Error('无留档可回滚：' + backup); }
  const bad = webRoot + '.bad';
  if (fs.existsSync(bad)) { fs.rmSync(bad, { recursive: true, force: true }); }
  if (fs.existsSync(webRoot)) { fs.renameSync(webRoot, bad); }
  fs.renameSync(backup, webRoot);
  return { version: readVersion(webRoot), bad: fs.existsSync(bad) ? bad : null };
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

module.exports = { plan, stage, apply, rollback, gitExport, listFiles, readVersion, REQUIRED, VERSION_RE };
