<?php
// file_get_contents($url_seat,json_encode($arr)."\n",FILE_APPEND);
$sendData = $_POST['sendData']; //전송된 수정된 좌석정보
$date = $_POST['date'];         //탐색할 공연 일자
$url = "../info/seatData.json"; 
$bol = false;
if(file_exists($url)) {
    //파일이 존재하면 파일에서 좌석 정보를 읽어와 저장하고
    //파일을 삭제해준다. (다시쓰기위함)
    //탐색할 공연일자에 해당하는 좌석정보이면 그 좌석정보 대신에 전송된 좌석정보를 저장하고
    //그렇지 않으면 그대로 파일에 추가해준다. 
    $file = explode("\n",file_get_contents($url));
    unlink($url);
    for($i=0;$i<count($file);$i++) {
        if($file[$i]!=null){
            $arr =[];
            $temp = json_decode($file[$i]); 
            // echo $temp[0];
            array_push($arr,$temp[0]);

            if($temp[0] ==$date ) {
                array_push($arr,$sendData);
                file_put_contents($url,json_encode($arr)."\n", FILE_APPEND);
                echo "true";
                $bol = true;
            }
            else {
                file_put_contents($url,$file[$i]."\n", FILE_APPEND);
            }
        }
    }
    if($bol == false) {
        echo "false";
    }
}
else {
    echo "file_false";
}