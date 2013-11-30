$(document).ready(main);
var arregloPermisoJP = new Array();
var arregloPermisoGP = new Array();
var arregloPermisoMP = new Array();
var rol = localStorage.getItem("idRol");
var arregloPermisoJP = new Array();
var arregloPermisoGP = new Array();
var arregloPermisoMP = new Array();
//localStorage.setItem("idProyecto", 1);
var idProyectoLocal = localStorage.getItem("idProyecto");
var rol = localStorage.getItem("idRol");
function validAtenas() {
    var metodologia = $("#metodologia").val();
    if (metodologia == null || metodologia.length == 0) {
        return false;
    }
    return true;
}

function validEstrategia1() {
    var cantidadEstrategias = $("#cantidadEstrategias1").val();
    var puntajeMax = $(".puntajeMax").val();
    if (parseInt(puntajeMax) < parseInt(cantidadEstrategias)) {
        $("#labelErrorModal").html("");
        $("#labelErrorModal").append("La cantidad de estrategias no debe ser mayor al puntaje maximo");
        $('#ModaldeErrores').modal('show');

        // alert("la cantidad de estrategias no debe ser mayor al puntaje maximo");
        return false;
    }
    if (cantidadEstrategias == null || cantidadEstrategias.length == 0) {
        // alert("la cantidad de Estrategias no puede ser vacio");
        $("#labelErrorModal").html("");
        $("#labelErrorModal").append("La cantidad de Estrategias no puede ser vacio");
        $('#ModaldeErrores').modal('show');
        return false;
    }
    if (cantidadEstrategias > 4 || cantidadEstrategias < 2) {
        // alert("la cantidad de Estrategias debe ser entre 2 y 4");
        $("#labelErrorModal").html("");
        $("#labelErrorModal").append("La cantidad de Estrategias debe ser entre 2 y 4");
        $('#ModaldeErrores').modal('show');
        return false;
    }

    return true;
}

function validEstrategia2() {
    var cantidadEstrategias = $("#cantidadEstrategias2").val();
    var puntajeMax = $(".puntajeMax").val();
    if (parseInt(puntajeMax) < parseInt(cantidadEstrategias)) {
        // alert("la cantidad de estrategias no debe ser mayor al puntaje maximo");
        $("#labelErrorModal").html("");
        $("#labelErrorModal").append("La cantidad de estrategias no debe ser mayor al puntaje maximo");
        $('#ModaldeErrores').modal('show');
        return false;
    }
    if (cantidadEstrategias == null || cantidadEstrategias.length == 0) {
        // alert("la cantidad de Estrategias no puede ser vacio");
        $("#labelErrorModal").html("");
        $("#labelErrorModal").append("La cantidad de Estrategias no puede ser vacio");
        $('#ModaldeErrores').modal('show');
        return false;
    }
    if (cantidadEstrategias > 4 || cantidadEstrategias < 2) {
        // alert("la cantidad de Estrategias debe ser entre 2 y 4");
        $("#labelErrorModal").html("");
        $("#labelErrorModal").append("La cantidad de Estrategias debe ser entre 2 y 4");
        $('#ModaldeErrores').modal('show');
        return false;
    }

    return true;
}

function validCampos1() {
    var i = 0;
    var valor;
    $(".prioridad1").each(function() {
        var prioridad = $($("input.prioridad1")[i]).val(); // valor de inputs
        var significado = $($("input.significado1")[i]).val();
        var puntajeMax = $($("input.puntajeMax")[i]).val();
        var puntajeMin = $($("input.puntajeMin")[i]).val();

        if (prioridad === null || prioridad.length === 0 || significado === null || significado.length === 0 || puntajeMax === null || puntajeMax.length === 0 || puntajeMin === null || puntajeMin.length === 0) {
            //ALERTAR
            valor = "vacio";
            // alert("Debe registrar todos los campos");
            $("#labelErrorModal").html("");
            $("#labelErrorModal").append("Debe registrar todos los campos");
            $('#ModaldeErrores').modal('show');
            return false;

        }

        i++;

    });
  
    if (valor === "vacio")
        return false;
     if (valor === "menor")
        return false;
    else
        return true;
}

