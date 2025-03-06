"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import User from "../models/user";
// import Clasification from "../models/clasification";
const local_1 = __importDefault(require("../models/local"));
// import EmpAdmin from "../models/empadmin";
const inputvalue_1 = __importDefault(require("../models/inputvalue"));
// import Question from "../models/question";
const report_1 = __importDefault(require("../models/report"));
const models_1 = require("../models");
// import Rol from "../models/rol";
const userlocal_1 = require("../models/userlocal");
const assosiation = () => {
    report_1.default.hasMany(inputvalue_1.default, { foreignKey: "report_id" });
    inputvalue_1.default.belongsTo(report_1.default, { foreignKey: "report_id" });
    local_1.default.hasMany(report_1.default, { foreignKey: "local_id" });
    report_1.default.belongsTo(local_1.default, { foreignKey: "local_id" });
    models_1.User.hasMany(userlocal_1.Userlocal, { foreignKey: "id_user" });
    userlocal_1.Userlocal.belongsTo(models_1.User, { foreignKey: "id_user" });
    local_1.default.hasMany(userlocal_1.Userlocal, { foreignKey: "id_local" });
    userlocal_1.Userlocal.belongsTo(local_1.default, { foreignKey: "id_local" });
    models_1.User.hasMany(report_1.default, { foreignKey: "auditor_id", as: "Auditor" });
    report_1.default.belongsTo(models_1.User, { foreignKey: "auditor_id", as: "Auditor" });
    models_1.User.hasMany(report_1.default, { foreignKey: "supervisor_id", as: "Supervisor" });
    report_1.default.belongsTo(models_1.User, { foreignKey: "supervisor_id", as: "Supervisor" });
};
assosiation();
//# sourceMappingURL=assosiations.js.map