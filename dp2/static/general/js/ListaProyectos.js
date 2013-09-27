var rootURL = "../../api/G_listaProyecto";

/*
var codProyecto='1';

var arregloProyecto= new Array(
							new Array('Proyecto1','Bonnie Carranza','13/05/2013','23/06/2013'),
							new Array('Proyecto2','Alfonso Bedoya','01/06/2013','14/10/2013'),
							new Array('Proyecto3','Jose Astuvilca','15/06/2013','13/09/2013'),
							new Array('Proyecto4','Bonnie Carranza','21/08/2013','21/10/2013')
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
*/
								
iniciaProyectos();

function iniciaProyectos(){
	
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response	
		fail: codigoError,
        success: function(data){                    
            agregaDataFila(data);
        }
	});
}

function codigoError(){

	alert('Error');

}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	if (data!=null){
		arreglo=data["prs"];
	}
	for (i=0; i<arreglo.length;i++){		
		agregaFilaProyecto(arreglo[i],i);
	}
}

function agregaFilaProyecto(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	$("#listaProyectos").append('<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["jp"] + '</td><td>' + arreglo["tp"] + '</td><td>' + arreglo["fi"] + '</td><td>' + arreglo["ff"] + '</td><td><a href=RegistrarActaConstitucion.html>Ver/Registrar</a></td></tr>');

	localStorage["id"] = arreglo["id"];
	localStorage["nombre"] = arreglo["nom"];
}


$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRecursos();
	}
});

function grabarRecursos(){
	
	alert("Se grabó");

}