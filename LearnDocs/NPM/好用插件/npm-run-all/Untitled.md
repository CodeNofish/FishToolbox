https://www.npmjs.com/package/npm-run-all



## Motivation

* **Simplify**

官方npm run-script命令无法运行多个脚本，所以如果我们想运行多个脚本，就有点多余了。让我们通过类似glob的模式来缩短它。
之前：`npm run clean && npm run build:css && npm run build:js && npm run build:html`
之后：`npm-run-all clean build:*`

* **Cross platform.**

我们有时会使用`&`并行运行多个命令，但是`cmd.exe`（`npm run-script`默认使用它）不支持`&`. 一半的 Node.js 用户在 Windows 上使用它，因此使用`&`可能会阻止贡献。`npm-run-all --parallel`在 Windows 上也能很好地工作。



## Installation

```cmd
$ npm install npm-run-all --save-dev
# or 
$ yarn add npm-run-all --dev
```

- It requires `Node@>=4`.



## Usage

### CLI Commands

This `npm-run-all` package provides 3 CLI commands.

- [npm-run-all](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/npm-run-all.md)
- [run-s](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/run-s.md)
- [run-p](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/run-p.md)

The main command is [npm-run-all](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/npm-run-all.md). We can make complex plans with [npm-run-all](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/npm-run-all.md) command.

Both [run-s](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/run-s.md) and [run-p](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/run-p.md) are shorthand commands. [run-s](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/run-s.md) is for sequential, [run-p](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/run-p.md) is for parallel. We can make simple plans with those commands.

#### Yarn Compatibility

If a script is invoked with Yarn, `npm-run-all` will correctly use Yarn to execute the plan's child scripts.

### Node API

This `npm-run-all` package provides Node API.

- [Node API](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/node-api.md)