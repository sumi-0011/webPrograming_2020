window.onload = function() {
    showPerformance();
    demo();
  
}
//공연들을 화면이 로딩되면 화면에 나타내주는 함수
function showPerformance() {
    //현재 진행중인 공연을 파일에서 읽어와 
    //그 공연의 이미지와, 정보를 하나씩 읽어서 화면에 출력해준다.
    //화면에 나타난 공연의 이미지를 클릭하면 imgClick함수가 실행될수 있게 이벤트 리스너를 등록해준다. 
}

//공연이미지를 클릭하면 실행되는 함수
function imgClick(e) {
    //각 공연에 맞는 페이지로 이동
    //추후에 제대로 이동되도록 할것이다. 
    location.href = "performance_info.html";
}

function demo() {
    //데모를 위한 함수 상관 x

      //공연을 클릭하면 그 공연정보를 나타내는 페이지로 이동하는 이벤트 등록
    var target = document.querySelectorAll(".performance");
    console.log(target);
    var tartgetLength = target.length;
    for(var i=0; i < tartgetLength; i++){
        target[i].addEventListener("click",imgClick);
    }
}