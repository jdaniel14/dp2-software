<?php

include('routesAlcanceJp.php');
include_once '../backend/conexion.php';

  function getEdtJp(){
  	$idproyecto = 1;
  	$con=getConnection();
  	echo $con;
  }

  function getVersionEdt(){
       $con = getConnection();
       $idproyecto = 1;
       //conseguir el id del paquete inicial
       $pstmt= $con->prepare("SELECT version FROM EDT WHERE id_proyecto=?");
       $pstmt->execute(array($idproyecto));
       $paquete=$pstmt->fetch(PDO::FETCH_ASSOC);
       echo json_encode($paquete);
  }

  function guardarArbol(){

  }

  function editarArbol(){

  }

  function eliminarArbol(){
    
  }

?>