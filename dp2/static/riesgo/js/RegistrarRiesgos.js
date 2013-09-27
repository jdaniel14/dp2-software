var getAllItems = "../../api/R_listaRiesgo";
var getItem = "../../api/R_obtenerRiesgo";
var addItem = "../../api/R_registrarRiesgo";
var updateItem = "../../api/R_modificarRiesgo";
var deleteItem = "../../api/R_eliminarRiesgo";
var getAllPackets = "../../api/R_listaPaquetesEDT";
var getAllCategories = "../../api/R_listaCategoriaRiesgo";
var getAllImpactLevels = "../../api/R_listaNivelesImpacto";
var getAllTeams = "../../api/R_listaEquipoRiesgo";
var getAllKnownItems = "../../api/R_listarRiesgoComun";
var addList = "../../api/R_asignarRiesgoComun"
var addConfg = "../../api/R_registrarConfiguracionProyecto";
var updateStatus = "../../api/R_modificarRiesgo";
var getStatus = "../../api/R_estadoLogicoRiesgo";

var arregloRiesgo = new Array(
								new Array('Riesgo 1','Actividad 1','Costo','0.2','0.1','evitar','Accion Especifica 1','100','2','Equipo 1'),
								new Array('Riesgo 2','Actividad 2','Tiempo','0.3','0.2','explotar','Accion Especifica 2','200','1','Equipo 3'),
								new Array('Riesgo 3','Actividad 3','Alcance','0.4','0.4','transferir','Accion Especifica 3','400','4','Equipo 5'),
								new Array('Riesgo 4','Actividad 4','Calidad','0.8','0.6','mejorar','Accion Especifica 4','500','3','Equipo 4'),
								new Array('Riesgo 5','Actividad 5','Calidad','0.3','0.6','compartir','Accion Especifica 5','500','2','Equipo 3')
							 );
var arregloRiesgoComunes = new Array(
								new Array('RSK10', 'Riesgo Común 10','0.3','0.9','0.27'),
								new Array('RSK11', 'Riesgo Común 11','0.4','0.6','0.24'),
								new Array('RSK12', 'Riesgo Común 12','0.1','0.8','0.08'),
								new Array('RSK13', 'Riesgo Común 13','0.5','0.7','0.35')
							);
var arregloConfiguraciones = new Array(1,0,0,0,0,0);
$(document).ready(main);

var buscar = "";
var idArray = [];

