<?php
	include('routesCosto.php');
	include('clasesCosto.php');
	include_once '../backend/conexion.php';

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
	
	//---------------------------------------------------------------
	//funciones que apoyan a los servicios.
	function CO_consultarInfoProyecto($idProyecto) {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		
		//se llamara una funcion que devuelve data falsa por mientras.	
		$proyecto = CO_obtenerInfoProyectoFalsa();
		
		return $proyecto;
	}
	
	function CO_consultarInfoActividad($idProyecto, $idActividad) {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		
		//se llamara una funcion que devuelve data falsa por mientras.	
		$actividad = CO_obtenerInfoActividadFalsa();
		
		return $actividad;
	}
	
	function CO_consultarListaRecursos($idProyecto) {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		$listaRecursos = CO_obtenerListaRecursosFalsa();
		
		return $listaRecursos;
	}
	
	function CO_consultarListaActividades($idProyecto) {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		$listaActividades = CO_obtenerListaActividadesFalsa();
		
		return $listaActividades;
	}
	
	function CO_consultarListaPaquetes($idProyecto) {
		//$connection = new conexion();
		
		//hacer consulta a la bd...
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		$listaPaquetes = CO_obtenerListaPaquetesFalsa();
		
		return $listaPaquetes;
	}
	
	function CO_guardarCURyPorcReserva($obj) {
		//insertar en la bd...
		/*
		$obj->idProyecto;
		$obj->listaRecursos;
			$obj->listaRecursos[0];
		$obj->listaCUR;
			$obj->listaCU[0];
		$obj->porcReserva;
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
		
		//obtener respuesta falsa;
		$respuesta = CO_obtenerRespuestaPositivaDeGuardadoFalsa();
		
		return $respuesta;
	}
	
	//---------------------------------------------------------------
	//funciones de llenado falso de datos para pruebas.
	function CO_obtenerInfoProyectoFalsa() {
		$proyecto = new CO_Proyecto(1, 'El proyecto de Carlitox', 999.0, 0.2);
		
		return $proyecto;
	}
	
	function CO_obtenerInfoActividadFalsa() {
		$actividad = new CO_Actividad(1, 'Actividad paranormal', 2, 30.0, 50.5, CO_obtenerListaRecursosFalsa());
		
		return $actividad;
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