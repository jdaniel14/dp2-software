var rootURL = "../../api/G_devuelveLeccionesAprendidas";
var eliminarLeccionAprendida = "../../api/G_cambiaEstadoLeccionAprendida";

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
            $(".btn.btn-info").click(function(){
				var auxtd = $(this).closest("tr").find("td");
				var idLeccionAprendida = auxtd[0].innerHTML;
				alert(idLeccionAprendida);
				localStorage.setItem("idLeccionAprendida",idLeccionAprendida);
				$(location).attr('href','ModificarLeccionAprendida.html');
			});
			$(".btn.btn-danger").click(function(){
				var auxtd = $(this).closest("tr").find("td");
				var idLeccionAprendida = auxtd[0].innerHTML;
				localStorage.setItem("idLeccionAprendida",idLeccionAprendida);
				var obj ={
					id: localStorage.getItem("idLeccionAprendida")
				};

				$.ajax({
					type: 'POST',
					url: eliminarLeccionAprendida,
					dataType: "json", // data type of response	
					data: JSON.stringify(obj),
			        success: function(data){ 
			        	$(location).attr('href','ListaLeccionesAprendidas.html'); 
			        	alert("Se elimino");                  
			        }
				});
			});
        }
	});
}
function eliminarLeccionAprendida(){
	alert("bonnie se come los mocos");
	var obj ={
		id: localStorage.getItem("idLeccionAprendida")
	};

	$.ajax({
		type: 'POST',
		url: eliminarLeccionAprendida,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
        success: function(data){  
        	alert("Se elimino");                  
        }
	});
}
function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	if (data!=null){
		arreglo=data["lecciones"];
	}
	
	for (i=0; i<arreglo.length;i++){		
		agregaFilaLeccionAprendida(arreglo[i],i);
	}
}

function agregaFilaLeccionAprendida(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td style="display:none">'+ arreglo["id"] + '</td><td>' + arreglo["ne"] + '</td><td>' + arreglo["dla"] + '</td><td>' + arreglo["np"] + '</td><td>' + arreglo["cla"] +'</td><td><button type="button" class="btn btn-info">Modificar</button></td><td><button type="button" class="btn btn-danger">Eliminar</button></td></tr>';
	$("#listaLeccionAprendida tbody").append(tbody);
	$("#listaLeccionAprendida").trigger("update"); 
}