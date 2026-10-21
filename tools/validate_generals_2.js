/* 临时校验脚本：node tools/validate_generals_2.js
 * 校验 src/data/generals_2.js 是否符合 SCHEMA v1（§2 字段 / §3 技能 / §4 势力） */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'data', 'generals_2.js');

const FACTIONS = ['han', 'dong', 'lvbu', 'yuan', 'zhong', 'wei', 'jin', 'shu', 'yi', 'jing',
  'hanzhong', 'wu', 'liaodong', 'liang', 'wan', 'huangjin', 'xianbei', 'wuhuan',
  'nanxiong', 'qiang', 'shanyue', 'nanman', 'jiao', 'neutral'];

const MOD_KEYS = ['atk', 'def', 'move', 'range', 'hp', 'gold', 'food', 'recruit', 'morale',
  'siege', 'citydef', 'heal', 'xp', 'vision', 'landmove', 'watermove'];

const TAGS = ['fire', 'water', 'naval', 'cavalry', 'archer', 'pike', 'siege', 'ambush', 'rally',
  'guard', 'pursue', 'insight', 'logistics', 'fortify', 'raiding', 'dread', 'barbarian',
  'scholar', 'ritual', 'cavalryarcher', 'crossbow', 'iron'];

const KINDS = ['passive', 'aura', 'active'];
const ROLES = ['lord', 'strategist', 'general', 'minister', 'consort'];
const REQUIRED = ['id', 'name', 'faction', 'stats', 'skills', 'traits', 'bio', 'impact'];
const STATS = ['lead', 'war', 'int', 'pol', 'cha'];

const src = fs.readFileSync(FILE, 'utf8');
const ctx = { window: {} };
vm.createContext(ctx);
try {
  vm.runInContext(src, ctx, { filename: FILE });
} catch (e) {
  console.error('语法/求值失败：', e.message);
  process.exit(1);
}

const G = ctx.window.GENERALS_PART2;
const errs = [];
const warn = [];
if (!G || typeof G !== 'object') { console.error('window.GENERALS_PART2 未定义'); process.exit(1); }

if (src.includes('</script>')) errs.push('文件内出现禁用串 </script>');

const seen = new Set();
const ids = Object.keys(G);

for (const key of ids) {
  const g = G[key];
  const at = (m) => errs.push(`${key}: ${m}`);
  for (const f of REQUIRED) if (g[f] === undefined) at(`缺少必需字段 ${f}`);
  if (g.id !== key) at(`id 与键名不一致（${g.id}）`);
  if (seen.has(g.id)) at(`id 重复 ${g.id}`);
  seen.add(g.id);

  if (!FACTIONS.includes(g.faction)) at(`faction 不在白名单：${g.faction}`);
  if (g.roles) {
    if (!Array.isArray(g.roles) || !g.roles.length) at('roles 必须是非空数组');
    else g.roles.forEach(r => { if (!ROLES.includes(r)) at(`roles 含非法值 ${r}`); });
  }
  if (g.stats) {
    for (const s of STATS) {
      const v = g.stats[s];
      if (typeof v !== 'number' || !Number.isInteger(v) || v < 1 || v > 100) at(`stats.${s} 非 1-100 整数：${v}`);
    }
    for (const k of Object.keys(g.stats)) if (!STATS.includes(k)) at(`stats 含未知维度 ${k}`);
  }
  if (!Array.isArray(g.traits) || g.traits.length < 2 || g.traits.length > 4) at(`traits 须 2-4 条（现 ${g.traits && g.traits.length}）`);
  if (typeof g.bio !== 'string') at('bio 非字符串');
  else {
    const L = [...g.bio].length;
    if (L < 40 || L > 140) warn.push(`${key}: bio 长度 ${L}（规范 40-140）`);
  }
  if (typeof g.impact !== 'number' || !Number.isInteger(g.impact) || g.impact < 1 || g.impact > 5) at(`impact 非 1-5 整数：${g.impact}`);

  if (!Array.isArray(g.skills) || g.skills.length < 1 || g.skills.length > 3) { at(`skills 须 1-3 条（现 ${g.skills && g.skills.length}）`); continue; }
  const skIds = new Set();
  for (const s of g.skills) {
    const sa = (m) => at(`技能 ${s && s.id}：${m}`);
    for (const f of ['id', 'name', 'kind', 'desc', 'mod', 'tags']) if (s[f] === undefined) sa(`缺少 ${f}`);
    if (!s.id) continue;
    if (skIds.has(s.id)) sa('技能 id 在本条目内重复');
    skIds.add(s.id);
    if (!KINDS.includes(s.kind)) sa(`kind 非法：${s.kind}`);
    if (s.kind === 'active') {
      if (!Number.isInteger(s.cd) || s.cd < 1) sa(`active 缺 cd 或 cd 非正整数：${s.cd}`);
      if (!Number.isInteger(s.dur) || s.dur < 1) sa(`active 缺 dur 或 dur 非正整数：${s.dur}`);
    }
    if (typeof s.desc !== 'string') sa('desc 非字符串');
    else {
      const L = [...s.desc].length;
      if (L < 20 || L > 45) sa(`desc 长度 ${L}（规范 20-45）`);
    }
    if (s.mod && typeof s.mod === 'object') {
      for (const k of Object.keys(s.mod)) if (!MOD_KEYS.includes(k)) sa(`mod 键不在白名单：${k}`);
    } else sa('mod 非对象');
    if (!Array.isArray(s.tags) || !s.tags.length) sa('tags 必须是非空数组');
    else s.tags.forEach(t => { if (!TAGS.includes(t)) sa(`tags 值不在白名单：${t}`); });
  }

  if (g.birth !== undefined && g.birth !== null && !Number.isInteger(g.birth)) at('birth 须为整数或 null');
  if (g.death !== undefined && g.death !== null && !Number.isInteger(g.death)) at('death 须为整数或 null');
  if (Array.isArray(g.appear)) {
    if (g.appear.length !== 2 || !g.appear.every(Number.isInteger)) at('appear 须为两个整数');
    else if (g.appear[0] < 184 || g.appear[1] > 265) at(`appear 超出 184-265：${g.appear}`);
  }
  for (const cand of [g.birth, g.death, ...(Array.isArray(g.appear) ? g.appear : [])]) {
    if (Number.isInteger(cand) && (cand < 100 || cand > 280)) warn.push(`${key}: 年份可疑 ${cand}`);
  }
  if (typeof g.bio === 'string' && g.bio.includes('</script>')) at('bio 含 </script>');
}

const byFaction = {};
for (const k of ids) { const f = G[k].faction; byFaction[f] = (byFaction[f] || 0) + 1; }

console.log('文件：src/data/generals_2.js');
console.log('条目总数：', ids.length);
console.log('按势力：', JSON.stringify(byFaction));
console.log('错误：', errs.length);
errs.forEach(e => console.log('  [ERR] ' + e));
console.log('警告：', warn.length);
warn.slice(0, 60).forEach(w => console.log('  [WARN] ' + w));
if (warn.length > 60) console.log(`  ...共 ${warn.length} 条警告`);
process.exit(errs.length ? 1 : 0);
