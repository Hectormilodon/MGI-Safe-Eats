"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const predictiveModelRoute = express_1.default.Router();
predictiveModelRoute.route("/alert").post(controllers_1.predictiveModelController.post_alert);
predictiveModelRoute.route("/get_report").post(controllers_1.predictiveModelController.get_report);
exports.default = predictiveModelRoute;
//# sourceMappingURL=predictiveModelRoute.js.map