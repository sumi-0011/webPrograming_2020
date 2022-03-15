// Event 처리 start
// 장바구니 클릭시 등록폼 표시 이벤트
document.getElementById('shop-icon').addEventListener("click", makeRegistForm);
// 체크박스 전체선택 이벤트
document.getElementById('normal-all-check').addEventListener("click", function(e){
  checkAll(e.target.id);
});
document.getElementById('normal-all-check').addEventListener("click", function(e){
  viewTotalPrice("normal-tbl");
});
document.getElementById('dawn-all-check').addEventListener("click", function(e){
  checkAll(e.target.id);
});
document.getElementById('dawn-all-check').addEventListener("click", function(e){
  viewTotalPrice("dawn-tbl");
});
// 장바구니 담기 버튼 클릭 이벤트
document.getElementById('add-cart').addEventListener("click", addCart);
// 장바구니 취소 버튼 클릭
document.getElementById('cancel').addEventListener("click", cancel);
// 선택 삭제 이벤트
document.getElementById('normal-select-delete').addEventListener("click", function(e){
  selectedDelete('normal-tbl');
});
document.getElementById('dawn-select-delete').addEventListener("click", function(e){
  selectedDelete('dawn-tbl');
});
// 배송 이동 이벤트
document.getElementById('move-to-dawn').addEventListener("click", function(e){
  moveToWay('normal-tbl', 'dawn-tbl');
});
document.getElementById('move-to-normal').addEventListener("click", function(e){
  moveToWay('dawn-tbl', 'normal-tbl');
});
// 검색 이벤트
document.getElementById('search-btn').addEventListener("click", function(e){
  var name = document.getElementById('product-name').value;
  var min_price = document.getElementById('min-price').value;
  var max_price = document.getElementById('max-price').value;
  search(name, min_price, max_price);
});
// 원래 색으로 돌리기 이벤트
document.getElementById('change-original-color').addEventListener("click", changeOriginalColor);
// Event 처리 End

// 전체 상품에 대한 정보를 담을 배열 (검색시 사용)
var dataArr = [];

// 상품 장바구니 등록 표시
function makeRegistForm() {
  document.getElementById('regist').style.visibility = "visible";
}

// 상품 장바구니 등록 취소
function cancel() {
  document.getElementById('regist').style.visibility = "hidden";

  // 상품 이미지 초기화
  clearData('fname');
  // 상품 이름 초기화
  clearData('pname');
  // 상품 가격 초기화
  clearData('pprice');
  // 상품 개수 초기화
  clearData('pcount');
  // 배송 방법 초기화
  clearWay();
}

// 데이터 초기화 메소드
function clearData(id) {
  var e = document.getElementById(id);
  e.value = "";
}

// 배송 방법 초기화 메소드
function clearWay() {
  var e = document.getElementsByName('delivery');
  for(var i = 0; i < e.length; i++){
    e[i].checked = false;
  }
}

// 장바구니 담기
function addCart() {
    //  validation 결과
    var val = validate();

    // 장바구니에 추가
    if(val){
      var data = saveData();
      var type = "";
      var deliveryWay = document.getElementsByName('delivery');
      dataArr.push(data);
      console.log(dataArr);
      if(deliveryWay[0].checked){
        // 일반 배송 테이블에 추가
        type = 'normal-tbl';
        console.log(data);
        addTable(data, type);
      } else {
        // 새벽 배송 테이블에 추가
        type = 'dawn-tbl';
        console.log(data);
        addTable(data, type);
      }
      cancel();
    }
}

