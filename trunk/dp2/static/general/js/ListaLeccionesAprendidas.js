var rootURL = "../../api/G_listaLeccionesAprendidas";

$(document).ready(function(){
	iniciaLeccionesAprendidas();
});

function iniciaLeccionesAprendidas(){
	
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
        success: function(data){                    
            agregaDataFila(data);
            $(".btn.btn-default").click(function(){
				var auxtd = $(this).closest("tr").find("td");
				var idLeccionAprendida = auxtd[0].innerHTML;
				localStorage.setItem("idLeccionAprendida",idLeccionAprendida);
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
		agregaFilaLeccionAprendida(arreglo[i],i);
	}
}

function agregaFilaLeccionAprendida(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["jp"] + '</td><td>' + arreglo["tp"] + '</td><td>' + arreglo["fi"] + '</td><td>' + arreglo["ff"] + 
	'</td><td><button type="button" class="btn btn-default">Administrar</button></td></tr>';
	$("#listaLeccionAprendida tbody").append(tbody);
	$("#listaLeccionAprendida").trigger("update"); 
}