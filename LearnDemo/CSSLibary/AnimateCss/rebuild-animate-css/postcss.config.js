const fs = require('fs');
const {homepage, version, author, animateConfig} = JSON.parse(fs.readFileSync('package.json'));

const header = `
@charset "UTF-8";

/*!
 * animate.css - ${homepage}
 * Version - ${version}
 * Licensed under the Hippocratic License 2.1 - http://firstdonoharm.dev
 *
 * Copyright (c) ${new Date().getFullYear()} ${author.name}
 */

`;

// 导出node模块
module.exports = (ctx) => {
  const prefix = ctx.env === 'compat' ? '' : animateConfig.prefix;
  const devMessage = `🎉🎉🎉🎉 \nanimate.css ${ctx.env} build was compiled successfully! \n`;

  console.log(devMessage);

  return {
    // 使用 CLI 的设置
    map: ctx.options.map,
    parser: ctx.options.parser,
    plugins: {
      'postcss-import': {
        // @import 根目录
        root: ctx.file.dirname,
      },
      // 添加前缀
      'postcss-prefixer': {
        prefix,
        ignore: [/\[class\*=.*\]/],
      },
      // 预设环境
      'postcss-preset-env': {
        // autoprefixer 添加流行的供应商前缀
        autoprefixer: {
          // should Autoprefixer use Visual Cascade, if CSS is uncompressed.
          // https://stackoverflow.com/questions/53395252/cascade-option-in-gulp-autoprefixer
          // 生成代码是否使用瀑布缩进 来让CSS属性值相对统一在一条竖线上
          cascade: false,
        },
        // polyfill 配置
        features: {
          // 启用CSS自定义属性
          'custom-properties': true,
        },
      },
      // 减少代码体积
      cssnano: ctx.env === 'production' || ctx.env === 'compat' ? {} : false,
      // 添加版权说明
      'postcss-header': {
        header,
      },
    },
  };
};
