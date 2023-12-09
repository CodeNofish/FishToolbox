https://github.com/marceloucker/postcss-prefixer

[TOC]

# postcss-prefixer

一个 PostCSS 插件，用于为 css 选择器添加前缀。

```css
/* source css file */

#selector { /* content */ }

.selector { /* content */ }

.selector:hover { /* content */ }

.selector__element { /* content */ }
```

```css
/* output css file prefixed with "prfx__" */

#prfx__selector { /* content */ }

.prfx__selector { /* content */ }

.prfx__selector:hover { /* content */ }

.prfx__selector__element { /* content */ }
```

#### Usage

`npm i -D postcss postcss-prefixer` 或 `yarn add -D postcss postcss-prefixer`

创建一个 postcss.config.js ：

```js
module.exports = {
  plugins: [
    require('postcss-prefixer')({ /* options */ })
  ]
}
```

> 请参阅 PostCSS 用法，了解如何将其与您首选的构建工具一起使用。

#### Example

```js
const postcss = require('postcss');
const prefixer = require('postcss-prefixer');

const input = fs.readFileSync('path/to/file.css',  'utf-8');

const output = postcss([
  prefixer({
        prefix: 'prefix-',
        ignore: [ /selector-/, '.ignore', '#ignore' ]
    })
]).process(input);
```



#### Options

| Name姓名                        | Description描述                                              |
| ------------------------------- | ------------------------------------------------------------ |
| `prefix` (string)前缀（字符串） | prefix value to be used要使用的前缀值                        |
| `ignore` (array)忽略（数组）    | list of selectors to ignore, accepts regex要忽略的选择器列表，接受正则表达式 |