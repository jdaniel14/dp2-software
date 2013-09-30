var getAllProbabilities = "../../api/R_listaHeadersProbabilidadRiesgo";
var addProbability = "../../api/R_registrarHeaderProbabilidadRiesgo";
var deleteAllProbabilities = "../../api/R_eliminarHeaderProbabilidadRiesgo";


$(document).ready(main);
localStorage.setItem("idProyecto",1);
var idProyectoLocal = localStorage.getItem("idProyecto");

function main(){

	listarProbabilidades();

/*---------------------------------AGREGAR UN NIVEL-------------------------------------------*/
	$("#btnAgregarNivel").click( function(){

		var flag = true;  //if true se registra, if false mensaje de error!
		var data = {
			idProyecto: idProyectoLocal,
			nivel: $('#numeroNivel').val(),
			descripcion: $('#descripcionProbabilidad').val(),
			minimo: $('#probabilidadMinNivel').val(),
			maximo: $('#probabilidadMaxNivel').val(),
		};

		$('#errorNivel').hide();
		$('#errorNivelMenor').hide();
		$('#errorProbabilidadMin').hide();
		$('#errorProbabilidadMinMayor').hide();
		$('#errorProbabilidadMax').hide();
		$('#errorProbabilidadMaxMenor').hide();
		$('#errorDescripcion').hide();

		console.log(data);
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'POST',
			url: addProbability,
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				alert("Se registró exitosamente el nivel " + item.descripcion);
				listarProbabilidades();
				$('#modalAgregarNivel').modal('hide');
			},
			fail: codigoError
		});
	});
/*---------------------------------FIN AGREGAR UN NIVEL-------------------------------------------*/
	$("#btnEliminarNivel").click(function(){
		var data = {
			idProyecto : idProyectoLocal
		}
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'DELETE',
			url: deleteAllProbabilities + '/' + data.idProyecto,
			data: jsonData,
			dataType: "html",
			success: function(){
				alert("Se elimino el riesgo correctamente");
				listarProbabilidades();
			},
			fail: codigoError
		});
		$('#modalEliminarNivel').modal('hide');
	});
/*-----------------------------------ELIMINAR UN NIVEL--------------------------------------------*/

/*---------------------------------FIN ELIMINAR UN NIVEL-------------------------------------------*/

}


/*---------------------------------LISTAR PROBABILIDADES-------------------------------------------*/
function listarProbabilidades(){
	$("#tablaProbabilidad").empty();
	var data = {
		idProyecto: idProyectoLocal, 
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		url: getAllProbabilities + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			var lista = data;
			console.log(data);
			agregarDataProba(data);
		},
		fail: codigoError
	});
}

function agregarDataProba(data){
	arreglo=data;
	if (arreglo!=null){
		for (i=0; i<arreglo.length;i++){
			agregaFilaProba(arreglo[i],i);
		}
	}
}

function agregaFilaProba(arreglo,i){
	$("#tablaProbabilidad").append("<tr><td>" + arreglo.nivel + 
	  "</td><td>" + arreglo.minimo + " %" +
	  "</td><td>" + arreglo.maximo + " %" +
	  "</td><td>" + arreglo.descripcion + 
	  "</td></tr>");
}
/*---------------------------------FIN LISTAR PROBABILIDADES-------------------------------------------*/

/*-----------------------------------------ERRORES----------------------------------------------------*/
function codigoError(){
	alert('Error');
}
/*-----------------------------------------FIN ERRORES----------------------------------------------------*/