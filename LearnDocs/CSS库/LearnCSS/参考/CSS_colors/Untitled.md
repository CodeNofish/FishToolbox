

**CSS Color** 是一个处理颜色的 CSS 模块，包括颜色类型、颜色混合、不透明度、以及你如何将这些颜色和效果应用于 HTML 内容。



##### 属性



##### color

CSS color 属性设置元素的文本以及文本装饰的前景色颜色值，并设置 currentcolor 值。currentcolor 可以用作其他属性的间接值，且为其他颜色属性（如 border-color）的默认值。





##### 数据类型

一个 `<color>` 值可以以如下方式定义：

- 通过关键字：[``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/named-color)（例如 `blue` 和 `pink`）、[``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/system-color) 和 [`currentcolor`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value#currentcolor_关键字).
- 通过十六进制标记：[``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/hex-color)（例如 `#ff0000`）。
- 通过使用函数标记的颜色空间的参数：
  - [sRGB](https://zh.wikipedia.org/wiki/SRGB色彩空间) 颜色空间：[`hsl()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/hsl)、[`hwb()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb)、[`rgb()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/rgb)；
  - [CIELAB](https://zh.wikipedia.org/wiki/CIELAB色彩空间) 颜色空间：[`lab()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/lab)、[`lch()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/lch)；
  - [Oklab](https://bottosson.github.io/posts/oklab/) 颜色空间：[`oklab()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/oklab)、[`oklch()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/oklch)；
  - 其他颜色空间：[`color()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)。
- 通过混合两个颜色：[`color-mix()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/color-mix)。

```css
/* 命名颜色 */
rebeccapurple
aliceblue

/* RGB 十六进制 */
#f09
#ff0099

/* RGB（红、绿、蓝） */
rgb(255 0 153)
rgb(255 0 153 / 80%)

/* HSL（色相、饱和度、明度） */
hsl(150 30% 60%)
hsl(150 30% 60% / 0.8)

/* HWB（色相、白度、黑度）*/
hwb(12 50% 0%)
hwb(194 0% 0% / 0.5)

/* LAB（亮度、A 轴、B 轴） */
lab(50% 40 59.5)
lab(50% 40 59.5 / 0.5)

/* LCH（亮度、色度、色相） */
lch(52.2% 72.2 50)
lch(52.2% 72.2 50 / 0.5)

/* Oklab（亮度、A 轴、B 轴） */
oklab(59% 0.1 0.1)
oklab(59% 0.1 0.1 / 0.5)

/* Oklch（亮度、色度、色相） */
oklch(60% 0.15 50)
oklch(60% 0.15 50 / 0.5)
```



### [currentcolor 关键字](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value#currentcolor_关键字)

`currentcolor` 关键字表示元素的 [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color) 属性的值。这可以在默认情况下不接收 `color` 值的属性上使用 `color` 值。

如果 `currentcolor` 用于 `color` 属性的值，那么会给元素继承 `color` 属性的值。

```html
<div style="color: blue; border: 1px dashed currentcolor;">
  这个文本的颜色是蓝色。
  <div style="background: currentcolor; height:9px;"></div>
  这个块的边框也是蓝色。
</div>
```



### [缺失颜色成分](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value#缺失颜色成分)

每个 CSS 颜色函数的成分，除了使用旧版的逗号分隔语法的，都可以指定关键字 `none` 表示一个缺失的成分。

清晰地指定缺失的成分可用于[颜色插值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value#带有缺失成分时的插值)，可用于需要插值一些颜色成分但不插值其他颜色成分时。对于所有其他的目的，缺失的成分会相当于相应单位的零值：`0`、`0%` 或 `0deg`。例如，下面的颜色在不插值时是等价的：

```css
/* 这两个是等价的 */
color: oklab(50% none -0.25);
color: oklab(50% 0 -0.25);

/* 这两个是等价的 */
background-color: hsl(none 100% 50%);
background-color: hsl(0deg 100% 50%);
```



## 插值

颜色插值会发生在渐变、过渡和动画中。

当对 <color> 值进行插值时，它们首先会转换成指定的颜色空间，然后颜色成分的计算值会进行线性插值，插值速度由过渡和动画中的缓动函数决定。插值颜色空间默认为 Oklab，但是可以在一些与颜色相关的函数标记中通过 <color-interpolation-method> 覆盖。



