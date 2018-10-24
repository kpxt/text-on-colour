$(document).ready(function () {
	console.log("colourTrain.js loaded");
	function setInputColours() {
		var train = getColour();
		function getColour() {
			var result = [];
			for (var i = 0; i <= 2; i++) {
				result.push(Math.floor(Math.random() * 256));
			}
			return result;
		}

		$(".inputBox").css("background-color", "rgb(" + train.join(", ") + ")");

		$(".inputBox").on("click", function () {
			console.log(train);
			console.log(JSON.parse($(this).attr("data-colour")));
			$.ajax({
				method: "POST",
				url: "/api/neuralNet",
				data: { "input": train, "output": JSON.parse($(this).attr("data-colour")) },
				error: function(err) {
					if (err) console.log(err);
				}
			});
			$(".inputBox").off("click");
			return setInputColours();
		});
	}
	setInputColours();
});