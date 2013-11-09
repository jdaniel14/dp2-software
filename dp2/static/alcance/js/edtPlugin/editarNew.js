 var edtModificados = [];
 var idModificadosCurrent = [];
 localStorage.setItem("idmodificadoCurrent", "0");

function repaintEDIT(){
                $("#chart").html("");
                $("#org").jOrgChart({
                    chartElement : '#chart',
                    dragAndDrop  : false
                });
                console.log("sape");
        }


 jQuery(document).ready(function() {
 		
 		console.log("utilitarios editar");


 		$("#editarEdtNew").click(function(){
 				console.log("Proceso de edición");

 				localStorage.setItem("queueEstado", "editando");

 				$("#eventsEditNew").show("slow");
 				$("#org").html("");
 				$("#chart").html("");

 				$("#MostrarEdt").trigger('click');    
 				//$(".inputEdtTitle").removeAttr("readonly");
 				//$(".inputEdtDescripcion").removeAttr("readonly");
 				//$(".inputEdtDias").removeAttr("readonly");

 				console.log("editadndo con bolitas");
 				repaint_eventsEdtNew();
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




function repaint_eventsEdtNew(){


	function guardarModificadoID( id ){
			var i = 0;
			for ( i = 0; i < idModificadosCurrent.length; i++ ){
				if ( idModificadosCurrent[i] == id ) return;
			}
			idModificadosCurrent.push( id );
	}

	$(".inputEdtTitle").click(function(){
 			console.log("click edttitle");
 			 //$(".inputEdtTitle").removeAttr("readonly");
			 //$(".inputEdtDescripcion").removeAttr("readonly");
			 //$(".inputEdtDias").removeAttr("readonly");
 			//var p = $( '#'+$(this).id );
 			
 			var idnodo = '#' + $(this).attr('id');
 			console.log(idnodo);
 			var p = $(idnodo);
 			//console.log(p, $(this).id);
 			var position = p.position();
 			console.log("pos top", position.top);
 			
 			//$("#caja_flotante").css( "top": position );

 			//$("#caja_flotante").css("top", position.top);
 			
 			$("#caja_flotante").show("slow");
 			$("#controlesSpan").html($(this).val());
 			//$(this).removeAttr("readonly");
 			//$(this).attr('id').removeAttr("readonly");
 			//$("#descripcion-317").removeAttr("readonly");2
 			//var idcurrent = '#'+ $(this).attr('id');
 			//$(idcurrent).removeAttr("readonly");

 			var id = $(this).attr('id').split("-")[1];


 			localStorage.setItem("idmodificadoCurrent", id);
 			
 			//var iddes = "#descripcion-" + id;
 			//var idtime = "#tiempo-" + id;
 			//$(iddes).removeAttr("readonly");
 			//$(idtime).removeAttr("readonly");
 			//console.log(iddes, idtime);
 			//console.log($(this).attr('id'));
 			//repaintEDIT();

 			guardarModificadoID(id);
 			console.log('objeto editado id: ', id);
 			console.log(idModificadosCurrent);
 			return false;

 		});


	 $("#imgAgregar").click(function(){
	 		console.log("agregandoNodo");
	 		$('#modalEditarNew').modal('show');

	 });

	 $("#imgEliminar").click(function(){
	 		console.log("eliminandoNodo");
	 		//modalEliminarNew
	 		$('#modalEliminarNew').modal('show');
	 });
	 
	 $("#imgEditar").click(function(){
	 	//editarNodoNew
	 	var idactual = localStorage.getItem("idmodificadoCurrent");
	 	var title = "#title-"+idactual;
	 	var descripcion ="#descripcion-" + idactual ;
	 	var tiempo = "#tiempo-" + idactual ;

	 	$('#editarNodoNew').modal('show');
	 	$('#title-editar').val($(title).val());
	 	$('#descripcion-editar').val($(descripcion).val());
	 	$('#tiempo-editar').val($(tiempo).val());
	 
	 		console.log("editandoNodo");
	 });

	 $("#eliminarConfirmacionNew").click(function(){
	 	var idactual = localStorage.getItem("idmodificadoCurrent");

	 });

	 $("#editarConfirmacionNew").click(function(){
	 		var title = $("#title-editar").val();
	 		var descripcion = $("#descripcion-editar").val();
	 		var tiempo = $("#tiempo-editar").val();

	 		var idactual = localStorage.getItem("idmodificadoCurrent");
		 	
		 	var title1 = "#title-"+idactual;
		 	var descripcion1 ="#descripcion-" + idactual ;
		 	var tiempo1 = "#tiempo-" + idactual ;

		 		

		 	$(title1).val(title);
		 	$(descripcion1).val(descripcion);
		 	$(tiempo1).val(tiempo);
		 	
		 	

		 	 var json = armaJsonNodo(idactual, title, tiempo, descripcion);
		 	 console.log(json);
			 //repaintEDIT();

	 		console.log(title,descripcion, tiempo);
	 		$('#editarNodoNew').modal('hide');

	 		return false;
	 });
}
