//modal
let modal = document.getElementById("modal");
let productFile = document.getElementById("productFile");
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productNum = document.getElementById("productNum");
let productDeliver = document.getElementsByName("deliverMethod");

let putBtn = document.getElementById("put");
let retractBtn = document.getElementById("retract");

let shoppinBtn = document.getElementById("shoppingImage");

let generalBody = document.getElementById("generalBody");
let dawnBody = document.getElementById("dawnBody");

let allSelect1 = document.getElementById("allSelect1");
let allSelect2 = document.getElementById("allSelect2");
let selectDelete1 = document.getElementById("selectDelete1");
let selectDelete2 = document.getElementById("selectDelete2");
let deliver1 = document.getElementById("deliver1");
let deliver2 = document.getElementById("deliver2");

let chk1 = document.getElementsByClassName("chk1");
let chk2 = document.getElementsByClassName("chk2");
let checkedList1 = new Array();
let checkedList2 = new Array();
let price1 = document.getElementsByClassName("price1");
let price2 = document.getElementsByClassName("price2");
let total1 = document.getElementById("total1");
let total2 = document.getElementById("total2");

window.onload = function(){//총가격 설정 
    total1.appendChild(document.createTextNode("0"));
    total2.appendChild(document.createTextNode("0"));
}

//shopping cart
shoppinBtn.addEventListener("click", function(){
    modal.style.display = "block";
});

//장바구니 담기 창
putBtn.addEventListener("click", function(){//장바구니 담기 버튼
    var check = 1;
    if(!fileCheck() | !nameCheck() | !priceCheck()|!numCheck()|!deliverCheck()) {
        check=0;
    }
    if(check==1){
        if(productDeliver[0].checked){
            generalInsert();
        }else{
            dawnInsert();
        }
    }
    imfoRemove();
});
retractBtn.addEventListener("click",function(){//취소버튼
    modal.style.display = "none";
});
function imfoRemove(){//장바구니 내용 지우기
    productFile.value="";
    productName.value = "";
    productPrice.value = "";
    productNum.value = "";
    productDeliver[0].checked = false;
    productDeliver[1].checked = false;
}

// 장바구니 내용 점검 메소드
function fileCheck(){
    var fileext = productFile.value;
    fileext = fileext.slice(fileext.indexOf(".")+1).toLowerCase();//파일확장자 잘라내고 소문자로 만듦
    if(fileext ==""){
        alert("상품 이미지를 추가하시오.");
        return false;
    }
    if(fileext!="jpg" && fileext!="png" && fileext!="jpeg"){
        //확장자 확인
        alert("이미지 파일이 아닙니다 . ‘jpg’, ‘jpeg’ 또는 'png' 을 확장자로 가진 파일을 추가하시오 .");
        return false;
    }
    return true;
}
function isNumber(x) {//숫자면 true, str포함시 false
    var test=/^[0-9]*$/;
    return test.test(x)
}
function isString(x){
    var str = /^(\s|\d)+$/;
    return str.test(x);
}
function nameCheck(){
    var name = productName.value;
    if(name == ""){
        alert("상품 이름을 입력하시오.");
        return false;
    }
    if(isString(name)){
        alert("문자로된 상품 이름을 입력하시오.");
        return false;
    }
    return true;
}
function priceCheck(){
    var price = productPrice.value;
    if(!isNumber(price)){
        alert("상품 가격에 숫자를 입력하시오.");
        return false;
    }
    if(price<1000){
        alert("상품 가격을 1000원 이상으로 입력하시오.");
        return false;
    }
    return true;
}
function numCheck(){
    var num = productNum.value;
    if(!isNumber(num)){
        alert("상품 개수에 숫자를 입력하시오.");
        return false;
    }
    if(num > 50){
        alert("최대 50개 이하로 선택하시오.");
        return false;
    }
    return true;
}
function deliverCheck(){
    for(var i=0; i<productDeliver.length; i++){
        if(productDeliver[i].checked == true){
            return true;
        }
    }
    alert("배송 방법을 선택하시오.");
    return false;
}

//checkbox
function getChecked(chk){
    let arr = new Array();
    for(let i=0; i<chk.length; i++){
        if(chk[i].checked == true){
            arr.push(i);
        }
    }
    if(chk == chk1){
        checkedList1 = arr;
    }else{
        checkedList2 = arr;
    }
}
window.onclick = function(event){
    if(event.target.className == "chk1"){
        getChecked(chk1);
        selectCheck(allSelect1);
        var text = document.createTextNode(priceSum(checkedList1, price1));
        total1.replaceChild(text, total1.childNodes[0]);
    }
    if(event.target.className == "chk2"){
        getChecked(chk2);
        selectCheck(allSelect2);
        var text = document.createTextNode(priceSum(checkedList2, price2));
        total2.replaceChild(text, total2.childNodes[0]);
    }
}

