<?php
	include('routesRiesgoV2.php');
    
    //--------------------------------------TIPO IMPACTO--------------------------------------

    function R_getListaTipoImpactoRiesgo($idProyecto){
        $query = "SELECT * FROM TIPO_IMPACTO WHERE id_proyecto=".$idProyecto;
        try{
			$arregloListaTipoImpacto= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data= array("idTipo" => $row['id_tipo_impacto'], "tipoRi" => $row['descripcion'],"formas" => $row['tipo']);
                array_push($arregloListaTipoImpacto,$data);
            }
            $db = null;
            echo json_encode($arregloListaTipoImpacto);
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_postRegistrarTipoImpactoRiesgo(){
        
        $request = \Slim\Slim::getInstance()->request();
        $listaTipoImpacto = json_decode($request->getBody());
        foreach($listaTipoImpacto->listaTipoImpacto as $tipoImpacto){
            $query = "INSERT INTO TIPO_IMPACTO (id_proyecto, descripcion, tipo) VALUES (:id_proyecto,:descripcion,:tipo)";
            try {
                $db = getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("id_proyecto", $listaTipoImpacto->idProyecto);
                $stmt->bindParam("tipo", $tipoImpacto->formas);
                $stmt->bindParam("descripcion", $tipoImpacto->tipoRi);
                $stmt->execute();
                $id = $db->lastInsertId();
                $db = null;
                echo json_encode("{Se registro con exito}");
            } catch(PDOException $e) {
                echo json_encode(array("me"=> $e->getMessage()));
            }
        }
    }

    //--------------------------------------ACUERDOS Y MODIFICACIONES--------------------------------------

    function R_getListaAcuerdos($idProyecto){
        $query = "SELECT * FROM ACUERDOS WHERE estado = 1 AND id_proyecto=".$idProyecto;
        try{
            $arregloListaTipoImpacto= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data= array("idAcuerdo" => $row['id_acuerdos'],"fecha" => $row['fecha'], "hora" => $row['hora'],"acuerdo" => $row['acuerdos']);
                array_push($arregloListaTipoImpacto,$data);
            }
            $db = null;
            echo json_encode($arregloListaTipoImpacto);
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_postRegistrarAcuerdos(){
        
        $request = \Slim\Slim::getInstance()->request();
        $listaAcuerdos = json_decode($request->getBody());
        foreach($listaAcuerdos->listaFechas as $acuerdos){
            $query = "INSERT INTO ACUERDOS (id_proyecto,fecha,hora,acuerdos,estado) VALUES (:id_proyecto,:fecha,:hora,:acuerdos,1)";
            try {
                $db = getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("id_proyecto", $listaAcuerdos->idProyecto);
                $stmt->bindParam("fecha", $acuerdos->fecha);
                $stmt->bindParam("hora", $acuerdos->hora);
                $stmt->bindParam("acuerdos", $acuerdos->acuerdo);
                $stmt->execute();
                $db = null;
                echo json_encode("{Se registro con exito}");
            } catch(PDOException $e) {
                echo json_encode(array("me"=> $e->getMessage()));
            }
        }
    }

?>