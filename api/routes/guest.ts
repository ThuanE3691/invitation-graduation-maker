import { Router } from "express";
import {
	createGuestOfUser,
	getGuestById,
	getImageById,
	updateGuest,
	updateImage,
	updateImageInfo,
} from "../controller";
import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory for easy access
const upload = multer({ storage: storage });

const guestRouter = Router();

guestRouter.get("/guest/:id", getGuestById);
guestRouter.post("/create", createGuestOfUser);
guestRouter.put("/update", updateGuest);
guestRouter.get("/image/:id", getImageById);

guestRouter.put("/image", upload.single("file"), updateImage);
guestRouter.put("/imageInfo", updateImageInfo);

export default guestRouter;
