<?php
//ajax로 받아온 값을 디코드 해줘 변수에 저장해주고 
    $decode = json_decode($_POST["sendData"]); 
    //validation을 거쳐서 배열에 저장한후 다시 json으로 인코드해준다. 
    $array = array('title'=>test_input($decode->title), 'content'=>test_input($decode->content));
    $json = json_encode($array);
    //josn형태로 다시 인코딩한 값을 파일에 저장해준다. 
    $bytes = file_put_contents("./data.json",$json."\n",FILE_APPEND);
    //정상적인 값을 ehco해 ajax코드에서 success임을 알려준다. 
    echo($_POST["sendData"]);

    
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>