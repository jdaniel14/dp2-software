var getAllProbabilities = "../../api/R_listaHeadersProbabilidadRiesgo";
var addProbability = "../../api/R_registrarHeaderProbabilidadRiesgo";
var deleteAllProbabilities = "../../api/R_eliminarHeaderProbabilidadRiesgo";
var getAllHeadersImpacts = "../../api/R_listaHeadersImpactoRiesgo";
var deleteAllImpacts = "../../api/R_eliminarHeaderImpactoRiesgo";
var addImpact = "../../api/R_registrarHeaderImpactoRiesgo";
var getAllTypesImpacts = "../../api/R_listaTiposImpactoRiesgo";
var addTypeImpactsXLevelImpacts1 = "../../api/R_registrarTipoImpactoXNivelImpacto1";
var addTypeImpactsXLevelImpacts2 = "../../api/R_registrarTipoImpactoXNivelImpacto2";
var getAllTypeImpactsXLevelImpacts = "../../api/R_listarTipoImpactoXNivelImpacto"

$(document).ready(main);
localStorage.setItem("idProyecto",1);
var idProyectoLocal = localStorage.getItem("idProyecto");
var tipoImpacto=0;
var listaProbabilidades=[];
// var objeto1 = {
// 	descripcion: "Muy Bajo",
// 	tipo: 2,
// 	idTipo: 2
// };
// var objeto2 = {
// 	descripcion: "Bajo",
// 	tipo: 2,
// 	idTipo: 2
// };
// var objeto3 = {
// 	descripcion: "Muy Alto",
// 	tipo: 2,
// 	idTipo: 1
// };
// var listaNiveles = [
// 	objeto1,
// 	objeto2,
// 	objeto3];

// var listaTipos = [
// 	{idTipoImpacto:1,
// 	descripcion:"seguridad",
// 	tipo:2},
// 	{idTipoImpacto:2,
// 	descripcion:"Costo",
// 	tipo:1},
// 	{idTipoImpacto:3,
// 	descripcion:"Cronograma",
// 	tipo:1},
// 	{idTipoImpacto:4,
// 	descripcion:"Ambiente",
// 	tipo:2},
// 	];

// var listafila1 = [
// 	{
// 		min:0,
// 		max:1000,
// 		descripcion:""
// 	},
// 	{
		
// 		min:1001,
// 		max:2000,
// 		descripcion:""
// 	},
// 	{
// 		min:2001,
// 		max:2000,
// 		descripcion:""
// 	}
// ];

// var listafila2 = [
// 	{
// 		min:0,
// 		max:1000,
// 		descripcion:"Leve"
// 	},
// 	{
		
// 		min:1001,
// 		max:2000,
// 		descripcion:"Grave"
// 	},
// 	{
// 		min:2001,
// 		max:2000,
// 		descripcion:"Muy Grave"
// 	}
// ];
// var listaTipoImpacto = [
// 	{
// 		idTipoImpactoXNivelImpacto:1,
// 		descripcionTipoImpacto: "Costos",
// 		tipoImpacto: 1,
// 		lista:listafila1
// 	},
// 	{
// 		idTipoImpactoXNivelImpacto:2,
// 		descripcionTipoImpacto: "Seguridad",
// 		tipoImpacto: 2,
// 		lista:listafila2
// 	},
	
// ];

	
// console.log(listaTipoImpacto);	
/*------------------------------VALIDACIONES AGREGAR PROBABILIDAD---------------------------*/


