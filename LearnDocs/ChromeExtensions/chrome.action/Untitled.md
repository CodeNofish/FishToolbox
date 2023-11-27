https://developer.chrome.com/docs/extensions/reference/action/

控制工具栏中扩展程序图标的显示。

# chrome.action

使用 chrome.action API 控制 Google Chrome 工具栏中的扩展程序图标。

必须在清单中声明以下键才能使用此 API。action



要控制 Chrome 用户界面中扩展程序的工具栏按钮，请使用 chrome.action API。操作图标显示在多功能框旁边的浏览器工具栏中。安装后，它们会出现在扩展菜单中（拼图图标）。用户可以将您的扩展程序图标固定到工具栏上。

每个扩展程序在 Chrome 工具栏中都有一个图标，即使操作键未添加到清单中也是如此。

```json
{
  "name": "Action Extension",
  ...
  "action": {
    "default_icon": {              // optional
      "16": "images/icon16.png",   // optional
      "24": "images/icon24.png",   // optional
      "32": "images/icon32.png"    // optional
    },
    "default_title": "Click Me",   // optional, shown in tooltip
    "default_popup": "popup.html"  // optional
  },
  ...
}
```

“action”键（及其子键）是可选的。如果不包含它，您的扩展程序仍会显示在工具栏中，以提供对扩展程序菜单的访问。因此，我们建议您始终至少包含“action”和“default_icon”键。



###### Icon

该图标是扩展程序工具栏上的主图像，由清单操作条目中的“default_icon”键设置。图标的宽度和高度必须为 16 个与设备无关的像素 (DIP)。

“default_icon”键是图像路径大小的字典。 Chrome 使用这些图标来选择要使用的图像比例。如果未找到完全匹配的内容，Chrome 会选择最接近的可用内容并将其缩放以适合图像，这可能会影响图像质量。

您还可以调用 action.setIcon() 以编程方式设置扩展程序的图标，方法是指定不同的图像路径或使用 HTML canvas 元素提供动态生成的图标，或者如果从扩展服务工作人员设置，则使用离屏画布 API。

```js
const canvas = new OffscreenCanvas(16, 16);
const context = canvas.getContext('2d');
context.clearRect(0, 0, 16, 16);
context.fillStyle = '#00FF00';  // Green
context.fillRect(0, 0, 16, 16);
const imageData = context.getImageData(0, 0, 16, 16);
chrome.action.setIcon({imageData: imageData}, () => { /* ... */ });
```

action.setIcon() API 旨在设置静态图像。不要使用动画图像作为图标。

对于打包扩展（从 .crx 文件安装），图像可以采用 Blink 渲染引擎可以显示的大多数格式，包括 PNG、JPEG、BMP、ICO 等。不支持 SVG。解压的扩展程序必须使用 PNG 图像。



###### Tooltip (title)

当用户将鼠标指针悬停在工具栏中的扩展程序图标上时，会出现工具提示或标题。当按钮获得焦点时，它也包含在屏幕阅读器朗读的可访问文本中。

默认工具提示是使用manifest.json 中操作键的“default_title”字段设置的。您还可以通过调用 `action.setTitle()` 以编程方式设置它。



###### Badge

操作可以选择显示“徽章”——图标上分层的一些文本。这使得更新操作以显示有关扩展状态的少量信息（例如计数器）变得很容易。徽章具有文本组件和背景颜色。由于空间有限，我们建议徽章文本使用四个或更少的字符。

要创建徽章，请通过调用action.setBadgeBackgroundColor() 和action.setBadgeText() 以编程方式设置它。清单中没有默认徽章设置。徽章颜色值可以是组成徽章 RGBA 颜色的 0 到 255 之间的四个整数的数组，也可以是具有 CSS 颜色值的字符串。

```js
chrome.action.setBadgeBackgroundColor(
  {color: [0, 255, 0, 0]},  // Green
  () => { /* ... */ },
);

chrome.action.setBadgeBackgroundColor(
  {color: '#00FF00'},  // Also green
  () => { /* ... */ },
);

chrome.action.setBadgeBackgroundColor(
  {color: 'green'},  // Also, also green
  () => { /* ... */ },
);
```



###### Popup

当用户单击工具栏中的扩展程序操作按钮时，会显示操作的弹出窗口。弹出窗口可以包含您喜欢的任何 HTML 内容，并且会自动调整大小以适合其内容。弹出窗口的大小必须介于 25x25 和 800x600 像素之间。

弹出窗口最初由manifest.json 文件中操作键中的“default_popup”属性设置。如果存在，此属性应指向扩展目录内的相对路径。还可以使用 action.setPopup() 方法动态更新它以指向不同的相对路径。

> 如果扩展操作已指定在单击当前选项卡时显示的弹出窗口，则不会发送 action.onClicked 事件。



#### Use cases 用例

##### Per-tab state 每个选项卡状态

每个选项卡的扩展操作可以有不同的状态。要为单个选项卡设置值，请使用操作 API 的设置方法中的 tabId 属性。例如，要设置特定选项卡的徽章文本，请执行以下操作：

