/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */

import path from 'path';

const errorCodesPath = path.resolve(__dirname, './docs/public/static/error-codes.json');
const missingError = process.env.MUI_EXTRACT_ERROR_CODES === 'true' ? 'write' : 'annotate';

// 解析路径别名到实际路径
function resolveAliasPath(relativeToBabelConf) {
  const resolvedPath = path.relative(process.cwd(), path.resolve(__dirname, relativeToBabelConf));
  return `./${resolvedPath.replace('\\', '/')}`;
}

// 生产环境的插件
const productionPlugins = [
  // 用于删除 React 属性的 Babel 插件。
  // 删除包含 'data-mui-test' 的测试用属性
  // https://github.com/oliviertassinari/babel-plugin-react-remove-properties
  ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
];

// 您可以访问任何 Node.js API，例如基于流程环境的动态配置：
module.exports = function getBabelConfig(api) {
  // api.env
  // 由于 NODE_ENV 是一种相当常见的切换行为的方式，Babel 还包含一个专门用于此目的的 API 函数。
  // 此 API 用作检查 Babel 加载的“envName”的快速方法，如果没有设置其他覆盖环境，则会考虑 NODE_ENV。
  const useESModules = api.env(['regressions', 'legacy', 'modern', 'stable', 'rollup']);

  const defaultAlias = {
    '@mui/material': resolveAliasPath('./packages/mui-material/src'),
    '@mui/docs': resolveAliasPath('./packages/mui-docs/src'),
    '@mui/icons-material': resolveAliasPath(
      `./packages/mui-icons-material/lib${useESModules ? '/esm' : ''}`,
    ),
    '@mui/lab': resolveAliasPath('./packages/mui-lab/src'),
    '@mui/markdown': resolveAliasPath('./packages/markdown'),
    '@mui/styled-engine': resolveAliasPath('./packages/mui-styled-engine/src'),
    '@mui/styled-engine-sc': resolveAliasPath('./packages/mui-styled-engine-sc/src'),
    '@mui/styles': resolveAliasPath('./packages/mui-styles/src'),
    '@mui/system': resolveAliasPath('./packages/mui-system/src'),
    '@mui/private-theming': resolveAliasPath('./packages/mui-private-theming/src'),
    '@mui/base': resolveAliasPath('./packages/mui-base/src'),
    '@mui/utils': resolveAliasPath('./packages/mui-utils/src'),
    '@mui/material-next': resolveAliasPath('./packages/mui-material-next/src'),
    '@mui/joy': resolveAliasPath('./packages/mui-joy/src'),
  };

  // 处理此文件时要激活的一组预设。
  const presets = [
    [
      // 支持浏览器列表 不同环境编译转换
      '@babel/preset-env',
      {
        // 尝试将损坏的语法编译为目标浏览器支持的最接近的未损坏的现代语法
        bugfixes: true,
        // 要使用的 Browserslist 环境。从env环境变量中获取
        browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        // 输出到console.log由preset-env启用的polyfills和transform插件，如果适用的话，你的目标之一需要它。
        // MUI可视化构建时启用
        debug: process.env.MUI_BUILD_VERBOSE === 'true',
        // 允许将 ES 模块语法转换为另一种模块类型。
        modules: useESModules ? false : 'commonjs',
        // 切换启用对浏览器中附带的内置/功能提案的支持。
        // 在node运行现代浏览器modern环境时启用
        shippedProposals: api.env('modern'),
      },
    ],
    [
      // 支持react开发运行
      '@babel/preset-react',
      {
        // 决定使用哪个运行时。
        // automatic auto imports the functions that JSX transpiles to.
        // classic does not automatic import anything.
        // 自动转换JSX
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ];

  const plugins = [
    [
      // 支持宏替换
      'babel-plugin-macros',
      {
        // see MuiError.macro.js
        muiError: {
          errorCodesPath,
          missingError,
        },
      },
    ],
    // Babel 插件，用于优化 clsx、类名和所有具有兼容 API 的库的使用
    // https://github.com/merceyz/babel-plugin-optimize-clsx
    'babel-plugin-optimize-clsx',
    // Need the following 3 proposals for all targets in .browserslistrc.
    // With our usage the transpiled loose mode is equivalent to spec mode.
    // 类属性转换
    // 当loose设置为 true 时，类属性将被编译为赋值表达式而不是 Object.defineProperty。
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // 私有方法转换
    // 当loose为 true 时，私有方法将通过 Object.defineProperty 而不是 WeakSet 直接分配到其父级上。
    // 这会提高性能和调试（正常属性访问与 .get()），但代价是可能通过 Object.getOwnPropertyNames 等方式泄漏“私有”。
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    // 对象私有属性
    // 当loose为 true 时，表达式中的私有属性将检查对象上自己的属性（而不是继承的属性），而不是检查 WeakSet 中是否存在。
    // 这会提高性能和调试（正常属性访问与 .get()），但代价是可能通过 Object.getOwnPropertyNames 等方式泄漏“私有”。
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    // 启用此选项将使用Babel的extends helper，它与Object.assign基本相同
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    [
      // Babel运行时
      // 可以重复使用 Babel 注入的帮助程序代码以节省代码大小。
      '@babel/plugin-transform-runtime',
      {
        useESModules,
        // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
        version: '^7.4.4',
      },
    ],
    [
      // 从生产版本中删除 React propTypes，因为它们仅在开发中使用。您可以通过删除它们来节省带宽。
      // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
      'babel-plugin-transform-react-remove-prop-types',
      {
        mode: 'unsafe-wrap',
      },
    ],
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(...productionPlugins);
  }

  if (process.env.NODE_ENV === 'test') {
    plugins.push([
      // Babel 插件，用于在使用 Babel 编译代码时为模块添加新的解析器。
      // 该插件允许您添加包含模块的新“根”目录。它还允许您为目录、特定文件甚至其他 npm 模块设置自定义别名。
      // https://github.com/tleunen/babel-plugin-module-resolver/tree/master
      'babel-plugin-module-resolver',
      {
        alias: defaultAlias,
        root: ['./'],
      },
    ]);
  }

  return {
    // 编译假设: 告诉 Babel 它可以对你的代码做出哪些假设，以更好地优化编译结果。
    // https://babeljs.io/docs/assumptions
    assumptions: {
      noDocumentAll: true,
    },
    presets,
    plugins,
    // 如果任何模式匹配，Babel 将立即停止当前构建的所有处理。
    ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
    // 允许用户提供一系列选项，一次将一个选项合并到当前配置中。
    overrides: [
      {
        // 排除测试文件
        exclude: /\.test\.(js|ts|tsx)$/,
        // 该插件可以通过将 React 元素提升到尽可能高的范围来加速协调并减少垃圾收集压力，从而防止多次不必要的重新实例化。
        // https://babeljs.io/docs/babel-plugin-transform-react-constant-elements
        plugins: ['@babel/plugin-transform-react-constant-elements'],
      },
    ],
    // 允许整个嵌套配置选项，仅当 envKey 与 envName 选项匹配时才会启用。
    env: {
      coverage: {
        plugins: [
          // 可以用istanbul覆盖率来检测你的代码。它可以立即与 Node.js 上的 karma-coverage 和 mocha 一起使用（通过 nyc）。
          // https://github.com/istanbuljs/babel-plugin-istanbul
          'babel-plugin-istanbul',
          // 模块解析器
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: defaultAlias,
            },
          ],
        ],
      },
      development: {
        plugins: [
          [
            // 模块解析器
            'babel-plugin-module-resolver',
            {
              alias: {
                ...defaultAlias,
                modules: './modules',
                'typescript-to-proptypes': './packages/typescript-to-proptypes/src',
              },
              root: ['./'],
            },
          ],
        ],
      },
      legacy: {
        plugins: [
          // IE11 support
          '@babel/plugin-transform-object-assign',
        ],
      },
      test: {
        sourceMaps: 'both',
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: defaultAlias,
            },
          ],
        ],
      },
      benchmark: {
        plugins: [
          ...productionPlugins,
          [
            'babel-plugin-module-resolver',
            {
              alias: defaultAlias,
            },
          ],
        ],
      },
    },
  };

};
