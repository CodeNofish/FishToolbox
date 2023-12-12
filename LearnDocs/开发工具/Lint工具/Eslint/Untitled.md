https://eslint.org/

ESLint 静态分析您的代码以快速发现问题。它内置于大多数文本编辑器中，您可以将 ESLint 作为持续集成管道的一部分运行。



# Getting Started with ESLint

ESLint 是一种用于识别和报告 ECMAScript/JavaScript 代码中发现的模式的工具，其目标是使代码更加一致并避免错误。

ESLint 是完全可插入的。每个规则都是一个插件，您可以在运行时添加更多规则。您还可以添加社区插件、配置和解析器来扩展 ESLint 的功能。



```cmd
npm init @eslint/config
```

运行 npm init @eslint/config 后，您的目录中将有一个 .eslintrc.{js,yml,json} 文件。在其中，您将看到一些配置如下的规则：

```json
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

名称“semi”和“quotes”是 ESLint 中规则的名称。第一个值是规则的错误级别，可以是以下值之一：

* “off”或 0 - 关闭规则
* “warn”或 1 - 打开规则作为警告（不影响退出代码）
* “error”或 2 - 将规则作为错误打开（退出代码将为 1）

三个错误级别允许您对 ESLint 如何应用规则进行细粒度控制（有关更多配置选项和详细信息，请参阅配置文档）。

您的 .eslintrc.{js,yml,json} 配置文件还将包含以下行：

```json
{
    "extends": "eslint:recommended"
}
```

由于这一行，规则页面上标记为“（推荐）”的所有规则都将被打开。或者，您可以使用其他人通过在 npmjs.com 上搜索“eslint-config”创建的配置。除非您从共享配置扩展或在配置中显式打开规则，否则 ESLint 不会检查您的代码。
