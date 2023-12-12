"use strict";
/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。
class Student {
    firstName;
    middleInitial;
    lastName;
    fullName;
    constructor(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}
function greeter(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
let user = new Student('Jane', 'M.', 'User');
// document.body.innerHTML = greeter(user);
