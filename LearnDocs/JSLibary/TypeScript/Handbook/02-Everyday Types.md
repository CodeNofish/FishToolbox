[TOC]

# Everyday Types

在本章中，我们将介绍 JavaScript 代码中一些最常见的值类型，并解释在 TypeScript 中描述这些类型的相应方法。这并不是一个详尽的列表，以后的章节将描述命名和使用其他类型的更多方法。

除了类型注释之外，类型还可以出现在更多地方。当我们了解类型本身时，我们还将了解可以引用这些类型以形成新构造的位置。

我们将首先回顾您在编写 JavaScript 或 TypeScript 代码时可能遇到的最基本和常见的类型。这些稍后将形成更复杂类型的核心构建块。



## The primitives: string, number, and boolean

JavaScript 具有三种非常常用的原语：字符串、数字和布尔值。每个在 TypeScript 中都有对应的类型。正如您所期望的，如果您对这些类型的值使用 JavaScript typeof 运算符，这些名称与您会看到的名称相同：

* string 表示字符串值，例如“Hello, world”
* number 用于像 42 这样的数字。JavaScript 没有针对整数的特殊运行时值，因此没有与 int 或 float 等价的值 - 一切都只是数字
* 布尔值用于两个值 true 和 false

> 类型名称 String、Number 和 Boolean（以大写字母开头）是合法的，但它们引用了一些很少出现在代码中的特殊内置类型。始终使用字符串、数字或布尔值作为类型。



## Arrays

要指定数组的类型，例如 [1, 2, 3]，可以使用语法 number[];此语法适用于任何类型（例如 string[] 是字符串数组，等等）。您可能还会看到它写为 Array<number>，这意味着同样的事情。当我们介绍泛型时，我们将了解有关语法 T<U> 的更多信息。

> 请注意，[number] 是不同的东西；请参阅元组部分。



## any

TypeScript 还有一个特殊类型 any，只要您不希望特定值导致类型检查错误，就可以使用它。

当一个值的类型为any时，您可以访问它的任何属性（反过来，该属性也将是any类型），像函数一样调用它，将它分配给（或从）任何类型的值，或者几乎任何其他东西这在语法上是合法的：

```ts
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

当您不想只是为了让 TypeScript 相信某行特定代码没问题而编写长类型时，any 类型非常有用。

noImplicitAny 

当您不指定类型并且 TypeScript 无法从上下文中推断出类型时，编译器通常会默认为 any。

不过，您通常希望避免这种情况，因为 any 都没有经过类型检查。使用编译器标志 noImplicitAny 将任何隐式 any 标记为错误。



## Type Annotations on Variables 变量的类型注释

当您使用 const、var 或 let 声明变量时，您可以选择添加类型注释来显式指定变量的类型：

```ts
let myName: string = "Alice";
```

> TypeScript 不使用“左侧类型”风格的声明，例如 int x = 0;类型注释始终位于正在键入的内容之后。

但在大多数情况下，这是不需要的。只要有可能，TypeScript 就会尝试自动推断代码中的类型。例如，变量的类型是根据其初始值设定项的类型推断的：

```ts
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

在大多数情况下，您不需要明确学习推理规则。如果您刚开始，请尝试使用比您想象的更少的类型注释 - 您可能会惊讶于 TypeScript 完全理解正在发生的事情所需的数量如此之少。



## Functions

函数是 JavaScript 中传递数据的主要方式。 TypeScript 允许您指定函数的输入和输出值的类型。

#### Parameter Type Annotations 参数类型注释

声明函数时，可以在每个参数后面添加类型注释，以声明该函数接受的参数类型。参数类型注释位于参数名称之后：

```ts
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

当参数具有类型注释时，将检查该函数的参数：

```ts
// Would be a runtime error if executed!
greet(42);
// × Argument of type 'number' is not assignable to parameter of type 'string'.
```

> 即使你的参数上没有类型注释，TypeScript 仍然会检查你传递的参数数量是否正确。

#### Return Type Annotations 返回类型注释

您还可以添加返回类型注释。返回类型注释出现在参数列表之后：

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

与变量类型注释非常相似，您通常不需要返回类型注释，因为 TypeScript 会根据函数的返回语句推断函数的返回类型。上面示例中的类型注释没有改变任何东西。某些代码库会出于文档目的显式指定返回类型，以防止意外更改或仅出于个人喜好。

#### Functions Which Return Promises 返回 Promise 的函数

如果你想注释一个返回 Promise 的函数的返回类型，你应该使用 Promise 类型：

```ts
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

