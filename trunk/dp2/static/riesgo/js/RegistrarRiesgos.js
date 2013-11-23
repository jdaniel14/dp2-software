var getAllItems = "../../api/R_listaRiesgo";
var getItem = "../../api/R_obtenerRiesgo";
var addItem = "../../api/R_registrarRiesgo";
var updateItem = "../../api/R_modificarRiesgo";
var logicDeleteItem = "../../api/R_eliminarLogicoRiesgo";
var physicalDeleteItem = "../../api/R_eliminarFisicoRiesgo";
var getAllPackets = "../../api/R_listaPaquetesEDT";
var getAllKnownItems = "../../api/R_listarRiesgoComun";
var addList = "../../api/R_asignarRiesgoComun"
var addConfg = "../../api/R_registrarConfiguracionProyecto";
var getStatus = "../../api/R_obtenerEstadoLogicoRiesgo";
var getResponsable = "../../api/R_listarComiteRiesgo";
var getProbability = "../../api/R_obtenerProbabilidadRiesgo";
var getImpactLevel1 = "../../api/R_obtenerNivelImpactoTipoImpacto1";
var getImpactLevel2 = "../../api/R_obtenerNivelImpactoTipoImpacto2";
var getAllTypesImpacts = "../../api/R_listaTiposImpactoRiesgo";
var getDescImpactLevelType = "../../api/R_obtenerDescripcionNivelImpactoTipoImpacto";
var confirmRisk = "../../api/R_confirmarRiesgo";
var confirmAllRisks = "../../api/R_confirmarRiesgos";
var getProjectName = "../../api/G_listaRecursoxProyecto";
var setMaterializada = "../../api/R_registrarMaterializacion";
var getAllItemsMaterializados = "../../api/R_obtenerRiesgoMaterializado";
var listAccions = "../../api/R_obtenerPlanContingenciaRiesgo"; 

$(document).ready(main);

var nombre = "";
var idPaqueteTrabajo = 0;
var idCategoriaRiesgo = 0;
var tipoImpacto;
var listaEquipo = [];
// var buscar = {
// 	nombre:nombre,
// 	idPaqueteTrabajo:idPaqueteTrabajo,
// 	idCategoriaRiesgo:idCategoriaRiesgo,
// }
var estadoLogico;
var idRiesgo2;
var idArray;
var listaPaquetes;
var idProyectoLocal = localStorage.getItem("idProyecto");
var listaTipos = [];

function main() {

    listarPaquetesTrabajo();
    listarResponsable();
    listarRiesgos();
    listarRiesgosComunes();
    listarTiposImpacto();
    listarRiesgosMaterializados();
    if (localStorage.getItem("idRiesgo") != null) {
        obtenerRiesgo(localStorage.getItem("idRiesgo"));
    }
    obtenerTitulo();


    $("#btnRegistrar").click(function() {

        var flag = true;  //if true se registra, if false mensaje de error!

        var data = {
            idProyecto: idProyectoLocal,
            nombre: $('#nomRiesgo').val(),
            tipoRiesgo: $('#tipoRiesgo').val(),
            idPaqueteTrabajo: $('#paqEdt').val(),
            idTipoImpacto: $('#tipoImpacto').val(),
            idNivelImpacto: $('#impRiesgo').val(),
            probabilidad: $('#proRiesgo').val(),
            impacto: '',
            idProbabilidad: $('#idnivelProbabilidadRiesgo').val(),
            acciones: $('#accEsp').val(),
            costoPotencial: $('#costRiesgo').val(),
            demoraPotencial: $('#tiemRiesgo').val(),
            idEmpleado: $('#equRes').val(),
            severidad: $('#svrRiesgo').val(),
            nombreResponsable: ''
        };

        if (tipoImpacto == 1) {
            data.impacto = $('#impRiesgo1').val();
        } else if (tipoImpacto == 2) {
            data.impacto = $('#impRiesgo2').val();
        }
        $.each(listaEquipo, function(i, value) {
            if (this.idContacto == data.idEmpleado) {
                data.nombreResponsable = this.nombreCompleto;
                return false;
            }
        });

        limpiarRegistrar();

        if (validarRegistro(data, 1)) {
            var jsonData = JSON.stringify(data);
            $.ajax({
                type: 'POST',
                url: addItem,
                data: jsonData,
                dataType: "json",
                success: function(data) {
                    var item = data;
                    alert("Se registró exitosamente el Riesgo " + item.idRiesgo + ": " + item.nombre);
                    // listarRiesgos();
                    // $('#myModalRegister').modal('hide');
                    window.location.replace("../riesgo/MostrarRiesgos.html");
                },
                fail: codigoError
            });
        }
    });
    $("#btnModificar").click(function() {

        var flag = true;
        var data = {
            idRiesgoXProyecto: $('#idRiesgoM').val(),
            idProyecto: idProyectoLocal,
            nombreRiesgo: $('#nomRiesgoM').val(),
            idPaqueteTrabajo: $('#paqEdtM').val(),
            tipoRiesgo: $('#tipoRiesgoM').val(),
            idTipoImpacto: $('#tipoImpactoM').val(),
            idNivelImpacto: $('#impRiesgoM').val(),
            probabilidad: $('#proRiesgoM').val(),
            impacto: '',
            idProbabilidad: $('#idnivelProbabilidadRiesgoM').val(),
            acciones: $('#accEspM').val(),
            costoPotencial: $('#costRiesgoM').val(),
            demoraPotencial: $('#tiemRiesgoM').val(),
            idEmpleado: $('#equResM').val(),
            severidad: $('#svrRiesgoM').val(),
            nombreResponsable: ''
        };

        if (tipoImpacto == 1) {
            data.impacto = $('#impRiesgo1M').val();
        } else if (tipoImpacto == 2) {
            data.impacto = $('#impRiesgo2M').val();
        }
        $.each(listaEquipo, function(i, value) {
            if (this.idContacto == data.idEmpleado) {
                data.nombreResponsable = this.nombreCompleto;
                return false;
            }
        });

        limpiarModificar();

        if (validarRegistro(data, 2)) {
            var jsonData = JSON.stringify(data);
            $.ajax({
                type: 'PUT',
                url: updateItem + '/' + data.idRiesgoXProyecto,
                data: jsonData,
                dataType: "json",
                success: function(data) {
                    var item = data;
                    alert("Se actualizó exitosamente el Riesgo ");
                    // listarRiesgos();
                    // $('#myModal').modal('hide');
                    window.location.replace("../riesgo/MostrarRiesgos.html");
                },
                fail: codigoError
            });
        }
    });

    //Función para agregar los riesgos conocidos al proyecto
    $("#btnAgregar").click(function() {
        var arreglo = [];
        $('#tablaRiesgosComunes input[type="checkbox"]:checked').each(function() {
            var $row = $(this).parents('tr');
            arreglo.push($row.find('td:eq(5) input').val());
        });
        var data = {
            lista: arreglo,
            idProyecto: idProyectoLocal
        };
        // console.log(data);
        var jsonData = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            url: addList,
            data: jsonData,
            // dataType: "json",
            success: function(data) {
                var item = data;
                alert("Se agregaron exitosamente");
                // listarRiesgos();
                // $('#myModalRegister').modal('hide');
                window.location.replace("../riesgo/MostrarRiesgos.html");
            },
            fail: function(data) {
                alert(data.me);
            }
        });
    });

