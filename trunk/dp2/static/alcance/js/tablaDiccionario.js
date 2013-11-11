var id_proyecto;
if( localStorage.idProyecto ){
	id_proyecto = localStorage.idProyecto;
}
else{
	id_proyecto =1;
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var id_edt = getURLParameter("id_edt");

function cargaLista(data){
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
	$("#exportarAExcel").click(function(){
		var obj={
			id_proyecto : id_proyecto
		}
		$.ajax({
			type: 'GET',
			url : '../../api/AL_getExcel',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data : obj,
			async: false,
			success: function(data){
				window.location.href="../../files/archivoDiccionario.xlsx";
			}
		});
	});
	
	var obj={
		id_proyecto : id_proyecto
	}
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getIdEdtFromIdProyecto',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data : obj,
		async: false,
		success: function(data){
			id_edt = parseInt(data["id_edt"]);
		}
	});

	$.ajax({
		type: 'GET',
		url : '../../api/AL_getListaDiccionario/'+ id_edt,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaLista
	});
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getInfoProyectoFromEDT/'+id_edt,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data){
			$("#nombre_proyecto").html(data["nombre_proyecto"]);
		}
	});
	comprobarLineaBase(function(){
		$("span.glyphicon-edit").hide();
	});
});

/*id_paquete_trabajo, nombre, descripcion,version, ultima_actualizacion,estado*/