"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const encryption_service_1 = require("./encryption.service");
const teamwork_service_1 = require("./teamwork.service");
const session_service_1 = require("./session.service");
exports.config = functions.config();
admin.initializeApp(exports.config.firebase);
exports.auth = admin.auth();
exports.firestore = admin.firestore();
exports.encryptionService = new encryption_service_1.EncryptionService();
exports.teamworkService = new teamwork_service_1.TeamworkService();
exports.sessionService = new session_service_1.SessionService(exports.firestore);
//# sourceMappingURL=index.js.map