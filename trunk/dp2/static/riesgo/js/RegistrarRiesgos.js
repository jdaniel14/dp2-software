var getAllItems = "../../api/R_listaRiesgo";
var getItem = "../../api/R_obtenerRiesgo";
var addItem = "../../api/R_registrarRiesgo";
var updateItem = "../../api/R_modificarRiesgo";
var deleteItem = "../../api/R_eliminarRiesgo";
var getAllPackets = "../../api/R_listaPaquetesEDT";
var getAllCategories = "../../api/R_listaCategoriaRiesgo";
// var getAllImpactLevels = "../../api/R_listaNivelesImpacto";
var getAllKnownItems = "../../api/R_listarRiesgoComun";
var addList = "../../api/R_asignarRiesgoComun"
var addConfg = "../../api/R_registrarConfiguracionProyecto";
var updateStatus = "../../api/R_modificarRiesgo";
var getStatus = "../../api/R_estadoLogicoRiesgo";
var getResponsable = "../../api/R_listarComiteRiesgo";
var getProbability = "../../api/R_obtenerProbabilidadRiesgo";
var getImpactLevel1 = "../../api/R_obtenerNivelImpactoTipoImpacto1";
var getImpactLevel2 = "../../api/R_obtenerNivelImpactoTipoImpacto2";
var getAllTypesImpacts = "../../api/R_listaTiposImpactoRiesgo";
var getDescImpactLevelType = "../../api/R_obtenerDescripcionNivelImpactoTipoImpacto";

// var arregloRiesgo = new Array(
// 								new Array('Riesgo 1','Actividad 1','Costo','0.2','0.1','evitar','Accion Especifica 1','100','2','Equipo 1'),
// 								new Array('Riesgo 2','Actividad 2','Tiempo','0.3','0.2','explotar','Accion Especifica 2','200','1','Equipo 3'),
// 								new Array('Riesgo 3','Actividad 3','Alcance','0.4','0.4','transferir','Accion Especifica 3','400','4','Equipo 5'),
// 								new Array('Riesgo 4','Actividad 4','Calidad','0.8','0.6','mejorar','Accion Especifica 4','500','3','Equipo 4'),
// 								new Array('Riesgo 5','Actividad 5','Calidad','0.3','0.6','compartir','Accion Especifica 5','500','2','Equipo 3')
// 							 );
// var arregloRiesgoComunes = new Array(
// 								new Array('RSK10', 'Riesgo Común 10','0.3','0.9','0.27'),
// 								new Array('RSK11', 'Riesgo Común 11','0.4','0.6','0.24'),
// 								new Array('RSK12', 'Riesgo Común 12','0.1','0.8','0.08'),
// 								new Array('RSK13', 'Riesgo Común 13','0.5','0.7','0.35')
// 							);
// var arregloConfiguraciones = new Array(1,0,0,0,0,0);
$(document).ready(main);

var nombre = "";
var idPaqueteTrabajo = 0;
var idCategoriaRiesgo = 0;
var tipoImpacto;
var listaEquipo =[];
var buscar = {
	nombre:nombre,
	idPaqueteTrabajo:idPaqueteTrabajo,
	idCategoriaRiesgo:idCategoriaRiesgo,
}
var idArray = [];
var listaPaquetes;
var idProyectoLocal = localStorage.getItem("idProyecto");
var listaTipos = [];

