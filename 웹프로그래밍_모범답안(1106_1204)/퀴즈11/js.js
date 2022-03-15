ButtonStart = document.getElementById('Try');
canvas = document.getElementById('canvas');

ButtonStart.addEventListener("click",StartVideo);

function StartVideo() {
  var context = canvas.getContext("2d");
  var video = document.getElementById('video');

  context.lineWidth = 3;
  context.beginPath();
  context.arc(82,50,40,0,Math.PI*2,true);
  context.moveTo(75,40);
  context.arc(65,40,10,0,Math.PI,true);
  context.moveTo(107,40);
  context.arc(97,40,10,0,Math.PI,true);
  context.moveTo(62,70);
  context.lineTo(102,70);
  context.strokeStyle = "red";
  context.stroke();

  context.font = "italic bold 40px  Georgia, serif";
  context.fillStyle ="blue";
  context.fillText("Merry christmas!!",150,60);

  context.shadowColor = "rgba(0,0,0,0.5)";
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;

  video.play();
  myFunction(context, video);
}

function myFunction(context, video) {
  setInterval(function(){ context.drawImage(video,50,120,700,500);},20);
}
