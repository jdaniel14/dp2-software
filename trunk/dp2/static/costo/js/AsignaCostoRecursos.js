var rootURL = "../../backend/presupuesto/obtenerArregloRecursos";
var codProyecto='1';

var arregloProyecto= new Array(
							new Array('Unidad','Ladrillo', '2','Soles'),
							new Array('Unidad','Bote de pintura', '8','Soles'),
							new Array('Litro','Cemento', '','Soles'),
							new Array('Kilo','Fierro', '10','Soles')
								);

var arregloActividades= new Array(

							new Array('1', 'Actividad 1'),
							new Array('2', 'Actividad 2')
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
iniciaRecursos();

function iniciaActividades(){

	arreglo=obtenActividades(/*idProyecto*/);
	$("#listado").append('<li class="active"><a href="javascript:cambiaCostoUnitario();">Costos unitarios por recurso</a></li>');
	$("#listado").append('<li>Resumen por actividad</li>');
	
	for(i=0; i<arreglo.length; i++){
		actividad=arreglo[i];
		armaActividad(actividad[0],actividad[1]);
		
	}
	
}

function obtenActividades(/*idProyecto*/){

	return arregloActividades;

}

function iniciaRecursos(){
		
	/*$.ajax({
		type: 'GET',
		url: rootURL,
		data: 'idProyecto=' + 1,
		dataType: "json", // data type of response
		success: anadeDataFila		
	});
	*/
	
	
	agregaDataFila( null );

}

function codigoError(){

	alert('Error');

}

function armaActividad( id, nombre){
	
	objetoLi='<li><a href='+"'"+'javascript:cambiaActividad("' + id + '", "' + nombre + '");'+"'"+'>' + nombre + '</a></li>';
	
	$("#listado").append(objetoLi);
	
}


function agregaDataFila(data){
	arreglo=arregloProyecto;
	if (data!=null){
		arreglo=data;
	}
	for (i=0; i<arreglo.length;i++){
		
		agregaFilaRecurso(arreglo[i],i);
	}
}

function agregaFilaRecurso(arreglo,i){
	a=i;
	a++;
	input= '<input type="text" class="form-control" id="costoUnitario'+(a)+'" placeholder="Costo" size="6" value="'+arreglo[2]+'">';
	$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+arreglo[0]+' de '+arreglo[1]+'</td><td>'+input+'</td><td>'+arreglo[3]+'</td></tr>');
	

}


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


$("#btnResumen").click(function(){
	
	$("#AsignarCostosRecursos").hide();
	$("#ResumenCostosRecursos").show();
	 obtenDatosActividad('1');
});

function cambiaActividad(idActividad, nombreActividad){
	$("#AsignarCostosRecursos").hide();
	$("#ResumenCostosRecursos").show();
	 obtenDatosActividad(idActividad);
	$("#tituloActividad").html(nombreActividad);
}

function cambiaCostoUnitario(){
	$("#AsignarCostosRecursos").show();
	$("#ResumenCostosRecursos").hide();	
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

function agregaDataFilaResumen(arreglo){
	
	if (arreglo==null){
		arreglo=new Array();
		alert("Ocurrio un error");
	}
	
	limpiaTablaResumen();
	
	for (i=0; i<arreglo.length;i++){
		
		agregaFilaActividadResumen(arreglo[i],i);
	}
}


function agregaFilaActividadResumen(arreglo,i){
	a=i;
	a++;	
	$("#tablaResumen").append('<tr><td>'+arreglo[0]+' de '+arreglo[1]+'</td><td>'+arreglo[3]+'</td><td>'+arreglo[4]+'</td><td>'+arreglo[2]+'</td></tr>');
	

}

function limpiaTablaResumen(){
	$("#tablaResumen").html('');
	$("#tablaResumen").append('<tr><td width="40%"><b>Recurso</b></td><td width="20%"><b>Unidad de Moneda</b></td><td width="20%"><b>Cantidad</b></td><td width="20%"><b>Costo Unitario</b></td></tr>');
		

}