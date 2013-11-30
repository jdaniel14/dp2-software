var buscarRecursosProyectoFecha = "../../api/G_listarRecursoDisponible";
var asignarRecursosProyecto = "../../api/G_asignarRecursoProyecto";
var verificarLineaBase ="../../api/G_verificaLineaBase/";
//var buscarRecursosProyectoFecha = "../../api/G_buscarRecursosDisponibleFecha";
var profesion = "";
  
$(document).ready(function(){
	$("#fi").datepicker({ dateFormat: 'dd-mm-yy' });
	$("#ff").datepicker({ dateFormat: 'dd-mm-yy' });
	
	verificaLineaBase();
	llenar_profesion();
	listarRRHHxProyecto();
	//validacion();
	$(".seleccionado").removeClass("seleccionado");
    $("#pasar").click(function(){
        $(".seleccionado").each(function(){
        		$(this).prepend("<td></td>");
            	$(this).append("<td><button type='button' class='btn btn-danger' onclick = asd($(this).parent().parent());>Eliminar</button></td>");
            	$(this)
            	$(this).removeClass("seleccionado");
            	$(this).addClass("noMostrar");
            	//console.log("click");
               $("#ListaRecursosHumanosXProyecto").append($(this));
              	$("#ListaRecursosHumanosXProyecto").trigger("update"); 
        })
    }) 
    $("#btnGuardar").click(function(){
    	var arrayTR = $(".noMostrar");    	
    	var id_proyecto = localStorage.getItem("idProyecto");
    	var bool = true;
    	var lista_recursos = [];

    	if(arrayTR.length != 0 ){

    		$(arrayTR).each(function(e,el){
			//console.log("Valor1: " + el.cells[0].innerHTML);
			//console.log("Valor2: " + $($( $(el).children("td")[3])).children("input").val());
				
				if (el.cells[5].children[0].value!="" && el.cells[6].children[0].value!="" && el.cells[7].children[0].value!="" && el.cells[8].children[0].value!=""){
					var rec = {
						idrec :  el.cells[1].innerHTML, 
						accion : "I",
						prof_act : el.cells[5].children[0].value,
						costohh : el.cells[6].children[0].value,
						fi : el.cells[7].children[0].value,
						ff : el.cells[8].children[0].value,
						XD : "Bonnie se come los mocos"
					}
					lista_recursos.push(rec);

				}
				else bool=false;
				
			});

    		if (bool)
			{
				var envio = {
    				id_proy : id_proyecto,
    				l_rrhhxpr : lista_recursos
    			};
    			console.log(JSON.stringify(envio));
    			//console.log("listo para envio");
    			grabarRecursos(envio);
			}
			else alert("Llene todos los campos correctamente");

    	} 
    	else alert("No hay filas que modificar");
    })
});

function llenar_profesion(){
	
	$.ajax({
		type: 'GET',
		url:  "../../api/G_listaProfesionRecurso",
		dataType: "json", // data type of response
		async: false,
        success: function(data){
        	//console.log(data);
        	data = data["profesiones"];
        	//console.log(data["p"]);
        	profesion = "<select class='form-control input-sm'>";
        	for (i=0; i<data.length;i++){		
        		profesion += "<option value=\'" + data[i]["id"] +"\'>" + data[i]["nom"] + "</option>";
        		//console.log(profesion);
        	}
        	profesion += "</select>";
        }
	});
	
}

function asd(www,id){
	
	if (id!=null){
		var envio = {
			accion : "M",
			id_rrhhxpr : id
		};
		$.ajax({
			type: 'POST',
			dataType: "json", // data type of response
			data: JSON.stringify(envio),
			contentType: "application/json; charset=utf-8",
			url: "../../api/G_eliminarRecursoProyecto",
	        success: function(data){
	  
	            $(location).attr('href','ListaRecursosHumanosXProyecto.html'); 
	        }
		});	
	}
	else{
		www.removeClass("noMostrar");
		www.remove();
	} 
	
		
}

function enviarDataSJ(){
	var arrayTR = $("#ListaRecursosHumanosXProyecto").children("tr");
	console.log(arrayTR);
	
}

