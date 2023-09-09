"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.validatePassword = exports.createUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../model/user.model"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.create(input);
            return ((0, lodash_1.omit)(user.toJSON(), "password"));
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createUser = createUser;
function validatePassword({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return (false);
        }
        const isValid = yield user.comparePassword(password);
        if (!isValid) {
            return (false);
        }
        return ((0, lodash_1.omit)(user.toJSON(), "password"));
    });
}
exports.validatePassword = validatePassword;
function findUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return (user_model_1.default.findOne(query).lean());
    });
}
exports.findUser = findUser;
