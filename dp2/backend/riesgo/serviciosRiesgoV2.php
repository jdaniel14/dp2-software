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
            } catch(PDOException $e) {
                echo json_encode(array("me"=> $e->getMessage()));
            }
        }
        echo json_encode("{Se registro con exito}");
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
            } catch(PDOException $e) {
                echo json_encode(array("me"=> $e->getMessage()));
            }
        }
        echo json_encode("{Se registro con exito}");
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

    function R_getGenerarMatrizPositivo($idProyecto){
        //Nivel Impacto
        $query = "SELECT nivel, descripcion FROM NIVEL_IMPACTO WHERE id_proyecto=".$idProyecto." ORDER BY 1 ASC";
        try{
            $arregloNivel= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data= array("nivel" => $row['nivel'], "descripcion" => $row['descripcion']);
                array_push($arregloNivel,$data);
            }
            $db = null;
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
        //Probabilidad Riesgo
        $query = "SELECT nivel, descripcion FROM PROBABILIDAD_RIESGO WHERE id_proyecto=".$idProyecto." ORDER BY 1 ASC";
        try{
            $arregloProbabilidad= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
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
                    $stmt->bindParam("idProyecto", $idProyecto);
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
    }

    function R_getGenerarMatrizNegativo($idProyecto){
        //Nivel Impacto
        $query = "SELECT nivel, descripcion FROM NIVEL_IMPACTO WHERE id_proyecto=".$idProyecto." ORDER BY 1 ASC";
        try{
            $arregloNivel= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data= array("nivel" => $row['nivel'], "descripcion" => $row['descripcion']);
                array_push($arregloNivel,$data);
            }
            $db = null;
        } catch(PDOException $e){
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
        //Probabilidad Riesgo
        $query = "SELECT nivel, descripcion FROM PROBABILIDAD_RIESGO WHERE id_proyecto=".$idProyecto." ORDER BY 1 ASC";
        try{
            $arregloProbabilidad= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
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
                    $stmt->bindParam("idProyecto", $idProyecto);
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
    }

    //--------------------------------------ESTRATEGIAS--------------------------------------


    function R_getEstrategiasPositivo($idProyecto){
        $query = "SELECT * FROM CATEGORIZACION_ESTRATEGIAS WHERE tipo = 1 AND id_proyecto=".$idProyecto;
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

    function R_getEstrategiasNegativo($idProyecto){
        $query = "SELECT * FROM CATEGORIZACION_ESTRATEGIAS WHERE tipo = 2 AND id_proyecto=".$idProyecto;
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

    function R_postRegistrarEstrategias(){
        $request = \Slim\Slim::getInstance()->request();
        $listaEstrategia = json_decode($request->getBody());
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
    }

    function R_deleteEstrategiasPositivo($idProyecto){

        $sql = "DELETE FROM CATEGORIZACION_ESTRATEGIAS WHERE tipo = 1 AND id_Proyecto=:idProyecto";
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

    function R_deleteEstrategiasNegativo($idProyecto){

        $sql = "DELETE FROM CATEGORIZACION_ESTRATEGIAS WHERE tipo = 2 AND id_Proyecto=:idProyecto";
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

    //--------------------------------------COSTO REAL--------------------------------------

    function R_getCostoReal($idProyecto, $idActividad){
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
            $stmt->bindParam("idProyecto", $idProyecto);
            $stmt->bindParam("idActividad", $idActividad);
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
    }

?>