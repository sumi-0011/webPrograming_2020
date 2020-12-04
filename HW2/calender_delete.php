<?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$userId = test_input($_POST['userId']);
$todoData = json_decode($_POST["todoData"]); 
$todoArray = array('date'=>test_input($todoData->date), 'time'=>test_input($todoData->time),'title'=>test_input($todoData->title),'description'=>test_input($todoData->description));

$file_name = $userId."_".substr($todoArray['date'],0,4).substr($todoArray['date'],5,2);
$url = "./toDo/".$file_name.".json";
$bol = false;

if(file_exists($url)) {
    $json_file = file_get_contents($url);
    $json_array = explode("\n",$json_file);
    unlink($url);
    for($i=0;$i<count($json_array);$i++) {
        if($json_array[$i]!=null) {
            $json = json_decode($json_array[$i]);
            if($json->date==$todoData->date && $json->time==$todoData->time) {
                //삭제
                $bol = true;
            }
            else {
                file_put_contents($url,$json_array[$i]."\n", FILE_APPEND); 
            }
        }
    }
}
if($bol == false) {
   //삭제 안됨
   echo "false";
}
else {
    echo "true";
}