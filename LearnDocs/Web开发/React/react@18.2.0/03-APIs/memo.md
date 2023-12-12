https://react.dev/reference/react/memo

# memo

memo 允许您在组件的 props 未更改时跳过重新渲染组件。

```react
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```



## Reference

**memo(Component, arePropsEqual?)**

Wrap a component in `memo` to get a *memoized* version of that component. This memoized version of your component will usually not be re-rendered when its parent component is re-rendered as long as its props have not changed. But React may still re-render it: memoization is a performance optimization, not a guarantee.

将组件包装在备忘录中以获取该组件的记忆版本。只要组件的 props 没有改变，当它的父组件重新渲染时，组件的这个记忆版本通常不会被重新渲染。但 React 可能仍然会重新渲染它：memoization 是一种性能优化，而不是保证。

```react
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

###### Parameters

* Component: The component that you want to memoize. The memo does not modify this component, but returns a new, memoized component instead. Any valid React component, including functions and forwardRef components, is accepted.

  组件：您要记住的组件。备忘录不会修改此组件，而是返回一个新的已记忆的组件。任何有效的 React 组件，包括函数和forwardRef 组件，都被接受。

* **optional** `arePropsEqual`: A function that accepts two arguments: the component’s previous props, and its new props. It should return `true` if the old and new props are equal: that is, if the component will render the same output and behave in the same way with the new props as with the old. Otherwise it should return `false`. Usually, you will not specify this function. By default, React will compare each prop with [`Object.is`.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

  可选 arePropsEqual：一个接受两个参数的函数：组件之前的 props 和新的 props。如果新旧 props 相等，它应该返回 true：也就是说，如果组件将渲染相同的输出，并且使用新 props 的行为方式与旧 props 相同。否则它应该返回 false。通常，您不会指定此函数。默认情况下，React 会将每个 prop 与 Object.is 进行比较。

###### Returns

memo returns a new React component. It behaves the same as the component provided to memo except that React will not always re-render it when its parent is being re-rendered unless its props have changed.

memo 返回一个新的 React 组件。它的行为与提供给 memo 的组件相同，除了 React 在其父级重新渲染时并不总是重新渲染它，除非它的 props 发生了变化。



## Usage

#### Skipping re-rendering when props are unchanged 当 props 不变时跳过重新渲染

每当其父组件重新渲染时，React 通常都会重新渲染该组件。使用 memo，您可以创建一个组件，只要其新 props 与旧 props 相同，React 就不会在其父级重新渲染时重新渲染。这样的组件被认为是被记忆的。

要记住一个组件，请将其包装在 memo 中并使用它返回的值代替原始组件：

```react
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

**React 组件应该始终具有纯渲染逻辑。这意味着如果它的 props、state 和 context 没有改变，它必须返回相同的输出。通过使用 memo，您可以告诉 React 您的组件符合此要求，因此只要其 props 没有更改，React 就不需要重新渲染。**即使使用备忘录，如果组件自身的状态发生变化或者它正在使用的上下文发生变化，您的组件也会重新渲染。

在此示例中，请注意，每当名称更改时 Greeting 组件都会重新渲染（因为这是它的 props 之一），但在地址更改时则不会重新渲染（因为它没有作为 props 传递给 Greeting）：

```react
import { memo, useState } from 'react';

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}

const Greeting = memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello{name && ', '}{name}!</h3>;
});
```

> 您应该只依赖备忘录作为性能优化。如果你的代码没有它就无法工作，请先找到根本问题并修复它。然后你可以添加备忘录来提高性能。



#### Updating a memoized component using state 使用状态更新记忆组件

即使组件被记忆，当其自身状态发生变化时，它仍然会重新渲染。记忆化仅与从其父组件传递给组件的 props 有关。

```react
import { memo, useState } from 'react';

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}

const Greeting = memo(function Greeting({ name }) {
  console.log('Greeting was rendered at', new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState('Hello');
  return (
    <>
      <h3>{greeting}{name && ', '}{name}!</h3>
      <GreetingSelector value={greeting} onChange={setGreeting} />
    </>
  );
});

function GreetingSelector({ value, onChange }) {
  return (
    <>
      <label>
        <input
          type="radio"
          checked={value === 'Hello'}
          onChange={e => onChange('Hello')}
        />
        Regular greeting
      </label>
      <label>
        <input
          type="radio"
          checked={value === 'Hello and welcome'}
          onChange={e => onChange('Hello and welcome')}
        />
        Enthusiastic greeting
      </label>
    </>
  );
}
```

