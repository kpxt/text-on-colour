var fs = require("fs");
var path = require("path");

var brain = require("brain.js");

var tests = [[0, 0, 0], [14, 99, 237], [221, 11, 11], [207, 11, 221], [255, 246, 0], [32, 84, 0], [255, 255, 255], [242, 228, 36]];

var arg = process.argv[2], filename = "";

if (arg) {
    if (isNaN(arg)) {
        filename += arg + ".json";
    } else {
        filename += "nn" + arg + ".json";
    }
} else {
    filename += "nnZero.json"
}


function nnZero(data, write, initial, preconfig) {
    var net;
    if (initial) {
        var config = {
            binaryThresh: 0.5,
            activation: 'sigmoid',
            learningRate: 0.01
        };

        net = new brain.NeuralNetwork(config);
    } else {
        net = new brain.NeuralNetwork().fromJSON(preconfig);
    }
    console.log("\nCommencing training...");
    return new Promise(async function (resolve, reject) {
        try {
            var res = await net.trainAsync(data, { log: true, iterations: 20 })
            console.log("Trained model at " + res.iterations + " iterations and " + res.error + " error.\n Here are the final test results: ");
            tests.forEach(function (test) {
                console.log(net.run(test));
            });
        } catch (err) {
            return reject(err);
        }
        if (write) { // change back to filename when done testing
            console.log(net.toJSON());
            fs.writeFile(path.join(__dirname, "./neuralNets", initial ? filename : "writeTrain.json"), JSON.stringify(net.toJSON()), "utf8", function (err) {
                if (err) throw reject;
                console.log("File written");
            });
        }
        return resolve(net);
    });
}

require(path.join(__dirname, "initialData"))(nnZero);
module.exports = { training: nnZero };