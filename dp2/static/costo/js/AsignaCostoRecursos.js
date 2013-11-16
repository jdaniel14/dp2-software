var rootURL = "../../api/";
var codProyecto='1';
var idVista=2;
var idProyecto=obtenerIdProyecto();
var idUsuario=obtenerIdUsuario();
var numRecursos= 0;
var comboMoneda='';
var HashTipoCambio='';

/*Data inicial para pruebas, previo php*/
var arregloProyecto= new Array(
							'Mi proyecto', '566', '1.5'
								);

var arregloRecursos= new Array(
							new Array('1','Unidad','Ladrillo', '2','Soles','85'),
							new Array('2','Unidad','Bote de pintura', '8','Soles','12'),
							new Array('3','Litro','Cemento', '','Soles','10'),
							new Array('4','Kilo','Fierro', '10','Soles','30')
								);

var arregloActividades= new Array(

							new Array('1', 'Actividad 1'),
							new Array('2', 'Actividad 2')
							);

var arregloActividad1= new Array(
									'Actividad 1','106','Soles',new Array(
									new Array('Unidad','Ladrillo', '2','Soles', '5'),
									new Array('Unidad','Bote de pintura', '8','Soles','12')
									)
								);
								

var arregloActividad2= new Array(
									'Actividad 2', '460','Soles',new Array(
									new Array('Unidad','Ladrillo', '2','Soles','80'),
									new Array('Litro','Cemento', '','Soles','10'),
									new Array('Kilo','Fierro', '10','Soles','30')
									)
								);
								
var arregloMoneda= new Array(
									new Array(
									new Array('2','Sol', '1'),
									new Array('1','Dolar','2.8'),
									new Array('3','Euro', '4')
									)
								);
								
/*Fin data inicial de pruebas*/

//Función de inicio de la pagina

$(function(){
	if (verificaPermisosGrabar(idVista)!='1'){
		$("#btnGrabar").hide();	
		$("#btnCancelar").hide();	
	}
	
	if (verificaPermisosVer(idVista)=='1'){		
		iniciaActividades();
		iniciaProyecto();		
		iniciaRecursos();
		iniciaRecursosFijos();
	}else
		alert('No tiene permiso para realizar esta operación');
		
});


//Funciones para obtener datos de AJAX

//Obtener lista de actividades
function obtenActividades(/*idProyecto*/){
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaActividades/' + JSON.stringify(obj) ,		
		dataType: "json", // data type of response
		async: true,
		success:imprimeListaActividades	
	});
	
	
	return arregloActividades;

}

//Obtener proyectto y sus datos
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
	//return arregloProyecto;

}

function obtenContingencia(){
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario		
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerReservaContingencia/'+JSON.stringify(obj),
		dataType: "json",
		async: false,
		success:agregarContingencia

	});

}

//Obtener lista de recursos
function obtenRecursos(/*idProyecto,*/tipo){
	var obj ={
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
//Obtener lista de recursos con costo fijo
function obtenRecursosFijo(){
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerCostoFijoPlaneadoProyecto/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data){agregaDataFilaFijo(data);}
	});

}
//Lista de actividades con sus respectivos recursos
function obtenDatosActividad(idActividad){
	
	var obj ={
		idProyecto : idProyecto,
		idActividad : idActividad,
		idUsuario  : idUsuario
	}

	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerInfoActividad/' + JSON.stringify(obj),
		dataType: "json", // data type of response
		success: agregaDataFilaResumen
	});

}
//Iniciar la obtencion y creacion del combo para las monedas
function obtenMoneda(){
		
	creaComboMoneda(arregloMoneda);

}

//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaRecursos(){
	limpiaTablaRecursos();
	obtenMoneda();
	obtenRecursos(0);

}

function iniciaRecursosFijos(){
	limpiaTablaRecursosFijo();	
	obtenRecursosFijo(0);

}


function agregaDataFila(data, tipo){
	arreglo=data.lista;
	for (i=0; i<arreglo.length;i++){
		filaRecurso=arreglo[i];
		agregaFilaRecurso(tipo,i,filaRecurso.idRecurso,filaRecurso.unidadMedida,filaRecurso.descripcion,filaRecurso.costoUnitario,filaRecurso.moneda,filaRecurso.cantidadEstimada);
		numRecursos=i;
	}
}

function agregaDataFilaFijo(data){
	arreglo=data.lista;
	for (i=0; i<arreglo.length;i++){
		filaRecurso=arreglo[i];
		agregaFilaRecursoFijo(i,filaRecurso.idRecurso,filaRecurso.unidadMedida,filaRecurso.descripcion,filaRecurso.costoFijoDiario,filaRecurso.moneda,filaRecurso.costoFijoTotal);
		numRecursos=i;
	}
}

function iniciaProyecto(){
	obtenContingencia();
	obtenProyecto();

}

function agregarDataProyecto(data){

	proy=data;
	indGrabar=verificaPermisosGrabar(idVista);
	if (proy!=null) agregaDatosProyecto( proy.nombre ,proy.presupuesto ,proy.porcentajeReserva, proy.indicadorCerrado, proy.indicadorLineaBase,indGrabar);
}

