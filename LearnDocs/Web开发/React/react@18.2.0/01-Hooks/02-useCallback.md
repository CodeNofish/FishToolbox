https://react.dev/reference/react/useCallback

# useCallback

useCallback 是一个 React Hook，可让您在重新渲染之间缓存函数定义。

```react
const cachedFn = useCallback(fn, dependencies)
```



## Reference

**useCallback(fn, dependencies)**

**Call useCallback at the top level of your component to cache a function definition between re-renders**:

在组件的顶层调用 useCallback 以在重新渲染之间缓存函数定义：

```react
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
```



###### Parameters

* fn: The function value that you want to cache. It can take any arguments and return any values. React will return (not call!) your function back to you during the initial render. On next renders, React will give you the same function again if the dependencies have not changed since the last render. Otherwise, it will give you the function that you have passed during the current render, and store it in case it can be reused later. React will not call your function. The function is returned to you so you can decide when and whether to call it.

  fn：要缓存的函数值。它可以接受任何参数并返回任何值。 React 将在初始渲染期间将您的函数返回（而不是调用！）。在下一次渲染时，如果自上次渲染以来依赖项没有更改，React 将再次为您提供相同的函数。否则，它将为您提供当前渲染期间传递的函数，并将其存储起来以备以后重用。 React 不会调用你的函数。该函数将返回给您，以便您决定何时以及是否调用它。

* dependencies: The list of all reactive values referenced inside of the fn code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is configured for React, it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like [dep1, dep2, dep3]. React will compare each dependency with its previous value using the Object.is comparison algorithm.

  依赖项：fn 代码内部引用的所有反应值的列表。反应性值包括 props、state 以及直接在组件体内声明的所有变量和函数。如果您的 linter 配置为 React，它将验证每个反应值是否已正确指定为依赖项。依赖项列表必须具有恒定数量的项目，并且像 [dep1, dep2, dep3] 那样内联编写。 **React 将使用 Object.is 比较算法将每个依赖项与其先前的值进行比较。**

###### Returns

在初始渲染中，useCallback 返回您传递的 fn 函数。

在后续渲染期间，它将返回上次渲染中已存储的 fn 函数（如果依赖项未更改），或者返回您在本次渲染期间传递的 fn 函数。

###### Caveats

* useCallback is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.

  useCallback 是一个 Hook，因此您只能在组件的顶层或您自己的 Hook 中调用它。您不能在循环或条件内调用它。如果需要，请提取一个新组件并将状态移入其中。

* React will not throw away the cached function unless there is a specific reason to do that. For example, in development, React throws away the cache when you edit the file of your component. Both in development and in production, React will throw away the cache if your component suspends during the initial mount. In the future, React may add more features that take advantage of throwing away the cache—for example, if React adds built-in support for virtualized lists in the future, it would make sense to throw away the cache for items that scroll out of the virtualized table viewport. This should match your expectations if you rely on useCallback as a performance optimization. Otherwise, a state variable or a ref may be more appropriate.

  React 不会丢弃缓存的函数，除非有特定原因这样做。例如，在开发中，当您编辑组件的文件时，React 会丢弃缓存。无论是在开发还是在生产中，如果组件在初始安装期间挂起，React 都会丢弃缓存。将来，React 可能会添加更多利用丢弃缓存的功能 - 例如，如果 React 将来添加对虚拟化列表的内置支持，那么对于滚动出的项目丢弃缓存将是有意义的虚拟化表视口。如果您依赖 useCallback 作为性能优化，这应该符合您的期望。否则，状态变量或引用可能更合适。





## Usage

###### Skipping re-rendering of components 跳过组件的重新渲染

当您优化渲染性能时，有时需要缓存传递给子组件的函数。让我们首先看看如何执行此操作的语法，然后看看它在哪些情况下有用。

要在组件重新渲染之间缓存函数，请将其定义包装到 useCallback Hook 中：

```react
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  // ...
```

您需要将两件事传递给 useCallback：

1. A function definition that you want to cache between re-renders.
   您想要在重新渲染之间缓存的函数定义。
2. A list of dependencies including every value within your component that’s used inside your function.
   依赖项列表，包括组件内函数内使用的每个值。

