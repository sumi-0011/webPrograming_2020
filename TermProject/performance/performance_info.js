window.onload = function () {
    showinfo();
    //이벤트 리스너 등록
    document.getElementById('good_input').addEventListener("click", inputGood);
    document.getElementById('move_BackPage').addEventListener("click", moveBackPage);
    
}
//목록 버튼을 누르면 실행되는 함수
function moveBackPage() {
    //현재페이지에서 뒤로가 그전 공연 목록 페이지로이동한다. 
}
//관심공연담기 버튼을 누르면 실행되는 함수
function inputGood() {
    //이미 관심공연이면은 관심공연이라고 알림창을뜨게하고, 
    //그렇지 않다면 관심공연에 추가되었다는 알림창을 뜨게하고
    //그 사용자의 관심공연 리스트에 이 공연을 추가한다. 
}
//공연 txt파일에서 정보를 가져와 화면에 표시해주는 함수
function showinfo() {
    var performance_name = document.getElementById("performance_name");
    var classification = document.getElementById("classification");
    var performance_date = document.getElementById('performance_date');
    var performance_time = document.getElementById('performance_time');
    var clticket_infoa = document.getElementById('ticket_info');

    //txt파일에서 각각의 id의 텍스트 부분에 공연정보를 입력해준다. 
}
