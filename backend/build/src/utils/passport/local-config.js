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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = require("../../models/user");
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findByPk(id);
    done(false, user);
}));
//Sign in using Email and Password.
passport_1.default.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({
        where: { email: email },
    });
    console.log("🚀 ~ newLocalStrategy ~ user:", user);
    if (!user)
        return done(undefined, false, {
            message: `Email ${email} not found`,
        });
    //   const isMatch = await user.comparePassword(password);
    //   console.log(
    //     "🚀 ~ file: local-config.ts:43 ~ newLocalStrategy ~ isMatch:",
    //     isMatch
    //   );
    //   if (!isMatch)
    //     return done(undefined, false, {
    //       message: "Invalid Email or password",
    //     });
    return done(undefined, user);
})));
const login = (cb, req, res, next) => {
    return new Promise((resolve, reject) => {
        passport_1.default.authenticate("local", { session: true }, cb)(req, res, next);
    });
};
exports.default = login;
//# sourceMappingURL=local-config.js.map