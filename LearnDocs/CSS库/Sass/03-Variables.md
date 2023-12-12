https://sass-lang.com/documentation/variables/

[TOC]

# Variables

Sass 变量很简单：您将一个值分配给以 $ 开头的名称，然后您可以引用该名称而不是值本身。尽管它们很简单，但它们是 Sass 带来的最有用的工具之一。变量可以减少重复、进行复杂的数学计算、配置库等等。

变量声明看起来很像属性声明：写为 <variable>: <expression>。与只能在样式规则或 at 规则中声明的属性不同，变量可以在您想要的任何地方声明。要使用变量，只需将其包含在值中即可。

```scss
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);

.alert {
  border: 1px solid $border-dark;
}
```

>  Heads up!
>
> CSS 有自己的变量，这与 Sass 变量完全不同。了解差异！
>
> Sass 变量全部由 Sass 编译掉。 CSS 变量包含在 CSS 输出中。
>
> CSS 变量对于不同的元素可以有不同的值，但 Sass 变量一次只能有一个值。
>
> Sass 变量是命令式的，这意味着如果您使用变量然后更改其值，则先前的使用将保持不变。 CSS 变量是声明性的，这意味着如果您更改值，它将影响早期使用和以后使用。

```scss
SCSS SYNTAXSCSS语法
$variable: value 1;
.rule-1 {
  value: $variable;
}

$variable: value 2;
.rule-2 {
  value: $variable;
}
```

> Fun fact
>
> Sass 变量与所有 Sass 标识符一样，将连字符和下划线视为相同。这意味着 $font-size 和 $font_size 都引用相同的变量。这是 Sass 早期的历史遗留问题，当时它只允许在标识符名称中使用下划线。一旦 Sass 添加了对连字符的支持以匹配 CSS 的语法，两者就变得等效，以使迁移更容易。



## Default Values

通常，当您为变量赋值时，如果该变量已经有值，则其旧值将被覆盖。但如果您正在编写 Sass 库，您可能希望允许用户在使用库的变量生成 CSS 之前配置它们。

为了实现这一点，Sass 提供了 !default 标志。仅当该变量未定义或其值为 null 时，才会为该变量赋值。否则，将使用现有值。

使用 !default 定义的变量可以在使用 @use 规则加载模块时进行配置。 Sass 库经常使用 !default 变量来允许用户配置库的 CSS。

要加载带有配置的模块，请编写 @use <url> with (<variable>: <value>, <variable>: <value>)。配置的值将覆盖变量的默认值。只能配置在样式表顶层使用 !default 标志编写的变量。

```scss
SCSS SYNTAXSCSS语法
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```

```scss
// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```



## Built-in Variables

无法修改内置模块定义的变量。

```scss
@use "sass:math" as math;

// This assignment will fail.
math.$pi: 0;
```



## Scope

在样式表顶层声明的变量是全局的。这意味着在声明它们后，可以在模块中的任何位置访问它们。但并非所有变量都如此。在块中声明的内容（SCSS 中的大括号或 Sass 中的缩进代码）通常是本地的，并且只能在声明的块内访问。

```scss
$global-variable: global value;

.content {
  $local-variable: local value;
  global: $global-variable;
  local: $local-variable;
}

.sidebar {
  global: $global-variable;

  // This would fail, because $local-variable isn't in scope:
  // local: $local-variable;
}
```



#### Advanced Variable Functions

SASS Core库提供了一些用于使用变量的高级功能。 Meta.variable-exists（）函数返回当前范围中是否存在具有给定名称的变量，而meta.global-variable-exists（）函数函数的功能相同，但仅适用于全局范围。

> Hands up
>
> 用户有时希望使用插值来根据另一个变量定义变量名称。 Sass 不允许这样做，因为这使得很难一眼看出哪些变量是在哪里定义的。不过，您可以定义一个从名称到值的映射，然后您可以使用变量访问该映射。
>
> ```scss
> @use "sass:map";
> 
> $theme-colors: (
>   "success": #28a745,
>   "info": #17a2b8,
>   "warning": #ffc107,
> );
> 
> .alert {
>   // Instead of $theme-color-#{warning}
>   background-color: map.get($theme-colors, "warning");
> }
> ```



