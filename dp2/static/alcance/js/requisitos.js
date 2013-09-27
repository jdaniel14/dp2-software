$("#agregar").click(function(){
	$('#detalleRequisito').removeClass('insertar');
	$('#detalleRequisito').removeClass('modificar');
	$('#tituloModal').html("Agregar requisito");
	$('#detalleRequisito').addClass('insertar');
	$('#detalleRequisito').modal('show');
});

$("#subirArchivo").click(function(){
	var str = JSON.stringify($('#archivo')[0].files);
	console.log(str);
});