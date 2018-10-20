$(document).ready(function(){
    M.AutoInit();
    $('.sidenav').sidenav();
    $.ajax({
      method: "GET",
      url: "/api/"
    }).then((net) => {
      console.log(net);
    });
  });
