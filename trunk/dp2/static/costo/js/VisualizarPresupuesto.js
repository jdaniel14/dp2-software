var rootURL = "../../api/";
var codProyecto='1';
var idProyecto = obtenerIdProyecto();//localStorage.idProyecto;
iniciaProyecto();		
iniciaPaquetes();
obtenRecursos();

//Funciones para obtener datos de AJAX


function obtenPaquetes(){
	
	var obj ={
		idProyecto : idProyecto
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaPaquetes/'+JSON.stringify(obj),
		dataType: "json",
		async: true,
		success:creaDesplegable	

	});	
	
	//return arregloProyecto;

}

function obtenProyecto(){
	
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
}
function obtenRecursos(){
	var obj ={
		idProyecto : idProyecto
	}
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerCostoFijoRealProyecto/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data){agregaDataFila(data);}
	});
}

//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax
function agregaDataFila(data){
	if (data!=null){
		arreglo=data.lista;
		for (i=0; i<arreglo.length;i++){
			filaRecurso=arreglo[i];
			if (filaRecurso.costoFijoTotal*1 == 0) continue;
			agregaFilaconRecursos(i,filaRecurso.costoFijoTotal,filaRecurso.descripcion,filaRecurso.unidadMedida,filaRecurso.costoUnitario, filaRecurso.moneda, filaRecurso.costoFijoDiario,filaRecurso.fechaInicio,filaRecurso.fechaFin);
			numRecursos=i;
		}
	}
}


function agregaFilaconRecursos(i,costoFijoTotal,descripcion,unidadMedida,costoUnitario, moneda, costoFijoDiario,fechaInicio,fechaFin){
var newdiv = '<div class="panel panel-default">'+
'	  <div class="panel-heading">'+
'	  <h4 class="panel-title">'+
'	  <a class="accordion-toggle" data-toggle="collapse" data-parent="#padreCostoFijo"+ href="#nodoCostoFijo'+i+'">'+descripcion+'</a> </h4></div>'+
'	  <div id="nodoCostoFijo'+i+'" class="panel-collapse in" style="height: auto;">'+
'	  <div class="panel-body"> '+
'	  <div class="panel panel-default">'+ 'Costo fijo total: '+costoFijoTotal+' ' + moneda+'<br>' + costoFijoDiario + ' ' + moneda +
' diario <br>' + 'Desde: ' + fechaInicio + ' Hasta: ' + fechaFin;
'	  </div>'+
'	  </div>'+
'	  </div>'+
'	  </div>';
var oldHTML = $("#panelNodoCostosFijos").html();
$("#panelNodoCostosFijos").html(oldHTML + newdiv);

}
function iniciaPaquetes(){
	obtenPaquetes();
}
function obtieneHTMLHijoNodo(paquete,nombrePadre,numeroHijo){
	var nombrePropio = nombrePadre+''+numeroHijo;
	var cadenaHTML = '<div class="panel panel-default">'+
			'<div class="panel-heading">'+
			  '<h4 class="panel-title">'+
				'<a class="accordion-toggle" data-toggle="collapse" data-parent="#'+nombrePadre+'" href="#'+nombrePropio+'">'+
				  paquete.nombre+
				'</a>'+
			 ' </h4>'+
			'</div>'+
			'<div id="'+nombrePropio+'" class="panel-collapse collapse">'+
			  '<div class="panel-body">'+
				'Costo subtotal:'+ paquete.costoTotalPaquete + ' SOLES ';
	if (paquete.listaPaquetesHijo != null)
		for (var i = 0;i<paquete.listaPaquetesHijo.length;i++)
			cadenaHTML += obtieneHTMLHijoNodo(paquete.listaPaquetesHijo[i],nombrePropio,i)
	cadenaHTML += '</div>'+'</div>'+'</div>';
	return cadenaHTML;
}
function insertaHijoAcordeon(paquete,nombrePadre,numeroHijo){
	$("#nodoPaquete").append(obtieneHTMLHijoNodo(paquete,nombrePadre,numeroHijo));
}
function creaDesplegable(data){
	if (data!=null){
		var paquetes = data.lista;
		var nombrePadre='nodoPaquete';
		$("#nodoPaquete").html('');
		for (var i=0;i<paquetes.length;i++){
			insertaHijoAcordeon(paquetes[i],nombrePadre,i);
		}
	}
}

function iniciaProyecto(){
			
	proyecto= obtenProyecto();
}

function agregarDataProyecto(proyecto){
	if (proyecto!=null){
		var nombreProyecto = proyecto.nombre;
		var montoSinReserva = proyecto.presupuestoTotal;
		var porcentajeReserva = proyecto.porcentajeReserva;
		$("#nombreProyecto").html(nombreProyecto);
		$("#inputMontoSinReserva").val(montoSinReserva);
		$("#inputReserva").val(porcentajeReserva);
		$("#reservaTotal").val(porcentajeReserva*0.01*montoSinReserva);
		$("#inputMontoConReserva").val(montoSinReserva*1 + porcentajeReserva*0.01*montoSinReserva);
	}
}

//Fin funciones para pasar los datos de ajax
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
function obtenerIdProyecto(){

	//localStorage.setItem('idProyecto','1');
	id= localStorage.idProyecto;
	
	if (id==null){ 
		alert ("El id es null");
		id=1;
	}
	
	return id;

}

