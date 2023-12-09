https://www.npmjs.com/package/moment

https://github.com/moment/moment

https://momentjs.com/

[TOC]

## Moment.js

**用于解析、验证、操作和格式化日期的 JavaScript 日期库。**

#### Project Status

Moment.js 是一个遗留项目，现在处于维护模式。在大多数情况下，您应该选择不同的库。

有关更多详细信息和建议，请参阅文档中的项目状态。

#### Install

```cmd
npm install moment --save   # npm
```

#### Usage

###### Format Dates

```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // December 8th 2023, 12:40:25 pm
moment().format('dddd');                    // Friday
moment().format("MMM Do YY");               // Dec 8th 23
moment().format('YYYY [escaped] YYYY');     // 2023 escaped 2023
moment().format();                          // 2023-12-08T12:40:25+08:00         
```

###### Relative Time

```js
moment("20111031", "YYYYMMDD").fromNow(); // 12 years ago
moment("20120620", "YYYYMMDD").fromNow(); // 11 years ago
moment().startOf('day').fromNow();        // 13 hours ago
moment().endOf('day').fromNow();          // in 11 hours
moment().startOf('hour').fromNow();       // 43 minutes ago
```

###### Calendar Time 日历时间

```js
moment().subtract(10, 'days').calendar(); // 11/28/2023
moment().subtract(6, 'days').calendar();  // Last Saturday at 12:43 PM
moment().subtract(3, 'days').calendar();  // Last Tuesday at 12:43 PM
moment().subtract(1, 'days').calendar();  // Yesterday at 12:43 PM
moment().calendar();                      // Today at 12:43 PM
moment().add(1, 'days').calendar();       // Tomorrow at 12:43 PM
moment().add(3, 'days').calendar();       // Monday at 12:43 PM
moment().add(10, 'days').calendar();      // 12/18/2023
```

###### Multiple Locale Support

```js
moment.locale();         // en
moment().format('LT');   // 12:44 PM
moment().format('LTS');  // 12:44:05 PM
moment().format('L');    // 12/08/2023
moment().format('l');    // 12/8/2023
moment().format('LL');   // December 8, 2023
moment().format('ll');   // Dec 8, 2023
moment().format('LLL');  // December 8, 2023 12:44 PM
moment().format('lll');  // Dec 8, 2023 12:44 PM
moment().format('LLLL'); // Friday, December 8, 2023 12:44 PM
moment().format('llll'); // Fri, Dec 8, 2023 12:44 PM
```



```js
var moment = require('moment'); // require
moment().format(); 
```

#### Parse

Moment.js 没有修改原生的 Date.prototype，而是为 Date 对象创建了一个包装器。要获取此包装对象，只需使用支持的输入类型之一调用 moment() 即可。

Moment原型通过moment.fn公开。如果您想添加自己的功能，则可以将它们放在此处。

为了便于参考，Moment.prototype 上的任何方法都将在文档中引用为 moment#method。所以 Moment.prototype.format == moment.fn.format == moment#format。



略

https://momentjs.com/docs/#/parsing/