"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Userlocal = exports.Rol = exports.Report = exports.Question = exports.Local = exports.InputValue = exports.EmpAdmin = exports.Clasification = exports.db = void 0;
var index_1 = require("../config/index");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return index_1.db; } });
var clasification_1 = require("./clasification");
Object.defineProperty(exports, "Clasification", { enumerable: true, get: function () { return __importDefault(clasification_1).default; } });
var empadmin_1 = require("./empadmin");
Object.defineProperty(exports, "EmpAdmin", { enumerable: true, get: function () { return __importDefault(empadmin_1).default; } });
var inputvalue_1 = require("./inputvalue");
Object.defineProperty(exports, "InputValue", { enumerable: true, get: function () { return __importDefault(inputvalue_1).default; } });
var local_1 = require("./local");
Object.defineProperty(exports, "Local", { enumerable: true, get: function () { return __importDefault(local_1).default; } });
var question_1 = require("./question");
Object.defineProperty(exports, "Question", { enumerable: true, get: function () { return __importDefault(question_1).default; } });
var report_1 = require("./report");
Object.defineProperty(exports, "Report", { enumerable: true, get: function () { return __importDefault(report_1).default; } });
var rol_1 = require("./rol");
Object.defineProperty(exports, "Rol", { enumerable: true, get: function () { return __importDefault(rol_1).default; } });
var userlocal_1 = require("./userlocal");
Object.defineProperty(exports, "Userlocal", { enumerable: true, get: function () { return userlocal_1.Userlocal; } });
var user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
require("../assosiations/assosiations");
//# sourceMappingURL=index.js.map