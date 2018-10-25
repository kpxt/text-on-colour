$(document).ready(function () {
    try {
        var location = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    } catch (err) {
        console.log(err.message);
    }
    var aboutKeys = ["process", "development", "design", "future"];
    var leftHref = aboutKeys[aboutKeys.indexOf(location) - 1];
    var rightHref = aboutKeys[aboutKeys.indexOf(location) + 1];

    if (leftHref) {
        let leftAnchor = $("<a>");
        let leftArrow = "&#8249;";
        leftAnchor.addClass("previous round");
        console.log(leftHref);
        leftAnchor.attr("href", "/about/" + leftHref);
        leftAnchor.append(leftArrow);
        $(".leftArrow").append(leftAnchor);
    }

    if (rightHref) {
        let rightAnchor = $("<a>");
        let rightArrow = "&#8250;";
        rightAnchor.addClass("next round");
        rightAnchor.attr("href", "/about/" + rightHref);
        rightAnchor.append(rightArrow);
        $(".rightArrow").append(rightAnchor);
    }

});