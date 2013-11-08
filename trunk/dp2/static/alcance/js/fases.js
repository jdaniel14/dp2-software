var id_proyecto;
if( localStorage.idProyecto ){
	id_proyecto = localStorage.idProyecto;
}
else{
	id_proyecto =1;
}
var eliminados = [];

function eliminarFase(){
  var opt = confirm("¿Seguro que desea eliminar esta fase? esta opción no se puede deshacer");
	if(!opt) return;
	$("#selected").removeClass("selected");
	$(this).parent().parent().addClass("selected");
	var id_fase = $(".selected").find(".id").html();
	if(id_fase != ""){
		var obj = {
			"idproyecto":id_proyecto,
			"id_fase":id_fase
		}
		eliminados.push(obj);
	}
	$(".selected")[0].remove();
}

function cargaLista(data){

	for(var i=0; i < data["listaFase"].length;i++){
		var fila = "<tr>";
		fila += '<td><p class="form-control-static id">'+data["listaFase"][i]["id_fase"]+'<p></td>';
		fila += '<td><input type="text" class="form-control descripcion" value="'+data["listaFase"][i]["descripcion"]+'" /></td>';
		fila+= '<td><a class="eliminar-fase"><span class="glyphicon glyphicon-remove"></a></td>';
		fila += "</tr>";
		$('#listaFases').append(fila);
	}
	$(".descripcion").change(function(){
		$(this).parent().parent().addClass("modificado");
	});
	$(".eliminar-fase").click(eliminarFase);
}

function guardarCambios(){
	//eliminar
	for(fase in eliminados){
		$.ajax({
			type: 'POST',
			url : '/AL_eliminarFase',
			dataType: "json",
			data: JSON.stringify(fase),
			contentType: "application/json; charset=utf-8"
		});
	}
	eliminados =[];

	//modificados
	var modificados = [];
	var mods = $('.modificado');
	for(row in mods){
		var cols = $(row).children();
		var fase={
			"id_fase" : $(cols[0]).html(),
			"descripcion": $(cols[1]).val()
		};
		modificados.push(fase);
	}

	var obj ={
		"idproyecto":id_proyecto,
		"listaFase":modificados
	}
	$.ajax({
		type: 'POST',
		url : '../../api/AL_modificarFases',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8"
	});
	//nuevos
	var nuevos = [];
	var filasNuevas = $('.nuevo');
	for(row in filasNuevas){
		var cols = $(row).children();
		var fase={
			"descripcion": $(cols[1]).val()
		};
		nuevos.push(fase);
	}

	var obj ={
		"idproyecto":id_proyecto,
		"listaFase":nuevos
	}
	$.ajax({
		type: 'POST',
		url : '../../api/AL_guardarFases',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8"
	});
}


function cargaTitulo(){
	var obj ={
		id_proyecto : id_proyecto
	}
	$.ajax({
			type: 'GET',
			url : '../../api/AL_obtenerProyectoById',
			dataType: "json",
			data: obj,
			contentType: "application/json; charset=utf-8",
			success:function(data){
				$("#nombre_proyecto").html(data["nombre_proyecto"]);
			}
	});

}

$(document).ready(function(){
	cargaTitulo();
	var obj = {
		"idproyecto":id_proyecto
	};
	$.ajax({
		type: 'POST',
		url : '../../api/AL_mostrarFases',
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success: cargaLista
	});
	$("#agregar").click(function(){
		var lista = $('#listaFases');
		var nuevaFila = $('<tr class="nuevo">');
		nuevaFila.append('<td><p class="form-control-static id"><p></td>');
		nuevaFila.append('<td><input type="text" class="form-control descripcion" /></td>');
		nuevaFila.append('<td><a class="eliminar-fase"><span class="glyphicon glyphicon-remove"></a></td>');
		lista.append(nuevaFila);
		$(".eliminar-fase").click(eliminarFase);
	});

	$("#guardarCambios").click(guardarCambios);

});