function main(){

	listarPaquetesTrabajo();
	listarCategoriasRiesgo();
	// listarNivelesImpacto();
	listarResponsable();
	listarRiesgos(buscar);
	listarRiesgosComunes();
	listarTiposImpacto();
	// listarConfiguracion();


	$("#btnRegistrar").click( function(){

		var flag = true;  //if true se registra, if false mensaje de error!

		var data = {
			idProyecto: idProyectoLocal,
			nombre: $('#nomRiesgo').val(),
			idPaqueteTrabajo: $('#paqEdt').val(),
			idTipoImpacto: $('#tipoImpacto').val(),
			idNivelImpacto: $('#impRiesgo').val(),
			probabilidad: $('#proRiesgo').val(),
			impacto: '',
			idProbabilidad: $('#idnivelProbabilidadRiesgo').val(),
			acciones: $('#accEsp').val(),
			costoPotencial: $('#costRiesgo').val(),
			demoraPotencial: $('#tiemRiesgo').val(),
			idEmpleado: $('#equRes').val(),
			severidad: $('#svrRiesgo').val(),
			nombreResponsable: ''
		};

		if (tipoImpacto){
			data.impacto = $('#impRiesgo1').val();
		} else if (tipoImpacto==2){
			data.impacto = $('#impRiesgo2').val();
		}
		$.each(listaEquipo, function (i, value){
			if (this.idContacto==data.idEmpleado){
				data.nombreResponsable = this.nombreCompleto;
				return false;
			}
	    });

		limpiarRegistrar();

		console.log(data);
		if (validarRegistro(data,1)) {
			var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'POST',
				url: addItem,
				data: jsonData,
				dataType: "json",
				success: function(data){
					var item = data;
					alert("Se registró exitosamente el Riesgo " + item.idRiesgo + ": " + item.nombre);
					listarRiesgos(buscar);
					$('#myModalRegister').modal('hide');
				},
				fail: codigoError
			});
		}
	});
	$("#btnModificar").click(function(){

		var flag = true;
		var data = {
			idRiesgoXProyecto: $('#idRiesgoM').val(),
			idProyecto: idProyectoLocal,
			nombreRiesgo: $('#nomRiesgoM').val(),
			idPaqueteTrabajo: $('#paqEdtM').val(),
			idTipoImpacto: $('#tipoImpactoM').val(),
			idNivelImpacto: $('#impRiesgoM').val(),
			probabilidad: $('#proRiesgoM').val(),
			impacto: '',
			idProbabilidad: $('#idnivelProbabilidadRiesgoM').val(),
			// acciones: $('#accEspM').val(),
			costoPotencial: $('#costRiesgoM').val(),
			demoraPotencial: $('#tiemRiesgoM').val(),
			idEmpleado: $('#equResM').val(),
			nombreResponsable: ''
		};
		
		if (tipoImpacto){
			data.impacto = $('#impRiesgo1M').val();
		} else if (tipoImpacto==2){
			data.impacto = $('#impRiesgo2M').val();
		}
		$.each(listaEquipo, function (i, value){
			if (this.idContacto==data.idEmpleado){
				data.nombreResponsable = this.nombreCompleto;
				return false;
			}
	    });

		limpiarModificar();

		console.log(data);
		if (validarRegistro(data,2)) {
			var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'PUT',
				url: updateItem + '/' + data.idRiesgoXProyecto,
				data: jsonData,
				dataType: "json",
				success: function(data){
					var item = data;
					alert("Se actualizó exitosamente el Riesgo ");
					listarRiesgos(buscar);
					$('#myModal').modal('hide');
				},
				fail: codigoError
			});
		}
	});

	//Función para agregar los riesgos conocidos al proyecto
	$("#btnAgregar").click( function(){
		var arreglo = [];
    	$('#tablaRiesgosComunes input[type="checkbox"]:checked').each(function(){
	        var $row = $(this).parents('tr'); 
	        arreglo.push($row.find('td:eq(5) input').val());
    	});
    	var data = {
    		lista: arreglo,
    		idProyecto : idProyectoLocal
    	};

		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'POST',
			url: addList,
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				alert("Se agregaron exitosamente los " + item.length + " riesgos");
				listarRiesgos(buscar);
				$('#myModalRegister').modal('hide');
			},
			fail: function(data){
				alert(data.me);
			}
		});
	});


	//Boton guardar datos en la ventana de configuración
	$("#btnConfiguracion").click( function(){
		var data = {
			idProyecto: idProyectoLocal,
			muyBajo: $('#muyBajo').val(),
			bajo: $('#bajo').val(),
			medio: $('#medio').val(),
			alto: $('#alto').val(),
			muyAlto: $('#muyAlto').val()
		};
		limpiarConfiguracion();
		if (!validarConfiguracion(data)){
			console.log(data);
			var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'POST',
				url: addConfg,
				data: jsonData,
				dataType: "json",
				success: function(data){
					alert("Actualizado con éxito");
					$('#modalConfiguracion').modal('hide');
				},
				fail: function(data){
					alert(data.me);
				}
			});	
		}
		
	});

	// $("#listarConf").click( function(){
	// 	$('#muyBajo').val('');
	// 	$('#bajo').val('');
	// 	$('#medio').val('');
	// 	$('#alto').val('');
	// 	$('#muyAlto').val('');
	// 	limpiarConfiguracion();
	// 	listarConfiguracion();

	// });


	$("#registrarRiesgo").click( function(){
		limpiarImpacto();
		// listarNivelesImpacto();
		$('#nomRiesgo').val('');
		$('#paqEdt').val(0);
		$('#tipoImpacto').val(0);
		$('#impRiesgo').val(0);
		$('#proRiesgo').val('');
		$('#svrRiesgo').val('');
		$('#accEsp').val('');
		$('#costRiesgo').val('');
		$('#tiemRiesgo').val('');
		$('#equRes').val(0);
		$('#impRiesgo1').val('');
		$('#impRiesgo2').val(0);
		$('#nivelImpactoRiesgo').val('');
		$('#idnivelProbabilidadRiesgo').val('');
		$('#nivelProbabilidadRiesgo').val('');
		$('#descnivelProbabilidadRiesgo').val('');
		limpiarRegistrar();		
	});



	//Boton para confirmar un riesgo
	$(".glyphicon.glyphicon-ok").click( function(){
		
		var data = {
			idRiesgo: $(this).closest("tr").attr("id")
		};
		idArray = [];
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'GET',
			url: getStatus +  '/' + data.idRiesgo,
			dataType: "json",
			success: function(data){
				idArray = data;
			},
			fail: codigoError
		});
		console.log(idArray);
	});

	$("#btnConfirmar").click( function(){
		console.log(idArray);
		var jsonData = JSON.stringify(idArray);
		$.ajax({
			type: 'PUT',
			url: updateStatus + '/' + idArray.idRiesgo + '/' + 2,
			data: jsonData,
			dataType: "json",
			success: function(data){
				alert("Se ha confirmado el riesgo");
				listarRiesgos(buscar);
			},
			fail: codigoError
		});
	});

}

// function limpiarConfiguracion(){
	
// 	$('#errorMuyBajo').hide();
// 	$('#errorBajo').hide();
// 	$('#errorMedio').hide();
// 	$('#errorAlto').hide();
// 	$('#errorMuyAlto').hide();
// 	$('#errorImpactos').hide();
		
// }

function limpiarRegistrar(){
	$('#errorNombre').hide();
	$('#errorTipoImpacto').hide();
	$('#errorImpacto1').hide();
	$('#errorImpacto2').hide();
	$('#errorProba').hide();
	$('#errorCosto').hide();
	$('#errorTiempo').hide();
	$('#errorResponsable').hide();
	$('#RiesgoCaso1').hide();
	$('#RiesgoCaso2').hide();  
}

