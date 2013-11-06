var rootURL = "../../api/";
var codProyecto='1';
var idProyecto = obtenerIdProyecto();//localStorage.idProyecto;
var nAct = 0;
var asientosContables = [];

iniciaProyecto();	
obtenAsientosContables()	


//Funciones para obtener datos de AJAX

function obtenAsientosContables(){
	var obj ={
		idProyecto : idProyecto
	}
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerAsientosContables',		
		dataType: "json", // data type of response
		async: true,
		success:crearArregloAsientosContables	
	});
	
}
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
function crearArregloAsientosContables(data){
	asientosContables = data.lista;
	iniciaCuentaxActividad();
}

function agregaDataFila(data){
	var totalCuenta = 0;
	if (data!=null){
		var arreglo = data.lista;
		nAct = arreglo.length;
		for (i=0; i<arreglo.length;i++){
			var filaAct=arreglo[i];
			agregaFilaCuentaActividad(i,filaAct.nombre,filaAct.costoSubtotal,filaAct.tipoCuenta,"Soles",filaAct.idActividad);
			totalCuenta += filaAct.costoSubtotal*1;
		}
		$("#totalCuentas").html(totalCuenta + "");
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

function agregaFilaCuentaActividad(i, nombreAct, costoUnitario,idAsiento, moneda,idAct){
	a=i;
	a++;
	var options ="";
	cuenta='';
	for (var k = 0; k < asientosContables.length; k++){
		options += '<option value='+asientosContables[k].id+''+(idAsiento==asientosContables[k].descripcion?' selected ':'')+'>'+asientosContables[k].descripcion+'</option>';		
		if (idAsiento==asientosContables[k].descripcion) cuenta= asientosContables[k].id;
	}
	input= '<input type=hidden name="idActividad'+(a)+'" id="idActividad'+(a)+'" value='+idAct+'><select class="form-control" id="tipoCuenta'+(a)+'">'+options+'</select>';
	$("#tablaCuentaxActividad").append('<tr><td>'+a+'</td><td>'+nombreAct+'</td><td>'+input+'</td><td>'+costoUnitario+' '+moneda+'</td></tr>');
	obtenCuentaSeleccionada(a,cuenta)
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
		success:function(data,B){if (data.codRespuesta!='0') alert(data.mensaje);else alert("Exito");}
	});
}

function grabarEstadoCuenta(){
	var listaActividades = [];
	for (var i = 0; i < nAct; i++){		
		var actividad ={idActividad:0,tipo:0}
		var a = i+1;
		var idAct = document.getElementById("idActividad"+a).value;
		var tipoCuenta = document.getElementById("tipoCuenta"+a).options[document.getElementById("tipoCuenta"+a).selectedIndex].value;
		actividad.idActividad = idAct;
		actividad.tipo = tipoCuenta;
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


function obtenCuentaSeleccionada(a,cuenta){

	idSelect='#tipoCuenta'+a;
	if (cuenta!='' && cuenta!=null){
		$(idSelect).val(cuenta);
		var indiceDatos = $(idSelect)[0].selectedIndex;
		if (indiceDatos!=null && indiceDatos!='')
			$(idSelect)[0].options[indiceDatos].setAttribute('selected','selected');
	}else{
		if ($(idSelect)[0].options.length>0){
			$(idSelect)[0].options[0].setAttribute('selected','selected');
		}
	
	}

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