//Funcion para confirmar los riesgos seleccionados con el checkbox

    $("#btnConfirmar").click(function() {
        var arreglo = [];
        if ($("#checkearTodos").prop('checked')) {
            $('#tablaRiesgosGlobal input[type="checkbox"]:checked').each(function() {
                var $row = $(this).parents('tr');
                if ($row.find('td:eq(12) input').val() != null) {
                    arreglo.push($row.find('td:eq(12) input').val()); //cambiar aca si se editan las filas
                }
            });
        } else {
            $('#tablaRiesgos input[type="checkbox"]:checked').each(function() {
                var $row = $(this).parents('tr');
                if ($row.find('td:eq(12) input').val() != null) {
                    arreglo.push($row.find('td:eq(12) input').val()); //cambiar aca si se editan las filas
                }
            });
        }


        var data = {
            lista: arreglo,
            idProyecto: idProyectoLocal
        };
        // console.log(data);
        var jsonData = JSON.stringify(data);
        $.ajax({
            type: 'PUT',
            url: confirmAllRisks + '/' + jsonData,
            // data: jsonData,
            // dataType: "json",
            success: function(data) {
                var item = data;
                alert(item);
                listarRiesgos();
                $('#myModalRegister').modal('hide');
            },
            fail: function(data) {
                alert(data.me);
            }
        });
    });


    $("#registrarRiesgo").click(function() {
        limpiarImpacto();
        limpiarConfirmar();
        $('#nomRiesgo').val('');
        $('#paqEdt').val(0);
        $('#tipoImpacto').val(0);
        $('#impRiesgo').val(0);
        $('#proRiesgo').val('');
        $('#svrRiesgo').val('');
        $('#accEsp').val('');
        $('#costRiesgo').val('');
        $('#tiemRiesgo').val('');
        $('#equRes').val(0);
        $('#impRiesgo1').val('');
        $('#impRiesgo2').val(0);
        $('#nivelImpactoRiesgo').val('');
        $('#idnivelProbabilidadRiesgo').val('');
        $('#nivelProbabilidadRiesgo').val('');
        $('#descnivelProbabilidadRiesgo').val('');
        limpiarRegistrar();
    });

    // $("#btnConfirmar").click( function(){
    // 	var jsonData = JSON.stringify(idArray);
    // 	$.ajax({
    // 		type: 'PUT',
    // 		url: confirmRisk + '/' + idArray,
    // 		data: jsonData,
    // 		dataType: "json",
    // 		success: function(data){
    // 			alert("Se ha confirmado el riesgo");
    // 			listarRiesgos();
    // 		},
    // 		fail: codigoError
    // 	});
    // });

    $("#btnEliminar").click(function() {
        var data = {
            idRiesgoProyecto: idArray
        }
        var jsonData = JSON.stringify(data);
        if (estadoLogico == 1) {
            $.ajax({
                type: 'DELETE',
                url: physicalDeleteItem + '/' + data.idRiesgoProyecto,
                dataType: "html",
                success: function() {
                    alert("Se elimino el riesgo correctamente");
                    listarRiesgos();
                },
                fail: codigoError
            });
        } else if (estadoLogico == 2) {
            $.ajax({
                type: 'PUT',
                url: logicDeleteItem + '/' + data.idRiesgoProyecto,
                dataType: "json",
                success: function(data) {
                    alert("Se elimino el riesgo correctamente");
                    listarRiesgos();
                },
                fail: codigoError
            });
        }
    });

    $("#btnAtrasRegistrar").click(function() {
        window.location.replace("../riesgo/MostrarRiesgos.html");
    });

    $("#btnMaterializar").click(function() {

        var data = {
            idRiesgoProyecto: parseInt(idArray),
            fechaMat: $('#fechaMat').val(),
            idAccionesRiesgo: $('#accionEscogida').val()
        };

        var jsonData = JSON.stringify(data);
        console.log(jsonData);
        $.ajax({
            type: 'PUT',
            url: setMaterializada,
            // dataType: "json",
            data: jsonData,
            success: function() {
                localStorage.setItem("idAccion", $('#accionEscogida').val());
                localStorage.setItem("idRiesgo", idRiesgo2);
                //ATENAS NO MUEVAS ESTE PEDAZO DE CODIGO PORFA! :)
                window.location.replace("../riesgo/ActualizarGantt.html");
            },
            fail: codigoError
        });

    });
}

function limpiarRegistrar() {
    $('#errorNombre').hide();
    $('#errorTipoImpacto').hide();
    $('#errorImpacto1').hide();
    $('#errorImpacto2').hide();
    $('#errorProba').hide();
    $('#errorCosto').hide();
    $('#errorTiempo').hide();
    $('#errorResponsable').hide();
    $('#RiesgoCaso1').hide();
    $('#RiesgoCaso2').hide();
    $('#errorNivelImpacto').hide();
    $('#errorTipoRiesgo').hide();
}

