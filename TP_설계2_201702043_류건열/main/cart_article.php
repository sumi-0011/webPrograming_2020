<?php include("../header.php") ?> 
<!-- <link rel="stylesheet" href="signup.css"> -->
<?php 
    if(!isset($_SESSION['id'])){ //세션값을 확인하여 로그인 했을 경우에만 이용 가능하도록함
        echo '<script>alert("로그인 후 이용 가능합니다.");</script>';
        header("Refresh:0; url=../main/main_article.php");
    }
?> 

<article>
    <div class="wrap">
        <div>
            <p>
                장바구니 페이지
                <!-- 사용자가 장바구니에 담아놓은 상품들을 확인할 수 있고, 
                그 상품들을 장바구니에서 제외하거나, 수량을 증감하거나, 결제할 수 있다. -->
                <!-- 원래 가격에서 쿠폰을 적용할 수 있도록 구현 -->
                <!-- 결제하는 것은 API를 가져와서 구현 예정 -->
            </p>
        </div>
    </div>
</article>




<?php include("../footer.php") ?>