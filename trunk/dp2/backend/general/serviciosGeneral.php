<?php

  include('routesGeneral.php');
  include('clasesGeneral.php');
        
        
	include_once '../backend/conexion.php';
        
        //jose
	function G_getListaJP(){
		/*$sql = "SELECT id_jp, nombre_jp FROM JP ";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_jp = array();
			while($j = $stmt->fetch(PDO::FETCH_ASSOC)){
					$jp = array("id"=>$j["id_jp"], "nombre"=>$j["nombre_jp"]);
					array_push($lista_jp, $jp);
			}

			$db = null;
			echo json_encode($lista_jp) ;
		} catch(PDOException $e) {
      echo json_encode(array("me"=> $e->getMessage()));
		}	*/
		$arregloProyecto= array(
      array('id'=>1, 'nom'=>'Bonnie Carranza'),
      array('id'=>2, 'nom'=>'Alfonso Bedoya'),
      array('id'=>3, 'nom'=>'Jose Astuvilca'),
      array('id'=>4, 'nom'=>'Irvin Vargas'));
		echo json_encode(array('l_jefes'=>$arregloProyecto));
	}
            
  function G_postRegistrarProyecto(){
		$request = \Slim\Slim::getInstance()->request();
    $proj = json_decode($request->getBody());
    $sql = "INSERT INTO PROYECTO () VALUES (:iduser, :idjp, :f_ini, :f_fin)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("iduser", $proj->iduser);
        $stmt->bindParam("idjp", $proj->idjp);
        $stmt->bindParam("f_ini", $proj->f_ini);
        $stmt->bindParam("f_fin", $proj->f_fin);
        $stmt->execute();
        $proj->id = $db->lastInsertId();
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
		$sql = "SELECT id_proyecto, nombre_proyecto FROM PROYECTO ";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_project = array();
			while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					array_push($lista_project, $proj);
			}

			$db = null;
			echo json_encode(array("prs"=>$lista_project)) ;
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me"=> $e->getMessage()));
		}
	}

	function G_getListaTipoProyecto(){
/*		$sql = "SELECT * FROM TipoDeProyectos";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_tipoProject = array();
			while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$tipo = array("id"=>$p["id_tipoProyecto"], "nombre"=>$p["nombre_tipoProyecto"]);
					array_push($lista_tipoProject, $tipo);
			}

			$db = null;
			echo json_encode($lista_tipoProject) ;
		} catch(PDOException $e) {
        echo json_encode(array("me"=> $e->getMessage()));
		}	*/
		$arregloTipoProyecto= array(
      array("id"=> 1, "nom" => "Pequenho"),
      array("id"=> 2, "nom" => "Mediano"),
      array("id"=> 3, "nom" => "Grandre")
		);
		echo json_encode(array("lTipoProyecto"=>$arregloTipoProyecto));
	}
        //***********************************************************************************
        //Alfonso
        //registar la informacion general
	function G_addInformacionActa(){
		$request = \Slim\Slim::getInstance()->request();
    $acta = json_decode($request->getBody());
    $sql = "UPDATE PROYECTO SET comentario_cierre = :patro, prioridad=:priori, id_tipo_contrato=:tipo WHERE id_proyecto=:id_proy ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("patro", $proj->pap);
        $stmt->bindParam("priori", $proj->pp);
        $stmt->bindParam("tipo", $proj->tp);
        $stmt->bindParam("id_proy", $proj->idProyecto);
        $stmt->execute();
        $proj->id = $db->lastInsertId();
        $db = null;
        echo json_encode(array("me"=>"", "id"=>$proj->id));
		  } catch(PDOException $e) {
		      echo json_encode(array("me"=> $e->getMessage()));
					//'{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
  //registar descripcion del proyecto
  function G_addDescripcionActa(){
	//$miconexion = new conexion();
      try{
          $request = \Slim\Slim::getInstance()->request();
          $acta = json_decode($request->getBody());
          echo json_encode($acta);
         
      }              
			catch (PDOException $e){
				echo '{"error":{"text":'. $e->getMessage() .'}}';
			}
	}
        
        //registar objetivos del proyecto
        function G_addObjetivosActa(){
	    	//$miconexion = new conexion();
            try{
                $request = \Slim\Slim::getInstance()->request();
                $acta = json_decode($request->getBody());
                echo json_encode($acta);
               
            }              
            catch (PDOException $e){
	    	echo '{"error":{"text":'. $e->getMessage() .'}}';
	    }
        }
        
        //registar Autoridad del proyecto
        function G_addAutoridadActa(){
	    	//$miconexion = new conexion();
            try{
                $request = \Slim\Slim::getInstance()->request();
                $acta = json_decode($request->getBody());
                echo json_encode($acta);
               
            }              
            catch (PDOException $e){
	    	echo '{"error":{"text":'. $e->getMessage() .'}}';
	    }
        }
        
        function G_getActa($id){
            //$miconexion = new conexion();
						$sql = "SELECT comentario_cierre, prioridad, id_tipo_contrato FROM PROYECTO WHERE id_proyecto =:id";
						try {
							$db = getConnection();
			        $stmt = $db->prepare($sql);
			        $stmt->bindParam("id", $id);

							$stmt = $db->query($sql);
							$acta = $stmt->fetchAll(PDO::FETCH_OBJ);
							$db = null;
							echo json_encode($acta);
						} catch(PDOException $e) {
								echo json_encode(array("me"=> $e->getMessage()));
						}
        }
            
            
?>

