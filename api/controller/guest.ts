import { Request, Response } from "express";
import prisma from "./../db/prismaClient";

export const getGuestById = async (request: Request, res: Response) => {
	try{
		const guest = await prisma.guest.findFirst({
			where: { id: request.params.id },
		});

		res.json({
			success: true,
			data: guest,
		});
	}catch(error){
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
