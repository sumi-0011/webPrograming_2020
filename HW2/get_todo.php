<?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$result_arr = [];
$userId = test_input($_POST['userId']);
$start_date = test_input($_POST['start_date']);
$end_date = test_input($_POST['end_date']);

// $userId = 'minsu99';
// $start_date = '2020-11-29';
// $end_date = '2020-12-05';

$file_name = $userId."_".substr($start_date,0,4).substr($start_date,5,2);
$url1 = "./toDo/".$file_name.".json";
$file_name = $userId."_".substr($end_date,0,4).substr($end_date,5,2);
$url2 = "./toDo/".$file_name.".json";
// $bol = false;
//만약 두 파일이 같은 경로이면 하나만 실행
if($url1 == $url2) {
    // echo "same";
    $result_arr =get_todo1($url1);
}
else {
    // echo "diff";
    $arr1 = get_todo1($url1);
    $arr2 = get_todo2($url2);
    // echo "<br>";
    // var_dump($arr1);
    // echo "<br>";
    $result_arr =array_merge($arr1, $arr2);
    // var_dump($result_arr);
}

echo implode("\n",$result_arr);
// print_r($result_arr);
function get_todo1($url) {
    global $start_date;
    $arr = [];
    if(file_exists($url)) {
        $json_file = file_get_contents($url);
        $json_array = explode("\n",$json_file);
        for($i=0;$i<count($json_array);$i++) {
            if($json_array[$i]!=null) {
                $json = json_decode($json_array[$i]);
                // echo $json->date;
                if($json->date >= $start_date) {
                    array_push($arr, $json_array[$i]);
                }
            }
        }
    }
    return $arr;
}
function get_todo2($url) {
    global $end_date;
    $arr = [];
    if(file_exists($url)) {
        $json_file = file_get_contents($url);
        $json_array = explode("\n",$json_file);
        for($i=0;$i<count($json_array);$i++) {
            if($json_array[$i]!=null) {
                $json = json_decode($json_array[$i]);
                // echo $json->date;
                if($json->date <= $end_date) {
                    // echo ($json->date <= $end_date)."<br>";
                    array_push($arr, $json_array[$i]);
                }
            }
        }
    }
    return $arr;
}