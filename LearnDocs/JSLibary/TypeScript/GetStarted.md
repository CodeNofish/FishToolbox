

编译器检查

自动完成

接口

JSX



## 什么是 JavaScript？一个简短的历史

总而言之，我们拥有一种专为快速使用而设计的语言，然后发展成为一种成熟的工具，可以编写数百万行应用程序。每种语言都有自己的怪癖——奇怪和惊喜，而 JavaScript 的卑微起步使其拥有许多怪癖。一些例子：

* JavaScript 的相等运算符 (==) 强制其操作数，导致意外行为：

```js
if ("" == 0) {
  // It is! But why??
}
if (1 < x < 3) {
  // True for *any* value of x!
}
```

* JavaScript 还允许访问不存在的属性：

```js
const obj = { width: 10, height: 15 };
// Why is this NaN? Spelling is hard!
const area = obj.width * obj.heigth;
```

当发生此类错误时，大多数编程语言都会抛出错误，有些语言会在编译期间（在任何代码运行之前）抛出错误。在编写小程序时，这种怪癖很烦人，但可以管理；当编写具有数百或数千行代码的应用程序时，这些不断出现的意外是一个严重的问题。



## TypeScript：静态类型检查器

我们之前说过，某些语言根本不允许这些有缺陷的程序运行。在不运行代码的情况下检测代码中的错误称为静态检查。根据所操作的值的类型来确定什么是错误，什么不是错误，这称为静态类型检查。

TypeScript 在执行前检查程序是否有错误，并根据值的类型进行检查，使其成为静态类型检查器。例如，上面的最后一个示例由于 obj 的类型而出现错误。这是 TypeScript 发现的错误：



#### Syntax 句法

TypeScript 是一种 JavaScript 超集语言：因此 JS 语法是合法的 TS。语法是指我们编写文本以形成程序的方式。例如，此代码存在语法错误，因为它缺少 )：

TypeScript 不会因为其语法而将任何 JavaScript 代码视为错误。这意味着您可以将任何有效的 JavaScript 代码放入 TypeScript 文件中，而不必担心它的具体编写方式。



#### Types 类型

但是，TypeScript 是类型化超集，这意味着它添加了有关如何使用不同类型值的规则。之前关于 obj.heigth 的错误不是语法错误：而是以不正确的方式使用某种值（类型）的错误。

另一个例子，这是您可以在浏览器中运行的 JavaScript 代码，它将记录一个值：

```ts
console.log(4 / []);
```

这个语法上合法的程序记录了 Infinity。不过，TypeScript 认为用数组除数是无意义的操作，并且会发出错误：

有可能您确实打算将数字除以数组，也许只是为了看看会发生什么，但大多数时候，这是一个编程错误。 TypeScript 的类型检查器旨在允许正确的程序通过，同时仍然捕获尽可能多的常见错误。 （稍后，我们将了解可用于配置 TypeScript 检查代码的严格程度的设置。）

如果将某些代码从 JavaScript 文件移动到 TypeScript 文件，您可能会看到类型错误，具体取决于代码的编写方式。这些可能是代码的合理问题，或者 TypeScript 过于保守。在本指南中，我们将演示如何添加各种 TypeScript 语法来消除此类错误。



#### Runtime Behavior 运行时行为

TypeScript 也是一种保留 JavaScript 运行时行为的编程语言。例如，在 JavaScript 中除以零会产生无穷大，而不是抛出运行时异常。原则上，TypeScript 永远不会改变 JavaScript 代码的运行时行为。

这意味着，如果将代码从 JavaScript 移动到 TypeScript，即使 TypeScript 认为代码存在类型错误，也保证以相同的方式运行。

保持与 JavaScript 相同的运行时行为是 TypeScript 的基本承诺，因为这意味着您可以轻松地在两种语言之间转换，而不必担心可能导致程序停止工作的细微差异。



#### Erased Types 擦除类型

粗略地说，一旦 TypeScript 的编译器完成对代码的检查，它就会删除类型以生成最终的“编译”代码。这意味着一旦你的代码被编译，生成的纯 JS 代码就没有类型信息。

这也意味着 TypeScript 永远不会根据它推断的类型更改程序的行为。最重要的是，虽然您可能在编译期间看到类型错误，但类型系统本身对程序运行时的工作方式没有影响。

最后，TypeScript 不提供任何额外的运行时库。您的程序将使用与 JavaScript 程序相同的标准库（或外部库），因此无需学习额外的 TypeScript 特定框架。



## TS

#### Types by Inference 推理类型

TypeScript 了解 JavaScript 语言，并且在许多情况下会为您生成类型。例如，在创建变量并将其分配给特定值时，TypeScript 将使用该值作为其类型。

