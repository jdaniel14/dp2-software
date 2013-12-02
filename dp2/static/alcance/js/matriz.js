function inicializaFechas(){
        $('.calendar').removeClass('hasDatepicker').datepicker({ dateFormat: 'yy-mm-dd' });

}

function modificarRequisito(){
	$(".selected").removeClass("selected");
	$(".alert").remove();
	$(this).parent().parent().addClass("selected");
	var obj = {
		"id_requisito": this.getAttribute("idrequisito")
	}
	this.getAttribute("idrequisito");
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getRequisitoMatriz',
		dataType: "json",
		data: obj,
		contentType: "application/json; charset=utf-8",
		success: function(data){
			$("#id_requisito").val(data["id_requisito"]);
			$("#descripcion").html(data["descripcion"]);
			$("#solicitado").val(data["solicitud"]);
			$("#objetivo").val(data["fundamento_incorporacion"]);
			$("#idprioridadR").val(data["id_prioridad_requisito"]);
			$("#idestadoR").val(data["id_estado_requisito"]);
			$("#criterio").val(data["criterio_aceptacion"]);
			$("#idmiembros").val(data["id_miembros_equipo"]);
			$("#cargo").val(data["cargo"]);
		}
	});
	$('#detalleRequisito').modal('show');
}

function listarFases(){
	$(".selected").removeClass("selected");
	$(this).parent().parent().addClass("selected");
	var obj = {
		"id_requisito": this.getAttribute("idrequisito")
	}
	$("#id_requisito_fases").val(this.getAttribute("idrequisito"));

	$.ajax({
		type: 'POST',
		url : '../../api/AL_mostrarRequisitoXFase',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: function(data){
			var arr = data["arrRequisito"];
			var tabla = $('#dataEntregables');
			tabla.html("");
			for(var i =0; i< arr.length; i++){
				if(arr[i].idFase == null) return;
				var fila = $('<tr></tr>');
				fila.append('<td>'+arr[i].idFase+'</td>');
				fila.append('<td>'+arr[i].descFase+'</td>');
				fila.append('<td><input type="text" class="form-control calendar" value="'+(arr[i].fecha == "0000-00-00" ? "": arr[i].fecha)+'" readOnly / ></td>');
				fila.append('<td><input class="form-control"  value="'+arr[i].entregable+'" / ></td>');
				tabla.append(fila);
			}
			inicializaFechas();
		}
	});
	$('#tablaEntregables').modal('show');

}

function llena_requisitos(requisitos){
	var tabla = $('#dataTickets');
	for(var i=0; i< requisitos.length;i++){
		var fila = $("<tr>");
		fila.append("<td>"+requisitos[i].idrequisito+"</td>");
		fila.append("<td>"+requisitos[i].descripcion+"</td>");
		fila.append("<td>"+requisitos[i].solicitado+"</td>");
		fila.append("<td>"+requisitos[i].cargo+"</td>");
		fila.append("<td>"+requisitos[i].fundamento+"</td>");
		fila.append("<td>"+requisitos[i].nomPrioridad+"</td>");
		fila.append("<td>"+requisitos[i].nomEstado+"</td>");
		fila.append("<td>"+requisitos[i].nomCategoria+"</td>");
		fila.append("<td>"+requisitos[i].criterioAceptacion+"</td>");
		fila.append("<td>"+requisitos[i].nombre+"</td>");
		fila.append(
			'<td><a class="modificar-requisito" idRequisito="'+requisitos[i].idrequisito+'"><span class="glyphicon glyphicon-edit"></a></td>'+
			'<td><a class="listar-fases" idRequisito="'+requisitos[i].idrequisito+'"><span class="glyphicon glyphicon-list"></a>'+'</td>'
		);
		tabla.append(fila);
	}
	$(".modificar-requisito").click(modificarRequisito);
	$(".listar-fases").click(listarFases);
	comprobarLineaBase(function(){
		$(".modificar-requisito").hide();
		$(".form-control").attr("disabled","disabled");
		$("#guardarEntregables").hide();
	});
	checkearPermisos();
}

function cargaEstados(data){
	for(obj in data){
		var opt = $("<option></option>");
		opt.val(data[obj]["idestado"]);
		opt.html(data[obj]["descripcion"]);
		$("#idestadoR").append(opt);
	}
}

function cargaPrioridades(data){
	for(obj in data){
		var opt = $("<option></option>");
		opt.val(data[obj]["idprioridad"]);
		opt.html(data[obj]["descripcion"]);
		$("#idprioridadR").append(opt);
	}
}

