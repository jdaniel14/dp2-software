<?php

	include('routesRiesgo.php');

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

    
  /*
    
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