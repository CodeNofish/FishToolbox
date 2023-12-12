https://sass-lang.com/documentation/style-rules/

[TOC]

# Style Rules

样式规则是 Sass 的基础，就像 CSS 的基础一样。它们的工作方式相同：您使用选择器选择要设置样式的元素，并声明影响这些元素外观的属性。

## Overview

#### Nesting

但 Sass 希望让您的生活更轻松。您可以将一种样式规则编写在另一种样式规则中，而不是一遍又一遍地重复相同的选择器。 Sass 会自动将外部规则的选择器与内部规则的选择器组合起来。

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

> 嵌套规则非常有用，但它们也会让你很难直观地看到你实际生成了多少 CSS。嵌套得越深，为 CSS 提供服务所需的带宽就越多，浏览器渲染 CSS 所需的工作量也就越多。让这些选择器保持浅层！

###### Selector Lists

嵌套规则可以巧妙地处理选择器列表（即逗号分隔的选择器）。每个复杂的选择器（逗号之间的选择器）都是单独嵌套的，然后它们被组合回选择器列表。

```scss
.alert, .warning {
  ul, p {
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 0;
  }
}
```

```css
.alert ul, .alert p, .warning ul, .warning p {
  margin-right: 0;
  margin-left: 0;
  padding-bottom: 0;
}
```

###### Selector Combinators

您也可以嵌套使用组合器的选择器。您可以将组合器放在外部选择器的末尾、内部选择器的开头，甚至可以将其单独放置在两者之间。

```scss
ul > {
  li {
    list-style-type: none;
  }
}

h2 {
  + p {
    border-top: 1px solid gray;
  }
}

p {
  ~ {
    span {
      opacity: 0.8;
    }
  }
}
```

```css

CSS OUTPUTCSS输出
ul > li {
  list-style-type: none;
}

h2 + p {
  border-top: 1px solid gray;
}

p ~ span {
  opacity: 0.8;
}
```

###### Advanced Nesting

如果您想对嵌套样式规则执行更多操作，而不仅仅是按顺序将它们组合起来，并用后代组合器（即，一个简单的空格）将它们分开，那么 Sass 可以为您提供支持。有关更多详细信息，请参阅父级选择器文档。

#### Interpolation

您可以使用插值将变量和函数调用等表达式中的值注入选择器中。当您编写 mixins 时，这特别有用，因为它允许您根据用户传入的参数创建选择器。

```scss
@mixin define-emoji($name, $glyph) {
  span.emoji-#{$name} {
    font-family: IconFont;
    font-variant: normal;
    font-weight: normal;
    content: $glyph;
  }
}

@include define-emoji("women-holding-hands", "👭");
```

```css
@charset "UTF-8";
span.emoji-women-holding-hands {
  font-family: IconFont;
  font-variant: normal;
  font-weight: normal;
  content: "👭";
}
```

> Fun fact
>
> Sass 仅在解析插值后才解析选择器。这意味着您可以安全地使用插值来生成选择器的任何部分，而不必担心它无法解析。

您可以将插值与父选择器 &、@at-root 规则和选择器函数结合起来，以便在动态生成选择器时发挥强大的作用。有关更多信息，请参阅父选择器文档。