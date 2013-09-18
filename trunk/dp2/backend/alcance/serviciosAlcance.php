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
	    	$con=mysqli_connect("localhost","root","","dp2");
			// Verificar conexión
			if (mysqli_connect_errno()){
			  echo "Error al conectar con MySQL: " . mysqli_connect_error();
			}
	    	$result = mysqli_query($con,'SELECT * FROM ESTADO_EDT');
			$lista = array();
			while ($estado = mysqli_fetch_array($result)){
				$lista[]=$estado;
			}
			echo json_encode($lista);
	    }

	    function detallePaquete($id_paquete){
			$request = \Slim\Slim::getInstance()->request();
			$con=mysqli_connect("localhost","root","","dp2");
			// Verificar conexión
			if (mysqli_connect_errno()){
			  echo "Error al conectar con MySQL: " . mysqli_connect_error();
			}
			$result = mysqli_query($con,"SELECT * FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo=" . $id_paquete);
			$paquete = mysqli_fetch_array($result);
			echo json_encode($paquete);
		}
?>