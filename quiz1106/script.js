window.onload = function () {
    document.getElementById("callButton").addEventListener("click",AjaxCall);
    document.getElementById("search_keyword").addEventListener("keyup", inputKeyword);
    console.log('cick');
   
  
}

function AjaxCall() { 
    
    $.ajax({ 
        type: "POST", 
        //ajax를 이 url에서 실행하겠다.
        url: "http://localhost/quiz1106/saveJson.php", 
        data: {sendData:createData()}, 
        dataType: "json", 
        success: function (data) { 
            alert(createData());
            console.log(data); 
            alert("저장되었습니다.");
        }, 
        //에러가 생기면 무슨 error인지 알려줌
        error: function (jqXHR, textStatus, errorThrown) { 
            alert("error");
            console.log(jqXHR.responseText); 
        } 
    });
}
function createData() {
    var obj = {"title":$('#title').val(),"content":$('#content').val()};
    var sendData = JSON.stringify(obj);

    return sendData;
}
function createKey() {
    var obj = {"key":$('#search_keyword').val()};
    var sendJson = JSON.stringify(obj);
    return sendJson;
}
//키워드를 입력하면 호출되는 함수, json형태로 변환한후 알림창에 띄운다. 
function inputKeyword() {
    var json = createKey();
    // console.log(json);
    alert(createKey());
    search_ajaxCall(json);
}
function search_ajaxCall(key) {

    $.ajax({ 
        type: "POST", 
        //ajax를 이 url에서 실행하겠다.
        url: "http://localhost/quiz1106/search.php", 
        data: {sendKey:key}, 
        dataType: "json", 
        success: function (data) { 
           
            if(data!="") {
                alert(data);
                // console.log(data);
                addList(data);
            }
        }, 
        //에러가 생기면 무슨 error인지 알려줌
        error: function (jqXHR, textStatus, errorThrown) { 
            alert("error");
            console.log(jqXHR.responseText); 
        } 
    });
    
}
function addList(list) {
     // console.log(list);
     //ul의 모든 자식들을 삭제
    $('#ulist').empty();
    //ul에 검색된 결과를 추가
    for(var s in list) {
        var elementLi = document.createElement('li');
        var text = document.createTextNode(list[s]);
        elementLi.appendChild(text);
        document.getElementById('ulist').appendChild(elementLi);
    }
}