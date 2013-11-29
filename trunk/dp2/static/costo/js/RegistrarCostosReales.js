var rootURL = "../../api/";
var codProyecto='1';
var idVista=6;
var idProyecto=obtenerIdProyecto();
var idUsuario=obtenerIdUsuario();
var numRecursos= 0;
var comboMoneda='';
var comboUnidadMedida='';
var editable = false;

$(function(){
	if (verificaPermisosGrabar(idVista)!='1'){
		$("#btnGrabar").hide();	
		$("#btnCancelar").hide();	
	}
	
	if (verificaPermisosVer(idVista)=='1'){		
		iniciaProyecto();
	}else
		alert('No tiene permiso para realizar esta operación');
		
});

if (verificaPermisosGrabar(idVista)=='1'){
	$(function(){
	  $(".calendar").datepicker({ dateFormat: 'dd-mm-yy' });
	});
}
//Funciones para obtener datos de AJAX


function obtenProyecto(/*idProyecto*/){
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario
	}
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerInfoProyecto/'+JSON.stringify(obj),
		dataType: "json",
		async: true,
		success:agregarDataProyecto	

	});		
}
/*aca temrmina*/
function obtenRecursos(/*idProyecto,*/tipo){
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario
	}
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerCostoFijoRealProyecto/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data){agregaDataFila(data,tipo);}
	});
}

function obtenMoneda(){
	$.ajax({
		type: 'GET',		
		url: rootURL + 'CO_obtenerListaMonedas/',
		dataType: "json", // data type of response
		success: creaComboMoneda
	});
}

function obtenUnidadMedida(){
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerUnidadesMedidas/',		
		dataType: "json",
		async: false,
		success:creaComboUnidadMedida
	});
}


//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax
function iniciaRecursos(tipo){
	limpiaTablaRecursos(tipo);	
	arreglo= obtenRecursos(tipo);
}

function agregaDataFila(data, tipo){
	if (data!=null){
		arreglo=data.lista;
		for (i=0; i<arreglo.length;i++){
			filaRecurso=arreglo[i];
			//tipo,i,idRecurso, nombreRecurso,NombreUnidadMedida,costoUnitario,tipoRecurso,unidadMedida,idmoneda, nombreMoneda
			agregaFilaconRecursos(tipo,i,filaRecurso.idRecurso,filaRecurso.descripcion,filaRecurso.unidadMedida,filaRecurso.costoUnitario,filaRecurso.idUnidadMedida,filaRecurso.idMoneda, filaRecurso.moneda, filaRecurso.costoFijoDiario,filaRecurso.fechaInicio,filaRecurso.fechaFin, false);
			numRecursos=i;
		}
		if (!editable) {
			$("input").attr('disabled',true);		
		}
	}
}

function iniciaProyecto(){
			
	obtenProyecto(/*idProyecto*/);
	//var proy = JSON.parse(proyecto);
	//agregaDatosProyecto( proy.nombre ,proy.presupuestoTotal ,proy.porcentajeReserva);

}

function iniciaUnidadMedida(){


}

function agregarDataProyecto(data){
	if (data!=null){
		proy=data;
		agregaDatosProyecto( proy.nombre);
		editable = verificaEditable(proy.indicadorCerrado, proy.indicadorLineaBase);
		iniciarTabla();
	}
}


function agregaDatosProyecto(nombreProyecto){
	$("#nombreProyecto").html(nombreProyecto);
	
}

