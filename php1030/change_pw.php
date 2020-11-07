<?php
    $id = test_input($_GET["id"]);

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }
?>

<html>
    <body>
    <form method="post" action="./pwChange.php?id=<?=$id?>">
    <!-- 섹션 사용하기 !! -->
    비밀번호 : 
    <input type="password" id="pwd" name="change_pwd" pattern="^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*" required><br><br>
    <button type="submit">제출</button>
    <!-- <input type="submit" value="제출" formation="pwChange.php?id=<?=$id?>">   -->
    <input type="reset">
   </form>
    </body>

</html>