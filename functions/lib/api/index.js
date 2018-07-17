"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const connections_1 = require("./connections");
const session_links_1 = require("./session-links");
exports.apiRouter = express.Router();
exports.apiRouter.use('/connections', connections_1.connectionsRouter);
exports.apiRouter.use('/session-links', session_links_1.sessionLinksRouter);
//# sourceMappingURL=index.js.map