var rootURL = "../../backend/presupuesto/obtenerArregloRecursos";
var codProyecto='1';

var arregloProyecto= new Array(
							'Mi proyecto', '566', '1.5'
								);

var arregloRecursos= new Array(
							new Array('Unidad','Ladrillo', '2','Soles'),
							new Array('Unidad','Bote de pintura', '8','Soles'),
							new Array('Litro','Cemento', '','Soles'),
							new Array('Kilo','Fierro', '10','Soles')
								);

var arregloActividades= new Array(

							new Array('', 'Actividad 1'),
							new Array('', 'Actividad 2')
							);

var arregloActividad1= new Array(
							new Array('Unidad','Ladrillo', '2','Soles', '5'),
							new Array('Unidad','Bote de pintura', '8','Soles','12')
								);
								

var arregloActividad2= new Array(
							new Array('Unidad','Ladrillo', '2','Soles','80'),
							new Array('Litro','Cemento', '','Soles','10'),
							new Array('Kilo','Fierro', '10','Soles','30')
								);

iniciaActividades();
iniciaProyecto();		
iniciaRecursos();


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

function obtenRecursos(/*idProyecto*/){

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

function iniciaRecursos(){
	limpiaTablaRecursos();
	arreglo= obtenActividades(/*idProyecto*/);
	agregaDataFila( arreglo, 0 );

}

function iniciaConfirmaRecursos(){
	limpiaTablaRecursos();
	iniciaProyecto();		
	arreglo= obtenActividades(/*idProyecto*/);
	agregaDataFila( arreglo, 1 );

}

function agregaDataFila(arreglo, tipo){
	
	for (i=0; i<arreglo.length;i++){
		filaRecurso=arreglo[i];
		agregaFilaRecurso(tipo,i,filaRecurso[0],filaRecurso[1],filaRecurso[2],filaRecurso[3]);
	}
}

function iniciaProyecto(){
			
	proyecto= obtenProyecto(/*idProyecto*/);
	agregaDatosProyecto( proyecto[0] , proyecto[1], proyecto[2] );

}



function iniciaActividades(){

	arreglo=obtenActividades(/*idProyecto*/);
	
	$("#listado").append('<li>Costo unitario y resumen</li>');
	$("#listado").append('<li class="active"><a href="javascript:cambiaCostoUnitario();">Costos unitarios por recurso</a></li>');
	if(puedeConfirmar=='1') $("#listado").append('<li class="active"><a href="javascript:cambiaConfirmaPresupuesto();">Confirmar presupuesto</a></li>');
	$("#listado").append('<li>Resumen por actividad</li>');
	
	for(i=0; i<arreglo.length; i++){
		actividad=arreglo[i];
		armaActividad(actividad[0],actividad[1]);
		
	}
	

}

function agregaDataFilaResumen(arreglo){
	
	if (arreglo==null){
		arreglo=new Array();
		alert("Ocurrio un error");
	}
	
	limpiaTablaResumen();
	
	for (i=0; i<arreglo.length;i++){
		recurso=arreglo[i];
		agregaFilaActividadResumen(i, recurso[0], recurso[1], recurso[3], recurso[4], recurso[2]);
	}
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

//Función para insertar una actividad en el sidebar

function armaActividad( id, nombre){
	
	objetoLi='<li><a href='+"'"+'javascript:cambiaActividad("' + id + '", "' + nombre + '");'+"'"+'>' + nombre + '</a></li>';
	
	$("#listado").append(objetoLi);
	
}


//Funcion para ingresar un recurso en los resumenes de actividades

function agregaFilaRecurso(tipo,i, unidadMedida, nombreRecurso, costoUnitario, moneda){
	a=i;
	a++;
	
	//Si es para confirmar	
	if (tipo==0)input= '<select id="tipoCuenta'+(a)+'"><option>Equipo</option><option>Maquinaria</option><option>Mano de obra</option><option>Capital</option></select>';
	$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+unidadMedida+''+nombreRecurso+'</td><td>'+input+'</td><td>'+'X soles'+'</td></tr>');
	

}

//Funciones para grabar

$("#btnGrabar").click(function(){

	/*
		VERIFICAR LA NUMEROSIDAD DE LOS COSTOS UNITARIOS
	
	
	*/




	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRecursos();
	}
});

function grabarRecursos(){
	
	alert("Se grabó");

}
//Fin funciones para grabar

//Funciones para el uso del sidebar

function cambiaActividad(idActividad, nombreActividad){
	$("#AsignarCostosRecursos").hide();
	$("#ResumenCostosRecursos").show();
	 obtenDatosActividad(idActividad);
	$("#tituloActividad").html(nombreActividad);
}

function cambiaCostoUnitario(){
	$("#AsignarCostosRecursos").show();
	$("#ResumenCostosRecursos").hide();	
	iniciaRecursos();
	$("#inputReserva").removeAttr('disabled');
	$("#inputReserva").removeAttr('readOnly');
	$("#btnGrabar").show();
	$("#btnCancelar").show();
	$("#btnConfirmar").hide();
}

function cambiaConfirmaPresupuesto(){
	
	$("#AsignarCostosRecursos").show();
	$("#ResumenCostosRecursos").hide();
	iniciaConfirmaRecursos();
	$("#inputReserva").attr('disabled', 'disabled');
	$("#inputReserva").attr('readOnly', 'readOnly');
	$("#btnGrabar").hide();
	$("#btnCancelar").hide();
	$("#btnConfirmar").show();
}

//Fin de funciones para el uso del sidebar


//Limpia la tabla
function limpiaTablaResumen(){
	$("#tablaResumen").html('');
	$("#tablaResumen").append('<tr><td width="40%"><b>Actividad</b></td><td width="20%"><b>Unidad de Moneda</b></td><td width="20%"><b>Cantidad</b></td><td width="20%"><b>Tipo cuenta</b></td></tr>');
		

}

function limpiaTablaRecursos(){
	$("#tablaRecursos").html('');
	$("#tablaRecursos").append('<tr><td width="10%"><b>#</b></td><td width="40%"><b>Actividad</b></td><td width="20%"><b>Tipo cuenta</b></td><td width="30%"><b>Costo subtotal</b></td></tr>');
			

}