var total_select_num = 0; //예매인원 확인 (좌석 선택에서)
var final_youth =0;
var rest_seat_array = [150,150,150];
rest_seat = rest_seat_array[0];
var select_seat_count = 0;
var total_money = 0;
var count = 0;
var movie_name=10;
var prev_movie=10;
window.onload = function () {
  seat_func(10);
  seat_func(20);
  seat_func(30);
  // value_check();
  document.getElementById("seat_table20").setAttribute('display','none');
  document.getElementById("seat_table30").setAttribute('display','none');
  var ticketingBT = document.getElementById("ticketingBT");
  ticketingBT.addEventListener("click", Click_ticketing);
  var r = document.getElementsByName("radio");
  for(var i=0;i<r.length;i++ ){
    r[i].addEventListener('click',function(e) {
      rest_seat_array[prev_movie/10-1] = rest_seat;
        for(var j=10;j<40;j=j+10) {
          if( e.target.value == j) {
            document.getElementById("seat_table"+(j)).className="";
            movie_name = j;
            prev_movie = j;
            rest_seat = rest_seat_array[movie_name/10-1]
          }
          else {
            document.getElementById("seat_table"+(j)).className="displayNone";
          }
          
        }
        resetSeat();
    });
  }
  var deleteBt = document.getElementById('deleteBt');
  deleteBt.addEventListener('click',delete_seat);
};
function delete_seat() {
  var checkbox = document.getElementsByClassName("chk");
    for(var i=0;i<checkbox.length;i++) {
      if (checkbox[i].checked == true) {
        var num = Number(checkbox[i].parentNode.childNodes[2].innerHTML);
        var tep = (checkbox[i].parentNode.childNodes[3].innerHTML);
        var temp_list = tep.split(" ");

        for(var k=0;k<num;k++) {
          document.getElementById(temp_list[k]).className = "yes_select_seat";

        }
        rest_seat +=num;
        checkbox[i].parentNode.parentNode.removeChild(checkbox[i].parentNode);
      }
    }
}
function movie_check() {
  var check_count = document.getElementsByName("radio").length;
 
  for (var i=0; i<check_count; i++) {
      if (document.getElementsByName("radio")[i].checked == true) {
        movie_name = document.getElementsByName("radio")[i].value;
        return movie_name;
      }
  }
}
function seat_func(movie) {
  var seat_table = document.getElementById("seat_table"+movie);
  var tr = document.createElement("tr");
  tr.appendChild(document.createElement("th"));
  for (var j = 1; j < 11; j++) {
    var th = document.createElement("th");
    th.innerText = j;
    tr.appendChild(th);
  }
  seat_table.appendChild(tr);
  for (var i = 1; i < 11; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 11; j++) {
      var td = document.createElement("td");
      td.setAttribute("id", String.fromCharCode(65 + i - 1) + j);
      if (j == 0) {
        td.innerText = String.fromCharCode(65 + i - 1);
      } else if ((j + i) % 2 != 0) {
        td.innerHTML = "X";
        td.className = "no_select_seat";
        td.addEventListener("click", click_seat_no);
      } else {
        td.addEventListener("click", click_seat);
        td.className = "yes_select_seat";
        rest_seat = rest_seat + 1;
      }
      tr.appendChild(td);
    }
    seat_table.appendChild(tr);
  }
}
function click_seat(e) {
  // console.log(movie_check());
  check_num();
  console.log(rest_seat + " " +total_select_num);

  if (e.target.className == "yes_select_seat2") {
    return;
  }
  console.log(e.target);
  //경우 1
  if (total_select_num == 0) {
    alert("인원을 1명 이상 입렫해 주세요");
    return;
  }
  //경우 4
  if (rest_seat < total_select_num) {
    alert("인원을 다시 입력해주세요");
    return;
  }
  select_seat_count++;
  e.target.className = "do_select_seat";
  e.target.removeEventListener("click",click_seat);
  // console.log(select_seat_count +" "+total_select_num);
  if (select_seat_count == total_select_num) {
    var c1 = document.getElementsByClassName("yes_select_seat");
    while (c1.length != 0) {
      for (var j = 0; j < c1.length; j++) {
        c1[j].className = "yes_select_seat2";
      }
      c1 = document.getElementsByClassName("yes_select_seat");
    }
    var c = document.getElementsByClassName("yes_select_seat2");
    for (var i = 0; i < c.length; i++) {
      c[i].addEventListener("click", select_no);
    }
    final_youth = Number(document.getElementById("youth").value);
    return;
  }
  console.log("성공" + select_seat_count);
}
function click_seat_no() {
  check_num();
  if (total_select_num == 0) {
    alert("인원을 1명 이상 입렫해 주세요");
  } else {
    alert("선택할수 없는 좌석입니다.");
  }
}
function select_no() {
    alert("선택할수 없는 좌석입니다. ");
  
}
function check_num() {
  var adult_num = document.getElementById("adult").value;
  // console.log(adult_num);
  var youth_num = document.getElementById("youth").value;
  total_select_num = Number(adult_num) + Number(youth_num);
}
function Click_ticketing() {
  console.log(total_select_num +"" +select_seat_count );
  if(total_select_num==0) {
    return;
  }
  var temp_seat="";
  if (total_select_num != select_seat_count) {
    alert("좌석을 모두 선택하여 주세요");
    return;
  }
  var c = document.getElementsByClassName("do_select_seat");
  while (c.length != 0) {
    for (var i = 0; i < c.length; i++) {
      temp_seat +=c[i].id+" ";
      c[i].className = "already_select_seat";
    }
    c = document.getElementsByClassName("do_select_seat");
  }
  resetSeat();
  total_money = (total_select_num-final_youth) * 9000 + final_youth*8000;
  console.log(total_money);
  

  var pt = document.getElementById('price_table');
  var tr = document.createElement('tr');
  var input = document.createElement('input');
  input.type = "checkbox";
  input.className = "chk";
  tr.appendChild(document.createElement('td').appendChild(input));
  var name = document.createElement('td');
  name.innerText = getMovie();
  tr.appendChild(name);
  var count = document.createElement('td');
  count.innerText = total_select_num;
  tr.appendChild(count);
  var temp_s = document.createElement('td');
  temp_s.innerText = temp_seat;
  tr.appendChild(temp_s);
  var temp_m = document.createElement('td');
  temp_m.innerText = total_money;
  tr.appendChild(temp_m);


  console.log(tr);
  pt.appendChild(tr);

  total_select_num = 0;
  select_seat_count=0;
  document.getElementById("youth").value=0;
  document.getElementById("adult").value =0;
  
  
}

function resetSeat() {
  var c1 = document.getElementsByClassName("yes_select_seat2");
  while (c1.length != 0) {
    for (var i = 0; i < c1.length; i++) {
      c1[i].removeEventListener("click",select_no);
      c1[i].className = "yes_select_seat";
    }
    c1 = document.getElementsByClassName("yes_select_seat2");
  }
var c = document.getElementsByClassName("do_select_seat");
  while (c.length != 0) {
    for (var i = 0; i < c.length; i++) {
      temp_seat +=c[i].id+" ";
      c[i].className = "yes_select_seat";
    }
    c = document.getElementsByClassName("do_select_seat");
  }
}
function getMovie() {
  if(movie_name ==10 ) {
   return "테넷";
  }
  if(movie_name ==20 ) {
    return "반도";
  }
  if(movie_name ==30 ) {
    return "1917";
  }
}