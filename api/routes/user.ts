import { Router } from "express";
import { createUser, getAllUser, getUserByName } from "../controller";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.get("/:name", getUserByName);
userRouter.post("/", createUser);

export default userRouter;
