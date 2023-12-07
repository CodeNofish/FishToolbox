/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */

let {graphql, buildSchema} = require("graphql");

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
    type Query {
        hello: String
    }
`)

// The rootValue provides a resolver function for each API endpoint
// rootValue 为每个 API 端点提供解析程序函数
let rootValue = {
    hello: () => {
        return "Hello world!"
    },
}

// Run the GraphQL query '{ hello }' and print out the response
graphql({
    schema,
    source: "{ hello }",
    rootValue
}).then(resp => {
    console.log(resp);
})