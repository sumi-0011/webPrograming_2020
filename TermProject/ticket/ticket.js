
window.onload =function() {
    // 인원,좌석 선택 화면으로 이동
    document.getElementById('pageChage_seat').addEventListener("click",function() {
        location.href = "./ticket/step2.html"
    });

}
//menu 로드 함수
$(document).ready(function() {
    $("header").load("../menu/header.html");
    $("nav").load("../menu/nav.html");
    // $("aside").load("./menu/aside_ticket.html");
    $("footer").load("../menu/footer.html");
})
