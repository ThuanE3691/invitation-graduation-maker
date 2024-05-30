import { Request, Response } from "express";
import prisma from "./../db/prismaClient";

export const getAllUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = await prisma.user.findMany({
			include: {
				guests: {
					select: {
						name: true,
						id: true,
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

export const getUserByName = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				name: req.params.name,
			},
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

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: parseInt(req.params.id),
			},
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
