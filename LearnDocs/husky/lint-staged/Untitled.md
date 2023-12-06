https://github.com/lint-staged/lint-staged

针对暂存的 git 文件运行 linter，不要让 💩 溜进您的代码库！

```cmd
npm install --save-dev lint-staged # requires further setup
```

```
$ git commit

✔ Preparing lint-staged...
❯ Running tasks for staged files...
  ❯ packages/frontend/.lintstagedrc.json — 1 file
    ↓ *.js — no files [SKIPPED]
    ❯ *.{json,md} — 1 file
      ⠹ prettier --write
  ↓ packages/backend/.lintstagedrc.json — 2 files
    ❯ *.js — 2 files
      ⠼ eslint --fix
    ↓ *.{json,md} — no files [SKIPPED]
◼ Applying modifications from tasks...
◼ Cleaning up temporary files...
```



## Why

在提交代码之前运行 Linting 更有意义。通过这样做，您可以确保没有错误进入存储库并强制执行代码风格。但在整个项目上运行 lint 过程的速度很慢，而且 lint 结果可能无关紧要。最终您只想检查将要提交的文件。

该项目包含一个脚本，该脚本将运行任意 shell 任务，并以暂存文件列表作为参数，并按指定的 glob 模式进行过滤。



## Installation and setup

要按照推荐的方式安装 lint-staged，您需要：

1. 安装 lint-staged 本身：`npm install --save-dev lint-staged`

2. Set up the `pre-commit` git hook to run *lint-staged*

   设置预提交 git hook 以运行 lint-staged

   Husky 是配置 git hooks 的流行选择

3. 安装一些 linter，例如 ESLint 或 Prettier