function main(){
	var aguirre = $("tbody#tablaRiesgos").children();
	console.log(aguirre);
	$("#idProyecto").hide();
	listarPaquetesTrabajo();
	listarCategoriasRiesgo();
	listarNivelesImpacto();
	//listarEquipos();
	listarRiesgos(buscar);
	listarRiesgosComunes();
	listarConfiguracion();
	


	$("#btnBuscar").click(function(){
		buscar = $("#buscar").val();
		listarRiesgos(buscar);
	});
	
	$(".glyphicon.glyphicon-edit").click( function(){
		alert("asd");
		obtenerRiesgo();
	});
	$(".glyphicon.glyphicon-remove").click( function(){
		
		var data = {
			id: $(this).closest("tr").attr("id")
		};
		idArray = [];
		idArray = data;
	});

	$("#btnEliminar").click( function(){
		var jsonData = JSON.stringify(idArray);
		$.ajax({
			type: 'POST',
			url: deleteItem + '/' + idArray.id,
			data: jsonData,
			dataType: "json",
			success: function(data){
				alert("Se elimino el riesgo correctamente");
				listarRiesgos();
			},
			fail: codigoError
		});
	});



	$("#btnRegistrar").click( function(){
		var data = {
			idProyecto: $('#idProyecto').val(),
			nombre: $('#nomRiesgo').val(),
			idPaqueteTrabajo: $('#paqEdt').val(),
			idCategoriaRiesgo: $('#objAfe').val(),
			impacto: $('#impRiesgo').val(),
			probabilidad: $('#proRiesgo').val(),
			acciones: $('#accEsp').val(),
			costoPotencial: $('#costRiesgo').val(),
			demoraPotencial: $('#tiemRiesgo').val(),
			idEquipo: $('#equRes').val()
		};
		console.log(data);
		if (confirmarRegistro(data)==true){
			console.log(data);
			var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'POST',
				url: addItem,
				data: jsonData,
				dataType: "json",
				success: function(data){
					var item = data;
					alert("Se registró exitosamente el Riesgo " + item.idRiesgo + ": " + item.nombre);
					listarRiesgos();
				},
				fail: codigoError
			});
		} else {
			alert("Hubo un problema con su registro");
		}
	});
	$("#btnModificar").click(function(){
		var data = {
			id: $('#idRiesgoM').val(),
			idProyecto: $('#idProyecto').val(),
			nombre: $('#nomRiesgoM').val(),
			idPaquete: $('#paqEdtM').val(),
			idCategoriaRiesgo: $('#objAfeM').val(),
			idImpacto: $('#impRiesgoM').val(),
			probabilidad: $('#proRiesgoM').val(),
			acciones: $('#accEspM').val(),
			costo: $('#costRiesgoM').val(),
			tiempo: $('#tiemRiesgoM').val(),
			idEquipo: $('#equResM').val()
		};
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'PUT',
			url: updateItem + '/' + data.id,
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				alert("Se actualizó exitosamente el Riesgo " + item.idRiesgo + ": " + item.nombre);
				listarRiesgos();
			},
			fail: codigoError
		});
	});

	$("#editarRiesgo").click(function(){
		alert("as");
	});
	//Función para agregar los riesgos conocidos al proyecto
	$("#btnAgregar").click( function(){
		var arreglo = [];
    	$('#tablaRiesgosComunes input[type="checkbox"]:checked').each(function(){
	        var $row = $(this).parents('tr'); 
	        arreglo.push($row.find('td:eq(5) input').val());
    	});
    	var data = {
    		lista: arreglo
    	};

		var jsonData = JSON.stringify(data);
		alert(jsonData);
		$.ajax({
			type: 'POST',
			url: addList,
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				alert("Se agregaron exitosamente los " + item.length + " riesgos");
				listarRiesgos();
			},
			fail: function(data){
				alert(data.me);
			}
		});
	});


	//Boton guardar datos en la ventana de configuración
	$("#btnConfiguracion").click( function(){
		var data = {
			idProyecto: $('#idProyecto').val(),
			muyBajo: $('#muyBajo').val(),
			bajo: $('#bajo').val(),
			medio: $('#medio').val(),
			alto: $('#alto').val(),
			muyAlto: $('#muyAlto').val()
		};
		if (!validarConfiguracion(data)){
			var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'POST',
				url: addConfg,
				data: jsonData,
				dataType: "json",
				success: function(data){
					$('#errorMuyBajo').hide();
					alert(data.me);
					$('#modalConfiguracion').modal('hide');
				},
				fail: function(data){
					alert(data.me);
				}
			});	
		}
		
	});

	$("#listarConf").click( function(){
		$('#errorMuyBajo').hide();
		$('#errorBajo').hide();
		$('#errorMedio').hide();
		$('#errorAlto').hide();
		$('#errorMuyAlto').hide();
		$('#errorImpactos').hide();
		$('#muyBajo').val('');
		$('#bajo').val('');
		$('#medio').val('');
		$('#alto').val('');
		$('#muyAlto').val('');
		listarConfiguracion()
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
				listarRiesgos();
			},
			fail: codigoError
		});
	});

}


function deshabilitarCampos(){
	$('#btnModificar').hide();
	$('#nomRiesgoM').prop( "disabled", true );
	$('#paqEdtM').prop( "disabled", true );
	$('#objAfeM').prop( "disabled", true );
	$('#impRiesgoM').prop( "disabled", true );
	$('#proRiesgoM').prop( "disabled", true );
	$('#accEspM').prop( "disabled", true );
	$('#costRiesgoM').prop( "disabled", true );
	$('#tiemRiesgoM').prop( "disabled", true );
	$('#equResM').prop( "disabled", true );
}

function listarConfiguracion(){

		var data = {
			idProyecto: $('#idProyecto').val()
		};
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'GET',
			url: getAllImpactLevels +  '/' + data.idProyecto,
			dataType: "json",
			success: function(data){
				listarConfiguracion2(data);			
			},
			fail: codigoError
		});
		//listarConfiguracion2(null);

		var data = {
		idProyecto: $('#idProyecto').val()
	};
}

