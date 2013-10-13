var rootURL = "../../api/";
var codProyecto='1';
var idProyecto=obtenerIdProyecto();

var arregloIndicadores= new Array(
									1,2,3,4,5,6,7
								);
																





																
obtenProyecto();
$(function(){
  $("#fechaVisualizar").datepicker({ dateFormat: 'dd-mm-yy' });
});

$("#fechaVisualizar").change(function (){
	
	fecha=$("#fechaVisualizar").val();
	//alert(fecha.substr(0,2)+" "+fecha.substr(3,2)+" "+fecha.substr(6,4));
	
	if (fecha!=null && fecha!="")
		obtenIndicadores(fecha.substr(0,2),fecha.substr(3,2),fecha.substr(6,4));
	else
	alert("Ingrese una fecha válida");
	
});

$("#btnGrabar").click(function (){
	
	grabarIndicadores();
});





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
		year: new Number(anio),
		month: new Number(mes),
		day: new Number(dia)
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
	if (data!=null){
		proy=data;
		agregaDatosProyecto( proy.nombre);
	}
}


function agregaDatosProyecto(nombreProyecto){
	$("#nombreProyecto").html(nombreProyecto);
		
}

function agregaDatosIndicadores(arreglo){
	if (arreglo!=null){
		indicadores=arreglo.lista;
		
		agregaIndicador("VP", indicadores[0].valor, 0, 0);
		agregaIndicador("VA", indicadores[2].valor, 0, 0);
		agregaIndicador("VG", indicadores[1].valor, 0, 0);
		agregaIndicador("DC", indicadores[3].valor, 0, 0);
		agregaIndicador("CPI",indicadores[4].valor, 1, 1);
		agregaIndicador("SPI",indicadores[5].valor, 1, 1);
		agregaIndicador("SV", indicadores[6].valor, 0, 0);
		
		agregaIndicador("BAC", indicadores[7].valor, 0, 0);
		agregaIndicador("EAC", indicadores[8].valor, 0, 0);
		agregaIndicador("ETC", indicadores[9].valor, 0, 0);
		agregaIndicador("VAC", indicadores[10].valor, 0, 0);
		agregaIndicador("TCPI", indicadores[11].valor, 0, 0);
		
	}

}

function agregaIndicador(indicador, val, comparaNegativo, comparaPositivo){
	
	var valNF= new Number(val);
	var valor=valNF.toFixed(3);
	color="";
	if (!(comparaNegativo==0 && comparaPositivo==0))
		if (valor<comparaNegativo)
		
			color="R";
			
		else
			if (valor>comparaPositivo)		
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

function grabarIndicadores(){
	
	fecha=$("#fechaVisualizar").val();
	if (fecha!=null && fecha!=""){
		dia=fecha.substr(0,2); 
		mes=fecha.substr(3,2); 
		anio=fecha.substr(6,4);
		
	}else{
		alert("Ingrese una fecha válida");
		return;
	}
	
	var obj ={
		idProyecto : idProyecto,
		year: new Number(anio),
		month: new Number(mes),
		day: new Number(dia),
		PV: obtenerValorIndicador('VP'),
		EV: obtenerValorIndicador('VG'),
		AC: obtenerValorIndicador('VA'),
		CV: obtenerValorIndicador('DC'),
		CPI:obtenerValorIndicador('CPI'),
		SPI:obtenerValorIndicador('SPI'),
		SV: obtenerValorIndicador('SV'),
		BAC: obtenerValorIndicador('BAC'),
		EAC: obtenerValorIndicador('EAC'),
		ETC: obtenerValorIndicador('ETC'),
		VAC: obtenerValorIndicador('VAC'),
		TCPI: obtenerValorIndicador('TCPI')		
	}
	
	
	/*
	
	agregaIndicador("VP", indicadores.PV, 0, 1);
	agregaIndicador("VA", indicadores.AC, 0, 1);
	agregaIndicador("VG", indicadores.EV, 0, 1);
	agregaIndicador("DC", indicadores.CV, 0, 1);
	agregaIndicador("CPI", indicadores.CPI, 6, 7);
	agregaIndicador("SPI", indicadores.SPI, 2, 10);
	agregaIndicador("SV", indicadores.SV, 3, 4);
	
	
	*/
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_enviarIndicadores/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data,B){if (data.codRespuesta!='0') alert(data.mensaje);else alert('Se grabo exitosamente');}
	});
}

function obtenerValorIndicador(indicador){

	
	inp="#input" + indicador;
	return $(inp).val();
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