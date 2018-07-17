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
const services_1 = require("./../../../../services");
function addSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = res.locals.user.uid;
        const { connectionId, projectId } = req.params;
        const { taskListIds } = req.body;
        if (!connectionId) {
            return res
                .status(400)
                .json({ message: 'Connection id is a required parameter.' });
        }
        if (!projectId) {
            return res
                .status(400)
                .json({ message: 'Project id is a required parameter.' });
        }
        if (!Array.isArray(taskListIds) || taskListIds.length === 0) {
            return res.status(400).json({ message: 'Task List Ids is required' });
        }
        const connection = yield services_1.firestore
            .doc(`/users/${uid}/connections/${connectionId}`)
            .get()
            .then(snapshot => snapshot.data());
        if (!connection) {
            return res.status(400).json({ message: 'Invalid connection id.' });
        }
        let sessionTasks;
        let newSession;
        try {
            switch (connection.type) {
                case 'teamwork': {
                    const token = services_1.encryptionService.decrypt(connection.token);
                    const baseUrl = connection.externalData.baseUrl;
                    sessionTasks = yield Promise.all(taskListIds.map(id => services_1.teamworkService.getTasks(token, baseUrl, id))).then(responses => {
                        return responses
                            .map(response => response.tasks)
                            .reduce((allTasks, taskListTasks) => {
                            for (const taskId in taskListTasks) {
                                if (taskListTasks.hasOwnProperty(taskId)) {
                                    allTasks[taskId] = taskListTasks[taskId];
                                }
                            }
                            return allTasks;
                        }, {});
                    });
                    break;
                }
                default: {
                    return res.status(400).json({ message: 'Unknown Connection Type' });
                }
            }
            newSession = yield services_1.sessionService.createSession(uid, connectionId, projectId, sessionTasks);
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
        return res.status(201).json(newSession);
    });
}
exports.addSession = addSession;
//# sourceMappingURL=add-session.js.map