function agregarContingencia(contingencia){
	if (isNaN(contingencia)) contingencia='0';
	$('#inputContingencia').val(contingencia);

}

function iniciaActividades(){

	$("#listado").append('<li>Costo unitario y resumen</li>');
	$("#listado").append('<li class="active"><a href="javascript:cambiaCostoUnitario();">Reservas del proyecto</a></li>');
	$("#listado").append('<li>Resumen por actividad</li>');
	
	obtenActividades(/*idProyecto*/);	
}

function imprimeListaActividades(data){
	if (data!=null){
		var arreglo = data.lista;
		for(i=0; i<arreglo.length; i++){
			actividad=arreglo[i];
			armaActividad(actividad.idActividad,actividad.nombre);
			
		}
	}
}

function agregaDataFilaResumen(datosActividad){
	
	if (datosActividad!=null){
	
		nombreActividad= datosActividad.nombre;
		subTotalActividad= datosActividad.costoSubtotal;	
		moneda= "Soles"; // Arreglar
		arreglo= datosActividad.listaRecursos;
		
		if (arreglo==null){
			arreglo=new Array();		
		}
		
		limpiaTablaResumen();
		
		for (i=0; i<arreglo.length;i++){
			recurso=arreglo[i];
			agregaFilaActividadResumen(i, recurso.unidadMedida, recurso.descripcion, recurso.moneda, recurso.cantidadEstimada, recurso.costoUnitario);
		}
		
		$("#tituloActividad").html(nombreActividad);
		$("#tablaTotalActividad").html('<tr width="100%"><td width="40%"><b>Total</b></td><td width="20%"><b>'+subTotalActividad+'</b></td><td width="40%">'+moneda+'</td></tr>');
	}	
}

function agregaDatosProyecto(nombreProyecto, montoSinReserva, porcentajeReserva ,indCerrado, indLineaBase, indGrabar){
	$("#nombreProyecto").html(nombreProyecto);
	$("#inputMontoSinReserva").val(montoSinReserva);
	$("#inputReserva").val(porcentajeReserva);
	var reseTotal= new Number(porcentajeReserva*0.01*montoSinReserva);
	var reseForm=reseTotal.toFixed(2);
	
	$("#reservaTotal").val(reseForm);
	$("#inputMontoConReserva").val(montoSinReserva*1 + porcentajeReserva*0.01*montoSinReserva);
	
	if (indCerrado=="1" || indLineaBase=="1" || indGrabar=="0"){
	
		$("#inputReserva").attr('disabled', 'disabled');
		$("#inputReserva").attr('readOnly', 'readOnly');
		$("#btnGrabar").hide();
		$("#btnCancelar").hide();
	}else{
		$("#inputReserva").removeAttr('disabled');
		$("#inputReserva").removeAttr('readOnly');
		$("#btnGrabar").show();
		$("#btnCancelar").show();
	}
	
}

function agregaFilaActividadResumen(i, unidadMedida, nombreRecurso, moneda, cantidad, costoUnitario){
	a=i;
	a++;	
	$("#tablaResumen").append('<tr><td>'+unidadMedida+' de '+nombreRecurso+'</td><td>'+costoUnitario+'</td><td>'+moneda+'</td><td>'+cantidad+'</td></tr>');
	

}

function creaComboMoneda(data){
	HashTipoCambio= {};
	comboMoneda='';
	arreglo=data[0];
	
	for (i=0; i<arreglo.length;i++){
		moneda=arreglo[i];
		agregaOpcion(moneda[0], moneda[1], moneda[2]);
		
	}		
	
}

//Fin funciones para pasar los datos de ajax

//Funcion para agregar una opcion de moneda

function agregaOpcion(idMoneda, nombre, tipoCambio){

	comboMoneda+='<option value="'+idMoneda+'">'+nombre+'</option>';
	HashTipoCambio[idMoneda]= tipoCambio;

}



//Función para insertar una actividad en el sidebar

function armaActividad( id, nombre){
	
	objetoLi='<li><a href='+"'"+'javascript:cambiaActividad("' + id + '");'+"'"+'>' + nombre + '</a></li>';
	
	$("#listado").append(objetoLi);
	
}


//Funcion para ingresar un recurso en los resumenes de actividades

function agregaFilaRecurso(tipo,i,idRecurso,unidadMedida, nombreRecurso, costoUnitario, moneda, canidadTotal){
	a=i;
	a++;
	
	//Si es para confirmar			
	inputHidden='<input type="hidden" id="tipoCambio'+(a)+'" value="">';
	$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+unidadMedida+' de '+nombreRecurso+'</td><td>'+costoUnitario
								+'</td><td>'+moneda+'</td><td>'+canidadTotal+'</td></tr><input type="hidden" id="idRecurso'
								+(a)+'" value="'+idRecurso+'">'+inputHidden);
	if (tipo==1) desabilitaMoneda(a);

}

