// recieve neural net and log it as an object
function getNet() {
    return new Promise(resolve => {
        $.ajax({
            method: "GET",
            url: "/api/neuralNet"
        }).then((jsonNet) => {
            var net = new brain.NeuralNetwork();
            net.fromJSON(jsonNet);
            resolve(net);
        });
    });
}