function esNumEntPos(strNum){
	if (strNum == null || strNum.length == 0) return false;
	for (var i = 0; i < strNum.length; i++){
		var car = strNum[i] ;
		if (isNaN(car))
			return false;
	}
	// if (strNum*1 == 0 || strNum*1 > 100) return false;
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
	if (existeNivel(pesoNivel)){
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
		
	if (!esNumEntPos(probabilidadMinNivel) || esMayor(probabilidadMinNivel,probabilidadMaxNivel)){
		$("#errorProbabilidadMin").show();
		error = true;
	}
	else
		$("#errorProbabilidadMin").hide();

	
	if (!esNumEntPos(probabilidadMaxNivel) || esMayor(probabilidadMinNivel,probabilidadMaxNivel)){
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
	listarTiposImpacto();
	listarTiposImpactosXNivelImpactos();
/*---------------------------------AGREGAR UN NIVEL-------------------------------------------*/
	
	$("#btnAgregarNivel").click( function(){

		if (!validarAgregarNivel()) return;  //if true se registra, if false mensaje de error!
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

/*---------------------------------AGREGAR UN NIVEL IMPACTO-------------------------------------------*/
	
	$("#btnAgregarNivelImpacto").click( function(){

		if (!validarAgregarNivelImpacto()) return;  //if true se registra, if false mensaje de error!
		var data = {
			idProyecto: idProyectoLocal,
			nivel: $('#numeroPesoImpacto').val(),
			descripcion: $('#descripcionImpacto').val(),
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
				alert("Se registró exitosamente el nivel " + item.descripcion);
				listarHeaderNivelImpacto();
				$('#modalAgregarNivelImpacto').modal('hide');
			},
			fail: codigoError
		});
	});
/*---------------------------------FIN AGREGAR UN NIVEL-------------------------------------------*/

/*-----------------------------------ELIMINAR UN NIVEL PROBABILIDAD--------------------------------------------*/

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

/*---------------------------------FIN ELIMINAR UN NIVEL PROBABILIDAD-------------------------------------------*/


/*-----------------------------------ELIMINAR UN NIVEL IMPACTO--------------------------------------------*/

	$("#btnEliminarNivelImpacto").click(function(){
		var data = {
			idProyecto : idProyectoLocal
		}
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'DELETE',
			url: deleteAllImpacts + '/' + data.idProyecto,
			data: jsonData,
			dataType: "html",
			success: function(){
				alert("Se elimino el riesgo correctamente");
				listarHeaderNivelImpacto();
			},
			fail: codigoError
		});
		$('#modalEliminarNivelImpacto').modal('hide');
	});

/*---------------------------------FIN ELIMINAR UN NIVEL IMPACTO-------------------------------------------*/


/*------------------------- CREAR CUERPO MODAL TIPO IMPACTO X NIVEL IMPACTO----------------------------------*/
	$('#listarTiposImpactos').change( function(){
	// 
		var tamano = listaNiveles.length;
		
		$('#btnAgregarTipoXNivel2').hide();
		$('#btnAgregarTipoXNivel1').hide();
		tipoImpacto=0;
		$('#CuerpoModalTiposImpactoxNivelImpacto').empty();
		if ($('#listarTiposImpactos').val()!=0) {
			$.each(listaTipos, function ( index){
				if (this.idTipo==$('#listarTiposImpactos').val()){
					tipoImpacto=this.formas;
					return false;
				}
			});
			$.each(listaNiveles, function ( index){
				if (tipoImpacto==1){
					if (index==0){
						$('#CuerpoModalTiposImpactoxNivelImpacto').append(
							"<div class=\"form-group col-lg-12\">"+
								"<input type=\"text\" id=\"nivelImpacto"+index+"\" value=\""+this.nivel+"\" style=\"display: none;\">" +
                                "<label class=\"col-lg-5 control-label\">*Ingrese el valor "+this.descripcion+"</label>"+
                                "<label class=\"col-lg-1 col-lg-offset-3 control-label\">&lt;</label>"+
                                "<div class=\"col-lg-3\">"+
                                    "<input type=\"text\" class=\"form-control\" id=\"maxTiposImpactoxNivelImpacto"+index+"\" maxlength=\"6\">"+
                                "</div>"+
                                "<div class=\"alert-modal alert-danger\" id=\"errorNumeroEntero"+index+"\" style=\"display: none;\">" +
			                        "<span class=\"pull-right\">Por favor ingrese un numero entero positivo</span>" +
			                    "</div>" +
                            "</div>");
					} else if (index==tamano-1){
						$('#CuerpoModalTiposImpactoxNivelImpacto').append(
							"<div class=\"form-group col-lg-12\">"+
	                            "<input type=\"text\" id=\"nivelImpacto"+index+"\" value=\""+this.nivel+"\" style=\"display: none;\">" +
	                            "<label class=\"col-lg-5 control-label\">*Ingrese el valor "+this.descripcion+"</label>"+
	                            "<label class=\"col-lg-1 col-lg-offset-3 control-label\">&gt;</label>"+
	                            "<div class=\"col-lg-3\">"+
	                                "<input type=\"text\" class=\"form-control\" id=\"minTiposImpactoxNivelImpacto"+index+"\" maxlength=\"6\">"+
	                            "</div>"+
	                            "<div class=\"alert-modal alert-danger\" id=\"errorNumeroEntero"+index+"\" style=\"display: none;\">" +
			                        "<span class=\"pull-right\">Por favor ingrese un numero entero positivo</span>" +
			                    "</div>" +
			                    "<div class=\"alert-modal alert-danger\" id=\"errorMinImpacto"+index+"\" style=\"display: none;\">" +
			                        "<span class=\"pull-right\">Por favor ingrese un numero mayor al número máximo del nivel anterior</span>" +
			                    "</div>" +
	                        "</div>");
					} else {
						$('#CuerpoModalTiposImpactoxNivelImpacto').append(
							"<div class=\"form-group col-lg-12\">"+
	                            "<input type=\"text\" id=\"nivelImpacto"+index+"\" value=\""+this.nivel+"\" style=\"display: none;\">" +
	                            "<label class=\"col-lg-5 control-label\">*Ingrese el valor "+this.descripcion+"</label>"+
	                            "<div class=\"col-lg-3\">"+
	                                "<input type=\"text\" class=\"form-control\" id=\"minTiposImpactoxNivelImpacto"+index+"\" maxlength=\"6\">"+
	                            "</div>"+
	                            "<label class=\"col-lg-1 control-label\">&lt;</label>"+
	                            "<div class=\"col-lg-3\">"+
	                                "<input type=\"text\" class=\"form-control\" id=\"maxTiposImpactoxNivelImpacto"+index+"\" maxlength=\"6\">"+
	                            "</div>"+
	                            "<div class=\"alert-modal alert-danger\" id=\"errorNumeroEntero"+index+"\" style=\"display: none;\">" +
			                        "<span class=\"pull-right\">Por favor ingrese un numero entero positivo</span>" +
			                    "</div>" +
			                    "<div class=\"alert-modal alert-danger\" id=\"errorMinImpacto"+index+"\" style=\"display: none;\">" +
			                        "<span class=\"pull-right\">Por favor ingrese un numero mayor al número máximo del nivel anterior</span>" +
			                    "</div>" +
			                    "<div class=\"alert-modal alert-danger\" id=\"errorMaxImpacto"+index+"\" style=\"display: none;\">" +
			                        "<span class=\"pull-right\">Por favor ingrese un numero mayor al número mínimo de este nivel</span>" +
			                    "</div>" +
	                        "</div>");
					}
					$('#btnAgregarTipoXNivel1').fadeIn('slow');
				} else if (tipoImpacto==2){
					$('#CuerpoModalTiposImpactoxNivelImpacto').append(
							"<div class=\"form-group col-lg-12\">"+
                                "<input type=\"text\" id=\"nivelImpacto"+index+"\" value=\""+this.nivel+"\" style=\"display: none;\">" +
                                "<label class=\"col-lg-5 control-label\">*Ingrese el valor "+this.descripcion+"</label>"+
                                "<div class=\"col-lg-7\">"+
                                    "<input type=\"text\" class=\"form-control\" id=\"descTiposImpactoxNivelImpacto"+index+"\" maxlength=\"35\">"+
                                "</div>"+
                                "<div class=\"alert-modal alert-danger\" id=\"errordescImpacto"+index+"\" style=\"display: none;\">" +
			                        "<span class=\"pull-right\">Por favor, ingrese un valor para continuar</span>" +
			                    "</div>" +
                            "</div>");
					$('#btnAgregarTipoXNivel2').fadeIn('slow');
				}
			});

			
				
		}

	});

/*-------------------------FIN CREAR CUERPO MODAL TIPO IMPACTO X NIVEL IMPACTO----------------------------------*/


/*-------------------------LIMPIAR Y VALIDACIONES DEL MODAL IMPACTO X NIVEL IMPACTO----------------------------------*/

	$("#btnAumentar").click(function(){
		var tamano = listaNiveles.length;
		for (var i = 0; i < tamano ; i++) {

			$("#descTiposImpactoxNivelImpacto"+i).val("");
			$("#errordescImpacto"+i).hide();

			if (i==0){
				$("#maxTiposImpactoxNivelImpacto"+i).val("");
			} else {
				if (i!=tamano -1) {
					$("#maxTiposImpactoxNivelImpacto"+i).val("");
					$("#errorMaxImpacto"+i).hide();
				}
				$("#minTiposImpactoxNivelImpacto"+i).val("");
				$("#errorMinImpacto"+i).hide();
			} 
			$("#errorNumeroEntero"+i).hide();
		}
	});

/*-------------------------FIN LIMPIAR Y VALIDACIONES DEL MODAL IMPACTO X NIVEL IMPACTO----------------------------------*/

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
	});

