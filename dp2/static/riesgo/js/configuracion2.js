var getAllProbabilities = "../../api/R_listaHeadersProbabilidadRiesgo";
var addProbability = "../../api/R_registrarHeaderProbabilidadRiesgo";
var deleteAllProbabilities = "../../api/R_eliminarHeaderProbabilidadRiesgo";
var getAllHeadersImpacts = "../../api/R_listaHeadersImpactoRiesgo";
var deleteAllImpacts = "../../api/R_eliminarHeaderImpactoRiesgo";
var addImpact = "../../api/R_registrarHeaderImpactoRiesgo";
var getAllTypesImpacts = "../../api/R_listaTiposImpactoRiesgo";
var getMaxProbability = "../../api/R_obtenerProbabilidadRiesgoMaxima";

$(document).ready(main);
// localStorage.setItem("idProyecto",1);

var idProyectoLocal = localStorage.getItem("idProyecto");
var tipoImpacto=0;
var listaProbabilidades=[];

var listaNiveles = [];

/*------------------------------VALIDACIONES AGREGAR PROBABILIDAD---------------------------*/


function esNumEntPos(strNum){
	if (strNum == null || strNum.length == 0) return false;
	for (var i = 0; i < strNum.length; i++){
		var car = strNum[i] ;
		if (isNaN(car))
			return false;
	}
	if (strNum*1 == 0) return false;
	return true;
}
function esMayor(val1,val2){
	if (!esNumEntPos(val1)||!esNumEntPos(val2))
		return false;
	return val1*1 > val2*1;
}
function existeNivel(numeroNivel){
	if (listaProbabilidades==null) return false;
	for (var i = 0; i < listaProbabilidades.length;i++){
		if (listaProbabilidades[i].nivel*1 == numeroNivel*1)
			return true;
	}
	return false;
}
function existeNivelImpacto(numeroNivel){
	if (listaNiveles==null) return false;
	for (var i = 0; i < listaNiveles.length;i++){
		if (listaNiveles[i].nivel*1 == numeroNivel*1)
			return true;
	}
	return false;
}
function contieneProbabilidad(probIni,probFin){
	var valIni = probIni*1;
	var valFin = probFin*1;
	if (listaProbabilidades==null) return false;
	for (var i = 0; i < listaProbabilidades.length;i++){
		var min = listaProbabilidades[i].minimo*1;
		var max = listaProbabilidades[i].maximo*1;
		if (valIni < min && valFin > max)
			return true;
	}
	return false;
}
function cruzaProbabilidad(prob){
	var val = prob*1;
	if (listaProbabilidades==null) return false;
	for (var i = 0; i < listaProbabilidades.length;i++){
		var min = listaProbabilidades[i].minimo*1;
		var max = listaProbabilidades[i].maximo*1;
		if (val >= min && val <= max)
			return true;
	}
	return false;
}

function validarAgregarNivelImpacto (){
	var pesoNivel = "" + $("#numeroPesoImpacto").val();
	var descripcionImpacto = "" + $("#descripcionImpacto").val();
	var error = false;
	if (!esNumEntPos(pesoNivel)){
		$("#errorPesoImpacto").show();
		error = true;
	}
	else
		$("#errorPesoImpacto").hide();
	if (existeNivelImpacto(pesoNivel)){
		$("#errorPesoRegistrado").show();
		error = true;
	}
	else
		$("#errorPesoRegistrado").hide();
	if (descripcionImpacto == null || descripcionImpacto.length == 0){
		$("#errorDescripcionImpacto").show();
		error = true;
	}
	else
		$("#errorDescripcionImpacto").hide();
	
	return !error;
}



function validarAgregarNivel(){
	var numeroNivel = "" + $("#numeroNivel").val();
	var probabilidadMinNivel = "" + $("#probabilidadMinNivel").val();
	var probabilidadMaxNivel = "" + $("#probabilidadMaxNivel").val();
	var descripcionProbabilidad = "" + $("#descripcionProbabilidad").val();
	var error = false;
	if (!esNumEntPos(numeroNivel)){
		$("#errorNivel").show();
		error = true;
	}
	else
		$("#errorNivel").hide();
		
	if (existeNivel(numeroNivel)){
		$("#errorNivelMenor").show();
		error = true;
	}
	else
		$("#errorNivelMenor").hide();
		
	if (!esNumEntPos(probabilidadMinNivel) || esMayor(probabilidadMinNivel,probabilidadMaxNivel) || esMayor(probabilidadMinNivel,100)){
		$("#errorProbabilidadMin").show();
		error = true;
	}
	else
		$("#errorProbabilidadMin").hide();

	
	if (!esNumEntPos(probabilidadMaxNivel) || esMayor(0,probabilidadMaxNivel) || esMayor(probabilidadMinNivel,probabilidadMaxNivel) || esMayor(probabilidadMaxNivel,100)){
		$("#errorProbabilidadMax").show();
		error = true;
	}
	else
		$("#errorProbabilidadMax").hide();
	
	if (contieneProbabilidad(probabilidadMinNivel,probabilidadMinNivel)){
		$("#errorProbabilidadMinMayor").show();
		$("#errorProbabilidadMaxMenor").show();
		error = true;
	}else{
		$("#errorProbabilidadMinMayor").hide();
		$("#errorProbabilidadMaxMenor").hide();
	}
	
	if (cruzaProbabilidad(probabilidadMinNivel)){
		$("#errorProbabilidadMinMayor").show();
		error = true;
	}
		
	if (cruzaProbabilidad(probabilidadMaxNivel)){
		$("#errorProbabilidadMaxMenor").show();
		error = true;
	}
	
	if (descripcionProbabilidad == null || descripcionProbabilidad.length == 0){
		$("#errorDescripcion").show();
		error = true;
	}
	else
		$("#errorDescripcion").hide();
	
	return !error;
}

