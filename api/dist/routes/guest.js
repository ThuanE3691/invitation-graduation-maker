"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const guestRouter = (0, express_1.Router)();
guestRouter.get("/", controller_1.getGuestById);
guestRouter.post("/", controller_1.createGuestOfUser);
exports.default = guestRouter;
