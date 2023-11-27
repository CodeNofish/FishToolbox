/*
将action的icon设置为绿色方块
 */
chrome.runtime.onInstalled.addListener(() => {
  setChromeActionIcon();
});

function setChromeActionIcon() {
  /*
  OffscreenCanvas 接口提供了可以离屏渲染的画布，
  解耦了 DOM 和 Canvas API，使得 <canvas> 元素不再完全依赖于 DOM。
  渲染操作也可以在工作上下文中运行，允许您在单独的线程中运行某些任务，并避免主线程上的繁重工作。
  */
  const canvas = new OffscreenCanvas(16, 16);
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, 16, 16);
  context.fillStyle = '#00FF00';
  context.fillRect(0, 0, 16, 16);
  const imageData = context.getImageData(0, 0, 16, 16);
  /*
  您还可以调用 action.setIcon() 以编程方式设置扩展程序的图标，
  方法是指定不同的图像路径或使用 HTML canvas 元素提供动态生成的图标，
  或者如果从扩展服务工作人员设置，则使用离屏画布 API。
   */
  chrome.action.setIcon({imageData: imageData}, () => {
    // ...
  });
}

