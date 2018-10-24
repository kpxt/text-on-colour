$(document).ready(function () {
    $.farbtastic($("#colorpicker"), respondToColour).setColor("#99fff7");

    function hexToRgb(hex) {
        return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            , (m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16));
    }

    async function respondToColour(colour) {
        var net = await getNet();
        var rgb = hexToRgb(colour);
        var result = net.run(rgb);
        $("body").css({ "background": "rgb(" + rgb.join(", ") + ")" });
        $("#color").text(rgb.join(", ")).css({"color": (result.white > result.black) ? "white" : "black"});
    };
});