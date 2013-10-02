<?php
	include('routesRiesgoV2.php');
    
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

    function R_postRegistrarTipoImpactoRiesgo($idProyecto){
        
        $request = \Slim\Slim::getInstance()->request();
        $listaTipoImpacto = json_decode($request->getBody());
        foreach($listaTipoImpacto->lista as $tipoImpacto){
	        $query = "INSERT INTO TIPO_IMPACTO (id_proyecto, descripcion, tipo) VALUES (:id_proyecto,:descripcion,:tipo)";
	        try {
	            $db = getConnection();
	            $stmt = $db->prepare($query);
	            $stmt->bindParam("id_proyecto", $idProyecto);
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
?>