function limpiarModificar(){
	$('#errorNombreM').hide();
	$('#errorTipoImpactoM').hide();
	$('#errorImpacto1M').hide();
	$('#errorImpacto2M').hide();
	$('#errorProbaM').hide();
	$('#errorCostoM').hide();
	$('#errorTiempoM').hide();
	$('#errorResponsableM').hide();
	$('#RiesgoCaso1M').hide();
	$('#RiesgoCaso2M').hide();
}

// function listarConfiguracion(){

// 		var data = {
// 			idProyecto: idProyectoLocal
// 		};
// 		var jsonData = JSON.stringify(data);
// 		$.ajax({
// 			type: 'GET',
// 			url: getAllImpactLevels +  '/' + data.idProyecto,
// 			dataType: "json",
// 			success: function(data){
// 				listarConfiguracion2(data);			
// 			},
// 			fail: codigoError
// 		});
// 		//listarConfiguracion2(null);
// }

// function listarConfiguracion2(data){
// 	// var arreglo = [];

// 	arreglo=data;
	
// 	if (arreglo!=null){
// 		$('#muyBajo').val(arreglo[0].muyBajo);
// 		$('#bajo').val(arreglo[0].bajo);
// 		$('#medio').val(arreglo[0].medio);
// 		$('#alto').val(arreglo[0].alto);
// 		$('#muyAlto').val(arreglo[0].muyAlto);
// 	} else {
// 		$('#muyBajo').val(arregloConfiguraciones[1]);
// 		$('#bajo').val(arregloConfiguraciones[2]);
// 		$('#medio').val(arregloConfiguraciones[3]);
// 		$('#alto').val(arregloConfiguraciones[4]);
// 		$('#muyAlto').val(arregloConfiguraciones[5]);
// 	};
// }

function listarTiposImpacto() {
	var data = {
		idProyecto: idProyectoLocal, 
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		url: getAllTypesImpacts + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			listaTipos = data;
			console.log(data);
			agregarDataTiposImpacto(data);
		},
		fail: 
			codigoError
			// agregarDataTiposImpacto(listaTipos)
		
	});
}

function listarPaquetesTrabajo(){
	var data = {
		idProyecto: idProyectoLocal
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getAllPackets +'/'+ data.idProyecto,
		dataType: "json",
		success: function(data){
			var lista = data;
			listaPaquetes = lista;
			$.each(lista, function (i, value){
				$('#paqEdt').append("<option value="+ value.id +">" + value.descripcion + "</option>");
				$('#paqEdtM').append("<option value="+ value.id +">" + value.descripcion + "</option>");
				$('#idPaqueteRiesgo').append("<option value="+ value.id +">" + value.descripcion + "</option>");
            });			
		},
		fail: codigoError
	});
}
function obtenerRiesgo(id){
	
	var data = {
			id_riesgo_x_proyecto: id
		};
		var jsonData = JSON.stringify(data);
		console.log(jsonData);
		$.ajax({
			type: 'GET',
			url: getItem + '/' + data.id_riesgo_x_proyecto,
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				$('#idRiesgoM').val(id);
				$('#nomRiesgoM').val(item.nombre);
				if (item.paqueteTrabajo==null){
					$('#paqEdtM').val(0);
				} else $('#paqEdtM').val(item.paqueteTrabajo);
				$('#tipoImpactoM').val(item.tipoImpacto);
				if (item.tipoImpacto==1){
					$('#impRiesgo1M').val(item.impacto);
				} else if (item.tipoImpacto==2){
					$('#impRiesgo2M').val(item.impacto);
				}

				if (item.equipoEesponsable==null){
					$('#equResM').val(0);
				} else $('#equResM').val(item.idResponsable);
				$('#impRiesgoM').val(item.idNivelImpacto);
				$('#proRiesgoM').val(item.probabilidad);
				$('#idnivelProbabilidadRiesgoM').val(item.idProbabilidad);
				$('#descnivelProbabilidadRiesgoM').val(item.descProbabilidad);
				$('#nivelProbabilidadRiesgoM').val(item.idProbabilidad);
				$('#svrRiesgoM').val(item.severidad);
				$('#accEspM').val(item.accionesEspecificas);
				$('#costRiesgoM').val(item.costoPotencial);
				$('#tiemRiesgoM').val(item.demoraPotencial);
				$('#equResM').val(item.idResponsable);
			},
			fail: codigoError
		});
}

function listarCategoriasRiesgo(){
	var data = {
		id: idProyectoLocal
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getAllCategories,
		dataType: "json",
		success: function(data){
			var lista = data;
			
			$.each(lista, function (i, value){
				$('#tipoImpacto').append("<option value="+ value.id +">" + value.descripcion + "</option>");
				$('#tipoImpactoM').append("<option value="+ value.id +">" + value.descripcion + "</option>");
                                $('#idCategoriaRiesgo').append("<option value="+ value.id +">" + value.descripcion + "</option>");
                        });	
				
		},
		fail: codigoError
	});
} 
// function listarNivelesImpacto(){
// 	var data = {
// 		idProyecto: idProyectoLocal
// 	};
// 	var jsonData = JSON.stringify(data);
// 	$.ajax({
// 		type: 'GET',
// 		url: getAllImpactLevels + '/' + data.idProyecto,
// 		dataType: "json",
// 		success: function(data){
// 			var lista = data;
			
