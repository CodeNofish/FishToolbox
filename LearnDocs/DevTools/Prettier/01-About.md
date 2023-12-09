https://prettier.io/

https://prettier.io/docs/en/

[TOC]

# About

## What is Prettier?

Prettier 是一个固执己见的代码格式化程序，支持：

* JS
* JSX
* Angular
* Vue
* Flow
* TypeScript
* CSS Less and SCSS
* HTML
* Ember/Handlebars
* JSON
* GraphQL
* Markdown
* YAML

它删除了所有原始样式*并确保所有输出的代码符合一致的样式。 （参见这篇博文）

Prettier 获取您的代码并考虑行长度，从头开始重新打印它。

例如，采用以下代码：

```js
foo(arg1, arg2, arg3, arg4);
```

它适合单行，因此它将保持原样。然而，我们都遇到过这样的情况：

```js
foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());
```

突然间，我们以前的函数调用格式就崩溃了，因为它太长了。 Prettier 将为您做重印的艰苦工作：

```js
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne(),
);
```

Prettier 在整个代码库中强制执行一致的代码风格（即不会影响 AST 的代码格式），因为它通过解析原始样式*并使用其自己的规则（采用最大行长度）重新打印解析后的 AST，从而忽略原始样式*考虑到，必要时包装代码。

## Prettier vs. Linters

它与 ESLint/TSLint/stylelint 等相比如何？

Linters 有两类规则：

**Formatting rules**: eg: [max-len](https://eslint.org/docs/rules/max-len), [no-mixed-spaces-and-tabs](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs), [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing), [comma-style](https://eslint.org/docs/rules/comma-style)…

格式规则：例如：max-len、no-mixed-spaces-and-tabs、keyword-spacing、comma-style…

Prettier 减轻了对整个规则类别的需求！ Prettier 将以一致的方式从头开始重新打印整个程序，因此程序员不可能再犯错误了:)

