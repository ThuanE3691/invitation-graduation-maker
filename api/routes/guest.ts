import { Router } from "express";
import { createGuestOfUser, getGuestById } from "../controller";

const guestRouter = Router();

guestRouter.get("/:id", getGuestById);
guestRouter.post("/", createGuestOfUser);

export default guestRouter;
