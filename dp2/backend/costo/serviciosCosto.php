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
		A.ID_PROYECTO,
		A.NOMBRE_PROYECTO,
		A.PORCENTAJE_RESERVA,
		SUM(C.CANTIDADESTIMADA*(D.VALOR_COSTO_UNITARIO_ESTIMADO*CAMBIO_A_SOL)) PRESUP_SOLES
		from 
		PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD D ON C.ID_ACTIVIDAD=D.ID_ACTIVIDAD AND C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		X.FECHA=SYSDATE()
		WHERE
		A.ID_PROYECTO= :idProyecto
		GROUP BY
		A.ID_PROYECTO;';

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$proyecto = null; //new CO_Proyecto(1, 'El proyecto de Carlitox', 999.0, 0.2, 999.99);
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					//$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					
					$proyecto = new CO_Proyecto($p["id_proyecto"], $p["NOMBRE_PROYECTO"], $p["PORCENTAJE_RESERVA"], $p["PRESUP_SOLES"]);
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
	
	function CO_consultarInfoActividad($idProyecto, $idActividad) { //FALTA LA LISTA DE RECURSOS
		$sql = '
		SELECT
		H.ID_ACTIVIDAD,
		H.NOMBRE_ACTIVIDAD,
		H.COSTO_ACTIVIDAD_SOLES,
		T.DESCRIPCION RECURSO,
		Z.DESCRIPCION UNIDAD_MEDIDA,
		D.VALOR_COSTO_UNITARIO_ESTIMADO*X.CAMBIO_A_SOL COSTO_UNIT_SOLES
		FROM
		(
		select
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		Y.DESCRIPCION ASIENTO_CONTABLE,
		SUM(C.CANTIDADESTIMADA*(D.VALOR_COSTO_UNITARIO_ESTIMADO*CAMBIO_A_SOL)) COSTO_ACTIVIDAD_SOLES
		from 
		PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD D ON C.ID_ACTIVIDAD=D.ID_ACTIVIDAD AND C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		JOIN ASIENTO_CONTABLE Y ON B.ID_ASIENTO_CONTABLE=Y.ID_ASIENTO_CONTABLE
		WHERE
		X.FECHA=SYSDATE()
		WHERE
		A.ID_PROYECTO= $idProyecto AND B.ID_ACTIVIDAD= :idActividad
		GROUP BY
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		Y.DESCRIPCION
		) H JOIN
		ACTIVIDAD_X_RECURSO C ON H.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN RECURSO T ON C.ID_RECURSO=T.ID_RECURSO
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD D ON C.ID_ACTIVIDAD=D.ID_ACTIVIDAD AND C.ID_RECURSO=D.ID_RECURSO
		JOIN UNIDAD_MEDIDA Z ON T.ID_UNIDAD_MEDIDA=Z.ID_UNIDAD_MEDIDA
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		X.FECHA=SYSDATE()
		GROUP BY
		H.ID_ACTIVIDAD,
		H.NOMBRE_ACTIVIDAD,
		H.COSTO_ACTIVIDAD_SOLES,
		T.DESCRIPCION ,
		Z.DESCRIPCION ,
		D.VALOR_COSTO_UNITARIO_ESTIMADO*X.CAMBIO_A_SOL;';

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->bindParam("idActividad", $idActividad);
        	$stmt->execute();
        	$db = null;
        	$actividad = null;
        	$listaRecursos = array();
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					//$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					if ($actividad == null) {
						$actividad = new CO_Actividad($p["ID_ACTIVIDAD"], $p["NOMBRE_ACTIVIDAD"], $p["ASIENTO_CONTABLE"], $p["COSTO_ACTIVIDAD_SOLES"], 0, null);
					}

					array_push($listaRecursos, new CO_Recurso($p["ID_RECURSO"], null, null, null, null, null, null));
			}

			if ($actividad != null) {
				$actividad->listaRecursos = $listaRecursos;
			}

		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}
		

		//se llamara una funcion que devuelve data falsa por mientras.	
		//$actividad = CO_obtenerInfoActividadFalsa($idActividad);
		
		return $actividad;
	}
	
	function CO_consultarListaRecursos($idProyecto) {
		//hacer consulta a la bd...
		$sql = '
		SELECT 
		A.ID_RECURSO,
		A.ID_UNIDAD_MEDIDA,
		A.DESCRIPCION,
		Y.DESCRIPCION MONEDA,
		Z.DESCRIPCION UNIDAD_MEDIDA,
		SUM(C.CANTIDADESTIMADA) CANTIDAD_NECESARIA,
		SUM(D.VALOR_COSTO_UNITARIO_ESTIMADO*C.CANTIDADESTIMADA*X.CAMBIO_A_SOL)/SUM(C.CANTIDADESTIMADA) COSTO_PROM_SOLES
		FROM
		RECURSO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD D ON C.ID_ACTIVIDAD=D.ID_ACTIVIDAD AND C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		JOIN CAMBIO_MONEDA Y ON D.ID_CAMBIO_MONEDA=Y.ID_CAMBIO_MONEDA
		JOIN UNIDAD_MEDIDA Z ON A.ID_UNIDAD_MEDIDA=Z.ID_UNIDAD_MEDIDA
		WHERE
		A.ID_PROYECTO= :idProyecto
		WHERE
		X.FECHA=SYSDATE()
		GROUP BY
		A.ID_RECURSO,
		A.ID_UNIDAD_MEDIDA,
		A.DESCRIPCION,
		Y.DESCRIPCION,
		Z.DESCRIPCION;';

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$listaRecursos = array();
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					//$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					
					array_push($listaRecursos, new CO_Recurso($p["ID_RECURSO"], $p["ID_UNIDAD_MEDIDA"], $p["DESCRIPCION"], $p["MONEDA"], $p["UNIDAD_MEDIDA"], $p["CANTIDAD_NECESARIA"], $p["COSTO_PROM_SOLES"]));
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
		$sql = '
		select
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		Y.DESCRIPCION ASIENTO_CONTABLE,
		SUM(C.CANTIDADESTIMADA*(D.VALOR_COSTO_UNITARIO_ESTIMADO*CAMBIO_A_SOL)) COSTO_ACTIVIDAD_SOLES
		from 
		PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD D ON C.ID_ACTIVIDAD=D.ID_ACTIVIDAD AND C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		JOIN ASIENTO_CONTABLE Y ON B.ID_ASIENTO_CONTABLE=Y.ID_ASIENTO_CONTABLE
		WHERE
		X.FECHA=SYSDATE()
		WHERE
		A.ID_PROYECTO= :idProyecto
		GROUP BY
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		Y.DESCRIPCION;';

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$listaActividades = array();
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					//$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					
					array_push($listaActividades, new CO_Actividad($p["ID_ACTIVIDAD"], $p["NOMBRE_ACTIVIDAD"], $p["ASIENTO_CONTABLE"], $p["COSTO_ACTIVIDAD_SOLES"], 0, null));
			}
			//echo json_encode($listaRecursos);

		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}
		
		foreach ($listaActividades as $actividad) {
			$listaRecursos = CO_consultarRecursosXActividad($idProyecto, $actividad->idActividad);
			$actividad->listaRecursos = $listaRecursos;
		}
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		//$listaActividades = CO_obtenerListaActividadesFalsa();
		
		return $listaActividades;
	}
	
	function CO_consultarRecursosXActividad($idProyecto, $idActividad) { //FALTA INICIAR CADA RECURSO, CONSULTAR!
		$sql = '
		SELECT
		H.ID_ACTIVIDAD,
		H.NOMBRE_ACTIVIDAD,
		H.COSTO_ACTIVIDAD_SOLES,
		T.DESCRIPCION RECURSO,
		Z.DESCRIPCION UNIDAD_MEDIDA,
		D.VALOR_COSTO_UNITARIO_ESTIMADO*X.CAMBIO_A_SOL COSTO_UNIT_SOLES
		FROM
		(
		select
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		Y.DESCRIPCION ASIENTO_CONTABLE,
		SUM(C.CANTIDADESTIMADA*(D.VALOR_COSTO_UNITARIO_ESTIMADO*CAMBIO_A_SOL)) COSTO_ACTIVIDAD_SOLES
		from 
		PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD D ON C.ID_ACTIVIDAD=D.ID_ACTIVIDAD AND C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		JOIN ASIENTO_CONTABLE Y ON B.ID_ASIENTO_CONTABLE=Y.ID_ASIENTO_CONTABLE
		WHERE
		X.FECHA=SYSDATE()
		WHERE
		A.ID_PROYECTO= :idProyecto AND B.ID_ACTIVIDAD= :idActividad
		GROUP BY
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		Y.DESCRIPCION
		) H JOIN
		ACTIVIDAD_X_RECURSO C ON H.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN RECURSO T ON C.ID_RECURSO=T.ID_RECURSO
		JOIN COSTO_X_RECURSOS_X_ACTIVIDAD D ON C.ID_ACTIVIDAD=D.ID_ACTIVIDAD AND C.ID_RECURSO=D.ID_RECURSO
		JOIN UNIDAD_MEDIDA Z ON T.ID_UNIDAD_MEDIDA=Z.ID_UNIDAD_MEDIDA
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		X.FECHA=SYSDATE()
		GROUP BY
		H.ID_ACTIVIDAD,
		H.NOMBRE_ACTIVIDAD,
		H.COSTO_ACTIVIDAD_SOLES,
		T.DESCRIPCION ,
		Z.DESCRIPCION ,
		D.VALOR_COSTO_UNITARIO_ESTIMADO*X.CAMBIO_A_SOL;';
		
		$listaRecursos = null;
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->bindParam("idActividad", $idActividad);
        	$stmt->execute();
        	$db = null;
        	$listaRecursos = array();
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					//$proj = array("id"=>$p["id_proyecto"], "nom"=>$p["nombre_proyecto"], "jp"=>'JP', "tp"=>'TP', "fi"=>'', "ff"=>'', "es"=>"Ok");
					
					array_push($listaRecursos, new CO_Recurso($p["ID_RECURSO"], null, null, null, null, null, null));
			}
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}
	
		return $listaRecursos;
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

	function CO_consultarListaMonedas() { //FALTA
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
		
		try {
			//Para el porcentaje de reserva
			$sql = '
			UPDATE PROYECTO SET
			PORCENTAJE_RESERVA= :porcReserva
			WHERE
			ID_PROYECTO= :idProyecto;
			COMMIT;';

			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("porcReserva", $obj->porcReserva);
        	$stmt->bindParam("idProyecto", $obj->idProyecto);
        	$stmt->execute();
        	$db = null;

        	//Para el C.U. de cada recurso
        	$sql = '
        	update COSTO_X_RECURSOS_X_ACTIVIDAD
			set
			valor_costo_unitario_estimado= :cur, id_cambio_moneda= :idMoneda
			where
			id_recurso= :idRecurso and id_proyecto= id:proyecto;
			commit;';

        	foreach ($obj->listaRecursos as $recurso) {
        		$db = getConnection();
	        	$stmt = $db->prepare($sql);
	        	$stmt->bindParam("cur", $recurso->costoUnitario);
	        	$stmt->bindParam("idMoneda", $recurso->idMoneda);
	        	$stmt->bindParam("idRecurso", $recurso->idRecurso);
	        	$stmt->bindParam("idProyecto", $obj->idProyecto);
	        	$stmt->execute();
	        	$db = null;
			}


        	$respuesta = CO_crearRespuesta(0, 'Ok');

		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	//echo json_encode(array("me"=> $e->getMessage()));
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
		//obtener respuesta falsa;
		//$respuesta = CO_obtenerRespuestaNegativaDeGuardadoFalsa();
		
		return $respuesta;
	}
	
	function CO_guardarTipoCuenta($obj) { //FALTA
		//insertar en la bd...
		/*
		$obj->idProyecto;
		$obj->listaActividades;
			$obj->listaActividades[0];
		$obj->listaTipoCuenta;
			$obj->listaTipoCuenta[0];
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
	
	function CO_crearRespuesta($codRespuesta, $mensaje) {
		$respuesta = new stdClass();
		$respuesta->codRespuesta = $codRespuesta;
		$respuesta->mensaje = $mensaje;
		
		return $respuesta;
	}

	function CO_obtenerRespuestaPositivaDeGuardadoFalsa() {
		$respuesta = new stdClass();
		$respuesta->codRespuesta = 0;
		$respuesta->mensaje = 'Ok';
		
		return $respuesta;
	}
	
	function CO_obtenerRespuestaNegativaDeGuardadoFalsa() {
		$respuesta = new stdClass();
		$respuesta->codRespuesta = -1;
		$respuesta->mensaje = 'Ola ke Arce';
		
		return $respuesta;
	}
?>