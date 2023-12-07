https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#readme

[TOC]

# PostCSS Preset Env

**PostCSS Preset Env 可让您将现代 CSS 转换为大多数浏览器可以理解的内容，并根据您的目标浏览器或运行时环境确定所需的 polyfill。**

#### Quick start

PostCSS Preset Env 是一个 PostCSS 插件。

如果您已经使用 PostCSS 来构建 CSS，则只需将 PostCSS Preset Env 添加到您的配置中即可。

* 从 npm 安装 postcss-preset-env。
* 将 postcss-preset-env 添加到您的配置中。
* Explore the [features list](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md).

```js
const postcssPresetEnv = require('postcss-preset-env');

const yourConfig = {
	plugins: [
		/* other plugins */
		/* remove autoprefixer if you had it here, it's part of postcss-preset-env */
		postcssPresetEnv({
			/* pluginOptions */
			features: {
				'nesting-rules': {
					noIsPseudoSelector: false,
				},
			},
		})
	]
}
```

#### How does it work?

PostCSS Preset Env 是 PostCSS 的插件包。它利用了我们关注的 CSSDB 功能列表并应用了插件，因此您可以使用这些新功能，而不必担心浏览器支持。

CSSDB 公开了每个功能所具有的浏览器支持，这些支持可以来自 Can I Use 或来自 MDN（通过 mdn/browser-compat-data）。

通过为您的项目提供浏览器目标列表，将跳过不需要的插件。随着时间的推移，您的目标可能会发生变化，通过更新设置，您的 CSS 捆绑包将只包含所需的后备。

PostCSS Preset Env 的作用是获取来自 MDN 和 Can I Use 的支持数据，并从浏览器列表中确定是否需要这些转换。它还包含 Autoprefixer 并与其共享列表，因此仅当您在给定浏览器支持列表的情况下需要它们时才会应用前缀。

#### Glossary

* 浏览器列表选项：Browserslist 是一个包，可为您提供给定查询的浏览器列表。例如，chrome < 42 将为您提供已发布的每个 Chrome 版本的列表，直至（但不包括）42。
* 浏览器支持统计信息：某些版本的浏览器引入了功能。它们经常出现在 MDN 和 Can I Use 上。将这些统计数据与项目所需的支持进行比较，可以告诉您使用某个功能是否安全。
* CSS 功能：CSS 功能通常是某些启用特定功能的规范的一部分。例如，hwb 函数表示法可让您根据给定颜色的色调、白度和黑度来表达该颜色。这是 CSS Color 4 规范的一部分。
* CSS 规范：规范是一个收集新功能、它们试图解决什么问题以及如何解决（通常）的文档。这通常是一个不断发展的文件，包含来自不同公司的几个人之间的长时间讨论。
* 插件：插件是旨在（通常）通过利用 PostCSS 启用新 CSS 功能的包。这不需要成为任何规范的一部分。后者的一个例子是 PostCSS Mixins，这个概念存在于 Less 或 Sass 中，但它不属于任何规范的一部分。此插件包仅包含启用万维网联盟 (W3C) 认可的功能的插件，这些功能稍后将由浏览器实现。
* Polyfill：polyfill 是一段代码（通常是 Web 上的 JavaScript），用于在本机不支持它的旧浏览器上提供现代功能。 Polyfill 应该与原生行为没有区别。

以下是您可以通过使用 PostCSS Preset Env 来利用的语法的快速示例。

...
无需任何配置选项，PostCSS Preset Env 即可启用 Stage 2 功能并支持所有浏览器。

> ⚠️ 请注意，某些功能需要配套库才能运行。虽然我们试图避免这一要求，但在某些情况下，仅使用 CSS 来填充新行为是不可能的。

