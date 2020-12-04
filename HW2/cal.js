let addBT = document.getElementById("addBT");
let modal_window = document.getElementById("modal");
let joinBT = document.getElementById("join");
let logoutBT = document.getElementById("logout");
/*************************날짜******************************** */
let today=new Date();
let minDate ="";
let maxDate ="";
/***************************할일 등록 *****************************/
let date_saveBt = document.getElementById("date_saveBt"); //할일을 저장하기 위한 버튼
let date_updateBt = document.getElementById("date_updateBt"); //할 일 내용을 수정하기 위한 버튼
let date_submitBt = document.getElementById("date_submitBt");
let date_deleteBt = document.getElementById("date_deleteBt"); //할 일을 삭제하기 위한 버튼
let date_cancelBt = document.getElementById("date_cancelBt"); //입력을 서버에 전송하지 않고 입력 박스를 사라지게 하는 버튼
let div_count = 0;
let div_nowClick="";
window.onload = function () {
  //처음엔 모달창이 안보인다.
  // fn_getThisWeek();
  $("#modal").css("display", "none");
  joinBT.addEventListener("click", function () {
    $("#modal").css("display", "block");
  });
  logoutBT.addEventListener("click",ClickLogout);
  today = today.format("yyyy-MM-dd");
  document.querySelector("#signInBt").addEventListener("click", ClickJoin);
  document.querySelector("#loginBT").addEventListener("click", ClickLogin);

  // 할일 등록을 위한 요구사항
  // dateMoadal창 display설정
  $("#dateModal").css("display", "none");
  //add버튼 클릭시
  addBT.addEventListener("click", function () {
    // add버튼을 누르면 save버튼과 cancel버튼만 활성화됨 나머지는 비활성화
    date_cancelBt.disabled = false;
    $("#dateModal").css("display", "block");
    $("#input_date").attr("disabled", false);
    $("#input_time").attr("disabled", false);
    $("#input_title").attr("disabled", false);
    $("#input_description").attr("disabled", false);
    $("#date_saveBt").attr("disabled", false);
    $("#date_updateBt").attr("disabled", true);
    $("#date_submitBt").attr("disabled", true);
    $("#date_deleteBt").attr("disabled", true);
  });
  date_saveBt.addEventListener("click", ClickSave);
  //입력을 서버에 전송하지 않고 입력 박스를 사라지게 하는 버튼
  date_cancelBt.addEventListener("click", resultDateModal);
  //update버튼을 클릭
  date_updateBt.addEventListener("click", ClickUpdate);
  //submit버튼 클릭
  date_submitBt.addEventListener("click", function(e) {
    ClickSubmit(e.target);
  });
  //Delete버튼 클릭
  date_deleteBt.addEventListener("click",ClickDelete);

};

