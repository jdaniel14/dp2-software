<?php
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
 //Lógica de servicios
    include ("../backend/alcance/serviciosAlcance.php");
 //fin
$app->run();
?>