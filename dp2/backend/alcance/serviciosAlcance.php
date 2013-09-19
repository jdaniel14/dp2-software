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
	    	/*
	    	$con=mysqli_connect("localhost","root","","dp2");
			// Verificar conexión
			if (mysqli_connect_errno()){
			  echo "Error al conectar con MySQL: " . mysqli_connect_error();
			}
			*/
	    	$result = mysqli_query($con,'SELECT * FROM ESTADO_EDT');
			$lista = array();
			while ($estado = mysqli_fetch_array($result)){
				$lista[]=$estado;
			}
			echo json_encode($lista);
	    }

	    function detallePaquete($id_paquete){
			/*
			$con=mysqli_connect("localhost","root","","dp2");
			// Verificar conexión
			if (mysqli_connect_errno()){
			  echo "Error al conectar con MySQL: " . mysqli_connect_error();
			}
			*/
			$result = mysqli_query($con,"SELECT * FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo=" . $id_paquete);
			$paquete = mysqli_fetch_array($result);
			echo json_encode($paquete);
		}

		function listaDiccionario($id_edt){
			/*
			$con=mysqli_connect("localhost","root","","dp2");
			// Verificar conexión
			if (mysqli_connect_errno()){
			  echo "Error al conectar con MySQL: " . mysqli_connect_error();
			}
			*/
			$result = mysqli_query($con,"SELECT  * /*Columnas que quiera FRONT*/ FROM PAQUETE_TRABAJO WHERE id_edt=" . $id_edt);

			$lista = array();

			while ($paquete = mysqli_fetch_array($result)){
				$lista[]=$paquete;
			}

			echo json_encode($lista);

		}
		function modificaPaquete(){

			$request = \Slim\Slim::getInstance()->request();
			$val = json_decode($request->getBody()); 

			//i integer
			//d double

			/*
			$con=mysqli_connect("localhost","root","","dp2");
			// Verificar conexión
			if (mysqli_connect_errno()){
			  echo "Error al conectar con MySQL: " . mysqli_connect_error();
			}
			*/

			$pstmt = mysqli_prepare($con,"UPDATE PAQUETE_TRABAJO SET nombre=?,
				descripcion=?,
				supuestos=?,
				fecha_inicio=?,
				fecha_final=?,
				porcentaje_completo=?, 
				version=?, 
				ultima_actualizacion=?,
				criterios_aceptacion=?,
				entregables=?,
				costo=?,
				interdependencias=?,
				requisitos_calidad=?,
				referencias_tecnicas=?,
				informacion_contrato=?,
				numero_serie=?,
				id_estado=?, 
				id_edt=?
				" . "WHERE id_paquete_trabajo=" . $val["id"]);

			mysqli_bind_param($pstmt,"sssbdsbsssdsssssii",
				$val["nombre"],
				$val["descripcion"],
				$val["supuestos"],
				$val["fecha_inicio"],
				$val["fecha_final"],
				$val["porcentaje_completo"], 
				$val["version"],
				$val["ultima_actualizacion"],
				$val["criterios_aceptacion"],
				$val["entregables"],
				$val["hitos"],
				$val["costo"],
				$val["interdependencias"],
				$val["requisitos_calidad"],
				$val["referencias_tecnicas"],
				$val["informacion_contrato"],
				$val["numero_serie"],
				$val["id_estado"],
				$val["id_edt"]
				);

			mysqli_stmt_execute($pstmt);
			mysqli_stmt_close($pstmt);

			echo json_encode($paquete);
		}

		function getComboMiembrosEquipo($id_proyecto){
	    	//devolver una lista con id y nombre del miembro de el proyecto determinado(id_proyecto)
	    	//tabla MIEMBROS_EQUIPO,id_empelado que viene de tabla EMPLEADO que tiene un id_contacto que viene de la tabla CONTACTO
	    	/* json de salida
	    		[
	    			{
						id_empleado: 1,
						nombre_completo: "Fernando Moreno Valles"
	    			},
	    			{
						id_empleado: 2,
						nombre_completo: "Marcela Araujo Falcón"
	    			}
	    		]
	    	*/
	    	//puedes usar de ejemplo la función getComboEstado() de este mismo archivo
	    }
?>