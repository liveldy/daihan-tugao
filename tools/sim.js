/* 无头推演：在 Node 中加载全部脚本，跑一局，检查引擎是否自洽。
 * 用法：node tools/sim.js [君主key] [回合数] [剧本id] [关卡序号，自 0 起]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const FILES = [
  'src/data/map.js', 'src/data/factions.js',
  'src/data/scenarios_1.js', 'src/data/scenarios_2.js', 'src/data/scenarios_3.js',
  'src/data/progress.js',
  'src/data/politics_1.js',
  'src/data/generals_1.js', 'src/data/generals_2.js', 'src/data/generals_3.js', 'src/data/generals_4.js',
  'src/data/lore.js', 'src/data/clans_1.js', 'src/data/clans_2.js',
  'src/data/stories_1.js', 'src/data/stories_2.js', 'src/data/stories_3.js',
  'src/data/stories_4.js', 'src/data/stories_5.js', 'src/data/stories_6.js', 'src/data/stories_7.js',
  'src/core/rules.js', 'src/core/campaign.js', 'src/core/politics.js', 'src/core/population.js', 'src/core/clans.js', 'src/core/engine.js', 'src/core/story.js',
  'src/core/tutor.js', 'src/core/ai.js'
];

const sandbox = {};
sandbox.globalThis = sandbox;
sandbox.window = sandbox;   // 数据文件直书 window.X，须补一个 window
sandbox.console = console;
sandbox.Math = Math; sandbox.Date = Date; sandbox.JSON = JSON;
const ctx = vm.createContext(sandbox);

const loaded = [], missing = [];
for (const f of FILES) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { missing.push(f); continue; }
  try {
    vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
    loaded.push(f);
  } catch (e) {
    console.error('载入失败：' + f + ' → ' + e.message);
    process.exit(1);
  }
}
console.log('已载入 ' + loaded.length + ' 个脚本' + (missing.length ? '；缺失 ' + missing.length + '：' + missing.join(', ') : ''));

const generals = Object.assign({}, sandbox.GENERALS, sandbox.GENERALS_PART1, sandbox.GENERALS_PART2,
  sandbox.GENERALS_PART3, sandbox.GENERALS_PART4, sandbox.GENERALS_PART5, sandbox.GENERALS_PART6);
const stories = Object.assign({}, sandbox.STORIES, sandbox.STORIES_PART1, sandbox.STORIES_PART2,
  sandbox.STORIES_PART3, sandbox.STORIES_PART4, sandbox.STORIES_PART5, sandbox.STORIES_PART6,
  sandbox.STORIES_PART7);
console.log('武将 ' + Object.keys(generals).length + ' 人；故事线 ' + Object.keys(stories).length + ' 条；典籍 ' + ((sandbox.LORE || []).length) + ' 条');

const MAPFACTIONS = sandbox.MAP.FACTIONS;
const lordKey = process.argv[2] || 'caocao';
const turns = parseInt(process.argv[3] || '40', 10);
const scenarioId = process.argv[4] || null;
const stageIdx = process.argv[5] != null ? parseInt(process.argv[5], 10) : null;

const Eng = sandbox.Engine, Story = sandbox.Story, Rules = sandbox.Rules;
let st;
try {
  st = Eng.newGame({ lord: lordKey, scenario: scenarioId, stage: stageIdx, seed: 424242 });
} catch (e) {
  console.error('开局失败：' + e.message);
  process.exit(1);
}
console.log('开局：' + st.lord.name + (st.scenario ? '｜' + st.scenario.name : '') +
  (st.stage ? '｜第 ' + (st.stage.index + 1) + '／' + st.stage.count + ' 关·' + st.stage.name +
    '｜目标 ' + sandbox.Campaign.goalText(st.stage.goal) : '') + ' @ ' + st.era +
  '，城池 ' + Eng.countCities(st, st.player) +
  '，部曲 ' + st.units.filter(u => u.faction === st.player).length +
  '，全图势力 ' + Object.keys(st.factions).filter(k => st.factions[k].alive).length);

let chapters = 0, errors = 0;
for (let t = 0; t < turns && st.phase !== 'over'; t++) {
  let ch = Story.nextChapter(st);
  let guard = 0;
  while (ch && guard++ < 40) {
    chapters++;
    Story.showChapter(st, ch, 0);
    ch = Story.nextChapter(st);
  }
  if (process.env.SIM_AI_PLAYER) {
    // 以庙算驱动玩家，检验「集中兵力」能否成一统之业
    sandbox.AI.takeTurn(st, st.player);
    Eng.startTurn(st);
    if (Eng.checkStage(st)) { st.phase = 'over'; break; }
    st.phase = 'player';
    if (t % 20 === 19) {
      const board = Object.keys(st.factions).filter(k => st.factions[k].alive)
        .map(k => MAPFACTIONS[k].name + Eng.countCities(st, k))
        .sort((a, b) => parseInt(b.replace(/\D/g, '')) - parseInt(a.replace(/\D/g, '')))
        .slice(0, 5).join(' ');
      console.log('  T' + st.turn + ' ' + st.year + '年 | ' + board);
    }
    continue;
  }

  // 简易玩家：先征募，再全军向最近敌城推进
  const ownCityIds = Object.keys(st.cities).filter(k => st.cities[k].owner === st.player);
  const cap = ownCityIds.map(k => st.cities[k]).find(c => c.kind === '都城' || c.kind === '州治') || st.cities[ownCityIds[0]];
  if (cap) {
    let guard2 = 0;
    while (st.factions[st.player].gold > 260 &&
           st.units.filter(u => u.faction === st.player).length < 12 && guard2++ < 4) {
      const types = ['inf', 'spear', 'archer', 'cav', 'pike', 'crossbow', 'siege'];
      const t = types[Math.floor(Math.random() * types.length)];
      const r = Eng.recruit(st, cap.id, t, null);
      if (!r.ok) break;
    }
  }
  const mine = st.units.filter(u => u.faction === st.player && u.hp > 0);
  for (const u of mine) {
    if (st.phase === 'over') break;
    /* 君主坐镇：君在则国在，君主阵殁即败（见 engine.lordDown），故本推演不遣君主陷阵 */
    u.acted = false; if (u.general === st.lordGeneral) { u.acted = true; u.moveLeft = 0; continue; }
    u.moveLeft = Rules.statsOf(u, u.generalRef).move;
    const tgt = Rules.targetsFor(st, u)[0];
    if (tgt) { Eng.attackUnit(st, u.id, tgt.id); continue; }
    const opts = Rules.reachable(st, u);
    if (!opts.length) continue;
    const enemy = Object.keys(st.cities).map(k => st.cities[k]).filter(c => c.owner !== st.player && c.owner !== 'neutral');
    if (!enemy.length) { st.result = { win: true, faction: st.player }; break; }
    let best = null, bs = 1e9;
    for (const p of opts) {
      let d = 1e9;
      for (const c of enemy) d = Math.min(d, sandbox.MAP.dist(p.x, p.y, c.x, c.y));
      if (d < bs) { bs = d; best = p; }
    }
    if (best) Eng.moveTo(st, u.id, best.x, best.y);
  }
  const r = Eng.endTurn(st);
  // 朝局：政争当场决断，议政与立储亦循常例为之（一君之朝，不作壁上观）
  let guard3 = 0;
  while (Eng.pendingPolitics(st) && guard3++ < 40) { Eng.resolvePolitics(st, 0); }
  if (st.turn === 4 && Eng.heirCandidates(st).length) { Eng.setHeir(st, Eng.heirCandidates(st)[0].id); }
  if (st.turn % 3 === 0) { const tp = Eng.courtTopics(st).filter(t => t.open)[0]; if (tp) { Eng.council(st, tp.id, 0); } }
  if (!r.ok) { console.error('回合结束异常：' + r.msg); errors++; }
}
console.log('推演 ' + turns + ' 回合：年份至 ' + st.year + '，我方城池 ' + Eng.countCities(st, st.player) +
  '，部曲 ' + st.units.filter(u => u.faction === st.player).length +
  '，金 ' + Math.round(st.factions[st.player].gold) + '，粮 ' + Math.round(st.factions[st.player].food) +
  '，剧情章回 ' + chapters + '，朝局（党争 ' + Math.round(st.court.strife) + '／名分 ' + Math.round(st.court.legit) + '／储 ' + (st.court.heir ? st.court.heir.name : '未定') + '）' +
  '，户口 ' + Math.round(Eng.popTotal(st, st.player) * 10) / 10 + ' 万口' +
  '，结局 ' + (st.result ? (st.result.win ? '胜' : '败') + (st.result.reason ? '（' + st.result.reason + (st.result.how ? '·' + st.result.how : '') + '）' : '') : '未决'));
if (st.result) {
  const e = Story.endingFor(st);
  console.log('结局文案：' + (e ? e.title : '（缺）'));
}
process.exit(errors ? 1 : 0);
