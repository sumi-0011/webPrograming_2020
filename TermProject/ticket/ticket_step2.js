let seat_arr; //좌석 배치 행렬
let A_count = 0;
let B_count = 0;
let C_count = 0;
let D_count = 0;
let E_count = 0;
let F_count = 0;
let count;

let R_money;
let S_money;
let selet_person_count = 0;
let selet_person_num = 0;
let seat_id_array = [];
document.getElementById("changePage_pay").addEventListener("click", click_pay);
$("#person_num").change(function (e) {
  selet_person_num = Number(e.target.value);
});
showSeat();

// demo
// selet_person_num = 2;

function ClickSeat(event) {
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
    // console.log("다시 선택2");
    event.target.className = "seat_yes_S";
    selet_person_count--;
    totalSelect("remove", event.target.id);
    return;
  }
  if (selet_person_count == selet_person_num) {
    alert("이미 예약할 좌석을 모두 선택하셨습니다.");
    return;
  }
  //선택할수 있는 좌석을 선택
  else if (event.target.className == "seat_yes_R") {
    event.target.className = "seat_do_R";
    selet_person_count++;
  } else if (event.target.className == "seat_yes_S") {
    event.target.className = "seat_do_S";
    selet_person_count++;
  }
  totalSelect("add", event.target.id);
}
//인원 선택 값이나 좌석선택값을 바꾸면 실행되는 함수
function totalSelect(option, seat_id) {
  //인원선택 text값과 좌석선택값을 받아와
  //인원 1명 좌석 A열 10번 좌석 처럼 화면에 나타내준다.
  if (option == "remove") {
    seat_id_array.splice(seat_id_array.indexOf(seat_id),1);
    // console.log(seat_id_array);
  } else if (option == "add") {
    seat_id_array.push(seat_id);
  }
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
    var r_count = Number($(".seat_do_R").length);
    var s_count = Number($(".seat_do_S").length);
    var result_pay = R_money*r_count+S_money *s_count;
    sessionStorage.setItem('pay_money',result_pay);
    
    // console.log(result_pay);
    location.href = "./ticket_step3.html";
}

//화면이 로드되면 현재 예약 가능한 좌석을 나타내준다.
function showSeat() {
  var temp = sessionStorage.getItem("selected_perform");
  var data = JSON.parse(temp);
  //티켓정보를 가져와 티켓 가격을 저장해준다. 형식은 "R석 10,000원 S석 5,000원"
  var ticket_info = data["ticket"].split(" ");
  var replaced_temp = ticket_info[1].replace(",", "");
  R_money = Number(replaced_temp.replace("원", ""));
  replaced_temp = ticket_info[3].replace(",", "");
  S_money = Number(replaced_temp.replace("원", ""));
  //   console.log(R_money);
  //   console.log(S_money);
  //date를 이용해 좌석행렬을 가져온다.
  var find_date = data["date"];
  AjaxCall_seat(find_date);
  //현재 예약이 불가능한 좌석은 회색으로 표시하고 선택할수 없게 하고
  //예약이 가능한 좌석은 흰색으로 표시하고 좌석을 클릭하면 totalSelect함수를 호출하는 이벤트 리스너를 등록한다.
  //좌석마다 가격이 다를수 있으므로 옆에 등급에 따른 가격을 나타내준다.

  for (var i = 0; i < seat_arr.length; i++) {
    var tr_tag = document.createElement("tr");
    for (var j = 0; j < seat_arr[i].length; j++) {
      var td_tag = document.createElement("td");
      var seatItem = seat_arr[i][j];
      if (seatItem == 0) {
      } else if (seatItem == 1) {
        // count++;
        var alpha = setAlpha(i, j);
        td_tag.setAttribute("id", setAlpha(i, j) + count);
        td_tag.innerHTML = count;
        td_tag.addEventListener("click", ClickSeat); //click시 이벤트 리스너 등록
        //좌석 등급에 따라 다른 클래스를 지정해준다.
        if (alpha == "A" || alpha == "B" || alpha == "C") {
          td_tag.className = "seat_yes_R";
        } else {
          td_tag.className = "seat_yes_S";
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
function getSeatArray(data) {
  var arr1 = data.split("/");
  var array = new Array(arr1.length);
  for (var i = 0; i < array.length; i++) {
    var arr2 = arr1[i].split(",");
    array[i] = new Array(arr2.length);
    for (var j = 0; j < arr2.length; j++) {
      array[i][j] = arr2[j];
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
