/* 《代汉涂高》 — 志传
 * 剧情按章回顺序推进：每回合检查当前应至之一章，条件满足则呈上。
 */
(function (root) {
  'use strict';

  var MAP = root.MAP;

  function allStories() {
    var s = {};
    ['STORIES', 'STORIES_PART1', 'STORIES_PART2', 'STORIES_PART3',
      'STORIES_PART4', 'STORIES_PART5', 'STORIES_PART6', 'STORIES_PART7'].forEach(function (k) {
      if (root[k]) { Object.keys(root[k]).forEach(function (id) { s[id] = root[k][id]; }); }
    });
    return s;
  }

  function storyFor(lordKey) {
    return allStories()[lordKey] || null;
  }

  function hostileCities(st) {
    var n = 0;
    Object.keys(st.cities).forEach(function (c) {
      var o = st.cities[c].owner;
      if (o !== st.player && o !== 'neutral') { n++; }
    });
    return n;
  }

  function satisfied(st, trig) {
    if (!trig) { return false; }
    if (trig.requires && !trig.requires.every(function (f) { return st.flags[f]; })) { return false; }
    if (trig.start) { return st.turn >= 1; }
    if (trig.turn != null) { return st.turn >= trig.turn; }
    if (trig.year != null) { return st.year >= trig.year; }
    if (trig.flag) { return !!st.flags[trig.flag]; }
    if (trig.city) { return st.cities[trig.city] && st.cities[trig.city].owner === st.player; }
    if (trig.lost) { return !!st.flags['lost_' + trig.lost]; }
    if (trig.battleWin != null) { return st.stats.battlesWon >= trig.battleWin; }
    if (trig.unify != null) {
      var total = Object.keys(st.cities).length;
      return E.cities(st, st.player) / total >= trig.unify;
    }
    if (trig.enemyCities != null) { return hostileCities(st) <= trig.enemyCities; }
    return false;
  }

  var E = {
    cities: function (st, k) {
      return Object.keys(st.cities).filter(function (c) { return st.cities[c].owner === k; }).length;
    }
  };

  /* 每回合取出当前应至之一章；返回 null 表示无事 */
  function nextChapter(st) {
    var story = storyFor(st.lordKey);
    if (!story) { return null; }
    var idx = st.chapters.length;
    if (idx >= story.chapters.length) { return null; }
    var ch = story.chapters[idx];
    if (!ch) { return null; }
    if (!satisfied(st, ch.trigger)) { return null; }
    return ch;
  }

  function showChapter(st, ch, choiceIndex) {
    st.chapters.push(ch.id);
    var out = { chapter: ch, effects: [] };
    if (ch.choice && ch.choice.options && ch.choice.options.length) {
      var pick = (choiceIndex == null) ? 0 : choiceIndex;
      var opt = ch.choice.options[Math.min(pick, ch.choice.options.length - 1)];
      if (opt && opt.effect) { applyEffect(st, opt.effect, out); }
    }
    if (ch.reward) { applyEffect(st, ch.reward, out); }
    if (ch.penalty) { applyEffect(st, ch.penalty, out); }
    return out;
  }

  function applyEffect(st, ef, out) {
    if (!ef) { return out; }
    var ENG = root.Engine;
    var f = st.factions[st.player];
    var notes = (out && out.effects) || [];
    function say(t) { notes.push(t); }
    if (ef.gold) { f.gold = Math.max(0, f.gold + ef.gold); say((ef.gold > 0 ? '金帛 +' : '金帛 ') + ef.gold); }
    if (ef.food) { f.food = Math.max(0, f.food + ef.food); say((ef.food > 0 ? '粮秣 +' : '粮秣 ') + ef.food); }
    if (ef.troops) {
      // 补员：均摊于己方部队
      var mine = st.units.filter(function (u) { return u.faction === st.player; });
      if (mine.length) {
        var each = Math.round(ef.troops / mine.length);
        mine.forEach(function (u) { u.hp = Math.max(1, Math.min(u.maxHp, u.hp + each)); });
      }
      say('兵马 ' + ef.troops);
    }
    if (ef.morale) {
      st.units.filter(function (u) { return u.faction === st.player; }).forEach(function (u) {
        u.morale = Math.max(10, Math.min(100, u.morale + ef.morale));
      });
      say('士气 +' + ef.morale);
    }
    if (ef.flag) { st.flags[ef.flag] = true; }
    if (ef.clearFlag) { delete st.flags[ef.clearFlag]; }
    if (ef.unlockGeneral) {
      var g = st.generals[ef.unlockGeneral];
      if (!g) { st.generals[ef.unlockGeneral] = { id: ef.unlockGeneral, owner: st.player, status: 'wild', city: null, loyalty: 75 }; }
      else { g.owner = st.player; g.status = 'wild'; g.loyalty = 80; }
      var d = ENG.allGenerals()[ef.unlockGeneral];
      say((d ? d.name : ef.unlockGeneral) + '来归');
      st.unlocked[ef.unlockGeneral] = true;
    }
    if (ef.loreEntry) {
      st.lore[ef.loreEntry] = true;
      st.unlocked['lore_' + ef.loreEntry] = true;
    }
    if (ef.captureCity && st.cities[ef.captureCity]) {
      var c = st.cities[ef.captureCity];
      ENG.captureCity(st, c, st.player);
      say(c.name + '归附');
    }
    if (ef.freeUnit && engsafe()) {
      var n = ef.freeUnit.count || 1;
      var cs = Object.keys(st.cities).filter(function (c) { return st.cities[c].owner === st.player; });
      for (var i = 0; i < n && cs.length; i++) {
        var city = st.cities[cs[i % cs.length]];
        var tiles = ENG.freeTilesNear(st, city.x, city.y);
        if (!tiles.length) { continue; }
        var u = ENG.spawnUnit(st, st.player, city.id, ef.freeUnit.type, null);
        u.x = tiles[0].x; u.y = tiles[0].y;
      }
      say('得' + (root.Rules.UNITS[ef.freeUnit.type] ? root.Rules.UNITS[ef.freeUnit.type].name : ef.freeUnit.type) + '×' + n);
    }
    if (ef.enemyTroops) {
      // 单部减员以其兵力之六成为限，免致一击而溃
      Object.keys(st.factions).forEach(function (k) {
        if (k === st.player || !st.factions[k].alive) { return; }
        st.units.filter(function (u) { return u.faction === k; }).forEach(function (u) {
          if (ef.enemyTroops < 0) {
            u.hp = Math.max(1, u.hp - Math.min(-ef.enemyTroops, Math.round(u.maxHp * 0.6)));
          } else {
            u.hp = Math.min(u.maxHp, u.hp + ef.enemyTroops);
          }
        });
      });
      say(ef.enemyTroops < 0 ? '敌军大损' : '敌军得援');
    }
    if (typeof ef.relation === 'number' && ef.relation !== 0) {
      // 数据中的 relation 为「天下声望」之升降
      f.prestige = Math.max(0, Math.min(100, f.prestige + ef.relation));
      say('威望 ' + (ef.relation > 0 ? '+' : '') + ef.relation);
    } else if (ef.relation && st.factions[ef.relation.who]) {
      var cur = root.Engine.relationOf(st, st.player, ef.relation.who);
      root.Engine.setRelation(st, st.player, ef.relation.who, cur + (ef.relation.value || 0));
      say('邦交 ' + (ef.relation.value > 0 ? '+' : '') + ef.relation.value);
    }
    if (ef.disaster) { st.flags['disaster_' + ef.disaster] = true; say('灾异：' + ef.disaster); }
    return out;
  }

  function engsafe() { return !!root.Engine; }

  /* 结局文本 */
  function endingFor(st) {
    var story = storyFor(st.lordKey);
    if (!story || !story.endings) { return null; }
    return st.result && st.result.win ? story.endings.win : story.endings.lose;
  }

  root.Story = {
    allStories: allStories,
    storyFor: storyFor,
    nextChapter: nextChapter,
    showChapter: showChapter,
    applyEffect: applyEffect,
    endingFor: endingFor,
    hostileCities: hostileCities
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.Story; }
})(typeof window !== 'undefined' ? window : globalThis);
