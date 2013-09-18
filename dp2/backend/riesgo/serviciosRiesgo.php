<?php

	include('routesRiesgo.php');

    function R_getListaRiesgos(){
        echo "Probando :D";
	}

    function R_getListaPaquetesEDT($json){
        $idProyecto = json_decode($json);
        $arregloListaPaquetesEDT= array(
            array('id' => '1','descripcion' => 'alcance'),
            array('id' => '2','descripcion' => 'alcance2')
        );
        echo json_encode($arregloListaPaquetesEDT);
    }

    function R_getListaObjetosAfectados(json){
        $idProyecto = json_decode($json);
        $arregloListaObjetosAfectados= array(
            array('1'.'costo'),
            array('2'.'tiempo')
        );
        echo json_encode($arregloListaObjetosAfectados);
    }

    function R_getListaNivelesImpacto(json){
        $idProyecto = json_decode($json);
        $arregloListaNivelesImpacto= array(
            array('1'.'alto'),
            array('2'.'medio')
        );
        echo json_encode($arregloListaNivelesImpacto);
    }

    function R_getListaEquipoRiesgo(json){
        $idProyecto = json_decode($json);
        $arregloListaEquipoRiesgo= array(
            array('1'.'equipoA'),
            array('2'.'equipoB')
        );
        echo json_encode($arregloListaEquipoRiesgo);
    }

    function R_postRegistrarRiesgo(){

    }

    /*
  $request = Slim::getInstance()->request();
    $wine = json_decode($request->getBody());
    $sql = "INSERT INTO wine (name, grapes, country, region, year, description) VALUES (:name, :grapes, :country, :region, :year, :description)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $wine->name);
        $stmt->bindParam("grapes", $wine->grapes);
        $stmt->bindParam("country", $wine->country);
        $stmt->bindParam("region", $wine->region);
        $stmt->bindParam("year", $wine->year);
        $stmt->bindParam("description", $wine->description);
        $stmt->execute();
        $wine->id = $db->lastInsertId();
        $db = null;
        echo json_encode($wine);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    */
?>