/*

 */

// 您可以使用 tabs.query() 方法从特定 URL 检索选项卡。
const tabs = await chrome.tabs.query({
  url: [
    "https://developer.chrome.com/docs/webstore/*",
    "https://developer.chrome.com/docs/extensions/*",
  ],
});

// 首先，扩展程序将按字母顺序对选项卡名称（所包含的 HTML 页面的标题）进行排序。
// 然后，当单击列表项时，它将使用 tabs.update() 将焦点放在该选项卡上，
// 并使用 windows.update() 将窗口置于前面。将以下代码添加到 popup.js 文件中：
const collator = new Intl.Collator(); // Intl.Collator 对象支持语言敏感的字符串比较。
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  const title = tab.title.split("-")[0].trim();
  const pathname = new URL(tab.url).pathname.slice("/docs".length);

  element.querySelector(".title").textContent = title;
  element.querySelector(".pathname").textContent = pathname;
  element.querySelector("a").addEventListener("click", async () => {
    // need to focus window as well as the active tab
    await chrome.tabs.update(tab.id, {active: true});
    await chrome.windows.update(tab.windowId, {focused: true});
  });

  elements.add(element);
}

document.querySelector("ul").append(...elements);

// 在 popup.js 中，添加以下代码来创建一个按钮，该按钮将使用 tabs.group()
// 对所有选项卡进行分组并将它们移动到当前窗口中。
const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({id}) => id);
  const group = await chrome.tabs.group({tabIds});
  await chrome.tabGroups.update(group, {title: "DOCS"});
});