https://developer.chrome.com/docs/extensions/mv3/getstarted/extensions-101/



* The manifest

扩展程序的清单是唯一必须具有特定文件名的必需文件：manifest.json。它还必须位于扩展的根目录中。清单记录了重要的元数据、定义资源、声明权限并标识要在后台和页面上运行的文件。

* The service worker

扩展服务工作线程处理并侦听浏览器事件。事件有多种类型，例如导航到新页面、删除书签或关闭选项卡。它可以使用所有Chrome API，但不能直接与网页内容交互；这就是内容脚本的工作。

* Content scripts

内容脚本在网页上下文中执行 Javascript。他们还可以读取和修改所注入页面的 DOM。内容脚本只能使用 Chrome API 的一部分，但可以通过与扩展服务工作线程交换消息来间接访问其余部分。

* The popup and other pages

扩展可以包括各种 HTML 文件，例如弹出窗口、选项页面和其他 HTML 页面。所有这些页面都可以访问 Chrome API。





* 声明内容脚本

将以下代码添加到manifest.json以注册名为content.js的内容脚本。

```json
{
  ...
  "content_scripts": [
    {
      "js": ["scripts/chrome-reading-time.js"],
      "matches": [
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.chrome.com/docs/webstore/*"
      ]
    }
  ]
}
```

“匹配”字段可以具有一种或多种匹配模式。这些允许浏览器识别将内容脚本注入到哪些站点。匹配模式由三部分组成：`<scheme>://<host><path>`。它们可以包含“*”字符。



内容脚本可以使用标准文档对象模型 (DOM) 来读取和更改页面的内容。扩展程序将首先检查页面是否包含 `<article>` 元素。然后，它将计算该元素内的所有单词并创建一个显示总阅读时间的段落。

