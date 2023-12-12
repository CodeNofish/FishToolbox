https://postcss.org/docs/how-to-write-custom-syntax

[TOC]

# How to Write Custom Syntax

PostCSS 可以转换任何语法的样式，而不仅限于 CSS。通过编写自定义语法，您可以将样式转换为任何所需的格式。

编写自定义语法比编写 PostCSS 插件困难得多，但这是一次很棒的冒险。

PostCSS语法包有3种类型：

- **Parser** to parse input string to node’s tree.

  解析器将输入字符串解析为节点树。

- **Stringifier** to generate output string by node’s tree.

  字符串生成器通过节点的树生成输出字符串。

- **Syntax** contains both parser and stringifier.

  语法包含解析器和字符串生成器。

## Syntax

自定义语法的一个很好的例子是 SCSS。某些用户可能希望使用 PostCSS 插件转换 SCSS 源，例如，如果他们需要添加供应商前缀或更改属性顺序。因此，此语法应从 SCSS 输入输出 SCSS。

语法 API 是一个非常简单的普通对象，具有解析和字符串化函数：

```js
module.exports = {
  parse:     require('./parse'),
  stringify: require('./stringify')
}
```



## Parser

解析器的一个很好的例子是 Safe Parser，它解析格式错误/损坏的 CSS。由于没有必要生成损坏的输出，因此该包仅提供一个解析器。
解析器 API 是一个接收字符串并返回根或文档节点的函数。第二个参数是一个函数，它接收带有 PostCSS 选项的对象。

```js
const postcss = require('postcss')

module.exports = function parse (css, opts) {
  const root = postcss.root()
  // Add other nodes to root
  return root
}
```

对于开源解析器，npm 包必须在 peerDependency 中包含 postcss，而不是在直接依赖项中。

#### Main Theory

有很多关于解析器的书；但不用担心，因为 CSS 语法非常简单，因此解析器将比编程语言解析器简单得多。

默认的 PostCSS 解析器包含两个步骤：

1. [Tokenizer](https://github.com/postcss/postcss/blob/main/lib/tokenize.js) which reads input string character by character and builds a tokens array. For example, it joins space symbols to a `['space', '\n ']` token, and detects strings to a `['string', '"\"{"']` token.

   分词器逐字符读取输入字符串并构建标记数组。例如，它将空格符号连接到 ['space', '\n '] 标记，并检测字符串到 ['string', '"\"{"'] 标记。

2. [Parser](https://github.com/postcss/postcss/blob/main/lib/parser.js) which reads the tokens array, creates node instances and builds a tree.

   解析器读取标记数组，创建节点实例并构建树。

#### Performance

解析输入通常是 CSS 处理器中最耗时的任务。所以拥有一个快速的解析器非常重要。

The main rule of optimization is that there is no performance without a benchmark. You can look at [PostCSS benchmarks](https://github.com/postcss/benchmark) to build your own.

优化的主要规则是没有基准就没有性能。您可以查看 PostCSS 基准来构建您自己的。

在解析任务中，标记化步骤通常花费最多时间，因此应优先考虑其性能。不幸的是，类、函数和高级结构会减慢你的分词器的速度。准备好编写带有重复语句的脏代码。这就是为什么很难扩展默认的 PostCSS tokenizer；复制和粘贴将是一种必要的罪恶。

第二个优化是使用字符代码而不是字符串。

```js
// Slow
string[i] === '{'

// Fast
const OPEN_CURLY = 123 // `{'
string.charCodeAt(i) === OPEN_CURLY
```

Third optimization is “fast jumps”. If you find open quotes, you can find next closing quote much faster by `indexOf`:

第三个优化是“快速跳跃”。如果您找到开盘报价，您可以通过indexOf更快地找到下一个收盘报价：

```js
// Simple jump
next = string.indexOf('"', currentPosition + 1)

// Jump by RegExp
regexp.lastIndex = currentPosion + 1
regexp.test(string)
next = regexp.lastIndex
```

解析器可以是一个编写良好的类。那里不需要复制粘贴和硬核优化。您可以扩展默认的 PostCSS 解析器。

#### Node Source

每个节点都应该具有 source 属性以生成正确的源映射。此属性包含带有 { line, column } 的开始和结束属性，以及带有 Input 实例的输入属性。

您的标记生成器应保存原始位置，以便您可以将值传播到解析器，以确保源映射正确更新。

#### Raw Values

一个好的 PostCSS 解析器应该提供所有信息（包括空格符号）以生成字节到字节相等的输出。这并不困难，但尊重用户输入并允许集成冒烟测试。

解析器应将所有附加符号保存到 node.raws 对象。它对您来说是一个开放的结构，您可以添加额外的键。例如，SCSS解析器将注释类型（/* */或//）保存在node.raws.inline中。

默认解析器会清除注释和空格中的 CSS 值。如果节点值未更改，它将带有注释的原始值保存到 node.raws.value.raw 并使用它。

#### Tests

当然，PostCSS生态系统中的所有解析器都必须经过测试。

如果您的解析器只是扩展 CSS 语法（如 SCSS 或 Safe Parser），则可以使用 PostCSS 解析器测试。它包含单元测试和集成测试。



## Stringifier

风格指南生成器是字符串生成器的一个很好的例子。它生成包含 CSS 组件的输出 HTML。对于此用例，不需要解析器，因此包应该只包含一个字符串生成器。

Stringifier API 比解析器 API 稍微复杂一些。 PostCSS 生成源映射，因此字符串生成器不能只返回字符串。它必须将每个子字符串与其源节点链接起来。

Stringifier 是一个接收根或文档节点和构建器回调的函数。然后它使用每个节点的字符串和节点实例调用构建器。

```js
module.exports = function stringify (root, builder) {
  // Some magic
  const string = decl.prop + ':' + decl.value + ';'
  builder(string, decl)
  // Some science
};
```

PostCSS 默认字符串生成器只是一个类，其中包含每个节点类型的方法和许多检测原始属性的方法。

在大多数情况下，只需扩展此类就足够了，就像在 SCSS 字符串生成器中一样。

#### Builder Function

构建器函数将作为第二个参数传递给 stringify 函数。例如，默认的 PostCSS stringifier 类将其保存到 this.builder 属性。

Builder 接收输出子字符串和源节点，以将此子字符串附加到最终输出。

有些节点中间包含其他节点。例如，规则的开头有一个 {，里面有许多声明，最后有一个 }。

对于这些情况，您应该将第三个参数传递给构建器函数：“start”或“end”字符串：

```js
this.builder(rule.selector + '{', rule, 'start')
// Stringify declarations inside
this.builder('}', rule, 'end')
```

#### Raw Values

良好的 PostCSS 自定义语法会保存所有符号，并在没有更改的情况下提供字节到字节的相等输出。

这就是为什么每个节点都有node.raws对象来存储空间符号等。

所有与源代码相关的数据而不是 CSS 结构，都应该在 Node#raws 中。例如，postcss-scss 保留内联注释的 Comment#raws.inline 布尔标记（// comment 而不是 /* comment */）。

请小心，因为有时这些原始属性不会出现；某些节点可能是手动构建的，或者当它们移动到另一个父节点时可能会丢失缩进。

这就是为什么默认字符串生成器有一个 raw() 方法来自动检测其他节点的原始属性。例如，它将查看其他节点来检测缩进大小，并将其与当前节点深度相乘。

#### Tests

字符串生成器也必须有测试。

您可以使用 PostCSS Parser Tests 中的单元和集成测试用例。只需将输入 CSS 与解析器和字符串生成器之后的 CSS 进行比较即可。