var cantidad=0;
$(document).ready(main);
 //localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");

function validAtenas2(){
    var i=0;
    var valor;
     $(".diaAcuerdos").each(function(){
		var acuerdoI = $($("input.acuerdosA")[i]).val();
                var fecha= $($("input.diaAcuerdos")[i]).val();
                var hora= $($("input.horasAcuerdos")[i]).val();
              
		if (acuerdoI === null || acuerdoI.length === 0 || fecha===null || fecha.length===0  || hora ===null || hora.length===0){
			//ALERTAR
                        valor="vacio";
                        alert("Debe registrar todos los campos");
			return false;
                        
		}
          
                i++;
             
	});
        if(valor==="vacio") return false;
        else
        return true;
}

function main() {

    listarAcuerdos();
    var cantidad = $("#suma").val();
  $("#agregar").click(function()
    {
        var valor=$("#tablaAcuerdos tr").length;
        var  ultimo=parseInt(valor)-1;
        //el mayor-1 lo desabilito y luego lo habilito el disabled
   
        $('#fechas'+ultimo).prop('disabled', false);
        $('#horas_'+ultimo).prop('disabled', false);
        $('#acuerdo'+ultimo).prop('disabled', false);
        
        addTableRow();
        maxId = parseInt(maxId) + 1;
       
        $('#fechas' + maxId).val("");
        $('#horas_' + maxId).val("");
        $('#acuerdo' + maxId).val("");
        $('#fechas' + maxId).prop('disabled', false);
        $('#horas_' + maxId).prop('disabled', false);
        $('#acuerdo' + maxId).prop('disabled', false);
        return false;
    });



    $("#btnGuardar").click(function()
    {
       
        if (!validAtenas2())
			return;
        
        
        var data = {
            idProyecto: idProyectoLocal,
            listaFechas: [], 
            idUsuario: localStorage.getItem("idUsuario")
        };
      //  var cantidad2 = $("#tablaAcuerdos tr").length;
        var i=0;
       $(".diaAcuerdos").each(function(){
          
           var obj = {
              fecha: $($("input.diaAcuerdos")[i]).val(),
              hora: $($("input.horasAcuerdos")[i]).val(),
              acuerdo: $($("input.acuerdosA")[i]).val()
           };
           i++;
            data.listaFechas[i - 1] = obj;
       });


        console.log(data);
        var jsonData = JSON.stringify(data);


        $.ajax({
            type: 'POST',
            url: "../../api/R_registrarAcuerdos",
            data: jsonData,
           
            success: function() {
                alert("Registrado con éxito");
                $("#tablaAcuerdosMod").html("");
                listarAcuerdos();
           

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
function addTableRow()
{
    // clone the last row in the table
    var $tr = $("#tablaAcuerdosMod").find("tbody tr:last").clone();
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
          maxId = parts[2];
        return parts[1] + ++parts[2];
    });
    // append the new row to the table
    $("#tablaAcuerdosMod").find("tbody tr:last").after($tr);
}


function listarAcuerdos() {

    var data = {
        idProyecto: idProyectoLocal,
        idUsuario: localStorage.getItem("idUsuario")
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: '../../api/R_listarAcuerdos' + '/' + data.idProyecto,
        dataType: "json",
        success: function(data) {
            for (obj in data) {
                //var fecha = new Date();
                var fecha = data[obj]["fecha"];
                var acuerdo = data[obj]["acuerdo"];
                var hora = data[obj]["hora"];
                var idAcuerdo = data[obj]["idAcuerdo"];


                $("#tablaAcuerdosMod").append("<tr><td><input readonly class=\" form-control diaAcuerdos\" disabled name=\"fechas" + idAcuerdo + "\" id=\"fechas" + idAcuerdo + "\" type=\"date\" value=\"" + fecha + "\"></td><td><input disabled readonly  class=\" form-control horasAcuerdos\" type=\"time\" name=\"horas_" + idAcuerdo + "\" id=\"horas_" + idAcuerdo + "\" value=\"" + hora + "\"></td> </td><td><input readonly type=\"text\"  class=\"form-control acuerdosA\" disabled name=\"acuerdo" + idAcuerdo + "\" id=\"acuerdo" + idAcuerdo + "\" class=\"input-xlarge\" value=\"" + acuerdo + "\"></td></td></tr>");

                //aplicar un if $("#my_row_101").remove();
                

            }



        },
    });
    //listarConfiguracion2(null);
}