function validCampos2() {
    var i = 0;
    var valor;
    $(".prioridad2").each(function() {
        var prioridad = $($("input.prioridad2")[i]).val(); // valor de inputs
        var significado = $($("input.significado2")[i]).val();
        var puntajeMax = $($("input.puntajeMax")[i]).val();
        var puntajeMin = $($("input.puntajeMin")[i]).val();
        if (prioridad === null || prioridad.length === 0 || significado === null || significado.length === 0 || puntajeMax === null || puntajeMax.length === 0 || puntajeMin === null || puntajeMin.length === 0) {
            //ALERTAR
            valor = "vacio";
            // alert("Debe registrar todos los campos");
            $("#labelErrorModal").html("");
            $("#labelErrorModal").append("Debe registrar todos los campos");
            $('#ModaldeErrores').modal('show');
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
    
      arregloPermisoJP = ["btnAumentar", "btnEliminarTipoXNivelModal","btnGenerar1","btnGrabarCategorizacion1","btnCancelar1","btnCancelar2","btnGenerar2","btnGrabarCategorizacion2","btnGuardarComite"];



    for (var i = 0; i < arregloPermisoJP.length; i++) {
        $("#" + arregloPermisoJP[i] + "").hide();
    }

    if (rol == 2) {
        for (var i = 0; i < arregloPermisoJP.length; i++) {
            $("#" + arregloPermisoJP[i] + "").show();
        }
    }
     if (rol == 1) {
        for (var i = 0; i < arregloPermisoJP.length; i++) {
            $("#" + arregloPermisoJP[i] + "").show();
        }
    }
    
     if (rol==3) {
        
            $("#" + arregloPermisoJP[0] + "").show();
                   
    }
    leerEquipo();
    leerNivelImpacto1();
    leerNivelImpacto2();
    //leerNivelProbabilidad();

    leerComite();
    leerPuntajes();
    leerCategorias1();
     leerCategorias2();

    $("#btnCancelar").click(function() {
        parent.location.reload();
    });


    $("#btnGenerar1").click(function() {
        if (!validEstrategia1())
            return;
        ("#labelExitoModal").html("");
        $("#labelExitoModal").append("Se borrará si existe datos anteriores");
        $('#modalExito').modal('show');
        // alert("Se borrará si existe datos anteriores");
        var estrategias = $("#cantidadEstrategias1").val();

        puntajeMin = $("#puntajeMin").val();

        puntajeMax = $("#puntajeMax").val();
        $('#tablaCategorizacion1').html("");

        var factorSuma = parseFloat(puntajeMax) / parseFloat(estrategias);


        var residuo = parseInt(puntajeMax) % parseInt(estrategias);

        var valor = 0;
        for (var i = 1; i <= estrategias; i++) {
            var puntajeMinim = parseFloat(puntajeMin) + parseFloat(valor);
            var puntajeMinimo = Math.round(puntajeMinim);

            var puntajeMaximo = Math.round(parseFloat(puntajeMinim) + parseFloat(factorSuma) - 1);

            //creo inputs dinamicos
            $('#tablaCategorizacion1').append("<tr><td><input  class=\"form-control puntajeMin1\" type=\"text\" id=\"puntajeMin1" + i + "\" value =\"" + puntajeMinimo + "\"  ></td>\n\
                                                   <td><input class=\"form-control puntajeMax1\" type=\"text\" id=\"puntajeMax1" + i + "\" value=\"" + puntajeMaximo + "\" ></td>\n\
                                                   <td><input class=\"form-control prioridad1\" type=\"text\" id=\"prioridad" + i + "\"></td>\n\
                                                   <td><select  readonly class=\" form-control estrategia1\" id=\"estrategia" + i + "\">\n\\n\
                                                        <option  value=\"Aceptar\" >Aceptar</option>\n\
                                                         <option  value=\"Compartir\" >Compartir</option>\n\
                                                         <option  value=\"Mejorar\" >Mejorar</option>\n\
                                                         <option  value=\"Explotar\" >Explotar</option></select></td>\n\
                                                     <td><input class=\"form-control significado1\" style=\" width: 400px; type=\"text\" id=\"significado" + i + "\"></td></tr>");

            valor = valor + factorSuma;

        }
        $($(".puntajeMin")[0]).prop('disabled', true);
        $("#tablaRecursos").find("tr:last td:eq(1) input").prop('disabled', true);
        //$($(".puntajeMin")[0]).prop('disabled',false);





    });

    $("#btnGenerar2").click(function() {
        if (!validEstrategia2())
            return;
        ("#labelExitoModal").html("");
        $("#labelExitoModal").append("Se borrará si existe datos anteriores");
        $('#modalExito').modal('show');
        // alert("Se borrará si existe datos anteriores");
        var estrategias = $("#cantidadEstrategias2").val();

        puntajeMin = $("#puntajeMin").val();

        puntajeMax = $("#puntajeMax").val();
        $('#tablaCategorizacion2').html("");

        var factorSuma = parseFloat(puntajeMax) / parseFloat(estrategias);


        var residuo = parseInt(puntajeMax) % parseInt(estrategias);

        var valor = 0;
        for (var i = 1; i <= estrategias; i++) {
            var puntajeMinim = parseFloat(puntajeMin) + parseFloat(valor);
            var puntajeMinimo = Math.round(puntajeMinim);

            var puntajeMaximo = Math.round(parseFloat(puntajeMinim) + parseFloat(factorSuma) - 1);

            //creo inputs dinamicos
            $('#tablaCategorizacion2').append("<tr><td><input  class=\"form-control puntajeMin2\" type=\"text\" id=\"puntajeMin2" + i + "\" value =\"" + puntajeMinimo + "\"  ></td>\n\
                                                   <td><input class=\"form-control puntajeMax2\" type=\"text\" id=\"puntajeMax2" + i + "\" value=\"" + puntajeMaximo + "\" ></td>\n\
                                                   <td><input class=\"form-control prioridad2\" type=\"text\" id=\"prioridad" + i + "\"></td>\n\
                                                   <td><select readonly class=\"form-control estrategia2\" id=\"estrategia" + i + "\">\n\\n\
                                                        <option  value=\"Aceptar\" >Aceptar</option>\n\
                                                        <option  value=\"Evitar\" >Evitar</option>\n\
                                                        <option  value=\"Transferir\">Transferir</option>\n\
                                                         <option  value=\"Mitigar\" >Mitigar</option>\n\
                                                        </select></td>\n\
                                                     <td><input class=\"form-control significado2\" style=\" width: 400px; type=\"text\" id=\"significado" + i + "\"></td></tr>");

            valor = valor + factorSuma;

        }
        $($(".puntajeMin")[0]).prop('disabled', true);
        $("#tablaRecursos").find("tr:last td:eq(1) input").prop('disabled', true);
        //$($(".puntajeMin")[0]).prop('disabled',false);





    });



    $("#btnGrabarCategorizacion1").click(function() {

        if (!validCampos1())
            return;

        var data = {
            idProyecto: idProyectoLocal,
            listaEstrategias: [],
            tipo:1
           
        };

        var i = 0;
        $(".prioridad1").each(function() {

            var obj = {
                puntajeMin: $($("input.puntajeMin1")[i]).val(), // valor de inputs
                puntajeMax: $($("input.puntajeMax1")[i]).val(),
                prioridad: $($("input.prioridad1")[i]).val(),
                estrategia: $($("select.estrategia1")[i]).val(),
                significado: $($("input.significado1")[i]).val()
                
            };
            i++;
            data.listaEstrategias[i - 1] = obj;
        });
        
        var jsonData = JSON.stringify(data);
        
        console.log(data);

        $.ajax({
            type: 'POST',
            url: "../../api/R_registrarEstrategias",
            data: jsonData,
            dataType: "json",
            success: function(data) {
                ("#labelExitoModal").html("");
                $("#labelExitoModal").append("Se registró la categorización exitosamente");
                $('#modalExito').modal('show');
                // alert("Se registró la categorización exitosamente");
            },
            fail: function(data) {
                // alert(data.me);
                $("#labelErrorModal").html("");
                $("#labelErrorModal").append("Se encontro un Error: "+data.me);
                $('#ModaldeErrores').modal('show');
            }

        });
        // ("#labelExitoModal").html("");
        // $("#labelExitoModal").append("Se registró exitosamente el nivel " + item.descripcion);
        // $('#modalExito').modal('show');
        // alert("Se registró la categorización exitosamente");

    });

 $("#btnGrabarCategorizacion2").click(function() {

        if (!validCampos2())
            return;

        var data = {
            idProyecto: idProyectoLocal,
            listaEstrategias: [],
            tipo:2
            
        };

        var i = 0;
        $(".prioridad2").each(function() {

            var obj = {
                puntajeMin: $($("input.puntajeMin2")[i]).val(), // valor de inputs
                puntajeMax: $($("input.puntajeMax2")[i]).val(),
                prioridad: $($("input.prioridad2")[i]).val(),
                estrategia: $($("select.estrategia2")[i]).val(),
                significado: $($("input.significado2")[i]).val()
                
            };
            i++;
            data.listaEstrategias[i - 1] = obj;
        });
        var jsonData = JSON.stringify(data);
        console.log(data);

        $.ajax({
            type: 'POST',
            url: "../../api/R_registrarEstrategias",
            data: jsonData,
            dataType: "json",
            success: function(data) {
                ("#labelExitoModal").html("");
                $("#labelExitoModal").append("Se registró la categorización exitosamente");
                $('#modalExito').modal('show');
                // alert("Se registró la categorización exitosamente");
            },
            fail: function(data) {
                // alert(data.me);
                $("#labelErrorModal").html("");
                $("#labelErrorModal").append("Se encontro un Error: "+data.me);
                $('#ModaldeErrores').modal('show');
            }

        });
        // alert("Se registró la categorización exitosamente");

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
                ("#labelExitoModal").html("");
                $("#labelExitoModal").append("Se registró la metodologia exitosamente");
                $('#modalExito').modal('show');
                // alert("Se registró la metodologia exitosamente");
            },
            fail: function(data) {
                // alert(data.me);
                $("#labelErrorModal").html("");
                $("#labelErrorModal").append("Se encontro un Error: "+data.me);
                $('#ModaldeErrores').modal('show');
            }
        });

    });

}




