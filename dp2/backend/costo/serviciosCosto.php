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
	
	function CO_saveCURecursos($json) { //servicio 5 //COMPLETO
		$objeto = json_decode($json);
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

	function CO_saveReserva($json) { //servicio 10 //COMPLETO
		$objeto = json_decode($json);
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

		if ($proy->month < 10) {
			$month = '0' . $month;
		}

		if ($proy->day < 10) {
			$day = '0' . $day;
		}

		$fecha = $year . $month . $day;

		$indicadores = CO_consultarIndicadores($proy->idProyecto, $fecha);

		$jsonRespuesta = new stdClass();
		$jsonRespuesta->lista = $indicadores;

		echo json_encode($jsonRespuesta);
	}

	function CO_saveIndicadores($json) { //servicio 13 //COMPLETO
		$objeto = json_decode($json);
		
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

	function CO_getCostoFijoPlaneado($json) { //servicio 15//
		$proy = json_decode($json);

		$jsonRespuesta = new stdClass();
    	$jsonRespuesta->costoFijoTotalPlaneado = CO_consultarCostoFijoTotalPlaneado($proy->idProyecto);
		$jsonRespuesta->lista = CO_consultarListaRecursos($proy->idProyecto);

		echo json_encode($jsonRespuesta);
	}

	function CO_getCostoFijoReal($json) { //servicio 16//
		$proy = json_decode($json);

		$jsonRespuesta = new stdClass();
    	$jsonRespuesta->costoFijoTotalReal = CO_consultarCostoFijoTotalReal($proy->idProyecto);
		$jsonRespuesta->lista = CO_consultarListaRecursos($proy->idProyecto);

		echo json_encode($jsonRespuesta);
	}

	function CO_saveCostoFijoReal($json) { //servicio 17 //COMPLETO
		$objeto = json_decode($json);
		
		$yearI = $objeto->yearI;
		$monthI = $objeto->monthI;
		$dayI = $objeto->dayI;

		$yearF = $objeto->yearF;
		$monthF = $objeto->monthF;
		$dayF = $objeto->dayF;

		/*
		if ($objeto->month < 10) {
			$month = '0' . $month;
		}

		if ($objeto->day < 10) {
			$day = '0' . $day;
		}*/

		$fechaI = $yearI . $monthI . $dayI;
		$fechaF = $yearF . $monthF . $dayF;
		
		$jsonRespuesta = CO_guardarCostoFijoReal($objeto, $fechaI, $fechaF);
		
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

		array_push($indicadores, new CO_Indicador("PV", $PV));
		array_push($indicadores, new CO_Indicador("EV", $EV));
		array_push($indicadores, new CO_Indicador("AC", $AC));
		array_push($indicadores, new CO_Indicador("CV", $CV));
		array_push($indicadores, new CO_Indicador("CPI", $CPI));
		array_push($indicadores, new CO_Indicador("SPI", $SPI));
		array_push($indicadores, new CO_Indicador("SV", $SV));
		array_push($indicadores, new CO_Indicador("BAC", $BAC));
		array_push($indicadores, new CO_Indicador("EAC", $EAC));
		array_push($indicadores, new CO_Indicador("ETC", $ETC));
		array_push($indicadores, new CO_Indicador("VAC", $VAC));
		array_push($indicadores, new CO_Indicador("TCPI", $TCPI));

		return $indicadores;
	}

	//funciones para obtener indicadores
	function CO_obtenerPV($idProyecto, $fecha) { //Valor planeado
		$sql = "SELECT 
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
		) H;";

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
		AND DATE_FORMAT(A.FECHA_ACTUAL_FIN,'%Y%m%d')<= :fecha
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
		AND (DATE_FORMAT(A.FECHA_ACTUAL_FIN,'%Y%m%d')> :fecha OR A.FECHA_ACTUAL_FIN IS NULL)
		AND (DATE_FORMAT(A.FECHA_ACTUAL_INICIO,'%Y%m%d')<= :fecha OR A.FECHA_ACTUAL_INICIO IS NULL)
		AND DATE_FORMAT(D.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_ACTIVIDAD
		) H;";

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
		AND DATE_FORMAT(A.FECHA_ACTUAL_FIN,'%Y%m%d')<= :fecha
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
		AND (DATE_FORMAT(A.FECHA_ACTUAL_FIN,'%Y%m%d')> :fecha OR A.FECHA_ACTUAL_FIN IS NULL)
		AND (DATE_FORMAT(A.FECHA_ACTUAL_INICIO,'%Y%m%d')<= :fecha OR A.FECHA_ACTUAL_INICIO IS NULL)
		AND DATE_FORMAT(D.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		A.ID_ACTIVIDAD
		) H;";

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
		SUM(IFNULL(B.CANTIDADESTIMADA,0)*IFNULL(C.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0)) BAC_SOLES
		FROM
		ACTIVIDAD A JOIN ACTIVIDAD_X_RECURSO B ON A.ID_ACTIVIDAD=B.ID_ACTIVIDAD
		JOIN RECURSO C ON B.ID_RECURSO=C.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON C.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d');";

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
		A.ID_PROYECTO,
		A.NOMBRE_PROYECTO,
		IFNULL(A.PORCENTAJE_RESERVA,0) PORCENTAJE_RESERVA,
		SUM(
		CASE 
		WHEN B.ID_PROYECTO IS NULL OR C.ID_ACTIVIDAD IS NULL OR D.ID_RECURSO IS NULL OR X.ID_CAMBIO_MONEDA IS NULL OR X.FECHA IS NULL THEN 0
		WHEN C.ESTADO<>0 AND B.PROFUNDIDAD<>0  AND D.ESTADO<>'ELIMINADO' AND B.ELIMINADO<>1 AND (B.ID_ACTIVIDAD IS NOT NULL OR C.ID_RECURSO IS NOT NULL)
			THEN 	IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(D.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0))
		ELSE 0
		END
		) PRESUP_SOLES
		from 
		PROYECTO A LEFT JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		LEFT JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		LEFT JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		LEFT JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		((B.ID_PROYECTO IS NULL OR C.ID_ACTIVIDAD IS NULL OR D.ID_RECURSO IS NULL OR X.ID_CAMBIO_MONEDA IS NULL OR X.FECHA IS NULL)		 
		OR
		(DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		))
		AND
		A.ID_PROYECTO= :idProyecto
		GROUP BY
		A.ID_PROYECTO,
		A.NOMBRE_PROYECTO,
		IFNULL(A.PORCENTAJE_RESERVA,0);";

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$proyecto = null; //new CO_Proyecto(1, 'El proyecto de Carlitox', 999.0, 0.2, 999.99);
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$proyecto = new CO_Proyecto($p["ID_PROYECTO"], $p["NOMBRE_PROYECTO"], $p["PORCENTAJE_RESERVA"], $p["PRESUP_SOLES"]);
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
		A.DESCRIPCION,
		A.ID_CAMBIO_MONEDA,
		Y.DESCRIPCION MONEDA,
		Z.DESCRIPCION UNIDAD_MEDIDA,
		SUM(IFNULL(C.CANTIDADESTIMADA,0)) CANTIDAD_NECESARIA,
		AVG(IFNULL(A.COSTO_UNITARIO_ESTIMADO,0)) COSTO_PROM_SOLES
		FROM
		RECURSO A LEFT JOIN ACTIVIDAD_X_RECURSO C ON A.ID_RECURSO=C.ID_RECURSO 
		LEFT JOIN ACTIVIDAD B ON C.ID_ACTIVIDAD=B.ID_ACTIVIDAD AND A.ID_PROYECTO=B.ID_PROYECTO
		JOIN CAMBIO_MONEDA Y ON A.ID_CAMBIO_MONEDA=Y.ID_CAMBIO_MONEDA
		JOIN UNIDAD_MEDIDA Z ON A.ID_UNIDAD_MEDIDA=Z.ID_UNIDAD_MEDIDA
		WHERE
		(A.ID_PROYECTO= :idProyecto
		AND A.ESTADO<>'ELIMINADO' AND (C.ESTADO<>0 OR C.ESTADO IS NULL) AND (B.PROFUNDIDAD<>0 OR B.PROFUNDIDAD IS NULL) AND B.ELIMINADO<>1)
		OR
		((A.ID_PROYECTO= :idProyecto AND A.ESTADO<>'ELIMINADO') AND (C.ID_RECURSO IS NULL OR B.ID_ACTIVIDAD IS NULL OR B.ID_PROYECTO IS NULL))
		GROUP BY
		A.ID_RECURSO,
		A.ID_UNIDAD_MEDIDA,
		A.DESCRIPCION,
		Y.DESCRIPCION,
		Z.DESCRIPCION;";

		$listaRecursos = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					array_push($listaRecursos, new CO_Recurso($p["ID_RECURSO"], $p["ID_UNIDAD_MEDIDA"], $p["UNIDAD_MEDIDA"], $p["DESCRIPCION"], $p["ID_CAMBIO_MONEDA"], $p["MONEDA"], $p["CANTIDAD_NECESARIA"], $p["COSTO_PROM_SOLES"], 0, 0));
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
		SUM(
		CASE
		WHEN DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d') AND Z.ESTADO<>'ELIMINADO' AND C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1  AND C.ID_ACTIVIDAD IS NOT NULL
			THEN IFNULL(C.CANTIDADESTIMADA,0)*IFNULL(Z.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0)
		ELSE 0
		END
		) COSTO_ACTIVIDAD_SOLES
		from 
		PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		LEFT JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		LEFT JOIN RECURSO Z ON C.ID_RECURSO=Z.ID_RECURSO
		LEFT JOIN CAMBIO_HISTORICO X ON Z.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		LEFT JOIN ASIENTO_CONTABLE Y ON B.ID_ASIENTO_CONTABLE=Y.ID_ASIENTO_CONTABLE
		WHERE
		B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1 
		AND
		(X.FECHA IS NULL OR DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')) AND 
		A.ID_PROYECTO= :idProyecto 
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
		C.COSTO_UNITARIO_ESTIMADO COSTO_UNIT_SOLES,
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
        													//id recurso, idunidad medida, unidad medida, nombre recurso, id moneda, moneda, cantidad estimada, costo unitario
				array_push($listaRecursos, new CO_Recurso($p["ID_RECURSO"], $p["ID_UNIDAD_MEDIDA"], $p["UNIDAD_MEDIDA"], $p["NOMBRE_RECURSO"], $p["ID_CAMBIO_MONEDA"], $p["MONEDA"], $p["CANTIDADESTIMADA"], $p["COSTO_UNIT_SOLES"], 0, 0));
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
		A.ID_PROYECTO= :idProyecto AND B.ID_ACTIVIDAD= :idActividad
		AND D.ESTADO<>'ELIMINADO' AND C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1
		GROUP BY
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		IFNULL(Y.DESCRIPCION,'');";

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
        	$sql = "
        	UPDATE RECURSO
			SET ID_UNIDAD_MEDIDA= :idUnidadMedida, ID_CAMBIO_MONEDA= :idMoneda, COSTO_UNITARIO_ESTIMADO= :costoUnitario, ESTADO='ACTIVO'
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

//					$stmt->bindParam("costoFijo", $recurso->costoFijo);

		        	$stmt->execute();
		        	$db = null;
				}
				unset($recurso);
			}

			//Para crear recursos
			$sql = "
        	INSERT INTO RECURSO (ID_UNIDAD_MEDIDA,DESCRIPCION,ID_PROYECTO,COSTO_UNITARIO_ESTIMADO,ID_CAMBIO_MONEDA,ESTADO)
			VALUES
			(:idUnidadMedida, :nombreRecurso, :idProyecto, :costoUnitario, :idMoneda,'ACTIVO');
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

