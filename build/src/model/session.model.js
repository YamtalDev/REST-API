"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionData = {
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
};
const SessionSchema = new mongoose_1.default.Schema(sessionData, { timestamps: true });
const SessionModel = mongoose_1.default.model("Session", SessionSchema);
exports.default = (SessionModel);