function grabarRecursos(envio){

	$.ajax({
		type: 'POST',
		url: asignarRecursosProyecto,
		dataType: "json", // data type of response
		data: JSON.stringify(envio),
		async: true,
        success: function(data){
        	if(data.me==""){
        		alert("Ya se inserto");
            	$(location).attr('href','ListaRecursosHumanosXProyecto.html');
        	} else {
        		alert(data.me);
        	}
        }
	});

}
function clickRecurso(){
	if( $(this).hasClass("seleccionado")){
        	 	$(this).removeClass('seleccionado');
                 
	           }else{
	              $(this).addClass('seleccionado');
	           }
}
$("#btnAsignarRecursos").click(function(){
	$("#busquedaRecursosDisponibles").show();	
	$("#tablaRecursosDisponibles").hide();	
	limpiaRecursosHumanos();
});


function limpiaRecursosHumanos(){
	$("#listaRecursosHumanos tbody").html("");
}


/*Lista de RRHH por Proyecto*/

var id=localStorage.getItem("idProyecto");
var nombre=localStorage.getItem("nombreProyecto");
document.getElementsByTagName('h1')[0].innerHTML=nombre;

function listarRRHHxProyecto(){	
	$.ajax({
		type: 'GET',
		dataType: "json", // data type of response
		contentType: "application/json; charset=utf-8",
		url: "../../api/G_listaRecursoxProyecto/" + id,
        success: function(data){
            agregaDataFila2(data);
        }
	});
}

function agregaDataFila2(data){
	//arreglo=arregloProyecto;
	
	if (data!=null){
		arreglo=data["l_recurso"];
	}
	
	for (i=0; i<arreglo.length;i++){		
		agregaFilaRecursosHumanos2(arreglo[i],i);
	}
}

function agregaFilaRecursosHumanos2(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	if (i==0) 
	{
		var tbody = '<tr><td>'+ arreglo["idmxe"] + '</td><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>'+ arreglo["rol"] + '</td><td>' + arreglo["prof_base"] + 

		'</td><td>'+ arreglo["prof_act"] +
		'</td><td>' + arreglo["costo"] +
		'</td><td>' + arreglo["fechaini"] +
		'</td><td>' + arreglo["fechafin"] +
		'<td><button type="button" disabled="disabled" class="btn btn-danger" onclick = asd($(this).parent().parent(),'+arreglo["idmxe"]+');>Eliminar</button></td></tr>';
	}
	else
	{
		var FlagLB = localStorage.getItem("FlagLB");
		if (FlagLB=="true"){
			var tbody = '<tr><td>'+ arreglo["idmxe"] + '</td><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>'+ arreglo["rol"] + '</td><td>' + arreglo["prof_base"] + 

		'</td><td>'+ arreglo["prof_act"] +
		'</td><td>' + arreglo["costo"] +
		'</td><td>' + arreglo["fechaini"] +
		'</td><td>' + arreglo["fechafin"] +
		'<td><button type="button"  disabled="disabled" class="btn btn-danger" onclick = asd($(this).parent().parent(),'+arreglo["idmxe"]+');>Eliminar</button></td></tr>';	
		}
		else {
			var tbody = '<tr><td>'+ arreglo["idmxe"] + '</td><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>'+ arreglo["rol"] + '</td><td>' + arreglo["prof_base"] + 

		'</td><td>'+ arreglo["prof_act"] +
		'</td><td>' + arreglo["costo"] +
		'</td><td>' + arreglo["fechaini"] +
		'</td><td>' + arreglo["fechafin"] +
		'<td><button type="button" class="btn btn-danger" onclick = asd($(this).parent().parent(),'+arreglo["idmxe"]+');>Eliminar</button></td></tr>';	
		}
			
	}
	

	$("#ListaRecursosHumanosXProyecto tbody").append(tbody);
	$("#ListaRecursosHumanosXProyecto").trigger("update"); 
}
//console.log($($("#ListaRecursosHumanosXProyecto").children("td")[0]).text());
//console.log($($("#ListaRecursosHumanosXProyecto")[0]["children"]));
//console.log($('#ListaRecursosHumanosXProyecto tr:nth-child(1)'));
//$('.myclass tr:nth-child(2)')
//console.log($("#ListaRecursosHumanosXProyecto"));
//$($(el).children("td")[0]).text()
$("#buscar").click(function(){
	var envio = {fi : $("#fi").val(),
				ff : $("#ff").val(),
				idProyecto:id
				};
   	//console.log(JSON.stringify(envio));
	//alert(JSON.stringify(envio));
   	$.ajax({
		type: 'POST',
		url: buscarRecursosProyectoFecha,
		dataType: "json", // data type of response
		data: JSON.stringify(envio),
		async: false,
        success: function(data){
	        $("#busquedaRecursosDisponibles").hide();
	        $("#pasar").show();
	        $("#tablaRecursosDisponibles").show();	
	        agregaDataFila(data); 
	        $("#listaRecursosHumanos").trigger("update"); 
        }
	});
}) 

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	//console.log(data);
	var arrAux = $(".noMostrar");

	
	if (data!=null){
		arreglo=data["l_recurso"];
	}
	
	for (i=0; i<arreglo.length;i++){
		var bool = false;
		$.each(arrAux,function(e,el){
			//console.log("Valor: " + $($(el).children("td")[0]).text());
			//console.log($(el).children("td")[0]);
			//console.log(arreglo[i]["id"]);
			if($($(el).children("td")[0]).text() == arreglo[i]["id"]){
				bool = true;
				console.log(arreglo[i]["id"]);	
				console.log(bool);
			}
			//agregaFilaRecursosHumanos(arreglo[i],i);
		});
		if(!bool)agregaFilaRecursosHumanos(arreglo[i],i);
	}
}

