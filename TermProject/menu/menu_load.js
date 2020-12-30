//겹치는 header, nav, footer태그를 일일이 쓰지않고 load하여 사용

$("header").load("../menu/header.html");
$("nav").load("../menu/nav.html");
$("footer").load("../menu/footer.html");
display_User();

window.onload = function() {
    console.log("작동");
    display_User();
    $("#logoutBt").click(ClickLogout);
    $("#nav_ticket").click(ClickTicket);
    $("#nav_mypage").click(ClickPage);
    $(".nav_tag").click(function() {
        //nav메뉴를 이용해 페이지를 이동하게 되면 원래 있던 세션값들은 모두 쓸모없어지기 때문에
        //잘못들어가는것을 막기위해 로그인 정보 외에는 모두 삭제해준다. 
        sessionStorage.removeItem('pay_money');
        sessionStorage.removeItem('selected_perform');
        sessionStorage.removeItem('seat_Info');
        sessionStorage.removeItem('now_perform');
    })
}
//로그인이 되어있으면 user의 name을 화면위에 출력한다. 
//로그인이 되어있지 않으면  login, join을 화면 위에 출력한다. 
display_User();
function display_User() {
if(sessionStorage.getItem("userID") != null) {
    $('#user_id').show();
    $('#logoutBt').show();
    $('#join_page').hide();
    $('#login_page').hide();
    $('#user_id').html(sessionStorage.getItem("userID"));
    $('#logoutBt').html("logout");
}
else {
    $('#user_id').hide();
    $('#logoutBt').hide();
    $('#logoutBt').html("");
    $('#join_page').show();
    $('#login_page').show();
}
}
function ClickLogout() {
    
alert("로그아웃되었습니다.");
sessionStorage.clear(); //세션스토리지에 있는 값을 모두 지운다. 
display_User();         //로그아웃 결과를 화면에 적용
location.href="../main/main.html"
}

//로그인이 필요한 메뉴를 들어갈때 로그인이 되어 있지 않은 상태이면 알림창을 띄우고 막는다. 
function ClickTicket() {
    if(sessionStorage.getItem("userID") == null) {
        alert("로그인이 필요합니다.");
        return false;
    }
    else {
        location.href="../ticket/ticketing.html";
    }
}
function ClickPage() {
    if(sessionStorage.getItem("userID") == null) {
        alert("로그인이 필요합니다.");
        return false;
    }
    else {
        location.href="../intro/introduce.html";
    }
}