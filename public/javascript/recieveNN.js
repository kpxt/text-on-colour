// recieve neural net and log it as an object
function getNet() { // eslint-disable-line no-unused-vars
	return new Promise(resolve => {
		$.ajax({
			method: "GET",
			url: "/api/neuralNet"
		}).then((jsonNet) => {
			console.log(typeof jsonNet);
			var net = new brain.NeuralNetwork();
			net.fromJSON(jsonNet);
			resolve(net);
		});
	});
}