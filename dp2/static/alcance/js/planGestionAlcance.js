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
	var data = $(".form-control");
	var obj = {};
	for(var i=0; i < data.length; i++){
		obj[data[i]["id"]]=data[i]["value"];
	}
	obj["idproyecto"] = id_proyecto;
	$.ajax({
		type:'POST',
		url: '../../api/modificaEstadosAlcance',
		data: JSON.stringify(obj),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
	});
}

function cargarComboEstadoEDT(){
	$.ajax({
		type: 'GET',
		url : '../../api/comboEstado',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_estado_edt"]);
				opt.html(data[obj]["descripcion"]);
				$("#id_estado").append(opt);
			}
		}
	});
}

function cargarComboEstadoAlcance(){
	$.ajax({
		type: 'GET',
		url : '../../api/comboEstadoAlcance',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_estado_alcance"]);
				opt.html(data[obj]["descripcion"]);
				$("#id_estado").append(opt);
			}
		}
	});
}

function cargarEstados(){
	$.ajax({
		type: 'GET',
		url : '../../api/getPlanGestionAlcance',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(data){
			var arreglo = $("select");
			for (var i = 0; i < arreglo.length; i++) {
				$(arreglo[i]).val(data[arreglo[i].id]);
			}
		}
	});
}

function cargarTabla(){
	$.ajax({
		type: 'GET',
		url : '../../api/getCambiosAlcance',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(data){
			
		}
	});	
}

$(document).ready(function(){
	cargaTitulo();
	cargarComboEstadoEDT();
	cargarComboEstadoAlcance();
	cargarEstados();
	$("#guardarCambios").click(guardarCambios);
});