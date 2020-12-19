<?php
$input_key = "";

$input_arr = json_decode($_POST["key"], true);

$input_key = test_input($input_arr["key"]);

//validation
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$title_arr = array();
$file_name = "./data.json";
$file = fopen($file_name, "r");
while(!feof($file)) {
    $json_article = trim(fgets($file));
    $article = json_decode($json_article, true);
    $word = stristr($article["title"], $input_key);
    if($word != false) {
        array_push($title_arr, $article["title"]);
    }
}
fclose($file);

if(!isset($title_arr)) $title_arr = new stdClass();
$json_title = json_encode($title_arr);

echo $json_title;
?>
