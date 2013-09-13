<?php

require 'Slim/Slim.php';

$app = new Slim();

//verbs : put, get, post, delete -> more information -www.google.com
//routes like Java routing
$app->get('/obtenerArregloRecursos', 'getRecursos'){
	return true;
} //route - method
//run restfull
$app->run();

function getRecursos(){
	$recursos= obtenRecursosxProyecto();
	//$cats=array("http://2.bp.blogspot.com/_7Dz2jUSPC1E/TDYR5gq_eaI/AAAAAAAAEN8/ZbZ4LDNfnIs/s400/gato-malo.jpg","http://www.pueblagentegrande.com/imgs/art/ctpmtxvsh49fh5xrngnt6xchrk.jpg","http://animalmascota.com/wp-content/2013/02/Curar-una-herida-a-un-gato.jpg","http://images02.olx.com.pe/ui/18/66/32/1375842123_183916432_2-Fotos-de--Gato-macho-persa-legitimo-blanco-para-monta.jpg");
	echo json_encode($recursos);	
}

function obtenRecursosxProyecto(){
	//Hardcodeado hasta BD
	
	return array(array("Pintura","1","Litros"), array("Cemento","","Litros"));
}

?>