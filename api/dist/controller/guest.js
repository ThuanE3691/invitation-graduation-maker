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
exports.updateGuest = exports.updateImage = exports.createGuestOfUser = exports.getGuestById = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prismaClient_1 = __importDefault(require("./../db/prismaClient"));
const client_1 = require("@prisma/client");
const console_1 = require("console");
const getGuestById = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guest = yield prismaClient_1.default.guest.findFirst({
            where: { id: request.params.id },
            include: {
                images: true,
            },
        });
        res.json({
            success: true,
            data: guest,
        });
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
exports.getGuestById = getGuestById;
const createGuestOfUser = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inviterId, guestName } = request.body;
        const inviter = yield prismaClient_1.default.user.findFirst({
            where: {
                id: inviterId,
            },
            select: {
                name: true,
            },
        });
        const imagePath = path_1.default.join(__dirname, "../assets/sample.jpg");
        fs_1.default.readFile(imagePath, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Failed to create temp file" });
            }
            if (!data) {
                return res.status(500).json({ error: "No data found" });
            }
            // Convert image to base64
            const base64Image = data.toString("base64");
            const buffer = Buffer.from(base64Image, "base64");
            const baseImage = {
                filename: "sample.jpg",
                mimetype: "image/jpg",
                data: buffer,
            };
            yield prismaClient_1.default.user.update({
                where: {
                    id: inviterId,
                },
                data: {
                    guests: {
                        create: {
                            name: guestName,
                            pageUrl: `${inviter.name}/${guestName}`,
                            images: {
                                create: [
                                    Object.assign(Object.assign({}, baseImage), { order: client_1.ImageOrder.First }),
                                    Object.assign(Object.assign({}, baseImage), { order: client_1.ImageOrder.Second }),
                                    Object.assign(Object.assign({}, baseImage), { order: client_1.ImageOrder.Third }),
                                ],
                            },
                        },
                    },
                },
            });
        }));
        return res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        return res.json({ error: error });
    }
});
exports.createGuestOfUser = createGuestOfUser;
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageId } = req.body;
        const image = req["file"];
        yield prismaClient_1.default.image.update({
            where: {
                id: imageId,
            },
            data: {
                data: image.buffer,
                mimetype: image.mimetype,
                filename: image.filename,
            },
        });
        return res.json({ success: true });
    }
    catch (_a) {
        console.log(console_1.error);
        return res.status(404).json({ success: false });
    }
});
exports.updateImage = updateImage;
const updateGuest = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nameGuest, guestId } = request.body;
        yield prismaClient_1.default.guest.update({
            where: {
                id: guestId,
            },
            data: {
                name: nameGuest,
            },
        });
        return res.json({ success: true });
    }
    catch (e) {
        console.log(e);
        return res.status(404).json({ success: false, error: e });
    }
});
exports.updateGuest = updateGuest;
