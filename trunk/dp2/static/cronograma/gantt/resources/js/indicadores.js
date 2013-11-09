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
			var arreglo2 = new Array();	
			arreglo[0] = ['Fecha','SPI'];
			arreglo2[0] = ['Fecha','SV'];
			if (spi.length == 0){
				$("#chart_div").html("<p>No existe data histórica para los indicadores de tiempo</p>");				
			}
			else {

				//$("#chart_div").clear();
				for (var i=0; i < spi.length; i++){
					arreglo[i+1] = [spi[i].fecha,parseFloat(spi[i].valor)];
					arreglo2[i+1] = [sv[i].fecha,parseFloat(sv[i].valor)];
				}
				var chardata = google.visualization.arrayToDataTable(arreglo);
				var chardata2 = google.visualization.arrayToDataTable(arreglo2);

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
				console.log("Dibujo algo");
				var chart2 = new google.visualization.AreaChart(document.getElementById('chart_div2'));
				chart2.draw(chardata2, options);
			}
			
		}
	});
}