import fs from "fs";
import path from "path";
import prisma from "./../db/prismaClient";
import { Request, Response } from "express";
import { ImageOrder, Image, Prisma } from "@prisma/client";
import { error } from "console";

export const getGuestById = async (request: Request, res: Response) => {
	try {
		const guest = await prisma.guest.findFirst({
			where: { id: request.params.id },
			include: {
				images: true,
			},
		});

		res.json({
			success: true,
			data: guest,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: "Internal Server",
			error: error,
		});
	}
};

export const createGuestOfUser = async (request: Request, res: Response) => {
	try {
		const { inviterId, guestName } = request.body;

		const inviter = await prisma.user.findFirst({
			where: {
				id: inviterId,
			},
			select: {
				name: true,
			},
		});

		const imagePath = path.join(__dirname, "../assets/sample.jpg");
		fs.readFile(imagePath, async (err, data) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ error: "Failed to create temp file" });
			}

			if (!data) {
				return res.status(500).json({ error: "No data found" });
			}

			// Convert image to base64

			const base64Image = data.toString("base64");
			const buffer = Buffer.from(base64Image, "base64");

			const baseImage = {
				filename: "sample.jpg",
				mimetype: "image/jpg",
				data: buffer,
				x: 0,
				y: 0,
			} as Image;

			await prisma.user.update({
				where: {
					id: inviterId,
				},
				data: {
					guests: {
						create: {
							name: guestName,
							pageUrl: `${inviter.name}/${guestName}`,
							images: {
								create: [
									{
										...baseImage,
										order: ImageOrder.First,
										width: 163,
										height: 217,
										rotate: 0,
									},
									{
										...baseImage,
										order: ImageOrder.Second,
										width: 116,
										height: 122,
										rotate: 14,
									},
									{
										...baseImage,
										order: ImageOrder.Third,
										width: 131,
										height: 100,
										rotate: -11,
									},
								],
							},
						},
					},
				},
			});
		});

		return res.json({ success: true });
	} catch (error) {
		console.log(error);
		return res.status(404).json({ error: error });
	}
};

export const updateImage = async (req: Request, res: Response) => {
	try {
		const { imageId } = req.body;
		const image = req["file"];
		await prisma.image.update({
			where: {
				id: imageId,
			},
			data: {
				data: image.buffer,
				mimetype: image.mimetype,
				filename: image.filename,
			},
		});
		return res.json({ success: true });
	} catch {
		console.log(error);
		return res.status(404).json({ success: false });
	}
};

export const updateGuest = async (request: Request, res: Response) => {
	try {
		const { nameGuest, guestId } = request.body;

		await prisma.guest.update({
			where: {
				id: guestId,
			},
			data: {
				name: nameGuest,
			},
		});

		return res.json({ success: true });
	} catch (e) {
		console.log(e);
		return res.status(404).json({ success: false, error: e });
	}
};

export const updateImageInfo = async (req: Request, res: Response) => {
	try {
		const { imageId, ...updated } = req.body;
		await prisma.image.update({
			where: {
				id: imageId,
			},
			data: {
				...updated,
			},
		});
		return res.json({ success: true });
	} catch (error) {
		console.log(error);
		return res.status(404).json({ success: false });
	}
};
