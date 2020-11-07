<?php
    $name = $_POST["name"];
    $text = $_POST["text"];

    $fp = fopen("data.txt","a+");
    if($fp == null) {
        $fp = fopen("data.txt","w");
    }
        $bol = true;
        while(!feof($fp)) {
        $t = fgets($fp);
      
        $str = ~strcmp($name,$t);
        echo $t."<br>";
        // echo $name."<br>";
        echo $str."<br>";
    
        if($str) {
        //중복되는 것이 있음
        echo "저장되지 않았습니다.\n";
        echo "이전에 같은 화일 이름으로 저장된 정보가 있습니다.";
        $bol  = false;
        //한줄 넘김
        break;
        }       
        else {
        echo "pass<br>";
        }
        fgets($fp);           
    }
    fclose($fp);
    if($bol==true) {
        $fp = fopen("data.txt","a");
        $txt = $name."\n".$text."\n";
        fwrite($fp,$txt);
        fclose($fp);
        echo "저장되었습니다.";
    
    }

?>

<!-- $file = fopen("data.txt","a");

$txt = $name."\n".$text."\n";
fwrite($file,$txt);
fclose($file);

echo "저장되었습니다."; -->
