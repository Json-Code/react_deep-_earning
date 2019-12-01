/**
 * @file config-overrides.js
 * 基于customize-cra和react-app-rewired的定制化配置文件
 */

// 从customize-cra引入一些相关的方法
const { override } = require('customize-cra')

module.exports = override()