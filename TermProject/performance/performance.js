var per_count = 0;      //현재 화면에 나타내는 공연의 개수를 나타내는 변수 / 
showPerformance("today");
if(sessionStorage.getItem("userID") == "manager") {
  $("#manager_performance_add").show();
}
/***************************이벤트리스너-start**********************************/
//공연을 클릭하면 그 공연정보를 나타내는 페이지로 이동하는 이벤트 등록
var performance_box = document.querySelectorAll(".performance");
for (var i = 0; i < performance_box.length; i++) {
  performance_box[i].addEventListener("click", imgClick);
}
$('#prev_list').click(function() {  //오늘 공연 버튼을 클릭하면 오늘 하는 공연을 화면에 나타내주는 메소드를 호출
  showPerformance("today");
});
$('#all_list').click(function() {   //전체 공연 버튼을 클릭하면 전체 공연을 화면에 나타내주는 메소드를 호출
  showPerformance("all");
});
// manager용 manager이 접속했을때가 아니면 보이지 않는다.
$('#manager_performance_add').click(function() {  //공연 추가를 할수있는 버튼, 모달창을 보이게 해준다.
  $("#manager_add_modal").show();
});
$('#cancel_performance_bt').click(function() {  //공연 추가 모달창을 숨긴다.
  $("#manager_add_modal").hide();
});
$('#add_performanc_bt').click(manager_add);     //공연 추가 버튼을 누르면 공연정보를 파일에 추가해준다.
/***************************이벤트리스너-end**********************************/

