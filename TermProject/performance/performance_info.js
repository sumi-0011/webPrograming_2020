
    showinfo();
    //이벤트 리스너 등록
    document.getElementById('good_input').addEventListener("click", inputGood);
    document.getElementById('move_BackPage').addEventListener("click", moveBackPage);
    

//목록 버튼을 누르면 실행되는 함수
function moveBackPage() {
    //현재페이지에서 뒤로가 그전 공연 목록 페이지로이동한다. 
    //전페이지에서 현재 페이지로 넘어오면서 세션에 저장한값을 삭제하고 이동한다. 
    sessionStorage.removeItem('now_perform');
    location.href = "./performance.html";
}
//관심공연담기 버튼을 누르면 실행되는 함수
function inputGood() {
    //이미 관심공연이면은 관심공연이라고 알림창을뜨게하고, 
    //그렇지 않다면 관심공연에 추가되었다는 알림창을 뜨게하고
    //그 사용자의 관심공연 리스트에 이 공연을 추가한다. 
    alert('관심공연에 추가하였습니다. ');
}
//공연 txt파일에서 정보를 가져와 화면에 표시해주는 함수
function showinfo() {
    //각각의 id의 텍스트 부분에 공연정보를 입력해준다. 
    //세션스토리지에서 나타낼 공연정보를 가져와 해독후 해독값을 입력한다. 
    var data = sessionStorage.getItem('now_perform');
    var date_obj = JSON.parse(data);
    $('#performance_name').html(date_obj['name']);
    $('#classification').html(date_obj['clas'])
    $('#performance_date').html(date_obj['date']);
    $('#performance_time').html(date_obj['time']);
    $('#ticket_info').html(date_obj['ticket']);
    $("#detail_input").html(date_obj['detail']);
    $('#img_tag').attr("src","../image/"+date_obj['image']);
}
