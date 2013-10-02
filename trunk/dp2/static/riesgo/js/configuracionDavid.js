var getAllProbabilities = "../../api/R_listaHeadersProbabilidadRiesgo";
var addProbability = "../../api/R_registrarHeaderProbabilidadRiesgo";
var deleteAllProbabilities = "../../api/R_eliminarHeaderProbabilidadRiesgo";
var getAllHeadersImpacts = "../../api/R_listaHeadersImpactoRiesgo";
var getAllTypesImpacts = "../../api/R_listaTiposImpactoRiesgo";

$(document).ready(main);
localStorage.setItem("idProyecto",1);
var idProyectoLocal = localStorage.getItem("idProyecto");

var objeto1 = {
	descripcion: "Muy Bajo",
	tipo: 2,
	idTipo: 2
};
var objeto2 = {
	descripcion: "Bajo",
	tipo: 2,
	idTipo: 2
};
var objeto3 = {
	descripcion: "Muy Alto",
	tipo: 2,
	idTipo: 1
};
var listaNiveles = [
	objeto1,
	objeto2,
	objeto3];

var listaTipos = [
	{idTipoImpacto:1,
	descripcion:"seguridad",
	tipo:2},
	{idTipoImpacto:2,
	descripcion:"Costo",
	tipo:1},
	{idTipoImpacto:3,
	descripcion:"Cronograma",
	tipo:1},
	{idTipoImpacto:4,
	descripcion:"Ambiente",
	tipo:2},
	];
	

function main(){

	listarProbabilidades();
	listarHeaderNivelImpacto();
	listarTiposImpacto();
	// cuerpoModalTipoXNivelImpacto();
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
/*------------------------- CREAR CUERPO MODAL TIPO IMPACTO X NIVEL IMPACTO----------------------------------*/
	$('#listarTiposImpactos').change( function(){
	// $("#btnAumentar").click(function(){
		var tamano = listaNiveles.length;
		var tipo=0;
		$('#btnAgregarTipoXNivel2').hide();
		$('#btnAgregarTipoXNivel1').hide();
		$('#CuerpoModalTiposImpactoxNivelImpacto').empty();
		if ($('#listarTiposImpactos').val()!=0) {
			$.each(listaTipos, function ( index){
				if (this.idTipoImpacto==$('#listarTiposImpactos').val()){
					tipo=this.tipo;
					return false;
				}
			});
			$.each(listaNiveles, function ( index){
				if (tipo==1){
					if (index==0){
						$('#CuerpoModalTiposImpactoxNivelImpacto').append(
							"<div class=\"form-group\">"+
                                "<label class=\"col-lg-5 control-label\">*Ingrese el valor "+this.descripcion+"</label>"+
                                "<label class=\"col-lg-1 col-lg-offset-3 control-label\">&lt;</label>"+
                                "<div class=\"col-lg-3\">"+
                                    "<input type=\"text\" class=\"form-control\" id=\"max"+index+"\" maxlength=\"6\">"+
                                "</div>"+
                            "</div>");
					} else if (index==tamano-1){
						$('#CuerpoModalTiposImpactoxNivelImpacto').append(
							"<div class=\"form-group\">"+
	                            "<label class=\"col-lg-5 control-label\">*Ingrese el valor "+this.descripcion+"</label>"+
	                            "<label class=\"col-lg-1 col-lg-offset-3 control-label\">&gt;</label>"+
	                            "<div class=\"col-lg-3\">"+
	                                "<input type=\"text\" class=\"form-control\" id=\"min"+index+"\" maxlength=\"6\">"+
	                            "</div>"+
	                        "</div>");
					} else {
						$('#CuerpoModalTiposImpactoxNivelImpacto').append(
							"<div class=\"form-group\">"+
	                            "<label class=\"col-lg-5 control-label\">*Ingrese el valor "+this.descripcion+"</label>"+
	                            "<div class=\"col-lg-3\">"+
	                                "<input type=\"text\" class=\"form-control\" id=\"min"+index+"\" maxlength=\"6\">"+
	                            "</div>"+
	                            "<label class=\"col-lg-1 control-label\">&lt;</label>"+
	                            "<div class=\"col-lg-3\">"+
	                                "<input type=\"text\" class=\"form-control\" id=\"max"+index+"\" maxlength=\"6\">"+
	                            "</div>"+
	                        "</div>");
					}
					$('#btnAgregarTipoXNivel1').fadeIn('slow');
				} else if (tipo==2){
					$('#CuerpoModalTiposImpactoxNivelImpacto').append(
							"<div class=\"form-group\">"+
                                "<label class=\"col-lg-5 control-label\">*Ingrese el valor "+this.descripcion+"</label>"+
                                "<div class=\"col-lg-7\">"+
                                    "<input type=\"text\" class=\"form-control\" id=\"desc"+index+"\" maxlength=\"35\">"+
                                "</div>"+
                            "</div>");
					$('#btnAgregarTipoXNivel2').fadeIn('slow');
				}
			});

			
				
		}

	});



/*-------------------------FIN CREAR CUERPO MODAL TIPO IMPACTO X NIVEL IMPACTO----------------------------------*/
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

/*-------------------------------------MOSTRAR HEADER NIVEL IMPACTO------------------------------------------*/

function listarHeaderNivelImpacto(){
	$("#headerTipoImpactoXNivelImpacto").empty();
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
			// codigoError;
			agregarDataTiposImpacto(listaTipos)
		
	});
}

function agregarDataTiposImpacto(data){
	arreglo=data;
	if (arreglo!=null){
		$.each(arreglo, function (i, value){
			$('#listarTiposImpactos').append("<option value="+ value.idTipoImpacto +">" + value.descripcion + "</option>");
        });	
	}
}

/*---------------------------------LISTAR TIPOS DE IMPACTO------------------------------------------*/