var rootURLregistrarLecApren = "../../api/G_registrarLeccionAprendida";

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
var id_colaborador=localStorage.getItem("idUsuario");
var nombre_usuario=localStorage.getItem("nombreUsuario");

$(document).ready(function() {

    cargarComboCategoriaLeccionAprendida();
    cargarComboProyectosxEmpleado();
    $("#idEmpleado").attr("value", id_colaborador);
});
$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarLeccionAprendida();
	}
});

function grabarLeccionAprendida(){

    var obj ={
		pa: $("#pa").val(),
		idexp: $("#idexp").val(),
		idEmpleado: $("#idEmpleado").val(),
		cla: $("#cla").val(),
		dla: $("textarea#dla").val()
	};
	//alert(JSON.stringify(obj));
	$.ajax({
		type: 'POST',
		url: rootURLregistrarLecApren,
		dataType: "json", // data type of response	
		data: JSON.stringify(obj),
		fail: codigoError,
                success: function(data){
                    
                    $(location).attr('href','ListaLeccionesAprendidas.html');
                }
	});
}


function codigoError(){
	alert('Error');
}

function cargarComboCategoriaLeccionAprendida(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_devuelveCategoria',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["idCategoria"]);
				opt.html(data[obj]["nom"]);
				$("#cla").append(opt);
			}
		}
	});
}
function cargarComboProyectosxEmpleado(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_devuelveProyectosXEmpleado/'+ id_colaborador,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success:cargaPxE
	});
}
function cargaPxE(data){
	for(obj in data){
		var opt = $("<option></option>");
		opt.val(data[obj]["idProxEmp"]);
		opt.html(data[obj]["nomProy"]);
		$("#idexp").append(opt);
	}			
}
