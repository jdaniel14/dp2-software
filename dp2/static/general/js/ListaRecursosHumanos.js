var x;
x = $(document);
x.ready(inicializarEventos);

function inicializarEventos() {    
    $("#btnBuscar").click(iniciarFlujo);
    $("#resultados").hide();

   // $("#fechaInicio").change(filtrarOtraFecha)
}

function filtrarOtraFecha() {

    $("#fechaFin").attr("value", "");
    var fecha = new Date();
    fecha = $("#fechaInicio").datepicker("getDate");

    var ddd = fecha.getDate();
    ddd += 14;
    if (ddd < 10)
        ddd = "0" + ddd;
    
    $("#fechaFin").datepicker("option", "maxDate", new Date(year, (month - 1), ddd));

}
var fechaInicio = null;
var fechaFinal = null;

function iniciarFlujo() {
    fechaInicio = $("#fechaInicio").val();
    fechaFinal = $("#fechaFin").val();

    if ((fechaInicio != "") && (fechaFinal != "")) {

        var ListaRecursos = {
            fechaIni: fechaInicio,
            fechaFin: fechaFinal
        }
        var jsonData = JSON.stringify(ListaRecursos);
        console.log(jsonData);

        $.ajax({
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            url: "../../api/G_listaTodosRecurso",
            beforeSend: esperaDatos(),
            success: llegadaDatos
        });
    }
    else {
        //mostrarError("Faltan Datos");
    	alert("Ingrese Datos");
        $("#resultados").hide("slow");
    }
}


function esperaDatos() {
}


function llegadaDatos(data) {

    console.log(data);
    $("#resultados").hide("slow");
    
    //if (data.me == "") {    
        var result = "";
        var cantDias = 0;
        var j = 0;
        /*console.log("aqui");
        console.log(data[1]["detalle_dias"]);
        console.log("sale");*/
        $.each(data[1].detalle_dias, function (i, item) {
            cantDias++;            
        });
        console.log(cantDias);
        
        result += '<table cellpadding = "0" cellspacing = "0" width = "100%">';
        result += '<thead><tr align = "center">';
        result += '<td align = "center">Nombre</td>';
        alert(fechaInicio);
        str = fechaInicio+"";
        alert(str.substr(0,4));
        alert(str.substr(5,2));
        alert(str.substr(8,2));
        var date = new Date(str.substr(0,4),str.substr(5,2), str.substr(8,2));
        for (j = 0; j < cantDias; j++){
            result += '<td align = "center">' + date.getDate() + '</td>';
            date.setDate(date.getDate() + 1);
        }

        result += '</tr></thead>';        
        result += '<tbody>';
        
        prim = true;
        $.each(data, function (i, item) {
        	console.log("entra");
        	if(prim == true) prim = false;
        	else {
        		result += '<tr>';
        		result += '<td align = "center">' + item.nom + '</td>';

        		var fechas = item.detalle_dias;

        		$.each(fechas, function (i, led) {
        			if (led != 0) {
        				result += '<td align = "center" style="background-color:red" >';
        			}
        			else {
        				result += '<td align = "center" style="background-color:blue" >';
        			}
        			result += '</td>';
        		});
        		result += '</tr>';
        	}
        });

        result += '</tbody>';
        result += '</table>';
        result += '</div>';

        $("#resultados").html(result);
        $("#resultados").show("slow");
}