"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const get_tasklists_1 = require("./get-tasklists");
const get_tasks_1 = require("./get-tasks");
exports.tasklistsRouter = express.Router({ mergeParams: true });
exports.tasklistsRouter.get('/', get_tasklists_1.getTaskLists);
exports.tasklistsRouter.get('/:tasklistId', get_tasks_1.getTasks);
//# sourceMappingURL=index.js.map