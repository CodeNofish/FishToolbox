/*
注意action点击不要和popup一起使用
"default_popup" : "html/popup.html"
 */

chrome.action.onClicked.addListener((tab) => {
  injectingScriptOnClick(tab);
});

/**
 * 注入脚本内容
 * @param tab
 */
function injectingScriptOnClick(tab) {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['inject-on-click.js']
  });
}
