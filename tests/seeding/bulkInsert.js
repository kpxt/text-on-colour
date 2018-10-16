var path = require("path");

var db = require(path.join(__dirname, "..", "..", "models"));
var queryInterface = db.sequelize.getQueryInterface();

db.sequelize.query("SET GLOBAL max_allowed_packet=1073741824", { type: db.sequelize.QueryTypes.SELECT }).then(function() {
    queryInterface.bulkInsert("grayscaleOne", [{
        red: 0,
        green: 0,
        blue: 0,
        grayscale: 37.53614642327091,
        whiteText: true
    }, {
        red: 255,
        green: 255,
        blue: 255,
        grayscale: 36.230464660153615,
        whiteText: false
    }]);
});