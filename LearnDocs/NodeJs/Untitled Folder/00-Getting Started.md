https://nodejs.org/en/learn/getting-started/introduction-to-nodejs



#### Introduction to Node.js

Node.js 是一个开源、跨平台的 JavaScript 运行时环境。它是几乎适用于任何类型项目的流行工具！

Node.js 在浏览器外部运行 V8 JavaScript 引擎，这是 Google Chrome 的核心。这使得 Node.js 具有非常高的性能。

Node.js 应用程序在单个进程中运行，无需为每个请求创建新线程。 Node.js 在其标准库中提供了一组异步 I/O 原语，可防止 JavaScript 代码阻塞，并且通常 Node.js 中的库是使用非阻塞范例编写的，这使得阻塞行为成为例外而不是常态。

当 Node.js 执行 I/O 操作（例如从网络读取、访问数据库或文件系统）时，Node.js 不会阻塞线程并浪费 CPU 周期等待，而是会在响应返回时恢复操作。

这使得 Node.js 能够通过单个服务器处理数千个并发连接，而不会引入管理线程并发的负担，而管理线程并发可能是错误的重要来源。

Node.js 具有独特的优势，因为数百万为浏览器编写 JavaScript 的前端开发人员现在除了客户端代码之外还可以编写服务器端代码，而无需学习完全不同的语言。

在 Node.js 中，可以毫无问题地使用新的 ECMAScript 标准，因为您不必等待所有用户更新其浏览器 - 您负责通过更改 Node.js 版本来决定使用哪个 ECMAScript 版本，您还可以通过运行带有标志的 Node.js 来启用特定的实验性功能。



#### An Example Node.js Application

Node.js 最常见的 Hello World 示例是 Web 服务器：

