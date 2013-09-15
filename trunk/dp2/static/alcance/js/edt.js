$("#MostrarEdt").click(function(){
	$(".container").show("slow");

	var jsonCliente = {
  			nombre : "sape",
  			email  : "hola",
  			fono   : "1234",
  			mensaje : "hola"
        };

        $.ajax({
            type: "POST",
            data: JSON.stringify(jsonCliente),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            url: "../../api/efectopucp",
            success: function (data) {
               
            }
        });
})