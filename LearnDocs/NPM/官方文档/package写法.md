https://docs.npmjs.com/cli/v10/configuring-npm/package-json

[TOC]

# package.json

本文档是您需要了解的有关 package.json 文件中所需内容的全部内容。它必须是实际的 JSON，而不仅仅是 JavaScript 对象文字。

本文档中描述的许多行为都受到 config.xml 中描述的配置设置的影响。

## name

如果您计划发布包，则 package.json 中最重要的内容是名称和版本字段，因为它们是必需的。名称和版本一起形成一个标识符，假定该标识符是完全唯一的。对包的更改应该伴随着对版本的更改。如果您不打算发布包，则名称和版本字段是可选的。

名字就是你的东西的名字。

一些规则：

* 名称必须小于或等于 214 个字符。这包括范围包的范围。
* 作用域包的名称可以以点或下划线开头。如果没有范围，这是不允许的。
* 新包的名称中不得包含大写字母。
* 该名称最终成为 URL、命令行参数和文件夹名称的一部分。因此，名称不能包含任何非 URL 安全字符。

一些技巧：

* 不要使用与核心 Node 模块相同的名称。
* 不要在名称中添加“js”或“node”。假设它是 js，因为您正在编写 package.json 文件，并且可以使用“engines”字段指定引擎。 （见下文。）
* 该名称可能会作为参数传递给 require()，因此它应该很短，但也具有合理的描述性。
* 在你过于依赖它之前，你可能需要检查一下 npm 注册表，看看是否已经有同名的东西了。 https://www.npmjs.com/
* 名称可以选择以范围为前缀，例如@myorg/mypackage.请参阅范围了解更多详细信息。

## version

如果您计划发布包，则 package.json 中最重要的内容是名称和版本字段，因为它们是必需的。名称和版本一起形成一个标识符，假定该标识符是完全唯一的。对包的更改应该伴随着对版本的更改。如果您不打算发布包，则名称和版本字段是可选的。

版本必须可由 node-semver 解析，它作为依赖项与 npm 捆绑在一起。 （npm install semver 自己使用。）

## description

在其中添加描述。这是一个字符串。这可以帮助人们发现您的软件包，因为它在 npm 搜索中列出。

## keywords

把关键词放进去。它是一个字符串数组。这可以帮助人们发现 npm 搜索中列出的包。

## homepage

项目主页的 url。

```
"homepage": "https://github.com/owner/project#readme"
```

## bugs

项目问题跟踪器的 URL 和/或应向其报告问题的电子邮件地址。这些对于遇到包裹问题的人很有帮助。

它应该看起来像这样：

```json
{
  "bugs": {
    "url": "https://github.com/owner/project/issues",
    "email": "project@hostname.com"
  }
}
```

您可以指定一个或两个值。如果您只想提供 url，则可以将“bugs”的值指定为简单字符串而不是对象。

如果提供了 url，npm bugs 命令将使用它。

## license

您应该为您的软件包指定一个许可证，以便人们知道如何允许他们使用它，以及您对其施加的任何限制。

如果您使用的是 BSD-2-Clause 或 MIT 等通用许可证，请为您正在使用的许可证添加当前的 SPDX 许可证标识符，如下所示：

```json
{
  "license": "BSD-3-Clause"
}
```

您可以查看 SPDX 许可证 ID 的完整列表。理想情况下，您应该选择一个经过 OSI 批准的产品。

如果您的软件包根据多个通用许可证获得许可，请使用 SPDX 许可证表达式语法版本 2.0 字符串，如下所示：

```json
{
  "license": "(ISC OR GPL-3.0)"
}
```

如果您使用的许可证尚未分配 SPDX 标识符，或者您使用的是自定义许可证，请使用如下字符串值：

```json
{
  "license": "SEE LICENSE IN <filename>"
}
```

然后在包的顶层包含一个名为 <filename> 的文件。

一些旧包使用许可证对象或包含许可证对象数组的“许可证”属性：

