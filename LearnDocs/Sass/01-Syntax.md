https://sass-lang.com/documentation/syntax/

[TOC]

# Syntax

Sass 支持两种不同的语法。每个都可以加载另一个，因此由您和您的团队选择哪一个。



## Overview

#### SCSS

SCSS 语法使用文件扩展名 .scss。除了一些小例外，它是 CSS 的超集，这意味着基本上所有有效的 CSS 也是有效的 SCSS。由于它与 CSS 相似，因此它是最容易习惯且最受欢迎的语法。

SCSS 看起来像这样：

```scss
@mixin button-base() {
  @include typography(button);
  @include ripple-surface;
  @include ripple-radius-bounded;

  display: inline-flex;
  position: relative;
  height: $button-height;
  border: none;
  vertical-align: middle;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    color: $mdc-button-disabled-ink-color;
    cursor: default;
    pointer-events: none;
  }
}
```

#### The Indented Syntax

缩进语法是 Sass 的原始语法，因此它使用文件扩展名 .sass。由于这个扩展名，它有时简称为“Sass”。缩进语法支持与 SCSS 相同的所有功能，但它使用缩进而不是大括号和分号来描述文档的格式。

一般来说，任何时候您在 CSS 或 SCSS 中编写大括号时，都可以在缩进语法中更深一级缩进。每当一行结束时，都算作一个分号。整个参考中都指出了缩进语法中的一些其他差异。

> Heands up
>
> 缩进语法当前不支持跨多行换行的表达式。请参阅问题#216。

缩进语法如下所示：

```sass
@mixin button-base()
  @include typography(button)
  @include ripple-surface
  @include ripple-radius-bounded

  display: inline-flex
  position: relative
  height: $button-height
  border: none
  vertical-align: middle

  &:hover
    cursor: pointer

  &:disabled
    color: $mdc-button-disabled-ink-color
    cursor: default
    pointer-events: none
```



## Parsing a Stylesheet

Sass 样式表是从一系列 Unicode 代码点解析而来的。它是直接解析的，无需先转换为令牌流。

#### Input Encoding

通常情况下，文档最初只能作为字节序列使用，必须将其解码为 Unicode。 Sass 按如下方式执行此解码：

* 如果字节序列以 U+FEFF BYTE ORDER MARK 的 UTF-8 或 UTF-16 编码开头，则使用相应的编码。

* 如果字节序列以纯 ASCII 字符串 @charset 开头，Sass 会使用 CSS 算法的步骤 2 来确定编码，以确定后备编码。

* 否则，将使用 UTF-8。

#### Parse Errors

当 Sass 在样式表中遇到无效语法时，解析将失败，并向用户显示错误，其中包含有关无效语法的位置及其无效原因的信息。

请注意，这与 CSS 不同，CSS 指定如何从大多数错误中恢复而不是立即失败。这是 SCSS 严格来说不是 CSS 超集的少数情况之一。然而，对于 Sass 用户来说，立即看到错误比将错误传递到 CSS 输出更有用。

可以通过特定于实现的 API 访问解析错误的位置。例如，在 Dart Sass 中，您可以访问 SassException.span，在 Node Sass 和 Dart Sass 的 JS API 中，您可以访问文件、行和列属性。



## Structure of a Stylesheet

就像 CSS 一样，大多数 Sass 样式表主要由包含属性声明的样式规则组成。但 Sass 样式表还有许多其他功能可以与这些功能并存。

#### Statements

Sass 样式表由一系列语句组成，对这些语句进行评估以构建生成的 CSS。某些语句可能具有使用 { 和 } 定义的块，其中包含其他语句。例如，样式规则是带有块的语句。该块包含其他语句，例如属性声明。

在 SCSS 中，语句之间用分号分隔（如果语句使用块，则分号是可选的）。在缩进语法中，它们只是用换行符分隔。

###### Universal Statements

这些类型的语句可以在 Sass 样式表中的任何位置使用：

* 变量声明，如 $var: value。
* 流量控制 at 规则，如 @if 和 @each。
* @error、@warn 和 @debug 规则。

###### CSS Statements

