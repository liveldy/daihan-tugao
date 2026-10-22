/* 《代汉涂高》 — 择主
 * 十五家可择之君，依其立身之同异，析为六组：
 *   匡鼎炎汉 / 霸府挟令 / 乱世枭雄 / 边地雄踞 / 江东虎踞 / 苍天已死
 * 每组之下为「条目」（十五家），条目之下为「君主」（二十六主）。
 */
(function (root) {
  'use strict';

  var GROUPS = [
    {
      id: 'kuangding', name: '匡鼎炎汉', seal: '漢',
      motto: '鼎之轻重，未可问也；炎汉之祚，犹在人心。',
      desc: '汉室血胤与宗亲州牧。名分在我，而兵甲在人；欲续四百年之祚，必先自立于强藩之间。此组开局名望最厚、正统最正，然受制于豪强与积弊，最难速成。',
      color: '#b8352c'
    },
    {
      id: 'bafu', name: '霸府挟令', seal: '霸',
      motto: '挟天子以令诸侯，奉辞伐罪，虽逆而顺。',
      desc: '据中枢而以朝廷之名行征伐之实。起于权臣，成于制度：屯田以足食，唯才以聚人，九品以定品，都督以驭军。此组内政与制度最强，然名不正则言不顺，终须面对「代汉」二字。',
      color: '#2f4f78'
    },
    {
      id: 'xiaoxiong', name: '乱世枭雄', seal: '雄',
      motto: '兵强者亡，兵弱者亦亡；唯知机者能制人而不制于人。',
      desc: '以凉州劲卒、四世门第、传国之玺取天下。武断而速，盛极而骤衰。此组开局兵势最盛、扩张最速，然内政粗疏、人心不附，须以雷霆手段掩饰根本之弱。',
      color: '#8a6b2f'
    },
    {
      id: 'biandi', name: '边地雄踞', seal: '邊',
      motto: '四塞之固，可以自守；守之既久，亦可进取。',
      desc: '辽东、凉州、汉中、宛洛，皆边地也。地险、民朴、兵悍，而户口单薄、士人罕至。此组攻守皆可，然不能持久，须以奇制胜，或以险自全。',
      color: '#7a5c9e'
    },
    {
      id: 'jiangdong', name: '江东虎踞', seal: '江',
      motto: '长江天堑，楼船千里；守江必守淮，守淮必取荆。',
      desc: '孙氏三世，以江东宗部与山越之众立国。水军无敌，江淮可守；然北伐步骑为短，且将相世袭、猜忌渐生。此组最善防守与持久，成在团结，败在猜忌。',
      color: '#a33b2e'
    },
    {
      id: 'cangtian', name: '苍天已死', seal: '黃',
      motto: '苍天已死，黄天当立；岁在甲子，天下大吉。',
      desc: '太平道以符水咒说疗病、以善道教化，十余年间徒众数十万，青徐幽冀荆扬兖豫八州之人莫不毕应。此组起于流民，征募最易、锋锐最盛，然器甲不备、粮秣无根，士人不至、名分不正——太平之道，可以燎原，不可以持久。',
      color: '#b8862b'
    }
  ];

  /* 条目：玩家在择主界面看到的十四张牌 */
  var ENTRIES = [
    {
      id: 'E_XIAN', group: 'kuangding', lords: ['xian'],
      name: '刘协', sub: '汉献帝',
      blurb: '天子在许，号令不出宫门。所恃者，衣带中一纸诏书与天下未泯之人心。',
      trick: '天子诏书：每六回合可下一道诏书——或令二藩罢兵，或号召天下共讨一贼，或征辟在野名士。诏书之效，全系于汉室威望之存亡。',
      tags: ['正统', '外交', '极难']
    },
    {
      id: 'E_LIU', group: 'kuangding', lords: ['liubei', 'liushan'],
      name: '刘备 · 刘禅', sub: '昭烈帝／后主',
      blurb: '先主起于织席贩履，以信义收人；后主承之于危难，守成而已。',
      trick: '仁义之名：招降敌军将士十有九成，城池归附所需时间减半；然府库常空，赋税收入恒低于同数城池之势力，且兵员补充迟滞。',
      tags: ['信义', '招降', '困窘']
    },
    {
      id: 'E_LIUYAN', group: 'kuangding', lords: ['liuyan', 'liuzhang'],
      name: '刘焉 · 刘璋', sub: '益州牧',
      blurb: '以「废史立牧」自家始，据天府之土；父子二十余年，终不能北顾。',
      trick: '天府之资：益州诸郡粮产加倍，城池极难被煽动叛乱；然「守成」之习使军队出境作战士气低落、移动力下降。',
      tags: ['天府', '守成', '富庶']
    },
    {
      id: 'E_LIUBIAO', group: 'kuangding', lords: ['liubiao'],
      name: '刘表', sub: '荆州牧',
      blurb: '单骑入宜城，结蒯蔡而定江汉。坐拥带甲十余万，而终不能有所为。',
      trick: '江汉士林：荆州文臣辐辏，治下城池治安与民心为天下冠，每回合额外获得人才与粮草；然骑兵羸弱，且晚年诸子相争，继承人需尽早确立。',
      tags: ['文治', '人才', '骑弱']
    },
    {
      id: 'E_CAO', group: 'bafu', lords: ['caocao', 'caopi', 'caorui'],
      name: '曹操 · 曹丕 · 曹叡', sub: '魏武／文／明',
      blurb: '奉天子、行屯田、下三令；以谯沛武人与颍川谋士为骨，以制度驭天下。',
      trick: '唯才是举：每回合可从在野之士中征辟一人，不辨门第；屯田使粮产增三成。代价是天性多疑——名望越高，麾下名士忠诚越难维持满值。',
      tags: ['制度', '屯田', '唯才']
    },
    {
      id: 'E_SIMA', group: 'bafu', lords: ['simayi', 'simazhao'],
      name: '司马懿 · 司马昭', sub: '宣王／文王',
      blurb: '受遗二主，佐命三朝。忍于十年，发于一旦。',
      trick: '隐忍之谋：开局面于「魏」之内，不可主动对外宣战直至第 N 回合（N 由剧本定）；期间可以「密谋」策反敌方城池守将，代价为大量金帛与时间。',
      tags: ['隐忍', '策反', '权臣']
    },
    {
      id: 'E_DONG', group: 'xiaoxiong', lords: ['dongzhuo'],
      name: '董卓', sub: '太师·郿侯',
      blurb: '凉州武人入洛，废立由己。其兵最劲，其名最恶。',
      trick: '凉州劲兵：开局兵甲冠绝天下，重骑与羌胡骑战力极强；然地狱之开局——天下皆敌，外交无法改善，且每回合有将佐离心之险。',
      tags: ['劲兵', '天下共讨', '内叛']
    },
    {
      id: 'E_YUANSHAO', group: 'xiaoxiong', lords: ['yuanshao'],
      name: '袁绍', sub: '邺侯·大将军',
      blurb: '四世三公，门生故吏遍天下。河北四州，甲兵十万。',
      trick: '四世三公：开局占据河北富庶四州，人才云集；然而「外宽内忌，好谋无决」——每回合有概率发生部曲相争，且继承之事必须尽早处置，否则诸子分裂。',
      tags: ['门第', '开局最强', '内争']
    },
    {
      id: 'E_YUANSHU', group: 'xiaoxiong', lords: ['yuanshu'],
      name: '袁术', sub: '仲家皇帝',
      blurb: '得传国玺于井中，遂以为天命在己。江亭败后，欲求一杯蜜浆而不可得。',
      trick: '传国之玺：威望与金帛收入极高，可厚赂诸侯；然一旦僭号，全图势力皆可讨之，且盟友永不复附。',
      tags: ['僭号', '富而孤', '众叛']
    },
    {
      id: 'E_ZHANGJIAO', group: 'cangtian', lords: ['zhangjiao'],
      name: '张角', sub: '大贤良师·天公将军',
      blurb: '钜鹿人，奉事黄老道，以符水咒说疗病，十余年间徒众数十万。中平元年，三十六方同日并起，八州震动——汉家四百年，自此不复。',
      trick: '太平道：流民争附，征募之费极廉，部曲锋锐无前；然器甲不备、防守为弱，府库与粮秣岁入俱薄，士人不至，名分不正——众心可以燎原，亦可以一夕溃散。',
      tags: ['流民', '锋锐', '无根']
    },
    {
      id: 'E_GONGSUN', group: 'biandi', lords: ['gongsundu', 'gongsunkang', 'gongsunyuan'],
      name: '公孙度 · 公孙康 · 公孙渊', sub: '辽东太守／燕王',
      blurb: '越海收东莱，西击乌桓，南抚三韩。于汉祚将绝之际，海上别开一局。',
      trick: '辽东偏安：襄平、乐浪等边郡易守难攻，海路贸易使金帛收入极高；然户口稀少，兵源恢复慢，一旦被围则外援断绝。',
      tags: ['海贸', '偏安', '兵少']
    },
    {
      id: 'E_MATENG', group: 'biandi', lords: ['mateng'],
      name: '马腾', sub: '征西将军·槐里侯',
      blurb: '凉州羌胡与汉兵杂处，人马皆持矛，来如风雨。',
      trick: '西凉铁骑：骑兵与骑射单位攻防俱增，平原冲锋可连击；然凉州贫瘠，粮草常年不足，且韩遂与之同床异梦。',
      tags: ['铁骑', '缺粮', '内隙']
    },
    {
      id: 'E_ZHANGXIU', group: 'biandi', lords: ['zhangxiu'],
      name: '张绣', sub: '宣威侯',
      blurb: '宛城一夕，杀曹操之子、典韦；复从贾诩之劝，归命于曹。',
      trick: '宛城精卒：兵数极少而素质极高，守城与反击威力加倍；开局与曹操势同水火，须在刘表与曹操之间求生。',
      tags: ['精兵', '夹缝', '少而悍']
    },
    {
      id: 'E_ZHANGLU', group: 'biandi', lords: ['zhanglu'],
      name: '张鲁', sub: '师君·镇南将军',
      blurb: '以鬼道教民，立义舍，置义米肉。政教合一，据汉中三十年。',
      trick: '义舍：每回合额外获得粮草与民心，城池几无叛乱，伤兵自动恢复；然排斥儒士，难以招揽外部名臣，且人口有限。',
      tags: ['政教', '自足', '闭塞']
    },
    {
      id: 'E_SUN', group: 'jiangdong', lords: ['sunjian', 'sunce', 'sunquan', 'sunxiu', 'sunhao'],
      name: '孙坚 · 孙策 · 孙权 · 孙休 · 孙皓', sub: '武烈／长沙桓王／大／景／归命侯',
      blurb: '猛虎起于长沙，伯符定江东，仲谋鼎足称帝，子烈除权臣而图治。',
      trick: '江东水军：水军与楼船战力甲天下，长江以南守城加成极强；然步骑北出乏力，且宗室与旧将世代相承，猜忌一起则自坏长城。',
      tags: ['水军', '守江', '猜忌']
    }
  ];

  /* 君主：真正的游戏起点 */
  var LORDS = {
    zhangjiao: {
      key: 'zhangjiao', name: '张角', title: '大贤良师·天公将军', era: 'e184',
      group: 'cangtian',
      faction: 'huangjin', capital: 'julu', year: 184, difficulty: 4, difficultyName: '燎原',
      tag: '太平道', mech: 'taiping',
      goal: '苍天已死，黄天当立；使天下无复苛政，无人复饿而死。',
      intro: '钜鹿人，本不知其所从来。奉事黄老道，畜养弟子，以符水咒说疗病，病者颇愈，百姓信向之。十余年间，徒众数十万，自青徐幽冀荆扬兖豫八州之人，莫不毕应。遂置三十六方，大方万余人，小方六七千，各立渠帅，约以甲子之日内外俱起——中平元年三月，马元义方至洛阳，而弟子唐周上书告变。事泄，不得不早举。',
      start: ['julu', 'runan', 'wan', 'shangdang']
    },
    xian: {
      key: 'xian', name: '刘协', zi: '伯和', title: '汉献帝', reign: '建安', era: 'e194',
      faction: 'han', capital: 'changan', year: 194, difficulty: 5, difficultyName: '逆天',
      tag: '天子之诏', mech: 'zhaoshu',
      goal: '重振汉室，亲总万机，复洛阳之旧都。',
      intro: '中平六年，董卓入洛，废兄辩而立协，时年九岁。此后长安板荡、李傕郭汜相攻，天子之尊，至于露宿于野。兴平元年，车驾在长安，四方贡赋尽为凉州兵所夺。所恃者，唯汉室四百年之名分耳。',
      start: ['changan', 'hongnong']
    },
    liubei: {
      key: 'liubei', name: '刘备', zi: '玄德', title: '左将军·豫州牧', era: 'e208',
      faction: 'shu', capital: 'xinye', year: 208, difficulty: 4, difficultyName: '履险',
      tag: '仁义之名', mech: 'renyi',
      goal: '兴复汉室，还于旧都。',
      intro: '涿郡涿县人，孝景帝子中山靖王之后。少孤家贫，与母贩履织席。讨黄巾起家，徐州得而旋失，依吕布、依曹操、依袁绍、依刘表，髀肉复生而功业不就。建安十三年，屯于新野，曹操已平河北、临江汉——四十七岁，几无寸土。',
      start: ['xinye']
    },
    liushan: {
      key: 'liushan', name: '刘禅', zi: '公嗣', title: '后主', reign: '建兴·延熙', era: 'e228',
      faction: 'shu', capital: 'chengdu', year: 228, difficulty: 3, difficultyName: '守成',
      tag: '政由葛氏', mech: 'renyi',
      goal: '继先帝之志，全蜀汉之土。',
      intro: '建安二十四年生于荆州，先主崩于永安，年十七即位，托孤于诸葛亮。建兴六年，丞相出祁山，三郡响应而街亭失守。政无巨细，咸决于亮；宫中府中，俱为一体——后主于是年，二十四岁。',
      start: ['chengdu', 'hanzhong', 'jiange', 'jiameng', 'zitong', 'mianzhu', 'luoxian', 'jiangzhou', 'yongan', 'jianning', 'dianchi']
    },
    liuyan: {
      key: 'liuyan', name: '刘焉', zi: '君郎', title: '益州牧·阳城侯', era: 'e189',
      faction: 'yi', capital: 'mianzhu', year: 189, difficulty: 3, difficultyName: '经营',
      tag: '废史立牧', mech: 'tianfu',
      goal: '据蜀自守，避世之难，徐观天下之变。',
      intro: '江夏竟陵人，鲁恭王之后。以宗室历官州郡，目睹王室多故，乃建议「废史立牧」，以重臣镇四方——此法一出，天下州牧皆拥兵自专，而刘焉自领益州牧。中平六年，天下大乱，益州独安。',
      start: ['mianzhu', 'chengdu', 'luoxian', 'zitong', 'jiameng', 'jiange', 'jiangzhou', 'yongan', 'jianning', 'dianchi']
    },
    liuzhang: {
      key: 'liuzhang', name: '刘璋', zi: '季玉', title: '益州牧', era: 'e208',
      faction: 'yi', capital: 'chengdu', year: 208, difficulty: 3, difficultyName: '守成',
      tag: '暗弱', mech: 'tianfu',
      goal: '保境安民，不失先人之业。',
      intro: '兴平元年继父之任，赵韪以「宽仁」立之，而不知其暗弱。张鲁骄恣，遂杀其母弟；曹操临荆州，遣张松入许而不能用。建安十三年，益州承平，户口百万，而人心已思得明主。',
      start: ['chengdu', 'luoxian', 'mianzhu', 'zitong', 'jiameng', 'jiange', 'jiangzhou', 'yongan', 'jianning', 'dianchi', 'hanzhong']
    },
    liubiao: {
      key: 'liubiao', name: '刘表', zi: '景升', title: '镇南将军·荆州牧·成武侯', era: 'e194',
      faction: 'jing', capital: 'xiangyang', year: 194, difficulty: 3, difficultyName: '文治',
      tag: '江汉士林', mech: 'jianghan',
      goal: '据江汉以观变，奉汉室之正朔。',
      intro: '山阳高平人，鲁恭王之后，与同郡张俭等号「八顾」。初平元年单骑入宜城，说蒯良、蒯越、蔡瑁而定荆州，遂领州牧。爱民养士，学者归之；然坐拥带甲十余万，西不能救刘璋，北不能拒曹操，天下笑其「自守之贼」。',
      start: ['xiangyang', 'fancheng', 'jiangling', 'jiangxia', 'changsha', 'wuling', 'lingling', 'guiyang']
    },
    caocao: {
      key: 'caocao', name: '曹操', zi: '孟德', title: '司空·行车骑将军', era: 'e199',
      faction: 'wei', capital: 'xuchang', year: 199, difficulty: 4, difficultyName: '制霸',
      tag: '奉天子以令', mech: 'weicai',
      goal: '荡平群雄，混一宇内，使天下无孤。',
      intro: '沛国谯人，父嵩为宦官养子。年二十举孝廉为郎，历洛阳北部尉、济南相。初平元年散家财、合义兵，收青州黄巾三十万众，建安元年奉迎天子都许，行屯田、下求贤令。建安四年，袁绍简精卒十万、骑万匹，将攻许。',
      start: ['xuchang', 'qiao', 'chenliu', 'puyang', 'juancheng', 'hongnong', 'luoyang', 'hefei', 'guangling', 'linzi']
    },
    caopi: {
      key: 'caopi', name: '曹丕', zi: '子桓', title: '魏文帝', reign: '黄初', era: 'e220',
      faction: 'wei', capital: 'luoyang', year: 220, difficulty: 3, difficultyName: '建国',
      tag: '九品中正', mech: 'jiupin',
      goal: '绍续先王之业，成一统之制。',
      intro: '建安二十二年立为魏太子，二十五年嗣位，同年受禅于繁阳，改元黄初。乃立九品官人之法，复太学，定历法。而三路伐吴无功，江陵、濡须皆为敌所拒。黄初七年崩于洛阳，年四十。',
      start: ['luoyang', 'xuchang', 'ye', 'changan', 'xuchang', 'hfei', 'hefei', 'shouchun', 'chengdu2']
    },
    caorui: {
      key: 'caorui', name: '曹叡', zi: '元仲', title: '魏明帝', reign: '太和·青龙·景初', era: 'e228',
      faction: 'wei', capital: 'luoyang', year: 228, difficulty: 3, difficultyName: '御敌',
      tag: '总揽威柄', mech: 'jiupin',
      goal: '内修法度，外拒二敌，以保魏室之祚。',
      intro: '甄氏所生，黄初七年即位，年二十二。诸葛亮出祁山，三郡响应，而使张郃拒之；孙权攻合肥，亲征而却之。性刚明，喜举法，宫室之役与四征之师并起，民力渐疲。',
      start: ['luoyang', 'xuchang', 'ye', 'changan', 'hefei', 'shouchun', 'wan', 'xiangyang', 'jiangling']
    },
    simayi: {
      key: 'simayi', name: '司马懿', zi: '仲达', title: '骠骑将军·都督荆豫', era: 'e228',
      faction: 'jin', capital: 'wan', year: 228, difficulty: 5, difficultyName: '潜谋',
      tag: '隐忍', mech: 'yinxren',
      goal: '受遗二主，佐命三朝；成天下之务，不在旦夕。',
      intro: '河内温县人，少有奇节，博学洽闻。曹操强征为文学掾，累迁至军司马；魏文帝以为抚军大将军，明帝以为骠骑将军、都督荆豫。建兴六年，帝遣其屯宛，督诸军拒诸葛亮。魏之栋梁，而腹心之疾，亦在此人。',
      start: ['wan', 'xinye']
    },
    simazhao: {
      key: 'simazhao', name: '司马昭', zi: '子上', title: '大将军·录尚书事', era: 'e255',
      faction: 'jin', capital: 'luoyang', year: 255, difficulty: 4, difficultyName: '代魏',
      tag: '司马昭之心', mech: 'yinxren',
      goal: '成父兄之业，取魏而代之。',
      intro: '正元二年，司马师卒于许昌，昭自洛阳往赴，遂继掌魏政。淮南毌丘俭、文钦举兵，诸葛诞继之，三叛相踵。而昭之心，路人所知——去代汉者当涂高，其在此乎。',
      start: ['luoyang', 'ye', 'changan', 'hefei', 'shouchun', 'wan', 'xiangyang', 'jiangling']
    },
    dongzhuo: {
      key: 'dongzhuo', name: '董卓', zi: '仲颖', title: '前将军·太师·郿侯', era: 'e189',
      faction: 'dong', capital: 'luoyang', year: 189, difficulty: 4, difficultyName: '肆暴',
      tag: '凉州劲兵', mech: 'liangzhou',
      goal: '以兵威制天下，使诸侯不敢仰视。',
      intro: '陇西临洮人，为凉州豪帅，以破羌胡、讨黄巾累迁至前将军。中平六年，何进召外兵入洛诛宦官，卓未至而进死，遂总兵入京，废少帝、立陈留王，专断朝政。时其麾下凉州精骑，天下莫当。',
      start: ['luoyang', 'changan', 'tongguan', 'hongnong', 'chencang', 'anding', 'tianshui', 'longxi', 'jincheng', 'xiping', 'gudu', 'zhangye', 'dunhuang']
    },
    yuanshao: {
      key: 'yuanshao', name: '袁绍', zi: '本初', title: '冀州牧·邺侯', era: 'e194',
      faction: 'yuan', capital: 'ye', year: 194, difficulty: 3, difficultyName: '雄踞',
      tag: '四世三公', mech: 'sishi',
      goal: '南据河，北阻燕代，兼戎狄之众，南向以争天下。',
      intro: '汝南汝阳人，司空袁汤之孙。四世居三公位，门生故吏遍天下。初平元年为关东盟主，未战而诸侯解体；后取冀州于韩馥，破公孙瓒于界桥，遂兼幽冀青并四州，众十余万。',
      start: ['ye', 'julu', 'changshan', 'xindu', 'nanpi', 'pingyuan', 'ji', 'zhuojun', 'yuyang', 'youbeiping', 'liaoxi']
    },
    yuanshu: {
      key: 'yuanshu', name: '袁术', zi: '公路', title: '后将军·阳翟侯', reign: '仲家', era: 'e194',
      faction: 'zhong', capital: 'shouchun', year: 194, difficulty: 4, difficultyName: '僭越',
      tag: '传国之玺', mech: 'chuanguo',
      goal: '以袁氏之望、传国之玺，代汉而兴。',
      intro: '袁绍之从弟。少以侠气闻，举孝廉，历官河南尹、虎贲中郎将。初平元年与袁绍同时举兵，而兄弟交恶；后据南阳，夺孙坚所获传国玺于其妻。兴平元年，扬州之众皆附，遂有僭号之志。',
      start: ['wan', 'runan', 'shouchun']
    },
    gongsundu: {
      key: 'gongsundu', name: '公孙度', zi: '升济', title: '辽东太守·永宁乡侯', era: 'e189',
      faction: 'liaodong', capital: 'xiangping', year: 189, difficulty: 3, difficultyName: '偏安',
      tag: '辽东偏安', mech: 'liaodong',
      goal: '于海东别开局面，使中原之乱不及辽东。',
      intro: '辽东襄平人，父为玄菟小吏，避吏居玄菟。同郡徐荣为董卓所亲，荐度为辽东太守。到郡而诛襄平豪族百余家，东伐高句丽，西击乌桓，南越海收东莱诸县，辽东遂为一方。',
      start: ['xiangping', 'liaodong', 'xuantu', 'lelang']
    },
    gongsunkang: {
      key: 'gongsunkang', name: '公孙康', zi: null, title: '辽东太守·襄平侯', era: 'e208',
      faction: 'liaodong', capital: 'xiangping', year: 208, difficulty: 4, difficultyName: '择主',
      tag: '辽东偏安', mech: 'liaodong',
      goal: '内实辽东，外观中原之变，择其可归者归之。',
      intro: '公孙度之长子。建安十二年，曹操破乌桓于白狼山，袁尚、袁熙奔辽东，或劝曹操穷追，操曰「吾方使康斩送尚、熙首」。康果斩之，函首以献。又东破高句丽，分屯有县以南荒地为带方郡——汉四郡之遗，复立于海东。',
      start: ['xiangping', 'liaodong', 'xuantu', 'lelang', 'liaoxi', 'youbeiping']
    },
    gongsunyuan: {
      key: 'gongsunyuan', name: '公孙渊', zi: null, title: '辽东太守·燕王', era: 'e228',
      faction: 'liaodong', capital: 'xiangping', year: 228, difficulty: 5, difficultyName: '险棋',
      tag: '辽东偏安', mech: 'liaodong',
      goal: '于魏吴之间左右其手，成一家之业。',
      intro: '公孙度之孙、公孙康之子。夺其叔公孙恭之位而自立，魏以为扬烈将军、辽东太守。既而南通孙权，受吴之封；又以魏兵将至，斩吴使张弥、许晏，尽没其兵资。两端之策，终不能久。',
      start: ['xiangping', 'liaodong', 'xuantu', 'lelang']
    },
    mateng: {
      key: 'mateng', name: '马腾', zi: '寿成', title: '征西将军·槐里侯', era: 'e194',
      faction: 'liang', capital: 'gudu', year: 194, difficulty: 4, difficultyName: '夺陇',
      tag: '西凉铁骑', mech: 'xiliang',
      goal: '以凉州之众东向三辅，据关中以争天下。',
      intro: '扶风茂陵人，其父为天水兰干尉，失官留陇西，与羌女通而生腾。家贫无妻，常从羌人求，故其众皆羌胡，来如风雨。讨氐羌之乱起家，与韩遂结为异姓兄弟，后转相仇杀，复相安数年。',
      start: ['gudu', 'jincheng', 'xiping', 'zhangye', 'dunhuang', 'juyan', 'wudu']
    },
    zhangxiu: {
      key: 'zhangxiu', name: '张绣', zi: null, title: '建忠将军·宣威侯', era: 'e199',
      faction: 'wan', capital: 'wan', year: 199, difficulty: 5, difficultyName: '求生',
      tag: '宛城精卒', mech: 'wancheng',
      goal: '于曹刘之间求一隅之存，全族而已。',
      intro: '武威祖厉人，骠骑将军张济之族子。济死于穰城，绣领其众，屯宛，与刘表合。建安二年，曹操南征，绣降而复叛，夜袭曹营，杀曹昂、曹安民及校尉典韦。建安四年，从贾诩之劝，再降于操——时人皆以为耻，而诩曰「此乃所以为全身之计也」。',
      start: ['wan']
    },
    zhanglu: {
      key: 'zhanglu', name: '张鲁', zi: '公祺', title: '师君·镇民中郎将·汉宁太守', era: 'e194',
      faction: 'hanzhong', capital: 'hanzhong', year: 194, difficulty: 3, difficultyName: '自守',
      tag: '义舍', mech: 'yishe',
      goal: '保巴汉之民，行师君之教，使境内无怨。',
      intro: '沛国丰人，张良之后。祖陵、父衡传五斗米道，益州、汉中多信之。初平二年，杀汉中太守张修而领其众，据汉中。以鬼道教民，病者自首其过，立义舍、置义米肉，不置长吏，皆以祭酒为治。汉以为镇民中郎将，领汉宁太守，通贡献而已。',
      start: ['hanzhong', 'yangping']
    },
    sunjian: {
      key: 'sunjian', name: '孙坚', zi: '文台', title: '破虏将军·长沙太守·乌程侯', era: 'e189',
      faction: 'wu', capital: 'changsha', year: 189, difficulty: 4, difficultyName: '猛锐',
      tag: '江东猛虎', mech: 'jiangdong',
      goal: '讨逆讨贼，以军功自致于通侯。',
      intro: '吴郡富春人，孙武之后。少为县吏，年十七以单刀逐海贼而知名。从朱儁讨黄巾，拜别部司马；凉州边章、韩遂作乱，议者欲讨之，坚独陈征伐之利。中平四年，长沙区星反，坚为长沙太守，旬月而定。',
      start: ['changsha', 'guiyang', 'lingling']
    },
    sunce: {
      key: 'sunce', name: '孙策', zi: '伯符', title: '讨逆将军·吴侯', era: 'e194',
      faction: 'wu', capital: 'lujiang', year: 194, difficulty: 4, difficultyName: '创业',
      tag: '江东小霸王', mech: 'jiangdong',
      goal: '借兵渡江，尽有江东，为父报仇，以观中原。',
      intro: '孙坚长子。坚死时策年十七，葬父于曲阿，渡江居舒，结纳周瑜、张纮。初平四年，以玉玺质于袁术，借得父之旧部千余人、骑数十匹，遂渡江，尽得江东之地。时年二十一。',
      start: ['lujiang']
    },
    sunquan: {
      key: 'sunquan', name: '孙权', zi: '仲谋', title: '讨虏将军·会稽太守', reign: '黄龙·赤乌', era: 'e208',
      faction: 'wu', capital: 'jianye', year: 208, difficulty: 3, difficultyName: '鼎足',
      tag: '江东水军', mech: 'jiangdong',
      goal: '保江东，观成败；竟长江所极，据而有之。',
      intro: '孙策之弟。建安五年策卒，年十九，张昭、周瑜以为「可与共成大业」，遂拥立之。建安十三年，曹操率水陆大军临江，吴中皆惧，独鲁肃、周瑜主战，遂与刘备合，大破操于赤壁。',
      start: ['jianye', 'wu', 'kuaiji', 'jianan', 'danyang', 'yuzhang', 'poyang', 'chaisang', 'lujiang', 'jiangxia']
    },
    sunxiu: {
      key: 'sunxiu', name: '孙休', zi: '子烈', title: '吴景帝', reign: '永安', era: 'e255',
      faction: 'wu', capital: 'jianye', year: 255, difficulty: 3, difficultyName: '除权',
      tag: '江东水军', mech: 'jiangdong',
      goal: '除权臣、复国柄，使江东复振。',
      intro: '孙权第六子，太平三年孙綝废孙亮而立之。即位之明年，与张布、丁奉密谋诛綝。好读书，欲立五经博士、置学官以教子弟；然三国之势已定，虽欲有为，力不能及。',
      start: ['jianye', 'wu', 'kuaiji', 'jianan', 'danyang', 'yuzhang', 'poyang', 'chaisang', 'lujiang']
    },
    sunhao: {
      key: 'sunhao', name: '孙皓', zi: '元宗', title: '乌程侯·吴末帝', reign: '元兴·甘露·宝鼎·建衡·凤凰·天册·天玺·天纪', era: 'e264',
      group: 'jiangdong',
      faction: 'wu', capital: 'jianye', year: 264, difficulty: 5, difficultyName: '残照',
      tag: '江东水军', mech: 'jiangdong',
      goal: '据长江之险，全吴会之土；纵不能混一，亦不使江东先亡。',
      intro: '孙权之孙、废太子和之子，字元宗，一名彭祖，字皓宗。永安元年封乌程侯，就国于乌程。永安七年（264）七月景帝孙休崩，太子幼弱，而蜀汉新亡、交趾携叛，吴人震惧，贪得长君；左典军万彧尝为乌程令，与皓相善，称其才识明断，是长沙桓王之畴，屡言于丞相濮阳兴、左将军张布，遂迎立之。初立发优诏、开仓廪、出宫女，当时翕然称为明主；未几即诛兴、布，其后骄暴多忌，好酒色、信巫觋，徙都武昌，滥刑忠良——江东之祚，自此入于末路。',
      start: ['jianye', 'wu', 'kuaiji', 'jianan', 'danyang', 'yuzhang', 'poyang', 'chaisang', 'lujiang',
        'jiangling', 'jiangxia', 'changsha', 'wuling', 'lingling', 'guiyang',
        'nanhai', 'cangwu', 'longbian', 'jiaozhi']
    }
  };

  /* 势力特有机制说明（引擎读 mech 字段实现） */
  var MECHS = {
    zhaoshu:  { name: '天子之诏', desc: '每六回合可下一道诏书：令二藩罢兵、号召共讨一贼、或征辟在野之士。诏书消耗威望，威望尽则汉祚之望亦尽。' },
    taiping:  { name: '太平道', desc: '以符水咒说疗病、以善道教化，流民争附：征募之费极廉，部曲攻锐无前；然器甲不备、防守为弱，府库与粮秣岁入俱薄，士人不至、名分不正，久战则众心易散。' },
    renyi:    { name: '仁义之名', desc: '招降敌军将士几无不从，新附城池安定极快；然赋税常薄、募兵迟滞，每回合金粮收入减一成五，补员减两成。' },
    tianfu:   { name: '天府之资', desc: '益州诸郡粮产加倍，城池叛乱概率极低；然军队出境作战士气减一，移动力减一。' },
    jianghan: { name: '江汉士林', desc: '每两回合免费获得一名在野文士与粮草，治下城池民心极稳；然骑兵攻防减一成五。' },
    weicai:   { name: '唯才是举', desc: '每两回合可从在野之士中征辟一人，不问门第；屯田使粮产增三成。' },
    jiupin:   { name: '九品中正', desc: '治下城池岁入增两成，武将忠诚不易下降；然非世家出身之人才渐稀。' },
    yinxren:  { name: '隐忍之谋', desc: '开局面于旧主之内，前若干回合不可主动宣战；期间可密谋策反敌方城池，代价为大量金帛。' },
    liangzhou:{ name: '凉州劲兵', desc: '开局兵甲冠绝天下，重骑与羌胡骑攻防俱增；然天下皆敌，外交不可改善，每回合有将佐离心之险。' },
    sishi:    { name: '四世三公', desc: '开局据河北四州，人才云集，每回合自动获得一名人才；然部曲相争，每若干回合有内争之患。' },
    chuanguo: { name: '传国之玺', desc: '威望与金帛收入极高，可厚赂诸侯；然一旦僭号，全图势力皆可讨之，盟约永不复固。' },
    liaodong: { name: '辽东偏安', desc: '边郡易守难攻，海路贸易使金帛收入增五成；然户口稀少，兵员恢复极慢。' },
    xiliang:  { name: '西凉铁骑', desc: '骑兵与骑射单位攻防增两成，平原冲锋有连击之效；然凉州贫瘠，粮草常年不足。' },
    wancheng: { name: '宛城精卒', desc: '兵数少而素质高，守城与反击威力加倍；然四周皆强敌，容错极低。' },
    yishe:    { name: '义舍', desc: '每回合额外获得粮草与民心，城池几无叛乱，伤兵自动恢复；然排斥儒士，难以招揽外部名臣。' },
    jiangdong:{ name: '江东水军', desc: '水军战力甲天下，长江以南城池守城加成极大；然步骑北出乏力，宗室猜忌一起则自坏长城。' }
  };

  // 修正笔误：曹丕、曹叡的起始城池
  if (LORDS.caopi.start.indexOf('chengdu2') >= 0) { LORDS.caopi.start.splice(LORDS.caopi.start.indexOf('chengdu2'), 1); }
  LORDS.caopi.start = ['luoyang', 'xuchang', 'ye', 'changan', 'hefei', 'shouchun', 'wan', 'jiangling', 'xiangyang'];

  var ENTRY_INDEX = {};
  ENTRIES.forEach(function (e) { ENTRY_INDEX[e.id] = e; });

  root.FACTIONS_DATA = { GROUPS: GROUPS, ENTRIES: ENTRIES, LORDS: LORDS, MECHS: MECHS, ENTRY_INDEX: ENTRY_INDEX };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.FACTIONS_DATA; }
})(typeof window !== 'undefined' ? window : globalThis);
