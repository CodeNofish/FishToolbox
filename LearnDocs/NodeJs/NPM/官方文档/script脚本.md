https://docs.npmjs.com/cli/v10/using-npm/scripts

[TOC]

# Scripts

package.json 文件的“scripts”属性支持许多内置脚本及其预设生命周期事件以及任意脚本。这些都可以通过运行 npm run-script <stage> 或简称 npm run <stage> 来执行。具有匹配名称的前置和后置命令也将为这些命令运行（例如 premyscript、myscript、postmyscript）。依赖项中的脚本可以使用 npm explore <pkg> -- npm run <stage> 运行。

## Pre & Post Scripts

要为 package.json 的“scripts”部分中定义的任何脚本创建“pre”或“post”脚本，只需创建另一个具有匹配名称的脚本并将“pre”或“post”添加到它们的开头即可。

```json
{
  "scripts": {
    "precompress": "{{ executes BEFORE the `compress` script }}",
    "compress": "{{ run command to compress files }}",
    "postcompress": "{{ executes AFTER `compress` script }}"
  }
}
```

在此示例中， npm run compress 将按所述执行这些脚本。

## Life Cycle Scripts

有一些特殊的生命周期脚本仅在某些情况下发生。这些脚本是在 pre<event>、post<event> 和 <event> 脚本之外发生的。

* prepare, prepublish, prepublishOnly, prepack, postpack, dependencies

**prepare**

* 在打包包之前运行，即在 npmpublish 和 npmpack 期间运行
* 在本地 npm install 上运行，无需任何参数
* 仅在预发布之后、预发布之前运行
* 注意：如果通过 git 安装的包包含准备脚本，则在打包和安装包之前，将安装其依赖项和 devDependency，并运行准备脚本。
* 从 npm@7 开始，这些脚本在后台运行。要查看输出，请运行：--foreground-scripts。

**prepublish** (DEPRECATED)

**prepublishOnly **

* 在准备和打包包之前运行，仅在 npm publish 上运行。

**prepack**

* 在打包 tarball 之前运行（在“npm pack”、“npm publish”上以及安装 git 依赖项时）。
* 注意：“npm run pack”与“npm pack”不同。 “npm run pack”是任意用户定义的脚本名称，其中“npm pack”是 CLI 定义的命令。

**postpack**

* 在生成 tarball 之后但在将其移动到最终目的地之前运行（如果有的话，发布不会在本地保存 tarball）

**dependencies**

* 如果发生更改，则在修改 node_modules 目录的任何操作之后运行。
* 不在全局模式下运行



#### Prepare and Prepublish 准备和预发布

###### Use Cases

如果您需要在使用包之前以不依赖于目标系统的操作系统或体系结构的方式对其执行操作，请使用预发布脚本。这包括以下任务：

* 将 CoffeeScript 源代码编译为 JavaScript。
* 创建 JavaScript 源代码的精简版本。
* 获取您的包将使用的远程资源。

在预发布时执行这些操作的优点是，它们可以在单个位置执行一次，从而降低复杂性和可变性。此外，这意味着：

* 您可以将咖啡脚本作为 devDependency 依赖，因此您的用户不需要安装它。
* 您不需要在包中包含缩小器，从而为用户减小大小。
* 您不需要依赖用户在目标计算机上拥有curl 或wget 或其他系统工具。

#### Dependencies

每当 npm 命令导致 node_modules 目录发生更改时，都会运行依赖项脚本。它在应用更改并更新 package.json 和 package-lock.json 文件后运行。



## Life Cycle Operation Order

#### npm cache add

* prepare

#### npm ci

* preinstall
* install
* postinstall
* prepublish
* preprepare
* prepare
* postprepare

这些都是在将模块实际安装到node_modules之后按顺序运行的，中间没有发生任何内部操作

#### npm diff

* prepare

#### npm install

当您运行 npm install -g <pkg-name> 时，它们也会运行

* preinstall
* install
* postinstall
* prepublish
* preprepare
* prepare
* postprepare

如果你的包的根目录中有一个 binding.gyp 文件，并且你没有定义自己的安装或预安装脚本，npm 将默认安装命令通过 node-gyp 重建使用 node-gyp 进行编译

这些是从 <pkg-name> 的脚本运行的

### npm pack

* prepack
* prepare
* postpack

// TODO



## User

当 npm 以 root 身份运行时，脚本始终使用工作目录所有者的有效 uid 和 gid 运行。



## Environment

包脚本在一个环境中运行，其中提供了有关 npm 设置和进程当前状态的许多信息。

#### path

如果您依赖于定义可执行脚本的模块（例如测试套件），那么这些可执行文件将被添加到用于执行脚本的路径中。所以，如果你的 package.json 有这个：

