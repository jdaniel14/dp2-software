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
        $nomcorto = (string) $proj->nr . (string) $proj->ar;
        $stmt->bindParam("noms", $proj->nr);
        $stmt->bindParam("aps", $proj->ar);
        $stmt->bindParam("email", $proj->cr);
        $stmt->bindParam("nomcorto", $nomcorto);
        $stmt->bindParam("estado", "ACTIVO");
        $stmt->bindParam("pm", $proj->pm);
        $stmt->bindParam("idprof", $proj->pr);
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
    
    $sql = " UPDATE EMPLEADO SET estado=:estado WHERE id_empleado=:id_empleado ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("estado", "DE BAJA");
        $stmt->bindParam("id_empleado", $body->ide);
        $stmt->execute();
        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

?>