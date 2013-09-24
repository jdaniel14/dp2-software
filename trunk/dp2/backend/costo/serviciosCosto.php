<?php
	include('routesCosto.php');
	include('clasesCosto.php');
	include_once '../backend/conexion.php';

	/*
	function getConexionLocal(){
		$con=mysqli_connect("localhost","root","","dp2");
		// Verificar conexión
		if (mysqli_connect_errno()){
		  echo "Error al conectar con MySQL: " . mysqli_connect_error();
		}
		return $con;
	}
	*/
	
	function CO_getInfoProyecto($json) { //servicio1
		$proy = json_decode($json);
		$infoProyecto = CO_consultarInfoProyecto($proy->idProyecto);
		
		echo json_encode($infoProyecto);
	}
	
	function CO_getListaRecursos($json) { //servicio2
		$proy = json_decode($json);
		$listaRecursos = CO_consultarListaRecursos($proy->idProyecto);
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaRecursos;
		
		echo json_encode($jsonRespuesta);
	}
	
	function CO_getListaActividades($json) { //servicio3
		$proy = json_decode($json);
		$listaActividades = CO_consultarListaActividades($proy->idProyecto);
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaActividades;
		
		echo json_encode($jsonRespuesta);
	}
	
	function CO_getInfoActividad($json) { //servicio4
		$proy = json_decode($json);
		$infoActividad = CO_consultarInfoActividad($proy->idProyecto, $proy->idActividad);
		
		echo json_encode($infoActividad);
	}
	
	function CO_saveCURecursos($json) { //servicio5
		$objeto = json_decode($json);
		$jsonRespuesta = CO_guardarCURyPorcReserva($objeto);
		
		echo json_encode($jsonRespuesta);
	}
	
	function CO_getListaPaquetes($json) { //servicio6
		$proy = json_decode($json);
		$listaPaquetes = CO_consultarListaPaquetes($proy->idProyecto);
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaPaquetes;
		
		echo json_encode($jsonRespuesta);
	}
	
	function CO_saveTipoCuenta($json) { //servicio 7
		$objeto = json_decode($json);
		$jsonRespuesta = CO_guardarTipoCuenta($objeto);
		
		echo json_encode($jsonRespuesta);
	}

	function CO_getListaMonedas() {
		$listaMonedas = CO_consultarListaMonedas();
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaMonedas;

		echo json_encode($jsonRespuesta);
	}

	function CO_testFunction2() {
		$sql = "SELECT * FROM CATEGORIA_RIESGO";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$arregloListaRiesgoComun = $stmt->fetchAll();
            $db = null;
            echo json_encode($arregloListaRiesgoComun);
			echo 'conectó';
		} catch(PDOException $e){
            echo 'ERROR EN CO_testFunction: {"error":{"text":'. $e->getMessage() .'}}';
        }
	}

	function CO_testFunction() {
		$sql = "SELECT id_proyecto, nombre_proyecto FROM PROYECTO ";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$lista_project = array();
			while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					array_push($lista_project, $proj);
			}

			$db = null;
			echo json_encode(array("prs"=>$lista_project)) ;
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        echo json_encode(array("me"=> $e->getMessage()));
		}
	}
	
	//---------------------------------------------------------------
	//funciones que apoyan a los servicios.
	function CO_consultarInfoProyecto($idProyecto) {
		//hacer consulta a la bd...
		$sql = '
		select
		h.id_proyecto,h.NOMBRE_PROYECTO,h.PORCENTAJE_RESERVA,sum(h.costo_estimado_actividad) costo_proyecto_estimado
		from
		(
		SELECT
		Z.id_proyecto,Z.NOMBRE_PROYECTO,Z.PORCENTAJE_RESERVA,A.id_actividad,sum(B.CANTIDADESTIMADA*C.VALOR_COSTO_UNITARIO_ESTIMADO) costo_estimado_actividad 
		FROM 
		PROYECTO Z JOIN ACTIVIDAD A ON Z.ID_PROYECTO=A.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD AND B.ID_RECURSO=C.ID_RECURSO
		where
		Z.id_proyecto= :idProyecto
		group by
		Z.id_proyecto,Z.NOMBRE_PROYECTO,Z.PORCENTAJE_RESERVA,A.id_actividad
		) h
		group by
		h.id_proyecto,h.NOMBRE_PROYECTO,h.PORCENTAJE_RESERVA;';

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$proyecto = null; //new CO_Proyecto(1, 'El proyecto de Carlitox', 999.0, 0.2, 999.99);
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					//$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					
					$proyecto = new CO_Proyecto($p["id_proyecto"], $p["NOMBRE_PROYECTO"], $p["costo_proyecto_estimado"], $p["PORCENTAJE_RESERVA"],0);
			}
			//echo json_encode($listaRecursos);

		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}
		

		//se llamara una funcion que devuelve data falsa por mientras.	
		//$proyecto = CO_obtenerInfoProyectoFalsa();
		
		return $proyecto;
	}
	
	function CO_consultarInfoActividad($idProyecto, $idActividad) {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		//$query = "";
		//$result = mysqli_query($con, $query);
		//$actividad = mysqli_fetch_array($result,MYSQLI_ASSOC);
		
		//se llamara una funcion que devuelve data falsa por mientras.	
		$actividad = CO_obtenerInfoActividadFalsa($idActividad);
		
		return $actividad;
	}
	
	function CO_consultarListaRecursos($idProyecto) {
		//hacer consulta a la bd...
		$sql = '
		SELECT 
		A.ID_RECURSO,
		A.ID_UNIDAD_MEDIDA,
		A.DESCRIPCION,
		SUM(C.CANTIDADESTIMADA),
		SUM(D.VALOR_COSTO_UNITARIO_ESTIMADO*C.CANTIDADESTIMADA)/SUM(C.CANTIDADESTIMADA) COSTO
		FROM
		RECURSO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD D ON C.ID_ACTIVIDAD=D.ID_ACTIVIDAD AND C.ID_RECURSO=D.ID_RECURSO
		WHERE
		A.ID_PROYECTO= :idProyecto
		GROUP BY
		A.ID_RECURSO,
		A.ID_UNIDAD_MEDIDA,
		A.DESCRIPCION,
		C.ID_ACTIVIDAD;';

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$listaRecursos = array();
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					//$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					
					array_push($listaRecursos, new CO_Recurso($p["ID_RECURSO"], $p["ID_UNIDAD_MEDIDA"], $p["DESCRIPCION"], $p[4], 0, $p[3]));
			}
			//echo json_encode($listaRecursos);

		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}


		//se llamara una funcion que devuelve data falsa por mientras.		
		//$listaRecursos = CO_obtenerListaRecursosFalsa();
		
		return $listaRecursos;
	}
	
	function CO_consultarListaActividades($idProyecto) {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		//$query = "";
		//$result = mysqli_query($con, $query);
		//$listaActividades = mysqli_fetch_array($result,MYSQLI_ASSOC);
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		$listaActividades = CO_obtenerListaActividadesFalsa();
		
		return $listaActividades;
	}
	
	function CO_consultarListaPaquetes($idProyecto) {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		//$query = "";
		//$result = mysqli_query($con, $query);
		//$listaPaquetes = mysqli_fetch_array($result,MYSQLI_ASSOC);
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		$listaPaquetes = CO_obtenerListaPaquetesFalsa();
		
		return $listaPaquetes;
	}

	function CO_consultarListaMonedas() {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		//$query = "";
		//$result = mysqli_query($con, $query);
		//$listaMonedas = mysqli_fetch_array($result,MYSQLI_ASSOC);
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		$listaMonedas = CO_obtenerListaMonedasFalsa();
		
		return $listaMonedas;
	}	
	
	function CO_guardarCURyPorcReserva($obj) {
		//insertar en la bd...
		/*
		$obj->idProyecto;
		$obj->listaRecursos;
			$obj->listaRecursos[0];
				$obj->listaRecursos[0]->idRecurso;
				$obj->listaRecursos[0]->costoUnitario;
				$obj->listaRecursos[0]->idMoneda;
		$obj->porcReserva;
		*/
		
		/*
		$con= getConexionLocal(); //cambiar por insert
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
			" . " WHERE id_paquete_trabajo=" . $val["id_paquete_trabajo"]
		);

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
		*/
		
		
		
		//obtener respuesta falsa;
		$respuesta = CO_obtenerRespuestaNegativaDeGuardadoFalsa();
		
		return $respuesta;
	}
	
	function CO_guardarTipoCuenta($obj) {
		//insertar en la bd...
		/*
		$obj->idProyecto;
		$obj->listaActividades;
			$obj->listaActividades[0];
		$obj->listaTipoCuenta;
			$obj->listaTipoCuenta[0];
		*/
		
		/*
		$con= getConexionLocal(); //cambiar por insert
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
			" . " WHERE id_paquete_trabajo=" . $val["id_paquete_trabajo"]
		);

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
		*/
		
		
		//obtener respuesta falsa;
		$respuesta = CO_obtenerRespuestaPositivaDeGuardadoFalsa();
		
		return $respuesta;
	}
	
	//---------------------------------------------------------------
	//funciones de llenado falso de datos para pruebas.
	function CO_obtenerInfoProyectoFalsa() {
		$proyecto = new CO_Proyecto(1, 'El proyecto de Carlitox', 999.0, 0.2, 999.99);
		
		return $proyecto;
	}
	
	function CO_obtenerInfoActividadFalsa($idActividad) {
		
		$actividad = new CO_Actividad(1, 'Actividad paranormal', 2, 30.0, 50.5, CO_obtenerListaRecursosFalsa());
		$listaActividades = array();
		$listaRecursos = CO_obtenerListaRecursosFalsa();
		$actividad1 = new CO_Actividad(1, 'Actividad1', 1, 10.0, 20.0, null);
		$actividad2 = new CO_Actividad(2, 'Actividad2', 1, 20.0, 25.0, $listaRecursos);
		$actividad3 = new CO_Actividad(3, 'Actividad3', 2, 30.5, 40.0, null);
		array_push($listaActividades, $actividad1, $actividad2, $actividad3);
		
		return $listaActividades[$idActividad-1];
	}
	
	function CO_obtenerListaRecursosFalsa() {
		$listaRecursos = array();
		$recurso1 = new CO_Recurso(1, 1, 'Recurso1', 10.0, 1, 50);
		$recurso2 = new CO_Recurso(2, 1, 'Recurso2', 20.0, 1, 10);
		$recurso3 = new CO_Recurso(3, 2, 'Recurso3', 30.5, 2, 20);
		$recurso4 = new CO_Recurso(4, 3, 'Recurso4', 25.0, 1, 40);
		array_push($listaRecursos, $recurso1, $recurso2, $recurso3, $recurso4);
		
		return $listaRecursos;
	}
	
	function CO_obtenerListaActividadesFalsa() {
		$listaActividades = array();
		$listaRecursos = CO_obtenerListaRecursosFalsa();
		$actividad1 = new CO_Actividad(1, 'Actividad1', 1, 10.0, 20.0, null);
		$actividad2 = new CO_Actividad(2, 'Actividad2', 1, 20.0, 25.0, $listaRecursos);
		$actividad3 = new CO_Actividad(3, 'Actividad3', 2, 30.5, 40.0, null);
		array_push($listaActividades, $actividad1, $actividad2, $actividad3);
		
		return $listaActividades;
	}
	
	function CO_obtenerListaPaquetesFalsa() {
		$listaPaquetes = array();
		$paquete1 = new CO_Paquete('Paquete1', null);
		$paquete2 = new CO_Paquete('Paquete2', CO_obtenerListaPaquetesHijosFalsa());
		$paquete3 = new CO_Paquete('Paquete3', null);
		array_push($listaPaquetes, $paquete1, $paquete2, $paquete3);
		
		return $listaPaquetes;
	}
	
	function CO_obtenerListaPaquetesHijosFalsa() {
		$listaPaquetes = array();
		$paquete1 = new CO_Paquete('PaqueteHijo1', null);
		$paquete2 = new CO_Paquete('PaqueteHijo2', null);
		$paquete3 = new CO_Paquete('PaqueteHijo3', null);
		array_push($listaPaquetes, $paquete1, $paquete2, $paquete3);
		
		return $listaPaquetes;
	}

	function CO_obtenerListaMonedasFalsa() {
		$listaMonedas = array();
		$moneda1 = new CO_Moneda(1, "Euro", 4.1);
		$moneda2 = new CO_Moneda(1, "Dólar", 2.7);
		array_push($listaMonedas, $moneda1, $moneda2);
		
		return $listaMonedas;
	}
	
	function CO_obtenerRespuestaPositivaDeGuardadoFalsa() {
		$respuesta = new stdClass();
		$respuesta->codRespuesta = 0;
		$respuesta->mensaje = '';
		
		return $respuesta;
	}
	
	function CO_obtenerRespuestaNegativaDeGuardadoFalsa() {
		$respuesta = new stdClass();
		$respuesta->codRespuesta = -1;
		$respuesta->mensaje = 'Ola ke Arce';
		
		return $respuesta;
	}
?>