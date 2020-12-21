// let manager_performance_add_bt = ;
var per_count = 0;
//window_onload
showPerformance("today");
demo();
/***************************이벤트리스너-start**********************************/
//공연을 클릭하면 그 공연정보를 나타내는 페이지로 이동하는 이벤트 등록
var performance_box = document.querySelectorAll(".performance");
for (var i = 0; i < performance_box.length; i++) {
  performance_box[i].addEventListener("click", imgClick);
}


$('#prev_list').click(function() {
  showPerformance("today");
});
$('#all_list').click(function() {
  showPerformance("all");
});
// ㅡmanager
$('#manager_performance_add').click(function() {
  $("#manager_add_modal").show();
});
$('#cancel_performance_bt').click(function() {
  $("#manager_add_modal").hide();
});
$('#add_performanc_bt').click(manager_add);
/***************************이벤트리스너-end**********************************/
function demo() {
  var ma = Math.random();
  ma = Math.floor(ma*60);
  //데모를 위한 함수 상관 x
  $("#performance_name").val("나빌레라콘서트");
  $("#performance_classification").val("재즈");
  $("#performance_ticket").val("R석 7만원,S석 5만원,A석 3만원");
  // $("#fname").val("aa\\aa\\img1.jpg");
  $("#performance_data_time").val("04:"+ma);
  $("#performance_date").val("2020-12-21");
  $("#performance_time").val(90);
}


//공연들을 화면이 로딩되면 화면에 나타내주는 함수
function showPerformance(date) {
  //원래 있던것을 모두 삭제
  $("#performance_information").empty();
  per_count = 0; 
  //현재 진행중인 공연을 파일에서 읽어와
  //그 공연의 이미지와, 정보를 하나씩 읽어서 화면에 출력해준다.
  //화면에 나타난 공연의 이미지를 클릭하면 imgClick함수가 실행될수 있게 이벤트 리스너를 등록해준다.
  //<div class="performance col-md-3">공연1</div>
  $.ajax({
    type: "POST",
    url: "./performanceAdd.php",
    data: { sendData:date},
    success: function (data) {
      // console.log(data);
      if(data=="false") {
        // alert('공연이 없습니다.');
        return;
      }
      else if(data=="file_false") {
        console.log("파일이 존재하지 않습니다.");
        return;
      }
      // var list = JSON.parse(data);
      var list = data.split("\n");
      for(var i=0;i<list.length;i++) {
        if(list[i] !="") {
          // console.log(list[i]);
          addPerformance(list[i]);

        }
      }
      
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
      console.log(jqXHR.responseText);
    },
  });

 
}
//화면에 공연들의 이미지를 추가해주는 메소드
function addPerformance(data) {
  per_count++;
  var temp = JSON.parse(data);
  // console.log(temp["image"]);
  var div_tag = document.createElement("div");
  $(div_tag).attr("class", "performance col-xs-5 col-md-4");
  div_tag.addEventListener("click", imgClick);
  div_tag.setAttribute('id',"div"+per_count);
  var img_tag = document.createElement('img');
  img_tag.setAttribute("src","../image/"+temp["image"]);
  img_tag.className = "performance_img";
  img_tag.setAttribute('id',"img"+per_count);
  $(div_tag).append(img_tag);
  var span_tag = document.createElement('span');
  span_tag.innerHTML = data;
  $(span_tag).hide();
  span_tag.setAttribute('id',"span"+per_count);
  $(div_tag).append(span_tag);
  $('#performance_information').append(div_tag);
}
//공연이미지를 클릭하면 실행되는 함수
function imgClick(e) {
  //각 공연에 맞는 페이지로 이동
  var data = e.target.parentNode.id;
  var temp ="#span"+data.substring(3,data.length);
  sessionStorage.setItem("now_perform",$(temp).html());
  location.href = "perform_info.html";
}


// manager용
function createData() {
  var date_data = $("#performance_date").val() +" "+ $("#performance_data_time").val();
  var img_prev = $("#fname").val();
  var img_name = img_prev.split('\\');
  var img=img_name[2];
  if(img_name[2] == undefined) {
    img = "";
  }
  // console.log();
  var array = {
    name: $("#performance_name").val(),
    clas: $("#performance_classification").val(),
    date: date_data,
    time: $("#performance_time").val(),
    ticket: $("#performance_ticket").val(),
    image: img,
    // image: "img2.jpg",
    detail: $("#detail").val()
  };
  var sendData = JSON.stringify(array);
  // console.log(sendData);
  return sendData;
}
function manager_add() {
  //같은 공연 날짜에 시간만 안 겹치면 된다. 
  $.ajax({
    type: "POST",
    url: "./performanceAdd.php",
    data: { sendData: createData() ,seat:set_seat(10,25)},
    success: function (data) {
      console.log(data);
      if(data =="false2") {
        alert('동일한 시간에 공연이 이미 있습니다.');
        return;
      }
      else if(data=="false") {
        return;
      }
      else if(data=="file_false") {
        console.log("파일이 존재하지 않습니다.");
        return;
      }
      // var temp = JSON.parse(data);
      // addPerformance(data);
      // addSeat(data);
      showPerformance("today");
      console.log("추가 성공!");
      $("#manager_add_modal").hide();
    },
    //에러가 생기면 무슨 error인지 알려줌
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
      console.log(jqXHR.responseText);
    },
  });
}

// function addSeat(){
//   var str = set_seat(10,25);
// }
function set_seat(row,col) {
  var arr = new Array(row);
  for (var i = 0; i < arr.length; i++) {
    // arr[i] = new Array(40);
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

            arr[i][j] = 1;
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