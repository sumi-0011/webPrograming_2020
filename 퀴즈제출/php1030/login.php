<?php

$url ='data/person.json';

if(!file_exists($url)) {
    echo '파일이 없습니다.';
    exit;
}
$name = test_input($_POST["id"]);
$pw = test_input($_POST["pwd"]);

$Json = file_get_contents("data/person.json");
$file =  explode("\n", $Json);
$bol = false;
for($i=0;$i<count($file);$i++) {
    if($file[$i]!=null ) {
        $a = json_decode($file[$i]); 
        
        if($a->id==$name) {
            if($a->pw==$pw) {
                echo $a->id."님 로그인이 되었습니다.";
                $bol = true;
                $id = $a->id;
                echo "<button><a href='change_pw.php?id=${id}'>비밀번호변경</a></button>";
            }
        }
 }
}

if($bol ==false) {
    echo "입력하신 id가 존재하지 않거나 패스워드가 틀립니다. ";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
 ?>