这些语句生成 CSS。它们可以在除 @function 之外的任何地方使用：

* 样式规则，例如 h1 { /* ... */ }。
* CSS at-rules，如@media 和@font-face。
* Mixin 使用@include。
* @at-root 规则。

###### Top-Level Statements

这些语句只能在样式表的顶层使用，或者嵌套在顶层的 CSS 语句中：

* 使用@use 加载模块。
* 导入，使用@import。
* 使用@mixin 进行混合定义。
* 使用@function 定义函数。

###### Other Statements

* 像 width: 100px 这样的属性声明只能在样式规则和某些 CSS at-rules 中使用。
* @extend 规则只能在样式规则中使用。



#### Expressions

表达式是属性或变量声明右侧的任何内容。每个表达式都会产生一个值。任何有效的 CSS 属性值也是 Sass 表达式，但 Sass 表达式比普通 CSS 值更强大。它们作为参数传递给 mixin 和函数，用于通过 @if 规则控制流，并使用算术进行操作。我们将 Sass 的表达式语法称为 SassScript。

###### Literals

最简单的表达式仅表示静态值：

* 数字，可能有单位，也可能没有单位，例如 12 或 100px。
* 字符串，可能有引号，也可能没有引号，例如“Helvetica Neue”或粗体。
* 颜色，可以通过十六进制表示形式或名称来引用，例如 #c6538c 或蓝色。
* 布尔文字 true 或 false。
* 单例为空。
* 值列表，可以用空格或逗号分隔，可以用方括号括起来，也可以不用方括号括起来，例如 1.5em 1em 0 2em、Helvetica、Arial、sans-serif 或 [col1-start]。
* 将值与键关联的映射，例如（“背景”：红色，“前景”：粉色）。

###### Operations

Sass 定义了许多操作的语法：

* == 和 != 用于检查两个值是否相同。
* +、-、*、/ 和 % 具有数字的通常数学含义，并且单位具有与科学数学中的单位使用相匹配的特殊行为。
* <、<=、> 和 >= 检查两个数字是否大于或小于彼此。
* and、or、and 不具有通常的布尔行为。 Sass 认为除 false 和 null 之外的每个值都是“true”。
* +、- 和 / 可用于连接字符串。
* ( 和 ) 可用于显式控制运算的优先顺序。

###### Other Expressions

