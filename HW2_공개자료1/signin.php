   <?php
    $id = $_POST["id"];
    $pw = $_POST["pw"];
    $isExist = false; //아이디 존재여부

    if (!file_exists("data/person.json")) {
        $myfile = fopen("data/person.json", "w");
        $data = array("id" => $id, "pw" => $pw);
        $txt = json_encode($data);
        $txt = $txt . "\n";
        fwrite($myfile, $txt);
        fclose($myfile);
        echo "회원 가입이 완료되었습니다.";
    } else {
        $myfile = fopen("data/person.json", "r");
        while (!feof($myfile)) {
            $data = fgets($myfile);
            $data = json_decode($data, true);
            if ($data["id"] == $id) {
                $isExist = true;
                break;
            }
        }
        fclose($myfile);
        if ($isExist) {
            echo "이미 아이디가 존재합니다.";
        } else {
            $myfile = fopen("data/person.json", "a");
            $data = array("id" => $id, "pw" => $pw);
            $txt = json_encode($data);
            $txt = $txt . "\n";
            fwrite($myfile, $txt);
            fclose($myfile);
            echo "회원 가입이 완료되었습니다.";
        }
    }
    ?>