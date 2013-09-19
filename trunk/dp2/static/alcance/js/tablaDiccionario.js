function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var id_edt = getURLParameter("id_edt");

function cargaLista(data){
	for(var i=0; i < data.lenght ; i++){
		var fila = "<tr>";
		for(key in data[i]){
			fila += "<td>"+data[i][key]+"</td>";
		}
		fila+= '<td><a href="verPaquete.html?id_paquete='+data[i]["id_paquete_trabajo"]+'""><span class="glyphicon glyphicon-search"></a></td>';
		fila+= '<td><a href="editarPaquete.html?id_paquete='+data[i]["id_paquete_trabajo"]+'""><span class="glyphicon glyphicon-edit"></a></td>';
		fila += "</tr>";
		$('#diccionario').append(fila);
	}
}

$(document).ready(function(){

	var outData = {
		id : 1,
		nombre : "fer"
	};
	//cargaLista(outData);
	$.ajax({
		type: 'GET',
		url : '../../api/listaDiccionario'+ id_edt,
		data: JSON.stringify(inData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaLista
	});
});

/*id_paquete_trabajo, nombre, descripcion,version, ultima_actualizacion,estado*/