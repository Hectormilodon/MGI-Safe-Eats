"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "suggestions_alert";
const SuggestionAlert = connection.define(modelName, {
    report_id: { type: DataTypes.STRING, allowNull: false },
    suggestion: { type: DataTypes.STRING, allowNull: false },
    alert_id: { type: DataTypes.STRING }
}, {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});
exports.default = SuggestionAlert;
//# sourceMappingURL=suggestion_alert.js.map