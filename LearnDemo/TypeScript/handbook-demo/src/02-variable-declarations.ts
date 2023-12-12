/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */

// 解构数组
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

// 对象解构
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
let { a, b } = o;

// 默认值
// 默认值可以让你在属性为 undefined 时使用缺省值：
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}

// 解构也能用于函数声明。 看以下简单的情况：
type C = { a: string, b?: number }
function f({ a, b }: C): void {
  // ...
}

// 展开
// 展开操作符正与解构相反。 它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。 例如：
let firstArr = [1, 2];
let secondArr = [3, 4];
let bothPlus = [0, ...firstArr, ...secondArr, 5];
// 你还可以展开对象
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };

