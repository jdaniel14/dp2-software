var listaRecursosHumanos = "../../api/G_listarRecurso";

$(document).ready(function(){
	iniciaRecursosHumanos();
});

function iniciaRecursosHumanos(){
	
	$.ajax({
		type: 'GET',
		url: listaRecursosHumanos,
		dataType: "json", // data type of response
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

function agregaFilaLeccionAprendida(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["rol"] + '</td><td><input type="checkbox" /></td></tr>';
	$("#listaRecursosHumanos tbody").append(tbody);
	$("#listaRecursosHumanos").trigger("update"); 
}