<?php

  include('routesAlcanceGroup2.php');
  include_once '../backend/conexion.php';
   
  //MOSTRAR EDT ===============================================================================================================

function reconstruirEdt(){
  $request = \Slim\Slim::getInstance()->request();
  $edt = json_decode($request->getBody());

  //eliminar el edt anteiror
   try{   
      $con = getConnection();
      $con->exec("set foreign_key_checks = false");
      //obtener id del paquete inicial
      $pstmt= $con->prepare("SELECT * FROM EDT WHERE id_proyecto= ?");
      $pstmt->execute(array($edt->{"idproyecto"}));
      $res =$pstmt->fetch(PDO::FETCH_ASSOC);
      $idPIni = $res["id_paquete_trabajo_inicial"];
      $idEdt = $res["id_edt"];
      $idEstado = $res["id_estado"];
      //eliminar los hijos
      eliminarHijos($idPIni);
      //eliminar el primer nodo
      $pstmt= $con->prepare("DELETE FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo = ?");
      $pstmt->execute(array($idPIni));

       //insertar el nuevo edt
      //insertar paquete padre
      guardoPaquete($edt->{"title"},$edt->{"descripcion"},$idEstado,null,$idEdt,null,"1.0",$edt->{"dias"});

      //obtener el id recien insertado
      $pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE id_estado= ? AND id_edt= ? AND
          id_componente_padre is null");
      $pstmt->execute(array($idEstado,$idEdt));
      $idPaqueteInicial= $pstmt->fetch(PDO::FETCH_ASSOC)["id_paquete_trabajo"];
       
      //Modifico el edt, pasando el id_paquete_trabajo_inicial
      $pstmt= $con->prepare("UPDATE EDT SET id_paquete_trabajo_inicial= ? WHERE id_proyecto= ?");
      $pstmt->execute(array($idPaqueteInicial,$edt->{"idproyecto"}));
      guardarHijos($edt->{"nodos"},$idEstado,null,$idEdt,"1.0",$idPaqueteInicial);

      $con->exec("set foreign_key_checks = true");
      echo '{"me" : "Modifico bien"}';   
     }
     catch (PDOException $e) {
      echo '{"me" : "Modifico mal"}';
      echo json_encode(array("me" => $e->getMessage()));
     }
}

function proyectoExiste($id){
   try {
   	$con = getConnection();
   	$pstmt= $con->prepare("SELECT * FROM PROYECTO WHERE id_proyecto= ?");
   	$pstmt->execute(array($id));
   	$idPIni = $pstmt->fetch(PDO::FETCH_ASSOC)["id_proyecto"];
   	if($idPIni=="") {echo "No existe proyecto"; return false;}
   	else return true;
   }
   catch (PDOException $e) {
   	echo '{"me" : "No existe el proyecto"}';
   	echo json_encode(array("me" => $e->getMessage()));
   }
}
  
