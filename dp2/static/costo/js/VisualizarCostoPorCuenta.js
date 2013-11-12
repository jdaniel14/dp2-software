var rootURL = "../../api/";
var codProyecto='1';
var idUsuario=obtenerIdUsuario();
var idProyecto = obtenerIdProyecto();//localStorage.idProyecto;
iniciaProyecto();		
iniciaPaquetes();

//Funciones para obtener datos de AJAX


function obtenPaquetes(){
	
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaCuentasDesglozable/'+JSON.stringify(obj),
		dataType: "json",
		async: true,
		success:creaDesplegable	

	});	
	
	//return arregloProyecto;

}

function obtenProyecto(){
	
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerInfoProyecto/'+JSON.stringify(obj),
		dataType: "json",
		async: true,
		success:agregarDataProyecto	

	});	
	
	//return arregloProyecto;

}

//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaPaquetes(){
	//limpiaTablaCuentaxActividad();
	obtenPaquetes();
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
				'Costo subtotal:'+ paquete.costoTotalCuenta + ' ' + 'SOLES';
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
	//agregaDatosProyecto( proyecto[0] , proyecto[1], proyecto[2] );

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