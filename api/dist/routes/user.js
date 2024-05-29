"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/", controller_1.getAllUser);
userRouter.get("/:name", controller_1.getUserByName);
userRouter.post("/", controller_1.createUser);
exports.default = userRouter;
