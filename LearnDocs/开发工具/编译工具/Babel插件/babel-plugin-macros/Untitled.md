https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros



使用 babel-plugin-macros 进行零配置代码转换
Babel 最初是一个转译器，可让您编写最新版本的 ECMAScript 规范，但可以发布到尚未实现这些功能的环境。

我们看到越来越多的库和框架的编译时优化。我不是在谈论该语言的语法扩展，而是简单的代码转换，这些转换启用了否则很难实现的模式。

不过，我在使用 Babel 插件时遇到了一些问题：

* 它们可能会导致混乱，因为在查看项目中的代码时，您可能不知道有一个插件可以转换该代码。
* 它们必须进行全局配置或带外配置（在 .babelrc 或 webpack 配置中）。
* 由于所有 babel 插件同时运行（在 Babel AST 的一次运行中），它们可能会以非常混乱的方式发生冲突。

如果我们可以导入 Babel 插件并将其直接应用到我们的代码中，这些问题就可以得到解决。这意味着转换更加明确，我们不需要将它们添加到配置中，并且可以按照插件导入的顺序进行排序。那不是很酷吗！？！？

babel-plugin-macros 是一个新的 Babel 插件，它可以让你准确地完成我们正在讨论的事情。

这是一种“新”的代码转换方法。它使您能够进行零配置、可导入的代码转换。

**babel-plugin-macros 是编写和使用 Babel 转换的一种更简单的方法。**

babel-plugin-macros 是一种无需配置非语法 babel 插件的方法。许多现有的 babel 插件都可以作为宏来实现。这是 babel-plugin-console 的另一个示例，它公开了自身的宏版本：



#### 使用 babel-plugin-macros 进行零配置代码转换

Babel 最初是一个转译器，可让您编写最新版本的 ECMAScript 规范，但可以发布到尚未实现这些功能的环境。

我们看到越来越多的库和框架的编译时优化。我不是在谈论该语言的语法扩展，而是简单的代码转换，这些转换启用了否则很难实现的模式。

不过，我在使用 Babel 插件时遇到了一些问题：

* 它们可能会导致混乱，因为在查看项目中的代码时，您可能不知道有一个插件可以转换该代码。
* 它们必须进行全局配置或带外配置（在 .babelrc 或 webpack 配置中）。
* 由于所有 babel 插件同时运行（在 Babel AST 的一次运行中），它们可能会以非常混乱的方式发生冲突。

如果我们可以导入 Babel 插件并将其直接应用到我们的代码中，这些问题就可以得到解决。这意味着转换更加明确，我们不需要将它们添加到配置中，并且可以按照插件导入的顺序进行排序。那不是很酷吗！？！？

 babel-plugin-macros 是一个新的 Babel 插件，它可以让你准确地完成我们正在讨论的事情。

这是一种“新”的代码转换方法。它使您能够进行零配置、可导入的代码转换。

 **babel-plugin-macros 是编写和使用 Babel 转换的一种更简单的方法。**

babel-plugin-macros 是一种无需配置非语法 babel 插件的方法。许多现有的 babel 插件都可以作为宏来实现。这是 babel-plugin-console 的另一个示例，它公开了自身的宏版本：



#### Installation

```sh
npm install --save-dev babel-plugin-macros
```



#### Usage

https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md