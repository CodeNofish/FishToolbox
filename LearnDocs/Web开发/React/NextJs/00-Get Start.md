https://nextjs.org/

Next.js 被世界上一些最大的公司所使用，它使您能够通过扩展最新的 React 功能并集成强大的基于 Rust 的 JavaScript 工具来创建全栈 Web 应用程序，以实现最快的构建。

* Built-in Optimizations 内置优化

  自动图像、字体和脚本优化，以改进用户体验和核心 Web 生命力。

* 数据获取

  让你的 React 组件异步并等待你的数据。 Next.js 支持服务器和客户端数据获取。

* Node.js 和 Edge 运行时

  使用无服务器功能构建可扩展的解决方案，并使用边缘快速交付动态、个性化内容。

* Advanced Routing & Nested Layouts 高级路由和嵌套布局

  使用文件系统创建路由，包括支持更高级的路由模式和 UI 布局。



* 动态HTML流

  即时从服务器传输UI与 App Router和 React Suspense集成

* CSS支持

  使用您最喜欢的工具设计您的应用程序，包括对 CSS 模块、Sass、Tailwind CSS、styled-jsx 等的支持

* Route Handlers 路由处理程序

  构建 API 端点以安全地连接第三方服务并从前端使用。

* Middleware

  控制传入的请求。使用代码定义身份验证、实验和国际化的路由和访问规则。



* React Server Components 反应服务器组件

  添加组件而无需发送额外的客户端 JavaScript。基于最新的 React 功能构建。

* Client and Server Rendering 客户端和服务器渲染

  灵活的渲染和缓存选项，包括每页级别的增量静态再生 (ISR)。



## What is Next.js?

Next.js 是一个用于构建全栈 Web 应用程序的 React 框架。您可以使用 React Components 来构建用户界面，并使用 Next.js 来实现附加功能和优化。

在底层，Next.js 还抽象并自动配置 React 所需的工具，例如捆绑、编译等。这使您可以专注于构建应用程序，而不是花时间进行配置。

无论您是个人开发人员还是大型团队的一员，Next.js 都可以帮助您构建交互式、动态且快速的 React 应用程序。



## Main Features

Next.js 的一些主要功能包括：