function selectCheck(allSelect){
    var chk = (allSelect==allSelect1) ? chk1 : chk2 ;
    if(chk.length == 0){
        allSelect.checked = false;
        return;
    }
    for(let i=0; i<chk.length; i++){
        if(chk[i].checked == false){
            allSelect.checked = false;
            return;
        }
    }
    allSelect.checked = true;
}

function generalInsert(){
    let row = generalBody.insertRow(generalBody.rows.length-1);
    row.className += "content1";
    
    let cel1 = row.insertCell(0);
    let cel2 = row.insertCell(1);
    let cel3 = row.insertCell(2);
    let cel4 = row.insertCell(3);
    let cel5 = row.insertCell(4);
    let cel6 = row.insertCell(5);

    let checkbox = document.createElement("input");
    checkbox.className = "chk1";
    checkbox.checked = true;
    checkbox.type = "checkbox";

    var img = document.createElement("img");
    img.className = "img";
    var filepath = productFile.value;
    var filePathSplit = filepath.split('\\');
    img.src = "./" +  filePathSplit[filePathSplit.length-1];

    cel1.appendChild(checkbox);
    cel2.appendChild(img);
    cel3.appendChild(document.createTextNode(productName.value));
    cel4.appendChild(document.createTextNode(productPrice.value));
    cel5.appendChild(document.createTextNode(productNum.value));
    cel6.appendChild(document.createTextNode(productPrice.value*productNum.value));
    cel3.className = "name";
    cel4.className = "price";
    cel6.className = "price1";

    getChecked(chk1);
    selectCheck(allSelect1);
    var text = document.createTextNode(priceSum(checkedList1, price1));
    total1.replaceChild(text,total1.childNodes[0]);
}
function dawnInsert(){
    let row = dawnBody.insertRow(dawnBody.rows.length-1);
    row.className += "content2";
    
    let cel1 = row.insertCell(0);
    let cel2 = row.insertCell(1);
    let cel3 = row.insertCell(2);
    let cel4 = row.insertCell(3);
    let cel5 = row.insertCell(4);
    let cel6 = row.insertCell(5);

    let checkbox = document.createElement("input");
    checkbox.className = "chk2";
    checkbox.checked = true;
    checkbox.type = "checkbox";

    var img = document.createElement("img");
    img.className = "img";
    var filepath = productFile.value;
    var filePathSplit = filepath.split('\\');
    img.src = "./" +  filePathSplit[filePathSplit.length-1];

    cel1.appendChild(checkbox);
    cel2.appendChild(img);
    cel3.appendChild(document.createTextNode(productName.value));
    cel4.appendChild(document.createTextNode(productPrice.value));
    cel5.appendChild(document.createTextNode(productNum.value));
    cel6.appendChild(document.createTextNode(productPrice.value*productNum.value));
    cel3.className = "name";
    cel4.className = "price";
    cel6.className = "price2";
    
    getChecked(chk2);
    selectCheck(allSelect2);
    var text = document.createTextNode(priceSum(checkedList2, price2));
    total2.replaceChild(text,total2.childNodes[0]);
}
function priceSum(checkedList, price){
    var sum=0;
    for(let i=0; i<checkedList.length; i++){
        //checkedList에서 check된 배열 인덱스 가져옴
        // price 클래스의 인덱스의 값 가져옴
        sum += (Number)(price[checkedList[i]].childNodes[0].nodeValue);
    }
    return sum;
}

//전체선택
allSelect1.addEventListener("click", function(){
    allCheck(this);
});
allSelect2.addEventListener("click", function(){
    allCheck(this);
});
function allCheck(allCheck){
    console.log("전체선택");
    var chk = (allCheck==allSelect1) ? chk1 : chk2 ;
    if(allCheck.checked == true){
        for(let i=0; i<chk.length ; i++){
            if(chk[i].checked == false){
                chk[i].checked = true;
            }
        }
    }
    else{
        for(let i=0; i<chk.length; i++){
            if(chk[i].checked == true){
                chk[i].checked = false;
            }
        }
    }
    getChecked(chk);
    if(allCheck == allSelect1){
        var text = document.createTextNode(priceSum(checkedList1, price1));
        total1.replaceChild(text,total1.childNodes[0]);
    }else{
        var text = document.createTextNode(priceSum(checkedList2, price2));
        total2.replaceChild(text,total2.childNodes[0]);
    }

}


