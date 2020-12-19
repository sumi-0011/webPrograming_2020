function icon(){
  document.getElementById("cart").style.display = "block";
}

function closeForm(){
  var img = document.getElementById("img");
  var name = document.getElementById("name");
  var price = document.getElementById("price");
  var cnt = document.getElementById("cnt");
  var nom_delivery = document.getElementsByName("delivery")[0];
  var dawn_delivery = document.getElementsByName("delivery")[1];

  img.value = null;
  name.value = null;
  price.value = null;
  cnt.value = null;
  nom_delivery.checked = false;
  dawn_delivery.checked = false;
  document.getElementById("cart").style.display = "none";
}

function validatorForm(){
  var img = document.getElementById("img").value;
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var cnt = document.getElementById("cnt").value;
  var nom_delivery = document.getElementsByName("delivery")[0];
  var dawn_delivery = document.getElementsByName("delivery")[1];
  var reg = /(.*?)\.(jpg|jpeg|png|)$/;
  var success = true;

  if(img ===''){
    alert('상품 이미지를 추가하시오');
     success = false;
  }
  else{
    if(!img.match(reg)){
      alert('이미지 화일이 아닙니다. \'jpg\', \'jpeg\' 또는 \'png\'을 확장자로 가진 화일을 추가하시오.');
      success = false;
    }
  }
  if(name === ''){
    alert('상품이름을 입력하시오');
     success = false;
  }
  else if(!isNaN(name)){
    alert('문자로된 상품이름을 입력하시오');
     success = false;
  }

  if(price === ''){
    alert('상품 가격을 입력하시오');
     success = false;
  }
  else{
    if(isNaN(price)){
      alert('상품가격에 숫자를 입력하시오');
      success = false;
    }else{
      if(Number(price)<1000){
        alert('상품가격을 1000원 이상으로 입력하시오.');
        success = false;
      }
    }
  }

  if(cnt === ''){
    alert('상품 개수를 입력하시오');
     success = false;
  }
  else{
    if(isNaN(cnt)){
      alert('상품개수에 숫자를 입력하시오.');
      success = false;
    }else{
      if(Number(cnt)>50||Number(cnt)<=0){
        alert('최대 50개 이하로 입력하시오');
        success = false;
      }
    }
  }

  if(nom_delivery.checked == false && dawn_delivery.checked == false){
    alert('배송방법을 선택하시오');
     success = false;
  }

  if(success === true){
    if(nom_delivery.checked == true){
      addtable_nom(img, name, price, cnt);
    }
    else if(dawn_delivery.checked == true){
      addtable_dawn(img, name, price, cnt);
    }
  }
closeForm();
}

function addtable_nom(img, name, price, cnt){

    var management1 = document.getElementById('tbody1');
  var row = management1.insertRow(management1.rows.length);
  var check_cell = row.insertCell(0);
  var img_cell = row.insertCell(1);
  var name_cell = row.insertCell(2);
  var price_cell = row.insertCell(3);
  var cnt_cell = row.insertCell(4);
  var total_cell = row.insertCell(5);

  check_cell.innerHTML = `<input type="checkbox" name="check_box_nom" checked onchange="changeCheckBox_nom()">`;
  img_cell.innerHTML = `<img src=img alt = img width="80px" height="80px">`;
  name_cell.innerHTML = name;
  price_cell.innerHTML = price;
  cnt_cell.innerHTML = cnt;
  total_cell.innerHTML = Number(price)*Number(cnt);

  changeCheckBox_nom();
}

function addtable_dawn(img, name, price, cnt){

    var management1 = document.getElementById('tbody2');
  var row = management1.insertRow(management1.rows.length);
  var check_cell = row.insertCell(0);
  var img_cell = row.insertCell(1);
  var name_cell = row.insertCell(2);
  var price_cell = row.insertCell(3);
  var cnt_cell = row.insertCell(4);
  var total_cell = row.insertCell(5);

  check_cell.innerHTML = `<input type="checkbox" name="check_box_dawn" checked onchange="changeCheckBox_dawn()">`;
  img_cell.innerHTML = `<img src=img alt = img width="80" height="80">`;
  name_cell.innerHTML = name;
  price_cell.innerHTML = price;
  cnt_cell.innerHTML = cnt;
  total_cell.innerHTML = Number(price)*Number(cnt);

  changeCheckBox_dawn();
}
/*
function sum (){
  var sum = document.getElementById('sum_nom');
  var management1 = document.getElementById('tbody1');
  var sum_price = 0;

  for(var i =0;i<management1.rows.length;i++){
    if(management1.rows[i].getElementsByTagName('td')[0].firstChild.checked){
      sum_price += Number(management1.rows[i].getElementsByTagName('td')[5].innerHTML);
    }
  }
  sum.innerHTML = sum_price;
}
*/
function changeCheckBox_nom(){
  var delivery_check = document.getElementsByName(`check_box_nom`);
  var tbody = document.getElementById('tbody1');
  var sum = document.getElementById('sum_nom');
  var sum_price = 0;
  var all_check = true;

  for(var i=0;i<delivery_check.length;i++){
    if(delivery_check[i].checked ==false){
      all_check = false;
      break;
    }
  }

  if(all_check == true && delivery_check.length != 0){
    document.getElementById(`일반_전체선택`).checked = true;
  }else{
    document.getElementById(`일반_전체선택`).checked = false;
  }

  for(var i =0;i<delivery_check.length;i++){
    if(delivery_check[i].checked==true){
      sum_price += Number(tbody.rows[i].getElementsByTagName('td')[5].innerHTML);
    }
  }
  sum.innerHTML = sum_price;
}

