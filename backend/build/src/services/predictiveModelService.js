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
const axios_1 = __importDefault(require("axios"));
const alert_1 = __importDefault(require("../models/alert"));
const suggestion_alert_1 = __importDefault(require("../models/suggestion_alert"));
const predictiveModelUrl = process.env.PREDICTIVE_MODEL_URL;
const get_report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${predictiveModelUrl}/get_report`, {
            "param_list": req.body.param_list
        });
        if (!response || response.status !== 200) {
            return res.status(400).json("error al conectar con modelo");
        }
        return res.status(200).json(response.data);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const post_alerts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alertData = {
            report_id: req.body.report_id,
            local_id: req.body.local_id,
            breach_alert: req.body.breach_alert,
            threashold_alert: req.body.threashold_alert,
        };
        console.log("🚀 ~ constpost_alerts= ~ alertData.req.body:", req.body);
        const alertBuilded = alert_1.default.build(alertData);
        const resultValidate = yield alertBuilded.validate().catch((err) => err);
        if (resultValidate.errors) {
            return res.status(409).json(resultValidate.errors);
        }
        const alertCreated = yield alertBuilded.save().catch((err) => ({ err }));
        if (alertCreated.err) {
            console.log("🚀 ~ constpost_alerts= ~ alertCreated:", alertCreated);
            return res.status(409).json(alertCreated.err.errors);
        }
        const newSuggestions = req.body.suggestions;
        const suggestionResults = [];
        const suggestionErrors = [];
        if (newSuggestions.length > 0) {
            for (const newSuggestion of newSuggestions) {
                const suggestionData = {
                    report_id: req.body.report_id,
                    suggestion: newSuggestion,
                    alert_id: alertCreated.dataValues.id
                };
                const suggestionBuilded = suggestion_alert_1.default.build(suggestionData);
                const suggestionValidate = yield suggestionBuilded.validate().catch((err) => err);
                if (suggestionValidate.errors) {
                    suggestionErrors.push(suggestionValidate.errors);
                    continue;
                }
                const suggestionCreated = yield suggestionBuilded.save().catch((err) => ({ err }));
                if (suggestionCreated.err) {
                    suggestionErrors.push(suggestionCreated.err.errors);
                }
                else {
                    suggestionResults.push(suggestionCreated);
                }
            }
        }
        if (suggestionErrors.length > 0) {
            console.log("🚀 ~ constpost_alerts= ~ suggestionErrors:", suggestionErrors);
            return res.status(409).json({ alert: alertCreated, suggestionErrors });
        }
        return res.status(200).json({ alert: alertCreated, suggestionResults });
    }
    catch (error) {
        return next(error);
    }
});
exports.default = {
    get_report,
    post_alerts,
};
//# sourceMappingURL=predictiveModelService.js.map