function limpiarModificar() {
    $('#errorNombreM').hide();
    $('#errorTipoImpactoM').hide();
    $('#errorImpacto1M').hide();
    $('#errorImpacto2M').hide();
    $('#errorProbaM').hide();
    $('#errorCostoM').hide();
    $('#errorTiempoM').hide();
    $('#errorResponsableM').hide();
    $('#RiesgoCaso1M').hide();
    $('#RiesgoCaso2M').hide();
    $('#errorNivelImpactoM').hide();
    $('#errorTipoRiesgoM').hide();
}

function limpiarObtener() {
    $('#idRiesgoM').val('');
    $('#nomRiesgoM').val('');
    $('#paqEdtM').val(0);
    $('#tipoImpactoM').val(0);
    $('#impRiesgo1M').val('');
    $('#proRiesgoM').val('');
    $('#svrRiesgoM').val('');
    $('#accEspM').val('');
    $('#costRiesgoM').val('');
    $('#tiemRiesgoM').val('');
    $('#equResM').val();
    $('#nivelImpactoRiesgoM').val('');
    $('#idnivelProbabilidadRiesgoM').val('');
    $('#nivelProbabilidadRiesgoM').val('');
    $('#descnivelProbabilidadRiesgoM').val('');
}


function listarTiposImpacto() {
    var data = {
        idProyecto: idProyectoLocal,
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: getAllTypesImpacts + '/' + data.idProyecto,
        dataType: "json",
        success: function(data) {
            listaTipos = data;
            agregarDataTiposImpacto(data);
        },
        fail:
                codigoError
    });
}

function listarPaquetesTrabajo() {
    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: getAllPackets + '/' + data.idProyecto,
        dataType: "json",
        success: function(data) {
            var lista = data;
            listaPaquetes = lista;
            $.each(lista, function(i, value) {
                $('#paqEdt').append("<option value=" + value.id + ">" + value.descripcion + "</option>");
                $('#paqEdtM').append("<option value=" + value.id + ">" + value.descripcion + "</option>");
                $('#idPaqueteRiesgo').append("<option value=" + value.id + ">" + value.descripcion + "</option>");
            });
        },
        fail: codigoError
    });
}
function obtenerRiesgo(id) {
    limpiarImpacto();
    limpiarObtener();
    limpiarModificar();
    var data = {
        id_riesgo_x_proyecto: id
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: getItem + '/' + data.id_riesgo_x_proyecto,
        data: jsonData,
        dataType: "json",
        success: function(data) {
            var item = data;
            tipoImpacto = item.tipoImpacto;
            $('#idRiesgoM').val(id);
            $('#nomRiesgoM').val(item.nombre);
            if (item.paqueteTrabajo == null) {
                $('#paqEdtM').val(0);
            } else
                $('#paqEdtM').val(item.paqueteTrabajo);
            $('#tipoRiesgoM').val(item.tipoRiesgo);
            if (item.idTipoImpacto != null) {
                $('#tipoImpactoM').val(item.idTipoImpacto);
            } else
                $('#tipoImpactoM').val(0);
            if (item.tipoImpacto == 1) {
                $('#RiesgoCaso1M').fadeIn('slow');
                $('#RiesgoCaso2M').hide();
                $('#impRiesgo1M').val(item.impacto);
            } else if (item.tipoImpacto == 2) {
                cargarImpactoEstimado2(item.impacto);
                $('#RiesgoCaso2M').fadeIn('slow');
                $('#RiesgoCaso1M').hide();
            }
            $('#nivelImpactoRiesgoM').val(item.nivelImpacto);
            if (item.nivelImpactoDescripcion != null) {
                $('#impRiesgoM').append("<option value=" + item.idNivelImpacto + " selected>" + item.nivelImpactoDescripcion + "</option>");
            }
            $('#proRiesgoM').val(item.probabilidad);
            $('#idnivelProbabilidadRiesgoM').val(item.idProbabilidadRiesgo);
            $('#descnivelProbabilidadRiesgoM').val(item.descProbabilidad);
            $('#nivelProbabilidadRiesgoM').val(item.nivelProbabilidad);
            $('#svrRiesgoM').val(item.severidad);
            $('#accEspM').val(item.accionesEspecificas);
            $('#costRiesgoM').val(item.costoPotencial);
            $('#tiemRiesgoM').val(item.demoraPotencial);
            if (item.idResponsable == null) {
                $('#equResM').val(0);
            } else
                $('#equResM').val(item.idResponsable);

            cargarProbabilidadModificacion(item.probabilidad);
        },
        fail: codigoError
    });
    localStorage.removeItem("idRiesgo");
}

function listarResponsable() {
    var data = {
        idProyecto: idProyectoLocal
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: getResponsable + '/' + data.idProyecto,
        dataType: "json",
        success: function(data) {
            listaEquipo = data;
            $.each(listaEquipo, function(i, value) {
                $('#equRes').append("<option value=" + value.idContacto + ">" + value.nombreCompleto + "</option>");
                $('#equResM').append("<option value=" + value.idContacto + ">" + value.nombreCompleto + "</option>");
            });
        },
        fail: codigoError
    });


}

