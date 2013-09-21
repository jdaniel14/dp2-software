var rootURL = "../../api/G_registrarActa";
var rootURLdevuelveActa = "../../api/G_devuelveActa";
var rootURLregistrarInfoActa = "../../api/G_registrarInformacionActa";
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
$("#btnGrabarInformacion").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarInformacionActa();
	}
});
function grabarRecursos(){
	alert("Se grabó");
}

function grabarInformacionActa(){
	var obj ={
		"idProyecto": $("#idProyecto").val(),
		"np": $("#nombreProyecto").val(),
		"pap": $("#patrocinador").val(),
		"fpp": $("#preparacionFecha").val(),
		"tp": $("#tipoProyecto").val(),
		"pp": $("#prioridadProyecto").val()
	}; 
	
	$.ajax({
		type: 'POST',
		url: rootURLregistrarInfoActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
                    
                    alert(data);
                }
	});
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
