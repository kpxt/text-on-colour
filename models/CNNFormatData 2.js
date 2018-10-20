var path = require("path");

var db = require(path.join(__dirname, "index.js"));

module.exports = getAllData = function (cb) {
    db.sequelize.query("SHOW TABLES").then(function (rows) {
        var promises = [], output = [];
        rows[0].forEach(function (obj, i) {
            var table = obj["Tables_in_textoncolour_db"];
            promises.push(db[table].findAll({
                attributes: ["red", "green", "blue", "whiteText"]
            }));
        });
            Promise.all(promises).then(function (tableData) {
                tableData.forEach(function(tableResults, i) {
                    console.log("Retrieved " + tableResults.length);
                    var data = tableResults.map(row => format(row));
                    output.push(shuffle(data));
                    console.log(data);
                });
                if (cb) {
                    cb(output);
                }
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