function listarRiesgos() {
    $("#tablaRiesgos").empty();
    var data = {
        idProyecto: idProyectoLocal,
        nombre: "",
        //       idPaqueteTrabajo : $('#idPaqueteRiesgo').val(), 
        // idCategoriaRiesgo : $('#idCategoriaRiesgo').val()    
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: getAllItems + '/' + JSON.stringify(data),
        dataType: "json",
        success: function(data) {
            var lista = data;
            // limpiarConfirmar();
            $('#checkearTodos').attr('checked', false);
            agregaDataFila(data);
            $(".acciones").click(function() {
                alert("xD");
                var idRiesgoProyecto = $(this).closest("tr").attr("id");
                localStorage.setItem("idRiesgo", idRiesgoProyecto);
            });

            $(".glyphicon.glyphicon-edit").click(function() {
                var id = $(this).closest("tr").attr("id");
                // limpiarImpacto();
                // limpiarObtener();
                // limpiarModificar();
                localStorage.setItem("idRiesgo", id);
                window.location.href = "../riesgo/ModificarRiesgos.html";
                // obtenerRiesgo(id);
            });
            $(".glyphicon.glyphicon-remove").click(function() {
                var idRiesgoProyecto = $(this).closest("tr").attr("id");
                idArray = idRiesgoProyecto;
                $.ajax({
                    type: 'GET',
                    url: getStatus + '/' + idRiesgoProyecto,
                    dataType: "json",
                    success: function(data) {
                        estadoLogico = data;

                    },
                    fail: codigoError
                });

            });
            $("#btnBuscar").click(function() {
                listarRiesgos();
            });
            $(".materializar").click(function() {
                idRiesgo2=$(this).closest("tr").attr("id");
                listaAcciones($(this).closest("tr").attr("id"));
            });

            //Boton para confirmar un riesgo
            $('#tablaRiesgos input[type="checkbox"]').change(function() {
                var data = {
                    idRiesgo: $(this).closest("tr").attr("id")
                }


            });



            $(".glyphicon.glyphicon-ok").click(function() {

                var data = {
                    idRiesgo: $(this).closest("tr").attr("id")
                };
                idArray = data.idRiesgo;
                var jsonData = JSON.stringify(data);
                $.ajax({
                    type: 'GET',
                    url: getStatus + '/' + data.idRiesgo,
                    dataType: "json",
                    success: function(data) {
                    },
                    fail: codigoError
                });
            });

        },
        fail: codigoError
    });

}

function limpiarImpacto() {
    $('#impRiesgo').empty();
    $('#impRiesgoM').empty();
    $('#impRiesgo').append("<option value=\"0\" disabled selected>Escoge un nivel de impacto</option>");
    $('#impRiesgoM').append("<option value=\"0\" disabled selected>Escoge un nivel de impacto</option>");
}

function limpiarConfirmar() {

    $('#tablaRiesgosComunes input[type="checkbox"]:checked').each(function() {
        $('input[type="checkbox"]').attr('checked', false);

        // var $row = $(this).parents('tr'); 
        // $row.find('td:eq(13) input').val()); //cambiar aca si se editan las filas

    });
}

function listarRiesgosComunes() {

    $.ajax({
        type: 'GET',
        url: getAllKnownItems,
        dataType: "json",
        success: function(data) {
            agregaDataComunFila(data);
        },
        fail: codigoError
    });

}

function codigoError() {

    alert('Error');

}

function agregaDataFila(data) {
    arreglo = data;
    if (arreglo != null) {
        for (i = 0; i < arreglo.length; i++) {

            agregaFilaRiesgo(arreglo[i], i);
        }
    }
}

function agregaDataFilaMat(data) {
    arreglo = data;
    if (arreglo != null) {
        for (i = 0; i < arreglo.length; i++) {

            agregaFilaRiesgoMat(arreglo[i], i);
        }
    }
}

function agregaDataComunFila(data) {
    if (data != null) {
        arreglo = data;
    } else
        arreglo = [];
    for (i = 0; i < arreglo.length; i++) {

        agregaFilaRiesgoComun(arreglo[i], i);
    }
}

function agregaFilaRiesgo(arreglo, i) {
    var tipoCheckbox = "";
    a = i;
    a++;
    if (estadoLogico != 0) {
        if (arreglo.categoria == null) {
            arreglo.categoria = '-';
        }
        if (arreglo.severidad == null) {
            arreglo.severidad = '-';
        }
        // if (arreglo.accionesEspecificas==null){
        // 	arreglo.accionesEspecificas='-';
        // }
        if (arreglo.tipoRiesgo == null) {
            arreglo.tipoRiesgo = '-';
        } else if (arreglo.tipoRiesgo == 0) {
            arreglo.tipoRiesgo = 'Negativo';
        } else if (arreglo.tipoRiesgo == 1) {
            arreglo.tipoRiesgo = 'Positivo';
        }
        if (arreglo.costoPotencial == null) {
            arreglo.costoPotencial = '-';
        }
        if (arreglo.demoraPotencial == null) {
            arreglo.demoraPotencial = '-';
        }
        if (arreglo.paqueteTrabajo == null) {
            arreglo.paqueteTrabajo = '-';
        }
        if (arreglo.nivelImpactoDescripcion == null) {
            arreglo.nivelImpactoDescripcion = '-';
        }
        if (arreglo.probabilidadDescripcion == null) {
            arreglo.probabilidadDescripcion = '-';
        }
        if (arreglo.nombreResponsable == null) {
            arreglo.nombreResponsable = '-';
        }

        if (arreglo.impactoDescripcion == null) {
            arreglo.impactoDescripcion = '-';
        }
        if (arreglo.estadoLogico == 1) {
            tipoCheckbox = "</td><td align=\"center\"><input type=\"checkbox\" value=\"" + arreglo.idRiesgoProyecto + "\">";
            arreglo.estadoLogico = "Por confirmar"
        } else if (arreglo.estadoLogico == 2) {
            tipoCheckbox = "</td><td align=\"center\"><input type=\"checkbox\" value=\"" + arreglo.idRiesgoProyecto + "\" disabled >";
            arreglo.estadoLogico = "Confirmado"
        }
        $("#tablaRiesgos").append("<tr id=\"" + arreglo.idRiesgoProyecto +
                "\"><td>" + arreglo.idRiesgoProyecto +
                "</td><td>" + arreglo.nombre +
                "</td><td>" + arreglo.paqueteTrabajo +
                "</td><td>" + arreglo.tipoRiesgo +
                "</td><td>" + arreglo.impactoDescripcion +
                "</td><td>" + arreglo.nivelImpactoDescripcion +
                "</td><td>" + arreglo.probabilidadDescripcion +
                "</td><td>" + arreglo.severidad +
                // "</td><td>" + arreglo.accionesEspecificas +
                // "</td><td>" + arreglo.costoPotencial +
                // "</td><td>" + arreglo.demoraPotencial +
                "</td><td>" + arreglo.estadoLogico +
                "</td><td>" + arreglo.nombreResponsable +
                "</td><td><a href=\"#\"><span class=\"glyphicon glyphicon-edit\"></span></a>" +
                "</td><td><a data-toggle=\"modal\" href=\"#confirmDelete\" > <span class=\"glyphicon glyphicon-remove\"></span></a>" +
                // "</td><td><a data-toggle=\"modal\" href=\"#confirmRisk\" ><span class=\"glyphicon glyphicon-ok\"></span></a>" +
                tipoCheckbox + "</td><td><a href=\"../riesgo/AccionesRiesgos.html\" id=\"btnAcciones\" class='btn btn-primary acciones'>Acciones</a></td>"+
                "</td><td><a data-toggle=\"modal\"  href=\"#confirmMaterializar\" class='btn btn-primary materializar' href=\"#\">Materializar</a></td></tr>");
    $("#tablaRiesgosGlobal").trigger("update"); 
    }
}


