<?php
$name = test_input($_POST["id"]);
$text = test_input($_POST["pwd"]);

$url ='data/person.json';
$bol = false;
if(file_exists($url)) {
  $Json = file_get_contents("data/person.json");
  $file =  explode("\n", $Json);
  for($i=0;$i<count($file);$i++) {
    if($file[$i]!=null){
      $a = json_decode($file[$i]); 
      print_r($a);

     if($a->id==$name) {
       $bol = true;
    }
    } 
  }
}

if($bol ==false) {
  if (!isset($myObj)) {
    $myObj = new stdClass();
  }
    $myObj->id=$name;
    $myObj->pw=$text;
    // $array = array('id'=>$name , "pw"=>$text);
  $json = json_encode($myObj);
  //print_r($json);
  $bytes = file_put_contents("data/person.json",$json."\n", FILE_APPEND); 
  echo "회원가입이 완료되었습니다.";
}
else {
  echo "이미 아이디가 존재합니다. ";
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
 ?>