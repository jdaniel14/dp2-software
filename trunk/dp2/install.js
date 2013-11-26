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
		success: function(){
			/*
				var obj = {
					"conexion": true,
					"existeEsquema": false,
					"permisos":true,
				}
			*/

		}
	});
});

function validar(){

}

$("#instalar").click(function(){
	validar();
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
		url : "api/IN_crearEsquemas",
		dataType: "json",
		data: JSON.stringify(obj["bd"]),
		contentType: "application/json; charset=utf-8",
		success: function(){
			$("#mensaje").html("Restaurando base de datos...");
			$.ajax({
				type: 'POST',
				url : "api/IN_restaurarBase",
				dataType: "json",
				data: JSON.stringify(obj["bd"]),
				contentType: "application/json; charset=utf-8",
				success: function(){
					$("#mensaje").html("Creando usuario inicial...");
						$.ajax({
							type: 'POST',
							url : "api/IN_crearUsuario",
							dataType: "json",
							data: JSON.stringify(obj["sitio"]),
							contentType: "application/json; charset=utf-8",
							success: function(){
								$("#mensaje").html("Personalizando aplicación...");
								$.ajax({
									type: 'POST',
									url : "api/IN_personalizarAplicacion",
									dataType: "json",
									data: JSON.stringify(obj["sitio"]),
									contentType: "application/json; charset=utf-8",
									success: function(){
										$("#mensaje").html("Terminando la instalación...");
										//redirigir a index
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
	//.has-error .danger
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