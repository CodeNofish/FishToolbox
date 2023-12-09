https://github.com/fengyuanchen/postcss-header

[TOC]

# postcss-header

> 向文件添加标头。

#### Install

```cmd
npm install postcss-header postcss --save-dev
```

#### Usage

```js
const postcss = require('postcss');
const header = require('postcss-header');
const result = postcss(header({
  header: '/* A simple header */',
})).process('.foo{}');

console.log(result);
// > /* A simple header */
// > .foo{}
```

#### Options

header

该字符串将被放置在 CSS 文件的开头。