/*------------------------------FIN VALIDACIONES AGREGAR PROBABILIDAD---------------------------*/
function main(){
	listarProbabilidades();
	listarHeaderNivelImpacto();
	
	// listarTiposImpactosXNivelImpactos();
/*---------------------------------AGREGAR UN NIVEL-------------------------------------------*/
	
	$("#btnAgregarNivel").click( function(){

		if (!validarAgregarNivel()) return;  //if true se registra, if false mensaje de error!
		var data = {
			idProyecto: idProyectoLocal,
			nivel: $('#numeroNivel').val(),
			descripcion: $('#descripcionProbabilidad').val(),
			minimo: $('#probabilidadMinNivel').val(),
			maximo: $('#probabilidadMaxNivel').val(),
			idUsuario: localStorage.getItem("idUsuario")
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
				$('#modalAgregarNivel').modal('hide');
				$("#labelExitoModal").html("");
                $("#labelExitoModal").append("Se registró exitosamente el nivel " + item.descripcion);
                $('#modalExito').modal('show');
				// alert("Se registró exitosamente el nivel " + item.descripcion);
				listarProbabilidades();
				
			},
			fail: codigoError
		});
	});
/*---------------------------------FIN AGREGAR UN NIVEL-------------------------------------------*/

/*---------------------------------AGREGAR UN NIVEL IMPACTO-------------------------------------------*/
	
	$("#btnAgregarNivelImpacto").click( function(){

		if (!validarAgregarNivelImpacto()) return;  //if true se registra, if false mensaje de error!
		var data = {
			idProyecto: idProyectoLocal,
			nivel: $('#numeroPesoImpacto').val(),
			descripcion: $('#descripcionImpacto').val(),
			idUsuario: localStorage.getItem("idUsuario")
		};

		$('#errorPesoImpacto').hide();
		$('#errorPesoRegistrado').hide();
		$('#errorDescripcionImpacto').hide();

		console.log(data);
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'POST',
			url: addImpact,
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				$('#modalAgregarNivelImpacto').modal('hide');
				$("#labelExitoModal").html("");
                $("#labelExitoModal").append("Se registró exitosamente el nivel " + item.descripcion);
                $('#modalExito').modal('show');
				// alert("Se registró exitosamente el nivel " + item.descripcion);
				listarHeaderNivelImpacto();
				
			},
			fail: codigoError
		});
	});
/*---------------------------------FIN AGREGAR UN NIVEL-------------------------------------------*/

/*-----------------------------------ELIMINAR UN NIVEL PROBABILIDAD--------------------------------------------*/

	$("#btnEliminarNivel").click(function(){
		var data = {
			idProyecto : idProyectoLocal,
			idUsuario: localStorage.getItem("idUsuario")
		}
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'DELETE',
			// url: deleteAllProbabilities + '/' + data.idProyecto,
			url: deleteAllProbabilities + '/' + jsonData,
			data: jsonData,
			dataType: "html",
			success: function(){
				// alert("Se elimino el riesgo correctamente");
				$("#labelExitoModal").html("");
                $("#labelExitoModal").append("Se elimino el riesgo correctamente");
                $('#modalExito').modal('show');

				listarProbabilidades();
				$('#btnModalAgregarNivel').prop('disabled', false);
				$('#btnAgregarNivel').prop('disabled', false);
			},
			fail: codigoError
		});
		$('#modalEliminarNivel').modal('hide');
	});

/*---------------------------------FIN ELIMINAR UN NIVEL PROBABILIDAD-------------------------------------------*/


/*-----------------------------------ELIMINAR UN NIVEL IMPACTO--------------------------------------------*/

	$("#btnEliminarNivelImpacto").click(function(){
		var data = {
			idProyecto : idProyectoLocal,
			idUsuario: localStorage.getItem("idUsuario")
		}
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'DELETE',
			// url: deleteAllImpacts + '/' + data.idProyecto,
			url: deleteAllImpacts + '/' +jsonData,
			data: jsonData,
			dataType: "html",
			success: function(){
				$("#labelExitoModal").html("");
                $("#labelExitoModal").append("Se elimino el riesgo correctamente");
                $('#modalExito').modal('show');

				// alert("Se elimino el riesgo correctamente");
				listarHeaderNivelImpacto();
			},
			fail: codigoError
		});
		$('#modalEliminarNivelImpacto').modal('hide');
	});

