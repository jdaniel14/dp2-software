<?php

  include('routesGeneral.php');
        
        
	include_once '../backend/conexion.php';
        
        //jose
	function G_getListaJP(){
		$sql = "SELECT * FROM JefeProyecto";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();
				$lista_jefes = array();
				while($jefe = $stmt->fetchObject()){
					$lista_jefed[$i] = $jefe;
					$i++;
				}
        $db = null;
        echo json_encode($lista_jefes);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
  	}
	}
            
  function G_postResgitrarProyecto(){
	  $request = Slim::getInstance()->request();
    $wine = json_decode($request->getBody());
    $sql = "INSERT INTO wine (name, grapes, country, region, year, description) VALUES (:name, :grapes, :country, :region, :year, :description)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $wine->name);
        $stmt->bindParam("grapes", $wine->grapes);
        $stmt->bindParam("country", $wine->country);
        $stmt->bindParam("region", $wine->region);
        $stmt->bindParam("year", $wine->year);
        $stmt->bindParam("description", $wine->description);
        $stmt->execute();
        $wine->id = $db->lastInsertId();
        $db = null;
        echo json_encode($wine);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
	}
            
  function G_getListaProyecto(){
		//$miconexion = new conexion();
/*		$arregloProyecto= array(
	  	array('Proyecto1','Bonnie Carranza','13/05/2013','23/06/2013'),
	  	array('Proyecto2','Alfonso Bedoya','01/06/2013','14/10/2013'),
	  	array('Proyecto3','Jose Astuvilca','15/06/2013','13/09/2013'),
	  	array('Proyecto4','Bonnie Carranza','21/08/2013','21/10/2013')
    );
  	echo json_encode($arregloProyecto);*/

		$sql = "select id_proyecto, nombre_proyecto, '', '' FROM PROYECTO ";
    try {
            //echo "1";
            $db = getConnection();
            //echo "2";
            $stmt = $db->query($sql);
            //echo "3";
            //$stmt->execute();
            $wines = $stmt->fetchAll(/*PDO::FETCH_OBJ*/)                    ;
            $db = null;
            echo json_encode($wines) ;
    } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

	}

	function G_getListaTipoProyecto(){
		$sql = "SELECT * FROM TipoDeProyectos";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute();
				$lista_tipos = array();
				while($tipo = $stmt->fetchObject()){
					$lista_tipos[$i] = $tipo;
					$i++;
				}
        $db = null;
        echo json_encode($lista_tipos);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
  	}
	}
        
        //Alfonso
        function G_putActa(){
	    	//$miconexion = new conexion();
	    	echo "put Acta";
	    }
            
            function G_getActa($id){
	    	//$miconexion = new conexion();
                
                if($id==1){
                    echo "uno";
                }
	    	echo "dos";
	    }
            
            
?>
