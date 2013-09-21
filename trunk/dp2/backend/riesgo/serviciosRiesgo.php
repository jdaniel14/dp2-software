<?php

	include('routesRiesgo.php');

    //Henry
    function getConnectionLocal() {
        $dbhost="localhost";
        $dbuser="root";
        $dbpass="";
        $dbname="dp2";
        $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }


    function R_getListaRiesgos(){
        echo "Probando :D";
	}
	
    function R_getListaPaquetesEDT($idProyecto){
        
        $query = "SELECT * FROM edt WHERE id_proyecto=".$idProyecto;
        
        $arregloListaPaquetesEDT= array();
        try {
            $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");
            $result = mysqli_query($con,$query) or die(mysqli_error($con));
            
            while ($row=mysqli_fetch_array($result)){
                //$id = $row['id_proyecto'];
                //$nombre = $row['nombre_proyecto'];
                $data = array("id" => $row['id_edt'], "descripcion" => $row['version']);
                array_push($arregloListaPaquetesEDT,$data);
            }
            //FALTA CERRAR LA CONEXION 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
        echo json_encode($arregloListaPaquetesEDT);
    }



    function R_getListaObjetosAfectados(){
        /*
        $idProyectoDecode = json_decode($idProyecto);
        $arregloListaObjetosAfectados= array(
            array('id' => '1','descripcion' => 'costo'),
            array('id' => '2','descripcion' => 'tiempo')            
        );
        echo json_encode($arregloListaObjetosAfectados);
        */
        $query = "SELECT * FROM CATEGORIA_RIESGO";
        $arregloListaObjetosAfectados= array();
        try {
            $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");
            $result = mysqli_query($con,$query) or die(mysqli_error($con));
            while ($row=mysqli_fetch_array($result)){
                $data = array("id" => $row['id_categoria_riesgo'], "descripcion" => $row['descripcion']);
                array_push($arregloListaObjetosAfectados,$data);
            }
            //FALTA CERRAR LA CONEXION 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
        echo json_encode($arregloListaObjetosAfectados);

    }

    function R_getListaNivelesImpacto($idProyecto){
        /*
        $idProyectoDecode = json_decode($idProyecto);
        $arregloListaNivelesImpacto= array(
            array('idImpacto' => '1','descripcion' => 'alto'),
            array('idImpacto' => '2','descripcion' => 'medio')          
        );
        echo json_encode($arregloListaNivelesImpacto);
        */

        $query = "SELECT * FROM EDT WHERE id_proyecto=".$idProyecto;
        $arregloListaNivelesImpacto= array();
        try {
            $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");
            $result = mysqli_query($con,$query) or die(mysqli_error($con));
            
            while ($row=mysqli_fetch_array($result)){
                //$id = $row['id_proyecto'];
                //$nombre = $row['nombre_proyecto'];
                $data = array("id" => $row['idImpacto'], "descripcion" => $row['descripcion']);
                array_push($arregloListaNivelesImpacto,$data);
            }
            //FALTA CERRAR LA CONEXION 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
        echo json_encode($arregloListaNivelesImpacto);

    }

    function R_getListaEquipoRiesgo($idProyecto){
        /*
        $idProyectoDecode = json_decode($idProyecto);
        $arregloListaEquipoRiesgo= array(
            array('idEquipo' => '1','nombre' => 'equipoA'),
            array('idEquipo' => '2','nombre' => 'equipoB')
        );
        echo json_encode($arregloListaEquipoRiesgo);
        */
        $query = "SELECT * FROM EDT WHERE id_proyecto=".$idProyecto;
        $arregloListaEquipoRiesgo= array();
        try {
            $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");
            $result = mysqli_query($con,$query) or die(mysqli_error($con));
            
            while ($row=mysqli_fetch_array($result)){
                //$id = $row['id_proyecto'];
                //$nombre = $row['nombre_proyecto'];
                $data = array("id" => $row['idEquipo'], "nombre" => $row['nombre']);
                array_push($arregloListaEquipoRiesgo,$data);
            }
            //FALTA CERRAR LA CONEXION 
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }        
        echo json_encode($arregloListaEquipoRiesgo);

    }

    function R_postRegistrarRiesgo(){
        $request = Slim::getInstance()->request();
        $riesgo = json_decode($request->getBody());

        $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");
        $stmt = $con->prepare($sql);
        $sql = "INSERT INTO riesgo (id_riesgo,nombre_riesgo) VALUES (:id_riesgo,:nombre_riesgo)";
        $stmt->bindParam("id_riesgo", $riesgo->name);
        $stmt->bindParam("nombre_riesgo", $riesgo->nombre_riesgo);
        $stmt->execute();
        $riesgo->id_riesgo = $con->lastInsertId();

        $sql = "INSERT INTO RIESGO_X_PROYECTO (id_proyecto, id_riesgo,id_paquete_trabajo,id_categoria_riesgos,
            country, region, year, description) VALUES (:name, :grapes, :country, :region, :year, :description)";
/*

{, “idObjeto”:”1”, “idImpacto”:”1” ,
 “probabilidad”:”0.5” , “acciones”:”texto …”, “costo”:”100” , “tiempo”:”2” , “idEquipo”:”1”}

id_proyecto
id_riesgo
nombre_riesgo
id_paquete_trabajo
impacto
probabilidad
descripcion
costoPotencial


codigoRiesgo 0
fechaOrigen 0
demoraPotencial 0
disparador 0
severidad 0
materializado 0


        try {
            $con=mysqli_connect("localhost","root","","dp2") or die("Error con la conexion");
            $stmt = $con->prepare($sql);
            $stmt->bindParam("name", $wine->name);
            $stmt->bindParam("grapes", $wine->grapes);
            $stmt->bindParam("country", $wine->country);
            $stmt->bindParam("region", $wine->region);
            $stmt->bindParam("year", $wine->year);
            $stmt->bindParam("description", $wine->description);
            $stmt->execute();
            $wine->id = $con->lastInsertId();
            $con = null;
            echo json_encode($wine);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

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
        $sql = "INSERT INTO CONFIGURACION_RIESGO (id_proyecto,muy_bajo,bajo,medio,alto,muy_alto) VALUES (:id_proyecto,:muy_bajo,:bajo,:medio,:alto,:muy_alto)";
        try {
            $db = getConnectionLocal();
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