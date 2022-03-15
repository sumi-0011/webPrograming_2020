<?php
$input_title = $input_content = "";

$input_arr = json_decode($_POST["article"], true);

$input_title = test_input($input_arr["title"]);
$input_content = test_input($input_arr["content"]);

//validation
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$file_name = "./data.json";
$file = fopen($file_name, "a");
if(!isset($article)) $article = new stdClass();
$article = array("title" => $input_title, "content" => $input_content);
$json_article = json_encode($article);
fwrite($file, $json_article . "\n");
fclose($file);

echo "저장되었습니다.";
?>
