https://www.runoob.com/ruby/ruby-tutorial.html

[TOC]

# Ruby 菜鸟教程



## Ruby 简介

Ruby是一种纯粹的面向对象编程语言。它由日本的松本行弘（まつもとゆきひろ/Yukihiro Matsumoto）创建于1993年。

您可以在 www.ruby-lang.org 的 Ruby 邮件列表上找到松本行弘（まつもとゆきひろ/Yukihiro Matsumoto）的名字。在 Ruby 社区，松本也被称为马茨（Matz）。

**Ruby 是"程序员的最佳朋友"。**

Ruby 的特性与 Smalltalk、Perl 和 Python 类似。Perl、Python 和 Smalltalk 是脚本语言。Smalltalk 是一个真正的面向对象语言。Ruby，与 Smalltalk 一样，是一个完美的面向对象语言。使用 Ruby 的语法比使用 Smalltalk 的语法要容易得多。

#### Ruby 的特性

- Ruby 是开源的，在 Web 上免费提供，但需要一个许可证。
- Ruby 是一种通用的、解释的编程语言。
- Ruby 是一种真正的面向对象编程语言。
- Ruby 是一种类似于 Python 和 Perl 的服务器端脚本语言。
- Ruby 可以用来编写通用网关接口（CGI）脚本。
- Ruby 可以被嵌入到超文本标记语言（HTML）。
- Ruby 语法简单，这使得新的开发人员能够快速轻松地学习 Ruby。
- Ruby 与 C++ 和 Perl 等许多编程语言有着类似的语法。
- Ruby 可扩展性强，用 Ruby 编写的大程序易于维护。
- Ruby 可用于开发的 Internet 和 Intranet 应用程序。
- Ruby 可以安装在 Windows 和 POSIX 环境中。
- Ruby 支持许多 GUI 工具，比如 Tcl/Tk、GTK 和 OpenGL。
- Ruby 可以很容易地连接到 DB2、MySQL、Oracle 和 Sybase。
- Ruby 有丰富的内置函数，可以直接在 Ruby 脚本中使用。



## Ruby 安装 - Windows

https://rubyinstaller.cn/



## Ruby 中文编码

显示了 Ruby 使用用 ASCII 编码来读源码，中文会出现乱码，解决方法为只要在文件开头加入 **# -\*- coding: UTF-8 -\*-**（EMAC写法） 或者 **#coding=utf-8** 就行了。

```ruby
#!/usr/bin/ruby -w
# -*- coding: UTF-8 -*-
 
puts "你好，世界！";
```



## Ruby 命令行选项

Ruby 一般是从命令行运行，方式如下：

```cmd
$ ruby [ options ] [.] [ programfile ] [ arguments ... ]
```

| 选项            | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| **-a**          | 与 -n 或 -p 一起使用时，可以打开自动拆分模式(auto split mode)。请查看 -n 和 -p 选项。 |
| **-c**          | 只检查语法，不执行程序。                                     |
| **-C dir**      | 在执行前改变目录（等价于 -X）。                              |
| **-d**          | 启用调试模式（等价于 -debug）。                              |
| **-F pat**      | 指定 pat 作为默认的分离模式（$;）。                          |
| **-e prog**     | 指定 prog 作为程序在命令行中执行。可以指定多个 -e 选项，用来执行多个程序。 |
| **-h**          | 显示命令行选项的一个概览。                                   |
| **-i [ ext]**   | 把文件内容重写为程序输出。原始文件会被加上扩展名 ext 保存下来。如果未指定 ext，原始文件会被删除。 |
| **-I dir**      | 添加 dir 作为加载库的目录。                                  |
| **-K [ kcode]** | 指定多字节字符集编码。e 或 E 对应 EUC（extended Unix code），s 或 S 对应 SJIS（Shift-JIS），u 或 U 对应 UTF-8，a、A、n 或 N 对应 ASCII。 |
| **-l**          | 启用自动行尾处理。从输入行取消一个换行符，并向输出行追加一个换行符。 |
| **-n**          | 把代码放置在一个输入循环中（就像在 while gets; ... end 中一样）。 |
| **-0[ octal]**  | 设置默认的记录分隔符（$/）为八进制。如果未指定 octal 则默认为 \0。 |
| **-p**          | 把代码放置在一个输入循环中。在每次迭代后输出变量 $_ 的值。   |
| **-r lib**      | 使用 *require* 来加载 *lib* 作为执行前的库。                 |
| **-s**          | 解读程序名称和文件名参数之间的匹配模式 -xxx 的任何参数作为开关，并定义相应的变量。 |
| **-T [level]**  | 设置安全级别，执行不纯度测试（如果未指定 level，则默认值为 1）。 |
| **-v**          | 显示版本，并启用冗余模式。                                   |
| **-w**          | 启用冗余模式。如果未指定程序文件，则从 STDIN 读取。          |
| **-x [dir]**    | 删除 #!ruby 行之前的文本。如果指定了 *dir*，则把目录改变为 *dir*。 |
| **-X dir**      | 在执行前改变目录（等价于 -C）。                              |
| **-y**          | 启用解析器调试模式。                                         |
| **--copyright** | 显示版权声明。                                               |
| **--debug**     | 启用调试模式（等价于 -d）。                                  |
| **--help**      | 显示命令行选项的一个概览（等价于 -h）。                      |
| **--version**   | 显示版本。                                                   |
| **--verbose**   | 启用冗余模式（等价于 -v）。设置 $VERBOSE 为 true。           |
| **--yydebug**   | 启用解析器调试模式（等价于 -y）。                            |