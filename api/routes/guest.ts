import { Router } from "express";
import {
	createGuestOfUser,
	getGuestById,
	updateGuest,
	updateImage,
	updateImageInfo,
} from "../controller";
import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory for easy access
const upload = multer({ storage: storage });

const guestRouter = Router();

guestRouter.get("/:id", getGuestById);
guestRouter.post("/", createGuestOfUser);
guestRouter.put("/update", updateGuest);

guestRouter.put("/image", upload.single("file"), updateImage);
guestRouter.put("/imageInfo", updateImageInfo);

export default guestRouter;
