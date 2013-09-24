var rootURL = "../../api/";
var codProyecto='1';
var idProyecto=1;
var numRecursos= 0;

var arregloProyecto= new Array(
							'Proyecto de Charlitox', '566', '1.5'
								);

var arregloRecursos= new Array(
							new Array('1','Unidad','Ladrillo', '2','Soles','85'),
							new Array('2','Unidad','Bote de pintura', '8','Soles','12'),
							new Array('3','Litro','Cemento', '','Soles','10'),
							new Array('4','Kilo','Fierro', '10','Soles','30')
								);

var arregloUnidadMedida= new Array(

							new Array('1', 'Litro'),
							new Array('2', 'Kilo'),
							new Array('3', 'Horas Hombre')
							);

var arregloRecursosHumanos= new Array(
									'Actividad 1','106','Soles',new Array(
									new Array('Unidad','Ladrillo', '2','Soles', '5'),
									new Array('Unidad','Bote de pintura', '8','Soles','12')
									)
								);

iniciaProyecto();		
iniciaRecursos(0);


//Funciones para obtener datos de AJAX


function obtenProyecto(/*idProyecto*/){
	
	var obj ={
		idProyecto : idProyecto
	}
	
	/*
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerInfoProyecto/'+JSON.stringify(obj),
		dataType: "json",
		async: true,
		success:agregarDataProyecto	

	});		
	*/
	
	agregarDataProyecto	(arregloProyecto);
	
	//return arregloProyecto;

}
/*aca temrmina*/
function obtenRecursos(/*idProyecto,*/tipo){
	var obj ={
		idProyecto : idProyecto
	}
	
	/*
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaRecursos/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data){agregaDataFila(data,tipo);}
	});
	
	*/
	
	agregaDataFila(arregloRecursos,tipo);
	
	//return arregloRecursos;

}

//<span class="glyphicon glyphicon-plus-sign"></span>

//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaRecursos(tipo){
	limpiaTablaRecursos(tipo);	
	arreglo= obtenRecursos(/*idProyecto,*/tipo);
	//agregaDataFila( arreglo, 0);

}


function agregaDataFila(data, tipo){
	arreglo=data;
	for (i=0; i<arreglo.length;i++){
		filaRecurso=arreglo[i];
		agregaFilaActividadRecursos(tipo,i,filaRecurso[0],filaRecurso[2],filaRecurso[1], 'Recurso Material');
		numRecursos=i;
	}
}

function iniciaProyecto(){
			
	obtenProyecto(/*idProyecto*/);
	//var proy = JSON.parse(proyecto);
	//agregaDatosProyecto( proy.nombre ,proy.presupuestoTotal ,proy.porcentajeReserva);

}

function agregarDataProyecto(data){
	proy=data;
	agregaDatosProyecto( /*proy.nombre*/ proy[0]);
}


function agregaDatosProyecto(nombreProyecto){
	$("#nombreProyecto").html(nombreProyecto);
		
}

function agregaFilaActividadRecursos(tipo,i,idRecurso, nombreRecurso,unidadMedida,tipoRecurso){
	a=i;
	a++;
	if 	(tipo==0)
		$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+nombreRecurso+'</td><td>'+tipoRecurso+'</td>'+'</td><td>'+unidadMedida+'</td></tr>');
	else{
		inputRecurso= '<input id="recurso'+a+'" class="form-control" name="recurso'+a+'" value="'+nombreRecurso+'">';
		check= '<input type="checkBox" name="eliminar'+a+'">';
		$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+inputRecurso+'</td><td>'+tipoRecurso+'</td>'+'</td><td>'+unidadMedida+'</td><td align="center">'+check+'</td></tr>');
	
	}
}

function creaComboMoneda(data){
	HashTipoCambio= {};
	comboMoneda='';
	arreglo=data[0];
	
	for (i=0; i<arreglo.length;i++){
		moneda=arreglo[i];
		agregaOpcion(moneda[0], moneda[1], moneda[2]);
		
	}		
	
}

