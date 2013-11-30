var rootURL = "../../api/";
var codProyecto='1';
var idProyecto=obtenerIdProyecto();
var idUsuario=obtenerIdUsuario();
var idVista=1;
var numRecursos= 0;
var comboMoneda='';
var comboUnidadMedida='';
var obj;

var arregloProyecto= new Array(
							'Proyecto de Charlitox', '566', '1.5'
								);

var arregloRecursos= new Array(
							new Array('1','Unidad','Ladrillo', '2','Nuevos soles','85','4','1'),
							new Array('2','Unidad','Bote de pintura', '8','Nuevos soles','12','4','1'),
							new Array('3','Litro','Cemento', '','Dolar','10','1','2'),
							new Array('4','Kilo','Fierro', '10','Dolar','30','2','2')
								);

var arregloUnidadMedida= new Array(
							new Array(
							new Array('1', 'Litro'),
							new Array('2', 'Kilo'),
							new Array('3', 'Horas Hombre'),
							new Array('4', 'Unidad')
							)
							);

var arregloRecursosHumanos= new Array(
									'Actividad 1','106','Nuevos soles',new Array(
									new Array('Unidad','Ladrillo', '2','Nuevos soles', '5'),
									new Array('Unidad','Bote de pintura', '8','Nuevos soles','12')
									)
								);

var arregloMoneda= new Array(
									new Array(
									new Array('1','Sol', '1'),
									new Array('2','Dolar','2.8'),
									new Array('3','Euro', '4')
									)
								);
								
			
$(function(){
	if (verificaPermisosVer(idVista)=='1'){
		iniciaProyecto();		
		iniciaRecursos(0);
	}else
		alert('Usted no tiene los permisos requeridos');
	
	if (verificaPermisosEditar(idVista)!='1')
		$("#btnEditar").hide();	
});
$(function(){
  $(".calendar").datepicker({ dateFormat: 'dd-mm-yy' });
});

//Funciones para obtener datos de AJAX


function obtenProyecto(/*idProyecto*/){
	
	obj ={
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
	
	
	//agregarDataProyecto	(arregloProyecto);
	
	//return arregloProyecto;

}
/*aca temrmina*/
function obtenRecursos(/*idProyecto,*/tipo){
	obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario
	}
	
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaRecursos/'+JSON.stringify(obj),		
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
		async: false,
		success: creaComboMoneda
	});
	
	
	//creaComboMoneda(arregloMoneda);

}

function obtenUnidadMedida(){

	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerUnidadesMedidas/',		
		dataType: "json",
		async: true,
		success:creaComboUnidadMedida
	});
	
	
	//creaComboUnidadMedida(arregloUnidadMedida);

}



//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaRecursos(tipo){
	limpiaTablaRecursos(tipo);	
	arreglo= obtenRecursos(/*idProyecto,*/tipo);
	//agregaDataFila( arreglo, 0);

}


