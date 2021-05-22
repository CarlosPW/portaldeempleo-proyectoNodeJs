const { Schema, model } = require("mongoose");

const schemaRequest = new Schema({
	user: {
		userID: {
			type: Schema.Types.ObjectId,
			ref: "ModelUsuario",
		},
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	categorie_name: {
		type: String,
		ref: "ModelCategoria",
		required: true,
	},
	job_title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	habilities: {
		type: Array,
	},
	experience_level: {
		type: String,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = model("ModelRequest", schemaRequest);
