<?php
 $id = $_POST["id"];
 $pw = $_POST["pw"];
 $isSuccess = false;
 $myfile = fopen("data/person.json", "r");
 while (!feof($myfile)){
    $data = fgets($myfile);
    $data = json_decode($data, true);
    if($data["id"] == $id && $data["pw"] == $pw){
        $isSuccess = true;
        break;
    }
 }
 if($isSuccess) {
     echo 1; //로그인 성공
 } else {
     echo 0; //로그인 실패
 }
?>