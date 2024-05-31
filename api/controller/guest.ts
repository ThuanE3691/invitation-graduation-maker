import { Request, Response } from "express";
import prisma from "./../db/prismaClient";
import { ImageOrder, Prisma } from "@prisma/client";

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

		await prisma.user.update({
			where: {
				id: inviterId,
			},
			data: {
				guests: {
					create: {
						name: guestName,
						pageUrl: `${inviter.name}/${guestName}`,
					},
				},
			},
		});

		return res.json({ success: true });
	} catch (error) {
		return res.json({ error: error });
	}
};

export const updateGuest = async (request: Request, res: Response) => {
	try {
		const { id, name } = request.body;

		await prisma.guest.update({
			where: {
				id: id,
			},
			data: {
				name: name,
			},
		});

		return res.json({ success: true });
	} catch (error) {
		return res.json({ error: error });
	}
};

export const tryToReceiveImage = async (request: Request, res: Response) => {
	try {
		const file = request["file"];
		const { guestId } = request.body;

		await prisma.guest.update({
			where: {
				id: guestId,
			},
			data: {
				images: {
					create: {
						filename: file.originalname,
						mimetype: file.mimetype,
						data: file.buffer,
						order: ImageOrder.First,
					},
				},
			},
		});

		return res.json({ success: true, file: file });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			// The .code property can be accessed in a type-safe manner
			console.log(e);
		}
		console.log(e);
		return res.status(404).json({ success: false, error: e });
	}
};
