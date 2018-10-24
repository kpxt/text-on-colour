var path = require("path");

var db = require(path.join(__dirname, "index.js"));
var queryInterface = db.sequelize.getQueryInterface();

var spread = 4;

// mutate to support other grayscale functions; amount of functions must reflect amount of models in directory
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
};

function isWhiteText(gs, formula) {
	return gs <= formula(255, 255, 255) / 2;
}

function calcInsertColour(methods, callback) {
	db.sequelize.sync({ force: true });

	var popSeeds = {};
	Object.keys(methods).forEach(function (table) {
		popSeeds[table] = [];
	});

	for (var red = 0; red <= 255; red += spread) {
		for (var green = 0; green <= 255; green += spread) {
			for (var blue = 0; blue <= 255; blue += spread) {
				Object.keys(methods).forEach(function (table) {
					var gs = methods[table](red, green, blue);
					popSeeds[table].push({
						red: red,
						green: green,
						blue: blue,
						grayscale: gs,
						whiteText: isWhiteText(gs, methods[table])
					});
					console.log("Processing " + red + ", " + green + ", " + blue);
				});
			}
		}
	}
	massInsert(popSeeds, callback);
	console.log("Done loading seeds");

	function massInsert(seeds, callback) {// change to seeds instead popseeds
		var promises = [];
		Object.keys(seeds).forEach(function (table) {
			var promise = queryInterface.bulkInsert(table, seeds[table]);
			promises.push(promise);
		});
		Promise.all(promises).then(function () {
			console.log("\n\n\n\n\nDone updating database\n\n\n\n\n");
			if (callback) {
				callback();
			}
		});
	}
}

if (process.argv[2] && process.argv[2] === "run") {
	calcInsertColour(grayscaleMethods);
}

exports.run = function () {
	calcInsertColour(grayscaleMethods);
};