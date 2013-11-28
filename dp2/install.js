$('#probarConexion').click(function(){
	var obj ={
		"url": $("#url").val(),
		"usuario": $("#usuario").val(),
		"password": $("#password").val(),
		"esquema": $("#esquema").val()
	}
	$.ajax({
		type: 'POST',
		url : "api/IN_probarConexion",
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: function(data){
			var resultado =data["conexion"] && data["conexionLineaBase"] && data["permisos"];
			if(!resultado){
				$("#hayError").html("true");
				$("#listaErrores").html("Se encontraron los siguientes errores:<br />");
				$("#listaErrores").append(data["mensajesError"]);
				$("#errores").removeClass("alert-success");
				$("#errores").addClass("alert-danger");
				$("#errores").show();
			}
			else{
				$("#hayError").html("false");
				$("#errores").removeClass("alert-danger");
				$("#errores").addClass("alert-success");
				$("#listaErrores").html("Conexión exitosa");
				$("#errores").show();
			}
			
		}
	});
});

function noValido(){
	var errorVacios=false;
	//.has-error .danger
	var campos = $(".form-control")
	for (var i=0; i< campos.length; i++){
		if(campos[i].id == "password") continue;
		if(campos[i].val()==""){
			errorVacios = true;
		}
	}
	var errorLista=$(".danger").length() >0;
	var errorBD = $("#hayError").html() =="true";
	if (errorLista) $("#erroresTotales").append("Hay errores en los permisos de las carpetas <br />");
	if(errorBD) $("#erroresTotales").append("Hay error en la cadena de conexión a la base de datos <br />");
	if(errorVacios) $("#erroresTotales").append("Hay campos vacios<br />");
	if(errorLista || errorBD || errorVacios) $("#erroresTotales").show();
	return errorLista || errorBD || errorVacios;
}

function error(){
	$("#mensaje").html("Ocurrio un error durante la instalación");
	$("#barra").addClass("progress-bar-warning");
}

$("#instalar").click(function(){
	$("#probarConexion").click();
	if(noValido())return;
	$("#instalando").show(250);
	var obj ={
		"bd":{
			"url": $("#url").val(),
			"usuario": $("#usuario").val(),
			"password": $("#password").val(),
			"esquema": $("#esquema").val()
		},
		"sitio":{
			"nombre": $("#nombre").val(),
			"usuarioInicial": $("#usuarioInicial").val(),
			"passwordInicial": $("#passwordInicial").val()
		}
	}
	$.ajax({
		type: 'POST',
		url : "api/IN_restaurarBD",
		dataType: "json",
		data: JSON.stringify(obj["bd"]),
		contentType: "application/json; charset=utf-8",
		error: error,
		success: function(){
			$("#mensaje").html("Restaurando base de datos Linea Base...");
			$.ajax({
				type: 'POST',
				url : "api/IN_restaurarBDLineaBase",
				dataType: "json",
				data: JSON.stringify(obj["bd"]),
				contentType: "application/json; charset=utf-8",
				error: error,
				success: function(){
					$("#mensaje").html("Creando usuario inicial...");
						$.ajax({
							type: 'POST',
							url : "api/IN_crearUsuario",
							dataType: "json",
							data: JSON.stringify(obj["sitio"]),
							contentType: "application/json; charset=utf-8",
							error: error,
							success: function(){
								$("#mensaje").html("Personalizando aplicación...");
								$.ajax({
									type: 'POST',
									url : "api/IN_personalizarAplicacion",
									dataType: "json",
									data: JSON.stringify(obj["sitio"]),
									contentType: "application/json; charset=utf-8",
									error: error,
									success: function(){
										$("#mensaje").html("Terminando la instalación...");
										$.ajax({
											type: 'POST',
											url : "api/IN_eliminarArchivos",
											contentType: "application/json; charset=utf-8",
											error: error,
											success: function(){
												window.location.href="index.html";
											}
										});
									}
								});
							}
						});
				}
			});
		}
	});
	
});

$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url : "api/IN_permisosCarpetas",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data){
			var tabla = $("#listaCarpetas");
			for(var i=0; i< data.length;i++){
				var fila = $("<tr>");
				fila.append("<td>"+data[i]["nombre"]+"</td>");
				fila.append("<td>"+data[i]["permisos"]+"</td>");
				if(data[i]["estado"]){
					fila.append('<td style="text-align:center"><span class="glyphicon glyphicon-ok-sign"></span></td>');
					fila.addClass("success");
				}
				else{
					fila.append('<td style="text-align:center"><span class="glyphicon glyphicon-remove-sign"></span></td>');
					fila.addClass("danger");
				}
				tabla.append(fila);
			}
		}
	});
});