function comprobarLineaBase(callback){
	id_proyecto = localStorage.idProyecto;
	$.ajax({
		type: 'GET',
		url : '../../api/G_verificaLineaBase/'+ localStorage.idProyecto,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data){
			if(data["estado_linea_base"]!="false"){
				callback();
			}
		}
	});
}