<?php

  include('routesAlcanceGroup2.php');


   function getEdt(){
       //$request = \Slim\Slim::getInstance()->request(); //json parameters
       //$edt = json_decode($request->getBody()); //object convert
       //var_dump($edt);
       //echo json_encode($edt); //json return
      
      $h1n = array();
      $h2n = array();
      $h3n = array();
      $h4n = array();
      $h5n = array();

      $hijo1 = new EdtArbol("Inicio","0", $h1n );
      $hijo2 = new EdtArbol("Planificacion","0", $h2n );
      $hijo3 = new EdtArbol("Ejecucion","0", $h3n );
      $hijo4 = new EdtArbol("Seguimiento","0", $h4n );
      $hijo5 = new EdtArbol("Cierre","0", $h5n );

      $nodos = array();
      array_push($nodos, $hijo1,$hijo2,$hijo3,$hijo4,$hijo5);


      $padre =  new EdtArbol("DP2","5",$nodos);

    echo json_encode($padre);
    }

?>