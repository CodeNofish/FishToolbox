https://zhuanlan.zhihu.com/p/296277982



#### Partial

将其变为可选

```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

`keyof T` 拿到 `T` 所有属性名, 然后 `in` 进行遍历, 将值赋给 `P`, 最后 `T[P]` 取得相应属性的值.

```
interface People {name: string}
// 变为
Partial<People> => {name?: string}
```

其是有局限性的，只能处理一层

#### Readonly

```ts
type Readonly<T> {readonly [P in keyof T]: T[P]}
```

当然这也只能一层 如上面Partial例子来看jack.person.name 是可以直接修改的。 也可以和Partial结合起来

```ts
type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] };
```

#### Required

```ts
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

上面的`-?`, 这里很好理解就是将可选项代表的 `?` 去掉, 从而让这个类型变成必选项. 与之对应的还有个`+?` , 这个含义自然与`-?`之前相反, 它是用来把属性变成可选项的.

#### Pick

从 T 中取出 一系列 K 的属性

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

例子：

```text
type NewPerson = Pick<People, 'name'>; // { name: string; }
```

#### Exclude

从 T 中移除 一系列 U 的属性

```ts
type Exclude<T, U> = T extends U ? never : T;
// demo
type T = Exclude<1 | 2, 1 | 3> // => 2
```

与 Exclude 类似的 `Extract<T, U>`(取交集)

```ts
type Extract<T, U> = T extends U ? T : never;
type T = Extract<'a'|'b'|'c'|'d' ,'b'|'c'|'e' > // => // 'b'|'c'
```

将Pick 和 Exclude 结合起来实战

```text
// 比如后端接口定义好的返回类型是这个，但是我们并不能直接修改
interface Api {
    name: string;
    age: number
}
// error: Types of property 'name' are incompatible.
interface CustomApi extends Api {
  name: number;
}
// change
interface CustomApi1 extends Pick<Chicken, 'age'> {
  name: number;
}

// 但是上面还是太复杂了，你需要把所有属性挑拣起来，结合 Exclude 将key全拿出来 可以省事很多
interface CustomApi2 extends Pick<Api, Exclude<keyof Api, 'name'>> {
  name: number;
}
// 上述其实 就是Omit的源码
interface CustomApi3 extends Omit<Api, 'name'> {
  name: number;
}
```

类似`Exclude`作用的 还有 `NonNullable`,将 `null | undefined`排除

```text
type NonNullable<T> = T extends null | undefined ? never : T;
// demo
type Test = '111' | '222' | null;
type NewTest = NonNullable<Test>; // '111' | '222'
```

### Omit

未包含

```text
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
// demo
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number }
```

#### Record

标记对象的 key value类型

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// demo
const user: Record<'name'|'email', string> = {
    name: '', 
    email: ''
}

// 复杂一点
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>;
// 这里简易实现，否则报ts(2391)错误
function mapObject(): any {}
const names = { foo: "hello", bar: "world", baz: "bye" };
const lengths = mapObject(names, s => s.length); 
type newNames =  typeof lengths  // => { foo: number, bar: number, baz: number }
```



### ReturnType

反解

```text
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

其实这里的 `infer R` 就是声明一个变量来承载传入函数签名的返回值类型（反解）, 简单说就是用它取到函数返回值的类型方便之后使用. 举个例子来理解`infer`

```text
// 反解Promise类型
type PromiseType<T> = (args: any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;
// demo
async function stringPromise() {
  return "string promise";
}
type extractStringPromise = UnPromisify<typeof stringPromise>; // string
```

ReturnType demo

```text
// demo
function TestFn() {
  return 'test';
}
type Test = ReturnType<typeof TestFn>; // => string
```

和上述差不多了 我们可以依葫芦画瓢 个 PromiseType

```text
type PromiseType<T extends Promise<any>> = T extends Promise<infer R>  ? R  : never;
// demo
type Test = PromiseType<Promise<string>> // => string
```

再结合深入一点

```text
type PromiseReturnType<T extends () => any> = ReturnType<T> extends Promise<
  infer R
>
  ? R
  : ReturnType<T>

async function test() {
  return { a: 1, b: '2' }
}

type Test = PromiseReturnType<typeof test> // Test 的类型为 { a: number; b: string }
```

### Parameters

获取一个函数的所有参数类型

上面的`ReturnType`认识了`infer`,这里直接放源码和demo了

```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
// demo
interface IPerson {name: string}
interface IFunc {
  (person: IPerson, count: number): boolean
}
type P = Parameters<IFunc> // => [IPerson, number]
const person1: P[0] = {
  name: '1'
}
```



### ConstructorParameters

类似于 `Parameters<T>`, `ConstructorParameters` 获取一个类的构造函数参数

```ts
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

// demo
type DateConstrParams = ConstructorParameters<typeof Date>  // => string | number | Date

//  这里补充一下，源码中Date构造器定义
interface DateConstructor {
    new (value: number | string | Date): Date;
}
```