```js
const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

要运行此代码片段，请将其保存为 server.js 文件并在终端中运行 node server.js。

此代码首先包含 Node.js http 模块。

Node.js 拥有出色的标准库，包括一流的网络支持。

http 的 createServer() 方法创建一个新的 HTTP 服务器并返回它。

服务器设置为侦听指定的端口和主机名。当服务器准备就绪时，将调用回调函数，在本例中通知我们服务器正在运行。

每当收到新请求时，都会调用 request 事件，并提供两个对象：请求（http.IncomingMessage 对象）和响应（http.ServerResponse 对象）。

这两个对象对于处理 HTTP 调用至关重要。

第一个提供请求详细信息。在这个简单的示例中，未使用它，但您可以访问请求标头和请求数据。

第二个用于将数据返回给调用者。

我们将 statusCode 属性设置为 200，以表示响应成功。

我们设置 Content-Type 标头

然后我们关闭响应，将内容作为参数添加到 end()：



## Node.js 和浏览器之间的区别

浏览器和 Node.js 都使用 JavaScript 作为编程语言。构建在浏览器中运行的应用程序与构建 Node.js 应用程序完全不同。尽管它始终是 JavaScript，但存在一些关键差异，导致体验截然不同。

从广泛使用 JavaScript 的前端开发人员的角度来看，Node.js 应用程序带来了巨大的优势：用单一语言对所有内容（前端和后端）进行编程的舒适度。

您拥有巨大的机会，因为我们知道全面、深入地学习一门编程语言有多么困难，并且通过使用同一种语言在网络上执行所有工作 - 无论是在客户端还是在服务器上，您都处于一个区位优势得天独厚。

> **What changes is the ecosystem.**

在浏览器中，大多数时候您所做的事情是与 DOM 或其他 Web 平台 API（如 Cookie）进行交互。当然，Node.js 中不存在这些。您没有浏览器提供的文档、窗口和所有其他对象。

在浏览器中，我们没有 Node.js 通过其模块提供的所有优秀 API，例如文件系统访问功能。

另一个很大的区别是，在 Node.js 中，您可以控制环境。除非您正在构建任何人都可以在任何地方部署的开源应用程序，否则您知道将在哪个版本的 Node.js 上运行该应用程序。与浏览器环境相比，您无法选择访问者将使用的浏览器，这非常方便。

这意味着您可以编写 Node.js 版本支持的所有现代 ES2015+ JavaScript。由于 JavaScript 的发展速度如此之快，但浏览器的升级速度可能有点慢，有时在网络上您只能使用较旧的 JavaScript / ECMAScript 版本。在将代码发送到浏览器之前，您可以使用 Babel 将代码转换为与 ES5 兼容，但在 Node.js 中，您不需要这样做。

另一个区别是 Node.js 同时支持 CommonJS 和 ES 模块系统（自 Node.js v12 起），而在浏览器中我们开始看到正在实现的 ES 模块标准。

实际上，这意味着您可以在 Node.js 中同时使用 require() 和 import，但仅限于在浏览器中导入。



## NPM包管理器简介

npm 是 Node.js 的标准包管理器。

它最初是一种下载和管理 Node.js 包依赖项的方法，但后来成为前端 JavaScript 中使用的工具。

> Yarn 和 pnpm 是 npm cli 的替代品。您也可以查看它们。



###### Installing all dependencies

如果项目有 package.json 文件，通过运行

```cmd
npm install
```

它将在 node_modules 文件夹中安装项目所需的所有内容，如果尚不存在则创建它。



###### Installing a single package

您还可以通过运行来安装特定的包

```cmd
npm install <package-name>
```

此外，从 npm 5 开始，此命令将 <package-name> 添加到 package.json 文件依赖项中。在版本 5 之前，您需要添加标志 --save。

通常您会看到此命令中添加了更多标志：

* --save-dev 安装并将条目添加到 package.json 文件 devDependencies
* --no-save 安装但不将条目添加到 package.json 文件依赖项中
* --save-Optional 安装并将条目添加到 package.json 文件 可选依赖项
* --no-Optional 将阻止安装可选依赖项

也可以使用标志的简写：

* -S: --save
* -D: --save-dev
* -O: `--save-optional`

devDependency 和 dependency 之间的区别在于，前者包含开发工具，例如测试库，而后者与生产中的应用程序捆绑在一起。

对于可选依赖项，不同之处在于依赖项的构建失败不会导致安装失败。但处理依赖关系的缺失是您的程序的责任。阅读有关可选依赖项的更多信息。



###### Updating packages

通过运行也可以轻松更新

```cmd
npm update
```

npm 将检查所有包是否有满足您的版本控制约束的较新版本。

您也可以指定要更新的单个包：



###### Versioning

除了普通下载之外，npm 还管理版本控制，因此您可以指定包的任何特定版本，或者要求高于或低于您所需的版本。

很多时候，您会发现一个库仅与另一个库的主要版本兼容。

或者最新版本的库中的错误仍未修复，导致了问题。

指定库的显式版本还有助于使每个人都使用相同的包版本，以便整个团队运行相同的版本，直到 package.json 文件更新。

在所有这些情况下，版本控制都有很大帮助，并且 npm 遵循语义版本控制 (semver) 标准。

```cmd
npm install <package-name>@<version>
```



###### Running Tasks

package.json 文件支持指定可以通过使用运行的命令行任务的格式

```cmd
npm run <task-name>
```

```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  }
}
```

使用此功能来运行 Webpack 是很常见的：

```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
```

因此，您可以运行

```
$ npm run watch
$ npm run dev
$ npm run prod
```



## ECMAScript 2015 (ES6) 及更高版本

Node.js 是针对现代版本的 V8 构建的。通过跟上该引擎的最新版本，我们确保及时为 Node.js 开发人员带来 JavaScript ECMA-262 规范的新功能，并持续改进性能和稳定性。

所有 ECMAScript 2015 (ES6) 功能分为三组，分别用于发布、暂存和正在进行的功能：

* V8 认为稳定的所有发布功能在 Node.js 上默认打开，并且不需要任何类型的运行时标志。
* 阶段性功能，即 V8 团队认为不稳定的即将完成的功能，需要运行时标志：--harmony。
* 进行中的功能可以通过各自的和谐标志单独激活，尽管除非出于测试目的，否则强烈建议不要这样做。注意：这些标志由 V8 公开，并且可能会在没有任何弃用通知的情况下发生更改。



## Node.js，开发和生产之间的区别

您可以为生产和开发环境采用不同的配置。

Node.js 假设它始终在开发环境中运行。您可以通过设置 NODE_ENV=生产环境变量来向 Node.js 发出您正在生产环境中运行的信号。

这通常是通过执行命令来完成的

```cmd
export NODE_ENV=production
```

在 shell 中，但最好将其放在 shell 配置文件中（例如 Bash shell 的 .bash_profile），否则在系统重新启动时该设置将不会保留。

您还可以通过将环境变量添加到应用程序初始化命令中来应用环境变量：

```cmd
NODE_ENV=production node app.js
```

此环境变量是外部库中广泛使用的约定。

将环境设置为生产环境通常可以确保

* 日志记录保持在最低限度、必要的水平
* 进行更多的缓存级别以优化性能

例如，如果 NODE_ENV 未设置为生产环境，Express 使用的模板库 Pug 将在调试模式下编译。在开发模式下，Express 视图会在每个请求中进行编译，而在生产模式下，它们会被缓存。还有很多例子。

您可以使用条件语句在不同环境中执行代码：

```ts
if (process.env.NODE_ENV === 'development') {
  // ...
}
if (process.env.NODE_ENV === 'production') {
  // ...
}
if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // ...
}
```

例如，在 Express 应用程序中，您可以使用它为每个环境设置不同的错误处理程序：

```ts
if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
}
```



## Node.js 与 TypeScript

TypeScript 是由微软维护和开发的一种流行的开源语言。它受到世界各地许多软件开发人员的喜爱和使用。

首先要做的是在我们的项目中安装 TypeScript：

```cmd
npm i -D typescript
```

现在我们可以在终端中使用 tsc 命令将其编译为 JavaScript。我们开始做吧！

假设我们的文件名为 example.ts，命令将如下所示：

```cmd
npx tsc example.ts
```

这里的 npx 代表 Node Package Execute。这个工具允许我们运行 TypeScript 的编译器，而无需全局安装它。

tsc 是 TypeScript 编译器，它将获取我们的 TypeScript 代码并将其编译为 JavaScript。此命令将生成一个名为 example.js 的新文件，我们可以使用 Node.js 运行该文件。现在，当我们知道如何编译和运行 TypeScript 代码时，让我们看看 TypeScript 错误预防功能的实际应用！

#### Node.js 世界中的 TypeScript

TypeScript 在 Node.js 领域已经很成熟，被许多公司、开源项目、工具和框架所使用。使用 TypeScript 的一些著名开源项目示例包括：

* NestJS - 强大且功能齐全的框架，使创建可扩展且架构良好的系统变得轻松愉快
* TypeORM - 受 Hibernate、Doctrine 或 Entity Framework 等其他语言的其他知名工具影响的出色 ORM
* Prisma - 下一代 ORM，具有声明性数据模型、生成的迁移和完全类型安全的数据库查询
* RxJS - 广泛使用的反应式编程库
* AdonisJS - 一个功能齐全的 Node.js Web 框架
* FoalTs - 优雅的 Nodejs 框架



## Node.js 与 WebAssembly

WebAssembly 是一种高性能的类汇编语言，可以从多种语言进行编译，包括 C/C++、Rust 和 AssemblyScript。目前，Chrome、Firefox、Safari、Edge 和 Node.js 支持它！

WebAssembly 规范详细介绍了两种文件格式，一种是称为 WebAssembly 模块（扩展名为 .wasm）的二进制格式，另一种是相应的文本表示形式（称为 WebAssembly 文本格式），扩展名为 .wat。