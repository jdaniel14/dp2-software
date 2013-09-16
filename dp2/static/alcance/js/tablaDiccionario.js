function cargaLista(data){
	for(var i=0; i < data.lenght ; i++){
		var fila = "<tr>";
		for(key in data[i]){
			fila += "<td>"+data[i][key]+"</td>";
		}
		//falta la columna con las acciones
		fila += "</tr>";
		$('#diccionario').append(fila);
	}
}

$(document).ready(function(){
	var inData = {
		id_edt : 1//esto sera actualizado luego sacado de la url
	};
	var outData = {
		id : 1,
		nombre : "fer"
	};
	cargaData(outData);
	/*$.ajax({
		type: 'GET',
		url : '../../backend/alcance/listaDiccionario',
		data: JSON.stringify(inData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaLista
	});*/
});