function getEdt(){
	try{
       $request = \Slim\Slim::getInstance()->request(); //json parameters
       $edt = json_decode($request->getBody()); //object convert
       $idproyecto=$edt->{"idproyecto"};
       
       if(proyectoExiste($idproyecto)==false)return; 
       
       $con = getConnection();
       //$idproyecto = 1;
       //conseguir el id del paquete inicial
       $pstmt= $con->prepare("SELECT * FROM EDT WHERE id_proyecto= ?");
       $pstmt->execute(array($idproyecto));
       $paquete=$pstmt->fetch(PDO::FETCH_ASSOC);
       $idEDT = $paquete["id_edt"];
       $idPIni = $paquete["id_paquete_trabajo_inicial"];
       $version=$paquete["version"];
  
       //conseguir el paquete inicial
       $pstmt= $con->prepare("SELECT id_paquete_trabajo,nombre,descripcion,dias  FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo= ?");
       $pstmt->execute(array($idPIni));
       $pIni = $pstmt->fetch(PDO::FETCH_ASSOC);

       //Obtener hijos
       $hijos = getHijos($pIni["id_paquete_trabajo"]);

       //armar objeto
       $arbol = new EdtArbol($pIni["id_paquete_trabajo"], $pIni["nombre"],count($hijos) ,$pIni["dias"], $pIni["descripcion"], $hijos);
       $arbol->idedt = intval($idEDT);
       echo json_encode($arbol);
	}
	catch (PDOException $e) {
		echo '{"me" : "No se puede mostrar"}';
		echo json_encode(array("me" => $e->getMessage()));
	}	
 }

    function getHijos($idPadre){
      try{	
        $con = getConnection();
        //conseguir los hijos
        $pstmt= $con->prepare("SELECT id_paquete_trabajo, nombre,descripcion,dias  FROM PAQUETE_TRABAJO WHERE id_componente_padre= ?");
        $pstmt->execute(array($idPadre));
        $result = array();
       
        while($hijo = $pstmt->fetch(PDO::FETCH_ASSOC)){
         //conseguir los hijos de cada hijo
         $hijos = getHijos($hijo["id_paquete_trabajo"]);
         //armar objeto hijo
         $arbolHijo = new EdtArbol($hijo["id_paquete_trabajo"], $hijo["nombre"],count($hijos) ,$hijo["dias"], $hijo["descripcion"], $hijos);
         //añadir objeto a la lista 
         array_push($result, $arbolHijo);
        }

        return $result;
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se puede mostrar al hijo"}';
      	echo json_encode(array("me" => $e->getMessage()));
      }
    }
    
    //ELIMINAR===================================================================================================================

  function edtExiste($id){  
   try {
   	$con = getConnection();
    $con->exec("set foreign_key_checks = false");
   	$pstmt= $con->prepare("SELECT * FROM EDT WHERE id_edt= ?");
   	$pstmt->execute(array($id));
   	$idPIni = $pstmt->fetch(PDO::FETCH_ASSOC)["id_paquete_trabajo_inicial"];
   	if($idPIni=="") {echo "No existe edt"; return false;}
   	else return true;
   }
   catch (PDOException $e) {
   	echo '{"me" : "No existe el edt"}';
   	echo json_encode(array("me" => $e->getMessage()));
   }
  }
    
  function eliminarEdt(){
     try{  	
      $request = \Slim\Slim::getInstance()->request();
      $idedt = json_decode($request->getBody())->idedt;
      
      if(edtExiste($idedt)==false)return;
      
      $con = getConnection();
      $con->exec("set foreign_key_checks = false");
      //obtener id del paquete inicial
      $pstmt= $con->prepare("SELECT * FROM EDT WHERE id_edt= ?");
      $pstmt->execute(array($idedt));
      $idPIni = $pstmt->fetch(PDO::FETCH_ASSOC)["id_paquete_trabajo_inicial"];
      //eliminar los hijos
      eliminarHijos($idPIni);

      //eliminar el primer nodo
      $pstmt= $con->prepare("DELETE FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo = ?");
      $pstmt->execute(array($idPIni));
      
      //eliminar el EDT (no se si esto se deba borrar pero aca lo borra)
      $pstmt= $con->prepare("DELETE FROM EDT WHERE id_edt = ?");
      $pstmt->execute(array($idedt));

      $con->exec("set foreign_key_checks = true");
      echo '{"me" : "Elimino bien"}';   
     }
     catch (PDOException $e) {
     	echo '{"me" : "Elimino mal"}';
     	echo json_encode(array("me" => $e->getMessage()));
     }
    }

    function eliminarHijos($idPadre){
     try{	
      $con = getConnection();
      //conseguir los hijos
      $pstmt= $con->prepare("SELECT id_paquete_trabajo FROM PAQUETE_TRABAJO WHERE id_componente_padre =?");
      $pstmt->execute(array($idPadre));
      while($hijo = $pstmt->fetch(PDO::FETCH_ASSOC)){
        //borrar los hijos de cada hijo
        eliminarHijos($hijo["id_paquete_trabajo"]);
      }
      //borrar los hijos
      $pstmt= $con->prepare("DELETE FROM PAQUETE_TRABAJO WHERE id_componente_padre = ?");
      $pstmt->execute(array($idPadre));
     }
     catch (PDOException $e) {
     	echo '{"me" : "No se pudo eliminar al hijo"}';
     	echo json_encode(array("me" => $e->getMessage()));
     }
    }


    //GUARDAR===============================================================================================================
    
    function guardoPaquete($nombre,$descripcion,$idEstado,$idMiembros,$idEdt,$idPadre,$version,$dias){
      $con = getConnection();
      $pstmt= $con->prepare("INSERT INTO PAQUETE_TRABAJO(nombre,descripcion,id_estado,id_miembros_equipo,
          id_edt,id_componente_padre,version,dias) values (?,?,?,?,?,?,?,?)");
      $pstmt->execute(array($nombre,$descripcion,$idEstado,$idMiembros,$idEdt,$idPadre,$version,$dias));
    }
    
  function guardarEdt(){
      
    try{		
      $request = \Slim\Slim::getInstance()->request();
      $edt = json_decode($request->getBody()); //object convert
      $idproyecto=$edt->{"idproyecto"};
      if(proyectoExiste($idproyecto)==false)return;
      
      //$idproyecto = 1;
      $version=1.1;
       
      $con = getConnection();
      //Saco los id que necesito
      //id del estado
      $pstmt= $con->prepare("SELECT * FROM ESTADO_EDT WHERE descripcion='Pendiente'");
      $pstmt->execute();
      $idEstado = $pstmt->fetch(PDO::FETCH_ASSOC)["id_estado"];
       
      //obtengo los id_miembros
      //$pstmt= $con->prepare("SELECT * FROM MIEMBROS_EQUIPO WHERE id_proyecto=?");
      //$pstmt->execute(array($idproyecto));
      //$paquete= $pstmt->fetch(PDO::FETCH_ASSOC);
      //if (count($paquete)==0) $idMiembros='NULL';
      //else $idMiembros = $paquete["id_miembros_equipo"];
      $idMiembros=NULL;
      //echo $idMiembros;
      //Con los datos que obtengo ahora Guardo el edt
      $pstmt= $con->prepare("INSERT INTO EDT(version,id_estado,id_miembros_equipo,id_proyecto) VALUES(?,?,?,?) ");
      $pstmt->execute(array($version,$idEstado,$idMiembros,$idproyecto));
       
      //Obtengo el Id de edt
      $pstmt= $con->prepare("SELECT * FROM EDT WHERE id_proyecto= ?");
      $pstmt->execute(array($idproyecto));
      $idEdt = $pstmt->fetch(PDO::FETCH_ASSOC)["id_edt"];
      $idPadre=NULL; // Ya que el primer paquete, no tiene padre
       
      //Guardo el paquete principal
      guardoPaquete($edt->{"title"},$edt->{"descripcion"},$idEstado,$idMiembros,$idEdt,$idPadre,$version,$edt->{"dias"});
    
      //Obtengo el id del primer paquete
      $pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE id_estado= ? AND id_edt= ? AND
          id_componente_padre is null AND version= ?");
      $pstmt->execute(array($idEstado,$idEdt,$version));
      $idPaqueteInicial= $pstmt->fetch(PDO::FETCH_ASSOC)["id_paquete_trabajo"];
       
      //Modifico el edt, pasando el id_paquete_trabajo_inicial
      $pstmt= $con->prepare("UPDATE EDT SET id_paquete_trabajo_inicial= ? WHERE id_proyecto= ?");
      $pstmt->execute(array($idPaqueteInicial,$idproyecto));
    
      //Ahora guardo los hijos
      guardarHijos($edt->{"nodos"},$idEstado,$idMiembros,$idEdt,$version,$idPaqueteInicial);
      echo '{"me" : "Ingreso bien"}';
    }
    catch (PDOException $e) {
    	echo '{"me" : "Ingreso mal"}';
    	echo json_encode(array("me" => $e->getMessage()));
    }
  }
    
    function obtenerIdPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$version){
      $con = getConnection();
      $pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE nombre= ? AND descripcion= ?
          AND id_estado= ? AND id_edt= ? AND id_componente_padre= ? AND version= ?");
      $pstmt->execute(array($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$version));
      $id= $pstmt->fetch(PDO::FETCH_ASSOC)["id_paquete_trabajo"];
      //echo $id;
      return $id;
    }
    
    function guardarHijos($listaHijos,$idEstado,$idMiembros,$idEdt,$version,$idPadre){
      if($listaHijos==NULL)return null;
      else if(count($listaHijos)==0)return null;
      else{
        foreach ($listaHijos as $row){
          guardoPaquete($row->{"title"},$row->{"descripcion"},$idEstado,$idMiembros,$idEdt,$idPadre,$version,$row->{"dias"});
          $idPaquete=obtenerIdPaquete($row->{"title"},$row->{"descripcion"},$idEstado,$idEdt,$idPadre,$version);
          guardarHijos($row->{"nodos"},$idEstado,$idMiembros,$idEdt,$version,$idPaquete);
        }
      }
    }
    
    
    //MODIFICAR EDT ===========================================================================================================
    
  function obtenerPrimerPaquete($idProyecto){
    try{	
      //echo $idProyecto;
      $con = getConnection();
      $pstmt= $con->prepare("SELECT * FROM EDT where id_proyecto= ?");
      $pstmt->execute(array($idProyecto));
      return $pstmt->fetch(PDO::FETCH_ASSOC);
    }
    catch (PDOException $e) {
    	echo '{"me" : "No se pudo obtener el primer paquete"}';
    	echo json_encode(array("me" => $e->getMessage()));
    }
  }
    
  function eliminarPaqueteTrabajo($id){
    try{  	
      $con = getConnection();
      $pstmt= $con->prepare("DELETE FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo= ?");
      $pstmt->execute(array($id));
    }
    catch (PDOException $e) {
    	echo '{"me" : "No se pudo eliminar el paquete trabajo"}';
    	echo json_encode(array("me" => $e->getMessage()));
    }
  }
    
  function eliminarHijos2($id,$idEdt){
  	try{
      $con = getConnection();
      $pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE id_componente_padre= ? AND id_edt= ?");
      $pstmt->execute(array($id,$idEdt));	
      	
      while ($row=$pstmt->fetch(PDO::FETCH_ASSOC)){
      		eliminarHijos2($row["id_paquete_trabajo"],$idEdt);
      		eliminarPaqueteTrabajo($row["id_paquete_trabajo"]);
      }
  	}
  	catch (PDOException $e) {
  		echo '{"me" : "No se pudo eliminar el hijo"}';
  		echo json_encode(array("me" => $e->getMessage()));
  	}
  }
    
    function existePaquete($id){
    	try {
    		$con = getConnection();
    		$pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo= ?");
    		$pstmt->execute(array($id));
    		$idPIni = $pstmt->fetch(PDO::FETCH_ASSOC)["id_paquete_trabajo"];
    		if($idPIni=="") {/*echo "No se borro al hijo porque no existe"*/;return false;}
    		else return true;
    	}
    	catch (PDOException $e) {
    		echo '{"me" : "No se puede acceder al paquete"}';
    		echo json_encode(array("me" => $e->getMessage()));
    	}
    }
    
  function eliminarPaquete($lista,$idEdt){
    try{  	
      foreach ($lista as $row){
        $con = getConnection();
        if(existePaquete($row->{"id"})==false)break;
        eliminarHijos2($row->{"id"},$idEdt);
        eliminarPaqueteTrabajo($row->{"id"});
      }
    }
    catch (PDOException $e) {
    	echo '{"me" : "No se pudo eliminar el paquete"}';
    	echo json_encode(array("me" => $e->getMessage()));
    }
  }
    
   function modificarPaquete($id,$title,$dias,$desc){
     try{ 	
      $con = getConnection();
      $pstmt= $con->prepare("UPDATE PAQUETE_TRABAJO SET nombre=?, dias= ?, descripcion= ? WHERE id_paquete_trabajo= ?");
      $pstmt->execute(array($title,$dias,$desc,$id));
     }
     catch (PDOException $e) {
     	echo '{"me" : "No se pudo modificar el edt"}';
     	echo json_encode(array("me" => $e->getMessage()));
     }
   }
    
  function modificarTodoEdt(){
    try{  	
      $request = \Slim\Slim::getInstance()->request();
      $data = json_decode($request->getBody()); //object convert
      $idproyecto=$data->{"idproyecto"};
      if(proyectoExiste($idproyecto)==false)return;
      //$idproyecto=1;
      $version=1.1;
       
      $listaModificados = $data->{"idnodosModificados"};
      $listaNuevos = $data->{"idnodosNuevos"};
      $listaEliminados = $data->{"idnodosEliminados"};
    
      $edt=obtenerPrimerPaquete($idproyecto); //Considero que el primero no se va a eliminar
      //echo $edt["id_edt"];
      eliminarPaquete($listaEliminados,$edt["id_edt"]);
       
      foreach ($listaModificados as $row){
        modificarPaquete($row->{"id"},$row->{"title"},$row->{"dias"},$row->{"descripcion"});
      }
       
      foreach ($listaNuevos as $row){
        guardoPaquete($row->{"title"},$row->{"descripcion"},$edt["id_estado"],$edt["id_miembros_equipo"],$edt["id_edt"],$row->{"idpadre"},$version,$row->{"dias"});
        $idPadre=obtenerIdPaquete($row->{"title"},$row->{"descripcion"},$edt["id_estado"],$edt["id_edt"],$row->{"idpadre"},$version);
        guardarHijos($row->{"nodos"},$edt["id_estado"],$edt["id_miembros_equipo"],$edt["id_edt"],$version,$idPadre);
      }
       
       echo '{"me":"Se modificaron los datos correctamente"}';
    }
    catch (PDOException $e) {
    	echo '{"me" : "No se pudo modificar el edt"}';
    	echo json_encode(array("me" => $e->getMessage()));
    }
 }
    

    //MODIFICAR EDT ===========================================================================================================
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //SEGUNDO SPRINT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  function crearAlcance(){
    try{  	
      $request = \Slim\Slim::getInstance()->request(); //json parameters
      $edt = json_decode($request->getBody()); //object convert
      $idproyecto = $edt->{"idproyecto"};
      
      $con = getConnection();
      $pstmt= $con->prepare("INSERT INTO ALCANCE(id_proyecto,descripcion,alcance_producto,version,criterios_aceptacion,
      entregables,exclusiones,restricciones,supuestos) values (?,?,?,?,?,?,?,?,?)");
      $pstmt->execute(array($idproyecto,$edt->{"descripcion"},$edt->{"alcance_producto"},$edt->{"version"},
      $edt->{"criterios_aceptacion"},$edt->{"entregables"},$edt->{"exclusiones"},$edt->{"restricciones"},$edt->{"supuestos"}));
    }
    catch (PDOException $e) {
    	echo '{"me" : "No se pudo crear el alcance"}';
    	echo json_encode(array("me" => $e->getMessage()));
    }
  }
    
  function mostrarAlcance(){
   try{ 	
      $request = \Slim\Slim::getInstance()->request(); //json parameters
      $edt = json_decode($request->getBody()); //object convert
      $idProyecto=$edt->{"idproyecto"};
       
      //$idProyecto=1;
      $con = getConnection();
      $pstmt= $con->prepare("SELECT * FROM ALCANCE WHERE id_proyecto= ?");
      $pstmt->execute(array($idProyecto));
      $alcance = $pstmt->fetch(PDO::FETCH_ASSOC);
      echo json_encode($alcance);
   }
   catch (PDOException $e) {
     	echo '{"me" : "No se pudo mostar el alcance"}';
     	echo json_encode(array("me" => $e->getMessage()));
   }
  }
    
  function modificarAlcance(){
    try{ 	
      $request = \Slim\Slim::getInstance()->request(); //json parameters
      $edt = json_decode($request->getBody()); //object convert
    
      $con = getConnection();
      $pstmt= $con->prepare("UPDATE ALCANCE SET
          descripcion= ?,
          alcance_producto= ?,
          version= ?,
          criterios_aceptacion= ?,
          entregables= ?,
          exclusiones= ?,
          restricciones= ?,
          supuestos=?
          WHERE id_proyecto= ?");
      $pstmt->execute(array($edt->{"descripcion"},$edt->{"alcance_producto"},$edt->{"version"},
      $edt->{"criterios_aceptacion"},$edt->{"entregables"},$edt->{"exclusiones"},$edt->{"restricciones"},$edt->{"supuestos"},$edt->{"idproyecto"}));
    }
    catch (PDOException $e) {
    	echo '{"me" : "No se pudo modificar el alcance"}';
    	echo json_encode(array("me" => $e->getMessage()));
    }
  }
    
  function eliminarAlcance(){
  	try{  	
      $request = \Slim\Slim::getInstance()->request(); //json parameters
      $edt = json_decode($request->getBody()); //object convert
      $idproyecto=$edt->{"idproyecto"};
      
      $con = getConnection();
      $pstmt= $con->prepare("DELETE FROM ALCANCE WHERE id_proyecto= ?");
      $pstmt->execute(array($idproyecto));
  	}
  	catch (PDOException $e) {
  		echo '{"me" : "No se pudo eliminar el alcance"}';
  		echo json_encode(array("me" => $e->getMessage()));
  	}
  }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TERCER SPRINT ==========================================================================================================
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /*
    function mostrarMatriz(){
    	
      try{	
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$edt = json_decode($request->getBody()); //object convert
    	$idProyecto=$edt->{"idproyecto"};
    	$con = getConnection();
    	
    	//Obtener el arreglo de prioridades
    	$pstmt= $con->prepare("SELECT id_prioridad_requisito,descripcion FROM PRIORIDAD_REQUISITO");
    	$pstmt->execute(array());
    	$ar_Prioridad=array();
    		//creo el arreglo de prioridades para ensenar un combobox
    	while ($ar1 = $pstmt->fetch(PDO::FETCH_ASSOC)){
    		$hijo = new Prioridad($ar1["id_prioridad_requisito"],$ar1["descripcion"]);
    		array_push($ar_Prioridad,$hijo);
    		}
    	
    	//Obtener el arreglo de estado
    	$pstmt= $con->prepare("SELECT id_estado_requisito,descripcion FROM ESTADO_REQUISITO");
    	$pstmt->execute(array());
		$ar_Estado=array();
			//creo el arreglo de estados para ensenar un combobox
    	while ($ar2 = $pstmt->fetch(PDO::FETCH_ASSOC)){
    		$hijo2 = new Estado($ar2["id_estado_requisito"],$ar2["descripcion"]);
    		array_push($ar_Estado,$hijo2);
    		}

    	//Busco el id del ER
    	$pstmt= $con->prepare("SELECT * FROM ESPECIFICACION_REQUISITOS WHERE id_proyecto= ?");
    	$pstmt->execute(array($idProyecto));
    	$idER = $pstmt->fetch(PDO::FETCH_ASSOC)["id_especificacion_requisitos"];
    	
    	//Busco todos los requisitos que existen con el id del ER obtenido antes
    	$pstmt= $con->prepare("SELECT a.id_requisito,a.descripcion,a.fecha_termino,a.solicitud,a.cargo,a.fundamento_incorporacion,
    			a.id_prioridad_requisito,a.id_estado_requisito,a.entregable,a.criterio_aceptacion,a.id_miembros_equipo 
    			FROM REQUISITO a WHERE a.id_especificacion_requisitos= ? ");
    	$pstmt->execute(array($idER));
    	$ar_Requisitos=array();
    	
    	//CREO LOS REQUISITOS
    	
    	while ($listaRequisito = $pstmt->fetch(PDO::FETCH_ASSOC)){
    		
    		//obtengo el nombre y apellido del empleado con id=$listaRequisito['id_miembros_equipo']
    		if($listaRequisito["id_miembros_equipo"]==0) {//debido a que la primera vez no se han ingresado datos, el id_miembros es =0
    			$nombre="";
    			$apellido="";
    		}
    		else {
    			$nombre=dameNombre($listaRequisito["id_miembros_equipo"]);//obtengo el nombre de la persona
    			$apellido=dameApellido($listaRequisito["id_miembros_equipo"]);//obtengo el apellido de la persona
    		}
    		
    		//debido a que al principio no tienen valores, elimino los null poniendo en cada uno ""
    		if($listaRequisito["descripcion"]==null)$desc="";else $desc=$listaRequisito["descripcion"];
    		if($listaRequisito["solicitud"]==null)$sol="";else $sol=$listaRequisito["solicitud"];
    		if($listaRequisito["cargo"]==null)$car="";else $car=$listaRequisito["cargo"];
    		if($listaRequisito["fundamento_incorporacion"]==null)$fun="";else $fun=$listaRequisito["fundamento_incorporacion"];
    		if($listaRequisito["entregable"]==null)$ent="";else $ent=$listaRequisito["entregable"];
    		if($listaRequisito["criterio_aceptacion"]==null)$cri="";else $cri=$listaRequisito["criterio_aceptacion"];
    		if($listaRequisito["fecha_termino"]==null)$fecha=date('Y-m-d', time());else $fecha=$listaRequisito["fecha_termino"];
    		
    		$hijo = new Requisito($listaRequisito["id_requisito"],$desc,$fecha,
    				$sol,$car,$fun,$listaRequisito["id_prioridad_requisito"],
    				$listaRequisito["id_estado_requisito"],$ent,$cri,$listaRequisito["id_miembros_equipo"],
    				$nombre,$apellido);
    		array_push($ar_Requisitos,$hijo);	
    		}
    	
    	//Formo lo que voy a pasar al front
    	$matriz= [ "ar_prioridad"=> $ar_Prioridad,
    			   "ar_estado"=> $ar_Estado,
    			   "requisitos"=>$ar_Requisitos
    			  ];
    	
    	echo json_encode($matriz);
      }
      catch (PDOException $e) {
        echo json_encode(array("me" => $e->getMessage()));
      }
      
    }
    
    */
    
    function dameNombre($v){
      try{	
    	$con = getConnection();
    	$pstmt= $con->prepare("SELECT a.nombres, a.apellidos FROM EMPLEADO a, MIEMBROS_EQUIPO b WHERE b.id_miembros_equipo= ?  AND a.id_empleado=b.id_empleado ");
    	$pstmt->execute(array($v));
    	$b=$pstmt->fetch(PDO::FETCH_ASSOC)["nombres"];
    	return $b;
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se pudo pasar el nombre"}';
        echo json_encode(array("me" => $e->getMessage()));
      }
    }
    
    function dameApellido($v){
      try{
    	$con = getConnection();
    	$pstmt= $con->prepare("SELECT a.nombres, a.apellidos FROM EMPLEADO a, MIEMBROS_EQUIPO b WHERE b.id_miembros_equipo= ?  AND a.id_empleado=b.id_empleado ");
    	$pstmt->execute(array($v));
    	$a=$pstmt->fetch(PDO::FETCH_ASSOC)["apellidos"];
    	return $a;
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se pudo pasar el apellido"}';
      	echo json_encode(array("me" => $e->getMessage()));
      }      
    }
    
    
    //TERCER Y CUARTO SPRINT
    //Modificar la matriz, por cada requisito ===========================================================================================
    
    /*
    function modificarRequisitoM(){

    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$data = json_decode($request->getBody()); //object convert
    	$idRequisito=$data->{"id_requisito"};
    	$con = getConnection();
    
    	if ($data->{"fecha"}=="")$fecha=$fecha=date('Y-m-d', time());else $fecha=date("Y-m-d", $data->fecha / 1000);
    	
    	$pstmt= $con->prepare("UPDATE REQUISITO SET descripcion=?,fecha_termino=?,solicitud=?,cargo=?,fundamento_incorporacion=?,
    			id_prioridad_requisito=?,id_estado_requisito=?,entregable=?,criterio_aceptacion=?,id_miembros_equipo=? where id_requisito=?");
    	$pstmt->execute(array($data->{"descripcion"},$data->{"fecha"},$data->{"solicitado"},$data->{"cargo"},$data->{"fundamento"},
    	$data->{"idprioridadR"},$data->{"idestadoR"},$data->{"entregable"},$data->{"criterioAceptacion"},$data->{"idmiembros"},$idRequisito));
    	 
    	echo $request->getBody();
    }
    
    */
    function buscarMiembros(){
      try{
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$data = json_decode($request->getBody()); //object convert
    	$idProyecto=$data->{"idproyecto"};
    	if(proyectoExiste($idProyecto)==false)return;
    	 
    	$con = getConnection();
    	
    	//Obtengo la lista de personas 

    	$pstmt= $con->prepare("SELECT b.id_miembros_equipo , a.id_empleado,a.nombres, a.apellidos,a.telefono,a.email 
    			FROM EMPLEADO a, MIEMBROS_EQUIPO b WHERE 
    			b.id_proyecto= ? and b.id_empleado=a.id_empleado and a.nombres LIKE ? and a.apellidos LIKE ? group by a.id_empleado");
    	$pstmt->execute(array($idProyecto,'%'.$data->{"nombre"}.'%','%'.$data->{"apellido"}.'%'));
    	$ar_lista=array();
    	while ($lista = $pstmt->fetch(PDO::FETCH_ASSOC)){
    		if($lista["telefono"]==null)$tele="";else $tele=$lista["telefono"];
    		if($lista["email"]==null)$ema="";else $ema=$lista["email"];
    		
    		$hijo = new Miembro($lista["id_miembros_equipo"],$lista["nombres"],$lista["apellidos"],$tele,$ema);
    		array_push($ar_lista,$hijo);
    	}
    	
    	$lista=["ar_miembro" =>$ar_lista
    		   ];
    	
    	echo json_encode($lista);
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se buscar los miembros"}';
      	echo json_encode(array("me" => $e->getMessage()));
      }      
    }
    
    
    //MANTENIMIENTO DE FASES
    
    //CREAR LAS FASES:    
    function guardarFases (){
      try{
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$data = json_decode($request->getBody()); //object convert
    	$idproyecto=$data->{"idproyecto"};
    	if(proyectoExiste($idproyecto)==false)return;
    	 
    	$arrFase=$data->{"listaFase"}; 
    	
    	$con = getConnection();
    	foreach ($arrFase as $row){ //Guardo los datos del front de las fases
    		$pstmt= $con->prepare("INSERT INTO FASE(id_proyecto,descripcion) values (?,?)");
    		$pstmt->execute(array($idproyecto,$row->{"descripcion"}));
    	}
    	
    	//Tambien creo los requisitos x fase en la tabla FASEXREQUISITO
    	//obtengo el id del ERS:
    	$pstmt= $con->prepare("SELECT * FROM ESPECIFICACION_REQUISITOS WHERE id_proyecto= ?");
    	$pstmt->execute(array($idproyecto));
    	$idER = $pstmt->fetch(PDO::FETCH_ASSOC)["id_especificacion_requisitos"];
    	
    	//obtengo los id de los requisitos
    	$pstmt= $con->prepare("SELECT id_requisito FROM REQUISITO WHERE id_especificacion_requisitos= ?");
    	$pstmt->execute(array($idER));
    	$listaIdRequisitos = array();
    	while ($row=$pstmt->fetch(PDO::FETCH_ASSOC)){
    		array_push($listaIdRequisitos,$row['id_requisito']);
    	}    	
		//var_dump($listaIdRequisitos);
    	
    	//odtengo los id de las fases
    	$pstmt= $con->prepare("SELECT id_fase FROM FASE WHERE id_proyecto= ?");
    	$pstmt->execute(array($idproyecto));
    	$listaIdFase=array();
    	while ($row=$pstmt->fetch(PDO::FETCH_ASSOC)){
    		array_push($listaIdFase,$row['id_fase']);
    	}

    	//guardos los datos en la tabla FASEXREQUISITO
    	foreach ($listaIdRequisitos as $row){
    		foreach ($listaIdFase as $fila){
    			$pstmt= $con->prepare("INSERT INTO FASE_X_REQUISITO(id_requisito,id_fase) VALUES (?,?)");
    			$pstmt->execute(array($row[$i],$fila));
    		}
    	}
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se pudieron guardar las fases"}';
      	echo json_encode(array("me" => $e->getMessage()));
      } 
    }
    
    
    //MOSTRAR LAS FASES:
    
    function mostrarFases(){
      try{	
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$data = json_decode($request->getBody()); //object convert
    	$idproyecto=$data->{"idproyecto"};
    	if(proyectoExiste($idproyecto)==false)return;
    	
    	$con = getConnection(); // Accedo a los datos de las fases desde la BD
    	$pstmt= $con->prepare("SELECT id_fase,descripcion from FASE WHERE id_proyecto = ? ");
    	$pstmt->execute(array($idproyecto));
    	$listaFase=array();
    	while ($row=$pstmt->fetch(PDO::FETCH_ASSOC)){
    		$hijo=new Fase($row['id_fase'],$row['descripcion']);
    		array_push($listaFase,$hijo);
    	}
    	
    	$matriz= [ "idproyecto"=> $idproyecto,
    			   "listaFase"=> $listaFase
    	];
    	
    	echo json_encode($matriz);
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se puede mostrar las fases"}';
      	echo json_encode(array("me" => $e->getMessage()));
      }	
    }
    
    //MODIFICAR LAS FASES
    function modificarFases (){
      try{
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$data = json_decode($request->getBody()); //object convert
    	$idproyecto=$data->{"idproyecto"};
    	if(proyectoExiste($idproyecto)==false)return;
    	 
    	$arrFase=$data->{"listaFase"};
    	 
    	$con = getConnection();
    	foreach ($arrFase as $row){ //Guardo los datos del front de las fases
    		$pstmt= $con->prepare("UPDATE FASE SET descripcion = ? WHERE id_fase = ? AND id_proyecto = ?");
    		$pstmt->execute(array($row->{"descripcion"},$row->{"id_fase"},$idproyecto));
    	}
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se pueden modificar las fases"}';
      	echo json_encode(array("me" => $e->getMessage()));
      }   
    }
    
    //ELIMINAR FASES:
    
    function eliminarFase($var){
	  try{
    	$data = json_decode($var);
    	$idproyecto=$data->idproyecto;
    	if(proyectoExiste($idproyecto)==false)return;
    	$idfase=$data->id_fase;
    	
    	$con = getConnection();
    	 
    	//ELIMINAR DESDE LOS REQUISITOS:
    	
		//Borro los requisitos que tienen esta fase
    	$pstmt= $con->prepare("DELETE FROM FASE_X_REQUISITO WHERE id_fase= ?");
    	$pstmt->execute(array($idfase));
    	
    	//Borro la fase en la tabla FASE:
    	$pstmt= $con->prepare("DELETE FROM FASE WHERE id_fase= ? AND id_proyecto = ? ");
    	$pstmt->execute(array($idfase,$idproyecto));
	  }
	  catch (PDOException $e) {
	  	echo '{"me" : "No se puede eliminar la fase"}';
	  	echo json_encode(array("me" => $e->getMessage()));
	  }
    }
    
    //MUESTRO LA MATRIZ: 

    function mostrarMatriz(){
    	
    	try{
    		$request = \Slim\Slim::getInstance()->request(); //json parameters
    		$edt = json_decode($request->getBody()); //object convert
    		$idProyecto=$edt->{"idproyecto"};
    		$con = getConnection();
    		 
    		//Obtener el arreglo de prioridades
    		$pstmt= $con->prepare("SELECT id_prioridad_requisito,descripcion FROM PRIORIDAD_REQUISITO");
    		$pstmt->execute(array());
    		$ar_Prioridad=array();
    		//creo el arreglo de prioridades para ensenar un combobox
    		while ($ar1 = $pstmt->fetch(PDO::FETCH_ASSOC)){
    			$hijo = new Prioridad($ar1["id_prioridad_requisito"],$ar1["descripcion"]);
    			array_push($ar_Prioridad,$hijo);
    		}
    		 
    		//Obtener el arreglo de estado
    		$pstmt= $con->prepare("SELECT id_estado_requisito,descripcion FROM ESTADO_REQUISITO");
    		$pstmt->execute(array());
    		$ar_Estado=array();
    		//creo el arreglo de estados para ensenar un combobox
    		while ($ar2 = $pstmt->fetch(PDO::FETCH_ASSOC)){
    			$hijo2 = new Estado($ar2["id_estado_requisito"],$ar2["descripcion"]);
    			array_push($ar_Estado,$hijo2);
    		}
    	
    		//Busco el id del ER
    		$pstmt= $con->prepare("SELECT * FROM ESPECIFICACION_REQUISITOS WHERE id_proyecto= ? and id_estado_requisito=2");
    		$pstmt->execute(array($idProyecto));
    		$idER = $pstmt->fetch(PDO::FETCH_ASSOC)["id_especificacion_requisitos"];
    		 
    		//Busco todos los requisitos que existen con el id del ER obtenido antes
    		$pstmt= $con->prepare("SELECT a.id_requisito,a.descripcion,a.fecha_termino,a.solicitud,a.cargo,a.fundamento_incorporacion,
    			a.id_prioridad_requisito,a.id_estado_requisito,a.entregable,a.criterio_aceptacion,a.id_miembros_equipo
    			FROM REQUISITO a WHERE a.id_especificacion_requisitos= ? ");
    		$pstmt->execute(array($idER));
    		$ar_Requisitos=array();
    		 
    		//CREO LOS REQUISITOS
    		 
    		while ($listaRequisito = $pstmt->fetch(PDO::FETCH_ASSOC)){
    	
    			//obtengo el nombre y apellido del empleado con id=$listaRequisito['id_miembros_equipo']
    			if($listaRequisito["id_miembros_equipo"]==0) {//debido a que la primera vez no se han ingresado datos, el id_miembros es =0
    				$nombre="";
    				$apellido="";
    			}
    			else {
    				$nombre=dameNombre($listaRequisito["id_miembros_equipo"]);//obtengo el nombre de la persona
    				$apellido=dameApellido($listaRequisito["id_miembros_equipo"]);//obtengo el apellido de la persona
    			}
    	
    			//debido a que al principio no tienen valores, elimino los null poniendo en cada uno ""
    			if($listaRequisito["descripcion"]==null)$desc="";else $desc=$listaRequisito["descripcion"];
    			if($listaRequisito["solicitud"]==null)$sol="";else $sol=$listaRequisito["solicitud"];
    			if($listaRequisito["cargo"]==null)$car="";else $car=$listaRequisito["cargo"];
    			if($listaRequisito["fundamento_incorporacion"]==null)$fun="";else $fun=$listaRequisito["fundamento_incorporacion"];
    			if($listaRequisito["criterio_aceptacion"]==null)$cri="";else $cri=$listaRequisito["criterio_aceptacion"];
    	
    			$hijo = new Requisito($listaRequisito["id_requisito"],$desc,
    					$sol,$car,$fun,$listaRequisito["id_prioridad_requisito"],
    					$listaRequisito["id_estado_requisito"],$cri,$listaRequisito["id_miembros_equipo"],
    					$nombre,$apellido);
    			array_push($ar_Requisitos,$hijo);
    		}
    		 
    		//Formo lo que voy a pasar al front
    		$matriz= [ "ar_prioridad"=> $ar_Prioridad,
    		"ar_estado"=> $ar_Estado,
    		"requisitos"=>$ar_Requisitos
    		];
    		 
    		echo json_encode($matriz);
    	}
    	catch (PDOException $e) {
    		echo '{"me" : "No se puede mostrar la matriz"}';
    		echo json_encode(array("me" => $e->getMessage()));
    	}
    }
    
    function modificarRequisitoM(){
      try{
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$data = json_decode($request->getBody()); //object convert
    	$idRequisito=$data->{"id_requisito"};
    	$con = getConnection();
    
    	$pstmt= $con->prepare("UPDATE REQUISITO SET descripcion=?,solicitud=?,cargo=?,fundamento_incorporacion=?,
    			id_prioridad_requisito=?,id_estado_requisito=?,criterio_aceptacion=?,id_miembros_equipo=? where id_requisito=?");
    	$pstmt->execute(array($data->{"descripcion"},$data->{"solicitado"},$data->{"cargo"},$data->{"fundamento"},
    	$data->{"idprioridadR"},$data->{"idestadoR"},$data->{"criterioAceptacion"},$data->{"idmiembros"},$idRequisito));
    
    	echo $request->getBody();
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se puede modificar la matriz"}';
      	echo json_encode(array("me" => $e->getMessage()));
      }
    }
    
    function requisitoXFase(){
      try{
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$data = json_decode($request->getBody()); //object convert
    	$idRequisito=$data->{"id_requisito"};
    	
    	$con = getConnection();
    	
    	//Obtengo informacion del requisito con respecto a la fase
    	$pstmt= $con->prepare("SELECT id_fase,entregable,fecha FROM FASE_X_REQUISITO WHERE id_requisito= ?");
    	$pstmt->execute(array($idRequisito));
    	$listaRequisito = array();
    	while ($row=$pstmt->fetch(PDO::FETCH_ASSOC)){
    		$hijo=new FaseXRequisito($row['id_fase'],$row['entregable'],$row['fecha']);
    		array_push($listaRequisito,$hijo);
    	}
    	//var_dump($listaRequisito);
    	//Guardo los datos en una lista para pasarla al front
    	$ar_Requisitos=array();
    	
    	foreach ($listaRequisito as $row){
    		$pstmt= $con->prepare("SELECT descripcion FROM FASE WHERE id_fase= ?");
    		$pstmt->execute(array($row->id_fase));
    		$descripcion = $pstmt->fetch(PDO::FETCH_ASSOC)["descripcion"];
    		
    		if ($row->entregable==null)$entregable="" ;else $entregable=$row->entregable;
    		if ($row->fecha==null)$fecha=date('Y-m-d', time());else $fecha=date("Y-m-d", $row->fecha / 1000);
    		
    		$hijo=new RequisitoXFase($idRequisito,$entregable,$fecha,$row->id_fase,$descripcion);
    		array_push($ar_Requisitos,$hijo);
    	}	
    	
    	$lista=[
    			"arrRequisito" =>$ar_Requisitos
    		   ];
    		
    	echo json_encode($lista);
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se puede mostrar"}';
      	echo json_encode(array("me" => $e->getMessage()));
      }
    }
    
    function modificarRequisitoXFase(){
      try{
    	$request = \Slim\Slim::getInstance()->request(); //json parameters
    	$data = json_decode($request->getBody()); //object convert
    	
    	$con = getConnection();
    	$pstmt= $con->prepare("UPDATE FASE_X_REQUISITO set entregable=?,fecha=? WHERE id_fase= ? AND id_requisito=? ");
    	$pstmt->execute(array($data->{"entregable"},$data->{"fecha"},$data->{"idFase"},$data->{"id_requisito"}));
      }
      catch (PDOException $e) {
      	echo '{"me" : "No se pueden modificar los requisitos"}';
      	echo json_encode(array("me" => $e->getMessage()));
      }
    }
    
    
    
    
    
    
    
    
    ?>