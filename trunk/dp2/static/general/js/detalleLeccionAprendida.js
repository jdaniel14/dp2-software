	$.ajax({
		type: 'GET',
		url : '../../api/G_devuelveLeccionAprendida/'+id_leccion_aprendida,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaData
	});