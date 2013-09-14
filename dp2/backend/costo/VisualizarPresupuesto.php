<?php

require 'Slim/Slim.php';

$app = new Slim();

//verbs : put, get, post, delete -> more information -www.google.com
//routes like Java routing
$app->get('/obtenerDatosPresupuesto', 'getPresupuesto'){
	return true;
} //route - method
//run restfull
$app->run();

class Proyecto {
	public $subtotalERS;
	public $subtotalDocArq;
	public $subtotalModeloDatos;
	public $subtotalAnalisisDiseno;
	public $subtotalImplementacion;
	public $subtotalPruebas
	
	public function calcularSubtotalAnalisisDiseno() {
		$subtotalAnalisisDiseno = $subtotalERS + $subtotalDocArq + $subtotalModeloDatos;
	}
}

function getPresupuesto(){
	$proyecto = new Proyecto();//array(array("Pintura","1","Litros"), array("Cemento","","Litros"));
	$proyecto->subtotalERS = 100;
	$proyecto->subtotalDocArq = 100;
	$proyecto->subtotalModeloDatos = 100;
	$proyecto->subtotalImplementacion = 100;
	$proyecto->subtotalPruebas = 100;
	$proyecto->calcularSubtotalAnalisisDiseno();
	echo json_encode($proyecto);	
}
?>