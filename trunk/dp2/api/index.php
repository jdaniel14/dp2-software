<?php
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
 //Lógica de servicios
    include ("../backend/alcance/serviciosAlcance.php");
    include ("../backend/costo/serviciosCosto.php");
    include ("../backend/cronograma/serviciosCronograma.php");
    include ("../backend/general/serviciosGeneral.php");
    include ("../backend/riesgo/serviciosRiesgo.php");
 //fin
    include ("../backend/alcance/ServiciosAlcanceGroup2.php");
$app->run();
?>