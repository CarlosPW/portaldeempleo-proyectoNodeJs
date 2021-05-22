const express = require("express");
const app = express();

app.use(require("./categoria_controller"));
app.use(require("./usuario_controller"));
app.use(require("./post_controller"));
app.use(require("./request_controller"));

module.exports = app;
