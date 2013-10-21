<?php

include('routesCronograma.php');
include('clasesCronograma.php');
include_once '../backend/conexion.php';

//Servicios


function CR_getActividades($json) {//servicio1
    $proy = json_decode($json);
    //$oscar=$proy->idProyecto;
    $infoActividades = CR_consultarInfoActividades($proy->idProyecto);

    echo json_encode($infoActividades);
}

function CR_guardarActividades($json) { //servicio2
    $objeto = json_decode($json);
    $jsonRespuesta = CR_guardarActividadesBD($objeto);

    echo json_encode($jsonRespuesta);
}

function CR_getCalendarioBase($json) {//servicio3
    $proy = json_decode($json);
    $infoCalendarioBase = CR_consultarCalendarioBase($proy->idProyecto);

    echo json_encode($infoCalendarioBase);
}

function CR_guardarCalendarioBase() { //servicio4
    $request = \Slim\Slim::getInstance()->request();
    $calendarioBase = json_decode($request->getBody());
    //echo $calendarioBase->id;
    //$objeto = json_decode($json);
    $jsonRespuesta = CR_Guardar_Calendario_Base($calendarioBase/* $calendarioBase->id,$calendarioBase->holidays */);

    echo json_encode($jsonRespuesta);
}

function CR_getRecursos($json) { //servicio5
    $proy = json_decode($json);
    $infoRecursos = CR_consultarRecursos($proy->idProyecto);

    echo json_encode($infoRecursos);
}

function CR_getDependencias($json) {//servicio6
    $proy = json_decode($json);
    //$arreglo_fecha=array();

    //$arreglo_fecha = hallar_fechainicio_fechafin_red($proy->idProyecto);
    //echo 123;
    //$arreglo_feriados = hallar_holydays_arreglos($proy->idProyecto, $arreglo_fecha[0], $arreglo_fecha[1]);
    //echo 2;
    $arreglo_actividades = Llenar_actividades_ruta_critica($proy->idProyecto);
    
    $arreglo_actividades_sucesores = Ruta_critica_sucesores_predecesores($arreglo_actividades, $proy->idProyecto);
    //echo 4;
    $arreglo_actividades_previo = WalkListAhead($arreglo_actividades_sucesores);
    //echo 5 . json_encode($arreglo_actividades_previo);
    $arreglo_actividades_final = WalkListAback($arreglo_actividades_previo);
    //echo 6;
    $arreglo_critico = hallar_arreglo_ids_cmp($arreglo_actividades_final);
    //echo 7;
    $listaDependencias = CR_obteneListaDependenciaProyecto($proy->idProyecto, $arreglo_critico);

    echo json_encode($listaDependencias);
    //echo json_encode($arreglo_actividades_sucesores);
}

function CR_getIndicadoresFlujo($json) {//servicio9
    $proy = json_decode($json);

    $listaIndicadores = CR_consultarListaIndicadores($proy->idProyecto);

    echo json_encode($listaIndicadores);
}

function CR_getPaquetesEDT($json) {//Servicio 7
    $proy = json_decode($json);

    $listaPaquetes = CR_consultarPaqueteEDT($proy->idProyecto);
    echo json_encode($listaPaquetes);
}

function CR_postActividades() {//servicio8
    $request = \Slim\Slim::getInstance()->request();
    $actividades = json_decode($request->getBody());

    $idProyecto = $actividades->idProyecto;
    $arreglo_actividades = $actividades->task;
    //$respuesta = CR_Guardar_Calendario_Base($idProyecto,$actividades->calendarBase->id);
    $respuesta = CR_Eliminacion_Logica_Recursos_Asignados($idProyecto);
    $respuesta = CR_Eliminacion_Logica_Actividades($idProyecto);

    if ($respuesta->me == "") {
        echo json_encode(CR_guardar_actividades_BD($arreglo_actividades, $idProyecto));
    }
    else
        echo json_encode($respuesta);
}

function CR_Guardar_Calendario_Base($calendarioBase) {

    $sql = "UPDATE CALENDARIO_BASE SET feriados=? , nombre=? WHERE id_calendario_base=? ; COMMIT;";
    //$lista_actividad = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($calendarioBase->holidays, $calendarioBase->name, $calendarioBase->id));


        $db = null;
        ////////echo json_encode(array("tasks"=>$lista_actividad)) ;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        return array("me" => "eliminar" . $e->getMessage());
    }
    return CR_obtenerRespuestaExito();
}

function CR_Eliminacion_Logica_Actividades($idProyecto) {



    $sql = "UPDATE ACTIVIDAD SET eliminado=1 WHERE id_proyecto=? and eliminado=0; COMMIT;";
    //$lista_actividad = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));


        $db = null;
        ////////echo json_encode(array("tasks"=>$lista_actividad)) ;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        return array("me" => "eliminar" . $e->getMessage());
    }
    return CR_obtenerRespuestaExito();
}

function CR_Eliminacion_Logica_Recursos_Asignados($idProyecto) {



    //$sql = "UPDATE ACTIVIDAD SET eliminado=1 WHERE id_proyecto=? and eliminado=0; COMMIT;";
    $sql = "UPDATE ACTIVIDAD_X_RECURSO SET estado=0 WHERE id_actividad in (SELECT id_actividad FROM ACTIVIDAD WHERE id_proyecto=? and eliminado=0); COMMIT;";
    //$lista_actividad = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));


        $db = null;
        ////////echo json_encode(array("tasks"=>$lista_actividad)) ;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        return array("me" => "eliminar" . $e->getMessage());
    }
    return CR_obtenerRespuestaExito();
}

//Funciones implementadas que necesitan los servicios
function CR_consultarListaDependencia($idProyecto) {

    $listaDependencias = CR_obteneListaDependenciaFalsa($idProyecto);
    return $listaDependencias;
}

function CR_consultarPaqueteEDT($idProyecto) {


    //$sql = "SELECT a.* FROM PAQUETE_TRABAJO a, EDT b WHERE a.id_edt=b.id_estado and b.id_Proyecto=?";
    $sql = "SELECT a.* FROM PAQUETE_TRABAJO a, EDT b where  a.id_estado=1 and id_paquete_trabajo   not in(select id_componente_padre from PAQUETE_TRABAJO where id_componente_padre is not null and id_estado=1) and a.id_edt=b.id_edt and b.id_estado=1 and b.id_Proyecto=?;";

    $lista_paquete = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));

        while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $paquete = array("id" => $p["id_paquete_trabajo"] + 0, "name" => $p["nombre"], "id_padre" => $p["id_componente_padre"]);

            array_push($lista_paquete, $paquete);
        }

        $db = null;
        ////////echo json_encode(array("tasks"=>$lista_actividad)) ;
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
        return array("me" => $e->getMessage());
    }


    return $lista_paquete;
}

