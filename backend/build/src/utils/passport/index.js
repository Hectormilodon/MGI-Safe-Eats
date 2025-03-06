"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.jwtResetPassword = exports.jwtAutorization = exports.isAuthorized = exports.localAutenticate = void 0;
var local_config_1 = require("./local-config");
Object.defineProperty(exports, "localAutenticate", { enumerable: true, get: function () { return __importDefault(local_config_1).default; } });
var jwt_config_1 = require("./jwt-config");
Object.defineProperty(exports, "isAuthorized", { enumerable: true, get: function () { return __importDefault(jwt_config_1).default; } });
var jwt_config_2 = require("./jwt-config");
Object.defineProperty(exports, "jwtAutorization", { enumerable: true, get: function () { return __importDefault(jwt_config_2).default; } });
Object.defineProperty(exports, "jwtResetPassword", { enumerable: true, get: function () { return jwt_config_2.isAuthorized_reset_password; } });
Object.defineProperty(exports, "verificarToken", { enumerable: true, get: function () { return jwt_config_2.verificarToken; } });
//# sourceMappingURL=index.js.map