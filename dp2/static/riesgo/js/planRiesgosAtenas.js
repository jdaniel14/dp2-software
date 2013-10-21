$(document).ready(main);
//localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");
function validAtenas() {
    var metodologia = $("#metodologia").val();
    if (metodologia == null || metodologia.length == 0) {
        return false;
    }
    return true;
}

function validEstrategia() {
    var cantidadEstrategias = $("#cantidadEstrategias").val();
    var puntajeMax = $("#puntajeMax").val();
    if (parseInt(puntajeMax) < parseInt(cantidadEstrategias)) {
        alert("la cantidad de estrategias no debe ser mayor al puntaje maximo");
        return false;
    }
    if (cantidadEstrategias == null || cantidadEstrategias.length == 0) {
        alert("la cantidad de Estrategias no puede ser vacio");
        return false;
    }
    if (cantidadEstrategias > 7 || cantidadEstrategias < 2) {
        alert("la cantidad de Estrategias debe ser entre 2 y 7");
        return false;
    }

    return true;
}

function validCampos() {
    var i = 0;
    var valor;
    $(".prioridad").each(function() {
        var prioridad = $($("input.prioridad")[i]).val(); // valor de inputs
        var significado = $($("input.significado")[i]).val();
        var puntajeMax = $($("input.puntajeMax")[i]).val();
        var puntajeMin = $($("input.puntajeMin")[i]).val();
        if (prioridad === null || prioridad.length === 0 || significado === null || significado.length === 0 || puntajeMax === null || puntajeMax.length === 0 || puntajeMin === null || puntajeMin.length === 0) {
            //ALERTAR
            valor = "vacio";
            alert("Debe registrar todos los campos");
            return false;

        }

        i++;

    });
    if (valor === "vacio")
        return false;
    else
        return true;
}




var puntaje;
var puntajeMin;
var puntajeMax;

$(document).on('change', '.puntajeMax', function() {
    var idPuntaje = $(this).attr("id");
    puntaje = $(this).val();
    var rowIndex = $('#tablaCategorizacion tr').index();
    //console.log(rowIndex);


});





