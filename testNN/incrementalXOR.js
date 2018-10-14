var brain = require("brain.js");

var config = {
    binaryThresh: 0.5,
    inputSize: 2,
    hiddenLayers: [2],
    activation: 'sigmoid'
};

// net1 is an empty NN
var net1 = new brain.NeuralNetwork(config);

function fullyTrainXOR(net) {
    var data = [{ input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }];

    net.trainAsync(data).then(function (res) {
        console.log("Trained model at " + res.iterations + " iterations and " + res.error + " errors.");
        console.log("This is the fully trained XOR problem");
        console.log(net.run([0, 0]));
        console.log(net.run([1, 0]));
        console.log(net.run([0, 1]));
        console.log(net.run([1, 1]));
        console.log("\n\n");
    }).catch(function (err) {
        if (err) throw err;
    });
}
var firstData = [{ input: [0, 0], output: [0] },
{ input: [0, 1], output: [1] },
{ input: [1, 0], output: [1] }];

var secondData = [{ input: [1, 1], output: [0] }];

function incrementalXOR1(net) {

    // train given net with first three XOR inputs and output trained model as net2
    net.trainAsync(firstData, { log: true }).then(function (res) {
        console.log("Trained model at " + res.iterations + " iterations and " + res.error + " errors.");
        console.log("This is how an XOR problem looks at all four inputs before training it with the final data, [1, 1] => 0");
        console.log(net.run([0, 0]));
        console.log(net.run([1, 0]));
        console.log(net.run([0, 1]));
        console.log(net.run([1, 1]));
        console.log("\n");

        // train net again with [1, 1] and output as net3
        net.trainAsync(secondData.concat(firstData), { keepNetworkIntact: true, log: true }).then(function (res) {
            console.log("Trained model at " + res.iterations + " iterations and " + res.error + " errors.");
            console.log("This is how the net looks after at all four inputs");
            console.log(net.run([0, 0]));
            console.log(net.run([1, 0]));
            console.log(net.run([0, 1]));
            console.log(net.run([1, 1]));
            console.log("\n\n");
        }).catch(function (err) {
            if (err) throw err;
        });
    }).catch(function (err) {
        if (err) throw err;
    });
}

function incrementalXOR2(net) {
    // train given net with first three XOR inputs and output trained model as net2
    net.trainAsync(firstData, { log: true }).then(function (res) {
        console.log("Trained model at " + res.iterations + " iterations and " + res.error + " errors.");
        console.log("This is how an XOR problem looks at all four inputs before training it with the final data, [1, 1] => 0");
        console.log(net.run([0, 0]));
        console.log(net.run([1, 0]));
        console.log(net.run([0, 1]));
        console.log(net.run([1, 1]));
        console.log("\n");

        // train net again with [1, 1] and output as net3
        net.trainAsync(secondData, { log: true }).then(function (res) {
            console.log("Trained model at " + res.iterations + " iterations and " + res.error + " errors.");
            console.log("This is how the net looks after at all four inputs");
            console.log(net.run([0, 0]));
            console.log(net.run([1, 0]));
            console.log(net.run([0, 1]));
            console.log(net.run([1, 1]));
            console.log("\n\n");

        }).catch(function (err) {
            if (err) throw err;
        });
    }).catch(function (err) {
        if (err) throw err;
    });
}

console.log(incrementalXOR(net1));