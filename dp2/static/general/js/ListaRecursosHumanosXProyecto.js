var listaRecursosHumanos = "../../api/G_listarRecursoDisponible";
var asignarRecursosProyecto = "../../api/G_asignarRecursoProyecto";

$(document).ready(function(){
	listarRRHHxProyecto();
	$(".seleccionado").removeClass("seleccionado");
    $("#pasar").click(function(){
        $(".seleccionado").each(function(){
            	$(this).append("<td><input type='text' placeholder='Inserta costos…''></td><td><button type='button' class='btn btn-danger' onclick = asd($(this).parent().parent());>Eliminar</button></td>")//;
            	$(this).append("<td><select name='porcentaje'>" +
            					"<option value='10'>10%</option><option value='20'>20%</option><option value='30'>30%</option><option value='40'>40%</option>" +
            					"<option value='50'>50%</option><option value='60'>60%</option><option value='70'>70%</option><option value='80'>80%</option>" +	
            					"<option value='90'>90%</option><option value='100'>100%</option>" +
            		"</select></td>");
            	$(this).removeClass("seleccionado");
            	$(this).addClass("noMostrar");
            	
            	//console.log("click");
               $("#ListaRecursosHumanosXProyecto").append($(this));
              
        })
    }) 
    $("#btnGuardar").click(function(){
    	var arrayTR = $($("#ListaRecursosHumanosXProyecto").children("tbody")).children("tr");
    	//console.log("antes");
    	//console.log(arrayTR);
    	//console.log("despues");
    	
    	var id_proyecto = localStorage.getItem("idProyecto");
    	var bool = true;
    	var lista_recursos = [];
    	$.each(arrayTR,function(e,el){
			//console.log("Valor1: " + $($(el).children("td")[0]).text());
			//console.log("Valor2: " + $($( $(el).children("td")[3])).children("input").val());
			var idRec = $($(el).children("td")[0]).text();
			var montoAsignado = $($( $(el).children("td")[3])).children("input").val();
			var rec = {
					idr : idRec, 
					costo : montoAsignado
			}
			lista_recursos.push(rec);
			if(montoAsignado.length == 0 ) bool = false;
		});
    	
    	if(bool){
    		var envio = {
    				id_proy : id_proyecto,
    				l_rrhhxpr : lista_recursos
    			};
    		console.log(JSON.stringify(envio));
    		//console.log("listo para envio");
    		grabarRecursos(envio);
    	}
    	else alert("Llene los campos, por favor");
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
	limpiaRecursosHumanos();
	iniciaRecursosHumanos();

});


function limpiaRecursosHumanos(){
	$("#listaRecursosHumanos tbody").html("");
}
function iniciaRecursosHumanos(){
	$.ajax({
		type: 'GET',
		url: listaRecursosHumanos,
		dataType: "json", // data type of response
		async: true,
        success: function(data){                    
            agregaDataFila(data);   
        }
	});

}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	//console.log(data);
	
	var arrAux = $(".noMostrar");
	console.log(arrAux);
	
	if (data!=null){
		arreglo=data["l_recurso"];
	}
	
	for (i=0; i<arreglo.length;i++){
		var bool = false;
		$.each(arrAux,function(e,el){
			console.log("Valor: " + $($(el).children("td")[0]).text());
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
	var tbody = '<tr class="fila'+a+'"><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["rol"] + '</td><td>' + arreglo["porc"] + '</td></tr>';
	//$(tbody).click(clickRecurso);
	$("#listaRecursosHumanos tbody").append(tbody);
	$("#listaRecursosHumanos").trigger("update"); 
	$(".fila"+(i+1)).click(clickRecurso);
	console.log(".fila"+a);
}


/*Lista de RRHH por Proyecto*/

var id=localStorage.getItem("idProyecto");

function listarRRHHxProyecto(){	
	$.ajax({
		type: 'GET',
		dataType: "json", // data type of response
		contentType: "application/json; charset=utf-8",
		url: "../../api/G_listaRecursoxProyecto/" + id,
        success: function(data){
        	document.getElementsByTagName('h1')[0].innerHTML=data["nom_proy"];
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
	var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["rol"] + 
		'</td><td><input type="text" name="costo" placeholder="Inserta costos..." value="' + arreglo["costo"] + '">' +
		'</td><td>' + arreglo["porc"] + '</td><td>' +
		'</td><td><button type="button" class="btn btn-danger" onclick = asd($(this).parent().parent());>Eliminar</button></td></tr>';
	$("#ListaRecursosHumanosXProyecto tbody").append(tbody);
	$("#ListaRecursosHumanosXProyecto").trigger("update"); 
}
