https://www.typescriptlang.org/docs/handbook/2/basic-types.html

[TOC]

# The Basics

JavaScript 中的每个值都有一组行为，您可以通过运行不同的操作观察到。这听起来很抽象，但作为一个简单的例子，考虑我们可能对名为 message 的变量运行的一些操作。

```ts
// Accessing the property 'toLowerCase'
// on 'message' and then calling it
message.toLowerCase();
// Calling 'message'
message();
```

如果我们分解它，第一行可运行的代码会访问一个名为 toLowerCase 的属性，然后调用它。第二个尝试直接调用消息。

但是，假设我们不知道消息的值（这很常见），我们就无法可靠地说尝试运行任何这些代码会得到什么结果。每个操作的行为完全取决于我们最初拥有的值。

* Is `message` callable?
* Does it have a property called `toLowerCase` on it?
* If it does, is `toLowerCase` even callable?
* If both of these values are callable, what do they return?

这些问题的答案通常是我们在编写 JavaScript 时牢记在心的，我们必须希望所有的细节都是正确的。

假设消息是按以下方式定义的。

```ts
const message = "Hello World!";
```

您可能会猜到，如果我们尝试运行 message.toLowerCase()，我们只会得到相同的小写字符串。

那第二行代码呢？如果您熟悉 JavaScript，您就会知道这会失败并出现异常：

如果我们能避免这样的错误就太好了。

当我们运行代码时，JavaScript 运行时选择要执行的操作的方式是确定值的类型 - 它具有哪些类型的行为和功能。这就是 TypeError 所暗示的内容的一部分 - 它表示字符串“Hello World!”不能作为函数调用。

对于某些值，例如基元字符串和数字，我们可以使用 typeof 运算符在运行时识别它们的类型。但对于函数之类的其他东西，没有相应的运行时机制来识别它们的类型。例如，考虑这个函数：

```ts
function fn(x) {
  return x.flip();
}
```

通过阅读代码我们可以观察到，只有给定一个具有可调用翻转属性的对象时，该函数才会起作用，但 JavaScript 并没有以我们可以在代码运行时检查的方式显示此信息。在纯 JavaScript 中，判断 fn 对特定值执行的操作的唯一方法是调用它并查看会发生什么。这种行为使得很难预测代码在运行之前会做什么，这意味着在编写代码时很难知道代码会做什么。

这样看来，类型是描述哪些值可以传递给 fn 以及哪些值会崩溃的概念。 JavaScript 只真正提供动态类型 - 运行代码看看会发生什么。

另一种方法是使用静态类型系统在代码运行之前预测代码预期执行的操作。



## Static type-checking 静态类型检查

回想一下我们之前尝试将字符串作为函数调用时遇到的 TypeError。大多数人不喜欢在运行代码时出现任何类型的错误 - 这些被视为错误！当我们编写新代码时，我们会尽力避免引入新的错误。

如果我们只添加一点代码，保存文件，重新运行代码，然后立即看到错误，我们也许能够快速隔离问题；但情况并非总是如此。我们可能没有足够彻底地测试该功能，因此我们可能永远不会真正遇到可能引发的潜在错误！或者，如果我们足够幸运地目睹了这个错误，我们可能最终会进行大规模的重构并添加许多我们被迫挖掘的不同代码。

理想情况下，我们可以拥有一个工具来帮助我们在代码运行之前找到这些错误。这就是像 TypeScript 这样的静态类型检查器所做的事情。静态类型系统描述了当我们运行程序时我们的值的形状和行为。像 TypeScript 这样的类型检查器使用这些信息并告诉我们什么时候事情可能会偏离轨道。

```ts
const message = "hello!";
 
message();
// ❌ This expression is not callable.
//  Type 'String' has no call signatures.
```

在我们首先运行代码之前，使用 TypeScript 运行最后一个示例将会给我们一条错误消息。



## Non-exception Failures 非异常故障

