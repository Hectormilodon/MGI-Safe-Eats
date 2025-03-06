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
const suggestionAlertService_1 = __importDefault(require("../services/suggestionAlertService"));
const get_suggestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield suggestionAlertService_1.default.get_suggestions(req, res, next);
});
const get_suggestion_by_alertId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield suggestionAlertService_1.default.get_suggestion_by_alertId(req, res, next);
});
const post_suggestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield suggestionAlertService_1.default.post_suggestion(req, res, next);
});
exports.default = {
    get_suggestions,
    post_suggestion,
    get_suggestion_by_alertId,
};
//# sourceMappingURL=suggestionController.js.map