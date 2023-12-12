/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */

interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: 'Size 10 Object'};
printLabel(myObj);

// 可选属性
// 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
// 可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。
interface SquareConfig {
  color?: string;
  width?: number;
}

// 只读属性
// 一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:
interface Point {
  readonly x: number;
  readonly y: number;
}

// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
let rawArr: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = rawArr;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// rawArr = ro; // error!
// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
rawArr = ro as number[];

// readonly vs const
// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。
// 做为变量使用的话用 const，若做为属性则使用readonly。

// 函数类型
// 接口能够描述JavaScript中对象拥有的各种各样的外形。
// 除了描述带有属性的普通对象外，接口也可以描述函数类型。
// 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
// 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。
// 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};

// 可索引的类型
// 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];
let myStr: string = myArray[0];
// 上面例子里，我们定义了StringArray接口，它具有索引签名。
// 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。
// TypeScript支持两种索引签名：字符串和数字。
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。

// 字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配。
// 因为字符串索引声明了 obj.property和obj["property"]两种形式都可以。
// 下面的例子里， name的类型与字符串索引类型不匹配，所以类型检查器给出一个错误提示：
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
// 最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray3: ReadonlyStringArray = ["Alice", "Bob"];
// myArray3[2] = "Mallory"; // error!


// 类类型
// 实现接口
// 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。

