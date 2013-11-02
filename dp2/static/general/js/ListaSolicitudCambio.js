$(document).ready(function(){
	listaSolicitud();
});


//Listar solicitudes de cmambios

function listaSolicitud(){        
	$.ajax({
		type: 'GET',
		url: '../../api/G_listarSolicitudesCambio',
		dataType: "json", // data type of response
        success: function(data){
            agregaDataFila(data);

            $(".btn.btn-primary").click(function(){
				var auxtd = $(this).closest("tr").find("td");
				var idProyecto = auxtd[0].innerHTML;
				var nombreProyecto = auxtd[1].innerHTML;				

				visualizaSolicitud(idProyecto,nombreProyecto);
			});
            
            /*
            $("myModal").modal("toogle");

            $(".btn.btn-primary").click(function(){
            	var tr = $(this).parent().parent();
				var auxtd = $(this).closest("tr").find("td");
				var idProyecto = auxtd[0].innerHTML;		

				//console.log(idProyecto);
				$.each(data.lista_solic,function(e,el){
					if(el.id_proy == idProyecto){
						
					}
				});
				//localStorage.setItem("idProyecto",idProyecto);
				//$(location).attr('href','MenuProyecto.html');
			});	
			*/
        }
	});
}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	if (data!=null){
		arreglo=data["lista_solic"];
	}
	 
	for (i=0; i<arreglo.length;i++){		
		agregaFilaSolicitud(arreglo[i],i);
	}	
}

function agregaFilaSolicitud(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td>'+ arreglo["id_proy"] + '</td><td>' + arreglo["nomb_proy"] + '</td><td>' + arreglo["nomb_jefe"] + '</td><td>' + arreglo["est"] + 
	'</td><td><a data-toggle="modal" href="#myModal" id="btnVer" class="btn btn-primary">Ver</a></td></tr>';
	//tbody += '<tr style = "display:none"></tr>'
	$("#ListaSolicitudes tbody").append(tbody);
	$("#ListaSolicitudes").trigger("update"); 
}

function visualizaSolicitud(idProyecto,nombreProyecto){
	$("#nombreProyecto").val(nombreProyecto);

	$.ajax({
		type: 'GET',
		url: '../../api/G_visualizarSolicitudCambio/' + idProyecto,
		dataType: "json", // data type of response
        success: function(data){
            for (obj in data){
              	var cad = data[obj]["flag_cambio"];

            	if (cad[0]==1) { $("#rubroCambio").html("Alcance "); }
            	if (cad[1]==1) { $("#rubroCambio").html("Cronograma "); }
            	if (cad[2]==1) { $("#rubroCambio").html("Costo "); }

            	$("#descripcion").html(data[obj]["descripcion"]);
            	$("#justificacion").html(data[obj]["justificacion"]);
            }
        }
	});
}