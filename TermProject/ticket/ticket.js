let per_count = 0;
let selected = "";
// 인원,좌석 선택 화면으로 이동
document
  .getElementById("pageChage_seat")
  .addEventListener("click", function () {
    console.log(selected);
    sessionStorage.setItem("selected_perform", selected);
    location.href = "./ticket_step2.html";
  });
document.getElementById("date_bt").addEventListener("click", AjaxCall);

function addPerformanceDiv(data) {
  var data_array = JSON.parse(data);
  var date = data_array["date"].split(" ");
  if ($("#selectDate").val() == date[0]) {
    console.log($("#selectDate").val());
    per_count++;
    var div_tag = document.createElement("div");
    $(div_tag).attr("class", "select_list_class");
    div_tag.addEventListener("click", divClick);
    div_tag.setAttribute("id", "div" + per_count);
    div_tag.innerHTML = data_array["name"];
    var span_tag = document.createElement("span");
    span_tag.innerHTML = data;
    $(span_tag).hide();
    span_tag.setAttribute("id", "span" + per_count);
    $(div_tag).append(span_tag);
    $("#select_list").append(div_tag);
  }
}
function divClick(event) {
  // console.log(event.target.id);
  var select_data = $("#" + event.target.id + " span").html();
  // console.log(select_data);
  var select_obj = JSON.parse(select_data);
  $("#perform_name").text(select_obj["name"]);
  $("#perform_date").text(select_obj["date"]);
  selected = select_data;
}
function AjaxCall() {
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
          //   addPerformance(list[i]);
          // console.log(list[i]);
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