//공연들을 화면이 로딩되면 화면에 나타낼수있도록 공연정보를 파일에서 읽어오는 함수
//인자 data값에 따라 오늘공연인지, 전체공연인지를 결정한다.
function showPerformance(date) {
  //원래 있던것을 모두 삭제한다.
  $("#performance_information").empty();
  per_count = 0; 
  //현재 진행중인 공연을 파일에서 읽어와서 addPerformance로 json을 한줄씩 보내줘 화면에 추가할수있게 해준다.
  //<div class="performance col-md-3">공연1</div>
  $.ajax({
    type: "POST",
    url: "./performanceAdd.php",
    data: { sendData:date},
    success: function (data) {
      if(data=="false") {
        return;
      }
      else if(data=="file_false") {
        console.log("파일이 존재하지 않습니다.");
        return;
      }
      var list = data.split("\n");    //받아온 데이터는 개행을 기준으로 합쳐논 문자열이기 때문에 개행을 기준으로 잘라준다.
      for(var i=0;i<list.length;i++) {
        if(list[i] !="") {
          // addPerformance로 json데이터를 보내준다. 
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
    //그 공연의 이미지와, 정보를 하나씩 읽어서 화면에 출력해준다.
  //화면에 나타난 공연의 이미지를 클릭하면 imgClick함수가 실행될수 있게 이벤트 리스너를 등록해준다.
  per_count++;
  var temp = JSON.parse(data);
  var div_tag = document.createElement("div");                //div태그 생성
  $(div_tag).attr("class", "performance col-xs-5 col-md-4");  //추가할 div 태그의 class를 정해준다. 
  div_tag.addEventListener("click", imgClick);                //div태그에 이벤트 리스너 등록
  div_tag.setAttribute('id',"div"+per_count);                 //div 태그에 id를 설정해준다.
  var img_tag = document.createElement('img');                //img태그 생성
  img_tag.setAttribute("src","../image/"+temp["image"]);      //img의 src속성을 생성해 이미지가 나타나게 해준다.
  img_tag.className = "performance_img";                      //img의 클래스이름 설정
  img_tag.setAttribute('id',"img"+per_count);                 //id 등록
  $(div_tag).append(img_tag);                                 //div태그에 img태그를 append, 추가해준다.
  var span_tag = document.createElement('span');              //data값을 숨겨놓기 위한 span태그 
  span_tag.innerHTML = data;
  $(span_tag).hide();                                         //hide()를 이용해 display:none으로 설정해준다.
  span_tag.setAttribute('id',"span"+per_count);
  $(div_tag).append(span_tag);                                //div태그에 span태그를 추가
  $('#performance_information').append(div_tag);              //화면에 생성한 div태그를 추가
}
//공연이미지를 클릭하면 실행되는 함수
function imgClick(e) {
  //각 공연에 맞는 페이지로 이동
  var data = e.target.parentNode.id;                          //이벤트가 발생한 객체의 id를 저장한다. 
  var temp ="#span"+data.substring(3,data.length);            //id의 뒷부분 숫자부분은 그 객체 안에있는 다른 태그의 아이디와 같다. ex) div1 안에 span1이 들어있다. 
  sessionStorage.setItem("now_perform",$(temp).html());       //temp에 span태그의 id를 얻어오면, 그 span태그의 html()에는 현재 공연 정보가 저장되어있다. 공연정보를 세션에 추가해 다음 페이지에서 읽을수 있게한다.
  location.href = "perform_info.html";                        //그리고 다음페이지로 넘어간다. 
}


// manager용 메소드들
// 매니저 계정으로 접속했을 경우에만 추가할수 있는 버튼이 활성화된다. 

//modal에 입력한 데이터를 json형태로 변환하여 리턴한다. 
function createData() {
  //입력한 데이터를 ajax로 보내 파일에 저장하기 위하여 json형태로 변환해준다. 
  //image의 경우에는 로컬 이미지는 가짜 주소가 리턴 되기 떄문에 이미지 파일 이름으로만 잘라서 저장해준다. 
  var date_data = $("#performance_date").val() +" "+ $("#performance_data_time").val();
  var img_prev = $("#fname").val();
  var img_name = img_prev.split('\\');
  var img=img_name[2];
  if(img_name[2] == undefined) {
    img = "";
  }
  //배열에 저장해서 json으로 변환하여 리턴한다. 
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
  //같은 공연 날짜에 같은 시간이 아닌 데이터만 파일에 추가한다. 
  //동일한 공연이 이미 있으면 동일한 시간에 이미 존재한다는 알림창을 띄운다. 
  //정상적으로 파일에 저장이 되면 showPerformance메소드를 다시 한번 불러와 화면을 초기화해준다.
  $.ajax({
    type: "POST",
    url: "./performanceAdd.php",
    data: { sendData: createData() ,seat:set_seat(10,25)},      //메소드에서 입력값과 초기 좌석 배치 배열을 만들어 ajax로 보내준다. 
    success: function (data) {
      console.log(data);
      if(data =="false2") {
        alert('동일한 시간에 공연이 이미 있습니다.');
        return;
      }
      else if(data=="false") {  //실패한경우
        return;
      }
      else if(data=="file_false") {
        console.log("파일이 존재하지 않습니다.");
        return;
      }
      showPerformance("today");           //추가후, 화면을 초기화 해준다. 
      $("#manager_add_modal").hide();     //추가가 성공하면 모달창을 다시 숨긴다. 
    },
    //에러가 생기면 무슨 error인지 알려준다.
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
      console.log(jqXHR.responseText);
    },
  });
}
//row, col수에 따라 초기 좌석 배치 행렬을 만들어 주는 함수
function set_seat(row,col) {
  //0은 통로나 좌석이 없는곳, 1은 좌석(예매가능)을 나타낸다. 
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
        else if(i+18 <= j) {//가장자리부분
            arr[i][j] = 0;
        }
        else {
            arr[i][j] = 1;
        }
    }
  }
  var a=[];
  for(var i=0;i<row;i++) {
      a.push(arr[i].join(','));     //col의 원소들을 , 을 기준으로 합친다. 
  }
  var str = a.join("/");            //row의 원소들을 /을 기준으로 합쳐서 합친 문자열을 리턴해준다. 
  return str;       
}