```json
// Not valid metadata
{
  "license" : {
    "type" : "ISC",
    "url" : "https://opensource.org/licenses/ISC"
  }
}

// Not valid metadata
{
  "licenses" : [
    {
      "type": "MIT",
      "url": "https://www.opensource.org/licenses/mit-license.php"
    },
    {
      "type": "Apache-2.0",
      "url": "https://opensource.org/licenses/apache2.0.php"
    }
  ]
}
```

这些样式现已弃用。相反，使用 SPDX 表达式，如下所示：

```json
{
  "license": "ISC"
}
```

```json
{
  "license": "(MIT OR Apache-2.0)"
}
```

最后，如果您不希望根据任何条款授予其他人使用私人或未发布的软件包的权利：

```json
{
  "license": "UNLICENSED"
}
```

还可以考虑设置“private”：true以防止意外发布。

## people fields: author, contributors

“作者”是一个人。 “贡献者”是一群人。 “person”是一个带有“name”字段以及可选的“url”和“email”的对象，如下所示：

```json
{
  "name": "Barney Rubble",
  "email": "b@rubble.com",
  "url": "http://barnyrubble.tumblr.com/"
}
```

或者您可以将其全部缩短为单个字符串，npm 将为您解析它：

```json
{
  "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
}
```

电子邮件和网址都是可选的。

npm also sets a top-level "maintainers" field with your npm user info.npm 

还使用您的 npm 用户信息设置顶级“维护者”字段。

## funding

您可以指定一个包含 URL 的对象，该 URL 提供有关帮助资助包开发的方法的最新信息、字符串 URL 或以下数组：

```json
{
  "funding": {
    "type": "individual",
    "url": "http://example.com/donate"
  },

  "funding": {
    "type": "patreon",
    "url": "https://www.patreon.com/my-account"
  },

  "funding": "http://example.com/donate",

  "funding": [
    {
      "type": "individual",
      "url": "http://example.com/donate"
    },
    "http://example.com/donateAlso",
    {
      "type": "patreon",
      "url": "https://www.patreon.com/my-account"
    }
  ]
}
```

用户可以使用 npmfund 子命令列出其项目的所有依赖项（直接和间接）的资金 URL。当提供项目名称时，还可以使用访问每个资金 URL 的快捷方式，例如：npm Fund <项目名称>（当有多个 URL 时，将访问第一个）

## files