function listarConfiguracion2(data){
	var arreglo = [];
	arreglo=data;
	if (arreglo!=null){
		$('#muyBajo').val(arreglo.muyBajo);
		$('#bajo').val(arreglo.bajo);
		$('#medio').val(arreglo.medio);
		$('#alto').val(arreglo.alto);
		$('#muyAlto').val(arreglo.muyAlto);
	} else {
		$('#muyBajo').val(arregloConfiguraciones[1]);
		$('#bajo').val(arregloConfiguraciones[2]);
		$('#medio').val(arregloConfiguraciones[3]);
		$('#alto').val(arregloConfiguraciones[4]);
		$('#muyAlto').val(arregloConfiguraciones[5]);
	};
}

function listarPaquetesTrabajo(){
	var data = {
		idProyecto: $('#idProyecto').attr('value')
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getAllPackets +'/'+ data.idProyecto,
		dataType: "json",
		success: function(data){
			var lista = data;
			$.each(lista, function (i, value){
				$('#paqEdt').append("<option value="+ value.id +">" + value.descripcion + "</option>");
				$('#paqEdtM').append("<option value="+ value.id +">" + value.descripcion + "</option>");
			});			
		},
		fail: codigoError
	});
}
function obtenerRiesgo(){
	// $('#modRiesgo').show();
	alert("xD");
	var data = {
			id_riesgo_x_proyecto: $(this).closest("tr").attr("id")
		};
		alert(id_riesgo_x_proyecto);
		var jsonData = JSON.stringify(data);
		console.log(jsonData);
		$.ajax({
			type: 'GET',
			url: getItem + '/' + data.id_riesgo_x_proyecto,
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				$('#idRiesgoM').val(item.idRiesgoProyecto);
				$('#nomRiesgoM').val(item.nombre);
				$('#paqEdtM').val(item.paqueteTrabajo);
				$('#objAfeM').val(item.categoria);
				$('#impRiesgoM').val(item.impacto);
				$('#proRiesgoM').val(item.probabilidad);
				$('#svrRiesgoM').val(item.severidad);
				$('#accEspM').val(item.accionesEspecificas);
				$('#costRiesgoM').val(item.costoEsperado);
				$('#tiemRiesgoM').val(item.tiempoEsperado);
				$('#equResM').val(item.equipoEesponsable);
				
			},
			fail: codigoError
		});
}

function listarCategoriasRiesgo(){
	var data = {
		id: $('#idProyecto').val()
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getAllCategories,
		dataType: "json",
		success: function(data){
			var lista = data;
			
			$.each(lista, function (i, value){
				$('#objAfe').append("<option value="+ value.id +">" + value.descripcion + "</option>");
				$('#objAfeM').append("<option value="+ value.id +">" + value.descripcion + "</option>");
			});	
				
		},
		fail: codigoError
	});
}
function listarNivelesImpacto(){
	var data = {
		idProyecto: $('#idProyecto').val()
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getAllImpactLevels + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			var lista = data;
			
				$('#impRiesgo').append("<option value="+ lista.muyBajo +">Muy Bajo</option>" +
					"<option value="+ lista.bajo +">Bajo</option>" +
					"<option value="+ lista.medio +">Medio</option>" +
					"<option value="+ lista.alto +">Alto</option>" +
					"<option value="+ lista.muyAlto +">Muy Alto</option>");

				$('#impRiesgoM').append("<option value="+ lista.muyBajo +">Muy Bajo</option>" +
					"<option value="+ lista.bajo +">Bajo</option>" +
					"<option value="+ lista.medio +">Medio</option>" +
					"<option value="+ lista.alto +">Alto</option>" +
					"<option value="+ lista.muyAlto +">Muy Alto</option>");
					
		},
		fail: codigoError
	});
}
function listarEquipos(){
	var data = {
		idProyecto: $('#idProyecto').val()
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getAllTeams + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			var lista = data;
			$.each(lista, function (i, value){
				$('#equRes').append("<option value="+ value.idEquipo +">" + value.nombre + "</option>");
				$('#equResM').append("<option value="+ value.idEquipo +">" + value.nombre + "</option>");
			});			
		},
		fail: codigoError
	});


}

