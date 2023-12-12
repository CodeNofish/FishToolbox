

<Fragment> 通常通过 <>...</> 语法使用，可让您在没有包装器节点的情况下对元素进行分组。

```react
<>
  <OneChild />
  <AnotherChild />
</>
```

在需要单个元素的情况下，将元素包装在 <Fragment> 中以将它们组合在一起。在 Fragment 中对元素进行分组对生成的 DOM 没有影响；这与元素未分组相同。在大多数情况下，空的 JSX 标记 <></> 是 <Fragment></Fragment> 的简写。



###### Props 

* **optional** `key`: Fragments declared with the explicit `<Fragment>` syntax may have [keys.](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

  可选键：使用显式 <Fragment> 语法声明的片段可以具有键。

###### Caveats 

* 如果要将密钥传递给 Fragment，则不能使用 <>...</> 语法。您必须从“react”显式导入 Fragment 并渲染 <Fragment key={yourKey}>...</Fragment>。
* 当你从渲染 <><Child /></> 到 [<Child />] 或返回时，或者当你从渲染 <><Child /></> 到 <Child /> 时，React 不会重置状态后退。这仅适用于单层深度：例如，从 <><><Child /></></> 到 <Child /> 会重置状态。请参阅此处的精确语义。



#### Usage 

###### Returning multiple elements

使用 Fragment 或等效的 <>...</> 语法将多个元素组合在一起。您可以使用它将多个元素放置在单个元素可以放置的任何位置。例如，一个组件只能返回一个元素，但通过使用 Fragment，您可以将多个元素组合在一起，然后将它们作为一组返回：

```react
function Post() {
  return (
    <>
      <PostTitle />
      <PostBody />
    </>
  );
}
```

片段很有用，因为使用片段对元素进行分组不会影响布局或样式，这与将元素包装在另一个容器（如 DOM 元素）中不同。如果您使用浏览器工具检查此示例，您将看到所有 <h1> 和 <article> DOM 节点都显示为兄弟节点，而没有包装器围绕它们：



###### Assigning multiple elements to a variable 将多个元素分配给一个变量

与任何其他元素一样，您可以将 Fragment 元素分配给变量，将它们作为 props 传递，等等：

```react
function CloseDialog() {
  const buttons = (
    <>
      <OKButton />
      <CancelButton />
    </>
  );
  return (
    <AlertDialog buttons={buttons}>
      Are you sure you want to leave this page?
    </AlertDialog>
  );
}
```



###### Grouping elements with text 用文本对元素进行分组

您可以使用 Fragment 将文本与组件分组在一起：

```react
function DateRangePicker({ start, end }) {
  return (
    <>
      From
      <DatePicker date={start} />
      to
      <DatePicker date={end} />
    </>
  );
}
```



###### Rendering a list of Fragments 渲染片段列表

这是一种需要显式编写 Fragment 而不是使用 <></> 语法的情况。当您在循环中渲染多个元素时，需要为每个元素分配一个键。如果循环中的元素是 Fragment，则需要使用普通的 JSX 元素语法来提供 key 属性：

```react
function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}
```

您可以检查 DOM 以验证 Fragment 子项周围没有包装器元素：

```react
import { Fragment } from 'react';

const posts = [
  { id: 1, title: 'An update', body: "It's been a while since I posted..." },
  { id: 2, title: 'My new blog', body: 'I am starting a new blog!' }
];

export default function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}

function PostTitle({ title }) {
  return <h1>{title}</h1>
}

function PostBody({ body }) {
  return (
    <article>
      <p>{body}</p>
    </article>
  );
}
```