function CR_consultarInfoActividades($idProyecto) {
    //realizar la conexion a la BD
    //$link=mysql_connect("200.16.7.112","dp_usuario","usuario.2013.")))
    /* $con=mysqli_connect("200.16.7.112","dp_usuario","usuario.2013.","dp2");
      // Verificar conexión
      if (mysqli_connect_errno()){
      echo "Error al conectar con MySQL: " . mysqli_connect_error();
      }
     */
    //echo date('Y-m-d', time());
    //SELECT UNIX_TIMESTAMP('2013-11-12');
    //SELECT FROM_UNIXTIME(1384146000000/1000);
    date_default_timezone_set('America/Lima');
    $recursos = CR_obtenerRecursosTotalProyecto($idProyecto);
    $paquetesEDT = CR_consultarPaqueteEDT($idProyecto);
    $lista_mapeo = CR_obtenerListaMaps($recursos);
    $sql = "select a.*,((DATEDIFF(a.fecha_actual_inicio,a.fecha_actual_fin)/DATEDIFF(a.fecha_plan_inicio,a.fecha_plan_fin))*100)  as 'indicador_fecha',d.indicador_costo FROM `dp2`.`ACTIVIDAD` a  left join (SELECT n.id_actividad,((sum(n.cantidadReal*n.costo_unitario_real)/sum(r.COSTO_UNITARIO_ESTIMADO*n.cantidadEstimada))*100) AS 'indicador_costo' FROM `dp2`.`ACTIVIDAD_X_RECURSO` n  inner join `dp2`.`RECURSO` r on r.id_recurso=n.id_recurso where n.estado=1 group by n.id_actividad) d on d.id_actividad=a.id_actividad WHERE a.id_proyecto=? and a.eliminado=0 order by a.numero_fila ";
    $sql2 = "SELECT nombre FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo=? ";
    $lista_actividad = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));

        while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $detalle_paquete = "";

            if ($p["id_paquete_trabajo"] != NULL) {
                //echo "{ ". ($p["id_paquete_trabajo"]!=NULL) ."}";
                $stmt2 = $db->prepare($sql2);
                $stmt2->execute(array($p["id_paquete_trabajo"]));
                if ($p2 = $stmt2->fetch(PDO::FETCH_ASSOC))
                    $detalle_paquete = $p2["nombre"];
            }
            //$lista_recursos_asignados = CR_obtenerListaRecursosAsignadosFalsa();

            $idActividad = $p["id_actividad"];
            $listaRecursosAsignados = CR_obtenerListaRecursosAsignados($idActividad, $lista_mapeo);
            if ($p["fecha_actual_inicio"] == "")
                $p["fecha_actual_inicio"] = date('Y-m-d', time());
            if ($p["fecha_actual_fin"] == "")
                $p["fecha_actual_fin"] = date('Y-m-d', time());
            //echo "mira ";
            $actividad = array("id_task" => $p["id_actividad"] + 0, "id_proyecto" => $p["id_proyecto"], "name" => $p["nombre_actividad"], "id_Wbs" => $p["id_paquete_trabajo"], "wbsNode" => $detalle_paquete, "start_date" => $p["fecha_plan_inicio"], "realStart" => $p["fecha_actual_inicio"], "realEnd" => $p["fecha_actual_fin"], "end_date" => $p["fecha_plan_fin"], "id" => -$p["numero_fila"] + 0, "level" => $p["profundidad"] + 0, "depends" => $p["predecesores"], "progress" => $p["avance"], "cost" => $p["costo"] + 0, "status" => $p["estado"], "code" => $p["codigo"], "duration" => $p["dias"] + 0, "description" => $p["descripcion"], "assigs" => $listaRecursosAsignados, "start" => $p["inicio_hash"] + 0, "end" => $p["fin_hash"] + 0, "startIsMilestone" => ($p["hito_inicio"] == 1), "endIsMilestone" => ($p["hito_fin"] == 1), "indicador_fecha" => $p["indicador_fecha"] + 0, "indicador_costo" => $p["indicador_costo"] + 0, "progress_cost" => $p["porc_avance_costo_estimado"] + 0);
            array_push($lista_actividad, $actividad);
        }

        $db = null;
        ////////echo json_encode(array("tasks"=>$lista_actividad)) ;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me" => $e->getMessage()));
    }
    //echo "Hardcode";
    //date_default_timezone_set('America/Lima');
    //$milliseconds = round(microtime(true) * 1000);
    // $offset = $milliseconds - 1346623200000;
    //$mil = 1348005600000 + $offset;
    //$mil2 = 1348178399999 + $offset;
    //
    //$seconds = $mil / 1000;
    // $seconds2 = $mil2 / 1000;
    //echo $offset.'\n';
    //echo date("d-m-Y", $seconds).'\n';
    //echo date("d-m-Y", $seconds2).'\n';
    //1380080255779
    //date("Y-m-d", $mil/1000);
    $actividades = CR_obtenerInfoActividadesFalsa();
    $roles = CR_obtenerRolesTotalFalsa();
    $calendario = CR_consultarCalendarioBase($idProyecto);
    $tipoCostos = CR_consultarTipoCostos();
    //$recursos = CR_obtenerRecursosTotalFalsa();

    $proyecto = new CR_ProyectoJSON($lista_actividad, 0, array(), true, true, $roles, $recursos, $paquetesEDT, $calendario, $tipoCostos);
    return $proyecto;
}

function CR_consultarTipoCostos() {

    $sql = "SELECT * FROM TIPO_COSTO";
    $tipoCostos = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();


        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            $tipoCosto = array("id" => $j["id_tipo_costo"], "name" => $j["descripcion"]);
            array_push($tipoCostos, $tipoCosto);
        }

        $db = null;
        //return $listaIndicadorestotal;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me" => $e->getMessage()));
    }
    //echo json_encode($tipoCostos);
    return $tipoCostos;
}

function CR_mezcla($input) {

    return $input["idrecurso"] . ":" . $input["id"];
}

function CR_obtenerListaMaps($recursos) {

    //$prueba=array_map("CR_mezcla", $recursos);
    $resultado = null;
    //echo "i";
    for ($i = 0; $i < sizeof($recursos); $i++) {
        //echo json_encode($recursos[$i]["idrecurso"]);
        $indice = $recursos[$i]["idrecurso"];
        //echo json_encode($indice);
        $valor = "tmp_" . ($i + 1);
        //echo json_encode($valor);
        //$test=array($indice=>$valor);
        //array_push($resultado,$test);
        $resultado[$indice] = $valor;
        //echo "i".$i;
    }
    //echo json_encode($resultado);
    //return $resultado;
    return $resultado;
}

function CR_guardarActividadesBD($objecto) {


    return CR_obtenerRespuestaExito();
}

