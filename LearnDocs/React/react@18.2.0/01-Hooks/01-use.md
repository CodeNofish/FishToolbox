

# use

use 是一个 React Hook，可让您读取 Promise 或上下文等资源的值。

```js
const value = use(resource);
```



## Reference

#### use(resource)

在组件中调用 use 来读取 Promise 或上下文等资源的值。

```react
import { use } from 'react';

function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
```

与所有其他 React Hook 不同，use 可以在循环和条件语句（如 if）内调用。与其他 React Hook 一样，调用 use 的函数必须是 Component 或 Hook。

当使用 Promise 调用时，使用 Hook 与 Suspense 和错误边界集成。当传递给 use 的 Promise 处于挂起状态时，调用 use 的组件会挂起。如果调用 use 的组件被包装在 Suspense 边界中，则将显示后备。一旦 Promise 得到解决，Suspense 后备就会被使用 use Hook 返回的数据的渲染组件所取代。如果传递给使用的 Promise 被拒绝，则会显示最近的错误边界的回退。

###### Caveats 注意事项

* The use Hook must be called inside a Component or a Hook.

  use Hook 必须在组件或 Hook 内部调用。

* When fetching data in a Server Component, prefer async and await over use. async and await pick up rendering from the point where await was invoked, whereas use re-renders the component after the data is resolved.

  在服务器组件中获取数据时，优先使用 async 和 wait 而不是use。 async 和await 从调用await 的地方开始渲染，而use 在解析数据后重新渲染组件。

* Prefer creating Promises in Server Components and passing them to Client Components over creating Promises in Client Components. Promises created in Client Components are recreated on every render. Promises passed from a Server Component to a Client Component are stable across re-renders. See this example.

  与在客户端组件中创建 Promise 相比，更喜欢在服务器组件中创建 Promise 并将它们传递给客户端组件。在客户端组件中创建的 Promise 会在每次渲染时重新创建。从服务器组件传递到客户端组件的 Promise 在重新渲染过程中是稳定的。请参阅此示例。



## Usage

###### Reading context with use

当上下文被传递给 use 时，它的工作方式与 useContext 类似。虽然 useContext 必须在组件的顶层调用，但 use 可以在条件语句（如 if ）和循环（如 for）内调用。 use 优于 useContext，因为它更灵活。

```react
import { use } from 'react';

function Button() {
  const theme = use(ThemeContext);
  // ...

```

use 返回您传递的上下文的上下文值。为了确定上下文值，React 搜索组件树并找到上面与该特定上下文最接近的上下文提供者。

要将上下文传递给 Button，请将其或其父组件之一包装到相应的上下文提供程序中。

```react
function MyPage() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  // ... renders buttons inside ...
}
```

提供者和按钮之间有多少层组件并不重要。当 Form 内任意位置的 Button 调用 use(ThemeContext) 时，它将接收“dark”作为值。

与 useContext 不同，use 可以像 if 一样在条件语句和循环中调用。

```react
function HorizontalRule({ show }) {
  if (show) {
    const theme = use(ThemeContext);
    return <hr className={theme} />;
  }
  return false;
}
```

use 从 if 语句内部调用，允许您有条件地从 Context 读取值。

> 与 useContext 类似，use(context) 始终在调用它的组件之上查找最接近的上下文提供程序。它向上搜索，并且不考虑您调用 use(context) 的组件中的上下文提供程序。



```react
import { createContext, use } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = use(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ show, children }) {
  if (show) {
    const theme = use(ThemeContext);
    const className = 'button-' + theme;
    return (
      <button className={className}>
        {children}
      </button>
    );
  }
  return false
}
```



###### Streaming data from the server to the client 

通过将 Promise 作为 props 从服务器组件传递到客户端组件，可以将数据从服务器流式传输到客户端。

```react
import { fetchMessage } from './lib.js';
import { Message } from './message.js';

export default function App() {
  const messagePromise = fetchMessage();
  return (
    <Suspense fallback={<p>waiting for message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```

然后，客户端组件将收到的 Promise 作为 prop 并将其传递给 use Hook。这允许客户端组件从服务器组件最初创建的 Promise 中读取值。

```react
// message.js
'use client';

import { use } from 'react';

export function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}
```

由于 Message 被包裹在 Suspense 中，因此将显示后备，直到 Promise 得到解决。当 Promise 被解析时，该值将被 use Hook 读取，并且 Message 组件将取代 Suspense 后备。



###### Dealing with rejected Promises 处理被拒绝的 Promise

在某些情况下，传递给使用的 Promise 可能会被拒绝。您可以通过以下任一方式处理被拒绝的 Promise：

1. [Displaying an error to users with error boundary.向用户显示带有错误边界的错误。](https://react.dev/reference/react/use#displaying-an-error-to-users-with-error-boundary)
2. [Providing an alternative value with `Promise.catch`使用 Promise.catch 提供替代值](https://react.dev/reference/react/use#providing-an-alternative-value-with-promise-catch)

###### Displaying an error to users with a error boundary

如果您想在 Promise 被拒绝时向用户显示错误，则可以使用错误边界。要使用错误边界，请将调用 use Hook 的组件包装在错误边界中。如果传递给使用的 Promise 被拒绝，则会显示错误边界的后备。

```react
"use client";

import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function MessageContainer({ messagePromise }) {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

function Message({ messagePromise }) {
  const content = use(messagePromise);
  return <p>Here is the message: {content}</p>;
}
```



###### Providing an alternative value with Promise.catch 使用 Promise.catch 提供替代值

如果您想在传递给使用的 Promise 被拒绝时提供替代值，您可以使用 Promise 的 catch 方法。

```react
import { Message } from './message.js';

export default function App() {
  const messagePromise = new Promise((resolve, reject) => {
    reject();
  }).catch(() => {
    return "no new message found.";
  });

  return (
    <Suspense fallback={<p>waiting for message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```

要使用 Promise 的 catch 方法，请在 Promise 对象上调用 catch 。 catch 采用单个参数：一个采用错误消息作为参数的函数。传递给 catch 的函数返回的任何内容都将用作 Promise 的解析值。



## Troubleshooting

###### “Suspense Exception: This is not a real error!” 

您要么在 React 组件或 Hook 函数之外调用 use，要么在 try-catch 块中调用 use。如果您在 try-catch 块内调用 use，请将组件包装在错误边界中，或调用 Promise 的 catch 来捕获错误并使用另一个值解析 Promise。请参阅这些示例。

如果您在 React 组件或 Hook 函数外部调用 use，请将 use 调用移至 React 组件或 Hook 函数。

```react
function MessageComponent({messagePromise}) {
  function download() {
    // ❌ the function calling `use` is not a Component or Hook
    const message = use(messagePromise);
    // ...
```

相反，在任何组件闭包之外调用 use，其中调用 use 的函数是组件或 Hook。

```react
function MessageComponent({messagePromise}) {
  // ✅ `use` is being called from a component. 
  const message = use(messagePromise);
  // ...
```

