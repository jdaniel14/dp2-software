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
                $data= array("idTipoImpacto" => $row['id_tipo_impacto'], "descripcion" => $row['descripcion'],"tipo" => $row['tipo']);
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
        foreach($listaTipoImpacto->lista as $tipoImpacto){
            $query = "INSERT INTO TIPO_IMPACTO (id_proyecto, descripcion, tipo) VALUES (:id_proyecto,:descripcion,:tipo)";
            try {
                $db = getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("id_proyecto", $tipoImpacto->idProyecto);
                $stmt->bindParam("descripcion", $tipoImpacto->descripcion);
                $stmt->bindParam("tipo", $tipoImpacto->tipo);
                $stmt->execute();
                $id = $db->lastInsertId();
                $db = null;
                echo json_encode(array("idTipoImpacto"=>$id,"descripcion"=>$tipoImpacto->descripcion,"tipo"=>$tipoImpacto->tipo));
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
                $data= array("fecha" => $row['fecha'], "hora" => $row['hora'],"acuerdos" => $row['acuerdos']);
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
        $acuerdos = json_decode($request->getBody());
        $query = "INSERT INTO ACUERDOS (id_proyecto,fecha,hora,acuerdos,estado) VALUES (:id_proyecto,:fecha,:hora,:acuerdos,1)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $acuerdos->idProyecto);
            $stmt->bindParam("fecha", $acuerdos->fecha);
            $stmt->bindParam("hora", $acuerdos->hora);
            $stmt->bindParam("acuerdos", $acuerdos->acuerdos);
            $stmt->execute();
            $db = null;
            echo json_encode("{Se registro con exito}");
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

?>