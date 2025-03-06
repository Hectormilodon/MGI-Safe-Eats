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
exports.verificarToken = exports.isAuthorized_reset_password = exports.default = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = require("../../models/user");
const passport_custom_1 = __importDefault(require("passport-custom"));
const jsonWebToken_1 = __importDefault(require("../../utils/jsonWebToken"));
const authUrl_1 = require("../authUrl");
const StrategyJWT = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};
const options_reset_password = {
    jwtFromRequest: ExtractJWT.fromHeader(process.env.HEADER_RESET_TOKEN),
    secretOrKey: process.env.RECOVERY_PASSWORD_KEY,
};
passport_1.default.use("jwt", new StrategyJWT(options, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof jwt_payload === "object") {
        const payload = jwt_payload;
        try {
            const { id, email } = payload;
            const user = yield user_1.User.findByPk(id, {
                attributes: { exclude: ["password"] },
            });
            if (!user)
                return done(undefined, false, { message: "User Not Found" });
            if (user.email !== email)
                return done(undefined, false, { message: "Invalid User" });
            return done(undefined, user);
        }
        catch (err) {
            return done(err, false, { message: err });
        }
        // }
        // return done(undefined, false, { message: "Invalid Object Payload" });
    }
    else {
        return done(undefined, false, { message: "Invalid Type Payload" });
    }
})));
passport_1.default.use("reset_password", new StrategyJWT(options_reset_password, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof jwt_payload !== "object")
        return done(undefined, false, { message: "Invalid Type Payload" });
    const payload = jwt_payload;
    if (!payload.hasOwnProperty("id"))
        return done(undefined, false, { message: "no Id Parameter" });
    const { id } = payload;
    try {
        const user = yield user_1.User.findByPk(id);
        if (!user)
            return done(undefined, false, { message: "User Not Found" });
        return done(undefined, user);
    }
    catch (err) {
        done(err, false, { message: err });
    }
})));
const StrategyCustom = passport_custom_1.default.Strategy;
passport_1.default.use("verificarToken", new StrategyCustom((jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const resetToken = ((_a = jwt_payload.body.token) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    // const resetToken = jwt_payload.headers["reset_token"]?.toString() || "";
    const verify = jsonWebToken_1.default.verify_token(resetToken);
    // const payload = jwt_payload as Object;
    const payload = verify;
    if (!payload.hasOwnProperty("id"))
        return done({ message: "no Id Parameter" }, null);
    const { id } = payload;
    try {
        const user = yield user_1.User.findByPk(id);
        if (!user)
            return done({ message: "User Not Found" }, null);
        return done(null, user);
    }
    catch (err) {
        done({ message: err }, null);
    }
})));
passport_1.default.use("authorizatedService", new StrategyCustom((req, done) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("req.headers=>", req.headers);
    const authorization = req.headers.authorization;
    if (!authorization)
        return done({ message: "Haven't Authorization", status: 401 });
    const isBearer = authorization.startsWith("Bearer ");
    if (!isBearer)
        return done({ message: "Token Incorrect" });
    const isAuthorizated = passport_1.default.authenticate("verificarToken", {
        session: true,
    });
    const user = isAuthorizated.user;
    const validate = yield (0, authUrl_1.validateUrl)(req, user);
    if (validate) {
        if (!isAuthorizated.success)
            return done({ message: "Unauthorized", status: 401 });
        else
            return done(null, isAuthorizated.user);
    }
    else {
        return done({
            message: "User Unauthorized for service: " +
                req.url +
                " method: " +
                req.method,
        });
    }
})));
const isAuthorized = passport_1.default.authenticate("jwt", { session: true });
exports.default = isAuthorized;
const isAuthorized_reset_password = passport_1.default.authenticate("reset_password", {
    session: true,
});
exports.isAuthorized_reset_password = isAuthorized_reset_password;
const verificarToken = passport_1.default.authenticate("verificarToken", {
    session: true,
});
exports.verificarToken = verificarToken;
//# sourceMappingURL=jwt-config.js.map