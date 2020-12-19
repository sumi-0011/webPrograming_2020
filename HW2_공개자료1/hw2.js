var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1; //0~11이므로 1 더함
var day = d.getDay(); //요일 0~6 (일~토)
var date = d.getDate(); //~일

var startdate = new Date(year, d.getMonth(), date - day);
var enddate = new Date(year, d.getMonth(), date + (6 - day));

function strdate(date) { //날짜를 문자열로반환 ( - - )형태로
    var newmonth = date.getMonth() + 1;
    var newdate = date.getDate();
    if (newmonth < 10) {
        newmonth = "0" + newmonth;
    }
    return (date.getFullYear() + "-" + newmonth + "-" + newdate);
}

var min_date = strdate(startdate);
var max_date = strdate(enddate);
$("#date").attr("min", min_date);
$("#date").attr("max", max_date);

$("#join").click(function () {
    $("#join_div").css("visibility", "visible");
});

$("#signin").click(function () {
    signin();
});

function signin() {
    var id = $("#id").val();
    var pw = $("#password").val();
    var idchecker = /^([A-Za-z0-9]){6,15}$/;
    var pwchecker = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (idchecker.test(id) && pwchecker.test(pw)) {
        $.post("signin.php",
            {
                id: id,
                pw: pw
            },
            function (data, status) {
                alert(data);
                $("#id").val("");
                $("#password").val("");
                $("#join_div").css("visibility", "hidden");
            });
    } else {
        alert("아이디 또는 패스워드가 입력 양식에 맞지 않습니다.");
        $("#id").val("");
        $("#password").val("");
        $("#join_div").css("visibility", "hidden");
    }
}

$("#login").click(function () {
    login();
});

function login() {
    var id = $("#id").val();
    var pw = $("#password").val();

    $.post("login.php",
        {
            id: id,
            pw: pw
        },
        function (data, status) {
            if (data == 1) { //로그인 성공
                $("#login_id").html(id);
                $("#add").attr("disabled", false); //add버튼 활성화
                load_calender(id); //로그인 성공하면 달력 불러옴
            } else { //로그인 실패
                alert("로그인에 실패했습니다.");
                $("#id").val("");
                $("#password").val("");
            }
        });
    $("#join_div").css("visibility", "hidden");
}

function load_calender(id) {
    var type = 0; //조회함을 알리는타입으로 0

    $("#year").html(year);
    $("#month").html(month);

    var datearr = document.getElementsByClassName("date");

    for (var i = 0; i < 7; i++) { //일요일부터 월요일까지의 날짜 표시
        var newdate = new Date(year, d.getMonth(), date + (i - day));
        datearr[i].innerHTML = newdate.getDate();
    }

    $.post("calender.php",
        {
            id: id,
            year: year,
            month: month,
            min_date: min_date,
            max_date: max_date,
            type: type
        },
        function (data, status) {
            if (data == 0) {
                alert("등록된 일정이 없습니다.");
            } else { //해당 주에 일정이 있을경우
                var arr = JSON.parse(data);
                var todolist = document.getElementsByClassName("todolist");
                for (var i = 0; i < todolist.length; i++) { //초기화
                    while (todolist[i].hasChildNodes()) {
                        todolist[i].removeChild(todolist[i].firstChild);
                    }
                }
                for (var i = 0; i < arr.length; i++) { //달력에 표시
                    var div = document.createElement("div");
                    var txt = document.createTextNode(arr[i].title);
                    div.appendChild(txt);
                    div.className = "todo";
                    todolist[new Date(arr[i].date).getDay()].appendChild(div);
                }
                $(".todo").click(function () { //클릭시 add_div에 정보 표시하도록함
                    var title = $(this).text();
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].title == title) {
                            $("#date").val(arr[i].date);
                            $("#date").attr("disabled", true);
                            $("#time").val(arr[i].time);
                            $("#time").attr("disabled", true);
                            $("#title").val(title);
                            $("#title").attr("disabled", true);
                            $("#description").val(arr[i].description);
                            $("#description").attr("disabled", true);
                            $("#save").attr("disabled", true);
                            $("#update").attr("disabled", false); //update버튼 활성화
                            $("#submit").attr("disabled", true);
                            $("#delete").attr("disabled", false); //delete버튼 활성화
                            $("#cancel").attr("disabled", false); //cancel버튼 활성화
                            break;
                        }
                    }
                    $("#add_div").css("visibility", "visible");
                });
            }
        });
}

