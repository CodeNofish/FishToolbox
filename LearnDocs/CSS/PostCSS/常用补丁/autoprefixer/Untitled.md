https://github.com/postcss/autoprefixer#readme

[TOC]

# Autoprefixer

PostCSS 插件，**用于解析 CSS 并使用 Can I Use 中的值将供应商前缀添加到 CSS 规则中**。它受到 Google 推荐，并在 Twitter 和阿里巴巴中使用。

编写不带供应商前缀的 CSS 规则（事实上，完全忘记它们）：

```css
::placeholder {
  color: gray;
}

.image {
  background-image: url(image@1x.png);
}
@media (min-resolution: 2dppx) {
  .image {
    background-image: url(image@2x.png);
  }
}
```

Autoprefixer 将使用基于当前浏览器流行度和属性支持的数据来为您应用前缀。您可以尝试 Autoprefixer 的交互式演示。

```css
::-moz-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}

.image {
  background-image: url(image@1x.png);
}
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 2dppx) {
  .image {
    background-image: url(image@2x.png);
  }
}
```

