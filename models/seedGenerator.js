var path = require("path");
var db = require(path.join(__dirname, "index.js"));

var grayscaleMethods = {
    "grayscaleOne": function (r, g, b) {
        return (r * 0.299) + (g * 0.587) + (b * 0.114);
    },
    "grayscaleTwo": function (r, g, b) {
        return (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    },
    "grayscaleThree": function (r, g, b) {
        var C = grayscaleMethods.grayscale2(r, g, b) / 255.0;
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
    console.log(formula(255, 255, 255) / 2);
    return gs <= formula(255, 255, 255) / 2;
}

function calcInsert() {
    for (var red = 0; red <= 255; red++) {
        for (var green = 0; green <= 255; green++) {
            for (var blue = 0; blue <= 255; blue++) {

            }
        }
    }
}

// var tone = 55;

// for (var formula in grayscaleMethods) {
//     var gs = grayscaleMethods[formula](tone, tone, tone)
//     console.log(gs);
//     console.log(isWhiteText(gs, grayscaleMethods[formula]));
//     console.log("\n");
// }