function agregaFilaRecurso(){
	a=$("#numFilas").val();
	a++;
	inputRecurso= '<input id="recurso'+a+'" class="form-control" name="recurso'+a+'" value="" onClick="modifica('+a+')">';
	inputMoneda= creaInputMoneda(a,"0");
	inputUnidadMedida= creaInputUnidadMedida(a,"0");
	inputCosto='<input id="costoUnitario'+a+'" class="form-control" name="recurso'+a+'" value="" onClick="modifica('+a+')">';
	inputCostoFijo='<input id="costoFijo'+a+'" class="form-control" name="costoFijo'+a+'" value="" onClick="modifica('+a+')">';
	check= '<input type="checkBox" name="eliminar'+a+'" id="eliminar'+a+'">';
	inputFechaInicio='<input type="text" class="calendar" id="fechaInicio'+a+'" name="fechaInicio'+a+'" style="width:100%" onChange="modifica('+a+')" readOnly>';
	inputFechaFin='<input type="text" class="calendar" id="fechaFin'+a+'" name="fechaFin'+a+'" style="width:100%" onChange="modifica('+a+')" readOnly>';
	
	$("#tablaRecursos > tbody").append('<tr><td>'+a+'</td><td>'+inputRecurso+'</td>'+'</td><td>'+inputCostoFijo+'</td><td align="center">'+inputFechaInicio+'</td>'
	+'<td align="center">'+inputFechaFin+'</td></tr>'
	+'<input type="hidden" name="creado'+a+'"  id="creado'+a+'" value="1" >'
	+'<input type="hidden" name="modificado'+a+'"  id="modificado'+a+'" value="0" >'
								);	
	inicializaFechas(a);
	$("#tablaRecursos").trigger("update");
	$("#numFilas").val(a);
}

function agregaFilaconRecursos(tipo,i,idRecurso, nombreRecurso,NombreUnidadMedida,costoUnitario,unidadMedida,idmoneda, nombreMoneda, costoFijo, fechainicio,fechafin,indRecursoHumano){
	a=i;
	a++;
	if 	(tipo==0){
		$("#tablaRecursos > tbody").append('<tr><td>'+a+'</td><td>'+nombreRecurso+'</td><td>'+NombreUnidadMedida+'</td><td>'+formateaNumero(costoUnitario)+'</td><td>'+nombreMoneda+'</td><td>'+formateaNumero(costoFijo)+'</td></tr>');

	}else{
		inputRecurso= '<input id="recurso'+a+'" class="form-control" name="recurso'+a+'" value="'+nombreRecurso+'" onClick="modifica('+a+')" disabled readonly>';
		inputMoneda= creaInputMoneda(a,true);
		inputUnidadMedida= creaInputUnidadMedida(a,true);
		
		if (indRecursoHumano=='0'){
			inputCosto='<input id="costoUnitario'+a+'" class="form-control" name="costoUnitario'+a+'" value="'+formateaNumero(costoUnitario)+'" onClick="modifica('+a+')" disabled readOnly>';
			inputCostoFijo='<input id="costoFijo'+a+'" class="form-control" name="costoFijo'+a+'" value="'+formateaNumero(costoFijo)+'" onClick="modifica('+a+')">';
			inputFechaInicio='<input type="text" class="calendar" id="fechaInicio'+a+'" name="fechaInicio'+a+'"'+' value="'+fechainicio+'" style="width:100%" onChange="modifica('+a+')" readOnly>';
			inputFechaFin='<input type="text" class="calendar" id="fechaFin'+a+'" name="fechaFin'+a+'"'+' value="'+fechafin+'" style="width:100%" onChange="modifica('+a+')" readOnly>';
			check= '<input type="checkBox" name="eliminar'+a+'" id="eliminar'+a+'">';
			
		}else{
		
			inputCosto='<input id="costoUnitario'+a+'" class="form-control" name="costoUnitario'+a+'" value="'+formateaNumero(costoUnitario)+'" onClick="modifica('+a+')" disabled readOnly>';
			inputCostoFijo='<input id="costoFijo'+a+'" class="form-control" name="costoFijo'+a+'" value="'+formateaNumero(costoFijo)+'" onClick="modifica('+a+')" disabled readOnly>';
			inputFechaInicio='<input type="text" id="fechaInicio'+a+'" name="fechaInicio'+a+'" style="width:100%" onChange="modifica('+a+')" disabled readOnly>';
			inputFechaFin='<input type="text" id="fechaFin'+a+'" name="fechaFin'+a+'" style="width:100%" onChange="modifica('+a+')" disabled readOnly>';
			check= '<input type="checkBox" name="eliminar'+a+'" id="eliminar'+a+'" disabled readOnly>';
				
		}
		
		$("#tablaRecursos > tbody").append('<tr><td>'+a+'</td><td>'+inputRecurso+'</td><td align="center" >'+inputCostoFijo
		+'<td align="center">'+inputFechaInicio+'</td>'+'<td align="center">'+inputFechaFin+'</td></tr>'
		+'<input type="hidden" name="creado'+a+'"  id="creado'+a+'" value="0" >'
		+'<input type="hidden" name="modificado'+a+'"  id="modificado'+a+'" value="0" >'
		+'<input type="hidden" name="idRecurso'+a+'"  id="idRecurso'+a+'" value="'+idRecurso+'" >'	
		+'<input type="hidden" name="indRecursoH'+a+'"  id="indRecursoH'+a+'" value="'+indRecursoHumano+'" >'										
									);
		inicializaFechas(a);
	}
	$("#tablaRecursos").trigger("update");

	$("#numFilas").val(a);
}