// 				$('#impRiesgo').append("<option value="+ lista[0].muyBajo +">Muy Bajo</option>" +
// 					"<option value="+ lista[0].bajo +">Bajo</option>" +
// 					"<option value="+ lista[0].medio +">Medio</option>" +
// 					"<option value="+ lista[0].alto +">Alto</option>" +
// 					"<option value="+ lista[0].muyAlto +">Muy Alto</option>");

// 				$('#impRiesgoM').append("<option value="+ lista[0].muyBajo +">Muy Bajo</option>" +
// 					"<option value="+ lista[0].bajo +">Bajo</option>" +
// 					"<option value="+ lista[0].medio +">Medio</option>" +
// 					"<option value="+ lista[0].alto +">Alto</option>" +
// 					"<option value="+ lista[0].muyAlto +">Muy Alto</option>");
					
// 		},
// 		fail: codigoError
// 	});
// }
function listarResponsable(){
	var data = {
		idProyecto: idProyectoLocal
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getResponsable + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			listaEquipo = data;
			$.each(listaEquipo, function (i, value){
				$('#equRes').append("<option value="+ value.idContacto +">" + value.nombreCompleto + "</option>");
				$('#equResM').append("<option value="+ value.idContacto +">" + value.nombreCompleto + "</option>");
			});			
		},
		fail: codigoError
	});


}

function listarRiesgos(search){
	$("#tablaRiesgos").empty();
	var data = {
		idProyecto: idProyectoLocal,
        nombre: $('#nombre').val(),
        idPaqueteTrabajo : $('#idPaqueteRiesgo').val(), 
		idCategoriaRiesgo : $('#idCategoriaRiesgo').val()    
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		url: getAllItems + '/' +JSON.stringify(data),
		dataType: "json",
		success: function(data){
			var lista = data;
			console.log(data);
			agregaDataFila(data);
			$(".glyphicon.glyphicon-edit").click( function(){
				var id = $(this).closest("tr").attr("id");
				obtenerRiesgo(id);
				limpiarImpacto();
				listarNivelesImpacto();
				limpiarModificar();
			});
			$(".glyphicon.glyphicon-remove").click( function(){
				var idRiesgoProyecto= $(this).closest("tr").attr("id");
				eliminarRiesgo(idRiesgoProyecto);

			});
			$("#btnBuscar").click(function(){
				listarRiesgos(buscar);
			});
		},
		fail: codigoError
	});

}

function eliminarRiesgo(id){
	$("#btnEliminar").click(function(){
		var data = {
			idRiesgoProyecto : id
		}
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'DELETE',
			url: deleteItem + '/' + data.idRiesgoProyecto,
			data: jsonData,
			dataType: "html",
			success: function(){
				alert("Se elimino el riesgo correctamente");
				listarRiesgos(buscar);
			},
			fail: codigoError
		});
	});
}

function limpiarImpacto(){
	$('#impRiesgo').empty();
	$('#impRiesgoM').empty();
	$('#impRiesgo').append("<option value=\"0\" disabled selected>Escoge un nivel de impacto</option>");
	$('#impRiesgoM').append("<option value=\"0\" disabled selected>Escoge un nivel de impacto</option>");
}
function listarRiesgosComunes(){
		
	$.ajax({
		type: 'GET',
		url: getAllKnownItems,
		dataType: "json",
		success: function(data){
			agregaDataComunFila(data);
		},
		fail: codigoError
	});

}

function codigoError(){

	alert('Error');

}

function agregaDataFila(data){
	arreglo=data;
	if (arreglo!=null){
		for (i=0; i<arreglo.length;i++){

			agregaFilaRiesgo(arreglo[i],i);
		}
	}
}

function agregaDataComunFila(data){
	if (data!=null){
		arreglo=data;
	} else arreglo=[];
	for (i=0; i<arreglo.length;i++){
		
		agregaFilaRiesgoComun(arreglo[i],i);
	}
}

function agregaFilaRiesgo(arreglo,i){
	a=i;
	a++;
	if (arreglo.categoria==null){
		arreglo.categoria='-';
	}
	if (arreglo.severidad==null){
		arreglo.severidad='-';
	}
	if (arreglo.accionesEspecificas==null){
		arreglo.accionesEspecificas='-';
	}
	if (arreglo.costoPotencial==null){
		arreglo.costoPotencial='-';
	}
	if (arreglo.demoraPotencial==null){
		arreglo.demoraPotencial='-';
	}

	$("#tablaRiesgos").append("<tr id=\"" + arreglo.idRiesgoProyecto + 
							  "\"><td>" + arreglo.idRiesgoProyecto + 
							  "</td><td>" + arreglo.nombre + 
							  "</td><td>" + arreglo.paqueteTrabajo + 
							  "</td><td>" + arreglo.categoria + 
							  "</td><td>" + arreglo.nivelImpactoDescripcion + 
							  "</td><td>" + arreglo.probabilidadDescripcion +
							  "</td><td>" + arreglo.severidad +
							  "</td><td>" + arreglo.accionesEspecificas +
							  "</td><td>" + arreglo.costoPotencial +
							  "</td><td>" + arreglo.demoraPotencial +
							  "</td><td>" + arreglo.nombreResponsable + 
							  "</td><td><a data-toggle=\"modal\" href=\"#myModal\"><span class=\"glyphicon glyphicon-edit\"></span></a>" + 
							  "</td><td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove\"></span></a>" + 
							  "</td><td><a data-toggle=\"modal\" href=\"#confirmRisk\" ><span class=\"glyphicon glyphicon-ok\"></span></a>" +
							  "</td></tr>");
	
}


