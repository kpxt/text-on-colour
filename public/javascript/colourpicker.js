$(document).ready(function () {
    M.AutoInit();
    $.farbtastic($("#colorpicker"), respondToColour).setColor("#99fff7");
    try {
        $('ul.tabs').tabs('select_tab', 'tab_id');
    } catch (err) {
        console.log("Error: " + err.message);
    }
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();
    $('input#input_text, textarea#textarea1').characterCounter();
    $('#textarea1').val('New Text');
    $('#textarea1').trigger('autoresize');

    function respondToColour(colour) {
        function hexToRgb(hex) {
            return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                , (m, r, g, b) => '#' + r + r + g + g + b + b)
                .substring(1).match(/.{2}/g)
                .map(x => parseInt(x, 16));
        }
        var rgb = hexToRgb(colour);
        $("body").css({ "background": "rgb(" + rgb.join(", ") + ")" });
        $("#color").text(rgb.join(", "));
    };

});