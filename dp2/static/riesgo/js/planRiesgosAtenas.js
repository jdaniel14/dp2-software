$(document).ready(main);
localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main() {

    leerEquipo();
    leerComite();
   // agregarEquipo();
    agregarComite();

}

function  agregarEquipo() {
    
    
    
   var data = {
            idProyecto: idProyectoLocal
        };
        
        var valor;
    $('#equipoProyecto li').each(function(index) {
        //formo data
          valor=index;
    });
       
    var datos = new Array();
    for (var i = 0; i < valor; i++) {
        var valorId = "#idContacto" + i;
        datos[i] = valorId;
    }    
   var data3 = {
            data1: data,
            data2: datos
        };

        //console.log(data3);
        var jsonData = JSON.stringify(data3);
        console.log(jsonData);
        //alert("Elemento: " + $(elemento).text() + " en el indice " + index);
        
        
		
		$.ajax({
			type: 'POST',
			url:  "../../api/R_listarcomiteRiesgo",
			data: jsonData,
			dataType: "json",
			success: function(data){
				var item = data;
				
				$('#myModalRegister').modal('hide');
			},
			fail: function(data){
				alert(data.me);
			}
		});
        
        
        
}
function  agregarComite() {

//    $('#comiteRiesgos li').each(function(index, elemento) {
//        alert("Elemento: " + $(elemento).text() + " en el indice " + index);
//
//    });

var data = {
            idProyecto: idProyectoLocal
        };
        
        var valor;
    $('#comiteRiesgos li').each(function(index) {
        //formo data
          valor=index;
    });
       
    var datos = new Array();
    for (var i = 0; i < valor; i++) {
        var valorId = "#idContacto" + i;
        datos[i] = valorId;
    }    
   var data3 = {
            data1: data,
            data2: datos
        };

        //console.log(data3);
        var jsonData = JSON.stringify(data3);
        console.log(jsonData);
        //alert("Elemento: " + $(elemento).text() + " en el indice " + index);
        
        
		
		$.ajax({
			type: 'POST',
			url:  "../../api/R_RegistrarComiteRiesgo",
			data: jsonData,
			dataType: "json",
			success: function(data){
                            alert("Se registró el comite exitosamente");
			},
			fail: function(data){
				alert(data.me);
			}
		});
   


}


function  leerEquipo() {
    //HARDCODEADO
    var data = $.parseJSON('[{"idContacto":1,"nombreCompleto":"Oscar"},{"idContacto":2,"nombreCompleto":"Oooo"}]');
    $('#equipoProyecto').append('<h4> Equipo del Proyecto </h4>');

    for (obj in data) {
        var opt = $("<li id=" + data[obj]["idContacto"] + "_eq" + "></li>");
        //opt.attr(data[obj]["idContacto"]+"_eq");
        opt.html(data[obj]["nombreCompleto"]);
        $("#equipoProyecto").append(opt);
    }


//    $('#equipoProyecto').append('<h4>Comité de Riesgos </h4>');
//    var data = {
//        idProyecto: idProyectoLocal
//    };
//    var jsonData = JSON.stringify(data);
//
//    $.ajax({
//        type: 'GET',
//        url: '../../api/R_listarIntegrantesProyecto' + '/' + data.idProyecto,
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        success: function(data) {
//            for (obj in data) {
//                var opt = $("<li id=" + data[obj]["idContacto"] + "_eq" + "></li>");
//                opt.html(data[obj]["nombreCompleto"]);
//                $("#equipoProyecto").append(opt);
//            }
//        }
//    });
//


}

function  leerComite() {

//HARCODEADO
var data = $.parseJSON('[{"idContacto":1,"nombreCompleto":"Juan"},{"idContacto":2,"nombreCompleto":"Luiggi"}]');
 $('#comiteRiesgos').append('<h4> Comité de Riesgos </h4>');

    for (obj in data) {
        var opt = $("<li id=" + data[obj]["idContacto"] + "_eq" + "></li>");
        //opt.attr(data[obj]["idContacto"]+"_eq");
        opt.html(data[obj]["nombreCompleto"]);
        $("#comiteRiesgos").append(opt);
    }

//    $('#comiteRiesgos').append('<h4>Comité de Riesgos </h4>');
//    var data = {
//        idProyecto: idProyectoLocal
//    };
//    var jsonData = JSON.stringify(data);
//
//    $.ajax({
//        type: 'GET',
//        url: '../../api/R_listarComiteRiesgo' + '/' + data.idProyecto,
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        success: function(data) {
//            for (obj in data) {
//                var opt = $("<li id=" + data[obj]["idContacto"] + "_eq" + "></li>");
//                opt.html(data[obj]["nombreCompleto"]);
//                $("#comiteRiesgos").append(opt);
//            }
//        }
//    });

}