"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const middleware_1 = require("./middleware");
const api_1 = require("./api");
const app = express();
app.disable('X-Powered-By');
app.use(cors({ origin: true }));
app.use(middleware_1.idTokenAuth);
app.use(api_1.apiRouter);
app.get('/*', (req, res) => {
    res.status(404).send();
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map