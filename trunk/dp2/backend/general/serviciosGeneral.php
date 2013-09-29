<?php

  include('routesGeneral.php');
        
        
	include_once '../backend/conexion.php';
        
        //jose
	function G_getListaJP(){
		$sql = "SELECT id_empleado, CONCAT(nombres, ' ', apellidos) as nombres FROM EMPLEADO WHERE id_perfil = 1 ";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_jp = array();
			while($j = $stmt->fetch(PDO::FETCH_ASSOC)){
					$jp = array("id"=>$j["id_empleado"], "nom"=>$j["nombres"]);
					array_push($lista_jp, $jp);
			}

			$db = null;
			echo json_encode($lista_jp) ;
		} catch(PDOException $e) {
      echo json_encode(array("me"=> $e->getMessage()));
		}	
	/*	$arregloProyecto= array(
      array('id'=>1, 'nom'=>'Bonnie Carranza'),
      array('id'=>2, 'nom'=>'Alfonso Bedoya'),
      array('id'=>3, 'nom'=>'Jose Astuvilca'),
      array('id'=>4, 'nom'=>'Irvin Vargas'));
		echo json_encode($arregloProyecto);*/
	}
            
  function G_postRegistrarProyecto(){
		$request = \Slim\Slim::getInstance()->request();
    $proj = json_decode($request->getBody());

    try {
				$sql = "INSERT INTO PROYECTO (nombre_proyecto, fecha_inicio_planificada, fecha_fin_planificada, id_tipo_proyecto) VALUES (:nom, :fi, :ff, :tp)";
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("nom", $proj->nom);
        $stmt->bindParam("fi", $proj->fi);
        $stmt->bindParam("ff", $proj->ff);
        $stmt->bindParam("tp", $proj->tp);
        $stmt->execute();
        $proj->id = $db->lastInsertId();
				
				$sql = "INSERT INTO EMPLEADO_PROYECTO (id_proyecto, id_empleado) VALUES (:id_proy, :jp)";
				$stmt = $db->prepare($sql);
        $stmt->bindParam("id_proy", $proj->id);
        $stmt->bindParam("jp", $proj->jp);
        $stmt->execute();
        $db = null;
        echo json_encode(array("me"=>"", "id"=>$proj->id));
    } catch(PDOException $e) {
        echo json_encode(array("me"=> $e->getMessage()));
				//'{"error":{"text":'. $e->getMessage() .'}}';
    }
  }

            
	function G_getListaProyecto(){
		//$miconexion = new conexion();
		/*$arregloProyecto= array(
			                        array('Proyecto1','Bonnie Carranza','13/05/2013','23/06/2013'),
			                        array('Proyecto2','Alfonso Bedoya','01/06/2013','14/10/2013'),
			                        array('Proyecto3','Jose Astuvilca','15/06/2013','13/09/2013'),
			                        array('Proyecto4','Bonnie Carranza','21/08/2013','21/10/2013'));
		echo json_encode($arregloProyecto);*/
		//con base de datos
		$sql = "SELECT P.id_proyecto, P.nombre_proyecto, CONCAT(E.nombres, ' ', E.apellidos) as nombres, T.nombre_tipo_proyecto, DATE(P.fecha_inicio_planificada) as fi, DATE(P.fecha_fin_planificada) as ff 
						FROM PROYECTO P, EMPLEADO_PROYECTO M, EMPLEADO E, TIPO_PROYECTO T
						WHERE P.id_proyecto = M.id_proyecto AND E.id_empleado = M.id_empleado AND P.id_tipo_proyecto = T.id_tipo_proyecto ORDER BY P.id_proyecto";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_project = array();
			while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>$p["nombres"], "tp"=>$p["nombre_tipo_proyecto"], "fi"=>$p["fi"], "ff"=>$p["ff"], "es"=>"Ok");
					array_push($lista_project, $proj);
			}

			$db = null;
			echo json_encode(array("prs"=>$lista_project)) ;
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me"=> $e->getMessage()));
		}
	}
//CAMBIO PRUEBA
	function G_getListaTipoProyecto(){
		$sql = "SELECT id_tipo_proyecto, nombre_tipo_proyecto FROM TIPO_PROYECTO";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_tipoProject = array();
			while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$tipo = array("id"=>$p["id_tipo_proyecto"], "nom"=>$p["nombre_tipo_proyecto"]);
					array_push($lista_tipoProject, $tipo);
			}

			$db = null;
			echo json_encode($lista_tipoProject) ;
		} catch(PDOException $e) {
        echo json_encode(array("me"=> $e->getMessage()));
		}	
