var rootURL = "../../api/G_listaProyecto";
var listaObjetivos = "../../api/G_listarObjetivosPorProyecto/";
var cerrarProyecto = "../../api/G_cerrarProyecto";

$(document).ready(function(){
	iniciaProyectos();
});

function iniciaProyectos(){
	
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
        success: function(data){                    
            agregaDataFila(data);
            $(".btn.btn-primary").click(function(){
				var auxtd = $(this).closest("tr").find("td");
				var idProyecto = auxtd[0].innerHTML;		
				localStorage.setItem("idProyecto",idProyecto);
				$(location).attr('href','MenuProyecto.html');
			});
			
        }
	});
}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	
	if (data!=null){
		arreglo=data["prs"];
	}
	 
	for (i=0; i<arreglo.length;i++){		
		agregaFilaProyecto(arreglo[i],i);
	}
		$(".btn.btn-danger").click(function(){
		var auxtd = $(this).closest("tr").find("td");
		var idProyecto = auxtd[0].innerHTML;		
		alert(idProyecto + " ola k ase");
		localStorage.setItem("idProyecto",idProyecto);
		});
    $("#listaProyectos").trigger("update"); 
   
}

function agregaFilaProyecto(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["jp"] + '</td><td>' + arreglo["tp"] + '</td><td>' + arreglo["fi"] + '</td><td>' + arreglo["ff"] + 
	'</td><td><button type="button" class="btn btn-primary">Administrar</button></td><td><button data-toggle="modal" id="'+arreglo["id"] +'" href="#myModal" class="btn btn-danger" onclick="cerrarP()">Cerrar Proyecto</button></td></tr>';
	$("#listaProyectos tbody").append(tbody);


}
function cerrarP(){	

	limpiaObjetivos();
	iniciaObjetivos();
}
function limpiaObjetivos(){
	$("#listaObjetivos tbody").html("");
}
function iniciaObjetivos(){
	var id_proyecto = localStorage.getItem("idProyecto");
	alert(id_proyecto);
	$.ajax({
		type: 'GET',
		url: listaObjetivos+ id_proyecto,
		dataType: "json", // data type of response
		async: true,
        success: function(data){                    
            agregaDataFilaObjetivos(data);   
        }
	});
}
function agregaDataFilaObjetivos(data){
	if (data!=null){
		arreglo=data["l_objetivos"];
	}
	for (i=0; i<arreglo.length;i++){		
		agregaFilaObjetivos(arreglo[i],i);
	}
}
function agregaFilaObjetivos(arreglo,i){
	a=i;
	a++;
	
	var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["desc"] + '</td>' + 
		'<td><input type="checkbox"></td></tr>';
	$("#listaObjetivos").append(tbody);
	$("#listaObjetivos").trigger("update"); 
}
$("#cerrarProyecto").click(function(){
var id_proyecto = localStorage.getItem("idProyecto");
alert(id_proyecto);
var envio = {id : id_proyecto};

        $.ajax({
		type: 'POST',
		url: cerrarProyecto,
		dataType: "json", // data type of response
		data: JSON.stringify(envio),
		async: true,
        success: function(data){
        	//alert(data.me);
            alert("Ya se cerro pe causha");
        }
	});      
}) 