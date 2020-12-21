let join_submit = document.getElementById("join_submit");
let check_Join = [false, false, false]; //id, pwd, email

window.onload = function () {
  document.getElementById("check_id").addEventListener("click", function () {
    readTextFile("id");
  });
  document.getElementById("check_email").addEventListener("click", function () {
    readTextFile("email");
  });
  join_submit.addEventListener("click", click_submit);

  /****************demo****** */
};
//제출 버튼을 누르면 실행되는 함수
function click_submit() {
  //모든 중복확인과 비밀번호 체크가 끝났는지 확인하고
  //모두 끝냈다면 AjaxCall을 불러 회원가입을 하고
  //그렇지 않다면 중복체크를 해달라는 알림창을 띄운다.
  CheckPwd();   //비밀번호가 동일한지 체크
  console.log(check_Join);
  if (!check_Join[0]) {
      alert("아이디 중복확인을 해주세요");
      return;
    }
    if (!check_Join[1]) {
        alert("비밀번호가 일치하지않습니다. 다시 입력해주세요");
        return;
    }
    if (!check_Join[2]) {
        alert("이메일 중복확인을 해주세요");
        return;
    }
    if(!$("input:checkbox[id='check_terms1']").is(":checked")) {
      alert("이용약관 동의를 해주세요");
      return;
    }
    if(!$("input:checkbox[id='check_terms2']").is(":checked")) {
      alert("개인정보 수집 및 이용 동의를 해주세요");
      return;
    }
    AjaxCallJoin();
}
//아이디 중복확인을 하는 함수
function CheckId(data) {
  //회원가입 정보가 들어있는 파일을 돌면서 중복되는 아이디가 있는지 확인후-> readTextFile("id")사용
  //아이디가 중복되지 않는다면 가능한 아이디라고 알림창을 띄우고
  //그렇지 않다면 다시 중복확인하게 한다.
  var id_array = data.split("\n");
  var find_id = $("#join_id").val();
  var existence = id_array.includes(find_id);   //존재하지 않으면 false
  if(existence) {
      alert("동일한 아이디가 존재합니다. 다시 입력해주세요");
      return;
  }
  check_Join[0] = !existence;
//   return existence; 
}
//이메일 중복확인을 하는 함수
function CheckEmail(data) {
  //회원가입 정보가 들어있는 파일을 돌면서 중복되는 이메일이 있는지 확인후-> readTextFile("email")사용
  //이메일이 중복되지 않는다면 가능한 이메일이라고 알림창을 띄우고
  //그렇지 않다면 다시 중복확인하게 한다.
  var email_array = data.split("\n");
  var find_email = $("#join_email").val();
  check_Join[2] = !email_array.includes(find_email);    //존재하지 않으면 false
  if(!check_Join[2]) {
    alert("동일한 이메일이 존재합니다. 다시 입력해주세요");
    return;
  }
//   return check_Join[2]; 
}
//비밀번호 일치 확인을 하는 함수
function CheckPwd() {
  //입력한 두 비밀번호가 동일한지 확인하고
  //일치하면 success를 반환하고, 틀리면 다시 입력하게 한다.
  var pwd1 = $("#join_pwd1").val();
  var pwd2 = $("#join_pwd2").val();
  if (pwd1 == pwd2) {
    check_Join[1] = true;
  }
}
//form에 있는 정보를 가지고 ajax로 보내주기 위해 json 형태로 변환시킨다.
function createData() {
  var obj = {
    id: $("#join_id").val()
    pwd: $("#join_pwd2").val(),
    name: $("#join_name").val(),
    phone: $("#join_number").val(),
    email: $("#join_email").val(),
  };
  var sendData = JSON.stringify(obj);
  console.log(sendData);
  return sendData; //만들어진 json 형식의 문자열을 ajax로 보내준다.
}
function AjaxCallJoin() {
  //ajax를 이용해 회원가입 php로 이동하지 않고 회원가입한다.
  //회원가입을 성공하면 알림창을 띄우고 회원가입 완료 페이지로 이동한다.
  $.ajax({
    type: "POST",
    url: "./join.php",
    data: { sendData: createData() },
    success: function (data) {
    //console.log(data);
      console.log("join 성공!");
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
      console.log(jqXHR.responseText);
    },
  });
}
//로컬 파일을 읽어오는 함수 -> 리턴값은 파일 내용
//인자로 받아온 값의 목록을 파일에서 찾아 리턴받는다. ex) "id", "email" 중복검사에 사용
function readTextFile(readData) {
  $.ajax({
    type: "POST",
    //ajax를 이 cal_login.php에서 실행하겠다.
    url: "./read_userInfo.php",
    data: { sendData: readData },
    success: function (data) {
      if (readData == "id") {
        CheckId(data);
      } else if (readData == "email") {
        // Che
        // console.log("이메일 체크");
        CheckEmail(data);
      }
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      // alert("error");
      console.log(jqXHR.responseText);
    },
  });
}
