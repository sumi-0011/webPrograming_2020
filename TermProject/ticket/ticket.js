let per_count = 0;  //화면에 띄워지는 공연의 개수
let selected = "";  //선택한 공연정보저장

// 인원,좌석 선택 화면으로 이동하는 이벤트 리스너 등록
document
  .getElementById("pageChage_seat")
  .addEventListener("click", function () {
    sessionStorage.setItem("selected_perform", selected);   //세션 스토리지에 선택한 공연 정보를 저장한다. 
    location.href = "./ticket_step2.html";                  //다음페이지로 이동
  });
document.getElementById("date_bt").addEventListener("click", AjaxCall);

//화면에 공연 정보를 띄우는 태그를 생성하는 메소드
function addPerformanceDiv(data) {
  //JSON형태의 데이터를 인자로 받아와서 해독을 해준다. 
  var data_array = JSON.parse(data);
  var date = data_array["date"].split(" ");
  //인자로 받아온 공연 데이터가 현재 선택한 날짜에 있는 공연이라면 화면에 추가해준다. 
  if ($("#selectDate").val() == date[0]) {
    // console.log($("#selectDate").val());
    per_count++;                                      //화면에 추가하는 공연의 개수를 늘려주고
    var div_tag = document.createElement("div");      //div태그 생성
    $(div_tag).attr("class", "select_list_class");    
    div_tag.addEventListener("click", divClick);
    div_tag.setAttribute("id", "div" + per_count);
    div_tag.innerHTML = data_array["name"];
    var span_tag = document.createElement("span");    //span에 공연정보 저장
    span_tag.innerHTML = data;
    $(span_tag).hide();
    span_tag.setAttribute("id", "span" + per_count);
    $(div_tag).append(span_tag);
    $("#select_list").append(div_tag);                //list에 div를 추가해주면 화면에 정상적으로 div태그가 추가된것을 볼수있다. 
  }
}
function divClick(event) {
  var select_data = $("#" + event.target.id + " span").html();  //이벤트 객체의 id로 선택한 공연 정보를 저장한ㄷ. 
  var select_obj = JSON.parse(select_data);                     //공연정보는 json형식이기때문에 decode를 해주어야한다. 
  $("#perform_name").text(select_obj["name"]);                  //공연 정보를 화면에 표시
  $("#perform_date").text(select_obj["date"]);  
  selected = select_data;                                       //선택한 공연의 정보를 전역변수에 저장한다. 
} 

//날짜를 선택하고 선택 버튼을 누르면 실행되는 메소드
//날짜에 맞는 공연이름을 화면에 출력하도록 공연 정보를 파일에서 읽어온다. 
function AjaxCall() {
  $("#select_list").empty();
  per_count = 0;
  $.ajax({
    type: "POST",
    url: "../performance/performanceAdd.php",     
    data: { sendData: "all" },
    success: function (data) {
      if (data == "false") {
        console.log("공연이 없습니다.");
        return;
      }
      var list = data.split("\n");
      for (var i = 0; i < list.length; i++) {
        if (list[i] != "") {
          addPerformanceDiv(list[i]);
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
