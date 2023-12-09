https://sass-lang.com/

Sass 是世界上最成熟、最稳定、最强大的专业级 CSS 扩展语言。

* 兼容CSS

  Sass 与所有版本的 CSS 完全兼容。我们非常重视这种兼容性，以便您可以无缝地使用任何可用的 CSS 库。

* Feature Rich

  Sass 拥有比任何其他 CSS 扩展语言更多的特性和能力。 Sass 核心团队不断努力，不仅跟上潮流，而且保持领先。

* Frameworks

  使用 Sass 构建的框架数不胜数。 Bootstrap、Bourbon 和 Susy 仅举几例。



## Preprocessing

CSS 本身可能很有趣，但样式表变得越来越大、越来越复杂并且更难维护。这就是预处理器可以提供帮助的地方。 Sass 具有 CSS 中尚不存在的功能，例如嵌套、混合、继承以及其他可帮助您编写健壮、可维护的 CSS 的实用功能。

一旦您开始修改 Sass，它就会获取您预处理的 Sass 文件并将其保存为可在您的网站中使用的普通 CSS 文件。

实现这一点的最直接方法是在您的终端中。安装 Sass 后，您可以使用 sass 命令将 Sass 编译为 CSS。您需要告诉 Sass 从哪个文件构建以及将 CSS 输出到哪里。例如，从终端运行 sass input.scss output.css 将采用单个 Sass 文件 input.scss，并将该文件编译为 output.css。

您还可以使用 --watch 标志监视单个文件或目录。 watch 标志告诉 Sass 监视源文件的更改，并在每次保存 Sass 时重新编译 CSS。如果您想监视（而不是手动构建）您的 input.scss 文件，您只需将监视标志添加到您的命令中，如下所示：

```cmd
sass --watch input.scss output.css
```

您可以使用文件夹路径作为输入和输出，并用冒号分隔它们来监视和输出到目录。在此示例中：

```cmd
sass --watch app/sass:public/stylesheets
```

Sass 会监视 app/sass 文件夹中的所有文件进行更改，并将 CSS 编译到 public/stylesheets 文件夹中。

> Fun fact
>
> Sass 有两种语法！ SCSS 语法 (.scss) 最常用。它是 CSS 的超集，这意味着所有有效的 CSS 也是有效的 SCSS。缩进语法（.sass）更不寻常：它使用缩进而不是大括号来嵌套语句，并使用换行符而不是分号来分隔它们。我们的所有示例都提供两种语法。



## Variables

将变量视为存储要在整个样式表中重用的信息的一种方式。您可以存储颜色、字体堆栈或您认为想要重用的任何 CSS 值等内容。 Sass 使用 $ 符号使某些内容成为变量。这是一个示例：

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

当 Sass 被处理时，它会获取我们为 $font-stack 和 $primary-color 定义的变量，并输出正常的 CSS，并将我们的变量值放置在 CSS 中。当使用品牌颜色并在整个网站上保持一致时，这可能非常强大。



## Nesting

在编写 HTML 时，您可能已经注意到它具有清晰的嵌套和视觉层次结构。另一方面，CSS 则不然。

Sass 允许您以遵循 HTML 相同视觉层次结构的方式嵌套 CSS 选择器。请注意，过度嵌套的规则会导致 CSS 质量过高，从而难以维护，并且通常被认为是不好的做法。

考虑到这一点，以下是网站导航的一些典型样式的示例：

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

您会注意到 ul、li 和 a 选择器嵌套在导航选择器内。这是组织 CSS 并使其更具可读性的好方法。



## Partials

您可以创建包含 CSS 小片段的部分 Sass 文件，您可以将这些 CSS 片段包含在其他 Sass 文件中。这是模块化 CSS 并帮助使事情更易于维护的好方法。部分文件是一个以下划线开头命名的 Sass 文件。您可以将其命名为 _partial.scss 之类的名称。下划线让 Sass 知道该文件只是部分文件，不应将其生成为 CSS 文件。 Sass 部分与 @use 规则一起使用。



## Modules

您不必将所有 Sass 写入一个文件中。您可以使用 @use 规则将其拆分。此规则将另一个 Sass 文件作为模块加载，这意味着您可以使用基于文件名的命名空间来引用 Sass 文件中的变量、混合和函数。使用文件还将在编译输出中包含它生成的 CSS！

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```scss
// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

css

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

请注意，我们正在使用 @use 'base'；在 styles.scss 文件中。当您使用文件时，不需要包含文件扩展名。 Sass 很聪明，会为您解决问题。



## Mixins

CSS 中的某些内容写起来有点乏味，特别是对于 CSS3 和存在的许多供应商前缀。 mixin 允许您创建要在整个站点中重复使用的 CSS 声明组。它有助于让你的 Sass 保持干燥。您甚至可以传递值以使您的 mixin 更加灵活。这是主题的示例。

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

```css
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

要创建 mixin，您可以使用 @mixin 指令并为其命名。我们已经命名了 mixin 主题。我们还在括号内使用变量 $theme，这样我们就可以传入我们想要的任何主题。创建 mixin 后，您可以将其用作 CSS 声明，以 @include 开头，后跟 mixin 的名称。



## Extend/Inheritance

使用 @extend 可以让您从一个选择器到另一个选择器共享一组 CSS 属性。在我们的示例中，我们将使用与扩展占位符类密切相关的另一个功能来创建一系列简单的错误、警告和成功消息传递。占位符类是一种特殊类型的类，仅在扩展时才打印，可以帮助保持编译后的 CSS 整洁。

```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

```css
/* This CSS will print because %message-shared is extended. */
.warning, .error, .success, .message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```

上面的代码所做的就是告诉 .message、.success、.error 和 .warning 的行为就像 %message-shared 一样。这意味着 %message-shared 出现的任何地方，.message、.success、.error 和 .warning 也会出现。神奇的事情发生在生成的 CSS 中，其中每个类都将获得与 %message-shared 相同的 CSS 属性。这有助于您避免在 HTML 元素上编写多个类名称。

除了 Sass 中的占位符类之外，您还可以扩展大多数简单的 CSS 选择器，但使用占位符是确保您不会扩展嵌套在样式中其他位置的类的最简单方法，这可能会导致 CSS 中出现意外的选择器。

请注意，%equal-heights 中的 CSS 不会生成，因为 %equal-heights 永远不会扩展。



## Operators

在 CSS 中进行数学运算非常有帮助。 Sass 有一些标准数学运算符，例如 +、-、*、math.div() 和 %。在我们的示例中，我们将进行一些简单的数学计算来计算文章和旁白的宽度。

```scss
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```

```css
.container {
  display: flex;
}

article[role=main] {
  width: 62.5%;
}

aside[role=complementary] {
  width: 31.25%;
  margin-left: auto;
}
```

我们创建了一个非常简单的基于 960px 的流体网格。 Sass 中的操作让我们可以轻松地执行一些操作，例如获取像素值并将其转换为百分比。