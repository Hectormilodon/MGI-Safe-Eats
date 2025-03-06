"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../src/controllers");
const auth_1 = require("../middleware/auth");
const rolRoute = express_1.default.Router();
rolRoute
    .route("/rol")
    .get(auth_1.isAuthorized, controllers_1.rolControllers.get_rol)
    .post(auth_1.isAuthorized, controllers_1.rolControllers.post_rol);
rolRoute
    .route("/rol/:id")
    .put(auth_1.isAuthorized, controllers_1.rolControllers.put_rol_by_id);
exports.default = rolRoute;
//# sourceMappingURL=roleRoute.js.map