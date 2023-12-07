https://prettier.io/docs/en/install

[TOC]

# Install

首先，在本地安装 Prettier：

```cmd
npm install --save-dev --save-exact prettier
```

然后，创建一个空的配置文件，让编辑器和其他工具知道您正在使用 Prettier：

```cmd
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

接下来，创建一个 .prettierignore 文件，让 Prettier CLI 和编辑器知道哪些文件不格式化。这是一个例子：

```
# Ignore artifacts:
build
coverage
```

> 提示！如果 Prettier 存在于运行它的同一目录中，则 Prettier 将遵循 .gitignore 中指定的规则。您还可以将 .prettierignore 建立在 .eslintignore 的基础上（如果您有的话）。
>
> 另一个提示！如果您的项目尚未准备好格式化（例如 HTML）文件，请添加 *.html。

现在，使用 Prettier 格式化所有文件：

```cmd
npx prettier . --write
```

> 那个 npx 是什么东西？ npx 随 npm 一起提供，可让您运行本地安装的工具。为了简洁起见，我们将在该文件的其余部分中省略 npx 部分！
>
> 注意：如果您忘记先安装 Prettier，npx 会暂时下载最新版本。使用 Prettier 时这不是一个好主意，因为我们更改了每个版本中代码的格式！在 package.json 中拥有 Prettier 的锁定版本非常重要。而且速度也更快。

`prettier --write .` is great for formatting everything, but for a big project it might take a little while. You may run `prettier --write app/` to format a certain directory, or `prettier --write app/components/Button.js` to format a certain file. Or use a *glob* like `prettier --write "app/**/*.test.js"` to format all tests in a directory (see [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax) for supported glob syntax).

非常适合格式化所有内容，但对于大型项目可能需要一些时间。您可以运行 `prettier --write app/` 来格式化某个目录，或者运行 prettier --write app/components/Button.js 来格式化某个文件。或者使用像 prettier --write "app/**/*.test.js" 这样的 glob 来格式化目录中的所有测试（请参阅 fast-glob 了解支持的 glob 语法）。

如果您有 CI 设置，请运行以下命令作为其中的一部分，以确保每个人都运行 Prettier。这可以避免合并冲突和其他协作问题！

```cmd
npx prettier . --check
```

--check 与 --write 类似，但仅检查文件是否已格式化，而不是覆盖它们。 prettier --write 和 prettier --check 是运行 Prettier 的最常见方法。

#### Set up your editor

从命令行进行格式化是一个很好的入门方法，但是您可以通过从编辑器运行 Prettier 来充分利用 Prettier，可以通过键盘快捷键运行，也可以在保存文件时自动运行。当编码时某行变得太长以致于它不适合您的屏幕时，只需按一个键，就会看到它神奇地被换成多行！或者，当您粘贴一些代码并且缩进变得混乱时，让 Prettier 为您修复它，而无需离开编辑器。

有关如何设置编辑器的信息，请参阅编辑器集成。如果您的编辑器不支持 Prettier，您可以使用文件观察器运行 Prettier。

> 注意：不要跳过常规的本地安装！编辑器插件将选择您本地版本的 Prettier，确保您在每个项目中使用正确的版本。 （您不希望您的编辑器意外地导致大量更改，因为它使用的是比您的项目更新版本的 Prettier！）
>
> 能够从命令行运行 Prettier 仍然是一个很好的后备方案，并且是 CI 设置所需要的。

#### ESLint（和其他 linter）

如果您使用 ESLint，请安装 eslint-config-prettier 以使 ESLint 和 Prettier 能够很好地配合。它关闭所有不必要或可能与 Prettier 冲突的 ESLint 规则。 Stylelint 有一个类似的配置：stylelint-config-prettier

（请参阅 Prettier 与 Linters 以了解有关格式化与 linting 的更多信息，与 Linters 集成以了解有关配置 linter 的更深入信息，以及相关项目以获取更多集成可能性（如果需要）。

#### Git hooks

除了从命令行运行 Prettier (prettier --write)、检查 CI 中的格式以及从编辑器运行 Prettier 之外，许多人还喜欢将 Prettier 作为预提交挂钩运行。这可以确保您的所有提交都已格式化，而无需等待 CI 构建完成。

例如，您可以执行以下操作以在每次提交之前运行 Prettier：

1. 安装 husky 和 lint-staged：

```cmd
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

2. 将以下内容添加到您的 package.json 中：

```json
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```

> 注意：如果您使用 ESLint，请确保 lint-staged 在 Prettier 之前运行它，而不是之后。

