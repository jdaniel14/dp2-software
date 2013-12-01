<?php

include('routesGeneral4.php');
include_once '../backend/conexion.php';

function G_getProfesiones() {
    $sql = " SELECT id_profesion, descripcion FROM PROFESION ";
    try {
        $db = getConnection();

        $stmt = $db->query($sql);
        $lista = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $elemento = array(
                "id" => $j["id_profesion"],
                "nom" => $j["descripcion"]
            );
            array_push($lista, $elemento);
        }
        $db = null;
        echo json_encode(array("profesiones" => $lista));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postRegistrarRecurso() {
    $request = \Slim\Slim::getInstance()->request();
    $proj = json_decode($request->getBody());

    try {
        $sql = " INSERT INTO EMPLEADO (nombres, apellidos, email, nombre_corto, pago_mensual, id_profesion, estado) VALUES (:noms, :aps, :email, :nomcorto, :pm, :idprof, :estado) ";
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("noms", $proj->nr);
        $stmt->bindParam("aps", $proj->ar);
        $stmt->bindParam("email", $proj->cr);
        $stmt->bindParam("nomcorto", $proj->usr);
        $stmt->bindParam("estado", $proj->est);
        $stmt->bindParam("pm", $proj->pm);
        $stmt->bindParam("idprof", $proj->pr);
        $stmt->execute();

        $proj->id = $db->lastInsertId();

        $sql = "INSERT INTO SEGURIDAD ( user,
                                        password,
                                        nivel_autorizacion,
                                        fecha_creacion,
                                        id_empleado)
                               VALUES (:nomcorto,
                                       :nomcorto,
                                       1,
                                       now(),
                                       :id_empleado)";

        $stmt = $db->prepare($sql);        
        $stmt->bindParam("nomcorto", $proj->usr);
        $stmt->bindParam("nomcorto", $proj->psw);
        $stmt->bindParam("id_empleado", $proj->id);
        $stmt->execute();

        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}


function G_postActualizarRecurso() {
    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());
    
      //$request = "{ \"l_recursos\":[{\"ide\": \"17\", \"nr\": \"Nombre de prueba\", \"ar\": \"Apellidos de prueba\",\"tr\": \"34567887\", \"em\": \"prueba@gmail.com\", \"ncr\": \"nombre corto de prueba\",\"pm\": \"222\",\"pr\": \"1\"}]}";
      //$body = json_decode($request);
    
    $l_recursos = $body->l_recursos;
  
    try {
        $db = getConnection();      
        for ($i = 0; $i < count($l_recursos); $i++) {
            $nombres = $l_recursos[$i]->nr;
            $apellidos = $l_recursos[$i]->ar;
            $telefono = $l_recursos[$i]->tr;
            $email = $l_recursos[$i]->em;
            $nombre_corto = $l_recursos[$i]->ncr;
            $pago_mensual = $l_recursos[$i]->pm;
            $id_profesion = $l_recursos[$i]->pr;
            $id_empleado = $l_recursos[$i]->ide;

            //UPDATE
            $update = " UPDATE EMPLEADO SET nombres=:nombres, apellidos=:apellidos, telefono=:telefono, email=:email, nombre_corto=:nombre_corto, pago_mensual=:pago_mensual, id_profesion=:id_profesion  WHERE id_empleado=:id_empleado ";
            $stmt = $db->prepare($update);
            $stmt->bindParam("nombres", $nombres);
            $stmt->bindParam("apellidos", $apellidos);
            $stmt->bindParam("telefono", $telefono);
            $stmt->bindParam("email", $email);
            $stmt->bindParam("nombre_corto", $nombre_corto);
            $stmt->bindParam("pago_mensual", $pago_mensual);
            $stmt->bindParam("id_profesion", $id_profesion);
            $stmt->bindParam("id_empleado", $id_empleado);
            $stmt->execute();
        }
        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getListaEmpleados() {
    $sql = " select id_empleado, nombres, apellidos, telefono, email, nombre_corto, pago_mensual, id_profesion from EMPLEADO where estado = 'ACTIVO' ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();

        $lista = array();
        while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $tel = $p["telefono"];
            $email = $p["email"];
            if ($tel == null) {
                $tel = "";
            }
            if ($email == null) {
                $email = "";
            }
            $item = array("id_emp" => $p["id_empleado"],
                "noms" => $p["nombres"],
                "aps" => $p["apellidos"],
                "tel" => $tel,
                "em" => $email,
                "nc" => $p["nombre_corto"],
                "pm" => $p["pago_mensual"],
                "idpr" => $p["id_profesion"]
            );
            array_push($lista, $item);
        }
        $db = null;
        echo json_encode(array("lista" => $lista));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}


function G_postDarbajaEmpleado() {
    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());
    //$request = "{\"ide\": \"17\"}";
    //$body = json_decode($request->getBody());
    $db = getConnection();
    $sql = " UPDATE EMPLEADO SET estado=:estado WHERE id_empleado=:id_empleado ";
    try {
        
        $stmt = $db->prepare($sql);
        $stmt->bindParam("estado", "DE BAJA");
        $stmt->bindParam("id_empleado", $body->ide);
        $stmt->execute();
        
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
    
    $sql = " UPDATE MIEMBROS_EQUIPO SET estado=:estado WHERE id_empleado=:id_empleado ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("estado", 0);
        $stmt->bindParam("id_empleado", $body->ide);
        $stmt->execute();
        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        $db = null;
        echo json_encode(array("me" => $e->getMessage()));
    }
}
///////
function G_getLineaBase($id) {
    $lineaBase = G_obtenerLineaBase($id);

    echo json_encode($lineaBase);
}

