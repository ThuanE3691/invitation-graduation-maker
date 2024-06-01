import { Request, Response } from "express";
import prisma from "./../db/prismaClient";

export const getAllUser = async (_: Request, res: Response) => {
	try {
		const user = await prisma.user.findMany();

		return res.json(user);
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server",
			error: error,
		});
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: req.params.id,
			},
			include: {
				guests: {
					select: {
						id: true,
						name: true,
					},
				},
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
		const { name } = req.query;
		await prisma.user.create({
			data: {
				name,
			},
		});

		return res.status(200).json({
			success: true,
		});
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server",
			error: error,
		});
	}
};