```json
{
  "name": "foo",
  "dependencies": {
    "bar": "0.1.x"
  },
  "scripts": {
    "start": "bar ./test"
  }
}
```

然后你可以运行 npm start 来执行 bar 脚本，该脚本将导出到 npm install 上的 node_modules/.bin 目录中。

#### package.json vars

package.json 字段附加到 npm_package_ 前缀上。因此，例如，如果您的 package.json 文件中有 {"name":"foo", "version":"1.2.5"} ，那么您的包脚本会将 npm_package_name 环境变量设置为“foo”，并将 npm_package_version 设置为“1.2.5”。您可以使用 process.env.npm_package_name 和 process.env.npm_package_version 访问代码中的这些变量，对于其他字段，依此类推。

#### current lifecycle event

最后，npm_lifecycle_event 环境变量设置为正在执行的循环的哪个阶段。因此，您可以将单个脚本用于流程的不同部分，该脚本根据当前发生的情况进行切换。

对象按照这种格式进行扁平化，因此如果您的 package.json 中有 {"scripts":{"install":"foo.js"}} ，那么您会在脚本中看到以下内容：

```js
process.env.npm_package_scripts_install === "foo.js"
```



## Examples

例如，如果您的 package.json 包含以下内容：

```json
{
  "scripts": {
    "install": "scripts/install.js",
    "postinstall": "scripts/install.js",
    "uninstall": "scripts/uninstall.js"
  }
}
```

然后在生命周期的安装和安装后阶段将调用scripts/install.js，在卸载包时将调用scripts/uninstall.js。由于 script/install.js 运行两个不同的阶段，因此在这种情况下查看 npm_lifecycle_event 环境变量是明智的。

如果你想运行 make 命令，你可以这样做。这工作得很好：

```json
{
  "scripts": {
    "preinstall": "./configure",
    "install": "make && make install",
    "test": "make test"
  }
}
```



## Exiting

通过将该行作为脚本参数传递给 sh 来运行脚本。

如果脚本以 0 以外的代码退出，那么这将中止该进程。

请注意，这些脚本文件不必是 Node.js 甚至 JavaScript 程序。它们只需是某种可执行文件即可。



## Best Practices

* Don't exit with a non-zero error code unless you *really* mean it. Except for uninstall scripts, this will cause the npm action to fail, and potentially be rolled back. If the failure is minor or only will prevent some optional features, then it's better to just print a warning and exit successfully.

  除非您确实这么想，否则不要以非零错误代码退出。除了卸载脚本之外，这将导致 npm 操作失败，并可能被回滚。如果故障很小或者只会阻止某些可选功能，那么最好只打印一条警告并成功退出。

* Try not to use scripts to do what npm can do for you. Read through [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) to see all the things that you can specify and enable by simply describing your package appropriately. In general, this will lead to a more robust and consistent state.

  尽量不要使用脚本来做 npm 能为你做的事情。通读 package.json 以了解您可以通过简单地适当描述您的包来指定和启用的所有内容。一般来说，这将导致更稳健和一致的状态。

* Inspect the env to determine where to put things. For instance, if the `npm_config_binroot` environment variable is set to `/home/user/bin`, then don't try to install executables into `/usr/local/bin`. The user probably set it up that way for a reason.

  检查环境以确定将东西放在哪里。例如，如果 npm_config_binroot 环境变量设置为 /home/user/bin，则不要尝试将可执行文件安装到 /usr/local/bin 中。用户这样设置可能是有原因的。

* Don't prefix your script commands with "sudo". If root permissions are required for some reason, then it'll fail with that error, and the user will sudo the npm command in question.

  不要在脚本命令前加上“sudo”前缀。如果由于某种原因需要 root 权限，那么它将因该错误而失败，并且用户将 sudo 相关的 npm 命令。

* Don't use install. Use a .gyp file for compilation, and prepare for anything else. You should almost never have to explicitly set a preinstall or install script. If you are doing this, please consider if there is another option. The only valid use of install or preinstall scripts is for compilation which must be done on the target architecture.

  不要使用安装。使用 .gyp 文件进行编译，并为其他事情做好准备。您几乎不需要显式设置预安装或安装脚本。如果您正在这样做，请考虑是否还有其他选择。安装或预安装脚本的唯一有效用途是编译，必须在目标体系结构上完成。

* Scripts are run from the root of the package folder, regardless of what the current working directory is when `npm` is invoked. If you want your script to use different behavior based on what subdirectory you're in, you can use the `INIT_CWD` environment variable, which holds the full path you were in when you ran `npm run`.

  脚本从包文件夹的根目录运行，无论调用 npm 时当前工作目录是什么。如果您希望脚本根据您所在的子目录使用不同的行为，您可以使用 INIT_CWD 环境变量，该变量保存您运行 npm run 时所在的完整路径。