function CR_consultarCalendarioBase($idProyecto) {
    //realizar la conexion a la BD
    //$conexion=Conectarse();
    //Desconectarse(conexion);
    //Hardcode
    //$calendarioBase = CR_obtenerInfoCalendarioBaseFalsa();
    $sql = "select b.id_calendario_base,b.nombre ,b.feriados from dp2.CALENDARIO_PROYECTO a inner join dp2.CALENDARIO_BASE b on a.id_calendario_base=b.id_calendario_base where a.ID_PROYECTO=?;";
    $rec = null;
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));


        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            $rec = array("id" => $j["id_calendario_base"], "name" => $j["nombre"], "holidays" => $j["feriados"]);
        }

        $db = null;
        //return $listaIndicadorestotal;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me" => $e->getMessage()));
    }

    return $rec;
}

function CR_guardarcalendarioBaseBD($objeto) {

    return CR_obtenerRespuestaExito();
}

function CR_consultarRecursos($idProyecto) {


    //$listaRecursos = CR_obtenerRecursosTotalFalsa();
    $listaRecursos = CR_obtenerRecursosTotalProyecto($idProyecto);
    return $listaRecursos;
}

function CR_consultarListaIndicadores($idProyecto) {

    $listaIndicadorestotal = array();

    $sql = "select * from `dp2`.`INDICADOR_X_PROYECTO` a left join `dp2`.`PROYECTO` b on a.id_proyecto=b.id_proyecto left join `dp2`.`INDICADOR` c on c.id_indicador=a.id_indicador where a.id_proyecto=? and a.fecha<=sysdate() and (c.id_indicador=6 or c.id_indicador=7)order by a.id_indicador asc,a.fecha asc ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));

        //$stmt = $db->query($sql);
        //$lista_jp = array();
        $tem_id_proyecto = 0;
        $p = 0;
        $listaIndicadores = array();

        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            if ($p == 0) {
                $tem_id_proyecto = $j["id_indicador"];
                $p = 1;
            }

            //$datetime1 = mysql_real_escape_string($j["fecha"]);
            $datetime1 = strtotime($j["fecha"]);
            ($datetime1 <> '') ? $datetime1 = date('Y-m-d', $datetime1) : $datetime1 = null;

            if ($j["id_indicador"] != $tem_id_proyecto) {

                array_push($listaIndicadorestotal, $listaIndicadores);
                $listaIndicadores = array();
                $rec = array("idindicadorxproyecto" => $j["id_indicador_x_proyecto"], "id_indicador" => $j["id_indicador"], "nombre_indicador" => $j["nombre"], "fecha" => $datetime1, "valor" => $j["valor"]);
                array_push($listaIndicadores, $rec);
            } else {
                $rec = array("idindicadorxproyecto" => $j["id_indicador_x_proyecto"], "id_indicador" => $j["id_indicador"], "nombre_indicador" => $j["nombre"], "fecha" => $datetime1, "valor" => $j["valor"]);
                array_push($listaIndicadores, $rec);
            }

            $tem_id_proyecto = $j["id_indicador"];
        }

        array_push($listaIndicadorestotal, $listaIndicadores);
        $db = null;
        //return $listaIndicadorestotal;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me" => $e->getMessage()));
    }

    $listafinaljsonindicador = new CR_IndicadoresJSON($listaIndicadorestotal);
    return $listafinaljsonindicador;
}

//funciones de conexion
function Conectarse() { //realizar conexion con la BD 
    echo "Conectando";
    if (!($link = mysql_connect("200.16.7.112", "dp_usuario", "usuario.2013."))) {
        echo "Error conectando a la base de datos.";
        exit();
    }
    if (!mysql_select_db("dp2", $link)) {
        echo "Error seleccionando la base de datos.";
        exit();
    }
    return $link;
}

function Desconectarse($link) {

    mysql_close($link); //cierra la conexion
}

//Funciones de tipo de respuesta
function CR_obtenerRespuestaExito() {
    $respuesta = new stdClass();
    $respuesta->codRespuesta = 1;
    $respuesta->me = "";

    return $respuesta;
}

function CR_obtenerRespuestaFracaso() {
    $respuesta = new stdClass();
    $respuesta->codRespuesta = 0;
    $respuesta->mensaje = 'Error';

    return $respuesta;
}

function CR_guardar_actividades_BD($listaActividad, $idProyecto) {

    $sql2 = "INSERT INTO ACTIVIDAD (nombre_actividad,id_proyecto,id_paquete_trabajo,id_asiento_contable,fecha_plan_inicio,fecha_plan_fin, fecha_actual_inicio,fecha_actual_fin,numero_fila,profundidad,predecesores,avance,costo,dias,estado,codigo,descripcion,inicio_hash,fin_hash,eliminado,hito_inicio,hito_fin,porc_avance_costo_estimado) VALUES (? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,?,?,?);commit;";
    //$test=null
    date_default_timezone_set('America/Lima');
    try {
        $db = null;
        if ($listaActividad != null) {
            $db = getConnection();
            for ($i = 0; $i < sizeof($listaActividad); $i++) {
                $actividad = $listaActividad[$i];
                //$test=$actividad;
                $stmt = $db->prepare($sql2);
                /* if (property_exists($actividad,"id_task")){
                  echo $actividad->id_task ." ";
                  CR_eliminarRecursosAsignados($actividad);
                  } */

                //CR_insertarRecursoAsignados($actividad->assigs,$actividad->id_task);
                /* if (property_exists($actividad, 'realStart')){
                  echo "[".strtotime($actividad->realStart)."]";
                  } */
                $stmt->execute(array($actividad->name, $idProyecto, (property_exists($actividad, 'id_Wbs')) ? $actividad->id_Wbs : null, null, date("Y-m-d", $actividad->start / 1000), date("Y-m-d", $actividad->end / 1000), (property_exists($actividad, 'realStart')) ? $actividad->realStart : null, (property_exists($actividad, 'realEnd')) ? $actividad->realEnd : null, ($i + 1), $actividad->level, (property_exists($actividad, "depends")) ? $actividad->depends : "", property_exists($actividad, "progress") ? $actividad->progress : null, property_exists($actividad, "cost") ? $actividad->cost : null, $actividad->duration, $actividad->status, $actividad->code, property_exists($actividad, "description") ? $actividad->description : "", $actividad->start, $actividad->end, 0, $actividad->startIsMilestone, $actividad->endIsMilestone, property_exists($actividad, "progress_cost") ? $actividad->progress_cost + 0 : 0));
                $id_task = $db->lastInsertId();
                CR_insertarRecursoAsignados($actividad->assigs, $id_task);
            }
            $db = null;
        }
    } catch (PDOException $e) {
        $db = null;

        return array("me" => "guardar" . $e->getMessage());
    }
    return CR_obtenerRespuestaExito();
}

