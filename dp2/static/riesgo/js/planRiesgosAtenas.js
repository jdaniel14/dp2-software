$(document).ready(main);
localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main() {

    leerEquipo();
    leerComite();
  //  agregarEquipo();
   // agregarComite();

}

function  agregarEquipo() {

    $('#equipoProyecto li').each(function(index) {
        //formo data
        var data = {
			idProyecto: $('#idProyecto').val(),
			idContacto: index
			
                    };
        
        console.log(data);
        //alert("Elemento: " + $(elemento).text() + " en el indice " + index);

    });


}
function  agregarComite() {

    $('#comiteRiesgos li').each(function(index, elemento) {
        alert("Elemento: " + $(elemento).text() + " en el indice " + index);

    });


}


function  leerEquipo() {
    //HARDCODEADO
//    var data = $.parseJSON('[{"idContacto":1,"nombreCompleto":"Oscar"},{"idContacto":2,"nombreCompleto":"Oooo"}]');
//    $('#equipoProyecto').append('<h4> Equipo del Proyecto </h4>');
//
//    for (obj in data) {
//        var opt = $("<li id=" + data[obj]["idContacto"] + "_eq" + "></li>");
//        //opt.attr(data[obj]["idContacto"]+"_eq");
//        opt.html(data[obj]["nombreCompleto"]);
//        $("#equipoProyecto").append(opt);
//    }


    $('#equipoProyecto').append('<h4>Comité de Riesgos </h4>');
    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_listarIntegrantesProyecto' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            for (obj in data) {
                var opt = $("<li id=" + data[obj]["idContacto"] + "_eq" + "></li>");
                opt.html(data[obj]["nombreCompleto"]);
                $("#equipoProyecto").append(opt);
            }
        }
    });



}

function  leerComite() {

//HARCODEADO
//var data = $.parseJSON('[{"idContacto":1,"nombreCompleto":"Juan"},{"idContacto":2,"nombreCompleto":"Luiggi"}]');
// $('#comiteRiesgos').append('<h4> Comité de Riesgos </h4>');
//
//    for (obj in data) {
//        var opt = $("<li id=" + data[obj]["idContacto"] + "_eq" + "></li>");
//        //opt.attr(data[obj]["idContacto"]+"_eq");
//        opt.html(data[obj]["nombreCompleto"]);
//        $("#comiteRiesgos").append(opt);
//    }

    $('#comiteRiesgos').append('<h4>Comité de Riesgos </h4>');
    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_listarComiteRiesgo' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            for (obj in data) {
                var opt = $("<li id=" + data[obj]["idContacto"] + "_eq" + "></li>");
                opt.html(data[obj]["nombreCompleto"]);
                $("#comiteRiesgos").append(opt);
            }
        }
    });

}