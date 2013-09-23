<?php
    header("Content-type: text/html; charset=utf8");
	include('routesAlcance.php');
	include ('modelAlcance.php');
	include_once '../backend/conexion.php';
	function getConexionLocal(){
		$con=mysqli_connect("localhost:3306","usuario","usuario.2013.","dp2");
		// Verificar conexión
		if (mysqli_connect_errno()){
		  echo "Error al conectar con MySQL: " . mysqli_connect_error();
		}
		return $con;
	}

   function getEdt(){
       //$request = \Slim\Slim::getInstance()->request(); //json parameters
       //$edt = json_decode($request->getBody()); //object convert
       //var_dump($edt);
       //echo json_encode($edt); //json return
    	
    	$h1n = array();
    	$h2n = array();
    	$h3n = array();
    	$h4n = array();
    	$h5n = array();

   		$hijo1 = new EdtArbol("Inicio","0", $h1n );
   		$hijo2 = new EdtArbol("Planificacion","0", $h2n );
   		$hijo3 = new EdtArbol("Ejecucion","0", $h3n );
   		$hijo4 = new EdtArbol("Seguimiento","0", $h4n );
   		$hijo5 = new EdtArbol("Cierre","0", $h5n );

    	$nodos = array();
    	array_push($nodos, $hijo1,$hijo2,$hijo3,$hijo4,$hijo5);


    	$padre =  new EdtArbol("DP2","5",$nodos);

		echo json_encode($padre);
    }


    function getDameAlgo(){
    	$sql = 'SELECT * FROM ESTADO_EDT';
    	$miconexion = new conexion();
   		var_dump($miconexion);
    	$stmt = $miconexion->query($sql);
    	echo $stmt;
    	

    	//echo "sape";
    }

    function getComboEstado(){
    	
    	$con=getConnection();
		$result= $con->query('SELECT * FROM ESTADO_EDT');

		while ($estado = $result->fetch(PDO::FETCH_ASSOC)){
			$lista[]=$estado;
		}
		echo json_encode($lista);
    }

    function detallePaquete($id_paquete){
		$con=getConnection();
		$pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo= ?");
		$pstmt->execute(array($id_paquete));
		$paquete= $pstmt->fetch(PDO::FETCH_ASSOC);
		$paquete["id_empleado"]= $paquete["id_miembros_equipo"];
		echo json_encode($paquete);
	}

	function listaDiccionario($id_edt){

		$con = getConnection();
		$pstmt = $con->prepare("SELECT  P.id_paquete_trabajo, P.nombre, P.descripcion, P.version, P.ultima_actualizacion, E.descripcion as estado  ".
			"FROM PAQUETE_TRABAJO P , ESTADO_EDT E ".
			"WHERE E.id_estado = P.id_estado AND P.id_edt= ?");
		$pstmt->execute(array($id_edt));
		$lista = array();

		while ($paquete = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$lista[]=$paquete;
		}
		echo json_encode($lista);

	}
	function modificaPaquete(){

		$request = \Slim\Slim::getInstance()->request();
		$val = json_decode($request->getBody(),TRUE);
		//i integer
		//d double
		$con= getConnection();
		$pstmt = $con->prepare("UPDATE PAQUETE_TRABAJO SET 
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
			id_estado=?,
			id_miembros_equipo=?
			WHERE id_paquete_trabajo=?");// . $val["id_paquete_trabajo"]);
		mysqli_stmt_bind_param($pstmt,'ssbbdssssssssii',
			$val["descripcion"],
			$val["supuestos"],
			$val["fecha_inicio"],
			$val["fecha_final"],
			$val["porcentaje_completo"], 
			date('d-m-Y h:i:s'),
			$val["criterios_aceptacion"],
			$val["entregables"],
			$val["hitos"],
			$val["interdependencias"],
			$val["requisitos_calidad"],
			$val["referencias_tecnicas"],
			$val["informacion_contrato"],
			$val["id_estado"],
			$val["id_empleado"]
			);
		$pstmt->execute();

		mysqli_stmt_execute($pstmt);
		echo mysqli_stmt_error ( $pstmt );
		mysqli_stmt_close($pstmt);
	}

	function getComboMiembrosEquipo($id_proyecto){
		$con=getConnection();

		$pstmt = $con->prepare("SELECT M.id_empleado, C.nombre_completo FROM MIEMBROS_EQUIPO M, CONTACTO C, EMPLEADO E WHERE M.id_proyecto= ? AND E.id_contacto = C.id_contacto AND C.id_contacto = M.id_empleado");
		$pstmt->execute(array($id_proyecto));
		$lista = array();
		while ($miembro = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$lista[]=$miembro;
		}

		echo json_encode($lista);
    }

    function getInfoProyectoFromEDT($id_edt){
    	$con=getConnection();
    	$pstmt = $con->prepare("SELECT * FROM PROYECTO P, EDT E WHERE E.id_edt=? AND E.id_proyecto = P.id_proyecto");
    	$pstmt->execute(array($id_edt));
    	$proy = $pstmt->fetch(PDO::FETCH_ASSOC);
		echo json_encode($proy);
    }
?>