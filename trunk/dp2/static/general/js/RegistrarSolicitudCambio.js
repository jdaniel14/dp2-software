$(document).ready(function(){
  validacion();
});

$("#btnEnviar").click(function(){
	if ($("#registrarSolicitud").valid()) {
        bootbox.dialog({
          message: "¿Estás seguro que deseas guardar los cambios realizados?",
          title: "Confirmación",
          buttons: {
            success: {
              label: "Sí",
              className: "btn-success",
              callback: function() {
                registrarSolicitud();
              }
            },
            danger: {
              label: "No",
              className: "btn-danger",
              callback: function() {
                 //cierra el modal
              }
            },
          }
        });
    } else { return false; }
});

function registrarSolicitud(){
    var cad='';

    if ($("#alcance").is(":checked"))    { cad+='1'; } else { cad+='0'; }
    if ($("#cronograma").is(":checked")) { cad+='1'; } else { cad+='0'; }
    if ($("#costo").is(":checked"))      { cad+='1'; } else { cad+='0'; }

    var id=localStorage.getItem("idProyecto");

	var jsonCliente = {
        id_proy       : id,
		    flag_cambio   : cad,
		    descripcion   : $("#descripcion").val(),
        justificacion : $("#justificacion").val(),
        impacto       : $('#impacto').val()
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

function validacion() {
    $('#registrarSolicitud').validate({
        rules: {
          modulo        : { required: true },
          descripcion   : { required: true },
          justificacion : { required: true },
          impacto       : { required: true }
        },

        messages: {
          modulo        : { required: 'Debe elegir al menos una opción' },
          descripcion   : { required: 'Debe ingresar la descripción de la solicitud de cambio' },
          justificacion : { required: 'Debe ingresar la justificación de la solicitud de cambio' },
          impacto       : { required: 'Debe ingresar el impacto de la solicitud de cambio' }
        },

        //posicionar el mensaje de error despues del ultimo checkbox
        errorPlacement: function(error, element) {
            if (element.attr("type") == "checkbox") error.insertAfter($(".checkbox-modulo").last());
            else error.insertAfter(element);
        },

        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        
        success: function(element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        }
      });
}