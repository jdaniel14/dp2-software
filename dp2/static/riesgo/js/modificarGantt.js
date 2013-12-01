var getActivities = "../../api/CR_getListaActividad";
var updateActivity = "../../api/CR_updateActividad";
var getAccions = "../../api/R_obtenerPlanContingenciaRiesgo";
var updateChanges = "../../api/R_actualizarEnviarCambio";	 //CAMBIO NOMBRE!!!!!!
var returnAccion = "../../api/R_cancelarMaterializacion";

$(document).ready(main);


var idPaqueteTrabajo;
var idAccion;
var nombreAccion;
var acciones;

if (localStorage.getItem("idPaquete") != null) {
	idPaqueteTrabajo=localStorage.getItem("idPaquete");
} else {
	console.log("paquete NULL!");
	idPaqueteTrabajo=0;
}

idAccion = localStorage.getItem("idAccion");
idRiesgo = localStorage.getItem("idRiesgo");
fechaMat= localStorage.getItem("fechaMaterializacion");

var flag=0;
var idProyectoLocal = localStorage.getItem("idProyecto");
var listaActividades=[];

function obtenerTitulo() {
        document.getElementsByTagName('h2')[0].innerHTML = localStorage.getItem("nombreProyecto");
    }

function main(){

	obtenerTitulo();
	listarAciones();
	listarActividades();
	$("#listaActividades").change(function() {
		$.each(listaActividades, function(i, value) {
			if ($('#listaActividades').val() == value.id) {
				$('#diasActuales').val(value.duration);
				$("#nuevoNombre").val(value.name);
				$("#fechaInicioActual1").val(value.fecha_inicio);
				$("#fechaInicioActual2").val(value.fecha_inicio);
				$("#fechaInicioActual2").prop("readonly",true);

				fecha1 = new Date(value.fecha_inicio);
	            fecha2 = new Date(fechaMat);
				
				diferencia = ((((fecha2-fecha1)/1000)/60)/60)/24;
				console.log(diferencia);
				if (diferencia >= 0) { //La actividad escogida ya se inició
					//LINEA BASE?
					$("#nuevoNombre").prop("readonly",true);
					//MOSTRAR LABEL QUE HAYA INICIADO La ACTIVIDAD

				} else { //La actividad escogida aún no se inicia
					//LINEA BASE?
					$("#nuevoNombre").prop("readonly",false);
					$("#nuevoNombre").val(nombreAccion);
					$("#fechaInicioActual2").prop("readonly",true);
				}

				fecha = new Date(value.fecha_inicio);
				fecha.setDate(fecha.getDate()+1+(value.duration)*1);
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


    $("#limpiarAccion").click(function() {
    	var data = {
    		idProyecto : idProyectoLocal,
			idUsuario: localStorage.getItem("idUsuario"),
			idRiesgoProyecto: localStorage.getItem("idRiesgo"),
			idAccionesRiesgo: localStorage.getItem("idAccion")
    	}
    	var jsonData = JSON.stringify(data);
	    $.ajax({			
			type: 'PUT',
			url: returnAccion,
			data: jsonData,
			success: function(data){
				window.location.replace("../riesgo/index.html");
			},
		 
		});
    });

    $("#btnConfirmar").click(function() {
        var fecha1=  new Date($("#fechaInicioActual2").val());
        var fecha2= new Date($("#fechaInicioActual1").val());

        var diferencia2 = ((((fecha1-fecha2)/1000)/60)/60)/24;
        console.log(diferencia2);
        if (diferencia2>=0){
        	var data = {
				idActividad: $("#listaActividades").val(),
				tiempoReal: $("#nuevosDias").val(),
				fechaInicio: $("#fechaInicioActual2").val(),
				idAccionesRiesgo: idAccion,
				descripcion: nombreAccion,
				idProyecto : idProyectoLocal,
				idUsuario: localStorage.getItem("idUsuario")
		    }
		    var jsonData = JSON.stringify(data);
		    $.ajax({			
				type: 'PUT',
				url: updateChanges,
				data: jsonData,
				success: function(data){
					// alert("Se actualizó");

					$("#labelExitoModal").html("");
	                $("#labelExitoModal").append("Se actualizó");
	                $('#modalExito').modal('show');
					// obtenerCostoRealActual(costoNuevo);
					//guardar en BD
					localStorage.removeItem("idPaquete");
					window.location.replace("../riesgo/index.html");
				},
			 
			});
        } else {

        	$("#labelErrorModal").html("");
                $("#labelErrorModal").append("La nueva fecha de inicio no puede ser antes o el mismo dia que la fecha de materialización del riesgo");
                $('#ModaldeErrores').modal('show');

        	// alert("La nueva fecha de inicio no puede ser antes o el mismo dia que la fecha de materialización del riesgo");
        }
        
    });
}

function listarActividades(){
	var data = {
		idProyecto:idProyectoLocal,
		idUsuario: localStorage.getItem("idUsuario")
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

function listarAciones(){
	var data = {
        idRiesgoXProyecto:  idRiesgo,
        idProyecto : idProyectoLocal,
        idUsuario: localStorage.getItem("idUsuario")
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        // url:  getAccions + '/' + data.idRiesgoXProyecto,
        url:  getAccions + '/' + jsonData,
        success: function(data) {
            obj = JSON.parse(data);
            console.log(obj);
            $.each(obj, function(index) {
            	if (this.idAccionesRiesgo==idAccion){
            		nombreAccion= this.descripcion;
            		console.log(nombreAccion);
            	}
            });
        }
    });
}