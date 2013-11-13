var rootURL = "../../api/";
var codProyecto='1';
var idProyecto=obtenerIdProyecto();
var idUsuario=obtenerIdUsuario();
var numRecursos= 0;
var comboMoneda='';
var comboUnidadMedida='';

var arregloProyecto= new Array(
							'Proyecto de Charlitox', '566', '1.5'
								);

var arregloRecursos= new Array(
							new Array('1','Unidad','Ladrillo', '2','Soles','85','4','1'),
							new Array('2','Unidad','Bote de pintura', '8','Soles','12','4','1'),
							new Array('3','Litro','Cemento', '','Dolar','10','1','2'),
							new Array('4','Kilo','Fierro', '10','Dolar','30','2','2')
								);

var arregloUnidadMedida= new Array(
							new Array(
							new Array('1', 'Litro'),
							new Array('2', 'Kilo'),
							new Array('3', 'Horas Hombre'),
							new Array('4', 'Unidad')
							)
							);

var arregloRecursosHumanos= new Array(
									'Actividad 1','106','Soles',new Array(
									new Array('Unidad','Ladrillo', '2','Soles', '5'),
									new Array('Unidad','Bote de pintura', '8','Soles','12')
									)
								);

var arregloMoneda= new Array(
									new Array(
									new Array('1','Sol', '1'),
									new Array('2','Dolar','2.8'),
									new Array('3','Euro', '4')
									)
								);
								
								
iniciaProyecto();		
obtenCostosIndirectos(0);

//Funciones para obtener datos de AJAX


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
	
	
	//agregarDataProyecto	(arregloProyecto);
	
	//return arregloProyecto;

}
/*aca temrmina*/
function obtenCostosIndirectos(/*idProyecto,*/tipo){
	var obj ={
		idProyecto : idProyecto,
		idUsuario  : idUsuario
	}
	
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerCostosIndirectosEstimadosMes/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data){agregaDataFila(data,tipo);}
	});
	
	
	
	//agregaDataFila(arregloRecursos,tipo);
	
	//return arregloRecursos;

}

function obtenMoneda(){
		
	
	$.ajax({
		type: 'GET',		
		url: rootURL + 'CO_obtenerListaMonedas/',
		dataType: "json", // data type of response
		async: false,
		success: creaComboMoneda
	});

}


//Fin funciones para obtener datos de AJAX

//Funciones para pasar los datos de ajax

function iniciaRecursos(tipo){
	limpiatablaIndirectos(tipo);	
	arreglo= obtenRecursos(tipo);

}


function agregaDataFila(data, tipo){
	if (data!=null){
		arreglo=data.listaCostosIndirectos;
		for (i=0; i<arreglo.length;i++){
			fila=arreglo[i];
			//tipo,i,costoIndirecto,idmoneda, nombreMoneda,codmes, nombreMes
			nombreMes=obtenNombreMes(fila.codMes);
			agregaFilaconRecursos(tipo,i,fila.costoIndirecto,fila.idMoneda,'Soles',fila.codMes, nombreMes);
			numRecursos=i;
		}
	}
}

function obtenNombreMes(codmes){
	
	mes= codmes.substring(4);
	nombre="";
	switch(mes)
	{
	case '01':
	  nombre="Enero";
	  break;
	case '02':
	  nombre="Febrero";
	  break;
	case '03':
	  nombre="Marzo";
	  break;
	case '04':
	  nombre="Abril";
	  break;
	case '05':
	  nombre="Mayo";
	  break;
	case '06':
	  nombre="Junio";
	  break;
	case '07':
	  nombre="Julio";
	  break;
	case '08':
	  nombre="Agosto";
	  break;
	case '09':
	  nombre="Septiembre";
	  break;	
	case '10':
	  nombre="Octubre";
	  break;
	case '11':
	  nombre="Noviembre";
	  break;
	case '12':
	  nombre="Diciembre";
	  break;	  	  
	default:
	  nombre='mes';
	}
	
	nombre= nombre + '-' + codmes.substring(0,4);
	
	return nombre;

}


function iniciaProyecto(){
			
	obtenProyecto();

}

function agregarDataProyecto(data){
	if (data!=null){
		proy=data;
		agregaDatosProyecto( proy.nombre);
		verificaEditable(proy.indicadorCerrado, proy.indicadorLineaBase);
	}
}


function agregaDatosProyecto(nombreProyecto){
	$("#nombreProyecto").html(nombreProyecto);
		
}

