const ModelCategoria = require("../models/categorias_model");

// Manejador de Error
function errorHandler(data, next, err = null) {
	if (err) {
		return next(err);
	}

	if (!data) {
		let error = new Error("Categoria no disponible.");
		error.statusCode = 404;
		return next(error);
	}
}

// Controladores
function listarCategorias(req, res) {
	ModelCategoria.find().exec((err, items) => {
		if (err || !items) return errorHandler(items, next, err);

		return res.json({
			items,
		});
	});
}

function guardarCategoria(req, res, next) {
	let data = {
		categorie_name: req.body.categorie_name,
	};

	ModelCategoria.find(
		{ categorie_name: req.body.categorie_name },
		(err, docCategoria) => {
			const modelcategoria = new ModelCategoria(data);
			modelcategoria.save((err, docCategoria) => {
				if (err) {
					return res.status(400).json({ error: "Categoria ya existe" });
				} else {
					return res.json({
						data: docCategoria,
					});
				}
			});
		}
	);
}

function getCategoria(req, res) {
	const id = req.params.id;

	ModelCategoria.findById(id, (err, docCategoria) => {
		if (err) {
			return res.status(400).json(err);
		}

		if (!docCategoria) {
			return res.status(400).json({ error: "Categoria no Existe" });
		}

		return res.json({
			data: docCategoria,
		});
	});
}

function actualizarCategoria(req, res) {
	const id = req.params.id;

	ModelCategoria.findByIdAndUpdate(
		id,
		{ categorie_name: req.body.categorie_name },
		{ new: true },
		(err, docCategoria) => {
			if (err) {
				return res.status(400).json(err);
			}

			if (!docCategoria) {
				return res.status(400).json({ error: "Categoria no Existe" });
			}

			return res.json({
				data: docCategoria,
			});
		}
	);
}

function borrarCategoria(req, res) {
	const id = req.params.id;
	ModelCategoria.findByIdAndRemove(id, (err, docCategoria) => {
		if (err) {
			return res.status(400).json(err);
		}

		if (!docCategoria) {
			return res.status(400).json({ error: "Categoria no Existe" });
		}

		return res.json({
			data: docCategoria,
		});
	});
}

module.exports = {
	listarCategorias,
	getCategoria,
	guardarCategoria,
	actualizarCategoria,
	borrarCategoria,
};
