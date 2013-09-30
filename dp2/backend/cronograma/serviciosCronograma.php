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

function CR_guardarCalendarioBase($json) { //servicio4
    $objeto = json_decode($json);
    $jsonRespuesta = CR_guardarcalendarioBaseBD($objeto);

    echo json_encode($jsonRespuesta);
}

function CR_getRecursos($json) { //servicio5
    $proy = json_decode($json);
    $infoRecursos = CR_consultarRecursos($proy->idProyecto);

    echo json_encode($infoRecursos);
}

function CR_getDependencias($json) {//servicio6
    $proy = json_decode($json);

    $listaDependencias = CR_consultarListaDependencia($proy->idProyecto);

    echo json_encode($listaDependencias);

    /* DEPENDENCIAS:
      ----------------
      NO PUEDES DEPENDER DE ACTIVIDADES QUE APARESCAN DEBAJO DE LA TUYA.

      FORMATO DE DEPENDENCIA -----> NUMERO:DIAS(PUEDE SER POSITIVO ¿NEGATIVO?, EL 0 INDICA QUE EMPIEZA INMEDIATAMENTE DESPUES)

      FORMATO DE VARIAS DEPENDENCIAS  ------> SE ANIDAN POR COMAS SI SE UTILIZA ":", VALIDA SI ESTE ES MAYOR AL FIN DE LA ÚLTIMA DEPENDENCIA

      OJO: DEBERIAMOS DE PREGUNTAR SI SE DEBE VALIDAR EL NÚMERO NEGATIVO YA QUE DEPENDENCIA SIGNIFICA QUE NO PUEDE ARRANCAR DÍAS ANTES PERO SÍ DIÁS DESPUES.¿?

     * EL FRONT DEBE VALIDAR ESTO YA QUE CUENTA CON LOS DATOS DE LAS UBICACIONES, JERARQUIAS Y TODO LO DEMÁS

     * ESTO SOLO SI SE NECESITA LOS ID DE TODAS LAS LISTAS, PARA EL GANTT NO ES NECESARIO YA QUE LA API LO ARMA SEGÚN LO ALAMCENAMOS EN BD */
}


function CR_getPaquetesEDT($json){//Servicio 7
	$proy = json_decode($json);

	$listaPaquetes = CR_consultarPaqueteEDT($proy->idProyecto);
	echo json_encode($listaPaquetes);
}

function CR_postActividades() {//servicio8
    $request = \Slim\Slim::getInstance()->request();
    $actividades = json_decode($request->getBody());
	
	$idProyecto = $actividades->idProyecto;	
    $arreglo_actividades = $actividades->task;	
	$respuesta=CR_Eliminacion_Logica_Recursos_Asignados($idProyecto);
	$respuesta=CR_Eliminacion_Logica_Actividades($idProyecto);	
	if ($respuesta->me==""){    
		echo json_encode(CR_guardar_actividades_BD($arreglo_actividades,$idProyecto));
	}else echo json_encode($respuesta);
}

function CR_Eliminacion_Logica_Actividades($idProyecto){



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
        return array("me" => "eliminar".$e->getMessage());
    }
	return CR_obtenerRespuestaExito();
}

function CR_Eliminacion_Logica_Recursos_Asignados($idProyecto){



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
        return array("me" => "eliminar".$e->getMessage());
    }
	return CR_obtenerRespuestaExito();
}


//Funciones implementadas que necesitan los servicios
function CR_consultarListaDependencia($idProyecto) {

    $listaDependencias = CR_obteneListaDependenciaFalsa($idProyecto);
    return $listaDependencias;
}

