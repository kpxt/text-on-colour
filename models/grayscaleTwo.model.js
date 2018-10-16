module.exports = function(sequelize, DataTypes) {
    var path = require("path");
    var schema = require(path.join(__dirname, "commonSchema.js"))(DataTypes);
    var grayscale2 = sequelize.define("grayscaleTwo", schema, { freezeTableName: true, timestamps: false  });
    return grayscale2;
};