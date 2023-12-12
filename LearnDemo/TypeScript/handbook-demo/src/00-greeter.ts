/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */


// TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。
class Student {
  fullName: string;

  constructor(public firstName: string, public middleInitial: string,
              public lastName: string) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

let user = new Student('Jane', 'M.', 'User');

// document.body.innerHTML = greeter(user);

