<?php
    $fileName = $_POST['file_name'];
    $content = $_POST['word'];

    $fp = fopen("data.txt", "r") or die("파일을 열 수 없습니다！");
    $infoArray;
    $searchArray;
    while( !feof($fp) ) {
        $name = fgets($fp);
        $data = fgets($fp);
        $infoArray[$name] = $data;
    }

    //1. 파일이름과 단어의 키워드를 모두 만족
    if($fileName!="" && $content!="") {
        foreach($infoArray as $key=>$value) {
            $file_exist = name_search($fileName,$key);
            $key_exist =Keyword_search($content,$value);
            if($file_exist=="true" && $key_exist >0) {
                $arr = [$value, $key_exist];
                $searchArray[$key] = $arr;
                //echo "<li>".$key.": ".$value."</li>";
               
            }
        }
        
    }
    //2. 파일 키워드만 만족 
   else if($fileName!="") {
    foreach($infoArray as $key=>$value) {
        $file_exist = name_search($fileName,$key);
        if($file_exist=="true") {
            $arr = [$value, $file_exist];
            $searchArray[$key] = $arr;
            //echo "<li>".$key.": ".$value."</li>";
           
        }
    }
   
   }
    //3. 단어 키워드만 만족
    else if($content!="") {
        foreach($infoArray as $key=>$value) {
           //내용 키워드 확인 경우 
            $key_exist =Keyword_search($content,$value);
            if($key_exist>0) {
                $arr = [$value, $key_exist];
                $searchArray[$key] = $arr;
                //echo "<li>".$key.": ".$value."</li>";
            }
        }
    }
    //4. 모두 입력 x
    else {
        echo "Enter the keywords of list that you want to search";
    }
       //파일이름 키워드 검색
    function name_search($fileName,$name) {
        $key_name = substr($name,0,-5);
        $pos = strpos(trim($key_name),$fileName);
        //echo $key_name." ".$pos."<br>";
        if($pos !==false)  {
            return "true";
        }
        else {
            return "false";
             
        }
           
    }
    //단어 키워드 검색
    function Keyword_search($content,$data) {
        $count=0;
        $array = explode(" ",$data);
        foreach($array as $str) {
            $temp = strcasecmp(trim($str),$content);
          
            if($temp==0) {
                $count++;
            }
        }
        //echo $data.$count."<br>";
        return $count;
        // if($count >0) {
        //     return "true";
        // } 
        // return "false";
    }
      
    foreach ((array) $searchArray as $key => $value) {
        $sort[$key] = $value[1];
    }

    $radio = $_POST['radio1'];
   
    if($radio==1) {
        //오름차순
        array_multisort($sort, SORT_ASC, $searchArray);
    }
    else {
        array_multisort($sort, SORT_DESC, $searchArray);
    }
  
  
   
    //print_r($searchArray);
  
    foreach($searchArray as $key=>$value) {
        echo "<li>".$key.": ".$value[0]."</li>";
       // echo "<li>".$key.": ".$value[0].$value[1]."</li>";
    }

    fclose($fp);

