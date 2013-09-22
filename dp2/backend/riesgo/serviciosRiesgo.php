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
	
    function R_getListaPaquetesEDT($idProyecto){
        $sql = "SELECT * FROM edt WHERE id_proyecto=".$idProyecto;
        try {
            $arregloListaPaquetesEDT= array();
            $db=getConnection();
            $stmt = $db->query($sql);
            while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $data = array("id" => $row['id_edt'], "descripcion" => $row['version']);
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
        $query = "SELECT * FROM CONFIGURACION_RIESGO WHERE id_proyecto=".$idProyecto;
        try {
            $db=getConnection();
            $stmt = $db->prepare($query);
            $stmt->execute();
            $row = $stmt->fetchObject();
            $data = array("muyBajo" => $row->muy_bajo,
                        "bajo" => $row->bajo,
                        "medio" => $row->medio,
                        "alto" => $row->alto,
                        "muyAlto" => $row->muy_alto);
            $db = null;
            echo json_encode($data);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
        
    }

    function R_getListaEquipoRiesgo($idProyecto){
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

    function R_postRegistrarRiesgo(){
        $request = \Slim\Slim::getInstance()->request();
        $riesgo = json_decode($request->getBody());
        $query = "INSERT INTO riesgo (nombre,id_categoria_riesgo) VALUES (:nombre_riesgo,:id_categoria_riesgo)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("nombre_riesgo", $riesgo->nombre);
            $stmt->bindParam("id_categoria_riesgo", $riesgo->idCategoriaRiesgo);
            $stmt->execute();
            $riesgo->id_riesgo = $db->lastInsertId();
            $db = null;


            //2da parte
            $query = "INSERT INTO riesgo_x_proyecto (id_riesgo,id_proyecto,id_paquete_trabajo,impacto,probabilidad,costo_potencial,demora_potencial) 
            VALUES (:id_riesgo,:id_proyecto,:id_paquete_trabajo,:impacto,:probabilidad,:costo_potencial,:demora_potencial)";
            $db = getConnection();
            $stmt = $db->prepare($query);
            $stmt->bindParam("id_riesgo", $riesgo->id_riesgo);
            $stmt->bindParam("id_proyecto", $riesgo->idProyecto);
            $stmt->bindParam("id_paquete_trabajo", $riesgo->idPaqueteTrabajo);
            $stmt->bindParam("impacto", $riesgo->impacto);
            $stmt->bindParam("probabilidad", $riesgo->probabilidad);
            $stmt->bindParam("costo_potencial", $riesgo->costoPotencial);
            $stmt->bindParam("demora_potencial", $riesgo->demoraPotencial);
            $stmt->execute();
            //$riesgo->id_riesgo = $db->lastInsertId();
            $db = null;


            echo json_encode(array("me"=>"", "id"=>$riesgo->nombre));
        } catch(PDOException $e) {
            echo json_encode(array("me"=> $e->getMessage()));
                //'{"error":{"text":'. $e->getMessage() .'}}';
        }
/*

        
        $stmt->bindParam("id_riesgo", $riesgo->name);
        $stmt->bindParam("nombre_riesgo", $riesgo->nombre_riesgo);
        $stmt->execute();
        $riesgo->id_riesgo = $con->lastInsertId();

        $sql = "INSERT INTO RIESGO_X_PROYECTO (id_proyecto, id_riesgo,id_paquete_trabajo,id_categoria_riesgos,
            country, region, year, description) VALUES (:name, :grapes, :country, :region, :year, :description)";
            */

    }

    function R_deleteRiesgo($id){
        $query = "UPDATE RIESGO_X_PAQUETE_EDT SET estado_logico = 0 WHERE id_riesgo_x_actividad=".$id;
        try{
           $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");

           mysqli_query($con,$query) or die(mysqli_error($con));      
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_putRiesgo($id){
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



    //CONFIGURACION

    function R_postRegistrarConfiguracionProyecto(){
        //echo "Entra";
        $request = \Slim\Slim::getInstance()->request();
        $configuracion = json_decode($request->getBody());
        $sql = "REPLACE INTO CONFIGURACION_RIESGO (id_proyecto,muy_bajo,bajo,medio,alto,muy_alto) VALUES (:id_proyecto,:muy_bajo,:bajo,:medio,:alto,:muy_alto)
        where id_proyecto =".$configuracion->idProyecto;
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


    function R_getListaConfiguracionProyecto($idProyecto){
        $query = "SELECT * FROM CONFIGURACION_RIESGO WHERE id_proyecto=".$idProyecto;
        $listaConfiguracionProyecto= array();
        try {
            $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");
            $result = mysqli_query($con,$query) or die(mysqli_error($con));
            while ($row=mysqli_fetch_array($result)){
                $arregloListaEquipoRiesgo= array("muyBajo" => $row['muy_bajo'], "bajo" => $row['bajo'],"medio" => $row['medio'],"alto" => $row['alto'],"muyAlto" => $row['muy_alto']);
                array_push($listaConfiguracionProyecto,$data);
            }
            //FALTA CERRAR LA CONEXION 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
        echo json_encode($listaConfiguracionProyecto);
    }

    //Julio

    function R_getListaRiesgoComun(){
        $sql = "SELECT id_riesgo, nombre, ult_probabilidad, ult_impacto, ult_severidad FROM RIESGO WHERE id_categoria_riesgo = (SELECT id_categoria_riesgo FROM CATEGORIA_RIESGO WHERE tipo_riesgo = 1)"; //o cualquiera que sea el tipo de riesgo comun
        try{
            $db = getConnection();
            $stmt = $db->query($sql);
            $arregloListaRiesgoComun = $stmt->fetchAll();
            $db = null;
            echo json_encode($arregloListaRiesgoComun);
        } catch(PDOException $e){
            echo 'ERROR EN R_getListaRiesgoComun: {"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function R_postAsignarRiesgoComun($id_riesgo, $id_proyecto, $id_paquete_trabajo){
        //$request = Slim::getInstance()->request();
        $arregloAsignarRiesgoComun = json_decode($request->getBody());
        $sql = "INSERT INTO RIESGOXPAQUETE_TRABAJO (id_riesgo, id_proyecto, id_paquete_trabajo) VALUES (:id_riesgo, :id_proyecto, :id_paquete_trabajo)";
        try{
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id_riesgo",$id_riesgo);
            $stmt->bindParam("id_proyecto",$id_riesgo);
            $stmt->bindParam("id_paquete_trabajo",$id_riesgo);
            $stmt->execute();
            $arregloAsignarRiesgoComun = $db->lastInsertId();
            $db = null;
            echo json_encode($arregloAsignarRiesgoComun);
        } catch(PDOException $e){
            echo 'ERROR EN R_postAsignarRiesgoComun: {"error":{"text":'. $e->getMessage() .'}}';
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