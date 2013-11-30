function verificaPermisosVer(idPantalla){
	var obj ={
		idProyecto : idProyecto,
		idEmpleado  : idUsuario,
		idVista  : idPantalla,
		idAccion  : '1'
	}
	
	indPermiso=0;
	
	$.ajax({
		type: 'POST',
		url: rootURL + 'R_verificaPermisosVista', //Cambiar segÃºn el nombre que le deban poner
		data: JSON.stringify(obj),		
		dataType: "json",
		async: false,
		success:function(data){indPermiso=data.respuesta;}
	});
	
	return indPermiso;

}

function verificaPermisosEditar(idPantalla){
	var obj ={
		idProyecto : idProyecto,
		idEmpleado  : idUsuario,
		idVista  : idPantalla,
		idAccion  : '2'
	}
	
	indPermiso=0;
	
	$.ajax({
		type: 'POST',
		url: rootURL + 'R_verificaPermisosVista', //Cambiar segÃºn el nombre que le deban poner
		data: JSON.stringify(obj),		
		dataType: "json",
		async: false,
		success:function(data){indPermiso=data.respuesta;}
	});
	
	return indPermiso;

}

function verificaPermisosGrabar(idPantalla){
	var obj ={
		idProyecto : idProyecto,
		idEmpleado  : idUsuario,
		idVista  : idPantalla,
		idAccion  : '3'
	}
	
	
	indPermiso=0;
	
	$.ajax({
		type: 'POST',
		url: rootURL + 'R_verificaPermisosVista', //Cambiar segÃºn el nombre que le deban poner
		data: JSON.stringify(obj),		
		dataType: "json",
		async: false,
		success:function(data){indPermiso=data.respuesta;}
	});
	
	return indPermiso;
}