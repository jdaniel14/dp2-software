var getActivities = "../../api/CR_getListaActividad";
var updateActivity = "../../api/CR_updateActividad";

$(document).ready(main);


var idPaqueteTrabajo;
$("#fechaInicioActual2").val("2013-11-01");

if (localStorage.getItem("idPaquete") != null) {
	idPaqueteTrabajo=localStorage.getItem("idPaquete");
} else {
	console.log("paquete NULL!");
	idPaqueteTrabajo=0;
}

var flag=0;
var idProyectoLocal = localStorage.getItem("idProyecto");
var listaActividades=[];

function main(){

	// obtenerTitulo();
	listarActividades();
	$("#listaActividades").change(function() {
		$.each(listaActividades, function(i, value) {
			if ($('#listaActividades').val() == value.id) {
				$('#diasActuales').val(value.duration);
				$("#nuevoNombre").val(value.name);
				$("#fechaInicioActual1").val(value.fecha_inicio);
				$("#fechaInicioActual2").val(value.fecha_inicio);
				fecha = new Date(value.fecha_inicio);
				fecha.setDate(fecha.getDate()+1+(value.duration)*1);
				var anio=fecha.getFullYear();
				var mes= fecha.getMonth()+1;
				var dia= fecha.getDate()+1;

				if(mes.toString().length < 2){
			    	mes="0".concat(mes);        
			  	}
			  	if(dia.toString().length < 2){
			    	dia="0".concat(dia);        
			  	}  
			  	$("#fechaFinActual").val(anio+"-"+mes+"-"+dia);
			}
		});
    });

    $("#nuevosDias").change(
        function() {
        	if (flag==0){
        		flag=1;
	            fecha = new Date($("#fechaInicioActual2").val());
	            dias=$("#nuevosDias").val();
				fecha.setDate(fecha.getDate()+1+(dias*1));
				var anio=fecha.getFullYear();
				var mes= fecha.getMonth()+1;
				var dia= fecha.getDate();

				if(mes.toString().length < 2){
			    	mes="0".concat(mes);        
			  	}
			  	if(dia.toString().length < 2){
			    	dia="0".concat(dia);        
			  	}  
			  	$("#nuevaFechaFin").val(anio+"-"+mes+"-"+dia);
			  	flag = 0;
        	}
        });

    $("#nuevaFechaFin").change(
        function() {
        	if (flag==0){
        		flag=2;
        		fecha1 = new Date($("#fechaInicioActual2").val());
	            fecha2 = new Date($("#nuevaFechaFin").val());
				
				diferencia = ((((fecha2-fecha1)/1000)/60)/60)/24;
				diferencia++;
			  	$("#nuevosDias").val(diferencia);
			  	flag=0;
        	}
	            
        });

    $("#btnConfirmar").click(function() {
        var data = {
    		id: $("#listaActividades").val(),
			name: $("#nuevoNombre").val(),
			duration: $("#nuevosDias").val(),
			fecha_inicio: $("#fechaInicioActual2").val(),
			fecha_fin:$("#nuevaFechaFin").val()
        }
        var jsonData = JSON.stringify(data);
  //       $.ajax({					UPDATE A ACCIONXRIESGO
		// 	type: 'POST',
		// 	url: updateActivity,
		// 	data: jsonData,
		// 	success: function(data){
		// 		console.log("Se actualizó");
		// 		// obtenerCostoRealActual(costoNuevo);
		// 		//guardar en BD
		// 		localStorage.removeItem("idPaquete");
		// 		window.location.replace("../riesgo/MostrarRiesgos.html");
		// 	},
		 
		// });
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