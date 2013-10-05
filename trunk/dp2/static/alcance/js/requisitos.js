var id_proyecto;
if( localStorage.idProyecto ){
	id_proyecto = localStorage.idProyecto;
}
else{
	id_proyecto =1;
}
function modificarRequisito(){
	$("#selected").removeClass("selected");
	$(this).parent().parent().addClass("selected");
	var obj = {
		"id_requisito": this.getAttribute("idrequisito")
	}
	this.getAttribute("idrequisito");
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getRequisito',
		dataType: "json",
		data: obj,
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
	$("#selected").removeClass("selected");
	$(this).parent().parent().addClass("selected");
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
			$(".selected")[0].remove();
		}
	});
}

function cargaLista(data){

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
	$('#detalleRequisito').modal('hide');
	$(".modificar-requisito").click(modificarRequisito);
	$(".eliminar-requisito").click(eliminarRequisito);
}

function modifica(data){
	var fila = $(".selected")[0];
	var campos = $(fila).children();
	$(campos[0]).html(data["id_requisito"]);
	$(campos[1]).html(data["descripcion"]);
	$(campos[2]).html(data["tipo"]);
	$(campos[3]).html(data["observaciones"]);
	$(campos[4]).html(data["unidad_medida"]);
	$(campos[5]).html(data["valor"]);
	$('#detalleRequisito').modal('hide');
}

function validarRequisito(){
	clearErrors(); //limpiar los errores anteriores
	var camposValidos = true;//comenzar a validar campos 
	//la variable camposValidos siempre debe ir al final para evitar lazy evaluation
	camposValidos = validateMandatory("descripcion","el campo es obligatorio") && camposValidos;
	showAlert("form-requisito",camposValidos,"Se guardaron los cambios","Hay errores en el formulario");
	return camposValidos;
}

function guardarCambios(){
	if(!validarRequisito()){
		return;
	}
	var data = $(".form-control");
	var obj = {};
	for(var i=0; i < data.length; i++){
		if($(data[i]).hasClass("archivo"))continue;
		obj[data[i]["id"]]=data[i]["value"];
	}
	obj["id_proyecto"]= id_proyecto;//hardcode!
	var ruta = "";
	var callback;
	if($('#detalleRequisito').hasClass("insertar")){
		ruta = "../../api/AL_insertaRequisito";
		callback = inserta;
	}

	if($('#detalleRequisito').hasClass("modificar")){
		ruta = "../../api/AL_modificaRequisito";
		callback = modifica;
		obj["tipo"] = $('#id_tipo_requisito option:selected').text();
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

function validarArchivo(){
	clearErrors();
	camposValidos = validateExtention("archivo","docx|doc|pdf|odt|odf|txt","El sistema no permite la subida de este tipo de archivos");
	showAlert("form-gestion-requisitos",camposValidos,"Se guardaron los cambios","Hay errores en el formulario");
	return camposValidos;
}

function subirArchivo(){
	if(!validarArchivo())return false;
	var file = $('#archivo')[0].files[0]; //primer archivo
	var reader = new FileReader();
	reader.readAsText(file, 'UTF-8');
	reader.onloadstart = function(){
		$("#mensajeEspera").html("Subiendo archivo, espere...");
	};
	reader.onload = function(event){
		var dataBinaria = event.target.result;
		var fileName = $('#archivo')[0].files[0].name;
		var obj ={
			"name" : fileName,
			"data" : dataBinaria,
			"id_proyecto" : id_proyecto
		};
		$.ajax({
			type: 'POST',
			url : '../../api/AL_subirArchivo',
			dataType: "json",
			data: JSON.stringify(obj),
			contentType: "application/json; charset=utf-8",
			success:function(){
				$("#mensajeEspera").html("Archivo subido con exito");
			}
		});
	};
}

function cargarPlanGestionRequisitos(){
	var obj ={
		id_proyecto : id_proyecto
	}
	$.ajax({
			type: 'GET',
			url : '../../api/AL_obtenerArchivo',
			dataType: "json",
			data: obj,
			contentType: "application/json; charset=utf-8",
			success:function(data){
				$("#ruta").html('<a href="../'+data["ruta"]+'">'+data["nombre"]+'</a>');
			}
		});
}

function cargaTitulo(){
	var obj ={
		id_proyecto : id_proyecto
	}
	$.ajax({
			type: 'GET',
			url : '../../api/AL_obtenerProyectoById',
			dataType: "json",
			data: obj,
			contentType: "application/json; charset=utf-8",
			success:function(data){
				$("#nombre_proyecto").html(data["nombre_proyecto"]);
			}
	});

}


$(document).ready(function(){
	cargarComboTipo();
	cargaTitulo();
	cargarPlanGestionRequisitos();
	var obj = {
		"id_proyecto":id_proyecto
	};
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getListaRequisitos',
		dataType: "json",
		data: obj,
		contentType: "application/json; charset=utf-8",
		success: cargaLista
	});
	$("#agregar").click(function(){
		$('#id_requisito').html("");
		$('#detalleRequisito').removeClass('insertar');
		$('#detalleRequisito').removeClass('modificar');
		$('#tituloModal').html("Agregar requisito");
		$('#detalleRequisito').addClass('insertar');
		$('#detalleRequisito').modal('show');
	});

	$("#guardar").click(guardarCambios);

	$("#subirArchivo").click(subirArchivo);

});