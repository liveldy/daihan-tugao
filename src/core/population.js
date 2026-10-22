/* 《代汉涂高》 — 户口
 * 汉末之世，户口为立国之本：土有人民，然后有租赋，有兵卒。
 * 本模块司四事：一、依城池之岁入与等第推定其户口之基数；二、每季户口之自然消长；
 * 三、征兵所耗之户口（大举征发则户口骤减，须以休养生息复之）；四、户口之效（户口盛则岁入足，
 * 户口凋敝则租赋不登）。
 * 户口以「万口」计（如「三十七万口」即 370000 人）。
 * 不含 DOM 依赖，可在 Node 下推演。
 */
(function (root) {
  'use strict';

  var MAP = root.MAP;

  /* 城池等第之户口倍率：大邑人稠，关隘民稀 */
  var KIND_W = {
    '都城': 2.2, '州治': 1.7, '重镇': 1.3, '港口': 1.3, '县城': 0.9, '关隘': 0.4
  };

  /* 一支部曲之兵力所当之户口（万口）：一兵约当四十口之家，故二百五十兵为万口；
   * 计口抽丁，在途与老弱亦耗，故倍之，实用一百二十五兵为万口 */
  var PER_HP = 1 / 250;      // 兵力 110 → 0.44 万口
  var LEVY = 2;              // 征发之耗：调发在途、老弱不任者亦耗，故倍之
  var REST_GOLD = 200;       // 休养生息之费
  var REST_CD = 4;           // 休养生息之冷却（回合）

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function mapCity(cityId) { return MAP.CITY_INDEX[cityId] || null; }

  /* 基数：以岁入（金、粮）与该城等第推之，取整至千口 */
  function base(cityIdOrCity) {
    var c = typeof cityIdOrCity === 'string' ? mapCity(cityIdOrCity) : cityIdOrCity;
    if (!c) { return 10; }
    var w = KIND_W[c.kind] || 1;
    var v = ((c.gold || 30) + (c.food || 30)) / 10 * w;
    return Math.round(v * 10) / 10;
  }

  function of(st, cityId) {
    var c = st.cities[cityId];
    if (!c) { return 0; }
    return c.pop == null ? base(c) : c.pop;
  }

  function total(st, faction) {
    var t = 0;
    Object.keys(st.cities).forEach(function (k) {
      if (st.cities[k].owner === faction) { t += of(st, k); }
    });
    return t;
  }

  /* 户口之效：户口如常则岁入如常，户口凋敝则租赋不登，户口蕃息则仓廪稍丰。
   * 取 0.55—1.15 之间，免得一城之户口牵动全局 */
  function popFactor(st, c) {
    var b = base(c.id);
    if (!b) { return 1; }
    return clamp(0.75 + 0.25 * (of(st, c.id) / b), 0.55, 1.15);
  }

  /* 每季自然之增减：民心厚则户口滋息，骚动甚则流亡，战乱之地尤甚 */
  function rate(st, c) {
    var morale = c.morale == null ? 70 : c.morale;
    var unrest = c.unrest || 0;
    var r = 0.020 * (morale / 100) - 0.004 - unrest / 1500;
    if (c.siegeTurn === st.turn) { r -= 0.01; }          // 新遭兵燹
    return clamp(r, -0.03, 0.025);
  }

  /* 每季之变（由 Engine.startTurn 逐城调用），归其增减之数 */
  function tick(st, c) {
    var b = base(c.id);
    var before = of(st, c.id);
    var r = rate(st, c);
    var after = Math.round((before * (1 + r)) * 10) / 10;
    /* 户口之上限：岁入之基的三倍（土地所出有尽，非可无限孳生） */
    var cap = Math.round(b * 3 * 10) / 10;
    if (after > cap) { after = Math.max(before, cap); }
    c.pop = Math.max(0.2, after);
    c.popBase = b;
    return { delta: Math.round((c.pop - before) * 10) / 10, rate: r };
  }

  /* 征兵所耗之户口 */
  function levy(type) {
    var def = root.Rules.UNITS[type];
    if (!def) { return 0; }
    return Math.round(def.hp * PER_HP * LEVY * 10) / 10;
  }

  /* 户口是否足以征募：须留三倍之数，免得一城抽尽、田地无人可耕 */
  function canRecruit(st, cityId, type) {
    var need = levy(type);
    var have = of(st, cityId);
    if (have < need * 3) {
      return { ok: false, need: need, have: have, why: '户口不足（今 ' + num(have) + ' 万口，须 ' + num(need * 3) + ' 万口以上）' };
    }
    return { ok: true, need: need, have: have };
  }

  /* 实耗户口：既征之后，民心稍损、骚动稍起；
   * 大举征发（抽丁过半，户口不及基数之半）则户口骤减、田野荒芜、民心大损 */
  function spend(st, cityId, type) {
    var c = st.cities[cityId];
    var need = levy(type);
    var before = of(st, cityId);
    var b = base(c.id);
    c.pop = Math.max(0.2, before - need);
    c.morale = clamp((c.morale || 70) - 1, 0, 100);
    c.unrest = clamp((c.unrest || 0) + 2, 0, 100);
    var heavy = (c.pop < b * 0.5 && before >= b * 0.5);
    if (heavy) {
      c.morale = clamp(c.morale - 4, 0, 100);
      c.unrest = clamp(c.unrest + 8, 0, 100);
    }
    return { need: need, before: before, after: c.pop, heavy: heavy, base: b };
  }

  /* 休养生息：罢兵息民，劝课农桑，户口自复 */
  function restInfo(st, cityId) {
    var c = st.cities[cityId];
    if (!c) { return { ok: false, why: '无此城' }; }
    var cd = c.lastRest == null ? -99 : c.lastRest;
    if (st.turn - cd < REST_CD) {
      return { ok: false, why: '此城方休养未久，尚须 ' + (REST_CD - (st.turn - cd)) + ' 回合' };
    }
    var f = st.factions[c.owner];
    if (c.owner !== st.player) { return { ok: false, why: '非我之城' }; }
    if (!f || f.gold < REST_GOLD) { return { ok: false, why: '金帛不足（需 ' + REST_GOLD + '）' }; }
    var b = base(c.id);
    return {
      ok: true, cost: REST_GOLD, base: b, now: of(st, cityId),
      gain: gain(st, cityId), why: ''
    };
  }

  /* 休养生息所得之户口：以基数为度，户口凋敝者增之速，户口已蕃者增之缓 */
  function gain(st, cityId) {
    var c = st.cities[cityId];
    var b = base(c.id);
    var now = of(st, cityId);
    var g = Math.max(0.4, b * 0.06 * (1 - Math.min(0.75, now / (b * 3))));
    if (now >= b * 2.9) { g = 0.2; }
    return Math.round(g * 10) / 10;
  }

  function rest(st, cityId) {
    var info = restInfo(st, cityId);
    if (!info.ok) { return { ok: false, msg: info.why }; }
    var c = st.cities[cityId];
    var f = st.factions[c.owner];
    f.gold -= REST_GOLD;
    c.pop = Math.round((of(st, cityId) + info.gain) * 10) / 10;
    c.morale = clamp((c.morale || 70) + 5, 0, 100);
    c.unrest = clamp((c.unrest || 0) - 12, 0, 100);
    c.lastRest = st.turn;
    var E = root.Engine;
    if (E && E.log) {
      E.log(st, c.name + '罢兵息民，劝课农桑，户口增 ' + num(info.gain) + ' 万口。', 'good');
    }
    return { ok: true, msg: c.name + '休养生息：户口 +' + num(info.gain) + ' 万，民心 +5，骚动 −12', data: info };
  }

  /* 户口之文：万口取整，十万以上只称万 */
  function num(v) {
    if (v == null) { return '—'; }
    if (v >= 100) { return String(Math.round(v)) + ' 万'; }
    return String(Math.round(v * 10) / 10) + ' 万';
  }

  root.Population = {
    KIND_W: KIND_W,
    PER_HP: PER_HP,
    LEVY: LEVY,
    REST_GOLD: REST_GOLD,
    REST_CD: REST_CD,
    base: base,
    of: of,
    total: total,
    popFactor: popFactor,
    rate: rate,
    tick: tick,
    levy: levy,
    canRecruit: canRecruit,
    spend: spend,
    rest: rest,
    restInfo: restInfo,
    gain: gain,
    num: num
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.Population; }
})(typeof window !== 'undefined' ? window : globalThis);