//Fin funciones para pasar los datos de ajax

//Funcion para agregar una opcion de moneda

function agregaOpcion(idMoneda, nombre, tipoCambio){

	comboMoneda+='<option value="'+idMoneda+'">'+nombre+'</option>';
	HashTipoCambio[idMoneda]= tipoCambio;

}



//Funcion para ingresar un recurso en los resumenes de actividades



function creaInputMoneda(num){

	combo='<select id="comboMoneda'+num+'" onChange="actualizaCostos();" >'+ comboMoneda + '</select>';
	return combo;
	
}

//Desabilita el input moneda

function desabilitaMoneda(a){
	
	idSelect='#comboMoneda'+a;
	$(idSelect).attr('disabled', 'disabled');
}

//obtener la seleccionada moneda

function obtenMonedaSeleccionada(a,moneda){

	idSelect='#comboMoneda'+a;
	if (moneda!='' && moneda!=null){
	
		
		$(idSelect).val(moneda);
		var indiceDatos = $(idSelect)[0].selectedIndex;
		if (indiceDatos!=null && indiceDatos!='')
			$(idSelect)[0].options[indiceDatos].setAttribute('selected','selected');
	}else{
		if ($(idSelect)[0].options.length>0){
			$(idSelect)[0].options[0].setAttribute('selected','selected');
		}
	
	}

}

//Funciones para grabar

$("#btnGrabar").click(function(){

	/*
		VERIFICAR LA NUMEROSIDAD DE LOS COSTOS UNITARIOS
	
	
	*/




	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRecursos();
	}
});

function grabarRecursos(){
	var idRecursos=new Array();
	var costoRecursos=new Array();
	var idmonedas=new Array();
	porcentajeReserva=0;
	
	num=numRecursos;
	num++;
	for (i=1; i<=num;i++){
	
		idRecursos.push(document.getElementById("idRecurso"+i).value);
		costoRecursos.push(document.getElementById("costoUnitario"+i).value);
		idmonedas.push(document.getElementById("comboMoneda"+i).options[document.getElementById("comboMoneda"+i).selectedIndex].value);
	
	}
	porcentajeReserva=document.getElementById("inputReserva").value;
	
	
	var obj={
		idProyecto: idProyecto,
		listaRecursos: idRecursos,
		listaCUR: costoRecursos,
		porcReserva: idmonedas
		
		
	}
	/*
	$.ajax({
		type: 'POST',
		url: rootURL + 'CO_enviarCURecursos/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data){if (data!=null) alert("se grabó");}
	});
	*/
	alert("se grabó");
	
	//CO_enviarCURecursos
	
}



//Fin funciones para grabar

//Funciones para el uso del sidebar

function cambiaEditar(){
	$("#btnEditar").hide();
	$("#btnGrabar").show();
	$("#btnCancelar").show();
	 iniciaRecursos(1);	
}

function cambiaConsultar(){
	
	$("#btnEditar").show();
	$("#btnGrabar").hide();
	$("#btnCancelar").hide();
	 iniciaRecursos(0);	

}

//Fin de funciones para el uso del sidebar


//Limpia la tabla

function limpiaTablaRecursos(esEdicion){
	$("#tablaRecursos").html('');
	
	if (esEdicion==0)
		$("#tablaRecursos").append('<tr><td width="10%"><b>#</b></td><td width="40%"><b>Recurso</b></td><td width="20%"><b>Tipo</b></td><td width="30%"><b>Unidad de Medida</b></td></tr>');
	else
		$("#tablaRecursos").append('<tr><td width="10%"><b>#</b></td><td width="40%"><b>Recurso</b></td><td width="20%"><b>Tipo</b></td><td width="25%"><b>Unidad de Medida</b></td><td width="25%"><b>Eliminar</b></td></tr>');
}


$("#btnEditar").click(function(){
	cambiaEditar();
});

$("#btnCancelar").click(function(){
	cambiaConsultar();
});