function main() {
    leerEquipo();
    leerNivelImpacto();
    //leerNivelProbabilidad();

    leerComite();
    leerPuntajes();
    leerCategorias();

    $("#btnCancelar").click(function() {
        parent.location.reload();
    });


    $("#btnGenerar").click(function() {
        if (!validEstrategia())
            return;
        alert("Se borrará si existe datos anteriores");
        var estrategias = $("#cantidadEstrategias").val();

        puntajeMin = $("#puntajeMin").val();

        puntajeMax = $("#puntajeMax").val();
        $('#tablaCategorizacion').html("");

        var factorSuma = parseFloat(puntajeMax) / parseFloat(estrategias);


        var residuo = parseInt(puntajeMax) % parseInt(estrategias);

        var valor = 0;
        for (var i = 1; i <= estrategias; i++) {
            var puntajeMinim = parseFloat(puntajeMin) + parseFloat(valor);
            var puntajeMinimo = Math.round(puntajeMinim);

            var puntajeMaximo = Math.round(parseFloat(puntajeMinim) + parseFloat(factorSuma) - 1);

            //creo inputs dinamicos
            $('#tablaCategorizacion').append("<tr><td><input  class=\"input puntajeMin\" type=\"text\" id=\"puntajeMin" + i + "\" value =\"" + puntajeMinimo + "\"  ></td>\n\
                                                   <td><input class=\"input puntajeMax\" type=\"text\" id=\"puntajeMax" + i + "\" value=\"" + puntajeMaximo + "\" ></td>\n\
                                                   <td><input class=\"input prioridad\" type=\"text\" id=\"prioridad" + i + "\"></td>\n\
                                                   <td><select class=\"estrategia\" id=\"estrategia" + i + "\">\n\
                                                        <option  value=\"evitar\" >Evitar</option>\n\
                                                        <option  value=\"transferir\">Transferir</option>\n\
                                                         <option  value=\"mitigar\" >Mitigar</option>\n\
                                                         <option  value=\"compartir\" >Compartir</option>\n\
                                                         <option  value=\"mejorar\" >Mejorar</option>\n\
                                                         <option  value=\"explotar\" >Explotar</option></select></td>\n\
                                                     <td><input class=\"significado\" style=\" width: 400px; type=\"text\" id=\"significado" + i + "\"></td></tr>");

            valor = valor + factorSuma;

        }
        $($(".puntajeMin")[0]).prop('disabled', true);
        $("#tablaRecursos").find("tr:last td:eq(1) input").prop('disabled', true);
        //$($(".puntajeMin")[0]).prop('disabled',false);





    });




    $("#btnGrabarCategorizacion").click(function() {

        if (!validCampos())
            return;

        var data = {
            idProyecto: idProyectoLocal,
            listaEstrategias: []
        };

        var i = 0;
        $(".puntajeMin").each(function() {

            var obj = {
                puntajeMin: $($("input.puntajeMin")[i]).val(), // valor de inputs
                puntajeMax: $($("input.puntajeMax")[i]).val(),
                prioridad: $($("input.prioridad")[i]).val(),
                estrategia: $($("select.estrategia")[i]).val(),
                significado: $($("input.significado")[i]).val()

            };
            i++;
            data.listaEstrategias[i - 1] = obj;
        });
        var jsonData = JSON.stringify(data);
        //console.log(data);

        $.ajax({
            type: 'POST',
            url: "../../api/R_registrarEstrategias",
            data: jsonData,
            dataType: "json",
            success: function(data) {
                alert("Se registró la categorización exitosamente");
            },
            fail: function(data) {
                alert(data.me);
            }

        });
        alert("Se registró la categorización exitosamente");



    });


    $("#btnGuardarComite").click(function() {
        agregarEquipo();
        agregarComite();

    });

    $("#btnGuardarMetodologia").click(function() {
        if (!validAtenas())
            return;
        var data = {
            idProyecto: idProyectoLocal,
            metodologia: $("#metodologia").val()

        };
        var jsonData = JSON.stringify(data);
        //console.log(data);

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



function leerCategorias() {

//
//    var data =$.parseJSON('[{"idEstrategia":1,"puntajeMin":1, "puntajeMax":25, "prioridad":"Muy Baja", "estrategia":"evitar", "significado": "No hacer nada"}, {"idEstrategia":2,"puntajeMin":26, "puntajeMax":50, "prioridad":"Baja", "estrategia":"mitigar", "significado": "Dejar por escrito"}]');
//    console.log(data);
//
//   for (obj in data) {
//       var idEstrategia = data[obj]["idEstrategia"];    
//       var puntajeMin = data[obj]["puntajeMin"];
//       var puntajeMax = data[obj]["puntajeMax"];
//       var prioridad = data[obj]["prioridad"];
//       var estrategia = data[obj]["estrategia"];
//       var significado = data[obj]["significado"];
//        
//      $('#tablaCategorizacion').append("<tr>\n\
//                                            <td><input disabled class=\"input-mini puntajeMin\" type=\"text\" id=\"puntajeMin" + idEstrategia + "\" value =\""+puntajeMin+"\"></td>\n\
//                                            <td><input class=\"input-mini puntajeMax\" type=\"text\" id=\"puntajeMax" +  idEstrategia+ "\" value=\""+ puntajeMax+"\"></td>\n\
//                                            <td><input class=\"input-sm prioridad\" type=\"text\" id=\"prioridad" + idEstrategia + "\" value=\""+ prioridad+"\"></td>\n\
//                                            <td><select disabled class=\"estrategia\" id=\"estrategia" + idEstrategia + "\">\n\
//                                                     <option  value=\""+ estrategia +"\">" +estrategia+ "</option>\n\
//                                            <td><input class=\"input-large significado\" type=\"text\" id=\"significado" + idEstrategia + "\" value=\""+ significado+"\"></td></tr>");
//
//
//   }



    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_listarEstrategias' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            for (obj in data) {
                var idEstrategia = data[obj]["idEstrategia"];
                var puntajeMin = data[obj]["puntajeMin"];
                var puntajeMax = data[obj]["puntajeMax"];
                var prioridad = data[obj]["prioridad"];
                var estrategia = data[obj]["estrategia"];
                var significado = data[obj]["significado"];

                $('#tablaCategorizacion').append("<tr>\n\
                                                     <td><input  class=\"input puntajeMin\" type=\"text\" id=\"puntajeMin" + idEstrategia + "\" value =\"" + puntajeMin + "\"></td>\n\
                                                     <td><input class=\"input puntajeMax\" type=\"text\" id=\"puntajeMax" + idEstrategia + "\" value=\"" + puntajeMax + "\"></td>\n\
                                                     <td><input class=\"input prioridad\" type=\"text\" id=\"prioridad" + idEstrategia + "\" value=\"" + prioridad + "\"></td>\n\
                                                     <td><select disabled class=\"estrategia\" style=\"width: 100%; id=\"estrategia" + idEstrategia + "\">\n\
                                                              <option  class=\"input\" value=\"" + estrategia + "\">" + estrategia + "</option>\n\
                                                     <td><input class=\"significado\" style=\" width: 400px; type=\"text\" id=\"significado" + idEstrategia + "\" value=\"" + significado + "\"></td></tr>");


            }

            $($(".puntajeMin")[0]).prop('disabled', true);
            $("#tablaRecursos").find("tr:last td:eq(1) input").prop('disabled', true);
        }
    });





}





