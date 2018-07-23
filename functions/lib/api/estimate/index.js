"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const set_estimate_1 = require("./set-estimate");
exports.estimateRouter = express.Router({ mergeParams: true });
exports.estimateRouter.put('/:ownerId/connections/:connectionId/sessions/:sessionId/tasks/:taskId', set_estimate_1.setEstimate);
//# sourceMappingURL=index.js.map