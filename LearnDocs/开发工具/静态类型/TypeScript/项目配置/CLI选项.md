https://www.typescriptlang.org/docs/handbook/compiler-options.html



在本地运行 tsc 将编译由 tsconfig.json 定义的最接近的项目，或者您可以通过传入所需的文件 glob 来编译一组 TypeScript 文件。在命令行上指定输入文件时，tsconfig.json 文件将被忽略。

```sh
# Run a compile based on a backwards look through the fs for a tsconfig.json
tsc
# Emit JS for just the index.ts with the compiler defaults
tsc index.ts
# Emit JS for any .ts files in the folder src, with the default settings
tsc src/*.ts
# Emit files referenced in with the compiler settings from tsconfig.production.json
tsc --project tsconfig.production.json
# Emit d.ts files for a js file with showing compiler options which are booleans
tsc index.js --declaration --emitDeclarationOnly
# Emit a single .js file from two files via compiler options which take string arguments
tsc app.ts util.ts --target esnext --outfile index.js
```



# Compiler Options

**If you’re looking for more information about the compiler options in a tsconfig, check out the [TSConfig Reference](https://www.typescriptlang.org/tsconfig)**



#### CLI Commands

| Flag            | Description                                                  | Type |
| --------------- | ------------------------------------------------------------ | ---- |
| --init          | Initializes a TypeScript project and creates a tsconfig.json file. |      |
| --listFilesOnly | Print names of files that are part of the compilation and then stop processing. |      |
| --locale        | Set the language of the messaging from TypeScript. This does not affect emit. |      |
| --project       | 给定其配置文件的路径或带有“tsconfig.json”的文件夹的路径来编译项目。 |      |
| --showConfig    | 打印最终配置而不是构建。                                     |      |
| --generateTrace | 生成事件跟踪和类型列表。                                     |      |



#### Build Options

| Flag      | Description                                       | Type |
| --------- | ------------------------------------------------- | ---- |
| --build   | 构建一个或多个项目及其依赖项（如果已过时）        |      |
| --clean   | 删除所有项目的输出。                              |      |
| --dry     | 显示将构建的内容（或删除，如果使用“--clean”指定） |      |
| --force   | 构建所有项目，包括那些看起来是最新的项目          |      |
| --verbose | 启用详细日志记录。                                |      |



#### Watch Options

