function cargaData(data){
	for(key in data){
		$('#'+key).html(data[key]);
	}
}

$(document).ready(function(){
	//loadCombos
	var inData = {
		id_paquete : 1//esto sera actualizado luego sacado de la url
	};
	var outData = {
		id : 1,
		nombre : "fer"
	};
	cargaData(outData);
	/*$.ajax({
		type: 'GET',
		url : '../../backend/alcance/detallePaquete',
		data: JSON.stringify(inData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaData
	});*/
});