function leerCategorias2() {

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_listarEstrategiasNegativo' + '/' + data.idProyecto,
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

                $('#tablaCategorizacion2').append("<tr>\n\
                                                     <td><input  readonly class=\"form-control puntajeMin2\" type=\"text\" id=\"puntajeMin2" + idEstrategia + "\" value =\"" + puntajeMin + "\"></td>\n\
                                                     <td><input readonly class=\"form-control puntajeMax2\" type=\"text\" id=\"puntajeMax2" + idEstrategia + "\" value=\"" + puntajeMax + "\"></td>\n\
                                                     <td><input readonly class=\"form-control prioridad2\" type=\"text\" id=\"prioridad2" + idEstrategia + "\" value=\"" + prioridad + "\"></td>\n\
                                                     <td><select disabled class=\"estrategia2\" style=\"width: 100%; id=\"estrategia" + idEstrategia + "\">\n\
                                                              <option  class=\"input\" value=\"" + estrategia + "\">" + estrategia + "</option>\n\
                                                     <td><input readonly class=\"form-control significado2\" style=\" width: 400px; type=\"text\" id=\"significado" + idEstrategia + "\" value=\"" + significado + "\"></td></tr>");


            }

            $($(".puntajeMin")[0]).prop('disabled', true);
            $("#tablaRecursos").find("tr:last td:eq(1) input").prop('disabled', true);
        }
    }); 
}

