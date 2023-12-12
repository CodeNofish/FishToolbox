https://react.dev/learn/writing-markup-with-jsx

[TOC]

# Writing Markup with JSX

JSX 是 JavaScript 的语法扩展，可让您在 JavaScript 文件内编写类似 HTML 的标记。尽管还有其他方法来编写组件，但大多数 React 开发人员更喜欢 JSX 的简洁性，并且大多数代码库都使用它。



## JSX: Putting markup into JavaScript 

JSX：将标记放入 JavaScript 中

Web 是建立在 HTML、CSS 和 JavaScript 之上的。多年来，Web 开发人员将内容保存在 HTML 中，设计保存在 CSS 中，逻辑保存在 JavaScript 中——通常保存在单独的文件中！内容在 HTML 中标记，而页面逻辑则单独存在于 JavaScript 中：

但随着网络变得更具交互性，逻辑越来越决定内容。 JavaScript 负责 HTML！这就是为什么在 React 中，渲染逻辑和标记一起存在于同一个地方——组件。

将按钮的渲染逻辑和标记保持在一起可确保它们在每次编辑时彼此保持同步。相反，不相关的细节（例如按钮的标记和侧边栏的标记）是相互隔离的，这使得单独更改它们中的任何一个都更安全。

每个 React 组件都是一个 JavaScript 函数，可能包含 React 渲染到浏览器中的一些标记。 React 组件使用名为 JSX 的语法扩展来表示该标记。 JSX看起来很像HTML，但它更严格一些，并且可以显示动态信息。理解这一点的最好方法是将一些 HTML 标记转换为 JSX 标记。

> JSX 和 React 是两个不同的东西。它们经常一起使用，但您可以单独使用它们。 JSX 是一个语法扩展，而 React 是一个 JavaScript 库。



## Converting HTML to JSX

假设您有一些（完全有效的）HTML：

```jsx
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```

并且您想将其放入您的组件中：

```react
export default function TodoList() {
  return (
    // ???
  )
}
```

如果按原样复制并粘贴它，它将不起作用：

```react
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve the spectrum technology
    </ul>
  );
}
```

这是因为 JSX 比 HTML 更严格并且有更多的规则！如果您阅读上面的错误消息，它们将指导您修复标记，或者您可以按照下面的指南进行操作。

> Note
>
> 大多数时候，React 屏幕上的错误消息会帮助您找到问题所在。如果您遇到困难，请阅读它们！



## The Rules of JSX

#### 1. Return a single root element 返回单个根元素

要从组件返回多个元素，请使用单个父标签包装它们。

例如，您可以使用 <div>：

```react
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```

如果您不想在标记中添加额外的 <div>，您可以编写 <> 和 </>：

```react
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

这个空标签称为片段。片段可让您对内容进行分组，而不会在浏览器 HTML 树中留下任何痕迹。

> Deep Dive
>
> Why do multiple JSX tags need to be wrapped? 
>
> 为什么需要包装多个 JSX 标签？
>
> JSX 看起来像 HTML，但在底层它被转换为纯 JavaScript 对象。如果不将两个对象包装到数组中，则无法从函数返回它们。这解释了为什么您也无法返回两个 JSX 标签而不将它们包装到另一个标签或片段中。



#### 2. Close all the tags 关闭所有标签

JSX 要求标签显式关闭：像 <img> 这样的自关闭标签必须写成 <img />，像 <li>oranges 这样的包装标签必须写成 <li>oranges</li>。

这是 Hedy Lamarr 的图像和列表项看起来闭合的样子：

```react
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```



#### 3. camelCase all most of the things!  大多数东西都采用驼峰命名法！

JSX turns into JavaScript and attributes written in JSX become keys of JavaScript objects. In your own components, you will often want to read those attributes into variables. But JavaScript has limitations on variable names. For example, their names can’t contain dashes or be reserved words like `class`.

JSX 变成 JavaScript，用 JSX 编写的属性成为 JavaScript 对象的键。在您自己的组件中，您经常希望将这些属性读入变量中。但 JavaScript 对变量名称有限制。例如，它们的名称不能包含破折号或保留字（如类）。

This is why, in React, many HTML and SVG attributes are written in camelCase. For example, instead of `stroke-width` you use `strokeWidth`. Since `class` is a reserved word, in React you write `className` instead, named after the [corresponding DOM property](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

这就是为什么在 React 中，许多 HTML 和 SVG 属性都是用驼峰命名法编写的。例如，您可以使用描边宽度而不是描边宽度。由于 class 是保留字，因此在 React 中您可以写 className，以相应的 DOM 属性命名：

```react
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

您可以在 DOM 组件 props 列表中找到所有这些属性。如果你弄错了，别担心——React 会在浏览器控制台上打印一条消息，并可能进行更正。

> Pitfall
>
> 由于历史原因，aria-* 和 data-* 属性的编写方式与 HTML 中一样，带有破折号。



#### Pro-tip: Use a JSX Converter 专业提示：使用 JSX 转换器

在现有标记中转换所有这些属性可能很乏味！我们建议使用转换器将现有的 HTML 和 SVG 转换为 JSX。转换器在实践中非常有用，但仍然值得了解正在发生的事情，以便您可以轻松地自己编写 JSX。

这是您的最终结果：

```react
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```



## Recap

现在您知道为什么 JSX 存在以及如何在组件中使用它：

* React 组件将渲染逻辑与标记组合在一起，因为它们是相关的。
* JSX 与 HTML 类似，但也有一些差异。如果需要，您可以使用转换器。
* 错误消息通常会为您指明修复标记的正确方向。