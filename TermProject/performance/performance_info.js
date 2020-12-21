
    showinfo();
    //이벤트 리스너 등록
    document.getElementById('good_input').addEventListener("click", inputGood);
    document.getElementById('move_BackPage').addEventListener("click", moveBackPage);
    

//목록 버튼을 누르면 실행되는 함수
function moveBackPage() {
    console.log("cc");
    //현재페이지에서 뒤로가 그전 공연 목록 페이지로이동한다. 
    sessionStorage.removeItem('now_perform');
    location.href = "./performance.html";
}
//관심공연담기 버튼을 누르면 실행되는 함수
function inputGood() {
    //이미 관심공연이면은 관심공연이라고 알림창을뜨게하고, 
    //그렇지 않다면 관심공연에 추가되었다는 알림창을 뜨게하고
    //그 사용자의 관심공연 리스트에 이 공연을 추가한다. 
}
//공연 txt파일에서 정보를 가져와 화면에 표시해주는 함수
function showinfo() {
    var data = sessionStorage.getItem('now_perform');
    var date_obj = JSON.parse(data);
    // console.log(date_obj['name']);
    $('#performance_name').html(date_obj['name']);
    $('#classification').html(date_obj['clas'])
    $('#performance_date').html(date_obj['date']);
    $('#performance_time').html(date_obj['time']);
    $('#ticket_info').html(date_obj['ticket']);
    $("#detail_input").html(date_obj['detail']);
    // $('#img').html(date_obj['image']);
    // console.log("../image/"+date_obj['image']);
    $('#img_tag').attr("src","../image/"+date_obj['image']);
    //각각의 id의 텍스트 부분에 공연정보를 입력해준다. 
}