function  leerPuntajes() {
//    var data = $.parseJSON('{"puntajeMin":1,"puntajeMax":50}');
//    $("#puntajeMin").val(data["puntajeMin"]);
//    $("#puntajeMax").val(data["puntajeMax"]);

    var data = {
        idProyecto: idProyectoLocal
    };
    // var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_obtenerPuntajes' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#puntajeMin").val(data["puntajeMin"]);
            $("#puntajeMax").val(data["puntajeMax"]);
        }
    });




}


function  agregarEquipo() {
    var data = {
        idProyecto: idProyectoLocal,
        listaEquipo: []
    };

    var datos = [];
    $('#equipoProyecto li').each(function(index) {
        //formo data
        //data.listaEquipo[index] = this.id;
        datos.push(this.id);

    });

    //console.log(datos);
    //console.log(data3);
    var jsonData = JSON.stringify(data);
    // console.log(jsonData);
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
        idProyecto: idProyectoLocal,
        listaComite: []
    };



    $('#comiteRiesgos li').each(function(index) {
        //datos[index] = this.id;
        data.listaComite[index] = this.id;
    });

    var jsonData = JSON.stringify(data);
    //
    //console.log(jsonData);




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
function leerNivelProbabilidad(impactos) {

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    var datos = leerMatriz();

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_crearMatriz' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(datos) {
            $.ajax({
                type: 'GET',
                url: '../../api/R_listaHeadersProbabilidadRiesgo' + '/' + data.idProyecto,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    var fila, opt, fil, cad;
                    var i = 0;
                    for (obj in data) {

                        fila = $("<tr></tr>");
                        opt = $("<td >" + data[obj]["nivel"] + "</td> ");

                        $(fila).append(opt);
                        for (var j = 1; j < datos[i].length; j++) {

                            fil = $("<td class=\"matriz\" id=\"" + i + datos[i][j]['valorMult'] + "\">" + datos[i][j]['valorMult'] + "</td>");
                            $(fila).append(fil);

                        }
                        i++;


                        $("#tablaMatrizRiesgos").append(fila);

                    }
                    pintarMatriz(impactos);
                }
            });
        }
    });



}

