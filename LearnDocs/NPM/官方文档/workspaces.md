https://docs.npmjs.com/cli/v10/using-npm/workspaces

[TOC]

# workspaces

工作区是一个通用术语，指的是 npm cli 中的一组功能，它支持在单个顶级根包中管理本地文件系统中的多个包。

这组功能使得处理来自本地文件系统的链接包的工作流程更加简化。作为 npm install 的一部分自动执行链接过程，并避免手动使用 npm link 来添加对应符号链接到当前 node_modules 文件夹中的包的引用。

我们还将 npm 安装期间自动符号链接的这些包称为单个工作区，这意味着它是当前本地文件系统中的嵌套包，在 package.json 工作区配置中显式定义。

## Defining workspaces

工作空间通常通过 package.json 文件的工作空间属性定义，例如：

```json
{
  "name": "my-workspaces-powered-project",
  "workspaces": ["packages/a"]
}
```

鉴于上面的 package.json 示例位于当前工作目录。包含一个名为 packages/a 的文件夹，该文件夹本身包含一个 package.json ，定义了一个 Node.js 包，例如：

```
.
+-- package.json
`-- packages
   +-- a
   |   `-- package.json
```

在此当前工作目录中运行 npm install 后的预期结果。是文件夹packages/a将被符号链接到当前工作目录的node_modules文件夹。

下面是一个 npm 安装后的示例，给出了与之前相同的文件和文件夹示例结构：

```
.
+-- node_modules
|  `-- a -> ../packages/a
+-- package-lock.json
+-- package.json
`-- packages
   +-- a
   |   `-- package.json
```



## Getting started with workspaces

您可以使用 npm init 自动执行定义新工作区所需的步骤。例如，在已经定义了 package.json 的项目中，您可以运行：

`npm init -w ./packages/a`

此命令将创建丢失的文件夹和新的 package.json 文件（如果需要），同时确保正确配置根项目 package.json 的“workspaces”属性。



## Adding dependencies to a workspace

可以使用工作区配置直接添加/删除/更新工作区的依赖项。

例如，假设以下结构：

```bash
.
+-- package.json
`-- packages
   +-- a
   |   `-- package.json
   `-- b
       `-- package.json
```

如果您想从注册表添加名为 abbrev 的依赖项作为工作区 a 的依赖项，您可以使用工作区配置告诉 npm 安装程序应将包添加为所提供工作区的依赖项：

`npm install abbrev -w a`

注意：其他安装命令（例如 uninstall、ci 等）也将遵循提供的工作区配置。



## Using workspaces

鉴于 Node.js 如何处理模块解析的特殊性，可以通过其声明的 package.json 名称来使用任何定义的工作区。继续上面定义的示例，我们还创建一个 Node.js 脚本，该脚本需要工作区一个示例模块，例如：

```js
// ./packages/a/index.js
module.exports = 'a'

// ./lib/index.js
const moduleA = require('a')
console.log(moduleA) // -> a
```

运行时：

`node lib/index.js`

这演示了 node_modules 解析的本质如何允许工作空间启用可移植的工作流程，以便要求每个工作空间以同样易于发布这些嵌套工作空间以在其他地方使用的方式。



## Running commands in the context of workspaces

您可以使用工作区配置选项在已配置工作区的上下文中运行命令。此外，如果当前目录位于工作区中，则会隐式设置工作区配置，并将前缀设置为根工作区。

以下是有关如何在嵌套工作区上下文中使用 npm run 命令的快速示例。对于包含多个工作区的项目，例如：

```
.
+-- package.json
`-- packages
   +-- a
   |   `-- package.json
   `-- b
       `-- package.json
```

通过使用工作空间选项运行命令，可以在该特定工作空间的上下文中运行给定的命令。例如：

`npm run test --workspace=a`

您还可以在工作区中运行该命令。

`cd packages/a && npm run test`

两者都将运行 ./packages/a/package.json 文件中定义的测试脚本。

请注意，您还可以在命令行中多次指定此参数，以便定位多个工作区，例如：

`npm run test --workspace=a --workspace=b`

或者对“packages”文件夹中的每个工作区运行命令：

`npm run test --workspace=packages`

还可以使用工作区（复数）配置选项来启用相同的行为，但在所有配置的工作区的上下文中运行该命令。例如：	

`npm run test --workspaces`

将运行 ./packages/a 和 ./packages/b 中的测试脚本。

命令将按照它们在 package.json 中出现的顺序在每个工作区中运行

```json
{
  "workspaces": [ "packages/a", "packages/b" ]
}
```

运行顺序与以下内容不同：

```json
{
  "workspaces": [ "packages/b", "packages/a" ]
}
```



## Ignoring missing scripts

不需要所有工作区都实现使用 npm run 命令运行的脚本。

通过使用 --if-present 标志运行命令，npm 将忽略缺少目标脚本的工作区。

`npm run test --workspaces --if-present`