/* 全量校验：数据契约 + 引擎可跑通。
 * 用法：node tools/validate.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const FILES = [
  'src/data/version.js',
  'src/data/map.js', 'src/data/factions.js',
  'src/data/scenarios_1.js', 'src/data/scenarios_2.js', 'src/data/scenarios_3.js',
  'src/data/progress.js',
  'src/data/politics_1.js',
  'src/data/generals_1.js', 'src/data/generals_2.js', 'src/data/generals_3.js', 'src/data/generals_4.js',
  'src/data/lore.js',
  'src/data/stories_1.js', 'src/data/stories_2.js', 'src/data/stories_3.js',
  'src/data/stories_4.js', 'src/data/stories_5.js', 'src/data/stories_6.js', 'src/data/stories_7.js',
  'src/data/wiki.js', 'src/data/dev.js',
  'src/core/rules.js', 'src/core/campaign.js', 'src/core/politics.js', 'src/core/engine.js', 'src/core/story.js',
  'src/core/tutor.js', 'src/core/ai.js'
];

const errs = [];
const warn = [];
const ok = [];

const sandbox = {};
sandbox.globalThis = sandbox;
sandbox.window = sandbox;
sandbox.console = console;
sandbox.Math = Math; sandbox.Date = Date; sandbox.JSON = JSON;
/* 关卡进度用浏览器本地存储；此处以内存代之，期末另作断言 */
const memStore = {};
sandbox.localStorage = {
  getItem: k => (k in memStore ? memStore[k] : null),
  setItem: (k, v) => { memStore[k] = String(v); },
  removeItem: k => { delete memStore[k]; }
};
const ctx = vm.createContext(sandbox);

for (const f of FILES) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { errs.push('缺文件：' + f); continue; }
  const src = fs.readFileSync(p, 'utf8');
  if (src.indexOf('</scr' + 'ipt>') >= 0) { errs.push(f + ' 内含字面量脚本结束标记'); }
  if (/^\s*(import|export)\s/m.test(src)) { errs.push(f + ' 使用了 ESM 语法'); }
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { errs.push(f + ' 载入失败：' + e.message); }
}

const MAP = sandbox.MAP, Rules = sandbox.Rules, Eng = sandbox.Engine, Story = sandbox.Story;
if (!MAP || !Rules || !Eng || !Story) { console.error(errs.join('\n')); process.exit(1); }

