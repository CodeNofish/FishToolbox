https://babeljs.io/

https://babeljs.io/docs/

[TOC]

# Guides



## What is Babel?

#### Babel 是一个 JavaScript 编译器

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 代码转换为当前和旧版本浏览器或环境中向后兼容的 JavaScript 版本。以下是 Babel 可以为您做的主要事情：

* 转换语法
* 目标环境中缺少的 Polyfill 功能（通过第三方 Polyfill，例如 core-js）
* 源代码转换（codemods）

```js
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

> Tip
>
> 有关编译器的精彩教程，请查看 [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)，它还解释了 Babel 本身如何在高层次上工作。

#### ES2015 and beyond

Babel 通过语法转换器支持最新版本的 JavaScript。

这些插件允许您立即使用新语法，而无需等待浏览器支持。查看我们的使用指南以开始使用。

#### JSX and React

Babel 可以转换 JSX 语法！查看我们的 React 预设即可开始。将它与 babel-sublime 包一起使用，将语法高亮显示提升到一个全新的水平。

```sh
npm install --save-dev @babel/preset-react
```

并将 @babel/preset-react 添加到你的 Babel 配置中。

#### Type Annotations (Flow and TypeScript)

Babel 可以去掉类型注释！查看我们的 Flow 预设或 TypeScript 预设即可开始使用。请记住，Babel 不进行类型检查；您仍然需要安装并使用 Flow 或 TypeScript 来检查类型。

```sh
npm install --save-dev @babel/preset-flow
```

```js
// @flow
function square(n: number): number {
  return n * n;
}
```

或打字稿预设

```sh
npm install --save-dev @babel/preset-typescript
```

```ts
function Greeter(greeting: string) {
  this.greeting = greeting;
}
```

#### Pluggable

Babel 是由插件构建的。使用现有插件构建您自己的转换管道或编写您自己的转换管道。通过使用或创建预设轻松使用一组插件。

使用astexplorer.net 即时创建插件或使用generator-babel-plugin 生成插件模板。

#### Debuggable

源映射支持，以便您可以轻松调试编译的代码。

#### Spec Compliant

Babel 尝试尽可能合理地遵守 ECMAScript 标准。它还可能有特定的选项来更加符合规范，作为性能的权衡。

#### Compact

Babel 尝试使用尽可能少的代码，而不依赖于庞大的运行时。

在某些情况下，这可能很难做到，并且存在一些“假设”选项，可以在可读性、文件大小和速度之间权衡规范合规性。



## Usage Guide

Babel 工具链中有相当多的工具试图让您轻松使用 Babel，无论您是“最终用户”还是构建 Babel 本身的集成。这将是对这些工具的快速介绍，您可以在文档的“用法”部分中阅读有关它们的更多信息。

如果您使用框架，配置 Babel 的工作可能会有所不同，或者实际上已经为您处理好了。请查看我们的交互式设置指南。

#### Overview

1. 运行以下命令来安装软件包：

```sh
yarn add --dev @babel/core @babel/cli @babel/preset-env
```

2. 在项目的根目录中创建一个名为 babel.config.json （需要 v7.8.0 及更高版本）的配置文件，其中包含以下内容：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

或者 babel.config.js 如果您使用的是较旧的 Babel 版本

```js
const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
```

3. 并运行此命令将所有代码从 src 目录编译到 lib：

```sh
./node_modules/.bin/babel src --out-dir lib
```

> 您可以使用 npm@5.2.0 附带的 npm 包运行程序通过将 ./node_modules/.bin/babel 替换为 npx babel 来缩短该命令

#### Basic usage with CLI

您需要的所有 Babel 模块都作为单独的 npm 包发布，范围在 @babel 下（自版本 7 起）。这种模块化设计允许使用各种工具，每种工具都针对特定用例而设计。这里我们将看看@babel/core 和@babel/cli。

###### Core Library

```sh
yarn add --dev @babel/core
```

你可以直接在 JavaScript 程序中 require 它并像这样使用它：

```js
const babel = require("@babel/core");

babel.transformSync("code", optionsObject);
```

不过，作为最终用户，您可能希望安装其他工具作为 @babel/core 的接口并与您的开发过程很好地集成。即便如此，您可能仍然想检查其文档页面以了解这些选项，其中大部分选项也可以从其他工具进行设置。

###### CLI tool

@babel/cli 是一个允许你从终端使用 babel 的工具。这是安装命令和基本使用示例：

```sh
yarn add --dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

