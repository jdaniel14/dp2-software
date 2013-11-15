var getActivities = "../../api/CR_getListaActividad";
var updateActivity = "../../api/CR_updateActividad";

$(document).ready(main);


// localStorage.setItem("idPaquete",333);
// localStorage.setItem("idProyecto",2);

var idPaqueteTrabajo;

if (localStorage.getItem("idPaquete") != null) {
	idPaqueteTrabajo=localStorage.getItem("idPaquete");
} else {
	console.log("paquete NULL!");
	idPaqueteTrabajo=0;
}


var idProyectoLocal = localStorage.getItem("idProyecto");
var listaActividades=[];

function main(){

	// obtenerTitulo();
	listarActividades();
	$("#listaActividades").change(function() {
		$.each(listaActividades, function(i, value) {
			if ($('#listaActividades').val() == value.id) {
				$('#diasActuales').val(value.duration);
				$("#nuevoNombre").val(value.name)
			}
		});
    });

    $("#btnConfirmar").click(function() {
        var costoPrevio;
        var costoNuevo;
        // obtenerCostoRealActual(costoPrevio);
        var tiempoPrevio;
        var tiempoNuevo;
        var data = {
    		id: $("#listaActividades").val(),
			name: $("#nuevoNombre").val(),
			duration: $("#nuevosDias").val(),
        }
        tiempoPrevio=$('#diasActuales').val();
        tiempoNuevo=data.duration;
        var jsonData = JSON.stringify(data);
        $.ajax({
			type: 'POST',
			url: updateActivity,
			data: jsonData,
			success: function(data){
				console.log("Se actualizó");
				// obtenerCostoRealActual(costoNuevo);
				//guardar en BD
				localStorage.removeItem("idPaquete");
				window.location.replace("../riesgo/MostrarRiesgos.html");
			},
		 
		});
    });
}

function listarActividades(){
	var data = {
		idProyecto:idProyectoLocal
	}
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getActivities + '/' + jsonData,
		success: function(data){
			var obj = JSON.parse(data);
			listaActividades = obj.tasks;
			console.log(listaActividades);
			if (idPaqueteTrabajo==0){
				$.each(listaActividades, function(i, value) {
                	$('#listaActividades').append("<option value=" + value.id + ">" + value.name + "</option>");
	            });
			} else {
				$.each(listaActividades, function(i, value) {
	            	if (value.idWbs==idPaqueteTrabajo){
	                	$('#listaActividades').append("<option value=" + value.id + ">" + value.name + "</option>");
	            	}
	            });
			}
		},
		 
	});
}