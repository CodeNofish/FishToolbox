/*
在脚本匹配的页面,添加文章阅读时间
 */

const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /\S+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);

  // matchAll returns an iterator, convert to array to get word count
  // 传播操作符也允许我们像array.from()方法一样将迭代器转换为数组。
  // 它将迭代器的所有元素复制到新的数组中。此外，我们还可以用它来制作一个数组的克隆。
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);

  const badge = document.createElement("p");
  // Use the same styling as the publishing information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  // 空值合并运算符（??）是一个逻辑运算符，当左侧的操作数为 null 或者 undefined 时，
  // 返回其右侧操作数，否则返回左侧操作数。

  // 该接口insertAdjacentElement()的方法 Element将给定的元素节点插入到相对于其所调用的元素的给定位置。
  (date??heading).insertAdjacentElement("afterend", badge);

}

