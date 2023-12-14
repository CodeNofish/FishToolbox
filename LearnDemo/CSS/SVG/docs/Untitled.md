

#### a

<a> SVG 元素创建指向其他网页、文件、同一页面中的位置、电子邮件地址或任何其他 URL 的超链接。它与 HTML 的 <a> 元素非常相似。



#### aniumate

SVG <animate> 元素提供了一种随时间对元素属性进行动画处理的方法。



#### animateMotion

SVG <animateMotion> 元素提供了一种定义元素如何沿着运动路径移动的方法。



#### animateTransform

animateTransform 元素在其目标元素上设置变换属性的动画，从而允许动画控制平移、缩放、旋转和/或倾斜。



#### circle

<circle> SVG 元素是 SVG 基本形状，用于根据中心点和半径绘制圆形。



#### clipPath

<clipPath> SVG 元素定义了一个剪切路径，供 Clip-path 属性使用。

剪切路径限制了可以应用绘画的区域。从概念上讲，位于剪切路径所界定区域之外的绘图部分不会被绘制。

剪切路径在概念上等同于引用元素的自定义视口。因此，它影响元素的渲染，但不影响元素的固有几何形状。被剪裁元素的边界框（即通过剪裁路径属性引用 <clipPath> 元素的元素，或引用元素的子元素）必须保持与未剪裁时相同。

默认情况下，指针事件不会分派到剪切区域。例如，将半径为 10 的圆裁剪为半径为 5 的圆后，将不会收到较小半径之外的“单击”事件。



#### defs

<defs> 元素用于存储稍后将使用的图形对象。在 <defs> 元素内创建的对象不会直接渲染。要显示它们，您必须引用它们（例如使用 <use> 元素）。

图形对象可以从任何地方引用，但是，在 <defs> 元素内定义这些对象可以提高 SVG 内容的可理解性，并且有利于文档的整体可访问性。



#### desc

<desc> 元素提供任何 SVG 容器元素或图形元素的可访问的长文本描述。

<desc> 元素中的文本不会呈现为图形的一部分。如果元素可以通过可见文本进行描述，则可以使用 aria-descriptedby 属性引用该文本。如果使用 aria-describeby，它将优先于 <desc>。

<desc> 元素的隐藏文本也可以使用 aria-descriptedby 值中的多个 ID 与其他元素的可见文本连接。在这种情况下，<desc> 元素必须提供一个 ID 以供参考。



#### ellipse

<ellipse> 元素是 SVG 基本形状，用于根据中心坐标及其 x 和 y 半径创建椭圆形。



#### feBlend

<feBlend> SVG 滤镜基元将两个对象组合在一起，并由某种混合模式控制。这类似于混合两个图层时从图像编辑软件中了解到的情况。模式由 mode 属性定义。



#### feColorMatrix

<feColorMatrix> SVG 过滤器元素根据变换矩阵更改颜色。每个像素的颜色值 [R,G,B,A] 都是矩阵乘以 5 x 5 颜色矩阵以创建新颜色 [R',G',B',A']。

```
| R' |     | r1 r2 r3 r4 r5 |   | R |
| G' |     | g1 g2 g3 g4 g5 |   | G |
| B' |  =  | b1 b2 b3 b4 b5 | * | B |
| A' |     | a1 a2 a3 a4 a5 |   | A |
| 1  |     | 0  0  0  0  1  |   | 1 |
```

简而言之，以下是新像素中每个颜色通道的计算方式。最后一行被忽略，因为它的值是常量。

```
R' = r1*R + r2*G + r3*B + r4*A + r5
G' = g1*R + g2*G + g3*B + g4*A + g5
B' = b1*R + b2*G + b3*B + b4*A + b5
A' = a1*R + a2*G + a3*B + a4*A + a5
```



#### feComponentTransfer

<feComponentTransfer> SVG 过滤器基元对每个像素执行数据的颜色分量重新映射。它允许进行亮度调整、对比度调整、色彩平衡或阈值处理等操作。

