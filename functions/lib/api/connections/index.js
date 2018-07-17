"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const add_connection_1 = require("./add-connection");
const projects_1 = require("./projects");
const tasks_1 = require("./tasks");
exports.connectionsRouter = express.Router({ mergeParams: true });
exports.connectionsRouter.post('/', add_connection_1.addConnection);
exports.connectionsRouter.use('/:connectionId/projects', projects_1.projectsRouter);
exports.connectionsRouter.use('/:connectionId/tasks', tasks_1.tasksRouter);
//# sourceMappingURL=index.js.map