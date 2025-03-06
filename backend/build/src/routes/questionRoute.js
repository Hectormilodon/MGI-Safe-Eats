"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const questionRoute = express_1.default.Router();
questionRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.questionController.get_question)
    .post(auth_1.isAuthorized, controllers_1.questionController.post_question);
questionRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.questionController.get_question_by_id)
    .put(auth_1.isAuthorized, controllers_1.questionController.put_question_by_id)
    .delete(auth_1.isAuthorized, controllers_1.questionController.delete_question_by_id);
exports.default = questionRoute;
//# sourceMappingURL=questionRoute.js.map