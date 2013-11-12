$(document).ready(function(){
	//cargar Combos
	cargarComboProfesionRecurso();
});

function cargarComboProfesionRecurso(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_listaProfesionRecurso',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			var l_profesion = data["profesiones"];
			for(obj in l_profesion){
				var opt = $("<option></option>");
				opt.val(l_profesion[obj]["id"]);
				opt.html(l_profesion[obj]["nom"]);
				$("#profesionRecurso").append(opt);
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
	var nombre = $("#nombreRecurso").val();
	var apellido = $("#apellidoRecurso").val();
	var concat = nombre + "." + apellido;
	var jsonRecurso = {
		nr 	: $("#nombreRecurso").val(),
		ar 	: $("#apellidoRecurso").val(),
		pr  : $("#profesionRecurso").val(),
		cr  : $("#correoRecurso").val(),
		pm  : $("#pagoMensual").val(),
		est : "ACTIVO",
		usr : concat,
		psw : concat
    };
    alert(JSON.stringify(jsonRecurso));
    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonRecurso),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "../../api/G_registrarRecurso",
        success: function (data) {
            $(location).attr('href','RegistrarRecursoHumano.html');
        }
    });
}