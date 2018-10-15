var path = require("path");

var db = require(path.join(__dirname, "index.js"));

var brain = require("brain.js");

module.exports = getAllData = function(cb) {
    var queryString = "";
    db.sequelize.query("SHOW TABLES").then(function (rows) {
        rows[0].forEach(function (obj, i) {
            var table = obj["Tables_in_textoncolour_db"];
            queryString += "SELECT red, green, blue, whiteText FROM " + table;
            if (rows[0][i + 1]) {
                queryString += " UNION ALL "
            }
        });
        db.sequelize.query(queryString).then(function (rows) {
            console.log("Retrieved " + rows[0].length + " entries");
            cb(rows[0]);
        });
    });
}