计算是对非预乘颜色值执行的。通过将每个通道（R、G、B 和 A）更改为子项 <feFuncR>、<feFuncB>、<feFuncG> 和 <feFuncA> 返回的结果来修改颜色。如果提供了多个相同元素，则使用最后指定的一个，并且如果没有提供元素来修改通道之一，则效果与已为该通道给出恒等变换相同。

#### feComposite

<feComposite> SVG 过滤器基元使用 Porter-Duff 合成操作之一在图像空间中按像素执行两个输入图像的组合：over、in、atop、out、xor、lighter 或算术。

#### feConvolveMatrix

<feConvolveMatrix> SVG 滤镜基元应用矩阵卷积滤镜效果。卷积将输入图像中的像素与相邻像素组合以产生结果图像。通过卷积可以实现多种成像操作，包括模糊、边缘检测、锐化、浮雕和斜切。

矩阵卷积基于 n×m 矩阵（卷积核），它描述输入图像中的给定像素值如何与其相邻像素值组合以产生结果像素值。每个结果像素是通过将核矩阵应用于相应的源像素及其相邻像素来确定的。应用于给定像素的每个颜色值的基本卷积公式是：

#### feDiffuseLighting

<feDiffuseLighting> SVG 滤镜基元使用 Alpha 通道作为凹凸贴图照亮图像。生成的图像是 RGBA 不透明图像，取决于输入凹凸贴图的光颜色、光位置和表面几何形状。

可以使用 <feComposite> 滤镜基元的算术运算符的乘法项将该滤镜基元生成的光照贴图与纹理图像组合。在将其应用于纹理图像之前，可以通过将其中几个光照贴图添加在一起来模拟多个光源。

#### feDisplacementMap

<feDisplacementMap> SVG 滤镜基元使用 in2 中图像的像素值来空间置换 in 中的图像。

#### feDistantLight

<feDistantLight> 滤镜基元定义了可在照明滤镜基元中使用的远距离光源：<feDiffuseLighting> 或 <feSpecularLighting>。

#### feDropShadow

SVG <feDropShadow> 滤镜基元创建输入图像的投影。它只能在 <filter> 元素内使用。

#### feFlood

The **`<feFlood>`** SVG filter primitive fills the filter subregion with the color and opacity defined by `flood-color` and `flood-opacity`.

<feFlood> SVG 滤镜基元使用由泛光颜色和泛光不透明度定义的颜色和不透明度填充滤镜子区域。

#### feFuncA

<feFuncA> SVG 过滤器基元定义其父 <feComponentTransfer> 元素的输入图形的 alpha 分量的传递函数。

#### feFuncB

<feFuncB> SVG 过滤器基元定义其父 <feComponentTransfer> 元素的输入图形的蓝色分量的传递函数。

#### feFuncG

<feFuncG> SVG 过滤器基元定义其父 <feComponentTransfer> 元素的输入图形的绿色分量的传递函数。

#### feFuncR

<feFuncR> SVG 过滤器基元定义其父 <feComponentTransfer> 元素的输入图形的红色分量的传递函数。

#### feGaussianBlur

<feGaussianBlur> SVG 滤镜基元按照 stdDeviation 中指定的量模糊输入图像，该量定义了钟形曲线。

#### feImage

<feImage> SVG 过滤器基元从外部源获取图像数据，并提供像素数据作为输出（这意味着如果外部源是 SVG 图像，则它会被光栅化。）

#### feMerge

<feMerge> SVG 元素允许同时应用滤镜效果，而不是顺序应用。这是通过其他过滤器通过结果属性存储其输出，然后在 <feMergeNode> 子级中访问它来实现的。

#### feMergeNode 

feMergeNode 将另一个过滤器的结果由其父 <feMerge> 处理。

#### feMorphology

