/* 《代汉涂高》武将文臣数据 —— 第一卷：魏、晋（司马氏）、董卓军、吕布军、袁绍军、袁术军
 * 依据《三国志》及裴松之注、《后汉书》等正史，不用演义人物与情节。
 * 年份区间：184—265。 */
window.GENERALS_PART1 = {
  "cao_cao": {
    id: "cao_cao", name: "曹操", zi: "孟德", aka: ["曹孟德", "魏武帝"],
    birth: 155, death: 220, faction: "wei", roles: ["lord"],
    stats: { lead: 96, war: 72, int: 91, pol: 94, cha: 96 },
    skills: [
      { id: "jianxiong", name: "奸雄", kind: "passive", desc: "陈留起兵，收青州黄巾三十万为青州兵，遂成霸业之基", mod: { atk: 0.10, def: 0.06 }, tags: ["insight"] },
      { id: "weicaishiju", name: "唯才是举", kind: "aura", desc: "三下求贤令，唯才是举，拔乐进、于禁于行伍之间", mod: { recruit: 0.12, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["唯才是举", "雅性节俭", "手不释卷"],
    bio: "字孟德，沛国谯人。举孝廉为郎，历洛阳北部尉、济南相。初平三年领兖州牧，收青州黄巾三十万众为青州兵。建安元年迎献帝都许，行屯田，军食以足；五年官渡破袁绍，十二年北征乌桓定河北，十三年为丞相，十八年封魏公，二十一年进魏王。著《孙子略解》。二十五年薨于洛阳。",
    quote: "设使国家无有孤，不知当几人称帝",
    appear: [184, 220], impact: 5
  },
  "cao_pi": {
    id: "cao_pi", name: "曹丕", zi: "子桓", aka: ["魏文帝"],
    birth: 187, death: 226, faction: "wei", roles: ["lord"],
    stats: { lead: 78, war: 72, int: 85, pol: 88, cha: 86 },
    skills: [
      { id: "dianlun", name: "典论论文", kind: "passive", desc: "著《典论》，谓文章为经国之大业、不朽之盛事", mod: { xp: 0.12, morale: 3 }, tags: ["scholar"] },
      { id: "jiupin", name: "九品中正", kind: "aura", desc: "延康元年采陈群议行九品中正，遂为魏世选官之制", mod: { recruit: 0.10, morale: 3 }, tags: ["scholar"] }
    ],
    traits: ["善骑射", "好文学", "猜忌刻薄"],
    bio: "字子桓，曹操次子。建安十六年为五官中郎将、副丞相，二十二年立为魏太子。二十五年嗣魏王，受汉禅即帝位，改元黄初，定都洛阳。采陈群之议行九品中正，复五铢钱未成。善属文，著《典论》。黄初七年崩，年四十，谥文。",
    quote: "文章者，经国之大业，不朽之盛事",
    appear: [203, 226], impact: 4
  },
  "cao_rui": {
    id: "cao_rui", name: "曹叡", zi: "元仲", aka: ["魏明帝"],
    birth: 204, death: 239, faction: "wei", roles: ["lord"],
    stats: { lead: 76, war: 66, int: 84, pol: 80, cha: 78 },
    skills: [
      { id: "qinlei", name: "亲临拒蜀", kind: "active", cd: 4, dur: 2, desc: "青龙二年亲至长安督军，坚守渭南以拒诸葛亮", mod: { def: 0.12, morale: 5 }, tags: ["fortify"] },
      { id: "daggongshi", name: "大营宫室", kind: "passive", desc: "性好宫室，大营洛阳宫室，役繁民困，为世所讥", mod: { gold: -30, citydef: 0.10 }, tags: ["fortify"] }
    ],
    traits: ["征伐断决", "奢于宫室", "沉毅好断"],
    bio: "字元仲，曹丕长子。黄初七年即位，改元太和。太和二年遣张郃拒蜀于街亭，青龙二年亲督军守渭南，景初二年遣司马懿平辽东公孙渊，皆克。尝诏谓先帝东置合肥、南守襄阳、西固祁山，地有所必争。性好宫室，役繁民困。景初三年崩，年三十六，谥明。",
    quote: "先帝东置合肥，南守襄阳，西固祁山",
    appear: [220, 239], impact: 4
  },
  "cao_ang": {
    id: "cao_ang", name: "曹昂", zi: "子脩",
    birth: null, death: 197, faction: "wei", roles: ["general"],
    stats: { lead: 62, war: 68, int: 58, pol: 52, cha: 70 },
    skills: [
      { id: "rangma_jiufu", name: "让马救父", kind: "passive", desc: "建安二年宛城之变，以马授曹操而步行，力战没于淯水", mod: { def: 0.14, hp: 0.12 }, tags: ["guard"] }
    ],
    traits: ["孝谨", "早慧", "举孝廉"],
    bio: "字子脩，曹操长子，刘夫人所生，养于丁夫人。弱冠举孝廉。建安二年从征张绣，张绣先降而后叛，夜袭曹操营，昂以马与父，自徒步格斗，与典韦、曹安民俱没于淯水。",
    appear: [193, 197], impact: 2
  },
  "cao_zhang": {
    id: "cao_zhang", name: "曹彰", zi: "子文", aka: ["黄须儿"],
    birth: null, death: 223, faction: "wei", roles: ["general"],
    stats: { lead: 82, war: 90, int: 55, pol: 48, cha: 66 },
    skills: [
      { id: "shouge", name: "手格猛兽", kind: "passive", desc: "少善射御，膂力过人，手格猛兽，以卫青霍去病自期", mod: { atk: 0.12, def: 0.06 }, tags: ["rally"] },
      { id: "beizheng_wuhuan", name: "北征乌桓", kind: "active", cd: 4, dur: 2, desc: "建安二十三年北征代郡乌桓，身自搏战，大破之", mod: { atk: 0.14, move: 1 }, tags: ["cavalry"] }
    ],
    traits: ["武艺壮猛", "好乘马射", "不治行检"],
    bio: "字子文，曹丕之弟。少善射御，膂力过人，手格猛兽，不避险阻，志在效卫青、霍去病。建安二十三年为北中郎将、行骁骑将军，北征代郡乌桓，身自搏战，斩获以千数，鲜卑轲比能请服。黄初三年进爵任城王，四年朝京暴薨，谥威。",
    appear: [205, 223], impact: 3
  },
  "cao_zhi": {
    id: "cao_zhi", name: "曹植", zi: "子建", aka: ["陈思王"],
    birth: 192, death: 232, faction: "wei", roles: ["minister"],
    stats: { lead: 58, war: 45, int: 88, pol: 68, cha: 90 },
    skills: [
      { id: "wencai_fuyan", name: "文才富艳", kind: "passive", desc: "年十余岁诵读诗论辞赋数十万言，下笔即成文章", mod: { xp: 0.12, morale: 4 }, tags: ["scholar"] },
      { id: "yinjiu_bujie", name: "饮酒不节", kind: "passive", desc: "性嗜酒，曾擅开司马门驰道，又醉酒不能受命", mod: { morale: -5, atk: -0.06 }, tags: ["rally"] }
    ],
    traits: ["文才富艳", "任性而行", "不自雕励"],
    bio: "字子建，曹操第三子。年十余岁诵读诗论辞赋数十万言，出言为论，下笔成章。建安十九年徙封临菑侯，曹操几欲立为嗣，终以其任性饮酒而止。黄初三年徙鄄城王，明帝时改东阿王、陈王。著《洛神赋》《七启》。太和六年卒，谥思。",
    quote: "捐躯赴国难，视死忽如归",
    appear: [208, 232], impact: 4
  },
  "cao_ren": {
    id: "cao_ren", name: "曹仁", zi: "子孝", aka: ["曹大司马"],
    birth: 168, death: 223, faction: "wei", roles: ["general"],
    stats: { lead: 88, war: 85, int: 68, pol: 60, cha: 72 },
    skills: [
      { id: "jianfan", name: "坚守樊城", kind: "passive", desc: "建安二十四年守樊城拒关羽，沉白马誓众，城得不拔", mod: { def: 0.14, citydef: 0.10 }, tags: ["fortify"] },
      { id: "tuqi", name: "突骑冲阵", kind: "active", cd: 3, dur: 2, desc: "从征徐州、吕布、张绣诸役，每战率骑先登破敌", mod: { atk: 0.14, move: 1 }, tags: ["cavalry"] }
    ],
    traits: ["严整奉法", "好弓马弋猎", "沉毅"],
    bio: "字子孝，曹操从弟。少好弓马弋猎，从起兵为别部司马，从征徐州、张绣、吕布，数有功。官渡后从平荆州，拜征南将军。建安二十四年守樊城，关羽围之，仁沉白马与将士盟誓，众感其诚，城得不拔。黄初四年拜大将军，屯合肥，是年卒，谥忠侯。",
    appear: [184, 223], impact: 4
  },
  "cao_hong": {
    id: "cao_hong", name: "曹洪", zi: "子廉",
    birth: null, death: 232, faction: "wei", roles: ["general"],
    stats: { lead: 72, war: 78, int: 60, pol: 55, cha: 58 },
    skills: [
      { id: "rangma", name: "让马济危", kind: "passive", desc: "荥阳汴水之败，以马授曹操而身步行，得脱于追兵", mod: { hp: 0.12, def: 0.08 }, tags: ["guard"] },
      { id: "linshe", name: "性吝啬", kind: "passive", desc: "家多财货而性吝啬，曹丕为太子时贷绢百匹不与", mod: { gold: 40, morale: -4 }, tags: ["logistics"] }
    ],
    traits: ["荥阳救主", "性贪吝", "忠勤"],
    bio: "字子廉，曹操从弟。初平元年从征董卓，战于荥阳汴水，失马，以己马授曹操而自乘步走，得脱于追兵。后从平兖州、荆州，官至骠骑将军，封都阳侯。家富而吝，曹丕为太子时贷绢百匹不与，黄初年间因事下狱，赖卞太后言得免。太和四年卒，谥恭侯。",
    appear: [184, 232], impact: 3
  },
  "cao_chun": {
    id: "cao_chun", name: "曹纯", zi: "子和",
    birth: null, death: 210, faction: "wei", roles: ["general"],
    stats: { lead: 80, war: 84, int: 62, pol: 50, cha: 64 },
    skills: [
      { id: "hubaoqi", name: "虎豹骑督", kind: "passive", desc: "督虎豹骑，建安十年南皮先登破袁谭，后从破乌桓", mod: { atk: 0.12, move: 1 }, tags: ["cavalry", "pursue"] }
    ],
    traits: ["督虎豹骑", "好学儒雅", "敬重儒士"],
    bio: "字子和，曹仁之弟。初以议郎参司空军事，督虎豹骑，为其精锐。建安十年从攻南皮，袁谭出战，士卒多死，纯激励将士，遂破之。十二年从征乌桓，白狼山之战以骑破虏众。性好学问，敬重儒士，及卒，曹操叹其早亡。建安十五年卒，谥威侯。",
    appear: [190, 210], impact: 3
  },
  "cao_xiu": {
    id: "cao_xiu", name: "曹休", zi: "文烈",
    birth: null, death: 228, faction: "wei", roles: ["general"],
    stats: { lead: 80, war: 74, int: 66, pol: 58, cha: 68 },
    skills: [
      { id: "qianliju", name: "千里驹", kind: "passive", desc: "自吴渡江归曹操，操称为曹家千里驹，屡统大军", mod: { move: 1, atk: 0.08 }, tags: ["cavalry"] },
      { id: "shiting", name: "石亭轻敌", kind: "passive", desc: "太和二年征吴，轻敌深入，败于石亭，惭愤发病", mod: { def: -0.10, morale: -4 }, tags: ["fortify"] }
    ],
    traits: ["曹家千里驹", "骁勇", "轻敌寡谋"],
    bio: "字文烈，曹操族子。天下大乱，年十余岁携母渡江至吴，闻曹操起兵，变易姓名转道北归，曹操见之曰此吾家千里驹也。建安二十三年为骑都尉，参曹洪军事。文帝时为镇南将军，官至大司马。太和二年征吴，败于石亭，惭愤发背疽卒，谥壮侯。",
    quote: "此吾家千里驹也",
    appear: [196, 228], impact: 3
  },
  "cao_zhen": {
    id: "cao_zhen", name: "曹真", zi: "子丹",
    birth: null, death: 231, faction: "wei", roles: ["general"],
    stats: { lead: 84, war: 80, int: 68, pol: 62, cha: 72 },
    skills: [
      { id: "yongliang", name: "都督雍凉", kind: "passive", desc: "都督雍凉，拒诸葛亮于街亭、陈仓，魏之西陲倚之", mod: { def: 0.12, siege: 0.08 }, tags: ["fortify"] },
      { id: "jiguzu", name: "箕谷拒敌", kind: "active", cd: 4, dur: 2, desc: "太和二年自出箕谷，拒赵云、邓芝之偏师，蜀军乃退", mod: { atk: 0.10, def: 0.08 }, tags: ["pike"] }
    ],
    traits: ["沉勇", "善抚士卒", "谦让"],
    bio: "字子丹，曹操族子，养于宫中，与曹丕相亲。黄初三年与夏侯尚等围吴江陵，未拔。明帝即位拜大将军，太和二年遣张郃破马谡于街亭，自率军拒赵云、邓芝于箕谷，遂收三郡。四年伐蜀，会大雨班师。五年卒。",
    appear: [195, 231], impact: 4
  },
  "cao_shuang": {
    id: "cao_shuang", name: "曹爽", zi: "昭伯",
    birth: null, death: 249, faction: "wei", roles: ["minister"],
    stats: { lead: 62, war: 55, int: 60, pol: 58, cha: 62 },
    skills: [
      { id: "zhuanquan", name: "擅权自用", kind: "passive", desc: "受遗诏辅政而专权自用，广树何晏、邓飏等亲党", mod: { gold: 40, morale: -5 }, tags: ["logistics"] },
      { id: "gaopingling", name: "高平陵犹豫", kind: "passive", desc: "正始十年随帝谒高平陵，犹豫归降，遂夷三族", mod: { def: -0.12, vision: -1 }, tags: ["rally"] }
    ],
    traits: ["明帝所亲", "骄奢专断", "优柔寡断"],
    bio: "字昭伯，曹真之子。明帝寝疾，拜大将军，与司马懿并受遗诏辅政。正始年间专擅朝政，用何晏、邓飏、丁谧等，屡伐蜀无功。正始十年正月随帝谒高平陵，司马懿闭洛阳城门举兵，爽犹豫不决，终归降，遂与诸弟及亲党俱夷三族。",
    appear: [222, 249], impact: 4
  },
  "xiahou_dun": {
    id: "xiahou_dun", name: "夏侯惇", zi: "元让",
    birth: null, death: 220, faction: "wei", roles: ["general"],
    stats: { lead: 82, war: 80, int: 62, pol: 72, cha: 80 },
    skills: [
      { id: "zuopo", name: "断水作陂", kind: "passive", desc: "领陈留、济阴太守，断太寿水作陂，率将士劝种稻", mod: { food: 50, landmove: 1 }, tags: ["logistics"] },
      { id: "lieqi", name: "烈气", kind: "passive", desc: "年十四杀辱师者，以烈气闻名；从曹操起兵为裨将", mod: { atk: 0.08, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["性清俭", "余财分施", "烈气"],
    bio: "字元让，沛国谯人。年十四有人辱其师，惇杀之，以烈气闻。从曹操起兵为裨将，从征吕布，为流矢所中，伤左目。领陈留、济阴太守，断太寿水作陂，身自负土，率将士劝种稻，民赖其利。性清俭，有余财辄分施之。建安二十五年卒，谥忠侯。",
    appear: [184, 220], impact: 4
  },
  "xiahou_yuan": {
    id: "xiahou_yuan", name: "夏侯渊", zi: "妙才",
    birth: null, death: 219, faction: "wei", roles: ["general"],
    stats: { lead: 86, war: 88, int: 60, pol: 50, cha: 64 },
    skills: [
      { id: "sandan", name: "三日五百", kind: "passive", desc: "行军疾速，军中语曰三日五百、六日一千，善奔袭", mod: { move: 2, landmove: 2 }, tags: ["pursue"] },
      { id: "shou_hanzhong", name: "虎步关右", kind: "active", cd: 4, dur: 2, desc: "建安十九年平陇右，行都护将军督徐晃、张郃", mod: { atk: 0.14, move: 1 }, tags: ["cavalry"] }
    ],
    traits: ["典军校尉", "行军疾速", "勇而寡谋"],
    bio: "字妙才，夏侯惇族弟。曹操起兵，渊为别部司马、骑都尉，从平关中，行都护将军，督徐晃、张郃等征伐。建安十九年平陇右，拜征西将军，守汉中。二十四年春刘备军攻定军山，渊分兵救鹿角，为黄忠所袭，战没。谥愍侯。",
    quote: "典军校尉夏侯渊，三日五百，六日一千",
    appear: [184, 219], impact: 4
  },
  "xiahou_shang": {
    id: "xiahou_shang", name: "夏侯尚", zi: "伯仁",
    birth: null, death: 226, faction: "wei", roles: ["general"],
    stats: { lead: 78, war: 74, int: 72, pol: 68, cha: 74 },
    skills: [
      { id: "shangyong", name: "攻拔上庸", kind: "passive", desc: "建安末与徐晃攻上庸，破刘封；后又破吴将诸葛瑾", mod: { siege: 0.10, atk: 0.08 }, tags: ["siege"] }
    ],
    traits: ["布衣之交", "沉敏", "结姻宗室"],
    bio: "字伯仁，夏侯渊从子，少与曹丕为布衣之交。建安末与徐晃攻上庸，破刘封。文帝时拜征南大将军、荆州牧，破吴将诸葛瑾于江上。有爱妾为曹丕所杀，尚悲感发病。黄初七年卒，谥悼侯。",
    appear: [200, 226], impact: 3
  },
  "xiahou_xuan": {
    id: "xiahou_xuan", name: "夏侯玄", zi: "太初",
    birth: 209, death: 254, faction: "wei", roles: ["minister"],
    stats: { lead: 70, war: 60, int: 82, pol: 78, cha: 86 },
    skills: [
      { id: "qingtan", name: "正始清谈", kind: "passive", desc: "与何晏、王弼清谈玄理，为士林所推，有声名", mod: { xp: 0.10, morale: 4 }, tags: ["scholar"] },
      { id: "yaliang", name: "临刑雅量", kind: "passive", desc: "与李丰等谋诛司马师，事泄被收，临刑颜色不变", mod: { def: 0.08, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["雅量高致", "清谈名士", "为李丰之狱所诛"],
    bio: "字太初，夏侯尚之子。少有声名，与何晏、王弼等清谈玄理，为士林所推。正始年间为征西将军、太常。嘉平六年与李丰、张缉等谋诛司马师，事泄下狱，夷三族，年四十六，临刑神色不变。",
    appear: [225, 254], impact: 3
  },
  "xun_yu": {
    id: "xun_yu", name: "荀彧", zi: "文若", aka: ["荀令君"],
    birth: 163, death: 212, faction: "wei", roles: ["strategist"],
    stats: { lead: 78, war: 52, int: 95, pol: 92, cha: 92 },
    skills: [
      { id: "wangzuo", name: "王佐之才", kind: "aura", desc: "居中持重十余年，为曹操筹画，操称为吾之子房", mod: { def: 0.08, morale: 5 }, tags: ["rally"] },
      { id: "fengtianzi", name: "奉迎天子", kind: "active", cd: 4, dur: 2, desc: "建安元年劝曹操迎献帝都许，奉天子以令不臣", mod: { gold: 60, morale: 8 }, tags: ["ritual"] }
    ],
    traits: ["清秀通雅", "折节下士", "以忧薨"],
    bio: "字文若，颍川颍阴人。永汉元年举孝廉，拜守宫令，后去袁绍归曹操为司马。建安元年劝迎献帝都许，为侍中、尚书令，居中持重十余年，军国大事皆与筹之。十七年以谏进爵魏公、加九锡，忧薨，谥敬侯。",
    quote: "吾之子房也",
    appear: [189, 212], impact: 5
  },
  "xun_you": {
    id: "xun_you", name: "荀攸", zi: "公达",
    birth: 157, death: 214, faction: "wei", roles: ["strategist"],
    stats: { lead: 72, war: 58, int: 93, pol: 82, cha: 82 },
    skills: [
      { id: "shengdongjixi", name: "声东击西", kind: "passive", desc: "官渡之战献声东击西之策斩颜良，又劝焚其粮车", mod: { atk: 0.10, vision: 1 }, tags: ["insight"] },
      { id: "shentou", name: "深密有智防", kind: "passive", desc: "前后画奇策十二，外愚内智，为曹操谋主之首", mod: { def: 0.08, morale: 3 }, tags: ["guard"] }
    ],
    traits: ["外愚内智", "不伐善", "深密有智防"],
    bio: "字公达，荀彧从子。何进秉政时拜黄门侍郎，与郑泰、何颙等谋诛董卓，事泄下狱，会卓死得免。后归曹操为军师，官渡之战献策斩颜良、烧袁绍粮车，前后画奇策十二。建安十九年从征孙权，道卒，年五十八。",
    quote: "公达外愚内智，外怯内勇",
    appear: [184, 214], impact: 4
  },
  "jia_xu": {
    id: "jia_xu", name: "贾诩", zi: "文和",
    birth: 147, death: 223, faction: "wei", roles: ["strategist"],
    stats: { lead: 70, war: 55, int: 94, pol: 86, cha: 70 },
    skills: [
      { id: "shenmou", name: "算无遗策", kind: "passive", desc: "为张绣谋主，劝绣降曹操；官渡力主与袁绍决战", mod: { def: 0.12, vision: 1 }, tags: ["insight"] },
      { id: "liminzhiji", name: "离间之谋", kind: "active", cd: 4, dur: 2, desc: "潼关之战献离间之策，使马超、韩遂相疑，遂破之", mod: { atk: 0.12, morale: 4 }, tags: ["ambush"] }
    ],
    traits: ["阖门自守", "退无私交", "明哲保身"],
    bio: "字文和，武威姑臧人。少有名，阎忠异之。初为董卓部曲，卓死，说李傕、郭汜反攻长安。后为张绣谋主，劝绣降曹操。官渡之战劝曹操决战，又从破马超于潼关。官至太中大夫、魏国太尉，寿终，年七十七，谥肃侯。",
    quote: "使我信重于天下者，子也",
    appear: [189, 223], impact: 4
  },
  "guo_jia": {
    id: "guo_jia", name: "郭嘉", zi: "奉孝",
    birth: 170, death: 207, faction: "wei", roles: ["strategist"],
    stats: { lead: 68, war: 50, int: 97, pol: 80, cha: 84 },
    skills: [
      { id: "shishengshibai", name: "十胜十败", kind: "passive", desc: "官渡前为曹操陈十胜十败之论，劝其决意击袁绍", mod: { atk: 0.10, morale: 6 }, tags: ["insight"] },
      { id: "qingbing", name: "轻兵兼道", kind: "active", cd: 3, dur: 2, desc: "北征乌桓建言轻兵兼道，出其不意，遂破蹋顿", mod: { move: 2, atk: 0.12 }, tags: ["pursue"] }
    ],
    traits: ["通达事理", "洞悉人心", "天妒英才"],
    bio: "字奉孝，颍川阳翟人。初谒袁绍，度绍不能成大事，去之。经荀彧荐为曹操司空祭酒，参画军国。官渡论十胜十败，又从征吕布、袁绍、乌桓，屡中机宜。建安十二年还军途中病卒，年三十八。曹操痛之，谥贞侯。",
    quote: "使孤成大业者，必此人也",
    appear: [186, 207], impact: 5
  },
  "cheng_yu": {
    id: "cheng_yu", name: "程昱", zi: "仲德",
    birth: 141, death: 220, faction: "wei", roles: ["strategist"],
    stats: { lead: 76, war: 66, int: 84, pol: 78, cha: 66 },
    skills: [
      { id: "bao_sancheng", name: "保三城", kind: "active", cd: 4, dur: 2, desc: "曹操征徐州，与荀彧守鄄城，说降范、东阿拒吕布", mod: { def: 0.14, citydef: 0.12 }, tags: ["fortify"] }
    ],
    traits: ["长八尺三寸", "美须髯", "刚戾"]
    ,
    bio: "字仲德，东郡东阿人。长八尺三寸，美须髯。初从刘岱，后归曹操为寿张令。曹操征徐州，张邈、陈宫迎吕布，昱与荀彧固守鄄城，说降范县、东阿，遂保三城。后为奋武将军，封安国亭侯，官至卫尉。黄初元年卒，年八十，谥肃侯。",
    appear: [184, 220], impact: 3
  },
  "liu_ye": {
    id: "liu_ye", name: "刘晔", zi: "子扬",
    birth: null, death: 234, faction: "wei", roles: ["strategist"],
    stats: { lead: 70, war: 62, int: 88, pol: 72, cha: 68 },
    skills: [
      { id: "liaodi", name: "明于料敌", kind: "passive", desc: "既得汉中劝曹操乘势取蜀，操不能用，遂失其机", mod: { vision: 2, atk: 0.06 }, tags: ["insight"] }
    ],
    traits: ["光武之后", "机警善料", "屡直言见疏"],
    bio: "字子扬，淮南成德人，汉光武帝子阜陵王延之后。初为曹操司空仓曹掾、主簿，从征张鲁，劝曹操既得汉中即乘势攻蜀，操不能用。历事三朝，官至侍中、太中大夫。性机警，善料事，然屡以直言见疏。明帝青龙二年卒。",
    appear: [196, 234], impact: 3
  },
  "jiang_ji": {
    id: "jiang_ji", name: "蒋济", zi: "子通",
    birth: 188, death: 249, faction: "wei", roles: ["minister"],
    stats: { lead: 66, war: 55, int: 85, pol: 84, cha: 72 },
    skills: [
      { id: "jianxima", name: "谏止徙民", kind: "passive", desc: "曹操欲徙淮南民内移，济力谏不听，民皆惊走入吴", mod: { recruit: 0.10, morale: 4 }, tags: ["rally"] },
      { id: "kuangzheng", name: "定乱之勋", kind: "passive", desc: "高平陵之变说降曹爽，事定进爵都乡侯，官至太尉", mod: { def: 0.08, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["通晓时务", "善论事", "晚节附司马氏"],
    bio: "字子通，楚国平阿人。初仕扬州为别驾，曹操欲徙淮南民内移，济力谏不听，江淮十余万众惊走入吴。后为曹操主簿、丞相西曹属。文帝时为护军将军，明帝时为散骑常侍。齐王芳时官至太尉，高平陵之变赞司马懿行事，封都乡侯。正始十年卒，谥景侯。",
    appear: [205, 249], impact: 3
  },
  "dong_zhao": {
    id: "dong_zhao", name: "董昭", zi: "公仁",
    birth: 156, death: 236, faction: "wei", roles: ["minister"],
    stats: { lead: 60, war: 45, int: 86, pol: 90, cha: 74 },
    skills: [
      { id: "yijiaxingxu", name: "劝都于许", kind: "passive", desc: "建安元年说曹操奉献帝移驾幸许，遂定奉主之业", mod: { gold: 50, citydef: 0.08 }, tags: ["logistics"] },
      { id: "quanjin", name: "劝进之谋", kind: "aura", desc: "与荀攸等劝进魏公，文帝受禅时为首劝进之臣", mod: { morale: 5, recruit: 0.08 }, tags: ["ritual"] }
    ],
    traits: ["善揣时势", "历事三朝", "老成持重"],
    bio: "字公仁，济阴定陶人。初事袁绍，后归曹操。建安元年说曹操奉献帝移驾幸许，遂定奉主之基。后与荀攸等劝进魏公，曹丕受禅时为首劝进之臣。官至河南尹、司徒，历事三朝。青龙四年卒，年八十一，谥定侯。",
    appear: [191, 236], impact: 3
  },
  "man_chong": {
    id: "man_chong", name: "满宠", zi: "伯宁",
    birth: null, death: 242, faction: "wei", roles: ["general", "minister"],
    stats: { lead: 82, war: 70, int: 80, pol: 76, cha: 66 },
    skills: [
      { id: "shou_xincheng", name: "守合肥新城", kind: "active", cd: 4, dur: 2, desc: "镇守合肥新城，青龙二年击退孙权大军，吴人惮之", mod: { citydef: 0.15, def: 0.10 }, tags: ["fortify"] },
      { id: "zhifa", name: "执法不避", kind: "passive", desc: "为许令，执法不避豪强，收治曹洪宾客之犯法者", mod: { morale: 4, def: 0.06 }, tags: ["guard"] }
    ],
    traits: ["执法严峻", "勇而有谋", "长于守御"],
    bio: "字伯宁，山阳昌邑人。曹操辟为从事，为许令，执法不避豪强。后为汝南太守，从征关羽，拒其北道。文帝时都督扬州诸军事，筑合肥新城。明帝青龙二年孙权率众围新城，宠募壮士焚其攻具，吴军多死，权乃退。官至太尉。正始三年卒，谥景侯。",
    appear: [196, 242], impact: 4
  },
  "zhong_yao": {
    id: "zhong_yao", name: "钟繇", zi: "元常",
    birth: 151, death: 230, faction: "wei", roles: ["minister"],
    stats: { lead: 72, war: 60, int: 82, pol: 90, cha: 86 },
    skills: [
      { id: "duguanzhong", name: "督关中", kind: "passive", desc: "以侍中守司隶校尉，督关中诸军，镇抚马腾韩遂", mod: { gold: 50, recruit: 0.08 }, tags: ["logistics"] },
      { id: "kaifa", name: "楷法之祖", kind: "passive", desc: "工书法，为楷法之祖，后世与王羲之并称钟王", mod: { xp: 0.08, morale: 3 }, tags: ["scholar"] }
    ],
    traits: ["工书", "镇抚关中", "娴于政事"],
    bio: "字元常，颍川长社人。举孝廉，历尚书郎、阳陵令。曹操时以侍中守司隶校尉，督关中诸军，镇抚马腾、韩遂，馈运军资不绝。魏国初建为大理，迁相国；文帝时为廷尉，明帝时进太傅。工书，为楷法之祖。太和四年卒，年八十，谥成侯。",
    appear: [184, 230], impact: 4
  },
  "chen_qun": {
    id: "chen_qun", name: "陈群", zi: "长文",
    birth: null, death: 237, faction: "wei", roles: ["minister"],
    stats: { lead: 62, war: 50, int: 84, pol: 90, cha: 76 },
    skills: [
      { id: "jiupin_guanren", name: "九品官人", kind: "passive", desc: "延康元年采其议立九品官人之法，遂为一代定制", mod: { recruit: 0.14, gold: 20 }, tags: ["scholar"] }
    ],
    traits: ["通雅", "有识度", "长于制度"],
    bio: "字长文，颍川许昌人。刘备领豫州牧时辟为别驾，后归曹操为司空掾、御史中丞。延康元年采其议立九品官人之法，遂为魏一代选官之制。历事三朝，明帝时为司空、录尚书事，数谏营宫室之费。青龙四年卒，谥靖侯。",
    appear: [194, 237], impact: 4
  },
  "wang_su": {
    id: "wang_su", name: "王肃", zi: "子雍",
    birth: 195, death: 256, faction: "wei", roles: ["minister"],
    stats: { lead: 58, war: 45, int: 84, pol: 86, cha: 74 },
    skills: [
      { id: "shengzhenglun", name: "圣证论", kind: "passive", desc: "遍注群经，作《圣证论》以驳郑玄，其学立于学官", mod: { xp: 0.12, morale: 3 }, tags: ["scholar"] }
    ],
    traits: ["博通经籍", "不好郑玄", "结姻司马氏"],
    bio: "字子雍，王朗之子。黄初中为散骑黄门侍郎。善贾逵、马融之学而不好郑玄，采会同异为《尚书》《诗》《论语》诸解，又作《圣证论》以讥短郑玄。官至中领军、散骑常侍、太常，其女嫁司马昭。甘露元年卒，谥景侯。",
    appear: [211, 256], impact: 4
  },
  "hua_xin": {
    id: "hua_xin", name: "华歆", zi: "子鱼",
    birth: 157, death: 232, faction: "wei", roles: ["minister"],
    stats: { lead: 65, war: 50, int: 80, pol: 88, cha: 86 },
    skills: [
      { id: "qingde", name: "清德雅望", kind: "passive", desc: "举郡归附孙策而受上宾之礼，后历相国、司徒而居三公", mod: { morale: 5, gold: 20 }, tags: ["ritual"] }
    ],
    traits: ["清德", "举止有常", "为相国"],
    bio: "字子鱼，平原高唐人。初举孝廉，为尚书郎，后为豫章太守。孙策略江东，歆举郡归附，策待以上宾之礼。曹操征之入朝，拜议郎，参司空军事。文帝受禅，以为相国、司徒，封安乐乡侯。明帝时进太尉。太和六年卒，年七十五，谥敬侯。",
    appear: [184, 232], impact: 3
  },
  "wang_lang": {
    id: "wang_lang", name: "王朗", zi: "景兴",
    birth: null, death: 228, faction: "wei", roles: ["minister"],
    stats: { lead: 62, war: 50, int: 82, pol: 84, cha: 80 },
    skills: [
      { id: "tongjing", name: "通经致用", kind: "passive", desc: "以通经拜郎中，著《易》《春秋》《孝经》诸传", mod: { xp: 0.10, morale: 3 }, tags: ["scholar"] }
    ],
    traits: ["师事杨赐", "经学名家", "浮海走孙策"],
    bio: "字景兴，东海郯人。师太尉杨赐，以通经拜郎中，除菑丘长。后为会稽太守，为孙策所破，浮海遁走。曹操迎天子，征为谏议大夫，参司空军事。历事三朝，官至御史大夫、司空，封兰陵侯。著《易》《春秋》《孝经》《周官》传。太和二年病卒，谥成侯。",
    appear: [185, 228], impact: 3
  },
  "zhang_liao": {
    id: "zhang_liao", name: "张辽", zi: "文远",
    birth: 169, death: 222, faction: "wei", roles: ["general"],
    stats: { lead: 92, war: 93, int: 68, pol: 55, cha: 74 },
    skills: [
      { id: "tubing_zhen", name: "突阵斩将", kind: "active", cd: 3, dur: 2, desc: "合肥之役率八百健儿夜袭孙权大营，几获其帅", mod: { atk: 0.18, move: 1 }, tags: ["cavalry", "pursue"] },
      { id: "weizhen", name: "威震江东", kind: "passive", desc: "守合肥以寡御众，威震江东，孙权终身为之忌惮", mod: { def: 0.10, morale: 5 }, tags: ["dread"] }
    ],
    traits: ["沉勇有谋", "善抚士卒", "号止小儿啼"],
    bio: "字文远，雁门马邑人，本聂壹之后，以避怨变姓。少为郡吏，历事丁原、何进、董卓、吕布，布败降曹操，拜中郎将。从征袁绍、乌桓，白狼山为先锋，斩乌桓单于蹋顿。建安二十年合肥之役，率八百人突孙权军，几获权。拜征东将军。黄初三年卒，谥刚侯。",
    appear: [184, 222], impact: 5
  },
  "yu_jin": {
    id: "yu_jin", name: "于禁", zi: "文则",
    birth: null, death: 221, faction: "wei", roles: ["general"],
    stats: { lead: 84, war: 78, int: 62, pol: 58, cha: 60 },
    skills: [
      { id: "chijun", name: "持军严整", kind: "passive", desc: "治军严整，得贼财无所私，曹操称古名将何以加之", mod: { def: 0.10, morale: 4 }, tags: ["guard"] },
      { id: "shuimo", name: "水没七军", kind: "passive", desc: "建安二十四年救樊城，汉水暴溢，七军皆没而降关羽", mod: { def: -0.12, hp: -0.10 }, tags: ["fortify"] }
    ],
    traits: ["持军严整", "以法御下", "晚节不终"],
    bio: "字文则，泰山钜平人。黄巾起，从鲍信，后归曹操为军司马。从攻吕布、张绣、袁绍，数有功，以持军严整著称，曹操称其虽古名将何以加之。建安二十四年救樊城，汉水暴涨，七军皆没，降关羽。后归魏，文帝使画樊城之败于陵屋，禁见之惭恚发病，黄初二年卒，谥厉侯。",
    appear: [184, 221], impact: 4
  },
  "yue_jin": {
    id: "yue_jin", name: "乐进", zi: "文谦",
    birth: null, death: 218, faction: "wei", roles: ["general"],
    stats: { lead: 80, war: 86, int: 58, pol: 50, cha: 62 },
    skills: [
      { id: "xiandeng", name: "先登陷阵", kind: "passive", desc: "从击吕布、张超、桥蕤诸役，每战先登，以胆烈闻", mod: { atk: 0.12, siege: 0.06 }, tags: ["siege"] }
    ],
    traits: ["容貌短小", "胆烈", "每战先登"],
    bio: "字文谦，阳平卫国人。容貌短小，以胆烈从曹操为帐下吏。从击吕布于濮阳、张超于雍丘、桥蕤于苦县，皆先登有功。官渡之战从击袁绍，力战有功。后与张辽、李典共守合肥。拜折冲将军。建安二十三年卒，谥威侯。",
    appear: [184, 218], impact: 4
  },
  "xu_huang": {
    id: "xu_huang", name: "徐晃", zi: "公明",
    birth: null, death: 227, faction: "wei", roles: ["general"],
    stats: { lead: 86, war: 84, int: 70, pol: 62, cha: 68 },
    skills: [
      { id: "changqu", name: "长驱破围", kind: "passive", desc: "建安二十四年解樊城之围，破关羽，曹操称有周亚夫之风", mod: { atk: 0.12, move: 1 }, tags: ["pursue"] }
    ],
    traits: ["沉静寡言", "治军有周亚夫之风", "不善结党"],
    bio: "字公明，河东杨人。本郡吏，从杨奉，后归曹操。官渡之战烧袁绍运粮车，从征关中，说曹操渡蒲阪津断马超归路。建安二十四年救樊城，破关羽之围，曹操称徐将军可谓有周亚夫之风矣。官至右将军。太和元年卒，谥壮侯。",
    quote: "徐将军可谓有周亚夫之风矣",
    appear: [190, 227], impact: 4
  },
  "he_yan": {
    id: "he_yan", name: "何晏", zi: "平叔",
    birth: null, death: 249, faction: "wei", roles: ["minister"],
    stats: { lead: 55, war: 45, int: 84, pol: 74, cha: 80 },
    skills: [
      { id: "zhengshizhiyin", name: "正始之音", kind: "passive", desc: "与王弼等倡玄谈，著《论语集解》《道德论》", mod: { xp: 0.10, morale: 3 }, tags: ["scholar"] },
      { id: "fucao", name: "依附曹爽", kind: "passive", desc: "为曹爽亲党，典选举而附会权势，卒以此取祸", mod: { gold: 40, def: -0.06 }, tags: ["dread"] }
    ],
    traits: ["美容仪", "好老庄", "正始名士"],
    bio: "字平叔，南阳宛人，东汉大将军何进之孙。母尹氏为曹操所纳，故长于魏宫，后娶曹操女金乡公主。美容仪，好老庄，与王弼、夏侯玄等倡清谈，号为正始之音。官至吏部尚书、侍中，典选举，附于曹爽。正始十年高平陵之变，为司马懿所诛，夷三族。",
    appear: [220, 249], impact: 3
  },
  "zhang_he": {
    id: "zhang_he", name: "张郃", zi: "俊乂",
    birth: null, death: 231, faction: "wei", roles: ["general"],
    stats: { lead: 88, war: 82, int: 76, pol: 60, cha: 68 },
    skills: [
      { id: "shibian", name: "识变知机", kind: "passive", desc: "街亭之役绝马谡汲道，大破之；善处营陈，料战势", mod: { vision: 1, atk: 0.08 }, tags: ["insight"] },
      { id: "mumen", name: "木门之失", kind: "passive", desc: "太和五年追诸葛亮至木门，中箭而卒，为将之戒", mod: { atk: 0.06, def: -0.06 }, tags: ["pursue"] }
    ],
    traits: ["识变数", "善处营陈", "料战势地形"],
    bio: "字俊乂，河间鄚人。初应募讨黄巾，后属韩馥、袁绍为校尉。官渡之战为绍将，郭图进谗，遂与高览降曹操，拜偏将军。后从攻河北、征乌桓、破马超。街亭之役绝马谡汲道，大破之。官至征西车骑将军。太和五年追诸葛亮至木门，中箭卒，谥壮侯。",
    appear: [184, 231], impact: 4
  },
  "gao_lan": {
    id: "gao_lan", name: "高览",
    birth: null, death: null, faction: "wei", roles: ["general"],
    stats: { lead: 72, war: 78, int: 58, pol: 50, cha: 58 },
    skills: [
      { id: "hebei_mingjiang", name: "河北名将", kind: "passive", desc: "袁绍帐下与张郃齐名的战将，官渡之役同降曹操", mod: { atk: 0.08, def: 0.06 }, tags: ["pike"] }
    ],
    traits: ["河北名将", "与张郃齐名", "降曹后无闻"],
    bio: "袁绍帐下名将，与张郃并肩。建安五年官渡之战，曹操袭乌巢，袁绍遣其与张郃攻曹操大营，不克；郭图进谗于绍，二人惧而焚攻具降曹操。此后史书无闻。（《三国志·张郃传》《武帝纪》）",
    appear: [190, 205], impact: 2
  },
  "li_dian": {
    id: "li_dian", name: "李典", zi: "曼成",
    birth: null, death: null, faction: "wei", roles: ["general"],
    stats: { lead: 76, war: 70, int: 74, pol: 62, cha: 70 },
    skills: [
      { id: "qisihans", name: "弃私憾", kind: "passive", desc: "素与张辽不睦，合肥之役弃私憾共出，大破孙权", mod: { def: 0.10, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["好学问", "贵儒雅", "不与诸将争功"],
    bio: "字曼成，山阳巨野人，其伯父李乾有宾客数千家在乘氏。少好学，不乐兵事，曹操使典其家兵。从征河北、荆州，官至破虏将军，与张辽、乐进共屯合肥。素与张辽不睦，然合肥之役能弃私憾共出，大破孙权。年三十六薨。",
    appear: [200, 215], impact: 3
  },
  "zang_ba": {
    id: "zang_ba", name: "臧霸", zi: "宣高",
    birth: null, death: null, faction: "wei", roles: ["general"],
    stats: { lead: 80, war: 78, int: 66, pol: 58, cha: 62 },
    skills: [
      { id: "taishanzhizhong", name: "泰山之众", kind: "passive", desc: "收陶谦、吕布旧部保据泰山，后归曹操督青州诸军", mod: { recruit: 0.10, atk: 0.06 }, tags: ["raiding"] }
    ],
    traits: ["年十八救父", "保据开阳", "统青州兵"],
    bio: "字宣高，泰山华人。父戒为县狱掾，臧霸年十八聚客救父，亡命东海。初为陶谦骑都尉，收兵徐、兖间，保据开阳。吕布败后归曹操，拜琅邪相，统青州诸军事。文帝时迁镇东将军，进爵武安乡侯，又征为执金吾，位特进。明帝时薨，谥威侯。",
    appear: [184, 230], impact: 3
  },
  "xu_chu": {
    id: "xu_chu", name: "许褚", zi: "仲康",
    birth: null, death: null, faction: "wei", roles: ["general"],
    stats: { lead: 78, war: 92, int: 55, pol: 48, cha: 66 },
    skills: [
      { id: "suwei", name: "宿卫亲兵", kind: "passive", desc: "聚宗族数千家筑垒拒贼，后领虎士宿卫曹操左右", mod: { def: 0.14, hp: 0.12 }, tags: ["guard"] },
      { id: "chenmu", name: "瞋目慑敌", kind: "passive", desc: "渭水之战从曹操会语马超、韩遂，超惮其威不敢动", mod: { atk: 0.06, morale: 4 }, tags: ["dread"] }
    ],
    traits: ["力大如虎", "谨慎奉法", "质重少言"],
    bio: "字仲康，谯国谯人。汉末聚宗族数千家筑垒拒贼，后归曹操，拜都尉，引置左右，将虎士宿卫。破徐他等谋刺之变，从征张绣、袁绍，以功封关内侯。建安十六年从曹操拒马超于潼关，超惮其威。官至武卫将军。明帝时薨，谥壮侯。",
    appear: [189, 230], impact: 4
  },
  "dian_wei": {
    id: "dian_wei", name: "典韦",
    birth: null, death: 197, faction: "wei", roles: ["general"],
    stats: { lead: 72, war: 94, int: 40, pol: 30, cha: 58 },
    skills: [
      { id: "shuangji", name: "双戟破阵", kind: "passive", desc: "好持大双戟与长刀，军中语曰帐下壮士有典君", mod: { atk: 0.16, def: 0.06 }, tags: ["pike"] },
      { id: "sishou", name: "死守寨门", kind: "passive", desc: "建安二年宛城之变，独守寨门拒张绣军，力战而死", mod: { def: 0.12, hp: 0.10 }, tags: ["guard"] }
    ],
    traits: ["形貌魁梧", "膂力过人", "任侠有志节"],
    bio: "陈留己吾人。形貌魁梧，膂力过人，有志节任侠，为乡人所重。初属张邈，后属夏侯惇，数战有功，拜司马。曹操拜为都尉，引置左右，将亲兵数百人，常绕大帐。好持大双戟与长刀。建安二年张绣袭营，韦拒战而死。",
    quote: "帐下壮士有典君",
    appear: [189, 197], impact: 3
  },
  "pang_de": {
    id: "pang_de", name: "庞德", zi: "令明",
    birth: null, death: 219, faction: "wei", roles: ["general"],
    stats: { lead: 80, war: 88, int: 60, pol: 45, cha: 68 },
    skills: [
      { id: "lizhan", name: "力战陷阵", kind: "passive", desc: "从马腾、马超征伐，破郭援、高干，亲斩郭援首", mod: { atk: 0.12, move: 1 }, tags: ["cavalry"] },
      { id: "ningsibuqu", name: "宁死不屈", kind: "passive", desc: "樊城兵败被擒，骂敌不绝声，宁死不屈，义在效死", mod: { def: 0.10, morale: 6 }, tags: ["rally"] }
    ],
    traits: ["常骑白马", "勇冠凉州", "义在效死"],
    bio: "字令明，南安狟道人。少为郡吏，从马腾击叛氐，数有功。后随马超奔汉中，随张鲁降曹操，拜立义将军，封关门亭侯。建安二十四年樊城之战，与关羽力战，射中羽额；会汉水暴涨，船没被擒，骂敌不屈而死。谥壮侯。",
    quote: "吾欲身自击羽，今年我不杀羽，羽当杀我",
    appear: [190, 219], impact: 4
  },
  "wen_pin": {
    id: "wen_pin", name: "文聘", zi: "仲业",
    birth: null, death: null, faction: "wei", roles: ["general"],
    stats: { lead: 82, war: 72, int: 70, pol: 60, cha: 66 },
    skills: [
      { id: "jiangxia", name: "保守江夏", kind: "passive", desc: "为江夏太守数十年，拒关羽、孙权，江夏不失", mod: { citydef: 0.14, def: 0.08 }, tags: ["fortify", "naval"] }
    ],
    traits: ["刘表旧将", "恩威并著", "名震敌国"],
    bio: "字仲业，南阳宛人。本刘表大将，屯守北境。刘表死，曹操南下，文聘归降，曹操以为江夏太守，使御关羽、孙权。在江夏数十年，恩威并著，名震敌国。黄初年间孙权围石阳，聘坚守不动，权退，聘追击破之。官至后将军。",
    appear: [196, 226], impact: 3
  },
  "tian_yu": {
    id: "tian_yu", name: "田豫", zi: "国让",
    birth: null, death: 252, faction: "wei", roles: ["general"],
    stats: { lead: 84, war: 76, int: 74, pol: 66, cha: 70 },
    skills: [
      { id: "weizhen_beijiang", name: "威震北疆", kind: "passive", desc: "为护乌丸校尉九年，屡破乌桓、鲜卑，北边以安", mod: { atk: 0.08, move: 1 }, tags: ["cavalry", "barbarian"] }
    ],
    traits: ["少事刘备", "坐镇北疆", "清俭简约"],
    bio: "字国让，渔阳雍奴人。少从刘备于豫州，以母老归乡，后属公孙瓒。曹操定河北，归为丞相军谋掾，历颍川、汝南太守。为护乌丸校尉九年，破乌桓、鲜卑，坐镇北疆。官至振威将军、使持节护匈奴中郎将，转太中大夫。年八十二薨。",
    appear: [184, 252], impact: 3
  },
  "qian_zhao": {
    id: "qian_zhao", name: "牵招", zi: "子经",
    birth: null, death: null, faction: "wei", roles: ["general"],
    stats: { lead: 78, war: 70, int: 70, pol: 64, cha: 64 },
    skills: [
      { id: "jiaomin", name: "教民战陈", kind: "passive", desc: "为雁门太守十二年，教民战阵，悬赏捕虏，边民按堵", mod: { def: 0.10, landmove: 1 }, tags: ["fortify"] }
    ],
    traits: ["师事乐隐", "殡葬其师", "镇抚雁门"],
    bio: "字子经，安平观津人。年十余岁诣同县乐隐受学，师死于董卓之乱，招殡之。后归袁绍为督军从事，绍死从袁尚，后归曹操，从平汉中，拜中护军。出为护鲜卑校尉、雁门太守，在郡十二年，教民战阵，屡与鲜卑轲比能周旋。官至右中郎将。",
    appear: [190, 231], impact: 3
  },
  "xu_you": {
    id: "xu_you", name: "许攸", zi: "子远",
    birth: null, death: null, faction: "wei", roles: ["strategist"],
    stats: { lead: 60, war: 45, int: 78, pol: 50, cha: 44 },
    skills: [
      { id: "yejiawuchao", name: "夜袭乌巢", kind: "active", cd: 4, dur: 2, desc: "官渡之役弃袁绍归曹操，告其粮屯乌巢，遂夜袭焚之", mod: { atk: 0.15, vision: 1 }, tags: ["ambush", "fire"] }
    ],
    traits: ["少与曹操相善", "恃功骄纵", "呼操小字"],
    bio: "字子远，南阳人。少与袁绍、曹操相善，为袁绍谋士。建安五年官渡之战，家犯法为审配所收，怒而奔曹操，具告袁绍辎重屯于乌巢，曹操遂夜袭焚之。后自恃勋劳，屡于众坐呼曹操小字，为曹操所杀。（《三国志》裴注引《魏略》）",
    appear: [184, 204], impact: 3
  },
  "cui_yan": {
    id: "cui_yan", name: "崔琰", zi: "季珪",
    birth: 163, death: 216, faction: "wei", roles: ["minister"],
    stats: { lead: 62, war: 60, int: 80, pol: 84, cha: 80 },
    skills: [
      { id: "qingzhong", name: "清忠高亮", kind: "passive", desc: "为魏国尚书典选举十余年，清忠高亮，朝士服其公", mod: { morale: 5, recruit: 0.08 }, tags: ["ritual"] }
    ],
    traits: ["声姿高畅", "须长四尺", "典选举十余年"],
    bio: "字季珪，清河东武城人。少好击剑，年二十三乃感奋读书，受《论语》《韩诗》于郑玄。初为袁绍所辟，后归曹操为别驾从事，历东西曹掾、魏国尚书，典选举十余年，清忠高亮。建安二十一年以与杨训书语涉怨谤，为曹操赐死，年五十四。",
    appear: [190, 216], impact: 3
  },
  "xin_pi": {
    id: "xin_pi", name: "辛毗", zi: "佐治",
    birth: null, death: 235, faction: "wei", roles: ["minister"],
    stats: { lead: 66, war: 58, int: 82, pol: 80, cha: 70 },
    skills: [
      { id: "zhijian", name: "直谏", kind: "passive", desc: "谏曹丕勿徙冀州士家十万户实河南，帝为之止", mod: { morale: 4, recruit: 0.08 }, tags: ["rally"] },
      { id: "chijie", name: "持节制军", kind: "aura", desc: "青龙二年诸葛亮北伐，以卫尉持节为大将军军师", mod: { atk: 0.08, def: 0.06 }, tags: ["rally"] }
    ],
    traits: ["性刚直", "持节督军", "与兄辛评分事二主"],
    bio: "字佐治，颍川阳翟人。初与兄辛评从袁绍，绍死归曹操为议郎。文帝欲徙冀州士家十万户实河南，毗力谏而止。明帝时为侍中、卫尉，青龙二年诸葛亮出渭南，以毗为大将军司马懿军师，持节节制诸军。青龙三年卒，谥肃侯。",
    appear: [196, 235], impact: 3
  },
  "yang_xiu": {
    id: "yang_xiu", name: "杨修", zi: "德祖",
    birth: 175, death: 219, faction: "wei", roles: ["minister"],
    stats: { lead: 55, war: 50, int: 86, pol: 70, cha: 74 },
    skills: [
      { id: "minjie", name: "机敏", kind: "passive", desc: "为丞相主簿，总知内外事皆称意，以是见忌于曹操", mod: { vision: 2, xp: 0.08 }, tags: ["insight"] }
    ],
    traits: ["弘农杨氏", "总知内外", "交关诸侯"],
    bio: "字德祖，弘农华阴人，太尉杨彪之子。建安中举孝廉，除郎中，为丞相主簿，总知内外事，事皆称意。与临菑侯曹植相善。建安二十四年，曹操以其漏泄言教、交关诸侯，又以袁术之甥，遂以罪诛之。",
    appear: [192, 219], impact: 3
  },
  "li_tong": {
    id: "li_tong", name: "李通", zi: "文达",
    birth: null, death: 209, faction: "wei", roles: ["general"],
    stats: { lead: 78, war: 76, int: 62, pol: 58, cha: 62 },
    skills: [
      { id: "duanshi", name: "斩使拒招", kind: "passive", desc: "袁绍遣使招为征南将军，通斩其使，送印绶于曹操", mod: { atk: 0.08, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["以侠闻于江汝", "起兵朗陵", "忠而敢断"],
    bio: "字文达，江夏平春人。少以侠闻于江、汝之间。汉末与郡人陈恭起兵于朗陵，后归曹操，拜振威中郎将。建安五年袁绍遣使招以为征南将军，通斩其使，送印绶于曹操，操嘉之。建安十四年率众赴江陵救曹仁，道病卒，谥刚侯。",
    appear: [190, 209], impact: 3
  },
  "zhu_ling": {
    id: "zhu_ling", name: "朱灵", zi: "文博",
    birth: null, death: null, faction: "wei", roles: ["general"],
    stats: { lead: 76, war: 74, int: 62, pol: 56, cha: 58 },
    skills: [
      { id: "sanying", name: "三营归曹", kind: "passive", desc: "初奉袁绍命率三营助曹操，后留事曹操，屡从征伐", mod: { recruit: 0.08, atk: 0.06 }, tags: ["cavalry"] }
    ],
    traits: ["袁绍旧部", "慕曹操而留", "晚失兵柄"],
    bio: "字文博，清河人。初为袁绍部将。曹操征陶谦，袁绍遣灵率三营相助，灵慕曹操，遂留不去，所将士卒亦愿留。后从征河北、荆州，以功拜后将军，封高唐侯。曹操晚年遣于禁持令书入营夺其军。卒谥威侯。",
    appear: [190, 230], impact: 3
  },
  "sima_yi": {
    id: "sima_yi", name: "司马懿", zi: "仲达", aka: ["宣王", "晋宣帝"],
    birth: 179, death: 251, faction: "jin", roles: ["strategist", "lord"],
    stats: { lead: 92, war: 72, int: 96, pol: 92, cha: 82 },
    skills: [
      { id: "yinshen", name: "隐忍待时", kind: "passive", desc: "历事魏三世而深自贬抑，卒以高平陵之变尽诛曹爽", mod: { def: 0.12, vision: 2 }, tags: ["insight"] },
      { id: "jixi_xincheng", name: "急袭新城", kind: "active", cd: 4, dur: 2, desc: "太和元年八日兼行千二百里，急袭新城，擒孟达", mod: { move: 2, atk: 0.14 }, tags: ["pursue"] },
      { id: "jianbi", name: "坚壁拒蜀", kind: "passive", desc: "青龙二年拒诸葛亮于渭南，坚壁不出，亮卒于军", mod: { def: 0.14, siege: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["深沉有城府", "猜忌多权变", "历事三世"],
    bio: "字仲达，河内温人。建安中曹操辟为文学掾，历太子中庶子，辅曹丕。太和元年擒孟达于新城，青龙二年拒诸葛亮于渭南，亮卒于军，百姓为之谚曰死诸葛走生仲达。景初二年平辽东公孙渊。正始十年高平陵之变诛曹爽，专魏政。嘉平三年卒，谥宣文，晋立追尊宣帝。",
    appear: [228, 251], impact: 5
  },
  "sima_shi": {
    id: "sima_shi", name: "司马师", zi: "子元",
    birth: 208, death: 255, faction: "jin", roles: ["lord", "general"],
    stats: { lead: 86, war: 70, int: 88, pol: 84, cha: 74 },
    skills: [
      { id: "feili", name: "行废立", kind: "active", cd: 5, dur: 2, desc: "正元元年废魏帝曹芳为齐王，改立高贵乡公曹髦", mod: { morale: 6, def: 0.08 }, tags: ["dread"] },
      { id: "rendong", name: "忍疾定乱", kind: "passive", desc: "正元二年讨毌丘俭，文鸯夜袭，忍目疾之痛不使众知", mod: { def: 0.10, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["沉断多智", "阴养死士", "忍疾用兵"],
    bio: "字子元，司马懿长子。魏时为散骑常侍，嘉平三年继父辅政，拜抚军大将军、录尚书事。嘉平四年遣诸葛诞等攻吴，败于东关。正元元年废魏帝曹芳，立高贵乡公曹髦。正元二年讨毌丘俭、文钦于淮南，文鸯夜袭其营，师惊而目疾迸出，事定卒于许昌，谥忠武。",
    appear: [228, 255], impact: 4
  },
  "sima_zhao": {
    id: "sima_zhao", name: "司马昭", zi: "子上", aka: ["晋文王"],
    birth: 211, death: 265, faction: "jin", roles: ["lord"],
    stats: { lead: 82, war: 70, int: 88, pol: 86, cha: 76 },
    skills: [
      { id: "zhuanzheng", name: "专征", kind: "passive", desc: "甘露二年围寿春平诸葛诞，景元四年遣钟会邓艾灭蜀", mod: { atk: 0.10, recruit: 0.10 }, tags: ["rally"] },
      { id: "shijun", name: "弑君之罪", kind: "passive", desc: "甘露五年曹髦攻相府，贾充使其下成济弑帝于车下", mod: { morale: -5, atk: 0.06 }, tags: ["dread"] }
    ],
    traits: ["外宽内忌", "灭蜀之功", "受封晋王"],
    bio: "字子上，司马懿次子。正元二年继兄辅政，拜大将军。甘露二年平诸葛诞于寿春。甘露五年魏帝曹髦率僮仆攻相府，贾充命成济弑之，昭立曹奂为帝。景元四年遣钟会、邓艾三道伐蜀，刘禅出降。咸熙元年进封晋王。二年卒，谥文王，子炎受禅，追尊文帝。",
    appear: [235, 265], impact: 5
  },
  "sima_fu": {
    id: "sima_fu", name: "司马孚", zi: "叔达",
    birth: 180, death: 272, faction: "jin", roles: ["minister"],
    stats: { lead: 74, war: 62, int: 82, pol: 88, cha: 86 },
    skills: [
      { id: "zhensi", name: "枕股而哭", kind: "passive", desc: "曹髦遇弑，孚奔往枕帝股而哭，曰杀陛下者臣之罪", mod: { morale: 5, def: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["温厚廉让", "历事魏世", "自称魏臣"],
    bio: "字叔达，司马懿之弟。汉末为文学掾，历仕魏世，官至太尉、太傅，封长社侯。曹髦遇弑，孚奔往枕帝股而哭，自谓杀陛下者臣之罪。晋受禅后封安平王，位太宰，然每自称魏臣，遗令自题有魏贞士。卒年九十有三。",
    appear: [228, 265], impact: 3
  },
  "deng_ai": {
    id: "deng_ai", name: "邓艾", zi: "士载",
    birth: 197, death: 264, faction: "jin", roles: ["general"],
    stats: { lead: 88, war: 76, int: 84, pol: 70, cha: 60 },
    skills: [
      { id: "yinping", name: "阴平偷渡", kind: "active", cd: 5, dur: 2, desc: "景元四年自阴平行无人之地七百余里，直取成都", mod: { move: 3, atk: 0.15 }, tags: ["ambush"] },
      { id: "tuntian", name: "屯田足食", kind: "passive", desc: "为尚书郎时著《济河论》，建议淮南屯田以蓄军资", mod: { food: 60, def: 0.06 }, tags: ["logistics"] }
    ],
    traits: ["口吃", "善筹画", "功高见忌"],
    bio: "字士载，义阳棘阳人。少孤家贫，为都尉学士。后为尚书郎，著《济河论》言屯田之利，为司马懿所重。历南安太守、征西将军，屡拒姜维于陇右。景元四年伐蜀，自阴平道行无人之地七百余里，凿山通道，降刘禅于成都。钟会诬其反，槛车征还，为田续所杀。",
    appear: [213, 264], impact: 5
  },
  "zhong_hui": {
    id: "zhong_hui", name: "钟会", zi: "士季",
    birth: 225, death: 264, faction: "jin", roles: ["strategist"],
    stats: { lead: 78, war: 66, int: 90, pol: 74, cha: 78 },
    skills: [
      { id: "miaoce", name: "庙算画策", kind: "passive", desc: "从司马昭讨诸葛诞于寿春，屡设奇谋，为昭所亲待", mod: { atk: 0.08, vision: 2 }, tags: ["insight"] },
      { id: "fashu", name: "假手伐蜀", kind: "active", cd: 5, dur: 2, desc: "景元四年统十余万众伐蜀，又与邓艾争功构陷之", mod: { atk: 0.12, gold: 40 }, tags: ["siege"] }
    ],
    traits: ["敏惠夙成", "博学精名理", "骄矜谋逆"],
    bio: "字士季，太傅钟繇少子。少敏惠，博学精练名理，为司马师、司马昭所亲待。从讨毌丘俭、诸葛诞，屡出奇谋。景元四年为镇西将军，统十余万众伐蜀，受刘禅降，又诬邓艾反，遂谋据蜀自立，为部下胡烈军所杀，年四十。",
    appear: [240, 264], impact: 4
  },
  "guo_huai": {
    id: "guo_huai", name: "郭淮", zi: "伯济",
    birth: null, death: 255, faction: "jin", roles: ["general"],
    stats: { lead: 84, war: 74, int: 80, pol: 68, cha: 64 },
    skills: [
      { id: "yongliangyu", name: "雍凉御蜀", kind: "passive", desc: "久镇雍凉，屡拒诸葛亮、姜维之北伐，西陲赖之", mod: { def: 0.12, citydef: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["方策精详", "垂问羌胡", "镇陇右三十年"],
    bio: "字伯济，太原阳曲人。建安中举孝廉。文帝时为雍州刺史，镇关中。太和二年街亭之后收兵据险，保全诸军。青龙二年拒诸葛亮于渭南，料其必争北原而先据之，蜀军不得进。官至车骑将军、仪同三司。正元二年卒，谥贞侯。",
    appear: [211, 255], impact: 4
  },
  "chen_tai": {
    id: "chen_tai", name: "陈泰", zi: "玄伯",
    birth: null, death: 260, faction: "jin", roles: ["general", "minister"],
    stats: { lead: 78, war: 68, int: 82, pol: 78, cha: 72 },
    skills: [
      { id: "huaiyuan", name: "并州怀远", kind: "passive", desc: "出为并州刺史，怀柔夷民，甚有威惠，边郡以安", mod: { recruit: 0.10, morale: 4 }, tags: ["barbarian"] },
      { id: "jujiangwei", name: "拒姜维", kind: "passive", desc: "迁雍州刺史，数拒姜维北伐，以功加侍中、光禄大夫", mod: { def: 0.10, atk: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["弘济简至", "陈群之子", "有将略"],
    bio: "字玄伯，司空陈群之子。青龙中为散骑侍郎，正始中为并州刺史、振威将军，怀柔夷民，甚有威惠。后为雍州刺史，与郭淮共拒姜维。甘露二年诸葛诞反于寿春，随司马昭讨平之。景元元年卒，追赠司空，谥穆侯。",
    appear: [225, 260], impact: 3
  },
  "wang_ling": {
    id: "wang_ling", name: "王凌", zi: "彦云",
    birth: 172, death: 251, faction: "jin", roles: ["general"],
    stats: { lead: 80, war: 72, int: 74, pol: 72, cha: 66 },
    skills: [
      { id: "jubing", name: "淮南举义", kind: "active", cd: 5, dur: 2, desc: "嘉平三年谋立楚王曹彪于许昌，事泄，兵败饮药死", mod: { atk: 0.12, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["王允之侄", "都督扬州", "谋立楚王"],
    bio: "字彦云，太原祁人，司徒王允之侄。曹操辟为掾，历中山太守、兖州刺史。文帝时为散骑常侍，明帝时拜征东将军、都督扬州诸军事。正始中迁太尉，假节钺。嘉平三年谋废帝而立楚王曹彪，事泄，司马懿引军讨之，凌面缚出降，被解送洛阳，至项饮药死。",
    appear: [204, 251], impact: 3
  },
  "guanqiu_jian": {
    id: "guanqiu_jian", name: "毌丘俭", zi: "仲恭",
    birth: null, death: 255, faction: "jin", roles: ["general"],
    stats: { lead: 82, war: 78, int: 72, pol: 68, cha: 72 },
    skills: [
      { id: "dongzheng", name: "东征高句丽", kind: "passive", desc: "正始中遣军讨高句丽，破丸都山城，刻石纪功而还", mod: { atk: 0.10, move: 1 }, tags: ["barbarian", "pursue"] },
      { id: "jubingshou", name: "淮南举兵", kind: "active", cd: 5, dur: 2, desc: "正元二年与文钦举兵寿春，传檄讨司马师，兵败被杀", mod: { atk: 0.12, morale: 5 }, tags: ["rally"] }
    ],
    traits: ["才识拔干", "东征刻石", "忠魏而死"],
    bio: "字仲恭，河东闻喜人。明帝时为荆州刺史，青龙中从司马懿平辽东公孙渊。正始中出为幽州刺史，遣军讨高句丽王位宫，破丸都山城，刻石纪功。正元二年与文钦举兵于寿春，传檄讨司马师，兵败被杀，传首京都。",
    appear: [220, 255], impact: 3
  },
  "zhuge_dan": {
    id: "zhuge_dan", name: "诸葛诞", zi: "公休",
    birth: null, death: 258, faction: "jin", roles: ["general"],
    stats: { lead: 78, war: 74, int: 70, pol: 62, cha: 68 },
    skills: [
      { id: "shouchun", name: "寿春孤守", kind: "passive", desc: "甘露二年举兵寿春，联吴拒司马昭，孤城坚守半年", mod: { def: 0.14, citydef: 0.12 }, tags: ["fortify"] }
    ],
    traits: ["诸葛丰之后", "都督扬州", "淮南三叛之终"],
    bio: "字公休，琅邪阳都人，汉司隶校尉诸葛丰之后，诸葛亮族弟。历仕魏世，官至征东大将军、都督扬州诸军事，封高平侯。甘露二年举兵于寿春，遣子入吴为质请援。司马昭率二十六万众围之，半年城破，诞被杀，夷三族，史称淮南三叛之一。",
    appear: [230, 258], impact: 3
  },
  "yang_hu": {
    id: "yang_hu", name: "羊祜", zi: "叔子",
    birth: 221, death: 278, faction: "jin", roles: ["general", "minister"],
    stats: { lead: 84, war: 66, int: 86, pol: 86, cha: 84 },
    skills: [
      { id: "dexin", name: "德信怀吴", kind: "passive", desc: "镇襄阳与吴将陆抗相拒，务修德信，不为掩袭之计", mod: { recruit: 0.10, morale: 6 }, tags: ["ritual"] }
    ],
    traits: ["蔡邕外孙", "镇守襄阳", "羊陆之交"],
    bio: "字叔子，泰山南城人，蔡邕外孙。魏末为司马昭相国从事中郎，与荀勖共掌机密，迁中领军。后拜都督荆州诸军事，镇襄阳，与吴将陆抗相拒，务修德信，吴人翕然悦服。累上表请伐吴，未行而卒，年五十八。",
    appear: [240, 265], impact: 4
  },
  "du_yu": {
    id: "du_yu", name: "杜预", zi: "元凯", aka: ["杜武库"],
    birth: 222, death: 285, faction: "jin", roles: ["general", "minister"],
    stats: { lead: 80, war: 62, int: 90, pol: 82, cha: 72 },
    skills: [
      { id: "zuoshi", name: "左氏集解", kind: "passive", desc: "著《春秋左氏经传集解》，为后世治左氏者所宗", mod: { xp: 0.12, morale: 3 }, tags: ["scholar"] },
      { id: "duwuku", name: "杜武库", kind: "passive", desc: "时人称杜武库，言其无所不有；镇襄阳，为伐吴之备", mod: { atk: 0.06, def: 0.10 }, tags: ["fortify"] }
    ],
    traits: ["博学多通", "朝野称美", "身不跨马"],
    bio: "字元凯，京兆杜陵人，尚书仆射杜畿之孙。博学多通，明于兴废之道。魏末为镇西长史，从钟会伐蜀。后拜镇南大将军、都督荆州诸军事，镇襄阳，继羊祜之志，缮甲练兵，为伐吴之备。著《春秋左氏经传集解》。卒年六十三。",
    appear: [238, 265], impact: 4
  },
  "wang_jun": {
    id: "wang_jun", name: "王濬", zi: "士治",
    birth: 206, death: 286, faction: "jin", roles: ["general"],
    stats: { lead: 76, war: 62, int: 80, pol: 74, cha: 66 },
    skills: [
      { id: "louchuan", name: "造楼船", kind: "passive", desc: "为益州刺史，大作楼船连舫，木柿蔽江，为伐吴之备", mod: { watermove: 2, siege: 0.10 }, tags: ["naval"] }
    ],
    traits: ["恢廓有大志", "造舟于蜀", "老而弥壮"],
    bio: "字士治，弘农湖人。少有大志，博涉坟典。魏末为羊祜所知，参征南军事。后拜益州刺史，大作楼船连舫，方百二十步，木柿蔽江而下，为伐吴之备。卒年八十。（《晋书·王濬传》）",
    appear: [240, 265], impact: 3
  },
  "jia_chong": {
    id: "jia_chong", name: "贾充", zi: "公闾",
    birth: 217, death: 282, faction: "jin", roles: ["minister"],
    stats: { lead: 66, war: 58, int: 80, pol: 86, cha: 64 },
    skills: [
      { id: "fuxin", name: "司马腹心", kind: "passive", desc: "为司马昭心腹，甘露五年曹髦攻相府，令成济弑帝", mod: { recruit: 0.10, morale: -4 }, tags: ["dread"] }
    ],
    traits: ["魏名臣贾逵之子", "典掌机密", "弑君之讥"],
    bio: "字公闾，平阳襄陵人，魏名臣贾逵之子。魏末为司马昭参军、大将军司马，掌机密。甘露五年魏帝曹髦率僮仆攻相府，充令太子舍人成济弑帝，更立曹奂。入晋后为尚书令、车骑将军，与荀勖等更定新律。卒年六十六。",
    appear: [240, 265], impact: 3
  },
  "dong_zhuo": {
    id: "dong_zhuo", name: "董卓", zi: "仲颖",
    birth: null, death: 192, faction: "dong", roles: ["lord"],
    stats: { lead: 82, war: 84, int: 66, pol: 50, cha: 40 },
    skills: [
      { id: "liangzhou_tieqi", name: "凉州铁骑", kind: "passive", desc: "以凉州兵马起家，屡破羌胡，中平六年应召入雒阳", mod: { atk: 0.12, move: 1 }, tags: ["cavalry"] },
      { id: "fenluo", name: "焚雒迁都", kind: "active", cd: 5, dur: 2, desc: "焚洛阳宫室，发掘陵寝，胁献帝西迁长安，天下怨之", mod: { gold: 60, morale: -6 }, tags: ["raiding"] }
    ],
    traits: ["性粗猛有谋", "残忍好杀", "剑履上殿"],
    bio: "字仲颖，陇西临洮人。少从张奂击羌，以军功为郎中。中平六年何进召之入洛阳，遂废少帝、立献帝，杀何太后。拜太尉、相国，封郿侯，赞拜不名，剑履上殿。焚洛阳，胁帝迁都长安，纵兵掠民。初平三年为吕布所杀于长安，暴尸于市。",
    appear: [184, 192], impact: 5
  },
  "li_ru": {
    id: "li_ru", name: "李儒",
    birth: null, death: null, faction: "dong", roles: ["strategist"],
    stats: { lead: 62, war: 50, int: 78, pol: 60, cha: 42 },
    skills: [
      { id: "zhenhongnong", name: "鸩弑弘农", kind: "passive", desc: "奉董卓之命进鸩弑弘农王刘辩，事见《后汉书》", mod: { morale: -4, atk: 0.05 }, tags: ["dread"] }
    ],
    traits: ["董卓谋士", "官至郎中令", "行事阴狠"],
    bio: "董卓帐下谋士，官至郎中令。初平元年奉董卓之命进鸩酒，杀废帝弘农王刘辩（《后汉书·董卓传》）。董卓被诛后，事迹不见于史。",
    appear: [189, 192], impact: 2
  },
  "li_jue": {
    id: "li_jue", name: "李傕", zi: "稚然",
    birth: null, death: 198, faction: "dong", roles: ["general"],
    stats: { lead: 74, war: 78, int: 62, pol: 40, cha: 36 },
    skills: [
      { id: "fanggong", name: "反攻长安", kind: "passive", desc: "董卓死后用贾诩之策反攻长安，逐吕布，杀王允", mod: { atk: 0.10, move: 1 }, tags: ["raiding"] }
    ],
    traits: ["凉州校尉", "残暴无谋", "劫掠公卿"],
    bio: "字稚然，北地人。董卓帐下校尉。卓被杀后与郭汜等用贾诩之谋反攻长安，破吕布，杀王允，拜车骑将军。后与郭汜相攻于关中，劫持公卿。建安三年为裴茂所督关中诸将段煨等讨灭，夷三族。",
    appear: [189, 198], impact: 3
  },
  "guo_si": {
    id: "guo_si", name: "郭汜",
    birth: null, death: 197, faction: "dong", roles: ["general"],
    stats: { lead: 72, war: 76, int: 58, pol: 36, cha: 34 },
    skills: [
      { id: "xianggong", name: "关中相攻", kind: "passive", desc: "与李傕共攻长安，后又与傕相攻于关中，民不聊生", mod: { atk: 0.10, def: -0.06 }, tags: ["raiding"] }
    ],
    traits: ["本名郭多", "凉州校尉", "与李傕相攻"],
    bio: "一名多，张掖人。董卓帐下校尉，与李傕同掌凉州兵。共攻长安后拜后将军，封美阳侯。兴平二年与李傕相攻，劫持公卿，关中大乱，长安城空四十余日。后为部将伍习所杀。",
    appear: [189, 197], impact: 2
  },
  "zhang_ji": {
    id: "zhang_ji", name: "张济",
    birth: null, death: 196, faction: "dong", roles: ["general"],
    stats: { lead: 76, war: 76, int: 60, pol: 48, cha: 50 },
    skills: [
      { id: "hongnong", name: "弘农屯守", kind: "passive", desc: "卓死后屯弘农，护献帝东归，后又与李傕共追乘舆", mod: { def: 0.10, food: 30 }, tags: ["fortify"] }
    ],
    traits: ["凉州旧将", "屯弘农", "张绣之族父"],
    bio: "董卓帐下将军，屯弘农。董卓死后与李傕、郭汜共攻长安，后护献帝东归。兴平二年又与李傕、郭汜共追汉帝，为董承、杨奉等所拒。建安元年入荆州界，攻穰城，中流矢死；其众由族子张绣领之。",
    appear: [189, 196], impact: 2
  },
  "fan_chou": {
    id: "fan_chou", name: "樊稠",
    birth: null, death: 195, faction: "dong", roles: ["general"],
    stats: { lead: 70, war: 74, int: 55, pol: 40, cha: 42 },
    skills: [
      { id: "changpingguan", name: "长平观拒敌", kind: "passive", desc: "董卓部右将军，随李傕攻长安，又拒马腾韩遂于长平观", mod: { def: 0.08, atk: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["董卓右将军", "与李傕同谋", "为傕所杀"],
    bio: "董卓帐下将军，为右将军。随李傕、郭汜共攻长安。兴平元年与马腾、韩遂战于长平观，得李傕援兵而胜。兴平二年为李傕所杀。",
    appear: [189, 195], impact: 2
  },
  "niu_fu": {
    id: "niu_fu", name: "牛辅",
    birth: null, death: 192, faction: "dong", roles: ["general"],
    stats: { lead: 66, war: 70, int: 56, pol: 42, cha: 40 },
    skills: [
      { id: "shanjun", name: "陕县屯兵", kind: "passive", desc: "董卓之婿，以中郎将屯兵陕县，为大军后路屏障", mod: { def: 0.08, gold: 20 }, tags: ["fortify"] }
    ],
    traits: ["董卓女婿", "中郎将", "部曲惊散"],
    bio: "董卓之婿，为中郎将，屯兵陕县。董卓被杀后，其部曲闻风惊乱，牛辅携金宝逾城逃走，为左右所杀，首级送长安。李傕、郭汜等皆其旧部。（《三国志·董卓传》）",
    appear: [189, 192], impact: 2
  },
  "xu_rong": {
    id: "xu_rong", name: "徐荣",
    birth: null, death: null, faction: "dong", roles: ["general"],
    stats: { lead: 78, war: 76, int: 66, pol: 50, cha: 54 },
    skills: [
      { id: "bianshui", name: "汴水破曹", kind: "active", cd: 4, dur: 2, desc: "初平元年荥阳汴水之战大破曹操追兵，操仅以身免", mod: { atk: 0.15, def: 0.08 }, tags: ["ambush"] }
    ],
    traits: ["辽东人", "中郎将", "荐公孙度为太守"],
    bio: "辽东人，董卓帐下中郎将。初平元年曹操追董卓于荥阳汴水，荣迎击大破之，曹操身中流矢，赖曹洪让马得脱。又尝破孙坚之军。与公孙度同郡，尝荐度为辽东太守。后事不详。",
    appear: [188, 192], impact: 3
  },
  "hu_zhen": {
    id: "hu_zhen", name: "胡轸", zi: "文才",
    birth: null, death: null, faction: "dong", roles: ["general"],
    stats: { lead: 68, war: 72, int: 56, pol: 46, cha: 48 },
    skills: [
      { id: "yangren", name: "阳人之败", kind: "passive", desc: "以凉州大督统军攻孙坚于阳人，与吕布不睦而败", mod: { atk: 0.06, move: 1 }, tags: ["cavalry"] }
    ],
    traits: ["凉州大督", "与吕布不睦", "军中自乱"],
    bio: "字文才，凉州人。董卓帐下大督。初平二年董卓遣其与骑督吕布攻孙坚于阳人，二人不睦，军中自相惊扰，士卒散乱，为孙坚所破，都督华雄亦于此役被斩。后事迹不详。（《三国志·孙坚传》）",
    appear: [189, 192], impact: 2
  },
  "hua_xiong": {
    id: "hua_xiong", name: "华雄",
    birth: null, death: 191, faction: "dong", roles: ["general"],
    stats: { lead: 66, war: 78, int: 48, pol: 38, cha: 48 },
    skills: [
      { id: "liangzhou_xiaojiang", name: "凉州骁将", kind: "passive", desc: "董卓帐下都督，随胡轸攻孙坚，兵败见斩于阳人", mod: { atk: 0.08, def: 0.04 }, tags: ["cavalry"] }
    ],
    traits: ["凉州骁将", "董卓都督", "为孙坚军所斩"],
    bio: "董卓帐下都督，凉州骁将。初平二年随大督胡轸攻孙坚于阳人，军中不和，为孙坚所破，华雄于此役被斩，枭首传军。史载其为孙坚军所破斩杀，非关羽所斩。（《三国志·孙坚传》）",
    appear: [188, 191], impact: 2
  },
  "li_su": {
    id: "li_su", name: "李肃",
    birth: null, death: null, faction: "dong", roles: ["general"],
    stats: { lead: 60, war: 64, int: 66, pol: 52, cha: 54 },
    skills: [
      { id: "zhuzhuo", name: "诛卓之谋", kind: "passive", desc: "卓帐下骑都尉，初平三年与吕布等同谋诛卓于长安", mod: { atk: 0.06, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["董卓骑都尉", "预诛卓之谋", "后事不详"],
    bio: "史载为董卓帐下骑都尉，初平三年与吕布等共谋诛卓于长安。董卓死后事迹不见于正史，其名仅一见。",
    appear: [189, 192], impact: 2
  },
  "yang_feng": {
    id: "yang_feng", name: "杨奉",
    birth: null, death: 197, faction: "dong", roles: ["general"],
    stats: { lead: 70, war: 74, int: 55, pol: 44, cha: 50 },
    skills: [
      { id: "baibo", name: "白波之众", kind: "passive", desc: "本白波军帅，后护献帝东归，与董承等共拒追兵", mod: { recruit: 0.08, atk: 0.06 }, tags: ["raiding"] }
    ],
    traits: ["白波军帅", "护驾东归", "终为刘备所杀"],
    bio: "本白波军帅，后为李傕部将。兴平二年护献帝东归，拜兴义将军，与董承、韩暹等共拒李傕、郭汜追兵于曹阳。建安元年曹操迎帝都许，杨奉、韩暹出走。建安二年为刘备所邀杀于徐州。",
    appear: [189, 197], impact: 2
  },
  "duan_wei": {
    id: "duan_wei", name: "段煨", zi: "忠明",
    birth: null, death: 209, faction: "dong", roles: ["general", "minister"],
    stats: { lead: 72, war: 68, int: 70, pol: 68, cha: 62 },
    skills: [
      { id: "huayin", name: "华阴劝农", kind: "passive", desc: "屯华阴劝农积谷，不与众将同流，护献帝东归有功", mod: { food: 50, def: 0.08 }, tags: ["logistics"] }
    ],
    traits: ["屯华阴", "修农事", "不与众将同流"],
    bio: "字忠明，武威人。董卓帐下中郎将，屯华阴，修农事，不与众将同流。兴平二年迎护献帝东归，以功见称于时。后归曹操，建安三年与裴茂等讨李傕，夷其三族。建安十四年卒。",
    appear: [189, 209], impact: 2
  },
  "lv_bu": {
    id: "lv_bu", name: "吕布", zi: "奉先", aka: ["飞将"],
    birth: null, death: 199, faction: "lvbu", roles: ["lord", "general"],
    stats: { lead: 78, war: 98, int: 48, pol: 32, cha: 62 },
    skills: [
      { id: "feijiang_shanshe", name: "飞将善射", kind: "passive", desc: "便弓马，膂力过人，号为飞将；辕门射戟一发中的", mod: { atk: 0.14, range: 1 }, tags: ["archer", "cavalry"] },
      { id: "fanfu", name: "轻狡反覆", kind: "passive", desc: "屡杀主将，杀丁原、诛董卓，反复无常，为诸雄所忌", mod: { atk: 0.06, recruit: -0.10 }, tags: ["dread"] }
    ],
    traits: ["便弓马", "膂力过人", "号为飞将"],
    bio: "字奉先，五原九原人。以骁武给并州，为丁原主簿；后杀原归董卓，誓为父子；又与王允谋诛卓，拜奋武将军，封温侯。为李傕所败，东出投袁绍、张邈，据徐州，自号徐州牧。建安三年曹操围下邳，布降，缢杀于白门楼。",
    quote: "诸君观布射戟小支",
    appear: [184, 199], impact: 5
  },
  "gao_shun": {
    id: "gao_shun", name: "高顺",
    birth: null, death: 199, faction: "lvbu", roles: ["general"],
    stats: { lead: 86, war: 88, int: 62, pol: 50, cha: 58 },
    skills: [
      { id: "xianzhenying", name: "陷阵营", kind: "passive", desc: "所将七百余兵号曰千人，铠甲精练，时人谓之陷阵营", mod: { atk: 0.14, def: 0.08 }, tags: ["pike"] }
    ],
    traits: ["所将七百余兵", "号陷阵营", "忠直谏布"],
    bio: "吕布帐下中郎将。所将七百余兵，号为千人，铠甲斗具皆精练，每所攻击无不破者，时人谓之陷阵营。性忠直，屡谏吕布而不见用。建安三年下邳城破，与吕布俱被擒杀。",
    appear: [194, 199], impact: 3
  },
  "chen_gong": {
    id: "chen_gong", name: "陈宫", zi: "公台",
    birth: null, death: 199, faction: "lvbu", roles: ["strategist"],
    stats: { lead: 68, war: 55, int: 82, pol: 74, cha: 72 },
    skills: [
      { id: "yingbu", name: "说据兖州", kind: "passive", desc: "说张邈等迎吕布为兖州牧，乘曹操征徐州据其根本", mod: { recruit: 0.10, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["东郡人", "背曹迎布", "请死不屈"],
    bio: "字公台，东郡人。初从曹操，后说张邈等迎吕布为兖州牧，背曹操而据其根本。为吕布谋主，屡画策而布不能尽用。下邳被围，宫请出屯外城为犄角之势，为布妻所阻。城破被擒，曹操欲活之，宫请就刑，操泣而送之。",
    appear: [191, 199], impact: 4
  },
  "hou_cheng": {
    id: "hou_cheng", name: "侯成",
    birth: null, death: null, faction: "lvbu", roles: ["general"],
    stats: { lead: 58, war: 68, int: 50, pol: 46, cha: 44 },
    skills: [
      { id: "fugong", name: "缚宫降曹", kind: "passive", desc: "下邳被围，与宋宪、魏续共执陈宫、高顺降曹操", mod: { atk: 0.06, morale: -3 }, tags: ["raiding"] }
    ],
    traits: ["吕布部将", "下邳出降", "背主求活"],
    bio: "吕布帐下将领。建安三年曹操围下邳，侯成与宋宪、魏续等共执陈宫、高顺，率其众降曹操，吕布军遂溃。（《三国志·吕布传》）此后事迹不详。",
    appear: [194, 199], impact: 2
  },
  "song_xian": {
    id: "song_xian", name: "宋宪",
    birth: null, death: null, faction: "lvbu", roles: ["general"],
    stats: { lead: 58, war: 66, int: 48, pol: 44, cha: 46 },
    skills: [
      { id: "beibu", name: "背布降曹", kind: "passive", desc: "下邳之围中与侯成、魏续共执陈宫、高顺降曹操", mod: { morale: -3, def: 0.05 }, tags: ["raiding"] }
    ],
    traits: ["吕布部将", "下邳出降", "后事不详"],
    bio: "吕布帐下将领。建安三年曹操围下邳，与侯成、魏续等执陈宫、高顺出降，吕布遂败。（《三国志·吕布传》）此后事迹不详。",
    appear: [194, 199], impact: 2
  },
  "wei_xu": {
    id: "wei_xu", name: "魏续",
    birth: null, death: null, faction: "lvbu", roles: ["general"],
    stats: { lead: 58, war: 66, int: 48, pol: 44, cha: 46 },
    skills: [
      { id: "xiahou", name: "下邳出降", kind: "passive", desc: "与侯成、宋宪共执陈宫、高顺降曹操，吕布军遂溃", mod: { morale: -3, atk: 0.05 }, tags: ["raiding"] }
    ],
    traits: ["吕布部将", "与高顺有隙", "下邳出降"],
    bio: "吕布帐下将领。建安三年曹操围下邳，与侯成、宋宪等执陈宫、高顺出降，吕布军遂溃。（《三国志·吕布传》）此后事迹不详。",
    appear: [194, 199], impact: 2
  },
  "cheng_lian": {
    id: "cheng_lian", name: "成廉",
    birth: null, death: null, faction: "lvbu", roles: ["general"],
    stats: { lead: 62, war: 74, int: 50, pol: 44, cha: 48 },
    skills: [
      { id: "xianzhenqi", name: "陷阵骑将", kind: "passive", desc: "吕布健将，常从布率数十骑冲突敌阵，所向披靡", mod: { atk: 0.10, move: 1 }, tags: ["cavalry"] }
    ],
    traits: ["吕布健将", "以骁勇见任", "后事不详"],
    bio: "吕布帐下健将，以骁勇见任。《三国志·吕布传》载布常与其亲近将校率数十骑驰突敌阵，成廉与焉。建安三年下邳之役后事迹不详。",
    appear: [194, 199], impact: 2
  },
  "yuan_shao": {
    id: "yuan_shao", name: "袁绍", zi: "本初",
    birth: null, death: 202, faction: "yuan", roles: ["lord"],
    stats: { lead: 82, war: 68, int: 74, pol: 80, cha: 88 },
    skills: [
      { id: "sishisangong", name: "四世三公", kind: "aura", desc: "汝南袁氏四世三公，门生故吏遍天下，士多归之", mod: { recruit: 0.14, morale: 6 }, tags: ["rally"] },
      { id: "jujuhebei", name: "据有河北", kind: "passive", desc: "据冀、青、幽、并四州，带甲数十万，为河北之雄", mod: { gold: 50, recruit: 0.08 }, tags: ["logistics"] }
    ],
    traits: ["四世三公", "外宽内忌", "好谋无决"],
    bio: "字本初，汝南汝阳人，四世三公之后。初为司隶校尉，何进死后尽诛宦官。初平元年起兵讨董卓，为关东盟主。后据冀州，破公孙瓒于界桥、鲍丘，兼有四州，众数十万。建安五年官渡之战大败，七年发病呕血死。",
    appear: [184, 202], impact: 5
  },
  "yuan_tan": {
    id: "yuan_tan", name: "袁谭", zi: "显思",
    birth: null, death: 205, faction: "yuan", roles: ["general"],
    stats: { lead: 72, war: 74, int: 60, pol: 54, cha: 58 },
    skills: [
      { id: "qingzhouci", name: "青州刺史", kind: "passive", desc: "袁绍长子，为青州刺史；绍死后与弟袁尚争立相攻", mod: { atk: 0.08, recruit: 0.06 }, tags: ["raiding"] }
    ],
    traits: ["袁绍长子", "与弟争立", "屯黎阳"],
    bio: "字显思，袁绍长子，为青州刺史。建安七年袁绍死，审配等矫遗命立袁尚，谭自称车骑将军，屯黎阳，与尚相攻不已。曹操乘其内讧，各个击破，建安十年克南皮，谭被杀。",
    appear: [196, 205], impact: 3
  },
  "yuan_shang": {
    id: "yuan_shang", name: "袁尚", zi: "显甫",
    birth: null, death: 207, faction: "yuan", roles: ["general"],
    stats: { lead: 70, war: 72, int: 62, pol: 56, cha: 68 },
    skills: [
      { id: "yecheng", name: "邺城固守", kind: "passive", desc: "继袁绍为冀州牧，守邺城拒曹操，城破后奔幽州", mod: { citydef: 0.12, def: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["袁绍少子", "矫命嗣立", "奔走辽东"],
    bio: "字显甫，袁绍少子。袁绍爱之，以为后。建安七年绍死，审配等立尚为嗣，领冀州牧。建安九年曹操攻邺，尚回救不及，城破，走中山，奔幽州依袁熙，又同奔乌桓。建安十二年白狼山败后奔辽东，为公孙康所杀。",
    appear: [200, 207], impact: 3
  },
  "yuan_xi": {
    id: "yuan_xi", name: "袁熙", zi: "显奕",
    birth: null, death: 207, faction: "yuan", roles: ["general"],
    stats: { lead: 66, war: 68, int: 60, pol: 58, cha: 64 },
    skills: [
      { id: "youzhou", name: "幽州之守", kind: "passive", desc: "袁绍次子，为幽州刺史；后与弟尚同奔乌桓、辽东", mod: { def: 0.08, move: 1 }, tags: ["cavalry"] }
    ],
    traits: ["袁绍次子", "幽州刺史", "其妻甄氏入魏宫"],
    bio: "字显奕，袁绍次子，为幽州刺史。建安十年曹操平河北，熙与弟尚奔乌桓。建安十二年白狼山之战后，二人奔辽东，为公孙康所杀，传首于曹操。其妻甄氏后为曹丕所纳。（《三国志·袁绍传》）",
    appear: [196, 207], impact: 2
  },
  "gao_gan": {
    id: "gao_gan", name: "高干", zi: "元才",
    birth: null, death: 206, faction: "yuan", roles: ["general"],
    stats: { lead: 74, war: 72, int: 66, pol: 58, cha: 58 },
    skills: [
      { id: "huguan", name: "壶关拒守", kind: "passive", desc: "袁绍外甥，领并州刺史，据壶关以拒曹操之军", mod: { citydef: 0.12, def: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["袁绍外甥", "并州刺史", "降而复反"],
    bio: "字元才，袁绍外甥，领并州刺史。建安七年袁绍死后，高干降曹操，仍为并州刺史。建安十年复举兵反，据壶关拒守。曹操亲征，干弃城北走，为上洛都尉王琰所杀。（《三国志·武帝纪》）",
    appear: [196, 206], impact: 2
  },
  "qu_yi": {
    id: "qu_yi", name: "麴义",
    birth: null, death: null, faction: "yuan", roles: ["general"],
    stats: { lead: 80, war: 78, int: 62, pol: 48, cha: 52 },
    skills: [
      { id: "jieqiao", name: "界桥先登", kind: "active", cd: 3, dur: 2, desc: "界桥之战率八百先登、强弩千张，大破公孙瓒骑", mod: { atk: 0.16, range: 1 }, tags: ["crossbow", "pike"] }
    ],
    traits: ["善用强弩", "界桥先登", "恃功见杀"],
    bio: "袁绍帐下战将。界桥之战率精兵八百、强弩千张为前驱，大破公孙瓒白马义从，绍军由是振。后自恃功高骄纵，为袁绍所杀，并其众。（《后汉书·袁绍传》）",
    appear: [190, 195], impact: 3
  },
  "yan_liang": {
    id: "yan_liang", name: "颜良",
    birth: null, death: 200, faction: "yuan", roles: ["general"],
    stats: { lead: 76, war: 88, int: 46, pol: 40, cha: 58 },
    skills: [
      { id: "hebei_shangjiang", name: "河北上将", kind: "passive", desc: "袁绍帐下大将，与文丑并称河北名将，勇冠三军", mod: { atk: 0.12, def: 0.04 }, tags: ["pike"] }
    ],
    traits: ["河北名将", "勇冠三军", "性促狭"],
    bio: "袁绍帐下大将，与文丑齐名，绍倚为前锋。建安五年二月，绍遣颜良攻东郡太守刘延于白马，曹操用荀攸声东击西之策，使张辽、关羽前登，击破其军，颜良为关羽刺于万众之中。（《三国志·武帝纪》《关羽传》）",
    appear: [190, 200], impact: 3
  },
  "wen_chou": {
    id: "wen_chou", name: "文丑",
    birth: null, death: 200, faction: "yuan", roles: ["general"],
    stats: { lead: 74, war: 86, int: 44, pol: 38, cha: 56 },
    skills: [
      { id: "yanjin", name: "追敌中伏", kind: "passive", desc: "延津之战追曹操辎重，士卒争取而乱，为曹操所破", mod: { atk: 0.10, def: -0.06 }, tags: ["pursue"] }
    ],
    traits: ["河北名将", "与颜良齐名", "延津没于阵"],
    bio: "袁绍帐下大将，与颜良并称河北名将。建安五年延津之战，奉绍命渡河追曹操，曹操弃辎重诱之，绍军争取财物而乱，曹操纵兵击之，大破其众，文丑死于阵中。（《三国志·武帝纪》）",
    appear: [190, 200], impact: 3
  },
  "ju_shou": {
    id: "ju_shou", name: "沮授",
    birth: null, death: 200, faction: "yuan", roles: ["strategist"],
    stats: { lead: 68, war: 55, int: 88, pol: 78, cha: 74 },
    skills: [
      { id: "shenjian", name: "深谏不纳", kind: "passive", desc: "屡谏袁绍勿轻南征、勿分兵救颜良，皆不见用", mod: { vision: 2, morale: 3 }, tags: ["insight"] }
    ],
    traits: ["广平人", "监统内外", "谋归见杀"],
    bio: "广平人。少有大志，多权略。初为韩馥别驾，后为袁绍别驾、奋武将军，监统内外。屡谏绍勿以颜良独当一面、勿轻举南征，绍皆不听。官渡兵败，为曹操所擒，操惜其才厚待之，授仍谋归袁氏，遂被杀。",
    appear: [190, 200], impact: 3
  },
  "tian_feng": {
    id: "tian_feng", name: "田丰", zi: "元皓",
    birth: null, death: 200, faction: "yuan", roles: ["strategist"],
    stats: { lead: 66, war: 52, int: 86, pol: 76, cha: 66 },
    skills: [
      { id: "jianbi_pidi", name: "坚壁疲敌", kind: "passive", desc: "谏袁绍据险以逸待劳、分兵扰敌，不可一战而决", mod: { def: 0.12, food: 40 }, tags: ["fortify"] }
    ],
    traits: ["巨鹿人", "多谋善断", "械系见杀"],
    bio: "字元皓，巨鹿人。袁绍别驾，多谋善断。建安五年劝袁绍乘曹操东击刘备之机袭许都，绍不从；又谏以持久之策疲曹，宜据险固守，绍怒而械系之。官渡败后，袁绍羞于见丰，逢纪因进谗，遂杀之。",
    appear: [190, 200], impact: 3
  },
  "shen_pei": {
    id: "shen_pei", name: "审配", zi: "正南",
    birth: null, death: 204, faction: "yuan", roles: ["minister"],
    stats: { lead: 72, war: 70, int: 78, pol: 70, cha: 60 },
    skills: [
      { id: "yecheng_sishou", name: "邺城死守", kind: "passive", desc: "守邺城拒曹操，虽漳水灌城亦不降，城破就刑", mod: { citydef: 0.14, def: 0.08 }, tags: ["fortify"] }
    ],
    traits: ["魏郡人", "治中别驾", "面北就刑"],
    bio: "字正南，魏郡人。袁绍谋主，为治中别驾。官渡之战收许攸家人犯法者，致许攸怒奔曹操。建安九年曹操攻邺，审配坚守，操决漳水灌城，城中死者过半而不降。城破被擒，不屈求死，临刑令其面北，曰吾君在北。",
    appear: [190, 204], impact: 3
  },
  "feng_ji": {
    id: "feng_ji", name: "逢纪", zi: "元图",
    birth: null, death: 202, faction: "yuan", roles: ["strategist"],
    stats: { lead: 62, war: 50, int: 78, pol: 70, cha: 60 },
    skills: [
      { id: "jiaoming", name: "矫命立嗣", kind: "passive", desc: "袁绍死后与审配矫遗命立袁尚为嗣，遂与袁谭相恶", mod: { morale: 4, recruit: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["袁绍谋士", "拥立袁尚", "为袁谭所杀"],
    bio: "字元图，袁绍帐下谋士。袁绍爱少子袁尚，逢纪与审配等共定拥立之谋。建安七年绍死，二人矫遗命立尚，遂与长子袁谭交恶。袁谭怒而杀之。（《三国志·袁绍传》）",
    appear: [190, 202], impact: 2
  },
  "guo_tu": {
    id: "guo_tu", name: "郭图", zi: "公则",
    birth: null, death: 205, faction: "yuan", roles: ["strategist"],
    stats: { lead: 60, war: 55, int: 76, pol: 66, cha: 56 },
    skills: [
      { id: "jinchan", name: "进谗间将", kind: "passive", desc: "曹操袭乌巢时劝袁绍攻其大营，又进谗逼降张郃高览", mod: { vision: 1, morale: -4 }, tags: ["insight"] }
    ],
    traits: ["颍川人", "袁绍谋士", "南皮俱死"],
    bio: "字公则，颍川人。袁绍帐下谋士。官渡之战曹操袭乌巢，郭图劝袁绍攻曹操大营而不救乌巢；及张郃攻营不下，又进谗于绍，张郃、高览遂惧而降曹。后从袁谭，建安十年南皮城破，与谭俱被杀。",
    appear: [190, 205], impact: 2
  },
  "xun_chen": {
    id: "xun_chen", name: "荀谌", zi: "友若",
    birth: null, death: null, faction: "yuan", roles: ["strategist"],
    stats: { lead: 58, war: 48, int: 80, pol: 74, cha: 72 },
    skills: [
      { id: "shuorang", name: "说让冀州", kind: "passive", desc: "与高干、郭图等说韩馥让冀州于袁绍，绍遂据河北", mod: { gold: 40, recruit: 0.08 }, tags: ["ritual"] }
    ],
    traits: ["颍川颍阴人", "荀彧之兄", "说韩馥让州"],
    bio: "字友若，颍川颍阴人，荀彧之兄。初平二年与高干、郭图等奉袁绍之命说韩馥，使让冀州。后为袁绍谋士。官渡之后事迹不详。",
    appear: [190, 202], impact: 2
  },
  "chunyu_qiong": {
    id: "chunyu_qiong", name: "淳于琼", zi: "仲简",
    birth: null, death: 200, faction: "yuan", roles: ["general"],
    stats: { lead: 66, war: 60, int: 58, pol: 54, cha: 52 },
    skills: [
      { id: "wuchao", name: "乌巢督粮", kind: "passive", desc: "督袁绍粮屯于乌巢，戒备不严，为曹操夜袭所破", mod: { food: 60, def: -0.06 }, tags: ["logistics"] }
    ],
    traits: ["西园八校尉之一", "督乌巢粮屯", "为好酒所误"],
    bio: "字仲简，颍川人。灵帝时为西园八校尉之一，后从袁绍为将领。建安五年袁绍遣其督粮屯于乌巢，戒备不严。曹操夜袭乌巢，燔其粮谷宝货，淳于琼等皆为曹操军所斩。（《三国志·武帝纪》）",
    appear: [190, 200], impact: 2
  },
  "jiang_yi_qu": {
    id: "jiang_yi_qu", name: "蒋义渠",
    birth: null, death: null, faction: "yuan", roles: ["general"],
    stats: { lead: 68, war: 66, int: 58, pol: 54, cha: 56 },
    skills: [
      { id: "liyang", name: "黎阳收卒", kind: "passive", desc: "屯黎阳，官渡战后袁绍仅率八百骑渡河就其营，方得收众", mod: { def: 0.08, morale: 4 }, tags: ["rally"] }
    ],
    traits: ["袁绍部将", "屯黎阳", "收绍散卒"],
    bio: "袁绍帐下将领，屯黎阳。建安五年官渡大败，袁绍仅与八百骑渡河，至其营中方得安顿，收集散卒而还河北。（《三国志·袁绍传》）",
    appear: [195, 202], impact: 2
  },
  "yuan_shu": {
    id: "yuan_shu", name: "袁术", zi: "公路",
    birth: null, death: 199, faction: "zhong", roles: ["lord"],
    stats: { lead: 70, war: 62, int: 66, pol: 58, cha: 72 },
    skills: [
      { id: "qiaohao", name: "僭号仲氏", kind: "passive", desc: "建安二年于寿春僭号称帝，众叛亲离，为天下所弃", mod: { gold: 50, morale: -6 }, tags: ["ritual"] },
      { id: "nanyang", name: "据淮南", kind: "passive", desc: "初据南阳，后据寿春，兼有淮南之众，粮足兵多", mod: { food: 60, recruit: 0.08 }, tags: ["logistics"] }
    ],
    traits: ["袁绍从弟", "奢淫放肆", "僭号称帝"],
    bio: "字公路，袁绍从弟。初为虎贲中郎将、后将军，据南阳，后据寿春。建安二年于寿春僭号称帝，自称仲家，天下共弃之。后众叛亲离，建安四年欲归帝号于袁绍，北走至江亭，病笃，欲得蜜浆而不得，呕血死。",
    appear: [184, 199], impact: 4
  },
  "ji_ling": {
    id: "ji_ling", name: "纪灵",
    birth: null, death: null, faction: "zhong", roles: ["general"],
    stats: { lead: 74, war: 78, int: 56, pol: 44, cha: 52 },
    skills: [
      { id: "gongxiaopei", name: "攻小沛", kind: "passive", desc: "奉袁术之命率步骑三万攻刘备于小沛，吕布辕门射戟解之", mod: { atk: 0.10, move: 1 }, tags: ["pike"] }
    ],
    traits: ["袁术大将", "率步骑三万", "后事不详"],
    bio: "袁术帐下大将。建安元年奉袁术之命率步骑三万攻刘备于小沛，刘备求救于吕布，布为辕门射戟之戏，两家遂解兵。（《三国志·吕布传》）此后事迹不详。",
    appear: [194, 199], impact: 2
  },
  "zhang_xun": {
    id: "zhang_xun", name: "张勋",
    birth: null, death: null, faction: "zhong", roles: ["general"],
    stats: { lead: 72, war: 72, int: 58, pol: 48, cha: 50 },
    skills: [
      { id: "dajiangjun", name: "仲氏大将军", kind: "passive", desc: "袁术僭号后为大将军，术死后与杨弘等率众欲投孙策", mod: { atk: 0.08, recruit: 0.08 }, tags: ["rally"] }
    ],
    traits: ["袁术大将军", "术死后率众", "为刘勋所虏"],
    bio: "袁术帐下大将，袁术僭号后为大将军。建安四年袁术死，张勋与长史杨弘等率其部曲欲归孙策，途经庐江，为太守刘勋所邀击，众尽被虏。（《三国志·孙讨逆传》）",
    appear: [194, 199], impact: 2
  },
  "qiao_rui": {
    id: "qiao_rui", name: "桥蕤",
    birth: null, death: null, faction: "zhong", roles: ["general"],
    stats: { lead: 70, war: 72, int: 54, pol: 46, cha: 50 },
    skills: [
      { id: "kuxian", name: "苦县拒守", kind: "passive", desc: "袁术部将，乐进传载从击桥蕤于苦县，皆先登有功", mod: { def: 0.08, atk: 0.06 }, tags: ["fortify"] }
    ],
    traits: ["袁术部将", "见乐进传", "后事不详"],
    bio: "袁术帐下将领，名见《三国志·乐进传》，乐进从击桥蕤于苦县，先登有功。建安二年曹操东征袁术，蕤为其拒守之将，兵败后事迹不传。（《三国志·武帝纪》《乐进传》）",
    appear: [194, 199], impact: 2
  },
  "yan_xiang": {
    id: "yan_xiang", name: "阎象",
    birth: null, death: null, faction: "zhong", roles: ["minister"],
    stats: { lead: 56, war: 44, int: 80, pol: 76, cha: 70 },
    skills: [
      { id: "jianchengdi", name: "谏称帝", kind: "passive", desc: "袁术议僭号，象以周文王三分天下有其二服事殷室为谏", mod: { morale: 4, recruit: 0.06 }, tags: ["ritual"] }
    ],
    traits: ["袁术主簿", "谏止僭号", "直言见疏"],
    bio: "袁术帐下主簿。建安二年袁术议僭号称帝，阎象进谏，以周室自后稷至文王积德累功尚服事殷室为言，谓未可也，术不悦。（《后汉书·袁术传》）后事不详。",
    appear: [194, 199], impact: 2
  },
  "yang_hong_zhong": {
    id: "yang_hong_zhong", name: "杨弘",
    birth: null, death: null, faction: "zhong", roles: ["minister"],
    stats: { lead: 58, war: 52, int: 72, pol: 66, cha: 56 },
    skills: [
      { id: "zhangshi", name: "仲氏长史", kind: "passive", desc: "袁术长史，术死后率部曲欲归孙策，为刘勋所邀击", mod: { recruit: 0.08, morale: 3 }, tags: ["rally"] }
    ],
    traits: ["袁术长史", "术死后率众", "众为刘勋所虏"],
    bio: "袁术帐下长史。建安四年袁术死，杨弘与大将军张勋等率其部曲欲归孙策，途经庐江，为太守刘勋所邀击，部众尽被虏。（《三国志·孙讨逆传》）",
    appear: [194, 199], impact: 2
  },
  "yuan_yin": {
    id: "yuan_yin", name: "袁胤",
    birth: null, death: null, faction: "zhong", roles: ["minister"],
    stats: { lead: 54, war: 48, int: 66, pol: 64, cha: 58 },
    skills: [
      { id: "zongzu", name: "袁氏宗族", kind: "passive", desc: "袁术宗族亲党，术僭号时居其党与之列，术败后无闻", mod: { recruit: 0.06, morale: 3 }, tags: ["ritual"] }
    ],
    traits: ["袁术宗族", "术之亲党", "后事不详"],
    bio: "袁术宗族亲党，袁术僭号时为其党与之一。袁术败亡后事迹不见于正史，仅散见于《三国志》《后汉书》袁术相关记述。",
    appear: [194, 199], impact: 1
  },
  "sun_xiang": {
    id: "sun_xiang", name: "孙香",
    birth: null, death: null, faction: "zhong", roles: ["general"],
    stats: { lead: 62, war: 66, int: 56, pol: 52, cha: 56 },
    skills: [
      { id: "sunshi_zongzu", name: "孙氏宗族", kind: "passive", desc: "孙氏宗族，从孙坚起兵，后留事袁术，为术部将", mod: { atk: 0.06, recruit: 0.06 }, tags: ["rally"] }
    ],
    traits: ["孙氏宗族", "袁术部将", "事迹散见裴注"],
    bio: "孙氏宗族，袁术帐下部将，事迹散见于《三国志》吴书裴注引《江表传》。袁术败亡之后事迹不传。",
    appear: [189, 199], impact: 1
  }
};
