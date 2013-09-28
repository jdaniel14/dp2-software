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
var id_proyecto=localStorage.getItem("idProyecto");

function cargaData(data){

	

	if (data!=null){
		arreglo=data["acta"];
	}
	
	for(key in arreglo){

		
		if(key=="np"){
			document.getElementsByTagName('h1')[0].innerHTML=arreglo[key];
		}
		if($('#'+key).is("select"))continue;
			$('#'+key).html(arreglo[key]);
			$('#'+key).val(arreglo[key]);	
		
	}

	var selects = $("select");
	if (data!=null){
		arreglo=data["acta"];
	}
	for (var i = 0; i < selects.length; i++) {
		$(selects[i]).val(arreglo[selects[i].id]);
		if($(selects[i]).hasClass("changeable")){
			$(selects[i]).attr("disabled","disabled");
		}
	}
	if (data!=null){
		arreglo=data["acta"];
	}
	for(key in arreglo){

		
		if(key=="fpp"){
			$('#'+key).html(arreglo[key].substring(0,10));
			$('#'+key).val(arreglo[key].substring(0,10));
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

	cargarComboJefeProyecto();


		//document.getElementById("#nameProyect").innerHTML = nombre_proyecto.val() ;
		
	$("#idProyecto").attr("value", id_proyecto);
	$.ajax({
		type: 'GET',
		url : '../../api/G_devuelveActa/'+id_proyecto,
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
                //alert('ona vez mas, ahora :(  hector q dices');
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
	alert("hola");
        var obj ={
		idProyecto   : $("#idProyecto").val(),
		np           : $("#np").val(),
		fpp         : $("#fpp").val(),
		tp          : $("#tp").val(),
		pp          : $("#pp").val()
	}; 
        alert(JSON.stringify(obj));
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
		cap: $("#calp").val()
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


	$.ajax({
		type: 'POST',
		url: rootURLregistrarAutorActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
                    
                    alert("Se grabaron los datos wuju!");
                }
	});
}

function codigoError(){
	alert('Error');
}
function cargarComboTipoproyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_listaTipoProyecto',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id"]);
				opt.html(data[obj]["nom"]);
				$("#tp").append(opt);
			}
		}
	});
}
function cargarComboPrioridadproyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_devuelvePrioridad',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async:false,
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["idPrioridad"]);
				opt.html(data[obj]["nom"]);
				$("#pp").append(opt);
			}
		}
	});
}
function cargarComboJefeProyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_listaJefeProyectos',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id"]);
				opt.html(data[obj]["nom"]);
				$("#jp").append(opt);
			}
		}
	});
}
