var getAllItems = "../../backend/riesgo/routesRiesgo/R_listaRiesgo";
var getItem = "../../backend/riesgo/routesRiesgo/R_obtenerRiesgo";
var addItem = "../../backend/riesgo/routesRiesgo/R_registrarRiesgo";
var updateItem = "../../backend/riesgo/routesRiesgo/R_modificarRiesgo";
var deleteItem = "../../backend/riesgo/routesRiesgo/R_eliminarRiesgo";
var getAllPackets = "../../backend/riesgo/routesRiesgo/R_listaPaquetesEDT";
var getAllObjects = "../../backend/riesgo/routesRiesgo/R_listaObjetosAfectados";
var getAllImpactLevels = "../../backend/riesgo/routesRiesgo/R_listaNivelesImpacto";
var getAllTeams = "../../backend/riesgo/routesRiesgo/R_listaEquipoRiesgo";

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

$(document).ready(main);

function main(){
	$("#idProyecto").hide();
	//listarPaquetesTrabajo();
	//listarObjetosAfectados();
	//listarNivelesImpacto();
	//listarEquipos();
	console.log($("#idProyecto").val());
	listarRiesgos();
	$(".glyphicon.glyphicon-search").one('click',function(){
		obtenerRiesgo();
		deshabilitarCampos();
	});
	$(".glyphicon.glyphicon-edit").one('click',function(){
		obtenerRiesgo();
	});

	$(".glyphicon.glyphicon-remove").one('click', function(){
//		var id = $(this).closest("tr").attr("id");
//		$("#dialog-confirm").dialog({
//			resizable: false,
//			modal: true,
//			height: 140,
//			buttons: {
//				Yes: function (){
//					
//					$(this).dialog("close");
//				},
//				No: function (){
//					$(this).dialog("close");
//				}
//			},
//			close: function (event, ui){
//				$(this).remove();
//			}
//		});
		var data = {
			id: $(this).closest("tr").attr("id")
		};
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'DELETE',
			url: deleteItem,
			data: jsonData,
			dataType: "json",
			success: function(data){
				alert("Se elimino el riesgo correctamente");
				listarRiesgos();
			},
			fail: codigoError
		});
	});

	$("#btnRegistrar").one('click', function(){
		var data = {
			idProyecto: $('#idProyecto').val(),
			nombre: $('#nomRiesgo').val(),
			idPaquete: $('#paqEdt').val(),
			idObjeto: $('#objAfe').val(),
			idImpacto: $('#impRiesgo').val(),
			probabilidad: $('#proRiesgo').val(),
			acciones: $('#accEsp').val(),
			costo: $('#costRiesgo').val(),
			tiempo: $('#tiemRiesgo').val(),
			idEquipo: $('#equRes').val()
		};
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
	});
	$('#btnModificar').one('click',function(){
		var data = {
			idProyecto: $('#idProyecto').val(),
			nombre: $('#nomRiesgoM').val(),
			idPaquete: $('#paqEdtM').val(),
			idObjeto: $('#objAfeM').val(),
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
			url: updateItem,
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

function listarPaquetesTrabajo(){
	var data = {
		idProyecto: $('#idProyecto').val()
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getAllPackets,
		data: jsonData,
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
	$('#btnModificar').show();
	var data = {
		id: $(this).closest("tr").attr("id")
	};
	var jsonData = JSON.stringify(data);
	console.log(jsonData);
	$.ajax({
		type: 'GET',
		url: getItem,
		data: jsonData,
		dataType: "json",
		success: function(data){
			var item = data;
			$('#nomRiesgoM').val(item.nombre);
			$('#paqEdtM').val(item.paquete);
			$('#objAfeM').val(item.objeto);
			$('#impRiesgoM').val(item.impacto);
			$('#proRiesgoM').val(item.probabilidad);
			$('#accEspM').val(item.acciones);
			$('#costRiesgoM').val(item.costo);
			$('#tiemRiesgoM').val(item.tiempo);
			$('#equResM').val(item.equipo);
		},
		fail: codigoError
	});
}

function listarObjetosAfectados(){
	var data = {
		idProyecto: $('#idProyecto').val()
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',
		url: getAllObjects,
		data: jsonData,
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
		url: getAllImpactLevels,
		data: jsonData,
		dataType: "json",
		success: function(data){
			var lista = data;
			$.each(lista, function (i, value){
				$('#impRiesgo').append("<option value="+ value.idImpacto +">" + value.descripcion + "</option>");
				$('#impRiesgoM').append("<option value="+ value.idImpacto +">" + value.descripcion + "</option>");
			});			
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
		url: getAllTeams,
		data: jsonData,
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

function listarRiesgos(){
		
	/*$.ajax({
		type: 'GET',
		url: getAllItems,
		dataType: "json",
		success: agregarDataFila(data),
		fail: codigoError
	});*/
	
	
	agregaDataFila(null);
	agregaDataComunFila (null);

}

function codigoError(){

	alert('Error');

}

function agregaDataFila(data){
	arreglo=arregloRiesgo;
	if (data!=null){
		arreglo=data;
	}
	for (i=0; i<arreglo.length;i++){
		
		agregaFilaRiesgo(arreglo[i],i);
		//agregaFilaRiesgo(arreglo[i]);
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
	/*
	severidad = Math.floor(parseFloat(arreglo.Impacto)*parseFloat(arreglo.Probabilidad)*100) / 100;
	$("#tablaRiesgos").append("<tr id='" + arreglo.idRiesgo + 
							  '"><td>" + arreglo.CodigoRiesgo + 
							  "</td><td>" + arreglo.NombreRiesgo + 
							  "</td><td>" + arreglo.Actividad + 
							  "</td><td>" + arreglo.Objetivo + 
							  "</td><td>" + arreglo.Impacto +
							  "</td><td>" + arreglo.Probabilidad +
							  "</td><td><a href='#'><span class='imagen-calculadora'></span></a>" +
							  "</td><td>" + severidad +
							  "</td><td>" + arreglo.Estrategia +
							  "</td><td>" + arreglo.AccionEspecifica +
							  "</td><td>" + arreglo.CostoEsperado +
							  "</td><td>" + arreglo.TiempoEsperado +
							  "</td><td>" + arreglo.Equipo + 
							  "</td><td><a data-toggle='modal' href='#myModal'><span class='glyphicon glyphicon-edit'></span></a>" + 
							  "</td><td><a href='#'><span class='glyphicon glyphicon-remove'></span></a>" + 
							  "</td><td><a href='#'><span class='glyphicon glyphicon-search'></span></a>" +
							  "</td></tr>");
	*/
	severidad = Math.floor(parseFloat(arreglo[3])*parseFloat(arreglo[4]) * 100) / 100;
	$("#tablaRiesgos").append('<tr id='+i+'><td>RIE'+a+'</td><td>'+arreglo[0]+'</td><td>'+arreglo[1]+'</td><td>'+arreglo[2]+'</td><td>'+arreglo[3]+'</td><td>'+arreglo[4]+'</td><td> <a href=\"#\" ><span class=\"imagen-calculadora\"></span></a></td><td>'+ severidad +'</td><td>'+arreglo[5]+'</td><td>'+arreglo[6]+'</td><td>'+arreglo[7]+'</td><td>'+arreglo[8]+'</td><td>'+arreglo[9]+'</td><td> <a data-toggle=\"modal\" href=\"#myModal\"><span class=\"glyphicon glyphicon-edit\"></span></a></td><td> <a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove\"></span></a></td><td> <a href=\"#\" ><span class=\"glyphicon glyphicon-search\"></span></a></td></tr>');

}

function agregaFilaRiesgoComun(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="costoUnitario'+(a)+'" placeholder="Costo" size="6" value="'+arreglo[2]+'">';
	
	
	$("#tablaRiesgosComunes").append('<tr id='+arreglo[0]+'><td>'+arreglo[0]+'</td><td>'+arreglo[1]+'</td><td>'+arreglo[2]+'</td><td>'+arreglo[3]+'</td><td>'+arreglo[4]+'</td><td><input type=\"checkbox\" name=\"'+arreglo[0]+'\"></td></tr>');

}


$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRiesgos();
	}
});

function grabarRiesgos(){
	alert("Se grabó");
}