function listarRiesgos(search){

	var data = {
		idProyecto: $('#idProyecto').val()
		//buscar: search ->DESCOMENTAR
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		//url: getAllItems + '/' + data.idProyecto + '&buscar='+data.buscar ,
		url: getAllItems + '/' + data.idProyecto,
		// url: getAllItems, ->DESCOMENTAR
		dataType: "json",
		success: function(data){
			var lista = data;
			agregaDataFila(data);
			$(".glyphicon.glyphicon-edit").click( function(){
				alert("asd");
				obtenerRiesgo();
			});
		},
		fail: codigoError
	});
	
	
	//agregaDataFila(null);

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
	
	
	// agregaDataComunFila (null);

}

function codigoError(){

	alert('Error');

}

function agregaDataFila(data){
	arreglo=data;
	//alert(arreglo);
	if (arreglo!=null){
		//alert(arreglo.size);
		for (i=0; i<arreglo.length;i++){

			agregaFilaRiesgo(arreglo[i],i);
			//agregaFilaRiesgo(arreglo[i]);
		}
	}
}

function agregaDataComunFila(data){
	arreglo=arregloRiesgoComunes;
	if (data!=null){
		arreglo=data;
	}
	for (i=0; i<arreglo.length;i++){
		
		agregaFilaRiesgoComun(arreglo[i],i);
	}
}

function agregaFilaRiesgo(arreglo,i){
//function agregaFilaRiesgo(item){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="costoUnitario'+(a)+'" placeholder="Costo" size="6" value="'+arreglo[2]+'">';
	
	// severidad = Math.floor(parseFloat(arreglo.Impacto)*parseFloat(arreglo.Probabilidad)*100) / 100;
	$("#tablaRiesgos").append("<tr id=\"" + arreglo.idRiesgoProyecto + 
							  "\"><td>" + arreglo.idRiesgoProyecto + 
							  "</td><td>" + arreglo.nombre + 
							  "</td><td>" + arreglo.paqueteTrabajo + 
							  "</td><td>" + arreglo.categoria + 
							  "</td><td>" + arreglo.impacto + 
							  "</td><td>" + arreglo.probabilidad +
							  "</td><td>" + arreglo.severidad +
							  "</td><td>" + arreglo.estrategia +
							  "</td><td>" + arreglo.accionesEspecificas +
							  "</td><td>" + arreglo.costoEsperado +
							  "</td><td>" + arreglo.tiempoEsperado +
							  "</td><td>" + arreglo.equipoEesponsable + 
							  "</td><td><a data-toggle=\"modal\" href=\"#myModal\"><span class=\"glyphicon glyphicon-edit\"></span></a>" + 
							  "</td><td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove\"></span></a>" + 
							  "</td><td><a data-toggle=\"modal\" href=\"#confirmRisk\" ><span class=\"glyphicon glyphicon-ok\"></span></a>" +
							  "</td></tr>");
	
	
	//$("#tablaRiesgos").append('<tr id='+i+'><td>RIE'+a+'</td><td>'+arreglo[0]+'</td><td>'+arreglo[1]+'</td><td>'+arreglo[2]+'</td><td>'+arreglo[3]+'</td><td>'+arreglo[4]+'</td><td> <a href=\"#\" ><span class=\"imagen-calculadora\"></span></a></td><td>'+ severidad +'</td><td>'+arreglo[5]+'</td><td>'+arreglo[6]+'</td><td>'+arreglo[7]+'</td><td>'+arreglo[8]+'</td><td>'+arreglo[9]+'</td><td> <a data-toggle=\"modal\" href=\"#myModal\"><span class=\"glyphicon glyphicon-edit\"></span></a></td><td> <a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove\"></span></a></td><td> <a data-toggle=\"modal\" href=\"#confirmRisk\" ><span class=\"glyphicon glyphicon-ok\"></span></a></td></tr>');

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
	

	// $("#tablaRiesgosComunes").append('<tr id='+arreglo[0]+'><td>'+arreglo[0]+'</td><td>'+arreglo[1]+'</td><td>'+arreglo[2]+'</td><td>'+arreglo[3]+'</td><td>'+arreglo[4]+'</td><td><input type=\"checkbox\" value=\"'+arreglo[0]+'\"></td></tr>');

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

//Calculo automatico de Severidad
$('#impRiesgo').change(
    function(){
         if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val()!=0)){
         	$('#svrRiesgo').val(Math.round(( $('#proRiesgo').val()*$('#impRiesgo').val() * 100 )) / 100);
         }
    });

