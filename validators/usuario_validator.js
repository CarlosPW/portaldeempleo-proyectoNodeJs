const { body, validationResult } = require("express-validator");
const ModelUsuario = require("../models/usuarios_model");

const pSignUp = [
	body("first_name").trim().not().isEmpty().withMessage("Nombre requerido"),
	body("last_name").not().isEmpty().withMessage("Apellido Requerido"),

	body("email")
		.isEmail()
		.withMessage("Ingrese Email válido")
		.custom((value) => {
			return ModelUsuario.findOne({ email: value }).then((userDoc) => {
				if (userDoc) {
					return Promise.reject("Este correo ya existe");
				}
			});
		}),

	body("password")
		.trim()
		.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
		.withMessage("Contraseña debe incluir números, mayúsculas y carácteres @$.!%*#?&")
		.isLength({ min: 5 })
		.withMessage("Mínimo 5 carácteres"),
];

const vSignUp = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	next();
};

const validateSignUp = [pSignUp, vSignUp];

module.exports = {
	validateSignUp,
};
