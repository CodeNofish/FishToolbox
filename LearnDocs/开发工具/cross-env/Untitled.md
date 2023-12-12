https://github.com/kentcdodds/cross-env

环境脚本的跨平台设置

#### problem

当您像这样使用 NODE_ENV=Production 设置环境变量时，大多数 Windows 命令提示符都会卡住。 （Windows 上的 Bash 是个例外，它使用本机 Bash。）类似地，Windows 和 POSIX 命令利用环境变量的方式也有所不同。对于 POSIX，您使用：$ENV_VAR，在 Windows 上您使用 %ENV_VAR%。

#### solution

cross-env 使得您可以使用单个命令，而不必担心为平台正确设置或使用环境变量。只需像在 POSIX 系统上运行一样设置它，cross-env 将负责正确设置它。

#### Usage

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

最终，执行的命令（使用交叉生成）是：

```sh
webpack --config build/webpack.config.js
```

NODE_ENV 环境变量将通过 cross-env 设置

您可以一次设置多个环境变量：

```json
{
  "scripts": {
    "build": "cross-env FIRST_ENV=one SECOND_ENV=two node ./my-program"
  }
}
```

您还可以将一个命令拆分为多个命令，或者将环境变量声明与实际命令执行分开。你可以这样做：