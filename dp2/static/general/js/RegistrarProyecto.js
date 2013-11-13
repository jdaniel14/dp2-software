$(document).ready(function(){
	//cargar Combos
	cargarComboJefeProyecto();
	cargarComboTipoProyecto();
});

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
			cargarComboProfesionRecurso();
		}
	});
}
function cargarComboProfesionRecurso(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_listaProfesionRecurso',
		dataType: "json",
		async:true,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			var l_profesion = data["profesiones"];
			for(obj in l_profesion){
				var opt = $("<option></option>");
				opt.val(l_profesion[obj]["id"]);
				opt.html(l_profesion[obj]["nom"]);
				$("#profesion").append(opt);
			}
		}
	});
}
function selectProfesion(){
	var colaborador = $("#jefeProyecto").val();
	$.ajax({
		type: 'GET',
		url : '../../api/G_devuelveProfesion/'+ colaborador,
		dataType: "json",
		async:true,
		contentType: "application/json; charset=utf-8",
		success:muestraProfesion
	});
}
function muestraProfesion(data){
	if (data!=null){
		idProfesion=data["idProfesion"];
		profesiones=data["profesiones"];
	}
		$("#profesion").val(idProfesion);
		
	
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
		ff  : $("#fechaFin").val(),
		hh  : $("#costohh").val(),
		idprofact : $("#profesion").val()
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