function agregaFilaRiesgoComun(arreglo,i){
	a=i;
	a++;
	$("#tablaRiesgosComunes").append("<tr id=\"" + arreglo.idRiesgoComun + 
							  "\"><td>" + arreglo.idRiesgoComun + 
							  "</td><td>" + arreglo.nombre + 
							  "</td><td>" + arreglo.ultProbabilidad + 
							  "</td><td>" + arreglo.ultImpacto + 
							  "</td><td>" + arreglo.ultSeveridad +
							  "</td><td><input type=\"checkbox\" value=\""+arreglo.idRiesgoComun+"\">"+
							  "</td></tr>");
}


$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRiesgos();
	}
});

function grabarRiesgos(){
	alert("Se grabó");
}
/*------------------------------------VALIDACIONES-----------------------------------------*/

//Calculo automatico del nivel de probabilidad

$('#proRiesgo').change(
	function(){
    	if (($('#proRiesgo').val()!='') && (validarProbaImpacto($('#proRiesgo').val())) && (validarNumero($('#proRiesgo').val()))){
	     	var data = {
	     		idProyecto:idProyectoLocal,
	     		valor:$('#proRiesgo').val()
	     	}
	     	var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'GET',
				url: getProbability +'/'+ jsonData,
				success: function(data){
					var obj = JSON.parse(data);
					$('#descnivelProbabilidadRiesgo').val(obj.descripcion);
					$('#idnivelProbabilidadRiesgo').val(obj.idProbabilidadRiesgo);
					$('#nivelProbabilidadRiesgo').val(obj.nivel);
					if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val()!=0)){
						console.log("Proba:"+$('#nivelProbabilidadRiesgo').val()+" Imp: "+$('#nivelImpactoRiesgo').val());
			         	$('#svrRiesgo').val($('#nivelProbabilidadRiesgo').val()*$('#nivelImpactoRiesgo').val());
			        }
				},
				fail: codigoError
			});

     	} else {
     		$('#descnivelProbabilidadRiesgoM').val('');
     		$('#idnivelProbabilidadRiesgo').val('');
     		$('#nivelProbabilidadRiesgo').val('');
     		$('#svrRiesgo').val('');
     	}
    });

$('#proRiesgoM').change(
    function(){
    	if (($('#proRiesgoM').val()!='') && (validarProbaImpacto($('#proRiesgoM').val())) && (validarNumero($('#proRiesgoM').val()))){
	     	var data = {
	     		idProyecto:idProyectoLocal,
	     		valor:$('#proRiesgoM').val()
	     	}
	     	var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'GET',
				url: getProbability +'/'+ jsonData,
				success: function(data){
					var obj = JSON.parse(data);
					$('#descnivelProbabilidadRiesgoM').val(obj.descripcion);
					$('#idnivelProbabilidadRiesgoM').val(obj.idProbabilidadRiesgo);
					if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val()!=0)){
						console.log("Proba:"+$('#nivelProbabilidadRiesgoM').val()+" Imp: "+$('#nivelImpactoRiesgoM').val());
			         	$('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val()*$('#nivelImpactoRiesgoM').val());
			         }
				},
				fail: codigoError
			});

     	} else {
     		$('#descnivelProbabilidadRiesgoM').val('');
     		$('#idnivelProbabilidadRiesgoM').val('');
     		$('#nivelProbabilidadRiesgoM').val('');
     		$('#svrRiesgoM').val('');
     	}
    });

//Calculo automatico del nivel de probabilidad - Fin



//Calculo automatico del nivel de Impacto

$('#impRiesgo1').change(
	function(){
    	if (($('#impRiesgo1').val()!='') && (validarDecimales($('#impRiesgo1').val())) && (!isNaN($('#proRiesgo').val()))){
	     	var data = {
	     		idProyecto:idProyectoLocal,
	     		valor:$('#impRiesgo1').val(),
	     		idTipoImpacto: $('#tipoImpacto').val()
	     	}
	     	var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'GET',
				url: getImpactLevel1 +'/'+ jsonData,
				success: function(data){
					var obj = JSON.parse(data);
					$('#impRiesgo').append("<option value="+ obj.idNivelImpacto +" selected>" + obj.descripcion + "</option>");
					$('#nivelImpactoRiesgo').val(obj.nivel);
					if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val()!=0)){
						console.log("Proba:"+$('#nivelProbabilidadRiesgo').val()+" Imp: "+$('#nivelImpactoRiesgo').val());
			         	$('#svrRiesgo').val($('#nivelProbabilidadRiesgo').val()*$('#nivelImpactoRiesgo').val());
			         }
				},
				fail: codigoError
			});

     	} else {
     		$('#impRiesgo').clear();
     		$('#impRiesgo').append("<option value=\"0\" disabled selected>Primero, ingresa un impacto estimado</option>");
     		$('#nivelImpactoRiesgo').val('');
     		$('#svrRiesgo').val('');

     	}
    });

$('#impRiesgo1M').change(
    function(){
    	if ($('#impRiesgo1M').val()!=0) {
	     	var data = {
	     		idProyecto:idProyectoLocal,
	     		idNivelImpacto:$('#impRiesgo1M').val(),
	     		idTipoImpacto: $('#tipoImpactoM').val()
	     	}
	     	var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'GET',
				url: getImpactLevel1 +'/'+ jsonData,
				success: function(data){
					var obj = JSON.parse(data);
					$('#impRiesgo1M').append("<option value="+ obj.idNivelImpacto +" selected>" + obj.descripcion + "</option>");
					$('#nivelImpactoRiesgoM').val(obj.nivel);
					if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val()!=0)){
						console.log("Proba:"+$('#nivelProbabilidadRiesgoM').val()+" Imp: "+$('#nivelImpactoRiesgoM').val());
			         	$('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val()*$('#nivelImpactoRiesgoM').val());
			         }
				},
				fail: codigoError
			});

     	} else {
     		$('#impRiesgo1M').clear();
     		$('#impRiesgo1M').append("<option value=\"0\" disabled selected>Primero, Seleccione un impacto estimado</option>");
     		$('#nivelImpactoRiesgoM').val('');
     		$('#svrRiesgoM').val('');
     	}
    });