function CR_insertarRecursoAsignados($assigs, $id_task) {


    $sql = "INSERT INTO ACTIVIDAD_X_RECURSO (id_actividad,id_recurso,cantidadEstimada,cantidadReal,costo_unitario_real,id_tipo_costo,estado) VALUES (?,?,?,?,?,?,?);COMMIT:";

    try {
        $db = null;
        if ($assigs != null) {
            $db = getConnection();
            for ($i = 0; $i < sizeof($assigs); $i++) {
                $assig = $assigs[$i];
                //$test=$actividad;
                $stmt = $db->prepare($sql);
                $stmt->execute(array($id_task, $assig->idrecurso, $assig->value, property_exists($assig, "valueReal") ? $assig->valueReal : null, (property_exists($assig, "costRateReal")) ? $assig->costRateReal : null, (property_exists($assig, "idTipoCosto")) ? $assig->idTipoCosto : null, 1));
            }
            $db = null;
        }
    } catch (PDOException $e) {
        $db = null;
        //echo json_encode(array("me"=>"guardar".$e->getMessage()));
        return array("me" => "guardar" . $e->getMessage());
    }
    return CR_obtenerRespuestaExito();
}

function CR_eliminarRecursosAsignados($actividad) {

    $sql = "UPDATE ACTIVIDAD_X_RECURSO SET estado=0 WHERE id_actividad=?; COMMIT;";
    //$actividad->id_task;
    //$lista_actividad = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($actividad->id_task));


        $db = null;
        ////////echo json_encode(array("tasks"=>$lista_actividad)) ;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        return array("me" => "eliminar" . $e->getMessage());
    }
    return CR_obtenerRespuestaExito();
}

//Funciones hardcode
function CR_obteneListaDependenciaFalsa() {
    $listaDependencias = array();
    //igual al numero de actividades, SE DEBER�?A REALIZAR CON UN WHILE POR TODAS LAS ACTIVIDADES
    $dep1 = new CR_Dependencia("1", "11-11-2013", "14-11-2013", "0");
    $dep2 = new CR_Dependencia("2", "15-11-2013", "18-11-2013", "1");
    $dep3 = new CR_Dependencia("3", "19-11-2013", "23-11-2013", "2");
    array_push($listaDependencias, $dep1, $dep2, $dep3);

    return $listaDependencias;
}

function CR_obtenerRolesTotalFalsa() {
    $listaRoles = array();
    //id,                name	
    $rol1 = new CR_Rol("tmp_1", "Project Manager");
    $rol2 = new CR_Rol("tmp_2", "Worker");
    $rol3 = new CR_Rol("tmp_3", "Stakeholder/Customer");
    array_push($listaRoles, $rol1, $rol2, $rol3);

    return $listaRoles;
}

function hallar_holydays_arreglos($idProyecto, $fecha_inicio, $fecha_fin) {
    $sql = "select b.id_calendario_base,b.nombre ,b.feriados from dp2.CALENDARIO_PROYECTO a inner join dp2.CALENDARIO_BASE b on a.id_calendario_base=b.id_calendario_base where a.ID_PROYECTO=?;";
    $rec = array();
    $arreglo_feriados = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));


        while ($jj = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            $rec = $jj["feriados"]; //faltaria sumar los sabados y domingos :( si es k no se encuentran
        }

        $db = null;
        //return $listaIndicadorestotal;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me" => $e->getMessage()));
    }

    $p = $rec;
    $array[] = array();
    $array = explode("#", $p);
    $k = sizeof($array) - 2;
    while ($k >= 1) {
        //echo $k;
        $fecha = $array[$k];
        $array2[] = array();
        $array2 = explode("_", $fecha);
        $k2 = sizeof($array2);

        if ($k2 == 2) {

            $arreglo_inicio[] = array();
            $arreglo_inicio = explode("-", $fecha_inicio);

            $total_inicio = $arreglo_inicio[0] * 10000 + $arreglo_inicio[1] * 100 + $arreglo_inicio[2];

            $arreglo_fin[] = array();
            $arreglo_fin = explode("-", $fecha_fin);

            $total_fin = $arreglo_fin[0] * 10000 + $arreglo_fin[1] * 100 + $arreglo_fin[2];


            for ($j = $arreglo_inicio[0]; $j <= $arreglo_fin[0]; $j++) {
                //echo $fecha;   
                $comprobar_fecha = new DateTime($j . "-" . $array2[0] . "-" . $array2[1]);

                if (($comprobar_fecha->format('N') == 7) || ($comprobar_fecha->format('N') == 6)) {
                    
                } else {

                    $fecha = $j * 10000 + $array2[0] * 100 + $array2[1];

                    if (($fecha > $total_inicio) && ($fecha < $total_fin))
                        array_push($arreglo_feriados, $fecha);
                }
            }
        }else if ($k2 == 3) {

            $comprobar_fecha = new DateTime($array2[0] . "-" . $array2[1] . "-" . $array2[2]);

            if (($comprobar_fecha->format('N') == 7) || ($comprobar_fecha->format('N') == 6)) {
                
            } else {
                $fecha = $array2[0] * 10000 + $array2[1] * 100 + $array2[2];
                array_push($arreglo_feriados, $fecha);
            }
        }
        $k--;
    }


    return $arreglo_feriados;
}

function hallar_fechainicio_fechafin_red($idProyecto) {//simil con lo hardcodeado ATP
    //CR_Dependencia("1", "11-11-2013", "14-11-2013", "0");id,fechainicio,fechafin,dependencias tal como esta
    $sql = "select a.* from `dp2`.`ACTIVIDAD` a where a.id_proyecto=? and a.eliminado=0 order by a.fecha_plan_inicio asc,a.fecha_plan_fin desc "; //escritico=1 si si y 0 si no
    //echo "pipipi";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));
        //$stmt = $db->query($sql);
        $tem_bloque = "";
        $numbloque = -1;
        $p = 0;
        //$lista_jp = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            $listafechas = array();
            $cont = 0;
            $datetime1 = '';
            //echo "entra aca";
            while ($cont < 4) {
                //echo $cont;
                if ($cont == 0) {
                    $datetime1 = $j["fecha_plan_inicio"];
                } else if ($cont == 1) {
                    $datetime1 = $j["fecha_plan_fin"];
                } else if ($cont == 2) {
                    $datetime1 = $j["fecha_actual_inicio"];
                } else if ($cont == 3) {
                    $datetime1 = $j["fecha_actual_fin"];
                }

                //$datetime1 = mysql_real_escape_string($datetime1);
                $datetime1 = strtotime($datetime1);
                //echo "{".$datetime1."}";
                if ($datetime1 <> '')
                    $datetime1 = date('Y-m-d', $datetime1);
                else
                    $datetime1 = null;
                //echo $datetime1;
                array_push($listafechas, $datetime1);
                $cont++;
            }

            break;
        }

        $db = null;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
    //echo "termino".json_encode($listafechas);
    return $listafechas;
}

