$(document).ready(function() {
    console.log("colourTrain.js loaded");
    let train = getColour();
    function getColour() {
        res = [];
        for (var i = 0; i <= 2; i++) {
            res.push(Math.floor(Math.random() * 256));
        }
        return res;
    }

    $(".colour1, .colour2").css("background-color", "rgb(" + train.join(", ") + ")");
});