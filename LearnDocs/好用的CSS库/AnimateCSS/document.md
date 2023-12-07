https://animate.style/

[TOC]

# Animate.CSS

Animate.css 是一个即用型跨浏览器动画库，可在您的 Web 项目中使用。非常适合强调、主页、滑块和注意力引导提示。



## Installation and Usage

#### Installing

使用 npm 安装：

```cmd
npm install animate.css --save
```

或者使用 Yarn 安装（这仅适用于 Webpack、Parcel 等适当的工具。如果您没有使用任何工具来打包或捆绑代码，则可以简单地使用下面的 CDN 方法）：

```cmd
yarn add animate.css
```

将其导入到您的文件中：

```js
import 'animate.css';
```

或者使用 CDN 将其直接添加到您的网页：

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head>
```

#### Basic usage

安装 Animate.css 后，将 animate__animated 类以及任意动画名称添加到元素中（不要忘记 animate__ 前缀！）：

```html
<h1 class="animate__animated animate__bounce">An animated element</h1>
```

就是这样！您已经有了一个 CSS 动画元素。极好的！

动画可以改善界面的用户体验，但请记住，它们也会妨碍用户！请阅读最佳实践和陷阱部分，以尽可能最好的方式让您的网络事物变得栩栩如生。

#### Using @keyframes

尽管该库为您提供了一些帮助器类（例如动画类）来让您快速运行，但您可以直接使用提供的动画关键帧。这提供了一种在当前项目中使用 Animate.css 的灵活方法，而无需重构 HTML 代码。

```css
.my-element {
  display: inline-block;
  margin: 0 0.5rem;

  animation: bounce; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
}
```

请注意，某些动画依赖于动画类上设置的动画计时属性。更改或不声明可能会导致意想不到的结果。

#### CSS Custom Properties (CSS Variables)

从版本 4 开始，Animate.css 使用自定义属性（也称为 CSS 变量）来定义动画的持续时间、延迟和迭代。这使得 Animate.css 非常灵活且可定制。需要更改动画持续时间？只需在全局或本地设置一个新值即可。

```css
/* This only changes this particular animation duration */
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}

/* This changes all the animations globally */
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.9s;
}
```

自定义属性还可以轻松地动态更改所有动画的时间受限属性。这意味着您可以使用 JavaScript 单行代码实现慢动作或延时效果：

```js
// All animations will take twice the time to accomplish
document.documentElement.style.setProperty('--animate-duration', '2s');

// All animations will take half the time to accomplish
document.documentElement.style.setProperty('--animate-duration', '.5s');
```

尽管某些过时的浏览器不支持自定义属性，但 Animate.css 提供了适当的后备，扩大了对任何支持 CSS 动画的浏览器的支持。



## Utility Classes

Animate.css 附带了一些实用程序类来简化其使用。

#### Delay classes

您可以直接在元素的 class 属性上添加延迟，就像这样：

```html
<div class="animate__animated animate__bounce animate__delay-2s">Example</div>
```

Animate.css 提供以下延迟：

| Class name          | Default delay time |
| ------------------- | ------------------ |
| `animate__delay-2s` | `2s`               |
| `animate__delay-3s` | `3s`               |
| `animate__delay-4s` | `4s`               |
| `animate__delay-5s` | `5s`               |

提供的延迟为 1 到 5 秒。您可以自定义它们，将 --animate-delay 属性设置为更长或更短的持续时间：

```css
/* All delay classes will take 2x longer to start */
:root {
  --animate-delay: 2s;
}

