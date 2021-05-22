const ModelUsuario = require("../models/usuarios_model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Manejador de Errores
function errorHandler(data, next, err = null) {
	if (err) {
		return next(err);
	}

	if (!data) {
		let error = new Error("No existe !");
		return res.status(400).json(error);
	}
}

// Controladores
function listarUsuarios(req, res) {
	// MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

	ModelUsuario.find({}, (err, docUsuario) => {
		if (err) {
			res.status(400).json({ err });
		}

		res.json({
			Users: docUsuario,
		});
	});
}

function actualizarUsuario(req, res) {
	const { id } = req.params;
	const { password, email, ...resto } = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		resto.password = bcrypt.hashSync(req.body.password, salt);
	}

	let usuario = ModelUsuario.findByIdAndUpdate(
		id,
		resto,
		{ new: true },
		(err, docCategoria) => {
			if (err || !docCategoria) return errorHandler(docCategoria, next, err);

			return res.json({
				docCategoria,
			});
		}
	);
}

function registrarUsuario(req, res, next) {
	const salt = bcrypt.genSaltSync();

	let data = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, salt),
	};

	let modelusuario = new ModelUsuario(data);
	modelusuario.save((err, docUsuario) => {
		if (err || !docUsuario) return errorHandler(docUsuario, next, err);

		return res.json({
			usuarioID: docUsuario._id,
			first_name: docUsuario.first_name,
			last_name: docUsuario.last_name,
			role: docUsuario.role,
		});
	});
}

function login(req, res) {
	let email = req.body.email;
	let password = req.body.password;

	ModelUsuario.findOne({ email: email }, (err, docUsuario) => {
		if (err || !docUsuario) {
			return res.status(401).json({
				message: "Usuario o password incorrecto",
			});
		}

		if (!bcrypt.compareSync(password, docUsuario.password)) {
			return res.status(401).json({
				message: "Usuario o password incorrecto",
			});
		}

		let payload = {
			usuarioID: docUsuario._id,
			role: docUsuario.role,
			email: docUsuario.email,
		};

		let token = jwt.sign(payload, process.env.TOKEN_KEY, {
			expiresIn: process.env.CADUCIDAD_TOKEN,
		});

		let user = docUsuario.toObject();
		delete user.password;
		delete user.cart;

		return res.json({
			usuario: {
				usuarioID: user._id,
				email: user.email,
				role: user.role,
			},
			token,
		});
	});
}

module.exports = {
	listarUsuarios,
	registrarUsuario,
	login,
	actualizarUsuario,
};
