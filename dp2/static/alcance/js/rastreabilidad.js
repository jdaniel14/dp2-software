 
 $(document).ready(function(){

var jsonCliente = {
                     idproyecto : localStorage.getItem("idProyecto")                
                  };

 	$.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/AL_mostrarMatriz",
                      success: function (data) {
                          var dataprioridad = data.ar_prioridad;
                          var dataestado = data.ar_estado;
                          var requisitos = data.requisitos;
                          //console.log(data.ar_estado );

                          //cmbestado = arma_estado_combo( data.ar_estado );
                          llena_requisitos1( requisitos , dataestado );
                        
                      }
 			});


 });






function llena_requisitos1( data, dataestado ){
	console.log("data", data);
	console.log("dataestado" ,dataestado );
	var html ="";
	for ( i = 0; i < data.length; i++ ){

		var idrequisito = data[i].idrequisito;
		var desc =  data[i].descripcion;
		var fecha =  data[i].fecha;
		var solicitado =  data[i].solicitado;
		var cargo =  data[i].cargo;
		var fundamento =  data[i].fundamento;
		var idprioridadR =  data[i].idprioridadR;
		
		var idestadoR =  arma_cmb( dataestado, data[i].idestadoR);
		//var idestadoR = data[i].idestadoR;
		//console.log( idestadoR );

		//var dai = arma_cmb( dataestado, data[i].idestadoR);
		//var dai = arma_estado_combo(dataestado, data[i].idestadoR );
		//console.log("dai",dai);

		var entregable =  data[i].entregable;
		var criterioAceptacion =  data[i].criterioAceptacion;
		var idmiembros =  data[i].idmiembros;
		var nombre =  data[i].nombre;
		var apellido =  data[i].apellido;

		var tr = armaTr(idrequisito, desc, fecha, solicitado, cargo, fundamento, idprioridadR, idestadoR, entregable, criterioAceptacion,idmiembros, nombre, apellido )
		//var tr = armaTr(idrequisito, desc, fecha, solicitado, "",idprioridadR, idestadoR, entregable, criterioAceptacion, nombre, apellido )
		
		html += tr;
		//console.log(tr);
	}


	$("#progressTickets").hide("slow");
	$("#dataTickets").html( html );
	listeners();

}