function cargaMiembros(){
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getComboMiembrosEquipo/'+localStorage.getItem("idProyecto"),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				var opt2 = $("<option></option>");
				opt.val(data[obj]["id_empleado"]);
				opt.html(data[obj]["nombre_corto"]);
				opt2.val(data[obj]["id_miembros_equipo"]);
				opt2.html(data[obj]["nombre_corto"]);
				$("#solicitado").append(opt);
				$("#idmiembros").append(opt2);
			}
		}
	});
}


function modifica(data){
	var fila = $(".selected")[0];
	var campos = $(fila).children();
	$(campos[2]).html(data[0]["solicitado"]);
	$(campos[3]).html(data[0]["cargo"]);
	$(campos[4]).html(data[0]["fundamento"]);
	$(campos[5]).html(data[0]["nomPrioridad"]);
	$(campos[6]).html(data[0]["nomEstado"]);
	$(campos[7]).html(data[0]["nomCategoria"]);
	$(campos[8]).html(data[0]["criterioAceptacion"]);
	$(campos[9]).html(data[0]["nombre"]);
	$("#form-requisito")[0].reset();
	$('#detalleRequisito').modal('hide');
}

function guardarEntregables(){
	/*if(!validarRequisito()){
		return;
	}*/ //validacioneeeeees!!
	var entregables = $("#dataEntregables").children();
	for(var i=0; i< entregables.length;i++){
		var obj={};
		obj["id_requisito"]= $("#id_requisito_fases").val();
		obj["idFase"]= $($(entregables[i]).children()[0]).html();
		obj["fecha"]= $($($(entregables[i]).children()[2]).children()[0]).val();
		obj["entregable"]= $($($(entregables[i]).children()[3]).children()[0]).val();
		$.ajax({
			type: 'POST',
			url : '../../api//AL_modificarRequistoXFase',
			dataType: "json",
			async: false,
			data: JSON.stringify(obj),
			contentType: "application/json; charset=utf-8"
		});
	}
	$('#tablaEntregables').modal('hide');
}

function guardarCambios(){	
	if(!validarRequisito()){
		return;
	}
	var obj = {};
	obj["id_requisito"]= $("#id_requisito").val();
	obj["solicitado"]= $('#solicitado').val();
	obj["cargo"]= $('#cargo').val();
	obj["fundamento"]= $('#objetivo').val();
	obj["idprioridadR"]= $('#idprioridadR').val();
	obj["idestadoR"]= $('#idestadoR').val();
	obj["criterioAceptacion"]= $('#criterio').val();
	obj["idmiembros"]= $('#idmiembros').val();
	$.ajax({
		type: 'POST',
		url : '../../api/AL_modificarRequisitoM',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: modifica,
	});
}

function checkearPermisos(){
	var rol = localStorage.idRol;
	switch(rol){
		case "1" :
		    $(".modificar-requisito").hide();
			$(".form-control").attr("disabled","disabled");
			$("#guardarEntregables").hide();
		    break;
	}
}

function validarRequisito(){
	clearErrors(); //limpiar los errores anteriores
	var camposValidos = true;//comenzar a validar campos 
	//la variable camposValidos siempre debe ir al final para evitar lazy evaluation
	camposValidos = validateMandatory("solicitado","el campo es obligatorio") && camposValidos;
	showAlert("form-requisito",camposValidos,"Se guardaron los cambios","Hay errores en el formulario");
	return camposValidos;
}


$(document).ready(function(){
	$("#guardar").click(guardarCambios);
	$("#guardarEntregables").click(guardarEntregables);
	
	var jsonCliente = {
        idproyecto : localStorage.getItem("idProyecto")                
    };

    $.ajax({
			type: 'GET',
			url : '../../api/AL_obtenerProyectoById',
			dataType: "json",
			data: {id_proyecto:localStorage.getItem("idProyecto") },
			contentType: "application/json; charset=utf-8",
			success:function(data){
				$("#nombre_proyecto").html(data["nombre_proyecto"]);
			}
	});

	$.ajax({
		type: 'POST',
		url : '../../api/AL_mostrarFases',
		dataType: "json",
		data: JSON.stringify(jsonCliente),
		contentType: "application/json; charset=utf-8",
		async: false,
		success: function(data){
			if(data["listaFase"].length ==0){
				$("#noFases").show();
			}
		}
	});

    cargaMiembros();
    $.ajax({
      type: "POST",
      data: JSON.stringify(jsonCliente),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      url: "../../api/AL_mostrarMatriz",
      success: function (data) {
          var dataprioridad = data.ar_prioridad;
          var dataestado = data.ar_estado;
          var requisitos = data.requisitos;
          cargaPrioridades(dataprioridad);
          cargaEstados(dataestado); 
          llena_requisitos( requisitos , dataestado );
      }
 	});
 	$(".calendar").datepicker({ dateFormat: 'yy-mm-dd' });
 	checkearPermisos();
});