function CR_consultarPaqueteEDT($idProyecto){


	//$sql = "SELECT a.* FROM PAQUETE_TRABAJO a, EDT b WHERE a.id_edt=b.id_estado and b.id_Proyecto=?";
	$sql= "SELECT a.* FROM PAQUETE_TRABAJO a, EDT b where  a.id_estado=1 and id_paquete_trabajo   not in(select id_componente_padre from PAQUETE_TRABAJO where id_componente_padre is not null and id_estado=1) and a.id_edt=b.id_edt and b.id_estado=1 and b.id_Proyecto=?;";
	
	$lista_paquete = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));

        while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {
			
            $paquete = array("id" => $p["id_paquete_trabajo"] + 0,"name"=>$p["nombre"],"id_padre"=>$p["id_componente_padre"]);
			
            array_push($lista_paquete, $paquete);
        }

        $db = null;
        ////////echo json_encode(array("tasks"=>$lista_actividad)) ;
    } catch (PDOException $e) {
			      echo '{"error":{"text":'. $e->getMessage() .'}}';
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
   
	$recursos= CR_obtenerRecursosTotalProyecto($idProyecto);
	$paquetesEDT=CR_consultarPaqueteEDT($idProyecto);
	$lista_mapeo=CR_obtenerListaMaps($recursos);
    $sql = "SELECT * FROM ACTIVIDAD WHERE id_proyecto=? and eliminado=0 order by numero_fila";
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
			$idActividad=$p["id_actividad"];
			$listaRecursosAsignados=CR_obtenerListaRecursosAsignados($idActividad,$lista_mapeo);
            $actividad = array("id_task" => $p["id_actividad"] + 0,"id_proyecto"=>$p["id_proyecto"] , "name" => $p["nombre_actividad"], "id_Wbs" => $p["id_paquete_trabajo"], "wbsNode" => $detalle_paquete, "start_date" => $p["fecha_plan_inicio"], "end_date" => $p["fecha_plan_fin"], "id" => -$p["numero_fila"] + 0, "level" => $p["profundidad"] + 0, "depends" => $p["predecesores"], "progress" => $p["avance"], "cost" => $p["costo"] + 0, "status" => $p["estado"], "code" => $p["codigo"], "duration" => $p["dias"] + 0, "description" => $p["descripcion"], "assigs" => $listaRecursosAsignados, "start" => $p["inicio_hash"] + 0, "end" => $p["fin_hash"] + 0, "startIsMilestone" => ($p["hito_inicio"]==1), "endIsMilestone" => ($p["hito_fin"]==1));
            array_push($lista_actividad, $actividad);
        }

        $db = null;
        ////////echo json_encode(array("tasks"=>$lista_actividad)) ;
    } catch (PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me" => $e->getMessage()));
    }
    //echo "Hardcode";

    date_default_timezone_set('America/Lima');

    $milliseconds = round(microtime(true) * 1000);
    $offset = $milliseconds - 1346623200000;
    $mil = 1348005600000 + $offset;
    $mil2 = 1348178399999 + $offset;
    //
    $seconds = $mil / 1000;
    $seconds2 = $mil2 / 1000;
    //echo $offset.'\n';
    //echo date("d-m-Y", $seconds).'\n';
    //echo date("d-m-Y", $seconds2).'\n';
    //1380080255779
	//date("Y-m-d", $mil/1000);
    $actividades = CR_obtenerInfoActividadesFalsa();
    $roles = CR_obtenerRolesTotalFalsa();
    //$recursos = CR_obtenerRecursosTotalFalsa();
	
    $proyecto = new CR_ProyectoJSON($lista_actividad, 0, array(), true, true, $roles, $recursos,$paquetesEDT);
    return $proyecto;
}

function CR_mezcla($input){

	return $input["idrecurso"].":".$input["id"];
}



