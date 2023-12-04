/*
 * Copyright (C) 2023-2024 猫咪红茶工作室 All rights reserved
 * created by CodeNofish ( 1980114953@qq.com )
 */

const assert = require('node:assert').strict


assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);