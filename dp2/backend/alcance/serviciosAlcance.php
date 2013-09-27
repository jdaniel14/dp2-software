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
    
    
    
    //================AVANCE NADYA====================================================================================
    //**********************************
    //*** MOSTRAR EL EDT (REAL)*****************
    	  
    function BuscaIdPaquetePadre($idProyecto,$version){
    	$con=getConexionLocal();
    	$query="SELECT id_paquete_trabajo_inicial FROM EDT WHERE id_proyecto=" . $idProyecto." AND version='".$version."'";
    	$result = mysqli_query($con,$query);
    	$paquete=mysqli_fetch_assoc($result);
    	$numero=$paquete["id_paquete_trabajo_inicial"];
    	return $numero;
    }
     
    function DameObjetoPrincipal($id){
    	$con=getConexionLocal();
    	$result = mysqli_query($con,"SELECT id_paquete_trabajo, nombre, descripcion, id_componente_padre, dias
					 	FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo=" . $id);
    	$paquete = mysqli_fetch_assoc($result);
    	return $paquete;
    }
    
    function obtenerCantidadHijos($idPrimerPaquete){
    	$con=getConexionLocal();
    	$result = mysqli_query($con,"SELECT COUNT(id_paquete_trabajo) as cantidad
					 	FROM PAQUETE_TRABAJO WHERE id_componente_padre=" . $idPrimerPaquete);
    	$paquete = mysqli_fetch_assoc($result);
    	return $paquete["cantidad"];
    }
    
    function mostrarEdt($idProyecto,$version){
    	$idPrimerPaquete=BuscaIdPaquetePadre($idProyecto,$version); //Obtengo el id del primer paquete de trabajo
    	$objetoPrincipal=DameObjetoPrincipal($idPrimerPaquete); //Me da el paquete padre
    	$edt=	[ 'title'=>$objetoPrincipal["nombre"],
    	'hijos'=>obtenerCantidadHijos($idPrimerPaquete),
    	'dias'=>$objetoPrincipal["dias"],
    	'descripcion'=>$objetoPrincipal["descripcion"],
    	'nodos'=>ObtenerHijos($idPrimerPaquete),
    	];
    	echo json_encode($edt);
    }
    
    function ObtenerHijos($id){
    	$con=getConexionLocal();
    	$result = mysqli_query($con,"SELECT id_paquete_trabajo, nombre, descripcion, id_componente_padre, dias
					 	FROM PAQUETE_TRABAJO WHERE id_componente_padre=" . $id);
    	//$paquete = mysqli_fetch_assoc($result);
    	//Tengo que tener el resto de los subHijos por cada hijo
    	 
    	$listaHijos=array();
    	while ($paquete = mysqli_fetch_assoc($result)){
    		$edt=	[ 'title'=>$paquete["nombre"],
    		'hijos'=>obtenerCantidadHijos($paquete["id_paquete_trabajo"]),
    		'dias'=>$paquete["dias"],
    		'descripcion'=>$paquete["descripcion"],
    		'nodos'=>ObtenerHijos($paquete["id_paquete_trabajo"]),
    		];
    		array_push($listaHijos, $edt);
    	}
    	return $listaHijos;
    }
    
    //**********************************
    //***FIN MOSTRAR EL EDT (REAL)*****************
    
    //**********************************
    //***FIN GUARDAR EL EDT (REAL)*****************
    	  
    function obtenerIdEstado(){
    	$con=getConexionLocal();
    	$result = mysqli_query($con,"SELECT id_estado FROM ESTADO_EDT WHERE descripcion='No aceptado'");
    	$paquete = mysqli_fetch_assoc($result);
    	return $paquete["id_estado"];
    }
    
    function obtenerIdMiembros($idProyecto){
    	$con=getConexionLocal();
    	$result = mysqli_query($con,"SELECT id_miembros_equipo FROM MIEMBROS_EQUIPO WHERE id_proyecto=".$idProyecto);
    	$paquete = mysqli_fetch_assoc($result);
    	if (count($paquete)==0)return 'NULL';
    	return $paquete["id_miembros_equipo"];
    }
    
    function guardarInformacionEdt($version,$idEstado,$idMiembros,$idProyecto){
    	$con=getConexionLocal();
    	$result = mysqli_query($con,"INSERT INTO EDT(version,id_proyecto,id_estado,id_miembros_equipo) VALUES
	    			(".$version.",".$idProyecto.",".$idEstado.",".$idMiembros.")");
    }
    
    function obtenerIdEdt($idProyecto,$version){
    	$con=getConexionLocal();
    	$query="SELECT id_edt FROM EDT WHERE id_proyecto=".$idProyecto." AND version=".$version;
    	$result = mysqli_query($con,$query);
    	$paquete = mysqli_fetch_assoc($result);
    	return $paquete["id_edt"];
    }
    
    function guardarInformacionPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$idMiembros,$dias,$version){
    	$con=getConexionLocal();
    	$query = "INSERT INTO PAQUETE_TRABAJO(nombre,descripcion,id_estado,id_miembros_equipo,id_edt,id_componente_padre,dias,version) VALUES
	    			('".$nombre."','".$descripcion."',".$idEstado.",".$idMiembros.",".$idEdt.",".$idPadre.",".$dias.",'".$version."')";
    	$result = mysqli_query($con,$query);
    }
    
    function obtenerIdPrincipal($idEdt,$idProyecto,$idEstado,$version){
    	$con=getConexionLocal();
    	$query="SELECT id_paquete_trabajo FROM PAQUETE_TRABAJO
	    			WHERE id_edt=".$idEdt." AND version='".$version."' AND id_estado=".$idEstado." AND id_componente_padre is null";
    	$result = mysqli_query($con,$query);
    	$paquete = mysqli_fetch_assoc($result);
    	return $paquete["id_paquete_trabajo"];
    }
    
    function  actualizarEdt($idEdt,$idIdPaquetePrincipal,$version){
    	$con=getConexionLocal();
    	$query="UPDATE  EDT SET id_paquete_trabajo_inicial=".$idIdPaquetePrincipal."
	    			WHERE id_edt=".$idEdt." AND version='".$version."'";
    	$result = mysqli_query($con,$query);
    }
    
    function guardarEdt($idProyecto,$version){
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$edt = json_decode($request->getBody(),TRUE); //object convert este sirve
    	//$edt=json_decode(mostrarEdt($idProyecto));
    	//$edt=json_decode(getEdt2());
    	 
    	$idEstado=obtenerIdEstado();
    	 
    	$idMiembros=obtenerIdMiembros($idProyecto); //puede ser null?VER BIEN ESTO,
    	//$version="1.1";
    	guardarInformacionEdt($version,$idEstado,$idMiembros,$idProyecto);
    	$nombre=$edt->{"title"};
    	$dias=$edt->{"dias"};
    	$descripcion=$edt->{"descripcion"};
    	$listaHijos=$edt->{"nodos"};
    	$supuestos=0;
    	$porcentaje=0;
    	$idEdt=obtenerIdEdt($idProyecto,$version);
    	$idPadre='NULL';
    	guardarInformacionPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$idMiembros,$dias,$version);
    	$idIdPaquetePrincipal=obtenerIdPrincipal($idEdt,$idProyecto,$idEstado,$version);
    	actualizarEdt($idEdt,$idIdPaquetePrincipal,$version);
    	guardarHijos($listaHijos,$idEstado,$idEdt,$idIdPaquetePrincipal,$version,$idMiembros);
    }
    
    function obtenerIdPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$version){
    	$con=getConexionLocal();
    	$query="SELECT id_paquete_trabajo FROM PAQUETE_TRABAJO WHERE
	    			nombre='".$nombre."' AND descripcion='".$descripcion."'
	    					 AND id_estado=".$idEstado." AND id_edt=".$idEdt." AND id_componente_padre=".$idPadre." AND version='".$version."'";
    	$result = mysqli_query($con,$query);
    	$paquete = mysqli_fetch_assoc($result);
    	return $paquete["id_paquete_trabajo"];
    }
    
    function guardarHijos($listaHijos,$idEstado,$idEdt,$idPadre,$version,$idMiembros){
    	if($listaHijos==NULL)return null;
    	else if(count($listaHijos)==0)return null;
    	else{
    		foreach ($listaHijos as $row){
    			$nombre=$row->{"title"};
    			$dias=$row->{"dias"};
    			$descripcion=$row->{"descripcion"};
    			$listaHijos=$row->{"nodos"};
    			guardarInformacionPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$idMiembros,$dias,$version);
    			$idPaquete=obtenerIdPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$version);
    			guardarHijos($listaHijos,$idEstado,$idEdt,$idPaquete,$version,$idMiembros);
    		}
    
    	}
    }
     
    //**********************************
    //***FIN GUARDAR EL EDT (REAL)*****************
     
    //**********************************
    //MOSTRAR EL COMBO BOX DE VERSIONES A ESCOGER
     
     
    function getComboVersion($idProyecto){
    	$con=getConexionLocal();
    	$query="SELECT version FROM EDT WHERE id_proyecto=".$idProyecto;
    	$result = mysqli_query($con,$query);
    	$lista = array();
    	while ($version = mysqli_fetch_array($result,MYSQLI_ASSOC)){
    		$lista[]=$version["version"];
    	}
    	echo json_encode($lista);
    }
     
    //**********************************
    //FIN MOSTRAR EL COMBO BOX DE VERSIONES A ESCOGER
    
    
    
    
?>