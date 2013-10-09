var rootURL = "../../api/";
var codProyecto='1';
var idProyecto=obtenerIdProyecto();
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
iniciaRecursos(0);


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
function obtenRecursos(/*idProyecto,*/tipo){
	var obj ={
		idProyecto : idProyecto
	}
	
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaRecursos/'+JSON.stringify(obj),		
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
		success: creaComboMoneda
	});
	
	
	//creaComboMoneda(arregloMoneda);

}

function obtenUnidadMedida(){

	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerUnidadesMedidas/',		
		dataType: "json",
		async: true,
		success:creaComboUnidadMedida
	});
	
	
	//creaComboUnidadMedida(arregloUnidadMedida);

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
	if (data!=null){
		arreglo=data.lista;
		for (i=0; i<arreglo.length;i++){
			filaRecurso=arreglo[i];
			//tipo,i,idRecurso, nombreRecurso,NombreUnidadMedida,costoUnitario,tipoRecurso,unidadMedida,idmoneda, nombreMoneda
			agregaFilaconRecursos(tipo,i,filaRecurso.idRecurso,filaRecurso.descripcion,filaRecurso.unidadMedida,filaRecurso.costoUnitario,filaRecurso.idUnidadMedida,filaRecurso.idMoneda, filaRecurso.moneda, 10);
			numRecursos=i;
		}
	}
}

function iniciaProyecto(){
			
	obtenProyecto(/*idProyecto*/);
	//var proy = JSON.parse(proyecto);
	//agregaDatosProyecto( proy.nombre ,proy.presupuestoTotal ,proy.porcentajeReserva);

}

function iniciaUnidadMedida(){


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

function agregaFilaRecurso(){
	
	a=$("#numFilas").val();
	a++;
	
	inputRecurso= '<input id="recurso'+a+'" class="form-control" name="recurso'+a+'" value="" onClick="modifica('+a+')">';
	inputMoneda= creaInputMoneda(a);
	inputUnidadMedida= creaInputUnidadMedida(a);
	inputCosto='<input id="costoUnitario'+a+'" class="form-control" name="recurso'+a+'" value="" onClick="modifica('+a+')">';
	check= '<input type="checkBox" name="eliminar'+a+'" id="eliminar'+a+'">';
	$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+inputRecurso+'</td>'+'</td><td align="center" >'+inputUnidadMedida+'</td><td>'
								+inputCosto+'</td><td align="center" >'+inputMoneda+'</td><td align="center">'+check+'</td></tr>'
								+'<input type="hidden" name="creado'+a+'"  id="creado'+a+'" value="1" >'
								+'<input type="hidden" name="modificado'+a+'"  id="modificado'+a+'" value="0" >'
								);	
	$("#numFilas").val(a);
}


function agregaFilaconRecursos(tipo,i,idRecurso, nombreRecurso,NombreUnidadMedida,costoUnitario,unidadMedida,idmoneda, nombreMoneda, costoFijo){
	a=i;
	a++;
	if 	(tipo==0)
		$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+nombreRecurso+'</td><td>'+NombreUnidadMedida+'</td><td>'+costoUnitario+'</td><td>'+nombreMoneda+'</td><td>'+costoFijo+'</td></tr>');
	else{
		inputRecurso= '<input id="recurso'+a+'" class="form-control" name="recurso'+a+'" value="'+nombreRecurso+'" onClick="modifica('+a+')">';
		inputMoneda= creaInputMoneda(a);
		inputUnidadMedida= creaInputUnidadMedida(a);
		inputCosto='<input id="costoUnitario'+a+'" class="form-control" name="costoUnitario'+a+'" value="'+costoUnitario+'" onClick="modifica('+a+')">';
		inputCostoFijo='<input id="costoFijo'+a+'" class="form-control" name="costoFijo'+a+'" value="'+costoFijo+'" onClick="modifica('+a+')">';
		check= '<input type="checkBox" name="eliminar'+a+'" id="eliminar'+a+'">';
		$("#tablaRecursos").append('<tr><td>'+a+'</td><td>'+inputRecurso+'</td><td align="center" >'+inputUnidadMedida+'</td><td>'
									+inputCosto+'</td><td align="center" >'+inputMoneda+'</td><td align="center" >'+inputCostoFijo+'</td><td align="center">'+check+'</td></tr>'
									+'<input type="hidden" name="creado'+a+'"  id="creado'+a+'" value="0" >'
									+'<input type="hidden" name="modificado'+a+'"  id="modificado'+a+'" value="0" >'
									+'<input type="hidden" name="idRecurso'+a+'"  id="idRecurso'+a+'" value="'+idRecurso+'" >'
									);
		obtenUnidadMedidaSeleccionada(a,unidadMedida);
		obtenMonedaSeleccionada(a,idmoneda);
	}
	$("#numFilas").val(a);
}