function G_obtenerLineaBase($id) {
    $sql = " SELECT  P.FLAG_LINEA_BASE_EDITABLE linea
            from PROYECTO P
            WHERE P.ID_PROYECTO=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();


        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        $estado = $p["linea"];
        $lineaBase='false';
        if($estado==1){
            $lineaBase="true";
        }

                
        $db = null;
        return array("estado_linea_base" => $lineaBase);
    } catch (PDOException $e) {
        return array("me" => $e->getMessage());
    }
}

function G_setLineaBase($id) {

    $sysdate=new DateTime('NOW');
    $fecha=$sysdate->format('c');

    $sql = " UPDATE  PROYECTO 
            SET FLAG_LINEA_BASE_EDITABLE=1, 
            LINEA_BASE_FECHA_INICIO =:FECHA
            WHERE ID_PROYECTO=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("FECHA", $fecha);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $sql = "CALL grabar_linea_base(:id)";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getProfesion($id) { //Bonnie se la llevó facil :'(
    $sql = "SELECT ID_PROFESION from EMPLEADO WHERE id_empleado = :idEmpleado";

    $jsonRespuesta = new stdClass();
    $jsonRespuesta->idProfesion = "";
    $jsonRespuesta->profesiones = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idEmpleado", $id);
        $stmt->execute();
        $db = null;
        
        
        while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
            $jsonRespuesta->idProfesion = $p["ID_PROFESION"];
            break;
        }
        
        $sql = "SELECT id_profesion, descripcion FROM PROFESION";
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        
        

        while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
            $profesion = new stdClass();
            $profesion->id = $p["id_profesion"];
            $profesion->nom = $p["descripcion"];
            
            array_push($jsonRespuesta->profesiones, $profesion);
        }

    } catch(PDOException $e) {
        echo json_encode(array("me"=> $e->getMessage()));
    }


    echo json_encode($jsonRespuesta);
}


function G_getListaEmpleadosFull() {
    $sql = " select E.id_empleado, E.nombres, E.apellidos, E.telefono, E.email, E.nombre_corto, E.pago_mensual, P.id_profesion, P.descripcion as prof_desc, S.user from EMPLEADO as E, PROFESION as P, SEGURIDAD as S  where estado = 'ACTIVO' and P.id_profesion = E.id_profesion and S.id_empleado = E.id_empleado order by 1";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();

        $lista = array();
        while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $tel = $p["telefono"];
            $email = $p["email"];
            if ($tel == null) {
                $tel = "";
            }
            if ($email == null) {
                $email = "";
            }
            $item = array("id_emp" => $p["id_empleado"],
                "noms" => $p["nombres"],
                "aps" => $p["apellidos"],
                "tel" => $tel,
                "em" => $email,
                "nc" => $p["nombre_corto"],
                "pm" => $p["pago_mensual"],
                "idpr" => $p["id_profesion"],
                "descpr" => $p["prof_desc"],
                "user" => $p["user"]
            );
            array_push($lista, $item);
        }
        $db = null;
        echo json_encode(array("lista" => $lista));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getListaLineaBase($id) { 
    $sql = "SELECT num_linea_base, linea_base_fecha_inicio, linea_base_fecha_fin FROM dp2_lineabase.PROYECTO WHERE ID_PROYECTO=:ID";

    $jsonRespuesta = new stdClass();
    $jsonRespuesta->linea_base = array();
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("ID", $id);
        $stmt->execute();
        $db = null;
        
        while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
            $linea = $p["num_linea_base"];
            $lfi = $p["linea_base_fecha_inicio"];
            $lff = $p["linea_base_fecha_fin"];
            array_push($jsonRespuesta->linea_base, array("linea"=>$linea,"linea_base_fi"=>$lfi/*, "linea_base_ff"=>$lff*/));
        }
        

    } catch(PDOException $e) {
        echo json_encode(array("me"=> $e->getMessage()));
    }

    echo json_encode($jsonRespuesta);
}

