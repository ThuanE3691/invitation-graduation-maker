import { Request, Response } from "express";
import prisma from "./../db/prismaClient";

export const getAllUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = await prisma.user.findMany({
			include: {
				guests: true,
			},
		});

		await res.json(user);
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: "Internal Server",
			error: error,
		});
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email } = req.params;
		await prisma.user.create({
			data: {
				name,
				email,
			},
		});

		return res.status(200).json({
			success: true,
		});
	} catch (error) {}
};
