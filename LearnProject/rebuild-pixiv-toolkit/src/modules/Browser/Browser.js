/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */

const Browser = {
  getBrowser() {
    // 包括浏览器中常用的 window 对象
    return window.chrome || chrome || browser;
  }
}

export default Browser;
