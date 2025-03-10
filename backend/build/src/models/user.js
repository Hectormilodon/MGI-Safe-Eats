"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "user";
const User = connection.define(modelName, {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    rol_id: { type: DataTypes.NUMBER, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    modelName: modelName,
    tableName: modelName,
    hooks: {
        afterValidate: (user) => {
            let currentPassword = user.password;
            if (!(0, bcrypt_1.isHash)(currentPassword))
                user.password = (0, bcrypt_1.generateHash)(currentPassword);
        },
    },
    updatedAt: false,
    createdAt: false,
    freezeTableName: true,
});
exports.default = User;
//# sourceMappingURL=user.js.map