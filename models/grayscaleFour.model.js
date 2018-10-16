module.exports = function (sequelize, DataTypes) {
    var path = require("path");
    var schema = require(path.join(__dirname, "commonSchema.js"))(DataTypes);
    var grayscale4 = sequelize.define("grayscaleFour", schema, { freezeTableName: true, timestamps: false  });
    return grayscale4;
};