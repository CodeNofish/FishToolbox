https://developer.mozilla.org/en-US/docs/Web/CSS/@charset

# @charset

@charset CSS at 规则指定样式表中使用的字符编码。它必须是样式表中的第一个元素，并且前面不能有任何字符；由于它不是嵌套语句，因此不能在条件组 at 规则内使用。如果定义了多个 @charset at 规则，则仅使用第一个，并且不能在 HTML 元素的 style 属性内或与 HTML 页面的字符集相关的 <style> 元素内使用它。

```css
@charset "utf-8";
```

当在某些 CSS 属性（如内容）中使用非 ASCII 字符时，此 at 规则非常有用。

由于定义样式表的字符编码的方法有多种，浏览器将按以下顺序尝试以下方法（一旦产生结果就停止）：

```css
@charset "UTF-8";
@charset "iso-8859-15";
```

