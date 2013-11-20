var rootURL = "../../api/G_listaProyecto";
var listaObjetivos = "../../api/G_listarObjetivosPorProyecto/";
var listaCostos = "../../api/G_devuelveCostoPorProyecto/";
var establecerLineaBase = "../../api/G_establecerLineaBase/";
var cerrarProyecto = "../../api/G_cerrarProyecto";
var actualizarObjetivos = "../../api/G_actualizarCumpObjetivosPorProyecto";
var verificaLineaBase = "../../api/G_verificaLineaBase/";
var idRol=localStorage.getItem("idRol");

if(idRol==1){
	rootURL = "../../api/G_listaProyecto";
	//alert('hola');

}else{
	rootURL = '../../api/G_listaProyecto/'+localStorage.getItem("idUsuario");
	//alert('hola1');
}


$(document).ready(function(){
	iniciaProyectos();
});

function iniciaProyectos(){
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
        success: function(data){  
        	if (data["prs"]!=""){
        		$("#listaProyectos").show();
        		agregaDataFila(data);
	            $(".btn.btn-primary").click(function(){
					var auxtd = $(this).closest("tr").find("td");
					var idProyecto = auxtd[0].innerHTML;
					var nombreProyecto = auxtd[1].innerHTML;		
					localStorage.setItem("idProyecto",idProyecto);
					localStorage.setItem("nombreProyecto",nombreProyecto);
					seteaRol();
					$(location).attr('href','MenuProyecto.html');
					
				});	
        	}
        	else{
        		$("#alertNoProyectos").show();
        	}
            		
        }
	});
}

