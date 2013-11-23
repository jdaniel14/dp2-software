var rootURL = "../../api/G_registrarActa";
var rootURLdevuelveActa = "../../api/G_devuelveActa";
var rootURLregistrarInfoActa = "../../api/G_registrarInformacionActa";
var rootURLregistrarDescActa = "../../api/G_registrarDescripcionActa";
var rootURLregistrarObjActa = "../../api/G_registrarObjetivosActa";
var rootURLregistrarAutorActa = "../../api/G_registrarAutoridadActa";
var rootURLregistrarObjetivosActa="../../api/G_registrarObjetivosPorProyecto";

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
	$.ajax({
		type: 'GET',
		url: '../../api/G_listarObjetivosPorProyecto/'+ id_proyecto,
		dataType: "json", // data type of response
		contentType: "application/json; charset=utf-8",
        success: cargaObjetivos
	});

	validacion();
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
$("#btnGrabarPerformance").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
                //alert('ona vez mas, ahora :(  hector q dices');
		grabarPerformanceActa();
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
$("#btnAgregarObjetivo").click(function(){
var objetivo = "<tr><td><textarea class='form-control obj' placeholder='Ingrese la descripcion del Objetivo'></textarea></td></tr>";
	$("#Objetivos tbody").append(objetivo);
});
function cargaObjetivos(data){
	if (data!=null){
		arreglo=data["l_objetivos"];
	}
	
	for (i=0; i<arreglo.length;i++){
		agregaFilaObjetivos(arreglo[i],i);
	}
}
function agregaFilaObjetivos(arreglo,i){
	a=i;
	a++;
	
	var tbody = '<tr><td><textarea id="'+arreglo["id"]+'" class="form-control obj" >'+arreglo["desc"]+'</textarea></td></tr>';
	$("#Objetivos").append(tbody);
	$("#Objetivos").trigger("update"); 
}
function grabarRecursos(){
	alert("Se grabó");
}

function grabarInformacionActa(){
    
    var obj ={
		idProyecto   : $("#idProyecto").val(),
		np           : $("#np").val(),
		fpp         : $("#fpp").val(),
		tp          : $("#tp").val(),
		pp          : $("#pp").val()
	}; 
       // alert(JSON.stringify(obj));
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
function grabarPerformanceActa(){	
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
function grabarObjetivosActa(){	
    var objetivos = $(".obj");
    var obj = {};
    var l_objetivos=[];
    
    obj["id"]=id_proyecto;
    for(var i=0; i < objetivos.length; i++){
    	var aux={
	    	desc:"",
	    	ido:""
	    };
		aux.desc = objetivos[i]["value"];
		aux.ido = objetivos[i]["id"];
		l_objetivos.push(aux);
	}
	obj["l_objetivos"]=l_objetivos;
	        alert(JSON.stringify(obj));
	$.ajax({
		type: 'POST',
		url: rootURLregistrarObjetivosActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
                    
            		alert("Se grabaron los datos wuju!");
                }
	});
}
function grabarAutoridadActa(){
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

function validacion() {
    $('#registrarActa1').validate({
        rules: {
          idProyecto 	: { required: true, number: true },
          np   			: { required: true },
          fpp 			: { required: true },
          tp       		: { required: true },
          pp       		: { required: true }
        },

        messages: {
          idProyecto 	: { required: 'Debe ingresar el id del proyecto', number: 'Debe ingresar solo numeros' },
          np   			: { required: 'Debe ingresar el nombre del proyecto' },
          fpp 			: { required: 'Debe ingresar la fecha de preparación del proyecto' },
          tp       		: { required: 'Debe elegir el tipo de proyecto' },
          pp       		: { required: 'Debe elegir la prioridad del proyecto' }
        },

        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        
        success: function(element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        }
    });

	$('#registrarActa2').validate({
        rules: {
          dp 	: { required: true }
        },

        messages: {
          dp   	: { required: 'Debe ingresar la descripción del proyecto' }
        },

        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        
        success: function(element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        }
    });
	
	$('#registrarActa3').validate({
        rules: {
          cp 	: { required: true, number: true },
          plp   : { required: true, number: true },
          calp  : { required: true }
        },

        messages: {
          cp 	: { required: 'Debe ingresar el costo del proyecto', number: 'Debe ingresar solo numeros' },
          plp   : { required: 'Debe ingresar el plazo del proyecto', number: 'Debe ingresar solo numeros' },
          calp  : { required: 'Debe ingresar la calidad del proyecto' }
        },

        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        
        success: function(element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        }
    });

	//registrarActa4 crea html dinamicamente, x eso no hay validaciones x ahora

    $('#registrarActa5').validate({
        rules: {
          jp 	: { required: true },
          jcp   : { required: true, lettersonly: true },
          pap  	: { required: true, lettersonly: true }
        },

        messages: {
          jp 	: { required: 'Debe ingresar el jefe del proyecto' },
          jcp   : { required: 'Debe ingresar el jefe de comite de seguimiento del proyecto', lettersonly: 'Debe ingresar solo letras' },
          pap  	: { required: 'Debe ingresar el patrocinador del proyecto', lettersonly: 'Debe ingresar solo letras' }
        },

        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        
        success: function(element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        }
    });
}

//Se implementa la regla "lettersonly" para validar que se ingresen solo letras y espacios
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
}, "Letters only please");