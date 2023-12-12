https://www.npmjs.com/package/pouchdb

https://github.com/pouchdb/pouchdb

https://github.com/pouchdb/pouchdb#readme

https://pouchdb.com/

[TOC]

# PouchDB

PouchDB 是一个受 Apache CouchDB 启发的开源 JavaScript 数据库，旨在在浏览器中良好运行。

PouchDB 的创建是为了帮助 Web 开发人员构建可以像在线一样离线运行的应用程序。

它使应用程序能够在离线状态下在本地存储数据，然后在应用程序重新上线时将其与 CouchDB 和兼容服务器同步，从而无论用户下次在何处登录，都可以保持用户的数据同步。

```js
var db = new PouchDB('dbname');

db.put({
  _id: 'dave@gmail.com',
  name: 'David',
  age: 69
});

db.changes().on('change', function() {
  console.log('Ch-Ch-Changes');
});

db.replicate.to('http://example.com/mydb');
```



## Intro

#### 什么是pouchdb？

PouchDB是Couchdb的JavaScript实现。它的目标是在浏览器或node.js中跑步时，以接近完美的保真度模仿CouchDB API。

#### 什么是couchdb？

CouchDB是Damien Katz于2005年创建的NOSQL数据库，现在由Apache Software Foundation维护。如果您是JavaScript开发人员，则可能每天使用CouchDB，因为它是NPM供电的核心技术。

#### Couchbase, CouchDB, Couch-what?

如今，有两家主要的数据库公司可以将其血统追溯到Couchdb：Couchbase和Cloudant。与CouchDB相比，它们都是独立的产品。

但是，这三个数据库共享相同的CouchDB同步协议。这意味着PouchDB可以与其中任何一个同步，并且您始终可以将一个数据库交换为另一个数据库。你永远不会锁定。

从某种意义上说，这些数据库就像竞争性电话公司一样，CouchDB同步协议是基础电话基础架构。

#### CouchDB's one-two punch: HTTP and sync

有这么多SQL和NOSQL数据库 - MongoDB，PostgreSQL，MySQL等。

我们有两个很好的答案：HTTP和同步。

#### HTTP: the little protocol that could

使用数据库时，我们通常习惯于在数据库和客户端应用程序之间编写某种转换层。但是，这意味着我们只是一遍又一遍地将数据库查询转换为RESTFUL HTTP调用。对于我们编写的每个应用程序。

CouchDB通过敢于直接从客户端应用程序直接与数据库进行交谈，从而将其扔到窗口中。它通过使用HTTP作为其主要交流手段来做到这一点。没有特殊协议，没有特殊驱动程序：仅休息和HTTP。您可以通过浏览器，卷发或像Postman这样的REST客户端与CouchDB进行通信。

这样，CouchDB确实是“网络数据库”。

#### Sync: CouchDB's killer feature

CouchDB的另一个独特功能是，它是从自下而上设计的，以启用不同数据库之间的轻松同步。

例如，如果您担心客户端应用程序的延迟，您可以简单地在欧洲设置一个 CouchDB，在北美设置另一个，在亚洲设置另一个。在这些数据库之间启用连续双向复制后，您的客户可以简单地与距离较近的数据库进行通信。

PouchDB 将数据库放入浏览器中，从而更进一步。



## Setting up CouchDB

#### CouchDB: PouchDB's older sibling

学习 PouchDB 的主要好处之一是它与 CouchDB 完全相同。事实上，PouchDB 是一个无耻的抄袭者：所有的 API 方法都是一样的，只是做了一些小小的修改，使其更加 JavaScript 化。

例如，在 CouchDB 中，您可以使用以下方式获取所有文档：

```
/db/_all_docs?include_docs=true
```

在 PouchDB 中，这变成：

```js
db.allDocs({include_docs: true})
```

API 相同，语义也相同。

在以下示例中，我们将设置 CouchDB 并使用您已经熟悉的工具（浏览器）与其进行通信。
