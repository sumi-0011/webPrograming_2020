var infoArray = [];
window.onload = function () {
    //table에 있던 값들을 infoArray배열에 저장하는 메소드
  saveInfoArray();
  //제출버튼이 클릭되면 avg메소드를 호출하는 이벤트 리스너를 등록
  document.getElementById("submitBt").addEventListener("click", StudentInfo.prototype.avg);
};
//StudentInfo 객체 생성자를 생성, 데이터들을 객체 인스턴트로 정의
function StudentInfo(name, k, m, e, s, h) {
  this.name = name;
  this.Korean = k;
  this.Math = m;
  this.English = e;
  this.Society = s;
  this.History = h;
}
function saveInfoArray() {
    //table의 데이터들을 DOM을 사용해 childenode로 찾아서 저장
  var table = document.querySelector("#table").childNodes[1];
  for (var i = 1; i < 8; i++) {
    var temp = new StudentInfo(
      table.children[i].children[0].innerText,
      table.children[i].children[1].innerText,
      table.children[i].children[2].innerText,
      table.children[i].children[3].innerText,
      table.children[i].children[4].innerText,
      table.children[i].children[5].innerText
    );
    infoArray.push(temp);
  }
  //정보 저장후 테이블 삭제
  $("#table").detach();
}
StudentInfo.prototype.avg = function () {
  var result;
  //이름이 존재하는지 , 아닌지 확인해서 index에 저장
  var index = findName();
  if (index==infoArray.length) {    //이름을 입력하지 않은 경우
    alert("The average of all students’ subject grades is "+findAllAverage() );
    return;
  }else if(index==-1) { //이름이 존재하지 않는 경우
      alert("The name does not exist");
      return;
  } 
  else {
    //그렇지 않다면 찾는다. 
    result = findAverge(index);
  }
  //과목 check를 하나도 하지 않은 경우
  if (result == 0) {
    alert("Please select a subject or subjects");
  } else {
    alert("Student's name is " + this.name + ", Average is " + result);
  }
};

function findName() {
  var input_name = document.getElementById("student_name").value;
  //입력칸이 공백인 경우
  if (input_name == "") {
      return infoArray.length;
  }
  //입력 값과 동일한 이름이 있으면 그 인덱스를 반환
  for (var i = 0; i < infoArray.length; i++) {
    if (infoArray[i].name == input_name) return i;
  }
  //동일한 이름을 찾을수 없으면 -1을 리턴
  return -1;
}
//동일한 이름이 있어 그 인덱스 값을 매개변수로 받아와 평균을 구함
function findAverge(index) {
  var subjectList = document.getElementsByName("subject");
  var sum = 0;
  var count = 0;
//체크박스가 체크되어 있는 과목에 대해 sum에 과목의 점수를 더하고 과목수를 구해 평균을 구함
  if (subjectList[0].checked) {
    sum += Number(infoArray[index].Korean);
    count++;
  }
  if (subjectList[1].checked) {
    sum += Number(infoArray[index].Math);
    count++;
  }
  if (subjectList[2].checked) {
    sum += Number(infoArray[index].English);
    count++;
  }
  if (subjectList[3].checked) {
    sum += Number(infoArray[index].Society);
    count++;
  }
  if (subjectList[4].checked) {
    sum += Number(infoArray[index].History);
    count++;
  }
  if (count == 0) {
    return 0;
  } else {
    var average = sum / count;
    return average.toFixed(1);
  }
}
//입력을 하지 않아 모든 학생들의 선택한 과목에 대한 평균을 처리하는 함수
function findAllAverage() {
  var subjectList = document.getElementsByName("subject");
  var sum = 0;
  var count = 0;

  for (var index = 0; index < infoArray.length; index++) {
    if (subjectList[0].checked) {
      sum += Number(infoArray[index].Korean);
      count++;
    }
    if (subjectList[1].checked) {
      sum += Number(infoArray[index].Math);
      count++;
    }
    if (subjectList[2].checked) {
      sum += Number(infoArray[index].English);
      count++;
    }
    if (subjectList[3].checked) {
      sum += Number(infoArray[index].Society);
      count++;
    }
    if (subjectList[4].checked) {
      sum += Number(infoArray[index].History);
      count++;
    }
    
  }
  var average = sum / count;
    return average.toFixed(1);
}
