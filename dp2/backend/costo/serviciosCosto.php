<?php
	include('routesCosto.php');
	include('clasesCosto.php');
	include_once '../backend/conexion.php';

	//DEFINICIÓN DE CONSTANTES
	define('CO_PV',1);
	define('CO_EV',2);
	define('CO_AC',3);
	define('CO_CV',4);
	define('CO_CPI',5);
	define('CO_SPI',6);
	define('CO_SV',7);
	define('CO_BAC',8);
	define('CO_EAC',9);
	define('CO_ETC',10);
	define('CO_VAC',11);
	define('CO_TCPI',12);
	//FIN CONSTANTES
   
  ////########### SPRINTS ###########////
	
  ///////////SPRINT 1/////////////
	function CO_getInfoProyecto($json) { //servicio 1 //COMPLETO
		$proy = json_decode($json);
		$infoProyecto = CO_consultarInfoProyecto($proy->idProyecto);
		
		echo json_encode($infoProyecto);
	}
	
	function CO_getListaRecursos($json) { //servicio 2 //COMPLETO
		$proy = json_decode($json);
		$listaRecursos = CO_consultarListaRecursos($proy->idProyecto);
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaRecursos;
		
		echo json_encode($jsonRespuesta);
	}
	
	function CO_getListaActividades($json) { //servicio 3 //COMPLETO
		$proy = json_decode($json);
		$listaActividades = CO_consultarListaActividades($proy->idProyecto);
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaActividades;
		
		echo json_encode($jsonRespuesta);
	}
	
	function CO_getInfoActividad($json) { //servicio 4 //COMPLETO
		$proy = json_decode($json);
		$infoActividad = CO_consultarInfoActividad($proy->idProyecto, $proy->idActividad);
		
		echo json_encode($infoActividad);
	}
	
	function CO_saveCURecursos() { //servicio 5 //COMPLETO
		$request = \Slim\Slim::getInstance()->request();
    	$objeto = json_decode($request->getBody());
		$jsonRespuesta = CO_guardarCUR($objeto);
		
		echo json_encode($jsonRespuesta);
	}
	
	function CO_getListaPaquetes($json) { //servicio 6 //COMPLETO
		$proy = json_decode($json);
		$listaPaquetes = CO_consultarListaPaquetes($proy->idProyecto);
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaPaquetes;
		
		echo json_encode($jsonRespuesta);
	}
	
	function CO_saveTipoCuenta($json) { //servicio 7 //COMPLETO
		$objeto = json_decode($json);
		$jsonRespuesta = CO_guardarTipoCuenta($objeto);
		
		echo json_encode($jsonRespuesta);
	}

	function CO_getListaMonedas() { //servicio 8 //COMPLETO
		$listaMonedas = CO_consultarListaMonedas();
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaMonedas;

		echo json_encode($jsonRespuesta);
	}

	function CO_getListaUnidadesMedidas() { //servicio 9 //COMPLETO
		$listaUM = CO_consultarListaUnidadesMedida();
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaUM;

		echo json_encode($jsonRespuesta);
	}

	function CO_saveReserva() { //servicio 10 //COMPLETO
		$request = \Slim\Slim::getInstance()->request();
    	$objeto = json_decode($request->getBody());
		$jsonRespuesta = CO_guardarReserva($objeto);
		
		echo json_encode($jsonRespuesta);
	}

	function CO_getAsientosContables() { //servicio 11 //COMPLETO
		$listaUM = CO_consultarAsientosContables();
		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaUM;

		echo json_encode($jsonRespuesta);
	}
  
	///////////SPRINT 2/////////////
	function CO_getIndicadores($json) { //servicio 12 //COMPLETO
		$proy = json_decode($json);
		$year = $proy->year;
		$month = $proy->month;
		$day = $proy->day;

		$fecha = $year . $month . $day;

		$indicadores = CO_consultarIndicadores($proy->idProyecto, $fecha);

		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $indicadores;

		echo json_encode($jsonRespuesta);
	}

	function CO_saveIndicadores() { //servicio 13 //COMPLETO
		$request = \Slim\Slim::getInstance()->request();
    	$objeto = json_decode($request->getBody());
		
		$year = $objeto->year;
		$month = $objeto->month;
		$day = $objeto->day;

		/*
		if ($objeto->month < 10) {
			$month = '0' . $month;
		}

		if ($objeto->day < 10) {
			$day = '0' . $day;
		}*/

		$fecha = $year . $month . $day;
		
		$jsonRespuesta = CO_guardarIndicadores($objeto, $fecha);
		
		echo json_encode($jsonRespuesta);
	}
	
  
	///////////SPRINT 3/////////////
	function CO_getListaCuentasDesglozable($json) { //servicio 14 //COMPLETO
		$proy = json_decode($json);

		$listaCuentas= CO_consultarCuentasDesglozable($proy->idProyecto);

    	$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $listaCuentas;

		echo json_encode($jsonRespuesta);
	}

	function CO_getCostoFijoPlaneado($json) { //servicio 15//COMPLETO
		$proy = json_decode($json);

		$jsonRespuesta = new stdClass();
    	$jsonRespuesta->lista = CO_consultarCostoFijoTotalPlaneado($proy->idProyecto);
    	$jsonRespuesta->costoFijoTotalPlaneado = 0;
    	if ($jsonRespuesta->lista != null && sizeof($jsonRespuesta->lista) > 0) {
    		foreach ($jsonRespuesta->lista as $recurso) {
				$jsonRespuesta->costoFijoTotalPlaneado += $recurso->costoFijoTotal;
			}
    	}

		echo json_encode($jsonRespuesta);
	}

	function CO_getCostoFijoReal($json) { //servicio 16//COMPLETO
		$proy = json_decode($json);

		$jsonRespuesta = new stdClass();
    	$jsonRespuesta->lista = CO_consultarCostoFijoTotalReal($proy->idProyecto);
    	$jsonRespuesta->costoFijoTotalReal = 0;
    	if ($jsonRespuesta->lista != null && sizeof($jsonRespuesta->lista) > 0) {
    		foreach ($jsonRespuesta->lista as $recurso) {
				$jsonRespuesta->costoFijoTotalReal += $recurso->costoFijoTotal;
			}
    	}

		echo json_encode($jsonRespuesta);
	}

	function CO_saveCostoFijoRealProyecto($json) { //servicio 17 //COMPLETO
		$objeto = json_decode($json);
		
		/*
		if ($objeto->month < 10) {
			$month = '0' . $month;
		}

		if ($objeto->day < 10) {
			$day = '0' . $day;
		}*/

		
		$jsonRespuesta = CO_guardarCostoFijoReal($objeto);
		
		echo json_encode($jsonRespuesta);
	}

	function CO_getHistorialIndicador($json) {
		$objeto = json_decode($json);

		$jsonRespuesta = new stdClass();
    	$jsonRespuesta->lista = CO_consultarHistorialIndicador($objeto);

		echo json_encode($jsonRespuesta);
	}

	///////////FOR TESTING ONLY/////////////
	function CO_testFunction() {
		echo "add me blood999\n";
		echo "add me ANHUE blood999\n";
		echo "add me ANG blood999\n";
		echo "add me SKT blood999\n";
		echo "add me FNC blood999\n";
		echo "add me RYL blood999\n";
		echo "add me OMG blood999\n";
		echo "add me TSM blood999\n";
		echo "add me C9 blood999\n";
	}

	function CO_testFunctionPOST() {
    $request = \Slim\Slim::getInstance()->request();
    $acta = json_decode($request->getBody());
   
    echo json_encode($acta);
}
	
	//---------------------------------------------------------------
	//funciones que apoyan a los servicios.(Ordenados por número de sprint descendentemente)


	function CO_consultarIndicadores($idProyecto, $fecha) { //COMPLETO
		
		//$fecha = '20151010';

		$indicadores = array();

		$PV = CO_obtenerPV($idProyecto, $fecha) ."";
		$EV = CO_obtenerEV($idProyecto, $fecha) ."";
		$AC = CO_obtenerAC($idProyecto, $fecha) ."";
		$CV = CO_obtenerCV($EV, $AC) ."";
		$CPI = CO_obtenerCPI($EV, $AC) ."";
		$SPI = CO_obtenerSPI($EV, $PV) ."";
		$SV = CO_obtenerSV($EV, $PV) . "";
		$BAC = CO_obtenerBAC($idProyecto) . "";
		$EAC = CO_obtenerEAC($BAC, $CPI) . "";
		$ETC = CO_obtenerETC($EAC, $AC) . "";
		$VAC = CO_obtenerVAC($BAC, $EAC) . "";
		$TCPI = CO_obtenerTCPI($BAC, $EV, $EAC, $AC) . "";

		array_push($indicadores, new CO_Indicador("PV", $PV, "Planned Value"));
		array_push($indicadores, new CO_Indicador("EV", $EV, "Earned Value"));
		array_push($indicadores, new CO_Indicador("AC", $AC, "Actual Cost"));
		array_push($indicadores, new CO_Indicador("CV", $CV, "Cost Variance"));
		array_push($indicadores, new CO_Indicador("CPI", $CPI, "Cost Performance Indicator"));
		array_push($indicadores, new CO_Indicador("SPI", $SPI, "Schedule Performance Indicator"));
		array_push($indicadores, new CO_Indicador("SV", $SV, "Schedule Variance"));
		array_push($indicadores, new CO_Indicador("BAC", $BAC, "Budget At Completion"));
		array_push($indicadores, new CO_Indicador("EAC", $EAC, "Estimate At Completion"));
		array_push($indicadores, new CO_Indicador("ETC", $ETC, "Estimate To Complete"));
		array_push($indicadores, new CO_Indicador("VAC", $VAC, "Variance At Completion"));
		array_push($indicadores, new CO_Indicador("TCPI", $TCPI, "To Complete Cost Performance Indicator"));

		return $indicadores;
	}

	//funciones para obtener indicadores
	function CO_obtenerPV($idProyecto, $fecha) { //Valor planeado
		$sql = "SELECT 
		SUM(Z.VALOR_PLANEADO) VALOR_PLANEADO
		FROM
		(
		SELECT 
		SUM(H.COSTO_PLANEADO_SOLES) AS VALOR_PLANEADO
		FROM
		(
		select
		A.ID_ACTIVIDAD,
		SUM(B.CANTIDADESTIMADA*C.COSTO_UNITARIO_ESTIMADO*D.CAMBIO_A_SOL) COSTO_PLANEADO_SOLES
		FROM 
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_HISTORICO D ON C.ID_CAMBIO_MONEDA=D.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND DATE_FORMAT(A.FECHA_PLAN_FIN,'%Y%m%d')<= :fecha
		AND DATE_FORMAT(D.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_ACTIVIDAD
		UNION
		SELECT
		A.ID_ACTIVIDAD,
		SUM(IFNULL(B.CANTIDADESTIMADA,0)*IFNULL(C.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(D.CAMBIO_A_SOL,0)*((DATEDIFF(STR_TO_DATE(:fecha,'%Y%m%d'),A.FECHA_PLAN_INICIO)+1)/(DATEDIFF(A.fecha_plan_fin,A.fecha_plan_inicio)+1))) COSTO_PLANEADO_SOLES
		FROM
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_HISTORICO D ON C.ID_CAMBIO_MONEDA=D.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND DATE_FORMAT(A.FECHA_PLAN_FIN,'%Y%m%d')> :fecha
		AND DATE_FORMAT(A.FECHA_PLAN_INICIO,'%Y%m%d')<= :fecha
		AND DATE_FORMAT(D.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_ACTIVIDAD
		) H
		union
		/*PV PARA LOS COSTOS FIJOS MATERIALES*/
		SELECT
		IFNULL(SUM(A.COSTO_FIJO_DIARIO_ESTIMADO*(DATEDIFF(LEAST(DATE_FORMAT(:fecha,'%Y%m%d'),A.FECHA_PLAN_FIN_COSTO_FIJO),A.FECHA_PLAN_INICIO_COSTO_FIJO)+1)*B.CAMBIO_A_SOL),0) VALOR_PLANEADO
		FROM
		RECURSO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d') AND A.ESTADO='ACTIVO'
		AND DATE_FORMAT(A.FECHA_PLAN_INICIO_COSTO_FIJO,'%Y%m%d')<= :fecha and A.COSTO_FIJO_DIARIO_ESTIMADO>0
		) Z;";

		$valor = 0;

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->bindParam("fecha", $fecha);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
    			$valor = $p["VALOR_PLANEADO"];
			}
		} catch(PDOException $e) {
        	//$respuesta = CO_crearRespuesta(-1, $e->getMessage());
        	echo json_encode(array("me"=> $e->getMessage()));
		}

		if ($valor == null)
			$valor = 0;

		return $valor;
	}

	function CO_obtenerEV($idProyecto, $fecha) { //Valor ganado
		$sql = "SELECT 
		sum(Z.VALOR_GANADO) VALOR_GANADO
		FROM
		(
		SELECT 
		SUM(H.COSTO_PLANEADO_SOLES) AS VALOR_GANADO
		FROM
		(
		select
		A.ID_ACTIVIDAD,
		SUM(B.CANTIDADESTIMADA*C.COSTO_UNITARIO_ESTIMADO*D.CAMBIO_A_SOL) COSTO_PLANEADO_SOLES
		FROM 
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_HISTORICO D ON C.ID_CAMBIO_MONEDA=D.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND DATE_FORMAT(A.FECHA_ACTUAL_FIN,'%Y%m%d')<=:fecha
		AND DATE_FORMAT(D.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_ACTIVIDAD
		UNION
		SELECT
		A.ID_ACTIVIDAD,
		SUM(IFNULL(B.CANTIDADESTIMADA,0)*IFNULL(C.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(D.CAMBIO_A_SOL,0)*IFNULL(A.AVANCE/100,0)) COSTO_PLANEADO_SOLES
		FROM
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_HISTORICO D ON C.ID_CAMBIO_MONEDA=D.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND (DATE_FORMAT(A.FECHA_ACTUAL_FIN,'%Y%m%d')>:fecha OR A.FECHA_ACTUAL_FIN IS NULL)
		AND (DATE_FORMAT(A.FECHA_ACTUAL_INICIO,'%Y%m%d')<=:fecha OR A.FECHA_ACTUAL_INICIO IS NULL)
		AND DATE_FORMAT(D.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_ACTIVIDAD
		) H
		UNION
		/*EV PARA COSTO FIJO*/
		SELECT
		IFNULL(SUM(A.COSTO_FIJO_DIARIO_ESTIMADO*(DATEDIFF(LEAST(DATE_FORMAT(:fecha,'%Y%m%d'),A.FECHA_PLAN_FIN_COSTO_FIJO),A.FECHA_PLAN_INICIO_COSTO_FIJO)+1)*B.CAMBIO_A_SOL),0) VALOR_GANADO
		FROM
		RECURSO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.ESTADO='ACTIVO' AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND DATE_FORMAT(A.FECHA_PLAN_INICIO_COSTO_FIJO,'%Y%m%d')<=:fecha AND A.COSTO_FIJO_DIARIO_ESTIMADO>0
		) Z;";

		$valor = 0;

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->bindParam("fecha", $fecha);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
    			$valor = $p["VALOR_GANADO"];
			}
		} catch(PDOException $e) {
        	//$respuesta = CO_crearRespuesta(-1, $e->getMessage());
        	echo json_encode(array("me"=> $e->getMessage()));
		}

		if ($valor == null)
			$valor = 0;

		return $valor;
	}

	function CO_obtenerAC($idProyecto, $fecha) { //Valor actual
		$sql = "SELECT
		SUM(Z.VALOR_ACTUAL) VALOR_ACTUAL
		FROM
		(
		SELECT
		SUM(H.COSTO_REAL_SOLES) VALOR_ACTUAL
		FROM
		(
		SELECT
		A.ID_ACTIVIDAD,
		SUM(B.CANTIDADREAL*B.COSTO_UNITARIO_REAL*D.CAMBIO_A_SOL) COSTO_REAL_SOLES
		FROM
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_HISTORICO D ON C.ID_CAMBIO_MONEDA=D.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND DATE_FORMAT(A.FECHA_ACTUAL_FIN,'%Y%m%d')<=:fecha
		AND DATE_FORMAT(D.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_ACTIVIDAD
		UNION
		SELECT
		A.ID_ACTIVIDAD,
		SUM(B.CANTIDADREAL*B.COSTO_UNITARIO_REAL*D.CAMBIO_A_SOL*A.PORC_AVANCE_COSTO_ESTIMADO/100) COSTO_REAL_SOLES
		FROM
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_HISTORICO D ON C.ID_CAMBIO_MONEDA=D.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND (DATE_FORMAT(A.FECHA_ACTUAL_FIN,'%Y%m%d')>:fecha OR A.FECHA_ACTUAL_FIN IS NULL)
		AND (DATE_FORMAT(A.FECHA_ACTUAL_INICIO,'%Y%m%d')<=:fecha OR A.FECHA_ACTUAL_INICIO IS NULL)
		AND DATE_FORMAT(D.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_ACTIVIDAD
		) H
		UNION
		/*COSTOS FIJOS*/
		SELECT
		IFNULL(SUM(A.COSTO_FIJO_DIARIO_REAL*(DATEDIFF(LEAST(DATE_FORMAT(:fecha,'%Y%m%d'),A.FECHA_REAL_FIN_COSTO_FIJO),A.FECHA_REAL_INICIO_COSTO_FIJO)+1)*B.CAMBIO_A_SOL),0) VALOR_ACTUAL
		FROM
		RECURSO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.ESTADO='ACTIVO' AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND DATE_FORMAT(A.FECHA_REAL_INICIO_COSTO_FIJO,'%Y%m%d')<=:fecha AND A.COSTO_FIJO_DIARIO_REAL>0
		) Z;";

		$valor = 0;

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->bindParam("fecha", $fecha);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
    			$valor = $p["VALOR_ACTUAL"];
			}
		} catch(PDOException $e) {
        	//$respuesta = CO_crearRespuesta(-1, $e->getMessage());
        	echo json_encode(array("me"=> $e->getMessage()));
		}

		if ($valor == null)
			$valor = 0;

		return $valor;
	}

	function CO_obtenerCV($ev, $ac) { //Valor actual
		return $ev - $ac;
	}

	function CO_obtenerCPI($ev, $ac) { //Valor cpi
		if ($ac != 0)
			return $ev / $ac;
		else
			return 0;
	}

	function CO_obtenerSPI($ev, $pv) { //Valor spi
		if ($pv != 0)
			return $ev / $pv;
		else
			return 0;
	}

	function CO_obtenerSV($ev, $pv) { //Valor sv
		return $ev - $pv;
	}

	function CO_obtenerBAC($idProyecto) { //Valor bac. Este valor no depende de la fecha
		$sql = "SELECT
		SUM(Z.BAC_SOLES) BAC_SOLES
		FROM
		(
		SELECT
		SUM(IFNULL(B.CANTIDADESTIMADA,0)*IFNULL(C.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0)) BAC_SOLES
		FROM
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON C.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		UNION
		SELECT
		IFNULL(SUM(A.COSTO_FIJO_DIARIO_ESTIMADO*(DATEDIFF(A.FECHA_PLAN_FIN_COSTO_FIJO,A.FECHA_PLAN_INICIO_COSTO_FIJO)+1)*B.CAMBIO_A_SOL),0) BAC_SOLES
		FROM
		RECURSO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d') AND A.ESTADO='ACTIVO'
		and A.COSTO_FIJO_DIARIO_ESTIMADO>0
		) Z;";

		$valor = 0;

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
    			$valor = $p["BAC_SOLES"];
			}
		} catch(PDOException $e) {
        	//$respuesta = CO_crearRespuesta(-1, $e->getMessage());
        	echo json_encode(array("me"=> $e->getMessage()));
		}

		if ($valor == null)
			$valor = 0;

		return $valor;
	}

	function CO_obtenerEAC($bac, $cpi) { //Valor eac
		if ($cpi != 0)
			return $bac / $cpi;
		else
			return 0;
	}

	function CO_obtenerETC($eac, $ac) { //Valor etc
		return $eac - $ac;
	}

	function CO_obtenerVAC($bac, $eac) { //Valor vac
		return $bac - $eac;
	}

	function CO_obtenerTCPI($bac, $ev, $eac, $ac) { //Valor tcpi
		$div = $eac - $ac;
		if ($div != 0)
			return ($bac - $ev) / $div;
		else
			return 0;
	}
	//fin de funciones para obtener indicadores

	function CO_guardarIndicadores($obj, $fecha) { //COMPLETO
		//insertar en la bd...
		/*
		$obj->idProyecto;
		$obj->PV;
		$obj->EV;
		$obj->AC;
		$obj->CV;
		$obj->CPI;
		$obj->SPI;
		$obj->SV;
		$obj->day;
		$obj->month;
		$obj->year;
		*/
	/*
		$obj = new stdClass();
		$obj->idProyecto = 1;
		$obj->PV = 4016;
		$obj->EV = 4016;
		$obj->AC = 3808;
		$obj->CV = 208;
		$obj->CPI = 1.0546218487395;
		$obj->SPI = 1;
		$obj->SV = 0;
		$obj->day = 10;
		$obj->month = 10;
		$obj->year = 2015;
	*/
		
		if ($obj == null) {
			$respuesta = CO_crearRespuesta(-1, 'No se recibió información.');
			return $respuesta;
		}

		
		try {
        	CO_InsertarIndicador(CO_PV, $obj->idProyecto, $obj->PV, $fecha);
        	CO_InsertarIndicador(CO_EV, $obj->idProyecto, $obj->EV, $fecha);
        	CO_InsertarIndicador(CO_AC, $obj->idProyecto, $obj->AC, $fecha);
        	CO_InsertarIndicador(CO_CV, $obj->idProyecto, $obj->CV, $fecha);
			CO_InsertarIndicador(CO_CPI, $obj->idProyecto, $obj->CPI, $fecha);
			CO_InsertarIndicador(CO_SPI, $obj->idProyecto, $obj->SPI, $fecha);
			CO_InsertarIndicador(CO_SV, $obj->idProyecto, $obj->SV, $fecha);
			CO_InsertarIndicador(CO_BAC, $obj->idProyecto, $obj->BAC, $fecha);
			CO_InsertarIndicador(CO_EAC, $obj->idProyecto, $obj->EAC, $fecha);
			CO_InsertarIndicador(CO_ETC, $obj->idProyecto, $obj->ETC, $fecha);
			CO_InsertarIndicador(CO_VAC, $obj->idProyecto, $obj->VAC, $fecha);
			CO_InsertarIndicador(CO_TCPI, $obj->idProyecto, $obj->TCPI, $fecha);

        	$respuesta = CO_crearRespuesta(0, 'Ok' . $fecha);

		} catch(PDOException $e) {
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
	
		//obtener respuesta falsa;
		//$respuesta = CO_obtenerRespuestaPositivaDeGuardadoFalsa();
		
		return $respuesta;
	}

	function CO_InsertarIndicador($idIndicador, $idProyecto, $valor, $fecha) {
		$sql = "INSERT INTO INDICADOR_X_PROYECTO(id_indicador,id_proyecto,fecha,valor) VALUES (:idIndicador,:idProyecto,STR_TO_DATE(:fecha,'%Y%m%d'),:valor);
				COMMIT;";

		$db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("idIndicador", $idIndicador);
    	$stmt->bindParam("idProyecto", $idProyecto);
    	$stmt->bindParam("valor", $valor);
		$stmt->bindParam("fecha", $fecha);
    	$stmt->execute();
    	$db = null;
	}


	//////////SPRINT 1
	function CO_consultarInfoProyecto($idProyecto) { //COMPLETO
		$sql = "SELECT
		H.ID_PROYECTO,
		IFNULL(H.NOMBRE_PROYECTO,'') NOMBRE_PROYECTO,
		IFNULL(H.PORCENTAJE_RESERVA,0) PORCENTAJE_RESERVA,
		SUM(IFNULL(H.PRESUP_SOLES,0)) PRESUP_SOLES
		FROM
		(
		select
		A.ID_PROYECTO,
		A.NOMBRE_PROYECTO,
		A.PORCENTAJE_RESERVA,
		SUM(IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(D.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0))) PRESUP_SOLES
		from 
		PROYECTO A LEFT JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		LEFT JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		LEFT JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		((B.ID_PROYECTO IS NULL OR C.ID_ACTIVIDAD IS NULL OR D.ID_RECURSO IS NULL
		)
		OR
		(DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND D.ESTADO<>'ELIMINADO' AND C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1))
		AND
		A.ID_PROYECTO= :idProyecto
		GROUP BY
		A.ID_PROYECTO,
		A.NOMBRE_PROYECTO,
		A.PORCENTAJE_RESERVA
		UNION /*COSTO FIJO*/
		SELECT
		A.ID_PROYECTO,
		A.NOMBRE_PROYECTO,
		A.PORCENTAJE_RESERVA,
		SUM(B.COSTO_FIJO_DIARIO_ESTIMADO*(DATEDIFF(B.FECHA_PLAN_FIN_COSTO_FIJO,B.FECHA_PLAN_INICIO_COSTO_FIJO)+1)*X.CAMBIO_A_SOL) PRESUP_SOLES
		FROM
		PROYECTO A JOIN RECURSO B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN CAMBIO_HISTORICO X ON B.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND B.ESTADO='ACTIVO' AND B.COSTO_FIJO_DIARIO_ESTIMADO>0
		AND DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_PROYECTO,
		A.NOMBRE_PROYECTO,
		A.PORCENTAJE_RESERVA
		) H
		GROUP BY
		H.ID_PROYECTO,
		H.NOMBRE_PROYECTO,
		H.PORCENTAJE_RESERVA;";

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$proyecto = null; //new CO_Proyecto(1, 'El proyecto de Carlitox', 999.0, 0.2, 999.99);
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$proyecto = new CO_Proyecto($p["ID_PROYECTO"], $p["NOMBRE_PROYECTO"], $p["PORCENTAJE_RESERVA"], $p["PRESUP_SOLES"]);
					$proyecto->indicadorCerrado = "";
					$proyecto->indicadorLineaBase = "";
					break;
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
	
	function CO_consultarListaRecursos($idProyecto) { //COMPLETO
		$sql = "SELECT 
		A.ID_RECURSO,
		A.ID_UNIDAD_MEDIDA,
		A.ID_CAMBIO_MONEDA,
		A.DESCRIPCION,
		Y.DESCRIPCION MONEDA,
		Z.DESCRIPCION UNIDAD_MEDIDA,
		DATE_FORMAT(A.FECHA_PLAN_INICIO_COSTO_FIJO,'%d-%m-%Y') FECHA_INICIO,
		DATE_FORMAT(A.FECHA_PLAN_FIN_COSTO_FIJO,'%d-%m-%Y') FECHA_FIN,
		SUM(
		CASE
		WHEN C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1 THEN IFNULL(C.CANTIDADESTIMADA,0)
		ELSE 0
		END
		) CANTIDAD_NECESARIA,
		A.COSTO_UNITARIO_ESTIMADO COSTO_PROM_SOLES,
		IFNULL(A.COSTO_FIJO_DIARIO_ESTIMADO,0) COSTO_FIJO_DIARIO_ESTIMADO,
		(
		CASE 
		WHEN A.ID_MIEMBROS_EQUIPO IS NULL THEN FALSE ELSE TRUE
		END
		) IND_RECURSO_HUMANO
		FROM
		RECURSO A LEFT JOIN ACTIVIDAD_X_RECURSO C ON A.ID_RECURSO=C.ID_RECURSO 
		LEFT JOIN ACTIVIDAD B ON C.ID_ACTIVIDAD=B.ID_ACTIVIDAD AND A.ID_PROYECTO=B.ID_PROYECTO
		JOIN CAMBIO_MONEDA Y ON A.ID_CAMBIO_MONEDA=Y.ID_CAMBIO_MONEDA
		JOIN UNIDAD_MEDIDA Z ON A.ID_UNIDAD_MEDIDA=Z.ID_UNIDAD_MEDIDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.ESTADO<>'ELIMINADO' 
		GROUP BY
		A.ID_RECURSO,
		A.ID_UNIDAD_MEDIDA,
		A.DESCRIPCION,
		Y.DESCRIPCION,
		Z.DESCRIPCION,
		A.COSTO_UNITARIO_ESTIMADO,
		IFNULL(A.COSTO_FIJO_DIARIO_ESTIMADO,0),
		(
		CASE 
		WHEN A.ID_MIEMBROS_EQUIPO IS NULL THEN FALSE ELSE TRUE
		END
		)
		;";

		$listaRecursos = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        									//id recurso, 	idunidad medida, 			unidad medida, 				nombre recurso, 	id moneda, 		moneda, 	cantidad estimada, 			costo unitario, 		costo fijo diario, 		costo fijo total, indicador rrhh
					$recurso = new CO_Recurso($p["ID_RECURSO"], $p["ID_UNIDAD_MEDIDA"], $p["UNIDAD_MEDIDA"], $p["DESCRIPCION"], $p["ID_CAMBIO_MONEDA"], $p["MONEDA"], $p["CANTIDAD_NECESARIA"], $p["COSTO_PROM_SOLES"], $p["COSTO_FIJO_DIARIO_ESTIMADO"], -1, $p["IND_RECURSO_HUMANO"]);
					$recurso->fechaInicio = $p["FECHA_INICIO"];
					$recurso->fechaFin = $p["FECHA_FIN"];
					array_push($listaRecursos, $recurso);
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
	
	function CO_consultarListaActividades($idProyecto) { //COMPLETO
		$sql = "SELECT
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		IFNULL(Y.DESCRIPCION,'') ASIENTO_CONTABLE,
		SUM(IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(Z.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0))) COSTO_ACTIVIDAD_SOLES
		from 
		PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		LEFT JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		LEFT JOIN RECURSO Z ON C.ID_RECURSO=Z.ID_RECURSO
		LEFT JOIN CAMBIO_HISTORICO X ON Z.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		LEFT JOIN ASIENTO_CONTABLE Y ON B.ID_ASIENTO_CONTABLE=Y.ID_ASIENTO_CONTABLE
		WHERE
		((B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1 AND (C.ID_ACTIVIDAD IS NULL OR Z.ID_RECURSO IS NULL OR X.ID_CAMBIO_MONEDA IS NULL 
		OR Y.ID_ASIENTO_CONTABLE IS NULL))
		OR 
		(
		DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND Z.ESTADO<>'ELIMINADO' AND C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1))
		AND
		A.ID_PROYECTO= :idProyecto AND C.ESTADO<>0
		GROUP BY
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		IFNULL(Y.DESCRIPCION,'');";

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$listaActividades = array();
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        															//id actividad, nombre act, tipo cuenta, costo, lista recursos
					array_push($listaActividades, new CO_Actividad($p["ID_ACTIVIDAD"], $p["NOMBRE_ACTIVIDAD"], $p["ASIENTO_CONTABLE"], $p["COSTO_ACTIVIDAD_SOLES"], null));
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
		unset($actividad);
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		//$listaActividades = CO_obtenerListaActividadesFalsa();
		
		return $listaActividades;
	}
	
	function CO_consultarRecursosXActividad($idProyecto, $idActividad) { //COMPLETO
		$sql = "SELECT
		A.ID_ACTIVIDAD,
		A.ID_PROYECTO,
		B.ID_RECURSO,
		C.DESCRIPCION NOMBRE_RECURSO,
		Z.ID_UNIDAD_MEDIDA,
		Z.DESCRIPCION UNIDAD_MEDIDA,
		IFNULL(C.COSTO_UNITARIO_ESTIMADO,0) COSTO_UNIT_SOLES,
		B.CANTIDADESTIMADA,
		C.ID_CAMBIO_MONEDA,
		X.DESCRIPCION MONEDA
		FROM
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_MONEDA X ON C.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		JOIN UNIDAD_MEDIDA Z ON C.ID_UNIDAD_MEDIDA=Z.ID_UNIDAD_MEDIDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.ID_ACTIVIDAD= :idActividad
		AND C.ESTADO<>'ELIMINADO' AND B.ESTADO<>0
		GROUP BY
		A.ID_ACTIVIDAD,
		A.ID_PROYECTO,
		B.ID_RECURSO,
		C.DESCRIPCION ,
		Z.ID_UNIDAD_MEDIDA,
		Z.DESCRIPCION ,
		C.COSTO_UNITARIO_ESTIMADO,
		B.CANTIDADESTIMADA,
		C.ID_CAMBIO_MONEDA,
		X.DESCRIPCION;";
		
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
        													//id recurso, idunidad medida, unidad medida, nombre recurso, id moneda, moneda, cantidad estimada, costo unitario, costo fijo diario, costo fijo total, indicador rrhh
				array_push($listaRecursos, new CO_Recurso($p["ID_RECURSO"], $p["ID_UNIDAD_MEDIDA"], $p["UNIDAD_MEDIDA"], $p["NOMBRE_RECURSO"], $p["ID_CAMBIO_MONEDA"], $p["MONEDA"], $p["CANTIDADESTIMADA"], $p["COSTO_UNIT_SOLES"], -1, -1, -1));
			}
		} catch(PDOException $e) {
        	echo json_encode(array("me"=> $e->getMessage()));
		}
	
		return $listaRecursos;
	}

	function CO_consultarInfoActividad($idProyecto, $idActividad) { //COMPLETO
		$sql = "SELECT
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		IFNULL(Y.DESCRIPCION,'') ASIENTO_CONTABLE,
		SUM(C.CANTIDADESTIMADA*(D.COSTO_UNITARIO_ESTIMADO*X.CAMBIO_A_SOL)) COSTO_ACTIVIDAD_SOLES
		from 
		PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		LEFT JOIN ASIENTO_CONTABLE Y ON B.ID_ASIENTO_CONTABLE=Y.ID_ASIENTO_CONTABLE
		WHERE
		DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND
		A.ID_PROYECTO= :idProyecto AND B.ID_ACTIVIDAD = :idActividad
		AND D.ESTADO<>'ELIMINADO' AND C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1
		GROUP BY
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		IFNULL(Y.DESCRIPCION,'') ;";

		$actividad = null;
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->bindParam("idActividad", $idActividad);
        	$stmt->execute();
        	$db = null;
        	$listaRecursos = array();
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
												//id actividad, nombre act, tipo cuenta, costo, lista recursos
				$actividad = new CO_Actividad($p["ID_ACTIVIDAD"], $p["NOMBRE_ACTIVIDAD"], $p["ASIENTO_CONTABLE"], $p["COSTO_ACTIVIDAD_SOLES"], null);
			}

			if ($actividad != null) {
				$listaRecursos = CO_consultarRecursosXActividad($idProyecto, $actividad->idActividad);
				$actividad->listaRecursos = $listaRecursos;
			}

		} catch(PDOException $e) {
        	echo json_encode(array("me"=> $e->getMessage()));
		}
		
		return $actividad;
	}
	
	function CO_guardarCUR($obj) { //CORREGIR QUERIES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
		
		if ($obj == null) {
			$respuesta = CO_crearRespuesta(-1, 'No se recibió información.');
			return $respuesta;
		}

		try {
        	//Para actualizar cada recurso
        	$sql = "UPDATE RECURSO /*VALIDAR SI SE MODIFICA FECHA PLANIFICADA O REAL*/
			SET ID_UNIDAD_MEDIDA= :idUnidadMedida, ID_CAMBIO_MONEDA= :idMoneda, 
			COSTO_UNITARIO_ESTIMADO= :costoUnitario, ESTADO='ACTIVO',COSTO_FIJO_DIARIO_ESTIMADO= :costoFijo,
			FECHA_PLAN_INICIO_COSTO_FIJO=STR_TO_DATE(:fechaI,'%Y%m%d') ,
			FECHA_PLAN_FIN_COSTO_FIJO=STR_TO_DATE(:fechaF,'%Y%m%d')
			WHERE
			ID_RECURSO= :idRecurso;
			COMMIT;";

			if ($obj->listaRecursosModificar != null) {
	        	foreach ($obj->listaRecursosModificar as $recurso) {
	        		$db = getConnection();
		        	$stmt = $db->prepare($sql);
		        	$stmt->bindParam("idUnidadMedida", $recurso->idUnidadMedida);
		        	$stmt->bindParam("idMoneda", $recurso->idMoneda);
		        	$stmt->bindParam("costoUnitario", $recurso->CostoUnitario);
		        	$stmt->bindParam("idRecurso", $recurso->idRecurso);
		        	$stmt->bindParam("costoFijo", $recurso->costoFijo);

		        	$yearI = $recurso->yearI;
					$monthI = $recurso->monthI;
					$dayI = $recurso->dayI;

					$yearF = $recurso->yearF;
					$monthF = $recurso->monthF;
					$dayF = $recurso->dayF;

					$fechaI = $yearI . $monthI . $dayI;
					$fechaF = $yearF . $monthF . $dayF;

					$stmt->bindParam("fechaI", $fechaI);
					$stmt->bindParam("fechaF", $fechaF);

		        	$stmt->execute();
		        	$db = null;
				}
				unset($recurso);
			}

			//Para crear recursos
			$sql = "INSERT INTO RECURSO (ID_UNIDAD_MEDIDA,DESCRIPCION,ID_PROYECTO,COSTO_UNITARIO_ESTIMADO,
			ID_CAMBIO_MONEDA,ESTADO,COSTO_FIJO_DIARIO_ESTIMADO,FECHA_PLAN_INICIO_COSTO_FIJO,FECHA_PLAN_FIN_COSTO_FIJO)
			VALUES
			(:idUnidadMedida, :nombreRecurso, :idProyecto, :costoUnitario, :idMoneda,'ACTIVO', :costoFijo,
			STR_TO_DATE(:fechaI,'%Y%m%d'),STR_TO_DATE(:fechaF,'%Y%m%d'));
			COMMIT;";

			if ($obj->listaRecursosCrear != null) {
	        	foreach ($obj->listaRecursosCrear as $recurso) {
	        		$db = getConnection();
		        	$stmt = $db->prepare($sql);
		        	$stmt->bindParam("idUnidadMedida", $recurso->idUnidadMedida);
		        	$stmt->bindParam("nombreRecurso", $recurso->nombreRecurso);
		        	$stmt->bindParam("idProyecto", $obj->idProyecto);
		        	$stmt->bindParam("costoUnitario", $recurso->CostoUnitario);
		        	$stmt->bindParam("idMoneda", $recurso->idMoneda);
					$stmt->bindParam("costoFijo", $recurso->costoFijo);

					$yearI = $recurso->yearI;
					$monthI = $recurso->monthI;
					$dayI = $recurso->dayI;

					$yearF = $recurso->yearF;
					$monthF = $recurso->monthF;
					$dayF = $recurso->dayF;

					/*
					if ($recurso->month < 10) {
						$month = '0' . $month;
					}

					if ($recurso->day < 10) {
						$day = '0' . $day;
					}*/

					$fechaI = $yearI . $monthI . $dayI;
					$fechaF = $yearF . $monthF . $dayF;

					$stmt->bindParam("fechaI", $fechaI);
					$stmt->bindParam("fechaF", $fechaF);

		        	$stmt->execute();
		        	$db = null;
				}
				unset($recurso);
			}

			//Para eliminar lógicamente los recursos
			$sql = "UPDATE RECURSO
			SET ESTADO='ELIMINADO'
			WHERE
			ID_RECURSO= :idRecurso AND ID_PROYECTO= :idProyecto;
			COMMIT;";

			if ($obj->listaRecursosEliminar != null) {
	        	foreach ($obj->listaRecursosEliminar as $recurso) {
	        		$db = getConnection();
		        	$stmt = $db->prepare($sql);
		        	$stmt->bindParam("idRecurso", $recurso->idRecurso);
		        	$stmt->bindParam("idProyecto", $obj->idProyecto);
		        	$stmt->execute();
		        	$db = null;
				}
				unset($recurso);
			}

        	$respuesta = CO_crearRespuesta(0, 'Ok');

		} catch(PDOException $e) {
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
		//obtener respuesta falsa;
		//$respuesta = CO_obtenerRespuestaNegativaDeGuardadoFalsa();
		
		return $respuesta;
	}

	function CO_consultarListaPaquetes($idProyecto) { //COMPLETO
		//obtener paquete raíz
		$sql = "SELECT
		A.ID_PROYECTO,
		Y.ID_PAQUETE_TRABAJO,
		Y.NOMBRE NOMBRE_PAQUETE,
		0 as COSTO_PAQUETE_SOLES
		from 
		PROYECTO A 
		JOIN EDT Z ON A.ID_PROYECTO=Z.ID_PROYECTO
		JOIN PAQUETE_TRABAJO Y ON Z.ID_EDT=Y.ID_EDT
		WHERE
		Y.ID_COMPONENTE_PADRE IS NULL 
		AND
		A.ID_PROYECTO= :idProyecto AND Z.ID_ESTADO<>4
		GROUP BY
		A.ID_PROYECTO,
		Y.ID_PAQUETE_TRABAJO,
		Y.NOMBRE;";

		$paqueteRaiz = null;
		$listaPaquetes = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
												//id paqute, nombre paquete, lista de paquetes hijo
				$paqueteRaiz = new CO_Paquete($p["ID_PAQUETE_TRABAJO"], $p["NOMBRE_PAQUETE"], $p["COSTO_PAQUETE_SOLES"], null);
			}

			if ($paqueteRaiz != null) {
				CO_obtenerPaquetesHijo($paqueteRaiz);
				$jsonRespuesta = new stdClass();
				$jsonRespuesta->raiz = $paqueteRaiz;
				//echo 'aaaa';
				$paqueteRaiz->sumarCostosPaquete();
				array_push($listaPaquetes, $paqueteRaiz);
			}

		} catch(PDOException $e) {
			$respuesta = CO_crearRespuesta(-1, $e->getMessage());
			$listaPaquetes = null;
		}
		//se llamara una funcion que devuelve data falsa por mientras.		
		//$listaPaquetes = CO_obtenerListaPaquetesFalsa();
		
		return $listaPaquetes;
	}

	function CO_obtenerPaquetesHijo(&$paquete) {
		if ($paquete != null) {

			$sql = "SELECT
			A.ID_PROYECTO,
			Y.ID_PAQUETE_TRABAJO,
			Y.NOMBRE NOMBRE_PAQUETE,
			SUM(CASE
			WHEN B.ID_PAQUETE_TRABAJO IS NULL OR C.ID_ACTIVIDAD IS NULL OR D.ID_RECURSO IS NULL OR X.ID_CAMBIO_MONEDA IS NULL THEN 0
			WHEN B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1  AND Z.ID_ESTADO<>4 AND D.ESTADO<>'ELIMINADO' AND C.ESTADO<>0
				THEN IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(D.COSTO_UNITARIO_ESTIMADO*CAMBIO_A_SOL,0))
			ELSE 0	
			END
			) COSTO_PAQUETE_SOLES
			from 
			PROYECTO A 
			JOIN EDT Z ON A.ID_PROYECTO=Z.ID_PROYECTO
			JOIN PAQUETE_TRABAJO Y ON Z.ID_EDT=Y.ID_EDT
			LEFT JOIN ACTIVIDAD B ON Y.ID_PAQUETE_TRABAJO=B.ID_PAQUETE_TRABAJO
			LEFT JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
			LEFT JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
			LEFT JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
			WHERE
			Y.ID_COMPONENTE_PADRE= :idPaquete AND (X.FECHA IS NULL OR DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d'))
			GROUP BY
			A.ID_PROYECTO,
			Y.ID_PAQUETE_TRABAJO,
			Y.NOMBRE;";

			$listaPaquetesHijo = array();
			try {
				$db = getConnection();
	        	$stmt = $db->prepare($sql);
	        	$stmt->bindParam("idPaquete", $paquete->idPaquete);
	        	$stmt->execute();
	        	$db = null;
	        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
													//id paqute, nombre paquete, lista de paquetes hijo
					$paqueteHijo = new CO_Paquete($p["ID_PAQUETE_TRABAJO"], $p["NOMBRE_PAQUETE"], $p["COSTO_PAQUETE_SOLES"], null);
					array_push($listaPaquetesHijo, $paqueteHijo);
				}

				$paquete->listaPaquetesHijo = $listaPaquetesHijo;

			} catch(PDOException $e) {
				$respuesta = CO_crearRespuesta(-1, $e->getMessage());
				$listaPaquetes = null;
				echo json_encode($respuesta);
				return;
			}

			//echo 'paquete <' . $paquete->idPaquete . '>';
			//echo sizeof($paquete->listaPaquetesHijo);
			foreach ($paquete->listaPaquetesHijo as $hijo) {
				CO_obtenerPaquetesHijo($hijo);
			}

			return;
		}
		return;
	}
	
	function CO_guardarTipoCuenta($obj) { //COMPLETO
		//insertar en la bd...
		/*
		$obj->idProyecto;
		$obj->listaActividades;
			$obj->listaActividades[0];
		$obj->listaTipoCuenta;
			$obj->listaTipoCuenta[0];
		*/
		
		try {
        	//Para actualizar el tipo de cuenta
			$sql = "
        	UPDATE ACTIVIDAD
			SET
			ID_ASIENTO_CONTABLE= :tipo
			WHERE
			ID_ACTIVIDAD= :idActividad;
			COMMIT;";

			if ($obj->listaActividades != null) {
	        	foreach ($obj->listaActividades as $actividad) {
	        		$db = getConnection();
		        	$stmt = $db->prepare($sql);
		        	$stmt->bindParam("tipo", $actividad->tipo);
		        	$stmt->bindParam("idActividad", $actividad->idActividad);
		        	$stmt->execute();
		        	$db = null;
				}
				unset($actividad);
			}

        	$respuesta = CO_crearRespuesta(0, 'Ok');

		} catch(PDOException $e) {
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
		//obtener respuesta falsa;
		//$respuesta = CO_obtenerRespuestaPositivaDeGuardadoFalsa();
		
		return $respuesta;
	}

	function CO_consultarListaMonedas() { //COMPLETO
		$sql = "SELECT
		A.ID_CAMBIO_MONEDA,
		A.DESCRIPCION,
		B.CAMBIO_A_SOL,
		B.CAMBIO_DESDE_SOL
		FROM
		CAMBIO_MONEDA A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d');";

		$listaMonedas = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        																//id moneda, nombre, tipo de cambio a sol, tipo de cambio desde sol
					array_push($listaMonedas, new CO_Moneda($p["ID_CAMBIO_MONEDA"], $p["DESCRIPCION"], $p["CAMBIO_A_SOL"], $p["CAMBIO_DESDE_SOL"]));
			}
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		//$listaMonedas = CO_obtenerListaMonedasFalsa();
		
		return $listaMonedas;
	}

	function CO_consultarListaUnidadesMedida() { //COMPLETO
		$sql = "SELECT
		ID_UNIDAD_MEDIDA,
		DESCRIPCION
		FROM
		UNIDAD_MEDIDA;";

		$listaUM = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        																//id UM, descripción
					array_push($listaUM, new CO_UnidadMedida($p["ID_UNIDAD_MEDIDA"], $p["DESCRIPCION"]));
			}
		} catch(PDOException $e) {
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		return $listaUM;
	}

	function CO_guardarReserva($obj) { //COMPLETO
		//Para el porcentaje de reserva
		try {
			$sql = "UPDATE PROYECTO
			SET PORCENTAJE_RESERVA= :porcReserva
			WHERE
			ID_PROYECTO= :idProyecto;";

			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("porcReserva", $obj->porcReserva);
        	$stmt->bindParam("idProyecto", $obj->idProyecto);
        	$stmt->execute();
        	$db = null;

        	$respuesta = CO_crearRespuesta(0, 'Ok');
        } catch(PDOException $e) {
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
		return $respuesta;
	}

	function CO_consultarAsientosContables() { //COMPLETO
		$sql = "SELECT ID_ASIENTO_CONTABLE,DESCRIPCION FROM ASIENTO_CONTABLE;";

		$listaUM = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        																//id, descripción
					array_push($listaUM, new CO_AsientoContable($p["ID_ASIENTO_CONTABLE"], $p["DESCRIPCION"]));
			}
		} catch(PDOException $e) {
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		return $listaUM;
	}
  
  function CO_consultarCuentasDesglozable($idProyecto) { //COMPLETO
		//obtener lista de cuentas
		$sql = "SELECT 
		A.ID_PROYECTO,
		B.ID_ASIENTO_CONTABLE,
		B.DESCRIPCION,
		SUM(IFNULL(C.CANTIDADESTIMADA*D.COSTO_UNITARIO_ESTIMADO*E.CAMBIO_A_SOL,0)) COSTO_SOLES_CUENTA
		FROM 
		ACTIVIDAD A join ASIENTO_CONTABLE B ON A.ID_ASIENTO_CONTABLE=B.ID_ASIENTO_CONTABLE
		JOIN ACTIVIDAD_X_RECURSO C ON A.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO E ON D.ID_CAMBIO_MONEDA=E.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1
		AND C.ESTADO<>0 AND D.ESTADO<>'ELIMINADO'
		AND DATE_FORMAT(E.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_PROYECTO,
		B.ID_ASIENTO_CONTABLE,
		B.DESCRIPCION;";

		$cuentasRaiz = null;
		$listaCuentas = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
														//id, nombre cuenta, lista de actividades
				array_push($listaCuentas, new CO_Cuenta($p["ID_ASIENTO_CONTABLE"], $p["DESCRIPCION"], $p["COSTO_SOLES_CUENTA"], null));
			}

			//
	    	if ($listaCuentas != null) {
	    		foreach ($listaCuentas as $cuenta) {
					$listaActividades = CO_consultarActividadXCuenta($idProyecto, $cuenta->id);
					$cuenta->listaActividades = $listaActividades;
					if ($listaActividades == null || sizeof($listaActividades) == 0) {
						$cuenta->mensaje = "Aun falta asignar cuentas contables a las actividades.";
					}
				}
	    	}
      
		} catch(PDOException $e) {
			$respuesta = CO_crearRespuesta(-1, $e->getMessage());
			$listaCuentas = null;
		}
		
    return $listaCuentas;
	}

	function CO_consultarActividadXCuenta($idProyecto, $idCuenta) { //COMPLETO
		$sql = "SELECT 
		A.ID_ACTIVIDAD,
		A.NOMBRE_ACTIVIDAD,
		SUM(IFNULL(C.CANTIDADESTIMADA,0)*IFNULL(D.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(E.CAMBIO_A_SOL,0)) COSTO_SOLES_ACTIVIDAD
		FROM 
		ACTIVIDAD A 
		LEFT JOIN ACTIVIDAD_X_RECURSO C ON A.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		LEFT JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		LEFT JOIN CAMBIO_HISTORICO E ON D.ID_CAMBIO_MONEDA=E.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND A.ID_ASIENTO_CONTABLE= :idCuenta
		AND C.ESTADO<>0 AND D.ESTADO<>'ELIMINADO'
		AND (E.FECHA IS NULL OR DATE_FORMAT(E.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d'))
		GROUP BY
		A.ID_ACTIVIDAD,
		A.NOMBRE_ACTIVIDAD;";
		
		$listaActividades = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->bindParam("idCuenta", $idCuenta);
        	$stmt->execute();
        	$db = null;
        	$listaRecursos = array();
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
    														//id actividad, nombre act, tipo cuenta, costo, lista recursos
				array_push($listaActividades, new CO_Actividad($p["ID_ACTIVIDAD"], $p["NOMBRE_ACTIVIDAD"], $idCuenta, $p["COSTO_SOLES_ACTIVIDAD"], null));
			}
		} catch(PDOException $e) {
        	echo json_encode(array("me"=> $e->getMessage()));
		}
	
		return $listaActividades;
	}

	function CO_consultarCostoFijoTotalPlaneado($idProyecto) { //COMPLETO
		$sql = "SELECT
		A.ID_RECURSO,
		A.ID_UNIDAD_MEDIDA,
		B.DESCRIPCION NOMBRE_UNIDAD_MEDIDA,
		A.DESCRIPCION,
		A.ID_CAMBIO_MONEDA,
		C.DESCRIPCION NOMBRE_MONEDA,
		IFNULL(A.COSTO_FIJO_DIARIO_ESTIMADO,0) COSTO_FIJO_DIARIO,
		IFNULL(A.COSTO_FIJO_DIARIO_ESTIMADO,0)*(DATEDIFF(A.FECHA_PLAN_FIN_COSTO_FIJO,A.FECHA_PLAN_INICIO_COSTO_FIJO)+1) COSTO_FIJO_TOTAL
		FROM
		RECURSO A JOIN UNIDAD_MEDIDA B ON A.ID_UNIDAD_MEDIDA=B.ID_UNIDAD_MEDIDA
		JOIN CAMBIO_MONEDA C ON A.ID_CAMBIO_MONEDA=C.ID_CAMBIO_MONEDA
		WHERE 
		A.ID_PROYECTO= :idProyecto AND A.ESTADO='ACTIVO' AND A.COSTO_FIJO_DIARIO_ESTIMADO>0;";

		$listaRecursos = array();

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        													//id recurso, 	idunidad medida, 			unidad medida, 				nombre recurso, 	id moneda, 		moneda, cantidad estimada, costo unitario, costo fijo diario, costo fijo total, indicador rrhh
				array_push($listaRecursos, new CO_Recurso($p["ID_RECURSO"], $p["ID_UNIDAD_MEDIDA"], $p["NOMBRE_UNIDAD_MEDIDA"], $p["DESCRIPCION"], $p["ID_CAMBIO_MONEDA"], $p["NOMBRE_MONEDA"], -1, -1, $p["COSTO_FIJO_DIARIO"], $p["COSTO_FIJO_TOTAL"], -1));
			}
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}
		
		return $listaRecursos;
	}

	function CO_consultarCostoFijoTotalReal($idProyecto) { //COMPLETO
		$sql = "SELECT
		A.ID_RECURSO,
		A.ID_PROYECTO,
		A.DESCRIPCION,
		A.ID_UNIDAD_MEDIDA,
		B.DESCRIPCION NOMBRE_UNIDAD_MEDIDA,
		A.ID_CAMBIO_MONEDA,
		C.DESCRIPCION NOMBRE_MONEDA,
		IFNULL(A.COSTO_FIJO_DIARIO_REAL,0) COSTO_FIJO_DIARIO_REAL,
		IFNULL(DATE_FORMAT(A.FECHA_REAL_INICIO_COSTO_FIJO,'%d-%m-%Y'),0) FECHA_INICIO,
		IFNULL(DATE_FORMAT(A.FECHA_REAL_FIN_COSTO_FIJO,'%d-%m-%Y'),0) FECHA_FIN,
		IFNULL(A.COSTO_FIJO_DIARIO_REAL,0)*(DATEDIFF(A.FECHA_REAL_FIN_COSTO_FIJO,A.FECHA_REAL_INICIO_COSTO_FIJO)+1) COSTO_FIJO_TOTAL
		FROM
		RECURSO A JOIN UNIDAD_MEDIDA B ON A.ID_UNIDAD_MEDIDA=B.ID_UNIDAD_MEDIDA
		JOIN CAMBIO_MONEDA C ON  A.ID_CAMBIO_MONEDA=C.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.ESTADO='ACTIVO' AND A.COSTO_FIJO_DIARIO_ESTIMADO>0
		AND A.ID_MIEMBROS_EQUIPO IS NULL;";

		$listaRecursos = array();

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
												//id recurso, 	idunidad medida, 			unidad medida, 				nombre recurso, 	id moneda, 		moneda, cantidad estimada, costo unitario, costo fijo diario, costo fijo total, indicador rrhh
        		$recurso = new CO_Recurso($p["ID_RECURSO"], $p["ID_UNIDAD_MEDIDA"], $p["NOMBRE_UNIDAD_MEDIDA"], $p["DESCRIPCION"], $p["ID_CAMBIO_MONEDA"], $p["NOMBRE_MONEDA"], -1, -1, $p["COSTO_FIJO_DIARIO_REAL"], $p["COSTO_FIJO_TOTAL"], -1);
				$recurso->fechaInicio = $p["FECHA_INICIO"];
				$recurso->fechaFin = $p["FECHA_FIN"];
				array_push($listaRecursos, $recurso);
			}
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}
		
		return $listaRecursos;
	}

	function CO_guardarCostoFijoReal($obj) { //
		//insertar en la bd...
		/*
		$obj->idProyecto;
		$obj->listaActividades;
			$obj->listaActividades[0];
		$obj->listaTipoCuenta;
			$obj->listaTipoCuenta[0];
		*/
		
		try {
			$sql = "UPDATE RECURSO
			SET
			COSTO_FIJO_DIARIO_REAL= :costoFijoDiarioReal,FECHA_REAL_INICIO_COSTO_FIJO=STR_TO_DATE(:fechaI,'%Y%m%d'),
			FECHA_REAL_FIN_COSTO_FIJO=STR_TO_DATE(:fechaF,'%Y%m%d')
			WHERE ID_PROYECTO=:idProyecto AND ID_RECURSO=:idRecurso;
			COMMIT;";

			if ($obj->listaRecursos != null) {
	        	foreach ($obj->listaRecursos as $recurso) {
	        		$db = getConnection();
		        	$stmt = $db->prepare($sql);
					$yearI = $recurso->yearI;
					$monthI = $recurso->monthI;
					$dayI = $recurso->dayI;

					$yearF = $recurso->yearF;
					$monthF = $recurso->monthF;
					$dayF = $recurso->dayF;

					$fechaI = $yearI . $monthI . $dayI;
					$fechaF = $yearF . $monthF . $dayF;
		        	$stmt->bindParam("idProyecto", $obj->idProyecto);
		        	$stmt->bindParam("idRecurso", $recurso->idRecurso);
		        	$stmt->bindParam("costoFijoDiarioReal", $recurso->costoFijoDiarioReal);
		        	$stmt->bindParam("fechaI", $fechaI);
		        	$stmt->bindParam("fechaF", $fechaF);
		        	$stmt->execute();
		        	$db = null;
				}
				unset($actividad);
			}

        	$respuesta = CO_crearRespuesta(0, 'Ok');

		} catch(PDOException $e) {
        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
		//obtener respuesta falsa;
		//$respuesta = CO_obtenerRespuestaPositivaDeGuardadoFalsa();
		
		return $respuesta;
	}

	function CO_consultarHistorialIndicador($obj) { //

		$listaIndicadores = CO_obtenerIndidacoresRelacionados($obj->indicador);

		$sql = "SELECT
		A.ID_INDICADOR,
		B.NOMBRE,
		A.VALOR,
		DATE_FORMAT(A.FECHA,'%d-%m-%Y') FECHA
		FROM 
		INDICADOR_X_PROYECTO A JOIN INDICADOR B ON A.ID_INDICADOR=B.ID_INDICADOR
		WHERE
		DATE_FORMAT(A.FECHA,'%Y%m%d') <= :fecha
		AND A.ID_INDICADOR= :idIndicador
		AND A.ID_PROYECTO = :idProyecto
		ORDER BY A.FECHA;";

		$listaHistorialIndicadores = array();

		if ($listaIndicadores != null) {
			foreach ($listaIndicadores as $tempInd) {
				$indicador = new stdClass();
				$indicador->nombre = $tempInd->nombre;
				$listaValores = array();
				try {
					$db = getConnection();
		        	$stmt = $db->prepare($sql);
		        	$stmt->bindParam("idProyecto", $obj->idProyecto);
		        	$stmt->bindParam("idIndicador", $tempInd->id);
		        	$stmt->bindParam("fecha", $obj->fecha);
		        	$stmt->execute();
		        	$db = null;
		        	
		        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
		        		$valorFecha = new stdClass();
		        		$valorFecha->fecha = $p["FECHA"];
		        		$valorFecha->valor = $p["VALOR"];

		        		array_push($listaValores, $valorFecha);
					}
				} catch(PDOException $e) {
		        	$respuesta = CO_crearRespuesta(-1, $e->getMessage());
				}

				$indicador->historial = $listaValores;

				array_push($listaHistorialIndicadores, $indicador);
			}
			
		}
		return $listaHistorialIndicadores;
	}
  
	function CO_obtenerIndidacoresRelacionados($indicador) {
		$lista = array();
		if ($indicador != null) {
			if ((strcasecmp($indicador, "pv") == 0) || (strcasecmp($indicador, "ev") == 0) || (strcasecmp($indicador, "ac") == 0)) {
				$ind = new stdClass();
				$ind->id = CO_PV;
				$ind->nombre = "PV";
				array_push($lista, $ind);

				$ind = new stdClass();
				$ind->id = CO_EV;
				$ind->nombre = "EV";
				array_push($lista, $ind);

				$ind = new stdClass();
				$ind->id = CO_AC;
				$ind->nombre = "AC";
				array_push($lista, $ind);
			}

			if ((strcasecmp($indicador, "BAC") == 0) || (strcasecmp($indicador, "eac") == 0) || (strcasecmp($indicador, "etc") == 0)) {
				$ind = new stdClass();
				$ind->id = CO_BAC;
				$ind->nombre = "BAC";
				array_push($lista, $ind);

				$ind = new stdClass();
				$ind->id = CO_EAC;
				$ind->nombre = "EAC";
				array_push($lista, $ind);

				$ind = new stdClass();
				$ind->id = CO_ETC;
				$ind->nombre = "ETC";
				array_push($lista, $ind);
			}
			
			if (strcasecmp($indicador, "cv") == 0) {
				$ind = new stdClass();
				$ind->id = CO_CV;
				$ind->nombre = "CV";
				array_push($lista, $ind);
			}

			if (strcasecmp($indicador, "cpi") == 0) {
				$ind = new stdClass();
				$ind->id = CO_CPI;
				$ind->nombre = "CPI";
				array_push($lista, $ind);
			}

			if (strcasecmp($indicador, "spi") == 0) {
				$ind = new stdClass();
				$ind->id = CO_SPI;
				$ind->nombre = "SPI";
				array_push($lista, $ind);
			}

			if (strcasecmp($indicador, "sv") == 0) {
				$ind = new stdClass();
				$ind->id = CO_SV;
				$ind->nombre = "SV";
				array_push($lista, $ind);
			}

			if (strcasecmp($indicador, "vac") == 0) {
				$ind = new stdClass();
				$ind->id = CO_VAC;
				$ind->nombre = "VAC";
				array_push($lista, $ind);
			}

			if (strcasecmp($indicador, "tcpi") == 0) {
				$ind = new stdClass();
				$ind->id = CO_TCPI;
				$ind->nombre = "TCPI";
				array_push($lista, $ind);
			}
			
		}

		return $lista;
	}

  //RESPUESTAS
	function CO_crearRespuesta($codRespuesta, $mensaje) {
		$respuesta = new stdClass();
		$respuesta->codRespuesta = $codRespuesta;
		$respuesta->mensaje = $mensaje;
		
		return $respuesta;
	}

	function CO_obtenerRespuestaPositivaDeGuardadoFalsa() {
		return CO_crearRespuesta(0, "Ok.");
	}

	function CO_obtenerRespuestaNegativaDeGuardadoFalsa() {
		return CO_crearRespuesta(-1, "Error XXX.");
	}
?>