在初始渲染时，您从 useCallback 获得的返回函数将是您传递的函数。

在接下来的渲染中，React 会将依赖项与您在上一个渲染期间传递的依赖项进行比较。如果没有任何依赖项发生更改（与 Object.is 相比），useCallback 将返回与之前相同的函数。否则，useCallback 将返回您在此渲染上传递的函数。

换句话说，useCallback 会在重新渲染之间缓存函数，直到其依赖项发生变化。

**让我们通过一个示例来看看这何时有用。**

假设您将一个 handleSubmit 函数从 ProductPage 向下传递到 ShippingForm 组件：

```react
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
```

您已经注意到，切换 theme 属性会使应用程序冻结一会儿，但如果您从 JSX 中删除 <ShippingForm />，感觉会很快。这告诉您值得尝试优化 ShippingForm 组件。

**By default, when a component re-renders, React re-renders all of its children recursively.** This is why, when `ProductPage` re-renders with a different `theme`, the `ShippingForm` component *also* re-renders. This is fine for components that don’t require much calculation to re-render. But if you verified a re-render is slow, you can tell `ShippingForm` to skip re-rendering when its props are the same as on last render by wrapping it in [`memo`:](https://react.dev/reference/react/memo)

默认情况下，当组件重新渲染时，React 会递归地重新渲染其所有子组件。这就是为什么当 ProductPage 使用不同的主题重新呈现时，ShippingForm 组件也会重新呈现。这对于不需要太多计算来重新渲染的组件来说很好。但是，如果您验证重新渲染速度很慢，则可以通过将其包装在备忘录中，告诉 ShippingForm 当其 props 与上次渲染相同时跳过重新渲染：

```react
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

**With this change, `ShippingForm` will skip re-rendering if all of its props are the \*same\* as on the last render.** This is when caching a function becomes important! Let’s say you defined `handleSubmit` without `useCallback`:

通过此更改，如果 ShippingForm 的所有 props 与上次渲染时相同，则 ShippingForm 将跳过重新渲染。这时候缓存函数就变得很重要了！假设您定义了 handleSubmit 而不使用 useCallback：

```react
function ProductPage({ productId, referrer, theme }) {
  // Every time the theme changes, this will be a different function...
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }
  
  return (
    <div className={theme}>
      {/* ... so ShippingForm's props will never be the same, and it will re-render every time */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**In JavaScript, a `function () {}` or `() => {}` always creates a \*different\* function,** similar to how the `{}` object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that `ShippingForm` props will never be the same, and your [`memo`](https://react.dev/reference/react/memo) optimization won’t work. This is where `useCallback` comes in handy:

**在 JavaScript 中，函数 () {} 或 () => {} 始终创建不同的函数，类似于 {} 对象字面量始终创建新对象的方式。通常，这不会成为问题，但这意味着 ShippingForm 道具永远不会相同，并且您的备忘录优化将不起作用。这就是 useCallback 派上用场的地方：**

```react
function ProductPage({ productId, referrer, theme }) {
  // Tell React to cache your function between re-renders...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ...so as long as these dependencies don't change...

  return (
    <div className={theme}>
      {/* ...ShippingForm will receive the same props and can skip re-rendering */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**By wrapping `handleSubmit` in `useCallback`, you ensure that it’s the \*same\* function between the re-renders** (until dependencies change). You don’t *have to* wrap a function in `useCallback` unless you do it for some specific reason. In this example, the reason is that you pass it to a component wrapped in [`memo`,](https://react.dev/reference/react/memo) and this lets it skip re-rendering. There are other reasons you might need `useCallback` which are described further on this page.

**通过将 handleSubmit 包装在 useCallback 中，您可以确保在重新渲染之间它是相同的函数（直到依赖项发生变化）。除非出于某种特定原因，否则您不必将函数包装在 useCallback 中。**在此示例中，原因是您将其传递给包含在备忘录中的组件，这使其跳过重新渲染。您可能需要 useCallback 的其他原因将在本页进一步描述。

> 您应该仅依赖 useCallback 作为性能优化。如果你的代码没有它就无法工作，请先找到根本问题并修复它。然后你可以添加useCallback回来。



## Troubleshooting