const mongoose = require("mongoose");

var schemaCategoria = mongoose.Schema({
	categorie_name: {
		type: String,
		unique: true,
	},
});

const model = mongoose.model("ModelCategoria", schemaCategoria);

module.exports = model;
