$("#ingresarSistema").click(function(){
	
        var jsonUsuario = {
		user : $("#user").val(),
		name  : $("#name").val()
        };
    
        $.ajax({
		type: 'POST',
                data: JSON.stringify(jsonUsuario),
		url: "../../api/G_verificaUsuario",
		dataType: "json", // data type of response
        success: function(data){                    
            
           
            var idUsuario = 1;
            localStorage.setItem("idUsuario",idUsuario);
            $(location).attr('href','views/general/ListaProyectos.html');
			
        }
	});
        
	return false;
        
})