/*-------------------------FIN LIMPIAR Y VALIDACIONES DEL MODAL AGREGAR PROBABILIDADES----------------------------------*/


/*--------------------------AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO--TIPO 1-------------------------*/
	$("#btnAgregarTipoXNivel2").click( function(){

		var flag = true;  //if true se registra, if false mensaje de error!
		// var data = [];
		var fila = [];
		var valor = {};

		var data = {
			idProyecto: idProyectoLocal,
			idTipoImpacto: tipoImpacto
			
		};

		// fila = {};

		for (var i = 0; i < listaNiveles.length ; i++) {
			valor.descripcion=$("#descTiposImpactoxNivelImpacto"+i).val();
			console.log(valor.descripcion);
			valor.nivel=$("#nivelImpacto"+i).val();
			if (valor.descripcion==""){
				$("#errordescImpacto"+i).fadeIn('slow');
				flag=false;
			}


			fila.push(valor);
			valor = {};
		};
		data.valor=fila;


		// $('#errorNivel').hide();
		// $('#errorNivelMenor').hide();
		// $('#errorProbabilidadMin').hide();
		// $('#errorProbabilidadMinMayor').hide();
		// $('#errorProbabilidadMax').hide();
		// $('#errorProbabilidadMaxMenor').hide();
		// $('#errorDescripcion').hide();

		console.log(data);
		var jsonData = JSON.stringify(data);
		if (flag){
			$.ajax({
				type: 'POST',
				url: addTypeImpactsXLevelImpacts2,
				data: jsonData,
				dataType: "json",
				success: function(data){
					var item = data;
					alert("Se registró exitosamente el nivel " + item.descripcion);
					listarTiposImpactosXNivelImpactos();
					$('#modalAumentarTipoImpactoXNivelImpacto').modal('hide');
				},
				fail: codigoError
			});
		}
		
	});


