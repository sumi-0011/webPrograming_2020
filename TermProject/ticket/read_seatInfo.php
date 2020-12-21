<?php
$sendDate = $_POST['sendData'];
$url = '../info/seatData.json';
if(file_exists($url)) {
    $bol = false;
    $result="";
    $file = explode("\n",file_get_contents($url));
    for($i=0;$i<count($file);$i++) {
        if($file[$i]!=null){
            $temp = json_decode($file[$i]); 
            // print_r($temp);
            $date = $temp[0];
            if($date == $sendDate ) {
                $result =  $temp[1];
                $bol = true;
                break;
            }
            // $t = explode(" ",($temp->date));
            // if($t[0]==$today) {
            //     $bol = false;
            //     array_push($array,$file[$i]);
            // }
        } 
      }
    if($bol) {
        echo $result;
    }
    else {
        echo "false";
    }
}
else {
    echo "file_false";
}