$('#impRiesgo2').change(
    function(){
    	if ($('#impRiesgo2').val()!=0) {
	     	var data = {
	     		idProyecto:idProyectoLocal,
	     		idNivelImpacto:$('#impRiesgo2').val(),
	     		idTipoImpacto: $('#tipoImpacto').val()
	     	}
	     	var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'GET',
				url: getImpactLevel2 +'/'+ jsonData,
				success: function(data){
					var obj = JSON.parse(data);
					$('#impRiesgo').append("<option value="+ obj.idNivelImpacto +" selected>" + obj.descripcion + "</option>");
					$('#nivelImpactoRiesgo').val(obj.nivel);
					if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val()!=0)){
						console.log("Proba:"+$('#nivelProbabilidadRiesgo').val()+" Imp: "+$('#nivelImpactoRiesgo').val());
			         	$('#svrRiesgo').val($('#nivelProbabilidadRiesgo').val()*$('#nivelImpactoRiesgo').val());
			         }
				},
				fail: codigoError
			});

     	} else {
     		$('#impRiesgo').clear();
     		$('#impRiesgo').append("<option value=\"0\" disabled selected>Primero, Seleccione un impacto estimado</option>");
     		$('#nivelImpactoRiesgo').val('');
     		$('#svrRiesgo').val('');
     	}
    });

$('#impRiesgo2M').change(
    function(){
    	if ($('#impRiesgo2M').val()!=0) {
	     	var data = {
	     		idProyecto:idProyectoLocal,
	     		idNivelImpacto:$('#impRiesgo2M').val(),
	     		idTipoImpacto: $('#tipoImpactoM').val()
	     	}
	     	var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'GET',
				url: getImpactLevel2 +'/'+ jsonData,
				success: function(data){
					var obj = JSON.parse(data);
					$('#impRiesgo2M').append("<option value="+ obj.idNivelImpacto +" selected>" + obj.descripcion + "</option>");
					$('#nivelImpactoRiesgoM').val(obj.nivel);
					if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val()!=0)){
						console.log("Proba:"+$('#nivelProbabilidadRiesgoM').val()+" Imp: "+$('#nivelImpactoRiesgoM').val());
			         	$('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val()*$('#nivelImpactoRiesgoM').val());
			         }
				},
				fail: codigoError
			});

     	} else {
     		$('#impRiesgo2M').clear();
     		$('#impRiesgo2M').append("<option value=\"0\" disabled selected>Primero, Seleccione un impacto estimado</option>");
     		$('#nivelImpactoRiesgoM').val('');
     		$('#svrRiesgoM').val('');
     	}
    });

//Calculo automatico del nivel de Impacto - Fin



//Calculo automatico de Severidad
// $('#impRiesgo').change(
//     function(){
//     	console.log("adas"+$('#nivelProbabilidadRiesgo').val());
//     	console.log("proRiesgo:" + $('#proRiesgo').val() + " impRiesgo:"+ $('#impRiesgo').val()+ " nivelProbabilidadRiesgo:"+ $('#nivelProbabilidadRiesgo').val() + " nivelImpactoRiesgo"+$('#nivelImpactoRiesgo').val());
//          if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val()!=0)){
//          	$('#svrRiesgo').val($('#nivelProbabilidadRiesgo').val()*$('#nivelImpactoRiesgo').val());
//          }
//     });

// $('#proRiesgo').change(
// 	function(){
// 		console.log("adas"+$('#nivelProbabilidadRiesgo').val());
// 		console.log("proRiesgo:" + $('#proRiesgo').val() + " impRiesgo:"+ $('#impRiesgo').val()+ " nivelProbabilidadRiesgo:" + $('#nivelProbabilidadRiesgo').val() + " nivelImpactoRiesgo"+$('#nivelImpactoRiesgo').val());
//          if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val()!=0)){
//          	$('#svrRiesgo').val($('#nivelProbabilidadRiesgo').val()*$('#nivelImpactoRiesgo').val());
//          }
// 	});
// $('#impRiesgoM').change(
//     function(){
//          if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val()!=0)){
//          	$('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val()*$('#nivelImpactoRiesgoM').val());
//          }
//     });

// $('#proRiesgoM').change(
// 	function(){
// 		if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val()!=0)){
//          	$('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val()*$('#nivelImpactoRiesgoM').val());
//          }
// 	});
//Calculo automatico de Severidad - Fin


//Mostrar input de Impactos
$('#tipoImpacto').change(
    function(){
    	var idTipoImpactoLocal;
    	if ($('#tipoImpacto').val()!=0){
			$.each(listaTipos, function ( index){
				if (this.idTipo==$('#tipoImpacto').val()){
					tipoImpacto=this.formas;
					idTipoImpactoLocal = this.idTipo;
					return false;
				}
			});
			if (tipoImpacto==1){
				$('#RiesgoCaso1').fadeIn('slow');
				$('#RiesgoCaso2').hide();
				$('#impRiesgo2').val(0);
			} else if (tipoImpacto==2){
				listarTipoXNivelImpacto(idTipoImpactoLocal,1);
				$('#RiesgoCaso2').fadeIn('slow');
				$('#RiesgoCaso1').hide();
				$('#impRiesgo1').val('');
			}
    	}
    });

