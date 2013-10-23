var getAllTypeImpactsXLevelImpacts = "../../api/R_listarTipoImpactoXNivelImpacto";
var addTypeImpactsXLevelImpacts1 = "../../api/R_registrarTipoImpactoXNivelImpacto1";
var addTypeImpactsXLevelImpacts2 = "../../api/R_registrarTipoImpactoXNivelImpacto2";
var getAllTypesImpacts = "../../api/R_listaTiposImpactoRiesgo";
var getAllHeadersImpacts = "../../api/R_listaHeadersImpactoRiesgo";

$(document).ready(main);
var listaNiveles = [];
var idProyectoLocal = localStorage.getItem("idProyecto");

function main(){
	listarTiposImpactosXNivelImpactos();
	listarTiposImpacto();
	listarHeaderNivelImpacto();
}

/*--------------------------------VALIDACIONES--------------------------------------------------------------*/
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

/*--------------------------------VALIDACIONES--------------------------------------------------------------*/

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
		idTipoImpactoXNivelImpacto=valor.idTipoImpacto;
		descripcionTipoImpacto=valor.descripcionTipoImpacto;
		tipoImpacto=valor.tipoImpacto;
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
	$("#tablaTipoImpactoXNivelImpacto").append("<tr id=\"Nivel"+idTipoImpactoXNivelImpacto+"\"></tr>");
	var cadena = "";
	var tamano=fila.length;
	cadena+="<td>"+descripcionTipoImpacto+"</td>";
	console.log(idTipoImpactoXNivelImpacto);
	console.log(descripcionTipoImpacto);
	console.log(tipoImpacto);
	console.log(fila);
	$.each(fila, function (index, valor){
		if (tipoImpacto==1){
			if (index==0) {
				cadena+="<td>< "+valor.max+"</td>";
			} else if (index==tamano-1) {
				cadena+="<td>> "+valor.min+"</td>";
			} else {
				cadena+="<td>"+valor.min+" - "+valor.max+"</td>";
			}
		} else if (tipoImpacto==2) {

			cadena+="<td>"+valor.descripcion+"</td>";
			console.log(cadena);
		}
		
	});
	$("#Nivel"+idTipoImpactoXNivelImpacto).html(cadena);
}


/*---------------------------------FIN LISTAR NIVEL X TIPO DE IMPACTO-------------------------------------------*/

/*--------------------------AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO--TIPO 2-------------------------*/
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


/*---------------------FIN AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO---TIPO 2--------------------------*/

/*--------------------------AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO--TIPO 1-------------------------*/
	$("#btnAgregarTipoXNivel1").click( function(){

		var flag = true;  //if true se registra, if false mensaje de error!

		var data = {
			idProyecto: idProyectoLocal,
			idTipoImpacto: tipoImpacto
			
		};

		var fila = [];
		var valor = {};

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
				console.log("Min: "+valor.min+" Max anterior: "+$("#maxTiposImpactoxNivelImpacto"+(i-1)).val());
				if (!esNumEntPos(valor.min)){
					$("#errorNumeroEntero"+i).fadeIn('slow');
					flag=false;
				} else if ((valor.min*1)<= ($("#maxTiposImpactoxNivelImpacto"+(i-1)).val()*1)) {
					$("#errorMinImpacto"+i).fadeIn('slow');
					flag=false;
				}
			} else {
				valor.max=$("#maxTiposImpactoxNivelImpacto"+i).val();
				valor.min=$("#minTiposImpactoxNivelImpacto"+i).val();
				if ((!esNumEntPos(valor.min)) || (!esNumEntPos(valor.max))){
					$("#errorNumeroEntero"+i).fadeIn('slow');
					flag=false;
				} else {
					console.log("Min: "+valor.min+" Max anterior: "+$("#maxTiposImpactoxNivelImpacto"+(i-1)).val());
					if ((valor.min*1) <= ($("#maxTiposImpactoxNivelImpacto"+(i-1)).val()*1)){
					$("#errorMinImpacto"+i).fadeIn('slow');
					flag=false;
					} else {
						if ((valor.min*1)>=(valor.max*1)){
							console.log("Min: "+valor.min+" Max:"+valor.max);
							$("#errorMaxImpacto"+i).fadeIn('slow');
							flag=false;
						}
					}
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

		var jsonData = JSON.stringify(data);
		if (flag){
			$.ajax({
				type: 'POST',
				url: addTypeImpactsXLevelImpacts1,
				data: jsonData,
				dataType: "json",
				success: function(data){
					alert("Se registraron exitosamente los valores del impacto ");
					listarTiposImpactosXNivelImpactos();
					$('#modalAumentarTipoImpactoXNivelImpacto').modal('hide');
				},
				fail: codigoError
			});
		}
		
	});

/*---------------------FIN AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO---TIPO 1--------------------------*/

/*-----------------------------------------ERRORES----------------------------------------------------*/
function codigoError(){
	alert('Error');
}
/*-----------------------------------------FIN ERRORES----------------------------------------------------*/

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
			                        "<span class=\"pull-right\">Por favor ingrese un numero mayor al número de la derecha de la fila anterior</span>" +
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
			                        "<span class=\"pull-right\">Por favor ingrese a la izquierda un numero mayor al número de la derecha de la fila anterior</span>" +
			                    "</div>" +
			                    "<div class=\"alert-modal alert-danger\" id=\"errorMaxImpacto"+index+"\" style=\"display: none;\">" +
			                        "<span class=\"pull-right\">Por favor ingrese a la derecha un numero mayor al número de la izquierda</span>" +
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

function listarHeaderNivelImpacto(){
	// $("#headerTipoImpactoXNivelImpacto").empty();
	// $("#tablaImpacto").empty();
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

