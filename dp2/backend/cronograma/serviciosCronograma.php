<?php
	include('routesCronograma.php');
	include('clasesCronograma.php');

//Servicios


	function CR_getActividades($json) {//servicio1
		$proy = json_decode($json);
		//$oscar=$proy->idProyecto;
		$infoActividades = CR_consultarInfoActividades($proy->idProyecto);

		echo json_encode($infoActividades);
	}


	function CR_guardarActividades($json) { //servicio2
		$objeto = json_decode($json);
		$jsonRespuesta = CR_guardarActividadesBD($objeto);
		
		echo json_encode($jsonRespuesta);
	}
	
	
	function CR_getCalendarioBase($json) {//servicio3
		$proy = json_decode($json);
		$infoCalendarioBase = CR_consultarCalendarioBase($proy->idProyecto);

		echo json_encode($infoCalendarioBase);
	}



	function CR_guardarCalendarioBase($json) { //servicio4
		$objeto = json_decode($json);
		$jsonRespuesta = CR_guardarcalendarioBaseBD($objeto);
		
		echo json_encode($jsonRespuesta);
	}

	function CR_getRecursos($json) { //servicio 5
	
		$proy = json_decode($json);
		$infoRecursos =CR_consultarRecursos($proy->idProyecto);
		
		echo json_encode($infoRecursos);
	}


//Funciones implementadas que necesitan los servicios



	function CR_consultarInfoActividades($idProyecto) {
		//realizar la conexion a la BD
		//$conexion=Conectarse();
		//Desconectarse(conexion);
		
		
		
		//Hardcode
		$actividades = CR_obtenerInfoActividadesFalsa();
		
		return $actividades;
	}

	function CR_guardarActividadesBD($objecto){
	
	
		return CR_obtenerRespuestaExito();
	
	}
	function CR_consultarCalendarioBase($idProyecto){
		//realizar la conexion a la BD
		//$conexion=Conectarse();
		//Desconectarse(conexion);
		
		
		
		//Hardcode
		$calendarioBase = CR_obtenerInfoCalendarioBaseFalsa();
		
		return $calendarioBase;
	
	}
	function CR_guardarcalendarioBaseBD($objeto){
	
		return CR_obtenerRespuestaExito();
	
	}
	
	
	function CR_consultarRecursos($idProyecto){
	
	
		$listaRecursos=CR_obtenerListaRecursosFalsa();
		return $listaRecursos;
		
	}
	
	//funciones de conexion
	function Conectarse(){ //realizar conexion con la BD
	   if (!($link=mysql_connect("localhost","usuario","Password"))) 
	   { 
	      echo "Error conectando a la base de datos."; 
	      exit(); 
	   } 
	   if (!mysql_select_db("base_datos",$link)) 
	   { 
	      echo "Error seleccionando la base de datos."; 
	      exit(); 
	   } 	
	   return $link; 
	} 

	function Desconectarse($link){

		mysql_close($link);//cierra la conexion
	}	
	
//Funciones de tipo de respuesta
	function CR_obtenerRespuestaExito() {
		$respuesta = new stdClass();
		$respuesta->codRespuesta = 1;
		$respuesta->mensaje = 'Success';
		
		return $respuesta;
	}

	function CR_obtenerRespuestaFracaso() {
		$respuesta = new stdClass();
		$respuesta->codRespuesta = 0;
		$respuesta->mensaje = 'Error';
		
		return $respuesta;
	}
//Funciones hardcode

	function CR_obtenerListaRecursosFalsa() {
		$listaRecursos = array();
		$recurso1 = new CR_Recurso(1, 1, 'Recurso1', 10.0, 1, 50);
		$recurso2 = new CR_Recurso(2, 1, 'Recurso2', 20.0, 1, 10);
		$recurso3 = new CR_Recurso(3, 2, 'Recurso3', 30.5, 2, 20);
		$recurso4 = new CR_Recurso(4, 3, 'Recurso4', 25.0, 1, 40);
		array_push($listaRecursos, $recurso1, $recurso2, $recurso3, $recurso4);
		
		return $listaRecursos;
	}

	function CR_obtenerInfoActividadesFalsa(){

		$listaActividades = array();
		$listaRecursos = CR_obtenerListaRecursosFalsa();
		$actividad1 = new CR_Actividad(1, 'Actividad1', 1, 10.0, 20.0, null);
		$actividad2 = new CR_Actividad(2, 'Actividad2', 1, 20.0, 25.0, $listaRecursos);
		$actividad3 = new CR_Actividad(3, 'Actividad3', 2, 30.5, 40.0, null);
		array_push($listaActividades, $actividad1, $actividad2, $actividad3);
		
		return $listaActividades;
	}
	
	function CR_obtenerInfoCalendarioBaseFalsa(){
		
		$calendarioBase1= new CR_CalendarioBase(1,'08:30','12:00','01:00','06:30',8,20,12);
		return $calendarioBase1;
	
	}


?>