// 《代汉涂高》武将数据 第二部分：汉廷 / 蜀汉 / 益州 / 荆州 / 汉中
// 本卷依据《三国志》及裴松之注、《后汉书》《华阳国志》《晋书》等，不用演义人物与情节。
// 只收录 faction 为 han / shu / yi / jing / hanzhong 者。
window.GENERALS_PART2 = {

  /* ===================== 汉廷 han ===================== */

  "liu_xie": {
    id: "liu_xie", name: "刘协", zi: "伯和", aka: ["汉献帝", "山阳公"],
    birth: 181, death: 234, faction: "han", roles: ["lord"],
    stats: { lead: 28, war: 20, int: 72, pol: 66, cha: 70 },
    skills: [
      { id: "yidaizhao_xian", name: "衣带密诏", kind: "active", cd: 6, dur: 2,
        desc: "血书密诏付董承，令结天下义士共诛权臣，忠义者闻之奋起",
        mod: { morale: 8, atk: 0.06 }, tags: ["rally", "insight"] }
    ],
    traits: ["博涉经史", "禅位山阳", "汉室末帝"],
    bio: "字伯和，灵帝次子。189年董卓废少帝而立之，寻迁都长安；196年曹操迎都于许，政在曹氏。200年衣带诏事觉，董承等被诛，董贵人亦死；214年伏皇后被废幽死。220年禅位于曹丕，封山阳公，青龙二年薨，寿五十四。《后汉书·献帝纪》",
    quote: "献生不辰，身播国屯。",
    appear: [189, 220], impact: 4
  },

  "wang_yun": {
    id: "wang_yun", name: "王允", zi: "子师",
    birth: 137, death: 192, faction: "han", roles: ["minister"],
    stats: { lead: 45, war: 42, int: 84, pol: 80, cha: 76 },
    skills: [
      { id: "zhu_dong", name: "诛逆", kind: "active", cd: 5, dur: 2,
        desc: "与吕布、士孙瑞密谋诛董卓于未央殿，除暴定乱，天下称快",
        mod: { atk: 0.10, morale: 6 }, tags: ["insight", "rally"] },
      { id: "shou_jie", name: "守节", kind: "passive",
        desc: "太原祁人，少传家学，终不肯赦凉州兵，与汉室同殉",
        mod: { def: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["刚棱疾恶", "录尚书事", "殉汉"],
    bio: "字子师，太原祁人。少传家学，举高第，历豫州刺史，与皇甫嵩等共平黄巾。为中常侍所构下狱，赖何进、袁隗救免。192年为司徒、录尚书事，与吕布、士孙瑞谋诛董卓于未央殿；然不赦凉州兵，李傕、郭汜攻破长安，与黄琬同被杀，时年五十六。《后汉书·王允传》",
    quote: "独崇高节，岂和光之道邪？",
    appear: [184, 192], impact: 4
  },

  "dong_cheng": {
    id: "dong_cheng", name: "董承",
    birth: null, death: 200, faction: "han", roles: ["minister", "consort"],
    stats: { lead: 40, war: 45, int: 55, pol: 52, cha: 60 },
    skills: [
      { id: "yidaizhao_cheng", name: "衣带诏", kind: "active", cd: 6, dur: 2,
        desc: "受献帝衣带中密诏，结刘备、王服、种辑等谋诛曹操",
        mod: { atk: 0.08, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["董太后之侄", "车骑将军", "谋泄伏诛"],
    bio: "献帝董贵人之父，灵帝母董太后之侄。兴平中为安集将军，从驾东归有功，迁车骑将军。196年受帝密诏，使结天下义士共诛曹操，遂与刘备、王服、种辑、吴硕同谋。200年正月事泄，承与服、辑、硕皆伏诛，三族被夷，董贵人亦遇害。《后汉书·献帝纪》《三国志·先主传》裴注引《献帝起居注》",
    quote: "使结天下义士共诛之。",
    appear: [196, 200], impact: 3
  },

  "fu_wan": {
    id: "fu_wan", name: "伏完",
    birth: null, death: 209, faction: "han", roles: ["minister", "consort"],
    stats: { lead: 30, war: 25, int: 62, pol: 68, cha: 66 },
    skills: [
      { id: "shen_shen", name: "沈深", kind: "passive",
        desc: "袭不其侯，尚阳安长公主，沈深有大度，而终不肯图曹操",
        mod: { def: 0.05 }, tags: ["ritual"] }
    ],
    traits: ["伏湛五世孙", "不其侯", "尚阳安公主"],
    bio: "琅邪东武人，大司徒伏湛五世孙。袭爵不其侯，尚桓帝女阳安长公主，献帝时官至执金吾。其女伏寿为献帝皇后，后以曹操残逼之状与父书，令密图之，完得书不敢发。建安中卒，不及举事；至十九年事泄，伏氏宗族死者百余人。《后汉书·皇后纪》",
    quote: "完得书，不敢发。",
    appear: [196, 209], impact: 2
  },

  "fu_shou": {
    id: "fu_shou", name: "伏寿", aka: ["伏皇后"],
    birth: null, death: 214, faction: "han", roles: ["consort"],
    stats: { lead: 25, war: 18, int: 60, pol: 55, cha: 72 },
    skills: [
      { id: "shou_jie_hou", name: "守节", kind: "passive",
        desc: "为皇后二十年，密书令父图曹操，事发被幽死暴室",
        mod: { def: 0.05, morale: 4 }, tags: ["ritual", "guard"] }
    ],
    traits: ["献帝皇后", "琅邪东武人", "幽死暴室"],
    bio: "献帝皇后，讳寿，琅邪东武人，伏完之女，大司徒伏湛之八世孙。初平元年入掖庭为贵人，兴平二年立为皇后。董贵人被杀后，后怀惧，与父完书言曹操残逼之状，令密图之。建安十九年事泄，曹操逼帝废后，幽于暴室而死，所生二皇子皆鸩杀。《后汉书·皇后纪》",
    quote: "皇后寿，得由卑贱，登显尊极。",
    appear: [196, 214], impact: 3
  },

  "yang_biao": {
    id: "yang_biao", name: "杨彪", zi: "文先",
    birth: 142, death: 225, faction: "han", roles: ["minister"],
    stats: { lead: 40, war: 30, int: 80, pol: 84, cha: 78 },
    skills: [
      { id: "gang_zhi", name: "刚直", kind: "passive",
        desc: "弘农杨氏，屡争董卓迁都、曹操专擅之非，老而不受魏官",
        mod: { def: 0.08, morale: 3 }, tags: ["ritual", "scholar"] }
    ],
    traits: ["四世太尉", "力争迁都", "不仕于魏"],
    bio: "字文先，弘农华阴人，杨震之后。历司徒、司空、太尉。初平中与黄琬力争董卓迁都之议，几为所杀。196年曹操以其与袁术姻亲，收付狱，赖孔融、荀彧力争得免。后以病逊位，不受魏官职，黄初六年卒，年八十四。《后汉书·杨震传》附",
    quote: "愧无日磾先见之明，犹怀老牛舐犊之爱。",
    appear: [189, 225], impact: 3
  },

  "huang_wan": {
    id: "huang_wan", name: "黄琬", zi: "子琰",
    birth: 141, death: 192, faction: "han", roles: ["minister"],
    stats: { lead: 45, war: 38, int: 78, pol: 76, cha: 70 },
    skills: [
      { id: "cong_min", name: "聪敏", kind: "passive",
        desc: "幼对日食之问，京师称之，太尉之孙，历位公卿",
        mod: { xp: 0.08, vision: 2 }, tags: ["insight", "scholar"] }
    ],
    traits: ["黄琼之孙", "幼有辩才", "争迁都"],
    bio: "字子琰，江夏安陆人，太尉黄琼之孙。少聪慧，祖琼以日食之余问之，琬对曰何不言日食之余如月之初，京师称之。历豫州牧、太仆，迁太尉，与杨彪同争董卓迁都，坐免。董卓诛后为司隶校尉，192年李傕等攻破长安，琬与王允同为所杀。《后汉书·黄琼传》附",
    quote: "何不言日食之余，如月之初？",
    appear: [184, 192], impact: 3
  },

  "kong_rong": {
    id: "kong_rong", name: "孔融", zi: "文举",
    birth: 153, death: 208, faction: "han", roles: ["minister"],
    stats: { lead: 32, war: 30, int: 80, pol: 66, cha: 82 },
    skills: [
      { id: "qing_yi", name: "清议", kind: "aura",
        desc: "为北海相，立学校、举贤才、收葬枯骨，士人竞归之",
        mod: { morale: 5, def: 0.05 }, tags: ["scholar", "rally"] },
      { id: "jian_zheng", name: "谏争", kind: "passive",
        desc: "朝会辄引正定议，屡忤曹操，谏止禁酒，终以此取祸",
        mod: { def: 0.06 }, tags: ["insight"] }
    ],
    traits: ["孔子二十世孙", "北海相", "建安七子"],
    bio: "字文举，鲁国人，孔子二十世孙。为北海相，立学校、举贤才，收葬枯骨，时称其贤。献帝都许，征为将作大匠，迁少府，每朝会访对，辄引正定议，公卿大夫皆隶名而已。性宽容好士，而屡忤曹操，建安十三年被杀，妻子并诛，年五十六。《后汉书·孔融传》",
    quote: "座上客常满，樽中酒不空。",
    appear: [184, 208], impact: 4
  },

  "zhu_jun": {
    id: "zhu_jun", name: "朱儁", zi: "公伟",
    birth: null, death: 195, faction: "han", roles: ["general"],
    stats: { lead: 80, war: 72, int: 66, pol: 60, cha: 62 },
    skills: [
      { id: "ping_huangjin", name: "平黄巾", kind: "active", cd: 5, dur: 2,
        desc: "以右中郎将与皇甫嵩等破黄巾，斩获数万，威震关东",
        mod: { atk: 0.10, morale: 5 }, tags: ["rally"] },
      { id: "gang_lie", name: "刚烈", kind: "passive",
        desc: "素刚，为郭汜所留质而不屈，即日发病卒于长安",
        mod: { def: 0.06 }, tags: ["guard"] }
    ],
    traits: ["会稽上虞人", "右中郎将", "定交州"],
    bio: "字公伟，会稽上虞人。举孝廉，历交阯刺史，以家兵破梁龙，定交州。中平元年为右中郎将，与皇甫嵩等共讨黄巾，破波才、张曼成诸部，斩获数万。后为太尉、录尚书事，持节镇关东。李傕、郭汜相攻，献帝诏儁与杨彪等往解，汜留质之，儁素刚，即日发病卒。《后汉书·朱儁传》",
    quote: "功成师克，威声满天下。",
    appear: [184, 195], impact: 4
  },

  "huangfu_song": {
    id: "huangfu_song", name: "皇甫嵩", zi: "义真",
    birth: null, death: 195, faction: "han", roles: ["general"],
    stats: { lead: 88, war: 76, int: 68, pol: 64, cha: 70 },
    skills: [
      { id: "changshe_huo", name: "火计", kind: "active", cd: 5, dur: 2,
        desc: "长社之役因风纵火，大破波才黄巾连营，斩获数万",
        mod: { atk: 0.12 }, tags: ["fire", "insight"] },
      { id: "an_min", name: "安民", kind: "aura",
        desc: "破黄巾后请免冀州一年田租以赡饥民，百姓歌之",
        mod: { morale: 6, recruit: 0.05 }, tags: ["rally", "logistics"] }
    ],
    traits: ["安定朝那人", "左中郎将", "平黄巾"],
    bio: "字义真，安定朝那人，度辽将军皇甫规之兄子。少好诗书，习弓马。中平元年为左中郎将，与朱儁讨黄巾，长社夜因风纵火破波才，又斩张梁于广宗、张宝于下曲阳，收其资财以赡军。迁车骑将军、太尉，封槐里侯。兴平二年卒。《后汉书·皇甫嵩传》",
    quote: "威声满天下，值弱主蒙尘。",
    appear: [184, 195], impact: 4
  },

  "lu_zhi": {
    id: "lu_zhi", name: "卢植", zi: "子干",
    birth: null, death: 192, faction: "han", roles: ["minister"],
    stats: { lead: 74, war: 62, int: 82, pol: 72, cha: 74 },
    skills: [
      { id: "jiang_tang", name: "讲学", kind: "aura",
        desc: "师事马融而目不斜视，阖门教授，刘备、公孙瓒皆其门下",
        mod: { xp: 0.10, morale: 4 }, tags: ["scholar"] },
      { id: "jiao_jing", name: "校经", kind: "passive",
        desc: "东观校中书五经记传，补续汉记，与蔡邕、马日磾同列",
        mod: { xp: 0.06 }, tags: ["scholar", "ritual"] }
    ],
    traits: ["涿郡涿人", "北中郎将", "海内大儒"],
    bio: "字子干，涿郡涿人，身长八尺二寸。少与郑玄俱事马融，通古今学，学终辞归，阖门教授，刘备、公孙瓒皆尝从之。中平元年拜北中郎将讨黄巾，围张角于广宗，以小黄门左丰索贿不遂被诬，槛车征还。后与马日磾、蔡邕等校书东观，补续汉记，拜议郎、侍中。初平三年卒。《后汉书·卢植传》",
    quote: "士之楷模，国之桢干。",
    appear: [184, 192], impact: 4
  },

  "cai_yong": {
    id: "cai_yong", name: "蔡邕", zi: "伯喈",
    birth: 133, death: 192, faction: "han", roles: ["minister"],
    stats: { lead: 30, war: 24, int: 88, pol: 70, cha: 76 },
    skills: [
      { id: "xi_ping", name: "书经", kind: "passive",
        desc: "奏定六经文字，自书丹于碑立于太学门外，即熹平石经",
        mod: { xp: 0.10 }, tags: ["scholar"] },
      { id: "bo_wu", name: "博物", kind: "passive",
        desc: "善鼓琴、明天文术数，辨焦尾之桐，典校中书五经",
        mod: { vision: 2, xp: 0.05 }, tags: ["insight", "scholar"] }
    ],
    traits: ["陈留圉人", "博物多识", "死狱中"],
    bio: "字伯喈，陈留圉人。少博学，好辞章、数术、天文，善鼓琴。熹平四年与堂溪典等奏定六经文字，自书丹于碑，使工镌刻立于太学门外，观视摹写者车乘日千余辆。董卓专政，辟为祭酒，累迁侍中、左中郎将。192年董卓伏诛，邕于王允坐间叹息，为允所收，死狱中，年六十。《后汉书·蔡邕传》",
    quote: "吾家书籍文章，尽当与之。",
    appear: [184, 192], impact: 4
  },

  "cai_yan": {
    id: "cai_yan", name: "蔡琰", zi: "文姬", aka: ["蔡文姬", "昭姬"],
    birth: null, death: null, faction: "han", roles: ["minister"],
    stats: { lead: 20, war: 12, int: 82, pol: 55, cha: 80 },
    skills: [
      { id: "bian_cai", name: "辩才", kind: "passive",
        desc: "博学有才辩，妙于音律，邕断弦问之，并答无误",
        mod: { xp: 0.08, vision: 1 }, tags: ["scholar"] },
      { id: "bei_fen", name: "悲愤", kind: "active", cd: 6, dur: 2,
        desc: "没胡十二年，作悲愤诗述丧乱流离，闻者莫不垂涕",
        mod: { morale: 6 }, tags: ["rally"] }
    ],
    traits: ["蔡邕之女", "没入南匈奴", "作悲愤诗"],
    bio: "陈留人，蔡邕之女，名琰，字文姬（一作昭姬）。博学有才辩，妙于音律。初适河东卫仲道，夫亡无子归宁。兴平中天下丧乱，为胡骑所获，没于南匈奴左贤王，在胡中十二年，生二子。曹操与蔡邕素善，痛其无嗣，遣使以金璧赎归，重嫁屯田都尉董祀。传有《悲愤诗》。《后汉书·列女传》",
    quote: "已得自解免，当复弃儿子。",
    appear: [207, 220], impact: 3
  },

  "ma_ridi": {
    id: "ma_ridi", name: "马日磾", zi: "翁叔",
    birth: null, death: 194, faction: "han", roles: ["minister"],
    stats: { lead: 35, war: 28, int: 78, pol: 74, cha: 68 },
    skills: [
      { id: "dian_jiao", name: "典校", kind: "passive",
        desc: "马融之族子，少传融业，与杨彪、蔡邕等典校中书",
        mod: { xp: 0.08 }, tags: ["scholar"] }
    ],
    traits: ["马融族子", "太傅", "受辱呕血"],
    bio: "字翁叔，扶风人，马融之族子。少传融业，以才学进，与杨彪、卢植、蔡邕等典校中书，历位九卿，遂登台辅，官至太傅。兴平元年与太仆赵岐奉使慰抚关东，至淮南，袁术轻侮之，夺其节不肯还，又欲逼为军帅，日磾深自恨，遂呕血而毙。《后汉书·孔融传》裴注引《三辅决录》",
    quote: "深自恨，遂呕血而毙。",
    appear: [189, 194], impact: 3
  },

  "zhao_qi": {
    id: "zhao_qi", name: "赵岐", zi: "邠卿", aka: ["赵嘉", "台卿"],
    birth: null, death: 201, faction: "han", roles: ["minister"],
    stats: { lead: 32, war: 30, int: 80, pol: 78, cha: 70 },
    skills: [
      { id: "mengzi", name: "章句", kind: "passive",
        desc: "著孟子章句，为后世孟子之学所本，儒者宗之",
        mod: { xp: 0.10 }, tags: ["scholar"] },
      { id: "an_min_qi", name: "安民", kind: "aura",
        desc: "奉使宣扬国命，所至百姓喜曰今日乃复见使者车骑",
        mod: { morale: 5, recruit: 0.04 }, tags: ["rally"] }
    ],
    traits: ["京兆长陵人", "注孟子", "九十余卒"],
    bio: "字邠卿，京兆长陵人。初名嘉，字台卿，后避难以字行。少明经，有才艺。历郡吏、并州刺史，遭党锢之祸，展转逃难，卧草中十二日不食。献帝西都，拜议郎，迁太仆，与马日磾奉使关东，袁绍、曹操皆自将兵数百里奉迎。后拜太常，建安六年卒，年九十余。著《孟子章句》。《后汉书·赵岐传》",
    quote: "今日乃复见使者车骑。",
    appear: [189, 201], impact: 3
  },

  "chong_ji": {
    id: "chong_ji", name: "种辑",
    birth: null, death: 200, faction: "han", roles: ["minister"],
    stats: { lead: 40, war: 45, int: 58, pol: 55, cha: 58 },
    skills: [
      { id: "mi_mou", name: "密谋", kind: "active", cd: 6, dur: 2,
        desc: "先与荀攸等谋刺董卓于长安，后受衣带诏共诛曹操",
        mod: { atk: 0.08, morale: 4 }, tags: ["ambush"] }
    ],
    traits: ["侍中", "长水校尉", "谋泄伏诛"],
    bio: "洛阳人。献帝时为侍中，董卓专政，与议郎郑泰、何颙、越骑校尉伍琼等谋刺杀董卓，以谢百姓，事泄不果。后迁长水校尉，与董承、王服、吴硕同受衣带诏谋诛曹操，为董承所倚为腹心。建安五年正月事觉，与承等同伏诛。《三国志·武帝纪》裴注引《蜀志》及《献帝起居注》",
    quote: "种辑、吴硕是我腹心办事者。",
    appear: [189, 200], impact: 2
  },

  "wu_shuo": {
    id: "wu_shuo", name: "吴硕",
    birth: null, death: 200, faction: "han", roles: ["minister"],
    stats: { lead: 35, war: 40, int: 56, pol: 54, cha: 58 },
    skills: [
      { id: "fu_xin", name: "腹心", kind: "passive",
        desc: "董承倚为腹心，参衣带诏之谋，事泄与承同见诛",
        mod: { def: 0.05 }, tags: ["guard"] }
    ],
    traits: ["议郎", "董承腹心", "伏诛"],
    bio: "献帝时为议郎。建安初，曹操专政，董承受衣带中密诏，与偏将军王服、长水校尉种辑、议郎吴硕等结谋诛之，董承尝称长水校尉种辑与议郎吴硕为其腹心办事者。建安五年正月谋泄，硕与承、服、辑皆被诛。《三国志·先主传》裴注引《献帝起居注》《后汉书·董卓传》",
    quote: "是我腹心办事者。",
    appear: [196, 200], impact: 2
  },

  "liu_yu": {
    id: "liu_yu", name: "刘虞", zi: "伯安",
    birth: null, death: 193, faction: "han", roles: ["lord"],
    stats: { lead: 66, war: 52, int: 70, pol: 80, cha: 84 },
    skills: [
      { id: "de_hua", name: "德化", kind: "aura",
        desc: "为幽州牧，罢省屯兵、务广恩信，鲜卑乌桓皆来朝贡",
        mod: { recruit: 0.08, morale: 7 }, tags: ["rally", "logistics"] },
      { id: "ju_di", name: "拒帝议", kind: "passive",
        desc: "袁绍、韩馥欲拥立为帝，虞厉色拒之，以安汉室",
        mod: { def: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["东海郯人", "幽州牧", "不称尊号"],
    bio: "字伯安，东海郯人，东海恭王之后。中平初拜甘陵相，绥抚荒余，以蔬俭率下，迁宗正，后拜幽州牧，罢省屯兵、务广恩信，鲜卑、乌桓、夫余皆按时朝贡。灵帝遣使者就拜太尉，封容丘侯。袁绍、韩馥欲拥立为帝，虞厉色拒之。初平四年与公孙瓒相攻，败而被执，遂遇害。《后汉书·刘虞传》",
    quote: "民夷感其德化，无敢扰边者。",
    appear: [184, 193], impact: 3
  },

  "liu_dai": {
    id: "liu_dai", name: "刘岱", zi: "公山",
    birth: null, death: 192, faction: "han", roles: ["minister"],
    stats: { lead: 55, war: 48, int: 58, pol: 62, cha: 66 },
    skills: [
      { id: "xu_ji", name: "虚己", kind: "aura",
        desc: "《英雄记》称其孝悌仁恕、虚己受人，士多归之",
        mod: { morale: 5, recruit: 0.05 }, tags: ["rally"] }
    ],
    traits: ["刘繇之兄", "兖州刺史", "败死东平"],
    bio: "字公山，东莱牟平人，刘繇之兄，汉室宗亲。历侍中、兖州刺史，与东郡太守桥瑁相恶而杀之，以王肱领东郡太守。初平元年与袁绍、孔伷等同时起兵讨董卓，屯于酸枣。初平三年青州黄巾入兖州，岱与战于东平，兵败被杀。《三国志·武帝纪》裴注引《英雄记》",
    quote: "岱孝悌仁恕，以虚己受人。",
    appear: [189, 192], impact: 2
  },

  "liu_yao": {
    id: "liu_yao", name: "刘繇", zi: "正礼",
    birth: 156, death: 197, faction: "han", roles: ["minister"],
    stats: { lead: 62, war: 55, int: 66, pol: 68, cha: 74 },
    skills: [
      { id: "qing_jie", name: "清节", kind: "passive",
        desc: "部济南，奏免贪秽之中常侍子，以廉直知名于州郡",
        mod: { def: 0.05, xp: 0.04 }, tags: ["insight"] },
      { id: "ju_yi", name: "举义", kind: "active", cd: 5, dur: 2,
        desc: "受命为扬州刺史，逐袁术所署诸守，据曲阿以拒之",
        mod: { atk: 0.08, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["东莱牟平人", "扬州刺史", "年四十二卒"],
    bio: "字正礼，东莱牟平人，刘岱之弟。年十九从父刘韪为贼所劫质，繇篡取以归，由是显名。州辟部济南，奏免贪秽之中常侍子。为扬州刺史，逐袁术所署诸守，据曲阿。兴平中为孙策所迫，奔丹徒，南保豫章，使笮融助朱皓讨诸葛玄，融诈杀皓，繇攻破之。寻病卒，年四十二。《三国志·刘繇传》",
    quote: "御二龙于长涂，骋骐骥于千里。",
    appear: [189, 197], impact: 3
  },

  "zhu_hao": {
    id: "zhu_hao", name: "朱皓", zi: "文明",
    birth: null, death: 195, faction: "han", roles: ["minister"],
    stats: { lead: 40, war: 32, int: 62, pol: 60, cha: 64 },
    skills: [
      { id: "tui_cheng", name: "推诚", kind: "passive",
        desc: "善推诚以信人，为豫章太守，卒为笮融所诈杀",
        mod: { def: 0.05, morale: 3 }, tags: ["guard"] }
    ],
    traits: ["朱儁之子", "豫章太守", "为笮融所杀"],
    bio: "字文明，会稽上虞人，太尉朱儁之子，亦有才行。汉朝遣其代诸葛玄为豫章太守，治南昌。时许劭谓扬州刺史刘繇曰朱文明善推诚以信人，宜密防笮融，繇不听。融果诈杀皓，代领郡事；后繇攻破笮融，融走入山，为民所杀。《三国志·刘繇传》裴注引《献帝春秋》",
    quote: "朱文明善推诚以信人。",
    appear: [194, 195], impact: 2
  },

  "shi_sun_rui": {
    id: "shi_sun_rui", name: "士孙瑞", zi: "君荣",
    birth: null, death: 195, faction: "han", roles: ["minister"],
    stats: { lead: 42, war: 40, int: 78, pol: 76, cha: 68 },
    skills: [
      { id: "mi_zhao", name: "密诏", kind: "active", cd: 5, dur: 2,
        desc: "自书诏以授吕布，伏兵未央殿诛董卓，封侯而不受",
        mod: { atk: 0.10, morale: 4 }, tags: ["insight"] }
    ],
    traits: ["扶风人", "尚书仆射", "乱兵所害"],
    bio: "字君荣，扶风人。博达无所不通，历执金吾、尚书仆射。192年与王允、吕布密谋诛董卓，自书诏以授布，令骑都尉李肃等伪著卫士服伏于北掖门。卓诛后迁大司农，为三老，周忠、皇甫嵩、杨彪等为公皆辞让瑞。兴平二年李傕、郭汜追乘舆于东涧，王师败绩，瑞为乱兵所害。《后汉书·王允传》附",
    quote: "独崇高节，岂和光之道邪？",
    appear: [189, 195], impact: 3
  },

  /* ===================== 刘备军·蜀汉 shu ===================== */

  "liu_bei": {
    id: "liu_bei", name: "刘备", zi: "玄德", aka: ["先主", "昭烈帝", "汉昭烈帝"],
    birth: 161, death: 223, faction: "shu", roles: ["lord"],
    stats: { lead: 84, war: 78, int: 78, pol: 80, cha: 96 },
    skills: [
      { id: "kuan_ren", name: "宽仁", kind: "aura",
        desc: "善下人，喜怒不形于色，荆州之士从之如归，众心归附",
        mod: { recruit: 0.10, morale: 7 }, tags: ["rally"] },
      { id: "bai_er", name: "白毦", kind: "passive",
        desc: "以陈到统白毦亲兵为宿卫，选精锐为亲卫，临阵不乱",
        mod: { def: 0.08 }, tags: ["guard", "iron"] },
      { id: "san_gu", name: "三顾", kind: "active", cd: 4, dur: 2,
        desc: "三顾草庐得诸葛亮，定跨有荆益、结好孙权之策",
        mod: { atk: 0.08, morale: 6 }, tags: ["rally", "insight"] }
    ],
    traits: ["涿郡涿县人", "与关张恩若兄弟", "昭烈帝"],
    bio: "字玄德，涿郡涿县人，汉景帝子中山靖王之后。与关羽、张飞恩若兄弟。历安喜尉、平原相、徐州牧，先后依袁绍、刘表。三顾诸葛亮于隆中，联孙拒曹，取荆州、益州，建安二十四年为汉中王，221年称帝于成都，国号汉。东征败于夷陵，章武三年崩于永安，年六十三。《三国志·先主传》",
    quote: "勿以恶小而为之，勿以善小而不为。",
    appear: [184, 223], impact: 5
  },

  "liu_shan": {
    id: "liu_shan", name: "刘禅", zi: "公嗣", aka: ["后主", "安乐公"],
    birth: 207, death: 271, faction: "shu", roles: ["lord"],
    stats: { lead: 30, war: 25, int: 55, pol: 58, cha: 62 },
    skills: [
      { id: "shou_cheng", name: "守成", kind: "aura",
        desc: "任诸葛亮、蒋琬、费祎相继秉政，蜀中赖以偏安四十年",
        mod: { morale: 5, citydef: 0.06 }, tags: ["fortify"] },
      { id: "an_le", name: "任贤", kind: "passive",
        desc: "贤相在朝则循理，黄皓用事则昏暗，素丝无常唯所染之",
        mod: { def: 0.04 }, tags: ["insight"] }
    ],
    traits: ["在位四十一年", "政由葛氏", "禅于邓艾"],
    bio: "字公嗣，昭烈帝长子。章武元年立为皇太子，223年即位，年十七，政事悉委诸葛亮。亮卒后任蒋琬、费祎、董允，延熙中陈祗与黄皓表里用事，国政渐坏。景耀六年邓艾自阴平入，用谯周之策出降，封安乐县公，徙居洛阳。泰始七年薨于洛阳。《三国志·后主传》",
    quote: "此间乐，不思蜀。",
    appear: [223, 263], impact: 3
  },

  "guan_yu": {
    id: "guan_yu", name: "关羽", zi: "云长", aka: ["关云长", "汉寿亭侯"],
    birth: null, death: 220, faction: "shu", roles: ["general"],
    stats: { lead: 88, war: 95, int: 66, pol: 48, cha: 78 },
    skills: [
      { id: "wan_ren_di", name: "万人敌", kind: "aura",
        desc: "陈寿称其万人之敌，为世虎臣，临阵威震三军",
        mod: { atk: 0.12 }, tags: ["dread", "pike"] },
      { id: "gua_gu", name: "刮骨", kind: "passive",
        desc: "为流矢所中，医破臂刮骨去毒，羽言笑自若，饮食如常",
        mod: { hp: 0.10 }, tags: ["iron"] },
      { id: "shui_yan", name: "水淹七军", kind: "active", cd: 6, dur: 2,
        desc: "襄樊之役因汉水暴溢，覆于禁七军，擒于禁、斩庞德",
        mod: { atk: 0.12, watermove: 1 }, tags: ["water", "naval"] }
    ],
    traits: ["河东解人", "前将军", "威震华夏"],
    bio: "字云长，河东解人，亡命奔涿郡，与先主、张飞恩若兄弟。从曹操于官渡，望见颜良麾盖，策马刺之于万众之中，封汉寿亭侯。先主定荆州，拜前将军、假节钺。建安二十四年攻樊城，汉水暴溢，擒于禁、斩庞德，威震华夏。后吕蒙袭取江陵，羽走麦城，为孙氏所擒，与子平俱被杀于临沮。《三国志·关羽传》",
    quote: "吾受刘将军厚恩，誓以共死。",
    appear: [184, 220], impact: 5
  },

  "zhang_fei": {
    id: "zhang_fei", name: "张飞", zi: "益德", aka: ["张翼德", "桓侯"],
    birth: null, death: 221, faction: "shu", roles: ["general"],
    stats: { lead: 82, war: 94, int: 52, pol: 42, cha: 55 },
    skills: [
      { id: "duan_qiao", name: "断桥", kind: "active", cd: 5, dur: 2,
        desc: "长坂以二十骑据水断桥，瞋目横矛，曹军无敢近者",
        mod: { def: 0.12, morale: 5 }, tags: ["guard", "rally"] },
      { id: "yi_shi", name: "义释", kind: "passive",
        desc: "生获巴郡严颜，壮而释之为宾客，有国士之风",
        mod: { recruit: 0.06 }, tags: ["rally"] },
      { id: "bao_er", name: "暴而无恩", kind: "passive",
        desc: "爱敬君子而不恤小人，日鞭挝健儿，终为帐下所杀",
        mod: { atk: 0.06, def: -0.05 }, tags: ["dread"] }
    ],
    traits: ["涿郡人", "车骑将军", "桓侯"],
    bio: "字益德，涿郡人。长坂之役以二十骑据水断桥，瞋目横矛自呼其名，敌皆无敢近者。随先主入益州，破巴郡，生获严颜而义释之。先主为汉中王，拜右将军，章武元年迁车骑将军。性爱敬君子而不恤小人，日鞭挝健儿，先主伐吴，飞当率兵自阆中会江州，临发为张达、范强所杀，谥桓侯。《三国志·张飞传》",
    quote: "身是张益德也，可来共决死！",
    appear: [184, 221], impact: 5
  },

  "zhao_yun": {
    id: "zhao_yun", name: "赵云", zi: "子龙", aka: ["赵子龙", "顺平侯"],
    birth: null, death: 229, faction: "shu", roles: ["general"],
    stats: { lead: 80, war: 88, int: 70, pol: 60, cha: 72 },
    skills: [
      { id: "yong_lie", name: "勇烈", kind: "aura",
        desc: "长坂抱护后主与甘夫人皆得免难，先主称其一身是胆",
        mod: { atk: 0.10, def: 0.06 }, tags: ["guard", "pursue"] },
      { id: "jie_yong", name: "节用", kind: "passive",
        desc: "退军不弃军资，请以余绢入赤岸府库，须冬赐乃分",
        mod: { gold: 60, food: 2 }, tags: ["logistics"] }
    ],
    traits: ["常山真定人", "一身是胆", "顺平侯"],
    bio: "字子龙，常山真定人。本属公孙瓒，后从先主。长坂之役抱护后主与甘夫人，皆得免难。先主入蜀，云与诸葛亮溯流定白帝、江州、江阳。建兴六年随亮出军，与邓芝为疑军据箕谷，兵弱失利而敛众固守，不致大败，军退贬为镇军将军。建兴七年卒，追谥顺平侯。《三国志·赵云传》裴注引《云别传》",
    quote: "子龙一身都是胆也。",
    appear: [191, 229], impact: 4
  },

  "ma_chao": {
    id: "ma_chao", name: "马超", zi: "孟起", aka: ["马孟起", "威侯"],
    birth: 176, death: 222, faction: "shu", roles: ["general"],
    stats: { lead: 82, war: 92, int: 58, pol: 44, cha: 70 },
    skills: [
      { id: "xiliang_qi", name: "西凉铁骑", kind: "aura",
        desc: "领凉州牧，麾下羌胡骑锐，兼资文武，雄烈过人",
        mod: { atk: 0.10, move: 1 }, tags: ["cavalry", "barbarian"] },
      { id: "wei_qiang", name: "威震羌胡", kind: "passive",
        desc: "羌胡素畏超，超至则相率归附，入蜀为爪牙之任",
        mod: { recruit: 0.08 }, tags: ["barbarian", "dread"] }
    ],
    traits: ["扶风茂陵人", "骠骑将军", "威侯"],
    bio: "字孟起，扶风茂陵人，征西将军马腾之子。建安十六年与韩遂等起兵拒曹操于潼关，战败走凉州，为夏侯渊所破，南奔汉中依张鲁，后归先主。先主定蜀，拜平西将军，迁左将军；章武元年迁骠骑将军、领凉州牧，进封斄乡侯。章武二年卒，年四十七，追谥威侯。《三国志·马超传》",
    quote: "超阻戎负勇，以覆其族。",
    appear: [196, 222], impact: 4
  },

  "huang_zhong": {
    id: "huang_zhong", name: "黄忠", zi: "汉升", aka: ["黄汉升", "刚侯"],
    birth: null, death: 220, faction: "shu", roles: ["general"],
    stats: { lead: 78, war: 90, int: 55, pol: 45, cha: 60 },
    skills: [
      { id: "ding_jun", name: "定军", kind: "active", cd: 5, dur: 2,
        desc: "定军山乘高鼓噪，一战斩夏侯渊，曹军夺气而退",
        mod: { atk: 0.12, morale: 6 }, tags: ["ambush", "pursue"] },
      { id: "xian_deng", name: "先登", kind: "aura",
        desc: "常先登陷阵，勇毅冠三军，强弓劲弩所向披靡",
        mod: { atk: 0.08, range: 1 }, tags: ["archer"] }
    ],
    traits: ["南阳人", "后将军", "斩夏侯渊"],
    bio: "字汉升，南阳人。初为荆州牧刘表中郎将，与表从子刘磐共守长沙攸县。曹操克荆州，假行裨将军，后归先主。随先主入蜀，常先登陷阵，勇毅冠三军。建安二十四年于定军山乘高鼓噪，大破夏侯渊军，斩渊。先主为汉中王，拜后将军，赐爵关内侯，与关羽同列。明年卒，谥刚侯。《三国志·黄忠传》",
    quote: "常先登陷阵，勇毅冠三军。",
    appear: [190, 220], impact: 4
  },

  "wei_yan": {
    id: "wei_yan", name: "魏延", zi: "文长",
    birth: null, death: 234, faction: "shu", roles: ["general"],
    stats: { lead: 84, war: 88, int: 60, pol: 38, cha: 50 },
    skills: [
      { id: "hanzhong_fang", name: "汉中防线", kind: "aura",
        desc: "督汉中，实兵诸围以御外敌，承高帝重门之制",
        mod: { citydef: 0.12, def: 0.08 }, tags: ["fortify"] },
      { id: "ziwu", name: "子午之议", kind: "active", cd: 6, dur: 2,
        desc: "每请兵万人与亮异道会于潼关，如韩信故事，亮不许",
        mod: { atk: 0.10, move: 1 }, tags: ["ambush"] }
    ],
    traits: ["义阳人", "征西大将军", "以南谷口败亡"],
    bio: "字文长，义阳人。随先主入蜀，数有战功，迁牙门将军。先主拔为督汉中镇远将军、领汉中太守，一军皆惊。后为丞相司马，迁前军师征西大将军、南郑侯。每随亮出，辄请兵万人与亮异道会于潼关，亮不许。亮卒，与长史杨仪举兵相攻，众散，奔汉中，为马岱追斩，夷三族。《三国志·魏延传》",
    quote: "若曹操举天下而来，请为大王拒之。",
    appear: [211, 234], impact: 4
  },

  "jiang_wei": {
    id: "jiang_wei", name: "姜维", zi: "伯约", aka: ["姜伯约"],
    birth: 202, death: 264, faction: "shu", roles: ["general", "minister"],
    stats: { lead: 86, war: 84, int: 82, pol: 58, cha: 66 },
    skills: [
      { id: "bei_fa", name: "北伐", kind: "active", cd: 6, dur: 3,
        desc: "前后十一次北伐，洮西大破王经，而民力疲弊",
        mod: { atk: 0.10, morale: 4 }, tags: ["pursue"] },
      { id: "lian_bing", name: "敛兵聚谷", kind: "passive",
        desc: "改实兵诸围之法，敛兵聚谷退守汉乐二城，终致阳安不守",
        mod: { citydef: 0.08, def: 0.04 }, tags: ["fortify"] }
    ],
    traits: ["天水冀人", "志立功名", "死时胆如斗"],
    bio: "字伯约，天水冀人。建兴六年诸葛亮出祁山，维诣亮降，亮辟为仓曹掾，与张裔、蒋琬书称其为凉州上士。费祎卒后进位大将军，前后十一次北伐，洮西大破魏雍州刺史王经。景耀六年钟会伐蜀，维守剑阁拒之；邓艾自阴平入，后主降，维伪降钟会，谋复蜀，事败被杀。《三国志·姜维传》裴注引《世语》",
    quote: "愿陛下忍数日之辱，臣欲使社稷危而复安。",
    appear: [228, 264], impact: 5
  },

  "zhuge_liang": {
    id: "zhuge_liang", name: "诸葛亮", zi: "孔明", aka: ["卧龙", "忠武侯", "诸葛孔明"],
    birth: 181, death: 234, faction: "shu", roles: ["strategist", "minister"],
    stats: { lead: 92, war: 62, int: 98, pol: 96, cha: 90 },
    skills: [
      { id: "long_zhong", name: "隆中策", kind: "passive",
        desc: "定跨有荆益、结好孙权之策，先主由是成三分之业",
        mod: { xp: 0.10, vision: 2 }, tags: ["insight"] },
      { id: "quan_nong", name: "劝农", kind: "aura",
        desc: "休士劝农，分兵屯田于渭滨，百姓安堵，军食不乏",
        mod: { food: 4, recruit: 0.06 }, tags: ["logistics"] },
      { id: "ming_fa", name: "明法", kind: "passive",
        desc: "科教严明，赏罚必信，蜀人服其公，虽严而无怨者",
        mod: { atk: 0.06, def: 0.06, morale: 4 }, tags: ["ritual", "rally"] }
    ],
    traits: ["琅邪阳都人", "卧龙", "五次北伐"],
    bio: "字孔明，琅邪阳都人，汉司隶校尉诸葛丰之后。躬耕陇亩，先主三顾乃见，陈跨有荆益、结孙权之策。为丞相、录尚书事，内修政理，外结孙权；南征四郡而不滥杀，然后五次北伐，屡以粮运不继而退。建兴十二年卒于五丈原，年五十四，谥忠武侯。《三国志·诸葛亮传》",
    quote: "鞠躬尽力，死而后已。",
    appear: [207, 234], impact: 5
  },

  "pang_tong": {
    id: "pang_tong", name: "庞统", zi: "士元", aka: ["凤雏", "靖侯"],
    birth: 179, death: 214, faction: "shu", roles: ["strategist"],
    stats: { lead: 60, war: 40, int: 90, pol: 72, cha: 74 },
    skills: [
      { id: "feng_chu", name: "凤雏", kind: "passive",
        desc: "司马徽号之为凤雏，与卧龙齐名，善论人伦鉴识",
        mod: { xp: 0.08, vision: 2 }, tags: ["insight"] },
      { id: "san_ce", name: "三策", kind: "active", cd: 5, dur: 2,
        desc: "为先主画取成都上中下三策，先主用中策，遂定益州",
        mod: { atk: 0.10 }, tags: ["ambush"] }
    ],
    traits: ["襄阳人", "军师中郎将", "中流矢卒"],
    bio: "字士元，襄阳人。少时朴钝，司马徽奇之，号凤雏，时人比之卧龙。先主领荆州，以统为治中从事；入蜀，拜军师中郎将，劝先主于涪会执刘璋，先主不从，遂画上中下三策，先主用中策，斩白水军督杨怀、高沛，进围雒城。建安十九年攻雒县，中流矢卒，年三十六，追赐关内侯，谥靖侯。《三国志·庞统传》",
    quote: "顾子可谓驽牛，能负重致远。",
    appear: [208, 214], impact: 4
  },

  "fa_zheng": {
    id: "fa_zheng", name: "法正", zi: "孝直", aka: ["法孝直", "翼侯"],
    birth: 176, death: 220, faction: "shu", roles: ["strategist"],
    stats: { lead: 64, war: 58, int: 92, pol: 70, cha: 62 },
    skills: [
      { id: "qi_hua", name: "奇画", kind: "active", cd: 4, dur: 2,
        desc: "为谋主，画取汉中，劝先主进兵定军山，一战斩夏侯渊",
        mod: { atk: 0.12 }, tags: ["insight", "ambush"] },
      { id: "ya_zi", name: "睚眦", kind: "passive",
        desc: "外统都畿、内为谋主，一餐之德必报，睚眦之怨必复",
        mod: { atk: 0.05, def: -0.04 }, tags: ["dread"] }
    ],
    traits: ["扶风郿人", "尚书令", "翼侯"],
    bio: "字孝直，扶风郿人。建安初与同郡孟达入蜀依刘璋，为军议校尉，不为所用，与别驾张松相善。松劝璋迎先主，正衔命往还，阴献策于先主。先主定蜀，正为蜀郡太守、扬武将军，外统都畿、内为谋主；建安二十四年画取汉中，先主以正为尚书令。明年卒，年四十五，谥翼侯。《三国志·法正传》",
    quote: "法孝直若在，则能制主上，令不东行。",
    appear: [208, 220], impact: 4
  },

  "ma_liang": {
    id: "ma_liang", name: "马良", zi: "季常", aka: ["白眉"],
    birth: 187, death: 222, faction: "shu", roles: ["minister"],
    stats: { lead: 50, war: 40, int: 80, pol: 78, cha: 76 },
    skills: [
      { id: "bai_mei", name: "白眉", kind: "aura",
        desc: "马氏五常白眉最良，使吴修好，孙权敬待之，士论归焉",
        mod: { morale: 5, recruit: 0.05 }, tags: ["rally"] },
      { id: "fu_yi", name: "抚夷", kind: "passive",
        desc: "招纳五溪蛮夷，渠帅皆受印号，咸相率响应先主",
        mod: { recruit: 0.08 }, tags: ["barbarian", "logistics"] }
    ],
    traits: ["襄阳宜城人", "马谡之兄", "侍中"],
    bio: "字季常，襄阳宜城人。兄弟五人并有才名，乡里谚曰马氏五常白眉最良，良眉中有白毛，故以称之。先主领荆州，辟为从事；入蜀后为左将军掾，迁侍中。尝使吴，孙权敬待之。章武元年先主东征，遣良入武陵招纳五溪蛮夷，渠帅皆受印号。章武二年先主败于夷陵，良亦遇害，时年三十六。《三国志·马良传》",
    quote: "马氏五常，白眉最良。",
    appear: [209, 222], impact: 3
  },

  "ma_su": {
    id: "ma_su", name: "马谡", zi: "幼常",
    birth: 190, death: 228, faction: "shu", roles: ["strategist"],
    stats: { lead: 62, war: 58, int: 76, pol: 55, cha: 60 },
    skills: [
      { id: "tan_bing", name: "谈兵", kind: "passive",
        desc: "好论军计，才器过人，亮深加器异，先主则以为言过其实",
        mod: { atk: 0.06, xp: 0.06 }, tags: ["insight"] },
      { id: "gong_xin", name: "攻心", kind: "active", cd: 6, dur: 2,
        desc: "献策心战为上、兵战为下，亮纳其策，赦孟获以服南方",
        mod: { morale: 6, recruit: 0.05 }, tags: ["rally", "insight"] }
    ],
    traits: ["襄阳宜城人", "越嶲太守", "街亭败死"],
    bio: "字幼常，襄阳宜城人，马良之弟。以荆州从事随先主入蜀，历绵竹令、成都令、越嶲太守，才器过人，好论军计。先主临终谓亮曰马谡言过其实，不可大用。建兴三年亮南征，谡献策攻心为上。建兴六年亮出祁山，违众拔谡为先锋，与张郃战于街亭，为郃所破，谡下狱物故，时年三十九。《三国志·马良传》附",
    quote: "攻心为上，攻城为下。",
    appear: [214, 228], impact: 3
  },

  "jiang_wan": {
    id: "jiang_wan", name: "蒋琬", zi: "公琰", aka: ["蒋公琰", "恭侯"],
    birth: null, death: 246, faction: "shu", roles: ["minister", "strategist"],
    stats: { lead: 70, war: 45, int: 86, pol: 92, cha: 78 },
    skills: [
      { id: "zu_shi", name: "足食足兵", kind: "aura",
        desc: "亮数外出，琬常足食足兵以相供给，亮称为忠雅",
        mod: { food: 4, recruit: 0.06 }, tags: ["logistics"] },
      { id: "zao_zhou", name: "造船", kind: "active", cd: 6, dur: 2,
        desc: "议乘水东下袭魏兴、上庸，乃多作舟船，会疾剧而止",
        mod: { watermove: 1, atk: 0.06 }, tags: ["naval", "water"] }
    ],
    traits: ["零陵湘乡人", "大司马", "四英之一"],
    bio: "字公琰，零陵湘乡人。随先主入蜀，为广都长，先主怒欲加罪，诸葛亮请曰蒋琬社稷之器。建兴中为丞相长史，常足食足兵以相供给，亮密表后主以琬为继。亮卒，为尚书令，迁大将军、录尚书事；延熙二年进大司马，屯汉中、涪，多作舟船议东下，会疾剧而止。延熙九年冬卒，谥恭。《三国志·蒋琬传》",
    quote: "公琰托志忠雅，当与吾共赞王业。",
    appear: [214, 246], impact: 4
  },

  "fei_yi": {
    id: "fei_yi", name: "费祎", zi: "文伟", aka: ["费文伟", "敬侯"],
    birth: null, death: 253, faction: "shu", roles: ["minister", "strategist"],
    stats: { lead: 68, war: 45, int: 88, pol: 90, cha: 82 },
    skills: [
      { id: "kuan_ji", name: "宽济", kind: "aura",
        desc: "宽济而博爱，承诸葛成规，边境无虞，邦家和一",
        mod: { morale: 6, def: 0.05 }, tags: ["rally"] },
      { id: "duan_ning", name: "端凝", kind: "passive",
        desc: "数使吴，应对机敏而举止端凝，孙权每器异之",
        mod: { xp: 0.06, vision: 1 }, tags: ["insight"] }
    ],
    traits: ["江夏鄳人", "大将军", "为郭循所杀"],
    bio: "字文伟，江夏鄳人。少孤，依族父伯仁入蜀，与汝南许叔龙、南郡董允齐名。先主定蜀，为太子舍人，后为黄门侍郎。亮北驻汉中，请为参军，数使吴，孙权器之。亮卒后为后军师，迁尚书令，延熙六年为大将军、录尚书事，十四年北驻汉寿。延熙十六年春正月，为魏降人郭循所杀。《三国志·费祎传》",
    quote: "宽济而博爱，承诸葛之成规。",
    appear: [223, 253], impact: 4
  },

  "dong_yun": {
    id: "dong_yun", name: "董允", zi: "休昭",
    birth: null, death: 246, faction: "shu", roles: ["minister"],
    stats: { lead: 48, war: 40, int: 84, pol: 82, cha: 76 },
    skills: [
      { id: "kuang_zhu", name: "匡主", kind: "aura",
        desc: "统宿卫亲兵，正色匡谏，黄皓畏之，终允之世不敢为非",
        mod: { def: 0.08, morale: 5 }, tags: ["guard", "ritual"] },
      { id: "bing_gong", name: "秉公", kind: "passive",
        desc: "亮称其秉心公亮，欲任以宫省之事，宫中之务悉以咨之",
        mod: { xp: 0.06, citydef: 0.05 }, tags: ["ritual"] }
    ],
    traits: ["南郡枝江人", "董和之子", "四英之一"],
    bio: "字休昭，南郡枝江人，掌军中郎将董和之子。先主立太子，允以选为舍人；后主践阼，迁黄门侍郎。诸葛亮将北征，上疏请任以宫省之事，迁侍中，领虎贲中郎将，统宿卫亲兵，黄皓畏之不敢为非。延熙七年守尚书令，为大将军费祎副贰，九年卒，蜀人称亮、琬、祎、允为四相。《三国志·董允传》",
    quote: "正色匡主，义形于色。",
    appear: [223, 246], impact: 3
  },

  "guo_youzhi": {
    id: "guo_youzhi", name: "郭攸之",
    birth: null, death: null, faction: "shu", roles: ["minister"],
    stats: { lead: 40, war: 30, int: 70, pol: 72, cha: 68 },
    skills: [
      { id: "he_shun", name: "和顺", kind: "aura",
        desc: "性素和顺，出师表称其志虑忠纯，宫中之事皆以咨之",
        mod: { morale: 4, def: 0.04 }, tags: ["ritual", "rally"] }
    ],
    traits: ["南阳人", "侍中", "出师表所荐"],
    bio: "南阳人，以器业知名于时，官至侍中。建兴五年诸葛亮上《出师表》，称侍中郭攸之与费祎、董允皆良实，志虑忠纯，宫中之事事无大小宜悉以咨之。其性素和顺，备员而已。亦与江夏费祎、南郡董允同为蜀汉宫省之选。《三国志·董允传》裴注",
    quote: "此皆良实，志虑忠纯。",
    appear: [223, 234], impact: 2
  },

  "yang_yi": {
    id: "yang_yi", name: "杨仪", zi: "威公",
    birth: null, death: 235, faction: "shu", roles: ["minister", "strategist"],
    stats: { lead: 60, war: 50, int: 80, pol: 62, cha: 50 },
    skills: [
      { id: "jun_rong", name: "军戎节度", kind: "aura",
        desc: "规画分部、筹度粮谷，不稽思虑，斯须便了，取办于仪",
        mod: { food: 3, atk: 0.05 }, tags: ["logistics"] },
      { id: "juan_xia", name: "峻狭", kind: "passive",
        desc: "性狷狭，怨愤形于声色，终以诽谤下狱自杀身死",
        mod: { atk: 0.05, def: -0.04 }, tags: ["dread"] }
    ],
    traits: ["襄阳人", "绥军将军", "废徙自杀"],
    bio: "字威公，襄阳人。后诣襄阳太守关羽为功曹，奉使西见先主，先主与语大悦，辟为左将军兵曹掾。从亮为丞相长史，加绥军将军，军戎节度取办于仪。亮卒，仪领军还，遣马岱追斩魏延，自谓当代亮秉政，而仅拜中军师，怨望形于声色。十三年废为民，徙汉嘉郡，复上书诽谤，自杀。《三国志·杨仪传》",
    quote: "吾若举军以就魏氏，宁当落度如此邪？",
    appear: [214, 235], impact: 3
  },

  "liao_hua": {
    id: "liao_hua", name: "廖化", zi: "元俭", aka: ["廖淳"],
    birth: null, death: 264, faction: "shu", roles: ["general"],
    stats: { lead: 72, war: 70, int: 62, pol: 52, cha: 62 },
    skills: [
      { id: "guo_lie", name: "果烈", kind: "aura",
        desc: "以果烈称，官位与张翼齐，时语前有王句、后有张廖",
        mod: { atk: 0.08, morale: 4 }, tags: ["rally", "pursue"] },
      { id: "zha_si", name: "诈死归汉", kind: "passive",
        desc: "关羽败后属吴，诈死携老母昼夜西行，归于先主",
        mod: { def: 0.06 }, tags: ["guard"] }
    ],
    traits: ["襄阳人", "右车骑将军", "道病卒"],
    bio: "字元俭，本名淳，襄阳人。初为前将军关羽主簿，羽败，属吴，思归先主，乃诈死，时人信之，因携老母昼夜西行，遇先主于秭归，先主大悦，以为宜都太守。后为丞相参军、督广武，稍迁至右车骑将军、假节、领并州刺史，封中乡侯。景耀五年谏姜维黩武。咸熙元年春内徙洛阳，道病卒。《三国志·宗预传》附",
    quote: "兵不戢，必自焚，伯约之谓也。",
    appear: [219, 264], impact: 3
  },

  "zhang_yi": {
    id: "zhang_yi", name: "张翼", zi: "伯恭",
    birth: null, death: 264, faction: "shu", roles: ["general"],
    stats: { lead: 74, war: 72, int: 64, pol: 60, cha: 60 },
    skills: [
      { id: "kang_rui", name: "亢锐", kind: "passive",
        desc: "廷争姜维黩武，以为国小民劳不宜屡出，蜀人称其亢直",
        mod: { def: 0.08, morale: 3 }, tags: ["guard"] },
      { id: "fu_man", name: "抚蛮", kind: "aura",
        desc: "为庲降都督，统摄不懈，马忠因其成基以破刘胄",
        mod: { recruit: 0.06, morale: 4 }, tags: ["barbarian", "logistics"] }
    ],
    traits: ["犍为武阳人", "左车骑将军", "死于成都之乱"],
    bio: "字伯恭，犍为武阳人。先主定蜀为书佐，后举孝廉。为庲降都督时南夷刘胄反，被征还而统摄不懈，曰方临战场，岂可以黜退之故而废公家之务，马忠因其成基以破胄。亮卒后拜前领军，迁征西大将军。延熙十八年与姜维还成都，独争不宜黩武。景耀六年与维同降钟会于涪，明年正月为乱兵所杀。《三国志·张翼传》",
    quote: "国小民劳，不宜黩武。",
    appear: [219, 264], impact: 3
  },

  "zhang_ni": {
    id: "zhang_ni", name: "张嶷", zi: "伯岐",
    birth: null, death: 254, faction: "shu", roles: ["general"],
    stats: { lead: 76, war: 74, int: 74, pol: 66, cha: 74 },
    skills: [
      { id: "shi_duan", name: "识断", kind: "passive",
        desc: "料苻健之降必至，断事明果，后主深崇之，南土信服",
        mod: { vision: 2, xp: 0.06 }, tags: ["insight"] },
      { id: "kai_dao", name: "通旧道", kind: "aura",
        desc: "为越嶲太守，恩信抚夷，开通旄牛旧道，千里肃清",
        mod: { landmove: 1, recruit: 0.07 }, tags: ["barbarian", "logistics"] }
    ],
    traits: ["巴郡南充国人", "越嶲太守", "临阵殒身"],
    bio: "字伯岐，巴郡南充国人。弱冠为县功曹，先主定蜀之际山寇攻县，嶷冒白刃携负县长夫人得免。后为越嶲太守，诱以恩情，蛮夷皆服，生缚捉马，开通旄牛旧道千里肃清。尝书戒费祎勿信新附，祎果为郭循所害。后为抚戎将军，随姜维出陇西，与魏将徐质交锋，临阵殒身，南土民夷为立庙祀之。《三国志·张嶷传》",
    quote: "岑彭率师，来歙杖节，咸见害于刺客。",
    appear: [214, 254], impact: 3
  },

  "wang_ping": {
    id: "wang_ping", name: "王平", zi: "子均", aka: ["何平"],
    birth: null, death: 248, faction: "shu", roles: ["general"],
    stats: { lead: 80, war: 76, int: 62, pol: 50, cha: 58 },
    skills: [
      { id: "chi_zhong", name: "持重", kind: "aura",
        desc: "街亭之败独敛众鸣鼓为殿，全军而还，亮以此奇之",
        mod: { def: 0.12, morale: 4 }, tags: ["guard", "fortify"] },
      { id: "xing_shi", name: "兴势", kind: "active", cd: 5, dur: 2,
        desc: "兴势之役据险拒曹爽十万之众，魏军粮尽引退",
        mod: { citydef: 0.15, def: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["巴西宕渠人", "镇北大将军", "手不能书"],
    bio: "字子均，巴西宕渠人。随杜濩、朴胡诣洛阳，假校尉，从曹操征汉中，因降先主，拜牙门将、裨将军。街亭之败，平独敛众鸣鼓持重而还。亮卒后击破魏延。进封安汉侯，代吴壹督汉中。延熙七年魏曹爽以十万众向汉中，平据兴势拒之，魏军退。官至镇北大将军，延熙十一年卒。《三国志·王平传》",
    quote: "今宜先遣刘护军、杜参军据兴势，平为后拒。",
    appear: [215, 248], impact: 3
  },

  "ma_zhong": {
    id: "ma_zhong", name: "马忠", zi: "德信", aka: ["狐笃"],
    birth: null, death: 249, faction: "shu", roles: ["general"],
    stats: { lead: 74, war: 72, int: 68, pol: 62, cha: 66 },
    skills: [
      { id: "fu_yu", name: "抚育", kind: "aura",
        desc: "为牂牁太守，郡经叛乱之后抚育恤理，甚有威惠",
        mod: { recruit: 0.08, morale: 5 }, tags: ["rally", "logistics"] },
      { id: "ping_nan", name: "平南", kind: "active", cd: 5, dur: 2,
        desc: "为庲降都督，斩南夷刘胄平南土，移治味县处民夷之间",
        mod: { atk: 0.08, recruit: 0.05 }, tags: ["barbarian", "pursue"] }
    ],
    traits: ["巴西阆中人", "镇南大将军", "本名狐笃"],
    bio: "字德信，巴西阆中人，少养外家，姓狐名笃，后复姓改名忠。先主败于猇亭，见忠而与语，谓尚书令刘巴曰虽亡黄权、复得狐笃，此为世不乏贤也。建兴三年拜牂牁太守，抚育恤理，甚有威惠；后为庲降都督，斩南夷刘胄。延熙五年加镇南大将军，十二年卒。《三国志·马忠传》",
    quote: "虽亡黄权，复得狐笃。",
    appear: [222, 249], impact: 3
  },

  "wu_yi": {
    id: "wu_yi", name: "吴懿", zi: "子远", aka: ["吴壹", "吴子远"],
    birth: null, death: 237, faction: "shu", roles: ["general", "consort"],
    stats: { lead: 76, war: 70, int: 58, pol: 60, cha: 68 },
    skills: [
      { id: "jiao_fang", name: "椒房之亲", kind: "aura",
        desc: "妹为穆皇后，本刘璋婚亲而降，先主处以显任，尽器其能",
        mod: { morale: 5, recruit: 0.05 }, tags: ["rally"] },
      { id: "du_hanzhong", name: "督汉中", kind: "passive",
        desc: "为车骑将军、假节督汉中，与王平同镇北境要地",
        mod: { citydef: 0.10 }, tags: ["fortify"] }
    ],
    traits: ["陈留人", "车骑将军", "《三国志》作吴壹"],
    bio: "字子远，陈留人，父吴匡素与刘焉有旧，举家随焉入蜀。妹为刘璋兄刘瑁之妻，瑁死后寡居，先主定益州而纳之，是为穆皇后。吴懿本璋婚亲而先降先主，拜讨逆将军。建兴中为左将军、领荆州刺史，封高阳乡侯；建兴十二年迁车骑将军、假节督汉中。《三国志》作吴壹，《后主传》《王平传》皆见其事。",
    quote: "以左将军吴壹为车骑将军，假节督汉中。",
    appear: [214, 237], impact: 3
  },

  "wu_ban": {
    id: "wu_ban", name: "吴班", zi: "元雄",
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 68, war: 66, int: 55, pol: 52, cha: 58 },
    skills: [
      { id: "qian_feng", name: "前锋", kind: "active", cd: 4, dur: 2,
        desc: "夷陵之役与冯习自巫攻破吴将李异，军次秭归而前",
        mod: { atk: 0.08, move: 1 }, tags: ["pursue"] }
    ],
    traits: ["陈留人", "后将军", "吴懿族弟"],
    bio: "字元雄，陈留人，吴懿之族弟，以豪侠称。章武元年先主东征，班与冯习自巫攻破吴将李异、刘阿等，军次秭归；二年与陈式以水军屯夷陵，夹江东西岸。建兴九年随诸葛亮出祁山，与大司马司马懿相拒，亮使魏延、高翔、吴班赴拒，大破之，获甲首三千级。《三国志·诸葛亮传》裴注引《汉晋春秋》",
    quote: "获甲首三千级，玄铠五千领。",
    appear: [221, 234], impact: 2
  },

  "li_yan": {
    id: "li_yan", name: "李严", zi: "正方", aka: ["李平"],
    birth: null, death: 234, faction: "shu", roles: ["minister", "general"],
    stats: { lead: 66, war: 55, int: 78, pol: 80, cha: 58 },
    skills: [
      { id: "gan_ju", name: "干局", kind: "passive",
        desc: "以才干称，筑江州大城，统内外军事而留镇永安",
        mod: { citydef: 0.08, xp: 0.05 }, tags: ["fortify"] },
      { id: "yun_liang", name: "运粮不继", kind: "passive",
        desc: "督运粮而矫诏呼还，事觉废徙，闻亮卒乃发病死",
        mod: { food: 2, def: -0.05 }, tags: ["logistics"] }
    ],
    traits: ["南阳人", "尚书令", "改名李平"],
    bio: "字正方，南阳人，后改名平。初为刘璋成都令，先主入蜀，严督绵竹诸军而降，拜犍为太守、兴业将军。章武二年拜尚书令；三年先主病笃，与诸葛亮并受遗诏辅少主，为中都护，统内外军事。建兴九年督运粮不继而矫诏呼亮还军，事觉，废为民，徙梓潼。十二年闻亮卒，发病死。《三国志·李严传》",
    quote: "吾与孔明俱受寄托，忧深责重。",
    appear: [211, 234], impact: 3
  },

  "liu_ba": {
    id: "liu_ba", name: "刘巴", zi: "子初",
    birth: null, death: 222, faction: "shu", roles: ["minister"],
    stats: { lead: 40, war: 30, int: 84, pol: 88, cha: 62 },
    skills: [
      { id: "chou_suan", name: "筹算", kind: "passive",
        desc: "成都初定府库空，巴建议铸直百钱、平诸物价，数月充实",
        mod: { gold: 80, food: 3 }, tags: ["logistics", "insight"] },
      { id: "qing_jian", name: "清俭", kind: "aura",
        desc: "履清尚之节，退无私交，非公事不言，蜀人称之",
        mod: { morale: 4, food: 2 }, tags: ["ritual"] }
    ],
    traits: ["零陵烝阳人", "尚书令", "共造蜀科"],
    bio: "字子初，零陵烝阳人。少知名，刘表辟举茂才不就；曹操辟为掾，使招纳长沙、零陵、桂阳，会先主定三郡，巴远适交趾，后归先主。为尚书令，与诸葛亮、法正、伊籍、李严共造《蜀科》。成都初定军用不足，巴请铸直百钱、平诸物价，数月之间府库充实。章武二年卒。《三国志·刘巴传》",
    quote: "易耳，但当铸直百钱，平诸物价。",
    appear: [208, 222], impact: 3
  },

  "huang_quan": {
    id: "huang_quan", name: "黄权", zi: "公衡", aka: ["景侯"],
    birth: null, death: 240, faction: "shu", roles: ["minister", "general"],
    stats: { lead: 62, war: 58, int: 80, pol: 76, cha: 68 },
    skills: [
      { id: "zhong_jian", name: "忠谏", kind: "passive",
        desc: "谏刘璋勿迎先主，言一国不容二君，璋不听而事验",
        mod: { xp: 0.06, vision: 2 }, tags: ["insight"] },
      { id: "shou_jie_quan", name: "守节", kind: "aura",
        desc: "夷陵道绝而降魏不降吴，魏主信其无二，官至车骑将军",
        mod: { def: 0.08, morale: 4 }, tags: ["guard", "ritual"] }
    ],
    traits: ["巴西阆中人", "镇北将军", "降魏不降吴"],
    bio: "字公衡，巴西阆中人。州牧刘璋召为主簿，谏璋勿迎先主，曰以部曲遇之则不满其心、以宾客待之则一国不容二君。先主定蜀，以为偏将军，后迁镇北将军，督江北诸军拒吴于夷陵道。先主败，归路断绝，权率众降魏；魏主知其无二，拜镇南将军，累迁车骑将军。正始元年薨，谥景侯。《三国志·黄权传》",
    quote: "一国不容二君。",
    appear: [211, 240], impact: 3
  },

  "yi_ji": {
    id: "yi_ji", name: "伊籍", zi: "机伯",
    birth: null, death: null, faction: "shu", roles: ["minister"],
    stats: { lead: 35, war: 30, int: 78, pol: 74, cha: 70 },
    skills: [
      { id: "ji_jie", name: "机捷", kind: "passive",
        desc: "使吴，孙权以辞折之，籍一拜一起未足为劳，权甚异之",
        mod: { xp: 0.06, vision: 1 }, tags: ["insight"] }
    ],
    traits: ["山阳人", "昭文将军", "共造蜀科"],
    bio: "字机伯，山阳人。先主在荆州，籍常往来自托，表卒遂随先主南渡江、从入益州。益州既定，以籍为左将军从事中郎，见待亚于简雍、孙乾。遣使于吴，孙权闻其才辩，欲逆折以辞，曰劳事无道之君乎，籍即对曰一拜一起未足为劳。后迁昭文将军，与诸葛亮、法正等共造《蜀科》。《三国志·伊籍传》",
    quote: "一拜一起，未足为劳。",
    appear: [209, 227], impact: 2
  },

  "sun_qian": {
    id: "sun_qian", name: "孙乾", zi: "公祐",
    birth: null, death: null, faction: "shu", roles: ["minister"],
    stats: { lead: 38, war: 35, int: 70, pol: 72, cha: 74 },
    skills: [
      { id: "feng_shi", name: "奉命", kind: "aura",
        desc: "先主领徐州辟为从事，屡使袁绍、刘表，雍容风议",
        mod: { morale: 5, recruit: 0.04 }, tags: ["rally"] }
    ],
    traits: ["北海人", "秉忠将军", "与糜竺齐名"],
    bio: "字公祐，北海人。先主领徐州，辟为从事；后先主与袁绍、刘表相通，多遣乾为使。曹操破袁绍而南击先主，先主遣糜竺、孙乾与刘表相闻，表自郊迎，以上宾礼待之，益其兵，使屯新野。乾雍容风议，见礼于世，官至秉忠将军。陈寿称其与糜竺、简雍、伊籍皆雍容风议。《三国志·孙乾传》",
    quote: "雍容风议，见礼于世。",
    appear: [194, 214], impact: 2
  },

  "jian_yong": {
    id: "jian_yong", name: "简雍", zi: "宪和", aka: ["耿雍"],
    birth: null, death: null, faction: "shu", roles: ["minister"],
    stats: { lead: 36, war: 32, int: 72, pol: 70, cha: 78 },
    skills: [
      { id: "you_mo", name: "滑稽", kind: "passive",
        desc: "善滑稽，说先主原酿者之罪，又往说刘璋使其出降",
        mod: { morale: 5, recruit: 0.04 }, tags: ["rally", "insight"] }
    ],
    traits: ["涿郡人", "昭德将军", "说降刘璋"],
    bio: "字宪和，涿郡人，本姓耿，幽州人语谓耿为简，遂随音变之。少与先主有旧，随从周旋。先主入益州，简雍为宾客；成都被围，先主遣雍往说刘璋，璋素雅敬雍，遂与同舆而出降，吏民莫不歔欷。官至昭德将军，性简傲跌宕，善滑稽，虽与先主同榻、箕踞倾倚而无所屈。《三国志·简雍传》",
    quote: "彼有其具，与欲酿者同。",
    appear: [194, 220], impact: 2
  },

  "mi_zhu": {
    id: "mi_zhu", name: "糜竺", zi: "子仲", aka: ["麋竺"],
    birth: null, death: null, faction: "shu", roles: ["minister"],
    stats: { lead: 40, war: 30, int: 68, pol: 76, cha: 76 },
    skills: [
      { id: "qing_jia", name: "倾家", kind: "aura",
        desc: "谦死率州人迎先主，进妹为夫人，以奴客金银助军资",
        mod: { gold: 120, recruit: 0.06 }, tags: ["logistics", "rally"] }
    ],
    traits: ["东海朐人", "安汉将军", "《三国志》作麋竺"],
    bio: "字子仲，东海朐人，祖世货殖，家资巨万。徐州牧陶谦辟为别驾从事，谦病笃谓非刘备不能安此州，竺率州人迎先主，又进妹为夫人，以奴客二千及金银货币助军资。益州既定，拜安汉将军，班在军师将军之右。弟麋芳叛迎孙权，竺面缚请罪，先主慰谕以兄弟罪不相及，竺惭恚发病卒。《三国志·麋竺传》",
    quote: "非刘备不能安此州也。",
    appear: [194, 223], impact: 2
  },

  "mi_fang": {
    id: "mi_fang", name: "糜芳", zi: "子方", aka: ["麋芳"],
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 55, war: 58, int: 45, pol: 40, cha: 35 },
    skills: [
      { id: "fan_fu", name: "反覆", kind: "passive",
        desc: "为南郡太守，与羽有隙、供给军资不悉相救，叛迎孙权",
        mod: { atk: 0.04, def: -0.08 }, tags: ["dread"] }
    ],
    traits: ["东海人", "南郡太守", "叛降孙氏"],
    bio: "字子方，东海人，麋竺之弟。先主定江南，以芳为南郡太守。关羽北伐，芳与将军士仁供给军资不悉相救，羽言还当治之，芳、仁咸怀惧不安。孙权阴诱之，芳、仁使人迎权，荆州遂失，关羽败亡。杨戏作《季汉辅臣赞》，列芳与士仁、郝普、潘濬于奔臣之目。《三国志·关羽传》及《季汉辅臣赞》",
    quote: "自绝于人，作笑二国。",
    appear: [214, 219], impact: 1
  },

  "fu_shiren": {
    id: "fu_shiren", name: "傅士仁", aka: ["士仁"],
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 52, war: 55, int: 42, pol: 38, cha: 34 },
    skills: [
      { id: "zhu_zha", name: "驻守", kind: "passive",
        desc: "为将军屯公安，统属关羽，与羽有隙而叛迎孙权",
        mod: { citydef: 0.05, morale: -3 }, tags: ["guard"] }
    ],
    traits: ["广阳人", "公安守将", "《三国志》作士仁"],
    bio: "字君义，广阳人，为将军，屯公安，统属关羽。关羽北伐樊城，仁与南郡太守麋芳供给军资不悉相救，羽言还当治之，二人皆怀惧。孙权阴诱芳、仁，芳、仁使人迎权，荆州遂失，羽亦败亡。杨戏《季汉辅臣赞》列之于奔臣。正史作士仁，后世多称傅士仁。《三国志·关羽传》及卷四十五",
    quote: "芳、仁使人迎权。",
    appear: [214, 219], impact: 1
  },

  "meng_da": {
    id: "meng_da", name: "孟达", zi: "子度",
    birth: null, death: 228, faction: "shu", roles: ["general"],
    stats: { lead: 60, war: 62, int: 62, pol: 48, cha: 50 },
    skills: [
      { id: "fan_fu_da", name: "反覆", kind: "passive",
        desc: "先事刘璋，继归先主，又降魏，终以谋叛为司马懿所斩",
        mod: { atk: 0.05, def: -0.06 }, tags: ["dread"] }
    ],
    traits: ["扶风人", "新城太守", "为司马懿所斩"],
    bio: "字子度，扶风人。建安初与法正俱入蜀依刘璋，后归先主，为宜都太守。建安二十四年与刘封攻上庸，因封侵陵，又畏罪，遂降魏，魏以为新城太守。诸葛亮诱之以为外援，数与通书相闻。太和二年谋叛魏，司马懿八日行千二百里至新城，斩之。《三国志·刘封传》《明帝纪》",
    quote: "达得亮书，数相交通，辞欲叛魏。",
    appear: [211, 228], impact: 2
  },

  "liu_feng": {
    id: "liu_feng", name: "刘封",
    birth: null, death: 220, faction: "shu", roles: ["general"],
    stats: { lead: 66, war: 72, int: 48, pol: 40, cha: 50 },
    skills: [
      { id: "wei_meng", name: "威猛", kind: "passive",
        desc: "有武艺、气力过人，副军将军，将兵所在皆克",
        mod: { atk: 0.08 }, tags: ["dread"] }
    ],
    traits: ["罗侯寇氏子", "副军将军", "赐死"],
    bio: "刘备养子，本罗侯寇氏之子，长沙刘氏之甥，先主以未有继嗣而养之。有武艺，气力过人，将兵与诸葛亮、张飞溯流西上，所在皆克，益州既定，以为副军将军。建安二十四年与孟达攻上庸，陵逼孟达，又不救关羽，先主责之；诸葛亮虑封刚猛，劝先主因此除之，遂赐死。《三国志·刘封传》",
    quote: "易世之后，终难制御。",
    appear: [211, 220], impact: 2
  },

  "guan_ping": {
    id: "guan_ping", name: "关平",
    birth: null, death: 220, faction: "shu", roles: ["general"],
    stats: { lead: 70, war: 76, int: 55, pol: 45, cha: 60 },
    skills: [
      { id: "sui_zheng", name: "随征", kind: "aura",
        desc: "随父羽征樊城，临沮同殉，父子俱死汉室之难",
        mod: { atk: 0.06, morale: 3 }, tags: ["guard"] }
    ],
    traits: ["关羽之子", "临沮同死", "《蜀记》见其名"],
    bio: "关羽之子，《蜀记》载关羽出军围樊，梦猪啮其足，语子平曰吾今年衰矣，然不得还。随父镇荆州，建安二十四年关羽北伐樊城，平随军在军。及吕蒙袭取江陵，关羽退走麦城，孙权遣将逆击，斩羽及子平于临沮。《三国志·关羽传》裴注引《蜀记》",
    quote: "斩羽及子平于临沮。",
    appear: [214, 220], impact: 2
  },

  "guan_xing": {
    id: "guan_xing", name: "关兴", zi: "安国",
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 62, war: 70, int: 62, pol: 58, cha: 66 },
    skills: [
      { id: "ling_wen", name: "令问", kind: "passive",
        desc: "少有令问，诸葛亮深器异之，弱冠为侍中、中监军",
        mod: { xp: 0.06, morale: 3 }, tags: ["insight"] }
    ],
    traits: ["关羽之子", "侍中", "早卒"],
    bio: "字安国，关羽之子。少有令问，丞相诸葛亮深器异之，弱冠即为侍中、中监军，数岁卒。子统嗣爵，尚公主，官至虎贲中郎将；统卒无子，以兴庶子彝续封。景耀三年追谥关羽曰壮缪侯，关氏世为蜀汉所重。裴注又载庞德子会随钟邓伐蜀，蜀破，尽灭关氏家。《三国志·关羽传》裴注引《蜀记》",
    quote: "少有令问，丞相诸葛亮深器异之。",
    appear: [220, 240], impact: 2
  },

  "zhang_bao": {
    id: "zhang_bao", name: "张苞",
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 58, war: 66, int: 50, pol: 45, cha: 55 },
    skills: [
      { id: "zao_yao", name: "早夭", kind: "passive",
        desc: "张飞长子，早夭；其子张遵为尚书，随诸葛瞻死绵竹",
        mod: { atk: 0.04 }, tags: ["guard"] }
    ],
    traits: ["张飞长子", "早夭", "子张遵死绵竹"],
    bio: "张飞长子，早夭。其子张遵为蜀汉尚书，景耀六年邓艾入阴平，诸葛瞻拒之于绵竹，遵从战与瞻俱没。张飞次子张绍嗣爵，官至侍中、尚书仆射，蜀亡时奉玺绶诣邓艾于雒。《三国志·张飞传》",
    quote: "长子苞，早夭。",
    appear: [214, 220], impact: 1
  },

  "zhuge_zhan": {
    id: "zhuge_zhan", name: "诸葛瞻", zi: "思远",
    birth: 227, death: 263, faction: "shu", roles: ["general", "minister"],
    stats: { lead: 68, war: 62, int: 72, pol: 74, cha: 74 },
    skills: [
      { id: "fu_zhi", name: "父志", kind: "aura",
        desc: "外不负国，内不改父之志，绵竹临阵而死，时年三十七",
        mod: { morale: 6, def: 0.06 }, tags: ["rally", "guard"] },
      { id: "ping_shangshu", name: "平尚书事", kind: "passive",
        desc: "与董厥并平尚书事，统朝政而不能匡矫黄皓窃柄",
        mod: { citydef: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["诸葛亮之子", "卫将军", "死绵竹"],
    bio: "字思远，琅邪阳都人，诸葛亮之子。建兴十二年亮卒，瞻嗣爵武乡侯。尚公主，拜骑都尉，累迁侍中，加军师将军。景耀四年与董厥并平尚书事，姜维常征伐在外，宦官黄皓窃弄机柄，瞻等无能匡矫。景耀六年邓艾由阴平入，瞻督诸军至涪，退住绵竹，怒斩艾使，战败临阵死，时年三十七。《三国志·诸葛亮传》附",
    quote: "外不负国，内不改父之志。",
    appear: [243, 263], impact: 3
  },

  "zhuge_shang": {
    id: "zhuge_shang", name: "诸葛尚",
    birth: null, death: 263, faction: "shu", roles: ["general"],
    stats: { lead: 55, war: 66, int: 60, pol: 55, cha: 70 },
    skills: [
      { id: "fu_si", name: "赴死", kind: "active", cd: 5, dur: 2,
        desc: "闻父败，叹不早斩黄皓以致倾败，驰赴魏军而死，父子俱没",
        mod: { atk: 0.12, morale: 5 }, tags: ["rally", "guard"] }
    ],
    traits: ["诸葛瞻长子", "绵竹", "父子俱没"],
    bio: "诸葛瞻长子。景耀六年邓艾入阴平，瞻督诸军拒之于绵竹，尚随父在军。及瞻败将没，尚叹曰父子荷国重恩，不早斩黄皓，以致倾败，用生何为，乃驰赴魏军而死，父子俱没于绵竹。干宝称瞻虽智不足以扶危，勇不足以拒敌，而能外不负国，内不改父之志，忠孝存焉。《三国志·诸葛亮传》裴注引《华阳国志》",
    quote: "用生何为！",
    appear: [258, 263], impact: 2
  },

  "zhao_guang": {
    id: "zhao_guang", name: "赵广",
    birth: null, death: 263, faction: "shu", roles: ["general"],
    stats: { lead: 60, war: 70, int: 55, pol: 45, cha: 58 },
    skills: [
      { id: "ya_men", name: "牙门", kind: "passive",
        desc: "牙门将，随姜维屯沓中，临阵战死，父子皆死国事",
        mod: { atk: 0.06, def: 0.04 }, tags: ["guard"] }
    ],
    traits: ["赵云次子", "牙门将", "战死沓中"],
    bio: "赵云次子。兄赵统嗣父爵，官至虎贲中郎督、行领军；广官至牙门将，随大将军姜维屯沓中。景耀六年魏伐蜀，邓艾自阴平入，姜维为邓艾所摧，还住阴平，广临阵战死。《三国志·赵云传》",
    quote: "次子广，牙门将，随姜维沓中，临陈战死。",
    appear: [240, 263], impact: 2
  },

  "huo_yi": {
    id: "huo_yi", name: "霍弋", zi: "绍先",
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 74, war: 70, int: 72, pol: 74, cha: 70 },
    skills: [
      { id: "fu_nanzhong", name: "抚南中", kind: "aura",
        desc: "为庲降都督、安南将军，抚和异俗，为之立法施教",
        mod: { recruit: 0.08, morale: 5 }, tags: ["barbarian", "logistics"] },
      { id: "su_fu", name: "素服临哭", kind: "passive",
        desc: "闻成都不守，素服号哭三日，待知主之安危而后降",
        mod: { morale: 4, def: 0.05 }, tags: ["ritual"] }
    ],
    traits: ["南郡枝江人", "霍峻之子", "安南将军"],
    bio: "字绍先，南郡枝江人，霍峻之子。诸葛亮北驻汉中，请为记室。迁黄门侍郎、庲降屯副贰都督，领建宁太守，抚和异俗，立法施教，轻重允当。景耀六年进号安南将军。魏军来，欲赴成都而后主不听；成都不守，素服号哭三日，待知后主东迁乃降魏。入晋仍统南中，表遣杨稷、毛炅等戍交趾。《三国志·霍峻传》附",
    quote: "未详主之安危，不可苟也。",
    appear: [228, 264], impact: 3
  },

  "luo_xian": {
    id: "luo_xian", name: "罗宪", zi: "令则", aka: ["罗献"],
    birth: null, death: 270, faction: "shu", roles: ["general"],
    stats: { lead: 76, war: 70, int: 72, pol: 70, cha: 68 },
    skills: [
      { id: "shou_yongan", name: "守永安", kind: "active", cd: 6, dur: 3,
        desc: "以孤城拒吴步协、陆抗之众，坚守逾年，义声闻于天下",
        mod: { citydef: 0.18, def: 0.10 }, tags: ["fortify", "guard"] }
    ],
    traits: ["襄阳人", "巴东领军", "守永安拒吴"],
    bio: "字令则，襄阳人，华阳国志作罗献。为巴东领军，蜀亡后吴将步协、陆抗率众围之，宪保城拒守，坚守逾年，城中疾疫而励将士不懈，吴军终不能克。晋以为凌江将军、领武陵太守，后为监巴东诸军事，仍统其任。在晋为名将，泰始中卒。《晋书·罗宪传》《华阳国志·巴志》",
    quote: "蜀平，献仍其任，拜凌江将军。",
    appear: [258, 264], impact: 3
  },

  "ma_dai": {
    id: "ma_dai", name: "马岱",
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 68, war: 72, int: 55, pol: 50, cha: 55 },
    skills: [
      { id: "zhui_zhan", name: "追斩", kind: "active", cd: 4, dur: 2,
        desc: "受杨仪之命追斩魏延于汉中，致首于仪，一战定乱",
        mod: { atk: 0.08 }, tags: ["pursue"] }
    ],
    traits: ["马超从弟", "平北将军", "陈仓侯"],
    bio: "马超从弟，随超自凉州入蜀。建兴十二年诸葛亮卒于武功，魏延与长史杨仪争权、举兵相攻，延士众知曲在延，莫为用命，军皆散，延独与其子数人逃亡奔汉中，仪遣马岱追斩之，致首于仪。官至平北将军，进爵陈仓侯。《三国志·马超传》《魏延传》",
    quote: "仪遣马岱追斩之，致首于仪。",
    appear: [214, 234], impact: 2
  },

  "deng_zhi": {
    id: "deng_zhi", name: "邓芝", zi: "伯苗",
    birth: null, death: 251, faction: "shu", roles: ["minister", "general"],
    stats: { lead: 62, war: 50, int: 78, pol: 78, cha: 74 },
    skills: [
      { id: "shi_wu", name: "使吴", kind: "active", cd: 5, dur: 2,
        desc: "说孙权绝魏，以吴蜀为唇齿，东西掎角，两国复通",
        mod: { morale: 6, atk: 0.05 }, tags: ["rally", "insight"] },
      { id: "jian_zhen", name: "坚贞", kind: "passive",
        desc: "为大将军二十余年，赏罚明断，终不治私产，家无余财",
        mod: { food: 2, gold: 40 }, tags: ["logistics"] }
    ],
    traits: ["义阳新野人", "车骑将军", "家无余财"],
    bio: "字伯苗，义阳新野人，汉司徒邓禹之后，汉末入蜀。先主薨后，诸葛亮遣芝使吴，芝说孙权曰蜀有重险之固、吴有三江之阻，合此二长共为唇齿，权遂绝魏，与蜀连和。后为扬武将军、前军师；延熙中为车骑将军。芝为大将军二十余年，赏罚明断，善恤卒伍，终不治私产，死之日家无余财。《三国志·邓芝传》",
    quote: "蜀有重险之固，吴有三江之阻。",
    appear: [223, 251], impact: 3
  },

  "zong_yu": {
    id: "zong_yu", name: "宗预", zi: "德艳",
    birth: null, death: 264, faction: "shu", roles: ["minister", "general"],
    stats: { lead: 60, war: 50, int: 76, pol: 74, cha: 72 },
    skills: [
      { id: "kang_zhi", name: "抗直", kind: "aura",
        desc: "使吴抗直，孙权嘉其言、捉手涕泣而别，遗以大珠",
        mod: { morale: 5, xp: 0.05 }, tags: ["rally", "insight"] }
    ],
    traits: ["南阳安众人", "镇军大将军", "道病卒"],
    bio: "字德艳，南阳安众人。建兴初，诸葛亮以为主簿。亮卒后，吴增巴丘守兵万人，预使吴责之，孙权大笑嘉其抗直。延熙十年为屯骑校尉；车骑将军邓芝以年啁之，预答曰卿七十不还兵，我六十何为不受邪。后为后将军、督永安，迁征西大将军、镇军大将军。咸熙元年内徙洛阳，道病卒。《三国志·宗预传》",
    quote: "卿七十不还兵，我六十何为不受邪？",
    appear: [223, 264], impact: 3
  },

  "yang_hong": {
    id: "yang_hong", name: "杨洪", zi: "季休",
    birth: null, death: null, faction: "shu", roles: ["minister"],
    stats: { lead: 55, war: 50, int: 78, pol: 80, cha: 66 },
    skills: [
      { id: "yan_hou", name: "咽喉之议", kind: "active", cd: 5, dur: 2,
        desc: "先主争汉中急书发兵，洪言汉中是蜀之咽喉，发兵何疑",
        mod: { food: 3, morale: 5 }, tags: ["logistics", "rally"] }
    ],
    traits: ["犍为武阳人", "蜀郡太守", "忧公如家"],
    bio: "字季休，犍为武阳人。刘璋时历部诸郡。先主定蜀，太守李严命为功曹，严欲徙郡治，洪固谏不听，遂辞去。先主争汉中，急书发兵，诸葛亮以问洪，洪曰汉中是益州咽喉，若失汉中则无蜀，男子当战、女子当运，发兵何疑，亮以洪领蜀郡太守。平生不好学问而忠清款亮，忧公如家。子昆嗣。《三国志·杨洪传》",
    quote: "汉中是益州咽喉，发兵何疑？",
    appear: [214, 228], impact: 2
  },

  "zhang_yi_2": {
    id: "zhang_yi_2", name: "张裔", zi: "君嗣",
    birth: null, death: 230, faction: "shu", roles: ["minister"],
    stats: { lead: 45, war: 40, int: 80, pol: 78, cha: 70 },
    skills: [
      { id: "ji_jie_yi", name: "机捷", kind: "passive",
        desc: "治公羊春秋，博涉史汉，许靖称为中夏钟繇之流",
        mod: { xp: 0.08 }, tags: ["scholar", "insight"] }
    ],
    traits: ["蜀郡成都人", "留府长史", "辅汉将军"],
    bio: "字君嗣，蜀郡成都人，治《公羊春秋》，博涉《史》《汉》，汝南许靖称为中夏钟繇之流。刘璋时举孝廉，为鱼复长，还为州署从事。先主定蜀，以裔为益州太守，为雍闿所缚送于吴；后诸葛亮遣邓芝使吴，请裔得还。后为丞相留府长史，加辅汉将军，与蒋琬统留府事。建兴八年卒，子毣嗣。《三国志·张裔传》",
    quote: "愚以为卓氏之寡女，犹贤于买臣之妻。",
    appear: [214, 230], impact: 2
  },

  "xiang_lang": {
    id: "xiang_lang", name: "向朗", zi: "巨达",
    birth: null, death: null, faction: "shu", roles: ["minister"],
    stats: { lead: 50, war: 40, int: 80, pol: 78, cha: 74 },
    skills: [
      { id: "hao_xue", name: "好学不倦", kind: "passive",
        desc: "去长史后鸠合经籍，潜心典籍，诱纳后进，讲论古义",
        mod: { xp: 0.12 }, tags: ["scholar"] },
      { id: "shi_decao", name: "师事德操", kind: "aura",
        desc: "少师事司马徽，与徐元直、韩德高、庞士元皆相友善",
        mod: { xp: 0.05, morale: 4 }, tags: ["scholar", "rally"] }
    ],
    traits: ["襄阳宜城人", "左将军", "显明亭侯"],
    bio: "字巨达，襄阳宜城人。少师事司马徽，与徐元直、韩德高、庞士元相亲善，荆州牧刘表以为临沮长。表卒归先主，为巴西太守，后为步兵校尉、丞相长史，统留府事。街亭之役，朗以不时臧否免罢。后为左将军，封显明亭侯。自去长史，优游无事，乃鸠合经籍，潜心典籍，诱纳后进，讲论古义。《三国志·向朗传》",
    quote: "向朗好学不倦。",
    appear: [214, 247], impact: 2
  },

  "fei_shi": {
    id: "fei_shi", name: "费诗", zi: "公举",
    birth: null, death: null, faction: "shu", roles: ["minister"],
    stats: { lead: 45, war: 40, int: 76, pol: 72, cha: 72 },
    skills: [
      { id: "shuai_yan", name: "率意直言", kind: "passive",
        desc: "说关羽受拜，谏先主勿称尊号，辞气率直而不阿",
        mod: { def: 0.05, morale: 4 }, tags: ["ritual", "insight"] }
    ],
    traits: ["犍为南安人", "谏议大夫", "说关羽受拜"],
    bio: "字公举，犍为南安人。刘璋时为绵竹令，先主攻绵竹，诗先举城降。先主遣诗拜关羽假节，羽怒曰大丈夫终不与老兵同列，诗以萧、曹与高祖少小亲旧、陈韩亡命后至为喻，羽感悟受拜。先主称尊号，诗上疏言大敌未灭、不宜先自称尊，左迁永昌从事。蒋琬秉政，以诗为谏议大夫，卒于家。《三国志·费诗传》",
    quote: "王与君侯，譬犹一体，祸福同之。",
    appear: [214, 240], impact: 2
  },

  "liu_yan_2": {
    id: "liu_yan_2", name: "刘琰", zi: "威硕",
    birth: null, death: 234, faction: "shu", roles: ["minister"],
    stats: { lead: 40, war: 35, int: 68, pol: 62, cha: 74 },
    skills: [
      { id: "feng_liu", name: "风流", kind: "aura",
        desc: "有风流、善谈论，车骑将军，班位常在诸臣之右",
        mod: { morale: 5, recruit: 0.04 }, tags: ["rally"] }
    ],
    traits: ["鲁国人", "车骑将军", "下狱弃市"],
    bio: "字威硕，鲁国人。先主在豫州，辟为从事，以其宗姓、有风流、善谈论而厚亲待之。先主定益州，以为固陵太守；后主时累迁至车骑将军，封都乡侯。与魏延不和，还成都，诸葛亮责让之。建兴十二年妻胡氏入宫朝贺，太后令留月余乃出，琰疑其与后主有私，呼卒挝之，下狱弃市。《三国志·刘琰传》",
    quote: "琰有风流，善谈论。",
    appear: [214, 234], impact: 2
  },

  "ju_fu": {
    id: "ju_fu", name: "句扶",
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 72, war: 76, int: 52, pol: 48, cha: 60 },
    skills: [
      { id: "zhong_yong", name: "忠勇宽厚", kind: "aura",
        desc: "数有战功，功名爵位亚于王平，官至左将军，封宕渠侯",
        mod: { atk: 0.08, def: 0.06 }, tags: ["guard"] }
    ],
    traits: ["巴西汉昌人", "左将军", "宕渠侯"],
    bio: "巴西汉昌人。与王平同郡，忠勇宽厚，数有战功，功名爵位亚于王平，官至左将军，封宕渠侯。《三国志·王平传》载其事，裴注引《华阳国志》称后张翼、廖化并为大将军，时人语曰前有王、句，后有张、廖，以王平、句扶与张翼、廖化并称蜀之良将。",
    quote: "前有王、句，后有张、廖。",
    appear: [219, 244], impact: 2
  },

  "liu_yin": {
    id: "liu_yin", name: "柳隐", zi: "休然",
    birth: null, death: null, faction: "shu", roles: ["general"],
    stats: { lead: 70, war: 68, int: 62, pol: 60, cha: 62 },
    skills: [
      { id: "ju_xian", name: "据险", kind: "active", cd: 5, dur: 3,
        desc: "为汉中黄金围督，钟会伐蜀时拒守不下，至后主降乃出",
        mod: { def: 0.12, citydef: 0.10 }, tags: ["fortify"] }
    ],
    traits: ["蜀郡成都人", "黄金围督", "晋西河太守"],
    bio: "字休然，蜀郡成都人。少与同郡杜祯、柳伸并知名，历事蜀汉，为汉中黄金围督，据险守御。景耀六年钟会伐蜀，隐拒守不下，及后主降，乃出降。蜀亡后归乡，年八十余卒。晋泰始二年，武帝弘纳梁益方彦，用故黄金督蜀郡柳隐为西河太守。《华阳国志·后贤志》",
    quote: "西河烈烈，秉义居贞。",
    appear: [240, 264], impact: 2
  },

  "fu_qian": {
    id: "fu_qian", name: "傅佥",
    birth: null, death: 263, faction: "shu", roles: ["general"],
    stats: { lead: 74, war: 78, int: 55, pol: 50, cha: 62 },
    skills: [
      { id: "ge_dou", name: "格斗", kind: "passive",
        desc: "为关中都督，蒋舒开城降而佥格斗而死，父子奕世忠义",
        mod: { atk: 0.10, def: 0.06 }, tags: ["guard", "iron"] }
    ],
    traits: ["傅肜之子", "关中都督", "阳安关战死"],
    bio: "义阳人，傅肜之子。父肜于章武二年先主东征时为别督，军败，骂吴军而死。佥拜左中郎，后为关中都督。景耀六年钟会攻阳安关口，副将蒋舒诡言出战而开城出降，佥格斗而死。晋武帝诏称其身在关城、拒官军致死不顾，父肜复为刘备战亡，天下之善一也。《三国志·杨戏传》附及裴注引《蜀记》",
    quote: "受命保城，惟全为功。",
    appear: [240, 263], impact: 2
  },

  "jiang_bin": {
    id: "jiang_bin", name: "蒋斌",
    birth: null, death: 264, faction: "shu", roles: ["general"],
    stats: { lead: 62, war: 55, int: 72, pol: 70, cha: 62 },
    skills: [
      { id: "shou_hancheng", name: "守汉城", kind: "passive",
        desc: "为绥武将军、汉城护军，钟会遗书求祭其父墓，答辞得体",
        mod: { citydef: 0.10, def: 0.05 }, tags: ["fortify"] }
    ],
    traits: ["蒋琬之子", "汉城护军", "死于成都之乱"],
    bio: "蒋琬之子，嗣爵安阳亭侯，为绥武将军、汉城护军。景耀六年钟会至汉城，与斌书曰巴蜀贤智文武之士多矣，至于足下、诸葛思远，譬诸草木，吾气类也，欲奉瞻其父墓、洒扫致敬。斌答书得体，会嘉叹意义。后随会至成都，为乱兵所杀；弟蒋显时为太子仆，亦同时死。《三国志·蒋琬传》",
    quote: "譬诸草木，吾气类也。",
    appear: [240, 264], impact: 2
  },

  "xi_zheng": {
    id: "xi_zheng", name: "郤正", zi: "令先", aka: ["郤纂"],
    birth: null, death: 278, faction: "shu", roles: ["minister"],
    stats: { lead: 35, war: 30, int: 84, pol: 76, cha: 70 },
    skills: [
      { id: "wen_ci", name: "文辞", kind: "passive",
        desc: "博览坟籍，尤耽文章，陈寿称其文辞灿烂，有张蔡之风",
        mod: { xp: 0.10 }, tags: ["scholar"] },
      { id: "shou_yi", name: "守义", kind: "aura",
        desc: "成都陷时颠沛守义，为后主作降书，晋武嘉其忠节",
        mod: { morale: 5, def: 0.05 }, tags: ["ritual", "rally"] }
    ],
    traits: ["河南偃师人", "秘书令", "晋巴西太守"],
    bio: "字令先，河南偃师人，本名纂。祖父郤俭为益州刺史，为盗贼所杀；父郤揖为将军孟达都督，随达降魏。正少以父死母嫁，安贫好学，博览坟籍，入为秘书吏，转令史、迁郎，至秘书令。景耀六年劝后主降，为作降书。晋武诏称其昔在成都颠沛守义、不违忠节，以为巴西太守，咸宁四年卒。《三国志·郤正传》",
    quote: "颠沛守义，不违忠节。",
    appear: [240, 264], impact: 3
  },

  "qiao_zhou": {
    id: "qiao_zhou", name: "谯周", zi: "允南",
    birth: 201, death: 270, faction: "shu", roles: ["minister", "strategist"],
    stats: { lead: 32, war: 25, int: 86, pol: 82, cha: 68 },
    skills: [
      { id: "shuo_ru", name: "硕儒", kind: "aura",
        desc: "词理渊通、为世硕儒，弟子知名者众，著仇国论讽黩武",
        mod: { xp: 0.12, morale: 4 }, tags: ["scholar"] },
      { id: "quan_jiang", name: "劝降", kind: "active", cd: 6, dur: 2,
        desc: "景耀六年陈降魏之策，以为可保国安民，后主从之",
        mod: { citydef: 0.10, food: 3 }, tags: ["insight", "logistics"] }
    ],
    traits: ["巴西西充国人", "光禄大夫", "阳城亭侯"],
    bio: "字允南，巴西西充国人。幼孤，家贫，好学不倦，精研六经，尤善书札，仕蜀为劝学从事、中散大夫、光禄大夫。延熙中著《仇国论》，言可为文王、难为汉祖，讽姜维黩武。景耀六年邓艾入阴平，群臣议或奔吴、或走南中，周独陈降魏之策，后主从之，奉书降艾。入晋拜骑都尉，泰始六年卒。《三国志·谯周传》",
    quote: "可为文王，难为汉祖。",
    appear: [225, 264], impact: 3
  },

  /* ===================== 刘焉·刘璋（益州） yi ===================== */

  "liu_yan": {
    id: "liu_yan", name: "刘焉", zi: "君郎", aka: ["刘君郎"],
    birth: null, death: 194, faction: "yi", roles: ["lord"],
    stats: { lead: 60, war: 45, int: 74, pol: 76, cha: 70 },
    skills: [
      { id: "mu_bo", name: "牧伯", kind: "aura",
        desc: "领益州牧，收摄贪残，抚纳离叛，益州由是殷盛自守",
        mod: { recruit: 0.08, morale: 5 }, tags: ["rally", "logistics"] },
      { id: "cheng_yu", name: "乘舆之僭", kind: "passive",
        desc: "造作乘舆车具千余乘，托疾不朝而有异志，卒感祅灾",
        mod: { atk: 0.04, def: -0.05 }, tags: ["dread"] }
    ],
    traits: ["江夏竟陵人", "益州牧", "阳城侯"],
    bio: "字君郎，江夏竟陵人，汉鲁恭王之后。历洛阳令、冀州刺史、南阳太守、宗正、太常。中平五年因侍中董扶言益州有天子气，求出为监军使者、领益州牧，封阳城侯，收前刺史郤俭之弊政。遣张鲁据汉中，托疾不朝，造作乘舆。兴平元年子刘范谋袭长安事败，焉被天火烧城，痈疽发背卒。《三国志·刘焉传》",
    quote: "益州分野有天子气。",
    appear: [188, 194], impact: 3
  },

  "liu_zhang": {
    id: "liu_zhang", name: "刘璋", zi: "季玉", aka: ["刘季玉"],
    birth: null, death: null, faction: "yi", roles: ["lord"],
    stats: { lead: 42, war: 38, int: 60, pol: 66, cha: 72 },
    skills: [
      { id: "wen_ren", name: "温仁", kind: "aura",
        desc: "州大吏以其温仁共上为益州牧，闭隘养力而守先图",
        mod: { morale: 5, citydef: 0.05 }, tags: ["rally", "fortify"] }
    ],
    traits: ["江夏竟陵人", "益州牧", "降先主"],
    bio: "字季玉，江夏竟陵人，刘焉之子。兴平元年袭位为益州牧，性温仁而为张鲁所轻，遂杀张鲁母弟。建安十六年听张松之议迎先主，先主入境如归；十七年松谋泄被诛，先主回兵攻之，十九年雒城破，先主围成都，璋曰父子在州二十余年、无恩德以加百姓，遂请降。孙权以璋为益州牧，未几卒。《三国志·刘二牧传》",
    quote: "父子在州二十余年，无恩德以加百姓。",
    appear: [194, 219], impact: 3
  },

  "zhang_song": {
    id: "zhang_song", name: "张松", zi: "子乔", aka: ["张永年"],
    birth: null, death: 212, faction: "yi", roles: ["strategist"],
    stats: { lead: 45, war: 40, int: 80, pol: 68, cha: 60 },
    skills: [
      { id: "xian_tu", name: "献图", kind: "active", cd: 4, dur: 2,
        desc: "备问蜀中阔狭、府库人马众寡与要害道里，松具言之",
        mod: { vision: 3 }, tags: ["insight", "ambush"] }
    ],
    traits: ["蜀郡人", "别驾从事", "事泄被斩"],
    bio: "字子乔，一作永年，蜀郡人，刘璋别驾从事。建安十三年奉使诣曹操，操方自矜伐，不存录松，松以此怨，还而疵毁曹操，劝璋自绝。又劝璋迎先主以讨张鲁；备问蜀中阔狭、兵器府库、人马众寡及要害道里远近，松具言之，又画地图山川处所，由是备尽知益州虚实。十七年事泄被杀。《三国志·刘二牧传》裴注",
    quote: "刘豫州，使君之肺腑，可与交通。",
    appear: [208, 212], impact: 3
  },

  "zhang_ren": {
    id: "zhang_ren", name: "张任",
    birth: null, death: 213, faction: "yi", roles: ["general"],
    stats: { lead: 74, war: 80, int: 60, pol: 48, cha: 60 },
    skills: [
      { id: "duan_tou", name: "断头不降", kind: "passive",
        desc: "雁桥败而被禽，厉声言老臣终不复事二主，先主壮而杀之",
        mod: { def: 0.10, morale: 4 }, tags: ["guard", "dread"] }
    ],
    traits: ["蜀郡人", "州从事", "雁桥被禽"],
    bio: "蜀郡人，少有胆勇，有志节，仕州为从事。建安十八年刘璋遣张任与刘璝、冷苞、邓贤等拒先主于涪，皆破败，退保绵竹；任与璋子循共守雒城，被攻且一年。任勒兵出战于雁桥，复败被禽。先主闻其忠勇，令军降之，任曰老臣终不复事二主矣，遂被杀，先主为之叹息。《三国志·先主传》裴注引《益部耆旧杂记》",
    quote: "老臣终不复事二主矣。",
    appear: [213, 213], impact: 3
  },

  "yan_yan": {
    id: "yan_yan", name: "严颜",
    birth: null, death: null, faction: "yi", roles: ["general"],
    stats: { lead: 70, war: 72, int: 58, pol: 55, cha: 66 },
    skills: [
      { id: "duan_tou_jiang", name: "断头将军", kind: "passive",
        desc: "飞破江州生获之，颜言我州但有断头将军，无降将军",
        mod: { def: 0.10, morale: 5 }, tags: ["guard", "dread"] }
    ],
    traits: ["巴郡人", "巴郡守将", "为张飞所释"],
    bio: "巴郡人，《华阳国志》以为巴郡守将。刘璋初敕所在供奉先主，颜拊心叹曰此所谓独坐穷山、放虎自卫者也。建安十八年张飞、赵云溯江西上，破巴郡，生获颜。飞呵之何以不降而敢拒战，颜曰卿等无状，侵夺我州，我州但有断头将军，无降将军也。飞壮而释之，引为宾客。《三国志·张飞传》《华阳国志》",
    quote: "我州但有断头将军，无降将军也。",
    appear: [213, 219], impact: 3
  },

  "liu_xun": {
    id: "liu_xun", name: "刘循",
    birth: null, death: null, faction: "yi", roles: ["general"],
    stats: { lead: 62, war: 60, int: 55, pol: 52, cha: 55 },
    skills: [
      { id: "shou_luoxian", name: "守雒", kind: "passive",
        desc: "守雒城拒先主，被攻且一年不下，后嗣益州牧于秭归",
        mod: { citydef: 0.12, def: 0.06 }, tags: ["fortify", "guard"] }
    ],
    traits: ["刘璋之子", "守雒城一年", "史文作循"],
    bio: "刘璋之子。建安十八年先主进围雒城，璋子循守城，被攻且一年，张任、刘璝尝率精兵退与循共守；十九年夏雒城破。后刘璋降，先主以璋为益州牧，迁于南郡公安；孙权取荆州后以璋为益州牧，驻秭归，璋卒，子循嗣。《三国志·先主传》及《刘二牧传》裴注",
    quote: "时璋子循守城，被攻且一年。",
    appear: [213, 220], impact: 2
  },

  "leng_bao": {
    id: "leng_bao", name: "冷苞", aka: ["泠苞"],
    birth: null, death: null, faction: "yi", roles: ["general"],
    stats: { lead: 60, war: 66, int: 48, pol: 45, cha: 50 },
    skills: [
      { id: "ju_fu_bao", name: "拒涪", kind: "passive",
        desc: "与刘璝、张任、邓贤等拒先主于涪，皆破败，退保绵竹",
        mod: { def: 0.06, atk: 0.04 }, tags: ["guard"] }
    ],
    traits: ["刘璋部将", "拒先主于涪", "史或作泠苞"],
    bio: "刘璋部将。建安十八年先主自葭萌还攻刘璋，璋遣刘璝、冷苞、张任、邓贤等拒先主于涪，皆破败，退保绵竹；其后璋复遣李严督绵竹诸军，严率众降先主。史籍或作泠苞，事迹仅见于拒涪一役。《三国志·先主传》《华阳国志·二牧志》",
    quote: "皆破败，退保绵竹。",
    appear: [213, 214], impact: 1
  },

  "deng_xian": {
    id: "deng_xian", name: "邓贤",
    birth: null, death: null, faction: "yi", roles: ["general"],
    stats: { lead: 58, war: 64, int: 50, pol: 45, cha: 50 },
    skills: [
      { id: "ju_zhan", name: "拒战", kind: "passive",
        desc: "与冷苞等同拒先主于涪，战败退保绵竹，其后无闻",
        mod: { def: 0.06 }, tags: ["guard"] }
    ],
    traits: ["刘璋部将", "涪城拒战", "其后无闻"],
    bio: "刘璋部将。建安十八年先主与黄忠、卓膺进据涪城，璋遣刘璝、冷苞、张任、邓贤等拒先主于涪，皆破败，退保绵竹。其后事迹不详，唯见于《三国志·先主传》与《华阳国志·二牧志》所载拒战诸将之列。",
    quote: "璋遣刘璝、冷苞、张任、邓贤等拒先主于涪。",
    appear: [213, 214], impact: 1
  },

  "dong_he": {
    id: "dong_he", name: "董和", zi: "幼宰",
    birth: null, death: null, faction: "yi", roles: ["minister"],
    stats: { lead: 48, war: 40, int: 78, pol: 82, cha: 74 },
    skills: [
      { id: "lv_jian", name: "率俭", kind: "aura",
        desc: "为成都令，躬率以俭、恶衣蔬食，蜀土奢侈之风为改",
        mod: { food: 3, gold: 60 }, tags: ["logistics", "ritual"] }
    ],
    traits: ["南郡枝江人", "掌军中郎将", "与诸葛亮并署府事"],
    bio: "字幼宰，南郡枝江人，其先本巴郡江州人。汉末率宗族西迁，益州牧刘璋以为牛鞞长、江原长、成都令。蜀土富实，时俗奢侈，货殖之家侯服玉食、婚丧倾家，和躬率以俭，恶衣蔬食，防遏逾僭，所在皆移风变善。先主定蜀，征为掌军中郎将，与诸葛亮并署左将军大司马府事，居官二十余年卒。《三国志·董和传》",
    quote: "献可替否，共为欢交。",
    appear: [194, 221], impact: 3
  },

  "wang_lei": {
    id: "wang_lei", name: "王累",
    birth: null, death: null, faction: "yi", roles: ["minister"],
    stats: { lead: 35, war: 40, int: 66, pol: 68, cha: 70 },
    skills: [
      { id: "si_jian", name: "死谏", kind: "passive",
        desc: "倒悬于州门以谏迎先主，不听，乃自刎以明不可",
        mod: { def: 0.08, morale: 5 }, tags: ["ritual", "guard"] }
    ],
    traits: ["广汉人", "州从事", "死谏刘璋"],
    bio: "广汉人（《华阳国志》作新都人），益州从事。建安十六年璋听张松之议遣法正迎先主，主簿黄权陈其利害，累为从事，以谏不入，自倒悬于州门以谏，璋一无所纳。华阳国志称其自刎州门以明不可，蜀人哀之，列于益州死节之士。《三国志·刘二牧传》《华阳国志·先贤士女》",
    quote: "以谏不入，乃自刎州门。",
    appear: [211, 212], impact: 2
  },

  "zheng_du": {
    id: "zheng_du", name: "郑度",
    birth: null, death: null, faction: "yi", roles: ["minister"],
    stats: { lead: 40, war: 38, int: 74, pol: 70, cha: 58 },
    skills: [
      { id: "jian_bi", name: "坚壁清野", kind: "passive",
        desc: "劝刘璋尽驱巴西梓潼民、烧野谷以困客军，璋不能用",
        mod: { food: 3, citydef: 0.06 }, tags: ["logistics", "insight"] }
    ],
    traits: ["广汉人", "州从事", "计不见用"],
    bio: "广汉人，益州从事。建安十八年先主自葭萌南还攻成都，郑度说刘璋曰左将军悬军袭我，兵不满万，士众未附，野谷是资，军无辎重，莫若尽驱巴西、梓潼之民内于涪水以西，焚烧野谷，坚壁清野，不过百日必自走。先主闻而恶之，以问法正，正曰璋终不能用。璋果谓此计不可行，度策遂寝。《三国志·法正传》",
    quote: "尽驱巴西、梓潼民内涪水以西。",
    appear: [212, 214], impact: 2
  },

  "huang_chong": {
    id: "huang_chong", name: "黄崇",
    birth: null, death: 263, faction: "yi", roles: ["minister"],
    stats: { lead: 55, war: 60, int: 70, pol: 66, cha: 66 },
    skills: [
      { id: "ju_xian_chong", name: "据险", kind: "passive",
        desc: "劝诸葛瞻速行据险，无令敌军入平，瞻犹豫不用，遂死战",
        mod: { def: 0.08, vision: 1 }, tags: ["insight", "guard"] }
    ],
    traits: ["巴西阆中人", "黄权之子", "绵竹死事"],
    bio: "巴西阆中人，镇北将军黄权之子，蜀汉尚书郎。景耀六年邓艾入阴平，后主遣都护诸葛瞻督诸军拒之，瞻至涪不进，崇劝瞻速行据险，无令敌得入平地，瞻犹豫不用。崇乃帅厉军士，期于必死，临阵见杀。父权仕魏至车骑将军，而崇为蜀死事，史称其父子各尽其节。《三国志·黄权传》《华阳国志·后主志》",
    quote: "宜速行据险，无令敌得入平地。",
    appear: [258, 263], impact: 2
  },

  /* ===================== 刘表（荆州） jing ===================== */

  "liu_biao": {
    id: "liu_biao", name: "刘表", zi: "景升", aka: ["刘景升", "刘荆州"],
    birth: 142, death: 208, faction: "jing", roles: ["lord"],
    stats: { lead: 68, war: 50, int: 78, pol: 80, cha: 84 },
    skills: [
      { id: "ba_jun", name: "八俊", kind: "aura",
        desc: "少知名号八俊，长八尺余姿貌甚伟，单马入宜城而收荆土",
        mod: { morale: 4, recruit: 0.06 }, tags: ["rally", "scholar"] },
      { id: "kai_xue", name: "开立学官", kind: "passive",
        desc: "开立学官博求儒士，使綦毋闓宋忠撰五经章句谓之后定",
        mod: { xp: 0.10, vision: 1 }, tags: ["scholar", "insight"] }
    ],
    traits: ["山阳高平人", "荆州牧", "成武侯", "坐保江汉"],
    bio: "字景升，山阳高平人，少知名号八俊。初平元年代王叡为荆州刺史，单马入宜城，用蒯良、蒯越、蔡瑁之谋诱诛宗贼渠帅，南收零桂，北据汉川，带甲十余万。开立学官，使綦毋闓、宋忠撰五经章句，谓之后定。官渡之役许袁绍而不至，欲保江汉观变。建安十三年病死。《三国志·刘表传》",
    quote: "济以穷来，主人无礼。",
    appear: [190, 208], impact: 4
  },

  "liu_qi": {
    id: "liu_qi", name: "刘琦",
    birth: null, death: 209, faction: "jing", roles: ["general"],
    stats: { lead: 55, war: 58, int: 62, pol: 60, cha: 70 },
    skills: [
      { id: "jiang_xia", name: "镇守江夏", kind: "passive",
        desc: "出镇江夏，合战士不下万人，为先主赤壁拒曹之助",
        mod: { def: 0.06, recruit: 0.05 }, tags: ["guard", "naval"] }
    ],
    traits: ["刘表长子", "江夏太守", "为蔡氏所构"],
    bio: "刘表长子，以貌类父见爱，后为后妻蔡氏及蔡瑁、张允所构，出为江夏太守。尝与琅邪诸葛亮共升高楼、令去梯问自安之术，亮答以申生在内而危、重耳在外而安。赤壁之役合江夏战士与先主并力，先主表为荆州刺史，南征四郡。建安十四年卒。《三国志·刘表传》《先主传》",
    appear: [196, 209], impact: 2
  },

  "liu_cong": {
    id: "liu_cong", name: "刘琮",
    birth: null, death: null, faction: "jing", roles: ["lord"],
    stats: { lead: 30, war: 28, int: 50, pol: 55, cha: 58 },
    skills: [
      { id: "ju_zhou", name: "举州归命", kind: "passive",
        desc: "蒯越韩嵩傅巽劝降，举全楚之地归命，免江汉兵革之祸",
        mod: { citydef: 0.08, morale: 3 }, tags: ["fortify", "rally"] }
    ],
    traits: ["刘表少子", "蔡张之党", "举荆州降"],
    bio: "刘表少子。表与后妻蔡氏爱琮，蔡瑁、张允为之支党，遂出长子琦而奉琮为嗣。建安十三年曹操南征，蒯越、韩嵩、傅巽等说琮以逆顺强弱之势归降，琮举州请降，先主走夏口。王威请以奇兵徼操于险，琮不纳。操以为青州刺史，封列侯，后表为谏议大夫。《三国志·刘表传》",
    appear: [208, 215], impact: 2
  },

  "liu_pan": {
    id: "liu_pan", name: "刘磐",
    birth: null, death: null, faction: "jing", roles: ["general"],
    stats: { lead: 60, war: 72, int: 45, pol: 42, cha: 58 },
    skills: [
      { id: "kou_lue", name: "数为寇钞", kind: "active", cd: 3, dur: 1,
        desc: "数为寇于艾、西安诸县，孙策分六县置都尉以拒之",
        mod: { atk: 0.10, move: 1 }, tags: ["raiding", "pursue"] }
    ],
    traits: ["刘表从子", "守长沙攸县", "骁勇善寇"],
    bio: "刘表从子，骁勇。与中郎将黄忠共守长沙攸县，数为寇于艾、西安诸县。孙策分海昬、建昌左右六县，以太史慈为建昌都尉，并督诸将拒之，磐乃绝迹不复为寇。《三国志·太史慈传》《黄忠传》",
    appear: [200, 208], impact: 2
  },

  "kuai_liang": {
    id: "kuai_liang", name: "蒯良",
    birth: null, death: null, faction: "jing", roles: ["strategist"],
    stats: { lead: 40, war: 35, int: 76, pol: 74, cha: 70 },
    skills: [
      { id: "ren_yi", name: "仁义之对", kind: "passive",
        desc: "众不附者仁不足，劝刘表行仁义以收江汉人心",
        mod: { recruit: 0.07, morale: 4 }, tags: ["rally", "scholar"] }
    ],
    traits: ["中庐人", "刘表谋主", "劝行仁义"],
    bio: "中庐人。刘表单马入宜城，良与蒯越、蔡瑁共预谋画。良以仁义为对，谓众不附者仁不足、附而不治者义不足，苟仁义之道行，百姓归之如水之趋下；表顾而问越，越陈权谋之策，遂诱宗贼渠帅并其众。《三国志·刘表传》裴注引司马彪《战略》",
    appear: [190, 208], impact: 2
  },

  "kuai_yue": {
    id: "kuai_yue", name: "蒯越", zi: "异度", aka: ["蒯异度"],
    birth: null, death: 214, faction: "jing", roles: ["strategist"],
    stats: { lead: 55, war: 50, int: 85, pol: 80, cha: 72 },
    skills: [
      { id: "shen_zhong", name: "深中足智", kind: "passive",
        desc: "深中足智，诱诛宗贼渠帅，佐刘表平定荆土而表以强大",
        mod: { atk: 0.08, vision: 2 }, tags: ["insight", "ambush"] },
      { id: "quan_jiang", name: "劝降", kind: "active", cd: 5, dur: 2,
        desc: "建安十三年说刘琮举州归太祖，蒯越等侯者十五人",
        mod: { citydef: 0.10, food: 2 }, tags: ["insight", "logistics"] }
    ],
    traits: ["南郡中庐人", "章陵太守", "樊亭侯"],
    bio: "字异度，南郡中庐人，蒯通之后，深中足智，魁杰有雄姿。大将军何进辟为东曹掾，劝进诛诸阉官，进不能用，求出为汝阳令。佐刘表诱诛宗贼、平定境内，拜章陵太守，封樊亭侯。荆州平，曹操与荀彧书曰不喜得荆州、喜得蒯异度耳，以为光禄勋。建安十九年卒。《三国志·刘表传》裴注引《傅子》",
    quote: "不喜得荆州，喜得蒯异度耳。",
    appear: [188, 214], impact: 3
  },

  "cai_mao": {
    id: "cai_mao", name: "蔡瑁",
    birth: null, death: null, faction: "jing", roles: ["general"],
    stats: { lead: 58, war: 62, int: 55, pol: 58, cha: 60 },
    skills: [
      { id: "zhuan_jiang", name: "专断荆政", kind: "active", cd: 5, dur: 2,
        desc: "表病时与张允同遏刘琦于户外，使不得见父，琮嗣遂定",
        mod: { citydef: 0.10, morale: 3 }, tags: ["fortify", "guard"] }
    ],
    traits: ["襄阳人", "刘表妻弟", "琮之支党"],
    bio: "襄阳人，刘表后妻蔡氏之弟，得幸于表，与表外甥张允同为少子琮之支党，遂构长子琦而出之为江夏太守。建安十三年表病，琦还省疾，瑁、允恐其父子相感更有托后之意，乃遏于户外使不得见，琦流涕而去，众闻而伤之。琮降曹操，瑁入魏。《三国志·刘表传》裴注引《典论》",
    appear: [190, 208], impact: 2
  },

  "zhang_yun": {
    id: "zhang_yun", name: "张允",
    birth: null, death: null, faction: "jing", roles: ["general"],
    stats: { lead: 55, war: 60, int: 52, pol: 55, cha: 56 },
    skills: [
      { id: "e_qi", name: "遏琦", kind: "passive",
        desc: "与蔡瑁专断荆州之政，遏刘琦于户外，众闻而伤之",
        mod: { def: 0.08, morale: -2 }, tags: ["fortify", "dread"] }
    ],
    traits: ["刘表外甥", "得幸于表", "睦于刘琮"],
    bio: "刘表外甥，与妻弟蔡瑁并得幸于表，又睦于少子琮，并为琮之支党。建安十三年表病，长子琦还省疾，允与瑁恐表父子相感更有托后之意，乃遏琦于户外，琦流涕而去。荆州平，从琮降曹操。《三国志·刘表传》裴注引《典论》《后汉书·刘表传》",
    appear: [195, 208], impact: 2
  },

  "huang_zu": {
    id: "huang_zu", name: "黄祖",
    birth: null, death: 208, faction: "jing", roles: ["general"],
    stats: { lead: 62, war: 65, int: 48, pol: 50, cha: 45 },
    skills: [
      { id: "xia_kou", name: "镇江夏", kind: "passive",
        desc: "镇江夏夏口为刘表东藩，数与孙氏舟师相拒于沔口",
        mod: { watermove: 1, def: 0.07 }, tags: ["naval", "fortify"] },
      { id: "an_she", name: "暗射", kind: "active", cd: 6, dur: 1,
        desc: "岘山之役军士从竹木间暗射，孙坚中箭应时殒命",
        mod: { atk: 0.12, range: 1 }, tags: ["ambush", "archer"] }
    ],
    traits: ["江夏太守", "屯夏口", "射杀孙坚"],
    bio: "刘表将，为江夏太守，屯夏口。初平三年袁术使孙坚征荆州，表遣黄祖逆于樊邓之间，祖军士射杀坚于岘山。孙策、孙权嗣业，屡以父仇西伐，祖数败。建安十三年孙权复征江夏，破其舟军，屠其城，追斩祖，枭首以祭孙坚。《三国志·孙破虏传》《吴主传》",
    appear: [191, 208], impact: 3
  },

  "han_song": {
    id: "han_song", name: "韩嵩", zi: "德高",
    birth: null, death: null, faction: "jing", roles: ["minister"],
    stats: { lead: 40, war: 35, int: 76, pol: 78, cha: 72 },
    skills: [
      { id: "zheng_jian", name: "正谏", kind: "passive",
        desc: "表郊祀天地，嵩正谏不从，渐见违忤而不改其节",
        mod: { vision: 2, morale: 3 }, tags: ["insight", "ritual"] }
    ],
    traits: ["义阳人", "刘表别驾", "大鸿胪"],
    bio: "字德高，义阳人。少好学，贫不改操，知世将乱，隐居郦西山中。黄巾起，避难南方，刘表逼以为别驾。表郊祀天地，嵩正谏不从。奉使诣许，天子拜侍中、迁零陵太守，还称朝廷之德，表以为怀贰，陈兵欲斩之，蔡氏谏乃止，遂囚之。荆州平，曹操释囚，拜大鸿胪。《三国志·刘表传》裴注引《先贤行状》",
    quote: "将军负嵩，嵩不负将军。",
    appear: [190, 208], impact: 2
  },

  "liu_xian": {
    id: "liu_xian", name: "刘先", zi: "始宗",
    birth: null, death: null, faction: "jing", roles: ["minister"],
    stats: { lead: 42, war: 35, int: 78, pol: 80, cha: 70 },
    skills: [
      { id: "bo_xue", name: "博学强记", kind: "passive",
        desc: "博学强记，明习汉家典故，尤好黄老之言，时人称之",
        mod: { xp: 0.08, vision: 2 }, tags: ["scholar", "insight"] }
    ],
    traits: ["零陵人", "刘表别驾", "入魏尚书令"],
    bio: "字始宗，零陵人。博学强记，尤好黄老之言，明习汉家典故。为刘表别驾，与从事中郎韩嵩共说表，谓豪桀并争、两雄相持，天下之重在将军，宜择所从，表不能用。建安十三年荆州平，曹操以为尚书令。《三国志·刘表传》裴注引《零陵先贤传》",
    appear: [195, 215], impact: 2
  },

  "fu_xun": {
    id: "fu_xun", name: "傅巽", zi: "公悌",
    birth: null, death: null, faction: "jing", roles: ["minister"],
    stats: { lead: 40, war: 35, int: 82, pol: 76, cha: 74 },
    skills: [
      { id: "zhi_ren", name: "知人之鉴", kind: "passive",
        desc: "有知人鉴，目庞统为半英雄，谓魏讽必反卒如其言",
        mod: { vision: 3, xp: 0.06 }, tags: ["insight"] },
      { id: "shuo_cong", name: "说琮归降", kind: "active", cd: 5, dur: 2,
        desc: "说刘琮以逆顺强弱之势，举全楚归降，赐爵关内侯",
        mod: { citydef: 0.10, food: 3 }, tags: ["insight", "logistics"] }
    ],
    traits: ["瓌伟博达", "刘表东曹掾", "关内侯"],
    bio: "字公悌，瓌伟博达，有知人之鉴。辟公府，拜尚书郎，后客荆州，为刘表东曹掾。建安十三年与蒯越、韩嵩同说刘琮举州归降，以功赐爵关内侯。入魏，黄初为侍中，太和中卒。尝目庞统为半英雄、证裴潜终以清行显，又谓魏讽必反，卒如其言。《三国志·刘表传》裴注引《傅子》",
    appear: [200, 208], impact: 2
  },

  "wang_can": {
    id: "wang_can", name: "王粲", zi: "仲宣", aka: ["王仲宣"],
    birth: 177, death: 217, faction: "jing", roles: ["minister"],
    stats: { lead: 30, war: 25, int: 82, pol: 74, cha: 78 },
    skills: [
      { id: "deng_lou", name: "登楼之赋", kind: "passive",
        desc: "作登楼赋与从军诗，为建安七子之冠冕，长于辞赋",
        mod: { xp: 0.10, morale: 4 }, tags: ["scholar"] },
      { id: "quan_cong", name: "劝琮归命", kind: "active", cd: 5, dur: 2,
        desc: "刘表卒，粲劝刘琮归太祖，辟为丞相掾赐爵关内侯",
        mod: { citydef: 0.08, gold: 40 }, tags: ["insight", "logistics"] }
    ],
    traits: ["山阳高平人", "建安七子", "侍中典制度"],
    bio: "字仲宣，山阳高平人。曾祖父龚、祖父畅皆为汉三公。献帝西迁，粲徙长安，后之荆州依刘表，表以粲貌寝体弱通侻，不甚重之。表卒，粲劝刘琮归曹操，操辟为丞相掾，赐爵关内侯，迁军谋祭酒，拜侍中，与卫觊并典制度。建安二十二年道病卒，年四十一，为建安七子之冠。《三国志·王粲传》",
    quote: "从军有苦乐，但问所从谁。",
    appear: [196, 217], impact: 3
  },

  "zhang_xian": {
    id: "zhang_xian", name: "张羡",
    birth: null, death: null, faction: "jing", roles: ["general"],
    stats: { lead: 58, war: 55, int: 55, pol: 62, cha: 66 },
    skills: [
      { id: "de_min", name: "得江湘心", kind: "passive",
        desc: "先为零陵桂阳长，甚得江湘间心，三郡并举以叛表",
        mod: { recruit: 0.10, morale: 5 }, tags: ["rally", "logistics"] }
    ],
    traits: ["南阳人", "长沙太守", "率三郡叛表"],
    bio: "南阳人。先为零陵、桂阳长，甚得江湘间民心，然性屈强不顺，刘表薄其为人，不甚礼遇，羡由是怀恨。建安三年以长沙太守率零陵、桂阳三郡叛表，表遣兵攻围，连年不下，羡病死。长沙复立其子怿，表遂攻并之，南收零、桂，北据汉川，地方数千里。《三国志·刘表传》裴注引《英雄记》",
    appear: [190, 200], impact: 2
  },

  /* ===================== 张鲁（汉中·五斗米道） hanzhong ===================== */

  "zhang_lu": {
    id: "zhang_lu", name: "张鲁", zi: "公祺", aka: ["师君", "张公祺"],
    birth: null, death: null, faction: "hanzhong", roles: ["lord"],
    stats: { lead: 72, war: 60, int: 74, pol: 78, cha: 88 },
    skills: [
      { id: "gui_dao", name: "鬼道教民", kind: "aura",
        desc: "以鬼道教民自号师君，祭酒为理，犯法者三原而后刑",
        mod: { recruit: 0.12, morale: 6 }, tags: ["ritual", "rally"] },
      { id: "yi_she", name: "义舍义米", kind: "passive",
        desc: "作义舍置义米肉，行路者量腹取足，民夷便乐之",
        mod: { food: 4, heal: 0.06 }, tags: ["logistics", "fortify"] }
    ],
    traits: ["沛国丰人", "五斗米道", "镇南将军", "阆中侯"],
    bio: "字公祺，沛国丰人。祖父陵客蜀，从受道者出五斗米，世号米贼。刘焉以鲁为督义司马，使与张脩击汉中太守苏固，鲁袭杀脩并其众。璋以鲁不顺尽杀其母家室，鲁遂据汉中，以鬼道教民，自号师君，雄据巴汉垂三十年。建安二十年曹操破阳平，鲁封藏府库而降，拜镇南将军，封阆中侯。《三国志·张鲁传》",
    quote: "宁为曹公作奴，不为刘备上客。",
    appear: [184, 216], impact: 4
  },

  "zhang_wei": {
    id: "zhang_wei", name: "张卫",
    birth: null, death: null, faction: "hanzhong", roles: ["general"],
    stats: { lead: 70, war: 74, int: 62, pol: 55, cha: 60 },
    skills: [
      { id: "heng_shan", name: "横山筑城", kind: "passive",
        desc: "横山筑阳平城十余里，据关坚守，王师攻之不能拔",
        mod: { citydef: 0.12, def: 0.08 }, tags: ["fortify", "guard"] }
    ],
    traits: ["张鲁之弟", "阳平守将", "拒关不降"],
    bio: "张鲁之弟。建安二十年曹操自散关出武都征鲁，鲁欲举汉中降，卫不肯，率众数万拒阳平关坚守，横山筑城十余里，王师攻之不能拔。曹操引军还，前军夜迷，误入卫别营，营中大惊退散，遂进兵攻卫，卫等夜遁，鲁溃奔巴中。《三国志·张鲁传》《后汉书·刘焉传》",
    appear: [196, 215], impact: 2
  },

  "yan_pu": {
    id: "yan_pu", name: "阎圃",
    birth: null, death: null, faction: "hanzhong", roles: ["strategist"],
    stats: { lead: 45, war: 40, int: 80, pol: 76, cha: 70 },
    skills: [
      { id: "jian_wang", name: "谏勿称王", kind: "passive",
        desc: "谏张鲁勿称汉宁王，谓承制署置已足斩断，勿为祸先",
        mod: { citydef: 0.08, vision: 2 }, tags: ["insight", "ritual"] },
      { id: "yi_ba", name: "劝依巴中", kind: "active", cd: 6, dur: 2,
        desc: "鲁败说其依巴中而后委质，功必多，鲁乃奔南山",
        mod: { def: 0.10, vision: 2 }, tags: ["insight", "fortify"] }
    ],
    traits: ["巴西人", "张鲁功曹", "谏止称王"],
    bio: "巴西人，张鲁功曹。鲁有地中得玉印者，群下欲尊为汉宁王，圃谏曰汉川之民户出十万、四面险固，上匡天子则为桓文，次及窦融不失富贵，今承制署置已足斩断，不烦于王，勿为祸先，鲁从之。鲁败，圃又说鲁且依巴中然后委质，功必多，鲁乃奔南山。曹操封圃为列侯。《三国志·张鲁传》",
    appear: [196, 215], impact: 2
  },

  "yang_ang": {
    id: "yang_ang", name: "杨昂",
    birth: null, death: null, faction: "hanzhong", roles: ["general"],
    stats: { lead: 66, war: 72, int: 55, pol: 45, cha: 52 },
    skills: [
      { id: "zhu_chao", name: "助超围城", kind: "passive",
        desc: "将兵助马超围冀城，凡万余人，城陷杀刺史韦康",
        mod: { atk: 0.10, siege: 0.08 }, tags: ["siege", "pursue"] },
      { id: "you_jun", name: "诱峻共守", kind: "active", cd: 4, dur: 2,
        desc: "诱葭萌守将霍峻共守城，峻拒之曰头可得城不可得",
        mod: { vision: 3 }, tags: ["insight", "ambush"] }
    ],
    traits: ["张鲁大将", "据阳平关", "数短马超"],
    bio: "张鲁大将。建安十六年马超率羌胡攻陇上，鲁遣昂将兵助之，凡万余人围冀城，城陷，昂杀凉州刺史韦康。先主入蜀，鲁遣昂诱葭萌守将霍峻求共守城，峻曰人头可得、城不可得，昂乃退。昂等又数短马超之能，超内怀于邑，遂奔氐中归先主。《三国志·张鲁传》《霍峻传》",
    appear: [211, 215], impact: 2
  },

  "yang_ren": {
    id: "yang_ren", name: "杨任",
    birth: null, death: 215, faction: "hanzhong", roles: ["general"],
    stats: { lead: 64, war: 70, int: 52, pol: 45, cha: 55 },
    skills: [
      { id: "shou_guan", name: "据守阳平", kind: "passive",
        desc: "与张卫杨昂据阳平关，横山筑城，王师攻之不能拔",
        mod: { citydef: 0.10, def: 0.06 }, tags: ["fortify", "guard"] }
    ],
    traits: ["张鲁将", "守阳平关", "夜袭见斩"],
    bio: "张鲁将。建安二十年与张卫、杨昂等据阳平关，横山筑城十余里。曹操攻之不能拔，引军而还，贼见大军退，守备解散，操乃密遣将士乘险夜袭，大破之，遂斩任。《三国志·张鲁传》《武帝纪》",
    appear: [211, 215], impact: 2
  },

  "li_xiu": {
    id: "li_xiu", name: "李休", zi: "子朗",
    birth: null, death: null, faction: "hanzhong", roles: ["minister"],
    stats: { lead: 42, war: 40, int: 74, pol: 72, cha: 66 },
    skills: [
      { id: "quan_jin", name: "劝鲁举号", kind: "passive",
        desc: "见张鲁精兵数万有四塞之固，劝其举号，鲁不听从",
        mod: { gold: 30, recruit: 0.05 }, tags: ["insight", "logistics"] }
    ],
    traits: ["字子朗", "张鲁司马", "关内侯"],
    bio: "字子朗，有智略。张鲁为镇北将军时休为司马，家南郑。汉中有甘露降，休见鲁精兵数万、四塞之固，遂建言赤气久衰、黄家当兴，欲鲁举号，鲁不听。鲁破，曹操以其劝鲁内附，赐爵关内侯，署散官骑从，诣邺。黄初中历上党、钜鹿二郡太守，后年老还拜议郎。《三国志》卷九裴注引《魏略》",
    appear: [196, 215], impact: 1
  }

};
