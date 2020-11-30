
//화면이 로드되면 현재 예약 가능한 좌석을 나타내준다.
function showSeat {
    //현재 예약이 불가능한 좌석은 회색으로 표시하고 선택할수 없게 하고
    //예약이 가능한 좌석은 흰색으로 표시하고 좌석을 클릭하면 totalSelect함수를 호출하는 이벤트 리스너를 등록한다. 
    //좌석마다 가격이 다를수 있으므로 옆에 등급에 따른 가격을 나타내준다. 
}

//인원 선택 값이나 좌석선택값을 바꾸면 실행되는 함수
function totalSelect() {
    //인원선택 text값과 좌석선택값을 받아와 
    //인원 1명 좌석 A열 10번 좌석 처럼 화면에 나타내준다. 
}
//결제선택 버튼을 누르면 실행되는 함수
function click_pay() {
    //현재 선택한 좌석과 인원수를 세션에 저장하고 결제페이지로 이동한다. 
}
window.onload =function() {
    document.getElementById('changePage_pay').addEventListener("click",function() {
        location.href = "./step3.html"
    });
    
}
//menu 로드 함수
$(document).ready(function() {
    $("header").load("../menu/header.html");
    $("nav").load("../menu/nav.html");
    // $("aside").load("./menu/aside_ticket.html");
    $("footer").load("../menu/footer.html");
})
