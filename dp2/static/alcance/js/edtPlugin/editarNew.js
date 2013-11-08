 var edtModificados = [];
 var idModificadosCurrent = [];
 
 
function repaint(){
                $("#chart").html("");
                $("#org").jOrgChart({
                    chartElement : '#chart',
                    dragAndDrop  : false
                });
        }


 jQuery(document).ready(function() {
 		
 		console.log("utilitarios editar");

 		$("#editarEdtNew").click(function(){
 				console.log("Proceso de edición");
 				$("#eventsEditNew").show("slow");
 				$(".inputEdtTitle").removeAttr("readonly");
 				$(".inputEdtDescripcion").removeAttr("readonly");
 				$(".inputEdtDias").removeAttr("readonly");
 				repaint_events();
 		});

 		$("#GuardarCambiosNew").click(function(){
 				console.log("Guardando cambios, new");

 		});	



 		$("#GuardarCambiosNew").click(function(){
 			$("#GuardarCambiosNew").hide("slow");
 			$("#progressEdtEditarEdt").show("slow");
 			var jsonR = guardarEdtModificado();
 			console.log(jsonR);
 			$.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonR),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/modificar",
                      success: function (data) {
                         console.log(data);
                         location.reload();
                         $("#progressEdtEditarEdt").hide("slow");
                      },
                      failure : function ( ){
                      	alert("falló el service :) ")
                      }

        });
 		});

 		function guardarEdtModificado ( ){
 			var idproyecto = dameIDproyecto();
 			var nodosModificados = dameNodosModificados();
 			var nodosNuevos = dameNodosNuevos();
 			var nodosEliminados = dameNodosEliminados();

 			var jsonResponse = armaJson( idproyecto,nodosModificados,nodosNuevos, nodosEliminados );
 			return jsonResponse;
 		}

 });


 function dameIDproyecto(){
 	var id = localStorage.getItem("idProyecto");
 	return id;
 }

 function dameNodosModificados(){
 	var i = 0;
 	
 	for ( i = 0; i < idModificadosCurrent.length; i++ ){
 		var id = idModificadosCurrent[i];

 		var idtitle = "#title-"+id;
 		var iddes = "#descripcion-" + id;
 		var idtime = "#tiempo-" + id;

 		var title = $(idtitle).val();
 		var descripcion = $(iddes).val();
 		var dias = $(idtime).val();
 		var json = armaJsonNodo( id, title, dias, descripcion );
 		//guardaEdtModArray(id, edtModificados);
 		edtModificados.push(JSON.stringify(json));
 	}
 	return edtModificados;
 }

 function dameNodosNuevos(){
 	var nnuev = [];
 	return nnuev;
 }

 function dameNodosEliminados(){
 	var nelim = [];
 	return nelim;
 }


 function armaJson( idproyecto, nodosModificados , nodosNuevos, nodosEliminados ){
 	 var jsonCliente = {
                                  idproyecto : idproyecto,
                                  idnodosModificados : nodosModificados,
                                  idnodosNuevos: nodosNuevos,
                                  idnodosEliminados: nodosEliminados
                                  };

	return jsonCliente;                               
 }


function armaJsonNodo(id, title, dias, descripcion){
	var jsonNodo = {
						id: id,
						title: title,
						dias: dias,
						descripcion: descripcion
					}
	return jsonNodo;
}




function repaint_events(){


	function guardarModificadoID( id ){
			var i = 0;
			for ( i = 0; i < idModificadosCurrent.length; i++ ){
				if ( idModificadosCurrent[i] == id ) return;
			}
			idModificadosCurrent.push( id );
	}

	$(".inputEdtTitle").click(function(){
 			console.log("click edttitle")
 			//$(this).removeAttr("readonly");
 			//$(this).attr('id').removeAttr("readonly");
 			//$("#descripcion-317").removeAttr("readonly");2
 			//var idcurrent = '#'+ $(this).attr('id');
 			//$(idcurrent).removeAttr("readonly");

 			var id = $(this).attr('id').split("-")[1];
 			
 			//var iddes = "#descripcion-" + id;
 			//var idtime = "#tiempo-" + id;
 			//$(iddes).removeAttr("readonly");
 			//$(idtime).removeAttr("readonly");
 			//console.log(iddes, idtime);
 			//console.log($(this).attr('id'));
 			repaint();
 			guardarModificadoID(id);
 			console.log('objeto editado id: ', id);
 			console.log(idModificadosCurrent);
 			return false;

 		});

}
