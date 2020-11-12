<?php
    $url ='./data.json';

    if(!file_exists($url)) {
        echo '파일이 없습니다.';
        exit;
    }
    $send_key = json_decode($_POST["sendKey"]); 
    $jsonFile = file_get_contents($url);
    $file =  explode("\n", $jsonFile);
    $arr = array();
    if(test_input($send_key->key)!=null) {
         foreach($file as $val) {
        if($val!=null) {
            $decode = (object)json_decode($val); 
            $str = stristr(test_input($decode->title),test_input($send_key->key));
            if($str != false) {
               array_push($arr,$str);
            }
        } 
    }
    }
   
    
    echo(json_encode($arr));
 
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }
   
?>