"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class EncryptionService {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        // private SECRET_KEY = config.encryption.secret; // Must be 32 characters long
        this.SECRET_KEY = 'J*+48Iz{J%m9xr08]Z1DLNTj5f66pE7G'; // GET THIS AWAY FROM HERE!!!
    }
    encrypt(text) {
        const iv = crypto.randomBytes(16); // Must be 16 bytes long for AES encryption
        const cipher = crypto.createCipheriv(this.algorithm, new Buffer(this.SECRET_KEY), iv);
        let encrypted = cipher.update(text, 'utf8');
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    decrypt(text) {
        const parts = text.split(':');
        const iv = new Buffer(parts.shift(), 'hex');
        const encryptedText = new Buffer(parts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, new Buffer(this.SECRET_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
exports.EncryptionService = EncryptionService;
//# sourceMappingURL=encryption.service.js.map