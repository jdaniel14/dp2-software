var rootURL = "../../api/";
var codProyecto='1';
var idProyecto=1;

var arregloIndicadores= new Array(
									1,2,3,4,5,6,7
								);
																





																
obtenProyecto();

$("#fechaVisualizar").change(function (){
	
	fecha=$("#fechaVisualizar").val();
	if (fecha!=null && fecha!="")
		obtenIndicadores(fecha.substr(8,2),fecha.substr(5,2),fecha.substr(0,4));
	else
	alert("Ingrese una fecha válida");

});
/*
$("#btnVisualizar").click(function (){
	
	fecha=$("#fechaVisualizar").val();
	if (fecha!=null && fecha!="")
		obtenIndicadores(fecha.substr(8,2),fecha.substr(5,2),fecha.substr(0,4));
	else
	alert("Ingrese una fecha válida");
})*/





//Funciones para obtener datos de AJAX


function obtenProyecto(/*idProyecto*/){
	
	var obj ={
		idProyecto : idProyecto
	}
	
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerInfoProyecto/'+JSON.stringify(obj),
		dataType: "json",
		async: true,
		success:agregarDataProyecto	

	});		
	
	
	//agregarDataProyecto	(arregloProyecto);
	
	//return arregloProyecto;

}
/*aca temrmina*/
function obtenIndicadores(/*idProyecto,*/dia, mes , anio){
	//alert(dia+" "+mes+" "+anio);
	var obj ={
		idProyecto : idProyecto,
		year: anio,
		month: mes,
		day: dia
	}
	
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerIndicadores/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:agregaDatosIndicadores
	});
	
	
	
	
	//agregaDatosIndicadores(arregloIndicadores);
	//return arregloRecursos;

}


function agregarDataProyecto(data){
	proy=data;
	agregaDatosProyecto( proy.nombre);
}


function agregaDatosProyecto(nombreProyecto){
	$("#nombreProyecto").html(nombreProyecto);
		
}

function agregaDatosIndicadores(arreglo){

	indicadores=arreglo;
	
	agregaIndicador("VP", indicadores.PV, 0, 1);
	agregaIndicador("VA", indicadores.AC, 0, 1);
	agregaIndicador("VG", indicadores.EV, 0, 1);
	agregaIndicador("DC", indicadores.CV, 0, 1);
	agregaIndicador("CPI", indicadores.CPI, 6, 7);
	agregaIndicador("SPI", indicadores.SPI, 2, 10);
	agregaIndicador("SV", indicadores.SV, 3, 4);

}

function agregaIndicador(indicador, valor, comparaNegativo, comparaPositivo){

	color="";

	if (valor<=comparaNegativo)
	
		color="R";
		
	else
		if (valor>=comparaPositivo)		
			color="V";			
		else
			color="A";			
	
	div="#div" + indicador;
	lab="#lab" + indicador;
	inp="#input" + indicador;
	
	$(inp).val(valor);
	
	if (color=="V"){

		$(div).attr("class","form-group has-success");
		//$(lab).html("Correcto");
		
	
	}else{
	
		if (color=="A"){
		
			$(div).attr("class","form-group has-warning");
			//$(lab).html("Cuidado");
		
		}else{
		
			if (color=="R"){
			
				$(div).attr("class","form-group has-error");
				//$(lab).html("El valor del indicador es negativo");
				
			}
		
		}
	
	}

}