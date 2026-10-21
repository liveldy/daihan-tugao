/* 全量校验：数据契约 + 引擎可跑通。
 * 用法：node tools/validate.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const FILES = [
  'src/data/map.js', 'src/data/factions.js',
  'src/data/generals_1.js', 'src/data/generals_2.js', 'src/data/generals_3.js', 'src/data/generals_4.js',
  'src/data/lore.js',
  'src/data/stories_1.js', 'src/data/stories_2.js', 'src/data/stories_3.js',
  'src/data/stories_4.js', 'src/data/stories_5.js', 'src/data/stories_6.js', 'src/data/stories_7.js',
  'src/data/wiki.js', 'src/data/dev.js',
  'src/core/rules.js', 'src/core/engine.js', 'src/core/story.js', 'src/core/tutor.js', 'src/core/ai.js'
];

const errs = [];
const warn = [];
const ok = [];

const sandbox = {};
sandbox.globalThis = sandbox;
sandbox.window = sandbox;
sandbox.console = console;
sandbox.Math = Math; sandbox.Date = Date; sandbox.JSON = JSON;
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
          for (const c of enemy) d = Math.min(d, Math.abs(p.x - c.x) + Math.abs(p.y - c.y));
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
