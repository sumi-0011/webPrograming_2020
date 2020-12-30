var PayWay;         //결제방법 저장
var card_Way;       //신용카드 선택시 카드사 저장
var bank_Way;       //계좌이체 선택시 은행사 저장
let total_money=0;  //총 결제 금액
check_PayWay();
check_card_Option();
check_bank_Option();
showInfo();

document.getElementById("pay_Bt").addEventListener("click", function () {
    var pay_name ="";
    if(PayWay =="pay1") {   //결제방법 : 신용카드선택
        pay_name = "신용카드";
    }
    else if(PayWay =="pay2") {  //결제방법 : 계좌이체선택
        //입금자명을 꼭 입력해야한다. 
        if($("#bank_name").val() == "") {
            alert("입금자명을 입력하여야 합니다. ");
            return;
        }
        pay_name = "계좌이체";
    }
    //확인창을 띄우고, 확인을 누르면 좌석 안내창으로 페이지를 넘긴다. 
    var bol = confirm(pay_name+"으로 결제하시겠습니까?");
    if(bol) {
        // 예매완료 창으로 이동

        sessionStorage.removeItem('pay_money');
        sessionStorage.removeItem('now_perform');
        sessionStorage.removeItem('selected_perform');
        alert("예매완료");
        location.href = "./seat_guide.html";
    }
});
//이벤트리스너 등록
var pay = document.getElementsByName('payWay');
for(var i=0;i<pay.length;i++) {
    pay[i].addEventListener("click",check_PayWay);
}
$("#cards").click(check_card_Option);
$("#bank").click(check_bank_Option);

//총 결제 금액과 선택 결제 방법을 화면에 출력해준다. 
function showInfo() {
    //세션에서 결제 금액을 받아온다
    total_money = sessionStorage.getItem('pay_money');
    if(total_money == null) {
        total_money = 0;
    }
    //html에 정보를 입력
    $("#do_money").html(total_money+"원");
    var temp;
   if(PayWay=="pay1") {
    temp ="신용카드 "+ total_money+"원";
   }
   else if(PayWay =="pay2") {
    temp ="계좌이체 "+ total_money+"원";
   }
   else {
       temp = "결제방법을 선택해주세요.";
   }
    $("#total_way").html(temp);
}

//신용카드를 선택할경우, card_Way에 선택한 카드사를 저장한다. 
function check_card_Option() {
    var op = document.getElementsByClassName('card_option');
    for(var i=0;i<op.length;i++) {
        // console.log(op[i].selected);
        if(op[i].selected) {
            card_Way = op[i].value;
        }
    }
    showInfo();
}
//계좌이체를 선택한 경우, back_Way에 선택한 은행을 저장한다.
function check_bank_Option() {
    var op = document.getElementsByClassName('bank_option');
    for(var i=0;i<op.length;i++) {
        // console.log(op[i].selected);
        if(op[i].selected) {
            bank_Way = op[i].value;
        }
    }
    showInfo();
}
//결제 방법을 체크한다. 신용카드가 선택되면 신용카드 선택 옵션만 뜨고, 계좌이체가 선책되면 계좌이체 선택 옵션만 뜨게 한다. 
function check_PayWay() {
    var pay = document.getElementsByName('payWay');
    for(var i=0;i<pay.length;i++) {
        if(pay[i].checked) {
            PayWay = pay[i].value;
            if(i==0) {
                $("#pay_info_card").css('display',"block");
                $("#pay_info_2").css('display',"none");

            }
            else if(i==1) {
                $("#pay_info_card").css('display',"none");
                $("#pay_info_2").css('display',"block");
            }
        }
        
    }
}
//menu 로드 함수
$(document).ready(function () {
  $("header").load("../menu/header.html");
  $("nav").load("../menu/nav.html");
  // $("aside").load("./menu/aside_ticket.html");
  $("footer").load("../menu/footer.html");
});
// 예약확인을 하기위해 티켓정보를 저장하는 코드를 구현하려 했으나 하지 못했습니다. 
// function setTicket(date) {
//     $.ajax({
//         type: "POST",
//         url: "./ticket3.php",
//         data: { sendData: date },
//         async: false,
//         success: function (data) {
//             console.log(data);
//             if (data == "false") {
//             console.log("실패");
//             return;
//           }

//         },
//         //에러가 생기면 무슨 error인지 알려줌
//         error: function (jqXHR, textStatus, errorThrown) {
//           alert("error");
//           console.log(jqXHR.responseText);
//         },
//       });
// }