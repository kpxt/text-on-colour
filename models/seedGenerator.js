var path = require("path");

var db = require(path.join(__dirname, "index.js"));
var queryInterface = db.sequelize.getQueryInterface();

var spread = 3;

var grayscaleMethods = {
    "grayscaleOne": function (r, g, b) {
        return (r * 0.299) + (g * 0.587) + (b * 0.114);
    },
    "grayscaleTwo": function (r, g, b) {
        return (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    },
    "grayscaleThree": function (r, g, b) {
        var C = grayscaleMethods.grayscaleTwo(r, g, b) / 255.0;
        if (C <= 0.0031308) {
            return 255.0 * 12.92 * C;
        } else {
            return 255.0 * (((Math.pow(C, (1 / 2.4))) * 1.055) - 0.055);
        }
    },
    "grayscaleFour": function (r, g, b) {
        return (r * 0.2627) + (g * 0.6780) + (b * 0.0593);
    }
}

function isWhiteText(gs, formula) {
    return gs <= formula(255, 255, 255) / 2;
}

function calcInsertColour(methods) {
    db.sequelize.sync({ force: true });

    var popSeeds = {};
    Object.keys(methods).forEach(function (table) {
        popSeeds[table] = [];
    });

    for (var red = 0; red <= 255; red += spread) {
        for (var green = 0; green <= 255; green += spread) {
            for (var blue = 0; blue <= 255; blue += spread) {
                Object.keys(methods).forEach(function (table, index) {
                    popSeeds[table].push({
                        red: red,
                        green: green,
                        blue: blue,
                        grayscale: methods[table](red, green, blue),
                        whiteText: isWhiteText(methods[table](red, green, blue), methods[table])
                    });
                    console.log("Processing " + red + ", " + green + ", " + blue);
                    if (red >= 255 && green >= 255 && blue >= 255 && index === Object.keys(popSeeds).length - 1) {
                        massInsert(popSeeds);
                        console.log("Done loading seeds");
                    }
                });
            }
        }
    }

    function massInsert(seeds) {
        var promises = [];
        Object.keys(popSeeds).forEach(function (table) {
            var promise = queryInterface.bulkInsert(table, popSeeds[table]);
            promises.push(promise);
        });
        Promise.all(promises).then(function (values) {
            console.log(values);
            console.log("Done updating database");
        });
    }
}

calcInsertColour(grayscaleMethods);