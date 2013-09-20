function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var id_edt = getURLParameter("id_edt");

function cargaLista(data){
	console.log("cargo!");
	console.log(data);
	for(var i=0; i < data.length ; i++){
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
	$.ajax({
		type: 'GET',
		url : '../../api/listaDiccionario/'+ id_edt,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaLista
	});
	$.ajax({
		type: 'GET',
		url : '../../api/infoProyectoFromEDT/'+id_edt,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data){
			$("#nombre_proyecto").html(data["nombre_proyecto"]);
		}
	});
});

/*id_paquete_trabajo, nombre, descripcion,version, ultima_actualizacion,estado*/