/* All delay classes will take half the time to start */
:root {
  --animate-delay: 0.5s;
}
```

#### Slow, slower, fast, and Faster classes

您可以通过添加这些类来控制动画的速度，如下所示：

```html
<div class="animate__animated animate__bounce animate__faster">Example</div>
```

| Class name        | Default speed time |
| ----------------- | ------------------ |
| `animate__slow`   | `2s`               |
| `animate__slower` | `3s`               |
| `animate__fast`   | `800ms`            |
| `animate__faster` | `500ms`            |

请注意，某些动画的持续时间少于 1 秒。当我们使用 CSS calc() 函数时，通过 --animation-duration 属性设置持续时间将遵循这些比率。因此，当您更改全局持续时间时，所有动画都会响应该更改！

#### Repeating classes

您可以通过添加这些类来控制动画的迭代次数，如下所示：

```html
<div class="animate__animated animate__bounce animate__repeat-2">Example</div>
```

| Class Name          | Default iteration count |
| ------------------- | ----------------------- |
| `animate__repeat-1` | `1`                     |
| `animate__repeat-2` | `2`                     |
| `animate__repeat-3` | `3`                     |
| `animate__infinite` | `infinite`              |

与延迟和速度类一样，animate__repeat 类基于 --animate-repeat 属性，默认迭代计数为 1。您可以通过将 --animate-repeat 属性设置为更长或更短的值来自定义它们：

```css
/* The element will repeat the animation 2x
   It's better to set this property locally and not globally or
   you might end up with a messy situation */
.my-element {
  --animate-repeat: 2;
}
```

请注意，animate__infinite 不使用任何自定义属性，并且对 --animate-repeat 的更改将不起作用。不要忘记阅读最佳实践部分，以充分利用重复动画。



## Best Practices

动画可以极大地改善界面的用户体验，但重要的是要遵循一些指南，以免过度使用并降低网络事物的用户体验。遵循以下规则应该会提供一个良好的开始。

#### Meaningful animations 有意义的动画

您应该避免仅仅为了元素而对其进行动画处理。请记住，动画应该明确表达意图。诸如注意力吸引器（弹跳、闪光、脉冲等）之类的动画应该用于将用户的注意力吸引到界面中的特殊内容上，而不仅仅是作为一种为其带来“闪光”的方式。

入口和出口动画应该用于确定界面中发生的情况，清楚地表明它正在转换到新状态。

这并不意味着您应该避免向界面添加趣味性，只需确保动画不会妨碍用户，并且页面的性能不会因动画的过度使用而受到影响。

#### Don't animate large elements 不要为大元素设置动画

避免它，因为它不会给用户带来太多价值，而且可能只会引起混乱。除此之外，动画很可能会很垃圾，最终导致糟糕的用户体验。

#### Don't animate root elements 不要为根元素设置动画

对 <html/> 或 <body/> 标签进行动画处理是可能的，但您应该避免这样做。有一些报告指出这可能会引发一些奇怪的浏览器错误。此外，使整个页面弹跳很难为您的用户体验提供良好的价值。如果您确实需要这种效果，请将页面包装在一个元素中并为其设置动画，如下所示：

```html
<body>
  <main class="animate__animated animate__fadeInLeft">
    <!-- Your code -->
  </main>
</body>
```

#### Infinite animations should be avoided 应避免无限动画

尽管 Animate.css 提供了用于重复动画（包括无限动画）的实用程序类，但您应该避免无休止的动画。它只会分散用户的注意力，并可能惹恼他们中的很大一部分。所以，明智地使用它！

#### Mind the initial and final state of your elements 注意元素的初始和最终状态

所有 Animate.css 动画都包含一个名为“animation-fill-mode”的 CSS 属性，该属性控制动画前后元素的状态。你可以在这里读更多关于它的内容。 Animate.css 默认为animation-fill-mode：both，但您可以更改它以满足您的需要。

#### Don't disable the prefers-reduced-motion media query 不要禁用“prefers-reduced-motion”媒体查询

从版本 3.7.0 开始，Animate.css 支持prefers-reduced-motion 媒体查询，该查询根据操作系统对支持浏览器的偏好来禁用动画（大多数当前浏览器都支持它）。这是一项重要的辅助功能，切勿禁用！它内置于浏览器中，可以帮助患有前庭和癫痫疾病的人。你可以在这里读更多关于它的内容。如果您的网络事物需要动画才能运行，请警告用户，但不要禁用该功能。只需使用 CSS 即可轻松完成。这是一个简单的例子：



#### Gotchas

###### You can't animate inline elements 您无法为内联元素设置动画

尽管某些浏览器可以对内联元素进行动画处理，但这违反了 CSS 动画规范，并且会在某些浏览器上崩溃或最终停止工作。始终对块级或内联块级元素进行动画处理（网格和弹性容器以及子级也是块级元素）。当为内联级元素设置动画时，您可以将元素设置为显示：inline-block。

###### Overflow 溢出

大多数 Animate.css 动画都会在屏幕上移动元素，并可能在您的网络事物上创建滚动条。这是可以使用溢出：隐藏属性来管理的。没有关于何时何地使用它的秘诀，但基本思想是在保存动画元素的父级中使用它。由您决定何时以及如何使用它，本指南可以帮助您理解它。

###### Intervals between repeats 重复之间的间隔

不幸的是，目前纯 CSS 还无法做到这一点。您必须使用 Javascript 才能实现此结果。



## Usage with Javascript

当你将 animate.css 与 Javascript 结合起来时，你可以用它来做很多其他的事情。一个简单的例子：

```js
const element = document.querySelector('.my-element');
element.classList.add('animate__animated', 'animate__bounceOutLeft');
```

您可以检测动画何时结束：

```javascript
const element = document.querySelector('.my-element');
element.classList.add('animate__animated', 'animate__bounceOutLeft');

