var rootURL = "api/efectopucp";
var codProyecto='1';

var arregloProyecto= new Array(new Array('Ladrillo', '','Soles'));

iniciaRecursos();

function iniciaRecursos(){
	
	/*
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: añadeDataFila
	});
	*/
	
	
	anadeDataFila( null );

}

function anadeDataFila(data){
	arreglo=arregloProyecto;
	if (data!=null){
		arreglo=data;
	}
	for (i=0; i<arreglo.length;i++){
		
		anadeFilaRecurso(arreglo[i],i);
	}
}

function anadeFilaRecurso(arreglo,i){
	a=i;
	a++;
	input= '<input type="text" class="form-control" id="costoUnitario'+(a)+'" placeholder="Costo" size="6" value="'+arreglo[1]+'">';
	$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+arreglo[0]+'</td><td>'+input+'</td><td>'+arreglo[2]+'</td></tr>');
	

}






