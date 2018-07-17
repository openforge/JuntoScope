"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const add_session_1 = require("./add-session");
exports.sessionsRouter = express.Router({ mergeParams: true });
exports.sessionsRouter.post('/', add_session_1.addSession);
//# sourceMappingURL=index.js.map