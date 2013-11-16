$(document).ready(function(){
	//cargar Combos
	cargarComboProfesionRecurso();
	validacion();
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
	if ($("#registrarRecurso").valid()) {
		bootbox.dialog({
		  message: "¿Estás seguro que deseas guardar los cambios realizados?",
		  title: "Confirmación",
		  buttons: {
		    success: {
		      label: "Sí",
		      className: "btn-success",
		      callback: function() {
		        registrarRecurso();
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

function validacion() {
	$('#registrarRecurso').validate({
	    rules: {
	      nombreRecurso		: { required: true, lettersonly: true },
	      apellidoRecurso	: { required: true, lettersonly: true },
	      profesionRecurso 	: { required: true },
	      correoRecurso		: { required: true, email: true },
	      pagoMensual		: { required: true, number: true }
	    },

	    messages: {
	      nombreRecurso		: { required: 'Debe ingresar el nombre del recurso', lettersonly: 'Debe ingresar solo letras' },
	      apellidoRecurso	: { required: 'Debe ingresar el apellido del recurso', lettersonly: 'Debe ingresar solo letras' },
	      profesionRecurso 	: { required: 'Debe elegir una profesión' },
	      correoRecurso		: { required: 'Debe ingresar un correo electrónico' , email: 'Debe ingresar un correo electrónico válido' },
	      pagoMensual		: { required: 'Debe ingresar un pago mensual' , number: 'Debe ingresar solo números' }
	    },

		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
		}
	  });
}

//Se implementa la regla "lettersonly" para validar que se ingresen solo letras
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");