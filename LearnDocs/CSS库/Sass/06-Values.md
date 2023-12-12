https://sass-lang.com/documentation/values/

[TOC]

# Values

Sass 支持多种值类型，其中大部分直接来自 CSS。每个表达式都会产生一个值，变量保存值。大多数值类型直接来自 CSS：

* 数字，可能有单位，也可能没有单位，例如 12 或 100px。
* 字符串，可能有引号，也可能没有引号，例如“Helvetica Neue”或粗体。
* 颜色，可以通过其十六进制表示形式或名称来引用，例如 #c6538c 或 blue，或者从函数返回，例如 rgb(107, 113, 127) 或 hsl(210, 100%, 20%)
* 值列表，可以用空格或逗号分隔，可以用方括号括起来，也可以不用方括号括起来，例如 1.5em 1em 0 2em、Helvetica、Arial、sans-serif 或 [col1-start]。

还有一些特定于 Sass 的：

* 布尔值 true 和 false。
* The singleton [`null`](https://sass-lang.com/documentation/values/null) value.
* 将值与键关联的映射，例如（“背景”：红色，“前景”：粉色）。
* 由 get-function() 返回并用 call() 调用的函数引用。