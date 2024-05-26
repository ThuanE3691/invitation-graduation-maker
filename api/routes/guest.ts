import { Router } from "express";
import { createGuestOfUser, getGuestById } from "./../controller";

const guestRouter = Router();

guestRouter.get("/", getGuestById);
guestRouter.post("/", createGuestOfUser);

export default guestRouter;
