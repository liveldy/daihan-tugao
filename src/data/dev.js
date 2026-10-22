/* 《代汉涂高》 — 匠作志略
 * 为制作者而设：架构、数据、资源、工具、扩展之法。
 * 凡游戏之法度与攻略，见「兵书志略」（src/data/wiki.js）；此志所书，皆实现之实。
 * 传统 script 标签数据文件（无 ESM），须能在 file:// 下直接运行。
 */
window.DEV = {
  title: "代汉涂高 · 匠作志略",
  intro: "此志所载，皆制作之事：目录架构、数据契约、图象路径、校验工具与扩展之法。凡玩家所用之兵制、数值与攻略，别见「兵书志略」；二志同出一源，此志详其实现，彼志述其法度。",
  sections: [

    /* ============================ 一、架构与运行 ============================ */
    {
      id: "arch",
      name: "架构与运行",
      entries: [
        {
          id: "run",
          title: "运行方式",
          body: [
            "全作为纯静态页面，零外部依赖：双击 index.html 即可入局，不必安装、不必构建、不必联网。",
            "脚本一律用传统 script 标签按序加载，无 ESM、无打包、无转译；数据文件以 window.XXX = { … } 直书。故 file:// 下亦可运行，代价是全局命名空间共享，加载次序不可乱。",
            "若浏览器对本地文件有限制，起一个静态服务器即可：python -m http.server 8931 --bind 127.0.0.1，再访问 http://127.0.0.1:8931/index.html"
          ],
          list: [
            "index.html —— 主页面（承天受命／演武教战）与对局界面",
            "wiki.html —— 兵书志略（玩法；今十四门，条目数由页面运行时算；页面另有「人物志」一串，由武将数据自动编次）",
            "dev.html —— 匠作志略（本页，制作与实现）"
          ],
          note: "三页互达：主页面「兵书志略」入口通 wiki.html；wiki 页顶栏有「匠作志略」一链通本页；本页顶栏有「兵书志略」与「返回游戏」。",
          src: "README.md · 运行"
        },
        {
          id: "files",
          title: "目录结构",
          body: [
            "三层分明：data 只载事实，core 只载规则，ui 只载呈现；main.js 为入口，tools/ 为离线校验与推演。"
          ],
          table: {
            head: ["路径", "所司"],
            rows: [
              ["index.html", "主页面：承天受命（择主开局）／演武教战（教学）"],
              ["wiki.html", "兵书志略（玩法）独立页"],
              ["dev.html", "匠作志略（本页）独立页"],
              ["assets/style.css", "版式：素纸、墨线、朱印"],
              ["assets/img/", "美术资源：portraits units terrain banners cities，清单见其 MANIFEST.md"],
              ["VERSION", "版本号（四段，单行）——与 version.js、CHANGELOG.md 三者须一致"],
              ["CHANGELOG.md", "改易之目：每版一条，最新者在上"],
              ["src/data/version.js", "版本数据：号、期、名、一句提要、版本之法"],
              ["src/data/map.js", "舆图：30×20 格正六边形地形、96 座城池、25 家势力（含无主）、10 个剧本与其归属"],
              ["src/data/factions.js", "六组十五家二十六君主、各人国策"],
              ["src/data/scenarios_1..3.js", "剧本与关卡数据（分三册）：逐君之局与逐局之关"],
              ["src/data/progress.js", "关卡进度：已克之关与续战之记，存于浏览器本地；另有存档之导出与载入，供云存档之用"],
              ["src/data/account.js", "账号与云存档（正式版）：频道自探、登录与注册、云存档上传下载、版本检查、管理之器与维护轮询"],
              ["src/data/politics_1.js", "朝局数据（分册一）：政争事件、议政之题、储位候选"],
              ["src/data/generals_1..4.js", "武将文臣（分卷）"],
              ["src/data/lore.js", "典籍条目"],
              ["src/data/stories_1..7.js", "二十六条故事线（章回、台词、内心、史注、抉择、成败结局）"],
              ["src/data/wiki.js", "兵书志略条文（玩法）"],
              ["src/data/dev.js", "匠作志略条文（本页）"],
              ["src/core/rules.js", "兵制、地形、相克、伤害与行军"],
              ["src/core/campaign.js", "剧本与关卡之编次：取局、取关、目标之文与目标之判定"],
              ["src/core/politics.js", "朝局：党争、名分、储位、议政、立储、政争事件与每季之消长"],
              ["src/core/engine.js", "回合、征募、行军、野战、攻城、邦交、事件、胜负、关卡之定、朝局之挂点与岁入折损"],
              ["src/core/story.js", "剧情触发与效果"],
              ["src/core/tutor.js", "教战之场：教学十步"],
              ["src/core/ai.js", "诸侯庙算"],
              ["src/ui/art.js", "图象加载：探测与回退"],
              ["src/ui/render.js", "舆图绘事（canvas，六边形）"],
              ["src/ui/ui.js", "界面机杼（含朝局之栏、庙堂三卡、政争之屏、账号与维护之屏）"],
              ["src/ui/reader.js", "志略二页（兵书／匠作）共用之正文渲染"],
              ["src/ui/roster.js", "人物志：依武将数据自动编次，由 wiki.html 于正文渲染前挂入兵书志略"],
              ["src/main.js", "入口：DOM 既备则启动 UI.boot"],
              ["server/server.js", "正式版服务端：静态之站之供应、账号与会话、云存档、版本检查与在线更新、事件流"],
              ["server/lib/store.js", "文件型存储：用户库、令牌、云存档"],
              ["server/lib/update.js", "在线更新之实：检查、暂存、原子替换、回滚与自 Git 取新版"],
              ["server/test.js", "服务端端到端自检"],
              ["tools/", "校验、推演与资源清单（见「工具与自检」）"]
            ]
          },
          src: "README.md · 目录"
        },
        {
          id: "load",
          title: "脚本加载次序",
          body: [
            "index.html 之末按此序加载，先数据、次规则、再界面、终入口。rules.js 与 engine.js 在载入时即取 window.MAP、window.FACTIONS_DATA 之值，故次序一乱即报错。"
          ],
          list: [
            "一、数据：version.js → map.js → factions.js → scenarios_1..3.js → progress.js → account.js → politics_1.js → generals_1..4.js → lore.js → stories_1..7.js → wiki.js／dev.js",
            "二、规则：rules.js → campaign.js → politics.js → engine.js → story.js → tutor.js → ai.js",
            "三、界面：art.js → render.js → ui.js",
            "四、入口：main.js"
          ],
          note: "wiki.html 与 dev.html 只需各自的数据文件（wiki.js／dev.js）、version.js 与 assets/style.css，不载引擎——故二页可在无游戏引擎时单独阅读。",
          src: "index.html；wiki.html；dev.html"
        },
        {
          id: "version",
          title: "版本号之制",
          body: [
            "版本号分四段：主 . 次 . 修订 . 构建。主号表格局之变（舆图、剧本、存档体系），次号表功能之增，修订号表修缺与调平，构建号每提交必增。凡有改动必升版本，不得只改文件而不记于 CHANGELOG.md。",
            "同一版本号须同时出现于三处，缺一不可：仓库根目录的 VERSION 文件（单行纯文本）、src/data/version.js 中 APP_VERSION.version、CHANGELOG.md 最新一条的标题。tools/validate.js 逐条比对，三处不一即判校验未通过。",
            "游戏主页面底栏与志略二页顶栏皆显此号（读 window.APP_VERSION），鼠标悬停可见版本名与提要。"
          ],
          list: [
            "VERSION —— 四段版本号，单行，别无他物",
            "src/data/version.js —— version、date、name、summary、scheme、stage",
            "CHANGELOG.md —— 以「## x.y.z.w — 日期 — 名目」为标题，最新者在上"
          ],
          note: "版本号中最易漏者是 dev.html 与 wiki.html 的顶栏显示：二页须在 reader.js 之前载入 version.js，否则 window.APP_VERSION 取不到，版本位留空而不报错。",
          src: "tools/validate.js · 版本号校验；src/data/version.js"
        },
        {
          id: "convention",
          title: "约定与坑",
          body: [
            "以下数事，皆曾致错，续作者宜先读之。"
          ],
          list: [
            "数据文件写 window.XXX = { … }，不用 ESM；字符串内不得出现 script 的结束标签，否则标签提前闭合、整页皆废",
            "Node 下校验数据，须先造环境 sandbox.window = sandbox，再以 vm.runInContext 执行，否则取不到 window.XXX",
            "城池 id 只能取 src/data/map.js 中 96 个之一；舆图格上的 tile.city 是对象而非 id 字符串，取其 id 须用 tile.city.id（此处曾抛 TypeError 致敌情牌截断）",
            "舆图点击须按 canvas.width / rect.width 换算：画布内部为 1200×694（六边形外框之宽高比所定），屏上被 CSS 缩放，径用 clientX 会误判格子",
            "舆图为尖顶正六边形、奇数行右移半格。邻接与距离只可取自 MAP.neighbors／MAP.dist，不得再用 |dx|+|dy|：四邻写法在本图上是错的（斜向四格亦相邻），且六边距离须先化轴向坐标再取立方距离",
            "兵种数值键有白名单（见「技能数值键白名单」）；白名单外之键虽载于数据，引擎不取",
            "剧情 effect 亦有白名单（见「剧情效果」）；enemyTroops 取负数；{ lost: … } 之写法引擎未实现、永不触发",
            "行尾不一：src/data/stories_7.js 与 tools/sim.js 为 CRLF，其余皆 LF（.gitattributes 定 eol=lf，入库即归一）；以脚本改写文件时须留意"
          ],
          src: "src/core/story.js · applyEffect；src/ui/render.js · hit；tools/validate.js"
        }
      ]
    },

    /* ============================ 二、数据与规范 ============================ */
    {
      id: "data",
      name: "数据与规范",
      entries: [
        {
          id: "data-files",
          title: "数据文件一览",
          body: [
            "各数据文件皆为 window.XXX = { … } 之直书对象；其顶层键如下。"
          ],
          table: {
            head: ["文件", "顶层键", "内容"],
            rows: [
              ["src/data/map.js", "MAP", "W／H／grid（30×20 格正六边形）、TERRAIN、CITIES（96）、FACTIONS（25）、ERAS（10）、ownersOf、neighbors／dist（六邻与六边距离）"],
              ["src/data/factions.js", "FACTIONS_DATA", "GROUPS（6）、ENTRIES（15）、LORDS（26）、MECHS（国策）"],
              ["src/data/scenarios_1..3.js", "CAMPAIGNS／CAMPAIGNS_PART1..3", "剧本与关卡：剧本（id、name、era、year、blurb、stages[]）与关卡（id、name、desc、goal）"],
              ["src/data/progress.js", "PROGRESS", "关卡进度：done／mark／touch／last／stageOpen／scenarioOpen／tally／lordTally／reset／snapshot／restore，存于 localStorage"],
              ["src/data/account.js", "ACCOUNT", "频道自探（probe／refresh）与账号、云存档、版本、管理之器、维护轮询"],
              ["src/data/politics_1.js", "POLITICS", "朝局三段：events（政争）、topics（议政）、heirs（储位候选）"],
              ["src/core/politics.js", "Politics", "朝局之实：init／status／applyEffect／topicsFor／council／candidates／setHeir／checkEvent／resolveEvent／tick"],
              ["src/core/campaign.js", "Campaign", "编次与判定：all／forLord／scenariosOf／scenarioOf／defaultScenario／scenarioIndex／stageOf／stageCount／goalText／goalMet／goalProgress／countOwn"],
              ["src/data/generals_1..4.js", "GENERALS／GENERALS_PART1..4", "武将文臣，按 faction 分组"],
              ["src/data/lore.js", "LORE", "典籍六类条目"],
              ["src/data/stories_1..7.js", "STORIES／STORIES_PART1..7", "故事线、章回、抉择、成败结局"],
              ["src/data/wiki.js", "WIKI", "兵书志略条文"],
              ["src/data/dev.js", "DEV", "匠作志略条文（本页）"]
            ]
          },
          note: "武将分成四卷、故事线分成七卷、剧本分成三册，只为文件大小与分工；载入后由 tools/validate.js 与 src/core/engine.js 的 allGenerals()／src/core/story.js 的 allStories()／src/core/campaign.js 的 Campaign.all() 合并为一体。",
          src: "src/data/*.js；src/core/engine.js · allGenerals；src/core/story.js · allStories；src/core/campaign.js · all"
        },
        {
          id: "schema",
          title: "字段规范",
          body: [
            "新加之数据，须合下列字段；tools/validate.js 会逐项校之。"
          ],
          table: {
            head: ["对象", "关键字段"],
            rows: [
              ["武将", "id、name、zi、faction、stats{lead war int pol cha}、skills[]、bio、impact；生卒年另用 birth／death"],
              ["技能", "name、kind（passive／aura／active）、mod{}、tags[]；主动另用 cd、dur；光环另用 aura 所及"],
              ["城池（map）", "id、name、zhou、kind、level、x、y"],
              ["地形格", "x、y、ch（图例符）、terrain（key）、terrainName、terrainCost、terrainDef、terrainAtk、land、sea、city"],
              ["势力", "name、long、color"],
              ["剧本（era）", "year、title、era（年号）、归属表"],
              ["剧本与关卡", "剧本：id（君主key_年）、name、era、year、blurb、stages[]；关卡：id、name、desc、goal{cities／factions／minCities／turns／unify／open／strife／heir／legit}（末关只作 open；strife／heir／legit 为朝局之志）"],
              ["君主", "name、zi、title、era、faction、capital（须属本势力）、difficulty、difficultyName、mech、tag、intro、goal"],
              ["国策（mech）", "name、desc（引擎另有专判者唯 zhaoshu／renyi）"],
              ["故事线", "id（即君主 key）、group、entry、title、chapters[]、endings{win lose}"],
              ["章回", "title、year、place、trigger{}、scenes[]、choice?、reward?／penalty?"]
            ]
          },
          src: "tools/validate.js"
        },
        {
          id: "id-units",
          title: "兵种 id 与数值",
          body: [
            "十四兵种之 id、数值与标签，为多种判定所依（相克、通行、行耗、征募）。"
          ],
          table: {
            head: ["id", "兵种", "攻", "防", "兵力", "移动", "射程", "标签"],
            rows: [
              ["inf", "郡国兵", "42", "44", "110", "3", "1", "pike"],
              ["spear", "长矛兵", "46", "54", "115", "3", "1", "pike"],
              ["archer", "弓手", "50", "34", "90", "3", "2", "archer"],
              ["pike", "大戟士", "64", "58", "135", "3", "1", "pike、iron"],
              ["crossbow", "连弩士", "62", "36", "95", "2", "2", "crossbow、archer"],
              ["guard", "亲卫", "72", "68", "155", "4", "1", "guard、iron"],
              ["cav", "轻骑", "58", "42", "110", "5", "1", "cavalry"],
              ["heavycav", "甲骑", "74", "60", "145", "4", "1", "cavalry、iron"],
              ["cavarcher", "骑射", "56", "40", "100", "5", "2", "cavalryarcher、cavalry"],
              ["siege", "攻城器械", "86", "30", "125", "2", "2", "siege"],
              ["navy", "楼船", "68", "62", "145", "4", "2", "naval、water"],
              ["transport", "辎重车", "10", "22", "90", "4", "1", "logistics"],
              ["barbcav", "蛮骑", "64", "40", "120", "5", "1", "cavalry、barbarian"],
              ["elephant", "象兵", "80", "62", "175", "3", "1", "barbarian、iron"]
            ]
          },
          note: "id 亦是图象文件名：assets/img/units/<id>.png。",
          src: "src/core/rules.js · UNITS"
        },
        {
          id: "id-terrain",
          title: "地形 key",
          body: [
            "舆图格之 terrain 字段用下列 key，图象亦以此为文件名；另存图例符 ch 一枚，供绘制与图例使用。"
          ],
          table: {
            head: ["key", "图例符", "地形", "行耗", "入图"],
            rows: [
              ["plain", ".", "平原", "1", "是"],
              ["hill", "h", "丘陵", "2", "是"],
              ["mount", "^", "山地", "3", "是"],
              ["forest", "#", "林地", "2", "是"],
              ["marsh", "=", "沼泽", "3", "否（制已备，未入图）"],
              ["desert", "d", "大漠", "2", "是"],
              ["water", "~", "江海", "1", "是"],
              ["ford", "p", "津渡", "1", "否（制已备，未入图）"]
            ]
          },
          note: "图象文件名用 key（如 mount.png）；图例符与通行之制见「兵书志略·舆图与行军」。",
          src: "src/data/map.js · TERRAIN；src/ui/render.js"
        },
        {
          id: "id-city-kind",
          title: "城池 kind",
          body: [
            "城池分六类，等级随类别而定；图象文件名用拼音。"
          ],
          table: {
            head: ["kind", "拼音", "等级"],
            rows: [
              ["都城", "duzhou", "5"],
              ["州治", "zhouzhi", "4"],
              ["重镇", "zhongzhen", "3"],
              ["港口", "gangkou", "3"],
              ["关隘", "guanai", "2"],
              ["县城", "xiancheng", "1"]
            ]
          },
          note: "CITY_KIND 之映射在 src/ui/render.js；「临水可征楼船」与「港口」是两事，前者按相邻四格是否江海判定。",
          src: "src/data/map.js · CITIES；src/ui/render.js · CITY_KIND"
        },
        {
          id: "id-factions",
          title: "势力 key",
          body: [
            "二十五个 key，用于势力数值修正、图象旗名与归属。"
          ],
          list: [
            "汉与群雄：han dong lvbu yuan zhong wei jin shu yi jing hanzhong wu liaodong liang wan xu",
            "黄巾：huangjin",
            "四夷：xianbei wuhuan nanxiong qiang shanyue nanman jiao",
            "无主：neutral"
          ],
          note: "图象文件名即 assets/img/banners/<key>.png；旗色（如汉 #b8352c、魏 #2f4f78、黄巾 #c8a02c）载于 src/data/map.js · FACTIONS。",
          src: "src/data/map.js · FACTIONS；src/core/rules.js · FACTION_MECH"
        },
        {
          id: "id-tags",
          title: "标签白名单",
          body: [
            "技能与兵种所用之 tags，共二十二个；白名单外者校验即报。"
          ],
          list: [
            "faction 与兵种常用：fire water naval cavalry archer pike siege guard iron logistics barbarian cavalryarcher crossbow",
            "其余：ambush rally pursue insight fortify raiding dread scholar ritual"
          ],
          note: "真正入公式者为 naval／water（通行与行耗）、cavalry（平原行耗）、siege（攻城内与入山地）；其余多作标识。",
          src: "tools/validate.js · TAG_KEYS"
        },
        {
          id: "id-mods",
          title: "技能数值键白名单",
          body: [
            "技能之 mod 对象只认下列十六键，其余虽写亦不入公式。"
          ],
          list: [
            "atk def move range hp",
            "gold food recruit morale",
            "siege citydef heal xp vision",
            "landmove watermove"
          ],
          src: "tools/validate.js · MOD_KEYS"
        },
        {
          id: "id-effects",
          title: "剧情效果",
          body: [
            "章回之 choice.effect 与章末 reward／penalty，只认下列键（十三种）。"
          ],
          list: [
            "gold food —— 增减府库",
            "troops morale —— 补员与士气",
            "flag clearFlag —— 立或除标记",
            "unlockGeneral —— 某将来归，为在野",
            "loreEntry —— 解锁典籍一条",
            "captureCity —— 某城归附",
            "freeUnit{type,count} —— 按城数布新军",
            "enemyTroops —— 负数则敌军减员（单部以最大兵力六成为限）",
            "relation —— 数为威望，对象为邦交",
            "disaster —— 立灾异之记"
          ],
          note: "标记（flag）是故事线之内线：一抉择所立之 flag，往往在十数回合之后成为某章之触发或另一抉择之条件。",
          src: "src/core/story.js · applyEffect"
        }
      ]
    },

    /* ============================ 三、图象资源 ============================ */
    {
      id: "art",
      name: "图象资源",
      entries: [
        {
          id: "art-overview",
          title: "如何自行添加美术资源",
          body: [
            "图象资源一律自制，放进对应目录即自动生效；缺图则回退为原有的文字与矢量绘制，不报错、不占位、不留白框。",
            "其派生之法为一律：有图则显示图，无图则回退到原有的文字／图形绘制。故加图不必改代码，撤图亦不会报错；目录可只建其一，其余仍以原绘呈之。",
            "此派生之法实现在 src/ui/art.js：逐后缀探测，未就绪或缺图者一律回退原绘；图既就绪即以 onChange 回调重绘舆图。"
          ],
          list: [
            "五类目录：assets/img/portraits、assets/img/units、assets/img/terrain、assets/img/banners、assets/img/cities",
            "命名一律用小写的 id／key，不加前缀后缀（如 cao_cao.png、inf.png、mount.png）",
            "后缀依 .png → .jpg → .webp 之序探测，先找到的先生效",
            "图片自带透明或用素底，画风以素纸墨线为宜"
          ],
          src: "src/ui/art.js"
        },
        {
          id: "art-portraits",
          title: "人物头像",
          body: [
            "路径：assets/img/portraits/<武将id>.png",
            "例：assets/img/portraits/cao_cao.png、assets/img/portraits/jiang_wei.png",
            "君主另有后备：assets/img/portraits/<君主key>.png（如 zhangjiao.png），找不到君主 key 的图时，回退找该君主对应的武将 id（如 cao_cao.png）。",
            "用途：择主界面的君主头像、侧栏「军情／人物」页的人物卡、舆图上该将所统部队的圆徽。",
            "建议：128×128 或 256×256 正方，正面半身，背景透明或素底。"
          ],
          note: "调用处为 src/ui/ui.js · avatarOf 与 src/ui/render.js · drawUnit；舆图上圆裁（clip）后绘制。",
          src: "src/ui/art.js · avatar；src/ui/ui.js；src/ui/render.js"
        },
        {
          id: "art-units",
          title: "部队旗帜／兵种图",
          body: [
            "路径：assets/img/units/<兵种id>.png",
            "兵种 id 共 14 个：inf spear archer pike crossbow guard cav heavycav cavarcher siege navy transport barbcav elephant",
            "用途：舆图上部队标记底图（无该将头像时按兵种取图）。",
            "建议：64×64，正方形，主体居中。"
          ],
          note: "兵种 id 之中文名见「兵种 id 与数值」一表。优先级为：头像图 → 兵种图 → 势力旗图 → 势力色圆徽。",
          src: "src/ui/art.js · get；src/ui/render.js · drawUnit"
        },
        {
          id: "art-terrain",
          title: "地形贴图",
          body: [
            "路径：assets/img/terrain/<地形key>.png",
            "地形 key：plain hill mount forest marsh desert water ford",
            "用途：舆图上平铺在对应格子（无图则用原有的矢量线与点纹理）。",
            "建议：80×80 或与格宽一致的正方形，可无缝平铺。"
          ],
          note: "本图实际用到的是 plain、hill、mount、forest、water、desert 六种，marsh 与 ford 二种为将来留用（其通行与攻守之制已备）。",
          src: "src/data/map.js；src/ui/render.js · drawTerrain"
        },
        {
          id: "art-banners",
          title: "势力旗（可选）",
          body: [
            "路径：assets/img/banners/<势力key>.png",
            "势力 key 见游戏内 25 家：han dong lvbu yuan zhong wei jin shu yi jing hanzhong wu liaodong liang wan xu huangjin xianbei wuhuan nanxiong qiang shanyue nanman jiao neutral",
            "用途：舆图上本部部曲的徽记（无头像图时以旗代徽，圆裁同头像），及侧栏军情、人物、敌情诸处的旗帜。",
            "建议：32×32。"
          ],
          note: "缺图时舆图上即以此色绘城绘军；旗色之数（如汉 #b8352c、魏 #2f4f78、黄巾 #c8a02c）载于 src/data/map.js · FACTIONS。",
          src: "src/ui/art.js；src/ui/ui.js · flagOf；src/ui/render.js · drawUnit"
        },
        {
          id: "art-cities",
          title: "城池（可选）",
          body: [
            "路径：assets/img/cities/<kind>.png",
            "kind 共 6 种：都城／州治／重镇／县城／关隘／港口（文件名用拼音：duzhou zhouzhi zhongzhen xiancheng guanai gangkou）。",
            "用途：舆图上城池图形。建议 48×48。"
          ],
          note: "六类城池之等级与守备见「兵书志略·城池与经略」节。",
          src: "src/ui/render.js · drawCity"
        },
        {
          id: "art-suffix",
          title: "后缀探测与回退",
          body: [
            "后缀支持 .png → .jpg → .webp，按此顺序探测，先找到的先生效。",
            "故同一图可同时备三种而不会冲突；改换格式只须删除旧格式之文件，不必改代码。",
            "舆图用同步取图（Art.get）：未就绪时返回 null，调用处即绘原文字或原图形，图加载完毕再重绘一次；界面用 Art.avatar 造占位，得图后再就地换入（详见下条）。"
          ],
          src: "src/ui/art.js · get／avatar／onChange"
        },
        {
          id: "art-noblank",
          title: "缺图不留空框之策",
          body: [
            "旧法之弊：Art.avatar 先造 <img> 再等失败，三次请求（.png／.jpg／.webp）皆 404 后方才摘图换文字。于是每行**每次重绘**都先冒出一个空头像框，须三请而后换——侧栏遂成片闪烁；且旧名时时重试，重绘愈多则无用请求愈多。",
            "今法三条：一、只认**确证已得**之图（Art.has）；未就绪者**立刻**以文字旗绘出，绝不留空框。二、图既得，就地把该框内容换为图，不必整屏重绘。三、**探测有节**：同类同时至多探四名、全局至多十六名，余者入队依次探之，免得一面之绘同时抛出数百请求。",
            "**每一名字仍只试一次**（试过即入缓存，无论中与不中）：故纵使美术未装，亦只是渐次试、非风暴；纵使只装了少数几张图，亦必被寻得，绝不因省事而漏图。此与「放进去即生效」之旨不悖，不必另跑工具或另加标记文件。",
            "缺图而又无可备之文字者（如择主界面的君主头像），其框加 avatar-empty 一类，一并隐去，不留空格。"
          ],
          list: [
            "Art.avatar(kind, names, cls, fallback)：names 为候选名之序（如 [君主key, 武将id]），逐一试之",
            "Art.stats()：缓存数、在探数、待探数之目，供调试",
            "Art.reset()：尽弃缓存与队列，一切重探（改图后可于控制台一呼）"
          ],
          note: "实测（美术未装之时）：旧法首次绘一面 352 次失败请求，其后十五次重绘又 193 次而 146 次为重复；新法首次 264 次、其后 102 次而重复为零。",
          src: "src/ui/art.js · avatar／has／probe／settle／drain；assets/style.css · .avatar-empty"
        },
        {
          id: "art-manifest",
          title: "图象清单之生成",
          body: [
            "全部应备文件名、建议尺寸与各 id 清单，皆由 tools/art_manifest.js 自数据推出，写入 assets/img/MANIFEST.md。",
            "数据一变（如新增武将、势力、兵种、城池），重跑一次即可刷新清单。"
          ],
          list: [
            "命令：node tools/art_manifest.js",
            "输出：assets/img/MANIFEST.md，并预建 portraits／units／terrain／banners／cities 五个目录"
          ],
          src: "tools/art_manifest.js"
        }
      ]
    },

    /* ============================ 四、实现对照 ============================ */
    {
      id: "impl",
      name: "实现对照",
      entries: [
        /* ===IMPL-BEGIN=== */
        {
          "id": "impl-basics",
          "title": "起手",
          "body": ["「兵书志略」起手一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["主页面三入口与教战之场", "index.html · mainMenu；src/core/tutor.js；wiki.html"],
              ["择主与开局", "src/ui/ui.js · buildTitle／startGame；src/core/engine.js · newGame"],
              ["择主牌面所载", "src/data/factions.js · GROUPS／ENTRIES／LORDS"],
              ["顶栏", "src/ui/ui.js · draw（resources 与 clock）／drawObjective（本关目标之栏）"],
              ["舆图与三色", "src/ui/ui.js · onTile／select／hint；src/ui/render.js · draw／hit"],
              ["侧栏五页签", "src/ui/ui.js · renderTab／renderArmy／renderCity／renderWho／renderBook／renderLog"],
              ["一回合为一季，四时成岁", "src/core/engine.js · startTurn／endTurn／maybeWanderers"],
              ["胜负条件", "src/core/engine.js · captureCity／checkDefeat；src/ui/ui.js · showEnding"],
              ["键位与鼠标", "src/ui/ui.js · wire（keydown／contextmenu）"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-stages",
          "title": "剧本与关卡",
          "body": ["「兵书志略」剧本与关卡一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["一君多局，一局多关", "src/data/scenarios_1..3.js（分三册）；src/core/campaign.js · all／forLord／scenariosOf／scenarioOf／defaultScenario／scenarioIndex；src/ui/ui.js · renderCampaign／chosenScenario"],
              ["逐关之志", "src/core/campaign.js · goalText／goalMet／goalProgress；src/core/engine.js · checkStage／goalStatus"],
              ["末关无定式", "src/core/engine.js · checkStage（open 者不判）与 captureCity（尽有全图则一统）；tools/validate.js 逐局核其末关"],
              ["过关与解锁", "src/core/engine.js · endTurn（checkStage 于季末判定）；src/data/progress.js · mark／stageOpen／scenarioOpen；src/ui/ui.js · showEnding／nextStage／reshoot"],
              ["目标之栏与关卡列表", "src/ui/ui.js · drawObjective／showStages／stageRow／syncStart；index.html（objective／btnStages／campaignPanel）；assets/style.css（疆场之记与关卡列表之样式）"],
              ["进度存于浏览器本地", "src/data/progress.js · KEY／last／tally／lordTally；src/ui/ui.js · UI.boot（titleProgress／btnContinue）"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-march",
          "title": "舆图与行军",
          "body": ["「兵书志略」舆图与行军一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["地形：符号、行耗与攻守", "src/data/map.js · TERRAIN；src/ui/ui.js · hint（行耗与守备加成之显示）"],
              ["地形如何折算入伤害", "src/core/rules.js · damage"],
              ["通行之禁", "src/core/rules.js · canEnter／isNaval／isWater"],
              ["一步之费的特例", "src/core/rules.js · reachable"],
              ["可达之格如何算出", "src/core/rules.js · reachable；src/core/engine.js · moveTo"],
              ["一夫当关：一格一军", "src/core/engine.js · moveTo；src/core/rules.js · reachable"],
              ["射程与出手", "src/core/rules.js · inRange／targetsFor；src/ui/ui.js · select"],
              ["入敌城之格：围城与入城", "src/core/engine.js · moveTo／captureCity"],
              ["行止之限：一军一季一动作", "src/core/engine.js · moveTo／attackUnit／attackCity；src/ui/ui.js · renderArmy"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-units",
          "title": "兵种与相克",
          "body": ["「兵书志略」兵种与相克一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["十四兵种总表", "src/core/rules.js · UNITS"],
              ["何城可征何兵", "src/ui/ui.js · cityTypes；src/data/map.js · CITIES 等级与临水判定"],
              ["相克之要", "src/core/rules.js · COUNTER；src/ui/ui.js（预判处标「相克 ×」「被克 ×」）"],
              ["相克总表", "src/core/rules.js · COUNTER"],
              ["器械克城", "src/core/engine.js · attackCity；src/core/rules.js · damage（cityDef 之三成五）"],
              ["等阶与标签之用", "src/core/rules.js · statsOf／canEnter／damage"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-battle",
          "title": "交战",
          "body": ["「兵书志略」交战一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["伤害如何计算", "src/core/rules.js · damage"],
              ["战力如何算出", "src/core/rules.js · statsOf／skillMods"],
              ["兵力条与减员", "src/ui/render.js · drawUnit；src/core/rules.js · statsOf（fat）"],
              ["反击", "src/core/engine.js · attackUnit；src/ui/ui.js · renderArmy（受反击约）"],
              ["士气", "src/core/engine.js · attackUnit／startTurn；src/core/rules.js · statsOf"],
              ["战功升迁", "src/core/engine.js · promote／attackUnit／attackCity"],
              ["将殁与被获", "src/core/engine.js · killUnit／captureCity"],
              ["主动技：冷却与持续", "src/ui/ui.js · useSkill／endTurn（cd 递减）；src/core/engine.js · startTurn（buffTurns 递减）"],
              ["光环：只及相邻，且打七折", "src/ui/ui.js · refreshAuras；src/core/rules.js · skillMods（aura 之 0.7）"],
              ["战事预判", "src/ui/ui.js · renderArmy；src/core/rules.js · damage"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-city",
          "title": "城池与经略",
          "body": ["「兵书志略」城池与经略一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["城池六类与等级", "src/data/map.js · CITY_ROWS／等级映射／port 判定"],
              ["守备与恢复", "src/core/engine.js · startTurn；src/core/engine.js · newGame"],
              ["攻城伤害", "src/core/engine.js · attackCity"],
              ["守军拒战", "src/core/engine.js · attackCity"],
              ["入城之后", "src/core/engine.js · captureCity"],
              ["征募：条件与费用", "src/core/engine.js · recruit／recruitCost／setupArmy"],
              ["增筑", "src/core/engine.js · upgradeCity"],
              ["岁入之公式", "src/core/engine.js · startTurn／newGame"],
              ["军粮与缺粮减员", "src/core/engine.js · startTurn"],
              ["民心与骚动", "src/core/engine.js · startTurn（drift／民变判定）"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-court",
          "title": "庙堂与邦交",
          "body": ["「兵书志略」庙堂与邦交一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["开局之势", "src/core/engine.js · newGame／prestigeBase／setRelation"],
              ["礼赂", "src/core/engine.js · diplomacy（gift）；src/ui/ui.js · showCourt"],
              ["传檄宣战", "src/core/engine.js · diplomacy（war）／attackUnit（背盟）"],
              ["遣使约和", "src/core/engine.js · diplomacy（peace）"],
              ["天子诏书", "src/core/engine.js · diplomacy（edict／edictStop／edictCall）"],
              ["诏书之限", "src/core/engine.js · diplomacy；src/data/factions.js · MECHS.zhaoshu"],
              ["庙堂界面", "src/ui/ui.js · showCourt"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-story",
          "title": "剧情与结局",
          "body": ["「兵书志略」剧情与结局一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["章回如何推进", "src/core/story.js · nextChapter／satisfied；src/ui/ui.js · nextStory（调用时机）"],
              ["触发条件总表", "src/core/story.js · satisfied"],
              ["抉择与赏罚", "src/core/story.js · applyEffect"],
              ["章回体例", "src/ui/ui.js · openChapter；src/data/stories_1.js（体例示例）"],
              ["结局", "src/core/story.js · endingFor；src/ui/ui.js · showEnding"],
              ["二十六条故事线", "src/core/story.js · allStories／storyFor；src/data/stories_1..7.js"],
              ["史实原则", "README.md · 史实原则"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-lords",
          "title": "君主与派系",
          "body": ["「兵书志略」君主与派系一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["分组一览", "src/data/factions.js · GROUPS／ENTRIES"],
              ["二十六主一览", "src/data/factions.js · LORDS；src/data/map.js · ERAS"],
              ["十个剧本", "src/data/map.js · ERAS／ownersOf；src/data/scenarios_1..3.js（逐君之局）；src/core/campaign.js · scenariosOf"],
              [
                "黄巾·张角（新增一组）",
                "src/data/generals_4.js（黄巾诸将）；src/data/stories_7.js（张角故事线）；src/data/map.js（huangjin 与 e184／e194 归属）"
              ],
              ["势力数值修正", "src/core/rules.js · FACTION_MECH；src/core/engine.js · startTurn／recruitCost"],
              [
                "君主国策：名与实",
                "src/core/engine.js · captureCity／killUnit／diplomacy（st.mech 之判定点）；src/data/factions.js · MECHS"
              ],
              ["开局布阵", "src/core/engine.js · newGame／setupArmy／chooseType"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        },
        {
          "id": "impl-faq",
          "title": "疑难问答",
          "body": ["「兵书志略」疑难问答一门诸条，其实现位置如下。"],
          "table": {
            "head": ["兵书志略之条目", "实现位置"],
            "rows": [
              ["为什么点不动舆图", "src/ui/ui.js · onTile（busy／phase）"],
              ["军队为什么不能移动", "src/core/rules.js · reachable／canEnter；src/ui/ui.js · select"],
              ["为什么不能攻击紧邻的敌人", "src/core/engine.js · attackUnit／moveTo"],
              ["为什么招募不到楼船", "src/ui/ui.js · cityTypes（c.port）；src/data/map.js · 临水判定"],
              ["粮草为负会怎样", "src/core/engine.js · startTurn（upkeep）"],
              ["怎么拜将", "src/core/engine.js · assignGeneral；src/ui/ui.js · renderArmy"],
              ["在野之士怎么征辟", "src/core/engine.js · recruitGeneral／diplomacy（edictCall）／captureCity／killUnit"],
              ["存档在哪", "src/data/progress.js（KEY 与 localStorage，只记关卡进度）；src/ui/ui.js · UI.boot（titleProgress／btnContinue）；对局本身无存储"],
              ["能不能中途换君主", "src/ui/ui.js · startGame（一次载入）／showEnding"],
              ["城池为什么攻不下", "src/core/engine.js · attackCity／startTurn（守备恢复）"],
              ["我的部曲为何一下就残了", "src/core/rules.js · damage／statsOf；src/ui/ui.js · 预判处"],
              ["城池为何突然无主或守备归零", "src/core/engine.js · startTurn（民变判定）"],
              ["为何金粮收入很少", "src/core/engine.js · startTurn（岁入公式）"],
              ["剧情叠层里点不动（「请先抉择」）", "src/ui/ui.js · openChapter／wire（Escape）"],
              ["怎么结束回合", "src/ui/ui.js · endTurn／wire；src/core/engine.js · endTurn"],
              ["为何征不到辎重车、亲卫、象兵某些兵", "src/ui/ui.js · cityTypes"],
              ["国策为何看不出效果", "src/core/engine.js（st.mech 之判定点）；src/core/rules.js · FACTION_MECH"],
              ["顶栏「敌军」为何多于与我交兵之国", "src/core/story.js · hostileCities；src/ui/ui.js · draw／showCourt"]
            ]
          },
          "src": "由原 wiki 各条之实现注释汇编"
        }
        /* ===IMPL-END=== */
      ]
    },

    /* ============================ 五、朝局之实现 ============================ */
    {
      id: "impl-politics",
      name: "朝局之实现",
      entries: [
        {
          id: "pol-files",
          title: "模块与数据分册",
          body: [
            "朝局分三处：数据在 src/data/politics_1.js（window.POLITICS），实法在 src/core/politics.js（window.Politics），通口在 src/core/engine.js 之 Engine.council／setHeir／politicsStatus／courtTopics／heirCandidates／pendingPolitics／resolvePolitics。",
            "分工之由与故事线同：数据可分册（今为分册一），改其数而不动其法；politics.js 不含 DOM 依赖，故可在 Node 下推演，tools/validate.js 遂能逐君四十回合演其政争。",
            "状态挂于 st.court：{ strife, legit, heir, councils, lastCouncil, topicAt, topics, fired, pending, history }。Engine.newGame 调 Politics.init(st) 立之；载入次序见「脚本加载次序」一节。",
            "「实现对照」一门逐兵书志略之旧十门列其实现位置；本门、「正式版之实现」一门与「一·二版之新增」一门，则详其后诸门之内里。"
          ],
          list: [
            "src/data/politics_1.js —— window.POLITICS = { events, topics, heirs }",
            "src/core/politics.js —— window.Politics（init／court／status／strifeLabel／applyEffect／topicsFor／council／candidates／setHeir／heirsOf／eligible／checkEvent／pendingEvent／resolveEvent／tick／all）",
            "src/core/engine.js —— 上列诸口之一行转口，加 newGame 之 init、startTurn 之 tick 与岁入折损",
            "src/core/campaign.js —— goalText／goalMet／goalProgress 之 strife／heir／legit 三支"
          ],
          src: "src/data/politics_1.js；src/core/politics.js；src/core/engine.js"
        },
        {
          id: "pol-contract",
          title: "POLITICS 之三段契约",
          body: [
            "三段各有字段与白名单，白名单外者虽载于数据而引擎不取；tools/validate.js 逐项校之。"
          ],
          table: {
            head: ["段", "字段", "约束与白名单"],
            rows: [
              ["events（政争）", "id、name、year、factions、lords、requires、once、scene、choice、src", "id 唯一，宜含年份；year 须在 184—265 之间；factions／lords 之值须实在；scene 至少三条，其 t 限 narration／line／inner／history；choice.options 至少二条，各须 text、reply、effect"],
              ["events.requires", "minCities、minPrestige、strifeAtLeast、strifeAtMost、heir、flag", "「requires 键」之白名单，只此六个；heir 为真须已立储、为假须未立；余者论我方城池数、威望、党争之上下限与我方旗标"],
              ["topics（议政）", "id、name、desc、src、cost{gold,prestige}、cooldown、once、options", "id 与政争共一池，不得重；cost 缺省皆零，prestige 之费不得逾三十；cooldown 缺省六回合；once 缺省假；options 至少二条"],
              ["heirs（储位）", "君主 key → [{ id, name, order, claim, note }]", "君主 key 须在 FACTIONS_DATA.LORDS 之内；候选之 id 须为已有武将且 name 与之一致；order 为一至九之齿序，同胞不可重；claim 与 note 皆必填"],
              ["effect", "见「效果键」", "普通十二键（gold／food／troops／morale／prestige／relation／flag／clearFlag／unlockGeneral／captureCity／enemyTroops／disaster）原样交 Story.applyEffect；另加 court 一键"],
              ["effect.court", "strife、loyalty、sealHeir、unsealHeir、purge、purgeDeath、legit", "「court 键」之白名单，只此七个；sealHeir／purge／purgeDeath 之值须为已有武将 id，且 sealHeir 所示之人须已在 heirs 中列过"]
            ]
          },
          note: "一项效果可兼含普通键与 court；relation 之对象式 { who, value } 之 who 须为已有势力，captureCity 之城须为舆图 96 城之一，unlockGeneral 之人须为已有武将——三者皆由校验核之。",
          src: "tools/validate.js · 朝局段；src/core/politics.js · applyEffect"
        },
        {
          id: "pol-digest",
          title: "效果之分流与不可悔棋",
          body: [
            "Politics.applyEffect 把一项效果切作两半：court 一段本模块自处（党争、名分、臣心、立储、废储、处置其人），余者原样转交 Story.applyEffect——故两处之法只有一条，不虞二致。转交之后，战报、旗标、解锁、城池诸记照旧。",
            "不可悔棋（数据格式）：一事一局之内只发一次。checkEvent 取中即写入 st.court.fired[e.id] 与 st.flags.politic_turn，pending 既存则不再取新事；resolveEvent 一决即清 pending，其效即刻入局，数据之中不设「撤销」之字段，界面亦不列回退之钮。故抉择之前，宜先阅其场景与史源。"
          ],
          list: [
            "议事之限：st.court.lastCouncil !== st.turn 方可议（一回合止一事）；冷却看 topicAt[id] 与 cooldown；once 之题另看 topics 之计数",
            "tick 之消长：未立储而有嗣则 strife 每季加一点五；威望 ≥60 则减一点五，≤20 则加一点；legit 随威望 ≥50 而加半点，否则减零点四；strife ≥55 则臣心每季减一，legit ≥65 则加半点、否则减零点二",
            "内衅之判：strife ≥65 且 rng() < (strife−55)/120 时，取忠诚不足 55 之臣去国（无则取一城，unrest 加二十、morale 减十二）",
            "legit ≥70：我方诸城民心每季加一",
            "历史之记：court.history 至多六十条，note() 同时写战报"
          ],
          src: "src/core/politics.js · applyEffect／council／resolveEvent／tick"
        },
        {
          id: "pol-hooks",
          title: "Engine 之挂点与岁入折损",
          body: [
            "newGame：势力、将佐与通用之部既备之后，调 Politics.init(st)，立 st.court 之初值——strife 八；legit 汉室八十、余者五十五；heir 为空。",
            "startTurn 季末：各城岁入既算，我方另乘党争之折损 drag = 1 − min(0.4, strife × 0.004)，金粮同乘而后入账；其后于季末结算之末调 Politics.tick(st)，作消长、臣心、内衅、民心和事件之取。",
            "campaign：goals 增 strife／heir／legit 三键，goalMet 分别判「党争不高于 N」「储位已立」「名分不低于 N」，goalText 作「平朋党之争，党争降至 N 以下」「定储位以安众心」「名分至于 N 以上」，goalProgress 作「党争 X／N」「储位 名／未立」「名分 X／N」。",
            "校验另立一界：goal.strife 须在 5—90 之间、goal.legit 须在 20—95 之间，且逐关核其可成。"
          ],
          list: [
            "src/core/engine.js · newGame —— if (root.Politics) { root.Politics.init(st); }",
            "src/core/engine.js · startTurn 岁入处 —— drag 之乘（只施于 st.player）",
            "src/core/engine.js · startTurn 末 —— root.Politics.tick(st)",
            "Engine 之七口皆为一行转口，缺 Politics 时各报「朝局未立」",
            "src/core/campaign.js —— goalText／goalMet／goalProgress 之三支"
          ],
          src: "src/core/engine.js · newGame／startTurn／朝局诸口；src/core/campaign.js"
        },
        {
          id: "pol-ui",
          title: "界面三卡与政争之屏",
          body: [
            "顶栏之栏：draw() 每次调 drawCourt()，其写 #courtChip——「朝局」标、党争值与其别称（strife ≥65 时加 bad 类）、储位（已立／未立／未议），title 属性供悬停示名分与已议之事数。",
            "庙堂三卡：showCourt() 于各国卡片之前依次挂 courtStatusCard（党争与名分之条、储位一句、court.history 近五条）、courtTopicsCard（Engine.courtTopics 之题与策，open 者可按，否则注其由）、courtHeirCard（Engine.heirCandidates 之诸子，按之调 Engine.setHeir）。",
            "政争之屏：openPolitics() 自 Engine.pendingPolitics 取事，于 overlay 中造 .story-wrap.politics-wrap，场景四体与史源皆照章回之例；抉择既毕调 Engine.resolvePolitics，继以 refreshAuras／draw，而后重问 openPolitics（连发则续呈），无则转 nextStory。",
            "把关之处：nextStory 之先、Tutor 回调与 Enter／Escape 之处理，皆先问 openPolitics()——有政争未决则先呈之，免得被他事掩过。"
          ],
          list: [
            "assets/style.css —— courtchip／court-bar／topic／heir／politics-wrap 诸类",
            "UI.showPolitics() —— 手动启政争之屏（调试与自检之用）",
            "政争之屏之钮：二至三策，各出一言；既择而后按「阅毕」"
          ],
          src: "src/ui/ui.js · drawCourt／showCourt／courtStatusCard／courtTopicsCard／courtHeirCard／openPolitics"
        },
        {
          id: "pol-validate",
          title: "校验：tools/validate.js 之朝局段",
          body: [
            "总闸另立一段校朝局，共四事：数据契验、朝局之志之可成性、议政与立储之实、逐君四十回合之政争推演。"
          ],
          list: [
            "数据契验：event／topic 之 id 唯一、year 之界、scene 之数与类型、requires 之键、choice 与 options 之字段；效果键与 court 键逐一在白名单内，relation／unlockGeneral／captureCity 所指须实在；heirs 之君主与候选须实在、名符、齿序不重",
            "藏储之志可成性：逐关核其应许非虚——求立储者须该君有储可列，求平党争者须有立储、降党争之议题或降党争之事件可循",
            "议政与立储之实：以曹操开局，验一回合止一事（连议二事须后者不成）、立储既成而「定储位」之志即判成、党争之志之文与进度皆合",
            "政争推演：二十六主各四十回合，事发若干、决断若干，皆须有成",
            "所报之行：朝局：政争 N 条，议政 M 条，储位之君 K 位（候选 L 人）；另报朝局之志之关数与政争推演之果"
          ],
          src: "tools/validate.js · 朝局段"
        }
      ]
    },

    /* ============================ 六、正式版之实现 ============================ */
    {
      id: "impl-release",
      name: "正式版之实现",
      entries: [
        {
          id: "srv-files",
          title: "server/ 之各文件",
          body: [
            "服务端只依赖 Node 内建模块（自 Git 取新版时另需本机有 git 可用）；站目录与数据目录分之，故更新只动前者。"
          ],
          table: {
            head: ["文件", "所司"],
            rows: [
              ["server/server.js", "服务端主体：命令行与环境之取定（--port／--host／--web／--data／--admin-token／--drain-idle／--drain-timeout）、静态之站之供应（MIME、ETag、304、越界之禁、server／tools／data／.git／node_modules 不对外）、诸接口之路由、维护之态、更新之五步与事件流之广播"],
              ["server/lib/store.js", "文件型存储：users.json（用户库）、tokens.json（令牌库）、saves/（云存档）；口令之散列、注册与登录、令牌之签发与校验、在线之判（active）、久置之令牌清理（prune）"],
              ["server/lib/update.js", "在线更新之实：readVersion／listFiles／plan（检查）／stage（暂存）／apply（原子替换）／rollback（回滚）／gitExport（自 Git 取新版），及 REQUIRED 之必需文件（index.html、VERSION、src/main.js、src/data/version.js）与 EXCLUDE 之不入站目录者"],
              ["server/test.js", "端到端自检：起临时服务（临时端口、临时站目录、临时数据目录），逐段验账号、会话、云存档、管理权限、检查与施行更新、回滚、维护公告、事件流与自 Git 取版，毕则删其临时之所"],
              ["server/README.md", "服务端之说明：起法、更新之序、自检与安放之宜"],
              ["server/data/", "运行时之数据目录（已在 .gitignore）：用户库、令牌、云存档、update.log 与 admin.token"]
            ]
          },
          note: "管理员令牌之取定有三次第：命令行 --admin-token > 环境 DAIHAN_ADMIN_TOKEN > 数据目录中之 admin.token（首次启动自动生成二十四字节之随机串）。此文件即管理员之钥，切勿外泄、勿入版本库。",
          src: "server/server.js；server/lib/store.js；server/lib/update.js；server/test.js；server/README.md"
        },
        {
          id: "srv-api",
          title: "接口一览",
          body: [
            "路径皆以 /api/ 起首；管理诸接口自验管理员令牌（x-admin-token 头），不假会话；余者须凭账号令牌（Authorization: Bearer …）。"
          ],
          table: {
            head: ["方法与路径", "凭据", "所司"],
            rows: [
              ["GET /api/health", "无", "健康与频道：channel 为 release、站目录之版本、维护与更新之态、账号数、时刻"],
              ["GET /api/version", "无", "版本号、预览版之址、维护与更新之态"],
              ["GET /api/events", "无", "Server-Sent Events：先送一问（hello），其后广播 maintenance／updated 诸事"],
              ["POST /api/register", "无", "注册；首位注册者得 admin 之权，成则连令牌一并奉还"],
              ["POST /api/login", "无", "登录；成则发令牌，败则 401"],
              ["POST /api/logout", "账号令牌", "废当前之令牌"],
              ["GET /api/session", "账号令牌", "当前之人与其云存档之概要（rev／savedAt／version）"],
              ["GET /api/save", "账号令牌", "取云存档之全文"],
              ["POST /api/save", "账号令牌", "存云存档（体限四兆），返回新 rev、时刻与上一档之时刻"],
              ["GET /api/admin/status", "管理令牌", "线上版本、站目录、数据目录、维护与更新之态、在线之数、会话与账号之数、待客之限与运行之龄"],
              ["POST /api/admin/check", "管理令牌", "只查不动：报新旧版本号与新增／改动／删除之数"],
              ["POST /api/admin/update", "管理令牌", "施行更新；加 ?wait=1 则同步候其毕（200），否则即答 202 而后台行之；已在更新中则 409"],
              ["POST /api/admin/maintenance", "管理令牌", "发或撤维护公告（on 与 text），并以事件流广播"],
              ["POST /api/admin/rollback", "管理令牌", "以留档复原旧站（旧站更名 .bad 留之）"]
            ]
          },
          note: "维护之中，公开之三接口与管理接口之外一律答 503（拒新登录，而静态之站照旧），故在局者不断其局。",
          src: "server/server.js · api"
        },
        {
          id: "srv-auth",
          title: "口令、令牌与在线之判",
          body: [
            "口令以 scrypt 加盐存其散列（N 一万六千三百八十四、r 八、p 一、keylen 六十四），绝不留明文；比对用 timingSafeEqual，故不入时序之隙。名号限二至十六字之中文、字母、数字或下划线（以正则校之），口令不少于六位；重名以名号之小写作键而拒之。",
            "令牌为三十二字节之随机十六进制串，存于令牌库，各记 user／createdAt／lastSeen；verify() 校验时续其 lastSeen。登录与注册各发一枚，logout 与 revoke 废之。",
            "在线之判以最近之动作为准：store.active(idleMs) 取 lastSeen 未逾时者，即「在线之客」；更新之待客以此为准。逾 SESSION_MAX_AGE（默认三十日）之令牌，由 prune 逐时清去，免令牌库日长。",
            "管理之权系于令牌而非会话：isAdmin 认命令行或环境之管理员令牌，亦认账号中 admin 为真者（首位注册者）。"
          ],
          list: [
            "云存档以名号小写之百分号编码为文件名，落于数据目录之 saves/",
            "_write 皆先写 .tmp 而后改名，故半写之档不成"
          ],
          src: "server/lib/store.js；server/server.js · isAdmin"
        },
        {
          id: "srv-save",
          title: "云存档与进度模块之对应",
          body: [
            "云存档与客户端进度同构：其体即 PROGRESS.snapshot() 之所出（{ v, lords }），存于数据目录之 saves/ 下，各附 rev、savedAt 与存档时之站版本。服务端只存其体，不解其义。",
            "客户端 uploadSave() 取 snapshot() 上传，downloadSave() 取回之后径调 PROGRESS.restore()——故「疆场之记」本机与云上一模一样；restore 另作范围之剪（done 归 0—99 之整数）。"
          ],
          list: [
            "src/data/progress.js · snapshot／restore —— 导出与载入",
            "src/data/account.js · uploadSave／downloadSave —— 通 /api/save 之二法",
            "server/lib/store.js · putSave／getSave —— 落盘与取回",
            "界面以 rev 与 savedAt 示云上之档之新旧，下载之前先问一句而后行"
          ],
          src: "src/data/progress.js；src/data/account.js；server/lib/store.js"
        },
        {
          id: "srv-update",
          title: "更新之五步、维护之态与回滚",
          body: [
            "更新由管理员手动触发，务求在局者不半途而废，故分五步（runUpdate 之内 phase 依次为 check／stage／freeze／drain／swap）。"
          ],
          list: [
            "一、检查：checkUpdate 取新版（source.git 则 gitExport 之，source.dir 则径取），plan 比 VERSION、REQUIRED 之四件与逐件 sha1，报 added／changed／removed；不动线上",
            "二、暂存：stage 清空 stage-web 而后复制新版，复校版本号与必需之件，不合即抛",
            "三、冻结：置维护之态并以事件流广播（health 亦报）；此后除公开三接口与管理接口外一律 503——拒新登录，而静态之站照旧",
            "四、待客：drainSessions 每半秒问 store.active(DRAIN_IDLE)，无人则止；逾 DRAIN_TIMEOUT 则强制换之，其果记 forced 与 remaining",
            "五、替换：apply 先以旧站更名为 <web>.prev 留档，再以暂存就其位（两皆一次改名，故无半新半旧之态），撤维护而广播 updated；成则记 update.log",
            "回滚：rollback 以 .prev 复原，现站更名 .bad 留之；管理接口 /api/admin/rollback 遂复于旧版",
            "数据目录不入版本库：server/data/ 在 .gitignore 之中，管理员令牌与口令之散列俱在其中，宜备份而限其权限"
          ],
          note: "更新若中途失败，维护之态自撤、update.log 记 update-failed，站目录不动（替换只在最后一步，且是改名而非复制）。",
          src: "server/server.js · runUpdate／drainSessions；server/lib/update.js"
        },
        {
          id: "srv-test",
          title: "server/test.js 之自检",
          body: [
            "自检起一临时服务（临时端口、临时站目录、临时数据目录，管理员令牌自定，待客之限缩至毫秒之级），逐段验之，毕则删其临时之所；有不通过者退出码非零。"
          ],
          list: [
            "健康与静态：health 报 release 与站目录之版本；首页与脚本可取；无此文件 404；服务端源码不对外；越界之径（编码之分隔符）不可取",
            "账号与会话：注册成而首位者 admin 为真；重名被拒；名号与口令之限被拒；口令不合 401；登录得令牌；无令牌不可读会话",
            "云存档：上传成而有 rev；下载同构；附版本与时刻；体不合被拒",
            "管理权限：无令牌 403；有令牌可读其状，且示在线与账号之数",
            "检查更新：成、报新旧版本与增删之数、不动线上、源不存在则报错",
            "施行更新：成、记自何版至何版、待客未强制、留旧站之档、线上已新、新添之件在位、旧令牌与存档皆仍可用、同版再施则报无须更新",
            "回滚：复于旧版",
            "维护公告：公告既设则拒新登录（503）、健康接口仍通并报维护、静态站仍可读、公告可撤、撤后登录复通",
            "自 Git 取新版与替换（本机无 git 则略此项）",
            "事件流：可连且先送一问；停机之后服务确已停"
          ],
          src: "server/test.js"
        },
        {
          id: "cli-account",
          title: "客户端：频道自探与维护之候",
          body: [
            "src/data/account.js 为客户端之总口：无服务端时自退为预览版，一切照旧，不报错、不阻行。",
            "自探：UI.boot 调 probe() 取 /api/health，四秒为限；得 channel 为 release 则为正式版，取服务端版本与维护之态，续以 refreshSession() 验令牌（不成则清之）；否则 channel 定为 preview，emit 而后止。",
            "登录之状存于浏览器本地（键 daihan_tugao.account.v1，只存令牌、名号与 admin 之志，不存口令），probe 时先取之，故重载页面仍在登录之状。",
            "维护之候：正式版既立，startPolling() 每十五秒一问 health。公告初下则 emit('maintenance')，界面覆维护之屏；公告撤而版本已易则 emit('maintained')，撤屏、报「更新已毕」而重载。"
          ],
          list: [
            "probe／refresh —— 自探与续验令牌",
            "register／login／logout —— 账号",
            "uploadSave／downloadSave —— 云存档（内容取自 PROGRESS）",
            "adminStatus／adminCheck／adminUpdate／adminMaintenance／adminRollback —— 管理之器（以 x-admin-token 头，或以登录之管理员令牌）",
            "onChange(fn) —— 订阅 probe／login／logout／save／restore／maintenance／maintained 诸事",
            "界面侧：src/ui/ui.js 之 accountBadge（#titleChannel）、showAccount（账号屏）、adminCard（管理之器）、showMaintenance／hideMaintenance（维护之屏）"
          ],
          src: "src/data/account.js；src/ui/ui.js · accountBadge／showAccount／adminCard／showMaintenance"
        }
      ]
    },

    /* ============================ 七、工具与自检 ============================ */
    {
      id: "tools",
      name: "工具与自检",
      entries: [
        {
          id: "tool-validate",
          title: "全量校验",
          body: [
            "tools/validate.js 为交付前之总闸：把全部数据脚本在 Node 的沙箱里跑一遍，再逐项校其结构与契约，最后以二十六位君主各推演十二回合。任何一项不合即列出并退出码非零。"
          ],
          list: [
            "命令：node tools/validate.js",
            "所校之目：舆图尺寸与城池／势力数、各剧本 96 城归属齐备、可择之君与分组条目数、武将人数与技能白名单、典籍分类、故事线章回与场景／抉择数、君主首府须属本势力、武将 id 跨卷不重、剧本与关卡（逐局之末关须为开放型、目标之城池与势力须合于该剧本、逐关解锁与逐局解锁、过关判定与续战之记）、朝局（数据契约与白名单、朝局之志须可成、议政与立储之实、逐君四十回合之政争推演）、wiki 与 dev 之结构（门／条／id 唯一／表格行列齐整）",
            "末以全 26 主各推演 12 回合，验引擎自洽；另将二百七十二关逐一开局，核其起而载明本关之志"
          ],
          note: "新增数据后必跑一次；校验通过是本作交付的底线。",
          src: "tools/validate.js"
        },
        {
          id: "tool-sim",
          title: "无头推演",
          body: [
            "tools/sim.js 在 Node 中加载全部脚本，跑一局并把每年之局势打出来，用于平衡调整与回归测试。"
          ],
          list: [
            "node tools/sim.js caocao 40 —— 以曹操自动推演 40 回合（其默认之局与其首关）",
            "node tools/sim.js caocao 40 caocao_hanzhong 3 —— 指定剧本与关卡（第四为关卡序号，自 0 起）",
            "SIM_AI_PLAYER=1 node tools/sim.js zhangjiao 260 —— 连玩家一方也交由庙算，自中平元年推演 260 回合",
            "参数：第一为君主 key，第二为回合数，第三为剧本 id，第四为关卡序号（后二者可省）"
          ],
          src: "tools/sim.js"
        },
        {
          id: "tool-adhoc",
          title: "临时校验脚本",
          body: [
            "另有二脚本，为某一分卷或某一类数据而写的临时之检，与总闸无涉。"
          ],
          list: [
            "node tools/check_lore.js —— 单校 src/data/lore.js 之典籍条目",
            "node tools/validate_generals_2.js —— 单校 src/data/generals_2.js 是否合 SCHEMA"
          ],
          src: "tools/check_lore.js；tools/validate_generals_2.js"
        },
        {
          id: "tool-deploy",
          title: "部署到 GitHub Pages",
          body: [
            "本作为纯静态站，无须构建：推到 GitHub 的 main 分支、以根目录开启 Pages 即可上线。tools/deploy_github.sh 把三步一并做了——建库（或沿用已有者）、推送 main、开启 Pages。"
          ],
          list: [
            "先备 token：penguin config vault set --key GITHUB_TOKEN --value <token>（classic token，勾 repo 权限；建库与开 Pages 皆需之）",
            "命令：sh tools/deploy_github.sh [仓库名] [--private]（仓库名默认 daihan-tugao，公开）",
            "token 只从环境变量读，不写入 .git/config，也不出现在命令行之中",
            "上线后访问 https://<账号>.github.io/<仓库名>/；此后每次 git push 皆自动重发"
          ],
          note: "Pages 之源取 main 分支根目录；.nojekyll 已在仓库中，免 Jekyll 插手。三页相对路径互达，故部署后 wiki.html 与 dev.html 直接可用。",
          src: "tools/deploy_github.sh"
        }
      ]
    },

    /* ============================ 八、扩展指南 ============================ */
    {
      id: "extend",
      name: "扩展指南",
      entries: [
        {
          id: "extend-lord",
          title: "新增一位君主",
          body: [
            "君主牵动五处数据与两份清单，缺一则校验不过。"
          ],
          list: [
            "src/data/factions.js —— 于 GROUPS／ENTRIES 归其组与条目，于 LORDS 加其条目（name、era、faction、capital、difficulty、difficultyName、mech、tag、intro、goal），需要则于 MECHS 加其国策",
            "src/core/rules.js —— 若为新势力，于 FACTION_MECH 加其数值修正",
            "src/data/stories_N.js —— 加其故事线（id 即君主 key），并登记于 src/core/story.js 之 allStories()",
            "index.html —— 若新开数据文件，须加入 script 清单",
            "tools/validate.js 与 tools/sim.js —— 同步其文件清单",
            "node tools/validate.js —— 必跑；校验含「君主首府须属本势力且该势力至少一城」",
            "node tools/art_manifest.js —— 刷新图象清单"
          ],
          note: "首府（capital）之 id 只能取 src/data/map.js 中 96 城之一，且必须在该君主所属势力的城池之内——此条最易出错。",
          src: "src/data/factions.js；src/core/rules.js；src/core/story.js · allStories"
        },
        {
          id: "extend-general",
          title: "新增武将",
          body: [
            "武将按 faction 归入 src/data/generals_1..4.js 之对应分卷（或另开一卷并登记于引擎与校验的文件清单）。字段与白名单见「数据与规范」二节。"
          ],
          list: [
            "必填：id、name、faction、stats（统武智政魅）、skills、bio、impact",
            "id 全局唯一，跨四卷不可重；分卷内对象之键须与其 id 一致（校验所检）",
            "生卒年可选 birth／death；引擎按「生年 + 14 岁」与卒年自动筛去不应在场之人",
            "技能 mod 之键须在白名单内，tags 亦同"
          ],
          src: "src/data/generals_1..4.js；src/core/engine.js · allGenerals"
        },
        {
          id: "extend-story",
          title: "新增故事线",
          body: [
            "一条故事线归一位君主，其 id 即君主 key；章回按序推进，触发条件见引擎之 satisfied 判定。"
          ],
          list: [
            "结构：{ id, group, entry, title, chapters[], endings{win,lose} }",
            "章回：{ title, year, place, trigger, scenes[], choice?, reward?, penalty? }",
            "触发项：start、turn、year、flag、requires、city、lost、battleWin、unify、enemyCities",
            "场景四体：叙事、台词、心念、史注；每章必有一处心念，史注必注出处（校验所检）",
            "写毕登记于 src/core/story.js 之 allStories()，并加入 index.html、tools/validate.js、tools/sim.js 的文件清单"
          ],
          note: "史实原则不可破：只用正史，不取演义人物与情节；裴注所引传闻须标明出自裴注。",
          src: "src/core/story.js；src/data/stories_1..7.js"
        },
        {
          id: "extend-unit",
          title: "新增兵种／地形／城池",
          body: [
            "三者皆牵动数据与图象两处，且须同步白名单与校验。"
          ],
          list: [
            "兵种：加于 src/core/rules.js · UNITS（含 id、名、abbr、攻防兵移射、金粮、tier、tags、note）；相克另加于 COUNTER；征募条件之判定在 src/ui/ui.js · cityTypes",
            "地形：加于 src/data/map.js · TERRAIN 与格子数据；通行之禁在 src/core/rules.js · canEnter；图象名用其 key",
            "城池类别：加于 src/data/map.js · CITIES 之 kind；另须在 src/ui/render.js · CITY_KIND 补 kind→拼音之映射",
            "三者毕，跑 node tools/validate.js 与 node tools/art_manifest.js"
          ],
          src: "src/core/rules.js；src/data/map.js；src/ui/ui.js · cityTypes"
        },
        {
          id: "extend-art",
          title: "新增图象",
          body: [
            "图象不必改代码：按「图象资源」一节之路径与命名投入文件即可。"
          ],
          list: [
            "头像：assets/img/portraits/<武将id>.png（君主可另用 <君主key>.png）",
            "兵种：assets/img/units/<兵种id>.png",
            "地形：assets/img/terrain/<地形key>.png",
            "势力旗：assets/img/banners/<势力key>.png",
            "城池：assets/img/cities/<kind 拼音>.png",
            "欲知全部应备之名，跑 node tools/art_manifest.js，看 assets/img/MANIFEST.md"
          ],
          src: "src/ui/art.js；tools/art_manifest.js"
        }
      ]
    },

    /* ============================ 九、界面与本纪 ============================ */
    {
      id: "ui",
      name: "界面与本纪",
      entries: [
        {
          id: "dom",
          title: "DOM 与本纪对照",
          body: [
            "index.html 之元素 id 与所司如下，改界面时据此对照 src/ui/ui.js。"
          ],
          table: {
            head: ["id", "所司"],
            rows: [
              ["titleScreen", "主页面叠层（三入口、择主区、底栏）"],
              ["mainMenu / btnCampaign / btnTutorial / btnWiki", "三入口及各自动作"],
              ["picker / groupList / entryList", "择主区：分组列、条目牌与君主按钮"],
              ["campaignPanel", "择主区之下「疆场之记」：剧本标签（局名、年份、史事、关数）与本局诸关之列表"],
              ["titleHint / titleProgress / btnContinue / btnPickBack / btnLorePreview / titleVer / btnStart", "择主底栏：提示（含所择之局与关及其志）、全局进展与「续战」、返回、典籍、版本号、受命而起"],
              ["btnAccount / titleChannel", "账号（开账号、云存档与更新之屏）与版本之辨（正式版／预览版，悬停见服务端版本与登录之状）"],
              ["topbar / clock / resources", "对局顶栏：纪年与五项资源"],
              ["courtChip", "朝局之栏（党争值与其别称、储位；悬停见名分与已议之事数）"],
              ["objective", "本关目标之栏（所战之局、第几关、关名、本关之志与进度）"],
              ["btnStages / btnCourt / btnEndTurn", "关卡列表、庙堂、结束回合"],
              ["main / map", "主区与舆图画布（内部 1200×694，六边形外框宽高比所定）"],
              ["intel", "敌情浮牌（舆图左上）"],
              ["tutor", "教战面板（舆图右下）"],
              ["hint", "向外提示一行"],
              ["tabs / tabpanel", "侧栏五页签与面板"],
              ["overlay", "剧情／结局／庙堂／朝局政争／账号／维护／通用叠层"],
              ["toasts", "提示堆栈"],
              ["wikiNav / wikiMain / wikiCount / wikiVer（wiki.html、dev.html）", "志略二页的目录、正文、门条计数与版本号"]
            ]
          },
          src: "index.html；src/ui/ui.js"
        },
        {
          id: "canvas",
          title: "舆图绘制与点击换算",
          body: [
            "舆图为单个 canvas，格为正六边形（尖顶、奇数行右移半格）。内部尺寸由外框宽高比定：宽 = (W + 0.5)·√3·s，高 = ((H − 1)·1.5 + 2)·s；W=30、H=20、宽取 1200 时算出高为 693，而画布元素定为 1200×694，余一像素由纵向居中（oy）吸收。屏上以 CSS 满宽缩放（手机除外：为保格可辨，手机上一律取 760 之宽、指推左右观之），故屏上所见与实际像素不一。",
            "布局只由 src/ui/render.js · layout 一处算出：s（外接圆半径）、w（横向对边距 = √3s）、h（纵向对角距 = 2s）、ystep（行距 = 1.5s）与左上原点 ox／oy。格心用 center、格形用 hexPath、州名水印用城池重心经 center 折算。",
            "点击换算须按 canvas.width / rect.width 求得比例，折回内部像素后交 tileAtPixel：先以格心 (0,0) 为原点化出轴向坐标 (q, r)，再作立方取整（cube round），最后回推偏置坐标得 col、row。若径用 clientX，画布被缩小时点击会落在错误的格上；若沿用方格时代的「除以格宽取整」，则斜向命中全错。"
          ],
          list: [
            "绘制入口：src/ui/render.js · draw（地形底 → 六边格线 → 州域水印 → 可达格 → 可击之敌／可攻之城 → 城池 → 部曲）",
            "点击入口：src/ui/ui.js · onTile（五级判定：点我方部队即选；有选中则可击之敌／可攻之城／可达之格；点敌军或城池出敌情；空地报地形）",
            "邻接与距离：一律走 src/data/map.js · neighbors／dist，不得再写 |dx| + |dy|"
          ],
          src: "src/ui/render.js · layout／center／hexPath／tileAtPixel；src/data/map.js · neighbors／dist；src/ui/ui.js · onTile"
        },
        {
          id: "roster",
          title: "人物志（兵书志略之附卷）",
          body: [
            "「兵书志略」末卷「人物志」不写在 src/data/wiki.js 里，而由 src/ui/roster.js 依武将数据当场编次：如此增删武将、改技能，刷新页面即随之更新，不必二次维护。",
            "wiki.html 除 wiki.js 之外，另载 map.js、factions.js、generals_1..4.js 与 roster.js，并在 Reader.mount 之前调用 Roster.attach()，把编好的节推到 window.WIKI.sections 之末。次序不可乱：势力名与次序取自 MAP.FACTIONS 与 FACTIONS_DATA，故二者须先于 roster.js 载入。",
            "编次之法：Roster.registry() 合并诸卷武将；Roster.section(reg) 是纯函数，按「分组 → 条目 → 君主」之序推出生势力次序，无君主之家接于其后；一家逾五十人析为上下两段。每人一行：姓名（字某）、身份、五维，以及全部技能的名、类型、说明、数值加成与标签。"
          ],
          list: [
            "Roster.registry() —— 合并 GENERALS 与 GENERALS_PART1..6，缺卷跳过",
            "Roster.section(reg) —— 纯函数，返回 { id:'roster', name:'人物志', entries:[…] }，形状同 wiki.js 之节",
            "Roster.attach() —— 推入 window.WIKI.sections 之末，重复调用不重复推入"
          ],
          note: "此类自动生成的文案同样受「兵书志略不得夹带实现细节」之限（tools/validate.js 的 TECH_IN_WIKI 正则），故译名与说明一律中文，不得出现文件名、字段名与函数名。",
          src: "src/ui/roster.js；wiki.html；tools/validate.js · 人物志校验"
        },
        {
          id: "keys-bound",
          title: "键位与事件绑定",
          body: [
            "键位只在 src/ui/ui.js · wire 中绑三处，无其他快捷键。"
          ],
          list: [
            "keydown Enter —— 结束回合（叠层既开或输入法组字中则不触发）",
            "keydown Escape —— 叠层既开则等于点其底部主按钮；否则取消选择并收起敌情",
            "canvas click / contextmenu —— 舆图点击与右键取消",
            "window resize —— 重绘舆图",
            "Art.onChange —— 图象就绪后重绘舆图"
          ],
          src: "src/ui/ui.js · wire；src/main.js"
        },
        {
          id: "ui-bars",
          title: "进度条之限",
          body: [
            "列表之中一律用数字，不画横条；横条（.bar）全局只留给「朝局」一卡（党争、名分二条）。",
            "其故：部曲之「兵 115/115」、城池之「守备 240」、人物之「忠诚 78」、邦交之「邦交 62」皆已明书其数，再画一条即重复；且一屏数十行，条多则目眩。",
            "故军情之部曲行、城池之守备行、人物之忠诚行、庙堂之邦交行皆无条；实测地图首屏由九条降为无，庙堂叠层由二十四条降为二条。"
          ],
          list: [
            "保留：庙堂「朝局」卡之党争、名分（.court-bar）",
            "已去：.bar.hp（部曲）、.bar.gar（守备）、.bar.mor（忠诚）、邦交之条",
            "改法：删其造条之码即可，数字沿用原行，不必改数据"
          ],
          src: "src/ui/ui.js · renderArmy／renderCity／renderWho／showCourt；assets/style.css · .bar"
        },
        {
          id: "ui-responsive",
          title: "分端之式",
          body: [
            "三端之式皆在 assets/style.css 之末「分端之式」一节：桌面（>900）用左右两栏（舆图 1fr ＋ 侧栏 336px）；平板（721—900）改一栏，舆图在上、侧栏在下；手机（≤720）另加紧凑之制；横持之手机（高 ≤520）复归左右并置。",
            "壳之高恒为视口（body 不出滚动条），壳内各自滚：舆图在 .stage 内滚，侧栏在 .tabpanel 内滚，主页面长卷在 .title-wrap 内滚。故顶栏与页签常在，纵使小屏亦不至失了准头。",
            "舆图在手机上不缩至屏宽（缩则格不可辨），而保 760 之宽、指推左右观之，并在提示行明示「舆图可左右推移」。点击换算按 canvas.width / rect.width 比例折算，与滚动位置无涉，故推移之后命中仍准。",
            "顶栏在手机上排作四行：一、名号年月 ＋「结束回合」；二、金粮威望城池敌军；三、朝局 ＋ 关卡庙堂；四、本关之志。实测顶栏一百四十余像素，不及视口三分之一。触控目标：顶栏之钮不低于 38，侧栏页签与叠层选项不低于 46。"
          ],
          list: [
            "触控之制：touch-action: manipulation 去双击迟滞；*-tap-highlight-color 去点击高亮",
            "主页面底栏在手机上吸底（position: sticky; bottom: 0），「受命而起」常在目前",
            "兵书志略与匠作志略：窄屏目录改横排可滚，表格字号收窄",
            "三页之 meta：viewport-fit=cover、theme-color（素纸之色，兼及手机浏览器之边栏）"
          ],
          note: "不引前端框架：本作无构建、纯静态三页、vanilla 一万余行；换框架须重写并添构建链，风险与收益不成比例。以 CSS 分端之式加少量触控规则，已足敷手机与平板之用。",
          src: "assets/style.css · 分端之式；index.html／wiki.html／dev.html · meta"
        }
      ]
    },

    /* ============================ 十、一·二版之新增 ============================ */
    {
      id: "impl-12",
      name: "一·二版之新增",
      entries: [
        {
          id: "pop-module",
          title: "户口之模块与数据",
          body: [
            "户口之制立于 src/core/population.js，挂于 root.Population。户口不另立数据册：其基数由城池之岁入（金、粮）与等第当场推之，故舆图数据不必改一字。户口一律以「万口」计（三十七万口即 37.0）。",
            "本模块只读 window.MAP 与 window.Rules，不含 DOM 依赖，故可在 Node 下推演——tools/validate.js 与 tools/sim.js 皆据之演其户口。",
            "四常数与其取值之义：PER_HP 为一兵所当之户口（1/250；一兵约当四十口之家，故二十五兵为万口，兵力一百一十之部曲即零点四四万口）；LEVY 为征发之倍（2，调发在途、老弱不任者亦耗，故倍之）；REST_GOLD 为休养生息之费（200）；REST_CD 为其冷却（4 回合）。",
            "KIND_W 为城池等第之户口倍率：都城 2.2、州治 1.7、重镇 1.3、港口 1.3、县城 0.9、关隘 0.4——大邑人稠，关隘民稀。"
          ],
          list: [
            "base(cityId 或城对象) —— 以岁入与该城等第推其基数：(gold + food) ÷ 10 × KIND_W，取一位小数；无此城者作 10",
            "of(st, cityId) —— 该城今之户口；pop 未立者以基数当之",
            "total(st, faction) —— 一势力所有城池户口之和，供顶栏与推演之总结",
            "popFactor(st, c) —— 户口之效：0.75 + 0.25 × (今户口 ÷ 基数)，取 0.55—1.15，折入岁入；免得一城之户口牵动全局",
            "rate(st, c) —— 每季自然之增减：0.020 × (民心 ÷ 100) − 0.004 − 骚动 ÷ 1500；新遭兵燹（siegeTurn 当季）再减 0.01；取 −0.03—0.025",
            "tick(st, c) —— 每季之变，归其 { delta, rate }；户口之上限为基数之三倍（土地所出有尽，非可无限孳生），下限 0.2，并记 popBase",
            "levy(type) —— 征兵所耗之户口：Rules.UNITS[type].hp × PER_HP × LEVY，取一位小数",
            "canRecruit(st, cityId, type) —— 户口是否足以征募：须留三倍之数（今户口 ≥ 所耗 × 3），否则报「户口不足（今某万口，须某万口以上）」而不许征",
            "spend(st, cityId, type) —— 实耗户口：扣户口、民心 −1、骚动 +2；抽丁过半（户口降至基数之半以下而先在半以上）则民心再 −4、骚动再 +8，并归 heavy 为真",
            "restInfo(st, cityId) —— 休养生息之判：非我之城、金帛不足、未满冷却者各报其由，并预告所增之户口与所费",
            "gain(st, cityId) —— 休养所得：基数 × 0.06 × (1 − 今户口 ÷ 基数之三倍)，至少 0.4；已近三倍（2.9 倍以上）则只 0.2",
            "rest(st, cityId) —— 行之：费金 200，户口增 gain、民心 +5、骚动 −12，记 lastRest 并写战报一条",
            "num(v) —— 户口之文：不及一百万口者带一位小数，逾则只称万"
          ],
          note: "户口之要在一「耗」字：征募耗之，大举征发耗之，兵燹亦耗之；惟民心与休养生息可复。此制不改兵制之数，只使兵源有本。",
          src: "src/core/population.js"
        },
        {
          id: "pop-engine",
          title: "户口挂于引擎何处",
          body: [
            "newGame：每城加三键——pop（户口）、popBase（基数）、lastRest（上次休养之回合，初值 −99）；pop 与 popBase 皆取 Population.base(c)。",
            "startTurn：逐城先调 Population.tick(st, c) 得本季之消长，再以 Population.popFactor 折其岁入——该城金粮各乘此数，故户口盛则租赋足，户口凋敝则租赋不登。",
            "本回合之出入另记于势力之上（f.income），供顶栏示其变动：{ turn, gold, food, upkeep, goldNet, foodNet, pop, popDelta, drag, clans }——gold／food 为入账之数，upkeep 为军粮之耗，goldNet／foodNet 为净变，pop 为今户口，popDelta 为本季户口之增损（无户口之制时以户口之差当之），drag 为党争之折损，clans 为世族向背之乘数（百分数，并附其言辞）。",
            "recruit：先 Population.canRecruit 而后扣金；既成则 Population.spend，户口之耗与所征之兵同记一笔战报；抽丁过半者（heavy）另记「大举征发，户口骤减，田野稍稍荒芜」一笔，只记于玩家一方。",
            "Engine 新增四口，皆一行转口：restCity(st, cityId)、restInfo(st, cityId)、popOf(st, cityId)、popTotal(st, faction)；户口之制未载时各报「户口之制未立」或返零，不阻其行。"
          ],
          table: {
            head: ["兵种", "id", "兵力", "所耗户口（万口）"],
            rows: [
              ["郡国兵", "inf", "110", "0.9"],
              ["长矛兵", "spear", "115", "0.9"],
              ["弓手", "archer", "90", "0.7"],
              ["大戟士", "pike", "135", "1.1"],
              ["连弩士", "crossbow", "95", "0.8"],
              ["亲卫", "guard", "155", "1.2"],
              ["轻骑", "cav", "110", "0.9"],
              ["甲骑", "heavycav", "145", "1.2"],
              ["骑射", "cavarcher", "100", "0.8"],
              ["攻城器械", "siege", "125", "1.0"],
              ["楼船", "navy", "145", "1.2"],
              ["辎重车", "transport", "90", "0.7"],
              ["蛮骑", "barbcav", "120", "1.0"],
              ["象兵", "elephant", "175", "1.4"]
            ]
          },
          note: "户口见于顶栏（户口一项，悬停见本回合之增损）、城池页（逐城户口、「户口凋敝」之警、征募钮所预告之「户口 −某」与休养生息之钮）及推演之总结。",
          src: "src/core/engine.js · newGame／startTurn／recruit／户口四口；src/core/rules.js · UNITS"
        },
        {
          id: "clans-module",
          title: "氏族之模块与数据",
          body: [
            "氏族数据分二册：src/data/clans_1.js（window.CLANS_PART1，二十二族，多中原与河北之姓）与 src/data/clans_2.js（window.CLANS_PART2，二十二族，多江东、荆益、交州与汉室诸房），合四十四族，涉将佐一百五十二人。",
            "一族之字段八：id、name、junwang（郡望）、trait（门风）、desc（始末，逾二百字者校验相警）、src（出处）与 members[]（其族之将佐 id，须实名在册）、factions[]（所附势力，须为真势力）。校验逐项核之：id 不得重、members 不得少于二人且不得重、factions 不得空。",
            "加载之约：二册在 generals_1..4.js 与 lore.js 之后、stories 之前载入，皆先于 core 之诸脚本；tools/sim.js 之文件清单亦同此序。未载二册则 Clans.all() 得空表，氏族一门自成空门而不报错。",
            "实法在 src/core/clans.js，挂 root.Clans，不含 DOM 依赖；将佐之册由 Engine.allGenerals() 取之，故 clans.js 须在 engine.js 之前载入。"
          ],
          list: [
            "all() —— 合 CLANS 与 CLANS_PART1..3 之诸族（缺册跳过）",
            "byId(id)／state(st, id)／support(st, id)／label(v) —— 取族、取其向背之状（0—100）与其辞：倾心相附／亲附／观望／貌合神离／离心／仇雠相视",
            "init(st) —— 于 newGame 立 st.clans：逐族 { id, support: 55, at: {}, recruited: 0, lastTurn }",
            "touches(st, c) —— 某族是否有涉于吾：其族附于吾之势力，或其在朝、在野之士居吾疆",
            "relevant(st) —— 本局有涉之族，向背高者列前",
            "serving(st, c) —— 其族在吾幕府者（含在朝、在军），按忠心降序",
            "recruitable(st, c) —— 其族在野可辟者，按影响降序（氏族之荐所据）",
            "members(st, c) —— 其族之在册者，兼记其在本局之有无、归属与忠心",
            "tick(st) —— 每季之消长：名分正则士族归心，朋党盛则门第自固，向背既极则自趋中平；其族在朝者之忠心亦随之",
            "bonuses(st) —— 向背之效：岁入之乘数与名分、党争之增减，供 Engine 取用",
            "actInfo(st, id, act)／act(st, id, act) —— 四事之判与行（判其费、冷却与可否，行者扣金威望、记其回合、改向背与忠心）",
            "ACTS —— 四事之名、费、冷却与一句说明"
          ],
          table: {
            head: ["事", "key", "费", "冷却", "效"],
            rows: [
              ["联姻", "marry", "金 300、威望 8", "4 回合", "向背 +18；其族在朝者忠心 +8"],
              ["征辟其子弟", "recommend", "金 180", "3 回合", "向背 +10，并辟其族在野之贤者入幕（忠心 72，不循乡邦之限）；其族无人可辟则只向背 +8"],
              ["任用其族", "appoint", "金 120", "3 回合", "向背 +10；在朝者忠心 +6；党争 +2"],
              ["裁抑强宗", "suppress", "威望 5", "4 回合", "向背 −18；在朝者忠心 −6；党争 −8；我方诸城民心 +2、骚动 −4"]
            ]
          },
          note: "消长与效之数：tick 每季按名分（不低于六十五则加半点，否则减零点二）与党争（不低于五十五则减零点四，否则加零点二五）移其向背，向背逾七十者自减 0.35、不及三十者自增 0.35；有涉之族逾三而均值不低于七十，则党争加半点。bonuses 则向背不低于七十之族各使金粮增百分之二，不及或等于二十五者金减百分之二；均值不低于七十则名分 +0.4，不高于三十则党争 +0.8；乘数取 0.8—1.2 之间。",
          src: "src/data/clans_1.js；src/data/clans_2.js；src/core/clans.js"
        },
        {
          id: "clans-engine",
          title: "氏族挂于引擎何处",
          body: [
            "newGame：朝局既立之后调 Clans.init(st)，立 st.clans 之初值（向背皆五十五）；故「朝局」与「氏族」二制同挂于一局之初。",
            "startTurn 之末：于 Politics.tick 之后、在野游历之前调 Clans.tick(st)，作向背之消长、其在朝者之忠心与朋党之增减。",
            "岁入：Clans.bonuses(st) 只施于玩家一方，于党争之折损 drag 之后，金粮各乘其数（党争与世族二折相乘，故内外皆耗则岁入更薄）；其言辞另入 f.income.clans 以备考。",
            "Engine 新增三口，皆一行转口：clansOf(st)、clanDo(st, id, action)、clanActInfo(st, id, action)；氏族之制未载时前者返空表，后二者报「氏族之制未立」。",
            "clansOf 所出者，逐族含其族之数据（name、junwang、trait、desc、src、factions）、向背之数与辞、在吾幕府者、在野可辟者与在册之众，供庙堂之「氏族」一卡直取。"
          ],
          note: "氏族不自动改舆图与部曲，其效只走岁入（乘数）、朝局（名分、党争）与臣心三条；故不强加于引擎之诸判定，只在 Engine 一侧折之。",
          src: "src/core/engine.js · newGame／startTurn／clansOf／clanDo／clanActInfo；src/core/clans.js · tick／bonuses"
        },
        {
          id: "recruit-rule",
          title: "征辟之制",
          body: [
            "汉末征辟，本有门第与乡里之限：非其乡里之人，虽怀金帛亦不能致之。故 engine.js 之 recruitRule(st, gid) 逐事判之，合则辟，不合则报其由。",
            "一、须其人无主而在野：已殁、在军（有部曲者）、已为我之臣、为他人效力者，皆不在其列。",
            "二、一方之主不可辟：def.roles 含 lord 者（天子与诸方之主）不可为臣，故汉献帝亦不可征辟。",
            "三、本朝旧人（def.faction 即玩家势力）可辟；亡国之士亦可（其国曾有其城而今已亡——st.factions[f].everAlive 为真、alive 为假），惟影响五者名重天下、耻为人下，不在其列。",
            "四、须其乡里在吾疆，或与我同州（playerZhous(st) 取我所有之州）：二者有一则可辟；皆不合则报「其人寄居某城（某势力），非我州郡所能辟」；乡里无所考者报「无从征辟」。",
            "在野之人皆各归其乡：newGame 之末以 homeCity(st, def) 定 g.city——未立之国者以其本据为乡里（晋人归洛阳、蜀人归成都）；故其可辟与否，一望而知。"
          ],
          list: [
            "recruitable(st) —— 在野全表，逐人含 id／name／zi／bio／impact／stats／roles／faction／home／open／why／cost（费金 80 + 影响 × 60，无影响之数者以 120 计）；按影响降序，同者按名",
            "recruitGeneral(st, gid) —— 依 recruitRule 之判而行：扣金、改其归属为我、忠心 70，并写战报（含其可辟之由）",
            "diplomacy('edictCall') —— 天子诏书之征辟，改用 recruitable().filter(open) 取第一人（须国策为 zhaoshu、威望不低于十五、六回合之内不重下）",
            "界面：「人物」页分「可辟」（列至多二十人）与「不可辟者（何以不可）」两处，后者收于 details.who-shut 之中，各附其由；征募与征辟之钮皆以 open 定其禁用"
          ],
          note: "氏族之荐（Clans.act 之 recommend）自成一途：得其荐者入幕而不循乡邦之限，此汉末「辟召由门第」之实。",
          src: "src/core/engine.js · recruitRule／playerZhous／recruitable／recruitGeneral／diplomacy (edictCall)；src/ui/ui.js · renderWho"
        },
        {
          id: "lord-fall",
          title: "君主阵亡即败",
          body: [
            "汉末之世，君在则国在。killUnit 于将佐既殁或被获之后，若其人为 st.lordGeneral（君主本人之将佐 id，newGame 时按君主之名自武将表求出），则径调 lordDown(st, kind, killer)：killer 在则为 captured（被获），否则为 slain（阵殁）。",
            "lordDown：记 st.lordDown = { kind, general, by, turn }，写战报一条（「为某所擒，社稷倾覆」／「殁于阵中，社稷倾覆」），置 st.result = { win: false, faction, reason: 'lord', how, by }，并令 st.phase = 'over'；既终则不再改（已有 lordDown 或 result 者即返）。",
            "checkDefeat：于「城尽而无部曲」之前先判「君主已殁或见擒」——st.lordGeneral 之将 status 为 dead，或其 owner 已非玩家势力，即调 lordDown 而终；城尽之败则 reason 改为 'ruin'，与「君主之殁」判然两事。",
            "showEnding：reason 为 'lord' 者另标「君主殒命」（眉题），其案语冠以「君在则国在，此局已终，虽城郭部曲犹存亦不复振」。",
            "推演之应：tools/sim.js 因之不再遣君主陷阵（见「本轮之校」一条）；tools/validate.js 之逐君推演未设此防，故其「覆灭」之报（若有）兼含君主阵殁之局。"
          ],
          note: "此制使君主为一局之根：不待城尽部曲尽而后败。故择主界面之难度与故事线之败局文案，皆须与之相应。",
          src: "src/core/engine.js · killUnit／lordDown／checkDefeat；src/ui/ui.js · showEnding"
        },
        {
          id: "map-zoom",
          title: "舆图之缩放与推移",
          body: [
            "舆图之视图只一对象管之：{ zoom, pan: { x, y } }。zoom 为一即满图（缩放至适），至多三倍（ZOOM_MIN 一、ZOOM_MAX 三）；pan 为画布内之偏移（像素）。",
            "绘与点皆先规整此对象：Render.viewOf(view) 取 { z, x, y }（z 不在一至六之间者取一）；Render.clampPan(canvas, z, pan) 限其偏移于 −(z − 1) × 画布宽高之内，不使图外露白。",
            "draw(ctx, st, view)：先于满图坐标清屏，若 z 非一或有偏移，则以 setTransform(z, 0, 0, z, x, y) 施一变换——布局仍按满图算（layout 不变），只在绘时施之，故所画即所点。",
            "hit(e, canvas, view)：先按 canvas.width ÷ rect.width 折回画布内部像素，再减偏移、除以倍数，方交 tileAtPixel 取格。pixelAt(e, canvas) 则返内部像素与其比例 k，供推移之用。",
            "界面侧之机关在 src/ui/ui.js：applyZoom(z, fx, fy) 以 (fx, fy) 为心缩放（缺则取画布中心），缩放既毕行 clampPan 并切换 #map.zoomed 之类；zoomBy(delta, e) 以指针处为心增减；zoomFit() 复于满图；syncTools() 依倍数更新 −／＋／⤢ 三钮之禁用、倍数之标（100%）与「取消 ✕」之显隐。"
          ],
          list: [
            "滚轮：wheel 之监听加 { passive: false } 并 preventDefault，故滚轮只缩舆图、不缩整页；上滚增二成五、下滚减二成五（皆按当时倍数乘之）",
            "双击（触屏之双点亦可）：满图与二倍互转",
            "键位：＋ 或 =（zoomBy 0.5）、− 或 _（zoomBy −0.5）、0（zoomFit）",
            "拖动：图既放大则以拖动为推移（pointermove 逾五像素方作拖动，触控者 preventDefault），并逐次 clampPan",
            "触控：满图之时不加 zoomed 之类，窄屏仍由原生滚动推移；既放大则加 #map.zoomed 之 touch-action: none——不如此，拖图成了整页放大与滚动，手一按而全屏皆动",
            "舆图之器：舆图右下 .stage-foot 之内，−、＋、⤢、取消 ✕ 四钮，中夹倍数之标；「取消 ✕」随选择与敌情之有无而显隐"
          ],
          note: "缩放不改命中：点击恒按 canvas.width ÷ rect.width 折算，再减偏移、除以倍数；故推移之后命中仍准。",
          src: "src/ui/render.js · viewOf／clampPan／draw／hit／pixelAt；src/ui/ui.js · applyZoom／zoomBy／zoomFit／syncTools；assets/style.css · #map.zoomed"
        },
        {
          id: "cancel-ways",
          title: "取消选择之四法",
          body: [
            "舆图之选择一有，则「可往」「可击」「可攻」诸标随之。既欲罢之，电脑四法、触控二法，凡六门，而皆归于一。"
          ],
          list: [
            "再点该部曲：onTile 遇 view.selected.id 与所点之部曲相同者，即 cancelAll（此法师出「以同一动作反复」之例）",
            "点舆图空白处：有选择而点及空地（或不可往之格）者，取消并报地形之名",
            "右键：contextmenu 之监听 preventDefault 而后 cancelAll（桌面专用）",
            "Esc：叠层既开则作点其底部主按钮；否则图既放大而无选择者先复位满图，再次方取消选择",
            "触控之长按：pointerdown 起 520 毫秒之计时，pointerup／pointermove 逾五像素／pointercancel 皆止之；既发则置 suppressClick，免得随至之 click 又选中一物",
            "「取消 ✕」钮：在舆图之器之中，凡有选择或敌情则显，按之即 cancelAll"
          ],
          note: "机关二事：deselect(quiet) 清 selected／reachable／targets／cityTargets；cancelAll(msg) 兼清敌情之屏、报一行提示、重绘，并返「原有无可取消者」之真假（供 toast 判）。HINT_IDLE 之一行，即闲置之时常驻之提示，其文并载取消诸法与环色、缩放之属。题曰「四法」者，就电脑而言；触控另备长按与「取消 ✕」二法。",
          src: "src/ui/ui.js · deselect／cancelAll／onTile／wire（contextmenu／pointerdown／keydown）；src/ui/render.js · hit"
        },
        {
          id: "unit-fx",
          title: "舆图特效",
          body: [
            "舆图之上，一望须能辨三事：孰为我、孰为友、孰为敌；孰已行动、孰尚待命。故 drawUnit 于画军之前先求其「等」。"
          ],
          list: [
            "Render.unitRank(st, u) —— 分三等：u.faction 即玩家者为 mine；其势力与玩家未开战（f.war 无我）者为 ally；余者为 foe",
            "RANK_COLOR = { mine: '#2f6b4f', ally: '#7c8288', foe: '#a8322a' } —— 环色：我绿、友灰、敌赤；选中者环易为 #f7e6b8（素纸之金）",
            "已行动者（acted，只我方）：通体取 alpha 0.55（半淡），环改灰虚线（setLineDash [4, 3]）——「已毕」",
            "未行动之我方：于右上角画金丸一枚（#f7e6b8，半径 3.2，位在 px + r × 0.82、py − 3 − r × 0.82，外描深边）——「待命」"
          ],
          note: "环色与金丸皆随首绘而成，不改数据、不加计次；头像、兵种图、势力旗依次取图（见「图象资源」一节），无图者以势力色圆徽加其名之首字当之。",
          src: "src/ui/render.js · unitRank／RANK_COLOR／drawUnit"
        },
        {
          id: "clear-marks",
          title: "通关之识与二志之门",
          body: [
            "「通关」有二义，此前含混为一；本轮于 src/data/progress.js 立二名：常规通关（该局之「有定志」诸关皆克，末关开放型不在其数）与完全通关（并末关亦克，即一统）。",
            "src/ui/gate.js（新，挂 root.Gate）司二志之门屏：Gate.screen(opts) 于 #wikiMain 之内造 .gate（眉题、题、由、今况数行、案语、归路「回主页面」），隐 #wikiNav，改 #wikiTitle 与 document.title 并写 #wikiCount；Gate.wiki() 门未启者列「今已常规通关 n 位，尚须 m 位」与「近日之战」（各君主以其 lordMark 与定志之关数），门既启则 Roster.attach() 与 Reader.mount(window.WIKI)；Gate.dev() 须正式版且为管理员，ACCOUNT 未载者报「今未载账号之制」，频道非 release 者报「今为预览版（服务端未应）」，登录而非管理员者报其名号。二页各于脚本之末一呼：wiki.html 呼 Gate.wiki()，dev.html 呼 Gate.dev()。",
            "主页面则不然：顶栏「匠作志略」一链（#devLink）本 hidden，由 UI.applyDevLink() 于 ACCOUNT.probe() 之后（及 onChange 之时）按 ACCOUNT.state() 之 admin（或 account.admin）显隐，非管理员者不见。",
            "「预览版无账号之制，故匠作志略在预览版一概不启」之实情：GitHub Pages 之静态页无可问之服务端，ACCOUNT 之频道自探定为 preview，Gate.dev() 遂径报「今为预览版（服务端未应），故不启」；本地双击 dev.html 亦然。欲阅匠作志略，须起自建服务端（server/server.js），并以首位注册之管理员登录。"
          ],
          list: [
            "nonOpenCount(lordKey, sid) —— 一局之中「非无定式」之关数，逐关看 goal.open",
            "scenarioNormalClear(lordKey, sid) —— 该局定志之关皆克（至少一关且已克数不少于定志之关数）",
            "scenarioComplete(lordKey, sid) —— 该局诸关皆克（含末关开放型）",
            "lordStatus(lordKey) —— 汇一君主诸局之数：{ normal, complete, done, total, nonOpen, doneNonOpen, scenarios, cleared, full }",
            "lordMark(lordKey) —— 一短语之识：完全通关／常规通关／已克 x／y 关",
            "normalLords()／completeLords() —— 二类君主之名列",
            "WIKI_GATE = 3、wikiOpen() —— 兵书志略之门：常规通关三名君主方启",
            "scenarioOpen(lordKey, sid) 改以「前局常规通关」为准（首局与本传之局恒开）；旧法取「前局诸关全克」（含末关开放型）为断，其局既含无定式之末关，则前局几不可越"
          ],
          note: "界面之应：君主钮与剧本页签各缀 .lm（常规通关）／.lm.full（完全通关）之识，剧本页签另书「定志 N」与「未启」；gateState() 由 PROGRESS.normalLords().length 与 WIKI_GATE 算出 { open, have, need, full }，refreshGates() 写 #wikiGate 之数、给 #btnWiki 缀 locked 类并改其 title、写 #titleProgress「已克 x／y 关　常规通关 n 君」；UI.boot() 即调一次，ACCOUNT 之 probe 与 onChange 之后各再调一次。兵书志略之门不以账号为凭，而以「常规通关三名君主」为凭——此志之文，凡玩家皆当得而读之；匠作志略「仅管理员可见」一句，页上亦明书之。",
          src: "src/data/progress.js · 通关诸口；src/ui/ui.js · buildTitle／renderCampaign／showStages／gateState／refreshGates／applyDevLink；src/ui/gate.js · Gate.wiki／Gate.dev／Gate.screen；wiki.html；dev.html"
        },
        {
          id: "verify-12",
          title: "本轮之校",
          body: [
            "tools/validate.js 于「典籍」段之后新增一段，先校氏族之数据契，再以 Engine 之实数校户口与氏族之算。"
          ],
          list: [
            "氏族之契：合 CLANS 与 CLANS_PART1..3；id 须小写字母起且不重；name／junwang／trait／desc／src 五字段皆须有；desc 逾二百字者相警；members 至少二人、不得重、须为在册武将；factions 不得空、须为真势力；不足三十族者相警。所报之行为「氏族 44 族，涉将佐 152 人（共 152 人次）」",
            "户口之算：以首位君主开局，核户口为正、全图多于本势力、popTotal 幂等；逐城连推六季而户口不失；征兵而户口减；休养生息（费金）而户口增。所报之行为「户口：开局 1369.1 万口（我 53.9 万口，4 城），征兵减、休养增、推演六季不失」",
            "氏族之算：clansOf 须为数组、本局所关之族须有成员；四事各有其判（actInfo 之 ok 为布尔），可行者行之必成；行二事以上而向背仍无变者相警。所报之行为「氏族：本局势所关 3 族，四事试行 1 事」",
            "tools/sim.js 之改动：文件清单增 src/data/clans_1.js／clans_2.js 与 src/core/population.js／src/core/clans.js（次第与 index.html 同）；因君主阵亡即败，简易玩家不遣君主陷阵——凡 u.general 即 st.lordGeneral 者，置 acted 为真、moveLeft 为零而按兵不动；总结多报户口与败因（结局之 reason 与 how）",
            "三具之用法：node tools/validate.js（全量校验，交付前之总闸）、node server/test.js（服务端端到端自检）、node tools/sim.js [君主key] [回合数] [剧本id] [关卡序号]（无头推演，后二者可省）"
          ],
          note: "匠作志略不受「不得夹带实现细节」之限（tools/validate.js 之 TECH_IN_WIKI 正则只施于兵书志略），然条目 id 之唯一、表格表头与每行列数之相符，二者同办；本志新增一门之后，node tools/validate.js 所见为「匠作志略 10 门，条目 72」。",
          src: "tools/validate.js · 氏族与户口段；tools/sim.js；node tools/validate.js"
        }
      ]
    }
  ]
};
