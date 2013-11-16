var buscarRecursosProyectoFecha = "../../api/G_listarRecursoDisponible";
var asignarRecursosProyecto = "../../api/G_asignarRecursoProyecto";
var verificarLineaBase ="../../api/G_verificaLineaBase/";
//var buscarRecursosProyectoFecha = "../../api/G_buscarRecursosDisponibleFecha";

$(document).ready(function(){
	listarRRHHxProyecto();
	verificaLineaBase();
	$(".seleccionado").removeClass("seleccionado");
    $("#pasar").click(function(){
        $(".seleccionado").each(function(){
            	$(this).append("</td><td><button type='button' class='btn btn-danger' onclick = asd($(this).parent().parent());>Eliminar</button></td>");
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
				
				if (el.cells[4].children[0].value!="" && el.cells[5].children[0].value!="" && el.cells[6].children[0].value!="" && el.cells[7].children[0].value!=""){
					var rec = {
						idrec :  el.cells[0].innerHTML, 
						prof_act : el.cells[4].children[0].value,
						costohh : el.cells[5].children[0].value,
						fi : el.cells[6].children[0].value,
						ff : el.cells[7].children[0].value,
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

function asd(www){
	www.removeClass("noMostrar");
	www.remove();
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
        	//alert(data.me);
            alert("Ya se inserto");
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
	var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>'+ arreglo["rol"] + '</td><td>' + arreglo["prof_base"] + 

		'</td><td>'+ arreglo["prof_act"] +
		'</td><td>' + arreglo["costo"] +
		'</td><td>' + arreglo["fechaini"] +
		'</td><td>' + arreglo["fechafin"] +
		'<td><button type="button" class="btn btn-danger" onclick = asd($(this).parent().parent());>Eliminar</button></td></tr>';

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
	alert(JSON.stringify(envio));
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
	
	var profesion = "<select class='form-control input-sm'>"+
					 "<option value='1'>Analista 1</option>"+
					 "<option value='2'>Analista 2</option>"+
					 "<option value='3'>Desarrollador 1</option>"+
					 "<option value='4'>Desarrollador 2</option>"+
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
        		$("#btnAsignarRecursos").removeClass('disabled');
			} else {
				$("#btnAsignarRecursos").addClass('disabled');
			}	
		}
	});
}