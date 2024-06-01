import { Router } from "express";
import { createGuestOfUser, getGuestById, updateGuest } from "../controller";
import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory for easy access
const upload = multer({ storage: storage });

const guestRouter = Router();

guestRouter.get("/:id", getGuestById);
guestRouter.post("/", createGuestOfUser);
// guestRouter.put("/:id", updateGuest);

guestRouter.put("/", upload.array("images", 3), updateGuest);

export default guestRouter;
