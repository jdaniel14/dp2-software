var getAllTypeImpactsXLevelImpacts = "../../api/R_listarTipoImpactoXNivelImpacto";
var addTypeImpactsXLevelImpacts1 = "../../api/R_registrarTipoImpactoXNivelImpacto1";
var addTypeImpactsXLevelImpacts2 = "../../api/R_registrarTipoImpactoXNivelImpacto2";
var getAllTypesImpacts = "../../api/R_listaTiposImpactoRiesgo";
var getAllHeadersImpacts = "../../api/R_listaHeadersImpactoRiesgo";
var deleteAllTypeImpactsXLevelImpacts = "../../api/R_eliminarTodosTipoImpactoXNivelImpacto";
var deleteTypeImpactXLevelImpact = "../../api/R_eliminarTipoImpactoXNivelImpacto";
var getTypeImpactXLevelImpact = "../../api/R_obtenerTipoImpactoXNivelImpacto";
var updateTypeImpactXLevelImpact = "../../api/R_actualizarTipoImpactoXNivelImpacto";

$(document).ready(main);
var listaNiveles = [];
var idProyectoLocal = localStorage.getItem("idProyecto");
var idTipoImpacto;
function main(){
	listarTiposImpactosXNivelImpactos();
	// listarTiposImpacto();

	listarHeaderNivelImpacto();

	
		

}

function bucle(tama){
	var idObtenido;
	// alert("tama="+tama);
	for (i=0; i<tama; i++){
		$("#maxTiposImpactoxNivelImpacto"+i).change( function(){
			// if (i!=tama-1){
				idObtenido=$(this).attr('id');
				idObtenido=idObtenido.replace("maxTiposImpactoxNivelImpacto", "");
				idObtenido*=1;
				// console.log(idObtenido);
				if (idObtenido!=tama-1){
					$("#minTiposImpactoxNivelImpacto"+(idObtenido+1)).val(($("#maxTiposImpactoxNivelImpacto"+(idObtenido)).val()*1)+1);
				}
			// }
		});
	}
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
		idUsuario: localStorage.getItem("idUsuario")
	};

	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		// url: getAllTypeImpactsXLevelImpacts + '/' + data.idProyecto,
		url: getAllTypeImpactsXLevelImpacts + '/' + jsonData,
		dataType: "json",
		success: function(data){
			agregarDataTiposImpactosXNivelImpactos(data); 
		},
		fail: codigoError
	});

}

function agregarDataTiposImpactosXNivelImpactos(data){
	var fila = [];
	var columna = {};
	var listaTotal = data;
	console.log(listaTotal);
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
	listarTiposImpacto(listaTotal);
}

function agregaFilaDataTiposImpactosXNivelImpactos(idTipoImpactoXNivelImpacto, descripcionTipoImpacto, tipoImpacto, fila){
	$("#tablaTipoImpactoXNivelImpacto").append("<tr id=\"Nivel"+idTipoImpactoXNivelImpacto+"\"></tr>");
	var cadena = "";
	var tamano=fila.length;
	cadena+="<td>"+descripcionTipoImpacto+"</td>";
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
		}
		
	});
	// cadena += "</td><td><a data-toggle=\"modal\" href=\"#modalConfirmarTiposImpactoXNivelImpacto\"><span class=\"glyphicon glyphicon-edit\"></span></a>" + 
	// 	  "</td><td><a data-toggle=\"modal\" href=\"#confirmDeleteTiposImpactoXNivelImpacto\" > <span class=\"glyphicon glyphicon-remove\"></span></a>";
	$("#Nivel"+idTipoImpactoXNivelImpacto).html(cadena);
}


/*---------------------------------FIN LISTAR NIVEL X TIPO DE IMPACTO-------------------------------------------*/