#### Anonymous Functions 匿名函数

匿名函数与函数声明略有不同。当函数出现在 TypeScript 可以确定如何调用它的位置时，该函数的参数将自动指定类型。

这是一个例子：

```ts
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

即使参数 s 没有类型注释，TypeScript 也使用 forEach 函数的类型以及推断的数组类型来确定 s 的类型。

这个过程称为上下文类型，因为函数发生的上下文决定了它应该具有什么类型。

与推理规则类似，您不需要明确了解这是如何发生的，但了解它确实发生可以帮助您注意到何时不需要类型注释。稍后，我们将看到更多示例，说明值出现的上下文如何影响其类型。



## Object Types

除了基元之外，您遇到的最常见的类型是对象类型。这是指任何具有属性的 JavaScript 值，几乎是所有属性！要定义对象类型，我们只需列出其属性及其类型。

例如，这是一个采用点状对象的函数：

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

在这里，我们使用具有两个属性（x 和 y）的类型来注释参数，这两个属性都是数字类型。您可以使用 , 或 ;分隔属性，最后一个分隔符无论哪种方式都是可选的。

每个属性的类型部分也是可选的。如果您不指定类型，则将假定为任何类型。

#### Optional Properties

对象类型还可以指定其部分或全部属性是可选的。为此，请添加一个 ?属性名称后：

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

在 JavaScript 中，如果访问不存在的属性，您将得到未定义的值，而不是运行时错误。因此，当您读取可选属性时，必须在使用它之前检查是否未定义。

```ts
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  // 'obj.last' is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }
 
  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```



## Union Types

TypeScript 的类型系统允许您使用多种运算符从现有类型构建新类型。现在我们知道如何编写几种类型，是时候开始以有趣的方式组合它们了。

#### Defining a Union Type

您可能会看到的第一种组合类型的方法是联合类型。联合类型是由两个或多个其他类型形成的类型，表示可以是这些类型中的任何一种类型的值。我们将这些类型中的每一种称为工会成员。

让我们编写一个可以对字符串或数字进行操作的函数：

```ts
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
// × Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

#### Working with Union Types

提供与联合类型匹配的值很容易 - 只需提供与任何联合成员匹配的类型即可。如果您有联合类型的值，您如何使用它？

仅当操作对联合体的每个成员都有效时，TypeScript 才会允许该操作。例如，如果您有联合字符串 | number，您不能使用仅适用于字符串的方法：

```ts
function printId(id: number | string) {
  console.log(id.toUpperCase());
// × Property 'toUpperCase' does not exist on type 'string | number'.
//  Property 'toUpperCase' does not exist on type 'number'.
}
```

解决方案是缩小代码的联合范围，就像在没有类型注释的 JavaScript 中一样。当 TypeScript 可以根据代码结构推断出更具体的值类型时，就会发生缩小。

例如，TypeScript 知道只有字符串值才会有 typeof 值“string”：

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

另一个例子是使用像 Array.isArray 这样的函数：

```ts
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```

请注意，在 else 分支中，我们不需要做任何特殊的事情 - 如果 x 不是 string[]，那么它一定是一个字符串。

有时你会建立一个联盟，其中所有成员都有一些共同点。例如，数组和字符串都有切片方法。如果联合中的每个成员都有一个共同的属性，则可以使用该属性而无需缩小范围：

```ts
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

> 类型的联合似乎具有这些类型属性的交集，这可能会令人困惑。这并非偶然——union 这个名字来自于类型理论。工会编号|字符串是通过取每种类型的值的并集而组成的。请注意，给定两个集合以及每个集合的相应事实，只有这些事实的交集适用于集合本身的并集。例如，如果我们有一个房间，里面都是戴着帽子的高个子，另一个房间里讲西班牙语的人都戴着帽子，那么将这些房间组合起来后，我们对每个人唯一了解的就是他们一定戴着帽子。



## Type Aliases 类型别名

我们一直通过直接在类型注释中编写对象类型和联合类型来使用它们。这很方便，但通常希望多次使用同一类型并通过单个名称引用它。

类型别名就是任何类型的名称。类型别名的语法是：

```ts
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

实际上，您可以使用类型别名为任何类型命名，而不仅仅是对象类型。例如，类型别名可以命名联合类型：

```ts
type ID = number | string;
```

请注意，别名只是别名 - 您不能使用类型别名来创建同一类型的不同/不同的“版本”。当您使用别名时，就像您编写了别名类型一样。换句话说，这段代码可能看起来非法，但根据 TypeScript 来说是可以的，因为两种类型都是同一类型的别名：

