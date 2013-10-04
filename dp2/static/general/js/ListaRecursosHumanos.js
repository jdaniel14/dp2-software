var x;
x = $(document);
x.ready(inicializarEventos);

function inicializarEventos() {
    $("#fechaInicio").datepicker({ dateFormat: 'dd-mm-yy' });
    $("#fechaFin").datepicker({ dateFormat: 'dd-mm-yy' });
    $("#btnBuscar").click(iniciarFlujo);
    $("#resultados").hide();

    $("#fechaInicio").change(filtrarOtraFecha)
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

function iniciarFlujo() {
    var fechaInicio = $("#fechaInicio").attr("value");
    var fechaFinal = $("#fechaFin").attr("value");

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
            url: "../../api/G_listaRecursos",
            beforeSend: esperaDatos(),
            success: llegadaDatos
        });
    }
    else {
        mostrarError("Faltan Datos");
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

        $.each(data[0].listaFechas, function (i, item) {
            cantDias++;
        });

        result += '<table cellpadding = "0" cellspacing = "0" width = "100%">';
        result += '<thead><tr align = "center">';
        result += '<td align = "center">Nombre</td>';

        for (j = 0; j < cantDias; j++){
            result += '<td align = "center">Dia ' + j + '</td>';
        }

        result += '</tr></thead>';        
        result += '<tbody>';
        $.each(data, function (i, item) {
            result += '<tr>';
            result += '<td align = "center">' + item.nomRecurso + '</td>';

            var fechas = item.listaFechas;

            $.each(fechas, function (i, led) {
                if (led.estado == "Ocupado") {
                    result += '<td align = "center" style="background-color:red" >';
                }
                else if (led.estado == "Libre") {
                    result += '<td align = "center" style="background-color:blue" >';
                }
                result += '</td>';
            });
            result += '</tr>';
        });

        result += '</tbody>';
        result += '</table>';
        result += '</div>';

        $("#resultados").html(result);
        $("#resultados").show("slow");
}