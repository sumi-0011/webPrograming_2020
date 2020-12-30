//이벤트 리스너 등록
$("#join_bt").click(click_joinBt);

document.getElementById("login_bt").addEventListener("click", ClickLogin);
console.log("dd");

//로그인 버튼을 누르면 실행되는 함수
function ClickLogin() {
  console.log("로그인");
  //로그인 form에서 아이디와 비밀번호를 가져와 php에 보내준다.
  //ajax를 이용해 리로드 없이 확인하게 한다.
  //php를 실행해 일치하는 로그인 정보가 있으면 로그인에 성공하였다는 메세지를 띄우고 메인으로 넘어간다.
  //일치하는 로그인정보가 없거나 비밀번호가 다르면 입력한아이디가 존재하지 않는다거나 비밀번호가 틀렸다는 메세지를 띄운후 다시 입력하게 한다.
  //readTextFile메소드를 이용해 인자값에 따른 list를 리턴받아 여부 체크를 한다. 
  var id_list = readTextFile("id").split("\n");
  var pwd_list = readTextFile("pwd").split("\n");
  var id = $("#login_id").val();
  var pwd = $("#login_pwd").val();
  var id_index = id_list.indexOf(id);
  if (id_index < 0) {
    alert("동일한 아이디가 존재하지 않습니다. 다시입력해주세요");
    return;
  }
  if (pwd_list[id_index] == pwd) {
    //로그인에 성공했다는 메세지를 출력하고, 세션스토리지에 현재 로그인된 id값과 name값을 저장한다.
    var name_list = readTextFile("name").split("\n");
    var name = name_list[id_index];
    sessionStorage.setItem("userName", name);
    sessionStorage.setItem("userID", id);
    alert(name + "님 환영합니다.");
    location.href = "../main/main.html";
  } else {
    alert("비밀번호가 틀립니다. 다시입력해주세요.");
  }
}
//파일에서 인자값(ex : id)의 리스트를 꺼내 리턴해주는 메소드
function readTextFile(readData) {
  var result = "";
  $.ajax({
    type: "POST",
    url: "./read_userInfo.php",
    async: false, //비동기를 동기로 바꾸어 return 값을 받을수 있게 한다.
    data: { sendData: readData },
    success: function (data) {
      result = data;
    },
    //에러가 생기면 무슨 error인지 알려준다.
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText);
    },
  });
  return result;
}

// 회원가입 버튼을 누르면 실행되는 함수
function click_joinBt() {
  //회원가입 페이지로 이동
  location.href = "./join.html";
}

// // 아이디 찾기 버튼을 누르면 실행되는 함수
// function click_idBt() {
//     //아이디 찾기페이지로 이동
// }
// // 비밀번호 찾기 버튼을 누르면 실행되는 함수
// function click_pwdBt() {
//     //비밀번호 찾기 페이지로 이동
// }
