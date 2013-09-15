<?php
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
 //Lógica de servicios
    include ("../backend/alcance/serviciosAlcance.php");
    include ("../backend/presupuesto/serviciosPresupuesto.php");
    include ("../backend/cronograma/serviciosCronograma.php");
    include ("../backend/general/serviciosGeneral.php");
    include ("../backend/riesgo/serviciosRiesgo.php");
 //fin
$app->run();
?>