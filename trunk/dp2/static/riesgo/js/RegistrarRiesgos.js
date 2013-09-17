var getAllItems = "../../backend/riesgo/obtenerArregloRiesgos";
var getItem = "../../backend/riesgo/obtenerRiesgo";
var addItem = "../../backend/riesgo/agregarRiesgo";

var arregloRiesgo = new Array(
								new Array('Riesgo 1','Actividad 1','Costo','0.2','0.1','evitar','Accion Especifica 1','100','2','Equipo 1'),
								new Array('Riesgo 2','Actividad 2','Tiempo','0.3','0.2','explotar','Accion Especifica 2','200','1','Equipo 3'),
								new Array('Riesgo 3','Actividad 3','Alcance','0.4','0.4','transferir','Accion Especifica 3','400','4','Equipo 5'),
								new Array('Riesgo 4','Actividad 4','Calidad','0.8','0.6','mejorar','Accion Especifica 4','500','3','Equipo 4'),
								new Array('Riesgo 5','Actividad 5','Calidad','0.3','0.6','compartir','Accion Especifica 5','500','2','Equipo 3')
							 );
var arregloRiesgoComunes = new Array(
								new Array('RSK10', 'Riesgo Común 10','0.3','0.9','0.27'),
								new Array('RSK11', 'Riesgo Común 11','0.4','0.6','0.24'),
								new Array('RSK12', 'Riesgo Común 12','0.1','0.8','0.08'),
								new Array('RSK13', 'Riesgo Común 13','0.5','0.7','0.35')
							);

$(document).ready(main);

function main(){
	iniciaRiesgos();
	$(".glyphicon.glyphicon-edit").one('click',function(){
		var data = {
			id: $(this).closest("tr").attr("id")
		};
		var jsonData = JSON.stringify(data);
		console.log(jsonData);
		$.ajax({
			type: 'GET',
			url: getItem,
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				$('#nomRiesgoM').val(item.nombre);
				$('#paqEdtM').val(item.paquete);
				$('#objAfeM').val(item.objeto);
				$('#impRiesgoM').val(item.impacto);
				$('#proRiesgoM').val(item.probabilidad);
				$('#accEspM').val(item.acciones);
				$('#costRiesgoM').val(item.costo);
				$('#tiemRiesgoM').val(item.tiempo);
				$('#equResM').val(item.equipo);
			},
			fail: codigoError
		});
	});

	$("#btnRegistrar").one('click', function(){
		var data = {
			nombre: $('#nomRiesgo').val(),
			paquete: $('#paqEdt').val(),
			objeto: $('#objAfe').val(),
			impacto: $('#impRiesgo').val(),
			probabilidad: $('#proRiesgo').val(),
			acciones: $('#accEsp').val(),
			costo: $('#costRiesgo').val(),
			tiempo: $('#tiemRiesgo').val(),
			equipo: $('#equRes').val()
		};
		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'POST',
			url: addItem,
			data: jsonData,
			dataType: "json",
			success: function(){
				alert("Se registró exitosamente el Riesgo");
			},
			fail: codigoError
		});
	});
}

function iniciaRiesgos(){
		
	/*$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: anadeDataFila,
		fail: codigoError
	});
	*/
	
	
	agregaDataFila( null );
	agregaDataComunFila (null);

}

function codigoError(){

	alert('Error');

}

function agregaDataFila(data){
	arreglo=arregloRiesgo;
	if (data!=null){
		arreglo=data;
	}
	for (i=0; i<arreglo.length;i++){
		
		agregaFilaRiesgo(arreglo[i],i);
	}
}

function agregaDataComunFila(data){
	arreglo=arregloRiesgoComunes;
	if (data!=null){
		arreglo=data;
	}
	for (i=0; i<arreglo.length;i++){
		
		agregaFilaRiesgoComun(arreglo[i],i);
	}
}

function agregaFilaRiesgo(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="costoUnitario'+(a)+'" placeholder="Costo" size="6" value="'+arreglo[2]+'">';
	severidad = Math.floor(parseFloat(arreglo[3])*parseFloat(arreglo[4]) * 100) / 100;
	console.log(severidad);
	$("#tablaRiesgos").append('<tr id='+i+'><td>RIE'+a+'</td><td>'+arreglo[0]+'</td><td>'+arreglo[1]+'</td><td>'+arreglo[2]+'</td><td>'+arreglo[3]+'</td><td>'+arreglo[4]+'</td><td> <a href=\"#\" ><span class=\"imagen-calculadora\"></span></a></td><td>'+ severidad +'</td><td>'+arreglo[5]+'</td><td>'+arreglo[6]+'</td><td>'+arreglo[7]+'</td><td>'+arreglo[8]+'</td><td>'+arreglo[9]+'</td><td> <a data-toggle=\"modal\" href=\"#myModal\"><span class=\"glyphicon glyphicon-edit\"></span></a></td><td> <a href=\"#\" > <span class=\"glyphicon glyphicon-remove\"></span></a></td><td> <a href=\"#\" ><span class=\"glyphicon glyphicon-search\"></span></a></td></tr>');

}

function agregaFilaRiesgoComun(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="costoUnitario'+(a)+'" placeholder="Costo" size="6" value="'+arreglo[2]+'">';
	
	
	$("#tablaRiesgosComunes").append('<tr id='+arreglo[0]+'><td>'+arreglo[0]+'</td><td>'+arreglo[1]+'</td><td>'+arreglo[2]+'</td><td>'+arreglo[3]+'</td><td>'+arreglo[4]+'</td><td><input type=\"checkbox\" name=\"'+arreglo[0]+'\"></td></tr>');

}


$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRiesgos();
	}
});

function grabarRiesgos(){
	alert("Se grabó");
}