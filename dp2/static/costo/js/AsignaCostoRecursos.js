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
							new Array('1','Unidad','Ladrillo', '2','Nuevos soles','85'),
							new Array('2','Unidad','Bote de pintura', '8','Nuevos soles','12'),
							new Array('3','Litro','Cemento', '','Nuevos soles','10'),
							new Array('4','Kilo','Fierro', '10','Nuevos soles','30')
								);

var arregloActividades= new Array(

							new Array('1', 'Actividad 1'),
							new Array('2', 'Actividad 2')
							);

var arregloActividad1= new Array(
									'Actividad 1','106','Nuevos soles',new Array(
									new Array('Unidad','Ladrillo', '2','Nuevos soles', '5'),
									new Array('Unidad','Bote de pintura', '8','Nuevos soles','12')
									)
								);
								

var arregloActividad2= new Array(
									'Actividad 2', '460','Nuevos soles',new Array(
									new Array('Unidad','Ladrillo', '2','Nuevos soles','80'),
									new Array('Litro','Cemento', '','Nuevos soles','10'),
									new Array('Kilo','Fierro', '10','Nuevos soles','30')
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
		actualizaCostos();
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

function obtenContingencia(porcCont){
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario,
		porcContingencia : porcCont
		
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

//Funcion para obtener el monto contingencia actual
function obtenMontoContingencia(porcCont){
	
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario,
		porcContingencia : porcCont
		
	}

	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerMontoContingencia/' + JSON.stringify(obj),
		dataType: "json", // data type of response
		success: agregaDataMontoContingencia
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
	obtenProyecto();

}

function agregarDataProyecto(data){

	proy=data;
	indGrabar=verificaPermisosGrabar(idVista);
	if (proy!=null) agregaDatosProyecto( proy.nombre ,proy.presupuesto ,proy.porcentajeReserva, proy.porcentajeContingencia ,proy.indicadorCerrado, proy.indicadorLineaBase,indGrabar);
}

function agregaDataMontoContingencia(data){

	$("#inputContingencia").val(formateaNumero(data.montoContingencia,2));

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
		moneda= "Nuevos soles"; // Arreglar
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
		$("#tablaTotalActividad").html('<tr width="100%"><td width="40%"><b>Total</b></td><td width="20%"><b>'+formateaNumero(subTotalActividad,2)+'</b></td><td width="40%">'+moneda+'</td></tr>');
		
	}	
}

function agregaDatosProyecto(nombreProyecto, montoSinReserva, porcentajeReserva , porcentajeContingencia ,indCerrado, indLineaBase, indGrabar){
	$("#nombreProyecto").html(nombreProyecto);
	$("#inputMontoSinReserva").val(formateaNumero(montoSinReserva,2));
	$("#inputReserva").val(formateaNumero(porcentajeReserva,2));
	$("#inputPorcentajeContingencia").val(formateaNumero(porcentajeContingencia,2));
	
	obtenMontoContingencia(porcentajeContingencia);
	
	var reseTotal= new Number(porcentajeReserva*0.01*montoSinReserva);
	var reseForm=reseTotal.toFixed(2);
	
	$("#reservaTotal").val(reseForm);
	$("#inputMontoConReserva").val(formateaNumero(montoSinReserva*1 + porcentajeReserva*0.01*montoSinReserva,2));
	
	if (indCerrado=="1" || indLineaBase=="1" || indGrabar=="0"){
	
		$("#inputReserva").attr('disabled', 'disabled');
		$("#inputReserva").attr('readOnly', 'readOnly');
		$("#inputPorcentajeContingencia").attr('disabled', 'disabled');
		$("#inputPorcentajeContingencia").attr('readOnly', 'readOnly');
		$("#btnGrabar").hide();
		$("#btnCancelar").hide();
	}else{
		$("#inputReserva").removeAttr('disabled');
		$("#inputReserva").removeAttr('readOnly');
		$("#inputPorcentajeContingencia").removeAttr('disabled');
		$("#inputPorcentajeContingencia").removeAttr('readOnly');
		$("#btnGrabar").show();
		$("#btnCancelar").show();
	}
	
}

function agregaFilaActividadResumen(i, unidadMedida, nombreRecurso, moneda, cantidad, costoUnitario){
	a=i;
	a++;	
	$("#tablaResumen > tbody").append('<tr><td>'+unidadMedida+' de '+nombreRecurso+'</td><td>'+formateaNumero(costoUnitario,2)+'</td><td>'+moneda+'</td><td>'+cantidad+'</td></tr>');
	$("#tablaResumen").trigger("update");
	

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
	$("#tablaRecursos > tbody").append('<tr><td>'+a+'</td><td>'+unidadMedida+' de '+nombreRecurso+'</td><td>'+formateaNumero(costoUnitario,2)
								+'</td><td>'+moneda+'</td><td>'+canidadTotal+'</td></tr><input type="hidden" id="idRecurso'
								+(a)+'" value="'+idRecurso+'">'+inputHidden);
	if (tipo==1) desabilitaMoneda(a);
	$("#tablaRecursos").trigger("update");

}

function agregaFilaRecursoFijo(i,idRecurso,unidadMedida, nombreRecurso, costoFijoDiario, moneda, costoFijoTotal){
	a=i;
	a++;
	
	//Si es para confirmar				
	$("#tablaResumenCostoFijo > tbody").append('<tr><td>'+a+'</td><td>'+unidadMedida+' de '+nombreRecurso+'</td><td>'+formateaNumero(costoFijoDiario,2)
								+'</td><td>'+moneda+'</td><td>'+formateaNumero(costoFijoTotal,2)+'</td></tr><input type="hidden" id="idRecurso'
								+(a)+'" value="'+idRecurso+'">');
	$("#tablaResumenCostoFijo").trigger("update");

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
	porcentajeContingencia=$("#inputPorcentajeContingencia").val();
	var grabar=true;

	if (isNaN(porcentajeReserva) || (!isNaN(porcentajeReserva) && new Number(porcentajeReserva)<0)){
		
		lanzaAlerta("divReserva","labReserva","");
		grabar=false;
	}else
		borraAlerta("divReserva","labReserva");
		
	if (isNaN(porcentajeContingencia) || (!isNaN(porcentajeContingencia) && new Number(porcentajeContingencia)<0)){
		
		lanzaAlerta("divContingencia","labContingencia","");
		grabar=false;
	}else
		borraAlerta("divContingencia","labContingencia");

	if (grabar){
		confirmar("¿Está seguro que desea grabar los cambios realizados?",grabarRecursos);
	}
});

function grabarRecursos(){
	
	var porcentajeReserva=$("#inputReserva").val();
	var porcentajeContingencia=$("#inputPorcentajeContingencia").val();
	
	var obj={
		idProyecto: idProyecto,	
		porcReserva: porcentajeReserva,
		porcContingencia: porcentajeContingencia,
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
	$("#tablaResumen > tbody").html('');
	$("#tablaResumen").trigger("update");


}

function limpiaTablaRecursosFijo(){
	$("#tablaResumenCostoFijo > tbody").html('');
	$("#tablaResumenCostoFijo").trigger("update");


}

function limpiaTablaRecursos(){
	$("#tablaRecursos > tbody").html('');
	$("#tablaRecursos").trigger("update");


}

function actualizaContingencia(){

	var porcentajeContingencia= $("#inputPorcentajeContingencia").val();
	if (isNaN(porcentajeContingencia)){
		porcentajeContingencia=0;
		//$("#inputPorcentajeContingencia").val(0);
	}
	obtenMontoContingencia(porcentajeContingencia);
	actualizaCostos();
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
	
	$('#inputMontoConReserva').val(formateaNumero( montoReserva - 2 + valorSinReserva-1+contingencia,2));

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