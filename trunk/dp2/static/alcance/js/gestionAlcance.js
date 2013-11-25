var id_proyecto;
if( localStorage.idProyecto ){
	id_proyecto = localStorage.idProyecto;
}
else{
	id_proyecto =1;
}

function deshabilitarCampos(){
	var campos = $(".form-control").prop("disabled",true);
}

function habilitarCampos(){
	var campos = $(".form-control").prop("disabled",false);
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

function checkearPermisos(){
	var rol = localStorage.idRol;
	switch(rol){
		case "1" :
		    $("#editar").hide();
		    break;
	}
}

var noAlcance;
$(document).ready(function(){
	cargaTitulo();
	$("#exportar").attr("href","../../api/AL_getPDF?idproyecto="+id_proyecto);
	var obj ={
		"idproyecto" : id_proyecto
	}
	$.ajax({
		type: 'POST',
		url : '../../api/AL_mostrarAlcance',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		async : false,
		success: function(data){
			if(data == false){
				noAlcance = true;
				return;
			}
			for(key in data){
				$('#'+key).html(data[key]);
				$('#'+key).val(data[key]);
			}
		}
	});

	$("#modificarAlcance").click(function(){
		if (!validarAlcance()) return; 
		var data = $(".form-control");
		var obj = {};
		for(var i=0; i < data.length; i++){
			obj[data[i]["id"]]=data[i]["value"];
		}
		obj["idproyecto"] = id_proyecto;
		var ruta;
		if(noAlcance){
			ruta = '../../api/AL_crearAlcance';
		}
		else{
			ruta = '../../api/AL_modificarAlcance'
		}



		$.ajax({
			type: 'POST',
			url : ruta,
			dataType: "json",
			data: JSON.stringify(obj),
			contentType: "application/json; charset=utf-8"
		});
		deshabilitarCampos();
		scrollTo();
		logChange("Se modificó la declaración del alcance");
	});

	$("#editar").click(habilitarCampos);
	deshabilitarCampos();
	comprobarLineaBase(function(){
		$("#editar").hide();
		$("#modificarAlcance").hide();
	});
	checkearPermisos();
});