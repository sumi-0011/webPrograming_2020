<?php
    $fp = fopen("data.txt","a+");
    if($fp == null) {
      $fp = fopen("data.txt","w");
    } 
    $name = test_input($_POST["name"]);
    $text = test_input($_POST["text"]);
    $farray = file("data.txt");
    $bol = true;
    if(isset($farray)){
    for($i = 0; $i<count($farray); $i += 2){
        $str = strcmp(trim($farray[$i]),$name);
        if($str==0){
            $bol = false;
            echo "저장되지 않았습니다.\n";
            echo "이전에 같은 화일 이름으로 저장된 정보가 있습니다.";        
        break;
        }
      //else $bol = false;
    }
   
  }
  fclose($fp);
  
  if($bol === true){
    $fp = fopen("data.txt","a");
    $txt = $name."\n".$text."\n";
    fwrite($fp,$txt);
    echo "저장되었습니다.";
    fclose($fp);
  }

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
 ?>