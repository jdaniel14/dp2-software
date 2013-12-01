$(document).ready(function(){
	$("#modalLogin").hide();
});

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
            var nombre = data["me"]["nom_user"];
            localStorage.setItem("nombre",nombre);
            
            if(idUsuario==1){
                localStorage.setItem("idRol",1);
            }else{
                localStorage.setItem("idRol",3);
            }
        
            $(location).attr('href','views/general/ListaProyectos.html');
           }else{
               //alert("usuario incorrecto");
        	   //$('.alert').alert();
        	   $('#modalLogin').show();
               //$(location).attr('href','index.html');
           }
            
			
        }
	});
        
	return false;
        
})