"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_1.getAllUser);
userRouter.post("/", user_1.createUser);
exports.default = userRouter;
