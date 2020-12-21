<?php
   
    // $json_info = jsonEncode();
    $json_info = $_POST['sendData'];

    file_put_contents("../info/userInfo.json",$json_info."\n", FILE_APPEND); 
    echo $json_info;     
?>
    
