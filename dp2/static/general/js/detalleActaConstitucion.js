var rootURL = "../../api/G_registrarActa";
var rootURLdevuelveActa = "../../api/G_devuelveActa";
var rootURLregistrarInfoActa = "../../api/G_registrarInformacionActa";
var rootURLregistrarDescActa = "../../api/G_registrarDescripcionActa";
var rootURLregistrarObjActa = "../../api/G_registrarObjetivosActa";
var rootURLregistrarAutorActa = "../../api/G_registrarAutoridadActa";

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var id_proyecto = getURLParameter("idProyecto");

function cargaData(data){
	for(key in data){
		if($('#'+key).is("select"))continue;
		$('#'+key).html(data[key]);
		$('#'+key).val(data[key])
	}
	var arreglo = $("select");
	for (var i = 0; i < arreglo.length; i++) {
		$(arreglo[i]).val(data[arreglo[i].id]);
		if($(arreglo[i]).hasClass("changeable")){
			$(arreglo[i]).attr("disabled","disabled");
		}
	}
}

$(document).ready(function() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;       
    $("#modificacionFecha").attr("value", today);


    cargarComboTipoproyecto();
	
	cargarComboPrioridadproyecto();

	$.ajax({
		type: 'GET',
		url : '../../api/G_devuelveActa/:'+id_paquete,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: cargaData
	});
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
$("#btnGrabarDescripcion").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
              //  alert('ahora hector q dices');
		grabarDescripcionActa();
	}
});
$("#btnGrabarObjetivos").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
                alert('ona vez mas, ahora :(  hector q dices');
		grabarObjetivosActa();
	}
});
$("#btnGrabarAutoridad").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarAutoridadActa();
	}
});
function grabarRecursos(){
	alert("Se grabó");
}

function grabarInformacionActa(){
    
        
	/*var obj ={
		idProyecto   : $("#idProyecto").val(),
		np           : $("#nombreProyecto").val(),
		fpp         : $("#preparacionFecha").val(),
		tp          : $("#tipoProyecto").val(),
		pp          : $("#prioridadProyecto").val()
	}; */
	
        var obj ={
		idProyecto   : $("#idProyecto").val(),
		np           : $("#np").val(),
		fpp         : $("#fpp").val(),
		tp          : $("#tp").val(),
		pp          : $("#pp").val()
	}; 
        //alert(JSON.stringify(obj));
	$.ajax({
		type: 'POST',
		url: rootURLregistrarInfoActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
                    
                    alert("Se grbaron los datos wuju!");
                }
	});
}
function grabarDescripcionActa(){
	/*var obj ={
		"idProyecto": $("#idProyecto").val(),
		"dp": $("#descripcion").val()
	}; */
        var obj ={
		idProyecto  : $("#idProyecto").val(),
		dp          : $("textarea#dp").val()
	};
	//alert(JSON.stringify(obj));
	$.ajax({
		type: 'POST',
		url: rootURLregistrarDescActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
                    
                    alert("Se grabaron los datos wuju!");
                }
	});
}
function grabarObjetivosActa(){
	/*var obj ={
		"idProyecto": $("#idProyecto").val(),
		"cp": $("#costoProy").val(),
		"plp": $("#plazo").val(),
		"cap": $("#calidad").val()
	}; */
	
        var obj ={
		idProyecto: $("#idProyecto").val(),
		cp: $("#cp").val(),
		plp: $("#plp").val(),
		cap: $("#cap").val()
	};
        
        //alert(JSON.stringify(obj));
	$.ajax({
		type: 'POST',
		url: rootURLregistrarObjActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
                    
            		alert("Se grabaron los datos wuju!");
                }
	});
}
function grabarAutoridadActa(){
	/*var obj ={
		"idProyecto": $("#idProyecto").val(),
		"ap": $("#autoProyecto").val(),
		"carp": $("#autoCargoProyecto").val(),
		"jp": $("#gerenteProyecto").val(),
		"jcp": $("#comiteProyecto").val(),
		"pap": $("#patrocinador").val(),
	}; */
	
        var obj ={
		idProyecto: $("#idProyecto").val(),
		ap: $("#ap").val(),
		carp: $("#carp").val(),
		jp: $("#jp").val(),
		jcp: $("#jcp").val(),
		pap: $("#pap").val(),
	};

        alert(JSON.stringify(obj));
	$.ajax({
		type: 'POST',
		url: rootURLregistrarAutorActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
                    
                    alert(data);
                }
	});
}

function codigoError(){
	alert('Error');
}
function cargarComboTipoproyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/cargarComboTipoproyecto/',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["idTipoProyecto"]);
				opt.html(data[obj]["descripcionTipoProyecto"]);
				$("#tp").append(opt);
			}
		}
	});
}
function cargarComboPrioridadproyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/cargarComboPrioridadproyecto/',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["idPrioridadProyecto"]);
				opt.html(data[obj]["descripcionPrioridadProyecto"]);
				$("#pp").append(opt);
			}
		}
	});
}