function Llenar_actividades_ruta_critica($idProyecto) {//simil con lo hardcodeado ATP
    $listaActividades_criticas = array();
    //CR_Dependencia("1", "11-11-2013", "14-11-2013", "0");id,fechainicio,fechafin,dependencias tal como esta

    $sql = "select a.* from `dp2`.`ACTIVIDAD` a where a.id_proyecto=? and a.eliminado=0 order by a.fecha_plan_inicio asc,a.fecha_plan_fin desc "; //escritico=1 si si y 0 si no
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));
        //$stmt = $db->query($sql);
        $tem_bloque = "";
        $numbloque = -1;
        $p = 0;
        //$lista_jp = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            if ($p == 0) {

                /*$listafechas = array();
                $cont = 0;

                while ($cont < 4) {

                    if ($cont == 0) {
                        $datetime1 = $j["fecha_plan_inicio"];
                    } else if ($cont == 1) {
                        $datetime1 = $j["fecha_plan_fin"];
                    } else if ($cont == 2) {
                        $datetime1 = $j["fecha_actual_inicio"];
                    } else if ($cont == 3) {
                        $datetime1 = $j["fecha_actual_fin"];
                    }

                    //$datetime1 = mysql_real_escape_string($datetime1);
                    $datetime1 = strtotime($datetime1);
                    ($datetime1 <> '') ? $datetime1 = date('Y-m-d', $datetime1) : $datetime1 = null;

                    array_push($listafechas, $datetime1);
                    $cont++;
                }

                $fecha_total_inicio = $listafechas[0];
                $fecha_total_fin = $listafechas[1];*/

                $p = 1;
            } else {


                /*$listafechas = array();
                $cont = 0;

                while ($cont < 4) {

                    if ($cont == 0) {
                        $datetime1 = $j["fecha_plan_inicio"];
                    } else if ($cont == 1) {
                        $datetime1 = $j["fecha_plan_fin"];
                    } else if ($cont == 2) {
                        $datetime1 = $j["fecha_actual_inicio"];
                    } else if ($cont == 3) {
                        $datetime1 = $j["fecha_actual_fin"];
                    }

                    //$datetime1 = mysql_real_escape_string($datetime1);
                    $datetime1 = strtotime($datetime1);
                    ($datetime1 <> '') ? $datetime1 = date('Y-m-d', $datetime1) : $datetime1 = null;

                    array_push($listafechas, $datetime1);
                    $cont++;
                }
                //berloc, aca se buseara por las fechas de inicio
                $arreglo_inicio[] = array();
                $arreglo_inicio = explode("-", $listafechas[0]);
                $fecha_inicio = $arreglo_inicio[0] * 10000 + $arreglo_inicio[1] * 100 + $arreglo_inicio[2];
                $tem_inicio = $fecha_inicio;
                $n_feriados = sizeof($arreglo_feriados);

                for ($jj = 0; $jj < $n_feriados; $jj++) {

                    if ($tem_inicio > $n_feriados[$jj])
                        $fecha_inicio--;
                }
                //restar domingos y sabados

                $start = new DateTime($fecha_total_inicio);
                $end = new DateTime($listafechas[0]);
                $interval = DateInterval::createFromDateString('1 day');
                $period = new DatePeriod($start, $interval, $end);
                foreach ($period as $dt) {
                    if (($dt->format('N') == 7) || ($dt->format('N') == 6)) {
                        $fecha_inicio--;
                    }
                }

                //restar domingos y sabados*/
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                $array_prueba = array(); //validando que los dias son la duracion
                //$rec = new Activity($j["numero_fila"], $j["id_actividad"],(int)$j["dias"], (int)($fecha_inicio), 0, (int)($fecha_inicio) + (int)($j["dias"]), 0, $array_prueba, $array_prueba);
                $rec = new Activity( $j["numero_fila"], $j["id_actividad"],(int)$j["dias"], 0, 0, 0, 0, $array_prueba, $array_prueba);
                
                array_push($listaActividades_criticas, $rec);
                //echo json_encode($rec);
            }
        }

        $db = null;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
    return $listaActividades_criticas;
}

function Ruta_critica_sucesores_predecesores($listaActividades_criticas, $id_proyecto) {
   
    for ($i = 0; $i < sizeof($listaActividades_criticas); $i++) {
       
        $listaActividades_criticas[$i]->predecessors = lista_predecesores($listaActividades_criticas[$i]->id_real, $listaActividades_criticas);
        $listaActividades_criticas[$i]->successors = lista_sucesores($listaActividades_criticas[$i]->id, $listaActividades_criticas, $id_proyecto);
  
    }
    
    //echo json_encode($listaActividades_criticas);
    return $listaActividades_criticas;
}

function WalkListAhead($listaActividades_criticas) {
    $listaActividades_criticas[0]->eet = $listaActividades_criticas[0]->est + $listaActividades_criticas[0]->duration;

    $na = sizeof($listaActividades_criticas);
    for ($i = 1; $i < $na; $i++) {
        foreach (($listaActividades_criticas[$i]->predecessors) as $indice) {
            if (($listaActividades_criticas[$i]->est) < ($listaActividades_criticas[$indice]->eet))
                $listaActividades_criticas[$i]->est = $listaActividades_criticas[$indice]->eet;
        }

        $listaActividades_criticas[$i]->eet = $listaActividades_criticas[$i]->est + $listaActividades_criticas[$i]->duration;
    }

    return $listaActividades_criticas;
}

function WalkListAback($listaActividades_criticas) {
    $na = sizeof($listaActividades_criticas);
    //echo 	json_encode($listaActividades_criticas);
    $listaActividades_criticas[$na - 1]->let = $listaActividades_criticas[$na - 1]->eet;
    $listaActividades_criticas[$na - 1]->lst = $listaActividades_criticas[$na - 1]->let - $listaActividades_criticas[$na - 1]->duration;

    for ($i = $na - 2; $i >= 0; $i--) {
        foreach (($listaActividades_criticas[$i]->successors) as $indice) {
            if ($listaActividades_criticas[$i]->let == 0) {
                $listaActividades_criticas[$i]->let = $listaActividades_criticas[$indice]->lst;
                //echo json_encode($listaActividades_criticas[$i]);
            } else
            {
                if (($listaActividades_criticas[$i]->let) > ($listaActividades_criticas[$indice]->lst)){
                $listaActividades_criticas[$i]->let = $listaActividades_criticas[$indice]->lst;
                
                }
                
            }
        }

        $listaActividades_criticas[$i]->lst = $listaActividades_criticas[$i]->let - $listaActividades_criticas[$i]->duration;
    }

    return $listaActividades_criticas;
}

function lista_predecesores($id, $listaActividades_criticas) {

    $listapredecesores = array();
    //CR_Dependencia("1", "11-11-2013", "14-11-2013", "0");id,fechainicio,fechafin,dependencias tal como esta

    $sql = "select a.predecesores from `dp2`.`ACTIVIDAD` a where a.id_actividad=?"; //escritico=1 si si y 0 si no
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($id));
        //$stmt = $db->query($sql);

        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            $p = $j["predecesores"]; //falta la parte de validar los dos puntos 

            $array[] = array();
            $array = explode(",", $p);
            $k = sizeof($array) - 1;
            while ($k >= 0) {

                for ($i = 0; $i < sizeof($listaActividades_criticas); $i++) {

                    if ($listaActividades_criticas[$i]->id == $array[$k]) {
                        array_push($listapredecesores, $i);
                        break;
                    }
                }

                $k--;
            }
        }

        $db = null;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
    return $listapredecesores;
}

