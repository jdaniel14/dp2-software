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


?>
