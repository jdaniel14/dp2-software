<?php

	include('routesRiesgo.php');
    //Henry
    function R_prueba(){
        /*
        $idProyectoDecode = json_decode($idProyecto);
        $arregloListaObjetosAfectados= array(
            array('id' => '1','descripcion' => 'costo'),
            array('id' => '2','descripcion' => 'tiempo')            
        );
        echo json_encode($arregloListaObjetosAfectados);
        */
        echo "Probando :D";
	}
	
    function R_pruebaR($json){
        $request = json_decode($json);
        $id1= $request->parametro1;
        $id2= $request->parametro2;
        echo $id1;
        echo $id2;
        echo "Probando :D";
    }

    //--------------------------------------RIESGO--------------------------------------
    function R_postRegistrarRiesgo(){
        $request = \Slim\Slim::getInstance()->request();
        $riesgo = json_decode($request->getBody());
        $query = "INSERT INTO RIESGO_X_PROYECTO (id_proyecto,nombre_riesgo,id_paquete_trabajo,id_tipo_impacto,id_nivel_impacto,probabilidad,impacto,severidad,id_probabilidad_riesgo,costo_potencial,demora_potencial,estado,estado_logico,id_empleado) 
                VALUES (:id_proyecto,:nombre_riesgo,:id_paquete_trabajo,:id_tipo_impacto,:id_nivel_impacto,:probabilidad,:impacto,:severidad,:id_probabilidad_riesgo,:costo_potencial,:demora_potencial,1,1,:id_empleado)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
           
            $stmt->bindParam("id_proyecto", $riesgo->idProyecto);
            $stmt->bindParam("nombre_riesgo", $riesgo->nombre);
            $stmt->bindParam("id_paquete_trabajo", $riesgo->idPaqueteTrabajo);
            $stmt->bindParam("id_tipo_impacto", $riesgo->idTipoImpacto);
            $stmt->bindParam("id_nivel_impacto", $riesgo->idNivelImpacto);
            $stmt->bindParam("probabilidad", $riesgo->probabilidad);
            $stmt->bindParam("impacto", $riesgo->impacto);
            $stmt->bindParam("severidad", $riesgo->impacto);
            $stmt->bindParam("id_probabilidad_riesgo", $riesgo->idProbabilidad);
            $stmt->bindParam("costo_potencial", $riesgo->costoPotencial);
            $stmt->bindParam("demora_potencial", $riesgo->demoraPotencial);
            $stmt->bindParam("id_empleado", $riesgo->idEmpleado);

            //$stmt->bindParam("id_nivel_impacto", $riesgo->idNivelImpacto);
            
            
            //$severidad=$riesgo->probabilidad*$riesgo->impacto;
            //$stmt->bindParam("severidad", $severidad);
            
            
            $stmt->execute();
            $riesgo->id_riesgo_x_proyecto = $db->lastInsertId();
            $db = null;

            echo json_encode(array("idRiesgo"=>$riesgo->id_riesgo_x_proyecto,"nombre"=>$riesgo->nombre));
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }

    }


   function R_updateRiesgo($idRiesgoXProyecto){
        
        $request = \Slim\Slim::getInstance()->request();
        $riesgo = json_decode($request->getBody());
        $query = "UPDATE RIESGO_X_PROYECTO SET nombre_riesgo=:nombre_riesgo,id_paquete_trabajo=:id_paquete_trabajo, 
        id_categoria_riesgo=:id_categoria_riesgo, impacto=:impacto,probabilidad=:probabilidad, severidad=:severidad,
        costo_potencial=:costo_potencial , demora_potencial=:demora_potencial , disparador=:disparador
        WHERE id_riesgo_x_proyecto=:id_riesgo_x_proyecto";

        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("nombre_riesgo", $riesgo->nombreRiesgo);
            $stmt->bindParam("id_paquete_trabajo", $riesgo->idPaqueteTrabajo);
            $stmt->bindParam("id_categoria_riesgo", $riesgo->idCategoriaRiesgo);
            $stmt->bindParam("impacto", $riesgo->impacto);
            $stmt->bindParam("probabilidad", $riesgo->probabilidad);
            //$severidad=$riesgo->probabilidad*$riesgo->impacto;
            //$stmt->bindParam("severidad", $severidad);
            $stmt->bindParam("costo_potencial", $riesgo->costoPotencial);
            $stmt->bindParam("demora_potencial", $riesgo->demoraPotencial);
            $stmt->bindParam("id_riesgo_x_proyecto", $idRiesgoXProyecto);
            $stmt->bindParam("disparador", $riesgo->nombreResponsable);
            $stmt->execute();
            $db = null;
            echo json_encode($idRiesgoXProyecto);
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }

    }       

    function R_getListaRiesgo($var){
        $riesgo = json_decode($var);

        $query = "SELECT id_riesgo_x_proyecto,nombre_riesgo, PT.nombre nombre_paquete_trabajo, TI.descripcion impacto_descripcion, impacto, NI.descripcion nivel_impacto_descripcion, probabilidad, PR.descripcion probabilidad_descripcion, severidad, acciones_especificas, costo_potencial,demora_potencial, nombre_corto
                FROM RIESGO_X_PROYECTO RXP
                left join PAQUETE_TRABAJO as PT on RXP.id_paquete_trabajo=PT.id_paquete_trabajo
                left join PROBABILIDAD_RIESGO as PR on RXP.id_probabilidad_riesgo=PR.id_probabilidad_riesgo
                left join NIVEL_IMPACTO as NI on RXP.id_nivel_impacto=NI.id_nivel_impacto
                left join TIPO_IMPACTO as TI on RXP.id_tipo_impacto=TI.id_tipo_impacto
                left join EMPLEADO as E on RXP.id_empleado=E.id_empleado
                where 
                RXP.id_proyecto=".$riesgo->idProyecto." and RXP.nombre_riesgo LIKE '%".$riesgo->nombre."%'";
        try {
            $arregloListaRiesgo= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idRiesgoProyecto" => $row['id_riesgo_x_proyecto'], 
                            "nombre" => $row['nombre_riesgo'],
                            "paqueteTrabajo" => $row['nombre_paquete_trabajo'],//PT
                            "impactoDescripcion" => $row['impacto_descripcion'],//TI
                            "impacto" => $row['impacto'],
                            "nivelImpactoDescripcion" => $row['nivel_impacto_descripcion'],
                            "probabilidad" => $row['probabilidad'],
                            "probabilidadDescripcion" => $row['probabilidad_descripcion'],
                            "severidad" => $row['severidad'],
                            //"estrategia" => $row[nombre,//X
                            "accionesEspecificas" => $row['acciones_especificas'],//X
                            "costoPotencial" => $row['costo_potencial'],//RXP
                            "demoraPotencial" => $row['demora_potencial'],//RXP
                            "nombreResponsable" => $row['nombre_corto']//X
                            );
                array_push($arregloListaRiesgo,$data);
            }
            $db = null;
            echo json_encode($arregloListaRiesgo);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_getRiesgo($idRiesgoXProyecto){
        

        $query = "SELECT id_riesgo_x_proyecto,nombre_riesgo, version, TI.descripcion impacto_descripcion, impacto, NI.descripcion nivel_impacto_descripcion, probabilidad, PR.descripcion probabilidad_descripcion, acciones_especificas, costo_potencial,demora_potencial, nombre_corto
                FROM RIESGO_X_PROYECTO RXP
                left join EDT on RXP.id_proyecto=EDT.id_proyecto
                left join TIPO_IMPACTO TI on RXP.id_tipo_impacto=TI.id_tipo_impacto
                ,NIVEL_IMPACTO NI, PROBABILIDAD_RIESGO PR, EMPLEADO E
                where 
                RXP.id_riesgo_x_proyecto=".$idRiesgoXProyecto." and RXP.id_nivel_impacto=NI.id_nivel_impacto and RXP.id_probabilidad_riesgo=PR.id_probabilidad_riesgo and
                RXP.id_empleado=E.id_empleado";

        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->execute();
            $row = $stmt->fetchObject();
            $data = array("idRiesgoProyecto" => $row->id_riesgo_x_proyecto, 
                            "nombre" => $row->nombre_riesgo,
                            "paqueteTrabajo" => $row->version,//PT
                            "impactoDescripcion" => $row->impacto_descripcion,//TI
                            "impacto" => $row->impacto,
                            "nivelImpactoDescripcion" => $row->nivel_impacto_descripcion,
                            "probabilidad" => $row->probabilidad,
                            "probabilidadDescripcion" => $row->probabilidad_descripcion,
                            //"severidad" => $row->severidad"],
                            //"estrategia" => $row->nombre,//X
                            "accionesEspecificas" => $row->acciones_especificas,//X
                            "costoPotencial" => $row->costo_potencial,//RXP
                            "demoraPotencial" => $row->demora_potencial,//RXP
                            "nombreResponsable" => $row->nombre_corto//X
                            );
            $db = null;
            //echo json_encode($data);
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }

    }    

    function R_getListaPaquetesEDT($idProyecto){
        $query = "SELECT * FROM PAQUETE_TRABAJO,EDT WHERE PAQUETE_TRABAJO.id_edt=EDT.id_edt and EDT.id_proyecto=".$idProyecto;
        try {
            $arregloListaPaquetesEDT= array();
            $db=getConnection();
            $stmt = $db->query($query);
            $stmt->bindParam("idProyecto", $idProyecto);
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("id" => $row['id_paquete_trabajo'], "descripcion" => $row['nombre']);
                array_push($arregloListaPaquetesEDT,$data);
            }
            $db = null;
            echo json_encode($arregloListaPaquetesEDT);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_getListaCategoriaRiesgo(){
        $query = "SELECT * FROM CATEGORIA_RIESGO";
        try {
            $arregloListaCategoriaRiesgo= array();
            $db=getConnection();
            $stmt = $db->query($query);
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("id" => $row['id_categoria_riesgo'], "descripcion" => $row['descripcion']);
                array_push($arregloListaCategoriaRiesgo,$data);
            }
            $db = null;
            echo json_encode($arregloListaCategoriaRiesgo);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_getListaNivelesImpacto($idProyecto){
        /*$query*/$sql = "SELECT * FROM CONFIGURACION_RIESGO WHERE id_proyecto=".$idProyecto;
        $arregloListaNivelesImpacto = array();
        try {
            /*
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $row = $stmt->fetchObject();
            
            $data = array("muyBajo" => $row->muy_bajo,
                        "bajo" => $row->bajo,
                        "medio" => $row->medio,
                        "alto" => $row->alto,
                        "muyAlto" => $row->muy_alto);
            $db = null;
            echo json_encode($data);*/
            $db=getConnection();
            $stmt = $db->query($sql);
            $stmt->bindParam("idProyecto", $idProyecto);
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("muyBajo" => $row['muy_bajo'],
                        "bajo" => $row['bajo'],
                        "medio" => $row['medio'],
                        "alto" => $row['alto'],
                        "muyAlto" => $row['muy_alto']);
                array_push($arregloListaNivelesImpacto,$data);
            }
            $db = null;
            echo json_encode($arregloListaNivelesImpacto);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
        
    }

    function R_getListaEquipoRiesgo($idProyecto){//FALTA MODIFICAR
        $query = "SELECT * FROM EDT WHERE id_proyecto=".$idProyecto;
        try {
            $arregloListaEquipoRiesgo= array();
            $db=getConnection();
            $stmt = $db->query($sql);
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("id" => $row['idEquipo'], "nombre" => $row['nombre']);
                array_push($arregloListaEquipoRiesgo,$data);
            }
            $db = null;
            echo json_encode($arregloListaEquipoRiesgo);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_getEstadoLogicoRiesgo($idRiesgo){
        $query = "SELECT * FROM RIESGO_X_PROYECTO WHERE id_riesgo_x_proyecto=:id_riesgo_x_proyecto";
        try {
            $db=getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_riesgo_x_proyecto", $idRiesgo);
            $stmt->execute();
            $row = $stmt->fetchObject();
            $data=array("id" => $row->id_riesgo_x_proyecto, "estado" => $row->estado_logico);
            $db = null;
            echo json_encode($data);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_setEstadoLogicoRiesgo($idRiesgo){

        $query = "UPDATE RIESGO_X_PROYECTO SET estado = 0 WHERE id_riesgo_x_actividad=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $query);
            $stmt->execute();
            $db = null;
            echo '{Set}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }

    //function R_getNivelImpactoTipoImpacto1($var){
    function R_getNivelImpactoTipoImpacto1($json){	
        $impacto = json_decode($json);    
        $query = "SELECT NI.id_nivel_impacto, NI.descripcion , nivel
        FROM NIVEL_IMPACTO NI,TIPO_IMPACTO_X_NIVEL_IMPACTO TIXNI
        WHERE NI.id_proyecto=TIXNI.id_proyecto and NI.id_nivel_impacto=TIXNI.id_nivel_impacto AND 
        TIXNI.id_proyecto=:id_proyecto and TIXNI.id_tipo_impacto=:id_tipo_impacto and limite_menor<=:valor and :valor<=limite_mayor;";
        try {
            $db=getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $impacto->idProyecto);
            $stmt->bindParam("id_tipo_impacto", $impacto->idTipoImpacto);
            $stmt->bindParam("valor", $impacto->valor);
            $stmt->execute();
            $row = $stmt->fetchObject();
            $data=array("idNivelImpacto" => $row->id_nivel_impacto, "nivel" => $row->nivel, "descripcion" => $row->descripcion);
            $db = null;
            echo json_encode($data);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_getNivelImpactoTipoImpacto2($json){
        $impacto = json_decode($json);
        $query = "SELECT NI.id_nivel_impacto, NI.descripcion , nivel
        FROM NIVEL_IMPACTO NI,TIPO_IMPACTO_X_NIVEL_IMPACTO TIXNI
        WHERE NI.id_proyecto=TIXNI.id_proyecto and NI.id_nivel_impacto=TIXNI.id_nivel_impacto AND 
        TIXNI.id_proyecto=:id_proyecto and TIXNI.id_tipo_impacto=:id_tipo_impacto and TIXNI.id_nivel_impacto=:id_nivel_impacto ";
        try {
            $db=getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $impacto->idProyecto);
            $stmt->bindParam("id_tipo_impacto", $impacto->idTipoImpacto);
            $stmt->bindParam("id_nivel_impacto", $impacto->idNivelImpacto);
            $stmt->execute();
            $row = $stmt->fetchObject();
            $data=array("idNivelImpacto" => $row->id_nivel_impacto, "nivel" => $row->nivel, "descripcion" => $row->descripcion);
            $db = null;
            echo json_encode($data);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_getProbabilidadRiesgo($json){
        $impacto = json_decode($json);
        
        $query = "SELECT id_probabilidad_riesgo, descripcion, nivel FROM PROBABILIDAD_RIESGO
                WHERE id_proyecto=:id_proyecto and minimo<=:valor and :valor<=maximo;";

        try {
            $db=getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $impacto->idProyecto);
            $stmt->bindParam("valor", $impacto->valor);
            $stmt->execute();
            $row = $stmt->fetchObject();
            $data=array("idProbabilidadRiesgo" => $row->id_probabilidad_riesgo, "nivel" => $row->nivel, "descripcion" => $row->descripcion);
            $db = null;
            echo json_encode($data);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_getDescripcionNivelImpactoTipoImpacto($json){
		$var = json_decode($json);
        $query = "SELECT * FROM TIPO_IMPACTO_X_NIVEL_IMPACTO 
            WHERE id_proyecto=:id_proyecto AND id_tipo_impacto=:id_tipo_impacto;";
        try {
            $arreglo= array();
            $db=getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $var->idProyecto);
			$stmt->bindParam("id_tipo_impacto", $var->idTipoImpacto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idTipoImpacto" => $row['id_tipo_impacto'], "idNivelImpacto" => $row['id_nivel_impacto'],"descripcion" => $row['descripcion']);
                array_push($arreglo,$data);
            }
            $db = null;
            echo json_encode($arreglo);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

/*
    function R_setRiesgo($id){
        $request = Slim::getInstance()->request();
        $body = $request->getBody();
        $risk = json_decode($body);    
        $query = "UPDATE RIESGO_X_PROYECTO SET nombre = ". $risk->nombre. ", idPaquete = ". $risk->idPaquete . ", idObjeto = ". $risk->idObjeto .", idImpacto = ". $risk->idImpacto .", probabilidad= ". $risk->probabilidad .", acciones= ". $risk->acciones .", costo=". $risk->costo . ", tiempo=". $risk->tiempo . ", equipo=". $risk->idEquipo. " where id_riesgo_x_actividad = ".$id;
        try{
            $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");
            mysqli_query($con,$query) or die(mysqli_error($con));
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }*/


    function R_deleteRiesgo($idRiesgo){

        $sql = "DELETE FROM RIESGO_X_PROYECTO WHERE id_riesgo_x_proyecto=:idRiesgo";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("idRiesgo", $idRiesgo);
            $stmt->execute();
            $db = null;
            echo '{Riesgo eliminado con exito}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }

    //--------------------------------------CONFIGURACION--------------------------------------

    function R_postRegistrarConfiguracionProyecto(){
        
        $request = \Slim\Slim::getInstance()->request();
        $configuracion = json_decode($request->getBody());
        $sql = "REPLACE INTO CONFIGURACION_RIESGO (id_proyecto,muy_bajo,bajo,medio,alto,muy_alto) VALUES (:id_proyecto,:muy_bajo,:bajo,:medio,:alto,:muy_alto)";
        //-- where id_proyecto =".$configuracion->idProyecto;
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id_proyecto", $configuracion->idProyecto);
            $stmt->bindParam("muy_bajo", $configuracion->muyBajo);
            $stmt->bindParam("bajo", $configuracion->bajo);
            $stmt->bindParam("medio", $configuracion->medio);
            $stmt->bindParam("alto", $configuracion->alto);
            $stmt->bindParam("muy_alto", $configuracion->muyAlto);
            $stmt->execute();
            $configuracion->id_configuracion_riesgo = $db->lastInsertId();
            $db = null;
            echo json_encode(array("me"=>"", "id"=>$configuracion->id_configuracion_riesgo));
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }

    }    

    //--------------------------------------RIESGOS COMUNES--------------------------------------

    function R_getListaRiesgoComun(){
        $sql = "SELECT * FROM RIESGO_COMUN";
        $listaRiesgoComun = array();
        try{
            $db = getConnection();
            $stmt = $db->query($sql);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $arregloListaRiesgoComun= array("idRiesgoComun" => $row['id_riesgo_comun'], "nombre" => $row['nombre'],"ultProbabilidad" => $row['ult_probabilidad'],"ultImpacto" => $row['ult_impacto'],"ultSeveridad" => $row['ult_severidad']);
                array_push($listaRiesgoComun,$arregloListaRiesgoComun);
            }
            $arregloListaRiesgoComun = $stmt->fetchAll();
            $db = null;
            echo json_encode($listaRiesgoComun);
        } catch(PDOException $e){
            echo 'ERROR EN R_getListaRiesgoComun: {"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_postAsignarRiesgoComun(){//BY HENRY
        
        $request = \Slim\Slim::getInstance()->request();
        $riesgolista = json_decode($request->getBody());
        
        foreach ($riesgolista->lista as $riesgo){
            
            $consulta = "SELECT * FROM RIESGO_COMUN WHERE id_riesgo_comun =".$riesgo;
            $db = getConnection();
            $stmt = $db->prepare($consulta);
            $stmt->execute();
            $row = $stmt->fetchObject();
            $query = "INSERT INTO RIESGO_X_PROYECTO (id_proyecto,nombre_riesgo,id_riesgo_comun,impacto,probabilidad,severidad,estado,estado_logico) 
                    VALUES (:id_proyecto,:nombre_riesgo,:id_riesgo_comun,:impacto,:probabilidad,:severidad,1,1)";
            try {
                $db = getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("id_proyecto", $riesgolista->idProyecto);
                $stmt->bindParam("nombre_riesgo", $row->nombre);
                $stmt->bindParam("id_riesgo_comun", $row->id_riesgo_comun);
                $stmt->bindParam("impacto", $row->ult_impacto);
                $stmt->bindParam("probabilidad", $row->ult_probabilidad);
                $stmt->bindParam("severidad", $row->ult_severidad);
                $stmt->execute();
                $id = $db->lastInsertId();
                $db = null;
                echo json_encode(array("idRiesgo"=>$id,"nombre"=>$row->nombre));
            } catch(PDOException $e) {
                echo json_encode(array("me"=> $e->getMessage()));
                    //'{"error":{"text":'. $e->getMessage() .'}}';
            }
        }
    }

    //--------------------------------------Header de Probabilidad--------------------------------------
    function R_postRegistrarHeaderProbabilidadRiesgo(){
        $request = \Slim\Slim::getInstance()->request();
        $probabilidad = json_decode($request->getBody());
        $query = "INSERT INTO PROBABILIDAD_RIESGO (id_proyecto,nivel,descripcion,minimo,maximo) 
                VALUES (:id_proyecto,:nivel,:descripcion,:minimo,:maximo)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $probabilidad->idProyecto);
            $stmt->bindParam("nivel", $probabilidad->nivel);
            $stmt->bindParam("descripcion", $probabilidad->descripcion);
            $stmt->bindParam("minimo", $probabilidad->minimo);
            $stmt->bindParam("maximo", $probabilidad->maximo);
            $stmt->execute();
            $probabilidad->id_probabilidad_riesgo = $db->lastInsertId();
            $db = null;

            echo json_encode(array("idProbabilidadRiesgo"=>$probabilidad->id_probabilidad_riesgo,"descripcion"=>$probabilidad->descripcion));
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_getListaHeadersProbabilidadRiesgo($idProyecto){
        
        $query = "SELECT * FROM PROBABILIDAD_RIESGO WHERE id_proyecto=:id_proyecto ORDER BY nivel";
                    
        try {
            $arregloListaHeader= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("nivel" => $row['nivel'], 
                            "descripcion" => $row['descripcion'],
                            "minimo" => $row['minimo'],
                            "maximo" => $row['maximo']
                            );
                array_push($arregloListaHeader,$data);
            }
            $db = null;
            echo json_encode($arregloListaHeader);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }    

    function R_deleteListaHeadersProbabilidadRiesgo($idProyecto){

        $sql = "DELETE FROM PROBABILIDAD_RIESGO WHERE id_proyecto=:id_proyecto";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            $db = null;
            echo '{Riesgo eliminado con exito}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }


    //--------------------------------------TIPO IMPACTO X NIVEL IMPACTO--------------------------------------
    
    function R_postRegistrarTipoImpactoNivelImpacto1(){
        $request = \Slim\Slim::getInstance()->request();
        $lista = json_decode($request->getBody());
		
        $query = "SELECT * FROM NIVEL_IMPACTO WHERE id_proyecto=:id_proyecto ORDER BY nivel";
        $listaIdNivelImpacto= array();           
        $cantidad =0;
        
        try {
            $arregloListaHeaderImpactoRiesgo= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $lista->idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                array_push($listaIdNivelImpacto,$row['id_nivel_impacto']);
                $cantidad++;
                
            }
            $db = null;
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }   

		for ($i=0 ; $i<$cantidad;$i++){
			
			$query = "INSERT INTO TIPO_IMPACTO_X_NIVEL_IMPACTO (id_tipo_impacto,id_nivel_impacto,id_proyecto,limite_menor,limite_mayor)
                VALUES (:id_tipo_impacto,:id_nivel_impacto,:id_proyecto,:limite_menor,:limite_mayor) ";
			try {
				$db = getConnection();
				$stmt = $db->prepare($query);
				$stmt->bindParam("id_tipo_impacto", $lista->idTipoImpacto);
				$stmt->bindParam("id_nivel_impacto", $listaIdNivelImpacto[$i]);
				$stmt->bindParam("id_proyecto", $lista->idProyecto);
				$stmt->bindParam("limite_menor", $lista->valor[$i]->min);
				$stmt->bindParam("limite_mayor", $lista->valor[$i]->max);
				// $stmt->bindParam("descripcion", $impactoNivelImpacto->descripcion);
				$stmt->execute();
				$db = null;
				
			} catch(PDOException $e) {
				echo json_encode(array("me"=> $e->getMessage()));
			}
		}
		echo json_encode(array("Se registro con exito"));

    }

    function R_postRegistrarTipoImpactoNivelImpacto2(){
        $request = \Slim\Slim::getInstance()->request();
        $lista = json_decode($request->getBody());
        
        $query = "SELECT * FROM NIVEL_IMPACTO WHERE id_proyecto=:id_proyecto ORDER BY nivel";
        $listaIdNivelImpacto= array();           
        $cantidad =0;
        
        try {
            $arregloListaHeaderImpactoRiesgo= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $lista->idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                array_push($listaIdNivelImpacto,$row['id_nivel_impacto']);
                $cantidad++;
                
            }
            $db = null;
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }   

        for ($i=0 ; $i<$cantidad;$i++){
            
            $query = "INSERT INTO TIPO_IMPACTO_X_NIVEL_IMPACTO (id_tipo_impacto,id_nivel_impacto,id_proyecto,descripcion)
                VALUES (:id_tipo_impacto,:id_nivel_impacto,:id_proyecto,:descripcion) ";
            try {
                $db = getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("id_tipo_impacto", $lista->idTipoImpacto);
                $stmt->bindParam("id_nivel_impacto", $listaIdNivelImpacto[$i]);
                $stmt->bindParam("id_proyecto", $lista->idProyecto);
                // $stmt->bindParam("descripcion", $impactoNivelImpacto->descripcion);
                $stmt->bindParam("descripcion", $lista->valor[$i]->descripcion);
                $stmt->execute();
                $db = null;
                
            } catch(PDOException $e) {
                echo json_encode(array("me"=> $e->getMessage()));
            }
        }
        echo json_encode(array("Se registro con exito"));

    }

    function R_getListaTipoImpactoXNivelImpacto($idProyecto){
        
        $query = "SELECT TIXNI.id_tipo_impacto id_tipo_impacto,
                        TI.descripcion tiDescripcion,
                        TIXNI.id_nivel_impacto id_nivel_impacto,
                        NI.descripcion Nidescripcion,
                        NI.tipo,limite_menor,limite_mayor,
                        TIXNI.descripcion tixniDescripcion,
        				NI.nivel nivel,
                        TI.tipo tipoVerdadero
                FROM TIPO_IMPACTO_X_NIVEL_IMPACTO TIXNI, TIPO_IMPACTO TI, NIVEL_IMPACTO NI 
                where TIXNI.id_tipo_impacto=TI.id_tipo_impacto and TIXNI.id_nivel_impacto=NI.id_nivel_impacto and TIXNI.id_proyecto=:id_proyecto
                order by id_tipo_impacto,nivel;";
                    
        try {
            $fullQuery= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idTipoImpacto" => $row['id_tipo_impacto'], 
                            "descripcionTipoImpacto" => $row['tiDescripcion'],
                            "tipoImpacto" => $row['tipoVerdadero'],
                            "min" => $row['limite_menor'],
                            "max" => $row['limite_mayor'],
                            "descripcion" => $row['tixniDescripcion'],
                            );
                array_push($fullQuery,$data);
            }
            $db = null;

            $query = "SELECT COUNT(*) TOTAL FROM NIVEL_IMPACTO WHERE id_proyecto=:id_proyecto";
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            $row = $stmt->fetchObject();
            $cantidadColumnas = $row->TOTAL;
            $db = null;

            $auxCantidadColumnas=0;

            $devuelve=array();
            $var=array();
            $lista=array();
            foreach($fullQuery as $fila){

                $auxCantidadColumnas++;
                
                if($auxCantidadColumnas==1){
                    $var = array("idTipoImpacto" => $fila['idTipoImpacto'], 
                            "descripcionTipoImpacto" => $fila['descripcionTipoImpacto'],
                            "tipoImpacto" => $fila['tipoImpacto'],
                            "lista" => ""
                        );
                } 
                 $data=array("min" => $fila['min'], 
                            "max" => $fila['max'],
                            "descripcion" => $fila['descripcion']
                            );
                 array_push($lista,$data);

                if($auxCantidadColumnas==$cantidadColumnas) {
                    $auxCantidadColumnas=0;
                    $var['lista']=$lista;
                    array_push($devuelve,$var);
                    $var=array();
                    $lista=array();

                }

   
            }
            echo json_encode($devuelve);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }


    function R_getListaTipoImpacto($idProyecto){
        
        $query = "SELECT * FROM TIPO_IMPACTO WHERE id_proyecto=:id_proyecto ORDER BY descripcion";
                    
        try {
            $arregloListaTipoImpacto= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idTipoImpacto" => $row['id_tipo_impacto'], 
                            "descripcion" => $row['descripcion'],
                            "tipo" => $row['tipo'],
                            );
                array_push($arregloListaTipoImpacto,$data);
            }
            $db = null;
            echo json_encode($arregloListaTipoImpacto);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }     
  
    function R_getListaHeadersImpactoRiesgo($idProyecto){
        
        $query = "SELECT * FROM NIVEL_IMPACTO WHERE id_proyecto=:id_proyecto ORDER BY nivel";
                    
        try {
            $arregloListaHeaderImpactoRiesgo= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idNivelImpacto" => $row['id_nivel_impacto'], 
                            "idProyecto" => $row['id_proyecto'],
                            "nivel" => $row['nivel'],
                            "descripcion" => $row['descripcion'],
                            "tipo" => $row['tipo']
                            );
                array_push($arregloListaHeaderImpactoRiesgo,$data);
            }
            $db = null;
            echo json_encode($arregloListaHeaderImpactoRiesgo);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_getTipoImpactoxNivelImpacto($idProyecto){
        
        $query = "SELECT * FROM NIVEL_IMPACTO WHERE id_proyecto=:id_proyecto ORDER BY nivel";
                    
        try {
            $arregloListaHeaderImpactoRiesgo= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idNivelImpacto" => $row['id_nivel_impacto'], 
                            "idProyecto" => $row['id_proyecto'],
                            "nivel" => $row['nivel'],
                            "descripcion" => $row['descripcion'],
                            "tipo" => $row['tipo']
                            );
                array_push($arregloListaHeaderImpactoRiesgo,$data);
            }
            $db = null;
            echo json_encode($arregloListaHeaderImpactoRiesgo);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    //--------------------------------------EQUIPO RIESGO--------------------------------------

    function R_postRegistrarComiteRiesgo(){
        
        $request = \Slim\Slim::getInstance()->request();
        $listaIntegrantes = json_decode($request->getBody());
       
        $query ="DELETE FROM COMITE_RIESGO WHERE id_proyecto=:id_proyecto";
         
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
           
            $stmt->bindParam("id_proyecto", $listaIntegrantes->idProyecto);
            $stmt->execute();
            $db = null;
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }


        foreach ($listaIntegrantes->listaComite as $integrante){
            
            //$query = "REPLACE INTO CONFIGURACION_RIESGO (id_proyecto,id_empleado) VALUES (:id_proyecto,:id_empleado)";
            $query = "INSERT INTO COMITE_RIESGO (id_proyecto,id_empleado) 
                    VALUES (:id_proyecto,:id_empleado)";
            try {
                $db = getConnection();
                $stmt = $db->prepare($query);
                $stmt->bindParam("id_proyecto", $listaIntegrantes->idProyecto);
                $stmt->bindParam("id_empleado", $integrante);
                $stmt->execute();
                $db = null;
                echo json_encode("Se registro con exito");
            } catch(PDOException $e) {
                echo json_encode(array("me"=> $e->getMessage()));
                    //'{"error":{"text":'. $e->getMessage() .'}}';
            }
        }
    }    

    function R_getListaIntegrantesProyecto($idProyecto){
        
        $query = "SELECT ME.id_proyecto id_proyecto, E.id_empleado id_empleado , nombres, apellidos
                FROM MIEMBROS_EQUIPO ME,EMPLEADO E where
                ME.id_empleado=E.id_empleado and ME.id_proyecto=:id_proyecto
                AND ME.id_empleado not in (SELECT A.id_empleado FROM COMITE_RIESGO A JOIN MIEMBROS_EQUIPO B
                                            ON A.id_proyecto=B.id_proyecto and B.id_proyecto=:id_proyecto and A.id_empleado=B.id_empleado 
									GROUP BY A.id_empleado)
        		";
                    
        try {
            $arregloListaIntegrantesProyecto= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idContacto" => $row['id_empleado'], 
                            "nombreCompleto" => $row['nombres']." ".$row['apellidos']
                            );
                array_push($arregloListaIntegrantesProyecto,$data);
            }
            $db = null;
            echo json_encode($arregloListaIntegrantesProyecto);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_getComiteRiesgo($idProyecto){
        
        $query = "SELECT CR.id_proyecto, E.id_empleado , nombres, apellidos
                FROM COMITE_RIESGO CR,EMPLEADO E where
                CR.id_empleado=E.id_empleado and id_proyecto=:id_proyecto";
        try {
            $arregloComiteRiesgo= array();
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_proyecto", $idProyecto);
            $stmt->execute();
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idContacto" => $row['id_empleado'], 
                            "nombreCompleto" => $row['nombres']." ".$row['apellidos']
                            );
                array_push($arregloComiteRiesgo,$data);
            }
            $db = null;
            echo json_encode($arregloComiteRiesgo);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }    

?>
