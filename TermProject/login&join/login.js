window.onload = function () {
//   demo();

  //이벤트 리스너 등록
  $("#join_bt").click(click_joinBt);

}
//로그인 버튼을 누르면 실행되는 함수
function Login_AjaxCall() {
    //로그인 form에서 아이디와 비밀번호를 가져와 php에 보내준다. 
    //ajax를 이용해 리로드 없이 확인하게 한다. 
    //php를 실행해 일치하는 로그인 정보가 있으면 로그인에 성공하였다는 메세지를 띄우고 메인으로 넘어간다. 
    //일치하는 로그인정보가 없거나 비밀번호가 다르면 입력한아이디가 존재하지 않는다거나 비밀번호가 틀렸다는 메세지를 띄운후 다시 입력하게 한다. 
}
// 회원가입 버튼을 누르면 실행되는 함수
function click_joinBt() {
    //회원가입 페이지로 이동
    location.href = 'join.html'; 
}
// 아이디 찾기 버튼을 누르면 실행되는 함수
function click_idBt() {
    //아이디 찾기페이지로 이동
}
// 비밀번호 찾기 버튼을 누르면 실행되는 함수
function click_pwdBt() {
    //비밀번호 찾기 페이지로 이동
}


//데모를 위한 함수
function demo() {
    
}