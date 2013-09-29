<?php

include('routesGeneral2.php');
include_once '../backend/conexion.php';

function G_getCategoria(){
		$sql = " SELECT id_categoria_lec, nombre_categoria_lec, descripcion_categoria_lec from CATEGORIA_LEC_APRENDIDA ";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_cats = array();
			while($j = $stmt->fetch(PDO::FETCH_ASSOC)){
                            $cat = array("idCategoria"=>$j["id_categoria_lec"], 
                                "nom"=>$j["nombre_categoria_lec"]);
                            array_push($lista_cats, $cat);
			}
			$db = null;
			echo json_encode($lista_cats) ;
		} catch(PDOException $e) {
                    echo json_encode(array("me"=> $e->getMessage()));
		}	
	}
        
        function G_getUsuario(){
		$request = \Slim\Slim::getInstance()->request();
		$acta = json_decode($request->getBody());
		$sql = "SELECT e.nombre_corto,e.id_empleado
                        FROM SEGURIDAD s, EMPLEADO e 
                        WHERE s.user=:p_user
                        and s.password=:p_pass
                        and s.id_empleado=e.id_empleado";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("p_user", $acta->user);
			$stmt->bindParam("p_pass", $acta->pass);
			$stmt->execute();
                        $p = $stmt->fetch(PDO::FETCH_ASSOC);	
                        $usuario=array("nom_user"=>$p["nombre_corto"],
                                        "id_user"=>$p["id_empleado"]);
			$db = null;
			echo json_encode(array("user"=>$usuario));
		} catch(PDOException $e) {
			  echo json_encode(array("me"=> $e->getMessage()));
		}
	}


?>
