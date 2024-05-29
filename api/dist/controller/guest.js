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
exports.createGuestOfUser = exports.getGuestById = void 0;
const prismaClient_1 = __importDefault(require("./../db/prismaClient"));
const getGuestById = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guest = yield prismaClient_1.default.guest.findFirst({
        where: { id: request.params.id },
    });
    res.json({
        success: true,
        data: guest,
    });
});
exports.getGuestById = getGuestById;
const createGuestOfUser = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inviterId, guestName } = request.query;
        const inviter = yield prismaClient_1.default.user.findFirst({
            where: {
                id: inviterId,
            },
            select: {
                name: true,
            },
        });
        yield prismaClient_1.default.user.update({
            where: {
                id: inviterId,
            },
            data: {
                guests: {
                    create: {
                        name: guestName,
                        pageUrl: `${inviter.name}/${guestName}`,
                    },
                },
            },
        });
        return res.json({ success: true });
    }
    catch (error) {
        return res.json({ error: error });
    }
});
exports.createGuestOfUser = createGuestOfUser;
