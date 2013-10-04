var rootURL = "../../api/G_listaProyecto";

$(document).ready(function(){
	iniciaProyectos();
});

function iniciaProyectos(){
	
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
        success: function(data){                    
            agregaDataFila(data);
            $(".btn.btn-primary").click(function(){
				var auxtd = $(this).closest("tr").find("td");
				var idProyecto = auxtd[0].innerHTML;		
				localStorage.setItem("idProyecto",idProyecto);
				$(location).attr('href','MenuProyecto.html');
			});
        }
	});
}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	if (data!=null){
		arreglo=data["prs"];
	}
	
	for (i=0; i<arreglo.length;i++){		
		agregaFilaProyecto(arreglo[i],i);
	}
}

function agregaFilaProyecto(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["jp"] + '</td><td>' + arreglo["tp"] + '</td><td>' + arreglo["fi"] + '</td><td>' + arreglo["ff"] + 
	'</td><td><button type="button" class="btn btn-primary">Administrar</button></td></tr>';
	$("#listaProyectos tbody").append(tbody);
	$("#listaProyectos").trigger("update"); 
}