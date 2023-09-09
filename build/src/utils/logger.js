"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const dayjs_1 = __importDefault(require("dayjs"));
const logOptions = {
    prettyPrint: false,
    base: { pid: false },
    timestamp: () => `,"time":"${(0, dayjs_1.default)().format()}"`,
    messageKey: 'message',
};
const log = (0, pino_1.default)(logOptions);
exports.default = log;
