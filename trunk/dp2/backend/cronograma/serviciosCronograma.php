<?php
	include('routesCronograma.php');

//Servicios

	function CR_getActividades($json) {//servicio1
		$proy = json_decode($json);
		$infoActividades = CR_consultarInfoActividades($proy->idProyecto);

		echo json_encode($infoActividades);
	}



	function CR_guardarActividades($json) { //servicio2
		$objeto = json_decode($json);
		$jsonRespuesta = CR_guardarActividades($objeto);
		
		echo json_encode($jsonRespuesta);
	}


	function CR_getCalendarioBase($json) {//servicio3
		$proy = json_decode($json);
		$infoCalendarioBase = CR_consultarCalendarioBase($proy->idProyecto);

		echo json_encode($infoCalendarioBase);
	}



	function CR_guardarCalendarioBase($json) { //servicio4
		$objeto = json_decode($json);
		$jsonRespuesta = CR_guardarcalendarioBase($objeto);
		
		echo json_encode($jsonRespuesta);
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





?>