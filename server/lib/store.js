/* 《代汉涂高》正式版 — 账号与会话
 * 文件型存储（无外部依赖）：用户库、会话令牌、云存档。
 * 口令以 scrypt 加盐存其散列，绝不留明文；令牌亦是随机 32 字节。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };
const NAME_RE = /^[A-Za-z0-9_\u4e00-\u9fa5]{2,16}$/;

function Store(dataDir) {
  this.dir = dataDir;
  this.usersFile = path.join(dataDir, 'users.json');
  this.savesDir = path.join(dataDir, 'saves');
  this.tokensFile = path.join(dataDir, 'tokens.json');
  fs.mkdirSync(this.dir, { recursive: true });
  fs.mkdirSync(this.savesDir, { recursive: true });
  this.users = this._read(this.usersFile, {});
  this.tokens = this._read(this.tokensFile, {});
  this.dirty = false;
}

Store.prototype._read = function (file, dflt) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) || dflt; } catch (e) { return dflt; }
};

Store.prototype._write = function (file, obj) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), 'utf8');
  fs.renameSync(tmp, file);
};

Store.prototype.saveUsers = function () { this._write(this.usersFile, this.users); };
Store.prototype.saveTokens = function () { this._write(this.tokensFile, this.tokens); };

/* —— 口令 —— */
function hash(pass, salt) {
  return crypto.scryptSync(pass, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p }).toString('hex');
}

/* —— 账号 —— */
Store.prototype.register = function (name, pass, opts) {
  opts = opts || {};
  if (!NAME_RE.test(String(name || ''))) { return { ok: false, msg: '名号须为 2—16 字之中文、字母、数字或下划线' }; }
  if (String(pass || '').length < 6) { return { ok: false, msg: '口令不得少于六位' }; }
  const key = String(name).toLowerCase();
  if (this.users[key]) { return { ok: false, msg: '此名号已有主' }; }
  const salt = crypto.randomBytes(16).toString('hex');
  this.users[key] = {
    name: String(name), salt: salt, hash: hash(String(pass), salt),
    admin: !!opts.admin, createdAt: Date.now(), lastLogin: null
  };
  this.saveUsers();
  return { ok: true, user: this._public(this.users[key]) };
};

Store.prototype.login = function (name, pass) {
  const u = this.users[String(name || '').toLowerCase()];
  if (!u) { return { ok: false, msg: '无此名号' }; }
  const tryH = hash(String(pass || ''), u.salt);
  const a = Buffer.from(tryH, 'hex'), b = Buffer.from(u.hash, 'hex');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) { return { ok: false, msg: '口令不合' }; }
  u.lastLogin = Date.now();
  this.saveUsers();
  return { ok: true, user: this._public(u), token: this.issue(u.name) };
};

Store.prototype._public = function (u) {
  return { name: u.name, admin: !!u.admin, createdAt: u.createdAt, lastLogin: u.lastLogin };
};

Store.prototype.get = function (name) { return this.users[String(name || '').toLowerCase()] || null; };

Store.prototype.setAdmin = function (name, on) {
  const u = this.get(name);
  if (!u) { return { ok: false, msg: '无此名号' }; }
  u.admin = !!on;
  this.saveUsers();
  return { ok: true, user: this._public(u) };
};

Store.prototype.hasAdmin = function () {
  return Object.keys(this.users).some(k => this.users[k].admin);
};

/* —— 会话令牌 —— */
Store.prototype.issue = function (name) {
  const token = crypto.randomBytes(32).toString('hex');
  this.tokens[token] = { user: this.get(name).name, createdAt: Date.now(), lastSeen: Date.now() };
  this.saveTokens();
  return token;
};

Store.prototype.verify = function (token) {
  const s = token && this.tokens[token];
  if (!s) { return null; }
  s.lastSeen = Date.now();
  this.dirty = true;
  return { token: token, user: s.user, createdAt: s.createdAt, lastSeen: s.lastSeen, admin: !!(this.get(s.user) || {}).admin };
};

Store.prototype.revoke = function (token) {
  if (this.tokens[token]) { delete this.tokens[token]; this.saveTokens(); return true; }
  return false;
};

/* 在线会话：以最近之动作计时（逾 idleMs 者视为已下线） */
Store.prototype.active = function (idleMs) {
  const now = Date.now();
  const out = [];
  Object.keys(this.tokens).forEach(t => {
    const s = this.tokens[t];
    if (now - (s.lastSeen || 0) <= idleMs) { out.push({ token: t, user: s.user, idle: now - (s.lastSeen || 0) }); }
  });
  return out;
};

/* 久置而无人动用之令牌，一并清去（免令牌库日长） */
Store.prototype.prune = function (maxAgeMs) {
  const now = Date.now();
  let n = 0;
  Object.keys(this.tokens).forEach(t => {
    if (now - (this.tokens[t].lastSeen || 0) > maxAgeMs) { delete this.tokens[t]; n++; }
  });
  if (n) { this.saveTokens(); }
  return n;
};

/* —— 云存档：与浏览器本地之进度同构 —— */
Store.prototype.saveFile = function (name) {
  return path.join(this.savesDir, encodeURIComponent(String(name).toLowerCase()) + '.json');
};

Store.prototype.putSave = function (name, data, version) {
  const payload = { user: name, rev: crypto.randomBytes(6).toString('hex'), savedAt: Date.now(), version: version || null, data: data };
  this._write(this.saveFile(name), payload);
  return payload;
};

Store.prototype.getSave = function (name) {
  const f = this.saveFile(name);
  if (!fs.existsSync(f)) { return null; }
  return this._read(f, null);
};

module.exports = Store;
module.exports.hash = hash;
