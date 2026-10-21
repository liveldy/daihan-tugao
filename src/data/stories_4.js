/* 《代汉涂高》剧情数据 · part 4 · 乱世枭雄
 * 董卓 / 袁绍 / 袁术 三条故事线。仅用史实人物与史实情节，出处见各章 history 条目。
 * 传统 script 引入（非 ESM），可在 file:// 下直接运行。格式依 SCHEMA.md §5。
 */
window.STORIES_PART4 = {
  "dongzhuo": {
    key: "dongzhuo",
    group: "xiaoxiong",
    entry: "dongzhuo",
    name: "董卓",
    title: "凉州铁骑入洛",
    tagline: "焚宫阙挾天子，凉州人临天下",
    start: { year: 189, place: "洛阳", capital: "luoyang" },
    chapters: [
      {
        id: "dongzhuo_c1",
        no: 1,
        title: "北邙迎驾",
        year: 189,
        place: "洛阳",
        trigger: { start: true },
        scene: [
          { t:"narration", text:"中平六年，灵帝崩于嘉德殿。大将军何进欲诛中常侍，召并州牧董卓引兵向京师，以胁太后。" },
          { t:"narration", text:"卓未至，而进为中常侍张让等所杀。虎贲中郎将袁术等焚南宫，让劫少帝与陈留王夜走小平津。" },
          { t:"line", who:"董卓", text:"吾闻京师有变，昼夜兼行。今上何在？" },
          { t:"narration", text:"帝与陈留王匿于河上民舍，公卿追迎于北邙阪下。卓兵夜至，旌旗蔽野，洛中震恐。" },
          { t:"line", who:"陈留王刘协", text:"祸乱之起，由中常侍张让等，非他人所能预。" },
          { t:"narration", text:"卓与帝语，帝恐怖不能对；乃更与陈留王语，问祸乱所由起，王答自初至终，无所遗失。" },
          { t:"inner", who:"董卓", text:"此儿可语。天下之事，或可更张。" },
          { t:"history", text:"卓与帝语，语不可了。乃更与陈留王语，问祸乱由起，王答，自初至终，无所遗失，卓大喜，乃有废立意。", src:"《后汉书·董卓传》" },
          { t:"history", text:"卓初入洛阳，步骑不过三千，四五日辄夜潜出军，明旦乃大陈旌鼓而还，时人莫测其众。", src:"《三国志·董卓传》" }
        ],
        choice: {
          prompt: "帝幼弱而陈留王敏辩，卓将何以自处？",
          options: [
            { text:"迎帝还宫，步行随车以示恭顺", reply:"卓步从车后，洛中父老稍安，而凉州兵已遍布宫阙。", inner:"恭顺之名可收人心，兵柄终在我手。", effect:{ morale:6, flag:"fengying" } },
            { text:"拥兵入宫，并何进、何苗之众", reply:"卓遂尽收二何部曲，兵势大振，朝野侧目而不敢言。", inner:"名器可以徐取，兵卒不可一日无主。", effect:{ troops:800, morale:-5, flag:"binghejin" } }
          ]
        },
        reward: { troops: 500 }
      },
      {
        id: "dongzhuo_c2",
        no: 2,
        title: "废立",
        year: 189,
        place: "洛阳",
        trigger: { turn: 4 },
        scene: [
          { t:"narration", text:"卓既并二何之兵，遂讽朝廷，以久不雨策免司空刘弘，自代之。朝议始傾于卓。" },
          { t:"line", who:"董卓", text:"伊尹、霍光之事，古有之。今上暗弱，不可以奉宗庙。" },
          { t:"narration", text:"尚书卢植独抗议，谓今上富于春秋，行无失德，非昌邑王之比。卓怒，免其官。" },
          { t:"line", who:"袁绍", text:"天下健者，岂惟董公！" },
          { t:"narration", text:"绍引佩刀横揖，径出，奔冀州。伍琼、周毖说卓曰：绍惧罪出奔，非有他志，急购之，势必为变。" },
          { t:"inner", who:"董卓", text:"去一人而朝中无声，此洛阳所以可制也。" },
          { t:"narration", text:"九月，卓废帝为弘农王，立陈留王协为帝，是為献帝。未几，又鸩杀弘农王，废何太后。" },
          { t:"history", text:"九月，卓废帝为弘农王，立陈留王为帝。卢植独抗议，卓怒，免植官。", src:"《后汉书·卢植传》" }
        ],
        choice: {
          prompt: "废立既行，天下侧目。卓当以何姿态临朝？",
          options: [
            { text:"自领太尉、前将军，加节传斧钺", reply:"卓加节钺，凉州兵益骄，公卿入见皆趋拜阶下。", effect:{ troops:600, morale:-3, flag:"zhuangchao" } },
            { text:"延见蔡邕、黄琬等，稍循朝仪", reply:"卓数宴群臣，士多屈从，然腹心皆是凉州旧部。", effect:{ morale:4, gold:-300, flag:"yongshi" } }
          ]
        }
      },
      {
        id: "dongzhuo_c3",
        no: 3,
        title: "拔用名士",
        year: 189,
        place: "洛阳",
        trigger: { turn: 8 },
        scene: [
          { t:"narration", text:"卓以关东士人未附，与周毖、伍琼议拔用名士，欲收海内之望。" },
          { t:"line", who:"伍琼", text:"袁绍辈皆有宿望，若购之急，势必为变。不如赦其罪，授之一郡，彼喜于免祸，必无他志。" },
          { t:"narration", text:"卓从之，拜袁绍为渤海太守，韩馥为冀州牧，刘岱为兖州刺史，孔伷为豫州刺史，张咨为南阳太守，张邈为陈留太守。" },
          { t:"line", who:"董卓", text:"吾与诸君共安天下，何必尽用凉州儿？" },
          { t:"inner", who:"董卓", text:"借其名以收其心；若不为我用，不过一郡之兵耳。" },
          { t:"narration", text:"绍受命之郡，韩馥、刘岱等各据州郡，朝命一出卓门，而州郡之兵自此皆有主。" },
          { t:"history", text:"卓乃与周毖、伍琼议，任用韩馥为冀州牧，刘岱为兖州刺史，孔伷为豫州刺史，张咨为南阳太守，张邈为陈留太守，袁绍为渤海太守。", src:"《后汉书·董卓传》" }
        ],
        choice: {
          prompt: "关东名士授之州郡，是养虎还是结恩？",
          options: [
            { text:"广授州郡，示以不疑", reply:"关东牧守半出卓门，然皆蓄异志，终为后日之敌。", inner:"天下之士，虽不可尽用，亦不可尽杀。", effect:{ morale:5, flag:"guangshou" } },
            { text:"止授袁绍一郡，余皆留之京师", reply:"士人在洛者益不自安，关东之路遂绝。", effect:{ morale:-3, troops:300, flag:"liushi" } }
          ]
        }
      },
      {
        id: "dongzhuo_c4",
        no: 4,
        title: "关东兵起",
        year: 190,
        place: "洛阳",
        trigger: { turn: 14 },
        scene: [
          { t:"narration", text:"初平元年正月，关东州郡并起兵讨卓。袁绍自号车骑将军，与河内太守王匡屯河内；袁术屯鲁阳；韩馥留邺给军粮；孔伷屯颍川，刘岱、张邈、鲍信、桥瑁各拥兵。" },
          { t:"line", who:"董卓", text:"关东诸将，皆吾所授。今乃相率背我！" },
          { t:"narration", text:"卓以周毖、伍琼为卖己，收斩之。二人既死，朝中无复敢言关东事者。" },
          { t:"line", who:"周毖", text:"举贤任能，臣之职也。彼不用公，非臣之罪。" },
          { t:"inner", who:"董卓", text:"名士不可用，唯凉州铁骑可恃。" },
          { t:"narration", text:"卓议徙都长安，杨彪、黄琬争之，卓怒，罢其议。公卿相顾，无敢再言迁者。" },
          { t:"history", text:"卓以周毖、伍琼为卖己，收斩之。", src:"《后汉书·董卓传》" },
          { t:"history", text:"绍自号车骑将军，与王匡屯河内，术屯鲁阳，馥留邺给军粮，伷屯颍川，岱、邈、信、瑁等各拥兵。", src:"《三国志·袁绍传》" }
        ],
        choice: {
          prompt: "周毖、伍琼卖己，朝士多与关东通。当如何处置？",
          options: [
            { text:"斩毖、琼以徇，尽易朝士", reply:"二人死，朝中无复敢言者，关东之人益不复西来。", inner:"杀二人以示威，胜于百战。", effect:{ morale:-4, flag:"shaming" } },
            { text:"存其性命，外示宽大", reply:"士心稍安，然卓疑之愈甚，宫禁之卫益密。", effect:{ morale:3, flag:"kuanshi" } }
          ]
        }
      },
      {
        id: "dongzhuo_c5",
        no: 5,
        title: "荥阳汴水",
        year: 190,
        place: "荥阳",
        trigger: { battleWin: 2 },
        scene: [
          { t:"narration", text:"卓遣中郎将徐荣、校尉李蒙等分守荥阳、汴水之要，以拒关东西向之军。" },
          { t:"narration", text:"曹操引兵西向，欲据成皋、进逼洛阳，与徐荣遇于汴水。" },
          { t:"line", who:"徐荣", text:"卓公之令：蹙之汴水，勿使西渡。" },
          { t:"narration", text:"战自昏至旦，操兵少而锐，终大败，操为流矢所中，所乘马被创。" },
          { t:"narration", text:"曹洪以己马授操，操得夜遁。陈留人卫兹助操起兵，战殁于此。" },
          { t:"inner", who:"董卓", text:"关东兵虽众，能战者独徐荣辈耳。" },
          { t:"history", text:"太祖引兵西向，将据成皋，进至荥阳汴水，遇卓将徐荣，与战不利，士卒死伤甚多，太祖为流矢所中，所乘马被创。", src:"《三国志·武帝纪》" },
          { t:"history", text:"卫兹从太祖战，没于荥阳。", src:"《三国志·卫臻传》" }
        ],
        choice: {
          prompt: "汴水既捷，曹操孤军已败，徐荣请追。当如何？",
          options: [
            { text:"令徐荣穷追，尽歼关东先至之军", reply:"操仅以身免，然关东诸军闻而益愤，锋刃皆西向。", inner:"斩其先至者，使后至者不敢轻进。", effect:{ enemyTroops:-1500, morale:-2, flag:"qiongzhui" } },
            { text:"止军守关，不使凉州兵深入关东", reply:"荣收兵还守，洛阳得暂息，而孙坚已拔阳人。", effect:{ troops:300, morale:3, flag:"shouguan" } }
          ]
        }
      },
      {
        id: "dongzhuo_c6",
        no: 6,
        title: "阳人",
        year: 190,
        place: "阳人",
        trigger: { turn: 20 },
        scene: [
          { t:"narration", text:"孙坚屯鲁阳，卓遣步骑数万掩之。坚方会饮，令军勿动，卓兵至而不敢攻，乃退。" },
          { t:"narration", text:"卓遣胡轸为大督护、吕布为骑督，率骑步数万击坚于阳人。" },
          { t:"line", who:"吕布", text:"布为骑督，不受大督护节度。" },
          { t:"narration", text:"二人素不相得，军中传语曰「会杀此胡」。胡轸惴惴，弃辎重而先去。" },
          { t:"narration", text:"坚乘之，合战于阳人，大破卓军，枭其都督华雄。" },
          { t:"inner", who:"董卓", text:"诸将内相猜，胜不相让，败不相救，此凉州军之痼疾也。" },
          { t:"history", text:"坚复相收兵，合战于阳人，大破卓军，枭其都督华雄等。", src:"《三国志·孙破虏传》" },
          { t:"history", text:"布与轸不相得，军中有谣言，兵众惊乱，遂奔退。", src:"《英雄记》（裴松之注引）" }
        ],
        choice: {
          prompt: "胡轸与吕布不和，阳人新败。卓将何以统诸将？",
          options: [
            { text:"自将出关，亲督诸将", reply:"卓亲临军，凉州诸将皆慑，然京师之政益疏，宫省渐为他人所窥。", inner:"将不一心，非亲行不能使人畏。", effect:{ morale:6, flag:"qinchu" } },
            { text:"分其兵柄，使胡轸、吕布互制", reply:"诸将益相忌，阳人之败无人任其咎。", effect:{ troops:-400, morale:-3, flag:"jianghe" } }
          ]
        }
      },
      {
        id: "dongzhuo_c7",
        no: 7,
        title: "焚宫西迁",
        year: 190,
        place: "洛阳",
        trigger: { turn: 26 },
        scene: [
          { t:"narration", text:"卓决计西迁，谓公卿曰：关中肥饶，故秦得并吞六国；陇右材木自出，致之甚易。" },
          { t:"line", who:"杨彪", text:"迁都之事，国家大计，宜顺众心。" },
          { t:"narration", text:"卓怒，罢杨彪、黄琬之议。二月，收洛阳富室以罪，没入其财物。" },
          { t:"narration", text:"卓焚宫庙、官府、居家，二百里内无复孑遗；尽徙洛阳人数百万口于长安，步骑驱蹙，积尸盈路。" },
          { t:"narration", text:"又使吕布发掘诸帝陵及公卿冢墓，收其珍宝。卓自屯毕圭苑中，车服僭拟乘舆。" },
          { t:"line", who:"董卓", text:"吾据关中而临关东，百年之计也。" },
          { t:"inner", who:"董卓", text:"洛阳不可守，长安可久居；民随之西，则关东虽得空城，无所得食。" },
          { t:"history", text:"卓乃焚宫室，徙都长安，尽徙洛阳人数百万口于长安，步骑驱蹙，饥饿寇掠，积尸盈路。", src:"《后汉书·董卓传》" }
        ],
        choice: {
          prompt: "迁都既行，洛阳宫室、陵寝、生民当如何处置？",
          options: [
            { text:"尽焚宫庙、发陵取宝，绝关东之望", reply:"洛阳火三日不绝，宫室丘墟，关东诸军西向益急。", inner:"财物归我，灰烬归敌。", effect:{ gold:1200, morale:-8, flag:"fenluo" } },
            { text:"留兵守洛阳宫阙，徐徙其民", reply:"宫阙仅存，然董军分力两处，孙坚遂得长驱。", effect:{ troops:400, gold:200, flag:"liuluo" } }
          ]
        },
        penalty: { morale: -3 }
      },
      {
        id: "dongzhuo_c8",
        no: 8,
        title: "孙坚入洛",
        year: 191,
        place: "长安",
        trigger: { year: 191 },
        scene: [
          { t:"narration", text:"卓东下诸将屯渑池、陕，以塞关东之路；自居长安，营郿坞，积谷三十年。" },
          { t:"narration", text:"孙坚进屯大谷，卓遣吕布等拒之，布与战不利而走。" },
          { t:"narration", text:"坚遂入洛阳，扫除宗庙，祠以太牢；于城南甄官井中得汉传国玺。" },
          { t:"line", who:"董卓", text:"关东军未可轻，惟孙坚小戆，颇能用人，当语诸将，使知忌之。" },
          { t:"inner", who:"董卓", text:"洛阳已焚，坚虽入，据空城耳。吾坐关中，犹可制之。" },
          { t:"narration", text:"卓归长安，公卿迎拜于道。卓命诸将各拥兵于外，京师之柄尽归其手，而肘腋之下亦生异心。" },
          { t:"history", text:"坚进至大谷，卓遣吕布御之，布战不利而走。坚遂入洛阳，扫除宗庙。", src:"《后汉书·董卓传》" },
          { t:"history", text:"卓曰：关东军未可轻，惟孙坚小戆，颇能用人，当语诸将，使知忌之。", src:"《山阳公载记》（裴松之注引）" }
        ],
        choice: {
          prompt: "孙坚入洛，关东锋锐。卓当亲战还是归守关中？",
          options: [
            { text:"亲率大军出关，与坚决战", reply:"凉州铁骑出关，坚敛兵退屯阳人；然长安之事尽委于王允、吕布。", inner:"一击破坚，关东自解。", effect:{ morale:5, troops:-500, flag:"chuguan" } },
            { text:"归守关中，委诸将拒敌", reply:"卓居郿坞，诸将各拥兵在外，京师之变遂生肘腋。", effect:{ troops:600, morale:3, flag:"guiguan" } }
          ]
        }
      },
      {
        id: "dongzhuo_c9",
        no: 9,
        title: "北掖门",
        year: 192,
        place: "长安",
        trigger: { year: 192 },
        scene: [
          { t:"narration", text:"司徒王允、司隶校尉黄琬、尚书仆射士孙瑞等谋诛卓，以中郎将吕布为内应。" },
          { t:"narration", text:"初平三年四月，卓入朝，至北掖门，骑都尉李肃以戟刺之，卓伤臂坠车。" },
          { t:"line", who:"董卓", text:"吕布何在？" },
          { t:"inner", who:"董卓", text:"吾自凉州提兵入洛，挟天子、焚宫阙，岂意死于此门之下。" },
          { t:"line", who:"吕布", text:"有诏讨贼臣！" },
          { t:"line", who:"董卓", text:"庸狗敢如是邪！" },
          { t:"history", text:"布曰：有诏讨贼臣。卓曰：庸狗敢如是邪！遂杀卓，尸于市。", src:"《英雄记》（裴松之注引）" },
          { t:"narration", text:"卓死于门下，暴尸于市。天时始热，卓素充肥，脂流于地；守尸吏然火置卓脐中，光明达曙，如是积日。" },
          { t:"narration", text:"卓部曲李傕、郭汜、张济、樊稠等拥兵在外，用贾诩之谋，相结反攻长安。围城数日，吕布败走，李傕等收王允及其宗族十余人杀之。关中自此不复有汉廷之政。" }
        ],
        choice: {
          prompt: "长安盛传诛卓之谋，卓入朝与否？",
          options: [
            { text:"如常入朝，示无他虑", reply:"北掖门下一戟，断凉州之势；凉州之众遂无所统，天下更乱。", inner:"吾曾以兵威制天下，何惧数人？", effect:{ morale:-2, flag:"ruchaozhu" } },
            { text:"称疾不出，先收王允、吕布", reply:"卓收允下狱，然诸将内不自安，凉州军自溃，长安终不为卓有。", effect:{ morale:-5, troops:-300, flag:"yiyu" } }
          ]
        }
      }
    ],
    endings: {
      win: {
        title: "凉州武人得天下",
        text: "董卓既破关东，西据关中，东收河洛。建安十一年，凉州军北定幽并、南下巴蜀江淮，天下混一。卓定都长安，修未央故宫，即皇帝位，国号凉，改元承凉。其崩也，谥曰武皇帝，庙号太祖。功臣徐荣、胡轸、李傕、郭汜、张济、樊稠、牛辅皆封列侯，贾诩为谋主，吕布为卫将军宿卫宫省。史臣曰：卓以凉州一介武人，率铁骑入洛，焚宫阙、挾天子，终取四百年汉室之祀而有之，天下不复知有刘氏，岂非兵威之极欤。"
      },
      lose: {
        title: "腹脐燃灯，暴尸于市",
        text: "初平三年四月，卓死于长安北掖门，年约六旬。先是，卓伤臂坠车，大呼问吕布何在，布宣诏讨贼，李肃以戟刺之，遂死于门下。卓既死，尸于市，天热脂流，守尸吏然火置其脐中以为灯，光明达曙，如是积日。其部曲李傕、郭汜等用贾诩之谋反攻长安，杀王允，关中遂乱，汉廷名存而已。陈寿评曰：董卓狼戾贼忍，暴虐不仁，自书契已来，殆未之有也。以凉州之强而不能守一日之命，盖恃力者终为力所胜。"
      }
    }
  },
  "yuanshao": {
    key: "yuanshao",
    group: "xiaoxiong",
    entry: "yuanshao",
    name: "袁绍",
    title: "河北四州",
    tagline: "四世三公，鹰扬河朔而谋不能决",
    start: { year: 189, place: "洛阳", capital: "luoyang" },
    chapters: [
      {
        id: "yuanshao_c1",
        no: 1,
        title: "司隶校尉",
        year: 189,
        place: "洛阳",
        trigger: { start: true },
        scene: [
          { t:"narration", text:"中平五年，初置西园八校尉，袁绍为佐军校尉。明年灵帝崩，何进执政，以绍为司隶校尉。" },
          { t:"narration", text:"绍劝何进尽召四方猛将引兵向京师，以胁太后。主簿陈琳谏，谓但当速发雷霆，行权立断，何须外助。" },
          { t:"line", who:"曹操", text:"但当诛其元恶，一狱吏足矣，何必纷纷召外兵乎！" },
          { t:"narration", text:"卓未至，而何进见杀于嘉德殿前。绍与袁术、吴匡等勒兵闭宫门，捕宦官，无少长皆杀之。" },
          { t:"line", who:"袁绍", text:"阉竖尽诛，然后可以议国事。" },
          { t:"narration", text:"死者二千余人，或有无须而误死者，至自发露形体而后得免。宫省之内，血流至阶。" },
          { t:"inner", who:"袁绍", text:"吾家四世三公，门生故吏遍天下；京师既乱，此非常之时也。" },
          { t:"history", text:"绍与术及吴匡等勒兵捕诸宦官，无少长皆杀之，或有无须而误死者，至自发露形体而后得免，死者二千余人。", src:"《后汉书·何进传》" },
          { t:"history", text:"太祖闻而笑曰：但当诛其元恶，一狱吏足矣，何必纷纷召外兵乎。", src:"《三国志·武帝纪》裴松之注引《魏书》" }
        ],
        choice: {
          prompt: "何进欲尽诛宦官而召外兵入洛，绍为司隶校尉，何以处之？",
          options: [
            { text:"劝进广召外兵，胁太后以成诛宦之事", reply:"宦官虽尽，董卓之骑已据宫阙，兵柄自此不在大臣。", inner:"借外兵之势，事可速成。", effect:{ troops:300, morale:3, flag:"zhaowai" } },
            { text:"谏止外兵，独以禁兵行诛", reply:"禁兵甫动，何进已死；绍与袁术犹能尽诛宦官，而京师无所恃以防外兵。", effect:{ morale:-2, flag:"junei" } }
          ]
        }
      },
      {
        id: "yuanshao_c2",
        no: 2,
        title: "横刀",
        year: 189,
        place: "洛阳",
        trigger: { turn: 4 },
        scene: [
          { t:"narration", text:"董卓既入洛，并何进、何苗之众，讽朝廷以久不雨策免司空刘弘，自代之。" },
          { t:"narration", text:"卓大会百僚，议废少帝而立陈留王。坐者莫敢言，惟卢植抗议，卓免其官。" },
          { t:"line", who:"董卓", text:"天下之事，岂不在我！我欲为之，谁敢不从？尔谓董卓刀为不利乎！" },
          { t:"line", who:"袁绍", text:"天下健者，岂惟董公！" },
          { t:"narration", text:"绍引佩刀横揖，径出，奔冀州。伍琼、周毖说卓曰：绍惧罪出奔，非有他志，急购之，势必为变。" },
          { t:"narration", text:"卓乃拜绍为渤海太守。绍受命之郡，河北之豪杰稍稍归之。" },
          { t:"inner", who:"袁绍", text:"洛阳不可留；河北士众，可因之而起。" },
          { t:"history", text:"卓按剑叱绍曰：竖子敢然！天下之事，岂不在我？我欲为之，谁敢不从！尔谓董卓刀为不利乎！绍曰：天下健者，岂惟董公！引佩刀横揖径出。", src:"《后汉书·袁绍传》" }
        ],
        choice: {
          prompt: "董卓议废立，绍当如何？",
          options: [
            { text:"横刀长揖而出，奔冀州", reply:"一揖之间，关东之义帜已植。", inner:"与其屈于暴人之朝，不如起兵于外。", effect:{ morale:6, flag:"benjizhou" } },
            { text:"屈从朝议，留任京师", reply:"绍留而不去，卓用其名而夺其实，渤海之任反出卓手。", effect:{ troops:200, morale:-4, flag:"liuluo_s" } }
          ]
        }
      },
      {
        id: "yuanshao_c3",
        no: 3,
        title: "关东盟主",
        year: 190,
        place: "河内",
        trigger: { turn: 10 },
        scene: [
          { t:"narration", text:"初平元年正月，关东州郡同时起兵讨卓，推绍为盟主。" },
          { t:"narration", text:"绍自号车骑将军，与河内太守王匡屯河内；韩馥留邺给军粮，袁术屯鲁阳，曹操、孙坚各引兵西向。" },
          { t:"line", who:"袁绍", text:"卓挾天子而焚宫阙，天下共讨之。所患不在卓，而在诸军之不齐。" },
          { t:"narration", text:"卓乃斩周毖、伍琼，焚洛阳，迁都长安。关东诸军观望，莫敢先进。" },
          { t:"narration", text:"曹操追卓，败于汴水；孙坚破卓军于阳人；绍令王匡进兵河阳津，亦为卓所破。" },
          { t:"narration", text:"绍与袁术各树党与：术连公孙瓒、陶谦，绍连曹操、刘表，兄弟遂成敌国。" },
          { t:"inner", who:"袁绍", text:"卓虽强，关东之众足以制之；所患者，吾家公路耳。" },
          { t:"history", text:"绍遂以勃海起兵，将以诛卓。……绍自号车骑将军，领司隶校尉，为盟主。", src:"《三国志·袁绍传》" }
        ],
        choice: {
          prompt: "盟主之号既立，绍当何以为天下倡？",
          options: [
            { text:"自号车骑将军，屯河内以临洛阳", reply:"河内之师不出，卓遂得从容焚宫西迁。", effect:{ troops:600, morale:4, flag:"mengzhu" } },
            { text:"促诸军急进，先入洛阳", reply:"诸军观望，独曹操、孙坚先进，汴水一战而败，然忠义之名归绍。", inner:"名分在我，进退由我。", effect:{ enemyTroops:-800, morale:-2, flag:"jijin" } }
          ]
        }
      },
      {
        id: "yuanshao_c4",
        no: 4,
        title: "冀州牧",
        year: 191,
        place: "邺",
        trigger: { year: 191 },
        scene: [
          { t:"narration", text:"绍为盟主，兵粮仰给于韩馥。馥惧绍夺其州，稍减军粮，绍怒。" },
          { t:"narration", text:"逢纪、荀谌说馥曰：公孙瓒乘胜南来，诸郡应之；袁车骑引军东向，其意未可量。不如举冀州以让袁氏。" },
          { t:"line", who:"荀谌", text:"袁氏四世三公，门生故吏遍天下；与其并力而抗之，孰若举州以顺之。" },
          { t:"narration", text:"长史耿武、别驾闵纯谏不听，馥遂让州。绍领冀州牧，承制以馥为奋武将军。" },
          { t:"narration", text:"绍与韩馥建议，以刘虞为帝，以抗董卓所立之子。袁术不肯。" },
          { t:"line", who:"袁术", text:"天子聪睿，非董卓所能幽；袁氏世为汉臣，何为更立！" },
          { t:"narration", text:"刘虞亦拒不从。绍、术兄弟由是不睦，各拥兵于河北、淮南之间。" },
          { t:"inner", who:"袁绍", text:"得冀州，则河北之势成；然公路不肯同盟，吾家之内先有敌矣。" },
          { t:"history", text:"绍遂领冀州牧，承制以馥为奋武将军。", src:"《三国志·袁绍传》" }
        ],
        choice: {
          prompt: "韩馥让州、刘虞之议，绍当如何布局？",
          options: [
            { text:"受冀州而厚待韩馥，兼联刘虞以自重", reply:"河北之众尽归绍，而术与绍自此决裂。", effect:{ troops:1200, gold:500, morale:4, flag:"lingjizhou" } },
            { text:"兼弱攻昧，急夺其兵", reply:"馥自疑而死，河北士人侧目，耿武、闵纯之名遂播于敌国。", effect:{ troops:1500, morale:-5, flag:"duozhou" } }
          ]
        }
      },
      {
        id: "yuanshao_c5",
        no: 5,
        title: "界桥",
        year: 191,
        place: "界桥",
        trigger: { battleWin: 2 },
        scene: [
          { t:"narration", text:"公孙瓒以从弟公孙越之死怨绍，遂举兵南向，托名讨绍，冀州郡县多叛绍而应瓒。" },
          { t:"narration", text:"瓒以白马义从数千为骑，步骑数万，锋至界桥。绍令麴义逆之，自率大军为后继。" },
          { t:"line", who:"麴义", text:"骑来必乘吾阵，请以强弩八百伏楯下当之；弩发，骑必乱。" },
          { t:"narration", text:"瓒骑至，义兵伏楯下不动，未至数十步，同时俱起，扬尘大叫，直前冲突，强弩雷发，所中必倒。" },
          { t:"narration", text:"白马义从大败，步阵亦溃。绍军追至巨马水，斩其所署冀州刺史严纲，瓒退还幽州。" },
          { t:"line", who:"袁绍", text:"河北之众，自今可一矣。" },
          { t:"inner", who:"袁绍", text:"麴义能战而骄，胜之亦不可久假以兵。" },
          { t:"history", text:"绍令麴义以八百兵为先登，强弩雷发，大破瓒众于界桥，临阵斩其所署冀州刺史严纲。", src:"《后汉书·公孙瓒传》" }
        ],
        choice: {
          prompt: "界桥既胜，绍当如何用兵？",
          options: [
            { text:"以麴义八百强弩为先登，自率大军继之", reply:"强弩一鼓，白马义从俱溃，河北之望归绍。", inner:"胜在制骑，不在众多。", effect:{ troops:800, morale:8, flag:"jieqiao" } },
            { text:"分兵绕袭幽州本土，断瓒归路", reply:"瓒军闻后方有警，退保范阳，绍虽得郡县，士卒亦疲。", effect:{ enemyTroops:-1000, troops:-200, morale:2, flag:"xihou" } }
          ]
        }
      },
      {
        id: "yuanshao_c6",
        no: 6,
        title: "鲍丘",
        year: 195,
        place: "鲍丘",
        trigger: { year: 195 },
        scene: [
          { t:"narration", text:"公孙瓒既杀刘虞，虞之从事鲜于辅、阎柔等欲报仇，合乌桓峭王等，迎刘虞之子刘和，与绍将麴义连兵十万。" },
          { t:"narration", text:"绍与之并力，破公孙瓒于鲍丘，斩首二万余。瓒退还易京，筑楼堞自守，不复出战。" },
          { t:"line", who:"袁绍", text:"瓒守孤城，如困兽耳。徐图之，不必急也。" },
          { t:"narration", text:"麴义自恃前功，骄纵难制，绍召而杀之，并其众。" },
          { t:"narration", text:"绍于是结乌桓、抚幽州降者，青、幽之郡县次第归命。" },
          { t:"inner", who:"袁绍", text:"河北将帅惟吾令是从，乃可久；骄将虽能战，不可留。" },
          { t:"history", text:"鲜于辅、阎柔等合乌桓峭王及绍将麴义，破瓒于鲍丘，斩首二万余。", src:"《后汉书·公孙瓒传》" },
          { t:"history", text:"义后矜功骄纵，绍召而杀之，并其众。", src:"《后汉书·袁绍传》" }
        ],
        choice: {
          prompt: "幽州未下，绍当何以取之？",
          options: [
            { text:"合鲜于辅、阎柔与乌桓峭王，共破公孙瓒", reply:"鲍丘一战，幽州诸郡皆下，乌桓亦受绍之号令。", effect:{ enemyTroops:-2000, troops:500, morale:4, flag:"hewuwan" } },
            { text:"以河北之兵独取幽州", reply:"绍军独进，士卒多伤，瓒得以余众退保易京。", effect:{ troops:-600, morale:5, flag:"duqu" } }
          ]
        }
      },
      {
        id: "yuanshao_c7",
        no: 7,
        title: "迎与不迎",
        year: 196,
        place: "邺",
        trigger: { year: 196 },
        scene: [
          { t:"narration", text:"董卓既死，李傕、郭汜相攻，天子东归。至洛阳，宫室烧尽，百官披荆棘，依墙壁间。" },
          { t:"narration", text:"沮授说绍曰：宜迎大驾，安宫邺都，挟天子以令诸侯，畜士马以讨不庭。" },
          { t:"line", who:"沮授", text:"今迎朝廷，至义也，又于时宜大计也。若不早图，必有先之者矣。" },
          { t:"line", who:"郭图", text:"若迎天子以自近，动辄表闻；从之则权轻，违之则拒命，非计之善者也。" },
          { t:"narration", text:"绍久不能决。曹操遂迎帝于洛阳，迁都于许，收河南之地，自是朝命皆出曹氏。" },
          { t:"line", who:"袁绍", text:"许都之诏，自今皆出于曹氏之手矣。" },
          { t:"inner", who:"袁绍", text:"吾为盟主而失天下之柄，悔之何及。" },
          { t:"history", text:"沮授说绍，宜迎大驾，安宫邺都；郭图、淳于琼以为不可。绍不从，曹操遂迎天子都许。", src:"《三国志·袁绍传》裴松之注引《献帝传》" }
        ],
        choice: {
          prompt: "天子东归无依，迎与不迎，决于今日。",
          options: [
            { text:"迎天子于邺，奉以号令天下", reply:"天子在邺，绍以朝命征四方，曹操之势遂抑，河北名正而言顺。", inner:"名器所在，即天下所归。", effect:{ morale:10, gold:-400, flag:"yingtianzi" } },
            { text:"不迎天子，专以河北自固", reply:"天子入许，诏书日下；绍每受诏则权轻，违之则拒命，名分始屈。", effect:{ troops:800, morale:-6, flag:"butianzi" } }
          ]
        }
      },
      {
        id: "yuanshao_c8",
        no: 8,
        title: "易京",
        year: 199,
        place: "易京",
        trigger: { year: 199 },
        scene: [
          { t:"narration", text:"公孙瓒据易京，为高楼十余重，积谷三百万斛，欲待天下之变。" },
          { t:"narration", text:"绍遣诸将围之，为地道穿其楼下，引火焚之，楼倾堞陷。" },
          { t:"narration", text:"瓒自知必败，尽杀其妻子姊妹，引火自焚。绍悉定幽州。" },
          { t:"narration", text:"于是绍尽有冀、青、幽、并四州，众数十万，河北士民多归之。" },
          { t:"line", who:"袁绍", text:"河北既定，当南向以争天下。" },
          { t:"inner", who:"袁绍", text:"曹孟德昔为我友，今据河南，终非池中之物。" },
          { t:"history", text:"瓒乃尽杀其妻子，引火自焚。绍悉定幽州。", src:"《后汉书·公孙瓒传》" },
          { t:"history", text:"绍既并四州之地，众数十万，于是简精卒十万，骑万匹，将攻许。", src:"《三国志·袁绍传》" }
        ],
        choice: {
          prompt: "河北既定，易京之众与积谷当如何处置？",
          options: [
            { text:"抚辑幽冀士民，收其贤俊", reply:"河北人安，豪杰乐为绍用，四州之赋足以支大军。", inner:"土地易取，人心难收。", effect:{ morale:8, gold:-300, flag:"anmin" } },
            { text:"尽取易京积谷以实军资", reply:"仓廪充实，幽州士民缺食者众，怨言及于邺下。", effect:{ food:1500, morale:-4, flag:"qugu" } }
          ]
        }
      },
      {
        id: "yuanshao_c9",
        no: 9,
        title: "官渡",
        year: 200,
        place: "官渡",
        trigger: { year: 200 },
        scene: [
          { t:"narration", text:"绍简精卒十万、骑万匹，进军黎阳；曹操以兵万余拒之于官渡。" },
          { t:"narration", text:"绍遣颜良攻白马，曹操用荀攸之谋，关羽斩良于万众之中；绍渡河，文丑又败死于延津。" },
          { t:"line", who:"沮授", text:"北兵虽多而果劲不及南军，南军谷少而货财不及北军。宜以久持之，不宜急战。" },
          { t:"narration", text:"绍从郭图之言，急攻曹营，不能拔，士卒疲于矢石。" },
          { t:"narration", text:"许攸家犯法，审配收系之，攸怒，夜奔曹操，劝袭乌巢。操亲率步骑五千，夜至，放火，烧其辎重。" },
          { t:"narration", text:"绍遣张郃、高览攻曹营，闻乌巢已破，二人焚烧攻具，降于曹操。" },
          { t:"inner", who:"袁绍", text:"兵多而不一，谋多而不决。此吾之病也。" },
          { t:"history", text:"绍众大溃，绍与谭单骑退渡河，余众伪降，尽坑之，前后所杀八万人。", src:"《三国志·武帝纪》" },
          { t:"history", text:"绍将张郃、高览闻乌巢破，遂焚攻具，降于太祖。", src:"《三国志·张郃传》" }
        ],
        choice: {
          prompt: "官渡相持，绍当从谁之计？",
          options: [
            { text:"从沮授之言，以持久疲曹，不急于战", reply:"两军相持逾岁，曹操粮尽欲退；绍持重不进，官渡之败遂免。", inner:"南军利在速战，我军利在持久。", effect:{ enemyTroops:-1200, morale:5, flag:"chijiu" } },
            { text:"从郭图之言急攻曹营，且听许攸之策", reply:"乌巢火起，张郃、高览北面而降，绍单骑渡河，八万众没于河南。", inner:"决胜在一日，岂可坐待其疲。", effect:{ troops:-3000, morale:-12, flag:"jiaozhan" } }
          ]
        },
        penalty: { morale: -4 }
      },
      {
        id: "yuanshao_c10",
        no: 10,
        title: "忧死",
        year: 202,
        place: "邺",
        trigger: { year: 202 },
        scene: [
          { t:"narration", text:"建安六年，曹操击绍于仓亭，绍大败，河北震骇，郡县多叛。" },
          { t:"inner", who:"袁绍", text:"河北四州，吾身所定；唯诸子不相能，此吾之隐忧。" },
          { t:"narration", text:"七年五月，绍发病呕血，卒于邺。河北之人，莫不流涕。" },
          { t:"narration", text:"审配、逢纪矫绍遗命，立少子袁尚，长子袁谭自号车骑将军，屯黎阳，兄弟遂相攻。" },
          { t:"narration", text:"谭求援于曹操，曹操乘之；建安九年八月入邺，审配被擒，意气壮烈，终无降辞，遂死。" },
          { t:"line", who:"审配", text:"我主在北，终不南面事人。" },
          { t:"narration", text:"袁尚走幽州依袁熙。建安十二年，曹操破乌桓于柳城，尚、熙奔辽东，为公孙康所杀。" },
          { t:"history", text:"绍自军败后发病，七年，忧死。", src:"《三国志·袁绍传》" },
          { t:"history", text:"绍外宽内忌，好谋无决，有才而不能用，闻善而不能纳；废嫡立庶，舍礼崇爱，至于后嗣颠蹙，社稷倾覆，非不幸也。", src:"《三国志·袁绍传》陈寿评" }
        ],
        choice: {
          prompt: "绍病且笃，嗣子当立谁？",
          options: [
            { text:"立长子袁谭，以审配、逢纪辅之", reply:"谭既立，尚出屯黎阳，兄弟之兵交于邺下。", effect:{ morale:2, flag:"litan" } },
            { text:"以少子袁尚为嗣，付审配、逢纪", reply:"尚立而谭不服，河北之内先自相攻，曹操遂得乘之。", effect:{ troops:-800, morale:-5, flag:"lishang" } }
          ]
        }
      }
    ],
    endings: {
      win: {
        title: "四世三公，遂有天下",
        text: "建安十三年，绍以河北之师南渡，官渡既捷，河南州郡望风而下；又西定关中，南收荆扬，天下混一。绍定都于邺，受汉禅，改元绍汉，国号仍汉，示不改先世之统。其崩也，谥曰武皇帝，庙号高祖。功臣沮授为太尉，田丰为御史大夫，审配为司隶校尉，逢纪、郭图、许攸皆为九卿，张郃、高览为车骑、骠骑将军，颜良、文丑皆封列侯。史臣曰：袁氏四世三公，门生故吏遍天下，绍承其世资，鹰扬河朔，终以河北之众定海内，门第之盛，秦汉以来未之有也。"
      },
      lose: {
        title: "审配死节，尚熙奔乌桓",
        text: "建安七年五月，绍以仓亭之败发病呕血，卒于邺。未几，审配、逢纪矫遗命立袁尚，袁谭自号车骑将军，兄弟相攻，河北遂裂。建安九年八月，曹操入邺，审配被擒，意气壮烈，终无降辞，遂斩之。袁尚北走依袁熙；建安十二年，曹操破乌桓于柳城，尚、熙奔辽东，为公孙康所杀，袁氏之祀遂绝。陈寿评曰：绍外宽内忌，好谋无决，有才而不能用，闻善而不能纳，废嫡立庶，舍礼崇爱，至于后嗣颠蹙，社稷倾覆，非不幸也。河北四州之强，亡于兄弟之隙。"
      }
    }
  },
  "yuanshu": {
    key: "yuanshu",
    group: "xiaoxiong",
    entry: "yuanshu",
    name: "袁术",
    title: "仲家之僭",
    tagline: "玉玺在手，帝号加身而众叛亲离",
    start: { year: 189, place: "洛阳", capital: "luoyang" },
    chapters: [
      {
        id: "yuanshu_c1",
        no: 1,
        title: "虎贲出奔",
        year: 189,
        place: "洛阳",
        trigger: { start: true },
        scene: [
          { t:"narration", text:"袁术，字公路，司空袁逢之子，绍之从弟也。灵帝时为虎贲中郎将，宿卫宫省。" },
          { t:"narration", text:"灵帝崩，何进见杀，术与袁绍、吴匡等勒兵入宫，烧南宫，尽诛宦官，死者二千余人。" },
          { t:"narration", text:"董卓入洛，议废立，以术为后将军，欲羁縻袁氏。" },
          { t:"line", who:"袁术", text:"卓狼戾无道，吾袁氏世为汉臣，岂可与竖子同列！" },
          { t:"narration", text:"术惧祸，弃官出奔南阳。术与绍，一为虎贲中郎将，一为司隶校尉，同为袁氏之望，而各怀异志。" },
          { t:"inner", who:"袁术", text:"吾兄为渤海，我为南阳。袁氏之兴，岂独属于绍。" },
          { t:"history", text:"董卓之将废帝，以术为后将军；术惧祸，出奔南阳。", src:"《后汉书·袁术传》" }
        ],
        choice: {
          prompt: "卓授后将军以羁縻袁氏，术当如何？",
          options: [
            { text:"不受卓命，出奔南阳，外结孙坚", reply:"术既出洛，南阳之众与孙坚之兵合，关东讨卓之军多倚其粮。", inner:"受卓之官，则终身在其掌中。", effect:{ troops:600, morale:4, flag:"bennanyang" } },
            { text:"暂受朝命，徐观其变", reply:"术受后将军而不出，卓以术为质于洛，袁氏之名稍损。", effect:{ gold:400, morale:-4, flag:"shouhoupang" } }
          ]
        }
      },
      {
        id: "yuanshu_c2",
        no: 2,
        title: "鲁阳",
        year: 190,
        place: "鲁阳",
        trigger: { turn: 8 },
        scene: [
          { t:"narration", text:"关东州郡起兵讨卓。南阳太守张咨不给孙坚军粮，坚诱而斩之；术遂与坚合势。" },
          { t:"narration", text:"术表孙坚行破虏将军、领豫州刺史。坚进屯鲁阳，为讨卓之锋，鲁阳之师皆仰术之粮。" },
          { t:"line", who:"孙坚", text:"卓挾天子焚宫阙，天下共诛之。公路肯给军粮，坚当为诸军先。" },
          { t:"narration", text:"绍与韩馥议立刘虞为帝，术不肯，绍、术由是有隙，各树党与。" },
          { t:"line", who:"袁术", text:"天子聪睿，非董卓所能幽；袁氏世为汉臣，何为更立！" },
          { t:"narration", text:"术连公孙瓒、陶谦，绍连曹操、刘表，兄弟之兵交于天下。" },
          { t:"inner", who:"袁术", text:"绍欲立虞以藉其名，吾若从之，终身居其下矣。" },
          { t:"history", text:"术表坚行破虏将军，领豫州刺史。……绍与术有隙，各树党与。", src:"《三国志·孙破虏传》《后汉书·袁术传》" }
        ],
        choice: {
          prompt: "绍、术兄弟交恶，北方已分二党。术当何以自处？",
          options: [
            { text:"表孙坚为破虏将军、领豫州刺史，共讨董卓", reply:"孙坚破卓军于阳人，斩华雄；术之名亦播于关东。", inner:"借坚之锋以取名，胜于自将。", effect:{ troops:700, morale:5, flag:"yongsun" } },
            { text:"留坚守南阳，结刘表以自固", reply:"坚不得西进，关东之军失利；而刘表亦终不为术用。", effect:{ gold:500, enemyTroops:-300, flag:"guonanyang" } }
          ]
        }
      },
      {
        id: "yuanshu_c3",
        no: 3,
        title: "南阳之败",
        year: 192,
        place: "陈留",
        trigger: { year: 192 },
        scene: [
          { t:"narration", text:"初平三年，孙坚攻刘表，战殁于岘山。术失劲将，南阳之众始衰。" },
          { t:"narration", text:"刘表断术粮道，曹操与袁绍合势相迫。术引兵入陈留，屯封丘，黑山贼及南匈奴於夫罗等佐之。" },
          { t:"narration", text:"曹操击破之，术走襄邑，又走九江，南阳之地尽失，部曲多散。" },
          { t:"line", who:"袁术", text:"绍与曹操连兵，不复念同姓之亲。吾兄弟之情，至此尽矣。" },
          { t:"narration", text:"术既失南阳，乃南取九江，屯寿春，就淮南之粮以自养。" },
          { t:"inner", who:"袁术", text:"失南阳，则无根本；淮南之富，或可再图。" },
          { t:"history", text:"术引军入陈留，屯封丘，黑山贼及於夫罗等佐之。太祖击破之，术走襄邑，遂走九江。", src:"《三国志·武帝纪》" }
        ],
        choice: {
          prompt: "南阳已失，术当何往？",
          options: [
            { text:"东据九江、寿春，就淮南之粮", reply:"淮南富实，术得养兵数万，然士民苦其征敛。", effect:{ troops:500, gold:600, flag:"baoshouchun" } },
            { text:"还保宛城，与刘表相持", reply:"宛城残破，粮运不继，士卒饥散者过半。", effect:{ troops:-600, morale:-3, flag:"baowan" } }
          ]
        }
      },
      {
        id: "yuanshu_c4",
        no: 4,
        title: "传国玺",
        year: 195,
        place: "寿春",
        trigger: { year: 195 },
        scene: [
          { t:"narration", text:"术据九江，屯寿春，领扬州事，淮上豪杰稍稍归之。" },
          { t:"narration", text:"术遣孙策攻庐江太守陆康，围之二年，城陷，陆康病卒；术以孙策为折冲校尉。" },
          { t:"narration", text:"策遂渡江，定江东诸郡，众数万，术不能制。" },
          { t:"narration", text:"初，孙坚入洛阳，得汉传国玺于城南甄官井中。术闻之，拘孙坚之妻，夺其玺。" },
          { t:"line", who:"袁术", text:"此物归我，天意可知。" },
          { t:"narration", text:"术阴有僭号之意，宫室车服渐逾其制，淮南百官皆承其意。" },
          { t:"inner", who:"袁术", text:"袁氏出于陈，舜之后也。以黄代赤，德运在吾。" },
          { t:"history", text:"孙坚得传国玺于洛阳城南甄官井中，袁术闻而拘坚妻，夺之。", src:"《后汉书·袁术传》" }
        ],
        choice: {
          prompt: "传国玺既入术手，当如何用之？",
          options: [
            { text:"秘藏于内府，外示恭顺，先取淮南之实", reply:"玺藏而不宣，曹操未有名以讨，淮南得以少安。", inner:"利器不可轻示于人。", effect:{ gold:800, morale:3, flag:"cangxi" } },
            { text:"宣扬符命，示天下以承天之兆", reply:"符命之说遍于淮南，士人多窃议，朝廷亦闻之。", effect:{ morale:6, troops:300, flag:"fuming" } }
          ]
        }
      },
      {
        id: "yuanshu_c5",
        no: 5,
        title: "仲家",
        year: 197,
        place: "寿春",
        trigger: { year: 197 },
        scene: [
          { t:"narration", text:"建安二年春，术以袁氏出陈为舜后，以黄代赤，德运之次，遂僭号称仲家，置公卿百官。" },
          { t:"narration", text:"郊祀天地于寿春，以九江太守为淮南尹，宫室器服皆拟乘舆。" },
          { t:"line", who:"阎象", text:"昔周文王三分天下有其二，以服事殷；明公虽奕世克昌，未若有周之盛。汉室虽微，未若殷纣之暴也。" },
          { t:"narration", text:"术不听。主簿阎象固谏，几为所杀；河内张炯以符命说术，术悦而用之。" },
          { t:"line", who:"袁术", text:"代汉者当涂高。袁氏出于陈，为舜之后，其在我也。" },
          { t:"narration", text:"孙策在江东闻之，以书责术，遂与之绝；曹操亦奉天子之诏，移檄讨术。" },
          { t:"inner", who:"袁术", text:"汉祚已衰，四方无主。吾不当取，谁当取者。" },
          { t:"history", text:"术以袁氏出陈为舜后，以黄代赤，德运之次，遂僭号称仲家。", src:"《后汉书·袁术传》" }
        ],
        choice: {
          prompt: "汉室倾颓，玺在吾手。帝号当称否？",
          options: [
            { text:"僭号称仲家，置百官，郊祀天地", reply:"仲家之号一出，孙策绝之，吕布叛之，曹操得以奉辞伐罪。", inner:"既已至此，不称帝则众散，称帝则名正。", effect:{ troops:800, gold:500, morale:-8, flag:"jianshu" } },
            { text:"缓称帝号，先并淮南、江东以自强", reply:"术不称帝，孙策、吕布犹与通使，曹操无名以讨，淮南得以稍安。", effect:{ morale:5, troops:500, flag:"huancheng" } }
          ]
        }
      },
      {
        id: "yuanshu_c6",
        no: 6,
        title: "蕲阳",
        year: 197,
        place: "寿春",
        trigger: { turn: 30 },
        scene: [
          { t:"narration", text:"术为子求婚于吕布，遣韩胤送女。沛相陈珪说布追还其女，械送韩胤于许，曹操杀之。" },
          { t:"line", who:"袁术", text:"吕布反复小人，吾当以兵取徐州！" },
          { t:"narration", text:"术遣张勋、桥蕤与韩暹、杨奉等七道攻吕布；布用陈珪之谋，策反暹、奉，大破术军于下邳。" },
          { t:"narration", text:"九月，曹操东征术。术闻大军至，弃军渡淮，留桥蕤、李丰、梁纲、乐就等拒之。" },
          { t:"narration", text:"曹操击破蕤等，皆斩之，淮南之众大损。" },
          { t:"line", who:"袁术", text:"曹操挟天子以为名，吾师无名，此所以屡败。" },
          { t:"inner", who:"袁术", text:"江东既绝，徐州既仇，淮南之众日削。" },
          { t:"history", text:"术遣张勋等与韩暹、杨奉将兵攻吕布，布用陈珪之谋，策反暹、奉，大破术军于下邳。", src:"《英雄记》（裴松之注引）" },
          { t:"history", text:"太祖东征术，术闻太祖来，弃军走渡淮，留其将桥蕤、李丰、梁纲、乐就等拒太祖，太祖击破蕤等，皆斩之。", src:"《三国志·武帝纪》" }
        ],
        choice: {
          prompt: "吕布绝婚，曹操东征，术当如何？",
          options: [
            { text:"分七道攻徐州，先破吕布", reply:"七道之兵败于下邳，韩暹、杨奉反为吕布所用，术之精锐尽丧。", effect:{ troops:-1200, morale:-5, flag:"gonglvbu" } },
            { text:"敛兵守淮南，遣使修好吕布、孙策", reply:"术敛兵自守，淮南稍安，而曹操之讨师终不可解。", effect:{ troops:300, gold:-400, morale:3, flag:"shouhuainan" } }
          ]
        }
      },
      {
        id: "yuanshu_c7",
        no: 7,
        title: "日蹙",
        year: 198,
        place: "寿春",
        trigger: { year: 198 },
        scene: [
          { t:"narration", text:"建安三年，曹操围吕布于下邳，术不能救。布破被擒，为曹操所杀。" },
          { t:"narration", text:"孙策既有江东，遂与曹操通，绝术之使，术之南援尽失。" },
          { t:"narration", text:"术以张勋为大将，屡攻庐江、广陵，皆无所得；淮南岁饥，士卒离散。" },
          { t:"narration", text:"术乃欲归帝号于袁绍，遣使告之曰：汉之失天下久矣，袁氏当有天下。" },
          { t:"line", who:"袁术", text:"吾兄据河北四州，若受此号，天下可定。" },
          { t:"narration", text:"绍阴然之，而未敢发；绍子袁谭自青州遣使迎术，术欲北行，道复为曹操所拒。" },
          { t:"inner", who:"袁术", text:"众散食尽，亲族之外，无人可信。" },
          { t:"history", text:"术乃归帝号于绍，绍阴然之。", src:"《后汉书·袁术传》" }
        ],
        choice: {
          prompt: "淮南日蹙，术当何依？",
          options: [
            { text:"归帝号于袁绍，北依袁谭", reply:"术既归号，仲家之名遂虚，部曲益散，北行之路亦塞。", effect:{ troops:-600, morale:-4, flag:"guihaoshao" } },
            { text:"南投雷薄、陈兰于潜山，保淮南余众", reply:"雷薄、陈兰辞以粮食不给，拒不纳术，术进退无所。", effect:{ troops:-800, morale:-6, flag:"nantou" } }
          ]
        }
      },
      {
        id: "yuanshu_c8",
        no: 8,
        title: "江亭呕血",
        year: 199,
        place: "江亭",
        trigger: { year: 199 },
        scene: [
          { t:"narration", text:"建安四年六月，术至江亭，士卒散尽，粮运断绝，坐箦床而叹。" },
          { t:"line", who:"袁术", text:"袁术乃至是乎！" },
          { t:"narration", text:"时盛暑，术欲得蜜浆，问厨下。厨下曰无蜜，仓中亦无麦屑三十斛。" },
          { t:"line", who:"厨下", text:"无蜜浆。" },
          { t:"narration", text:"术叹良久，乃大咤曰：袁术至于此乎！因顿伏床下，呕血斗余而死。" },
          { t:"narration", text:"术既死，其众散归庐江太守刘勋，后孙策破勋，仲家之号遂绝。" },
          { t:"inner", who:"袁术", text:"玉玺在手，终不能换一浆之苦。" },
          { t:"history", text:"术问厨下，厨下曰无蜜浆。时盛暑，欲得蜜浆，又无蜜，坐棂床上，叹息良久，乃大咤曰：袁术至于此乎！因顿伏床下，呕血斗余而死。", src:"《三国志·袁术传》裴松之注引《吴书》" }
        ],
        choice: {
          prompt: "江亭之上，蜜浆不得，术尚可自处乎？",
          options: [
            { text:"尽散余众，归号于绍，以保全袁氏", reply:"术散其众，淮南之地尽入于曹操、孙策之手。", effect:{ morale:-2, flag:"sanju" } },
            { text:"固守寿春，待曹操之隙", reply:"寿春已无粮，守卒夜遁，城旦夕而下。", effect:{ troops:-400, morale:-5, flag:"shoushouchun" } }
          ]
        }
      }
    ],
    endings: {
      win: {
        title: "仲家承天",
        text: "建安十一年，仲家之师北取淮泗，西收江汉，孙策以江东为藩，天下混一。术即皇帝位于寿春，国号仲家，改元天授。其崩也，谥曰昭武皇帝，庙号高祖。功臣张勋为大将军，纪灵为骠骑将军，桥蕤为车骑将军，李丰、梁纲、乐就皆为列侯，张炯为太尉，杨弘为司徒，阎象为谏议大夫。史臣曰：汉火将烬，玉玺出于甄官之井，术以为受命之符，遂以淮南一路之众成混一之功。然其起也以名，其成也以运，君子犹讥其速。"
      },
      lose: {
        title: "江亭呕血，蜜浆不得",
        text: "建安四年六月，术败走至江亭，士卒散尽。时盛暑，欲得蜜浆，问厨下，厨下曰无蜜浆；坐箦床叹息良久，大咤曰袁术至于此乎，顿伏床下，呕血斗余而死。术既死，其众归庐江太守刘勋，后孙策破勋，仲家之号遂绝，传国玺终归他人。陈寿评曰：袁术奢淫放肆，荣不终己，自取之也。起兵十年，地无百里之安，盖以僭号为的，而天下之兵皆赴之。"
      }
    }
  }
};
