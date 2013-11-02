<?php
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->contentType('text/html; charset=utf-8');
 //Lógica de servicios Sprint 1
    include ("../backend/alcance/serviciosAlcance.php");
    include ("../backend/costo/serviciosCosto.php");
    include ("../backend/cronograma/serviciosCronograma.php");
    include ("../backend/general/serviciosGeneral.php");
    include ("../backend/riesgo/serviciosRiesgo.php");
 //fin 1
 
 //Lógica de servicios Sprint 2
    include ("../backend/alcance/ServiciosAlcanceGroup2.php");
    include ("../backend/general/serviciosGeneral2.php");
    include ("../backend/alcance/serviciosAlcanceJp.php");
 //fin 2   

 //Riesgo cambio
    include ("../backend/riesgo/serviciosRiesgoV2.php");

    //sprint 3
    include ("../backend/general/serviciosGeneral3.php");

    //sprint 4
    include ("../backend/general/serviciosGeneral4.php");
$app->run();
?>
