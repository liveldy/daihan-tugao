# 美术资源清单

本目录下的图像**放进去即自动生效**；缺图时游戏自动回退为原有的文字与矢量绘制，不会报错、不会留白框。

后缀探测顺序：`.png` → `.jpg` → `.webp`，先找到的先生效。

本文件由 `node tools/art_manifest.js` 生成，可随时重跑。

## 一、人物头像 `assets/img/portraits/<武将id>.png`

用途：择主界面的君主头像、侧栏「军情／人物」页的人物卡与部队行、舆图上该将所统部队的圆徽、点击敌军时的「敌情」浮牌。

建议 128×128 或 256×256 正方，正面半身，透明或素底。

君主另可用君主 key 作后备文件名（如 `zhangjiao.png`）；找不到君主 key 的图时，自动回退找该君主对应的武将 id。

君主 key（26 个）：

```
zhangjiao xian liubei liushan liuyan liuzhang liubiao caocao caopi caorui simayi simazhao dongzhuo yuanshao yuanshu gongsundu gongsunkang gongsunyuan mateng zhangxiu zhanglu sunjian sunce sunquan sunxiu sunhao
```

武将 id（443 个）：

```
a_gui.png  bai_rao.png  bei_yan.png  beigong_boyu.png  bian_zhang.png  bing_yuan.png  bo_cai.png  bu_chan.png
bu_dugen.png  bu_ji.png  bu_zhi.png  cai_mao.png  cai_yan.png  cai_yong.png  cao_ang.png  cao_bao.png
cao_cao.png  cao_chun.png  cao_hong.png  cao_pi.png  cao_ren.png  cao_rui.png  cao_shuang.png  cao_xiu.png
cao_zhang.png  cao_zhen.png  cao_zhi.png  cen_hun.png  chen_deng.png  chen_gong.png  chen_gui.png  chen_pu.png
chen_qun.png  chen_tai.png  chen_wu.png  cheng_bing.png  cheng_gongying.png  cheng_lian.png  cheng_pu.png  cheng_yi.png
cheng_yin.png  cheng_yu.png  chong_ji.png  chunyu_qiong.png  cuan_xi.png  cui_yan.png  deng_ai.png  deng_xian.png
deng_zhi.png  dian_wei.png  ding_feng.png  ding_gu.png  dong_cheng.png  dong_he.png  dong_xi.png  dong_yun.png
dong_zhao.png  dong_zhuo.png  du_yu.png  duan_wei.png  e_zhesai.png  fa_zheng.png  fan_chou.png  fan_shen.png
fei_shi.png  fei_yi.png  fei_zhan.png  feng_ji.png  fu_luohan.png  fu_qian.png  fu_shiren.png  fu_shou.png
fu_wan.png  fu_xun.png  gan_ning.png  gao_ding.png  gao_gan.png  gao_lan.png  gao_shun.png  gong_du.png
gongsun_du.png  gongsun_gong.png  gongsun_kang.png  gongsun_mo.png  gongsun_yuan.png  gu_jin.png  gu_yong.png  guan_hai.png
guan_ning.png  guan_ping.png  guan_xing.png  guan_yu.png  guanqiu_jian.png  guo_huai.png  guo_jia.png  guo_si.png
guo_tai.png  guo_tu.png  guo_youzhi.png  guo_yuan.png  han_dang.png  han_song.png  han_sui.png  he_ding.png
he_qi.png  he_shao.png  he_yan.png  he_yi.png  heishan_yang_feng.png  hou_cheng.png  hou_xuan.png  hu_chuquan.png
hu_zhen.png  hu_zong.png  hua_he.png  hua_xin.png  hua_xiong.png  huan_lin.png  huang_chong.png  huang_gai.png
huang_luan.png  huang_quan.png  huang_shao.png  huang_wan.png  huang_zhong.png  huang_zu.png  huangfu_song.png  huangjin_hanzhong.png
huangjin_zhang_bao.png  huo_yi.png  ji_ling.png  ji_yan.png  jia_chong.png  jia_xu.png  jian_yong.png  jiang_bin.png
jiang_ji.png  jiang_qin.png  jiang_wan.png  jiang_wei.png  jiang_yi_qu.png  jiao_shi_yi.png  jin_qi.png  ju_fu.png
ju_shou.png  jue_ji.png  kan_ze.png  ke_yineng.png  kong_rong.png  kuai_liang.png  kuai_yue.png  lei_xu.png
leng_bao.png  li_dian.png  li_jue.png  li_kan.png  li_ru.png  li_su.png  li_tong.png  li_wenhou.png
li_xiu.png  li_yan.png  liang_xing.png  liao_hua.png  liaodong_hanzhong.png  liaodong_yang_yi.png  ling_cao.png  ling_tong.png
liu_ba.png  liu_bao.png  liu_bei.png  liu_biao.png  liu_cong.png  liu_dai.png  liu_feng.png  liu_pan.png
liu_pi.png  liu_qi.png  liu_shan.png  liu_xi.png  liu_xian.png  liu_xie.png  liu_xun.png  liu_yan.png
liu_yan_2.png  liu_yao.png  liu_ye.png  liu_yi.png  liu_yin.png  liu_yu.png  liu_zan.png  liu_zhang.png
lou_ban.png  lu_ji.png  lu_kai.png  lu_kang.png  lu_mao.png  lu_su.png  lu_xun.png  lu_zhi.png
luo_tong.png  luo_xian.png  lv_bu.png  lv_dai.png  lv_fan.png  lv_ju.png  lv_meng.png  lv_yi.png
ma_chao.png  ma_dai.png  ma_liang.png  ma_ridi.png  ma_su.png  ma_teng.png  ma_tie.png  ma_wan.png
ma_xiu.png  ma_yuanyi.png  ma_zhong.png  ma_zhong_wu.png  man_chong.png  mao_gan.png  meng_da.png  meng_huo.png
meng_yan.png  meng_zong.png  mi_fang.png  mi_jia.png  mi_zhu.png  murong_muyan.png  nan_lou.png  niu_fu.png
pan_furen.png  pan_zhang.png  pang_de.png  pang_tong.png  peng_cai.png  pu_tou.png  puyang_xing.png  qian_zhao.png
qiao_rui.png  qiao_zhou.png  qiu_liju.png  qu_bei.png  qu_yi.png  quan_cong.png  sha_mohan.png  shen_pei.png
shen_ying.png  shi_hui.png  shi_ji.png  shi_sun_rui.png  shi_wei.png  shi_wu.png  shi_xie.png  shi_yi.png
sima_fu.png  sima_ju.png  sima_shi.png  sima_yi.png  sima_zhao.png  song_jian.png  song_xian.png  su_li.png
su_puyan.png  sui_gu.png  sun_ben.png  sun_ce.png  sun_chen.png  sun_fu.png  sun_hao.png  sun_he.png
sun_huan.png  sun_huan_jiming.png  sun_jian.png  sun_jiao.png  sun_jing.png  sun_jun.png  sun_kuang.png  sun_lang.png
sun_liang.png  sun_luban.png  sun_luyu.png  sun_qian.png  sun_quan.png  sun_shao.png  sun_xia.png  sun_xiang.png
sun_xiu.png  sun_yi.png  sun_yu.png  ta_dun.png  taishi_ci.png  tan_shihu.png  tao_huang.png  tao_jun.png
tao_qian.png  teng_yin.png  tian_feng.png  tian_yu.png  tuoba_liwei.png  wan_yu.png  wang_can.png  wang_fan.png
wang_furen.png  wang_jun.png  wang_lang.png  wang_lei.png  wang_lie.png  wang_ling.png  wang_ping.png  wang_su.png
wang_tong.png  wang_yun.png  wei_xu.png  wei_yan.png  wei_yao.png  wen_chou.png  wen_pin.png  wu_ban.png
wu_can.png  wu_furen.png  wu_jing.png  wu_shuo.png  wu_yan.png  wu_yi.png  wuhuan_wu_yan.png  xi_zheng.png
xiahou_dun.png  xiahou_shang.png  xiahou_xuan.png  xiahou_yuan.png  xiang_lang.png  xin_pi.png  xu_cao_hong.png  xu_chu.png
xu_dan.png  xu_he.png  xu_huang.png  xu_rong.png  xu_sheng.png  xu_shi.png  xu_xiang.png  xu_you.png
xue_ying.png  xue_zong.png  xun_chen.png  xun_you.png  xun_yu.png  yan_jun.png  yan_liang.png  yan_pu.png
yan_xiang.png  yan_xing.png  yan_yan.png  yang_ang.png  yang_biao.png  yang_feng.png  yang_hong.png  yang_hong_zhong.png
yang_hu.png  yang_qianwan.png  yang_qiu.png  yang_ren.png  yang_xiu.png  yang_yi.png  yang_zuo.png  yi_ji.png
yong_kai.png  you_tu.png  yu_du.png  yu_fan.png  yu_fu_luo.png  yu_jin.png  yuan_shang.png  yuan_shao.png
yuan_shu.png  yuan_tan.png  yuan_xi.png  yuan_yin.png  yue_jin.png  zang_ba.png  ze_rong.png  zhang_bao.png
zhang_bu.png  zhang_chang.png  zhang_fei.png  zhang_he.png  zhang_heng.png  zhang_hong.png  zhang_ji.png  zhang_jiao.png
zhang_kuang.png  zhang_liang.png  zhang_liao.png  zhang_lu.png  zhang_mancheng.png  zhang_min.png  zhang_ni.png  zhang_niujiao.png
zhang_quan.png  zhang_ren.png  zhang_song.png  zhang_ti.png  zhang_wei.png  zhang_wen.png  zhang_xian.png  zhang_xiu.png
zhang_xun.png  zhang_yan.png  zhang_yi.png  zhang_yi_2.png  zhang_yun.png  zhang_zhao.png  zhao_guang.png  zhao_hong.png
zhao_qi.png  zhao_yu.png  zhao_yun.png  zheng_du.png  zhong_hui.png  zhong_yao.png  zhongli_mu.png  zhou_fang.png
zhou_tai.png  zhou_yu.png  zhu_bao.png  zhu_hao.png  zhu_huan.png  zhu_ju.png  zhu_jun.png  zhu_ling.png
zhu_ran.png  zhu_yi.png  zhu_zhi.png  zhuge_dan.png  zhuge_jin.png  zhuge_ke.png  zhuge_liang.png  zhuge_shang.png
zhuge_zhan.png  zong_yu.png  zu_lang.png
```

