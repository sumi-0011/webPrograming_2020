<?php
$sendDate = $_POST['sendData']; //탐색할 공연 일자
$url = '../info/seatData.json'; //탐색할 경로 파일
if(file_exists($url)) {         //파일이 존재하면
    $bol = false;               //초기값 false
    $result="";             
    $file = explode("\n",file_get_contents($url));      //개행기준으로 공연정보를 나눈다. 
    for($i=0;$i<count($file);$i++) {
        if($file[$i]!=null){
            $temp = json_decode($file[$i]);             //나뉜 공연 정보는 json형태이므로 decode해준다. 
            // print_r($temp);
            $date = $temp[0];                           //decode한 값의 첫번째 인덱스가 공연 일자고, 두번째 인자가 seat정보를 담고있는 문자열이다. 
            if($date == $sendDate ) {                   //탐색하는 공연일자를 찾으면
                $result =  $temp[1];                    //그 공연일자에 해당하는 시트정보를 result에 저장하고 true바꿈
                $bol = true;
                break;
            }
        } 
      }
    if($bol) {      //bol값이 true이면 시트정보가 저장된 result를 반환한다. 
        echo $result;
    }
    else {
        echo "false";
    }
}
else {
    echo "file_false";
}