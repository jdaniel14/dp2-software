var addAccion = "../../api/R_registrarActividadContingencia";
var updateCostTime = "../../api/R_actualizarCostoTiempoRiesgo";
var listAccions = "../../api/R_obtenerPlanContingenciaRiesgo";
var verificaLineaBase = "../../api/G_verificaLineaBase";
var tamanho;
$(document).ready(main);
var maxId;
var idRiesgo = localStorage.getItem("idRiesgo");
var lineaBase;

function lineaBase(){
    
    var idProyecto=localStorage.getItem("idProyecto");
    $.ajax({
        async: false,
        type: 'GET',
        url: verificaLineaBase + '/' + idProyecto,
        success: function(data) {
            obj=JSON.parse(data);
            lineaBase=JSON.parse(obj.estado_linea_base);
        },
        fail: function(data) {
            $("#labelErrorModal").value(data.me);
            $('#ModaldeErrores').modal('show');
        }
    });
}

function validar() {
    var i = 0;
    var valor;
    var max=($(".tipoRiesgo").size());
    $(".tipoRiesgo").each(function() {
        if (i>=max) return false;
        var accion = $($("input.tipoRiesgo")[i]).val(); // valor de inputs
        var costo = $($(".costo")[i]).val(); // valor de inputs
        var tiempo = $($(".tiempo")[i]).val(); // valor de inputs
        
        if (accion === null || accion.length === 0 || costo === null || costo.length === 0 || tiempo === null || tiempo.length === 0){
            //ALERTAR
            valor = "vacio";
           $("#labelErrorModal").value("Debe registrar todos los campos");
           $('#ModaldeErrores').modal('show');
            return false;
        }
        i+=3;

    });
    if (valor === "vacio")
        return false;
    else
        return true;
}



function main(){
    
	var cantidad = $("#suma").val();
    lineaBase();
    listaAcciones();
	$("#agregar").click(function()
    {

        cantidad = parseInt(cantidad) + 1;
        $("#suma").val(cantidad);
        var valor = $("#tablaAcuerdos tr").length;
        var ultimo = parseInt(valor) - 1;

        addTableRow();


        maxId = parseInt(maxId) + 1;
        $('#accion' + maxId).val("");
        if (!lineaBase){
            $('#tiempo' + maxId).val("");
            $('#costo' + maxId).val("");
            $('#costo' + ultimo).prop('disabled', false);
            $('#tiempo' + ultimo).prop('disabled', false);
        } else {
            $('#tiempo' + maxId).val("0");
            $('#costo' + maxId).val("0");
        }
        
        $('#accion' + ultimo).prop('disabled', false);
        
        return false;
    });

    $("#btnGuardar").click(function()
    {

        if (!validar())
            return;

        
        var costoPromedio;
        var tiempoPromedio;
   
        var j=0;
        var descripcion;
        var costo;
        var tiempo;
        
  
           
        var i = tamanho+1;
        
        if(parseInt(tamanho)===0){
   
            var data = {
                idRiesgoXProyecto: idRiesgo,
                descripcion: $($("input.tipoRiesgo")[0]).val(), 
                costo:$($(".costo")[0]).val() ,
                tiempo: $($(".tiempo")[0]).val()
            }
            
            console.log(data);
            var jsonData = JSON.stringify(data);


            $.ajax({
           
                type: 'POST',
                url: addAccion,
                data: jsonData,
                dataType: "json",
                success: function(data) {
                    obj=JSON.parse(data);
                    costoPromedio=obj.costo;
                    tiempoPromedio=obj.tiempo;
                        alert("Se registró con exito");
                        $("#tablaAcuerdos").html("");
                        listaAcciones();
                        $('#confirmSave').modal('hide');
                    
                },
                fail: function(data) {
                    $("#labelErrorModal").value(data.me);
                    $('#ModaldeErrores').modal('show');
                }
            });
            

        }
        else {
          
        $(".tipoRiesgo").each(function() {
              
          var data = {
                idRiesgoXProyecto: idRiesgo,
                descripcion: $($("input.tipoRiesgo")[i-1]).val(), 
                costo:$($(".costo")[i-1]).val() ,
                tiempo: $($(".tiempo")[i-1]).val()
            };
            
            i++;
            
            console.log(data);
            var jsonData = JSON.stringify(data);


            $.ajax({
           
                type: 'POST',
                url: addAccion,
                data: jsonData,
                dataType: "json",
                success: function(data) {
                    obj=JSON.parse(data);
                    costoPromedio=obj.costo;
                    tiempoPromedio=obj.tiempo;
                        $("#tablaAcuerdos").html("");
                        listaAcciones();
                        $('#confirmSave').modal('hide');

                        $('#modalExito').modal('show');
                    },
                fail: function(data) {
                    $("#labelErrorModal").value(data.me);
                    $('#ModaldeErrores').modal('show');
                }
            });

        });

        }


//            if (i==max){
//                var data = {
//                    idRiesgoXProyecto: idRiesgo,
//                    costo:costoPromedio,
//                    tiempo:tiempoPromedio
//                };
//                var jsonData = JSON.stringify(data);
//
//                $.ajax({
//                    async: false,
//                    type: 'PUT',
//                    url: updateCostTime,
//                    data: jsonData,
//                    success: function(data) {
//                        alert("Se registró con exito");
//                        $("#tablaAcuerdos").html("");
//                        listaAcciones();
//                        $('#confirmSave').modal('hide');
//                    },
//                    fail: function(data) {
//                        alert(data.me);
//                    }
//                });
//            }
//        });
    });
}

