"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const use_schema_1 = require("./schema/use.schema");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const user_controller_1 = __importDefault(require("./controller/user.controller"));
const session_schema_1 = require("./schema/session.schema");
const session_controller_1 = require("./controller/session.controller");
function routes(app) {
    app.get('/healthcheck', (req, res) => res.sendStatus(200));
    app.post("/api/users", (0, validateResource_1.default)(use_schema_1.createUserSchema), user_controller_1.default);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get('/api/sessions', requireUser_1.default, session_controller_1.getUserSessionHandler);
    app.delete('/api/sessions', requireUser_1.default, session_controller_1.deleteSessionHandler);
}
exports.default = (routes);
