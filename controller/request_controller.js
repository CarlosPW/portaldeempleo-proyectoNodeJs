const ModelUsuario = require("../models/usuarios_model");
const ModelCategoria = require("../models/categorias_model");

const ModelRequest = require("../models/request_model");

const getRequests = async (req, res, next) => {
	ModelRequest.find().exec((err, items) => {
		if (err || !items) {
			return res.status(400).json({
				messsage: "No se encuentran Requests",
			});
		}

		return res.json({
			items,
		});
	});
};

const addRequest = async (req, res, next) => {
	let userID = req.params.userID;
	try {
		let docUsuario = await ModelUsuario.findById(userID).exec();

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
			user: {
				userID: docUsuario._id,
				first_name: docUsuario.first_name,
				last_name: docUsuario.last_name,
				email: docUsuario.email,
			},
			categorie_name: docCategoria[0].categorie_name,
			job_title: req.body.job_title,
			description: req.body.description,
			// habilities: req.body.habilities,
			experience_level: req.body.experience_level,
		};

		const modelrequest = new ModelRequest(data);
		modelrequest.save((err, docPost) => {
			if (err) {
				return res.json(err);
			}

			return res.json({
				data: docPost,
			});
		});
	} catch (error) {
		return res.json(error);
	}
};

const removeRequest = async (req, res, next) => {
	const requestID = req.params.requestID;

	await ModelRequest.findByIdAndDelete(requestID, (err, docPost) => {
		if (err || !docPost) {
			return res.status(400).json({ error: "Request no existe" });
		}

		return res.json({
			data: "Request Eliminado",
		});
	});
};

const updateRequest = async (req, res, next) => {
	const requestID = req.params.requestID;
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
			habilities: req.body.habilities,
			experience_level: req.body.experience_level,
		};

		await ModelRequest.findByIdAndUpdate(
			requestID,
			data,
			{ new: true },
			(err, docPost) => {
				if (err || !docPost) {
					return res.status(400).json({ error: "Request no existe" });
				}

				return res.json({
					data: docPost,
				});
			}
		);
	} catch (error) {
		return res.json(error);
	}
};

module.exports = {
	addRequest,
	removeRequest,
	updateRequest,
	getRequests,
};