function CR_obtenerListaMaps($recursos){
	
	//$prueba=array_map("CR_mezcla", $recursos);
	
	//$resultado=new object();
    for ($i = 0; $i < sizeof($recursos); $i++){
		//echo json_encode($recursos[$i]["idrecurso"]);
		$indice=$recursos[$i]["idrecurso"];
		//echo json_encode($indice);
		$valor="tmp_".($i+1);
		//echo json_encode($valor);
		//$test=array($indice=>$valor);
        //array_push($resultado,$test);
		$resultado[$indice]=$valor;
	
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
    $calendarioBase = CR_obtenerInfoCalendarioBaseFalsa();

    return $calendarioBase;
}

function CR_guardarcalendarioBaseBD($objeto) {

    return CR_obtenerRespuestaExito();
}

function CR_consultarRecursos($idProyecto) {


    //$listaRecursos = CR_obtenerRecursosTotalFalsa();
	$listaRecursos = CR_obtenerRecursosTotalProyecto($idProyecto);
    return $listaRecursos;
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

function CR_guardar_actividades_BD($listaActividad,$idProyecto) {

      $sql2 = "INSERT INTO ACTIVIDAD (nombre_actividad,id_proyecto,id_paquete_trabajo,id_asiento_contable,fecha_plan_inicio,fecha_plan_fin, fecha_actual_inicio,fecha_actual_fin,numero_fila,profundidad,predecesores,avance,costo,dias,estado,codigo,descripcion,inicio_hash,fin_hash,eliminado,hito_inicio,hito_fin) VALUES (? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,?,?);commit;";
	  //$test=null
	   date_default_timezone_set('America/Lima');
      try {
        $db = null;
			  if ($listaActividad != null) {
						$db = getConnection();
						for ($i = 0; $i < sizeof($listaActividad); $i++){
							 $actividad=$listaActividad[$i];
							//$test=$actividad;
							$stmt = $db->prepare($sql2);
							/*if (property_exists($actividad,"id_task")){
								echo $actividad->id_task ." ";
								CR_eliminarRecursosAsignados($actividad);
							}*/
							
							//CR_insertarRecursoAsignados($actividad->assigs,$actividad->id_task);
							/*if (property_exists($actividad, 'id_Wbs')){
								echo "[".$actividad->id_Wbs."]";
							}*/
							$stmt->execute(array($actividad->name,$idProyecto,(property_exists($actividad, 'id_Wbs'))?$actividad->id_Wbs:null,null,date("Y-m-d", $actividad->start/1000),date("Y-m-d", $actividad->end/1000),null,null,($i+1),$actividad->level,(property_exists($actividad,"depends"))?$actividad->depends:"",property_exists($actividad,"progress")?$actividad->progress:null,property_exists($actividad,"cost")?$actividad->cost:null,$actividad->duration,$actividad->status,$actividad->code,property_exists($actividad,"description")?$actividad->description:"",$actividad->start,$actividad->end,0,$actividad->startIsMilestone,$actividad->endIsMilestone));
							$id_task=$db->lastInsertId();
							CR_insertarRecursoAsignados($actividad->assigs,$id_task);
						}
						$db = null;
				}
      } catch(PDOException $e) {
		$db=null;
		
        return array("me"=>"guardar".$e->getMessage());
      }
	return CR_obtenerRespuestaExito();
}
function CR_insertarRecursoAsignados($assigs,$id_task){


	$sql="INSERT INTO ACTIVIDAD_X_RECURSO (id_actividad,id_recurso,cantidadEstimada,cantidadReal,costo_unitario_real,id_tipo_costo,estado) VALUES (?,?,?,?,?,?,?);COMMIT:";
	
	try {
        $db = null;
			  if ($assigs != null) {
						$db = getConnection();
						for ($i = 0; $i < sizeof($assigs); $i++){
							 $assig=$assigs[$i];
							//$test=$actividad;
							$stmt = $db->prepare($sql);
							$stmt->execute(array($id_task,$assig->idrecurso,$assig->value,property_exists($assig,"valueReal")?$assig->valueReal:null,(property_exists($assig,"costRateReal"))?$assig->costRateReal:null,(property_exists($assig,"idTipoCosto"))?$assig->idTipoCosto:null,1));
						}
						$db = null;
				}
      } catch(PDOException $e) {
		$db=null;
		//echo json_encode(array("me"=>"guardar".$e->getMessage()));
        return array("me"=>"guardar".$e->getMessage());
      }
	return CR_obtenerRespuestaExito();

}

function CR_eliminarRecursosAsignados($actividad){

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
        return array("me" => "eliminar".$e->getMessage());
    }
	return CR_obtenerRespuestaExito();
	
	

}

//Funciones hardcode
function CR_obteneListaDependenciaFalsa() {
    $listaDependencias = array();
    //igual al numero de actividades, SE DEBERÍA REALIZAR CON UN WHILE POR TODAS LAS ACTIVIDADES
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

function CR_obteneListaDependenciaProyecto($idProyecto) {//simil con lo hardcodeado
    $listaDependencias = array();
    //CR_Dependencia("1", "11-11-2013", "14-11-2013", "0");id,fechainicio,fechafin,dependencias tal como esta

    $sql = "select a.* from `dp2`.`ACTIVIDAD` a where a.id_proyecto=? ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idProyecto));
        $stmt = $db->query($sql);
        //$lista_jp = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
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

                $datetime1 = mysql_real_escape_string($datetime1);
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

function CR_obteneListaDependenciaPaqueteTrabajo($idpaquetetrabajo) {//simil con lo harcodeado
    $listaDependencias = array();

    $sql = "select a.* from `dp2`.`ACTIVIDAD` a where a.id_paquete_trabajo=? ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idpaquetetrabajo));
        $stmt = $db->query($sql);
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

                $datetime1 = mysql_real_escape_string($datetime1);
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
		$contador=1;
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            
			$rec = array("idrecurso" => $j["id_recurso"],"id" => "tmp_".$contador, "idunidadmedida" => $j["id_unidad_medida"], "name" => $j["descripcion"], "costRate" => $j["COSTO_UNITARIO_ESTIMADO"], "simbolo_unidad" => $j["simbolo_unidad"], "typeCost" => $j["descripcion_unidad"], "descripcion_moneda" => $j["descripcion_moneda"], "descripcion_rubropresupuestal" => $j["descripcion_rubropresupuestal"]);
            array_push($listaRecursos, $rec);
			$contador++;
			
        }

        $db = null;
        return $listaRecursos;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
}

function CR_obtenerRecursosTotalPaqueteTrabajo($idpaquetetrabajo) {

    $listaRecursos = array();

    $sql = "SELECT f.* FROM `dp2`.`RECURSO_X_PAQUETE` e inner join  (SELECT a.*,b.simbolo as 'simbolo_unidad',b.descripcion as 'descripcion_unidad',  c.descripcion as 'descripcion_moneda', d.descripcion as 'descripcion_rubropresupuestal'  FROM `dp2`.`RECURSO` a left join `dp2`.`UNIDAD_MEDIDA` b on b.id_unidad_medida=a.id_unidad_medida left join `dp2`.`CAMBIO_MONEDA` c on a.ID_CAMBIO_MONEDA=c.id_cambio_moneda left join `dp2`.`RUBRO_PRESUPUESTAL` d on a.id_rubro_presupuestal=d.id_rubro_presupuestal ) f on f.id_recurso=e.id_recurso where e.id_paquete_trabajo=? ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idpaquetetrabajo));
        $stmt = $db->query($sql);
        //$lista_jp = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
            $rec = array("idrecurso" => $j["id_recurso"], "idunidadmedida" => $j["id_unidad_medida"], "descripcion_recurso" => $j["descripcion"], "costo_unitario" => $j["COSTO_UNITARIO_ESTIMADO"], "simbolo_unidad" => $j["simbolo_unidad"], "descripcion_unidad" => $j["descripcion_unidad"], "descripcion_moneda" => $j["descripcion_moneda"], "descripcion_rubropresupuestal" => $j["descripcion_rubropresupuestal"]);
            array_push($listaRecursos, $rec);
        }

        $db = null;
        return $listaRecursos;
    } catch (PDOException $e) {
        return (array("me" => $e->getMessage()));
    }
}

