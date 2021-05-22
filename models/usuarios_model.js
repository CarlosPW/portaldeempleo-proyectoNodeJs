const { Schema, model } = require("mongoose");

let schemaUsuario = new Schema({
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
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "USER_ROLE",
	},
	state: {
		type: Boolean,
		default: true,
	},
	posts: {
		items: [
			{
				postID: {
					type: Schema.Types.ObjectId,
					ref: "ModelPost",
				},
				job_title: {
					type: String,
					ref: "ModelPost",
				},
				categorie: {
					type: String,
					ref: "ModelPost",
				},
				created_at: {
					type: Date,
					ref: "ModelPost",
				},
			},
		],
	},
});

schemaUsuario.methods.addPost = function (docPost) {
	let newPostItems = [...this.posts.items];

	newPostItems.push({
		postID: docPost._id,
		job_title: docPost.job_title,
		categorie: docPost.categorie,
		created_at: docPost.created_at,
	});

	this.posts.items = newPostItems;
	return this.save();
};

schemaUsuario.methods.removePost = function (postID) {
	let newPostItems = [...this.posts.items];

	newPostItems.filter((item) => {
		return item.postID.toString() !== postID.toString();
	});

	this.posts.items = newPostItems;
	return this.save();
};

module.exports = model("ModelUsuario", schemaUsuario);
