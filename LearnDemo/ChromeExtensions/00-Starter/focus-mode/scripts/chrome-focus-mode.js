/*

 */

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

// 用户单击扩展操作后，扩展将检查 URL 是否与文档页面匹配。
// 接下来，它将检查当前选项卡的状态并设置下一个状态。将以下代码添加到background.js：
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({tabId: tab.id});
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      // 在用户打开扩展时插入 CSS 文件
      await chrome.scripting.insertCSS({
        files: ["styles/focus-mode.css"],
        target: {tabId: tab.id},
      });
    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["styles/focus-mode.css"],
        target: {tabId: tab.id},
      });
    }

  }
});

/*
我们的service worker将侦听的第一个事件是runtime.onInstalled()。
此方法允许扩展设置初始状态或完成安装时的某些任务。
扩展可以使用 Storage API 和 IndexedDB 来存储应用程序状态。
但在本例中，由于我们只处理两种状态，
因此我们将使用操作的徽章文本本身来跟踪扩展程序是“ON”还是“OFF”。
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});