* 变量，例如 $var。
* 函数调用，例如 nth($list, 1) 或 var(--main-bg-color)，它们可能会调用 Sass 核心库函数或用户定义的函数，或者可能会直接编译为 CSS。
* 特殊函数，例如 calc(1px + 100%) 或 url(http://myapp.com/assets/logo.png)，有自己独特的解析规则。
* 父选择器，&。
* 值 !important，被解析为不带引号的字符串。



## Comments

SCSS 和缩进语法之间的 Sass 注释工作方式有很大不同。两种语法都支持两种类型的注释：使用 /* */ 定义的注释（通常）编译为 CSS，以及使用 // 定义的注释则不是。

#### In SCSS

SCSS 中的注释与 JavaScript 等其他语言中的注释类似。单行注释以 // 开始，一直到行尾。单行注释中的任何内容都不会以 CSS 形式发出；就 Sass 而言，它们可能不存在。它们也被称为无声评论，因为它们不产生任何 CSS。

多行注释以 /* 开始，到下一个 */ 结束。如果在允许语句的地方写入多行注释，它将被编译为 CSS 注释。与无声评论相比，它们也被称为响亮评论。编译为 CSS 的多行注释可能包含插值，该插值将在编译注释之前进行评估。

默认情况下，多行注释将从压缩模式下编译的 CSS 中删除。但是，如果注释以 /*! 开头，它将始终包含在 CSS 输出中。

```scss
// This comment won't be included in the CSS.

/* But this comment will, except in compressed mode. */

/* It can also contain interpolation:
* 1 + 1 = #{1 + 1} */

/*! This comment will be included even in compressed mode. */

p /* Multi-line comments can be written anywhere
  * whitespace is allowed. */ .sans {
  font: Helvetica, // So can single-line comments.
        sans-serif;
}
```

```css
/* But this comment will, except in compressed mode. */
/* It can also contain interpolation:
* 1 + 1 = 2 */
/*! This comment will be included even in compressed mode. */
p .sans {
  font: Helvetica, sans-serif;
}
```



#### In Sass

缩进语法中的注释工作方式略有不同：它们是基于缩进的，就像语法的其余部分一样。与 SCSS 一样，用 // 编写的无声注释永远不会作为 CSS 发出，但与 SCSS 不同的是，开头 // 下方缩进的所有内容也会被注释掉。

以 /* 开头的缩进语法注释与缩进的工作方式相同，只不过它们被编译为 CSS。由于注释的范围基于缩进，因此结束 */ 是可选的。与 SCSS 一样，/* 注释可以包含插值，并且可以以 /* 开头！以避免在压缩模式下被剥离。

注释也可以在缩进语法的表达式中使用。在本例中，它们的语法与 SCSS 中的语法完全相同。

```sass
// This comment won't be included in the CSS.
  This is also commented out.

/* But this comment will, except in compressed mode.

/* It can also contain interpolation:
  1 + 1 = #{1 + 1}

/*! This comment will be included even in compressed mode.

p .sans
  font: Helvetica, /* Inline comments must be closed. */ sans-serif
```



#### Documentation Comments

使用 Sass 编写样式库时，您可以使用注释来记录库提供的 mixin、函数、变量和占位符选择器以及库本身。这些注释由 SassDoc 工具读取，该工具使用它们生成漂亮的文档。查看 Susy 网格引擎的文档以了解其实际情况！

文档注释是无声注释，用三个斜杠 (///) 直接写在您正在记录的内容上方。 SassDoc 将注释中的文本解析为 Markdown，并支持许多有用的注释来详细描述它。

```scss
/// Computes an exponent.
///
/// @param {number} $base
///   The number to multiply by itself.
/// @param {integer (unitless)} $exponent
///   The number of `$base`s to multiply together.
/// @return {number} `$base` to the power of `$exponent`.
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}
```



## Special Functions

CSS 定义了许多函数，其中大多数都可以与 Sass 的正常函数语法配合使用。它们被解析为函数调用，解析为纯 CSS 函数，并按原样编译为 CSS。不过，也有一些例外，它们具有特殊的语法，不能仅解析为 SassScript 表达式。所有特殊函数调用都会返回不带引号的字符串。

#### url()

url() 函数在 CSS 中常用，但其语法与其他函数不同：它可以采用带引号或不带引号的 URL。由于不带引号的 URL 不是有效的 SassScript 表达式，因此 Sass 需要特殊的逻辑来解析它。

如果 url() 的参数是有效的不带引号的 URL，Sass 会按原样解析它，尽管也可以使用插值来注入 SassScript 值。如果它不是有效的不带引号的 URL（例如，如果它包含变量或函数调用），则会将其解析为普通的纯 CSS 函数调用。

```scss
$roboto-font-path: "../fonts/roboto";

@font-face {
    // This is parsed as a normal function call that takes a quoted string.
    src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2");

    font-family: "Roboto";
    font-weight: 100;
}

@font-face {
    // This is parsed as a normal function call that takes an arithmetic
    // expression.
    src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2");

    font-family: "Roboto";
    font-weight: 300;
}

@font-face {
    // This is parsed as an interpolated special function.
    src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2");

    font-family: "Roboto";
    font-weight: 400;
}
```

#### element(), progid:...(), and expression()

element() 函数在 CSS 规范中定义，由于其 ID 可以解析为颜色，因此需要特殊解析。

expression() 和以 progid 开头的函数：是使用非标准语法的旧版 Internet Explorer 功能。尽管最新的浏览器不再支持它们，但 Sass 仍继续解析它们以实现向后兼容性。

Sass 允许在这些函数调用中使用任何文本，包括嵌套括号。除了可以使用插值来注入动态值之外，没有任何内容被解释为 SassScript 表达式。

```scss
$logo-element: logo-bg;

.logo {
  background: element(##{$logo-element});
}
```

```css
.logo {
  background: element(#logo-bg);
}
```

