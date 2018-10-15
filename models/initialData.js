var path = require("path");

var db = require(path.join(__dirname, "index.js"));

var brain = require("brain.js");

module.exports = getAllData = function (cb) {
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
            var data = rows[0].map(row => format(row));
            console.log(data);
            cb(shuffle(data));
        });
    });
    function format(row) {
        return Boolean(row.whiteText) ? { input: [row.red, row.green, row.blue], output: { white: 1 } } : { input: [row.red, row.green, row.blue], output: { black: 1 } };
    }
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
}