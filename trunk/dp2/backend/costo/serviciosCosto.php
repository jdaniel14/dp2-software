<?php
	include('routesCosto.php');
	include('clasesCosto.php');
	include_once '../backend/conexion.php';

	function CO_getInfoProyecto($json) {
		$proy = json_decode($json);
		$infoProyecto = CO_consultarInfoProyecto($proy->idProyecto);
		return json_encode($infoProyecto);
	}
	
	function CO_getRecursos($json) {
		$proy = json_decode($json);
		$listaRecursos = CO_consultarListaRecursos($proy->idProyecto);
		return $listaRecursos;
	}
	
	function CO_getListaActividades(/*$json*/) {
		//$proy = json_decode($json);
		$listaActividades = CO_consultarListaActividades(/*$proy->idProyecto*/ 1);
		echo json_encode($listaActividades);
	}
	
	function CO_getInfoActividad($json) {
		
	}
	
	function CO_saveCURecursos($json) {
		
	}
	
	function CO_getListaPaquetes($json) {
		
	}
	
	function CO_saveTipoCuenta($json) {
		
	}
	
	//funciones que apoyan a los servicios.
	function CO_consultarInfoProyecto($idProyecto) {
		//$connection = new conexion();
		$proyecto = new CO_Proyecto();
		//hacer consulta a la bd...
		
		//se llamara una funcion que devuelve data falsa por mientras.	
		CO_obtenerInfoProyectoFalsa($proyecto);
		
		return $proyecto;
	}
	
	function CO_consultarListaRecursos($idProyecto) {
		//$connection = new conexion();
		$listaRecursos = array();
		//hacer consulta a la bd...
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		CO_obtenerListaRecursosFalsa($listaRecursos);
		
		return $listaRecursos;
	}
	
	function CO_consultarListaActividades($idProyecto) {
		//$connection = new conexion();
		$listaActividades = array();
		//hacer consulta a la bd...
		
		//se llamara una funcion que devuelve data falsa por mientras.		
		CO_obtenerListaActividadesFalsa($listaActividades);
		
		return $listaActividades;
	}
	
	//funciones de llenado falso de datos para pruebas.
	function CO_obtenerInfoProyectoFalsa($proyecto) {
		$proyecto->idProyecto = 1;
		$proyecto->nombre = "El proyecto de Carlitox";
		$proyecto->presupuestototal = 999.0;
		$proyecto->porcentajeReserva = 0.2;
	}
	
	function CO_obtenerListaRecursosFalsa($listaRecursos) {
		$recurso1 = new CO_Recurso(1, 1, 'Recurso1', 10.0, 1, 50);
		$recurso2 = new CO_Recurso(2, 1, 'Recurso2', 20.0, 1, 10);
		$recurso3 = new CO_Recurso(3, 2, 'Recurso3', 30.5, 2, 20);
		$recurso4 = new CO_Recurso(4, 3, 'Recurso4', 25.0, 1, 40);
		array_push($listaRecursos, $recurso1, $recurso2, $recurso3, $recurso4);
	}
	
	function CO_obtenerListaActividadesFalsa($listaActividades) {
		$listaRecursos = array();
		CO_obtenerListaRecursosFalsa($listaRecursos);
		$actividad1 = new CO_Actividad(1, 'Actividad1', 1, 10.0, 20.0, null);
		$actividad2 = new CO_Actividad(2, 'Actividad2', 1, 20.0, 25.0, json_encode($listaRecursos));
		$actividad3 = new CO_Actividad(3, 'Actividad3', 2, 30.5, 40.0, null);
		array_push($listaActividades, $actividad1, $actividad2, $actividad3);
	}
?>