// validation 메소드
function validate() {
  // validation 결과
  var validation = true;
  // 각각의 validation 결과를 담을 배열 생성
  var val = new Array();

  // #1. 상품이미지 validation
  var filename = document.getElementById('fname').value;
  console.log(filename);

  // file 확장자 분리
  var ext = filename.substring(filename.lastIndexOf('.') + 1);
  console.log(ext);

  // #1.1 이미지 파일 validation
  if (filename == ""){
    alert("상품 이미지를 추가하시오.");
    val.push(false);
  } // #1.2 이미지 파일 확장자 validation
  else if (ext == "jpg" || ext == "jpeg" || ext == "png"){
    val.push(true);
  } else{
    alert("이미지 화일이 아닙니다. 'jpg','jpeg' 또는 'png'을 확장자로 가진 화일을 추가하시오.");
    val.push(false);
  }

  // #2. 상품 이름 validation
  // 문자 정규표현식
  var regchar = /^[a-zA-Z\s]+$/;
  var productname = document.getElementById('pname').value;

  // #2.1 상품 이름 입력 validation
  if (productname == ""){
    alert("상품 이름을 입력하시오.");
    val.push(false);
  } else if (regchar.test(productname)){ // #2.1 상품 이름 정규표현 validation
    val.push(true);
  } else{
    alert("문자로된 상품 이름을 입력하시오.");
    val.push(false);
  }

  // #3. 상품 가격 validation
  // 숫자 정규표현식
  var regnum = /^[0-9]+$/;
  var price = document.getElementById('pprice').value;

  // #3.1 상품 가격 입력 validation
  if (price == ""){
    alert("상품 가격을 입력하시오.");
    val.push(false);
  } else if (regnum.test(price)){ // #3.2 상품 가격 정규표현 validation
    // #3.3 상품 최소 가격 validation
    if (price < 1000){
      alert("상품 가격을 1000원 이상으로 입력하시오.");
      val.push(false);
    } else {
      val.push(true);
    }
  } else{
    alert("상품 가격에 숫자를 입력하시오.");
    val.push(false);
  }

  // #4. 상품 개수 validation
  var count = document.getElementById('pcount').value;

  // #4.1 상품 개수 입력 validation
  if (count == ""){
    alert("상품 개수를 입력하시오.");
    val.push(false);
  } else if (regnum.test(count)){ // #4.2 상품 개수 정규표현 validation
    // #4.3 상품 개수 범위 validation
    if (1 > count || count > 50){
      alert("최대 50개 이하로 선택하시오.");
      val.push(false);
    } else{
      val.push(true);
    }
  } else{
    alert("상품 개수에 숫자를 입력하시오.");
    val.push(false);
  }

  // #5. 배송 방법 validation
  var delivery = document.getElementsByName('delivery');
  var deliCheck = false;
  for(var i = 0; i < delivery.length; i++){
    // #5.1 배송 방법 선택 validation
    if(delivery[i].checked) {
      deliCheck = true;
      break;
    }
  }

  if(deliCheck){
    val.push(true);
  } else {
    alert("배송 방법을 선택하시오.");
    val.push(false);
  }

  val.forEach(v => {
    if(!v){
      validation = false;
    }
  });

  return validation;
}

// 입력 데이터 저장 메소드
function saveData() {
  var obj = {};
  var keys = ['상품 이미지', '상품 이름', '상품 개별 가격', '상품 개수', '상품 구매 가격'];
  var values = [];
  var fileValue = "";
  var fileName = "";
  var name = "";
  var price = 0;
  var count = 0;
  // 상품 이미지 이름 추가
  fileValue = document.getElementById('fname').value;
  filename = fileValue.substring(fileValue.lastIndexOf('\\') + 1);
  values.push(filename);
  // 상품 이름 추가
  name = document.getElementById('pname').value;
  values.push(name);
  // 상품 개별 가격 추가
  price = document.getElementById('pprice').value;
  values.push(Number(price));
  // 상품 개수 추가
  count = document.getElementById('pcount').value;
  values.push(Number(count));
  // 상품 구매 가격 추가
  values.push(price * count);

  // (key, value) 를 가진 상품에 대한 obj 생성
  for(var i = 0; i < keys.length; i++){
    obj[keys[i]] = values[i];
  }

  return obj;
}

// 배송 테이블 추가 메소드
function addTable(data, type) {
  // 일반/새벽 배송 테이블 엘리먼트
  var tbody = document.getElementById(type);
  var cols = 5;
  var row = document.createElement("tr");

  // 테이블 선택 체크박스 추가
  var td1 = document.createElement("td");
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  // 선택체크박스 클릭 시 전체선택체크박스 확인 이벤트 추가
  checkbox.addEventListener("click", function(e) {
    viewCheckAll(type);
  });
  // 선택체크박스 클릭 시 총 가격 표시 이벤트
  checkbox.addEventListener("click", function(e) {
    viewTotalPrice(type);
  });
  if(type == "normal-tbl"){
    // 일반 배송 체크박스 name 설정
    checkbox.setAttribute("name", "normal-select-item");
  } else{
    // 새벽 배송 체크박스 name 설정
    checkbox.setAttribute("name", "dawn-select-item");
  }
  // 장바구니 등록으로 추가되는 새로운 데이터는 checked 상태로 추가되어야 함
  checkbox.setAttribute("checked", true);
  td1.appendChild(checkbox);
  row.appendChild(td1);

  // 테이블에 상품 이미지 추가
  var td2 = document.createElement("td");
  var img = document.createElement("img");
  img.setAttribute("src", data['상품 이미지']);
  img.setAttribute('alt', '상품 이미지');
  img.setAttribute('width', '80px');
  img.setAttribute('height', '80px');
  td2.appendChild(img);
  row.appendChild(td2);

  // 상품 이름/개별 가격/개수/구매 가격 추가
  // 테이블에 상품 이름 추가
  var td3 = document.createElement("td");
  var name = document.createTextNode(data['상품 이름']);
  td3.appendChild(name);
  row.appendChild(td3);

  // 테이블에 상품 개별 가격 추가
  var td4 = document.createElement("td");
  var price = document.createTextNode(data['상품 개별 가격']);
  td4.appendChild(price);
  row.appendChild(td4);

  // 테이블에 상품 개수 추가
  var td5 = document.createElement("td");
  var count = document.createTextNode(data['상품 개수']);
  td5.appendChild(count);
  row.appendChild(td5);

  // 테이블에 상품 구매 가격 추가
  var td6 = document.createElement("td");
  var totalPrice = document.createTextNode(data['상품 구매 가격']);
  td6.setAttribute("class", "cost");
  td6.appendChild(totalPrice);
  row.appendChild(td6);
  tbody.appendChild(row);

  // 전체 선택 체크 표시 여부 확인
  viewCheckAll(type);
  // 총 가격 표시
  viewTotalPrice(type);
}