function agregaFilaRiesgoMat(arreglo, i) {


    $("#tablaRiesgosMat").append("<tr id=\"" + arreglo.idRiesgoProyecto +
            "\"><td>" + arreglo.idRiesgoProyecto +
            "</td><td>" + arreglo.nombreRiesgo +
            "</td><td>" + arreglo.fechaMaterializacion +
            "</td><td>" + arreglo.costoPotencial +
            "</td><td>" + arreglo.demoraPotencial +
            "</tr>");

	$("#tablaRiesgosMaterializar").trigger("update"); 
}



function agregaFilaRiesgoComun(arreglo, i) {
    a = i;
    a++;
    $("#tablaRiesgosComunes").append("<tr id=\"" + arreglo.idRiesgoComun +
            "\"><td>" + arreglo.idRiesgoComun +
            "</td><td>" + arreglo.nombre +
            "</td><td hidden>" + arreglo.ultProbabilidad +
            "</td><td hidden>" + arreglo.ultImpacto +
            "</td><td hidden>" + arreglo.ultSeveridad +
            "</td><td><input type=\"checkbox\" value=\"" + arreglo.idRiesgoComun + "\">" +
            "</td></tr>");
}


$("#btnGrabar").click(function() {
    if (confirm("¿Está seguro que desea grabar los cambios realizados?")) {
        grabarRiesgos();
    }
});

function grabarRiesgos() {
    alert("Se grabó");
}

$("#checkearTodos").change(
        function() {
            if ($("#checkearTodos").prop('checked')) {
                $('#tablaRiesgos input[type="checkbox"]').each(function() {
                    $('input[type="checkbox"]').attr('checked', true);
                });
            } else {
                $('#tablaRiesgos input[type="checkbox"]').each(function() {
                    $('input[type="checkbox"]').attr('checked', false);
                });
            }

        });

/*------------------------------------VALIDACIONES-----------------------------------------*/

//Calculo automatico del nivel de probabilidad

$('#proRiesgo').change(
        function() {
            if (($('#proRiesgo').val() != '') && (validarProbaImpacto($('#proRiesgo').val())) && (validarNumero($('#proRiesgo').val()))) {
                var data = {
                    idProyecto: idProyectoLocal,
                    valor: $('#proRiesgo').val()
                }
                var jsonData = JSON.stringify(data);
                $.ajax({
                    type: 'GET',
                    url: getProbability + '/' + jsonData,
                    success: function(data) {
                        var obj = JSON.parse(data);
                        $('#descnivelProbabilidadRiesgo').val(obj.descripcion);
                        $('#idnivelProbabilidadRiesgo').val(obj.idProbabilidadRiesgo);
                        $('#nivelProbabilidadRiesgo').val(obj.nivel);
                        if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val() != 0)) {
                            // console.log("Proba:"+$('#nivelProbabilidadRiesgo').val()+" Imp: "+$('#nivelImpactoRiesgo').val());
                            $('#svrRiesgo').val($('#nivelProbabilidadRiesgo').val() * $('#nivelImpactoRiesgo').val());
                        }
                    },
                    fail: codigoError
                });

            } else {
                $('#descnivelProbabilidadRiesgoM').val('');
                $('#idnivelProbabilidadRiesgo').val('');
                $('#nivelProbabilidadRiesgo').val('');
                $('#svrRiesgo').val('');
            }
        });

$('#proRiesgoM').change(
        function() {
            if (($('#proRiesgoM').val() != '') && (validarProbaImpacto($('#proRiesgoM').val())) && (validarNumero($('#proRiesgoM').val()))) {
                var data = {
                    idProyecto: idProyectoLocal,
                    valor: $('#proRiesgoM').val()
                }
                var jsonData = JSON.stringify(data);
                $.ajax({
                    type: 'GET',
                    url: getProbability + '/' + jsonData,
                    success: function(data) {
                        var obj = JSON.parse(data);
                        $('#descnivelProbabilidadRiesgoM').val(obj.descripcion);
                        $('#idnivelProbabilidadRiesgoM').val(obj.idProbabilidadRiesgo);
                        $('#nivelProbabilidadRiesgoM').val(obj.nivel);
                        if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val() != 0)) {
                            // console.log("Proba:"+$('#nivelProbabilidadRiesgoM').val()+" Imp: "+$('#nivelImpactoRiesgoM').val());
                            $('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val() * $('#nivelImpactoRiesgoM').val());
                        }
                    },
                    fail: codigoError
                });

            } else {
                $('#descnivelProbabilidadRiesgoM').val('');
                $('#idnivelProbabilidadRiesgoM').val('');
                $('#nivelProbabilidadRiesgoM').val('');
                $('#svrRiesgoM').val('');
            }
        });

//Calculo automatico del nivel de probabilidad - Fin

function cargarProbabilidadModificacion(probabilidad) {
    var data = {
        idProyecto: idProyectoLocal,
        valor: probabilidad
    }
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: getProbability + '/' + jsonData,
        success: function(data) {
            var obj = JSON.parse(data);
            $('#descnivelProbabilidadRiesgoM').val(obj.descripcion);
            $('#idnivelProbabilidadRiesgoM').val(obj.idProbabilidadRiesgo);
            $('#nivelProbabilidadRiesgoM').val(obj.nivel);
            if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val() != 0)) {
                // console.log("Proba:"+$('#nivelProbabilidadRiesgoM').val()+" Imp: "+$('#nivelImpactoRiesgoM').val());
                $('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val() * $('#nivelImpactoRiesgoM').val());
            }
        },
        fail: codigoError
    });
}

