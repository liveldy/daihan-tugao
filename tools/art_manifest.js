/* 生成美术资源清单：assets/img/MANIFEST.md
 *
 * 图像一律自制后按文件名放进对应目录即自动生效；缺图则回退为原有文字与矢量绘制。
 * 用法：node tools/art_manifest.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const FILES = [
  'src/data/map.js', 'src/data/factions.js',
  'src/data/generals_1.js', 'src/data/generals_2.js', 'src/data/generals_3.js', 'src/data/generals_4.js',
  'src/core/rules.js'
];

const sandbox = {};
sandbox.globalThis = sandbox;
sandbox.window = sandbox;
sandbox.console = console;
sandbox.Math = Math; sandbox.Date = Date; sandbox.JSON = JSON;
const ctx = vm.createContext(sandbox);
for (const f of FILES) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.error('缺文件：' + f); process.exit(1); }
  vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
}

const GEN = Object.assign({}, sandbox.GENERALS, sandbox.GENERALS_PART1, sandbox.GENERALS_PART2,
  sandbox.GENERALS_PART3, sandbox.GENERALS_PART4);
const MAP = sandbox.MAP;
const Rules = sandbox.Rules;
const FD = sandbox.FACTIONS_DATA;

const lines = [];
const w = (s) => lines.push(s == null ? '' : s);

w('# 美术资源清单');
w();
w('本目录下的图像**放进去即自动生效**；缺图时游戏自动回退为原有的文字与矢量绘制，不会报错、不会留白框。');
w();
w('后缀探测顺序：`.png` → `.jpg` → `.webp`，先找到的先生效。');
w();
w('本文件由 `node tools/art_manifest.js` 生成，可随时重跑。');
w();

w('## 一、人物头像 `assets/img/portraits/<武将id>.png`');
w();
w('用途：择主界面的君主头像、侧栏「军情／人物」页的人物卡与部队行、舆图上该将所统部队的圆徽、点击敌军时的「敌情」浮牌。');
w();
w('建议 128×128 或 256×256 正方，正面半身，透明或素底。');
w();
w('君主另可用君主 key 作后备文件名（如 `zhangjiao.png`）；找不到君主 key 的图时，自动回退找该君主对应的武将 id。');
w();
w('君主 key（' + Object.keys(FD.LORDS).length + ' 个）：');
w();
w('```');
w(Object.keys(FD.LORDS).join(' '));
w('```');
w();
w('武将 id（' + Object.keys(GEN).length + ' 个）：');
w();
w('```');
const ids = Object.keys(GEN).sort();
for (let i = 0; i < ids.length; i += 8) {
  w(ids.slice(i, i + 8).map(id => id + '.png').join('  '));
}
w('```');
w();

w('## 二、部队标记 `assets/img/units/<兵种id>.png`');
w();
w('用途：舆图上部队标记底图。**若该部队有主将且该将有头像，则优先用头像**；无头像时才用兵种图；两者皆无，才用原有的圆徽文字。');
w();
w('建议 64×64 正方，主体居中。');
w();
w('| id | 名称 | 建议文件名 |');
w('|---|---|---|');
Object.keys(Rules.UNITS).forEach(k => { w('| `' + k + '` | ' + Rules.UNITS[k].name + ' | `' + k + '.png` |'); });
w();

w('## 三、地形贴图 `assets/img/terrain/<地形key>.png`');
w();
w('用途：舆图上平铺在对应格子。缺图则用原有的矢量线与点纹理。');
w();
w('建议与原格同宽的正方形（当前格宽 40 CSS 像素、内部 1200×800），无缝平铺为佳。');
w();
w('| key | 名称 | 舆图字符 | 移动消耗 | 防守加成 | 建议文件名 |');
w('|---|---|---|---|---|---|');
const TERRAIN = (MAP.TERRAIN || {});
Object.keys(TERRAIN).forEach(ch => {
  const t = TERRAIN[ch];
  const k = t.key || ch;
  w('| `' + k + '` | ' + (t.name || k) + ' | `' + ch + '` | ' + (t.cost != null ? t.cost : '—') +
    ' | ' + (t.def != null ? Math.round(t.def * 100) + '%' : '—') +
    ' | `' + k + '.png` |');
});
w();

w('## 四、势力旗 `assets/img/banners/<势力key>.png`（可选）');
w();
w('键：' + Object.keys(MAP.FACTIONS).join(' '));
w();
w('建议 32×32。');
w();

w('## 五、城池图形 `assets/img/cities/<kind>.png`（可选）');
w();
w('用途：舆图上的城池图形；缺图则用原有的方城与垛口。');
w();
const KINDS = { '都城': 'duzhou', '州治': 'zhouzhi', '重镇': 'zhongzhen', '县城': 'xiancheng', '关隘': 'guanai', '港口': 'gangkou' };
w('| 城中种类 | 建议文件名 | 城数 |');
w('|---|---|---|');
Object.keys(KINDS).forEach(k => {
  const n = MAP.CITIES.filter(c => c.kind === k).length;
  w('| ' + k + ' | `' + KINDS[k] + '.png` | ' + n + ' |');
});
w();
w('建议 48×48 或与格同宽，主体居中，四周留白少许。');
w();

const outDir = path.join(ROOT, 'assets', 'img');
fs.mkdirSync(outDir, { recursive: true });
for (const d of ['portraits', 'units', 'terrain', 'banners', 'cities']) {
  fs.mkdirSync(path.join(outDir, d), { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'MANIFEST.md'), lines.join('\n') + '\n', 'utf8');
console.log('已写出 assets/img/MANIFEST.md');
console.log('  头像 ' + ids.length + ' 张 + 君主后备 ' + Object.keys(FD.LORDS).length + ' 张');
console.log('  兵种 ' + Object.keys(Rules.UNITS).length + ' 张；地形 ' + Object.keys(TERRAIN).length + ' 张；势力旗 ' + Object.keys(MAP.FACTIONS).length + ' 张；城池 ' + Object.keys(KINDS).length + ' 张');
