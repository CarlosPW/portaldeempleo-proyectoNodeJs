const express = require("express");
const { validateSignUp } = require("../validators/usuario_validator");

const { isAuth, isAdmin, renewToken } = require("../middleware/Auth");

const {
	listarUsuarios,
	registrarUsuario,
	login,
	actualizarUsuario,
} = require("../controller/usuario_controller");

const router = express.Router();

router.get("/usuarios", isAuth, isAdmin, listarUsuarios);
router.post("/usuarios/signup", validateSignUp, registrarUsuario);
router.post("/usuarios/login", login);
router.put("/usuarios/:id", isAuth, actualizarUsuario);
router.get("/usuarios/login/renew", isAuth, renewToken);

module.exports = router;
