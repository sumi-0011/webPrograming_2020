<?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

$read = test_input($_POST['sendData']);
//userInfo.json파일을 읽어와 저장해준다. 
$json_info = file_get_contents('../info/userInfo.json');
//엔터를 기준으로 나눈값을 file에 저장해준다. 즉, file은(obj)가 된다
$file = explode("\n",$json_info);
//array를 생성해 file의 값을 디코드 한것 == 유저 정보 에서 읽어오기를 바란 값을 넣어준다. 
$array = array();
for($i=0;$i<count($file);$i++) {
    if($file[$i]!=null ) {
        $a = json_decode($file[$i]);
        array_push($array,$a->$read);
    }
}
//위에서 생성해준 배열을 엔터를 기준으로 문자열으로 합쳐 echo해줘 js로 리턴해준다. 
echo implode("\n",$array);