```ts
type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
 
// Create a sanitized input
let userInput = sanitizeInput(getInput());
 
// Can still be re-assigned with a string though
userInput = "new input";
```



## Interfaces

接口声明是命名对象类型的另一种方式：

```ts
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

就像我们上面使用类型别名一样，该示例的工作方式就像我们使用匿名对象类型一样。 TypeScript 只关心我们传递给 printCoord 的值的结构 - 它只关心它是否具有预期的属性。只关心类型的结构和功能就是我们将 TypeScript 称为结构类型类型系统的原因。

#### Differences Between Type Aliases and Interfaces

类型别名和接口之间的差异

类型别名和接口非常相似，在许多情况下您可以在它们之间自由选择。接口的几乎所有功能都可以在类型中使用，主要区别在于类型不能重新打开以添加新属性，而接口始终是可扩展的。

您将在后面的章节中了解有关这些概念的更多信息，因此如果您不能立即理解所有这些概念，请不要担心。

* 在 TypeScript 版本 4.2 之前，类型别名可能会出现在错误消息中，有时会代替等效的匿名类型（这可能是也可能不是所需的）。接口将始终在错误消息中命名。
* 类型别名可能不参与声明合并，但接口可以。
* 接口只能用于声明对象的形状，而不能重命名基元。
* 接口名称将始终以其原始形式出现在错误消息中，但仅限于按名称使用时。

大多数情况下，您可以根据个人喜好进行选择，TypeScript 会告诉您是否需要其他类型的声明。如果您想要启发式方法，请使用接口，直到您需要使用类型中的功能。



## Type Assertions 

有时，您会获得 TypeScript 无法了解的值类型信息。

例如，如果您使用 document.getElementById，TypeScript 只知道这将返回某种 HTMLElement，但您可能知道您的页面将始终有一个具有给定 ID 的 HTMLCanvasElement。

在这种情况下，您可以使用类型断言来指定更具体的类型：

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

与类型注释一样，类型断言会被编译器删除，并且不会影响代码的运行时行为。

您还可以使用尖括号语法（除非代码位于 .tsx 文件中），它等效于：

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

> 提醒：由于类型断言在编译时被删除，因此不存在与类型断言相关的运行时检查。如果类型断言错误，不会产生异常或 null。

TypeScript 只允许类型断言转换为更具体或不太具体的类型版本。该规则可以防止“不可能”的强制，例如：

```ts
const x = "hello" as number;
// × Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

有时，此规则可能过于保守，并且不允许可能有效的更复杂的强制。如果发生这种情况，您可以使用两个断言，首先是任何（或未知，我们将在稍后介绍），然后是所需的类型：

```ts
const a = expr as any as T;
```



## Literal Types

除了一般的字符串和数字类型外，我们还可以在类型位置引用特定的字符串和数字。

思考这个问题的一种方法是考虑 JavaScript 如何使用不同的方式来声明变量。 var 和 let 都允许更改变量内保存的内容，而 const 则不允许。这反映在 TypeScript 如何为文字创建类型上。

就其本身而言，文字类型并不是很有价值：

一个只能有一个值的变量并没有多大用处！

但是通过将文字组合成联合，您可以表达更有用的概念 - 例如，仅接受一组特定已知值的函数：

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// × Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

数字文字类型的工作方式相同：

```ts
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

当然，您可以将它们与非文字类型结合起来：

```ts
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
// × Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

还有另一种文字类型：布尔文字。只有两种布尔文字类型，正如您可能猜到的，它们是 true 和 false 类型。 boolean 类型本身实际上只是 union true | 的别名。错误的。

#### Literal Inference 字面推理

当您使用对象初始化变量时，TypeScript 假定该对象的属性稍后可能会更改值。例如，如果您编写了这样的代码：

```ts
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

TypeScript 不会假设将 1 分配给之前为 0 的字段是错误的。另一种说法是 obj.counter 必须具有类型编号，而不是 0，因为类型用于确定读取和写入行为。

这同样适用于字符串：

```ts
declare function handleRequest(url: string, method: "GET" | "POST"): void;
 
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// × Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

在上面的示例中，req.method 被推断为字符串，而不是“GET”。由于代码可以在创建 req 和调用 handleRequest 之间进行评估，这可能会向 req.method 分配一个新字符串（如“GUESS”），因此 TypeScript 认为此代码有错误。