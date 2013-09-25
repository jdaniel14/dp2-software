<?php

include('routesCronograma.php');
include('clasesCronograma.php');
include_once '../backend/conexion.php';

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
    $infoRecursos = CR_consultarRecursos($proy->idProyecto);

    echo json_encode($infoRecursos);
}

function CR_getDependencias($json) {//servicio6
    $proy = json_decode($json);

    $listaDependencias = CR_consultarListaDependencia($proy->idProyecto);

    echo json_encode($listaDependencias);

    /* DEPENDENCIAS:
      ----------------
      NO PUEDES DEPENDER DE ACTIVIDADES QUE APARESCAN DEBAJO DE LA TUYA.

      FORMATO DE DEPENDENCIA -----> NUMERO:DIAS(PUEDE SER POSITIVO ¿NEGATIVO?, EL 0 INDICA QUE EMPIEZA INMEDIATAMENTE DESPUES)

      FORMATO DE VARIAS DEPENDENCIAS  ------> SE ANIDAN POR COMAS SI SE UTILIZA ":", VALIDA SI ESTE ES MAYOR AL FIN DE LA ÚLTIMA DEPENDENCIA

      OJO: DEBERIAMOS DE PREGUNTAR SI SE DEBE VALIDAR EL NÚMERO NEGATIVO YA QUE DEPENDENCIA SIGNIFICA QUE NO PUEDE ARRANCAR DÍAS ANTES PERO SÍ DIÁS DESPUES.¿?

     * EL FRONT DEBE VALIDAR ESTO YA QUE CUENTA CON LOS DATOS DE LAS UBICACIONES, JERARQUIAS Y TODO LO DEMÁS

     * ESTO SOLO SI SE NECESITA LOS ID DE TODAS LAS LISTAS, PARA EL GANTT NO ES NECESARIO YA QUE LA API LO ARMA SEGÚN LO ALAMCENAMOS EN BD */
}
function CR_postActividades() {//servicio7
   

    
    $request = \Slim\Slim::getInstance()->request();
    $actividades = json_decode($request->getBody());
    

    $arreglo_actividades=$actividades->idProyecto->tasks;
    
    
    for ($i=0;$i<sizeof($arreglo_actividades);$i++) CR_guardar_actividades_BD($arreglo_actividades[$i]);
    
    echo json_encode($jsonRespuesta);
}
//Funciones implementadas que necesitan los servicios
function CR_consultarListaDependencia($idProyecto){
    
        $listaDependencias = CR_obteneListaDependenciaFalsa($idProyecto);
         return $listaDependencias;
    
    
}

function CR_consultarInfoActividades($idProyecto) {
    //realizar la conexion a la BD
    //$link=mysql_connect("200.16.7.112","dp_usuario","usuario.2013.")))
    /* $con=mysqli_connect("200.16.7.112","dp_usuario","usuario.2013.","dp2");
      // Verificar conexión
      if (mysqli_connect_errno()){
      echo "Error al conectar con MySQL: " . mysqli_connect_error();
      }
     */
    //Hardcode
	
	$sql = "SELECT * FROM ACTIVIDAD WHERE id_proyecto=? order by numero_fila";
	$sql2= "SELECT nombre FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo=?";
	$lista_actividad = array();	
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->execute(array($idProyecto));
			
			while($p = $stmt->fetch(PDO::FETCH_ASSOC)){
					$detalle_paquete="";
					
					if ($p["id_paquete_trabajo"]!=NULL){
						//echo "{ ". ($p["id_paquete_trabajo"]!=NULL) ."}";
						$stmt2 = $db->prepare($sql2);
						$stmt2->execute(array($p["id_paquete_trabajo"]));
						if ($p2 = $stmt2->fetch(PDO::FETCH_ASSOC))$detalle_paquete=$p2["nombre"];
					}
					$lista_recursos_asignados=CR_obtenerListaRecursosAsignadosFalsa();
					$actividad = array("id_task"=>$p["id_actividad"]+0, "name"=>$p["nombre_actividad"], "id_Wbs"=>$p["id_paquete_trabajo"]+0,"wbsNode"=>$detalle_paquete, "start_date"=>$p["fecha_plan_inicio"],"end_date"=>$p["fecha_plan_fin"],"id"=>-$p["numero_fila"]+0, "level"=>$p["profundidad"]+0, "depends"=>$p["predecesores"], "progress"=>$p["avance"],"cost"=>$p["costo"]+0,"status"=>$p["estado"],"code"=>$p["codigo"] ,"duration"=>$p["dias"]+0,"description"=>$p["descripcion"],"assigs"=>array(),"start"=>$p["inicio_hash"]+0,"end"=>$p["fin_hash"]+0,"startIsMilestone"=>false,"endIsMilestone"=>false);
					array_push($lista_actividad, $actividad);
			}

			$db = null;
			////////echo json_encode(array("tasks"=>$lista_actividad)) ;
		} catch(PDOException $e) {
//			      echo '{"error":{"text":'. $e->getMessage() .'}}';
			echo json_encode(array("me"=> $e->getMessage()));
		}
	//echo "Hardcode";
	
	date_default_timezone_set('America/Lima');
	
	$milliseconds = round(microtime(true) * 1000);
	$offset=$milliseconds-1346623200000;
	$mil =1348005600000+$offset;
	$mil2=1348178399999+$offset;
	      //
	$seconds = $mil / 1000;
	$seconds2 = $mil2 / 1000;
	//echo $offset.'\n';
	//echo date("d-m-Y", $seconds).'\n';
	//echo date("d-m-Y", $seconds2).'\n';
    //1380080255779
	
	$actividades = CR_obtenerInfoActividadesFalsa();
    $roles = CR_obtenerRolesTotalFalsa();
    $recursos = CR_obtenerRecursosTotalFalsa();

    $proyecto = new CR_ProyectoJSON($lista_actividad, 0, array(), true, true, $roles, $recursos);
    return $proyecto;
}

