https://postcss.org/docs/postcss-plugins

[TOC]

# PostCSS Plugins

## Control

有两种方法可以让 PostCSS 的魔力更加明确。

使用 postcss-plugin-context 限制插件的本地样式表上下文：

```css
.css-example.is-test-for-css4-browsers {
  color: gray(255, 50%);
}
@context postcss-preset-env {
  .css-example.is-fallback-for-all-browsers {
    color: gray(255, 50%);
  }
}
```

或者使用 postcss-use 直接在 CSS 中启用插件：

```css
@use autoprefixer(browsers: ['last 2 versions']);

:fullscreen a {
  display: flex;
}
```

## Packs



- [`postcss-utilities`](https://github.com/ismamz/postcss-utilities) includes the most commonly used mixins, shortcuts and helpers to use as `@util` rules.postcss-utilities 包括最常用的 mixins、快捷方式和帮助程序，用作 @util 规则。
- [`atcss`](https://github.com/morishitter/atcss) contains plugins that transform your CSS according to special annotation comments.atcss 包含根据特殊注释注释转换 CSS 的插件。
- [`cssnano`](https://cssnano.co/) contains plugins that optimize CSS size for use in production.cssnano 包含优化 CSS 大小以供生产使用的插件。
- [`oldie`](https://github.com/csstools/oldie) contains plugins that transform your CSS for older Internet Explorer compatibility.oldie 包含可以转换 CSS 以兼容旧版 Internet Explorer 的插件。
- [`rucksack`](https://github.com/seaneking/rucksack) contains plugins to speed up CSS development with new features and shortcuts.rucksack 包含通过新功能和快捷方式加速 CSS 开发的插件。
- [`level4`](https://github.com/stephenway/level4) contains only plugins that let you write CSS4 without the IE9 fallbacks.level4 仅包含可让您编写 CSS4 而无需 IE9 后备的插件。
- [`short`](https://github.com/csstools/postcss-short) adds and extends numerous shorthand properties.Short 添加并扩展了许多速记属性。
- [`stylelint`](https://github.com/stylelint/stylelint) contains plugins that lint your stylesheets.stylelint 包含检查样式表的插件。
- [`postcss-hamster`](https://github.com/h0tc0d3/postcss-hamster) for vertical rhythm, typography, modular scale functions.postcss-hamster 用于垂直节奏、排版、模块化比例功能。
- [`postcss-preset-env`](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments.postcss-preset-env 允许您将现代 CSS 转换为大多数浏览器可以理解的内容，并根据您的目标浏览器或运行时环境确定您需要的 polyfill。
- [`postcss-ui-theme`](https://github.com/cleverboy32/postcss-ui-theme) gives you syntax sugar and allows you to change theme.postcss-ui-theme 为您提供语法糖并允许您更改主题。

## Future CSS Syntax未来的 CSS 语法

- [`postcss-apply`](https://github.com/pascalduez/postcss-apply) supports custom properties sets references.postcss-apply 支持自定义属性集引用。
- [`postcss-attribute-case-insensitive`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-attribute-case-insensitive) supports case insensitive attributes.postcss-attribute-case-insensitive 支持不区分大小写的属性。
- [`postcss-bidirection`](https://github.com/gasolin/postcss-bidirection) generate left-to-right and right-to-left styles with single syntax.postcss-bidirection 使用单一语法生成从左到右和从右到左的样式。
- [`postcss-color-function`](https://github.com/postcss/postcss-color-function) supports functions to transform colors.postcss-color-function 支持转换颜色的函数。
- [`postcss-color-gray`](https://github.com/postcss/postcss-color-gray) supports the `gray()` function.postcss-color-gray 支持gray() 函数。
- [`postcss-color-hex-alpha`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-color-hex-alpha) supports `#rrggbbaa` and `#rgba` notation.postcss-color-hex-alpha 支持 #rrggbbaa 和 #rgba 表示法。
- [`postcss-color-hsl`](https://github.com/dmarchena/postcss-color-hsl): transforms CSS Colors 4 `hsl()` to more compatible `hsl()` or `hsla()`.postcss-color-hsl：将 CSS Colors 4 hsl() 转换为更兼容的 hsl() 或 hsla()。
- [`postcss-color-hwb`](https://github.com/postcss/postcss-color-hwb) transforms `hwb()` to widely compatible `rgb()`.postcss-color-hwb 将 hwb() 转换为广泛兼容的 rgb()。
- [`postcss-color-image`](https://github.com/valtlai/postcss-color-image) supports `image(<color>)` syntax allowing to use a solid color as an image.postcss-color-image 支持 image(<color>) 语法，允许使用纯色作为图像。
- [`postcss-color-rebeccapurple`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-color-rebeccapurple) supports the `rebeccapurple` color.postcss-color-rebeccapurple 支持 rebeccapurple 颜色。
- [`postcss-color-rgb`](https://github.com/dmarchena/postcss-color-rgb): transforms CSS Colors 4 `rgb()` to more compatible `rgb()` or `rgba()`.postcss-color-rgb：将 CSS Colors 4 rgb() 转换为更兼容的 rgb() 或 rgba()。
- [`postcss-conic-gradient`](https://github.com/csstools/postcss-conic-gradient) supports the `conic-gradient` background.postcss-conic-gradient 支持圆锥渐变背景。
- [`postcss-custom-media`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media) supports custom aliases for media queries.postcss-custom-media 支持媒体查询的自定义别名。
- [`postcss-custom-properties`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-properties) supports variables, using syntax from the W3C Custom Properties.postcss-custom-properties 使用 W3C 自定义属性中的语法支持变量。
- [`postcss-custom-selectors`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-selectors) adds custom aliases for selectors.postcss-custom-selectors 为选择器添加自定义别名。
- [`postcss-extend`](https://github.com/travco/postcss-extend) supports spec-approximate `@extend` for rules and placeholders, recursively.postcss-extend 递归地支持规则和占位符的规范近似@extend。
- [`postcss-font-format-keywords`](https://github.com/valtlai/postcss-font-format-keywords) transforms keywords in `@font-face` rule’s `format()` function to widely supported strings.postcss-font-format-keywords 将 @font-face 规则的 format() 函数中的关键字转换为广泛支持的字符串。
- [`postcss-font-normalize`](https://github.com/iahu/postcss-font-normalize) to normalize font, especially `font-family`.postcss-font-normalize 规范化字体，尤其是 font-family。
- [`postcss-font-variant`](https://github.com/postcss/postcss-font-variant) transpiles human-readable `font-variant` to more widely supported CSS.postcss-font-variant 将人类可读的 font-variant 转换为更广泛支持的 CSS。
- [`postcss-font-family-system-ui`](https://github.com/JLHwung/postcss-font-family-system-ui) transforms W3C CSS `font-family: system-ui` to a practical font list.postcss-font-family-system-ui 将 W3C CSS font-family: system-ui 转换为实用的字体列表。
- [`postcss-font-display`](https://github.com/dkrnl/postcss-font-display) add `font-display` css rule.postcss-font-display 添加 font-display css 规则。
- [`postcss-host`](https://github.com/vitkarpov/postcss-host) makes the Shadow DOM’s `:host` selector work properly with pseudo-classes.postcss-host 使 Shadow DOM 的 :host 选择器与伪类正常工作。
- [`postcss-initial`](https://github.com/maximkoretskiy/postcss-initial) supports `initial` keyword and `all: initial` to clean inherit styles.postcss-initial 支持initial 关键字和all:initial 到clean 继承样式。
- [`postcss-logical-properties`](https://github.com/ahmadalfy/postcss-logical-properties) transforms `start` and `end` properties to `left` and `right` depending on the writing direction of the document.postcss-logic-properties 根据文档的书写方向将开始和结束属性转换为左侧和右侧。
- [`postcss-media-minmax`](https://github.com/postcss/postcss-media-minmax) adds `<=` and `=>` statements to media queries.postcss-media-minmax 将 <= 和 => 语句添加到媒体查询中。
- [`postcss-multi-value-display`](https://github.com/jake-low/postcss-multi-value-display) transforms `inline flex` and `block flow` to `inline-flex` and `block`postcss-multi-value-display 将 inline flex 和 block 流转换为 inline-flex 和 block
- [`postcss-pseudo-class-any-link`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-pseudo-class-any-link) adds `:any-link` pseudo-class.postcss-pseudo-class-any-link 添加 :any-link 伪类。
- [`postcss-pseudo-is`](https://github.com/IlyaUpyackovich/postcss-pseudo-is) transforms `:is()` to more compatible CSS.postcss-pseudo-is 将 :is() 转换为更兼容的 CSS。
- [`postcss-selector-not`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-selector-not) transforms CSS4 `:not()` to CSS3 `:not()`.postcss-selector-not 将 CSS4 :not() 转换为 CSS3 :not()。
- [`postcss-selector-matches`](https://github.com/postcss/postcss-selector-matches) transforms CSS4 `:matches()` to more compatible CSS.postcss-selector-matches 将 CSS4 :matches() 转换为更兼容的 CSS。
- [`postcss-start-to-end`](https://github.com/sandrina-p/postcss-start-to-end) lets you control your layout (LTR or RTL) through logical rather than direction / physical rules.postcss-start-to-end 允许您通过逻辑规则而不是方向/物理规则来控制布局（LTR 或 RTL）。
- [`postcss-subgrid`](https://github.com/seaneking/postcss-subgrid) provides a basic shim for the CSS `display: subgrid` spec.postcss-subgrid 为 CSS 显示提供了一个基本的垫片：subgrid 规范。
- [`mq4-hover-shim`](https://github.com/twbs/mq4-hover-shim) supports the `@media (hover)` feature.mq4-hover-shim 支持 @media（悬停）功能。

See also [`postcss-preset-env`](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) plugins pack to add future CSS syntax by one line of code.另请参阅 postcss-preset-env 插件包，通过一行代码添加未来的 CSS 语法。

## Fallbacks后备措施

- [`postcss-color-rgba-fallback`](https://github.com/postcss/postcss-color-rgba-fallback) transforms `rgba()` to hexadecimal.postcss-color-rgba-fallback 将 rgba() 转换为十六进制。
- [`postcss-disabled`](https://github.com/cocco3/postcss-disabled) adds a `[disabled]` attribute and/or a `.disabled` class when the `:disabled` pseudo class is present.当 :disabled 伪类存在时，postcss-disabled 添加 [disabled] 属性和/或 .disabled 类。
- [`postcss-epub`](https://github.com/Rycochet/postcss-epub) adds the `-epub-` prefix to relevant properties.postcss-epub 将 -epub- 前缀添加到相关属性中。
- [`postcss-esplit`](https://github.com/vitaliyr/postcss-esplit) splits your CSS exceeding 4095 selectors for IE.postcss-esplit 为 IE 拆分超过 4095 个选择器的 CSS。
- [`postcss-fallback`](https://github.com/MadLittleMods/postcss-fallback) adds `fallback` function to avoid duplicate declarations.postcss-fallback 添加后备功能以避免重复声明。
- [`postcss-filter-gradient`](https://github.com/yuezk/postcss-filter-gradient) adds gradient filter for the old IE.postcss-filter-gradient 为旧版 IE 添加渐变过滤器。
- [`postcss-flexibility`](https://github.com/7rulnik/postcss-flexibility) adds `-js-` prefix for [`Flexibility polyfill`](https://github.com/10up/flexibility).postcss-flexibility 为 Flexibility polyfill 添加 -js- 前缀。
- [`postcss-gradient-transparency-fix`](https://github.com/gilmoreorless/postcss-gradient-transparency-fix) transforms `transparent` values in gradients to support Safari's different color interpolation.postcss-gradient-transparency-fix 转换渐变中的透明值以支持 Safari 的不同颜色插值。
- [`postcss-hash-classname`](https://github.com/ctxhou/postcss-hash-classname) append hash string to your css class name.postcss-hash-classname 将哈希字符串附加到您的 css 类名中。
- [`postcss-mqwidth-to-class`](https://github.com/notacouch/postcss-mqwidth-to-class) converts min/max-width media queries to classes.postcss-mqwidth-to-class 将最小/最大宽度媒体查询转换为类。
- [`postcss-opacity`](https://github.com/iamvdo/postcss-opacity) adds opacity filter for IE8.postcss-opacity 为 IE8 添加不透明度过滤器。
- [`postcss-opacity-percentage`](https://github.com/Dreamseer/postcss-opacity-percentage) transforms CSS4 percentage-based `opacity` values to float values.postcss-opacity-percentage 将 CSS4 基于百分比的不透明度值转换为浮点值。
- [`postcss-page-break`](https://github.com/shrpne/postcss-page-break) adds `page-break-` fallback to `break-` properties.postcss-page-break 将 page-break- 后备添加到 break- 属性。
- [`postcss-pseudoelements`](https://github.com/axa-ch/postcss-pseudoelements) Convert `::` selectors into `:` selectors for IE 8 compatibility.postcss-pseudoelements 将 :: 选择器转换为 : 选择器以兼容 IE 8。
- [`postcss-redundant-color-vars`](https://github.com/caseyjacobson/postcss-redundant-color-vars) adds custom property for certain border and box-shadow declarations to fix a known Safari bugpostcss-redundant-color-vars 为某些边框和 box-shadow 声明添加了自定义属性，以修复已知的 Safari 错误
- [`postcss-replace-overflow-wrap`](https://github.com/MattDiMu/postcss-replace-overflow-wrap) replace `overflow-wrap` with `word-wrap`.postcss-replace-overflow-wrap 将overflow-wrap 替换为word-wrap。
- [`postcss-round-subpixels`](https://github.com/himynameisdave/postcss-round-subpixels) plugin that rounds sub-pixel values to the nearest full pixel.postcss-round-subpixels 插件，将子像素值四舍五入到最接近的完整像素。
- [`postcss-unmq`](https://github.com/csstools/postcss-unmq) removes media queries while preserving desktop rules for IE≤8.postcss-unmq 删除媒体查询，同时保留 IE≤8 的桌面规则。
- [`postcss-vmin`](https://github.com/iamvdo/postcss-vmin) generates `vm` fallback for `vmin` unit in IE9.postcss-vmin 为 IE9 中的 vmin 单元生成 vm 后备。
- [`postcss-will-change`](https://github.com/postcss/postcss-will-change) inserts 3D hack before `will-change` property.postcss-will-change 在 will-change 属性之前插入 3D hack。
- [`autoprefixer`](https://github.com/postcss/autoprefixer) adds vendor prefixes for you, using data from Can I Use.autoprefixer 使用 Can I Use 中的数据为您添加供应商前缀。
- [`postcss-pie`](https://github.com/gucong3000/postcss-pie) makes IE several of the most useful CSS3 decoration features.postcss-pie 使 IE 具有几个最有用的 CSS3 装饰功能。
- [`cssgrace`](https://github.com/cssdream/cssgrace) provides various helpers and transpiles CSS 3 for IE and other old browsers.cssgrace 为 IE 和其他旧浏览器提供各种帮助程序和转译 CSS 3。
- [`pixrem`](https://github.com/robwierzbowski/node-pixrem) generates pixel fallbacks for `rem` units.pixrem 生成 rem 单位的像素回退。
- [`postcss-fixie`](https://github.com/tivac/fixie) adds easy and painless IE hackspostcss-fixie 添加了简单轻松的 IE 破解
- [`postcss-safe-area`](https://github.com/plegner/postcss-safe-area) adds browser fallbacks for `safe-area-inset` `env` variables.postcss-safe-area 添加了 safe-area-inset 环境变量的浏览器回退。
- [`webp-in-css`](https://github.com/ai/webp-in-css) to use WebP background images in CSS.webp-in-css 在 CSS 中使用 WebP 背景图像。
- [`postcss-clamp`](https://github.com/polemius/postcss-clamp) transform `clamp()` to combination of `min/max`postcss-clamp 将钳位（）转换为最小/最大的组合
- [`postcss-spring-easing`](https://github.com/okikio/postcss-spring-easing) replaces `spring()` with a resulting `linear()` function and add a `--spring-duration` css variable.postcss-spring-easing 用生成的 Linear() 函数替换 spring() 并添加 --spring-duration css 变量。

See also [`oldie`](https://github.com/csstools/oldie) plugins pack.另请参阅老式插件包。

## Language Extensions语言扩展

- [`postcss-aspect-ratio`](https://github.com/arccoza/postcss-aspect-ratio) fix an element's dimensions to an aspect ratio.postcss-aspect-ratio 将元素的尺寸固定为长宽比。
- [`postcss-atroot`](https://github.com/OEvgeny/postcss-atroot) place rules directly at the root node.postcss-atroot 将规则直接放置在根节点上。
- [`postcss-bem-fix`](https://github.com/supermonkeyz/postcss-bem-fix) adds at-rules for BEM and SUIT style classes.postcss-bem-fix 为 BEM 和 SUIT 样式类添加了 at 规则。
- [`postcss-click`](https://github.com/ismamz/postcss-click) allows to use the `:click` pseudo class and implement it in JavaScript.postcss-click 允许使用 :click 伪类并在 JavaScript 中实现它。
- [`postcss-compact-mq`](https://github.com/rominmx/postcss-compact-mq) provides compact syntax for media queries based on viewport width.postcss-compact-mq 为基于视口宽度的媒体查询提供紧凑语法。
- [`postcss-conditionals`](https://github.com/andyjansson/postcss-conditionals) adds `@if` statements.postcss-conditionals 添加了 @if 语句。
- [`postcss-css-variables`](https://github.com/MadLittleMods/postcss-css-variables) supports variables for selectors, and at-rules using W3C similar syntax.postcss-css-variables 支持选择器的变量，以及使用 W3C 类似语法的 at-rules。
- [`postcss-current-selector`](https://github.com/komlev/postcss-current-selector) to get current selector in declaration.postcss-current-selector 获取声明中的当前选择器。
- [`postcss-define-property`](https://github.com/daleeidd/postcss-define-property) to define properties shortcut.postcss-define-property 定义属性的快捷方式。
- [`postcss-define-function`](https://github.com/titancat/postcss-define-function) to implement Sass `@function` directive.postcss-define-function 来实现 Sass @function 指令。
- [`postcss-each`](https://github.com/outpunk/postcss-each) adds `@each` statement.postcss-each 添加了 @each 语句。
- [`postcss-for`](https://github.com/antyakushev/postcss-for) adds `@for` loops.postcss-for 添加 @for 循环。
- [`postcss-at-rules-variables`](https://github.com/GitScrum/postcss-at-rules-variables) adds support for custom properties in `@for`, `@each`, `@if`, etc.postcss-at-rules-variables 添加了对 @for、@each、@if 等中自定义属性的支持。
- [`postcss-functions`](https://github.com/andyjansson/postcss-functions) enables exposure of JavaScript functions.postcss-functions 允许公开 JavaScript 函数。
- [`postcss-if-media`](https://github.com/arccoza/postcss-if-media) inline or nest media queries within CSS rules & properties.postcss-if-media CSS 规则和属性中的内联或嵌套媒体查询。
- [`postcss-inline-media`](https://github.com/dimitrinicolas/postcss-inline-media) inline multiple media queries into CSS property values.postcss-inline-media 将多个媒体查询内联到 CSS 属性值中。
- [`postcss-local-constants`](https://github.com/macropodhq/postcss-constants) adds support for localized constants.postcss-local-constants 添加了对本地化常量的支持。
- [`postcss-map`](https://github.com/pascalduez/postcss-map) enables configuration maps.postcss-map 启用配置映射。
- [`postcss-match`](https://github.com/rtsao/postcss-match) adds `@match` for [Rust-style pattern matching](https://doc.rust-lang.org/book/match.html).postcss-match 添加了 @match 以进行 Rust 风格的模式匹配。
- [`postcss-mixins`](https://github.com/postcss/postcss-mixins) enables mixins more powerful than Sass’, defined within stylesheets or in JS.postcss-mixins 使 mixins 比 Sass 更强大，在样式表或 JS 中定义。
- [`postcss-media-variables`](https://github.com/WolfgangKluge/postcss-media-variables) adds support for `var()` and `calc()` in `@media` rulespostcss-media-variables 在 @media 规则中添加了对 var() 和 calc() 的支持
- [`postcss-modular-scale`](https://github.com/kristoferjoseph/postcss-modular-scale) adds a modular scale `ms()` function.postcss-modular-scale 添加了模块化缩放 ms() 函数。
- [`postcss-namespace`](https://github.com/totora0155/postcss-namespace) prefix a namespace to a selector.postcss-namespace 将命名空间作为选择器的前缀。
- [`postcss-nested`](https://github.com/postcss/postcss-nested) unwraps nested rules.postcss-nested 解开嵌套规则。
- [`postcss-nested-props`](https://github.com/jedmao/postcss-nested-props) unwraps nested properties.postcss-nested-props 解开嵌套属性。
- [`postcss-nested-vars`](https://github.com/jedmao/postcss-nested-vars) supports nested Sass-style variables.postcss-nested-vars 支持嵌套 Sass 风格的变量。
- [`postcss-pseudo-class-any-button`](https://github.com/andrepolischuk/postcss-pseudo-class-any-button) adds `:any-button` pseudo-class for targeting all button elements.postcss-pseudo-class-any-button 添加 :any-button 伪类以定位所有按钮元素。
- [`postcss-pseudo-class-enter`](https://github.com/csstools/postcss-pseudo-class-enter) transforms `:enter` into `:hover` and `:focus`.postcss-pseudo-class-enter 将 :enter 转换为 :hover 和 :focus。
- [`postcss-quantity-queries`](https://github.com/pascalduez/postcss-quantity-queries) enables quantity queries.postcss-quantity-queries 启用数量查询。
- [`postcss-ref`](https://github.com/morishitter/postcss-ref) refers properties from another rule.postcss-ref 引用另一个规则的属性。
- [`postcss-reverse-media`](https://github.com/MadLittleMods/postcss-reverse-media) reverse/Invert media query parameters.postcss-reverse-media 反向/反转媒体查询参数。
- [`postcss-sassy-mixins`](https://github.com/andyjansson/postcss-sassy-mixins) enables mixins with Sass keywords.postcss-sassy-mixins 启用带有 Sass 关键字的 mixins。
- [`postcss-map-get`](https://github.com/GitScrum/postcss-map-get) adds the ability to use Sass like map function `map-get`.postcss-map-get 添加了使用 Sass 的功能，如地图函数 map-get。
- [`postcss-simple-extend`](https://github.com/davidtheclark/postcss-simple-extend) lightweight extending of silent classes, like Sass’ `@extend`.postcss-simple-extend 静默类的轻量级扩展，如 Sass 的 @extend。
- [`postcss-simple-vars`](https://github.com/postcss/postcss-simple-vars) supports for Sass-style variables.postcss-simple-vars 支持 Sass 风格的变量。
- [`postcss-strip-units`](https://github.com/whitneyit/postcss-strip-units) strips units off of property values.postcss-strip-units 将单位从属性值中剥离。
- [`postcss-vertical-rhythm`](https://github.com/markgoodyear/postcss-vertical-rhythm) adds a vertical rhythm unit based on `font-size` and `line-height`.postcss-vertical-rhythm 根据 font-size 和 line-height 添加垂直节奏单元。
- [`postcss-vertical-rhythm-function`](https://github.com/F21/postcss-vertical-rhythm-function) adds a vertical rhythm `vr()` function that is unit agnostic and works in situations where the font-size cannot be calculated during build time.postcss-vertical-rhythm-function 添加了一个垂直节奏 vr() 函数，该函数与单位无关，并且在构建期间无法计算字体大小的情况下工作。
- [`postcss-responsive-properties`](https://github.com/alexandr-solovyov/postcss-responsive-properties) allows you to write responsive property values.postcss-responsive-properties 允许您编写响应式属性值。
- [`postcss-text-remove-gap`](https://github.com/m18ru/postcss-text-remove-gap) remove space before and after text strings, added by line-height and extra space in glyph itself.postcss-text-remove-gap 删除文本字符串前后的空格，由行高和字形本身的额外空格添加。
- [`postcss-closest`](https://github.com/m18ru/postcss-closest) plugin to modify closest matching part of current selector.postcss-closest 插件用于修改当前选择器最接近的匹配部分。
- [`csstyle`](https://github.com/geddski/csstyle) adds components workflow to your styles.csstyle 将组件工作流程添加到您的样式中。
- [`postcss-percentage`](https://github.com/creeperyang/postcss-percentage) support Sass-like `percentage()` function.postcss-percentage 支持类似 Sass 的 Percentage() 函数。
- [`postcss-custom-css-units`](https://github.com/joe223/postcss-custom-css-units) Define custom css units and convert them to CSS variables.postcss-custom-css-units 定义自定义 css 单元并将其转换为 CSS 变量。
- [`postcss-easy-z`](https://github.com/CSSSR/postcss-easy-z) lets you organize z-indices by declaring relations between them.postcss-easy-z 允许您通过声明 z 索引之间的关系来组织 z 索引。
- [`@csstools/postcss-design-tokens`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-design-tokens) lets you import and use design tokens from CSS.@csstools/postcss-design-tokens 允许您从 CSS 导入和使用设计令牌。

## Colors颜色

- [`postcss-ase-colors`](https://github.com/dfernandez79/postcss-ase-colors) replaces color names with values read from an ASE palette file.postcss-ase-colors 用从 ASE 调色板文件读取的值替换颜色名称。
- [`postcss-brand-colors`](https://github.com/postcss/postcss-brand-colors) inserts company brand colors in the `brand-colors` module.postcss-brand-colors 在品牌颜色模块中插入公司品牌颜色。
- [`postcss-color-alpha`](https://github.com/avanes/postcss-color-alpha) transforms `#hex.a`, `black(alpha)` and `white(alpha)` to `rgba()`.postcss-color-alpha 将#hex.a、黑色(alpha) 和白色(alpha) 转换为rgba()。
- [`postcss-color-hcl`](https://github.com/devgru/postcss-color-hcl) transforms `hcl(H, C, L)` and `hcl(H, C, L, alpha)` to `#rgb` and `rgba()`.postcss-color-hcl 将 hcl(H, C, L) 和 hcl(H, C, L, alpha) 转换为 #rgb 和 rgba()。
- [`postcss-color-hexa`](https://github.com/nicksheffield/postcss-color-hexa) transforms `hexa(hex, alpha)` into `rgba` format.postcss-color-hexa 将 hexa(hex, alpha) 转换为 rgba 格式。
- [`postcss-color-mix`](https://github.com/iamstarkov/postcss-color-mix) mixes two colors together.postcss-color-mix 将两种颜色混合在一起。
- [`postcss-color-palette`](https://github.com/zaim/postcss-color-palette) transforms CSS 2 color keywords to a custom palette.postcss-color-palette 将 CSS 2 颜色关键字转换为自定义调色板。
- [`postcss-color-pantone`](https://github.com/longdog/postcss-color-pantone) transforms pantone color to RGB.postcss-color-pantone 将 pantone 颜色转换为 RGB。
- [`postcss-color-scale`](https://github.com/kristoferjoseph/postcss-color-scale) adds a color scale `cs()` function.postcss-color-scale 添加了色标 cs() 函数。
- [`postcss-color-short`](https://github.com/andrepolischuk/postcss-color-short) adds shorthand color declarations.postcss-color-short 添加简写颜色声明。
- [`postcss-color-yiq`](https://github.com/ben-eb/postcss-color-yiq) sets foreground colors using the YIQ color space.postcss-color-yiq 使用 YIQ 颜色空间设置前景色。
- [`postcss-colorblind`](https://github.com/btholt/postcss-colorblind) transforms colors using filters to simulate colorblindness.postcss-colorblind 使用滤镜转换颜色来模拟色盲。
- [`postcss-contrast`](https://github.com/stephenway/postcss-contrast) checks background-color and gives either white or black.postcss-contrast 检查背景颜色并给出白色或黑色。
- [`postcss-dark-theme-class`](https://github.com/postcss/postcss-dark-theme-class) to force dark or light theme by custom switcher.postcss-dark-theme-class 通过自定义切换器强制深色或浅色主题。
- [`postcss-theme-colors`](https://github.com/ambar/postcss-theme-colors) add dark and light theme with color groups.postcss-theme-colors 添加带有颜色组的深色和浅色主题。
- [`postcss-hexrgba`](https://github.com/seaneking/postcss-hexrgba) adds shorthand hex `rgba(hex, alpha)` method.postcss-hexrgba 添加了简写 hex rgba(hex, alpha) 方法。
- [`postcss-rgb-plz`](https://github.com/himynameisdave/postcss-rgb-plz) converts 3 or 6 digit hex values to `rgb`.postcss-rgb-plz 将 3 或 6 位十六进制值转换为 RGB。
- [`postcss-rgba-hex`](https://github.com/XOP/postcss-rgba-hex) converts `rgba` values to `hex` analogues.postcss-rgba-hex 将 rgba 值转换为十六进制类似物。
- [`postcss-shades-of-gray`](https://github.com/laureanoarcanio/postcss-shades-of-gray) helps keeping grayscale colors consistent to a gray palette.postcss-shades-of-gray 有助于保持灰度颜色与灰色调色板一致。
- [`colorguard`](https://github.com/SlexAxton/css-colorguard) helps maintain a consistent color palette.colorguard 有助于保持一致的调色板。
- [`postcss-get-color`](https://github.com/ismamz/postcss-get-color) get the prominent colors from an image.postcss-get-color 从图像中获取突出的颜色。
- [`postcss-randomcolor`](https://github.com/alanev/postcss-randomcolor) supports function to use random color.postcss-randomcolor 支持使用随机颜色的功能。

## Images and Fonts图像和字体

- [`avif-in-css`](https://github.com/nucliweb/avif-in-css) to use AVIF image format in CSS background.avif-in-css 在 CSS 背景中使用 AVIF 图像格式。
- [`postcss-assets`](https://github.com/borodean/postcss-assets) allows you to simplify URLs, insert image dimensions, and inline files.postcss-assets 允许您简化 URL、插入图像尺寸和内联文件。
- [`postcss-assets-rebase`](https://github.com/devex-web-frontend/postcss-assets-rebase) rebases assets from `url()`.postcss-assets-rebase 从 url() 重新设置资源的基础。
- [`postcss-at2x`](https://github.com/simonsmith/postcss-at2x) handles retina background images via use of `at-2x` keyword.postcss-at2x 通过使用 at-2x 关键字处理视网膜背景图像。
- [`postcss-background-image-auto-size`](https://github.com/JustClear/postcss-background-image-auto-size) generates CSS rules `width` and `height` for `background-image` automatically.postcss-background-image-auto-size 自动生成背景图像的 CSS 规则宽度和高度。
- [`postcss-border-9-patch`](https://github.com/teaualune/postcss-border-9-patch) generates 9-patch like border styles via a custom rule.postcss-border-9-patch 通过自定义规则生成类似 9-patch 的边框样式。
- [`postcss-cachebuster`](https://github.com/glebmachine/postcss-cachebuster) adds version parameter to images and fontspostcss-cachebuster 为图像和字体添加版本参数
- [`postcss-copy-assets`](https://github.com/shutterstock/postcss-copy-assets) copies assets referenced by relative `url()`s into a build directory.postcss-copy-assets 将相对 url() 引用的资源复制到构建目录中。
- [`postcss-data-packer`](https://github.com/Ser-Gen/postcss-data-packer) moves embedded Base64 data to a separate file.postcss-data-packer 将嵌入的 Base64 数据移动到单独的文件中。
- [`postcss-easysprites`](https://github.com/glebmachine/postcss-easysprites) combine images to sprites, based on their image.png`#hash` and aspect ratio (`@2x`).postcss-easysprites 根据 image.png#hash 和宽高比 (@2x) 将图像组合到精灵中。
- [`postcss-icon-blender`](https://github.com/icon-blender/postcss-icon-blender) create custom SVG icon sets from over 80,000 free and open-source iconspostcss-icon-blender 从超过 80,000 个免费开源图标创建自定义 SVG 图标集
- [`postcss-image-set`](https://github.com/alex499/postcss-image-set) adds `background-image` with first image for `image-set()`.postcss-image-set 将背景图像添加到 image-set() 的第一个图像中。
- [`postcss-image-inliner`](https://github.com/bezoerb/postcss-image-inliner) inlines local and remote images.postcss-image-inliner 内联本地和远程图像。
- [`postcss-instagram`](https://github.com/azat-io/postcss-instagram) adds Instagram filters to `filter`.postcss-instagram 添加 Instagram 过滤器进行过滤。
- [`postcss-filter-tint`](https://github.com/alexlibby/postcss-filter-tint) adds tint filter to elements such as images.postcss-filter-tint 为图像等元素添加色调过滤器。
- [`postcss-foft-classes`](https://github.com/zachleat/postcss-foft-classes) adds guarding classes to blocks using web fonts for better font loading strategies.postcss-foft-classes 使用网络字体向块添加保护类，以实现更好的字体加载策略。
- [`postcss-font-awesome`](https://github.com/dan-gamble/postcss-font-awesome) adds an easy shortcut to font-awesome unicode codespostcss-font-awesome 添加了 font-awesome unicode 代码的简单快捷方式
- [`postcss-font-pack`](https://github.com/jedmao/postcss-font-pack) simplifies font declarations and validates they match configured font packs.postcss-font-pack 简化了字体声明并验证它们与配置的字体包匹配。
- [`postcss-fontsize`](https://github.com/richbachman/postcss-fontsize) generates `rem` unit `font-size` and `line-height` with `px` fallbacks.postcss-fontsize 生成 rem 单位字体大小和行高，并带有 px 回退。
- [`postcss-fontpath`](https://github.com/seaneking/postcss-fontpath) adds font links for different browsers.postcss-fontpath 添加不同浏览器的字体链接。
- [`postcss-font-grabber`](https://github.com/AaronJan/postcss-font-grabber) it grabs remote fonts in `@font-face`, download them and update your CSS.postcss-font-grabber 它会抓取@font-face中的远程字体，下载它们并更新你的CSS。
- [`postcss-lazyimagecss`](https://github.com/Jeff2Ma/postcss-lazyimagecss) adds image width and height automatically.postcss-lazyimagecss 自动添加图像宽度和高度。
- [`postcss-lazysprite`](https://github.com/Jeff2Ma/postcss-lazysprite) generates sprites from the directory of images.postcss-lazysprite 从图像目录生成精灵。
- [`postcss-placehold`](https://github.com/awayken/postcss-placehold) makes it easy to drop in placeholder images.postcss-placehold 可以轻松放置占位符图像。
- [`postcss-resemble-image`](https://github.com/ben-eb/postcss-resemble-image) provides a gradient fallback for an image that loosely resembles the original.postcss-resemble-image 为与原始图像大致相似的图像提供渐变回退。
- [`postcss-resolve-urls`](https://github.com/bognarlaszlo/postcss-resolve-urls) resolves relative urls referenced in `url()`spostcss-resolve-urls 解析 url()s 中引用的相对 url
- [`postcss-responsive-images`](https://github.com/azat-io/postcss-responsive-images) adds stylesheets for making your images responsive.postcss-responsive-images 添加了样式表，使您的图像具有响应能力。
- [`postcss-sprites`](https://github.com/2createStudio/postcss-sprites) generates CSS sprites from stylesheets.postcss-sprites 从样式表生成 CSS 精灵。
- [`postcss-svg`](https://github.com/Pavliko/postcss-svg) insert inline SVG to CSS and allows to manage it colors.postcss-svg 将内联 SVG 插入 CSS 并允许管理它的颜色。
- [`postcss-svg-fallback`](https://github.com/justim/postcss-svg-fallback) converts SVG in your CSS to PNG files for IE 8.postcss-svg-fallback 将 CSS 中的 SVG 转换为适用于 IE 8 的 PNG 文件。
- [`postcss-svgo`](https://github.com/ben-eb/postcss-svgo) processes inline SVG through [SVGO](https://github.com/svg/svgo).postcss-svgo 通过 SVGO 处理内联 SVG。
- [`postcss-unicode-characters`](https://github.com/ben-eb/postcss-unicode-characters) makes it easier to write `unicode-range` descriptors.postcss-unicode-characters 使编写 unicode-range 描述符变得更容易。
- [`postcss-url`](https://github.com/postcss/postcss-url) rebases or inlines `url()`s.postcss-url 变基或内联 url()。
- [`postcss-urlrebase`](https://github.com/strarsis/postcss-urlrebase) rebases `url()`s to a given root URL.postcss-urlrebase 将 url() 重新设置为给定的根 URL。
- [`postcss-urlrev`](https://github.com/yuezk/postcss-urlrev) adds MD5 hash strings to `url()`s.postcss-urlrev 将 MD5 哈希字符串添加到 url() 中。
- [`postcss-write-svg`](https://github.com/csstools/postcss-write-svg) write inline SVGs in CSS.postcss-write-svg 在 CSS 中写入内联 SVG。
- [`postcss-inline-svg`](https://github.com/TrySound/postcss-inline-svg) inline SVG images and customize their styles.postcss-inline-svg 内联 SVG 图像并自定义其样式。
- [`webpcss`](https://github.com/lexich/webpcss) adds URLs for WebP images for browsers that support WebP.webpcss 为支持 WebP 的浏览器添加 WebP 图像的 URL。
- [`webp-in-css`](https://github.com/ai/webp-in-css) to use WebP image format in CSS background.webp-in-css 在 CSS 背景中使用 WebP 图像格式。

## Grids网格

- [`postcss-grid`](https://github.com/andyjansson/postcss-grid) adds a semantic grid system.postcss-grid 添加了语义网格系统。
- [`postcss-grid-kiss`](https://github.com/sylvainpolletvillard/postcss-grid-kiss) transforms ASCII-art grids into CSS Grid layout.postcss-grid-kiss 将 ASCII-art 网格转换为 CSS 网格布局。
- [`postcss-grid-system`](https://github.com/francoisromain/postcss-grid-system) creates grids based on a fixed column width.postcss-grid-system 基于固定的列宽创建网格。
- [`postcss-grid-fluid`](https://github.com/francoisromain/postcss-grid-fluid) creates fluid grids.postcss-grid-fluid 创建流体网格。
- [`postcss-layout`](https://github.com/arccoza/postcss-layout) a plugin for some common CSS layout patterns and a Grid system.postcss-layout 是一些常见 CSS 布局模式和网格系统的插件。
- [`postcss-maze`](https://github.com/cathydutton/postcss-maze) is a mobile first, semantic responsive grid to suit any design pattern.postcss-maze 是一个移动优先、语义响应式网格，适合任何设计模式。
- [`postcss-neat`](https://github.com/jo-asakura/postcss-neat) is a semantic and fluid grid framework.postcss-neat 是一个语义和流动的网格框架。
- [`postcss-oldschool-grid`](https://github.com/lordgiotto/postcss-oldschool-grid) is a grid system with wrapping columns and padding gutters.postcss-oldschool-grid 是一个带有包裹列和填充槽的网格系统。
- [`postcss-simple-grid`](https://github.com/admdh/postcss-simple-grid) create grid with one line.postcss-simple-grid 用一行创建网格。
- [`lost`](https://github.com/corysimmons/lost) feature-rich `calc()` grid system by Jeet author.丢失了 Jeet 作者的功能丰富的 calc() 网格系统。

## Optimizations优化

- [`postcss-calc`](https://github.com/postcss/postcss-calc) reduces `calc()` to values (when expressions involve the same units).postcss-calc 将 calc() 简化为值（当表达式涉及相同单位时）。
- [`postcss-remove-nested-calc`](https://github.com/nico-jacobs/postcss-remove-nested-calc) `calc(100vw - calc(20% - 10px))` to `calc(100vw - (20% - 10px))` for IE 11 compatibility.postcss-remove-nested-calc calc(100vw - calc(20% - 10px)) 到 calc(100vw - (20% - 10px)) 以实现 IE 11 兼容性。
- [`postcss-class-name-shortener`](https://github.com/mbrandau/postcss-class-name-shortener) shortens CSS class names to optimize website performance.postcss-class-name-shortener 缩短 CSS 类名称以优化网站性能。
- [`postcss-combine-duplicated-selectors`](https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors) automatically join identical selectors.postcss-combine-duplicated-selectors 自动连接相同的选择器。
- [`postcss-filter-mq`](https://github.com/simeydotme/postcss-filter-mq) Filter all matching or non-matching media queries.postcss-filter-mq 过滤所有匹配或不匹配的媒体查询。
- [`postcss-import`](https://github.com/postcss/postcss-import) inlines the stylesheets referred to by `@import` rules.postcss-import 内联@import 规则引用的样式表。
- [`postcss-nested-import`](https://github.com/eriklharper/postcss-nested-import) inlines stylesheets referred to by `@import` rules inside nested rule blocks.postcss-nested-import 嵌套规则块内的 @import 规则引用的内联样式表。
- [`postcss-partial-import`](https://github.com/csstools/postcss-partial-import) inlines standard imports and Sass-like partials.postcss-partial-import 内联标准导入和类似 Sass 的部分。
- [`postcss-reference`](https://github.com/dehuszar/postcss-reference) emulates Less’s `@import`.postcss-reference 模拟 Less 的 @import。
- [`postcss-remove-root`](https://github.com/cbracco/postcss-remove-root) removes all instances of `:root` from a stylesheet.postcss-remove-root 从样式表中删除 :root 的所有实例。
- [`postcss-single-charset`](https://github.com/hail2u/postcss-single-charset) ensures that there is one and only one `@charset` rule at the top of file.postcss-single-charset 确保文件顶部只有一个 @charset 规则。
- [`postcss-zindex`](https://github.com/ben-eb/postcss-zindex) rebases positive `z-index` values.postcss-zindex 重新调整正 z-index 值。
- [`postcss-unprefix`](https://github.com/gucong3000/postcss-unprefix) Unprefixes vendor prefixes in legacy CSS.postcss-unprefix 取消旧 CSS 中供应商前缀的前缀。
- [`css-byebye`](https://github.com/AoDev/css-byebye) removes the CSS rules that you don’t want.css-byebye 删除您不需要的 CSS 规则。
- [`css-mqpacker`](https://github.com/hail2u/node-css-mqpacker) joins matching CSS media queries into a single statement.css-mqpacker 将匹配的 CSS 媒体查询连接到单个语句中。
- [`stylehacks`](https://github.com/ben-eb/stylehacks) removes CSS hacks based on browser support.stylehacks 根据浏览器支持删除 CSS hack。
- [`postcss-mq-optimize`](https://github.com/panec/postcss-mq-optimize) removes invalid media queries or its expressions.postcss-mq-optimize 删除无效的媒体查询或其表达式。
- [`postcss-uncss`](https://github.com/RyanZim/postcss-uncss) removes unused CSS from your stylesheets.postcss-uncss 从样式表中删除未使用的 CSS。
- [`postcss-html-filter`](https://github.com/mapbox/postcss-html-filter) filters out CSS that does not apply to the HTML you provide.postcss-html-filter 过滤掉不适用于您提供的 HTML 的 CSS。
- [`postcss-no-important`](https://github.com/DUBANGARCIA/postcss-no-important) delete declarations !important.postcss-no-important 删除声明！重要。
- [`postcss-deep-scopable`](https://github.com/litt1e-p/postcss-deep-scopable) unified deep scoped style for Vue.js.postcss-deep-scopable Vue.js 的统一深度范围样式。
- [`postcss-deadcss`](https://github.com/DenyVeyten/postcss-deadcss) helps to find dead CSS in stylesheets.postcss-deadcss 有助于查找样式表中无效的 CSS。
- [`postcss-variable-compress`](https://github.com/navanshu/postcss-variable-compress) minifies css variables and saves you space.postcss-variable-compress 缩小 css 变量并节省空间。

See also plugins in modular minifier [`cssnano`](https://cssnano.co/).另请参阅模块化压缩器 cssnano 中的插件。

## Shortcuts快捷方式

- [`postcss-alias`](https://github.com/seaneking/postcss-alias) creates shorter aliases for properties.postcss-alias 为属性创建较短的别名。
- [`postcss-alias-atrules`](https://github.com/maximkoretskiy/postcss-alias-atrules) creates shorter aliases for at-rules.postcss-alias-atrules 为 at-rules 创建更短的别名。
- [`postcss-all-link-colors`](https://github.com/jedmao/postcss-all-link-colors) insert colors for link-related pseudo-classes.postcss-all-link-colors 插入链接相关伪类的颜色。
- [`postcss-border`](https://github.com/andrepolischuk/postcss-border) adds shorthand for width and color of all borders in `border` property.postcss-border 在 border 属性中添加了所有边框的宽度和颜色的简写。
- [`postcss-border-shortcut`](https://github.com/michelemazzucco/postcss-border-shortcut) PostCSS plugin for assign default `border` type if not expressed.postcss-border-shortcut PostCSS 插件，用于在未表达时分配默认边框类型。
- [`postcss-button`](https://github.com/francoisromain/postcss-button) creates buttons.postcss-button 创建按钮。
- [`postcss-center`](https://github.com/jedmao/postcss-center) centers elements.postcss-center 中心元素。
- [`postcss-circle`](https://github.com/jedmao/postcss-circle) inserts a circle with color.postcss-circle 插入一个带有颜色的圆圈。
- [`postcss-clearfix`](https://github.com/seaneking/postcss-clearfix) adds `fix` and `fix-legacy` properties to the `clear` declaration.postcss-clearfix 将fix 和fix-legacy 属性添加到clear 声明中。
- [`postcss-crip`](https://github.com/johnie/postcss-crip) shorthand properties for Crips that are too lazy to write.postcss-crip 懒得写的 Crips 的简写属性。
- [`postcss-default-unit`](https://github.com/antyakushev/postcss-default-unit) adds default unit to numeric CSS properties.postcss-default-unit 将默认单位添加到数字 CSS 属性中。
- [`postcss-easings`](https://github.com/postcss/postcss-easings) replaces easing names from easings.net with `cubic-bezier()` functions.postcss-easings 将 easings.net 中的缓动名称替换为cubic-bezier() 函数。
- [`postcss-filter`](https://github.com/alanev/postcss-filter) adds shorthand for black and white filter.postcss-filter 添加了黑白过滤器的简写。
- [`postcss-focus`](https://github.com/postcss/postcss-focus) adds `:focus` selector to every `:hover`.postcss-focus 将 :focus 选择器添加到每个 :hover 中。
- [`postcss-generate-preset`](https://github.com/simonsmith/postcss-generate-preset) allows quick generation of rules. Useful for creating repetitive utilities.postcss-generate-preset 允许快速生成规则。对于创建重复的实用程序很有用。
- [`postcss-hidden`](https://github.com/lukelarsen/postcss-hidden) allows for easy ways to hide elements.postcss-hidden 允许以简单的方式隐藏元素。
- [`postcss-input-style`](https://github.com/seaneking/postcss-input-style) adds new pseudo-elements for cross-browser styling of inputs.postcss-input-style 添加了新的伪元素，用于输入的跨浏览器样式。
- [`postcss-nested-ancestors`](https://github.com/toomuchdesign/postcss-nested-ancestors) reference any parent/ancestor selector in nested CSS.postcss-nested-ancestors 引用嵌套 CSS 中的任何父/祖先选择器。
- [`postcss-parent-selector`](https://github.com/domwashburn/postcss-parent-selector) adds a parent selector to the beginning of all rules.postcss-parent-selector 将父选择器添加到所有规则的开头。
- [`postcss-position`](https://github.com/seaneking/postcss-position) adds shorthand declarations for position attributes.postcss-position 添加了位置属性的简写声明。
- [`postcss-property-lookup`](https://github.com/simonsmith/postcss-property-lookup) allows referencing property values without a variable.postcss-property-lookup 允许在没有变量的情况下引用属性值。
- [`postcss-range-value`](https://github.com/soberwp/postcss-range-value) range value with a max and min value between two screen sizes.postcss-range-value 两个屏幕尺寸之间的最大值和最小值的范围值。
- [`postcss-responsive-type`](https://github.com/seaneking/postcss-responsive-type) changes `font-size` depends on screen size.postcss-responsive-type 更改字体大小取决于屏幕尺寸。
- [`postcss-scrib`](https://github.com/sneakertack/postcss-scrib) define your own aliases/shortcuts for properties or values.postcss-scrib 定义您自己的属性或值的别名/快捷方式。
- [`postcss-short-font-size`](https://github.com/csstools/postcss-short-font-size) extends `font-size` to define line-height s a second value.postcss-short-font-size 扩展了 font-size 来定义 line-height 的第二个值。
- [`postcss-short-position`](https://github.com/csstools/postcss-short-position) extends `position` to define edges as additional values.postcss-short-position 扩展了位置以将边缘定义为附加值。
- [`postcss-short-spacing`](https://github.com/csstools/postcss-short-spacing) extends `margin` and `padding` to allow or omitted edges.postcss-short-spacing 扩展边距和填充以允许或省略边缘。
- [`postcss-short-text`](https://github.com/csstools/postcss-short-text) adds a `text` shortcut property for several text-related properties.postcss-short-text 为几个与文本相关的属性添加了文本快捷方式属性。
- [`postcss-size`](https://github.com/postcss/postcss-size) adds a `size` shortcut that sets width and height with one declaration.postcss-size 添加了一个大小快捷方式，可以通过一个声明设置宽度和高度。
- [`postcss-speech-bubble`](https://github.com/archana-s/postcss-speech-bubble) adds speech bubbles of different kinds with just a couple of lines of CSS.postcss-speech-bubble 只需几行 CSS 即可添加不同类型的语音气泡。
- [`postcss-transform-shortcut`](https://github.com/csstools/postcss-transform-shortcut) allows shorthand transform properties in CSS.postcss-transform-shortcut 允许在 CSS 中简写转换属性。
- [`postcss-triangle`](https://github.com/jedmao/postcss-triangle) creates a triangle.postcss-triangle 创建一个三角形。
- [`postcss-typescale`](https://github.com/francoisromain/postcss-typescale) sets type based on a typographic scale.postcss-typescale 根据印刷比例设置类型。
- [`postcss-verthorz`](https://github.com/davidhemphill/postcss-verthorz) adds vertical and horizontal spacing declarations.postcss-verthorz 添加垂直和水平间距声明。
- [`font-magician`](https://github.com/csstools/postcss-font-magician) generates all the `@font-face` rules needed in CSS.font-magician 生成 CSS 中所需的所有 @font-face 规则。
- [`postcss-animation`](https://github.com/zhouwenbin/postcss-animation) PostCSS plugin that adds `@keyframes` from animate.css.postcss-animation PostCSS 插件，从 animate.css 添加 @keyframes。
- [`postcss-magic-animations`](https://github.com/nucliweb/postcss-magic-animations/) PostCSS plugin that adds `@keyframes` from Magic Animations.postcss-magic-animations PostCSS 插件添加来自 Magic Animations 的 @keyframes。

## Others其他的

- [`postcss-add-root-selector`] intelligently wraps all rules in a custom selector.[postcss-add-root-selector] 智能地将所有规则包装在自定义选择器中。
- [`postcss-alter-property-value`](https://github.com/kunukn/postcss-alter-property-value) alters your CSS declarations from a rule based configuration.postcss-alter-property-value 根据基于规则的配置更改 CSS 声明。
- [`postcss-attribute-selector-prefix`](https://github.com/GitScrum/postcss-attribute-selector-prefix) adds a prefix to attribute selectorspostcss-attribute-selector-prefix 为属性选择器添加前缀
- [`postcss-auto-rem`] compiles pixel units to `rem` without configuration.[postcss-auto-rem] 将像素单位编译为 rem，无需配置。
- [`postcss-autoreset`](https://github.com/maximkoretskiy/postcss-autoreset) automatically adds reset styles.postcss-autoreset 自动添加重置样式。
- [`postcss-bem-to-js`](https://github.com/WebSeed/postcss-bem-to-js) creates a JavaScript definition file for BEM-style CSS.postcss-bem-to-js 为 BEM 风格的 CSS 创建一个 JavaScript 定义文件。
- [`postcss-bom`](https://github.com/dichuvichkin/postcss-bom) adds a UTF-8 BOM to files.postcss-bom 向文件添加 UTF-8 BOM。
- [`postcss-blurry-gradient-workaround`](https://github.com/strarsis/postcss-blurry-gradient-workaround) fixes blurry CSS gradients with too many explicit end-stops.postcss-blurry-gradient-workaround 修复了带有太多明确终点的模糊 CSS 渐变。
- [`postcss-camelcaser`](https://github.com/GMchris/postcss-camelcaser) transforms selectors to CamelCase.postcss-camelcaser 将选择器转换为 CamelCase。
- [`postcss-class-prefix`](https://github.com/thompsongl/postcss-class-prefix) adds a prefix/namespace to class selectors.postcss-class-prefix 向类选择器添加前缀/命名空间。
- [`postcss-classes-to-mixins`](https://github.com/nrkno/postcss-classes-to-mixins) converts classes to Sass, Less and Stylus mixinspostcss-classes-to-mixins 将类转换为 Sass、Less 和 Stylus mixins
- [`postcss-currency`](https://github.com/talgautb/postcss-currency) replaces name of currency with symbols.postcss-currency 用符号替换货币名称。
- [`postcss-d-ts`](https://github.com/askirmas/postcss-d-ts) generates `.d.ts` declaration for TypeScript `import` from used CSS classes and idspostcss-d-ts 为从使用的 CSS 类和 id 导入 TypeScript 生成 .d.ts 声明
- [`postcss-eol`](https://github.com/dichuvichkin/postcss-eol) replaces EOL of files.postcss-eol 替换文件的 EOL。
- [`postcss-extract-value`](https://github.com/lutien/postcss-extract-value) extracts values from css properties and puts them into variables.postcss-extract-value 从 css 属性中提取值并将其放入变量中。
- [`postcss-fakeid`](https://github.com/pathsofdesign/postcss-fakeid) transforms `#foo` IDs to attribute selectors `[id="foo"]`.postcss-fakeid 将 #foo ID 转换为属性选择器 [id="foo"]。
- [`postcss-filter-stream`](https://www.npmjs.com/package/postcss-filter-stream) blacklist files / folders that you don’t want to process with a PostCSS plugin.postcss-filter-stream 将您不想使用 PostCSS 插件处理的文件/文件夹列入黑名单。
- [`postcss-flexbox`](https://github.com/archana-s/postcss-flexbox) easy way to understand and start using CSS3 Flexbox.postcss-flexbox 是理解和开始使用 CSS3 Flexbox 的简单方法。
- [`postcss-flexbox-reset`](https://github.com/AndrejGajdos/postcss-flexbox-reset) resets Flexbox to avoid issues in responsive layouts.postcss-flexbox-reset 重置 Flexbox 以避免响应式布局中出现问题。
- [`postcss-flexboxfixer`](https://github.com/hallvors/postcss-flexboxfixer) unprefixes `-webkit-` only flexbox in legacy CSS.postcss-flexboxfixer 取消旧版 CSS 中的 -webkit- 前缀。
- [`postcss-flexbugs-fixes`](https://github.com/luisrudge/postcss-flexbugs-fixes) fixes some of known [flexbox bugs](https://github.com/philipwalton/flexbugs).postcss-flexbugs-fixes 修复了一些已知的 Flexbox 错误。
- [`postcss-gradientfixer`](https://github.com/hallvors/postcss-gradientfixer) unprefixes `-webkit-` only gradients in legacy CSS.postcss-gradientfixer 取消前缀 -webkit- 仅遗留 CSS 中的渐变。
- [`postcss-grid-reset`](https://github.com/AndrejGajdos/postcss-grid-reset) resets CSS Grid to avoid issues in responsive layouts.postcss-grid-reset 重置 CSS 网格以避免响应式布局中的问题。
- [`postcss-hash`](https://github.com/dacodekid/postcss-hash) replaces output file names with hash algorithms for cache busting.postcss-hash 使用哈希算法替换输出文件名以进行缓存清除。
- [`postcss-ie8`](https://github.com/4wdmedia/postcss-ie8) strips out unsupported properties and media queries for IE8.postcss-ie8 删除了 IE8 不支持的属性和媒体查询。
- [`postcss-increase-specificity`](https://github.com/MadLittleMods/postcss-increase-specificity) increases the specificity of your selectors.postcss-increase-speciality 增加了选择器的特异性。
- [`postcss-inline-rtl`](https://github.com/jakob101/postcss-inline-rtl) converts your CSS to right-to-left, but inline (adding just what you need).postcss-inline-rtl 将您的 CSS 转换为从右到左，但内联（仅添加您需要的内容）。
- [`postcss-join-transitions`](https://github.com/JGJP/postcss-join-transitions) joins conflicting transition declarations.postcss-join-transitions 连接冲突的转换声明。
- [`postcss-letter-tracking`](https://github.com/letsjaam/postcss-letter-tracking) generates relative, Photoshop-compatible letter tracking for improved letter spacing.postcss-letter-tracking 生成相对的、与 Photoshop 兼容的字母跟踪，以改善字母间距。
- [`postcss-light-text`](https://github.com/jdsteinbach/postcss-light-text) adds `-webkit-` antialiasing for light text.postcss-light-text 为浅文本添加了 -webkit- 抗锯齿功能。
- [`postcss-modules`](https://github.com/outpunk/postcss-modules) allows to use CSS Modules everywhere.postcss-modules 允许在任何地方使用 CSS 模块。
- [`postcss-momentum-scrolling`](https://github.com/solversgroup/postcss-momentum-scrolling) adding momentum style scrolling behavior (`-webkit-overflow-scrolling:touch`) for elements with overflow on iOS.postcss-momentum-scrolling 为 iOS 上溢出的元素添加动量样式滚动行为 (-webkit-overflow-scrolling:touch)。
- [`postcss-mq-keyframes`](https://github.com/TCotton/postcss-mq-keyframes) moves any animation keyframes in media queries to the end of the file.postcss-mq-keyframes 将媒体查询中的任何动画关键帧移动到文件末尾。
- [`postcss-mq-last`](https://github.com/JGJP/postcss-mq-last) gives media query rules precedence by moving them to the end of the file.postcss-mq-last 通过将媒体查询规则移动到文件末尾来赋予媒体查询规则优先级。
- [`postcss-node-modules-replacer`](https://github.com/dichuvichkin/postcss-node-modules-replacer) replaces path than includes `node_modules` to `~`.postcss-node-modules-replacer 将包含 node_modules 的路径替换为 ~.
- [`postcss-plugin-namespace`](https://github.com/ymrdf/postcss-plugin-namespace) add a css selector to all rules, so that CSS file don’t affect other element.postcss-plugin-namespace 为所有规则添加一个 css 选择器，以便 CSS 文件不会影响其他元素。
- [`postcss-prefix-hover`](https://github.com/larsmunkholm/postcss-prefix-hover) adds a prefixed to any selector containing `:hover`.postcss-prefix-hover 为任何包含 :hover 的选择器添加前缀。
- [`postcss-pseudo-content-insert`](https://github.com/liquidlight/postcss-pseudo-content-insert) adds `content: ''` to `:before` and `:after` if it is missing.postcss-pseudo-content-insert 将 content: '' 添加到 :before 和 :after 如果丢失的话。
- [`postcss-pseudo-element-cases`](https://github.com/timelsass/postcss-pseudo-element-cases) converts `.style::BEFORE` into `.style::before` and vice versa.postcss-pseudo-element-cases 将 .style::BEFORE 转换为 .style::before ，反之亦然。
- [`postcss-pseudo-element-colons`](https://github.com/timelsass/postcss-pseudo-element-colons) converts `.style:before` into `.style::before` and vice versa.postcss-pseudo-element-colons 将 .style:before 转换为 .style::before ，反之亦然。
- [`postcss-pseudo-elements-content`](https://github.com/omgovich/postcss-pseudo-elements-content) adds `content: ''` to `:before-c` and `:after-c`.postcss-pseudo-elements-content 将 content: '' 添加到 :before-c 和 :after-c 中。
- [`postcss-pxtorem`](https://github.com/cuth/postcss-pxtorem) converts pixel units to `rem`.postcss-pxtorem 将像素单位转换为 rem。
- [`postcss-raw`](https://github.com/MadLittleMods/postcss-raw) protects nodes inside `@raw` at-rules from being touched by other plugins.postcss-raw 保护 @raw at-rules 内的节点不被其他插件触及。
- [`postcss-remove-prefixes`](https://github.com/johnotander/postcss-remove-prefixes) removes vendor prefixes.postcss-remove-prefixes 删除供应商前缀。
- [`postcss-rtlcss`](https://github.com/elchininet/postcss-rtlcss) creates left-to-right and right-to-left rules in a single CSS file.postcss-rtlcss 在单个 CSS 文件中创建从左到右和从右到左的规则。
- [`postcss-safe-important`](https://github.com/Crimx/postcss-safe-important) adds `!important` to style declarations safely.postcss-safe-important 安全地将 !important 添加到样式声明中。
- [`postcss-sanitize`](https://github.com/eramdam/postcss-sanitize) remove properties and values using rules.postcss-sanitize 使用规则删除属性和值。
- [`postcss-scopify`](https://github.com/pazams/postcss-scopify) adds a user input scope to each selector.postcss-scopify 向每个选择器添加用户输入范围。
- [`postcss-select`](https://github.com/johnotander/postcss-select) select rules based off a selector list.postcss-select 基于选择器列表选择规则。
- [`postcss-selector-prefixer`](https://github.com/amaranter/postcss-selector-prefixer) adds a prefix to css selectors.postcss-selector-prefixer 为 css 选择器添加前缀。
- [`postcss-shorthand-expand`](https://github.com/johnotander/postcss-shorthand-expand) expands shorthand properties.postcss-shorthand-expand 扩展简写属性。
- [`postcss-simple-trig`](https://github.com/Rplus/postcss-simple-trig) calculate trigonometric functions: sin/cos/tan.postcss-simple-trig 计算三角函数：sin/cos/tan。
- [`postcss-sorting`](https://github.com/hudochenkov/postcss-sorting) sort rules content with specified order.postcss-sorting 按指定顺序对内容进行排序。
- [`postcss-sort-media-queries`](https://github.com/solversgroup/postcss-sort-media-queries) combine and sort CSS media queries with mobile first or desktop first methods.postcss-sort-media-queries 使用移动优先或桌面优先方法对 CSS 媒体查询进行组合和排序。
- [`postcss-style-guide`](https://github.com/morishitter/postcss-style-guide) generates a style guide automatically.postcss-style-guide 自动生成样式指南。
- [`css-declaration-sorter`](https://github.com/Siilwyn/css-declaration-sorter) sorts CSS declarations fast and automatically in a certain order.css-declaration-sorter 按一定顺序快速自动对 CSS 声明进行排序。
- [`perfectionist`](https://github.com/ben-eb/perfectionist) formats poorly written CSS and renders a “pretty” result.完美主义者格式化写得不好的 CSS 并呈现“漂亮”的结果。
- [`rtlcss`](https://github.com/MohammadYounes/rtlcss) mirrors styles for right-to-left locales.rtlcss 镜像从右到左语言环境的样式。
- [`stylefmt`](https://github.com/morishitter/stylefmt) modern CSS formatter that works well with `stylelint`.stylefmt 现代 CSS 格式化程序，与 stylelint 配合良好。
- [`postcss-autocorrect`](https://github.com/DimitrisNL/postcss-autocorrect) corrects typos and notifies in the console.postcss-auto Correct 纠正拼写错误并在控制台中发出通知。
- [`postcss-px-to-viewport`](https://github.com/evrone/postcss-px-to-viewport) generates viewport units (`vw`, `vh`, `vmin`, `vmax`) from `px` units.postcss-px-to-viewport 从 px 单位生成视口单位（vw、vh、vmin、vmax）。
- [`postcss-viewport-height-correction`](https://github.com/Faisal-Manzer/postcss-viewport-height-correction) solves the popular problem when `100vh` doesn’t fit the mobile browser screen.postcss-viewport-height- Correction 解决了 100vh 不适合移动浏览器屏幕的常见问题。
- [`postcss-unit-processor`](https://github.com/hex-ci/postcss-unit-processor) flexible processing of CSS units.postcss-unit-processor CSS单元的灵活处理。
- [`postcss-rem-to-px`](https://github.com/TheDutchCoder/postcss-rem-to-px) converts `rem` values to `px` values.postcss-rem-to-px 将 rem 值转换为 px 值。
- [`postcss-design-tokens`](https://github.com/jptaranto/postcss-design-tokens) provides a function to retrieve design tokens expressed in JS or JSON, within CSS.postcss-design-tokens 提供了在 CSS 中检索以 JS 或 JSON 表示的设计令牌的功能。
- [`postcss-pixel-to-remvw`](https://github.com/ben-lau/postcss-pixel-to-remvw) converting px to both of rem and vw, also one of thempostcss-pixel-to-remvw 将 px 转换为 rem 和 vw，也是其中之一
- [`postcss-easy-import`](https://github.com/TrySound/postcss-easy-import) inline `@import` rules content with extra features.postcss-easy-import 内联 @import 规则具有额外功能的内容。
- [`postcss-plugin-ignore-file`](https://github.com/RiadhAdrani/postcss-plugin-ignore-file) ignore file with a top-comment `/* @ignore */`.postcss-plugin-ignore-file 忽略带有顶部注释的文件 /* @ignore */。

## Analysis分析

- [`postcss-bem-linter`](https://github.com/postcss/postcss-bem-linter) lints CSS for conformance to SUIT CSS methodology.postcss-bem-linter 对 CSS 进行 lints 以符合 SUIT CSS 方法。
- [`postcss-cssstats`](https://github.com/cssstats/postcss-cssstats) returns an object with CSS statistics.postcss-cssstats 返回一个带有 CSS 统计信息的对象。
- [`postcss-regexp-detect`](https://github.com/devex-web-frontend/postcss-regexp-detect) search for regexp in CSS declarations.postcss-regexp-Detect 在 CSS 声明中搜索正则表达式。
- [`css2modernizr`](https://github.com/vovanbo/css2modernizr) creates a Modernizr config file that requires only the tests that your CSS uses.css2modernizr 创建一个 Modernizr 配置文件，该文件仅需要您的 CSS 使用的测试。
- [`doiuse`](https://github.com/anandthakker/doiuse) lints CSS for browser support, using data from Can I Use.doiuse lints CSS 以支持浏览器，使用 Can I Use 中的数据。
- [`immutable-css`](https://github.com/johnotander/immutable-css) lints CSS for class mutations.immutable-css lint CSS 类突变。
- [`list-selectors`](https://github.com/davidtheclark/list-selectors) lists and categorizes the selectors used in your CSS, for code review.list-selectors 列出 CSS 中使用的选择器并对其进行分类，以供代码审查。

## Reporters记者

- [`postcss-browser-reporter`](https://github.com/postcss/postcss-browser-reporter) displays warning messages from other plugins right in your browser.postcss-browser-reporter 在您的浏览器中显示来自其他插件的警告消息。
- [`postcss-forced-variables`](https://github.com/alekhrycaiko/postcss-forced-variables) provides warnings and errors when specified properties don’t use variables.当指定的属性不使用变量时，postcss-forced-variables 会提供警告和错误。
- [`postcss-reporter`](https://github.com/postcss/postcss-reporter) logs warnings and other messages from other plugins in the console.postcss-reporter 在控制台中记录来自其他插件的警告和其他消息。

## Fun乐趣

- [`postcss-australian-stylesheets`](https://github.com/dp-lewis/postcss-australian-stylesheets) Australian Style Sheets.postcss-australian-stylesheets 澳大利亚样式表。
- [`postcss-andalusian-stylesheets`](https://github.com/bameda/postcss-andalusian-stylesheets) Andalusian Style Sheets.postcss-andalusian-stylesheets 安达卢西亚样式表。
- [`postcss-aze-stylesheets`](https://github.com/iskandarovBakshi/postcss-aze-stylesheets) Azerbaijanian Style Sheets.postcss-aze-stylesheets 阿塞拜疆样式表。
- [`postcss-canadian-stylesheets`](https://github.com/chancancode/postcss-canadian-stylesheets) Canadian Style Sheets.postcss-canadian-stylesheets 加拿大样式表。
- [`postcss-chinese-stylesheets`](https://github.com/zhouwenbin/postcss-chinese-stylesheets) Chinese Style Sheets.postcss-chinese-stylesheets 中文样式表。
- [`postcss-czech-stylesheets`](https://github.com/HoBi/postcss-czech-stylesheets) Czech Style Sheets.postcss-czech-stylesheets 捷克样式表。
- [`postcss-german-stylesheets`](https://github.com/timche/postcss-german-stylesheets) German Style Sheets.postcss-german-stylesheets 德国样式表。
- [`postcss-italian-stylesheets`](https://github.com/Pustur/postcss-italian-stylesheets) Italian Style Sheets.postcss-italian-stylesheets 意大利样式表。
- [`postcss-russian-stylesheets`](https://github.com/Semigradsky/postcss-russian-stylesheets) Russian Style Sheets.postcss- Russian-stylesheets 俄罗斯样式表。
- [`postcss-swedish-stylesheets`](https://github.com/johnie/postcss-swedish-stylesheets) Swedish Style Sheets.postcss-swedish-stylesheets 瑞典样式表。
- [`postcss-tatar-stylesheets`](https://github.com/azat-io/postcss-tatar-stylesheets) Tatar Style Sheetspostcss-tatar-stylesheets 鞑靼样式表
- [`postcss-trolling`](https://github.com/juanfran/postcss-trolling) Trolling Style Sheets.postcss-trolling 恶搞样式表。
- [`postcss-lolcat-stylesheets`](https://github.com/sandralundgren/postcss-lolcat-stylesheets) Lolspeak Style Sheets.postcss-lolcat-stylesheets Lolspeak 样式表。
- [`postcss-imperial`](https://github.com/cbas/postcss-imperial) adds CSS support for Imperial and US customary units of length.postcss-imperial 添加了对英制和美国习惯长度单位的 CSS 支持。
- [`postcss-russian-units`](https://github.com/Semigradsky/postcss-russian-units) adds CSS support for russian units of length.postcss- Russian-units 添加了对俄语长度单位的 CSS 支持。
- [`postcss-pointer`](https://github.com/markgoodyear/postcss-pointer) Replaces `pointer: cursor` with `cursor: pointer`.postcss-pointer 用光标：指针替换指针：光标。
- [`postcss-spiffing`](https://github.com/HashanP/postcss-spiffing) lets you use British English in your CSS.postcss-spiffing 允许您在 CSS 中使用英式英语。
- [`postcss-spanish-stylesheets`](https://github.com/ismamz/postcss-spanish-stylesheets) Spanish Style Sheets.postcss-spanish-stylesheets 西班牙样式表。
- [`postcss-nope`](https://github.com/dariopog/postcss-nope) lets you write `nope` instead of `none`.postcss-nope 允许你写 nope 而不是 none。
- [`postcss-glitch`](https://github.com/crftd/postcss-glitch) add glitch effect to your text.postcss-glitch 为您的文本添加故障效果。
- [`postcss-khaleesi`](https://github.com/Hugoer/postcss-khaleesi) translate CSS values and properties to `khaleesi meme` language.postcss-khaleesi 将 CSS 值和属性翻译为 khaleesi meme 语言。