**Code-quality rules**: eg [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars), [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind), [no-implicit-globals](https://eslint.org/docs/rules/no-implicit-globals), [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors)…

代码质量规则：例如 no-unused-vars、no-extra-bind、no-implicit-globals、prefer-promise-reject-errors...

Prettier 对此类规则没有任何帮助。它们也是 linter 提供的最重要的，因为它们可能会捕获代码中的真正错误！

换句话说，使用 Prettier 进行格式化，使用 linter 捕获错误！

## Option Philosophy

https://prettier.io/docs/en/option-philosophy

## Rationale

#### Prettier 关心什么

###### Correctness正确性

Prettier 的第一个要求是输出与格式化之前具有完全相同行为的有效代码。请报告 Prettier 未能遵循这些正确性规则的任何代码——这是一个需要修复的错误！

###### Strings

Double or single quotes? Prettier chooses the one which results in the fewest number of escapes. `"It's gettin' better!"`, not `'It\'s gettin\' better!'`. In case of a tie or the string not containing any quotes, Prettier defaults to double quotes (but that can be changed via the [singleQuote](https://prettier.io/docs/en/options#quotes) option).

双引号还是单引号？ Prettier 选择了逃逸次数最少的一个。 “它变得更好了！”，而不是“它变得更好了！”。如果出现平局或字符串不包含任何引号，Prettier 默认为双引号（但可以通过 singleQuote 选项更改）。

JSX 有自己的报价选项：jsxSingleQuote。 JSX 源于 HTML，其中属性引号的主要用途是双引号。浏览器开发工具也遵循此约定，始终显示带双引号的 HTML，即使源代码使用单引号也是如此。单独的选项允许对 JS 使用单引号，对“HTML”(JSX) 使用双引号。

Prettier 保持了字符串的转义方式。例如，“🙂”不会被格式化为“\uD83D\uDE42”，反之亦然。

###### Empty lines

事实证明，空行很难自动生成。 Prettier 采用的方法是按照原始源代码中的方式保留空行。还有两条附加规则：

* Prettier 将多个空行折叠成一个空行。
* 块（以及整个文件）开头和结尾的空行将被删除。 （不过，文件总是以一个换行符结尾。）

###### Multi-line objects

默认情况下，Prettier 的打印算法会在合适的情况下将表达式打印在一行上。不过，在 JavaScript 中，对象有很多不同的用途，有时，如果它们保持多行，确实有助于提高可读性。例如，请参阅对象列表、嵌套配置、样式表和键控方法。我们无法为所有这些情况找到一个好的规则，因此如果 { 和原始源代码中的第一个键之间有换行符，Prettier 会保留对象为多行。这样做的结果是长的单行对象会自动展开，但短的多行对象永远不会折叠。

###### Decorators 装饰器

就像对象一样，装饰器用于许多不同的事情。有时将装饰器写在它们正在装饰的行上方是有意义的，有时如果它们在同一行上会更好。我们还没有找到一个好的规则来解决这个问题，所以 Prettier 让你的装饰器保持你所写的位置（如果它们适合的话）。这并不理想，但却是解决难题的务实方法。

```js
@Component({
  selector: "hero-button",
  template: `<button>{{ label }}</button>`,
})
class HeroButtonComponent {
  // These decorators were written inline and fit on the line so they stay
  // inline.
  @Output() change = new EventEmitter();
  @Input() label: string;

  // These were written multiline, so they stay multiline.
  @readonly
  @nonenumerable
  NODE_TYPE: 2;
}
```

有一个例外：类。我们认为为它们内联装饰器是没有意义的，因此它们总是被移动到自己的行中。

```js
// Before running Prettier:
@observer class OrderLine {
  @observable price: number = 0;
}
```

```js
// After running Prettier:
@observer
class OrderLine {
  @observable price: number = 0;
}
```

注意：Prettier 1.14.x 及更早版本尝试自动移动装饰器，因此如果您在代码上运行旧版 Prettier 版本，您可能需要手动加入一些装饰器以避免不一致：

```js
@observer
class OrderLine {
  @observable price: number = 0;
  @observable
  amount: number = 0;
}
```

###### Semicolons 

这是关于使用 noSemi 选项。

###### Print width

printWidth 选项更多的是 Prettier 的指导方针，而不是硬性规则。这不是允许的线路长度上限。这是一种向 Prettier 大致表示您希望排队的长度的方式。 Prettier 会制作较短和较长的线条，但通常会努力满足指定的打印宽度。

有一些边缘情况，例如非常长的字符串文字、正则表达式、注释和变量名称，它们无法跨行断开（不使用 Prettier 不执行的代码转换）。或者，如果您将代码嵌套 50 层，那么您的行当然大部分都是缩进:)

除此之外，在某些情况下，Prettier 会故意超出打印宽度。

###### Imports

Prettier 可以将长导入语句分成几行：

```js
import {
  CollectionDashboard,
  DashboardPlaceholder,
} from "../components/collections/collection-dashboard/main";
```

以下示例不适合打印宽度，但 Prettier 无论如何都会将其打印在一行中：

```js
import { CollectionDashboard } from "../components/collections/collection-dashboard/main";
```

这可能会让某些人感到意外，但我们这样做是因为将单个元素的导入保留在单行中是一个常见的请求。这同样适用于 require 调用。

###### Testing functions

另一个常见的要求是将冗长的测试描述保留在一行中，即使它变得太长。在这种情况下，将参数换行并没有多大帮助。

```js
describe("NodeRegistry", () => {
  it("makes no request if there are no nodes to prefetch, even if the cache is stale", async () => {
    // The above line exceeds the print width but stayed on one line anyway.
  });
});
```

Prettier 对于常见测试框架功能（如describe、it 和test）有特殊情况。

###### JSX

当涉及 JSX 时，Prettier 打印的内容与其他 JS 略有不同：

```js
function greet(user) {
  return user
    ? `Welcome back, ${user.name}!`
    : "Greetings, traveler! Sign up today!";
}

function Greet({ user }) {
  return (
    <div>
      {user ? (
        <p>Welcome back, {user.name}!</p>
      ) : (
        <p>Greetings, traveler! Sign up today!</p>
      )}
    </div>
  );
}
```

有两个原因。

首先，很多人已经将 JSX 括在括号中，尤其是在 return 语句中。 Prettier 遵循了这种常见的风格。

其次，替代格式使编辑 JSX 变得更加容易。很容易留下分号。与普通 JS 不同，JSX 中剩余的分号最终会以纯文本形式显示在页面上。

###### Comments

说到评论内容，Prettier 确实无能为力。注释可以包含从散文到注释掉的代码和 ASCII 图表的所有内容。由于它们可以包含任何内容，Prettier 不知道如何格式化或包装它们。所以它们保持原样。唯一的例外是 JSDoc 风格的注释（每行都以 * 开头的块注释），Prettier 可以修复缩进。

然后就是将评论放在哪里的问题。事实证明这是一个非常困难的问题。 Prettier 会尽力将您的评论大致保留在原来的位置，但这并不是一件容易的事，因为评论几乎可以放在任何地方。

通常，将注释放在自己的行上而不是行尾时会获得最佳结果。优先使用 // eslint-disable-next-line 而不是 // eslint-disable-line。

请注意，“神奇注释”（例如 eslint-disable-next-line 和 $FlowFixMe）有时可能需要手动移动，因为 Prettier 将表达式分成多行。