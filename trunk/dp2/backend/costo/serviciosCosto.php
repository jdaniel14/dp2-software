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
?>