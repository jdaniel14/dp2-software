function cargaData(data){
	for(key in data){
		$('#'+key).html(data[key]);
	}
}

function cargarComboResponsable(){
	$.ajax({
		type: 'GET',
		url : '../../api/comboResponsables',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_empleado"]);
				opt.html(data[obj]["nombre"]);
				$("#empleado").append(opt);
			}
		}
	});
}

function cargarComboEstado(){
	$.ajax({
		type: 'GET',
		url : '../../api/comboEstado',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_estado"]);
				opt.html(data[obj]["descripcion"]);
				$("#estado").append(opt);
			}
		}
	});
}

function cargarComboCompania(){
	$.ajax({
		type: 'GET',
		url : '../../api/comboCompania',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id_compania"]);
				opt.html(data[obj]["descripcion"]);
				$("#compania_responsable").append(opt);
			}
		}
	});
}

$(document).ready(function(){
	//cargar Combos
	cargarComboResponsable();
	cargarComboCompania();
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