See [Pre-commit Hook](https://prettier.io/docs/en/precommit) for more information.

#### Summary

总而言之，我们学会了：

* 在您的项目中本地安装精确版本的 Prettier。这可以确保项目中的每个人都获得完全相同的 Prettier 版本。即使 Prettier 的补丁版本也可能导致格式略有不同，因此您不希望不同的团队成员使用不同的版本并来回格式化彼此的更改。
* 添加 .prettierrc.json 让编辑器知道您正在使用 Prettier。
* 添加 .prettierignore 让编辑器知道哪些文件不要触及，以及能够运行 prettier --write 。格式化整个项目（不会破坏您不想要的文件，也不会阻塞生成的文件）。
* 运行 prettier --check 。在 CI 中确保您的项目保持格式化。
* 从编辑器中运行 Prettier 以获得最佳体验。
* 使用 eslint-config-prettier 使 Prettier 和 ESLint 能够很好地协同工作。
* 设置预提交挂钩以确保每次提交都经过格式化。



## Ignoring Code

使用 .prettierignore 完全忽略（即不重新格式化）某些文件和文件夹。

使用“prettier-ignore”注释来忽略部分文件。

#### Ignoring Files: .prettierignore

要从格式中排除文件，请在项目的根目录中创建一个 .prettierignore 文件。 .prettierignore 使用 gitignore 语法。

建议在您的项目中添加 .prettierignore！这样你就可以运行 `prettier --write .` 确保所有内容都已格式化（不会损坏您不想要的文件，也不会阻塞生成的文件）。而且 - 您的编辑器会知道哪些文件不应该格式化！

默认情况下，prettier 会忽略版本控制系统目录（“.git”、“.sl”、“.svn”和“.hg”）和 node_modules 中的文件（除非指定了 --with-node-modules CLI 选项）。如果 Prettier 存在于运行它的同一目录中，则 Prettier 还将遵循“.gitignore”文件中指定的规则。

所以默认情况下它将是

```
**/.git
**/.svn
**/.hg
**/node_modules
```

#### JavaScriptJavaScript

JavaScript 注释 // prettier-ignore 将从格式化中排除抽象语法树中的下一个节点。

```js
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

#### JSX

```jsx
<div>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</div>
```

略

https://prettier.io/docs/en/ignore

[TOC]

## 与 Linters 集成

Linters 通常不仅包含代码质量规则，还包含风格规则。使用 Prettier 时，大多数风格规则都是不必要的，但更糟糕的是——它们可能与 Prettier 发生冲突！使用 Prettier 来解决代码格式问题，使用 linter 来解决代码质量问题，如 Prettier 与 Linters 中所述。

幸运的是，通过使用这些预制配置，可以轻松关闭与 Prettier 冲突或不必要的规则：

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)



# eslint-config-prettier

https://github.com/prettier/eslint-config-prettier

关闭所有不必要或可能与 Prettier 冲突的规则。

这使您可以使用您最喜欢的可共享配置，而不会让它的风格选择妨碍您使用 Prettier。

请注意，此配置仅关闭规则，因此只有将其与其他配置一起使用才有意义。

#### Installation

1. 安装 eslint-config-prettier：

```cmd
npm install --save-dev eslint-config-prettier
```

2. 将 eslint-config-prettier 添加到您的 ESLint 配置中 – eslintrc 或 eslint.config.js （平面配置）。

eslintrc：将“prettier”添加到 .eslintrc.* 文件中的“extends”数组中。确保将其放在最后，以便它有机会覆盖其他配置。

```json
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

eslint.config.js（flat config）：导入 eslint-config-prettier，并将其放入配置数组中 - 在您想要覆盖的其他配置之后。

```js
import someConfig from "some-other-config-you-use";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  someConfig,
  eslintConfigPrettier,
];
```

3. 最后，运行 CLI 帮助工具来查找配置的“规则”部分中的问题。

#### Plugins

eslint-config-prettier 不仅会关闭核心规则，还会自动关闭这些插件中的一些规则：

- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
- [@babel/eslint-plugin](https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin)
- [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel)
- [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

> 注意：您可能会在互联网上找到指南，说您还应该扩展“prettier/react”之类的内容。从 eslint-config-prettier 8.0.0 版本开始，您需要扩展的就是“prettier”！这包括所有插件。

eslint.config.js（平面配置）插件警告

通过平面配置，您可以决定插件名称！例如：

```js
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    plugins: {
      // You’d typically use one of the following two:
      // typescriptEslint: typescriptEslint,
      // typescriptEslint,
      // But in this example we give it another name.
      // It might be tempting to use something shorter like “ts”:
      ts: typescriptEslint, // 🚨 Don’t do this!
    },
    rules: {
      // With eslintrc, this is _always_ called:
      // @typescript-eslint/indent
      // But in eslint.config.js (flat config), the name chosen above in `plugins` is used.
      "ts/indent": "error", // 🚨 Don’t do this!
    },
  },
  eslintConfigPrettier,
];
```

您可能期望 eslint-config-prettier 关闭 ts/indent，但它不会！因为 eslint-config-prettier 只关闭 @typescript-eslint/indent。它无法知道您选择如何调用该插件。 CLI 帮助工具也是如此。