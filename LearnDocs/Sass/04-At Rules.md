https://sass-lang.com/documentation/at-rules/

[TOC]

# At-Rules

Sass 的许多额外功能都以在 CSS 之上添加的新 at 规则的形式出现：

* @use 从其他 Sass 样式表加载 mixins、函数和变量，并将多个样式表中的 CSS 组合在一起。
* @forward 加载 Sass 样式表，并在使用 @use 规则加载样式表时使其 mixins、函数和变量可用。
* @import 扩展了 CSS at 规则，以从其他样式表加载样式、混合、函数和变量。
* @mixin 和 @include 可以轻松地重复使用样式块。
* @function 定义可在 SassScript 表达式中使用的自定义函数。
* @extend 允许选择器相互继承样式。
* @at-root 将样式放入 CSS 文档的根部。
* @error 导致编译失败并显示错误消息。
* @warn 打印警告而不完全停止编译。
* @debug 打印一条消息以进行调试。
* @if、@each、@for 和 @while 等流程控制规则控制是否发出样式或发出多少次样式。

Sass 对于纯 CSS at 规则也有一些特殊行为：它们可以包含插值，并且可以嵌套在样式规则中。其中一些（例如 @media 和 @supports）还允许直接在规则本身中使用 SassScript，无需插值。



## @use

@use 规则加载其他 Sass 样式表中的 mixin、函数和变量，并将多个样式表中的 CSS 组合在一起。由@use加载的样式表称为“模块”。 Sass 还提供了充满有用功能的内置模块。