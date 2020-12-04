<?php
    $decode = json_decode($_POST["sendData"]); 
    $array = array('id'=>test_input($decode->id), 'pwd'=>test_input($decode->pwd));
    // $id = $_POST['join_id'];
    // $pwd = $_POST['join_pwd'];
    // $array = array('id'=>test_input($id), 'pwd'=>test_input($pwd));
    $url ='data/person.json';
    $bol = false;
    //파일이 존재하면 id가 이미 있는지 검사한다. 
    if(file_exists($url)) {
      $Json = file_get_contents($url);
      $file = explode("\n", $Json);
      for($i=0;$i<count($file);$i++) {
        if($file[$i]!=null){
          $a = json_decode($file[$i]);
          //맞는 아이디를 찾으면 리턴
          // echo $a->id;
         if($a->id==$array['id']) {
             if($a->pwd==$array['pwd']) {
               $bol = true;
               session_start();
               $_SESSION['userId'] = $array['id'];
                echo $array['id'];
             }
           
         }
        } 
      }
       
    }
    if($bol==false) {
      echo "false";
    }
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

?>