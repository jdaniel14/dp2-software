<?php

include('routesGeneral3.php');
include_once '../backend/conexion.php';



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
    //$request = "{ \"id_proy\": 4,\"l_rrhhxpr\":[{\"idr\": \"1\",\"costo\": \"100\"},{\"idr\": \"2\",\"costo\": \"150\"}]}";
    //$body = json_decode($request);
    $id = $body->id;
    $l_objetivos = $body->l_objetivos;
    try {
        for ($i = 0; $i < count($l_objetivos); $i++) {
            $id = $l_objetivos[$i]->id;
            $desc = $l_objetivos[$i]->desc;
            
            //INSERT
            $insert = " insert into OBJETIVO (descripcion, comentarios, flag_cumplido, id_proyecto) values (:desc, '', 0, :id); ";
            $db = getConnection();
            $stmt = $db->prepare($insert);
            $stmt->bindParam("desc", $desc);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            
        }
         $db = null;
         echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}




?>
