import { Router } from "express";
import {
	createGuestOfUser,
	getGuestById,
	tryToReceiveImage,
	updateGuest,
} from "../controller";
import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory for easy access
const upload = multer({ storage: storage });

const guestRouter = Router();

guestRouter.get("/:id", getGuestById);
guestRouter.post("/", createGuestOfUser);
guestRouter.put("/:id", updateGuest);

guestRouter.post("/image", upload.single("file"), tryToReceiveImage);

export default guestRouter;