/*---------------------FIN AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO---TIPO 1--------------------------*/

/*--------------------------AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO--TIPO 2-------------------------*/
	$("#btnAgregarTipoXNivel1").click( function(){

		var flag = true;  //if true se registra, if false mensaje de error!

		var data = {
			idProyecto: idProyectoLocal,
			idTipoImpacto: tipoImpacto
			
		};

		// var data = [];
		var fila = [];
		var valor = {};
		// var idProyecto;
		// var idTipoImpacto;
		// idProyecto = idProyectoLocal;
		// data.push(idProyecto);
		// fila = {};
		// idTipoImpacto = tipoImpacto;
		// data.push(idTipoImpacto);
		// fila = {};

		for (var i = 0; i < listaNiveles.length ; i++) {
			if (i==0){
				valor.min=0;
				valor.max=$("#maxTiposImpactoxNivelImpacto"+i).val();
				if (!esNumEntPos(valor.max)){
					$("#errorNumeroEntero"+i).fadeIn('slow');
					flag=false;
				}
			} else if (i==listaNiveles.length-1) {
				valor.min=$("#minTiposImpactoxNivelImpacto"+i).val();
				valor.max=0;
				if (!esNumEntPos(valor.min)){
					$("#errorNumeroEntero"+i).fadeIn('slow');
					flag=false;
				} else if (valor.min<=$("#maxTiposImpactoxNivelImpacto"+(i-1)).val()){
					$("#errorMinImpacto"+i).fadeIn('slow');
					flag=false;
				}
			} else {
				valor.max=$("#maxTiposImpactoxNivelImpacto"+i).val();
				valor.min=$("#minTiposImpactoxNivelImpacto"+i).val();
				if ((!esNumEntPos(valor.min)) || (!esNumEntPos(valor.max))){
					$("#errorNumeroEntero"+i).fadeIn('slow');
					flag=false;
				} else if (fila.min<=$("#maxTiposImpactoxNivelImpacto"+(i-1)).val()){
					$("#errorMinImpacto"+i).fadeIn('slow');
					flag=false;
				} else if (valor.min>=valor.max){
					$("#errorMaxImpacto"+i).fadeIn('slow');
					flag=false;
				}
			}
			valor.nivel=$("#nivelImpacto"+i).val();
			fila.push(valor);
			valor = {};
			data.valor=fila;
		};


		// $('#errorNivel').hide();
		// $('#errorNivelMenor').hide();
		// $('#errorProbabilidadMin').hide();
		// $('#errorProbabilidadMinMayor').hide();
		// $('#errorProbabilidadMax').hide();
		// $('#errorProbabilidadMaxMenor').hide();
		// $('#errorDescripcion').hide();

		console.log(data);
		var jsonData = JSON.stringify(data);
		if (flag){
			$.ajax({
				type: 'POST',
				url: addTypeImpactsXLevelImpacts1,
				data: jsonData,
				dataType: "json",
				success: function(data){
					var item = data;
					alert("Se registró exitosamente el nivel " + item.descripcion);
					listarTiposImpactosXNivelImpactos();
					$('#modalAumentarTipoImpactoXNivelImpacto').modal('hide');
				},
				fail: codigoError
			});
		}
		
	});