function leerCategorias1() {

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
        url: '../../api/R_listarEstrategiasPositivo' + '/' + data.idProyecto,
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

                $('#tablaCategorizacion1').append("<tr>\n\
                                                     <td><input  readonly class=\"form-control puntajeMin1\" type=\"text\" id=\"puntajeMin" + idEstrategia + "\" value =\"" + puntajeMin + "\"></td>\n\
                                                     <td><input readonly class=\"form-control puntajeMax1\" type=\"text\" id=\"puntajeMax" + idEstrategia + "\" value=\"" + puntajeMax + "\"></td>\n\
                                                     <td><input readonly class=\"form-control prioridad1\" type=\"text\" id=\"prioridad" + idEstrategia + "\" value=\"" + prioridad + "\"></td>\n\
                                                     <td><select disabled class=\"form-control estrategia1\" style=\"width: 100%; id=\"estrategia" + idEstrategia + "\">\n\
                                                              <option  class=\"form-control\" value=\"" + estrategia + "\">" + estrategia + "</option>\n\
                                                     <td><input readonly class=\" form-control significado1\" style=\" width: 400px; type=\"text\" id=\"significado" + idEstrategia + "\" value=\"" + significado + "\"></td></tr>");


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
            $(".puntajeMin").val(data["puntajeMin"]);
            $(".puntajeMax").val(data["puntajeMax"]);
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

            ("#labelExitoModal").html("");
            $("#labelExitoModal").append("Se registró el equipo exitosamente");
            $('#modalExito').modal('show');

            // alert("Se registró el equipo exitosamente");
        },
        fail: function(data) {
            // alert(data.me);
            $("#labelErrorModal").html("");
            $("#labelErrorModal").append("Se encontro un Error: "+data.me);
            $('#ModaldeErrores').modal('show');
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
            // alert("Se registró el comite exitosamente");
            ("#labelExitoModal").html("");
            $("#labelExitoModal").append("Se registró el comite exitosamente");
            $('#modalExito').modal('show');
        },
        fail: function(data) {
            // alert(data.me);
            $("#labelErrorModal").html("");
            $("#labelErrorModal").append("Se encontro un Error: "+data.me);
            $('#ModaldeErrores').modal('show');
        }
    });



}


