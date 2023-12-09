https://www.npmjs.com/package/postcss-import

https://github.com/postcss/postcss-import

[TOC]

# postcss-import

> PostCSS 插件通过内联内容来转换 @import 规则。

该插件可以使用本地文件、节点模块或 web_modules。要解析 @import 规则的路径，它可以查看根目录（默认情况下 process.cwd()）、web_modules、node_modules 或本地模块。导入模块时，它将在 style 或 main 字段中查找 index.css 或 package.json 中引用的文件。您还可以手动提供多个要查看的路径。

Notes:

* 该插件可能应该用作您列表中的第一个插件。这样，其他插件将在 AST 上工作，就好像只有一个文件需要处理一样，并且可能会按照您的预期工作。
* 在插件链中的 postcss-import 之后运行 postcss-url 将允许您在内联导入的文件后调整资产 url() （甚至内联它们）。
* 为了优化输出，该插件只会在给定范围（根、媒体查询...）上导入一次文件。测试是根据导入文件的路径和内容进行的（使用哈希表）。如果这种行为不是您想要的，请查看skipDuplicates选项
* 如果您正在寻找 Glob Imports，您可以使用 postcss-import-ext-glob 来扩展 postcss-import。
* 如果要导入远程源，可以使用 postcss-import-url 及其 dataUrls 插件选项来扩展 postcss-import。
* 未修改的导入（通过 options.filter 或因为它们是远程导入）将移至输出的顶部。
* 该插件尝试遵循 CSS @import 规范； @import 语句必须位于所有其他语句之前（@charset 除外）。

#### Installation

```cmd
$ npm install -D postcss-import
```

#### Usage

除非您的样式表位于运行 postcss (process.cwd()) 的同一位置，否则您将需要使用 from 选项来使相对导入起作用。

```js
// dependencies
const fs = require("fs")
const postcss = require("postcss")
const atImport = require("postcss-import")

// css to be processed
const css = fs.readFileSync("css/input.css", "utf8")

// process css
postcss()
  .use(atImport())
  .process(css, {
    // `from` option is needed here
    from: "css/input.css"
  })
  .then((result) => {
    const output = result.css

    console.log(output)
  })
```

#### Options

###### filter

仅转换测试函数返回 true 的导入。测试函数返回 false 的导入将保持原样。该函数获取导入路径作为参数，并应返回一个布尔值。

###### root

定义解析路径的根（例如：node_modules 所在的位置）。不应该使用那么多。

###### path

在其中查找文件的字符串或路径数组。

###### plugins

要应用于每个导入文件的一组插件。

###### resolve

您可以使用此选项提供自定义路径解析器。此函数获取 (id, basedir, importOptions, astNode) 参数，并应返回一个路径、路径数组或解析为路径的 Promise。如果您不返回绝对路径，您的路径将使用默认解析器解析为绝对路径。您可以为此使用解析。

###### load

您可以通过设置此选项来覆盖默认的加载方式。该函数获取 (filename, importOptions) 参数并返回内容或承诺的内容。

###### skipDuplicates

默认情况下，类似的文件（基于相同的内容）将被跳过。它是为了优化输出并跳过类似的文件（例如，normalize.css）。如果此行为不是您想要的，只需将此选项设置为 false 即可禁用它。

###### addModulesDirectories

要添加到 Node 解析器的文件夹名称数组。值将附加到默认解析目录：[“node_modules”，“web_modules”]。

此选项仅用于向默认解析器添加其他目录。如果您通过上面的解析配置选项提供自己的解析器，则该值将被忽略。

###### nameLayer

您可以为匿名层提供自定义命名函数（@import 'baz.css'层；）。

此函数获取 (index, rootFilename) 参数，并应返回一个唯一的字符串。

此选项仅影响没有图层名称的导入。

如果没有此选项，插件将在匿名层上发出警告。

###### warnOnEmpty

默认情况下，当导入空文件时，postcss-import 会发出警告。



#### dependency Message Support

postcss-import 为每个 @import 添加一条消息到 result.messages。消息采用以下格式：

```json
{
  type: 'dependency',
  file: absoluteFilePath,
  parent: fileContainingTheImport
}
```

