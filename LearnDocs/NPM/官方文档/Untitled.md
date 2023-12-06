https://docs.npmjs.com/





## Folders

npm 将各种东西放在你的计算机上。这就是它的工作。

* 本地安装（默认）：将内容放入当前包根目录的 ./node_modules 中。
* 全局安装（使用 -g）：将内容放入 /usr/local 或安装节点的任何位置。
* 如果您需要 require() 它，请在本地安装它。
* 如果要在命令行上运行它，请全局安装它。
* 如果您需要两者，则将其安装在两个位置，或使用 npm 链接。



#### prefix Configuration

前缀配置默认为安装节点的位置。在大多数系统上，这是 /usr/local。在 Windows 上，它是 %AppData%\npm。在 Unix 系统上，它是上一级，因为节点通常安装在 {prefix}/bin/node 而不是 {prefix}/node.exe。

设置全局标志后，npm 会将内容安装到此前缀中。如果未设置，它将使用当前包的根目录，或者当前工作目录（如果不在包中）。



#### Node Modules

包将被放入前缀下的 node_modules 文件夹中。在本地安装时，这意味着您可以 require("packagename") 加载其主模块，或 require("packagename/lib/path/to/sub/module") 加载其他模块。

Unix 系统上的全局安装转到 {prefix}/lib/node_modules。 Windows 上的全局安装转到 {prefix}/node_modules（即没有 lib 文件夹。）

作用域包的安装方式相同，只不过它们被分组到相关 node_modules 文件夹的子文件夹中，并以 @ 符号为该作用域前缀的名称，例如npm install @myorg/package 会将包放置在 {prefix}/node_modules/@myorg/package 中。请参阅范围了解更多详细信息。

如果您希望 require() 一个包，请在本地安装它。



#### Executables

在全局模式下，可执行文件在 Unix 上链接到 {prefix}/bin，在 Windows 上直接链接到 {prefix}。确保该路径位于终端的 PATH 环境中才能运行它们。

在本地模式下，可执行文件会链接到 ./node_modules/.bin 中，以便通过 npm 运行的脚本可以使用它们。 （例如，当您运行 npm test 时，测试运行程序将位于路径中。）



## .npmrc

npm 从命令行、环境变量和 npmrc 文件获取其配置设置。

npm config 命令可用于更新和编辑用户和全局 npmrc 文件的内容。



#### Files

四个相关文件是：

* 每个项目的配置文件（/path/to/my/project/.npmrc）
* 每个用户的配置文件 (~/.npmrc)
* 全局配置文件（$PREFIX/etc/npmrc）
* npm 内置配置文件 (/path/to/npm/npmrc)

所有 npm 配置文件都是 ini 格式的 key = value 参数列表。可以使用 ${VARIABLE_NAME} 替换环境变量。例如：

```ini
prefix = ${HOME}/.npm-packages
```

每个文件都会被加载，并且配置选项会按优先级顺序解析。例如，用户配置文件中的设置将覆盖全局配置文件中的设置。

数组值通过在键名称后添加“[]”来指定。例如：

```bash
key[] = "first value"
key[] = "second value"
```



###### Comments

.npmrc 文件中的行以 ; 开头时被解释为注释。或 # 字符。 .npmrc 文件由 npm/ini 解析，它指定了此注释语法。

```ini
# last modified: 01 Jan 2016
; Set a new registry for a scoped package
@myscope:registry=https://mycustomregistry.example.org
```



###### Per-project config file

当在项目中本地工作时，项目根目录中的 .npmrc 文件（即，node_modules 和 package.json 的同级文件）将设置特定于该项目的配置值。

请注意，这仅适用于您运行 npm 的项目的根目录。当您的模块发布时，它不会产生任何影响。例如，您不能发布强制自身安装在全局或不同位置的模块。

此外，在全局模式下不会读取此文件，例如运行 npm install -g 时。

###### Per-user config file

$HOME/.npmrc （或用户配置参数，如果在环境或命令行中设置）

###### Global config file

$PREFIX/etc/npmrc （或全局配置参数，如果在上面设置）：此文件是 ini 文件格式的 key = value 参数列表。环境变量可以如上替换。

###### Built-in config file

path/to/npm/itself/npmrc

这是一个不可更改的“内置”配置文件，npm 在更新中保持一致。使用 npm 附带的 ./configure 脚本在此处设置字段。这主要是为了让发行版维护人员以标准且一致的方式覆盖默认配置。



#### Auth related configuration

The settings `_auth`, `_authToken`, `username` and `_password` must all be scoped to a specific registry. This ensures that `npm` will never send credentials to the wrong host.设置 _auth、_authToken、用户名和 _password 必须全部限定在特定注册表范围内。这可确保 npm 永远不会将凭据发送到错误的主机。

完整列表是：

* `_auth` (base64 authentication string)
* `_authToken` (authentication token)
* username
* _password
* email
* `certfile` (path to certificate file)
* `keyfile` (path to key file)

为了确定这些值的范围，它们必须以 URI 片段为前缀。如果凭证适用于对单个主机上的注册表的任何请求，则范围可能类似于 //registry.npmjs.org/:。如果必须将其范围限定为主机上的特定路径，则也可以提供该路径，例如 //my-custom-registry.org/unique/path:。

```ini
; bad config
_authToken=MYTOKEN

; good config
@myorg:registry=https://somewhere-else.com/myorg
@another:registry=https://somewhere-else.com/another
//registry.npmjs.org/:_authToken=MYTOKEN
; would apply to both @myorg and @another
; //somewhere-else.com/:_authToken=MYTOKEN
; would apply only to @myorg
//somewhere-else.com/myorg/:_authToken=MYTOKEN1
; would apply only to @another
//somewhere-else.com/another/:_authToken=MYTOKEN2
```



## npm-shrinkwrap.json

npm-shrinkwrap.json 是由 npm Shrinkwrap 创建的文件。它与 package-lock.json 相同，但有一个主要警告：与 package-lock.json 不同，发布包时可能会包含 npm-shrinkwrap.json。

npm-shrinkwrap.json 的推荐用例是通过注册表上的发布过程部署的应用程序：例如，用作全局安装或 devDependency 的守护程序和命令行工具。强烈建议库作者发布此文件，因为这会阻止最终用户控制传递依赖项更新。

如果 package-lock.json 和 npm-shrinkwrap.json 都存在于包根目录中，则 npm-shrinkwrap.json 将优先于 package-lock.json 文件。

有关 npm-shrinkwrap.json 文件格式的完整详细信息和说明，请参阅 package-lock.json 的手册页。



## package.json

本文档是您需要了解的有关 package.json 文件中所需内容的全部内容。它必须是实际的 JSON，而不仅仅是 JavaScript 对象文字。

本文档中描述的许多行为都受到 config.xml 中描述的配置设置的影响。