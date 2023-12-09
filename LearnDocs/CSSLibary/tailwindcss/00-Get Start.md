https://tailwindcss.com/docs/installation

[TOC]

# Get started with Tailwind CSS

Tailwind CSS 的工作原理是扫描所有 HTML 文件、JavaScript 组件和任何其他模板的类名，生成相应的样式，然后将它们写入静态 CSS 文件。

它快速、灵活、可靠，且运行时间为零。



## Install

1. 通过 npm 安装 tailwindcss，并创建 tailwind.config.js 文件。

   ```cmd
   npm install -D tailwindcss
   npx tailwindcss init
   ```

2. 在 tailwind.config.js 文件中添加所有模板文件的路径。

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ["./src/**/*.{html,js}"],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. 将 Tailwind 每个层的 @tailwind 指令添加到主 CSS 文件中。

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. 运行 CLI 工具来扫描模板文件中的类并构建 CSS。

   ```cmd
   npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
   ```

5. 将编译后的 CSS 文件添加到 <head> 中，然后开始使用 Tailwind 的实用程序类来设置内容的样式。

   ```html
   <!doctype html>
   <html>
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link href="/dist/output.css" rel="stylesheet">
   </head>
   <body>
     <h1 class="text-3xl font-bold underline">
       Hello world!
     </h1>
   </body>
   </html>
   ```

   

## Editor Setup

插件和配置设置可改善开发人员使用 Tailwind CSS 时的体验。

#### Syntax support

Tailwind CSS 使用大量自定义 CSS at 规则，例如 @tailwind、@apply 和 @screen，在许多编辑器中，这可能会在无法识别这些规则的情况下触发警告或错误。

解决这个问题的方法几乎总是为你的编辑器/IDE 安装一个插件来支持 PostCSS 语言，而不是常规的 CSS。

如果您使用 VS Code，我们的官方 Tailwind CSS IntelliSense 插件包含专用的 Tailwind CSS 语言模式，该模式支持 Tailwind 使用的所有自定义 at 规则和函数。

在某些情况下，如果您的编辑器对 CSS 文件中期望的语法非常严格，您可能需要禁用本机 CSS linting/验证。

#### IntelliSense for VS Code

Visual Studio Code 的官方 Tailwind CSS IntelliSense 扩展通过为用户提供自动完成、语法突出显示和 linting 等高级功能来增强 Tailwind 开发体验。

#### Automatic class sorting with Prettier

我们为 Tailwind CSS 维护了一个官方 Prettier 插件，可以按照我们推荐的类顺序自动对您的类进行排序。

它与自定义 Tailwind 配置无缝协作，并且因为它只是一个 Prettier 插件，所以它可以在 Prettier 工作的任何地方工作 - 包括每个流行的编辑器和 IDE，当然还有命令行。

#### JetBrains IDEs

WebStorm、PhpStorm 等 JetBrains IDE 包括对 HTML 中以及使用 @apply 时的智能 Tailwind CSS 补全的支持。

https://www.jetbrains.com/help/webstorm/tailwind-css.html



## Using with Preprocessors

将 Tailwind 与 Sass、Less 和 Stylus 等常见 CSS 预处理器结合使用的指南。

由于 Tailwind 是一个 PostCSS 插件，因此没有什么可以阻止您将其与 Sass、Less、Stylus 或其他预处理器一起使用，就像使用 Autoprefixer 等其他 PostCSS 插件一样。

需要注意的是，您不需要在 Tailwind 中使用预处理器——无论如何，您通常在 Tailwind 项目上编写很少的 CSS，因此使用预处理器并不像在编写大量 CSS 的项目中那么有用自定义CSS。

本指南仅作为出于无法控制的原因需要将 Tailwind 与预处理器集成的人们的参考，而不是因为这是推荐的做法。

#### Using PostCSS as your preprocessor

如果您将 Tailwind 用于一个全新的项目，并且不需要将其与任何现有的 Sass/Less/Stylus 样式表集成，那么您应该高度考虑依赖其他 PostCSS 插件来添加您使用的预处理器功能，而不是使用单独的预处理器功能。预处理器。

这样做有几个好处：

* 你的构建会更快。由于您的 CSS 不必通过多个工具进行解析和处理，因此仅使用 PostCSS 即可更快地编译 CSS。
* 没有怪癖或解决方法。由于 Tailwind 在 CSS 中添加了一些新的非标准关键字（如 @tailwind、@apply、theme() 等），因此您通常必须以烦人的、不直观的方式编写 CSS，以使预处理器为您提供预期的输出。专门使用 PostCSS 可以避免这种情况。

有关可用 PostCSS 插件的相当全面的列表，请参阅 PostCSS GitHub 存储库，但这里有一些我们在自己的项目中使用并可以推荐的重要插件。

#### Build-time imports

预处理器提供的最有用的功能之一是能够将 CSS 组织为多个文件，并在构建时通过提前处理 @import 语句（而不是在浏览器中）将它们组合起来。

使用 PostCSS 处理此问题的规范插件是 postcss-import。

要使用它，请通过 npm 安装插件：

```cmd
npm install -D postcss-import
```

然后将其添加为 PostCSS 配置中的第一个插件：

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

关于 postcss-import 需要注意的一件重要事情是，它严格遵守 CSS 规范，并且不允许在文件最顶部以外的任何地方使用 @import 语句。

```css
/* components.css */

.btn {
  padding: theme('spacing.4') theme('spacing.2');
  /* ... */
}

/* Will not work */
@import "./components/card";
/* × Won’t work, @import statements must come first */
```

解决此问题的最简单方法是永远不要在同一个文件中混合常规 CSS 和导入。相反，为导入创建一个主入口点文件，并将所有实际 CSS 保存在单独的文件中。

```css
/* components.css */
@import "./components/buttons.css";
@import "./components/card.css";
```

```css
/* components/buttons.css */
.btn {
  padding: theme('spacing.4') theme('spacing.2');
  /* ... */
}
```

```css
/* components/card.css */
.card {
  padding: theme('spacing.4');
  /* ... */
}
```

您最有可能遇到这种情况的地方是包含 @tailwind 声明的主 CSS 文件。

```css
@tailwind base;
@import "./custom-base-styles.css";

@tailwind components;
@import "./custom-components.css";

@tailwind utilities;
@import "./custom-utilities.css";
/* × Won’t work, @import statements must come first */
```

您可以通过为每个 @tailwind 声明创建单独的文件，然后将这些文件导入到主样式表中来解决此问题。为了简化这一过程，我们为每个 @tailwind 声明提供了开箱即用的单独文件，您可以直接从 node_modules 导入这些文件。

postcss-import 插件足够智能，可以自动查找 node_modules 文件夹中的文件，因此您不需要提供整个路径 - 例如“tailwindcss/base”就足够了。

```css
@import "tailwindcss/base";
@import "./custom-base-styles.css";

@import "tailwindcss/components";
@import "./custom-components.css";

@import "tailwindcss/utilities";
@import "./custom-utilities.css";
```

