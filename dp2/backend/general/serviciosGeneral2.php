<?php

include('routesGeneral2.php');
include_once '../backend/conexion.php';

function G_getCategoria() {
    $sql = " SELECT id_categoria_lec, nombre_categoria_lec, descripcion_categoria_lec from CATEGORIA_LEC_APRENDIDA ";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $lista_cats = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cat = array("idCategoria" => $j["id_categoria_lec"],
                "nom" => $j["nombre_categoria_lec"]);
            array_push($lista_cats, $cat);
        }
        $db = null;
        echo json_encode($lista_cats);
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getUsuario() {
    $request = \Slim\Slim::getInstance()->request();
    $acta = json_decode($request->getBody());
    $sql = "SELECT e.nombre_corto,e.id_empleado
                        FROM SEGURIDAD s, EMPLEADO e 
                        WHERE s.user=:p_user
                        and s.password=:p_pass
                        and s.id_empleado=e.id_empleado";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("p_user", $acta->p_user);
        $stmt->bindParam("p_pass", $acta->p_pass);
        $stmt->execute();
        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        $usuario = array("nom_user" => $p["nombre_corto"],
            "id_user" => $p["id_empleado"]);
        $db = null;
        echo json_encode(array("me" => $usuario));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postRegistrarLeccionAprendida() {
    $request = \Slim\Slim::getInstance()->request();
    $proj = json_decode($request->getBody());

    try {
        $sql = " INSERT INTO LECCION_APRENDIDA (id_empleado_proyecto, id_categoria_lec, descripcion, estado, fecha_registro, fecha_actualizacion) VALUES (:idexp, :cla, :dla, 1, SYSDATE(), SYSDATE())";
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idexp", $proj->idexp);
        $stmt->bindParam("cla", $proj->cla);
        $stmt->bindParam("dla", $proj->dla);
        $stmt->execute();

        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getProyectosXEmpleado($id) {
    $sql = " SELECT id_empleadoXproyecto, nombre_proyecto 
                 FROM EMPLEADO_PROYECTO EXP, PROYECTO P
                 WHERE EXP.id_proyecto = P.id_proyecto and EXP.id_empleado =:id ";
    try {
        $db = getConnection();

        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $l_proyxemp = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $proy = array(
                "idProxEmp" => $j["id_empleadoXproyecto"],
                "nomProy" => $j["nombre_proyecto"]
            );
            array_push($l_proyxemp, $proy);
        }
        $db = null;
        echo json_encode($l_proyxemp);
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postBorrarLeccionAprendida() {
    $request = \Slim\Slim::getInstance()->request();
    $leccion = json_decode($request->getBody());
    $sql = " UPDATE LECCION_APRENDIDA SET estado=0
	    WHERE id_leccion_aprendida=:id ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $leccion->id);
        $stmt->execute();
        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_postActualizarLeccionAprendida() {
    $request = \Slim\Slim::getInstance()->request();
    $leccion = json_decode($request->getBody());
    $sql = " UPDATE LECCION_APRENDIDA SET id_empleado_proyecto=:idexp, id_categoria_lec =:cla, descripcion =:dla, fecha_actualizacion=SYSDATE()
	    WHERE id_leccion_aprendida=:id and estado=1 ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $leccion->idexp);
        $stmt->bindParam("id", $leccion->cla);
        $stmt->bindParam("id", $leccion->dla);
        $stmt->bindParam("id", $leccion->id);
        $stmt->execute();
        $db = null;
        echo json_encode(array("me" => ""));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getLeccionesAprendidas() {
    $sql = " 
select LA.id_leccion_aprendida as id, CONCAT(E.apellidos, ', ', E.nombres) as empleado, LA.descripcion as descr, P.id_proyecto, P.nombre_proyecto as np, CLA.id_categoria_lec, CLA.nombre_categoria_lec as cla, LA.fecha_actualizacion
from LECCION_APRENDIDA LA, EMPLEADO E, PROYECTO P, EMPLEADO_PROYECTO EP, CATEGORIA_LEC_APRENDIDA CLA
where E.id_empleado = EP.id_empleado and P.id_proyecto = EP.id_proyecto and CLA.id_categoria_lec = LA.id_categoria_lec and EP.id_empleadoXproyecto = LA.id_empleado_proyecto order by LA.fecha_actualizacion
 ";
    try {
        $db = getConnection();

        $stmt = $db->query($sql);
        $lista = array();
        while ($j = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $leccion = array(
                "id" => $j["id"],
                "ne" => $j["empleado"],
                "dla" => $j["descr"],
                "np" => $j["np"],
                "cla" => $j["cla"]
            );
            array_push($lista, $leccion);
        }
        $db = null;
        echo json_encode(array("lecciones"=>$lista));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

function G_getLeccionAprendidasById($id) {
    $sql = " 
select LA.id_leccion_aprendida as id, CONCAT(E.apellidos, ', ', E.nombres) as empleado, LA.descripcion as descr, P.id_proyecto, P.nombre_proyecto as np, CLA.id_categoria_lec as idcla, CLA.nombre_categoria_lec as cla, LA.fecha_actualizacion, EP.id_empleadoXproyecto as idexp
from LECCION_APRENDIDA LA, EMPLEADO E, PROYECTO P, EMPLEADO_PROYECTO EP, CATEGORIA_LEC_APRENDIDA CLA
where E.id_empleado = EP.id_empleado and P.id_proyecto = EP.id_proyecto and CLA.id_categoria_lec = LA.id_categoria_lec and EP.id_empleadoXproyecto = LA.id_empleado_proyecto 
and LA.id_leccion_aprendida =:id order by LA.fecha_actualizacion
 ";
    try {
        $db = getConnection();

        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        $item = array(
                "id" => $p["id"],
                "ne" => $p["empleado"],
                "dla" => $p["descr"],
                "np" => $p["np"],
                "idcla" => $p["idcla"],
                "cla" => $p["cla"],
                "idexp" => $p["idexp"]
            );
        $db = null;
        echo json_encode(array("leccion"=>$item));
    } catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
    }
}

?>
