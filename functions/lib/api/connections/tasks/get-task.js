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
const services_1 = require("./../../../services");
function getTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = res.locals.user.uid;
        const connectionId = req.params.connectionId;
        const taskId = req.params.taskId;
        let connectionRef;
        try {
            connectionRef = yield services_1.firestore.collection(`/users/${uid}/connections`).doc(connectionId).get();
        }
        catch (error) {
            return res.status(400).json({ message: 'Error getting connection' });
        }
        const connection = connectionRef.data();
        switch (connection.type.toLowerCase()) {
            case 'teamwork': {
                let teamworkResponse;
                try {
                    teamworkResponse = yield services_1.teamworkService.getTask(services_1.encryptionService.decrypt(connection.token), connection.externalData.baseUrl, taskId);
                }
                catch (error) {
                    return res.status(400).json({ message: error.message });
                }
                return res.json(teamworkResponse);
            }
            default: {
                return res.status(400).json({ message: 'Unknown Connection Type' });
            }
        }
    });
}
exports.getTask = getTask;
//# sourceMappingURL=get-task.js.map