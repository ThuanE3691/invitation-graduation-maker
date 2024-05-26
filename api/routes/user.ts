import { Router } from "express";
import { createUser, getAllUser } from "../controller/user";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.post("/", createUser);

export default userRouter;
