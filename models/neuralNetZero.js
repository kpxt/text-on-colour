var fs = require("fs");
var path = require("path");

var tests = [[0, 0, 0], [14, 99, 237], [221, 11, 11], [207, 11, 221, 255, 246, 0], [32, 84, 0], [255, 255, 255]];

var brain = require("brain.js");

function nnZero(data) {
    var config = {
        binaryThresh: 0.5,
        activation: 'sigmoid',
    };

    var net = new brain.NeuralNetwork(config);
    net.trainAsync(data, { log: true, iterations: 50 }).then(function (res) {
        console.log("Trained model at " + res.iterations + " iterations and " + res.error + " error.");
        tests.forEach(function (test) {
            console.log(net.run(test));
        });
        fs.writeFile("neuralNets/nnZero.json", JSON.stringify(net), "utf8", function (err) {
            if (err) throw err;
            console.log("File written");
        });
    }).catch(function (err) {
        if (err) throw err;
    });
}

require(path.join(__dirname, "initialData"))(nnZero);