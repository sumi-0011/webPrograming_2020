<?php 

// POST로 공연 정보 또는 어떤 공연 정보를 수신받을 것인지 알아와 
//그것에 따라 반환되는 값들이 달라진다. 
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$json_data = test_input($_POST['sendData']);                //공연 정보를 json형태로 변환하여 php로 넘겨준다. $_POST로 받아준다. 
$replace_json = str_replace("&quot;", '"',$json_data);      //인코딩하는 과정에서 해킹 방지를 위하여 &quot;가 섞인 json이 되었을수도 있기때문에 치환해준다. 

$url ='../info/performanceInfo.json';                       //저장할 파일 정보
$bol = true;
if($json_data == "all") {       //전체 공연
    if(file_exists($url)) {
        echo file_get_contents($url);   //전체 공연 정보가 개행을 기준으로 묶여있는 문자열을 반환
    }
    else {
        echo "file_false";
    }
}
else if($json_data =="today") { //오늘 공연
    if(!file_exists($url)) {
        echo "file_false";
    }
    else {
    $array = array();
    $data  = json_decode($json_data);               //입력값을 해독해 저장한다. 
    $file = explode("\n",file_get_contents($url));  //개행을 기준으로 나눈다. 
    $today = date("Y-m-d");
    // print_r($data);
    for($i=0;$i<count($file);$i++) {
        if($file[$i]!=null){
            $temp = json_decode($file[$i]); 
            $t = explode(" ",($temp->date));        //날짜만 알면 되기 때문, $t[0] 은 2020-12-12 형식의 문자열이다. 
            if($t[0]==$today) {                     //현재 날짜와 공연 날짜가 같으면 배열에 push한다. 
                $bol = false;
                array_push($array,$file[$i]);
            }
        } 
      }
    //   print_r($array);
      if($bol) {    //배열에 추가한 값이 하나도 없는것
          echo "false";
      }
      else {        //array를 개행을 기준으로 문자열로 묶어 리턴해준다. 
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
        $file = explode("\n",file_get_contents($url));
        for($i=0;$i<count($file);$i++) {
            if($file[$i]!=null){
                $temp = json_decode($file[$i]); 
                // print_r($temp);
                if($temp->date==$data->date) {  //동일한 날짜+시간 인 공연이 있는지 확인
                    $bol = false;               //있으면 bol값을 false로 바꾸고 탐색을 끝낸다. 
                    break;
                }
            } 
          }
          $arr = [$data->date,$seat];          //arr에 배열의 원소로 날짜와, 시트정보를 추가해주고
          if($bol == true) {                    //동일한 공연이 없었으면
              //파일에 시트정보 추가하기        //좌석정보와, 공연정보를 파일에 각각 저장한다
              file_put_contents($url_seat,json_encode($arr)."\n",FILE_APPEND);
              file_put_contents($url,$replace_json."\n", FILE_APPEND);
              echo $replace_json;               //반환값은 저장한 공연정보
          }
    }
    else {
        //파일이 없는경우에는 파일을 새로 생성하면서 값을 저장하면 된다
        file_put_contents($url,$replace_json."\n", FILE_APPEND);
        echo $replace_json;
    }
    if($bol == false) { //false인 경우는 동일한 공연이존재하는 경우이다. 
        echo "false2";
    }
}

