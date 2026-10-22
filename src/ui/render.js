/* 《代汉涂高》 — 舆图绘事（纯 canvas，无外部资源）
 * 舆图为尖顶正六边形网格：奇数行相对偶数行右移半格。
 * 一格之内，画、点、算三者同出一源（HEX 布局），故所画即所点。
 */
(function (root) {
  'use strict';

  var SQ3 = Math.sqrt(3);

  var PAL = {
    plain: '#ddd1b3', hill: '#cbbd9b', mount: '#ada080', forest: '#a7b08e',
    marsh: '#b9bda6', desert: '#e6d9b8', water: '#a7bcc6', ford: '#c6d0c8'
  };

  function terrainFill(t) { return PAL[t] || PAL.plain; }

  /* —— 图像（有图用图，无图用原矢量绘事） —— */
  function art() { return root.Art; }
  function artGet(kind, name) { var a = art(); return a ? a.get(kind, name) : null; }

  var CITY_KIND = { '都城': 'duzhou', '州治': 'zhouzhi', '重镇': 'zhongzhen', '县城': 'xiancheng', '关隘': 'guanai', '港口': 'gangkou' };

  /* ————— 六边形布局 —————
   * s  外接圆半径（心至角）
   * w  横向对边距 = √3·s ； h 纵向对角距 = 2s ； ystep 行距 = 1.5s
   * 全图宽 = (W + 0.5)·w （奇数行各多探出半格）；全图高 = (H-1)·ystep + h
   */
  function layout(ctx) {
    var W = root.MAP.W, H = root.MAP.H;
    var cw = ctx.canvas.width, ch = ctx.canvas.height;
    var s = Math.min(cw / (SQ3 * (W + 0.5)), ch / (1.5 * (H - 1) + 2));
    var w = SQ3 * s, h = 2 * s, ystep = 1.5 * s;
    return {
      s: s, w: w, h: h, ystep: ystep,
      ox: (cw - (W + 0.5) * w) / 2,
      oy: (ch - ((H - 1) * ystep + h)) / 2
    };
  }

  /* 格心（像素）：奇数行右移半格 */
  function center(L, x, y) {
    return {
      x: L.ox + (x + ((y & 1) ? 0.5 : 0) + 0.5) * L.w,
      y: L.oy + y * L.ystep + L.s
    };
  }

  function hexPath(ctx, cx, cy, s) {
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      var a = Math.PI / 180 * (60 * i + 30);          // 尖顶：顶点在上下
      var px = cx + s * Math.cos(a), py = cy + s * Math.sin(a);
      if (i === 0) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
    }
    ctx.closePath();
  }

  /* 像素 → 格：先化为轴向坐标，再作立方取整，回推偏置坐标 */
  function tileAtPixel(L, px, py) {
    var X = px - (L.ox + L.w / 2);
    var Y = py - (L.oy + L.s);
    var q = (SQ3 / 3 * X - Y / 3) / L.s;
    var r = (2 / 3 * Y) / L.s;
    var fx = q, fz = r, fy = -q - r;
    var rx = Math.round(fx), ry = Math.round(fy), rz = Math.round(fz);
    var dx = Math.abs(rx - fx), dy = Math.abs(ry - fy), dz = Math.abs(rz - fz);
    if (dx > dy && dx > dz) { rx = -ry - rz; }
    else if (dy > dz) { ry = -rx - rz; }
    else { rz = -rx - ry; }
    var col = rx + ((rz - (rz & 1)) >> 1);
    var row = rz;
    if (row < 0 || row >= root.MAP.H || col < 0 || col >= root.MAP.W) { return null; }
    return { x: col, y: row };
  }

  /* —— 地形纹样 —— */
  function drawMountains(ctx, cx, cy, s) {
    ctx.save();
    ctx.strokeStyle = 'rgba(60,52,42,.55)';
    ctx.fillStyle = 'rgba(96,86,70,.20)';
    ctx.lineWidth = 1.2;
    var n = 3;
    for (var i = 0; i < n; i++) {
      var bx = cx - s * 0.78 + i * (s * 1.56) / n;
      var by = cy + s * 0.42;
      var h = s * 0.78;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + s * 0.26, by - h);
      ctx.lineTo(bx + s * 0.52, by);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawForest(ctx, cx, cy, s) {
    ctx.save();
    ctx.fillStyle = 'rgba(74,86,58,.45)';
    for (var i = 0; i < 5; i++) {
      var x = cx - s * 0.62 + (i % 3) * s * 0.5;
      var y = cy - s * 0.5 + Math.floor(i / 3) * s * 0.62;
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.42);
      ctx.lineTo(x + s * 0.2, y);
      ctx.lineTo(x + s * 0.4, y + s * 0.42);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawWaves(ctx, cx, cy, s) {
    ctx.save();
    ctx.strokeStyle = 'rgba(58,86,96,.30)';
    ctx.lineWidth = 1;
    for (var i = -1; i <= 1; i++) {
      var y = cy + i * s * 0.44;
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.6, y);
      ctx.bezierCurveTo(cx - s * 0.25, y - s * 0.2, cx + s * 0.1, y + s * 0.2, cx + s * 0.6, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDesert(ctx, cx, cy, s) {
    ctx.save();
    ctx.strokeStyle = 'rgba(150,126,80,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.62, cy + s * 0.3);
    ctx.bezierCurveTo(cx - s * 0.2, cy - s * 0.35, cx + s * 0.2, cy + s * 0.5, cx + s * 0.62, cy - s * 0.18);
    ctx.stroke();
    ctx.restore();
  }

  function drawMarsh(ctx, cx, cy, s) {
    ctx.save();
    ctx.fillStyle = 'rgba(96,104,78,.28)';
    ctx.fillRect(cx - s * 0.42, cy - s * 0.18, s * 0.3, s * 0.14);
    ctx.fillRect(cx + s * 0.02, cy + s * 0.16, s * 0.34, s * 0.14);
    ctx.strokeStyle = 'rgba(96,104,78,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - s * 0.3, cy + s * 0.36); ctx.lineTo(cx + s * 0.3, cy + s * 0.36); ctx.stroke();
    ctx.restore();
  }

  function drawFord(ctx, cx, cy, s) {
    ctx.save();
    ctx.strokeStyle = 'rgba(70,80,74,.5)';
    ctx.lineWidth = 1.4;
    for (var i = -1; i <= 1; i++) {
      var x = cx + i * s * 0.34;
      ctx.beginPath();
      ctx.moveTo(x, cy - s * 0.5);
      ctx.lineTo(x, cy + s * 0.5);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* —— 城池 —— */
  function drawCity(ctx, L, c, st, selected) {
    var s = st.cities[c.id];
    var fac = root.MAP.FACTIONS[s.owner] || root.MAP.FACTIONS.neutral;
    var p = center(L, c.x, c.y);
    var cx = p.x, cy = p.y;
    var img = artGet('city', CITY_KIND[c.kind]);
    ctx.save();
    if (img) {
      var side = L.w * 0.84;
      ctx.save();
      hexPath(ctx, cx, cy, L.s * 0.9);
      ctx.clip();
      ctx.globalAlpha = 0.96;
      ctx.drawImage(img, cx - side / 2, cy - side / 2 - 2, side, side);
      ctx.restore();
      // 势力小旗，标示归属
      ctx.fillStyle = fac.color;
      ctx.fillRect(cx - L.w * 0.46, cy - L.w * 0.44, 7, 7);
      ctx.strokeStyle = 'rgba(30,24,18,.55)';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - L.w * 0.46 + 0.5, cy - L.w * 0.44 + 0.5, 6, 6);
    } else {
      // 城基
      ctx.fillStyle = fac.color;
      ctx.globalAlpha = 0.92;
      var w = L.w * 0.62, h = Math.min(L.h * 0.46, L.s * 1.2);
      var bx = cx - w / 2, by = cy - h / 2 - 1;
      ctx.beginPath();
      ctx.rect(bx, by, w, h);
      ctx.fill();
      // 垛口
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = '#fdf6e8';
      for (var i = 0; i < 4; i++) {
        ctx.fillRect(bx + 2 + i * (w - 4) / 4, by - 2.5, (w - 6) / 6, 3);
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(30,24,18,.65)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, w, h);
    }
    // 城名
    ctx.font = '11px Georgia, "Songti SC", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var label = c.name;
    var ly = cy + L.s * 0.72;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(246,240,226,.92)';
    ctx.strokeText(label, cx, ly);
    ctx.fillStyle = 'rgba(40,33,26,.95)';
    ctx.fillText(label, cx, ly);
    if (s.garrison > 0) {
      ctx.fillStyle = 'rgba(40,33,26,.62)';
      ctx.font = '9px ui-monospace, monospace';
      ctx.fillText('守' + Math.round(s.garrison), cx, cy - L.s * 0.6);
    }
    ctx.restore();
  }

  /* —— 部曲 —— */
  function drawUnit(ctx, L, u, st, isSelected) {
    var p = center(L, u.x, u.y);
    var px = p.x, py = p.y;
    var fac = root.MAP.FACTIONS[u.faction] || root.MAP.FACTIONS.neutral;
    var gen = u.generalRef;
    var r = L.s * 0.62;
    var portrait = gen ? artGet('portrait', gen.id) : null;
    var bunting = artGet('unit', u.type);
    ctx.save();

    if (portrait) {
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
      var side = L.s * 1.5;
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
    var bw = L.w * 0.6, bh = 3;
    var bx = px - bw / 2, by = py + L.s * 0.62;
    ctx.fillStyle = 'rgba(40,33,26,.35)';
    ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = u.hp / u.maxHp > 0.4 ? '#5d7a4e' : '#a8322a';
    ctx.fillRect(bx, by, bw * (u.hp / u.maxHp), bh);
    if (isSelected) { ctx.fillStyle = '#f7e6b8'; ctx.fillRect(bx, by, bw, 1); }
    ctx.restore();
  }

  /* 州域水印：按各州城池重心，淡书州名 */
  var ZHOU_POS = null;
  function zhouLabels(L) {
    if (ZHOU_POS) { return ZHOU_POS; }
    var acc = {};
    root.MAP.CITIES.forEach(function (c) {
      var a = acc[c.zhou] || (acc[c.zhou] = { x: 0, y: 0, n: 0 });
      a.x += c.x; a.y += c.y; a.n += 1;
    });
    ZHOU_POS = Object.keys(acc).map(function (k) {
      var gx = acc[k].x / acc[k].n, gy = acc[k].y / acc[k].n;
      return { name: k, gx: gx, gy: gy };
    });
    return ZHOU_POS;
  }

  function drawZhou(ctx, L) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '32px Georgia, "Songti SC", serif';
    ctx.fillStyle = 'rgba(74,60,44,.14)';
    zhouLabels().forEach(function (z) {
      var p = center(L, z.gx, z.gy);
      ctx.fillText(z.name, p.x, p.y);
    });
    ctx.restore();
  }

  function draw(ctx, st, view) {
    view = view || {};
    var L = layout(ctx);
    ctx.save();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (var y = 0; y < root.MAP.H; y++) {
      for (var x = 0; x < root.MAP.W; x++) {
        var t = st.map[y][x];
        var p = center(L, x, y);
        var timg = artGet('terrain', t.terrain);
        hexPath(ctx, p.x, p.y, L.s + 0.6);
        ctx.fillStyle = terrainFill(t.terrain);
        ctx.fill();
        if (timg) {
          ctx.save();
          hexPath(ctx, p.x, p.y, L.s + 0.6);
          ctx.clip();
          ctx.drawImage(timg, p.x - L.w / 2, p.y - L.s, L.w, L.h);
          ctx.restore();
        } else if (t.terrain === 'mount') { drawMountains(ctx, p.x, p.y, L.s); }
        else if (t.terrain === 'forest') { drawForest(ctx, p.x, p.y, L.s); }
        else if (t.terrain === 'water') { drawWaves(ctx, p.x, p.y, L.s); }
        else if (t.terrain === 'desert') { drawDesert(ctx, p.x, p.y, L.s); }
        else if (t.terrain === 'marsh') { drawMarsh(ctx, p.x, p.y, L.s); }
        else if (t.terrain === 'ford') { drawFord(ctx, p.x, p.y, L.s); }
      }
    }

    // 格线（六边）
    ctx.strokeStyle = 'rgba(90,78,60,.16)';
    ctx.lineWidth = 1;
    for (var yy = 0; yy < root.MAP.H; yy++) {
      for (var xx = 0; xx < root.MAP.W; xx++) {
        var pp = center(L, xx, yy);
        hexPath(ctx, pp.x, pp.y, L.s + 0.4);
        ctx.stroke();
      }
    }

    drawZhou(ctx, L);

    // 行军区
    (view.reachable || []).forEach(function (q) {
      var p = center(L, q.x, q.y);
      hexPath(ctx, p.x, p.y, L.s * 0.9);
      ctx.fillStyle = 'rgba(84,117,103,.28)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(84,117,103,.6)';
      ctx.lineWidth = 1.6;
      ctx.stroke();
    });
    // 可攻之敌
    (view.targets || []).forEach(function (u) {
      var p = center(L, u.x, u.y);
      hexPath(ctx, p.x, p.y, L.s + 1);
      ctx.strokeStyle = 'rgba(168,50,42,.9)';
      ctx.lineWidth = 3;
      ctx.stroke();
    });
    (view.cityTargets || []).forEach(function (c) {
      var p = center(L, c.x, c.y);
      hexPath(ctx, p.x, p.y, L.s + 1);
      ctx.strokeStyle = 'rgba(168,50,42,.9)';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 城
    root.MAP.CITIES.forEach(function (c) { drawCity(ctx, L, c, st, view.selectedCity === c.id); });
    // 军
    st.units.forEach(function (u) {
      if (u.hp <= 0) { return; }
      drawUnit(ctx, L, u, st, view.selected && view.selected.id === u.id);
    });
    ctx.restore();
  }

  /* 画布以 CSS 缩放显示（内部 1200 余像素，屏上可能只有 700 余像素），
     故须先把鼠标坐标按 canvas.width / 屏幕宽 换算回内部坐标，再作六边取整。 */
  function hit(e, canvas) {
    var r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) { return null; }
    var kx = canvas.width / r.width;
    var ky = canvas.height / r.height;
    var px = (e.clientX - r.left) * kx;
    var py = (e.clientY - r.top) * ky;
    return tileAtPixel(layout({ canvas: canvas }), px, py);
  }

  root.Render = {
    draw: draw,
    hit: hit,
    layout: layout,
    center: center,
    hexPath: hexPath,
    tileAtPixel: tileAtPixel,
    TS: 40
  };
})(typeof window !== 'undefined' ? window : globalThis);
