/* 《代汉涂高》 — 剧本与关卡（分册二：霸府挟令·乱世枭雄）
 * 所收八家之君：caocao、caopi、caorui、simayi、simazhao、dongzhuo、yuanshao、yuanshu。
 * 剧本十六局，关卡八十二关，皆依《三国志》《后汉书》《资治通鉴》编次。
 */
(function (root) {
  'use strict';

  var CAMPAIGNS = {
    caocao: {
      lord: 'caocao',
      scenarios: [
        {
          id: 'caocao_yanzhou',
          name: '兖州之起',
          era: 'e194',
          year: 194,
          blurb: '初平三年，曹操破青州黄巾，收其众三十万，遂有兖州；兴平元年，曹嵩遇害于徐州，操东征报之，而张邈、陈宫迎吕布入兖，郡县皆应。兖州之得失，实系操之存亡。',
          stages: [
            {
              id: 'caocao_yanzhou_1',
              name: '东征徐州',
              desc: '兴平元年，陶谦部曲杀曹嵩于泰山，操引兵东征，破彭城、郯，坑其众于泗水，所过残破。',
              goal: { cities: ['pengcheng', 'tancheng'] }
            },
            {
              id: 'caocao_yanzhou_2',
              name: '濮阳拒布',
              desc: '张邈、陈宫迎吕布入兖，郡县皆应，唯鄄城、东阿、范独守；操与布相拒濮阳百余日，蝗旱粮尽而退。',
              goal: { turns: 10 }
            },
            {
              id: 'caocao_yanzhou_3',
              name: '奉迎天子',
              desc: '建安元年，帝自长安东还，操用荀彧之议，迎帝于洛阳，迁都于许，始行屯田之政。',
              goal: { cities: ['luoyang', 'hongnong'] }
            },
            {
              id: 'caocao_yanzhou_4',
              name: '下邳灭布',
              desc: '建安三年，操围吕布于下邳，决泗、沂之水灌城，布穷而降，遂缢杀之，徐州之众尽入兖豫。',
              goal: { factions: ['xu'] }
            },
            {
              id: 'caocao_yanzhou_5',
              name: '混一之图',
              desc: '兖州已定而四方未平，北有袁绍、南有刘表孙策；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'caocao_guandu',
          name: '官渡之战',
          era: 'e199',
          year: 199,
          blurb: '建安四年，袁绍并幽冀青并四州，简精卒十万、骑万匹，南向以争许；操奉天子都许，兵不满万，分屯官渡、河上以拒之。许都为根本，一失则天下去矣。',
          stages: [
            {
              id: 'caocao_guandu_1',
              name: '许都御袁',
              desc: '建安五年，绍进军黎阳，兵临河上；操以许都为根本，分兵守官渡，敛兵据险以老敌师。',
              goal: { turns: 12 }
            },
            {
              id: 'caocao_guandu_2',
              name: '白马延津',
              desc: '绍遣颜良攻白马，操用荀攸之谋，佯渡延津而袭白马，关羽斩良；文丑复追，殒于延津，遂进窥平原。',
              goal: { cities: ['pingyuan'] }
            },
            {
              id: 'caocao_guandu_3',
              name: '相持官渡',
              desc: '两军相持官渡，绍起土山、为高橹以射营，操作霹雳车、掘长堑应之；粮运屡绝，士卒疲敝。',
              goal: { minCities: 18 }
            },
            {
              id: 'caocao_guandu_4',
              name: '乌巢焚粮',
              desc: '许攸来奔，操夜袭乌巢，尽焚绍之积谷；绍军大溃，降者七万尽坑之，信都、南皮相继而下。',
              goal: { cities: ['xindu', 'nanpi'] }
            },
            {
              id: 'caocao_guandu_5',
              name: '破邺定河北',
              desc: '建安九年破邺，十年斩袁谭于南皮，十一年击乌桓于白狼山，袁氏之业尽矣。',
              goal: { factions: ['yuan'] }
            },
            {
              id: 'caocao_guandu_6',
              name: '南向荆扬',
              desc: '河北已定，操遂有南吞荆扬、西取关陇之志；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'caocao_chibi',
          name: '赤壁之战',
          era: 'e208',
          year: 208,
          blurb: '建安十三年，操平河北、征乌桓、下荆州，率水陆之众临江，与周瑜、程普遇于赤壁，火攻焚舟，北军大疫。天下三分之势，于此发端。',
          stages: [
            {
              id: 'caocao_chibi_1',
              name: '当阳长坂',
              desc: '建安十三年秋，操闻刘表卒，急下荆州；刘备弃新野南走，操以精骑追之，一日一夜行三百余里。',
              goal: { cities: ['xinye'] }
            },
            {
              id: 'caocao_chibi_2',
              name: '赤壁之战',
              desc: '操以水陆之众临江，与周瑜、程普逆战于赤壁，风火俱发，舟船尽焚；欲再举，必先断江东之藩篱。',
              goal: { cities: ['lujiang', 'chaisang'] }
            },
            {
              id: 'caocao_chibi_3',
              name: '唯才是举',
              desc: '建安十五年春，操下令求贤，明言唯才是举，不拘品行门第；是年作铜雀台于邺。',
              goal: { minCities: 56 }
            },
            {
              id: 'caocao_chibi_4',
              name: '潼关渭南',
              desc: '建安十六年，操西征马超、韩遂于潼关、渭南，破之；关西诸郡次第归命，凉州以定。',
              goal: { cities: ['jincheng', 'xiping', 'gudu'] }
            },
            {
              id: 'caocao_chibi_5',
              name: '汉中归魏',
              desc: '建安二十年，操自陈仓出散关，破阳平关，张鲁出降，汉中、巴汉之地尽入于魏。',
              goal: { factions: ['hanzhong'] }
            },
            {
              id: 'caocao_chibi_6',
              name: '混一宇内',
              desc: '江表未宾，巴蜀犹阻，三分之形已见；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'caocao_hanzhong',
          name: '汉中之争',
          era: 'e215',
          year: 215,
          blurb: '建安二十年，操西征张鲁入南郑，汉中降；孙权乘虚围合肥，张辽以八百人破其十万于逍遥津。是年操进爵魏王，魏之社稷渐备。',
          stages: [
            {
              id: 'caocao_hanzhong_1',
              name: '阳平之役',
              desc: '建安二十年三月，操自长安出斜谷至阳平关，张鲁遣弟卫拒守，夜遁而军溃，关遂下。',
              goal: { cities: ['yangping'] }
            },
            {
              id: 'caocao_hanzhong_2',
              name: '汉中归降',
              desc: '操入南郑，张鲁封府库而降，拜镇南将军；汉中既得，蜀人震恐，巴郡亦望风内附。',
              goal: { cities: ['hanzhong'] }
            },
            {
              id: 'caocao_hanzhong_3',
              name: '逍遥津',
              desc: '建安二十年八月，孙权率十万围合肥，张辽以八百人逆击，追蹑于逍遥津，江东人马披靡。',
              goal: { turns: 12 }
            },
            {
              id: 'caocao_hanzhong_4',
              name: '进爵魏王',
              desc: '建安二十一年，操还邺，进爵魏王，设天子旌旗；二十二年立子丕为魏太子，魏制始备。',
              goal: { minCities: 54 }
            },
            {
              id: 'caocao_hanzhong_5',
              name: '襄樊之警',
              desc: '建安二十四年，关羽围樊城，于禁七军没于水；操自长安还，遣徐晃救之，羽终败走。',
              goal: { minCities: 60 }
            },
            {
              id: 'caocao_hanzhong_6',
              name: '天下未一',
              desc: '汉中既失于刘备，襄樊复警于关羽，明年操崩于洛阳；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    caopi: {
      lord: 'caopi',
      scenarios: [
        {
          id: 'caopi_yedu',
          name: '邺都留守',
          era: 'e215',
          year: 215,
          blurb: '建安二十年，曹操西征张鲁、东救合肥，五官中郎将曹丕留邺，督河北诸事；越二年立为魏太子，二十四年平魏讽之谋。魏室之基，实成于邺。',
          stages: [
            {
              id: 'caopi_yedu_1',
              name: '留守邺都',
              desc: '建安二十年，操西征汉中、东救合肥，丕以五官中郎将留守邺城，转输军粮，河北晏然。',
              goal: { turns: 10 }
            },
            {
              id: 'caopi_yedu_2',
              name: '立为太子',
              desc: '建安二十二年，操以丕为魏太子；丕与临菑侯植争位累年，终以谨厚自持、结贾诩而得之。',
              goal: { minCities: 52 }
            },
            {
              id: 'caopi_yedu_3',
              name: '魏讽之变',
              desc: '建安二十四年九月，钟繇西曹掾魏讽谋袭邺，丕觉而诛之，连坐者数千人，邺下震悚。',
              goal: { turns: 12, strife: 40 }
            },
            {
              id: 'caopi_yedu_4',
              name: '魏业之初',
              desc: '建安二十五年正月，操崩于洛阳，丕自邺赴洛嗣位；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'caopi_shanrang',
          name: '受禅代汉',
          era: 'e220',
          year: 220,
          blurb: '建安二十五年正月，曹操崩于洛阳，曹丕嗣位魏王；十月受禅于繁阳，改元黄初，是为魏文帝。乃立九品官人之法，定都洛阳。',
          stages: [
            {
              id: 'caopi_shanrang_1',
              name: '嗣位魏王',
              desc: '建安二十五年正月，操崩于洛阳，丕自邺至洛嗣魏王位，改建安二十五年为延康元年。',
              goal: { turns: 10 }
            },
            {
              id: 'caopi_shanrang_2',
              name: '繁阳受禅',
              desc: '是年十月，汉帝册诏禅位，丕于繁阳设坛受禅，改元黄初；十一月，定都洛阳。',
              goal: { minCities: 60 }
            },
            {
              id: 'caopi_shanrang_3',
              name: '九品中正',
              desc: '黄初元年，纳尚书陈群之议，立九品官人之法，州郡皆置中正，品第人物以为选格。',
              goal: { minCities: 64, legit: 70 }
            },
            {
              id: 'caopi_shanrang_4',
              name: '三路伐吴',
              desc: '黄初三年，帝三路伐吴：曹真围江陵、曹休出洞口、曹仁向濡须，皆无功而退，淮南终为重镇。',
              goal: { cities: ['lujiang', 'chaisang', 'poyang', 'yuzhang'] }
            },
            {
              id: 'caopi_shanrang_5',
              name: '一统未期',
              desc: '黄初七年五月，帝崩于洛阳，太子叡即位；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    caorui: {
      lord: 'caorui',
      scenarios: [
        {
          id: 'caorui_donggong',
          name: '东宫之立',
          era: 'e220',
          year: 220,
          blurb: '黄初元年，魏受汉禅，封皇子叡为武德侯；二年进齐公，三年徙平原王，以母甄氏赐死之故，久不建嗣。七年五月，帝病笃，乃立为皇太子。',
          stages: [
            {
              id: 'caorui_donggong_1',
              name: '武德封侯',
              desc: '黄初元年十一月，魏受禅于汉，封皇子叡为武德侯；叡，甄氏所出，时方十六，居洛阳。',
              goal: { turns: 10 }
            },
            {
              id: 'caorui_donggong_2',
              name: '齐公之封',
              desc: '黄初二年，甄夫人赐死，叡进爵齐公，以郭后为母；三年徙为平原王，恭谨事上，储位遂安。',
              goal: { minCities: 60 }
            },
            {
              id: 'caorui_donggong_3',
              name: '立为太子',
              desc: '黄初七年五月，帝病笃，立叡为皇太子；丁巳即位，改元太和，时年二十有二。',
              goal: { minCities: 64 }
            },
            {
              id: 'caorui_donggong_4',
              name: '边患之始',
              desc: '明帝既立，诸葛亮出祁山、孙权争淮南，魏之患皆在边；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'caorui_mingdi',
          name: '明帝之世',
          era: 'e228',
          year: 228,
          blurb: '太和二年，诸葛亮出祁山、三郡响应，而张郃破马谡于街亭；陆逊又大破曹休于石亭。曹叡总揽威柄，外拒蜀吴、内修法度，终平辽东公孙氏。',
          stages: [
            {
              id: 'caorui_mingdi_1',
              name: '街亭拒亮',
              desc: '太和二年，诸葛亮出祁山，天水、南安、安定三郡响应；帝遣张郃逆击，大破马谡于街亭，亮退汉中。',
              goal: { turns: 10 }
            },
            {
              id: 'caorui_mingdi_2',
              name: '石亭之役',
              desc: '是年八月，陆逊大破曹休于石亭，休发病而卒；帝不深责，恤其家，因修淮南之备。',
              goal: { minCities: 54 }
            },
            {
              id: 'caorui_mingdi_3',
              name: '五丈原',
              desc: '青龙二年，诸葛亮屯五丈原，帝命司马懿坚壁拒之；亮卒军中，蜀军退，关中得安，乃图汉中。',
              goal: { cities: ['yangping', 'hanzhong'] }
            },
            {
              id: 'caorui_mingdi_4',
              name: '平定辽东',
              desc: '景初二年，帝遣司马懿击公孙渊，破襄平，斩渊父子；辽东、带方、乐浪诸郡皆平。',
              goal: { factions: ['liaodong'] }
            },
            {
              id: 'caorui_mingdi_5',
              name: '混一之志',
              desc: '景初三年正月，帝崩于洛阳，齐王芳嗣位；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    simayi: {
      lord: 'simayi',
      scenarios: [
        {
          id: 'simayi_dudu',
          name: '都督荆豫',
          era: 'e228',
          year: 228,
          blurb: '建兴六年，司马懿自荆州都督任上镇宛，督诸军拒诸葛亮；八日行千二百里斩孟达于上庸，后拒亮于卤城、五丈原。魏之栋梁，而腹心之疾亦在此人。',
          stages: [
            {
              id: 'simayi_dudu_1',
              name: '新城擒达',
              desc: '太和二年正月，孟达谋以新城叛，懿不待诏而行，自宛八日行千二百里，出其不意，斩达于上庸。',
              goal: { turns: 10 }
            },
            {
              id: 'simayi_dudu_2',
              name: '卤城拒亮',
              desc: '太和五年，诸葛亮攻祁山，懿自宛赴关中，据上邽、卤城与亮相持，敛兵不战，蜀军粮尽而退。',
              goal: { minCities: 12 }
            },
            {
              id: 'simayi_dudu_3',
              name: '五丈原',
              desc: '青龙二年，亮屯五丈原，懿坚壁不与战，亮卒而蜀军退；懿遂督雍凉，威望日盛。',
              goal: { cities: ['yangping', 'hanzhong'] }
            },
            {
              id: 'simayi_dudu_4',
              name: '平定辽东',
              desc: '景初二年，懿率四万众出塞击公孙渊，围襄平，斩渊父子；辽东、带方、乐浪皆入于魏。',
              goal: { factions: ['liaodong'] }
            },
            {
              id: 'simayi_dudu_5',
              name: '高平陵之变',
              desc: '正始十年正月，帝谒高平陵，懿称疾闭城，奏诛曹爽兄弟及其党，夷三族，魏政尽归司马。',
              goal: { cities: ['luoyang'], heir: true }
            },
            {
              id: 'simayi_dudu_6',
              name: '代魏之基',
              desc: '嘉平三年，懿讨王凌于寿春；魏之社稷已移于司马，此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    simazhao: {
      lord: 'simazhao',
      scenarios: [
        {
          id: 'simazhao_huainan',
          name: '司马昭之心',
          era: 'e255',
          year: 255,
          blurb: '正元二年，司马师卒于许昌，昭自洛阳往赴，遂继掌魏政；毌丘俭、文钦举兵淮南，诸葛诞继之，三叛相踵。昭之心，路人所知也。',
          stages: [
            {
              id: 'simazhao_huainan_1',
              name: '毌丘俭之叛',
              desc: '正元二年正月，毌丘俭、文钦矫太后诏举兵寿春；司马师舆疾东征，破文钦于乐嘉，俭走死。',
              goal: { turns: 10 }
            },
            {
              id: 'simazhao_huainan_2',
              name: '诸葛诞之叛',
              desc: '甘露二年四月，诸葛诞据寿春反，聚淮南屯田男女十余万口入城，并遣子入质于吴以求救。',
              goal: { cities: ['shouchun'] }
            },
            {
              id: 'simazhao_huainan_3',
              name: '寿春之破',
              desc: '甘露三年二月，昭四面攻寿春，克之，斩诸葛诞，夷其三族；吴之救兵皆引退。',
              goal: { minCities: 50 }
            },
            {
              id: 'simazhao_huainan_4',
              name: '高贵乡公',
              desc: '甘露五年五月，帝率僮仆讨昭，贾充使成济弑之于南阙下；昭乃立常道乡公，改元景元。',
              goal: { turns: 12 }
            },
            {
              id: 'simazhao_huainan_5',
              name: '伐蜀之役',
              desc: '景元四年，昭遣钟会、邓艾、诸葛绪三道伐蜀；邓艾自阴平入，刘禅出降，蜀汉遂亡。',
              goal: { factions: ['shu'] }
            },
            {
              id: 'simazhao_huainan_6',
              name: '代魏之势',
              desc: '咸熙元年五月，昭进爵晋王，加九锡；魏祚已移，此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'simazhao_jinwang',
          name: '进爵晋王',
          era: 'e264',
          year: 264,
          blurb: '蜀汉既亡于前一年之冬，益州尽入司马氏；魏咸熙元年五月，司马昭进爵晋王。吴主孙休是年七月崩，群臣迎立乌程侯孙皓。',
          stages: [
            {
              id: 'simazhao_jinwang_1',
              name: '钟会之乱',
              desc: '咸熙元年正月，钟会至成都，诬邓艾谋反，遂与姜维谋据蜀；魏军杀会及维，蜀地乃定。',
              goal: { turns: 10 }
            },
            {
              id: 'simazhao_jinwang_2',
              name: '晋王受册',
              desc: '是年五月，昭进爵晋王，封十郡，加九锡；七月，定晋之官属，代魏之势愈明。',
              goal: { minCities: 76 }
            },
            {
              id: 'simazhao_jinwang_3',
              name: '淮南之定',
              desc: '蜀既亡，魏之寿春、合肥、上庸犹持两端；晋王以诏书抚之，江淮州郡皆入于晋。',
              goal: { cities: ['shouchun', 'hefei', 'shangyong'] }
            },
            {
              id: 'simazhao_jinwang_4',
              name: '图取江东',
              desc: '是年七月，吴主孙休崩，群臣迎立乌程侯皓，江东新易其主；昭以晋王之重，志在混一寰宇。',
              goal: { factions: ['wu'] }
            },
            {
              id: 'simazhao_jinwang_5',
              name: '混一之业',
              desc: '咸熙二年八月，昭崩，子炎嗣晋王，冬受魏禅；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    dongzhuo: {
      lord: 'dongzhuo',
      scenarios: [
        {
          id: 'dongzhuo_ruoluo',
          name: '入洛专政',
          era: 'e189',
          year: 189,
          blurb: '中平六年，灵帝崩，何进召外兵诛宦官而自毙；董卓率凉州兵入洛阳，并何进部曲、诱吕布杀丁原，遂废少帝、立陈留王，专断朝政。',
          stages: [
            {
              id: 'dongzhuo_ruoluo_1',
              name: '入洛废立',
              desc: '中平六年八月，卓入洛阳，并何进、何苗之众，诱吕布杀丁原而并其兵，遂废少帝、立陈留王。',
              goal: { turns: 10 }
            },
            {
              id: 'dongzhuo_ruoluo_2',
              name: '汴水之捷',
              desc: '初平元年，关东州郡起兵讨卓，推袁绍为盟主；卓遣徐荣拒之，大破曹操于荥阳汴水，操中矢而走。',
              goal: { cities: ['chenliu', 'puyang'] }
            },
            {
              id: 'dongzhuo_ruoluo_3',
              name: '阳人拒坚',
              desc: '卓遣胡轸、吕布攻孙坚于阳人，将帅不和而败；坚遂入洛阳，扫除汉陵，卓以是不复东出。',
              goal: { turns: 12 }
            },
            {
              id: 'dongzhuo_ruoluo_4',
              name: '郿坞积谷',
              desc: '卓还长安，筑郿坞，积谷三十年，自云事成雄据天下，不成守此足以毕老；关西郡县皆慑服。',
              goal: { minCities: 24 }
            },
            {
              id: 'dongzhuo_ruoluo_5',
              name: '凉兵之盛',
              desc: '初平三年四月，王允、吕布诛卓于未央殿；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    yuanshao: {
      lord: 'yuanshao',
      scenarios: [
        {
          id: 'yuanshao_mengzhu',
          name: '关东盟主',
          era: 'e189',
          year: 189,
          blurb: '中平六年，袁绍为司隶校尉，勒兵尽诛宦官；董卓欲废立，绍横刀相抗而出奔冀州。初平元年，关东州郡起兵讨卓，共推绍为盟主，河北之业自此始。',
          stages: [
            {
              id: 'yuanshao_mengzhu_1',
              name: '洛阳诛宦',
              desc: '中平六年，何进谋诛宦官而见杀；绍勒兵闭北宫门，尽捕宦者诛之，死者二千余人。',
              goal: { turns: 10 }
            },
            {
              id: 'yuanshao_mengzhu_2',
              name: '渤海起兵',
              desc: '初平元年，绍自渤海起兵，关东州郡共推为盟主，屯河内以逼洛阳；卓焚宫室而西迁。',
              goal: { cities: ['luoyang'] }
            },
            {
              id: 'yuanshao_mengzhu_3',
              name: '界桥破瓒',
              desc: '初平三年，绍与公孙瓒战于界桥，麹义以强弩破其白马义从；瓒退保幽州，绍遂略取涿郡、蓟。',
              goal: { cities: ['zhuojun', 'ji'] }
            },
            {
              id: 'yuanshao_mengzhu_4',
              name: '易京之围',
              desc: '建安四年，绍围易京，穿堑逼之，公孙瓒自焚死；幽州尽入于绍，遂兼青幽并冀四州。',
              goal: { cities: ['yuyang', 'youbeiping', 'shanggu', 'daijun', 'liaoxi'] }
            },
            {
              id: 'yuanshao_mengzhu_5',
              name: '南向争衡',
              desc: '四州既定，绍简精卒十万、骑万匹，将以攻许；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'yuanshao_sizhou',
          name: '并兼四州',
          era: 'e194',
          year: 194,
          blurb: '初平元年绍为关东盟主，未战而诸侯解体；后取冀州于韩馥，破公孙瓒于界桥，遂据幽冀并三州之众。兴平元年，曹操争兖州、袁术夺南阳。',
          stages: [
            {
              id: 'yuanshao_sizhou_1',
              name: '青州之定',
              desc: '兴平元年，绍遣长子谭为青州刺史，东击田楷，略定临淄、东莱，青州之众渐附。',
              goal: { cities: ['linzi', 'donglai'] }
            },
            {
              id: 'yuanshao_sizhou_2',
              name: '龙凑相拒',
              desc: '绍与公孙瓒相攻于龙凑、鲍丘，连岁不解；瓒兵屡挫，退保易京，不敢复出。',
              goal: { turns: 12 }
            },
            {
              id: 'yuanshao_sizhou_3',
              name: '迎驾之议',
              desc: '建安元年，帝自长安东还，沮授劝绍迎大驾以令诸侯，绍不听；曹操迎帝都许，绍由是失天下之望。',
              goal: { cities: ['luoyang', 'hongnong'] }
            },
            {
              id: 'yuanshao_sizhou_4',
              name: '易京灭瓒',
              desc: '建安四年，绍穿堑围易京，公孙瓒自焚死，幽州遂尽入于绍；四州之众，甲兵十万。',
              goal: { minCities: 24 }
            },
            {
              id: 'yuanshao_sizhou_5',
              name: '南向争许',
              desc: '河北既定，绍简精卒十万、骑万匹，南向以争许；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'yuanshao_guandu',
          name: '官渡之役',
          era: 'e199',
          year: 199,
          blurb: '建安四年，袁绍并幽冀青并四州，简精卒十万、骑万匹，南向以争许；曹操奉天子都许，兵不满万。四世三公之望，与奉天子之令，决于此役。',
          stages: [
            {
              id: 'yuanshao_guandu_1',
              name: '黎阳渡河',
              desc: '建安五年二月，绍进军黎阳，遣颜良攻白马；操救白马，关羽斩良，绍渡河追之，文丑又殁于延津。',
              goal: { cities: ['puyang', 'juancheng'] }
            },
            {
              id: 'yuanshao_guandu_2',
              name: '官渡相持',
              desc: '绍依沙塠为屯，东西数十里，起土山、为高橹以射操营；操作霹雳车、掘长堑拒之，相持半年。',
              goal: { minCities: 24 }
            },
            {
              id: 'yuanshao_guandu_3',
              name: '乌巢之失',
              desc: '许攸奔操，操夜袭乌巢，尽焚绍之积谷；张郃、高览降操，绍军大溃，河北震恐。',
              goal: { turns: 14 }
            },
            {
              id: 'yuanshao_guandu_4',
              name: '仓亭再却',
              desc: '建安六年，操击绍于仓亭，绍军复败；绍收余众还邺，志在再图许都，未几发病。',
              goal: { cities: ['xuchang', 'qiao'] }
            },
            {
              id: 'yuanshao_guandu_5',
              name: '河朔自强',
              desc: '建安七年，绍发病卒于邺，子谭、尚争立，河北自此多故；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    yuanshu: {
      lord: 'yuanshu',
      scenarios: [
        {
          id: 'yuanshu_zhongjia',
          name: '僭号仲家',
          era: 'e194',
          year: 194,
          blurb: '袁绍之从弟。初平元年与绍同时举兵而兄弟交恶；后据南阳，夺孙坚所获传国玺，兴平元年扬州之众皆附，遂有僭号之志。',
          stages: [
            {
              id: 'yuanshu_zhongjia_1',
              name: '庐江之役',
              desc: '兴平元年，术自南阳东出，据寿春；遣孙策攻庐江太守陆康，岁余破之，江淮之间皆震。',
              goal: { cities: ['lujiang'] }
            },
            {
              id: 'yuanshu_zhongjia_2',
              name: '僭号仲家',
              desc: '建安二年，术以河内张炯符命，自称天子于寿春，号仲家，置百官、郊祀天地；孙策、吕布皆绝之。',
              goal: { minCities: 18 }
            },
            {
              id: 'yuanshu_zhongjia_3',
              name: '江亭之穷',
              desc: '建安二年操东征，术渡淮而走；四年，术焚宫室、归帝号于绍，欲北就袁谭，道病呕血而死。',
              goal: { turns: 14 }
            },
            {
              id: 'yuanshu_zhongjia_4',
              name: '仲家之续',
              desc: '术既死，其部曲多归孙策、刘勋，淮南遂为江东所有；此后无定式，唯君所之。',
              goal: { open: true }
            }
          ]
        }
      ]
    }
  };

  root.CAMPAIGNS_PART2 = CAMPAIGNS;
  if (typeof module !== 'undefined' && module.exports) { module.exports = CAMPAIGNS; }
})(typeof window !== 'undefined' ? window : globalThis);
