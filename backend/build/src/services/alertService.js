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
const alert_1 = __importDefault(require("../models/alert"));
const get_alert_by_local_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const localId = req.params.local_id;
    const object = yield alert_1.default.findAll({
        where: { local_id: localId }
    });
    if (!object)
        return res.status(404).json("object not found");
    return res.status(200).json(object);
    // const alerts = [
    // 	{
    // 		threshold_alert: "BAJO",
    // 		breach_alert: "NINGUNA",
    // 		suggestions: [
    // 			"Sugerencia 1",
    // 			"Sugerencia 2",
    // 			"Sugerencia 3",
    // 			"Sugerencia 4",
    // 		],
    // 	},
    // 	{
    // 		threshold_alert: "ALTA",
    // 		breach_alert: "MEJORAR",
    // 		suggestions: [
    // 			"Sugerencia 1",
    // 			"Sugerencia 2",
    // 			"Sugerencia 3",
    // 			"Sugerencia 4",
    // 		],
    // 	},
    // 	{
    // 		threshold_alert: "MEDIA",
    // 		breach_alert: "COMPRENDER",
    // 		suggestions: [
    // 			"Sugerencia 1",
    // 			"Sugerencia 2",
    // 			"Sugerencia 3",
    // 			"Sugerencia 4",
    // 		],
    // 	},
    // ];
});
exports.default = {
    get_alert_by_local_id,
};
//# sourceMappingURL=alertService.js.map