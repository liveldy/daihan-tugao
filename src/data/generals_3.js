window.GENERALS_PART3 = {
  "sun_jian": {
    id: "sun_jian",
    name: "孙坚",
    zi: "文台",
    aka: ["孙破虏", "乌程侯"],
    birth: 155,
    death: 192,
    faction: "wu",
    roles: ["lord"],
    stats: { lead: 88, war: 90, int: 70, pol: 62, cha: 80 },
    skills: [
      { id: "gujun_fenji", name: "孤军发迹", kind: "passive", desc: "讨黄巾于宛、邓，破董卓于阳人，攻城野战，身被创夷。", mod: { atk: 0.12, morale: 4 }, tags: ["rally"] },
      { id: "jueshi_wuliu", name: "决机无留", kind: "active", cd: 3, dur: 2, desc: "围襄阳，单马行岘山，部曲闻变犹力战不退，军服其勇决。", mod: { atk: 0.18, move: 1 }, tags: ["pursue"] }
    ],
    traits: ["勇挚刚毅", "锐意功名", "善抚士卒"],
    bio: "吴郡富春人。中平元年从朱儁讨黄巾，又从张温讨边章、韩遂；为长沙太守，讨平区星，封乌程侯。讨董卓时破卓军于阳人，入洛阳扫除汉室陵庙，平塞卓所发掘。初平三年击刘表，围襄阳，单马行岘山，为黄祖军士射杀。（《三国志·孙破虏传》）",
    quote: "勇挚刚毅，孤微发迹",
    appear: [184, 192],
    impact: 5
  },
  "sun_ce": {
    id: "sun_ce",
    name: "孙策",
    zi: "伯符",
    aka: ["孙讨逆", "吴侯"],
    birth: 175,
    death: 200,
    faction: "wu",
    roles: ["lord"],
    stats: { lead: 92, war: 92, int: 76, pol: 72, cha: 92 },
    skills: [
      { id: "zhuandou_qianli", name: "转斗千里", kind: "passive", desc: "以袁术部曲渡江，数年间破刘繇、王朗，军令整肃，百姓怀之。", mod: { atk: 0.14, recruit: 0.12 }, tags: ["rally"] },
      { id: "jueshi_liangzhen", name: "决机两阵", kind: "active", cd: 4, dur: 2, desc: "与太史慈战于神亭，挺身独斗，既得慈，收其才而用之。", mod: { atk: 0.18, move: 1 }, tags: ["pursue"] }
    ],
    traits: ["美姿颜", "好笑语", "性阔达听受", "善于用人"],
    bio: "孙坚长子。初依袁术，术屡失信，策乃以袁术部曲渡江，破刘繇、王朗、严白虎，数年间平定吴、会、丹杨。建安三年受封吴侯，后与曹操通好，讨袁术、击刘勋、禽黄祖。建安五年为故吴郡太守许贡门客所伤，创甚而卒，年二十六。陈寿评其「英气杰济，猛锐冠世」。",
    quote: "使术有子如孙郎，死复何恨",
    appear: [190, 200],
    impact: 5
  },
  "sun_quan": {
    id: "sun_quan",
    name: "孙权",
    zi: "仲谋",
    aka: ["吴大帝", "讨虏将军"],
    birth: 182,
    death: 252,
    faction: "wu",
    roles: ["lord"],
    stats: { lead: 84, war: 70, int: 88, pol: 90, cha: 92 },
    skills: [
      { id: "renren_zhiming", name: "任人之明", kind: "aura", desc: "拔吕蒙于戎行，识潘濬于系虏，江东人才之盛由此。", mod: { atk: 0.08, morale: 5 }, tags: ["insight"] },
      { id: "jushou_daixin", name: "据守待衅", kind: "active", cd: 4, dur: 3, desc: "赤壁拒曹操、夷陵拒刘备，皆以持重待敌之敝而后动。", mod: { def: 0.18, citydef: 0.12 }, tags: ["fortify"] }
    ],
    traits: ["屈身忍辱", "任才尚计", "性多嫌忌", "好大喜功"],
    bio: "孙策之弟。建安五年兄卒，以讨虏将军领会稽太守，赤壁破曹操，夷陵拒刘备，黄龙元年称帝于武昌，旋迁都建业。嘉禾中遣将浮海求夷洲、亶洲，得不补失。晚年二宫构争，太子和被废，国本以伤。神凤元年卒，年七十一，谥大皇帝，庙号太祖。",
    quote: "生子当如孙仲谋",
    appear: [196, 252],
    impact: 5
  },
  "sun_xiu": {
    id: "sun_xiu",
    name: "孙休",
    zi: "子烈",
    aka: ["景皇帝", "琅邪王"],
    birth: 235,
    death: 264,
    faction: "wu",
    roles: ["lord"],
    stats: { lead: 62, war: 58, int: 80, pol: 78, cha: 74 },
    skills: [
      { id: "ruiyi_dianji", name: "锐意典籍", kind: "passive", desc: "欲毕览百家之言，与博士韦曜、盛冲讲论道艺，尤好射雉。", mod: { xp: 0.12, morale: 4 }, tags: ["scholar"] },
      { id: "zhuchen_dingluan", name: "腊会诛綝", kind: "active", cd: 5, dur: 1, desc: "永安元年腊会，从丁奉之谋，伏兵斩孙綝，夷其三族。", mod: { atk: 0.15, morale: 8 }, tags: ["ambush"] }
    ],
    traits: ["好学不倦", "好射雉", "明断有威", "受制旧恩"],
    bio: "孙权第六子，年十三从中书郎射慈、郎中盛冲受学，初封琅邪王，居会稽。孙綝废孙亮，遣宗正孙楷等迎立之。永安元年腊会，与丁奉、张布定计斩綝，夷三族，下诏改葬诸葛恪、滕胤、吕据诸人，召还远徙者。七年七月薨，年三十，谥景皇帝。",
    quote: "孤之涉学，群书略遍",
    appear: [252, 264],
    impact: 4
  },
  "sun_liang": {
    id: "sun_liang",
    name: "孙亮",
    zi: "子明",
    aka: ["会稽王", "侯官侯"],
    birth: 243,
    death: 260,
    faction: "wu",
    roles: ["lord"],
    stats: { lead: 48, war: 44, int: 72, pol: 55, cha: 60 },
    skills: [
      { id: "congcha_shuhui", name: "聪察少慧", kind: "passive", desc: "慧解过人，尝辨蜜中鼠矢之伪，剖矢而中外俱湿，左右惊服。", mod: { vision: 2, xp: 0.08 }, tags: ["insight"] }
    ],
    traits: ["聪慧明察", "幼冲临国", "受制权臣"],
    bio: "孙权少子，母潘夫人。赤乌十三年立为太子，太元二年即位，年十岁，诸葛恪、孙峻、孙綝相继秉政。太平二年始亲政，三年与太常全尚、将军刘丞谋诛孙綝，事泄，綝以兵取尚，黜亮为会稽王，时年十六。永安三年黜为侯官侯，于道自杀。",
    quote: "若矢先在蜜中，中外当俱湿",
    appear: [252, 260],
    impact: 3
  },
  "sun_he": {
    id: "sun_he",
    name: "孙和",
    zi: "子孝",
    aka: ["南阳王", "文皇帝"],
    birth: 224,
    death: 253,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 60, war: 58, int: 78, pol: 76, cha: 80 },
    skills: [
      { id: "haoxue_xiashi", name: "好学下士", kind: "passive", desc: "讲校经义，咨访朝臣，考绩行能各有条贯，尊敬师傅。", mod: { xp: 0.12, morale: 5 }, tags: ["scholar"] },
      { id: "weibing_chizhong", name: "危事持重", kind: "passive", desc: "孙权潜军待魏，和忧其暴露，数上谏戒令持重务在全胜。", mod: { def: 0.08, heal: 0.1 }, tags: ["guard"] }
    ],
    traits: ["好学下士", "善骑射", "妃张氏同死"],
    bio: "孙权第三子，母琅邪王氏。赤乌五年立为太子，时年十九，以阚泽为太傅、薛综为少傅。全公主与其母有隙，日夜谮毁，赤乌十三年废为南阳王，徙故鄣。太元二年封南阳王，徙长沙；孙峻执政，夺其玺绶，徙新都，遣使赐死。孙皓即位，追谥文皇帝，改葬明陵。",
    quote: "吉凶当相随，终不独生活也",
    appear: [240, 253],
    impact: 3
  },
  "sun_jing": {
    id: "sun_jing",
    name: "孙静",
    zi: "幼台",
    aka: ["昭义中郎将"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 66, war: 64, int: 74, pol: 70, cha: 74 },
    skills: [
      { id: "jiuhe_zongzu", name: "纠合宗族", kind: "passive", desc: "孙坚始举事，静纠合乡曲及宗室五六百人以为保障。", mod: { recruit: 0.12, morale: 5 }, tags: ["rally"] },
      { id: "chadu_zhi_mou", name: "查渎之谋", kind: "active", cd: 3, dur: 1, desc: "说孙策循查渎道袭高迁屯，所谓攻其无备、出其不意。", mod: { atk: 0.15, move: 2 }, tags: ["ambush"] }
    ],
    traits: ["恋坟墓宗族", "不乐出仕", "谦退守家"],
    bio: "孙坚季弟。孙坚始举事，静纠合乡曲及宗室五六百人以为保障，众咸附焉。孙策攻会稽，王朗拒于固陵，数渡水战不能克，静说策从查渎道夜袭高迁屯，遂定会稽。策表拜静为奋武校尉，欲授重任，静恋坟墓宗族，求留镇守。孙权统事，就迁昭义中郎将，终于家。",
    quote: "静恋坟墓，不乐出仕",
    appear: [184, 210],
    impact: 2
  },
  "sun_ben": {
    id: "sun_ben",
    name: "孙贲",
    zi: "伯阳",
    aka: ["征虏将军"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 68, war: 70, int: 62, pol: 68, cha: 72 },
    skills: [
      { id: "fuyang_lingjiu", name: "摄帅余众", kind: "passive", desc: "孙坚薨，贲摄帅余众，扶送灵柩，抚育幼弟孙辅，友爱甚笃。", mod: { morale: 6, recruit: 0.08 }, tags: ["rally"] },
      { id: "yuzhang_shou", name: "在郡十一年", kind: "passive", desc: "为豫章太守十一年，拜征虏将军，领郡如故，郡境以安。", mod: { citydef: 0.1, food: 200 }, tags: ["logistics"] }
    ],
    traits: ["友爱其弟", "抚循余众", "守郡有绩"],
    bio: "孙坚同产兄孙羌之子。早失二亲，自赡育其弟孙辅。孙坚于长沙举义兵，贲去吏从征伐；坚薨，摄帅余众，扶送灵柩，后依袁术。袁术遣贲攻破九江太守周昂于阴陵，表贲领豫州刺史。孙策定江东，以贲为豫章太守，后拜征虏将军，领郡如故，在官十一年卒。",
    appear: [184, 209],
    impact: 2
  },
  "sun_fu": {
    id: "sun_fu",
    name: "孙辅",
    zi: "国仪",
    aka: ["平南将军"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 66, war: 68, int: 60, pol: 58, cha: 64 },
    skills: [
      { id: "xiandeng_podi", name: "先登破敌", kind: "passive", desc: "佐孙策平三郡，讨陵阳生得祖郎，从袭刘勋身先士卒。", mod: { atk: 0.12, move: 1 }, tags: ["pursue"] },
      { id: "tongshi_caogong", name: "私通北使", kind: "passive", desc: "遣使与曹操相闻，事觉为孙权幽系，数岁而卒，宗族以之自警。", mod: { def: -0.08, vision: 2 }, tags: ["insight"] }
    ],
    traits: ["果敢善战", "内不自安", "以疑见废"],
    bio: "孙贲之弟。以扬武校尉佐孙策平三郡，策讨丹杨七县，使辅西屯历阳以拒袁术，招诱余民，鸠合遗散；又讨陵阳，生得祖郎；从策西袭庐江太守刘勋，身先士卒有功。策立辅为庐陵太守，迁平南将军，假节领交州刺史。后遣使与曹操相闻，事觉，孙权幽系之，数岁卒。",
    appear: [194, 215],
    impact: 2
  },
  "sun_yi": {
    id: "sun_yi",
    name: "孙翊",
    zi: "叔弼",
    aka: ["丹杨太守"],
    birth: 184,
    death: 204,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 74, war: 82, int: 58, pol: 50, cha: 70 },
    skills: [
      { id: "xiaohan_guolie", name: "骁悍果烈", kind: "passive", desc: "有兄策之风，年二十以偏将军领丹杨太守，军士畏服。", mod: { atk: 0.14, morale: 4 }, tags: ["rally"] },
      { id: "lizhi_haozu", name: "礼致豪族", kind: "passive", desc: "礼致盛宪故吏妫览、戴员，任以兵柄，反为所谋。", mod: { recruit: 0.08, def: -0.06 }, tags: ["insight"] }
    ],
    traits: ["骁悍果烈", "有兄策风", "疏于防变"],
    bio: "孙坚第三子。骁悍果烈，有兄策之风。太守朱治举孝廉，以偏将军领丹杨太守，时年二十。孙权杀吴郡太守盛宪，宪故孝廉妫览、戴员亡匿山中，翊皆礼致之，览为大都督督兵，员为郡丞。后为左右边鸿所杀，览、员归罪杀鸿，据其军府，其妻徐氏设谋为夫报仇。（《三国志·宗室传》）",
    appear: [200, 204],
    impact: 3
  },
  "sun_kuang": {
    id: "sun_kuang",
    name: "孙匡",
    zi: "季佐",
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 40, war: 40, int: 56, pol: 54, cha: 58 },
    skills: [
      { id: "juxiao_weishi", name: "举孝廉茂才", kind: "passive", desc: "举孝廉、茂才，未及试用而卒，时年二十余，宗室惜之。", mod: { xp: 0.06, morale: 2 }, tags: ["scholar"] }
    ],
    traits: ["早卒", "未及试用", "事迹少传"],
    bio: "孙坚第四子，孙翊之弟。举孝廉、茂才，未及试用而卒，时年二十余。《江表传》载洞口之役有定武中郎将孙匡纵火损军事，裴松之辨其非匡：本传明言匡未试用而卒，且自孙坚之卒至洞口之役已三十一年，年二十余者不当尚在，其人盖孙权别生弟孙朗。（《三国志·宗室传》及裴注）",
    appear: [200, 212],
    impact: 1
  },
  "sun_lang": {
    id: "sun_lang",
    name: "孙朗",
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 50, war: 52, int: 56, pol: 46, cha: 44 },
    skills: [
      { id: "mingwei_jianlu", name: "名位见录", kind: "passive", desc: "名位见《三朝录》及虞喜《志林》，本传无专篇，事多湮晦。", mod: { vision: 1, xp: 0.05 }, tags: ["insight"] }
    ],
    traits: ["孙权庶弟", "事见别录", "洞口纵火"],
    bio: "孙权别生之弟（庶弟）。裴松之据《江表传》所载洞口之役定武中郎将纵火损军事，谓其人乃权别生弟朗，而非孙匡，并云朗之名位见《三朝录》及虞喜《志林》。其事见于魏黄初三年曹休出洞口、吕范御之一役。（《三国志·宗室传》裴注）",
    appear: [215, 235],
    impact: 1
  },
  "sun_shao": {
    id: "sun_shao",
    name: "孙韶",
    zi: "公礼",
    aka: ["镇北将军"],
    birth: 188,
    death: 241,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 76, war: 78, int: 68, pol: 70, cha: 74 },
    skills: [
      { id: "jingjiang_chihou", name: "警疆远斥候", kind: "passive", desc: "为边将数十年，警疆场远斥候，先知动静而为备，鲜有负败。", mod: { vision: 3, def: 0.1 }, tags: ["insight"] },
      { id: "shanyang_shizu", name: "善养士卒", kind: "aura", desc: "善养士卒得其死力，青徐汝沛颇来归附，淮南屯候彻兵远徙。", mod: { atk: 0.08, recruit: 0.1 }, tags: ["rally"] }
    ],
    traits: ["身长八尺", "仪貌都雅", "边将数十年"],
    bio: "本姓俞氏，伯父孙河为孙坚族子，出后姑俞氏，孙策爱之，赐姓为孙，列之属籍。孙翊遇害，河驰赴宛陵，为妫览、戴员所杀，韶年十七收河余众，缮治京城，起楼橹，修器备，孙权器之，拜承烈校尉。后为广陵太守、偏将军，权称尊号，为镇北将军，加领幽州牧、假节。赤乌四年卒。",
    appear: [203, 241],
    impact: 3
  },
  "sun_huan": {
    id: "sun_huan",
    name: "孙桓",
    zi: "叔武",
    aka: ["安东中郎将"],
    birth: 198,
    death: 223,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 72, war: 76, int: 66, pol: 62, cha: 70 },
    skills: [
      { id: "zongshi_yanyuan", name: "宗室颜渊", kind: "passive", desc: "博学强记，能论议应对，孙权常称为宗室颜渊。", mod: { xp: 0.1, morale: 4 }, tags: ["scholar"] },
      { id: "yidao_jubei", name: "夷道拒备", kind: "active", cd: 4, dur: 2, desc: "与陆逊共拒刘备于夷道，斩上夔道，截其径要。", mod: { def: 0.16, atk: 0.1 }, tags: ["fortify"] }
    ],
    traits: ["仪容端正", "博学强记", "果于赴敌"],
    bio: "孙河之子，孙权擢为武卫都尉，常称宗室颜渊。从讨关羽于华容，诱羽余党得五千人。年二十五拜安东中郎将，与陆逊共拒刘备，斩上夔道、截其径要，刘备逾山越险仅免，忿恚曰「吾昔初至京城，桓尚小儿，而今迫孤乃至此也」。以功拜建武将军，封丹徒侯，作横江坞，会卒。",
    quote: "吾昔初至京城，桓尚小儿",
    appear: [213, 223],
    impact: 3
  },
  "sun_yu": {
    id: "sun_yu",
    name: "孙瑜",
    zi: "仲异",
    aka: ["奋威将军"],
    birth: null,
    death: 215,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 74, war: 70, int: 74, pol: 70, cha: 72 },
    skills: [
      { id: "haoyue_fendian", name: "好乐坟典", kind: "passive", desc: "虽在戎旅，诵声不绝，立学官使将吏子弟数百人就受业。", mod: { xp: 0.12, morale: 4 }, tags: ["scholar"] },
      { id: "shuoquan_chizhong", name: "说权持重", kind: "passive", desc: "从拒曹操于濡须，瑜说权宜持重，权不从，军果无功。", mod: { def: 0.1, citydef: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["虚心绥抚", "好乐坟典", "立学官"],
    bio: "孙静次子。以恭义校尉始领兵众，时宾客诸将多江西人，瑜虚心绥抚，得其欢心。建安九年领丹杨太守，为众所附，至万余人，加绥远将军。十一年与周瑜共讨麻、保二屯，破之。后从拒曹操于濡须，说权持重。又以永安人饶助、无锡人颜连招纳庐江二郡，各得降附，立学官讲肄。年三十九，建安二十年卒。",
    appear: [196, 215],
    impact: 2
  },
  "sun_jiao": {
    id: "sun_jiao",
    name: "孙皎",
    zi: "叔朗",
    aka: ["都护征虏将军"],
    birth: null,
    death: 219,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 76, war: 74, int: 66, pol: 72, cha: 76 },
    skills: [
      { id: "qingcai_nengshi", name: "轻财能施", kind: "aura", desc: "轻财能施，善于交结，与诸葛瑾至厚，部曲莫不自尽。", mod: { atk: 0.08, morale: 6 }, tags: ["rally"] },
      { id: "buji_laoruo", name: "不击老弱", kind: "passive", desc: "下令所诛者曹氏，百姓何罪，自今不得击其老弱，江淮多附。", mod: { recruit: 0.12, citydef: 0.06 }, tags: ["logistics"] }
    ],
    traits: ["轻财能施", "善于交结", "与甘宁结厚"],
    bio: "孙静第三子。始拜护军校尉，领众二千余人，曹操数出濡须，皎每赴拒，号为精锐。迁都护征虏将军，代程普督夏口，赐沙羡、云社、南新市、竟陵为奉邑。尝以小故与甘宁忿争，孙权以书让之，皎上疏陈谢，遂与宁结厚。后从吕蒙禽关羽，定荆州，建安二十四年卒。",
    appear: [200, 219],
    impact: 2
  },
  "sun_huan_jiming": {
    id: "sun_huan_jiming",
    name: "孙奂",
    zi: "季明",
    aka: ["扬威将军"],
    birth: null,
    death: 235,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 72, war: 68, int: 62, pol: 66, cha: 72 },
    skills: [
      { id: "junchen_zhengqi", name: "军陈整齐", kind: "passive", desc: "黄武五年攻石阳，孙权驾过其军，叹治军诸将少能及者。", mod: { def: 0.1, morale: 5 }, tags: ["fortify"] },
      { id: "aile_rusheng", name: "爱乐儒生", kind: "passive", desc: "黄武中命部曲子弟就学，后仕进朝廷者数十人。", mod: { xp: 0.12, recruit: 0.06 }, tags: ["scholar"] }
    ],
    traits: ["讷于造次", "敏于当官", "爱乐儒生"],
    bio: "孙静第四子。兄孙皎卒，代统其众，以扬武中郎将领江夏太守，遵皎旧迹，礼刘靖、李允、吴硕、张梁及江夏闾举等，并纳其善。黄武五年孙权攻石阳，奂以地主，遣鲜于丹帅五千人先断淮道，自帅前锋降高城，得三将。权观其军陈整齐，叹曰「诸将少能及者」，拜扬威将军，封沙羡侯。年四十，嘉禾三年卒。",
    appear: [210, 235],
    impact: 2
  },
  "sun_jun": {
    id: "sun_jun",
    name: "孙峻",
    zi: "子远",
    aka: ["丞相大将军", "富春侯"],
    birth: 219,
    death: 256,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 62, war: 66, int: 70, pol: 54, cha: 40 },
    skills: [
      { id: "shou_yizhao", name: "受遗辅政", kind: "passive", desc: "孙权临薨，与诸葛恪同受遗诏辅政，领武卫将军，典宿卫。", mod: { def: 0.12, morale: 4 }, tags: ["guard"] },
      { id: "zhuke_zhuanquan", name: "坐中诛恪", kind: "active", cd: 4, dur: 2, desc: "与孙亮合谋，于坐中诛诸葛恪，迁丞相大将军，督中外诸军事。", mod: { atk: 0.15, morale: -4 }, tags: ["dread"] }
    ],
    traits: ["少便弓马", "精果胆决", "骄矜险害", "奸乱宫人"],
    bio: "孙坚弟孙静之曾孙。少便弓马，精果胆决，孙权末为武卫都尉、侍中，权临薨受遗辅政。既诛诸葛恪，迁丞相大将军，督中外诸军事，假节，进封富春侯，多所刑杀，百姓嚣然，又与公主鲁班私通。五凤二年欲城广陵不成，梦为诸葛恪所击，恐惧发病死，时年三十八，以后事付孙綝。",
    appear: [245, 256],
    impact: 4
  },
  "sun_chen": {
    id: "sun_chen",
    name: "孙綝",
    zi: "子通",
    aka: ["丞相", "永宁侯"],
    birth: 231,
    death: 258,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 58, war: 64, int: 62, pol: 44, cha: 32 },
    skills: [
      { id: "daizhi_chaozheng", name: "代知朝政", kind: "passive", desc: "峻死，綝为侍中武卫将军，领中外诸军事，代知朝政。", mod: { def: 0.12, morale: -3 }, tags: ["dread"] },
      { id: "feili_zizhuan", name: "废立自专", kind: "active", cd: 5, dur: 2, desc: "诛滕胤、吕据、朱异，黜孙亮为会稽王，迎立孙休。", mod: { atk: 0.15, morale: -6 }, tags: ["dread"] }
    ],
    traits: ["凶竖盈溢", "专权废立", "终以诛死"],
    bio: "孙峻从弟，父绰为安民都尉。峻死，綝为侍中武卫将军，领中外诸军事，代知朝政。以滕胤为大司马代吕岱驻武昌，旋诛胤及吕据，夷三族；太平二年杀朱异于镬里；三年黜亮为会稽王，迎立孙休。永安元年腊会，孙休与丁奉、张布定计，于坐中缚斩之，时年二十八，夷三族，发孙峻棺取其印绶。",
    quote: "卿何以不徙滕胤、吕据",
    appear: [252, 258],
    impact: 3
  },
  "sun_luban": {
    id: "sun_luban",
    name: "孙鲁班",
    zi: "大虎",
    aka: ["全公主"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["consort"],
    stats: { lead: 30, war: 32, int: 66, pol: 60, cha: 64 },
    skills: [
      { id: "quanshi_zhi_shi", name: "全氏之盛", kind: "passive", desc: "两嫁周循、全琮，全氏侯者五人并典兵马，外戚之盛莫及。", mod: { gold: 400, morale: -3 }, tags: ["dread"] },
      { id: "riye_zengzan", name: "日夜谮毁", kind: "passive", desc: "谮太子和母子与妹鲁育，又劝权纳全尚女为孙亮妃。", mod: { vision: 2, morale: -4 }, tags: ["insight"] }
    ],
    traits: ["步夫人所生", "恃宠干政", "谮害骨肉"],
    bio: "孙权与步夫人生长女，字大虎，先配周瑜子周循，后配全琮，故称全公主。与太子和母王氏有隙，日夜谮毁，赤乌十三年太子和遂废；又因其妹鲁育不肯同谋，谮之于权，鲁育终及于难。孙亮全皇后即其侄女，全氏一门五侯并典兵马。孙綝废亮后，全氏以谋泄而衰。（《三国志·妃嫔传》《孙和传》）",
    appear: [230, 258],
    impact: 3
  },
  "sun_luyu": {
    id: "sun_luyu",
    name: "孙鲁育",
    zi: "小虎",
    aka: ["朱公主"],
    birth: null,
    death: 255,
    faction: "wu",
    roles: ["consort"],
    stats: { lead: 34, war: 36, int: 60, pol: 52, cha: 66 },
    skills: [
      { id: "buyu_mouluan", name: "不与逆谋", kind: "passive", desc: "不肯与孙峻等同谋倾害太子和，遂见谮于姊全公主。", mod: { def: 0.06, morale: 4 }, tags: ["guard"] }
    ],
    traits: ["步夫人所生", "前配朱据", "以节见杀"],
    bio: "孙权与步夫人次女，字小虎，前配朱据，后配刘纂（纂先娶权中女，早卒，故以鲁育为继室）。五凤二年，将军孙仪等谋因会杀孙峻，事泄，仪等自杀，死者数十人，鲁育并及于难，实由全公主素与之有隙。孙休诛孙綝后，发孙峻棺、取其印绶，正为峻枉杀鲁育等人之故。（《三国志·妃嫔传》裴注引《吴历》）",
    appear: [240, 255],
    impact: 2
  },
  "xu_shi": {
    id: "xu_shi",
    name: "徐氏",
    aka: ["孙翊之妻"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["consort"],
    stats: { lead: 40, war: 34, int: 84, pol: 62, cha: 78 },
    skills: [
      { id: "po_xiao_bushi", name: "颇晓卜筮", kind: "passive", desc: "孙翊欲宴长吏，令徐卜之，徐言卦不能佳，宜须异日。", mod: { vision: 3, heal: 0.08 }, tags: ["insight"] },
      { id: "shedji_fuchou", name: "设祭报仇", kind: "active", cd: 5, dur: 2, desc: "绐妫览须晦日除服，密与孙高、傅婴定谋，斩览、员以祭翊墓。", mod: { atk: 0.2, morale: 10 }, tags: ["ambush"] }
    ],
    traits: ["智略权谲", "守节不移", "举军震骇"],
    bio: "孙翊之妻。孙翊为边鸿所杀，妫览、戴员归罪杀鸿，览入居军府，尽取翊嫔妾，又欲偪徐氏。徐绐以须晦日设祭除服，密使亲信语翊旧将孙高、傅婴，共盟合谋。至日设祭毕，徐薰香沐浴，言笑欢悦，览不疑而入，徐大呼，高、婴共杀览，余人就外杀员。徐还缞绖，奉二人首祭翊墓。（裴注引《吴历》）",
    appear: [204, 215],
    impact: 3
  },
  "wu_furen": {
    id: "wu_furen",
    name: "吴夫人",
    aka: ["吴太夫人", "破虏夫人"],
    birth: null,
    death: 207,
    faction: "wu",
    roles: ["consort"],
    stats: { lead: 44, war: 36, int: 76, pol: 74, cha: 84 },
    skills: [
      { id: "zhilue_quanjue", name: "智略权谲", kind: "passive", desc: "孙策将杀功曹魏腾，夫人倚大井而谏，策大惊，遽释之。", mod: { morale: 6, vision: 2 }, tags: ["insight"] },
      { id: "zhuzhi_junguo", name: "助治军国", kind: "aura", desc: "孙权少年统业，夫人助治军国，甚有补益，临终以权托张昭。", mod: { morale: 5, recruit: 0.08 }, tags: ["rally"] }
    ],
    traits: ["才貌见聘", "抚育诸子", "临终托孤"],
    bio: "吴郡吴人，徙钱唐，早失父母，与弟吴景同居。孙坚闻其才貌欲娶之，吴氏亲戚嫌坚轻狡，夫人曰「何爱一女以取祸乎」，遂许婚，生四男一女。孙权少年统业，夫人助治军国，甚有补益。建安中临薨，引见张昭等，属以后事，合葬高陵。裴注引虞喜《志林》谓其当以建安十二年薨。",
    appear: [184, 207],
    impact: 3
  },
  "wang_furen": {
    id: "wang_furen",
    name: "王氏",
    aka: ["大懿皇后", "王夫人"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["consort"],
    stats: { lead: 30, war: 28, int: 62, pol: 50, cha: 70 },
    skills: [
      { id: "huangwu_dexing", name: "黄武得幸", kind: "passive", desc: "以选入宫，黄武中得幸生孙和，宠次步氏，和立为太子。", mod: { morale: 4, heal: 0.06 }, tags: ["guard"] },
      { id: "zaochan_yousi", name: "遭谮忧死", kind: "passive", desc: "全公主日谮于权，及权寝疾，夫人言有喜色，由是见责以忧死。", mod: { def: -0.08, vision: 1 }, tags: ["insight"] }
    ],
    traits: ["琅邪人", "孙和之母", "追尊大懿皇后"],
    bio: "琅邪人，裴注引《吴书》云其父名卢九。以选入宫，黄武中得幸，生孙和，宠次步夫人。步氏薨后和立为太子，孙权将立夫人为后，而全公主素憎夫人，稍稍谮毁；及权寝疾，夫人言有喜色，由是权深责怒，以忧死。孙皓即位，追尊大懿皇后，封其三弟皆列侯。",
    appear: [220, 245],
    impact: 2
  },
  "pan_furen": {
    id: "pan_furen",
    name: "潘夫人",
    aka: ["潘皇后", "孙亮之母"],
    birth: null,
    death: 252,
    faction: "wu",
    roles: ["consort"],
    stats: { lead: 32, war: 30, int: 64, pol: 48, cha: 78 },
    skills: [
      { id: "xiandu_rongmei", name: "险妒容媚", kind: "passive", desc: "自始至卒，谮害袁夫人等甚众，然终得孙权专宠。", mod: { morale: -3, gold: 300 }, tags: ["dread"] },
      { id: "limu_zhizun", name: "立为皇后", kind: "passive", desc: "赤乌十三年孙亮立为太子，明年立夫人为皇后。", mod: { morale: 5, citydef: 0.05 }, tags: ["ritual"] }
    ],
    traits: ["会稽句章人", "输织室入宫", "终以缢死"],
    bio: "会稽句章人，父为吏，坐法死。夫人与姊俱输织室，孙权见而异之，召充后宫。得幸有娠，梦有以龙头授己者，己以蔽膝受之，遂生孙亮。赤乌十三年亮立为太子，明年立为皇后。性险妒容媚，谮害袁夫人等甚众；权不豫，夫人侍疾疲劳，诸宫人伺其昏卧共缢杀之，托言中恶，坐死者六七人，后合葬蒋陵。",
    appear: [230, 252],
    impact: 2
  },
  "wu_jing": {
    id: "wu_jing",
    name: "吴景",
    zi: null,
    aka: ["扬武将军"],
    birth: null,
    death: 205,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 66, war: 66, int: 58, pol: 62, cha: 66 },
    skills: [
      { id: "jubing_jujun", name: "举兵据郡", kind: "passive", desc: "袁术表景领丹杨太守，讨故太守周昕，遂据其郡。", mod: { atk: 0.1, citydef: 0.08 }, tags: ["fortify"] },
      { id: "weijun_donggui", name: "委郡东归", kind: "passive", desc: "袁术僭号，孙策绝江津，景即委广陵郡东归，复为丹杨太守。", mod: { move: 1, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["吴夫人之弟", "佐策起兵", "在郡有治"],
    bio: "吴夫人之弟。初与孙策、孙河、吕范合众讨泾县山贼祖郎，后北依袁术，术以为督军中郎将，与孙贲共破樊能、于麋于横江，又击笮融、薛礼于秣陵。袁术表景为广陵太守，术僭号，孙策绝江津，景即委郡东归，策复以为丹杨太守。汉遣议郎王誧表景为扬武将军，领郡如故，后卒于官。",
    appear: [190, 205],
    impact: 2
  },
  "cheng_pu": {
    id: "cheng_pu",
    name: "程普",
    zi: "德谋",
    aka: ["程公", "荡寇将军"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 84, war: 82, int: 66, pol: 66, cha: 78 },
    skills: [
      { id: "jiangdong_chenggong", name: "江东程公", kind: "aura", desc: "先出诸将，普最年长，时人皆呼程公，性好施与，喜士大夫。", mod: { atk: 0.07, morale: 6 }, tags: ["rally"] },
      { id: "wulin_zuoyoudu", name: "乌林左右督", kind: "active", cd: 4, dur: 2, desc: "与周瑜为左右督，破曹操于乌林，又进攻南郡，走曹仁。", mod: { atk: 0.15, watermove: 1 }, tags: ["naval"] }
    ],
    traits: ["容貌计略", "善于应对", "身被创夷", "先出诸将"],
    bio: "右北平土垠人。初为州郡吏，有容貌计略，善于应对，从孙坚讨黄巾于宛、邓，破董卓于阳人，攻城野战，身被创夷。孙策攻祖郎，为所围，普与一骑共蔽扞策，驱马疾呼，以矛突贼。策薨，与张昭等共辅孙权。赤壁之役与周瑜为左右督，破曹操于乌林，又走曹仁于南郡，拜裨将军，领江夏太守，迁荡寇将军，卒。",
    appear: [184, 209],
    impact: 4
  },
  "huang_gai": {
    id: "huang_gai",
    name: "黄盖",
    zi: "公覆",
    aka: ["武锋中郎将"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 78, war: 80, int: 70, pol: 64, cha: 74 },
    skills: [
      { id: "chibi_huogong", name: "赤壁火攻", kind: "active", cd: 5, dur: 2, desc: "建策火攻，诈降曹操，以蒙冲载薪草膏油，纵火焚其舟船。", mod: { atk: 0.22, siege: 0.12 }, tags: ["fire"] },
      { id: "fanshou_jiuxian", name: "凡守九县", kind: "passive", desc: "山越不宾之县辄以盖为守长，石城两掾不法，立杀之，县中震栗。", mod: { citydef: 0.12, morale: 5 }, tags: ["fortify"] }
    ],
    traits: ["姿貌严毅", "善于养众", "当官决断", "国人思之"],
    bio: "零陵泉陵人，裴注《吴书》云为故南阳太守黄子廉之后。少孤，常以负薪余闲学书疏、讲兵事。从孙坚举义兵，后随孙策、孙权，擐甲周旋，凡守九县，所在平定，迁丹杨都尉。赤壁之役建策火攻，为流矢所中堕水，赖韩当闻声救之得生。后领武陵太守，以五百兵开门击蛮，郡境遂清，加偏将军，病卒于官。",
    appear: [184, 215],
    impact: 4
  },
  "han_dang": {
    id: "han_dang",
    name: "韩当",
    zi: "义公",
    aka: ["昭武将军", "石城侯"],
    birth: null,
    death: 226,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 76, war: 80, int: 58, pol: 58, cha: 68 },
    skills: [
      { id: "bian_gongma", name: "便弓马有膂力", kind: "passive", desc: "以便弓马、有膂力幸于孙坚，数犯危难，陷敌擒虏。", mod: { atk: 0.13, hp: 0.08 }, tags: ["archer"] },
      { id: "gansi_jiefan", name: "敢死解烦", kind: "active", cd: 4, dur: 2, desc: "黄武二年将敢死及解烦兵万人讨丹杨贼，破之。", mod: { atk: 0.14, recruit: 0.1 }, tags: ["rally"] }
    ],
    traits: ["勤苦有功", "奉遵法令", "威烈著称"],
    bio: "辽西令支人。以便弓马、有膂力得幸于孙坚，从征伐周旋，数为别部司马，陷敌擒虏。孙策东渡，从讨三郡。后与周瑜等拒破曹操于赤壁，又与吕蒙袭取南郡，迁偏将军。宜都之役与陆逊、朱然共破蜀军于涿乡，徙威烈将军。黄武二年封石城侯，迁昭武将军，领冠军太守，将敢死及解烦兵讨丹杨贼，会病卒。",
    appear: [184, 226],
    impact: 3
  },
  "taishi_ci": {
    id: "taishi_ci",
    name: "太史慈",
    zi: "子义",
    aka: ["建昌都尉"],
    birth: 166,
    death: 206,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 76, war: 84, int: 72, pol: 62, cha: 76 },
    skills: [
      { id: "jiezhang_zhiming", name: "截章知名", kind: "passive", desc: "年二十一为郡奏曹史，驰至洛阳截败州章，由是知名。", mod: { vision: 3, xp: 0.1 }, tags: ["insight"] },
      { id: "shenting_dudou", name: "神亭独斗", kind: "active", cd: 3, dur: 1, desc: "与孙策战于神亭，挺身独斗，夺策兜鍪，策亦夺其手戟。", mod: { atk: 0.18, hp: 0.1 }, tags: ["rally"] }
    ],
    traits: ["猿臂善射", "信义笃烈", "志在报德"],
    bio: "东莱黄人。仕郡奏曹史，年二十一驰至洛阳截败州章。为孔融所善，单骑突围，为融说刘备请救。后归刘繇，拒孙策于神亭，挺身独斗。繇败，慈为策所得，策以为建昌都尉。孙权统事，委以南方之事。建安十一年卒，年四十一，临终叹曰：「丈夫生世，当带七尺之剑，以升天子之阶。今所志未从，奈何而死乎！」",
    quote: "丈夫生世，当带七尺之剑",
    appear: [190, 206],
    impact: 4
  },
  "gan_ning": {
    id: "gan_ning",
    name: "甘宁",
    zi: "兴霸",
    aka: ["锦帆", "折冲将军"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 78, war: 88, int: 68, pol: 50, cha: 70 },
    skills: [
      { id: "jinxin_qingxia", name: "锦帆轻侠", kind: "passive", desc: "少好游侠，挟持弓弩，负毦带铃，以缯锦维舟，去或割弃。", mod: { atk: 0.12, gold: 300 }, tags: ["raiding"] },
      { id: "ruxu_yezhuo", name: "濡须夜斫", kind: "active", cd: 4, dur: 2, desc: "濡须之役受敕夜斫曹营，以银碗酌酒励士，衔枚斫敌。", mod: { atk: 0.2, morale: 8 }, tags: ["ambush"] },
      { id: "xiandeng_wancheng", name: "先登皖城", kind: "passive", desc: "从攻皖为升城督，手持练身缘城，为吏士先，卒获朱光。", mod: { siege: 0.14, atk: 0.08 }, tags: ["siege"] }
    ],
    traits: ["开爽有计略", "轻财敬士", "粗猛好杀"],
    bio: "巴郡临江人，裴注《吴书》云本南阳人。少好游侠，以西锦维舟，民闻铃声即知是宁。往依刘表不见用，转托黄祖，祖以凡人畜之；宁善射，黄祖败走时射杀追兵校尉凌操。后由周瑜、吕蒙荐归孙权，陈计破黄祖，攻皖先登获朱光；濡须之役受敕夜斫曹营，持短兵劫寨，敌惊而退（裴注引《江表传》）。",
    appear: [200, 220],
    impact: 4
  },
  "ling_cao": {
    id: "ling_cao",
    name: "凌操",
    aka: ["破贼校尉"],
    birth: null,
    death: 203,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 66, war: 76, int: 52, pol: 50, cha: 62 },
    skills: [
      { id: "guanjun_lvfeng", name: "冠军履锋", kind: "passive", desc: "孙策初兴，每从征伐，常冠军履锋，先登破敌。", mod: { atk: 0.14, move: 1 }, tags: ["pursue"] },
      { id: "pingzhi_shanyue", name: "平治山越", kind: "passive", desc: "守永平长，平治山越，奸猾敛手，境内以宁。", mod: { citydef: 0.1, morale: 4 }, tags: ["fortify"] }
    ],
    traits: ["轻侠有胆气", "勇于先登", "死于流矢"],
    bio: "吴郡余杭人，凌统之父。轻侠有胆气，孙策初兴，每从征伐，常冠军履锋。守永平长，平治山越，奸猾敛手，迁破贼校尉。孙权统军后，从讨江夏，入夏口先登，破其前锋，轻舟独进，中流矢死。裴注《吴书》载其死于黄祖部将甘宁之射，凌统由是与甘宁有杀父之怨。",
    appear: [195, 203],
    impact: 2
  },
  "ling_tong": {
    id: "ling_tong",
    name: "凌统",
    zi: "公绩",
    aka: ["偏将军"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 78, war: 82, int: 62, pol: 58, cha: 74 },
    skills: [
      { id: "xianwei_jiuzhu", name: "陷围救主", kind: "active", cd: 4, dur: 2, desc: "合肥津北之役，率亲近三百人陷围，扶扞孙权得出。", mod: { def: 0.18, morale: 8 }, tags: ["guard"] },
      { id: "qinxian_jieshi", name: "亲贤接士", kind: "passive", desc: "虽在军旅，亲贤接士，轻财重义，有国士之风。", mod: { recruit: 0.1, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["果毅任气", "轻财重义", "爱善不害"],
    bio: "凌操之子，吴郡余杭人。年十五拜别部司马，行破贼都尉，摄父兵。从讨麻屯，亲当矢石，破之；又从破皖，拜荡寇中郎将。合肥之役为右部督，张辽奄至津北，统率亲近三百人陷围，扶扞孙权而出，身被重创，赖卓氏良药得不死。后以威恩诱纳山中壮悍，得精兵万余人，事毕当出，会病卒。",
    appear: [203, 217],
    impact: 3
  },
  "zhou_tai": {
    id: "zhou_tai",
    name: "周泰",
    zi: "幼平",
    aka: ["奋威将军", "陵阳侯"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 74, war: 84, int: 54, pol: 54, cha: 68 },
    skills: [
      { id: "xuancheng_huzhu", name: "宣城护主", kind: "passive", desc: "山贼数千卒至，泰投身卫权，胆气倍人，身被十二创。", mod: { def: 0.16, hp: 0.12 }, tags: ["guard"] },
      { id: "shuchuang_zhiyan", name: "数创见信", kind: "active", cd: 3, dur: 2, desc: "濡须宴上，孙权命泰解衣，手自指其创痕，诸将乃服。", mod: { morale: 10, atk: 0.08 }, tags: ["rally"] }
    ],
    traits: ["服事恭敬", "胆气倍人", "寒门立功"],
    bio: "九江下蔡人。与蒋钦随孙策为左右，数战有功。孙策讨六县山贼，孙权住宣城，山贼数千卒至，泰奋激投身卫权，身被十二创，良久乃苏。后与周瑜、程普拒曹操于赤壁，攻曹仁于南郡，拜平虏将军，留督濡须。孙权宴诸将，命泰解衣，手自指其创痕问以所起。后拜汉中太守、奋威将军，封陵阳侯，黄武中卒。",
    appear: [195, 222],
    impact: 3
  },
  "jiang_qin": {
    id: "jiang_qin",
    name: "蒋钦",
    zi: "公奕",
    aka: ["荡寇将军", "濡须督"],
    birth: null,
    death: 219,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 72, war: 74, int: 60, pol: 62, cha: 68 },
    skills: [
      { id: "juqi_buyi", name: "举盛慕祁奚", kind: "passive", desc: "徐盛曾表斩钦屯吏，钦每称其善，权问之，对以不挟私怨。", mod: { morale: 6, recruit: 0.08 }, tags: ["rally"] },
      { id: "pingkou_shanmin", name: "讨平盗贼", kind: "passive", desc: "从孙策定三郡、定豫章，禽吕合、秦狼，五县平定。", mod: { atk: 0.1, citydef: 0.08 }, tags: ["pursue"] }
    ],
    traits: ["在贵守约", "不挟私怨", "典领辞讼"],
    bio: "九江寿春人。孙策东渡，钦为别部司马，从定三郡、豫章。讨平会稽冶贼吕合、秦狼，五县平定，徙讨越中郎将。从征合肥，张辽袭权于津北，钦力战有功，迁荡寇将军，领濡须督，后拜津右护军，典领辞讼。权尝入其堂内，见其母疏帐缥被、妻妾布裙，叹其在贵守约。讨关羽，督水军入沔，还，道病卒。",
    appear: [195, 219],
    impact: 3
  },
  "chen_wu": {
    id: "chen_wu",
    name: "陈武",
    zi: "子烈",
    aka: ["偏将军"],
    birth: null,
    death: 215,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 72, war: 82, int: 52, pol: 56, cha: 70 },
    skills: [
      { id: "suoxiang_wuqian", name: "所向无前", kind: "passive", desc: "孙策料庐江精锐以武为督，所向无前，征讨有功。", mod: { atk: 0.15, move: 1 }, tags: ["pursue"] },
      { id: "renhou_haoshi", name: "仁厚好施", kind: "passive", desc: "仁厚好施，乡里远方客多依托之，尤为孙权所亲爱。", mod: { recruit: 0.1, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["长七尺七寸", "仁厚好施", "奋命战死"],
    bio: "庐江松滋人。孙策在寿春，武往修谒，时年十八，长七尺七寸，因从渡江，征讨有功，拜别部司马。策破刘勋，多得庐江人，料其精锐，以武为督，所向无前。及权统事，转督五校，尤见亲爱，数至其家，累有功劳，进位偏将军。建安二十年从击合肥，张辽奄至，诸将不备，武奋命战死，孙权哀之，自临其葬。",
    appear: [195, 215],
    impact: 3
  },
  "dong_xi": {
    id: "dong_xi",
    name: "董袭",
    zi: "元代",
    aka: ["偏将军"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 72, war: 84, int: 54, pol: 52, cha: 66 },
    skills: [
      { id: "duanxie_podi", name: "断绁之功", kind: "active", cd: 4, dur: 2, desc: "建安十三年讨黄祖，与凌统各将敢死百人，以刀断两绁。", mod: { atk: 0.18, watermove: 1 }, tags: ["naval"] },
      { id: "shouren_buqi", name: "受任不去", kind: "passive", desc: "督五楼船屯濡须口，夜遇暴风，左右请去，袭怒不肯，船败而死。", mod: { def: 0.15, morale: 6 }, tags: ["guard"] }
    ],
    traits: ["长八尺", "武力过人", "志节慷慨"],
    bio: "会稽余姚人，长八尺，武力过人，谢承《后汉书》称其志节慷慨、武毅猛烈。孙策入郡，袭迎于高迁亭，署为门下贼曹，身斩山阴宿贼黄龙罗、周勃之首。后与凌统俱为前部讨黄祖，各将敢死百人，人被两铠，以刀断两绁，蒙冲横流，大兵遂进。曹公出濡须，袭督五楼船住濡须口，夜卒暴风，船败，袭死。",
    appear: [195, 217],
    impact: 3
  },
  "xu_sheng": {
    id: "xu_sheng",
    name: "徐盛",
    zi: "文向",
    aka: ["安东将军", "芜湖侯"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 78, war: 78, int: 68, pol: 60, cha: 68 },
    skills: [
      { id: "yicheng_qudi", name: "疑城退敌", kind: "active", cd: 5, dur: 3, desc: "从建业筑围作薄落，围上设假楼、江中浮船，魏文帝望而引退。", mod: { citydef: 0.2, morale: 6 }, tags: ["fortify"] },
      { id: "yishao_yuduo", name: "以少御多", kind: "passive", desc: "洞口之役遭大风，收余兵与曹休夹江，以少御多，敌不能克。", mod: { def: 0.12, atk: 0.06 }, tags: ["guard"] }
    ],
    traits: ["以勇气闻", "忿愤敢言", "器量深沉"],
    bio: "琅邪莒人。从孙权拒曹操于濡须，魏尝大出横江，盛乘蒙冲遇迅风落敌岸下，诸将恐惧，盛独将兵上突斫敌，敌披退走，权大壮之。魏使邢贞拜权为吴王，贞有骄色，盛忿愤涕泣，贞闻而叹江东将相非久下人者。刘备次西陵，盛攻取诸屯，所向有功；曹休出洞口，盛与吕范、全琮渡江拒守。后迁安东将军，黄武中卒。",
    appear: [200, 225],
    impact: 3
  },
  "ding_feng": {
    id: "ding_feng",
    name: "丁奉",
    zi: "承渊",
    aka: ["右大司马", "安丰侯"],
    birth: 186,
    death: 271,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 80, war: 86, int: 70, pol: 62, cha: 66 },
    skills: [
      { id: "xuezhong_duanbing", name: "雪中奋短兵", kind: "active", cd: 4, dur: 2, desc: "东兴之役天寒雪，使兵解铠着胄持短兵，突斫魏前屯，大破之。", mod: { atk: 0.22, morale: 8 }, tags: ["ambush"] },
      { id: "kuama_chimao", name: "跨马持矛", kind: "passive", desc: "高亭之役跨马持矛，突入敌阵，斩首数百，获其军器。", mod: { atk: 0.12, move: 1 }, tags: ["pursue"] },
      { id: "yu_zhangbu_mou", name: "与张布谋", kind: "passive", desc: "孙休召问诛孙綝，奉请因腊会以陛下兵诛之，遂定大乱。", mod: { vision: 2, morale: 5 }, tags: ["insight"] }
    ],
    traits: ["骁勇冠军", "计略过人", "晚节骄矜"],
    bio: "庐江安丰人。少以骁勇为小将，属甘宁、陆逊、潘璋等。东兴之役天寒雪，魏将置酒高会，奉使兵解铠着胄持短兵，突斫其前屯，大破魏军。后从孙峻迎文钦于寿春，跨马持矛破敌于高亭。孙休即位，与张布定计于腊会斩孙綝，迁大将军。永安六年率诸军向寿春为救蜀之势；孙皓立，迁右大司马左军师，后卒。",
    appear: [215, 265],
    impact: 4
  },
  "pan_zhang": {
    id: "pan_zhang",
    name: "潘璋",
    zi: "文珪",
    aka: ["右将军", "溧阳侯"],
    birth: null,
    death: 234,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 76, war: 80, int: 56, pol: 46, cha: 58 },
    skills: [
      { id: "hengma_zhizou", name: "横马斩走者", kind: "passive", desc: "合肥之役诸将披走，璋驰进横马斩走兵二人，兵皆还战。", mod: { atk: 0.14, morale: 6 }, tags: ["rally"] },
      { id: "duandao_qinyu", name: "断道禽羽", kind: "active", cd: 4, dur: 2, desc: "与朱然断关羽走道，住夹石，部下司马马忠禽羽父子。", mod: { atk: 0.18, move: 1 }, tags: ["pursue"] }
    ],
    traits: ["博荡嗜酒", "禁令肃然", "好立功业", "性奢泰"],
    bio: "东郡发干人。孙权为阳羡长时始往随权，性博荡好赊酤，权奇爱之，使召募得百余人。讨山贼有功，为吴大市刺奸，盗贼断绝。合肥之役，驰马斩走兵二人，兵皆还战。从征关羽，与朱然断羽走道，部下司马马忠禽羽及羽子平。夷陵之役与陆逊并力，部下斩刘备护军冯习。权称尊号，拜右将军，嘉禾三年卒。",
    appear: [200, 234],
    impact: 3
  },
  "ma_zhong_wu": {
    id: "ma_zhong_wu",
    name: "马忠",
    aka: ["潘璋部下司马"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 60, war: 74, int: 52, pol: 44, cha: 50 },
    skills: [
      { id: "linju_qinyu", name: "临沮禽羽", kind: "passive", desc: "建安二十四年临沮之役，禽关羽及其子平、都督赵累等。", mod: { atk: 0.15, move: 1 }, tags: ["pursue"] }
    ],
    traits: ["司马之职", "事见潘璋传", "后事不详"],
    bio: "潘璋部下司马。建安二十四年孙权征关羽，璋与朱然断羽走道，到临沮，住夹石；忠奉命禽关羽及其子关平、都督赵累等。权以宜都巫、秭归二县为固陵郡，拜璋为太守。忠之名仅见《三国志·潘璋传》，其后行迹史无所载。",
    appear: [215, 230],
    impact: 2
  },
  "quan_cong": {
    id: "quan_cong",
    name: "全琮",
    zi: "子璜",
    aka: ["右大司马", "钱唐侯"],
    birth: null,
    death: 249,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 78, war: 76, int: 68, pol: 70, cha: 76 },
    skills: [
      { id: "sanmi_zhenshan", name: "散米振赡", kind: "passive", desc: "父使赍米数千斛到吴市易，琮皆散用，空船而还，以赡中州士人。", mod: { recruit: 0.14, morale: 6 }, tags: ["logistics"] },
      { id: "jianzheng_yizhou", name: "谏征夷洲", kind: "passive", desc: "权将围珠崖、夷洲，琮言水土气毒、往者惧不能反，权不听从。", mod: { vision: 3, food: 300 }, tags: ["insight"] }
    ],
    traits: ["谦虚接士", "貌无骄色", "养威持重"],
    bio: "吴郡钱唐人，父全柔为桂阳太守。柔使琮赍米数千斛到吴市易，琮皆散用振赡避乱南下的中州士人，空船而还，依琮居者以百数。后讨山越、破敌有功，迁卫将军、左护军、徐州牧，尚孙权长女。赤乌九年迁右大司马、左军师。孙权欲围珠崖、夷洲，琮力谏不听，军行经岁，士卒疾疫死者十有八九。赤乌十二年卒。",
    appear: [200, 249],
    impact: 3
  },
  "lv_fan": {
    id: "lv_fan",
    name: "吕范",
    zi: "子衡",
    aka: ["大司马", "南昌侯"],
    birth: null,
    death: 228,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 78, war: 70, int: 70, pol: 78, cha: 74 },
    skills: [
      { id: "qiwei_dudu", name: "乞为都督", kind: "passive", desc: "自请领都督，部分军众，由是军中肃睦，威禁大行。", mod: { def: 0.12, morale: 6 }, tags: ["rally"] },
      { id: "guanbai_bugan", name: "关白不敢专许", kind: "passive", desc: "策使范主财计，权年少私从有求，范必关白孙策，不敢专许。", mod: { gold: 400, morale: 4 }, tags: ["logistics"] }
    ],
    traits: ["容观姿貌", "性喜威仪", "居处奢靡", "勤事奉法"],
    bio: "汝南细阳人。避乱寿春，孙策见而奇之，将私客百人归策，又奉命迎太妃于江都。策使范主财计，孙权年少私有所求，范必关白，不敢专许。赤壁之役与周瑜等拒破曹操，拜裨将军；后督徐盛、全琮、孙韶等以舟师拒曹休于洞口，遭大风，死者数千。迁前将军、扬州牧。黄武七年迁大司马，印绶未下而卒。",
    appear: [194, 228],
    impact: 4
  },
  "he_qi": {
    id: "he_qi",
    name: "贺齐",
    zi: "公苗",
    aka: ["后将军", "山阴侯"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 78, war: 80, int: 62, pol: 60, cha: 66 },
    skills: [
      { id: "weizhen_shanyue", name: "威震山越", kind: "passive", desc: "守剡长立斩县吏斯从，率吏民开城门突击，众千余人破散。", mod: { atk: 0.15, morale: 6 }, tags: ["barbarian"] },
      { id: "jingqi_junrong", name: "兵甲精好", kind: "passive", desc: "尤好军事，蒙冲斗舰望之若山，曹休等惮之，遂引军还。", mod: { def: 0.12, siege: 0.1 }, tags: ["naval"] }
    ],
    traits: ["性奢绮", "尤好军事", "偏军独全"],
    bio: "会稽山阴人，虞预《晋书》称贺氏本姓庆氏。少为郡吏，守剡长，立斩为奸的县吏斯从。建安元年孙策察齐孝廉，代韩晏领南部都尉事，说降侯官长商升。后与陆逊讨破尤突等，斩首数千，拜安东将军，封山阴侯。黄武初曹休来伐，齐以道远后至，偏军独全，诸将倚以为势。迁后将军，假节领徐州牧，后四年卒。",
    appear: [196, 227],
    impact: 3
  },
  "zhu_zhi": {
    id: "zhu_zhi",
    name: "朱治",
    zi: "君理",
    aka: ["安国将军", "吴郡太守"],
    birth: 156,
    death: 224,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 74, war: 68, int: 66, pol: 76, cha: 76 },
    skills: [
      { id: "yingtaifei", name: "迎护太妃", kind: "passive", desc: "使人于曲阿迎太妃及权兄弟，供奉辅护，甚有恩纪。", mod: { morale: 8, recruit: 0.06 }, tags: ["guard"] },
      { id: "juquan_xiaolian", name: "举权孝廉", kind: "passive", desc: "孙权年十五，治举为孝廉；策薨，与张昭等共尊奉权。", mod: { morale: 5, xp: 0.08 }, tags: ["ritual"] }
    ],
    traits: ["随坚征伐", "扶翼孙策", "在郡三十一年"],
    bio: "丹杨故鄣人。初为县吏，察孝廉，随孙坚征伐，从破董卓于阳人，入洛阳。孙坚薨，治扶翼孙策，依就袁术，后劝策还平江东。使人于曲阿迎太妃及权兄弟，供奉辅护甚有恩纪，又与许贡战于由拳，大破之，入郡领太守事。孙权年十五，治举为孝廉。后自表屯故鄣镇抚山越，黄武三年卒，在郡三十一年，年六十九。",
    appear: [184, 224],
    impact: 3
  },
  "zhu_ran": {
    id: "zhu_ran",
    name: "朱然",
    zi: "义封",
    aka: ["左大司马", "西安乡侯"],
    birth: 182,
    death: 249,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 84, war: 80, int: 68, pol: 62, cha: 72 },
    skills: [
      { id: "jiangling_gushou", name: "江陵孤守", kind: "active", cd: 5, dur: 3, desc: "曹真、夏侯尚围江陵六月不下，然乘隙攻破魏两屯。", mod: { citydef: 0.22, def: 0.12 }, tags: ["fortify"] },
      { id: "linju_duandao", name: "临沮断道", kind: "passive", desc: "从讨关羽，别与潘璋到临沮禽羽，定荆州之役有力。", mod: { atk: 0.1, move: 1 }, tags: ["pursue"] }
    ],
    traits: ["终日钦钦", "临急胆定", "内行修洁"],
    bio: "丹杨故鄣人，本姓施，朱治之甥，年十三过继为朱治嗣子。年十九为余姚长，后为临川太守。建安二十四年从讨关羽，别与潘璋到临沮禽羽。吕蒙临终荐之，权假然节，镇江陵。黄武元年刘备攻宜都，然督五千人与陆逊并力。魏遣曹真等围江陵六月，然守御不懈，乘隙破敌。官至左大司马、右军师，赤乌十二年卒。",
    appear: [197, 249],
    impact: 4
  },
  "shi_ji": {
    id: "shi_ji",
    name: "施绩",
    zi: "公绪",
    aka: ["左大司马", "朱绩"],
    birth: null,
    death: 270,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 80, war: 74, int: 68, pol: 64, cha: 68 },
    skills: [
      { id: "huanshi_fuxing", name: "表还为施氏", kind: "passive", desc: "本朱然之子，五凤中表还请复本姓为施氏，世称施绩。", mod: { morale: 5, recruit: 0.06 }, tags: ["ritual"] },
      { id: "jieji_bianzhou", name: "结蜀为援", kind: "passive", desc: "孙綝秉政，绩密书结蜀，使蜀增白帝之守以须后命。", mod: { vision: 2, citydef: 0.1 }, tags: ["insight"] }
    ],
    traits: ["胆守有余", "威重著称", "终守西陵"],
    bio: "名将朱然之子，本姓施，五凤中表还本姓施氏。初为骑都尉领兵，赤乌四年随朱然攻魏樊城，建计破其外围。后迁镇东将军。太平二年拜骠骑将军；孙綝秉政，大臣疑贰，绩密书结蜀，使蜀遣右将军阎宇增白帝之守。永安初迁上大将军、都护督，自巴丘上迄西陵；元兴元年就拜左大司马，后卒。",
    appear: [235, 265],
    impact: 3
  },
  "zhu_huan": {
    id: "zhu_huan",
    name: "朱桓",
    zi: "休穆",
    aka: ["前将军", "嘉兴侯"],
    birth: 177,
    death: 238,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 80, war: 82, int: 62, pol: 58, cha: 72 },
    skills: [
      { id: "wubai_jiwan", name: "以五千当数万", kind: "active", cd: 4, dur: 2, desc: "黄武元年曹仁步骑数万向濡须，桓以五千人破之，斩常雕。", mod: { def: 0.18, atk: 0.12 }, tags: ["fortify"] },
      { id: "lüeqiu_zhongshi", name: "轻财贵义", kind: "passive", desc: "部曲万口，妻子尽识之，俸禄产业皆与共分，士皆号慕。", mod: { recruit: 0.12, morale: 7 }, tags: ["rally"] }
    ],
    traits: ["爱养吏士", "性护其前", "强识不忘", "家无余财"],
    bio: "吴郡吴人。孙权为将军，桓给事幕府，除余姚长，值疫疠谷贵，分部良吏隐亲医药，餐粥相继。迁荡寇校尉，讨平丹杨、鄱阳山贼，后代周泰为濡须督。黄武元年魏大司马曹仁步骑数万向濡须，桓手下才五千人，激厉将士，斩常雕，生擒王双。性护前，耻为人下，然轻财贵义，与军士分甘。年六十二，赤乌元年卒。",
    appear: [200, 238],
    impact: 4
  },
  "zhu_yi": {
    id: "zhu_yi",
    name: "朱异",
    zi: "季文",
    aka: ["大都督", "嘉兴侯"],
    birth: null,
    death: 257,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 76, war: 78, int: 66, pol: 56, cha: 62 },
    skills: [
      { id: "yanyou_qiteng", name: "掩破七屯", kind: "active", cd: 4, dur: 2, desc: "率手下二千人掩破魏庐江太守文钦七屯，斩首数百。", mod: { atk: 0.18, move: 2 }, tags: ["ambush"] },
      { id: "jianshe_weicheng", name: "建计破围", kind: "passive", desc: "赤乌四年随朱然攻樊城，建计破其外围，还拜偏将军。", mod: { siege: 0.12, atk: 0.06 }, tags: ["siege"] }
    ],
    traits: ["以父任除郎", "童少能赋", "终为权臣所杀"],
    bio: "朱桓之子。以父任除郎，赤乌四年随朱然攻魏樊城，建计破其外围，还拜偏将军。魏庐江太守文钦营住六安，多设屯寨，异身率手下二千人掩破其七屯，斩首数百，迁镇南将军。太平二年魏将诸葛诞据寿春降，异奉命与丁奉等解围，军士乏食引还，孙綝大怒，杀异于镬里。（裴注《文士传》载其童少赋弩。）",
    appear: [230, 257],
    impact: 3
  },
  "lv_ju": {
    id: "lv_ju",
    name: "吕据",
    zi: "世议",
    aka: ["骠骑将军"],
    birth: null,
    death: 256,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 74, war: 76, int: 62, pol: 58, cha: 64 },
    skills: [
      { id: "shantao_shanzei", name: "讨破山贼", kind: "passive", desc: "以父任为郎，数讨山贼，所击皆破，又随潘濬讨五溪。", mod: { atk: 0.12, citydef: 0.08 }, tags: ["pursue"] },
      { id: "chijie_buke", name: "耻为叛臣", kind: "passive", desc: "左右劝其降魏，据曰「耻为叛臣」，遂自杀，夷三族。", mod: { def: 0.1, morale: 6 }, tags: ["guard"] }
    ],
    traits: ["御军齐整", "以父任起", "终以忠死"],
    bio: "吕范之子，字世议。以父任为郎，父寝疾拜副军校尉；父卒迁安军中郎将，数讨山贼，诸深恶剧地所击皆破。随太常潘濬讨五溪复有功，又从朱然攻樊城与朱异破城外围，还拜偏将军，迁越骑校尉。太平元年帅师侵魏，闻孙峻死、孙綝自代，大怒引军还欲废綝，为綝所攻，曰「耻为叛臣」，自杀，夷三族。",
    appear: [230, 256],
    impact: 3
  },
  "liu_zan": {
    id: "liu_zan",
    name: "留赞",
    zi: "正明",
    aka: ["左护军", "屯骑校尉"],
    birth: 183,
    death: 255,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 74, war: 84, int: 60, pol: 52, cha: 64 },
    skills: [
      { id: "gejin_shenzu", name: "割筋申足", kind: "passive", desc: "一足被创屈不伸，乃以刀自割其筋，引申其足，以得蹉步。", mod: { hp: 0.12, move: 1 }, tags: ["rally"] },
      { id: "pifa_gaoge", name: "被发抗歌", kind: "passive", desc: "临敌必先被发叫天，因抗音而歌，左右应之，毕乃进战。", mod: { atk: 0.16, morale: 6 }, tags: ["rally"] }
    ],
    traits: ["好读兵书", "直言不阿旨", "战无不利"],
    bio: "会稽长山人。与黄巾贼帅吴桓战，手斩得桓，一足被创遂屈不伸，乃以刀自割其筋，引申其足，凌统闻而奇之，表荐于孙权。时事得失每常规谏，好直言不阿旨，权以此惮之。诸葛恪征东兴，赞为前部，合战先陷阵，大败魏师。孙峻征淮南，授赞节，拜左护军；未至寿春道病发，魏将蒋班追及，被害，时年七十三。",
    appear: [205, 255],
    impact: 3
  },
  "zhongli_mu": {
    id: "zhongli_mu",
    name: "钟离牧",
    zi: "子干",
    aka: ["前将军", "秦亭侯"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 78, war: 72, int: 72, pol: 70, cha: 74 },
    skills: [
      { id: "gonggeng_tuidao", name: "躬耕推稻", kind: "passive", desc: "种稻二十余亩，县民识认，牧即以稻与县民，遂出还山阴。", mod: { morale: 8, food: 300 }, tags: ["logistics"] },
      { id: "jiuhuo_guisu", name: "救火贵速", kind: "active", cd: 4, dur: 2, desc: "魏汉葭长郭纯诱武陵五溪夷，牧不待朝命，率三千兵缘山险二千余里破之。", mod: { atk: 0.18, landmove: 1 }, tags: ["barbarian"] }
    ],
    traits: ["操行清纯", "威恩部伍", "智勇分明"],
    bio: "会稽山阴人。少居永兴，躬自垦田，稻熟而民识认，牧即以稻与之。赤乌五年从郎中补太子辅义都尉，迁南海太守，高凉贼率仍弩、揭阳贼率曾夏相继降服。还为中书令，平建安、鄱阳、新都三郡山民之乱。永安六年蜀并于魏，魏汉葭县长郭纯诱致武陵五溪夷，牧以三千兵缘山险行二千里破之，五溪平。",
    appear: [230, 264],
    impact: 3
  },
  "lu_kang": {
    id: "lu_kang",
    name: "陆抗",
    zi: "幼节",
    aka: ["大司马", "镇军大将军"],
    birth: 226,
    death: 274,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 90, war: 78, int: 82, pol: 76, cha: 78 },
    skills: [
      { id: "xiling_zhanshou", name: "西陵破敌", kind: "active", cd: 5, dur: 3, desc: "凤凰元年步阐以西陵叛降晋，抗急攻关破之，败晋将杨肇。", mod: { atk: 0.2, siege: 0.15 }, tags: ["siege"] },
      { id: "shanwan_chengwei", name: "缮完城围", kind: "passive", desc: "与诸葛恪换屯柴桑，临去皆更缮城围、葺墙屋，恪入屯俨然若新。", mod: { citydef: 0.15, morale: 4 }, tags: ["fortify"] }
    ],
    traits: ["逊之次子", "临事条答", "守边十年"],
    bio: "陆逊次子，孙策外孙。逊卒时拜建武校尉，领逊众五千人。赤乌九年迁立节中郎将，与诸葛恪换屯柴桑。孙皓时拜镇军大将军，都督信陵、西陵、夷道、乐乡、公安诸军事；步阐叛降晋，抗急攻关破之，败晋将杨肇，拔西陵。后拜大司马、领荆州牧，卒，年四十九。",
    appear: [245, 265],
    impact: 5
  },
  "tao_jun": {
    id: "tao_jun",
    name: "陶濬",
    aka: ["徐陵督", "镇南大将军"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 62, war: 66, int: 56, pol: 52, cha: 54 },
    skills: [
      { id: "xidao_taoma", name: "从西道讨马", kind: "passive", desc: "天纪三年郭马反于广州，濬受命将七千人从西道讨之。", mod: { atk: 0.12, landmove: 1 }, tags: ["pursue"] },
      { id: "tingzhu_buqian", name: "停驻不前", kind: "passive", desc: "天纪四年晋军大举，濬至武昌闻北军大出，停驻不前。", mod: { move: -1, def: 0.06 }, tags: ["insight"] }
    ],
    traits: ["宿将", "奉命讨贼", "临敌不进"],
    bio: "吴末为徐陵督。天纪三年夏，合浦太守修允部曲督郭马反，杀广州督虞授，自号都督交广二州诸军事、安南将军；孙皓遣徐陵督陶濬将七千人从西道讨之，又命交州牧陶璜部伍合浦、郁林诸郡兵共击马。天纪四年冬，晋命王浑、王濬等大举东下，濬至武昌，闻北军大出，停驻不前。（《三国志·孙皓传》）",
    appear: [260, 265],
    impact: 2
  },
  "shen_ying": {
    id: "shen_ying",
    name: "沈莹",
    aka: ["丹杨太守"],
    birth: null,
    death: 280,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 74, war: 78, int: 64, pol: 58, cha: 62 },
    skills: [
      { id: "qingjin_bing", name: "青巾兵", kind: "active", cd: 4, dur: 3, desc: "领丹杨锐卒刀楯五千，号青巾兵，前后屡陷坚阵。", mod: { atk: 0.2, def: 0.1 }, tags: ["pike"] }
    ],
    traits: ["丹杨锐卒之首", "三冲不动", "战死阪桥"],
    bio: "吴末为丹杨太守。晋军东下，吴丞相张悌与护军孙震、丹杨太守沈莹帅众三万济江，与晋扬州刺史周浚战于阪桥。莹领丹杨锐卒刀楯五千，号曰青巾兵，前后屡陷坚阵；三冲晋淮南军不动，退引而乱，为薛胜、蒋班所乘，吴军大败，莹与张悌等俱被获。（干宝《晋纪》）",
    appear: [265, 265],
    impact: 2
  },
  "wu_yan": {
    id: "wu_yan",
    name: "吾彦",
    zi: "士则",
    aka: ["建平太守", "交州刺史"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 80, war: 84, int: 70, pol: 66, cha: 64 },
    skills: [
      { id: "tieguo_hengjiang", name: "铁锁横江", kind: "active", cd: 5, dur: 3, desc: "觉王濬造船于蜀，请增兵不许，乃自作铁锁横断江路。", mod: { citydef: 0.2, watermove: -1 }, tags: ["naval"] },
      { id: "shou_ge_mengshou", name: "手格猛兽", kind: "passive", desc: "身长八尺，手格猛兽，旅力绝群，陆抗奇其勇略而用之。", mod: { atk: 0.14, hp: 0.1 }, tags: ["rally"] }
    ],
    traits: ["出自寒微", "有文武才干", "坚守不下"],
    bio: "吴郡吴人，出自寒微。身长八尺，手格猛兽，旅力绝群。初为小将，给事大司马陆抗，抗奇其勇略，擢用之。稍迁建平太守。王濬将伐吴，造船于蜀，彦觉之，请增兵为备，孙皓不从，彦乃自作铁锁横断江路。及晋师临境，缘江诸城望风降附，唯彦坚守，大军攻之不能克。（《晋书·吾彦传》）",
    appear: [255, 265],
    impact: 3
  },
  "lv_dai": {
    id: "lv_dai",
    name: "吕岱",
    zi: "定公",
    aka: ["大司马", "番禺侯"],
    birth: 161,
    death: 256,
    faction: "wu",
    roles: ["general"],
    stats: { lead: 80, war: 74, int: 72, pol: 78, cha: 72 },
    skills: [
      { id: "naxuan_guohua", name: "南宣国化", kind: "passive", desc: "在交州历年不饷家，遣从事南宣国化，威恩宣著，南州宁靖。", mod: { recruit: 0.14, gold: 500 }, tags: ["logistics"] },
      { id: "qingshen_fenggong", name: "清身奉公", kind: "passive", desc: "清身奉公，妻子饥乏，权闻而叹息，加赐钱米布绢。", mod: { morale: 8, food: 300 }, tags: ["rally"] }
    ],
    traits: ["清身奉公", "出身万里", "年九十六卒", "遗令素棺"],
    bio: "广陵海陵人。为郡县吏，避乱南渡，孙权统事，岱诣幕府。与蒋钦等讨平会稽东冶五县贼吕合、秦狼，拜昭信中郎将。建安二十年督孙茂等取长沙三郡。后为交州刺史，历年不饷家，妻子饥乏，遣从事南宣国化，威恩宣著。迁上大将军，孙亮即位拜大司马。太平元年卒，年九十六，遗令殡以素棺，务从俭约。",
    appear: [200, 256],
    impact: 4
  },
  "zhou_yu": {
    id: "zhou_yu",
    name: "周瑜",
    zi: "公瑾",
    aka: ["周郎", "偏将军"],
    birth: 175,
    death: 210,
    faction: "wu",
    roles: ["strategist"],
    stats: { lead: 92, war: 78, int: 92, pol: 76, cha: 94 },
    skills: [
      { id: "chibi_zuodu", name: "赤壁左督", kind: "active", cd: 5, dur: 3, desc: "建安十三年为左督，与程普破曹操于乌林，又走曹仁于南郡。", mod: { atk: 0.2, watermove: 2 }, tags: ["naval"] },
      { id: "yaci_zhilian", name: "雅性谦让", kind: "aura", desc: "折节容下，终不与程普校，普叹与周公瑾交若饮醇醪。", mod: { atk: 0.08, morale: 8 }, tags: ["rally"] },
      { id: "quanshu_zhice", name: "陈计取蜀", kind: "passive", desc: "诣京见权，乞与奋威俱进取蜀，并张鲁而结马超。", mod: { vision: 3, move: 1 }, tags: ["insight"] }
    ],
    traits: ["长壮有姿貌", "性度恢廓", "雅有智计", "精意音乐"],
    bio: "庐江舒人，从祖父景、景子忠皆为汉太尉，父异为洛阳令。与孙策同年，独相友善。助策定江东。建安十三年为左督，与程普破曹操于乌林，又攻南郡，亲跨马栎阵，为流矢中右胁。后诣京见权，乞进取蜀并张鲁、结马超，还江陵为行装，道于巴丘病卒，时年三十六。性度恢廓，惟与程普不睦，普后自敬服。",
    quote: "与周公瑾交，若饮醇醪",
    appear: [195, 210],
    impact: 5
  },
  "lu_su": {
    id: "lu_su",
    name: "鲁肃",
    zi: "子敬",
    aka: ["横江将军", "汉昌太守"],
    birth: 172,
    death: 217,
    faction: "wu",
    roles: ["strategist"],
    stats: { lead: 78, war: 70, int: 90, pol: 80, cha: 84 },
    skills: [
      { id: "dingzu_zhice", name: "榻上鼎足", kind: "passive", desc: "为孙权画策，谓汉室不可复兴、曹操不可卒除，惟鼎足江东以观衅。", mod: { vision: 3, recruit: 0.1 }, tags: ["insight"] },
      { id: "yiyang_dandao", name: "益阳单刀", kind: "active", cd: 4, dur: 2, desc: "与关羽各驻兵百步，单刀俱会，责其贪而弃义，备遂割湘水为界。", mod: { atk: 0.1, morale: 8 }, tags: ["rally"] }
    ],
    traits: ["体貌魁奇", "好为奇计", "方严寡饰", "手不释卷"],
    bio: "临淮东城人，性好施与，大散财货以赈穷弊结士。周瑜为居巢长求资粮，肃家有米两囷各三千斛，乃指一囷与瑜。见袁术无纲纪，携老弱将轻侠少年百余人南到居巢就瑜。后为孙权画鼎足之策，赤壁之役力主抗曹。建安十九年与关羽相拒益阳，各驻兵百步单刀俱会，备遂割湘水为界。年四十六，建安二十二年卒。",
    quote: "汉室不可复兴，曹操不可卒除",
    appear: [197, 217],
    impact: 5
  },
  "lv_meng": {
    id: "lv_meng",
    name: "吕蒙",
    zi: "子明",
    aka: ["虎威将军", "孱陵侯"],
    birth: 178,
    death: 220,
    faction: "wu",
    roles: ["strategist"],
    stats: { lead: 88, war: 82, int: 86, pol: 68, cha: 72 },
    skills: [
      { id: "baiyi_dujiang", name: "白衣渡江", kind: "active", cd: 5, dur: 2, desc: "诈称商旅，尽伏精兵于船舱，昼夜兼行，袭取南郡，禽关羽。", mod: { atk: 0.2, move: 1 }, tags: ["ambush"] },
      { id: "shibie_sanri", name: "士别三日", kind: "passive", desc: "少不修书传，后笃志力学，鲁肃叹非复吴下阿蒙。", mod: { xp: 0.15, vision: 2 }, tags: ["scholar"] },
      { id: "jinhuo_yuanyou", name: "进据濡须坞", kind: "passive", desc: "劝孙权夹濡须水口立坞，掘长堑、置强弩，以拒曹操。", mod: { citydef: 0.15, morale: 4 }, tags: ["fortify"] }
    ],
    traits: ["不修书传", "折节好学", "轻财尚义", "善待同僚"],
    bio: "汝南富陂人。少南渡，依姊夫邓当，年十五六窃随击贼，曰「不入虎穴，安得虎子」。邓当死，张昭荐蒙代当，拜别部司马。后从讨丹杨、江夏，拜平北都尉；从围皖城，计擒朱光。鲁肃卒后代镇陆口，建安二十四年诈称商旅白衣渡江，遂取南郡，禽关羽，封孱陵侯。未及受封而疾发，卒于内殿，年四十二。",
    quote: "不入虎穴，安得虎子",
    appear: [195, 220],
    impact: 5
  },
  "lu_xun": {
    id: "lu_xun",
    name: "陆逊",
    zi: "伯言",
    aka: ["上大将军", "江陵侯"],
    birth: 183,
    death: 245,
    faction: "wu",
    roles: ["strategist"],
    stats: { lead: 92, war: 74, int: 92, pol: 84, cha: 80 },
    skills: [
      { id: "yiling_huogong", name: "夷陵火攻", kind: "active", cd: 6, dur: 3, desc: "黄武元年拒刘备于夷陵，持重不战，待其疲惫，火攻连营四十余寨。", mod: { atk: 0.22, def: 0.12 }, tags: ["fire"] },
      { id: "shiting_dudu", name: "石亭大都督", kind: "active", cd: 5, dur: 2, desc: "黄武七年周魴诱曹休，逊假黄钺为大都督，三道俱进，斩获万余。", mod: { atk: 0.18, morale: 8 }, tags: ["rally"] },
      { id: "haichang_tuntian", name: "开仓振民", kind: "passive", desc: "为海昌屯田都尉，县连年亢旱，开仓谷以振贫民，劝督农桑。", mod: { food: 400, morale: 6 }, tags: ["logistics"] }
    ],
    traits: ["身长八尺", "深沉有谋", "手不释卷", "家无余财"],
    bio: "吴郡吴人，世江东大族。少孤，随从祖庐江太守陆康在官。孙权为将军，逊年二十一始仕幕府，出为海昌屯田都尉，开仓振贫，劝督农桑。黄武元年拒刘备于夷陵，火攻破其连营；七年假黄钺为大都督，破曹休于石亭。赤乌七年代顾雍为丞相。因二宫之争议，权累遣中使责让，逊愤恚致卒，时年六十三，家无余财。",
    appear: [203, 245],
    impact: 5
  },
  "zhuge_jin": {
    id: "zhuge_jin",
    name: "诸葛瑾",
    zi: "子瑜",
    aka: ["大将军", "左都护"],
    birth: 174,
    death: 241,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 72, war: 60, int: 88, pol: 86, cha: 86 },
    skills: [
      { id: "wei_mian_zhi_jie", name: "退无私面", kind: "passive", desc: "建安二十年使蜀通好刘备，与弟亮俱公会相见，退无私面。", mod: { morale: 8, xp: 0.08 }, tags: ["ritual"] },
      { id: "weijian_fengcai", name: "微见风彩", kind: "aura", desc: "与权谈说谏喻未尝切愕，粗陈指归，权意往往而释。", mod: { atk: 0.07, morale: 6 }, tags: ["insight"] }
    ],
    traits: ["居丧至孝", "事继母恭谨", "妻死不改娶", "笃慎省约"],
    bio: "琅邪阳都人。少游京师，治《毛诗》《尚书》《左氏春秋》，遭母忧居丧至孝。汉末避乱江东，值孙策卒，孙权姊婿曲阿弘咨荐之。建安二十年奉使使蜀通好刘备，与弟诸葛亮俱公会相见，退无私面。权称尊号，拜大将军、左都护，领豫州牧。与权谈说谏喻未尝切愕，微见风彩而权意往往释。赤乌四年卒，年六十八。",
    appear: [200, 241],
    impact: 4
  },
  "zhuge_ke": {
    id: "zhuge_ke",
    name: "诸葛恪",
    zi: "元逊",
    aka: ["太傅", "阳都侯"],
    birth: 203,
    death: 253,
    faction: "wu",
    roles: ["strategist"],
    stats: { lead: 80, war: 74, int: 88, pol: 70, cha: 72 },
    skills: [
      { id: "dongxing_dajie", name: "东兴大捷", kind: "active", cd: 5, dur: 3, desc: "建兴元年率军拒魏于东兴，大破魏军，杀韩综、桓嘉等。", mod: { atk: 0.2, morale: 10 }, tags: ["rally"] },
      { id: "bianjie_yingji", name: "辩论应机", kind: "passive", desc: "少有才名，辩论应机莫与为对，权谓瑾曰「蓝田生玉」。", mod: { xp: 0.14, vision: 2 }, tags: ["insight"] }
    ],
    traits: ["长七尺六寸", "才捷善辩", "刚愎自用", "矜己陵人"],
    bio: "诸葛瑾长子。少知名，与顾谭、张休等侍太子登讲论道艺。权临终，以大将军领太子太傅受遗诏辅政。建兴元年率军拒魏于东兴，大破之，进封阳都侯；次年违众出军围合肥新城，攻守连月，士卒疲劳、疫病大作，死者大半，引还。孙峻与孙亮合谋，于宴中诛之，夷三族。（陈寿评其「骄且吝，能无败乎」）",
    quote: "蓝田生玉，真不虚也",
    appear: [222, 253],
    impact: 4
  },
  "zhang_zhao": {
    id: "zhang_zhao",
    name: "张昭",
    zi: "子布",
    aka: ["娄侯", "辅吴将军"],
    birth: 156,
    death: 236,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 66, war: 54, int: 86, pol: 88, cha: 82 },
    skills: [
      { id: "neishi_bujue", name: "内事不决", kind: "passive", desc: "孙策委以文武之事，临终属以后事；策尝言若仲谋不任事，君便自取之。", mod: { citydef: 0.12, morale: 8 }, tags: ["guard"] },
      { id: "lijian_bujin", name: "切谏不进", kind: "passive", desc: "谏孙权勿遣使辽东，权不听，昭称疾不朝，权烧其门，昭更闭户。", mod: { morale: 6, def: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["善隶书", "容貌矜严", "有威风", "举邦惮之"],
    bio: "彭城人。少好学，善隶书，从白侯子安受《左氏春秋》。汉末避乱南渡，孙策创业，以昭为长史，文武之事一以委之。权统事，昭与周瑜等共辅之。性刚直，谏遣使辽东不听，称疾不朝，权烧其门，昭闭户不出，权乃载以还宫。容貌矜严有威风，权尝曰「孤与张公言，不敢妄也」。年八十一，嘉禾五年卒，谥文侯。",
    quote: "孤与张公言，不敢妄也",
    appear: [195, 236],
    impact: 4
  },
  "zhang_hong": {
    id: "zhang_hong",
    name: "张纮",
    zi: "子纲",
    aka: ["正议校尉", "东部都尉"],
    birth: 153,
    death: 212,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 60, war: 50, int: 84, pol: 84, cha: 78 },
    skills: [
      { id: "quan_xing_dianxue", name: "劝兴学业", kind: "passive", desc: "劝孙权讲习经传、求贤纳士，权敬纳之，江东文教始兴。", mod: { xp: 0.12, morale: 6 }, tags: ["scholar"] },
      { id: "jianbu_moling", name: "请都秣陵", kind: "passive", desc: "说孙权宜出都秣陵，权从之，遂为建业立基之地。", mod: { citydef: 0.12, gold: 200 }, tags: ["fortify"] }
    ],
    traits: ["游学京师", "治京氏易", "谏策临阵", "与昭分守"],
    bio: "广陵人。少游学京都，入太学事博士韩宗，治《京氏易》《欧阳尚书》，又从濮阳闿受《韩诗》《礼记》《左氏春秋》。避难江东，孙策创业委质焉，表为正议校尉，与张昭并参谋，常令一人居守、一人从征。后以曹操表为会稽东部都尉，权以为长史。劝权都秣陵。建安十七年还吴，道病卒。",
    appear: [194, 212],
    impact: 3
  },
  "gu_yong": {
    id: "gu_yong",
    name: "顾雍",
    zi: "元叹",
    aka: ["醴陵侯", "丞相"],
    birth: 168,
    death: 243,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 62, war: 48, int: 86, pol: 90, cha: 84 },
    skills: [
      { id: "buyan_yanyouzhong", name: "不言言必有中", kind: "aura", desc: "为人不饮酒、寡言语，举动的当；权叹顾君不言，言必有中。", mod: { atk: 0.07, morale: 6 }, tags: ["insight"] },
      { id: "mixian_buxielou", name: "密闻不宣", kind: "passive", desc: "访逮民间及政职所宜，辄密以闻；见纳则归之于上，不用终不宣泄。", mod: { recruit: 0.1, citydef: 0.08 }, tags: ["logistics"] }
    ],
    traits: ["从蔡邕学琴书", "举动的当", "所执者正", "家门有礼"],
    bio: "吴郡吴人。从蔡邕学琴书，邕贵异之，谓「卿必成致，今以吾名与卿」，故雍与蔡邕同名而字元叹。弱冠为合肥长，转在娄、曲阿、上虞，皆有治迹。孙权领会稽太守，以雍为丞，行太守事。权为吴王，累迁大理、奉常，领尚书令；后代孙邵为丞相，平尚书事，为相十九年。赤乌六年卒，年七十六，谥肃侯。",
    appear: [200, 243],
    impact: 4
  },
  "bu_zhi": {
    id: "bu_zhi",
    name: "步骘",
    zi: "子山",
    aka: ["丞相", "临湘侯"],
    birth: null,
    death: 247,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 70, war: 58, int: 82, pol: 86, cha: 80 },
    skills: [
      { id: "zhonggua_ziyang", name: "种瓜自给", kind: "passive", desc: "避乱江东单身穷困，与卫旌种瓜自给，昼勤四体，夜诵经传。", mod: { xp: 0.12, food: 200 }, tags: ["scholar"] },
      { id: "jiao_zhanshi", name: "斩吴巨定交", kind: "active", cd: 4, dur: 3, desc: "为交州刺史，降意怀诱苍梧太守吴巨，请与相见，因斩徇之。", mod: { atk: 0.15, morale: 8 }, tags: ["ambush"] }
    ],
    traits: ["宽雅深沉", "能降志辱身", "喜怒不形于色", "门内奢绮"],
    bio: "临淮淮阴人。世乱避难江东，单身穷困，与广陵卫旌种瓜自给，昼勤四体，夜诵经传。建安十五年出领鄱阳太守，徙交州刺史，诱斩苍梧太守吴巨，威声大震，士燮兄弟相率供命。权称尊号，拜骠骑将军，领冀州牧，都督西陵，代陆逊抚二境，在西陵二十年，邻敌敬其威信。赤乌九年代陆逊为丞相。后卒于位。",
    appear: [200, 247],
    impact: 4
  },
  "yan_jun": {
    id: "yan_jun",
    name: "严畯",
    zi: "曼才",
    aka: ["卫尉", "尚书令"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 54, war: 40, int: 82, pol: 78, cha: 76 },
    skills: [
      { id: "yishi_rang", name: "以实让", kind: "passive", desc: "鲁肃卒，权欲以畯代督万人镇陆口，畯固辞，发言慷慨至于流涕。", mod: { morale: 8, def: 0.06 }, tags: ["ritual"] },
      { id: "sanlu_ciqi", name: "散禄赐亲", kind: "passive", desc: "不畜禄赐，皆散之亲戚知故，家常不充，而学行不衰。", mod: { morale: 5, food: 200 }, tags: ["logistics"] }
    ],
    traits: ["少耽学", "善三礼", "性质直纯厚", "善说文"],
    bio: "彭城人。善《诗》《书》、三《礼》，避乱江东，与诸葛瑾、步骘齐名友善。张昭荐于孙权，权以为骑都尉、从事中郎。鲁肃卒，权欲以畯代肃督兵万人镇陆口，畯固辞曰「朴素书生，不闲军事」，发言慷慨至于流涕，权乃听之，世嘉其能以实让。后为尚书令，卒，年七十八，著《孝经传》《潮水论》。",
    appear: [200, 230],
    impact: 3
  },
  "cheng_bing": {
    id: "cheng_bing",
    name: "程秉",
    zi: "德枢",
    aka: ["太子太傅", "太常"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 48, war: 36, int: 84, pol: 76, cha: 76 },
    skills: [
      { id: "botong_wujing", name: "博通五经", kind: "passive", desc: "逮事郑玄，避乱交州与刘熙考论大义，遂博通五经。", mod: { xp: 0.14, morale: 5 }, tags: ["scholar"] },
      { id: "yingfei_shoulu", name: "迎妃陈礼", kind: "passive", desc: "黄武四年权为太子登娉周瑜女，秉守太常，迎妃于吴。", mod: { morale: 6, citydef: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["逮事郑玄", "士燮命为长史", "著书三万余言"],
    bio: "汝南南顿人。逮事郑玄，后避乱交州，与刘熙考论大义，遂博通五经，士燮命为长史。孙权闻其名儒，以礼征之，既到，拜太子太傅。黄武四年权为太子孙登娉周瑜女，秉守太常，迎妃于吴，权亲幸其船，深见优礼；秉从容进说婚姻人伦之始、王教之基。病卒官，著《周易摘》《尚书驳》《论语弼》，凡三万余言。",
    appear: [200, 230],
    impact: 2
  },
  "xue_zong": {
    id: "xue_zong",
    name: "薛综",
    zi: "敬文",
    aka: ["太子少傅", "选曹尚书"],
    birth: null,
    death: 243,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 52, war: 40, int: 84, pol: 82, cha: 78 },
    skills: [
      { id: "shuwu_zhishuo", name: "吴蜀字说", kind: "passive", desc: "魏使张奉嘲阚泽，综应声析「蜀」「吴」二字，坐中喜笑，奉无以对。", mod: { vision: 2, morale: 8 }, tags: ["insight"] },
      { id: "zhuding_lizan", name: "造文信辞", kind: "passive", desc: "权敕综祝祖不得用常文，综承诏卒造文义，辞令粲烂，众咸称善。", mod: { morale: 6, xp: 0.1 }, tags: ["scholar"] }
    ],
    traits: ["少明经", "善属文", "越海南征", "文赋数万言"],
    bio: "沛郡竹邑人，少明经，善属文，有秀才，少依族人避地交州，从刘熙学。士燮附孙权，召综为五官中郎将，除合浦、交阯太守；交土始开，刺史吕岱率师讨伐，综与俱行，越海南征，及到九真。赤乌三年徙选曹尚书，五年为太子少傅，领选职，六年春卒，著诗赋难论数万言，名《私载》。",
    appear: [200, 243],
    impact: 3
  },
  "kan_ze": {
    id: "kan_ze",
    name: "阚泽",
    zi: "德润",
    aka: ["太子太傅", "都乡侯"],
    birth: null,
    death: 243,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 50, war: 36, int: 86, pol: 78, cha: 80 },
    skills: [
      { id: "yongshu_gongbi", name: "佣书供纸笔", kind: "passive", desc: "家世农夫，居贫常为人佣书，所写既毕，诵读亦遍。", mod: { xp: 0.14, morale: 4 }, tags: ["scholar"] },
      { id: "qianxiang_li", name: "乾象历注", kind: "passive", desc: "兼通历数，著《乾象历注》以正时日，朝议经典所疑辄咨访之。", mod: { vision: 2, xp: 0.1 }, tags: ["scholar"] }
    ],
    traits: ["家世农夫", "谦恭笃慎", "抗礼小吏", "儒者之望"],
    bio: "会稽山阴人。至泽好学，居贫无资，常为人佣书以供纸笔，所写既毕，诵读亦遍，兼通历数，由是显名。察孝廉，除钱唐长，迁郴令。孙权为骠骑将军，辟补西曹掾；及称尊号，以泽为尚书。嘉禾中为中书令，加侍中；赤乌五年拜太子太傅。斟酌诸家，刊约礼文，又著《乾象历注》以正时日。赤乌六年冬卒。",
    appear: [200, 243],
    impact: 3
  },
  "yu_fan": {
    id: "yu_fan",
    name: "虞翻",
    zi: "仲翔",
    aka: ["骑都尉", "国之周舍"],
    birth: 164,
    death: 233,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 50, war: 48, int: 88, pol: 60, cha: 62 },
    skills: [
      { id: "kuangzhi_zhijian", name: "狂直尽言", kind: "passive", desc: "数犯颜谏争，权尝手剑欲击之，赖刘基谏免；权后称为国之周舍。", mod: { atk: 0.06, morale: 6 }, tags: ["insight"] },
      { id: "yizhu_zhuanxue", name: "注易释玄", kind: "passive", desc: "徙交州讲学不辍，注《易》《老子》《论语》《国语》，门徒常数十人。", mod: { xp: 0.15, morale: 4 }, tags: ["scholar"] }
    ],
    traits: ["少好学有高气", "古之狂直", "徙弃不忘国", "著书传世"],
    bio: "会稽余姚人。太守王朗命为功曹；孙策征会稽，翻劝朗避策，朗不能用。后归孙策。权以为骑都尉，数犯颜谏争，权不能容。尝乘船与麋芳相逢，叱之曰「失忠与信，何以事君」。后徙交州，虽在徙弃，心不忘国，又徙苍梧猛陵，讲学不辍，注《易》《老子》《论语》《国语》传世。年七十卒，归葬旧墓。",
    quote: "失忠与信，何以事君",
    appear: [196, 233],
    impact: 4
  },
  "luo_tong": {
    id: "luo_tong",
    name: "骆统",
    zi: "公绪",
    aka: ["偏将军", "新阳亭侯"],
    birth: null,
    death: 228,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 66, war: 62, int: 78, pol: 80, cha: 78 },
    skills: [
      { id: "renai_shizhong", name: "仁爱施众", kind: "passive", desc: "时饥荒，乡里及远方客多困乏，统为之饮食衰少，士大夫糟糠不足我何心独饱。", mod: { recruit: 0.12, morale: 8 }, tags: ["rally"] },
      { id: "kangshu_mingyi", name: "抗疏明义", kind: "passive", desc: "数陈便宜，前后书数十上；又上疏谏征辽东，所言皆善。", mod: { vision: 2, food: 200 }, tags: ["insight"] }
    ],
    traits: ["事适母甚谨", "以义自持", "占募之弊必陈"],
    bio: "会稽乌伤人。父骆俊官至陈相，为袁术所害；统母改适为华歆小妻，统时八岁，随亲客归会稽，事适母甚谨，拜辞上车而面不顾，曰「不欲增母思」。时饥荒，乡里及远方客多有困乏，统为之饮食衰少。以随陆逊破蜀军于宜都，迁偏将军；黄武初与严圭共拒曹仁别将常雕等，后为濡须督。年三十六，黄武七年卒。",
    appear: [205, 228],
    impact: 3
  },
  "lu_ji": {
    id: "lu_ji",
    name: "陆绩",
    zi: "公纪",
    aka: ["郁林太守", "偏将军"],
    birth: 187,
    death: 219,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 48, war: 40, int: 82, pol: 70, cha: 78 },
    skills: [
      { id: "huaiju_yimu", name: "怀橘遗母", kind: "passive", desc: "年六岁于九江见袁术，怀橘三枚以遗母，术大奇之。", mod: { morale: 8, heal: 0.06 }, tags: ["ritual"] },
      { id: "huntian_yi", name: "作浑天图", kind: "passive", desc: "虽有军事，著述不废，作《浑天图》，注《易》释《玄》。", mod: { vision: 2, xp: 0.12 }, tags: ["scholar"] }
    ],
    traits: ["容貌雄壮", "博学多识", "有志儒雅", "豫知亡日"],
    bio: "吴郡吴人，父陆康为汉末庐江太守。年六岁于九江见袁术，怀橘三枚，去时堕地，跪答「欲归遗母」。孙策在吴，张昭、张纮、秦松为上宾共论武治，绩年少末坐，大声言当修文德以来远人，昭等异焉。孙权统事，辟为奏曹掾，出为郁林太守。著述不废，作《浑天图》，注《易》释《玄》。豫自知亡日，年三十二卒。",
    quote: "从今已去，六十年之外，车同轨，书同文",
    appear: [200, 219],
    impact: 3
  },
  "lu_mao": {
    id: "lu_mao",
    name: "陆瑁",
    zi: "子璋",
    aka: ["议郎", "丞相弟"],
    birth: null,
    death: 239,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 48, war: 38, int: 80, pol: 82, cha: 80 },
    skills: [
      { id: "gewu_fengyue", name: "割少分甘", kind: "passive", desc: "陈融、濮阳逸、蒋纂等单贫有志者就瑁游处，瑁割少分甘，与同丰约。", mod: { recruit: 0.12, morale: 8 }, tags: ["rally"] },
      { id: "jianting_yan", name: "谏止远征", kind: "passive", desc: "权欲讨公孙渊，瑁上疏言舍近治远以疲军旅，权览书嘉其词理端切。", mod: { vision: 3, food: 200 }, tags: ["insight"] }
    ],
    traits: ["少好学笃义", "抚养孤弱", "词理端切"],
    bio: "吴郡吴人，丞相陆逊之弟。陈国陈融、陈留濮阳逸、沛郡蒋纂、广陵袁迪等皆单贫有志，就瑁游处，瑁割少分甘，与同丰约。同郡徐原素不相识，临死遗书托以孤弱。又从父陆绩早亡，瑁迎摄养其子女至长乃别。尚书暨艳盛明臧否，瑁与书劝其远模仲尼、弃瑕录用。孙权欲讨公孙渊，瑁上疏谏止。赤乌二年卒。",
    appear: [210, 239],
    impact: 2
  },
  "shi_yi": {
    id: "shi_yi",
    name: "是仪",
    zi: "子羽",
    aka: ["都亭侯", "尚书仆射"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 46, war: 38, int: 80, pol: 84, cha: 78 },
    skills: [
      { id: "zhuan_dian_miji", name: "专典机密", kind: "passive", desc: "孙权拜为骑都尉，专典机密；吕蒙图袭关羽，仪善其计。", mod: { vision: 2, citydef: 0.08 }, tags: ["insight"] },
      { id: "bu_dao_ren_duan", name: "未尝盲人之短", kind: "aura", desc: "事国数十年未尝有过，吕壹历白将相独无以白仪，权叹焉。", mod: { atk: 0.07, morale: 8 }, tags: ["guard"] }
    ],
    traits: ["本姓氏", "俭以自持", "不受施惠", "遗令素棺"],
    bio: "北海营陵人，本姓氏。郡相孔融嘲仪，言「氏」字「民」无上，可改为「是」，遂改焉。孙权承摄大业，优文征仪，专典机密，拜骑都尉；吕蒙图袭关羽，权以问仪，仪善其计，劝权听之。时时有所进达，未尝言人之短。吕壹历白将相大臣，独无以白仪。及寝疾，遗令素棺，年八十一卒。",
    appear: [200, 232],
    impact: 3
  },
  "wu_can": {
    id: "wu_can",
    name: "吾粲",
    zi: "孔休",
    aka: ["太子太傅", "会稽太守"],
    birth: null,
    death: 245,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 62, war: 58, int: 76, pol: 78, cha: 80 },
    skills: [
      { id: "jiushi_ruozi", name: "救人穷厄", kind: "passive", desc: "洞口之役大风吹船，粲令船人承取溺水者，所活百余人。", mod: { heal: 0.15, morale: 8 }, tags: ["guard"] },
      { id: "mingdizhi", name: "抗言明嫡庶", kind: "passive", desc: "遭二宫之变，抗言执正，明嫡庶之分，欲使鲁王霸出驻夏口。", mod: { morale: 6, citydef: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["起于孤微", "与陆逊比肩", "以正丧身"],
    bio: "吴郡乌程人。孙河为县长时，粲为小吏，河深奇之，表粲为曲阿丞，迁长史；虽起孤微，与同郡陆逊、卜静等比肩齐声。黄武元年与吕范、贺齐等以舟师拒曹休于洞口，值大风吹断绠绁，粲独令船人承取溺水者，所活百余人。后迁太子太傅，遭二宫之变，抗言执正，为鲁王霸、杨竺等所谮害，下狱诛。",
    appear: [205, 245],
    impact: 3
  },
  "zhang_wen": {
    id: "zhang_wen",
    name: "张温",
    zi: "惠恕",
    aka: ["太子太傅", "辅义中郎将"],
    birth: 193,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 56, war: 44, int: 84, pol: 70, cha: 84 },
    skills: [
      { id: "wencai_junmao", name: "文藻俊茂", kind: "passive", desc: "少修节操，容貌奇伟，文辞占对，观者倾竦，顾雍称其当今无辈。", mod: { xp: 0.14, morale: 6 }, tags: ["scholar"] },
      { id: "fengshi_shu", name: "奉使称旨", kind: "active", cd: 5, dur: 2, desc: "以辅义中郎将使蜀，蜀甚贵其才，诸葛亮亦重之。", mod: { atk: 0.08, morale: 8 }, tags: ["rally"] }
    ],
    traits: ["容貌奇伟", "才藻俊茂", "清浊太明", "以名见废"],
    bio: "吴郡吴人，父张允以轻财重士名显州郡。温少修节操，容貌奇伟，孙权召见，文辞占对，观者倾竦，拜议郎、选曹尚书，徙太子太傅。年三十二以辅义中郎将使蜀，蜀甚贵其才。权既衔其称美蜀政，又嫌其名盛，会暨艳事起，遂斥还本郡；后六年病卒。诸葛亮闻其败，思之数日曰「其人于清浊太明，善恶太分」。",
    appear: [215, 240],
    impact: 3
  },
  "ji_yan": {
    id: "ji_yan",
    name: "暨艳",
    zi: "子休",
    aka: ["选曹尚书"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 44, war: 36, int: 74, pol: 52, cha: 48 },
    skills: [
      { id: "qingyi_hehe", name: "核选三署", kind: "passive", desc: "弹射百僚，核选三署，率皆贬高就下，降损数等，守故者十未能一。", mod: { citydef: 0.1, morale: -6 }, tags: ["dread"] }
    ],
    traits: ["性狷厉", "好为清议", "臧否分明", "终以自杀"],
    bio: "吴郡人，张温引致之，以为选曹郎，至尚书。见时郎署混浊淆杂、多非其人，欲臧否区别、贤愚异贯；弹射百僚，核选三署，率皆贬高就下，降损数等，其居位贪鄙、志节污卑者皆以为军吏，置营府以处之。怨愤之声积，浸润之谮行，竞言艳及选曹郎徐彪专用私情，艳、彪皆坐自杀。（《三国志·张温传》）",
    appear: [220, 230],
    impact: 2
  },
  "lv_yi": {
    id: "lv_yi",
    name: "吕壹",
    aka: ["中书典校事", "校事"],
    birth: null,
    death: 238,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 30, war: 30, int: 66, pol: 40, cha: 24 },
    skills: [
      { id: "zuowei_zuofu", name: "渐作威福", kind: "passive", desc: "与秦博为中书典校，造作榷酤障管之利，举罪纠奸，纤介必闻。", mod: { gold: 600, morale: -8 }, tags: ["dread"] },
      { id: "shengan_chouwu", name: "深案丑诬", kind: "passive", desc: "深案丑诬，毁短大臣，顾雍、步骘等皆见举白，用被谴让。", mod: { vision: 3, morale: -6 }, tags: ["dread"] }
    ],
    traits: ["性苛惨", "用法深刻", "排陷无辜", "终以伏诛"],
    bio: "孙权所任校事。初与秦博为中书，典校诸官府及州郡文书，渐作威福，造作榷酤障管之利，举罪纠奸，纤介必闻，深案丑诬，毁短大臣，排陷无辜，顾雍等皆见举白而被谴让。太子孙登数谏不纳，大臣莫敢言；潘濬欲因会手刃之。后奸罪发露，收系廷尉，赤乌元年伏诛，孙权引咎责躬。（《三国志·顾雍传》）",
    appear: [230, 238],
    impact: 2
  },
  "teng_yin": {
    id: "teng_yin",
    name: "滕胤",
    zi: "承嗣",
    aka: ["大司马", "高密侯"],
    birth: 206,
    death: 256,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 64, war: 54, int: 80, pol: 86, cha: 84 },
    skills: [
      { id: "jieshi_yuqin", name: "接士愈勤", kind: "aura", desc: "宠任弥高而接士愈勤，表奏书疏皆自经意，不以委下。", mod: { atk: 0.07, morale: 8 }, tags: ["rally"] },
      { id: "zhouye_bu_mian", name: "通晓不寐", kind: "passive", desc: "为都下督掌统留事，白日接宾客，夜省文书，或通晓不寐。", mod: { citydef: 0.12, food: 200 }, tags: ["logistics"] }
    ],
    traits: ["少有节操", "美容仪", "弱冠尚公主", "颜色不变谈笑若常"],
    bio: "北海剧人。父滕胄避乱渡江依刘繇，善属文，孙权常令润色军国书疏。权为吴王，追录旧恩，封胤都亭侯。胤年十二而孤，弱冠尚公主；年三十起家为丹杨太守，所在见称。太元元年与诸葛恪等同受诏辅太子。孙亮即位加卫将军，后迁大司马。太平元年与吕据谋废孙綝，被围，谈笑若常，遂见杀，夷三族。",
    appear: [230, 256],
    impact: 3
  },
  "puyang_xing": {
    id: "puyang_xing",
    name: "濮阳兴",
    zi: "子元",
    aka: ["丞相", "外黄侯"],
    birth: null,
    death: 264,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 48, war: 42, int: 66, pol: 58, cha: 56 },
    skills: [
      { id: "jian_hutian", name: "建湖田之役", kind: "passive", desc: "建丹杨湖田、作浦里塘，功佣之费不可胜数，士卒死亡，百姓大怨。", mod: { food: 300, morale: -6 }, tags: ["logistics"] },
      { id: "yuli_sihao", name: "迎立之谋", kind: "passive", desc: "与张布从万彧之言，废休适子而迎立乌程侯孙皓。", mod: { gold: 200, morale: -3 }, tags: ["dread"] }
    ],
    traits: ["少有士名", "与休相结", "相表里于内", "以迎立见杀"],
    bio: "陈留人。孙权时除上虞令，稍迁至尚书左曹，以使蜀还为会稽太守；时琅邪王孙休居会稽，兴深与相结。休即位，征兴为太常卫将军、平军国事，封外黄侯。永安三年主作浦里塘，功费无算，士卒死亡，百姓大怨。后迁丞相，与左将军张布相表里。七年休薨，兴与布迎立孙皓，旋为皓收徙广州，道追杀之，夷三族。",
    appear: [235, 264],
    impact: 3
  },
  "zhang_bu": {
    id: "zhang_bu",
    name: "张布",
    aka: ["左将军", "景帝旧恩"],
    birth: null,
    death: 264,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 52, war: 56, int: 58, pol: 46, cha: 44 },
    skills: [
      { id: "yu_dingfeng_mou", name: "与奉定计", kind: "passive", desc: "与丁奉谋于会中斩孙綝，休迁布为左将军，典宫省。", mod: { atk: 0.1, morale: 6 }, tags: ["ambush"] },
      { id: "ejue_shijiang", name: "遏止侍讲", kind: "passive", desc: "恐韦曜侍讲发其阴失，妄饰说以拒遏之，休深恨布之意。", mod: { vision: -1, morale: -4 }, tags: ["dread"] }
    ],
    traits: ["休之旧恩", "典掌宫省", "专断自恣", "终以见杀"],
    bio: "孙权末为将，孙休为琅邪王居会稽时与之有旧。休即位，委以事，迁左将军。永安元年与丁奉定计，于腊会缚斩孙綝。休欲与博士祭酒韦曜、盛冲讲论道艺，布恐其入侍发己阴失，妄饰说以拒遏之。七年休薨，布与丞相濮阳兴迎立孙皓，皓既践阼，俄为中书郎万彧所谮，收布、兴徙广州，道追杀之，夷三族。",
    appear: [250, 264],
    impact: 3
  },
  "ding_gu": {
    id: "ding_gu",
    name: "丁固",
    zi: "子贱",
    aka: ["司徒", "左御史大夫"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 54, war: 44, int: 74, pol: 82, cha: 74 },
    skills: [
      { id: "mengsong_weigong", name: "梦松为公", kind: "passive", desc: "梦松树生其腹上，曰松字十八公也，后十八岁吾其为公乎，卒如所梦。", mod: { morale: 6, citydef: 0.08 }, tags: ["insight"] },
      { id: "niutun_podan", name: "牛屯破贼", kind: "passive", desc: "永安山贼施但劫孙谦至建业，固与诸葛靓逆击于牛屯，大破之。", mod: { atk: 0.12, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["家贫守约", "色养致敬", "同心忧国", "位至三公"],
    bio: "本名丁密，字子贱，因避讳改作固。阚泽见其襁褓中而奇之，曰「此儿后必致公辅」。孙休时为左御史大夫；孙皓即位迁司徒，与陆凯、孟宗同心忧国。永安山贼施但劫皓庶弟孙谦袭建业，固与诸葛靓逆击于牛屯，大破之。尝梦松树生腹上，自解曰「松字十八公」，后果为公，年七十六卒。（裴注引《吴书》）",
    appear: [250, 265],
    impact: 3
  },
  "meng_zong": {
    id: "meng_zong",
    name: "孟宗",
    zi: "恭武",
    aka: ["孟仁", "司空"],
    birth: null,
    death: 272,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 50, war: 40, int: 74, pol: 82, cha: 86 },
    skills: [
      { id: "xuntian_zhuxun", name: "哭竹生笋", kind: "passive", desc: "母嗜笋，冬节笋未生，宗入竹林哀叹，笋为之出，皆以为至孝所感。", mod: { morale: 10, food: 200 }, tags: ["ritual"] },
      { id: "zhaxian_jimu", name: "作鲊寄母", kind: "passive", desc: "为盐池司马，自结网捕鱼作鲊寄母，母还之曰为鱼官而以鲊寄我。", mod: { morale: 6, food: 200 }, tags: ["logistics"] }
    ],
    traits: ["本名宗", "少从李肃学", "犯禁奔丧", "位至司空"],
    bio: "江夏人，本名宗，字恭武，后避孙皓名讳改名仁。少从南阳李肃学。后除盐池司马，自结网捕鱼作鲊寄母，母还之曰「汝为鱼官，而以鲊寄我，非避嫌也」。迁吴令，闻母亡犯禁委官，孙权特为减死一等。母嗜笋，冬节笋未生，宗入竹林哀叹而笋出，世称至孝。累迁光禄勋、御史大夫，遂至司空，后卒。",
    quote: "但当勉之，何足泣也",
    appear: [230, 265],
    impact: 3
  },
  "lu_kai": {
    id: "lu_kai",
    name: "陆凯",
    zi: "敬风",
    aka: ["左丞相", "嘉兴侯"],
    birth: 198,
    death: 269,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 70, war: 62, int: 82, pol: 84, cha: 76 },
    skills: [
      { id: "shou_bu_shishu", name: "手不释书", kind: "passive", desc: "虽统军众，手不释书，好《太玄》，论演其意，以筮辄验。", mod: { xp: 0.14, vision: 2 }, tags: ["scholar"] },
      { id: "jianzhi_geyang", name: "谏止徼幸", kind: "passive", desc: "丁忠说孙皓弋阳可袭，凯谏止，言兵不得已而用之，皓不能用。", mod: { food: 300, morale: 6 }, tags: ["insight"] },
      { id: "zhengbian_lingnan", name: "讨朱崖儋耳", kind: "passive", desc: "赤乌中除儋耳太守，讨朱崖，斩获有功，五凤二年斩山贼陈毖于零陵。", mod: { atk: 0.12, landmove: 1 }, tags: ["barbarian"] }
    ],
    traits: ["謇谔尽规", "治迹著闻", "位至丞相", "陆逊族子"],
    bio: "吴郡吴人，丞相陆逊之族子。拜建武都尉领兵，虽统军众而手不释书，好《太玄》，以筮辄验。五凤二年讨山贼陈毖于零陵，斩毖克捷，拜巴丘督、偏将军。孙休即位拜征北将军，假节领豫州牧；孙皓立，迁镇西大将军，都督巴丘，领荆州牧，进封嘉兴侯，谏止袭弋阳之议。迁左丞相，后卒。",
    appear: [215, 265],
    impact: 4
  },
  "fan_shen": {
    id: "fan_shen",
    name: "范慎",
    aka: ["太尉", "武昌督"],
    birth: null,
    death: 273,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 66, war: 56, int: 74, pol: 80, cha: 72 },
    skills: [
      { id: "weizhong_xian", name: "威重著称", kind: "passive", desc: "陆凯论吴之名臣，谓施绩、范慎以威重显，为国之股肱。", mod: { citydef: 0.12, morale: 6 }, tags: ["guard"] },
      { id: "wuchang_du", name: "武昌督", kind: "passive", desc: "以武昌督拜太尉，镇上游之要，江防赖以肃然。", mod: { def: 0.1, watermove: 1 }, tags: ["naval"] }
    ],
    traits: ["威重显名", "镇守上游", "位至太尉"],
    bio: "吴之宿臣。陆凯上论吴之名臣时称「施绩、范慎以威重显」，与丁奉、钟离牧等并见推重。孙皓时以武昌督拜太尉，镇西陵、武昌之上游江防。陆凯论中亦称其时「典刑未灭，故老犹存」，赖此数人为股肱。后卒于太尉任上。（《三国志·孙皓传》《陆凯传》）",
    appear: [250, 265],
    impact: 2
  },
  "zhou_fang": {
    id: "zhou_fang",
    name: "周鲂",
    zi: "子鱼",
    aka: ["鄱阳太守", "昭义校尉"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 68, war: 60, int: 82, pol: 76, cha: 70 },
    skills: [
      { id: "qijian_youxiu", name: "七笺诱休", kind: "active", cd: 5, dur: 2, desc: "被命密求山中名帅，遣亲人赍笺七条以诱魏大司马曹休。", mod: { atk: 0.15, vision: 3 }, tags: ["ambush"] },
      { id: "jianjian_zhenmou", name: "间谍诱狙", kind: "passive", desc: "遣间谍授以方策，诱狙杀贼帅董嗣，由是数郡无复忧惕。", mod: { vision: 2, morale: 5 }, tags: ["insight"] }
    ],
    traits: ["少好学", "赏善罚恶", "威恩并行", "在郡十三年"],
    bio: "吴郡阳羡人。钱唐大帅彭式蚁聚为寇，以鲂为钱唐侯相，斩式首及其支党，迁丹杨西部都尉。黄武中鄱阳大帅彭绮作乱，攻没属城，乃以鲂为鄱阳太守，与胡综戮力攻讨，生禽绮送诣武昌。后受命密求山中旧族名帅，遣亲人赍笺七条以诱魏大司马曹休，休果举众入皖，陆逊大破之于石亭。在郡十三年卒。",
    appear: [210, 240],
    impact: 3
  },
  "hu_zong": {
    id: "hu_zong",
    name: "胡综",
    zi: "伟则",
    aka: ["建武中郎将", "都亭侯"],
    birth: 183,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 58, war: 54, int: 78, pol: 80, cha: 76 },
    skills: [
      { id: "dian_junmi", name: "典军国密事", kind: "passive", desc: "与是仪、徐详俱典军国密事，立解烦两部，综领右部督。", mod: { vision: 2, citydef: 0.08 }, tags: ["insight"] },
      { id: "zuo_huanglong", name: "作黄龙大牙", kind: "passive", desc: "黄龙大牙常在中军，诸军进退视其所向，权命综作赋以壮军威。", mod: { morale: 8, atk: 0.06 }, tags: ["rally"] }
    ],
    traits: ["少孤", "年十四为门下循行", "与权共读书", "文辞敏捷"],
    bio: "汝南固始人。孙策领会稽太守，综年十四为门下循行，留吴与孙权共读书。召还为书部，与是仪、徐详俱典军国密事。刘备下白帝，权使综料诸县得六千人，立解烦两部，综领右部督；又与贺齐轻行掩袭，生虏叛将晋宗。魏拜权为吴王，封综、仪、详皆为亭侯。权称尊号，作黄龙大牙，命综作赋。",
    appear: [200, 240],
    impact: 3
  },
  "xu_xiang": {
    id: "xu_xiang",
    name: "徐详",
    aka: ["侍中偏将军", "亭侯"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 50, war: 44, int: 74, pol: 76, cha: 72 },
    skills: [
      { id: "jiedu_zhangliang", name: "典掌军粮", kind: "passive", desc: "权初置节度官使典掌军粮，首用侍中偏将军徐详，详死乃议以诸葛恪代之。", mod: { food: 400 }, tags: ["logistics"] },
      { id: "zuobu_dudu", name: "解烦左部", kind: "passive", desc: "刘备下白帝，权立解烦两部，详领左部督，综领右部。", mod: { def: 0.1, morale: 5 }, tags: ["guard"] }
    ],
    traits: ["典军国密事", "与综仪齐名", "掌军粮之要"],
    bio: "孙权之亲近臣，与是仪、胡综俱典军国密事。刘备下白帝时，使胡综料诸县得六千人，立解烦两部，详领左部督。孙权初置节度官，使典掌军粮，此非汉制，首用侍中偏将军徐详；详死，将用诸葛恪，诸葛亮闻之，与陆逊书言恪性疏，恐不称职，逊以白权，即转恪领兵。（《三国志·胡综传》）",
    appear: [210, 235],
    impact: 2
  },
  "zhu_ju": {
    id: "zhu_ju",
    name: "朱据",
    zi: "子范",
    aka: ["骠骑将军", "云阳侯"],
    birth: 194,
    death: 250,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 68, war: 66, int: 72, pol: 78, cha: 82 },
    skills: [
      { id: "shang_gongzhu", name: "尚公主", kind: "passive", desc: "黄龙元年权迁都建业，征据尚公主，拜左将军，封云阳侯。", mod: { morale: 8, gold: 300 }, tags: ["ritual"] },
      { id: "yonghu_taizi", name: "拥护太子", kind: "passive", desc: "遭二宫构争，据拥护太子，言则恳至，义形于色，守之以死。", mod: { def: 0.12, morale: 8 }, tags: ["guard"] }
    ],
    traits: ["有姿貌膂力", "能论难", "谦虚接士", "轻财好施"],
    bio: "吴郡吴人。黄龙元年权迁都建业，征据尚公主，拜左将军，封云阳侯。典校吕壹疑其取部曲钱，考问主者死於杖下，据哀其无辜厚棺敛之，后得白。赤乌九年迁骠骑将军。遭二宫构争，据拥护太子，守之以死，左迁新都郡丞，未到，中书令孙弘谮润之，因权寝疾，弘为诏书追赐死，时年五十七。",
    appear: [220, 250],
    impact: 4
  },
  "zhang_ti": {
    id: "zhang_ti",
    name: "张悌",
    zi: "巨先",
    aka: ["丞相", "军师"],
    birth: null,
    death: 280,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 72, war: 62, int: 74, pol: 70, cha: 68 },
    skills: [
      { id: "xianjian_shuwang", name: "先见蜀亡", kind: "passive", desc: "魏伐蜀，吴人皆以为司马氏可乘，悌独言蜀必亡而吴将随之。", mod: { vision: 3, morale: 4 }, tags: ["insight"] },
      { id: "buke_sha_jiang", name: "不杀降者", kind: "passive", desc: "杨荷桥围张乔，乔伪降，悌曰杀降不祥，抚之而进。", mod: { morale: 6, citydef: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["少有名理", "明于事势", "临难不避"],
    bio: "襄阳人。孙休时为屯骑校尉。魏伐蜀，吴人皆谓司马氏屡遭内难、远役巴蜀必败；悌独言不然，谓蜀若覆亡则吴必随之（《襄阳记》）。后以军师为丞相。晋军大举东下，悌与护军孙震、丹杨太守沈莹帅众三万济江，进与晋扬州刺史周浚战于阪桥，吴军士崩，悌与沈莹等俱被获，死于是役。（干宝《晋纪》）",
    appear: [260, 265],
    impact: 3
  },
  "he_shao": {
    id: "he_shao",
    name: "贺邵",
    zi: "兴伯",
    aka: ["中书令", "太子太傅"],
    birth: 227,
    death: 275,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 52, war: 46, int: 80, pol: 78, cha: 72 },
    skills: [
      { id: "kangshu_zhijian", name: "抗疏极谏", kind: "passive", desc: "上疏言朝列纷错、佞谀天飞而忠良排坠，皓深恨之。", mod: { morale: 8, citydef: 0.08 }, tags: ["ritual"] },
      { id: "shouzhong_buyu", name: "守正不挠", kind: "passive", desc: "奉公贞正，亲近所惮；中风口不能言，掠考千所而卒无一语。", mod: { def: 0.12, morale: 6 }, tags: ["guard"] }
    ],
    traits: ["贺齐之孙", "奉公贞正", "亲属所惮", "竟以见杀"],
    bio: "会稽山阴人，贺齐之孙。孙休即位，从中郎为散骑中常侍；孙皓时入为左典军，迁中书令，领太子太傅。皓凶暴骄矜、政事日弊，邵上疏极谏，言「臣闻否泰无常，吉凶由人，长江限不可久恃」，皓深恨之。后邵中恶风，口不能言，去职数月，皓疑其托疾，收付酒藏，掠考千所，邵卒无一语，竟见杀害，年四十九。",
    appear: [258, 265],
    impact: 3
  },
  "wei_yao": {
    id: "wei_yao",
    name: "韦曜",
    zi: "弘嗣",
    aka: ["韦昭", "中书仆射"],
    birth: null,
    death: 273,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 44, war: 34, int: 84, pol: 72, cha: 70 },
    skills: [
      { id: "boyi_lun", name: "博弈之论", kind: "passive", desc: "太子和以博奕无益，命曜论之，谓移博奕之力用于诗书则功名立。", mod: { xp: 0.12, morale: 4 }, tags: ["scholar"] },
      { id: "zhuan_wushu", name: "撰吴书", kind: "passive", desc: "以诸葛恪表为太史令，撰《吴书》，华覈、薛莹等参同。", mod: { xp: 0.15, vision: 2 }, tags: ["scholar"] },
      { id: "zhizhi_heji", name: "执以和为传", kind: "passive", desc: "皓欲为其父和作纪，曜执以和不登帝位，宜名为传，遂积嫌忿。", mod: { morale: 6, citydef: 0.05 }, tags: ["ritual"] }
    ],
    traits: ["少好学能属文", "校定众书", "素饮酒不过二升", "竟以诛死"],
    bio: "吴郡云阳人，本名昭，史为晋讳改之。诸葛恪表为太史令，撰《吴书》，华覈、薛莹等皆与参同。孙休时为中书郎、博士祭酒，依刘向故事校定众书。孙皓即位，迁中书仆射，常领左国史。皓欲为其父和作纪，曜执以和不登帝位宜名为传；又素饮酒不过二升而皓坐席以七升为限，积前后嫌忿，收曜付狱见诛。",
    appear: [230, 265],
    impact: 3
  },
  "hua_he": {
    id: "hua_he",
    name: "华覈",
    zi: "永先",
    aka: ["东观令", "徐陵亭侯"],
    birth: null,
    death: null,
    faction: "wu",
    roles: ["minister"],
    stats: { lead: 44, war: 34, int: 80, pol: 78, cha: 70 },
    skills: [
      { id: "jiuqu_zhijian", name: "谏营新宫", kind: "passive", desc: "皓更营新宫，饰以珠玉，盛夏兴工农守并废，覈上疏力谏。", mod: { food: 400, morale: 6 }, tags: ["logistics"] },
      { id: "jiu_yaoxuan", name: "救韦曜楼玄", kind: "passive", desc: "上疏乞赦韦曜一等之罪使成书业，又请擢用楼玄以责后效。", mod: { morale: 8, xp: 0.08 }, tags: ["scholar"] }
    ],
    traits: ["以文学入", "中书本职", "屡上封事", "言多切直"],
    bio: "吴郡武进人。蜀为魏所并，覈诣宫门发表，言「失委附之土，弃贡献之国，臣以草芥，窃怀不宁」。孙皓即位，封徐陵亭侯。皓更营新宫，制度弘广，饰以珠玉，所费甚多，盛夏兴工，农守并废，覈上疏谏。后为东观令，领右国史，上疏乞赦韦曜一等之罪使成《吴书》，又请擢用楼玄责其后效。所著论并传于世。",
    appear: [250, 265],
    impact: 3
  }
};
