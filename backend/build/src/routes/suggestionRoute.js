"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const suggestionAlertRoute = express_1.default.Router();
suggestionAlertRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.SuggestionController.get_suggestions)
    .post(auth_1.isAuthorized, controllers_1.SuggestionController.post_suggestion);
suggestionAlertRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.SuggestionController.get_suggestion_by_alertId);
exports.default = suggestionAlertRoute;
//# sourceMappingURL=suggestionRoute.js.map