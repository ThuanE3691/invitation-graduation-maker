const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDependencySchema = new Schema({
	username: {
		type: String,
		required: true,
	},
});

module.exports = UserDependency = mongoose.model(
	"usersDependency",
	UserDependencySchema
);
