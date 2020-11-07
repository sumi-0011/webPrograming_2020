<?php
$id = test_input($_GET['id']);
$change_pwd = test_input($_POST['change_pwd']);
$Json = file_get_contents("data/person.json");
$file =  explode("\n", $Json);
// echo $change_pwd;
file_put_contents("data/person.json","");
for($i=0;$i<count($file);$i++) {
    if($file[$i]!=null ) {
        $a = json_decode($file[$i]);
       
        if($a->id==$id) {
           $a->pw = $change_pwd;
           echo "비밀번호 변경이 성공적으로 완료되었습니다.";
        } 
        // var_dump($a);
        
        $json = json_encode($a);
        $bytes = file_put_contents("data/person.json",$json."\n", FILE_APPEND);
    }
  
}
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
 ?>