//선택 삭제
selectDelete1.addEventListener("click", function(){
    contentRemove(this);
});
selectDelete2.addEventListener("click", function(){
    contentRemove(this);
});

function contentRemove(selectDelete){
    console.log("삭제 시작");
    var checkedList, body;
    if(selectDelete == selectDelete1){
        checkedList = checkedList1;
        body = generalBody;
    }else{
        checkedList = checkedList2;
        body = dawnBody;
    }
    while(checkedList.length !=0){
        body.deleteRow(checkedList.pop());
    }
    if(selectDelete == selectDelete1){
        selectCheck(selectDelete1);
        var text = document.createTextNode(priceSum(checkedList1, price1));
        total1.replaceChild(text,total1.childNodes[0]);
    }else{
        selectCheck(selectDelete2);
        var text = document.createTextNode(priceSum(checkedList2, price2));
        total2.replaceChild(text,total2.childNodes[0]);
    }
}


// 이동
deliver1.addEventListener("click", function(){
    for(let i=0; i< checkedList1.length; i++){
        var copy = generalBody.rows[checkedList1[i]].cloneNode(true);
        copy.className = "content2";
        copy.childNodes[0].childNodes[0].className = "chk2";
        copy.childNodes[5].className = "price2";
        dawnBody.insertBefore(copy, dawnBody.childNodes[dawnBody.rows.length]);
    }
    contentRemove(selectDelete1);
    reSetting();
});
deliver2.addEventListener("click", function(){
    for(let i=0; i< checkedList2.length; i++){
        var copy = dawnBody.rows[checkedList2[i]].cloneNode(true);
        copy.className = "content1";
        copy.childNodes[0].childNodes[0].className = "chk1";
        copy.childNodes[5].className = "price1";
        generalBody.insertBefore(copy, generalBody.childNodes[generalBody.rows.length]);
    }
    contentRemove(selectDelete2);
    reSetting();
});
function reSetting(){//행 이동후 총가격 다시 설정
    getChecked(chk1);
    selectCheck(allSelect1);
    var text = document.createTextNode(priceSum(checkedList1, price1));
    total1.replaceChild(text,total1.childNodes[0]);
    
    getChecked(chk2);
    selectCheck(allSelect2);
    var text = document.createTextNode(priceSum(checkedList2, price2));
    total2.replaceChild(text,total2.childNodes[0]);
}

// 검색
var colorList;
document.getElementById("searching").addEventListener("click", function(){
    var name = document.getElementsByClassName("name");
    var price = document.getElementsByClassName("price");
    returnColor();
    colorList = new Array(); 
    for(let i=0; i<name.length; i++){
        if(findWord(name[i].childNodes[0]) && findPrice(price[i].childNodes[0])){
            textStyle(i);
            colorList.push(i);
        }
    }
})
function findWord(name) {
    var word = document.getElementById("searchingName").value;
    if(word==""){
        return true;
    }
    if(name.nodeValue.indexOf(word)!=-1){
        console.log("찾음");
        return true;
    }
    return false;
}
function findPrice(price){
    var sp0 = document.getElementsByName("searchingPrice1")[0].value;
    var sp1 = document.getElementsByName("searchingPrice2")[0].value;
    if(sp0=="" && sp1==""){
        return true;
    }
    else if(sp0==""){
        if(price.nodeValue <= sp1){
            return true;
        }
    }
    else if(sp1==""){
        if(price.nodeValue >= sp0){
            return true;
        }
    }
    else{
        if(price.nodeValue >= sp0 && price.nodeValue <= sp1){
            return true;
        }
    }
    return false;
}
function textStyle(i){
    if(i < generalBody.rows.length-1){
        generalBody.rows[i].setAttribute('style','color:red; font-size:30px; font-weight : 600');
    }else{
        var idx = i - generalBody.rows.length+1;//총가격 row때문에 +1함
        dawnBody.rows[idx].setAttribute('style','color : red; font-size:30px; font-weight:600');
    }
    
}

// 색깔 원상태로
document.getElementById("returnColor").addEventListener("click", function(){returnColor()});
function returnColor(){
    if(colorList == null){
        return;
    }
    for(var i=0; i<colorList.length; i++){
        if(colorList[i] < generalBody.rows.length-1){
            generalBody.rows[colorList[i]].setAttribute('style','');
        }else{

            var idx = colorList[i] - generalBody.rows.length+1;//총가격 row때문에 +1함
            dawnBody.rows[idx].setAttribute('style','');
        }
    }
}