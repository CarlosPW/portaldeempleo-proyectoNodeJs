const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());

require("dotenv").config();

app.use(cors());

const routerV1 = require("./routers/index");
routerV1(app);

app.use(express.static("build"));

const puerto = process.env.PORT;

mongoose
	.connect(process.env.MONGO_SERVER, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Mongo Conectado");
	});

app.listen(puerto, () => {
	console.log(`server OK en puerto ${puerto}`);
});
