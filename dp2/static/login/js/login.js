$("#ingresarSistema").click(function(){
	
        var jsonUsuario = {
		p_user : $("#usuario").val(),
		p_pass  : $("#pass").val()
        };
    
        $.ajax({
		type: 'POST',
                data: JSON.stringify(jsonUsuario),
		url: "api/G_verificaUsuario",
		dataType: "json", // data type of response
                async:false,
		contentType: "application/json; charset=utf-8",
        success: function(data){                    
            
           if(data["me"]["nom_user"]!=null){
            var idUsuario = data["me"]["id_user"];
            localStorage.setItem("idUsuario",idUsuario);
            $(location).attr('href','views/general/ListaProyectos.html');
           }else{
               alert("usuario incorrecto");
               $(location).attr('href','index.html');
           }
            
			
        }
	});
        
	return false;
        
})