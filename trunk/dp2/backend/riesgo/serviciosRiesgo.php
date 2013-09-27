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
	
    //--------------------------------------RIESGO--------------------------------------
    function R_postRegistrarRiesgo(){
        $request = \Slim\Slim::getInstance()->request();
        $riesgo = json_decode($request->getBody());
        $query = "INSERT INTO riesgo_x_proyecto (id_proyecto,nombre_riesgo,id_paquete_trabajo,id_categoria_riesgo,impacto,probabilidad,costo_potencial,demora_potencial,) 
                VALUES (:id_proyecto,:nombre_riesgo,:id_paquete_trabajo,:id_categoria_riesgo,:impacto,:probabilidad,:costo_potencial,:demora_potencial)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("nombre_riesgo", $riesgo->nombre);
            $stmt->bindParam("id_categoria_riesgo", $riesgo->idCategoriaRiesgo);
            $stmt->bindParam("id_proyecto", $riesgo->idProyecto);
            $stmt->bindParam("id_paquete_trabajo", $riesgo->idPaqueteTrabajo);
            $stmt->bindParam("impacto", $riesgo->impacto);
            $stmt->bindParam("probabilidad", $riesgo->probabilidad);
            $stmt->bindParam("costo_potencial", $riesgo->costoPotencial);
            $stmt->bindParam("demora_potencial", $riesgo->demoraPotencial);
            $stmt->execute();
            $db = null;

            echo json_encode(array("idRiesgo"=>$riesgo->id_riesgo,"nombre"=>$riesgo->nombre));
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }

    }

    function R_getListaPaquetesEDT($idProyecto){
        $sql = "SELECT * FROM paquete_trabajo,edt WHERE paquete_trabajo.id_edt=edt.id_edt and edt.id_proyecto=".$idProyecto;
        try {
            $arregloListaPaquetesEDT= array();
            $db=getConnection();
            $stmt = $db->query($sql);
            $stmt->bindParam("idProyecto", $idProyecto);
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("id" => $row['id_edt'], "descripcion" => $row['nombre']);
                array_push($arregloListaPaquetesEDT,$data);
            }
            $db = null;
            echo json_encode($arregloListaPaquetesEDT);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_getListaCategoriaRiesgo(){
        $sql = "SELECT * FROM CATEGORIA_RIESGO";
        try {
            $arregloListaCategoriaRiesgo= array();
            $db=getConnection();
            $stmt = $db->query($sql);
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
            $db=getConnection();
            $stmt = $db->query($sql);
            $stmt->bindParam("idProyecto", $idProyecto);
            //$stmt = $db->prepare($query);
            //$stmt->execute();
            //$row = $stmt->fetchObject();
            /*$data = array("muyBajo" => $row->muy_bajo,
                        "bajo" => $row->bajo,
                        "medio" => $row->medio,
                        "alto" => $row->alto,
                        "muyAlto" => $row->muy_alto);*/
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

    function R_getListaRiesgo($idProyecto){

        $sql = "SELECT * FROM RIESGO_X_PROYECTO as RXP,EDT,paquete_trabajo as PT,CATEGORIA_RIESGO as CR WHERE 
                RXP.id_proyecto=EDT.id_proyecto and PT.id_edt=edt.id_edt and CR.id_categoria_riesgo=RXP.id_categoria_riesgo and 
                RXP.id_proyecto=".$idProyecto;
        
        try {
            $arregloListaRiesgo= array();
            $db=getConnection();
            $stmt = $db->query($sql);
            //$stmt->bindParam("id_proyecto", $idProyecto);
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("idRiesgoProyecto" => $row['id_riesgo_x_proyecto'], 
                            "nombre" => $row['nombre_riesgo'],//EDT
                            "paqueteTrabajo" => $row['nombre'],//PT
                            "categoria" => $row['descripcion'],//CR
                            "impacto" => $row['impacto'],
                            "probabilidad" => $row['probabilidad'],
                            "severidad" => $row['severidad'],
                            "estrategia" => $row['nombre'],//X
                            "accionesEspecificas" => $row['nombre'],//X
                            "costoEsperado" => $row['costo_potencial'],//RXP
                            "tiempoEsperado" => $row['demora_potencial'],//RXP
                            "equipoEesponsable" => $row['impacto']//X
                            );
                array_push($arregloListaRiesgo,$data);
            }
            $db = null;
            echo json_encode($arregloListaRiesgo);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
    }

    function R_setEstadoLogicoRiesgo($idRiesgo){

        $sql = "UPDATE RIESGO_X_PROYECTO SET estado = 0 WHERE id_riesgo_x_actividad=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $idRiesgo);
            $stmt->execute();
            $db = null;
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }

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

    }


    function R_deleteRiesgo($idRiesgo){

        $sql = "DELETE FROM RIESGO_X_PROYECTO WHERE id_riesgo_x_actividad=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $idRiesgo);
            $stmt->execute();
            $db = null;
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }

    //--------------------------------------CONFIGURACION--------------------------------------

    function R_postRegistrarConfiguracionProyecto(){
        //echo "Entra";
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


    //Julio

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

    function R_postAsignarRiesgoComun($id_riesgo_comun){
        //$request = Slim::getInstance()->request();
        $request = \Slim\Slim::getInstance()->request();
        $riesgo = json_decode($request->getBody());
        $query = "INSERT INTO riesgo_x_proyecto (id_proyecto,nombre_riesgo,id_paquete_trabajo,id_riesgo_comun,id_categoria_riesgo,impacto,probabilidad,costo_potencial,demora_potencial,) 
                VALUES (:id_proyecto,:nombre_riesgo,:id_paquete_trabajo,:id_riesgo_comun,:id_categoria_riesgo,:impacto,:probabilidad,:costo_potencial,:demora_potencial)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("nombre_riesgo", $riesgo->nombre);
            $stmt->bindParam("id_categoria_riesgo", $riesgo->idCategoriaRiesgo);
            $stmt->bindParam("id_proyecto", $riesgo->idProyecto);
            $stmt->bindParam("id_paquete_trabajo", $riesgo->idPaqueteTrabajo);
            $stmt->bindParam("id_riesgo_comun", $riesgo->$id_riesgo_comun);
            $stmt->bindParam("impacto", $riesgo->impacto);
            $stmt->bindParam("probabilidad", $riesgo->probabilidad);
            $stmt->bindParam("costo_potencial", $riesgo->costoPotencial);
            $stmt->bindParam("demora_potencial", $riesgo->demoraPotencial);
            $stmt->execute();
            $db = null;

            echo json_encode(array("idRiesgo"=>$riesgo->id_riesgo,"nombre"=>$riesgo->nombre));
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
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