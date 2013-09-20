<?php

	include('routesRiesgo.php');

    //Henry

    function R_getListaRiesgos(){
        echo "Probando :D";
	}
	
    function R_getListaPaquetesEDT($idProyecto){
        $idProyectoDecode = json_decode($idProyecto);
        $arregloListaPaquetesEDT= array(
            array('id' => '1','descripcion' => 'alcance'),
            array('id' => '2','descripcion' => 'alcance2')
        );
        echo json_encode($arregloListaPaquetesEDT);
    }

    function R_getListaObjetosAfectados($idProyecto){
        $idProyectoDecode = json_decode($idProyecto);
        $arregloListaObjetosAfectados= array(
            array('id' => '1','descripcion' => 'costo'),
            array('id' => '2','descripcion' => 'tiempo')            
        );
        echo json_encode($arregloListaObjetosAfectados);
    }

    function R_getListaNivelesImpacto($idProyecto){
        $idProyectoDecode = json_decode($idProyecto);
        $arregloListaNivelesImpacto= array(
            array('idImpacto' => '1','descripcion' => 'alto'),
            array('idImpacto' => '2','descripcion' => 'medio')          
        );
        echo json_encode($arregloListaNivelesImpacto);
    }

    function R_getListaEquipoRiesgo($idProyecto){
        $idProyectoDecode = json_decode($idProyecto);
        $arregloListaEquipoRiesgo= array(
            array('idEquipo' => '1','nombre' => 'equipoA'),
            array('idEquipo' => '2','nombre' => 'equipoB')
        );
        echo json_encode($arregloListaEquipoRiesgo);
    }

    function R_postRegistrarRiesgo(){
        $request = Slim::getInstance()->request();
        $riesgo = json_decode($request->getBody());
    }

    //Julio

    function R_getListaRiesgoComun(){
        $sql = "SELECT id_riesgo, nombre, ult_probabilidad, ult_impacto, ult_severidad FROM RIESGO WHERE id_categoria_riesgo = (SELECT id_categoria_riesgo FROM CATEGORIA_RIESGO WHERE tipo_riesgo = 1)"; //o cualquiera que sea el tipo de riesgo comun
        try{
            $db = getConnection();
            $stmt = $db->query($sql);
            $arregloListaRiesgoComun = $stmt->fetchAll();
            $db = null;
            echo json_encode($arregloListaRiesgoComun);
        } catch(PDOException $e){
            echo 'ERROR EN R_getListaRiesgoComun: {"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_postAsignarRiesgoComun($id_riesgo, $id_proyecto, $id_paquete_trabajo){
        //$request = Slim::getInstance()->request();
        $arregloAsignarRiesgoComun = json_decode($request->getBody());
        $sql = "INSERT INTO RIESGOXPAQUETE_TRABAJO (id_riesgo, id_proyecto, id_paquete_trabajo) VALUES (:id_riesgo, :id_proyecto, :id_paquete_trabajo)";
        try{
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id_riesgo",$id_riesgo);
            $stmt->bindParam("id_proyecto",$id_riesgo);
            $stmt->bindParam("id_paquete_trabajo",$id_riesgo);
            $stmt->execute();
            $arregloAsignarRiesgoComun = $db->lastInsertId();
            $db = null;
            echo json_encode($arregloAsignarRiesgoComun);
        } catch(PDOException $e){
            echo 'ERROR EN R_postAsignarRiesgoComun: {"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    
  /*
{”idProyecto”:”1”, “nombre”:”riesgo ”, , “idPaquete”:”1”, “idObjeto”:”1”, “idImpacto”:”1” , “probabilidad”:”0.5” , “acciones”:”texto …”, “costo”:”100” , “tiempo”:”2” , “idEquipo”:”1”}
    




    $sql = "INSERT INTO wine (name, grapes, country, region, year, description) VALUES (:name, :grapes, :country, :region, :year, :description)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $riesgo->name);
        $stmt->bindParam("grapes", $riesgo->grapes);
        $stmt->bindParam("country", $riesgo->country);
        $stmt->bindParam("region", $riesgo->region);
        $stmt->bindParam("year", $riesgo->year);
        $stmt->bindParam("description", $riesgo->description);
        $stmt->execute();
        $wine->id = $db->lastInsertId();
        $db = null;
        echo json_encode($wine);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
*/
    
?>