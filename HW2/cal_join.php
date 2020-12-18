<?php
    $decode = json_decode($_POST["sendData"]); 
    $array = array('id'=>test_input($decode->id), 'pwd'=>test_input($decode->pwd));
    
    $url ='data/person.json';
    $bol = false;
    //파일이 존재하면 id가 이미 있는지 검사한다. 
    if(file_exists($url)) {
      $Json = file_get_contents($url);      //url경로의 파일을 가져와 Json에 저장
      $file = explode("\n", $Json);         //Json에 저장된 정보를 \n을 기준으로 나눈다. 
      for($i=0;$i<count($file);$i++) {      //file 배열을 돌면서 null이 아니면 
        if($file[$i]!=null){
          $a = json_decode($file[$i]); 
         if($a->id==$array['id']) {         //현재 회원가입을 하려는 아이디와 중복되는 것이 있는지 확인한다
           $bol = true;                     //중복되는 아이디가 있으면 bol을 true로 바꿈
         }
        } 
      }
    }
    if($bol ==false) {                     //bol이 false경우만 실행 == 아이디가 중복되지 않는 경우에만 회원가입을 진행한다.
        //json형식으로 encode해서 파일에 저장해준다. 
        $json = json_encode($array);
        $bytes = file_put_contents("data/person.json",$json."\n", FILE_APPEND);     //파일에 사용자 정보를 저장하고 0을리턴
        echo "0";
      }
    else {
     echo "1";        //아이디 중복의 경우에 리턴됨
    }
        
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data); 
    $data = htmlspecialchars($data);
    return $data;
  }
?>