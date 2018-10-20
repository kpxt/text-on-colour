$(document).ready(function(){
    M.AutoInit();
    $('.sidenav').sidenav();
    $.ajax({
      method: "GET",
      url: "/api/colour"
    }).then((net) => {
      console.log(net);
    });
  });
