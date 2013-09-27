var rootURL = "../../api/";
var codProyecto='1';
var idProyecto = localStorage.idProyecto;
var nAct = 0;

iniciaProyecto();		
iniciaCuentaxActividad();


//Funciones para obtener datos de AJAX


function obtenActividades(){
	var obj ={
		idProyecto : idProyecto
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaActividades/' + JSON.stringify(obj) ,		
		dataType: "json", // data type of response
		async: true,
		success:agregaDataFila	
	});
	
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
	
	//return arregloProyecto;


}

//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaCuentaxActividad(){
	limpiaTablaCuentaxActividad();
	obtenActividades(/*idProyecto*/);
	//agregaDataFila( arreglo, 0 );

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

function agregaDataFila(data){
	var arreglo = data.lista;
	nAct = arreglo.length;
	for (i=0; i<arreglo.length;i++){
		var filaAct=arreglo[i];
		agregaFilaCuentaActividad(i,filaAct.nombre,filaAct.costoSubtotal,"Soles");
	}
}

function iniciaProyecto(){
			
	obtenProyecto();
	//agregaDatosProyecto( proyecto[0] , proyecto[1], proyecto[2] );

}

function agregaDatosProyecto(nombreProyecto, montoSinReserva, porcentajeReserva){
	$("#nombreProyecto").html(nombreProyecto);
	$("#inputMontoSinReserva").val(montoSinReserva);
	$("#inputReserva").val(porcentajeReserva);
	$("#reservaTotal").val(porcentajeReserva*0.01*montoSinReserva);
	$("#inputMontoConReserva").val(montoSinReserva*1 + porcentajeReserva*0.01*montoSinReserva);
}

//Fin funciones para pasar los datos de ajax

//Funcion para ingresar una fila de actividad en la tabla cuentaxacticidad en los resumenes de actividades

function agregaFilaCuentaActividad(i, nombreAct, costoUnitario, moneda){
	a=i;
	a++;
	input= '<input type=hidden name="idActividad'+(a)+'" id="idActividad'+(a)+'"><select id="tipoCuenta'+(a)+'"><option>Equipo</option><option>Maquinaria</option><option>Mano de obra</option><option>Capital</option></select>';
	$("#tablaCuentaxActividad").append('<tr><td>'+a+'</td><td>'+nombreAct+'</td><td>'+input+'</td><td>'+costoUnitario+' '+moneda+'</td></tr>');
}

//Funciones para grabar

$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarEstadoCuenta();
	}
});

function enviaDatos(obj){


	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_enviarTipoCuenta/'+JSON.stringify(obj),		
		dataType: "json", 
		async: true,
		success:function(data,B){if (data.codRespuesta!='0') alert(data.mensaje);}
	});
}

function grabarEstadoCuenta(){
	var listaActividades = [];
	for (var i = 0; i < nAct; i++){		
		var actividad ={idActividad:0,tipo:0}
		var a = i+1;
		var idAct = document.getElementById("idActividad"+a).value;
		var tipoCuenta = document.getElementById("tipoCuenta"+a).options[document.getElementById("tipoCuenta"+a).selectedIndex];
		actividad.idActividad = idAct;
		actividad.tipoCuenta = tipoCuenta;
		listaActividades.push(actividad);
	}
	var obj = {
		idProyecto: idProyecto,
		listaActividades : listaActividades
	}
	enviaDatos(obj);
}
//Fin funciones para grabar

function limpiaTablaCuentaxActividad(){
	$("#tablaCuentaxActividad").html('');
	$("#tablaCuentaxActividad").append('<tr><td width="10%"><b>#</b></td><td width="40%"><b>Actividad</b></td><td width="20%"><b>Tipo cuenta</b></td><td width="30%"><b>Costo subtotal</b></td></tr>');
			

}