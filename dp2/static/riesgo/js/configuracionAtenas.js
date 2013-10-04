
var getAllImpacts = "../../api/R_AgregarTiposImpacto";
$(document).ready(main);
localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main() {

    var cantidad = $("#suma").val();
    $("span").click(function()
    {
        addTableRow($("table"));
        return false;
    });

    $("#btnGuardar").click(function()
    {
     var data = {
            idproyecto: idProyectoLocal,
            listaTipoImpacto: []
        };
        var cantidad = $("#tablaRiesgos tr").length;

        //var listaFechas = new Array();

        for (var i = 1; i <= cantidad; i++) {
            var obj = {
                tipoRi: $("#tipoRi" + i).val(), // valor de inputs
                formas:$("#formas" + i).val() 
            };
            data.listaTipoImpacto[i - 1] = obj;

        }
    console.log(data);
        var jsonData = JSON.stringify(data);


        $.ajax({
            type: 'POST',
            url: "../../api/R_registrarTiposImpactoRiesgo",
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
    