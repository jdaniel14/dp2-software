google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart(){
	$("#btnIndicador").click(function(){
		showIndicador();
	});
}

function showIndicador(){
	var objProy = {
		idProyecto: idProyecto
	};
	var ruta = "../../../api/CR_getIndicadoresFlujo/" + JSON.stringify(objProy);
	$.ajax({
		type: 'GET',
		url: ruta,
		dataType: 'json',
		success: function(data){
			var auxInd = data;
			
			var spi = auxInd.indicadores[0];
			var sv = auxInd.indicadores[1];			
			var arreglo = new Array();			
			arreglo[0] = ['Fecha','SPI','SV'];			
			for (var i=0; i < spi.length; i++){
				arreglo[i+1] = [spi[i].fecha,parseFloat(spi[i].valor),parseFloat(sv[i].valor)];
			}
			console.log(arreglo);
			var chardata = google.visualization.arrayToDataTable(arreglo);
			console.log(chardata);
			var options = {
				areaOpacity:0.0,
				lineWidth:3,
				pointSize:8,
				charArea:{
					left:20,
					top:20,
					widh:640
				}
			};
			//var dataView = new google.visualization.DataView(chardata);
			//dataView.setColumns([{calc: function(data, row) { return data.getFormattedValue(row, 0); }, type:'string'}, 1]);

			var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
			chart.draw(chardata, options);
		}
	});
}