function LoginSuccess(userID) {
  ClickLogout();
  //세션에 현재 user을 저장
  sessionStorage.setItem("userID", userID);
  $("#user").html(userID);
  // 로그인에 성공하면, 접속한 현재 날짜를 기준으로 1주일 동안 저장된 할 일 리스트를 서버에서 가져와 달력에 보여준다.
  setting_Date(today); //달력 테이블 현재 날짜 세팅
  showAllCanlender();
  //만약, 저장된 할 일 리스트가 없을 경우에는 "등록된 일정이 없습니다." 라는 문구를 가진 알림창이 나타난다.
  //add버튼은 비활성화 상태에서 활성화 상태로 변환됨
  document.getElementById("addBT").disabled = false;
}
//logout버튼 클릭
function ClickLogout() {
  //초기의 웹페이지로 돌리기
  today = new Date();
  sessionStorage.clear();
  $("table span").empty();
  $("#data td").empty();
  $("#user").empty();
  document.getElementById("addBT").disabled = true;
  
}
//할일 제목과 설명을 입력한 후 "save"를 누르면 저장함
function ClickSave() {
  //입력창이 모두 채워져 있으면 AjaxCallAdd()메소드를 호출
  if (
    $("#input_date").val() != "" &&
    $("#input_time").val() != "" &&
    $("#input_title").val() != "" &&
    $("#input_description").val() != ""
  ) {
    AjaxCallAdd();
  } else {
    return;
  }
}
//파일에 등록한 할일 정보를 가지고 달력에 표시해준다.
function AddTodo(data) {
  div_count++;
  var obj = JSON.parse(data);
  console.log(obj);
  var t =new Date(obj.date);
  // console.log((new Date(obj.date)) < (new Date(minDate)));
  // console.log((new Date(obj.date)) > (new Date(maxDate)));
  if((t < (new Date(minDate))) || (new Date(obj.date)) > (new Date(maxDate))) {
    console.log(t.format("yyyy-MM-dd"));
    today = t.format("yyyy-MM-dd");
    //수정한 날짜가 있는 주 단위의 달력으로 바뀌어야 한다. 
    setting_Date(t.format("yyyy-MM-dd"));
    //원래 있던 태그들을 다 삭제하고 서버에 있는 데이터 파일에 따라 다시 show
    $(".todo").remove();
    showAllCanlender();
    return;
  }
  var box = document.createElement("div");
  //title text를 생성해서 div태그 안에 append
  var text = document.createElement("span");
  text.innerText = obj.title;
  text.setAttribute("class", "todoText");
  // text.setAttribute('disabled',true);
  // box.innerText = obj.title;
  box.setAttribute("class", "todo"); //박스 css적용
  box.setAttribute('id',"todo"+div_count);
  var jsontext = document.createElement("span");
  jsontext.innerText = data;
  jsontext.setAttribute("class", "hidden");
  box.appendChild(text);
  box.appendChild(jsontext);
  var idIndex = new Date(obj.date).getDay();
  document.getElementById("data" + (idIndex + 1)).appendChild(box);
  
  box.addEventListener(
    "click",
    function (e) {
      //클릭하면 그 할일의 내용을 나타내는 json을 가지고 함수를 호출
      //만약 span태그이면 이벤트를 막아야함
      //이벤트 캡쳐링?
      var target = $(e.target);
      var temp;
      if (target.is("span")) {
        temp = (e.currentTarget);
      } else {
        temp = (e.target);
      }
      getTodo_CallAjax(temp);
      div_nowClick = $(temp).attr('id');
      // sessionStorage.setItem("ClickDiv",$(temp).attr('id'));
      // console.log(div_nowClick);
    },
    true
  );
}
//달력에 나타난 할일을 클릭하면 입력박스에 채워넣을 할일 내용을 알기위해 json파일을 읽어 찾아온다.
function getTodo_CallAjax(target) {
  var data_json = target.childNodes[1].innerHTML;
  showModal(data_json);
}
function showAllCanlender() {
  // var min = sessionStorage.getItem("minDate");
  // var max = sessionStorage.getItem("maxDate");
  var min = minDate;
  var max = maxDate;
  var userId_in = sessionStorage.getItem("userID");
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "get_todo.php",
    data: {
      userId: userId_in,
      start_date: min,
      end_date: max,
    },
    success: function (data) {
      //data는 json형태로 전달된다. 
      var arr = data.split("\n");
      // console.log(arr);
      for(var i=0;i<arr.length;i++) {
        // console.log(arr[i]);
        if(arr[i]!="") {
          AddTodo(arr[i]);
        }
        else {
          alert("등록된 일정이 없습니다. ");
          break;
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
//달력에 표시된 box를 클릭 하면 호출되는 함수
//modal 창을 띄우고 update, delete, cancel버튼이 활성화한다.
function showModal(data) {
  var obj = JSON.parse(data);
  //text박스 비활성화, 다른 버튼들 활성화
  $("#dateModal").css("display", "block");
  $("#input_date").attr("disabled", true);
  $("#input_time").attr("disabled", true);
  $("#input_title").attr("disabled", true);
  $("#input_description").attr("disabled", true);
  $("#date_saveBt").attr("disabled", true);
  $("#date_updateBt").attr("disabled", false);
  $("#date_deleteBt").attr("disabled", false);
  $("#date_cancelBt").attr("disabled", false);

  //입력 박스 내용입력을 하지 못하고, 할일 내용을 set해놓는다.
  // console.log(obj);
  document.getElementById("input_date").value = obj["date"];
  document.getElementById("input_time").value = obj["time"];
  document.getElementById("input_title").value = obj["title"];
  document.getElementById("input_description").value = obj["description"];
}
function ClickLogin() {
  if (!validation()) {
    return false;
  }
  AjaxCallLogin();
}
function ClickJoin() {
  //입력 양식에 맞는지 확인, 맞으면 회원가입을 한다.
  if (!validation()) {
    return false;
  }
  AjaxCallJoin();
}
function ClickUpdate() {
  //수정하기전 데이터를 가져온다.
  var change_prev = createTodo();
  sessionStorage.setItem("change_prev", change_prev);
  // update버튼을 클릭하면 수정 가능하도록 입력 항목들이 활성화된다.
  $("#input_date").attr("disabled", false);
  $("#input_time").attr("disabled", false);
  $("#input_title").attr("disabled", false);
  $("#input_description").attr("disabled", false);
  $("#date_updateBt").attr("disabled", true);
  $("#date_deleteBt").attr("disabled", true);
  $("#date_submitBt").attr("disabled", false);

  //달력에 min,max attribute를 삭제한다. 나중에 add버튼을 누를때 다시 추가해줘야함
  $("#input_date").removeAttr('min');
  $("#input_date").removeAttr('max');
}
function ClickSubmit(prev_target) {
  //수정한 데이터를 서버에 제출하기 위한 버튼
  //세션에서 수정하기 전 데이터를 받아온다.
  var change_prev = sessionStorage.getItem("change_prev");
  AjaxCallSubmit(change_prev) ;
  
  resultDateModal(); 
  //달력이 수정되어야한다.
  //수정되어서 그 전 할일은 지워주고 todoAdd메소드에서 다시 추가
  $("#"+div_nowClick).remove();
}
function ClickDelete() {
  //서버에 있는 데이터 파일 삭제
  AjaxCallDelete();

  //삭제되었습니다. 문구를 가진 알림창이 나타나고
    //확인 버튼을 클릭하면 회면에서 선택한 할 일 목록이 사라짐
    if(!alert("삭제되었습니다. ")) {
      resultDateModal();
      $("#"+div_nowClick).remove();
    }
}
function AjaxCallDelete() {
  var userId_in = sessionStorage.getItem("userID");
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "./calender_delete.php",
    data: { todoData: createTodo(), userId: userId_in },
    success: function (data) {
      console.log(data);
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("errora");
      console.log(jqXHR.responseText);
    },
  });
}
function AjaxCallSubmit(change_prev) {
  var userId_in = sessionStorage.getItem("userID");
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "calendar_submit.php",
    data: {
      todoData_submit: createTodo(),
      userId: userId_in,
      change_prev: change_prev,
    },
    success: function (data) {
      // console.log("submit: "+data);
      AddTodo(data);
      // console.log("submit:")

    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("errora");
      console.log(jqXHR.responseText);
    },
  });
}
function AjaxCallAdd() {
  var userId_in = sessionStorage.getItem("userID");
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "./save_todo.php",
    data: { todoData: createTodo(), userId: userId_in },
    success: function (data) {
      // console.log(data);
      if (data != "false") {
        if (!alert("저장되었습니다. ")) {
          AddTodo(data);
          //modal창을 안보이게 만들고 modal form을 리셋
          resultDateModal();
        }
      } else {
        console.log("중복");
      }
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("errora");
      console.log(jqXHR.responseText);
    },
  });
}