/*---------------------------------FIN ELIMINAR UN NIVEL IMPACTO-------------------------------------------*/

/*-------------------------LIMPIAR Y VALIDACIONES DEL MODAL AGREGAR IMPACTOS----------------------------------*/
$("#btnModalAgregarNivelImpacto").click(function(){
		$("#errorPesoImpacto").hide();
		$("#numeroPesoImpacto").val("");
		$("#errorDescripcionImpacto").hide();
		$("#descripcionImpacto").val("");
		$("#errorPesoRegistrado").hide();
	});
/*-------------------------FIN LIMPIAR Y VALIDACIONES DEL MODAL AGREGAR IMPACTOS----------------------------------*/

/*-------------------------LIMPIAR Y VALIDACIONES DEL MODAL AGREGAR PROBABILIDADES----------------------------------*/

	$("#btnModalAgregarNivel").click(function(){
		$("#errorNivel").hide();
		$("#numeroNivel").val("");
		$("#errorNivelMenor").hide();
		$("#probabilidadMinNivel").val("");
		$("#errorProbabilidadMin").hide();
		$("#errorProbabilidadMinMayor").hide();
		$("#probabilidadMaxNivel").val("");
		$("#errorProbabilidadMax").hide();
		$("#errorProbabilidadMaxMenor").hide();
		$("#descripcionProbabilidad").val("");
		$("#errorDescripcion").hide();
		obtenerMayorProbabilidad();
	});
}
/*-------------------------FIN LIMPIAR Y VALIDACIONES DEL MODAL AGREGAR PROBABILIDADES----------------------------------*/





/*---------------------OBTENER MAYOR PROBABILIDAD--------------------------*/

function obtenerMayorProbabilidad () {


	var data = {
		idProyecto: idProyectoLocal, 
		idUsuario: localStorage.getItem("idUsuario")
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		// url: getMaxProbability + '/' + data.idProyecto,

		url: getMaxProbability + '/' +jsonData,
		success: function(data){
			var obj = JSON.parse(data);
			// console.log(obj);
			if (obj==null) {
				$('#numeroNivel').val(1);
				$('#probabilidadMinNivel').val(1);
			} else if ((obj.maximo*1)==100){
				$('#btnModalAgregarNivel').attr("disabled", "disabled");
				$('#btnAgregarNivel').attr("disabled", "disabled");
			} else {
				$('#numeroNivel').val((obj.nivel*1) + 1);
				$('#probabilidadMinNivel').val((obj.maximo*1) + 1);
			}
		},
		fail: codigoError
	});
// 

}


/*---------------------FIN AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO---TIPO 2--------------------------*/

/*---------------------------------LISTAR PROBABILIDADES-------------------------------------------*/

function listarProbabilidades(){
	$("#tablaProbabilidad").empty();
	var data = {
		idProyecto: idProyectoLocal, 
		idUsuario: localStorage.getItem("idUsuario")
	};
	

	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		// url: getAllProbabilities + '/' + data.idProyecto,
		url: getAllProbabilities + '/' +jsonData,
		dataType: "json",
		success: function(data){
			listaProbabilidades = data;
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
	// alert('Error');
	$("#labelErrorModal").html("");
    $("#labelErrorModal").append("Se detecto un error");
    $('#ModaldeErrores').modal('show');

}
/*-----------------------------------------FIN ERRORES----------------------------------------------------*/

/*-------------------------------------MOSTRAR HEADER NIVEL IMPACTO------------------------------------------*/

function listarHeaderNivelImpacto(){
	$("#headerTipoImpactoXNivelImpacto").empty();
	$("#tablaImpacto").empty();
	var data = {
		idProyecto: idProyectoLocal,
		 idUsuario: localStorage.getItem("idUsuario")
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		// url: getAllHeadersImpacts + '/' + data.idProyecto,
		url: getAllHeadersImpacts + '/' +jsonData,
		dataType: "json",
		success: function(data){
			listaNiveles = data;
			console.log(data);
			agregarDataImpacto(data);
		},
		fail: codigoError
		// fail: agregarDataImpacto(listaNiveles)
	});
}

function agregarDataImpacto(data){
	arreglo=data;
	if (arreglo!=null){
		$("#headerTipoImpactoXNivelImpacto").append("<th> Impacto </th>");
		
                for (i=0; i<arreglo.length;i++){
			agregaFilaImpacto(arreglo[i],i);
		}
		$("#headerTipoImpactoXNivelImpacto").append("<th colspan =\"2\"> Acciones </th>");


	}
}

function agregaFilaImpacto(arreglo,i){
	$("#headerTipoImpactoXNivelImpacto").append("<th>" + arreglo.descripcion + "</th>");
	$("#tablaImpacto").append("<tr><td>" + arreglo.nivel + 
	  "</td><td>" + arreglo.descripcion + "</td></tr>");
}
/*---------------------------------FIN MOSTRAR HEADER NIVEL IMPACTO------------------------------------------*/