到目前为止，我们一直在讨论某些事情，例如运行时错误 - JavaScript 运行时告诉我们它认为某些事情是无意义的。出现这些情况是因为 ECMAScript 规范对语言在遇到意外情况时应如何表现有明确的说明。

例如，规范规定尝试调用不可调用的东西应该抛出错误。也许这听起来像是“明显的行为”，但您可以想象访问对象上不存在的属性也应该引发错误。相反，JavaScript 为我们提供了不同的行为并返回未定义的值：

```ts
const user = {
  name: "Daniel",
  age: 26,
};
user.location; // returns undefined
```

最终，静态类型系统必须调用系统中应将哪些代码标记为错误，即使它是不会立即抛出错误的“有效”JavaScript。在 TypeScript 中，以下代码会产生有关位置未定义的错误：

```ts
const user = {
  name: "Daniel",
  age: 26,
};
 
user.location;
// × Property 'location' does not exist on type '{ name: string; age: number; }'.
```

虽然有时这意味着要权衡您可以表达的内容，但其目的是捕获我们程序中的合法错误。 TypeScript 捕获了很多合法的错误。

例如：错别字

```ts
const announcement = "Hello World!";
 
// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();
 
// We probably meant to write this...
announcement.toLocaleLowerCase();
```

未调用的函数，

```ts
function flipCoin() {
  // Meant to be Math.random()
  return Math.random < 0.5;
// × Operator '<' cannot be applied to types '() => number' and 'number'.
}
```

或者基本的逻辑错误。

```ts
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
// × This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
  // Oops, unreachable
}
```



## Types for Tooling

当我们在代码中犯错时，TypeScript 可以捕获错误。这很棒，但 TypeScript 也可以从一开始就防止我们犯这些错误。

类型检查器具有用于检查诸如我们是否正在访问变量和其他属性的正确属性之类的信息。一旦获得该信息，它还可以开始建议您可能想要使用哪些属性。

这意味着 TypeScript 也可用于编辑代码，并且核心类型检查器可以在您在编辑器中键入时提供错误消息和代码完成。这是人们在谈论 TypeScript 工具时经常提到的部分内容。

TypeScript 认真对待工具，这不仅仅是您键入时的完成和错误。支持 TypeScript 的编辑器可以提供“快速修复”以自动修复错误、重构以轻松重新组织代码，以及有用的导航功能以跳转到变量的定义或查找对给定变量的所有引用。所有这些都构建在类型检查器之上并且完全跨平台，因此您最喜欢的编辑器可能具有可用的 TypeScript 支持。



## tsc, the TypeScript compiler

我们一直在谈论类型检查，但我们还没有使用我们的类型检查器。让我们来认识一下我们的新朋友 tsc，TypeScript 编译器。首先我们需要通过 npm 获取它。

```cmd
npm install -g typescript
```

> 这会全局安装 TypeScript Compiler tsc。如果您希望从本地 node_modules 包运行 tsc，则可以使用 npx 或类似工具。

现在让我们移动到一个空文件夹并尝试编写我们的第一个 TypeScript 程序：hello.ts：

```ts
// Greets the world.
console.log("Hello world!");
```

请注意，这里没有多余的装饰；这个“hello world”程序看起来与您用 JavaScript 编写的“hello world”程序相同。现在让我们通过运行 typescript 包为我们安装的命令 tsc 来对其进行类型检查。

```cmd
tsc hello.ts
```

但再次检查 - 我们得到了一些文件输出。如果我们查看当前目录，我们会在 hello.ts 旁边看到一个 hello.js 文件。这是 hello.ts 文件在 tsc 编译或转换为纯 JavaScript 文件后的输出。如果我们检查内容，我们会看到 TypeScript 在处理 .ts 文件后会输出什么：