function changeCheckBox_dawn(){
  var delivery_check = document.getElementsByName(`check_box_dawn`);
  var tbody = document.getElementById('tbody2');
  var sum = document.getElementById('sum_dawn');
  var sum_price = 0;
  var all_check = true;

  for(var i=0;i<delivery_check.length;i++){
    if(delivery_check[i].checked ==false){
      all_check = false;
      break;
    }
  }

  if(all_check == true && delivery_check.length != 0){
    document.getElementById(`새벽_전체선택`).checked = true;
  }else if((all_check == true && delivery_check.length == 0)||all_check==false){
    document.getElementById(`새벽_전체선택`).checked = false;
  }

  for(var i =0;i<delivery_check.length;i++){
    if(delivery_check[i].checked==true){
      sum_price += Number(tbody.rows[i].getElementsByTagName('td')[5].innerHTML);
    }
  }
  sum.innerHTML = sum_price;
}

function selectAll_nom(){
  var delivery_check = document.getElementsByName(`check_box_nom`);
  if(delivery_check.length == 0){
    return;
  }
  if(document.getElementById(`일반_전체선택`).checked == true){
    for(var i=0 ; i<delivery_check.length ; i++) {
      if(!delivery_check[i].checked) {
        delivery_check[i].checked = true;
      }
    }
  }else{
    for(var i=0 ; i<delivery_check.length ; i++) {
      if(delivery_check[i].checked) {
        delivery_check[i].checked = false;
      }
    }
  }
  changeCheckBox_nom();
}

function selectDelete_nom(){
  var delivery_check = document.getElementsByName(`check_box_nom`);
  var tbody = document.getElementById(`tbody1`);
  var row = tbody.rows.length;
  for(var i = row-1;i>=0;i--){
    if(delivery_check[i].checked == true){
      tbody.deleteRow(i);
    }
  }
  changeCheckBox_nom();
}

function selectAll_dawn(){
  var delivery_check = document.getElementsByName(`check_box_dawn`);
  if(delivery_check.length == 0){
    return;
  }
  if(document.getElementById(`새벽_전체선택`).checked == true){
    for(var i=0 ; i<delivery_check.length ; i++) {
      if(!delivery_check[i].checked) {
        delivery_check[i].checked = true;
      }
    }
  }else{
    for(var i=0 ; i<delivery_check.length ; i++) {
      if(delivery_check[i].checked) {
        delivery_check[i].checked = false;
      }
    }
  }
  changeCheckBox_dawn();
}

function selectDelete_dawn(){
  var delivery_check = document.getElementsByName(`check_box_dawn`);
  var tbody = document.getElementById(`tbody2`);
  var row = tbody.rows.length;
  for(var i = row-1;i>=0;i--){
    if(delivery_check[i].checked == true){
      tbody.deleteRow(i);
    }
  }
  changeCheckBox_dawn();
}

function moveToDelivery_nom(){
  var delivery_check = document.getElementsByName(`check_box_nom`);
  var tbody = document.getElementById(`tbody1`);

  for(var i=0;i<delivery_check.length;i++){
    if(delivery_check[i].checked == true){

       var img = tbody.rows[i].getElementsByTagName('td')[1].innerHTML;
       var name = tbody.rows[i].getElementsByTagName('td')[2].innerHTML;
       var price = tbody.rows[i].getElementsByTagName('td')[3].innerHTML;
       var cnt = tbody.rows[i].getElementsByTagName('td')[4].innerHTML;
       addtable_dawn(img, name, price, cnt);
    }
  }
  selectDelete_nom();
  changeCheckBox_nom();
}

function moveToDelivery_dawn(){
  var delivery_check = document.getElementsByName(`check_box_dawn`);
  var tbody = document.getElementById(`tbody2`);

  for(var i=0;i<delivery_check.length;i++){
    if(delivery_check[i].checked == true){

       var img = tbody.rows[i].getElementsByTagName('td')[1].innerHTML;
       var name = tbody.rows[i].getElementsByTagName('td')[2].innerHTML;
       var price = tbody.rows[i].getElementsByTagName('td')[3].innerHTML;
       var cnt = tbody.rows[i].getElementsByTagName('td')[4].innerHTML;
       addtable_nom(img, name, price, cnt);
    }
  }
  selectDelete_dawn();
  changeCheckBox_dawn();
}

