$("#save").click(function(){
    var title = $("#title").val();
    var content = $("#content").val();
    var obj = {
        title : title,
        content : content
    };
    var myJSON = JSON.stringify(obj);
    alert(myJSON);

    $.post("data.php",
    {
      article: myJSON,
    },
    function(data, status){
      alert(data);
    });
});

$("#key").keyup(function(){
    var key = $("#key").val();
    var obj = { key : key };
    var myJSON = JSON.stringify(obj);
    alert(myJSON);

    $.post("search.php",
    {
      key: myJSON
    },
    function(data, status){

      alert(data);
      var title_arr = JSON.parse(data);
      $("#list").empty();
      for(val of title_arr){
          $("#list").append("<li>" + val + "</li>");
      }
    });
});