function inicializaFechas(a){
	if (verificaPermisosGrabar(idVista)=='1'){
		$('.calendar').removeClass('hasDatepicker').datepicker({ dateFormat: 'dd-mm-yy' });
	}
		

}

function modifica(num){

	select='#modificado'+num;
	
	$(select).val('1');

}




function creaComboMoneda(data){
	if (data!=null){
		comboMoneda='';
		arreglo=data.lista;
		
		for (i=0; i<arreglo.length;i++){
			moneda=arreglo[i];
			agregaOpcionMoneda(moneda.idMoneda, moneda.nombre);
			
		}		
	}
}


function creaComboUnidadMedida(data){
	if (data!=null){
		comboUnidadMedida='';
		arreglo=data.lista;
		
		for (i=0; i<arreglo.length;i++){
			unidad=arreglo[i];
			agregaOpcionUnidadMedida(unidad.idUM, unidad.descripcion);
			
		}

	}
}


//Fin funciones para pasar los datos de ajax

//Funcion para agregar una opcion de moneda

function agregaOpcionMoneda(idMoneda, nombre){
	comboMoneda+='<option value="'+idMoneda+'">'+nombre+'</option>';
}

function agregaOpcionUnidadMedida(idUnidad, nombre){
	comboUnidadMedida+='<option value="'+idUnidad+'">'+nombre+'</option>';
}



function creaInputMoneda(num, deshabilitado){
	
	if (deshabilitado=='1')
		combo='<select id="comboMoneda'+num+'" class="form-control" onChange="modifica('+num+')"  readOnly disabled >'+ comboMoneda + '</select>';
	else
		combo='<select id="comboMoneda'+num+'" class="form-control" onChange="modifica('+num+')" >'+ comboMoneda + '</select>';
	return combo;
}


function creaInputUnidadMedida(num, deshabilitado){
	if (deshabilitado=='1')
		combo='<select class="form-control" id="comboUnidadMedida'+num+'" onChange="modifica('+num+')" readOnly disabled >'+ comboUnidadMedida + '</select>';
	else
		combo='<select class="form-control" id="comboUnidadMedida'+num+'" onChange="modifica('+num+')" >'+ comboUnidadMedida + '</select>';
	return combo;
}

//Desabilita el input moneda

function desabilitaMoneda(a){
	
	idSelect='#comboMoneda'+a;
	$(idSelect).attr('disabled', 'disabled');
}

function desabilitaUnidadMoneda(a){
	
	idSelect='#comboUnidadMedida'+a;
	$(idSelect).attr('disabled', 'disabled');
}

//obtener la seleccionada moneda

//Funciones para grabar

$("#btnGrabar").click(function(){

	confirmar("¿Está seguro que desea grabar los cambios realizados?",grabarRecursos);
	
});

