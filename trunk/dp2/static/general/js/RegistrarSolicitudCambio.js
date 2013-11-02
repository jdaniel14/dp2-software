$("#btnEnviar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		registrarSolicitud();
	}
});

function registrarSolicitud(){
    var cad='';

    if ($("#alcance").attr("checked") == "checked")    { cad+='1'; } else { cad+='0'; }
    if ($("#cronograma").attr("checked") == "checked") { cad+='1'; } else { cad+='0'; }
    if ($("#costo").attr("checked") == "checked")      { cad+='1'; } else { cad+='0'; }

    var id=localStorage.getItem("idProyecto");

	var jsonCliente = {
        id_proy       : id,
		flag_cambio   : cad,
		descripcion   : $("#descripcion").val(),
        justificacion : $("#justificacion").val()
    };

    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonCliente),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "../../api/G_registrarSolicitudCambio",
        success: function (data) {
            $(location).attr('href','MenuProyecto.html');
        }
    });
}