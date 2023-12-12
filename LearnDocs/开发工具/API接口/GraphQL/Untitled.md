https://graphql.org/

[TOC]



GraphQL 是一种 API 查询语言，也是使用现有数据完成这些查询的运行时。 GraphQL 为 API 中的数据提供了完整且易于理解的描述，使客户能够准确地询问他们需要的内容，仅此而已，使 API 能够随着时间的推移而更轻松地发展，并支持强大的开发者工具。

* Ask for what you need, get exactly that

向您的 API 发送 GraphQL 查询并获取您所需要的内容，不多也不少。 GraphQL 查询始终返回可预测的结果。使用 GraphQL 的应用快速且稳定，因为它们控制所获取的数据，而不是服务器。

* Get many resources in a single request

GraphQL 查询不仅可以访问一种资源的属性，还可以顺利地跟踪它们之间的引用。虽然典型的 REST API 需要从多个 URL 加载，但 GraphQL API 可以在单个请求中获取应用程序所需的所有数据。即使在移动网络连接速度较慢的情况下，使用 GraphQL 的应用也可以运行得很快。

* Describe what’s possible with a type system

GraphQL API 是根据类型和字段而不是端点来组织的。从单个端点访问数据的全部功能。 GraphQL 使用类型来确保应用程序只询问可能的情况并提供清晰且有用的错误。应用可以使用类型来避免编写手动解析代码。

* Evolve your API without versions

向 GraphQL API 添加新字段和类型，而不影响现有查询。老化字段可以弃用并在工具中隐藏。通过使用单一的演进版本，GraphQL API 使应用程序能够持续访问新功能，并鼓励使用更简洁、更易于维护的服务器代码。

* Bring your own data and code

GraphQL 在整个应用程序中创建统一的 API，而不受特定存储引擎的限制。编写 GraphQL API，利用现有数据和代码以及多种语言提供的 GraphQL 引擎。您为类型系统中的每个字段提供函数，GraphQL 以最佳并发性调用它们。



# Introduction to GraphQL

GraphQL 是 API 的查询语言，也是使用您为数据定义的类型系统执行查询的服务器端运行时。 GraphQL 不依赖于任何特定的数据库或存储引擎，而是由现有代码和数据支持。

GraphQL 服务是通过定义类型和这些类型上的字段，然后为每种类型上的每个字段提供函数来创建的。例如，告诉您登录用户是谁（我）以及该用户名的 GraphQL 服务可能如下所示：

```
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

以及每种类型的每个字段的功能：

```
function Query_me(request) {
  return request.auth.user
}

function User_name(user) {
  return user.getName()
}
```

GraphQL 服务运行后（通常在 Web 服务上的 URL），它可以接收 GraphQL 查询以进行验证和执行。该服务首先检查查询以确保它仅引用定义的类型和字段，然后运行提供的函数以生成结果。

例如，查询：

```
{
  me {
    name
  }
}
```

可以产生以下 JSON 结果：



# Queries and Mutations 查询和变更

在此页面上，您将详细了解如何查询 GraphQL 服务器。

## Fields

最简单的是，GraphQL 是询问对象上的特定字段。让我们首先看一个非常简单的查询以及运行它时得到的结果：

```
{
  hero {
    name
  }
}
```

```json
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

您可以立即看到查询与结果具有完全相同的形状。这对于 GraphQL 来说至关重要，因为你总是会得到你期望的结果，并且服务器确切地知道客户端请求的字段。

字段名称返回 String 类型，在本例中是星球大战主要英雄的名字“R2-D2”。

> 哦，还有一件事 - 上面的查询是交互式的。这意味着您可以根据需要更改它并查看新结果。尝试向查询中的英雄对象添加一个appearsIn字段，并查看新结果。

在前面的示例中，我们只是询问英雄的名字，它返回一个字符串，但字段也可以引用对象。在这种情况下，您可以对该对象进行字段的子选择。 GraphQL 查询可以遍历相关对象及其字段，让客户端在一个请求中获取大量相关数据，而不是像经典 REST 架构中那样进行多次往返。

```
{
  hero {
    name
    # Queries can have comments!
    friends {
      name
    }
  }
}
```

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

请注意，在此示例中，friends 字段返回一个项目数组。 GraphQL 查询对于单个项目或项目列表看起来都是相同的；然而，我们根据模式中指示的内容知道应该期待哪一个。



## Arguments

如果我们唯一能做的就是遍历对象及其字段，那么 GraphQL 已经是一种非常有用的数据获取语言。但是，当您添加将参数传递给字段的功能时，事情会变得更加有趣。