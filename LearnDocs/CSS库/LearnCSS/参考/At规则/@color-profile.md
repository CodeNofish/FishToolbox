https://developer.mozilla.org/en-US/docs/Web/CSS/@color-profile

# @颜色配置文件

@color-profile CSS at-rule 定义并命名了一个颜色配置文件，稍后可以在 color() 函数中使用它来指定颜色。

```css
@color-profile --swop5c {
  src: url("https://example.org/SWOP2006_Coated5v2.icc");
}
```

* src

指定从中检索颜色配置文件信息的 URL。

* rendering-intent

如果颜色配置文件包含多个渲染意图，则此描述符允许选择一个描述符来定义如何将颜色映射到比此配置文件定义的色域更小的色域。

relative-colorimetric 相对比色法

需要使用介质相关色度来使落在目标介质色域内的源颜色相对于相应的介质白点保持不变。使用各种不同的方法将目标中色域之外的源颜色映射到色域边界上的颜色。

absolute-colorimetric 绝对比色法

需要使用 ICC 绝对色度来使目标中等色域内的源颜色相对于所采用的白色（完美的反射漫射器）保持不变。使用各种不同的方法将目标中色域之外的源颜色映射到色域边界上的颜色。

perceptual 感性的

此方法通常是图像的首选，特别是当源和目标之间存在显着差异时（例如在反射打印上再现的屏幕显示图像）。它采用源图像的颜色并使用专有方法重新优化目标媒体的外观。

saturation 饱和

创建此选项是为了保留原始颜色的相对饱和度（色度），并保持纯色的纯净。然而，它遇到了诸如感知意图之类的互操作性问题。



###### Examples

此示例来自规范，演示了如何使用符合 ISO 12647-2:2004 的胶印，在 5 级纸张上使用 CGATS/SWOP TR005 2007 特征数据，墨水限制为 300% 总面积覆盖率，并采用中灰色组件替换 (GCR) 。

```css
@color-profile --swop5c {
  src: url("https://example.org/SWOP2006_Coated5v2.icc");
}
.header {
  background-color: color(--swop5c 0% 70% 20% 0%);
}
```



```
@color-profile = 
  @color-profile [ <dashed-ident> | device-cmyk ] { <declaration-list> } 
```



> ICC （国际色彩联盟）配置文件是描述如何正确地将图像文件从一个颜色空间转换到另一个颜色空间的文件。ICC 配置文件有助于为图像获取正确的颜色。例如，到正确地显示用于在计算机显示器上打印的图像，可以选择 ICC 配置文件。该配置文件将图像转换到不同的颜色空间并确保颜色正确地联机显示。



> **一个可以下载显示器调色icc文件的网站**
> http://www.tftcentral.co.uk/articles/icc_profiles.htm#a