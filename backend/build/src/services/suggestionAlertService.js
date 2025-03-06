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
const suggestion_alert_1 = __importDefault(require("../models/suggestion_alert"));
const get_suggestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield suggestion_alert_1.default.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_suggestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const suggestionBuilded = suggestion_alert_1.default.build(data);
    const resultValidate = yield suggestionBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const suggestionCreated = yield suggestionBuilded
        .save()
        .catch((err) => ({ err }));
    if (suggestionCreated.err)
        res.status(409).json(suggestionCreated.err.errors);
    res.status(200).json(suggestionCreated);
});
const get_suggestion_by_alertId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const suggestions = yield suggestion_alert_1.default.findAll({
            where: {
                alert_id: id
            }
        });
        if (!suggestions)
            return res.status(404).json("suggestions not found");
        return res.status(200).json(suggestions);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.default = {
    get_suggestion_by_alertId,
    get_suggestions,
    post_suggestion,
};
//# sourceMappingURL=suggestionAlertService.js.map