function listeners(){

	function dameTR( data ){
	//{"idMiembro":"3","nombre":"Alucion","apellido":"Montoya","telefono":"673273","email":"el@gmail.com"}]
	//console.log("result", data, arrm.length);
     var arrm = data.ar_miembro;
     var i = 0;
     var html= "";
     for ( i = 0; i < arrm.length; i++ ){
     		html += armaTrModal(arrm[i]);
     }                   	
	return html;
}

	function armaTrModal( data ){
		var idmiembro = data.idMiembro;
		var nombre = data.nombre;
		var apellido = data.apellido;
		var telefono = data.telefono;
		var email = data.email;

		var tr = "<tr>";
		//tr += '<td>' + cmbestado + '</td>';

		tr += '<td> <input name="group1" type = "radio" value = "'+ idmiembro+ '"> </td>';
		
		tr += '<td>' + nombre + '</td>';
		tr += '<td>' + apellido + '</td>';
		tr += '<td>' + telefono + '</td>';

		tr += '<td>' + email + '</td>';
		tr += '</tr>';
		return tr;
	}




	console.log('rebind functions');
	$(".buscarMiembro").click(function(){
			console.log("sape");
			$('#myModal').modal('show');

			console.log($(this).parent().parent()[0].id);
			var idre = $(this).parent().parent()[0].id.split('-')[1];
			console.log(idre);
			localStorage.setItem("currentRequisito", idre );
	});

	$("#buscarModal").click(function(){
			console.log("saa");
			//{"idproyecto":1,"nombre":"Lu","apellido":"Mo"}.va
			$("#progressUsers").show("slow");
			var nombre = $("#inputNombreModal").val();
			var app = $("#inputApeModal").val();

			var jsonCliente = {
                     idproyecto : localStorage.getItem("idProyecto"),
                     nombre : nombre,
                     apellido: app              
                  };
			$.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/AL_buscarMiembro",
                      success: function (data) {
                          	console.log("serv", data );
                          	$("#progressUsers").hide("slow");
                          	var sape = dameTR(data);
                          	console.log(sape);
                          	$("#dataUsersModal").html(sape);
                      }
 			});
 			

			return false;
	})

	$("#guardarModal").click(function(){
			//guar

			console.log("guardando");
			var idescogido = $("[name=group1]").val();
			console.log("guardando", idescogido);


			var jsonCliente = {
                     id_requisito : idrequisito,
                     desc : desc,
                     fecha: "2013-06-15",
                     solicitado : "Jose martin",
                     cargo : "Gerente",
                     idprioridadR: idprioridadR,
                     idestadoR : idestadoR,
                     entregable : entregable,
                     criterioAceptacion : criterioAceptacion,
                     idmiembros :     idescogido          
                  };
			$.ajax({
                      type: "POST",
                      data: JSON.stringify(jsonCliente),
                      dataType: "json",
                      contentType: "application/json; charset=utf-8",
                      url: "../../api/AL_buscarMiembro",
                      success: function (data) {
                          	console.log("serv", data );
                          	$("#progressUsers").hide("slow");
                          	var sape = dameTR(data);
                          	console.log(sape);
                          	$("#dataUsersModal").html(sape);
                      }
 			});

 			return false;
			
	});

	

	//{"idproyecto":1,"nombre":"Lu","apellido":"Mo"}
}


 function arma_cmb (  estado, idestado ){
 		var init = '<select name = "comboSelec" class="selectpicker">';
 		var cmb = "";

 		//console.log( idest );
 		var i = 0;
 		for ( i = 0; i < estado.length; i++ )
 			if ( estado[i].idestado == idestado ){
 				init += '<option class = "cmb-'+ estado[i].idestado+ '">' + estado[i].descripcion+ '</option>';
 			}else{
 				cmb += '<option class = "cmb-'+ estado[i].idestado+ '">' + estado[i].descripcion+ '</option>';
 			}
 			
 			init += cmb;
 			init += '</select>';
 		/*
 		for ( i = 0; i < dataestado.length; i++ ){
 			dataestado[i].idestado;
 		}
 		*/

 		return init;
 }


 function arma_estado_combo( estado , idestado ){
 		var init = '<select name = "comboSelec" class="selectpicker">';
 		var cmb = "";

 		for ( i = 0; i < estado.length; i++ )
 			if ( estado[i].idestado == idestado ){
 				init += '<option class = "cmb-'+ estado[i].idestado+ '">' + estado[i].descripcion+ '</option>';
 			}else{
 				cmb += '<option class = "cmb-'+ estado[i].idestado+ '">' + estado[i].descripcion+ '</option>';
 			}
 			
 			result = init + cmb;
 			result += '</select>';


 		return cmb;
 }




function llena_requisitos ( data, dataestado ){
	console.log(data);
	var html = "";
	for ( i = 0; i < data.length; i++ ){
		var idrequisito = data[i].idrequisito;
		var desc =  data[i].descripcion;
		var fecha =  data[i].fecha;
		var solicitado =  data[i].solicitado;
		var cargo =  data[i].cargo;
		var fundamento =  data[i].fundamento;
		var idprioridadR =  data[i].idprioridadR;
		var idestadoR =  data[i].idestadoR;
		//var idestadoR = arma_estado_combo(dataestado, data[i].idestadoR );
		//console.log(idestadoR);
		//console.log(idestadoR);

		var entregable =  data[i].entregable;
		var criterioAceptacion =  data[i].criterioAceptacion;
		var idmiembros =  data[i].idmiembros;
		var nombre =  data[i].nombre;
		var apellido =  data[i].apellido;
		//var tr = armaTr( idestadoR, idrequisito, desc, fecha, solicitado, "",idprioridadR, idestadoR, entregable, criterioAceptacion, nombre, apellido )
		
		//html += tr;
		//console.log(tr);
	
	}
	//console.log(html);
	$("#progressTickets").hide("slow");
	$("#dataTickets").html( html );
}

