const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

/// @GET Skills

router.get("/", async (req, res) => {
	try {
		// const user = await User.find({ user: req.userId }).populate(
		// 	"user",
		// 	"username"
		// );
		res.json({
			success: true,
			// users: user,
			message: "Hello world",
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

/// @POST Create a new Skill

// router.post("/", verifyToken, async (req, res) => {
// 	const { title, description, url, status } = req.body;

// 	if (!title)
// 		return res.status(400).json({
// 			success: false,
// 			message: "You must have the title for this skill",
// 		});

// 	try {
// 		const new_skill = new Skill({
// 			title: title,
// 			description: description,
// 			url: url.startsWith("https://") ? url : `https://${url}`,
// 			status: status || "TO LEARN",
// 			user: req.userId,
// 		});

// 		await new_skill.save();
// 		res.json({
// 			success: true,
// 			message: "Skill saved successfully",
// 			skill: new_skill,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.json({
// 			success: false,
// 			message: "Internal Server",
// 			error: error.message,
// 		});
// 	}
// });

// /// @PUT Update Skill

// router.put("/:id", verifyToken, async (req, res) => {
// 	const { title, description, url, status } = req.body;
// 	if (!title)
// 		return res.status(400).json({
// 			success: false,
// 			message: "You must have the title for this skill",
// 		});

// 	try {
// 		let updatedSkill = {
// 			title: title,
// 			description: description || "",
// 			url: (url.startsWith("https://") ? url : `https://${url}`) || "",
// 			status: status || "TO LEARN",
// 		};

// 		const skillUpdateCondition = {
// 			_id: req.params.id,
// 			user: req.userId,
// 		};

// 		updatedSkill = await Skill.findOneAndUpdate(
// 			skillUpdateCondition,
// 			updatedSkill,
// 			{ new: true }
// 		);

// 		if (!updatedSkill) {
// 			return (
// 				res.status(401),
// 				json({
// 					success: false,
// 					message: "Skill not found or User not Authorization",
// 				})
// 			);
// 		}

// 		res.json({
// 			success: true,
// 			message: "Skill updated successfully",
// 			updatedSkill: updatedSkill,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.json({
// 			success: false,
// 			message: "Internal Server",
// 			error: error.message,
// 		});
// 	}
// });

// /// @DELETE skill

// router.delete("/:id", verifyToken, async (req, res) => {
// 	try {
// 		const skillDeleteCondition = {
// 			_id: req.params.id,
// 			user: req.userId,
// 		};

// 		const deleteSkill = await Skill.findOneAndDelete(skillDeleteCondition);

// 		if (!deleteSkill) {
// 			return (
// 				res.status(401),
// 				json({
// 					success: false,
// 					message: "Skill not found or User not Authorization",
// 				})
// 			);
// 		}

// 		res.json({
// 			success: true,
// 			message: "Skill Delete successfully",
// 			deleteSkill: deleteSkill,
// 		});
// 	} catch (error) {}
// });

module.exports = router;