function grabarRecursos(){
	var recursosGrabar=new Array();
	var recursosModificar=new Array();
	var recursosEliminar=new Array();
	num=$("#numFilas").val();
	for (i=1; i<=num;i++){
		recH= "#indRecursoH"+i;
		elim="eliminar"+i;
		crea="#creado"+i;
		modif="#modificado"+i;
		recu="#idRecurso"+i;
		cu="#costoUnitario"+i;
		nom="#recurso"+i;
		moned="#comboMoneda"+i;
		med="#comboUnidadMedida"+i;
		cof="#costoFijo"+i;
		feI="#fechaInicio"+i;
		feF="#fechaFin"+i;
		
		crear=0;
		modificar=1;
		indRecH=0;
		eliminar=0;
	
		if (eliminar && crear!='1'){
			var recurso = {
				idRecurso: $(recu).val()
			}
			recursosEliminar.push(recurso);
		}else{
			if (!eliminar && indRecH=='0'){
				costo=$(cu).val();
				nomRecurso=$(nom).val();
				moneda=$(moned).val();
				medida=$(med).val();
				costoF=$(cof).val();
				fechaI=$(feI).val();
				fechaF=$(feF).val();
				
				if (nomRecurso==''){	
					alert('El recurso de la fila ' + i +' debe tener un nombre');
					return;
				}
				
				if (costoF!='' && !isNaN(costoF) && costoF>=0){
						
				}else{
					alert('El costo fijo del recurso ' + nomRecurso +' debe ser un valor númerico mayor o igual que 0');
					return;
				}
				
				if (fechaI!=""){
					diaI=fechaI.substr(0,2);
					mesI=fechaI.substr(3,2);
					anioI=fechaI.substr(6,4);
				}else{	
					alert('La fecha inicio del costo fijo del recurso ' + nomRecurso +' debe ser diferente de vacío');
					return;
				}
				if (fechaF!=""){
					diaF=fechaF.substr(0,2);
					mesF=fechaF.substr(3,2);
					anioF=fechaF.substr(6,4);
				}else{
					alert('La fecha fin del costo fijo del recurso ' + nomRecurso +' debe ser diferente de vacío');
					return;
				}
			
				var recurso = {
					idRecurso: $(recu).val(),
					costoFijoDiarioReal: costoF,
					dayI:  diaI,
					monthI:  mesI,
					yearI: anioI,
					dayF:  diaF,
					monthF:  mesF,
					yearF: anioF
				}
				recursosModificar.push(recurso);
				
			}
		}
	}
	var obj={
		idProyecto: idProyecto,
		listaRecursos: recursosModificar,
		idUsuario  : idUsuario
	}
	enviaDatos(obj);
//	alert("se grabó " + obj);
	/*
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaRecursos/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data){agregaDataFila(data,tipo);}
	});
	*/
}

function enviaDatos(obj){


	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_enviarCostoFijoRealProyecto/'+JSON.stringify(obj),		
		dataType: "json", 
		async: true,
		success:function(data){if (data.codRespuesta!='0') alert(data.mensaje);}
	});

	/*
	$.ajax({
		type: 'POST',
		url: rootURL + 'CO_enviarCURecursos/'+ JSON.stringify(obj),				
		dataType: "json",
		async: true,
		success:function(response, status){ alert("se grabó"); }
	});
*/

}


//Fin funciones para grabar

//Funciones para el uso del sidebar

function iniciarTabla(){
	if (verificaPermisosGrabar(idVista)=='1' && editable){
		$("#btnGrabar").show();
		$("#btnCancelar").show();
	}else{
		$("#btnGrabar").hide();
		$("#btnCancelar").hide();
	}
	
	obtenUnidadMedida();
	obtenMoneda();
	$("#numFilas").val(0);
	iniciaRecursos(1);	
}

//Funcion para saber si se edita o no

function verificaEditable(indicadorCerrado, indicadorLineaBase){

	if (indicadorCerrado=="1" || indicadorLineaBase=="0"){
	
		$("#btnEditar").hide();
		$("#btnGrabar").hide();
		$("#btnCancelar").hide();
	}else{
		
		$("#btnGrabar").show();
		$("#btnCancelar").show();	
	}
	return !(indicadorCerrado=="1" || indicadorLineaBase=="0");
}

//Fin de funciones para el uso del sidebar


//Limpia la tabla

function limpiaTablaRecursos(){
	$("#tablaRecursos > tbody").html('');
	$("#tablaRecursos").trigger("update");
	
}

$("#btnCancelar").click(function(){
	history.back();
});

function obtenerIdProyecto(){
	//localStorage.setItem('idProyecto','1');
	id= localStorage.idProyecto;
	if (id==null){ 
		alert ("El id es null");
		id=1;
	}
	return id;
}

