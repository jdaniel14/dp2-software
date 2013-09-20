<?php
	include('routesAlcance.php');
	include_once '../backend/conexion.php';
		function getConexionLocal(){
			$con=mysqli_connect("localhost","root","","dp2");
			// Verificar conexión
			if (mysqli_connect_errno()){
			  echo "Error al conectar con MySQL: " . mysqli_connect_error();
			}
			return $con;
		}

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
	    	
	    	$con=getConexionLocal();
			
	    	$result = mysqli_query($con,'SELECT * FROM ESTADO_EDT');
			$lista = array();
			while ($estado = mysqli_fetch_array($result,MYSQLI_ASSOC)){
				$lista[]=$estado;
			}
			echo json_encode($lista);
	    }

	    function detallePaquete($id_paquete){
			$con=getConexionLocal();
			$result = mysqli_query($con,"SELECT * FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo=" . $id_paquete);
			$paquete = mysqli_fetch_array($result,MYSQLI_ASSOC);
			echo json_encode($paquete);
		}

		function listaDiccionario($id_edt){

			$con = getConexionLocal();
			
			$result = mysqli_query($con,"SELECT  P.id_paquete_trabajo, P.nombre, P.descripcion, P.version, P.ultima_actualizacion, E.descripcion as estado  ".
				"FROM PAQUETE_TRABAJO P , ESTADO_EDT E ".
				"WHERE E.id_estado = P.id_estado AND P.id_edt=".$id_edt);
			$lista = array();

			while ($paquete = mysqli_fetch_array($result,MYSQLI_ASSOC)){
				$lista[]=$paquete;
			}
			echo json_encode($lista);

		}
		function modificaPaquete(){

			$request = \Slim\Slim::getInstance()->request();
			$val = json_decode($request->getBody(),TRUE);
			//i integer
			//d double
			$con= getConexionLocal();
			$pstmt = mysqli_prepare($con,"UPDATE PAQUETE_TRABAJO SET 
				descripcion=?,
				supuestos=?,
				fecha_inicio=?,
				fecha_final=?,
				porcentaje_completo=?,  
				ultima_actualizacion=?,
				criterios_aceptacion=?,
				entregables=?,
				hitos=?,
				interdependencias=?,
				requisitos_calidad=?,
				referencias_tecnicas=?,
				informacion_contrato=?,
				id_estado=?
				" . " WHERE id_paquete_trabajo=" . $val["id_paquete_trabajo"]);

			mysqli_stmt_bind_param($pstmt,'ssbbdbsssssssi',
				$val["descripcion"],
				$val["supuestos"],
				$val["fecha_inicio"],
				$val["fecha_final"],
				$val["porcentaje_completo"], 
				date('yyyy-mm-dd hh:ii:ss'),
				$val["criterios_aceptacion"],
				$val["entregables"],
				$val["hitos"],
				$val["interdependencias"],
				$val["requisitos_calidad"],
				$val["referencias_tecnicas"],
				$val["informacion_contrato"],
				$val["id_estado"]
				);


			mysqli_stmt_execute($pstmt);
			echo mysqli_stmt_error ( $pstmt );
			mysqli_stmt_close($pstmt);
		}

		function getComboMiembrosEquipo($id_proyecto){
			$con=getConexionLocal();
	    	$result = mysqli_query($con,"SELECT M.id_empleado, C.nombre_completo FROM MIEMBROS_EQUIPO M, CONTACTO C, EMPLEADO E WHERE M.id_proyecto=" . $id_proyecto
				. " AND E.id_contacto = C.id_contacto AND C.id_contacto = M.id_empleado");
			$lista = array();

			while ($miembro = mysqli_fetch_array($result,MYSQLI_ASSOC)){
				$lista[]=$miembro;
			}

			echo json_encode($lista);
	    }

	    function getInfoProyectoFromEDT($id_edt){
	    	$con=getConexionLocal();
	    	$result = mysqli_query($con,"SELECT * FROM PROYECTO P, EDT E WHERE E.id_edt=" . $id_edt
				. " AND E.id_proyecto = P.id_proyecto");
	    	$proy = mysqli_fetch_array($result,MYSQLI_ASSOC);
			echo json_encode($proy);
	    }
?>