/*--------------------------Eliminar MATRIZ NIVEL X TIPO DE IMPACTO--TIPO 2-------------------------*/
	$("#btnEliminarTipoXNivel").click( function(){

		// var idProyecto=idProyectoLocal;
		var data = {
			idProyecto: idProyectoLocal, 
			idUsuario: localStorage.getItem("idUsuario")
		};

		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'DELETE',
			// url: deleteAllTypeImpactsXLevelImpacts + '/' + idProyecto,
			url: deleteAllTypeImpactsXLevelImpacts + '/' + jsonData,
			success: function(data){
				var item = data;
				$('#modalEliminarTipoImpactoXNivelImpacto').modal('hide');
				$("#labelExitoModal").html("");
                $("#labelExitoModal").append(item);
                $('#modalExito').modal('show');
				// alert(item);
				listarTiposImpactosXNivelImpactos();
			},
			fail: codigoError
		});
	});
/*--------------------------Eliminar MATRIZ NIVEL X TIPO DE IMPACTO--TIPO 2-------------------------*/
/*--------------------------AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO--TIPO 2-------------------------*/
	$("#btnAgregarTipoXNivel2").click( function(){

		var flag = true;  //if true se registra, if false mensaje de error!
		var fila = [];
		var valor = {};

		var data = {
			idProyecto: idProyectoLocal,
			idTipoImpacto: idTipoImpacto,
			idUsuario: localStorage.getItem("idUsuario")
			
		};
		limpiarModal();
		for (var i = 0; i < listaNiveles.length ; i++) {
			valor.descripcion=$("#descTiposImpactoxNivelImpacto"+i).val();
			valor.nivel=$("#nivelImpacto"+i).val();
			if (valor.descripcion==""){
				$("#errordescImpacto"+i).fadeIn('slow');
				flag=false;
			}


			fila.push(valor);
			valor = {};
		};
		data.valor=fila;

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
					$('#modalAumentarTipoImpactoXNivelImpacto').modal('hide');
					// alert("Se registró exitosamente el nivel");
					$("#labelExitoModal").html("");
	                $("#labelExitoModal").append("Se registró exitosamente el nivel");
	                $('#modalExito').modal('show');
					listarTiposImpactosXNivelImpactos();
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
			idTipoImpacto: idTipoImpacto,
			idUsuario: localStorage.getItem("idUsuario")
			
		};
		limpiarModal();
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
					if ((valor.min*1) <= ($("#maxTiposImpactoxNivelImpacto"+(i-1)).val()*1)){
					$("#errorMinImpacto"+i).fadeIn('slow');
					flag=false;
					} else {
						if ((valor.min*1)>=(valor.max*1)){
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

		var jsonData = JSON.stringify(data);
		if (flag){
			$.ajax({
				type: 'POST',
				url: addTypeImpactsXLevelImpacts1,
				data: jsonData,
				dataType: "json",
				success: function(data){
					$('#modalAumentarTipoImpactoXNivelImpacto').modal('hide');
					$("#labelExitoModal").html("");
	                $("#labelExitoModal").append("Se registraron exitosamente los valores del impacto ");
	                $('#modalExito').modal('show');
					// alert("Se registraron exitosamente los valores del impacto ");
					listarTiposImpactosXNivelImpactos();
					
				},
				fail: codigoError
			});
		}
		
	});

/*---------------------FIN AGREGAR FILA MATRIZ NIVEL X TIPO DE IMPACTO---TIPO 1--------------------------*/

/*-----------------------------------------ERRORES----------------------------------------------------*/
function codigoError(){
	$("#labelErrorModal").html("");
    $("#labelErrorModal").append("Se detectó un error");
    $('#ModaldeErrores').modal('show');
	// alert('Error');
}
/*-----------------------------------------FIN ERRORES----------------------------------------------------*/

/*---------------------------------LISTAR TIPOS DE IMPACTO------------------------------------------*/

function listarTiposImpacto(listaTotal){
	var data = {
		idProyecto: idProyectoLocal, 
		idUsuario: localStorage.getItem("idUsuario")
	};
	var jsonData = JSON.stringify(data);
	$('#listarTiposImpactos').empty();
	$('#listarTiposImpactos').append("<option value=\"0\" selected>Seleccione un tipo de impacto</option>");
	$.ajax({
		type: 'GET',                
		// url: getAllTypesImpacts + '/' + data.idProyecto,
		url: getAllTypesImpacts + '/' + jsonData,
		dataType: "json",
		success: function(data){
			listaTipos = data;
			agregarDataTiposImpacto(data,listaTotal);
		},
		fail: 
			codigoError
	});
}

function agregarDataTiposImpacto(data,listaTotal){
	arreglo=data;
	var idUsados = [];
	var flagDisabled = true;
	$.each(listaTotal, function (index, valor){
		idUsados.push(valor.idTipoImpacto);
	});
	if (arreglo!=null){
		$.each(arreglo, function (i, value){
			flagDisabled=true;
			$.each(idUsados, function (j, idU){
				console.log(idU);

				if (idU==value.idTipo) {
					$('#listarTiposImpactos').append("<option value="+ value.idTipo +" disabled>" + value.tipoRi + " (Seleccionado)</option>");
					flagDisabled=false;
					return false;
				}
			});

			if (flagDisabled){
				$('#listarTiposImpactos').append("<option value="+ value.idTipo +">" + value.tipoRi + "</option>");
			} 
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
					idTipoImpacto=this.idTipo;
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
	                                "<input type=\"text\" class=\"form-control\" id=\"minTiposImpactoxNivelImpacto"+index+"\" maxlength=\"6\" "+
	                                " readonly=\"readonly\">"+
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
	                                "<input type=\"text\" class=\"form-control\" id=\"minTiposImpactoxNivelImpacto"+index+"\" maxlength=\"6\" "+
	                                " readonly=\"readonly\" >"+
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
		bucle(tamano);

	});

/*-------------------------FIN CREAR CUERPO MODAL TIPO IMPACTO X NIVEL IMPACTO----------------------------------*/


/*-------------------------LIMPIAR Y VALIDACIONES DEL MODAL IMPACTO X NIVEL IMPACTO----------------------------------*/

	$("#btnAumentar").click(function(){
		limpiarModal();
		var tamano = listaNiveles.length;
		for (var i = 0; i < tamano ; i++) {

			$("#descTiposImpactoxNivelImpacto"+i).val("");

			if (i==0){
				$("#maxTiposImpactoxNivelImpacto"+i).val("");
			} else {
				if (i!=tamano -1) {
					$("#maxTiposImpactoxNivelImpacto"+i).val("");
				}
				$("#minTiposImpactoxNivelImpacto"+i).val("");
			} 
		}
		$("#listarTiposImpactos").val(0);
		$('#CuerpoModalTiposImpactoxNivelImpacto').empty();
	});


function limpiarModal(){
	var tamano = listaNiveles.length;
	for (var i = 0; i < tamano ; i++) {
		$("#errordescImpacto"+i).hide();
		if (i!=0){
			if (i!=tamano -1) {
				$("#errorMaxImpacto"+i).hide();
			}
			$("#errorMinImpacto"+i).hide();
		} 
		$("#errorNumeroEntero"+i).hide();
	}
}

/*-------------------------FIN LIMPIAR Y VALIDACIONES DEL MODAL IMPACTO X NIVEL IMPACTO----------------------------------*/

function listarHeaderNivelImpacto(){
	// $("#headerTipoImpactoXNivelImpacto").empty();
	// $("#tablaImpacto").empty();
	var data = {
		idProyecto: idProyectoLocal, 
		idUsuario: localStorage.getItem("idUsuario")
	};
	var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		// url: getAllHeadersImpacts + '/' + data.idProyecto,
		url: getAllHeadersImpacts + '/' + jsonData,
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
		// $("#headerTipoImpactoXNivelImpacto").append("<th colspan =\"2\"> Acciones </th>");


	}
}

function agregaFilaImpacto(arreglo,i){
	$("#headerTipoImpactoXNivelImpacto").append("<th>" + arreglo.descripcion + "</th>");
	$("#tablaImpacto").append("<tr><td>" + arreglo.nivel + 
	  "</td><td>" + arreglo.descripcion + "</td></tr>");
}

