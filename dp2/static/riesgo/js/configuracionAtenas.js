
var getAllImpacts = "../../api/R_AgregarTiposImpacto";
$(document).ready(main);
localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main() {

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
     alert(cantidad);
     
     var data = new Array();

	for (var i=1; i<=cantidad;i++){
		var obj = $("#tipoRi" + i).val(); // valor de inputs
                data[i-1]=obj;
        
        }
        console.log(data);
        //var jsonData = JSON.stringify(data);
	$.ajax({
		type: 'GET',                
		url: getAllImpacts + '/' + data.idProyecto,
		dataType: "json",
		success: function(data){
			var lista = data;
			console.log(data);
			
		},
		fail: codigoError
	});
    //  alert(data);  
       
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
    