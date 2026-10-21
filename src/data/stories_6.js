/* 《代汉涂高》剧情数据 · part 6 · 江东虎踞
 * 孙坚 / 孙策 / 孙权 / 孙休 四条故事线。仅用史实人物与史实情节，出处见各章 history 条目。
 * 传统 script 引入（非 ESM），可在 file:// 下直接运行。格式依 SCHEMA.md §5。
 */
window.STORIES_PART6 = {
  "sunjian": {
    key: "sunjian",
    group: "jiangdong",
    entry: "sunjian",
    name: "孙坚",
    title: "江东猛虎",
    tagline: "破虏将军，先诸侯而赴国难",
    start: { year: 189, place: "长沙", capital: "changsha" },
    chapters: [
      {
        id: "sunjian_c1",
        no: 1,
        title: "黄巾之役",
        year: 184,
        place: "宛",
        trigger: { start: true },
        scene: [
          { t:"narration", text:"中平元年，黄巾起于八州，所在燔烧官府，劫略聚邑。坚时以下邳丞为朱儁所表，为佐军司马。" },
          { t:"narration", text:"坚纠合乡里少年，得精勇千余人，随儁而前。所当之贼，无不摧破。" },
          { t:"line", who:"孙坚", text:"贼众虽盛，恃其蚁聚耳。一鼓可破，何必待四方之兵毕集。" },
          { t:"narration", text:"宛城之下，坚率众先登，士卒蚁附而上，城遂拔。军中由是知其能战。" },
          { t:"inner", who:"孙坚", text:"吾本吴郡一县吏，今日始知功名当以性命博之。" },
          { t:"history", text:"中平元年，黄巾贼起，坚从朱儁讨之，所击皆破，以功拜佐军司马之类。", src:"《三国志·孙破虏讨逆传》" },
          { t:"history", text:"坚少为县吏，年十七与父共载至钱唐，遇海贼胡玉等于匏里，坚操刀上岸，东西指麾，若分部人兵以罗遮之状，贼望见惊走。", src:"《三国志·孙破虏讨逆传》" }
        ],
        choice: {
          prompt: "黄巾既破，军中赏赉未及，士卒请先给军资。坚当何以处之？",
          options: [
            { text:"尽散所得军资于士卒", reply:"士卒得赏，皆愿为坚死，其部由是称精。", inner:"财货可复得，死士不可再得。", effect:{ morale:6, gold:-150, flag:"sancai" } },
            { text:"先以功自陈于朝，徐议赏典", reply:"坚以功稍迁，而军中怨其吝赏，战时常有不应命者。", effect:{ gold:200, morale:-3, flag:"qiugong" } }
          ]
        },
        reward: { troops: 300 }
      },
      {
        id: "sunjian_c2",
        no: 2,
        title: "长沙平乱",
        year: 187,
        place: "长沙",
        trigger: { turn: 3 },
        scene: [
          { t:"narration", text:"中平四年，长沙贼区星自称将军，众万余人，攻围城邑，州郡不能制。朝廷乃以坚为长沙太守。" },
          { t:"narration", text:"坚到郡，不待郡兵毕集，亲率将士，施设方略，旬月之间破区星等。" },
          { t:"line", who:"孙坚", text:"贼在境内，郡守当以身先之，何待请兵于州府。" },
          { t:"narration", text:"零陵周朝、桂阳郭石亦举众，与区星相连。坚越境寻讨，三郡皆定，以功封乌程侯。" },
          { t:"inner", who:"孙坚", text:"越境之举，人或讥我专擅。然长沙不安，则江东之路不开。" },
          { t:"history", text:"长沙贼区星自称将军，众万余人，攻围城邑，乃以坚为长沙太守。到郡，亲率将士，施设方略，旬月之间，克破星等。", src:"《三国志·孙破虏讨逆传》" },
          { t:"history", text:"周朝、郭石亦起于零陵、桂阳，与区星相连，坚越境寻讨，三郡肃然。", src:"《三国志·孙破虏讨逆传》" }
        ],
        choice: {
          prompt: "郡境之外贼与郡贼相连，讨之则越职，不讨则遗患。坚将何择？",
          options: [
            { text:"越境寻讨，一举平三郡", reply:"三郡肃然，而州府诸吏嫌其越职者亦众，文书往复，多所掣肘。", inner:"苟利于民，何避越境之名。", effect:{ troops:400, flag:"yuejing" } },
            { text:"谨守郡境，移书州府请讨", reply:"文书往还数月，零陵之贼复炽，长沙南境数被其患。", effect:{ gold:100, morale:-2, flag:"shoujing" } }
          ]
        },
        reward: { gold: 150 }
      },
      {
        id: "sunjian_c3",
        no: 3,
        title: "南阳杀咨",
        year: 190,
        place: "南阳",
        trigger: { turn: 6 },
        scene: [
          { t:"narration", text:"初平元年，关东州郡并起兵讨董卓。坚亦举长沙之众北上，前至南阳，众已数万。" },
          { t:"line", who:"孙坚", text:"义兵在道，郡守靳粟不与，是阻讨贼之师也。" },
          { t:"narration", text:"南阳太守张咨不肯给军粮。坚乃称疾，遣使请咨视疾，咨至营而为坚所执。" },
          { t:"narration", text:"遂斩张咨。南阳郡县震栗，军资毕给，坚部得济。" },
          { t:"inner", who:"孙坚", text:"杀一郡守而三军得食，虽招谤议，不得不为。" },
          { t:"narration", text:"坚至鲁阳，与袁术相见。术表坚行破虏将军，领豫州刺史，江东之众始有名于天下。" },
          { t:"history", text:"坚至南阳，众数万，南阳太守张咨不肯给军粮，坚诱而斩之，郡中震栗。", src:"《三国志·孙破虏讨逆传》" },
          { t:"history", text:"袁术表坚行破虏将军，领豫州刺史。", src:"《三国志·孙破虏讨逆传》" }
        ],
        choice: {
          prompt: "张咨靳粮不与，军食垂尽。何以处此郡守？",
          options: [
            { text:"斩咨以徇，尽取郡中军资", reply:"军资足而谤议起，其后袁术数以此疑坚。", inner:"兵不可一日无食。", effect:{ troops:600, morale:-3, flag:"shazhangzi" } },
            { text:"移书袁术，请粮于他郡", reply:"粮道迂远，士卒饥于道中，至鲁阳者十之七。", effect:{ food:-200, troops:-200, flag:"qianliang" } }
          ]
        }
      },
      {
        id: "sunjian_c4",
        no: 4,
        title: "鲁阳安坐",
        year: 190,
        place: "鲁阳",
        trigger: { turn: 9 },
        scene: [
          { t:"narration", text:"卓兵数万骤至鲁阳城下。坚方与诸将会饮于城外，部曲未集。" },
          { t:"line", who:"孙坚", text:"诸君第安坐，勿惊。敕部曲整阵，不得妄动。" },
          { t:"narration", text:"敌骑绕城而驰，尘起蔽日。坚徐起入城，部分士卒，一如常时。" },
          { t:"narration", text:"卓兵见其士众甚整，终不敢攻城，乃引还。" },
          { t:"inner", who:"孙坚", text:"胜负常在静躁之间。今日一乱，数万之众可以尽没。" },
          { t:"history", text:"卓遣步骑数万逆坚，坚方与客会饮，敕部曲整阵；卓兵见坚士众甚整，不敢攻城，乃引还。", src:"《三国志·孙破虏讨逆传》" }
        ],
        choice: {
          prompt: "卓兵新退，军中请速追之，以图洛阳。",
          options: [
            { text:"整众徐进，不轻追", reply:"军伍不乱，卓兵终不能乘之，坚部全师而进。", effect:{ morale:4, flag:"chizhong" } },
            { text:"选骑急追，乘其退乱", reply:"追骑遇伏，折损数百，坚自咎其躁。", effect:{ troops:-300, morale:-2, flag:"jizhui" } }
          ]
        }
      },
      {
        id: "sunjian_c5",
        no: 5,
        title: "阳人枭雄",
        year: 191,
        place: "阳人",
        trigger: { battleWin: 2 },
        scene: [
          { t:"narration", text:"先是坚与卓将徐荣战于梁东，兵败，与数十骑溃出。坚收散卒，复屯阳人，众心稍固。" },
          { t:"line", who:"孙坚", text:"败而能收，未为失也。诸君视坚此后再战。" },
          { t:"narration", text:"卓遣胡轸、吕布攻之。轸与布不相得，军中自相惊扰，陈伍遂乱。" },
          { t:"narration", text:"坚乘其乱而出击，大破卓军，斩其都督华雄，传首军门。" },
          { t:"inner", who:"孙坚", text:"卓之兵非不多，其将不和，故一鼓可破。此非天幸，乃其自败。" },
          { t:"history", text:"坚复相收兵，合战于阳人，大破卓军，枭其都督华雄。", src:"《三国志·孙破虏讨逆传》" },
          { t:"history", text:"卓遣胡轸、吕布攻坚，布与轸不睦，军中惊乱，坚因之而胜。", src:"《三国志·孙破虏讨逆传》裴松之注引《英雄记》" }
        ],
        choice: {
          prompt: "华雄既枭，洛阳在望。当乘胜西逼，抑顿兵待粮？",
          options: [
            { text:"乘胜进屯大谷，以逼西京", reply:"卓乃焚宫室、驱民西入长安，洛阳遂成丘墟。", inner:"兵不速进，则贼得从容为计。", effect:{ troops:300, morale:5, flag:"bidongdu" } },
            { text:"顿兵阳人，待袁术粮至", reply:"军食稍足，而卓得从容西徙，宫室府库尽入关中。", effect:{ food:200, flag:"dunyangren" } }
          ]
        }
      },
      {
        id: "sunjian_c6",
        no: 6,
        title: "甄官井玺",
        year: 191,
        place: "洛阳",
        trigger: { city: "luoyang" },
        scene: [
          { t:"narration", text:"卓焚洛阳宫室，驱民数百万口西徙长安，洛阳数百里无复人迹。" },
          { t:"narration", text:"坚入洛阳，令军士扫除汉宗庙，具太牢以祠之。" },
          { t:"narration", text:"有军人见城南甄官井上五色气，莫敢汲。坚使人入井，得汉传国玺。" },
          { t:"line", who:"程普", text:"此物非臣下所宜有。明公当思所以处之。" },
          { t:"inner", who:"孙坚", text:"玺出于洛，是天以汉祚示我乎？抑我将以此招天下之兵。" },
          { t:"narration", text:"或劝坚献之朝廷，或劝秘之勿宣，坚未决。关东诸将闻之，忌坚者益众。" },
          { t:"history", text:"坚入洛，扫除汉宗庙，祠以太牢；军人于城南甄官井上见五色气，入井得汉传国玺。", src:"《三国志·孙破虏讨逆传》裴松之注引《吴书》" },
          { t:"history", text:"得玺之说本传不载，出于裴注；《吴书》《江表传》所记亦互有异同，未可尽信。", src:"《三国志·孙破虏讨逆传》裴松之注" }
        ],
        choice: {
          prompt: "玺既入手，将安所归？",
          options: [
            { text:"秘之勿宣，以待其会", reply:"玺在坚手，而袁术之疑自此而生。", inner:"此物可以饵人，亦足以杀身。", effect:{ flag:"dexi", morale:2 } },
            { text:"宣示诸军，以动众心", reply:"三军惊以为天命在坚，而关东诸侯之忌坚者益众。", effect:{ morale:6, flag:"xuanxi" } }
          ]
        }
      },
      {
        id: "sunjian_c7",
        no: 7,
        title: "军粮之疑",
        year: 191,
        place: "鲁阳",
        trigger: { turn: 15 },
        scene: [
          { t:"narration", text:"或说袁术曰：坚若得洛，不可复制，此除狼而得虎也。术疑之，遂断其军粮。" },
          { t:"line", who:"孙坚", text:"军粮不至，士卒食麦屑，岂袁公所以待坚者？" },
          { t:"narration", text:"坚夜驰见术，与术相见，切言其事，辞气慷慨。术有惭色。" },
          { t:"narration", text:"术即调发军粮，而心终不能无疑。坚亦知江东之众不可久寄于人。" },
          { t:"inner", who:"孙坚", text:"寄兵于人，虽百战有功，终为人所忌。此后当自为一军。" },
          { t:"history", text:"术疑坚，断其军粮，坚夜驰见术，术即调发军粮，而疑终不解。", src:"《三国志·孙破虏讨逆传》裴松之注引《江表传》" }
        ],
        choice: {
          prompt: "袁术疑坚而断粮，坚当何以自处？",
          options: [
            { text:"面陈大义，仍奉术之号令", reply:"军粮复给，而坚之进退终在术手。", inner:"江东之基未立，不可先失袁氏之援。", effect:{ food:200, morale:3, flag:"fengshu" } },
            { text:"分兵就食他郡，渐离术之节制", reply:"坚部得食，而袁术谓其难制，两相猜阻日深。", effect:{ troops:200, morale:-2, flag:"jiushi" } }
          ]
        }
      },
      {
        id: "sunjian_c8",
        no: 8,
        title: "岘山之箭",
        year: 191,
        place: "襄阳",
        trigger: { turn: 18 },
        scene: [
          { t:"narration", text:"袁术使坚击荆州。刘表遣黄祖拒于樊城、邓县之间。" },
          { t:"narration", text:"坚击破黄祖，追渡汉水，遂围襄阳。表夜遣祖出城收兵，坚觉而率轻骑逐之。" },
          { t:"inner", who:"孙坚", text:"追败者不及整，此破荆州之机也。今日不取，后必为患。" },
          { t:"narration", text:"祖军缘山而行，矢石交下。坚中箭于岘山之间，须臾而卒，年三十七。" },
          { t:"narration", text:"坚既殁，余众散归袁术，传国玺亦入术手。策时尚少，扶柩渡江，江东之业几于中断。" },
          { t:"history", text:"坚击表，表遣黄祖拒之；坚破祖，追渡汉水，围襄阳，单马行岘山，为祖军士所射杀。", src:"《三国志·孙破虏讨逆传》" },
          { t:"history", text:"坚之殁，诸书所记年岁互异，《英雄记》亦别为一说，后人多系于初平二年，未可定也。", src:"《三国志·孙破虏讨逆传》裴松之注引《英雄记》" }
        ],
        choice: {
          prompt: "黄祖方遁，山径险狭。追之抑或还围襄阳？",
          options: [
            { text:"率轻骑追之，期于尽歼", reply:"坚深入山中，为敌所乘，江东之主遂殒于此。", inner:"一日纵敌，数世之患。", effect:{ troops:-400, morale:-6, flag:"zhuiXian" } },
            { text:"还围襄阳，徐取江夏", reply:"坚整众而还，祖得遁去，江夏之兵未损。", effect:{ troops:200, morale:2, flag:"huanwei" } }
          ]
        }
      }
    ],
    endings: {
      win: {
        title: "江东猛虎，克成帝业",
        text: "建安二十五年（220），坚既破襄阳、定荆襄，遂北收南阳、颍川，河南州郡望风而下。其年冬，汉帝禅位于坚，坚即皇帝位于洛阳，国号吴，改元黄武，追尊其父钟为孝懿王。以程普为大司马，黄盖为卫将军，韩当为车骑将军，朱治为太常，孙静为昭义中郎将，吴景、孙贲皆为列侯，张昭为丞相。庙号始祖，谥曰武烈皇帝。史臣曰：坚起于长沙一郡，先诸侯而赴国难，扫除宫阙，功冠关东；使天假之年，江东之业本不必待其子。"
      },
      lose: {
        title: "岘山陨身，孙氏几覆",
        text: "初平二年，坚围襄阳，单马行岘山，为黄祖军士所射，中箭而卒，年三十七。坚既殁，余众散归袁术，传国玺亦入术手；南阳、江夏之地尽为他人所分，孙氏在江东者不过吴景、孙贲数人，几于覆灭。策时年少，扶柩渡江，寄居江都，赖周瑜、张纮相扶，收合离散之众，乃有后日。孙氏之业，几乎中绝于此一箭。陈寿评曰：孙坚勇挚刚毅，孤微发迹，有忠壮之烈；然轻佻果躁，陨身致败，惜哉！"
      }
    }
  },
  "sunce": {
    key: "sunce",
    group: "jiangdong",
    entry: "sunce",
    name: "孙策",
    title: "伯符定江东",
    tagline: "转斗千里，尽有江南",
    start: { year: 194, place: "庐江", capital: "lujiang" },
    chapters: [
      {
        id: "sunce_c1",
        no: 1,
        title: "还兵不得",
        year: 194,
        place: "舒",
        trigger: { start: true },
        scene: [
          { t:"narration", text:"初平三年，坚殁于岘山。策年十九，扶丧渡江，葬事既毕，徙家于舒，与周瑜相友善。" },
          { t:"narration", text:"坚之部曲先归袁术。策乃诣术，求还父兵，以复父仇。" },
          { t:"line", who:"袁术", text:"吾以汝父之故，视汝如子。兵者，国之重器，未可轻付少年。" },
          { t:"narration", text:"术屡许之而终不与，策亦不敢强争，退而结纳江南豪杰，宾客日盛于门。" },
          { t:"line", who:"袁术", text:"使术有子如孙郎，死复何恨！" },
          { t:"inner", who:"孙策", text:"兵在人手，则父仇不可复，江东不可图。此非久计也。" },
          { t:"history", text:"坚卒，策年十九，葬事毕渡江，居舒，与周瑜相友，后事袁术，求还父兵而不与。", src:"《三国志·孙讨逆传》" },
          { t:"history", text:"术常叹曰：使术有子如孙郎，死复何恨。", src:"《三国志·孙讨逆传》裴松之注引《江表传》" }
        ],
        choice: {
          prompt: "父兵在袁术之手，策当何以取之？",
          options: [
            { text:"尽心事术，以功自效", reply:"术稍信策，然兵终不还，策之部曲不过数百人。", inner:"屈身事人，只为一日得兵耳。", effect:{ morale:3, gold:150, flag:"shishi" } },
            { text:"交结江东豪杰，别图自立", reply:"策与周瑜、张纮等相结，宾客益盛，而术亦阴察之。", effect:{ troops:200, morale:4, flag:"jiejiao" } }
          ]
        }
      },
      {
        id: "sunce_c2",
        no: 2,
        title: "庐江围城",
        year: 194,
        place: "庐江",
        trigger: { turn: 3 },
        scene: [
          { t:"narration", text:"袁术欲攻徐州，求粮于庐江太守陆康。康不与，术怒，使策攻之。" },
          { t:"line", who:"陆康", text:"吾受郡于朝，岂可以郡中之粟，供人攻徐州之兵！" },
          { t:"narration", text:"策围庐江二年，粮尽城陷，陆康病卒。策军死者亦数千，士卒怨苦。" },
          { t:"narration", text:"庐江既下，术复以其故吏刘勋为庐江太守，策一无所获。" },
          { t:"inner", who:"孙策", text:"攻城二载，死者数千，而郡印落于他人之手。术之待我，止于此矣。" },
          { t:"history", text:"术先许策为九江太守，更用丹阳陈纪；及策攻陆康，许以庐江，又用刘勋，策由是怨术。", src:"《三国志·孙讨逆传》" },
          { t:"history", text:"陆康固守庐江二年，城陷，康病卒。", src:"《后汉书·陆康传》" }
        ],
        choice: {
          prompt: "庐江既下而郡印与人，策将何以处之？",
          options: [
            { text:"隐忍不言，更图后举", reply:"策不复以怨形于色，术亦不疑，而策私自治兵益急。", inner:"今日之忍，为异日之伸。", effect:{ morale:-2, flag:"renzhi" } },
            { text:"面责袁术之失信", reply:"术默然不能对，而自此疏策，粮械之给益薄。", inner:"与其含垢，宁使彼知我不可欺。", effect:{ morale:4, troops:-100, flag:"zemian" } }
          ]
        }
      },
      {
        id: "sunce_c3",
        no: 3,
        title: "质玺借兵",
        year: 195,
        place: "历阳",
        trigger: { turn: 6 },
        scene: [
          { t:"narration", text:"兴平二年，策说袁术曰：家有旧恩于江东，愿助使君平之，乞以父之部曲见与。" },
          { t:"narration", text:"策乃以父所得传国玺质于术，术受之。" },
          { t:"line", who:"袁术", text:"汝欲以玺换兵乎？玺既在手，而汝之志在江东，吾亦不夺。" },
          { t:"narration", text:"术与策兵千余人、骑数十，宾客愿从者数百，皆江东之士。" },
          { t:"line", who:"孙策", text:"千兵足矣。江东之人闻孙郎至，当自开门以待。" },
          { t:"inner", who:"孙策", text:"玺可复得，兵不可失。此一举，父仇与江东皆在其中。" },
          { t:"history", text:"策说术曰：家有旧恩于江东，愿助使君平之。术表策为折冲校尉，行殄寇将军，与兵千余，骑数十，宾客愿从者数百。", src:"《三国志·孙讨逆传》" },
          { t:"history", text:"策质传国玺于术而借兵之说，见《江表传》；玺之归术，诸书所载不一。", src:"《三国志·孙讨逆传》裴松之注引《江表传》" }
        ],
        choice: {
          prompt: "玺与兵，孰为轻重？",
          options: [
            { text:"质玺借兵，速渡江东", reply:"兵与玺皆出于术手，而策自此独立于江外，江东之事始有可为。", effect:{ troops:800, freeUnit:{ type:"inf", count:1 }, flag:"dujiang" } },
            { text:"留玺自守，徐图他路", reply:"术疑策有异志，兵不复与，岁月遂淹，江东豪杰多有散去者。", effect:{ morale:-4, troops:200, flag:"liuxi" } }
          ]
        }
      },
      {
        id: "sunce_c4",
        no: 4,
        title: "曲阿破繇",
        year: 196,
        place: "曲阿",
        trigger: { battleWin: 1 },
        scene: [
          { t:"narration", text:"刘繇为扬州刺史，屯曲阿，遣张英、樊能拒守江口。策与吴景、孙贲、周瑜合兵攻之。" },
          { t:"line", who:"周瑜", text:"伯符之众虽少而锐，江东之民久苦繇之苛政，宜速战以乘其未定。" },
          { t:"narration", text:"策大破刘繇于曲阿，张英、樊能皆遁。繇走丹徒，后奔豫章。" },
          { t:"narration", text:"策既入城，申明军令，秋毫无犯，士民归之如归市。" },
          { t:"inner", who:"孙策", text:"江东父老尚念吾父之名。此城一入，人心已在我矣。" },
          { t:"history", text:"策渡江转斗，所向皆下，莫有当其锋者；破刘繇于曲阿，繇走丹徒。", src:"《三国志·孙讨逆传》" },
          { t:"history", text:"周瑜与策同年，相友善，策之渡江，瑜率兵迎之。", src:"《三国志·周瑜传》" }
        ],
        choice: {
          prompt: "曲阿既下，兵锋当东取吴会，抑西趋豫章？",
          options: [
            { text:"东取吴郡、会稽，尽有江表", reply:"吴郡、会稽相继而下，山越亦为其所摄。", effect:{ troops:400, morale:3, flag:"dongquwu" } },
            { text:"西击豫章，先断繇之归路", reply:"豫章未易猝下，刘繇得走，江东名族观望者众。", effect:{ troops:200, morale:-2, flag:"xiyu" } }
          ]
        }
      },
      {
        id: "sunce_c5",
        no: 5,
        title: "吴会既定",
        year: 197,
        place: "吴",
        trigger: { turn: 10 },
        scene: [
          { t:"narration", text:"吴郡豪帅严白虎聚众二万，据险自守。策引兵击之，白虎弃众而遁，吴郡遂平。" },
          { t:"narration", text:"会稽太守王朗以郡兵拒策于固陵，策数战破之。" },
          { t:"line", who:"王朗", text:"朗为汉吏，郡城不可委而去之。" },
          { t:"line", who:"虞翻", text:"明府以郡兵当孙郎之锋，未有不败者。愿早为之计。" },
          { t:"narration", text:"朗战败，浮海走东冶，后受汉廷之征而北归。策亦不追，江东之名族稍稍来附。" },
          { t:"inner", who:"孙策", text:"王朗者，儒者也，不足为江东之患。所患者，吴中名族未肯为我用耳。" },
          { t:"history", text:"策平吴郡豪帅严白虎等，破会稽太守王朗，朗浮海而走，后归朝廷。", src:"《三国志·孙讨逆传》" },
          { t:"history", text:"策以张昭为长史，文武之事一以委之。", src:"《三国志·张昭传》" }
        ],
        choice: {
          prompt: "江东初定，名族观望未附，当以何术抚之？",
          options: [
            { text:"辟召吴中名士，委以州郡", reply:"名族渐附，而策之政令亦多出士人之手。", inner:"欲守江东，先得江东之人。", effect:{ morale:5, gold:-200, flag:"fuji" } },
            { text:"专用旧部勋将，不假名族", reply:"旧部专兵，名族益疑，山越间起，郡县岁有警。", effect:{ troops:300, morale:-3, flag:"zhuanjiu" } }
          ]
        }
      },
      {
        id: "sunce_c6",
        no: 6,
        title: "沙羡破祖",
        year: 198,
        place: "江夏",
        trigger: { turn: 12 },
        scene: [
          { t:"narration", text:"策既有江东，而江夏黄祖屡为边患，且与父坚之死有关。策亲督诸军，与黄祖战于沙羡。" },
          { t:"line", who:"孙策", text:"父仇未报，黄祖其一也。今日江上之师，正为此行。" },
          { t:"narration", text:"祖以舟师拒战，策纵火鼓噪而进，大破之，斩获甚众。" },
          { t:"narration", text:"黄祖仅以身免，江夏之民望孙氏之旗而附者数千家。时曹操方有事于河北，无暇南顾。" },
          { t:"inner", who:"孙策", text:"岘山一箭，吾刻于心。今虽未杀祖，江夏之兵已胆落矣。" },
          { t:"history", text:"建安中，策击黄祖于沙羡，大破之。", src:"《三国志·孙讨逆传》" }
        ],
        choice: {
          prompt: "江夏既破，兵可西进，亦可回师定南方诸郡。",
          options: [
            { text:"西向追祖，径取江夏之地", reply:"黄祖仅以身免，江夏之众自是弱而不能军。", effect:{ troops:400, flag:"xizhui" } },
            { text:"回师豫章，抚定南方", reply:"豫章、庐陵并入版图，兵不加刃，而江夏之患留于后。", effect:{ gold:300, morale:2, flag:"huiting" } }
          ]
        }
      },
      {
        id: "sunce_c7",
        no: 7,
        title: "拒召受封",
        year: 199,
        place: "吴",
        trigger: { turn: 14 },
        scene: [
          { t:"narration", text:"曹操表策为讨逆将军，封吴侯；又以弟女配策弟孙匡，为子曹彰取孙贲之女，礼辟策弟孙权、孙翊。" },
          { t:"line", who:"使者", text:"朝廷嘉将军之功，欲召贤弟入朝，共奖王室。" },
          { t:"narration", text:"策谢使者而不遣，辞以弟年少、江东新定，不可无人。" },
          { t:"narration", text:"袁术僭号于寿春，策以书责之，遂与术绝，遣使奉贡于许，江东之名遂正于朝廷。" },
          { t:"inner", who:"孙策", text:"曹操方争河北，故以婚姻、征召缓我。此非恩，乃术也。" },
          { t:"history", text:"策与术绝，曹操表策为讨逆将军，封吴侯；以弟女配策弟孙匡，为子曹彰取孙贲女，又礼辟策弟权、翊。", src:"《三国志·孙讨逆传》" },
          { t:"history", text:"时袁术僭号，策以书责而绝之。", src:"《三国志·孙讨逆传》" }
        ],
        choice: {
          prompt: "朝廷结以婚姻、征召其弟，策当何以应之？",
          options: [
            { text:"受封而不遣弟，外示恭顺", reply:"朝廷赐命日隆，而策之兵终不入许，江东之政自成一国。", inner:"人质一入许都，江东便非我有。", effect:{ gold:400, morale:3, flag:"bujuzi" } },
            { text:"遣弟入朝，以示无他", reply:"权、翊入许，策之内虚，江东诸将益不自安。", effect:{ troops:-300, morale:-4, flag:"qianzi" } }
          ]
        }
      },
      {
        id: "sunce_c8",
        no: 8,
        title: "丹徒创裂",
        year: 200,
        place: "丹徒",
        trigger: { turn: 16 },
        scene: [
          { t:"narration", text:"建安五年，曹操与袁绍相持于官渡。策阴治兵，欲乘虚袭许，迎天子。先是吴郡太守许贡以策骁雄上表于汉，请召还京师，策知之，杀贡，贡之门客三人怀刃潜伏民间。" },
          { t:"narration", text:"策单骑出猎于丹徒山中，马行迅疾，从骑不及。三人起而射之，中策面颊，从骑至，乃尽杀之。" },
          { t:"line", who:"孙策", text:"面如此，尚可复建功立事乎！" },
          { t:"line", who:"孙策", text:"中国方乱，以吴越之众，三江之固，足以观成败。公等善相吾弟！" },
          { t:"line", who:"孙策", text:"举江东之众，决机于两阵之间，与天下争衡，卿不如我；举贤任能，各尽其心，以保江东，我不如卿。" },
          { t:"inner", who:"孙策", text:"江东初定而吾命止此。惟愿仲谋能持之，勿使江东之众一旦而散。" },
          { t:"narration", text:"医言创可治，当静养百日。策引镜自照，见面上创痕，掷镜而起，忿怒奋发，创裂而卒，年二十六。权佩印绶而泣，周瑜自外来赴丧，江东之众乃定。" },
          { t:"history", text:"建安五年，策猎于丹徒，为许贡门客所射，中颊；医言可治，静养百日乃愈，策引镜自照，谓左右曰面如此，尚可复建功立事乎，因奋动，创裂而卒，年二十六。", src:"《三国志·孙讨逆传》" },
          { t:"history", text:"策临终托张昭等，呼权佩以印绶，语以举贤任能、各尽其心之事。", src:"《三国志·孙讨逆传》裴松之注引《吴录》" }
        ],
        choice: {
          prompt: "创在面颊，医言百日可愈，而军中诸事待决。策将何以处之？",
          options: [
            { text:"谢绝宾客，静养创口", reply:"策闭门百日，创愈而袭许之谋已失其时，曹操之势大成。", inner:"忍一时之怒，或可延数年之命。", effect:{ morale:3, flag:"jingyang" } },
            { text:"强起视事，一如常时", reply:"策大怒奋动，创裂而卒，江东之业遂付其弟。", effect:{ troops:-200, morale:-5, flag:"qiangqi" } }
          ]
        }
      }
    ],
    endings: {
      win: {
        title: "伯符之志，尽有江南",
        text: "建安五年冬，策果发兵，乘曹操与袁绍相持之际卷甲袭许，迎天子于军中。其后十年，南平荆、交，北收徐、豫、青、冀，中原之众尽入孙氏。建安二十二年（217），策受汉禅于建业，国号吴，改元建武，追尊父坚为武烈皇帝，庙号始祖。以张昭为丞相，周瑜为大司马，程普为卫将军，黄盖为偏将军，韩当为车骑将军，吕范为大司农，张纮为侍中，孙静、吴景皆为列侯。策崩，谥曰桓皇帝，庙号中宗。史臣曰：策之起，年未及壮而尽有江东，猛锐冠世；使天不夺其年，江东之业当不止于鼎足。"
      },
      lose: {
        title: "丹徒创裂，付印于弟",
        text: "建安五年四月，策猎于丹徒山中，为许贡门客所射，中颊。医言可治，当静养百日；策引镜自照，掷镜大怒，创裂而卒，年二十六。临殁托张昭等，呼权佩以印绶，曰举江东之众、决机两阵之间与天下争衡，卿不如我；举贤任能、各尽其心以保江东，我不如卿。策既殁，江东之众内不自安，赖张昭、周瑜共扶权，乃得定。陈寿评曰：策英气杰济，猛锐冠世，志陵中夏；然轻佻果躁，陨身致败。"
      }
    }
  },
  "sunquan": {
    key: "sunquan",
    group: "jiangdong",
    entry: "sunquan",
    name: "孙权",
    title: "坐断东南",
    tagline: "举贤任能，各尽其心以保江东",
    start: { year: 208, place: "建业", capital: "jianye" },
    chapters: [
      {
        id: "sunquan_c1",
        no: 1,
        title: "张昭拥立",
        year: 200,
        place: "吴",
        trigger: { start: true },
        scene: [
          { t:"narration", text:"建安五年，策卒于丹徒。权时年十九，悲泣未视事，江东诸将各拥兵在外，人心未定。" },
          { t:"line", who:"张昭", text:"孝廉，此宁哭时邪！宜收兵抚众，以答远近之望。" },
          { t:"narration", text:"昭乃扶权上马，陈兵而出，诸将见之，稍稍归职。周瑜自外地将兵赴丧，遂留吴，与张昭共掌众事。" },
          { t:"line", who:"周瑜", text:"江东之众，非一人之众也。愿与孝廉共守先将军之业。" },
          { t:"narration", text:"曹操表权为讨虏将军、领会稽太守；然深险之地未尽从命，天下英豪布在州郡，君臣之固未定。" },
          { t:"inner", who:"孙权", text:"兄以江东付我，诸将皆父兄之旧。今日一言失当，江东非我有矣。" },
          { t:"history", text:"策卒，权悲泣未视事，张昭劝之，扶权上马，陈兵而出。", src:"《三国志·吴主传》裴松之注引《吴录》" },
          { t:"history", text:"张昭、周瑜等谓权可与共成大业，故委心而服事焉。", src:"《三国志·吴主传》" }
        ],
        choice: {
          prompt: "新丧之后，江东人心未定。权当以何者为先？",
          options: [
            { text:"陈兵示威，巡视郡县", reply:"诸将见兵容甚整，人心稍定，而郡县之赋亦急。", inner:"先使人畏，而后可以使人服。", effect:{ troops:200, morale:5, flag:"chenbing" } },
            { text:"厚礼宿将，悉依旧制", reply:"父兄之旧皆安其位，而权之令初时不出吴中。", effect:{ gold:-200, morale:3, flag:"houli" } }
          ]
        }
      },
      {
        id: "sunquan_c2",
        no: 2,
        title: "讨李术",
        year: 201,
        place: "皖",
        trigger: { turn: 3 },
        scene: [
          { t:"narration", text:"庐江太守李术拥兵自守，不受权命，且收纳权之叛者。" },
          { t:"line", who:"张昭", text:"李术不奉新主而外结曹操，此不讨，则江表诸郡皆效之。" },
          { t:"narration", text:"权遣兵围皖，术遣使求救于曹操。操方有事于河北，不能救。" },
          { t:"narration", text:"城破，术死，权并其部曲，江淮之间始知江东有新主。" },
          { t:"inner", who:"孙权", text:"兄新死，四方皆观我能否。今日攻皖，正为江东立威。" },
          { t:"history", text:"权攻庐江太守李术于皖，术求救于曹操而不至，城破。", src:"《三国志·吴主传》" }
        ],
        choice: {
          prompt: "皖城既下，其众当如何处之？",
          options: [
            { text:"收其部曲，徙其民于江东", reply:"皖之众并入吴军，而江淮之间怨其迁者众。", effect:{ troops:600, morale:-2, flag:"shouqi" } },
            { text:"尽释其众，使归田里", reply:"江淮之人称权之宽，而亡卒多有入于曹操者。", effect:{ morale:4, troops:-200, flag:"shizhong" } }
          ]
        }
      },
      {
        id: "sunquan_c3",
        no: 3,
        title: "破黄祖",
        year: 203,
        place: "江夏",
        trigger: { turn: 5 },
        scene: [
          { t:"narration", text:"建安八年，权西伐黄祖，水陆并进。祖以舟师逆战于江上。" },
          { t:"line", who:"孙权", text:"祖者，江夏之藩蔽也。不破祖，则荆州不可图，江上之患终在肘腋。" },
          { t:"narration", text:"权破其舟师，获舟船甚众，而城坚未拔，乃引军还。" },
          { t:"narration", text:"其后数年，权练兵于江上，楼船、蒙冲之属岁增，水军之制渐备。" },
          { t:"inner", who:"孙权", text:"黄祖未灭，江夏未下。父仇在其手，此志不可一日忘。" },
          { t:"history", text:"建安八年，权西伐黄祖，破其舟师而未拔其城。", src:"《三国志·吴主传》" },
          { t:"history", text:"其后建安十二年复征黄祖，十三年春破其城，斩之。", src:"《三国志·吴主传》" }
        ],
        choice: {
          prompt: "江夏城坚，舟师虽破，当乘势急攻，抑班师蓄力？",
          options: [
            { text:"乘势急攻，期于一举", reply:"祖坚守不出，吴军顿于城下数月，士卒多疫。", effect:{ troops:-300, morale:-2, flag:"jigong" } },
            { text:"班师蓄力，徐图再举", reply:"权还军练水军，江上之备益固，再举之期在数年之后。", inner:"祖不灭，江夏之兵终当再出。以待其时。", effect:{ morale:3, flag:"banshi" } }
          ]
        }
      },
      {
        id: "sunquan_c4",
        no: 4,
        title: "沙羡斩祖",
        year: 208,
        place: "江夏",
        trigger: { turn: 8 },
        scene: [
          { t:"narration", text:"建安十三年春，权复征黄祖。祖以舟师拒于江口，权遣吕蒙、凌统等击之。" },
          { t:"line", who:"孙权", text:"父之殁，实由黄祖之兵。今日得报此仇，亦可以慰先将军于地下。" },
          { t:"narration", text:"蒙破其水军前部，吴军乘之登岸。祖弃城而走，为权之骑士冯则所斩。" },
          { t:"narration", text:"甘宁自黄祖处来奔。宁有气力，善水战，周瑜、吕蒙共荐之，权加异焉。" },
          { t:"line", who:"甘宁", text:"江夏既下，荆州上游可取。愿将军勿失其时。" },
          { t:"inner", who:"孙权", text:"报仇之外，尤喜得甘宁。江东之将，又多一人。" },
          { t:"history", text:"建安十三年春，权征黄祖，破其城，斩之；黄祖为权之骑士冯则所杀。", src:"《三国志·吴主传》" },
          { t:"history", text:"甘宁弃黄祖归权，周瑜、吕蒙共荐之，权加异焉。", src:"《三国志·甘宁传》" }
        ],
        choice: {
          prompt: "江夏既克，兵威正盛。遂取荆州，抑还备曹操？",
          options: [
            { text:"进逼荆州，先取江陵", reply:"兵临荆境，刘表之众震动，而曹操之兵亦已南下。", effect:{ troops:400, flag:"bijing" } },
            { text:"还军柴桑，还备江上", reply:"水军退守江上，未几而曹操之书至。", inner:"胜负未可知，先已兵力，不如持重。", effect:{ morale:3, flag:"huancaisang" } }
          ]
        }
      },
      {
        id: "sunquan_c5",
        no: 5,
        title: "赤壁",
        year: 208,
        place: "赤壁",
        trigger: { year: 208 },
        scene: [
          { t:"narration", text:"建安十三年秋，曹操南下，刘表卒，其子琮以荆州降。操得荆州水军，顺江东下，遗权书曰：今治水军八十万众，方与将军会猎于吴。" },
          { t:"line", who:"张昭", text:"曹公挟天子以征四方，动以朝廷为辞。且将军所恃者长江，今操尽得荆州水军，蒙冲斗舰以千数，水陆俱下，长江之险已与我共之矣。愚谓大计不如迎之。" },
          { t:"line", who:"鲁肃", text:"今肃可迎操耳，如将军不可也。肃迎操，犹不失下曹从事，乘犊车、从吏卒、交游士林；将军迎操，欲安所归？" },
          { t:"line", who:"周瑜", text:"操虽托名汉相，其实汉贼也。北方未平，马超、韩遂尚在关西，为操后患；又舍鞍马、仗舟楫，与吴越争衡，本非中国所长；且盛寒马无藁草，驱北方之众远涉江湖，必生疾病。瑜请得精兵三万，保为将军破之。" },
          { t:"line", who:"孙权", text:"老贼欲废汉自立久矣，徒忌二袁、吕布、刘表与孤耳。今数雄已灭，唯孤尚存，孤与老贼势不两立！" },
          { t:"narration", text:"权拔刀斫前奏案曰：诸将吏敢复有言当迎操者，与此案同。乃以周瑜、程普为左右督，与刘备并力逆操于赤壁。" },
          { t:"narration", text:"部将黄盖以火攻破曹军舟船，曹军大败，退保南郡。是役之后，天下三分之势遂定。" },
          { t:"inner", who:"孙权", text:"若从张昭之言，江东之业止于此日。今日始知用人之重。" },
          { t:"history", text:"周瑜主战，请得精兵以拒曹操，权用之，遂破曹操于赤壁。", src:"《三国志·周瑜传》" }
        ],
        choice: {
          prompt: "曹操书至，张昭等请迎，鲁肃、周瑜请战。权当何从？",
          options: [
            { text:"拔刀斫案，决意拒操", reply:"权拔刀斫案，众议遂定。三军闻之，士气大振，江上舟舰一时并集。", inner:"降则身家不保，战则江东可存。", effect:{ morale:8, flag:"juzhan", freeUnit:{ type:"navy", count:2 } } },
            { text:"遣使迎操，以图保全", reply:"士众解体，诸将各怀去就，江东之兵不复可用。", effect:{ morale:-8, gold:300, flag:"yingcao" } }
          ]
        }
      },
      {
        id: "sunquan_c6",
        no: 6,
        title: "徙治秣陵",
        year: 210,
        place: "秣陵",
        trigger: { city: "jianye" },
        scene: [
          { t:"narration", text:"赤壁之后，权以周瑜领南郡，屯江陵，西扼荆州之口。" },
          { t:"narration", text:"权自京口徙治秣陵，筑石头城，置烽燧于江上，以固江防。" },
          { t:"line", who:"张纮", text:"秣陵有钟山之固、临江之利，宜为治所。移都于此，则江上首尾相应。" },
          { t:"narration", text:"权从之。城成，改名建业，江上遂有重镇。" },
          { t:"narration", text:"是岁，周瑜卒于巴丘。权流涕曰：公瑾有王佐之才，今忽短命，孤何赖哉！乃以鲁肃代之，领其兵。" },
          { t:"inner", who:"孙权", text:"都江表者，不可以无坚城。石头既成，江东始有根本。" },
          { t:"history", text:"权于建安中徙治秣陵，筑石头城，城成改名建业，为江表之根本。", src:"《三国志·吴主传》" },
          { t:"history", text:"周瑜卒于巴丘，权以鲁肃代之，领其兵。", src:"《三国志·周瑜传》" }
        ],
        choice: {
          prompt: "建业既定，西守荆州与北向淮南，孰先？",
          options: [
            { text:"西结刘备，共守荆州", reply:"荆州使吴之西境稍安，而刘备之势日张，上游终非吴有。", effect:{ morale:3, gold:-200, flag:"jiebei" } },
            { text:"北取合肥，以窥淮南", reply:"权亲征合肥，不克而还，军中遂轻北向之议。", effect:{ troops:-300, morale:-3, flag:"beifahefei" } }
          ]
        }
      },
      {
        id: "sunquan_c7",
        no: 7,
        title: "皖城之破",
        year: 214,
        place: "皖城",
        trigger: { turn: 12 },
        scene: [
          { t:"narration", text:"建安十九年，魏将朱光屯皖，大开稻田，招纳叛亡，江淮之间常被其患。" },
          { t:"line", who:"吕蒙", text:"皖田肥美，一熟则魏兵益众。宜及其未成，急攻之。" },
          { t:"narration", text:"权从之，以甘宁为升城督，宁身先登城，蒙以精锐继之。" },
          { t:"narration", text:"自旦至食时，城拔，获朱光，魏之江北屯田之势遂弱。" },
          { t:"inner", who:"孙权", text:"得皖城，则江上诸郡首尾相应。此非贪其地，为藩蔽耳。" },
          { t:"history", text:"建安十九年，权攻皖城，吕蒙荐甘宁为升城督，遂拔之，获魏将朱光。", src:"《三国志·吕蒙传》" },
          { t:"history", text:"甘宁从攻皖，为升城督，身先登城，破之。", src:"《三国志·甘宁传》" }
        ],
        choice: {
          prompt: "皖城既拔，江北之屯田已毁。守之抑或弃之？",
          options: [
            { text:"留兵戍皖，以为江北门户", reply:"皖城戍卒岁费粮秣，然江北常有吴旗，魏人不敢轻渡。", effect:{ troops:300, food:-150, flag:"shouwan" } },
            { text:"徙其民而还，不守江北", reply:"皖民尽迁江南，江北地空，后魏复屯之。", effect:{ gold:200, morale:-2, flag:"xianwan" } }
          ]
        }
      },
      {
        id: "sunquan_c8",
        no: 8,
        title: "合肥之败",
        year: 215,
        place: "合肥",
        trigger: { turn: 14 },
        scene: [
          { t:"narration", text:"建安二十年，权亲率十万之众围合肥。魏将张辽、李典、乐进等坚守不出。" },
          { t:"narration", text:"张辽募敢从之士八百，夜出突击，直冲垒入至权之麾下，吴军惊扰，陈伍大乱。" },
          { t:"line", who:"凌统", text:"将军速渡！统以身当之，必使将军得脱。" },
          { t:"narration", text:"权退走逍遥津，桥断丈余，策马超渡，仅以身免。吴军大溃，死者甚众。" },
          { t:"inner", who:"孙权", text:"十万之众，挫于八百之兵。将骄兵惰，此我之罪也。" },
          { t:"history", text:"建安二十年，权围合肥，张辽以八百人夜袭，权大惊，退走逍遥津，几为辽所获。", src:"《三国志·张辽传》" },
          { t:"history", text:"权之退也，凌统率亲近死战，身被数创，扶权得免。", src:"《三国志·凌统传》" }
        ],
        choice: {
          prompt: "合肥既败，江东之气顿挫。北向之志当罢乎？",
          options: [
            { text:"还军濡须，筑坞拒守", reply:"权于濡须口筑坞，江防益固，魏兵终不能渡。", effect:{ troops:200, morale:2, flag:"zhuxuwu" } },
            { text:"再整军实，期于再举", reply:"权治兵秣马，而江东之人苦于征发，田畴多荒。", effect:{ troops:400, morale:-4, gold:-300, flag:"zaiju" } }
          ]
        }
      },
      {
        id: "sunquan_c9",
        no: 9,
        title: "雪夜短兵",
        year: 217,
        place: "濡须",
        trigger: { year: 217 },
        scene: [
          { t:"narration", text:"建安二十二年春，曹操军出濡须口，吴兵拒之于江上。是夜大雪，天寒，两营火鼓相望。" },
          { t:"line", who:"甘宁", text:"今夜雪暗，敌营不备。愿以帐下健儿为前驱，斫其鹿角而还。" },
          { t:"narration", text:"权许之。宁选健儿百余人，衔枚夜进，直抵曹营之垒。" },
          { t:"narration", text:"宁以短兵先入，斫其鹿角，与敌相拒于营中。众寡悬绝，宁殊死而战，部分不乱。" },
          { t:"narration", text:"比及天明，宁引众而还，营中皆惊其整。权赐酒食甚厚，将士由是服其勇。" },
          { t:"line", who:"孙权", text:"孟德有张辽，孤有兴霸，足相敌也。" },
          { t:"inner", who:"孙权", text:"合肥之耻，今日雪其半。将者，国之爪牙，其用在果断，不在众寡。" },
          { t:"history", text:"曹公出濡须，权命甘宁率帐下健儿夜入曹营，宁以短兵接战，以少击众，战罢而还。", src:"《三国志·甘宁传》裴松之注引《吴书》" },
          { t:"history", text:"权曰：孟德有张辽，孤有兴霸，足相敌也。", src:"《三国志·甘宁传》" }
        ],
        choice: {
          prompt: "血战虽壮，濡须之守当以何为本？",
          options: [
            { text:"固守泊坞，不与争锋", reply:"权依水立坞，曹军三月不能进，引退。", effect:{ morale:5, flag:"shouxuwu" } },
            { text:"乘胜追击，逐操于淮上", reply:"追兵遇伏，折将校数人，将士始知魏兵未可轻。", effect:{ troops:-400, morale:-3, flag:"zhuiji" } }
          ]
        }
      },
      {
        id: "sunquan_c10",
        no: 10,
        title: "白衣渡江",
        year: 219,
        place: "江陵",
        trigger: { city: "jiangling" },
        scene: [
          { t:"narration", text:"建安二十四年，关羽围樊城，水淹七军，魏将于禁等皆没，中原震动。" },
          { t:"narration", text:"曹操遣使结权，请其袭羽之后。权与吕蒙议之，蒙以为荆州可取。" },
          { t:"line", who:"吕蒙", text:"羽之士众，家属皆在江陵。若得江陵而抚其老弱，羽之众必自溃。" },
          { t:"narration", text:"蒙至寻阳，尽伏精兵于艑中，使白衣摇橹作商贾人服，昼夜兼行，尽收羽所置江边屯候。" },
          { t:"narration", text:"麋芳、士仁皆降，荆州诸城望风而下。羽还走，士卒散尽，为权将潘璋之司马马忠所获，与其子皆斩之。" },
          { t:"inner", who:"孙权", text:"荆州得而刘备必来。今日之胜，正是十年之忧。" },
          { t:"history", text:"蒙至寻阳，尽伏精兵于艑中，使白衣摇橹作商贾人服，尽收羽之江边屯候，遂取荆州。", src:"《三国志·吕蒙传》" },
          { t:"history", text:"关羽走还，兵散，为潘璋司马马忠所获，斩之。", src:"《三国志·关羽传》" }
        ],
        choice: {
          prompt: "关羽在樊，荆州空虚。取之则结仇于刘备，不取则坐失上游。",
          options: [
            { text:"密发兵袭其后方", reply:"荆州之众尽入吴手，而刘备之怨自此结，兵连祸结者数年。", inner:"上游不取，则江东终无西面之固。", effect:{ captureCity:"jiangling", troops:800, morale:-2, flag:"xijingzhou" } },
            { text:"按兵不动，还备上游", reply:"关羽之势大张，襄阳震动，吴之西境旦夕可忧。", effect:{ morale:3, flag:"anbing" } }
          ]
        }
      },
      {
        id: "sunquan_c11",
        no: 11,
        title: "受封吴王",
        year: 220,
        place: "建业",
        trigger: { turn: 20 },
        scene: [
          { t:"narration", text:"是岁，魏王曹丕受汉禅，改元黄初。权遣使称藩，送于禁等归魏，卑辞厚礼以缓其兵。" },
          { t:"line", who:"张昭", text:"曹操虽死，其子犹据中原。今宜卑辞厚礼，以缓其兵，而后修我甲兵。" },
          { t:"narration", text:"魏遣使拜权为吴王，加九锡。权受之而不遣子入侍为质。" },
          { t:"narration", text:"刘备已即帝位于蜀，起兵东下之势已成。江东两面受敌，军资转输昼夜不息。" },
          { t:"inner", who:"孙权", text:"称藩之屈，不过一时。曹丕、刘备皆我之敌，江东当自为计，不为人之藩。" },
          { t:"history", text:"曹丕受禅，权遣使称藩，魏拜权为吴王，加九锡。", src:"《三国志·吴主传》" },
          { t:"history", text:"权既不遣子入侍，魏三路伐吴，刘晔谏以为吴未可图。", src:"《三国志·刘晔传》" }
        ],
        choice: {
          prompt: "魏、蜀皆敌，称藩与拒命，孰为利？",
          options: [
            { text:"受吴王之封，卑辞缓兵", reply:"魏使往复，吴得数年之暇以整军实。", effect:{ gold:300, morale:-3, flag:"shoufeng" } },
            { text:"不受魏封，举兵拒之", reply:"吴军两线受敌，士卒疲于奔命，江淮之间岁岁有战。", effect:{ troops:-500, morale:2, flag:"jufeng" } }
          ]
        }
      },
      {
        id: "sunquan_c12",
        no: 12,
        title: "夷陵",
        year: 222,
        place: "夷陵",
        trigger: { turn: 22 },
        scene: [
          { t:"narration", text:"黄初三年，刘备倾国东下，缘山截岭，立营数十，连兵至夷陵。" },
          { t:"narration", text:"吴之诸将请速战。陆逊以为不可，按兵守险者数月。" },
          { t:"line", who:"陆逊", text:"备举军东下，锐气始盛，且乘高守险，难可卒攻。宜奖厉将士，广施方略，以观其变。" },
          { t:"narration", text:"待其兵疲意懈，逊乃敕各持一把茅，以火攻拔之。火发风猛，连破蜀军数十营。" },
          { t:"narration", text:"刘备大败，走保马鞍山，复遁归白帝城。蜀之舟械军资，尽为吴有。" },
          { t:"inner", who:"孙权", text:"用陆逊而不疑，此一战之本。若早战，江东已危。" },
          { t:"history", text:"刘备东征，权以陆逊为大都督，逊坚守不出，待蜀军疲而火攻，破之于夷陵。", src:"《三国志·陆逊传》" },
          { t:"history", text:"蜀军死者数万，备仅以身免，归白帝城。", src:"《三国志·先主传》" }
        ],
        choice: {
          prompt: "诸将请战，陆逊主守。权当何以处之？",
          options: [
            { text:"专任陆逊，假以黄钺", reply:"诸将虽有异议，终听节制，卒以火攻大破蜀军。", inner:"疑人不用，用人不疑。", effect:{ morale:6, flag:"zhuanrenlunxun" } },
            { text:"促逊速战，以应诸将", reply:"吴军仓卒出战，小挫于夷道，幸而未至大败。", effect:{ troops:-400, morale:-3, flag:"cusu" } }
          ]
        }
      },
      {
        id: "sunquan_c13",
        no: 13,
        title: "武昌称帝",
        year: 229,
        place: "武昌",
        trigger: { year: 229 },
        scene: [
          { t:"narration", text:"黄龙元年（229），权即皇帝位于武昌，国号吴，改元黄龙。" },
          { t:"narration", text:"追尊父坚为武烈皇帝，兄策为长沙桓王。策之子绍封吴侯，不以为嗣。" },
          { t:"line", who:"张昭", text:"汉祚已移，天命在吴。愿陛下以江东百姓为念，无使征役无已。" },
          { t:"narration", text:"是岁迁都建业，留太子登与上大将军陆逊守武昌，荆州之政一以委之。" },
          { t:"inner", who:"孙权", text:"兄以王礼终，而我独为帝。江东之业成于此日，其忧亦始于此日。" },
          { t:"history", text:"黄龙元年，权即帝位于武昌，国号吴，追尊父坚为武烈皇帝，兄策为长沙桓王。", src:"《三国志·吴主传》" },
          { t:"history", text:"权迁都建业，留太子登及陆逊守武昌。", src:"《三国志·吴主传》" }
        ],
        choice: {
          prompt: "称帝之后，太子登年少，上游委之何人？",
          options: [
            { text:"留太子登守武昌，委陆逊辅之", reply:"上游有重臣宿将，荆州之政肃然。", effect:{ morale:4, flag:"liudeng" } },
            { text:"尽召诸弟入朝，收其兵柄", reply:"宗室虽不敢动，而藩屏之任尽失，边镇多非亲信。", effect:{ troops:200, morale:-3, flag:"zhaozongshi" } }
          ]
        }
      },
      {
        id: "sunquan_c14",
        no: 14,
        title: "太子登卒",
        year: 241,
        place: "建业",
        trigger: { turn: 26 },
        scene: [
          { t:"narration", text:"赤乌四年（241），太子孙登卒，年三十三。权悲不自胜，数月不视朝。" },
          { t:"narration", text:"登临终上疏，荐用贤良，其中有陆逊、诸葛瑾等名，又乞权省游猎、宽征役。" },
          { t:"line", who:"孙权", text:"孤之长子，仁而好学。今已矣，江东以何人为继！" },
          { t:"narration", text:"明年，权立三子孙和为太子，而宠爱其弟鲁王孙霸，礼秩相若。" },
          { t:"inner", who:"孙权", text:"诸子皆我骨肉，立一而宠一，或可使其相制而不相倾乎。" },
          { t:"history", text:"赤乌四年，太子登卒，权悲之。明年立子和为太子，封子霸为鲁王。", src:"《三国志·吴主传》" },
          { t:"history", text:"登临终上疏，荐用贤良，乞权省游猎、宽征役。", src:"《三国志·孙登传》" }
        ],
        choice: {
          prompt: "太子登卒，储位当在何人？",
          options: [
            { text:"立子和为太子，以固国本", reply:"太子和仁厚得众，而鲁王之宠日盛，二宫之势自此分。", effect:{ morale:2, flag:"lihe" } },
            { text:"且不立储，徐观诸子", reply:"藩王之谋益炽，朝臣各有所附，谗言日闻于内。", inner:"立储太早，恐为众臣所挟。", effect:{ morale:-4, flag:"huanli" } }
          ]
        }
      },
      {
        id: "sunquan_c15",
        no: 15,
        title: "二宫之争",
        year: 242,
        place: "建业",
        trigger: { year: 242 },
        scene: [
          { t:"narration", text:"权既立和为太子，而宠爱鲁王霸日隆，与太子无异。于是朝臣分附二宫，中外交构。" },
          { t:"line", who:"陆逊", text:"太子正统，宜有磐石之固；鲁王藩臣，宠秩宜有所降。如此，则上下安而储位定。" },
          { t:"narration", text:"逊数上书谏，权疑其交结太子，数遣使责让。逊愤恚而卒于赤乌八年。" },
          { t:"narration", text:"吾粲以与陆逊通书下狱死；其后朱据、屈晃、张纯等亦因太子之事或死或废。江东老臣，一时凋落。" },
          { t:"inner", who:"孙权", text:"群臣各私其党，皆欲早定储位以自托。若我一从其议，则柄在太子与大臣，不在我矣。" },
          { t:"narration", text:"二宫之斗十年，权终不能察其子之贤否，惟知群臣之可畏。谗说殄行，胤嗣废毙，实自权启之。" },
          { t:"history", text:"权立和为太子而宠鲁王霸，朝臣分争；陆逊屡谏不从，愤恚而卒于赤乌八年。", src:"《三国志·陆逊传》" },
          { t:"history", text:"吾粲以与陆逊通书下狱死，朱据、屈晃等亦坐是事见罪。", src:"《三国志·孙和传》" },
          { t:"history", text:"张昭已先卒于嘉禾五年（236），不及见二宫之争，旧史以昭与二宫之狱牵连者，非也。", src:"《三国志·张昭传》" }
        ],
        choice: {
          prompt: "二宫相争，朝臣分立。权当何以处之？",
          options: [
            { text:"明定嫡庶，抑鲁王之宠", reply:"名分既正，朝臣稍安，而权心犹疑，终不能自守其令。", effect:{ morale:4, flag:"dingmingfen" } },
            { text:"两存之，使相制衡", reply:"二宫益斗，谗言日至，大臣相继得罪，江东元气大伤。", inner:"使两党相持，则权在朕手。", effect:{ morale:-6, flag:"liangcun" } }
          ]
        }
      },
      {
        id: "sunquan_c16",
        no: 16,
        title: "废和立亮",
        year: 250,
        place: "建业",
        trigger: { year: 250 },
        scene: [
          { t:"narration", text:"赤乌十三年（250），权幽禁太子和，群臣震恐。" },
          { t:"narration", text:"朱据、屈晃等率群臣固谏，请存太子之位。权大怒，皆见罪罚。" },
          { t:"line", who:"孙权", text:"太子者，朕所立也。群臣何得逼我，以成其党与之名！" },
          { t:"narration", text:"是岁，权废和为庶人，赐鲁王霸死，立少子亮为太子。" },
          { t:"narration", text:"江东老臣凋落已尽，后嗣幼弱，孙氏之祸自此而始。" },
          { t:"inner", who:"孙权", text:"杀一子，废一子，而江东之士死者数十。此我之过，然已无可如何矣。" },
          { t:"history", text:"权废太子和为庶人，赐鲁王霸死，立少子亮为太子；朱据、屈晃等因谏见罪。", src:"《三国志·孙和传》" },
          { t:"history", text:"权之末年，猜忌日甚，大臣人人自危；二宫之狱，吴之贤者几尽。", src:"《三国志·吴主传》" }
        ],
        choice: {
          prompt: "和与霸皆朕之子，社稷与私恩孰重？",
          options: [
            { text:"废和赐霸死，立少子亮", reply:"储位既定于少子，而江东之士论权者不可胜数，国本自此益孤。", inner:"宁使储位在我手，不使群臣得而议之。", effect:{ morale:-6, flag:"feihe" } },
            { text:"存和之位，黜霸之党", reply:"二宫之势稍杀，而权终疑和不自安，父子之间不复相信。", effect:{ morale:2, flag:"cunhe" } }
          ]
        }
      }
    ],
    endings: {
      win: {
        title: "吴大帝，鼎足而王",
        text: "赤乌十二年（249），魏有内争，司马氏方与曹氏相攻。权乘其隙，三道出师，北取襄阳、寿春，西收江汉，蜀汉亦遣使修好归命。太元元年（251），天下混一，权仍都建业，改元神凤。以诸葛瑾为大将军，步骘为丞相，吕岱为大司马，朱然为左大司马，全琮为右大司马，丁奉为冠军将军，陆抗领其父逊之部曲为镇军将军，顾雍追赠司徒。权崩，谥曰大皇帝，庙号太祖。史臣曰：权屈身忍辱，任才尚计，有勾践之奇，英人之杰矣，故能自擅江表而终成一统之业。"
      },
      lose: {
        title: "晚节猜乱，社稷倾危",
        text: "太元二年（252）四月，权崩于建业，年七十一，谥曰大皇帝，庙号太祖。太子亮立，幼弱不能制下，政出权臣，诸葛恪、孙峻、孙綝相继擅命，亮废而休立，休卒而皓入，二十年间社稷几覆。陈寿评曰：孙权屈身忍辱，任才尚计，有勾践之奇，英人之杰矣，故能自擅江表，成鼎峙之业；然性多嫌忌，果于杀戮，暨臻末年，弥以滋甚，至于谗说殄行，胤嗣废毙，岂所谓贻厥孙谋以燕翼子者哉？二宫之乱，实权自启之。"
      }
    }
  },
  "sunxiu": {
    key: "sunxiu",
    group: "jiangdong",
    entry: "sunxiu",
    name: "孙休",
    title: "永安之治",
    tagline: "收权臣之柄，复江东之学",
    start: { year: 255, place: "建业", capital: "jianye" },
    chapters: [
      {
        id: "sunxiu_c1",
        no: 1,
        title: "迎立",
        year: 258,
        place: "建业",
        trigger: { start: true },
        scene: [
          { t:"narration", text:"永安元年（258），孙綝废吴主亮为会稽王，遣使迎立琅琊王休。休时居藩在外，年二十三。" },
          { t:"narration", text:"休至建业，即位，改元永安。綝以兵陈于殿庭，休入而神色不动。" },
          { t:"line", who:"孙綝", text:"愿陛下以国事委臣，臣当为江东守之。" },
          { t:"narration", text:"綝自以为有立君之功，遂专朝政，亲党皆居要职，兵柄尽在其门。" },
          { t:"inner", who:"孙休", text:"綝立我而挟我。今日不能与之争，当待其隙而後动。" },
          { t:"history", text:"永安元年，孙綝废亮为会稽王，迎立休，改元永安。", src:"《三国志·孙休传》" },
          { t:"history", text:"綝以休之立出于己，专擅朝政，亲党分典兵柄。", src:"《三国志·孙綝传》" }
        ],
        choice: {
          prompt: "綝挟立君之功，兵在其门。休当何以为计？",
          options: [
            { text:"阳示恭顺，密结张布、丁奉", reply:"休与张布、丁奉暗相结纳，而綝未之觉。", inner:"权臣之诛，不在朝堂之诏，而在殿中之伏兵。", effect:{ morale:2, flag:"mijie" } },
            { text:"明诏夺其兵柄", reply:"诏下而兵不听命，綝益猜惧，朝中无人敢言。", effect:{ morale:-3, troops:-200, flag:"mingduo" } }
          ]
        }
      },
      {
        id: "sunxiu_c2",
        no: 2,
        title: "诛綝",
        year: 258,
        place: "建业",
        trigger: { turn: 3 },
        scene: [
          { t:"narration", text:"是年腊月，休大飨群臣，伏兵于殿中。" },
          { t:"line", who:"丁奉", text:"今日之事，请以兵陈于外，俟其入而执之。一夫之力足以办此。" },
          { t:"narration", text:"綝入而见执，即日斩之，并诛其兄弟与党与。吴之政柄始归于一。" },
          { t:"line", who:"孙綝", text:"臣有立陛下之功，何至于此！" },
          { t:"inner", who:"孙休", text:"权臣之柄，一日不收，则君不为其君。我不能为孙亮之续。" },
          { t:"history", text:"休与张布、丁奉密谋，因腊会伏兵执綝，即日斩之，并诛其党与。", src:"《三国志·孙休传》" },
          { t:"history", text:"綝既死，吴之政柄始归于帝。", src:"《三国志·孙綝传》" }
        ],
        choice: {
          prompt: "綝既诛，其党与当尽诛乎？",
          options: [
            { text:"罪止綝身，余皆不问", reply:"朝中稍安，然綝之旧部多有未服，私相偶语者岁余。", effect:{ morale:4, flag:"zuizhiqin" } },
            { text:"穷治其党，尽收兵柄", reply:"一时之势大定，而江东士人多有忧惧，莫敢任事。", effect:{ troops:300, morale:-4, flag:"qiongzhi" } }
          ]
        }
      },
      {
        id: "sunxiu_c3",
        no: 3,
        title: "立五经博士",
        year: 260,
        place: "建业",
        trigger: { turn: 6 },
        scene: [
          { t:"narration", text:"永安三年（260），休诏立五经博士，置学官，使将吏子弟及吏中有志好者就学，一岁课试，差其品第。" },
          { t:"line", who:"孙休", text:"自兵兴以来，学校废绝。今江东立国，兵可守而不可久，人才不可一日不养。" },
          { t:"narration", text:"休好读书，常与博士讲论经义，江东之士稍有劝学者。" },
          { t:"narration", text:"有司以费用为言，休不许，曰：此国之本，非耗也。" },
          { t:"inner", who:"孙休", text:"兵不可久用，而学不可一日废。江东之业，终当以人才为本。" },
          { t:"history", text:"永安三年，休立五经博士，置学官，使将吏子弟及吏中有志好者就学课试。", src:"《三国志·孙休传》" }
        ],
        choice: {
          prompt: "立学之事费出府库，诸将以为不急。",
          options: [
            { text:"立五经博士，置学官如故", reply:"江东士子稍集，学官之制复立，而府库为之稍耗。", inner:"今日之费，异日之才。", effect:{ morale:6, gold:-250, flag:"lixue" } },
            { text:"罢学省费，专修甲兵", reply:"府库稍充，而士论以为休无远图，江东文治益衰。", effect:{ troops:400, gold:200, morale:-3, flag:"baxue" } }
          ]
        }
      },
      {
        id: "sunxiu_c4",
        no: 4,
        title: "徐氏诛览",
        year: 204,
        place: "丹阳",
        trigger: { turn: 8 },
        scene: [
          { t:"narration", text:"追述：建安中，孙权之弟孙翊为丹阳太守，为部将妫览、戴员所杀。" },
          { t:"narration", text:"览欲并取其妻徐氏，徐氏伪许之，请俟月晦，设祭除服，然后从命。" },
          { t:"line", who:"徐氏", text:"请待月晦，祭夫除服，然后惟命是听。" },
          { t:"narration", text:"徐氏乃阴召翊之旧部壮士二十余人，告以复仇之谋，伏于帐中。" },
          { t:"narration", text:"至期，览入，伏兵起而斩之，又诛戴员，以其首祭翊之灵。郡中皆服其节。" },
          { t:"inner", who:"徐氏", text:"夫仇不共天。此事非妇人之躯所能任，然更无可托者。" },
          { t:"narration", text:"事闻于权，权嘉其节义，厚抚其家。休后亦以此励江东士女。" },
          { t:"history", text:"妫览、戴员杀翊，翊之妻徐氏设计诱览而诛之，为夫报仇。", src:"《三国志·孙翊传》裴松之注引《吴历》" }
        ],
        choice: {
          prompt: "徐氏之节，郡人欲上闻于朝，徐氏自请勿言。",
          options: [
            { text:"表其节义，以励江东", reply:"徐氏之事传于吴中，士女皆知有节，而徐氏自守如故。", effect:{ morale:5, flag:"biaoxu" } },
            { text:"隐其事迹，保全其家", reply:"徐氏得以安居终老，而其事久而始彰于世。", effect:{ gold:100, morale:-1, flag:"yinxu" } }
          ]
        }
      },
      {
        id: "sunxiu_c5",
        no: 5,
        title: "蜀亡之悔",
        year: 263,
        place: "建业",
        trigger: { year: 263 },
        scene: [
          { t:"narration", text:"永安六年（263），魏大举伐蜀。蜀遣使告急于吴，请出兵以分魏之势。" },
          { t:"narration", text:"休遣大将军丁奉向寿春，又遣留平向沔中，令施绩向江陵，欲以牵魏之兵。" },
          { t:"line", who:"张布", text:"蜀亡则江东孤，救之不可不亟。然我兵出江上，道远而魏之主兵已在剑阁。" },
          { t:"narration", text:"未及至，而蜀主出降，蜀亡。吴军闻之，皆解甲而还。" },
          { t:"line", who:"孙休", text:"我不能救蜀，江东之藩篱尽矣。此后北面之敌，其势十倍于前。" },
          { t:"inner", who:"孙休", text:"蜀之亡非一日之故，而吴之兵迟迟不进，此我之罪也。" },
          { t:"history", text:"魏伐蜀，蜀求救于吴；吴遣丁奉等向寿春以分魏兵，未至而蜀亡。", src:"《三国志·孙休传》" },
          { t:"history", text:"蜀主出降于魏，蜀亡。", src:"《三国志·后主传》" }
        ],
        choice: {
          prompt: "蜀已亡，吴之藩篱尽失，当何以为备？",
          options: [
            { text:"增戍江陵、寿春，固守江防", reply:"吴之上游戍备益密，而兵食之费日增，江东之民苦之。", effect:{ troops:500, food:-200, flag:"zengshu" } },
            { text:"遣使结交州郡，图其侧翼", reply:"使者往还，交州之事反因此而起，南土遂多故。", effect:{ gold:-200, morale:-1, flag:"jiejiao" } }
          ]
        }
      },
      {
        id: "sunxiu_c6",
        no: 6,
        title: "交州之变",
        year: 264,
        place: "交趾",
        trigger: { turn: 14 },
        scene: [
          { t:"narration", text:"交趾郡吏吕兴等杀其太守，据郡附魏；九真、日南皆应之，南土大扰。" },
          { t:"narration", text:"魏亦遣兵入交州，吴之南土遂不全，海道之利与南海之赋皆断。" },
          { t:"narration", text:"时陆抗领其父逊之部曲，屡有战功，休使督于江上，备魏之南下，未能远赴南土。" },
          { t:"narration", text:"吴遣兵浮海赴讨，道远而民已附魏，久而无功。" },
          { t:"inner", who:"孙休", text:"南土一失，江东之财赋与海路皆断。我虽有心，力已不及。" },
          { t:"history", text:"交趾郡吏吕兴等杀太守，据郡附魏，九真、日南皆应之。", src:"《三国志·孙休传》" },
          { t:"history", text:"陆抗为陆逊之子，领其父部曲，为吴名将。", src:"《三国志·陆抗传》" }
        ],
        choice: {
          prompt: "交州既叛，远在万里。救之抑舍之？",
          options: [
            { text:"遣兵浮海赴交州", reply:"海道艰远，兵至而民已附魏，徒耗粮械，死者相望于道。", effect:{ troops:-300, food:-150, flag:"fuhai" } },
            { text:"弃交州而固江防", reply:"南土之贡赋遂绝，而江防得以专力，未至两失。", effect:{ gold:-200, morale:1, flag:"qijiaozhou" } }
          ]
        }
      },
      {
        id: "sunxiu_c7",
        no: 7,
        title: "永安七年",
        year: 264,
        place: "建业",
        trigger: { turn: 16 },
        scene: [
          { t:"narration", text:"永安七年（264）秋，休寝疾日笃，口不能言，乃手书召丞相濮阳兴入宫。" },
          { t:"narration", text:"休以太子幼弱相托，令兴与左将军张布共辅之。" },
          { t:"line", who:"濮阳兴", text:"臣当以死奉太子，不敢有二心。" },
          { t:"narration", text:"未几，休卒于建业，年三十，谥曰景皇帝，葬于定陵。" },
          { t:"line", who:"孙休", text:"江东之业，本非易守。愿卿等以社稷为念，勿以幼主为奇货。" },
          { t:"inner", who:"孙休", text:"我所忧者不在魏，而在托孤之人。" },
          { t:"history", text:"永安七年，休寝疾，口不能言，手书召丞相濮阳兴入，以太子相托。", src:"《三国志·孙休传》" },
          { t:"history", text:"休卒于建业，年三十，谥曰景皇帝。", src:"《三国志·孙休传》" }
        ],
        choice: {
          prompt: "太子幼弱，托孤之任付之何人？",
          options: [
            { text:"付濮阳兴、张布，使共辅之", reply:"兴、布受遗诏而心不自安，未几竟议改立，江东之祸自此始。", inner:"所托者皆我所用之人，而人心不可保。", effect:{ morale:-2, flag:"tuoguXing" } },
            { text:"别召宗室、宿将入侍，共为顾命", reply:"顾命之列既广，而各怀异志，议久不决，幼主之位益危。", effect:{ morale:1, flag:"guming" } }
          ]
        }
      }
    ],
    endings: {
      win: {
        title: "明主振吴，复有荆扬",
        text: "永安八年（265），休既整军经武，乘魏室将禅之隙，三道出师：丁奉出寿春，陆抗出江陵，留平出沔中。魏之边将多降，荆、扬、交、广之地皆归吴有。是年冬，魏之公卿迎休于洛阳，休受禅即位，国号吴，仍都建业，改元神凤。以濮阳兴为丞相，张布为大将军，丁奉为右大司马，陆抗为荆州牧，施绩、留平皆为列侯，韦昭为博士祭酒。休在位既久，江东赖以稍安。崩，谥曰景皇帝，庙号太宗。史臣曰：休以宗室入纂大统，收权臣之柄而不假杀戮，兴学校、抚疮痍，使江东复有荆扬之实，可谓吴之明主矣。"
      },
      lose: {
        title: "永安七年，托孤非人",
        text: "永安七年（264）七月，休寝疾，口不能言，手书召丞相濮阳兴，以太子相托，未几卒于建业，年三十，谥曰景皇帝。兴与张布受遗诏而心不自安，竟以太子幼弱，改议迎立乌程侯孙皓。皓既立，未期年而杀濮阳兴、张布，休之太子与后皆不得其死，江东老臣一时尽矣。史臣曰：休之托孤，可谓得人而不得其心；吴之衰，自永安七年始。孙皓之暴，非一日之积，实孙权晚节猜忌、休之嗣子不明所酿也。"
      }
    }
  }
};