//FALTA VERIFICAR EL PARSEO DE FECHA ENTRANTES Y SALIENTES PARA TODO EL BUGS BUNNY
function CR_obtenerListaRecursosAsignados($idActividad,$listaMapeoRecursos) {
    $listaRecursos = array();
	//$listaIds=array();
    //$sql2 = "SELECT f.*,e.cantidadEstimada,e.cantidadReal,e.costo_unitario_real "./*,g.descripcion as 'descripcion_tipocosto' ,g.id_tipo_costo */."FROM `dp2`.`ACTIVIDAD_X_RECURSO` e inner join  (SELECT a.*,b.simbolo as 'simbolo_unidad',b.descripcion as 'descripcion_unidad', c.descripcion as 'descripcion_moneda', d.descripcion as 'descripcion_rubropresupuestal' FROM `dp2`.`RECURSO` a left join `dp2`.`UNIDAD_MEDIDA` b on b.id_unidad_medida=a.id_unidad_medida left join `dp2`.`CAMBIO_MONEDA` c on a.ID_CAMBIO_MONEDA=c.id_cambio_moneda left join `dp2`.`RUBRO_PRESUPUESTAL` d on a.id_rubro_presupuestal=d.id_rubro_presupuestal ) f on f.id_recurso=e.id_recurso "./*inner join `dp2`.`TIPO_COSTO` g on g.id_tipo_costo=e.id_tipo_costo */."where e.id_actividad=? and e.estado=1";
    $sql="SELECT f.*,e.cantidadEstimada,e.cantidadReal,e.costo_unitario_real FROM `dp2`.`ACTIVIDAD_X_RECURSO` e inner join  (SELECT a.*,b.simbolo as 'simbolo_unidad',b.descripcion as 'descripcion_unidad', c.descripcion as 'descripcion_moneda', d.descripcion as 'descripcion_rubropresupuestal' FROM `dp2`.`RECURSO` a left join `dp2`.`UNIDAD_MEDIDA` b on b.id_unidad_medida=a.id_unidad_medida left join `dp2`.`CAMBIO_MONEDA` c on a.ID_CAMBIO_MONEDA=c.id_cambio_moneda left join `dp2`.`RUBRO_PRESUPUESTAL` d on a.id_rubro_presupuestal=d.id_rubro_presupuestal ) f on f.id_recurso=e.id_recurso where e.id_actividad=? and e.estado=1";
	try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array($idActividad));
        //$stmt = $db->query($sql);
        //$lista_jp = array();
		$contador=1;
        //echo "mira" . json_encode($listaMapeoRecursos);
		while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {//queda por ver mienbros de equipo y el campo esta aceptado
			//echo $j["id_recurso"]. "gg";
			//$idRecurso=$listaMapeoRecursos["1"];
			//echo $idRecurso;
			 $idRecurso=$listaMapeoRecursos["".$j["id_recurso"]];
			
            $rec = array("idrecurso" => $j["id_recurso"],"id"=>"tmp_".$contador , "resourceId" => $idRecurso,"idunidadmedida" => $j["id_unidad_medida"],/*"idTipoCosto" => $j["id_tipo_costo"],*/ "descripcion_recurso" => $j["descripcion"], "costRate" => $j["COSTO_UNITARIO_ESTIMADO"]+0, "simbolo_unidad" => $j["simbolo_unidad"], "typeCost" => $j["descripcion_unidad"], "descripcion_moneda" => $j["descripcion_moneda"], "descripcion_rubropresupuestal" => $j["descripcion_rubropresupuestal"], "value" => $j["cantidadEstimada"]+0, "valueReal" => $j["cantidadReal"], "costRateReal" => $j["costo_unitario_real"]/*, "descripcion_tipocosto" => $j["descripcion_tipocosto"]*/);
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

?>