4. 配置 lint-staged 来运行 linter 和其他任务：

   例如：` { "*.js": "eslint" }` 为所有暂存的 JS 文件运行 ESLint

   See [Configuration](https://github.com/lint-staged/lint-staged#configuration) for more info

不要忘记提交对 package.json 和 .husky 的更改，以便与您的团队共享此设置！

现在更改一些文件， git add 或 git add --patch 将其中一些文件添加到您的提交中，然后尝试 git commit 它们。

See [examples](https://github.com/lint-staged/lint-staged#examples) and [configuration](https://github.com/lint-staged/lint-staged#configuration) for more information.



## Command line flags

```
❯ npx lint-staged --help
Usage: lint-staged [options]

Options:
  -V, --version                      output the version number
  --allow-empty                      allow empty commits when tasks revert all staged changes (default: false)
  -p, --concurrent <number|boolean>  the number of tasks to run concurrently, or false for serial (default: true)
  -c, --config [path]                path to configuration file, or - to read from stdin
  --cwd [path]                       run all tasks in specific directory, instead of the current
  -d, --debug                        print additional debug information (default: false)
  --diff [string]                    override the default "--staged" flag of "git diff" to get list of files. Implies
                                     "--no-stash".
  --diff-filter [string]             override the default "--diff-filter=ACMR" flag of "git diff" to get list of files
  --max-arg-length [number]          maximum length of the command-line argument string (default: 0)
  --no-stash                         disable the backup stash, and do not revert in case of errors. Implies
                                     "--no-hide-partially-staged".
  --no-hide-partially-staged         disable hiding unstaged changes from partially staged files
  -q, --quiet                        disable lint-staged’s own console output (default: false)
  -r, --relative                     pass relative filepaths to tasks (default: false)
  -x, --shell [path]                 skip parsing of tasks for better shell support (default: false)
  -v, --verbose                      show task output even when tasks succeed; by default only failed output is shown
                                     (default: false)
  -h, --help                         display help for command
```

* --allow-empty：默认情况下，当 linter 任务撤消所有暂存更改时，lint-staged 将出现错误并中止提交。使用此标志允许创建空 git 提交。

* --concurrent [number|boolean]：控制 lint-staged 运行的任务的并发性。注意：这不会影响子任务的并发性（它们将始终按顺序运行）。可能的值为：

  * false：串行运行所有任务
  * true（默认）：无限并发。并行运行尽可能多的任务。
  * {number}：并行运行指定数量的任务，其中 1 相当于 false。

* --config [path]：手动指定配置文件或 npm 包名称的路径。注意：使用时，lint-staged 不会执行配置文件搜索，如果找不到指定的文件，会打印错误。如果提供“-”作为文件名，则将从标准输入读取配置，从而允许在配置中进行管道传输，如 `cat my-config.json | npx lint-staged --config -`.

* --cwd [path]：默认情况下任务在当前工作目录中运行。使用 --cwd some/directory 来覆盖它。该路径可以是绝对路径，也可以是相对于当前工作目录的路径。

* --debug：以调试模式运行。设置后，它会执行以下操作：

  * uses [debug](https://github.com/visionmedia/debug) internally to log additional information about staged files, commands being executed, location of binaries, etc. Debug logs, which are automatically enabled by passing the flag, can also be enabled by setting the environment variable `$DEBUG` to `lint-staged*`.

    在内部使用 debug 来记录有关暂存文件、正在执行的命令、二进制文件位置等的附加信息。调试日志通过传递标志自动启用，也可以通过将环境变量 $DEBUG 设置为 lint-staged* 来启用。

  * uses [`verbose` renderer](https://listr2.kilic.dev/renderers/verbose-renderer/) for `listr2`; this causes serial, uncoloured output to the terminal, instead of the default (beautified, dynamic) output. (the [`verbose` renderer](https://listr2.kilic.dev/renderers/verbose-renderer/) can also be activated by setting the `TERM=dumb` or `NODE_ENV=test` environment variables)

    对 listr2 使用详细渲染器；这会导致串行、无色的输出到终端，而不是默认的（美化的、动态的）输出。 （也可以通过设置 TERM=dumb 或 NODE_ENV=test 环境变量来激活详细渲染器）

* --diff：默认情况下，linter 会针对 git 中暂存的所有文件进行过滤，这些文件是从 git diff --staged 生成的。此选项允许您使用任意修订来覆盖 --staged 标志。例如，要获取两个分支之间已更改文件的列表，请使用 --diff="branch1...branch2"。您还可以阅读有关 git diff 和 gitrevisions 的更多信息。此选项还意味着 --no-stash。

* --diff-filter：默认情况下仅包含添加、复制、修改或重命名的文件。使用此标志可以用其他内容覆盖默认 ACMR 值：添加 (A)、复制 (C)、删除 (D)、修改 (M)、重命名 (R)、类型更改 (T)、未合并 (U)、未知(X)，或配对损坏 (B)。另请参阅 --diff-filter 的 git diff 文档。

* --max-arg-length：当检测到当前 shell 无法处理长命令（很多文件）时，会自动将其分割成多个块。使用此标志可以覆盖生成的命令字符串的最大长度。

* --no-stash：默认情况下，在运行任务之前将创建备份存储，并且在发生错误时将恢复所有任务修改。此选项将禁用创建存储，而是在中止提交时将所有修改保留在索引中。可以使用 --stash 重新启用。此选项还意味着 --no-hide-partially-staged。

* --no-hide-partially-staged：默认情况下，将隐藏部分暂存文件的未暂存更改。此选项将禁用此行为并包含部分暂存文件中的所有未暂存更改。可以使用 --hide-partially-staged 重新启用

* --quiet：禁止所有 CLI 输出，任务除外。

* --relative：将相对于 process.cwd() （lint-staged 运行的位置）的文件路径传递给任务。默认为 false。

* --shell：默认情况下，将解析 linter 命令以提高速度和安全性。这会产生副作用，即常规 shell 脚本可能无法按预期工作。您可以使用此选项跳过命令解析。要使用特定的 shell，请使用类似 --shell "/bin/bash" 的路径。

* --verbose：即使任务成功也显示任务输出。默认情况下仅显示失败的输出。



## Configuration

Lint-staged 可以通过多种方式进行配置：

* package.json 或 package.yaml 中的 lint-staged 对象
* JSON 或 YML 格式的 .lintstagedrc 文件，或者您可以明确使用文件扩展名：
  * .lintstagedrc.json
  * .lintstagedrc.yaml
  * .lintstagedrc.yml
* ESM 格式的 .lintstagedrc.mjs 或 lint-staged.config.mjs 文件
  * 默认导出值应该是一个配置：export default { ... }
* CommonJS 格式的 .lintstagedrc.cjs 或 lint-staged.config.cjs 文件
  * 导出值应该是一个配置： module.exports = { ... }
* ESM 或 CommonJS 格式的 lint-staged.config.js 或 .lintstagedrc.js，具体取决于项目的 package.json 是否包含 "type": "module" 选项。
* 使用 --config 或 -c 标志传递配置文件

Configuration should be an object where each value is a command to run and its key is a glob pattern to use for this command. This package uses [micromatch](https://github.com/micromatch/micromatch) for glob patterns. JavaScript files can also export advanced configuration as a function. See [Using JS configuration files](https://github.com/lint-staged/lint-staged#using-js-configuration-files) for more info.

配置应该是一个对象，其中每个值都是要运行的命令，其键是用于该命令的全局模式。该包使用 micromatch 来表示 glob 模式。 JavaScript 文件还可以将高级配置导出为函数。有关详细信息，请参阅使用 JS 配置文件。

You can also place multiple configuration files in different directories inside a project. For a given staged file, the closest configuration file will always be used. See ["How to use `lint-staged` in a multi-package monorepo?"](https://github.com/lint-staged/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo) for more info and an example.

您还可以将多个配置文件放置在项目内的不同目录中。对于给定的暂存文件，将始终使用最接近的配置文件。请参阅“如何在多包 monorepo 中使用 lint-staged？”了解更多信息和示例。

**`package.json` example**

```json
{
  "lint-staged": {
    "*": "your-cmd"
  }
}
```

**`.lintstagedrc` example**

```
{
  "*": "your-cmd"
}
```

此配置将使用作为参数传递的当前暂存文件列表来执行 your-cmd 。

因此，考虑到您执行了 git add file1.ext file2.ext，lint-staged 将运行以下命令：

`your-cmd file1.ext file2.ext`

#### Task concurrency

默认情况下，lint-staged 将同时运行配置的任务。这意味着对于每个 glob，所有命令都将同时启动。通过以下配置，eslint 和 prettier 将同时运行：

```json
{
  "*.ts": "eslint",
  "*.md": "prettier --list-different"
}
```

这通常不是问题，因为 glob 不重叠，并且命令不会更改文件，而仅报告可能的错误（中止 git 提交）。如果要对同一组文件运行多个命令，可以使用数组语法来确保命令按顺序运行。在以下示例中，prettier 将为两个 glob 运行，此外 eslint 还将为其后面的 *.ts 文件运行。两组命令（对于每个 glob）仍然同时启动（但不重叠）。

```json
{
  "*.ts": ["prettier --list-different", "eslint"],
  "*.md": "prettier --list-different"
}
```

当配置的 glob 重叠以及任务对文件进行编辑时要格外注意。例如，在此配置中 prettier 和 eslint 可能会尝试同时更改同一个 *.ts 文件，从而导致竞争条件：

```json
{
  "*": "prettier --write",
  "*.ts": "eslint --fix"
}
```

如有必要，您可以使用 --concurrent <number> 限制并发性，或使用 --concurrent false 完全禁用它。



#### Filtering files

Linter 命令适用于由 glob 模式定义的所有暂存文件的子集。 lint-staged 使用 micromatch 来匹配具有以下规则的文件：

* 如果 glob 模式不包含斜杠 (/)，则将启用 micromatch 的 matchBase 选项，因此无论目录如何，glob 都会匹配文件的基本名称：
  * `*.js`将匹配所有 JS 文件，例如 /test.js 和 /foo/bar/test.js
  * `!(*test).js`将匹配所有 JS 文件，除了那些以 test.js 结尾的文件，因此 foo.js 而不是 foo.test.js
* 如果 glob 模式确实包含斜杠 (/)，它也将匹配路径：
  * `./*.js`将匹配 git repo 根目录中的所有 JS 文件，因此 /test.js 但不匹配 /foo/bar/test.js
  * `foo/**/*.js` 将匹配 /foo 目录中的所有 JS 文件，因此 /foo/bar/test.js 但不匹配 /test.js

匹配时，lint-staged 会执行以下操作

* 自动解析git root，无需配置。
* 选择项目目录中存在的暂存文件。
* 使用指定的全局模式过滤它们。
* 将绝对路径作为参数传递给 linter。

注意：lint-staged 会将绝对路径传递给 linter，以避免在不同的工作目录中执行时出现任何混淆（即，当您的 .git 目录与 package.json 目录不同时）。

Also see [How to use `lint-staged` in a multi-package monorepo?](https://github.com/lint-staged/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo)



#### Ignoring file

lint-staged 的概念是在 git 中暂存的文件上运行配置的 linter 任务（或其他任务）。 lint-staged 始终将所有暂存文件的列表传递给任务，并忽略应在任务本身中配置的任何文件。

考虑一个使用 prettier 来保持所有文件的代码格式一致的项目。该项目还将缩小的第 3 方供应商库存储在供应商/目录中。为了防止 prettier 在这些文件上抛出错误，应将供应商目录添加到 prettier 的忽略配置（.prettierignore 文件）中。运行 npx prettier 。将忽略整个供应商目录，不会抛出任何错误。当 lint-staged 添加到项目并配置为运行 prettier 时，供应商目录中的所有修改和暂存文件都将被 prettier 忽略，即使它接收它们作为输入。

在高级场景中，无法将 linter 任务本身配置为忽略文件，但 lint-staged 仍应忽略某些暂存文件，可以使用函数语法在将文件路径传递给任务之前对其进行过滤。请参阅示例：忽略匹配中的文件。



#### What commands are supported?

支持通过 npm 本地或全局安装的任何可执行文件以及 $PATH 中的任何可执行文件。

> 不鼓励使用全局安装的脚本，因为 lint-staged 可能不适用于未安装它的人。

lint-staged 使用 execa 来定位本地安装的脚本。所以在你的 .lintstagedrc 中你可以写：

```json
{
  "*.js": "eslint --fix"
}
```

将参数传递给命令，并用空格分隔，就像在 shell 中一样。请参阅下面的示例。



#### Running multiple commands in a sequence

您可以在每个 glob 上按顺序运行多个命令。为此，请传递一组命令而不是单个命令。这对于运行 eslint --fix 或 stylefmt 等自动格式化工具很有用，但可用于任何任意序列。

```json
{
  "*.js": ["eslint", "prettier --write"]
}
```

将执行 eslint，如果它以 0 代码退出，它将在所有暂存的 *.js 文件上执行 prettier --write 。



#### Using JS configuration files

用 JavaScript 编写配置文件是配置 lint-staged 的最强大方法（lint-staged.config.js，类似，或通过 --config 传递）。从配置文件中，您可以导出单个函数或对象。

如果导出值是一个函数，它将接收所有暂存文件名的数组。然后，您可以为文件构建自己的匹配器并返回命令字符串或命令字符串数组。这些字符串被认为是完整的，并且如果需要的话应该包括文件名参数。

如果导出值是一个对象，则其键应该是全局匹配的（就像普通的非 js 配置格式一样）。这些值可以是正常配置中的值，也可以是如上所述的单独函数中的值。导出对象中的函数不会接收所有匹配的文件，而是仅接收与相应的 glob key 匹配的暂存文件。



## 示例

###### **示例：导出函数来构建您自己的匹配器**

```js
// lint-staged.config.js
import micromatch from 'micromatch'

export default (allStagedFiles) => {
  const shFiles = micromatch(allStagedFiles, ['**/src/**/*.sh'])
  if (shFiles.length) {
    return `printf '%s\n' "Script files aren't allowed in src directory" >&2`
  }
  const codeFiles = micromatch(allStagedFiles, ['**/*.js', '**/*.ts'])
  const docFiles = micromatch(allStagedFiles, ['**/*.md'])
  return [`eslint ${codeFiles.join(' ')}`, `mdl ${docFiles.join(' ')}`]
}
```



###### 示例：将文件名括在单引号中并每个文件运行一次

```js
// .lintstagedrc.js
export default {
  '**/*.js?(x)': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
}
```



###### 示例：对 TypeScript 文件的更改运行 tsc，但不传递任何文件名参数

```js
// lint-staged.config.js
export default {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
}
```



###### 示例：如果暂存文件超过 10 个，则在整个存储库上运行 ESLint

```js
// .lintstagedrc.js
export default {
  '**/*.js?(x)': (filenames) =>
    filenames.length > 10 ? 'eslint .' : `eslint ${filenames.join(' ')}`,
}
```



###### 示例：使用您自己的 glob

It's better to use the [function-based configuration (seen above)](https://github.com/okonet/lint-staged#example-export-a-function-to-build-your-own-matchers), if your use case is this.如果您的用例是这样的话，最好使用基于函数的配置（见上文）。

```js
// lint-staged.config.js
import micromatch from 'micromatch'

export default {
  '*': (allFiles) => {
    const codeFiles = micromatch(allFiles, ['**/*.js', '**/*.ts'])
    const docFiles = micromatch(allFiles, ['**/*.md'])
    return [`eslint ${codeFiles.join(' ')}`, `mdl ${docFiles.join(' ')}`]
  },
}
```



###### 示例：忽略匹配的文件

如果由于某种原因你想忽略全局匹配中的文件，你可以使用 micromatch.not()：

```js
// lint-staged.config.js
import micromatch from 'micromatch'

export default {
  '*.js': (files) => {
    // from `files` filter those _NOT_ matching `*test.js`
    const match = micromatch.not(files, '*test.js')
    return `eslint ${match.join(' ')}`
  },
}
```

请注意，在大多数情况下，glob 可以达到相同的效果。对于上面的示例，匹配的 glob 将为 !(*test).js。



###### 示例：使用命令的相对路径

```js
import path from 'path'

export default {
  '*.ts': (absolutePaths) => {
    const cwd = process.cwd()
    const relativePaths = absolutePaths.map((file) => path.relative(cwd, file))
    return `ng lint myProjectName --files ${relativePaths.join(' ')}`
  },
}
```



## Reformatting the code

Prettier、ESLint/TSLint 或 stylelint 等工具可以通过运行 prettier --write/eslint --fix/tslint --fix/stylelint --fix 根据适当的配置重新格式化您的代码。只要没有错误，Lint-staged 就会自动添加对提交的任何修改。

```json
{
  "*.js": "prettier --write"
}
```

在版本 10 之前，任务必须手动包含 git add 作为最后一步。此行为已集成到 lint-staged 本身中，以防止多个任务编辑同一文件的竞争条件。如果 lint-staged 在任务配置中检测到 git add ，它将在控制台中显示警告。升级后请从您的配置中删除 git add 。



#### Examples

所有示例都假设您已经在 package.json 文件中设置了 lint-staged，并在其自己的配置文件中设置了 husky。

```json
{
  "name": "My project",
  "version": "0.1.0",
  "scripts": {
    "my-custom-script": "linter --arg1 --arg2"
  },
  "lint-staged": {}
}
```

In `.husky/pre-commit`

```sh
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

*注意：我们不传递路径作为跑步者的参数。这很重要，因为 lint-staged 会为你做这件事。*



###### ESLint 具有作为预提交挂钩运行的 *.js 和 *.jsx 的默认参数

```json
{
  "*.{js,jsx}": "eslint"
}
```



###### 使用 --fix 自动修复代码样式并添加到提交

```json
{
  "*.js": "eslint --fix"
}
```

这将运行 eslint --fix 并自动将更改添加到提交中。



###### 重用 npm 脚本

如果您希望重用 package.json 中定义的 npm 脚本：

```json
{
  "*.js": "npm run my-custom-script --"
}
```

以下是等效的：

```json
{
  "*.js": "linter --arg1 --arg2"
}
```



###### 将环境变量与 linting 命令结合使用

Linting 命令不支持扩展环境变量的 shell 约定。要自己启用约定，请使用 cross-env 等工具。

例如，下面是在所有 .js 文件上运行的 jest，其中 NODE_ENV 变量设置为“test”：

```json
{
  "*.js": ["cross-env NODE_ENV=test jest --bail --findRelatedTests"]
}
```



###### 使用 Prettier 自动修复 Prettier 支持的任何格式的代码样式

```json
{
  "*": "prettier --ignore-unknown --write"
}
```



###### 使用 Prettier 自动修复 JavaScript、TypeScript、Markdown、HTML 或 CSS 的代码样式

```json
{
  "*.{js,jsx,ts,tsx,md,html,css}": "prettier --write"
}
```



###### 用于具有默认值的 CSS 和具有 SCSS 语法的 SCSS 的 Stylelint

```json
{
  "*.css": "stylelint",
  "*.scss": "stylelint --syntax=scss"
}
```



###### 运行 PostCSS 排序和 Stylelint 来检查

```json
{
  "*.scss": ["postcss --config path/to/your/config --replace", "stylelint"]
}
```



###### 缩小图像

```json
{
  "*.{png,jpeg,jpg,gif,svg}": "imagemin-lint-staged"
}
```

imagemin-lint-staged 是一个 CLI 工具，专为具有合理默认值的 lint 阶段使用而设计。

See more on [this blog post](https://medium.com/@tomchentw/imagemin-lint-staged-in-place-minify-the-images-before-adding-to-the-git-repo-5acda0b4c57e) for benefits of this approach.



###### 使用流程对暂存文件进行类型检查

```json
{
  "*.{js,jsx}": "flow focus-check"
}
```



###### 与 Next.js 集成

```js
// .lintstagedrc.js
// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
```

