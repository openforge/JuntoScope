"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const decode_session_link_1 = require("./decode-session-link");
const refresh_access_code_1 = require("./refresh-access-code");
const delete_session_1 = require("./delete-session");
exports.sessionLinksRouter = express.Router({ mergeParams: true });
exports.sessionLinksRouter.get('/:sessionLink', decode_session_link_1.decodeSessionLink);
exports.sessionLinksRouter.get('/:sessionLink/refresh', refresh_access_code_1.refreshAccessCode);
exports.sessionLinksRouter.delete('/:sessionLink', delete_session_1.deleteSession);
//# sourceMappingURL=index.js.map