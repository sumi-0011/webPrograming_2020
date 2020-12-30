<?php
    //js에서 파일에 저장할 데이터를 json으로 변환한 값을 받아온다. 
    $json_info = $_POST['sendData'];
    //파일에 받아온 값을 저장한다.
    file_put_contents("../info/userInfo.json",$json_info."\n", FILE_APPEND); 
    echo $json_info;     
?>
    
