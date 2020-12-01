<?php
    $decode = json_decode($_POST["sendData"]); 
    $array = array('id'=>test_input($decode->id), 'pwd'=>test_input($decode->pwd));
    // $array = array('id'=>test_input($_POST['join_id']), 'pwd'=>test_input($_POST['join_pwd']));
    
    $url ='data/person.json';
    $bol = false;
    //파일이 존재하면 id가 이미 있는지 검사한다. 
    if(file_exists($url)) {
      $Json = file_get_contents($url);
      $file = explode("\n", $Json);
      for($i=0;$i<count($file);$i++) {
        if($file[$i]!=null){
          $a = json_decode($file[$i]); 
        //   print_r($a);
         if($a->id==$array['id']) {
           $bol = true;
         }
        } 
      }
    }
    if($bol ==false) {
        //json형식으로 encode해서 파일에 저장해준다. 
        $json = json_encode($array);
        $bytes = file_put_contents("data/person.json",$json."\n", FILE_APPEND); 
        echo "0";
      }
    else {
     echo "1";     
    }
        
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>