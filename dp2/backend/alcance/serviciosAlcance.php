<?php
	include('routesAlcance.php');
	include_once '../backend/conexion.php';

	   function getEdt(){
	       $request = \Slim\Slim::getInstance()->request(); //json parameters
	       $edt = json_decode($request->getBody()); //object convert
	       //var_dump($wine);
	       echo json_encode($edt); //json return
	    }


	    function getDameAlgo(){
	    	$miconexion = new conexion();
	    	echo "sape";
	    }

	    function getComboEstado(){
	    	$miConexion = new conexion();
	    	$result = mysqli_query($miConexion,'SELECT * FROM ESTADO_EDT');
			$lista = array();
			while ($estado = mysqli_fetch_array($result)){
				$lista[]=$estado;
			}
			echo json_encode($lista);
	    }
?>