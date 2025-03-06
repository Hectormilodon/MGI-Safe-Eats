"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "role";
const Role = connection.define(modelName, {
    title: { type: DataTypes.STRING, allowNull: false },
});
exports.default = Role;
//# sourceMappingURL=role.js.map