function agregaFilaconRecursos(tipo,i,costoIndirecto,idmoneda, nombreMoneda,codmes, nombreMes){
	a=i;
	a++;
	if 	(tipo==0)
		$("#tablaIndirectos").append('<tr><td align="center">'+nombreMes+'</td><td align="center">'+costoIndirecto+'</td><td align="center">'+nombreMoneda+'</td></tr>');
	else{
		inputMoneda= creaInputMoneda(a);		
		inputCostoIndirecto='<input id="costoIndirecto'+a+'" class="form-control" name="costoIndirecto'+a+'" value="'+costoIndirecto+'">';
	
		
		$("#tablaIndirectos").append('<tr><td align="center">'+nombreMes+'</td><td align="center">'+inputCostoIndirecto+'</td><td align="center">'+inputMoneda+'</td></tr>'
									+'<input type="hidden" name="codmes'+a+'" id="codmes'+a+'" value="'+codmes+'">'
									);
		obtenMonedaSeleccionada(a,idmoneda);
	}
	$("#numFilas").val(a);
}


function creaComboMoneda(data){
	if (data!=null){
		comboMoneda='';
		arreglo=data.lista;
		
		for (i=0; i<arreglo.length;i++){
			moneda=arreglo[i];
			agregaOpcionMoneda(moneda.idMoneda, moneda.nombre);
			
		}		
	}
}


function creaComboUnidadMedida(data){
	if (data!=null){
		comboUnidadMedida='';
		arreglo=data.lista;
		
		for (i=0; i<arreglo.length;i++){
			unidad=arreglo[i];
			agregaOpcionUnidadMedida(unidad.idUM, unidad.descripcion);
			
		}

	}
}


//Fin funciones para pasar los datos de ajax

//Funcion para agregar una opcion de moneda

function agregaOpcionMoneda(idMoneda, nombre){

	comboMoneda+='<option value="'+idMoneda+'">'+nombre+'</option>';
	

}

function creaInputMoneda(num, deshabilitado){
	
	if (deshabilitado=='1')
		combo='<select id="comboMoneda'+num+'"  readOnly disabled >'+ comboMoneda + '</select>';
	else
		combo='<select id="comboMoneda'+num+'" >'+ comboMoneda + '</select>';
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

	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRecursos();
	}
});

function grabarRecursos(){
	var costosGrabar=new Array();
		
	num=$("#numFilas").val();
	
	for (i=1; i<=num;i++){
		codM= "#codmes"+i;
		costoI= "#costoIndirecto"+i;
		comboM= "#comboMoneda"+i;
				
		codmes=$(codM).val();
		costo=$(costoI).val();
		moneda=$(comboM).val();
		
		if (costo!='' && !isNaN(costo) && new Number(costo)>=0){
		
			var costoIndirecto={
				codmes: codmes,
				costoIndirecto: costo,
				idMoneda: moneda
			}
	
			costosGrabar.push(costoIndirecto);
			
		}else{
		
			alert('Los costos indirecos ingresados deben ser un número mayor igual a 0');
			return;
		}
	}
	
	var obj={
				idProyecto: idProyecto,
				idUsuario: idUsuario,
				listaCostosIndirectos: costosGrabar
			}
	
	enviaDatos(obj);
}

function enviaDatos(obj){

	$.ajax({
		type: 'POST',
		url: rootURL + 'CO_enviarCostosIndirectosEstimadosMes',
		data: JSON.stringify(obj),		
		dataType: "json", 
		async: true,
		success:function(data,B){if (data.codRespuesta!='0') alert(data.mensaje);else cambiaConsultar();}
	});

}


//Fin funciones para grabar

//Funciones para el uso del sidebar

function cambiaEditar(){
	$("#btnEditar").hide();
	$("#btnGrabar").show();
	$("#btnCancelar").show();	
	obtenMoneda();
	limpiatablaIndirectos();
	obtenCostosIndirectos(1);	
	
}


function cambiaConsultar(){
	
	$("#btnEditar").show();
	$("#btnGrabar").hide();
	$("#btnCancelar").hide();
	limpiatablaIndirectos();	
	 obtenCostosIndirectos(0);	

}

//Fin de funciones para el uso del sidebar

//Funcion para saber si se edita o no

function verificaEditable(indicadorCerrado, indicadorLineaBase){

	if (indicadorCerrado=="1" || indicadorLineaBase=="1"){
	
		$("#btnEditar").hide();
		$("#btnGrabar").hide();
	}
}

//Limpia la tabla

function limpiatablaIndirectos(){
	$("#tablaIndirectos").html('');
	
	$("#tablaIndirectos").append('<tr width="100%"><td width="40%" align="center"><b>Mes</b></td><td width="35%" align="center"><b>Costo Indirecto</b></td><td width="25%" align="center"><b>Moneda</b></td></tr>');
}


$("#btnEditar").click(function(){
	cambiaEditar();
});

$("#btnCancelar").click(function(){
	cambiaConsultar();
});

function obtenerIdProyecto(){

	//localStorage.setItem('idProyecto','1');
	id= localStorage.idProyecto;
	
	if (id==null){ 
		alert ("El id es null");
		id=1;
	}
	
	return id;

}

