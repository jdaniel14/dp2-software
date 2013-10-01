
function modificarRequisito(){

	var obj = {
		"id_requisito": this.getAttribute("idrequisito")
	}
	this.getAttribute("idrequisito");
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getRequisito',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: function(data){
			for(key in data){
				if($('#'+key).is("select"))continue;
				$('#'+key).html(data[key]);
				$('#'+key).val(data[key]);
			}
			$('#id_tipo_requisito').val(data["id_tipo_requisito"]);
		}
	});
	$('#detalleRequisito').removeClass('insertar');
	$('#detalleRequisito').removeClass('modificar');
	$('#tituloModal').html("Modificar requisito");
	$('#detalleRequisito').addClass('modificar');
	$('#detalleRequisito').modal('show');
}

function eliminarRequisito(){
	var obj = {
		"id_requisito": this.getAttribute("idrequisito")
	}
	$.ajax({
		type: 'POST',
		url : '../../api/AL_eliminaRequisito',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: function(){
			this.parent().parent().remove();
		}
	});
}

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
		fila+= '<td><a class="modificar-requisito" idRequisito="'+data[i]["id_requisito"]+'"><span class="glyphicon glyphicon-edit"></a></td>';
		fila+= '<td><a class="eliminar-requisito" idRequisito="'+data[i]["id_requisito"]+'"><span class="glyphicon glyphicon-remove"></a></td>';
		fila += "</tr>";
		$('#listaRequisitos').append(fila);
	}
	$(".modificar-requisito").click(modificarRequisito);
	$(".eliminar-requisito").click(eliminarRequisito);
}

function cargarComboTipo(){
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getTiposRequisito',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success: function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_tipo_requisito"]);
				opt.html(data[obj]["descripcion"]);
				$("#id_tipo_requisito").append(opt);
			}
		}
	});
}

function inserta(data){
	var fila = "<tr>";
	for(key in data){
		fila += "<td>"+data[key]+"</td>";
	}
	fila+= '<td><a class="modificar-requisito" idRequisito="'+data["id_requisito"]+'"><span class="glyphicon glyphicon-edit"></a></td>';
	fila+= '<td><a class="eliminar-requisito" idRequisito="'+data["id_requisito"]+'"><span class="glyphicon glyphicon-remove"></a></td>';
	fila += "</tr>";
	$('#listaRequisitos').append(fila);
}

function modifica(data){
	var fila = this.parent().parent();
	var campos = fila.children();
	campos[0].html(data["id_requisito"]);
	campos[1].html(data["descripcion"]);
	campos[2].html(data["tipo"]);
	campos[3].html(data["observaciones"]);
	campos[4].html(data["unidad_medida"]);
	campos[5].html(data["valor"]);
}

function validarRequisito(){
	return true;
}

function guardarCambios(){
	if(!validarRequisito()){
		alert("Hay errores en el formulario");
		return;
	}
	var data = $(".form-control");
	var obj = {};
	for(var i=0; i < data.length; i++){
		if($(data[i]).hasClass("archivo"))continue;
		obj[data[i]["id"]]=data[i]["value"];
	}
	var ruta = "";
	var callback;
	if($('#detalleRequisito').hasClass("insertar")){
		ruta = "../../api/AL_insertaRequisito";
		callback = inserta;
	}

	if($('#detalleRequisito').hasClass("modificar")){
		ruta = "./../api/AL_modificaRequisito";
		callback = modifica;
	}
	$.ajax({
		type: 'POST',
		url : ruta,
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: callback
	});
}


$(document).ready(function(){
	cargarComboTipo();
	var obj = {
		"id_proyecto":1
	};
	cargaLista();
	/*$.ajax({
		type: 'GET',
		url : '../../api/AL_getListaRequisitos',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: cargaLista
	});*/
	$("#agregar").click(function(){
		$('#id_requisito').html("");
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

	$("#guardar").click(guardarCambios);

});