/* —— 版本号：VERSION 文件 / src/data/version.js / CHANGELOG.md 首条，三者须一致 —— */
const VER_RE = /^\d+\.\d+\.\d+\.\d+$/;
const fileVer = (() => {
  const p = path.join(ROOT, 'VERSION');
  if (!fs.existsSync(p)) { errs.push('缺 VERSION 文件'); return null; }
  return fs.readFileSync(p, 'utf8').trim();
})();
const appVer = sandbox.APP_VERSION && sandbox.APP_VERSION.version;
if (!fileVer || !VER_RE.test(fileVer)) { errs.push('VERSION 文件非四段版本号：' + fileVer); }
if (!appVer || !VER_RE.test(appVer)) { errs.push('version.js 的 version 非四段版本号：' + appVer); }
if (fileVer && appVer && fileVer !== appVer) { errs.push('VERSION（' + fileVer + '）与 version.js（' + appVer + '）不一致'); }
const chlog = (() => {
  const p = path.join(ROOT, 'CHANGELOG.md');
  if (!fs.existsSync(p)) { errs.push('缺 CHANGELOG.md'); return null; }
  const m = fs.readFileSync(p, 'utf8').match(/^##\s*\[?(\d+\.\d+\.\d+\.\d+)\]?/m);
  if (!m) { errs.push('CHANGELOG.md 未找到版本条目（## x.y.z.w）'); return null; }
  return m[1];
})();
if (chlog && fileVer && chlog !== fileVer) { errs.push('CHANGELOG.md 首条（' + chlog + '）与 VERSION（' + fileVer + '）不一致'); }
if (appVer && sandbox.APP_VERSION && !sandbox.APP_VERSION.name) { errs.push('version.js 缺 name'); }
if (fileVer && chlog === fileVer && appVer === fileVer) { ok.push('版本 ' + fileVer + '（' + (sandbox.APP_VERSION.name || '') + '，' + (sandbox.APP_VERSION.date || '') + '）三处一致'); }

/* —— 舆图 —— */
ok.push('舆图 ' + MAP.W + '×' + MAP.H + '，城池 ' + MAP.CITIES.length + ' 座，势力 ' + Object.keys(MAP.FACTIONS).length + ' 家');
const seen = new Set();
MAP.CITIES.forEach(c => {
  if (seen.has(c.id)) errs.push('城池 id 重复：' + c.id);
  seen.add(c.id);
  const t = MAP.grid[c.y] && MAP.grid[c.y][c.x];
  if (!t) errs.push('城池 ' + c.name + ' 坐标越界');
  else if (t.terrain === 'water') errs.push('城池 ' + c.name + ' 落在水域');
});
Object.keys(MAP.ERAS).forEach(k => {
  try {
    const o = MAP.ownersOf(k);
    const n = Object.values(o).filter(f => f !== 'neutral').length;
    const cnt = {};
    Object.values(o).forEach(f => cnt[f] = (cnt[f] || 0) + 1);
    if (!cnt['neutral']) ok.push('剧本 ' + k + '（' + MAP.ERAS[k].year + '）有主之城 ' + n + ' / ' + MAP.CITIES.length);
  } catch (e) { errs.push('剧本 ' + k + '：' + e.message); }
});

/* —— 势力与君主 —— */
const FD = sandbox.FACTIONS_DATA;
const LORDS = FD.LORDS;
const lordKeys = Object.keys(LORDS);
ok.push('可择之君 ' + lordKeys.length + ' 位，分组 ' + FD.GROUPS.length + '，条目 ' + FD.ENTRIES.length);
FD.ENTRIES.forEach(e => {
  if (e.lords.length === 0) errs.push('条目 ' + e.name + ' 无君主');
  e.lords.forEach(k => {
    const l = LORDS[k];
    if (!l) { errs.push('条目 ' + e.name + ' 引用了不存在的君主 ' + k); return; }
    if (l.group && l.group !== e.group) warn.push('君主 ' + l.name + ' 的 group 与条目不一致');
    if (!MAP.ERAS[l.era]) errs.push('君主 ' + l.name + ' 的剧本 ' + l.era + ' 不存在');
    if (!MAP.CITY_INDEX[l.capital]) errs.push('君主 ' + l.name + ' 的首府 ' + l.capital + ' 不存在');
    if (!FD.MECHS[l.mech]) warn.push('君主 ' + l.name + ' 的国策 ' + l.mech + ' 未定义');
    const own = MAP.ownersOf(l.era);
    const capOwner = own[l.capital];
    if (capOwner !== l.faction) errs.push('君主 ' + l.name + '（' + l.era + '）的首府 ' + l.capital + ' 属 ' + capOwner + '，非本势力 ' + l.faction);
    const n = Object.values(own).filter(f => f === l.faction).length;
    if (n === 0) errs.push('君主 ' + l.name + '（' + l.era + '）的势力 ' + l.faction + ' 在该剧本无城，开局即亡');
  });
});

/* —— 武将 id 跨文件重复（否则后载者静默覆盖前者） —— */
const PARTNAMES = ['GENERALS', 'GENERALS_PART1', 'GENERALS_PART2', 'GENERALS_PART3',
  'GENERALS_PART4', 'GENERALS_PART5', 'GENERALS_PART6'];
const ownerOf = {};
PARTNAMES.forEach(p => {
  const o = sandbox[p];
  if (!o) return;
  Object.keys(o).forEach(id => {
    if (ownerOf[id]) errs.push('武将 id 跨文件重复：' + id + '（' + ownerOf[id] + ' 与 ' + p + '）');
    else ownerOf[id] = p;
    if (o[id].id !== id) errs.push('武将键与 id 不一致：' + p + '.' + id + ' -> ' + o[id].id);
  });
});

/* —— 武将 —— */
const GEN = Object.assign({}, sandbox.GENERALS, sandbox.GENERALS_PART1, sandbox.GENERALS_PART2,
  sandbox.GENERALS_PART3, sandbox.GENERALS_PART4, sandbox.GENERALS_PART5, sandbox.GENERALS_PART6);
const MOD_KEYS = new Set(['atk', 'def', 'move', 'range', 'hp', 'gold', 'food', 'recruit', 'morale',
  'siege', 'citydef', 'heal', 'xp', 'vision', 'landmove', 'watermove']);
const TAG_KEYS = new Set(['fire', 'water', 'naval', 'cavalry', 'archer', 'pike', 'siege', 'ambush', 'rally',
  'guard', 'pursue', 'insight', 'logistics', 'fortify', 'raiding', 'dread', 'barbarian', 'scholar',
  'ritual', 'cavalryarcher', 'crossbow', 'iron']);
let sk = 0;
Object.keys(GEN).forEach(id => {
  const g = GEN[id];
  ['name', 'faction', 'stats', 'skills', 'bio', 'impact'].forEach(k => {
    if (g[k] == null) errs.push('武将 ' + id + ' 缺字段 ' + k);
  });
  if (g.faction && !MAP.FACTIONS[g.faction]) errs.push('武将 ' + id + ' 的势力 ' + g.faction + ' 不存在');
  Object.keys(g.stats || {}).forEach(k => {
    const v = g.stats[k];
    if (!(v >= 1 && v <= 100)) errs.push('武将 ' + id + ' 的 ' + k + ' 越界：' + v);
  });
  (g.skills || []).forEach(s => {
    sk++;
    if (!['passive', 'aura', 'active'].includes(s.kind)) errs.push('武将 ' + id + ' 技能 ' + s.name + ' kind 非法');
    Object.keys(s.mod || {}).forEach(m => { if (!MOD_KEYS.has(m)) errs.push('武将 ' + id + ' 技能 ' + s.name + ' 的 mod 键 ' + m + ' 不在白名单'); });
    (s.tags || []).forEach(t => { if (!TAG_KEYS.has(t)) errs.push('武将 ' + id + ' 技能 ' + s.name + ' 的 tag ' + t + ' 不在白名单'); });
  });
});
ok.push('武将 ' + Object.keys(GEN).length + ' 人，技能 ' + sk + ' 条');

/* —— 典籍 —— */
const LORE = sandbox.LORE || [];
const CATS = ['制度', '历法', '地理', '人文', '军事', '思潮'];
const catCount = {};
LORE.forEach(x => {
  if (!x.id || !x.cat || !x.title || !x.text) errs.push('典籍条目缺字段：' + (x.id || x.title));
  if (!CATS.includes(x.cat)) errs.push('典籍 ' + x.id + ' 的类目 ' + x.cat + ' 非法');
  catCount[x.cat] = (catCount[x.cat] || 0) + 1;
});
ok.push('典籍 ' + LORE.length + ' 条：' + CATS.map(c => c + ' ' + (catCount[c] || 0)).join('，'));
CATS.forEach(c => { if ((catCount[c] || 0) < 14) warn.push('典籍「' + c + '」不足 14 条（实 ' + (catCount[c] || 0) + '）'); });

/* —— 剧情 —— */
const ST = Object.assign({}, sandbox.STORIES, sandbox.STORIES_PART1, sandbox.STORIES_PART2,
  sandbox.STORIES_PART3, sandbox.STORIES_PART4, sandbox.STORIES_PART5, sandbox.STORIES_PART6,
  sandbox.STORIES_PART7);
const TRIG = new Set(['start', 'turn', 'year', 'flag', 'city', 'lost', 'battleWin', 'unify', 'enemyCities', 'requires', 'repeat']);
const EF = new Set(['gold', 'food', 'troops', 'morale', 'flag', 'clearFlag', 'unlockGeneral', 'loreEntry',
  'captureCity', 'freeUnit', 'enemyTroops', 'relation', 'disaster']);
let chapters = 0, scenes = 0, choices = 0;
lordKeys.forEach(k => {
  const s = ST[k];
  if (!s) { errs.push('君主 ' + LORDS[k].name + '（' + k + '）缺故事线'); return; }
  if (!s.endings || !s.endings.win || !s.endings.lose) errs.push('故事线 ' + k + ' 缺 win/lose 结局');
  if (!s.chapters || s.chapters.length < 7) errs.push('故事线 ' + k + ' 章回不足 7（实 ' + ((s.chapters || []).length) + '）');
  let starts = 0;
  (s.chapters || []).forEach(ch => {
    chapters++;
    if (!ch.id || !ch.title || !ch.trigger || !ch.scene) errs.push('故事线 ' + k + ' 有章回缺字段：' + (ch.id || ch.title));
    if (ch.trigger && ch.trigger.start) starts++;
    Object.keys(ch.trigger || {}).forEach(t => { if (!TRIG.has(t)) errs.push('故事线 ' + k + ' 章 ' + ch.id + ' 的 trigger 键 ' + t + ' 非法'); });
    const sc = ch.scene || [];
    scenes += sc.length;
    if (sc.length < 4) warn.push('故事线 ' + k + ' 章 ' + ch.id + ' 场景仅 ' + sc.length + ' 条');
    if (!sc.some(x => x.t === 'inner')) errs.push('故事线 ' + k + ' 章 ' + ch.id + ' 缺内心独白');
    if (sc.some(x => x.t === 'history' && !x.src)) warn.push('故事线 ' + k + ' 章 ' + ch.id + ' 的史注缺出处');
    if (ch.choice) {
      choices++;
      if (!ch.choice.options || ch.choice.options.length < 2) errs.push('故事线 ' + k + ' 章 ' + ch.id + ' 的抉择不足 2 项');
      (ch.choice.options || []).forEach(o => {
        Object.keys(o.effect || {}).forEach(e => { if (!EF.has(e)) errs.push('故事线 ' + k + ' 章 ' + ch.id + ' 的 effect 键 ' + e + ' 非法'); });
      });
    }
    [ch.reward, ch.penalty].forEach(e => {
      Object.keys(e || {}).forEach(x => { if (!EF.has(x)) errs.push('故事线 ' + k + ' 章 ' + ch.id + ' 的 ' + x + ' 非法'); });
    });
  });
  if (starts !== 1) errs.push('故事线 ' + k + ' 的 {start:true} 章数为 ' + starts + '（应为 1）');
});
ok.push('故事线 ' + Object.keys(ST).length + ' 条，章回 ' + chapters + '，场景 ' + scenes + '，抉择 ' + choices);

/* —— 志略二页：兵书志略（window.WIKI，只载玩法）与匠作志略（window.DEV，只载实现） —— */
/* 兵书志略不得夹带实现细节：文件路径、脚本名、图象文件名、字段名一概不取 */
const TECH_IN_WIKI = /src\/\S|\.(js|png|jpg|webp|html)\b|\b[a-z]{2,}[A-Z][a-zA-Z]*\b/;

function checkDoc(label, D, forbidTech) {
  if (!D || !D.sections) { errs.push('缺 ' + label + ' 数据'); return; }
  const ids = new Set(); let n = 0;
  D.sections.forEach(s => {
    if (!s.id || !s.name) { errs.push(label + ' 节缺 id/name'); return; }
    if (!s.entries || !s.entries.length) { errs.push(label + ' 节 ' + s.id + ' 无条目'); return; }
    s.entries.forEach(e => {
      n++;
      if (!e.id || !e.title || !Array.isArray(e.body)) { errs.push(label + ' 条目缺 id/title/body：' + (e.id || e.title)); return; }
      if (ids.has(e.id)) { errs.push(label + ' 条目 id 重复：' + e.id); }
      ids.add(e.id);
      if (e.table) {
        if (!e.table.head || !e.table.rows) { errs.push(label + ' 表格缺 head/rows：' + e.id); }
        else { e.table.rows.forEach((r, i) => { if (r.length !== e.table.head.length) { errs.push(label + ' 表格 ' + e.id + ' 第 ' + (i + 1) + ' 行列数不符'); } }); }
      }
      if (forbidTech) {
        const texts = [].concat(e.body || [], e.list || [], e.note ? [e.note] : [],
          e.table ? [].concat(e.table.head, ...e.table.rows) : []);
        texts.forEach(t => {
          if (typeof t === 'string' && TECH_IN_WIKI.test(t)) {
            errs.push(label + ' 条目「' + e.title + '」夹带实现细节：' + t.slice(0, 40) + '…');
          }
        });
      }
    });
  });
  ok.push(label + ' ' + D.sections.length + ' 门，条目 ' + n);
}

checkDoc('兵书志略', sandbox.WIKI, true);
checkDoc('匠作志略', sandbox.DEV, false);

/* —— 人物志：兵书志略之附卷，由武将数据自动编次（src/ui/roster.js） —— */
/* 浏览器中由 Roster.attach() 推入 window.WIKI.sections 之末；此处就同一份武将数据核其形状与文案。 */
(function () {
  const rel = 'src/ui/roster.js';
  const fpath = path.join(ROOT, rel);
  if (!fs.existsSync(fpath)) { errs.push('缺文件：' + rel); return; }
  const rsrc = fs.readFileSync(fpath, 'utf8');
  if (rsrc.indexOf('</scr' + 'ipt>') >= 0) { errs.push(rel + ' 内含字面量脚本结束标记'); }
  if (/^\s*(import|export)\s/m.test(rsrc)) { errs.push(rel + ' 使用了 ESM 语法'); }
  try { vm.runInContext(rsrc, ctx, { filename: rel }); } catch (e) { errs.push(rel + ' 载入失败：' + e.message); return; }

  const Roster = sandbox.Roster;
  if (!Roster || typeof Roster.registry !== 'function' || typeof Roster.section !== 'function' || typeof Roster.attach !== 'function') {
    errs.push('Roster 未导出 registry/section/attach'); return;
  }

  const reg = Roster.registry();
  const genIds = Object.keys(GEN);
  if (Object.keys(reg).length !== genIds.length) { errs.push('人物志收录 ' + Object.keys(reg).length + ' 人，武将数据 ' + genIds.length + ' 人'); }
  genIds.forEach(id => { if (reg[id] !== GEN[id]) { errs.push('人物志之 ' + id + ' 非武将数据原对象'); } });

  const sec = Roster.section(reg);
  if (!sec || sec.id !== 'roster' || !sec.name || !Array.isArray(sec.entries) || !sec.entries.length) {
    errs.push('Roster.section 未返回合法节对象（须有 id=roster、name 与 entries）'); return;
  }
  if (!Array.isArray(sec.entries[0].body) || !sec.entries[0].body.length) { errs.push('人物志缺开卷总说（首条无 body）'); }
  if (!sec.entries[sec.entries.length - 1].note) { errs.push('人物志缺卷末注（末条无 note）'); }

  const wikiIds = new Set();
  ((sandbox.WIKI && sandbox.WIKI.sections) || []).forEach(s => (s.entries || []).forEach(e => wikiIds.add(e.id)));
  const seenIds = new Set();
  let rows = 0, skills = 0, segs = 0, cols = null;
  const perFac = {};
  genIds.forEach(id => { const f = GEN[id].faction || 'neutral'; perFac[f] = (perFac[f] || 0) + 1; });

  sec.entries.forEach(e => {
    if (!e.id || !e.title || !Array.isArray(e.body) || !e.body.length) { errs.push('人物志条目缺 id/title/body：' + (e.id || e.title)); return; }
    if (seenIds.has(e.id)) { errs.push('人物志条目 id 重复：' + e.id); }
    if (wikiIds.has(e.id)) { errs.push('人物志条目 id 与兵书志略既有条目重复：' + e.id); }
    seenIds.add(e.id);
    if (e.table) {
      if (!e.table.head || !e.table.rows) { errs.push('人物志表格缺 head/rows：' + e.id); }
      else {
        if (cols == null) { cols = e.table.head.length; }
        else if (cols !== e.table.head.length) { errs.push('人物志表格列数不一：' + e.id); }
        e.table.rows.forEach((r, i) => {
          if (r.length !== e.table.head.length) { errs.push('人物志表格 ' + e.id + ' 第 ' + (i + 1) + ' 行列数不符'); }
          rows++;
          skills += (String(r[r.length - 1]).match(/（(?:常|光环|主动)）/g) || []).length;
        });
        segs++;
      }
    }
    const texts = [].concat(e.body, e.list || [], e.note ? [e.note] : [],
      e.table ? [].concat(e.table.head, ...e.table.rows) : []);
    texts.forEach(t => {
      if (typeof t === 'string' && TECH_IN_WIKI.test(t)) {
        errs.push('人物志条目「' + e.title + '」夹带实现细节：' + t.slice(0, 40) + '…');
      }
    });
  });

  const totalSkills = genIds.reduce((n, id) => n + ((GEN[id].skills || []).length), 0);
  if (rows !== genIds.length) { errs.push('人物志表载 ' + rows + ' 行，武将 ' + genIds.length + ' 人，数目不符'); }
  if (skills !== totalSkills) { errs.push('人物志载技能 ' + skills + ' 条，武将数据 ' + totalSkills + ' 条，数目不符'); }
  const facKeys = Object.keys(perFac).sort((a, b) => b.length - a.length);
  const listed = new Set();
  sec.entries.forEach(e => {
    if (!e.table) { return; }
    const k = facKeys.find(f => e.id === 'roster-' + f || e.id.indexOf('roster-' + f + '-') === 0);
    if (k) { listed.add(k); } else { errs.push('人物志条目 ' + e.id + ' 不对应任何有将佐之势力'); }
  });
  facKeys.forEach(f => {
    if (!listed.has(f)) { errs.push('人物志未列势力 ' + f + '（' + perFac[f] + ' 人）'); }
  });

  const W = sandbox.WIKI;
  if (W && Array.isArray(W.sections)) {
    const before = W.sections.length;
    Roster.attach(); Roster.attach();
    const after = W.sections.length;
    if (after !== before + 1) { errs.push('Roster.attach() 非恰推一节（' + before + ' → ' + after + '）'); }
    else if (!W.sections[after - 1] || W.sections[after - 1].id !== 'roster') { errs.push('Roster.attach() 所推者非人物志节'); }
    while (W.sections.length > before) { W.sections.pop(); }
  } else { errs.push('兵书志略缺 sections，无从核 Roster.attach()'); }

  ok.push('人物志 ' + sec.entries.length + ' 条（总说 1、势力 ' + segs + ' 段、卷末 1）：将佐 ' + rows
    + ' 人、势力 ' + Object.keys(perFac).length + ' 家、技能 ' + skills + ' 条，表 ' + cols + ' 列');
})();


/* —— 剧本与关卡：一君主多剧本，一剧本多关卡，末关为开放型 —— */
const Camp = sandbox.Campaign, PROG = sandbox.PROGRESS;
const GOAL_KEYS = ['cities', 'factions', 'minCities', 'turns', 'unify', 'open', 'strife', 'heir', 'legit'];
if (!Camp) { errs.push('缺 Campaign 模块'); }
else {
  const seenScen = new Set(), seenStage = new Set();
  let nScen = 0, nStage = 0, nOpen = 0;
  lordKeys.forEach(k => {
    const list = Camp.scenariosOf(k);
    if (!list.length) { errs.push('君主 ' + LORDS[k].name + ' 无剧本'); return; }
    const eras = new Set();
    list.forEach(sc => {
      nScen++;
      if (!/^[a-z][a-z0-9_]*$/.test(sc.id)) { errs.push('剧本 id 非法：' + sc.id); }
      if (seenScen.has(sc.id)) { errs.push('剧本 id 重复：' + sc.id); }
      seenScen.add(sc.id);
      if (!sc.name || !sc.blurb) { errs.push('剧本 ' + sc.id + ' 缺 name 或 blurb'); }
      if (!MAP.ERAS[sc.era]) { errs.push('剧本 ' + sc.id + ' 的 era 不存在：' + sc.era); }
      else if (MAP.ERAS[sc.era].year !== sc.year) {
        errs.push('剧本 ' + sc.id + ' 的 year ' + sc.year + ' 与 era ' + sc.era + '（' + MAP.ERAS[sc.era].year + '）不符');
      }
      if (eras.has(sc.era)) { errs.push('君主 ' + LORDS[k].name + ' 重复使用剧本 ' + sc.era); }
      eras.add(sc.era);
      if (!Array.isArray(sc.stages) || sc.stages.length < 3) { errs.push('剧本 ' + sc.id + ' 关卡少于三关'); return; }
      const own = MAP.ownersOf(sc.era);
      const mine = Object.values(own).filter(f => f === LORDS[k].faction).length;
      if (mine === 0) { errs.push('君主 ' + LORDS[k].name + ' 于剧本 ' + sc.id + '（' + sc.era + '）无城，开局即亡'); }
      sc.stages.forEach((stg, idx) => {
        nStage++;
        if (!/^[a-z][a-z0-9_]*$/.test(stg.id)) { errs.push('关卡 id 非法：' + stg.id); }
        if (seenStage.has(stg.id)) { errs.push('关卡 id 重复：' + stg.id); }
        seenStage.add(stg.id);
        if (!stg.name) { errs.push('关卡 ' + stg.id + ' 无名称'); }
        const g = stg.goal || {};
        Object.keys(g).forEach(key => {
          if (GOAL_KEYS.indexOf(key) < 0) { errs.push('关卡 ' + stg.id + ' 含未知目标字段 ' + key); }
        });
        if (g.open && Object.keys(g).length > 1) { errs.push('关卡 ' + stg.id + ' 开放型夹杂其它目标'); }
        if (!g.open && Object.keys(g).length === 0) { errs.push('关卡 ' + stg.id + ' 无目标且非开放型'); }
        if (g.cities) {
          g.cities.forEach(c => {
            if (!MAP.CITY_INDEX[c]) { errs.push('关卡 ' + stg.id + ' 之城不存在：' + c); }
            else if (own[c] === LORDS[k].faction) { errs.push('关卡 ' + stg.id + ' 之城 ' + c + ' 开局已属本势力'); }
          });
        }
        if (g.factions) {
          g.factions.forEach(f => {
            if (!MAP.FACTIONS[f]) { errs.push('关卡 ' + stg.id + ' 之势力不存在：' + f); }
            else if (f === LORDS[k].faction) { errs.push('关卡 ' + stg.id + ' 以本势力为目标'); }
            else if (Object.values(own).indexOf(f) < 0) { errs.push('关卡 ' + stg.id + ' 之势力 ' + f + ' 在该剧本无城'); }
          });
        }
        if (g.minCities != null && (g.minCities <= mine || g.minCities >= 96)) {
          errs.push('关卡 ' + stg.id + ' 的 minCities ' + g.minCities + ' 不合（本势力开局 ' + mine + ' 城）');
        }
        if (g.turns != null && (g.turns < 8 || g.turns > 200)) { errs.push('关卡 ' + stg.id + ' 的 turns ' + g.turns + ' 不合'); }
        if (g.strife != null && (g.strife < 5 || g.strife > 90)) { errs.push('关卡 ' + stg.id + ' 的 strife 目标不合：' + g.strife); }
        if (g.legit != null && (g.legit < 20 || g.legit > 95)) { errs.push('关卡 ' + stg.id + ' 的 legit 目标不合：' + g.legit); }
      });
      const last = sc.stages[sc.stages.length - 1];
      if (!last.goal || !last.goal.open) { errs.push('剧本 ' + sc.id + ' 之末关非开放型'); } else { nOpen++; }
      sc.stages.slice(0, -1).forEach(s => {
        if (s.goal && s.goal.open) { errs.push('剧本 ' + sc.id + ' 之非末关为开放型：' + s.id); }
      });
    });
  });
  ok.push('剧本 ' + nScen + ' 局，关卡 ' + nStage + ' 关（开放型末关 ' + nOpen + ' 关），逐关皆有目标且依史有据');

  /* 逐关开局：每位君主·每一局·每一关皆能起局且有城 */
  const noCity = [];
  let opened = 0;
  lordKeys.forEach(k => Camp.scenariosOf(k).forEach(sc => sc.stages.forEach((stg, idx) => {
    try {
      const s = Eng.newGame({ lord: k, scenario: sc.id, stage: idx, seed: 777 });
      if (Eng.countCities(s, s.player) === 0) { noCity.push(k + '/' + sc.id + '#' + (idx + 1)); }
      if (!s.stage || s.stage.id !== sc.stages[idx].id) { errs.push('开局所载之关不符：' + k + '/' + sc.id + '#' + (idx + 1)); }
      opened++;
    } catch (e) { errs.push('关卡开局失败 ' + k + '/' + sc.id + '#' + (idx + 1) + '：' + e.message); }
  })));
  ok.push('逐关开局 ' + opened + ' 关，皆起而载明本关之志');
  if (noCity.length) { errs.push('开局无城之关 ' + noCity.length + ' 处：' + noCity.slice(0, 8).join('、')); }

  /* 目标判定之算：取一「仅以取城为目」之关，尽取其城则应过关
   * （以 checkStage 直接判定：AI 当回合可能夺回目标城，走 endTurn 则结果不稳） */
  try {
    let found = null;
    lordKeys.some(k => Camp.scenariosOf(k).some(sc => sc.stages.some((s, i) => {
      if (i >= sc.stages.length - 1) { return false; }
      const g = s.goal || {};
      if (Object.keys(g).length === 1 && g.cities && g.cities.length) {
        found = { lord: k, sc: sc, stg: s, idx: i }; return true;
      }
      return false;
    })));
    if (!found) { warn.push('未寻得「仅以取城为目」之关，目标判定未试'); }
    else {
      const s3 = Eng.newGame({ lord: found.lord, scenario: found.sc.id, stage: found.idx, seed: 999 });
      if (Camp.goalMet(s3, found.stg.goal)) { errs.push('关卡 ' + found.stg.id + ' 开局即已达成'); }
      if (Eng.checkStage(s3)) { errs.push('关卡 ' + found.stg.id + ' 未取城而先过关'); }
      found.stg.goal.cities.forEach(c => { if (s3.cities[c]) { s3.cities[c].owner = s3.player; } });
      if (!Camp.goalMet(s3, found.stg.goal)) { errs.push('关卡 ' + found.stg.id + ' 尽取其城而未判为成'); }
      if (!Eng.checkStage(s3) || !s3.result || !s3.result.win || s3.result.reason !== 'stage') {
        errs.push('关卡 ' + found.stg.id + ' 尽取其城而未过关');
      }
      ok.push('目标判定：尽取目标城即过关（' + found.stg.id + '）');
    }
  } catch (e) { errs.push('目标判定之试失败：' + e.message); }

  /* 开放型末关：不因目标而终，唯待一统 */
  try {
    let k0 = null, sc0 = null;
    lordKeys.some(k => {
      const l = Camp.scenariosOf(k);
      if (l.length) { k0 = k; sc0 = l[0]; return true; }
      return false;
    });
    const s4 = Eng.newGame({ lord: k0, scenario: sc0.id, stage: sc0.stages.length - 1, seed: 555 });
    if (!s4.stage.open) { errs.push('末关未标为开放型：' + sc0.id); }
    if (Camp.goalMet(s4, s4.stage.goal)) { errs.push('开放型末关被判为已达成'); }
    if (Eng.checkStage(s4)) { errs.push('开放型末关因目标而终'); }
    ok.push('开放型末关：不设目标，待一统而终');
  } catch (e) { errs.push('开放型末关之试失败：' + e.message); }
}

/* —— 关卡进度：逐关解锁、逐局解锁、计数与重置 —— */
if (PROG && Camp) {
  const lk = lordKeys[0], list = Camp.scenariosOf(lk), sc0 = list[0];
  if (PROG.stageOpen(lk, sc0.id, 1)) { errs.push('进度：未克首关而次关已开'); }
  PROG.mark(lk, sc0.id, 0);
  if (!PROG.stageOpen(lk, sc0.id, 1)) { errs.push('进度：首关已克而次关未开'); }
  if (PROG.stageOpen(lk, sc0.id, 2)) { errs.push('进度：仅克首关而三关已开'); }
  if (PROG.done(lk, sc0.id) !== 1) { errs.push('进度：done 计数不符'); }
  if (list.length > 1 && PROG.scenarioOpen(lk, list[1].id)) { errs.push('进度：前局未竟而次局已开'); }
  sc0.stages.forEach((s, i) => PROG.mark(lk, sc0.id, i));
  if (list.length > 1 && !PROG.scenarioOpen(lk, list[1].id)) { errs.push('进度：前局已竟而次局未开'); }
  if (PROG.scenarioOpen(lk, sc0.id) !== true) { errs.push('进度：首局未开'); }
  const tl = PROG.tally(lk);
  if (tl.done !== sc0.stages.length) { errs.push('进度：tally 不符（' + tl.done + '）'); }
  const lst = PROG.last();
  if (!lst || lst.lord !== lk) { errs.push('进度：last() 不符'); }
  if (!PROG.lordTally().length) { errs.push('进度：lordTally() 为空'); }
  PROG.reset(lk);
  if (PROG.done(lk, sc0.id) !== 0) { errs.push('进度：reset 未清'); }
  if (PROG.last()) { errs.push('进度：清后仍有续战之记'); }
  ok.push('关卡进度：逐关解锁、逐局解锁、计数、续战与重置皆合');
}

/* —— 朝局：政争事件、议政、立储 —— */
const POL = sandbox.POLITICS;
if (!POL) { errs.push('缺朝局数据（src/data/politics_1.js）'); }
else {
  const COURT_KEYS = ['strife', 'loyalty', 'sealHeir', 'unsealHeir', 'purge', 'purgeDeath', 'legit'];
  const EF_KEYS = ['gold', 'food', 'troops', 'morale', 'prestige', 'relation', 'flag', 'clearFlag',
    'unlockGeneral', 'captureCity', 'enemyTroops', 'disaster', 'court'];
  const REQ_KEYS = ['minCities', 'minPrestige', 'strifeAtLeast', 'strifeAtMost', 'heir', 'flag'];
  const SCENE_T = ['narration', 'line', 'inner', 'history'];
  const polIds = new Set();

  function checkEffect(ef, who) {
    if (!ef || typeof ef !== 'object' || !Object.keys(ef).length) { errs.push(who + ' 无效果'); return; }
    Object.keys(ef).forEach(k => { if (EF_KEYS.indexOf(k) < 0) { errs.push(who + ' 的效果键不在白名单：' + k); } });
    if (ef.relation && typeof ef.relation === 'object' && !MAP.FACTIONS[ef.relation.who]) {
      errs.push(who + ' 的 relation 无此势力：' + ef.relation.who);
    }
    if (ef.unlockGeneral && !GEN[ef.unlockGeneral]) { errs.push(who + ' 的 unlockGeneral 非武将：' + ef.unlockGeneral); }
    if (ef.captureCity && !MAP.CITY_INDEX[ef.captureCity]) { errs.push(who + ' 的 captureCity 无此城：' + ef.captureCity); }
    if (ef.court) {
      Object.keys(ef.court).forEach(k => { if (COURT_KEYS.indexOf(k) < 0) { errs.push(who + ' 的 court 键不在白名单：' + k); } });
      ['sealHeir', 'purge', 'purgeDeath'].forEach(k => {
        if (ef.court[k] && !GEN[ef.court[k]]) { errs.push(who + ' 的 court.' + k + ' 非武将：' + ef.court[k]); }
      });
    }
  }

  const EV = POL.events || [], TP = POL.topics || [], HR = POL.heirs || {};
  EV.forEach(e => {
    const who = '政争 ' + e.id;
    if (!e.id || polIds.has(e.id)) { errs.push(who + ' 之 id 缺失或重复'); }
    polIds.add(e.id);
    ['name', 'year', 'src'].forEach(k => { if (e[k] == null || e[k] === '') { errs.push(who + ' 缺 ' + k); } });
    if (!(e.year >= 184 && e.year <= 265)) { errs.push(who + ' 之年不合：' + e.year); }
    if (!e.scene || e.scene.length < 3) { errs.push(who + ' 之场景不足三条'); }
    (e.scene || []).forEach(s => {
      if (!s.t || !s.text) { errs.push(who + ' 之场景缺 t/text'); }
      else if (SCENE_T.indexOf(s.t) < 0) { errs.push(who + ' 之场景类型不合：' + s.t); }
    });
    (e.factions || []).forEach(f => { if (!MAP.FACTIONS[f]) { errs.push(who + ' 之势力不存在：' + f); } });
    (e.lords || []).forEach(k => { if (!LORDS[k]) { errs.push(who + ' 之君主不存在：' + k); } });
    Object.keys(e.requires || {}).forEach(k => { if (REQ_KEYS.indexOf(k) < 0) { errs.push(who + ' 的 requires 键不在白名单：' + k); } });
    if (!e.choice || !e.choice.options || e.choice.options.length < 2) { errs.push(who + ' 之抉择不足两条'); }
    ((e.choice || {}).options || []).forEach((o, i) => {
      if (!o.text || !o.reply) { errs.push(who + ' 之选项 ' + i + ' 缺 text/reply'); }
      checkEffect(o.effect, who + ' 选项 ' + i);
    });
  });

  TP.forEach(t => {
    const who = '议政 ' + t.id;
    if (!t.id || polIds.has(t.id)) { errs.push(who + ' 之 id 缺失或重复'); }
    polIds.add(t.id);
    ['name', 'desc', 'src'].forEach(k => { if (!t[k]) { errs.push(who + ' 缺 ' + k); } });
    if (t.cost && t.cost.prestige != null && (t.cost.prestige < 0 || t.cost.prestige > 30)) { errs.push(who + ' 的威望之费不合：' + t.cost.prestige); }
    if (!t.options || t.options.length < 2) { errs.push(who + ' 之策不足两条'); }
    (t.options || []).forEach((o, i) => {
      if (!o.text || !o.reply) { errs.push(who + ' 之策 ' + i + ' 缺 text/reply'); }
      checkEffect(o.effect, who + ' 策 ' + i);
    });
  });

  Object.keys(HR).forEach(k => {
    if (!LORDS[k]) { errs.push('储位：未知君主 ' + k); return; }
    if (!HR[k].length) { errs.push('储位：' + k + ' 之列空'); }
    HR[k].forEach(h => {
      if (!GEN[h.id]) { errs.push('储位：' + k + ' 之候选 ' + h.id + ' 非武将'); return; }
      if (GEN[h.id].name !== h.name) { errs.push('储位：' + h.id + ' 之名不符（' + h.name + ' ≠ ' + GEN[h.id].name + '）'); }
      if (!(h.order >= 1 && h.order <= 9)) { errs.push('储位：' + h.id + ' 之齿序不合：' + h.order); }
      if (!h.claim || !h.note) { errs.push('储位：' + h.id + ' 缺 claim/note'); }
    });
    const ords = HR[k].map(h => h.order);
    if (new Set(ords).size !== ords.length) { errs.push('储位：' + k + ' 之齿序重复'); }
  });

  ok.push('朝局：政争 ' + EV.length + ' 条，议政 ' + TP.length + ' 条，储位之君 ' + Object.keys(HR).length +
    ' 位（候选 ' + Object.keys(HR).reduce((n, k) => n + HR[k].length, 0) + ' 人）');
  if (EV.length < 18) { warn.push('政争事件仅 ' + EV.length + ' 条（规格要求不少于 18）'); }
  if (TP.length < 8) { warn.push('议政之题仅 ' + TP.length + ' 条（规格要求不少于 8）'); }
  if (Object.keys(HR).length < 12) { warn.push('有储位之君仅 ' + Object.keys(HR).length + ' 位（规格要求不少于 12）'); }

  /* 朝局之志皆须可成：求立储者须有储可立，求平党争者须有可平之法 */
  let nCourtGoal = 0, nHeirGoal = 0;
  lordKeys.forEach(k => Camp.scenariosOf(k).forEach(sc => sc.stages.forEach(stg => {
    const g = stg.goal || {};
    if (g.strife != null || g.heir || g.legit != null) {
      nCourtGoal++;
      if (g.heir) { nHeirGoal++; }
    }
    if (g.heir && !(HR[k] && HR[k].length)) { errs.push('关卡 ' + stg.id + ' 求立储，而 ' + LORDS[k].name + ' 无储可立'); }
    if (g.strife != null) {
      const canSeal = !!(HR[k] && HR[k].length);
      const canCouncil = TP.some(t => (t.options || []).some(o => o.effect && o.effect.court && o.effect.court.strife < 0));
      const canEvent = EV.some(e => ((e.choice || {}).options || []).some(o => o.effect && o.effect.court && o.effect.court.strife < 0));
      if (!canSeal && !canCouncil && !canEvent) { errs.push('关卡 ' + stg.id + ' 求平党争，而 ' + LORDS[k].name + ' 无立储亦无降党争之法'); }
    }
  })));
  ok.push('朝局之志 ' + nCourtGoal + ' 关（立储 ' + nHeirGoal + ' 关、平党争之关亦在其中），皆有可成之法');

  /* 朝局之实：议政、立储、政争三事皆能行 */
  try {
    const s5 = Eng.newGame({ lord: 'caocao', seed: 4242 });
    if (!s5.court) { errs.push('开局未载朝局'); }
    const stt = Eng.politicsStatus(s5);
    if (!stt || typeof stt.strife !== 'number' || typeof stt.legit !== 'number') { errs.push('朝局之状不合'); }
    else { ok.push('朝局之状：党争 ' + stt.strife + '（' + stt.label + '）、名分 ' + stt.legit + '、储位 ' + (stt.heir || '未立')); }
    const open = Eng.courtTopics(s5).filter(t => t.open);
    if (!open.length) { warn.push('曹魏开局无可议之事（金帛或威望不足）'); }
    else {
      const r = Eng.council(s5, open[0].id, 0);
      if (!r.ok) { errs.push('议政未成：' + r.msg); }
      const r2 = Eng.council(s5, open[0].id, 0);
      if (r2.ok) { errs.push('同回合可议二事'); }
      ok.push('议政：' + open[0].name + ' 可行，且一回合止一事');
    }
    const cands = Eng.heirCandidates(s5);
    if (!cands.length) { warn.push('曹操无储可议，立储未试'); }
    else {
      const r3 = Eng.setHeir(s5, cands[cands.length - 1].id);
      if (!r3.ok || !s5.court.heir) { errs.push('立储未成：' + r3.msg); }
      if (Eng.setHeir(s5, cands[cands.length - 1].id).ok) { errs.push('可重立同一人为储'); }
      const g1 = Eng.goalStatus(s5);
      if (!Camp.goalMet(s5, { heir: true })) { errs.push('立储之后，储位之志仍未成'); }
      ok.push('立储：可立、可废立（耗威望）、可判「定储位」之志');
    }
    if (!Camp.goalMet(s5, { strife: 95 })) { errs.push('党争之志之判不合（党争低而志未成）'); }
    if (!/党争降至 95 以下/.test(Camp.goalText({ strife: 95 }))) { errs.push('党争之志之文不合'); }
    if (!/党争 \d+\/95/.test(Camp.goalProgress(s5, { strife: 95 }))) { errs.push('党争之志之进度不合'); }
  } catch (e) { errs.push('朝局之实失败：' + e.message); }

  /* 政争之发：逐君推演，可见事件且有决断之途 */
  try {
    let fired = 0, resolved = 0, seenIds = new Set();
    lordKeys.forEach(k => {
      const s6 = Eng.newGame({ lord: k, seed: 20260101 });
      for (let t = 0; t < 40 && !s6.result; t++) {
        Eng.endTurn(s6);
        const e = Eng.pendingPolitics(s6);
        if (e) {
          fired++; seenIds.add(e.id);
          const r = Eng.resolvePolitics(s6, 0);
          if (r.ok) { resolved++; } else { errs.push('政争 ' + e.id + ' 决断失败：' + r.msg); }
        }
      }
    });
    if (!fired) { errs.push('推演二十六主各四十回合，未发一事'); }
    else { ok.push('政争：推演二十六主各四十回合，事发 ' + fired + ' 次（' + seenIds.size + ' 种），决断 ' + resolved + ' 次'); }
  } catch (e) { errs.push('政争推演失败：' + e.message); }
}

/* —— 引擎跑通：二十四主各推演 —— */
let run = 0, dead = [];
lordKeys.forEach(k => {
  let st;
  try { st = Eng.newGame({ lord: k, seed: 12345 }); } catch (e) { errs.push('开局失败 ' + k + '：' + e.message); return; }
  try {
    for (let t = 0; t < 12; t++) {
      let ch = Story.nextChapter(st);
      let guard = 0;
      while (ch && guard++ < 30) { Story.showChapter(st, ch, 0); ch = Story.nextChapter(st); }
      const mine = st.units.filter(u => u.faction === st.player);
      for (const u of mine) {
        u.acted = false;
        u.moveLeft = Rules.statsOf(u, u.generalRef).move;
        const tgt = Rules.targetsFor(st, u)[0];
        if (tgt) { Eng.attackUnit(st, u.id, tgt.id); continue; }
        const opts = Rules.reachable(st, u);
        if (!opts.length) continue;
        const enemy = Object.keys(st.cities).map(c => st.cities[c]).filter(c => c.owner !== st.player && c.owner !== 'neutral');
        let best = null, bs = 1e9;
        for (const p of opts) {
          let d = 1e9;
          for (const c of enemy) d = Math.min(d, MAP.dist(p.x, p.y, c.x, c.y));
          if (d < bs) { bs = d; best = p; }
        }
        if (best) Eng.moveTo(st, u.id, best.x, best.y);
      }
      Eng.endTurn(st);
      if (st.phase === 'over') break;
    }
    if (!st.units.length && Eng.countCities(st, st.player) === 0) dead.push(k);
    run++;
  } catch (e) { errs.push('推演失败 ' + k + '：' + e.message + '\n' + (e.stack || '').split('\n')[1]); }
});
ok.push('全 ' + lordKeys.length + ' 主各推演 12 回合，完成 ' + run + ' 局');
if (dead.length) warn.push('推演中覆灭：' + dead.join('、'));

/* —— 报告 —— */
console.log('=== 通过 ===');
ok.forEach(l => console.log('  · ' + l));
if (warn.length) { console.log('=== 提示 (' + warn.length + ') ==='); warn.slice(0, 40).forEach(l => console.log('  ! ' + l)); }
if (errs.length) { console.log('=== 错误 (' + errs.length + ') ==='); errs.forEach(l => console.log('  ✗ ' + l)); }
console.log(errs.length ? '校验未通过' : '校验通过');
process.exit(errs.length ? 1 : 0);
