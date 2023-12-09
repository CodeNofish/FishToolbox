

#### constructor 属性

constructor 属性返回所有 JavaScript 变量的构造函数。

```js
"John".constructor                 
// 返回函数 String()  { [native code] }
(3.14).constructor                 
// 返回函数 Number()  { [native code] }
false.constructor                 
// 返回函数 Boolean() { [native code] }
[1,2,3,4].constructor             
// 返回函数 Array()   { [native code] }
{name:'John', age:34}.constructor 
// 返回函数 Object()  { [native code] }
	new Date().constructor            
// 返回函数 Date()    { [native code] }
function () {}.constructor        
// 返回函数 Function(){ [native code] }
```



#### 严格模式

严格模式下你不能使用未声明的变量。

"严格模式"体现了Javascript更合理、更安全、更严谨的发展方向，包括IE 10在内的主流浏览器，都已经支持它，许多大项目已经开始全面拥抱它。

另一方面，同样的代码，在"严格模式"中，可能会有不一样的运行结果；一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。掌握这些内容，有助于更细致深入地理解Javascript，让你变成一个更好的程序员。



#### 比较运算符常见错误

在常规的比较中，数据类型是被忽略的，以下 if 条件语句返回 true：

```js
var x = 10;
var y = "10";
if (x == y)
```

在严格的比较运算中，=== 为恒等计算符，同时检查表达式的值与类型，以下 if 条件语句返回 false：

```js
var x = 10;
var y = "10";
if (x === y)
```



#### 浮点型数据使用注意事项

JavaScript 中的所有数据都是以 64 位**浮点型数据(float)** 来存储。

```js
var x = 0.1;
var y = 0.2;
var z = x + y            // z 的结果为 0.30000000000000004
if (z == 0.3)            // 返回 false
```

