var rootURL = "../../api/G_listaProyecto";

$(document).ready(function(){
	iniciaProyectos();
	$.each($("input.btn.btn-default"),function(e,el){
		console.log(el);
	});
	$(".btn.btn-default").click(function(){ 		
		alert('panchis');
	});
});

function iniciaProyectos(){
	
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

function codigoError(){

	alert('Error');

}

function agregaDataFila(data){
	//arreglo=arregloProyecto;
	var arrBotones = new Array();
	
	if (data!=null){
		arreglo=data["prs"];
	}
	console.log(arreglo);
	
	for (i=0; i<arreglo.length;i++){		
		agregaFilaProyecto(arreglo[i],i,arrBotones);
	}
	console.log(arrBotones);
	
/*	$.each(arrBotones,function(e,elemento){
		if(elemento != undefined){
			//console.log(arrBotones[e]);
			var id = "#botoncitoito";
			id += elemento;
			//console.log(id);
			$(id).click(function(){
				localStorage.setItem("idProyecto",elemento);
				$(location).attr('href','header.html');
			});
		}
	});*/
	
	
}

function agregaFilaProyecto(arreglo,i,arrBotones){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	$("#listaProyectos").append('<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["jp"] + '</td><td>' + arreglo["tp"] + '</td><td>' + arreglo["fi"] + '</td><td>' + arreglo["ff"] + 
	'</td><td><input type="button" class="btn btn-default" value="Administrar" /></td></tr>');
	
	arrBotones[a] = arreglo["id"];
	
	//onclick=" localStorage.setItem(\'idProyecto\',\'' + arreglo["id"] +'\'); $(location).attr(\'href\',\'header.html\');"
	
	

	localStorage["id"] = arreglo["id"];
	localStorage["nombre"] = arreglo["nom"];
}

/*
$("button.btn.btn-default.Irvin").click(function(){ 
	
	console.log($(this).closest("tr"));

});
*/
function grabarRecursos(){
	
	alert("Se grabó");

}