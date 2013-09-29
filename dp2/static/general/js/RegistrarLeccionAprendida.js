var rootURLregistrarLecApren = "../../api/G_registrarLecApren";

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
var id_colaborador=2;

function cargaData(data){
	if (data!=null){
		arreglo=data["acta"];
	}
	
	for(key in arreglo){
		if($('#'+key).is("select"))continue;
			$('#'+key).html(arreglo[key]);
			$('#'+key).val(arreglo[key]);
	}

	var selects = $("select");
	if (data!=null){
		arreglo=data["acta"];
	}
	for (var i = 0; i < selects.length; i++) {
		$(selects[i]).val(arreglo[selects[i].id]);
		if($(selects[i]).hasClass("changeable")){
			$(selects[i]).attr("disabled","disabled");
		}
	}
}
$(document).ready(function() {

    cargarComboCategoriaLeccionAprendida();
    $("#idEmpleado").attr("value", id_colaborador);
});
$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		grabarLeccionAprendida();
	}
});

function grabarLeccionAprendida(){

    var obj ={
		pa  : $("#pa").val(),
		idColaborador : $("#idColaborador").val(),
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
                    
                    alert("Se grabaron los datos wuju!");
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
		url : '../../api/G_devuelveProyectosxEmpleado/'+ id_colaborador ,
		dataType: "json",
		async:false,
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["idProxEmp"]);
				opt.html(data[obj]["nomProy"]);
				$("#idexp").append(opt);
			}
		}
	});
}
