$(document).ready(function(){
	iniciaSolicitud();
});

function iniciaSolicitud(){        
	$.ajax({
		type: 'GET',
		url: '../../api/G_listarSolicitudesCambio',
		dataType: "json", // data type of response
        success: function(data){                    
            agregaDataFila(data);			
        }
	});
}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	if (data!=null){
		arreglo=data["lista_solic"];
	}
	 
	for (i=0; i<arreglo.length;i++){		
		agregaFilaProyecto(arreglo[i],i);
	}
}

function agregaFilaProyecto(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td>'+ arreglo["id_proy"] + '</td><td>' + arreglo["nomb_proy"] + '</td><td>' + arreglo["nomb_jefe"] + '</td><td>' + arreglo["est"] + 
	'</td><td><button type="button" class="btn btn-primary" onclick="$(location).attr(\'href\',\'VisualizarSolicitudCambio.html\');">Ver</button></td></tr>';
	$("#ListaSolicitudes tbody").append(tbody);
	$("#ListaSolicitudes").trigger("update"); 
}