## 二、部队标记 `assets/img/units/<兵种id>.png`

用途：舆图上部队标记底图。**若该部队有主将且该将有头像，则优先用头像**；无头像时才用兵种图；两者皆无，才用原有的圆徽文字。

建议 64×64 正方，主体居中。

| id | 名称 | 建议文件名 |
|---|---|---|
| `inf` | 郡国兵 | `inf.png` |
| `spear` | 长矛兵 | `spear.png` |
| `archer` | 弓手 | `archer.png` |
| `pike` | 大戟士 | `pike.png` |
| `crossbow` | 连弩士 | `crossbow.png` |
| `guard` | 亲卫 | `guard.png` |
| `cav` | 轻骑 | `cav.png` |
| `heavycav` | 甲骑 | `heavycav.png` |
| `cavarcher` | 骑射 | `cavarcher.png` |
| `siege` | 攻城器械 | `siege.png` |
| `navy` | 楼船 | `navy.png` |
| `transport` | 辎重车 | `transport.png` |
| `barbcav` | 蛮骑 | `barbcav.png` |
| `elephant` | 象兵 | `elephant.png` |

## 三、地形贴图 `assets/img/terrain/<地形key>.png`

用途：舆图上平铺在对应格子。缺图则用原有的矢量线与点纹理。