function G_getListaRecursoProyecto($id) { 
    



    try {

        $db = getConnection();

        $sql = "SELECT A.ID_ACTIVIDAD, A.FECHA_PLAN_INICIO, A.FECHA_PLAN_FIN, E.ID_EMPLEADO
                FROM 
                    ACTIVIDAD A, 
                    ACTIVIDAD_X_RECURSO AR,
                    RECURSO R,
                    MIEMBROS_EQUIPO M, 
                    EMPLEADO E
                WHERE
                    A.ID_PROYECTO = :ID AND
                    AR.ID_ACTIVIDAD = A.ID_ACTIVIDAD AND
                    R.ID_RECURSO = AR.ID_RECURSO AND
                    M.ID_MIEMBROS_EQUIPO = R.ID_MIEMBROS_EQUIPO AND
                    E.ID_EMPLEADO = M.ID_EMPLEADO";

        $stmt = $db->prepare($sql);
        $stmt->bindParam("ID", $id);
        $stmt->execute();
     
        
        $lista_actividades = array();
        $fecha_inicio = null;
        $fecha_fin = null;
        $bool = true;
        while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
            $act = $p["ID_ACTIVIDAD"];
            $fpi = $p["FECHA_PLAN_INICIO"];
            $fpf = $p["FECHA_PLAN_FIN"];
            $id_emp = $p["ID_EMPLEADO"];

            if($bool){
                $fecha_inicio = strtotime($fpi);
                $fecha_fin = strtotime($fpf);
                $bool = false;
            } else {
                $ini_aux = strtotime($fpi);
                $fin_aux = strtotime($fpf);
                if($ini_aux < $fecha_inicio) $fecha_inicio = $ini_aux;
                if($fin_aux > $fecha_fin) $fecha_fin = $fin_aux;
            }
            $l = array("act"=>$act, "fec_ini"=>$fpi, "fec_fin"=>$fpf, "id_emp"=>$id_emp);
            array_push($lista_actividades, $l);
        }


        $sql = "SELECT M.ID_EMPLEADO, M.id_rol, E.nombre_corto
                FROM MIEMBROS_EQUIPO M, EMPLEADO E
                WHERE M.ID_PROYECTO = :ID AND E.id_empleado = M.id_empleado";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("ID", $id);
        $stmt->execute();

        $interval = ($fecha_fin - $fecha_inicio);
        $num_dias = $interval / (60 * 60 * 24) ;    
        $lista_empleados = array();
        $jefe_proyecto = 0;
        while ($emp = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $empleado = array();
            $empleado["id_emp"] = $emp["ID_EMPLEADO"];
            $id = $empleado["id_emp"];
            $empleado["nom"] = $emp["nombre_corto"];
            $empleado["rol"] = $emp["id_rol"];
            if($empleado["rol"] == 2) $jefe_proyecto = $id;
            $empleado["detalle_dias"] = new SplFixedArray($num_dias + 1);
            for ($i = 0; $i <= $num_dias; $i++) {
                $empleado["detalle_dias"][$i] = 0;
            }
            $lista_empleados[$id] = $empleado;
        }

        //var_dump($lista_actividades);
        //var_dump($lista_empleados);

        //while ($proy_emp = $stmt->fetch(PDO::FETCH_ASSOC)) {
        for($i = 0; $i < sizeof($lista_actividades); $i++) {
            $act = $lista_actividades[$i];

            $k = $act["id_emp"];
            $fecha_I = $act["fec_ini"];
            $fecha_F = $act["fec_fin"];
            $interval = abs(strtotime($fecha_I) - $fecha_inicio) / (60 * 60 * 24) ;
            //echo "interval1 ".$interval."<br>";
            $a = $interval;
            $interval = abs(strtotime($fecha_F) - strtotime($fecha_I)) / (60 * 60 * 24) ;
            //echo "interval2 ".$interval."<br>";
            $b = $interval + $a ;
            if ($b > $num_dias)
                $b = $num_dias;
            for ($j = $a; $j <= $b; $j++) {
                if($lista_empleados[$k]["rol"] == 2) $lista_empleados[$k]["detalle_dias"][$j] = -1;
                else $lista_empleados[$k]["detalle_dias"][$j] = $act["act"];
            }
        }
        //JEFE DE PROYECTO
        /*for ($j = 0; $j <= $num_dias; $j++) {
                $lista_empleados[$jefe_proyecto]["detalle_dias"][$j] = -1;
        }*/

        $f_i = Date('Y/m/d', $fecha_inicio);
        $f_f = Date('Y/m/d', $fecha_fin);
        //var_dump($lista_empleados);
        $db = null;
       

    } catch(PDOException $e) {
        echo json_encode(array("me"=> $e->getMessage()));
    }


    echo json_encode(array("fecha_inicio"=>$f_i, "fecha_fin"=>$f_f, "lista_empleados"=>$lista_empleados));
}


