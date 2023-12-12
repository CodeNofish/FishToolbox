"use strict";
/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */
Object.defineProperty(exports, "__esModule", { value: true });
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
let rawArr = [1, 2, 3, 4];
let ro = rawArr;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// rawArr = ro; // error!
// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
rawArr = ro;
// 这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。
// 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
let mySearch;
mySearch = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
};
let myArray;
myArray = ['Bob', 'Fred'];
let myStr = myArray[0];
let myArray3 = ["Alice", "Bob"];
class Clock {
    currentTime;
    setTime(d) {
        this.currentTime = d;
    }
    constructor(h, m) { }
}
