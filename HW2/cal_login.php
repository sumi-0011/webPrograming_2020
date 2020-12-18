<?php
    $decode = json_decode($_POST["sendData"]); 
    $array = array('id'=>test_input($decode->id), 'pwd'=>test_input($decode->pwd));
    $url ='data/person.json';
    $bol = false;
    //파일이 존재하면 id가 이미 있는지 검사한다. 
    if(file_exists($url)) {
      $Json = file_get_contents($url);//url경로의 파일을 가져와 Json에 저장
      $file = explode("\n", $Json);   //Json에 저장된 정보를 \n을 기준으로 나눈다. 
      for($i=0;$i<count($file);$i++) { //file 배열을 돌면서 null이 아니면 
        if($file[$i]!=null){
          $a = json_decode($file[$i]);
          //아이디와 비밀번호가 맞는 정보가 있으면 bol을 true로 바꾸고 리턴
         if($a->id==$array['id']) {
             if($a->pwd==$array['pwd']) {
               $bol = true;
               session_start();         //세션에 등록
               $_SESSION['userId'] = $array['id'];
              echo $array['id'];        //로그인된 사용자의 아이디를 리턴해준다.
             }
           
         }
        } 
      }
       
    }
    if($bol==false) {   //로그인 실패
      echo "false";
    }
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

?>