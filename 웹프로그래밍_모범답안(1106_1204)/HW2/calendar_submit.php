<?php
 function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$userId = test_input($_POST['userId']);                 //사용자 아이디
$json_next_en =$_POST['todoData_submit'];               //수정된 데이터
$json_next =(array)json_decode($json_next_en);
$change_prev = $_POST['change_prev'];                   //수정하기 이전 데이터
$prev_decode = (array)json_decode($change_prev);

//url 경로를 설정해준다. 
$file_name = $userId."_".substr($prev_decode['date'],0,4).substr($prev_decode['date'],5,2);
$url = "./toDo/".$file_name.".json";

$file_name = $userId."_".substr($json_next['date'],0,4).substr($json_next['date'],5,2);
$url_next ="./toDo/".$file_name.".json";

$bol = false;
if(file_exists($url)) {
    $json_file = file_get_contents($url);
    $json_array = explode("\n",$json_file);
    unlink($url);
   for($i=0;$i<count($json_array);$i++) {
       if($json_array[$i]!=null) {
            $json = json_decode($json_array[$i]);
            //파일의 데이터와 같은 날이면 찾는 일정이다. 
            //수정할 이전 데이터 대신 수정된 데이터를 파일에 추가해준다.
            if($json->date==$prev_decode['date'] && $json->time==$prev_decode['time']) {
                $bol = true;
                $json_array[$i] = $json_next_en;
                file_put_contents($url_next,$json_array[$i]."\n", FILE_APPEND); 

            }
            else {
                file_put_contents($url,$json_array[$i]."\n", FILE_APPEND); 
            }
        }
    }
    echo $json_next_en;
}
else {
    echo "false";
}
if($bol==false)  {
    //같은거 존재 x
    echo "false"    ;
}