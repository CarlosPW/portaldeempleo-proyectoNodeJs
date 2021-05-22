const categoriaRouter = require("./categoria_router");
const usuariosRouter = require("./usuarios_router");
const postRouter = require("./post_router");
const requestRouter = require("./request_router");

module.exports = (app) => {
	app.use("/api", categoriaRouter);
	app.use("/api", usuariosRouter);
	app.use("/api", postRouter);
	app.use("/api", requestRouter);
};