//					$stmt->bindParam("costoFijo", $recurso->costoFijo);

		        	$stmt->execute();
		        	$db = null;
				}
				unset($recurso);
			}

			//Para eliminar lógicamente los recursos
			$sql = "
        	UPDATE RECURSO
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
  
  function CO_consultarCuentasDesglozable($idProyecto) { //INCOMPLETO - FALTAN QUERIES
		//obtener lista de cuentas
		$sql = "SELECT 
		A.ID_PROYECTO,
		B.ID_ASIENTO_CONTABLE,
		B.DESCRIPCION,
		SUM(C.CANTIDADESTIMADA*D.COSTO_UNITARIO_ESTIMADO*E.CAMBIO_A_SOL) COSTO_SOLES_CUENTA
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
		$sql = "MISSING_SQL";

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$costoFijoTotal = null;
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
				$costoFijoTotal = $p["COSTO_FIJO_PLANEADO_TOTAL"];
				break;
			}
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}
		
		return $costoFijoTotal;
	}

	function CO_consultarCostoFijoTotalReal($idProyecto) { //COMPLETO
		$sql = "MISSING_SQL";

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$costoFijoTotal = null;
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
				$costoFijoTotal = $p["COSTO_FIJO_REAL_TOTAL"];
				break;
			}
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
        	echo json_encode(array("me"=> $e->getMessage()));
		}
		
		return $costoFijoTotal;
	}

	function CO_guardarCostoFijoReal($obj, $fechaI, $fechaF) { //
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
			$sql = "SQL";

			if ($obj->listaRecursos != null) {
	        	foreach ($obj->listaRecursos as $recurso) {
	        		$db = getConnection();
		        	$stmt = $db->prepare($sql);
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