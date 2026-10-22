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
    version: '0.3.0.0',
    date: '2026-10-22',
    name: '朝局之变',
    summary: '朝局之制：党争、名分与储位三者相因，岁入、民心、臣心皆随之而动；庙堂增「议政」十五题与「立储」（十二君、三十一子），政争事件四十九事依史系年而发，皆须抉择；关卡增至朝局之志（平党争、定储位、正名分）六关；并辨预览版与正式版之别。',
    scheme: '四段：主.次.修订.构建。凡有改动必升版本，构建号每提交必增；版本号与改易之目一并记于 CHANGELOG.md。',
    stage: '预览版与正式版同源：由 GitHub Pages 发布者为预览版，不含账号与存档；自建服务发布者为正式版，含账号、存档与在线更新。'
  };

  root.APP_VERSION = APP_VERSION;
  if (typeof module !== 'undefined' && module.exports) { module.exports = APP_VERSION; }
})(typeof window !== 'undefined' ? window : globalThis);
