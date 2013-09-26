function cargarComboJefeProyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_listaJefeProyectos',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id"]);
				opt.html(data[obj]["nom"]);
				$("#jefeProyecto").append(opt);
			}
		}
	});
}

function cargarComboTipoProyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_listaTipoProyecto',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id"]);
				opt.html(data[obj]["nom"]);
				$("#tipoProyecto").append(opt);
			}
		}
	});
}

$(document).ready(function(){
	//cargar Combos
	cargarComboJefeProyecto();
	cargarComboTipoProyecto();
	//cargarComboEstado();
});

$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		registrarProyectos();
	}
});

function registrarProyectos(){
	var jsonCliente = {
		nom : $("#nombreProyecto").val(),
		jp  : $("#jefeProyecto").val(),
		tp  : $("#tipoProyecto").val(),
		fi  : $("#fechaInicio").val(),
		ff  : $("#fechaFin").val()
    };

    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonCliente),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "../../api/G_registrarProyecto",
        success: function (data) {
            $(location).attr('href','ListaProyectos.html');
        }
    });
}