$("#add").click(function () {
    $("#date").val("");
    $("#date").attr("min", min_date);
    $("#date").attr("max", max_date);
    $("#time").val("");
    $("#title").val("");
    $("#description").val("");
    $("#date").attr("disabled", false);
    $("#time").attr("disabled", false);
    $("#title").attr("disabled", false);
    $("#description").attr("disabled", false);
    $("#save").attr("disabled", false); //save버튼 활성화
    $("#update").attr("disabled", true);
    $("#submit").attr("disabled", true);
    $("#delete").attr("disabled", true);
    $("#cancel").attr("disabled", false); //cancel버튼 활성화
    $("#add_div").css("visibility", "visible");
});

$("#save").click(function () {
    save();
    $("#add_div").css("visibility", "hidden");
});

function save() {
    var id = $("#id").val();
    var input_date = $("#date").val();
    var input_time = $("#time").val();
    var title = $("#title").val();
    var description = $("#description").val();
    var type = 1; //추가이므로 타입 1

    $.post("calender.php",
        {
            id: id,
            year: year,
            month: month,
            type: type,
            date: input_date,
            time: input_time,
            title: title,
            description: description
        },
        function (data, status) {
            if (data == 1) { //추가완료
                alert("저장되었습니다.");
                load_calender(id); //달력 갱신
            } else {
                alert("날짜와 시간이 중복되면 안됩니다.");
            }
        });
}

$past_date = null;
$past_time = null;
$past_title = null;
$past_description = null;

$("#update").click(function () {
    //수정하기 전의 기존 값들
    past_date = $("#date").val();
    past_time = $("#time").val();
    past_title = $("#title").val();
    past_description = $("#description").val();

    $("#date").attr("disabled", false);
    $("#time").attr("disabled", false);
    $("#title").attr("disabled", false);
    $("#description").attr("disabled", false);
    $("#date").removeAttr("min");
    $("#date").removeAttr("max");

    //submit, cancel버튼만 활성화
    $("#save").attr("disabled", true);
    $("#update").attr("disabled", true);
    $("#submit").attr("disabled", false);
    $("#delete").attr("disabled", true);
    $("#cancel").attr("disabled", false);
});

$("#submit").click(function () { //submit버튼이 눌리면
    update(past_date, past_time, past_title, past_description);
    $("#add_div").css("visibility", "hidden");
});

function update(past_date, past_time, past_title, past_description) {
    var ischanged = false;

    var input_date = $("#date").val();
    var input_time = $("#time").val();
    var title = $("#title").val();
    var description = $("#description").val();

    var forupdate = true; //수정을 위한삭제를 알리기위함

    if (input_date != past_date) {
        ischanged = true;
    }
    if (input_time != past_time) {
        ischanged = true;
    }
    if (title != past_title) {
        ischanged = true;
    }
    if (description != past_description) {
        ischanged = true;
    }

    if (ischanged) { //바뀐부분이 있다면 수정실행
        del(past_date, past_time, past_title, past_description, forupdate); //이전데이터 제거
    }
}

function del(date, time, title, description, forupdate) {
    var id = $("#id").val();
    var type = 2; //삭제이므로 타입 2
    $.post("calender.php",
        {
            id: id,
            year: year,
            month: month,
            type: type,
            date: date,
            time: time,
            title: title,
            description: description
        },
        function (data, status) {
            if (data == 2) { //삭제완료
                if (forupdate) { //수정용도이면실행
                    update_calender();//수정후 업데이트
                } else { //수정이아닌 삭제용도이면 실행
                    alert("삭제되었습니다.");
                    load_calender(id); //달력 갱신
                }
            }
        });
}

