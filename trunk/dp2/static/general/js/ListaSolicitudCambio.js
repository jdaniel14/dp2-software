var listarSolicitud ="../../api/G_listarSolicitudesCambio";
var visualizarSolicitud ="../../api/G_visualizarSolicitudCambio/";
var verificarLineaBase ="../../api/G_verificaLineaBase/";
var aprobarSolicitud = "../../api/G_solicitudCambioAceptDeneg";

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
        	//console.log(data);
            agregaDataFila(data);

            $(".btn.btn-primary").click(function(){
      				var auxtd = $(this).closest("tr").find("td");
      				var idSolicitud = auxtd[0].innerHTML;
      				var idProyecto = auxtd[1].innerHTML;
      				var nombreProyecto = auxtd[2].innerHTML;
      					
      				localStorage.setItem("idSolicitud",idSolicitud);
      				localStorage.setItem("idProyecto",idProyecto);
      				localStorage.setItem("nombreProyecto",nombreProyecto);
      				
      				visualizaSolicitud();
      				verificaLineaBase();
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
	var tbody = '<tr><td>'+ arreglo["id_sol"] + '</td><td>' + arreglo["id_proy"] +
	'</td><td>' + arreglo["nomb_proy"] + '</td><td>' + arreglo["nomb_jefe"] + '</td><td>' + arreglo["est"] + 
	'</td><td><a data-toggle="modal" href="#myModal" id="btnVer" class="btn btn-primary">Ver</a></td></tr>';
	//tbody += '<tr style = "display:none"></tr>'
	$("#ListaSolicitudes tbody").append(tbody);
	$("#ListaSolicitudes").trigger("update"); 
}


//Visualiza una solicitud de la lista

function visualizaSolicitud(){
	$("#nombreProyecto").val(localStorage.getItem("nombreProyecto"));

	$.ajax({
		type: 'GET',
		url: visualizarSolicitud + localStorage.getItem("idProyecto"),
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
          $("#impacto").html(data["impacto"]);
          //$("#fecha").html(data["fecha"]);
        }
	});
}


//Se acepta o rechaza la solicitud

function verificaLineaBase() {
	$.ajax({
		type: 'GET',
		url: verificarLineaBase + localStorage.getItem("idProyecto"),
		dataType: "json", // data type of response
        success: function(data){
        	if (data["estado_linea_base"]=="true") { //establecerLineaBase=TRUE
        		$("#btnAprobar").removeClass('disabled');
				    $("#btnRechazar").removeClass('disabled');
    			} else {
    				$("#btnAprobar").addClass('disabled');
    				$("#btnRechazar").addClass('disabled');
    			}	
		}
	});
}

function apruebaSolicitud(flag){
	var jsonCliente = {
		id_proy : localStorage.getItem("idProyecto"),
		id_sol	: localStorage.getItem("idSolicitud"),
		flag 	  : flag
    };

    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonCliente),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: aprobarSolicitud,
        success: function (data) {
        	//if (flag==1) { alert("Solicitud de cambio APROBADA con éxito");	}
        	//if (flag==0) { alert("Solicitud de cambio RECHAZADA con éxito"); }
        	$(location).attr('href','ListaSolicitudes.html');   
        }
    });
}

$("#btnAprobar").click(function(){
	bootbox.dialog({
      message: "¿Estás seguro que deseas aprobar la solicitud de cambio?",
      title: "Confirmación",
      buttons: {
        success: {
          label: "Sí",
          className: "btn-success",
          callback: function() {
          	flag = 1;
            apruebaSolicitud(flag);
          }
        },
        danger: {
          label: "No",
          className: "btn-danger",
          callback: function() {
             //cierra el modal
          }
        },
      }
    });
});

$("#btnRechazar").click(function(){
	bootbox.dialog({
      message: "¿Estás seguro que deseas rechazar la solicitud de cambio?",
      title: "Confirmación",
      buttons: {
        success: {
          label: "Sí",
          className: "btn-success",
          callback: function() {
          	flag = 0;
            apruebaSolicitud(flag);
          }
        },
        danger: {
          label: "No",
          className: "btn-danger",
          callback: function() {
             //cierra el modal
          }
        },
      }
    });
});