/*---------------------FIN AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO---TIPO 2--------------------------*/




}

/*---------------------------------LISTAR NIVEL X TIPO DE IMPACTO-------------------------------------------*/

function listarTiposImpactosXNivelImpactos(){
	$("#tablaTipoImpactoXNivelImpacto").empty();
	var data = {
		idProyecto: idProyectoLocal, 
	};

	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		url: getAllTypeImpactsXLevelImpacts + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			console.log(data);
			agregarDataTiposImpactosXNivelImpactos(data); 
		},
		fail: codigoError
		// fail: agregarDataTiposImpactosXNivelImpactos(listaTipoImpacto)
	});

}

function agregarDataTiposImpactosXNivelImpactos(data){
	var fila = [];
	var columna = {};
	var listaTotal = data;
	var idTipoImpactoXNivelImpacto;
	var descripcionTipoImpacto;
	var tipoImpacto;
	$.each(listaTotal, function (index, valor){
		console.log(valor);
		idTipoImpactoXNivelImpacto=valor.idTipoImpacto;
		descripcionTipoImpacto=valor.descripcionTipoImpacto;
		tipoImpacto=valor.tipoImpacto;
		console.log(idTipoImpactoXNivelImpacto);
		console.log(descripcionTipoImpacto);
		console.log(tipoImpacto);
		$.each(valor.lista, function (j, valor2){
			columna.min = valor2.min;
			columna.max= valor2.max;
			columna.descripcion = valor2.descripcion;
			fila.push(columna);
			columna={};
		});
		try {
			agregaFilaDataTiposImpactosXNivelImpactos(idTipoImpactoXNivelImpacto, descripcionTipoImpacto, tipoImpacto, fila);

			fila=[];
		}
		catch (error){
			console.log(error);
		}
	});
}

