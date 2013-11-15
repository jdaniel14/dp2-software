$(document).ready(function(){
	//cargar Combos
	cargarComboJefeProyecto();
	cargarComboTipoProyecto();
	validacion();
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
	if ($("#registrarProyecto").valid()) {
		bootbox.dialog({
		  message: "¿Estás seguro que deseas guardar los cambios realizados?",
		  title: "Confirmación",
		  buttons: {
		    success: {
		      label: "Sí",
		      className: "btn-success",
		      callback: function() {
		        registrarProyectos();
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

function validacion() {
	$('#registrarProyecto').validate({
	    rules: {
	      nombreProyecto : { required: true },
	      jefeProyecto 	 : { required: true },
	      profesion 	 : { required: true },
	      costohh		 : { required: true, number: true },
	      tipoProyecto 	 : { required: true },
	      fechaInicio	 : { required: true },
	      fechaFin 		 : { required: true, greaterThan: "#fechaInicio" }
	    },

	    messages: {
	      nombreProyecto : { required: 'Debe ingresar el nombre del proyecto' },
	      jefeProyecto 	 : { required: 'Debe elegir un jefe de proyecto' },
	      profesion 	 : { required: 'Debe elegir la profesión del jefe de proyecto' },
	      costohh 		 : { required: 'Debe ingresar el costo', number: 'Debe ingresar solo números' },
	      tipoProyecto 	 : { required: 'Debe elegir un tipo de proyecto' },
	      fechaInicio 	 : { required: 'Debe ingresar la fecha inicial' },
	      fechaFin 		 : { required: 'Debe ingresar la fecha final', greaterThan: "La fecha final debe ser mayor a la fecha inicial" }
	    },

		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
			/*
			element
			.text('OK!').addClass('valid')
			.closest('.form-group').removeClass('has-error').addClass('has-success');
			*/
		}
	  });
}

//Se implementa la regla "greaterThan" para validar que la fecha final sea mayor a la inicial
jQuery.validator.addMethod("greaterThan", 
function(value, element, params) {

    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
    }

    return isNaN(value) && isNaN($(params).val()) 
        || (Number(value) > Number($(params).val())); 
},'Must be greater than {0}.');