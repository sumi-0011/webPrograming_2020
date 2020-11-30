<?php
   
    $json_info = jsonEncode();
    file_put_contents("../info/userInfo.json",$json_info."\n", FILE_APPEND); 
    function jsonEncode() {
        $userId = test_input($_POST["join_id"]);
        $userPwd = test_input($_POST["join_pwd"]);
        $userName = test_input($_POST["join_name"]);
        $userPhoneNumber = test_input($_POST["join_number"]);
        $userEmail = test_input($_POST["join_email"]);
        
        $temp = array();
        $temp["id"] = $userId;
        $temp["pwd"] = $userPwd;
        $temp["name"] = $userName;
        $temp["phone"] = $userPhoneNumber;
        $temp["email"] = $userEmail;
        // var_dump($temp);
        $json_info = json_encode($temp);
        print_r($json_info);
        return $json_info;
    }
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
     
     
     
?>
    