// 체크 박스 확인 작업 start
// 전체 선택 클릭 메소드
function checkAll(id) {
  var x = document.getElementById(id);
  if(x.checked) {
    // 일반 배송 전체 선택
    if(id == "normal-all-check"){
      document.getElementsByName("normal-select-item").forEach(item => {
        item.checked = true;
      });
    } else {
      // 새벽 배송 전체 선택
      document.getElementsByName("dawn-select-item").forEach(item => {
        item.checked = true;
      });
    }
  } else {
    // 일반 배송 전체 선택 해제
    if(id == "normal-all-check"){
      document.getElementsByName("normal-select-item").forEach(item => {
        item.checked = false;
      });
    } else {
      // 새벽 배송 전체 선택 해제
      document.getElementsByName("dawn-select-item").forEach(item => {
        item.checked = false;
      });
    }
  }
}

// 전체 선택 체크 표시 여부 확인
function viewCheckAll(id){
  var check = true;
  if(id == 'normal-tbl'){
    if(document.getElementById(id).childNodes.length == 0){
      check = false;
    }
    var normalCheckBox = document.getElementById("normal-all-check");
    document.getElementsByName('normal-select-item').forEach(item => {
      if(!item.checked){
        check = false;
      }
    });

    if(check){
      normalCheckBox.checked = true;
    } else {
      normalCheckBox.checked = false;
    }
  } else {
    if(document.getElementById(id).childNodes.length == 0){
      check = false;
    }
    var dawnCheckBox = document.getElementById("dawn-all-check");
    document.getElementsByName('dawn-select-item').forEach(item => {
      if(!item.checked){
        check = false;
      }
    });

    if(check){
      dawnCheckBox.checked = true;
    } else {
      dawnCheckBox.checked = false;
    }
  }
}
// 체크 박스 확인 작업 end

// 총 가격 표시 메소드
function viewTotalPrice(id){
  // 일반 배송
  if(id == 'normal-tbl'){
    // 선택된 제품들의 가격을 담을 배열 생성
    var priceArr = new Array();
    document.getElementsByName("normal-select-item").forEach(item => {
      if(item.checked){
        // 선택된 제품들의 가격만 배열에 추가
        priceArr.push(parseInt(item.parentNode.parentNode.lastChild.innerHTML));
      }
    });
    var totalPrice = 0;
    priceArr.forEach((price) => {
      totalPrice += price;
    });
    document.getElementById("normal-total-price").innerHTML = totalPrice;
  } else {
    // 새벽 배송
    // 선택된 제품들의 가격을 담을 배열 생성
    var priceArr = new Array();
    document.getElementsByName("dawn-select-item").forEach(item => {
      if(item.checked){
        // 선택된 제품들의 가격만 배열에 추가
        priceArr.push(parseInt(item.parentNode.parentNode.lastChild.innerHTML));
      }
    });
    var totalPrice = 0;
    priceArr.forEach((price) => {
      totalPrice += price;
    });
    document.getElementById("dawn-total-price").innerHTML = totalPrice;
  }
}

// 선택 삭제 메소드
function selectedDelete(id){
  // 선택한 tr 찾아서 제거
  var tbody = document.getElementById(id);
  var tRows = tbody.rows;
  var checkedRows = [];

  // 선택된 tr 배열 생성
  for(var i = 0; i < tRows.length; i++){
    if(tRows[i].firstChild.firstChild.checked){
      checkedRows.push(tRows[i]);
    }
  }

  // table에서 선택된 tr 제거
  for(var k = 0; k < checkedRows.length; k++){
    // 삭제하려는 상품의 이름
    var deletedName = checkedRows[k].firstChild.nextElementSibling.nextElementSibling.innerHTML;
    const idx = dataArr.findIndex(function(item) {
      return item["상품 이름"] === deletedName;
    });
    dataArr.splice(idx, 1);
    console.log(dataArr);
    tbody.removeChild(checkedRows[k]);
  }
  // 전체선택 체크 여부 확인
  viewCheckAll(id);
  // 총 가격 수정
  viewTotalPrice(id);
}

