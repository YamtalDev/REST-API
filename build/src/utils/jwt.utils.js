"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwt(object, keyName, options) {
    const signingKey = Buffer.from(config_1.default.get(keyName), "base64").toString("ascii");
    return jsonwebtoken_1.default.sign(object, signingKey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256" }));
}
exports.signJwt = signJwt;
function verifyJwt(token, keyName) {
    const publicKey = Buffer.from(config_1.default.get(keyName), "base64").toString("ascii");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return { valid: true, expired: false, decoded };
    }
    catch (error) {
        logger_1.default.error("Error decoding key", error);
        return { valid: false, expired: error.message === "jwt expired", decoded: null };
    }
}
exports.verifyJwt = verifyJwt;
