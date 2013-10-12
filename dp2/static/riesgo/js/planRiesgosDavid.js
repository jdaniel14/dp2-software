var getAllTypeImpactsXLevelImpacts = "../../api/R_listarTipoImpactoXNivelImpacto";


$(document).ready(main);

function main(){
	listarTiposImpactosXNivelImpactos();

}


/*---------------------------------LISTAR NIVEL X TIPO DE IMPACTO-------------------------------------------*/

function listarTiposImpactosXNivelImpactos(){
	$("#tablaTipoImpactoXNivelImpacto").empty();
	var data = {
		idProyecto: idProyectoLocal, 
	};

	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		url: getAllTypeImpactsXLevelImpacts + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			console.log(data);
			agregarDataTiposImpactosXNivelImpactos(data); 
		},
		fail: codigoError
		// fail: agregarDataTiposImpactosXNivelImpactos(listaTipoImpacto)
	});

}

function agregarDataTiposImpactosXNivelImpactos(data){
	var fila = [];
	var columna = {};
	var listaTotal = data;
	var idTipoImpactoXNivelImpacto;
	var descripcionTipoImpacto;
	var tipoImpacto;
	$.each(listaTotal, function (index, valor){
		console.log(valor);
		idTipoImpactoXNivelImpacto=valor.idTipoImpacto;
		descripcionTipoImpacto=valor.descripcionTipoImpacto;
		tipoImpacto=valor.tipoImpacto;
		console.log(idTipoImpactoXNivelImpacto);
		console.log(descripcionTipoImpacto);
		console.log(tipoImpacto);
		$.each(valor.lista, function (j, valor2){
			columna.min = valor2.min;
			columna.max= valor2.max;
			columna.descripcion = valor2.descripcion;
			fila.push(columna);
			columna={};
		});
		try {
			agregaFilaDataTiposImpactosXNivelImpactos(idTipoImpactoXNivelImpacto, descripcionTipoImpacto, tipoImpacto, fila);

			fila=[];
		}
		catch (error){
			console.log(error);
		}
	});
}

function agregaFilaDataTiposImpactosXNivelImpactos(idTipoImpactoXNivelImpacto, descripcionTipoImpacto, tipoImpacto, fila){
	$("#tablaTipoImpactoXNivelImpacto").append("<tr id=\""+idTipoImpactoXNivelImpacto+"\"></tr>");
	var cadena = "";
	var tamano=fila.length;
	cadena+="<td>"+descripcionTipoImpacto+"</td>";
	console.log(cadena);
	$.each(fila, function (index, valor){
		if (tipoImpacto==1){
			if (index==0) {
				// $("#tablaTipoImpactoXNivelImpacto").append("<td> < "+valor.max+" </td>");
				// $("#"+idTipoImpactoXNivelImpacto).html("<td> < "+valor.max+" </td>");
				cadena+="<td> < "+valor.max+" </td>";
			} else if (index==tamano-1) {
				// $("#tablaTipoImpactoXNivelImpacto").append("<td> > "+valor.min+" </td>");
				// $("#"+idTipoImpactoXNivelImpacto).html("<td> > "+valor.min+" </td>");
				cadena+="<td> > "+valor.min+" </td>";
			} else {
				// $("#tablaTipoImpactoXNivelImpacto").append("<td> "+valor.min+" - "+valor.max+" </td>");
				// $("#"+idTipoImpactoXNivelImpacto).html("<td> "+valor.min+" - "+valor.max+" </td>");
				cadena+="<td> "+valor.min+" - "+valor.max+" </td>";
			}
		} else if (tipoImpacto==2) {
			// $("#tablaTipoImpactoXNivelImpacto").append("<td> "+valor.descripcion+" </td>");
			// $("#"+idTipoImpactoXNivelImpacto).html("<td> "+valor.descripcion+" </td>");
			cadena+="<td> "+valor.descripcion+" </td>";
		}
		
	});
	$("#"+idTipoImpactoXNivelImpacto).html(cadena);
	// $("#tablaTipoImpactoXNivelImpacto").append("</tr>");

}


/*---------------------------------FIN LISTAR NIVEL X TIPO DE IMPACTO-------------------------------------------*/