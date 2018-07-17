"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const get_task_1 = require("./get-task");
const put_estimate_1 = require("./put-estimate");
exports.tasksRouter = express.Router({ mergeParams: true });
exports.tasksRouter.get('/:taskId', get_task_1.getTask);
exports.tasksRouter.put('/:taskId', put_estimate_1.putEstimate);
//# sourceMappingURL=index.js.map