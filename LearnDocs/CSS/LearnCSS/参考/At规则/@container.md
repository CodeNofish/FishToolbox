https://developer.mozilla.org/en-US/docs/Web/CSS/@container

# @container

@container CSS at-rule 是一个条件组规则，它将样式应用于包含上下文。样式声明按条件过滤，如果条件为真，则将其应用于容器。当容器大小发生变化时，会评估该条件。

可以提供可选的区分大小写的容器名称，该名称可以过滤查询容器集，仅将其视为具有匹配查询容器名称的容器。一旦为元素选择了符合条件的查询容器，就会根据该查询容器评估 <container-condition> 中的每个容器功能。

```css
@container <container-condition> {
  <stylesheet>
}
```



```css
@container (width > 400px) {
  h2 {
    font-size: 1.5em;
  }
}
```



* `<container-condition>`<容器条件>

当容器大小发生变化时，根据查询容器评估的一组功能。如果条件为 true，则应用 `<stylesheet> `中定义的样式。

* `<stylesheet>`

一组 CSS 声明。



##### Logical keywords in container queries

```css
@container (width > 400px) and (height > 400px) {
  /* <stylesheet> */
}

@container (width > 400px) or (height > 400px) {
  /* <stylesheet> */
}

@container not (width < 400px) {
  /* <stylesheet> */
}
```



##### Named containment contexts

可以使用容器名称属性来命名包含上下文。

```css
.post {
  container-name: sidebar;
  container-type: inline-size;
}
```

其简写语法是使用容器形式的容器：<名称> / <类型>，例如：

```css
.post {
  container: sidebar / inline-size;
}
```

在容器查询中，container-name 属性用于将容器集过滤为具有匹配查询容器名称的容器：

```css
@container sidebar (width > 400px) {
  /* <stylesheet> */
}
```



##### Descriptors

可以在容器条件中使用以下描述符

* aspect-ratio 纵横比

容器的纵横比计算为容器的宽度与高度，表示为 <ratio> 值。

* block-size块大小

容器的块大小表示为 <length> 值。

* height高度

容器的高度表示为 <length> 值。

* inline-size内联尺寸

容器的内联大小表示为 <length> 值。

* orientation方向

容器的方向，横向或纵向。

* width宽度

容器的宽度表示为 <length> 值。



##### Examples



根据容器的大小设置样式

考虑以下带有标题和一些文本的卡片组件示例：

```css
<div class="post">
  <div class="card">
    <h2>Card title</h2>
    <p>Card content</p>
  </div>
</div>
```

可以使用容器类型属性创建容器上下文，在本例中使用 .post 类上的内联大小值。然后，您可以使用 @container at-rule 将样式应用到窄于 650px 的容器中具有 .card 类的元素。

```css
/* A container context based on inline size */
.post {
  container-type: inline-size;
}

/* Apply styles if the container is narrower than 650px */
@container (width < 650px) {
  .card {
    width: 50%;
    background-color: gray;
    font-size: 1em;
  }
}
```



创建命名容器上下文

首先，使用容器类型和容器名称属性创建容器上下文。容器页面中描述了此声明的简写语法。

```css
.post {
  container-type: inline-size;
  container-name: summary;
}
```

接下来，通过将名称添加到容器查询来定位该容器：

```css
@container summary (min-width: 400px) {
  .card {
    font-size: 1.5em;
  }
}
```



嵌套容器查询

不可能在单个容器查询中定位多个容器。可以嵌套具有相同效果的容器查询。

如果名为summary 的容器宽度超过 400 像素并且其祖先容器宽度超过 800 像素，则以下查询的计算结果为 true 并应用声明的样式：

```css
@container summary (min-width: 400px) {
  @container (min-width: 800px) {
    /* <stylesheet> */
  }
}
```



样式容器查询

容器查询还可以评估容器元素的计算样式。以下容器查询检查容器元素的 --accent-color 的计算值是否为蓝色：

```css
@container style(--accent-color: blue) {
  /* <stylesheet> */
}
```

