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
        $stmt->bindParam("id", $resultado->id);
        $stmt->execute();

        $sql = " 
        select COUNT(*) as cuenta from EDT as E, ESTADO_EDT as EE where E.id_proyecto =:id and E.id_estado!=EE.id_estado and EE.descripcion='Pendiente' ";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $resultado->id);
        $stmt->execute();
        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        $cantidad = $p["cuenta"];
        $db = null;

        echo json_encode(array("me" => $cantidad)); //cantidad de edts aun pendientes
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
                "desc" => $j["descripcion"],
                "flag_cumplido" => $j["flag_cumplido"]
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
//   $request = "{ \"l_objetivos\":[{\"estado_cumplido\": 0, \"id_obj\": 1},{\"estado_cumplido\": 1, \"id_obj\": 2}]}";
//   $body = json_decode($request);

    $id = $body->id;
    $l_objetivos = $body->l_objetivos;

    try {


        for ($i = 0; $i < count($l_objetivos); $i++) {
            $desc = $l_objetivos[$i]->desc;
            $ido = $l_objetivos[$i]->ido;

            $db = getConnection();
            if ($ido == "") {
                //INSERTAR
                $insert = " insert into OBJETIVO (descripcion, comentarios, flag_cumplido, id_proyecto) values (:desc, '', 0, :id) ";
                $stmt = $db->prepare($insert);
                $stmt->bindParam("desc", $desc);
                $stmt->bindParam("id", $id);
                $stmt->execute();
            } else {
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
            $id_obj = $l_objetivos[$i]->ido;
            $estado_cumplido = $l_objetivos[$i]->est;


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

function G_getCostoPorProyectoPrueba($id) {
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
                "c_est" => (string) $c_est,
                "c_real" => (string) $c_real
            );
            $costo_total_real += $c_real;
            $costo_total_est += $c_est;
            array_push($l_costos_edt, $costo);
//        }
//        $db = null;
        }

        $costos = array(
            "c_total_est" => (string) $costo_total_est,
            "c_total_real" => (string) $costo_total_real,
            "l_costos_edt" => $l_costos_edt
        );
        echo json_encode(array("costos" => $costos));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getCostoPorProyecto($id) {
    //obtener paquete raíz
    $sql = "SELECT
    A.ID_PROYECTO,
    Y.ID_PAQUETE_TRABAJO,
    Y.NOMBRE NOMBRE_PAQUETE,
    0 as COSTO_PAQUETE_SOLES
    from 
    PROYECTO A 
    JOIN EDT Z ON A.ID_PROYECTO=Z.ID_PROYECTO
    JOIN PAQUETE_TRABAJO Y ON Z.ID_EDT=Y.ID_EDT
    WHERE
    Y.ID_COMPONENTE_PADRE IS NULL 
    AND
    A.ID_PROYECTO= :idProyecto AND Z.ID_ESTADO<>4
    GROUP BY
    A.ID_PROYECTO,
    Y.ID_PAQUETE_TRABAJO,
    Y.NOMBRE ";

  
    $l_costos_edt = array();
    $costo_total_real = 0;
    $costo_total_est = 0;
    
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idProyecto", $id);
        $stmt->execute();

        while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {
            //id paquete, nombre paquete, lista de paquetes hijo
            $idPaqueteRaiz = $p["ID_PAQUETE_TRABAJO"];

            $sql = "SELECT
			A.ID_PROYECTO,
			Y.ID_PAQUETE_TRABAJO,
			Y.NOMBRE NOMBRE_PAQUETE,
                        Y.descripcion DESCRIPCION,
			EST.descripcion as ESTADO,
			SUM(CASE
			WHEN B.ID_PAQUETE_TRABAJO IS NULL OR C.ID_ACTIVIDAD IS NULL OR D.ID_RECURSO IS NULL OR X.ID_CAMBIO_MONEDA IS NULL THEN 0
			WHEN B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1  AND Z.ID_ESTADO<>4 AND D.ESTADO<>'ELIMINADO' AND C.ESTADO<>0
				THEN IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(D.COSTO_UNITARIO_ESTIMADO*CAMBIO_A_SOL,0))
			ELSE 0	
			END
			) COSTO_PAQUETE_SOLES
			from 
			ESTADO_EDT EST,
			PROYECTO A 
			JOIN EDT Z ON A.ID_PROYECTO=Z.ID_PROYECTO
			JOIN PAQUETE_TRABAJO Y ON Z.ID_EDT=Y.ID_EDT
			LEFT JOIN ACTIVIDAD B ON Y.ID_PAQUETE_TRABAJO=B.ID_PAQUETE_TRABAJO
			LEFT JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
			LEFT JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
			LEFT JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
			WHERE
			Y.ID_COMPONENTE_PADRE= :idPaquete AND (X.FECHA IS NULL OR DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')) and EST.id_estado = Y.id_estado
			GROUP BY
			A.ID_PROYECTO,
			Y.ID_PAQUETE_TRABAJO,
			Y.NOMBRE; ";

            try {
                $stmt = $db->prepare($sql);
                $stmt->bindParam("idPaquete", $idPaqueteRaiz);
                $stmt->execute();

                while ($p = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    //id paquete, nombre paquete, lista de paquetes hijo
                    $c_real = $p["COSTO_PAQUETE_SOLES"];
                    $c_est = $p["COSTO_PAQUETE_SOLES"];
                    
                    $paqueteHijo = array(
                        "nombre" => $p["DESCRIPCION"],
                        "estado" => $p["ESTADO"],
                        "c_est" => (string)$c_est,
                        "c_real" => (string)$c_real
                    );
                    $costo_total_real += $c_real;
                    $costo_total_est += $c_est;
                    array_push($l_costos_edt, $paqueteHijo);
                }
            } catch (PDOException $e) {
                $db=null;
                echo json_encode(array("me" => $e->getMessage()));
                return;
            }
        }
        $costos = array(
            "c_total_est" => (string) $costo_total_est,
            "c_total_real" => (string) $costo_total_real,
            "l_costos_edt" => $l_costos_edt
        );
        echo json_encode(array("costos" => $costos));
    } catch (PDOException $e) {
        $db=null;
        echo json_encode(array("me" => $e->getMessage()));
        return;
    }
    $db = null;
}

?>