function pintarMatriz(impactos) {

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_listarEstrategias' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            var i = 0;
            var longitud = impactos.length;
            r = Math.round(Math.random() * 255);
            g = Math.round(Math.random() * 255);
            b = Math.round(Math.random() * 255);
            for (obj in data) {
                // var idEstrategia = data[obj]["idEstrategia"];
                var puntajeMin = data[obj]["puntajeMin"];
                var puntajeMax = data[obj]["puntajeMax"];
                console.log("puntajeMin" + puntajeMin);

                console.log("puntajeMax" + puntajeMax);
                // var prioridad = data[obj]["prioridad"];
                // var estrategia = data[obj]["estrategia"];
                //var significado = data[obj]["significado"];

                //    for(var i;i<longitud;i++){

                console.log("nuevo");
                $(".matriz").each(function() {
                    var puntaje = $($(".matriz")[i]).attr("id");
                    var porcion = puntaje.substring(1);
                    if (parseInt(porcion) >= parseInt(puntajeMin) && parseInt(porcion) <= parseInt(puntajeMax)) {
                        console.log("puntaje" + porcion);
                        $("#" + puntaje + "").css('background-color', 'rgb(' + r + ' ,' + g + ',' + b + ')');

                    }
                    i++;
                });
                i = 0;
                r = Math.round(Math.random() * 255);
                g = Math.round(Math.random() * 255);
                b = Math.round(Math.random() * 255);
                //   }
                //if(parseInt(puntaje))
                //i=longitud;
                //longitud=longitud+impactos.length;
            }
        }
    });
}


function leerNivelImpacto() {


    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_listaHeadersImpactoRiesgo' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            var fila = $("<tr></tr>");
            $(fila).append("<td width=\"15%\"><b>Probabilidad/Impacto<b></td>");
            for (obj in data) {
                var opt = $("<td width=\"15%\">" + data[obj]["nivel"] + "</td>");
                $(fila).append(opt);
            }
            $("#tablaMatrizRiesgos").append(fila);
            leerNivelProbabilidad(data);
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

function leerMatriz() {

    // var data = $.parseJSON('[[{"valorProb":"1"},{"valorImpacto":"1","valorMult":"1"},{"valorImpacto":"2","valorMult":"2"},{"valorImpacto":"3","valorMult":"3"},{"valorImpacto":"4","valorMult":"4"},{"valorImpacto":"5","valorMult":"5"}],[{"valorProb":"2"},{"valorImpacto":"1","valorMult":"2"},{"valorImpacto":"2","valorMult":"4"},{"valorImpacto":"3","valorMult":"6"},{"valorImpacto":"4","valorMult":"8"},{"valorImpacto":"5","valorMult":"10"}]]');
    //var data = $.parseJSON('[[{"valorProb":"1"},{"valorImpacto":"1","valorMult":"1"},{"valorImpacto":"2","valorMult":"2"},{"valorImpacto":"3","valorMult":"3"},{"valorImpacto":"4","valorMult":"4"},{"valorImpacto":"5","valorMult":"5"}],[{"valorProb":"2"},{"valorImpacto":"1","valorMult":"2"},{"valorImpacto":"2","valorMult":"4"},{"valorImpacto":"3","valorMult":"6"},{"valorImpacto":"4","valorMult":"8"},{"valorImpacto":"5","valorMult":"10"}],[{"valorProb":"3"},{"valorImpacto":"1","valorMult":"3"},{"valorImpacto":"2","valorMult":"6"},{"valorImpacto":"3","valorMult":"9"},{"valorImpacto":"4","valorMult":"12"},{"valorImpacto":"5","valorMult":"15"}],[{"valorProb":"4"},{"valorImpacto":"1","valorMult":"4"},{"valorImpacto":"2","valorMult":"8"},{"valorImpacto":"3","valorMult":"12"},{"valorImpacto":"4","valorMult":"16"},{"valorImpacto":"5","valorMult":"20"}]]');

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_crearMatriz' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {

            return data;
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
                var opt = $("<li id=" + data[obj]["idContacto"] + "></li>");
                opt.html(data[obj]["nombreCompleto"]);
                $("#comiteRiesgos").append(opt);
            }
        }
    });

}