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
function decodeSessionLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = res.locals.user.uid;
        const sessionLink = req.params.sessionLink;
        const accessCode = req.query.accessCode;
        if (!sessionLink) {
            return res.status(400).json({ message: 'Session Link is required.' });
        }
        if (!accessCode) {
            return res.status(400).json({ message: 'Access Code is required.' });
        }
        try {
            yield services_1.sessionService.validateSession(sessionLink, accessCode, uid);
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
        return res.send(204);
    });
}
exports.decodeSessionLink = decodeSessionLink;
//# sourceMappingURL=decode-session-link.js.map