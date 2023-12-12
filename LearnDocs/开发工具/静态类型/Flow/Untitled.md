https://flow.org/en/docs/getting-started/

[TOC]

# Intro



## Getting Started

Flow 是 JavaScript 代码的静态类型检查器。它做了很多工作来提高你的工作效率。让您更快、更智能、更自信、更大规模地编码。

Flow 通过静态类型注释检查代码中的错误。这些类型允许您告诉 Flow 您希望代码如何工作，Flow 将确保它确实按照这种方式工作。

```js
function square(n: number): number {
  return n * n;
}

square("2"); // Error!
```



## Installation

#### Setup Compiler

首先，您需要设置一个编译器来剥离flow类型。您可以在 Babel 和 flow-remove-types 之间进行选择。

###### Babel

Babel 是一个 JavaScript 代码编译器，支持 Flow。 Babel 将获取您的 Flow 代码并删除任何类型注释。阅读有关使用 Babel 的更多信息。

首先使用 Yarn 或 npm 安装 @babel/core、@babel/cli 和 @babel/preset-flow。

```sh
npm install --save-dev @babel/core @babel/cli @babel/preset-flow
```

接下来，您需要在项目的根目录下创建一个 .babelrc 文件，并在“预设”中使用“@babel/preset-flow”。

```json
{ "presets": ["@babel/preset-flow"] }
```

如果您将所有源文件放在 src 目录中，则可以通过运行以下命令将它们编译到另一个目录：

```sh
./node_modules/.bin/babel src/ -d lib/
```

您可以轻松地将其添加到您的 package.json 脚本中，以及 Babel 上的“devDependency”。

```json
{
  "name": "my-project",
  "main": "lib/index.js",
  "scripts": {
    "build": "babel src/ -d lib/",
    "prepublish": "yarn run build"
  }
}
```

> 注意：您可能还需要添加一个运行此转换的预发布脚本，以便它在将代码发布到 npm 注册表之前运行。

#### Setup Flow

Flow 在使用显式版本控制按项目安装时效果最佳，而不是全局安装。

幸运的是，如果您已经熟悉 npm 或yarn，那么这个过程应该非常熟悉！

###### Add a devDependency on the flow-bin npm package

```sh
npm install --save-dev flow-bin
```

###### Add a "flow" script to your package.json

```sh
{
  "name": "my-flow-project",
  "version": "1.0.0",
  "devDependencies": {
    "flow-bin": "^0.223.3"
  },
  "scripts": {
    "flow": "flow"
  }
}
```

###### Run Flow

第一次，运行：

```sh
npm run flow init
```

第一次使用 init 运行 flow 后，运行：

```sh
npm run flow
```



#### Setup ESLint

If you use ESLint, you can read [our page on ESLint](https://flow.org/en/docs/tools/eslint/) to set it up to support Flow.

如果您使用 ESLint，您可以阅读我们的 ESLint 页面，将其设置为支持 Flow。