//Calculo automatico del nivel de Impacto

$('#impRiesgo1').change(
        function() {
            if (($('#impRiesgo1').val() != '') && (validarDecimales($('#impRiesgo1').val())) && (!isNaN($('#proRiesgo').val()))) {
                var data = {
                    idProyecto: idProyectoLocal,
                    valor: $('#impRiesgo1').val(),
                    idTipoImpacto: $('#tipoImpacto').val()
                }
                var jsonData = JSON.stringify(data);
                $.ajax({
                    type: 'GET',
                    url: getImpactLevel1 + '/' + jsonData,
                    success: function(data) {
                        var obj = JSON.parse(data);
                        $('#impRiesgo').append("<option value=" + obj.idNivelImpacto + " selected>" + obj.descripcion + "</option>");
                        $('#nivelImpactoRiesgo').val(obj.nivel);
                        if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val() != 0)) {
                            // console.log("Proba:"+$('#nivelProbabilidadRiesgo').val()+" Imp: "+$('#nivelImpactoRiesgo').val());
                            $('#svrRiesgo').val($('#nivelProbabilidadRiesgo').val() * $('#nivelImpactoRiesgo').val());
                        }
                    },
                    fail: codigoError
                });

            } else {
                $('#impRiesgo').empty();
                $('#impRiesgo').append("<option value=\"0\" disabled selected>Primero, ingresa un impacto estimado</option>");
                $('#nivelImpactoRiesgo').val('');
                $('#svrRiesgo').val('');

            }
        });

$('#impRiesgo1M').change(
        function() {
            if ($('#impRiesgo1M').val() != 0) {
                var data = {
                    idProyecto: idProyectoLocal,
                    valor: $('#impRiesgo1M').val(),
                    idTipoImpacto: $('#tipoImpactoM').val()
                }
                var jsonData = JSON.stringify(data);
                $.ajax({
                    type: 'GET',
                    url: getImpactLevel1 + '/' + jsonData,
                    success: function(data) {
                        var obj = JSON.parse(data);
                        $('#impRiesgoM').append("<option value=" + obj.idNivelImpacto + " selected>" + obj.descripcion + "</option>");
                        $('#nivelImpactoRiesgoM').val(obj.nivel);
                        if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val() != 0)) {
                            // console.log("Proba:"+$('#nivelProbabilidadRiesgoM').val()+" Imp: "+$('#nivelImpactoRiesgoM').val());
                            $('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val() * $('#nivelImpactoRiesgoM').val());
                        }
                    },
                    fail: codigoError
                });

            } else {
                $('#impRiesgoM').empty();
                $('#impRiesgoM').append("<option value=\"0\" disabled selected>Primero, Seleccione un impacto estimado</option>");
                $('#nivelImpactoRiesgoM').val('');
                $('#svrRiesgoM').val('');
            }
        });

$('#impRiesgo2').change(
        function() {
            if ($('#impRiesgo2').val() != 0) {
                var data = {
                    idProyecto: idProyectoLocal,
                    idNivelImpacto: $('#impRiesgo2').val(),
                    idTipoImpacto: $('#tipoImpacto').val()
                }
                var jsonData = JSON.stringify(data);
                $.ajax({
                    type: 'GET',
                    url: getImpactLevel2 + '/' + jsonData,
                    success: function(data) {
                        var obj = JSON.parse(data);
                        $('#impRiesgo').append("<option value=" + obj.idNivelImpacto + " selected>" + obj.descripcion + "</option>");
                        $('#nivelImpactoRiesgo').val(obj.nivel);
                        if (($('#proRiesgo').val() != 0) && ($('#impRiesgo').val() != 0)) {
                            // console.log("Proba:"+$('#nivelProbabilidadRiesgo').val()+" Imp: "+$('#nivelImpactoRiesgo').val());
                            $('#svrRiesgo').val($('#nivelProbabilidadRiesgo').val() * $('#nivelImpactoRiesgo').val());
                        }
                    },
                    fail: codigoError
                });

            } else {
                $('#impRiesgo').empty();
                $('#impRiesgo').append("<option value=\"0\" disabled selected>Primero, Seleccione un impacto estimado</option>");
                $('#nivelImpactoRiesgo').val('');
                $('#svrRiesgo').val('');
            }
        });

$('#impRiesgo2M').change(
        function() {
            if ($('#impRiesgo2M').val() != 0) {
                var data = {
                    idProyecto: idProyectoLocal,
                    idNivelImpacto: $('#impRiesgo2M').val(),
                    idTipoImpacto: $('#tipoImpactoM').val()
                }
                var jsonData = JSON.stringify(data);
                $.ajax({
                    type: 'GET',
                    url: getImpactLevel2 + '/' + jsonData,
                    success: function(data) {
                        var obj = JSON.parse(data);
                        $('#impRiesgoM').append("<option value=" + obj.idNivelImpacto + " selected>" + obj.descripcion + "</option>");
                        $('#nivelImpactoRiesgoM').val(obj.nivel);
                        if (($('#proRiesgoM').val() != 0) && ($('#impRiesgoM').val() != 0)) {
                            // console.log("Proba:"+$('#nivelProbabilidadRiesgoM').val()+" Imp: "+$('#nivelImpactoRiesgoM').val());
                            $('#svrRiesgoM').val($('#nivelProbabilidadRiesgoM').val() * $('#nivelImpactoRiesgoM').val());
                        }
                    },
                    fail: codigoError
                });

            } else {
                $('#impRiesgoM').empty();
                $('#impRiesgoM').append("<option value=\"0\" disabled selected>Primero, Seleccione un impacto estimado</option>");
                $('#nivelImpactoRiesgoM').val('');
                $('#svrRiesgoM').val('');
            }
        });

//Calculo automatico del nivel de Impacto - Fin