function update_calender() { //수정후 달력갱신
    var id = $("#id").val();
    var input_date = $("#date").val();
    var input_time = $("#time").val();
    var title = $("#title").val();
    var description = $("#description").val();
    var type = 3; //수정후 업데이트이므로 타입 3

    var newdate = new Date(input_date);
    var newstartdate = new Date(newdate.getFullYear(), newdate.getMonth(), newdate.getDate() - newdate.getDay());
    var newenddate = new Date(newdate.getFullYear(), newdate.getMonth(), newdate.getDate() + (6 - newdate.getDay()));

    var new_min_date = strdate(newstartdate);
    var new_max_date = strdate(newenddate);

    var datearr = document.getElementsByClassName("date");

    for (var i = 0; i < 7; i++) { //일요일부터 월요일까지의 날짜 표시
        var tempdate = new Date(newdate.getFullYear(), newdate.getMonth(), newdate.getDate() + (i - newdate.getDay()));
        datearr[i].innerHTML = tempdate.getDate();
    }

    $("#year").html(year);
    if (newstartdate.getDate() > newenddate.getDate()) { //서로 다른 달의 날짜를 표시할때
        var temp = newstartdate.getMonth() + 1;
        temp = temp + "," + (newenddate.getMonth() + 1);
        $("#month").html(temp);
    } else {
        var temp = newdate.getMonth() + 1;
        $("#month").html(temp);
    }

    $.post("calender.php",
        {
            id: id,
            year: year,
            month: month,
            type: type,
            date: input_date,
            time: input_time,
            title: title,
            description: description,
            min_date: new_min_date,
            max_date: new_max_date,
            past_date: past_date,
            past_time: past_time,
            past_title: past_title,
            past_description: past_description
        },
        function (data, status) {
            if (data == -1) {
                alert("날짜와 시간이 중복되면 안됩니다.");
            } else {
                var arr = JSON.parse(data);
                var todolist = document.getElementsByClassName("todolist");
                for (var i = 0; i < todolist.length; i++) { //초기화
                    while (todolist[i].hasChildNodes()) {
                        todolist[i].removeChild(todolist[i].firstChild);
                    }
                }
                for (var i = 0; i < arr.length; i++) { //달력에 표시
                    var div = document.createElement("div");
                    var txt = document.createTextNode(arr[i].title);
                    div.appendChild(txt);
                    div.className = "todo";
                    todolist[new Date(arr[i].date).getDay()].appendChild(div);
                }
                $(".todo").click(function () { //클릭시 add_div에 정보 표시하도록함
                    var title = $(this).text();
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].title == title) {
                            $("#date").val(arr[i].date);
                            $("#date").attr("disabled", true);
                            $("#time").val(arr[i].time);
                            $("#time").attr("disabled", true);
                            $("#title").val(title);
                            $("#title").attr("disabled", true);
                            $("#description").val(arr[i].description);
                            $("#description").attr("disabled", true);
                            $("#save").attr("disabled", true);
                            $("#update").attr("disabled", false); //update버튼 활성화
                            $("#submit").attr("disabled", true);
                            $("#delete").attr("disabled", false); //delete버튼 활성화
                            $("#cancel").attr("disabled", false); //cancel버튼 활성화
                            break;
                        }
                    }
                    $("#add_div").css("visibility", "visible");
                });
            }

        });
}

$("#delete").click(function () {
    var input_date = $("#date").val();
    var input_time = $("#time").val();
    var title = $("#title").val();
    var description = $("#description").val();
    del(input_date, input_time, title, description, false); //수정이아닌 삭제이므로 false
    $("#add_div").css("visibility", "hidden");
});

$("#cancel").click(function () { //초기화
    $("#date").val("");
    $("#date").attr("min", min_date);
    $("#date").attr("max", max_date);
    $("#time").val("");
    $("#title").val("");
    $("#description").val("");
    $("#save").attr("disabled", false); //save버튼 활성화
    $("#update").attr("disabled", true);
    $("#submit").attr("disabled", true);
    $("#delete").attr("disabled", true);
    $("#cancel").attr("disabled", false); //cancel버튼 활성화
    $("#add_div").css("visibility", "hidden");
});

$("#logout").click(function () {
    alert("로그아웃이 되었습니다.");
    $("#login_id").html("");
    $("#add").attr("disabled", true); //add버튼 비활성화
    $("#year").html("");
    $("#month").html("");
    var datearr = document.getElementsByClassName("date");
    for (var i = 0; i < 7; i++) { //날짜 초기화
        datearr[i].innerHTML = "";
    }
    var todolist = document.getElementsByClassName("todolist");
    for (var i = 0; i < todolist.length; i++) { //할일 목록 초기화
        while (todolist[i].hasChildNodes()) {
            todolist[i].removeChild(todolist[i].firstChild);
        }
    }
});