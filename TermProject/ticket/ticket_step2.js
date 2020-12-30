let seat_arr; //좌석 배치 행렬
let A_count = 0;
let B_count = 0;
let C_count = 0;
let D_count = 0;
let E_count = 0;
let F_count = 0;
let count;

let R_money;    //R석 좌석 가격
let S_money;    //S석 좌석 가격
let selet_person_count = 0;  //선택된 인원수
let selet_person_num = 0;   //선택할 인원수
let seat_id_array = [];
// display_User();
//결제 버튼이 눌리면 실행되는 이벤트 
document.getElementById("changePage_pay").addEventListener("click", click_pay);
$("#person_num").change(function (e) {
  selet_person_num = Number(e.target.value);    //입력한 인원수가 바뀔때마다 호출되면서 전역변수값을 바꿔준다. 
});
showSeat();

display_User();
function display_User() {
  console.log(sessionStorage.getItem("userID"));
if(sessionStorage.getItem("userID") != null || sessionStorage.getItem("userID") !="")  {
    $('#user_id').show();
    $('#logoutBt').show();
    $('#join_page').hide();
    $('#login_page').hide();
    $('#user_id').html(sessionStorage.getItem("userID"));
    $('#logoutBt').html("logout");
}
else {
    $('#user_id').hide();
    $('#logoutBt').hide();
    $('#logoutBt').html("");
    $('#join_page').show();
    $('#login_page').show();
}
}
//좌석을 선택할때 호출하는 메소드 인자로는 클릭 이벤트를 가져온다. 
function ClickSeat(event) {
  //예매할 인원을 선택하지 않은 경우에는 알림창을 띄우고 다시 입력하게 한다
  if (selet_person_num == 0) {
    alert("먼저 예매할 인원을 선택해주세요");
    return;
  }
  if (selet_person_count > selet_person_num) {
    alert("인원을 다시 선택해주세요");
    return;
  }
  //선택했던 좌석을 다시 선택하면 선택을 취소한다.
  if (event.target.className == "seat_do_R") {
    // console.log("다시 선택");
    event.target.className = "seat_yes_R";
    selet_person_count--;
    totalSelect("remove", event.target.id);
    return;
  } else if (event.target.className == "seat_do_S") {   
    event.target.className = "seat_yes_S";
    selet_person_count--;
    totalSelect("remove", event.target.id);       //삭제해야하므로 option을 삭제로 메소드를 호출해준다. 
    return;
  }
  if (selet_person_count == selet_person_num) {
    alert("이미 예약할 좌석을 모두 선택하셨습니다.");
    return;
  }
  //선택할수 있는 좌석을 선택했다면 선택했다고 좌석 정보를 바꾸고 선택된 인원수를 하나 늘려준다.
  else if (event.target.className == "seat_yes_R") {
    event.target.className = "seat_do_R";
    selet_person_count++;
  } else if (event.target.className == "seat_yes_S") {
    event.target.className = "seat_do_S";
    selet_person_count++;
  }
  totalSelect("add", event.target.id);        //추가해야하므로 option을 추가로 메소드를 호출해준다. 
}