| Feature                                                      | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Routing](https://nextjs.org/docs/app/building-your-application/routing) | A file-system based router built on top of Server Components that supports layouts, nested routing, loading states, error handling, and more.<br />基于文件系统的路由器构建在服务器组件之上，支持布局、嵌套路由、加载状态、错误处理等。 |
| [Rendering](https://nextjs.org/docs/app/building-your-application/rendering) | Client-side and Server-side Rendering with Client and Server Components. Further optimized with Static and Dynamic Rendering on the server with Next.js. Streaming on Edge and Node.js runtimes.<br />使用客户端和服务器组件进行客户端和服务器端渲染。使用 Next.js 在服务器上进一步优化静态和动态渲染。在 Edge 和 Node.js 运行时上进行流式传输。 |
| [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching) | Simplified data fetching with async/await in Server Components, and an extended `fetch` API for request memoization, data caching and revalidation.<br />通过服务器组件中的 async/await 简化数据获取，以及用于请求记忆、数据缓存和重新验证的扩展获取 API。 |
| [Styling](https://nextjs.org/docs/app/building-your-application/styling) | Support for your preferred styling methods, including CSS Modules, Tailwind CSS, and CSS-in-JS<br />支持您喜欢的样式方法，包括 CSS 模块、Tailwind CSS 和 CSS-in-JS |
| [Optimizations](https://nextjs.org/docs/app/building-your-application/optimizing) | Image, Fonts, and Script Optimizations to improve your application's Core Web Vitals and User Experience.<br />图像、字体和脚本优化，以改善应用程序的核心网络生命和用户体验。 |
| [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript) | Improved support for TypeScript, with better type checking and more efficient compilation, as well as custom TypeScript Plugin and type checker.<br />改进了对 TypeScript 的支持，提供更好的类型检查和更高效的编译，以及自定义 TypeScript 插件和类型检查器。 |





#### Automatic Installation

我们建议使用 create-next-app 启动一个新的 Next.js 应用程序，它会自动为您设置所有内容。要创建项目，请运行：

```cmd
npx create-next-app@latest
```

安装时，您将看到以下提示：

```
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

出现提示后，create-next-app 将使用您的项目名称创建一个文件夹并安装所需的依赖项。



#### Manual Installation

要手动创建新的 Next.js 应用程序，请安装所需的包：

```cmd
npm install next@latest react@latest react-dom@latest
```

打开 package.json 文件并添加以下脚本：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

这些脚本涉及开发应用程序的不同阶段：

* dev：运行 next dev 以在开发模式下启动 Next.js。

* `build`: runs [`next build`](https://nextjs.org/docs/app/api-reference/next-cli#build) to build the application for production usage.

  构建：运行下一个构建以构建用于生产的应用程序。

* start：运行 next start 以启动 Next.js 生产服务器。

* lint：运行 next lint 以设置 Next.js 的内置 ESLint 配置。



##### Creating directories

Next.js 使用文件系统路由，这意味着应用程序中的路由由您构建文件的方式决定。

###### The app directory

对于新应用程序，我们建议使用 App Router。该路由器允许您使用 React 的最新功能，并且是基于社区反馈的 Pages Router 的演变。

创建app/文件夹，然后添加layout.tsx和page.tsx文件。当用户访问应用程序的根目录 (/) 时，将呈现这些内容。

使用所需的 <html> 和 <body> 标签在 app/layout.tsx 中创建根布局：

app/layout.tsx

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

最后，创建一个主页 app/page.tsx 并包含一些初始内容：

app/page.tsx

```tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

> 很高兴知道：如果您忘记创建layout.tsx，Next.js 将在使用 next dev 运行开发服务器时自动创建此文件。

Learn more about [using the App Router](https://nextjs.org/docs/app/building-your-application/routing/defining-routes).



###### The pages directory (optional)

如果您更喜欢使用页面路由器而不是应用程序路由器，您可以在项目的根目录下创建一个 Pages/ 目录。

然后，在页面文件夹中添加一个 index.tsx 文件。这将是您的主页 (/)：

```tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

接下来，在pages/内添加一个_app.tsx文件来定义全局布局。了解有关自定义 App 文件的更多信息。

pages/_app.tsx

```tsx
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

最后，在pages/内添加一个_document.tsx文件来控制服务器的初始响应。了解有关自定义文档文件的更多信息。

pages/_document.tsx

```tsx
import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

Learn more about [using the Pages Router](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts).

> 很高兴知道：虽然您可以在同一项目中使用两个路由器，但应用程序中的路由将优先于页面。我们建议在您的新项目中仅使用一台路由器以避免混淆。



###### The public folder (optional)

创建一个公共文件夹来存储静态资源，例如图像、字体等。然后，您的代码可以从基本 URL (/) 开始引用公共目录中的文件。



## Next.js Project Structure

此页面概述了 Next.js 项目的文件和文件夹结构。它涵盖了应用程序和页面目录中的顶级文件和文件夹、配置文件以及路由约定。

#### Top-level folders

|                                                              |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`app`](https://nextjs.org/docs/app/building-your-application/routing) | App Router<br />应用路由器                                   |
| [`pages`](https://nextjs.org/docs/pages/building-your-application/routing) | Pages Router<br />页面路由器                                 |
| [`public`](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets) | Static assets to be served<br />要提供的静态资产             |
| [`src`](https://nextjs.org/docs/app/building-your-application/configuring/src-directory) | Optional application source folder<br />可选的应用程序源文件夹 |

#### Top-level files

|                                                              |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Next.js**                                                  |                                                              |
| [`next.config.js`](https://nextjs.org/docs/app/api-reference/next-config-js) | Configuration file for Next.js<br />Next.js 的配置文件       |
| [`package.json`](https://nextjs.org/docs/getting-started/installation#manual-installation) | Project dependencies and scripts<br />项目依赖和脚本         |
| [`instrumentation.ts`](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) | OpenTelemetry and Instrumentation file<br />OpenTelemetry 和 Instrumentation 文件 |
| [`middleware.ts`](https://nextjs.org/docs/app/building-your-application/routing/middleware) | Next.js request middleware<br />Next.js 请求中间件           |
| [`.env`](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) | Environment variables<br />环境变量                          |
| [`.env.local`](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) | Local environment variables<br />本地环境变量                |
| [`.env.production`](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) | Production environment variables<br />生产环境变量           |
| [`.env.development`](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) | Development environment variables<br />开发环境变量          |
| [`.eslintrc.json`](https://nextjs.org/docs/app/building-your-application/configuring/eslint) | Configuration file for ESLint<br />ESLint 的配置文件         |
| `.gitignore`                                                 | Git files and folders to ignore<br />要忽略的 Git 文件和文件夹 |
| `next-env.d.ts`                                              | TypeScript declaration file for Next.js<br />Next.js 的 TypeScript 声明文件 |
| `tsconfig.json`                                              | Configuration file for TypeScript<br />TypeScript 的配置文件 |
| `jsconfig.json`                                              | Configuration file for JavaScript<br />JavaScript 的配置文件 |