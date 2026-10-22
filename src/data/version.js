/* 《代汉涂高》 — 版本
 * 版本号四段：主 . 次 . 修订 . 构建
 *   主：格局之变（如舆图、剧本、存档体系之改）
 *   次：功能之增
 *   修订：修缺与调平
 *   构建：每提交必增
 * 本文件之 version、仓库根目录 VERSION 文件、CHANGELOG.md 首条三者须一致，
 * 由 tools/validate.js 交叉校验，不得手改其一而遗其二。
 */
(function (root) {
  'use strict';

  var APP_VERSION = {
    version: '1.1.0.0',
    date: '2026-10-22',
    name: '修整与适配',
    summary: '一修图象之弊：缺图不再先冒空框、不再重复请求（旧法每次重绘都先塞图再等三次 404，故侧栏成片闪烁；今只认确证已得之图，未就绪者立刻以文字旗绘出，图既得就地换入，每一名字只试一次，探测有节）；二减进度条之冗：列表一律用数字，横条只存朝局一卡；三增分端之式：桌面、平板、手机与横持手机各有排布，舆图窄屏可左右推移、触控目标加大、主页面底栏吸底。玩法与数据一如既往。',
    scheme: '四段：主.次.修订.构建。凡有改动必升版本，构建号每提交必增；版本号与改易之目一并记于 CHANGELOG.md。',
    stage: '预览版与正式版同源：由 GitHub Pages 发布者为预览版，不含账号与存档；自建服务发布者为正式版，含账号、存档与在线更新。'
  };

  root.APP_VERSION = APP_VERSION;
  if (typeof module !== 'undefined' && module.exports) { module.exports = APP_VERSION; }
})(typeof window !== 'undefined' ? window : globalThis);
