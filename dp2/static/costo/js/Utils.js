function obtenerIdUsuario(){

	id= localStorage.idUsuario;
	
	if (id==null){ 
		alert ("El id es null");
		id=1;
	}
	
	return id;

}

function comparaMenorFecha(diaMenor,mesMenor, anioMenor,diaMayor,mesMayor, anioMayor){
	
	if (anioMayor>anioMenor){
		return true;
	}else{
		if (anioMayor==anioMenor){
			if (mesMayor>mesMenor){
				return true;
			}else{
				if (mesMayor==mesMenor){
					if (diaMayor>diaMenor){
						return true;
					}
				}
			}
		}
	}
	return false;
}

function comparaMenorIgualFecha(diaMenor,mesMenor, anioMenor,diaMayor,mesMayor, anioMayor){
	
	if (anioMayor>anioMenor){
		return true;
	}else{
		if (anioMayor==anioMenor){
			if (mesMayor>mesMenor){
				return true;
			}else{
				if (mesMayor==mesMenor){
					if (diaMayor>=diaMenor){
						return true;
					}
				}
			}
		}
	}
	return false;
}

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
		url: rootURL + 'CO_verificaPermisosVista',
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
		url: rootURL + 'CO_verificaPermisosVista',
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
		url: rootURL + 'CO_verificaPermisosVista',
		data: JSON.stringify(obj),		
		dataType: "json",
		async: false,
		success:function(data){indPermiso=data.respuesta;}
	});
	
	return indPermiso;
}

function lanzaAlerta(idDiv,idLab ,mensaje){
	
	div="#" + idDiv;
	lab="#" + idLab;
	if (mensaje!=null && mensaje!=""){
		
		
		$(lab).html(mensaje);
		
	}
	
	$(div).attr("class","form-group has-error");
	if (idLab!=null && idLab!="")
		$(lab).css("display","inline");
}

function borraAlerta(idDiv,idLab){
	
	div="#" + idDiv;
	lab="#" + idLab;
	
	$(div).attr("class","form-group");
	$(lab).css("display","none");
}