require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/user");

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@invitation-graduation.w9sfxyx.mongodb.net/?retryWrites=true&w=majority&appName=Invitation-graduation`,
			{}
		);
		console.log("mongodb connected successfully");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
