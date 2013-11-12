google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(cargaChart);
var idProyecto=obtenerIdProyecto();
var idUsuario=obtenerIdUsuario();
var rootURL = "../../api/";
obtenProyecto();

function cargaChart(){
	$("#indicador").val($("#comboIndicador").val());
	var sFecha = $("#fechaLimite").val()
	var dia=sFecha.substr(0,2);
	var mes=sFecha.substr(3,2);
	var anho=sFecha.substr(6,4);
	$("#fechaUnix").val(anho+''+mes+''+dia);
	obtenDatosTabla()
}

$(function (){
	$("#fechaLimite").datepicker({dateFormat:'dd-mm-yy'});
});


function agregarDataProyecto(data){

	proy=data;
	if (proy!=null) agregaDatosProyecto( proy.nombre ,proy.presupuesto ,proy.porcentajeReserva);
}


function agregaDatosProyecto(nombreProyecto, montoSinReserva, porcentajeReserva){
	$("#nombreProyecto").html(nombreProyecto);
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

function obtenDatosTabla(){
	var obj ={
		idProyecto : idProyecto,
		indicador : $("#indicador").val(),
		fecha : $("#fechaUnix").val(),
		idUsuario  : idUsuario
	}
	$.ajax({
		type: 'GET',
		url: rootURL + 'CO_obtenerHistorialIndicador/'+JSON.stringify(obj),
		dataType: "json",
		async: true,
		success:drawChart	

	});		
}

function obtenProyecto(/*idProyecto*/){
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
}
function formatearFecha(sfecha){
	var dia=sfecha.substr(0,2)*1;
	var mes=sfecha.substr(3,2)*1;
	var anho=sfecha.substr(6,4)*1;
	return new Date(anho,mes - 1,dia);
}

function drawChart(data) {

	var lista = data.lista;
	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('date', 'Fecha');
	for (var i = 0; i < lista.length; i++){
      dataTable.addColumn('number', lista[i].nombre);
	}
	var tabla = [];
	var ultimaFecha = "";
	for (var k = 0; k < lista[0].historial.length; k++){
		var arr = [];
		if (ultimaFecha == lista[0].historial[k].fecha) continue;
		arr.push(formatearFecha(lista[0].historial[k].fecha));
		for (var i = 0; i < lista.length; i++){
			arr.push(lista[i].historial[k].valor*1)
		}
		ultimaFecha = lista[0].historial[k].fecha;
		tabla.push(arr);
	}
	dataTable.addRows(tabla);
      /*dataTable.addRows([
	  [new Date(2014,1,15),  1.200],
	  [new Date(2014,2,15),  1.130],
	  [new Date(2014,3,15),  1.100],
      [new Date(2014,4,1),  1.170],
      [new Date(2014,5,7),  1.160],
	  [new Date(2014,6,3),  1.130],
      [new Date(2014,7,20),  1.140],
      [new Date(2014,8,15),  1.122],
	  [new Date(2014,9,15),  1.092],
	  [new Date(2014,12,15),  1.120]
      ]);*/
	var dataView = new google.visualization.DataView(dataTable);
      //dataView.setColumns([{calc: function(data, row) { return data.getFormattedValue(row, 0); }, type:'date'}, 1]);

    var options = {
        title: 'Indicadores de costo',
		pointSize: 5
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(dataView, options);
}