function lista_sucesores($id, $listaActividades_criticas, $id_projecto) {

    $listasucesores = array();
    //CR_Dependencia("1", "11-11-2013", "14-11-2013", "0");id,fechainicio,fechafin,dependencias tal como esta

    $sql = "select a.numero_fila from `dp2`.`ACTIVIDAD` a where a.id_proyecto=? and a.eliminado=0 and a.predecesores like '%$id%' "; //escritico=1 si si y 0 si no
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->execute(array($id_projecto)); //no estoy seguro de esto tengo que chekar nadal
        //$stmt = $db->query($sql);

        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            for ($i = 0; $i < sizeof($listaActividades_criticas); $i++) {

                if ($listaActividades_criticas[$i]->id == $j["numero_fila"]) {
                    array_push($listasucesores,$i);
                    break;
                }
            }
        }

        $db = null;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
    return $listasucesores;
}

function hallar_arreglo_ids_cmp($listaActividades_criticas) {

    $arreglo_critico = array();

    foreach ($listaActividades_criticas as $activity) {

        if (($activity->eet - $activity->let == 0) && ($activity->est - $activity->lst == 0))
            array_push($arreglo_critico, $activity->id);
    }

    return $arreglo_critico;
    //Console.Write("\n\n         Total duration: {0}\n\n", list[list.Length - 1].Eet);
}

function CR_obteneListaDependenciaProyecto($idProyecto, $arreglo_critico) {//simil con lo hardcodeado ATP
    $listaDependencias = array();
    //CR_Dependencia("1", "11-11-2013", "14-11-2013", "0");id,fechainicio,fechafin,dependencias tal como esta
	$listaMapeoNumeroFilas = null;
    $sql = "select a.* from `dp2`.`ACTIVIDAD` a where a.id_proyecto=? and a.eliminado=0 order by a.fecha_plan_inicio asc,a.fecha_plan_fin desc "; //escritico=1 si si y 0 si no
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));
        //$stmt = $db->query($sql);
        $tem_bloque = "";
        $numbloque = -1;
        $p = 0;
        //$lista_jp = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            if ($p == 0) {
                $p = 1;
            } else {
                $listafechas = array();
                $cont = 0;

                while ($cont < 4) {

                    if ($cont == 0) {
                        $datetime1 = $j["fecha_plan_inicio"];
                    } else if ($cont == 1) {
                        $datetime1 = $j["fecha_plan_fin"];
                    } else if ($cont == 2) {
                        $datetime1 = $j["fecha_actual_inicio"];
                    } else if ($cont == 3) {
                        $datetime1 = $j["fecha_actual_fin"];
                    }

                    //$datetime1 = mysql_real_escape_string($datetime1);
                    $datetime1 = strtotime($datetime1);
                    ($datetime1 <> '') ? $datetime1 = date('d-m-Y', $datetime1) : $datetime1 = null;

                    array_push($listafechas, $datetime1);
                    $cont++;
                }

                //$datetime1 = mysql_real_escape_string($j["fecha_plan_inicio"]);
                $datetime1 = strtotime($j["fecha_plan_inicio"]);
                ($datetime1 <> '') ? $bloque = date('m', $datetime1) : $bloque = null;

                if ($tem_bloque != $bloque)
                    $numbloque++;

                $tem_bloque = $bloque;

                $arreglo_size = sizeof($arreglo_critico);
                $escritico = 0;
                for ($jj = 0; $jj < $arreglo_size; $jj++) {

                    if ($j["numero_fila"] == $arreglo_critico[$jj]) {

                        $escritico = 1;
                        break;
                    }
                }
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				//$prueba=array_map("CR_mezcla", $recursos);
				
				
					$listaMapeoNumeroFilas["".$j["numero_fila"]] = "".$j["id_actividad"];
					
	
                $rec = array("id_actividad" => $j["id_actividad"], "nombre_actividad" => $j["nombre_actividad"], "marcado" => 0, "bloque" => $numbloque, "EsCritico" => $escritico, "numDias" => $j["dias"], "fecha_plan_inicio" => $listafechas[0], "fecha_plan_fin" => $listafechas[1], "fecha_actual_inicio" => $listafechas[2], "fecha_actual_fin" => $listafechas[3], "predecesores" => $j["predecesores"], "id_proyecto" => $j["id_proyecto"], "id_paquete_trabajo" => $j["id_paquete_trabajo"]); //id_paquete_trabajo
                array_push($listaDependencias, $rec);
            }
        }
		$listaDependencias=CR_obtenerArregloActividades($listaDependencias,$listaMapeoNumeroFilas);
        $db = null;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
    //echo "mira". json_encode($listaDependencias[sizeof($listaDependencias) - 1]["bloque"]);
    $listafinaljsondependencias = new CR_DependenciasJSON($listaDependencias, ($listaDependencias[sizeof($listaDependencias) - 1]["bloque"]) + 1);
    return $listafinaljsondependencias;
}

//funcion que mapea un arreglo de predecesores en string y retorna un arreglo con cada elemento
function CR_obtenerArregloActividades($listaDependencias,$listaMapeoNumeroFilas){

		    //echo json_encode($listaDependencias);
			
			//echo json_encode($listaMapeoNumeroFilas);
			for($i=0;$i<sizeof($listaDependencias);$i++){
				if ($listaDependencias[$i]["predecesores"]=="") continue;
				$array[] = array();
				$array = explode(",", $listaDependencias[$i]["predecesores"]);
				$resultado="";
				//echo  json_encode($array);
				$cont=0;
				foreach($array as $j){
					//echo $j;
					//echo json_encode($array);
					
					//echo " oli ".$listaMapeoNumeroFilas["".$j]. " olic ";
					if ($cont==0)$resultado=$resultado . $listaMapeoNumeroFilas["".$j];
					else $resultado=$resultado . ",".$listaMapeoNumeroFilas["".$j];
					$cont++;
				}
				$listaDependencias[$i]["predecesores"]=$resultado;
			}
			return $listaDependencias;

}
function CR_obteneListaDependenciaPaqueteTrabajo($idpaquetetrabajo) {//simil con lo harcodeado
    $listaDependencias = array();

    $sql = "select a.* from `dp2`.`ACTIVIDAD` a where a.id_paquete_trabajo=? ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idpaquetetrabajo));
        //$stmt = $db->query($sql);
        //$lista_jp = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            //MANEJO DE FECHAS, si hay algun cambio para horas se debe hacer otro para este caso todos tienen el mismo formato
            $listafechas = array();
            $cont = 0;

            while ($cont < 4) {

                if ($cont == 0) {
                    $datetime1 = $j["fecha_plan_inicio"];
                } else if ($cont == 1) {
                    $datetime1 = $j["fecha_plan_fin"];
                } else if ($cont == 2) {
                    $datetime1 = $j["fecha_actual_inicio"];
                } else if ($cont == 3) {
                    $datetime1 = $j["fecha_actual_fin"];
                }

                //$datetime1 = mysql_real_escape_string($datetime1);
                $datetime1 = strtotime($datetime1);
                ($datetime1 <> '') ? $datetime1 = date('d-m-Y', $datetime1) : $datetime1 = null;

                array_push($listafechas, $datetime1);
                $cont++;
            }


            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            $rec = array("id_actividad" => $j["id_actividad"], "fecha_plan_inicio" => $listafechas[0], "fecha_plan_fin" => $listafechas[1], "fecha_actual_inicio" => $listafechas[2], "fecha_actual_fin" => $listafechas[3], "predecesores" => $j["predecesores"], "id_proyecto" => $j["id_proyecto"], "id_paquete_trabajo" => $j["id_paquete_trabajo"]); //id_paquete_trabajo
            array_push($listaDependencias, $rec);
        }

        $db = null;
        return $listaDependencias;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
}

