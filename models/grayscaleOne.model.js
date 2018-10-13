module.exports = function(sequelize, DataTypes) {
    var schema = require("commonSchema")(DataTypes);
    var grayscale1 = sequelize.define("grayScale1", schema);
    return grayscale1;
};