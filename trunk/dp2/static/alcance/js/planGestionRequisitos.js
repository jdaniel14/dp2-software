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

function cargaTablaResponsable(){
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getComboMiembrosEquipo/'+id_proyecto,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			var tabla= $("#listaResponsables");
			for(var i=0; i< data.length;i++){
				var fila = $("<tr></tr>");
				fila.append("<td>"+data[i]["id_empleado"]+"</td>")
				fila.append("<td>"+data[i]["nombre_corto"]+"</td>");
				fila.append('<td><input type="checkbox" class="form-control responsable" id="responsable" name="responsable" value="'+data[i]["id_empleado"]+'"></td>');
				tabla.append(fila);
			}
		}
	});
}

function checkearPermisos(){
	var rol = localStorage.idRol;
	switch(rol){
		case "3" :
		case "1" :
		    $("#editar").hide();
			$("modificarPlan").hide();
		    break;
	}
}

var noPlan = false;
$(document).ready(function(){
	cargaTitulo();
	cargaTablaResponsable();
	var obj ={
		"idproyecto" : id_proyecto
	}
	$.ajax({
		type: 'POST',
		url : '../../api/AL_mostrarPlanGestionRequisitos',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: function(data){
			if(data == false){
				noPlan = true;
				return;
			}
			for(key in data){
				if(key== "responsable"){
					var lista= data[key];
					var filas = $("#listaResponsables").children();
					for(var i=0; i < filas.length;i++){
						var id = $($(filas[i]).children()[0]).html();
						if(lista.indexOf(id)>= -1){
							$($($(filas[i]).children()[2]).children()[0]).prop("checked",true);
						}
					}
				}
				$('#'+key).html(data[key]);
				$('#'+key).val(data[key]);
				
			}
		}
	});

	function getResponsables(){
		var resp = $(".responsable");
		var responsables=[];
		for(var i=0; i< resp.length;i++){
			if($(resp[i]).is(":checked")){
				responsables.push($(resp[i]).val());
			}
		}
		return responsables;
	}

	function validarPlan(){

		clearErrors(); //limpiar los errores anteriores
		var camposValidos = true;//comenzar a validar campos 
		//la variable camposValidos siempre debe ir al final para evitar lazy evaluation
		camposValidos = validateMandatory("documentacion","El campo es obligatorio") && camposValidos;
		camposValidos = validateMandatory("seguimiento","El campo es obligatorio") && camposValidos;
		showAlert("form-alcance",camposValidos,"Se guardaron los cambios","Hay errores en el formulario");
		return camposValidos;
	}

	$("#modificarPlan").click(function(){
		if (!validarPlan()) return; 
		var data = $(".form-control");
		var obj = {};
		for(var i=0; i < data.length; i++){
			obj[data[i]["id"]]=data[i]["value"];
			obj["responsable"]=getResponsables();
		}
		obj["id_proyecto"] = id_proyecto;
		var ruta;
		if(noPlan){
			ruta = '../../api/AL_crearPlanGestionRequisitos';
		}
		else{
			ruta = '../../api/AL_modificarPlanGestionRequisitos';
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
	});

	$("#editar").click(habilitarCampos);
	deshabilitarCampos();
	comprobarLineaBase(function(){
		$("#editar").hide();
		$("modificarPlan").hide();
	});
	checkearPermisos();
});