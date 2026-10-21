/* 武将数据·第四卷：辽东公孙氏、凉州马韩、宛、黄巾、鲜卑、乌桓、南匈奴、氐羌、山越、南蛮、交州士氏、徐州陶谦
 * 依《三国志》及裴注、《后汉书》《华阳国志》《魏略》《英雄记》《九州春秋》《晋书》诸书。
 * 不收演义、戏曲、影视原创人物与情节。
 */
window.GENERALS_PART4 = {
  /* ========== 辽东 公孙氏 ========== */
  "gongsun_du": {
    id: "gongsun_du",
    name: "公孙度",
    zi: "升济",
    aka: ["公孙豹", "辽东侯"],
    birth: null, death: 204,
    faction: "liaodong",
    roles: ["lord"],
    stats: { lead: 78, war: 72, int: 70, pol: 74, cha: 70 },
    skills: [
      { id: "haidong_wang", name: "威行海外", kind: "passive", desc: "东伐高句骊、西击乌丸，越海收东莱诸县，威慑海东加成", mod: { atk: 0.10, def: 0.08 }, tags: ["dread"] },
      { id: "xiangping_zhi", name: "襄平之治", kind: "aura", desc: "到官笞杀公孙昭、诛豪族百余家，郡中震栗，城池稳固", mod: { citydef: 0.12, morale: 4 }, tags: ["fortify"] }
    ],
    traits: ["割据辽东", "藏印武库", "越海置州"],
    bio: "公孙度字升济，辽东襄平人，少名豹。初为玄菟郡吏，玄菟太守公孙琙爱之。举有道，除尚书郎，迁冀州刺史，以谣言免。同郡徐荣荐为辽东太守，到官笞杀襄平令公孙昭，诛郡中名豪百余家。东伐高句骊，西击乌丸，越海收东莱诸县，置营州刺史，自立为辽东侯、平州牧。建安九年卒。（《三国志·公孙度传》）",
    quote: "我王辽东，何永宁也！",
    appear: [184, 204],
    impact: 4
  },
  "gongsun_kang": {
    id: "gongsun_kang",
    name: "公孙康",
    aka: ["襄平侯"],
    birth: null, death: null,
    faction: "liaodong",
    roles: ["lord"],
    stats: { lead: 74, war: 70, int: 66, pol: 68, cha: 62 },
    skills: [
      { id: "zhan_ershang", name: "斩尚传首", kind: "active", cd: 4, dur: 2, desc: "建安十二年斩袁尚、袁熙首送于曹操，拜左将军，激励全军", mod: { atk: 0.12, morale: 6 }, tags: ["rally"] },
      { id: "daifang_kai", name: "开带方郡", kind: "passive", desc: "分屯有县以南荒地为带方郡，收遗民伐韩濊，拓地与征募加成", mod: { recruit: 0.10, landmove: 1 }, tags: ["logistics"] }
    ],
    traits: ["恃远不服", "斩送二袁", "通倭韩之路"],
    bio: "公孙度之子。建安九年嗣辽东。十二年曹操屠柳城，袁尚、袁熙奔辽东，康斩其首送之，封襄平侯，拜左将军。又分屯有县以南荒地为带方郡，遣公孙模、张敞等收集遗民，兴兵伐韩濊，是后倭、韩遂属带方。魏文帝追赠其大司马。（《三国志·公孙度传》）",
    quote: "恃远不服。",
    appear: [190, 221],
    impact: 3
  },
  "gongsun_gong": {
    id: "gongsun_gong",
    name: "公孙恭",
    aka: ["平郭侯"],
    birth: null, death: null,
    faction: "liaodong",
    roles: ["lord"],
    stats: { lead: 32, war: 22, int: 42, pol: 38, cha: 44 },
    skills: [
      { id: "pingguo_shou", name: "平郭之守", kind: "passive", desc: "受魏车骑将军、假节，封平郭侯，守土与城防加成", mod: { citydef: 0.10 }, tags: ["fortify"] },
      { id: "gongshun", name: "恭顺汉魏", kind: "passive", desc: "不与中国争锋，送管宁南郊，外交与民心加成", mod: { morale: 4, def: 0.05 }, tags: ["ritual"] }
    ],
    traits: ["劣弱不能治国", "为侄所夺", "虚馆待士"],
    bio: "公孙康之弟。康死，子晃、渊皆幼，众立恭为辽东太守。魏文帝践阼，遣使即拜车骑将军、假节，封平郭侯。恭病阴消为阉人，劣弱不能治国，送管宁还郡于南郊，加赠服物。太和二年为侄公孙渊胁夺其位，幽囚失位。（《三国志·公孙度传》）",
    quote: "劣弱不能治国。",
    appear: [204, 228],
    impact: 2
  },
  "gongsun_yuan": {
    id: "gongsun_yuan",
    name: "公孙渊",
    zi: "文懿",
    aka: ["燕王"],
    birth: null, death: 238,
    faction: "liaodong",
    roles: ["lord"],
    stats: { lead: 68, war: 66, int: 62, pol: 55, cha: 58 },
    skills: [
      { id: "yanwang", name: "自立燕王", kind: "active", cd: 5, dur: 3, desc: "景初元年自立为燕王、置百官有司，全军攻击与士气大增", mod: { atk: 0.15, morale: 8 }, tags: ["rally"] },
      { id: "zhaohan", name: "绍汉改元", kind: "passive", desc: "改元绍汉，假鲜卑单于玺、诱呼鲜卑，边地征募加成", mod: { recruit: 0.10, landmove: 1 }, tags: ["cavalry"] },
      { id: "liaosui", name: "辽隧围堑", kind: "passive", desc: "遣卑衍、杨祚步骑数万屯辽隧、围堑二十余里，野战防御加成", mod: { def: 0.12 }, tags: ["fortify"] }
    ],
    traits: ["南通孙权", "斩吴使送首", "恃险自王"],
    bio: "公孙度之孙。太和二年胁夺叔父公孙恭位，明帝拜扬烈将军、辽东太守。遣使南通孙权，权遣张弥、许晏立之为燕王，渊恐权远不可恃，斩其使送首于魏。景初元年自立为燕王，置百官，假鲜卑单于玺。二年司马懿破襄平，渊与子修突围被杀，传首洛阳。（《三国志·公孙度传》）",
    quote: "诱呼鲜卑，侵扰北方。",
    appear: [210, 238],
    impact: 4
  },
  "liu_yi": {
    id: "liu_yi",
    name: "柳毅",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["minister"],
    stats: { lead: 52, war: 48, int: 64, pol: 60, cha: 52 },
    skills: [
      { id: "sundeng_zhen", name: "孙登之谶", kind: "aura", desc: "王沈《魏书》载其称谶书“孙登当为天子”，附会升济，振奋邻近", mod: { morale: 5 }, tags: ["rally"] },
      { id: "qinli_mou", name: "亲吏谋议", kind: "passive", desc: "初平元年与公孙度密谋图王，参预分郡置州之事，洞察加成", mod: { vision: 1, xp: 0.08 }, tags: ["insight"] }
    ],
    traits: ["公孙度亲吏", "首预图王之议", "佐置营州"],
    bio: "公孙度亲吏。初平元年中原扰攘，度语所亲吏柳毅、阳仪曰“汉祚将绝，当与诸卿图王耳”，毅等与谋。王沈《魏书》载度语毅、仪曰“谶书云孙登当为天子，太守姓公孙，字升济，升即登也”。度分辽东为辽西中辽郡、越海收东莱置营州，毅皆在事。（《三国志·公孙度传》裴注引王沈《魏书》）",
    quote: "孙登当为天子。",
    appear: [184, 204],
    impact: 1
  },
  "liaodong_yang_yi": {
    id: "liaodong_yang_yi",
    name: "阳仪",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["minister"],
    stats: { lead: 50, war: 46, int: 62, pol: 58, cha: 54 },
    skills: [
      { id: "zuo_yingzhou", name: "佐置营州", kind: "passive", desc: "佐公孙度越海收东莱诸县、置营州刺史，后勤补给加成", mod: { food: 0.08, gold: 0.06 }, tags: ["logistics"] },
      { id: "qinli_zuoming", name: "亲吏佐命", kind: "passive", desc: "与柳毅同为度所亲信，参预初平元年图王之议，声望加成", mod: { morale: 4, xp: 0.05 }, tags: ["insight"] }
    ],
    traits: ["公孙度亲吏", "参预图王", "佐定海东"],
    bio: "公孙度亲吏，与柳毅并为度所亲信。初平元年参预公孙度图王之议，度引谶书“孙登当为天子”以自附会，仪与柳毅同闻其语。度分郡置守、越海收东莱诸县、置营州刺史，仪皆预其谋。（《三国志·公孙度传》裴注引王沈《魏书》）",
    quote: "汉祚将绝，当与诸卿图王耳。",
    appear: [184, 204],
    impact: 1
  },
  "gongsun_mo": {
    id: "gongsun_mo",
    name: "公孙模",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["general"],
    stats: { lead: 62, war: 62, int: 52, pol: 50, cha: 52 },
    skills: [
      { id: "zhaoju_yimin", name: "收集遗民", kind: "passive", desc: "奉公孙康命与张敞收带方遗民，流民归附，征募加成", mod: { recruit: 0.14 }, tags: ["logistics"] },
      { id: "fa_hanhui", name: "兴兵伐韩濊", kind: "active", cd: 4, dur: 2, desc: "伐韩濊、旧民稍出，对蛮夷部族作战攻击加成", mod: { atk: 0.10 }, tags: ["barbarian"] }
    ],
    traits: ["带方开郡", "伐韩濊", "收遗民"],
    bio: "公孙康部将。建安中，康分屯有县以南荒地为带方郡，遣公孙模与张敞等收集遗民，兴兵伐韩濊，旧民稍出，是后倭、韩遂属带方。二郡之立，模与有力焉。（《三国志·东夷传》）",
    quote: "兴兵伐韩濊，旧民稍出。",
    appear: [200, 225],
    impact: 2
  },
  "zhang_chang": {
    id: "zhang_chang",
    name: "张敞",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["general"],
    stats: { lead: 60, war: 58, int: 56, pol: 56, cha: 52 },
    skills: [
      { id: "daifang_shou", name: "带方收民", kind: "passive", desc: "与公孙模同收带方遗民、通倭韩之路，粮秣与财用加成", mod: { food: 0.08, gold: 0.06 }, tags: ["logistics"] },
      { id: "tao_hui", name: "讨濊", kind: "passive", desc: "兴兵伐韩濊、收集遗民，边地征讨与筑垒守御增成", mod: { atk: 0.08, citydef: 0.08 }, tags: ["barbarian"] }
    ],
    traits: ["带方开郡", "通倭韩", "边地守将"],
    bio: "公孙康部将。与公孙模同受康命，收带方遗民、兴兵伐韩濊，通倭、韩入贡之路。后带方郡为魏经营东夷之枢，景初中明帝遣带方太守刘昕、乐浪太守鲜于嗣越海定二郡，敞实预其始。（《三国志·东夷传》）",
    quote: "是后倭韩遂属带方。",
    appear: [200, 225],
    impact: 2
  },
  "liaodong_hanzhong": {
    id: "liaodong_hanzhong",
    name: "韩忠",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["minister"],
    stats: { lead: 50, war: 46, int: 56, pol: 54, cha: 48 },
    skills: [
      { id: "jiazhi_shanyu", name: "持节假单于", kind: "active", cd: 5, dur: 3, desc: "奉公孙康命齎单于印绶往假峭王，蛮夷号召与征募加成", mod: { morale: 6, recruit: 0.10 }, tags: ["barbarian"] },
      { id: "liaodong_zhibian", name: "辽东之辩", kind: "passive", desc: "与牵招争辩“拥兵百万，强者为右”，言辞不逊，威压加成", mod: { atk: 0.08 }, tags: ["dread"] }
    ],
    traits: ["辽东使者", "执节临虏庭", "见呵于牵招"],
    bio: "公孙康所遣使者。康自称平州牧，遣韩忠齎单于印绶往假辽东属国乌丸峭王苏仆延。峭王大飨群长，忠与魏使牵招争辩，称辽东在沧海之东、拥兵百万，又有夫余、濊貊之用，强者为右。招呵之，捉其头顿筑，拔刀欲斩，峭王徒跣抱救乃免。（《三国志·牵招传》）",
    quote: "我辽东在沧海之东，拥兵百万。",
    appear: [205, 215],
    impact: 2
  },
  "wang_lie": {
    id: "wang_lie",
    name: "王烈",
    zi: "彦方",
    birth: 141, death: 218,
    faction: "liaodong",
    roles: ["minister"],
    stats: { lead: 30, war: 20, int: 74, pol: 72, cha: 88 },
    skills: [
      { id: "yanfang_dehua", name: "彦方德化", kind: "aura", desc: "《先贤行状》载盗牛者乞不使王彦方知，德感邻境，民心加成", mod: { morale: 8 }, tags: ["scholar"] },
      { id: "dunchong_xiangxu", name: "敦崇庠序", kind: "passive", desc: "在辽东建学校、敦崇庠序，士人成长与学识加成", mod: { xp: 0.12 }, tags: ["scholar"] },
      { id: "shang_buerjia", name: "市不二价", kind: "passive", desc: "使辽东强不陵弱、众不暴寡，商贾市不二价，财用加成", mod: { gold: 0.12, morale: 3 }, tags: ["logistics"] }
    ],
    traits: ["平原名士", "辞公孙度长史", "海表终老"],
    bio: "王烈字彦方，平原人，《后汉书》作太原人。少师事陈寔，以义行称乡里，盗牛者乞勿使王彦方知，烈遗布一端以激其耻。避乱居辽东，辞公孙度长史，使辽东强不陵弱、市不二价。曹操累征召，辽东为解不遣，建安二十三年寝疾，年七十八而终。（《三国志·管宁传》裴注引《先贤行状》）",
    quote: "盗惧吾闻其过，是有耻恶之心。",
    appear: [184, 218],
    impact: 2
  },
  "guan_ning": {
    id: "guan_ning",
    name: "管宁",
    zi: "幼安",
    birth: 158, death: 241,
    faction: "liaodong",
    roles: ["minister"],
    stats: { lead: 30, war: 20, int: 82, pol: 76, cha: 92 },
    skills: [
      { id: "qianlong", name: "潜龙之德", kind: "aura", desc: "避乱辽东讲诗书、陈俎豆、明礼让，越海避难者成邑，民心加成", mod: { morale: 9 }, tags: ["scholar"] },
      { id: "cisi_shoujie", name: "辞征守节", kind: "passive", desc: "魏文、明二帝屡征不起，华歆让太尉亦不受，守御与声望加成", mod: { def: 0.08, citydef: 0.08 }, tags: ["ritual"] }
    ],
    traits: ["北海朱虚人", "华歆邴原之友", "屡征不起"],
    bio: "管宁字幼安，北海朱虚人。长八尺，美须眉，与华歆、邴原相友。天下大乱，闻公孙度令行海外，与邴原、王烈至辽东，庐于山谷，讲诗书、饰威仪，避难者旬月成邑。密遣邴原西还以免祸。曹氏父子屡辟不就，公孙恭送之南郊。正始二年卒，年八十四。（《三国志·管宁传》）",
    quote: "潜龙以不见成德。",
    appear: [184, 241],
    impact: 3
  },
  "bing_yuan": {
    id: "bing_yuan",
    name: "邴原",
    zi: "根矩",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["minister"],
    stats: { lead: 40, war: 40, int: 78, pol: 74, cha: 82 },
    skills: [
      { id: "gangzhi_qingyi", name: "刚直清议", kind: "passive", desc: "性刚直、以清议格物，管宁谓其非时招祸，攻击与士气加成", mod: { atk: 0.08, morale: 4 }, tags: ["insight"] },
      { id: "cang_zheng", name: "藏政之义", kind: "active", cd: 4, dur: 2, desc: "藏辽东刘政，拒公孙度之索，护卫与救护加成", mod: { def: 0.12, heal: 0.08 }, tags: ["guard"] }
    ],
    traits: ["北海朱虚人", "入海避黄巾", "藏刘政"],
    bio: "邴原字根矩，北海朱虚人，少与管宁俱以操尚称。黄巾起，将家属入海，住郁洲山中。孔融为北海相，举原有道。原以黄巾方盛，遂至辽东，与同郡刘政俱有勇略雄气。公孙度畏恶刘政欲杀之，尽收捕其家，政窘急往投原，原藏之不遣。后得归，曹操辟为司空掾、五官将长史。（《三国志·邴原传》）",
    quote: "合葬，非礼也。",
    appear: [184, 215],
    impact: 3
  },
  "guo_yuan": {
    id: "guo_yuan",
    name: "国渊",
    zi: "子尼",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["minister"],
    stats: { lead: 45, war: 30, int: 78, pol: 82, cha: 72 },
    skills: [
      { id: "dian_tuntian", name: "典屯田", kind: "passive", desc: "曹操使典屯田，屡陈损益、相土处民，五年仓廪丰实，粮产加成", mod: { food: 0.15 }, tags: ["logistics"] },
      { id: "shishu_shouji", name: "如实上首级", kind: "passive", desc: "破贼文书旧以一为十，渊上首级如其实数，洞察与功勋加成", mod: { vision: 1, xp: 0.06 }, tags: ["insight"] }
    ],
    traits: ["郑玄门人", "避乱辽东", "典屯田"],
    bio: "国渊字子尼，乐安盖人，师事郑玄，玄称为国器。与邴原、管宁等避乱辽东，常讲学于山岩，士人多推慕之。还归旧土，曹操辟为司空掾属，使典屯田，屡陈损益，五年中仓廪丰实。田银、苏伯反河间，渊请不诛余党，赖其得生者千余人。（《三国志·国渊传》）",
    quote: "上首级如其实数。",
    appear: [184, 220],
    impact: 3
  },
  "bei_yan": {
    id: "bei_yan",
    name: "卑衍",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["general"],
    stats: { lead: 66, war: 68, int: 52, pol: 46, cha: 50 },
    skills: [
      { id: "liaosui_weiqian", name: "辽隧围堑", kind: "passive", desc: "与杨祚屯辽隧、围堑二十余里拒司马懿，野战防御加成", mod: { def: 0.12, citydef: 0.08 }, tags: ["fortify"] },
      { id: "shoushan_sizhan", name: "首山死战", kind: "active", cd: 4, dur: 2, desc: "渊复遣衍迎魏军殊死战于首山，虽败而士气不堕", mod: { atk: 0.12 }, tags: ["rally"] }
    ],
    traits: ["辽东宿将", "屯辽隧", "首山力战"],
    bio: "公孙渊将军。景初二年司马懿征辽东，渊遣卑衍与杨祚等步骑数万屯辽隧，围堑二十余里。懿令胡遵等击破之，衍逆战不利。懿穿围南向而急东北，趋襄平，衍等恐襄平无守，夜走。诸军进至首山，渊复遣衍迎军殊死战，复大破之。（《三国志·公孙度传》）",
    quote: "恐襄平无守，夜走。",
    appear: [220, 238],
    impact: 2
  },
  "yang_zuo": {
    id: "yang_zuo",
    name: "杨祚",
    birth: null, death: null,
    faction: "liaodong",
    roles: ["general"],
    stats: { lead: 62, war: 62, int: 50, pol: 46, cha: 48 },
    skills: [
      { id: "liaosui_fujiang", name: "辽隧副将", kind: "passive", desc: "与卑衍同屯辽隧拒魏军，围堑二十余里，守御加成", mod: { def: 0.10 }, tags: ["fortify"] },
      { id: "shiqiong_jiang", name: "势穷归降", kind: "passive", desc: "襄平粮尽人相食，杨祚等降，部曲保全与撤退加成", mod: { move: 1, hp: 0.06 }, tags: ["pursue"] }
    ],
    traits: ["辽东宿将", "屯辽隧", "襄平降魏"],
    bio: "公孙渊将军。景初二年与卑衍屯辽隧拒司马懿，为懿所破，退守襄平。魏军造城下为围堑，会霖雨三十余日，辽水暴长；雨霁，起土山、修橹，发石连弩射城中。渊窘急，粮尽，人相食，死者甚多，将军杨祚等降，辽东、带方、乐浪、玄菟悉平。（《三国志·公孙度传》）",
    quote: "将军杨祚等降。",
    appear: [220, 238],
    impact: 2
  },

  /* ========== 凉州 马腾·韩遂 ========== */
  "ma_teng": {
    id: "ma_teng",
    name: "马腾",
    zi: "寿成",
    aka: ["槐里侯"],
    birth: null, death: 212,
    faction: "liang",
    roles: ["lord"],
    stats: { lead: 78, war: 82, int: 55, pol: 54, cha: 74 },
    skills: [
      { id: "liangzhou_qibing", name: "凉州起兵", kind: "passive", desc: "灵帝末凉州募兵讨叛，以军功迁征西将军，骑兵突击加成", mod: { atk: 0.10 }, tags: ["cavalry"] },
      { id: "daishi_jinxian", name: "待士进贤", kind: "aura", desc: "屯槐里，北备胡寇、东备白骑，三辅安爱，民心加成", mod: { morale: 7 }, tags: ["rally"] }
    ],
    traits: ["马援之后", "娶羌女所生", "入朝为卫尉"],
    bio: "马腾字寿成，扶风茂陵人，马援之后。父失官留陇西，娶羌女生腾。腾少贫，常入山斫材木、负贩自给，长八尺余，性贤厚。灵帝末讨贼有功，迁征西将军。与韩遂结为异姓兄弟，后转相仇敌，遂杀其妻子。建安中征为卫尉入宿卫，十七年因马超举兵，为曹操所诛。（《三国志·马超传》裴注引《典略》）",
    quote: "北备胡寇，东备白骑。",
    appear: [184, 212],
    impact: 4
  },
  "ma_xiu": {
    id: "ma_xiu",
    name: "马休",
    birth: null, death: 212,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 50, war: 55, int: 46, pol: 46, cha: 56 },
    skills: [
      { id: "fengche_duwei", name: "奉车都尉", kind: "passive", desc: "建安中拜奉车都尉，随父入宿卫，宿卫与护持加成", mod: { def: 0.08 }, tags: ["guard"] }
    ],
    traits: ["马腾次子", "家属徙邺", "与父同死"],
    bio: "马腾次子。建安中马腾入朝为卫尉，拜休奉车都尉，徙其家属于邺，惟马超独留。建安十七年马超举兵于关中，曹操收灭腾家属，休与父腾、弟铁同被杀。（《三国志·马超传》裴注引《典略》）",
    quote: "拜超弟休奉车都尉。",
    appear: [200, 212],
    impact: 1
  },
  "ma_tie": {
    id: "ma_tie",
    name: "马铁",
    birth: null, death: 212,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 52, war: 58, int: 44, pol: 44, cha: 54 },
    skills: [
      { id: "ji_duwei", name: "骑都尉", kind: "passive", desc: "拜铁骑都尉，家属悉徙于邺为质，骑战与护卫加成", mod: { atk: 0.06, def: 0.05 }, tags: ["cavalry"] }
    ],
    traits: ["马腾幼子", "家属徙邺", "与父同死"],
    bio: "马腾幼子。腾入宿卫后，拜铁骑都尉，家属皆诣邺。建安十七年马超反于关中，曹操诛腾三族，铁与父兄同日被害。（《三国志·马超传》）",
    quote: "休弟铁骑都尉，徙其家属皆诣邺。",
    appear: [200, 212],
    impact: 1
  },
  "han_sui": {
    id: "han_sui",
    name: "韩遂",
    zi: "文约",
    aka: ["韩约"],
    birth: null, death: 215,
    faction: "liang",
    roles: ["lord"],
    stats: { lead: 76, war: 74, int: 72, pol: 60, cha: 68 },
    skills: [
      { id: "wenyue_zhi", name: "文约之名", kind: "passive", desc: "本名韩约，为州所购而改名，起兵三十二年，威压加成", mod: { atk: 0.10 }, tags: ["dread"] },
      { id: "suen_yu_qiang", name: "宿恩于羌", kind: "aura", desc: "宿有恩于羌，羌胡卫护之，蛮夷部队防御与征募加成", mod: { def: 0.08, recruit: 0.08 }, tags: ["barbarian"] },
      { id: "huayin_tui", name: "华阴之退", kind: "active", cd: 4, dur: 2, desc: "建安中自华阴败走湟中，部党散去而独全，撤退与防御加成", mod: { move: 1, def: 0.10 }, tags: ["ambush"] }
    ],
    traits: ["金城人", "与马腾结为兄弟", "起兵三十二年"],
    bio: "韩遂本名韩约，金城人，与边章俱著名西州。尝说何进诛诸阉人，不见用。中平元年为湟中义从所劫，与边章共为军帅，杀护羌校尉泠征。后杀边章及北宫伯玉、李文侯，拥兵十余万，与马腾结为异姓兄弟，又相攻为仇。建安十六年与马超合反，二十年败走西平，为部将麹演、蒋石所斩。（《典略》《武帝纪》）",
    quote: "丈夫困厄，祸起婚姻乎！",
    appear: [184, 215],
    impact: 4
  },
  "yan_xing": {
    id: "yan_xing",
    name: "阎行",
    zi: "彦明",
    aka: ["阎艳"],
    birth: null, death: null,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 72, war: 84, int: 62, pol: 50, cha: 58 },
    skills: [
      { id: "zhemiao_chao", name: "折矛挝超", kind: "active", cd: 3, dur: 1, desc: "建安初刺马超，矛折，以折矛挝其项几杀之，突击加成", mod: { atk: 0.18 }, tags: ["pursue"] },
      { id: "jianwei_taishou", name: "犍为太守", kind: "passive", desc: "为韩遂使诣曹操，操表拜犍为太守，外交与守土加成", mod: { citydef: 0.08, gold: 0.06 }, tags: ["logistics"] }
    ],
    traits: ["金城人", "韩遂之婿", "后归魏"],
    bio: "阎行，金城人，后名艳，字彦明。少有健名，为韩遂小将，遂以为婿。建安初韩遂与马腾相攻击，马超亦号为健，行尝刺超，矛折，因以折矛挝超项，几杀之。建安十四年为遂所使诣曹操，操厚遇之，表拜犍为太守，行因请令其父入宿卫。（《三国志·张既传》裴注引《魏略》）",
    quote: "以折矛挝超项，几杀之。",
    appear: [184, 220],
    impact: 3
  },
  "cheng_gongying": {
    id: "cheng_gongying",
    name: "成公英",
    birth: null, death: null,
    faction: "liang",
    roles: ["strategist"],
    stats: { lead: 68, war: 62, int: 80, pol: 66, cha: 70 },
    skills: [
      { id: "hanyue_fuxin", name: "韩约腹心", kind: "passive", desc: "中平末随韩约为腹心，部党散尽唯英独从，忠诚与防御加成", mod: { def: 0.10, morale: 4 }, tags: ["guard"] },
      { id: "sanfa_sanzhong", name: "三发三中", kind: "active", cd: 3, dur: 1, desc: "太祖命射三鹿，三发三中应弦而倒，弓弩攻击加成", mod: { atk: 0.15, range: 1 }, tags: ["archer"] },
      { id: "zuo_ping_longyou", name: "佐平陇右", kind: "passive", desc: "延康、黄初之际诏佐凉州平陇右，平定与后勤加成", mod: { food: 0.08, morale: 4 }, tags: ["logistics"] }
    ],
    traits: ["金城人", "韩遂心腹", "后为曹操军师"],
    bio: "成公英，金城人。中平末随韩约为腹心，建安中华阴败走、部党散去，唯英独从。韩遂死，英降曹操，操以为军师，封列侯；从行出猎，命射三鹿，三发三中，应弦而倒。延康、黄初之际，河西有逆谋，诏遣英佐凉州平陇右，病卒。（《三国志·张既传》裴注引《魏略》）",
    quote: "假使英本主人在，实不来此也。",
    appear: [184, 225],
    impact: 3
  },
  "liang_xing": {
    id: "liang_xing",
    name: "梁兴",
    birth: null, death: 212,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 62, war: 68, int: 46, pol: 44, cha: 50 },
    skills: [
      { id: "guanzhong_shibu", name: "关中十部", kind: "passive", desc: "建安十六年与马超等十部俱反，众十万同据河潼，士气加成", mod: { atk: 0.08, morale: 3 }, tags: ["rally"] },
      { id: "ye_gong_xuhuang", name: "夜攻徐晃", kind: "passive", desc: "渡津作堑未成，夜将步骑五千攻徐晃，夜战加成", mod: { atk: 0.06, vision: 1 }, tags: ["ambush"] }
    ],
    traits: ["关中诸将", "据河潼", "为夏侯渊所斩"],
    bio: "关中诸将。建安十六年与马超、韩遂等十部俱反，众十万，同据河、潼，渡津作堑，夜遣步骑五千攻徐晃，为晃击走。后屯蓝田，为夏侯渊所击，退保鄠，渊拔城斩之，封博昌亭侯。（《三国志·夏侯渊传》）",
    quote: "围遂、超余党梁兴于鄠，斩兴。",
    appear: [184, 212],
    impact: 2
  },
  "hou_xuan": {
    id: "hou_xuan",
    name: "侯选",
    birth: null, death: null,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 58, war: 62, int: 46, pol: 46, cha: 52 },
    skills: [
      { id: "hedong_haoshuai", name: "河东豪帅", kind: "passive", desc: "兴平之乱有众千余家，部曲相随不去，征募加成", mod: { recruit: 0.10 }, tags: ["logistics"] }
    ],
    traits: ["河东人", "关中十部", "败后降魏"],
    bio: "侯选，河东人。兴平之乱有众千余家，建安十六年与马超、韩遂等十部俱反，同据河、潼列营。渭南败后降曹操，部曲仍居关中，为魏守边。（《三国志·武帝纪》裴注引《魏略》）",
    quote: "各有众千余家。",
    appear: [184, 215],
    impact: 1
  },
  "cheng_yin": {
    id: "cheng_yin",
    name: "程银",
    birth: null, death: null,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 58, war: 62, int: 46, pol: 46, cha: 52 },
    skills: [
      { id: "tongguan_lianying", name: "潼关连营", kind: "passive", desc: "十部同据河潼、建列营陈以拒曹操，筑垒守御加成", mod: { def: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["河东人", "关中十部", "败后降魏"],
    bio: "程银，河东人。兴平之乱有众千余家，建安十六年与侯选、李堪、马玩等同为关中十部，俱反曹操，同据河、潼，建列营陈。渭南战败后与侯选等降，部曲留居关中。（《三国志·武帝纪》裴注引《魏略》）",
    quote: "同据河、潼，列营陈。",
    appear: [184, 215],
    impact: 1
  },
  "yang_qiu": {
    id: "yang_qiu",
    name: "杨秋",
    birth: null, death: null,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 62, war: 64, int: 56, pol: 58, cha: 56 },
    skills: [
      { id: "linjing_shou", name: "临泾之守", kind: "passive", desc: "《魏略》载黄初中迁讨寇将军、封临泾侯，守土加成", mod: { citydef: 0.12 }, tags: ["fortify"] },
      { id: "anding_gui", name: "安定归降", kind: "passive", desc: "渭南败后奔安定，为夏侯渊所降，归附与安抚加成", mod: { morale: 4, def: 0.05 }, tags: ["rally"] }
    ],
    traits: ["安定人", "关中十部", "以寿终"],
    bio: "杨秋，安定人。建安十六年与马超、韩遂等十部俱反，败后奔安定，夏侯渊与曹操会安定而降之。黄初中迁讨寇将军，位特进，封临泾侯，以寿终。（《三国志·武帝纪》裴注引《魏略》）",
    quote: "黄初中迁讨寇将军，以寿终。",
    appear: [184, 225],
    impact: 2
  },
  "li_kan": {
    id: "li_kan",
    name: "李堪",
    birth: null, death: 211,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 58, war: 62, int: 46, pol: 44, cha: 50 },
    skills: [
      { id: "weinan_xianzhen", name: "渭南陷阵", kind: "passive", desc: "十部之一，据河潼列营，与曹操夹渭而战，攻击加成", mod: { atk: 0.08 }, tags: ["rally"] }
    ],
    traits: ["河东人", "关中十部", "渭南被斩"],
    bio: "李堪，河东人。兴平之乱有众千余家，建安十六年与马超、韩遂等十部俱反，据河、潼列营。曹操潜遣徐晃、朱灵夜渡蒲阪津，纵虎骑夹击，大破之于渭南，李堪与成宜同被斩。（《三国志·武帝纪》裴注引《魏略》）",
    quote: "斩成宜、李堪等。",
    appear: [184, 211],
    impact: 1
  },
  "ma_wan": {
    id: "ma_wan",
    name: "马玩",
    birth: null, death: null,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 56, war: 60, int: 44, pol: 42, cha: 48 },
    skills: [
      { id: "he_tong_lieying", name: "河潼列营", kind: "passive", desc: "十部之一，同据河潼、列营陈，与曹操夹渭对垒，防御加成", mod: { def: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["关中诸将", "关中十部", "后事不载"],
    bio: "马玩，关中诸将。建安十六年与马超、侯选、程银、李堪、张横、梁兴、成宜、杨秋、韩遂凡十部俱反，其众十万，同据河、潼，建列营陈。渭南之败后，其事不复见于史传。（《三国志·马超传》裴注引《典略》）",
    quote: "凡十部，俱反，其众十万。",
    appear: [184, 211],
    impact: 1
  },
  "zhang_heng": {
    id: "zhang_heng",
    name: "张横",
    birth: null, death: null,
    faction: "liang",
    roles: ["general"],
    stats: { lead: 58, war: 62, int: 46, pol: 44, cha: 50 },
    skills: [
      { id: "he_tong_lianying", name: "河潼连营", kind: "passive", desc: "与韩遂、马超等十部俱反，据河潼列营，防御加成", mod: { def: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["关中诸将", "关中十部", "后事不载"],
    bio: "张横，关中诸将。建安十六年与马超、韩遂等十部俱反，众十万，同据河、潼。曹操夹渭而军，潜渡蒲阪，纵虎骑夹击，关中联军大败，张横后事史无明文。（《三国志·马超传》裴注引《典略》）",
    quote: "同据河、潼，列营陈。",
    appear: [184, 211],
    impact: 1
  },

  /* ========== 宛 张绣 ========== */
  "zhang_xiu": {
    id: "zhang_xiu",
    name: "张绣",
    aka: ["宣威侯", "定侯"],
    birth: null, death: 207,
    faction: "wan",
    roles: ["lord"],
    stats: { lead: 82, war: 88, int: 60, pol: 56, cha: 68 },
    skills: [
      { id: "wancheng_zhibian", name: "宛城之变", kind: "active", cd: 5, dur: 2, desc: "建安二年掩袭曹操于淯水，曹昂、典韦皆没，奇袭加成", mod: { atk: 0.18 }, tags: ["ambush"] },
      { id: "huanbao_rang", name: "还保穰城", kind: "passive", desc: "掩袭曹操后还保穰城，与刘表合兵，守御加成", mod: { def: 0.10 }, tags: ["fortify"] },
      { id: "poqiang_jiangjun", name: "破羌将军", kind: "passive", desc: "官渡力战有功迁破羌将军，从破袁谭于南皮，攻击加成", mod: { atk: 0.10 }, tags: ["rally"] }
    ],
    traits: ["武威祖厉人", "张济族子", "谥定侯"],
    bio: "张绣，武威祖厉人，骠骑将军张济之族子。为县吏时伺杀杀祖厉长之麹胜，郡内义之。济死，绣领其众屯宛，附刘表。建安二年降曹操而掩袭之，曹昂、典韦皆没。四年从贾诩计复降，官渡力战，迁破羌将军。十二年从征乌丸，未至而薨，谥定侯。（《三国志·张绣传》）",
    quote: "绣力战有功，迁破羌将军。",
    appear: [184, 207],
    impact: 4
  },
  "lei_xu": {
    id: "lei_xu",
    name: "雷绪",
    birth: null, death: null,
    faction: "wan",
    roles: ["general"],
    stats: { lead: 56, war: 60, int: 46, pol: 46, cha: 56 },
    skills: [
      { id: "buqu_shuwan", name: "部曲数万", kind: "passive", desc: "率部曲数万口归刘备，先为夏侯渊所破，征募加成", mod: { recruit: 0.12 }, tags: ["logistics"] }
    ],
    traits: ["庐江豪帅", "先叛后归刘备"],
    bio: "雷绪，庐江豪帅。建安十四年曹操征孙权还，使夏侯渊督诸将击庐江叛者雷绪，绪破。旋率部曲数万口归刘备，备因以壮，事在刘备领荆州牧、治公安之日。（《三国志·夏侯渊传》《先主传》）",
    quote: "率部曲数万口稽颡。",
    appear: [184, 214],
    impact: 1
  },
  "zhang_quan": {
    id: "zhang_quan",
    name: "张泉",
    birth: null, death: 219,
    faction: "wan",
    roles: ["general"],
    stats: { lead: 54, war: 58, int: 48, pol: 44, cha: 50 },
    skills: [
      { id: "sijue_juye", name: "嗣爵居邺", kind: "passive", desc: "张绣卒后嗣爵而居邺都，宿卫禁中，守御加成", mod: { def: 0.08 }, tags: ["guard"] }
    ],
    traits: ["张绣之子", "坐魏讽谋反诛", "国除"],
    bio: "张绣之子。绣卒，泉嗣爵。建安二十四年魏讽谋反于邺，泉坐与讽通谋被诛，封国除。张氏自凉州起家，父子两世而绝。（《三国志·张绣传》）",
    quote: "坐与魏讽谋反诛，国除。",
    appear: [207, 219],
    impact: 1
  },

  /* ========== 黄巾 ========== */
  "zhang_jiao": {
    id: "zhang_jiao",
    name: "张角",
    aka: ["大贤良师", "天公将军"],
    birth: null, death: 184,
    faction: "huangjin",
    roles: ["lord"],
    stats: { lead: 76, war: 50, int: 82, pol: 55, cha: 92 },
    skills: [
      { id: "tiangong", name: "天公将军", kind: "aura", desc: "自称黄天，部师三十六万皆著黄巾同日举事，全军士气加成", mod: { morale: 10, atk: 0.06 }, tags: ["rally"] },
      { id: "taipingdao", name: "太平道", kind: "passive", desc: "以符水治病、事奉黄老，徒众遍布八州，征募大增", mod: { recruit: 0.20 }, tags: ["insight"] },
      { id: "cangtian", name: "苍天已死", kind: "active", cd: 5, dur: 3, desc: "苍天已死、黄天当立之号，聚众起事时攻击大增", mod: { atk: 0.15, morale: 8 }, tags: ["dread"] }
    ],
    traits: ["钜鹿人", "三十六方同日举事", "先病死而遭戮尸"],
    bio: "张角，钜鹿人，太平道首领。中平元年自称黄天，部师三十六万皆著黄巾，同日反叛，安平、甘陵人各执其王以应之。朝廷遣卢植讨之，围角于广宗；董卓继攻不克。角先病死，十月皇甫嵩破广宗，乃发棺断头，传首京师。（《后汉书·皇甫嵩传》）",
    quote: "苍天已死，黄天当立。",
    appear: [184, 184],
    impact: 5
  },
  "huangjin_zhang_bao": {
    id: "huangjin_zhang_bao",
    name: "张宝",
    aka: ["地公将军"],
    birth: null, death: 184,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 68, war: 62, int: 60, pol: 45, cha: 70 },
    skills: [
      { id: "digong", name: "地公将军", kind: "aura", desc: "与兄角同日举兵，据下曲阳拒皇甫嵩，防御与士气加成", mod: { def: 0.10, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["张角之弟", "据下曲阳", "京观于城南"],
    bio: "张角之弟，称地公将军。中平元年与兄角、弟梁同日举兵。十一月，皇甫嵩与钜鹿太守郭典攻宝于下曲阳，斩之，首获十余万人，筑京观于城南。（《后汉书·皇甫嵩传》）",
    quote: "斩张角弟宝。",
    appear: [184, 184],
    impact: 3
  },
  "zhang_liang": {
    id: "zhang_liang",
    name: "张梁",
    aka: ["人公将军"],
    birth: null, death: 184,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 72, war: 70, int: 55, pol: 45, cha: 68 },
    skills: [
      { id: "rengong", name: "人公将军", kind: "passive", desc: "广宗之众精勇，皇甫嵩不能克，守城与防御加成", mod: { citydef: 0.15, def: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["张角之弟", "屯广宗", "赴河死者五万"],
    bio: "张角之弟，称人公将军，屯广宗。众精勇，皇甫嵩不能克。嵩闭营休士以观其变，知贼意稍懈，潜夜勒兵，鸡鸣驰赴其陈，战至晡时大破之，斩梁，获首三万级，赴河死者五万许人，焚烧车重三万余两。（《后汉书·皇甫嵩传》）",
    quote: "梁众精勇，嵩不能克。",
    appear: [184, 184],
    impact: 3
  },
  "ma_yuanyi": {
    id: "ma_yuanyi",
    name: "马元义",
    birth: null, death: 184,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 62, war: 58, int: 68, pol: 60, cha: 62 },
    skills: [
      { id: "jingyang_shou", name: "收荆扬之众", kind: "passive", desc: "先收荆、扬数万人，期会发兵于邺，征募与集结加成", mod: { recruit: 0.16 }, tags: ["rally"] },
      { id: "zhongchangshi_neiying", name: "内应之谋", kind: "passive", desc: "往来京师，结中常侍封谞、徐奉为内应，洞察加成", mod: { vision: 1, xp: 0.08 }, tags: ["insight"] }
    ],
    traits: ["张角弟子", "期会发于邺", "车裂洛阳"],
    bio: "张角弟子。中平元年张角置三十六方，大方马元义等先收荆、扬数万人，期会发于邺。元义数往来京师，以中常侍封谞、徐奉等为内应，约以三月五日内外俱起。未及期，张角弟子济南唐周上书告之，元义遂被车裂于洛阳。（《后汉书·皇甫嵩传》）",
    quote: "约以三月五日内外俱起。",
    appear: [184, 184],
    impact: 2
  },
  "bo_cai": {
    id: "bo_cai",
    name: "波才",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 70, war: 68, int: 58, pol: 40, cha: 60 },
    skills: [
      { id: "changshe_wei", name: "长社之围", kind: "passive", desc: "围皇甫嵩、朱儁于长社，依草结营，围城与攻城加成", mod: { siege: 0.12, atk: 0.08 }, tags: ["siege"] }
    ],
    traits: ["颍川黄巾帅", "围长社", "败走阳翟"],
    bio: "波才，颍川黄巾帅。中平元年围皇甫嵩于长社，依草结营，众盛而兵少之汉军皆恐。嵩因夜纵火，与曹操、朱儁合兵更战，大破之，斩首数万。波才走阳翟，又被追破，余贼降散，三郡悉平。（《后汉书·皇甫嵩传》）",
    quote: "贼依草结营，易为风火。",
    appear: [184, 185],
    impact: 2
  },
  "zhang_mancheng": {
    id: "zhang_mancheng",
    name: "张曼成",
    aka: ["神上使"],
    birth: null, death: 184,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 66, war: 66, int: 50, pol: 40, cha: 58 },
    skills: [
      { id: "shenshangshi", name: "神上使", kind: "active", cd: 4, dur: 2, desc: "自称神上使，攻杀南阳太守褚贡，屯宛下百余日，攻城加成", mod: { siege: 0.15, atk: 0.08 }, tags: ["siege"] }
    ],
    traits: ["南阳黄巾帅", "杀太守褚贡", "为秦颉所杀"],
    bio: "张曼成，南阳黄巾帅。中平元年起兵，称神上使，众数万，攻杀南阳太守褚贡，屯宛下百余日。后为南阳太守秦颉所击杀，余众更以赵弘为帅，众浸盛至十余万。（《后汉书·皇甫嵩传》《朱儁传》）",
    quote: "南阳黄巾张曼成攻杀郡守褚贡。",
    appear: [184, 184],
    impact: 2
  },
  "zhao_hong": {
    id: "zhao_hong",
    name: "赵弘",
    birth: null, death: 184,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 64, war: 64, int: 48, pol: 40, cha: 55 },
    skills: [
      { id: "wancheng_jushou", name: "宛城据守", kind: "passive", desc: "继张曼成为帅，众十余万据宛，朱儁围之六月不拔", mod: { citydef: 0.15 }, tags: ["fortify"] }
    ],
    traits: ["南阳黄巾帅", "众十余万", "据宛不拔"],
    bio: "南阳黄巾帅。张曼成死后继领其众，众浸盛至十余万，据宛城。朱儁与荆州刺史徐璆及秦颉合兵万八千人围之，自六月至八月不能拔，有司奏欲征儁，司空张温上疏止之。后儁急击，斩弘。（《后汉书·朱儁传》）",
    quote: "据宛城，自六月至八月不拔。",
    appear: [184, 184],
    impact: 2
  },
  "huangjin_hanzhong": {
    id: "huangjin_hanzhong",
    name: "韩忠",
    birth: null, death: 184,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 62, war: 62, int: 56, pol: 42, cha: 56 },
    skills: [
      { id: "tuibao_xiaocheng", name: "退保小城", kind: "passive", desc: "据宛拒朱儁，退保小城乞降而秦颉杀之，守御加成", mod: { citydef: 0.12, def: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["南阳黄巾帅", "据宛拒朱儁", "降而为秦颉所杀"],
    bio: "南阳黄巾帅。赵弘既死，忠复据宛拒朱儁。儁兵少不敌，张围结垒，鸣鼓攻其西南，自将精卒五千掩其东北，乘城而入；忠退保小城，惶惧乞降，儁不许。既而解围，忠果出战，大破之，忠等遂降，为秦颉所杀。（《后汉书·朱儁传》）",
    quote: "纳降无以劝善，讨之足以惩恶。",
    appear: [184, 184],
    impact: 2
  },
  "sun_xia": {
    id: "sun_xia",
    name: "孙夏",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 60, war: 60, int: 46, pol: 38, cha: 52 },
    skills: [
      { id: "jing_shan", name: "精山溃散", kind: "passive", desc: "继韩忠为帅还屯宛中，被朱儁追破于西鄂精山，行军加成", mod: { move: 1 }, tags: ["ambush"] }
    ],
    traits: ["南阳黄巾帅", "还屯宛中", "败于精山"],
    bio: "南阳黄巾帅。韩忠既降被杀，余众惧不自安，复以孙夏为帅，还屯宛中。朱儁急攻之，夏走，追至西鄂精山，又破之，复斩万余级，贼遂解散。（《后汉书·朱儁传》）",
    quote: "还屯宛中。",
    appear: [184, 185],
    impact: 1
  },
  "bu_ji": {
    id: "bu_ji",
    name: "卜己",
    birth: null, death: 184,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 58, war: 58, int: 46, pol: 38, cha: 52 },
    skills: [
      { id: "cangting", name: "仓亭之役", kind: "passive", desc: "东郡黄巾帅，与皇甫嵩战于仓亭，长兵拒战加成", mod: { atk: 0.08 }, tags: ["pike"] }
    ],
    traits: ["东郡黄巾帅", "战于仓亭", "为皇甫嵩生擒"],
    bio: "卜己，东郡黄巾帅。中平元年皇甫嵩进击之于仓亭，生擒卜己，斩首七千余级。是时卢植、董卓讨张角皆无功而还，诏嵩进兵，遂有广宗之捷。（《后汉书·皇甫嵩传》）",
    quote: "生禽卜己，斩首七千余级。",
    appear: [184, 184],
    impact: 1
  },
  "zhang_niujiao": {
    id: "zhang_niujiao",
    name: "张牛角",
    aka: ["将兵从事"],
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 66, war: 68, int: 50, pol: 45, cha: 62 },
    skills: [
      { id: "jiangbing_congshi", name: "将兵从事", kind: "passive", desc: "博陵起众，自号将兵从事，与褚燕合攻瘿陶，攻击加成", mod: { atk: 0.08, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["博陵人", "与褚燕合", "中矢而死"],
    bio: "张牛角，博陵人。黄巾起后聚众，自号将兵从事，与褚燕合。燕推牛角为帅，俱攻瘿陶。牛角为飞矢所中，创甚且死，令众奉燕，告曰“必以燕为师”，众从之，燕遂改姓张。（《三国志·张燕传》）",
    quote: "必以燕为师。",
    appear: [184, 185],
    impact: 2
  },
  "zhang_yan": {
    id: "zhang_yan",
    name: "张燕",
    aka: ["褚燕", "飞燕", "平难中郎将"],
    birth: null, death: null,
    faction: "huangjin",
    roles: ["lord"],
    stats: { lead: 78, war: 82, int: 68, pol: 58, cha: 72 },
    skills: [
      { id: "feiyan", name: "飞燕", kind: "passive", desc: "剽捍捷速过人，军中号为飞燕，移动与追击加成", mod: { move: 2, atk: 0.06 }, tags: ["pursue"] },
      { id: "heishan_baiwan", name: "黑山百万", kind: "aura", desc: "众至百万号黑山，常山、赵郡、中山诸山谷皆相通，征募加成", mod: { recruit: 0.18, morale: 6 }, tags: ["rally"] },
      { id: "pingbei_jiangjun", name: "平北将军", kind: "passive", desc: "建安中率众诣邺降曹操，封安国亭侯，归附与财用加成", mod: { def: 0.08, gold: 0.08 }, tags: ["logistics"] }
    ],
    traits: ["本姓褚，常山真定人", "黑山军帅", "降曹操封安国亭侯"],
    bio: "张燕本姓褚，常山真定人。黄巾起，合聚少年为群盗，与张牛角合，推牛角为帅；牛角死，众奉燕，故改姓张。剽捍捷速过人，军中号曰飞燕，众至百万，号曰黑山，灵帝拜平难中郎将。建安中遣使求佐王师，拜平北将军，率众诣邺，封安国亭侯，邑五百户。（《三国志·张燕传》）",
    quote: "众至百万，号曰黑山。",
    appear: [184, 210],
    impact: 4
  },
  "bai_rao": {
    id: "bai_rao",
    name: "白绕",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 58, war: 60, int: 46, pol: 38, cha: 50 },
    skills: [
      { id: "puyang_puo", name: "濮阳之破", kind: "passive", desc: "黑山帅，初平二年略东郡，被曹操击破于濮阳，劫掠加成", mod: { atk: 0.06, gold: 0.06 }, tags: ["raiding"] }
    ],
    traits: ["黑山军帅", "略东郡", "败于濮阳"],
    bio: "白绕，黑山军帅。初平二年与于毒、眭固等十余万众略东郡，东郡太守王肱不能御。曹操引兵入东郡，击白绕于濮阳，破之，袁绍因表曹操为东郡太守，治东武阳。（《三国志·武帝纪》）",
    quote: "击白绕于濮阳，破之。",
    appear: [184, 192],
    impact: 1
  },
  "yu_du": {
    id: "yu_du",
    name: "于毒",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 64, war: 66, int: 52, pol: 42, cha: 56 },
    skills: [
      { id: "dongwuyang", name: "东武阳", kind: "passive", desc: "与白绕、眭固略东郡，攻东武阳，后为袁绍所斩，攻城加成", mod: { siege: 0.10, atk: 0.06 }, tags: ["siege"] }
    ],
    traits: ["黑山军帅", "略东郡", "为袁绍所斩"],
    bio: "于毒，黑山军帅。初平二年与白绕、眭固略东郡。后与魏郡兵反，共覆邺城，杀太守栗成；又攻东武阳，曹操引兵西入山攻其本屯，毒弃武阳还。袁绍引军入朝歌鹿场山苍岩谷讨之，围攻五日，破斩于毒。（《三国志·武帝纪》《袁绍传》）",
    quote: "围攻五日，破之，斩毒。",
    appear: [184, 195],
    impact: 2
  },
  "sui_gu": {
    id: "sui_gu",
    name: "眭固",
    birth: null, death: 199,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 62, war: 66, int: 50, pol: 42, cha: 54 },
    skills: [
      { id: "shequan", name: "射犬之殁", kind: "passive", desc: "杀杨丑欲北合袁绍，屯射犬，被曹操遣史涣邀击斩之", mod: { atk: 0.08, move: 1 }, tags: ["raiding"] }
    ],
    traits: ["黑山军帅", "杀杨丑并其众", "斩于射犬"],
    bio: "眭固，黑山军帅。建安四年张杨为其将杨丑所杀，固杀杨丑，将其众欲北合袁绍，屯射犬。曹操遣史涣邀击，破之，斩固于射犬。（《三国志·武帝纪》）",
    quote: "太祖遣史涣邀击，破之，斩固。",
    appear: [184, 199],
    impact: 2
  },
  "heishan_yang_feng": {
    id: "heishan_yang_feng",
    name: "杨凤",
    aka: ["黑山校尉"],
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 64, war: 62, int: 58, pol: 52, cha: 60 },
    skills: [
      { id: "heishan_xiaowei", name: "黑山校尉", kind: "passive", desc: "灵帝拜为黑山校尉、领诸山贼，得举孝廉计吏，征募加成", mod: { recruit: 0.14, gold: 0.06 }, tags: ["logistics"] }
    ],
    traits: ["黑山诸帅之一", "受汉官号", "领诸山贼"],
    bio: "杨凤，黑山诸帅之一。《九州春秋》载张角之反，黑山、白波、黄龙、五鹿、羝根、刘石、罗市、雷公、浮云、飞燕、白爵、杨凤、于毒等各起兵，大者二三万，小者不减数千。灵帝不能讨，乃遣使拜杨凤为黑山校尉，领诸山贼，得举孝廉计吏。（《三国志·张燕传》裴注引《九州春秋》）",
    quote: "拜杨凤为黑山校尉，领诸山贼。",
    appear: [184, 195],
    impact: 2
  },
  "guo_tai": {
    id: "guo_tai",
    name: "郭太",
    aka: ["郭泰", "白波帅"],
    birth: null, death: null,
    faction: "huangjin",
    roles: ["lord"],
    stats: { lead: 70, war: 66, int: 58, pol: 45, cha: 64 },
    skills: [
      { id: "baibo", name: "白波贼", kind: "aura", desc: "起于西河白波谷，转寇太原破河东，众十余万，士气加成", mod: { morale: 8, atk: 0.06 }, tags: ["raiding"] }
    ],
    traits: ["西河白波谷起义", "众十余万", "牛辅击之不能却"],
    bio: "郭太，白波军帅。灵帝末，黄巾余党郭太等复起于西河白波谷，转寇太原，遂破河东，百姓流转三辅，号为白波贼，众十余万。董卓遣中郎将牛辅击之，不能却。其众后与南匈奴於夫罗合，又东赴献帝之难。（《后汉书·董卓传》）",
    quote: "号为白波贼，众十余万。",
    appear: [184, 196],
    impact: 2
  },
  "guan_hai": {
    id: "guan_hai",
    name: "管亥",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 66, war: 70, int: 48, pol: 40, cha: 55 },
    skills: [
      { id: "wei_beihai", name: "围北海", kind: "passive", desc: "围孔融于都昌，刘备、太史慈来救而解，攻城加成", mod: { siege: 0.14 }, tags: ["siege"] }
    ],
    traits: ["黄巾帅", "围孔融于都昌", "为刘备所解"],
    bio: "管亥，黄巾帅。孔融以黄巾寇暴，出屯都昌，为管亥所围。太史慈自辽东还，为融突围求救于刘备，备遣精兵三千并救，贼乃退散。（《三国志·太史慈传》）",
    quote: "今管亥暴乱，北海被围。",
    appear: [184, 193],
    impact: 2
  },
  "xu_he": {
    id: "xu_he",
    name: "徐和",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 60, war: 62, int: 48, pol: 40, cha: 52 },
    skills: [
      { id: "jinancheng", name: "济南起兵", kind: "passive", desc: "与司马俱等攻城杀长吏，收其粮谷以给军士，劫掠加成", mod: { food: 0.10 }, tags: ["raiding"] }
    ],
    traits: ["济南乐安黄巾帅", "攻城杀长吏", "为夏侯渊所斩"],
    bio: "徐和，济南、乐安黄巾帅。建安中与司马俱等攻城杀长吏，夏侯渊将泰山、齐、平原郡兵击之，大破其众，斩和，平诸县，收其粮谷以给军士。（《三国志·夏侯渊传》）",
    quote: "渊将泰山、齐、平原郡兵击，大破之。",
    appear: [184, 208],
    impact: 1
  },
  "sima_ju": {
    id: "sima_ju",
    name: "司马俱",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 58, war: 60, int: 46, pol: 38, cha: 50 },
    skills: [
      { id: "lean_gongcheng", name: "乐安攻城", kind: "passive", desc: "与徐和起于乐安、济南，攻城杀长吏，攻城加成", mod: { siege: 0.10 }, tags: ["siege"] }
    ],
    traits: ["乐安黄巾帅", "与徐和同时", "为夏侯渊所破"],
    bio: "司马俱，济南、乐安黄巾帅。建安中与徐和等攻城杀长吏，夏侯渊将泰山、齐、平原郡兵击，大破之。其事为曹操定河北后青州黄巾余众之最后一波，平后诸县粗安。（《三国志·夏侯渊传》）",
    quote: "济南、乐安黄巾徐和、司马俱等攻城。",
    appear: [184, 208],
    impact: 1
  },
  "liu_pi": {
    id: "liu_pi",
    name: "刘辟",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 62, war: 64, int: 50, pol: 42, cha: 58 },
    skills: [
      { id: "ruxu_zhi", name: "汝南之众", kind: "passive", desc: "汝南、颍川黄巾帅，众各数万，初应袁术又附孙坚，征募加成", mod: { recruit: 0.14 }, tags: ["rally"] },
      { id: "lue_xuxia", name: "略许下", kind: "passive", desc: "建安五年叛应袁绍、略许下，绍遣刘备助之，劫掠加成", mod: { gold: 0.10, atk: 0.06 }, tags: ["raiding"] }
    ],
    traits: ["汝南黄巾帅", "先应袁术", "后应袁绍"],
    bio: "汝南、颍川黄巾帅。与何仪、黄邵、何曼等各众数万，初应袁术，又附孙坚；建安元年二月曹操进军讨破之，《武帝纪》称斩辟、邵等。建安五年汝南降贼刘辟等又叛应袁绍，略许下，绍遣刘备助之，曹操使曹仁击破其屯。二事纪载歧异。（《三国志·武帝纪》）",
    quote: "汝南降贼刘辟等叛应绍，略许下。",
    appear: [184, 205],
    impact: 2
  },
  "gong_du": {
    id: "gong_du",
    name: "龚都",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 58, war: 62, int: 48, pol: 42, cha: 56 },
    skills: [
      { id: "ruxu_heji", name: "汝南合兵", kind: "passive", desc: "与刘备合众数千人于汝南，共拒曹操，结盟与征募加成", mod: { recruit: 0.10, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["汝南黄巾余部", "与刘备合", "蔡阳为其所杀"],
    bio: "汝南黄巾余部。建安五年曹操与袁绍相拒官渡，汝南黄巾刘辟等叛应绍；袁绍遣刘备将本兵复至汝南，与贼龚都等合，众数千人。曹操遣蔡阳击之，为刘备所杀，备遂得稍振。（《三国志·先主传》）",
    quote: "与贼龚都等合，众数千人。",
    appear: [184, 205],
    impact: 1
  },
  "he_yi": {
    id: "he_yi",
    name: "何仪",
    birth: null, death: null,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 60, war: 62, int: 48, pol: 42, cha: 54 },
    skills: [
      { id: "ruxu_baiwan", name: "众各数万", kind: "passive", desc: "汝南、颍川黄巾帅，众各数万，降后部众得全，征募加成", mod: { recruit: 0.12 }, tags: ["raiding"] }
    ],
    traits: ["汝南黄巾帅", "初应袁术", "兵败而降"],
    bio: "何仪，汝南、颍川黄巾帅。与刘辟、黄邵、何曼等各众数万，初应袁术，又附孙坚。建安元年二月曹操进军讨破之，斩刘辟、黄邵等，何仪及其众皆降。（《三国志·武帝纪》）",
    quote: "仪及其众皆降。",
    appear: [184, 205],
    impact: 1
  },
  "huang_shao": {
    id: "huang_shao",
    name: "黄邵",
    birth: null, death: 196,
    faction: "huangjin",
    roles: ["general"],
    stats: { lead: 58, war: 60, int: 46, pol: 40, cha: 52 },
    skills: [
      { id: "ying_yuanshu", name: "应袁术", kind: "passive", desc: "汝南、颍川黄巾帅，与众数万初应袁术，结援与士气加成", mod: { morale: 4, atk: 0.06 }, tags: ["rally"] }
    ],
    traits: ["汝南黄巾帅", "众各数万", "为曹操所斩"],
    bio: "黄邵，汝南、颍川黄巾帅。与何仪、刘辟、何曼等各众数万，初应袁术，又附孙坚。建安元年二月曹操进军讨破之，黄邵与刘辟等并被斩。（《三国志·武帝纪》）",
    quote: "斩辟、邵等，仪及其众皆降。",
    appear: [184, 196],
    impact: 1
  },

  /* ========== 鲜卑 ========== */
  "tan_shihu": {
    id: "tan_shihu",
    name: "檀石槐",
    birth: null, death: null,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 88, war: 84, int: 78, pol: 70, cha: 82 },
    skills: [
      { id: "danhan_liting", name: "弹汗立庭", kind: "aura", desc: "立庭于高柳北弹汗山歠仇水上，东西部大人皆归，全军加成", mod: { atk: 0.10, morale: 8 }, tags: ["barbarian"] },
      { id: "zhui_huan_niuyang", name: "追还牛羊", kind: "passive", desc: "年十四五单骑追击异部大人，悉还得所亡，追击加成", mod: { move: 2, atk: 0.08 }, tags: ["pursue"] },
      { id: "sanbu_zhi", name: "三部之制", kind: "passive", desc: "分其地为中东西三部，各置大人，控弦十万，征募加成", mod: { recruit: 0.16 }, tags: ["cavalryarcher"] }
    ],
    traits: ["鲜卑大人", "尽据匈奴故地", "拒汉封王不受"],
    bio: "檀石槐，鲜卑大人。少时单骑追还外家所亡牛羊，部众畏服，推为大人。立庭于高柳北三百余里弹汗山歠仇水上，南抄汉边，北拒丁零，东却夫余，尽据匈奴故地。桓帝封之为王，拒不肯受，自分为中东西三部。灵帝时大抄幽、并，熹平六年汉三道出塞，反为所败。年四十五而死。（《后汉书·乌桓鲜卑列传》）",
    quote: "南抄汉边，北拒丁零。",
    appear: [184, 190],
    impact: 4
  },
  "ke_yineng": {
    id: "ke_yineng",
    name: "轲比能",
    aka: ["附义王"],
    birth: null, death: 235,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 84, war: 82, int: 76, pol: 62, cha: 76 },
    skills: [
      { id: "duanfa_pingduan", name: "断法平端", kind: "passive", desc: "以勇健、断法平端、不贪财物为众所推，军心与士气加成", mod: { morale: 8 }, tags: ["rally"] },
      { id: "xue_zhongguo", name: "学中国法", kind: "passive", desc: "亡叛归之者教作兵器铠楯，勒御部众拟则中国，攻击加成", mod: { atk: 0.10, def: 0.06 }, tags: ["iron"] },
      { id: "kongxian_shiyu", name: "控弦十余万", kind: "active", cd: 5, dur: 3, desc: "尽收匈奴故地，自云中、五原以东抵辽水，骑射大增", mod: { atk: 0.18, range: 1 }, tags: ["cavalryarcher"] }
    ],
    traits: ["小种鲜卑", "尽收匈奴故地", "为刺客所杀"],
    bio: "轲比能，本小种鲜卑。以勇健、断法平端、不贪财物为众所推。部落近塞，中国人亡叛归之，教作兵器铠楯，颇学文字，勒御部众拟则中国。建安中因阎柔上贡献，从击田银，又助代郡乌丸为寇。延康初献马，文帝立为附义王。后尽收匈奴故地，数为边患，青龙中王雄遣剑客刺之，种落离散。（《三国志·鲜卑传》）",
    quote: "夷狄不识文字，故校尉阎柔保我于天子。",
    appear: [184, 235],
    impact: 4
  },
  "bu_dugen": {
    id: "bu_dugen",
    name: "步度根",
    aka: ["鲜卑王"],
    birth: null, death: 233,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 66, war: 66, int: 55, pol: 50, cha: 58 },
    skills: [
      { id: "shou_taiyuan", name: "保太原雁门", kind: "passive", desc: "与轲比能相攻，率万余落保太原、雁门郡，防御加成", mod: { def: 0.12 }, tags: ["fortify"] },
      { id: "zhao_guini", name: "招还泄归泥", kind: "active", cd: 4, dur: 2, desc: "以骨肉至亲招泄归泥归部，离散敌军、征募加成", mod: { recruit: 0.12, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["魁头之弟", "保塞附魏", "为比能所杀"],
    bio: "步度根，檀石槐之后，魁头之弟。魁头死而代立，众稍衰弱。建安中与轲比能等因乌丸校尉阎柔上贡献。文帝拜为王，后数与轲比能更相攻击，部众寡弱，将万余落保太原、雁门。黄初五年诣阙贡献，一心守边。青龙元年为比能所诱、叛魏寇并州，兵败，为比能所杀。（《三国志·鲜卑传》）",
    quote: "我与汝是骨肉至亲，岂与仇等？",
    appear: [184, 233],
    impact: 3
  },
  "fu_luohan": {
    id: "fu_luohan",
    name: "扶罗韩",
    birth: null, death: null,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 62, war: 64, int: 50, pol: 46, cha: 56 },
    skills: [
      { id: "bie_yong_zhong", name: "别拥众数万", kind: "passive", desc: "步度根中兄，别拥众数万为大人，征募与骑兵加成", mod: { recruit: 0.12, atk: 0.06 }, tags: ["cavalry"] }
    ],
    traits: ["步度根中兄", "迎代郡叛胡", "为比能所杀"],
    bio: "鲜卑大人，步度根之中兄，别拥众数万。代郡乌丸能臣氐等叛，求属扶罗韩，扶罗韩将万余骑迎之至桑乾。能臣氐等以其部威禁宽缓，恐不见济，更呼轲比能，比能即率万余骑至，于盟会上杀扶罗韩，其子泄归泥及部众悉属比能。（《三国志·鲜卑传》）",
    quote: "部威禁宽缓，恐不见济。",
    appear: [184, 205],
    impact: 2
  },
  "su_li": {
    id: "su_li",
    name: "素利",
    aka: ["归义王"],
    birth: null, death: 228,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 62, war: 60, int: 58, pol: 55, cha: 60 },
    skills: [
      { id: "guiyi_wang", name: "归义王", kind: "passive", desc: "建安中因阎柔上贡献、通市，魏文帝立为归义王，财用加成", mod: { gold: 0.12, morale: 4 }, tags: ["logistics"] }
    ],
    traits: ["东部大人", "种众多于比能", "为田豫所助"],
    bio: "素利，东部鲜卑大人，在辽西、右北平、渔阳塞外，道远初不为边患，然其种众多于轲比能。建安中因阎柔上贡献、通市，曹操表宠以为王；延康初遣使献马，文帝立为归义王。素利与比能更相攻击，田豫尝助之，太和二年死，子小，以弟成律归摄其众。（《三国志·鲜卑传》）",
    quote: "素利与比能更相攻击。",
    appear: [184, 228],
    impact: 2
  },
  "mi_jia": {
    id: "mi_jia",
    name: "弥加",
    aka: ["归义王"],
    birth: null, death: null,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 60, war: 58, int: 56, pol: 54, cha: 58 },
    skills: [
      { id: "dongbu_daren", name: "东部大人", kind: "passive", desc: "辽西、右北平、渔阳塞外大人，种众多于比能，征募加成", mod: { recruit: 0.12 }, tags: ["barbarian"] }
    ],
    traits: ["东部鲜卑大人", "檀石槐所置", "受魏王号"],
    bio: "弥加，东部鲜卑大人。檀石槐分其地为三部，自右北平以东至辽、东接夫余濊貊二十余邑为东部，其大人曰弥加、阙机、素利、槐头。道远初不为边患，然种众多于轲比能。建安中因阎柔上贡献，曹操表宠以为王；延康初遣使献马，文帝立为归义王。（《三国志·鲜卑传》）",
    quote: "其大人曰弥加、阙机、素利、槐头。",
    appear: [184, 230],
    impact: 2
  },
  "jue_ji": {
    id: "jue_ji",
    name: "厥机",
    aka: ["阙机"],
    birth: null, death: null,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 58, war: 58, int: 54, pol: 52, cha: 56 },
    skills: [
      { id: "qinhan_feng", name: "亲汉之封", kind: "passive", desc: "建安中为曹操所表为王，死而立其子为亲汉王，声望加成", mod: { morale: 5, def: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["东部鲜卑大人", "受魏王号", "子为亲汉王"],
    bio: "厥机，一作阙机，东部鲜卑大人，与弥加、素利、槐头并列。建安中因阎柔上贡献、通市，曹操表宠以为王；厥机死，又立其子沙末汗为亲汉王。延康初又遣使献马，其部与素利、弥加同受魏抚。（《三国志·鲜卑传》）",
    quote: "厥机死，又立其子沙末汗为亲汉王。",
    appear: [184, 220],
    impact: 2
  },
  "sha_mohan": {
    id: "sha_mohan",
    name: "沙末汗",
    aka: ["亲汉王"],
    birth: null, death: null,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 58, war: 58, int: 54, pol: 52, cha: 56 },
    skills: [
      { id: "qinhan_wang", name: "亲汉王", kind: "passive", desc: "嗣厥机之位，为魏所立亲汉王，与魏通市，财用与士气加成", mod: { gold: 0.10, morale: 4 }, tags: ["ritual"] }
    ],
    traits: ["厥机之子", "魏所立亲汉王", "继统东部"],
    bio: "沙末汗，东部鲜卑大人厥机之子。厥机死，曹操立其子沙末汗为亲汉王，使继领其部。延康初遣使献马，魏文帝践阼后又与素利、弥加等迭通贡献，东部鲜卑于魏初数为边屏。（《三国志·鲜卑传》）",
    quote: "立其子沙末汗为亲汉王。",
    appear: [220, 240],
    impact: 1
  },
  "tuoba_liwei": {
    id: "tuoba_liwei",
    name: "拓跋力微",
    aka: ["神元皇帝"],
    birth: null, death: null,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 80, war: 72, int: 76, pol: 70, cha: 74 },
    skills: [
      { id: "beiju_changchuan", name: "北居长川", kind: "passive", desc: "率所部北居长川，积十数岁德化大洽，旧部归附，征募加成", mod: { recruit: 0.16, morale: 6 }, tags: ["rally"] },
      { id: "rang_ma_zhi", name: "让马之德", kind: "aura", desc: "以骏马济窦宾而不言功，部众敬服，全军士气加成", mod: { morale: 7, def: 0.05 }, tags: ["rally"] }
    ],
    traits: ["诘汾之子", "依没鹿回部", "遣子如魏"],
    bio: "拓跋力微，诘汾之子，生而英叡。元年岁在庚子，西部内侵、国民离散，部众依没鹿回部大人窦宾。力微以骏马济宾而不言功，宾欲分国之半，不受，请率所部北居长川，积十数岁，德化大洽，诸旧部民咸来归附。景元二年遣其子沙漠汗如魏，且观风土。（《魏书·序纪》）",
    quote: "请率所部北居长川。",
    appear: [220, 265],
    impact: 3
  },
  "murong_muyan": {
    id: "murong_muyan",
    name: "慕容木延",
    aka: ["左贤王"],
    birth: null, death: null,
    faction: "xianbei",
    roles: ["lord"],
    stats: { lead: 66, war: 64, int: 58, pol: 56, cha: 62 },
    skills: [
      { id: "jicheng_beijian", name: "棘城之基", kind: "passive", desc: "父莫护跋从司马懿伐公孙渊封率义王，建国棘城之北，城防加成", mod: { citydef: 0.12 }, tags: ["fortify"] },
      { id: "quan_liucheng", name: "全柳城之功", kind: "passive", desc: "慕容部世居辽西，以柳城之功受拜，骑兵与征募加成", mod: { atk: 0.08, recruit: 0.08 }, tags: ["cavalry"] }
    ],
    traits: ["慕容部大人", "莫护跋之子", "左贤王"],
    bio: "慕容木延，鲜卑慕容部大人。其父莫护跋于魏初率诸部入居辽西，从司马懿伐公孙氏有功，拜率义王，始建国于棘城之北；因好燕代步摇冠，敛发袭冠，诸部呼为步摇，音讹为慕容。木延为左贤王，其子涉归以全柳城之功进拜鲜卑单于，迁邑于辽东之北。（《晋书·慕容廆载记》）",
    quote: "祖木延，左贤王。",
    appear: [184, 230],
    impact: 2
  },
  "pu_tou": {
    id: "pu_tou",
    name: "蒲头",
    birth: null, death: null,
    faction: "xianbei",
    roles: ["general"],
    stats: { lead: 60, war: 62, int: 50, pol: 46, cha: 52 },
    skills: [
      { id: "machneg_wei", name: "马城之役", kind: "passive", desc: "西部鲜卑，太和二年从田豫出塞讨郁筑鞬，骑战加成", mod: { atk: 0.10 }, tags: ["cavalry"] }
    ],
    traits: ["西部鲜卑大人", "从田豫出塞", "大破郁筑鞬"],
    bio: "蒲头，西部鲜卑大人。太和二年田豫遣译夏舍诣轲比能女婿郁筑鞬部，舍为鞬所杀。其秋，田豫将蒲头、泄归泥出塞讨郁筑鞬，大破之；还至马城，比能自将三万骑围豫七日乃去。（《三国志·田豫传》裴注）",
    quote: "豫将西部鲜卑蒲头、泄归泥出塞。",
    appear: [184, 230],
    impact: 1
  },

  /* ========== 乌桓 ========== */
  "qiu_liju": {
    id: "qiu_liju",
    name: "丘力居",
    birth: null, death: null,
    faction: "wuhuan",
    roles: ["lord"],
    stats: { lead: 74, war: 72, int: 60, pol: 52, cha: 68 },
    skills: [
      { id: "liaoxi_daren", name: "辽西大人", kind: "aura", desc: "众五千余落，与张纯合寇青徐幽冀四州，劫掠加成", mod: { atk: 0.08, gold: 0.08 }, tags: ["raiding"] },
      { id: "guanzicheng", name: "管子城之围", kind: "passive", desc: "围公孙瓒于辽西管子城二百余日，粮尽食马，围困加成", mod: { siege: 0.15 }, tags: ["siege"] }
    ],
    traits: ["辽西乌丸大人", "张纯附其众", "楼班之父"],
    bio: "丘力居，辽西乌丸大人，众五千余落，自称王。中平四年中山太守张纯叛入其众，自号弥天安定王，为三郡乌丸元帅，寇略青徐幽冀四州。公孙瓒追击深入无继，反为丘力居等围于管子城二百余日，粮尽食马。灵帝末以刘虞为幽州牧，募胡斩张纯。后丘力居死，子楼班年幼，从子蹋顿代立。（《三国志·乌丸传》）",
    quote: "围瓒于辽西管子城二百余日。",
    appear: [184, 190],
    impact: 3
  },
  "ta_dun": {
    id: "ta_dun",
    name: "蹋顿",
    birth: null, death: 207,
    faction: "wuhuan",
    roles: ["lord"],
    stats: { lead: 82, war: 86, int: 66, pol: 52, cha: 76 },
    skills: [
      { id: "bizhi_maodun", name: "比之冒顿", kind: "aura", desc: "边长老皆比之冒顿，总摄三王部，全军攻击与士气加成", mod: { atk: 0.14, morale: 8 }, tags: ["dread"] },
      { id: "zhu_shao_jieqin", name: "助绍击瓒", kind: "passive", desc: "遣使诣袁绍求和亲、助绍击公孙瓒，受单于印绶，骑兵加成", mod: { atk: 0.08, morale: 4 }, tags: ["cavalry"] },
      { id: "shiyuan_shouwangming", name: "恃远受亡命", kind: "passive", desc: "恃其阻远、敢受亡命以雄百蛮，边地征募与防御加成", mod: { recruit: 0.12, def: 0.08 }, tags: ["barbarian"] }
    ],
    traits: ["丘力居从子", "总摄三王部", "白狼山战死"],
    bio: "蹋顿，丘力居从子，有武略，代立而总摄三王部。袁绍与公孙瓒连战不决，蹋顿遣使求和亲、助绍击瓒，绍矫制赐单于印绶。边长老皆比之冒顿，袁尚、袁熙败后奔之。建安十二年曹操潜师北伐，登白狼山，张辽临陈斩蹋顿，首虏二十余万。（《三国志·乌丸传》）",
    quote: "恃其阻远，敢受亡命。",
    appear: [184, 207],
    impact: 4
  },
  "lou_ban": {
    id: "lou_ban",
    name: "楼班",
    birth: null, death: 207,
    faction: "wuhuan",
    roles: ["lord"],
    stats: { lead: 55, war: 55, int: 46, pol: 46, cha: 60 },
    skills: [
      { id: "feng_wei_danyu", name: "奉为单于", kind: "passive", desc: "丘力居之子，难楼、苏仆延奉为单于，部众号召加成", mod: { morale: 6, recruit: 0.08 }, tags: ["ritual"] }
    ],
    traits: ["丘力居之子", "三王共奉", "走辽东被斩"],
    bio: "楼班，丘力居之子。父死时年幼，及长，难楼、苏仆延率其部众奉为单于，蹋顿为王而犹秉计策。建安十二年曹操破乌丸于柳城，楼班与袁尚、乌延等走辽东，为辽东太守公孙康所斩，传首于曹操。（《三国志·乌丸传》）",
    quote: "奉楼班为单于，蹋顿为王。",
    appear: [185, 207],
    impact: 2
  },
  "su_puyan": {
    id: "su_puyan",
    name: "苏仆延",
    aka: ["峭王"],
    birth: null, death: 207,
    faction: "wuhuan",
    roles: ["lord"],
    stats: { lead: 68, war: 66, int: 58, pol: 52, cha: 62 },
    skills: [
      { id: "qiao_wang", name: "峭王", kind: "passive", desc: "辽东属国乌丸大人，众千余落，有计策勇健，攻击加成", mod: { atk: 0.08, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["辽东属国乌丸大人", "自称峭王", "与公孙康通使"],
    bio: "苏仆延，辽东属国乌丸大人，众千余落，自称峭王，有计策勇健。与难楼共奉楼班为单于，受袁绍所赐单于印绶。公孙康遣使韩忠齎单于印绶往假之，魏使牵招至柳城，与之争论真伪，峭王罢所严骑而辞辽东之使。建安十二年走辽东，为公孙康所斩。（《三国志·乌丸传》《牵招传》）",
    quote: "峭王大飨群长。",
    appear: [184, 207],
    impact: 2
  },
  "wuhuan_wu_yan": {
    id: "wuhuan_wu_yan",
    name: "乌延",
    aka: ["汗鲁王"],
    birth: null, death: 207,
    faction: "wuhuan",
    roles: ["lord"],
    stats: { lead: 66, war: 66, int: 56, pol: 48, cha: 60 },
    skills: [
      { id: "hanlu_wang", name: "汗鲁王", kind: "passive", desc: "右北平乌丸大人，自称汗鲁王，八百余落，骑射加成", mod: { range: 1, atk: 0.06 }, tags: ["cavalryarcher"] }
    ],
    traits: ["右北平乌丸大人", "自称汗鲁王", "走辽东被斩"],
    bio: "乌延，右北平乌丸大人，众八百余落，自称汗鲁王，有计策勇健。袁绍矫制赐蹋顿、难楼、苏仆延、乌延等单于印绶，以抚三郡乌丸。建安十二年曹操破乌丸于柳城，乌延与袁尚、楼班等走辽东，辽东太守公孙康并斩送其首。（《三国志·乌丸传》）",
    quote: "右北平乌丸大人乌延，众八百余落。",
    appear: [184, 207],
    impact: 2
  },
  "nan_lou": {
    id: "nan_lou",
    name: "难楼",
    birth: null, death: null,
    faction: "wuhuan",
    roles: ["lord"],
    stats: { lead: 70, war: 64, int: 58, pol: 54, cha: 66 },
    skills: [
      { id: "shanggu_jiuqian", name: "上谷九千落", kind: "passive", desc: "上谷乌丸大人，众九千余落，三郡乌丸中最盛，征募加成", mod: { recruit: 0.16 }, tags: ["barbarian"] }
    ],
    traits: ["上谷乌丸大人", "众九千余落", "共奉楼班"],
    bio: "难楼，上谷乌丸大人，众九千余落，于三郡乌丸中最为强盛，自称王。后与苏仆延率其部众奉楼班为单于。袁绍矫制赐蹋顿、难楼、苏仆延、乌延等单于印绶，皆以为单于，以抚三郡乌丸。（《三国志·乌丸传》）",
    quote: "上谷乌丸大人难楼，众九千余落。",
    appear: [184, 207],
    impact: 2
  },
  "wang_tong": {
    id: "wang_tong",
    name: "王同",
    aka: ["归义侯"],
    birth: null, death: null,
    faction: "wuhuan",
    roles: ["general"],
    stats: { lead: 58, war: 60, int: 48, pol: 45, cha: 50 },
    skills: [
      { id: "guiyi_hou_pan", name: "归义侯之叛", kind: "passive", desc: "乌丸归义侯而叛归轲比能，为牵招所讨斩，骑战加成", mod: { atk: 0.08, move: 1 }, tags: ["cavalry"] }
    ],
    traits: ["乌丸归义侯", "叛归轲比能", "为牵招所斩"],
    bio: "王同，乌丸归义侯。曹丕欲征吴，召牵招还，拜右中郎将，出为雁门太守。招构间离散鲜卑，使步度根、泄归泥与轲比能为隙，率归泥讨比能于云中故郡，杀比能弟苴罗侯，及叛乌丸归义侯王同、王寄等，大破之。（《三国志·牵招传》）",
    quote: "及叛乌丸归义侯王同、王寄等。",
    appear: [184, 228],
    impact: 1
  },
  "gu_jin": {
    id: "gu_jin",
    name: "骨进",
    aka: ["乌丸王"],
    birth: null, death: null,
    faction: "wuhuan",
    roles: ["lord"],
    stats: { lead: 66, war: 68, int: 50, pol: 46, cha: 58 },
    skills: [
      { id: "jieao_bugong", name: "桀黠不恭", kind: "passive", desc: "乌丸王，桀黠不恭，部众自雄，攻击与威压加成", mod: { atk: 0.10, morale: 4 }, tags: ["dread"] }
    ],
    traits: ["乌丸王", "桀黠不恭", "为田豫所斩"],
    bio: "骨进，乌丸王。桀黠不恭，田豫为护乌丸校尉，因出塞案行，单将麾下百余骑入其部。进逆拜，豫遂使左右斩之，显其罪恶以令众，众皆怖慑不敢动，便以进弟代领其众，自是胡人破胆，威震沙漠。（《三国志·田豫传》）",
    quote: "乌丸王骨进桀黠不恭。",
    appear: [184, 225],
    impact: 2
  },

  /* ========== 南匈奴 ========== */
  "yu_fu_luo": {
    id: "yu_fu_luo",
    name: "於夫罗",
    aka: ["於扶罗", "持至尸逐侯单于"],
    birth: null, death: 195,
    faction: "nanxiong",
    roles: ["lord"],
    stats: { lead: 66, war: 66, int: 52, pol: 45, cha: 58 },
    skills: [
      { id: "liu_ju_zhongguo", name: "留居中国", kind: "passive", desc: "本国反、父羌渠被杀，率众留中国，劫掠自给加成", mod: { gold: 0.10, atk: 0.06 }, tags: ["raiding"] },
      { id: "he_baibo", name: "与白波合", kind: "passive", desc: "与西河白波贼合，破太原、河内，抄略诸郡，骑兵加成", mod: { atk: 0.06, move: 1 }, tags: ["cavalry"] }
    ],
    traits: ["羌渠单于之子", "留居河东", "弟呼厨泉继立"],
    bio: "於夫罗，南单于羌渠之子。中平中发匈奴兵助汉，於夫罗率以助汉，会国人杀羌渠，於夫罗遂将其众留中国。因天下挠乱，与西河白波贼合，破太原、河内，抄略诸郡为寇；又助袁术屯封丘，为曹操所破。立七年而死，弟呼厨泉立。（《后汉书·南匈奴传》《武帝纪》裴注引王沈《魏书》）",
    quote: "与西河白波贼合，破太原、河内。",
    appear: [184, 195],
    impact: 3
  },
  "hu_chuquan": {
    id: "hu_chuquan",
    name: "呼厨泉",
    aka: ["南单于"],
    birth: null, death: null,
    faction: "nanxiong",
    roles: ["lord"],
    stats: { lead: 55, war: 55, int: 50, pol: 45, cha: 58 },
    skills: [
      { id: "rudan_yuchao", name: "南单于入朝", kind: "passive", desc: "建安二十一年入朝被留于邺，使右贤王监国，外交与安抚加成", mod: { morale: 5, gold: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["於夫罗之弟", "被留于邺", "匈奴自是折节"],
    bio: "呼厨泉，於夫罗之弟，兴平二年立为南单于。以兄被逐不得归国，数为鲜卑所抄。建安元年献帝自长安东归，右贤王去卑与白波帅韩暹等待卫天子；及车驾还洛阳，又徙迁许，然后归国。二十一年来朝，曹操因留之于邺，而遣去卑归监其国，匈奴自是折节。（《后汉书·南匈奴传》）",
    quote: "单于来朝，曹操因留于邺。",
    appear: [195, 230],
    impact: 3
  },
  "liu_bao": {
    id: "liu_bao",
    name: "刘豹",
    aka: ["左贤王", "左部帅"],
    birth: null, death: null,
    faction: "nanxiong",
    roles: ["general"],
    stats: { lead: 70, war: 68, int: 62, pol: 58, cha: 66 },
    skills: [
      { id: "zuoxianwang", name: "左贤王", kind: "passive", desc: "於夫罗之子，为南匈奴左贤王，部众号召加成", mod: { recruit: 0.12, morale: 5 }, tags: ["cavalry"] },
      { id: "zuobu_shuai", name: "左部帅", kind: "passive", desc: "魏武分匈奴为五部，豹为左部帅居太原兹氏，内政与征募加成", mod: { gold: 0.08, recruit: 0.06 }, tags: ["logistics"] }
    ],
    traits: ["於夫罗之子", "居太原兹氏", "刘渊之父"],
    bio: "刘豹，於夫罗之子。呼厨泉立，以豹为左贤王。建安二十一年曹操分南匈奴之众为五部，以豹为左部帅，居太原兹氏，其余部帅皆以刘氏为之。刘氏虽分居五部，然皆居于晋阳汾涧之滨，豹即刘渊之父。（《晋书·刘元海载记》）",
    quote: "以於扶罗子豹为左贤王。",
    appear: [195, 265],
    impact: 3
  },
  "qu_bei": {
    id: "qu_bei",
    name: "去卑",
    aka: ["右贤王"],
    birth: null, death: null,
    faction: "nanxiong",
    roles: ["general"],
    stats: { lead: 68, war: 70, int: 58, pol: 50, cha: 60 },
    skills: [
      { id: "shiwei_tianzi", name: "侍卫天子", kind: "passive", desc: "建安元年与白波帅韩暹等待卫献帝，拒击李傕、郭汜", mod: { def: 0.10, morale: 5 }, tags: ["guard"] },
      { id: "jian_guo", name: "右贤王监国", kind: "passive", desc: "呼厨泉留邺后归监其国，安抚匈奴部众，内政加成", mod: { gold: 0.08, morale: 5 }, tags: ["logistics"] }
    ],
    traits: ["南匈奴右贤王", "侍卫汉帝", "归监其国"],
    bio: "去卑，南匈奴右贤王。建安元年献帝自长安东归，去卑与白波帅胡才、李乐、韩暹等率众数千骑来，与董承、杨奉共击李傕、郭汜，大破之，又为后距以卫车驾。建安二十一年呼厨泉入朝留邺，曹操遣去卑归监其国。（《后汉书·南匈奴传》《献帝纪》）",
    quote: "右贤王去卑与白波贼帅韩暹等待卫天子。",
    appear: [184, 230],
    impact: 2
  },

  /* ========== 羌氐 ========== */
  "beigong_boyu": {
    id: "beigong_boyu",
    name: "北宫伯玉",
    aka: ["北宫玉"],
    birth: null, death: null,
    faction: "qiang",
    roles: ["lord"],
    stats: { lead: 64, war: 62, int: 50, pol: 40, cha: 55 },
    skills: [
      { id: "huangzhong_yicong", name: "湟中义从", kind: "passive", desc: "中平元年与李文侯为将军，杀护羌校尉泠征，骑兵加成", mod: { atk: 0.10 }, tags: ["cavalry"] },
      { id: "jie_zhi_bianzhang", name: "劫致边韩", kind: "passive", desc: "劫致边章、韩遂使专任军政，借名士以号召，征募加成", mod: { recruit: 0.12 }, tags: ["insight"] }
    ],
    traits: ["湟中义从胡", "杀护羌校尉泠征", "为韩遂所杀"],
    bio: "北宫伯玉，湟中义从胡。中平元年冬，北地先零羌及枹罕、河关群盗反叛，共立伯玉与李文侯为将军，杀护羌校尉泠征，又劫致金城边章、韩遂使专任军政，共杀金城太守陈懿，攻烧州郡。后为韩遂所杀，并其众。（《后汉书·董卓传》）",
    quote: "共立湟中义从胡北宫伯玉、李文侯为将军。",
    appear: [184, 190],
    impact: 2
  },
  "bian_zhang": {
    id: "bian_zhang",
    name: "边章",
    aka: ["边允"],
    birth: null, death: null,
    faction: "qiang",
    roles: ["strategist"],
    stats: { lead: 70, war: 66, int: 62, pol: 50, cha: 64 },
    skills: [
      { id: "bianyun_zhi", name: "边允之名", kind: "passive", desc: "本名边允，为州所购而改名章，凉州名士，声望加成", mod: { morale: 7 }, tags: ["scholar"] },
      { id: "rukou_sanfu", name: "入寇三辅", kind: "active", cd: 5, dur: 2, desc: "将数万骑入寇三辅、侵逼园陵，托诛宦官为名，骑战加成", mod: { atk: 0.15 }, tags: ["raiding"] }
    ],
    traits: ["金城名士", "本名边允", "为韩遂所杀"],
    bio: "边章本名边允，金城人，凉州名士。中平元年与韩遂同为湟中义从所劫，共为军帅，杀护羌校尉泠征。明年春将数万骑入寇三辅，侵逼园陵，托诛宦官为名。朝廷遣皇甫嵩、董卓征之，无功而还。后为韩遂所杀，而《典略》则云章寻病卒。（《后汉书·董卓传》）",
    quote: "杀护羌校尉泠征。",
    appear: [184, 190],
    impact: 2
  },
  "li_wenhou": {
    id: "li_wenhou",
    name: "李文侯",
    birth: null, death: null,
    faction: "qiang",
    roles: ["general"],
    stats: { lead: 60, war: 58, int: 48, pol: 40, cha: 52 },
    skills: [
      { id: "liangzhou_gongli", name: "凉州共立", kind: "passive", desc: "中平元年与北宫伯玉共为将军，攻烧州郡，防御加成", mod: { def: 0.08, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["湟中义从胡", "与伯玉同起", "为韩遂所杀"],
    bio: "李文侯，湟中义从胡。中平元年冬与北宫伯玉同为将军，杀护羌校尉泠征，劫致边章、韩遂，共杀金城太守陈懿，攻烧州郡。后与北宫伯玉、边章同被韩遂所杀，遂并其众，拥兵十余万，进围陇西。（《后汉书·董卓传》）",
    quote: "共立北宫伯玉、李文侯为将军。",
    appear: [184, 190],
    impact: 1
  },
  "song_jian": {
    id: "song_jian",
    name: "宋建",
    aka: ["河首平汉王"],
    birth: null, death: 214,
    faction: "qiang",
    roles: ["lord"],
    stats: { lead: 66, war: 64, int: 58, pol: 52, cha: 60 },
    skills: [
      { id: "he_shou_wang", name: "河首平汉王", kind: "passive", desc: "因凉州乱自号河首平汉王，据枹罕三十余年，城防加成", mod: { citydef: 0.18 }, tags: ["fortify"] },
      { id: "zhi_baiguan", name: "置百官", kind: "passive", desc: "置丞相以下百官，割据河首三十余年，内政与征募加成", mod: { gold: 0.10, recruit: 0.08 }, tags: ["logistics"] }
    ],
    traits: ["枹罕人", "割据三十余年", "为夏侯渊所灭"],
    bio: "宋建，枹罕人。中平元年凉州义从反叛时已在其列，后因凉州大乱，自号河首平汉王，据枹罕三十余年，置丞相以下百官。建安十九年曹操使夏侯渊帅诸将讨之，渊至围枹罕，月余拔城，斩建及其所置丞相以下，河西诸羌尽降。（《三国志·夏侯渊传》）",
    quote: "宋建造为乱逆三十余年，渊一举灭之。",
    appear: [184, 214],
    impact: 3
  },
  "a_gui": {
    id: "a_gui",
    name: "阿贵",
    aka: ["兴国氐王"],
    birth: null, death: null,
    faction: "qiang",
    roles: ["lord"],
    stats: { lead: 62, war: 64, int: 48, pol: 42, cha: 54 },
    skills: [
      { id: "xingguo_di", name: "兴国氐王", kind: "passive", desc: "兴国氐王，部落万余，从马超为乱，攻守加成", mod: { atk: 0.08, def: 0.06 }, tags: ["barbarian"] }
    ],
    traits: ["兴国氐王", "部落万余", "为夏侯渊所灭"],
    bio: "阿贵，兴国氐王。与白项氐王千万各有部落万余，建安十六年从马超为乱。马超破后，阿贵为夏侯渊所攻灭，其部落不能去者皆降，魏分徙其众，置扶风、美阳，以安夷、抚夷二部护军典之。（《魏略·西戎传》）",
    quote: "兴国氐王阿贵、白项氐王千万各有部落万余。",
    appear: [184, 215],
    impact: 2
  },
  "yang_qianwan": {
    id: "yang_qianwan",
    name: "杨千万",
    aka: ["千万", "白项氐王"],
    birth: null, death: null,
    faction: "qiang",
    roles: ["lord"],
    stats: { lead: 60, war: 62, int: 46, pol: 42, cha: 52 },
    skills: [
      { id: "baixiang_di", name: "白项氐王", kind: "passive", desc: "白项氐王，部落万余，超破后西南入蜀，山地行军加成", mod: { landmove: 1, def: 0.06 }, tags: ["barbarian"] }
    ],
    traits: ["白项氐王", "部落万余", "西南入蜀"],
    bio: "千万，白项氐王，仇池杨氏之族。建安中部落万余，与兴国氐王阿贵并从马超为乱。马超破后，千万西南入蜀，其部落不能去者皆降于魏，魏分徙两安置于扶风、美阳，置安夷、抚夷二部护军典之。（《魏略·西戎传》）",
    quote: "白项氐王千万各有部落万余。",
    appear: [184, 220],
    impact: 2
  },
  "cheng_yi": {
    id: "cheng_yi",
    name: "成宜",
    birth: null, death: 211,
    faction: "qiang",
    roles: ["general"],
    stats: { lead: 58, war: 62, int: 45, pol: 40, cha: 50 },
    skills: [
      { id: "weinan_zhancheng", name: "渭南陷阵", kind: "passive", desc: "关中十部之一，据河潼列营，与曹军夹渭而战，攻击加成", mod: { atk: 0.08 }, tags: ["rally"] }
    ],
    traits: ["关西诸将", "关中十部", "渭南被斩"],
    bio: "成宜，关西诸将。建安十六年与马超、韩遂、杨秋、李堪等俱叛，屯潼关，同据河、潼列营。曹操潜遣徐晃、朱灵夜渡蒲阪津，据河西为营，复纵虎骑夹击，大破之于渭南，成宜与李堪同被斩。（《三国志·武帝纪》）",
    quote: "斩成宜、李堪等。",
    appear: [184, 211],
    impact: 1
  },
  "e_zhesai": {
    id: "e_zhesai",
    name: "蛾遮塞",
    birth: null, death: null,
    faction: "qiang",
    roles: ["general"],
    stats: { lead: 62, war: 66, int: 50, pol: 42, cha: 54 },
    skills: [
      { id: "baitucheng", name: "白土城之战", kind: "passive", desc: "正始九年屯河关、白土故城据河拒郭淮，据险守御加成", mod: { def: 0.12 }, tags: ["fortify"] }
    ],
    traits: ["西平诸羌帅", "相结叛乱", "据河拒郭淮"],
    bio: "蛾遮塞，羌帅。正始八年，陇西、南安、金城、西平诸羌饿何、烧戈、伐同、蛾遮塞等相结叛乱，攻围城邑，南招蜀兵，凉州名胡治无戴复叛应之。郭淮进讨，斩饿何、烧戈，降服者万余落。九年，遮塞等屯河关、白土故城，据河拒军，淮密于上流渡兵据白土城，击，大破之。（《三国志·郭淮传》）",
    quote: "遮塞等屯河关、白土故城，据河拒军。",
    appear: [184, 250],
    impact: 2
  },
  /* ========== 山越 ========== */
  "zu_lang": {
    id: "zu_lang",
    name: "祖郎",
    aka: ["泾县大帅"],
    birth: null, death: null,
    faction: "shanyue",
    roles: ["lord"],
    stats: { lead: 68, war: 72, int: 55, pol: 45, cha: 60 },
    skills: [
      { id: "jingshe_zhi_xi", name: "泾县之袭", kind: "passive", desc: "兴平中袭孙策于泾县几至危殆，险县山径设伏，伏击加成", mod: { atk: 0.10 }, tags: ["ambush"] },
      { id: "shou_yin_neiying", name: "受印内应", kind: "active", cd: 4, dur: 2, desc: "受陈瑀印传三十余纽，与焦已等约为内应，煽动山越响应", mod: { morale: 6, atk: 0.08 }, tags: ["rally"] }
    ],
    traits: ["丹杨泾县大帅", "几危孙策", "禽灭于江东"],
    bio: "祖郎，丹杨泾县险县大帅。兴平中孙策依舅吴景召募于丹杨，得数百人，为祖郎所袭，几至危殆。建安二年陈瑀阴图袭策，遣都尉万演密渡江，持印传三十余纽授祖郎、焦已及严白虎等，使为内应。孙策破陈瑀，还讨祖郎，禽灭之。（《三国志·孙策传》裴注引《江表传》）",
    quote: "为泾县大帅祖郎所袭，几至危殆。",
    appear: [184, 200],
    impact: 2
  },
  "you_tu": {
    id: "you_tu",
    name: "尤突",
    birth: null, death: 216,
    faction: "shanyue",
    roles: ["general"],
    stats: { lead: 62, war: 66, int: 50, pol: 40, cha: 52 },
    skills: [
      { id: "poyang_zhi_luan", name: "鄱阳之乱", kind: "passive", desc: "受曹公印绶化民为贼，陵阳、始安、泾县皆与相应，煽动山越", mod: { recruit: 0.10 }, tags: ["raiding"] }
    ],
    traits: ["鄱阳民帅", "受曹公印绶", "为贺齐陆逊所破"],
    bio: "尤突，鄱阳民帅。建安二十一年受曹操印绶，化民为贼，陵阳、始安、泾县皆与突相应。孙权遣贺齐与陆逊讨破之，斩首数千，余党震服，丹杨三县皆降，料得精兵八千人。陆逊亦以讨突之功拜定威校尉。（《三国志·贺齐传》《陆逊传》）",
    quote: "鄱阳民尤突受曹公印绶，化民为贼。",
    appear: [184, 216],
    impact: 2
  },
  "peng_cai": {
    id: "peng_cai",
    name: "彭材",
    birth: null, death: 213,
    faction: "shanyue",
    roles: ["general"],
    stats: { lead: 58, war: 62, int: 45, pol: 40, cha: 50 },
    skills: [
      { id: "yuzhang_minluan", name: "豫章民乱", kind: "passive", desc: "建安十八年聚众万余起为贼乱于豫章东部，劫掠州郡加成", mod: { atk: 0.08 }, tags: ["raiding"] }
    ],
    traits: ["豫章东部民", "众万余", "首恶见诛"],
    bio: "彭材，豫章东部民。建安十八年与李玉、王海等起为贼乱，众万余人。孙权遣威武中郎将贺齐讨平之，诛其首恶，余皆降服，拣其精健为兵，次为县户。贺齐以功迁奋武将军。（《三国志·贺齐传》）",
    quote: "豫章东部民彭材、李玉、王海等起为贼乱，众万余人。",
    appear: [184, 213],
    impact: 1
  },
  "fei_zhan": {
    id: "fei_zhan",
    name: "费栈",
    birth: null, death: null,
    faction: "shanyue",
    roles: ["general"],
    stats: { lead: 64, war: 66, int: 58, pol: 42, cha: 55 },
    skills: [
      { id: "danyang_neiying", name: "丹杨内应", kind: "active", cd: 5, dur: 2, desc: "受曹公印绶扇动山越为内应，支党众多，山谷鼓噪而前", mod: { atk: 0.10, morale: 5 }, tags: ["ambush"] }
    ],
    traits: ["丹杨贼帅", "受曹公印绶", "支党众多"],
    bio: "费栈，丹杨贼帅。孙权为将军时，栈受曹操印绶，扇动山越，为作内应，权遣帐下右部督陆逊讨之。栈支党多而往兵少，逊乃益施牙幢，分布鼓角，夜潜山谷间，鼓噪而前，应时破散，遂部伍东三郡，得精卒数万人。（《三国志·陆逊传》）",
    quote: "丹杨贼帅费栈受曹公印绶，扇动山越，为作内应。",
    appear: [184, 225],
    impact: 2
  },
  "huang_luan": {
    id: "huang_luan",
    name: "黄乱",
    birth: null, death: null,
    faction: "shanyue",
    roles: ["general"],
    stats: { lead: 60, war: 64, int: 48, pol: 40, cha: 52 },
    skills: [
      { id: "sanjun_shanmin", name: "三郡山民", kind: "passive", desc: "与常俱等为建安、鄱阳、新都三郡山民作乱，据险劫掠加成", mod: { def: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["三郡山民贼帅", "与常俱同乱", "部伍充兵役"],
    bio: "黄乱，建安、鄱阳、新都三郡山民贼帅。吴中期与常俱等作乱，孙权出钟离牧为监军使者讨平之，黄乱、常俱等出其部伍以充兵役，钟离牧以功封秦亭侯、拜越骑校尉。会稽典录称钟离牧威恩部伍、智勇分明，有古人之风。（《三国志·钟离牧传》）",
    quote: "贼帅黄乱、常俱等出其部伍，以充兵役。",
    appear: [184, 250],
    impact: 1
  },
  "mao_gan": {
    id: "mao_gan",
    name: "毛甘",
    birth: null, death: null,
    faction: "shanyue",
    roles: ["general"],
    stats: { lead: 58, war: 60, int: 46, pol: 42, cha: 50 },
    skills: [
      { id: "wuliao_shan_tun", name: "乌聊山之屯", kind: "passive", desc: "歙贼帅，万户屯乌聊山，依山筑垒拒贺齐，据险守御加成", mod: { def: 0.10 }, tags: ["fortify"] }
    ],
    traits: ["歙贼帅", "万户屯乌聊山", "降于贺齐"],
    bio: "毛甘，歙贼帅。建安十三年孙权遣威武中郎将贺齐讨丹杨黟、歙。毛甘以万户屯乌聊山，与黟帅陈仆、祖山及歙帅金奇并据险自守。贺齐凿山为缘道，夜令潜上，四面鸣鼓角以乱贼心，大破陈仆等，斩首七千，余皆降。（《三国志·贺齐传》）",
    quote: "歙贼帅金奇万户屯安勒山，毛甘万户屯乌聊山。",
    appear: [184, 213],
    impact: 1
  },
  "chen_pu": {
    id: "chen_pu",
    name: "陈仆",
    birth: null, death: 208,
    faction: "shanyue",
    roles: ["general"],
    stats: { lead: 62, war: 68, int: 48, pol: 40, cha: 52 },
    skills: [
      { id: "linlishan_zhi_shou", name: "林历山之守", kind: "passive", desc: "与祖山二万户屯林历山，四面壁立、径路危狭，临高下石", mod: { def: 0.14 }, tags: ["fortify"] }
    ],
    traits: ["黟帅", "二万户屯林历山", "为贺齐所破斩"],
    bio: "陈仆，黟县贼帅。建安十三年与祖山等二万户屯林历山，山四面壁立，高数十丈，径路危狭，不容刀楯，贼临高下石，不可得攻。贺齐阴募轻捷士，作铁弋拓山为缘道，夜令潜上，悬布援人，四面鸣鼓角，贼惊惧惑乱，大军因是得上，大破陈仆等。（《三国志·贺齐传》）",
    quote: "黟帅陈仆、祖山等二万户屯林历山。",
    appear: [184, 208],
    impact: 1
  },
  "jin_qi": {
    id: "jin_qi",
    name: "金奇",
    birth: null, death: null,
    faction: "shanyue",
    roles: ["general"],
    stats: { lead: 56, war: 60, int: 46, pol: 40, cha: 48 },
    skills: [
      { id: "anle_shan_tun", name: "安勒山之屯", kind: "passive", desc: "歙贼帅，万户屯安勒山，与毛甘、陈仆相倚拒吴军，守御加成", mod: { def: 0.10 }, tags: ["fortify"] }
    ],
    traits: ["歙贼帅", "万户屯安勒山", "降于贺齐"],
    bio: "金奇，歙县贼帅。建安十三年贺齐迁威武中郎将，讨丹杨黟、歙，时武强、叶乡、东阳、丰浦四乡先降，而金奇以万户屯安勒山，毛甘万户屯乌聊山，黟帅陈仆、祖山等二万户屯林历山。齐破林历山后余皆降，遂分歙为新定、黎阳、休阳，立新都郡。（《三国志·贺齐传》）",
    quote: "歙贼帅金奇万户屯安勒山。",
    appear: [184, 213],
    impact: 1
  },
  /* ========== 南蛮 南中诸帅 ========== */
  "yong_kai": {
    id: "yong_kai",
    name: "雍闿",
    birth: null, death: 225,
    faction: "nanman",
    roles: ["lord"],
    stats: { lead: 70, war: 62, int: 74, pol: 66, cha: 72 },
    skills: [
      { id: "nanzhong_daxing", name: "南中大姓", kind: "aura", desc: "益州大姓，恩信著于南土，夷汉多为所服，邻军士气加成", mod: { morale: 5, atk: 0.05 }, tags: ["rally"] },
      { id: "jia_guijiao", name: "假鬼教", kind: "active", cd: 5, dur: 2, desc: "假鬼教言张裔如瓠壶而缚送于吴，煽动夷叟叛蜀从乱", mod: { recruit: 0.12 }, tags: ["insight"] }
    ],
    traits: ["益州大姓", "恩信著于南土", "为高定部曲所杀"],
    bio: "雍闿，益州大姓，恩信著于南土。先主薨后，闿杀太守正昂，假鬼教执送蜀郡张裔于吴，孙权遥用为永昌太守。闿又使建宁孟获说夷叟，益州夷皆从之。建兴三年诸葛亮南征，自安上入越嶲，高定部曲杀雍闿，孟获代领其众。（《华阳国志·南中志》）",
    quote: "天无二日，土无二王。今天下派分，正朔有三。",
    appear: [184, 225],
    impact: 3
  },
  "gao_ding": {
    id: "gao_ding",
    name: "高定",
    aka: ["高定元"],
    birth: null, death: 225,
    faction: "nanman",
    roles: ["lord"],
    stats: { lead: 68, war: 74, int: 58, pol: 50, cha: 64 },
    skills: [
      { id: "yuexi_soushuai", name: "越嶲叟帅", kind: "passive", desc: "杀郡将焦璜、举郡称王，叟夷悉从，山地作战与攻击加成", mod: { atk: 0.10, landmove: 1 }, tags: ["barbarian"] },
      { id: "weilei_zhishou", name: "旄牛定笮之垒", kind: "passive", desc: "自旄牛、定笮、卑水多为垒守，俟敌众集而后合战，筑垒加成", mod: { citydef: 0.12, def: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["越嶲叟帅", "举郡称王", "为诸葛亮所斩"],
    bio: "高定元，越嶲叟帅。先主薨后，杀郡将焦璜，举郡称王以叛。建兴三年诸葛亮南征，自安上由水路入越嶲，定元自旄牛、定笮、卑水多为垒守，亮欲俟其军众集合并讨之，军于卑水，定元部曲杀雍闿，亮既斩定元。（《华阳国志·南中志》）",
    quote: "越嶲叟帅高定元杀郡将焦璜，举郡称王以叛。",
    appear: [184, 225],
    impact: 3
  },
  "zhu_bao": {
    id: "zhu_bao",
    name: "朱褒",
    birth: null, death: 225,
    faction: "nanman",
    roles: ["general"],
    stats: { lead: 58, war: 60, int: 56, pol: 52, cha: 48 },
    skills: [
      { id: "zangke_jushou", name: "牂柯据郡", kind: "passive", desc: "以牂柯郡丞领太守，杀从事常颀为乱，据郡自守加成", mod: { citydef: 0.12 }, tags: ["fortify"] }
    ],
    traits: ["朱提人", "牂柯郡丞领太守", "为马忠所破"],
    bio: "朱褒，朱提人，牂柯郡丞领太守，恣睢不法。诸葛亮以初遭大丧，未便加兵，遣越嶲太守龚禄住安上，从事常颀行部南入；颀至牂柯收郡主簿考讯奸，褒因杀颀为乱。建兴三年春亮南征，别遣马忠伐牂柯，破之。（《华阳国志·南中志》）",
    quote: "牂柯郡丞朱提朱褒领太守，恣睢。",
    appear: [184, 225],
    impact: 2
  },
  "meng_huo": {
    id: "meng_huo",
    name: "孟获",
    birth: null, death: null,
    faction: "nanman",
    roles: ["general"],
    stats: { lead: 72, war: 76, int: 62, pol: 54, cha: 80 },
    skills: [
      { id: "yihan_suofu", name: "夷汉所服", kind: "aura", desc: "为夷汉所服，代雍闿为主，南中诸部乐为用，邻军士气加成", mod: { morale: 6, atk: 0.06 }, tags: ["rally"] },
      { id: "wei_yi_shemou", name: "为夷设谋", kind: "active", cd: 5, dur: 2, desc: "说夷叟以乌狗三百、斲木三千之求，激夷叛官，煽动夷众", mod: { recruit: 0.14 }, tags: ["insight"] }
    ],
    traits: ["建宁人", "夷汉所服", "七虏七赦"],
    bio: "孟获，建宁人，为夷汉所服，雍闿使获说夷叟，夷皆从闿；雍闿死后获代领其众为主。建兴三年五月，诸葛亮渡泸生虏获，置军中，凡七虏七赦；裴注引《汉晋春秋》作七纵七擒，乃传闻之辞。后为蜀汉官属，官至御史中丞。（《华阳国志·南中志》）",
    quote: "公，天威也！边民长不为恶矣。",
    appear: [184, 240],
    impact: 4
  },
  "cuan_xi": {
    id: "cuan_xi",
    name: "爨习",
    birth: null, death: null,
    faction: "nanman",
    roles: ["general"],
    stats: { lead: 66, war: 62, int: 60, pol: 58, cha: 60 },
    skills: [
      { id: "jianning_daxing", name: "建宁大姓", kind: "passive", desc: "建宁爨氏大姓，为建伶令，宗族部曲众多，征募加成", mod: { recruit: 0.12 }, tags: ["logistics"] }
    ],
    traits: ["建宁大姓", "建伶令", "官至领军"],
    bio: "爨习，建宁大姓，为建伶令。李恢仕郡督邮时，坐习有违犯之事免官，太守董和以习方土大姓，寝而不许。建兴三年诸葛亮平南中，收其俊杰建宁爨习、朱提孟琰及孟获为官属，习后官至领军。（《三国志·李恢传》《华阳国志·南中志》）",
    quote: "姑夫爨习为建伶令，有违犯之事，恢坐习免官。",
    appear: [184, 245],
    impact: 2
  },
  "meng_yan": {
    id: "meng_yan",
    name: "孟琰",
    birth: null, death: null,
    faction: "nanman",
    roles: ["general"],
    stats: { lead: 68, war: 70, int: 56, pol: 48, cha: 60 },
    skills: [
      { id: "zhuti_jingzu", name: "朱提劲卒", kind: "passive", desc: "朱提孟氏，为诸葛亮所收，统南中劲卒青羌，攻击加成", mod: { atk: 0.10 }, tags: ["barbarian"] }
    ],
    traits: ["朱提人", "亮收为官属", "官至辅汉将军"],
    bio: "孟琰，朱提人，南中大姓。建兴三年诸葛亮平南中，收其俊杰爨习、孟琰及孟获为官属，又移南中劲卒青羌万余家于蜀为五部，所当无前，号飞军；琰以功官至辅汉将军。（《华阳国志·南中志》）",
    quote: "亮收其俊杰建宁爨习，朱提孟琰及获为官属。",
    appear: [184, 250],
    impact: 2
  },
  /* ========== 交州 士氏 ========== */
  "shi_xie": {
    id: "shi_xie",
    name: "士燮",
    zi: "威彦",
    aka: ["士威彦", "龙编侯"],
    birth: 137, death: 226,
    faction: "jiao",
    roles: ["lord"],
    stats: { lead: 68, war: 52, int: 82, pol: 84, cha: 86 },
    skills: [
      { id: "jiaozhi_sishi", name: "在郡四十余岁", kind: "passive", desc: "治交阯四十余岁，疆埸无事、民不失业，城池与民心加成", mod: { citydef: 0.12, morale: 5 }, tags: ["logistics"] },
      { id: "zuoshi_chunqiu", name: "左氏春秋之学", kind: "aura", desc: "治《左氏春秋》为之注解，中国士人往依者以百数，文教加成", mod: { xp: 0.10, morale: 4 }, tags: ["scholar"] },
      { id: "bufei_gongzhi", name: "不废贡职", kind: "active", cd: 4, dur: 3, desc: "道路断绝而贡职不废，遣张旻奉贡京师，金币与声望加成", mod: { gold: 120, recruit: 0.08 }, tags: ["ritual"] }
    ],
    traits: ["体器宽厚", "谦虚下士", "威尊无上"],
    bio: "士燮字威彦，苍梧广信人，其先鲁国汶阳人，王莽之乱避地交州。父赐，桓帝时为日南太守。燮少游学京师，事颍川刘子奇，治《左氏春秋》，举茂才，迁交阯太守。体器宽厚，谦虚下士，中国士人往依避难者以百数。黄武五年卒，年九十。（《三国志·士燮传》）",
    quote: "处大乱之中，保全一郡，二十余年疆埸无事。",
    appear: [184, 226],
    impact: 4
  },
  "jiao_shi_yi": {
    id: "jiao_shi_yi",
    name: "士壹",
    birth: null, death: null,
    faction: "jiao",
    roles: ["general"],
    stats: { lead: 58, war: 56, int: 60, pol: 62, cha: 64 },
    skills: [
      { id: "hepu_zhishou", name: "合浦太守", kind: "passive", desc: "领合浦太守，尝贡马数百匹，郡内劝农通商，金币加成", mod: { gold: 80, recruit: 0.06 }, tags: ["logistics"] }
    ],
    traits: ["士燮之弟", "合浦太守", "免庶人后坐法诛"],
    bio: "士壹，士燮之弟。初为郡督邮，送刺史丁宫还京，宫后为司徒辟壹；黄琬代为司徒，甚礼遇之。董卓恶其尽心于琬，署教称司徒掾士壹不得除用，故历年不迁。燮表领合浦太守，权拜偏将军、都乡侯，壹尝贡马数百匹。士徽事后与䵋同免为庶人，数岁坐法诛。（《三国志·士燮传》裴注引《吴书》）",
    quote: "司徒掾士壹，不得除用。",
    appear: [184, 235],
    impact: 2
  },
  "shi_wei": {
    id: "shi_wei",
    name: "士䵋",
    birth: null, death: null,
    faction: "jiao",
    roles: ["general"],
    stats: { lead: 56, war: 54, int: 58, pol: 60, cha: 58 },
    skills: [
      { id: "jiuzhen_zhishou", name: "九真太守", kind: "passive", desc: "以徐闻令领九真太守，与兄弟并据列郡，南疆郡治加成", mod: { citydef: 0.10 }, tags: ["fortify"] }
    ],
    traits: ["士燮次弟", "九真太守", "与士壹同诛"],
    bio: "士䵋（音于鄙反，见《字林》），士燮次弟，本为徐闻令，燮表领九真太守。士氏兄弟并为列郡，雄长一州，偏在万里，威尊无上，出入鸣钟磬、备具威仪，笳箫鼓吹，胡人夹毂焚香者常有数十。士徽事后，与兄壹俱免为庶人，数岁坐法诛。（《三国志·士燮传》）",
    quote: "次弟徐闻令䵋领九真太守。",
    appear: [184, 235],
    impact: 1
  },
  "shi_wu": {
    id: "shi_wu",
    name: "士武",
    birth: null, death: null,
    faction: "jiao",
    roles: ["general"],
    stats: { lead: 56, war: 54, int: 56, pol: 58, cha: 56 },
    skills: [
      { id: "nanhai_zhishou", name: "南海太守", kind: "passive", desc: "领南海太守，交州海道为珍货所通，水运与商货加成", mod: { watermove: 1, gold: 60 }, tags: ["naval"] }
    ],
    traits: ["士燮之弟", "南海太守", "先病没"],
    bio: "士武，士䵋之弟，士燮之弟也，领南海太守，与诸兄并为列郡，雄长一州。南海为交州海道要冲，士氏藉之通商贾、致明珠大贝犀象之珍。武先病没，故不及黄武五年士徽之难。（《三国志·士燮传》）",
    quote: "䵋弟武，领南海太守。",
    appear: [184, 220],
    impact: 1
  },
  "shi_hui": {
    id: "shi_hui",
    name: "士徽",
    birth: null, death: 226,
    faction: "jiao",
    roles: ["general"],
    stats: { lead: 56, war: 62, int: 46, pol: 44, cha: 42 },
    skills: [
      { id: "zongbing_juliang", name: "发宗兵拒良", kind: "active", cd: 4, dur: 2, desc: "自署交阯太守发宗兵拒戴良，笞杀谏者桓邻，守城加成", mod: { citydef: 0.12, atk: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["士燮之子", "自署交阯太守", "兄弟六人俱诛"],
    bio: "士徽，士燮子。燮卒后孙权分交州为广、交二州，遣戴良为交州刺史，陈时代燮为交阯太守。徽自署交阯太守，发宗兵拒良，笞杀谏者桓邻，邻兄治、子发合宗兵击之。吕岱被诏诛徽，昼夜驰入，徽兄弟六人肉袒奉迎，皆伏诛，传首武昌。（《三国志·士燮传》）",
    quote: "徽兄弟六人肉袒奉迎……即皆伏诛。",
    appear: [200, 226],
    impact: 2
  },
  "zhang_min": {
    id: "zhang_min",
    name: "张旻",
    birth: null, death: null,
    faction: "jiao",
    roles: ["minister"],
    stats: { lead: 40, war: 38, int: 58, pol: 62, cha: 58 },
    skills: [
      { id: "fenggong_jingshi", name: "奉贡京都", kind: "passive", desc: "天下丧乱、道路断绝而奉贡不废，通使与后勤加成", mod: { gold: 70, xp: 0.06 }, tags: ["logistics"] }
    ],
    traits: ["士燮之吏", "奉贡诣京都", "拜安远将军"],
    bio: "张旻，士燮之吏。汉闻交州刺史张津死，赐燮玺书，拜绥南中郎将、董督七郡，领交阯太守如故。燮遣旻奉贡诣京都，是时天下丧乱，道路断绝，而燮不废贡职，特复下诏拜安远将军，封龙度亭侯。交州万里之贡，实由旻通之。（《三国志·士燮传》）",
    quote: "燮遣吏张旻奉贡诣京都。",
    appear: [184, 226],
    impact: 1
  },
  "huan_lin": {
    id: "huan_lin",
    name: "桓邻",
    birth: null, death: 226,
    faction: "jiao",
    roles: ["minister"],
    stats: { lead: 42, war: 44, int: 60, pol: 64, cha: 66 },
    skills: [
      { id: "koutou_jianhui", name: "叩头谏徽", kind: "passive", desc: "以士燮举吏叩头谏士徽迎戴良，忠谏被害，礼法与士气加成", mod: { morale: 5 }, tags: ["ritual"] }
    ],
    traits: ["交阯人", "士燮举吏", "为士徽笞杀"],
    bio: "桓邻，交阯人，士燮所举吏也。士徽自署交阯太守拒戴良，邻叩头谏徽使迎良，徽怒，笞杀之。邻兄治、子发合宗兵击徽，徽闭门城守，治等攻之数月不能下，乃约和亲，各罢兵还。（《三国志·士燮传》）",
    quote: "叩头谏徽使迎良，徽怒，笞杀邻。",
    appear: [184, 226],
    impact: 1
  },
  "liu_xi": {
    id: "liu_xi",
    name: "刘熙",
    birth: null, death: null,
    faction: "jiao",
    roles: ["minister"],
    stats: { lead: 30, war: 30, int: 80, pol: 62, cha: 74 },
    skills: [
      { id: "shiming_zhi_xue", name: "《释名》之学", kind: "aura", desc: "著《释名》辨名物训诂，避乱交州，程秉、薛综皆从受学，经学加成", mod: { xp: 0.12 }, tags: ["scholar"] }
    ],
    traits: ["汉末大儒", "著《释名》", "避地交州"],
    bio: "刘熙，汉末大儒，著《释名》以辨名物训诂。避乱交州，士人从之者众：程秉逮事郑玄，后避乱交州，与刘熙考论大义，遂博通五经，士燮命为长史；薛综少依族人避地交州，从刘熙学，后除合浦、交阯太守。（《三国志·程秉传》《薛综传》）",
    quote: "与刘熙考论大义，遂博通五经。",
    appear: [184, 220],
    impact: 2
  },
  /* ========== 徐州 陶谦集团 ========== */
  "tao_qian": {
    id: "tao_qian",
    name: "陶谦",
    zi: "恭祖",
    aka: ["陶恭祖", "溧阳侯"],
    birth: 132, death: 194,
    faction: "xu",
    roles: ["lord"],
    stats: { lead: 66, war: 60, int: 62, pol: 60, cha: 58 },
    skills: [
      { id: "xuzhou_muye", name: "徐州牧", kind: "passive", desc: "徐州百姓殷盛、谷米封赡，流民多归之，粮秣与征募加成", mod: { food: 120, recruit: 0.08 }, tags: ["logistics"] },
      { id: "po_zou_huangjin", name: "破走黄巾", kind: "active", cd: 4, dur: 2, desc: "以徐州刺史击黄巾破走之，复遣使间行贡献，攻击与士气加成", mod: { atk: 0.10, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["刚直有大节", "刑政失和", "合从阙宣"],
    bio: "陶谦字恭祖，丹杨人。初举茂才，除舒令，迁幽州刺史，参张温军事，西讨韩遂。会徐州黄巾起，以谦为徐州刺史，击破之，迁安东将军、徐州牧，封溧阳侯。徐州殷盛，流民多归之；然背道任情，亲任曹宏等谗慝，刑政失和，由是渐乱。兴平元年病死，年六十三。（《三国志·陶谦传》裴注引《吴书》）",
    quote: "谦自谢朝廷，岂为公邪？",
    appear: [184, 194],
    impact: 4
  },
  "chen_deng": {
    id: "chen_deng",
    name: "陈登",
    zi: "元龙",
    aka: ["陈元龙"],
    birth: null, death: 201,
    faction: "xu",
    roles: ["general"],
    stats: { lead: 78, war: 70, int: 80, pol: 78, cha: 76 },
    skills: [
      { id: "guangling_weiming", name: "广陵威名", kind: "aura", desc: "在广陵明审赏罚、威信宣布，海贼万有余户束手归命，征募加成", mod: { morale: 5, recruit: 0.08 }, tags: ["rally"] },
      { id: "kuangqi_po_ce", name: "匡琦破策", kind: "active", cd: 5, dur: 2, desc: "闭门示弱、昧爽开南门钞贼后，火聚疑兵大破孙策军", mod: { atk: 0.14 }, tags: ["ambush"] }
    ],
    traits: ["湖海之士", "豪气不除", "年三十九卒"],
    bio: "陈登字元龙，下邳人，陈珪之子。年二十五举孝廉，除东阳长。陶谦表为典农校尉，巡土田之宜，尽凿溉之利，秔稻丰积。曹操拜为广陵太守，令阴合部众以图吕布；登率郡兵为军先驱，布诛，以功加拜伏波将军。后破孙策军于匡琦城，有吞灭江南之志，年三十九卒。（《三国志·吕布传》裴注引《先贤行状》）",
    quote: "陈元龙湖海之士，豪气不除。",
    appear: [184, 201],
    impact: 3
  },
  "chen_gui": {
    id: "chen_gui",
    name: "陈珪",
    birth: null, death: null,
    faction: "xu",
    roles: ["minister"],
    stats: { lead: 40, war: 36, int: 78, pol: 80, cha: 74 },
    skills: [
      { id: "juehun_xieyin", name: "绝婚械胤", kind: "active", cd: 5, dur: 3, desc: "说吕布绝袁术婚，追还嫁女、械送韩胤枭首许市，断敌盟好", mod: { def: 0.10, morale: 5 }, tags: ["insight"] },
      { id: "dashu_ju_shu", name: "答书拒术", kind: "passive", desc: "袁术胁质其子陈应求援，珪答书拒之，有犯死不能，气节加成", mod: { morale: 6 }, tags: ["ritual"] }
    ],
    traits: ["故太尉陈球弟子", "沛相", "拒袁术僭号之招"],
    bio: "陈珪，下邳人，故太尉陈球弟子也，为沛相。袁术与珪俱公族子孙，少共交游，术僭号后作书求援，并胁质其子陈应以图必致珪，珪答书拒之，称欲吾营私阿附、有犯死不能。又恐术、布成婚为徐扬合从之祸，往说吕布，追还已在涂之女，械送韩胤，枭首许市。（《三国志·袁术传》《吕布传》）",
    quote: "欲吾营私阿附，有犯死不能也。",
    appear: [184, 199],
    impact: 3
  },
  "cao_bao": {
    id: "cao_bao",
    name: "曹豹",
    birth: null, death: 196,
    faction: "xu",
    roles: ["general"],
    stats: { lead: 58, war: 62, int: 42, pol: 44, cha: 46 },
    skills: [
      { id: "tandong_yaoji", name: "屯郯东要击", kind: "passive", desc: "为陶谦将，与刘备屯郯东要击曹操，邀击官道与伏击加成", mod: { atk: 0.08 }, tags: ["ambush"] }
    ],
    traits: ["陶谦之将", "下邳相", "为张飞所杀"],
    bio: "曹豹，陶谦之将。兴平元年曹操复征徐州，还过郯，谦将曹豹与刘备屯郯东要太祖，太祖击破之。刘备领徐州后，以豹为下邳相，豹与张飞不睦，飞杀之，城中大乱。丹杨兵千人夜开西白城门纳吕布，布遂获刘备妻子军资及将吏士家口。（《三国志·武帝纪》《吕布传》裴注引《英雄记》）",
    quote: "谦将曹豹与刘备屯郯东要太祖。",
    appear: [184, 196],
    impact: 2
  },
  "ze_rong": {
    id: "ze_rong",
    name: "笮融",
    birth: null, death: null,
    faction: "xu",
    roles: ["general"],
    stats: { lead: 60, war: 58, int: 56, pol: 44, cha: 70 },
    skills: [
      { id: "futu_da_qi", name: "大起浮图祠", kind: "aura", desc: "以铜为人黄金涂身、课人读佛经，复他役招致之，征募加成", mod: { recruit: 0.15 }, tags: ["ritual"] },
      { id: "zuoduan_sanjun", name: "坐断三郡", kind: "passive", desc: "督广陵、彭城运漕，坐断三郡委输以自入，粮秣加成", mod: { food: 90 }, tags: ["raiding"] }
    ],
    traits: ["丹杨人", "督三郡运漕", "诈杀朱皓"],
    bio: "笮融，丹杨人。初聚众数百，往依徐州牧陶谦，谦使督广陵、下邳、彭城运漕，遂放纵擅杀，坐断三郡委输以自入。乃大起浮图祠，以铜为人，黄金涂身，衣以锦采，课人读佛经，每浴佛设酒饭、布席数十里，费以巨亿计。后南走豫章，诈杀太守朱皓，为刘繇所破，走入山，为民所杀。（《三国志·刘繇传》）",
    quote: "以铜为人，黄金涂身，衣以锦采。",
    appear: [184, 196],
    impact: 3
  },
  "zhao_yu": {
    id: "zhao_yu",
    name: "赵昱",
    birth: null, death: 194,
    faction: "xu",
    roles: ["minister"],
    stats: { lead: 52, war: 46, int: 68, pol: 72, cha: 78 },
    skills: [
      { id: "gaojie_lianzheng", name: "高絜廉正", kind: "passive", desc: "抱礼而立、旌善兴化，举孝廉除莒长，政为国表，民政加成", mod: { morale: 5, xp: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["徐方名士", "广陵太守", "拒笮融见害"],
    bio: "赵昱，琅邪人，徐方名士也。年十三母病，惨戚消瘠、祈祷泣血，乡党称孝。就处士綦毋君受《公羊传》，高絜廉正，州郡请召常称病不应。陶谦初辟别驾从事，辞疾逊遁，欲威以刑罚然后乃起，举茂才迁广陵太守。笮融自临淮迸入郡界，昱将兵拒战，败绩见害。（《三国志·陶谦传》裴注引谢承《后汉书》）",
    quote: "高絜廉正，抱礼而立。",
    appear: [184, 194],
    impact: 2
  },
  "xu_cao_hong": {
    id: "xu_cao_hong",
    name: "曹宏",
    birth: null, death: null,
    faction: "xu",
    roles: ["minister"],
    stats: { lead: 38, war: 36, int: 60, pol: 52, cha: 32 },
    skills: [
      { id: "chanhai_liangshan", name: "谗害良善", kind: "passive", desc: "陶谦亲任之谗慝小人，刑政失和、良善多被其害，藉势敛财加成", mod: { gold: 60 }, tags: ["dread"] }
    ],
    traits: ["陶谦亲任", "谗慝小人", "徐州渐乱之由"],
    bio: "曹宏，陶谦所亲任之谗慝小人也。陶谦背道任情，广陵太守赵昱以忠直见疏，而曹宏等并以谗慝见亲。刑政失和，良善多被其害，徐州由是渐乱。陈寿于陶谦传末特书其事，以为谦昏乱之一端。（《三国志·陶谦传》）",
    quote: "曹宏等，谗慝小人也，谦亲任之。",
    appear: [184, 194],
    impact: 1
  },
  "xu_dan": {
    id: "xu_dan",
    name: "许耽",
    birth: null, death: null,
    faction: "xu",
    roles: ["general"],
    stats: { lead: 52, war: 56, int: 60, pol: 48, cha: 50 },
    skills: [
      { id: "baimen_neiying", name: "白城门内应", kind: "active", cd: 5, dur: 2, desc: "遣司马章诳夜诣吕布，约丹杨兵开门内之，攻城与奇袭加成", mod: { siege: 0.15, atk: 0.06 }, tags: ["ambush"] }
    ],
    traits: ["刘备中郎将", "丹杨人", "开门纳吕布"],
    bio: "许耽，丹杨人，刘备之中郎将。建安元年，吕布水陆东下至下邳西四十里，耽夜遣司马章诳诣布，言张飞与下邳相曹豹共争、飞杀豹、城中大乱，丹杨兵千人屯西白城门内，可为内应。布遂夜进，天明丹杨兵悉开门纳布兵，布获刘备妻子军资及部曲将吏士家口。（《三国志·吕布传》裴注引《英雄记》）",
    quote: "丹杨兵有千人屯西白城门内，闻将军来东，大小踊跃。",
    appear: [184, 196],
    impact: 2
  },
  "zhang_kuang": {
    id: "zhang_kuang",
    name: "章诳",
    birth: null, death: null,
    faction: "xu",
    roles: ["general"],
    stats: { lead: 46, war: 50, int: 58, pol: 46, cha: 48 },
    skills: [
      { id: "ye_shuo_lvbu", name: "夜说吕布", kind: "passive", desc: "受许耽之遣夜诣吕布说城中内应，舌辩说降与侦察加成", mod: { vision: 2, xp: 0.06 }, tags: ["insight"] }
    ],
    traits: ["许耽之司马", "夜诣吕布", "说城中内应"],
    bio: "章诳，刘备中郎将许耽之司马。建安元年，吕布东下至下邳西，耽夜遣章诳诣布，具言张飞杀曹豹、城中大乱不相信，丹杨兵千人屯西白城门内，闻将军来东大小踊跃，可开门为内应。布遂夜进，晨到城下，遂据下邳。（《三国志·吕布传》裴注引《英雄记》）",
    quote: "将军兵向城西门，丹杨军便开门内将军矣。",
    appear: [184, 196],
    impact: 1
  }
};