可选文件字段是一个文件模式数组，描述当您的包作为依赖项安装时要包含的条目。文件模式遵循与 .gitignore 类似的语法，但相反：包含文件、目录或 glob 模式（*、**/* 等）将使文件在打包时包含在 tarball 中。省略该字段将使其默认为 ["*"]，这意味着它将包含所有文件。

一些特殊的文件和目录也会被包含或排除，无论它们是否存在于文件数组中（见下文）。

您还可以在包的根目录或子目录中提供 .npmignore 文件，这将防止包含文件。在包的根目录中，它不会覆盖“文件”字段，但在子目录中它会覆盖。 .npmignore 文件的工作方式与 .gitignore 类似。如果存在 .gitignore 文件，并且缺少 .npmignore，则将使用 .gitignore 的内容。

无论设置如何，始终包含某些文件：

* package.json
* README
* LICENSE / LICENCE
* The file in the "main" field
* The file(s) in the "bin" field

相反，有些文件总是被忽略：

* .git
* CVS
* .svn
* .hg
* .lock-wscript
* .wafpickle-N
* .*.swp
* .DS_Store
* `._*`
* npm-debug.log
* .npmrc
* node_modules
* config.gypi
* *.orig
* `package-lock.json` (use [`npm-shrinkwrap.json`](https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json) if you wish it to be published)

## main

main 字段是模块 ID，它是程序的主要入口点。也就是说，如果您的包名为 foo，并且用户安装了它，然后执行 require("foo")，那么将返回主模块的导出对象。

这应该是相对于包文件夹根目录的模块。

对于大多数模块来说，拥有一个主脚本是最有意义的，通常没有太多其他内容。

如果未设置 main，则默认为包根文件夹中的index.js。

## browser

如果您的模块打算在客户端使用，则应使用浏览器字段而不是主字段。这有助于提示用户它可能依赖于 Node.js 模块中不可用的原语。 （例如窗户）

## bin

许多软件包都有一个或多个可执行文件，它们希望将其安装到 PATH 中。 npm 使这变得非常简单（事实上，它使用此功能来安装“npm”可执行文件。）

要使用它，请在 package.json 中提供一个 bin 字段，它是命令名到本地文件名的映射。当此软件包全局安装时，该文件将链接到全局 bins 目录内，或者将创建一个 cmd（Windows 命令文件）来执行 bin 字段中的指定文件，因此可以按名称或名称运行它。 cmd（在 Windows PowerShell 上）。当此包作为另一个包中的依赖项安装时，该文件将被链接到该包可以直接通过 npm exec 或通过 npm run-script 调用其他脚本时通过名称来访问该文件。

例如，myapp 可以有这样的：

```json
{
  "bin": {
    "myapp": "./cli.js"
  }
}
```

因此，当您安装 myapp 时，如果是类 Unix 操作系统，它将创建一个从 cli.js 脚本到 /usr/local/bin/myapp 的符号链接，如果是 Windows，它将创建一个 cmd 文件，通常位于 C: \Users\{用户名}\AppData\Roaming\npm\myapp.cmd 运行 cli.js 脚本。

如果您有一个可执行文件，并且其名称应该是包的名称，那么您可以将其作为字符串提供。例如：

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": "./path/to/program"
}
```

会是这样的：

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": {
    "my-program": "./path/to/program"
  }
}
```

请确保 bin 中引用的文件以 #!/usr/bin/env 节点开头，否则脚本将在没有节点可执行文件的情况下启动！

请注意，您还可以使用directories.bin 设置可执行文件。

See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders#executables) for more info on executables.

## man

Specify either a single file or an array of filenames to put in place for the `man` program to find.指定单个文件或文件名数组以供 man 程序查找。

If only a single file is provided, then it's installed such that it is the result from `man <pkgname>`, regardless of its actual filename. For example:如果仅提供一个文件，则安装该文件时，它是 man <pkgname> 的结果，无论其实际文件名如何。例如：

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": "./man/doc.1"
}
```

将链接 ./man/doc.1 文件，使其成为 man foo 的目标

如果文件名不以包名开头，则会添加前缀。所以这：

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": ["./man/foo.1", "./man/bar.1"]
}
```

将创建文件来执行 man foo 和 man foo-bar 操作。

Man 文件必须以数字结尾，如果经过压缩，还可以选择以 .gz 后缀结尾。该数字指示文件安装到哪个 man 部分。

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": ["./man/foo.1", "./man/foo.2"]
}
```

## directories

The CommonJS [Packages](http://wiki.commonjs.org/wiki/Packages/1.0) spec details a few ways that you can indicate the structure of your package using a `directories` object. If you look at [npm's package.json](https://registry.npmjs.org/npm/latest), you'll see that it has directories for doc, lib, and man.

CommonJS Packages 规范详细介绍了几种使用目录对象指示包结构的方法。如果你查看 npm 的 package.json，你会发现它有 doc、lib 和 man 目录。

将来，这些信息可能会以其他创造性的方式使用。

#### directories.bin

如果在directories.bin中指定bin目录，则该文件夹中的所有文件都将被添加。

由于 bin 指令的工作方式，指定 bin 路径并设置directories.bin 是错误的。如果要指定单个文件，请使用 bin，对于现有 bin 目录中的所有文件，请使用directories.bin。

#### directories.man

一个充满手册页的文件夹。 Sugar 通过遍历文件夹来生成“man”数组。

## repository

指定您的代码所在的位置。这对于想要做出贡献的人很有帮助。如果 git 存储库位于 GitHub 上，则 npm docs 命令将能够找到您。

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/npm/cli.git"
  }
}
```

该 URL 应该是一个公开可用的（可能是只读的）URL，可以直接传递给 VCS 程序而无需任何修改。它不应该是您放入浏览器中的 html 项目页面的 URL。是给电脑用的。

对于 GitHub、GitHub gist、Bitbucket 或 GitLab 存储库，您可以使用与 npm 安装相同的快捷语法：

```json
{
  "repository": "npm/npm",
  "repository": "github:user/repo",
  "repository": "gist:11081aaa281",
  "repository": "bitbucket:user/repo",
  "repository": "gitlab:user/repo"
}
```

如果您的包的 package.json 不在根目录中（例如，如果它是 monorepo 的一部分），您可以指定它所在的目录：

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git",
    "directory": "packages/react-dom"
  }
}
```

## scripts

“scripts”属性是一个字典，其中包含在包生命周期中不同时间运行的脚本命令。键是生命周期事件，值是在该点运行的命令。

See [`scripts`](https://docs.npmjs.com/cli/v10/using-npm/scripts) to find out more about writing package scripts.

## config

“config”对象可用于设置在升级过程中持续存在的包脚本中使用的配置参数。例如，如果一个包具有以下内容：

```json
{
  "name": "foo",
  "config": {
    "port": "8080"
  }
}
```

它还可以有一个引用 npm_package_config_port 环境变量的“start”命令。

## dependencies

依赖关系在一个简单的对象中指定，该对象将包名称映射到版本范围。版本范围是一个字符串，具有一个或多个以空格分隔的描述符。还可以使用 tarball 或 git URL 来标识依赖关系。

请不要将测试工具或转译器或其他“开发”时间工具放入依赖项对象中。请参阅下面的 devDependency。

有关指定版本范围的更多详细信息，请参阅 semver。

* `version` Must match `version` exactly
* `>version` Must be greater than `version`
* `>=version` etc
* `<version`
* `<=version`
* `~version` "Approximately equivalent to version" See [semver](https://github.com/npm/node-semver#versions)
* `^version` "Compatible with version" See [semver](https://github.com/npm/node-semver#versions)
* `1.2.x` 1.2.0, 1.2.1, etc., but not 1.3.0
* `http://...` See 'URLs as Dependencies' below
* `*` Matches any version
* `""` (just an empty string) Same as `*`
* `version1 - version2` Same as `>=version1 <=version2`.
* `range1 || range2` Passes if either range1 or range2 are satisfied
* `git...` See 'Git URLs as Dependencies' below
* `user/repo` See 'GitHub URLs' below
* `tag` A specific version tagged and published as `tag` See [`npm dist-tag`](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)
* `path/path/path` See [Local Paths](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#local-paths) below

例如，这些都是有效的：

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl"
  }
}
```

###### URLs as Dependencies

您可以指定 tarball URL 来代替版本范围。

该 tarball 将在安装时下载并本地安装到您的软件包中。

###### Git URLs as Dependencies

Git url 的形式如下：

```
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
```

`<protocol>` is one of `git`, `git+ssh`, `git+http`, `git+https`, or `git+file`.

如果提供了#<commit-ish>，它将用于准确克隆该提交。如果 commit-ish 的格式为 #semver:<semver>，则 <semver> 可以是任何有效的 semver 范围或确切版本，npm 将在远程存储库中查找与该范围匹配的任何标签或引用，就像它一样注册表依赖项。如果 #<commit-ish> 或 #semver:<semver> 均未指定，则使用默认分支。

```
git+ssh://git@github.com:npm/cli.git#v1.0.27
git+ssh://git@github.com:npm/cli#semver:^5.0
git+https://isaacs@github.com/npm/cli.git
git://github.com/npm/cli.git#v1.0.27
```

从 git 存储库安装时，package.json 中某些字段的存在将导致 npm 认为它需要执行构建。为此，您的存储库将被克隆到一个临时目录中，安装其所有 deps，运行相关脚本，并打包和安装生成的目录。

如果您的 git 依赖项使用工作区，或者存在以下任何脚本，则会发生此流程：

* build
* prepare
* prepack
* preinstall
* install
* postinstall

如果您的 git 存储库包含预构建的工件，您可能需要确保未定义上述任何脚本，或者将为每次安装重新构建您的依赖项。

###### GitHub URLs

从版本 1.1.65 开始，您可以将 GitHub url 引用为“foo”：“user/foo-project”。就像 git URL 一样，可以包含 commit-ish 后缀。例如：

```json
{
  "name": "foo",
  "version": "0.0.0",
  "dependencies": {
    "express": "expressjs/express",
    "mocha": "mochajs/mocha#4727d357ea",
    "module": "user/repo#feature/branch"
  }
}
```

###### Local Paths

从版本 2.0.0 开始，您可以提供包含包的本地目录的路径。可以使用 npm install -S 或 npm install --save 保存本地路径，使用以下任意形式：

```
../foo/bar
~/foo/bar
./foo/bar
/foo/bar
```

在这种情况下，它们将被标准化为相对路径并添加到您的 package.json 中。例如：

```json
{
  "name": "baz",
  "dependencies": {
    "bar": "file:../foo/bar"
  }
}
```

此功能对于本地离线开发和创建需要 npm 安装（您不想访问外部服务器）的测试很有帮助，但在将包发布到公共注册表时不应使用。

注意：在这种情况下运行 npm install 时，由本地路径链接的包将不会安装自己的依赖项。您必须从本地路径本身运行 npm install。



## devDependencies

如果有人计划在他们的程序中下载和使用您的模块，那么他们可能不想或不需要下载和构建您使用的外部测试或文档框架。

在这种情况下，最好将这些附加项映射到 devDependency 对象中。

这些东西将在从包的根目录执行 npm link 或 npm install 时安装，并且可以像任何其他 npm 配置参数一样进行管理。有关该主题的更多信息，请参阅配置。

对于非特定于平台的构建步骤，例如将 CoffeeScript 或其他语言编译为 JavaScript，请使用准备脚本来执行此操作，并使所需的包成为 devDependency。

```json
{
  "name": "ethopia-waza",
  "description": "a delightfully fruity coffee varietal",
  "version": "1.2.3",
  "devDependencies": {
    "coffee-script": "~1.6.3"
  },
  "scripts": {
    "prepare": "coffee -o lib/ -c src/waza.coffee"
  },
  "main": "lib/waza.js"
}
```

准备脚本将在发布之前运行，以便用户可以使用该功能，而无需自己编译。在开发模式下（即本地运行 npm install），它也会运行此脚本，以便您可以轻松测试它。



## peerDependencies

在某些情况下，您想要表达包与主机工具或库的兼容性，但不一定需要该主机。这通常称为插件。值得注意的是，您的模块可能会公开主机文档预期和指定的特定接口。

```json
{
  "name": "tea-latte",
  "version": "1.3.5",
  "peerDependencies": {
    "tea": "2.x"
  }
}
```

这确保您的软件包 tea-latte 只能与主机软件包 tea 的第二个主要版本一起安装。 npm install tea-latte 可能会产生以下依赖关系图：

```
├── tea-latte@1.3.5
└── tea@2.2.0
```

在 npm 版本 3 到 6 中，peerDependency 不会自动安装，如果在树中发现对等依赖项的无效版本，则会发出警告。从 npm v7 开始，默认安装peerDependency。

如果无法正确解析树，尝试安装另一个具有冲突要求的插件可能会导致错误。因此，请确保您的插件要求尽可能广泛，而不是将其锁定到特定的补丁版本。

假设主机符合 semver，只有主机包的主要版本的更改才会破坏您的插件。因此，如果您使用过主机包的每个 1.x 版本，请使用“^1.0”或“1.x”来表达这一点。如果您依赖于 1.5.2 中引入的功能，请使用“^1.5.2”。



## peerDependenciesMeta

当用户安装您的包时，如果尚未安装在 peerDependency 中指定的包，npm 将发出警告。 peerDependencyMeta 字段用于向 npm 提供有关如何使用对等依赖项的更多信息。具体来说，它允许将对等依赖关系标记为可选。

```json
{
  "name": "tea-latte",
  "version": "1.3.5",
  "peerDependencies": {
    "tea": "2.x",
    "soy-milk": "1.2"
  },
  "peerDependenciesMeta": {
    "soy-milk": {
      "optional": true
    }
  }
}
```

将对等依赖项标记为可选可确保如果主机上未安装豆奶包，npm 不会发出警告。这允许您集成各种主机包并与之交互，而无需安装所有这些包。



## bundleDependencies

这定义了发布包时将捆绑的包名称数组。

如果您需要在本地保留 npm 包或通过单个文件下载获得它们，您可以通过在 bundleDependency 数组中指定包名称并执行 npm pack 将包捆绑在 tarball 文件中。

例如：

如果我们像这样定义一个package.json：

```json
{
  "name": "awesome-web-framework",
  "version": "1.0.0",
  "bundleDependencies": ["renderized", "super-streams"]
}
```

我们可以通过运行npm pack获得awesome-web-framework-1.0.0.tgz文件。该文件包含渲染和超级流的依赖项，可以通过执行 npm install Awesome-web-framework-1.0.0.tgz 将其安装在新项目中。请注意，包名称不包含任何版本，因为该信息是在依赖项中指定的。

如果这被拼写为“bundledDependency”，那么这也是受尊重的。

或者，“bundleDependency”可以定义为布尔值。 true 值将捆绑所有依赖项， false 值将不捆绑任何依赖项。



## optionalDependencies

如果可以使用依赖项，但您希望 npm 在无法找到或安装失败时继续进行，那么您可以将其放入 optionalDependencies 对象中。这是包名称到版本或 url 的映射，就像依赖项对象一样。不同之处在于构建失败不会导致安装失败。运行 npm install --omit=optional 将阻止安装这些依赖项。

处理依赖关系的缺乏仍然是您的程序的责任。例如，这样的事情：

```js
try {
  var foo = require("foo");
  var fooVersion = require("foo/package.json").version;
} catch (er) {
  foo = null;
}
if (notGoodFooVersion(fooVersion)) {
  foo = null;
}

// .. then later in your program ..

if (foo) {
  foo.doFooThings();
}
```

可选依赖项中的条目将覆盖依赖项中同名的条目，因此通常最好只放在一个位置。



## overrides

如果您需要对依赖项的依赖项进行特定更改，例如用已知的安全问题替换依赖项的版本，用分支替换现有依赖项，或者确保到处使用相同版本的包，那么您可以添加覆盖。

覆盖提供了一种用另一个版本或完全另一个包替换依赖树中的包的方法。这些变化的范围可以根据需要具体或模糊。

为了确保无论您的依赖项依赖哪个版本，软件包 foo 始终安装为版本 1.0.0：

```json
{
  "overrides": {
    "foo": "1.0.0"
  }
}
```

上面是一个简写符号，完整的对象形式可用于允许覆盖包本身以及包的子包。这将导致 foo 始终为 1.0.0，同时也使 foo 之外的任意深度的 bar 也为 1.0.0：

```json
{
  "overrides": {
    "foo": {
      ".": "1.0.0",
      "bar": "1.0.0"
    }
  }
}
```

仅当 foo 是包 bar 的子代（或孙子、或曾孙等）时，才将 foo 重写为 1.0.0：

```json
{
  "overrides": {
    "bar": {
      "foo": "1.0.0"
    }
  }
}
```

键可以嵌套为任意长度。仅当 foo 是 bar 的子级并且仅当 bar 是 baz 的子级时才覆盖 foo：

```json
{
  "overrides": {
    "baz": {
      "bar": {
        "foo": "1.0.0"
      }
    }
  }
}
```

覆盖的密钥还可以包括版本或版本范围。将 foo 覆盖为 1.0.0，但仅当它是 bar@2.0.0 的子级时：

```json
{
  "overrides": {
    "bar@2.0.0": {
      "foo": "1.0.0"
    }
  }
}
```

您不能为直接依赖的包设置覆盖，除非依赖项和覆盖本身共享完全相同的规范。为了使此限制更容易处理，还可以通过在您希望版本与 $ 匹配的包名称前添加前缀来将覆盖定义为对直接依赖项规范的引用。

```json
{
  "dependencies": {
    "foo": "^1.0.0"
  },
  "overrides": {
    // BAD, will throw an EOVERRIDE error
    // "foo": "^2.0.0"
    // GOOD, specs match so override is allowed
    // "foo": "^1.0.0"
    // BEST, the override is defined as a reference to the dependency
    "foo": "$foo",
    // the referenced package does not need to match the overridden one
    "bar": "$foo"
  }
}
```



## engines

您可以指定您的东西适用的node版本：

```json
{
  "engines": {
    "node": ">=0.10.3 <15"
  }
}
```

而且，与依赖项一样，如果您不指定版本（或者指定“*”作为版本），则任何版本的节点都可以。

您还可以使用“引擎”字段来指定哪些版本的 npm 能够正确安装您的程序。例如：

```json
{
  "engines": {
    "npm": "~1.0.20"
  }
}
```

除非用户设置了 engine-strict 配置标志，否则此字段仅供参考，并且仅在您的软件包作为依赖项安装时才会产生警告。



## OS

您可以指定您的模块将在哪些操作系统上运行：

```json
{
  "os": ["darwin", "linux"]
}
```

您还可以阻止而不是允许操作系统，只需在被阻止的操作系统前面加上“！”：

```json
{
  "os": ["!win32"]
}
```

主机操作系统由process.platform决定

允许阻止和允许某个项目，尽管没有任何充分的理由这样做。



## CPU

如果您的代码仅在某些 cpu 架构上运行，您可以指定哪些架构。

```json
{
  "cpu": ["x64", "ia32"]
}
```

与 os 选项一样，您也可以阻止架构：

```json
{
  "cpu": ["!arm", "!mips"]
}
```

主机架构由process.arch决定



## private

如果你在 package.json 中设置了 "private": true ，那么 npm 将拒绝发布它。

这是防止意外发布私人存储库的一种方法。如果您想确保给定的包仅发布到特定注册表（例如内部注册表），请使用下面描述的publishConfig字典在发布时覆盖注册表配置参数。



## publishConfig

这是一组将在发布时使用的配置值。如果您想要设置标签、注册表或访问权限，那么它特别方便，这样您就可以确保给定的包没有被标记为“最新”、发布到全局公共注册表或默认情况下范围模块是私有的。

See [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) to see the list of config options that can be overridden.



## workspaces

The optional `workspaces` field is an array of file patterns that describes locations within the local file system that the install client should look up to find each [workspace](https://docs.npmjs.com/cli/v10/using-npm/workspaces) that needs to be symlinked to the top level `node_modules` folder.

可选的工作空间字段是一个文件模式数组，它描述了安装客户端应查找的本地文件系统中的位置，以找到需要符号链接到顶级 node_modules 文件夹的每个工作空间。

它可以描述用作工作区的文件夹的直接路径，也可以定义将解析为这些相同文件夹的全局变量。

在以下示例中，位于文件夹 ./packages 内的所有文件夹只要其中包含有效的 package.json 文件，都将被视为工作区：

```json
{
  "name": "workspace-example",
  "workspaces": ["./packages/*"]
}
```

See [`workspaces`](https://docs.npmjs.com/cli/v10/using-npm/workspaces) for more examples.



## DEFAULT VALUES

npm 将根据包内容默认一些值。

* "scripts": {"start": "node server.js"}

  如果包的根目录中有 server.js 文件，则 npm 将默认启动命令为 node server.js。

* "scripts":{"install": "node-gyp rebuild"}

  如果你的包的根目录中有一个 binding.gyp 文件，并且你没有定义安装或预安装脚本，npm 将默认安装命令使用 node-gyp 进行编译。

* "contributors": [...]

  如果你的包的根目录中有 AUTHORS 文件，npm 会将每一行视为 Name <email> (url) 格式，其中 email 和 url 是可选的。以 # 开头或空白的行将被忽略。