[See the list below](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#plugins-that-need-client-library).



#### Usage

将 PostCSS Preset Env 添加到您的项目中：

```cmd
npm install postcss-preset-env --save-dev
```

使用 PostCSS Preset Env 作为 PostCSS 插件：

```js
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');

postcss([
  postcssPresetEnv(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

PostCSS Preset Env 在所有 Node 环境中运行，并具有以下特殊说明：

- [Node](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/INSTALL.md#node)
- [PostCSS CLI](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/INSTALL.md#postcss-cli)
- [PostCSS Load Config](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/INSTALL.md#postcss-load-config)
- [Webpack](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/INSTALL.md#webpack)
- [Next.js](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/INSTALL.md#nextjs)
- [Gulp](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/INSTALL.md#gulp)
- [Grunt](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/INSTALL.md#grunt)



#### Position in your PostCSS plugins list

PostCSS Preset Env 仅包含标准 CSS 功能的填充和后备，无法处理非标准功能和语法糖。

如果您还有用于非标准功能和语法糖的 PostCSS 插件，

你应该将它们放在 PostCSS 插件列表的第一位。

```js
module.exports = {
	plugins: [
		"postcss-syntactic-sugar",
		"postcss-non-standard",
		// ...
		[
			"postcss-preset-env",
			{
				// plugin options
			},
		],
		// ...
		// maybe a minifier?
	],
};
```

您还可以使用 insertBefore / insertAfter 插件选项进行更细粒度的控制。



#### Options

###### stage

stage 选项根据 CSS 特性在成为实施的 Web 标准过程中的稳定性来确定要进行 Polyfill 的 CSS 特性。

```js
postcssPresetEnv({ stage: 0 })
```

阶段可以是 0（实验）到 4（稳定）或 false。将 stage 设置为 false 将禁用每个 Polyfill。仅当您打算专门使用 features 选项时，这样做才有用。

默认值：2

功能进展到第 2 阶段以上的情况非常罕见。

如果您希望跟上现代功能，请使用minimumVendorImplementations。

###### minimumVendorImplementations 最小供应商实现

minumVendorImplementations 选项根据其实现状态确定要填充哪些 CSS 功能。这可用于启用浏览器中可用的插件，无论规范状态如何。

```js
postcssPresetEnv({ minimumVendorImplementations: 2 })
```

minimumVendorImplementations 可以是 0（没有供应商实现）到 3（所有主要供应商）。

默认值：0

> Note
>
> 当某个功能尚未被任何供应商实现时，它可以被视为实验性的。
>
> 即使只有一个实现，它在未来仍然可能会发生变化。
>
> 有时，某个功能/规范的问题只有在其可用后才会被发现。
>
> 当您只想使用那些应该稳定的功能时，建议使用值 2。
>
> 拥有两个独立的实现是提案成为标准的关键一步，也是功能稳定性的良好指标。



#### features

features 选项通过 ID 启用或禁用特定的 polyfill。将 true 传递给特定功能 ID 将启用其 polyfill，而传递 false 将禁用它。功能列表

```js
postcssPresetEnv({
  /* use stage 3 features + css nesting rules */
  stage: 3,
  features: {
    'nesting-rules': true
  }
})
```

将对象传递给特定的功能 ID 将启用并配置它。

```js
postcssPresetEnv({
  /* use stage 3 features + custom-selectors (preserving the original CSS) */
  stage: 3,
  features: {
    'custom-selectors': { preserve: true }
  }
})
```

任何未通过功能显式启用或禁用的 Polyfill 由阶段选项决定。



#### env

PostCSS Preset Env 支持标准的 browserslist 配置，它可以是 .browserslistrc 文件、package.json 中的 browserslist 键或 browserslist 环境变量。

browserslist 使用 env 选项来确定配置了多个 browserslist 环境时应使用的命名环境。如果未设置，Browserslist 将使用生产环境。

```js
/* use the environment named `development`, instead of the default environment of `production` */
postcssPresetEnv({ env: 'development' })
```



#### browsers

browsers 选项会覆盖任何现有的 browserslist 配置。

仅当标准浏览器列表配置不可用时才应使用浏览器选项。

当使用 browsers 选项时，env 选项将被忽略。

```js
postcssPresetEnv({ browsers: 'last 2 versions' })
```

如果未指定有效的 browserslist 配置，则将使用默认的 browserslist 查询。



#### insertBefore / insertAfter

insertBefore 和 insertAfter 键允许您将其他 PostCSS 插件插入到链中。仅当您还使用必须在某些填充之前或之后执行的含糖 PostCSS 插件时，这才有用。 insertBefore 和 insertAfter 都支持链接一个或多个插件。

```js
import postcssSimpleVars from 'postcss-simple-vars';

postcssPresetEnv({
  insertBefore: {
    'all-property': postcssSimpleVars
  }
})
```



#### autoprefixer

PostCSS Preset Env 包含自动前缀器； env 和 browsers 选项将自动传递给它。

指定 autoprefixer 选项可以将其他选项传递到 autoprefixer 中。

```js
postcssPresetEnv({
  autoprefixer: { grid: true }
})
```

传递 autoprefixer: false 会禁用 autoprefixer。

> ⚠️ autoprefixer 具有复杂的逻辑来修复 IE 和旧版 Edge 中的 CSS 网格。

对于某些功能以及使用 keep: true 时，这可能会产生意外的结果。 （默认为 true）



#### preserve

保留选项确定所有插件是否应该接收保留选项，这可能会保留或删除其他填充的 CSS。默认情况下，未配置该选项。

```js
postcssPresetEnv({
  preserve: false // instruct all plugins to omit pre-polyfilled CSS
});
```



#### debug

调试选项可以将调试消息发送到标准输出，这对于帮助您调试哪些功能已启用/禁用以及原因很有用。



#### enableClientSidePolyfills

enableClientSidePolyfills 启用所有还需要将额外的浏览器库加载到页面中才能工作的功能。默认为 false。

* 请注意，通过“feature”选项手动启用/禁用功能会覆盖此标志。
* 这仅控制是否启用 PostCSS 插件。它不会导致浏览器库包含在您的捆绑包中。



#### logical

逻辑选项可以保存一个对象，该对象允许您指定内联轴和块轴的方向，并将影响以下功能：

* `logical-properties-and-values`: [PostCSS Logical](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical#readme)
* `float-clear-logical-values`: [PostCSS Logical Float And Clear](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical#readme)
* `logical-resize`: [PostCSS Logical Resize](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical-resize#readme)
* `logical-viewport-units`: [PostCSS Logical Viewport Units](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical-viewport-units#readme)

它应该具有 blockDirection 和/或 inlineDirection ，可以是以下任意一项：

* top-to-bottom
* bottom-to-top
* left-to-right
* right-to-left

```js
postcssPresetEnv({
  logical: { // instruct all logical plugins to set inline axis to right to left
		inlineDirection: 'right-to-left',
	},
});
```

```js
.element {
	float: inline-start;
	padding-inline-end: 10px;
}
```

变成：

```css
.element {
	float: right;
	padding-left: 10px;
}
```

