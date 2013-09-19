function cargaData(data){
	for(key in data){
		if($('#'+key).is("select"))continue;
		$('#'+key).html(data[key]);
		$('#'+key).val(data[key])
	}
	var estado = $("#id_estado");
	var responsable = $("#id_empleado_responsable");
	var organizacion = $("#id_compania_responsable");
	var arreglo = $("select");
	for (var i = 0; i < arreglo.length; i++) {
		$(arreglo[i]).val(data[arreglo[i].id]);
		if($(arreglo[i]).hasClass("changeable")){
			$(arreglo[i]).attr("disabled","disabled");
		}
	}
}

function cargarComboResponsable(){
	$.ajax({
		type: 'GET',
		url : '../../api/comboResponsables',
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

/*function cargarComboCompania(){
	$.ajax({
		type: 'GET',
		url : '../../api/comboCompania',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_compania_responsable"]);
				opt.html(data[obj]["descripcion"]);
				$("#id_compania_responsable").append(opt);
			}
		}
	});
}*/

$(document).ready(function(){
	//cargar Combos
	cargarComboResponsable();
	//cargarComboCompania();
	cargarComboEstado();

	var id_paquete = 1;//esto sera actualizado luego sacado de la url
	$.ajax({
		type: 'GET',
		url : '../../api/detallePaquete/'+id_paquete,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaData
	});
});

function editarPaquete(){
	var data = $(".form-control");
	var obj = new Object();
	for(var i=0; i < data.length; i++){
		obj[data[i]["id"]]=data[i]["value"];
	}
	$.ajax({
		type:'POST',
		url: '../../api/editarPaquete',
		data: JSON.stringify(obj),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
	});
}