element.addEventListener('animationend', () => {
  // do something
});
```

或更改其持续时间：

```js
const element = document.querySelector('.my-element');
element.style.setProperty('--animate-duration', '0.5s');
```

您还可以使用一个简单的函数来添加动画类并自动删除它们：

```js
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
```

并像这样使用它：

```js
animateCSS('.my-element', 'bounce');

// or
animateCSS('.my-element', 'bounce').then((message) => {
  // Do something after the animation
});
```

如果您很难理解前面的函数，请查看 const、classList、箭头函数和 Promises。



## Custom Builds 定制构建

> *无法从 node_modules 文件夹进行自定义构建，因为我们不在 npm 模块中提供构建工具。*

Animate.css 由 npm、postcss + postcss-preset-env 提供支持，这意味着您可以使用未来的 CSS 和适当的后备，轻松创建自定义构建。

首先，您需要 Node 和所有其他依赖项：

```css
$ git clone https://github.com/animate-css/animate.css.git
$ cd animate.css
$ npm install
```

接下来，运行 npm start 来编译您的自定义构建。将生成三个文件：

* animate.css：原始构建，易于阅读且未经任何优化
* animate.min.css：缩小构建准备用于生产
* animate.compat.css：缩小的构建准备用于生产，没有类前缀。这只能用作迁移的简单路径。

例如，如果您只使用一些“注意力寻求者”动画，只需编辑 ./source/animate.css 文件，删除每个 @import 以及您想要使用的那些。

```css
@import 'attention_seekers/bounce.css';
@import 'attention_seekers/flash.css';
@import 'attention_seekers/pulse.css';
@import 'attention_seekers/rubberBand.css';
@import 'attention_seekers/shake.css';
@import 'attention_seekers/headShake.css';
@import 'attention_seekers/swing.css';
@import 'attention_seekers/tada.css';
@import 'attention_seekers/wobble.css';
@import 'attention_seekers/jello.css';
@import 'attention_seekers/heartBeat.css';
```

现在，只需运行 npm start，高度优化的构建就会在项目的根目录下生成。

#### Changing the default prefix 更改默认前缀

在自定义构建上更改 animate 的前缀非常简单。更改 package.json 文件中 animateConfig 的前缀属性并使用 npm start 重建库：

```json
/* on Animate.css package.json */
"animateConfig": {
  "prefix": "myCustomPrefix__"
},
```

然后：

```cmd
$ npm start
```



## Accessibility

Animate.css 支持prefers-reduced-motion 媒体查询，以便具有运动敏感度的用户可以选择退出动画。在支持的平台（目前所有主要浏览器和操作系统，包括移动设备）上，用户可以在其操作系统首选项中选择“减少运动”，它将为他们关闭 CSS 过渡，而无需任何进一步的工作。