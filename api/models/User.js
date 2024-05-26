const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	userDependency: {
		type: [],
		ref: "usersDependency",
	},
});

module.exports = User = mongoose.model("users", UserSchema);
