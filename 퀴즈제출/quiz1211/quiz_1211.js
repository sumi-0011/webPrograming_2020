
let applicationBt = document.getElementById('applicationBt');

window.onload = function() {
    applicationBt.addEventListener("click",ClickApplicationBt);
    $("#paris").hover(function() {
        $(this).css("color","green");
        $(this).css("background-color","lightgray");
    });
    $("#seat_orange").css("color","orange");
    $(".color_blue").css("color","blue");

}
function ClickApplicationBt() {
    var c = confirm("이벤트에 참여 하시겠습니까?");
    if(!c ) {
        alert("이벤트 참여를 취소했습니다.");
    }
    else {
        var promptValue = prompt("성함을 입력해주세요.");
     
        if(promptValue == null) {
            alert("이벤트 참여를 취소했습니다.");
        }
        else if(promptValue =="") {
            alert("다시 참여해주세요.");
        }
        else {
              changeApplication(promptValue);
                console.log(promptValue);
        }
    }
}
function changeApplication(promptValue) {
    document.getElementById('checkApplication').innerHTML = promptValue +"님 이벤트에 참가해주셔서 감사합니다. ";
}