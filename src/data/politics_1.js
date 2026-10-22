/* 《代汉涂高》 — 朝局（分册一）：政争事件、议政之题、储位候选
 * 依据《三国志》及裴松之注、《后汉书》《资治通鉴》《晋书》《汉晋春秋》等。
 * 年份区间：184—265。 */
(function (root) {
  'use strict';

  var POLITICS = {
    events: [
      {
        id: 'jiao_qiyi_184',
        name: '苍天已死',
        year: 184,
        factions: ['huangjin'],
        lords: ['zhangjiao'],
        scene: [
          { t: 'narration', text: '光和七年（184）春，太平道弟子济南唐周上书告变，马元义被捕于洛阳，车裂于市，信向张角者诛杀千余人。' },
          { t: 'line', who: '张角', text: '苍天已死，黄天当立；岁在甲子，天下大吉。' },
          { t: 'narration', text: '角知事已露，晨夜驰敕诸方。旬日之间八州并起，皆著黄巾为标帜，燔烧官府，劫略聚邑，州郡失据，长吏多委城遁走，京师震动。' },
          { t: 'inner', who: '张角', text: '本欲甲子之岁内外俱发，今谋已泄，元义死矣。早发则力分，迟发则坐待屠戮——与其待诛，不若先举。' },
          { t: 'history', text: '弟子济南唐周上书告之，于是捕马元义，车裂于洛阳，诛杀信向角者千余人。角等知事已露，晨夜驰敕诸方，一时俱起。', src: '《后汉书·皇甫嵩传》' },
          { t: 'history', text: '角称天公将军，角弟宝称地公将军，宝弟梁称人公将军。', src: '《后汉书·皇甫嵩传》' }
        ],
        choice: {
          prompt: '唐周既叛，洛阳诛杀方炽，甲子之期已泄，诸方或未毕集。角当如何？',
          options: [
            { text: '即日俱起，先据州县', reply: '角驰敕诸方，同日并起。旬日之间天下响应，郡县焚毁，长吏遁走；然事出仓卒，器甲粮秣皆无所出，青徐之众亦未尽集。', inner: '早发则势分，迟发则受诛。今日之举，成则黄天，败则族灭。', effect: { troops: 2500, morale: 8, food: -200, court: { strife: 6, legit: 4 }, flag: 'jiao_tongri' } },
            { text: '敛众据险，待其毕集', reply: '角分遣弟子，约期未发。朝廷得以遣卢植、皇甫嵩分道而北，河北诸方各自为战，仓廪未备而大军已至。', inner: '先固根本而后争天下，方是万全。', effect: { troops: 1200, morale: -4, food: 200, court: { strife: -3, loyalty: 3 } } }
          ]
        },
        src: '《后汉书·皇甫嵩传》《后汉书·灵帝纪》'
      },
      {
        id: 'dong_dingyuan_189',
        name: '丁原之诛',
        year: 189,
        factions: ['dong'],
        lords: ['dongzhuo'],
        scene: [
          { t: 'narration', text: '中平六年（189）八月，大将军何进召外兵入洛，为宦者所杀。董卓自河东驰至洛阳，步骑不过三千，数日之间收何进、何苗部曲，又使吕布杀执金吾丁原而并其众。' },
          { t: 'line', who: '董卓', text: '天下之事，岂不决我？我今为之，谁敢不从！' },
          { t: 'line', who: '吕布', text: '原虽有恩于布，而凉州之众方盛。布愿弃暗投明，执鞭以从。' },
          { t: 'inner', who: '董卓', text: '以三千之众入洛，何以服三辅之豪？得并州之众，则洛阳在我的手中。' },
          { t: 'history', text: '卓又使吕布杀执金吾丁原而并其众。', src: '《三国志·董卓传》' },
          { t: 'history', text: '卓以布见信于原，诱布令杀原。布斩原首诣卓，卓以布为骑都尉，甚爱信之，誓为父子。', src: '《三国志·吕布传》' }
        ],
        choice: {
          prompt: '丁原掌禁兵，吕布为其部曲。卓欲并其众，二人可并用，亦可去其一。',
          options: [
            { text: '诱吕布杀丁原，并其众', reply: '布斩原首以献，卓以布为骑都尉，誓为父子。并州之众尽入卓军，洛阳禁兵遂为一家。', inner: '以布之勇为我之爪，以父子之名为我之链。', effect: { troops: 2200, morale: 6, court: { strife: 4, loyalty: 3 }, unlockGeneral: 'lv_bu', flag: 'dong_binglv' } },
            { text: '留丁原统众，以恩抚之', reply: '卓厚待丁原，欲全其众。丁原自以汉臣，数与卓异议；凉州诸将观望，其众终不为卓所用。', inner: '并州之兵可并，并州之将未必可驯。', effect: { troops: 800, prestige: 3, court: { strife: 6, loyalty: -4 } } }
          ]
        },
        src: '《三国志·董卓传》《三国志·吕布传》'
      },
      {
        id: 'dong_feili_189',
        name: '废立之议',
        year: 189,
        factions: ['dong'],
        lords: ['dongzhuo'],
        scene: [
          { t: 'narration', text: '九月，卓大会群僚，议废少帝辩而立陈留王协。' },
          { t: 'line', who: '董卓', text: '今上暗弱，不可以奉宗庙；陈留王贤，宜承大统。' },
          { t: 'line', who: '袁绍', text: '今上富于春秋，未有不善宣于天下。公欲废嫡立庶，恐众不从公议。' },
          { t: 'line', who: '董卓', text: '竖子！天下之事岂不在我？我欲为之，谁敢不从！' },
          { t: 'narration', text: '袁绍横刀长揖而去，奔冀州；卢植亦执异议，卓免其官。朝中遂无敢争者。' },
          { t: 'inner', who: '董卓', text: '绍去、植免，殿上无人复言。然士人之心，自此不与凉州同。' },
          { t: 'history', text: '卓议废帝，袁绍争之，卓按剑叱绍；绍横刀长揖而去。卢植亦以异议免官。', src: '《三国志·董卓传》《三国志·袁绍传》' },
          { t: 'history', text: '中平六年九月甲戌，董卓废少帝为弘农王，立陈留王协为帝。', src: '《后汉书·献帝纪》' }
        ],
        choice: {
          prompt: '废立既决，朝士侧目，袁绍已奔冀州。卓当如何处此？',
          options: [
            { text: '废少帝，立陈留王', reply: '帝废为弘农王，陈留王即位，改元永汉。群臣北面而贺，无人复言；卓自为太尉，俄迁相国。', inner: '名器在手，则天下之势在我。', effect: { gold: 200, prestige: -4, court: { strife: 10, legit: -6 }, flag: 'dong_feili' } },
            { text: '寝其议，以恩礼安朝士', reply: '卓暂寝废立之事，而士人之疑未解。袁绍在冀州，山东之兵已有名矣。', inner: '今日不废，他日未必能废。', effect: { prestige: 3, morale: -2, court: { strife: -4, legit: 2 } } }
          ]
        },
        src: '《三国志·董卓传》《后汉书·献帝纪》'
      },
      {
        id: 'sunjian_yuanshu_190',
        name: '依袁术之议',
        year: 190,
        factions: ['wu'],
        lords: ['sunjian'],
        scene: [
          { t: 'narration', text: '初平元年（190），孙坚自长沙起兵讨董卓，北至鲁阳，众数万。袁术屯鲁阳，军粮在焉。' },
          { t: 'line', who: '袁术', text: '将军兵精而粮少，吾有鲁阳之粟。若相与合势，表将军行破虏将军，如何？' },
          { t: 'line', who: '孙坚', text: '讨贼之事，不以兵属人；然无粮则不能行。' },
          { t: 'narration', text: '坚遂与术合，术表坚行破虏将军，领豫州刺史。坚进屯阳人，与卓军战，斩华雄，卓乃西迁。' },
          { t: 'inner', who: '孙坚', text: '长沙之众，为汉室而起，非为一袁氏。然今日之势，无粮则坐亡，忍一时之屈，乃能北向洛阳。' },
          { t: 'history', text: '坚引军屯鲁阳，与袁术合，术表坚行破虏将军，领豫州刺史。', src: '《三国志·孙坚传》' },
          { t: 'history', text: '坚复相收兵，合战于阳人，大破卓军，枭其都督华雄等。', src: '《三国志·孙坚传》' }
        ],
        choice: {
          prompt: '袁术以军粮相邀，欲以坚之兵为己用。坚当如何？',
          options: [
            { text: '依袁术，受其表而给粮', reply: '坚受破虏将军之号，得鲁阳之粮，遂进屯阳人，斩华雄，破卓军。凉州兵退，洛阳之望复开。', inner: '借人之粮以行吾志，非屈也。', effect: { gold: 300, food: 300, troops: 1500, prestige: 5, relation: { who: 'zhong', value: 15 }, flag: 'wu_yuanshu' } },
            { text: '自据长沙，不附于人', reply: '坚不附袁术，独以长沙之众北上。军至南阳而粮尽，士卒逃亡者众，鲁阳之粟终不可得。', inner: '宁以饥而自立，不以饱而受制。', effect: { troops: -600, food: -200, morale: -4, court: { strife: 4, legit: 3 } } }
          ]
        },
        src: '《三国志·孙坚传》'
      },
      {
        id: 'yuan_jizhou_191',
        name: '冀州之夺',
        year: 191,
        factions: ['yuan'],
        lords: ['yuanshao'],
        scene: [
          { t: 'narration', text: '初平二年（191），绍屯河内，兵少粮乏；冀州牧韩馥据邺，以军粮相济，而心畏绍之强。' },
          { t: 'line', who: '逢纪', text: '可与公孙瓒相闻，导使来南，击取冀州。瓒兵必至，韩馥必惧；因说以危亡之势，馥必让州。' },
          { t: 'line', who: '荀谌', text: '公孙瓒提燕、代之卒，其锋不可当；袁车骑引军东向，未识其意。冀州者，天下重资也，君当自度能保之否。' },
          { t: 'narration', text: '馥遂让冀州，绍领冀州牧。馥自有让州之名，而终不能自安，后依张邈，卒自杀。' },
          { t: 'inner', who: '袁绍', text: '吾家四世三公，门生故吏布于天下，而无一郡之土、一旅之众，终为人客。冀州者，伯业之本也。' },
          { t: 'history', text: '绍用逢纪之谋，连结公孙瓒使南下，复遣荀谌说馥，馥遂让冀州。绍领冀州牧，冀州兵众尽归之。', src: '《三国志·袁绍传》' },
          { t: 'history', text: '绍遂领冀州牧，承制以馥为奋威将军，而无所将御。', src: '《三国志·袁绍传》' }
        ],
        choice: {
          prompt: '韩馥据冀州而性怯，公孙瓒之兵已南下。绍欲得州，唯有胁与说。',
          options: [
            { text: '连结公孙瓒，说馥让州', reply: '瓒兵入冀南，荀谌入邺说馥。馥果让州，绍领冀州牧，遂有带甲十万之资；然公孙瓒亦以绍为欺己，界桥之战始于此。', inner: '借人之兵以取州，然后与之争河北。', effect: { gold: 600, food: 500, troops: 2000, prestige: 6, court: { strife: 4, loyalty: -2 }, flag: 'yuan_jizhou' } },
            { text: '以兵取邺，不与瓒分功', reply: '绍遣兵向邺，馥闭城自守，军中粮少，师老而州未下；公孙瓒已据其北，河北之势遂相持。', inner: '以一州之得失，何必假手于人。', effect: { troops: -800, food: -300, morale: -4, court: { strife: 6 } } }
          ]
        },
        src: '《三国志·袁绍传》《后汉书·袁绍传》'
      },
      {
        id: 'liuyan_hanzhong_191',
        name: '米贼断道',
        year: 191,
        factions: ['yi'],
        lords: ['liuyan'],
        scene: [
          { t: 'narration', text: '初平二年（191），刘焉遣督义司马张鲁与张修击汉中，杀太守苏固。张鲁复杀张修而并其众，遂据汉中。' },
          { t: 'narration', text: '鲁既得汉中，断斜谷阁道，杀汉使。益州与关中之路由是断绝。' },
          { t: 'line', who: '张鲁', text: '阁道已断，天使不复能来，明公可专治益州矣。' },
          { t: 'line', who: '刘焉', text: '米贼断道，不得复通。' },
          { t: 'inner', who: '刘焉', text: '益州四塞之地，昔者高祖因之以成帝业。今道路既绝，朝廷之诏不至，我即益州之主矣。' },
          { t: 'history', text: '焉乃以张鲁为督义司马，与张修击汉中太守苏固；鲁遂杀修，并其众，断斜谷，杀汉使。焉上书言米贼断道，不得复通。', src: '《三国志·刘焉传》' },
          { t: 'history', text: '焉意渐盛，造作乘舆车具千余乘，荆州牧刘表上言焉有似子夏在西河疑圣人之论。', src: '《后汉书·刘焉传》' }
        ],
        choice: {
          prompt: '汉中既断，朝廷之使不复至。焉当自处其名。',
          options: [
            { text: '托言米贼断道，专据益州', reply: '焉上言米贼断道，不复通贡，而益州之政皆出于己，又作乘舆车具千余乘，州人皆知其有异志。', inner: '汉祚已衰，益州之土，可为我之基。', effect: { gold: 400, prestige: -3, court: { legit: -8, strife: 5 }, flag: 'yi_duandao' } },
            { text: '仍通贡献，示无他志', reply: '焉遣使绕道通贡不绝。朝廷嘉之，加焉益州牧；然关中之乱益甚，使者往还多在道死。', inner: '通贡之名，可以缓天下之疑。', effect: { prestige: 5, court: { legit: 5, strife: -3, loyalty: 3 } } }
          ]
        },
        src: '《三国志·刘焉传》《后汉书·刘焉传》'
      },
      {
        id: 'dong_wangyun_192',
        name: '王允诛卓',
        year: 192,
        factions: ['dong'],
        lords: ['dongzhuo'],
        scene: [
          { t: 'narration', text: '初平三年（192）四月，帝病新愈，大会于未央殿，百官毕集。卓以王允为司徒，信任不疑。' },
          { t: 'narration', text: '王允、士孙瑞、吕布等密谋，伏兵于门内，诱卓入朝。' },
          { t: 'line', who: '董卓', text: '布何在！' },
          { t: 'line', who: '吕布', text: '有诏讨贼臣。' },
          { t: 'narration', text: '卓死于车下。长安市上歌呼相庆，然未及三月，李傕、郭汜自陕西还，攻围长安，八日而城陷，吕布走，王允死。' },
          { t: 'inner', who: '董卓', text: '甲士环立，刃在吕布手中。彼为我之义子，何疑？——我之疑，唯在人心。' },
          { t: 'history', text: '布应声持矛刺卓，卓伤臂堕车，顾大呼曰：吕布何在？布曰：有诏讨贼臣。遂杀卓。', src: '《三国志·董卓传》' },
          { t: 'history', text: '卓部曲李傕、郭汜等攻围长安，城陷，吕布败走，王允被杀。', src: '《后汉书·献帝纪》' }
        ],
        choice: {
          prompt: '帝疾新愈，大会未央殿，王允、吕布在侧。卓欲行，必先有其备。',
          options: [
            { text: '亲赴未央殿，以吕布自卫', reply: '卓入至殿门，伏兵猝起。卓大呼吕布，布持矛应声而前，卓死于车下；凉州之众旦夕瓦解，李傕、郭汜旋又攻陷长安。', inner: '布为我之爪牙，天下无敢当者——何疑之有。', effect: { troops: -2500, prestige: -6, court: { strife: 12, legit: -8 }, flag: 'dong_zhuowang' } },
            { text: '称疾不行，召王允、吕布入府', reply: '卓称疾不入，而王允、士孙瑞之谋未息，吕布在侧，卓终不悟。旬日之间，军中流言四起。', inner: '合于朝者，未必皆吾之人。', effect: { troops: -800, court: { strife: 6, loyalty: -5 }, flag: 'dong_bing' } }
          ]
        },
        src: '《三国志·董卓传》《后汉书·献帝纪》'
      },
      {
        id: 'zhong_chenghao_197',
        name: '僭号之议',
        year: 197,
        factions: ['zhong'],
        lords: ['yuanshu'],
        scene: [
          { t: 'narration', text: '建安二年（197）春，术以河内张炯符命及所得传国玺为据，议即尊号于寿春。' },
          { t: 'line', who: '袁术', text: '今刘氏微弱，海内鼎沸。吾家四世三公，百姓所归，欲应天顺民，于诸君意何如？' },
          { t: 'line', who: '阎象', text: '昔周自后稷至于文王，积德累功，三分天下有其二，犹服事殷。明公虽奕世克昌，未若有周之盛；汉室虽微，未若殷纣之暴也。' },
          { t: 'narration', text: '术不悦，遂僭号，置百官，郊祀天地。孙策以书绝之，吕布执其使者送于许，曹操以诏讨之。' },
          { t: 'inner', who: '袁术', text: '汉祚将尽，而孙策据江东，吕布在徐土，我据淮南之富。若不先取尊号，则人皆以为我终为他人之臣。' },
          { t: 'history', text: '术以袁氏四世三公、百姓所归，又得传国玺，遂议即尊号；阎象谏以周文王服事殷之事，术不悦。', src: '《后汉书·袁术传》《三国志·袁术传》' },
          { t: 'history', text: '时袁术僭号，策以书责而绝之。', src: '《三国志·孙策传》' }
        ],
        choice: {
          prompt: '淮南之富足以自奉，然僭号之后，天下皆以我为贼。术将如何？',
          options: [
            { text: '即皇帝位，置百官', reply: '术称帝于寿春，郊祀天地。孙策以书绝之，吕布执其使，曹操以诏讨之；淮南之众，自此皆知其为天下所弃。', inner: '名号一立，则淮南自成一家，不复受制于人。', effect: { gold: 300, prestige: -10, court: { legit: -14, strife: 10 }, relation: { who: 'wu', value: -30 }, flag: 'shu_chenghao' } },
            { text: '寝其议，仍奉汉号', reply: '术寝僭号之议，而张炯之符命已传于外。淮南将士疑其无成，稍稍散去，江淮之间盗贼益多。', inner: '名不正则不成，然为之则天下之兵皆向我。', effect: { morale: -3, court: { legit: 4, strife: -4, loyalty: -3 } } }
          ]
        },
        src: '《三国志·袁术传》《后汉书·袁术传》'
      },
      {
        id: 'zhangxiu_guicao_199',
        name: '归曹之议',
        year: 199,
        factions: ['wan'],
        lords: ['zhangxiu'],
        scene: [
          { t: 'narration', text: '建安四年（199），曹操与袁绍相拒于官渡，皆遣使招张绣。绣欲许袁绍，贾诩时在绣座。' },
          { t: 'line', who: '贾诩', text: '归谢袁本初，兄弟不能相容，而能容天下国士乎？' },
          { t: 'line', who: '张绣', text: '袁强而曹弱，且吾与曹有杀子之仇，如之何？' },
          { t: 'line', who: '贾诩', text: '夫曹公奉天子以令天下，一也；绍强盛，我以少从之，必不见重，曹公众弱，得我必喜，二也；有霸王之志者，固将释私怨以明德于四海，三也。愿将军无疑！' },
          { t: 'narration', text: '绣从诩之议，率众降曹操。操执绣手，与欢宴，为子均娶绣女，拜扬武将军。' },
          { t: 'inner', who: '张绣', text: '杀其子而归之，天下必以我为无耻；然宛城之地，不足以当二雄，择其能容我者而从之。' },
          { t: 'history', text: '太祖拒袁绍于官渡，绣从贾诩计，复率众降太祖；太祖执其手，与欢宴，以为扬武将军。', src: '《三国志·张绣传》' },
          { t: 'history', text: '诩说绣曰：曹公奉天子以令天下，其宜从一也；绍强盛，我以少从之，必不见重，曹公众弱，得我必喜，其宜从二也；有霸王之志者，固将释私怨以明德于四海，其宜从三也。', src: '《三国志·贾诩传》' }
        ],
        choice: {
          prompt: '袁曹皆遣使来招，绣与曹操有杀子之仇。归此归彼，皆决于今日。',
          options: [
            { text: '从贾诩之议，率众降曹', reply: '绣率众降曹操，操执其手与欢宴，为子娶绣女，拜绣扬武将军。宛城之众，遂为官渡之一军。', inner: '曹公若真能容我，则其志不在私怨——此正其所畏也。', effect: { gold: 300, troops: 600, prestige: 4, relation: { who: 'wei', value: 20 }, court: { strife: -4, legit: 3 }, flag: 'wan_guicao' } },
            { text: '北结袁绍，与之并力', reply: '绣谢曹使而结袁绍。绍虽许之，而以绣之众为偏师，粮仗多不给；官渡战后，宛城亦不能自守。', inner: '袁氏之强，足以蔽我。', effect: { troops: 300, prestige: -3, relation: { who: 'yuan', value: 20 }, court: { strife: 6, loyalty: -4 } } }
          ]
        },
        src: '《三国志·张绣传》《三国志·贾诩传》'
      },
      {
        id: 'wei_dongcheng_200',
        name: '董承之案',
        year: 200,
        factions: ['wei'],
        lords: ['caocao'],
        scene: [
          { t: 'narration', text: '建安五年（200）春正月，车骑将军董承等自称受诏于帝，谋诛曹操，事泄。' },
          { t: 'line', who: '董承', text: '吾受诏于帝，当诛曹公。事若不密，则族灭；事若成，则汉室复安。' },
          { t: 'line', who: '曹操', text: '承等自以为奉天子之诏，而不知兵在谁手。' },
          { t: 'narration', text: '承与长水校尉种辑、将军吴子兰等皆伏诛；董贵人亦见收，帝请之而不得。' },
          { t: 'inner', who: '曹操', text: '吾奉天子以令诸侯，而天子身旁处处可生变。欲安朝廷，唯先去其谋我者。' },
          { t: 'history', text: '五年春正月，董承等谋泄，皆伏诛。', src: '《三国志·武帝纪》' },
          { t: 'history', text: '董承女为贵人，操诛承而求贵人杀之。帝以贵人有妊，累为请，不能得。', src: '《后汉书·皇后纪》' }
        ],
        choice: {
          prompt: '密谋已泄，连及贵人。曹操当决其罪之轻重。',
          options: [
            { text: '尽诛其党，夷三族', reply: '承、辑等皆夷三族，董贵人亦被收杀。许都之内，无人复敢私议于禁中；天子左右，皆操之人矣。', inner: '宽之则继起者众，严之则天下侧目——然朝廷不可再有一变。', effect: { court: { purgeDeath: 'dong_cheng', strife: 8, legit: -6, loyalty: 4 }, prestige: -3, flag: 'wei_dongcheng' } },
            { text: '但诛首谋，不问余人', reply: '操但收董承等数人下狱，余皆不问，贵人亦得全。许都士人稍安，而禁中之人自此皆以自保为心。', inner: '杀之太尽，则人人自危，反生他变。', effect: { court: { purge: 'dong_cheng', strife: -2, legit: 2, loyalty: 2 }, prestige: 3 } }
          ]
        },
        src: '《三国志·武帝纪》《后汉书·皇后纪》'
      },
      {
        id: 'sunce_chuandi_200',
        name: '传弟之议',
        year: 200,
        factions: ['wu'],
        lords: ['sunce'],
        scene: [
          { t: 'narration', text: '建安五年（200）四月，策猎于丹徒山中，为前吴郡太守许贡之客所射，伤重，医言不可治。' },
          { t: 'line', who: '孙策', text: '举江东之众，决机于两陈之间，与天下争衡，卿不如我；举贤任能，各尽其心，以保江东，我不如卿。' },
          { t: 'line', who: '张昭', text: '今江东未定，外有曹操、刘表之伺，内无主则乱。请以仲谋嗣，昭与周瑜共辅之。' },
          { t: 'narration', text: '策呼权，佩以印绶，谓昭等曰：中国方乱，以吴越之众、三江之固，足以观成败，公等善相吾弟。遂卒，年二十六。' },
          { t: 'inner', who: '孙策', text: '吾子绍幼，若以子嗣，则江淮之众必散。弟权虽少，能任事——江东之业，重于吾之血脉。' },
          { t: 'history', text: '策临卒，呼权佩以印绶，谓曰：举江东之众，决机于两陈之间，与天下争衡，卿不如我；举贤任能，各尽其心，以保江东，我不如卿。', src: '《三国志·孙策传》' },
          { t: 'history', text: '策谓昭等曰：中国方乱，以吴越之众、三江之固，足以观成败，公等善相吾弟。', src: '《三国志·孙策传》' }
        ],
        choice: {
          prompt: '创已深，医言不治。子绍幼，弟权在侧，张昭、周瑜皆在。',
          options: [
            { text: '传位于弟权，属昭、瑜辅之', reply: '策执权手授以印绶，属以后事。权既立，张昭、周瑜同心辅之，江东之众无一人散；曹操闻之，表权为讨虏将军。', inner: '江东之业，非幼子所能守。传之贤弟，犹在孙氏。', effect: { court: { sealHeir: 'sun_quan', strife: -6, legit: 4, loyalty: 6 }, prestige: 4, flag: 'wu_chuandi' } },
            { text: '以子绍嗣，托孤于张昭', reply: '策以幼子绍为嗣，托之于张昭。江东诸将以外有强敌而主少，各拥兵自守；权居丹徒，未有所统。', inner: '父子之继，名正言顺，他人无可议。', effect: { troops: -600, morale: -4, court: { strife: 12, loyalty: -8, legit: -4 } } }
          ]
        },
        src: '《三国志·孙策传》《三国志·吴主传》'
      },
      {
        id: 'yuan_lisi_202',
        name: '邺下立嗣',
        year: 202,
        factions: ['yuan'],
        lords: ['yuanshao'],
        requires: { heir: false },
        scene: [
          { t: 'narration', text: '建安七年（202）夏五月，绍自官渡败还，发病呕血，卒于邺。绍有三子：谭、熙、尚。' },
          { t: 'line', who: '沮授', text: '世称万人逐兔，一人获之，贪者悉止，分定故也。愿上惟先代成败之诫，下思逐兔分定之义。' },
          { t: 'line', who: '袁绍', text: '吾欲令诸子各据一州，以观其能。' },
          { t: 'narration', text: '绍以谭为青州刺史、熙为幽州刺史，而尚留邺。绍卒，审配、逢纪矫遗命奉尚为嗣；辛评、郭图素与配有隙，遂附谭。谭自称车骑将军，屯黎阳，兄弟交兵。' },
          { t: 'inner', who: '袁绍', text: '谭长而疏，尚少而亲。以天下之重，付之于长，还是付之于爱？' },
          { t: 'history', text: '沮授谏绍以逐兔分定之义，绍曰：吾欲令诸子各据一州，以观其能。', src: '《三国志·袁绍传》《后汉书·袁绍传》' },
          { t: 'history', text: '绍卒，审配等矫绍遗命，奉尚为嗣；谭怒，遂与尚相攻。', src: '《后汉书·袁绍传》' }
        ],
        choice: {
          prompt: '绍病已深，三子各据州郡，嗣位未定。配、纪党尚，评、图党谭。',
          options: [
            { text: '立谭为嗣，以长为先', reply: '绍立谭为嗣，而审配、逢纪等以绍意在尚，卒矫遗命奉尚。谭怒而相攻于黎阳，河北之力尽耗于内。', inner: '立长则名正，然吾素爱尚——名正者未必能安。', effect: { prestige: 4, court: { sealHeir: 'yuan_tan', strife: -6, legit: 4, loyalty: 3 } } },
            { text: '立尚为嗣，以宠为命', reply: '绍立尚为嗣。逢纪、审配奉之，辛评、郭图拥谭；兄弟交兵，曹操乘之，河北遂亡。', inner: '尚在我膝下最久，吾知其能承吾业。', effect: { troops: -400, court: { sealHeir: 'yuan_shang', strife: 12, legit: -4, loyalty: -6 } } }
          ]
        },
        src: '《三国志·袁绍传》《后汉书·袁绍传》'
      },
      {
        id: 'liao_gongsun_si_204',
        name: '辽东之嗣',
        year: 204,
        factions: ['liaodong'],
        lords: ['gongsundu'],
        requires: { heir: false },
        scene: [
          { t: 'narration', text: '建安九年（204），公孙度病笃。度自中平以来据辽东，东伐高句骊，西击乌丸，越海收东莱诸县，置营州刺史，辽东之众唯知有公孙氏。' },
          { t: 'line', who: '公孙度', text: '此土汉之辽东，而我之辽东也。尔曹宜自择所从。' },
          { t: 'line', who: '公孙恭', text: '兄康有干略，诸将所服；愿以辽东属之。' },
          { t: 'narration', text: '度卒，子康嗣。康既立，斩袁尚、袁熙之首以献曹操，辽东得安者十余年；康卒之后，恭立而渊夺之。' },
          { t: 'inner', who: '公孙度', text: '康，吾之长子，能守吾土；恭，其次也，宽而弱。辽东之地，不可以弱守。' },
          { t: 'history', text: '度死，子康嗣。康死，弟恭立。恭病弱，康子渊胁夺恭位。', src: '《三国志·公孙度传》' },
          { t: 'history', text: '康斩送尚、熙首，太祖表康为左将军，封襄平侯。', src: '《三国志·公孙度传》' }
        ],
        choice: {
          prompt: '度病笃，二子在侧：康长而有干略，恭次而宽厚。辽东之众，终当有所属。',
          options: [
            { text: '属长子康，使统其众', reply: '度属其众于康。康既立，斩袁尚、袁熙之首以献曹操，辽东得安者十余年。', inner: '守边者须有威，宽厚者不能驭悍将。', effect: { troops: 600, prestige: 3, court: { sealHeir: 'gongsun_kang', strife: -4, legit: 3 } } },
            { text: '属次子恭，以宽和守土', reply: '度属其众于恭。恭宽而弱，不能制诸将；后康子渊既长，胁夺其位，辽东之内终以兵相取。', inner: '宽者不虐民，或不失人心。', effect: { troops: -300, court: { sealHeir: 'gongsun_gong', strife: 8, loyalty: -4 } } }
          ]
        },
        src: '《三国志·公孙度传》'
      },
      {
        id: 'liao_gongsunkang_207',
        name: '斩二袁之议',
        year: 207,
        factions: ['liaodong'],
        lords: ['gongsunkang'],
        scene: [
          { t: 'narration', text: '建安十二年（207）秋，曹操破乌丸蹋顿于柳城，袁尚、袁熙与乌丸余众奔辽东，从者数千骑。' },
          { t: 'narration', text: '太祖不追，以待辽东之变。辽东诸将或请执二袁以献曹操，或请纳之，以其众为我用。' },
          { t: 'line', who: '袁尚', text: '愿将军借我精兵，共复河北；河北既复，辽左之地，尽以相报。' },
          { t: 'line', who: '公孙康', text: '二袁者，吾之赘疣也；操之兵，已在柳城之外。' },
          { t: 'narration', text: '康斩尚、熙，送首于操。操以其功，表康为左将军，封襄平侯；辽东之众，自是不复北顾。' },
          { t: 'inner', who: '公孙康', text: '纳二袁，则曹操之兵必至辽东；斩二袁，则二袁之众为我所有，而操亦无辞。' },
          { t: 'history', text: '尚、熙奔辽东，太祖不追；辽东太守公孙康斩尚、熙，传其首。', src: '《三国志·武帝纪》' },
          { t: 'history', text: '康斩送尚、熙首，太祖表康为左将军，封襄平侯。', src: '《三国志·公孙度传》' }
        ],
        choice: {
          prompt: '二袁穷而来奔，操兵在境。辽东当自择其祸福。',
          options: [
            { text: '斩二袁，送首于曹', reply: '康斩尚、熙，传首于曹操，得拜左将军、襄平侯。辽东据海自守者四十余年，其基自此始。', inner: '以二袁之首，换辽东十年之安。', effect: { gold: 300, troops: 300, prestige: 5, relation: { who: 'wei', value: 25 }, court: { strife: -4, legit: 3 }, flag: 'liao_zhanshang' } },
            { text: '纳二袁，据辽东南拒曹操', reply: '康纳二袁之众，欲与曹操相拒于辽水。袁氏之众新败而骄，粮仗皆仰给于辽东；未几内溃，曹操之兵亦至。', inner: '扶衰继绝，天下或以为义。', effect: { troops: 800, prestige: -4, relation: { who: 'wei', value: -30 }, court: { strife: 6, loyalty: -4 } } }
          ]
        },
        src: '《三国志·武帝纪》《三国志·公孙度传》'
      },
      {
        id: 'jing_lisi_208',
        name: '荆州立嗣',
        year: 208,
        factions: ['jing'],
        lords: ['liubiao'],
        requires: { heir: false },
        scene: [
          { t: 'narration', text: '建安十三年（208）春，曹操北还，荆州议者皆知兵将至。表二子：琦长，琮少。' },
          { t: 'narration', text: '蔡瑁者，表后妻之弟；张允者，表之甥，皆党于琮。琦与蔡氏有隙，求出为江夏太守。' },
          { t: 'line', who: '蔡瑁', text: '琦在江夏，拥兵于外；若立琦，则荆州之政不在将军之手。' },
          { t: 'line', who: '刘琦', text: '儿愿为诸将之先，守江夏以拒北兵。' },
          { t: 'inner', who: '刘表', text: '琦长，而蔡氏恶之；琮少，而蔡氏爱之。立长则内不安，立爱则外不服——荆州之患，不在曹操也。' },
          { t: 'history', text: '表及妻爱少子琮，欲立之，出长子琦为江夏太守；蔡瑁、张允等皆党于琮。', src: '《三国志·刘表传》《后汉书·刘表传》' },
          { t: 'history', text: '表卒，琮嗣立，遂以荆州之众降于曹操。', src: '《三国志·刘表传》' }
        ],
        choice: {
          prompt: '表病笃，琮在襄阳，琦在江夏。蔡瑁、张允请立琮。',
          options: [
            { text: '立长子琦，以正名分', reply: '表立琦为嗣。蔡瑁、张允快快不悦，琮之党潜结诸将；曹操未至，而荆州已自分矣。', inner: '立长则名正，然蔡氏之党必不安。', effect: { prestige: 3, court: { sealHeir: 'liu_qi', strife: 6, legit: 2, loyalty: -3 } } },
            { text: '立少子琮，以安蔡氏之党', reply: '表立琮为嗣，以蔡瑁典兵，张允统水军。及表卒，琮遂以荆州之众降曹操，琦奔江南。', inner: '安内而后可以拒外，虽屈于名分，犹胜于内乱。', effect: { gold: 200, court: { sealHeir: 'liu_cong', strife: -4, legit: -2, loyalty: 4 }, relation: { who: 'wei', value: 10 } } }
          ]
        },
        src: '《三国志·刘表传》《后汉书·刘表传》'
      },
      {
        id: 'yi_yingbei_211',
        name: '迎刘备之议',
        year: 211,
        factions: ['yi'],
        lords: ['liuzhang'],
        scene: [
          { t: 'narration', text: '建安十六年（211），曹操遣钟繇向汉中，刘璋惧。张松因说璋迎刘备入蜀，使讨张鲁。' },
          { t: 'line', who: '张松', text: '曹公兵强，若取汉中则巴蜀危矣。宜迎刘豫州使讨张鲁，鲁破则益州强，曹公虽来，无能为也。' },
          { t: 'line', who: '黄权', text: '左将军有骁名，今请到，欲以部曲遇之，则不满其心；欲以宾客礼待，则一国不容二君。若客有泰山之安，则主有累卵之危。' },
          { t: 'narration', text: '王累自倒悬于州门以谏，璋不听。法正将四千人迎刘备，璋前后馈遗以巨亿。' },
          { t: 'inner', who: '刘璋', text: '张鲁在汉中，我之世仇；曹公在其后。以刘备为我拒鲁，犹以虎守门——然门已无人可守。' },
          { t: 'history', text: '张松说璋迎先主，黄权谏以为不可，璋不听，出权为广汉长。', src: '《三国志·黄权传》' },
          { t: 'history', text: '璋遣法正将四千人迎先主，前后赂遗以巨亿计；先主入蜀，屯葭萌。', src: '《三国志·先主传》' }
        ],
        choice: {
          prompt: '张松劝迎刘备以讨张鲁；黄权、王累以为不可。璋当决之。',
          options: [
            { text: '从张松之议，迎刘备入蜀', reply: '璋遣法正将兵迎刘备，馈遗巨亿。刘备入屯葭萌，厚树恩德以收众心；未及二年，反兵向成都。', inner: '引外兵以除世仇，事成则益州安全，事败则引狼入室——然张鲁已逼，无他策。', effect: { gold: -500, troops: 500, court: { strife: 10, legit: -6 }, relation: { who: 'shu', value: 20 }, flag: 'yi_yingbei' } },
            { text: '从黄权之谏，闭关拒之', reply: '璋从黄权，闭境自守，遣杨怀、高沛守白水关。张松、法正心已外向，蜀中之党遂分。', inner: '一国不容二君，此语最切。', effect: { troops: 800, prestige: 3, court: { strife: 4, legit: 3, loyalty: -2 } } }
          ]
        },
        src: '《三国志·刘璋传》《三国志·黄权传》《三国志·先主传》'
      },
      {
        id: 'liang_machao_211',
        name: '关中兵起',
        year: 211,
        factions: ['liang'],
        lords: ['mateng'],
        scene: [
          { t: 'narration', text: '建安十六年（211），曹操遣司隶校尉钟繇讨张鲁，使夏侯渊等出河东会之。关中诸将疑其袭己，马超遂与韩遂等十部俱反，屯于潼关。' },
          { t: 'narration', text: '时马腾已在邺为卫尉，家属皆在邺下；超领其父之众，留居关中。' },
          { t: 'line', who: '韩遂', text: '曹公名为讨鲁，而兵已向关中。关中之众，不可以坐待。' },
          { t: 'line', who: '马超', text: '父在邺下，而超在关中。若举兵，则父危；若不举，则关中之众尽为曹有。' },
          { t: 'inner', who: '马腾', text: '超在关中，我在邺下。超若败，我族灭；超若胜，操亦未必容我。此身为质，进退皆难。' },
          { t: 'history', text: '是时关中诸将疑繇欲自袭，马超遂与韩遂、杨秋、李堪、成宜等叛。', src: '《三国志·武帝纪》' },
          { t: 'history', text: '建安十七年五月，诛卫尉马腾，夷三族。', src: '《三国志·武帝纪》' }
        ],
        choice: {
          prompt: '超与韩遂已起兵于潼关，使者至邺，请腾之命。腾在邺为质，家属皆在许下。',
          options: [
            { text: '密遣使助超，约韩遂并力', reply: '腾密与其子通谋。超与韩遂屯潼关，曹操自将击之，超等败走凉州；腾下狱，三族皆诛。', inner: '与其坐为人质而终不免，不若使超一逞于关中。', effect: { troops: 700, gold: -200, prestige: -4, court: { strife: 8, legit: -4 }, flag: 'liang_ju' } },
            { text: '上表自陈，请入朝宿卫', reply: '腾上表自陈，具言超之反非其本心。曹操答诏慰之，而关中兵已动，邺下之防益密。', inner: '舍一子以全家，此为人父之难也。', effect: { troops: -300, prestige: 2, court: { strife: -3, legit: 3 } } }
          ]
        },
        src: '《三国志·武帝纪》《三国志·马超传》'
      },
      {
        id: 'wei_xunyu_212',
        name: '荀彧之死',
        year: 212,
        factions: ['wei'],
        lords: ['caocao'],
        scene: [
          { t: 'narration', text: '建安十七年（212），董昭等谓曹操宜进爵国公、九锡备物，以彰殊勋；曹操以问荀彧。' },
          { t: 'line', who: '荀彧', text: '曹公本兴义兵以匡朝宁国，秉忠贞之诚，守退让之实；君子爱人以德，不宜如此。' },
          { t: 'narration', text: '操由是不悦。彧疾留寿春，操馈之食，发之乃空器也，彧遂饮药而卒，年五十。' },
          { t: 'inner', who: '曹操', text: '文若从我二十余年，知我者莫如彼；然彼所守者汉也，我所图者非汉也。既不能同，则不可留。' },
          { t: 'history', text: '十七年，董昭等谓太祖宜进爵国公，九锡备物；彧以为不宜，太祖由是不悦。', src: '《三国志·荀彧传》' },
          { t: 'history', text: '太祖馈彧食，发之乃空器也，于是饮药而卒。', src: '《三国志·荀彧传》裴注引《魏氏春秋》' }
        ],
        choice: {
          prompt: '彧反对进爵之议，而魏公之策已定。操东征在即，彧疾留寿春。',
          options: [
            { text: '馈食一盒，示以进退', reply: '彧发盒而空，遂饮药卒。士林知其意者皆为之寒心；魏公九锡之议，自此无复异议。', inner: '以空器示之，使其自择——杀大臣之名，不必出于我手。', effect: { prestige: -3, court: { purgeDeath: 'xun_yu', strife: 10, loyalty: -8, legit: -6 }, flag: 'wei_konghe' } },
            { text: '下诏慰劳，存其位以收士心', reply: '操留彧在朝，不加谴责。荀氏子弟布于台省，士人皆以为魏公能容异己；而进爵之议，迟之数年乃行。', inner: '文若之望，可为我收士人之心。', effect: { prestige: 6, court: { strife: -6, loyalty: 6, legit: 3 } } }
          ]
        },
        src: '《三国志·荀彧传》及裴注引《魏氏春秋》《后汉书·荀彧传》'
      },
      {
        id: 'yi_zhangsong_212',
        name: '张松之诛',
        year: 212,
        factions: ['yi'],
        lords: ['liuzhang'],
        scene: [
          { t: 'narration', text: '建安十七年（212），刘备既入蜀，屯葭萌而不进，请璋增兵万余人及资粮，璋但许四千。张松在成都，书与刘备及法正，言大事垂可立。' },
          { t: 'line', who: '张松', text: '今大事垂可立，如何释此去乎！' },
          { t: 'line', who: '张肃', text: '松与外人通谋，祸必及我。' },
          { t: 'narration', text: '松兄广汉太守肃惧祸逮己，白璋发其谋。璋收斩松，并杀其党；法正、孟达遂决意归刘备。' },
          { t: 'line', who: '郑度', text: '刘备兵不满万，士众未附，野谷是资。宜尽驱巴西、梓潼之民，内涪水以西，仓廪野谷一皆烧除，高垒深沟以待之。' },
          { t: 'inner', who: '刘璋', text: '松，我所信也；肃，松之兄也。兄弟相告，而我杀其一。益州之士，自此孰肯尽言？' },
          { t: 'history', text: '松兄广汉太守肃，惧祸逮己，白璋发其谋，于是璋收斩松。', src: '《三国志·刘璋传》' },
          { t: 'history', text: '璋曰：吾闻拒敌以安民，未闻动民以避敌。遂不用郑度之计。', src: '《三国志·法正传》' }
        ],
        choice: {
          prompt: '张肃告发其弟，张松通敌之谋已具。郑度复陈坚壁清野之计。',
          options: [
            { text: '收斩张松，尽杀其党', reply: '璋斩张松，并戮其党。益州之士人人自危，法正、孟达遂决意归刘备；白水、涪城之险，终不能守。', inner: '背我者不可不诛，虽其亲告之，亦当死。', effect: { prestige: -3, court: { purgeDeath: 'zhang_song', strife: 10, loyalty: -8 }, flag: 'yi_zhansong' } },
            { text: '用郑度之计，坚壁清野', reply: '璋从郑度，驱巴西、梓潼之民入涪水以西，烧其仓谷，高垒以待。刘备军无所资，顿于涪城之下，益州之众始有固志。', inner: '拒敌以安民，岂可先动吾民？——然郑度之计，理实可行。', effect: { food: -200, morale: 4, troops: 600, court: { legit: 4, strife: 4, loyalty: -4 } } }
          ]
        },
        src: '《三国志·刘璋传》《三国志·法正传》《三国志·先主传》'
      },
      {
        id: 'wei_weigong_213',
        name: '魏公之议',
        year: 213,
        factions: ['wei'],
        lords: ['caocao'],
        scene: [
          { t: 'narration', text: '建安十八年（213）五月丙申，天子使御史大夫郗虑持节，策命曹操为魏公，以十郡为魏国，加九锡，大辂、戎辂、衮冕、朱户、纳陛、虎贲、鈇钺、弓矢、秬鬯皆备。' },
          { t: 'line', who: '郗虑', text: '天子有诏，策命公为魏公，建国于魏郡。' },
          { t: 'line', who: '荀攸', text: '公受汉恩，位极人臣；今建国立社，天下后世将何以言之？' },
          { t: 'narration', text: '秋七月，始建魏社稷宗庙于邺；魏国置尚书、侍中、六卿，百官皆魏之官。' },
          { t: 'inner', who: '曹操', text: '九锡者，非人臣之服也。受之，则天下知吾志；不受，则士卒二十年之血，终无所归。' },
          { t: 'history', text: '五月丙申，天子使御史大夫郗虑持节策命公为魏公，以冀州之十郡封之，加九锡。', src: '《三国志·武帝纪》' },
          { t: 'history', text: '秋七月，始建魏社稷宗庙于邺。', src: '《三国志·武帝纪》' }
        ],
        choice: {
          prompt: '天子既策命魏公、加九锡。操前此已让县自明，今当再决。',
          options: [
            { text: '受魏公九锡，建国于邺', reply: '操受策命，魏国既建，社稷宗庙立于邺，百官皆魏之官。汉之名分，自此尽归于魏。', inner: '既已行之，则不可半途；名器在我，天下自定。', effect: { gold: 400, prestige: 8, court: { legit: -8, strife: 6 }, flag: 'wei_weigong' } },
            { text: '辞九锡，居相位如故', reply: '操让而不受，天下翕然称其能让。士人称其谦让，而魏国之建制遂缓，荀彧之论复闻于朝。', inner: '取之太急，则四方皆以为汉贼。', effect: { gold: -200, prestige: 6, court: { legit: 6, strife: -4, loyalty: 6 } } }
          ]
        },
        src: '《三国志·武帝纪》《后汉书·献帝纪》'
      },
      {
        id: 'wei_fuhou_214',
        name: '伏后之废',
        year: 214,
        factions: ['wei'],
        lords: ['caocao'],
        scene: [
          { t: 'narration', text: '建安十九年（214）十一月，曹操以皇后伏氏昔与父伏完书，言帝以董承被诛怨恨，谋图曹操，遂使御史大夫郗虑持节收后。' },
          { t: 'line', who: '伏寿', text: '陛下不能复相活邪？' },
          { t: 'line', who: '刘协', text: '我亦不知命在何时。' },
          { t: 'narration', text: '后幽于暴室，以死；所生二子皆鸩杀，伏氏之族死者百余人。其后操立其女节为皇后。' },
          { t: 'inner', who: '曹操', text: '伏氏之书出于建安五年，今日发之，非为其罪，为其可与外臣通也。' },
          { t: 'history', text: '十一月，皇后伏氏坐昔与父故屯骑校尉完书，云帝以董承被诛怨恨谋害太祖，遂废，皇后下暴室以幽死。', src: '《三国志·武帝纪》' },
          { t: 'history', text: '后执帝手曰：不能复相活邪？帝曰：我亦不知命在何时。遂将后下暴室，幽死，所生二皇子皆鸩杀之。', src: '《后汉书·皇后纪》' }
        ],
        choice: {
          prompt: '伏后之书已发，伏氏在朝者众。操当处之。',
          options: [
            { text: '废后幽死，尽诛伏氏', reply: '后幽死暴室，二皇子鸩杀，伏氏死者百余人。天子自此不复有一言之权，宫中侍者皆操之人。', inner: '外戚已尽，而后宫之门始为我所闭。', effect: { prestige: -4, court: { purgeDeath: 'fu_shou', strife: 8, legit: -8, loyalty: 5 }, flag: 'wei_fuhou' } },
            { text: '存后之位，但诛其族', reply: '操收伏氏之族而下后于别宫，不即加诛，别立贵人为后。伏氏犹有存者，帝之左右稍得其人。', inner: '杀一妇人之手，天下后世未必恕我。', effect: { prestige: 2, court: { purge: 'fu_shou', strife: 4, legit: -4, loyalty: -2 } } }
          ]
        },
        src: '《三国志·武帝纪》《后汉书·皇后纪》'
      },
      {
        id: 'han_zhanglu_215',
        name: '汉中降曹之议',
        year: 215,
        factions: ['hanzhong'],
        lords: ['zhanglu'],
        scene: [
          { t: 'narration', text: '建安二十年（215）秋，曹操自散关出武都，至阳平关。张鲁遣弟卫与杨昂等据关，横山筑城十余里，操军夜袭破之。' },
          { t: 'line', who: '阎圃', text: '今以急往降，功必轻；不若且依杜濩、朴胡，赴巴中，然后委质，功乃可重也。' },
          { t: 'line', who: '张卫', text: '汉中既失，尚可依巴中之众，与曹公相持于山险之间。' },
          { t: 'narration', text: '鲁左右欲烧宝货仓库，鲁曰：本欲归命国家，而意未达。今之走，避锐锋，非有恶意，宝货仓库，国家之有。遂封藏而去。' },
          { t: 'inner', who: '张鲁', text: '吾父祖以善道教民三十年矣。今日之事，不在城池，而在众心——降而得侯，与死守而族灭，孰重？' },
          { t: 'history', text: '左右欲悉烧宝货仓库，鲁曰：本欲归命国家，而意未达。今之走，避锐锋，非有恶意，宝货仓库，国家之有。遂封藏而去。太祖入南郑，甚嘉之。', src: '《三国志·张鲁传》' },
          { t: 'history', text: '鲁降，太祖拜鲁为镇南将军，封阆中侯，邑万户；阎圃等皆封列侯。', src: '《三国志·张鲁传》' }
        ],
        choice: {
          prompt: '阳平已破，汉中震动。鲁仓廪在城，去留皆当有断。',
          options: [
            { text: '封藏仓库，南入巴中而后降', reply: '鲁封藏而去，操入南郑，见仓库完好，甚嘉之；拜鲁镇南将军、阆中侯，邑万户，阎圃等皆为列侯。汉中之人不以为败。', inner: '以众心归人主，胜于以死守一城。', effect: { gold: 400, prestige: 5, court: { strife: -4, legit: 3, loyalty: 4 }, flag: 'lu_xiangcao' } },
            { text: '据南郑而守，示众以死战', reply: '鲁闭城自守，曹军四面攻之。城中粮尽，教众死者相枕；城破之日，鲁虽免死，汉中之人不复信其道矣。', inner: '吾教三十年，岂可拱手与人。', effect: { food: -300, troops: -1200, morale: -6, court: { strife: 8, legit: -6, loyalty: -6 } } }
          ]
        },
        src: '《三国志·张鲁传》《后汉书·刘焉传》'
      },
      {
        id: 'wei_jiaxu_217',
        name: '贾诩之对',
        year: 217,
        factions: ['wei'],
        lords: ['caocao'],
        requires: { heir: false },
        scene: [
          { t: 'narration', text: '建安二十二年（217），太子未定，而临菑侯植才名方盛；丁仪、丁廙、杨修等为之羽翼，夺宗之议日闻于朝。' },
          { t: 'line', who: '曹操', text: '吾欲立嗣，于卿意何如？' },
          { t: 'line', who: '贾诩', text: '属适有所思，故不即对耳。思袁本初、刘景升父子也。' },
          { t: 'narration', text: '操大笑，太子遂定。十月，立丕为魏太子。' },
          { t: 'inner', who: '贾诩', text: '吾非太祖旧臣，自张绣而来，唯求自安。答此一问，可保贾氏数十年——然言之太明，亦为祸始。' },
          { t: 'history', text: '太祖尝屏除左右问诩，诩默然不对。太祖曰：与卿言而不答，何也？诩曰：属适有所思，故不即对耳。太祖曰：何思？诩曰：思袁本初、刘景升父子也。太祖大笑，于是太子遂定。', src: '《三国志·贾诩传》' },
          { t: 'history', text: '诩自以非太祖旧臣，而策谋深长，惧见猜嫌，阖门自守，退无私交，男女嫁娶，不结高门。', src: '《三国志·贾诩传》' }
        ],
        choice: {
          prompt: '太子未定，植之党与方盛。操屏人而问贾诩，诩但思袁绍、刘表父子。',
          options: [
            { text: '立丕为魏太子', reply: '操立丕为太子，丁仪、丁廙等后皆诛。贾诩阖门自守，不与人交，终以寿终。', inner: '袁本初、刘景升，皆以爱易长而致乱。言之不明，而意在言外。', effect: { prestige: 4, court: { sealHeir: 'cao_pi', strife: -8, legit: 5, loyalty: 6 }, flag: 'wei_lisi' } },
            { text: '未定其位，徐观其能', reply: '操不立太子，而问者日至。丁仪等益相结纳，五官将与临菑侯之党交争于内，杨修等遂以此得罪。', inner: '二子各有其才，吾犹未忍决之。', effect: { prestige: -3, court: { strife: 14, loyalty: -6, legit: -4 } } }
          ]
        },
        src: '《三国志·贾诩传》《三国志·陈思王植传》'
      },
      {
        id: 'wei_yangxiu_219',
        name: '杨修之死',
        year: 219,
        factions: ['wei'],
        lords: ['caocao'],
        scene: [
          { t: 'narration', text: '建安二十四年（219）秋，操在长安，以杨修前后漏泄言教、交关诸侯，遂杀之。' },
          { t: 'narration', text: '修，太尉杨彪之子，袁术之甥也；数为临菑侯植画策，又与植往还甚密。' },
          { t: 'line', who: '杨修', text: '臣之事主，唯在文字筹算之间，何尝有他志？' },
          { t: 'line', who: '曹操', text: '吾非不知修之才。然袁氏之甥，而又屡与临菑侯谋——吾老矣，此子不可以遗后嗣。' },
          { t: 'inner', who: '曹操', text: '植之才，吾所爱；修之智，亦吾所喜。唯吾死后，丕能制植，不能制修。' },
          { t: 'history', text: '太祖既虑终始之变，以杨修颇有才策，而又袁氏之甥也，于是以罪诛修。', src: '《三国志·陈思王植传》' },
          { t: 'history', text: '修字德祖，太尉彪之子也，好学有俊才，与临菑侯植相善。', src: '《后汉书·杨彪传》' }
        ],
        choice: {
          prompt: '杨修才敏而交关诸侯，又与临菑侯亲。事已具，操当决之。',
          options: [
            { text: '以罪诛修', reply: '修死于狱。丁仪、丁廙后亦见诛，植之党遂尽；然士人以文字见诛者，自此益畏朝廷。', inner: '存修则植之党不散；除之，则后嗣可安。', effect: { prestige: -2, court: { purgeDeath: 'yang_xiu', strife: 8, loyalty: -6, legit: -3 } } },
            { text: '但免其官，不加诛戮', reply: '操免修之官而不用刑。修归私第，闭门谢客；然植之党未散，夺宗之议仍未息。', inner: '杀才士之名，吾不欲受之。', effect: { prestige: 3, court: { purge: 'yang_xiu', strife: 4, loyalty: 2 } } }
          ]
        },
        src: '《三国志·陈思王植传》《后汉书·杨彪传》'
      },
      {
        id: 'wei_weifeng_219',
        name: '魏讽之案',
        year: 219,
        factions: ['wei'],
        lords: ['caocao'],
        scene: [
          { t: 'narration', text: '建安二十四年（219）九月，操在长安，相国钟繇西曹掾魏讽连结邺中诸生，谋袭邺城。' },
          { t: 'narration', text: '太子丕留守邺，先觉其谋，收讽等诛之。' },
          { t: 'line', who: '魏讽', text: '天下苦兵久矣，此城一夕可取。诸君皆士人之子，何惜一死？' },
          { t: 'narration', text: '讽等伏诛，连坐者众，张绣之子泉、王粲之二子皆坐死。邺中士人子弟，多与焉。' },
          { t: 'inner', who: '曹操', text: '邺者，吾之根本；诸生者，士人之子弟。一夕之变，几在吾家之内——不穷治之，则异日更有大者。' },
          { t: 'history', text: '相国钟繇西曹掾魏讽谋反，伏诛。', src: '《三国志·武帝纪》' },
          { t: 'history', text: '绣子泉嗣，坐与魏讽谋反，伏诛，国除。', src: '《三国志·张绣传》' }
        ],
        choice: {
          prompt: '邺中之谋已发，所连者多士族子弟。操当决其狱之广狭。',
          options: [
            { text: '穷治其党，连坐者众', reply: '讽等伏诛，张泉、王粲二子皆坐死。邺中士人噤不敢言，而储位之事由此更无人敢议。', inner: '乱吾根本者，虽士族亦不可恕。', effect: { prestige: -3, court: { purgeDeath: 'zhang_quan', strife: 10, loyalty: -8, legit: 3 }, flag: 'wei_weifeng' } },
            { text: '但诛首恶，不问党与', reply: '操命但诛讽等数人，余皆不问。邺中诸生得全者众，相与感悦；然校事之设自此益密，言者犹惧。', inner: '多杀士人，则河北之门第皆与我为仇。', effect: { prestige: 4, court: { strife: -4, loyalty: 8, legit: 2 } } }
          ]
        },
        src: '《三国志·武帝纪》《三国志·张绣传》'
      },
      {
        id: 'shu_liufeng_220',
        name: '刘封之死',
        year: 220,
        factions: ['shu'],
        lords: ['liubei'],
        scene: [
          { t: 'narration', text: '建安二十四年（219）末，关羽围樊城，连呼刘封、孟达以兵自助，封、达辞以山郡初附，未可动摇。关羽败没，先主恨之。' },
          { t: 'narration', text: '孟达既与封有隙，又惧罪，率众降魏；魏遣夏侯尚、徐晃与达共袭封，封败还成都。' },
          { t: 'line', who: '刘备', text: '封何故侵陵孟达，又不救关将军？' },
          { t: 'line', who: '诸葛亮', text: '封刚猛，易世之后终难制御，宜因此除之。' },
          { t: 'narration', text: '先主赐封死，使自裁。封叹曰：恨不用孟子度之言！先主为之流涕。' },
          { t: 'inner', who: '刘备', text: '封，吾养子也；禅，吾嫡子也。吾死之后，封在则禅不安。此事不可付他人，唯吾自决。' },
          { t: 'history', text: '诸葛亮虑封刚猛，易世之后终难制御，劝先主因此除之。于是赐封死，使自裁。', src: '《三国志·刘封传》' },
          { t: 'history', text: '封曰：恨不用孟子度之言！先主为之流涕。', src: '《三国志·刘封传》' }
        ],
        choice: {
          prompt: '封败还成都，责以其罪。诸葛亮以为宜因此除之，以定后嗣。',
          options: [
            { text: '赐封死，以定储位', reply: '封自裁，先主流涕。太子禅之位遂定，蜀中无复夺嫡之虞；然宗室之情，自此疏矣。', inner: '吾之爱封，不后于禅；而社稷之重，不容二嗣。', effect: { prestige: 3, court: { purgeDeath: 'liu_feng', sealHeir: 'liu_shan', strife: -6, legit: 4, loyalty: 4 }, flag: 'shu_dingchu' } },
            { text: '夺其兵而留其性命', reply: '先主夺封之兵而不加诛，封居成都，郁郁而已。诸葛亮每以为忧，宗室之隙犹存。', inner: '吾不忍杀吾子，然亦不能使之统兵。', effect: { prestige: -2, court: { purge: 'liu_feng', strife: 4, loyalty: -2, legit: -3 } } }
          ]
        },
        src: '《三国志·刘封传》'
      },
      {
        id: 'wei_jiupin_220',
        name: '九品之议',
        year: 220,
        factions: ['wei'],
        lords: ['caopi'],
        scene: [
          { t: 'narration', text: '延康元年（220），魏王丕嗣位，以陈群为尚书。' },
          { t: 'line', who: '陈群', text: '丧乱以来，人士流移，考详无地。请立九品官人之法，州郡皆置中正，以定其选。' },
          { t: 'line', who: '华歆', text: '乡举里选，行之四百年；今以中正品人，恐选权尽归门第。' },
          { t: 'narration', text: '诏从群议，州郡各置中正，区别人物，第其高下；由是选官之权归之门第，而朝廷但司除授。' },
          { t: 'inner', who: '曹丕', text: '汉以察举得士，亦以清议失柄。今我不与士族共天下，士族必不与我共魏。' },
          { t: 'history', text: '文帝在东宫，深敬器焉；及即王位，封群昌武亭侯，徙为尚书。制九品官人之法，群所建也。', src: '《三国志·陈群传》' },
          { t: 'history', text: '尚书陈群以天朝选用不尽人才，乃立九品官人之法，州郡皆置中正以定其选。', src: '《资治通鉴》卷六十九' }
        ],
        choice: {
          prompt: '丧乱之后，乡举里选不可复行。陈群请立九品中正之制。',
          options: [
            { text: '依陈群之议，立九品中正', reply: '九品之法既行，州郡中正品第人物，选官之权归之门第。魏之世，公卿多出于门第之家。', inner: '士族为我所用，则魏之基固；然他日选权不在朝廷，亦当思之。', effect: { prestige: 5, court: { strife: -4, legit: 4, loyalty: 6 }, flag: 'wei_jiupin' } },
            { text: '仍用汉之察举，不改旧制', reply: '诏仍行察举，州郡以孝廉上计。丧乱之后，乡评无从，举者多非其人，士人以为不便，公卿之门亦生怨望。', inner: '旧制虽有弊，然行之已久，改之恐生他变。', effect: { gold: 200, court: { strife: 8, loyalty: -6, legit: -3 } } }
          ]
        },
        src: '《三国志·陈群传》《资治通鉴》卷六十九'
      },
      {
        id: 'han_chanwei_220',
        name: '禅代之议',
        year: 220,
        factions: ['han'],
        lords: ['xian'],
        scene: [
          { t: 'narration', text: '建安二十五年（220）正月，曹操薨于洛阳，曹丕嗣魏王。冬十月，李伏、许芝等上表，言魏当代汉，符命图谶皆有其征；群臣具仪，请帝告祠高庙，使张音奉玺绶禅位。' },
          { t: 'line', who: '华歆', text: '天之所废，不可复支，陛下宜顺天人之望，以全宗庙之祀。' },
          { t: 'line', who: '曹节', text: '天不祚尔！' },
          { t: 'narration', text: '魏遣使求玺绶，曹皇后怒不与，如是数反，乃呼使者入，亲数让之，以玺抵轩下。' },
          { t: 'inner', who: '刘协', text: '朕九岁即位，三十余年在位，未尝一日有天下之权。今以四百年之祚付之他人，而朕所全者，唯此一身与一庙耳。' },
          { t: 'history', text: '冬十月，魏王曹丕称天子，奉帝为山阳公，邑一万户，位在诸侯王上，奏事不称臣，受诏不拜。', src: '《后汉书·献帝纪》' },
          { t: 'history', text: '魏受禅，遣使求玺绶，后怒不与；如是数反，后乃呼使者入，亲数让之，以玺抵轩下曰：天不祚尔！', src: '《后汉书·皇后纪》' }
        ],
        choice: {
          prompt: '魏之受禅已成定局，玺绶在高庙，使者已在门外。帝当自决。',
          options: [
            { text: '告祠高庙，禅位于魏', reply: '帝使张音奉玺绶禅位，魏王丕即皇帝位于繁阳，改元黄初，奉帝为山阳公。四百年之汉祚，至此而终。', inner: '汉祚之终，非自今日始；然下此一诏者，仍是朕。', effect: { gold: 500, prestige: -6, court: { legit: -20, strife: 6 }, flag: 'han_chanwei' } },
            { text: '拒玺不下诏，以延汉祚', reply: '帝拒玺不下诏，而曹氏之兵已陈于宫门。旬日之间，许都内外皆魏之吏，帝之诏书不能出宫门一步。', inner: '纵不能守社稷，亦不肯自执其笔，以绝先帝之祀。', effect: { troops: -1200, morale: -6, prestige: 4, court: { legit: 8, strife: 14, loyalty: -6 }, flag: 'han_jushu' } }
          ]
        },
        src: '《后汉书·献帝纪》《后汉书·皇后纪》《三国志·文帝纪》裴注引《献帝传》'
      },
      {
        id: 'shu_fawu_221',
        name: '伐吴之议',
        year: 221,
        factions: ['shu'],
        lords: ['liubei'],
        scene: [
          { t: 'narration', text: '章武元年（221）七月，先主以关羽之殁、荆州之失，将亲征孙权。群臣多谏，先主不听。' },
          { t: 'line', who: '赵云', text: '国贼是曹操，非孙权也，且先灭魏，则吴自服。操身虽毙，子丕篡盗，当因众心早图关中，居河、渭上流以讨凶逆；不应置魏，先与吴战。兵势一交，不得卒解也。' },
          { t: 'line', who: '刘备', text: '云之言，天下之计也。然云长之仇不报，荆州之土不复，我何以立于天下？' },
          { t: 'narration', text: '先主遂东征，留诸葛亮守成都。吴班、冯习为前锋，孙权拜陆逊为大都督，拒于夷道、猇亭。' },
          { t: 'inner', who: '刘备', text: '吾年六十矣。不为云长报一矢之仇，则人主二字，终为虚名。' },
          { t: 'history', text: '先主将东征，赵云谏曰：国贼是曹操，非孙权也，且先灭魏，则吴自服。先主不听。', src: '《三国志·赵云传》裴注引《云别传》' },
          { t: 'history', text: '亮叹曰：法孝直若在，则能制主上，令不东行。', src: '《三国志·法正传》' }
        ],
        choice: {
          prompt: '关羽已殁，荆州已失。先主欲亲征孙权，赵云、秦宓皆谏。',
          options: [
            { text: '亲率诸军东征', reply: '先主亲征，自巫峡至夷陵，连营数百里。陆逊坚守不战，待其懈而后击，一战而蜀军大溃，舟械军资尽失。', inner: '兄弟之仇，不可假手于人；纵败，亦当亲为之。', effect: { troops: 1500, morale: 6, prestige: 5, court: { strife: 4 }, relation: { who: 'wu', value: -35 }, flag: 'shu_fawu' } },
            { text: '从赵云之谏，先图关中', reply: '先主寝东征之议，遣使通好于吴，而治兵于汉中。蜀中民力得息，士人皆服先主能听谏；赵云之谋，遂为后来北伐之本。', inner: '一矢之仇与天下之重，终不可兼。', effect: { food: 300, morale: 4, prestige: 8, court: { strife: -6, legit: 4, loyalty: 6 }, relation: { who: 'wu', value: 15 } } }
          ]
        },
        src: '《三国志·赵云传》裴注引《云别传》《三国志·法正传》《资治通鉴》卷六十九'
      },
      {
        id: 'wu_jiyan_224',
        name: '暨艳之案',
        year: 224,
        factions: ['wu'],
        lords: ['sunquan'],
        scene: [
          { t: 'narration', text: '黄武三年（224），权以暨艳为选曹尚书，使典选举。艳好为清议，弹射百僚，降损者众，怨者渐多。' },
          { t: 'line', who: '暨艳', text: '选曹之设，所以明优劣。若贤愚同贯，则国家何赖焉？' },
          { t: 'line', who: '张温', text: '艳欲澄清朝纲，而所劾者皆贵臣之亲。愿陛下明其志，勿以众怒罪之。' },
          { t: 'narration', text: '怨者交谮于权，权疑艳专擅。事下有司，艳自杀于狱；张温亦坐与艳相善而见废。' },
          { t: 'inner', who: '孙权', text: '艳清明而刻，士族怨之。罪艳则选举之权在我，护艳则大姓离心——江东立国，所倚者宗部与士族，非一艳也。' },
          { t: 'history', text: '暨艳为选曹尚书，好为清议，弹射百僚，后坐罪自杀；张温坐与艳相善，废黜不用。', src: '《三国志·张温传》' },
          { t: 'history', text: '权以温与艳相表里，由是衔之。', src: '《三国志·张温传》' }
        ],
        choice: {
          prompt: '暨艳典选，弹劾百僚，怨者盈朝。孙权当决其罪。',
          options: [
            { text: '收艳下狱，废张温以安大姓', reply: '艳自杀于狱，温坐废。选举之权尽归于权，江东大姓相庆；然自此朝中无复有弹劾之论。', inner: '士族不可尽罪，江东之基在此。', effect: { prestige: -3, court: { purgeDeath: 'ji_yan', strife: -4, loyalty: 4, legit: 3 } } },
            { text: '留艳典选，抑大姓之权', reply: '权留艳在选曹，严核如故。大姓之门生故吏多被降黜，怨声达于武昌宫中，宗部亦数有异言。', inner: '不能制大姓，则国无常法。', effect: { gold: 200, prestige: 4, court: { strife: 10, loyalty: -8 } } }
          ]
        },
        src: '《三国志·张温传》《三国志·吴主传》'
      },
      {
        id: 'wei_tuogu_226',
        name: '托孤之议',
        year: 226,
        factions: ['wei'],
        lords: ['caopi'],
        scene: [
          { t: 'narration', text: '黄初七年（226）五月，帝病笃，立子叡为皇太子，召中军大将军曹真、镇军大将军陈群、征东大将军曹休、抚军大将军司马懿，并受遗诏辅政。' },
          { t: 'line', who: '曹丕', text: '吾疾不济矣。叡年幼，宗室与士大夫宜并用之，勿使一家独专。' },
          { t: 'line', who: '曹真', text: '臣等受诏，当以死奉社稷。' },
          { t: 'narration', text: '帝崩于嘉福殿，年四十。太子叡即位，四人同秉朝政；其后异姓之权渐重，二十余年而魏柄移于司马氏。' },
          { t: 'inner', who: '曹丕', text: '宗亲者，血脉也；外姓者，才具也。血脉可恃而不必有才，才具可用而未必同心——唯使二者相制，而后人主安。' },
          { t: 'history', text: '七年夏五月，帝病笃，乃立为皇太子。丁巳，即皇帝位。', src: '《三国志·明帝纪》' },
          { t: 'history', text: '文帝临终，召曹真、曹休、陈群、司马懿，并受遗诏辅政。', src: '《晋书·宣帝纪》《资治通鉴》卷七十' }
        ],
        choice: {
          prompt: '托孤之人，宗亲与士大夫并用，抑或以宗室为主？',
          options: [
            { text: '以曹真、曹休、陈群、司马懿并辅政', reply: '四人同受遗诏：真、休典兵，群、懿参机要，朝政粗安。然异姓之权自此渐重，二十余年后，魏之天下遂归司马氏。', inner: '使宗亲与外姓相制，则少主可安。', effect: { prestige: 4, court: { strife: -4, loyalty: 3, legit: 3 }, flag: 'wei_tuogu' } },
            { text: '独任宗室曹真、曹休辅政', reply: '诏以宗室典兵，陈群、司马懿但领本职。宗亲之势大盛，尚书、中书之权皆在宗室之门，旁人不复得预机要。', inner: '魏之天下，终究是曹氏之天下。', effect: { troops: 400, court: { strife: 6, loyalty: -4, legit: 2 } } }
          ]
        },
        src: '《三国志·明帝纪》《晋书·宣帝纪》《资治通鉴》卷七十'
      },
      {
        id: 'liao_yanwang_233',
        name: '燕王之议',
        year: 233,
        factions: ['liaodong'],
        lords: ['gongsunyuan'],
        scene: [
          { t: 'narration', text: '青龙元年（233），孙权遣太常张弥、执金吾许晏等浮海至辽东，拜公孙渊为燕王，并致金宝珍货；魏使亦在道。' },
          { t: 'line', who: '张弥', text: '吴主以燕王之号待君，愿君南面称藩，共图魏氏。' },
          { t: 'line', who: '公孙渊', text: '吴远而魏近，受吴之封，则魏兵旦夕至矣。' },
          { t: 'narration', text: '渊斩弥、晏等，送首于魏。魏拜渊为大司马、乐浪公；吴之珍货尽没于辽东，孙权闻之，怒欲自征。' },
          { t: 'inner', who: '公孙渊', text: '受吴之封则魏必加兵；斩吴使以谢魏，则吴之金宝尽归我，而魏亦无辞。二国相持，我在其间。' },
          { t: 'history', text: '权遣张弥、许晏等至辽东，立渊为燕王；渊斩弥、晏等，送其首于魏。', src: '《三国志·公孙度传》《三国志·吴主传》' },
          { t: 'history', text: '魏拜渊为大司马，封乐浪公。其后渊复与魏相失。', src: '《三国志·公孙度传》' }
        ],
        choice: {
          prompt: '吴使浮海而至，魏使亦在道。渊居二国之间，当择所从。',
          options: [
            { text: '斩吴使，送首于魏', reply: '渊斩张弥、许晏等，送首于魏，魏拜渊大司马、乐浪公，吴之珍货尽没于辽东，孙权怒而欲自征之。', inner: '远交不如近事，取其货而绝其人。', effect: { gold: 500, prestige: 6, court: { legit: 2 }, relation: { who: 'wu', value: -30 }, flag: 'liao_yanwang' } },
            { text: '受吴之封，南面称藩', reply: '渊受吴燕王之号，魏人以为叛。未数年，魏使毌丘俭、司马懿相继北讨，襄平城破，渊父子死于梁水之上。', inner: '受封于人，则可以名号召辽东之众。', effect: { gold: 700, troops: 800, prestige: -4, court: { strife: 4, legit: -4 }, relation: { who: 'wu', value: 20 } } }
          ]
        },
        src: '《三国志·公孙度传》《三国志·吴主传》《晋书·宣帝纪》'
      },
      {
        id: 'shu_zhugeliang_234',
        name: '丞相既卒',
        year: 234,
        factions: ['shu'],
        lords: ['liushan'],
        scene: [
          { t: 'narration', text: '建兴十二年（234）八月，丞相诸葛亮卒于渭南五丈原。军还，杨仪与魏延争权，延先南归、烧绝阁道，据南谷口以逆仪。' },
          { t: 'narration', text: '延败走，为马岱所追斩，首送成都。' },
          { t: 'line', who: '蒋琬', text: '丞相新亡，举国惶惧。宜权宜授任，使内外各安其位，然后徐议大计。' },
          { t: 'line', who: '杨仪', text: '仪之功，岂当居琬之下！' },
          { t: 'inner', who: '刘禅', text: '相位二十余年，皆在丞相之手。今日丞相既殁，此事当归何人？——先帝托朕于丞相，未托朕于仪也。' },
          { t: 'history', text: '亮卒，仪与延争权，延烧绝阁道，据南谷口逆击仪；延败走，为追兵所斩。', src: '《三国志·魏延传》' },
          { t: 'history', text: '亮每出军，琬常足食足兵以相供给。亮卒，琬为尚书令，俄迁大将军，录尚书事。', src: '《三国志·蒋琬传》' }
        ],
        choice: {
          prompt: '丞相既卒，军政无所统。蒋琬、杨仪各有其才，而二人相恶。',
          options: [
            { text: '以蒋琬总国事，废杨仪', reply: '蒋琬为尚书令，后迁大将军、录尚书事。杨仪还都，拜中军师而无所统；怨望上书，坐废徙，自杀。', inner: '蒋琬守而能断，仪锐而好争——治国者当用守。', effect: { prestige: 4, court: { purge: 'yang_yi', strife: -6, loyalty: 6, legit: 4 }, flag: 'shu_jiangwan' } },
            { text: '以杨仪领兵，蒋琬理政', reply: '杨仪领兵屯汉中，蒋琬留成都省事。仪自以功高，数与琬争，蜀之将士分附两府，边镇文书多不相通。', inner: '两分之，则各有所属，而朕可以制其平。', effect: { troops: 300, court: { strife: 12, loyalty: -8, legit: -4 } } }
          ]
        },
        src: '《三国志·诸葛亮传》《三国志·蒋琬传》《三国志·魏延传》'
      },
      {
        id: 'wu_lvyi_238',
        name: '吕壹之案',
        year: 238,
        factions: ['wu'],
        lords: ['sunquan'],
        scene: [
          { t: 'narration', text: '赤乌元年（238），权使吕壹为中书，典校诸官府及州郡文书。壹性苛惨，用法深刻，诬陷大臣，顾雍、步骘、朱据等皆为其所纠。' },
          { t: 'line', who: '吕壹', text: '诸将多虚张功状、侵盗军资，事无大小，皆当奏闻于上。' },
          { t: 'line', who: '步骘', text: '壹所纠者，皆朝廷大臣。若长以此辈典刑狱，则忠良无措手之地。' },
          { t: 'narration', text: '壹后事觉，收付廷尉，顾雍诘其状，壹无以对；权命诛之，并废其党。' },
          { t: 'inner', who: '孙权', text: '壹所纠多是实事，然其苛刻已失众心。用之则朝士不安，弃之则我失耳目——权衡之难在此。' },
          { t: 'history', text: '壹性苛惨，用法深刻，诬陷大臣；后事觉，收付廷尉，伏诛。', src: '《三国志·吴主传》《三国志·顾雍传》' },
          { t: 'history', text: '雍往断狱，壹以囚见，雍和颜色问其辞状，壹叩头无言。', src: '《三国志·顾雍传》' }
        ],
        choice: {
          prompt: '吕壹典校，朝臣多被其诬。今罪状已具，权当决之。',
          options: [
            { text: '收壹付廷尉，诛之', reply: '壹伏诛，其党皆废。被诬者多得出，朝士相庆；顾雍、步骘等自是一意奉职，江东大臣稍安。', inner: '耳目之利，不敌大臣离心之害。', effect: { prestige: 4, court: { purgeDeath: 'lv_yi', strife: -6, loyalty: 8, legit: 4 } } },
            { text: '留壹典校，以察百官', reply: '权留壹如故。诸将人人自危，狱系者相继，外镇之将多通书问，江东内外始相疑。', inner: '朝臣之虚实，非此辈不能尽知。', effect: { morale: -3, prestige: -5, court: { strife: 12, loyalty: -10 } } }
          ]
        },
        src: '《三国志·吴主传》《三国志·顾雍传》'
      },
      {
        id: 'wei_mingdi_239',
        name: '明帝托孤',
        year: 239,
        factions: ['wei'],
        lords: ['caorui'],
        scene: [
          { t: 'narration', text: '景初三年（239）正月，帝病笃。初欲以燕王曹宇为大将军，与领军将军夏侯献、武卫将军曹爽、屯骑校尉曹肇、骁骑将军秦朗等辅政。' },
          { t: 'narration', text: '中书监刘放、中书令孙资久典机任，与曹肇等不平，乃乘间入见，谮宇、肇等，请以曹爽、司马懿辅政。' },
          { t: 'line', who: '刘放', text: '先帝有诏，藩王不得辅政。且陛下若弃天下，燕王拥兵在侧，社稷必危。' },
          { t: 'line', who: '曹叡', text: '任之轻重，唯卿等所举。' },
          { t: 'narration', text: '帝从之，以曹爽为大将军，与太尉司马懿并受遗诏辅政；曹宇、夏侯献、曹肇、秦朗皆罢。' },
          { t: 'inner', who: '曹叡', text: '朕年三十余而病至此。宗室拥兵，朕疑其逼；外姓掌机，朕亦不能尽信——今日之事，不得不择其一。' },
          { t: 'history', text: '帝病笃，以曹爽为大将军，与太尉司马懿并受遗诏辅政。', src: '《三国志·明帝纪》裴注引《汉晋春秋》' },
          { t: 'history', text: '刘放、孙资久典机任，惧曹肇等为己害，因谮之于帝，遂罢宇等而以爽、懿辅政。', src: '《三国志·明帝纪》裴注引《魏氏春秋》' }
        ],
        choice: {
          prompt: '辅政之任本属燕王曹宇，刘放、孙资请改用曹爽与司马懿。帝当决之。',
          options: [
            { text: '从刘放之议，用爽、懿辅政', reply: '诏以曹爽为大将军，与司马懿并受遗诏。爽初秉政，未几骄奢；十年之后高平陵变起，魏柄遂移。', inner: '宗室拥兵者必逼，异姓秉机者难制——两害取轻，从其荐。', effect: { prestige: 3, court: { strife: 8, loyalty: -4, legit: 2 }, flag: 'wei_mingdituogu' } },
            { text: '仍以燕王曹宇辅政', reply: '诏以曹宇为大将军，夏侯献、曹爽、曹肇分典兵事。宗室并居枢要，刘放、孙资皆罢，异姓之臣无预机要者。', inner: '魏之天下，终究是曹氏之天下。', effect: { troops: -200, prestige: 5, court: { strife: -4, loyalty: 6, legit: 5 } } }
          ]
        },
        src: '《三国志·明帝纪》裴注引《汉晋春秋》《魏氏春秋》《晋书·宣帝纪》'
      },
      {
        id: 'wu_ergong_242',
        name: '二宫之争',
        year: 242,
        factions: ['wu'],
        lords: ['sunquan'],
        scene: [
          { t: 'narration', text: '赤乌五年（242）正月，权立子和为太子，而鲁王霸有宠，礼秩与太子相埒。霸与和渐生猜隙，朝臣各附一方。' },
          { t: 'line', who: '陆逊', text: '太子正统，宜有磐石之固；鲁王藩臣，当使宠秩有差。彼此得所，上下获安。' },
          { t: 'line', who: '孙权', text: '朕之家事，卿等何与焉。' },
          { t: 'narration', text: '由是中外分党：陆逊、吾粲、顾谭等附太子，全寄、吴安、杨竺等附鲁王；谗言交构，狱事屡兴。' },
          { t: 'inner', who: '孙权', text: '和，吾所立也；霸，吾所爱也。使二人相争，而我择其胜者——然朝士既已分党，无论立谁，皆有怨者。' },
          { t: 'history', text: '陆逊上疏曰：太子正统，宜有磐石之固；鲁王藩臣，当使宠秩有差。', src: '《三国志·陆逊传》' },
          { t: 'history', text: '权既立和为太子，而宠鲁王霸，中外分党，谗构屡兴，大臣多以此得罪。', src: '《三国志·孙和传》《三国志·陆逊传》' }
        ],
        choice: {
          prompt: '太子和与鲁王霸相争，朝臣已分为两党。权当弹压之。',
          options: [
            { text: '定嫡庶之分，抑鲁王之宠', reply: '权命有司别嫡庶之礼，削鲁王仪秩。霸之党怨望益甚，谗构日入；陆逊数谏，而权益疑之。', inner: '嫡庶之分不可乱，纵伤父子之情，亦当为之。', effect: { prestige: 3, court: { sealHeir: 'sun_he', strife: -3, legit: 5, loyalty: 4 }, flag: 'wu_ergong' } },
            { text: '宠鲁王如故，以观其能', reply: '权宠霸不衰。太子之党与鲁王之党交攻于内，顾谭、吾粲等相继下狱，江东大臣人人自危。', inner: '二子皆吾所爱，谁能保江东，未可知也。', effect: { prestige: -4, court: { strife: 16, loyalty: -12, legit: -6 } } }
          ]
        },
        src: '《三国志·孙和传》《三国志·陆逊传》《三国志·吴主传》'
      },
      {
        id: 'wu_luxun_245',
        name: '陆逊之死',
        year: 245,
        factions: ['wu'],
        lords: ['sunquan'],
        scene: [
          { t: 'narration', text: '赤乌八年（245），逊既为丞相，而权数遣中使责让之，以其亲附太子、又多所陈请。' },
          { t: 'narration', text: '逊之外甥顾谭、顾承以二宫之事被流放，逊屡上疏辩之，权不许。' },
          { t: 'line', who: '陆逊', text: '臣世受国恩，所言皆社稷之计。若以亲附东宫为罪，愿陛下明察。' },
          { t: 'line', who: '孙权', text: '伯言多所陈请，朕岂不知其忠？然内外交构，朕不能无疑。' },
          { t: 'narration', text: '权累遣中使责让逊，逊愤恚致卒，时年六十三，家无余财。' },
          { t: 'inner', who: '孙权', text: '逊握兵二十余年，外结太子，内附群臣。吾老矣，而太子未定——此吾所以不能安也。' },
          { t: 'history', text: '权累遣中使责让逊，逊愤恚致卒，时年六十三，家无余财。', src: '《三国志·陆逊传》' },
          { t: 'history', text: '逊外甥顾谭、顾承皆以二宫之事见流，逊屡上书理之，权不听。', src: '《三国志·陆逊传》' }
        ],
        choice: {
          prompt: '陆逊屡谏，权疑其党于太子；中使已数往责让，逊上疏自陈。',
          options: [
            { text: '仍遣使责让，以示威权', reply: '逊愤恚而卒。权既失股肱，而太子之党益孤；未几，和竟被废，江东之将相自此不复有重臣。', inner: '不成则不能制太子之党。', effect: { prestige: -5, court: { purgeDeath: 'lu_xun', strife: 10, loyalty: -8, legit: -4 } } },
            { text: '止其责让，优诏慰之', reply: '权罢中使之责，遣医赐药。逊上疏谢罪，仍领武昌之众；江东之中，老臣犹存，人心稍安。', inner: '逊在，则外镇有所畏，江东犹可安。', effect: { troops: 300, prestige: 5, court: { strife: -6, loyalty: 8, legit: 4 } } }
          ]
        },
        src: '《三国志·陆逊传》《三国志·孙和传》'
      },
      {
        id: 'jin_gaopingling_249',
        name: '高平陵之变',
        year: 249,
        factions: ['jin'],
        lords: ['simayi'],
        scene: [
          { t: 'narration', text: '正始十年（249）正月，曹爽兄弟奉帝谒高平陵。司马懿称疾在府，一旦起兵，闭洛阳城门，据武库，出屯洛水浮桥，奏爽背先帝遗命、有无君之心，请免其官。' },
          { t: 'narration', text: '先是，懿诈疾，李胜往辞，懿令二婢侍，持衣衣落，指口言渴；胜还，言懿形神已离，不足虑，爽等遂不复设备。' },
          { t: 'line', who: '司马懿', text: '先帝以大事属吾，吾岂可坐视宗室之乱？今日之事，唯在社稷。' },
          { t: 'line', who: '曹爽', text: '司马公正当欲夺吾权耳。吾得以侯还第，不失为富家翁。' },
          { t: 'inner', who: '司马懿', text: '爽既出城，兵在我手。今日宽之，他日必为族灭之祸；既行之，必尽之。' },
          { t: 'history', text: '爽兄弟皆从帝出，懿遂起兵，闭城门，据武库，奏爽罪；爽归罪请免，遂收爽兄弟及其党与，皆诛三族。', src: '《三国志·曹爽传》《晋书·宣帝纪》' },
          { t: 'history', text: '懿诈疾，李胜往辞，懿令二婢侍，持衣衣落，指口言渴；胜还，言懿形神已离，不足虑。', src: '《三国志·曹爽传》裴注引《魏末传》' }
        ],
        choice: {
          prompt: '曹爽奉帝在外，洛阳已入我手。或尽诛其党，或但夺其权。',
          options: [
            { text: '收爽及其党与，皆夷三族', reply: '爽归罪请免，懿许之；既归，收爽兄弟与何晏、邓飏、丁谧、毕轨、李胜等，皆诛三族。魏之权柄，自此尽归司马氏。', inner: '留其性命，则曹氏之党必复起。', effect: { prestige: -3, court: { purgeDeath: 'cao_shuang', strife: 14, legit: -6, loyalty: -4 }, flag: 'jin_gaopingling' } },
            { text: '但夺其兵权，仍以侯归第', reply: '爽还第，懿以侯归之而不加诛。朝中曹氏之党犹在朝列，司马氏虽执兵，而内外之情未一。', inner: '尽诛大臣，天下将谓我为篡；留之，犹可徐图。', effect: { prestige: 5, court: { purge: 'cao_shuang', strife: 4, legit: 2, loyalty: -2 } } }
          ]
        },
        src: '《三国志·曹爽传》《晋书·宣帝纪》《资治通鉴》卷七十五'
      },
      {
        id: 'wu_feihe_250',
        name: '废和立亮',
        year: 250,
        factions: ['wu'],
        lords: ['sunquan'],
        scene: [
          { t: 'narration', text: '赤乌十三年（250）冬十一月，权幽太子和于宫中，既而废为庶人，徙故鄣；赐鲁王霸死，立少子亮为太子。' },
          { t: 'narration', text: '朱据、屈晃等率诸将吏泥头自缚，连日来谏，权怒，据等皆得罪。' },
          { t: 'line', who: '朱据', text: '太子，国之本也。和之罪未著而废之，恐人心不安。' },
          { t: 'line', who: '孙权', text: '朕之家事，卿等再三言之，是不欲朕安也。' },
          { t: 'inner', who: '孙权', text: '和，昔我所立；霸，昔我所宠。今二人皆不可用，而吾年已七十。亮少，然立之则政在朕手。' },
          { t: 'history', text: '权幽太子和，废为庶人；赐鲁王霸死；立少子亮为太子。', src: '《三国志·吴主传》《三国志·孙和传》' },
          { t: 'history', text: '朱据、屈晃等泥头自缚，连日来谏，权怒，据等皆见罪。', src: '《三国志·孙和传》' }
        ],
        choice: {
          prompt: '太子和既幽，鲁王霸已赐死。权年已耄，国本当定。',
          options: [
            { text: '废和为庶人，立少子亮', reply: '和废徙故鄣，霸赐死，亮立为太子。朱据、屈晃等以谏获罪；权崩之后，亮幼，政归诸葛恪、孙峻，江东遂多事。', inner: '长子已失众心，幼者在我左右，犹可教也。', effect: { prestige: -4, court: { unsealHeir: true, sealHeir: 'sun_liang', strife: 14, legit: -8, loyalty: -8 }, flag: 'wu_feihe' } },
            { text: '存和为太子，别择良傅以教之', reply: '权存和不废，而霸之党犹在。二宫之狱既久，狱辞连及大臣者数十人，江东内外交疑。', inner: '废长立幼，必生大乱；且姑存之。', effect: { prestige: 2, court: { sealHeir: 'sun_he', strife: 6, loyalty: -4 } } }
          ]
        },
        src: '《三国志·吴主传》《三国志·孙和传》'
      },
      {
        id: 'jin_wangling_251',
        name: '王凌之叛',
        year: 251,
        factions: ['jin'],
        lords: ['simayi'],
        scene: [
          { t: 'narration', text: '嘉平三年（251），太尉王凌以帝幼受制于司马氏，谋废帝而立楚王曹彪于许昌；兖州刺史令狐愚与凌同谋。' },
          { t: 'narration', text: '事泄，司马懿自率中军乘水道南下，奄至寿春。凌面缚出迎，懿解其缚，送还京师。' },
          { t: 'line', who: '王凌', text: '卿负我！' },
          { t: 'line', who: '司马懿', text: '卿以八十之年，何苦为此？' },
          { t: 'narration', text: '凌行至项，饮药而死；楚王曹彪赐死，诸相连者皆夷三族。' },
          { t: 'inner', who: '司马懿', text: '凌以老臣之望，尚欲举兵。今日不死，则司马氏之祸必在后日——淮南之众，不可以恩结。' },
          { t: 'history', text: '凌阴谋废立，事泄；懿自将讨之，凌面缚出迎，送还京师，至项，饮药而死。', src: '《三国志·王凌传》' },
          { t: 'history', text: '赐楚王彪死，诸相连者皆夷三族。', src: '《晋书·宣帝纪》' }
        ],
        choice: {
          prompt: '王凌谋立楚王，事已泄。凌年老而名高，淮南之众犹听其命。',
          options: [
            { text: '亲率军讨凌，尽除其党', reply: '凌出迎请罪，懿解其缚而不赦，送还京师；凌至项饮药死，楚王彪赐死，淮南连坐者数百家。', inner: '淮南三举，今日当先绝其首。', effect: { troops: 300, court: { purgeDeath: 'wang_ling', strife: 10, legit: -6, loyalty: -6 }, flag: 'jin_wangling' } },
            { text: '赐书切责，许其自新', reply: '懿赐书切责，凌上表谢罪，自请入朝。淮南兵不动，而朝中议者以为凌终不可信，司马氏之疑自此益深。', inner: '凌若入朝，则淮南可不战而定。', effect: { prestige: 4, court: { strife: 4, legit: 2, loyalty: 2 } } }
          ]
        },
        src: '《三国志·王凌传》《晋书·宣帝纪》'
      },
      {
        id: 'wu_tuogu_252',
        name: '江东托孤',
        year: 252,
        factions: ['wu'],
        lords: ['sunquan'],
        scene: [
          { t: 'narration', text: '太元二年（252）四月，权病笃。太子亮年幼，权召诸葛恪、孙弘、滕胤、吕据、孙峻入卧内，属以后事。' },
          { t: 'line', who: '孙权', text: '吾疾已笃。太子幼，诸君各尽其心，共辅之。' },
          { t: 'line', who: '诸葛恪', text: '臣当竭股肱之力，继之以死。' },
          { t: 'narration', text: '权崩，年七十一，谥曰大皇帝。恪等既受遗诏，孙弘谋杀恪，恪杀弘，遂专国政；明年，为孙峻所诛。' },
          { t: 'inner', who: '孙权', text: '昔者周瑜、鲁肃、吕蒙、陆逊，皆一时之杰。今吾死，而无一人可托六尺之孤——唯使其互相牵制耳。' },
          { t: 'history', text: '权疾困，召恪及太常滕胤、将军吕据、侍中孙峻，属以后事。', src: '《三国志·诸葛恪传》' },
          { t: 'history', text: '权薨，时年七十一，谥曰大皇帝。太子亮即位，以恪为太傅。', src: '《三国志·吴主传》' }
        ],
        choice: {
          prompt: '太子尚幼，托孤之任当属何人？或以一人总揽，或使数人相制。',
          options: [
            { text: '以诸葛恪为太傅，总揽国政', reply: '恪受遗诏辅政，杀孙弘而专国。初有东关之捷，遂轻敌北征，新城之役死者数万；明年为孙峻所杀，江东之政遂归宗室。', inner: '太子幼，非一人总揽，则内外无主。', effect: { troops: 500, prestige: 5, court: { strife: 8, loyalty: -4 }, flag: 'wu_tuogu_ke' } },
            { text: '使滕胤、吕据、孙峻分掌其事', reply: '诏使滕胤典宫省、吕据督外军、孙峻掌禁兵，政出多门。江东之内，诸宗室各拥其兵，事权不一。', inner: '数人相制，则无人能专——虽缓于政，亦安于政。', effect: { court: { strife: -4, loyalty: 4, legit: 3 }, prestige: 3, troops: -300 } }
          ]
        },
        src: '《三国志·诸葛恪传》《三国志·吴主传》'
      },
      {
        id: 'jin_guanqiu_255',
        name: '毌丘俭之叛',
        year: 255,
        factions: ['jin'],
        lords: ['simazhao'],
        scene: [
          { t: 'narration', text: '正元二年（255）正月，镇东将军毌丘俭、扬州刺史文钦矫太后诏，起兵于寿春，移檄州郡，以讨司马师为名。' },
          { t: 'narration', text: '时司马师新割目瘤，创未愈，议者以为不宜自行；师曰：吾自请行。遂率中外诸军讨之。' },
          { t: 'line', who: '毌丘俭', text: '司马氏专国，社稷将倾。吾以淮南之众，讨贼臣而清君侧。' },
          { t: 'line', who: '司马师', text: '此非他贼，乃朝廷之逆。吾不自行，则众心不定。' },
          { t: 'narration', text: '俭军溃，走至慎县，为民所杀；钦奔吴。师还许昌，目创迸裂，卒于军中，政归司马昭。' },
          { t: 'inner', who: '司马昭', text: '兄之目创未愈而强行，此去恐不能还。淮南一举再举，吴人又在侧；魏之天下，唯司马氏自守耳。' },
          { t: 'history', text: '俭、钦矫太后诏，罪状司马师，举兵；师率中外诸军讨之，俭败走，为民所杀，钦奔吴。', src: '《三国志·毌丘俭传》' },
          { t: 'history', text: '师还许昌，疾笃，卒于军中。', src: '《晋书·景帝纪》' }
        ],
        choice: {
          prompt: '淮南既叛，师创未愈。或亲总大军，或但遣诸将。',
          options: [
            { text: '亲率中外诸军东讨', reply: '师亲征，破俭、钦于乐嘉；俭走死，钦奔吴。师旋卒于许昌，司马昭遂继其政。', inner: '淮南之众，非亲临不能定；创虽未愈，事不可已。', effect: { troops: 400, prestige: 5, court: { purgeDeath: 'guanqiu_jian', strife: 8, legit: -5 }, flag: 'jin_huainan' } },
            { text: '遣诸将往讨，居中调度', reply: '师遣诸将分道而进，俭、钦据寿春久持，淮南郡县多附之；军久在外，洛阳内外之情始离。', inner: '兵者凶事，何必亲涉险地。', effect: { troops: -600, morale: -4, court: { strife: 12, loyalty: -6 } } }
          ]
        },
        src: '《三国志·毌丘俭传》《晋书·景帝纪》'
      },
      {
        id: 'jin_zhugedan_257',
        name: '诸葛诞之叛',
        year: 257,
        factions: ['jin'],
        lords: ['simazhao'],
        scene: [
          { t: 'narration', text: '甘露二年（257）五月，征东大将军诸葛诞在寿春，见王凌、毌丘俭相继夷灭，内不自安，遂结吴为援，举兵反，敛淮南将士十余万，闭城自守。' },
          { t: 'line', who: '诸葛诞', text: '魏之社稷将移于司马氏。吾宁与吴人合，不为王凌、毌丘俭之续。' },
          { t: 'line', who: '司马昭', text: '诞据淮南而结吴人，此非边患，乃腹心之疾。吾当奉天子以临之。' },
          { t: 'narration', text: '昭奉帝及太后东征，四面合围；吴遣文钦、全怿等往救，皆不得入。次年二月城破，诞死，夷三族。' },
          { t: 'inner', who: '司马昭', text: '淮南三叛而两平，吴人亦在侧；魏之天下，唯司马氏自守。此战若胜，则南北之势定矣。' },
          { t: 'history', text: '诞既与王凌、毌丘俭等相次夷灭，内不自安，遂反；昭奉天子及皇太后东征，围寿春，城破，斩诞，夷三族。', src: '《三国志·诸葛诞传》《晋书·文帝纪》' },
          { t: 'history', text: '吴遣文钦、全怿、唐咨等救诞，皆不得入。', src: '《三国志·诸葛诞传》' }
        ],
        choice: {
          prompt: '寿春既叛，吴人赴援。或奉天子亲征以定之，或遣大将久围。',
          options: [
            { text: '奉天子及太后东征，亲围寿春', reply: '昭奉帝东征，四面合围，吴援不得入。次年城破，诞死，三族皆夷，淮南遂平。', inner: '奉天子以临叛臣，则名正而众心定。', effect: { troops: 500, prestige: 6, court: { purgeDeath: 'zhuge_dan', strife: 8, legit: -5 }, flag: 'jin_shouchun' } },
            { text: '遣大将久围，不奉天子亲行', reply: '昭遣诸将围寿春，师老于外，吴人屡以舟师相援，城中坚守岁余乃下。朝廷之外，人以为司马氏之威不及淮南。', inner: '亲行则内外震动，劳费亦大；且委之诸将。', effect: { gold: -300, troops: -800, prestige: -4, court: { strife: 10, loyalty: -4 } } }
          ]
        },
        src: '《三国志·诸葛诞传》《晋书·文帝纪》'
      },
      {
        id: 'wu_sunchen_258',
        name: '孙綝之诛',
        year: 258,
        factions: ['wu'],
        lords: ['sunxiu'],
        scene: [
          { t: 'narration', text: '永安元年（258），休既即位，孙綝自恃援立之功，擅权骄恣；休外示优宠，内与张布、丁奉谋之。' },
          { t: 'line', who: '孙綝', text: '臣有功于社稷，愿出屯武昌，为国家御北。' },
          { t: 'line', who: '丁奉', text: '綝之党与甚众，宜于腊会中图之，一夕可定。' },
          { t: 'narration', text: '腊会之日，伏兵发于殿中，执綝而斩之，并诛其党与，夷三族。' },
          { t: 'inner', who: '孙休', text: '朕之立，綝之力也；然綝尝废一帝而立朕，安知不能废朕？——权臣之援立，即是授人以柄。' },
          { t: 'history', text: '休与张布、丁奉谋，因腊会伏兵杀綝，诛其党与，夷三族。', src: '《三国志·孙綝传》' },
          { t: 'history', text: '綝一门五侯，皆典禁兵，权倾人主；休既立，深忌之。', src: '《三国志·孙綝传》' }
        ],
        choice: {
          prompt: '孙綝恃功擅权，栋梁皆出其门。休欲除之，而兵在其手。',
          options: [
            { text: '因腊会伏兵，诛綝及其党', reply: '綝死于殿中，其弟孙恩、孙据等皆诛，夷三族。休亲政，张布、丁奉用事，江东之权复归朝廷。', inner: '不断綝，则朕终为其所立之君。', effect: { prestige: 5, court: { purgeDeath: 'sun_chen', strife: -6, loyalty: 6, legit: 6 }, flag: 'wu_zhuchen' } },
            { text: '优礼綝，出之武昌以渐夺其权', reply: '休许綝出屯武昌，而其党在朝者犹众，诏令多从中沮。休抚之益厚，而内不自安。', inner: '骤除之则变生，徐图之或可万全。', effect: { troops: 300, court: { strife: 10, loyalty: -6, legit: -4 } } }
          ]
        },
        src: '《三国志·孙綝传》《三国志·孙休传》'
      },
      {
        id: 'jin_gaogui_260',
        name: '高贵乡公之变',
        year: 260,
        factions: ['jin'],
        lords: ['simazhao'],
        scene: [
          { t: 'narration', text: '甘露五年（260）五月，帝见威权日去，不胜其忿，召侍中王沈、尚书王经、散骑常侍王业，曰：司马昭之心，路人所知也。吾不能坐受废辱，今日当与卿自出讨之。' },
          { t: 'line', who: '曹髦', text: '司马昭之心，路人所知也。吾不能坐受废辱，今日当与卿等自出讨之。' },
          { t: 'line', who: '王经', text: '昔鲁昭公不忍季氏，败走失国，为天下笑。今权在其门，为日久矣，宿卫空阙，兵甲寡弱，陛下何所资用？一旦如此，无乃欲除疾而更深之邪！' },
          { t: 'narration', text: '帝率僮仆数百，鼓噪而出。贾充使成济弑帝于车下。司马昭归罪成济，诛其三族；复奉太后之令，数帝之罪。' },
          { t: 'inner', who: '司马昭', text: '帝虽幼，而此一举，天下必以我为弑君。归罪成济，犹可全吾名；若不罪之，则人人知吾可为。' },
          { t: 'history', text: '帝见威权日去，不胜其忿，遂率僮仆数百鼓噪而出，为贾充所使成济所害，年二十。', src: '《三国志·高贵乡公纪》裴注引《汉晋春秋》' },
          { t: 'history', text: '昭乃委罪成济，诛其三族。', src: '《晋书·文帝纪》' }
        ],
        choice: {
          prompt: '帝死车下，天下汹汹。司马昭当自处其事。',
          options: [
            { text: '归罪成济，诛其三族', reply: '成济及其兄弟皆夷三族，昭之名声稍存，而弑君之实终不可掩；公卿议葬礼久不决，最后葬以王礼。', inner: '杀行凶者以谢天下，而我之罪不在其中。', effect: { prestige: -4, court: { strife: 12, legit: -8, loyalty: -6 } } },
            { text: '以帝谋逆，废为庶人，不罪成济', reply: '诏数帝之罪，废为庶人，成济不诛。天下闻之，士大夫皆以司马氏为弑君之族；淮南、关中，屡有以此为首者。', inner: '帝实欲杀我，成济何罪？— — 然此语一出，天下不复恕我。', effect: { prestige: -10, court: { strife: 16, legit: -12, loyalty: -8 } } }
          ]
        },
        src: '《三国志·高贵乡公纪》裴注引《汉晋春秋》《晋书·文帝纪》'
      },
      {
        id: 'shu_jiangwei_262',
        name: '姜维避祸沓中',
        year: 262,
        factions: ['shu'],
        lords: ['liushan'],
        scene: [
          { t: 'narration', text: '景耀五年（262），姜维自请率众出屯沓中种麦，不复还成都。' },
          { t: 'narration', text: '时宦官黄皓专权，右大将军阎宇与皓协比，皓阴欲废维树宇；维本羁旅托国，累年攻战而功绩不立，内惧皓之谮己。' },
          { t: 'line', who: '姜维', text: '臣愿出屯沓中，为陛下守陇右之门；朝中之事，非臣所敢与。' },
          { t: 'line', who: '黄皓', text: '大将军累年用兵，粮尽民困。宜少息民力，以固国本。' },
          { t: 'inner', who: '刘禅', text: '黄皓，朕所亲信；姜维，先帝之旧臣。二者相攻，朕若偏护一方，则另一方必疑。' },
          { t: 'history', text: '维本羁旅托国，累年攻战，功绩不立；而宦官黄皓等弄权于内，右大将军阎宇与皓协比，皓阴欲废维树宇。维亦疑惧，不复还成都。', src: '《三国志·姜维传》' },
          { t: 'history', text: '维请出屯沓中，种麦以自给，遂不复还。', src: '《三国志·姜维传》' }
        ],
        choice: {
          prompt: '大将军在外，宦官在内。后主当决其所从。',
          options: [
            { text: '听姜维屯田沓中，不问黄皓', reply: '维屯沓中，与成都益疏。明年魏师三道入蜀，维不能速还；黄皓犹居中用事，蜀之将士皆观望。', inner: '两存之，则两不相伤。', effect: { troops: 300, court: { strife: 10, loyalty: -6, legit: -4 }, flag: 'shu_taozhong' } },
            { text: '出黄皓于外，征维还成都', reply: '黄皓出居外舍，姜维还朝统军。蜀中内外一心，边镇文书皆归于中军；然后主左右，自此多不悦者。', inner: '社稷之重，过于一宦者之亲。', effect: { troops: 500, prestige: 4, court: { strife: -8, loyalty: 8, legit: 5 } } }
          ]
        },
        src: '《三国志·姜维传》《三国志·后主传》'
      },
      {
        id: 'shu_xiangwei_263',
        name: '降魏之议',
        year: 263,
        factions: ['shu'],
        lords: ['liushan'],
        scene: [
          { t: 'narration', text: '景耀六年（263）冬，邓艾自阴平道入，破诸葛瞻于绵竹，进至雒县。成都震恐，后主集群臣议之。' },
          { t: 'line', who: '谯周', text: '奔吴则吴不能容，奔南中则兵粮不备。今若早降，犹可得列侯之封，以保宗庙；迟则祸不可测。' },
          { t: 'line', who: '刘谌', text: '若理穷力屈，祸败必及，便当父子君臣背城一战，同死社稷，以见先帝可也！' },
          { t: 'narration', text: '后主从谯周之议，遣侍中张绍、驸马都尉邓良奉玺绶诣邓艾降。北地王谌哭于昭烈之庙，先杀妻子，而后自杀。' },
          { t: 'inner', who: '刘禅', text: '先帝以四十余年之业付朕，朕守之而不能保。降则身为列侯，战则血染成都——朕当为百姓择之，而不为名声择之。' },
          { t: 'history', text: '北地王谌怒曰：若理穷力屈，祸败必及，便当父子君臣背城一战，同死社稷，以见先帝可也。后主不从。', src: '《三国志·后主传》' },
          { t: 'history', text: '后主从谯周之议，遣张绍、邓良等奉玺绶降于邓艾。', src: '《三国志·后主传》' }
        ],
        choice: {
          prompt: '魏兵已至雒县，成都无险可守。降与战，皆在此一决。',
          options: [
            { text: '从谯周之议，奉玺绶降', reply: '后主奉玺绶降于邓艾，蜀之群臣多从之。北地王谌哭于昭烈之庙，杀妻子而后自杀；成都之民，得免兵燹。', inner: '存百姓而不存名，此朕之决也。', effect: { gold: -500, troops: -1000, prestige: -6, court: { legit: -14, strife: 8, loyalty: -4 }, flag: 'shu_xiangwei' } },
            { text: '从北地王之计，背城一战', reply: '后主命诸军据城而战。成都之众无可战之兵，士民死者盈街；旬日城破，宗庙焚毁，后主终于降，而蜀之元老十不存一。', inner: '先帝之业，不可以降终。', effect: { troops: -2000, morale: -8, prestige: 4, court: { legit: 6, strife: 16, loyalty: -10 }, disaster: '兵燹' } }
          ]
        },
        src: '《三国志·后主传》《三国志·谯周传》'
      },
      {
        id: 'jin_zhonghui_264',
        name: '钟会邓艾之隙',
        year: 264,
        factions: ['jin'],
        lords: ['simazhao'],
        scene: [
          { t: 'narration', text: '景元四年（263）冬，邓艾自阴平入成都，刘禅降。诏以艾为太尉、会为司徒。艾在成都，辄承制拜刘禅为行骠骑将军，蜀之群司多所除授。' },
          { t: 'line', who: '钟会', text: '艾之在蜀，承制专擅，内怀异志，宜早图之。' },
          { t: 'line', who: '邓艾', text: '臣受命出战，事有缓急，不敢不专；若以臣为专擅，愿还朝待罪。' },
          { t: 'narration', text: '会密白艾有反状，又于剑阁要截艾之章表，改易其辞，令指悖傲。诏书遂下，槛车征艾。次年正月，会反于成都，为魏军所杀；艾亦为田续所斩于绵竹之西。' },
          { t: 'inner', who: '司马昭', text: '艾功高而专，会才大而险。二人相攻，吾居中以制之；然征艾则会必骄，骄则反——反则一击可尽。' },
          { t: 'history', text: '会内有异志，因邓艾承制专擅，密与卫瓘白艾有反状；诏书槛车征艾。', src: '《三国志·钟会传》' },
          { t: 'history', text: '会既死，艾本营将士追出艾于槛车，迎还；田续等夜袭艾于绵竹西，斩艾及其子忠。', src: '《三国志·邓艾传》' }
        ],
        choice: {
          prompt: '二将相攻，各执一词。司马昭当决之。',
          options: [
            { text: '信会之奏，槛车征艾', reply: '诏以槛车征邓艾，会遂独统大军而反，为魏军所杀；艾亦为田续所斩于绵竹西。二将俱亡，蜀土乃定。', inner: '二虎相搏，居中者收其利。', effect: { prestige: -3, court: { purgeDeath: 'deng_ai', strife: 10, legit: -3, loyalty: -4 }, flag: 'jin_zhonghui' } },
            { text: '两存之，待还朝而辨', reply: '诏下慰艾，召会还朝。二人皆入朝自陈，事久不决；蜀中诸军分属两府，边镇文书往来，洛阳内外之疑亦深。', inner: '两将俱还，则其隙可徐徐解之。', effect: { prestige: 4, court: { strife: 8, loyalty: 2, legit: 3 } } }
          ]
        },
        src: '《三国志·钟会传》《三国志·邓艾传》《晋书·文帝纪》'
      },
      {
        id: 'wu_puyang_264',
        name: '诛濮阳兴与张布',
        year: 264,
        factions: ['wu'],
        lords: ['sunhao'],
        scene: [
          { t: 'narration', text: '元兴元年（264）七月，休崩。群臣以蜀汉新亡、恐魏人乘隙，欲得长君，濮阳兴、张布遂迎乌程侯皓而立之。' },
          { t: 'narration', text: '皓既立，既有所改易；兴、布私相谓曰：悔立此君。皓闻之。' },
          { t: 'line', who: '濮阳兴', text: '迎立之事，吾二人为之；若见疑，请避贤路。' },
          { t: 'line', who: '孙皓', text: '朕之一身，受之于社稷，非受之于二臣。' },
          { t: 'narration', text: '皓收兴、布，杀之，夷三族。其后更杀王蕃、韦曜、贺邵，又徙都武昌。' },
          { t: 'inner', who: '孙皓', text: '兴、布以朕为可制而立朕。今日不诛之，则异日人人皆以为可立可废。' },
          { t: 'history', text: '休崩，群臣以蜀新亡、恐魏人乘隙，欲得长君，乃迎立皓。皓既立，濮阳兴、张布悔之，皓闻而大怒，收兴、布杀之，夷三族。', src: '《三国志·孙皓传》' },
          { t: 'history', text: '皓既得志，粗暴骄盈，多忌讳，好酒色，大小失望。', src: '《三国志·孙皓传》' }
        ],
        choice: {
          prompt: '兴、布悔于迎立，其言已泄于宫中。皓将决之。',
          options: [
            { text: '收兴、布，诛其三族', reply: '兴、布并诛，三族皆夷。吴之大臣无敢复议立君者，而皓之猜忌日甚，朝士以言获罪者相望。', inner: '立我者亦可废我，此风不可长。', effect: { prestige: -4, court: { purgeDeath: 'puyang_xing', strife: 12, loyalty: -10, legit: 4 }, flag: 'wu_zhupuyang' } },
            { text: '但免其官，不问其罪', reply: '皓免兴、布之官而不诛，二人归第自守。然宫禁之间传言不止，皓心忌益深，未几复有王蕃、韦曜之狱。', inner: '初立而杀大臣，天下将谓朕不可辅。', effect: { gold: 200, prestige: 2, court: { purge: 'puyang_xing', strife: 4, loyalty: -2 } } }
          ]
        },
        src: '《三国志·孙皓传》《三国志·三嗣主传》'
      },
    ],
    topics: [
      {
        id: 'tuntian',
        name: '屯田之议',
        desc: '丧乱以来，民人流散，仓廪空虚；议者请募民屯田，以足军食。',
        src: '《三国志·武帝纪》',
        cost: { gold: 200 },
        cooldown: 8,
        options: [
          { text: '募民屯田许下', reply: '募民屯田许下，得谷百万斛；州郡例置田官，所在积粟，仓廪皆满。', inner: '兵出于民，食出于田；有田则兵可久。', effect: { food: 800, gold: -100, flag: 'tuntian', court: { loyalty: 4 } } },
          { text: '罢屯田，复征租赋', reply: '罢屯田之议，仍征租赋于编户。军食不足，每岁转运，民力益困，流亡者众。', inner: '聚民于田，恐滋豪强之弊。', effect: { gold: 200, food: -300, court: { strife: 6, loyalty: -4 } } }
        ]
      },
      {
        id: 'yantie',
        name: '盐铁之议',
        desc: '盐铁者，山海之利也；或请官收其利以给军，或以为宜弛之于民。',
        src: '《三国志·卫觊传》《晋书·食货志》',
        cost: { gold: 100 },
        options: [
          { text: '官收盐铁之利', reply: '置盐铁之官，收其利以给军国。府库稍实，而煮盐冶铁之家多怨。', inner: '利出于山海，不取之于农。', effect: { gold: 500, prestige: -3, court: { strife: 4, loyalty: -4 }, flag: 'yantie_guan' } },
          { text: '弛盐铁与民，薄税之', reply: '弛盐铁之禁，听民煮冶而薄税之。市井日盛，商贾辐辏，而军国之入不见多。', inner: '与民共利，则民不困。', effect: { gold: 150, morale: 4, court: { strife: -4, loyalty: 6 } } }
        ]
      },
      {
        id: 'jiupin',
        name: '九品之议',
        desc: '乡举里选久废，人士流移；议者请立九品中正，以定选举。',
        src: '《三国志·陈群传》《资治通鉴》卷六十九',
        cost: { gold: 100, prestige: 5 },
        once: true,
        options: [
          { text: '立九品中正之法', reply: '州郡各置中正，区别人物，第其高下。选官之权归之门第，而公卿之家皆与朝廷同心。', inner: '士族为我所用，则国本可固。', effect: { prestige: 5, court: { strife: -4, legit: 4, loyalty: 6 }, flag: 'jiupin' } },
          { text: '仍用汉之察举', reply: '仍行察举，州郡以孝廉上计。丧乱之后，乡评无从，举者多非其人，士人以为不便。', inner: '旧制行之已久，改之恐生他变。', effect: { gold: 100, court: { strife: 6, loyalty: -4 } } }
        ]
      },
      {
        id: 'chaju',
        name: '察举之议',
        desc: '州郡岁举孝廉，而举者多非其人；议者请严核举主，试之以其才。',
        src: '《后汉书·左雄传》《三国志·武帝纪》',
        cost: { gold: 150 },
        options: [
          { text: '限年试才，严核举主', reply: '诏令举者限年试才，举非其人者坐之。州郡皆谨于所举，而名门子弟多被黜落。', inner: '法与名门相妨，然选得其人。', effect: { prestige: 5, court: { strife: -3, loyalty: 4 } } },
          { text: '不拘门第，唯才是举', reply: '下令唯才是举，明言有行之士未必能进取，进取之士未必能有行。士人风动，而门第之家不平。', inner: '取天下之士，不必问其所出。', effect: { troops: 300, prestige: 3, court: { strife: 8, loyalty: -4 }, flag: 'qiuxian' } }
        ]
      },
      {
        id: 'rouxing',
        name: '肉刑之议',
        desc: '汉除肉刑久矣，而罪人逃亡者众；廷尉请复肉刑以止之。',
        src: '《三国志·钟繇传》《三国志·王朗传》',
        cost: { gold: 100 },
        options: [
          { text: '复肉刑，以止逃亡', reply: '议复肉刑，罪人不敢轻犯，狱讼稍减；然议者以为此非盛世之刑，士人多言其酷。', inner: '刑轻则民不畏，法弛则国不立。', effect: { prestige: 3, court: { strife: 6, loyalty: -6, legit: 3 } } },
          { text: '除肉刑，代以笞杖', reply: '诏除肉刑，代以笞杖；罪人生全者众，天下称其宽。奸猾者亦稍无所畏。', inner: '断人肢体，终非治世之刑。', effect: { morale: 4, court: { strife: -3, loyalty: 5 } } }
        ]
      },
      {
        id: 'zudiao',
        name: '租调之议',
        desc: '军兴以来，赋敛无常；议者请定田租户调之制，使民有常法。',
        src: '《三国志·武帝纪》《晋书·食货志》',
        cost: { gold: 100 },
        options: [
          { text: '定田租户调之法', reply: '令收田租亩四升，户出绢二匹、绵二斤而已。豪强不得擅赋，百姓稍安，军国之用亦足。', inner: '赋有常法，则吏不得横取。', effect: { gold: 300, food: 300, morale: -2, court: { legit: 4, loyalty: -3 } } },
          { text: '轻徭薄赋，以安流民', reply: '减赋以招流民，亳州之民归者万余户。府库之入稍减，而田野渐辟。', inner: '民归则田辟，田辟则兵足。', effect: { gold: -200, morale: 6, court: { legit: 3, loyalty: 8 } } }
        ]
      },
      {
        id: 'zhengyi',
        name: '征役之议',
        desc: '军兴不已，征役无度，丁壮流亡；议者请定役法，俾民有常。',
        src: '《三国志·司马朗传》《晋书·食货志》',
        cost: { gold: 150 },
        options: [
          { text: '定役法，户出丁壮有常', reply: '定役法，户出丁壮有常数。军伍得其补，而民间岁有远戍之苦，父老遮道而泣。', inner: '兵不能无，而役不可无制。', effect: { troops: 600, food: -150, morale: -3, court: { legit: 2, loyalty: -4 } } },
          { text: '优复流民，权罢征役', reply: '诏优复流民，权罢征役。归者如市，田野渐辟；而军伍之数不及旧额。', inner: '存其民，则兵源不绝于后。', effect: { food: 200, morale: 6, troops: -400, court: { loyalty: 7 } } }
        ]
      },
      {
        id: 'xingxue',
        name: '兴学之议',
        desc: '丧乱以来，学校废绝；议者请立太学，置博士，以课五经。',
        src: '《三国志·文帝纪》《后汉书·儒林传》',
        cost: { gold: 200 },
        options: [
          { text: '立太学，置博士', reply: '立太学，置五经博士，制课试之法。士人挟策而至者千数，郅都之下复闻弦诵。', inner: '兵可以取天下，学可以守之。', effect: { prestige: 6, gold: -100, court: { legit: 4, loyalty: 4 } } },
          { text: '但修州郡之学', reply: '但修州郡之学，令长吏择其俊秀者受业。所费既省，而士人未尝尽集于京师。', inner: '国学之费，不如先给军旅。', effect: { prestige: 3, court: { loyalty: 2 } } }
        ]
      },
      {
        id: 'dashe',
        name: '大赦之议',
        desc: '狱讼既繁，或请行大赦以慰人心，或以为赦者偏枯之物、非明世所宜有。',
        src: '《三国志·孟光传》《后汉书·献帝纪》',
        cost: { prestige: 3 },
        options: [
          { text: '行大赦，以慰人心', reply: '大赦境内，狱囚得出者相望于道。父老感悦，而良民之受害于凶人者，复有怨言。', inner: '民困于狱久矣，一赦可以得众心。', effect: { morale: 5, court: { strife: 4, legit: -2, loyalty: 5 } } },
          { text: '不行赦，明法以肃朝纲', reply: '诏不行赦，明法以肃朝纲。狱中死者稍多，而境内盗贼为之屏息。', inner: '赦者，偏枯之物也；法之不行，自上犯之。', effect: { prestige: 3, court: { legit: 4, strife: -3, loyalty: -3 } } }
        ]
      },
      {
        id: 'zongshi',
        name: '宗室之议',
        desc: '宗室与国同休，而虚号无实；议者请封建宗室以固根本。',
        src: '《三国志·武文世王公传》裴注引《魏氏春秋》',
        cost: { gold: 200, prestige: 3 },
        options: [
          { text: '封建宗室，使出镇州郡', reply: '分封宗室，各使就国、典其兵民。枝干相扶，根本以固；而诸王各拥其众，朝廷之令渐有所不行。', inner: '枝叶盛，则本干不可动摇。', effect: { troops: 500, court: { strife: 6, legit: 4, loyalty: -3 } } },
          { text: '抑宗室，任异姓之才', reply: '抑宗室之权，专任异姓之才。朝政整肃，而宗室怏怏，谓之不亲骨肉。', inner: '国有常制，不可以亲疏论才否。', effect: { prestige: 4, court: { strife: -4, legit: -3, loyalty: 5 } } }
        ]
      },
      {
        id: 'huanguan',
        name: '宦者之议',
        desc: '桓灵之世，宦者擅权而天下大乱；今宫中复有任事者，议者请早为之制。',
        src: '《后汉书·宦者列传》',
        cost: { prestige: 3 },
        options: [
          { text: '抑宦者，任士人', reply: '诏抑宦者之权，凡机要悉归台省。士人相庆，而禁中侍者怨望，宫中之事多泄于外。', inner: '前代之祸，不可再见于今日。', effect: { prestige: 5, court: { strife: -5, legit: 5, loyalty: 4 } } },
          { text: '以宦者典机要，为耳目', reply: '以宦者典机要，察百官之动静。朝廷之上，人皆侧目而不敢言；禁中之事，则纤悉皆闻于人主。', inner: '外臣难信，唯近侍可托耳目。', effect: { gold: 300, court: { strife: 10, legit: -5, loyalty: -8 } } }
        ]
      },
      {
        id: 'shuili',
        name: '水利之议',
        desc: '郡国河渠多废，旱涝相仍；议者请开渠通漕、修陂塘以资灌溉。',
        src: '《三国志·邓艾传》《晋书·食货志》',
        cost: { gold: 250 },
        cooldown: 8,
        options: [
          { text: '开渠屯田，通漕运', reply: '开河渠、通漕运，屯田之利岁增。转粟之劳既省，仓廪日实。', inner: '水利者，百年之利也。', effect: { food: 600, gold: -100, court: { loyalty: 3 }, flag: 'shuili' } },
          { text: '筑堤以防河患', reply: '筑堤以防水患，濒河之郡免于漂没，民得安业；而水田之利未广。', inner: '先救其害，后图其利。', effect: { food: 200, morale: 3, court: { legit: 3 } } }
        ]
      },
      {
        id: 'fengshang',
        name: '封赏之议',
        desc: '诸将效力日久，赏典未行；议者请厚赏功臣，以固众心。',
        src: '《三国志·先主传》《三国志·文帝纪》',
        cost: { gold: 400 },
        options: [
          { text: '厚赏功臣，以固众心', reply: '赐功臣金五百斤、银千斤、钱五千万、锦千匹，各有差次。将士感悦，争效死力。', inner: '赏不逾时，则人知劝。', effect: { prestige: 5, gold: -100, court: { loyalty: 8, strife: -3 } } },
          { text: '薄赏积粟，以备军兴', reply: '诏薄其赏，而藏粟于仓。府库虽实，诸将不得其望，人心稍懈。', inner: '今日费一金，来日军中少一斛粟。', effect: { food: 300, gold: 100, court: { loyalty: -6, strife: 4 } } }
        ]
      },
      {
        id: 'heqin',
        name: '盟誓之议',
        desc: '四邻皆有强兵，议者请遣使结盟、申以誓约，以纾北顾之忧。',
        src: '《三国志·吴主传》《三国志·邓芝传》',
        cost: { gold: 200, prestige: 3 },
        options: [
          { text: '遣使结盟，共拒强敌', reply: '遣使结盟，中分天下，申以誓书。邻邦之使往来不绝，边境之战遂稀。', inner: '以口舌代甲兵，不亦善乎。', effect: { relation: 5, court: { strife: -3, legit: 2 }, flag: 'mengshi' } },
          { text: '闭关自守，不与外交', reply: '闭关自守，不遣一使。邻邦莫测其意，亦遣使来观；边地之民，苦于微戍而已。', inner: '信义之盟，未必足恃，不如自守。', effect: { gold: 100, court: { strife: 3, loyalty: 3 } } }
        ]
      },
      {
        id: 'qiandu',
        name: '迁都之议',
        desc: '旧都残破，粮运艰阻；议者请徙都就粮，据险而守。',
        src: '《三国志·董卓传》《三国志·文帝纪》《三国志·孙皓传》',
        cost: { gold: 300, prestige: 5 },
        once: true,
        options: [
          { text: '徙都就粮，据险自守', reply: '车驾西行，百官随之。就粮之势既便，而士民播迁，怨咨载路。', inner: '据险而居，则守易而攻难。', effect: { food: 400, gold: -100, prestige: -3, court: { strife: 6, legit: -3 } } },
          { text: '仍都旧地，不改其常', reply: '仍都旧地，不迁不徙，民习其居而士安其业。转输之劳，岁以为常。', inner: '动不如静，迁都之议，非所以安民。', effect: { prestige: 4, court: { strife: -4, legit: 3, loyalty: 3 } } }
        ]
      },
    ],
    heirs: {
      caocao: [
        { id: 'cao_pi', name: '曹丕', order: 1, claim: '嫡长', note: '卞夫人所生，建安二十二年立为魏太子，二十五年嗣魏王，受汉禅即帝位。' },
        { id: 'cao_zhang', name: '曹彰', order: 2, claim: '有军功', note: '卞夫人所生，少善射御，北征乌丸、代郡，曹操称之曰黄须儿，然不任文事。' },
        { id: 'cao_zhi', name: '曹植', order: 3, claim: '才学', note: '卞夫人所生，善属文，丁仪、丁廙、杨修党之，储位之争由此而起。' }
      ],
      liubei: [
        { id: 'liu_shan', name: '刘禅', order: 1, claim: '嫡子', note: '甘夫人所生，建安二十四年立为王太子，章武元年立为皇太子。' },
        { id: 'liu_feng', name: '刘封', order: 2, claim: '养子', note: '本罗侯寇氏之子，先主未有继嗣时养以为子，有军功而刚猛，为诸葛亮所虑。' }
      ],
      sunjian: [
        { id: 'sun_ce', name: '孙策', order: 1, claim: '嫡长', note: '孙坚长子，坚卒后领其众，定江东六郡，为许贡之客所伤而卒，年二十六。' },
        { id: 'sun_quan', name: '孙权', order: 2, claim: '母弟', note: '孙坚次子，承兄之业，举贤任能，保有江东，后称帝于武昌、建业。' },
        { id: 'sun_yi', name: '孙翊', order: 3, claim: '有军功', note: '字叔弼，骁悍果烈，有兄策之风，为丹杨太守，建安八年为左右所杀。' },
        { id: 'sun_kuang', name: '孙匡', order: 4, claim: '母弟', note: '字季佐，举孝廉茂才，早卒，其子孙泰后为吴将。' }
      ],
      sunce: [
        { id: 'sun_quan', name: '孙权', order: 1, claim: '母弟', note: '策临卒呼权佩以印绶，谓举江东之众、保江东之业，非权不可。' },
        { id: 'sun_yi', name: '孙翊', order: 2, claim: '母弟', note: '孙权之弟，骁悍有兄风，策卒后为丹杨太守，数与吴宗部相争。' }
      ],
      sunquan: [
        { id: 'sun_he', name: '孙和', order: 1, claim: '太子', note: '赤乌五年立为太子，有令名，后以鲁王霸之谗见幽废，徙故鄣，赐死。' },
        { id: 'sun_xiu', name: '孙休', order: 2, claim: '宗室', note: '字子烈，封琅琊王，孙綝废亮之后迎立之，即位数月而诛綝。' },
        { id: 'sun_liang', name: '孙亮', order: 3, claim: '母宠', note: '潘夫人所生，赤乌十三年立为太子，权崩即位，年十岁，政归诸葛恪、孙峻。' }
      ],
      liubiao: [
        { id: 'liu_qi', name: '刘琦', order: 1, claim: '长子', note: '表之长子，与蔡氏有隙，出为江夏太守；表卒后奔江南，后为刘备所表为荆州刺史。' },
        { id: 'liu_cong', name: '刘琮', order: 2, claim: '母宠', note: '表之少子，蔡氏所爱，蔡瑁、张允党之；表卒嗣立，遂以荆州之众降曹操。' },
        { id: 'liu_pan', name: '刘磐', order: 3, claim: '宗室', note: '表之从子，骁勇，数为寇于江东，与太史慈相拒于建昌、海昏之间。' }
      ],
      yuanshao: [
        { id: 'yuan_tan', name: '袁谭', order: 1, claim: '长子', note: '绍之长子，出为青州刺史；绍卒后为审配等所挤，自号车骑将军，与尚相攻。' },
        { id: 'yuan_xi', name: '袁熙', order: 2, claim: '次子', note: '绍之次子，为幽州刺史，与弟尚相亲；尚败后与其众奔乌丸、辽东。' },
        { id: 'yuan_shang', name: '袁尚', order: 3, claim: '母宠', note: '绍之少子，为后妻刘氏所爱，审配、逢纪矫绍遗命奉之为嗣。' }
      ],
      simayi: [
        { id: 'sima_shi', name: '司马师', order: 1, claim: '嫡长', note: '懿之长子，继其政，平毌丘俭之叛而卒于许昌，魏之权柄由是传于弟昭。' },
        { id: 'sima_zhao', name: '司马昭', order: 2, claim: '次子', note: '懿之次子，继兄秉政，平诸葛诞、弑高贵乡公，灭蜀于景元四年。' }
      ],
      mateng: [
        { id: 'ma_chao', name: '马超', order: 1, claim: '长子', note: '腾之长子，领其父之众留关中，建安十六年与韩遂等起兵，后归刘备。' },
        { id: 'ma_xiu', name: '马休', order: 2, claim: '次子', note: '腾之子，随腾入邺为奉车都尉，腾诛时同日被害。' },
        { id: 'ma_tie', name: '马铁', order: 3, claim: '少子', note: '腾之子，为骑都尉，亦以腾之诛坐死。' }
      ],
      gongsundu: [
        { id: 'gongsun_kang', name: '公孙康', order: 1, claim: '长子', note: '度之长子，嗣辽东太守，斩袁尚、袁熙之首以献曹操，为魏所表为左将军。' },
        { id: 'gongsun_gong', name: '公孙恭', order: 2, claim: '次子', note: '度之次子，康卒后以渊幼而嗣辽东，病弱不能治事，后为渊所胁夺。' }
      ],
      gongsunkang: [
        { id: 'gongsun_yuan', name: '公孙渊', order: 1, claim: '子', note: '康之子，嗣辽东；初通吴受燕王之号，旋斩吴使以自解，景初二年为司马懿所灭。' },
        { id: 'gongsun_gong', name: '公孙恭', order: 2, claim: '宗室', note: '康之弟，康卒时渊尚幼，众立恭以守辽东，后为渊所夺，囚于襄平。' }
      ],
      zhangjiao: [
        { id: 'huangjin_zhang_bao', name: '张宝', order: 1, claim: '同产弟', note: '角之弟，称地公将军；角死后领其众据下曲阳，为皇甫嵩所破，见杀。' },
        { id: 'zhang_liang', name: '张梁', order: 2, claim: '同产弟', note: '角之弟，称人公将军，守广宗；张角病死，梁拒守，城破而死。' }
      ]
    }
  };

  root.POLITICS = POLITICS;
  if (typeof module !== 'undefined' && module.exports) { module.exports = POLITICS; }
})(typeof window !== 'undefined' ? window : globalThis);
