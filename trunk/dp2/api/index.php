<?php
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
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
 //fin 2   
$app->run();
?>