
var getAllImpacts = "../../api/R_AgregarTiposImpacto";
$(document).ready(main);
localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main() {

    listaTipoImpactos();
    var cantidad = $("#suma").val();
    $("span").click(function()
    {
        cantidad = parseInt(cantidad) + 1;
        $("#suma").val(cantidad);
        var valor=$("#tablaTiposRiesgos tr").length;
        var  ultimo=parseInt(valor)-1;
        //el mayor-1 lo desabilito y luego lo habilito el disabled
        $('#tipoRi'+ultimo).prop('disabled', false);
        $('#formas'+ultimo).prop('disabled', false);
        addTableRow($("table"));

   

        $('#tipoRi'+ultimo).prop('disabled', true);
          $('#formas'+ultimo).prop('disabled', true);
        return false;
    });

         

    $("#btnGuardar").click(function()
    {
          var cantidad = $("#suma").val(); 
      
        var data = {
            idProyecto: idProyectoLocal,
            listaTipoImpacto: []
        };
   
     
        //var listaFechas = new Array();

        for (var i = 1; i <= cantidad; i++) {
            var obj = {
                tipoRi: $("#tipoRi" + i).val(), // valor de inputs
                formas: $("#formas" + i).val()
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

function listaTipoImpactos() {
//  var data=$.parseJSON('[{"idTipo":1,"tipoRi":"seguridad","forma":2}]');
//  console.log(data);
//   for (obj in data) {
//                 //var fecha = new Date();
//                 var tipoRi = data[obj]["tipoRi"];
//                 var forma = data[obj]["forma"];
//                 var idTipo = data[obj]["idTipo"];
            
//                 var tipo;
//                 if (forma === 1) {
//                     tipo = 'Numero';
//                     $("#tablaTiposRiesgos").append("<tr><td><input d name=\"tipoRi" + idTipo + "\" id=\"tipoRi" + idTipo + "\" type=\"text\" value=\"" + tipoRi + "\" disabled></td><td><select disabled selected id=\"formas"+idTipo+"\"><option value=\"" + 2 + "\">" + tipo + "</option><option value=\"" + 1 + "\">" + 'Texto' + "</option></select></td> </tr>");
//                 }
//                 else {
//                     tipo= 'Texto';
//                     $("#tablaTiposRiesgos").append("<tr><td><input disabled name=\"tipoRi" + idTipo + "\" id=\"tipoRi" + idTipo + "\" type=\"text\" value=\"" + tipoRi + "\"></td><td><select disabled selected id=\"formas"+idTipo+"\"><option value=\"" + 1 + "\">" + tipo + "</option><option value=\"" + 2 + "\">" + 'Numero' + "</option></select></td> </tr>");

//                 }
//                 //aplicar un if $("#my_row_101").remove();
                
//             }
//             if ($("#tablaTiposRiesgos tr").length > 1)
//                 $("#my_row_101").remove();


       


   var data = {
       idProyecto: idProyectoLocal
   };
   var jsonData = JSON.stringify(data);
   $.ajax({
       type: 'GET',
       url: '../../api/R_listaTiposImpactoRiesgo' + '/' + data.idProyecto,
       dataType: "json",
       success: function(data) {
             for (obj in data) {
                var fecha = new Date();
                var tipoRi = data[obj]["tipoRi"];
                var formas = data[obj]["formas"];
                var idTipo = data[obj]["idTipo"];
            
                var tipo;
                if (formas === 1) {
                    tipo = 'Numero';
                    $("#tablaTiposRiesgos").append("<tr><td><input d name=\"tipoRi" + idTipo + "\" id=\"tipoRi" + idTipo + "\" type=\"text\" value=\"" + tipoRi + "\" disabled></td><td><select disabled selected id=\"formas"+idTipo+"\"><option value=\"" + 2 + "\">" + tipo + "</option><option value=\"" + 1 + "\">" + 'Texto' + "</option></select></td> </tr>");
                }
                else {
                    tipo= 'Texto';
                    $("#tablaTiposRiesgos").append("<tr><td><input disabled name=\"tipoRi" + idTipo + "\" id=\"tipoRi" + idTipo + "\" type=\"text\" value=\"" + tipoRi + "\"></td><td><select disabled selected id=\"formas"+idTipo+"\"><option value=\"" + 1 + "\">" + tipo + "</option><option value=\"" + 2 + "\">" + 'Numero' + "</option></select></td> </tr>");

                }
             
                
            }
            
          
            if ($("#tablaTiposRiesgos tr").length > 1)
              $("#my_row_101").remove();


       },
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
    