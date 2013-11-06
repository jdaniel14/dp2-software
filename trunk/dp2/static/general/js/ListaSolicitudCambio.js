var listarSolicitud ="../../api/G_listarSolicitudesCambio";
var visualizarSolicitud ="../../api/G_visualizarSolicitudCambio/";
var aprobarSolicitud = "../../api/G_aprobarSolicitudCambio";

$(document).ready(function(){
	listaSolicitud();
});


//Lista las solicitudes

function listaSolicitud(){        
	$.ajax({
		type: 'GET',
		url: listarSolicitud,
		dataType: "json", // data type of response
        success: function(data){
        	console.log(data);
            agregaDataFila(data);

            $(".btn.btn-primary").click(function(){
				var auxtd = $(this).closest("tr").find("td");
				var idProyecto = auxtd[0].innerHTML;
				var nombreProyecto = auxtd[1].innerHTML;				

				visualizaSolicitud(idProyecto,nombreProyecto);
			});
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


//Visualiza una solicitud de la lista

function visualizaSolicitud(idProyecto,nombreProyecto){
	$("#nombreProyecto").val(nombreProyecto);

	$.ajax({
		type: 'GET',
		url: visualizarSolicitud + idProyecto,
		dataType: "json", // data type of response
        success: function(data){            
          	var cad = data["flag_cambio"].toString();
          	var rubros = '';

          	if (cad.charAt(0)=='1') { rubros+="Alcance - "; }
        	if (cad.charAt(1)=='1') { rubros+="Cronograma - "; }
        	if (cad.charAt(2)=='1') { rubros+="Costo - "; }

        	$("#rubroCambio").val(rubros.substring(0,rubros.length-2));
        	$("#descripcion").html(data["descripcion"]);
        	$("#justificacion").html(data["justificacion"]);            
        }
	});
}


//Se acepta la solicitud

$("#btnAprobar").click(function(){
	if (confirm("¿Está seguro que desea aprobar la solicitud de cambio?")){
		flag = 1;
		apruebaSolicitud(flag);
	}
});

$("#btnRechazar").click(function(){
	if (confirm("¿Está seguro que desea rechazar la solicitud de cambio?")){
		flag = 0;
		apruebaSolicitud(flag);
	}
});

function apruebaSolicitud(flag){
	var jsonCliente = {
		flag_Cambio : flag
    };

    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonCliente),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: aprobarSolicitud,
        success: function (data) {
        	if (flag==1) { alert("Solicitud de cambio APROBADA con éxito");	}
        	if (flag==0) { alert("Solicitud de cambio RECHAZADA con éxito"); }

            $(location).attr('href','ListaSolicitudes.html');
        }
    });
}