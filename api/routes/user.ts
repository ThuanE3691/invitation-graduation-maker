import { Router } from "express";
import { createUser, getAllUser, getUserById } from "../controller";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);

export default userRouter;