function agregaFilaRecursoFijo(i,idRecurso,unidadMedida, nombreRecurso, costoFijoDiario, moneda, costoFijoTotal){
	a=i;
	a++;
	
	//Si es para confirmar				
	$("#tablaResumenCostoFijo").append('<tr><td>'+a+'</td><td>'+unidadMedida+' de '+nombreRecurso+'</td><td>'+costoFijoDiario
								+'</td><td>'+moneda+'</td><td>'+costoFijoTotal+'</td></tr><input type="hidden" id="idRecurso'
								+(a)+'" value="'+idRecurso+'">');
	
}

function creaInputMoneda(num){

	combo='<select id="comboMoneda'+num+'" onChange="actualizaCostos();" >'+ comboMoneda + '</select>';
	return combo;
	
}

//Desabilita el input moneda

function desabilitaMoneda(a){
	
	idSelect='#comboMoneda'+a;
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

//Funciones para grabar

$("#btnGrabar").click(function(){

	porcentajeReserva=$("#inputReserva").val();

	if (isNaN(porcentajeReserva) || (!isNaN(porcentajeReserva) && new Number(porcentajeReserva)<0)){
	
		alert('El porcentaje de reserva debe ser un número mayor igual a 0 y menor a 100');
		return;
	}


	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRecursos();
	}
});

function grabarRecursos(){
	
	porcentajeReserva=$("#inputReserva").val();
	
	var obj={
		idProyecto: idProyecto,	
		porcReserva: porcentajeReserva,
		porcContingencia: '0',
		idUsuario  : idUsuario
		
		
	}	
	/*
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_enviarPorcReserva/'+JSON.stringify(obj),		
		dataType: "json", 
		async: true,
		success:function(data,B){alert("Se grabó correctamente");}
	});*/
	
	$.ajax({
		type: 'POST',
		url: rootURL + 'CO_enviarPorcReserva',		
		data: JSON.stringify(obj),		
		dataType: "json", 
		contentType: "application/json; charset=utf-8",
		async: true,
		success:function(data,B){alert("Se grabó correctamente");}
	});
	
}



//Fin funciones para grabar

//Funciones para el uso del sidebar

function cambiaActividad(idActividad){
	$("#AsignarCostosRecursos").hide();
	$("#ResumenCostosRecursos").show();
	 obtenDatosActividad(idActividad);	
}

function cambiaCostoUnitario(){
	$("#AsignarCostosRecursos").show();
	$("#ResumenCostosRecursos").hide();	
	iniciaRecursos();
	$("#inputReserva").removeAttr('disabled');
	$("#inputReserva").removeAttr('readOnly');
	
}

//Fin de funciones para el uso del sidebar


//Limpia la tabla
function limpiaTablaResumen(){
	$("#tablaResumen").html('');
	$("#tablaResumen").append('<tr><td width="40%"><b>Recurso</b></td><td width="20%"><b>Costo Unitario</b></td><td width="20%"><b>Unidad de Moneda</b></td><td width="20%"><b>Cantidad</b></td></tr>');
		

}

function limpiaTablaRecursosFijo(){
	$("#tablaResumenCostoFijo").html('');
	$("#tablaResumenCostoFijo").append('<tr><td width="10%"><b>#</b></td><td width="30%"><b>Recurso</b></td><td width="20%"><b>Costo Fijo Diario</b></td><td width="20%"><b>Moneda</b></td><td width="20%"><b>Costo Fijo Total</b></td></tr>');
		

}

function limpiaTablaRecursos(){
	$("#tablaRecursos").html('');
	$("#tablaRecursos").append('<tr><td width="10%"><b>#</b></td><td width="30%"><b>Recurso</b></td><td width="20%"><b>Costo Unitario</b></td><td width="20%"><b>Moneda</b></td><td width="20%"><b>Cantidad Total</b></td></tr>');
	

}

function actualizaCostos(){

	
	porcentajeReserva=document.getElementById("inputReserva").value;
	
	valorSinReserva= sacaValorSinReserva();
	
	$('#inputMontoSinReserva').val(valorSinReserva);
	
	reserva = $('#inputReserva').val();
	contingencia = $('#inputContingencia').val();
	
	if (isNaN(reserva)){
		
		reserva=0;	
	
	}
	
	if (isNaN(contingencia)){
		
		contingencia=0;	
	
	}
	
	montoReserva= reserva*valorSinReserva/100;
	
	$('#reservaTotal').val(montoReserva);
	
	montoReserva++;
	valorSinReserva++;
	contingencia++;
	
	$('#inputMontoConReserva').val( montoReserva - 2 + valorSinReserva-1+contingencia);

}

function sacaValorSinReserva(){

	valor= $("#inputMontoSinReserva").val();
	if (isNaN(valor)) valor=0;
	
	return valor;

}

function obtenerIdProyecto(){

	//localStorage.setItem('idProyecto','1');
	id= localStorage.idProyecto;
	
	if (id==null){ 
		alert ("El id es null");
		id=1;
	}
	
	return id;

}