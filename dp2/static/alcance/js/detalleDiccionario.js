function cargaData(data){
	for(key in data){
		$('#'+key).html(data[key]);
	}
}

function cargarComboResponsable(){
	$.ajax({
		type: 'GET',
		url : '../../backend/alcance/comboResponsables',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(obj["id_empleado"]);
				opt.html(obj["nombre"]);
				$("#empleado").append(opt);
			}
		}
	});
}

function cargarComboEstado(){
	$.ajax({
		type: 'GET',
		url : '../../backend/alcance/comboEstado',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(obj["id_estado"]);
				opt.html(obj["descripcion"]);
				$("#estado").append(opt);
			}
		}
	});
}

function cargarComboCompania(){
	$.ajax({
		type: 'GET',
		url : '../../backend/alcance/comboCompania',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(obj["id_compania"]);
				opt.html(obj["descripcion"]);
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

	var inData = {
		id_paquete : 1//esto sera actualizado luego sacado de la url
	};
	var outData = {
		id : 1,
		nombre : "fer"
	};
	cargaData(outData);
	$.ajax({
		type: 'GET',
		url : '../../backend/alcance/detallePaquete',
		data: JSON.stringify(inData),
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
		url: '../../backend/alcance/editarPaquete',
		data: JSON.stringify(obj),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
	});
}