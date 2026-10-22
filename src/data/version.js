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
    version: '0.2.0.0',
    date: '2026-10-22',
    name: '剧本与关卡之制',
    summary: '一君主多剧本、一剧本多关卡：二十六主共五十六局、二百七十二关，逐关有定志，末关开放；新增剧本 e215（汉中之争），关卡列表可复挑战、新关随前关之克而启，进度记于本地。',
    scheme: '四段：主.次.修订.构建。凡有改动必升版本，构建号每提交必增；版本号与改易之目一并记于 CHANGELOG.md。',
    stage: '预览版与正式版同源：由 GitHub Pages 发布者为预览版，不含账号与存档；自建服务发布者为正式版，含账号、存档与在线更新。'
  };

  root.APP_VERSION = APP_VERSION;
  if (typeof module !== 'undefined' && module.exports) { module.exports = APP_VERSION; }
})(typeof window !== 'undefined' ? window : globalThis);
