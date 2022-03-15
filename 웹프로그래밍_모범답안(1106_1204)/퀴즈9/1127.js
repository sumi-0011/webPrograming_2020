var infoArr;

function StudentInfo(Name, Korean, Math, English, Society, History){
  this.Name = Name;
  this.Math = Math;
  this.Korean = Korean;
  this.English = English;
  this.Society = Society;
  this.History = History;
}


$(document).ready(function(){
  var table = $('.table');
  //console.log(table.children('tbody').children('tr').length);


  var tableArr = table.children('tbody').children('tr');
  //console.log(tableArr);
  /*
  for(var tr in tableArr){
    console.log(tr);
  }
*/
  infoArr = {};

  for(var i = 1; i < tableArr.length; i++){
    var tr = tableArr.eq(i);
    //console.log(tr);

    //console.log(tr.children());
    var td = tr.children('td');
    //console.log(td);
    var name = td.eq(0).text();
    var korean = td.eq(1).text();
    var math = td.eq(2).text();
    var english = td.eq(3).text();
    var society = td.eq(4).text();
    var history = td.eq(5).text();

    infoArr[i] = new StudentInfo(name, korean, math, english, society, history);
  }

  //console.log(infoArr);

  StudentInfo.prototype.avg = function(list){
    var total = 0;


    if(list == null){
      alert("Please select a subject or subjects");
    }
    else{
      for(var i in list){
        var k = list[i];
        //console.log(this[k]);
        total += parseInt(this[k]);
      }
    }

    return total/list.length;
  }

  table.css('display', "none");
})

$(document).ready(function(){

  var list = [];
  var total = 0;
  var btn = $("#submit");
  btn.click(()=>{
    list = [];//과목 초기화
    var name = document.getElementById("name").value;//이름 기입확인
    //console.log(name);
    var subjects = $("input:checkbox");
    //console.log(subjects);
    for(var i = 0; i < subjects.length; i++){
      //console.log(subjects.eq(i).is(":checked"));
      if(subjects.eq(i).is(":checked") == true){
        //console.log(subjects.eq(i).prop("name"));
        list.push(subjects.eq(i).prop('name'));
      }
    }
    if(list.length == 0){
      alert("Please select a subject of subjects");
    }
    else if(name == ""){//이름을 안넣은 경우

      alert("The average of all students' subject grades is + "+totalGrade(total, list).toFixed(1));

    }
    else{//이름을 넣은 경우
      var total = 0;
      for(var info in infoArr){
        if(infoArr[info].Name == name){
          total = infoArr[info].avg(list);
        }
      }

      if(list.length == 0){
        alert("Please select a subject of subjects");
      }
      else if(total == 0){
        alert("The name does not exist");
      }
      else{
        alert("Student's name is "+name+", Average is "+total);
      }

    }


  })

})


function totalGrade(total, list){
  var size = 0;
  var total = 0;
  for(var info in infoArr){
    //console.log(infoArr[info]);
    total += infoArr[info].avg(list);
    size += 1;
  }
  //console.log(total);

  return total/size;
}