$('#tipoImpactoM').change(
    function(){
    	var tipoImpacto;
    	if ($('#tipoImpactoM').val()!=0){
			
			$.each(listaTipos, function (index){
				if (this.idTipo==$('#tipoImpactoM').val()){
					tipoImpacto=this.formas;
					return false;
				}
			});

			if (tipoImpacto==1){
				$('#RiesgoCaso1M').fadeIn('slow');
				$('#RiesgoCaso2M').hide();
				$('#impRiesgo2M').val(0);
			} else if (tipoImpacto==2){
				listarTipoXNivelImpacto(idTipoImpactoLocal,2);
				$('#RiesgoCaso2M').fadeIn('slow');
				$('#RiesgoCaso1M').hide();
				$('#impRiesgo1M').val('');
			}
    	}
    });



//FIN nostrar inputs de impactos

// Cargar combobox de NivelXImpacto

function listarTipoXNivelImpacto(idTipoImpactoLocal,tipo){
	if (tipo ==1){ //Registrar
		var data = {
			idTipoImpacto: idTipoImpactoLocal,
			idProyecto: idProyectoLocal
		};
		console.log(data);
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'GET',                
			url: getDescImpactLevelType + '/' + jsonData,
			dataType: "json",
			success: function(data){
				if (data!=null){
					$.each(data, function (i, value){
						$('#impRiesgo2').append("<option value="+ value.idNivelImpacto +">" + value.descripcion + "</option>");
			        });
				}
			},
			fail: 
				codigoError
			
		});
	} else if (tipo ==2) { //Modificar
		var data = {
			idTipoImpacto: idTipoImpactoLocal,
			idProyecto: idProyectoLocal
		};
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'GET',                
			url: getDescImpactLevelType + '/' + jsonData,
			dataType: "json",
			success: function(data){
				if (data!=null){
					$.each(data, function (i, value){
						$('#impRiesgo2M').append("<option value="+ value.idNivelImpacto +">" + value.descripcion + "</option>");
			        });
				}
			},
			fail: 
				codigoError
			
		});
	}
}

//Fin Cargar combobox de NivelXImpacto

//validar Decimales

function validarDecimales(numero)
{
	if (/^([0-9])*[.]?[0-9]{2}$/.test(numero)){
		return true;
	} else return false;
}

function validarNumero(numero)
{
	if ((/^([1-9]\d*)$/.test(numero))){
		return true;
	} else {
		return false;
	}
}


function validarProbaImpacto(numero) {
	if ((numero >= 0) && (numero <= 100)){
		return true;
	} else return false;
}



//Confirmar registro 97
function confirmarRegistro(data){
	if (validarDecimales($('#proRiesgo').val())){
		data.probabilidad=Math.round((data.probabilidad* 100 ))/100;
		return true;
	} else return false;
}

///Validar configuracion

function validarConfiguracion(data){
	// var muyBajo = $('#muyBajo').val();
	// var bajo = $('#bajo').val();
	// var medio = $('#medio').val();
	// var alto = $('#alto').val();
	// var muyAlto = $('#muyAlto').val();
	var flag=false;

	// if (isNaN(muyBajo)){
	// 	$('#errorMuyBajo').fadeIn('slow');
	// 	flag = true;
	// } else {
	// 	if (validarProbaImpacto(muyBajo)){
	// 		if (!validarDecimales(muyBajo)){
	// 			//redondeo
	// 			data.muyBajo = Math.round((data.muyBajo* 100 ))/100;
	// 		}
	// 	} else {
	// 		$('#errorMuyBajo').fadeIn('slow');
	// 		flag = true;
	// 	}
	// }

	// if (isNaN(bajo)){
	// 	$('#errorBajo').fadeIn('slow');
	// 	flag = true;
	// } else {
	// 	if (validarProbaImpacto(bajo)){
	// 		if (!validarDecimales(bajo)){
	// 			//redondeo
	// 			data.bajo = Math.round((data.bajo* 100 ))/100;
	// 		}
	// 	} else {
	// 		$('#errorBajo').fadeIn('slow');
	// 		flag = true;
	// 	}
	// }

	// if (isNaN(medio)){
	// 	$('#errorMedio').fadeIn('slow');
	// 	flag = true;
	// } else {
	// 	if (validarProbaImpacto(medio)){
	// 		if (!validarDecimales(medio)){
	// 			//redondeo
	// 			data.medio = Math.round((data.medio* 100 ))/100;
	// 		}
	// 	} else {
	// 		$('#errorMedio').fadeIn('slow');
	// 		flag = true;
	// 	}
	// }

	// if (isNaN(alto)){
	// 	$('#errorAlto').fadeIn('slow');
	// 	flag = true;
	// } else {
	// 	if (validarProbaImpacto(alto)){
	// 		if (!validarDecimales(alto)){
	// 			//redondeo
	// 			data.alto = Math.round((data.alto* 100 ))/100;
	// 		}
	// 	} else {
	// 		$('#errorAlto').fadeIn('slow');
	// 		flag = true;
	// 	}
	// }

	// if (isNaN(muyAlto)){
	// 	$('#errorMuyAlto').fadeIn('slow');
	// 	flag = true;
	// } else {
	// 	if (validarProbaImpacto(muyAlto)){
	// 		if (!validarDecimales(muyAlto)){
	// 			//redondeo
	// 			data.muyAlto = Math.round((data.muyAlto* 100 ))/100;
	// 		}
	// 	} else {
	// 		$('#errorMuyAlto').fadeIn('slow');
	// 		flag = true;
	// 	}
	// }

	// if ((muyBajo >= bajo) || (bajo >= medio) || (medio >= alto) || (alto >= muyAlto)) {
	// 	$('#errorImpactos').fadeIn('slow');
	// 	flag = true;
	// }
	
	return flag;
}