//인원 선택 값이나 좌석선택값을 바꾸면 실행되는 함수
function totalSelect(option, seat_id) {
  //인원선택 text값과 좌석선택값을 받아와
  //인원 1명 좌석 A열 10번 좌석 처럼 화면에 나타내준다.
  //옵션이 삭제인 경우 인자로 받아온 좌석id값을 선택한 좌석 배열에서 찾아 삭제해준다. 
  if (option == "remove") {
    seat_id_array.splice(seat_id_array.indexOf(seat_id),1);
  }
  //옵션이 추가였으면 배열에 push해준다.  
  else if (option == "add") {
    seat_id_array.push(seat_id);
  }
  //그리고 바뀐 값을 다시 화면에 출력해준다. 
  $("#person_show").html(selet_person_count);
  var str = "";
  for (var i = 0; i < seat_id_array.length; i++) {
    var temp = seat_id_array[i].split("");
    str += temp[0] + "열 " + temp[1] + "번 ";
  }
  $("#seat_show").html(str);
//   console.log(str);
}
//결제선택 버튼을 누르면 실행되는 함수
function click_pay() {
    //현재 선택한 좌석과 인원수를 이용해 결제 금액을 계산하고 세션에 저장하고 페이지를 넘긴다. 
    if(selet_person_num != selet_person_count) {
        //좌석을 모두 선택하지 않은 경우
        alert('좌석을 모두 선택해주세요');
        return;
    }
    var result_bol = confirm("다시 이 페이지로 돌아올수 없습니다. 결제창으로 넘어가시겠습니까?");
    //결제 알림창에서 취소를 누른경우는 아무것도 하지않고 리턴한다. 
    if(!result_bol) {
      return;
    }
    //그렇지 않으면 결제창으로 넘어가기 위해 가격정보와 좌석정보를 계산해 세션스토리지에 저장해준다. 
    var r_count = Number($(".seat_do_R").length);
    var s_count = Number($(".seat_do_S").length);
    //세션스토리지
    sessionStorage.setItem('seat_Info',seat_id_array);
    var r = $(".seat_do_R");
    for(var i=0;i<r.length;i++) {
      r[i].className ="seat_already_R";
    }
    var s = $(".seat_do_S");
    for(var i=0;i<s.length;i++) {
      s[i].className ="seat_already_S";
    }
    var json_temp = JSON.parse(sessionStorage.getItem('selected_perform'));
    // console.log(json_temp);
    // ajax를 불러 변경된 좌석배치값을 파일에 저장해준다.
    $.ajax({
      type: "POST",
      url: "./ticket2.php",
      data: { sendData: set_seat_ticket() , date: json_temp['date']},
      async: false,
      success: function (data) {
          console.log(data);
        if (data == "file_false") {
          console.log("파일이 없습니다.");
          return;
        } else if (data == "false") {
          console.log("공연이 없습니다.");
          return;
        }
        seat_arr = getSeatArray(data);
      },
      //에러가 생기면 무슨 error인지 알려줌
      error: function (jqXHR, textStatus, errorThrown) {
        alert("error");
        console.log(jqXHR.responseText);
      },
    });
    //가격계산 + 세션에 저장
    var result_pay = R_money*r_count+S_money *s_count;
    sessionStorage.setItem('pay_money',result_pay);

    //결제창으로 넘어간다. 
    location.href = "./ticket_step3.html";
}

//화면이 로드되면 현재 예약 가능한 좌석을 나타내준다.
function showSeat() {
  //현재 예약이 불가능한 좌석은 회색으로 표시하고 선택할수 없게 하고
  //예약이 가능한 좌석은 흰색으로 표시하고 좌석을 클릭하면 totalSelect함수를 호출하는 이벤트 리스너를 등록한다.
  //좌석마다 가격이 다를수 있으므로 옆에 등급에 따른 가격을 나타내준다.
  //세션스토리지에서 선택한 공연 정보를 알아와 저장한다. 
  var temp = sessionStorage.getItem("selected_perform");
  var data = JSON.parse(temp);
  //티켓정보를 가져와 티켓 가격을 저장해준다. 원래 형식은 "R석 10,000원 S석 5,000원"
  var ticket_info = data["ticket"].split(" ");
  var replaced_temp = ticket_info[1].replace(",", "");
  R_money = Number(replaced_temp.replace("원", ""));
  replaced_temp = ticket_info[3].replace(",", "");
  S_money = Number(replaced_temp.replace("원", ""));

  //화면에 좌석 가격을 표시해준다. 
  $("#r_money").html(R_money);
  $("#s_money").html(S_money);
  //date를 이용해 좌석행렬을 가져온다.
  var find_date = data["date"];
  AjaxCall_seat(find_date);   //seat정보를 저장한 파일을 가져오는 ajax를 호출하여 좌석 배열을 가져온다. 
  //가져온 좌석 행렬을 이용해 화면에 좌석배치도를 표시한다. 
  //이미 예약된 좌석은 회색, R석은 베이지, S석은 ..?색으로 설정한다. 
  for (var i = 0; i < seat_arr.length; i++) {
    var tr_tag = document.createElement("tr");
    for (var j = 0; j < seat_arr[i].length; j++) {
      var td_tag = document.createElement("td");
      var seatItem = seat_arr[i][j];
      if (seatItem == 0) {
      } else if (seatItem == 1) {
        // count++;
        var alpha = setAlpha(i, j);                 //좌석 인덱스에 맞는 열을 알아온다. 
        td_tag.setAttribute("id",alpha + count);    //id설정
        td_tag.innerHTML = count;
        td_tag.addEventListener("click", ClickSeat); //click시 이벤트 리스너 등록
        //좌석 등급에 따라 다른 클래스를 지정해준다.
        if (alpha == "A" || alpha == "B" || alpha == "C") {   //어떤 좌석이냐에 따라 좌석 등급이 달라지므로, 클래스를 다르게 준다. 
          td_tag.className = "seat_yes_R";
        } else {
          td_tag.className = "seat_yes_S";
        }
      }
      else if(seatItem==2) {
        //이미 선택된 좌석
        var alpha = setAlpha(i, j);
        td_tag.setAttribute("id",alpha + count);
        td_tag.innerHTML = count;
        td_tag.addEventListener("click", function() {
          alert("선택할수 없는 좌석입니다.");
        }); 
        //click시 이벤트 리스너 등록
        //좌석 등급에 따라 다른 클래스를 지정해준다.
        if (alpha == "A" || alpha == "B" || alpha == "C") {
          td_tag.className = "seat_already_R";
        } else {
          td_tag.className = "seat_already_S";
        }
      }

      $(tr_tag).append(td_tag);
    }
    //tr태그를 table에 추가
    $("#seat_table").append(tr_tag);
  }
}

