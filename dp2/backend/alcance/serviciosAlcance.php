<?php
    header("Content-type: text/html; charset=utf8");
	include('routesAlcance.php');
	include ('modelAlcance.php');
	include_once '../backend/conexion.php';

	function getConexionLocal(){
		$con=mysqli_connect("127.0.0.1:3307","usuario","usuario.2013.","dp2");
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
			//$val["id_cambio_moneda"],
			$val["interdependencias"],
			$val["requisitos_calidad"],
			$val["referencias_tecnicas"],
			$val["informacion_contrato"],
			$val["id_estado"],
			date('Y-m-d H:i:s'),
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

    //SEGUNDO SPRINT
	function getListaRequisitos(){
		$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$id_proyecto = $val["id_proyecto"];
		$con=getConnection();
		
		//obtener id_especificacion_requisitos
		$pstmt = $con->prepare("SELECT id_especificacion_requisitos FROM ESPECIFICACION_REQUISITOS WHERE id_proyecto =?");
		$pstmt->execute(array($id_proyecto));
		$idER = $pstmt->fetch(PDO::FETCH_ASSOC)["id_especificacion_requisitos"];
		
		//obtener lista de requisitos
		$pstmt = $con->prepare("SELECT id_requisito, descripcion, id_tipo_requisito, observaciones, unidad_medida, valor,id_estado_requisito FROM REQUISITO WHERE id_especificacion_requisitos =?");
		$pstmt->execute(array($idER));
		$lista = array();
		while($req = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$lista[] = $req;
		}
		echo json_encode($lista);
	}

	function getTiposRequisito(){
		$con=getConnection();
		$pstmt = $con->prepare("SELECT * FROM TIPO_REQUISITO");
		$pstmt->execute();
		$listaTipos = array();
		while($tipo = $pstmt->fetch(PDO::FETCH_ASSOC)){
			$listaTipos[] = $tipo;
		}
		echo json_encode($listaTipos);
	}

	function insertaRequisito(){
		$request = \Slim\Slim::getInstance()->request();
		$req = json_decode($request->getBody(),TRUE);
		$con=getConnection();
		
		//obtener id_especificacion_requisitos
		$pstmt = $con->prepare("SELECT id_especificacion_requisitos FROM ESPECIFICACION_REQUISITOS WHERE id_proyecto =?");
		$pstmt->execute(array($req["id_proyecto"]));
		$idER = $pstmt->fetch(PDO::FETCH_ASSOC)["id_especificacion_requisitos"];


		$pstmt = $con->prepare("INSERT INTO REQUISITO 
								(descripcion, id_tipo_requisito, observaciones, unidad_medida, valor,id_estado_requisito) 	
					   			VALUES (?,?,?,?,?,?)");
		$pstmt = $con->execute(array($req["descripcion"],$req["id_tipo_requisito"],$req["observaciones"],$req["unidad_medida"],
									$req["valor"],$req["id_estado_requisito"]));
		$req["id_requisito"] = $con->lastInsertId();
		echo json_encode($req);
	}

	function modificaRequisito(){
		$request = \Slim\Slim::getInstance()->request();
		$req = json_decode($request->getBody(),TRUE);
		$con=getConnection();
		$pstmt = $con->prepare("UPDATE REQUISITO SET descripcion =?, id_tipo_requisito =?, observaciones =?, unidad_medida =?, valor =?,id_estado_requisito =?
								WHERE id_requisito = ?");
		$pstmt = $con->execute(array($req["descripcion"],$req["id_tipo_requisito"],$req["observaciones"],$req["unidad_medida"],
									$req["valor"],$req["id_estado_requisito"], $req["id_requisito"]));
		echo $request->getBody();
	}

	function getRequisito(){
		$request = \Slim\Slim::getInstance()->request();
		$val = $request->params();
		$idReq= $val["id_requisito"];
		$con=getConnection();
		//obtener requisito
		$pstmt = $con->prepare("SELECT id_requisito, descripcion, id_tipo_requisito, observaciones, unidad_medida, valor,id_estado_requisito FROM REQUISITO WHERE id_requisito =?");
		$pstmt->execute(array($idReq));
		$req = $pstmt->fetch(PDO::FETCH_ASSOC)
		echo json_encode($req);
	}

	function eliminaRequisito(){
		$request = \Slim\Slim::getInstance()->request();
		$id = json_decode($request->getBody(),TRUE)["id_requisito"];
		$con=getConnection();
		$pstmt = $con->prepare("UPDATE REQUISITO SET id_estado_requisito = 3
								WHERE id_requisito = ?");
		$pstmt = $con->execute(array($req["id_requisito"]));
	}    
?>