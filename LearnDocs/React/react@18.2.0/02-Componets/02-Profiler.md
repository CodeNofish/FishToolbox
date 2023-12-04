<Profiler> 允许您以编程方式测量 React 树的渲染性能。
```react
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```



#### Reference 

将组件树包装在 <Profiler> 中以测量其渲染性能。

```react
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```

###### Props 

* id：标识您正在测量的 UI 部分的字符串。
* onRender：每次分析树中的组件更新时 React 都会调用的 onRender 回调。它接收有关渲染内容和花费时间的信息。

###### Caveats 

* 分析会增加一些额外的开销，因此默认情况下在生产版本中禁用它。要选择生产分析，您需要启用一个特殊的生产构建并启用分析。

###### onRender callback

React 将调用您的 onRender 回调并提供有关渲染内容的信息。

```react
function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings...
}
```

Parameters 

* `id`: The string `id` prop of the `<Profiler>` tree that has just committed. This lets you identify which part of the tree was committed if you are using multiple profilers.

  id：刚刚提交的 <Profiler> 树的字符串 id 属性。如果您使用多个探查器，这可以让您确定树的哪一部分已提交。

* `phase`: `"mount"`, `"update"` or `"nested-update"`. This lets you know whether the tree has just been mounted for the first time or re-rendered due to a change in props, state, or hooks.

  阶段：“安装”、“更新”或“嵌套更新”。这可以让您知道树是刚刚第一次安装还是由于 props、state 或 hooks 的变化而重新渲染。

* `actualDuration`: The number of milliseconds spent rendering the `<Profiler>` and its descendants for the current update. This indicates how well the subtree makes use of memoization (e.g. [`memo`](https://react.dev/reference/react/memo) and [`useMemo`](https://react.dev/reference/react/useMemo)). Ideally this value should decrease significantly after the initial mount as many of the descendants will only need to re-render if their specific props change.

  实际持续时间：当前更新渲染 <Profiler> 及其后代所花费的毫秒数。这表明子树使用记忆化的程度（例如 memo 和 useMemo）。理想情况下，该值应该在初始安装后显着下降，因为许多后代仅在其特定道具发生变化时才需要重新渲染。

* `baseDuration`: The number of milliseconds estimating how much time it would take to re-render the entire `<Profiler>` subtree without any optimizations. It is calculated by summing up the most recent render durations of each component in the tree. This value estimates a worst-case cost of rendering (e.g. the initial mount or a tree with no memoization). Compare `actualDuration` against it to see if memoization is working.

  baseDuration：毫秒数，估计在不进行任何优化的情况下重新渲染整个 <Profiler> 子树所需的时间。它是通过总结树中每个组件的最新渲染持续时间来计算的。该值估计最坏情况下的渲染成本（例如初始安装或没有记忆的树）。将实际持续时间与它进行比较，看看记忆是否有效。

* `startTime`: A numeric timestamp for when React began rendering the current update.

  startTime：React 开始渲染当前更新的数字时间戳。

* `commitTime`: A numeric timestamp for when React committed the current update. This value is shared between all profilers in a commit, enabling them to be grouped if desirable.

  commitTime：React 提交当前更新的数字时间戳。该值在提交中的所有分析器之间共享，以便在需要时可以对它们进行分组。



#### Usage 

###### Measuring rendering performance programmatically  以编程方式测量渲染性能

将 <Profiler> 组件包裹在 React 树周围以测量其渲染性能。

```react
<App>
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  <PageContent />
</App>
```

它需要两个 props：一个 id（字符串）和一个 onRender 回调（函数），React 在树中的组件“提交”更新时调用该回调。

> Pitfall
>
> 分析会增加一些额外的开销，因此默认情况下在生产版本中禁用它。要选择生产分析，您需要启用一个特殊的生产构建并启用分析。
>
> https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977

> Note
>
> <Profiler> 允许您以编程方式收集测量值。如果您正在寻找交互式分析器，请尝试 React Developer Tools 中的 Profiler 选项卡。它公开了与浏览器扩展类似的功能。



###### Measuring different parts of the application 测量应用程序的不同部分

您可以使用多个 <Profiler> 组件来测量应用程序的不同部分：

```react
<App>
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  <Profiler id="Content" onRender={onRender}>
    <Content />
  </Profiler>
</App>
```

您还可以嵌套 <Profiler> 组件：

```react
<App>
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  <Profiler id="Content" onRender={onRender}>
    <Content>
      <Profiler id="Editor" onRender={onRender}>
        <Editor />
      </Profiler>
      <Preview />
    </Content>
  </Profiler>
</App>
```

虽然 <Profiler> 是一个轻量级组件，但应该仅在必要时使用它。每次使用都会给应用程序增加一些 CPU 和内存开销。
