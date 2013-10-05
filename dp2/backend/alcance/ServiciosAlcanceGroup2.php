<?php

  include('routesAlcanceGroup2.php');
  include_once '../backend/conexion.php';
   
  //MOSTRAR EDT ===============================================================================================================
  
function getEdt(){
       //$request = \Slim\Slim::getInstance()->request(); //json parameters
       //$edt = json_decode($request->getBody()); //object convert
       //$idproyecto=$edt->{"idproyecto"};
       
       $con = getConnection();
       $idproyecto = 1;
       //conseguir el id del paquete inicial
       $pstmt= $con->prepare("SELECT * FROM EDT WHERE id_proyecto= ?");
       $pstmt->execute(array($idproyecto));
       $paquete=$pstmt->fetch(PDO::FETCH_ASSOC);
       $idPIni = $paquete["id_paquete_trabajo_inicial"];
       $version=$paquete["version"];
  
       //conseguir el paquete inicial
       $pstmt= $con->prepare("SELECT id_paquete_trabajo,nombre,descripcion,dias  FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo= ?");
       $pstmt->execute(array($idPIni));
       $pIni = $pstmt->fetch(PDO::FETCH_ASSOC);

       //Obtener hijos
       $hijos = getHijos($pIni["id_paquete_trabajo"],$version);

       //armar objeto
       $arbol = new EdtArbol($pIni["id_paquete_trabajo"], $pIni["nombre"],count($hijos) ,$pIni["dias"], $pIni["descripcion"], $hijos);
       echo json_encode($arbol);
    }

    function getHijos($idPadre){
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
    
    //ELIMINAR===================================================================================================================

    function eliminarEdt(){
      $request = \Slim\Slim::getInstance()->request();
      $idedt = json_decode($request->getBody())->idedt;
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
    }

    function eliminarHijos($idPadre){
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


    //GUARDAR===============================================================================================================

    function dameEdt(){
       
      $h1=array();
      $h2=array();
      $h3=array();
       
      $hijo1=new EdtArbol(10,"Analisis",0,5,"El analisis",$h1);
      $hijo2=new EdtArbol(11,"Desarrollo",0,2,"El desarrollo",$h2);
      $hijo3=new EdtArbol(12,"Transicion",0,3,"La transicion",$h3);
       
      $lista=array();
      array_push($lista,$hijo1,$hijo2,$hijo3);
      $arbol=new EdtArbol(9,"DP2",3,10,"El proyeto",$lista);
      return json_encode($arbol);
    }
    
    function obtenerIdEliminado(){
      $con = getConnection();
      $pstmt= $con->prepare("SELECT * FROM ESTADO_EDT WHERE descripcion='Eliminado'");
      $pstmt->execute();
      $idEstado = $pstmt->fetch(PDO::FETCH_ASSOC)["id_estado"];
      return $idEstado;
    }
    
    function guardoPaquete($nombre,$descripcion,$idEstado,$idMiembros,$idEdt,$idPadre,$version,$dias){
      $con = getConnection();
      $pstmt= $con->prepare("INSERT INTO PAQUETE_TRABAJO(nombre,descripcion,id_estado,id_miembros_equipo,
          id_edt,id_componente_padre,version,dias) values (?,?,?,?,?,?,?,?)");
      $pstmt->execute(array($nombre,$descripcion,$idEstado,$idMiembros,$idEdt,$idPadre,$version,$dias));
    }
    
    function guardarEdt(){
      //$edt=json_decode(dameEdt());//borrar
      $request = \Slim\Slim::getInstance()->request();
      $edt = json_decode($request->getBody()); //object convert
      $idproyecto=$edt->{"idproyecto"};
      $version=1.1;
       
      $con = getConnection();
      //Saco los id que necesito
      //id del estado
      $pstmt= $con->prepare("SELECT * FROM ESTADO_EDT WHERE descripcion='Pendiente'");
      $pstmt->execute();
      $idEstado = $pstmt->fetch(PDO::FETCH_ASSOC)["id_estado"];
       
      //id miembros
      $pstmt= $con->prepare("SELECT * FROM MIEMBROS_EQUIPO WHERE id_proyecto=?");
      $pstmt->execute(array($idproyecto));
      $paquete= $pstmt->fetch(PDO::FETCH_ASSOC);
      if (count($paquete)==0) $idMiembros='NULL';
      else $idMiembros = $paquete["id_miembros_equipo"];
      //echo $idMiembros;
      //Guardo el edt
      $pstmt= $con->prepare("INSERT INTO EDT(version,id_estado,id_miembros_equipo,id_proyecto) VALUES(?,?,?,?) ");
      $pstmt->execute(array($version,$idEstado,$idMiembros,$idproyecto));
       
      //Id de edt
      $idEliminado=obtenerIdEliminado();
      $pstmt= $con->prepare("SELECT * FROM EDT WHERE id_proyecto= ? AND id_estado!= ?");
      $pstmt->execute(array($idproyecto,$idEliminado));
      $idEdt = $pstmt->fetch(PDO::FETCH_ASSOC)["id_edt"];
      $idPadre=NULL;
       
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
    
      guardarHijos($edt->{"nodos"},$idEstado,$idMiembros,$idEdt,$version,$idPaqueteInicial);
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
      //echo $idProyecto;
      $con = getConnection();
      $pstmt= $con->prepare("SELECT * FROM EDT where id_proyecto= ?");
      $pstmt->execute(array($idProyecto));
      return $pstmt->fetch(PDO::FETCH_ASSOC);
    }
    
    function eliminarPaqueteTrabajo($id){
      $con = getConnection();
      $pstmt= $con->prepare("DELETE FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo= ?");
      $pstmt->execute(array($id));
    }
    
    function eliminarHijos2($id,$idEdt){
      $hijos = null;
      $con = getConnection();
      $pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE id_componente_padre= ? AND id_edt= ?");
      $pstmt->execute(array($id,$idEdt));
      $hijos = $pstmt->fetch(PDO::FETCH_ASSOC);
      if(count($hijos)==0)echo "Entro";
      foreach ($hijos as $row){
        eliminarHijos2($row["id_paquete_trabajo"],$idEdt);
        eliminarPaquete($row["id_paquete_trabajo"]);
      }
       
    }
    
    function eliminarPaquete($lista,$idEdt){
      foreach ($lista as $row){
        $con = getConnection();
        eliminarHijos2($row->{"id"},$idEdt);
        eliminarPaqueteTrabajo($row->{"id"});
      }
    }
    
    function modificarPaquete($id,$title,$dias,$desc){
      $con = getConnection();
      $pstmt= $con->prepare("UPDATE PAQUETE_TRABAJO SET nombre=?, dias= ?, descripcion= ? WHERE id_paquete_trabajo= ?");
      $pstmt->execute(array($title,$dias,$desc,$id));
    }
    
    function modificarTodoEdt(){
    $request = \Slim\Slim::getInstance()->request();
      $data = json_decode($request->getBody()); //object convert
      $idproyecto=$data->{"idproyecto"};
      //$idproyecto=1;
      $version=1.2;
       
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
       
      //cambiaVersion($edt["id_edt"],$version,$edt["id_paquete_trabajo_inicial"]);
    }
    
    function cambiaVersion($idEdt,$version,$idPrimerPaquete){
      $con = getConnection();
      $pstmt= $con->prepare("UPDATE EDT SET version= ? WHERE id_edt= ?");
      $pstmt->execute(array($version,$idEdt));
      //echo $idPrimerPaquete;
      cambiaPaquete($idPrimerPaquete,$version);
      cambiaHijos($idPrimerPaquete,$version);
       
    }
    
    function cambiaPaquete($idPaquete,$version){
      $con = getConnection();
      $pstmt= $con->prepare("UPDATE PAQUETE_TRABAJO SET version= ? WHERE id_paquete_trabajo= ?");
      $pstmt->execute(array($version,$idPaquete));
    }
    
    function cambiaHijos($idPaquete,$version){
      $con = getConnection();
      //echo $idPaquete;
      $pstmt= $con->prepare("SELECT * FROM PAQUETE_TRABAJO WHERE id_componente_padre= ?");
      $pstmt->execute(array($idPaquete));
      $hijos = $pstmt->fetch(PDO::FETCH_ASSOC);
      echo count($hijos);
      foreach ($hijos as $row){
        cambiaHijos($row["id_paquete_trabajo"],$version);
        cambiaPaquete($row["id_paquete_trabajo"],$version);
      }
    }
    
    
    //MODIFICAR EDT ===========================================================================================================
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //SEGUNDO SPRINT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function crearAlcance(){
      $request = \Slim\Slim::getInstance()->request(); //json parameters
      $edt = json_decode($request->getBody()); //object convert
      $idproyecto = $edt->{"idproyecto"};
      
      $con = getConnection();
      $pstmt= $con->prepare("INSERT INTO ALCANCE(id_proyecto,descripcion,alcance_producto,version,criterios_aceptacion,
      entregables,exclusiones,restricciones,supuestos) values (?,?,?,?,?,?,?,?,?)");
      $pstmt->execute(array($idproyecto,$edt->{"descripcion"},$edt->{"alcance_producto"},$edt->{"version"},
      $edt->{"criterios_aceptacion"},$edt->{"entregables"},$edt->{"exclusiones"},$edt->{"restricciones"},$edt->{"supuestos"}));
    }
    
    function mostrarAlcance(){
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
    
    function modificarAlcance(){
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
    
    function eliminarAlcance(){
      $request = \Slim\Slim::getInstance()->request(); //json parameters
      $edt = json_decode($request->getBody()); //object convert
      $idproyecto=$edt->{"idproyecto"};
      
      $con = getConnection();
      $pstmt= $con->prepare("DELETE FROM ALCANCE WHERE id_proyecto= ?");
      $pstmt->execute(array($idproyecto));
    }
    ?>