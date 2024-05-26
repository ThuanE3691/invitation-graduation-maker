import { Router } from "express";
import { createUser, getAllUser } from "../controller";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.post("/", createUser);

export default userRouter;
