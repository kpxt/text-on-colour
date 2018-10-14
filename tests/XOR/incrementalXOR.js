var brain = require("brain.js");
var util = require('util')

/* experiement with hidden layers and activation functions
note: tanh activation and an additional neuron in the first hidden layer is ideal for live training */
var config = {
    binaryThresh: 0.5,
    inputSize: 2,
    hiddenLayers: [3],
    activation: 'tanh',
};

// experiment with the combinations of each set using the below two variables
var firstData = [{ input: [0, 0], output: [0] },
{ input: [0, 1], output: [1] },
{ input: [1, 0], output: [1] }];

var secondData = [{ input: [1, 1], output: [0] }];

// net1 is an empty NN
var net1 = new brain.NeuralNetwork(config);


function fullyTrainXOR(net) {

    net.trainAsync(secondData.concat(firstData), { log: true }).then(function (res) {
        console.log("Trained model at " + res.iterations + " iterations and " + res.error + " error.");
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

function incrementalXOR1(net) {

    // train net with first XOR datasets and output tests when done
    net.trainAsync(firstData, { log: true }).then(function (res) {
        console.log("Trained model at " + res.iterations + " iterations and " + res.error + " error.");
        console.log("This is how an XOR problem looks at all four inputs before training the new dataset(s)");
        console.log(net.run([0, 0]));
        console.log(net.run([1, 0]));
        console.log(net.run([0, 1]));
        console.log(net.run([1, 1]));
        console.log("\n");

        // train net again with second XOR datasets and output tests when done
        net.trainAsync(secondData.concat(firstData), { log: true }).then(function (res) {
            console.log("Trained model at " + res.iterations + " iterations and " + res.error + " error.");
            console.log("This is how the net looks after at all datasets");
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

// this function adds a blind dataset on top of the already existing model
function incrementalXOR2(net) {
    net.trainAsync(firstData, { log: true }).then(function (res) {
        console.log("Trained model at " + res.iterations + " iterations and " + res.error + " errors.");
        console.log("This is how an XOR problem looks at all four inputs before training it with the final data, [1, 1] => 0");
        console.log(net.run([0, 0]));
        console.log(net.run([1, 0]));
        console.log(net.run([0, 1]));
        console.log(net.run([1, 1]));
        console.log("\n");

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

incrementalXOR1(net1);