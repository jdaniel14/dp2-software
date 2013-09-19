var rootURL = "../../api/G_registrarActa";
var rootURLdevuelveActa = "../../api/G_devuelveActa"

var codProyecto='1';

$(document).ready(function() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;       
    $("#modificacionFecha").attr("value", today);
});
$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRecursos();
	}
});
function grabarRecursos(){
	alert("Se grabó");
}

function iniciaActa(){
	
	$.ajax({
		type: 'GET',
		url: rootURLdevuelveActa,
		dataType: "json", // data type of response	
		fail: codigoError,
                success: function(data){
                    
                    llenaActa(data);
                }
	});
}
function codigoError(){
	alert('Error');
}
function llenaActa(data){
	for(key in data){i
		if($('#'+key)I/html(data[key]);
		$('#'+key).val(data[key])
	}
	var estado = $("#id_estado");
	var responsable = $("#id_empleado_responsable");
	var organizacion = $("#id_compania_responsable");
	var arreglo = $("select");
	for (var i = 0; i < arreglo.length; i++) {
		$(arreglo[i]).val(data[arreglo[i].id]);
		if($(arreglo[i]).hasClass("changeable")){
			$(arreglo[i]).attr("disabled","disabled");
		}
	}
}