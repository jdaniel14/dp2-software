<?php

  include('routesAlcanceGroup2.php');
  include_once '../backend/conexion.php';
   
  function getEdt(){
       //$request = \Slim\Slim::getInstance()->request(); //json parameters
       //$idproyecto = json_decode($request->getBody())["idproyecto"]; //object convert
       $con = getConnection();
       $idproyecto = 2;
       //conseguir el id del paquete inicial
       $pstmt= $con->prepare("SELECT * FROM EDT WHERE id_proyecto= ?");
       $pstmt->execute(array($idproyecto));
       $idPIni = $pstmt->fetch(PDO::FETCH_ASSOC)["id_paquete_trabajo_inicial"];

       //conseguir el paquete inicial
       $pstmt= $con->prepare("SELECT id_paquete_trabajo,  nombre,descripcion,dias  FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo= ?");
       $pstmt->execute(array($idPIni));
       $pIni = $pstmt->fetch(PDO::FETCH_ASSOC);

       //Obtener hijos
       $hijos = getHijos($pIni["id_paquete_trabajo"]);

       //armar objeto
       $arbol = new EdtArbol($pIni["id_paquete_trabajo"], $pIni["nombre"],count($hijos) ,$pIni["dias"], $pIni["descripcion"], $hijos);
       echo json_encode($arbol);
    }

    function getHijos($idPadre){
        $con = getConnection();

       //conseguir los hijos
       $pstmt= $con->prepare("SELECT id_paquete_trabajo, nombre,descripcion,dias  FROM PAQUETE_TRABAJO WHERE id_componente_padre =?");
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




    //NADYA

    //**********************************
    //*** MOSTRAR EL EDT (REAL)*****************
     
    function BuscaIdPaquetePadre($idProyecto,$version){
      $con=getConexionLocal();
      $query="SELECT id_paquete_trabajo_inicial FROM EDT WHERE id_proyecto=" . $idProyecto." AND version='".$version."'";
      $result = mysqli_query($con,$query);
      $paquete=mysqli_fetch_assoc($result);
      $numero=$paquete["id_paquete_trabajo_inicial"];
      return $numero;
    }
     
    function DameObjetoPrincipal($id){
      $con=getConexionLocal();
      $result = mysqli_query($con,"SELECT id_paquete_trabajo, nombre, descripcion, id_componente_padre, dias
            FROM PAQUETE_TRABAJO WHERE id_paquete_trabajo=" . $id);
      $paquete = mysqli_fetch_assoc($result);
      return $paquete;
    }
    
    function obtenerCantidadHijos($idPrimerPaquete){
      $con=getConexionLocal();
      $result = mysqli_query($con,"SELECT COUNT(id_paquete_trabajo) as cantidad
            FROM PAQUETE_TRABAJO WHERE id_componente_padre=" . $idPrimerPaquete);
      $paquete = mysqli_fetch_assoc($result);
      return $paquete["cantidad"];
    }
    
    function obtenerUltimaVersion($idProyecto){
      $con=getConexionLocal();
      $query="SELECT version FROM EDT WHERE id_proyecto=".$idProyecto;
      $result = mysqli_query($con,$query);
      while ($paquete = mysqli_fetch_assoc($result)){
        $version=$paquete["version"];
      }
      return $version;
    }
    
    function mostrarEdt(){
       $request = \Slim\Slim::getInstance()->request(); //json parameters
       $data = json_decode($request->getBody()); //object convert
       var_dump($data);

       $idProyecto = 1;
       $version = 0;

      if($version==0){
        $version=obtenerUltimaVersion($idProyecto);
        echo $version;
      }     
      
      $idPrimerPaquete=BuscaIdPaquetePadre($idProyecto,$version); //Obtengo el id del primer paquete de trabajo
      $objetoPrincipal=DameObjetoPrincipal($idPrimerPaquete); //Me da el paquete padre
      $edt= [ 'title'=>$objetoPrincipal["nombre"],
      'hijos'=>obtenerCantidadHijos($idPrimerPaquete),
      'dias'=>$objetoPrincipal["dias"],
      'descripcion'=>$objetoPrincipal["descripcion"],
      'nodos'=>ObtenerHijos($idPrimerPaquete),
      ];
      echo json_encode($edt);
      
    }
    
    function ObtenerHijos($id){
      $con=getConexionLocal();
      $result = mysqli_query($con,"SELECT id_paquete_trabajo, nombre, descripcion, id_componente_padre, dias
            FROM PAQUETE_TRABAJO WHERE id_componente_padre=" . $id);
      //$paquete = mysqli_fetch_assoc($result);
      //Tengo que tener el resto de los subHijos por cada hijo
    
      $listaHijos=array();
      while ($paquete = mysqli_fetch_assoc($result)){
        $edt= [ 'title'=>$paquete["nombre"],
        'hijos'=>obtenerCantidadHijos($paquete["id_paquete_trabajo"]),
        'dias'=>$paquete["dias"],
        'descripcion'=>$paquete["descripcion"],
        'nodos'=>ObtenerHijos($paquete["id_paquete_trabajo"]),
        ];
        array_push($listaHijos, $edt);
      }
      return $listaHijos;
    }
    
    //**********************************
    //***FIN MOSTRAR EL EDT (REAL)*****************
    
    //**********************************
    //***GUARDAR EL EDT (REAL)*****************
     
    function obtenerIdEstado(){
      $con=getConexionLocal();
      $result = mysqli_query($con,"SELECT id_estado FROM ESTADO_EDT WHERE descripcion='Pendiente'");
      $paquete = mysqli_fetch_assoc($result);
      return $paquete["id_estado"];
    }
    
    function obtenerIdMiembros($idProyecto){
      $con=getConexionLocal();
      $result = mysqli_query($con,"SELECT id_miembros_equipo FROM MIEMBROS_EQUIPO WHERE id_proyecto=".$idProyecto);
      $paquete = mysqli_fetch_assoc($result);
      if (count($paquete)==0)return 'NULL';
      return $paquete["id_miembros_equipo"];
    }
    
    function guardarInformacionEdt($version,$idEstado,$idMiembros,$idProyecto){
      $con=getConexionLocal();
      $result = mysqli_query($con,"INSERT INTO EDT(version,id_proyecto,id_estado,id_miembros_equipo) VALUES
            (".$version.",".$idProyecto.",".$idEstado.",".$idMiembros.")");
    }
    
    function obtenerIdEdt($idProyecto,$version){
      $con=getConexionLocal();
      $query="SELECT id_edt FROM EDT WHERE id_proyecto=".$idProyecto." AND version=".$version;
      $result = mysqli_query($con,$query);
      $paquete = mysqli_fetch_assoc($result);
      return $paquete["id_edt"];
    }
    
    function guardarInformacionPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$idMiembros,$dias,$version){
      $con=getConexionLocal();
      $query = "INSERT INTO PAQUETE_TRABAJO(nombre,descripcion,id_estado,id_miembros_equipo,id_edt,id_componente_padre,dias,version) VALUES
            ('".$nombre."','".$descripcion."',".$idEstado.",".$idMiembros.",".$idEdt.",".$idPadre.",".$dias.",'".$version."')";
      $result = mysqli_query($con,$query);
    }
    
    function obtenerIdPrincipal($idEdt,$idProyecto,$idEstado,$version){
      $con=getConexionLocal();
      $query="SELECT id_paquete_trabajo FROM PAQUETE_TRABAJO
            WHERE id_edt=".$idEdt." AND version='".$version."' AND id_estado=".$idEstado." AND id_componente_padre is null";
      $result = mysqli_query($con,$query);
      $paquete = mysqli_fetch_assoc($result);
      return $paquete["id_paquete_trabajo"];
    }
    
    function  actualizarEdt($idEdt,$idIdPaquetePrincipal,$version){
      $con=getConexionLocal();
      $query="UPDATE  EDT SET id_paquete_trabajo_inicial=".$idIdPaquetePrincipal."
            WHERE id_edt=".$idEdt." AND version='".$version."'";
      $result = mysqli_query($con,$query);
    }
    
    function guardarEdt($idProyecto,$version){
      $request = \Slim\Slim::getInstance()->request(); //json parameters
      $edt = json_decode($request->getBody(),TRUE); //object convert este sirve
      //$edt=json_decode(mostrarEdt($idProyecto));
      //$edt=json_decode(getEdt2());
      $idEstado=obtenerIdEstado();
    
      $idMiembros=obtenerIdMiembros($idProyecto); //puede ser null?VER BIEN ESTO,
      //$version="1.1";
      guardarInformacionEdt($version,$idEstado,$idMiembros,$idProyecto);
      $nombre=$edt->{"title"};
      $dias=$edt->{"dias"};
      $descripcion=$edt->{"descripcion"};
      $listaHijos=$edt->{"nodos"};
      $supuestos=0;
      $porcentaje=0;
      $idEdt=obtenerIdEdt($idProyecto,$version);
      $idPadre='NULL';
      guardarInformacionPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$idMiembros,$dias,$version);
      $idIdPaquetePrincipal=obtenerIdPrincipal($idEdt,$idProyecto,$idEstado,$version);
      actualizarEdt($idEdt,$idIdPaquetePrincipal,$version);
      guardarHijos($listaHijos,$idEstado,$idEdt,$idIdPaquetePrincipal,$version,$idMiembros);
    }
    
    function obtenerIdPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$version){
      $con=getConexionLocal();
      $query="SELECT id_paquete_trabajo FROM PAQUETE_TRABAJO WHERE
            nombre='".$nombre."' AND descripcion='".$descripcion."'
                 AND id_estado=".$idEstado." AND id_edt=".$idEdt." AND id_componente_padre=".$idPadre." AND version='".$version."'";
      $result = mysqli_query($con,$query);
      $paquete = mysqli_fetch_assoc($result);
      return $paquete["id_paquete_trabajo"];
    }
    
    function guardarHijos($listaHijos,$idEstado,$idEdt,$idPadre,$version,$idMiembros){
      if($listaHijos==NULL)return null;
      else if(count($listaHijos)==0)return null;
      else{
        foreach ($listaHijos as $row){
          $nombre=$row->{"title"};
          $dias=$row->{"dias"};
          $descripcion=$row->{"descripcion"};
          $listaHijos=$row->{"nodos"};
          guardarInformacionPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$idMiembros,$dias,$version);
          $idPaquete=obtenerIdPaquete($nombre,$descripcion,$idEstado,$idEdt,$idPadre,$version);
          guardarHijos($listaHijos,$idEstado,$idEdt,$idPaquete,$version,$idMiembros);
        }
    
      }
    }
     
    //**********************************
    //***FIN GUARDAR EL EDT (REAL)*****************
     
    //**********************************
    //MOSTRAR EL COMBO BOX DE VERSIONES A ESCOGER
     
     
    function getComboVersion($idProyecto){
      $con=getConexionLocal();
      $query="SELECT version FROM EDT WHERE id_proyecto=".$idProyecto;
      $result = mysqli_query($con,$query);
      $lista = array();
      while ($version = mysqli_fetch_array($result,MYSQLI_ASSOC)){
        $lista[]=$version["version"];
      }
      echo json_encode($lista);
    }
     
    //**********************************
    //FIN MOSTRAR EL COMBO BOX DE VERSIONES A ESCOGER

    
    
    

?>