function listarTiposImpacto(){
	var data = {
		idProyecto: idProyectoLocal, 
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		url: getAllTypesImpacts + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			listaTipos = data;
			console.log(data);
			agregarDataTiposImpacto(data);
		},
		fail: 
			codigoError
		
	});
}

function agregarDataTiposImpacto(data){
	arreglo=data;
	if (arreglo!=null){
		$.each(arreglo, function (i, value){
			$('#tipoImpacto').append("<option value="+ value.idTipo +">" + value.tipoRi + "</option>");
        });
        $.each(arreglo, function (i, value){
			$('#tipoImpactoM').append("<option value="+ value.idTipo +">" + value.tipoRi + "</option>");
        });	
	}
}


function validarRegistro(data, caso){
	var flag = true; //si true guarda, false no guarda
	
	if (caso==1) {
		if (data.nombre=='') {
			flag=false;
			$('#errorNombre').fadeIn('slow');	
		}

		if (data.idPaqueteTrabajo==0){
			data.idPaqueteTrabajo=null;
		}
			
		if (data.idTipoImpacto==0){
			data.idTipoImpacto=null;
			flag=false;
			$('#errorTipoImpacto').fadeIn('slow');
		}

		if (tipoImpacto==1){
			if (data.impacto==''){
				data.impacto = null;
				flag=false;
				$('#errorImpacto1').fadeIn('slow');
			} else if ((isNaN(data.impacto)) || (!validarDecimales(data.impacto))){
				data.impacto = null;
				flag=false;
				$('#errorImpacto1').fadeIn('slow');
			}
		} else if (tipoImpacto==2){
			if (data.impacto==''){
				data.impacto = null;
				flag=false;
				$('#errorImpacto2').fadeIn('slow');
			} else if (data.impacto==0){
				data.impacto = null;
				flag=false;
				$('#errorImpacto2').fadeIn('slow');
			}
		}

		if (data.idNivelImpacto==0){
			data.idNivelImpacto=null;
			flag=false;
			$('#errorNivelImpacto').fadeIn('slow');
		}
		
		if (data.probabilidad==''){
			data.probabilidad=null;
			flag=false;
			$('#errorProba').fadeIn('slow');
		} else {
			if (isNaN(data.probabilidad)){
				$('#errorProba').fadeIn('slow');
				flag = false;
			} else {
					if (validarProbaImpacto(data.probabilidad)){
						if (!validarNumero(data.probabilidad)){
							$('#errorProba').fadeIn('slow');
							flag = false;
						}
					} else {
						$('#errorProba').fadeIn('slow');
						flag = false;
					}
			}	
		}

		if (data.costoPotencial==''){
				data.costoPotencial=null;
		} else {
			if (data.costoPotencial<0) {
				flag = false;
				 $('#errorCosto').fadeIn('slow');
			}
		}
		if (data.demoraPotencial=='')  {
			data.demoraPotencial=null;
		} else {
			if ((data.demoraPotencial<0) || (!validarNumero(data.demoraPotencial))) {
				flag = false;
				$('#errorTiempo').fadeIn('slow');
			}
		}
		if (data.idEmpleado==0){
			data.idContacto=null;
			flag=false;
			$('#errorResponsable').fadeIn('slow');
		}
		return flag;
	} else if (caso==2) {
		if (data.nombreRiesgo=='') {
			flag=false;
			$('#errorNombreM').fadeIn('slow');	}

		if (data.idPaqueteTrabajo==0){
			data.idPaqueteTrabajo=null;
		}
			
		if (data.idCategoriaRiesgo==0){
			data.idCategoriaRiesgo=null;
			flag=false;
			$('#errorTipoImpactoM').fadeIn('slow');
		} 
		// if (data.impacto==0){
		// 	data.impacto = null;
		// 	flag=false;
		// 	$('#errorImpactoM').fadeIn('slow');
		// } CORREGIR
		if (data.idContacto==0){
			data.idContacto=null;
			flag=false;
			$('#errorResponsableM').fadeIn('slow');
		}
		if (data.probabilidad==''){
			data.probabilidad=null;
			flag=false;
			$('#errorProbaM').fadeIn('slow');
		} else {
			if (isNaN(data.probabilidad)){
				$('#errorProbaM').fadeIn('slow');
				flag = false;
			} else {
					if (validarProbaImpacto(data.probabilidad)){
						if (!validarNumero(data.probabilidad)){
							$('#errorProba').fadeIn('slow');
							flag = false;
						}
					} else {
						$('#errorProbaM').fadeIn('slow');
						flag = false;
					}
			}	
		}
		console.log(data.costoPotencial);
		if (data.costoPotencial==''){
				data.costoPotencial=null;
		} else {
			if (data.costoPotencial<0) {
				flag = false;
				 $('#errorCostoM').fadeIn('slow');
			}
		}
		console.log(data.demoraPotencial);
		if (data.demoraPotencial==''){
			data.demoraPotencial=null;
		} else {
			if (data.demoraPotencial<0) {
				flag = false;
				$('#errorTiempoM').fadeIn('slow');
			}
		}
		return flag;
	}
		
}