function CR_obtenerRecursosTotalProyecto($idProyecto) {

    $listaRecursos = array();

    $sql = "SELECT a.*,b.simbolo as simbolo_unidad,b.descripcion as descripcion_unidad, c.descripcion as descripcion_moneda, d.descripcion as descripcion_rubropresupuestal FROM RECURSO a left join UNIDAD_MEDIDA b on b.id_unidad_medida=a.id_unidad_medida   left join CAMBIO_MONEDA c on a.ID_CAMBIO_MONEDA=c.id_cambio_moneda  left join RUBRO_PRESUPUESTAL d on a.id_rubro_presupuestal=d.id_rubro_presupuestal where a.id_proyecto =  ? ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));

        //$stmt = $db->query($sql);
        //$lista_jp = array();
        $contador = 1;
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            $rec = array("idrecurso" => $j["id_recurso"], "id" => "tmp_" . $contador, "idunidadmedida" => $j["id_unidad_medida"], "name" => $j["descripcion"], "costRate" => $j["costo_unitario_estimado"], "simbolo_unidad" => $j["simbolo_unidad"], "typeCost" => $j["descripcion_unidad"], "descripcion_moneda" => $j["descripcion_moneda"], "descripcion_rubropresupuestal" => $j["descripcion_rubropresupuestal"]);
            array_push($listaRecursos, $rec);
            $contador++;
        }

        $db = null;
        return $listaRecursos;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
}

function CR_obtenerIndicadoresTotalProyecto($idProyecto) {

    $listaIndicadorestotal = array();

    $sql = "select * from `dp2`.`INDICADOR_X_PROYECTO` a left join `dp2`.`PROYECTO` b on a.id_proyecto=b.id_proyecto left join `dp2`.`INDICADOR` c on c.id_indicador=a.id_indicador where a.id_proyecto=? order by a.id_indicador asc,a.fecha desc ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));

        //$stmt = $db->query($sql);
        //$lista_jp = array();
        $tem_id_proyecto = 0;
        $p = 0;
        $listaIndicadores = array();

        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            if ($p == 0) {
                $tem_id_proyecto = $j["id_indicador"];
                $p = 1;
            }

            //$datetime1 = mysql_real_escape_string($j["fecha"]);
            $datetime1 = strtotime($j["fecha"]);
            ($datetime1 <> '') ? $datetime1 = date('d-m-Y', $datetime1) : $datetime1 = null;

            if ($j["id_indicador"] != $tem_id_proyecto) {

                array_push($listaIndicadorestotal, $listaIndicadores);
                $listaIndicadores = array();
                $rec = array("idindicadorxproyecto" => $j["ID_INDICADOR_X_PROYECTO"], "id_indicador" => $j["id_indicador"], "nombre_indicador" => $j["nombre"], "fecha" => $datetime1, "valor" => $j["valor"]);
                array_push($listaIndicadores, $rec);
            } else {
                $rec = array("idindicadorxproyecto" => $j["ID_INDICADOR_X_PROYECTO"], "id_indicador" => $j["id_indicador"], "nombre_indicador" => $j["nombre"], "fecha" => $datetime1, "valor" => $j["valor"]);
                array_push($listaIndicadores, $rec);
            }

            $tem_id_proyecto = $j["id_indicador"];
        }

        array_push($listaIndicadorestotal, $listaIndicadores);
        $db = null;
        return $listaIndicadorestotal;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
}

//FALTA VERIFICAR EL PARSEO DE FECHA ENTRANTES Y SALIENTES PARA TODO EL BUGS BUNNY
function CR_obtenerListaRecursosAsignados($idActividad, $listaMapeoRecursos) {
    $listaRecursos = array();
    //$listaIds=array();
    $sql = "SELECT f.*,e.cantidadEstimada,e.cantidadReal,e.costo_unitario_real ,g.descripcion as 'descripcion_tipocosto' ,g.id_tipo_costo FROM `dp2`.`ACTIVIDAD_X_RECURSO` e inner join  (SELECT a.*,b.simbolo as 'simbolo_unidad',b.descripcion as 'descripcion_unidad', c.descripcion as 'descripcion_moneda', d.descripcion as 'descripcion_rubropresupuestal' FROM `dp2`.`RECURSO` a left join `dp2`.`UNIDAD_MEDIDA` b on b.id_unidad_medida=a.id_unidad_medida left join `dp2`.`CAMBIO_MONEDA` c on a.ID_CAMBIO_MONEDA=c.id_cambio_moneda left join `dp2`.`RUBRO_PRESUPUESTAL` d on a.id_rubro_presupuestal=d.id_rubro_presupuestal ) f on f.id_recurso=e.id_recurso inner join `dp2`.`TIPO_COSTO` g on g.id_tipo_costo=e.id_tipo_costo where e.id_actividad=? and e.estado=1";
    //$sql = "SELECT f.*,e.cantidadEstimada,e.cantidadReal,e.costo_unitario_real FROM `dp2`.`ACTIVIDAD_X_RECURSO` e inner join  (SELECT a.*,b.simbolo as 'simbolo_unidad',b.descripcion as 'descripcion_unidad', c.descripcion as 'descripcion_moneda', d.descripcion as 'descripcion_rubropresupuestal' FROM `dp2`.`RECURSO` a left join `dp2`.`UNIDAD_MEDIDA` b on b.id_unidad_medida=a.id_unidad_medida left join `dp2`.`CAMBIO_MONEDA` c on a.ID_CAMBIO_MONEDA=c.id_cambio_moneda left join `dp2`.`RUBRO_PRESUPUESTAL` d on a.id_rubro_presupuestal=d.id_rubro_presupuestal ) f on f.id_recurso=e.id_recurso where e.id_actividad=? and e.estado=1";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idActividad));
        //$stmt = $db->query($sql);
        //$lista_jp = array();
        $contador = 1;
        //echo "mira" . json_encode($listaMapeoRecursos);
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            //echo $j["id_recurso"]. "gg";
            //$idRecurso=$listaMapeoRecursos["1"];
            //echo $idRecurso;
            $idRecurso = $listaMapeoRecursos["" . $j["id_recurso"]];

            $rec = array("idrecurso" => $j["id_recurso"], "id" => "tmp_" . $contador, "resourceId" => $idRecurso, "idunidadmedida" => $j["id_unidad_medida"], "idTipoCosto" => $j["id_tipo_costo"], "descripcion_recurso" => $j["descripcion"], "costRate" => $j["costo_unitario_estimado"] + 0, "simbolo_unidad" => $j["simbolo_unidad"], "typeCost" => $j["descripcion_unidad"], "descripcion_moneda" => $j["descripcion_moneda"], "descripcion_rubropresupuestal" => $j["descripcion_rubropresupuestal"], "value" => $j["cantidadEstimada"] + 0, "valueReal" => $j["cantidadReal"], "costRateReal" => $j["costo_unitario_real"], "descripcion_tipocosto" => $j["descripcion_tipocosto"]);
            array_push($listaRecursos, $rec);

            $contador++;
        }

        $db = null;
        //echo json_encode($listaRecursos);
        return $listaRecursos;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
}

