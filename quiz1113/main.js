

var count=0;

var w = undefined;
var stop = 40;
function startWorker() {
    // 사용자의 브라우저가 지원하는지 검사
    if (typeof (Worker) !== "undefined") {
        // 앱웨커 객체 만들기
        if (typeof (w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        // 웹워커로부터 메세지를 수신하기 위해 이벤트 리스너 추가
        w.onmessage = function (event) {
            document.getElementById("result").innerHTML = event.data;
            if(event.data==stop) {
                stopWorker();
                var a = sessionStorage.getItem("A_div");
                var b = sessionStorage.getItem("B_div");
                if(!alert("A 장바구니 :"+a+" B 장바구니 :"+b)) {
                    $("#startBt").attr("disabled", false);
                    $("#imageAdd").attr("disabled", true);
               
                }
            }
        };
       
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
    
}
function stopWorker() {
    console.log("stop");
    w.terminate();
    w = undefined;
}

window.onload = function(){
    document.getElementById('startBt').addEventListener("click", startWorker);
    document.getElementById('startBt').addEventListener("click", blurBt);
    document.getElementById('imageAdd').addEventListener("click", readInputFile);
    
    document.getElementById('A_box').addEventListener('drop',drop);
    document.getElementById('A_box').addEventListener('dragover',allowDrop);
    document.getElementById('B_box').addEventListener('drop',drop);
    document.getElementById('B_box').addEventListener('dragover',allowDrop);
    // $("#imageAdd").on('click', function(){
    //     readInputFile();
    // });
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(ev.target);
    ev.target.appendChild(document.getElementById(data));
    session_change();
  }

function blurBt() {
    $("#startBt").prop("disabled", true);
    $("#imageAdd").prop("disabled", false);
}

function readInputFile() {
    console.log("adasd");
    var input = document.getElementById('file');
    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var $img = $('<img></img>');
            $img.attr('src',e.target.result);
            $img.attr('width','250px');
            $img.attr('draggable',"true");
            $img.attr('id',"img_c"+count++);
            $('#img_box').append($img);
            document.getElementById('img_c'+(count-1)).setAttribute("ondragstart", "drag(event)");
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function session_change() {
    var temp=$("#A_box img").length;
    sessionStorage.setItem("A_div",temp);
    console.log("A:"+temp);
    temp= $("#B_box img").length;
    sessionStorage.setItem("B_div",temp);
    console.log("B:"+temp);
}