这将解析 src 目录中的所有 JavaScript 文件，应用我们告诉它的任何转换，并将每个文件输出到 lib 目录。由于我们还没有告诉它应用任何转换，因此输出代码将与输入相同（不保留确切的代码样式）。我们可以通过将它们作为选项传递来指定我们想要的转换。

我们在上面使用了 --out-dir 选项。您可以通过使用 --help 运行 cli 工具来查看该工具接受的其余选项。但现在对我们来说最重要的是 --plugins 和 --presets。

#### Plugins & Presets

转换以插件的形式出现，它们是小型 JavaScript 程序，指导 Babel 如何对代码进行转换。您甚至可以编写自己的插件来将您想要的任何转换应用到代码中。要将 ES2015+ 语法转换为 ES5，我们可以依赖 @babel/plugin-transform-arrow-functions 等官方插件：

```sh
yarn add --dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

现在我们代码中的任何箭头函数都将转换为 ES5 兼容的函数表达式：

这是一个好的开始！但我们的代码中还有其他需要转换的 ES2015+ 功能。我们可以使用“预设”，而不是逐一添加我们想要的所有插件，它只是一组预先确定的插件。

就像使用插件一样，您也可以创建自己的预设来共享您需要的插件的任意组合。对于我们这里的用例，有一个名为 env 的出色预设。

```sh
yarn add --dev @babel/preset-env

./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

无需任何配置，此预设将包含支持现代 JavaScript（ES2015、ES2016 等）的所有插件。但预设也可以采用选项。让我们看看另一种传递选项的方法：配置文件，而不是从终端传递 cli 和预设选项。

#### Configuration

> 根据您的需要，有几种不同的方法可以使用配置文件。请务必阅读我们关于如何配置 Babel 的深入指南以获取更多信息。

现在，我们创建一个名为 babel.config.json 的文件（需要 v7.8.0 及更高版本），其中包含以下内容：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        }
      }
    ]
  ]
}
```

现在，env 预设将仅加载目标浏览器中不可用的功能的转换插件。我们已经准备好语法了。接下来让我们看看 Polyfill。

#### Polyfill

> 🚨 从 Babel 7.4.0 开始，这个包已被弃用，转而直接包含 core-js/stable （以填充 ECMAScript 功能）：
>
> ```js
> import "core-js/stable";
> ```

@babel/polyfill 模块包括 core-js 和自定义再生器运行时来模拟完整的 ES2015+ 环境。

这意味着您可以使用新的内置函数（如 Promise 或 WeakMap）、静态方法（如 Array.from 或 Object.assign）、实例方法（如 Array.prototype.includes）以及生成器函数（与再生器插件一起使用时）。为了做到这一点，polyfill 添加到全局范围以及本地原型（如 String）。

对于库/工具作者来说这可能太多了。如果您不需要像 Array.prototype.includes 这样的实例方法，您可以使用转换运行时插件而不是 @babel/polyfill 来完全不污染全局范围。

```sh
yarn add @babel/polyfill
```

> 请注意 --save 选项而不是 --save-dev，因为这是一个需要在源代码之前运行的填充程序。

现在对我们来说幸运的是，我们使用的 env 预设有一个“useBuiltIns”选项，当设置为“usage”时，实际上将应用上面提到的最后一个优化，其中您只包含所需的 polyfill。使用这个新选项，配置会发生如下变化：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

Babel 现在将检查您的所有代码是否有目标环境中缺少的功能，并且仅包含所需的 polyfill。例如这段代码：



## Configure Babel

Babel 可以配置！许多其他工具也有类似的配置：ESLint (.eslintrc)、Prettier (.prettierrc)。





# preset

## @babel/preset-env

@babel/preset-env 是一个智能预设，允许您使用最新的 JavaScript，而无需对目标环境所需的语法转换（以及可选的浏览器填充）进行微观管理。这既让您的生活更轻松，又让 JavaScript 包变得更小！

```sh
yarn add --dev @babel/preset-env
```

如果没有一些很棒的开源项目，比如 browserslist、compat-table 和 electro-to-chromium，@babel/preset-env 是不可能实现的。

我们利用这些数据源来维护我们支持的目标环境版本获得了 JavaScript 语法或浏览器功能支持的映射，以及这些语法和功能到 Babel 转换插件和 core-js polyfill 的映射。

> Note
>
> @babel/preset-env 不会包含任何低于第 3 阶段的 JavaScript 语法提案，因为在 TC39 流程的该阶段，任何浏览器都不会实现它。这些需要手动包含在内。 ShipedProposals 选项将包括某些浏览器已经实现的第 3 阶段提案。

@babel/preset-env 获取您指定的任何目标环境，并根据其映射检查它们，以编译插件列表并将其传递给 Babel。

#### Browserslist Integration

对于基于浏览器或 Electron 的项目，我们建议使用 .browserslistrc 文件来指定目标。您可能已经拥有此配置文件，因为生态系统中的许多工具都在使用它，例如 autoprefixer、stylelint、eslint-plugin-compat 等。

默认情况下@babel/preset-env将使用browserslist配置源，除非设置了targets或ignoreBrowserslistConfig选项。

> 如果您依赖 browserslist 的默认查询（无论是明确的还是没有 browserslist 配置），您将需要查看“无目标”部分以获取有关预设环境行为的信息。

例如，仅包含浏览器市场份额 >0.25% 的用户所需的填充和代码转换（忽略没有安全更新的浏览器，如 IE 10 和 BlackBerry）：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.22"
      }
    ]
  ]
}
```

