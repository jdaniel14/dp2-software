$("#btnAgregaRH").click(function(){
    $(location).attr('href','RegistrarRecursoHumano.html');
});
$(document).ready(function(){
	iniciaRepositorio();
});
function iniciaRepositorio(){
	
	$.ajax({
		type: 'GET',
		url: '../../api/G_devuelveListaEmpleadosFull',
		dataType: "json", // data type of response
        success: function(data){                    
            agregaDataFila(data);
            $(".btn.btn-info").click(function(){
				var auxtd = $(this).closest("tr").find("td");
				var idEmpleado = auxtd[0].innerHTML;
				localStorage.setItem("idEmpleado",idEmpleado);
				$(location).attr('href','ModificarRecursoHumano.html');
			});
        }
	});
}
function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	if (data!=null){
		arreglo=data["lista"];
	}
	
	for (i=0; i<arreglo.length;i++){		
		agregaEmpleado(arreglo[i],i);
	}
}
function agregaEmpleado(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td style="display:none">'+ arreglo["id_emp"] + '</td><td>' + arreglo["noms"] + '</td><td>' + arreglo["aps"] + '</td><td>' + arreglo["em"] + '</td><td>' + arreglo["user"] +  '</td><td>' + arreglo["descpr"]+'</td></tr>';
	$("#repositorioRH tbody").append(tbody);
	$("#repositorioRH").trigger("update"); 
}