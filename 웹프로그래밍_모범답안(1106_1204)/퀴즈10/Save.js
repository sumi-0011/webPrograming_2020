function StudentInfo(name, korean, math, english, society, history) {
    this.name = name,
        this.korean = korean,
        this.math = math,
        this.english = english,
        this.society = society,
        this.history = history
}
StudentInfo.prototype.avg = function (subject) {
    let sum = 0;
    let n;
    n=subject.length;
    for (let i = 0; i < n; i++) {
        var s = subject[i];
        sum += Number(this[s]);
    }
    return sum / n;
}

infoArray = [];
$(document).ready(function () {
    save();

    $("#submit").click(function () {
        clickavg();
    });
});

function save() {
    var tr = document.getElementsByTagName('tr');
    for (let i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName('td');
        infoArray[i - 1] = new StudentInfo(td[0].innerHTML, td[1].innerHTML, td[2].innerHTML, td[3].innerHTML, td[4].innerHTML, td[5].innerHTML);
    }
    $("#table").empty();
}
function clickavg() {
    var student = document.getElementById("student").value;//이름
    var subject = [];
    $('input[name="subject"]:checked').each(function () {//체크박스 선택한 것
        var temp = $(this).val();//선택된 것들 하나씩
        subject.push(temp);
    });
    //과목을 선택하지 않았을때
    if (subject.length == 0) {
        alert("Please select a subject or subjects");
    } else {
        if (student == "") {//학생이름 안넣을때
            let total = 0;
            for (let i = 0; i < infoArray.length; i++) {
                total += infoArray[i].avg(subject);
            }
            total = total / infoArray.length;
            alert("The average of all student's subject grades is " + total.toFixed(1));
        } else {//학생 이름 넣음
            var check = checkName(student);
            if (check == -1) {//존재하지 않는 학생
                alert("The name does not exist");
            } else {
                alert("Student's name is " + student + ", Average is " + (infoArray[check].avg(subject)).toFixed(1));
            }
            //존재하는 학생
        }
    }
    function checkName(student) {
        for (let i = 0; i < infoArray.length; i++) {
            if (infoArray[i].name == student) {
                return i;
            }else{
                continue;
            }
        }
        return -1;
    }
}