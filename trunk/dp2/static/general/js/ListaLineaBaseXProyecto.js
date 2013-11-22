var listarLineaBase ="../../api/G_devuelveListaLineaBase/";

$(document).ready(function(){
	listaLineaBase();
});


//Lista las lineas bases de un proyecto

function listaLineaBase(){
	$.ajax({
		type: 'GET',
		url: listarLineaBase + localStorage.getItem("idProyecto"),
		dataType: "json", // data type of response
        success: function(data){
        	//console.log(data);
            agregaDataFila(data);
            /*
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
            */
        }
	});
}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	if (data!=null){
		arreglo=data["linea_base"];
	}
	 
	for (i=0; i<arreglo.length;i++){		
		agregaFilaLineaBase(arreglo[i],i);
	}	
}

function agregaFilaLineaBase(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td>'+ arreglo["linea"] + '</td><td>' + arreglo["linea_base_fi"] + '</td></tr>';
	//'</td><td>' + arreglo["nomb_proy"] + '</td><td>' + arreglo["nomb_jefe"] + '</td><td>' + arreglo["est"] + 
	//'</td><td><a data-toggle="modal" href="#myModal" id="btnVer" class="btn btn-primary">Ver</a></td></tr>';
	//tbody += '<tr style = "display:none"></tr>'
	$("#listaLineaBase tbody").append(tbody);
	$("#listaLineaBase").trigger("update"); 
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