在本例中，TypeScript 几乎不需要转换，因此它看起来与我们编写的内容相同。编译器尝试生成干净可读的代码，看起来就像人们会编写的代码。虽然这并不总是那么容易，但 TypeScript 会一致地缩进，注意我们的代码何时跨越不同的代码行，并尝试保留注释。

如果我们确实引入了类型检查错误怎么办？让我们重写 hello.ts：



## Emitting with Errors

在上一个示例中您可能没有注意到的一件事是我们的 hello.js 文件再次发生了更改。如果我们打开该文件，我们会看到内容基本上仍然与我们的输入文件相同。考虑到 tsc 报告了有关我们代码的错误，这可能有点令人惊讶，但这是基于 TypeScript 的核心价值观之一：很多时候，你会比 TypeScript 更了解。

重申一下之前的观点，类型检查代码限制了您可以运行的程序类型，因此需要权衡类型检查器认为可接受的程序类型。大多数情况下这是可以的，但在某些情况下这些检查会产生妨碍。例如，想象一下您将 JavaScript 代码迁移到 TypeScript 并引入类型检查错误。最终你会抽出时间为类型检查器清理一些东西，但是原始的 JavaScript 代码已经可以工作了！为什么将其转换为 TypeScript 会阻止您运行它？

所以 TypeScript 不会妨碍你。当然，随着时间的推移，您可能希望对错误采取更多的防御措施，并使 TypeScript 的行为更加严格。在这种情况下，您可以使用 noEmitOnError 编译器选项。尝试更改 hello.ts 文件并使用该标志运行 tsc：

```cmd
tsc --noEmitOnError hello.ts
```

您会注意到 hello.js 永远不会更新。



## Explicit Types 显式类型

到目前为止，我们还没有告诉 TypeScript 人物或日期是什么。让我们编辑代码来告诉 TypeScript person 是一个字符串，而 date 应该是一个 Date 对象。我们还将在日期上使用 toDateString() 方法。

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

我们所做的是在 person 和 date 上添加类型注释，以描述可以调用的值的类型。您可以将该签名理解为“greet 采用字符串类型的人员和 Date 类型的日期”。

有了这个，TypeScript 可以告诉我们greet可能被错误调用的其他情况。例如…

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
 
greet("Maddison", Date());
// × Argument of type 'string' is not assignable to parameter of type 'Date'.
```

啊？ TypeScript 在我们的第二个参数上报告了一个错误，但是为什么呢？

也许令人惊讶的是，在 JavaScript 中调用 Date() 返回一个字符串。另一方面，用 new Date() 构造一个 Date 实际上给了我们我们所期望的。

无论如何，我们可以快速修复错误：

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
 
greet("Maddison", new Date());
```

请记住，我们并不总是需要编写显式类型注释。在许多情况下，TypeScript 甚至可以为我们推断（或“找出”）类型，即使我们忽略它们。

即使我们没有告诉 TypeScript msg 具有字符串类型，它也能够弄清楚这一点。这是一个功能，当类型系统最终推断出相同的类型时，最好不要添加注释。

> 注意：如果您将鼠标悬停在该单词上，则前面的代码示例中的消息气泡是编辑器将显示的内容。



## Erased Types 擦除类型

我们来看看当我们用 tsc 编译上面的函数greet并输出JavaScript时会发生什么：

```ts
"use strict";
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Maddison", new Date());
```

这里请注意两件事：