```js
function getTabId() { /* ... */}
function getTabBadge() { /* ... */}

chrome.action.setBadgeText(
  {
    text: getTabBadge(tabId),
    tabId: getTabId(),
  },
  () => { ... }
);
```

如果省略 tabId 属性，则该设置将被视为全局设置。选项卡特定设置优先于全局设置。

##### Enabled state 启用状态

默认情况下，每个选项卡上都启用（可单击）工具栏操作。您可以使用action.enable() 和action.disable() 方法来控制它。这仅影响是否将 popup（如果有）或 action.onClicked 事件发送到您的扩展程序；它不会影响操作在工具栏中的存在。



---

#### Examples 

以下示例显示了在扩展中使用操作的一些常见方式。要尝试此 API，请从 chrome-extension-samples 存储库安装 Action API 示例。



##### Show a popup 显示弹出窗口

当用户单击扩展程序的操作时，扩展程序通常会显示弹出窗口。要在您自己的扩展中实现此功能，请在您的manifest.json中声明弹出窗口并指定Chrome应在弹出窗口中显示的内容。

```json
// manifest.json
{
  "name": "Action popup demo",
  "version": "1.0",
  "manifest_version": 3,
  "action": {
    "default_title": "Click to view a popup",
    "default_popup": "popup.html"
  }
}
```

```html
<!-- popup.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    html {
      min-height: 5em;
      min-width: 10em;
      background: salmon;
    }
  </style>
</head>
<body>
  <p>Hello, world!</p>
</body>
</html>
```



##### Injecting a content script on click 单击时注入内容脚本

扩展的常见模式是使用扩展的操作公开其主要功能。下面的示例演示了这种模式。当用户单击该操作时，扩展程序会将内容脚本注入当前页面。然后，内容脚本会显示一条警报，以验证一切是否按预期运行。

```json
// manifest.json
{
  "name": "Action script injection demo",
  "version": "1.0",
  "manifest_version": 3,
  "action": {
    "default_title": "Click to show an alert"
  },
  "permissions": ["activeTab", "scripting"],
  "background": {
    "service_worker": "background.js"
  }
}
```

```js
// content.js
alert('Hello, world!');
```



##### Emulate pageActions with declarativeContent 

使用 declarativeContent 模拟 pageActions

此示例展示了扩展程序的后台逻辑如何 (a) 默认禁用某个操作以及 (b) 使用 declarativeContent 在特定站点上启用该操作。

```js
// background.js

// Wrap in an onInstalled callback to avoid unnecessary work
// every time the background script is run
chrome.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on select tabs
  chrome.action.disable();

  // Clear all rules to ensure only our expected rules are set
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on example.com pages
    let exampleRule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: '.example.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };

    // Finally, apply our new array of rules
    let rules = [exampleRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});
```



---



#### Types



###### OpenPopupOptions

打开弹出选项

* windowId

  打开操作弹出窗口的窗口 ID。如果未指定，则默认为当前活动窗口。



###### TabDetails

选项卡详细信息

* 标签ID

  要查询状态的选项卡的 ID。如果未指定选项卡，则返回非选项卡特定状态。



###### UserSettings

与扩展程序操作相关的用户指定设置的集合。

* isOnToolbar

  扩展程序的操作图标在浏览器窗口的顶级工具栏上是否可见（即扩展程序是否已被用户“固定”）



#### Methods



###### disable

```js
chrome.action.enable(
  tabId?: number,
  callback?: function,
)
```

禁用选项卡的操作。

* tabId

  您要修改其操作的选项卡的 ID。

* callback

* return: `Promise<void>`



###### enable

启用选项卡的操作。默认情况下，操作已启用。



###### getBadgeBackgroundColor

获取操作的背景颜色。



###### getBadgeText

获取操作的徽章文本。如果未指定选项卡，则返回非选项卡特定的徽章文本。

如果启用了 displayActionCountAsBadgeText，则将返回占位符文本，除非存在 declarativeNetRequestFeedback 权限或提供了选项卡特定的徽章文本。



###### getBadgeTextColor

获取操作的文本颜色。



###### getPopup

获取设置为此操作弹出窗口的 html 文档。



###### getTitle

获取操作的标题。



###### getUserSettings

返回与扩展程序操作相关的用户指定设置。



###### isEnabled

指示是否为选项卡启用扩展操作（如果未提供 tabId，则为全局启用）。仅使用 declarativeContent 启用的操作始终返回 false。



###### openPopup

打开扩展程序的弹出窗口。



###### setBadgeBackgroundColor

设置徽章的背景颜色。



###### setBadgeText

设置操作的徽章文本。徽章显示在图标顶部。



###### setBadgeTextColor

设置徽章的文本颜色。



###### setIcon

设置操作的图标。图标可以指定为图像文件的路径或画布元素中的像素数据，或者指定为其中之一的字典。必须指定路径或 imageData 属性。



###### setPopup

设置当用户单击操作图标时要以弹出窗口形式打开的 HTML 文档。




###### setTitle

设置操作的标题。这显示在工具提示中。



##### Events

###### onClicked

单击操作图标时触发。如果操作有弹出窗口，则不会触发此事件。

