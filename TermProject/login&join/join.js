
window.onload = function() {
    document.getElementById("check_id").addEventListener("click",CheckId());
}
// function getJsonToUser() {  
    var items = [];
    $.getJSON('../info/userInfo.json' ,function(data){
        console.log(data);
        //데이터 까지는 잘나옴! 여기서부터
        console.log(data['email']);
        
    });

// }
//제출 버튼을 누르면 실행되는 함수
function click_submit(){
    //모든 중복확인과 비밀번호 체크가 끝났는지 확인하고
    //모두 끝냈다면 AjaxCall을 불러 회원가입을 하고
    //그렇지 않다면 중복체크를 해달라는 알림창을 띄운다.
}

//아이디 중복확인을 하는 함수
function CheckId() {
    //회원가입 정보가 들어있는 파일을 돌면서 중복되는 아이디가 있는지 확인후
    //아이디가 중복되지 않는다면 가능한 아이디라고 알림창을 띄우고
    //그렇지 않다면 다시 중복확인하게 한다.
}
//이메일 중복확인을 하는 함수
function CheckId() {
    //회원가입 정보가 들어있는 파일을 돌면서 중복되는 이메일이 있는지 확인후
    //이메일이 중복되지 않는다면 가능한 이메일이라고 알림창을 띄우고
    //그렇지 않다면 다시 중복확인하게 한다. 
}
//비밀번호 일치 확인을 하는 함수 
function CheckPwd() {
    //입력한 두 비밀번호가 동일한지 확인하고 
    //일치하면 success를 반환하고, 틀리면 다시 입력하게 한다. 
}

function AjaxCall() { 
    //ajax를 이용해 회원가입 php로 이동하지 않고 회원가입한다. 
    //회원가입을 성공하면 알림창을 띄우고 회원가입 완료 페이지로 이동한다. 
    $.ajax({ 
        //어느 파일에서 실행할지, 채워야함
        success: function (data) { 
            alert("회원가입되었습니다.");
        }, 
        //에러가 생기면 무슨 error인지 알려줌
        error: function (jqXHR, textStatus, errorThrown) { 
            alert("error");
            console.log(jqXHR.responseText); 
        } 
    });
}