<feMorphology> SVG 滤镜基元用于腐蚀或膨胀输入图像。它的用处尤其在于增肥或瘦身效果。

#### feOffset

<feOffset> SVG 滤镜基元允许偏移输入图像。输入图像作为一个整体偏移 dx 和 dy 属性中指定的值。

#### fePointLight

<fePointLight> 滤镜基元定义了一个允许创建点光效果的光源。它可以在照明滤镜基元中使用：<feDiffuseLighting> 或 <feSpecularLighting>。

#### feSpecularLighting

<feSpecularLighting> SVG 滤镜基元使用 Alpha 通道作为凹凸贴图照亮源图形。生成的图像是基于光颜色的 RGBA 图像。光照计算遵循 Phong 光照模型的标准镜面反射分量。生成的图像取决于输入凹凸贴图的光颜色、光位置和表面几何形状。添加照明计算的结果。过滤器基元假设观察者位于 z 方向无穷远处。

该滤镜基元生成包含照明计算的镜面反射部分的图像。这样的贴图旨在使用算术 <feComposite> 方法的添加项与纹理组合。在将其应用到纹理图像之前，可以通过添加其中几个光照贴图来模拟多个光源。

#### feSpotLight

<feSpotLight> SVG 滤镜基元定义了可用于创建聚光灯效果的光源。它用在照明滤镜基元中：<feDiffuseLighting> 或 <feSpecularLighting>。

#### feTile

<feTile> SVG 过滤器基元允许使用输入图像的重复平铺图案填充目标矩形。效果类似于<pattern> 的效果。

#### feTurbulence

<feTurbulence> SVG 滤镜基元使用 Perlin 湍流函数创建图像。它允许合成云或大理石等人造纹理。生成的图像将填充整个滤波器基元子区域。

#### filter

<filter> SVG 元素通过对原子滤镜基元进行分组来定义自定义滤镜效果。它永远不会自行渲染，但必须由 SVG 元素上的过滤器属性或 SVG/HTML 元素的过滤器 CSS 属性使用。

#### foreignObject

<foreignObject> SVG 元素包含来自不同 XML 命名空间的元素。在浏览器上下文中，它很可能是 (X)HTML。

#### g

<g> SVG 元素是用于对其他 SVG 元素进行分组的容器。

应用于 <g> 元素的转换将在其子元素上执行，并且其属性由其子元素继承。它还可以将稍后使用 <use> 元素引用的多个元素分组。

#### image

<image> SVG 元素包含 SVG 文档内的图像。它可以显示光栅图像文件或其他SVG文件。

SVG 软件必须支持的唯一图像格式是 JPEG、PNG 和其他 SVG 文件。动画 GIF 行为未定义。

使用 <image> 显示的 SVG 文件被视为图像：不会加载外部资源，不会应用 :visited 样式，并且它们无法交互。要包含动态 SVG 元素，请尝试将 <use> 与外部 URL 结合使用。要包含 SVG 文件并在其中运行脚本，请尝试将 <object> 放在 <foreignObject> 中。

#### line

<line> 元素是一个 SVG 基本形状，用于创建连接两点的线。

#### linearGradient

<linearGradient> 元素允许作者定义线性渐变以应用于其他 SVG 元素。

#### marker

<marker> 元素定义用于在给定 <path>、<line>、<polyline> 或 <polygon> 元素上绘制箭头或多标记的图形。

可以使用“marker-start”、“marker-mid”和“marker-end”属性将标记附加到形状。

#### mask

<mask> 元素定义一个 alpha 遮罩，用于将当前对象合成到背景中。使用 mask 属性来使用/引用掩码。

#### metadata

<metadata> SVG 元素将元数据添加到 SVG 内容。元数据是关于数据的结构化信息。 <metadata> 的内容应该是来自其他 XML 命名空间的元素，例如 RDF、FOAF 等。

#### mpath

<animateMotion> 元素的 <mpath> 子元素提供了引用外部 <path> 元素作为运动路径定义的能力。

