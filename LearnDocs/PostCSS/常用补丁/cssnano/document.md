https://www.cssnano.cn/docs/introduction/

[TOC]

# 简介

## 什么是缩减（minification）？

缩减（minification）是指利用各种方法来 减少代码体积的过程。和 gzip 之类的保留 CSS 文件的原始语义（即无损失）的技术不同，缩减（minification） 天生是一个有损失的过程，例如，其中某些值可能会被替换为更简化的 等价语法，或者选择器被合并。

缩减（minification）步骤的最终结果是生成的代码将与 原始代码行为相同，但是某些部分被修改以 尽可能减少代码体积。

将 gzip 压缩和缩减（minification）相结合，可以最大限度的减少 文件体积，但是不要耳听为虚、眼见为实，为什么不去试试 [css-size](https://npmjs.org/package/css-size) ？ css-size 是一个专门对比缩减（minification）前后文件体积大小变化的模块。

## cssnano 是什么？

cssnano 就是这样的一个缩减器，它使基于 [Node.js](https://nodejs.org/) 开发的。cssnano 是一个 [PostCSS](http://postcss.org/) 插件，可以添加到你的构建流程中，用于确保最终生成的 用于生产环境的 CSS 样式表文件尽可能的小。

如果你不了解什么是构建流程，没关系，我们在 [入门指南](https://www.cssnano.cn/docs/getting-started/) 中做了讲解。

## 这对我有什么好处？

* 大量的代码优化

我们提供了众多不同的优化，从简单的 清除空白符到复杂的具有不同名称的相同 keyframes 的合并等。 更多信息请参考 [预设指南](https://www.cssnano.cn/docs/presets/)。

* 统一的 CSS 处理

cssnano 基于 [PostCSS](http://postcss.org/) 来处理 CSS 代码。因为很多 现代化的 CSS 工具都是基于 [PostCSS](http://postcss.org/) 开发的，因此你可以把这些工具组合起来 并生成一棵单一的抽象语法树（AST）。这就意味着总的处理时间 减少了，因为 CSS 不再需要进行多次解析了。

* 现代化的架构以及模块化

因为 cssnano 是基于 [PostCSS](http://postcss.org/) 的，因此我们可以将 cssnano 的功能拆解为多个 插件，每个插件只需负责执行一项小的优化即可。并且许多优化可以限定 到某一组特定的 CSS 属性上，这就比利用正则表达式对 CSS 做全局处理更加安全。



# 入门

## 什么是构建流程？

构建流程通常是一系列自动化的任务，在你每次需要 部署应用程序的新版本时都需要运行这些任务。cssnano 适合 用在这样的构建流程中并作为一个 CSS 开发工具 继而创建用于生产环境的压缩资源。最后将这些资源上传到 你的生产服务器或 CDN 。

有许多不同的方式可用于组织一个构建流程。 我们建议使用命令行方式，但是你可能仍需要考虑使用 类似 [gulp](http://gulpjs.com/) 这样的工具，尤其是需要应对对更复杂的 系统的情况下。

## 安装 Node.js 和 npm

cssnano 可以通过命令行工具来安装，例如[npm](https://npmjs.com/)。 因此你需要使用一个类似功能的终端或 Windows 命令行工具。 如果你还没有安装 Node.js，那么需要遵循 以下说明来安装：

我们要求的最低版本是 Node.js 10.13.0，并且我们 建议你安装 [nvm](https://github.com/creationix/nvm) 来管理 你所安装的 Node.js 版本。

或者，你可以 [访问 Node.js 官网](https://nodejs.org/en/) 并 按照官网的说明将 Node.js 安装到你的机器上。

cssnano 是一个 [PostCSS](https://postcss.org/) 插件，因此要想运行 cssnano 的化就需要安装 PostCSS。 安装 Node.js 和 npm 之后，你就可以进入你的项目目录运行如下命令来安装 cssnano 和 PostCSS 了：

```cmd
npm install cssnano postcss --save-dev
```

注意，对于大多数典型的设置，我们建议你的开发过程中也对 CSS 进行压缩， 以便在将 CSS 文件上传到你的服务器或 CDN 上时 已经进行了优化。在大多数情况下，你无需 在 web 服务器上安装 cssnano。

## 使用 PostCSS 命令行工具（CLI）

安装 cssnano 之后，你需要一个 PostCSS 运行器（runner）来 执行 CSS 文件的压缩工作。我们推荐使用 PostCSS 的命令行模块（postcss-cli）， 但是你也可以使用下一节中列出的任何替代方法。

通过以下命令安装 [PostCSS CLI](https://github.com/postcss/postcss-cli)：

```cmd
npm install --save-dev postcss-cli
```

完成此操作后，需要在项目的根目录中创建一个 `postcss.config.js` 文件来配置 cssnano。这既包含了 cssnano 也包含任何需要用到项目中的其它 [插件](https://github.com/postcss/postcss/blob/main/docs/plugins.md) ， 例如：

```js
module.exports = {
    plugins: [
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
```

*关于预设（preset）请参考 [预设（preset）指南](https://www.cssnano.cn/docs/presets/)。*

现在就可以压缩你的 CSS 文件了！通过在你的 项目目录下创建一个名为 `input.css` 的文件，并输入一些样式代码，然后执行：

```cmd
npx postcss input.css > output.css
```

然后你就可以看到一个包含相同样式代码但是被压缩过的 `output.css` 文件了！

注意，你还可以在 GitHub 仓库中找到一个 [基本示例](https://github.com/cssnano/cssnano/tree/master/packages/example-cli-usage) 以供学习。

## 命令行工具（CLI）的替代方案

你还可以使用任何其它的 PostCSS 运行器（runner）来管理 CSS 的压缩工作，下面列出的这些比较常用。

请参阅 [PostCSS 文档](https://github.com/postcss/postcss#usage) 了解更多可用的执行器（runner）。

* Grunt

使用 grunt-postcss。

* Gulp

使用 gulp-postcss。

* Webpack

将 cssnano 与 postcss-loader 一起使用。

cssnano 还能与 webpack 插件 一同使用



# 配置

你可以在 PostCSS 的配置文件中配置 cssnano，也可以通过 cssnano 的专属配置文件进行配置。PostCSS 的配置文件的优先级高于 cssnano 的专属配置文件。 如果未做任何配置，cssnano 将使用 `default` 预设（preset）配置。

## 配置文件

#### 通过 PostCSS 的配置文件进行配置

在 [PostCSS 的配置文件](https://github.com/postcss/postcss#usage) 中，你可以添加到 PostCSS 的插件列表中，并同时为 cssnano 设置 `preset` 和 `plugins` 参数。例如，如果以编程方式使用 PostCSS 的话，以下代码展示了如何同时使用 cssnano 和 autoprefixer，并且 cssnano 使用了 `lite` 预设（preset）配置。

```js
import postcss from 'postcss';
import cssnano from 'cssnano';
import litePreset from 'cssnano-preset-lite';
import autoprefixer from 'autoprefixer';
const preset = litePreset({ discardComments: false });

postcss([cssnano({ preset, plugins: [autoprefixer] })]).process("/* Your CSS here */")
```

#### 通过 cssnano 专属配置文件进行配置

如果你无法在 PostCSS 的配置文件中配置 cssnano，则可以在 cssnano 的专属配置文件中为 cssnano 设置参数。cssnano 的专属配置文件支持多种格式。

- 在 `package.json` 文件中为 `cssnano` 设置参数
- 命名为 `.cssnanorc.config.json` 或 `.cssnanorc` 的 JSON 文件
- 命名为 `cssnano.config.js` 的文件，并且以 JavaScript 对象的形式导出（export）配置参数

## 参数

#### 选择一个预设（preset）配置

- **参数：** `preset`
- **类型：** `string` | `function` | `[string, Objects<preset options here>]` | `[function(preset options here)]`

Pass a preset to choose a pre-configured set of optimizations. You can specify a preset with the preset name as a string or by passing the result of importing the preset package.

导入（import）预设（preset）并传递参数：

```js
cssnano({ preset: require('cssnano-preset-default') })
```

如果采用的是 JSON 格式的配置文件时，则使用字符串作为参数会非常方便。

```js
cssnano({ preset: 'cssnano-preset-default' })
```

当使用字符串作为参数时，如果预设（preset）名是类似 `cssnano-preset-<name>` 形式的话，则只使用 `name` 作为名称即可：

```js
cssnano({ preset: 'default' })
```

#### 禁用预设（preset）中添加的某个插件

You can disable one or more of the plugins used in a preset. Pass an array where the first element is the preset and the second is an object with the preset options.

```js
// cssnano.config.js
module.exports = {
  preset: [ require('cssnano-preset-default'), { discardComments: false } ]
};
```

将预设（preset）名当作字符串来指定预设（preset）时，也可以向预设（preset）自身传递参数： 例如，在使用 `advanced` 预设（preset）时，以下配置展示了如何停用 `discardComments` 插件：

```js
cssnano({ preset: ['cssnano-preset-advanced', { discardComments: false }] })
```

#### Use individual plugins

- **参数：** `plugins`
- **类型：** `Array<'string' | 'function' | ['string' | 'function', Object<Options for the plugin here>]>`

你还可以给 cssnano 配置一系列的插件。 如需配置各个单独的插件，请使用数组套数组的方式，如下所示：

```js
cssnano({ plugins: [['autoprefixer', {}]] })
```

- **示例：**

  ```js
  // cssnano.config.js
  module.exports = {
    plugins: [require('autoprefixer')]
    
    // 或者
    plugins: ['autoprefixer', 'postcss-preset-env']
    
    // 或者
    plugins: [ 
      ['autoprefixer', { remove: false }],
    ]
  
    // 或者
    plugins: [
      [ require('autoprefixer'), {remove: false} ],
      [ 'postcss-preset-env']
    ]
  }
  ```



## 优化

#### 什么是优化？

优化是某一类模块的总称，它们对某些 CSS 代码执行转换操作 以减少 CSS 的体积或者 gzip 之后的 CSS 的体积。每一次 的优化都需要由一个或数个模块 一起协同工作。

由于 cssnano 生来就是功能模块化的， 因此在某些情况下，单独执行转换操作并不能产生 最优化的输出，例如，postcss-colormin 没有清理 色彩函数内部空白的功能，因为这项清理功能是由 postcss-normalize-whitespace 来负责的。

#### 支持哪些优化？

根据预设（preset）的不同，执行的优化也就不同。对于默认预设（preset），我们只提供了安全转换功能。

| 默认（default）                                              | 进阶（advanced） | 轻量（lite） |      |
| ------------------------------------------------------------ | ---------------- | ------------ | ---- |
| [autoprefixer](https://www.cssnano.cn/docs/optimisations/autoprefixer/) | ❌                | ✅            | ❌    |
| [cssDeclarationSorter](https://www.cssnano.cn/docs/optimisations/cssdeclarationsorter/) | ✅                | ✅            | ❌    |
| [calc](https://www.cssnano.cn/docs/optimisations/calc/)      | ✅                | ✅            | ❌    |
| [colormin](https://www.cssnano.cn/docs/optimisations/colormin/) | ✅                | ✅            | ❌    |
| [convertValues](https://www.cssnano.cn/docs/optimisations/convertvalues/) | ✅                | ✅            | ❌    |
| [discardComments](https://www.cssnano.cn/docs/optimisations/discardcomments/) | ✅                | ✅            | ✅    |
| [discardDuplicates](https://www.cssnano.cn/docs/optimisations/discardduplicates/) | ✅                | ✅            | ❌    |
| [discardEmpty](https://www.cssnano.cn/docs/optimisations/discardempty/) | ✅                | ✅            | ✅    |
| [discardOverridden](https://www.cssnano.cn/docs/optimisations/discardoverridden/) | ✅                | ✅            | ❌    |
| [discardUnused](https://www.cssnano.cn/docs/optimisations/discardunused/) | ❌                | ✅            | ❌    |
| [mergeIdents](https://www.cssnano.cn/docs/optimisations/mergeidents/) | ❌                | ✅            | ❌    |
| [mergeLonghand](https://www.cssnano.cn/docs/optimisations/mergelonghand/) | ✅                | ✅            | ❌    |
| [mergeRules](https://www.cssnano.cn/docs/optimisations/mergerules/) | ✅                | ✅            | ❌    |
| [minifyFontValues](https://www.cssnano.cn/docs/optimisations/minifyfontvalues/) | ✅                | ✅            | ❌    |
| [minifyGradients](https://www.cssnano.cn/docs/optimisations/minifygradients/) | ✅                | ✅            | ❌    |
| [minifyParams](https://www.cssnano.cn/docs/optimisations/minifyparams/) | ✅                | ✅            | ❌    |
| [minifySelectors](https://www.cssnano.cn/docs/optimisations/minifyselectors/) | ✅                | ✅            | ❌    |
| [normalizeCharset](https://www.cssnano.cn/docs/optimisations/normalizecharset/) | ✅                | ✅            | ❌    |
| [normalizeDisplayValues](https://www.cssnano.cn/docs/optimisations/normalizedisplayvalues/) | ✅                | ✅            | ❌    |
| [normalizePositions](https://www.cssnano.cn/docs/optimisations/normalizepositions/) | ✅                | ✅            | ❌    |
| [normalizeRepeatStyle](https://www.cssnano.cn/docs/optimisations/normalizerepeatstyle/) | ✅                | ✅            | ❌    |
| [normalizeString](https://www.cssnano.cn/docs/optimisations/normalizestring/) | ✅                | ✅            | ❌    |
| [normalizeTimingFunctions](https://www.cssnano.cn/docs/optimisations/normalizetimingfunctions/) | ✅                | ✅            | ❌    |
| [normalizeUnicode](https://www.cssnano.cn/docs/optimisations/normalizeunicode/) | ✅                | ✅            | ❌    |
| [normalizeUrl](https://www.cssnano.cn/docs/optimisations/normalizeurl/) | ✅                | ✅            | ❌    |
| [normalizeWhitespace](https://www.cssnano.cn/docs/optimisations/normalizewhitespace/) | ✅                | ✅            | ✅    |
| [orderedValues](https://www.cssnano.cn/docs/optimisations/orderedvalues/) | ✅                | ✅            | ❌    |
| [reduceIdents](https://www.cssnano.cn/docs/optimisations/reduceidents/) | ❌                | ✅            | ❌    |
| [reduceInitial](https://www.cssnano.cn/docs/optimisations/reduceinitial/) | ✅                | ✅            | ❌    |
| [reduceTransforms](https://www.cssnano.cn/docs/optimisations/reducetransforms/) | ✅                | ✅            | ❌    |
| [svgo](https://www.cssnano.cn/docs/optimisations/svgo/)      | ✅                | ✅            | ❌    |
| [uniqueSelectors](https://www.cssnano.cn/docs/optimisations/uniqueselectors/) | ✅                | ✅            | ❌    |
| [zindex](https://www.cssnano.cn/docs/optimisations/zindex/)  | ❌                | ✅            | ❌    |

你可以通过我们的 [预设（preset）指南](https://www.cssnano.cn/docs/presets/) 了解更多信息。



# 预设（preset）

## 什么是预设（preset）？

从版本 4 开始，**预设（preset）是一种根据你的使用情况加载具有不同功能的 cssnano 的方法**。 现在，你可以不必删除 高级转换（advanced transformations）并同时使用预设（preset）。在 引入预设（preset）之前，不管使用与否，都会从 npm 下载执行高级转换的代码， 预设（preset）的引入改变了这种状况， 并且还能保存 cssnano 的配置 以在多个使用场景中重复利用。

#### 预设（preset）是如何工作的？

cssnano 运行一些不同的操作来检查应该使用哪个预设（preset）。 首先，它在初始化时检查是否加载了预设（preset）， 如果加载了就直接使用。例如，在项目根目录中使用 `postcss.config.js` 文件。

```js
module.exports = {
    plugins: [
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
```

*预设（preset）的名称指向一个可以解析的 node 模块，可以带有 `cssnano-preset-` 前缀。因此你可以在这里指定 `cssnano-preset-default`， 如果你愿意的话。*

如果有参数需要传递给预设（preset），你必须使用 数组形式。例如，你可以通过以下配置将代码中的所有注释都删除：

```js
module.exports = {
    plugins: [
        require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
            }]
        }),
    ],
};
```

对于未明确指定预设（preset）的情况，cssnano 将从当前目录向上级目录逐级查找 `package.json` 或 `cssnano.config.js` 文件中的某个配置段， 直到主目录为止。下面两个 配置示例所实现的功能与上一个示例相同：

```json
{
  "name": "awesome-application",
  "cssnano": {
    "preset": [
      "default",
      {"discardComments": {"removeAll": true}}
    ]
  }
}
```

`cssnano.config.js` 文件：

```js
const defaultPreset = require('cssnano-preset-default');

module.exports = defaultPreset({
    discardComments: {
        removeAll: true,
    },
});
```

*对于更具体的使用情况，例如你所使用的转换（transformations） 需要能够接受函数作为参数的话，那就需要使用 `cssnano.config.js` 配置文件。*

如果 cssnano 未显式加载预设（preset），或者 在任何父目录中未找到配置段或文件的话，则加载默认值。 `postcss.config.js` 示例：

```js
module.exports = {
    plugins: [
        require('cssnano'),
    ],
};
```

对于多数使用情况，默认的预设（preset）就应该能够满足你的需求了，但是 我们还提供了一个高级预设（advanced preset）可以执行更激进的转换（transformations）。 你可以在 [我们的高级转换（transformations）指南](https://www.cssnano.cn/docs/advanced-transforms/)中了解更多信息。

#### 参数

参数命名遵循一个简单的模式：删除 `postcss-` 这个前缀， 并且余下的参数名遵循驼峰（`camelCase`）命名方式。因此，如果你需要为 `postcss-svgo` 设置参数的话，可以这样：

```js
module.exports = {
    plugins: [
        require('cssnano')({
            preset: ['default', {
                svgo: {
                    plugins: [{
                        removeDoctype: false,
                    }],
                },
            }],
        }),
    ],
};
```

#### 排除转换（transform）

如果你在构建的时候不需要某个转换（transform）并希望将其从列表中排除， 有两种方法可以实现这一需求。第一种是将参数值设置为 `false`：

```js
module.exports = {
    plugins: [
        require('cssnano')({
            preset: ['default', {
                svgo: false,
            }],
        }),
    ],
};
```

Copy

另一种方法是：如果你已经设置了参数，并且希望 暂时排除某个转换，则可以通过设置 `exclude` 参数：

```js
module.exports = {
    plugins: [
        require('cssnano')({
            preset: ['default', {
                svgo: {
                    exclude: true,
                },
            }],
        }),
    ],
};
```