1. 我们的人员和日期参数不再有类型注释。
2. 我们的“模板字符串”——使用反引号（` 字符）的字符串——被转换为带有连接的纯字符串。

稍后将详细讨论第二点，但现在让我们关注第一点。类型注释不是 JavaScript 的一部分（或者是学究气的 ECMAScript 的一部分），因此实际上没有任何浏览器或其他运行时可以不加修改地运行 TypeScript。这就是为什么 TypeScript 首先需要编译器 - 它需要某种方法来删除或转换任何 TypeScript 特定的代码，以便您可以运行它。大多数特定于 TypeScript 的代码都会被删除，同样，这里我们的类型注释也被完全删除了。

> 请记住：类型注释永远不会改变程序的运行时行为。



## Downleveling 降级

与上面的另一个区别是我们的模板字符串是从

```ts
`Hello ${person}, today is ${date.toDateString()}!`;
```

到

```ts
"Hello ".concat(person, ", today is ").concat(date.toDateString(), "!");
```

为什么会发生这种情况？

模板字符串是 ECMAScript 版本 ECMAScript 2015（又名 ECMAScript 6、ES2015、ES6 等 - 不要问）的一项功能。 TypeScript 能够将代码从较新版本的 ECMAScript 重写为旧版本，例如 ECMAScript 3 或 ECMAScript 5（又名 ES3 和 ES5）。从较新或“较高”版本的 ECMAScript 迁移到较旧或“较低”版本的过程有时称为降级。

默认情况下，TypeScript 的目标是 ES3，这是 ECMAScript 的一个非常旧的版本。我们可以通过使用目标选项来选择更新一些的东西。使用 --target es2015 运行会将 TypeScript 更改为目标 ECMAScript 2015，这意味着代码应该能够在支持 ECMAScript 2015 的任何地方运行。因此，运行 tsc --target es2015 hello.ts 会给出以下输出：

```ts
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
```

> 虽然默认目标是 ES3，但当前大多数浏览器都支持 ES2015。因此，大多数开发人员可以安全地指定 ES2015 或更高版本作为目标，除非与某些古老浏览器的兼容性很重要。



## Strictness 严格

不同的用户使用 TypeScript 在类型检查器中寻找不同的东西。有些人正在寻找更宽松的选择加入体验，这样可以帮助仅验证其程序的某些部分，并且仍然拥有不错的工具。这是 TypeScript 的默认体验，其中类型是可选的，推理采用最宽松的类型，并且不会检查潜在的 null/未定义值。就像 tsc 在遇到错误时发出的方式一样，这些默认值的设置是为了不妨碍您。如果您要迁移现有的 JavaScript，这可能是理想的第一步。

相比之下，许多用户更喜欢让 TypeScript 立即进行尽可能多的验证，这就是该语言也提供严格性设置的原因。这些严格性设置将静态类型检查从开关（无论您的代码是否被检查）转变为更接近拨号盘的东西。你把这个旋钮调得越大，TypeScript 就会为你检查越多。这可能需要一些额外的工作，但一般来说，从长远来看，它是值得的，并且可以实现更彻底的检查和更准确的工具。如果可能，新的代码库应始终打开这些严格性检查。

TypeScript 有几个可以打开或关闭的类型检查严格性标志，除非另有说明，否则我们所有的示例都将在启用所有这些标志的情况下编写。 CLI 中的 strict 标志或 tsconfig.json 中的 "strict": true 会同时打开它们，但我们可以单独选择退出它们。您应该了解的两个最大的检查是 noImplicitAny 和 strictNullChecks。

###### noImplicitAny

回想一下，在某些地方，TypeScript 不会尝试为我们推断类型，而是回退到最宽松的类型：any。这并不是最糟糕的事情 - 毕竟，回退到 any 无论如何都只是简单的 JavaScript 体验。

然而，使用 any 通常会违背使用 TypeScript 的初衷。您的程序的类型越多，您获得的验证和工具就越多，这意味着您在编码时遇到的错误会更少。打开 noImplicitAny 标志将对类型隐式推断为 any 的任何变量发出错误。

###### strictNullChecks

默认情况下，像 null 和 undefined 这样的值可以分配给任何其他类型。这可以使编写一些代码变得更容易，但是忘记处理 null 和 undefined 是世界上无数错误的原因 - 有些人认为这是一个十亿美元的错误！ strictNullChecks 标志使处理 null 和 undefined 更加明确，并且使我们不必担心是否忘记处理 null 和 undefined。