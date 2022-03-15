<?php
$id = $_POST["id"];
$year = $_POST["year"];
$month = $_POST["month"];
$type = $_POST["type"]; //조회면 0, 추가면 1, 삭제는 2, 수정후 달력갱신이면 3

//$date = $_POST["date"];
//$time = $_POST["time"];
//$title = $_POST["title"];
//$description = $_POST["description"];

$filename = "data/" . $id . "_" . $year . $month . ".json";

if (!file_exists($filename)) { //파일이 존재하지 않을경우
  $myfile = fopen($filename, "w");
  fclose($myfile);
  echo 0; //일정이없음을 알림
} else { //파일이 존재할경우
  if ($type == 0) { //조회일 경우
    $min_date = $_POST["min_date"];
    $max_date = $_POST["max_date"];
    $myfile = fopen($filename, "r");
    $arr = array();
    while (!feof($myfile)) {
      $data = fgets($myfile);
      $data = json_decode($data, true);
      if (
        strtotime($data["date"]) >= strtotime($min_date)
        && strtotime($data["date"]) <= strtotime($max_date)
      ) {
        array_push($arr, $data);
      }
    }
    fclose($myfile);
    if (count($arr) == 0) {
      echo 0; //해당하는 일정이 없음
    } else {
      echo json_encode($arr); //해당하는 일정들 js로전달
    }
  } elseif ($type == 1) { //추가일 경우
    $date = $_POST["date"];
    $time = $_POST["time"];
    $title = $_POST["title"];
    $description = $_POST["description"];

    //날짜 시간중복 검사
    $flag = false; //중복인지 아닌지
    $myfile = fopen($filename, "r");
    while (!feof($myfile)) {
      $data = fgets($myfile);
      $data = json_decode($data, true);
      if ($data["date"] == $date && $data["time"] == $time) {
        $flag = true;
        break;
      }
    }
    fclose($myfile);
    if ($flag) {
      echo -1; //중복이면 -1반환
    } else {
      $myfile = fopen($filename, "a");
      $data = array("date" => $date, "time" => $time, "title" => $title, "description" => $description);
      $txt = json_encode($data);
      $txt = $txt . "\n";
      fwrite($myfile, $txt);
      fclose($myfile);
      echo 1; //추가완료
    }
  } elseif ($type == 2) { //삭제인 경우
    $date = $_POST["date"];
    $time = $_POST["time"];
    $title = $_POST["title"];
    $description = $_POST["description"];

    $txt = ""; //복사할 내용 저장할 변수
    $myfile = fopen($filename, "r"); //처음부터 읽기
    while (!feof($myfile)) {
      $data = fgets($myfile);
      if ($data == null) {
        break;
      }
      $data = json_decode($data, true);
      if (
        $data["date"] == $date && $data["time"] == $time
        && $data["title"] == $title && $data["description"] == $description
      ) {
        continue;
      }
      $data = json_encode($data);
      $txt = $txt . $data . "\n";
    }
    fclose($myfile);
    $myfile = fopen($filename, "w"); //복사한 내용으로 새로 덮어쓰기
    fwrite($myfile, $txt);
    fclose($myfile);
    echo 2; //삭제완료
  } elseif ($type == 3) { //수정후 업데이트의 경우
    $date = $_POST["date"];
    $time = $_POST["time"];
    $title = $_POST["title"];
    $description = $_POST["description"];

    //날짜 시간중복 검사
    $past_date = $_POST["past_date"];
    $past_time = $_POST["past_time"];
    $past_title = $_POST["past_title"];
    $past_description = $_POST["past_description"];
    $flag = false; //중복인지 아닌지
    $temp = "";
    $myfile = fopen($filename, "r");
    while (!feof($myfile)) {
      $data = fgets($myfile);
      $data = json_decode($data, true);
      if ($data["date"] == $date && $data["time"] == $time) {
        //$temp = json_encode($data);
        $temp = array("date" => $past_date, "time" => $past_time, "title" => $past_title, "description" => $past_description);
        $temp = json_encode($temp);
        $flag = true;
        break;
      }
    }
    fclose($myfile);
    if ($flag) {
      $myfile = fopen($filename, "a"); //지워진 내용복구
      $temp = $temp . "\n";
      fwrite($myfile, $temp);
      fclose($myfile);
      echo -1; //중복이면 -1반환
    } else {
      $myfile = fopen($filename, "a");
      $data = array("date" => $date, "time" => $time, "title" => $title, "description" => $description);
      $txt = json_encode($data);
      $txt = $txt . "\n";
      fwrite($myfile, $txt);
      fclose($myfile); //수정된 정보 추가완료

      //달력갱신을위한 js로의 정보전달
      $min_date = $_POST["min_date"];
      $max_date = $_POST["max_date"];
      $myfile = fopen($filename, "r");
      $arr = array();
      while (!feof($myfile)) {
        $data = fgets($myfile);
        $data = json_decode($data, true);
        if (
          strtotime($data["date"]) >= strtotime($min_date)
          && strtotime($data["date"]) <= strtotime($max_date)
        ) {
          array_push($arr, $data);
        }
      }
      fclose($myfile);
      if (count($arr) == 0) {
        echo 0; //해당하는 일정이 없음
      } else {
        echo json_encode($arr); //해당하는 일정들 js로전달
      }
    }
  }
}
?>