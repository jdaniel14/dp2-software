function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var id_paquete = getURLParameter("id_paquete");
var idProyecto = localStorage.idProyecto;

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
		url : '../../api/infoProyectoFromEDT/'+data["id_edt"],
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
		url : '../../api/comboMiembrosEquipo/'+id_proyecto,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_empleado"]);
				opt.html(data[obj]["nombre_completo"]);
				$("#id_empleado").append(opt);
			}
		}
	});
}

function cargarComboEstado(){
	$.ajax({
		type: 'GET',
		url : '../../api/comboEstado',
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



$(document).ready(function(){
	//cargar Combos
	cargarComboResponsable();
	cargarComboMoneda();
	cargarComboEstado();

	$.ajax({
		type: 'GET',
		url : '../../api/detallePaquete/'+id_paquete,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaData
	});
});

$("#modificarPaquete").click(function(){
	if(!validarPaqueteTrabajo()){
		alert("Hay errores en el formulario");
		return;
	}
	var data = $(".form-control");
	var obj = {};
	for(var i=0; i < data.length; i++){
		obj[data[i]["id"]]=data[i]["value"];
	}
	obj["id_paquete_trabajo"]=id_paquete;
	$.ajax({
		type:'POST',
		url: '../../api/modificaPaquete',
		data: JSON.stringify(obj),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(){
			alert("Se registraron las modificaciones con éxito.");
		}
	});
});

function editarPaquete(){
	
}