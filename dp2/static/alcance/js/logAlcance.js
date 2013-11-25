function logChange(descripcion){
	var date = new Date().toLocaleString();

	$.ajax({
		type: 'GET',
		url : '../../api/G_verificaLineaBase/'+ localStorage.idProyecto,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data){
			if(data["estado_linea_base"]!="false"){
				var objCambio = {
					"idproyecto": parseInt(localStorage.getItem("idProyecto")),
					"descripcion": descripcion,
					"fecha": new Date().toLocaleString(),
					"id_estado": 1,
					"id_miembros_equipo": parseInt(localStorage.getItem("idUsuario"))
				};
				$.ajax({
			        type:'POST',
			        url: '../../api/AL_registrarCambio',
			        data: JSON.stringify(objCambio),
			        dataType: "json",
			        contentType: "application/json; charset=utf-8"
			    });
			}
		}
	});
	

}