function search(){
  var delivery_check_nom = document.getElementsByName(`check_box_nom`);
  var delivery_check_dawn = document.getElementsByName(`check_box_dawn`);
  var tbody_nom = document.getElementById(`tbody1`);
  var tbody_dawn = document.getElementById(`tbody2`);
  var search_name = document.getElementById(`상품이름`);
  var search_price_min = document.getElementById(`가격범위1`);
  var search_price_max = document.getElementById(`가격범위2`);


  for(var i=0;i<delivery_check_nom.length;i++){
    var name = tbody_nom.rows[i].getElementsByTagName('td')[2];
    var price = tbody_nom.rows[i].getElementsByTagName('td')[3];
    var cnt = tbody_nom.rows[i].getElementsByTagName('td')[4];
    var allPrice = tbody_nom.rows[i].getElementsByTagName('td')[5];
    var price_Num = Number(price.innerHTML);
    if(search_name.value != '' && (search_price_min.value != '' && search_price_max.value != '')){
      if((name.innerHTML).indexOf(search_name.value) != -1 && price_Num >= search_price_min.value && price_Num <= search_price_max.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value != '' && (search_price_min.value != '' && search_price_max.value == '')){
      if((name.innerHTML).indexOf(search_name.value) != -1 && price_Num >= search_price_min.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value != '' && (search_price_min.value == '' && search_price_max.value != '')){
      if((name.innerHTML).indexOf(search_name.value) != -1 && price_Num <= search_price_max.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value != '' && (search_price_min.value == '' && search_price_max.value == '')){
      if((name.innerHTML).indexOf(search_name.value) != -1 ){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value == '' && (search_price_min.value != '' && search_price_max.value != '')){
      if(price_Num >= search_price_min.value && price_Num <= search_price_max.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value == '' && (search_price_min.value != '' && search_price_max.value == '')){
      if(price_Num >= search_price_min.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value == '' && (search_price_min.value == '' && search_price_max.value != '')){
      if(price_Num <= search_price_max.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }


  }

  for(var i=0;i<delivery_check_dawn.length;i++){
    var name = tbody_dawn.rows[i].getElementsByTagName('td')[2];
    var price = tbody_dawn.rows[i].getElementsByTagName('td')[3];
    var cnt = tbody_dawn.rows[i].getElementsByTagName('td')[4];
    var allPrice = tbody_dawn.rows[i].getElementsByTagName('td')[5];
    var price_Num = Number(price.innerHTML);

    if(search_name.value != '' && (search_price_min.value != '' && search_price_max.value != '')){
      if((name.innerHTML).indexOf(search_name.value) != -1 && price_Num >= search_price_min.value && price_Num <= search_price_max.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value != '' && (search_price_min.value != '' && search_price_max.value == '')){
      if((name.innerHTML).indexOf(search_name.value) != -1 && price_Num >= search_price_min.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value != '' && (search_price_min.value == '' && search_price_max.value != '')){
      if((name.innerHTML).indexOf(search_name.value) != -1 && price_Num <= search_price_max.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value != '' && (search_price_min.value == '' && search_price_max.value == '')){
      if((name.innerHTML).indexOf(search_name.value) != -1){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value == '' && (search_price_min.value != '' && search_price_max.value != '')){
      if(price_Num >= search_price_min.value && price_Num <= search_price_max.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value == '' && (search_price_min.value != '' && search_price_max.value == '')){
      if(price_Num >= search_price_min.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }
    else if(search_name.value == '' && (search_price_min.value == '' && search_price_max.value != '')){
      if(price_Num <= search_price_max.value){

        name.style.fontSize = "20px";
        name.style.color = "red";
        name.style.fontWeight = 600;

        price.style.fontSize = "20px";
        price.style.color = "red";
        price.style.fontWeight = 600;

        cnt.style.fontSize = "20px";
        cnt.style.color = "red";
        cnt.style.fontWeight = 600;

        allPrice.style.fontSize = "20px";
        allPrice.style.color = "red";
        allPrice.style.fontWeight = 600;
      }
    }

  }
}

function color_reset(){
  var nom_tbody = document.getElementById(`tbody1`);
  var dawn_tbody = document.getElementById(`tbody2`);
  for(var i =0;i<nom_tbody.rows.length;i++){
    for(var j=2;j<=5;j++){
      var nom = nom_tbody.rows[i].getElementsByTagName('td')[j];
      nom.style.fontSize = "100%";
      nom.style.color = "black";
      nom.style.fontWeight = 400;
    }
  }
  for(var i =0;i<dawn_tbody.rows.length;i++){
    for(var j=2;j<=5;j++){
      var dawn = dawn_tbody.rows[i].getElementsByTagName('td')[j];
      dawn.style.fontSize = "100%";
      dawn.style.color = "black";
      dawn.style.fontWeight = 400;
    }
  }
}
