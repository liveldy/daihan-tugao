/* 《代汉涂高》 — 舆图绘事（纯 canvas，无外部资源） */
(function (root) {
  'use strict';

  var TS = 40;

  var PAL = {
    plain: '#ddd1b3', hill: '#cbbd9b', mount: '#ada080', forest: '#a7b08e',
    marsh: '#b9bda6', desert: '#e6d9b8', water: '#a7bcc6', ford: '#c6d0c8'
  };

  function terrainFill(t) { return PAL[t] || PAL.plain; }

  /* —— 图像（有图用图，无图用原矢量绘事） —— */
  function art() { return root.Art; }
  function artGet(kind, name) { var a = art(); return a ? a.get(kind, name) : null; }

  var CITY_KIND = { '都城': 'duzhou', '州治': 'zhouzhi', '重镇': 'zhongzhen', '县城': 'xiancheng', '关隘': 'guanai', '港口': 'gangkou' };

  function drawMountains(ctx, px, py, size) {
    ctx.save();
    ctx.strokeStyle = 'rgba(60,52,42,.55)';
    ctx.fillStyle = 'rgba(96,86,70,.20)';
    ctx.lineWidth = 1.2;
    var n = 3;
    for (var i = 0; i < n; i++) {
      var bx = px + 7 + i * (size - 14) / n;
      var by = py + size - 9;
      var h = size * 0.42;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + size * 0.14, by - h);
      ctx.lineTo(bx + size * 0.28, by);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawForest(ctx, px, py, size) {
    ctx.save();
    ctx.fillStyle = 'rgba(74,86,58,.45)';
    for (var i = 0; i < 5; i++) {
      var x = px + 8 + (i % 3) * 10;
      var y = py + 10 + Math.floor(i / 3) * 12;
      ctx.beginPath();
      ctx.moveTo(x, y + 8);
      ctx.lineTo(x + 4, y);
      ctx.lineTo(x + 8, y + 8);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawWaves(ctx, px, py, size) {
    ctx.save();
    ctx.strokeStyle = 'rgba(58,86,96,.30)';
    ctx.lineWidth = 1;
    for (var i = 0; i < 2; i++) {
      var y = py + 13 + i * 12;
      ctx.beginPath();
      ctx.moveTo(px + 6, y);
      ctx.bezierCurveTo(px + 13, y - 4, px + 20, y + 4, px + 28, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDesert(ctx, px, py, size) {
    ctx.save();
    ctx.strokeStyle = 'rgba(150,126,80,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px + 7, py + size - 12);
    ctx.bezierCurveTo(px + 16, py + size - 22, px + 24, py + size - 4, px + size - 6, py + size - 16);
    ctx.stroke();
    ctx.restore();
  }

  function drawCity(ctx, c, st, selected) {
    var s = st.cities[c.id];
    var fac = root.MAP.FACTIONS[s.owner] || root.MAP.FACTIONS.neutral;
    var px = c.x * TS, py = c.y * TS;
    var img = artGet('city', CITY_KIND[c.kind]);
    ctx.save();
    if (img) {
      var side = TS * 0.86;
      ctx.globalAlpha = 0.96;
      ctx.drawImage(img, px + (TS - side) / 2, py + (TS - side) / 2 - 2, side, side);
      ctx.globalAlpha = 1;
      // 势力小旗，标示归属
      ctx.fillStyle = fac.color;
      ctx.fillRect(px + 2, py + 2, 7, 7);
      ctx.strokeStyle = 'rgba(30,24,18,.55)';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 2.5, py + 2.5, 6, 6);
    } else {
      // 城基
      ctx.fillStyle = fac.color;
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      var w = TS * 0.62, h = TS * 0.5;
      var cx = px + (TS - w) / 2, cy = py + (TS - h) / 2 - 1;
      ctx.rect(cx, cy, w, h);
      ctx.fill();
      // 垛口
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = '#fdf6e8';
      for (var i = 0; i < 4; i++) {
        ctx.fillRect(cx + 2 + i * (w - 4) / 4, cy - 2.5, (w - 6) / 6, 3);
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(30,24,18,.65)';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx, cy, w, h);
    }
    // 城名
    ctx.font = '11px Georgia, "Songti SC", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var label = c.name;
    var ly = py + TS - 5;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(246,240,226,.92)';
    ctx.strokeText(label, px + TS / 2, ly);
    ctx.fillStyle = 'rgba(40,33,26,.95)';
    ctx.fillText(label, px + TS / 2, ly);
    if (s.garrison > 0) {
      ctx.fillStyle = 'rgba(40,33,26,.62)';
      ctx.font = '9px ui-monospace, monospace';
      ctx.fillText('守' + Math.round(s.garrison), px + TS / 2, py + 5);
    }
    ctx.restore();
  }

  function drawUnit(ctx, u, st, isSelected) {
    var px = u.x * TS + TS / 2, py = u.y * TS + TS / 2;
    var fac = root.MAP.FACTIONS[u.faction] || root.MAP.FACTIONS.neutral;
    var gen = u.generalRef;
    var r = TS * 0.34;
    var portrait = gen ? artGet('portrait', gen.id) : null;
    var bunting = artGet('unit', u.type);
    ctx.save();

    if (portrait) {
      // 头像圆徽
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py - 3, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      var d = r * 2;
      ctx.drawImage(portrait, px - r, py - 3 - r, d, d);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(px, py - 3, r, 0, Math.PI * 2);
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.strokeStyle = isSelected ? '#f7e6b8' : fac.color;
      ctx.stroke();
    } else if (bunting) {
      var side = TS * 0.78;
      ctx.drawImage(bunting, px - side / 2, py - side / 2 - 2, side, side);
      if (isSelected) {
        ctx.strokeStyle = '#f7e6b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(px - side / 2, py - side / 2 - 2, side, side);
      }
    } else {
      var ensign = artGet('banner', u.faction);   // 势力旗图（可选）
      if (ensign) {
        var ed = r * 2;                            // 以旗代徽，圆裁同头像
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py - 3, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(ensign, px - r, py - 3 - r, ed, ed);
        ctx.restore();
        ctx.beginPath();
        ctx.arc(px, py - 3, r, 0, Math.PI * 2);
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.strokeStyle = isSelected ? '#f7e6b8' : fac.color;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(px, py - 3, r, 0, Math.PI * 2);
        ctx.fillStyle = fac.color;
        ctx.fill();
        ctx.lineWidth = isSelected ? 3 : 1.6;
        ctx.strokeStyle = isSelected ? '#f7e6b8' : 'rgba(30,24,18,.7)';
        ctx.stroke();
        ctx.fillStyle = '#fff8ec';
        ctx.font = '13px Georgia, "Songti SC", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var mark = gen ? gen.name.charAt(0) : root.Rules.UNITS[u.type].abbr;
        ctx.fillText(mark, px, py - 2);
      }
    }

    // 兵力条
    var bw = TS * 0.62, bh = 3;
    var bx = px - bw / 2, by = py + TS * 0.30;
    ctx.fillStyle = 'rgba(40,33,26,.35)';
    ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = u.hp / u.maxHp > 0.4 ? '#5d7a4e' : '#a8322a';
    ctx.fillRect(bx, by, bw * (u.hp / u.maxHp), bh);
    if (isSelected) { ctx.fillStyle = '#f7e6b8'; ctx.fillRect(bx, by, bw, 1); }
    ctx.restore();
  }

  /* 州域水印：按各州城池重心，淡书州名 */
  var ZHOU_POS = null;
  function zhouLabels() {
    if (ZHOU_POS) { return ZHOU_POS; }
    var acc = {};
    root.MAP.CITIES.forEach(function (c) {
      var a = acc[c.zhou] || (acc[c.zhou] = { x: 0, y: 0, n: 0 });
      a.x += c.x; a.y += c.y; a.n += 1;
    });
    ZHOU_POS = Object.keys(acc).map(function (k) {
      return { name: k, x: (acc[k].x / acc[k].n + 0.5) * TS, y: (acc[k].y / acc[k].n + 0.5) * TS };
    });
    return ZHOU_POS;
  }

  function drawZhou(ctx) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '34px Georgia, "Songti SC", serif';
    ctx.fillStyle = 'rgba(74,60,44,.14)';
    zhouLabels().forEach(function (z) {
      ctx.fillText(z.name, z.x, z.y);
    });
    ctx.restore();
  }

  function draw(ctx, st, view) {
    view = view || {};
    var W = root.MAP.W, H = root.MAP.H;
    ctx.save();
    ctx.clearRect(0, 0, W * TS, H * TS);

    for (var y = 0; y < H; y++) {
      for (var x = 0; x < W; x++) {
        var t = st.map[y][x];
        var px = x * TS, py = y * TS;
        var timg = artGet('terrain', t.terrain);
        ctx.fillStyle = terrainFill(t.terrain);
        ctx.fillRect(px, py, TS, TS);
        if (timg) {
          ctx.drawImage(timg, px, py, TS, TS);
        } else if (t.terrain === 'mount') { drawMountains(ctx, px, py, TS); }
        else if (t.terrain === 'forest') { drawForest(ctx, px, py, TS); }
        else if (t.terrain === 'water') { drawWaves(ctx, px, py, TS); }
        else if (t.terrain === 'desert') { drawDesert(ctx, px, py, TS); }
        else if (t.terrain === 'marsh') {
          ctx.fillStyle = 'rgba(96,104,78,.25)';
          ctx.fillRect(px + 10, py + 14, 6, 3);
          ctx.fillRect(px + 22, py + 22, 7, 3);
        } else if (t.terrain === 'ford') {
          ctx.strokeStyle = 'rgba(70,80,74,.45)';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(px + 6, py + 20); ctx.lineTo(px + TS - 6, py + 20); ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(90,78,60,.14)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + .5, py + .5, TS - 1, TS - 1);
      }
    }

    drawZhou(ctx);

    // 行军区
    (view.reachable || []).forEach(function (p) {
      ctx.fillStyle = 'rgba(84,117,103,.28)';
      ctx.fillRect(p.x * TS + 2, p.y * TS + 2, TS - 4, TS - 4);
      ctx.strokeStyle = 'rgba(84,117,103,.55)';
      ctx.strokeRect(p.x * TS + 2.5, p.y * TS + 2.5, TS - 5, TS - 5);
    });
    // 可攻之敌
    (view.targets || []).forEach(function (u) {
      ctx.strokeStyle = 'rgba(168,50,42,.9)';
      ctx.lineWidth = 3;
      ctx.strokeRect(u.x * TS + 2.5, u.y * TS + 2.5, TS - 5, TS - 5);
    });
    (view.cityTargets || []).forEach(function (c) {
      ctx.strokeStyle = 'rgba(168,50,42,.9)';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(c.x * TS + 2.5, c.y * TS + 2.5, TS - 5, TS - 5);
      ctx.setLineDash([]);
    });

    // 城
    root.MAP.CITIES.forEach(function (c) { drawCity(ctx, c, st, view.selectedCity === c.id); });
    // 军
    st.units.forEach(function (u) {
      if (u.hp <= 0) { return; }
      drawUnit(ctx, u, st, view.selected && view.selected.id === u.id);
    });
    ctx.restore();
  }

  /* 画布以 CSS 缩放显示（内部 1200×800，屏上可能只有 700 余像素），
     故须先把鼠标坐标按 canvas.width / 屏幕宽 换算回内部坐标，再除以格宽。 */
  function hit(e, canvas) {
    var r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) { return null; }
    var kx = canvas.width / r.width;
    var ky = canvas.height / r.height;
    var x = Math.floor(((e.clientX - r.left) * kx) / TS);
    var y = Math.floor(((e.clientY - r.top) * ky) / TS);
    if (x < 0 || y < 0 || x >= root.MAP.W || y >= root.MAP.H) { return null; }
    return { x: x, y: y };
  }

  root.Render = { draw: draw, hit: hit, TS: TS };
})(typeof window !== 'undefined' ? window : globalThis);
