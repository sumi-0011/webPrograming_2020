
//겹치는 header, nav, footer태그를 일일이 쓰지않고 load하여 사용
$(document).ready(function() {
    $("header").load("../menu/header.html");
    $("nav").load("../menu/nav.html");
    // $("aside").load("./menu/aside_ticket.html");
    $("footer").load("../menu/footer.html");
})