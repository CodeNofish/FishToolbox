https://www.mdxjs.cn/docs/what-is-mdx/



MDX 赋予你在 markdown 内容当中使用 JSX 的能力。 你可以导入（import）如见，例如交互式图标或警告框，并将它们嵌入 到你所书写的内容当中。 这让利用组件来编写较长的内容成为了一场革命。

实际上，MDX 可以看作是一种融合了 markdown 和 JSX 的格式，就像下面这个示例：

```mdx
# Hello, world!

<div className="note">
  > Some notable things in a block quote!
</div>
```

标题和块引用是 markdown 格式，而那些 *类似 HTML 标签* 的是 JSX 格式。 对于诸如强调或标题之类的常见内容，markdown 通常感觉比 HTML 或 JSX 在书写上更自然 更自然。 JSX 是对 JavaScript 的扩展，它 *看起来* 像 HTML，但是更便于 使用组件（或可重用的东西）。

这个实例在 `<div>` 上使用了 `className` 属性。 这是因为它是为 React 编写的，并且 React 要求将 `class` 书写为 `className` 形式。 其他框架，例如 Vue 和 Preact，则接受 `class` 形式。 因此，请注意 JSX 在书写上的这些不同， 因为这取决于所用的工具。

MDX 还支持 JavaScript 中的一些功能： 花括号中可以使用表达式 （`{1 + 1}`） ，以及对 ESM （`import` 和 `export`） 标准的支持。

MDX 的语法融合了 markdown 和 JSX。这给了我们一些类似于文学编程的东西。它还为我们提供了两种语言的奇怪组合：markdown 对空格敏感且宽容（你输入的内容可能不完全有效，但不会崩溃），而 JavaScript 对空格不敏感且不宽容（它确实会因拼写错误而崩溃）。

奇怪的是，我们非常喜欢它们的结合方式！



#### Markdown

对于强调或标题等常见内容，Markdown 通常感觉比 HTML 或 JSX 更自然。 Markdown 通常看起来更符合预期并且更简洁。而不是以下 HTML：

```html
<blockquote>
  <p>A blockquote with <em>some</em> emphasis.</p>
</blockquote>
```

您可以在 markdown （或 MDX）中编写等效内容，如下所示：

```mdx
> A blockquote with *some* emphasis.
```

MDX supports standard markdown by default ([CommonMark](https://commonmark.org/)):

MDX 默认支持标准 Markdown (CommonMark)：

非标准 Markdown 功能（例如 GFM、frontmatter、数学、语法突出显示）可以通过插件启用（请参阅¶ 使用插件）。

**一些 Markdown 功能在 MDX 中不起作用**：

* 缩进代码在 MDX 中不起作用：

```js
 console.log(1) // this is a paragraph in MDX!
```

这样做的原因是这样你可以很好地缩进你的组件：

```mdx
<main>
  <article>
    # Hello!
  </article>
</main>
```

* 自动链接在 MDX 中不起作用。原因是它们与 JSX 无法区分（例如：<svg:rect>），而我们更喜欢明确的。如果您需要链接，请使用完整链接：[描述性文字](https://and-the-link-here.com)
* HTML 语法在 MDX 中不起作用，因为它已被 JSX 取代（<img> 到 <img />）。您可以使用大括号中的 JavaScript 注释来代替 HTML 注释： {/* comment! */}
* 未转义的左尖括号/小于 (<) 和左大括号 ({) 必须转义：\< 或 \{（或使用表达式：{'<'}、{'{'}）



#### JSX

JSX 是 JavaScript 的扩展，看起来像 HTML，但可以方便地使用组件（可重用的东西）。 JSX 通常与 React、Preact 或 Vue 等前端框架结合使用。这些框架添加了对组件的支持，使您可以更改重复的内容，例如以下标记：

```mdx
<MyComponent id="123" />

You can also use objects with components, such as the `thisOne` component on
the `myComponents` object: <myComponents.thisOne />

<Component
  open
  x={1}
  label={'this is a string, *not* markdown!'}
  icon={<Icon />}
/>
```



#### Expressions

MDX 还支持大括号内的 JavaScript 表达式：

```mdx
Two 🍰 is: {Math.PI * 2}
```

表达式可以包含整个 JavaScript 程序，只要它们（包装在）计算结果为可渲染内容的表达式中即可。您可以像这样使用 IIFE：

```mdx
{(function () {
  const guess = Math.random()

  if (guess > 0.66) {
    return <span style={{color: 'tomato'}}>Look at us.</span>
  }

  if (guess > 0.33) {
    return <span style={{color: 'violet'}}>Who would have guessed?!</span>
  }

  return <span style={{color: 'goldenrod'}}>Not me.</span>
})()}
```

表达式可以为空或仅包含注释：



#### ESM

MDX 还支持 JavaScript 的导入和导出语句。这些 ESM 功能可以在 MDX 中使用来定义事物：

```jsx
import {External} from './some/place.js'

export const Local = props => <span style={{color: 'red'}} {...props} />

An <External>external</External> component and a <Local>local one</Local>.
```

ESM也可用于非组件（数据）：

```jsx
import {Chart} from './chart.js'
import population from './population.js'
export const pi = 3.14

<Chart data={population} label={'Something with ' + pi} />
```



#### Interleaving

如果文本和标签位于同一行，则可以在 JSX 中使用 markdown“内联”，但不能使用“块”：

```jsx
<div># this is not a heading but *this* is emphasis</div>
```

一行上的文本和标签不会生成块，因此它们也不会生成 <p>。在不同的线路上，他们这样做：

我们使用这个规则来区分（同一条线或不同线）。不基于 HTML 中元素的语义。所以你可以构建不正确的 HTML（你不应该这样做）：