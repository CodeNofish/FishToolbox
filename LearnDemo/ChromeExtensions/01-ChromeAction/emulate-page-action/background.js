/*
此示例展示了扩展程序的后台逻辑如何 (a) 默认禁用某个操作以及 (b)
 使用 declarativeContent 在特定站点上启用该操作。
 */

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
          pageUrl: {hostPrefix: '.example.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };
    // Finally, apply our new array of rules
    let rules = [exampleRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});