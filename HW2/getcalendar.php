<?php

$sendID ="minsu99";
$url ='toDo/'+$sendID+'.json';




function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}