google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
	  
	var dataTable = new google.visualization.DataTable();
      dataTable.addColumn('date', 'Mes');
      dataTable.addColumn('number', 'BAC');
      dataTable.addRows([
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
      ]);
	var dataView = new google.visualization.DataView(dataTable);
      //dataView.setColumns([{calc: function(data, row) { return data.getFormattedValue(row, 0); }, type:'date'}, 1]);

    var options = {
        title: 'Indicadores de costo',
		pointSize: 5
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(dataView, options);
}
