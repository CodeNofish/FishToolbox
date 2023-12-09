https://www.npmjs.com/package/md5

https://github.com/pvorb/node-md5#readme

[TOC]

# MD5

用于使用 MD5 对消息进行哈希处理的 JavaScript 函数。

node-md5 由以下工具赞助；请查看并注册免费试用来支持我们

## Installation

您可以在服务器端和客户端使用此包。

```cmd
npm install md5
```

## API

```js
md5(message)
```

* `message` -- `String`, `Buffer`, `Array` or `Uint8Array`
* returns `String`

#### Usage

```js
const md5 = require('md5');

console.log(md5('message'));
```

这将打印以下内容

```
78e731027d8fd50ed642340b7c9a63b3
```

它也支持缓冲区

```js
const fs = require('fs');
const md5 = require('md5');

fs.readFile('example.txt', function(err, buf) {
  console.log(md5(buf));
});
```

## Versions

在 2.0.0 版本之前，npm 上有两个名为 md5 的包，一个小写，一个大写（您正在查看的那个）。从版本 2.0.0 开始，该模块的所有新版本都将在 npm 上使用小写 md5。要使用正确的版本，如果此模块的用户想要使用 >= 2.0.0 的版本，则必须将其代码从 require('MD5') 更改为 require('md5')。