function agregaFilaRecursosHumanos(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	//G_listaProfesionRecurso
	var profesion = "<select class='form-control input-sm'>"+
					 "<option value='6'>Analista 1</option>"+
					 "<option value='7'>Analista 2</option>"+
					 "<option value='8'>Desarrollador 1</option>"+
					 "<option value='9'>Desarrollador 2</option>"+
					"</select>";
	
	var fechaini="<input class='form-control input-sm' type='date' name='fechaini'>";
	var fechafin="<input class='form-control input-sm' type='date' name='fechafin'>";
	var rol = "Miembro de Equipo";

	var costohh = "<input  class='form-control input-sm' type='text' name='costohh'>"
	var tbody = '<tr class="fila'+a+'"><td>'+ arreglo["id"] + '</td><td>' +  arreglo["nom"]+ '</td><td>' + rol + '</td><td>'+ arreglo["prof"] + '</td><td>' + 
				profesion +'</td><td>' + costohh +'</td><td>' + fechaini +'</td><td>' + fechafin +'</td></tr>';
	
	//$(tbody).click(clickRecurso);
	$("#listaRecursosHumanos tbody").append(tbody);
	
	$(".fila"+(i+1)).click(clickRecurso);
}

function verificaLineaBase() {
	$.ajax({
		type: 'GET',
		url: verificarLineaBase + localStorage.getItem("idProyecto"),
		dataType: "json", // data type of response
        success: function(data){
        	if (data["estado_linea_base"]=="true") { //establecerLineaBase=TRUE
        		$("#btnAsignarRecursos").addClass('disabled');
        		$(".btn.btn-danger").addClass('disabled');
			} else {
				$("#btnAsignarRecursos").removeClass('disabled');
				$(".btn.btn-danger").removeClass('disabled');
			}	
			localStorage.setItem("FlagLB",data["estado_linea_base"]);
		}
	});

}

/*
function validacion() {
	$('#asignarRecurso').validate({
	    rules: {
	      fi : { required: true },
	      ff : { required: true, greaterThan: "#fi" }
	    },

	    messages: {
	      fi : { required: 'Debe ingresar la fecha inicial' },
	      ff : { required: 'Debe ingresar la fecha final', greaterThan: "La fecha final debe ser mayor a la fecha inicial" }
	    },

		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
		}
	  });
}


//Se implementa la regla "greaterThan" para validar que la fecha final sea mayor a la inicial
jQuery.validator.addMethod("greaterThan", 
function(value, element, params) {

    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
    }

    return isNaN(value) && isNaN($(params).val()) 
        || (Number(value) > Number($(params).val())); 
},'Must be greater than {0}.');
*/