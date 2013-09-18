var rootURL = "../../api/";
var codProyecto='1';
var idProyecto=1;
var numRecursos= 0;
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

iniciaActividades();
iniciaProyecto();		
iniciaRecursos();


//Funciones para obtener datos de AJAX


function obtenActividades(/*idProyecto*/){
	
	
	$.ajax({
		type: 'GET',
		url: rootURL,
		data: 'idProyecto=' + idProyecto,
		dataType: "json" // data type of response		
	});
	
	
	return arregloActividades;

}

/*esta es la que vale! has todas asi*/
function obtenProyecto(/*idProyecto*/){
	var obj ={
		idProyecto : idProyecto,
		atributo2 : "holi"
	}
	var datita;
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerInfoProyecto/'+JSON.stringify(obj),
		dataType: "json",
		async: false,
		success:function(data){
			datita=data;
		}	

	});
	return datita;	
	
	//return arregloProyecto;

}
/*aca temrmina*/
function obtenRecursos(/*idProyecto*/){

	$.ajax({
		type: 'GET',
		url: rootURL,
		data: 'idProyecto=' + idProyecto,
		dataType: "json"		
	});
	
	
	return arregloRecursos;

}

function obtenDatosActividad(idActividad){
	
	$.ajax({
		type: 'GET',
		data: 'idActividad=' + idActividad,
		url: rootURLResumen,
		dataType: "json", // data type of response
		success: agregaDataFilaResumen
	});
	
	
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
	arreglo= obtenRecursos(/*idProyecto*/);
	agregaDataFila( arreglo, 0 );

}

function iniciaConfirmaRecursos(){
	limpiaTablaRecursos();
	iniciaProyecto();		
	arreglo= obtenRecursos(/*idProyecto*/);
	agregaDataFila( arreglo, 1 );

}

function agregaDataFila(arreglo, tipo){
	
	for (i=0; i<arreglo.length;i++){
		filaRecurso=arreglo[i];
		agregaFilaRecurso(tipo,i,filaRecurso[0],filaRecurso[1],filaRecurso[2],filaRecurso[3],filaRecurso[4],filaRecurso[5]);
		numRecursos=i;
	}
}

function iniciaProyecto(){
			
	proy= obtenProyecto(/*idProyecto*/);
	//var proy = JSON.parse(proyecto);
	agregaDatosProyecto( proy.nombre ,proy.presupuestoTotal ,proy.porcentajeReserva);

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

function agregaDataFilaResumen(datosActividad){
	
	nombreActividad= datosActividad[0];
	subTotalActividad= datosActividad[1];	
	moneda= datosActividad[2];
	arreglo= datosActividad[3];
	
	if (arreglo==null){
		arreglo=new Array();
		alert("Ocurrio un error");
	}
	
	limpiaTablaResumen();
	
	for (i=0; i<arreglo.length;i++){
		recurso=arreglo[i];
		agregaFilaActividadResumen(i, recurso[0], recurso[1], recurso[3], recurso[4], recurso[2]);
	}
	
	$("#tituloActividad").html(nombreActividad);
	$("#tablaTotalActividad").html('<tr width="100%"><td width="40%"><b>Total</b></td><td width="20%"><b>'+subTotalActividad+'</b></td><td width="40%">'+moneda+'</td></tr>');
		
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
	$("#tablaResumen").append('<tr><td>'+unidadMedida+' de '+nombreRecurso+'</td><td>'+costoUnitario+'</td><td>'+moneda+'</td><td>'+cantidad+'</td></tr>');
	

}

//Fin funciones para pasar los datos de ajax

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
	if (tipo==0)input= '<input type="text" class="form-control" id="costoUnitario'+(a)+'" placeholder="Costo" size="6" value="'+costoUnitario+'">';
	if (tipo==1)input= '<input type="text" class="form-control" id="costoUnitario'+(a)+'" placeholder="Costo" size="6" value="'+costoUnitario+'" readOnly="readOnly" disabled>';
	$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+unidadMedida+' de '+nombreRecurso+'</td><td>'+input+'</td><td>'+moneda+'</td><td>'+canidadTotal+'</td></tr><input type="hidden" id="idRecurso'+(a)+'" value="'+idRecurso+'">');
	

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
	idRecursos="";
	costoRecursos="";
	porcentajeReserva=0;
	
	num=numRecursos;
	num++;
	for (i=1; i<=num;i++){
	
		if (i>1){
			idRecursos+=",";
			costoRecursos+=",";
		}
		idRecursos+= document.getElementById("idRecurso"+i).value;
		costoRecursos+=document.getElementById("costoUnitario"+i).value;
	
	}
	porcentajeReserva=document.getElementById("inputReserva").value;
	
	
	alert("Se grabó " + idRecursos + " " + costoRecursos+ " " + porcentajeReserva);
	

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
	$("#tablaResumen").append('<tr><td width="40%"><b>Recurso</b></td><td width="20%"><b>Costo Unitario</b></td><td width="20%"><b>Unidad de Moneda</b></td><td width="20%"><b>Cantidad</b></td></tr>');
		

}

function limpiaTablaRecursos(){
	$("#tablaRecursos").html('');
	$("#tablaRecursos").append('<tr><td width="10%"><b>#</b></td><td width="30%"><b>Recurso</b></td><td width="20%"><b>Costo Unitario</b></td><td width="20%"><b>Moneda</b></td><td width="20%"><b>Cantidad Total</b></td></tr>');
	

}