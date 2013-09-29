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

var nombre = "";
var idPaqueteTrabajo = 0;
var idCategoriaRiesgo = 0;

var buscar = {
	nombre:nombre,
	idPaqueteTrabajo:idPaqueteTrabajo,
	idCategoriaRiesgo:idCategoriaRiesgo,
}
var idArray = [];
var listaPaquetes;

function main(){

	$("#idProyecto").hide();
	listarPaquetesTrabajo();
	listarCategoriasRiesgo();
	// listarNivelesImpacto();
	//listarEquipos();
	listarRiesgos(buscar);
	listarRiesgosComunes();
	// listarConfiguracion();

	$("#btnBuscar").click(function(){
		buscar.nombre = $("#buscar").val();
		listarRiesgos(buscar);
		buscar.nombre='';
	});
	

	


	$("#btnRegistrar").click( function(){

		var flag = true;  //if true se registra, if false mensaje de error!
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
		
		if (validarRegistro(data,1)) {
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
					listarRiesgos(buscar);
				},
				fail: codigoError
			});
		} else {
			alert("Hubo un problema con su registro");
		}
	});
	$("#btnModificar").click(function(){
		var data = {
			idRiesgoXProyecto: $('#idRiesgoM').val(),
			idProyecto: $('#idProyecto').val(),
			nombreRiesgo: $('#nomRiesgoM').val(),
			// idPaqueteTrabajo: $('#paqEdt').val(),
			// idCategoriaRiesgo: $('#objAfe').val(),
			// impacto: $('#impRiesgo').val(),
			// probabilidad: $('#proRiesgo').val(),
			acciones: $('#accEspM').val(),
			// costoPotencial: $('#costRiesgo').val(),
			// demoraPotencial: $('#tiemRiesgo').val(),
			// idEquipo: $('#equRes').val()
		};
		
		if ($('#paqEdtM').val()==0){
			data.idPaqueteTrabajo=null;
		} else {
			data.idPaqueteTrabajo= $('#paqEdtM').val();
		}
		
		if ($('#objAfeM').val()==0){
			data.idCategoriaRiesgo=null;
		} else {
			data.idCategoriaRiesgo= $('#objAfeM').val();
		}
		if ($('#impRiesgoM').val()==0){
			data.impacto = null;
		} else {
			data.impacto= $('#impRiesgoM').val();
		}
		if ($('#equResM').val()==0){
			data.idEquipo=null;
		} else {
			data.idEquipo= $('#equResM').val();
		}
		if ($('#proRiesgoM').val()==''){
			data.probabilidad=null;
		} else {
			data.probabilidad= $('#proRiesgoM').val();
		}
		if ($('#costRiesgoM').val()==''){
			data.costoPotencial=null;
		} else {
			data.costoPotencial= $('#costRiesgoM').val();
		}
		if ($('#tiemRiesgoM').val()==''){
			data.demoraPotencial=null;
		} else {
			data.demoraPotencial= $('#tiemRiesgoM').val();
		}
		// var data = {
		// 	idRiesgoXProyecto: $('#idRiesgoM').val(),
		// 	idProyecto: $('#idProyecto').val(),
		// 	nombreRiesgo: $('#nomRiesgoM').val(),
		// 	idPaqueteTrabajo: $('#paqEdtM').val(),
		// 	idCategoriaRiesgo: $('#objAfeM').val(),
		// 	impacto: $('#impRiesgoM').val(),
		// 	probabilidad: $('#proRiesgoM').val(),
		// 	acciones: $('#accEspM').val(),
		// 	costoPotencial: $('#costRiesgoM').val(),
		// 	demoraPotencial: $('#tiemRiesgoM').val(),
		// 	idEquipo: $('#equResM').val()
		// };
		console.log(data);
		if ((data.nombreRiesgo!='') && (data.idPaqueteTrabajo!=null) && (data.idCategoriaRiesgo!=null)){
			var jsonData = JSON.stringify(data);
			$.ajax({
				type: 'PUT',
				url: updateItem + '/' + data.idRiesgoXProyecto,
				data: jsonData,
				dataType: "json",
				success: function(data){
					var item = data;
					alert("Se actualizó exitosamente el Riesgo " + item.idRiesgo + ": " + item.nombre);
					listarRiesgos(buscar);
				},
				fail: codigoError
			});
		} else {
			alert("Hubo un problema con su registro");
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
    		idProyecto : $('#idProyecto').val()
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
		$('#muyBajo').val('');
		$('#bajo').val('');
		$('#medio').val('');
		$('#alto').val('');
		$('#muyAlto').val('');
		limpiarConfiguracion();
		listarConfiguracion();

	});


	$("#registrarRiesgo").click( function(){
		limpiarImpacto();
		listarNivelesImpacto();
		$('#nomRiesgo').val('');
		$('#paqEdt').val(0);
		$('#objAfe').val(0);
		$('#impRiesgo').val(0);
		$('#proRiesgo').val('');
		$('#svrRiesgo').val('');
		$('#accEsp').val('');
		$('#costRiesgo').val('');
		$('#tiemRiesgo').val('');
		$('#equRes').val(0);
		
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

function limpiarConfiguracion(){
	
		$('#errorMuyBajo').hide();
		$('#errorBajo').hide();
		$('#errorMedio').hide();
		$('#errorAlto').hide();
		$('#errorMuyAlto').hide();
		$('#errorImpactos').hide();
		
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
}

function listarConfiguracion2(data){
	// var arreglo = [];

	arreglo=data;
	
	if (arreglo!=null){
		$('#muyBajo').val(arreglo[0].muyBajo);
		$('#bajo').val(arreglo[0].bajo);
		$('#medio').val(arreglo[0].medio);
		$('#alto').val(arreglo[0].alto);
		$('#muyAlto').val(arreglo[0].muyAlto);
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
			listaPaquetes = lista;
			$.each(lista, function (i, value){
				$('#paqEdt').append("<option value="+ value.id +">" + value.descripcion + "</option>");
				$('#paqEdtM').append("<option value="+ value.id +">" + value.descripcion + "</option>");
                                $('#idCategoriaRiesgo').append("<option value="+ value.id +">" + value.descripcion + "</option>");
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
				if (item.paqueteTrabajo==null){
					$('#paqEdtM').val(0);
				} else $('#paqEdtM').val(item.paqueteTrabajo);
				if (item.categoria==null){
					$('#objAfeM').val(0);
				} else $('#objAfeM').val(item.categoria);
				if (item.impacto==null){
					$('#impRiesgoM').val(0);
				} else $('#impRiesgoM').val(item.impacto);
				if (item.equipoEesponsable==null){
					$('#equResM').val(0);
				} else $('#equResM').val(item.equipoEesponsable);

				$('#idRiesgoM').val(item.idRiesgoProyecto);
				$('#nomRiesgoM').val(item.nombre);
				
				$('#proRiesgoM').val(item.probabilidad);
				$('#svrRiesgoM').val(item.severidad);
				$('#accEspM').val(item.accionesEspecificas);
				$('#costRiesgoM').val(item.costoEsperado);
				$('#tiemRiesgoM').val(item.tiempoEsperado);
				
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
			
				$('#impRiesgo').append("<option value="+ lista[0].muyBajo +">Muy Bajo</option>" +
					"<option value="+ lista[0].bajo +">Bajo</option>" +
					"<option value="+ lista[0].medio +">Medio</option>" +
					"<option value="+ lista[0].alto +">Alto</option>" +
					"<option value="+ lista[0].muyAlto +">Muy Alto</option>");

				$('#impRiesgoM').append("<option value="+ lista[0].muyBajo +">Muy Bajo</option>" +
					"<option value="+ lista[0].bajo +">Bajo</option>" +
					"<option value="+ lista[0].medio +">Medio</option>" +
					"<option value="+ lista[0].alto +">Alto</option>" +
					"<option value="+ lista[0].muyAlto +">Muy Alto</option>");
					
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
	$("#tablaRiesgos").empty();
	var data = {
		idProyecto: $('#idProyecto').val(),
        nombre: $('#nombre').val(),
        idPaqueteTrabajo : 0,
		idCategoriaRiesgo : $('#idCategoriaRiesgo').val(),    
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
			});
			$(".glyphicon.glyphicon-remove").click( function(){
				var idRiesgoProyecto= $(this).closest("tr").attr("id");
				eliminarRiesgo(idRiesgoProyecto);

			});
		},
		fail: codigoError
	});

	//agregaDataFila(null);

}

function eliminarRiesgo(id){
	$("#btnEliminar").click(function(){
		alert("xD");
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
	if (/^([0-9])*[.]?[0-9]{2}$/.test(numero)){
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
		flag = true;
	} else {
		if (validarProbaImpacto(muyBajo)){
			if (!validarDecimales(muyBajo)){
				//redondeo
				data.muyBajo = Math.round((data.muyBajo* 100 ))/100;
			}
		} else {
			$('#errorMuyBajo').fadeIn('slow');
			flag = true;
		}
	}

	if (isNaN(bajo)){
		$('#errorBajo').fadeIn('slow');
		flag = true;
	} else {
		if (validarProbaImpacto(bajo)){
			if (!validarDecimales(bajo)){
				//redondeo
				data.bajo = Math.round((data.bajo* 100 ))/100;
			}
		} else {
			$('#errorBajo').fadeIn('slow');
			flag = true;
		}
	}

	if (isNaN(medio)){
		$('#errorMedio').fadeIn('slow');
		flag = true;
	} else {
		if (validarProbaImpacto(medio)){
			if (!validarDecimales(medio)){
				//redondeo
				data.medio = Math.round((data.medio* 100 ))/100;
			}
		} else {
			$('#errorMedio').fadeIn('slow');
			flag = true;
		}
	}

	if (isNaN(alto)){
		$('#errorAlto').fadeIn('slow');
		flag = true;
	} else {
		if (validarProbaImpacto(alto)){
			if (!validarDecimales(alto)){
				//redondeo
				data.alto = Math.round((data.alto* 100 ))/100;
			}
		} else {
			$('#errorAlto').fadeIn('slow');
			flag = true;
		}
	}

	if (isNaN(muyAlto)){
		$('#errorMuyAlto').fadeIn('slow');
		flag = true;
	} else {
		if (validarProbaImpacto(muyAlto)){
			if (!validarDecimales(muyAlto)){
				//redondeo
				data.muyAlto = Math.round((data.muyAlto* 100 ))/100;
			}
		} else {
			$('#errorMuyAlto').fadeIn('slow');
			flag = true;
		}
	}

	if ((muyBajo >= bajo) || (bajo >= medio) || (medio >= alto) || (alto >= muyAlto)) {
		$('#errorImpactos').fadeIn('slow');
		flag = true;
	}
	
	return flag;
}


function validarRegistro(data, caso){
	var flag = true; //si true guarda, false no guarda
	if (data.nombre=='') {
		flag=false;
	}

	if (data.idPaqueteTrabajo==0){
		data.idPaqueteTrabajo=null;
	}
		
	if (data.idCategoriaRiesgo==0){
		data.idCategoriaRiesgo=null;
		flag=false;
	} 
	if (data.impacto==0){
		data.impacto = null;
		flag=false;
	}
	if (data.idEquipo==0){
		data.idEquipo=null;
	}
	if (data.probabilidad==''){
		data.probabilidad=null;
		flag=false;
	} else {
		if (isNaN(data.probabilidad)){
		// $('#errorAlto').fadeIn('slow'); ERROR PROBA
		flag = false;
		} else {
			if (validarProbaImpacto(data.probabilidad)){
				if (!validarDecimales(data.probabilidad)){
					//redondeo
					data.probabilidad = Math.round((data.probabilidad* 100 ))/100;
				}
			} else {
				// $('#errorAlto').fadeIn('slow'); ERROR PROBA
				flag = false;
			}
		}	
	}
	if (data.costoPotencial==''){
			data.costoPotencial=null;
	}
	if (data.demoraPotencial==''){
		data.demoraPotencial=null;
	}
		
}
	

		// $('#errorMuyBajo').fadeOut('slow');
		// $('#errorBajo').fadeOut('slow');
		// $('#errorMedio').fadeOut('slow');
		// $('#errorAlto').fadeOut('slow');
		// $('#errorMuyAlto').fadeOut('slow');}
