"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
function setEstimate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = res.locals.user.uid;
        const ownerId = req.params.ownerId;
        const connectionId = req.params.connectionId;
        const sessionId = req.params.sessionId;
        const taskId = req.params.taskId;
        const estimate = req.body.estimate;
        if (!uid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }
        if (!ownerId) {
            return res.status(400).json({ message: 'Owner ID is required.' });
        }
        // The user must be the moderator of this session
        if (ownerId !== uid) {
            return res.status(401).json({ message: 'Permission denied.' });
        }
        if (!connectionId) {
            return res.status(400).json({ message: 'Connection ID is required.' });
        }
        if (!sessionId) {
            return res.status(400).json({ message: 'Session ID is required.' });
        }
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required.' });
        }
        if (!estimate) {
            return res.status(400).json({ message: 'Estimate is required.' });
        }
        try {
            yield services_1.sessionService.setTaskEstimate(uid, ownerId, connectionId, sessionId, taskId, estimate);
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
        return res.sendStatus(204);
    });
}
exports.setEstimate = setEstimate;
//# sourceMappingURL=set-estimate.js.map