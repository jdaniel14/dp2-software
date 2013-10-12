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

?>
