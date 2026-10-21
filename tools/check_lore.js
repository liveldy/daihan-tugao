// 临时校验脚本：node tools/check_lore.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const file = path.join(__dirname, '..', 'src', 'data', 'lore.js');
const code = fs.readFileSync(file, 'utf8');

const sandbox = { window: {}, console };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: file });

const LORE = sandbox.window.LORE;
const errors = [];
const CATS = ['制度', '历法', '地理', '人文', '军事', '思潮'];

if (!Array.isArray(LORE)) errors.push('window.LORE 不是数组');

const ids = new Map();
const stats = {};
CATS.forEach(c => (stats[c] = 0));

LORE.forEach((e, i) => {
  const tag = `[${i}] ${e && e.id ? e.id : '(无 id)'}`;
  ['id', 'cat', 'title', 'text', 'src'].forEach(k => {
    if (typeof e[k] !== 'string' || e[k].trim() === '') errors.push(`${tag}: 缺少字段 ${k}`);
  });
  if (typeof e.id === 'string') {
    if (!/^[a-z][a-z0-9_]*$/.test(e.id)) errors.push(`${tag}: id 非小写蛇形`);
    if (ids.has(e.id)) errors.push(`${tag}: id 重复（与 ${ids.get(e.id)} 相同）`);
    ids.set(e.id, i);
  }
  if (!CATS.includes(e.cat)) errors.push(`${tag}: cat 非法 -> ${e.cat}`);
  else stats[e.cat]++;
  const len = [...e.text].length;
  if (len < 140 || len > 260) errors.push(`${tag}: text 长度 ${len} 字（应 140-260）`);
  if (e.text.includes('</script')) errors.push(`${tag}: text 含 </script>`);
});

console.log('文件:', path.relative(path.join(__dirname, '..'), file));
console.log('条目总数:', LORE.length);
console.log('分类统计:', CATS.map(c => `${c} ${stats[c]}`).join(' / '));
const lens = LORE.map(e => [...e.text].length);
console.log(`text 长度: 最短 ${Math.min(...lens)} 字 / 最长 ${Math.max(...lens)} 字 / 平均 ${(lens.reduce((a, b) => a + b, 0) / lens.length).toFixed(1)} 字`);
console.log('id 唯一:', ids.size === LORE.length ? '是' : '否');

const missing = CATS.filter(c => stats[c] < 14);
if (LORE.length < 84) errors.push(`总数 ${LORE.length} < 84`);
if (missing.length) errors.push(`分类不足 14 条: ${missing.join('、')}`);

if (errors.length) {
  console.log('\n--- 校验失败 (' + errors.length + ') ---');
  errors.forEach(e => console.log(' ✗ ' + e));
  process.exit(1);
} else {
  console.log('\n校验通过：字段齐全、id 唯一、cat 合法、text 长度合规、总数与分类配额均达标。');
  console.log('special: daihan_tugao ->', LORE.find(e => e.id === 'daihan_tugao') ? '存在' : '缺失');
}
