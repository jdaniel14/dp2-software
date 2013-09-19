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

	function CR_getRecursos($json) { //servicio5
	
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
		$proyecto =new CR_ProyectoJSON($actividades,0,array(),true,true);
		return $proyecto;
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
		//$listaRecursos = CR_obtenerListaRecursosFalsa();
		$actividad1= new CR_Actividad(-1,"Gantt editor","GE",0,"STATUS_ACTIVE",1346623200000,16,1348523999999,true,false,array(),"","",0);
        $actividad2= new CR_Actividad(-2,"coding","CO",1,"STATUS_ACTIVE",1346623200000,10,1347659999999,false,false,array(),"","",0);
    	$actividad3= new CR_Actividad(-3,"gant part","GP",2,"STATUS_ACTIVE",1346623200000,2,1346795999999,false,false,array(),"","",0);
    	$actividad4= new CR_Actividad(-4,"editor part","EP",2,"STATUS_SUSPENDED",1346796000000,4,1347314399999,false,false,array(),"3","",0);
    	$actividad5= new CR_Actividad(-5,"testing","TE",1,"STATUS_SUSPENDED",1347832800000,6,1348523999999,false,false,array(),"2:5","",0);
    	$actividad6= new CR_Actividad(-6,"test on safari","TS",2,"STATUS_SUSPENDED",1347832800000,2,1348005599999,false,false,array(),"","",0);
    	$actividad7= new CR_Actividad(-7,"test on ie","TI",2,"STATUS_SUSPENDED",1348005600000,3,1348264799999,false,false,array(),"6","",0);
    	$actividad8= new CR_Actividad(-8,"test on chrome","TC",2,"STATUS_SUSPENDED",1348005600000,2,1348178399999,false,false,array(),"6","",0);
		
		
		/*$actividad1 = new CR_Actividad(1, 'Actividad1', 1, 10.0, 20.0, null);
		$actividad2 = new CR_Actividad(2, 'Actividad2', 1, 20.0, 25.0, $listaRecursos);
		$actividad3 = new CR_Actividad(3, 'Actividad3', 2, 30.5, 40.0, null);
		*/
		array_push($listaActividades, $actividad1, $actividad2, $actividad3,$actividad4,$actividad5,$actividad6,$actividad7,$actividad8);
		
		return $listaActividades;
	}
	
	function CR_obtenerInfoCalendarioBaseFalsa(){
		
		$calendarioBase1= new CR_CalendarioBase(1,'08:30','12:00','01:00','06:30',8,20,12);
		return $calendarioBase1;
	
	}


?>