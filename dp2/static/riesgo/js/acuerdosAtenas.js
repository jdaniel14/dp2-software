
$(document).ready(main);
localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main() {

    listarAcuerdos();
    var cantidad = $("#suma").val();
    $("span").click(function()
    {

        cantidad = parseInt(cantidad) + 1;
        $("#suma").val(cantidad);

        // add new row to table using addTableRow function
        addTableRow($("table"));
        // prevent button redirecting to new page
        return false;
    });



    $("#btnGuardar").click(function()
    {


        var cantidad = $("#suma").val(); //cantidad de inputs en total


        var data = {
            idProyecto: idProyectoLocal,
            listaFechas: []
        }
        var cantidad2 = $("#tablaAcuerdos tr").length;

        //var listaFechas = new Array();

        for (var i = 1; i <= cantidad2; i++) {
            var obj = {
                fecha: $("#fechas" + i).val(), // valor de inputs
                hora: $("#horas_" + i).val(),
                acuerdo: $("#acuerdo" + i).val()

            };
            data.listaFechas[i - 1] = obj;

        }


        console.log(data);
        var jsonData = JSON.stringify(data);


        $.ajax({
            type: 'POST',
            url: "../../api/R_registrarAcuerdos",
            data: jsonData,
            dataType: "json",
            success: function(data) {
                alert("Registrado con éxito");

            },
            fail: function(data) {
                alert(data.me);
            }
        });


    });

}



//////FUNCION AGREGAR FILA A LA TABLA /////////////////
// function to add a new row to a table by cloning the last row and 
// incrementing the name and id values by 1 to make them unique
function addTableRow(table)
{
    // clone the last row in the table
    var $tr = $(table).find("tbody tr:last").clone();
    // get the name attribute for the input and select fields
    $tr.find("input,select").attr("name", function()
    {
        // break the field name and it's number into two parts
        var parts = this.id.match(/(\D+)(\d+)$/);
        // create a unique name for the new field by incrementing
        // the number for the previous field by 1
        return parts[1] + ++parts[2];
        // repeat for id attributes
    }).attr("id", function() {
        var parts = this.id.match(/(\D+)(\d+)$/);
        return parts[1] + ++parts[2];
    });
    // append the new row to the table
    $(table).find("tbody tr:last").after($tr);
}


function listarAcuerdos() {

   // var cantidad = $("#suma").val();
    // alert(cantidad);

    //HARDCODEADO
   // var data = $.parseJSON('[{"idAcuerdo":1, "fechas1": "2013-10-09", "horas_1":"23:15:00","acuerdo1":"Se plantea que"},{"idAcuerdo":2,"fechas2": "2013-10-08", "horas_2":"09:00:00","acuerdo2":"Tomado desde"}]');
    //var data = $.parseJSON('[{"idAcuerdo":1, "fechas1": "2013-10-09", "horas_1":"23:15:00","acuerdo1":"Se plantea que"}]');


    //console.log(data);
//    var i = 1;
//    for (obj in data) {
//
//        //var fecha = new Date();
//        var fecha = data[obj]["fechas" + i];
//        var acuerdo = data[obj]["acuerdo" + i];
//        var hora = data[obj]["horas_" + i];
//        var idAcuerdo = data[obj]["idAcuerdo"];


//        $("#tablaAcuerdos").append("<tr><td><input name=\"fechas" + idAcuerdo + "\" id=\"fechas" + idAcuerdo + "\" type=\"date\" value=\"" + fecha + "\"></td><td> <td><input type=\"time\" name=\"horas_" + idAcuerdo + "\" id=\"horas_" + idAcuerdo + "\" value=\"" + hora + "\"></td> </td><td><input type=\"text\"  name=\"acuerdo" + idAcuerdo + "\" id=\"acuerdo" + idAcuerdo + "\" class=\"input-xlarge\" value=\"" + acuerdo + "\"></td></td></tr>");
//
//        //aplicar un if $("#my_row_101").remove();
//        i++

//    }

    //alert($("#tablaAcuerdos tr").length); //cuento cantidad de filas
//    if ($("#tablaAcuerdos tr").length > 1)
//        $("#my_row_101").remove();

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: '../../api/R_listarAcuerdos' + '/' + data.idProyecto,
        dataType: "json",
        success: function(data) {
            for (obj in data) {
                //var fecha = new Date();
                var fecha = data[obj]["fechas" + i];
                var acuerdo = data[obj]["acuerdo" + i];
                var hora = data[obj]["horas_" + i];
                var idAcuerdo = data[obj]["idAcuerdo"];


                $("#tablaAcuerdos").append("<tr><td><input name=\"fechas" + idAcuerdo + "\" id=\"fechas" + idAcuerdo + "\" type=\"date\" value=\"" + fecha + "\"></td><td> <td><input type=\"time\" name=\"horas_" + idAcuerdo + "\" id=\"horas_" + idAcuerdo + "\" value=\"" + hora + "\"></td> </td><td><input type=\"text\"  name=\"acuerdo" + idAcuerdo + "\" id=\"acuerdo" + idAcuerdo + "\" class=\"input-xlarge\" value=\"" + acuerdo + "\"></td></td></tr>");

                //aplicar un if $("#my_row_101").remove();
                i++;

            }
            if ($("#tablaAcuerdos tr").length > 1)
                $("#my_row_101").remove();


        },
    });
    //listarConfiguracion2(null);
}