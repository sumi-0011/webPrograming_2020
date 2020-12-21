<?php 
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$json_data = test_input($_POST['sendData']);
$replace_json = str_replace("&quot;", '"',$json_data); 
// $json_data = "today";
// $json_data = "{&quot;name&quot;:&quot;대전시립합창단&quot;,&quot;clas&quot;:&quot;음악&quot;,&quot;date&quot;:&quot;2020-12-22 19:30&quot;,&quot;time&quot;:&quot;90&quot;,&quot;ticket&quot;:&quot;R석 10,000원 S석 5,000원&quot;,&quot;image&quot;:&quot;img5.jpg&quot;,&quot;detail&quot;:&quot;※ 본 공연은 예매 개시일 시점 객석의 30%를 오픈하여 운영합니다. 이후 코로나19 상황 사회적 거리두기 단계 변동에 따라 좌석변경(축소) 및 취소가 진행될 수 있습니다. 관객 여러분의 양해 부탁드립니다.n※ 공연장 입장 시 발열체크 후 QR체크인 또는 명단을 작성하며 공연장 내 마스크 착용은 필수입니다.n※ 객석 거리두기로 인해 동반인과 좌석을 붙여 앉으실 수 없습니다.&quot;}
// ";
// $json_data = '{"name":"나빌레라콘서트","clas":"재즈","date":"2020-11-21 11:09","time":"90","ticket":"R석 7만원,S석 5만원,A석 3만원","image":"img4.jpg"}';

$url ='../info/performanceInfo.json';
$bol = true;
if($json_data == "all") {
    if(file_exists($url)) {
        echo file_get_contents('../info/performanceInfo.json');
    }
    else {
        echo "file_false";
    }
}
else if($json_data =="today") {
    if(!file_exists($url)) {
        echo "file_false";
    }
    else {
    $array = array();
    $data  = json_decode($json_data);
    $file = explode("\n",file_get_contents('../info/performanceInfo.json'));
    $today = date("Y-m-d");
    // print_r($data);
    for($i=0;$i<count($file);$i++) {
        if($file[$i]!=null){
            $temp = json_decode($file[$i]); 
            $t = explode(" ",($temp->date));
            if($t[0]==$today) {
                $bol = false;
                array_push($array,$file[$i]);
            }
        } 
      }
    //   print_r($array);
      if($bol) {
          echo "false";
      }
      else {
        //   print_r($array);/
          echo implode("\n",$array);

      }
    }
}
else {
    $url_seat = '../info/seatData.json';
    $seat = test_input($_POST['seat']);
    // $seat = "ss";
    if(file_exists($url))  {
        $data = json_decode($replace_json);
        $file = explode("\n",file_get_contents('../info/performanceInfo.json'));
        for($i=0;$i<count($file);$i++) {
            if($file[$i]!=null){
                $temp = json_decode($file[$i]); 
                // print_r($temp);
                if($temp->date==$data->date) {
                    $bol = false;
                    break;
                }
            } 
          }
          $arr = [$data->date,$seat];
          if($bol == true) {
              //파일에 시트정보 추가하기
              file_put_contents($url_seat,json_encode($arr)."\n",FILE_APPEND);
              file_put_contents("../info/performanceInfo.json",$replace_json."\n", FILE_APPEND);
              echo $replace_json;
          }
    }
    else {
        file_put_contents("../info/performanceInfo.json",$replace_json."\n", FILE_APPEND);
        echo $replace_json;
    }
    if($bol == false) {
        echo "false2";
    }
}

