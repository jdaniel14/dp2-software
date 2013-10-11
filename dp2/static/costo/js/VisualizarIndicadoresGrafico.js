google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Mes', 'BAC'],
      ['1',  1.100],
      ['2',  1.170],
      ['3',  1.160],
	  ['4',  1.130],
      ['5',  1.140],
      ['6',  1.122],
	  ['7',  1.092],
      ['8',  1.130],
      ['9',  1.200],
	  ['10',  1.120],
      ['11',  1.111],
      ['12',  1.080],
      ['13',  1.070]
      ]);

    var options = {
        title: 'Indicadores de costo',
        hAxis: {title: 'Hito', titleTextStyle: {color: 'red'}}
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
