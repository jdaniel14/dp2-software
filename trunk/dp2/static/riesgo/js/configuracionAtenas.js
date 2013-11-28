
var getAllImpacts = "../../api/R_AgregarTiposImpacto";
$(document).ready(main);
//localStorage.setItem("idProyecto", 1);
var maxId;
var idProyectoLocal = localStorage.getItem("idProyecto");

function validAtenas2() {
    var i = 0;
    var valor;
    $(".tipoRiesgo").each(function() {
        var tipoRi = $($("input.tipoRiesgo")[i]).val(); // valor de inputs

        if (tipoRi === null || tipoRi.length === 0) {
            //ALERTAR
            valor = "vacio";
            alert("Debe registrar todos los campos");
            return false;

        }

        i++;

    });
    if (valor === "vacio")
        return false;
    else
        return true;
}



function main() {

    listaTipoImpactos();
    var cantidad = $("#suma").val();
    $("#agregar").click(function()
    {

        cantidad = parseInt(cantidad) + 1;
        $("#suma").val(cantidad);
        var valor = $("#tablaRiesgos tr").length;
        var ultimo = parseInt(valor) - 1;
        //el mayor-1 lo desabilito y luego lo habilito el disabled

        $('#tipoRi' + ultimo).prop('disabled', false);
        $('#formas' + ultimo).prop('disabled', false);
        addTableRow();


        maxId = parseInt(maxId) + 1;
        $('#tipoRi' + maxId).val("");
        $('#tipoRi' + maxId).prop('disabled', false);
        $('#formas' + maxId).prop('disabled', false);
        return false;
    });



    $("#btnGuardar").click(function()
    {

        if (!validAtenas2())
            return;

        var data = {
            idProyecto: idProyectoLocal,
            listaTipoImpacto: []
        };


        var i = 0;
        $(".tipoRiesgo").each(function() {

            var obj = {
                tipoRi: $($("input.tipoRiesgo")[i]).val(), // valor de inputs
                formas: $($("select.numero")[i]).val()

            };
            i++;
            data.listaTipoImpacto[i - 1] = obj;
        });

        console.log(data);
        var jsonData = JSON.stringify(data);


        $.ajax({
            type: 'POST',
            url: "../../api/R_registrarTiposImpactoRiesgo",
            data: jsonData,
            success: function(data) {
                alert("Registrado con éxito");
                        $("#tablaTiposRiesgos").html("");
listaTipoImpactos();
                              
            },
            fail: function(data) {
                alert(data.me);
            }
        });
         

    });
 

}

   
    function eliminarRiesgo(idTipoRi){

    $("#btnEliminar").click(function() {
        
        $("#tablaRiesgos > tr>td>a>span");
       console.log(idTipoRi);   
      var data = {
			idTipoImpacto : idTipoRi
		};
		var jsonData = JSON.stringify(data);
                console.log(data);
		$.ajax({
			type: 'DELETE',
			url: "../../api/R_eliminarTiposImpactoRiesgo" + '/' + data.idTipoImpacto,
			data: jsonData,
			dataType: "html",
			success: function(){
                             alert("Se elimino el tipo de impacto correctamente");
                              $("#tablaTiposRiesgos").html("");
                              listaTipoImpactos();
                             
		
			},
			fail: codigoError
		});
	});

}

function listaTipoImpactos() {
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
                if (formas == 1) {
                    
                    tipo = 'Numero';
                    $("#tablaTiposRiesgos").append("<tr><td><input disabled class=\"form-control tipoRiesgo\" name=\"tipoRi" + idTipo + "\" id=\"tipoRi" + idTipo + "\" type=\"text\" value=\"" + tipoRi + "\" disabled></td><td><select class=\"form-control numero\" disabled selected id=\"formas" + idTipo + "\"><option value=\"" + 1 + "\">" + tipo + "</option></select></td> <td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove iconito\" id=\"" + idTipo+ "\" ></span></a></td></tr>");
                }
                else {
                    if(formas==2){
                    tipo = 'Texto';
                    $("#tablaTiposRiesgos").append("<tr><td><input disabled class=\"form-control tipoRiesgo\" name=\"tipoRi" + idTipo + "\" id=\"tipoRi" + idTipo + "\" type=\"text\" value=\"" + tipoRi + "\"></td><td><select class=\"form-control numero\"  disabled selected id=\"formas" + idTipo + "\"><option value=\"" + 2 + "\">" + tipo +  "</option></select></td><td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove iconito\" id=\"" + idTipo+ "\"></span></a></td> </tr>");
                    }
                }


            }

            $(".iconito").click( function(){
                            var  idTipoRi= $(this).closest("span").attr("id");
                            eliminarRiesgo(idTipoRi);

             });
 
            if ($("#tablaTiposRiesgos tr").length > 1)
                $("#my_row_101").remove();


        },
    });


}


//////FUNCION AGREGAR FILA A LA TABLA /////////////////
// function to add a new row to a table by cloning the last row and 
// incrementing the name and id values by 1 to make them unique
function addTableRow()
{

    // clone the last row in the table
    var $tr = $("#tablaTiposRiesgos").find("tbody tr:last").clone();
    console.log($tr);
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
    $("#tablaTiposRiesgos").find("tbody tr:last").after($tr);



}
    