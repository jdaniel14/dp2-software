$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		registrarSolicitud();
	}
});

function registrarSolicitud(){
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
        url: "../../api/G_registrarSolicitud",
        success: function (data) {
            $(location).attr('href','MenuProyecto.html');
        }
    });
}