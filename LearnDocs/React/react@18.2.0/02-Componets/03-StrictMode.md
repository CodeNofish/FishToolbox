<StrictMode> 可让您在开发早期发现组件中的常见错误。

#### Reference 

使用 StrictMode 为内部组件树启用额外的开发行为和警告：

```react
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

严格模式支持以下仅限开发的行为：

* 您的组件将重新渲染额外的时间来查找由不纯渲染引起的错误。
* 您的组件将重新运行 Effects 一段额外的时间，以查找因缺少 Effect 清理而导致的错误。
* 将检查您的组件是否使用了已弃用的 API。

###### Caveats

* 在 <StrictMode> 包裹的树中，无法选择退出严格模式。这让您确信 <StrictMode> 内的所有组件都已检查。如果开发产品的两个团队对于检查是否有价值存在分歧，他们需要达成共识或将 <StrictMode> 在树中向下移动。



#### Usage 

###### Enabling Strict Mode for entire app 为整个应用程序启用严格模式

严格模式可以对 <StrictMode> 组件内的整个组件树进行额外的仅开发检查。这些检查可帮助您在开发过程的早期发现组件中的常见错误。

要为整个应用程序启用严格模式，请在渲染时用 <StrictMode> 包装根组件：

```react
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

我们建议将整个应用程序包装在严格模式下，尤其是对于新创建的应用程序。如果您使用为您调用 createRoot 的框架，请检查其文档以了解如何启用严格模式。

尽管严格模式检查仅在开发中运行，但它们可以帮助您发现代码中已存在的错误，但在生产中可靠地重现可能会很棘手。严格模式允许您在用户报告错误之前修复错误。

> Note
>
> 严格模式在开发中启用以下检查：
>
> * Your components will re-render an extra time to find bugs caused by impure rendering
>
>   您的组件将重新渲染额外的时间来查找由不纯渲染引起的错误。
>
> * Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup
>
>   您的组件将重新运行 Effects 一段额外的时间，以查找因缺少 Effect 清理而导致的错误。
>
> * Your components will be checked for usage of deprecated APIs
>
>   将检查您的组件是否使用了已弃用的 API。
>
> **所有这些检查仅限于开发，不会影响生产版本。**



###### Enabling Strict Mode for a part of the app 为应用程序的一部分启用严格模式

您还可以为应用程序的任何部分启用严格模式：

```react
import { StrictMode } from 'react';

function App() {
  return (
    <>
      <Header />
      <StrictMode>
        <main>
          <Sidebar />
          <Content />
        </main>
      </StrictMode>
      <Footer />
    </>
  );
}
```

在此示例中，严格模式检查不会针对页眉和页脚组件运行。但是，它们将在侧边栏和内容以及其中的所有组件上运行，无论有多深。



###### Fixing bugs found by double rendering in development 修复开发中双重渲染发现的bug

**React 假设您编写的每个组件都是纯函数。这意味着您编写的 React 组件必须始终在给定相同输入（props、state 和 context）的情况下返回相同的 JSX。**

违反此规则的组件会表现出不可预测的行为并导致错误。为了帮助您意外发现不纯的代码，严格模式会在开发过程中调用某些函数（仅那些应该是纯的函数）两次。这包括：

* 您的组件函数体（仅顶层逻辑，因此不包括事件处理程序内的代码）
* 传递给 useState、set 函数、useMemo 或 useReducer 的函数
* 一些类组件方法，如构造函数、渲染、shouldComponentUpdate（查看整个列表）

如果一个函数是纯函数，则运行它两次不会改变其行为，因为纯函数每次都会产生相同的结果。然而，如果一个函数是不纯的（例如，它改变了它接收到的数据），运行它两次往往会很明显（这就是它不纯的原因！）这可以帮助您尽早发现并修复错误。

**下面通过一个例子来说明严格模式下的双重渲染如何帮助您及早发现错误。**

这个 StoryTray 组件采用一系列故事，并在末尾添加最后一个“创建故事”项目：

TODO



###### Fixing bugs found by re-running Effects in development 修复开发中重新运行 Effects 发现的错误

严格模式还可以帮助发现效果中的错误。

每个效果都有一些设置代码，并且可能有一些清理代码。通常，React 在组件安装（添加到屏幕）时调用 setup，在组件卸载（从屏幕上删除）时调用 cleanup。如果 React 的依赖关系自上次渲染以来发生了变化，那么 React 会再次调用清理和设置。

当严格模式开启时，React 还将在开发过程中为每个 Effect 运行一个额外的设置+清理周期。这可能让人感到惊讶，但它有助于揭示难以手动捕获的微妙错误。

TODO



###### Fixing deprecation warnings enabled by Strict Mode 修复严格模式启用的弃用警告