.browserslistrc

```
> 0.25%
not dead
```

或者 package.json

```json
{ "browserslist": "> 0.25%, not dead" }
```

#### Options

https://babeljs.io/docs/babel-preset-env

###### bugfixes 错误修复

布尔值，默认为 false。

> Babel 8 中默认启用此选项。

默认情况下，@babel/preset-env（以及一般的 Babel 插件）将 ECMAScript 语法功能分组为密切相关的较小功能的集合。这些组可能很大并且包含许多边缘情况，例如“函数参数”包括解构参数、默认参数和剩余参数。根据此分组信息，Babel 根据您为 @babel/preset-env 的 Targets 选项指定的浏览器支持目标启用或禁用每个组。

启用此选项后，@babel/preset-env 会尝试将损坏的语法编译为目标浏览器支持的最接近的未损坏的现代语法。根据您的目标以及您使用的现代语法的数量，这可能会导致编译的应用程序的大小显着减小。此选项合并了 @babel/preset-modules 的功能，而无需使用其他预设。



切换启用对浏览器中附带的内置/功能提案的支持。如果您的目标环境对功能提案具有本机支持，则会启用其匹配的解析器语法插件，而不是执行任何转换。请注意，这不会启用与 @babel/preset-stage-3 相同的转换，因为提案在登陆浏览器之前可以继续更改。





## @babel/preset-react

This preset always includes the following plugins:

- [@babel/plugin-syntax-jsx](https://babeljs.io/docs/babel-plugin-syntax-jsx)
- [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/babel-plugin-transform-react-jsx)
- [@babel/plugin-transform-react-display-name](https://babeljs.io/docs/babel-plugin-transform-react-display-name)

And with the `development` option:

并使用开发选项：

Classic runtime adds:

经典运行时添加：

- [@babel/plugin-transform-react-jsx-self](https://babeljs.io/docs/babel-plugin-transform-react-jsx-self)
- [@babel/plugin-transform-react-jsx-source](https://babeljs.io/docs/babel-plugin-transform-react-jsx-source)

Automatic runtime (since `v7.9.0`) adds the functionality for these plugins automatically when the `development` option is enabled. If you have automatic runtime enabled, adding [@babel/plugin-transform-react-jsx-self](https://babeljs.io/docs/babel-plugin-transform-react-jsx-self) or [@babel/plugin-transform-react-jsx-source](https://babeljs.io/docs/babel-plugin-transform-react-jsx-source) will error.

当启用开发选项时，自动运行时（自 v7.9.0 起）会自动添加这些插件的功能。如果启用了自动运行时，添加 @babel/plugin-transform-react-jsx-self 或 @babel/plugin-transform-react-jsx-source 将会出错。

```sh
yarn add --dev @babel/preset-react
```