function armaTr(idrequisito, desc, fecha, solicitado, cargo, fundamento, idprioridadR, idestadoR, entregable, criterioAceptacion,idmiembros, nombre, apellido ){
	//var tr = armaTr(idrequisito, desc, solicitado, cargo, fundamento, idprioridadR, idestadoR, entregable, criterioAceptacion,idmiembros, nombre, apellido )
	console.log(idrequisito, desc, solicitado, cargo, fundamento, idprioridadR, idestadoR, entregable, criterioAceptacion,idmiembros, nombre, apellido );
	
	var tr = '<tr id = "requisito-' + idrequisito+'" >';
	//tr += '<td>' + cmbestado + '</td>';
	tr += '<td>' + idrequisito + '</td>';
	tr += '<td>' + desc + '</td>';
	tr += '<td>' + fecha + '</td>';

	tr += '<td>' + solicitado + '</td>';
	tr += '<td>' + cargo + '</td>';
	tr += '<td>' + idprioridadR + '</td>';
	//tr += '<td>' + cmbestado + '</td>';
	tr += '<td>' + idestadoR + '</td>';
	//tr += '<td>' + ' <select class="selectpicker"><option>Mustard</option><option>Ketchup</option><option>Relish</option></select>' + '</td>';
	tr += '<td>' + entregable + '</td>';
	tr += '<td>' +  criterioAceptacion + '</td>';
	tr += '<td>' +  nombre + ' ' + apellido + '</td>';
	tr += '<td> <button class = "buscarMiembro">   Buscar Miembro </button></td>';
	
	tr += '</tr>';
	return tr;
	
}
 
    /*
    <th>cod</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Solicitado por</th>
            <th>Objetivo</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Entregable</th>
            <th>Criterio de Aceptación</th>
            <th width = 1 >Responsable</th>
<tr>
            <td rowspan="2">1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Otto</td>
            <td><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button></td>
            <td><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button></td>
            <td>Otto</td>
            <td>Otto</td>
            <td><span id = "buscarResponsable" class="glyphicon glyphicon-search"></span></td>
          </tr>

*/






$("#buscarResponsable").click(function(){
	console.log("buscarResponsable");
	$('#myModal').modal('show');
	/*

	 validacion de suma
		- actualizacion
		- mostrar loader
		- valor negativo
		- validar routing
		activities close -> not edt
		-packages level (cronograma actividades completas)
		estados (revisado,  aceppted, aprobado
			- archivos permitidos mostrar :)
			  - tipo de documentos
		activities close -> not edt
		
		)

		Cosas por hacer:

		- Hacer la validación de suma, según formula: Padres = sumatoria(hijos.tiempo)
			- Si la suma de sus hijos es mayor a la del padre, se actualizará el padre, y saldra
			  advertencia de actualización		  
	
		- Fixear el problema de actualizar (F5), para que el metodo solo sea llamado una sola vez
			- O en su defecto mejorar el flujo de trabajo para que se tenga que hacer el (F5)
		- mostrar barra de cargado (loader) para que el usuario sepa cuando termina el servicio de @guardar EDT

		- Agregar verificación de valor negativo a los campos del EDT

		- Validar Routing
		- Las actividades cerradas

		 - A nivel de paquetes ( Cronograma, Actividades completas )

		 - Estados ( Revisado, aceptado, aprobado )

		 - Mostrar listas de archivos permitidos (Ejemplo: .txt, .doc, .docx)

		
	*/
});