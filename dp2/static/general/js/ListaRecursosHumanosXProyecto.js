var listaRecursosHumanos = "../../api/G_listarRecursoDisponible";



$("#btnAsignarRecursos").click(function(){	
	iniciaRecursosHumanos();
	$("table.tablesorter tr").each(function(){
        $(this).click(function(){
        	 if($(this).attr("class") == 'fila'){
              $(this).removeClass('fila');
              $(this).addClass('seleccionado');   
           }else{
              $(this).removeClass('seleccionado');
              $(this).addClass('fila');
           }   
        })
    });
    $("#pasar").click(function(){
        $("table.tablesorter tr").each(function(){
            if($(this).attr("class") == 'seleccionado'){
               $("#guardarRegistros").append($(this));
            }  
        })
    }) 
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

function agregaFilaRecursosHumanos(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr class="fila"><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["rol"] + '</td></tr>';
	$("#listaRecursosHumanos tbody").append(tbody);
	$("#listaRecursosHumanos").trigger("update"); 
}

