let addBT = document.getElementById("addBT");
let modal_window = document.getElementById("modal");
let joinBT = document.getElementById("join");
let logoutBT = document.getElementById("logout");
/***************************************날짜*********************************************/
let today = new Date();
let minDate = "";
let maxDate = "";
/************************************할일 등록******************************************/
let date_saveBt = document.getElementById("date_saveBt"); //할일을 저장하기 위한 버튼
let date_updateBt = document.getElementById("date_updateBt"); //할 일 내용을 수정하기 위한 버튼
let date_submitBt = document.getElementById("date_submitBt");
let date_deleteBt = document.getElementById("date_deleteBt"); //할 일을 삭제하기 위한 버튼
let date_cancelBt = document.getElementById("date_cancelBt"); //입력을 서버에 전송하지 않고 입력 박스를 사라지게 하는 버튼
let div_count = 0;
let div_nowClick = "";

window.onload = function () {
  //처음 로딩시에는 모달창을 안보이게 설정
  $("#modal").css("display", "none");
  joinBT.addEventListener("click", function () {
    //join버튼을 누르면 modal창을 보이게한다.
    $("#modal").css("display", "block");
  });
  today = new Date();
  today = today.format("yyyy-MM-dd"); //현재 날짜를 2020-xx-xx형식으로 저장해둠
  logoutBT.addEventListener("click", ClickLogout); //eventListener등록
  document.querySelector("#signInBt").addEventListener("click", ClickJoin);
  document.querySelector("#loginBT").addEventListener("click", ClickLogin);

  /*****************할일 등록********************/
  $("#dateModal").css("display", "none"); // dateMoadal창을 안보이게 display설정
  //add버튼 클릭시
  addBT.addEventListener("click", function () {
    //min, max를 다시 설정
    document.getElementById("input_date").setAttribute("max", maxDate); //input:date의 선택일을 정해준다.
    document.getElementById("input_date").setAttribute("min", minDate);
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
  date_cancelBt.addEventListener("click", resetDateModal);
  date_updateBt.addEventListener("click", ClickUpdate); //update버튼을 클릭
  date_submitBt.addEventListener("click", function (e) {
    //submit버튼 클릭
    ClickSubmit(e.target);
  });
  date_deleteBt.addEventListener("click", ClickDelete); //Delete버튼 클릭
};
/*************************************************** */

/**************************************회원가입****************************************/
//회원가입, 로그인 json데이터 들어주는 함수 : 로그인 회원가입에서 사용
function createData() {
  var obj = { id: $("#join_id").val(), pwd: $("#join_pwd").val() };
  var sendData = JSON.stringify(obj);
  return sendData; //만들어진 json 형식의 문자열을 ajax로 보내준다.
}
//입력 양식에 맞는지 확인하는 함수 : 회원가입, 로그인에서 사용한다
function validation() {
  var check_id = document.querySelector("#join_id").value;
  var check_pwd = document.querySelector("#join_pwd").value;

  //패턴을 이용해 패턴에 일치하지 않으면 알립창을 띄운다.
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
//id, pwd를 입력하는 moda창을 안보이게 하고 초기화하는 함수
function modalDisplayNone() {
  $("#modal").css("display", "none"); //modal창을 안보이게
  document.querySelector("#join_id").value = ""; //modal 창안의 text를 초기화해준다.
  document.querySelector("#join_pwd").value = "";
}
function ClickJoin() {
  //입력 양식에 맞는지 확인, 맞으면 회원가입을 한다.
  if (!validation()) {
    return false;
  }
  //ajax로 php를 이용해 회원가입을 하는 함수를 호출한다.
  AjaxCallJoin();
}
//ajax를 이용해 파일에 json으로 회원가입 정보를 입력하는 함수
function AjaxCallJoin() {
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "./cal_join.php",
    data: { sendData: createData() },
    dataType: "json",
    success: function (data) {
      //리턴된 data의 값이 0이면 회원가입이 성공적으로 일어나, 알림창을 띄우고 modal창을 초기화시켜준다.
      if (data == 0) {
        if (!alert("회원 가입이 완료되었습니다.")) {
          modalDisplayNone();
        }
      }
      //리턴값이 1이면 이미 아이디가 존재하는 경우이다.
      else if (data == 1) {
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

/*************************************로그인********************************************/
function ClickLogin() {
  if (!validation()) {
    //입력양식에 맞는지 확인후
    return false;
  }
  AjaxCallLogin(); //로그인 ajax를 호출
}

function AjaxCallLogin() {
  $.ajax({
    type: "POST",
    //ajax를 이 cal_login.php에서 실행하겠다.
    url: "./cal_login.php",
    data: { sendData: createData() },
    success: function (data) {
      //php에서 보내온 값이 false면 로그인이 실패한것
      if (data != "false") {
        LoginSuccess(data); //로그인 성공시 일어나는 일들을 호출하는 함수 호출, data는 접속한 user정보를 담고있음
      } else {
        //그렇지 않으면 로그인이 성공한것이다.
        alert("로그인이 실패하였습니다.");
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
//로그인에 성공했을시 로그인된 사용자의 id를 가지고 호출되는 함수
function LoginSuccess(userID) {
  // ClickLogout();

  sessionStorage.setItem("userID", userID); //세션에 현재 user을 저장
  $("#user").html(userID);
  // 로그인에 성공하면, 접속한 현재 날짜를 기준으로 1주일 동안 저장된 할 일 리스트를 서버에서 가져와 달력에 보여준다.
  setting_Date(today); //달력 테이블 현재 날짜 세팅
  showAllCanlender(); //달력에 등록되어있는 할일들을 파일에서 읽어와 세팅

  //add버튼은 비활성화 상태에서 활성화 상태로 변환됨
  document.getElementById("addBT").disabled = false;
}
//logout버튼 클릭
function ClickLogout() {
  //초기의 웹페이지로 돌리기
  alert('로그아웃이 되었습니다.');
  today = new Date();
  sessionStorage.clear();
  $("table span").empty();
  $("#data td").empty();
  $("#user").empty();
  document.getElementById("addBT").disabled = true;
}
/***************************할일등록*********************************/
//할일 json데이터 를 만들어주는 함수
function createTodo() {
  var obj = {
    date: $("#input_date").val(),
    time: $("#input_time").val(),
    title: $("#input_title").val(),
    description: $("#input_description").val(),
  };
  var sendData = JSON.stringify(obj);
  return sendData;
}

function setting_Date(t) {
  //입력 달력에서 날짜를 입력하기 위해 클릭하면 현재의 웹페이지 달력에 표시된 날짜만 선택할수 있음
  var now = new Date(t); //now를 현재 설정된 날짜로 변경 기본은 현재 날짜
  var nowDayOfWeek = now.getDay();
  var nowDay = now.getDate();
  var nowMonth = now.getMonth();
  var nowYear = now.getYear();
  nowYear += nowYear < 2000 ? 1900 : 0;
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); //달력이 시작하는 일로 새로은 Date객체 생성
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)); //달력이 끝나는 일로 새로운 Date객체 생성

  //format을 세팅하고, min,max에 적용
  var min = weekStartDate.format("yyyy-MM-dd");
  var max = weekEndDate.format("yyyy-MM-dd");
  document.getElementById("input_date").setAttribute("max", max); //input:date의 선택일을 정해준다.
  document.getElementById("input_date").setAttribute("min", min);
  minDate = min; //지역변수에 저장해둔다.
  maxDate = max;
  //달력에 날짜를 세팅해준다.
  $("#year").html(weekStartDate.getFullYear());
  if (weekStartDate.getMonth() == weekEndDate.getMonth()) {
    // document.getElementById(id).innerHTML = resultDay.getDate();
    $("#month").html(weekStartDate.getMonth() + 1);
  } else {
    $("#month").html(
      weekStartDate.getMonth() + 1 + "," + (weekEndDate.getMonth() + 1)
    );
  }
  var resultDay = new Date(t);
  for (var i = 0; i < 7; i++) {
    var id = "day" + (i + 1);
    resultDay.setDate(now.getDate() + (i - now.getDay()));
    document.getElementById(id).innerHTML = resultDay.getDate();
  }
}
//로그인 성공시 또는 달력이 바뀌었을때 호출되 달력에 해당하는 모든 할일을 추가해주는 함수
function showAllCanlender() {
  //접속한 현재 날짜를 기준으로 1주일 동안 저장된 할 일 리스트를 서버에서 가져와 달력에 보여준다.
  //만약, 저장된 할 일 리스트가 없을 경우에는 "등록된 일정이 없습니다." 라는 문구를 가진 알림창이 나타난다.
  var min = minDate;
  var max = maxDate;
  var userId_in = sessionStorage.getItem("userID");
  $.ajax({
    type: "POST",
    url: "get_todo.php", //ajax를 이 url에서 실행하겠다.
    data: {
      userId: userId_in, //현재 접속한 user의 id
      start_date: min, //현재 달력이 시작하는 날짜
      end_date: max, //현재 달력이 끝나는 날짜
    },
    success: function (data) {
      //data는 json형태로 전달된다. 현재 달력에 표시되어야하는 모든 할일들을 "\n"을 기준으로 합쳐져서 가져온다.
      var arr = data.split("\n"); //\n을 기준으로 합쳐져있기때문에 나눠서 arr이라는 배열에 저장한다.
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
          AddTodo(arr[i]); //있으면 그 할일 정도를 가지고 달력에 할일을 추가해준다.
        } else {
          //arr가 비어있으면 등록된 일정이 없으므로 알림창을 띄우고 break;
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
          AddTodo(data); //가져온 할일 데이터로 div태그를 만들어 달력에 표시해준다
          //modal창을 안보이게 만들고 modal form을 리셋
          resetDateModal();
        }
      } else {  //date의 값이 false면 시간이 중복되는 할일이므로 아무것도 하지 않는다.
        // console.log("중복");
        resetDateModal();
      }
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("errora");
      console.log(jqXHR.responseText);
    },
  });
}
//파일에 등록한 할일 정보를 가지고 달력에 표시해준다.
//인자로 추가할 할일 정보가 저장된 json형태의 문자열을 가지고온다.
function AddTodo(data) {
  div_count++; //div태그의 구분을 위한 count변수
  var obj = JSON.parse(data); //obj에 json을 decode해서 저장한다
  var t = new Date(obj.date); //obj의 날짜를 가지고 새로운 Date객체를 생성한다.
  //만약 obj의 날짜가 지금 달력에 해당하지 않으면 달력을 바꿔주고 할일을 추가해준다.
  if (t < new Date(minDate) || new Date(obj.date) > new Date(maxDate)) {
    today = t.format("yyyy-MM-dd");
    //수정한 날짜가 있는 주 단위의 달력으로 바뀌어야 한다.
    setting_Date(t.format("yyyy-MM-dd"));
    //원래 있던 태그들을 다 삭제하고 서버에 있는 데이터 파일에 따라 다시 show
    $(".todo").remove();
    showAllCanlender();
    return;
  }
  //obj의 날짜가 현재 달력에 표시가 가능하면 여기를 실행한다.
  var box = document.createElement("div");
  //title text를 생성해서 div태그 안에 append
  var text = document.createElement("span");
  text.innerText = obj.title;
  text.setAttribute("class", "todoText");
  box.setAttribute("class", "todo"); //박스 css적용
  box.setAttribute("id", "todo" + div_count);
  var jsontext = document.createElement("span"); //data를 span태그 안에 집어넣어 저장해주면서 안보이게 만든다.
  jsontext.innerText = data;
  jsontext.setAttribute("class", "hidden");
  //box의 자식으로추가해준다.
  box.appendChild(text);
  box.appendChild(jsontext);
  var idIndex = new Date(obj.date).getDay();
  document.getElementById("data" + (idIndex + 1)).appendChild(box);
  //박스가 클릭되면 실행되는 이벤트를 등록해준다.
  box.addEventListener(
    "click",
    function (e) {
      //클릭하면 그 할일의 내용을 나타내는 json을 가지고 함수를 호출
      //만약 span태그이면 이벤트를 div태그로 전달하여 실행하여야한다.
      var target = $(e.target);
      var temp;
      if (target.is("span")) {
        temp = e.currentTarget;
      } else {
        temp = e.target;
      }
      getTodo_CallAjax(temp); //getTodo_CallAjax함수에 클릭한 객체 정보를 매개변수로 호출한다.
      div_nowClick = $(temp).attr("id"); //현재 클릭한 div태그가 무엇인지 저장해둔다.
    },
    true
  );
}
//달력에 나타난 할일을 클릭하면 입력박스에 채워넣을 할일 내용을 알기위해 json파일을 읽어 찾아온다. 그리고 modal에 추가하여 띄운다.
function getTodo_CallAjax(target) {
  var data_json = target.childNodes[1].innerHTML;
  showModal(data_json);
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

  //입력 박스 내용입력을 하지 못하게 만들고, 할일 내용을 set해놓는다.
  // console.log(obj);
  document.getElementById("input_date").value = obj["date"];
  document.getElementById("input_time").value = obj["time"];
  document.getElementById("input_title").value = obj["title"];
  document.getElementById("input_description").value = obj["description"];
}
//수정 modal창에서 update버튼을 누르면 실행되는 함수
function ClickUpdate() {
  //수정하기전 데이터를 가져와 sessionStorage에 저장해둔다.
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

  //달력에 min,max attribute를 삭제한다. 나중에 add버튼을 누를때 다시 추가해줘야한다.
  $("#input_date").removeAttr("min");
  $("#input_date").removeAttr("max");
}
function ClickSubmit(prev_target) {
  //수정한 데이터를 서버에 제출하기 위한 버튼
  //세션에서 수정하기 전 데이터를 받아온다.
  var change_prev = sessionStorage.getItem("change_prev");
  AjaxCallSubmit(change_prev); //AjaxCallSubmit를 수정하기 전 데이터로 호출해 데이터를 변경할수 있게 한다
  //달력이 수정되어야한다.
  //따라서 수정되어서 사라져야하는 그 전 할일은 지워주고 todoAdd메소드에서 다시 추가
  resetDateModal();
  $("#" + div_nowClick).remove();
}
function AjaxCallSubmit(change_prev) {
  var userId_in = sessionStorage.getItem("userID"); //세션스토리지에서 userId를 받아와서 사용
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "calendar_submit.php",
    data: {
      todoData_submit: createTodo(),  //수정된 할일 정보
      userId: userId_in,  
      change_prev: change_prev,      //이전 할일 정보
    },
    success: function (data) {
      AddTodo(data);                 //수정된 할일을 달력에 표시해준다. 
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("errora");
      console.log(jqXHR.responseText);
    },
  });
}
//DateModal의 modal창을 안보이게 만들고 안의 내용을 초기화 한다.
function resetDateModal() {
  $("#dateModal").css("display", "none");
  $("#dateForm").each(function () {
    this.reset();
  });
}
function ClickDelete() {
  //서버에 있는 데이터 파일 삭제
  AjaxCallDelete();
  //삭제되었습니다. 문구를 가진 알림창이 나타나고
  //확인 버튼을 클릭하면 회면에서 선택한 할 일 목록이 사라짐
  if (!alert("삭제되었습니다. ")) {
    resetDateModal();
    $("#" + div_nowClick).remove();
  }
}
//삭제할 할일과 현재 접속한 사용자 정보를 ajax에 넘겨서 파일에서 할일을 삭제하는 함수
function AjaxCallDelete() {
  var userId_in = sessionStorage.getItem("userID");
  $.ajax({
    type: "POST",
    //ajax를 이 url에서 실행하겠다.
    url: "./calender_delete.php",
    data: { todoData: createTodo(), userId: userId_in },
    success: function (data) {
      // console.log(data);
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("errora");
      console.log(jqXHR.responseText);
    },
  });
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
