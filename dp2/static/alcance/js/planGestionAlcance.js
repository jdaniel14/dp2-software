var id_proyecto;
if( localStorage.idProyecto ){
	id_proyecto = localStorage.idProyecto;
}
else{
	id_proyecto =1;
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

function guardarCambios(){
	var objAlcance = {
		"idproyecto" : id_proyecto,
		"idestado" : $("#id_estado_alcance").val()
	}
	$.ajax({
		type:'POST',
		url: '../../api/AL_modificarEstadoAlcance',
		data: JSON.stringify(objAlcance),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(){
			showAlert("form-plan",true,"Se guardaron los cambios en el alcance","Hay errores en el formulario");
		}
	});
	var objEDT = {
		"idproyecto" : id_proyecto,
		"idestado" : $("#id_estado_edt").val()
	}
	$.ajax({
		type:'POST',
		url: '../../api/AL_modificarEstadoEDT',
		data: JSON.stringify(objEDT),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(){
			showAlert("form-plan",true,"Se guardaron los cambios en el EDT","Hay errores en el formulario");
		}
	});
}

function cargarComboEstadoEDT(){
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getListaEstadoEDT',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_estado"]);
				opt.html(data[obj]["descripcion"]);
				$("#id_estado_edt").append(opt);
			}
		}
	});
}

function cargarComboEstadoAlcance(){
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getListaEstadoAlcance',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_estado_alcance"]);
				opt.html(data[obj]["descripcion"]);
				$("#id_estado_alcance").append(opt);
			}
		}
	});
}

function cargarEstados(){
   var obj = {"idproyecto":id_proyecto};
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getEstadoAlcance',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
    data: obj,
		success:function(data){
			$("#id_estado_alcance").val(data["id_estado_alcance"]);
			if(data["id_estado_alcance"]) $("#id_estado_alcance").removeAttr("disabled");
		}
	});
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getEstadoEDT',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
    data : obj,
    success:function(data){
			$("#id_estado_edt").val(data["id_estado"]);
			if(data["id_estado"]) $("#id_estado_edt").removeAttr("disabled");
		}
	});

}

function cargaTablaCambios(data){
	var tabla = $('#cambiosAlcance');
	for(var i=0; i< data.length; i++){
		var fila = $('<tr>');
		fila.append('<td>'+data[i]["id_cambio"]+'</td>');
		fila.append('<td>'+data[i]["descripcion"]+'</td>');
		fila.append('<td>'+data[i]["fecha"]+'</td>');
		fila.append('<td>'+data[i]["responsable"]+'</td>');
		fila.append('<td>'+data[i]["estado"]+'</td>');
		tabla.append(fila);
	}
}

function cargarTabla(){
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getListaCambios',
		dataType: "json",
		data: {"id_proyecto":id_proyecto},
		contentType: "application/json; charset=utf-8",
		success:function(data){
			cargaTablaCambios(data);
		}
	});	
}

function checkearPermisos(){
	var rol = localStorage.idRol;
	switch(rol){
		case "3" :
			$(".table-resonsive").hide();
		case "1" :
		    $("#id_estado_edt").attr("disabled","disabled");
		    $("#id_estado_alcance").attr("disabled","disabled");
		    $("#guardarCambios").hide();
		    break;
	}
}

$(document).ready(function(){
	cargaTitulo();
	cargarComboEstadoEDT();
	cargarComboEstadoAlcance();
	cargarEstados();
    cargarTabla();
	$("#guardarCambios").click(guardarCambios);
	comprobarLineaBase(function(){
		$("id_estado_edt").attr("disabled","disabled");
		$("id_estado_alcance").attr("disabled","disabled");
		$("#guardarCambios").hide();
	});
	checkearPermisos();
});