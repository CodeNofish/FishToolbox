https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

[TOC]

# Project Configuration



## 什么是 tsconfig.json

目录中存在 tsconfig.json 文件表明该目录是 TypeScript 项目的根目录。 tsconfig.json 文件指定编译项目所需的根文件和编译器选项。

JavaScript 项目可以改用 jsconfig.json 文件，其行为几乎相同，但默认启用一些与 JavaScript 相关的编译器标志。

项目可以通过以下方式之一进行编译：

#### Using tsconfig.json or jsconfig.json

* 通过在没有输入文件的情况下调用 tsc，在这种情况下，编译器将从当前目录开始搜索 tsconfig.json 文件，并继续沿着父目录链向上搜索。
* 通过在没有输入文件和 --project （或只是 -p）命令行选项的情况下调用 tsc，该选项指定包含 tsconfig.json 文件的目录路径，或包含配置的有效 .json 文件的路径。

在命令行上指定输入文件时，tsconfig.json 文件将被忽略。

#### Examples

tsconfig.json 文件示例：

###### Using the files property

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "emitter.ts",
    "program.ts",
    "commandLineParser.ts",
    "tsc.ts",
    "diagnosticInformationMap.generated.ts"
  ]
}
```

###### Using the include and exclude properties

```json
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outFile": "../../built/local/tsc.js",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.spec.ts"]
}
```

#### TSConfig Bases

[github.com/tsconfig/bases](https://github.com/tsconfig/bases/). 

根据您打算运行代码的 JavaScript 运行时环境，可能有一个可以在 github.com/tsconfig/bases 上使用的基本配置。这些是您的项目扩展的 tsconfig.json 文件，通过处理运行时支持来简化您的 tsconfig.json。

例如，如果您正在编写一个使用 Node.js 版本 12 及更高版本的项目，那么您可以使用 npm 模块 @tsconfig/node12：

```json
{
  "extends": "@tsconfig/node12/tsconfig.json",
  "compilerOptions": {
    "preserveConstEnums": true
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.spec.ts"]
}
```

这让您的 tsconfig.json 专注于项目的独特选择，而不是所有运行时机制。已经有一些 tsconfig 基础，我们希望社区可以为不同的环境添加更多。

#### Details

“compilerOptions”属性可以省略，在这种情况下使用编译器的默认值。请参阅我们支持的编译器选项的完整列表。

[Compiler Options](https://www.typescriptlang.org/tsconfig).

#### TSConfig Reference

要了解有关 TSConfig Reference 中数百个配置选项的更多信息。

[TSConfig Reference](https://www.typescriptlang.org/tsconfig).

#### Schema

The `tsconfig.json` Schema can be found at [the JSON Schema Store](http://json.schemastore.org/tsconfig).

tsconfig.json 架构可以在 JSON 架构存储中找到。



## MSBuild 中的编译器选项

当您有一个使用 TypeScript 的基于 MSBuild 的项目（例如 ASP.NET Core 项目）时，您可以通过两种方式配置 TypeScript。通过 tsconfig.json 或通过项目设置。

略



## Project References 项目参考

项目引用是 TypeScript 3.0 中的一项新功能，允许您将 TypeScript 程序构建为更小的部分。

通过这样做，您可以大大缩短构建时间，强制组件之间的逻辑分离，并以新的更好的方式组织代码。

我们还为 tsc 引入了一种新模式，即 --build 标志，它与项目引用协同工作，以实现更快的 TypeScript 构建。

#### An Example Project

让我们看一个相当正常的程序，看看项目引用如何帮助我们更好地组织它。想象一下，您有一个包含两个模块（转换器和单元）的项目，并且每个模块都有一个相应的测试文件：

```
/
├── src/
│   ├── converter.ts
│   └── units.ts
├── test/
│   ├── converter-tests.ts
│   └── units-tests.ts
└── tsconfig.json
```

测试文件导入实现文件并进行一些测试：

```ts
// converter-tests.ts
import * as converter from "../src/converter";
assert.areEqual(converter.celsiusToFahrenheit(0), 32);
```

以前，如果您使用单个 tsconfig 文件，则此结构使用起来相当尴尬：

* 实现文件可以导入测试文件
* 如果没有 src 出现在输出文件夹名称中，则无法同时构建 test 和 src，您可能不希望这样
* 仅更改实现文件中的内部结构需要再次对测试进行类型检查，即使这不会导致新的错误
* 即使没有任何改变，仅更改测试就需要再次对实现进行类型检查

您可以使用多个 tsconfig 文件来解决其中一些问题，但会出现新问题：

* 没有内置的最新检查，因此您最终总是运行 tsc 两次
* 调用 tsc 两次会产生更多的启动时间开销
* tsc -w 无法同时在多个配置文件上运行

项目参考可以解决所有这些问题以及更多问题。

#### What is a Project Reference?

tsconfig.json 文件有一个新的顶级属性，即引用。它是一个对象数组，指定要引用的项目：

```json
{
    "compilerOptions": {
        // The usual
    },
    "references": [
        { "path": "../src" }
    ]
}
```

每个引用的路径属性可以指向包含 tsconfig.json 文件的目录，或配置文件本身（可以有任何名称）。

当您引用一个项目时，新的事情会发生：

* 从引用的项目导入模块将改为加载其输出声明文件 (.d.ts)
* 如果引用的项目生成 outFile，则输出文件 .d.ts 文件的声明将在此项目中可见
* 如果需要，构建模式（见下文）将自动构建引用的项目

通过分成多个项目，您可以极大地提高类型检查和编译的速度，减少使用编辑器时的内存使用量，并改善程序逻辑分组的执行。

#### composite

引用的项目必须启用新的复合设置。需要此设置来确保 TypeScript 可以快速确定在哪里找到引用项目的输出。启用复合标志会改变一些事情：

* rootDir 设置，如果未显式设置，则默认为包含 tsconfig 文件的目录
* 所有实现文件必须通过包含模式匹配或在文件数组中列出。如果违反此约束，tsc 将通知您哪些文件未指定
* 声明必须开启