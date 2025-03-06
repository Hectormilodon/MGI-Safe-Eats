"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "alerts";
const Alert = connection.define(modelName, {
    breach_alert: { type: DataTypes.STRING },
    threashold_alert: { type: DataTypes.STRING },
    report_id: { type: DataTypes.STRING, allowNull: false },
    local_id: { type: DataTypes.STRING, allowNull: false },
}, {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});
exports.default = Alert;
//# sourceMappingURL=alert.js.map