function addTableRow()
{
    // clone the last row in the table
    var $tr = $("#tablaAcuerdos").find("tbody tr:last").clone();
    console.log($tr);
    // get the name attribute for the input and select fields
    $tr.find("input").attr("name", function()
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
    $("#tablaAcuerdos").find("tbody tr:last").after($tr);
}

function listaAcciones() {

    var data = {
        idRiesgoXProyecto: idRiesgo
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url:  listAccions + '/' + data.idRiesgoXProyecto,
        success: function(data) {
              
            obj = JSON.parse(data);
            console.log(obj);
            $("#tablaAcuerdos").append("<tr>"+
                "<td width=\"40%\"><b>Acción</b></td>"+
                "<td width=\"30%\"><b>Costo</b></td>"+
                "<td width=\"30%\"><b>Tiempo</b></td>"+
                "<td width=\"30%\"><b>Eliminar</b></td>"+
            "</tr>");
            $.each(obj, function(index) {
                    console.log(this.costo);

                    var costo =this.costo;
                    var descripcion = this.descripcion;
                    var tiempo = this.tiempo;
                    
                    $("#tablaAcuerdos").append("<tr>"+
                        "<td><input class=\"form-control tipoRiesgo input-riesgos\" name=\"accion" + index + "\" id=\"accion" + index + "\" type=\"text\" value=\"" + descripcion + "\" disabled></td>"+
                        "<td><input class=\"costo form-control \" name=\"costo" + index + "\" id=\"costo" + index + "\" type=\"text\" value=\"" + costo + "\" disabled></td>"+
                        "<td><input class=\"tiempo form-control \" name=\"tiempo" + index + "\" id=\"tiempo" + index + "\" type=\"text\" value=\"" + tiempo + "\" disabled></td>"+
                        "<td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove iconito\" id=\"" + index+ "\" ></span></a></td></tr>");

                });
                 tamanho=parseInt(($(".tipoRiesgo").size()));
                    console.log(tamanho);

            //     var fecha = new Date();
            //     var tipoRi = data[obj]["tipoRi"];
            //     var formas = data[obj]["formas"];
            //     var idTipo = data[obj]["idTipo"];

            //     var tipo;
            //     if (formas == 1) {
                    
            //         tipo = 'Numero';
            //         $("#tablaTiposRiesgos").append("<tr><td><input disabled class=\"tipoRiesgo\" name=\"tipoRi" + idTipo + "\" id=\"tipoRi" + idTipo + "\" type=\"text\" value=\"" + tipoRi + "\" disabled></td><td><select class=\"numero\" disabled selected id=\"formas" + idTipo + "\"><option value=\"" + 1 + "\">" + tipo + "</option></select></td> <td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove iconito\" id=\"" + idTipo+ "\" ></span></a></td></tr>");
            //     }
            //     else {
            //         if(formas==2){
            //         tipo = 'Texto';
            //         $("#tablaTiposRiesgos").append("<tr><td><input disabled class=\"tipoRiesgo\" name=\"tipoRi" + idTipo + "\" id=\"tipoRi" + idTipo + "\" type=\"text\" value=\"" + tipoRi + "\"></td><td><select class=\"numero\"  disabled selected id=\"formas" + idTipo + "\"><option value=\"" + 2 + "\">" + tipo +  "</option></select></td><td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove iconito\" id=\"" + idTipo+ "\"></span></a></td> </tr>");
            //         }
            //     }


            

            // $(".iconito").click( function(){
            //                 var  idTipoRi= $(this).closest("span").attr("id");
            //                 eliminarRiesgo(idTipoRi);

            //  });
 
            // if ($("#tablaTiposRiesgos tr").length > 1)
            //     $("#my_row_101").remove();
            console.log($("#tablaAcuerdos tr").length);
            if ($("#tablaAcuerdos tr").length == 1){
                $("#tablaAcuerdos").append("<tr>"+
                "<td><input class=\" form-control  tipoRiesgo input-riesgos\" name=\"accion" + 0 + "\" id=\"accion" + 0 + "\" type=\"text\" ></td>"+
                "<td><input class=\"costo form-control \" name=\"costo" + 0 + "\" id=\"costo" + 0 + "\" type=\"text\" ></td>"+
                "<td><input class=\"tiempo form-control \" name=\"tiempo" + 0 + "\" id=\"tiempo" + 0 + "\" type=\"text\" ></td>"+
                "<td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove iconito\" id=\"" + 0+ "\" ></span></a></td></tr>");
            }
                
        }
    });
}