function agregaDataFila(data, tipo){
	if (data!=null){
		arreglo=data.lista;
		for (i=0; i<arreglo.length;i++){
			filaRecurso=arreglo[i];
			//tipo,i,idRecurso, nombreRecurso,NombreUnidadMedida,costoUnitario,tipoRecurso,unidadMedida,idmoneda, nombreMoneda
			agregaFilaconRecursos(tipo,i,filaRecurso.idRecurso,filaRecurso.descripcion,filaRecurso.unidadMedida,filaRecurso.costoUnitario,filaRecurso.idUnidadMedida,filaRecurso.idMoneda, filaRecurso.moneda, filaRecurso.costoFijoDiario, filaRecurso.indRRHH,filaRecurso.fechaInicio,filaRecurso.fechaFin);
			numRecursos=i;
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
		verificaEditable(proy.indicadorCerrado, proy.indicadorLineaBase);
	}
}


function agregaDatosProyecto(nombreProyecto){
	$("#nombreProyecto").html(nombreProyecto);
		
}

function agregaFilaRecurso(){
	
	a=$("#numFilas").val();
	a++;
	
	inputRecurso= '<div id="divRecurso'+a+'" class="form-group"><input id="recurso'+a+'" class="form-control" name="recurso'+a+'" value="" onClick="modifica('+a+')"></div>';
	inputMoneda= creaInputMoneda(a,"0");
	inputUnidadMedida= creaInputUnidadMedida(a,"0");
	inputCosto='<div id="divCostoUnitario'+a+'" class="form-group"><input id="costoUnitario'+a+'" class="form-control" name="recurso'+a+'" value="" onClick="modifica('+a+')"></div>';
	inputCostoFijo='<div id="divCostoFijo'+a+'" class="form-group"><input id="costoFijo'+a+'" class="form-control" name="costoFijo'+a+'" value="" onClick="modifica('+a+')"></div>';
	check= '<input type="checkBox" name="eliminar'+a+'" id="eliminar'+a+'">';
	inputFechaInicio='<div id="divFechaInicio'+a+'" class="form-group"><input type="text" class="form-control calendar" id="fechaInicio'+a+'" name="fechaInicio'+a+'" style="width:100%" onChange="modifica('+a+')" onkeyup="return false;"></div>';
	inputFechaFin='<div id="divFechaFin'+a+'" class="form-group"><input type="text" class="form-control calendar" id="fechaFin'+a+'" name="fechaFin'+a+'" style="width:100%" onChange="modifica('+a+')" onkeyup="return false;"></div>';
	$("#tablaRecursos > tbody").append('<tr><td>'+a+'</td><td>'+inputRecurso+'</td>'+'</td><td align="center" >'+inputUnidadMedida+'</td><td>'
								+inputCosto+'</td><td align="center" >'+inputMoneda+'</td><td>'+inputCostoFijo+'</td><td align="center">'+inputFechaInicio+'</td>'
								+'<td align="center">'+inputFechaFin+'</td><td align="center">'+check+'</td></tr>'
								+'<input type="hidden" name="creado'+a+'"  id="creado'+a+'" value="1" >'
								+'<input type="hidden" name="modificado'+a+'"  id="modificado'+a+'" value="0" >'
								+'<input type="hidden" name="indRecursoH'+a+'"  id="indRecursoH'+a+'" value="0" >'
								);	
	inicializaFechas(a);
	$("#tablaRecursos").trigger("update");
	$("#numFilas").val(a);
}


function agregaFilaconRecursos(tipo,i,idRecurso, nombreRecurso,NombreUnidadMedida,costoUnitario,unidadMedida,idmoneda, nombreMoneda, costoFijo, indRecursoHumano, fechaInicio, fechaFin){
	a=i;
	a++;
	
	if (fechaInicio=='00-00-0000') fechaInicio='';
	if (fechaFin=='00-00-0000') fechaFin='';
	
	if 	(tipo==0)
		$("#tablaRecursos > tbody").append('<tr><td>'+a+'</td><td>'+nombreRecurso+'</td><td>'+NombreUnidadMedida+'</td><td>'+formateaNumero(costoUnitario,2)+'</td><td>'+nombreMoneda+'</td><td>'+formateaNumero(costoFijo,2)+'</td><td>'+fechaInicio+'</td><td>'+fechaFin+'</td></tr>');
	else{
		inputRecurso= '<input id="recurso'+a+'" class="form-control" name="recurso'+a+'" value="'+nombreRecurso+'" onClick="modifica('+a+')" disabled readonly>';
		inputMoneda= creaInputMoneda(a,indRecursoHumano);
		inputUnidadMedida= creaInputUnidadMedida(a,indRecursoHumano);
		
		if (indRecursoHumano=='0'){
			inputCosto='<div id="divCostoUnitario'+a+'" class="form-group"><input id="costoUnitario'+a+'" class="form-control" name="costoUnitario'+a+'" value="'+formateaNumero(costoUnitario,2)+'" onClick="modifica('+a+')"></div>';
			inputCostoFijo='<div id="divCostoFijo'+a+'" class="form-group"><input id="costoFijo'+a+'" class="form-control" name="costoFijo'+a+'" value="'+formateaNumero(costoFijo,2)+'" onClick="modifica('+a+')"></div>';
			inputFechaInicio='<div id="divFechaInicio'+a+'" class="form-group"><input type="text" class="form-control calendar" id="fechaInicio'+a+'" name="fechaInicio'+a+'" value="'+fechaInicio+'" style="width:100%" onChange="modifica('+a+')" onkeyup="return false;"></div>';
			inputFechaFin='<div id="divFechaFin'+a+'" class="form-group"><input type="text" class="form-control calendar" id="fechaFin'+a+'" name="fechaFin'+a+'" value="'+fechaFin+'" style="width:100%" onChange="modifica('+a+')" onkeyup="return false;"></div>';
			check= '<input type="checkBox" name="eliminar'+a+'" id="eliminar'+a+'">';
			
		}else{
		
			inputCosto='<input id="costoUnitario'+a+'" class="form-control" name="costoUnitario'+a+'" value="'+formateaNumero(costoUnitario,2)+'" onClick="modifica('+a+')" disabled readOnly>';
			inputCostoFijo='<input id="costoFijo'+a+'" class="form-control" name="costoFijo'+a+'" value="'+formateaNumero(costoFijo,2)+'" onClick="modifica('+a+')" disabled readOnly>';
			inputFechaInicio='<input type="text" id="fechaInicio'+a+'" name="fechaInicio'+a+'" value="'+fechaInicio+'" style="width:100%" onChange="modifica('+a+')" disabled readOnly>';
			inputFechaFin='<input type="text" id="fechaFin'+a+'" name="fechaFin'+a+'" value="'+fechaFin+'" style="width:100%" onChange="modifica('+a+')" disabled readOnly>';
			check= '<input type="checkBox" name="eliminar'+a+'" id="eliminar'+a+'" disabled readOnly>';
				
		}
		
		$("#tablaRecursos > tbody").append('<tr><td>'+a+'</td><td>'+inputRecurso+'</td><td align="center" >'+inputUnidadMedida+'</td><td>'
									+inputCosto+'</td><td align="center" >'+inputMoneda+'</td><td align="center" >'+inputCostoFijo
									+'<td align="center">'+inputFechaInicio+'</td>'+'<td align="center">'+inputFechaFin+'</td><td align="center">'+check+'</td></tr>'
									+'<input type="hidden" name="creado'+a+'"  id="creado'+a+'" value="0" >'
									+'<input type="hidden" name="modificado'+a+'"  id="modificado'+a+'" value="0" >'
									+'<input type="hidden" name="idRecurso'+a+'"  id="idRecurso'+a+'" value="'+idRecurso+'" >'	
									+'<input type="hidden" name="indRecursoH'+a+'"  id="indRecursoH'+a+'" value="'+indRecursoHumano+'" >'										
									);
		obtenUnidadMedidaSeleccionada(a,unidadMedida);
		obtenMonedaSeleccionada(a,idmoneda);
		inicializaFechas(a);
	}
	$("#tablaRecursos").trigger("update");
	$("#numFilas").val(a);
}

function inicializaFechas(a){
	$('.calendar').removeClass('hasDatepicker').datepicker({ dateFormat: 'dd-mm-yy' });
	
		

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
		combo='<select id="comboMoneda'+num+'" onChange="modifica('+num+')"  readOnly disabled >'+ comboMoneda + '</select>';
	else
		combo='<select id="comboMoneda'+num+'" onChange="modifica('+num+')" >'+ comboMoneda + '</select>';
	return combo;
	
}


function creaInputUnidadMedida(num, deshabilitado){
	if (deshabilitado=='1')
		combo='<select id="comboUnidadMedida'+num+'" onChange="modifica('+num+')" readOnly disabled >'+ comboUnidadMedida + '</select>';
	else
		combo='<select id="comboUnidadMedida'+num+'" onChange="modifica('+num+')" >'+ comboUnidadMedida + '</select>';
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

function obtenMonedaSeleccionada(a,moneda){

	idSelect='#comboMoneda'+a;
	if (moneda!='' && moneda!=null){
	
		
		$(idSelect).val(moneda);
		var indiceDatos = $(idSelect)[0].selectedIndex;
		if (indiceDatos!=null && indiceDatos!='')
			$(idSelect)[0].options[indiceDatos].setAttribute('selected','selected');
	}else{
		if ($(idSelect)[0].options.length>0){
			$(idSelect)[0].options[0].setAttribute('selected','selected');
		}
	
	}

}


function obtenUnidadMedidaSeleccionada(a,medida){

	idSelect='#comboUnidadMedida'+a;
	if (medida!='' && medida!=null){
	
		
		$(idSelect).val(medida);
		var indiceDatos = $(idSelect)[0].selectedIndex;
		if (indiceDatos!=null && indiceDatos!='')
			$(idSelect)[0].options[indiceDatos].setAttribute('selected','selected');
	}else{
		if ($(idSelect)[0].options.length>0){
			$(idSelect)[0].options[0].setAttribute('selected','selected');
		}
	
	}

}

//Funciones para grabar

$("#btnGrabar").click(function(){

	grabarRecursos();
});

function grabarRecursos(){
	var recursosGrabar=new Array();
	var recursosModificar=new Array();
	var recursosEliminar=new Array();
		
	num=$("#numFilas").val();
	grabar=true;
	
	borraTodasAlertas();
	
	for (i=1; i<=num;i++){
		var recH= "#indRecursoH"+i;
		var elim="eliminar"+i;
		var crea="#creado"+i;
		var modif="#modificado"+i;
		var recu="#idRecurso"+i;
		var cu="#costoUnitario"+i;
		var nom="#recurso"+i;
		var moned="#comboMoneda"+i;
		var med="#comboUnidadMedida"+i;
		var cof="#costoFijo"+i;
		var feI="#fechaInicio"+i;
		var feF="#fechaFin"+i;
		
		var diaI;
		var mesI;
		var anioI;
		var diaF;
		var mesF;
		var anioF;
		
		eliminar=document.getElementById(elim).checked;
		crear=$(crea).val();
		modificar=$(modif).val();
		indRecH=$(recH).val();
	
	
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
						
					//alert('El recurso de la fila ' + i +' debe tener un nombre');
					lanzaAlerta("divErrorNombre","labErrorNombre","");
					lanzaAlerta("divRecurso"+i,"","");
					//"divRecurso'+a+'"
					grabar=false;
					
				}else{
					
					borraAlerta("divRecurso"+i,"");
				}
				
				
				if (costo!='' && !isNaN(costo) && new Number(costo)>=0){
					
					borraAlerta("divCostoUnitario"+i,"");	
					
				}else{
				
					//alert('El costo del recurso ' + nomRecurso +' debe ser un valor númerico mayor o igual que 0');
					lanzaAlerta("divErrorCostoUnitario","labErrorCostoUnitario","");
					lanzaAlerta("divCostoUnitario"+i,"","");
					//"divCostoUnitario'+a+'"
					grabar=false;
				}
				
				if (costoF!='' && !isNaN(costoF) && new Number(costoF)>=0){
										
					borraAlerta("divCostoFijo"+i,"");	
					
				}else{
				
					costoF=0;
				}
				
				if (fechaI!=""){
				
					diaI=fechaI.substr(0,2);
					mesI=fechaI.substr(3,2);
					anioI=fechaI.substr(6,4);					
					borraAlerta("divFechaInicio"+i,"");
					
				}else{
					
					diaI='00';
					mesI='00';
					anioI='0000';
				
				}
				
				if (fechaF!=""){
				
					diaF=fechaF.substr(0,2);
					mesF=fechaF.substr(3,2);
					anioF=fechaF.substr(6,4);					
					borraAlerta("divFechaFin"+i,"");
					
				}else{
					
					diaF='00';
					mesF='00';
					anioF='0000';
				
				}
				
				if (fechaF!="" && fechaI!=""){				
					if ( (fechaF=="" && fechaI!="") ||(fechaF!="" && fechaI=="") || !comparaMenorFecha(diaI,mesI, anioI,diaF,mesF, anioF)){
						//alert('La fecha de inicio debe ser menor a la fecha de fin');
						lanzaAlerta("divErrorFecha","labErrorFecha","");
						lanzaAlerta("divFechaInicio"+i,"","");
						lanzaAlerta("divFechaFin"+i,"","");
						grabar=false;
					}
				}
				
				if (costoF!="" && (isNaN(costoF) || (!isNaN(costoF)) && new Number(costoF)>0) && fechaF=="" && fechaI==""){
				
					lanzaAlerta("divErrorFechaI","labErrorFechaI","");
					lanzaAlerta("divErrorFechaF","labErrorFechaF","");
					lanzaAlerta("divFechaInicio"+i,"","");
					lanzaAlerta("divFechaFin"+i,"","");
					grabar=false;	
				
				}
				
				
			
				if (crear=='1'){

					var recurso = {
					
						nombreRecurso:nomRecurso,
						CostoUnitario: costo,			
						idMoneda: moneda,
						idUnidadMedida:medida,
						costoFijo: costoF,
						dayI:  diaI,
						monthI:  mesI,
						yearI: anioI,
						dayF:  diaF,
						monthF:  mesF,
						yearF: anioF
					}
					recursosGrabar.push(recurso);
					
				}else{
				
					if (modificar=='1'){
						var recurso = {
							idRecurso: $(recu).val(),
							nombreRecurso:nomRecurso,
							CostoUnitario: costo,			
							idMoneda: moneda,
							idUnidadMedida:medida,
							costoFijo: costoF,
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
		}
		
	}
	obj={
		idProyecto: idProyecto,
		listaRecursosModificar: recursosModificar,
		listaRecursosCrear: recursosGrabar,
		listaRecursosEliminar: recursosEliminar,
		idUsuario  : idUsuario
	}
	if (grabar){
		confirmar("¿Está seguro que desea grabar los cambios realizados?",function (idProyecto,recursosModificar,recursosGrabar,recursosEliminar,idUsuario){
			enviaDatos(obj);
		});
	}
	
}

function enviaDatos(obj){

	/*
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_enviarCURecursos/'+JSON.stringify(obj),		
		dataType: "json", 
		async: true,
		success:function(data,B){if (data.codRespuesta!='0') alert(data.mensaje);else cambiaConsultar();}
	});
	*/
	$.ajax({
		type: 'POST',
		url: rootURL + 'CO_enviarCURecursos',
		data: JSON.stringify(obj),		
		dataType: "json", 
		async: true,
		success:function(data,B){if (data.codRespuesta!='0') alert(data.mensaje);else cambiaConsultar();}
	});

}


//Fin funciones para grabar

//Funciones para el uso del sidebar

function cambiaEditar(){

	permiso=verificaPermisosGrabar(idVista);	
	
	if (permiso=='1')
		$("#btnGrabar").show();
	else
		$("#btnGrabar").hide();
		
	$("#btnEditar").hide();	
	$("#btnCancelar").show();
	$("#tablaAgrega").show();
	obtenUnidadMedida();
	obtenMoneda();
	$("#numFilas").val(0);
	iniciaRecursos(1);	
	
}


function cambiaConsultar(){

	permiso=verificaPermisosEditar(idVista);	
	borraTodasAlertas();
	if (permiso=='1')
		$("#btnEditar").show();
	else
		$("#btnEditar").hide();
	
	$("#btnGrabar").hide();
	$("#btnCancelar").hide();
	$("#tablaAgrega").hide();	
	 iniciaRecursos(0);	

}

//Fin de funciones para el uso del sidebar

//Funcion para saber si se edita o no

function verificaEditable(indicadorCerrado, indicadorLineaBase){

	if (indicadorCerrado=="1" || indicadorLineaBase=="1"){
	
		$("#btnEditar").hide();
		$("#btnGrabar").hide();
	}
}

//Limpia la tabla

function limpiaTablaRecursos(esEdicion){
	$("#tablaRecursos > tbody").html('');
	$("#tablaRecursos").trigger("update");

	if (esEdicion==0){
		$("#tableHeaderEdicion").hide();
		$("#tableHeaderNoEdicion").show();
	}else{
		$("#tableHeaderEdicion").show();
		$("#tableHeaderNoEdicion").hide();
	}
}


$("#btnEditar").click(function(){
	cambiaEditar();
});

$("#btnCancelar").click(function(){
	borraTodasAlertas();
	cambiaConsultar();
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

