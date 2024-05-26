import { Request, Response } from "express";
import prisma from "./../db/prismaClient";

export const getGuestById = async (request: Request, res: Response) => {
	const guest = await prisma.guest.findFirst({
		where: { id: request.params.id },
	});

	res.json({
		success: true,
		data: guest,
	});
};

export const createGuestOfUser = async (request: Request, res: Response) => {
	await prisma.user.update({
		where: {
			id: request.params.id,
		},
		data: {
			guests: {
				create: {
					name: request.params.name,
				},
			},
		},
	});
};
