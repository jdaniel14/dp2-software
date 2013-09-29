<?php

include('routesGeneral2.php');
include_once '../backend/conexion.php';

function G_getCategoria(){
		$sql = "SELECT id_recurso, nombre_recurso FROM RECURSO_HUMANO ";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_jp = array();
			while($j = $stmt->fetch(PDO::FETCH_ASSOC)){
					$jp = array("id"=>$j["id_recurso"], "nom"=>$j["nombre_recurso"]);
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


?>
