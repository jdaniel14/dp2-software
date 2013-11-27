function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var id_paquete = getURLParameter("id_paquete");
var id_proyecto;

if( localStorage.idProyecto ){
	id_proyecto = localStorage.idProyecto;
}
else{
	id_proyecto =1;
}

function cargaData(data){
	for(key in data){
		if($('#'+key).is("select"))continue;
		$('#'+key).html(data[key]);
		$('#'+key).val(data[key])
	}
	var arreglo = $("select");
	for (var i = 0; i < arreglo.length; i++) {
		$(arreglo[i]).val(data[arreglo[i].id]);
		if($(arreglo[i]).hasClass("changeable")){
			$(arreglo[i]).attr("disabled","disabled");
		}
	}
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getInfoProyectoFromEDT/'+data["id_edt"],
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(datos){
			$("#nombre_proyecto").html(datos["nombre_proyecto"]);
		}
	});
}

function cargarComboResponsable(){
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getComboMiembrosEquipo/'+id_proyecto,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_empleado"]);
				opt.html(data[obj]["nombre_corto"]);
				$("#id_empleado").append(opt);
			}
		}
	});
}

function cargarComboEstado(){
	$.ajax({
		type: 'GET',
		url : '../../api/AL_getComboEstado',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_estado"]);
				opt.html(data[obj]["descripcion"]);
				$("#id_estado").append(opt);
			}
		}
	});
}

function cargarComboMoneda(){
	$.ajax({
		type: 'GET',
		url : '../../api/CO_obtenerListaMonedas',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for (var i=0; i < data["lista"].length;i++){
				var opt = $("<option></option>");
				opt.val(data["lista"][i]["idMoneda"]);
				opt.html(data["lista"][i]["nombre"]);
				$("#id_cambio_moneda").append(opt);
			}
		}
	});
}

$("#cancelar").click(function(){
	window.location.href="diccionario.html";
});



$(document).ready(function(){
	//cargar Combos
	cargarComboResponsable();
	cargarComboMoneda();
	cargarComboEstado();

	$.ajax({
		type: 'GET',
		url : '../../api/AL_getDetallePaquete/'+id_paquete,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaData
	});
	//chequear linea base
	comprobarLineaBase(function(){
		$(".form-control").attr("readonly","readonly");
		$("#id_cambio_moneda").attr("disabled","disabled");
		$("#id_estado").attr("disabled","disabled");
		$("#id_empleado").attr("disabled","disabled");
		$("#modificarPaquete").hide();
	});
});

$("#modificarPaquete").click(function(){
	if(!validarPaqueteTrabajo()){
		scrollTo();
		return false;
	}
	var data = $(".form-control");
	var obj = {};
	for(var i=0; i < data.length; i++){
		obj[data[i]["id"]]=data[i]["value"];
	}
	obj["id_paquete_trabajo"]=id_paquete;
	$.ajax({
		type:'POST',
		url: '../../api/AL_modificaPaquete',
		data: JSON.stringify(obj),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data){
			window.location.href = "diccionario.html"
		}
	});
	logChange("Se modificó el paquete de trabajo "+id_paquete);
	scrollTo();
	return false;
});