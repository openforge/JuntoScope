"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const get_projects_1 = require("./get-projects");
const sessions_1 = require("./sessions");
const tasklists_1 = require("./tasklists");
exports.projectsRouter = express.Router({ mergeParams: true });
exports.projectsRouter.get('/', get_projects_1.getProjects);
exports.projectsRouter.use('/:projectId/tasklists', tasklists_1.tasklistsRouter);
exports.projectsRouter.use('/:projectId/sessions', sessions_1.sessionsRouter);
//# sourceMappingURL=index.js.map