**如果你将状态变量设置为其当前值，即使没有备忘录，React也会跳过重新渲染你的组件。您可能仍然会看到组件函数被额外调用一次，但结果将被丢弃。**



#### Updating a memoized component using a context 使用上下文更新记忆组件

**即使组件被记忆，当它使用的上下文发生变化时，它仍然会重新渲染。**记忆化仅与从其父组件传递给组件的 props 有关。

```react
import { createContext, memo, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('dark');

  function handleClick() {
    setTheme(theme === 'dark' ? 'light' : 'dark'); 
  }

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={handleClick}>
        Switch theme
      </button>
      <Greeting name="Taylor" />
    </ThemeContext.Provider>
  );
}

const Greeting = memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  const theme = useContext(ThemeContext);
  return (
    <h3 className={theme}>Hello, {name}!</h3>
  );
});
```

To make your component re-render only when a *part* of some context changes, split your component in two. Read what you need from the context in the outer component, and pass it down to a memoized child as a prop.

要使组件仅在某些上下文的一部分发生更改时重新渲染，请将组件一分为二。从外部组件的上下文中读取您需要的内容，并将其作为prop传递给记忆的子组件。



#### Minimizing props changes 尽量减少道具变化

当您使用 memo 时，只要任何 prop 不浅等于之前的值，您的组件就会重新渲染。这意味着 React 使用 Object.is 比较将组件中的每个 prop 与其之前的值进行比较。请注意，Object.is(3, 3) 为 true，但 Object.is({}, {}) 为 false。

**为了充分利用备忘录，请尽量减少道具更改的次数。例如，如果 prop 是一个对象，请使用 useMemo 防止父组件每次都重新创建该对象：**

```react
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```

A better way to minimize props changes is to make sure the component accepts the minimum necessary information in its props. For example, it could accept individual values instead of a whole object:

最小化 props 更改的更好方法是确保组件在其 props 中接受最少的必要信息。例如，它可以接受单个值而不是整个对象：

```react
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);
  return <Profile name={name} age={age} />;
}

const Profile = memo(function Profile({ name, age }) {
  // ...
});
```

Even individual values can sometimes be projected to ones that change less frequently. For example, here a component accepts a boolean indicating the presence of a value rather than the value itself:

有时甚至可以将个人价值观投射到变化较少的价值观上。例如，这里的组件接受指示值是否存在的布尔值，而不是值本身：

```react
function GroupsLanding({ person }) {
  const hasGroups = person.groups !== null;
  return <CallToAction hasGroups={hasGroups} />;
}

const CallToAction = memo(function CallToAction({ hasGroups }) {
  // ...
});
```

当您需要将函数传递给记忆组件时，可以在组件外部声明它以使其永远不会更改，或者使用Callback在重新渲染之间缓存其定义。



#### Specifying a custom comparison function 指定自定义比较函数

在极少数情况下，最小化已记忆组件的 props 更改可能是不可行的。在这种情况下，您可以提供一个自定义比较函数，React 将使用该函数来比较新旧 props，而不是使用浅层相等。该函数作为第二个参数传递给 memo。仅当新 props 产生与旧 props 相同的输出时，它才应返回 true；否则它应该返回 false。

```react
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}
```

如果您这样做，请使用浏览器开发人员工具中的性能面板来确保您的比较功能实际上比重新渲染组件更快。你可能会感到惊讶。

当您进行性能测量时，请确保 React 正在生产模式下运行。

> ### Pitfall
>
> 如果您提供自定义 arePropsEqual 实现，则必须比较每个 prop，包括函数。函数通常会关闭父组件的 props 和 state。如果您在 oldProps.onClick !== newProps.onClick 时返回 true，您的组件将继续在其 onClick 处理程序内“查看”先前渲染的 props 和状态，从而导致非常令人困惑的错误。
>
> 避免在 arePropsEqual 内部进行深度相等检查，除非您 100% 确定您正在使用的数据结构具有已知的有限深度。深度相等检查可能会变得非常慢，并且如果有人稍后更改数据结构，可能会冻结您的应用程序很多秒。





## Troubleshooting

#### My component re-renders when a prop is an object, array, or function 

当 prop 是对象、数组或函数时，我的组件会重新渲染

React 通过浅层相等来比较新旧 props：也就是说，它考虑每个新 props 是否引用等于旧 props。如果每次重新渲染父对象时都创建一个新的对象或数组，即使各个元素都相同，React 仍会认为它已更改。类似地，如果你在渲染父组件时创建了一个新函数，即使该函数具有相同的定义，React也会认为它已经改变。为了避免这种情况，请简化父组件中的 props 或 memoize props。