function CR_guardarActividadesBD($objecto) {


    return CR_obtenerRespuestaExito();
}

function CR_consultarCalendarioBase($idProyecto) {
    //realizar la conexion a la BD
    //$conexion=Conectarse();
    //Desconectarse(conexion);
    //Hardcode
    $calendarioBase = CR_obtenerInfoCalendarioBaseFalsa();

    return $calendarioBase;
}

function CR_guardarcalendarioBaseBD($objeto) {

    return CR_obtenerRespuestaExito();
}

function CR_consultarRecursos($idProyecto) {


    $listaRecursos = CR_obtenerRecursosTotalFalsa();
    return $listaRecursos;
}

//funciones de conexion
function Conectarse() { //realizar conexion con la BD 
    echo "Conectando";
    if (!($link = mysql_connect("200.16.7.112", "dp_usuario", "usuario.2013."))) {
        echo "Error conectando a la base de datos.";
        exit();
    }
    if (!mysql_select_db("dp2", $link)) {
        echo "Error seleccionando la base de datos.";
        exit();
    }
    return $link;
}

function Desconectarse($link) {

    mysql_close($link); //cierra la conexion
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

function CR_guardar_actividades_BD($actividad){
    
	echo $actividad->start ." ". $actividad->end;
   /*     $sql = "INSERT INTO ACTIVIDAD () VALUES (:nombre_actividad)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("nombre_actividad", $actividad->name);
        $stmt->execute();
        //$proj->id = $db->lastInsertId();//ESTO SE PUEDE BOTAR A LA BD
        $db = null;
        
    } catch(PDOException $e) {
        echo json_encode(array("me"=> $e->getMessage()));
				//'{"error":{"text":'. $e->getMessage() .'}}';
    }
    */
    
}

//Funciones hardcode
function CR_obteneListaDependenciaFalsa() {
    $listaDependencias = array();
    //igual al numero de actividades, SE DEBERÍA REALIZAR CON UN WHILE POR TODAS LAS ACTIVIDADES
    $dep1 = new CR_Dependencia("1", "11-11-2013","14-11-2013","0");
    $dep2 = new CR_Dependencia("2", "15-11-2013","18-11-2013","1");
    $dep3 = new CR_Dependencia("3", "19-11-2013","23-11-2013","2");
    array_push($listaDependencias, $dep1, $dep2, $dep3);

    return $listaDependencias;
}

function CR_obtenerRolesTotalFalsa() {
    $listaRoles = array();
    //id,                name	
    $rol1 = new CR_Rol("tmp_1", "Project Manager");
    $rol2 = new CR_Rol("tmp_2", "Worker");
    $rol3 = new CR_Rol("tmp_3", "Stakeholder/Customer");
    array_push($listaRoles, $rol1, $rol2, $rol3);

    return $listaRoles;
}

function CR_obtenerRecursosTotalFalsa() {
    $listaRecursos = array();
    $recurso1 = new CR_Recurso("tmp_1", "Recurso 1","Dias",90);
    $recurso2 = new CR_Recurso("tmp_2", "Recurso 2","Servicio",2500);
    $recurso3 = new CR_Recurso("tmp_3", "Recurso 3","Horas",26);
    $recurso4 = new CR_Recurso("tmp_4", "Recurso 4","Dias",90);
    $recurso5 = new CR_Recurso("tmp_5", "Recurso 5","Unidades",1200);
    $recurso6 = new CR_Recurso("tmp_6", "Recurso 6","Horas",26);
    $recurso7 = new CR_Recurso("tmp_7", "Recurso 7","Servicio",2500);
    $recurso8 = new CR_Recurso("tmp_8", "Recurso 8","Horas",26);
    $recurso9 = new CR_Recurso("tmp_9", "Recurso 9","Dias",90);
    $recurso10 = new CR_Recurso("tmp_10", "Recurso 10","Servicio",2500);
    array_push($listaRecursos, $recurso1, $recurso2, $recurso3, $recurso4, $recurso5, $recurso6, $recurso7, $recurso8, $recurso9, $recurso10);

    return $listaRecursos;
}

function CR_obtenerListaRecursosAsignadosFalsa() {
    $listaRecursos = array();
    //id,                effort, resourceId, role_id	
    $recurso1 = new CR_RecursoAsignado("tmp_1", 13800000, "tmp_5", "tmp_1","Unidades",1200,1,1200);
    $recurso2 = new CR_RecursoAsignado("tmp_2", 9600000, "tmp_3", "tmp_1","Horas",26,8,208);
    $recurso3 = new CR_RecursoAsignado("tmp_3", 6600000, "tmp_9", "tmp_1","Dias",90,3,270);
	$recurso4 = new CR_RecursoAsignado("tmp_4", 6600000, "tmp_2", "tmp_1","servicio",2500,1,2500);
    array_push($listaRecursos, $recurso1, $recurso2, $recurso3,$recurso4);

    return $listaRecursos;
}

function CR_obtenerInfoActividadesFalsa() {

    $listaActividades = array();
    $listaRecursos = array();
    $listaRecursos = CR_obtenerListaRecursosAsignadosFalsa();
		//Date.prototype.toInt = function () {
		//   return this.getFullYear()*10000+(this.getMonth()+1)*100+this.getDate();
	//};
	/*
	Date.fromInt=function (dateInt){
 var year = parseInt(dateInt/10000);
 var month = parseInt((dateInt-year*10000)/100);
 var day = parseInt(dateInt-year*10000-month*100);
 return new Date(year,month-1,day,12,00,00);
};*/
    $actividad1 = new CR_Actividad(-1, "Proyecto 1", "P1", 0, "STATUS_ACTIVE", 1346623200000, 21, 1348523999999, true, false, array(), "", "", 0, 100,"");
    $actividad2 = new CR_Actividad(-2, "Analisis", "AN", 1, "STATUS_ACTIVE", 1346623200000, 10, 1347659999999, false, false, $listaRecursos, "", "", 0, 99,"1: Paquete 1");
    $actividad3 = new CR_Actividad(-3, "Busqueda de proveedores", "BP", 2, "STATUS_ACTIVE", 1346623200000, 2, 1346795999999, false, false, array(), "", "", 0, 98,"1.1: Paquete 1.1");
    $actividad4 = new CR_Actividad(-4, "Busqueda de clientes", "BC", 2, "STATUS_SUSPENDED", 1346796000000, 4, 1347314399999, false, false, array(), "3", "", 0, 97,"1.2: Paquete 1.2");
    $actividad5 = new CR_Actividad(-5, "Implementacion", "IE", 1, "STATUS_SUSPENDED", 1347832800000, 6, 1348523999999, false, false, array(), "2:5", "", 0, 96,"2: paquete 2");
    $actividad6 = new CR_Actividad(-6, "Desarrollo", "DE", 2, "STATUS_SUSPENDED", 1347832800000, 2, 1348005599999, false, false, $listaRecursos, "", "", 0, 95,"2.1: paquete 2.1");
    $actividad7 = new CR_Actividad(-7, "Pruebas de integracion", "PI", 2, "STATUS_SUSPENDED", 1348005600000, 3, 1348264799999, false, false, array(), "6", "", 0, 94,"2.2: paquete 2.2");
    $actividad8 = new CR_Actividad(-8, "Implantacion", "IA", 2, "STATUS_SUSPENDED", 1348005600000, 2, 1348178399999, false, false, array(), "6", "", 0, 93,"2.3: paquete 2.3");
	//1380079042846

    /* $actividad1 = new CR_Actividad(1, 'Actividad1', 1, 10.0, 20.0, null);
      $actividad2 = new CR_Actividad(2, 'Actividad2', 1, 20.0, 25.0, $listaRecursos);
      $actividad3 = new CR_Actividad(3, 'Actividad3', 2, 30.5, 40.0, null);
     */
    array_push($listaActividades, $actividad1, $actividad2, $actividad3, $actividad4, $actividad5, $actividad6, $actividad7, $actividad8);

    return $listaActividades;
}

function CR_obtenerInfoCalendarioBaseFalsa() {

    $calendarioBase1 = new CR_CalendarioBase(1, '08:30', '12:00', '01:00', '06:30', 8, 20, 12);
    return $calendarioBase1;
}

?>