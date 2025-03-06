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
const rol_1 = __importDefault(require("../models/rol"));
const get_rol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
    // attributes: { exclude: ["password"] },
    };
    const result = yield rol_1.default.findAll(filter);
    if (!result)
        return res.status(500).json();
    else
        return res.status(200).json(result);
});
const post_rol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const objectBuilded = rol_1.default.build(data);
    const resultValidate = yield objectBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    else {
        const objectCreated = yield objectBuilded
            .save()
            .catch((err) => ({ err }));
        if (objectCreated.err)
            res.status(409).json(objectCreated.err.errors);
        else
            res.status(201).json(objectCreated.toJSON());
    }
});
const get_rol_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    //   const filter:FindOptions = {where:{
    //   }}
    const object = yield rol_1.default.findByPk(id);
    if (!object)
        return res.status(404).json("object not found");
    return res.status(200).json(object.toJSON());
});
const put_rol_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield rol_1.default.findByPk(id);
    if (!objectDB)
        return res.status(404).json("object not found");
    else {
        const objectUpdated = yield objectDB
            .update(dataPut)
            .catch((err) => ({ err }));
        if (objectUpdated.err) {
            const { errors } = objectUpdated.err;
            return res.status(404).json(errors);
        }
        else
            return res.status(200).json(objectUpdated);
    }
});
exports.default = {
    get_rol,
    post_rol,
    get_rol_by_id,
    put_rol_by_id,
};
//# sourceMappingURL=roleService.js.map