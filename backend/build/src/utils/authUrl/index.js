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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrl = void 0;
const validateUrl = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    let status = true;
    const url = req.url, method = req.method, label = user.labels[0];
    //   if (label.id !== labelsEnum.AdmPlat && label.id !== labelsEnum.AdmBi) {
    //     if (url.toUpperCase().includes("ADMINUSERS")) status = false;
    //     if (
    //       method === httpEnum.POST ||
    //       method === httpEnum.DELETE ||
    //       method === httpEnum.PUT
    //     ) {
    //       if (
    //         url.toUpperCase().includes("TAG") ||
    //         url.toUpperCase().includes("MENU") ||
    //         url.toUpperCase().includes("SERVICELOG") ||
    //         url.toUpperCase().includes("MURO") ||
    //         url.toUpperCase().includes("NEWS") ||
    //         url.toUpperCase().includes("ALERT") ||
    //         url.toUpperCase().includes("CATEGORY") ||
    //         url.toUpperCase().includes("COMPANY")
    //       )
    //         status = false;
    //     }
    //   }
    return true;
});
exports.validateUrl = validateUrl;
//# sourceMappingURL=index.js.map