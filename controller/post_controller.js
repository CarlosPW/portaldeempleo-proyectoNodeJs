const ModelUsuario = require("../models/usuarios_model");
const ModelPost = require("../models/post_model");
const ModelCategoria = require("../models/categorias_model");

const getPosts = async (req, res, next) => {
	ModelPost.find().exec((err, items) => {
		if (err || !items) {
			return res.status(400).json({
				message: "No se encuentran posts",
			});
		}

		return res.json({
			items,
		});
	});
};

const addPost = async (req, res, next) => {
	let userID = req.params.userID;
	try {
		let docUsuario = await ModelUsuario.findById(userID).exec();

		let docCategoria = await ModelCategoria.find(
			{ categorie_name: req.body.categorie_name },
			(err, docCategoria) => {
				return docCategoria;
			}
		);

		console.log(docCategoria);
		if (docCategoria.length < 1) {
			return res.status(400).json({ error: "Categoria no existe" });
		}

		let data = {
			user: {
				userID: docUsuario._id,
				first_name: docUsuario.first_name,
				last_name: docUsuario.last_name,
				email: docUsuario.email,
			},
			categorie_name: docCategoria[0].categorie_name,
			job_title: req.body.job_title,
			description: req.body.description,
			// requirements: req.body.requirements,
			experience_level: req.body.experience_level,
		};

		docUsuario = await docUsuario.addPost(data);

		const modelpost = new ModelPost(data);
		modelpost.save((err, docPost) => {
			if (err) {
				return res.json(err);
			}

			return res.json({
				data: docPost,
			});
		});
	} catch (error) {
		console.log(error);
	}
};

const removePost = async (req, res, next) => {
	const postID = req.params.postID;

	await ModelPost.findByIdAndDelete(postID, (err, docPost) => {
		if (err || !docPost) {
			return res.status(400).json({ error: "Post no existe" });
		}

		return res.json({
			data: docPost,
		});
	});
};

const updatePost = async (req, res, next) => {
	const postID = req.params.postID;
	try {
		let docCategoria = await ModelCategoria.find(
			{ categorie_name: req.body.categorie_name },
			(err, docCategoria) => {
				return docCategoria;
			}
		);

		if (docCategoria.length < 1) {
			return res.status(400).json({ error: "Categoria no existe" });
		}

		let data = {
			categorie_name: docCategoria[0].categorie_name,
			job_title: req.body.job_title,
			description: req.body.description,
			// requirements: req.body.requirements,
			experience_level: req.body.experience_level,
		};

		await ModelPost.findByIdAndUpdate(postID, data, { new: true }, (err, docPost) => {
			if (err || !docPost) {
				return res.status(400).json({ err });
			}

			return res.json({
				data: docPost,
			});
		});
	} catch (error) {
		return res.json(error);
	}
};

module.exports = {
	addPost,
	removePost,
	updatePost,
	getPosts,
};
