module.exports = function(sequelize, DataTypes) {
	var path = require("path");
	var schema = require(path.join(__dirname, "commonSchema.js"))(DataTypes);
	var grayscale3 = sequelize.define("grayscaleThree", schema, { freezeTableName: true  });
	return grayscale3;
};