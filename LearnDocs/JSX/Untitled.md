https://www.typescriptlang.org/docs/handbook/jsx.html

[TOC]

# JSX

JSX 是一种可嵌入的类似 XML 的语法。它旨在被转换为有效的 JavaScript，尽管该转换的语义是特定于实现的。 JSX 随 React 框架而流行，但此后也出现了其他实现。 TypeScript 支持嵌入、类型检查以及将 JSX 直接编译为 JavaScript。



## Basic usage

为了使用 JSX，您必须做两件事。

1. 使用 .tsx 扩展名命名您的文件
2. 启用 jsx 选项

TypeScript ships with three JSX modes: `preserve`, `react`, and `react-native`. These modes only affect the emit stage - type checking is unaffected. The `preserve` mode will keep the JSX as part of the output to be further consumed by another transform step (e.g. [Babel](https://babeljs.io/)). Additionally the output will have a `.jsx` file extension. The `react` mode will emit `React.createElement`, does not need to go through a JSX transformation before use, and the output will have a `.js` file extension. The `react-native` mode is the equivalent of `preserve` in that it keeps all JSX, but the output will instead have a `.js` file extension.

TypeScript 附带三种 JSX 模式：保留、反应和反应本机。这些模式仅影响发射阶段 - 类型检查不受影响。保留模式将保留 JSX 作为输出的一部分，以供另一个转换步骤（例如 Babel）进一步使用。此外，输出将具有 .jsx 文件扩展名。 React模式会发出React.createElement，使用前不需要经过JSX转换，并且输出将具有.js文件扩展名。 React-native 模式相当于保留所有 JSX，但输出将具有 .js 文件扩展名。

| Mode           | Input     | Output                                            | Output File Extension |
| :------------- | :-------- | :------------------------------------------------ | :-------------------- |
| `preserve`     | `<div />` | `<div />`                                         | `.jsx`                |
| `react`        | `<div />` | `React.createElement("div")`                      | `.js`                 |
| `react-native` | `<div />` | `<div />`                                         | `.js`                 |
| `react-jsx`    | `<div />` | `_jsx("div", {}, void 0);`                        | `.js`                 |
| `react-jsxdev` | `<div />` | `_jsxDEV("div", {}, void 0, false, {...}, this);` | `.js`                 |

您可以使用 jsx 命令行标志或 tsconfig.json 文件中的相应选项 jsx 来指定此模式。

> *注意：您可以指定在使用 jsxFactory 选项定位 React JSX 时要使用的 JSX 工厂函数（默认为 React.createElement）



