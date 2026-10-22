/* 《代汉涂高》 — 剧本与关卡（分册三：边地雄踞·江东虎踞·苍天已死）
 * 十二家之君：公孙度、公孙康、公孙渊、马腾、张绣、张鲁、孙坚、孙策、孙权、孙休、孙皓、张角。
 * 共剧本二十六，关卡一百三十一，皆依《三国志》《后汉书》《资治通鉴》编次。
 */
(function (root) {
  'use strict';

  var CAMPAIGNS = {
    gongsundu: {
      lord: 'gongsundu',
      scenarios: [
        {
          id: 'gongsundu_e189',
          name: '辽东自立',
          era: 'e189',
          year: 189,
          blurb: '中平六年，董卓入洛，中原大乱。公孙度由同郡徐荣之荐得为辽东太守，到郡诛襄平豪族百余家，东伐高句丽、西击乌桓，海东四郡遂成一方。',
          stages: [
            {
              id: 'gongsundu_e189_1',
              name: '襄平立威',
              desc: '到郡即诛襄平豪族百余家，收其部曲，以严刑立威；辽东方定，乃可外图。',
              goal: { turns: 8 }
            },
            {
              id: 'gongsundu_e189_2',
              name: '越海收东莱',
              desc: '初平元年，度分辽东为辽西、中辽二郡，越海取东莱诸县，置营州刺史，海道遂通。',
              goal: { cities: ['donglai'] }
            },
            {
              id: 'gongsundu_e189_3',
              name: '西击乌桓',
              desc: '乌桓、高句丽数为边患；度西击乌桓，东伐高句丽，拓地千里，幽东诸郡皆震。',
              goal: { cities: ['liaoxi', 'youbeiping'] }
            },
            {
              id: 'gongsundu_e189_4',
              name: '海东自主',
              desc: '中原方乱，海东四郡凭险自守；或闭关以终，或南向以争幽燕，此后无定式。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'gongsundu_e194',
          name: '海东经略',
          era: 'e194',
          year: 194,
          blurb: '兴平元年，关东群雄相攻，天子在长安。公孙度据海东四郡，礼遇管宁、邴原、王烈等避乱之士，越海营州，隐然自成一国。',
          stages: [
            {
              id: 'gongsundu_e194_1',
              name: '礼士安民',
              desc: '管宁、邴原、王烈既至辽东，度虚馆以候之，讲诗书、明礼让，辽东风教大行。',
              goal: { turns: 8 }
            },
            {
              id: 'gongsundu_e194_2',
              name: '西并辽西',
              desc: '公孙瓒、袁绍相攻于幽州，边地无主；度乘间西取辽西，以通幽东之道。',
              goal: { cities: ['liaoxi'] }
            },
            {
              id: 'gongsundu_e194_3',
              name: '北收右北平',
              desc: '辽西既下，右北平孤悬；度进收之，则海东与幽州之间不复有隔。',
              goal: { cities: ['youbeiping'] }
            },
            {
              id: 'gongsundu_e194_4',
              name: '海东自立',
              desc: '海东四郡凭海为固，中原之兵不能至；此后无定式，或越海取青州，或闭境以终。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'gongsundu_e199',
          name: '海东观变',
          era: 'e199',
          year: 199,
          blurb: '建安四年，曹操与袁绍相拒于官渡，中原鼎沸。公孙度拥海东之众，受武威将军、永宁乡侯之封而藏印不用，欲观成败以定从违。',
          stages: [
            {
              id: 'gongsundu_e199_1',
              name: '永宁之封',
              desc: '曹操表度为武威将军、永宁乡侯，度藏印绶于库而不受；此关闭关自守，不预中原。',
              goal: { turns: 8 }
            },
            {
              id: 'gongsundu_e199_2',
              name: '乘隙取辽西',
              desc: '曹袁相拒于官渡，幽州之兵尽南调；度乘间取辽西、右北平，海东之境遂广。',
              goal: { cities: ['liaoxi', 'youbeiping'] }
            },
            {
              id: 'gongsundu_e199_3',
              name: '越海窥青州',
              desc: '青州滨海，海道半日可至；度越海取东莱，又窥北海，欲收其民户以实辽东。',
              goal: { cities: ['donglai', 'beihai'] }
            },
            {
              id: 'gongsundu_e199_4',
              name: '海东之守',
              desc: '海东四郡僻处一隅，中原之变终不可与；此后无定式，或效箕子之业，或拱手而事人。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    gongsunkang: {
      lord: 'gongsunkang',
      scenarios: [
        {
          id: 'gongsunkang_e208',
          name: '斩袁献首',
          era: 'e208',
          year: 208,
          blurb: '建安十二年，曹操破乌桓于白狼山，袁尚、袁熙奔辽东。公孙康承父度之业，斩尚、熙函首以献，又东破高句丽，分屯有县以南荒地为带方郡。',
          stages: [
            {
              id: 'gongsunkang_e208_1',
              name: '伏兵斩二袁',
              desc: '袁尚、袁熙奔辽东，曹操曰「吾方使康斩送其首」；康设伏斩之，函首以献。',
              goal: { turns: 8 }
            },
            {
              id: 'gongsunkang_e208_2',
              name: '分置带方郡',
              desc: '康东破高句丽，分屯有县以南荒地为带方郡；汉四郡之遗，复立于海东。',
              goal: { minCities: 8 }
            },
            {
              id: 'gongsunkang_e208_3',
              name: '西取渔阳',
              desc: '曹操方南征荆州，幽州边备空虚；康乘间西取渔阳，以广辽西之蔽。',
              goal: { cities: ['yuyang'] }
            },
            {
              id: 'gongsunkang_e208_4',
              name: '择主而事',
              desc: '中原易代之际，辽东当择其可归者归之；或受封为侯，或自王海东，此后无定式。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'gongsunkang_e215',
          name: '海东闭关',
          era: 'e215',
          year: 215,
          blurb: '建安二十年，曹操西征张鲁，孙权乘虚围合肥，中原兵连不解。公孙康据幽东与海东之地，带方新郡初立，唯以保境安民为务。',
          stages: [
            {
              id: 'gongsunkang_e215_1',
              name: '闭关保境',
              desc: '曹孙相攻于淮南，中原兵连不解；康闭关自守，抚带方新附之民。',
              goal: { turns: 8 }
            },
            {
              id: 'gongsunkang_e215_2',
              name: '乘虚取渔阳',
              desc: '曹操西征汉中，幽州之兵随之西调；康乘间取渔阳，以广辽西之蔽。',
              goal: { cities: ['yuyang'] }
            },
            {
              id: 'gongsunkang_e215_3',
              name: '东抚韩濊',
              desc: '带方既置，康东抚韩濊诸部，吏民稍集；海东郡县之制，自此可久。',
              goal: { minCities: 8 }
            },
            {
              id: 'gongsunkang_e215_4',
              name: '海东之变',
              desc: '海东四郡僻在海隅，中原之变终不可知；此后无定式，或终为魏之郡县，或别开新局。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    gongsunyuan: {
      lord: 'gongsunyuan',
      scenarios: [
        {
          id: 'gongsunyuan_e220',
          name: '海东候变',
          era: 'e220',
          year: 220,
          blurb: '延康元年，曹操崩于洛阳，曹丕受禅于繁阳，中原易代。公孙氏据海东四郡，旁观魏吴之衅；辽东之事，自此当归于渊之一身。',
          stages: [
            {
              id: 'gongsunyuan_e220_1',
              name: '襄平自守',
              desc: '曹丕受禅，中原易主；渊据襄平与海东四郡，唯以自守，不轻附人。',
              goal: { turns: 8 }
            },
            {
              id: 'gongsunyuan_e220_2',
              name: '遣使贡献',
              desc: '魏以辽东遥远，姑羁縻之；渊遣使入贡，受扬烈将军、辽东太守之号。',
              goal: { turns: 12 }
            },
            {
              id: 'gongsunyuan_e220_3',
              name: '南通孙吴',
              desc: '渊浮海通使于吴，受吴燕王之封，欲借江东之势以抗魏；魏吴之间，两属而已。',
              goal: { turns: 14 }
            },
            {
              id: 'gongsunyuan_e220_4',
              name: '西收辽西',
              desc: '魏方有事于中原，幽东暗虚；渊乘间西收辽西、右北平，以广海东之境。',
              goal: { cities: ['liaoxi', 'youbeiping'] }
            },
            {
              id: 'gongsunyuan_e220_5',
              name: '海东独步',
              desc: '海东之地孤悬一隅，两端之策终不可久；此后无定式，或终身称藩，或举襄平以抗中原。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'gongsunyuan_e228',
          name: '夺位辽东',
          era: 'e228',
          year: 228,
          blurb: '太和二年，公孙渊夺其叔父公孙恭之位而自立，魏拜为扬烈将军、辽东太守。渊南通孙权、受吴燕王之封，又以魏兵将至而斩吴使，两端之策终不能久。',
          stages: [
            {
              id: 'gongsunyuan_e228_1',
              name: '夺恭自立',
              desc: '太和二年，渊夺叔父公孙恭之位，魏明帝因拜为扬烈将军、辽东太守。',
              goal: { turns: 8 }
            },
            {
              id: 'gongsunyuan_e228_2',
              name: '浮海通吴',
              desc: '渊遣使浮海南通孙权，受吴燕王之封；欲借江东之势，以抗中原之兵。',
              goal: { turns: 12 }
            },
            {
              id: 'gongsunyuan_e228_3',
              name: '斩吴使',
              desc: '魏兵将讨，渊斩吴使张弥、许晏，尽没其兵资，复称藩于魏。',
              goal: { turns: 14 }
            },
            {
              id: 'gongsunyuan_e228_4',
              name: '西收辽西',
              desc: '魏方有事于雍凉，诸葛亮出祁山；渊乘间西收辽西、右北平，海东之境遂广。',
              goal: { cities: ['liaoxi', 'youbeiping'] }
            },
            {
              id: 'gongsunyuan_e228_5',
              name: '襄平之局',
              desc: '海东一隅，终须自决；此后无定式，或终老辽东，或举襄平以抗司马，皆在自择。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    mateng: {
      lord: 'mateng',
      scenarios: [
        {
          id: 'mateng_e194',
          name: '长平观之役',
          era: 'e194',
          year: 194,
          blurb: '兴平元年，李傕、郭汜在长安相攻，关中大乱。马腾以凉州羌胡之众东向，与韩遂合兵至长安，战于长平观而败，退归陇右，仍为关西巨镇。',
          stages: [
            {
              id: 'mateng_e194_1',
              name: '并羌胡之众',
              desc: '腾家贫，常从羌人求，故其众皆羌胡，来如风雨；先并诸部，以固凉州。',
              goal: { turns: 8 }
            },
            {
              id: 'mateng_e194_2',
              name: '取陇西天水',
              desc: '腾与韩遂引兵东向，先收陇西、天水以通道三辅；李傕遣兵拒之于陈仓。',
              goal: { cities: ['longxi', 'tianshui'] }
            },
            {
              id: 'mateng_e194_3',
              name: '战于长平观',
              desc: '腾、遂引兵至长安，与李傕战于长平观；此关须取陈仓、安定，以逼三辅。',
              goal: { cities: ['chencang', 'anding'] }
            },
            {
              id: 'mateng_e194_4',
              name: '入据长安',
              desc: '关西之众皆附马氏，乘李傕之乱而东；若能入据长安，则三辅之地尽在掌握。',
              goal: { cities: ['changan'] }
            },
            {
              id: 'mateng_e194_5',
              name: '关西之雄',
              desc: '凉州之众虽悍，而不能持久；此后无定式，或东向争三辅，或退保陇右以终。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'mateng_e199',
          name: '关中观望',
          era: 'e199',
          year: 199,
          blurb: '建安四年，曹操与袁绍相拒于河北，遣钟繇持节督关中诸军。马腾据凉州及武都，与韩遂时合时离，持两端以观成败。',
          stages: [
            {
              id: 'mateng_e199_1',
              name: '钟繇督关中',
              desc: '曹操方与袁绍相拒，遣钟繇持节督关中诸军；腾持两端，未肯遣子入侍。',
              goal: { turns: 8 }
            },
            {
              id: 'mateng_e199_2',
              name: '收陇右',
              desc: '曹袁鏖兵于河北，关右无主；腾乘间东收陇西、天水，以通三辅之路。',
              goal: { cities: ['longxi', 'tianshui'] }
            },
            {
              id: 'mateng_e199_3',
              name: '争陈仓',
              desc: '李傕既灭，关中诸将各不相下；腾取陈仓、安定，以逼长安之门户。',
              goal: { cities: ['chencang', 'anding'] }
            },
            {
              id: 'mateng_e199_4',
              name: '东出潼关',
              desc: '腾既据凉州，欲东出潼关以收三辅；曹操方北顾河北，关右之事未定。',
              goal: { cities: ['changan', 'tongguan'] }
            },
            {
              id: 'mateng_e199_5',
              name: '关右去留',
              desc: '关西之众可战而不可久；此后无定式，或入朝为卫尉，或举凉州之众以抗曹。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'mateng_e208',
          name: '卫尉入朝',
          era: 'e208',
          year: 208,
          blurb: '建安十三年，曹操将南征荆州，恐关西有变，表马腾为卫尉、诏令入朝。腾自请宿卫而留其子超领部众，凉州七郡犹为马氏之资。',
          stages: [
            {
              id: 'mateng_e208_1',
              name: '诏入宿卫',
              desc: '曹操表腾为卫尉，诏令入朝宿卫；腾犹豫不决，张既劝之，乃行。',
              goal: { turns: 8 }
            },
            {
              id: 'mateng_e208_2',
              name: '留超领众',
              desc: '腾入朝而留子超领其部曲，凉州之众未散；父子分处朝野，以观中原之变。',
              goal: { turns: 12 }
            },
            {
              id: 'mateng_e208_3',
              name: '乘间取陇西',
              desc: '曹操南征荆州，关右兵少；腾欲乘间收陇西、天水，以牵曹氏之后。',
              goal: { cities: ['longxi', 'tianshui'] }
            },
            {
              id: 'mateng_e208_4',
              name: '进争陈仓',
              desc: '腾既据凉州，进争陈仓、安定；三辅门户若在关西之手，许都亦不能安。',
              goal: { cities: ['chencang', 'anding'] }
            },
            {
              id: 'mateng_e208_5',
              name: '凉州后事',
              desc: '马氏之众终不可长恃；此后无定式，或入朝终老，或令子超举兵于关中。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    zhangxiu: {
      lord: 'zhangxiu',
      scenarios: [
        {
          id: 'zhangxiu_e199',
          name: '宛城求生',
          era: 'e199',
          year: 199,
          blurb: '建安四年，曹操与袁绍相拒于官渡。张绣屯宛，先降曹而复叛，夜袭曹营，杀曹昂、典韦；南合刘表以自保，一城之众周旋于曹、刘、袁之间。',
          stages: [
            {
              id: 'zhangxiu_e199_1',
              name: '宛城拒守',
              desc: '建安二年曹操南征，绣降而复叛，夜袭曹营，杀曹昂、典韦；曹氏必来报仇，先固孤城。',
              goal: { turns: 8 }
            },
            {
              id: 'zhangxiu_e199_2',
              name: '合刘表',
              desc: '绣南合刘表，屯于穰而表济其军粮；曹操再攻南阳，终不能拔。',
              goal: { turns: 12 }
            },
            {
              id: 'zhangxiu_e199_3',
              name: '乘间取新野',
              desc: '曹操北备袁绍，南阳兵力单薄；绣乘间取新野、樊城，宛城之地始广。',
              goal: { cities: ['xinye', 'fancheng'] }
            },
            {
              id: 'zhangxiu_e199_4',
              name: '收南阳之众',
              desc: '绣收张济旧部与南阳流民，城邑至五；曹刘之间，遂有一隅自守之资。',
              goal: { minCities: 5 }
            },
            {
              id: 'zhangxiu_e199_5',
              name: '宛城孤旅',
              desc: '孤城之众，终须择所归；此后无定式，或降曹为将，或据宛自守，全族而已。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    zhanglu: {
      lord: 'zhanglu',
      scenarios: [
        {
          id: 'zhanglu_e189',
          name: '巴汉断道',
          era: 'e189',
          year: 189,
          blurb: '中平六年，灵帝崩而董卓入洛，益州牧刘焉闭境自守，以米贼断道为辞不复贡献。张鲁以五斗米道教化巴汉之民，不置长吏，渐成一方之实。',
          stages: [
            {
              id: 'zhanglu_e189_1',
              name: '受命入汉',
              desc: '刘焉遣张鲁为督义司马，与别部司马张修同击汉中太守苏固，遂入汉中。',
              goal: { turns: 8 }
            },
            {
              id: 'zhanglu_e189_2',
              name: '绝斜谷道',
              desc: '鲁绝斜谷之道、杀汉使，益州遂不复通贡献；巴汉之地，实由鲁自专。',
              goal: { turns: 12 }
            },
            {
              id: 'zhanglu_e189_3',
              name: '并张修众',
              desc: '初平二年，鲁杀别部司马张修而并其众，据汉中，改名汉宁；城邑至四。',
              goal: { minCities: 4 }
            },
            {
              id: 'zhanglu_e189_4',
              name: '取武都',
              desc: '武都氐羌错居，据之则陇右之声可通，米道亦得行于氐羌之间。',
              goal: { cities: ['wudu'] }
            },
            {
              id: 'zhanglu_e189_5',
              name: '取剑阁',
              desc: '刘璋既杀鲁母及弟，遂成仇敌；鲁取剑阁，以据蜀北之门。',
              goal: { cities: ['jiange'] }
            },
            {
              id: 'zhanglu_e189_6',
              name: '师君之政',
              desc: '巴汉之民不复知有汉吏；此后无定式，或保境以终，或降中原以求全族。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'zhanglu_e194',
          name: '汉宁自立',
          era: 'e194',
          year: 194,
          blurb: '兴平元年，刘焉卒，刘璋继为益州牧。张鲁以不顺见攻，母及弟皆被杀，遂与益州绝；据汉宁，以鬼道教民，立义舍、置义米肉，巴汉之民多归之。',
          stages: [
            {
              id: 'zhanglu_e194_1',
              name: '与益州绝',
              desc: '刘璋既杀鲁母及弟，鲁遂与之绝；闭斜谷之口，巴汉自成一家。',
              goal: { turns: 8 }
            },
            {
              id: 'zhanglu_e194_2',
              name: '拒庞羲之攻',
              desc: '刘璋遣庞羲攻汉中，数为鲁所破；蜀兵不能逾剑阁而北，鲁境以安。',
              goal: { turns: 12 }
            },
            {
              id: 'zhanglu_e194_3',
              name: '取阆中',
              desc: '刘璋以庞羲为巴西太守，与鲁相攻；鲁取阆中，以通巴賨之路。',
              goal: { cities: ['langzhong'] }
            },
            {
              id: 'zhanglu_e194_4',
              name: '北取陈仓',
              desc: '关中方乱，李傕、郭汜相攻；鲁乘间北取陈仓，以通陇右而固汉中。',
              goal: { cities: ['chencang'] }
            },
            {
              id: 'zhanglu_e194_5',
              name: '义舍之政',
              desc: '义舍、义米肉遍布巴汉，行路者量腹取足；此后无定式，或保民以终，或降中原。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'zhanglu_e199',
          name: '汉中之守',
          era: 'e199',
          year: 199,
          blurb: '建安四年，曹操与袁绍相拒于官渡，天下之争在河北。张鲁保巴汉，以祭酒治民而不置长吏，置义舍以济行旅，蜀中之民亦多信其道。',
          stages: [
            {
              id: 'zhanglu_e199_1',
              name: '闭关保境',
              desc: '曹操奉天子都许，州郡争附；鲁闭关自守，巴汉之民不预兵革。',
              goal: { turns: 8 }
            },
            {
              id: 'zhanglu_e199_2',
              name: '义舍济众',
              desc: '置义舍、储义米肉，行路者量腹取足；犯法者三原而后刑，境内无怨。',
              goal: { turns: 12 }
            },
            {
              id: 'zhanglu_e199_3',
              name: '诱取葭萌',
              desc: '刘备入蜀，留霍峻守葭萌；鲁遣将诱之而不从，遂志在取蜀之北门。',
              goal: { cities: ['jiameng'] }
            },
            {
              id: 'zhanglu_e199_4',
              name: '北收武都',
              desc: '武都氐羌错居，马腾、韩遂方争陇右；鲁取武都，则汉中与陇右声气相接。',
              goal: { cities: ['wudu'] }
            },
            {
              id: 'zhanglu_e199_5',
              name: '巴汉终局',
              desc: '巴汉之地四塞而民寡；此后无定式，或降中原以全族，或保巴汉以终其身。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'zhanglu_e208',
          name: '汉中自守',
          era: 'e208',
          year: 208,
          blurb: '建安十三年，曹操平河北、下荆州，威震天下。张鲁以镇民中郎将领汉宁太守，通贡献而自守；米道行于巴汉，蜀人亦多信之，汉中隐然为一国。',
          stages: [
            {
              id: 'zhanglu_e208_1',
              name: '闭关自守',
              desc: '曹操既得荆州，江汉震动；鲁闭关保境，不预中原之兵。',
              goal: { turns: 8 }
            },
            {
              id: 'zhanglu_e208_2',
              name: '收马超之众',
              desc: '马超自凉州败走，依于汉中；鲁以女妻之，欲借西凉之众以图蜀。',
              goal: { turns: 12 }
            },
            {
              id: 'zhanglu_e208_3',
              name: '取巴西',
              desc: '巴賨之众素信米道；鲁取巴西郡，则巴汉之势相属，蜀之北门尽在其手。',
              goal: { cities: ['langzhong'] }
            },
            {
              id: 'zhanglu_e208_4',
              name: '据巴汉之全',
              desc: '鲁既收西凉余众，又得巴西之地；城邑至五，巴汉之众自成一国。',
              goal: { minCities: 5 }
            },
            {
              id: 'zhanglu_e208_5',
              name: '汉中岁月',
              desc: '巴汉僻处西南，中原之兵终不能久；此后无定式，或降曹以求全，或据险以拒。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'zhanglu_e215',
          name: '阳平之降',
          era: 'e215',
          year: 215,
          blurb: '建安二十年，曹操自散关出武都征汉中，七月至阳平关。鲁弟张卫据关拒守，曹军夜袭破之；鲁封藏宝货，走保巴中，卒以全族降曹。',
          stages: [
            {
              id: 'zhanglu_e215_1',
              name: '阳平拒守',
              desc: '曹操自散关出武都征汉中，鲁遣弟卫据阳平关；关城险固，曹军不得进。',
              goal: { turns: 8 }
            },
            {
              id: 'zhanglu_e215_2',
              name: '走保巴中',
              desc: '阳平关破，鲁欲降而阎圃劝以待；鲁封藏宝货，走入巴中，以观其变。',
              goal: { turns: 12 }
            },
            {
              id: 'zhanglu_e215_3',
              name: '保据巴汉',
              desc: '鲁入巴中，欲再收巴汉之众；上庸、葭萌若下，则四方之路复通。',
              goal: { cities: ['shangyong', 'jiameng'] }
            },
            {
              id: 'zhanglu_e215_4',
              name: '封库待命',
              desc: '曹操使人慰喻，鲁封藏以待；此后无定式，或降而全族，或据险而俱亡。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    sunjian: {
      lord: 'sunjian',
      scenarios: [
        {
          id: 'sunjian_e189',
          name: '长沙讨董',
          era: 'e189',
          year: 189,
          blurb: '中平六年，董卓废少帝、专朝政，关东州郡同时举义。孙坚以长沙太守之兵北上，杀王叡、张咨，屯鲁阳而袁术济其军，遂为讨董诸军之锋。',
          stages: [
            {
              id: 'sunjian_e189_1',
              name: '长沙举兵',
              desc: '董卓擅废立，天下州郡举义；坚自长沙勒兵北上，先定荆南之内。',
              goal: { turns: 8 }
            },
            {
              id: 'sunjian_e189_2',
              name: '北通南阳',
              desc: '坚北上，逼杀荆州刺史王叡、南阳太守张咨；此关须取南阳，以通北上之道。',
              goal: { cities: ['wan'] }
            },
            {
              id: 'sunjian_e189_3',
              name: '鲁阳屯兵',
              desc: '袁术表坚行破虏将军、领豫州刺史，屯于鲁阳；军资粮秣，皆由术给之。',
              goal: { turns: 12 }
            },
            {
              id: 'sunjian_e189_4',
              name: '阳人破卓',
              desc: '初平二年，坚合战于阳人，大破卓军，枭都督华雄；遂入洛阳，扫除汉庙。',
              goal: { cities: ['luoyang'] }
            },
            {
              id: 'sunjian_e189_5',
              name: '围襄阳',
              desc: '坚击刘表，围襄阳；黄祖伏兵于岘山，坚殒于此役，江东之业留待后嗣。',
              goal: { cities: ['xiangyang'] }
            },
            {
              id: 'sunjian_e189_6',
              name: '猛虎遗业',
              desc: '孙氏之众既失其主，终须别有所归；此后无定式，或举江东以雪父仇，或终为汉室纯臣。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    sunce: {
      lord: 'sunce',
      scenarios: [
        {
          id: 'sunce_e194',
          name: '渡江创业',
          era: 'e194',
          year: 194,
          blurb: '兴平元年，孙策以传国玺质于袁术，借父之旧部千余人渡江，时年二十一。破刘繇而定会稽、吴郡，江东之业自此始。',
          stages: [
            {
              id: 'sunce_e194_1',
              name: '质玺借兵',
              desc: '策以传国玺质于袁术，得父旧部千余人、骑数十匹；先集部曲，徐图江东。',
              goal: { turns: 8 }
            },
            {
              id: 'sunce_e194_2',
              name: '横江渡江',
              desc: '策自历阳渡江，破刘繇将张英、樊能于横江当利口，遂取曲阿，繇弃军而走。',
              goal: { cities: ['danyang'] }
            },
            {
              id: 'sunce_e194_3',
              name: '固陵破朗',
              desc: '建安元年，策攻会稽太守王朗于固陵，破之，尽有会稽；严白虎等皆平。',
              goal: { cities: ['kuaiji'] }
            },
            {
              id: 'sunce_e194_4',
              name: '并吴郡豫章',
              desc: '策自领会稽太守，以吴、丹阳、会稽为根本；又令虞翻说华歆于豫章，江东之形遂全。',
              goal: { cities: ['wu', 'yuzhang', 'jianye'] }
            },
            {
              id: 'sunce_e194_5',
              name: '江东初定',
              desc: '江东既定，而中原之变未已；此后无定式，可西讨江夏以报父仇，可北向以争天下。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'sunce_e199',
          name: '尽有江东',
          era: 'e199',
          year: 199,
          blurb: '建安四年，袁术死，其部曲归庐江太守刘勋。孙策说勋伐海昏上缭，因袭取皖城而尽收袁氏余众；又西讨黄祖以报父仇，江东之势遂强。',
          stages: [
            {
              id: 'sunce_e199_1',
              name: '袭取皖城',
              desc: '袁术死，其部曲归庐江太守刘勋；策说勋伐海昏上缭，因袭取皖城，尽收袁氏余众。',
              goal: { turns: 8 }
            },
            {
              id: 'sunce_e199_2',
              name: '西讨黄祖',
              desc: '建安四年，策既并袁氏之众，遂西讨江夏黄祖，为父坚报仇；江夏可取，则长江之险与江东相连。',
              goal: { cities: ['jiangxia'] }
            },
            {
              id: 'sunce_e199_3',
              name: '攻广陵',
              desc: '策遣军攻广陵，陈登拒之于匡琦城；江北屏藩，吴人必争。',
              goal: { cities: ['guangling'] }
            },
            {
              id: 'sunce_e199_4',
              name: '谋袭许都',
              desc: '建安五年，曹操与袁绍相拒官渡；策谋乘虚袭许，迎汉帝以令天下，未发而遇刺。',
              goal: { cities: ['xuchang'] }
            },
            {
              id: 'sunce_e199_5',
              name: '江东之终',
              desc: '小霸王之业未竟而身死；此后无定式，或继其志以图中原，或保江东以待时。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    sunquan: {
      lord: 'sunquan',
      scenarios: [
        {
          id: 'sunquan_e208',
          name: '赤壁之战',
          era: 'e208',
          year: 208,
          blurb: '建安十三年，曹操平河北、下荆州，率水陆大军临江，移书孙权。吴中皆惧，独鲁肃、周瑜主战；权与刘备合，大破操于赤壁，三分之势自此发端。',
          stages: [
            {
              id: 'sunquan_e208_1',
              name: '柴桑定议',
              desc: '曹操移书孙权，言治水军八十万众；张昭等主降，鲁肃、周瑜主战，权斫案而决。',
              goal: { turns: 8 }
            },
            {
              id: 'sunquan_e208_2',
              name: '赤壁火攻',
              desc: '黄盖诈降，因风纵火，曹操船舰延烧岸营；北军大溃，退保南郡。',
              goal: { turns: 12 }
            },
            {
              id: 'sunquan_e208_3',
              name: '围取江陵',
              desc: '建安十四年，周瑜、程普围曹仁于江陵，经年乃克；吴遂据荆州上游之势。',
              goal: { cities: ['jiangling'] }
            },
            {
              id: 'sunquan_e208_4',
              name: '合肥之役',
              desc: '赤壁既捷，权自将围合肥百余日，曹操遣张喜将骑赴救，吴军乃还。',
              goal: { cities: ['hefei'] }
            },
            {
              id: 'sunquan_e208_5',
              name: '荆南之争',
              desc: '荆南四郡土广人稀，为刘备所据而不还；权欲取长沙、桂阳，以固长江上游。',
              goal: { cities: ['changsha', 'guiyang'] }
            },
            {
              id: 'sunquan_e208_6',
              name: '鼎足之势',
              desc: '荆扬既合，蜀汉为援；此后无定式，或与蜀共讨曹操，或西争荆州以全长江。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'sunquan_e215',
          name: '湘水之盟',
          era: 'e215',
          year: 215,
          blurb: '建安二十年，刘备已得益州，孙权遣吕蒙取长沙、桂阳、零陵，遂与刘备分荆州，以湘水为界；又乘曹操西征之虚围合肥，为张辽八百人所破。',
          stages: [
            {
              id: 'sunquan_e215_1',
              name: '索荆三郡',
              desc: '权以刘备得益州而不还荆州，遣吕蒙取长沙、桂阳，又诱降零陵郝普。',
              goal: { cities: ['lingling'] }
            },
            {
              id: 'sunquan_e215_2',
              name: '逍遥津',
              desc: '权率十万围合肥，张辽以八百人逆击于逍遥津；吴人夺气，权几不免。',
              goal: { turns: 12 }
            },
            {
              id: 'sunquan_e215_3',
              name: '湘水为界',
              desc: '曹操入汉中，刘备请和；权令吕蒙还零陵，与备分荆州，以湘水为界。',
              goal: { turns: 14 }
            },
            {
              id: 'sunquan_e215_4',
              name: '争淮南',
              desc: '湘水既定，吴之兵锋复北向；魏以合肥、寿春为屏，权欲取汝南以撼许洛。',
              goal: { cities: ['runan'] }
            },
            {
              id: 'sunquan_e215_5',
              name: '江东之固',
              desc: '长江之险既全，江淮之争未已；此后无定式，或北争淮南，或西图荆襄。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'sunquan_e220',
          name: '白衣渡江',
          era: 'e220',
          year: 220,
          blurb: '建安二十四年，吕蒙白衣渡江，陆逊循江而上，公安、江陵皆下，关羽败死，荆州尽归于吴。明年曹操崩、曹丕受禅，孙权称藩纳贡，其后受封吴王。',
          stages: [
            {
              id: 'sunquan_e220_1',
              name: '袭取江陵',
              desc: '吕蒙称病还建业，陆逊代至陆口；白衣渡江，江陵、公安皆下，荆州之门洞开。',
              goal: { cities: ['jiangling'] }
            },
            {
              id: 'sunquan_e220_2',
              name: '夷陵拒蜀',
              desc: '刘备东征至夷陵，陆逊坚守不战，待其疲而火攻；蜀军大败，吴之西境乃安。',
              goal: { turns: 12 }
            },
            {
              id: 'sunquan_e220_3',
              name: '受封吴王',
              desc: '权称藩于魏而受吴王之封，然魏征质子而不至，两国之衅自此始。',
              goal: { turns: 14 }
            },
            {
              id: 'sunquan_e220_4',
              name: '乘丧北伐',
              desc: '魏文帝崩于洛阳，权乘丧北伐，围江夏而不能克；其后魏筑合肥新城，吴人屡攻。',
              goal: { cities: ['jiangxia', 'hefei'] }
            },
            {
              id: 'sunquan_e220_5',
              name: '江东极盛',
              desc: '三分之势既成，而吴蜀之好时离时合；此后无定式，或与蜀连和讨魏，或坐观中原。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'sunquan_e228',
          name: '石亭之战',
          era: 'e228',
          year: 228,
          blurb: '黄武七年，周鲂诈降诱曹休，陆逊大破之于石亭，斩获万余。是年诸葛亮出祁山，魏以关中为急；孙权外结蜀汉，内则久持国本，江东之守始固。',
          stages: [
            {
              id: 'sunquan_e228_1',
              name: '石亭之捷',
              desc: '黄武七年，周鲂诈降诱曹休，陆逊大破之于石亭；魏之扬州兵甲，一时尽丧。',
              goal: { turns: 8 }
            },
            {
              id: 'sunquan_e228_2',
              name: '浮海求夷洲',
              desc: '黄龙二年，遣卫温、诸葛直浮海求夷洲、亶洲，欲俘其民以益户口，士卒多死。',
              goal: { turns: 12 }
            },
            {
              id: 'sunquan_e228_3',
              name: '合肥新城',
              desc: '魏筑合肥新城，权屡攻之而不能拔；欲取汝南以撼许洛，则淮北之势可动。',
              goal: { cities: ['runan'] }
            },
            {
              id: 'sunquan_e228_4',
              name: '四道北伐',
              desc: '赤乌四年，吴四道北伐，朱然围樊城、全琮攻芍陂；襄阳、江陵为荆襄上游。',
              goal: { cities: ['xiangyang', 'jiangling'] }
            },
            {
              id: 'sunquan_e228_5',
              name: '二宫之变',
              desc: '赤乌间太子和与鲁王霸分宫，朝臣结党相攻；此关深根固本，久持而后可图北。',
              goal: { turns: 16, heir: true }
            },
            {
              id: 'sunquan_e228_6',
              name: '江东之极',
              desc: '孙权既老，江东之业已极；此后无定式，北伐之业或在淮南，或在荆襄，全视国本。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    sunxiu: {
      lord: 'sunxiu',
      scenarios: [
        {
          id: 'sunxiu_e255',
          name: '永安复政',
          era: 'e255',
          year: 255,
          blurb: '五凤二年，吴政在孙峻、孙綝之手，幼主孙亮在位。琅邪王孙休处宗室之地而不预权；其后綝废亮立休，休以丁奉、张布之谋诛綝，乃得亲政。',
          stages: [
            {
              id: 'sunxiu_e255_1',
              name: '处宗室之地',
              desc: '孙峻、孙綝相继柄国，幼主之政不出宫门；休为琅邪王，深自韬晦，不以才名自见。',
              goal: { turns: 8 }
            },
            {
              id: 'sunxiu_e255_2',
              name: '待綝之隙',
              desc: '孙峻死而綝代，益加骄横；休居宗室之位，蓄养声望而不交权幸。',
              goal: { turns: 12 }
            },
            {
              id: 'sunxiu_e255_3',
              name: '即位诛綝',
              desc: '太平三年綝废孙亮而立休；休与张布、丁奉谋，诛綝于腊会，遂亲览万机。',
              goal: { turns: 14, strife: 40 }
            },
            {
              id: 'sunxiu_e255_4',
              name: '复立学官',
              desc: '休好读书，欲立五经博士、置学官以教子弟；江东文教，一时复振。',
              goal: { turns: 16 }
            },
            {
              id: 'sunxiu_e255_5',
              name: '北伐淮南',
              desc: '魏有淮南三叛之隙，吴数出濡须、攻合肥；休欲乘之，卒以国小力分而止。',
              goal: { cities: ['hefei', 'shouchun'] }
            },
            {
              id: 'sunxiu_e255_6',
              name: '江东晚照',
              desc: '蜀汉既亡，吴之势孤；此后无定式，或北拒晋师，或内修文教以守江东。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    sunhao: {
      lord: 'sunhao',
      scenarios: [
        {
          id: 'sunhao_e264',
          name: '江东残照',
          era: 'e264',
          year: 264,
          blurb: '元兴元年七月，吴景帝孙休崩，濮阳兴、张布迎立乌程侯孙皓。时蜀汉新亡、交趾携叛，吴人震惧；皓初立发优诏、开仓廪、出宫女，翕然称为明主。',
          stages: [
            {
              id: 'sunhao_e264_1',
              name: '迎立乌程',
              desc: '蜀汉既亡，交趾携叛，吴人震惧而贪长君；濮阳兴、张布迎立乌程侯皓。',
              goal: { turns: 8 }
            },
            {
              id: 'sunhao_e264_2',
              name: '优诏安民',
              desc: '皓初立，发优诏、开仓廪、出宫女以配无妻者；当时翕然，称为明主。',
              goal: { turns: 12 }
            },
            {
              id: 'sunhao_e264_3',
              name: '诛兴与布',
              desc: '皓未几即诛濮阳兴、张布；其后骄暴多忌、好酒色而信巫觋，江东之望渐失。',
              goal: { turns: 14, strife: 40 }
            },
            {
              id: 'sunhao_e264_4',
              name: '西陵之役',
              desc: '凤凰元年，步阐据西陵降晋，陆抗急攻而破之；西陵既全，荆州上游乃安。',
              goal: { turns: 16 }
            },
            {
              id: 'sunhao_e264_5',
              name: '北取江淮',
              desc: '晋既代魏，皓屡遣军北向；寿春、合肥为江淮锁钥，取之则可以固江防。',
              goal: { cities: ['shouchun', 'hefei'] }
            },
            {
              id: 'sunhao_e264_6',
              name: '末路之择',
              desc: '晋之代魏已成，江东之祚将尽；此后无定式，或拒晋师于江上，或终为归命之侯。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    zhangjiao: {
      lord: 'zhangjiao',
      scenarios: [
        {
          id: 'zhangjiao_e184',
          name: '黄巾之乱',
          era: 'e184',
          year: 184,
          blurb: '中平元年二月，三十六方同日并起，皆著黄巾，燔烧官府、劫略聚邑，八州震动。张角自称天公将军，弟宝、梁各领一方；汉发天下精兵，遣卢植、皇甫嵩、朱儁分道讨之。',
          stages: [
            {
              id: 'zhangjiao_e184_1',
              name: '三十六方并起',
              desc: '唐周上书告变，马元义车裂于洛阳；角遂早举，三十六方同日并起，八州响应。',
              goal: { minCities: 7 }
            },
            {
              id: 'zhangjiao_e184_2',
              name: '南阳之众',
              desc: '张曼成起于南阳，众数万，杀太守褚贡，屯宛百余日；黄巾之势，南北相应。',
              goal: { cities: ['xinye', 'fancheng'] }
            },
            {
              id: 'zhangjiao_e184_3',
              name: '长社之围',
              desc: '波才围皇甫嵩于长社，依草结营以困汉军；而嵩将因风纵火，胜负系于一夕。',
              goal: { turns: 12 }
            },
            {
              id: 'zhangjiao_e184_4',
              name: '广宗相持',
              desc: '卢植围广宗而不能克，汉改遣董卓；角据城相持，欲取南皮、信都以固河北。',
              goal: { cities: ['nanpi', 'xindu'] }
            },
            {
              id: 'zhangjiao_e184_5',
              name: '皇甫嵩夜袭',
              desc: '十月，嵩潜夜勒兵，乘疲而破广宗，张梁战死；此关须久持以待河北诸方之援。',
              goal: { turns: 18 }
            },
            {
              id: 'zhangjiao_e184_6',
              name: '苍天已死',
              desc: '黄巾之众散于河北，其教犹行于民间；此后无定式，黄天可立，亦可一朝而烬。',
              goal: { open: true }
            }
          ]
        }
      ]
    }
  };

  root.CAMPAIGNS_PART3 = CAMPAIGNS;
  if (typeof module !== 'undefined' && module.exports) { module.exports = CAMPAIGNS; }
})(typeof window !== 'undefined' ? window : globalThis);
