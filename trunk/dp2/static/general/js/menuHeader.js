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
			if(arreglo[key] != null) {
				var dia=arreglo[key].substring(8,10);
				console.log(dia);
				var mes=arreglo[key].substring(5,7);
				console.log(mes);
				var anho=arreglo[key].substring(0,4);
				console.log(anho);
				$('#'+key).html(dia+'-'+mes+'-'+anho);
				$('#'+key).val(dia+'-'+mes+'-'+anho);
			}
		} 	
	}
}

$(document).ready(function(){
	id_proyecto = localStorage.getItem("idProyecto");
	validaActa();
});
function validaActa(){
	$.ajax({
		type: 'GET',
		url: '../../api/G_devuelveActa/'+id_proyecto,
		dataType: "json", // data type of response
        success: function(data){
        	$("#fpp").datepicker({ dateFormat: 'dd-mm-yy' });

        	if (data["acta"]["fpp"]!=null){
        		$("#acta").show();
        		cargarComboTipoproyecto();
	
				cargarComboPrioridadproyecto();

				cargarComboJefeProyecto();

				$("#idProyecto").attr("value", id_proyecto);

				cargaData(data);

				coso();

        	}
        	else{
        		$("#muestraActa").hide();
        		$("#alertNoActa").show();
        	}
            		
        }
	});

}
function coso(){
	$.ajax({
		type: 'GET',
		url: '../../api/G_listarObjetivosPorProyecto/'+ id_proyecto,
		dataType: "json", // data type of response
		contentType: "application/json; charset=utf-8",
        success: cargaObjetivos
	});
}
$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarRecursos();
	}
});
$("#btnGrabarInformacion").click(function(){
	   grabarInformacionActa();
    
});

$("#btnGrabarDescripcion").click(function(){
	   grabarDescripcionActa()
    
});

$("#btnGrabarPerformance").click(function(){
	   grabarPerformanceActa();
    
});

$("#btnGrabarObjetivos").click(function(){
       grabarObjetivosActa();

});

$("#btnGrabarAutoridad").click(function(){
        bootbox.dialog({
          message: "¿Estás seguro que deseas guardar los cambios realizados?",
          title: "Confirmación",
          buttons: {
            success: {
              label: "Sí",
              className: "btn-success",
              callback: function() {
                grabarAutoridadActa();
              }
            },
            danger: {
              label: "No",
              className: "btn-danger",
              callback: function() {
                 //cierra el modal
              }
            },
          }
        });
 
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
					$('[data-toggle="tab"][href="#dp1"]').show();
					$('[data-toggle="tab"][href="#dp1"]').tab('show'); 
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
					$('[data-toggle="tab"][href="#perp"]').show();
					$('[data-toggle="tab"][href="#perp"]').tab('show'); 
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
					$('[data-toggle="tab"][href="#op"]').show();
					$('[data-toggle="tab"][href="#op"]').tab('show'); 
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
	        //alert(JSON.stringify(obj));
	$.ajax({
		type: 'POST',
		url: rootURLregistrarObjetivosActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
					$('[data-toggle="tab"][href="#ap1"]').show();
					$('[data-toggle="tab"][href="#ap1"]').tab('show');
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
		pap: $("#pap").val()
	};


	$.ajax({
		type: 'POST',
		url: rootURLregistrarAutorActa,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
             		  $(location).attr('href','MenuProyecto.html');
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