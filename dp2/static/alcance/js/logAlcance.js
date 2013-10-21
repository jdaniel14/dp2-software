function logChange(descripcion){
	var date = new Date().toLocaleString();
	var objCambio = {
		"idproyecto": parseInt(localStorage.getItem("idProyecto")),
		"descripcion": descripcion,
		"fecha": new Date().toLocaleString(),
		"id_estado": 1,
		"id_miembros_equipo": parseInt(localStorage.getItem("idUsuario"))
	};
	$.ajax({
        type:'POST',
        url: '../../api/AL_registrarCambio',
        data: JSON.stringify(objCambio),
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });

}