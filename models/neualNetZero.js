var path = require("path");

function nnZero(data) {
    var config = {
        binaryThresh: 0.5,
        inputSize: 2,
        hiddenLayers: [3],
        activation: 'tanh',
    };
    
    var net = new brain.NeuralNetwork(config);
    
}

require(path.join(__dirname, "initialData"))(nnZero);