function leerNivelProbabilidad1(impactos) {

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    var datos = leerMatrizPositivo();
    
    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_crearMatrizPositivo' + '/' + data.idProyecto,
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
                        opt = $("<td align=\"center\">" + data[obj]["descripcion"] + "</br>" + data[obj]["nivel"] + "</td> ");

                        $(fila).append(opt);
                        for (var j = 1; j < datos[i].length; j++) {

                            fil = $("<td align=\"center\" class=\"matriz1\" id=\"pos" + i + datos[i][j]['valorMult'] + "\"><b>" + datos[i][j]['arrayRiesgos'] + "</b></td>");
                            $(fila).append(fil);

                        }
                        i++;


                        $("#tablaMatrizRiesgos1").append(fila);

                    }
                    pintarMatriz1(impactos);
                }
            });
        }
    });



}

function leerNivelProbabilidad2(impactos) {

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    var datos = leerMatrizNegativo();

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_crearMatrizNegativo' + '/' + data.idProyecto,
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
                        opt = $("<td align=\"center\">" + data[obj]["descripcion"] + "</br>" + data[obj]["nivel"] + "</td> ");

                        $(fila).append(opt);
                        for (var j = 1; j < datos[i].length; j++) {

                            fil = $("<td align=\"center\" class=\"matriz2\" id=\"neg" + i + datos[i][j]['valorMult'] + "\"><b>" + datos[i][j]['arrayRiesgos'] + "</b></td>");
                            $(fila).append(fil);

                        }
                        i++;


                        $("#tablaMatrizRiesgos2").append(fila);

                    }
                    pintarMatriz2(impactos);
                }
            });
        }
    });



}

function pintarMatriz1(impactos) {

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_listarEstrategiasPositivo' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            var i = 0,j=0;
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
                $(".matriz1").each(function() {
                    var puntaje = $($(".matriz1")[i]).attr("id");
                    console.log(puntaje);
                    var porcion = puntaje.substring(4);
                    if (parseInt(porcion) >= parseInt(puntajeMin) && parseInt(porcion) <= parseInt(puntajeMax)) {
                        //console.log("puntaje" + porcion);
                        $("#" + puntaje + "").css('background-color', 'rgb(' + r + ' ,' + g + ',' + b + ')');

                    }
                    i++;
                });
                i = 0;
                j++;
                 $("#leyendaPos").append("<div id="+j+"><label>"+puntajeMin+"-"+puntajeMax+"</label></div>");
                 $("#"+j+"").css('background-color', 'rgb(' + r + ' ,' + g + ',' + b + ')');
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

function pintarMatriz2(impactos) {

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);

    $.ajax({
        type: 'GET',
        url: '../../api/R_listarEstrategiasNegativo' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            var i = 0,j=0;
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
                $(".matriz2").each(function() {
                    var puntaje = $($(".matriz2")[i]).attr("id");
                    var porcion = puntaje.substring(4);
                    console.log(porcion);
                    if (parseInt(porcion) >= parseInt(puntajeMin) && parseInt(porcion) <= parseInt(puntajeMax)) {
                        console.log("puntaje" + porcion);
                        $("#" + puntaje + "").css('background-color', 'rgb(' + r + ' ,' + g + ',' + b + ')');
                        
               
                    }
                    i++;
                   });
                  
                   
                i = 0;
                j++;
                
                 $("#leyendaNeg").append("<div id="+j+"><label>"+puntajeMin+"-"+puntajeMax+"</label></div>");
                 $("#"+j+"").css('background-color', 'rgb(' + r + ' ,' + g + ',' + b + ')');
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


function leerNivelImpacto1() {


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
            $(fila).append("<td width=\"15%\" align=\"center\"><b>Probabilidad/Impacto<b></td>");
            for (obj in data) {
                var opt = $("<td width=\"15%\" align=\"center\">" + data[obj]["descripcion"] + "</br>" + data[obj]["nivel"] + "</td>");
                $(fila).append(opt);
            }
            $("#tablaMatrizRiesgos1").append(fila);
            leerNivelProbabilidad1(data);
        }
    });

}

