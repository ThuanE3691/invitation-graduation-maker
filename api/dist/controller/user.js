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
exports.createUser = exports.getAllUser = void 0;
const prismaClient_1 = __importDefault(require("./../db/prismaClient"));
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prismaClient_1.default.user.findMany({
            include: {
                guests: true,
            },
        });
        yield res.json(user);
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal Server",
            error: error,
        });
    }
});
exports.getAllUser = getAllUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.params;
        yield prismaClient_1.default.user.create({
            data: {
                name,
                email,
            },
        });
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) { }
});
exports.createUser = createUser;
