$(document).ready(function(){
	//cargar Combos
	//cargarComboRolRecurso();
});

function cargarComboJefeProyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_listaRolRecurso',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var l_rol = data["l_rol"];
				var opt = $("<option></option>");
				opt.val(data[obj]["id"]);
				opt.html(data[obj]["nom"]);
				$("#rolRecurso").append(opt);
			}
		}
	});
}

$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		registrarRecurso();
	}
});

function registrarRecurso(){
	var jsonRecurso = {
		nr 	: $("#nombreRecurso").val(),
		pr  : $("#profesionRecurso").val(),
		cr  : $("#correoRecurso").val(),
		fi  : $("#fechaIngreso").val()
    };
    alert(JSON.stringify(jsonRecurso));
    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonRecurso),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "../../api/G_registrarRecurso",
        success: function (data) {
            $(location).attr('href','RegistrarRecursoHumano.html.html');
        }
    });
}