建议与原格同宽的正方形（当前格宽 40 CSS 像素、内部 1200×800），无缝平铺为佳。

| key | 名称 | 舆图字符 | 移动消耗 | 防守加成 | 建议文件名 |
|---|---|---|---|---|---|
| `plain` | 平原 | `.` | 1 | 0% | `plain.png` |
| `hill` | 丘陵 | `h` | 2 | 15% | `hill.png` |
| `mount` | 山地 | `^` | 3 | 30% | `mount.png` |
| `forest` | 林地 | `#` | 2 | 20% | `forest.png` |
| `marsh` | 沼泽 | `=` | 3 | 5% | `marsh.png` |
| `desert` | 大漠 | `d` | 2 | 5% | `desert.png` |
| `water` | 江海 | `~` | 1 | 0% | `water.png` |
| `ford` | 津渡 | `p` | 1 | 0% | `ford.png` |

## 四、势力旗 `assets/img/banners/<势力key>.png`（可选）

键：han dong lvbu yuan zhong wei jin shu yi jing hanzhong wu liaodong liang wan xu huangjin xianbei wuhuan nanxiong qiang shanyue nanman jiao neutral

建议 32×32。

## 五、城池图形 `assets/img/cities/<kind>.png`（可选）

用途：舆图上的城池图形；缺图则用原有的方城与垛口。

| 城中种类 | 建议文件名 | 城数 |
|---|---|---|
| 都城 | `duzhou.png` | 6 |
| 州治 | `zhouzhi.png` | 10 |
| 重镇 | `zhongzhen.png` | 40 |
| 县城 | `xiancheng.png` | 30 |
| 关隘 | `guanai.png` | 7 |
| 港口 | `gangkou.png` | 3 |

建议 48×48 或与格同宽，主体居中，四周留白少许。

