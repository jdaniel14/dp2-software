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

		if (CO_verificaPermisoServicio(CO_SERVICIO_1, $proy->idUsuario, $proy->idProyecto)) {
			$infoProyecto = CO_consultarInfoProyecto($proy->idProyecto);
		
			echo json_encode($infoProyecto);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}
	
	function CO_getListaRecursos($json) { //servicio 2 //COMPLETO
		$proy = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_2, $proy->idUsuario, $proy->idProyecto)) {
			$listaRecursos = CO_consultarListaRecursos($proy->idProyecto);
			$jsonRespuesta = new stdClass();
			$jsonRespuesta->lista = $listaRecursos;
		
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}
	
	function CO_getListaActividades($json) { //servicio 3 //COMPLETO
		$proy = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_3, $proy->idUsuario, $proy->idProyecto)) {
				$listaActividades = CO_consultarListaActividades($proy->idProyecto);
				$jsonRespuesta = new stdClass();
				$jsonRespuesta->lista = $listaActividades;
			
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}
	
	function CO_getInfoActividad($json) { //servicio 4 //COMPLETO
		$proy = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_4, $proy->idUsuario, $proy->idProyecto)) {
			$infoActividad = CO_consultarInfoActividad($proy->idProyecto, $proy->idActividad);
			
			echo json_encode($infoActividad);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}
	
	function CO_saveCURecursos() { //servicio 5 //COMPLETO
		$request = \Slim\Slim::getInstance()->request();
    	$objeto = json_decode($request->getBody());
    	if (CO_verificaPermisoServicio(CO_SERVICIO_5, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = CO_guardarCUR($objeto);
		
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}
	
	function CO_getListaPaquetes($json) { //servicio 6 //COMPLETO
		$proy = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_6, $proy->idUsuario, $proy->idProyecto)) {
			$listaPaquetes = CO_consultarListaPaquetes($proy->idProyecto);
			$jsonRespuesta = new stdClass();
			$jsonRespuesta->lista = $listaPaquetes;
			
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}
	
	function CO_saveTipoCuenta($json) { //servicio 7 //COMPLETO
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_7, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = CO_guardarTipoCuenta($objeto);
			
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
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
    	if (CO_verificaPermisoServicio(CO_SERVICIO_10, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = CO_guardarReserva($objeto);
			
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
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
		if (CO_verificaPermisoServicio(CO_SERVICIO_12, $proy->idUsuario, $proy->idProyecto)) {
			$year = $proy->year;
			$month = $proy->month;
			$day = $proy->day;

			$fecha = $year . $month . $day;

			$indicadores = CO_consultarIndicadores($proy->idProyecto, $fecha);

			$jsonRespuesta = new stdClass();
			$jsonRespuesta->lista = $indicadores;

			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_saveIndicadores() { //servicio 13 //COMPLETO
		$request = \Slim\Slim::getInstance()->request();
		$objeto = json_decode($request->getBody());
		if (CO_verificaPermisoServicio(CO_SERVICIO_13, $objeto->idUsuario, $objeto->idProyecto)) {
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
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}
	
  
	///////////SPRINT 3/////////////
	function CO_getListaCuentasDesglozable($json) { //servicio 14 //COMPLETO
		$proy = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_14, $proy->idUsuario, $proy->idProyecto)) {
			$listaCuentas= CO_consultarCuentasDesglozable($proy->idProyecto);

	    	$jsonRespuesta = new stdClass();
			$jsonRespuesta->lista = $listaCuentas;

			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_getCostoFijoPlaneado($json) { //servicio 15//COMPLETO
		$proy = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_15, $proy->idUsuario, $proy->idProyecto)) {
			$jsonRespuesta = new stdClass();
	    	$jsonRespuesta->lista = CO_consultarCostoFijoTotalPlaneado($proy->idProyecto);
	    	$jsonRespuesta->costoFijoTotalPlaneado = 0;
	    	if ($jsonRespuesta->lista != null && sizeof($jsonRespuesta->lista) > 0) {
	    		foreach ($jsonRespuesta->lista as $recurso) {
					$jsonRespuesta->costoFijoTotalPlaneado += $recurso->costoFijoTotal;
				}
	    	}

			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_getCostoFijoReal($json) { //servicio 16//COMPLETO
		$proy = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_16, $proy->idUsuario, $proy->idProyecto)) {
			$jsonRespuesta = new stdClass();
	    	$jsonRespuesta->lista = CO_consultarCostoFijoTotalReal($proy->idProyecto);
	    	$jsonRespuesta->costoFijoTotalReal = 0;
	    	if ($jsonRespuesta->lista != null && sizeof($jsonRespuesta->lista) > 0) {
	    		foreach ($jsonRespuesta->lista as $recurso) {
					$jsonRespuesta->costoFijoTotalReal += $recurso->costoFijoTotal;
				}
	    	}

			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_saveCostoFijoRealProyecto($json) { //servicio 17 //COMPLETO
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_17, $objeto->idUsuario, $objeto->idProyecto)) {
			/*
			if ($objeto->month < 10) {
				$month = '0' . $month;
			}

			if ($objeto->day < 10) {
				$day = '0' . $day;
			}*/

			
			$jsonRespuesta = CO_guardarCostoFijoReal($objeto);
			
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_getHistorialIndicador($json) { //servicio18 //COMPLETO
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_18, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = new stdClass();
	    	$jsonRespuesta->lista = CO_consultarHistorialIndicador($objeto);

			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}


	///////////SPRINT 4/////////////
	function CO_validarPermisosVista() { //servicio19  //COMPLETO
		$request = \Slim\Slim::getInstance()->request();
	    $objeto = json_decode($request->getBody());

		$jsonRespuesta = new stdClass();
		$jsonRespuesta->respuesta = CO_consultarPermisoVista($objeto);

		echo json_encode($jsonRespuesta);
	}

	function CO_getCostosIndirectosEstimadosMes($json) { //servicio 20 //COMPLETO
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_20, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = new stdClass();
			$resultados = CO_consultarNumeroMesesCostosIndirectosEstimados($objeto->idProyecto);
			$jsonRespuesta->numMeses = $resultados->diferencia;
			$jsonRespuesta->listaCostosIndirectos = CO_ConsultarCostosIndirectosEstimados($objeto->idProyecto, $resultados);
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_getCostosIndirectosRealesMes($json) { //servicio 21 //COMPLETO
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_21, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = new stdClass();
			$resultados = CO_consultarNumeroMesesCostosIndirectosReales($objeto->idProyecto);
			$jsonRespuesta->numMeses = $resultados->diferencia;
			$jsonRespuesta->listaCostosIndirectos = CO_ConsultarCostosIndirectosReales($objeto->idProyecto, $resultados);
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_saveCostosIndirectosEstimados() { //servicio 22 //COMPLETO
		$request = \Slim\Slim::getInstance()->request();
		$objeto = json_decode($request->getBody());
		if (CO_verificaPermisoServicio(CO_SERVICIO_22, $objeto->idUsuario, $objeto->idProyecto)) {
			
			/*
			$year = $objeto->year;
			$month = $objeto->month;
			$day = $objeto->day;
			if ($objeto->month < 10) {
				$month = '0' . $month;
			}

			if ($objeto->day < 10) {
				$day = '0' . $day;
			}*/

			//$fecha = $year . $month . $day;
			
			$jsonRespuesta = CO_guardarCostosIndirectosEstimados($objeto);
			
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_saveCostosIndirectosReales() { //servicio 23 //COMPLETO
		$request = \Slim\Slim::getInstance()->request();
		$objeto = json_decode($request->getBody());
		if (CO_verificaPermisoServicio(CO_SERVICIO_23, $objeto->idUsuario, $objeto->idProyecto)) {		
			$jsonRespuesta = CO_guardarCostosIndirectosReales($objeto);
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_getReservaContingencia($json) { //servicio 24 //COMPLETO
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_24, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = new stdClass();
			$jsonRespuesta->reserva = CO_consultarReservaContingencia($objeto->idProyecto);
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_getListaPaquetesCostoReal($json) { //servicio 25 //COMPLETO
		$proy = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_25, $proy->idUsuario, $proy->idProyecto)) {
			$listaPaquetes = CO_consultarListaPaquetesCostoReal($proy->idProyecto);
			$jsonRespuesta = new stdClass();
			$jsonRespuesta->lista = $listaPaquetes;
			
			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_getCostoIndirectoTotalEstimado($json) { //servicio 26 //COMPLETO
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_26, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = new stdClass();
			$jsonRespuesta->costoIndirectoTotal = CO_consultarCostoIndirectoTotalEstimado($objeto->idProyecto);

			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	function CO_getCostoIndirectoTotalReal($json) { //servicio 27 //COMPLETO
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_27, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = new stdClass();
			$jsonRespuesta->costoIndirectoTotal = CO_consultarCostoIndirectoTotalReal($objeto->idProyecto);

			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}


	///////////SPRINT 5/////////////
	function CO_getMontoContingencia($json) { //servicio 28
		$objeto = json_decode($json);
		if (CO_verificaPermisoServicio(CO_SERVICIO_28, $objeto->idUsuario, $objeto->idProyecto)) {
			$jsonRespuesta = new stdClass();
			$jsonRespuesta->montoContingencia = CO_consultarMontoContingencia($objeto);

			echo json_encode($jsonRespuesta);
		} else {
			echo json_encode(CO_crearRespuesta(-2, "No tiene permiso para ejecutar esta acción."));
		}
	}

	///////////FOR TESTING ONLY/////////////
	function CO_testFunction() {
		/*
		echo "add me blood999\n";
		echo "add me ANHUE blood999\n";
		echo "add me ANG blood999\n";
		echo "add me SKT blood999\n";
		echo "add me FNC blood999\n";
		echo "add me RYL blood999\n";
		echo "add me OMG blood999\n";
		echo "add me TSM blood999\n";
		echo "add me C9 blood999\n";*/
		echo '<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
				<HTML>
				   <HEAD>
				      <TITLE>
				         Add me blood999
				      </TITLE>
				   </HEAD>
				<BODY>
				   <div><img src="http://200.16.7.112/movil/etc/morde_la-wea-hue-hue-hue.jpg"></div>
				   <div><img src="http://200.16.7.112/movil/etc/morde_i-only-need-to-slap-your-shit-one-FOOL.jpg"></div>
				   <div><img src="http://200.16.7.112/movil/etc/morde_maybe-you-brazil_HUE.jpg"></div>
				   <div><img src="http://200.16.7.112/movil/etc/morde_modemkaiser.png"></div>
				   <div><img src="http://200.16.7.112/movil/etc/add_me_blood999.jpg"></div>
				   <div><img src="http://200.16.7.112/movil/etc/add_me_blood999_2.jpg"></div>
				   <div><img src="http://200.16.7.112/movil/etc/add_me_blood999_3.jpg"></div>
				   <div><img src="http://200.16.7.112/movil/etc/morde_hue.jpg"></div>
				   <div><img src="http://200.16.7.112/movil/etc/morde_how-to-hue.jpg"></div>
				   <div><img src="http://200.16.7.112/movil/etc/morde_jungla.png"></div>
				</BODY>
				</HTML>';
	}

	function CO_testFunction2($codMes) {
		echo CO_obtenerSiguienteCodMes($codMes);
	}

	function CO_testFunctionPuntos() {
		echo '{status: "OK",num_results: 10,results: [{id: "1", lat: "-12.071353", lng: "-77.078557", elevation: "2.5", title: "PUNTO 1", enlace: [{enlace:"<a href=\'http://www.aiesec.org/peru/universidadcatolica/\'>Aiesec</a>"},{enlace:"<a href=\'http://www.aiesec.org/peru/universidadcatolica/\'>Aiesec</a>"},{enlace:"<a href=\'http://www.aiesec.org/peru/universidadcatolica/\'>Aiesec</a>"}], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/AIESEC.jpg"}], icono: "0", id_categoria: "38", id_punto_padre: "", desc_corta: "Association Internationale des \u00c9tudiants En Sciences \u00c9conomiques et Commerciales", descripcion: "Organizaci\u00f3n global, no pol\u00edtica, independiente, sin fines de lucro, dirigida por estudiantes y reci\u00e9n graduados de instituciones de educaci\u00f3n superior; sus miembros est\u00e1n interesados en la problem\u00e1tica mundial, liderazgo y gesti\u00f3n.", contacto: "Reservas y pagos: Arturo Cerr\u00f3n, anexo 3274 audi_derecho@pucp.edu.pe\\n\\nCoordinaciones log\u00edsticas: Fernando Rojas, anexo 3268  audi_derecho@pucp.edu.pe\\n\\nCoordinaciones t\u00e9cnicas: M\u00e1ximo Santa Cruz y Jorge Ch\u00e1vez, anexo 3270 msantac@pucp.edu.pe y gchavez@pucp.edu.pe", ubicacion: "Aquisito nom\u00e1s", estrellas: "0", encuestas: "0", piso: "1", pisos: "1", fecha: [{fecha:"L-M-V: 4pm-8pm"}], redes: [{red:"FB", url:"http://www.facebook.com/aiesec.en.peru"}], hijos:[]},{id: "2", lat: "-12.072921", lng: "-77.079716", elevation: "2.5", title: "PUNTO 2", enlace: [], url_images: [], icono: "0", id_categoria: "16", id_punto_padre: "", desc_corta: "\u00c1rea de mec\u00e1nica aplicada", descripcion: "", contacto: "", ubicacion: "", estrellas: "0", encuestas: "0", piso: "1", pisos: "1", fecha: [], redes: [], hijos:[]},{id: "3", lat: "-12.065902", lng: "-77.079565", elevation: "2.5", title: "PUNTO 3", enlace: [{enlace:"<a href=\'http://deportes.pucp.edu.pe/\'>Enlace</a>"}], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/deportesOCA.jpg"}], icono: "0", id_categoria: "10", id_punto_padre: "", desc_corta: "\u00c1rea de deportes", descripcion: "En la PUCP se practican distintas disciplinas, entre ellas: f\u00fatbol, v\u00f3ley, b\u00e1squet, karate, judo, kung fu, tenis de mesa, rugby, paleta de front\u00f3n, atletismo, tiro, etc.", contacto: "", ubicacion: "", estrellas: "1", encuestas: "1", piso: "1", pisos: "1", fecha: [], redes: [], hijos:[]},{id: "4", lat: "-12.068448", lng: "-77.079555", elevation: "2.5", title: "PUNTO 4", enlace: [{enlace:"<a href=\'http://aeg.pucp.edu.pe/\'>Enlace</a>"}], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/ASOCIACION_DE_GRADUADOS.jpg"}], icono: "0", id_categoria: "2", id_punto_padre: "", desc_corta: "Asociaci\u00f3n de egresados y graduados", descripcion: "Instituci\u00f3n formada con el objetivo de coadyuvar al desarrollo del pa\u00eds con la participaci\u00f3n de los ex alumnos de la Pontificia Universidad Cat\u00f3lica del Per\u00fa.", contacto: "", ubicacion: "", estrellas: "1", encuestas: "0", piso: "1", pisos: "1", fecha: [], redes: [{red:"FB", url:"http://www.facebook.com/AlumniPUCP"}], hijos:[]},{id: "5", lat: "-12.072705", lng: "-77.079993", elevation: "2.5", title: "PUNTO 5", enlace: [{enlace:"<a href=\'http://www.pucp.edu.pe/content/pagina45.php?pID=3111&pIDSeccionWeb=10&pIDContenedor=3115&pIDReferencial=&pBusqueda=&pIDMapa=\'>Enlace</a>"}], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/AUDITORIO_CIENCIAS_E_INGENIERIA.jpg"}], icono: "0", id_categoria: "3", id_punto_padre: "", desc_corta: "Auditorio de Ciencias e Ingenier\u00eda", descripcion: "Amplio y elegante auditorio que cuenta con 98 butacas con atril incorporado, un moderno sistema de iluminaci\u00f3n, tratamiento ac\u00fastico y sistema multimedia.", contacto: "", ubicacion: "", estrellas: "1", encuestas: "0", piso: "1", pisos: "1", fecha: [], redes: [{red:"FB", url:"http://www.facebook.com/pages/Auditorio-De-Ciencias-E-Ingenieria/277457485622339"}], hijos:[]},{id: "6", lat: "-12.069976", lng: "-77.081109", elevation: "2.5", title: "PUNTO 6", enlace: [{enlace:"<a href=\'http://auditorioderecho.pucp.edu.pe/\'>Enlace</a>"}], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/auditorio_derecho.jpg"}], icono: "0", id_categoria: "25", id_punto_padre: "", desc_corta: "Auditorio de Derecho", descripcion: "Cuenta con amplias y confortables instalaciones que hacen posible la visita de 370 personas. Sus modernos asientos ofrecen mesa de apoyo. La sala abovedada ha sido dise\u00f1ada para una \u00f3ptima ac\u00fastica, la cual permite incluso presentaciones musicales de altos requerimientos. Adem\u00e1s, cuenta con un ambiente privado para los expositores.", contacto: "", ubicacion: "", estrellas: "1", encuestas: "0", piso: "1", pisos: "1", fecha: [], redes: [{red:"FB", url:"http://www.facebook.com/pages/Auditorio-de-Derecho-PUCP/146712185395361"}], hijos:[]},{id: "7", lat: "-12.068314", lng: "-77.080095", elevation: "2.5", title: "PUNTO 7", enlace: [{enlace:"<a href=\'http://departamento.pucp.edu.pe/humanidades/auditorio-de-humanidades/\'>Enlace</a>"}], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/AUDITORIO_HUMANIDADES.jpg"}], icono: "0", id_categoria: "8", id_punto_padre: "", desc_corta: "Auditorio de Humanidades", descripcion: "El Auditorio de Humanidades, el cual cuenta con una capacidad para 100 personas, brinda los servicios de alquiler de su acogedor sala para eventos tales como: coloquios, seminarios, talleres, presentaciones de libros, entre otras actividades acad\u00e9micas y/o culturales.", contacto: "", ubicacion: "", estrellas: "1", encuestas: "0", piso: "1", pisos: "1", fecha: [], redes: [{red:"FB", url:"http://www.facebook.com/pages/Auditorio-De-Humanidades-PUCP/250992755023150"}], hijos:[]},{id: "8", lat: "-12.069808", lng: "-77.080271", elevation: "2.5", title: "PUNTO 8", enlace: [], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/AUDITORIO_JUAN_PABLO_II.jpg"}], icono: "0", id_categoria: "18", id_punto_padre: "", desc_corta: "Auditorio Juan Pablo II", descripcion: "Capacidad: 250 personas", contacto: "", ubicacion: "", estrellas: "1", encuestas: "0", piso: "1", pisos: "1", fecha: [], redes: [], hijos:[]},{id: "9", lat: "-12.070433", lng: "-77.079041", elevation: "2.5", title: "PUNTO 9", enlace: [], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/TALLERES1.jpg"}], icono: "0", id_categoria: "23", id_punto_padre: "", desc_corta: "Aulas y talleres de la Facultad de Arte", descripcion: "La Facultad de Arte cuenta con una biblioteca, laboratorios de c\u00f3mputo, laboratorios de fotograf\u00eda, taller de grabado, taller de escultura, taller de dise\u00f1o gr\u00e1fico y un taller de dise\u00f1o industrial.", contacto: "", ubicacion: "", estrellas: "0", encuestas: "0", piso: "1", pisos: "1", fecha: [], redes: [], hijos:[]},{id: "10", lat: "-12.071757", lng: "-77.08045", elevation: "2.5", title: "PUNTO 10", enlace: [{enlace:"<a href=\'http://bancolibro.pucp.edu.pe/\'>Enlace</a>"}], url_images: [{url:"http://guiapucp.netau.net/guiaubicua/fotos/BANCO_DEL_LIBRO.jpg"}], icono: "0", id_categoria: "38", id_punto_padre: "", desc_corta: "Banco del libro", descripcion: "Servicio de uso semestral de libros para que los estudiantes PUCP planifiquen mejor sus estudios al disponer de los textos que necesitan a cualquier hora y en su propia casa. Se facilitan libros de idiomas, obras literarias y se remata libros usados.", contacto: "", ubicacion: "", estrellas: "1", encuestas: "1", piso: "1", pisos: "1", fecha: [], redes: [], hijos:[]}]}';
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
		AND DATE_FORMAT(A.FECHA_PLAN_FIN,'%Y%m%d')<=:fecha
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
		AND DATE_FORMAT(A.FECHA_PLAN_FIN,'%Y%m%d')>:fecha
		AND DATE_FORMAT(A.FECHA_PLAN_INICIO,'%Y%m%d')<=:fecha
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
		AND DATE_FORMAT(A.FECHA_PLAN_INICIO_COSTO_FIJO,'%Y%m%d')<=:fecha and A.COSTO_FIJO_DIARIO_ESTIMADO>0
		UNION
		SELECT
		IFNULL(A.costo_ESTIMADO*B.CAMBIO_A_SOL,0) VALOR_PLANEADO
		FROM
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND A.CODMES<CONV(LEFT(:fecha,6),10,10)
		UNION
		SELECT
		(CONV(RIGHT(:fecha,2),10,10)/CONV(DATE_FORMAT(LAST_DAY(STR_TO_DATE(:fecha,'%Y%m%d')),'%d'),10,10))*IFNULL(A.costo_ESTIMADO*B.CAMBIO_A_SOL,0) VALOR_PLANEADO
		FROM
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND A.CODMES=CONV(LEFT(:fecha,6),10,10)
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
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
        	//echo json_encode(array("me"=> $e->getMessage()));
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
		A.ID_PROYECTO=:idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
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
		A.ID_PROYECTO=:idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
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
		A.ID_PROYECTO=:idProyecto AND A.ESTADO='ACTIVO' AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND DATE_FORMAT(A.FECHA_PLAN_INICIO_COSTO_FIJO,'%Y%m%d')<=:fecha AND A.COSTO_FIJO_DIARIO_ESTIMADO>0
		UNION
		SELECT
		IFNULL(A.costo_ESTIMADO*B.CAMBIO_A_SOL,0) VALOR_GANADO
		FROM
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND A.CODMES<CONV(LEFT(:fecha,6),10,10)
		UNION
		SELECT
		(CONV(RIGHT(:fecha,2),10,10)/CONV(DATE_FORMAT(LAST_DAY(STR_TO_DATE(:fecha,'%Y%m%d')),'%d'),10,10))*IFNULL(A.costo_ESTIMADO*B.CAMBIO_A_SOL,0) VALOR_GANADO
		FROM
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND A.CODMES=CONV(LEFT(:fecha,6),10,10)
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
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
        	//echo json_encode(array("me"=> $e->getMessage()));
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
		A.ID_PROYECTO=:idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
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
		A.ID_PROYECTO=:idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
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
		A.ID_PROYECTO=:idProyecto AND A.ESTADO='ACTIVO' AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND DATE_FORMAT(A.FECHA_REAL_INICIO_COSTO_FIJO,'%Y%m%d')<=:fecha AND A.COSTO_FIJO_DIARIO_REAL>0
		UNION
		SELECT
		IFNULL(A.costo_REAL*B.CAMBIO_A_SOL,0) VALOR_ACTUAL
		FROM
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND A.CODMES<CONV(LEFT(:fecha,6),10,10)
		UNION
		SELECT
		(CONV(RIGHT(:fecha,2),10,10)/CONV(DATE_FORMAT(LAST_DAY(STR_TO_DATE(:fecha,'%Y%m%d')),'%d'),10,10))*IFNULL(A.costo_REAL*B.CAMBIO_A_SOL,0) VALOR_ACTUAL
		FROM
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND A.CODMES=CONV(LEFT(:fecha,6),10,10)
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
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
        	//echo json_encode(array("me"=> $e->getMessage()));
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
		A.ID_PROYECTO=:idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND B.ESTADO<>0 AND C.ESTADO<>'ELIMINADO'
		AND DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		UNION
		SELECT
		IFNULL(SUM(A.COSTO_FIJO_DIARIO_ESTIMADO*(DATEDIFF(A.FECHA_PLAN_FIN_COSTO_FIJO,A.FECHA_PLAN_INICIO_COSTO_FIJO)+1)*B.CAMBIO_A_SOL),0) BAC_SOLES
		FROM
		RECURSO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d') AND A.ESTADO='ACTIVO'
		and A.COSTO_FIJO_DIARIO_ESTIMADO>0
		UNION
		SELECT
		IFNULL(A.costo_ESTIMADO*B.CAMBIO_A_SOL,0) BAC_SOLES
		FROM
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
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
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
        	//echo json_encode(array("me"=> $e->getMessage()));
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
		
		$respuesta = null;
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
		IFNULL(H.PORCENTAJE_CONTINGENCIA,0) PORCENTAJE_CONTINGENCIA,
		(
		CASE
		WHEN H.ESTADO='CERRADO' THEN 1 ELSE 0
		END) IND_CERRADO
		FROM
		PROYECTO H
		WHERE
		H.ID_PROYECTO=:idProyecto;";

		$proyecto = null;

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$proyecto = new CO_Proyecto($p["ID_PROYECTO"], $p["NOMBRE_PROYECTO"], $p["PORCENTAJE_RESERVA"], 0);
					$proyecto->indicadorCerrado = $p["IND_CERRADO"];
					if (strcmp(G_obtenerLineaBase($idProyecto)['estado_linea_base'], 'true') == 0)
						$proyecto->indicadorLineaBase = 1;
					else
						$proyecto->indicadorLineaBase = 0;
					$proyecto->porcentajeContingencia = $p["PORCENTAJE_CONTINGENCIA"];
					break;
			}

		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		
		$sql = "SELECT
		IFNULL(SUM(f_aplica_inflacion(H.PRESUP_SOLES,f_halla_min_dia(:idProyecto),H.FECFIN)),0) PRESUP_SOLES /*CON INFLACION*/
		FROM
		(
		select
		B.FECHA_PLAN_INICIO FECINI,
		B.FECHA_PLAN_FIN FECFIN,
		SUM(IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(D.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0))) PRESUP_SOLES
		from 
		PROYECTO A LEFT JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		LEFT JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		LEFT JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		LEFT JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1 AND
		DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND D.ESTADO<>'ELIMINADO' 
		AND A.ID_PROYECTO=:idProyecto
		GROUP BY
		B.FECHA_PLAN_INICIO,
		B.FECHA_PLAN_FIN
		UNION /*COSTO FIJO*/
		SELECT
		B.FECHA_PLAN_INICIO_COSTO_FIJO FECINI,
		B.FECHA_PLAN_FIN_COSTO_FIJO FECFIN,
		SUM(B.COSTO_FIJO_DIARIO_ESTIMADO*(DATEDIFF(B.FECHA_PLAN_FIN_COSTO_FIJO,B.FECHA_PLAN_INICIO_COSTO_FIJO)+1)*X.CAMBIO_A_SOL) PRESUP_SOLES
		FROM
		PROYECTO A JOIN RECURSO B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN CAMBIO_HISTORICO X ON B.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND B.ESTADO='ACTIVO' AND B.COSTO_FIJO_DIARIO_ESTIMADO>0
		AND DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		B.FECHA_PLAN_INICIO_COSTO_FIJO,
		B.FECHA_PLAN_FIN_COSTO_FIJO
		UNION /*COSTO INDIRECTO*/
		SELECT
		STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d') FECINI,
		LAST_DAY(STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d')) FECFIN,
		SUM(IFNULL(A.costo_ESTIMADO*B.CAMBIO_A_SOL,0)) PRESUP_SOLES
		FROM
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		JOIN PROYECTO Z ON A.ID_PROYECTO=Z.ID_PROYECTO
		WHERE
		A.ID_PROYECTO=:idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		GROUP BY
		STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d'),
		LAST_DAY(STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d'))
		) H;";

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        			$proyecto->presupuesto = $p["PRESUP_SOLES"];
					break;
			}
			//echo json_encode($listaRecursos);

		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
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
					if ($p["FECHA_INICIO"] != null)
						$recurso->fechaInicio = $p["FECHA_INICIO"];
					else
						$recurso->fechaInicio = "";
					if ($p["FECHA_FIN"] != null)
						$recurso->fechaFin = $p["FECHA_FIN"];
					else
						$recurso->fechaFin = "";
					array_push($listaRecursos, $recurso);
			}
			//echo json_encode($listaRecursos);

		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
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
		f_aplica_inflacion(SUM(IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(Z.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0))),f_halla_min_dia(:idProyecto),B.FECHA_PLAN_INICIO) COSTO_ACTIVIDAD_SOLES
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
		A.ID_PROYECTO=:idProyecto AND C.ESTADO<>0
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
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
		foreach ($listaActividades as $actividad) {
			$listaRecursos = CO_consultarRecursosXActividad($idProyecto, $actividad->idActividad);
			$actividad->listaRecursos = $listaRecursos;
		}
		unset($actividad);
		
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
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
	
		return $listaRecursos;
	}

	function CO_consultarInfoActividad($idProyecto, $idActividad) { //COMPLETO
		$sql = "SELECT
		A.ID_PROYECTO,
		B.ID_ACTIVIDAD,
		B.NOMBRE_ACTIVIDAD,
		IFNULL(Y.DESCRIPCION,'') ASIENTO_CONTABLE,
		f_aplica_inflacion(SUM(C.CANTIDADESTIMADA*(D.COSTO_UNITARIO_ESTIMADO*X.CAMBIO_A_SOL)) ,f_halla_min_dia(:idProyecto),B.FECHA_PLAN_FIN) COSTO_ACTIVIDAD_SOLES
		from 
		PROYECTO A JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
		JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
		LEFT JOIN ASIENTO_CONTABLE Y ON B.ID_ASIENTO_CONTABLE=Y.ID_ASIENTO_CONTABLE
		WHERE
		DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
		AND
		A.ID_PROYECTO=:idProyecto AND B.ID_ACTIVIDAD=:idActividad
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
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
		return $actividad;
	}
	
	function CO_guardarCUR($obj) { //COMPLETO
		
		$respuesta = null;
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
		A.ID_PROYECTO= :idProyecto AND Z.ID_ESTADO=1
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
				$paqueteRaiz->idProyecto = $p["ID_PROYECTO"];
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
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
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
				THEN f_aplica_inflacion(IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(D.COSTO_UNITARIO_ESTIMADO*CAMBIO_A_SOL,0)),f_halla_min_dia(:idProyecto),B.FECHA_PLAN_FIN)
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
			Y.ID_COMPONENTE_PADRE=:idPaquete AND (X.FECHA IS NULL OR DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d'))
			GROUP BY
			A.ID_PROYECTO,
			Y.ID_PAQUETE_TRABAJO,
			Y.NOMBRE;";

			$listaPaquetesHijo = array();
			try {
				$db = getConnection();
	        	$stmt = $db->prepare($sql);
	        	$stmt->bindParam("idPaquete", $paquete->idPaquete);
	        	$stmt->bindParam("idProyecto", $paquete->idProyecto);
	        	$stmt->execute();
	        	$db = null;
	        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
													//id paqute, nombre paquete, lista de paquetes hijo
					$paqueteHijo = new CO_Paquete($p["ID_PAQUETE_TRABAJO"], $p["NOMBRE_PAQUETE"], $p["COSTO_PAQUETE_SOLES"], null);
					$paqueteHijo->idProyecto = $p["ID_PROYECTO"];
					array_push($listaPaquetesHijo, $paqueteHijo);
				}

				$paquete->listaPaquetesHijo = $listaPaquetesHijo;

			} catch(PDOException $e) {
				$respuesta = CO_crearRespuesta(-1, $e->getMessage());
				$listaPaquetes = null;
				//echo json_encode($respuesta);
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
		
		$respuesta = null;
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
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

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
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		return $listaUM;
	}

	function CO_guardarReserva($obj) { //COMPLETO
		//Para el porcentaje de reserva

		$respuesta = null;
		try {
			$sql = "UPDATE PROYECTO
			SET PORCENTAJE_RESERVA=:porcReserva, PORCENTAJE_CONTINGENCIA=:porcContingencia
			WHERE
			ID_PROYECTO=:idProyecto;
			COMMIT;";

			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("porcReserva", $obj->porcReserva);
        	$stmt->bindParam("idProyecto", $obj->idProyecto);
        	$stmt->bindParam("porcContingencia", $obj->porcContingencia);
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
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		return $listaUM;
	}
  
  function CO_consultarCuentasDesglozable($idProyecto) { //COMPLETO
		//obtener lista de cuentas
		$sql = "SELECT 
		A.ID_PROYECTO,
		B.ID_ASIENTO_CONTABLE,
		B.DESCRIPCION,
		SUM(f_aplica_inflacion(IFNULL(C.CANTIDADESTIMADA*D.COSTO_UNITARIO_ESTIMADO*E.CAMBIO_A_SOL,0),f_halla_min_dia(:idProyecto),A.FECHA_PLAN_FIN)) COSTO_SOLES_CUENTA
		FROM 
		ACTIVIDAD A join ASIENTO_CONTABLE B ON A.ID_ASIENTO_CONTABLE=B.ID_ASIENTO_CONTABLE
		JOIN ACTIVIDAD_X_RECURSO C ON A.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		JOIN CAMBIO_HISTORICO E ON D.ID_CAMBIO_MONEDA=E.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1
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
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
    return $listaCuentas;
	}

	function CO_consultarActividadXCuenta($idProyecto, $idCuenta) { //COMPLETO
		$sql = "SELECT 
		A.ID_ACTIVIDAD,
		A.ID_ASIENTO_CONTABLE,
		A.NOMBRE_ACTIVIDAD,
		SUM(f_aplica_inflacion(IFNULL(C.CANTIDADESTIMADA,0)*IFNULL(D.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(E.CAMBIO_A_SOL,0),f_halla_min_dia(:idProyecto),A.FECHA_PLAN_FIN)) COSTO_SOLES_ACTIVIDAD
		FROM 
		ACTIVIDAD A 
		LEFT JOIN ACTIVIDAD_X_RECURSO C ON A.ID_ACTIVIDAD=C.ID_ACTIVIDAD
		LEFT JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
		LEFT JOIN CAMBIO_HISTORICO E ON D.ID_CAMBIO_MONEDA=E.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND A.PROFUNDIDAD<>0 AND A.ELIMINADO<>1 AND A.ID_ASIENTO_CONTABLE=:idCuenta
		AND C.ESTADO<>0 AND D.ESTADO<>'ELIMINADO'
		AND (E.FECHA IS NULL OR DATE_FORMAT(E.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d'))
		GROUP BY
		A.ID_ACTIVIDAD,
		A.ID_ASIENTO_CONTABLE,
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
        	//echo json_encode(array("me"=> $e->getMessage()));
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
		f_aplica_inflacion(IFNULL(A.COSTO_FIJO_DIARIO_ESTIMADO,0)*(DATEDIFF(A.FECHA_PLAN_FIN_COSTO_FIJO,A.FECHA_PLAN_INICIO_COSTO_FIJO)+1),f_halla_min_dia(:idProyecto),A.FECHA_PLAN_FIN_COSTO_FIJO) COSTO_FIJO_TOTAL
		FROM
		RECURSO A JOIN UNIDAD_MEDIDA B ON A.ID_UNIDAD_MEDIDA=B.ID_UNIDAD_MEDIDA
		JOIN CAMBIO_MONEDA C ON A.ID_CAMBIO_MONEDA=C.ID_CAMBIO_MONEDA
		WHERE 
		A.ID_PROYECTO=:idProyecto AND A.ESTADO='ACTIVO' AND A.COSTO_FIJO_DIARIO_ESTIMADO>0;";

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
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
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
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
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
		
		$respuesta = null;
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
		        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
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

	function CO_obtenerRol($idProyecto, $idEmpleado) {
		$sql = "SELECT
		A.ID_PROYECTO,
		A.ID_EMPLEADO,
		A.ID_ROL
		FROM
		MIEMBROS_EQUIPO A
		WHERE
		A.ID_PROYECTO = :idProyecto AND A.ID_EMPLEADO = :idEmpleado AND A.ESTADO<>0;";

		$rol = -1;

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->bindParam("idEmpleado", $idEmpleado);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
    			$rol = $p["ID_ROL"];
    			break;
			}
		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		return $rol;
	}

	function CO_consultarPermisoVista($obj) {

		if ($obj->idEmpleado == 1) {
			return 1;
		}
		
		$rol = CO_obtenerRol($obj->idProyecto, $obj->idEmpleado);

		$respuesta = 0;
		if ($rol != -1) {
			switch ($obj->idVista) {
			    case 1:
			    case 2:
			    case 3:
			    case 4:
			    case 5:
			    case 6:
			    case 7:
			    case 8:
			    case 9:
			    case 10: 
			    		switch ($rol) {
						    case 1:
						    case 2:
						    case 3: 
			    					if (CO_Constants::getPermisosVista()[$obj->idVista][$rol]->getAccion($obj->idAccion))
			    						$respuesta = 1;
			    					break;
	    				}
			    		break;
			}
		}

		return $respuesta;
	}

	function CO_verificaPermisoServicio($idServicio, $idUsuario, $idProyecto){
		try {
			if ($idUsuario == 1) {
				return true;
			} else {
				$rol = CO_obtenerRol($idProyecto, $idUsuario);
				return CO_Constants::getPermisosServicio()[$idServicio]->getPermiso($rol);
			}
		} catch (Exception $e) {
			return false;
		}
	}

	function CO_obtenerSiguienteCodMes($codMes) {
		$anio = ($codMes - ($codMes % 100)) / 100;
		$mes = $codMes % 100;
		if ($mes < 12) {
			$mes++;
			if ($mes < 10)
				$mes = '0' . $mes;
		} else {
			$mes = '01';
			$anio++;
		}
		return $anio . $mes;
	}

	function CO_consultarNumeroMesesCostosIndirectosEstimados($idProyecto) {
		$sql = "SELECT
		conv(date_format(min(FECHA_PLAN_INICIO),'%Y%m'),10,10) mes_ini,
		conv(date_format(max(FECHA_PLAN_FIN),'%Y%m'),10,10) mes_fin
		FROM ACTIVIDAD
		WHERE
		ID_PROYECTO= :idProyecto AND PROFUNDIDAD<>0 AND ELIMINADO<>1;";

		$resultado = new stdClass();
		$diferencia = 0;
		$fechaIni = null;
		$fechaFin = null;

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
    			$fechaIni = $p["mes_ini"];
    			$fechaFin = $p["mes_fin"];
    			break;
			}

			if ($fechaIni != null && $fechaFin != null) {
				$aIni = ($fechaIni - ($fechaIni % 100)) / 100;
				$aFin = ($fechaFin - ($fechaFin % 100)) / 100;
				$mIni = $fechaIni % 100;
				$mFin = $fechaFin % 100;
				$diferencia = ($aFin - $aIni)*12 + $mFin - $mIni + 1;
			}
		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		$resultado->fechaIni = $fechaIni;
		$resultado->fechaFin = $fechaFin;
		$resultado->diferencia = $diferencia;

		return $resultado;
	}

	function CO_ConsultarCostosIndirectosEstimados($idProyecto, $resultados) {
		$sql = "SELECT
		A.id_proyecto,
		A.codmes,
		C.ID_CAMBIO_MONEDA,
		C.DESCRIPCION,
		f_aplica_inflacion(IFNULL(A.costo_estimado*B.CAMBIO_A_SOL,0),f_halla_min_dia(:idProyecto),LAST_DAY(STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d'))) COSTO_INDIRECTO_ESTIMADO_SOLES
		FROM 
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		JOIN CAMBIO_MONEDA C ON A.ID_CAMBIO_MONEDA=C.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO=:idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d') ORDER BY 2 ASC;";

		$listaCI = array();

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        		$cInd = new stdClass();
        		$cInd->codMes = $p["codmes"];
    			$cInd->idMoneda =  $p["ID_CAMBIO_MONEDA"];
    			$cInd->costoIndirecto =  $p["COSTO_INDIRECTO_ESTIMADO_SOLES"];
    			$cInd->nombreMoneda = $p["DESCRIPCION"];
    			array_push($listaCI, $cInd);
			}
		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		$listaFinal = null;
		if (sizeof($listaCI) != $resultados->diferencia) {
			$listaFinal = array();
			$j = 0;
			for ($i = $resultados->fechaIni; $i <= $resultados->fechaFin; $i = CO_obtenerSiguienteCodMes($i)) {
				if ($j < sizeof($listaCI)) {
					if ($i < $listaCI[$j]->codMes) {
						$cInd = new stdClass();
		        		$cInd->codMes = $i;
		    			$cInd->idMoneda =  1;
		    			$cInd->costoIndirecto =  0;
		    			$cInd->nombreMoneda = "NUEVOS SOLES";
		    			array_push($listaFinal, $cInd);
					} else {
						/*
						$cInd = new stdClass();
		        		$cInd->codMes = $listaCI[$j]->codMes;
		    			$cInd->idMoneda =  $listaCI[$j]->idMoneda;
		    			$cInd->costoIndirecto =  $listaCI[$j]->costoIndirecto;*/
		    			array_push($listaFinal, $listaCI[$j]);
		    			$j++;
					}
				} else {
					$cInd = new stdClass();
	        		$cInd->codMes = $i;
	    			$cInd->idMoneda =  1;
	    			$cInd->costoIndirecto =  0;
	    			$cInd->nombreMoneda = "NUEVOS SOLES";
	    			array_push($listaFinal, $cInd);
				}
			}
		} else {
			$listaFinal = $listaCI;
		}

		return $listaFinal;
	}

	function CO_consultarNumeroMesesCostosIndirectosReales($idProyecto) {
		$sql = "SELECT
		conv(date_format(min(FECHA_ACTUAL_INICIO),'%Y%m'),10,10) mes_ini,
		conv(date_format(max(FECHA_ACTUAL_FIN),'%Y%m'),10,10) mes_fin
		FROM ACTIVIDAD
		WHERE
		ID_PROYECTO= :idProyecto AND PROFUNDIDAD<>0 AND ELIMINADO<>1;";

		$resultado = new stdClass();
		$diferencia = 0;
		$fechaIni = null;
		$fechaFin = null;

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
    			$fechaIni = $p["mes_ini"];
    			$fechaFin = $p["mes_fin"];
    			break;
			}

			if ($fechaIni != null && $fechaFin != null) {
				$aIni = ($fechaIni - ($fechaIni % 100)) / 100;
				$aFin = ($fechaFin - ($fechaFin % 100)) / 100;
				$mIni = $fechaIni % 100;
				$mFin = $fechaFin % 100;
				$diferencia = ($aFin - $aIni)*12 + $mFin - $mIni + 1;
			}
		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		$resultado->fechaIni = $fechaIni;
		$resultado->fechaFin = $fechaFin;
		$resultado->diferencia = $diferencia;

		return $resultado;
	}

	function CO_ConsultarCostosIndirectosReales($idProyecto, $resultados) {
		$sql = "SELECT
		A.id_proyecto,
		A.codmes,
		C.ID_CAMBIO_MONEDA,
		C.DESCRIPCION,
		IFNULL(A.costo_REAL,0) COSTO_INDIRECTO_REAL_SOLES
		FROM 
		COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
		JOIN CAMBIO_MONEDA C ON A.ID_CAMBIO_MONEDA=C.ID_CAMBIO_MONEDA
		WHERE
		A.ID_PROYECTO= :idProyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d') ORDER BY 2 ASC;";

		$listaCI = array();

		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        		$cInd = new stdClass();
        		$cInd->codMes = $p["codmes"];
    			$cInd->idMoneda =  $p["ID_CAMBIO_MONEDA"];
    			$cInd->costoIndirecto =  $p["COSTO_INDIRECTO_REAL_SOLES"];
    			$cInd->nombreMoneda = $p["DESCRIPCION"];
    			array_push($listaCI, $cInd);
			}
		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		$listaFinal = null;
		if (sizeof($listaCI) != $resultados->diferencia) {
			$listaFinal = array();
			$j = 0;
			for ($i = $resultados->fechaIni; $i <= $resultados->fechaFin; $i = CO_obtenerSiguienteCodMes($i)) {
				if ($j < sizeof($listaCI)) {
					if ($i < $listaCI[$j]->codMes) {
						$cInd = new stdClass();
		        		$cInd->codMes = $i;
		    			$cInd->idMoneda =  1;
		    			$cInd->costoIndirecto =  0;
		    			$cInd->nombreMoneda = "NUEVOS SOLES";
		    			array_push($listaFinal, $cInd);
					} else {
						/*
						$cInd = new stdClass();
		        		$cInd->codMes = $listaCI[$j]->codMes;
		    			$cInd->idMoneda =  $listaCI[$j]->idMoneda;
		    			$cInd->costoIndirecto =  $listaCI[$j]->costoIndirecto;*/
		    			array_push($listaFinal, $listaCI[$j]);
		    			$j++;
					}
				} else {
					$cInd = new stdClass();
	        		$cInd->codMes = $i;
	    			$cInd->idMoneda =  1;
	    			$cInd->costoIndirecto =  0;
	    			$cInd->nombreMoneda = "NUEVOS SOLES";
	    			array_push($listaFinal, $cInd);
				}
			}
		} else {
			$listaFinal = $listaCI;
		}

		return $listaFinal;
	}

	function CO_guardarCostosIndirectosEstimados($objeto) {
		$respuesta = null;
		try {
			foreach ($objeto->listaCostosIndirectos as $elemento) {
				CO_guardarCIE($elemento, $objeto->idProyecto);
			}
			$respuesta = CO_crearRespuesta(0, "Ok");
		} catch (PDOException $e) {
			$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		return $respuesta;
	}

	function CO_guardarCIE($elemento,$idProyecto) {
		$sql = "SELECT
		ID_PROYECTO,
		CODMES,
		COSTO_ESTIMADO,
		ID_CAMBIO_MONEDA
		FROM
		COSTO_INDIRECTO
		WHERE
		ID_PROYECTO= :idProyecto AND CODMES= :codMes;";

		$lista = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
    		$stmt->bindParam("codMes", $elemento->codMes);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        			$obj = new stdClass();
        			$obj->codMes = $p["CODMES"];
					array_push($lista, $obj);
			}
		} catch(PDOException $e) {
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		if (sizeof($lista) > 0) {
			CO_actualizarCIE($elemento, $idProyecto);

		} else {
			CO_insertarCIE($elemento, $idProyecto);
		}
	}

	function CO_insertarCIE($elemento, $idProyecto) {
		$sql = "INSERT INTO COSTO_INDIRECTO (id_proyecto,codmes,costo_estimado,id_cambio_moneda)
		VALUES (:idProyecto, :codMes, :costoIndirecto, :idMoneda);
		COMMIT;";

		$db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("idProyecto", $idProyecto);
    	$stmt->bindParam("codMes", $elemento->codMes);
    	$stmt->bindParam("costoIndirecto", $elemento->costoIndirecto);
		$stmt->bindParam("idMoneda", $elemento->idMoneda);
    	$stmt->execute();
    	$db = null;
	}

	function CO_actualizarCIE($elemento, $idProyecto) {
		$sql = "UPDATE COSTO_INDIRECTO
		SET COSTO_ESTIMADO= :costoIndirecto, ID_CAMBIO_MONEDA = :idMoneda
		WHERE
		ID_PROYECTO= :idProyecto AND CODMES= :codMes;
		COMMIT;";

		$db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("idProyecto", $idProyecto);
    	$stmt->bindParam("codMes", $elemento->codMes);
    	$stmt->bindParam("costoIndirecto", $elemento->costoIndirecto);
    	$stmt->bindParam("idMoneda", $elemento->idMoneda);
    	$stmt->execute();
    	$db = null;
	}

	function CO_guardarCostosIndirectosReales($objeto) {
		$respuesta = null;
		try {
			foreach ($objeto->listaCostosIndirectos as $elemento) {
				CO_guardarCIR($elemento, $objeto->idProyecto);
			}
			$respuesta = CO_crearRespuesta(0, "Ok");
		} catch (PDOException $e) {
			$respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		return $respuesta;
	}

	function CO_guardarCIR($elemento,$idProyecto) {
		$sql = "SELECT
		ID_PROYECTO,
		CODMES,
		COSTO_REAL,
		ID_CAMBIO_MONEDA
		FROM
		COSTO_INDIRECTO
		WHERE
		ID_PROYECTO= :idProyecto AND CODMES=:codMes;";

		$lista = array();
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
    		$stmt->bindParam("codMes", $elemento->codMes);
        	$stmt->execute();
        	$db = null;
        	
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
        			$obj = new stdClass();
        			$obj->codMes = $p["CODMES"];
					array_push($lista, $obj);
			}
		} catch(PDOException $e) {
        	return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}

		if (sizeof($lista) > 0) {
			CO_actualizarCIR($elemento, $idProyecto);

		} else {
			CO_insertarCIR($elemento, $idProyecto);
		}
	}

	function CO_insertarCIR($elemento,$idProyecto) {
		$sql = "INSERT INTO COSTO_INDIRECTO (id_proyecto,codmes,costo_real,id_cambio_moneda)
		VALUES (:idProyecto, :codMes, :costoIndirecto, :idMoneda);
		COMMIT;";

		$db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("idProyecto", $idProyecto);
    	$stmt->bindParam("codMes", $elemento->codMes);
    	$stmt->bindParam("costoIndirecto", $elemento->costoIndirecto);
		$stmt->bindParam("idMoneda", $elemento->idMoneda);
    	$stmt->execute();
    	$db = null;
	}

	function CO_actualizarCIR($elemento, $idProyecto) {
		$sql = "UPDATE COSTO_INDIRECTO
		SET COSTO_REAL= :costoIndirecto, ID_CAMBIO_MONEDA = :idMoneda
		WHERE
		ID_PROYECTO= :idProyecto AND CODMES= :codMes;
		COMMIT;";

		$db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("idProyecto", $idProyecto);
    	$stmt->bindParam("codMes", $elemento->codMes);
    	$stmt->bindParam("costoIndirecto", $elemento->costoIndirecto);
    	$stmt->bindParam("idMoneda", $elemento->idMoneda);
    	$stmt->execute();
    	$db = null;
	}

	function CO_consultarReservaContingencia($idProyecto) {
		$sql = "SELECT
		IFNULL(SUM(A.COSTO_POTENCIAL*B.PORCENTAJE_CONTINGENCIA/100),0) RESERVA_CONTINGENCIA
		FROM
		RIESGO_X_PROYECTO A JOIN
		PAQUETE_TRABAJO B ON A.ID_PAQUETE_TRABAJO=B.ID_PAQUETE_TRABAJO
		WHERE
		A.ID_PROYECTO= :idProyecto AND B.ID_ESTADO=1;";

		$reservaContingencia = 0;
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$reservaContingencia = $p["RESERVA_CONTINGENCIA"];
					break;
			}
		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		
		return $reservaContingencia;
	}

	function CO_consultarListaPaquetesCostoReal($idProyecto) { //COMPLETO
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
				CO_obtenerPaquetesHijoCostoReal($paqueteRaiz);
				$jsonRespuesta = new stdClass();
				$jsonRespuesta->raiz = $paqueteRaiz;
				//echo 'aaaa';
				$paqueteRaiz->sumarCostosPaquete();
				array_push($listaPaquetes, $paqueteRaiz);
			}

		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		//se llamara una funcion que devuelve data falsa por mientras.		
		//$listaPaquetes = CO_obtenerListaPaquetesFalsa();
		
		return $listaPaquetes;
	}

	function CO_obtenerPaquetesHijoCostoReal(&$paquete) {
		if ($paquete != null) {

			$sql = "SELECT
			A.ID_PROYECTO,
			Y.ID_PAQUETE_TRABAJO,
			Y.NOMBRE NOMBRE_PAQUETE,
			SUM(CASE
			WHEN B.ID_PAQUETE_TRABAJO IS NULL OR C.ID_ACTIVIDAD IS NULL OR D.ID_RECURSO IS NULL OR X.ID_CAMBIO_MONEDA IS NULL THEN 0
			WHEN B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1  AND Z.ID_ESTADO<>4 AND D.ESTADO<>'ELIMINADO' AND C.ESTADO<>0
				THEN IFNULL(C.CANTIDADREAL,0)*(IFNULL(C.COSTO_UNITARIO_REAL*CAMBIO_A_SOL,0))
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
				//echo json_encode($respuesta);
				return;
			}

			//echo 'paquete <' . $paquete->idPaquete . '>';
			//echo sizeof($paquete->listaPaquetesHijo);
			foreach ($paquete->listaPaquetesHijo as $hijo) {
				CO_obtenerPaquetesHijoCostoReal($hijo);
			}

			return;
		}
		return;
	}

	function CO_consultarCostoIndirectoTotalEstimado($idProyecto) {
		$sql = "SELECT 
		f_aplica_inflacion(SUM(COSTO_ESTIMADO),f_halla_min_dia(:idProyecto),LAST_DAY(STR_TO_DATE(CONCAT(CODMES,'01'),'%Y%m%d'))) COSTO_INDIRECTO
		FROM dp2.COSTO_INDIRECTO
		WHERE
		ID_PROYECTO=:idProyecto;";

		$costoIndirectoTotal = 0;
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$proyecto = null; 
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$costoIndirectoTotal = $p["COSTO_INDIRECTO"];
					break;
			}
			//echo json_encode($listaRecursos);

		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		

		//se llamara una funcion que devuelve data falsa por mientras.	
		//$proyecto = CO_obtenerInfoProyectoFalsa();
		
		return $costoIndirectoTotal;
	}

	function CO_consultarCostoIndirectoTotalReal($idProyecto) {
		$sql = "SELECT 
		SUM(COSTO_REAL) COSTO_INDIRECTO
		FROM dp2.COSTO_INDIRECTO
		WHERE
		ID_PROYECTO= :idProyecto;";

		$costoIndirectoTotal = 0;
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $idProyecto);
        	$stmt->execute();
        	$db = null;
        	$proyecto = null; 
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$costoIndirectoTotal = $p["COSTO_INDIRECTO"];
					break;
			}
			//echo json_encode($listaRecursos);

		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		

		//se llamara una funcion que devuelve data falsa por mientras.	
		//$proyecto = CO_obtenerInfoProyectoFalsa();
		
		return $costoIndirectoTotal;
	}

	function CO_consultarMontoContingencia($objeto) {
		$sql = "SELECT
		IFNULL(SUM(A.COSTO_POTENCIAL*:porcContingencia/100),0) RESERVA_CONTINGENCIA
		FROM
		RIESGO_X_PROYECTO A JOIN
		PAQUETE_TRABAJO B ON A.ID_PAQUETE_TRABAJO=B.ID_PAQUETE_TRABAJO
		WHERE
		A.ID_PROYECTO=:idProyecto AND B.ID_ESTADO=1 AND A.positivo_negativo=0;";

		$montoContingencia = 0;
		try {
			$db = getConnection();
        	$stmt = $db->prepare($sql);
        	$stmt->bindParam("idProyecto", $objeto->idProyecto);
        	$stmt->bindParam("porcContingencia", $objeto->porcContingencia);
        	$stmt->execute();
        	$db = null;
        	$proyecto = null; 
        	while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$montoContingencia = $p["RESERVA_CONTINGENCIA"];
					break;
			}
			//echo json_encode($listaRecursos);

		} catch(PDOException $e) {
			return $respuesta = CO_crearRespuesta(-1, $e->getMessage());
		}
		

		//se llamara una funcion que devuelve data falsa por mientras.	
		//$proyecto = CO_obtenerInfoProyectoFalsa();
		
		return $montoContingencia;
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