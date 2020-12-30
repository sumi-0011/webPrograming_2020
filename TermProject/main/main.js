let per_count = 0;
ajax_perfomance();

//화면에 이미지 추가
function ajax_perfomance() {
    $.ajax({
        type: "POST",
        url: "./show_main.php",
        data: { sendData: "today" },
        success: function (data) {
            // console.log(data);
            if (data == "false") {
                // alert('공연이 없습니다.');
                return;
            }
            else if (data == "file_false") {
                console.log("파일이 존재하지 않습니다.");
                return;
            }
            var list = data.split("\n");
            for (var i = 0; i < list.length; i++) {
                if (list[i] != "") {
                  //화면에 공연들의 이미지를 추가해주는 메소드
                    addPerformance(list[i]);  
                }
            }
        },
        //무슨 error인지 출력한다. 
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error");
            console.log(jqXHR.responseText);
        },
    });
}
//화면에 공연들의 이미지를 추가해주는 메소드
function addPerformance(data) {
  //공연 이미지를 저장할 div와 img태그를 생성하고 속성을 세팅
    per_count++;
    var temp = JSON.parse(data);
    var div_tag = document.createElement("div");
    $(div_tag).attr("class", ".center");
    div_tag.setAttribute('id', "div" + per_count);
    var img_tag = document.createElement('img');
    img_tag.setAttribute("src", "../image/" + temp["image"]);
    var span_tag = document.createElement('span');
    $(div_tag).append(img_tag);
    console.log("<div>" + $(div_tag).html() + "</div>");
    //sclick_div에 div태그를 추가해준다. 
    $('#slick_div').slick('slickAdd', "<div>" + $(div_tag).html() + "</div>");
}

//참고함
$('#slick_div').slick({
    slide: 'div',	    	//슬라이드 되어야 할 태그 ex) div, li 
    infinite: true, 	  //무한 반복 옵션	 
    slidesToShow: 1,		// 한 화면에 보여질 컨텐츠 개수
    slidesToScroll: 1,		//스크롤 한번에 움직일 컨텐츠 개수
    speed: 500,	        // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
    arrows: true, 		  // 옆으로 이동하는 화살표 표시 여부
    dots: true, 	      // 스크롤바 아래 점으로 페이지네이션 여부
    autoplay: true,			// 자동 스크롤 사용 여부
    autoplaySpeed: 10000, 		// 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    pauseOnHover: true,		// 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
    vertical: false,		// 세로 방향 슬라이드 옵션
    nextArrow: $("#next_bt"),		// 다음 화살표 모양 설정
    prevArrow: $("#prev_bt"),		// 이전 화살표 모양 설정
    dotsClass: "slick-dots", 	//아래 나오는 페이지네이션(점) css class 지정
    draggable: true, 	//드래그 가능 여부 
    fade: true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
});
