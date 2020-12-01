let addBT = document.getElementById("addBT");

let modal_window = document.getElementById("modal");
let joinBT = document.getElementById("join");
let logoutBT = document.getElementById("logout");

/***************************할일 등록 *****************************/
let date_saveBt = document.getElementById("date_saveBt"); //할일을 저장하기 위한 버튼
let date_updateBt = document.getElementById("datedate_updateBt_saveBt"); //할 일 내용을 수정하기 위한 버튼
let date_submitBt = document.getElementById("date_submitBt");
let date_deleteBt = document.getElementById("date_deleteBt"); //할 일을 삭제하기 위한 버튼
let date_cancelBt = document.getElementById("date_cancelBt"); //입력을 서버에 전송하지 않고 입력 박스를 사라지게 하는 버튼

window.onload = function () {
  //처음엔 모달창이 안보인다.
  $("#modal").css("display", "none");
  joinBT.addEventListener("click", function () {
    $("#modal").css("display", "block");
  });

  document.querySelector("#signInBt").addEventListener("click", ClickJoin);
  document.querySelector("#loginBT").addEventListener("click", ClickLogin);

  //할일 등록을 위한 요구사항
  // dateMoadal창 display설정
  $("#dateModal").css("display", "none");
  addBT.addEventListener("click", function () {
    $("#dateModal").css("display", "block");
    // add버튼을 누르면 save버튼과 cancel버튼만 활성화됨 나머지는 비활성화
    date_saveBt.disabled = false;
    date_cancelBt.disabled = false;
  });
  date_cancelBt.addEventListener("click", function () {
    //입력을 서버에 전송하지 않고 입력 박스를 사라지게 하는 버튼
    $("#dateModal").css("display", "none");
    $("#dateForm").each(function () {
      this.reset();
    });
  });
  // demo
  document.getElementById("demoBT").addEventListener("click", function () {
    LoginSuccess("minsu99");
  });
};
function LoginSuccess(userID) {
  console.log(userID);
  //세션에 현재 user을 저장
  sessionStorage.setItem("useID", userID);
  // 로그인에 성공하면, 접속한 현재 날짜를 기준으로 1주일 동안 저장된 할 일 리스트를 서버에서 가져와 달력에 보여준다.
  setDate();
  //만약, 저장된 할 일 리스트가 없을 경우에는 "등록된 일정이 없습니다." 라는 문구를 가진 알림창이 나타난다.
  document.getElementById("addBT").disabled = false;

  //add버튼은 비활성화 상태에서 활성화 상태로 변환됨
}
//달력 테이블의 날짜들을 세팅하는 메소드
function setDate() {
  var today = new Date();
  var temp = today.getDate() - today.getDay();
  //이번주의 시작일이 저번달이라면
  var start_week = new Date(today.getFullYear(), today.getMonth(), 0);
  var max_date = start_week.getDate();
  if (temp <= 0) {
    //지금이 12월이면 11월로
    start_week.setDate(start_week.getDate() + temp);
  }
  for (var i = 0; i < 7; i++) {
    var id = "day" + (i + 1);
    if (max_date < start_week.getDate() + i) {
      document.getElementById(id).innerHTML = temp + i;
    } else {
      // console.log(start_week.getDate());
      document.getElementById(id).innerHTML = start_week.getDate() + i;
    }
  }
  // console.log(start_week);
}
// $.ajax({
//     type: "POST",
//     //ajax를 이 url에서 실행하겠다.
//     url: "./getcalendar.php",
//     data: {sendID:userID},
//     success: function (data) {
// console.log(data);
//     },
//     //에러가 생기면 무슨 error인지 알려줌
//     error: function (jqXHR, textStatus, errorThrown) {
//         alert("error");
//         console.log(jqXHR.responseText);
//     }
// });
function ClickLogin() {
  console.log("login click");
  if (!validation()) {
    return false;
  }
  AjaxCallLogin();
}
function AjaxCallLogin() {
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "./cal_login.php",
    data: { sendData: createData() },
    success: function (data) {
      if (data == false) {
        alert("로그인이 실패하였습니다.");
      } else {
        console.log("로그인 성공");
        console.log(data);
        LoginSuccess(data);
      }
      modalDisplayNone();
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
      console.log(jqXHR.responseText);
    },
  });
}
function ClickJoin() {
  console.log("join click");
  //입력 양식에 맞는지 확인, 맞으면 회원가입을 한다.
  if (!validation()) {
    // console.log("kkk");
    return false;
  }
  AjaxCallJoin();
}
function AjaxCallJoin() {
  // console.log("ajax call");
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "./cal_join.php",
    data: { sendData: createData() },
    dataType: "json",
    success: function (data) {
      // console.log(data);
      // alert(data);
      if (data == 0) {
        if (!alert("회원 가입이 완료되었습니다.")) {
          modalDisplayNone();
        }
      } else if (data == 1) {
        if (!alert("이미 아이디가 존재합니다.")) {
          modalDisplayNone();
        }
      }
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("errora");
      console.log(jqXHR.responseText);
    },
  });
}
function createData() {
  var obj = { id: $("#join_id").val(), pwd: $("#join_pwd").val() };
  var sendData = JSON.stringify(obj);
  return sendData;
}
function validation() {
  //입력 양식에 맞는지 확인
  var check_id = document.querySelector("#join_id").value;
  var check_pwd = document.querySelector("#join_pwd").value;
  var idRegExp = /^([A-Za-z0-9]){6,15}/;
  var pwdRegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/;
  if (!(idRegExp.test(check_id) && pwdRegExp.test(check_pwd))) {
    //알림창을 띄우고, 확인을 누르면 입력박스가 사라짐
    if (!alert("아이디 또는 패스워드가 입력 양식에 맞지 않습니다. ")) {
      modalDisplayNone();
    }
    return false;
  }
  return true;
}
function modalDisplayNone() {
  $("#modal").css("display", "none");
  document.querySelector("#join_id").value = "";
  document.querySelector("#join_pwd").value = "";
}