function G_getListaEmpleadosXProyecto($id) {
    $sql = " select distinct E.id_empleado as idemp, E.nombres as nombres, E.apellidos as apellidos, ME.id_rol, ME.fecha_entrada, ME.fecha_salida, P.descripcion from MIEMBROS_EQUIPO as ME, EMPLEADO as E, PROFESION as P where ME.id_proyecto = :idproyecto and E.estado = 'ACTIVO' AND ME.estado = 1 and ME.id_empleado = E.id_empleado and P.id_profesion = ME.id_profesion_actual ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idproyecto", $id);
        $stmt->execute();

        $lista = array();
        while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $idemp = $p["idemp"];
            $nombres = $p["nombres"];
            $apellidos = $p["apellidos"];
            $rol = $p["id_rol"];
            $fecha_entrada = $p["fecha_entrada"];
            $fecha_salida = $p["fecha_salida"];
            $profesion = $p["descripcion"];
            
            if ($nombres == null) {
                $nombres = "";
            }
            if ($apellidos == null) {
                $apellidos = "";
            }
            
            $item = array("idrecurso" => $idemp,
                "descripcion_recurso" => $nombres.' '.$apellidos,
                "rol" => $rol,
                "fe" => $fecha_entrada,
                "ff" => $fecha_salida,
                "profesion"=> $profesion
            );
            array_push($lista, $item);
        }
        $db = null;
        echo json_encode(array("recursos" => $lista));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}


function G_getInformacionProyecto($id) {
    $sql = " select P.id_proyecto, P.nombre_proyecto, P.descripcion_proyecto, PP.nombre_prioridad, P.fecha_inicio_planificada, P.fecha_fin_planificada, TP.nombre_tipo_proyecto from PROYECTO as P, TIPO_PROYECTO as TP, PRIORIDAD_PROYECTO as PP where P.id_proyecto = :idproyecto and TP.id_tipo_proyecto = P.id_tipo_proyecto and P.estado = 'ACTIVO' and PP.id_prioridad = P.id_prioridad ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idproyecto", $id);
        $stmt->execute();

        $lista = array();
        while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $nombre_proyecto = $p["nombre_proyecto"];
            $descripcion_proyecto = $p["descripcion_proyecto"];
            $nombre_prioridad = $p["nombre_prioridad"];
            $fecha_inicio_planificada = $p["fecha_inicio_planificada"];
            $fecha_fin_planificada = $p["fecha_fin_planificada"];
            $nombre_tipo_proyecto  = $p["nombre_tipo_proyecto"];
            
            $item = array("npr" => $nombre_proyecto,
                "npri" => $nombre_prioridad,
                "dpr" => $descripcion_proyecto,
                "fi" => $fecha_inicio_planificada,
                "ff" => $fecha_fin_planificada,
                "ntp" => $nombre_tipo_proyecto
            );
            array_push($lista, $item);
        }
        $db = null;
        echo json_encode(array("proyecto" => $lista));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

?>