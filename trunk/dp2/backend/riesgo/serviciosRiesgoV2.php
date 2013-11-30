<?php
	include('routesRiesgoV2.php');
    include('clasesRiesgo.php');
    
    //--------------------------------------TIPO IMPACTO--------------------------------------

    function R_getListaTipoImpactoRiesgo($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_100, $proy->idUsuario, $proy->idProyecto)) {
            $query = "SELECT * FROM TIPO_IMPACTO WHERE id_proyecto=:idProyecto";
            try{
    			$arregloListaTipoImpacto= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $data= array("idTipo" => $row['id_tipo_impacto'], "tipoRi" => $row['descripcion'],"formas" => $row['tipo']);
                    array_push($arregloListaTipoImpacto,$data);
                }
                $db = null;
                echo json_encode($arregloListaTipoImpacto);
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    function R_postRegistrarTipoImpactoRiesgo(){
        
        $request = \Slim\Slim::getInstance()->request();
        $listaTipoImpacto = json_decode($request->getBody());
        if (R_verificaPermisoServicio(R_SERVICIO_101, $listaTipoImpacto->idUsuario, $listaTipoImpacto->idProyecto)) {
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
                } catch(PDOException $e) {
                    echo json_encode(array("me"=> $e->getMessage()));
                }
            }
            echo json_encode("Se registro con exito");
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }


    function R_deleteTipoImpactoRiesgo($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_102, $proy->idUsuario, $proy->idProyecto)) {
            $sql = "DELETE FROM TIPO_IMPACTO WHERE id_tipo_impacto=:idImpacto";
            try {
                $db = getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("idImpacto", $proy->$idImpacto);
                $stmt->execute();
                $db = null;
                echo 'Riesgo eliminado con exito';
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    //--------------------------------------ACUERDOS Y MODIFICACIONES--------------------------------------

    function R_getListaAcuerdos($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_103, $proy->idUsuario, $proy->idProyecto)) {
            $query = "SELECT * FROM ACUERDOS WHERE estado = 1 AND id_proyecto=:idProyecto";
            try{
                $arregloListaTipoImpacto= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $data= array("idAcuerdo" => $row['id_acuerdos'],"fecha" => $row['fecha'], "hora" => $row['hora'],"acuerdo" => $row['acuerdos']);
                    array_push($arregloListaTipoImpacto,$data);
                }
                $db = null;
                echo json_encode($arregloListaTipoImpacto);
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    function R_postRegistrarAcuerdos(){
        
        $request = \Slim\Slim::getInstance()->request();
        $listaAcuerdos = json_decode($request->getBody());
        if (R_verificaPermisoServicio(R_SERVICIO_104, $listaAcuerdos->idUsuario, $listaAcuerdos->idProyecto)) {
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
                } catch(PDOException $e) {
                    echo json_encode(array("me"=> $e->getMessage()));
                }
            }
            echo json_encode("{Se registro con exito}");
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    //--------------------------------------HEADER IMPACTO--------------------------------------

    function R_postRegistrarHeaderImpacto(){
        $request = \Slim\Slim::getInstance()->request();
        $impacto = json_decode($request->getBody());
        $listaAcuerdos = json_decode($request->getBody());
        if (R_verificaPermisoServicio(R_SERVICIO_105, $listaAcuerdos->idUsuario, $listaAcuerdos->idProyecto)) {
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
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    function R_deleteHeaderImpacto($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_106, $proy->idUsuario, $proy->idProyecto)) {
            $sql = "DELETE FROM NIVEL_IMPACTO WHERE id_Proyecto=:idProyecto";
            try {
                $db = getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                $db = null;
                echo '{Header impacto eliminado con exito}';
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

   //--------------------------------------CREAR MATRIZ--------------------------------------

    function R_getGenerarMatrizPositivo($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_107, $proy->idUsuario, $proy->idProyecto)) {
            //Nivel Impacto
            $query = "SELECT nivel, descripcion FROM NIVEL_IMPACTO WHERE id_proyecto=:idProyecto ORDER BY 1 ASC";
            try{
                $arregloNivel= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $data= array("nivel" => $row['nivel'], "descripcion" => $row['descripcion']);
                    array_push($arregloNivel,$data);
                }
                $db = null;
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
            //Probabilidad Riesgo
            $query = "SELECT nivel, descripcion FROM PROBABILIDAD_RIESGO WHERE id_proyecto=:idProyecto ORDER BY 1 ASC";
            try{
                $arregloProbabilidad= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $data= array("nivel" => $row['nivel'], "descripcion" => $row['descripcion']);
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
                $data = array("valorProb" => ($valorProb['nivel']), "descProb" => ($valorProb['descripcion']));
                array_push($arregloLinea,$data);
                foreach($arregloNivel as $valorNivel){
                    $query = "SELECT a.id_riesgo_x_proyecto FROM RIESGO_X_PROYECTO a
                        INNER JOIN PROBABILIDAD_RIESGO b ON b.id_proyecto = a.id_proyecto
                        INNER JOIN NIVEL_IMPACTO c ON c.id_proyecto = a.id_proyecto
                        WHERE b.id_probabilidad_riesgo = a.id_probabilidad_riesgo
                        AND c.id_nivel_impacto = a.id_nivel_impacto
                        AND a.id_proyecto = :idProyecto AND b.nivel = :probabilidad AND c.nivel = :impacto
                        AND a.positivo_negativo = 1;
                        ORDER BY 1 ASC";
                    try{
                        $arregloRiesgos = "";
                        $db=getConnection();
                        $stmt = $db->prepare($query);
                        $stmt->bindParam("idProyecto", $proy->idProyecto);
                        $stmt->bindParam("probabilidad", $valorProb['nivel']);
                        $stmt->bindParam("impacto", $valorNivel['nivel']);
                        $stmt->execute();
                        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                            $data= strval($row['id_riesgo_x_proyecto']);
                            if ($arregloRiesgos == ""){
                                $arregloRiesgos = $data;
                            }
                            else{
                                $arregloRiesgos = $arregloRiesgos.", ".$data;
                            }
                        }
                        $db = null;
                    } catch(PDOException $e){
                        echo '{"error":{"text":'. $e->getMessage() .'}}';
                    }
                    $valorMult = $valorNivel['nivel']*$valorProb['nivel'];
                    $data = array("valorImpacto" => $valorNivel['nivel'], "descImpacto" => $valorNivel['descripcion'], "arrayRiesgos" => $arregloRiesgos, "valorMult" => $valorMult);
                    array_push($arregloLinea,$data);
                }
                array_push($arregloMatriz, $arregloLinea);
            }
            echo json_encode($arregloMatriz);
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    function R_getGenerarMatrizNegativo($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_108, $proy->idUsuario, $proy->idProyecto)) {
            //Nivel Impacto
            $query = "SELECT nivel, descripcion FROM NIVEL_IMPACTO WHERE id_proyecto=:idProyecto ORDER BY 1 ASC";
            try{
                $arregloNivel= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $data= array("nivel" => $row['nivel'], "descripcion" => $row['descripcion']);
                    array_push($arregloNivel,$data);
                }
                $db = null;
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
            //Probabilidad Riesgo
            $query = "SELECT nivel, descripcion FROM PROBABILIDAD_RIESGO WHERE id_proyecto=:idProyecto ORDER BY 1 ASC";
            try{
                $arregloProbabilidad= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $data= array("nivel" => $row['nivel'], "descripcion" => $row['descripcion']);
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
                $data = array("valorProb" => ($valorProb['nivel']), "descProb" => ($valorProb['descripcion']));
                array_push($arregloLinea,$data);
                foreach($arregloNivel as $valorNivel){
                    $query = "SELECT a.id_riesgo_x_proyecto FROM RIESGO_X_PROYECTO a
                        INNER JOIN PROBABILIDAD_RIESGO b ON b.id_proyecto = a.id_proyecto
                        INNER JOIN NIVEL_IMPACTO c ON c.id_proyecto = a.id_proyecto
                        WHERE b.id_probabilidad_riesgo = a.id_probabilidad_riesgo
                        AND c.id_nivel_impacto = a.id_nivel_impacto
                        AND a.id_proyecto = :idProyecto AND b.nivel = :probabilidad AND c.nivel = :impacto
                        AND a.positivo_negativo = 0;
                        ORDER BY 1 ASC";
                    try{
                        $arregloRiesgos = "";
                        $db=getConnection();
                        $stmt = $db->prepare($query);
                        $stmt->bindParam("idProyecto", $proy->idProyecto);
                        $stmt->bindParam("probabilidad", $valorProb['nivel']);
                        $stmt->bindParam("impacto", $valorNivel['nivel']);
                        $stmt->execute();
                        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                            $data= strval($row['id_riesgo_x_proyecto']);
                            if ($arregloRiesgos == ""){
                                $arregloRiesgos = $data;
                            }
                            else{
                                $arregloRiesgos = $arregloRiesgos.", ".$data;
                            }
                        }
                        $db = null;
                    } catch(PDOException $e){
                        echo '{"error":{"text":'. $e->getMessage() .'}}';
                    }
                    $valorMult = $valorNivel['nivel']*$valorProb['nivel'];
                    $data = array("valorImpacto" => $valorNivel['nivel'], "descImpacto" => $valorNivel['descripcion'], "arrayRiesgos" => $arregloRiesgos, "valorMult" => $valorMult);
                    array_push($arregloLinea,$data);
                }
                array_push($arregloMatriz, $arregloLinea);
            } 
            echo json_encode($arregloMatriz);
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    //--------------------------------------ESTRATEGIAS--------------------------------------


    function R_getEstrategiasPositivo($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_109, $proy->idUsuario, $proy->idProyecto)) {
            $query = "SELECT * FROM CATEGORIZACION_ESTRATEGIAS WHERE tipo = 1 AND id_proyecto=:idProyecto";
            try{
                $arregloListaEstrategias= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
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
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    function R_getEstrategiasNegativo($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_110, $proy->idUsuario, $proy->idProyecto)) {
            $query = "SELECT * FROM CATEGORIZACION_ESTRATEGIAS WHERE tipo = 2 AND id_proyecto=:idProyecto";
            try{
                $arregloListaEstrategias= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $idProyecto);
                $stmt->execute();
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
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    function R_postRegistrarEstrategias(){
        $request = \Slim\Slim::getInstance()->request();
        $listaEstrategia = json_decode($request->getBody());
        if (R_verificaPermisoServicio(R_SERVICIO_111, $listaEstrategia->idUsuario, $listaEstrategia->idProyecto)) {
            if ($listaEstrategia->tipo == 1){
                R_deleteEstrategiasPositivo($listaEstrategia->idProyecto);
            } else{
                R_deleteEstrategiasNegativo($listaEstrategia->idProyecto);
            }
            foreach ($listaEstrategia->listaEstrategias as $estrategia){
                $query = "INSERT INTO CATEGORIZACION_ESTRATEGIAS (id_proyecto,tipo,puntaje_limite_bajo,puntaje_limite_alto, prioridad, estrategia, significado) 
                            VALUES (:id_proyecto,:tipo,:puntaje_limite_bajo, :puntaje_limite_alto, :prioridad, :estrategia, :significado)";
                try {
                    $db = getConnection();
                    $stmt = $db->prepare($query);
                    $stmt->bindParam("id_proyecto", $listaEstrategia->idProyecto);
                    $stmt->bindParam("tipo", $listaEstrategia->tipo);
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
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    function R_deleteEstrategiasPositivo($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_112, $proy->idUsuario, $proy->idProyecto)) {
            $sql = "DELETE FROM CATEGORIZACION_ESTRATEGIAS WHERE tipo = 1 AND id_Proyecto=:idProyecto";
            try {
                $db = getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                $db = null;
                echo '{Categorizacion de estrategias eliminados con exito}';
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    function R_deleteEstrategiasNegativo($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_113, $proy->idUsuario, $proy->idProyecto)) {
            $sql = "DELETE FROM CATEGORIZACION_ESTRATEGIAS WHERE tipo = 2 AND id_Proyecto=:idProyecto";
            try {
                $db = getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                $db = null;
                echo '{Categorizacion de estrategias eliminados con exito}';
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    //--------------------------------------PUNTAJE MINIMO Y MAXIMO--------------------------------------

    function R_getPuntajes($json){
        $proy = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_114, $proy->idUsuario, $proy->idProyecto)) {
            //Minimo
            $query = "SELECT MIN(nivel) AS minimonivel FROM NIVEL_IMPACTO WHERE id_proyecto=:idProyecto";
            try{
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $minimonivel = $row['minimonivel'];
                }
                $db = null;
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }

            $query = "SELECT MIN(nivel) AS minimoprob FROM PROBABILIDAD_RIESGO WHERE id_proyecto=:idProyecto";
            try{
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $minimoprob =  $row['minimoprob'];
                }
                $db = null;
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }

            $minimorango = $minimonivel * $minimoprob;

            //Maximo
            $query = "SELECT MAX(nivel) AS maximonivel FROM NIVEL_IMPACTO WHERE id_proyecto=:idProyecto";
            try{
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $maximonivel = $row['maximonivel'];
                }
                $db = null;
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }

            $query = "SELECT MAX(nivel) AS maximoprob FROM PROBABILIDAD_RIESGO WHERE id_proyecto=:idProyecto";
            try{
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $proy->idProyecto);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $maximoprob = $row['maximoprob'];
                }
                $db = null;
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }

            $maximorango = $maximonivel * $maximoprob;

            echo json_encode(array("puntajeMin" => $minimorango, "puntajeMax" => $maximorango));

        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    //--------------------------------------COSTO REAL--------------------------------------

    function R_getCostoReal($json){
        $var = json_decode($json);
        if (R_verificaPermisoServicio(R_SERVICIO_115, $var->idUsuario, $var->idProyecto)) {
            $query = "SELECT A.ID_PROYECTO, B.ID_ACTIVIDAD, B.NOMBRE_ACTIVIDAD, IFNULL(Y.DESCRIPCION,'') ASIENTO_CONTABLE,
                        SUM(C.CANTIDADREAL*(C.COSTO_UNITARIO_REAL*X.CAMBIO_A_SOL)) COSTO_ACTIVIDAD_SOLES
                            FROM 
                        PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
                        JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
                        JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
                        JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
                        LEFT JOIN ASIENTO_CONTABLE Y ON B.ID_ASIENTO_CONTABLE=Y.ID_ASIENTO_CONTABLE
                        WHERE
                        DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
                        AND
                        A.ID_PROYECTO=:idProyecto AND B.ID_ACTIVIDAD=:idActividad
                        AND D.ESTADO<>'ELIMINADO' AND C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1
                        GROUP BY A.ID_PROYECTO, B.ID_ACTIVIDAD, B.NOMBRE_ACTIVIDAD, IFNULL(Y.DESCRIPCION,'')";
            try{
                $arregloCostoReal= array();
                $db=getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("idProyecto", $var->idProyecto);
                $stmt->bindParam("idActividad", $var->idActividad);
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $data= array("idProyecto" => $row['ID_PROYECTO'], "idActividad" => $row['ID_ACTIVIDAD'],"nombreActividad" => $row['NOMBRE_ACTIVIDAD'],"asientoContable" => $row['ASIENTO_CONTABLE'],"costoActividadSoles" => $row['COSTO_ACTIVIDAD_SOLES']);
                    array_push($arregloCostoReal,$data);
                }
                $db = null;
                echo json_encode($arregloCostoReal);
            } catch(PDOException $e){
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo json_encode(R_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
        }
    }

    //--------------------------------------COSTO PROMEDIO--------------------------------------
    /*
    function R_postCostoContingencia(){
        $request = \Slim\Slim::getInstance()->request();
        $var = json_decode($request->getBody()); 
        $query = "INSERT INTO PROYECTO (porcentaje_contingencia) VALUES 
                (SELECT SUM(a.demora_potencial)*b.porcentaje_contingencia contingencia 
                FROM A.RIESGO_X_PROYECTO, B.PAQUETE_TRABAJO
                WHERE a.id_paquete_trabajo = b.id_paquete_trabajo AND a.id_proyecto = b.id_proyecto 
                AND a.id_proyecto=:id_proyecto AND b.id_paquete_trabajo=:id_paquete_trabajo
                AND positivo_negativo=0)";
        try {
            $db=getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $var->idProyecto);
            $stmt->bindParam("id_paquete_trabajo", $var->idPaqueteTrabajo);
            $stmt->execute();
            $db = null;
            return json_encode('{Se registro correctamente}');
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        } 
    }
    */
?>