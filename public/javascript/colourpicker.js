$(document).ready(function () {
    $.farbtastic($("#colorpicker"), respondToColour).setColor("#99fff7");

    console.log(getNet());

    function hexToRgb(hex) {
        console.log(hex);
        return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            , (m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16));
    }

    async function takeNet() {
        var net = await getNet();
        return net;
    }

    function respondToColour(colour) {
        var rgb = hexToRgb(colour);
        // console.log(net.run(rgb));
        $("body").css({ "background": "rgb(" + rgb.join(", ") + ")" });
        $("#color").text(rgb.join(", "));
    };
});