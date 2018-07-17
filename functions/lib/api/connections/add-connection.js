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
const services_1 = require("./../../services");
function addConnection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type, token } = req.body;
        const uid = res.locals.user.uid;
        if (!type) {
            return res.status(400).json({ message: 'Connection Type is required.' });
        }
        if (!token) {
            return res.status(400).json({ message: 'Connection Token is required.' });
        }
        switch (type.toLowerCase()) {
            case 'teamwork': {
                let teamworkResponse;
                try {
                    teamworkResponse = yield services_1.teamworkService.validateToken(token);
                }
                catch (error) {
                    return res.status(400).json({ message: error.message });
                }
                const snapshot = yield services_1.firestore
                    .collection(`/users/${uid}/connections`)
                    .where('type', '==', type.toLowerCase())
                    .where('externalData.id', '==', teamworkResponse.id)
                    .get();
                if (snapshot.size > 0) {
                    return res.status(422).json({ message: 'Connection already exists!' });
                }
                yield services_1.firestore.collection(`/users/${uid}/connections`).add({
                    type: 'teamwork',
                    token: services_1.encryptionService.encrypt(token),
                    externalData: teamworkResponse,
                });
                return res.status(201).send({
                    type: 'teamwork',
                    externalData: teamworkResponse,
                });
            }
            default: {
                return res.status(400).json({ message: 'Unknown Connection Type' });
            }
        }
    });
}
exports.addConnection = addConnection;
//# sourceMappingURL=add-connection.js.map