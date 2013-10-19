<?php

include('routesGeneral3.php');
include_once '../backend/conexion.php';


//Cierre de proyecto
function G_getValidarSuccess($id) {
    $sql = " 
        SELECT COUNT(*) as cuenta FROM ACTIVIDAD as A, PROYECTO as P WHERE A.ID_PROYECTO =:id AND (A.ESTADO <> 'STATUS_DONE' and A.eliminado=0) and A.ID_PROYECTO = P.ID_PROYECTO and P.ESTADO <> 'CERRADO' and P.ESTADO <> 'ELIMINADO' 
 ";
    try {
        $db = getConnection();

        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        $cantidad = $p["cuenta"];
        $db = null;
        
        echo json_encode(array("exito" => $cantidad)); //cantidad de actividades sin terminar o fallidas
        
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postCerrarProyecto() {
    $request = \Slim\Slim::getInstance()->request();
    $resultado = json_decode($request->getBody());
    $sql = " UPDATE PROYECTO SET estado='CERRADO' where id_proyecto=:id ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        //$stmt->bindParam("estado", $resultado->estado);
        $stmt->bindParam("id", $resultado->id);
        $stmt->execute();
        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getObjetivosPorProyecto($id) {
    $sql = " SELECT id_objetivo, descripcion, comentarios, flag_cumplido FROM OBJETIVO where id_proyecto=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $l_objetivos = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $obj = array(
                "id" => $j["id_objetivo"],
                "desc" => $j["descripcion"]
            );
            array_push($l_objetivos, $obj);
        }
        $db = null;
        echo json_encode(array("l_objetivos" => $l_objetivos));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postObjetivosPorProyecto() {
    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());
//    $request = "{ \"id\": 1,\"l_objetivos\":[{\"desc\": \"ola k ase\"},{\"desc\": \"ola k ase 2\"}]}";
//   $body = json_decode($request);

    $id = $body->id;
    $l_objetivos = $body->l_objetivos;
    
     try {
         
         
        for ($i = 0; $i < count($l_objetivos); $i++) {
             $desc = $l_objetivos[$i]->desc;
             $ido = $l_objetivos[$i]->ido;
             
             $db = getConnection();
             if ($ido == ""){
                 //INSERTAR
                 $insert = " insert into OBJETIVO (descripcion, comentarios, flag_cumplido, id_proyecto) values (:desc, '', 0, :id) ";
                 $stmt = $db->prepare($insert);
                 $stmt->bindParam("desc", $desc);
                 $stmt->bindParam("id", $id);
                 $stmt->execute();
             }
             else {
                 //UPDATE
                 $update = " UPDATE OBJETIVO SET descripcion = :desc WHERE id_objetivo = :ido ";
                 $stmt = $db->prepare($update);
                 $stmt->bindParam("desc", $desc);
                 $stmt->bindParam("ido", $ido);
                 $stmt->execute();
             }
         }
         $db = null;
         echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
    
}


function G_postCumpObjetivosPorProyecto() {
    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());
//   $request = "{ \"l_objetivos\":[{\"estado_cumplido\": 0, \"id_obj\": 1},{\"estado_cumplido\": 1, \"id_obj\": 2}]}";
//   $body = json_decode($request);

    $l_objetivos = $body->l_objetivos;
    try {
        $db = getConnection();
        for ($i = 0; $i < count($l_objetivos); $i++) {
            $id_obj = $l_objetivos[$i]->id_obj;
            $estado_cumplido = $l_objetivos[$i]->estado_cumplido;

            
            //UPDATE
            $update = " UPDATE OBJETIVO SET flag_cumplido=:estado_cumplido where id_objetivo=:id_obj ";
            $stmt = $db->prepare($update);
            $stmt->bindParam("estado_cumplido", $estado_cumplido);
            $stmt->bindParam("id_obj", $id_obj);
            $stmt->execute();
            
        }
          $db = null;
         echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getCostoPorProyecto($id) {
    //$sql = " SELECT id_objetivo, descripcion, comentarios, flag_cumplido FROM OBJETIVO where id_proyecto=:id";
    try {
//        $db = getConnection();
//        $stmt = $db->prepare($sql);
//        $stmt->bindParam("id", $id);
//        $stmt->execute();

        $l_costos_edt = array();
        $costo_total_real = 0;
        $costo_total_est = 0;
        
//        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
         for ($i = 0; $i < 6; $i++) {
            
//            $obj = array(
//                "id" => $j["id_objetivo"],
//                "desc" => $j["descripcion"]
//            );
            $c_est = 263;
            $c_real = 223;
            $costo = array(
                "nom_edt" => "EDT de Algo ",
                "estado" => "terminado",
                "c_est" => (string)$c_est,
                "c_real" => (string)$c_real
            );
            $costo_total_real += $c_real;
            $costo_total_est += $c_est;
            array_push($l_costos_edt, $costo);
//        }
//        $db = null;
        }
        
        $costos = array(
                "c_total_est" => (string)$costo_total_est,
                "c_total_real" => (string)$costo_total_real,
                "l_costos_edt" => $l_costos_edt
            );
        echo json_encode(array("costos" => $costos));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}


?>
