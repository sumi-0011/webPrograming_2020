<?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
// $json_data = test_input($_POST['sendData']);
$today = date("Y-m-d");
$url ='../info/performanceInfo.json';
if(file_exists($url)) {
    $array = array();
    $file = explode("\n",file_get_contents($url));  //파일의 값을 개행기준으로 잘라 file에 저장
    // print_r($file);
    for($i=0;$i<count($file);$i++) {
        if($file[$i]!=null){
        $temp = json_decode($file[$i]); 
        $temp_date = explode(" ",($temp->date));    
        if($temp_date[0] >= $today) {
            array_push($array,$file[$i]);
        }
        }   
    }
    if(count($array)==0) {
        echo "false";
    }
    else {
        echo implode("\n",$array);
    }
}
else {
    echo "file_false";
}