/* 《代汉涂高》 — 舆图
 * 30 × 20 格，西起流沙，东尽乐浪，北抵阴山，南极交趾。
 * 格局为正六边形（尖顶、奇数行右移半格），每格六邻：东西南北四邻之外，
 * 更有东北、西北、东南、西南，故行军与射程皆按六边距离计，非曼哈顿距离。
 * 图例：. 平原  h 丘陵  ^ 山地  # 森林  = 沼泽  d 大漠  ~ 江海  p 津渡
 */
(function (root) {
  'use strict';

  var W = 30, H = 20;

  var RAW = [
    'd d d d d h h h h ^ ^ ^ h h ^ h h h h h h ^ ^ h h h h # # #',
    'd d h h h h h h ^ ^ ^ h h h h h # h h ^ h h h ^ ^ h h h # ~',
    'd d h h h h h h h h h h ^ h h h h # h h h h h h ^ ^ ^ h h ~',
    'd h h h h h h h h h h h ^ h = h h h h h h h ^ h h h h h ~ ~',
    'd h h h h h h h h h h h ^ . . . . . . . . . . h h h h h ~ ~',
    'd h h h h h h h h h h h ^ . . . ~ = . . . . . h h h h h ~ ~',
    'd h h h h h h ~ ~ p ~ ~ ~ ~ ~ ~ . . . . . . . h h h h h ~ ~',
    'd h h h h h ~ ~ p ~ ~ ~ . . . . . . . . . . . . . . h h ~ ~',
    'd h ^ h h h h h . . . . . . . . . . . . . . . . . . h h ~ ~',
    'd h h h h h ^ h h ^ ^ h . . . . # . . . . . . h h h h h ~ ~',
    'd d ^ ^ h h h h . h h h . . . . ^ . . . . . . h h h h h ~ ~',
    'd h ^ ^ h h = . . . . . . . . . . . . . . . p ~ ~ ~ ~ ~ ~ ~',
    'h h ^ ^ h h h h . . . = . . . . . ~ ~ p ~ ~ . . . . h h ~ ~',
    'h h ^ ^ h h h h h ~ ~ ~ p ~ ~ ~ ~ . . . . . . = . h # h ~ ~',
    'h h h h h h h h h h h # . . . . . . . . . . . . . h h h ~ ~',
    'h h h h h h h h h h h . . . . . . . . . . . . # . h h ~ ~ ~',
    'h h h h h h h h h h = # # # # # # # # # # # # h h h ~ ~ ~ ~',
    'h h h h h h h h h h h # # # # # # # h # # # # h h h ~ ~ ~ ~',
    'h h h ^ ^ ^ h h h h h # # # # # # # # # # # # h h ~ ~ ~ ~ ~',
    'h h h h h h h h h h # # # # # # # # # # h h h h ~ ~ ~ ~ ~ ~'
  ];

  var TERRAIN = {
    '.': { key: 'plain',  name: '平原', cost: 1, def: 0.00, atk: 0.00, land: true,  sea: false },
    'h': { key: 'hill',   name: '丘陵', cost: 2, def: 0.15, atk: -0.05, land: true, sea: false },
    '^': { key: 'mount',  name: '山地', cost: 3, def: 0.30, atk: -0.15, land: true, sea: false },
    '#': { key: 'forest', name: '林地', cost: 2, def: 0.20, atk: -0.10, land: true, sea: false },
    '=': { key: 'marsh',  name: '沼泽', cost: 3, def: 0.05, atk: -0.20, land: true, sea: false },
    'd': { key: 'desert', name: '大漠', cost: 2, def: 0.05, atk: -0.05, land: true, sea: false },
    '~': { key: 'water',  name: '江海', cost: 1, def: 0.00, atk: 0.00, land: false, sea: true },
    'p': { key: 'ford',   name: '津渡', cost: 1, def: 0.00, atk: 0.00, land: true, sea: true }
  };

  /* 城池：[id, 名, 州, 类别, x, y, 岁入金, 岁入粮, 说明]
   * 类别：都城 / 州治 / 重镇 / 关隘 / 港口 / 县城
   */
  var CITY_ROWS = [
    // —— 凉州·河西 ——
    ['juyan',      '居延',    '凉州', '关隘',  1,  0,  20,  20, '居延塞，汉长城极西，遮虏障故址。'],
    ['dunhuang',   '敦煌',    '凉州', '县城',  0,  2,  30,  40, '西域孔道，丝路咽喉，玉门阳关皆在其西。'],
    ['zhangye',    '张掖',    '凉州', '重镇',  1,  3,  40,  50, '河西四郡之一，张国臂掖以通西域。'],
    ['jiuquan',    '酒泉',    '凉州', '县城',  1,  2,  30,  40, '河西四郡之一，金泉之侧，通西域之要。'],
    ['gudu',       '姑臧',    '凉州', '州治',  2,  4,  60,  60, '凉州刺史治所，羌胡杂居，畜牧为业。'],
    ['jincheng',   '金城',    '凉州', '重镇',  1,  6,  45,  45, '黄河渡口，控扼河湟，汉末为边患所自起。'],
    ['xiping',     '西平',    '凉州', '县城',  2,  6,  30,  35, '湟中之地，羌人腹心。'],
    ['longxi',     '陇西',    '凉州', '重镇',  3,  6,  50,  50, '陇右要郡，通羌道，产良马。'],
    ['tianshui',   '天水',    '凉州', '重镇',  5,  6,  55,  55, '汉阳旧郡，陇上咽喉，陇关所依。'],
    ['anding',     '安定',    '凉州', '县城',  6,  6,  35,  40, '泾水上游，胡汉交界。'],
    ['wudu',       '武都',    '凉州', '县城',  5,  9,  30,  40, '氐羌杂处，阴平道自此而南。'],
    ['jieting',    '街亭',    '凉州', '关隘',  6,  8,  25,  30, '街泉亭，略阳之要，诸葛亮使马谡拒张郃于此。'],
    // —— 关中·司隶 ——
    ['chencang',   '陈仓',    '雍州', '重镇',  7,  8,  40,  45, '散关以北，陈仓道起点，通汉中之北道。'],
    ['changan',    '长安',    '雍州', '都城',  8,  8, 150, 120, '西汉旧都，三辅核心，董卓、李傕先后据之。'],
    ['tongguan',   '潼关',    '司隶', '关隘',  9,  8,  30,  30, '关中东大门，崤函之险，一夫当关。'],
    ['hongnong',   '弘农',    '司隶', '重镇', 10,  8,  45,  45, '弘农杨氏故里，两京之间。'],
    ['luoyang',    '洛阳',    '司隶', '都城', 11,  8, 160, 130, '东汉都城，宫室焚于董卓，灵台石经犹存。'],
    // —— 并州·塞外 ——
    ['danhan',     '弹汗山',  '并州', '县城', 12,  0,  20,  20, '檀石槐王庭，鲜卑所都。'],
    ['shuofang',   '朔方',    '并州', '县城',  6,  0,  25,  30, '河套之地，汉置朔方郡，后为匈奴鲜卑所居。'],
    ['meiji',      '美稷',    '并州', '县城',  7,  1,  20,  25, '南匈奴单于庭，入居塞内已百余年。'],
    ['yunzhong',   '云中',    '并州', '县城',  9,  2,  25,  30, '阴山南麓，匈奴故地，赵武灵王所置。'],
    ['yanmen',     '雁门',    '并州', '关隘', 11,  1,  30,  35, '雁门关，御北之要，李广、牵招尝守。'],
    ['jinyang',    '晋阳',    '并州', '州治', 10,  3,  65,  65, '并州治所，山河表里，高干所守。'],
    ['shangdang',  '上党',    '并州', '重镇', 11,  5,  50,  55, '太行壶口，天下之脊，黑山贼所出没。'],
    // —— 冀州 ——
    ['changshan',  '常山',    '冀州', '县城', 14,  2,  35,  40, '常山郡，颜良、赵云之乡。'],
    ['julu',       '巨鹿',    '冀州', '县城', 15,  3,  40,  45, '张角起事之地，黄巾所自兴。'],
    ['xindu',      '信都',    '冀州', '重镇', 16,  2,  50,  50, '冀州旧治，安平之国。'],
    ['nanpi',      '南皮',    '冀州', '重镇', 17,  3,  55,  55, '渤海郡治，袁绍起家于此。'],
    ['ye',         '邺',      '冀州', '都城', 15,  4, 140, 130, '袁绍、曹魏之都，铜雀台在焉。'],
    ['pingyuan',   '平原',    '冀州', '县城', 18,  5,  40,  45, '平原郡，刘备尝为相。'],
    // —— 幽州 ——
    ['liucheng',   '柳城',    '幽州', '县城', 20,  0,  25,  30, '乌桓王庭所在，蹋顿所居。'],
    ['shanggu',    '上谷',    '幽州', '重镇', 16,  0,  35,  40, '上谷郡，居庸关外，通塞北之道。'],
    ['daijun',     '代郡',    '幽州', '县城', 13,  1,  30,  35, '代郡，汉初代国之故地，北接鲜卑。'],
    ['zhuojun',    '涿郡',    '幽州', '县城', 16,  1,  35,  45, '刘备、张飞故里，贩履织席之地。'],
    ['ji',         '蓟',      '幽州', '州治', 17,  1,  60,  70, '幽州治所，北接乌桓，突骑所出。'],
    ['yuyang',     '渔阳',    '幽州', '县城', 18,  1,  30,  40, '渔阳突骑名天下，彭宠尝据此叛。'],
    ['youbeiping', '右北平',  '幽州', '重镇', 19,  1,  35,  40, '李广旧治，出塞通乌桓之道。'],
    ['liaoxi',     '辽西',    '幽州', '重镇', 21,  1,  35,  40, '辽西走廊，襟带辽海。'],
    // —— 辽东 ——
    ['liaodong',   '辽东',    '幽州', '重镇', 22,  2,  40,  45, '辽东郡，公孙氏三世所据。'],
    ['xiangping',  '襄平',    '幽州', '州治', 24,  3,  70,  70, '公孙氏治所，襄平城坚，司马懿围之。'],
    ['xuantu',     '玄菟',    '幽州', '县城', 25,  1,  30,  35, '玄菟郡，东接高句丽。'],
    ['lelang',     '乐浪',    '幽州', '重镇', 27,  2,  35,  40, '乐浪郡，通三韩，汉四郡之一。'],
    // —— 青州 ——
    ['linzi',      '临淄',    '青州', '州治', 20,  5,  70,  75, '齐故都，青州富庶，盐铁之利。'],
    ['beihai',     '北海',    '青州', '重镇', 21,  6,  55,  60, '孔融尝为相，海道通辽东。'],
    ['donglai',    '东莱',    '青州', '重镇', 25,  4,  45,  50, '东莱郡，煮海为盐，浮海通辽东、三韩。'],
    // —— 兖州 ——
    ['puyang',     '濮阳',    '兖州', '重镇', 16,  6,  55,  55, '兖州治所，临黄河，曹操与吕布相持于此。'],
    ['juancheng',  '鄄城',    '兖州', '重镇', 17,  7,  55,  55, '曹操初起之根据，荀彧、程昱守之。'],
    ['chenliu',    '陈留',    '兖州', '重镇', 15,  7,  60,  60, '曹操散家财起兵处，四战之地。'],
    ['qiao',       '谯',      '豫州', '重镇', 17,  8,  60,  60, '曹操、华佗故里，涡水之滨。'],
    // —— 徐州 ——
    ['tancheng',   '郯城',    '徐州', '州治', 21,  7,  55,  60, '徐州治所，陶谦、刘备先后居之。'],
    ['pengcheng',  '彭城',    '徐州', '重镇', 19,  8,  55,  55, '楚汉旧都，南北通衢。'],
    ['xiapi',      '下邳',    '徐州', '重镇', 20,  8,  60,  60, '吕布殒命之地，泗水所经。'],
    ['guangling',  '广陵',    '徐州', '港口', 21, 10,  45,  50, '临江濒海，漕运所出，陈登尝守之。'],
    ['langya',     '琅邪',    '徐州', '县城', 23,  8,  40,  45, '琅邪郡，诸葛亮故里，滨海产盐。'],
    // —— 豫州 ——
    ['xuchang',    '许昌',    '豫州', '都城', 15,  8, 130, 120, '汉献帝都许，屯田之基，曹魏五都之一。'],
    ['runan',      '汝南',    '豫州', '重镇', 16,  9,  55,  55, '袁氏门生故吏之乡，号称多士。'],
    ['wan',        '宛',      '荆州', '重镇', 13,  9,  70,  70, '南阳郡治，天下大郡，张绣所屯。'],
    // —— 荆州 ——
    ['xinye',      '新野',    '荆州', '县城', 13, 10,  35,  40, '刘备屯此，北拒曹操，髀肉复生之地。'],
    ['fancheng',   '樊城',    '荆州', '重镇', 13, 11,  50,  50, '汉水北岸，襄阳北门。'],
    ['xiangyang',  '襄阳',    '荆州', '州治', 13, 12,  90,  90, '刘表治所，荆州中枢，南北锁钥。'],
    ['jiangling',  '江陵',    '荆州', '重镇', 12, 12,  75,  75, '南郡治所，长江中游，关羽所失。'],
    ['jiangxia',   '江夏',    '荆州', '重镇', 15, 12,  60,  60, '黄祖、刘琦所守，江夏蛮所居。'],
    ['wuling',     '武陵',    '荆州', '县城', 12, 14,  35,  40, '武陵蛮所居，五溪之地。'],
    ['changsha',   '长沙',    '荆州', '重镇', 14, 15,  55,  60, '孙坚起家之地，区星之乱所起。'],
    ['lingling',   '零陵',    '荆州', '县城', 13, 16,  35,  40, '零陵郡，湘水上游，产铁。'],
    ['guiyang',    '桂阳',    '荆州', '县城', 15, 16,  30,  35, '桂阳郡，产银铁，通交州。'],
    // —— 扬州·江东 ——
    ['shouchun',   '寿春',    '扬州', '州治', 18,  9,  80,  80, '扬州治所，袁术僭号于此。'],
    ['hefei',      '合肥',    '扬州', '重镇', 19, 10,  60,  65, '淮南重镇，魏吴必争，张辽威震逍遥津。'],
    ['lujiang',    '庐江',    '扬州', '重镇', 18, 11,  55,  55, '江淮要郡，孙策尝破陆康。'],
    ['chaisang',   '柴桑',    '扬州', '港口', 17, 13,  50,  55, '长江津要，周瑜练兵于此。'],
    ['yuzhang',    '豫章',    '扬州', '重镇', 18, 14,  55,  55, '豫章郡，吴之腹心，华歆、孙贲尝守。'],
    ['poyang',     '鄱阳',    '扬州', '县城', 19, 14,  35,  40, '鄱阳湖滨，水军所出。'],
    ['danyang',    '丹阳',    '扬州', '重镇', 21, 13,  55,  60, '丹阳兵天下精，山越所出。'],
    ['jianye',     '建业',    '扬州', '都城', 23, 12, 120, 120, '孙权徙治秣陵，筑石头城，六朝之都。'],
    ['wu',         '吴',      '扬州', '重镇', 24, 13,  65,  65, '孙氏故郡，吴会之地，顾陆朱张所居。'],
    ['kuaiji',     '会稽',    '扬州', '州治', 25, 14,  70,  70, '会稽郡，山越所出，王充故里。'],
    ['jianan',     '建安',    '扬州', '县城', 24, 15,  35,  40, '建安郡，闽中之地，山越盘踞。'],
    // —— 益州 ——
    ['yangping',   '阳平关',  '益州', '关隘',  8,  9,  30,  35, '汉中北门，张卫拒曹操于此。'],
    ['hanzhong',   '汉中',    '益州', '重镇',  8, 10,  70,  75, '张鲁所据，五斗米道之枢，北瞰关中。'],
    ['shangyong',  '上庸',    '益州', '县城', 10, 10,  35,  40, '东三郡之一，汉水上游，孟达所守。'],
    ['jiange',     '剑阁',    '益州', '关隘',  7, 10,  30,  35, '蜀北天险，一夫当关，万夫莫开。'],
    ['jiameng',    '葭萌',    '益州', '县城',  7, 11,  30,  35, '刘备入蜀驻此，后为汉寿。'],
    ['langzhong',  '阆中',    '益州', '县城',  8, 11,  40,  45, '巴西郡治，嘉陵江环其三面，张飞尝镇此。'],
    ['zitong',     '梓潼',    '益州', '重镇',  7, 12,  40,  45, '梓潼郡，剑阁之后，涪水所经。'],
    ['mianzhu',    '绵竹',    '益州', '重镇',  6, 12,  45,  50, '成都北门，诸葛瞻父子死节处。'],
    ['luoxian',    '雒县',    '益州', '重镇',  6, 13,  50,  55, '广汉郡治，庞统中流矢处。'],
    ['jianwei',    '犍为',    '益州', '县城',  8, 13,  35,  40, '犍为郡，岷江之滨，盐井所出。'],
    ['chengdu',    '成都',    '益州', '都城',  5, 13, 150, 140, '益州治所，天府之国，织锦之利。'],
    ['jiangzhou',  '江州',    '益州', '重镇',  9, 12,  55,  55, '巴郡治所，两江交汇，严颜所守。'],
    ['yongan',     '永安',    '益州', '关隘', 11, 12,  40,  45, '白帝城，三峡门户，刘备托孤于此。'],
    ['jianning',   '建宁',    '益州', '重镇',  6, 16,  30,  40, '南中治所，夷汉杂居，产金银丹漆。'],
    ['dianchi',    '滇池',    '益州', '县城',  5, 17,  25,  35, '滇中沃野，古滇国故地。'],
    // —— 交州 ——
    ['nanhai',     '南海',    '交州', '港口', 20, 16,  40,  45, '番禺，南海航路起点，犀象珠玑所聚。'],
    ['cangwu',     '苍梧',    '交州', '州治', 17, 17,  40,  45, '交州治所，广信之地，士氏所领。'],
    ['longbian',   '龙编',    '交州', '县城', 14, 18,  30,  35, '交趾郡治，士燮所都。'],
    ['jiaozhi',    '交趾',    '交州', '重镇', 15, 18,  35,  40, '交趾郡，稻熟再熟，通南海。']
  ];

  var CITIES = CITY_ROWS.map(function (r) {
    return {
      id: r[0], name: r[1], zhou: r[2], kind: r[3], x: r[4], y: r[5],
      gold: r[6], food: r[7], note: r[8],
      terrain: null, port: false, pass: (r[3] === '关隘'),
      level: ({ '都城': 5, '州治': 4, '重镇': 3, '港口': 3, '关隘': 2, '县城': 1 })[r[3]] || 1
    };
  });

  var CITY_INDEX = {};
  CITIES.forEach(function (c) { CITY_INDEX[c.id] = c; });

  // 势力：旗色取汉魏旧制（青、赤、黄、白、黑），并作区分
  var FACTIONS = {
    han:       { name: '汉',     long: '汉廷',         color: '#b8352c', ink: '#f6ece0', playable: true },
    dong:      { name: '董',     long: '董卓军',       color: '#5b4032', ink: '#f6ece0', playable: true },
    lvbu:      { name: '吕',     long: '吕布军',       color: '#8a6b2f', ink: '#f6ece0', playable: false },
    yuan:      { name: '袁',     long: '袁绍军',       color: '#3f6b53', ink: '#f6ece0', playable: true },
    zhong:     { name: '仲',     long: '袁术·仲氏',     color: '#7a5c9e', ink: '#f6ece0', playable: true },
    wei:       { name: '魏',     long: '曹操军·魏',     color: '#2f4f78', ink: '#f6ece0', playable: true },
    jin:       { name: '晋',     long: '司马氏·晋',     color: '#4a6f8f', ink: '#f6ece0', playable: true },
    shu:       { name: '汉',     long: '刘备军·蜀汉',   color: '#2f7d6f', ink: '#f6ece0', playable: true },
    yi:        { name: '益',     long: '刘焉·刘璋',     color: '#8a7a3d', ink: '#f6ece0', playable: true },
    jing:      { name: '荆',     long: '刘表·荆州',     color: '#5f7a3d', ink: '#f6ece0', playable: true },
    hanzhong:  { name: '鲁',     long: '张鲁·汉中',     color: '#8c6239', ink: '#f6ece0', playable: true },
    wu:        { name: '吴',     long: '孙氏·江东',     color: '#a33b2e', ink: '#f6ece0', playable: true },
    liaodong:  { name: '公孙',   long: '公孙氏·辽东',   color: '#4d6a7a', ink: '#f6ece0', playable: true },
    liang:     { name: '凉',     long: '马腾·韩遂',     color: '#9a6a3a', ink: '#f6ece0', playable: true },
    wan:       { name: '宛',     long: '张绣·宛',       color: '#6b6b6b', ink: '#f6ece0', playable: true },
    xu:        { name: '徐',     long: '徐州（陶谦·刘备）', color: '#93774a', ink: '#f6ece0', playable: false },
    huangjin:  { name: '黄巾',   long: '黄巾·太平道',   color: '#c8a02c', ink: '#2b1d0e', playable: false },
    xianbei:   { name: '鲜卑',   long: '鲜卑',         color: '#6d5b4b', ink: '#f6ece0', playable: false },
    wuhuan:    { name: '乌桓',   long: '乌桓',         color: '#7d6a4a', ink: '#f6ece0', playable: false },
    nanxiong:  { name: '匈奴',   long: '南匈奴',       color: '#5d6a4a', ink: '#f6ece0', playable: false },
    qiang:     { name: '羌氐',   long: '羌氐',         color: '#8a7355', ink: '#f6ece0', playable: false },
    shanyue:   { name: '山越',   long: '山越',         color: '#5c6b3a', ink: '#f6ece0', playable: false },
    nanman:    { name: '南蛮',   long: '南中夷帅',     color: '#6b7a4a', ink: '#f6ece0', playable: false },
    jiao:      { name: '士',     long: '交州士氏',     color: '#7a6a8a', ink: '#f6ece0', playable: false },
    neutral:   { name: '无',     long: '无主',         color: '#4a4a4a', ink: '#f6ece0', playable: false }
  };

  /* 剧本：按州定归属，再以 overrides 逐城修正 */
  var ERAS = {
    e184: {
      year: 184, era: '光和七年·中平元年', ruler: '汉灵帝刘宏',
      title: '黄巾之乱',
      desc: '张角以太平道举事，三十六方同日并起，八州震动。汉室解党锢、发天下精兵，州郡各拥兵自守——乱世自此始。',
      regions: {
        '凉州': 'han', '雍州': 'han', '司隶': 'han', '并州': 'han', '冀州': 'han',
        '幽州': 'han', '青州': 'han', '兖州': 'han', '徐州': 'han', '豫州': 'han',
        '荆州': 'han', '扬州': 'han', '益州': 'han', '交州': 'han'
      },
      overrides: {
        'julu': 'huangjin', 'runan': 'huangjin', 'wan': 'huangjin', 'shangdang': 'huangjin',
        'jincheng': 'qiang', 'xiping': 'qiang', 'gudu': 'qiang', 'zhangye': 'qiang',
        'anding': 'qiang', 'tianshui': 'qiang', 'longxi': 'qiang', 'wudu': 'qiang',
        'jiuquan': 'qiang', 'jieting': 'qiang', 'shuofang': 'nanxiong',
        'danhan': 'xianbei', 'meiji': 'nanxiong', 'liucheng': 'wuhuan', 'yunzhong': 'xianbei',
        'jiaozhi': 'jiao', 'longbian': 'jiao', 'cangwu': 'jiao', 'nanhai': 'jiao',
        'liaodong': 'neutral', 'xiangping': 'neutral', 'xuantu': 'neutral', 'lelang': 'neutral'
      }
    },
    e189: {
      year: 189, era: '中平六年·初平元年', ruler: '汉少帝刘辩／献帝刘协',
      title: '董卓入京',
      desc: '灵帝崩，何进召外兵诛宦官而自毙，董卓率凉州兵入洛，废辩立协，专断朝政。关东州郡同时举义，山雨欲来。',
      regions: {
        '凉州': 'dong', '雍州': 'dong', '司隶': 'dong', '并州': 'dong', '冀州': 'yuan',
        '幽州': 'han', '青州': 'han', '兖州': 'han', '徐州': 'han', '豫州': 'han',
        '荆州': 'jing', '扬州': 'han', '益州': 'yi', '交州': 'jiao'
      },
      overrides: {
        'luoyang': 'dong', 'changan': 'dong', 'tongguan': 'dong', 'hongnong': 'dong',
        'chencang': 'dong', 'anding': 'dong', 'tianshui': 'dong', 'longxi': 'dong',
        'jincheng': 'dong', 'xiping': 'dong', 'gudu': 'dong', 'zhangye': 'dong', 'dunhuang': 'dong',
        'ye': 'yuan', 'julu': 'yuan', 'changshan': 'yuan', 'xindu': 'yuan', 'nanpi': 'yuan', 'pingyuan': 'yuan',
        'jinyang': 'yuan', 'shangdang': 'yuan', 'yanmen': 'yuan', 'yunzhong': 'yuan', 'shuofang': 'yuan',
        'ji': 'han', 'zhuojun': 'han', 'yuyang': 'han', 'youbeiping': 'han', 'liaoxi': 'han',
        'xiangping': 'liaodong', 'liaodong': 'liaodong', 'xuantu': 'liaodong', 'lelang': 'liaodong',
        'chengdu': 'yi', 'hanzhong': 'hanzhong',
        'wan': 'han', 'shouchun': 'han',
        'changsha': 'wu',
        'xuchang': 'han', 'runan': 'han', 'qiao': 'han', 'chenliu': 'han', 'puyang': 'han',
        'danhan': 'xianbei', 'meiji': 'nanxiong', 'liucheng': 'wuhuan',
        'yangping': 'hanzhong', 'jiange': 'yi', 'jiameng': 'yi',
        'shangyong': 'hanzhong',
      }
    },
    e194: {
      year: 194, era: '兴平元年', ruler: '汉献帝刘协',
      title: '群雄割据',
      desc: '天子在长安，李傕、郭汜相攻；关东群雄各据州郡，袁绍据河北，曹操争兖州，袁术夺南阳，吕布流徙，天下无主。',
      regions: {
        '凉州': 'dong', '雍州': 'han', '司隶': 'han', '并州': 'yuan', '冀州': 'yuan',
        '幽州': 'yuan', '青州': 'wei', '兖州': 'wei', '徐州': 'xu', '豫州': 'wei',
        '荆州': 'jing', '扬州': 'zhong', '益州': 'yi', '交州': 'jiao'
      },
      overrides: {
        'changan': 'han', 'hongnong': 'han', 'luoyang': 'han',
        'tongguan': 'dong', 'chencang': 'dong', 'anding': 'dong', 'tianshui': 'dong',
        'longxi': 'dong', 'wudu': 'dong', 'jincheng': 'liang', 'xiping': 'liang',
        'gudu': 'liang', 'zhangye': 'liang', 'dunhuang': 'liang', 'juyan': 'liang',
        'jiuquan': 'liang',
        'shangdang': 'huangjin',
        'ji': 'yuan', 'zhuojun': 'yuan', 'yuyang': 'yuan', 'youbeiping': 'yuan', 'liaoxi': 'yuan',
        'xiangping': 'liaodong', 'liaodong': 'liaodong', 'xuantu': 'liaodong', 'lelang': 'liaodong',
        'beihai': 'han', 'linzi': 'wei',
        'hanzhong': 'hanzhong', 'yangping': 'hanzhong',
        'shangyong': 'hanzhong',
        'lujiang': 'wu', 'shouchun': 'zhong', 'wan': 'zhong', 'runan': 'zhong',
        'xuchang': 'wei', 'qiao': 'wei', 'chenliu': 'wei', 'puyang': 'wei', 'juancheng': 'wei',
        'danhan': 'xianbei', 'meiji': 'nanxiong', 'liucheng': 'wuhuan',
        'yunzhong': 'xianbei',
        'shuofang': 'xianbei',
      }
    },
    e199: {
      year: 199, era: '建安四年', ruler: '汉献帝刘协',
      title: '官渡前夜',
      desc: '曹操奉天子都许，行屯田，破吕布于下邳；袁绍并幽冀青并四州，简精卒十万，南向以争天下。决战在即。',
      regions: {
        '凉州': 'liang', '雍州': 'dong', '司隶': 'wei', '并州': 'yuan', '冀州': 'yuan',
        '幽州': 'yuan', '青州': 'yuan', '兖州': 'wei', '徐州': 'wei', '豫州': 'wei',
        '荆州': 'jing', '扬州': 'wu', '益州': 'yi', '交州': 'jiao'
      },
      overrides: {
        'changan': 'dong', 'hongnong': 'wei', 'luoyang': 'wei', 'tongguan': 'dong',
        'chencang': 'dong', 'anding': 'dong', 'tianshui': 'dong', 'longxi': 'dong',
        'jieting': 'dong',
        'jincheng': 'liang', 'xiping': 'liang', 'gudu': 'liang', 'zhangye': 'liang',
        'dunhuang': 'liang', 'juyan': 'liang', 'wudu': 'liang',
        'ji': 'yuan', 'zhuojun': 'yuan', 'yuyang': 'yuan', 'youbeiping': 'yuan', 'liaoxi': 'yuan',
        'shangdang': 'yuan', 'jinyang': 'yuan',
        'xiangping': 'liaodong', 'liaodong': 'liaodong', 'xuantu': 'liaodong', 'lelang': 'liaodong',
        'hanzhong': 'hanzhong', 'yangping': 'hanzhong',
        'shangyong': 'hanzhong',
        'wan': 'wan', 'xinye': 'jing',
        'shouchun': 'wu', 'lujiang': 'wu', 'hefei': 'wei', 'guangling': 'wei',
        'danhan': 'xianbei', 'meiji': 'nanxiong', 'liucheng': 'wuhuan', 'yunzhong': 'xianbei',
        'shuofang': 'xianbei',
      }
    },
    e208: {
      year: 208, era: '建安十三年', ruler: '汉献帝刘协',
      title: '赤壁之战',
      desc: '曹操平河北、征乌桓、下荆州，率水陆大军临江；孙刘结盟于柴桑，周瑜、程普逆战于赤壁。天下三分之势，于此发端。',
      regions: {
        '凉州': 'liang', '雍州': 'wei', '司隶': 'wei', '并州': 'wei', '冀州': 'wei',
        '幽州': 'wei', '青州': 'wei', '兖州': 'wei', '徐州': 'wei', '豫州': 'wei',
        '荆州': 'wei', '扬州': 'wu', '益州': 'yi', '交州': 'jiao'
      },
      overrides: {
        'changan': 'wei', 'tongguan': 'wei', 'chencang': 'wei', 'anding': 'wei',
        'tianshui': 'wei', 'longxi': 'wei', 'wudu': 'wei', 'hongnong': 'wei',
        'jieting': 'wei',
        'jincheng': 'liang', 'xiping': 'liang', 'gudu': 'liang', 'zhangye': 'liang',
        'dunhuang': 'liang', 'juyan': 'liang',
        'xiangping': 'liaodong', 'liaodong': 'liaodong', 'xuantu': 'liaodong', 'lelang': 'liaodong',
        'liaoxi': 'liaodong', 'youbeiping': 'liaodong',
        'hanzhong': 'hanzhong', 'yangping': 'hanzhong',
        'shangyong': 'hanzhong',
        'jiangling': 'wei', 'jiangxia': 'wei', 'xiangyang': 'wei', 'fancheng': 'wei',
        'changsha': 'wei', 'wuling': 'wei', 'lingling': 'wei', 'guiyang': 'wei',
        'xinye': 'shu', 'wan': 'wei',
        'lujiang': 'wu', 'shouchun': 'wei', 'hefei': 'wei', 'guangling': 'wu',
        'chaisang': 'wu', 'yuzhang': 'wu', 'poyang': 'wu', 'danyang': 'wu', 'jianye': 'wu',
        'wu': 'wu', 'kuaiji': 'wu', 'jianan': 'wu',
        'danhan': 'xianbei', 'meiji': 'nanxiong', 'liucheng': 'wuhuan', 'yunzhong': 'xianbei',
        'shuofang': 'xianbei',
        'chengdu': 'yi', 'jiangzhou': 'yi'
      }
    },
    e215: {
      year: 215, era: '建安二十年', ruler: '汉献帝刘协',
      title: '汉中之争',
      desc: '曹操西征张鲁，七月入南郑，汉中降；孙权乘虚围合肥，张辽以八百人破其十万于逍遥津。刘备既得益州，复与孙权争荆州三郡，遂有湘水之盟。天下之势，至此各定其界。',
      regions: {
        '凉州': 'wei', '雍州': 'wei', '司隶': 'wei', '并州': 'wei', '冀州': 'wei',
        '幽州': 'wei', '青州': 'wei', '兖州': 'wei', '徐州': 'wei', '豫州': 'wei',
        '荆州': 'wei', '扬州': 'wu', '益州': 'shu', '交州': 'wu'
      },
      overrides: {
        'jincheng': 'liang', 'xiping': 'liang',
        'hanzhong': 'hanzhong', 'yangping': 'hanzhong',
        'shangyong': 'wei',
        'jiangling': 'shu', 'wuling': 'shu', 'lingling': 'shu',
        'changsha': 'wu', 'guiyang': 'wu', 'jiangxia': 'wu',
        'xiangyang': 'wei', 'fancheng': 'wei', 'wan': 'wei', 'xinye': 'wei',
        'xiangping': 'liaodong', 'liaodong': 'liaodong', 'xuantu': 'liaodong', 'lelang': 'liaodong',
        'liaoxi': 'liaodong', 'youbeiping': 'liaodong',
        'longbian': 'jiao', 'jiaozhi': 'jiao',
        'danhan': 'xianbei', 'yunzhong': 'xianbei', 'shuofang': 'xianbei',
        'meiji': 'nanxiong', 'liucheng': 'wuhuan'
      }
    },
    e220: {
      year: 220, era: '建安二十五年·延康元年', ruler: '魏文帝曹丕',
      title: '三国鼎立',
      desc: '曹操崩于洛阳，曹丕受禅于繁阳，改元黄初。刘备称帝于成都，孙权称藩于魏。三足之鼎，各立其法。',
      regions: {
        '凉州': 'wei', '雍州': 'wei', '司隶': 'wei', '并州': 'wei', '冀州': 'wei',
        '幽州': 'wei', '青州': 'wei', '兖州': 'wei', '徐州': 'wei', '豫州': 'wei',
        '荆州': 'wei', '扬州': 'wu', '益州': 'shu', '交州': 'wu'
      },
      overrides: {
        'xiangyang': 'wei', 'fancheng': 'wei', 'jiangling': 'wei', 'jiangxia': 'wei',
        'changsha': 'wu', 'wuling': 'wu', 'lingling': 'wu', 'guiyang': 'wu',
        'chaisang': 'wu', 'yuzhang': 'wu', 'poyang': 'wu', 'danyang': 'wu', 'jianye': 'wu',
        'wu': 'wu', 'kuaiji': 'wu', 'jianan': 'wu', 'lujiang': 'wu',
        'shouchun': 'wei', 'hefei': 'wei', 'guangling': 'wei', 'xinye': 'wei',
        'hanzhong': 'shu', 'yangping': 'shu', 'wudu': 'wei', 'yongan': 'shu',
        'shangyong': 'wei',
        'jianning': 'shu', 'dianchi': 'shu',
        'xiangping': 'liaodong', 'liaodong': 'liaodong', 'xuantu': 'liaodong', 'lelang': 'liaodong',
        'nanhai': 'wu', 'cangwu': 'wu', 'longbian': 'jiao', 'jiaozhi': 'jiao',
        'danhan': 'xianbei', 'meiji': 'nanxiong', 'liucheng': 'wuhuan', 'yunzhong': 'xianbei',
        'shuofang': 'xianbei',
      }
    },
    e228: {
      year: 228, era: '魏太和二年·蜀建兴六年·吴黄武七年', ruler: '魏明帝曹叡／蜀后主刘禅／吴大帝孙权',
      title: '北伐之初',
      desc: '诸葛亮出祁山，三郡响应而街亭失守；司马懿自荆州都督任上镇宛，陆逊大破曹休于石亭。三方角力，各出奇正。',
      regions: {
        '凉州': 'wei', '雍州': 'wei', '司隶': 'wei', '并州': 'wei', '冀州': 'wei',
        '幽州': 'wei', '青州': 'wei', '兖州': 'wei', '徐州': 'wei', '豫州': 'wei',
        '荆州': 'wu', '扬州': 'wu', '益州': 'shu', '交州': 'wu'
      },
      overrides: {
        'wan': 'jin', 'xinye': 'jin', 'xiangyang': 'wei', 'fancheng': 'wei',
        'jiangling': 'wei', 'jiangxia': 'wu',
        'hanzhong': 'shu', 'yangping': 'shu', 'jiange': 'shu', 'jiameng': 'shu',
        'shangyong': 'wei',
        'zitong': 'shu', 'mianzhu': 'shu', 'luoxian': 'shu', 'chengdu': 'shu',
        'jiangzhou': 'shu', 'yongan': 'shu', 'jianning': 'shu', 'dianchi': 'shu',
        'wudu': 'wei', 'yinping': 'wei', 'tianshui': 'wei', 'longxi': 'wei', 'anding': 'wei',
        'xiangping': 'liaodong', 'liaodong': 'liaodong', 'xuantu': 'liaodong', 'lelang': 'liaodong',
        'nanhai': 'wu', 'cangwu': 'wu', 'longbian': 'jiao', 'jiaozhi': 'jiao',
        'danhan': 'xianbei', 'meiji': 'nanxiong', 'liucheng': 'wuhuan', 'yunzhong': 'xianbei',
        'shuofang': 'xianbei',
      }
    },
    e255: {
      year: 255, era: '魏正元二年·蜀延熙十八年·吴五凤二年', ruler: '魏高贵乡公曹髦／蜀后主刘禅／吴废帝孙亮',
      title: '淮南三叛',
      desc: '司马师卒于许昌，司马昭继掌魏政；毌丘俭、文钦举兵淮南，诸葛诞继之。姜维屡出陇右，孙权二宫之争方殷。',
      regions: {
        '凉州': 'wei', '雍州': 'wei', '司隶': 'jin', '并州': 'jin', '冀州': 'jin',
        '幽州': 'jin', '青州': 'jin', '兖州': 'jin', '徐州': 'jin', '豫州': 'jin',
        '荆州': 'wu', '扬州': 'wu', '益州': 'shu', '交州': 'wu'
      },
      overrides: {
        'shouchun': 'wei', 'hefei': 'jin', 'lujiang': 'wu', 'guangling': 'jin',
        'wan': 'jin', 'xinye': 'jin', 'xiangyang': 'jin', 'fancheng': 'jin',
        'jiangling': 'jin', 'jiangxia': 'wu',
        'hanzhong': 'shu', 'yangping': 'shu', 'jiange': 'shu', 'jiameng': 'shu',
        'shangyong': 'wei',
        'zitong': 'shu', 'mianzhu': 'shu', 'luoxian': 'shu', 'chengdu': 'shu',
        'jiangzhou': 'shu', 'yongan': 'shu', 'jianning': 'shu', 'dianchi': 'shu',
        'wudu': 'shu', 'tianshui': 'wei', 'longxi': 'wei',
        'xiangping': 'jin', 'liaodong': 'jin', 'xuantu': 'jin', 'lelang': 'jin',
        'nanhai': 'wu', 'cangwu': 'wu', 'longbian': 'jiao', 'jiaozhi': 'jiao',
        'danhan': 'xianbei', 'meiji': 'nanxiong', 'liucheng': 'wuhuan', 'yunzhong': 'xianbei',
        'shuofang': 'xianbei',
        'shangdang': 'wei', 'jinyang': 'jin'
      }
    },
    e264: {
      year: 264, era: '魏咸熙元年·吴元兴元年', ruler: '魏元帝曹奂／吴末帝孙皓',
      title: '蜀亡之后',
      desc: '蜀汉既亡于前一年之冬，益州尽入司马氏；魏景元五年五月，司马昭进爵晋王，代魏之势已成。吴主孙休是年七月崩，濮阳兴、张布迎立乌程侯孙皓，改元元兴。江东之祚，自此入于末路。',
      regions: {
        '凉州': 'jin', '雍州': 'jin', '司隶': 'jin', '并州': 'jin', '冀州': 'jin',
        '幽州': 'jin', '青州': 'jin', '兖州': 'jin', '徐州': 'jin', '豫州': 'jin',
        '荆州': 'wu', '扬州': 'wu', '益州': 'jin', '交州': 'wu'
      },
      overrides: {
        /* 荆州江北诸郡：南阳、襄阳、新野、樊城皆魏（晋）有；江陵、江夏及江南四郡仍属吴 */
        'wan': 'jin', 'xinye': 'jin', 'fancheng': 'jin', 'xiangyang': 'jin',
        /* 淮南寿春、合肥与东三郡之上庸：曹魏朝廷所存之地 */
        'shouchun': 'wei', 'hefei': 'wei', 'shangyong': 'wei',
        /* 辽东、乐浪等公孙氏旧地，既并于魏 */
        'xiangping': 'jin', 'liaodong': 'jin', 'xuantu': 'jin', 'lelang': 'jin',
        /* 塞外诸部 */
        'danhan': 'xianbei', 'shuofang': 'xianbei', 'meiji': 'nanxiong',
        'liucheng': 'wuhuan', 'yunzhong': 'xianbei'
      }
    }
  };

  /* —— 六边形网格的邻接与距离 ——
   * 布局：尖顶正六边形，奇数行相对偶数行右移半格。
   * 偶数行 y 之六邻：东 (x+1,y)　西 (x-1,y)　东北 (x,y-1)　西北 (x-1,y-1)　东南 (x,y+1)　西南 (x-1,y+1)
   * 奇数行 y 之六邻：东 (x+1,y)　西 (x-1,y)　东北 (x+1,y-1)　西北 (x,y-1)　东南 (x+1,y+1)　西南 (x,y+1)
   * 邻接关系对称：甲为乙之东北邻，则乙必为甲之西南邻。
   */
  var NB_EVEN = [[1, 0], [-1, 0], [0, -1], [-1, -1], [0, 1], [-1, 1]];
  var NB_ODD = [[1, 0], [-1, 0], [1, -1], [0, -1], [1, 1], [0, 1]];
  var NB_NAME = ['东', '西', '东北', '西北', '东南', '西南'];

  function neighbors(x, y) {
    var d = (y & 1) ? NB_ODD : NB_EVEN;
    var out = [];
    for (var i = 0; i < 6; i++) {
      var nx = x + d[i][0], ny = y + d[i][1];
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) { continue; }
      out.push([nx, ny]);
    }
    return out;
  }

  /* 偏置坐标 → 轴向坐标（q, r），再依六边距离公式计数 */
  function toAxial(x, y) { return { q: x - ((y - (y & 1)) >> 1), r: y }; }

  function dist(x1, y1, x2, y2) {
    var a = toAxial(x1, y1), b = toAxial(x2, y2);
    var dq = a.q - b.q, dr = a.r - b.r;
    return (Math.abs(dq) + Math.abs(dq + dr) + Math.abs(dr)) / 2;
  }

  /* —— 构建 —— */
  function buildGrid() {
    var g = [];
    for (var y = 0; y < H; y++) {
      var parts = RAW[y].trim().split(/\s+/);
      if (parts.length !== W) {
        throw new Error('舆图第 ' + y + ' 行应为 ' + W + ' 格，实为 ' + parts.length + ' 格');
      }
      var row = [];
      for (var x = 0; x < W; x++) {
        var t = TERRAIN[parts[x]];
        if (!t) { throw new Error('未知地形「' + parts[x] + '」于 (' + x + ',' + y + ')'); }
        row.push({
          x: x, y: y, ch: parts[x], terrain: t.key,
          terrainName: t.name, terrainCost: t.cost, terrainDef: t.def, terrainAtk: t.atk,
          land: t.land, sea: t.sea, city: null
        });
      }
      g.push(row);
    }
    CITIES.forEach(function (c) {
      var tile = g[c.y] && g[c.y][c.x];
      if (!tile) { throw new Error('城池 ' + c.name + ' 坐标越界'); }
      if (tile.city) { throw new Error('城池 ' + c.name + ' 与 ' + tile.city.name + ' 坐标重叠'); }
      tile.city = c;
      c.terrain = tile.terrain;
    });
    // 临水判定（按六邻）
    CITIES.forEach(function (c) {
      neighbors(c.x, c.y).forEach(function (p) {
        var t = g[p[1]][p[0]];
        if (t && t.terrain === 'water') { c.port = true; }
      });
    });
    return g;
  }

  function ownersOf(eraKey) {
    var era = ERAS[eraKey];
    if (!era) { throw new Error('未知剧本 ' + eraKey); }
    var own = {};
    CITIES.forEach(function (c) {
      var f = era.overrides[c.id] || era.regions[c.zhou] || 'neutral';
      if (!FACTIONS[f]) { throw new Error('剧本 ' + eraKey + ' 中 ' + c.name + ' 的势力「' + f + '」不存在'); }
      own[c.id] = f;
    });
    return own;
  }

  root.MAP = {
    W: W, H: H,
    HEX: true,
    RAW: RAW,
    TERRAIN: TERRAIN,
    CITIES: CITIES,
    CITY_INDEX: CITY_INDEX,
    FACTIONS: FACTIONS,
    ERAS: ERAS,
    grid: buildGrid(),
    ownersOf: ownersOf,
    neighbors: neighbors,
    dist: dist,
    NB_NAME: NB_NAME
  };

  if (typeof module !== 'undefined' && module.exports) { module.exports = root.MAP; }
})(typeof window !== 'undefined' ? window : globalThis);
