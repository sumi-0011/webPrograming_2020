<?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$result_arr = [];
$userId = test_input($_POST['userId']);             //사용자 아이디
$start_date = test_input($_POST['start_date']);     //현재 달력이 시작하는 날짜
$end_date = test_input($_POST['end_date']);         //현재 달력이 끝나는 날짜

 //url을 사용자아이디+날짜로 설정, 시작하는 달과 끝나는 달이 달라 파일을 두개 열어야 할수도 있다.
$file_name = $userId."_".substr($start_date,0,4).substr($start_date,5,2);
$url1 = "./toDo/".$file_name.".json";
$file_name = $userId."_".substr($end_date,0,4).substr($end_date,5,2);
$url2 = "./toDo/".$file_name.".json";

//만약 두 파일이 같은 경로이면 하나만 실행
if($url1 == $url2) {
    $result_arr =get_todo1($url1);
}
else {
    $arr1 = get_todo1($url1);
    $arr2 = get_todo2($url2);
    $result_arr =array_merge($arr1, $arr2); //찾은 할일들을 한 배열에 합쳐준다
}
//합쳐준 배열을 \n을 기준으로 한 문자열로 합쳐서 리턴해준다.
echo implode("\n",$result_arr);
//경로의 파일을 가지고 시작하는 날짜와 끝나는 날짜 사이의 할일들만 배열에 추가해주고, 배열을 리턴해준다
function get_todo1($url) {
    global $start_date;
    global $end_date;
    $arr = [];
    if(file_exists($url)) {
        $json_file = file_get_contents($url);
        $json_array = explode("\n",$json_file);
        for($i=0;$i<count($json_array);$i++) {
            if($json_array[$i]!=null) {
                $json = json_decode($json_array[$i]);
                if($json->date >= $start_date && $json->date <=$end_date ) {
                    array_push($arr, $json_array[$i]);
                }
            }
        }
    }
    return $arr;
}
function get_todo2($url) {
    global $start_date;
    global $end_date;
    $arr = [];
    if(file_exists($url)) {
        $json_file = file_get_contents($url);
        $json_array = explode("\n",$json_file);
        for($i=0;$i<count($json_array);$i++) {
            if($json_array[$i]!=null) {
                $json = json_decode($json_array[$i]);
                if($json->date <= $end_date && $json->date >= $start_date) {
                    array_push($arr, $json_array[$i]);
                }
            }
        }
    }
    return $arr;
}