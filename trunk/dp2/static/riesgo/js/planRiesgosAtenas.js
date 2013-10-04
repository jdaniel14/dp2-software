$(document).ready(main);
localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");


function main() {

    leerEquipo();
    leerComite();

    $("#btnGuardarComite").click(function() {
        agregarEquipo();
        agregarComite();

    });

    $("#btnGuardarMetodologia").click(function() {

        var data = {
            idProyecto: idProyectoLocal,
            metodologia: $("#metodologia").val()

        };
        var jsonData = JSON.stringify(data);
        console.log(data);

        $.ajax({
            type: 'POST',
            url: "../../api/R_registrarMetodologia",
            data: jsonData,
            dataType: "json",
            success: function(data) {
                alert("Se registró la metodologia exitosamente");
            },
            fail: function(data) {
                alert(data.me);
            }
        });

    });

}

function  agregarEquipo() {
    var data = {
        idProyecto: idProyectoLocal,
        listaEquipo: []
    };

    $('#equipoProyecto li').each(function(index) {
        //formo data
        data.listaEquipo[index] = this.id;

    });

    //console.log(data3);
    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    //alert("Elemento: " + $(elemento).text() + " en el indice " + index);

    $.ajax({
        type: 'POST',
        url: "../../api/R_listarcomiteRiesgo",
        data: jsonData,
        dataType: "json",
        success: function(data) {


            alert("Se registró el equipo exitosamente");
        },
        fail: function(data) {
            alert(data.me);
        }
    });



}
function  agregarComite() {


    var data = {
        idproyecto: idProyectoLocal,
        listaComite: []
    };



    $('#comiteRiesgos li').each(function(index) {
        //datos[index] = this.id;
        data.listaComite[index] = this.id;
    });

    var jsonData = JSON.stringify(data);
    console.log(jsonData);




    $.ajax({
        type: 'POST',
        url: "../../api/R_registrarComiteRiesgo",
        data: jsonData,
        dataType: "json",
        success: function(data) {
            alert("Se registró el comite exitosamente");
        },
        fail: function(data) {
            alert(data.me);
        }
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


    $('#equipoProyecto').append('<h4>Equipo del Proyecto </h4>');
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
                var opt = $("<li id=" + data[obj]["idContacto"] + "></li>");
                opt.html(data[obj]["nombreCompleto"]);
                $("#equipoProyecto").append(opt);
            }
        }
    });



}

function  leerComite() {

////HARCODEADO
//    var data = $.parseJSON('[{"idContacto":1,"nombreCompleto":"Juan"},{"idContacto":2,"nombreCompleto":"Luiggi"}]');
//    $('#comiteRiesgos').append('<h4> Comité de Riesgos </h4>');
//
//    for (obj in data) {
//        var opt = $("<li id=" + data[obj]["idContacto"] + "_com" + "></li>");
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
                var opt = $("<li id=" + data[obj]["idContacto"]  + "></li>");
                opt.html(data[obj]["nombreCompleto"]);
                $("#comiteRiesgos").append(opt);
            }
        }
    });

}