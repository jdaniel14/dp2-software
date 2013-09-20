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
		$roles=CR_obtenerRolesTotalFalsa();
		$recursos=CR_obtenerRecursosTotalFalsa();
		
		$proyecto =new CR_ProyectoJSON($actividades,0,array(),true,true,$roles,$recursos);
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


	function CR_obtenerRolesTotalFalsa(){
		$listaRoles = array();
								 //id,                name	
		$rol1 = new CR_Recurso("tmp_1", "Project Manager");
		$rol2 = new CR_Recurso("tmp_2", "Worker");
		$rol3 = new CR_Recurso("tmp_3", "Stakeholder/Customer");
		array_push($listaRoles, $rol1, $rol2, $rol3);
		
		return $listaRoles;

	}
	function CR_obtenerRecursosTotalFalsa(){
		$listaRecursos = array();
		$recurso1 = new CR_Recurso("tmp_1", "Recurso 1");
		$recurso2 = new CR_Recurso("tmp_2", "Recurso 2");
		$recurso3 = new CR_Recurso("tmp_3", "Recurso 3");
		$recurso4 = new CR_Recurso("tmp_4", "Recurso 4");
		$recurso5 = new CR_Recurso("tmp_5", "Recurso 5");
		$recurso6 = new CR_Recurso("tmp_6", "Recurso 6");
		$recurso7 = new CR_Recurso("tmp_7", "Recurso 7");
		$recurso8 = new CR_Recurso("tmp_8", "Recurso 8");
		$recurso9 = new CR_Recurso("tmp_9", "Recurso 9");
		$recurso10 = new CR_Recurso("tmp_10", "Recurso 10");
		array_push($listaRecursos, $recurso1, $recurso2, $recurso3, $recurso4, $recurso5, $recurso6,$recurso7, $recurso8, $recurso9, $recurso10);
		
		return $listaRecursos;
	
	}
	function CR_obtenerListaRecursosAsignadosFalsa() {
		$listaRecursos = array();
								 //id,                effort, resourceId, role_id	
		$recurso1 = new CR_RecursoAsignado("tmp_1", 13800000, "tmp_5", "tmp_3");
		$recurso2 = new CR_RecursoAsignado("tmp_2", 9600000, "tmp_3", "tmp_2");
		$recurso3 = new CR_RecursoAsignado("tmp_3", 6600000, "tmp_9", "tmp_1");
		array_push($listaRecursos, $recurso1, $recurso2, $recurso3);
		
		return $listaRecursos;
	}

	function CR_obtenerInfoActividadesFalsa(){

		$listaActividades = array();
		$listaRecursos = array();
		$listaRecursos=CR_obtenerListaRecursosAsignadosFalsa();
		$actividad1= new CR_Actividad(-1,"Proyecto 1","P1",0,"STATUS_ACTIVE",1346623200000,16,1348523999999,true,false,array(),"","",0);
        $actividad2= new CR_Actividad(-2,"Analisis","AN",1,"STATUS_ACTIVE",1346623200000,10,1347659999999,false,false,$listaRecursos,"","",0);
    	$actividad3= new CR_Actividad(-3,"Busqueda de proveedores","BP",2,"STATUS_ACTIVE",1346623200000,2,1346795999999,false,false,array(),"","",0);
    	$actividad4= new CR_Actividad(-4,"Busqueda de clientes","BC",2,"STATUS_SUSPENDED",1346796000000,4,1347314399999,false,false,array(),"3","",0);
    	$actividad5= new CR_Actividad(-5,"Implementacion","IE",1,"STATUS_SUSPENDED",1347832800000,6,1348523999999,false,false,array(),"2:5","",0);
    	$actividad6= new CR_Actividad(-6,"Desarrollo","DE",2,"STATUS_SUSPENDED",1347832800000,2,1348005599999,false,false,array(),"","",0);
    	$actividad7= new CR_Actividad(-7,"Pruebas de integracion","PI",2,"STATUS_SUSPENDED",1348005600000,3,1348264799999,false,false,array(),"6","",0);
    	$actividad8= new CR_Actividad(-8,"Implantacion","IA",2,"STATUS_SUSPENDED",1348005600000,2,1348178399999,false,false,array(),"6","",0);
		
		
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