通过了解 JavaScript 的工作原理，TypeScript 可以构建一个接受 JavaScript 代码但具有类型的类型系统。这提供了一个类型系统，无需添加额外的字符即可在代码中明确类型。这就是 TypeScript 知道 helloWorld 是上面示例中的字符串的方式。

您可能已经在 Visual Studio Code 中编写了 JavaScript，并且具有编辑器自动完成功能。 Visual Studio Code 在底层使用 TypeScript 来更轻松地使用 JavaScript。

#### Defining Types 定义类型

您可以在 JavaScript 中使用多种设计模式。然而，某些设计模式使得自动推断类型变得困难（例如，使用动态编程的模式）。为了涵盖这些情况，TypeScript 支持 JavaScript 语言的扩展，它为您提供了告诉 TypeScript 类型应该是什么的位置。

例如，要创建一个包含 name: string 和 id: number 的推断类型的对象，您可以编写：

```ts
const user = {
  name: "Hayes",
  id: 0,
};
```

您可以使用接口声明显式描述该对象的形状：

```ts
interface User {
  name: string;
  id: number;
}
```

然后，您可以通过在变量声明后使用类似 : TypeName 的语法来声明 JavaScript 对象符合新界面的形状：

```ts
const user: User = {
  name: "Hayes",
  id: 0,
};
```

如果您提供的对象与您提供的接口不匹配，TypeScript 会警告您：

由于 JavaScript 支持类和面向对象编程，TypeScript 也支持。您可以将接口声明与类一起使用：

```ts
interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Murphy", 1);
```

您可以使用接口来注释参数并将值返回给函数：

```ts
function deleteUser(user: User) {
  // ...
}
 
function getAdminUser(): User {
  //...
}
```

JavaScript 中已经有一小组可用的基本类型：boolean、bigint、null、number、string、symbol 和 undefined，您可以在接口中使用它们。 TypeScript 在此列表中添加了更多选项，例如any（允许任何内容）、unknown（确保使用此类型的人声明该类型是什么）、never（此类型不可能发生）和 void（返回的函数）未定义或没有返回值）。

您将看到构建类型有两种语法：接口和类型。你应该更喜欢interface。当您需要特定功能时，请使用类型。

#### Composing Types

使用 TypeScript，您可以通过组合简单类型来创建复杂类型。有两种流行的方法可以做到这一点：使用联合和使用泛型。

###### Unions

通过联合，您可以声明一个类型可以是多种类型中的一种。例如，您可以将布尔类型描述为 true 或 false：

```ts
type MyBool = true | false;
```

注意：如果将鼠标悬停在上面的 MyBool 上，您会看到它被归类为布尔值。这是结构类型系统的一个属性。下面详细介绍这一点。

联合类型的一个流行用例是描述值允许的字符串或数字文字集：

```ts
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

联合也提供了一种处理不同类型的方法。例如，您可能有一个接受数组或字符串的函数：

```ts
function getLength(obj: string | string[]) {
  return obj.length;
}
```

要了解变量的类型，请使用 typeof：

| Type      | Predicate                          |
| :-------- | :--------------------------------- |
| string    | `typeof s === "string"`            |
| number    | `typeof n === "number"`            |
| boolean   | `typeof b === "boolean"`           |
| undefined | `typeof undefined === "undefined"` |
| function  | `typeof f === "function"`          |
| array     | `Array.isArray(a)`                 |

###### Generics

泛型为类型提供变量。一个常见的例子是数组。没有泛型的数组可以包含任何内容。具有泛型的数组可以描述数组包含的值。

```ts
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

您可以声明自己的使用泛型的类型：

```ts
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
 
// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;
 
// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();
 
// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add(23);
// ❌ Argument of type 'number' is not assignable to parameter of type 'string'.
```

###### Structural Type System 结构类型系统

TypeScript 的核心原则之一是类型检查侧重于值的形状。这有时称为“鸭子类型”或“结构类型”。

在结构类型系统中，如果两个对象具有相同的形状，则它们被认为是同一类型。

```ts
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);
```

点变量从未声明为 Point 类型。但是，TypeScript 会将 point 的形状与类型检查中 Point 的形状进行比较。它们具有相同的形状，因此代码通过。

**形状匹配仅需要对象字段的子集进行匹配。**

```ts
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"
 
const color = { hex: "#187ABF" };
logPoint(color);
// ❌ Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
// ❌  Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
```

类和对象遵循形状的方式没有区别：

```ts
class VirtualPoint {
  x: number;
  y: number;
 
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
 
const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"
```

**如果对象或类具有所有必需的属性，TypeScript 会说它们匹配，无论实现细节如何。**