$('#proRiesgo').change(
	function(){
		if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val()!=0)){
         	$('#svrRiesgo').val(Math.round(( $('#proRiesgo').val()*$('#impRiesgo').val() * 100 )) / 100);
         }
	});
$('#impRiesgoM').change(
    function(){
         if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val()!=0)){
         	$('#svrRiesgoM').val(Math.round(( $('#proRiesgoM').val()*$('#impRiesgoM').val() * 100 )) / 100);
         }
    });

$('#proRiesgoM').change(
	function(){
		if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val()!=0)){
         	$('#svrRiesgoM').val(Math.round(( $('#proRiesgoM').val()*$('#impRiesgoM').val() * 100 )) / 100);
         }
	});
//Calculo automatico de Severidad - Fin

//validar Decimales

function validarDecimales(numero)
{
	if ((!/^([0-9])*[.]?[0-9]{2}$/.test(numero))&&(!isNaN(numero))){
		return true;
	} else return false;
}

function validarProbaImpacto(numero) {
	if ((numero >= 0) && (numero <= 1)){
		return true;
	} else return false;
}



//Confirmar registro 97
function confirmarRegistro(data){
	alert(data.probabilidad);
	alert((!/^([0-9])*[.]?[0-9]{2}$/.test($('#proRiesgo').val())));
	if (validarDecimales($('#proRiesgo').val())){
		data.probabilidad=Math.round((data.probabilidad* 100 ))/100;
		return true;
	} else return false;
}

///Validar configuracion

function validarConfiguracion(data){
	var muyBajo = $('#muyBajo').val();
	var bajo = $('#bajo').val();
	var medio = $('#medio').val();
	var alto = $('#alto').val();
	var muyAlto = $('#muyAlto').val();
	var flag=false;

	if (isNaN(muyBajo)){
		$('#errorMuyBajo').fadeIn('slow');
		return true;
	} else {
		if (validarProbaImpacto(muyBajo)){
			if (!validarDecimales(muyBajo)){
				//redondeo
				data.muyBajo = Math.round((data.muyBajo* 100 ))/100;
			}
		} else {
			$('#errorMuyBajo').fadeIn('slow');
			return true;
		}
	}

	if (isNaN(bajo)){
		$('#errorBajo').fadeIn('slow');
		return true;
	} else {
		if (validarProbaImpacto(bajo)){
			if (!validarDecimales(bajo)){
				//redondeo
				data.bajo = Math.round((data.bajo* 100 ))/100;
			}
		} else {
			$('#errorBajo').fadeIn('slow');
			return true;
		}
	}

	if (isNaN(medio)){
		$('#errorMedio').fadeIn('slow');
		return true;
	} else {
		if (validarProbaImpacto(medio)){
			if (!validarDecimales(medio)){
				//redondeo
				data.medio = Math.round((data.medio* 100 ))/100;
			}
		} else {
			$('#errorMedio').fadeIn('slow');
			return true;
		}
	}

	if (isNaN(alto)){
		$('#errorAlto').fadeIn('slow');
		return true;
	} else {
		if (validarProbaImpacto(alto)){
			if (!validarDecimales(alto)){
				//redondeo
				data.alto = Math.round((data.alto* 100 ))/100;
			}
		} else {
			$('#errorAlto').fadeIn('slow');
			return true;
		}
	}

	if (isNaN(muyAlto)){
		$('#errorMuyAlto').fadeIn('slow');
		return true;
	} else {
		if (validarProbaImpacto(muyAlto)){
			if (!validarDecimales(muyAlto)){
				//redondeo
				data.muyAlto = Math.round((data.muyAlto* 100 ))/100;
			}
		} else {
			$('#errorMuyAlto').fadeIn('slow');
			return true;
		}
	}

	if ((muyBajo >= bajo) || (bajo >= medio) || (medio >= alto) || (alto >= muyAlto)) {
		$('#errorImpactos').fadeIn('slow');
		return true;
	}
	
	return flag;
}
	

		// $('#errorMuyBajo').fadeOut('slow');
		// $('#errorBajo').fadeOut('slow');
		// $('#errorMedio').fadeOut('slow');
		// $('#errorAlto').fadeOut('slow');
		// $('#errorMuyAlto').fadeOut('slow');