var rootURL = "../../backend/presupuesto/obtenerArregloRecursos";
var codProyecto='1';

var arregloProyecto= new Array(
							new Array('Unidad','Ladrillo', '2','Soles'),
							new Array('Unidad','Bote de pintura', '8','Soles'),
							new Array('Litro','Cemento', '','Soles'),
							new Array('Kilo','Fierro', '10','Soles')
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
								
iniciaRecursos();

function iniciaRecursos(){
		
	/*$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: anadeDataFila,
		fail: codigoError
	});
	*/
	
	
	agregaDataFila( null );

}

function codigoError(){

	alert('Error');

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


function obtenDatosActividad(codActividad){
	
	/*$.ajax({
		type: 'GET',
		url: rootURLResumen,
		dataType: "json", // data type of response
		success: agregaDataFilaResumen,
		fail: codigoError
	});
	*/
	
	if (codActividad=='1'){
		
		agregaDataFilaResumen(arregloActividad1);
		
	}
	
	if (codActividad=='2'){
		
		agregaDataFilaResumen(arregloActividad2);
		
	}

}

function agregaDataFilaResumen(arreglo){
	
	if (arreglo==null){
		arreglo=new Array();
		alert("Ocurrio un error");
	}
	for (i=0; i<arreglo.length;i++){
		
		agregaFilaActividadResumen(arreglo[i],i);
	}
}


function agregaFilaActividadResumen(arreglo,i){
	a=i;
	a++;	
	$("#tablaResumen").append('<tr><td>'+arreglo[0]+' de '+arreglo[1]+'</td><td>'+arreglo[3]+'</td><td>'+arreglo[4]+'</td><td>'+arreglo[2]+'</td></tr>');
	

}