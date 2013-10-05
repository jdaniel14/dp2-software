var listaRecursosHumanos = "../../api/G_listarRecursoDisponible";
var asignarRecursosProyecto = "../../api/G_asignarRecursoProyecto";

$(document).ready(function(){
	$(".seleccionado").removeClass("seleccionado");
    $("#pasar").click(function(){
        $(".seleccionado").each(function(){
            	$(this).append("<td><input type='text' placeholder='Inserta costos…''></td><td><button type='button' class='btn btn-danger'>Eliminar</button></td>")
               $("#ListaRecursosHumanosXProyecto").append($(this));
              
        })
    }) 
    $("#btnGuardar").click(function(){
    	grabarRecursos();
    })
});

function grabarRecursos(){

	$.ajax({
		type: 'POST',
		url: asignarRecursosProyecto,
		dataType: "json", // data type of response
		async: true,
        success: function(data){                    
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
	
	if (data!=null){
		arreglo=data["l_recurso"];
	}
	
	for (i=0; i<arreglo.length;i++){
            agregaFilaRecursosHumanos(arreglo[i],i);
                
	}
}

function agregaFilaRecursosHumanos(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr class="fila'+a+'"><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["rol"] + '</td></tr>';
	//$(tbody).click(clickRecurso);
	$("#listaRecursosHumanos tbody").append(tbody);
	$("#listaRecursosHumanos").trigger("update"); 
	$(".fila"+a).click(clickRecurso);
}