//menu 로드 함수
$(document).ready(function () {
  $("header").load("../menu/header.html");
  $("nav").load("../menu/nav.html");
  // $("aside").load("./menu/aside_ticket.html");
  $("footer").load("../menu/footer.html");
});
//좌석 정보를 파일에서 읽어오는 함수, 인자로는 공연 일자+시간이 들어간다. 
//공연 일자+시간이 같은 공연은 있을수 없기떄문
function AjaxCall_seat(date) {
  $.ajax({
    type: "POST",
    url: "./read_seatInfo.php",
    data: { sendData: date },
    async: false,
    success: function (data) {
      //   console.log(data);
      if (data == "file_false") {
        console.log("파일이 없습니다.");
        return;
      } else if (data == "false") {
        console.log("공연이 없습니다.");
        return;
      }
      //반환값으로 getSeatArray를 호출해 좌석정보를 배열에 저장한 리턴값을 seat_arr에 저장한다. 
      seat_arr = getSeatArray(data);
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
      console.log(jqXHR.responseText);
    },
  });
}
// AjaxCall();
//문자열로 되어있는 좌석 정보를 쪼개 배열로 만들어 준다. 
function getSeatArray(data) {
  var arr1 = data.split("/");
  var array = new Array(arr1.length);     //row배열 생성
  for (var i = 0; i < array.length; i++) {
    var arr2 = arr1[i].split(",");
    array[i] = new Array(arr2.length);    //col배열 생성
    for (var j = 0; j < arr2.length; j++) {
      array[i][j] = arr2[j];              //파일에서 읽어온 값으로 초기화
    }
  }
  return array;
  console.log(array);
}
//좌석에 맞는 열을 반환해주는 메소드
function setAlpha(i, j) {
  if (i < 4 && j < 9) {
    A_count++;
    count = A_count;
    return "A";
  } else if (i < 4 && j < 15) {
    B_count++;
    count = B_count;
    return "B";
  } else if (i < 4 && j < 25) {
    C_count++;
    count = C_count;
    return "C";
  } else if (j < 9) {
    D_count++;
    count = D_count;
    return "D";
  } else if (j < 15) {
    E_count++;
    count = E_count;
    return "E";
  } else if (j < 25) {
    F_count++;
    count = F_count;
    return "F";
  } else {
    console.log(i + " " + j);
    console.log("error");
  }
}
//공연 좌석 현황에 따른 좌석을 표시해주는 함수
function set_seat_ticket() {
  //원래 있던값 초기화 , 다시 세면서 늘려주기 때문
  var row = 10;
  var col = 25;
  A_count = 0;
  B_count = 0;
  C_count = 0;
  D_count = 0;
  E_count = 0;
  F_count = 0;
  count=0;
  //새로운 배열 생성
  var arr = new Array(row);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(col);
    for(var j=0;j<col;j++) {
        if(i==4 || i==9 ||j==9|| j==15) {  //통로 = 0
            arr[i][j] = 0;
        }
        else if(i+j <=6) {  //가장자리부분
            arr[i][j] = 0;
        }
        else if(i+18 <= j) {
            arr[i][j] = 0;
        }
        else {
            var temp = setAlpha(i, j)+count;
            var classname = document.getElementById(temp).className;
            // console.log(classname);
            //이미 예약한 좌석이면 2로 설정
            if(classname =="seat_already_R" || classname =="seat_already_S") {
              arr[i][j] = 2;
            }
            //그렇지 않으면 선택 가능한 좌석이기 때문에 1로 설정
            else {
              arr[i][j] = 1;
            }
        }
    }
  }
  var a=[];
  for(var i=0;i<row;i++) {
      a.push(arr[i].join(','));
  }
  var str = a.join("/");
  return str;
}