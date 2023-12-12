https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes





@keyframes CSS at 规则通过定义动画序列中关键帧（或路径点）的样式来控制 CSS 动画序列中的中间步骤。与过渡相比，这可以更好地控制动画序列的中间步骤。

```css
@keyframes slidein {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```

* `<custom-ident>`

标识关键帧列表的名称。这必须与 CSS 语法中的标识符生成相匹配。

* from

起始偏移量为 0%。

* to

最终偏移量为 100%。

* `<percentage>`

指定关键帧应出现的动画序列时间的百分比。

* `<timeline-range-name>`

指定关键帧应出现的指定动画范围内的时间百分比。有关使用命名时间线范围的动画类型的更多信息，请参阅 CSS 滚动驱动的动画。