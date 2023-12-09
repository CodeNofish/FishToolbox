/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */

const jsdom = require('jsdom');

// create window
const dom = new jsdom.JSDOM(`
<!DOCTYPE html> 
<body> 
<h1 class="heading"> 
    Hello 
</h1> 
</body> 
`);

const jquery = require('jquery')(dom.window);
jquery("body").append("<p>Fish</p>");

const content = dom.window.document.querySelector("body");

console.log(content.textContent);