var rootURL = "../../backend/presupuesto/obtenerArregloRecursos";
var codProyecto='1';


iniciaProyecto();		
creaDesplegable();


//Funciones para obtener datos de AJAX


function obtenPaquetes(/*idProyecto*/){
	
	/*$.ajax({
		type: 'GET',
		url: rootURL,
		data: 'idProyecto=' + idProyecto,
		dataType: "json", // data type of response
		success: anadeDataFila		
	});
	*/
	return arregloPaquetes;

}

function obtenProyecto(/*idProyecto*/){
	
	/*$.ajax({
		type: 'GET',
		url: rootURL,
		data: 'idProyecto=' + idProyecto,
		dataType: "json", // data type of response
		success: anadeDataFila		
	});
	*/
	
	return arregloProyecto;

}

//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaCuentaxActividad(){
	limpiaTablaCuentaxActividad();
	arreglo= obtenPaquetes(/*idProyecto*/);
	creaDesplegable( arreglo );

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
				'Costo subtotal:'+ paquete.subtotal + ' ';
	if (paquete.hijos != null)
		for (int i = 0;i<paquete.hijos.lenght;i++)
			cadenaHTML += obtieneHTMLHijoNodo(paquete,nombrePropio,i)
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
			
	proyecto= obtenProyecto(/*idProyecto*/);
	agregaDatosProyecto( proyecto[0] , proyecto[1], proyecto[2] );

}

function agregaDatosProyecto(nombreProyecto, montoSinReserva, porcentajeReserva){
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