function modifica(num){

	select='#modificado'+num;
	
	$(select).val('1');

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

function agregaOpcionUnidadMedida(idUnidad, nombre){

	comboUnidadMedida+='<option value="'+idUnidad+'">'+nombre+'</option>';
	

}



function creaInputMoneda(num){

	combo='<select id="comboMoneda'+num+'" onChange="modifica('+num+')" >'+ comboMoneda + '</select>';
	return combo;
	
}


function creaInputUnidadMedida(num){

	combo='<select id="comboUnidadMedida'+num+'" onChange="modifica('+num+')" >'+ comboUnidadMedida + '</select>';
	return combo;
	
}

//Desabilita el input moneda

function desabilitaMoneda(a){
	
	idSelect='#comboMoneda'+a;
	$(idSelect).attr('disabled', 'disabled');
}

function desabilitaUnidadMoneda(a){
	
	idSelect='#comboUnidadMedida'+a;
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


function obtenUnidadMedidaSeleccionada(a,medida){

	idSelect='#comboUnidadMedida'+a;
	if (medida!='' && medida!=null){
	
		
		$(idSelect).val(medida);
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
	var recursosGrabar=new Array();
	var recursosModificar=new Array();
	var recursosEliminar=new Array();
		
	num=$("#numFilas").val();
	
	for (i=1; i<=num;i++){
		elim="eliminar"+i;
		crea="#creado"+i;
		modif="#modificado"+i;
		recu="#idRecurso"+i;
		cu="#costoUnitario"+i;
		nom="#recurso"+i;
		moned="#comboMoneda"+i;
		med="#comboUnidadMedida"+i;
		eliminar=document.getElementById(elim).checked;
		crear=$(crea).val();
		modificar=$(modif).val();
	
	
		if (eliminar && crear!='1'){
		
			var recurso = {
				
				idRecurso: $(recu).val()
			}
			
			recursosEliminar.push(recurso);
		
		}else{
			if (!eliminar){
				costo=$(cu).val();
				nomRecurso=$(nom).val();
				moneda=$(moned).val();
				medida=$(med).val();
				
				if (nomRecurso==''){
						
					alert('El recurso de la fila ' + i +' debe tener un nombre');
					return;
				}
				
				
				if (costo!='' && !isNaN(costo) && costo>=0){
						
					
				}else{
				
					alert('El costo del recurso ' + nomRecurso +' debe ser un valor númerico mayor o igual que 0');
					return;
				}
			
				if (crear=='1'){

					var recurso = {
					
						nombreRecurso:nomRecurso,
						CostoUnitario: costo,			
						idMoneda: moneda,
						idUnidadMedida:medida
					}
					recursosGrabar.push(recurso);
					
				}else{
				
					if (modificar=='1'){
						var recurso = {
							idRecurso: $(recu).val(),
							nombreRecurso:nomRecurso,
							CostoUnitario: costo,			
							idMoneda: moneda,
							idUnidadMedida:medida
						}
						recursosModificar.push(recurso);
					}
				
				
				}
			}
		}
		
	}
	
		
	var obj={
		idProyecto: idProyecto,
		listaRecursosModificar: recursosModificar,
		listaRecursosCrear: recursosGrabar,
		listaRecursosEliminar: recursosEliminar
		
		
	}
	
	enviaDatos(obj);
	
	
//	alert("se grabó " + obj);
	
	//CO_enviarCURecursos
	
	/*
	
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerListaRecursos/'+JSON.stringify(obj),		
		dataType: "json",
		async: true,
		success:function(data){agregaDataFila(data,tipo);}
	});
	
	*/
	
	
}

function enviaDatos(obj){


	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_enviarCURecursos/'+JSON.stringify(obj),		
		dataType: "json", 
		async: true,
		success:function(data,B){if (data.codRespuesta!='0') alert(data.mensaje);else cambiaConsultar();}
	});

	/*
	$.ajax({
		type: 'POST',
		url: rootURL + 'CO_enviarCURecursos/'+ JSON.stringify(obj),				
		dataType: "json",
		async: true,
		success:function(response, status){ alert("se grabó"); }
	});
*/

}


//Fin funciones para grabar

//Funciones para el uso del sidebar

function cambiaEditar(){
	$("#btnEditar").hide();
	$("#btnGrabar").show();
	$("#btnCancelar").show();
	$("#tablaAgrega").show();
	obtenUnidadMedida();
	obtenMoneda();
	$("#numFilas").val(0);
	iniciaRecursos(1);	
	
}


function cambiaConsultar(){
	
	$("#btnEditar").show();
	$("#btnGrabar").hide();
	$("#btnCancelar").hide();
	$("#tablaAgrega").hide();	
	 iniciaRecursos(0);	

}

//Fin de funciones para el uso del sidebar


//Limpia la tabla

function limpiaTablaRecursos(esEdicion){
	$("#tablaRecursos").html('');
	
	if (esEdicion==0)
		$("#tablaRecursos").append('<tr width="100%"><td width="5%"><b>#</b></td><td width="20%"><b>Recurso</b></td><td width="20%"><b>Unidad de Medida</b></td><td width="10%"><b>Costo Unitario</b></td><td width="15%"><b>Moneda</b></td><td width="10%"><b>Costo fijo mensual</b></td></tr>');
	else
		$("#tablaRecursos").append('<tr width="100%"><td width="2%"><b>#</b></td><td width="25%"><b>Recurso</b></td><td width="15%"><b>Unidad de Medida</b></td><td width="10%"><b>Costo Unitario</b></td><td width="12%"><b>Moneda</b></td><td width="10%"><b>Costo fijo mensual</b></td><td width="10%"><b>Eliminar</b></td></tr>');
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