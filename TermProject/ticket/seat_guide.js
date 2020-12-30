var seat_arr;
let A_count = 0;
let B_count = 0;
let C_count = 0;
let D_count = 0;
let E_count = 0;
let F_count = 0;
let count=0;
let line_count_1=0;
let line_count_2=0;
let line_count_row=0;
var seat_arr;

$("#move_main").click(function() {
  location.href = "../main/main.html";
})
set_seat(10, 25);
ready_screen();
//원래는 set_seat를 이용해서  
function set_seat(row, col) {
  for (var i = 0; i < row; i++) {
    tr_tag = document.createElement("tr");
    for (var j = 0; j < col; j++) {
      var td_tag = document.createElement("td");
      if(i==4) {
        line_count_row++;
        td_tag.setAttribute("id", "row" + line_count_row);
      }
      else if(j==9) {   //통로 1
        line_count_1++;
        td_tag.setAttribute("id", "1line" + line_count_1);
      }
      else if(j==15) {  //통로2
        line_count_2++;
        td_tag.setAttribute("id", "2line" + line_count_2);
      }
      if (i == 4 || i == 9 || j == 9 || j == 15) {
      } else if (i + j <= 6) {
      } else if (i + 18 <= j) {
      } else {
        var alpha = setAlpha(i, j);
        td_tag.setAttribute("id", alpha + count);
        td_tag.innerHTML = count;
      }
      $(tr_tag).append(td_tag);
    }
    $("#seat_table_guide").append(tr_tag);
  }
}
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
function changeSelect(e) {
  //선택한 이벤트 객체를 가져오고, 그 객체의 배경 색을 코랄로 정해준다. 
  var select_seat =  (e.target.options[e.target.selectedIndex]).innerHTML;
  $("#"+select_seat).css("background-color","coral");

}
//화면이 로딩되면 화면에 좌석을 표시해주는 함수
function ready_screen() {
  $("#seat_select").change(changeSelect);
  //좌석 정보를 세션에서 가지고 온다. 
  var seat_info = sessionStorage.getItem("seat_Info");
  seat_arr = seat_info.split(",");
  
  for(var i=0;i<seat_arr.length;i++) {
    var op_tag = document.createElement("option");
    op_tag.value = seat_arr[i];
    op_tag.innerHTML = seat_arr[i];
    // console.log(op_tag);
    $("#seat_select").append(op_tag);
  }
  // console.log(seat_arr);
}