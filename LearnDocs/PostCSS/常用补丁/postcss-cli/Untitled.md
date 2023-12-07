https://github.com/postcss/postcss-cli

[TOC]

# PostCSS CLI

#### Install

```cmd
npm i -D postcss postcss-cli
```

#### Usage

```
Usage:
  postcss [input.css] [OPTIONS] [-o|--output output.css] [--watch|-w]
  postcss <input.css>... [OPTIONS] --dir <output-directory> [--watch|-w]
  postcss <input-directory> [OPTIONS] --dir <output-directory> [--watch|-w]
  postcss <input-glob-pattern> [OPTIONS] --dir <output-directory> [--watch|-w]
  postcss <input.css>... [OPTIONS] --replace

Basic options:
  -o, --output   Output file                                            [string]
  -d, --dir      Output directory                                       [string]
  -r, --replace  Replace (overwrite) the input file                    [boolean]
  -m, --map      Create an external sourcemap
  --no-map       Disable the default inline sourcemaps
  -w, --watch    Watch files for changes and recompile as needed       [boolean]
  --verbose      Be verbose                                            [boolean]
  --env          A shortcut for setting NODE_ENV                        [string]

Options for use without a config file:
  -u, --use      List of postcss plugins to use                          [array]
  --parser       Custom postcss parser                                  [string]
  --stringifier  Custom postcss stringifier                             [string]
  --syntax       Custom postcss syntax                                  [string]

Options for use with --dir:
  --ext   Override the output file extension; for use with --dir        [string]
  --base  Mirror the directory structure relative to this path in the output
          directory, for use with --dir                                 [string]

Advanced options:
  --include-dotfiles  Enable glob to match files/dirs that begin with "."
                                                                       [boolean]
  --poll              Use polling for file watching. Can optionally pass polling
                      interval; default 100 ms
  --config            Set a custom directory to look for a config file  [string]

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]

Examples:
  postcss input.css -o output.css                       Basic usage
  postcss src/**/*.css --base src --dir build           Glob Pattern & output
  cat input.css | postcss -u autoprefixer > output.css  Piping input & output

If no input files are passed, it reads from stdin. If neither -o, --dir, or
--replace is passed, it writes to stdout.

If there are multiple input files, the --dir or --replace option must be passed.

Input files may contain globs (e.g. src/**/*.css). If you pass an input
directory, it will process all files in the directory and any subdirectories,
respecting the glob pattern.
```

> ℹ️ More details on custom parsers, stringifiers and syntaxes, can be found [here](https://github.com/postcss/postcss#syntaxes).



#### Config

如果您需要将选项传递给插件，或者有很长的插件链，您将需要使用配置文件。

postcss.config.js

```js
module.exports = {
  parser: 'sugarss',
  plugins: [
    require('postcss-import')({ ...options }),
    require('postcss-url')({ url: 'copy', useHash: true }),
  ],
}
```

请注意，您无法在配置文件中设置 postcss 的 from 或 to 选项。它们是根据 CLI 参数自动设置的。



#### Context

对于更高级的用法，建议使用 postcss.config.js 中的函数；这使您可以访问 CLI 上下文以动态应用每个文件的选项和插件

| Name      | Type       | Default                            | Description          |
| --------- | ---------- | ---------------------------------- | -------------------- |
| `env`     | `{String}` | `'development'`                    | process.env.NODE_ENV |
| `file`    | `{Object}` | `dirname, basename, extname`       | File                 |
| `options` | `{Object}` | `map, parser, syntax, stringifier` | PostCSS Options      |

postcss.config.js

```js
module.exports = (ctx) => ({
  map: ctx.options.map,
  parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    cssnano: ctx.env === 'production' ? {} : false,
  },
})
```

> ⚠️如果你想通过CLI设置选项，必须在postcss.config.js中引用ctx.options

```cmd
postcss input.sss -p sugarss -o output.css -m
```

postcss.config.js

```js
module.exports = (ctx) => ({
  map: ctx.options.map,
  parser: ctx.options.parser,
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    cssnano: ctx.env === 'production' ? {} : false,
  },
})
```

