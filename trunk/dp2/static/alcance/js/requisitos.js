$("#agregar").click(function(){
	$('#detalleRequisito').removeClass('insertar');
	$('#detalleRequisito').removeClass('modificar');
	$('#tituloModal').html("Agregar requisito");
	$('#detalleRequisito').addClass('insertar');
	$('#detalleRequisito').modal('show');
});

$("#subirArchivo").click(function(){
	var str = JSON.stringify($('#archivo')[0].files);
	console.log(str);
});

$(".modificar-requisito").click(function(){
	console.log(this);
	$('#detalleRequisito').removeClass('insertar');
	$('#detalleRequisito').removeClass('modificar');
	$('#tituloModal').html("Modificar requisito");
	$('#detalleRequisito').addClass('modificar');
	$('#detalleRequisito').modal('show');
});

function cargaLista(){
	var data =[{'id_requisito':1,
		'descripcion' : 'primer requisito',
		'id_tipo_requisito': 1,
		'observaciones':'negociar a deseable',
		'unidad_medida': 'puntos de funcion',
		'valor': 4},
		{'id_requisito':2,
		'descripcion' : 'segundo requisito',
		'id_tipo_requisito': 1,
		'observaciones':'debe ser exigible',
		'unidad_medida': 'puntos de funcion',
		'valor': 8}];

	for(var i=0; i < data.length;i++){
		var fila = "<tr>";
		for(key in data[i]){
			fila += "<td>"+data[i][key]+"</td>";
		}
		fila+= '<td class"modificar-requisito"><a class="modificar-requisito" idRequisito="'+data[i]["id_requisito"]+'"><span class="glyphicon glyphicon-edit"></a></td>';
		fila+= '<td><a class="eliminar-requisito" idRequisito="'+data[i]["id_requisito"]+'"><span class="glyphicon glyphicon-delete"></a></td>';
		fila += "</tr>";
		$('#listaRequisitos').append(fila);
	}

}

$(document).ready(function(){
	//cargarComboTipo();
	var obj = {
		"id_proyecto":1
	};
	cargaLista();
	/*$.ajax({
		type: 'GET',
		url : '../../api/listaRequisitos',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: cargaLista
	});*/
});