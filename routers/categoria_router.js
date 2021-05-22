const express = require("express");

const { isAuth, isAdmin, renewToken } = require("../middleware/Auth");

const {
	listarCategorias,
	getCategoria,
	guardarCategoria,
	actualizarCategoria,
	borrarCategoria,
} = require("../controller/categoria_controller");

const router = express.Router();

router.get("/categorias", listarCategorias);
router.get("/categorias/:id", getCategoria);
router.post("/categorias", isAuth, isAdmin, guardarCategoria);
router.put("/categorias/:id", isAuth, isAdmin, actualizarCategoria);
router.delete("/categorias/:id", isAuth, isAdmin, borrarCategoria);

module.exports = router;
