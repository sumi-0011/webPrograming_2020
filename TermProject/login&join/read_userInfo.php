<?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

$read = test_input($_POST['sendData']);
// $read = 'id';
//userInfo.json파일을 읽어온다. 
$json_info = file_get_contents('../info/userInfo.json');
$file = explode("\n",$json_info);
// print_r($file);
$array = array();
for($i=0;$i<count($file);$i++) {
    if($file[$i]!=null ) {
        $a = json_decode($file[$i]);
        array_push($array,$a->$read);
    }
}
echo implode("\n",$array);

