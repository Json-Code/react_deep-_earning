/**
 * @file config-overrides.js
 * 基于customize-cra和react-app-rewired的定制化配置文件
 */

// 从customize-cra引入一些相关的方法
const { override, addLessLoader, fixBabelImports, addDecoratorsLegacy} = require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(
  // 添加lessloader
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  // 添加装饰器写法
  addDecoratorsLegacy(),
  // 添加antd按需引入
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // `style: true` 会加载 less 文件
  }),
)