//Mostrar input de Impactos
$('#tipoImpacto').change(
        function() {
            var idTipoImpactoLocal;
            if ($('#tipoImpacto').val() != 0) {
                $.each(listaTipos, function(index) {
                    if (this.idTipo == $('#tipoImpacto').val()) {
                        tipoImpacto = this.formas;
                        idTipoImpactoLocal = this.idTipo;
                        return false;
                    }
                });
                if (tipoImpacto == 1) {
                    $('#RiesgoCaso1').fadeIn('slow');
                    $('#RiesgoCaso2').hide();
                    $('#impRiesgo2').val(0);
                } else if (tipoImpacto == 2) {
                    listarTipoXNivelImpacto(idTipoImpactoLocal, 1, 0);
                    $('#RiesgoCaso2').fadeIn('slow');
                    $('#RiesgoCaso1').hide();
                    $('#impRiesgo1').val('');
                }
            }
        });

$('#tipoImpactoM').change(
        function() {
            var idTipoImpactoLocal;
            if ($('#tipoImpactoM').val() != 0) {
                $.each(listaTipos, function(index) {
                    if (this.idTipo == $('#tipoImpactoM').val()) {
                        tipoImpacto = this.formas;
                        idTipoImpactoLocal = this.idTipo;
                        return false;
                    }
                });
                if (tipoImpacto == 1) {
                    $('#RiesgoCaso1M').fadeIn('slow');
                    $('#RiesgoCaso2M').hide();
                    $('#impRiesgo2M').val(0);
                } else if (tipoImpacto == 2) {
                    listarTipoXNivelImpacto(idTipoImpactoLocal, 2, 0);
                    $('#RiesgoCaso2M').fadeIn('slow');
                    $('#RiesgoCaso1M').hide();
                    $('#impRiesgo1M').val('');
                }
            }
        });

function cargarImpactoEstimado2(impacto) {
    var idTipoImpactoLocal;
    if ($('#tipoImpactoM').val() != 0) {
        // console.log(listaTipos);
        $.each(listaTipos, function(index) {
            if (this.idTipo == $('#tipoImpactoM').val()) {
                tipoImpacto = this.formas;
                idTipoImpactoLocal = this.idTipo;
                return false;
            }
        });

        if (tipoImpacto == 1) {
            $('#RiesgoCaso1M').fadeIn('slow');
            $('#RiesgoCaso2M').hide();
            $('#impRiesgo2M').val(0);
        } else if (tipoImpacto == 2) {
            listarTipoXNivelImpacto(idTipoImpactoLocal, 2, impacto);
            $('#RiesgoCaso2M').fadeIn('slow');
            $('#RiesgoCaso1M').hide();
            $('#impRiesgo1M').val('');
        }
    }
}



//FIN nostrar inputs de impactos

// Cargar combobox de NivelXImpacto

function listarTipoXNivelImpacto(idTipoImpactoLocal, tipo, impacto) {
    if (tipo == 1) { //Registrar
        var data = {
            idTipoImpacto: idTipoImpactoLocal,
            idProyecto: idProyectoLocal
        };
        // console.log(data);
        var jsonData = JSON.stringify(data);
        $.ajax({
            type: 'GET',
            url: getDescImpactLevelType + '/' + jsonData,
            dataType: "json",
            success: function(data) {
                if (data != null) {
                    $('#impRiesgo2').empty();
                    $('#impRiesgo2').append("<option value=\"0\" disabled selected>Escoge un valor estimado para el impacto</option>");
                    $.each(data, function(i, value) {
                        $('#impRiesgo2').append("<option value=" + value.idNivelImpacto + ">" + value.descripcion + "</option>");
                    });
                }
            },
            fail:
                    codigoError

        });
    } else if (tipo == 2) { //Modificar

        var data = {
            idTipoImpacto: idTipoImpactoLocal,
            idProyecto: idProyectoLocal
        };
        var jsonData = JSON.stringify(data);
        $.ajax({
            async: false,
            type: 'GET',
            url: getDescImpactLevelType + '/' + jsonData,
            dataType: "json",
            success: function(data) {
                if (data != null) {
                    $('#impRiesgo2M').empty();
                    $('#impRiesgo2M').append("<option value=\"0\" disabled>Escoge un valor estimado para el impacto</option>");
                    $.each(data, function(i, value) {
                        $('#impRiesgo2M').append("<option value=" + value.idNivelImpacto + ">" + value.descripcion + "</option>");
                    });
                }
            },
            fail:
                    codigoError

        });
        if (impacto != 0) {
            $('#impRiesgo2M').val(impacto);
        }
    }
}

//Fin Cargar combobox de NivelXImpacto

//validar Decimales

function validarDecimales(numero)
{
    if (/^([0-9])*[.]?[0-9]{2}$/.test(numero)) {
        return true;
    } else
        return false;
}

function validarNumero(numero)
{
    if ((/^([1-9]\d*)$/.test(numero))) {
        return true;
    } else {
        return false;
    }
}


function validarProbaImpacto(numero) {
    if ((numero >= 0) && (numero <= 100)) {
        return true;
    } else
        return false;
}



//Confirmar registro 97
function confirmarRegistro(data) {
    if (validarDecimales($('#proRiesgo').val())) {
        data.probabilidad = Math.round((data.probabilidad * 100)) / 100;
        return true;
    } else
        return false;
}

function listarTiposImpacto() {
    var data = {
        idProyecto: idProyectoLocal,
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: getAllTypesImpacts + '/' + data.idProyecto,
        dataType: "json",
        success: function(data) {
            listaTipos = data;
            // console.log(data);
            agregarDataTiposImpacto(data);
        },
        fail:
                codigoError

    });
}

function agregarDataTiposImpacto(data) {
    arreglo = data;
    if (arreglo != null) {
        $.each(arreglo, function(i, value) {
            $('#tipoImpacto').append("<option value=" + value.idTipo + ">" + value.tipoRi + "</option>");
        });
        $.each(arreglo, function(i, value) {
            $('#tipoImpactoM').append("<option value=" + value.idTipo + ">" + value.tipoRi + "</option>");
        });
    }
}


