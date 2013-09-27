<?php
    header("Content-type: text/html; charset=utf8");
	include('routesAlcance.php');
	include ('modelAlcance.php');
	include_once '../backend/conexion.php';

	function getConexionLocal(){
		$con=mysqli_connect("127.0.01:3306","dp_usuario","usuario.2013.","dp2");
		// Verificar conexión
		if (mysqli_connect_errno()){
		  echo "Error al conectar con MySQL: " . mysqli_connect_error();
		}
		return $con;
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
		$pstmt = $con->prepare("SELECT  P.id_paquete_trabajo, P.nombre, IFNULL(P.descripcion,''), IFNULL(P.version,'1'), P.ultima_actualizacion, E.descripcion as estado  ".
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
			id_miembros_equipo=?,
			descripcion=?,
			criterios_aceptacion=?,
			entregables=?,
			supuestos=?,
			dias=?,
			hitos=?,
			costo=?,
			id_cambio_moneda=?,
  			interdependencias=?,
			requisitos_calidad=?,
			referencias_tecnicas=?,
			informacion_contrato=?,
			id_estado=?,
			ultima_actualizacion=?
			WHERE id_paquete_trabajo=?");
		$pstmt->execute(array(
			$val["id_empleado"],
			$val["descripcion"],
			$val["criterios_aceptacion"],
			$val["entregables"],
			$val["supuestos"],
			$val["dias"],
			$val["hitos"],
			$val["costo"],
			$val["id_cambio_moneda"],
			$val["interdependencias"],
			$val["requisitos_calidad"],
			$val["referencias_tecnicas"],
			$val["informacion_contrato"],
			$val["id_estado"],
			date('d-m-Y h:i:s'),
			$val["id_paquete_trabajo"]
		));
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