/*		$arregloTipoProyecto= array(
      array("id"=> 1, "nom" => "Pequenho"),
      array("id"=> 2, "nom" => "Mediano"),
      array("id"=> 3, "nom" => "Grandre")
		);
		echo json_encode(array("lTipoProyecto"=>$arregloTipoProyecto));*/
	}
        //***********************************************************************************
        //Alfonso
        //registar la informacion general
	function G_addInformacionActa(){
		$request = \Slim\Slim::getInstance()->request();
		$acta = json_decode($request->getBody());
		$sql = "UPDATE PROYECTO SET f_preparacion=:p_f_preparacion, 
									prioridad=:p_prioridad,
									nombre_proyecto=:p_nombre_proyecto,
									id_tipo_proyecto=:p_id_tipo_proyecto
				WHERE id_proyecto=:p_id_proy ";
		try {
                        
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("p_f_preparacion", $acta->fpp);
			$stmt->bindParam("p_prioridad", $acta->pp);
			$stmt->bindParam("p_nombre_proyecto", $acta->np);
			//falto tipo proyecto :s
			$stmt->bindParam("p_id_tipo_proyecto", $acta->tp);
			
			$stmt->bindParam("p_id_proy", $acta->idProyecto);
			$stmt->execute();
			//last instert no va :S
			//$proj->id = $db->lastInsertId();
                        
			$db = null;
			echo json_encode(array("me"=>""));
		} catch(PDOException $e) {
			  echo json_encode(array("me"=> $e->getMessage()));
		}
	}
	  //registar descripcion del proyecto
	function G_addDescripcionActa(){
		$request = \Slim\Slim::getInstance()->request();
		$acta = json_decode($request->getBody());
		$sql = "UPDATE PROYECTO SET descripcion=:p_descripcion
				WHERE id_proyecto=:p_id_proy ";
		try {
                        //echo var_dump($acta);
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("p_descripcion", $acta->dp);
			$stmt->bindParam("p_id_proy", $acta->idProyecto);
			$stmt->execute();
			//last insert no va :s
			//$proj->id = $db->lastInsertId();
			$db = null;
			echo json_encode(array("me"=>""));
		} catch(PDOException $e) {
			  echo json_encode(array("me"=> $e->getMessage()));
		}
	}
			
	//registar objetivos del proyecto
	function G_addObjetivosActa(){
		$request = \Slim\Slim::getInstance()->request();
		$acta = json_decode($request->getBody());
		$sql = "UPDATE PROYECTO SET costos=:p_costos,
									duracion=:p_duracion,
									calidad=:p_calidad
				WHERE id_proyecto=:p_id_proy ";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("p_costos", $acta->cp);
			$stmt->bindParam("p_duracion", $acta->plp);
			$stmt->bindParam("p_calidad", $acta->cap);
			$stmt->bindParam("p_id_proy", $acta->idProyecto);
			$stmt->execute();
			//$proj->id = $db->lastInsertId();
			$db = null;
			echo json_encode(array("me"=>""));
		} catch(PDOException $e) {
			  echo json_encode(array("me"=> $e->getMessage()));
		}
	}
        
	//registar Autoridad del proyecto
	function G_addAutoridadActa(){
		$request = \Slim\Slim::getInstance()->request();
		$acta = json_decode($request->getBody());
		$sql = "UPDATE PROYECTO SET jefe_comite=:p_jefe_comite,
									patrocinador=:p_patrocinador,
									id_jefe_proyecto=:p_id_jefe_proyecto
				WHERE id_proyecto=:p_id_proy ";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("p_jefe_comite", $acta->jcp);
			$stmt->bindParam("p_patrocinador", $acta->pap);
			//falto id_jefe_proyecto :s
			$stmt->bindParam("p_id_jefe_proyecto", $acta->jp);
			
			$stmt->bindParam("p_id_proy", $acta->idProyecto);
			$stmt->execute();
			//last insert no va :s
                        //$proj->id = $db->lastInsertId();			
			$db = null;
			echo json_encode(array("me"=>""));
		} catch(PDOException $e) {
			  echo json_encode(array("me"=> $e->getMessage()));
		}
	}
        
	function G_getActa($id){
	
		$sql = "SELECT f_preparacion,
						prioridad,
						id_tipo_proyecto,
						descripcion,
						costos,
						duracion,
						calidad,
						jefe_comite,
						patrocinador,
						nombre_proyecto,
						id_jefe_proyecto
				FROM PROYECTO WHERE id_proyecto =:id";
		try {
                        
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
                        $stmt->execute();		
			$p = $stmt->fetch(PDO::FETCH_ASSOC);
			$acta = array("pap"=>$p["patrocinador"],
							"fpp"=>$p["f_preparacion"],
							"tp"=>$p["id_tipo_proyecto"],
							"pp"=>$p["prioridad"],
							"dp"=>$p["descripcion"],
							"cp"=>$p["costos"],
							"plp"=>$p["duracion"],
							"calp"=>$p["calidad"],
							"np"=>$p["nombre_proyecto"],
							"jp"=>$p["id_jefe_proyecto"],
							"jcp"=>$p["jefe_comite"],
							"ap"=>"ap",
							"carp"=>"carp");
			
			$db = null;
			echo json_encode(array("acta"=>$acta)) ;
		} catch(PDOException $e) {
			echo json_encode(array("me"=> $e->getMessage()));
		}
	
	}
	function G_getPrioridad(){
		/*$sql = "SELECT id_prioridad, nombre_prioridad FROM PRIORIDAD_PROYECTO";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_prioridadProject = array();
			while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$prioridad = array("idPrioridad"=>$p["id_prioridad"], "nom"=>$p["nombre_prioridad"]);
					array_push($lista_prioridadProject, $prioridad);
			}

			$db = null;
			echo json_encode($lista_prioridadProject) ;
		} catch(PDOException $e) {
        echo json_encode(array("me"=> $e->getMessage()));
		}	*/
		$lista_prioridadProject = array();
		$prioridad = array("idPrioridad"=>1, "nom"=>'ESTRATEGICO');
		array_push($lista_prioridadProject, $prioridad);
		$prioridad = array("idPrioridad"=>2, "nom"=>'ALTO POTENCIAL');
		array_push($lista_prioridadProject, $prioridad);
		$prioridad = array("idPrioridad"=>3, "nom"=>'DIA A DIA');
		array_push($lista_prioridadProject, $prioridad);
		$prioridad = array("idPrioridad"=>4, "nom"=>'SOPORTE');
		array_push($lista_prioridadProject, $prioridad);
		echo json_encode($lista_prioridadProject) ;

	}
	
            
            
?>

