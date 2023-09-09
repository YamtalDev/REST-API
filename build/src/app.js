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
const config_1 = __importDefault(require("config"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const connect_1 = __importDefault(require("./utils/connect"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(deserializeUser_1.default);
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, host, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Server running at http://${host}:${port}`);
    yield (0, connect_1.default)();
    (0, routes_1.default)(app);
}));