function seteaRol (){
	var idProyecto=localStorage.getItem("idProyecto");
	var idUsuario=localStorage.getItem("idUsuario");
	var coso = { ip:idProyecto , iu:idUsuario};	
	$.ajax({
		type: 'POST',
		url: "../../api/G_obtenerRolProyecto",
		async: false,
		data: JSON.stringify(coso),
		dataType: "json", 
		success: function(data){
			localStorage.setItem("idRol",data.me);
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
		$(".btn.btn-warning").click(function(){
			var auxtd = $(this).closest("tr").find("td");
			var idProyecto = auxtd[0].innerHTML;
			var nombreProyecto = auxtd[1].innerHTML;
			//alert(idProyecto + " ola k ase");

			localStorage.setItem("idProyecto",idProyecto);
			localStorage.setItem("nombreProyecto",nombreProyecto);
		});

		$("[data-toggle=popover]").popover()

    $("#listaProyectos").trigger("update"); 
   
}

function agregaFilaProyecto(arreglo,i){
	a=i;
	a++;
	//input= '<input type="text" class="form-control" id="proyecto'+(a)+'" value="'+arreglo[2]+'">';
	if (arreglo["es"]=="CERRADO") {
		var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["jp"] + '</td><td>' + arreglo["tp"] + '</td><td>' + arreglo["fi"] + '</td><td>' + arreglo["ff"] + 
		'</td><td><button type="button" class="btn btn-default" disabled>No Administrable</button>' + 
		'</td><td><button type="button" class="btn btn-default" disabled>No Administrable</button>' + 
		'</td><td><a class="btn btn-danger" data-toggle="popover" data-placement="top" title data-content="Proyecto cerrado el día 26-10-2013" data-original-title="Cierre">CERRADO</a></td></tr>';
		$("#listaProyectos tbody").append(tbody);
	} else {
		if (arreglo["flag_lb"]==1) {
			var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["jp"] + '</td><td>' + arreglo["tp"] + '</td><td>' + arreglo["fi"] + '</td><td>' + arreglo["ff"] + 
			'</td><td><button type="button" class="btn btn-primary">Administrar</button>' + 
			'</td><td><a class="btn btn-warning" data-toggle="popover" data-placement="top" title data-content="Linea Base establecida el día "' + arreglo["fecha_lb"] + '" data-original-title="Cierre">Línea Base Establecida</button>' + 
			'</td><td><button data-toggle="modal" id="'+ arreglo["id"] +'" href="#myModal" class="btn btn-danger" onclick="cerrarP()">Cerrar Proyecto</button></td></tr>';
			$("#listaProyectos tbody").append(tbody);
		} else {
			var tbody = '<tr><td>'+ arreglo["id"] + '</td><td>' + arreglo["nom"] + '</td><td>' + arreglo["jp"] + '</td><td>' + arreglo["tp"] + '</td><td>' + arreglo["fi"] + '</td><td>' + arreglo["ff"] + 
			'</td><td><button type="button" class="btn btn-primary">Administrar</button>' + 
			'</td><td><button type="button" class="btn btn-warning" onclick="establecerLineaBaseP(' + arreglo["id"]+ ')">Establecer Línea Base</button>' + 
			'</td><td><button data-toggle="modal" id="'+ arreglo["id"] +'" href="#myModal" class="btn btn-danger" onclick="cerrarP()">Cerrar Proyecto</button></td></tr>';
			$("#listaProyectos tbody").append(tbody);
		}				
	}
}

function establecerLineaBaseP(idProyecto) {
	$.ajax({
        type: "GET",        
        url: establecerLineaBase + idProyecto,
        dataType: "json",
        async: true,
        success: function (data) {
            $(location).attr('href','ListaProyectos.html');
        }
    });
}

function cerrarP(){	
	limpiaEntregable();
	limpiaCostos();
	iniciaCostos();
	limpiaObjetivos();
	iniciaObjetivos();
}
function limpiaEntregable(){
	$("#listaEntregables tbody").html("");
}
function limpiaCostos(){
	$("#listaCostos tbody").html("");
}
function limpiaObjetivos(){
	$("#listaObjetivos tbody").html("");
}
function iniciaObjetivos(){
	var id_proyecto = localStorage.getItem("idProyecto");
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
	
	var tbody = '<tr class="obj"><td>'+ arreglo["id"] + '</td><td>' + arreglo["desc"] + '</td>';
	var checkboxMarcado = '<td><input type="checkbox" checked></td></tr>' 
	var checkboxBlanco = '<td><input type="checkbox"></td></tr>' 	
	if (arreglo["flag_cumplido"]==1)
	{
		tbody=tbody+checkboxMarcado;
	}
	else{
		tbody=tbody+checkboxBlanco;	
	}

	$("#listaObjetivos").append(tbody);
	$("#listaObjetivos").trigger("update"); 
}
function iniciaCostos(){
	var id_proyecto = localStorage.getItem("idProyecto");
	$.ajax({
		type: 'GET',
		url: listaCostos+ id_proyecto,
		dataType: "json", // data type of response
		async: true,
        success: function(data){                    
            agregaDataEntregablesCostos(data);   
        }
	});
}
function agregaDataEntregablesCostos(data){
	
	if (data!=null){
		costos=data["costos"];
	}
	
	if (data!=null){
		l_costos_edt=costos["l_costos_edt"];
	}
	
	for (i=0; i<l_costos_edt.length;i++){		
		agregaFilaEntregables(l_costos_edt[i],i);
		agregaFilaCostos(l_costos_edt[i],i);
	}

	document.getElementById('tce').innerHTML=costos["c_total_est"];
	document.getElementById('tcr').innerHTML=costos["c_total_real"];
}
function agregaFilaEntregables(arreglo,i){
	a=i;
	a++;
	
	var tbody = '<tr><td>'+a+'</td><td>'+ arreglo["nombre"] + '</td><td>' + arreglo["estado"] + '</td>' + 
		'</tr>';
	$("#listaEntregables").append(tbody);
	$("#listaEntregables").trigger("update"); 
}
function agregaFilaCostos(arreglo,i){
	a=i;
	a++;
	
	var tbody = '<tr><td>'+a+'</td><td>'+ arreglo["nombre"] + '</td><td>' + arreglo["c_est"] + '</td><td>' +  arreglo["c_real"] +
		'</tr>';
	$("#listaCostos").append(tbody);
	$("#listaCostos").trigger("update"); 
}
$("#cerrarProyecto").click(function(){
var id_proyecto = localStorage.getItem("idProyecto");
var envio = {id : id_proyecto};
var objetivos = $(".obj");
var obj = {};
var l_objetivos=[];
    
    obj["id"]=id_proyecto;
    for(var i=0; i < objetivos.length; i++){
    	var aux={
	    	desc:"",
	    	ido:""
	    };
		aux.ido = objetivos[i].cells[0].innerHTML;
		aux.desc = objetivos[i].cells[1].innerHTML;
		aux.est = objetivos[i].cells[2].children[0].checked;
		l_objetivos.push(aux);
	}
	obj["l_objetivos"]=l_objetivos;

		$.ajax({
			type: 'POST',
			url: actualizarObjetivos,
			dataType: "json", // data type of response
			data: JSON.stringify(obj),
			async: false,
	        success: function(data){
	            alert("Ya Actualizo Objetivos");
	        }
		});  
        $.ajax({
			type: 'POST',
			url: cerrarProyecto,
			dataType: "json", // data type of response
			data: JSON.stringify(envio),
			async: true,
	        success: function(data){
	             $(location).attr('href','ListaProyectos.html');
	        }
		});      
}) 