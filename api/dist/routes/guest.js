"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage(); // Store files in memory for easy access
const upload = (0, multer_1.default)({ storage: storage });
const guestRouter = (0, express_1.Router)();
guestRouter.get("/:id", controller_1.getGuestById);
guestRouter.post("/", controller_1.createGuestOfUser);
guestRouter.put("/update", controller_1.updateGuest);
guestRouter.put("/image", upload.single("file"), controller_1.updateImage);
guestRouter.put("/imageInfo", controller_1.updateImageInfo);
exports.default = guestRouter;
