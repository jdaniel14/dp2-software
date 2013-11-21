var addAccion = "../../api/R_registrarActividadContingencia";
var updateCostTime = "../../api/R_actualizarCostoTiempoRiesgo";

$(document).ready(main);
var maxId;
var idRiesgo = localStorage.getItem("idRiesgo");

function validar() {
    var i = 0;
    var valor;
    var max=($(".tipoRiesgo").size());
    $(".tipoRiesgo").each(function() {
        if (i>=max) return false;
        var accion = $($("input.tipoRiesgo")[i]).val(); // valor de inputs
        var costo = $($("input.tipoRiesgo")[i+1]).val(); // valor de inputs
        var tiempo = $($("input.tipoRiesgo")[i+2]).val(); // valor de inputs
        
        if (accion === null || accion.length === 0 || costo === null || costo.length === 0 || tiempo === null || tiempo.length === 0){
            //ALERTAR
            valor = "vacio";
            alert("Debe registrar todos los campos");
            return false;
        }
        i+=3;
        console.log(accion + " " + costo + " "+ tiempo);

    });
    if (valor === "vacio")
        return false;
    else
        return true;
}



function main(){
	var cantidad = $("#suma").val();
	$("#agregar").click(function()
    {

        cantidad = parseInt(cantidad) + 1;
        $("#suma").val(cantidad);
        var valor = $("#tablaRiesgos tr").length;
        var ultimo = parseInt(valor) - 1;
        //el mayor-1 lo desabilito y luego lo habilito el disabled

        $('#accion' + ultimo).prop('disabled', false);
        $('#costo' + ultimo).prop('disabled', false);
        $('#tiempo' + ultimo).prop('disabled', false);
        addTableRow();


        maxId = parseInt(maxId) + 1;
        $('#accion' + maxId).val("");
        $('#tiempo' + maxId).val("");
        $('#costo' + maxId).val("");
        return false;
    });

    $("#btnGuardar").click(function()
    {

        if (!validar())
            return;

        
        var costoPromedio;
        var tiempoPromedio;
        var max=($(".tipoRiesgo").size());
        var i = 0;
        var j=0;
        $(".tipoRiesgo").each(function() {
            if (i>=max) return false;
            
                descripcion = $($("input.tipoRiesgo")[i]).val(); // valor de inputs
                costo = $($("input.tipoRiesgo")[i+1]).val(); // valor de inputs
                tiempo = $($("input.tipoRiesgo")[i+2]).val(); // valor de inputs
            
            i+=3;
            var data = {
                idRiesgoXProyecto: idRiesgo,
                descripcion: descripcion,
                costo:costo,
                tiempo:tiempo
            };
            console.log(data);
            var jsonData = JSON.stringify(data);

            $.ajax({
                async: false,
                type: 'POST',
                url: addAccion,
                data: jsonData,
                success: function(data) {
                    alert("Registrado con éxito");
                    obj = JSON.parse(data);
                    console.log(obj);
                    costoPromedio=obj.costo;
                    console.log(costoPromedio);
                    tiempoPromedio=obj.tiempo;
                    console.log(tiempoPromedio);
                    $("#tablaAcuerdos").html("");
                    // listaTipoImpactos();
                },
                fail: function(data) {
                    alert(data.me);
                }
            });

            if (i==max){
                var data = {
                    idRiesgoXProyecto: idRiesgo,
                    costo:costoPromedio,
                    tiempo:tiempoPromedio
                };
                console.log(data);
                var jsonData = JSON.stringify(data);

                $.ajax({
                    type: 'PUT',
                    url: updateCostTime,
                    data: jsonData,
                    success: function(data) {
                        alert(data.me);
                    },
                    fail: function(data) {
                        alert(data.me);
                    }
                });
            }
        });

        


        
         
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