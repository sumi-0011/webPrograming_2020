document.getElementById("pay_Bt").addEventListener("click", function () {
  // 예매완료 창으로 이동
  alert("예매완료");
});



//menu 로드 함수
$(document).ready(function () {
  $("header").load("../menu/header.html");
  $("nav").load("../menu/nav.html");
  // $("aside").load("./menu/aside_ticket.html");
  $("footer").load("./menu/footer.html");
});
