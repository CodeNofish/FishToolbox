https://apifox.com/apiskills/graphql-tutorials



## 认识 GraphQL

前段时间，GraphQL 出现并掀起了一阵热潮。但是 GraphQL 跟 REST 是两种不同的东西（前面我们写过 **[GraphQL 和 REST 对比](https://apifox.com/apiskills/graphql-vs-rest/)），**所以也需要一定的学习成本，导致大部分人都没有选择去学习它，今天就带大家简单过一遍 GraphQL 吧，希望大家能有所收获。

#### GraphQL 好在哪？

- GraphQL 速度快并且稳定
- GraphQL 可以获取更多的资源
- GraphQL 是单端点查询
- GraphQL 的可持续性非常出色
- GraphQL 具有向下兼容的特性

#### GraphQL 使用场景

GraphQL 的按需查询非常实用，试想一下，你们在开发一个非常大型的网站的时候，一个首页就得请求很多个接口了，比如：

- 轮播图接口
- Tag 接口
- List 接口

在上面的例子里，一个首页就得请求三个以上的接口了，浏览器并发数太多的话，会大大影响用户的使用体验。

那如果使用 GraphQL 去查询呢，就只需要一个接口就完事了，也就是一个请求就可以查询很多个请求所需要的数据，那自然减少了并发数。



## GraphQL 教程

GraphQL 其实不难，无非就是传个不同的 query语句 到后端，接收不同的 JSON 罢了。

#### query 查询

比如我现在要设计一个学生管理平台，我想查询学生列表，我应该传什么参数呢？

```bash
query getStudents{
  students {
    id,name,age
  }
}
```

分析一下上面的语句：

- query：操作类型
- getStudents：操作函数名
- students：是后端定义好的接口
- id,name,age：指的是我们需要查询的字段

这样查询，返回的数据为：

```json
{
  "data": {
    "students": [
      {
        "id": "1",
        "name": "tom",
        "age": 15
      },
      {
        "id": "2",
        "name": "jane",
        "age": 16
      }
    ]
  }
}
```

观察上面的数据，使我们想要的数据，并且只返回我们需要查询的字段。

#### 传参查询

我们刚刚说了 getStudents 是 函数名，那既然是函数，肯定是可以传参的，比如，我们只需要查询 id 为 1 的学生，我们可以这么传：

**query**

```bash
query getStudent($id: ID!){
  student(id: $id) {
    id,name,age
  }
}
```

**variables**

```json
{
  "id": "1"
}
```

这样就能查到我们想要的数据了。

#### mutation 修改

前面讲的是 query 语句，我们试一下 mutation 语句，他可以对数据进行修改、新增。

比如我们想要新增一个学生，我们可以这么写：

```javascript
mutation addStudent($name: String!,$age: String!) {
  addStudent(name: $name,age: $age) {
    id,name,age
  }
}
```



## Apifox 调试 GraphQL 接口

我们写完 GraphQL 接口之后，我们需要使用 API 工具对 GraphQL 接口进行调试，今天我使用 Apifox 这款非常好用的工具，进行调试。





## GraphQL vs RESTful API：如何选择？

https://apifox.com/apiskills/graphql-vs-rest/

**[GraphQL](https://apifox.com/apiskills/graphql/)** 和 RESTful 都是一种前后端通信规范，用于数据查询的网站架构方案。GraphQL 是 Facebook 于 2012 年在内部开发的数据查询语言，在 2015 年开源，旨在提供 RESTful 架构体系的替代方案。二者都是基于 HTTP 进行数据的请求与接收，而 GraphQL 相比于 RESTful，它可以再客户端请求中指定查询的数据，而 RESTful 需要先在服务端进行 API 的定义。所以二者有很多相同的地方，也有一些不一样的地方，下面从资源、路由和请求处理三个方面进行 GraphQL 和 **[RESTful](https://apifox.com/apiskills/rest-api/)** 的对比。

#### 请求资源

对于一个 API 请求，核心的内容就是资源，也就是通过请求服务端返回的响应数据结果。RESTful 的核心思想就是每一个资源都可以通过一个 URL（包含请求路径和参数）来表示，举个例子，我们可以通过一个 GET 请求来获取到相应的数据：一个 GET 请求，运行之后获取的返回响应（示例工具：Apifox）

在上面的例子中我们可以看到，一个资源和如何请求获取数据是关联在一起的，上面的例子实际上就是一个“Query 端点”。我们需要预先定义好返回的数据模型，这样请求的时候才能获取服务端返回的数据。

而 GraphQL 就不太一样，在 GraphQL 里面，请求和数据模型的定义实际上是分离的，你可以在服务端定义多个数据模型，请求的时候也可以针对服务端不同的数据模型进行查询。比如还是上面的例子（示例工具：[APOLLO](https://www.apollographql.com/)），在服务端定义了 Query 的数据模型：