function CR_obtenerRecursosTotalFalsa() {
    $listaRecursos = array();

    $recurso1 = new CR_Recurso("tmp_1", "Recurso 1", "Dias", 90);
    $recurso2 = new CR_Recurso("tmp_2", "Recurso 2", "Servicio", 2500);
    $recurso3 = new CR_Recurso("tmp_3", "Recurso 3", "Horas", 26);
    $recurso4 = new CR_Recurso("tmp_4", "Recurso 4", "Dias", 90);
    $recurso5 = new CR_Recurso("tmp_5", "Recurso 5", "Unidades", 1200);
    $recurso6 = new CR_Recurso("tmp_6", "Recurso 6", "Horas", 26);
    $recurso7 = new CR_Recurso("tmp_7", "Recurso 7", "Servicio", 2500);
    $recurso8 = new CR_Recurso("tmp_8", "Recurso 8", "Horas", 26);
    $recurso9 = new CR_Recurso("tmp_9", "Recurso 9", "Dias", 90);
    $recurso10 = new CR_Recurso("tmp_10", "Recurso 10", "Servicio", 2500);

    array_push($listaRecursos, $recurso1, $recurso2, $recurso3, $recurso4, $recurso5, $recurso6, $recurso7, $recurso8, $recurso9, $recurso10);

    return $listaRecursos;
}

function CR_obtenerListaRecursosAsignadosFalsa() {
    $listaRecursos = array();
    //id,                effort, resourceId, role_id	
    $recurso1 = new CR_RecursoAsignado("tmp_1", 13800000, "tmp_5", "tmp_1", "Unidades", 1200, 1, 1200);
    $recurso2 = new CR_RecursoAsignado("tmp_2", 9600000, "tmp_3", "tmp_1", "Horas", 26, 8, 208);
    $recurso3 = new CR_RecursoAsignado("tmp_3", 6600000, "tmp_9", "tmp_1", "Dias", 90, 3, 270);
    $recurso4 = new CR_RecursoAsignado("tmp_4", 6600000, "tmp_2", "tmp_1", "servicio", 2500, 1, 2500);
    array_push($listaRecursos, $recurso1, $recurso2, $recurso3, $recurso4);

    return $listaRecursos;
}

function CR_obtenerInfoActividadesFalsa() {

    $listaActividades = array();
    $listaRecursos = array();
    $listaRecursos = CR_obtenerListaRecursosAsignadosFalsa();
    //Date.prototype.toInt = function () {
    //   return this.getFullYear()*10000+(this.getMonth()+1)*100+this.getDate();
    //};
    /*
      Date.fromInt=function (dateInt){
      var year = parseInt(dateInt/10000);
      var month = parseInt((dateInt-year*10000)/100);
      var day = parseInt(dateInt-year*10000-month*100);
      return new Date(year,month-1,day,12,00,00);
      }; */
    $actividad1 = new CR_Actividad(-1, "Proyecto 1", "P1", 0, "STATUS_ACTIVE", 1346623200000, 21, 1348523999999, true, false, array(), "", "", 0, 100, "");
    $actividad2 = new CR_Actividad(-2, "Analisis", "AN", 1, "STATUS_ACTIVE", 1346623200000, 10, 1347659999999, false, false, $listaRecursos, "", "", 0, 99, "1: Paquete 1");
    $actividad3 = new CR_Actividad(-3, "Busqueda de proveedores", "BP", 2, "STATUS_ACTIVE", 1346623200000, 2, 1346795999999, false, false, array(), "", "", 0, 98, "1.1: Paquete 1.1");
    $actividad4 = new CR_Actividad(-4, "Busqueda de clientes", "BC", 2, "STATUS_SUSPENDED", 1346796000000, 4, 1347314399999, false, false, array(), "3", "", 0, 97, "1.2: Paquete 1.2");
    $actividad5 = new CR_Actividad(-5, "Implementacion", "IE", 1, "STATUS_SUSPENDED", 1347832800000, 6, 1348523999999, false, false, array(), "2:5", "", 0, 96, "2: paquete 2");
    $actividad6 = new CR_Actividad(-6, "Desarrollo", "DE", 2, "STATUS_SUSPENDED", 1347832800000, 2, 1348005599999, false, false, $listaRecursos, "", "", 0, 95, "2.1: paquete 2.1");
    $actividad7 = new CR_Actividad(-7, "Pruebas de integracion", "PI", 2, "STATUS_SUSPENDED", 1348005600000, 3, 1348264799999, false, false, array(), "6", "", 0, 94, "2.2: paquete 2.2");
    $actividad8 = new CR_Actividad(-8, "Implantacion", "IA", 2, "STATUS_SUSPENDED", 1348005600000, 2, 1348178399999, false, false, array(), "6", "", 0, 93, "2.3: paquete 2.3");
    //1380079042846

    /* $actividad1 = new CR_Actividad(1, 'Actividad1', 1, 10.0, 20.0, null);
      $actividad2 = new CR_Actividad(2, 'Actividad2', 1, 20.0, 25.0, $listaRecursos);
      $actividad3 = new CR_Actividad(3, 'Actividad3', 2, 30.5, 40.0, null);
     */
    array_push($listaActividades, $actividad1, $actividad2, $actividad3, $actividad4, $actividad5, $actividad6, $actividad7, $actividad8);

    return $listaActividades;
}

function CR_obtenerInfoCalendarioBaseFalsa() {

    $calendarioBase1 = new CR_CalendarioBase(1, '08:30', '12:00', '01:00', '06:30', 8, 20, 12);
    return $calendarioBase1;
}

function CR_obtenerInfoCalendarioBase($idProyecto) {
    //
    $calendarioBase1 = new CR_CalendarioBase(1, '08:30', '12:00', '01:00', '06:30', 8, 20, 12);
    return $calendarioBase1;
}

?>