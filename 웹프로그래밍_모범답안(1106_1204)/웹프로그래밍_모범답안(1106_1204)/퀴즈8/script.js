var divA = document.getElementById('A');
var divB = document.getElementById('B');
sessionStorage.A = divA.getElementsByTagName('img').length;
sessionStorage.B = divB.getElementsByTagName('img').length;

var start = document.getElementById("start");
start.addEventListener('click', startWorker);
start.addEventListener("click", activate);

var add = document.getElementById('add');
add.addEventListener('click', upload);

var w;

function startWorker(){
  if(typeof(Worker) !== "undefined") {
    if(typeof(w) == "undefined") {
      w = new Worker("workers.js");
    }
    w.onmessage = function(event) {
      document.getElementById("timer").innerHTML = event.data;
      if(event.data == 40){
        w.terminate();
        w = undefined;
        alert("A 장바구니:"+sessionStorage.A+" B 장바구니:"+sessionStorage.B);
        start.disabled = false;
        add.disabled = 'disabled';
      }
    };
  } else {
    document.getElementById("timer").innerHTML = "Sorry, your browser does not support Web Workers...";
  }
}

function activate(){
  document.getElementById("add").disabled = false;
  start.disabled = "disabled";
}

var count = 0;

function upload(){
  var file = document.getElementById('file').value;
  file = file.replace('C:\\fakepath\\', '');
  var img = document.createElement('img');
  img.src = file;
  img.draggable = true;
  img.id = 'img'+count;
  img.addEventListener('dragstart', function(event){
    drag(event);
  });
  count++;
  document.getElementById('waiting').appendChild(img);
}

function drag(e){
  e.dataTransfer.setData("text", e.target.id);
}

function allowDrop(e){
  e.preventDefault();
}

function drop(e){
  e.preventDefault();
  var data = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(data));
  sessionStorage.A = divA.getElementsByTagName('img').length;
  sessionStorage.B = divB.getElementsByTagName('img').length;
}

document.getElementById('A').addEventListener('drop', function(event){
  drop(event);
});
document.getElementById('A').addEventListener('dragover', function(event){
  allowDrop(event);
});
document.getElementById('B').addEventListener('drop', function(event){
  drop(event);
});
document.getElementById('B').addEventListener('dragover', function(event){
  allowDrop(event);
});
