$("#btnEnviar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		registrarSolicitud();
	}
});

function registrarSolicitud(){
    var cad='';

    if ($("#general").checked==true)    { cad+='1'; } else { cad+='0'; }
    if ($("#alcance").checked==true)    { cad+='1'; } else { cad+='0'; }
    if ($("#cronograma").checked==true) { cad+='1'; } else { cad+='0'; }
    if ($("#costo").checked==true)      { cad+='1'; } else { cad+='0'; }
    if ($("#riesgo").checked==true)     { cad+='1'; } else { cad+='0'; }

    var id=localStorage.getItem("idProyecto");

	var jsonCliente = {
        id_proy     : id,
		flag_cambio : cad,
		motivo      : $("#motivo").val()
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