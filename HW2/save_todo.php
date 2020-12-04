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

// $userId = "chacha00";
// $todoArray = array('date'=>test_input($_POST['input_date']), 'time'=>test_input($_POST['input_time']),'title'=>test_input($_POST['input_title']),'description'=>test_input($_POST['input_description']));

$file_name = $userId."_".substr($todoArray['date'],0,4).substr($todoArray['date'],5,2);
$url = "./toDo/".$file_name.".json";
$bol = false;
//할일 목록들은 날짜와 시간에 대해 중복된 값을 가지지 않는 것을 가정으로 한다. 
//중복검사, 중복되는 것이 없으면 $bol  = false 
if(file_exists($url)) {
    $json_file = file_get_contents($url);
    $json_array = explode("\n",$json_file);
    for($i=0;$i<count($json_array);$i++) {
        if($json_array[$i]!=null) {
            $json = json_decode($json_array[$i]);
            if($json->date==$todoArray['date'] && $json->time==$todoArray['time']) {
                $bol = true;
                break;
            }
        }
    }
}
if($bol == false) {
    $json_data = json_encode($todoArray);
    file_put_contents($url,$json_data."\n",FILE_APPEND);
    echo $json_data;
}
else {
    echo "false";
}