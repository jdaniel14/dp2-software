
/*
iniciaJefeProyectos();

function iniciaJefeProyectos(){
	
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response	
		fail: codigoError,
        success: function(data){
            agregaDataFila(data);
        }
	});
}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	if (data!=null){
		arreglo=data;
	}
	for (i=0; i<arreglo.length;i++){		
		agregaFilaTipoProyecto(arreglo[i],i);
	}
}

function agregaFilaProyecto(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	$("#jefeProyectos").append('<option value="'+ a + '">' + arreglo[0] + '</option>');
}
*/

function cargarComboJefeProyecto(){
	$.ajax({
		type: 'GET',
		url : '../../api/G_listaJefeProyectos',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		success:function(data){
			for(obj in data){
				var opt = $("<option></option>");
				opt.val(data[obj]["id"]);
				opt.html(data[obj]["nom"]);
				$("#jefeProyecto").append(opt);
			}
		}
	});
}

$(document).ready(function(){
	//cargar Combos
	cargarComboJefeProyecto();
	//cargarComboCompania();
	//cargarComboEstado();
});

$("#btnGrabar").click(function(){
	if (confirm("¿Está seguro que desea grabar los cambios realizados?")){
		registrarProyectos();
	}
});

function registrarProyectos(){
	var jsonCliente = {
		nom : $("#nombreProyecto").val(),
		jp  : $("#jefeProyecto").val(),
		tp  : $("#tipoProyecto").val(),
		fi  : $("#fechaInicio").val(),
		ff  : $("#fechaFin").val()
    };

    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonCliente),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "../../api/G_registrarProyecto",
        success: function (data) {
            alert("Se registró con éxito");
        }
    });
}

