var rootURL = "../../api/";
var codProyecto='1';
var idProyecto=1;
iniciaProyecto();		
creaDesplegable();


//Funciones para obtener datos de AJAX


function obtenPaquetes(){
	
	var obj ={
		idProyecto : idProyecto
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_getListaPaquetes/'+JSON.stringify(obj),
		dataType: "json",
		async: true,
		success:creaDesplegable	

	});	
	
	return arregloProyecto;

}

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
	
	return arregloProyecto;

}

//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaCuentaxActividad(){
	limpiaTablaCuentaxActividad();
	arreglo= obtenPaquetes();
	//creaDesplegable( arreglo );

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
				'Costo subtotal:'+ paquete.sumaCostosPaquetesHijo + ' ';
	if (paquete.listaPaquetesHijo != null)
		for (var i = 0;i<paquete.listaPaquetesHijo.lenght;i++)
			cadenaHTML += obtieneHTMLHijoNodo(paquete.listaPaquetesHijo[i],nombrePropio,i)
	cadenaHTML += '</div>'+'</div>'+'</div>';
	return cadenaHTML;
}
function insertaHijoAcordeon(paquete,nombrePadre,numeroHijo){
	$("#nodoPaquete").append(obtieneHTMLHijoNodo(paquete,nombrePadre,numeroHijo));
}
function creaDesplegable(paquetes){
	var nombrePadre='nodoPaquete';
	$("#nodoPaquete").html('');
	for (var i=0;i<paquetes.lenght;i++){
		insertaHijoAcordeon(paquetes[i],nombrePadre,i);
	}
}

function iniciaProyecto(){
			
	proyecto= obtenProyecto();
	//agregaDatosProyecto( proyecto[0] , proyecto[1], proyecto[2] );

}

function agregarDataProyecto(proyecto){
	var nombreProyecto = proyecto.nombre;
	var montoSinReserva = proyecto.presupuestoTotal;
	var porcentajeReserva = proyecto.porcentajeReserva;
	$("#nombreProyecto").html(nombreProyecto);
	$("#inputMontoSinReserva").val(montoSinReserva);
	$("#inputReserva").val(porcentajeReserva);
	$("#reservaTotal").val(porcentajeReserva*0.01*montoSinReserva);
	$("#inputMontoConReserva").val(montoSinReserva*1 + porcentajeReserva*0.01*montoSinReserva);
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
