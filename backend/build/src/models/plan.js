"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "plan";
const Plan = connection.define(modelName, {
    title: { type: DataTypes.STRING, allowNull: false },
});
exports.default = Plan;
//# sourceMappingURL=plan.js.map