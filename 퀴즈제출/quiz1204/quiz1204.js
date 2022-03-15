window.onload = function () {
  var try_bt = document.getElementById("try");
  try_bt.addEventListener("click", ClickBt);
};
function ClickBt() {
  //div, canvas태그 생성
  var div = document.getElementById("domain");
  var canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 700;

  var ctx = canvas.getContext("2d"); //얼굴 원 그리기
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.linewidth = 3;
  ctx.arc(82, 50, 40, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath(); //왼쪽눈 그리기
  ctx.arc(65, 40, 10, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(99, 40, 10, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(62, 70);
  ctx.lineTo(102, 70);
  ctx.stroke();

  //글자
  var text = canvas.getContext("2d");
  text.font = "italic bold 40px Georgia,serif";
  text.fillStyle = "blue";
  text.fillText("Merry Christmas!!", 150, 60);

  //비디오
  var video = document.createElement("video");
  video.src = "./video.mp4";
  video.play();

  //비디오 그림자
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  setInterval(function () {
    ctx.drawImage(video, 50, 120, 700, 500);
  }, 20);
  ctx.fillStyle="white";
  ctx.fillRect(50, 120, 700, 500);
  div.append(canvas);
}
