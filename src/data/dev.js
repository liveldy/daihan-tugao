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
            "wiki.html —— 兵书志略（玩法，九门八十二条）",
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
              ["src/data/map.js", "舆图：30×20 格正六边形地形、96 座城池、25 家势力（含无主）、8 个剧本与其归属"],
              ["src/data/factions.js", "六组十五家二十五君主、各人国策"],
              ["src/data/generals_1..4.js", "武将文臣（分卷）"],
              ["src/data/lore.js", "典籍条目"],
              ["src/data/stories_1..7.js", "二十五条故事线（章回、台词、内心、史注、抉择、成败结局）"],
              ["src/data/wiki.js", "兵书志略条文（玩法）"],
              ["src/data/dev.js", "匠作志略条文（本页）"],
              ["src/core/rules.js", "兵制、地形、相克、伤害与行军"],
              ["src/core/engine.js", "回合、征募、行军、野战、攻城、邦交、事件、胜负"],
              ["src/core/story.js", "剧情触发与效果"],
              ["src/core/tutor.js", "教战之场：教学十步"],
              ["src/core/ai.js", "诸侯庙算"],
              ["src/ui/art.js", "图象加载：探测与回退"],
              ["src/ui/render.js", "舆图绘事（canvas，六边形）"],
              ["src/ui/ui.js", "界面机杼"],
              ["src/ui/reader.js", "志略二页（兵书／匠作）共用之正文渲染"],
              ["src/main.js", "入口：DOM 既备则启动 UI.boot"],
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
            "一、数据：map.js → factions.js → generals_1..4.js → lore.js → stories_1..7.js → wiki.js／dev.js",
            "二、规则：rules.js → engine.js → story.js → tutor.js → ai.js",
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
            "舆图点击须按 canvas.width / rect.width 换算：画布内部为 1200×693（六边形外框之宽高比所定），屏上被 CSS 缩放，径用 clientX 会误判格子",
            "舆图为尖顶正六边形、奇数行右移半格。邻接与距离只可取自 MAP.neighbors／MAP.dist，不得再用 |dx|+|dy|：四邻写法在本图上是错的（斜向四格亦相邻），且六边距离须先化轴向坐标再取立方距离",
            "兵种数值键有白名单（见「技能数值键白名单」）；白名单外之键虽载于数据，引擎不取",
            "剧情 effect 亦有白名单（见「剧情效果」）；enemyTroops 取负数；{ lost: … } 之写法引擎未实现、永不触发",
            "行尾不一：src/data/wiki.js 等为 CRLF，其余多为 LF；以脚本改写文件时须留意"
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
              ["src/data/map.js", "MAP", "W／H／grid（30×20 格正六边形）、TERRAIN、CITIES（96）、FACTIONS（25）、ERAS（8）、ownersOf、neighbors／dist（六邻与六边距离）"],
              ["src/data/factions.js", "FACTIONS_DATA", "GROUPS（6）、ENTRIES（15）、LORDS（25）、MECHS（国策）"],
              ["src/data/generals_1..4.js", "GENERALS／GENERALS_PART1..4", "武将文臣，按 faction 分组"],
              ["src/data/lore.js", "LORE", "典籍六类条目"],
              ["src/data/stories_1..7.js", "STORIES／STORIES_PART1..7", "故事线、章回、抉择、成败结局"],
              ["src/data/wiki.js", "WIKI", "兵书志略条文"],
              ["src/data/dev.js", "DEV", "匠作志略条文（本页）"]
            ]
          },
          note: "武将分成四卷、故事线分成七卷，只为文件大小与分工；载入后由 tools/validate.js 与 src/core/engine.js 的 allGenerals()／src/core/story.js 的 allStories() 合并为一体。",
          src: "src/data/*.js；src/core/engine.js · allGenerals；src/core/story.js · allStories"
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
            "舆图用同步取图（Art.get）：未就绪时返回 null，调用处即绘原文字或原图形，图加载完毕再重绘一次；界面用 Art.avatar 造 img 元素，其 onerror 逐级回退，最终填入原文字。"
          ],
          src: "src/ui/art.js · get／avatar／onChange"
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
              ["顶栏", "src/ui/ui.js · draw（resources 与 clock）"],
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
              ["二十五条故事线", "src/core/story.js · allStories／storyFor；src/data/stories_1..6.js"],
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
              ["二十五主一览", "src/data/factions.js · LORDS；src/data/map.js · ERAS"],
              ["八个剧本", "src/data/map.js · ERAS／ownersOf"],
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
              ["存档在哪", "src/ui/ui.js（无任何存储调用）；index.html"],
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

    /* ============================ 五、工具与自检 ============================ */
    {
      id: "tools",
      name: "工具与自检",
      entries: [
        {
          id: "tool-validate",
          title: "全量校验",
          body: [
            "tools/validate.js 为交付前之总闸：把全部数据脚本在 Node 的沙箱里跑一遍，再逐项校其结构与契约，最后以二十五位君主各推演十二回合。任何一项不合即列出并退出码非零。"
          ],
          list: [
            "命令：node tools/validate.js",
            "所校之目：舆图尺寸与城池／势力数、各剧本 96 城归属齐备、可择之君与分组条目数、武将人数与技能白名单、典籍分类、故事线章回与场景／抉择数、君主首府须属本势力、武将 id 跨卷不重、wiki 与 dev 之结构（门／条／id 唯一／表格行列齐整）",
            "末以全 25 主各推演 12 回合，验引擎自洽"
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
            "node tools/sim.js caocao 40 —— 以曹操自动推演 40 回合",
            "SIM_AI_PLAYER=1 node tools/sim.js zhangjiao 260 —— 连玩家一方也交由庙算，自中平元年推演 260 回合",
            "参数：第一为君主 key，第二为回合数"
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

    /* ============================ 六、扩展指南 ============================ */
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

    /* ============================ 七、界面与本纪 ============================ */
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
              ["titleHint / btnPickBack / btnLorePreview / btnStart", "择主底栏"],
              ["topbar / clock / resources", "对局顶栏：纪年与五项资源"],
              ["btnCourt / btnEndTurn", "庙堂、结束回合"],
              ["main / map", "主区与舆图画布（内部 1200×800）"],
              ["intel", "敌情浮牌（舆图左上）"],
              ["tutor", "教战面板（舆图右下）"],
              ["hint", "向外提示一行"],
              ["tabs / tabpanel", "侧栏五页签与面板"],
              ["overlay", "剧情／结局／庙堂／通用叠层"],
              ["toasts", "提示堆栈"]
            ]
          },
          src: "index.html；src/ui/ui.js"
        },
        {
          id: "canvas",
          title: "舆图绘制与点击换算",
          body: [
            "舆图为单个 canvas，内部尺寸 1200×800（格宽 40 × 30 格 × 20 格），屏上以 CSS 满宽缩放，故屏上所见与实际像素不一。",
            "点击换算须按 canvas.width / rect.width 求得比例，再折回格：先取 (clientX − rect.left) × kx，除以格宽，取整得格。若径用 clientX，画布被缩小时点击会落在错误的格上——选中与行军皆会失效。"
          ],
          list: [
            "绘制入口：src/ui/render.js · draw（地形 → 城池 → 可达格 → 部队 → 州域水印）",
            "点击入口：src/ui/ui.js · onTile（五级判定：点我方部队即选；有选中则可击之敌／可攻之城／可达之格；点敌军或城池出敌情；空地报地形）"
          ],
          src: "src/ui/render.js · TS／draw／hit；src/ui/ui.js · onTile"
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
        }
      ]
    }
  ]
};
