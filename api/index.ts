import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import guestRouter from "./routes/guest";
import prisma from "./db/prismaClient";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/guest", guestRouter);

const PORT = 3000;

const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	server.close(() => {
		console.log("Server closed");
		process.exit(0);
	});
});