// 배송 이동 메소드
function moveToWay(src, dest){
  var srcBody = document.getElementById(src);
  var destBody = document.getElementById(dest);
  var srcRows = srcBody.rows;
  var checkedRows = [];

  // 선택된 tr에 대해서 배열 생성
  for(var i = 0; i < srcRows.length; i++){
    if(srcRows[i].firstChild.firstChild.checked){
      if(src == 'normal-tbl'){
        srcRows[i].firstChild.firstChild.setAttribute('name', 'dawn-select-item');
      } else {
        srcRows[i].firstChild.firstChild.setAttribute('name', 'normal-select-item');
      }
      checkedRows.push(srcRows[i]);
    }
  }

  // dest table에 선택된 tr 추가
  for(var k = 0; k < checkedRows.length; k++){
    destBody.appendChild(checkedRows[k]);
  }

  // 전체선택 체크 여부 확인
  viewCheckAll(src);
  viewCheckAll(dest);
  // 총 가격 수정
  viewTotalPrice(src);
  viewTotalPrice(dest);
}

// 검색 메소드
function search(name, min_price, max_price){
  // 검색된 목록
  var searchArr = [];

  // 이름 없이 가격정보만 주어진 경우
  if(name == ""){
    // ~이하 값만 주어질 경우
    if(min_price == "" && max_price != ""){
      dataArr.forEach(item => {
        if(item["상품 개별 가격"] <= max_price){
          searchArr.push(item);
        }
      });
      changeColorForSearch(searchArr);
    } else if (min_price != "" && max_price == "") {
      // ~이상 값만 주어질 경우
      dataArr.forEach(item => {
        if(item["상품 개별 가격"] >= min_price){
          searchArr.push(item);
        }
      });
      changeColorForSearch(searchArr);
    } else if (min_price != "" && max_price != "") {
      // 최소 ~ 최대 범위가 주어질 경우
      dataArr.forEach(item => {
        if(item["상품 개별 가격"] >= min_price && item["상품 개별 가격"] <= max_price){
          searchArr.push(item);
        }
      });
      changeColorForSearch(searchArr);
    } else {
      // 아무것도 입력하지 않고 검색버튼을 누를 경우
      return;
    }
  } else {
    // ~이하 값만 주어질 경우
    if(min_price == "" && max_price != ""){
      dataArr.forEach(item => {
        if(item["상품 이름"].includes(name) && item["상품 개별 가격"] <= max_price){
          searchArr.push(item);
        }
      });
      changeColorForSearch(searchArr);
    } else if (min_price != "" && max_price == "") {
      // ~이상 값만 주어질 경우
      dataArr.forEach(item => {
        if(item["상품 이름"].includes(name) && item["상품 개별 가격"] >= min_price){
          searchArr.push(item);
        }
      });
      changeColorForSearch(searchArr);
    } else if (min_price != "" && max_price != "") {
      // 최소 ~ 최대 범위가 주어질 경우
      dataArr.forEach(item => {
        if(item["상품 이름"].includes(name) && item["상품 개별 가격"] >= min_price && item["상품 개별 가격"] <= max_price){
          searchArr.push(item);
        }
      });
      changeColorForSearch(searchArr);
    } else {
      // 이름 정보로만 검색
      dataArr.forEach(item => {
        if(item["상품 이름"].includes(name)){
          searchArr.push(item);
        }
      });
      changeColorForSearch(searchArr);
    }
  }

}

// 검색된 목록 빨간색으로 바꾸는 메소드
function changeColorForSearch(searchArr){
  var tbody = document.getElementsByTagName('tbody');
  for(var i = 0; i < tbody.length; i++){
    for(var k = 0; k < tbody[i].rows.length; k++){
      var rows = tbody[i].rows;
      var rowsChild = rows[k].childNodes;

      searchArr.forEach(item => {
        if(item["상품 이름"] == rowsChild[2].innerHTML){
          for(var n = 2; n < rowsChild.length; n++){
            rowsChild[n].setAttribute("class", "search-effect");
          }
        }
      });
    }
  }
}

// 원래 색으로 돌리기 메소드
function changeOriginalColor(){
  var td = document.getElementsByTagName('td');
  var arr = [];

  // class가 search-effect인 td 태그 탐색 후 배열에 저장
  for(var i = 0; i < td.length; i++){
    if(td[i].getAttribute('class') == "search-effect"){
      arr.push(td[i]);
    }
  }

  // 해당 td의 class 속성을 삭제
  arr.forEach(item => {
    item.removeAttribute('class');
  });

}
