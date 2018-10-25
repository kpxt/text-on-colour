$(document).ready(function () {
	// Materialize set up
	M.AutoInit();
	try {
		$("ul.tabs").tabs("select_tab", "tab_id");
	} catch (err) {
		console.log("Error: " + err.message);
	}
	$(".dropdown-trigger").dropdown();
	$(".sidenav").sidenav();
	$("input#input_text, textarea#textarea1").characterCounter();
	$("#textarea1").val("New Text");
	$("#textarea1").trigger("autoresize");
});
