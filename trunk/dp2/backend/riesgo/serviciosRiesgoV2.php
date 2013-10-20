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

        $query ="DELETE FROM TIPO_IMPACTO WHERE id_proyecto=:id_proyecto";
         
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $listaTipoImpacto->idProyecto);
            $stmt->execute();
            $db = null;
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

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


    function R_deleteTipoImpactoRiesgo($idImpacto){

        $sql = "DELETE FROM TIPO_IMPACTO WHERE id_tipo_impacto=:idImpacto";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("idImpacto", $idImpacto);
            $stmt->execute();
            $db = null;
            echo '{Riesgo eliminado con exito}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
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

        $query ="DELETE FROM ACUERDOS WHERE id_proyecto=:id_proyecto";
         
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $listaAcuerdos->idProyecto);
            $stmt->execute();
            $db = null;
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

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

    //--------------------------------------HEADER IMPACTO--------------------------------------

    function R_postRegistrarHeaderImpacto(){
        $request = \Slim\Slim::getInstance()->request();
        $impacto = json_decode($request->getBody());
        $query = "INSERT INTO NIVEL_IMPACTO (id_proyecto,nivel,descripcion) VALUES (:id_proyecto,:nivel,:descripcion)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $impacto->idProyecto);
            $stmt->bindParam("nivel", $impacto->nivel);
            $stmt->bindParam("descripcion", $impacto->descripcion);
            $stmt->execute();
            $db = null;
            echo json_encode('{Se registro correctamente}');
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_deleteHeaderImpacto($idProyecto){

        $sql = "DELETE FROM NIVEL_IMPACTO WHERE id_Proyecto=:idProyecto";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("idProyecto", $idProyecto);
            $stmt->execute();
            $db = null;
            echo '{Header impacto eliminado con exito}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }

    //--------------------------------------CREAR MATRIZ--------------------------------------

    function R_getGenerarMatriz($idProyecto){
        //Nivel Impacto
        $query = "SELECT nivel FROM NIVEL_IMPACTO WHERE id_proyecto=".$idProyecto." ORDER BY 1 ASC";
        try{
            $arregloNivel= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data= array("nivel" => $row['nivel']);
                array_push($arregloNivel,$data);
            }
            $db = null;
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
        //Probabilidad Riesgo
        $query = "SELECT nivel FROM PROBABILIDAD_RIESGO WHERE id_proyecto=".$idProyecto." ORDER BY 1 ASC";
        try{
            $arregloProbabilidad= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data= array("nivel" => $row['nivel']);
                array_push($arregloProbabilidad,$data);
            }
            $db = null;
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
        //Matriz
        $arregloMatriz = array();
        foreach($arregloProbabilidad as $valorProb){
            $arregloLinea = array();
            $data = array("valorProb" => ($valorProb['nivel']));
            array_push($arregloLinea,$data);
            foreach($arregloNivel as $valorNivel){
                $valorMult = $valorNivel['nivel']*$valorProb['nivel'];
                $data = array("valorImpacto" => $valorNivel['nivel'], "valorMult" => $valorMult);
                array_push($arregloLinea,$data);
            }
            array_push($arregloMatriz, $arregloLinea);
        }
        echo json_encode($arregloMatriz);
    }

    //--------------------------------------ESTRATEGIAS--------------------------------------


    function R_getEstrategias($idProyecto){ //Recordar cambiar para doble tipo
        $query = "SELECT * FROM CATEGORIZACION_ESTRATEGIAS WHERE id_proyecto=".$idProyecto;
        try{
            $arregloListaEstrategias= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data= array("idEstrategia" => $row['id_categorizacion_estrategias'],"puntajeMin" => $row['puntaje_limite_bajo'], "puntajeMax" => $row['puntaje_limite_alto'],
                    "prioridad" => $row['prioridad'], "estrategia" => $row['estrategia'], "significado" => $row['significado']);
                array_push($arregloListaEstrategias,$data);
            }
            $db = null;
            echo json_encode($arregloListaEstrategias);
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_postRegistrarEstrategias(){ //Recordar cambiar para doble tipo
        $request = \Slim\Slim::getInstance()->request();
        $listaEstrategia = json_decode($request->getBody());
        R_deleteEstrategias($listaEstrategia->idProyecto);
        foreach ($listaEstrategia->listaEstrategias as $estrategia){
            $query = "INSERT INTO CATEGORIZACION_ESTRATEGIAS (id_proyecto,tipo,puntaje_limite_bajo,puntaje_limite_alto, prioridad, estrategia, significado) 
                        VALUES (:id_proyecto,1,:puntaje_limite_bajo, :puntaje_limite_alto, :prioridad, :estrategia, :significado)";
            try {
                $db = getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("id_proyecto", $listaEstrategia->idProyecto);
                $stmt->bindParam("puntaje_limite_bajo", $estrategia->puntajeMin);
                $stmt->bindParam("puntaje_limite_alto", $estrategia->puntajeMax);
                $stmt->bindParam("prioridad", $estrategia->prioridad);
                $stmt->bindParam("estrategia", $estrategia->estrategia);
                $stmt->bindParam("significado", $estrategia->significado);
                $stmt->execute();
                $db = null;
                echo json_encode('{Se registro correctamente}');
            } catch(PDOException $e) {
                echo json_encode(array("me"=> $e->getMessage()));
            }
        }
    }

    function R_deleteEstrategias($idProyecto){

        $sql = "DELETE FROM CATEGORIZACION_ESTRATEGIAS WHERE id_Proyecto=:idProyecto";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("idProyecto", $idProyecto);
            $stmt->execute();
            $db = null;
            echo '{Categorizacion de estrategias eliminados con exito}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }

    //--------------------------------------PUNTAJE MINIMO Y MAXIMO--------------------------------------

    function R_getPuntajes($idProyecto){

        //Minimo
        $query = "SELECT MIN(nivel) AS minimonivel FROM NIVEL_IMPACTO WHERE id_proyecto=".$idProyecto;
        try{
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $minimonivel = $row['minimonivel'];
            }
            $db = null;
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

        $query = "SELECT MIN(nivel) AS minimoprob FROM PROBABILIDAD_RIESGO WHERE id_proyecto=".$idProyecto;
        try{
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $minimoprob =  $row['minimoprob'];
            }
            $db = null;
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

        $minimorango = $minimonivel * $minimoprob;

        //Maximo
        $query = "SELECT MAX(nivel) AS maximonivel FROM NIVEL_IMPACTO WHERE id_proyecto=".$idProyecto;
        try{
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $maximonivel = $row['maximonivel'];
            }
            $db = null;
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

        $query = "SELECT MAX(nivel) AS maximoprob FROM PROBABILIDAD_RIESGO WHERE id_proyecto=".$idProyecto;
        try{
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $maximoprob = $row['maximoprob'];
            }
            $db = null;
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

        $maximorango = $maximonivel * $maximoprob;

        echo json_encode(array("puntajeMin" => $minimorango, "puntajeMax" => $maximorango));
    }

?>