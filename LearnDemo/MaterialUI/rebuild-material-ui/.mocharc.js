module.exports = {
  // 定义哪些文件被视为测试文件。
  extension: ['js', 'mjs', 'ts', 'tsx'],
  // 明确忽略否则会加载的一个或多个测试文件、目录或 glob
  ignore: [
    '**/build/**',
    '**/node_modules/**',
    // Mocha seems to ignore .next anyway (maybe because dotfiles?).
    // We're leaving this to make sure.
    'docs/.next/**',
  ],
  // 查找测试文件时，递归到子目录。
  recursive: true,
  // 指定测试用例超时，默认为两 (2) 秒（2000 毫秒）
  timeout: (process.env.CIRCLECI === 'true' ? 5 : 2) * 1000, // Circle CI has low-performance CPUs.
  // 指定将使用的报告器，默认为spec。
  reporter: 'dot',
  // 在加载用户界面或测试文件之前需要一个模块。
  require: [
    '@mui-internal/test-utils/setupBabel',
    // '@mui-internal/test-utils/setupJSDOM',
  ],
  // 要从监视中排除的路径或全局变量的列表。
  'watch-ignore': [
    // default
    '.git',
    // node_modules can be nested with workspaces
    '**/node_modules/**',
    // Unrelated directories with a large number of files
    '**/build/**',
    'docs/.next/**',
  ],
};