function validarRegistro(data, caso) {
    var flag = true; //si true guarda, false no guarda

    if (caso == 1) {
        if (data.nombre == '') {
            flag = false;
            $('#errorNombre').fadeIn('slow');
        }

        if (data.idPaqueteTrabajo == 0) {
            data.idPaqueteTrabajo = null;
        }

        if (data.tipoRiesgo == -1) {
            flag = false;
            data.tipoRiesgo = null;
            $('#errorTipoRiesgo').fadeIn('slow');
        }

        if (data.idTipoImpacto == 0) {
            data.idTipoImpacto = null;
            flag = false;
            $('#errorTipoImpacto').fadeIn('slow');
        }

        if (tipoImpacto == 1) {
            if (data.impacto == '') {
                data.impacto = null;
                flag = false;
                $('#errorImpacto1').fadeIn('slow');
            } else if ((isNaN(data.impacto)) || (!validarDecimales(data.impacto))) {
                data.impacto = null;
                flag = false;
                $('#errorImpacto1').fadeIn('slow');
            }
        } else if (tipoImpacto == 2) {
            if (data.impacto == '') {
                data.impacto = null;
                flag = false;
                $('#errorImpacto2').fadeIn('slow');
            } else if (data.impacto == 0) {
                data.impacto = null;
                flag = false;
                $('#errorImpacto2').fadeIn('slow');
            }
        }

        if (data.idNivelImpacto == 0) {
            data.idNivelImpacto = null;
            flag = false;
            $('#errorNivelImpacto').fadeIn('slow');
        }

        if (data.probabilidad == '') {
            data.probabilidad = null;
            flag = false;
            $('#errorProba').fadeIn('slow');
        } else {
            if (isNaN(data.probabilidad)) {
                $('#errorProba').fadeIn('slow');
                flag = false;
            } else {
                if (validarProbaImpacto(data.probabilidad)) {
                    if (!validarNumero(data.probabilidad)) {
                        $('#errorProba').fadeIn('slow');
                        flag = false;
                    }
                } else {
                    $('#errorProba').fadeIn('slow');
                    flag = false;
                }
            }
        }

        if (data.costoPotencial == '') {
            data.costoPotencial = null;
        } else {
            if (data.costoPotencial < 0) {
                flag = false;
                $('#errorCosto').fadeIn('slow');
            }
        }
        if (data.demoraPotencial == '') {
            data.demoraPotencial = null;
        } else {
            if ((data.demoraPotencial < 0) || (!validarNumero(data.demoraPotencial))) {
                flag = false;
                $('#errorTiempo').fadeIn('slow');
            }
        }
        if (data.idEmpleado == 0) {
            data.idEmpleado = null;
            flag = false;
            $('#errorResponsable').fadeIn('slow');
        }
        return flag;
    } else if (caso == 2) {
        if (data.nombreRiesgo == '') {
            flag = false;
            $('#errorNombreM').fadeIn('slow');
        }

        if (data.idPaqueteTrabajo == 0) {
            data.idPaqueteTrabajo = null;
        }

        if (data.tipoRiesgo == -1) {
            flag = false;
            data.tipoRiesgo = null;
            $('#errorTipoRiesgoM').fadeIn('slow');
        }

        if (data.idCategoriaRiesgo == 0) {
            data.idCategoriaRiesgo = null;
            flag = false;
            $('#errorTipoImpactoM').fadeIn('slow');
        }

        if (tipoImpacto == 1) {
            if (data.impacto == '') {
                data.impacto = null;
                flag = false;
                $('#errorImpacto1M').fadeIn('slow');
            } else if ((isNaN(data.impacto)) || (!validarDecimales(data.impacto))) {
                data.impacto = null;
                flag = false;
                $('#errorImpacto1M').fadeIn('slow');
            }
        } else if (tipoImpacto == 2) {
            if (data.impacto == '') {
                data.impacto = null;
                flag = false;
                $('#errorImpacto2M').fadeIn('slow');
            } else if (data.impacto == 0) {
                data.impacto = null;
                flag = false;
                $('#errorImpacto2M').fadeIn('slow');
            }
        }

        if (data.idEmpleado == 0) {
            data.idEmpleado = null;
            flag = false;
            $('#errorResponsableM').fadeIn('slow');
        }
        if (data.probabilidad == '') {
            data.probabilidad = null;
            flag = false;
            $('#errorProbaM').fadeIn('slow');
        } else {
            if (isNaN(data.probabilidad)) {
                $('#errorProbaM').fadeIn('slow');
                flag = false;
            } else {
                if (validarProbaImpacto(data.probabilidad)) {
                    if (!validarNumero(data.probabilidad)) {
                        $('#errorProba').fadeIn('slow');
                        flag = false;
                    }
                } else {
                    $('#errorProbaM').fadeIn('slow');
                    flag = false;
                }
            }
        }
        if (data.costoPotencial == '') {
            data.costoPotencial = null;
        } else {
            if (data.costoPotencial < 0) {
                flag = false;
                $('#errorCostoM').fadeIn('slow');
            }
        }
        if (data.demoraPotencial == '') {
            data.demoraPotencial = null;
        } else {
            if (data.demoraPotencial < 0) {
                flag = false;
                $('#errorTiempoM').fadeIn('slow');
            }
        }
        return flag;
    }

}
function obtenerTitulo() {
    $.ajax({
        type: 'GET',
        dataType: "json", // data type of response
        contentType: "application/json; charset=utf-8",
        url: getProjectName + '/' + idProyectoLocal,
        success: function(data) {
            document.getElementsByTagName('h2')[0].innerHTML = data["nom_proy"];
        }
    });
}


function listarRiesgosMaterializados() {
    $("#tablaRiesgosMat").empty();
    var data = {
        idProyecto: idProyectoLocal

    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url: getAllItemsMaterializados + '/' + idProyectoLocal,
        dataType: "json",
        success: function(data) {
            var lista = data;
        
            // limpiarConfirmar();

            agregaDataFilaMat(data);



        },
        fail: codigoError
    });

}

function listaAcciones(idARiesgos){
    var data = {
        idRiesgoXProyecto:  idARiesgos
    };
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: 'GET',
        url:  listAccions + '/' + data.idRiesgoXProyecto,
        success: function(data) {
            obj = JSON.parse(data);
            console.log(obj);

            $.each(obj, function(index) {
                console.log();
                $('#accionEscogida').append("<option value=" + this.idAccionesRiesgo + ">" + this.descripcion + "</option>");
            });
        }
    });
}