#### path

<path> SVG 元素是定义形状的通用元素。所有基本形状都可以使用路径元素创建。

#### pattern

<pattern> 元素定义一个图形对象，可以以重复的 x 和 y 坐标间隔（“平铺”）重绘该图形对象以覆盖某个区域。

<pattern> 由其他图形元素上的填充和/或描边属性引用，以使用引用的图案填充或描边这些元素。

#### polygon

<polygon> 元素定义由一组连接的直线段组成的闭合形状。最后一个点与第一个点相连。

对于开放形状，请参阅 <polyline> 元素。

#### polyline

<polyline> SVG 元素是一种 SVG 基本形状，可创建连接多个点的直线。通常，折线用于创建开放形状，因为最后一个点不必连接到第一个点。对于闭合形状，请参阅 <polygon> 元素。

#### radialGradient

<radialGradient> 元素允许作者定义可应用于图形元素的填充或描边的径向渐变。

#### rect

<rect> 元素是一个基本的 SVG 形状，用于绘制矩形，由矩形的位置、宽度和高度定义。矩形的角可以是圆形的。

#### script

SVG script 元素允许将脚本添加到 SVG 文档。

#### set

SVG <set> 元素提供了一种简单的方法，可以在指定的持续时间内设置属性的值。

它支持所有属性类型，包括那些无法合理插值的属性类型，例如字符串和布尔值。对于可以合理插值的属性，通常首选 <animate>。

#### stop

SVG <stop> 元素定义颜色及其在渐变上使用的位置。该元素始终是 <linearGradient> 或 <radialGradient> 元素的子元素。

#### style

SVG <style> 元素允许将样式表直接嵌入到 SVG 内容中。

#### svg

svg 元素是一个定义新坐标系和视口的容器。它用作 SVG 文档的最外层元素，但也可用于将 SVG 片段嵌入到 SVG 或 HTML 文档中。

#### switch

<switch> SVG 元素按顺序评估其直接子元素上的所有 requiredFeatures、requiredExtensions 和 systemLanguage 属性，然后渲染这些属性评估为 true 的第一个子元素。

其他直接子级将被绕过，因此不会被渲染。如果子元素是容器元素，例如 <g>，那么它的子树也会被处理/渲染或绕过/不渲染。

#### symbol

<symbol> 元素用于定义可由 <use> 元素实例化的图形模板对象。

对在同一文档中多次使用的图形使用 <symbol> 元素可以增加结构和语义。结构丰富的文档可以以图形、语音或盲文的形式呈现，从而提高可访问性。

#### text

SVG <text> 元素绘制由文本组成的图形元素。可以将渐变、图案、剪切路径、蒙版或过滤器应用于 <text>，就像任何其他 SVG 图形元素一样。

如果文本包含在 SVG 中而不是包含在 <text> 元素内，则不会呈现该文本。这与默认隐藏不同，因为设置显示属性不会显示文本。

#### textPath

要沿着 <path> 的形状呈现文本，请将文本包含在具有 href 属性并引用 <path> 元素的 <textPath> 元素中。

#### title

```
<title> 元素提供任何 SVG 容器元素或图形元素的可访问的简短文本描述。
<title> 元素中的文本不会呈现为图形的一部分，但浏览器通常将其显示为工具提示。如果一个元素可以通过可见文本来描述，建议使用 aria-labelledby 属性引用该文本，而不是使用 <title> 元素。
```

#### tspan

SVG <tspan> 元素定义 <text> 元素或另一个 <tspan> 元素内的子文本。它允许根据需要调整该潜文本的样式和/或位置。

#### use

<use> 元素从 SVG 文档中获取节点，并将它们复制到其他地方。效果与节点被深度克隆到非公开 DOM 中，然后粘贴到 use 元素所在的位置相同，就像克隆的模板元素一样。

#### view

视图是查看图像的定义方式，例如缩放级别或详细视图。