function agregaFilaDataTiposImpactosXNivelImpactos(idTipoImpactoXNivelImpacto, descripcionTipoImpacto, tipoImpacto, fila){
	$("#tablaTipoImpactoXNivelImpacto").append("<tr id=\""+idTipoImpactoXNivelImpacto+"\"></tr>");
	var cadena = "";
	var tamano=fila.length;
	cadena+="<td>"+descripcionTipoImpacto+"</td>";
	console.log(cadena);
	$.each(fila, function (index, valor){
		if (tipoImpacto==1){
			if (index==0) {
				// $("#tablaTipoImpactoXNivelImpacto").append("<td> < "+valor.max+" </td>");
				// $("#"+idTipoImpactoXNivelImpacto).html("<td> < "+valor.max+" </td>");
				cadena+="<td> < "+valor.max+" </td>";
			} else if (index==tamano-1) {
				// $("#tablaTipoImpactoXNivelImpacto").append("<td> > "+valor.min+" </td>");
				// $("#"+idTipoImpactoXNivelImpacto).html("<td> > "+valor.min+" </td>");
				cadena+="<td> > "+valor.min+" </td>";
			} else {
				// $("#tablaTipoImpactoXNivelImpacto").append("<td> "+valor.min+" - "+valor.max+" </td>");
				// $("#"+idTipoImpactoXNivelImpacto).html("<td> "+valor.min+" - "+valor.max+" </td>");
				cadena+="<td> "+valor.min+" - "+valor.max+" </td>";
			}
		} else if (tipoImpacto==2) {
			// $("#tablaTipoImpactoXNivelImpacto").append("<td> "+valor.descripcion+" </td>");
			// $("#"+idTipoImpactoXNivelImpacto).html("<td> "+valor.descripcion+" </td>");
			cadena+="<td> "+valor.descripcion+" </td>";
		}
		
	});
	$("#"+idTipoImpactoXNivelImpacto).html(cadena);
	// $("#tablaTipoImpactoXNivelImpacto").append("</tr>");

}


/*---------------------------------FIN LISTAR NIVEL X TIPO DE IMPACTO-------------------------------------------*/

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
	alert('Error');
}
/*-----------------------------------------FIN ERRORES----------------------------------------------------*/

/*-------------------------------------MOSTRAR HEADER NIVEL IMPACTO------------------------------------------*/

function listarHeaderNivelImpacto(){
	$("#headerTipoImpactoXNivelImpacto").empty();
	$("#tablaImpacto").empty();
	var data = {
		idProyecto: idProyectoLocal, 
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		url: getAllHeadersImpacts + '/' + data.idProyecto,
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


/*---------------------------------LISTAR TIPOS DE IMPACTO------------------------------------------*/

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
			// agregarDataTiposImpacto(listaTipos)
		
	});
}

function agregarDataTiposImpacto(data){
	arreglo=data;
	if (arreglo!=null){
		$.each(arreglo, function (i, value){
			$('#listarTiposImpactos').append("<option value="+ value.idTipo +">" + value.tipoRi + "</option>");
        });	
	}
}

/*---------------------------------LISTAR TIPOS DE IMPACTO------------------------------------------*/