function createTodo() {
  //할일 json데이터 만들기
  var obj = {
    date: $("#input_date").val(),
    time: $("#input_time").val(),
    title: $("#input_title").val(),
    description: $("#input_description").val(),
  };
  var sendData = JSON.stringify(obj);
  return sendData;
}
function createData() {
  //회원가입 json데이터 만들기
  var obj = { id: $("#join_id").val(), pwd: $("#join_pwd").val() };
  var sendData = JSON.stringify(obj);
  return sendData;
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
function AjaxCallJoin() {
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "./cal_join.php",
    data: { sendData: createData() },
    dataType: "json",
    success: function (data) {
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
//Date format함수
Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekKorName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];

  var weekEngName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var d = this;

  return f.replace(
    /(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi,
    function ($1) {
      switch ($1) {
        case "yyyy":
          return d.getFullYear(); // 년 (4자리)

        case "yy":
          return (d.getFullYear() % 1000).zf(2); // 년 (2자리)

        case "MM":
          return (d.getMonth() + 1).zf(2); // 월 (2자리)

        case "dd":
          return d.getDate().zf(2); // 일 (2자리)

        case "KS":
          return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)

        case "KL":
          return weekKorName[d.getDay()]; // 요일 (긴 한글)

        case "ES":
          return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)

        case "EL":
          return weekEngName[d.getDay()]; // 요일 (긴 영어)

        case "HH":
          return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)

        case "hh":
          return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)

        case "mm":
          return d.getMinutes().zf(2); // 분 (2자리)

        case "ss":
          return d.getSeconds().zf(2); // 초 (2자리)

        case "a/p":
          return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분

        default:
          return $1;
      }
    }
  );
};
String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

function resultDateModal() {
  $("#dateModal").css("display", "none");
  $("#dateForm").each(function () {
    this.reset();
  });
}
function setting_Date(today) {
  // var value = [];
 //입력 달력에서 날짜를 입력하기 위해 클릭하면 현재의 웹페이지 달력에 표시된 날짜만 선택할수 있음
  console.log(today); 
 var now = new Date(today);
  var nowDayOfWeek = now.getDay();
  var nowDay = now.getDate();
  var nowMonth = now.getMonth();
  var nowYear = now.getYear();
  nowYear += nowYear < 2000 ? 1900 : 0;
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
 
  //format을 세팅하고, min,max에 적용
  var min = weekStartDate.format("yyyy-MM-dd");
  var max = weekEndDate.format("yyyy-MM-dd");
  document.getElementById("input_date").setAttribute("max", max);
  document.getElementById("input_date").setAttribute("min", min);
  // sessionStorage.setItem("minDate",min);
  // sessionStorage.setItem("maxDate",max);
  minDate = min;
  maxDate = max;
  //달력에 날짜 세팅
  $("#year").html(weekStartDate.getFullYear());
  if(weekStartDate.getMonth() == weekEndDate.getMonth()) {
    // document.getElementById(id).innerHTML = resultDay.getDate();
    $("#month").html(weekStartDate.getMonth()+1);
  }
  else {
    $("#month").html((weekStartDate.getMonth()+1)+","+(weekEndDate.getMonth()+1));
  }
  var resultDay = new Date(today);
  for (var i = 0; i < 7; i++) {
        var id = "day" + (i + 1);
        resultDay.setDate(now.getDate() +(i-now.getDay()));
        document.getElementById(id).innerHTML = resultDay.getDate();
  }
}

