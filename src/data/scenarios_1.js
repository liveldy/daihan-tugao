/* 《代汉涂高》 — 剧本与关卡（分册一：匡鼎炎汉）
 * 六家之君：刘协、刘备、刘禅、刘焉、刘璋、刘表。
 * 共 14 局、59 关，皆依《三国志》《后汉书》《资治通鉴》所载战事与时间编次。
 */
(function (root) {
  'use strict';

  var CAMPAIGNS = {
    xian: {
      lord: 'xian',
      scenarios: [
        {
          id: 'xian_e189',
          name: '董卓入京',
          era: 'e189',
          year: 189,
          blurb: '中平六年，灵帝崩，何进召外兵入洛而自毙，董卓废少帝而立协。关东州郡同时举义，天下响应，而凉州兵已据洛阳、长安；汉室之名分，犹足以号召诸侯。',
          stages: [
            {
              id: 'xian_e189_1',
              name: '酸枣会盟',
              desc: '初平元年，关东州郡起兵讨卓，盟于酸枣；先取洛阳，以断凉州兵东下之路。',
              goal: { cities: ['luoyang'] }
            },
            {
              id: 'xian_e189_2',
              name: '董卓西迁',
              desc: '卓焚洛阳宫室，胁车驾西迁长安；当复弘农、潼关，以通司隶旧壤而收关东之众心。',
              goal: { cities: ['hongnong', 'tongguan'] }
            },
            {
              id: 'xian_e189_3',
              name: '入关定乱',
              desc: '卓为王允、吕布所诛，李傕郭汜复攻长安，关中大乱；宜入取三辅、陈仓，以定西土。',
              goal: { cities: ['changan', 'chencang'] }
            },
            {
              id: 'xian_e189_4',
              name: '凉州之定',
              desc: '傕、汜之众据三辅、陇右，反覆无常；非尽灭凉州之兵，则汉道不宁，天子不安。',
              goal: { factions: ['dong'] }
            },
            {
              id: 'xian_e189_5',
              name: '汉祚之兴',
              desc: '讨卓之役既竟，此后无定式：或定河北，或收江东，皆视天子之威与兵甲之利。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'xian_e194',
          name: '长安板荡',
          era: 'e194',
          year: 194,
          blurb: '兴平元年，车驾在长安，李傕、郭汜相攻于城中，关中大饥，人相食。天子所恃者，唯汉室四百年之名分；而山东诸侯，方各据州郡以自雄。',
          stages: [
            {
              id: 'xian_e194_1',
              name: '兴平之饥',
              desc: '兴平元年，关中大饥，人相食，凉州兵夺四方贡赋；当守长安、抚三辅，以度荒年。',
              goal: { turns: 10 }
            },
            {
              id: 'xian_e194_2',
              name: '李郭相攻',
              desc: '傕、汜交兵于长安，关东无备；宜收潼关、陈仓，以通东道而收凉州之众。',
              goal: { cities: ['tongguan', 'chencang'] }
            },
            {
              id: 'xian_e194_3',
              name: '奉迎之议',
              desc: '建安元年，曹操迎天子都许；汉室当自取豫州之许、谯，勿使权臣挟令以为己资。',
              goal: { cities: ['xuchang', 'qiao'] }
            },
            {
              id: 'xian_e194_4',
              name: '天下未定',
              desc: '车驾既出，此后无定式：或亲总万机，或坐视鼎移，皆在玩家自为之。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    liubei: {
      lord: 'liubei',
      scenarios: [
        {
          id: 'liubei_e208',
          name: '新野之寄',
          era: 'e208',
          year: 208,
          blurb: '建安十三年，曹操已平河北、征乌桓，率众南下荆州。刘备屯新野一县，兵不满万；刘表方卒，荆州摇动，孙刘之盟未成——此汉室宗亲最后之隙地。',
          stages: [
            {
              id: 'liubei_e208_1',
              name: '新野拒守',
              desc: '建安十三年秋，曹操南征，先取新野以迫襄阳；宜坚守一县，以观荆州之变。',
              goal: { turns: 9 }
            },
            {
              id: 'liubei_e208_2',
              name: '南收四郡',
              desc: '赤壁既捷，刘备南征，武陵、长沙、桂阳、零陵四郡皆降；荆南之地，宜尽收之。',
              goal: { cities: ['wuling', 'changsha', 'lingling', 'guiyang'] }
            },
            {
              id: 'liubei_e208_3',
              name: '借取南郡',
              desc: '周瑜取江陵，刘备表借荆州，而襄阳尚在曹操之手；当图南郡、襄阳，以通巴蜀之径。',
              goal: { cities: ['jiangling', 'xiangyang'] }
            },
            {
              id: 'liubei_e208_4',
              name: '跨有荆益',
              desc: '隆中之策，跨有荆益；荆南既下，当西图巴蜀，灭刘璋而取其土，以成鼎足之基。',
              goal: { factions: ['yi'] }
            },
            {
              id: 'liubei_e208_5',
              name: '鼎足之势',
              desc: '三分之形既立，此后无定式：或出汉中，或下江东，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'liubei_e215',
          name: '汉中王业',
          era: 'e215',
          year: 215,
          blurb: '建安二十年，刘备已得益州，与孙权争荆州三郡，以湘水为界；曹操西入汉中，降张鲁。天下之势各定其界，而汉中、襄樊之役，遂开季汉之基。',
          stages: [
            {
              id: 'liubei_e215_1',
              name: '湘水之盟',
              desc: '建安二十年，孙权争荆州三郡，孙刘以湘水为界；若复取长沙、桂阳、江夏，则江汉之势在我。',
              goal: { cities: ['changsha', 'guiyang', 'jiangxia'] }
            },
            {
              id: 'liubei_e215_2',
              name: '定军斩将',
              desc: '建安二十四年，黄忠斩夏侯渊于定军山，曹操引兵而退；当取南郑、阳平，并收上庸，以固巴蜀门户。',
              goal: { cities: ['hanzhong', 'yangping', 'shangyong'] }
            },
            {
              id: 'liubei_e215_3',
              name: '襄樊之役',
              desc: '建安二十四年，关羽攻襄樊，降于禁、斩庞德，威震华夏；宜据荆益二十城以拔襄阳、樊城。',
              goal: { cities: ['xiangyang', 'fancheng'], minCities: 20 }
            },
            {
              id: 'liubei_e215_4',
              name: '天下三分',
              desc: '汉中王业既成，此后无定式：或北伐中原，或东和孙氏，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'liubei_e220',
          name: '昭烈称帝',
          era: 'e220',
          year: 220,
          blurb: '延康元年，曹丕受禅于繁阳，汉祚中绝；次年刘备即帝位于成都，国号曰汉。关羽既没，荆州尽失，蜀汉以一隅之土，当两敌之众。',
          stages: [
            {
              id: 'liubei_e220_1',
              name: '汉祚之继',
              desc: '延康元年，曹丕受禅，汉祚中绝；先主宜正位号于成都，以系天下思汉之心。',
              goal: { turns: 12 }
            },
            {
              id: 'liubei_e220_2',
              name: '夷陵之役',
              desc: '章武元年，先主以复荆州、报关羽之雠伐吴，军次夷陵；宜取南郡、武陵，以复荆州之半。',
              goal: { cities: ['jiangling', 'wuling'] }
            },
            {
              id: 'liubei_e220_3',
              name: '出师关中',
              desc: '蜀汉以益州一隅抗中原之众，非出关陇无以制胜；宜取上庸、武都、长安，以通三辅之路。',
              goal: { cities: ['shangyong', 'wudu', 'changan'] }
            },
            {
              id: 'liubei_e220_4',
              name: '北定中原',
              desc: '帝业既立，此后无定式：或东下江陵，或北定关中，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    liushan: {
      lord: 'liushan',
      scenarios: [
        {
          id: 'liushan_e228',
          name: '出师北伐',
          era: 'e228',
          year: 228,
          blurb: '建兴六年，诸葛亮出祁山，天水、南安、安定三郡叛魏响应，而马谡败于街亭，功遂不成。后主在成都，政无巨细咸决于丞相，蜀汉之兴衰系于北伐。',
          stages: [
            {
              id: 'liushan_e228_1',
              name: '三郡响应',
              desc: '建兴六年春，丞相出祁山，天水、南安、安定叛魏应之；宜急取天水、安定，以固陇右之望。',
              goal: { cities: ['tianshui', 'anding'] }
            },
            {
              id: 'liushan_e228_2',
              name: '街亭之守',
              desc: '马谡违亮节度而败于街亭，陇右之功遂弃；若据街亭之险，则陇右可全。',
              goal: { cities: ['jieting'] }
            },
            {
              id: 'liushan_e228_3',
              name: '围攻陈仓',
              desc: '建兴六年冬，亮出散关、围陈仓，郝昭拒守不能拔；若能克之，则关中震动。',
              goal: { cities: ['chencang'] }
            },
            {
              id: 'liushan_e228_4',
              name: '五丈原上',
              desc: '建兴十二年，丞相屯五丈原，与司马懿相持渭南；宜破之而取长安、潼关，以撼关中。',
              goal: { cities: ['changan', 'tongguan'] }
            },
            {
              id: 'liushan_e228_5',
              name: '兴复汉室',
              desc: '北伐既久，此后无定式：或尽取凉州，或直取长安，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'liushan_e255',
          name: '姜维北伐',
          era: 'e255',
          year: 255,
          blurb: '延熙十八年，姜维出陇西，大破魏雍州刺史王经于洮西，斩获数万；而蜀中费祎已没，朝议纷然。魏有淮南三叛，司马氏方专国柄，天下成败未可知。',
          stages: [
            {
              id: 'liushan_e255_1',
              name: '洮西之捷',
              desc: '延熙十八年，姜维出狄道，破王经于洮西，魏人死者数万；当乘胜取陇西、天水，以摇凉州。',
              goal: { cities: ['longxi', 'tianshui'] }
            },
            {
              id: 'liushan_e255_2',
              name: '骆谷之出',
              desc: '延熙二十年，姜维出骆谷，军于长城，魏人拒守；宜取陈仓、街亭，以撼关中。',
              goal: { cities: ['chencang', 'jieting'] }
            },
            {
              id: 'liushan_e255_3',
              name: '剑阁拒守',
              desc: '炎兴元年，钟会、邓艾举众伐蜀，姜维退保剑阁；拒之逾年，则蜀祚可以少延。',
              goal: { turns: 16 }
            },
            {
              id: 'liushan_e255_4',
              name: '蜀汉之祚',
              desc: '剑阁之外，此后无定式：或北伐以兴汉，或守险以图存，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    liuyan: {
      lord: 'liuyan',
      scenarios: [
        {
          id: 'liuyan_e189',
          name: '废史立牧',
          era: 'e189',
          year: 189,
          blurb: '中平五年，刘焉建言「废史立牧」，以重臣镇四方；朝廷用其议，而州牧遂拥兵自专。中平六年，刘焉领益州牧，治绵竹，巴蜀独安于天下大乱之外。',
          stages: [
            {
              id: 'liuyan_e189_1',
              name: '遣鲁据汉',
              desc: '刘焉遣张鲁、张修断斜谷，杀汉中太守苏固，遂据汉川；取南郑、阳平，则益州门户固矣。',
              goal: { cities: ['hanzhong', 'yangping'] }
            },
            {
              id: 'liuyan_e189_2',
              name: '东州之兵',
              desc: '南阳、三辅流民入蜀者数万家，刘焉收为「东州兵」；养之训之，以制本地豪强、拒朝廷之命。',
              goal: { turns: 12 }
            },
            {
              id: 'liuyan_e189_3',
              name: '长平观兵',
              desc: '兴平元年，马腾与刘焉子刘范谋诛李傕，屯长平观；益州北出陈仓、武都，可与凉州共困长安。',
              goal: { cities: ['chencang', 'wudu'] }
            },
            {
              id: 'liuyan_e189_4',
              name: '据蜀观变',
              desc: '益州既安，此后无定式：或北伐关中，或南抚南中，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    liuzhang: {
      lord: 'liuzhang',
      scenarios: [
        {
          id: 'liuzhang_e194',
          name: '益州易主',
          era: 'e194',
          year: 194,
          blurb: '兴平元年，刘焉卒，赵韪等以刘璋温仁可制，共立为益州牧。张鲁稍骄恣，不承顺璋，璋杀其母及弟，遂为雠敌；巴蜀虽安，而人心已散。',
          stages: [
            {
              id: 'liuzhang_e194_1',
              name: '继立益州',
              desc: '兴平元年，刘焉卒，赵韪等共立刘璋；新主初立，当抚东州之兵、安巴蜀之众。',
              goal: { turns: 10 }
            },
            {
              id: 'liuzhang_e194_2',
              name: '张鲁反目',
              desc: '张鲁骄恣，不承顺璋，璋杀其母及弟，遂为雠敌；宜取南郑、阳平，以正汉川之名。',
              goal: { cities: ['hanzhong', 'yangping'] }
            },
            {
              id: 'liuzhang_e194_3',
              name: '汉川之定',
              desc: '益州与汉川为仇者二十年，庞羲屡攻汉川不能克；尽灭张鲁之众，则剑阁以北无患。',
              goal: { factions: ['hanzhong'] }
            },
            {
              id: 'liuzhang_e194_4',
              name: '保境安民',
              desc: '巴蜀既安，此后无定式：或北拒汉川，或东和荆襄，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'liuzhang_e199',
          name: '赵韪之乱',
          era: 'e199',
          year: 199,
          blurb: '建安五年，赵韪因益州人心怨璋而举兵，蜀郡、广汉、犍为皆应，赖东州兵死战乃定。是时曹操与袁绍相持官渡，中原鼎沸，而益州闭关自守。',
          stages: [
            {
              id: 'liuzhang_e199_1',
              name: '赵韪之乱',
              desc: '建安五年，赵韪举兵东州，蜀郡、广汉、犍为并应；赖东州兵死战，逾年而乱定。',
              goal: { turns: 12 }
            },
            {
              id: 'liuzhang_e199_2',
              name: '汉川相攻',
              desc: '张鲁据汉川，屡为益州边患；宜取南郑、阳平，以复汉中之旧壤而固北境。',
              goal: { cities: ['hanzhong', 'yangping'] }
            },
            {
              id: 'liuzhang_e199_3',
              name: '荆益之争',
              desc: '益州叛将沈弥、娄发、甘宁等奔于荆州，刘表纳之；宜取江陵、武陵，以固巴楚之交。',
              goal: { cities: ['jiangling', 'wuling'] }
            },
            {
              id: 'liuzhang_e199_4',
              name: '巴蜀自重',
              desc: '内乱既平，此后无定式：或北伐以争汉川，或东守以全巴蜀，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'liuzhang_e208',
          name: '引狼入室',
          era: 'e208',
          year: 208,
          blurb: '建安十三年，曹操既平荆州，刘璋遣阴溥致敬，受振威将军之号。张松入许而不为曹操所礼，归而劝璋结刘备；北有张鲁、曹操之逼，益州之祸自此始。',
          stages: [
            {
              id: 'liuzhang_e208_1',
              name: '致敬许都',
              desc: '建安十三年，刘璋遣阴溥致敬于曹操，受振威将军；宜先安益州之本，以观中原之变。',
              goal: { turns: 12 }
            },
            {
              id: 'liuzhang_e208_2',
              name: '北塞汉川',
              desc: '曹操遣钟繇向汉中，张鲁惧而益州亦惧；宜先取南郑、阳平，以塞北门而绝外患。',
              goal: { cities: ['hanzhong', 'yangping'] }
            },
            {
              id: 'liuzhang_e208_3',
              name: '雒城拒守',
              desc: '建安十八年，刘备还兵攻璋，涪城、绵竹相继而降，雒城被围几一年；拒之逾年，蜀事未可知。',
              goal: { turns: 18 }
            },
            {
              id: 'liuzhang_e208_4',
              name: '益州之归',
              desc: '客军既入，此后无定式：或逐备以自守，或因之以外拒曹操，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        }
      ]
    },
    liubiao: {
      lord: 'liubiao',
      scenarios: [
        {
          id: 'liubiao_e189',
          name: '单骑定荆州',
          era: 'e189',
          year: 189,
          blurb: '初平元年，刘表单骑入宜城，说蒯良、蒯越、蔡瑁而定荆州，诱斩宗贼五十余人，遂据襄阳。带甲十余万，爱民养士，学者归之，而北有袁术、南有孙坚之逼。',
          stages: [
            {
              id: 'liubiao_e189_1',
              name: '长沙之争',
              desc: '孙坚以长沙起兵，附于袁术，屡为荆州之患；宜取长沙，以全荆南之境。',
              goal: { cities: ['changsha'] }
            },
            {
              id: 'liubiao_e189_2',
              name: '岘山之守',
              desc: '初平二年，孙坚围襄阳，黄祖射之于岘山；当坚守江汉，断袁术粮道，以待其敝。',
              goal: { turns: 12 }
            },
            {
              id: 'liubiao_e189_3',
              name: '交州之遣',
              desc: '刘表遣赖恭刺交州、吴巨守苍梧，交州诸郡稍受荆州之命；宜取苍梧、南海，以通交广之利。',
              goal: { cities: ['cangwu', 'nanhai'] }
            },
            {
              id: 'liubiao_e189_4',
              name: '江汉之业',
              desc: '荆土既定，此后无定式：或北向中原，或西图巴蜀，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'liubiao_e194',
          name: '纳绣据宛',
          era: 'e194',
          year: 194,
          blurb: '兴平元年，刘表以镇南将军领荆州牧，据江汉九郡。袁术方据南阳而东走九江，张济自关中攻穰中矢而死，其众归张绣；刘表纳之，使为江汉北藩。',
          stages: [
            {
              id: 'liubiao_e194_1',
              name: '穰城之纳',
              desc: '张济攻穰中矢而死，张绣领其众；刘表纳之，使屯宛以御曹操。宜取宛城，使南阳为江汉北藩。',
              goal: { cities: ['wan'] }
            },
            {
              id: 'liubiao_e194_2',
              name: '叶县之拒',
              desc: '建安二、三年，曹操连攻张绣于穰、叶，刘表遣兵救之；拒之逾年，勿使曹操得南阳。',
              goal: { turns: 14 }
            },
            {
              id: 'liubiao_e194_3',
              name: '袁术之亡',
              desc: '袁术据淮南而僭号，刘表与之世为仇敌；建安四年术穷蹙而死，宜尽收其众，以固江汉之东。',
              goal: { factions: ['zhong'] }
            },
            {
              id: 'liubiao_e194_4',
              name: '荆襄之重',
              desc: '南阳既附，此后无定式：或争中原，或守江汉，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        },
        {
          id: 'liubiao_e199',
          name: '官渡之观',
          era: 'e199',
          year: 199,
          blurb: '建安四年，袁绍简精卒十万南向，曹操与之相持官渡。刘表许袁绍之请而不出兵，坐保江汉；张绣屯宛，孙权方盛于江东，荆州之势，系于一战之成败。',
          stages: [
            {
              id: 'liubiao_e199_1',
              name: '官渡之观',
              desc: '建安四年，袁绍遣使请援，刘表许之而不出，欲保江汉以观成败；当拒曹操南下，以俟其变。',
              goal: { turns: 14 }
            },
            {
              id: 'liubiao_e199_2',
              name: '宛城之纳',
              desc: '张绣屯宛，刘表助之拒曹操；建安四年冬绣降于操，宛遂不守。宜乘其未并，尽收南阳之众。',
              goal: { cities: ['wan'] }
            },
            {
              id: 'liubiao_e199_3',
              name: '夏口之守',
              desc: '孙氏三世之仇在黄祖，江东舟师岁出江夏；夏口当其冲，拒之逾年，则江汉可全。',
              goal: { turns: 18 }
            },
            {
              id: 'liubiao_e199_4',
              name: '江汉之变',
              desc: '中原胜负未分，此后无定式：或北取许洛，或东收江东，皆在玩家自决。',
              goal: { open: true }
            }
          ]
        }
      ]
    }
  };

  root.CAMPAIGNS_PART1 = CAMPAIGNS;
  if (typeof module !== 'undefined' && module.exports) { module.exports = CAMPAIGNS; }
})(typeof window !== 'undefined' ? window : globalThis);
