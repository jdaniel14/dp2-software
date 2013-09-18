var rootURL = "../../backend/presupuesto/obtenerArregloRecursos";
var codProyecto='1';


iniciaProyecto();		
iniciaCuentaxActividad();


//Funciones para obtener datos de AJAX


function obtenActividades(/*idProyecto*/){
	
	/*$.ajax({
		type: 'GET',
		url: rootURL,
		data: 'idProyecto=' + idProyecto,
		dataType: "json", // data type of response
		success: anadeDataFila		
	});
	*/
	return arregloActividades;

}

function obtenProyecto(/*idProyecto*/){
	
	/*$.ajax({
		type: 'GET',
		url: rootURL,
		data: 'idProyecto=' + idProyecto,
		dataType: "json", // data type of response
		success: anadeDataFila		
	});
	*/
	
	return arregloProyecto;

}

function obtenActividades(/*idProyecto*/){

	/*$.ajax({
		type: 'GET',
		url: rootURL,
		data: 'idProyecto=' + idProyecto,
		dataType: "json", // data type of response
		success: anadeDataFila		
	});
	*/
	
	return arregloRecursos;

}

function obtenDatosActividad(idActividad){
	
	/*$.ajax({
		type: 'GET',
		data: 'idActividad=' + idActividad,
		url: rootURLResumen,
		dataType: "json", // data type of response
		success: agregaDataFilaResumen
	});
	*/
	
	if (idActividad=='1'){
		
		agregaDataFilaResumen(arregloActividad1);
		
	}
	
	if (idActividad=='2'){
		
		agregaDataFilaResumen(arregloActividad2);
		
	}

}

//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaCuentaxActividad(){
	limpiaTablaCuentaxActividad();
	arreglo= obtenActividades(/*idProyecto*/);
	agregaDataFila( arreglo, 0 );

}

function iniciaConfirmaCuentaxActividad(){
	limpiaTablaCuentaxActividad();
	iniciaProyecto();		
	arreglo= obtenActividades(/*idProyecto*/);
	agregaDataFila( arreglo, 1 );

}

function agregaDataFila(arreglo, tipo){
	
	for (i=0; i<arreglo.length;i++){
		var filaAct=arreglo[i];
		agregaFilaCuentaActividad(tipo,i,filaAct[0],filaAct[1],filaAct[2],filaAct[3]);
	}
}

function iniciaProyecto(){
			
	proyecto= obtenProyecto(/*idProyecto*/);
	agregaDatosProyecto( proyecto[0] , proyecto[1], proyecto[2] );

}

function agregaDatosProyecto(nombreProyecto, montoSinReserva, porcentajeReserva){
	$("#nombreProyecto").html(nombreProyecto);
	$("#inputMontoSinReserva").val(montoSinReserva);
	$("#inputReserva").val(porcentajeReserva);
	$("#reservaTotal").val(porcentajeReserva*0.01*montoSinReserva);
	$("#inputMontoConReserva").val(montoSinReserva*1 + porcentajeReserva*0.01*montoSinReserva);
}

function agregaFilaActividadResumen(i, unidadMedida, nombreRecurso, moneda, cantidad, costoUnitario){
	a=i;
	a++;	
	$("#tablaResumen").append('<tr><td>'+unidadMedida+nombreRecurso+'</td><td>'+moneda+'</td><td>'+cantidad+'</td><td>'+costoUnitario+'</td></tr>');
	

}

//Fin funciones para pasar los datos de ajax

//Funcion para ingresar una fila de actividad en la tabla cuentaxacticidad en los resumenes de actividades

function agregaFilaCuentaActividad(tipo,i, unidadMedida, nombreRecurso, costoUnitario, moneda){
	a=i;
	a++;
	input= '<select id="tipoCuenta'+(a)+'"><option>Equipo</option><option>Maquinaria</option><option>Mano de obra</option><option>Capital</option></select>';
	$("#tablaCuentaxActividad").append('<tr><td>'+a+'</td><td>'+unidadMedida+''+nombreRecurso+'</td><td>'+input+'</td><td>'+'X soles'+'</td></tr>');
}

//Funciones para grabar

$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRecursos();
	}
});

function grabarRecursos(){
	alert("Se grabó");
}
//Fin funciones para grabar

function limpiaTablaCuentaxActividad(){
	$("#tablaCuentaxActividad").html('');
	$("#tablaCuentaxActividad").append('<tr><td width="10%"><b>#</b></td><td width="40%"><b>Actividad</b></td><td width="20%"><b>Tipo cuenta</b></td><td width="30%"><b>Costo subtotal</b></td></tr>');
			

}