function leerNivelImpacto2() {


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
            $(fila).append("<td width=\"15%\" align=\"center\"><b>Probabilidad/Impacto<b></td>");
            for (obj in data) {
                var opt = $("<td width=\"15%\" align=\"center\">" + data[obj]["descripcion"] + "</br>" + data[obj]["nivel"] + "</td>");
                $(fila).append(opt);
            }
            $("#tablaMatrizRiesgos2").append(fila);
            leerNivelProbabilidad2(data);
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

function leerMatrizPositivo() {

    // var data = $.parseJSON('[[{"valorProb":"1"},{"valorImpacto":"1","valorMult":"1"},{"valorImpacto":"2","valorMult":"2"},{"valorImpacto":"3","valorMult":"3"},{"valorImpacto":"4","valorMult":"4"},{"valorImpacto":"5","valorMult":"5"}],[{"valorProb":"2"},{"valorImpacto":"1","valorMult":"2"},{"valorImpacto":"2","valorMult":"4"},{"valorImpacto":"3","valorMult":"6"},{"valorImpacto":"4","valorMult":"8"},{"valorImpacto":"5","valorMult":"10"}]]');
    //var data = $.parseJSON('[[{"valorProb":"1"},{"valorImpacto":"1","valorMult":"1"},{"valorImpacto":"2","valorMult":"2"},{"valorImpacto":"3","valorMult":"3"},{"valorImpacto":"4","valorMult":"4"},{"valorImpacto":"5","valorMult":"5"}],[{"valorProb":"2"},{"valorImpacto":"1","valorMult":"2"},{"valorImpacto":"2","valorMult":"4"},{"valorImpacto":"3","valorMult":"6"},{"valorImpacto":"4","valorMult":"8"},{"valorImpacto":"5","valorMult":"10"}],[{"valorProb":"3"},{"valorImpacto":"1","valorMult":"3"},{"valorImpacto":"2","valorMult":"6"},{"valorImpacto":"3","valorMult":"9"},{"valorImpacto":"4","valorMult":"12"},{"valorImpacto":"5","valorMult":"15"}],[{"valorProb":"4"},{"valorImpacto":"1","valorMult":"4"},{"valorImpacto":"2","valorMult":"8"},{"valorImpacto":"3","valorMult":"12"},{"valorImpacto":"4","valorMult":"16"},{"valorImpacto":"5","valorMult":"20"}]]');

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    

    $.ajax({
        type: 'GET',
        url: '../../api/R_crearMatrizPositivo' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
           console.log(data);
            return data;
        }
    });


}


function leerMatrizNegativo() {

    // var data = $.parseJSON('[[{"valorProb":"1"},{"valorImpacto":"1","valorMult":"1"},{"valorImpacto":"2","valorMult":"2"},{"valorImpacto":"3","valorMult":"3"},{"valorImpacto":"4","valorMult":"4"},{"valorImpacto":"5","valorMult":"5"}],[{"valorProb":"2"},{"valorImpacto":"1","valorMult":"2"},{"valorImpacto":"2","valorMult":"4"},{"valorImpacto":"3","valorMult":"6"},{"valorImpacto":"4","valorMult":"8"},{"valorImpacto":"5","valorMult":"10"}]]');
    //var data = $.parseJSON('[[{"valorProb":"1"},{"valorImpacto":"1","valorMult":"1"},{"valorImpacto":"2","valorMult":"2"},{"valorImpacto":"3","valorMult":"3"},{"valorImpacto":"4","valorMult":"4"},{"valorImpacto":"5","valorMult":"5"}],[{"valorProb":"2"},{"valorImpacto":"1","valorMult":"2"},{"valorImpacto":"2","valorMult":"4"},{"valorImpacto":"3","valorMult":"6"},{"valorImpacto":"4","valorMult":"8"},{"valorImpacto":"5","valorMult":"10"}],[{"valorProb":"3"},{"valorImpacto":"1","valorMult":"3"},{"valorImpacto":"2","valorMult":"6"},{"valorImpacto":"3","valorMult":"9"},{"valorImpacto":"4","valorMult":"12"},{"valorImpacto":"5","valorMult":"15"}],[{"valorProb":"4"},{"valorImpacto":"1","valorMult":"4"},{"valorImpacto":"2","valorMult":"8"},{"valorImpacto":"3","valorMult":"12"},{"valorImpacto":"4","valorMult":"16"},{"valorImpacto":"5","valorMult":"20"}]]');

    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    

    $.ajax({
        type: 'GET',
        url: '../../api/R_crearMatrizNegativo' + '/' + data.idProyecto,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
           console.log(data);
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
