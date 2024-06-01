import fs from "fs";
import path from "path";
import prisma from "./../db/prismaClient";
import { Request, Response } from "express";
import { ImageOrder, Image, Prisma } from "@prisma/client";

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
									},
									{
										...baseImage,
										order: ImageOrder.Second,
									},
									{
										...baseImage,
										order: ImageOrder.Third,
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
		return res.json({ error: error });
	}
};

export const updateGuest = async (request: Request, res: Response) => {
	try {
		const images = request["files"];
		const { guestId, imageIds, ...needToUpdate } = request.body;
		const imagePromises = images.map((image, index) => {
			return prisma.image.update({
				where: {
					id: imageIds[index],
				},
				data: {
					filename: image.originalname,
					mimetype: image.mimetype,
					data: image.buffer,
				},
			});
		});

		await Promise.all(imagePromises);

		return res.json({ success: true, file: images });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			// The .code property can be accessed in a type-safe manner
			console.log(e);
		}
		console.log(e);
		return res.status(404).json({ success: false, error: e });
	}
};
